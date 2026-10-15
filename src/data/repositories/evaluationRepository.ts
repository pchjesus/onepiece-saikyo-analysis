import type { Evaluation } from '../../domain/evaluation/types'
import { sampleEvaluations } from '../sample/evaluations'
import { v0412Evaluations } from '../sample/v0412EightEvaluations'

/** Preserve immutable historical evaluation array; extend current repository data explicitly. */
const currentEvaluations = [...sampleEvaluations, ...v0412Evaluations]

export interface EvaluationRepository {
  getEvaluations(characterId: string): Evaluation[]
  getEvaluation(characterId: string, subjectStateId?: string): Evaluation | undefined
}

const forCharacter = (characterId: string) =>
  currentEvaluations.filter((evaluation) => evaluation.characterId === characterId)

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
