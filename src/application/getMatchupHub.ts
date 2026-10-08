import { calculationModelRepository } from '../data/repositories/calculationModelRepository'
import { characterRepository } from '../data/repositories/characterRepository'
import { evaluationRepository } from '../data/repositories/evaluationRepository'
import { matchupRepository } from '../data/repositories/matchupRepository'
import { calculateBalancedCombatPower } from '../domain/calculation/calculateCombatPower'
import { COMBAT_STAT_DEFINITIONS } from '../domain/evaluation/statDefinitions'
import { getFinalStatScore } from '../domain/evaluation/score'
import type { CombatStat } from '../domain/evaluation/types'
import type { MatchupAnalysis } from '../domain/matchup/types'

export type MatchupHubStat = {
  stat: CombatStat
  label: string
  score: number
}

export type MatchupHubFighter = {
  characterId: string
  name: string
  stateLabel?: string
  overall: number
  stats: MatchupHubStat[]
}

export type MatchupHubEntry = {
  matchup: MatchupAnalysis
  characterA: MatchupHubFighter
  characterB: MatchupHubFighter
}

function getFighter(characterId: string, subjectStateId?: string): MatchupHubFighter | undefined {
  const character = characterRepository.getCharacter(characterId)
  const evaluation = evaluationRepository.getEvaluation(characterId, subjectStateId)
  const model = calculationModelRepository.getModel('balanced')
  if (!character || !evaluation || !model) return undefined

  return {
    characterId,
    name: character.name,
    stateLabel: evaluation.subjectState?.label,
    overall: calculateBalancedCombatPower(evaluation, model).finalScore,
    stats: evaluation.items.map((item) => ({
      stat: item.stat,
      label: COMBAT_STAT_DEFINITIONS[item.stat].label,
      score: getFinalStatScore(item, model.configuration.hakiWeight),
    })),
  }
}

export function getMatchupHubEntries(): MatchupHubEntry[] {
  return matchupRepository.getAllMatchups().flatMap((matchup) => {
    const characterA = getFighter(matchup.characterAId, matchup.characterAStateId)
    const characterB = getFighter(matchup.characterBId, matchup.characterBStateId)
    return characterA && characterB ? [{ matchup, characterA, characterB }] : []
  })
}
