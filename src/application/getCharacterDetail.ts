import { characterRepository } from '../data/repositories/characterRepository'
import { groupRepository } from '../data/repositories/groupRepository'
import { evaluationRepository } from '../data/repositories/evaluationRepository'

// Use the active Group/Membership model rather than the legacy three-crew registry.
export function getCharacterDetail(characterId: string, groupId?: string) {
  const character = characterRepository.getCharacter(characterId)
  if (!character) return undefined

  const memberships = groupRepository.getMembershipsForCharacter(characterId)
  const membership = groupId
    ? memberships.find((entry) => entry.groupId === groupId)
    : memberships.find((entry) => entry.groupId === character.crewId) ?? memberships[0]
  const group = membership && groupRepository.getGroup(membership.groupId)
  const evaluation = evaluationRepository.getEvaluation(character.id)
  if (!group || !evaluation) throw new Error(`Incomplete character data: ${characterId}`)

  return { character, group, membership, evaluation }
}
