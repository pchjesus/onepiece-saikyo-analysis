import { describe, expect, it } from 'vitest'
import { sampleBattleParticipants, sampleBattles } from '../../data/sample/battles'
import { validateBattle } from './validation'

const kingQueenBattle = sampleBattles.find(
  (battle) => battle.id === 'onigashima-marco-king-queen',
)

const kingQueenParticipants = sampleBattleParticipants.filter(
  (participant) => participant.battleId === 'onigashima-marco-king-queen',
)

describe('validateBattle', () => {
  it('accepts the current sample battles and their participant records', () => {
    for (const battle of sampleBattles) {
      const participants = sampleBattleParticipants.filter(
        (participant) => participant.battleId === battle.id,
      )

      expect(validateBattle(battle, participants)).toEqual({ valid: true, errors: [] })
    }
  })

  it('detects a battle reference to a missing participant', () => {
    expect(kingQueenBattle).toBeDefined()
    if (!kingQueenBattle) return

    const result = validateBattle(
      {
        ...kingQueenBattle,
        participantIds: [...kingQueenBattle.participantIds, 'missing-participant'],
      },
      kingQueenParticipants,
    )

    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Battle references missing participant: missing-participant.')
  })

  it('detects participant records that are not linked from the battle', () => {
    expect(kingQueenBattle).toBeDefined()
    if (!kingQueenBattle) return

    const result = validateBattle(
      { ...kingQueenBattle, participantIds: kingQueenBattle.participantIds.slice(0, 2) },
      kingQueenParticipants,
    )

    expect(result.valid).toBe(false)
    expect(result.errors).toContain(
      'Participant record is not linked from battle: participant-queen-marco-king.',
    )
  })

  it('detects participant records assigned to another battle', () => {
    expect(kingQueenBattle).toBeDefined()
    if (!kingQueenBattle) return

    const result = validateBattle(
      kingQueenBattle,
      [
        ...kingQueenParticipants,
        {
          id: 'participant-wrong-battle',
          battleId: 'different-battle',
          characterId: 'king',
          side: 'B',
          condition: {},
        },
      ],
    )

    expect(result.valid).toBe(false)
    expect(result.errors).toContain(
      'Battle participant participant-wrong-battle references battle different-battle, not onigashima-marco-king-queen.',
    )
  })
})
