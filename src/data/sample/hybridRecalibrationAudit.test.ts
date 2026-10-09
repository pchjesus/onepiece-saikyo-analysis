import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleCharacters } from './characters'
import { balancedV12 } from './calculationModels'
import { getFinalStatScore } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'

/**
 * This file is a READ-ONLY migration gate for legacy Haki Raw. The ratified
 * Hybrid rubric DOES NOT declare any current typed Raw effect independent
 * from Base without per-feat review. Passing this test is not a canon rating
 * validation, nor permission to change the 39 scored Evaluations.
 */
describe('v0.1.35 hybrid 39-Evaluation recalibration audit', () => {
  const evidenceById = new Map(sampleEvidence.map((e) => [e.id, e]))
  const characterById = new Map(sampleCharacters.map((c) => [c.id, c]))

  it('covers all 39 evaluations / 273 stats and detects the inherited evidence-readiness risks', () => {
    expect(sampleEvaluations).toHaveLength(39)
    const rows = sampleEvaluations.flatMap((evaluation) =>
      evaluation.items.map((item) => ({ evaluation, item })))
    expect(rows).toHaveLength(273)

    let missingLinks = 0
    let unassignedReadiness = 0
    let linksWithoutMatchingStatRole = 0
    let cappedStats = 0

    for (const { evaluation, item } of rows) {
      expect(characterById.has(evaluation.characterId), evaluation.id).toBe(true)
      if (item.evidenceIds.length === 0) missingLinks++
      if (!item.readiness) unassignedReadiness++
      if (item.score === 100) cappedStats++

      let hasUnmappedEvidence = false
      for (const id of item.evidenceIds) {
        const record = evidenceById.get(id)
        expect(record, id).toBeDefined()
        expect(record?.subjectCharacterId, id).toBe(evaluation.characterId)
        if (!record?.statContributions.some(({ stat }) => stat === item.stat)) {
          hasUnmappedEvidence = true
        }
      }
      if (hasUnmappedEvidence) linksWithoutMatchingStatRole++
    }

    // Known unresolved baseline. Decreasing these counts is welcome; worsening
    // any of them needs an explicit Evidence / Calibration review.
    expect(missingLinks).toBeLessThanOrEqual(14)
    expect(unassignedReadiness).toBeLessThanOrEqual(203)
    expect(linksWithoutMatchingStatRole).toBeLessThanOrEqual(102)
    expect(cappedStats).toBeLessThanOrEqual(4)
  })

  it('shows that neutral rebasing of legacy Raw into Base is score-invariant, not a new canon valuation', () => {
    const weight = balancedV12.configuration.hakiWeight
    expect(weight).toBe(0.5)
    for (const evaluation of sampleEvaluations) {
      const before = calculateBalancedCombatPower(evaluation, balancedV12).finalScore
      const shadowItems = evaluation.items.map((item) => {
        const neutralBase = item.score
        const neutralItem = { ...item, baseScore: neutralBase, hakiContributions: [] }
        expect(getFinalStatScore(neutralItem, weight), `${evaluation.id}/${item.stat}`)
          .toBeCloseTo(item.score, 10)
        return { ...neutralItem, score: getFinalStatScore(neutralItem, weight) }
      })
      const shadow = calculateBalancedCombatPower({ ...evaluation, items: shadowItems }, balancedV12).finalScore
      expect(shadow, evaluation.id).toBeCloseTo(before, 10)
    }
  })

  it('requires separate review of cross-stat Evidence reuse and multiple typed Haki on one Stat', () => {
    const reused: string[] = []
    let multiHakiInOneStat = 0
    let typedCount = 0
    let rawTotal = 0
    for (const evaluation of sampleEvaluations) {
      const evidenceToStats = new Map<string, Set<string>>()
      for (const item of evaluation.items) {
        if (new Set(item.hakiContributions.map((c) => c.hakiType)).size > 1) multiHakiInOneStat++
        for (const contribution of item.hakiContributions) {
          typedCount++
          rawTotal += contribution.amount
          for (const evidenceId of contribution.evidenceIds) {
            const stats = evidenceToStats.get(evidenceId) ?? new Set<string>()
            stats.add(item.stat)
            evidenceToStats.set(evidenceId, stats)
          }
        }
      }
      for (const [id, stats] of evidenceToStats) {
        if (stats.size > 1) reused.push(`${evaluation.id}::${id}`)
      }
    }
    expect(typedCount).toBe(53)
    expect(rawTotal).toBe(256)
    expect(reused).toHaveLength(15)
    expect(multiHakiInOneStat).toBe(2)
  })
})
