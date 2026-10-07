import type { Evaluation } from '../evaluation/types'

export type CalculationModel = {
  id: string
  name: string
  version: string
  description: string
  configuration: Record<string, unknown>
}

export type CalculationResult = {
  calculationModelId: string
  calculationModelVersion: string
  finalScore: number
  calculatedAt: string
}

export type CombatPowerCalculator = (
  evaluation: Evaluation,
  model: CalculationModel,
) => CalculationResult
