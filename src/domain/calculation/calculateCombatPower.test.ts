import { describe, expect, it } from 'vitest'
import { balancedV11 } from '../../data/sample/calculationModels'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { getEffectiveHakiContributionTotal, getFinalStatScore, getRawHakiContributionTotal } from '../evaluation/score'
import { calculateBalancedCombatPower, validateEvaluation } from './calculateCombatPower'

const base = {
  ...sampleEvaluations[0],
  items: sampleEvaluations[0].items.map((item) => ({ ...item, baseScore: 50, score: 50, hakiContributions: [] })),
}

describe('Balanced v1.1', () => {
  it('calculates the arithmetic mean of eight final stats', () => {
    expect(calculateBalancedCombatPower(base, balancedV11, '2026-10-07T00:00:00.000Z').finalScore).toBe(50)
  })

  it('accepts 0 and 100 boundaries', () => {
    const evaluation = { ...base, items: base.items.map((item, index) => ({ ...item, baseScore: index % 2 ? 100 : 0, score: index % 2 ? 100 : 0 })) }
    expect(calculateBalancedCombatPower(evaluation, balancedV11).finalScore).toBe(50)
  })

  it('converts raw Haki +6 with weight 0.5 into effective +3', () => {
    const item = {
      ...base.items[0],
      baseScore: 80,
      hakiContributions: [
        { hakiType: 'armament' as const, stat: 'attack' as const, amount: 4, application: '검증용 1', evidenceIds: ['synthetic-1'] },
        { hakiType: 'conquerors' as const, stat: 'attack' as const, amount: 2, application: '검증용 2', evidenceIds: ['synthetic-2'] },
      ],
    }
    expect(getRawHakiContributionTotal(item)).toBe(6)
    expect(getEffectiveHakiContributionTotal(item, 0.5)).toBe(3)
    expect(getFinalStatScore(item, 0.5)).toBe(83)
  })

  it('applies weighted Haki contribution before the eight-stat mean', () => {
    const evaluation = {
      ...base,
      items: base.items.map((item, index) => index === 0 ? {
        ...item,
        baseScore: 80,
        score: 84,
        hakiContributions: [{ hakiType: 'conquerors' as const, stat: 'attack' as const, amount: 8, application: '검증용 공격 강화', evidenceIds: ['synthetic-evidence'] }],
      } : item),
    }
    expect(calculateBalancedCombatPower(evaluation, balancedV11).finalScore).toBe(54.25)
  })

  it('caps Final Stat at 100 after effective Haki is applied', () => {
    const item = { ...base.items[0], baseScore: 98, hakiContributions: [{ hakiType: 'armament' as const, stat: 'attack' as const, amount: 6, application: '검증용', evidenceIds: ['synthetic'] }] }
    expect(getFinalStatScore(item, 0.5)).toBe(100)
  })

  it('keeps Base and Final identical when raw Haki is zero', () => {
    const item = { ...base.items[0], baseScore: 76, hakiContributions: [] }
    expect(getRawHakiContributionTotal(item)).toBe(0)
    expect(getEffectiveHakiContributionTotal(item, 0.5)).toBe(0)
    expect(getFinalStatScore(item, 0.5)).toBe(76)
  })

  it('calculates the calibrated sample Overalls from Final Stats', () => {
    const marco = sampleEvaluations.find(({ characterId }) => characterId === 'marco')!
    const king = sampleEvaluations.find(({ characterId }) => characterId === 'king')!
    const katakuri = sampleEvaluations.find(({ characterId }) => characterId === 'katakuri')!
    expect(calculateBalancedCombatPower(marco, balancedV11).finalScore).toBe(81.125)
    expect(calculateBalancedCombatPower(king, balancedV11).finalScore).toBe(80.75)
    expect(calculateBalancedCombatPower(katakuri, balancedV11).finalScore).toBe(81.5)
  })

  it('rejects inconsistent final scores', () => {
    const evaluation = { ...base, items: base.items.map((item, index) => index === 0 ? { ...item, baseScore: 50, score: 51 } : item) }
    expect(() => validateEvaluation(evaluation, 0.5)).toThrow()
  })

  it('rejects missing stats', () => {
    expect(() => validateEvaluation({ ...base, items: base.items.slice(0, 7) }, 0.5)).toThrow()
  })

  it('rejects duplicate stats', () => {
    expect(() => validateEvaluation({ ...base, items: [...base.items.slice(0, 7), base.items[0]] }, 0.5)).toThrow()
  })

  it('does not mutate the evaluation while calculating', () => {
    const before = structuredClone(base)
    calculateBalancedCombatPower(base, balancedV11)
    expect(base).toEqual(before)
  })
})
