import type { Battle, BattleParticipant } from './types'

export type BattleValidationResult = {
  valid: boolean
  errors: string[]
}

const COMBAT_STRUCTURES: readonly Battle['combatStructure'][] = [
  '1v1',
  'multiple-vs-one',
  'one-vs-multiple',
  'multiple-vs-multiple',
]

const COMBAT_INTENTS: readonly Battle['combatIntent'][] = [
  'normal',
  'serious',
  'full-power',
  'lethal-intent',
  'unknown',
]

const BATTLE_RESULTS: readonly Battle['result'][] = [
  'victory',
  'defeat',
  'draw',
  'interrupted',
  'unknown',
]

const includes = <T extends string>(values: readonly T[], value: string): value is T =>
  (values as readonly string[]).includes(value)

export const validateBattle = (
  battle: Battle,
  participants: BattleParticipant[],
): BattleValidationResult => {
  const errors: string[] = []

  if (!battle.id.trim()) errors.push('Battle id is required.')
  if (!battle.title.trim()) errors.push('Battle title is required.')
  if (!Number.isInteger(battle.chronologyOrder) || battle.chronologyOrder < 1) {
    errors.push('Battle chronology order must be a positive integer.')
  }
  if (!includes(COMBAT_STRUCTURES, battle.combatStructure)) {
    errors.push(`Invalid combat structure: ${battle.combatStructure}.`)
  }
  if (!battle.combatPurpose.trim()) errors.push('Combat purpose is required.')
  if (!includes(COMBAT_INTENTS, battle.combatIntent)) {
    errors.push(`Invalid combat intent: ${battle.combatIntent}.`)
  }
  if (!battle.environment.trim()) errors.push('Battle environment is required.')
  if (!battle.restrictions.trim()) errors.push('Battle restrictions are required.')
  if (!battle.externalFactors.trim()) errors.push('External factors are required.')
  if (!includes(BATTLE_RESULTS, battle.result)) {
    errors.push(`Invalid battle result: ${battle.result}.`)
  }

  const participantIdSet = new Set<string>()
  for (const participantId of battle.participantIds) {
    if (!participantId.trim()) {
      errors.push('Participant id cannot be empty.')
      continue
    }
    if (participantIdSet.has(participantId)) {
      errors.push(`Duplicate participant id in battle: ${participantId}.`)
    }
    participantIdSet.add(participantId)
  }

  const participantRecordSet = new Set<string>()
  for (const participant of participants) {
    if (!participant.id.trim()) errors.push('Battle participant id is required.')
    if (!participant.battleId.trim()) errors.push('Battle participant battle id is required.')
    if (!participant.characterId.trim()) errors.push('Battle participant character id is required.')
    if (!participant.side.trim()) errors.push(`Battle participant side is required: ${participant.id}.`)

    if (participantRecordSet.has(participant.id)) {
      errors.push(`Duplicate battle participant record: ${participant.id}.`)
    }
    participantRecordSet.add(participant.id)

    if (participant.battleId !== battle.id) {
      errors.push(
        `Battle participant ${participant.id} references battle ${participant.battleId}, not ${battle.id}.`,
      )
    }
  }

  for (const participantId of battle.participantIds) {
    if (!participantRecordSet.has(participantId)) {
      errors.push(`Battle references missing participant: ${participantId}.`)
    }
  }

  for (const participantId of participantRecordSet) {
    if (!participantIdSet.has(participantId)) {
      errors.push(`Participant record is not linked from battle: ${participantId}.`)
    }
  }

  return { valid: errors.length === 0, errors }
}
