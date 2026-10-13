import type { Character, CharacterMembership, Group } from '../../domain/character/types'
import type { Battle, BattleParticipant } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation } from '../../domain/evaluation/types'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import type { CalculationModel } from '../../domain/calculation/types'
import type { MatchupAnalysis } from '../../domain/matchup/types'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { validateBattle } from '../../domain/battle/validation'
import { validateHakiProfile } from '../../domain/haki/validation'
import { validateMatchupAnalysis } from '../../domain/matchup/validation'
import { getFinalStatScore } from '../../domain/evaluation/score'

/** Pure audit: caller supplies all domain collections; no UI filtering or mutation. */
export type CombatDataset = {
  characters: readonly Character[]
  groups: readonly Group[]
  memberships: readonly CharacterMembership[]
  battles: readonly Battle[]
  participants: readonly BattleParticipant[]
  evidence: readonly Evidence[]
  evaluations: readonly Evaluation[]
  model: CalculationModel
  matchups: readonly MatchupAnalysis[]
}

export type AuditFinding = { scope: string; detail: string }
export type AuditReport = { errors: AuditFinding[]; warnings: AuditFinding[] }

export function auditCombatDataset(data: CombatDataset): AuditReport {
  const errors: AuditFinding[] = []
  const warnings: AuditFinding[] = []
  const error = (scope: string, detail: string) => errors.push({ scope, detail })
  const warn = (scope: string, detail: string) => warnings.push({ scope, detail })
  const unique = (scope: string, values: readonly string[]) => {
    const seen = new Set<string>()
    for (const id of values) {
      if (!id?.trim()) error(scope, 'Empty identifier')
      else if (seen.has(id)) error(scope, `Duplicate identifier: ${id}`)
      seen.add(id)
    }
  }
  unique('character', data.characters.map(x => x.id))
  unique('group', data.groups.map(x => x.id))
  unique('battle', data.battles.map(x => x.id))
  unique('participant', data.participants.map(x => x.id))
  unique('evidence', data.evidence.map(x => x.id))
  unique('evaluation', data.evaluations.map(x => x.id))
  unique('matchup', data.matchups.map(x => x.id))

  const chars = new Set(data.characters.map(x => x.id))
  const groups = new Set(data.groups.map(x => x.id))
  const battles = new Set(data.battles.map(x => x.id))
  const evidence = new Map(data.evidence.map(x => [x.id, x]))
  const evidenceRefs = data.evidence.map(x => ({ id: x.id, subjectCharacterId: x.subjectCharacterId }))
  const states = data.evaluations.filter(x => x.subjectState).map(x => `${x.characterId}:${x.subjectState!.id}`)
  unique('evaluation-state', states)
  const memberKeys = data.memberships.map(x => `${x.characterId}::${x.groupId}`)
  unique('membership character/group', memberKeys)
  const memberSet = new Set(memberKeys)

  for (const group of data.groups) {
    if (group.parentGroupId && !groups.has(group.parentGroupId))
      error(`group:${group.id}`, `Unknown parent group: ${group.parentGroupId}`)
    const visited = new Set<string>([group.id])
    let next = group.parentGroupId
    while (next) {
      if (visited.has(next)) { error(`group:${group.id}`, 'Cycle in parent groups'); break }
      visited.add(next)
      next = data.groups.find(g => g.id === next)?.parentGroupId
    }
  }
  for (const membership of data.memberships) {
    const scope = `membership:${membership.characterId}/${membership.groupId}`
    if (!chars.has(membership.characterId)) error(scope, 'Unknown character')
    if (!groups.has(membership.groupId)) error(scope, 'Unknown group')
  }
  // Concurrent affiliations may be intentional, so surface for review rather than rewriting history.
  for (const character of data.characters) {
    const concurrent = data.memberships.filter(m => m.characterId === character.id && m.status === 'current')
    if (concurrent.length > 1) warn(`character:${character.id}`, `Multiple current groups to review: ${concurrent.map(m => m.groupId).join(', ')}`)
  }
  const specialIds: string[] = []
  for (const character of data.characters) {
    const scope = `character:${character.id}`
    if (!groups.has(character.crewId)) error(scope, `Unknown representative group: ${character.crewId}`)
    if (!memberSet.has(`${character.id}::${character.crewId}`)) error(scope, 'Representative group lacks membership')
    if (!data.memberships.some(m => m.characterId === character.id)) error(scope, 'Character has no membership')
    if (character.combatProfile.haki.characterId !== character.id) error(scope, 'Haki profile owner mismatch')
    for (const detail of validateHakiProfile(character.combatProfile.haki)) error(scope, detail)
    for (const special of character.combatProfile.specialTraits) {
      specialIds.push(special.id)
      for (const id of special.evidenceIds)
        if (!evidence.has(id)) error(scope, `Missing special trait evidence: ${id}`)
        else if (evidence.get(id)!.subjectCharacterId !== character.id)
          error(scope, `Foreign special trait evidence: ${id}`)
    }
    for (const assessment of character.combatProfile.haki.excellenceAssessments ?? [])
      for (const id of assessment.evidenceIds)
        if (!evidence.has(id)) error(scope, `Missing Haki excellence evidence: ${id}`)
        else if (evidence.get(id)!.subjectCharacterId !== character.id)
          error(scope, `Foreign Haki excellence evidence: ${id}`)
  }
  unique('special-trait', specialIds)

  for (const participant of data.participants) {
    if (!chars.has(participant.characterId)) error(`participant:${participant.id}`, `Unknown character: ${participant.characterId}`)
    if (!battles.has(participant.battleId)) error(`participant:${participant.id}`, `Unknown battle: ${participant.battleId}`)
  }
  for (const battle of data.battles) {
    const relevant = data.participants.filter(p => p.battleId === battle.id)
    for (const detail of validateBattle(battle, relevant).errors) error(`battle:${battle.id}`, detail)
    // Empty participant lists can represent an intentionally contextual battle.
    // Never invent participants from title or external factors.
  }
  for (const item of data.evidence) {
    const scope = `evidence:${item.id}`
    if (!chars.has(item.subjectCharacterId)) error(scope, `Unknown subject character: ${item.subjectCharacterId}`)
    if (!battles.has(item.battleId)) error(scope, `Unknown battle: ${item.battleId}`)
    for (const contribution of item.statContributions)
      if (!(COMBAT_STATS as readonly string[]).includes(contribution.stat))
        error(scope, `Unknown supported stat: ${contribution.stat}`)
  }
  const defaultCount = new Map<string, number>()
  const stateCount = new Map<string, number>()
  for (const evaluation of data.evaluations) {
    const scope = `evaluation:${evaluation.id}`
    if (!chars.has(evaluation.characterId)) error(scope, `Unknown character: ${evaluation.characterId}`)
    for (const detail of validateEvaluation(evaluation, evidenceRefs).errors) error(scope, detail)
    if (evaluation.isDefault) defaultCount.set(evaluation.characterId, (defaultCount.get(evaluation.characterId) ?? 0) + 1)
    if (evaluation.subjectState) {
      const key = `${evaluation.characterId}::${evaluation.subjectState.id}`
      stateCount.set(key, (stateCount.get(key) ?? 0) + 1)
    }
    if (evaluation.items.length === COMBAT_STATS.length)
      for (const item of evaluation.items) {
        const expected = getFinalStatScore(item, data.model.configuration.hakiWeight)
        if (item.score !== expected) error(scope, `Model/score mismatch on ${item.stat}: ${item.score} vs ${expected}`)
        if (!item.evidenceIds.length) warn(scope, `No direct Evidence linked to ${item.stat} (may be intentionally E3)`)
      }
  }
  for (const [key, count] of stateCount) if (count !== 1) error(`evaluation-state:${key}`, `${count} records`)
  for (const character of data.characters) {
    const defaults = defaultCount.get(character.id) ?? 0
    if (defaults > 1) error(`character:${character.id}`, 'Multiple explicit default Evaluations')
    if (!data.evaluations.some(e => e.characterId === character.id)) warn(`character:${character.id}`, 'No Evaluation')
  }
  if (data.model.id !== 'balanced' || data.model.version !== '1.2'
    || data.model.configuration.method !== 'arithmetic-mean'
    || data.model.configuration.statCount !== COMBAT_STATS.length
    || data.model.configuration.hakiWeight !== 0.5)
    error('calculation-model', 'Expected Balanced 1.2 / 7 stats / Haki Weight 0.5 baseline')

  const pairKeys: string[] = []
  for (const matchup of data.matchups) {
    const scope = `matchup:${matchup.id}`
    if (!chars.has(matchup.characterAId)) error(scope, `Unknown A: ${matchup.characterAId}`)
    if (!chars.has(matchup.characterBId)) error(scope, `Unknown B: ${matchup.characterBId}`)
    for (const detail of validateMatchupAnalysis(matchup, [...evidence.keys()], states).errors) error(scope, detail)
    for (const factor of matchup.factors) for (const id of factor.evidenceIds) {
      const owner = evidence.get(id)?.subjectCharacterId
      if (owner && owner !== matchup.characterAId && owner !== matchup.characterBId)
        warn(scope, `Factor ${factor.id} cites third-party Evidence ${id} (${owner}); review context`)
    }
    for (const [id, state] of [[matchup.characterAId, matchup.characterAStateId], [matchup.characterBId, matchup.characterBStateId]] as const) {
      if (!state && !data.evaluations.some(e => e.characterId === id)) error(scope, `Missing default Evaluation: ${id}`)
      if (state && !data.evaluations.some(e => e.characterId === id && e.subjectState?.id === state))
        error(scope, `Unresolvable Evaluation state: ${id}:${state}`)
    }
    const [a, b] = matchup.characterAId < matchup.characterBId
      ? [[matchup.characterAId, matchup.characterAStateId], [matchup.characterBId, matchup.characterBStateId]]
      : [[matchup.characterBId, matchup.characterBStateId], [matchup.characterAId, matchup.characterAStateId]]
    pairKeys.push(`${a[0]}:${a[1] ?? 'default'}::${b[0]}:${b[1] ?? 'default'}`)
  }
  unique('matchup pair/states', pairKeys)
  return { errors, warnings }
}
