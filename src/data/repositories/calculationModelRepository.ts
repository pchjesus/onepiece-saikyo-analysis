import type { CalculationModel } from '../../domain/calculation/types'
import { balancedV11 } from '../sample/calculationModels'

export interface CalculationModelRepository {
  getModel(id: string): CalculationModel | undefined
}

export const calculationModelRepository: CalculationModelRepository = {
  getModel: (id) => (id === balancedV11.id ? balancedV11 : undefined),
}
