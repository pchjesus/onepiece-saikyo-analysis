import type { Battle, BattleParticipant } from '../../domain/battle/types'
import { sampleBattles, sampleBattleParticipants } from '../sample/battles'
import { v0412Battles } from '../sample/v0412EightEvaluations'
import { v0420MagellanBattles } from '../sample/v0420MagellanRegistration'
import { v0413EnelBattles } from '../sample/v0413RemainingDraftPublication'
import { applyV0427JinbeBattleContext } from '../sample/v0427JinbeRecalibration'
import { v0428Battles } from '../sample/v0428SupportAxisCalibration'
import { v0432JackShutenmaruBattle, applyV0432JackBattleOrder } from '../sample/v0432JackShutenmaruBattleLink'
const currentBattles = [...sampleBattles.map(applyV0427JinbeBattleContext).map(applyV0432JackBattleOrder), v0432JackShutenmaruBattle, ...v0412Battles, ...v0413EnelBattles, ...v0420MagellanBattles, ...v0428Battles]

export interface BattleRepository {
  getBattle(battleId: string): Battle | undefined
  getParticipants(battleId: string): BattleParticipant[]
}

export const battleRepository: BattleRepository = {
  getBattle: (battleId) => currentBattles.find((battle) => battle.id === battleId),
  getParticipants: (battleId) => sampleBattleParticipants.filter((participant) => participant.battleId === battleId),
}
