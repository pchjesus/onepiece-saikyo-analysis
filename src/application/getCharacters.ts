import { characterRepository } from '../data/repositories/characterRepository'

export function getCharacters() {
  return characterRepository.getCharacters()
}
