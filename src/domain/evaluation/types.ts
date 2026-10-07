export const COMBAT_STATS = [
  'attack',
  'defense',
  'stamina',
  'speed',
  'techniqueMastery',
  'specialAbility',
  'combatIQ',
  'versatility',
] as const

export type CombatStat = typeof COMBAT_STATS[number]

export const EVALUATION_STATUSES = ['prototype', 'draft', 'official'] as const

export type EvaluationStatus = typeof EVALUATION_STATUSES[number]

export const EVALUATION_STATUS_DEFINITIONS = {
  prototype: '구조 검증용 임시 평가 데이터',
  draft: '실제 분석을 진행 중이지만 아직 공식 평가로 확정하지 않은 데이터',
  official: '근거와 평가를 검토하여 공식 데이터로 확정한 평가',
} as const satisfies Record<EvaluationStatus, string>

import type { HakiStatContribution } from '../haki/types'

export type EvaluationItem = {
  stat: CombatStat
  baseScore: number
  score: number
  rationale: string
  evidenceIds: string[]
  hakiContributions: HakiStatContribution[]
}

export type Evaluation = {
  id: string
  characterId: string
  evaluationDataVersion: string
  status: EvaluationStatus
  items: EvaluationItem[]
}
