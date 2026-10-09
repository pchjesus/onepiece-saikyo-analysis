import { sampleEvaluations } from './evaluations'
import { hybridRawPilotReviews } from './hybridRawPilotReviews'
import { previewHybridRawPilot } from '../../domain/evaluation/hybridRawPilot'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { balancedV12 } from './calculationModels'

/**
 * REVIEW ONLY: not used by UI, rankings, repositories, or official Evaluations.
 *
 * Assumption A: four ordinary-use applications are represented by observed
 * Base performance instead of standalone exceptional Haki Raw.
 * Assumption B: additionally classify six overlapping applications into Base.
 * Neither proposal claims current historical Final scores are canonically exact.
 *
 * IMPORTANT: only score-invariant at Balanced 1.2 / Haki Weight 0.5.
 */
export function buildHybridApprovalPreview() {
  const weight = balancedV12.configuration.hakiWeight
  const ordinaryReviews = hybridRawPilotReviews.filter((r) => r.disposition === 'base-rebase-proposal')
  const overlapReviews = hybridRawPilotReviews.map((r) =>
    r.disposition === 'cross-stat-overlap-unresolved'
      ? { ...r, disposition: 'base-rebase-proposal' as const }
      : r)

  const ordinary = previewHybridRawPilot(sampleEvaluations, ordinaryReviews, weight)
  const overlapIncluded = previewHybridRawPilot(sampleEvaluations, overlapReviews, weight)
  const original = new Map(sampleEvaluations.map((evaluation) => [evaluation.id, evaluation]))

  const scores = (items: typeof sampleEvaluations) => items.map((evaluation) => ({
    evaluationId: evaluation.id,
    characterId: evaluation.characterId,
    final: calculateBalancedCombatPower(evaluation, balancedV12).finalScore,
  }))
  const compare = scores(overlapIncluded.evaluations).map((row) => {
    const baseline = original.get(row.evaluationId)!
    const before = calculateBalancedCombatPower(baseline, balancedV12).finalScore
    return { ...row, before, delta: row.final - before }
  })

  return {
    baseline: sampleEvaluations,
    ordinary,
    overlapIncluded,
    comparison: compare,
    modelVersion: balancedV12.version,
    hakiWeight: weight,
    status: 'user-approval-required' as const,
    description: '표시상 기본점수/패기 원점수만 재분류한 조건부 수치 제안. 최종 전투력의 정당성 자체는 별도 평가.',
  }
}
