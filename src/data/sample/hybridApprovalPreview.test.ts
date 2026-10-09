import { describe, expect, it } from 'vitest'
import { buildHybridApprovalPreview } from './hybridApprovalPreview'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { balancedV12 } from './calculationModels'

describe('v0.1.37 user-approval-only score decomposition', () => {
  const preview = buildHybridApprovalPreview()
  const row = (evaluationId: string, stat: string) =>
    preview.overlapIncluded.evaluations.find((e) => e.id === evaluationId)!
      .items.find((item) => item.stat === stat)!

  it('keeps approved A live and previews 6 additional overlap transfers without changing production', () => {
    expect(preview.status).toBe('A-merged-B-user-approval-required')
    expect(preview.baseline).toHaveLength(39)
    expect(preview.ordinary.changes).toHaveLength(0)
    expect(preview.overlapIncluded.changes).toHaveLength(6)
    expect(preview.overlapIncluded.reviewCount).toBe(10)
    expect(preview.overlapIncluded.unresolvedCount).toBe(4)
    expect(preview.overlapIncluded.evaluations.flatMap(e => e.items)).toHaveLength(273)
    const raw = (items: typeof preview.baseline) =>
      items.flatMap(e => e.items).reduce((sum, item) => sum + getRawHakiContributionTotal(item), 0)
    expect(raw(preview.baseline)).toBe(244)
    expect(raw(preview.ordinary.evaluations)).toBe(244)
    expect(raw(preview.overlapIncluded.evaluations)).toBe(216)
    expect(preview.baseline.flatMap(e => e.items)
      .flatMap(i => i.hakiContributions)).toHaveLength(49)
    expect(preview.overlapIncluded.evaluations.flatMap(e => e.items)
      .flatMap(i => i.hakiContributions)).toHaveLength(43)
  })

  it('checks 4 already approved and 6 hypothetical transfers across 9 Stat rows', () => {
    const expected = [
      ['evaluation-akainu', 'defense', 95, 0, 95],
      ['evaluation-kuzan', 'attack', 93, 0, 93],
      ['evaluation-kuzan', 'defense', 93, 0, 93],
      ['evaluation-kuzan', 'techniqueMastery', 93, 0, 93],
      ['evaluation-katakuri', 'attack', 81, 0, 81],
      ['evaluation-katakuri', 'techniqueMastery', 86, 0, 86],
      ['evaluation-katakuri', 'combatIQ', 83, 0, 83],
      ['evaluation-shanks', 'techniqueMastery', 96, 0, 96],
      ['evaluation-linlin', 'techniqueMastery', 94, 0, 94],
    ] as const
    // Ten Haki applications occupy nine Stat rows: Shanks Technique has two types.
    expect(expected).toHaveLength(9)
    for (const [id, stat, base, raw, final] of expected) {
      const item = row(id, stat)
      expect([item.baseScore, getRawHakiContributionTotal(item), item.score], id+'/'+stat)
        .toEqual([base, raw, final])
    }
    const shanksMoved = preview.overlapIncluded.changes
      .filter(c => c.evaluationId === 'evaluation-shanks' && c.stat === 'techniqueMastery')
    expect(shanksMoved).toHaveLength(2)
  })

  it('preserves all original 39 scores and ranking inputs; preview references do not mutate original records', () => {
    expect(preview.comparison).toHaveLength(39)
    for (let i = 0; i < 39; i++) {
      const old = preview.baseline[i]
      const next = preview.overlapIncluded.evaluations[i]
      expect(next).not.toBe(old)
      expect(next.id).toBe(old.id)
      expect(next.items.map(item => item.score)).toEqual(old.items.map(item => item.score))
      expect(calculateBalancedCombatPower(next, balancedV12).finalScore)
        .toBeCloseTo(calculateBalancedCombatPower(old, balancedV12).finalScore, 10)
      expect(preview.comparison[i].delta).toBeCloseTo(0, 10)
    }
    expect(preview.baseline.find(e => e.id === 'evaluation-shanks')!
      .items.find(i => i.stat === 'techniqueMastery')!.baseScore).toBe(92)
    expect(preview.hakiWeight).toBe(0.5)
    expect(preview.modelVersion).toBe('1.2')
  })
})
