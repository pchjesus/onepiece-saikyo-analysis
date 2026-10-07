import { characterRepository } from '../data/repositories/characterRepository'
import { crewRepository } from '../data/repositories/crewRepository'

export function getCharacterList() {
  return characterRepository.getCharacters().map((character) => {
    const crew = crewRepository.getCrew(character.crewId)
    if (!crew) throw new Error(`Incomplete character data: ${character.id}`)
    return { character, crew }
  })
}
