import type { Evaluation } from '../../domain/evaluation/types'
import { sampleEvaluations } from '../sample/evaluations'

export interface EvaluationRepository {
  getEvaluations(characterId: string): Evaluation[]
  getEvaluation(characterId: string, subjectStateId?: string): Evaluation | undefined
}

const forCharacter = (characterId: string) =>
  sampleEvaluations.filter((evaluation) => evaluation.characterId === characterId)

export const evaluationRepository: EvaluationRepository = {
  getEvaluations: forCharacter,
  getEvaluation: (characterId, subjectStateId) => {
    const evaluations = forCharacter(characterId)
    if (subjectStateId) {
      return evaluations.find((evaluation) => evaluation.subjectState?.id === subjectStateId)
    }
    return evaluations.find((evaluation) => evaluation.isDefault) ?? evaluations[0]
  },
}
