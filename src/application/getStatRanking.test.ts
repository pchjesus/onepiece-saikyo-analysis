import { describe, expect, it } from 'vitest'
import { COMBAT_STATS } from '../domain/evaluation/types'
import { getStatRanking } from './getStatRanking'

describe('getStatRanking', () => {
  it('sorts all evaluated characters by each Final Core Stat descending', () => {
    for (const stat of COMBAT_STATS) {
      const entries = getStatRanking(stat)
      expect(entries).toHaveLength(24)
      expect(new Set(entries.map(({ characterId }) => characterId)).size).toBe(24)
      expect(entries.every(({ status }) => status === 'draft')).toBe(true)
      for (let i = 1; i < entries.length; i++) {
        expect(entries[i - 1].score).toBeGreaterThanOrEqual(entries[i].score)
        if (entries[i - 1].score === entries[i].score) {
          expect(entries[i].rank).toBe(entries[i - 1].rank)
        }
      }
    }
  })

  it('uses the approved Final values and handles ties', () => {
    const attack = getStatRanking('attack')
    expect(attack[0]).toMatchObject({ characterId: 'garp', score: 99, rank: 1 })
    const speed = getStatRanking('speed')
    expect(speed[0]).toMatchObject({ characterId: 'kizaru', score: 99, rank: 1 })
    const versatility = getStatRanking('versatility')
    expect(versatility[0]).toMatchObject({ characterId: 'kizaru', score: 97, rank: 1 })
    expect(attack.find(({ characterId }) => characterId === 'zoro')?.score).toBe(90)
  })
  it('sorts the current 24-character Overall from the calculation service', () => {
    const entries = getStatRanking('overall')
    expect(entries).toHaveLength(24)
    expect(entries[0]).toMatchObject({ characterId: 'garp', rank: 1 })
    expect(entries[0].score).toBeCloseTo(95.14285714285714)
    expect(entries[23]).toMatchObject({ characterId: 'pizarro', rank: 24, score: 72 })
    for (let index = 1; index < entries.length; index++) {
      expect(entries[index - 1].score).toBeGreaterThanOrEqual(entries[index].score)
    }
  })

})
