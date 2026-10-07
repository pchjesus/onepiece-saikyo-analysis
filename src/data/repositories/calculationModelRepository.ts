import type { CalculationModel } from '../../domain/calculation/types'
import { balancedV12 } from '../sample/calculationModels'

export interface CalculationModelRepository {
  getModel(id: string): CalculationModel | undefined
}

export const calculationModelRepository: CalculationModelRepository = {
  getModel: (id) => (id === balancedV12.id ? balancedV12 : undefined),
}
