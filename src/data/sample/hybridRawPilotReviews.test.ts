import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { balancedV12 } from './calculationModels'
import { getFinalStatScore } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { previewHybridRawPilot } from '../../domain/evaluation/hybridRawPilot'
import { hybridRawPilotReviews } from './hybridRawPilotReviews'

const EXPECTED_PILOT_IDS = ['evaluation-akainu', 'evaluation-kuzan', 'evaluation-shanks',
  'evaluation-katakuri', 'evaluation-linlin']

describe('v0.1.35 concrete Hybrid Raw decomposition preview (non-production)', () => {
  it('reviews precisely all fourteen typed applications for five score-bearing pilots, with Mihawk zero-Raw control', () => {
    expect(hybridRawPilotReviews).toHaveLength(14)
    const counts = hybridRawPilotReviews.reduce<Record<string, number>>((a, r) => {
      a[r.disposition] = (a[r.disposition] ?? 0) + 1
      return a
    }, {})
    expect(counts).toEqual({
      'base-rebase-proposal': 4,
      'exceptional-marginal-unresolved': 4,
      'cross-stat-overlap-unresolved': 6,
    })

    const evidenceById = new Map(sampleEvidence.map((e) => [e.id, e]))
    for (const id of EXPECTED_PILOT_IDS) {
      const evaluation = sampleEvaluations.find((e) => e.id === id)!
      const countRaw = evaluation.items.reduce((sum, item) => sum + item.hakiContributions.length, 0)
      expect(hybridRawPilotReviews.filter((entry) => entry.evaluationId === id), id)
        .toHaveLength(countRaw)
    }
    const keys = new Set<string>()
    for (const review of hybridRawPilotReviews) {
      const evaluation = sampleEvaluations.find((e) => e.id === review.evaluationId)!
      const item = evaluation.items.find((row) => row.stat === review.stat)!
      expect(item, review.evaluationId).toBeDefined()
      const source = evidenceById.get(review.evidenceId)
      expect(source?.subjectCharacterId, review.evidenceId).toBe(evaluation.characterId)
      const matching = item.hakiContributions.filter((c) => c.hakiType === review.hakiType &&
        c.evidenceIds.includes(review.evidenceId) && c.amount === review.expectedRaw)
      expect(matching, review.evidenceId).toHaveLength(1)
      expect(review.reason.length).toBeGreaterThan(30)
      expect(review.uncertainty.length).toBeGreaterThan(20)
      const key = [review.evaluationId, review.stat, review.hakiType, review.evidenceId].join('::')
      expect(keys.has(key)).toBe(false)
      keys.add(key)
    }
    expect(sampleEvaluations.find(({ characterId }) => characterId === 'mihawk')!.items
      .flatMap(({ hakiContributions }) => hakiContributions)).toHaveLength(0)
  })

  it('selectively moves four ordinary Haki increments to Base as a numeric candidate while preserving all 39 Final scores', () => {
    const first = sampleEvaluations.find((e) => e.id === 'evaluation-akainu')!
    const beforeBase = first.items.find((i) => i.stat === 'defense')!.baseScore
    const beforeScore = first.items.find((i) => i.stat === 'defense')!.score
    const weight = balancedV12.configuration.hakiWeight
    const { evaluations: proposed, changes, reviewCount, unresolvedCount } =
      previewHybridRawPilot(sampleEvaluations, hybridRawPilotReviews, weight)
    expect(reviewCount).toBe(14)
    expect(unresolvedCount).toBe(10)
    expect(changes).toHaveLength(4)
    expect(proposed).toHaveLength(39)
    expect(proposed.flatMap((e) => e.items)).toHaveLength(273)

    const proposedItem = (id: string, stat: string) =>
      proposed.find((e) => e.id === id)!.items.find((item) => item.stat === stat)!
    expect([proposedItem('evaluation-akainu', 'defense').baseScore,
      proposedItem('evaluation-akainu', 'defense').hakiContributions.length])
      .toEqual([95, 0])
    expect([proposedItem('evaluation-kuzan', 'attack').baseScore,
      proposedItem('evaluation-kuzan', 'attack').hakiContributions.length])
      .toEqual([93, 0])
    expect([proposedItem('evaluation-kuzan', 'defense').baseScore,
      proposedItem('evaluation-kuzan', 'defense').hakiContributions.length])
      .toEqual([93, 0])
    expect([proposedItem('evaluation-katakuri', 'attack').baseScore,
      proposedItem('evaluation-katakuri', 'attack').hakiContributions.length])
      .toEqual([81, 0])
    expect(proposedItem('evaluation-kuzan', 'techniqueMastery').hakiContributions).toHaveLength(1)

    for (let index = 0; index < sampleEvaluations.length; index++) {
      const source = sampleEvaluations[index]
      const candidate = proposed[index]
      expect(candidate.id).toBe(source.id)
      for (let j = 0; j < source.items.length; j++) {
        expect(candidate.items[j].score, source.id).toBeCloseTo(source.items[j].score, 10)
        expect(getFinalStatScore(candidate.items[j], weight), source.id)
          .toBeCloseTo(source.items[j].score, 10)
      }
      expect(calculateBalancedCombatPower(candidate, balancedV12).finalScore, source.id)
        .toBeCloseTo(calculateBalancedCombatPower(source, balancedV12).finalScore, 10)
    }
    // No mutation of shared production arrays / objects:
    expect(first.items.find((i) => i.stat === 'defense')!.baseScore).toBe(beforeBase)
    expect(first.items.find((i) => i.stat === 'defense')!.score).toBe(beforeScore)
    expect(first.items.find((i) => i.stat === 'defense')!.hakiContributions).toHaveLength(1)
    expect(sampleEvaluations.flatMap((e) => e.items)
      .flatMap((i) => i.hakiContributions).reduce((s, c) => s + c.amount, 0)).toBe(256)
    expect(proposed.flatMap((e) => e.items)
      .flatMap((i) => i.hakiContributions).reduce((s, c) => s + c.amount, 0)).toBe(244)
  })

  it('requires a new calculation-model sensitivity check if Haki weight changes from 0.5', () => {
    const { evaluations: proposed } =
      previewHybridRawPilot(sampleEvaluations, hybridRawPilotReviews, 0.5)
    const source = sampleEvaluations.find((e) => e.id === 'evaluation-kuzan')!
    const candidate = proposed.find((e) => e.id === 'evaluation-kuzan')!
    const delta = (weight: number) => candidate.items.reduce((sum, item, i) =>
      sum + getFinalStatScore(item, weight) - getFinalStatScore(source.items[i], weight), 0)
    expect(delta(0)).toBeCloseTo(3, 10) // +2 Attack, +1 Defense
    expect(delta(0.5)).toBeCloseTo(0, 10)
    expect(delta(1)).toBeCloseTo(-3, 10)
  })

  it('rejects stale, duplicated or unsupported proposals instead of silently applying them', () => {
    expect(() => previewHybridRawPilot(sampleEvaluations,
      [...hybridRawPilotReviews, hybridRawPilotReviews[0]], 0.5)).toThrow('Duplicate pilot review')
    expect(() => previewHybridRawPilot(sampleEvaluations,
      [{ ...hybridRawPilotReviews[0], expectedRaw: 6 }], 0.5))
      .toThrow('stale/mismatched')
    expect(() => previewHybridRawPilot(sampleEvaluations,
      [{ ...hybridRawPilotReviews[0], evidenceId: 'evidence-no-such-scene' }], 0.5))
      .toThrow('stale/mismatched')
    expect(() => previewHybridRawPilot(sampleEvaluations, hybridRawPilotReviews, -1))
      .toThrow('Valid nonnegative Haki weight')
  })
})
