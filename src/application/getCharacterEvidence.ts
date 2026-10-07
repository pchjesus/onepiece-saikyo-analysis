import { battleRepository } from '../data/repositories/battleRepository'
import { evidenceRepository } from '../data/repositories/evidenceRepository'

export function getCharacterEvidence(characterId: string) {
  return evidenceRepository.getEvidenceForCharacter(characterId).map((evidence) => ({
    evidence,
    battle: battleRepository.getBattle(evidence.battleId),
  }))
}
