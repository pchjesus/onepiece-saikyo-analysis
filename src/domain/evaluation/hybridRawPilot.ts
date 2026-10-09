import type { CombatStat, Evaluation } from './types'
import type { HakiType } from '../haki/types'
import { DEFAULT_HAKI_WEIGHT, getFinalStatScore } from './score'

/**
 * A human-reviewed proposed disposition, not an official scoring rule.
 *
 * 'base-rebase-proposal' is a temporary, score-invariant reclassification of
 * ordinary demonstrated Haki into ordinary observed combat performance.
 * It does NOT prove Base/Final was correct; production migration requires
 * evidence, all-roster sensitivity review and explicit approval.
 */
export type HybridRawDisposition =
  | 'base-rebase-proposal'
  | 'exceptional-marginal-unresolved'
  | 'cross-stat-overlap-unresolved'

export type HybridRawPilotReview = {
  evaluationId: string
  stat: CombatStat
  hakiType: HakiType
  evidenceId: string
  expectedRaw: number
  disposition: HybridRawDisposition
  reason: string
  uncertainty: string
}

type CandidateChange = {
  evaluationId: string
  stat: CombatStat
  hakiType: HakiType
  evidenceId: string
  originalBase: number
  candidateBase: number
  originalRaw: number
  candidateRaw: number
  originalFinal: number
  candidateFinal: number
}

export type HybridPilotPreview = {
  evaluations: Evaluation[]
  changes: CandidateChange[]
  reviewCount: number
  unresolvedCount: number
}

/**
 * Offline, non-mutating proposal for one fixed Haki weight (Balanced 1.2
 * currently uses 0.5). Never call this from production ranking/UI until
 * model + Evaluation data version compatibility is explicitly approved.
 *
 * Important: 0.5-weight invariance DOES NOT imply Haki Emphasis / weight 0 or
 * weight 1 invariance. The proposal itself is not an endorsement of any Raw.
 */
export function previewHybridRawPilot(
  evaluations: readonly Evaluation[],
  reviews: readonly HybridRawPilotReview[],
  hakiWeight: number,
): HybridPilotPreview {
  if (!Number.isFinite(hakiWeight) || hakiWeight < 0) throw new Error('Valid nonnegative Haki weight required')
  if (Math.abs(hakiWeight - DEFAULT_HAKI_WEIGHT) > 1e-9) {
    throw new Error('Pilot only supports Balanced 1.2 baseline Haki weight 0.5; other weights require model-version review')
  }
  const original = new Map(evaluations.map((evaluation) => [evaluation.id, evaluation]))
  if (original.size !== evaluations.length) throw new Error('Duplicate Evaluation IDs in pilot input')
  const seen = new Set<string>()
  const changes: CandidateChange[] = []

  const proposals = new Map<string, HybridRawPilotReview[]>()
  for (const review of reviews) {
    const key = [review.evaluationId, review.stat, review.hakiType, review.evidenceId].join('::')
    if (seen.has(key)) throw new Error(`Duplicate pilot review: ${key}`)
    seen.add(key)

    const evaluation = original.get(review.evaluationId)
    const item = evaluation?.items.find(({ stat }) => stat === review.stat)
    const contribution = item?.hakiContributions.find(({ hakiType, evidenceIds }) =>
      hakiType === review.hakiType && evidenceIds.includes(review.evidenceId))
    if (!contribution || contribution.amount !== review.expectedRaw) {
      throw new Error(`Pilot review stale/mismatched: ${key}`)
    }
    if (!review.reason.trim() || !review.uncertainty.trim()) {
      throw new Error(`Pilot review lacks rationale/uncertainty: ${key}`)
    }
    if (review.disposition === 'base-rebase-proposal') {
      const list = proposals.get(review.evaluationId) ?? []
      list.push(review)
      proposals.set(review.evaluationId, list)
    } else if (review.disposition !== 'exceptional-marginal-unresolved' &&
      review.disposition !== 'cross-stat-overlap-unresolved') {
      throw new Error(`Invalid pilot disposition: ${key}`)
    }
  }

  const candidate = evaluations.map((evaluation) => {
    const accepted = proposals.get(evaluation.id) ?? []
    if (!accepted.length) return { ...evaluation, items: evaluation.items.map((item) => ({
      ...item, hakiContributions: [...item.hakiContributions], evidenceIds: [...item.evidenceIds],
    })) }

    const items = evaluation.items.map((item) => {
      const targets = accepted.filter(({ stat }) => stat === item.stat)
      if (!targets.length) return { ...item, evidenceIds: [...item.evidenceIds],
        hakiContributions: [...item.hakiContributions] }
      const moved = targets.map((target) => {
        const matches = item.hakiContributions.filter((c) =>
          c.hakiType === target.hakiType && c.evidenceIds.includes(target.evidenceId))
        if (matches.length !== 1) throw new Error(`Ambiguous Haki contribution: ${evaluation.id}/${item.stat}`)
        return matches[0]
      })
      if (new Set(moved).size !== moved.length) {
        throw new Error(`Same contribution selected for rebasing twice: ${evaluation.id}/${item.stat}`)
      }
      const rawMoved = moved.reduce((sum, contribution) => sum + contribution.amount, 0)
      const candidateBase = item.baseScore + rawMoved * hakiWeight
      if (candidateBase > 100) {
        throw new Error(`Candidate Base would exceed 100: ${evaluation.id}/${item.stat}`)
      }
      const remaining = item.hakiContributions.filter((contribution) => !moved.includes(contribution))
      const changed = { ...item, baseScore: candidateBase, hakiContributions: remaining,
        evidenceIds: [...item.evidenceIds] }
      const candidateFinal = getFinalStatScore(changed, hakiWeight)
      if (Math.abs(candidateFinal - item.score) > 1e-9) {
        throw new Error(`Pilot must preserve current Final: ${evaluation.id}/${item.stat}`)
      }
      const beforeRaw = item.hakiContributions.reduce((sum, h) => sum + h.amount, 0)
      for (const target of targets) {
        changes.push({
          evaluationId: evaluation.id, stat: item.stat, hakiType: target.hakiType,
          evidenceId: target.evidenceId, originalBase: item.baseScore,
          candidateBase, originalRaw: beforeRaw,
          candidateRaw: remaining.reduce((sum, h) => sum + h.amount, 0),
          originalFinal: item.score, candidateFinal,
        })
      }
      return { ...changed, score: candidateFinal }
    })
    return { ...evaluation, items }
  })
  return { evaluations: candidate, changes, reviewCount: reviews.length,
    unresolvedCount: reviews.length - changes.length }
}
