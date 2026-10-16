import type { Evaluation } from '../../domain/evaluation/types'
import { sampleEvaluations } from '../sample/evaluations'
import { v0412Evaluations } from '../sample/v0412EightEvaluations'
import { applyV0413KakuDraft, v0413EnelEvaluation } from '../sample/v0413RemainingDraftPublication'

/** Preserve immutable historical evaluation array; extend current repository data explicitly. */
const currentEvaluations = [...sampleEvaluations.map(applyV0413KakuDraft), ...v0412Evaluations, v0413EnelEvaluation]

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
