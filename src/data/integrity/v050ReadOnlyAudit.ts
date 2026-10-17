/**
 * v0.5.0 / stage 1 — non-mutating audit worksheet for the ACTUAL live roster (currently 82 persons).
 * This is an evidence/consistency triage instrument, not a score calculator,
 * scoring-policy migration, canonical manga verification or editorial verdict.
 *
 * The v0.3.3 historical dataset is deliberately not imported or rewritten here.
 */
import type { CombatDataset } from './auditDataset'
import { auditCombatDataset } from './auditDataset'
import type { CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import type { EvidenceSourceType, EvidenceStatRole } from '../../domain/evidence/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'

import { sampleCharacters } from '../sample/characters'
import { v0411Characters, v0411Memberships } from '../sample/v0411UnratedCharacterRegistration'
import { sampleGroups } from '../sample/groups'
import { sampleMemberships } from '../sample/memberships'
import { sampleBattles, sampleBattleParticipants } from '../sample/battles'
import { v0412Battles, v0412Evidence, v0412Evaluations } from '../sample/v0412EightEvaluations'
import { sampleEvidence } from '../sample/evidence'
import { sampleEvaluations } from '../sample/evaluations'
import { v0413EnelCharacter, v0413EnelMembership, v0413EnelBattles, v0413EnelEvidence, v0413EnelEvaluation, applyV0413KakuDraft } from '../sample/v0413RemainingDraftPublication'
import { v0420MagellanCharacter, v0420MagellanMembership, v0420MagellanBattles, v0420MagellanEvidence, v0420MagellanEvaluation } from '../sample/v0420MagellanRegistration'
import { applyV0421EmperorTechniqueReview, v0421EmperorTechniqueEvidence } from '../sample/v0421EmperorTechniqueReview'
import { balancedV12 } from '../sample/calculationModels'
import { applyV0415EnelReview } from '../sample/v0415EnelReview'
import { applyV0416Cp0EvaluationAudit, applyV0416Cp0EvidenceAudit } from '../sample/v0416Cp0EvidenceReadiness'
import { applyV0427JinbeBattleContext, applyV0427JinbeEvidenceCorrection, applyV0427JinbeRecalibration, v0427JinbeEvidence } from '../sample/v0427JinbeRecalibration'
import { matchupRepository } from '../repositories/matchupRepository'
import { applyV0428CalibratedEvaluation, v0428SulongEvaluations, v0428Evidence, v0428Battles } from '../sample/v0428SupportAxisCalibration'
import { applyV0429CommanderCalibration, applyV0429CommanderEvidenceAudit } from '../sample/v0429WhitebeardCommanders'

/** Explicit live dataset; older v033Snapshot.liveDataset intentionally has historical scope. */
export const v050CurrentDataset: CombatDataset = {
  characters: [...sampleCharacters, ...v0411Characters, v0413EnelCharacter, v0420MagellanCharacter],
  groups: sampleGroups,
  memberships: [...sampleMemberships, ...v0411Memberships, v0413EnelMembership, v0420MagellanMembership],
  battles: [...sampleBattles.map(applyV0427JinbeBattleContext), ...v0412Battles, ...v0413EnelBattles, ...v0420MagellanBattles, ...v0428Battles],
  participants: sampleBattleParticipants,
  evidence: [...sampleEvidence.map(applyV0427JinbeEvidenceCorrection).map(applyV0429CommanderEvidenceAudit), ...v0427JinbeEvidence, ...v0412Evidence.map(applyV0416Cp0EvidenceAudit), ...v0413EnelEvidence, ...v0420MagellanEvidence, ...v0421EmperorTechniqueEvidence, ...v0428Evidence],
  evaluations: [...sampleEvaluations.map(applyV0413KakuDraft).map(applyV0421EmperorTechniqueReview).map(applyV0427JinbeRecalibration).map(applyV0428CalibratedEvaluation).map(applyV0429CommanderCalibration), ...v0412Evaluations.map(applyV0416Cp0EvaluationAudit).map(applyV0428CalibratedEvaluation), ...v0428SulongEvaluations, applyV0415EnelReview(v0413EnelEvaluation), v0420MagellanEvaluation],
  model: balancedV12,
  matchups: matchupRepository.getAllMatchups(),
}

export type V050AuditFlag =
  | 'high-e3-provisional'
  | 'no-linked-evidence'
  | 'secondary-or-context-only'
  | 'no-canon-labelled-source'
  | 'haki-evidence-reused-across-stats'
  | 'multiple-haki-types-on-stat'

export type V050EvidenceLink = {
  evidenceId: string
  battleId: string | null
  sourceType: EvidenceSourceType | 'missing'
  role: EvidenceStatRole | 'unmapped' | 'missing'
  /** Empty participant arrays are permitted in the current schema, not proof of a bug. */
  hasExplicitParticipants: boolean
}

export type V050AuditRow = {
  evaluationId: string
  evaluationDataVersion: string
  characterId: string
  characterName: string
  subjectStateId: string | null
  isDefault: boolean
  status: string
  stat: CombatStat
  readiness: EvidenceReadiness | 'unclassified'
  base: number
  rawHaki: number
  effectiveHaki: number
  final: number
  overall: number
  rationale: string
  evidenceIds: string[]
  evidenceLinks: V050EvidenceLink[]
  hakiEvidenceIds: string[]
  hakiTypes: string[]
  flags: V050AuditFlag[]
}

export type V050SharedHakiEvidence = {
  evaluationId: string
  characterId: string
  evidenceId: string
  stats: CombatStat[]
}

export type V050AuditReport = {
  rows: V050AuditRow[]
  counts: { characters: number; evaluatedCharacters: number; evaluations: number; axes: number; memberships: number; matchups: number }
  readiness: Record<EvidenceReadiness | 'unclassified', number>
  readinessByStat: Record<CombatStat, Record<EvidenceReadiness | 'unclassified', number>>
  flagCounts: Record<V050AuditFlag, number>
  sharedHakiEvidence: V050SharedHakiEvidence[]
  /** The existing structural validator's warnings are NOT automatically score errors. */
  integrity: ReturnType<typeof auditCombatDataset>
}

const emptyReadiness = (): Record<EvidenceReadiness | 'unclassified', number> =>
  ({ E1: 0, E2: 0, E3: 0, unclassified: 0 })

const flagKeys: readonly V050AuditFlag[] = [
  'high-e3-provisional', 'no-linked-evidence', 'secondary-or-context-only',
  'no-canon-labelled-source', 'haki-evidence-reused-across-stats',
  'multiple-haki-types-on-stat',
]

/**
 * 85+ E3 is a REVIEW-QUEUE FILTER ONLY; it is neither a score penalty,
 * a new Evidence-readiness definition nor a minimum acceptable score.
 */
export const V050_HIGH_E3_REVIEW_CUTOFF = 85

export function buildV050ReadOnlyAudit(dataset: CombatDataset = v050CurrentDataset): V050AuditReport {
  const characterNames = new Map(dataset.characters.map(character => [character.id, character.name]))
  const evidenceById = new Map(dataset.evidence.map(entry => [entry.id, entry]))
  const battleById = new Map(dataset.battles.map(battle => [battle.id, battle]))
  const shared = new Map<string, Set<CombatStat>>()

  // Include evaluation ID in key: a character may have independent eras/states.
  for (const evaluation of dataset.evaluations) for (const item of evaluation.items) {
    for (const contribution of item.hakiContributions) {
      if (contribution.amount <= 0) continue
      for (const evidenceId of contribution.evidenceIds) {
        const key = JSON.stringify([evaluation.id, evidenceId])
        if (!shared.has(key)) shared.set(key, new Set())
        shared.get(key)!.add(item.stat)
      }
    }
  }

  const sharedHakiEvidence: V050SharedHakiEvidence[] = []
  const reuseForEvaluation = new Map<string, Set<string>>()
  for (const [key, stats] of shared) {
    if (stats.size < 2) continue
    const [evaluationId, evidenceId] = JSON.parse(key) as [string, string]
    const evaluation = dataset.evaluations.find(entry => entry.id === evaluationId)!
    sharedHakiEvidence.push({ evaluationId, characterId: evaluation.characterId, evidenceId,
      stats: COMBAT_STATS.filter(stat => stats.has(stat)) })
    if (!reuseForEvaluation.has(evaluationId)) reuseForEvaluation.set(evaluationId, new Set())
    reuseForEvaluation.get(evaluationId)!.add(evidenceId)
  }
  sharedHakiEvidence.sort((a,b) =>
    a.evaluationId.localeCompare(b.evaluationId) || a.evidenceId.localeCompare(b.evidenceId))

  const rows: V050AuditRow[] = []
  for (const evaluation of dataset.evaluations) {
    const overall = calculateBalancedCombatPower(evaluation, dataset.model, '2000-01-01T00:00:00.000Z').finalScore
    for (const stat of COMBAT_STATS) {
      const item = evaluation.items.find(entry => entry.stat === stat)
      // Let the validator report malformed evaluations, never invent missing values.
      if (!item) continue
      const rawHaki = getRawHakiContributionTotal(item)
      const links: V050EvidenceLink[] = item.evidenceIds.map(evidenceId => {
        const evidence = evidenceById.get(evidenceId)
        const battle = evidence && battleById.get(evidence.battleId)
        return {
          evidenceId,
          battleId: evidence?.battleId ?? null,
          sourceType: evidence?.source.type ?? 'missing',
          role: evidence ? (evidence.statContributions.find(c => c.stat === stat)?.role ?? 'unmapped') : 'missing',
          hasExplicitParticipants: !!battle?.participantIds.length,
        }
      })
      const hakiEvidenceIds = [...new Set(item.hakiContributions.flatMap(c => c.evidenceIds))]
      const hakiTypes = [...new Set(item.hakiContributions.map(c => c.hakiType))]
      const flags: V050AuditFlag[] = []
      if ((item.readiness ?? 'unclassified') === 'E3' && item.score >= V050_HIGH_E3_REVIEW_CUTOFF)
        flags.push('high-e3-provisional')
      if (links.length === 0) flags.push('no-linked-evidence')
      if (links.length && links.every(link => link.role !== 'primary'))
        flags.push('secondary-or-context-only')
      if (links.length && links.every(link => link.sourceType !== 'canon'))
        flags.push('no-canon-labelled-source')
      if (hakiEvidenceIds.some(id => reuseForEvaluation.get(evaluation.id)?.has(id)))
        flags.push('haki-evidence-reused-across-stats')
      if (hakiTypes.length > 1) flags.push('multiple-haki-types-on-stat')

      rows.push({
        evaluationId: evaluation.id,
        evaluationDataVersion: evaluation.evaluationDataVersion,
        characterId: evaluation.characterId,
        characterName: characterNames.get(evaluation.characterId) ?? evaluation.characterId,
        subjectStateId: evaluation.subjectState?.id ?? null,
        isDefault: evaluation.isDefault === true,
        status: evaluation.status,
        stat, readiness: item.readiness ?? 'unclassified',
        base: item.baseScore, rawHaki, effectiveHaki: rawHaki * dataset.model.configuration.hakiWeight,
        final: getFinalStatScore(item, dataset.model.configuration.hakiWeight), overall,
        rationale: item.rationale,
        evidenceIds: [...item.evidenceIds],
        evidenceLinks: links,
        hakiEvidenceIds,
        hakiTypes,
        flags,
      })
    }
  }

  const readiness = emptyReadiness()
  const readinessByStat = Object.fromEntries(
    COMBAT_STATS.map(stat => [stat, emptyReadiness()]),
  ) as V050AuditReport['readinessByStat']
  const flagCounts = Object.fromEntries(flagKeys.map(key => [key, 0])) as V050AuditReport['flagCounts']
  for (const row of rows) {
    readiness[row.readiness] += 1
    readinessByStat[row.stat][row.readiness] += 1
    for (const flag of row.flags) flagCounts[flag] += 1
  }
  return {
    rows,
    counts: {
      characters: dataset.characters.length,
      evaluatedCharacters: new Set(dataset.evaluations.map(e => e.characterId)).size,
      evaluations: dataset.evaluations.length,
      axes: rows.length,
      memberships: dataset.memberships.length,
      matchups: dataset.matchups.length,
    },
    readiness,
    readinessByStat,
    flagCounts,
    sharedHakiEvidence,
    integrity: auditCombatDataset(dataset),
  }
}

/** One row per Evaluation x stat, no writes/side effects; safe to export elsewhere. */
export function v050AuditRowsToCsv(rows: readonly V050AuditRow[]): string {
  const header = ['evaluationId','evaluationDataVersion','characterId','characterName',
    'stateId','isDefault','status','stat','readiness','base','rawHaki','effectiveHaki',
    'final','overall','evidenceIds','sourceTypes','statRoles','battleIds',
    'hakiEvidenceIds','hakiTypes','flags','rationale']
  const csvCell = (value: string | number | boolean | null) =>
    '"' + String(value ?? '').replace(/"/g, '""') + '"'
  const lines = [header.map(csvCell).join(',')]
  for (const row of rows) {
    const values = [
      row.evaluationId, row.evaluationDataVersion, row.characterId, row.characterName,
      row.subjectStateId, row.isDefault, row.status, row.stat, row.readiness,
      row.base, row.rawHaki, row.effectiveHaki, row.final, row.overall,
      row.evidenceIds.join(' | '), row.evidenceLinks.map(e=>e.sourceType).join(' | '),
      row.evidenceLinks.map(e=>e.role).join(' | '),
      row.evidenceLinks.map(e=>e.battleId).join(' | '),
      row.hakiEvidenceIds.join(' | '), row.hakiTypes.join(' | '),
      row.flags.join(' | '), row.rationale,
    ]
    lines.push(values.map(csvCell).join(','))
  }
  return lines.join('\n') + '\n'
}
