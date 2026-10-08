import { describe, expect, it } from 'vitest'
import { getCharacterEvidence } from './getCharacterEvidence'

describe('getCharacterEvidence', () => {
  it('joins Marco evidence with Battle context including limits and defensive feats', () => {
    const records = getCharacterEvidence('marco')
    expect(records).toHaveLength(12)
    expect(records.map((record) => record.evidence.id)).toContain('evidence-marco-armament-akainu-574')
    expect(records.map((record) => record.evidence.id)).toContain('evidence-marco-defense-kaido-1043')
    expect(records.map((record) => record.evidence.id)).toContain('evidence-marco-garp-567')
    expect(records.find((record) => record.evidence.id === 'evidence-marco-defense-kaido-1043')?.battle?.id).toBe('onigashima-marco-boro-breath')
  })

  it('returns King evidence including the Armament application with Battle context', () => {
    const records = getCharacterEvidence('king')
    expect(records).toHaveLength(5)
    expect(records.map((record) => record.evidence.id)).toEqual([
      'evidence-king-marco-1006', 'evidence-king-lunarian-1032', 'evidence-king-zoro-1035', 'evidence-king-armament-1032', 'evidence-king-waterfall-930',
    ])
  })

  it('returns Katakuri Canon Evidence with speed and Combat IQ coverage', () => {
    const records = getCharacterEvidence('katakuri')
    expect(records).toHaveLength(7)
    expect(records.every((record) => record.battle?.id === 'whole-cake-katakuri-luffy')).toBe(true)
    expect(records.map((record) => record.evidence.id)).toContain('evidence-katakuri-snakeman-895')
    expect(records.map((record) => record.evidence.id)).toContain('evidence-katakuri-gear4-counter-883-885')
  })
  it('returns Warlord evidence with separate matchup and core-stat context', () => {
    const law = getCharacterEvidence('law')
    const doflamingo = getCharacterEvidence('doflamingo')
    const hancock = getCharacterEvidence('hancock')

    expect(law.map((record) => record.evidence.id)).toContain('evidence-law-haki-nullification-1063')
    expect(law.map((record) => record.evidence.id)).toContain('evidence-law-teach-1064')
    expect(doflamingo.map((record) => record.evidence.id)).toContain('evidence-doflamingo-awakening-785')
    expect(doflamingo.map((record) => record.evidence.id)).toContain('evidence-doflamingo-organ-repair-781')
    expect(hancock.map((record) => record.evidence.id)).toContain('evidence-hancock-amazon-lily-1059')
  })

  it('adds direct Prime Garp God Valley evidence without treating the team finisher as a solo result', () => {
    const records = getCharacterEvidence('garp')
    const godValley = records.find((record) => record.evidence.id === 'evidence-garp-roger-rocks-1165')
    expect(godValley?.battle?.id).toBe('god-valley-garp-roger-rocks-1165')
    expect(godValley?.evidence.uncertainty).toContain('공동전')
  })
})
