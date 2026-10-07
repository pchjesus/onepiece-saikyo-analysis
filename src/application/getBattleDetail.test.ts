import { describe, expect, it } from 'vitest'
import { getBattleDetail } from './getBattleDetail'

describe('getBattleDetail', () => {
  it('returns battle, participants, and linked evidence', () => {
    const detail = getBattleDetail('onigashima-marco-king-queen')

    expect(detail).toBeDefined()
    expect(detail?.participants).toHaveLength(3)
    expect(detail?.evidence).toHaveLength(4)
    expect(detail?.evidence.map(({ id }) => id)).toEqual([
      'evidence-marco-regeneration-1006',
      'evidence-marco-defense-king-1022',
      'evidence-king-marco-1006',
      'evidence-queen-marco-1006',
    ])
    expect(detail?.evidence.every(({ battleId }) => battleId === detail?.battle.id)).toBe(true)
  })
})
