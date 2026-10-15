import type { Evidence } from '../../domain/evidence/types'
import { sampleEvidence } from '../sample/evidence'
import { v0412Evidence } from '../sample/v0412EightEvaluations'
const currentEvidence = [...sampleEvidence, ...v0412Evidence]

export interface EvidenceRepository {
  getEvidenceForBattle(battleId: string): Evidence[]
  getEvidenceForCharacter(characterId: string): Evidence[]
}

export const evidenceRepository: EvidenceRepository = {
  getEvidenceForBattle: (battleId) => currentEvidence.filter((evidence) => evidence.battleId === battleId),
  getEvidenceForCharacter: (characterId) => currentEvidence.filter((evidence) => evidence.subjectCharacterId === characterId),
}
