import type { CharacterMembership, Group } from '../../domain/character/types'
import { sampleGroups } from '../sample/groups'
import { sampleMemberships } from '../sample/memberships'
import { v0411Memberships } from '../sample/v0411UnratedCharacterRegistration'
import { v0413EnelMembership } from '../sample/v0413RemainingDraftPublication'
import { charlosMembership, celestialDragonGroup } from '../special/charlosSpecial'

/** Existing historical memberships stay byte-for-byte unchanged. */
const currentMemberships = [...sampleMemberships, ...v0411Memberships, v0413EnelMembership, charlosMembership]

export interface GroupRepository {
  getGroups(): Group[]
  getGroup(id: string): Group | undefined
  getMemberships(): CharacterMembership[]
  getMembershipsForCharacter(characterId: string): CharacterMembership[]
  getMembershipsForGroup(groupId: string): CharacterMembership[]
}

export const groupRepository: GroupRepository = {
  getGroups: () => [...sampleGroups, celestialDragonGroup],
  getGroup: (id) => id === celestialDragonGroup.id ? celestialDragonGroup : sampleGroups.find((group) => group.id === id),
  getMemberships: () => currentMemberships,
  getMembershipsForCharacter: (characterId) =>
    currentMemberships.filter((membership) => membership.characterId === characterId),
  getMembershipsForGroup: (groupId) =>
    currentMemberships.filter((membership) => membership.groupId === groupId),
}
