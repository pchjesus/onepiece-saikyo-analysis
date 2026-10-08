import { characterRepository } from '../data/repositories/characterRepository'
import { groupRepository } from '../data/repositories/groupRepository'
import type { Character, CharacterMembership, Group } from '../domain/character/types'

export type CharacterListEntry = {
  character: Character
  group: Group
  membership: CharacterMembership
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

  return groupRepository.getMemberships().map((membership) => {
    const character = charactersById.get(membership.characterId)
    const group = groupRepository.getGroup(membership.groupId)

    if (!character || !group) {
      throw new Error(
        `Incomplete group membership data: ${membership.characterId} -> ${membership.groupId}`,
      )
    }

    return { character, group, membership }
  })
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

  const seen = new Set<string>()
  return expanded.flatMap((entry) => {
    if (seen.has(entry.character.id)) return []
    seen.add(entry.character.id)

    const entries = entriesByCharacter.get(entry.character.id) ?? []
    const representative = entries.find(({ membership }) => membership.groupId === entry.character.crewId)
      ?? entries.find(({ membership }) => membership.status === 'current')
      ?? entries[0]

    return representative ? [representative] : []
  })
}
