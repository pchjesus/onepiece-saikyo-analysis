import { characterRepository } from '../data/repositories/characterRepository'
import { groupRepository } from '../data/repositories/groupRepository'

export function getCharacterList() {
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
