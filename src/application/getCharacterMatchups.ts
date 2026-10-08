import { characterRepository } from '../data/repositories/characterRepository'
import { matchupRepository } from '../data/repositories/matchupRepository'
import type { MatchupAnalysis } from '../domain/matchup/types'

export type CharacterMatchupView = {
  matchup: MatchupAnalysis
  opponentId: string
  opponentName: string
  perspective: 'character-a' | 'character-b'
}

export function getCharacterMatchups(characterId: string, subjectStateId?: string): CharacterMatchupView[] {
  return matchupRepository.getMatchupsForCharacter(characterId, subjectStateId).flatMap((matchup) => {
    const perspective = matchup.characterAId === characterId ? 'character-a' as const : 'character-b' as const
    const opponentId = perspective === 'character-a' ? matchup.characterBId : matchup.characterAId
    const opponent = characterRepository.getCharacter(opponentId)
    return opponent ? [{ matchup, opponentId, opponentName: opponent.name, perspective }] : []
  })
}
