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

export type CombatProfile = {
  combatStyles: string[]
  keyAbilities: string[]
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
