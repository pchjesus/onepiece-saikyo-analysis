import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { calculateBalancedCombatPower } from './calculateCombatPower'
import { balancedV12 } from '../../data/sample/calculationModels'
import { getFinalStatScore, getRawHakiContributionTotal } from '../evaluation/score'
import { COMBAT_STATS } from '../evaluation/types'

// This test is a *diagnostic* for the v0.1.48 data baseline.
// Neither alternative weighting is a CalculationModel or a proposed win probability.
const scenarios = {
  physicalExample: [25, 20, 20, 20, 5, 5, 5],
  strategyExample: [10, 10, 10, 10, 20, 20, 20],
}

const roster = sampleEvaluations.filter((entry) => entry.isDefault !== false)
const scores = roster.map((evaluation) => ({
  id: evaluation.characterId,
  stats: COMBAT_STATS.map((stat) => {
    const item = evaluation.items.find((i) => i.stat === stat)
    if (!item) throw Error(`Missing ${stat} for ${evaluation.characterId}`)
    return getFinalStatScore(item)
  }),
  evaluation,
}))
const get = (id: string) => scores.find((entry) => entry.id === id)!
const avg = (values: number[]) => values.reduce((sum, x) => sum + x, 0) / values.length
const weighted = (values: number[], weights: number[]) =>
  values.reduce((sum, value, index) => sum + value * weights[index], 0) / weights.reduce((sum, x) => sum + x, 0)
const position = (id: string, weights: number[]) =>
  1 + [...scores].sort((a, b) =>
    weighted(b.stats, weights) - weighted(a.stats, weights)
    || a.id.localeCompare(b.id, 'ko')).findIndex((r) => r.id === id)

describe('v0.1.49 Overall validity and uncertainty diagnostic (not an official calculation model)', () => {
  it('reproduces all 59 Balanced 1.2 results without changing scores, Haki or matchups', () => {
    expect(roster).toHaveLength(59)
    expect(scores).toHaveLength(59)
    expect(new Set(roster.map((e) => e.characterId)).size).toBe(59)
    for (const entry of scores) {
      expect(calculateBalancedCombatPower(entry.evaluation, balancedV12).finalScore)
        .toBeCloseTo(avg(entry.stats), 10)
    }
    expect(sampleEvaluations.flatMap((e) => e.items)
      .reduce((sum, item) => sum + getRawHakiContributionTotal(item), 0)).toBe(244)
  })

  it('flags same-average, different-profile cases rather than treating Overall ties as equal matchups', () => {
    const kanjuro = get('kanjuro').stats
    const ulti = get('ulti').stats
    const cracker = get('cracker').stats
    const karasu = get('karasu').stats
    expect(avg(kanjuro)).toBeCloseTo(avg(ulti), 10)
    expect(avg(cracker)).toBeCloseTo(avg(karasu), 10)
    expect(kanjuro.reduce((sum, x, i) => sum + Math.abs(x - ulti[i]), 0)).toBe(78)
    expect(cracker.reduce((sum, x, i) => sum + Math.abs(x - karasu[i]), 0)).toBe(30)
  })

  it('records sensitivity of Jack placement to illustrative weights, without changing Balanced rank', () => {
    expect(position('jack', [1, 1, 1, 1, 1, 1, 1])).toBe(36)
    expect(position('jack', scenarios.physicalExample)).toBe(25)
    expect(position('jack', scenarios.strategyExample)).toBe(44)
    expect(position('kid', [1, 1, 1, 1, 1, 1, 1])).toBe(20)
    expect(position('kid', scenarios.physicalExample)).toBe(17)
    expect(position('kid', scenarios.strategyExample)).toBe(23)
  })

  it('quantifies metadata coverage without misclassifying missing readiness as E3', () => {
    const counts = { E1: 0, E2: 0, E3: 0, missing: 0 }
    for (const evaluation of roster) for (const item of evaluation.items) {
      if (item.readiness) counts[item.readiness]++
      else counts.missing++
    }
    expect(counts).toEqual({ E1: 43, E2: 208, E3: 111, missing: 51 })
  })
})
