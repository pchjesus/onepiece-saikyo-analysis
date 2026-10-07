import type { Evaluation } from '../evaluation/types'

export type CalculationModelConfiguration = {
  method: 'arithmetic-mean'
  statCount: number
  hakiWeight: number
}

export type CalculationModel = {
  id: string
  name: string
  version: string
  description: string
  configuration: CalculationModelConfiguration
}

export type CalculationResult = {
  calculationModelId: string
  calculationModelVersion: string
  hakiWeight: number
  finalScore: number
  calculatedAt: string
}

export type CombatPowerCalculator = (
  evaluation: Evaluation,
  model: CalculationModel,
) => CalculationResult
