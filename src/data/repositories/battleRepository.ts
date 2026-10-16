import type { Battle, BattleParticipant } from '../../domain/battle/types'
import { sampleBattles, sampleBattleParticipants } from '../sample/battles'
import { v0412Battles } from '../sample/v0412EightEvaluations'
import { v0413EnelBattles } from '../sample/v0413RemainingDraftPublication'
const currentBattles = [...sampleBattles, ...v0412Battles, ...v0413EnelBattles]

export interface BattleRepository {
  getBattle(battleId: string): Battle | undefined
  getParticipants(battleId: string): BattleParticipant[]
}

export const battleRepository: BattleRepository = {
  getBattle: (battleId) => currentBattles.find((battle) => battle.id === battleId),
  getParticipants: (battleId) => sampleBattleParticipants.filter((participant) => participant.battleId === battleId),
}
