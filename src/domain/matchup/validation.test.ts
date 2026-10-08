import { describe, expect, it } from 'vitest'
import type { MatchupAnalysis } from './types'
import { validateMatchupAnalysis } from './validation'

const base: MatchupAnalysis = {
  id: 'marco-vs-king',
  characterAId: 'marco',
  characterBId: 'king',
  assumptions: {
    battlefield: 'neutral',
    preparation: 'none',
    startingCondition: 'normal',
    externalIntervention: 'none',
  },
  factors: [
    {
      id: 'marco-attrition',
      factor: 'resource-endurance',
      phase: 'long',
      advantage: 'conditional',
      confidence: 'confirmed',
      summary: 'Marco can extend combat through repeated regeneration and defensive intervention.',
      evidenceIds: ['evidence-marco-regeneration-1006'],
      conditions: 'The fight lasts long enough for repeated exchanges without seastone or external restraint.',
      uncertainty: 'Marco explicitly shows fatigue, so regeneration is not treated as unlimited.',
    },
  ],
}

describe('matchup model foundation', () => {
  it('accepts evidence-linked conditional analysis without numeric win probability', () => {
    expect(validateMatchupAnalysis(base, ['evidence-marco-regeneration-1006']))
      .toEqual({ valid: true, errors: [] })
  })

  it('validates explicit evaluation-state references', () => {
    const stateAware: MatchupAnalysis = { ...base, characterAId: 'garp', characterAStateId: 'current' }
    expect(validateMatchupAnalysis(
      stateAware,
      ['evidence-marco-regeneration-1006'],
      ['garp:prime', 'garp:current'],
    )).toEqual({ valid: true, errors: [] })

    expect(validateMatchupAnalysis(
      { ...stateAware, characterAStateId: 'future' },
      ['evidence-marco-regeneration-1006'],
      ['garp:prime', 'garp:current'],
    ).errors).toContain('Unknown matchup evaluation state: garp:future.')
  })

  it('rejects self-matchups, unknown evidence and unsupported confirmed claims', () => {
    const invalid: MatchupAnalysis = {
      ...base,
      characterBId: 'marco',
      factors: [
        { ...base.factors[0], advantage: 'conditional', conditions: '', evidenceIds: ['missing'] },
        {
          id: 'no-evidence',
          factor: 'haki-interaction',
          phase: 'all',
          advantage: 'unknown',
          confidence: 'confirmed',
          summary: 'No evidence',
          evidenceIds: [],
          uncertainty: 'Unknown.',
        },
      ],
    }
    const result = validateMatchupAnalysis(invalid, ['evidence-marco-regeneration-1006'])
    expect(result.errors).toContain('A matchup requires two different characters.')
    expect(result.errors).toContain('Conditional matchup factor requires conditions: marco-attrition.')
    expect(result.errors).toContain('Unknown matchup Evidence id: missing.')
    expect(result.errors).toContain('Confirmed matchup factor requires Evidence: no-evidence.')
  })
})
