import type { EvaluationItem } from './types'

export const MAX_STAT_SCORE = 100
export const MAX_HAKI_CONTRIBUTION_PER_STAT = 10

export function getHakiContributionTotal(item: Pick<EvaluationItem, 'hakiContributions'>): number {
  return item.hakiContributions.reduce((sum, contribution) => sum + contribution.amount, 0)
}

export function getFinalStatScore(item: Pick<EvaluationItem, 'baseScore' | 'hakiContributions'>): number {
  return Math.min(MAX_STAT_SCORE, item.baseScore + getHakiContributionTotal(item))
}
