import type { Evaluation } from './types'
import { getFinalStatScore, getRawHakiContributionTotal } from './score'
import type { HybridRawPilotReview } from './hybridRawPilot'

/**
 * NON-PRODUCTION stress test: what happens if all six already-flagged
 * potential cross-stat double-credit entries are provisionally excluded?
 *
 * Base remains unchanged on purpose to expose model sensitivity, **not**
 * because canon proves a lower rating. It can understate legitimate Haki
 * contributions, so never treat these outputs as recalibrated evaluations.
 */
export function previewHybridOverlapStress(
  evaluations: readonly Evaluation[],
  reviews: readonly HybridRawPilotReview[],
  hakiWeight: number,
) {
  if (!Number.isFinite(hakiWeight) || hakiWeight < 0 || hakiWeight > 1) {
    throw new Error('Stress test requires a Haki weight between 0 and 1')
  }
  const flagged = reviews.filter(({ disposition }) => disposition === 'cross-stat-overlap-unresolved')
  const ids = new Set<string>()
  const removalByEvalStat = new Map<string, HybridRawPilotReview[]>()
  const all = new Map(evaluations.map((evaluation) => [evaluation.id, evaluation]))
  if (all.size !== evaluations.length) throw new Error('Duplicate Evaluation ID')

  for (const review of flagged) {
    const key = [review.evaluationId, review.stat, review.hakiType, review.evidenceId].join('::')
    if (ids.has(key)) throw new Error('Duplicate overlap review ' + key)
    ids.add(key)
    const item = all.get(review.evaluationId)?.items.find(({ stat }) => stat === review.stat)
    const matches = item?.hakiContributions.filter(({ hakiType, evidenceIds, amount }) =>
      hakiType === review.hakiType && evidenceIds.includes(review.evidenceId) && amount === review.expectedRaw)
    if (!matches || matches.length !== 1) throw new Error('Stale or ambiguous overlap review ' + key)
    if (!review.reason.trim() || !review.uncertainty.trim()) throw new Error('Missing review caveat ' + key)
    const statKey = review.evaluationId + '::' + review.stat
    removalByEvalStat.set(statKey, [...(removalByEvalStat.get(statKey) ?? []), review])
  }

  let suppressedRaw = 0
  const affected: { evaluationId: string; stat: string; beforeFinal: number; stressFinal: number; suppressedRaw: number }[] = []
  const candidates = evaluations.map((evaluation) => ({
    ...evaluation,
    items: evaluation.items.map((item) => {
      const statKey = evaluation.id + '::' + item.stat
      const targets = removalByEvalStat.get(statKey) ?? []
      let contributions = [...item.hakiContributions]
      for (const target of targets) {
        const index = contributions.findIndex(({ hakiType, evidenceIds, amount }) =>
          hakiType === target.hakiType && evidenceIds.includes(target.evidenceId) && amount === target.expectedRaw)
        if (index === -1) throw new Error('Same Raw contribution removed twice: ' + statKey)
        suppressedRaw += contributions[index].amount
        contributions = [...contributions.slice(0, index), ...contributions.slice(index + 1)]
      }
      const next = { ...item, evidenceIds: [...item.evidenceIds], hakiContributions: contributions }
      const stressFinal = getFinalStatScore(next, hakiWeight)
      if (getRawHakiContributionTotal(next) > getRawHakiContributionTotal(item) || stressFinal > item.score + 1e-9) {
        throw new Error('Overlap-exclusion-only scenario unexpectedly increased a stat')
      }
      if (targets.length) affected.push({
        evaluationId: evaluation.id, stat: item.stat,
        beforeFinal: item.score, stressFinal, suppressedRaw: getRawHakiContributionTotal(item) - getRawHakiContributionTotal(next),
      })
      return { ...next, score: stressFinal }
    }),
  }))
  return { evaluations: candidates, affected, suppressedRaw, reviewCount: flagged.length }
}
