import { characterRepository } from '../data/repositories/characterRepository'
import { groupRepository } from '../data/repositories/groupRepository'
import type { Character, CharacterMembership, Group } from '../domain/character/types'

export type OrganizationScope = 'current' | 'past' | 'all'
export type OrganizationMember = {
  character: Character
  group: Group
  membership: CharacterMembership
}
export type OrganizationUnit = { label: string; members: OrganizationMember[] }
export type OrganizationSection = { group: Group; units: OrganizationUnit[]; count: number }
export type OrganizationChart = { group: Group; sections: OrganizationSection[]; count: number }

const koreanNames = new Intl.Collator('ko-KR')

export function getOrganizationGroups(): Group[] {
  // Include the full registry, even groups without currently evaluated members.
  return groupRepository.getGroups()
}

function getGroupFamily(groupId: string, groups: readonly Group[]): Group[] {
  const found: Group[] = []
  const visited = new Set<string>()
  const queue = [groupId]
  while (queue.length > 0) {
    const id = queue.shift()!
    if (visited.has(id)) continue
    visited.add(id)
    const group = groups.find((item) => item.id === id)
    if (!group) continue
    found.push(group)
    // Only the explicitly stored Group parent links create sub-organizations.
    queue.push(...groups.filter((item) => item.parentGroupId === id).map((item) => item.id))
  }
  return found
}

function isVisible(status: CharacterMembership['status'], scope: OrganizationScope): boolean {
  if (scope === 'current') return status === 'current'
  if (scope === 'past') return status === 'former' || status === 'historical'
  return true
}

function rankMember(member: OrganizationMember): number {
  const role = member.membership.role ?? ''
  // This is a display order, NOT a claim about chain of command or combat power.
  if (/^(제독|원수|총독|선장|참모총장|리더)/.test(role) || role.includes('명목상 대표')) return 0
  if (role.startsWith('부선장')) return 1
  return 10
}

function compareMember(a: OrganizationMember, b: OrganizationMember): number {
  return rankMember(a) - rankMember(b)
    || koreanNames.compare(a.character.name, b.character.name)
}

export function getOrganizationChart(groupId: string, scope: OrganizationScope): OrganizationChart | undefined {
  const groups = getOrganizationGroups()
  const family = getGroupFamily(groupId, groups)
  const group = family[0]
  if (!group) return undefined

  const groupDepth = new Map(family.map((item, index) => [item.id, index]))
  const charactersById = new Map(characterRepository.getCharacters().map((character) => [character.id, character]))
  const chosen = new Map<string, OrganizationMember>()

  for (const membership of groupRepository.getMemberships()) {
    if (!groupDepth.has(membership.groupId) || !isVisible(membership.status, scope)) continue
    const character = charactersById.get(membership.characterId)
    const memberGroup = groups.find((item) => item.id === membership.groupId)
    if (!character || !memberGroup) throw new Error('Invalid organization membership reference')
    const candidate = { character, group: memberGroup, membership }
    const previous = chosen.get(character.id)
    if (!previous) {
      chosen.set(character.id, candidate)
      continue
    }
    // For "all", show the current affiliation in preference to a historical one.
    // Within the same time class, the more specific registered child Group wins.
    const priority = (member: OrganizationMember) => scope === 'all'
      ? (member.membership.status === 'current' ? 1000 : 0) + (groupDepth.get(member.group.id) ?? 0)
      : (groupDepth.get(member.group.id) ?? 0)
    if (priority(candidate) > priority(previous)) chosen.set(character.id, candidate)
  }

  const members = [...chosen.values()]
  const sections = family.map((part): OrganizationSection => {
    const local = members.filter((member) => member.group.id === part.id)
    const unitsByLabel = new Map<string, OrganizationMember[]>()
    for (const member of local) {
      const label = member.membership.subgroup || '기본 소속 및 직책'
      const list = unitsByLabel.get(label) ?? []
      list.push(member)
      unitsByLabel.set(label, list)
    }
    const units = [...unitsByLabel.entries()].map(([label, entries]) => ({
      label,
      members: entries.sort(compareMember),
    }))
    return { group: part, units, count: local.length }
  }).filter((section) => section.count > 0)

  return { group, sections, count: members.length }
}

export function getDefaultOrganizationScope(groupId: string): OrganizationScope {
  return (getOrganizationChart(groupId, 'current')?.count ?? 0) > 0 ? 'current' : 'past'
}
