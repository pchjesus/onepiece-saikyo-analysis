import { describe, expect, it } from 'vitest'
import { getUniqueCharacterList } from '../../application/getCharacterList'
import { getCombatPower } from '../../application/getCombatPower'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleMemberships } from './memberships'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'

const score = (characterId: string, stateId?: string) => getCombatPower(characterId, 'balanced', stateId).finalScore

describe('v0.1.33 legendary-era expansion', () => {
  it('adds seven Characters, nine Evaluations and historical Memberships without ranking duplication', () => {
    expect(sampleCharacters).toHaveLength(37)
    expect(sampleEvaluations).toHaveLength(39)
    expect(sampleMemberships).toHaveLength(41)
    expect(getUniqueCharacterList()).toHaveLength(36)
    expect(new Set(getUniqueCharacterList().map(({ character }) => character.id)).size).toBe(36)

    expect(sampleMemberships.filter(({ characterId }) => characterId === 'newgate').map(({ groupId }) => groupId))
      .toEqual(['whitebeard-pirates', 'rocks-pirates'])
    expect(sampleMemberships.filter(({ characterId }) => characterId === 'kaido').map(({ groupId }) => groupId))
      .toEqual(['beasts-pirates', 'rocks-pirates'])
    expect(sampleMemberships.filter(({ characterId }) => characterId === 'linlin').map(({ groupId }) => groupId))
      .toEqual(['big-mom-pirates', 'rocks-pirates'])
  })

  it('uses the approved recalibrated legendary scale without treating tiny Overall gaps as matchup results', () => {
    expect(score('roger')).toBeCloseTo(97.5714285714)
    expect(score('newgate')).toBeCloseTo(97.5714285714)
    expect(score('garp')).toBeCloseTo(97.4285714286)
    expect(score('rocks')).toBeCloseTo(97.2857142857)
    expect(score('kaido')).toBeCloseTo(96.5714285714)
    expect(score('garp', 'current')).toBeCloseTo(94.4285714286)
    expect(score('linlin')).toBeCloseTo(94.2857142857)
    expect(score('rayleigh')).toBeCloseTo(92.8571428571)
    expect(score('newgate', 'marineford')).toBeCloseTo(92.8571428571)
    expect(score('gaban')).toBeCloseTo(92.1428571429)
    expect(score('rayleigh', 'current')).toBeCloseTo(90.2857142857)
  })

  it('keeps current Gaban in the Admiral band rather than turning survival against Imu into a 94-point result', () => {
    expect(score('gaban')).toBeCloseTo(score('kizaru'), 10)
    expect(score('gaban')).toBeLessThan(score('akainu'))
    expect(score('gaban')).toBeLessThan(score('kuzan'))
    expect(score('gaban')).toBeLessThan(score('garp', 'current'))
  })

  it('keeps Prime Rayleigh provisional and does not create a numeric Prime Gaban Evaluation', () => {
    const rayleighPrime = sampleEvaluations.find(({ id }) => id === 'evaluation-rayleigh-prime')
    expect(rayleighPrime?.items.every(({ readiness }) => readiness === 'E2')).toBe(true)

    expect(sampleEvaluations.some(({ characterId, subjectState }) =>
      characterId === 'gaban' && subjectState?.id === 'prime')).toBe(false)
    expect(sampleEvaluations.find(({ characterId }) => characterId === 'gaban')?.subjectState?.id).toBe('current')
  })

  it('stores per-stat readiness independently from score magnitude', () => {
    const newIds = ['roger', 'rayleigh', 'gaban', 'rocks', 'newgate', 'kaido', 'linlin']
    for (const evaluation of sampleEvaluations.filter(({ characterId }) => newIds.includes(characterId))) {
      expect(evaluation.items.every(({ readiness }) => readiness === 'E1' || readiness === 'E2')).toBe(true)
    }

    const rocksDefense = sampleEvaluations.find(({ id }) => id === 'evaluation-rocks')
      ?.items.find(({ stat }) => stat === 'defense')
    expect(rocksDefense).toMatchObject({ score: 98, readiness: 'E2' })
  })

  it('keeps Haki Capability, typed Stat Application and Matchup interaction separated', () => {
    const gaban = sampleCharacters.find(({ id }) => id === 'gaban')
    expect(gaban?.combatProfile.haki.capabilities.find(({ type }) => type === 'armament')?.status).toBe('unclear')
    expect(gaban?.combatProfile.haki.capabilities.find(({ type }) => type === 'observation')?.status).toBe('confirmed')
    expect(gaban?.combatProfile.haki.capabilities.find(({ type }) => type === 'conquerors')?.status).toBe('confirmed')

    const gabanEvaluation = sampleEvaluations.find(({ id }) => id === 'evaluation-gaban-current')
    expect(getRawHakiContributionTotal(gabanEvaluation?.items.find(({ stat }) => stat === 'attack')!)).toBe(0)
    expect(getRawHakiContributionTotal(gabanEvaluation?.items.find(({ stat }) => stat === 'combatIQ')!)).toBe(2)

    const linlinHakiResistance = sampleEvidence.find(({ id }) => id === 'evidence-linlin-hakai-haki-1009')
    expect(linlinHakiResistance?.interpretation).toContain('특정 Armament/Conqueror Raw에 임의 분배하지 않는다')
  })

  it('keeps demonized Rocks as context instead of importing its altered durability into natural Rocks', () => {
    const context = sampleEvidence.find(({ id }) => id === 'evidence-rocks-demonized-context-1164-1166')
    expect(context?.interpretation).toContain('별도 Evaluation 대상이 아니며')
    expect(sampleEvaluations.find(({ id }) => id === 'evaluation-rocks')?.subjectState?.id).toBe('god-valley-natural')
    expect(sampleEvaluations.some(({ subjectState }) => subjectState?.id === 'demonized')).toBe(false)
  })
})
