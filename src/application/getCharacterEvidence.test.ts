import { describe, expect, it } from 'vitest'
import { getCharacterEvidence } from './getCharacterEvidence'

describe('getCharacterEvidence', () => {
  it('joins a character evidence record with its battle context', () => {
    const records = getCharacterEvidence('marco')
    expect(records).toHaveLength(5)
    expect(records[4]?.battle?.title).toContain('킹·퀸')
    expect(records[4]?.evidence.statContributions.map(({ stat, role }) => [stat, role])).toEqual([
      ['specialAbility', 'primary'], ['stamina', 'secondary'], ['techniqueMastery', 'context'],
    ])
  })

  it('returns King evidence including the Armament application with Battle context', () => {
    const records = getCharacterEvidence('king')
    expect(records).toHaveLength(4)
    expect(records.map((record) => record.evidence.id)).toEqual([
      'evidence-king-marco-1006', 'evidence-king-lunarian-1032', 'evidence-king-zoro-1035', 'evidence-king-armament-1032',
    ])
  })

  it('returns Katakuri Canon Evidence with the Mirror World Battle context', () => {
    const records = getCharacterEvidence('katakuri')
    expect(records).toHaveLength(5)
    expect(records.every((record) => record.battle?.id === 'whole-cake-katakuri-luffy')).toBe(true)
    expect(records.map((record) => record.evidence.id)).toContain('evidence-katakuri-future-sight-881-884')
  })
})
