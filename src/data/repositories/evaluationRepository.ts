import type { Evaluation } from '../../domain/evaluation/types'
import { sampleEvaluations } from '../sample/evaluations'
import { v0412Evaluations } from '../sample/v0412EightEvaluations'
import { applyV0413KakuDraft, v0413EnelEvaluation } from '../sample/v0413RemainingDraftPublication'
import { applyV0415EnelReview } from '../sample/v0415EnelReview'
import { v0420MagellanEvaluation } from '../sample/v0420MagellanRegistration'
import { applyV0421EmperorTechniqueReview } from '../sample/v0421EmperorTechniqueReview'
import { applyV0416Cp0EvaluationAudit } from '../sample/v0416Cp0EvidenceReadiness'
import { applyV0427JinbeRecalibration } from '../sample/v0427JinbeRecalibration'
import { applyV0428CalibratedEvaluation, v0428SulongEvaluations } from '../sample/v0428SupportAxisCalibration'
import { applyV0429CommanderCalibration } from '../sample/v0429WhitebeardCommanders'
import { applyV0430AllStarCalibration } from '../sample/v0430BeastsAllStars'
import { applyV0431SweetCalibration } from '../sample/v0431SweetCommanders'

/** Preserve immutable historical evaluation array; extend current repository data explicitly. */
const currentEvaluations = [...sampleEvaluations.map(applyV0413KakuDraft).map(applyV0421EmperorTechniqueReview).map(applyV0427JinbeRecalibration).map(applyV0428CalibratedEvaluation).map(applyV0429CommanderCalibration).map(applyV0430AllStarCalibration).map(applyV0431SweetCalibration), ...v0412Evaluations.map(applyV0416Cp0EvaluationAudit).map(applyV0428CalibratedEvaluation), ...v0428SulongEvaluations, applyV0415EnelReview(v0413EnelEvaluation), v0420MagellanEvaluation]

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
