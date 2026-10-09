import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { balancedV12 } from './calculationModels'
import { getFinalStatScore } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { previewHybridRawPilot } from '../../domain/evaluation/hybridRawPilot'
import { hybridRawPilotReviews } from './hybridRawPilotReviews'

describe('Hybrid Haki A approval: four transferred, ten open reviews', () => {
  const current = (id: string, stat: string) => sampleEvaluations
    .find((e) => e.id === id)!.items.find((i) => i.stat === stat)!
  const approved = hybridRawPilotReviews.filter((r) => r.disposition === 'base-rebase-proposal')
  const unresolved = hybridRawPilotReviews.filter((r) => r.disposition !== 'base-rebase-proposal')

  it('preserves exact audit of 14 applications while applying only four A transfers', () => {
    expect(hybridRawPilotReviews).toHaveLength(14)
    expect(approved).toHaveLength(4)
    expect(unresolved).toHaveLength(10)
    expect(hybridRawPilotReviews.filter((r) => r.disposition === 'exceptional-marginal-unresolved')).toHaveLength(4)
    expect(hybridRawPilotReviews.filter((r) => r.disposition === 'cross-stat-overlap-unresolved')).toHaveLength(6)
    const expected = [
      ['evaluation-akainu', 'defense', 95],
      ['evaluation-kuzan', 'attack', 93],
      ['evaluation-kuzan', 'defense', 93],
      ['evaluation-katakuri', 'attack', 81],
    ] as const
    for (const [id, stat, base] of expected) {
      const item = current(id, stat)
      expect(item.baseScore).toBe(base)
      expect(item.hakiContributions).toEqual([])
      expect(item.score).toBe(base)
      expect(sampleEvaluations.find(e => e.id === id)?.evaluationDataVersion)
        .toBe('evaluation-0.1.38-hybrid-A-approved')
    }
    const ownerByEvidence = new Map(sampleEvidence.map((e) => [e.id, e.subjectCharacterId]))
    const keys = new Set<string>()
    for (const review of hybridRawPilotReviews) {
      const evaluation = sampleEvaluations.find((e) => e.id === review.evaluationId)!
      const item = current(review.evaluationId, review.stat)
      expect(ownerByEvidence.get(review.evidenceId)).toBe(evaluation.characterId)
      expect(item.evidenceIds).toContain(review.evidenceId)
      const matches = item.hakiContributions.filter(c => c.hakiType === review.hakiType &&
        c.amount === review.expectedRaw && c.evidenceIds.includes(review.evidenceId))
      expect(matches, review.evidenceId).toHaveLength(review.disposition === 'base-rebase-proposal' ? 0 : 1)
      expect(review.reason.length).toBeGreaterThan(30)
      expect(review.uncertainty.length).toBeGreaterThan(20)
      const key = [review.evaluationId, review.stat, review.hakiType, review.evidenceId].join('::')
      expect(keys.has(key)).toBe(false)
      keys.add(key)
    }
    expect(sampleEvaluations.find((e) => e.characterId === 'mihawk')!.items
      .flatMap((i) => i.hakiContributions)).toHaveLength(0)
  })

  it('recalculates all 39 post-A scores, with no zero-impact duplicate contributions', () => {
    expect(sampleEvaluations).toHaveLength(45)
    const rows = sampleEvaluations.flatMap((e) => e.items)
    expect(rows).toHaveLength(315)
    expect(rows.flatMap(i => i.hakiContributions)).toHaveLength(49)
    expect(rows.flatMap(i => i.hakiContributions).reduce((n,c)=>n+c.amount,0)).toBe(244)
    expect(rows.every(i => Math.abs(i.score - getFinalStatScore(i)) < 1e-9)).toBe(true)
    const expected = new Map([
      ['evaluation-akainu', 647/7], ['evaluation-kuzan', 649/7],
      ['evaluation-shanks', 648/7], ['evaluation-katakuri', 579/7],
      ['evaluation-linlin', 660/7], ['evaluation-mihawk', 649/7],
    ])
    for (const [id, sum] of expected) {
      const e = sampleEvaluations.find(row => row.id === id)!
      expect(calculateBalancedCombatPower(e, balancedV12).finalScore).toBeCloseTo(sum, 10)
    }
  })

  it('leaves remaining unresolved applications as a zero-modification guarded preview', () => {
    const preview = previewHybridRawPilot(sampleEvaluations, unresolved, 0.5)
    expect(preview.reviewCount).toBe(10)
    expect(preview.unresolvedCount).toBe(10)
    expect(preview.changes).toHaveLength(0)
    for (let i=0;i<45;i++) {
      expect(preview.evaluations[i]).not.toBe(sampleEvaluations[i])
      expect(preview.evaluations[i].items).toEqual(sampleEvaluations[i].items)
    }
    expect(() => previewHybridRawPilot(sampleEvaluations, [...unresolved, unresolved[0]], 0.5))
      .toThrow('Duplicate pilot review')
    expect(() => previewHybridRawPilot(sampleEvaluations, [{...unresolved[0], expectedRaw:99}], 0.5))
      .toThrow('stale/mismatched')
    expect(() => previewHybridRawPilot(sampleEvaluations, [{...unresolved[0], evidenceId:'missing'}], 0.5))
      .toThrow('stale/mismatched')
    expect(() => previewHybridRawPilot(sampleEvaluations, unresolved, 1))
      .toThrow('Pilot only supports Balanced 1.2')
  })

  it('preserves official Katakuri composure Evidence and readiness without readding Attack raw', () => {
    const e = sampleEvidence.find((entry) => entry.id === 'evidence-katakuri-composure-future-sight-857')!
    expect(e.source.type).toBe('supplementary')
    expect(e.fact).toContain('침착함')
    const katakuri = sampleEvaluations.find(e => e.id==='evaluation-katakuri')!
    expect(['attack','defense','techniqueMastery','combatIQ']
      .every(stat => katakuri.items.find(i => i.stat===stat)?.readiness==='E2')).toBe(true)
    expect(katakuri.items.find(i => i.stat==='defense')?.evidenceIds).toContain(e.id)
    expect(sampleEvaluations.flatMap(e => e.items).filter(i => !i.readiness)).toHaveLength(192)
    expect(sampleEvaluations.flatMap(e => e.items).filter(i => i.evidenceIds.length===0)).toHaveLength(11)
  })
})
