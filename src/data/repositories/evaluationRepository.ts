import type { Evaluation } from '../../domain/evaluation/types'
import { sampleEvaluations } from '../sample/evaluations'

export interface EvaluationRepository {
  getEvaluation(characterId: string): Evaluation | undefined
}

export const evaluationRepository: EvaluationRepository = {
  getEvaluation: (characterId) => sampleEvaluations.find((evaluation) => evaluation.characterId === characterId),
}
