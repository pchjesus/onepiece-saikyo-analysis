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
      marco: 83.4285714286,
      jozu: 77.4285714286,
      vista: 79.4285714286,
      king: 82.5714285714,
      queen: 78.5714285714,
      jack: 78.1428571429,
      katakuri: 84.0000000000,
      smoothie: 76.5714285714,
      cracker: 77.8571428571,
      zoro: 84.7142857143,
      sanji: 84.4285714286,
      jinbe: 79.2857142857,
      shanks: 92.5714285714,
      garp: 97.4285714286,
      akainu: 92.4285714286,
      kuzan: 92.7142857143,
      kizaru: 92.1428571429,
      fujitora: 89,
      ryokugyu: 87.5714285714,
      teach: 90.5714285714,
      shiryu: 77.1428571429,
      burgess: 74.1428571429,
      'van-augur': 74.5714285714,
      pizarro: 71.7142857143,
      law: 86.4285714286,
      doflamingo: 79.5714285714,
      hancock: 78.7142857143,
      mihawk: 92.7142857143,
      crocodile: 79,
      roger: 97.5714285714,
      rayleigh: 92.8571428571,
      gaban: 92.1428571429,
      rocks: 97.2857142857,
      newgate: 97.5714285714,
      kaido: 96.7142857143,
      linlin: 94.2857142857,
      sabo: 85.5714285714,
      morley: 79.2857142857,
      karasu: 77.8571428571,
      lucci: 78,
      kaku: 74.2857142857,
      stussy: 77.5714285714,
      'kid': 84.5714285714,
      'killer': 79.1428571429,
      'kinemon': 76.2857142857,
      'denjiro': 78.2857142857,
      'ashura-doji': 76.8571428571,
      'kawamatsu': 74.7142857143,
      'kikunojo': 73.8571428571,
      'raizo': 75.2857142857,
      'inuarashi': 79.1428571429,
      'nekomamushi': 78.5714285714,
      'kanjuro': 75.1428571429,
      'whos-who': 77.1428571429,
      'sasaki': 73.0000000000,
      'black-maria': 75.4285714286,
      'ulti': 75.1428571429,
      'page-one': 70.1428571429,
      'x-drake': 77.2857142857,
    }

    const stateExpected: Record<string, number> = {
      'evaluation-garp-current': 94.4285714286,
      'evaluation-rayleigh-current': 90.2857142857,
      'evaluation-newgate-marineford': 92.8571428571,
    }

    for (const evaluation of sampleEvaluations) {
      const expectedScore = stateExpected[evaluation.id] ?? expected[evaluation.characterId]
      expect(calculateBalancedCombatPower(evaluation, balancedV12).finalScore)
        .toBeCloseTo(expectedScore)
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
