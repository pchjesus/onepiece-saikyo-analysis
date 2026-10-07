import type { CalculationModel } from '../../domain/calculation/types'
import { DEFAULT_HAKI_WEIGHT } from '../../domain/evaluation/score'

export const balancedV11: CalculationModel = {
  id: 'balanced',
  name: 'Balanced',
  version: '1.1',
  description: 'v0.1.21 전투력 스케일 보정 모델. 8개 Final Stat 단순 평균과 Haki Weight 0.5를 사용한다.',
  configuration: {
    method: 'arithmetic-mean',
    statCount: 8,
    hakiWeight: DEFAULT_HAKI_WEIGHT,
  },
}
