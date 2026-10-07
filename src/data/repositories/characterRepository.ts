import type { Character } from '../../domain/character/types'
import { sampleCharacters } from '../sample/characters'

export interface CharacterRepository {
  getCharacters(): Character[]
  getCharacter(id: string): Character | undefined
}

export const characterRepository: CharacterRepository = {
  getCharacters: () => sampleCharacters,
  getCharacter: (id) => sampleCharacters.find((character) => character.id === id),
}
