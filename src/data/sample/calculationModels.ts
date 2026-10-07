import type { CalculationModel } from '../../domain/calculation/types'
import { DEFAULT_HAKI_WEIGHT } from '../../domain/evaluation/score'

export const balancedV12: CalculationModel = {
  id: 'balanced',
  name: 'Balanced',
  version: '1.2',
  description: 'v0.1.22 Core Stat 모델. 7개 Final Core Stat 단순 평균과 Haki Weight 0.5를 사용하며 Special Combat Profile은 Overall에 직접 합산하지 않는다.',
  configuration: {
    method: 'arithmetic-mean',
    statCount: 7,
    hakiWeight: DEFAULT_HAKI_WEIGHT,
  },
}
