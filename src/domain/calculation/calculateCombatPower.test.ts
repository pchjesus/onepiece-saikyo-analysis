import { describe, expect, it } from 'vitest'
import { balancedV12 } from '../../data/sample/calculationModels'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { getEffectiveHakiContributionTotal, getFinalStatScore, getRawHakiContributionTotal } from '../evaluation/score'
import { calculateBalancedCombatPower, validateEvaluation } from './calculateCombatPower'

const base = {
  ...sampleEvaluations[0],
  items: sampleEvaluations[0].items.map((item) => ({ ...item, baseScore: 50, score: 50, hakiContributions: [] })),
}

describe('Balanced v1.2', () => {
  it('calculates the arithmetic mean of seven final core stats', () => {
    expect(calculateBalancedCombatPower(base, balancedV12, '2026-10-07T00:00:00.000Z').finalScore).toBe(50)
  })

  it('accepts 0 and 100 boundaries', () => {
    const values = [0, 100, 50, 50, 50, 50, 50]
    const evaluation = { ...base, items: base.items.map((item, index) => ({ ...item, baseScore: values[index], score: values[index] })) }
    expect(calculateBalancedCombatPower(evaluation, balancedV12).finalScore).toBe(50)
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

  it('applies weighted Haki contribution before the seven-core mean', () => {
    const evaluation = {
      ...base,
      items: base.items.map((item, index) => index === 0 ? {
        ...item,
        baseScore: 80,
        score: 84,
        hakiContributions: [{ hakiType: 'conquerors' as const, stat: 'attack' as const, amount: 8, application: '검증용 공격 강화', evidenceIds: ['synthetic-evidence'] }],
      } : item),
    }
    expect(calculateBalancedCombatPower(evaluation, balancedV12).finalScore).toBeCloseTo(54.8571428571)
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

  it('calculates the calibrated roster Overalls from Final Stats', () => {
    const expected: Record<string, number> = {
      marco: 81.1428571429,
      jozu: 77.2857142857,
      vista: 79.1428571429,
      king: 80.7142857143,
      queen: 78.7142857143,
      jack: 74.4285714286,
      katakuri: 81.2857142857,
      smoothie: 76.7142857143,
      cracker: 71.8571428571,
      zoro: 84.8571428571,
      sanji: 84.4285714286,
      jinbe: 79.4285714286,
      shanks: 92.2857142857,
      garp: 95.1428571429,
      akainu: 92.4285714286,
      kuzan: 93.4285714286,
      kizaru: 94,
      fujitora: 89.7142857143,
      ryokugyu: 89.4285714286,
    }

    for (const evaluation of sampleEvaluations) {
      expect(calculateBalancedCombatPower(evaluation, balancedV12).finalScore)
        .toBeCloseTo(expected[evaluation.characterId])
    }
  })

  it('rejects inconsistent final scores', () => {
    const evaluation = { ...base, items: base.items.map((item, index) => index === 0 ? { ...item, baseScore: 50, score: 51 } : item) }
    expect(() => validateEvaluation(evaluation, 0.5)).toThrow()
  })

  it('rejects missing stats', () => {
    expect(() => validateEvaluation({ ...base, items: base.items.slice(0, 6) }, 0.5)).toThrow()
  })

  it('rejects duplicate stats', () => {
    expect(() => validateEvaluation({ ...base, items: [...base.items.slice(0, 6), base.items[0]] }, 0.5)).toThrow()
  })

  it('does not mutate the evaluation while calculating', () => {
    const before = structuredClone(base)
    calculateBalancedCombatPower(base, balancedV12)
    expect(base).toEqual(before)
  })
})
