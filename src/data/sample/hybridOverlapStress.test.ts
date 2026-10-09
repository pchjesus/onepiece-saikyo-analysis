import { describe, expect, it } from 'vitest'
import { previewHybridOverlapStress } from '../../domain/evaluation/hybridOverlapStress'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { sampleEvaluations } from './evaluations'
import { hybridRawPilotReviews } from './hybridRawPilotReviews'
import { balancedV12 } from './calculationModels'

describe('Haki cross-stat overlap: non-production sensitivity, never a score recommendation', () => {
  it('covers all six flagged allocations with an explicitly non-conserving Base', () => {
    const { evaluations, affected, reviewCount, suppressedRaw } =
      previewHybridOverlapStress(sampleEvaluations, hybridRawPilotReviews, 0.5)
    expect(reviewCount).toBe(6)
    expect(suppressedRaw).toBe(28)
    expect(affected).toHaveLength(5)
    expect(evaluations).toHaveLength(62)
    expect(evaluations.flatMap(({ items }) => items)).toHaveLength(434)
    expect(evaluations.flatMap(({ items }) => items)
      .flatMap(({ hakiContributions }) => hakiContributions)
      .reduce((sum, c) => sum + c.amount, 0)).toBe(216)
    expect(sampleEvaluations.flatMap(({ items }) => items)
      .flatMap(({ hakiContributions }) => hakiContributions)
      .reduce((sum, c) => sum + c.amount, 0)).toBe(244)

    const expected = [
      ['evaluation-kuzan', 'techniqueMastery', 93, 91],
      ['evaluation-shanks', 'techniqueMastery', 96, 92],
      ['evaluation-katakuri', 'techniqueMastery', 87, 84],
      ['evaluation-katakuri', 'combatIQ', 84, 82],
      ['evaluation-linlin', 'techniqueMastery', 94, 91],
    ] as const
    for (const [id, stat, before, after] of expected) {
      const row = affected.find((item) => item.evaluationId === id && item.stat === stat)
      expect(row?.beforeFinal, id + ' ' + stat).toBe(before)
      expect(row?.stressFinal, id + ' ' + stat).toBe(after)
    }
  })

  it('preserves all unaffected Stats and exposes precise Overall sensitivity across all 39 states', () => {
    const { evaluations: simulated } = previewHybridOverlapStress(sampleEvaluations, hybridRawPilotReviews, 0.5)
    const expectedLoss = new Map([
      ['evaluation-kuzan', 2], ['evaluation-shanks', 4],
      ['evaluation-katakuri', 5], ['evaluation-linlin', 3],
    ])
    const originals = new Map(sampleEvaluations.map((e) => [e.id, e]))
    for (const e of simulated) {
      const original = originals.get(e.id)!
      const before = calculateBalancedCombatPower(original, balancedV12).finalScore
      const after = calculateBalancedCombatPower(e, balancedV12).finalScore
      expect((before - after) * 7, e.id).toBeCloseTo(expectedLoss.get(e.id) ?? 0, 9)
      for (const item of e.items) {
        const old = original.items.find((i) => i.stat === item.stat)!
        expect(item.baseScore).toBe(old.baseScore)
        if (!['techniqueMastery', 'combatIQ'].includes(item.stat) || !expectedLoss.has(e.id)) {
          expect(item.score, e.id + ' ' + item.stat).toBe(old.score)
        }
      }
    }
    const score = (id: string) => calculateBalancedCombatPower(simulated.find((e) => e.id === id)!, balancedV12).finalScore
    expect(score('evaluation-kuzan')).toBeCloseTo(647 / 7, 9)
    expect(score('evaluation-shanks')).toBeCloseTo(644 / 7, 9)
    expect(score('evaluation-katakuri')).toBeCloseTo(585 / 7, 9)
    expect(score('evaluation-linlin')).toBeCloseTo(657 / 7, 9)
    // Project does not infer probabilities or redraw canon 1v1 matchup winners.
  })

  it('rejects invalid and stale review data instead of altering the production record', () => {
    const reviews = hybridRawPilotReviews.filter((r) => r.disposition === 'cross-stat-overlap-unresolved')
    expect(() => previewHybridOverlapStress(sampleEvaluations, [...reviews, reviews[0]], 0.5))
      .toThrow('Duplicate overlap review')
    expect(() => previewHybridOverlapStress(sampleEvaluations, [{ ...reviews[0], expectedRaw: 100 }], 0.5))
      .toThrow('Stale or ambiguous')
    expect(() => previewHybridOverlapStress(sampleEvaluations, reviews, 2))
      .toThrow('between 0 and 1')
  })
})
