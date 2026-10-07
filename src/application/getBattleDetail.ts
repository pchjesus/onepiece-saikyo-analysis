import { battleRepository } from '../data/repositories/battleRepository'
import { evidenceRepository } from '../data/repositories/evidenceRepository'

export function getBattleDetail(battleId: string) {
  const battle = battleRepository.getBattle(battleId)
  if (!battle) return undefined

  return {
    battle,
    participants: battleRepository.getParticipants(battleId),
    evidence: evidenceRepository.getEvidenceForBattle(battleId),
  }
}
