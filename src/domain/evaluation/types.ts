export const COMBAT_STATS = [
  'attack',
  'defense',
  'stamina',
  'speed',
  'techniqueMastery',
  'combatIQ',
  'versatility',
] as const

export type CombatStat = typeof COMBAT_STATS[number]

export const EVALUATION_STATUSES = ['prototype', 'draft', 'official'] as const

export type EvaluationStatus = typeof EVALUATION_STATUSES[number]

export const EVIDENCE_READINESS_LEVELS = ['E1', 'E2', 'E3'] as const
export type EvidenceReadiness = typeof EVIDENCE_READINESS_LEVELS[number]

export const EVIDENCE_READINESS_DEFINITIONS = {
  E1: '직접·반복 Evidence가 충분해 현재 점수의 근거 밀도가 높음',
  E2: '7축 평가는 가능하지만 일부 축에 위상·간접 근거 또는 표본 부족이 남음',
  E3: '직접 Evidence가 부족해 수치 평가 보류 또는 강한 잠정성이 필요함',
} as const satisfies Record<EvidenceReadiness, string>

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
  /** Evidence sufficiency for this individual stat; independent from score magnitude. */
  readiness?: EvidenceReadiness
}

export type EvaluationSubjectState = {
  id: string
  label: string
  note?: string
}

export type Evaluation = {
  id: string
  characterId: string
  evaluationDataVersion: string
  status: EvaluationStatus
  /**
   * Canonical state/era represented by this score.
   * One Character may own multiple Evaluations; identity itself is never duplicated.
   */
  subjectState?: EvaluationSubjectState
  /** Default state used by roster/ranking views when no state is explicitly selected. */
  isDefault?: boolean
  items: EvaluationItem[]
}
