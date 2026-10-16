import type { MatchupAnalysis } from '../../domain/matchup/types'
import { sampleMatchups } from '../sample/matchups'
import { luffyTeachStateMatchups } from '../sample/luffyTeachStateMatchups'
import { enelLuffyHistoricalMatchup } from '../sample/enelLuffyHistoricalMatchup'

/** Original 15 + two Luffy/Teach state scenarios + one historical nonnumeric duel. */
const allCurrentMatchups = [...sampleMatchups, ...luffyTeachStateMatchups, enelLuffyHistoricalMatchup]

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
  getAllMatchups: () => [...allCurrentMatchups],
  getMatchupsForCharacter: (characterId, subjectStateId) =>
    allCurrentMatchups.filter((matchup) => matchesSelectedState(matchup, characterId, subjectStateId)),
}
