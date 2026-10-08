import type { HakiProfile } from '../haki/types'

export type Crew = {
  id: string
  name: string
  description?: string
}

/**
 * Long-term affiliation model.
 *
 * Crew/crewId remain temporarily for backwards compatibility while the UI and
 * repositories migrate to Group/Membership.
 */
export type GroupType =
  | 'pirate-crew'
  | 'marine'
  | 'government'
  | 'revolutionary'
  | 'institution'
  | 'regional'
  | 'historical'
  | 'other'

export type Group = {
  id: string
  name: string
  type: GroupType
  parentGroupId?: string
  description?: string
}

export type MembershipStatus = 'current' | 'former' | 'historical' | 'unknown'

export type CharacterMembership = {
  characterId: string
  groupId: string
  subgroup?: string
  role?: string
  status: MembershipStatus
  period?: string
}

export type CanonProfileSource = {
  label: string
  reference: string
}

export type CharacterKnownAsKind = 'alias' | 'epithet' | 'title'

export type CharacterKnownAs = {
  kind: CharacterKnownAsKind
  name: string
  source: CanonProfileSource
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
  /** Primary official display name. Aliases, epithets and titles stay separate. */
  name: string
  crewId: string
  knownAs: CharacterKnownAs[]
  description?: string
  combatProfile: CombatProfile
}
