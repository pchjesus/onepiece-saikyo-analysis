import { characterRepository } from '../data/repositories/characterRepository'
import { crewRepository } from '../data/repositories/crewRepository'
import { evaluationRepository } from '../data/repositories/evaluationRepository'

export function getCharacterDetail(characterId: string) {
  const character = characterRepository.getCharacter(characterId)
  if (!character) return undefined

  const crew = crewRepository.getCrew(character.crewId)
  const evaluation = evaluationRepository.getEvaluation(character.id)
  if (!crew || !evaluation) throw new Error(`Incomplete character data: ${characterId}`)

  return { character, crew, evaluation }
}
