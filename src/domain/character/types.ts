import type { HakiProfile } from '../haki/types'

export type Crew = {
  id: string
  name: string
  description?: string
}

export type CanonProfileSource = {
  label: string
  reference: string
}

export type SpecialCombatTraitCategory =
  | 'devil-fruit'
  | 'race'
  | 'biology'
  | 'modification'
  | 'equipment'
  | 'technology'
  | 'other'

export type SpecialCombatTraitStatus = 'confirmed' | 'unclear' | 'not-confirmed'

export type SpecialCombatTrait = {
  id: string
  category: SpecialCombatTraitCategory
  name: string
  status: SpecialCombatTraitStatus
  description: string
  evidenceIds: string[]
  limitations?: string
  uncertainty?: string
}

export type CombatProfile = {
  combatStyles: string[]
  specialTraits: SpecialCombatTrait[]
  haki: HakiProfile
  sources: CanonProfileSource[]
}

export type Character = {
  id: string
  name: string
  crewId: string
  description?: string
  combatProfile: CombatProfile
}
