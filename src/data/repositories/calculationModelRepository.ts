import type { CalculationModel } from '../../domain/calculation/types'
import { balancedV1 } from '../sample/calculationModels'

export interface CalculationModelRepository {
  getModel(id: string): CalculationModel | undefined
}

export const calculationModelRepository: CalculationModelRepository = {
  getModel: (id) => (id === balancedV1.id ? balancedV1 : undefined),
}
