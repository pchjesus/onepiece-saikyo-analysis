import type { Evidence } from '../../domain/evidence/types'
import { sampleEvidence } from '../sample/evidence'

export interface EvidenceRepository {
  getEvidenceForBattle(battleId: string): Evidence[]
  getEvidenceForCharacter(characterId: string): Evidence[]
}

export const evidenceRepository: EvidenceRepository = {
  getEvidenceForBattle: (battleId) => sampleEvidence.filter((evidence) => evidence.battleId === battleId),
  getEvidenceForCharacter: (characterId) => sampleEvidence.filter((evidence) => evidence.subjectCharacterId === characterId),
}
