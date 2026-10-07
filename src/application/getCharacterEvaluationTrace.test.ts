import { describe, expect, it } from 'vitest'
import { getCharacterEvaluationTrace } from './getCharacterEvaluationTrace'

const techniqueMastery = getCharacterEvaluationTrace('marco')?.find(({ item }) => item.stat === 'techniqueMastery')
const kingAttack = getCharacterEvaluationTrace('king')?.find(({ item }) => item.stat === 'attack')

describe('getCharacterEvaluationTrace', () => {
  it('resolves Marco evaluation evidence ids into evidence records after calibration', () => {
    expect(techniqueMastery?.evidence).toHaveLength(2)
    expect(techniqueMastery?.evidence.map(({ evidence }) => evidence.id)).toEqual(['evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006'])
    expect(techniqueMastery?.item.score).toBe(76)
  })

  it('resolves King attack Evidence including the Haki application record', () => {
    expect(kingAttack?.evidence).toHaveLength(3)
    expect(kingAttack?.evidence.map(({ evidence }) => evidence.id)).toEqual(['evidence-king-marco-1006', 'evidence-king-zoro-1035', 'evidence-king-armament-1032'])
    expect(kingAttack?.item.baseScore).toBe(80)
    expect(kingAttack?.item.score).toBe(82)
    expect(kingAttack?.item.hakiContributions[0]?.amount).toBe(4)
  })

  it('keeps King technique Evidence traceable after weighted Haki calibration', () => {
    const kingTechnique = getCharacterEvaluationTrace('king')?.find(({ item }) => item.stat === 'techniqueMastery')
    expect(kingTechnique?.evidence).toHaveLength(2)
    expect(kingTechnique?.evidence.map(({ evidence }) => evidence.id)).toEqual(['evidence-king-zoro-1035', 'evidence-king-armament-1032'])
    expect(kingTechnique?.item.baseScore).toBe(78)
    expect(kingTechnique?.item.score).toBe(79)
  })
})
