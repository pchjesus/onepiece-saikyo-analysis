export type CombatStructure =
  | '1v1'
  | 'multiple-vs-one'
  | 'one-vs-multiple'
  | 'multiple-vs-multiple'

export type CombatIntent =
  | 'normal'
  | 'serious'
  | 'full-power'
  | 'lethal-intent'
  | 'unknown'

export type BattleResult =
  | 'victory'
  | 'defeat'
  | 'draw'
  | 'interrupted'
  | 'unknown'

export type ParticipantCondition = {
  health?: string
  injuries?: string
  fatigue?: string
  previousBattles?: string
  cumulativeDamage?: string
  abilityUsage?: string
}

export type BattleParticipant = {
  id: string
  battleId: string
  characterId: string
  side: string
  condition: ParticipantCondition
}

export type Battle = {
  id: string
  title: string
  chronologyOrder: number
  combatStructure: CombatStructure
  combatPurpose: string
  combatIntent: CombatIntent
  environment: string
  restrictions: string
  externalFactors: string
  result: BattleResult
  participantIds: string[]
}
