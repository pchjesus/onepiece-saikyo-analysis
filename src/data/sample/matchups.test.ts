import { describe, expect, it } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleEvidence } from './evidence'
import { sampleMatchups } from './matchups'
import { validateMatchupAnalysis } from '../../domain/matchup/validation'

describe('sample evidence-aware matchups', () => {
  it('keeps prototype matchup references valid without numeric win probabilities', () => {
    const characterIds = new Set(sampleCharacters.map(({ id }) => id))
    const evidenceIds = sampleEvidence.map(({ id }) => id)

    expect(sampleMatchups).toHaveLength(3)
    for (const matchup of sampleMatchups) {
      expect(characterIds.has(matchup.characterAId)).toBe(true)
      expect(characterIds.has(matchup.characterBId)).toBe(true)
      expect(validateMatchupAnalysis(matchup, evidenceIds)).toEqual({ valid: true, errors: [] })
      expect(matchup).not.toHaveProperty('winProbability')
      expect(matchup).not.toHaveProperty('score')
    }
  })

  it('preserves uncertainty for attrition and special-win-condition interactions', () => {
    const marcoKing = sampleMatchups.find(({ id }) => id === 'matchup-marco-king')
    const lawTeach = sampleMatchups.find(({ id }) => id === 'matchup-law-teach')
    const hancockTeach = sampleMatchups.find(({ id }) => id === 'matchup-hancock-teach')

    expect(marcoKing?.factors.find(({ id }) => id === 'marco-king-attrition')?.advantage).toBe('unknown')
    expect(lawTeach?.factors.find(({ id }) => id === 'law-teach-nullification')?.advantage).toBe('conditional')
    expect(hancockTeach?.factors.filter(({ factor }) => factor === 'special-win-condition'))
      .toHaveLength(2)
  })
})
