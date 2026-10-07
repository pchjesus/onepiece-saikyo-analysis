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

export type HakiProfile = {
  characterId: string
  capabilities: HakiCapability[]
}

export type HakiStatContribution = {
  hakiType: HakiType
  stat: CombatStat
  amount: number
  application: string
  evidenceIds: string[]
}
