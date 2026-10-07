import type { Battle, BattleParticipant } from '../../domain/battle/types'
import { sampleBattles, sampleBattleParticipants } from '../sample/battles'

export interface BattleRepository {
  getBattle(battleId: string): Battle | undefined
  getParticipants(battleId: string): BattleParticipant[]
}

export const battleRepository: BattleRepository = {
  getBattle: (battleId) => sampleBattles.find((battle) => battle.id === battleId),
  getParticipants: (battleId) => sampleBattleParticipants.filter((participant) => participant.battleId === battleId),
}
