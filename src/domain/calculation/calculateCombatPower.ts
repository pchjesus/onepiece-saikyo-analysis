import { COMBAT_STATS, type Evaluation } from '../evaluation/types'
import type { CalculationModel, CalculationResult } from './types'
import { getFinalStatScore } from '../evaluation/score'

export function validateEvaluation(evaluation: Evaluation, hakiWeight: number): void {
  if (!Number.isFinite(hakiWeight) || hakiWeight < 0) {
    throw new Error(`Haki weight must be a finite non-negative number: ${hakiWeight}`)
  }

  if (evaluation.items.length !== COMBAT_STATS.length) {
    throw new Error(`Evaluation must contain exactly ${COMBAT_STATS.length} combat stats.`)
  }

  const seen = new Set<string>()
  for (const item of evaluation.items) {
    if (seen.has(item.stat)) throw new Error(`Duplicate combat stat: ${item.stat}`)
    seen.add(item.stat)
    const finalScore = getFinalStatScore(item, hakiWeight)
    if (!Number.isFinite(item.baseScore) || item.baseScore < 0 || item.baseScore > 100 || item.score !== finalScore) {
      throw new Error(`Invalid score for ${item.stat}: expected ${finalScore}, received ${item.score}`)
    }
  }

  for (const stat of COMBAT_STATS) {
    if (!seen.has(stat)) throw new Error(`Missing combat stat: ${stat}`)
  }
}

export function calculateBalancedCombatPower(
  evaluation: Evaluation,
  model: CalculationModel,
  calculatedAt = new Date().toISOString(),
): CalculationResult {
  if (model.id !== 'balanced') {
    throw new Error(`Unsupported calculation model: ${model.id}`)
  }
  if (model.configuration.method !== 'arithmetic-mean' || model.configuration.statCount !== COMBAT_STATS.length) {
    throw new Error('Balanced calculation model configuration is inconsistent with the eight-stat model.')
  }

  const { hakiWeight } = model.configuration
  validateEvaluation(evaluation, hakiWeight)

  const total = evaluation.items.reduce((sum, item) => sum + getFinalStatScore(item, hakiWeight), 0)
  const finalScore = total / COMBAT_STATS.length

  return {
    calculationModelId: model.id,
    calculationModelVersion: model.version,
    hakiWeight,
    finalScore,
    calculatedAt,
  }
}
