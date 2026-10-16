import type { Character } from '../../domain/character/types'
import { sampleCharacters } from '../sample/characters'
import { v0411Characters } from '../sample/v0411UnratedCharacterRegistration'
import { v0413EnelCharacter } from '../sample/v0413RemainingDraftPublication'
import { charlosCharacter } from '../special/charlosSpecial'

/** Frozen scored roster + separately registered unrated profiles. */
const currentCharacters = [...sampleCharacters, ...v0411Characters, v0413EnelCharacter, charlosCharacter]

export interface CharacterRepository {
  getCharacters(): Character[]
  getCharacter(id: string): Character | undefined
}

export const characterRepository: CharacterRepository = {
  getCharacters: () => currentCharacters,
  getCharacter: (id) => currentCharacters.find((character) => character.id === id),
}
