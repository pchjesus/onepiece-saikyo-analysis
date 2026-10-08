import type { CombatStat } from '../evaluation/types'

export const HAKI_TYPES = ['armament', 'observation', 'conquerors'] as const
export type HakiType = typeof HAKI_TYPES[number]

export const HAKI_CONFIRMATION_STATUSES = ['confirmed', 'unclear', 'not-confirmed'] as const
export type HakiConfirmationStatus = typeof HAKI_CONFIRMATION_STATUSES[number]

export type ConquerorsInfusion = {
  status: HakiConfirmationStatus
  note?: string
}

export type HakiCapability = {
  type: HakiType
  status: HakiConfirmationStatus
  note?: string
  infusion?: ConquerorsInfusion
}

/**
 * Qualitative evidence of a specialized, exceptional Haki application.
 * Classification is a project interpretation, NOT a canon-authored numeric tier.
 * It never contributes to Base, Raw, Final or Overall automatically.
 */
export type HakiExcellenceAssessment = {
  type: HakiType
  basis: 'direct-application' | 'strong-inference'
  interpretation: string
  uncertainty: string
  evidenceIds: string[]
  /** Historical demonstration may not directly establish use in current era. */
  eraContext?: string
}

export type HakiProfile = {
  characterId: string
  capabilities: HakiCapability[]
  /** Optional, non-numeric exceptional Haki assessment; absent is NOT low ability. */
  excellenceAssessments?: HakiExcellenceAssessment[]
}

export type HakiStatContribution = {
  hakiType: HakiType
  stat: CombatStat
  amount: number
  application: string
  evidenceIds: string[]
}
