import { calculationModelRepository } from '../data/repositories/calculationModelRepository'
import { characterRepository } from '../data/repositories/characterRepository'
import { evaluationRepository } from '../data/repositories/evaluationRepository'
import { matchupRepository } from '../data/repositories/matchupRepository'
import { getUniqueCharacterList } from './getCharacterList'
import { calculateBalancedCombatPower } from '../domain/calculation/calculateCombatPower'
import { COMBAT_STAT_DEFINITIONS } from '../domain/evaluation/statDefinitions'
import { getFinalStatScore } from '../domain/evaluation/score'
import type { CombatStat } from '../domain/evaluation/types'
import type { MatchupAdvantage, MatchupAnalysis, MatchupFactorAssessment } from '../domain/matchup/types'

export type MatchupHubStat = {
  stat: CombatStat
  label: string
  score: number
}

export type MatchupHubFighter = {
  characterId: string
  name: string
  groupName: string
  stateId?: string
  stateLabel?: string
  overall: number
  stats: MatchupHubStat[]
  combatStyles: string[]
  specialTraits: string[]
  confirmedHaki: string[]
}

export type MatchupStateOption = {
  id?: string
  label: string
  isDefault: boolean
}

export type MatchupRosterOption = {
  characterId: string
  name: string
  groupName: string
  states: MatchupStateOption[]
  defaultStateId?: string
}

export type MatchupHubEntry = {
  matchup: MatchupAnalysis
  characterA: MatchupHubFighter
  characterB: MatchupHubFighter
}

export type PerspectiveFactor = MatchupFactorAssessment & {
  perspective: 'favorable' | 'risk' | 'neutral' | 'conditional' | 'unknown'
}

export type MatchupBuilderView = {
  left: MatchupHubFighter
  right: MatchupHubFighter
  matchup?: MatchupAnalysis
  leftIsCharacterA?: boolean
  leftFactors: PerspectiveFactor[]
  rightFactors: PerspectiveFactor[]
  leftStatEdges: MatchupHubStat[]
  rightStatEdges: MatchupHubStat[]
  tiedStats: MatchupHubStat[]
}

const hakiLabel = {
  armament: '무장색',
  observation: '견문색',
  conquerors: '패왕색',
} as const

function defaultEvaluation(characterId: string) {
  const evaluations = evaluationRepository.getEvaluations(characterId)
  return evaluations.find((evaluation) => evaluation.isDefault) ?? evaluations[0]
}

function getFighter(characterId: string, subjectStateId?: string): MatchupHubFighter | undefined {
  const character = characterRepository.getCharacter(characterId)
  const evaluation = evaluationRepository.getEvaluation(characterId, subjectStateId)
  const model = calculationModelRepository.getModel('balanced')
  if (!character || !evaluation || !model) return undefined

  const representative = getUniqueCharacterList()
    .find((entry) => entry.character.id === characterId)
  const group = representative?.group

  return {
    characterId,
    name: character.name,
    groupName: group?.name ?? '기타',
    stateId: evaluation.subjectState?.id,
    stateLabel: evaluation.subjectState?.label,
    overall: calculateBalancedCombatPower(evaluation, model).finalScore,
    stats: evaluation.items.map((item) => ({
      stat: item.stat,
      label: COMBAT_STAT_DEFINITIONS[item.stat].label,
      score: getFinalStatScore(item, model.configuration.hakiWeight),
    })),
    combatStyles: character.combatProfile.combatStyles,
    specialTraits: character.combatProfile.specialTraits
      .filter(({ status }) => status === 'confirmed')
      .map(({ name }) => name),
    confirmedHaki: character.combatProfile.haki.capabilities
      .filter(({ status }) => status === 'confirmed')
      .map(({ type }) => hakiLabel[type]),
  }
}

export function getMatchupRoster(): MatchupRosterOption[] {
  return getUniqueCharacterList().flatMap(({ character, group }) => {
    const evaluations = evaluationRepository.getEvaluations(character.id)
    if (evaluations.length === 0) return []

    const selectedDefault = defaultEvaluation(character.id)
    return [{
      characterId: character.id,
      name: character.name,
      groupName: group.name,
      states: evaluations.map((evaluation) => ({
        id: evaluation.subjectState?.id,
        label: evaluation.subjectState?.label ?? '기본 평가',
        isDefault: evaluation.id === selectedDefault?.id,
      })),
      defaultStateId: selectedDefault?.subjectState?.id,
    }]
  })
}

function stateMatches(required: string | undefined, selected: string | undefined) {
  return required === undefined || required === selected
}

function findPairMatchup(leftId: string, rightId: string, leftStateId?: string, rightStateId?: string) {
  for (const matchup of matchupRepository.getAllMatchups()) {
    const direct = matchup.characterAId === leftId && matchup.characterBId === rightId
      && stateMatches(matchup.characterAStateId, leftStateId)
      && stateMatches(matchup.characterBStateId, rightStateId)
    if (direct) return { matchup, leftIsCharacterA: true }

    const reverse = matchup.characterAId === rightId && matchup.characterBId === leftId
      && stateMatches(matchup.characterAStateId, rightStateId)
      && stateMatches(matchup.characterBStateId, leftStateId)
    if (reverse) return { matchup, leftIsCharacterA: false }
  }
  return undefined
}

function perspective(
  advantage: MatchupAdvantage,
  sideIsCharacterA: boolean,
): PerspectiveFactor['perspective'] {
  if (advantage === 'conditional') return 'conditional'
  if (advantage === 'none') return 'neutral'
  if (advantage === 'unknown') return 'unknown'
  const advantageIsA = advantage === 'character-a'
  return advantageIsA === sideIsCharacterA ? 'favorable' : 'risk'
}

function perspectiveFactors(
  matchup: MatchupAnalysis | undefined,
  sideIsCharacterA: boolean,
): PerspectiveFactor[] {
  if (!matchup) return []
  return matchup.factors.map((factor) => ({
    ...factor,
    perspective: perspective(factor.advantage, sideIsCharacterA),
  }))
}

function statEdges(own: MatchupHubFighter, opponent: MatchupHubFighter) {
  return own.stats
    .filter((stat, index) => stat.score > opponent.stats[index].score)
    .sort((a, b) => {
      const aIndex = own.stats.findIndex(({ stat }) => stat === a.stat)
      const bIndex = own.stats.findIndex(({ stat }) => stat === b.stat)
      const aGap = a.score - opponent.stats[aIndex].score
      const bGap = b.score - opponent.stats[bIndex].score
      return bGap - aGap
    })
}

export function getMatchupBuilderView(
  leftId: string,
  rightId: string,
  leftStateId?: string,
  rightStateId?: string,
): MatchupBuilderView | undefined {
  if (!leftId || !rightId || leftId === rightId) return undefined
  const left = getFighter(leftId, leftStateId)
  const right = getFighter(rightId, rightStateId)
  if (!left || !right) return undefined

  const pair = findPairMatchup(leftId, rightId, leftStateId, rightStateId)
  const matchup = pair?.matchup
  const leftIsCharacterA = pair?.leftIsCharacterA
  return {
    left,
    right,
    matchup,
    leftIsCharacterA,
    leftFactors: perspectiveFactors(matchup, leftIsCharacterA ?? true),
    rightFactors: perspectiveFactors(matchup, !(leftIsCharacterA ?? true)),
    leftStatEdges: statEdges(left, right),
    rightStatEdges: statEdges(right, left),
    tiedStats: left.stats.filter((stat, index) => stat.score === right.stats[index].score),
  }
}

export function getMatchupHubEntries(): MatchupHubEntry[] {
  return matchupRepository.getAllMatchups().flatMap((matchup) => {
    const characterA = getFighter(matchup.characterAId, matchup.characterAStateId)
    const characterB = getFighter(matchup.characterBId, matchup.characterBStateId)
    return characterA && characterB ? [{ matchup, characterA, characterB }] : []
  })
}
