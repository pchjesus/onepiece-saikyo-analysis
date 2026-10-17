import type { Evidence } from '../../domain/evidence/types'
import { sampleEvidence } from '../sample/evidence'
import { v0412Evidence } from '../sample/v0412EightEvaluations'
import { v0421EmperorTechniqueEvidence } from '../sample/v0421EmperorTechniqueReview'
import { v0420MagellanEvidence } from '../sample/v0420MagellanRegistration'
import { v0413EnelEvidence } from '../sample/v0413RemainingDraftPublication'
import { applyV0416Cp0EvidenceAudit } from '../sample/v0416Cp0EvidenceReadiness'
import { applyV0427JinbeEvidenceCorrection, v0427JinbeEvidence } from '../sample/v0427JinbeRecalibration'
const currentEvidence = [...sampleEvidence.map(applyV0427JinbeEvidenceCorrection), ...v0427JinbeEvidence, ...v0412Evidence.map(applyV0416Cp0EvidenceAudit), ...v0413EnelEvidence, ...v0420MagellanEvidence, ...v0421EmperorTechniqueEvidence]

export interface EvidenceRepository {
  getEvidenceForBattle(battleId: string): Evidence[]
  getEvidenceForCharacter(characterId: string): Evidence[]
}

export const evidenceRepository: EvidenceRepository = {
  getEvidenceForBattle: (battleId) => currentEvidence.filter((evidence) => evidence.battleId === battleId),
  getEvidenceForCharacter: (characterId) => currentEvidence.filter((evidence) => evidence.subjectCharacterId === characterId),
}
