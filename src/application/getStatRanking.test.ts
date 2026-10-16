import { describe, expect, it } from 'vitest'
import { COMBAT_STATS } from '../domain/evaluation/types'
import { getHighestOverallStateIds, getStatRanking } from './getStatRanking'
import { evaluationRepository } from '../data/repositories/evaluationRepository'
import { getCombatPower } from './getCombatPower'

describe('getStatRanking', () => {
  it('selects each multi-state character highest actual Overall as popup default, regardless of stored default/order', () => {
    const highest = getHighestOverallStateIds()
    expect(highest.luffy).toBe('egghead-gear5')
    expect(highest.newgate).toBe('prime')
    expect(highest.garp).toBe('prime')
    for(const [id,state] of Object.entries(highest)) {
      const options = evaluationRepository.getEvaluations(id)
      const chosen = getCombatPower(id, 'balanced', state).finalScore
      expect(options.length).toBeGreaterThan(1)
      expect(options.every(e=>chosen >= getCombatPower(id,'balanced',e.subjectState?.id).finalScore)).toBe(true)
    }
    const selected = getStatRanking('overall',highest)
    expect(selected).toHaveLength(81)
    expect(new Set(selected.map(x=>x.characterId)).size).toBe(81)
    expect(selected.find(x=>x.characterId==='luffy')?.subjectStateId).toBe('egghead-gear5')
    expect(selected.find(x=>x.characterId==='newgate')?.subjectStateId).toBe('prime')
  })

  it('sorts all evaluated characters by each Final Core Stat descending', () => {
    for (const stat of COMBAT_STATS) {
      const entries = getStatRanking(stat)
      expect(entries).toHaveLength(81)
      expect(new Set(entries.map(({ characterId }) => characterId)).size).toBe(81)
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
    expect(attack.slice(0, 3).map(({ characterId }) => characterId).sort()).toEqual(['newgate', 'rocks', 'roger'].sort())
    expect(attack.slice(0, 3).every(({ score, rank }) => score === 100 && rank === 1)).toBe(true)
    const speed = getStatRanking('speed')
    expect(speed[0]).toMatchObject({ characterId: 'kizaru', score: 99, rank: 1 })
    const versatility = getStatRanking('versatility')
    expect(versatility[0]).toMatchObject({ characterId: 'luffy', score: 99, rank: 1 })
    expect(versatility.find(x=>x.characterId==='linlin')?.score).toBe(97)
    expect(attack.find(({ characterId }) => characterId === 'zoro')?.score).toBe(90)
  })
  it('deduplicates multi-membership Characters and keeps their representative Group', () => {
    const entries = getStatRanking('overall')
    const mihawk = entries.filter(({ characterId }) => characterId === 'mihawk')
    const crocodile = entries.filter(({ characterId }) => characterId === 'crocodile')

    expect(mihawk).toHaveLength(1)
    expect(crocodile).toHaveLength(1)
    expect(mihawk[0]).toMatchObject({ groupId: 'cross-guild', groupName: '크로스 길드' })
    expect(crocodile[0]).toMatchObject({ groupId: 'cross-guild', groupName: '크로스 길드' })
  })

  it('sorts the current 42-character Overall from the calculation service', () => {
    const entries = getStatRanking('overall')
    expect(entries).toHaveLength(81)
    expect(entries.slice(0, 2).map(({ characterId }) => characterId).sort()).toEqual(['newgate', 'roger'].sort())
    expect(entries.slice(0, 2).every(({ rank, score }) => rank === 1 && Math.abs(score - 97.57142857142857) < 1e-10)).toBe(true)
    expect(entries.find(({ characterId }) => characterId === 'garp')).toMatchObject({ rank: 3, subjectStateLabel: '전성기' })
    expect(entries.find(({ characterId })=>characterId==='page-one')?.score).toBeCloseTo(491/7,10)
    expect(entries[entries.length-1]).toMatchObject({ characterId:'buggy',rank:81,score:38 })
    for (let index = 1; index < entries.length; index++) {
      expect(entries[index - 1].score).toBeGreaterThanOrEqual(entries[index].score)
    }
  })

})
