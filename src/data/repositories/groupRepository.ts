import type { CharacterMembership, Group } from '../../domain/character/types'
import { sampleGroups } from '../sample/groups'
import { sampleMemberships } from '../sample/memberships'
import { v0411Memberships } from '../sample/v0411UnratedCharacterRegistration'

/** Existing historical memberships stay byte-for-byte unchanged. */
const currentMemberships = [...sampleMemberships, ...v0411Memberships]

export interface GroupRepository {
  getGroups(): Group[]
  getGroup(id: string): Group | undefined
  getMemberships(): CharacterMembership[]
  getMembershipsForCharacter(characterId: string): CharacterMembership[]
  getMembershipsForGroup(groupId: string): CharacterMembership[]
}

export const groupRepository: GroupRepository = {
  getGroups: () => sampleGroups,
  getGroup: (id) => sampleGroups.find((group) => group.id === id),
  getMemberships: () => currentMemberships,
  getMembershipsForCharacter: (characterId) =>
    currentMemberships.filter((membership) => membership.characterId === characterId),
  getMembershipsForGroup: (groupId) =>
    sampleMemberships.filter((membership) => membership.groupId === groupId),
}
