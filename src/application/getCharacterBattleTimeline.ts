import { battleRepository } from '../data/repositories/battleRepository'
import { evidenceRepository } from '../data/repositories/evidenceRepository'

export function getCharacterBattleTimeline(characterId: string) {
  const evidenceRecords = evidenceRepository.getEvidenceForCharacter(characterId)
  const battleIds = [...new Set(evidenceRecords.map((evidence) => evidence.battleId))]

  return battleIds
    .map((battleId) => {
      const battle = battleRepository.getBattle(battleId)
      if (!battle) throw new Error(`Incomplete battle data: ${battleId}`)

      return {
        battle,
        evidence: evidenceRecords.filter((evidence) => evidence.battleId === battleId),
      }
    })
    .sort((a, b) => a.battle.chronologyOrder - b.battle.chronologyOrder)
}
