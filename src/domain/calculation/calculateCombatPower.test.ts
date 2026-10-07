import { describe, expect, it } from 'vitest'
import { balancedV1 } from '../../data/sample/calculationModels'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { calculateBalancedCombatPower, validateEvaluation } from './calculateCombatPower'

const base = {
  ...sampleEvaluations[0],
  items: sampleEvaluations[0].items.map((item) => ({ ...item, baseScore: 50, score: 50, hakiContributions: [] })),
}

describe('Balanced v1', () => {
  it('calculates the arithmetic mean of eight final stats', () => {
    expect(calculateBalancedCombatPower(base, balancedV1, '2026-10-04T00:00:00.000Z').finalScore).toBe(50)
  })

  it('accepts 0 and 100 boundaries', () => {
    const evaluation = { ...base, items: base.items.map((item, index) => ({ ...item, baseScore: index % 2 ? 100 : 0, score: index % 2 ? 100 : 0 })) }
    expect(calculateBalancedCombatPower(evaluation, balancedV1).finalScore).toBe(50)
  })

  it('applies Haki contribution before the eight-stat mean', () => {
    const evaluation = {
      ...base,
      items: base.items.map((item, index) => index === 0 ? {
        ...item,
        baseScore: 80,
        score: 88,
        hakiContributions: [{ hakiType: 'conquerors' as const, stat: 'attack' as const, amount: 8, application: '검증용 공격 강화', evidenceIds: ['synthetic-evidence'] }],
      } : item),
    }
    expect(calculateBalancedCombatPower(evaluation, balancedV1).finalScore).toBe(54.75)
  })

  it('rejects inconsistent final scores', () => {
    const evaluation = { ...base, items: base.items.map((item, index) => index === 0 ? { ...item, baseScore: 50, score: 51 } : item) }
    expect(() => validateEvaluation(evaluation)).toThrow()
  })

  it('rejects missing stats', () => {
    expect(() => validateEvaluation({ ...base, items: base.items.slice(0, 7) })).toThrow()
  })

  it('rejects duplicate stats', () => {
    expect(() => validateEvaluation({ ...base, items: [...base.items.slice(0, 7), base.items[0]] })).toThrow()
  })

  it('does not mutate the evaluation while calculating', () => {
    const before = structuredClone(base)
    calculateBalancedCombatPower(base, balancedV1)
    expect(base).toEqual(before)
  })
})
