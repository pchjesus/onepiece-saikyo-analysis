import { characterRepository } from '../data/repositories/characterRepository'
import { groupRepository } from '../data/repositories/groupRepository'
import type { Character, CharacterMembership, Group } from '../domain/character/types'

export type CharacterListEntry = {
  character: Character
  group: Group
  membership: CharacterMembership
}

/**
 * UI ordering uses canon role/number within a Group, never inferred
 * combat power or user-entered evaluation scores.
 *
 * Group ranks are not globally comparable (for example Sweet Generals
 * and the Beasts' Lead Performers), so members with equal roles use
 * their displayed Korean names as a deterministic fallback.
 */
const koreanNames = new Intl.Collator('ko-KR')

function membershipPriority(entry: CharacterListEntry): number {
  const { membership, group } = entry
  const role = membership.role ?? ''
  if (group.id === 'marines') {
    if (role === '원수') return 0
    if (role === '대장') return 1
    if (role.startsWith('중장')) return 2
    return 10
  }
  if (group.id === 'akazaya-nine' && role === '리더') return 0
  if (group.id === 'revolutionary-army') {
    if (role === '참모총장') return 0
    return 10
  }
  if (['pirate-crew', 'historical'].includes(group.type)) {
    if (!membership.subgroup && (role === '선장' || role.includes('/ 선장'))) return 0
    if (role.startsWith('부선장')) return 1
    const unit = membership.subgroup?.match(/^(\d+)번(?:대|선)$/)
    if (unit) return 10 + Number(unit[1])
  }
  // Unknown hierarchy is not an invitation to invent a power ranking.
  return 100
}

function compareEntries(a: CharacterListEntry, b: CharacterListEntry): number {
  const priority = membershipPriority(a) - membershipPriority(b)
  return priority || koreanNames.compare(a.character.name, b.character.name)
}

/**
 * Membership-expanded navigation list.
 *
 * A Character may intentionally appear more than once when they belong to
 * multiple Groups. Group tabs and affiliation-aware search use this view.
 */
export function getCharacterList(): CharacterListEntry[] {
  const charactersById = new Map(
    characterRepository.getCharacters().map((character) => [character.id, character]),
  )

  const sortedGroups = new Map(groupRepository.getGroups().map((group, index) => [group.id, index]))
  return groupRepository.getMemberships().map((membership) => {
    const character = charactersById.get(membership.characterId)
    const group = groupRepository.getGroup(membership.groupId)

    if (!character || !group) {
      throw new Error(
        `Incomplete group membership data: ${membership.characterId} -> ${membership.groupId}`,
      )
    }

    return { character, group, membership }
  }).sort((a, b) =>
    (sortedGroups.get(a.group.id) ?? 999) - (sortedGroups.get(b.group.id) ?? 999)
    || compareEntries(a, b))
}

/**
 * Character-unique roster view.
 *
 * Rankings, matchup selection and other one-row-per-Character features must
 * use this view so historical/secondary Memberships do not duplicate a
 * Character. The legacy Character.crewId remains the representative Group
 * during the migration; current Membership is the fallback.
 */
export function getUniqueCharacterList(): CharacterListEntry[] {
  const expanded = getCharacterList()
  const entriesByCharacter = new Map<string, CharacterListEntry[]>()

  for (const entry of expanded) {
    const entries = entriesByCharacter.get(entry.character.id) ?? []
    entries.push(entry)
    entriesByCharacter.set(entry.character.id, entries)
  }

  return [...entriesByCharacter.values()].map((entries) => {
    // Prefer the actual current Group over a legacy / historical affiliation.
    const representative = entries.find(({ membership }) => membership.status === 'current')
      ?? entries.find(({ membership }) => membership.groupId === entries[0].character.crewId)
      ?? entries[0]
    return representative
  }).sort((a, b) => {
    const order = groupRepository.getGroups()
    return order.findIndex(({ id }) => id === a.group.id) -
      order.findIndex(({ id }) => id === b.group.id)
      || compareEntries(a, b)
  })
}
