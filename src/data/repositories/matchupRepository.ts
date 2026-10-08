import type { MatchupAnalysis } from '../../domain/matchup/types'
import { sampleMatchups } from '../sample/matchups'

export interface MatchupRepository {
  getAllMatchups(): MatchupAnalysis[]
  getMatchupsForCharacter(characterId: string, subjectStateId?: string): MatchupAnalysis[]
}

function matchesSelectedState(matchup: MatchupAnalysis, characterId: string, subjectStateId?: string) {
  const isA = matchup.characterAId === characterId
  const isB = matchup.characterBId === characterId
  if (!isA && !isB) return false
  const requiredState = isA ? matchup.characterAStateId : matchup.characterBStateId
  return !requiredState || requiredState === subjectStateId
}

export const matchupRepository: MatchupRepository = {
  getAllMatchups: () => [...sampleMatchups],
  getMatchupsForCharacter: (characterId, subjectStateId) =>
    sampleMatchups.filter((matchup) => matchesSelectedState(matchup, characterId, subjectStateId)),
}
