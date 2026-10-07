import type { CalculationModel } from '../../domain/calculation/types'

export const balancedV1: CalculationModel = {
  id: 'balanced',
  name: 'Balanced',
  version: '1.0',
  description: 'MVP 검증용 8개 기본 스탯 단순 평균 모델. 최종 분석 모델이 아님.',
  configuration: { method: 'arithmetic-mean', statCount: 8 },
}
