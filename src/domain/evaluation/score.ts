import type { EvaluationItem } from './types'

export const MAX_STAT_SCORE = 100
export const MAX_HAKI_CONTRIBUTION_PER_STAT = 10

// v0.1.21 Balanced model parameter. This is versioned model configuration, not a Canon constant.
export const DEFAULT_HAKI_WEIGHT = 0.5

export function getRawHakiContributionTotal(item: Pick<EvaluationItem, 'hakiContributions'>): number {
  return item.hakiContributions.reduce((sum, contribution) => sum + contribution.amount, 0)
}

// Backward-compatible name kept for existing callers; semantically this is the raw contribution total.
export function getHakiContributionTotal(item: Pick<EvaluationItem, 'hakiContributions'>): number {
  return getRawHakiContributionTotal(item)
}

export function getEffectiveHakiContributionTotal(
  item: Pick<EvaluationItem, 'hakiContributions'>,
  hakiWeight = DEFAULT_HAKI_WEIGHT,
): number {
  return getRawHakiContributionTotal(item) * hakiWeight
}

export function getFinalStatScore(
  item: Pick<EvaluationItem, 'baseScore' | 'hakiContributions'>,
  hakiWeight = DEFAULT_HAKI_WEIGHT,
): number {
  return Math.min(MAX_STAT_SCORE, item.baseScore + getEffectiveHakiContributionTotal(item, hakiWeight))
}
