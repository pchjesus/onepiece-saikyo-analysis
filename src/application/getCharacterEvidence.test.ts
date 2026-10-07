import { describe, expect, it } from 'vitest'
import { getCharacterEvidence } from './getCharacterEvidence'

describe('getCharacterEvidence', () => {
  it('joins a character evidence record with its battle context', () => {
    const records = getCharacterEvidence('marco')

    expect(records).toHaveLength(5)
    expect(records[4]?.battle?.title).toContain('킹·퀸')
    expect(records[4]?.evidence.statContributions.map(({ stat, role }) => [stat, role])).toEqual([
      ['specialAbility', 'primary'],
      ['stamina', 'secondary'],
      ['techniqueMastery', 'context'],
    ])
  })

  it('returns King evidence with its Battle context', () => {
    const records = getCharacterEvidence('king')

    expect(records).toHaveLength(3)
    expect(records.map((record) => record.evidence.id)).toEqual([
      'evidence-king-marco-1006',
      'evidence-king-lunarian-1032',
      'evidence-king-zoro-1035',
    ])
  })

  it('returns no evidence for characters without evidence records', () => {
    expect(getCharacterEvidence('katakuri')).toEqual([])
  })
})
