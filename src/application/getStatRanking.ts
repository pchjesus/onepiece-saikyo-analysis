import { getCharacterList } from './getCharacterList'
import { evaluationRepository } from '../data/repositories/evaluationRepository'
import { calculationModelRepository } from '../data/repositories/calculationModelRepository'
import { getFinalStatScore } from '../domain/evaluation/score'
import type { CombatStat, EvaluationStatus } from '../domain/evaluation/types'

export type StatRankingEntry = {
  characterId: string
  characterName: string
  groupId: string
  groupName: string
  score: number
  rank: number
  status: EvaluationStatus
}

// Rankings are derived from the same evaluated roster and Balanced model as the detail UI.
export function getStatRanking(stat: CombatStat): StatRankingEntry[] {
  const model = calculationModelRepository.getModel('balanced')
  if (!model) throw new Error('Balanced calculation model is missing.')

  const sorted = getCharacterList().flatMap(({ character, group }) => {
    const evaluation = evaluationRepository.getEvaluation(character.id)
    if (!evaluation) return []
    const item = evaluation.items.find((entry) => entry.stat === stat)
    if (!item) return []
    return [{
      characterId: character.id,
      characterName: character.name,
      groupId: group.id,
      groupName: group.name,
      score: getFinalStatScore(item, model.configuration.hakiWeight),
      status: evaluation.status,
    }]
  }).sort((a, b) => b.score - a.score || a.characterName.localeCompare(b.characterName, 'ko'))

  return sorted.map((entry, index) => ({
    ...entry,
    rank: index > 0 && entry.score === sorted[index - 1].score
      ? sorted.findIndex((other) => other.score === entry.score) + 1
      : index + 1,
  }))
}
