import { describe, expect, it } from 'vitest'
import { getCharacterEvaluationTrace } from './getCharacterEvaluationTrace'

const techniqueMastery = getCharacterEvaluationTrace('marco')?.find(({ item }) => item.stat === 'techniqueMastery')
const kingAttack = getCharacterEvaluationTrace('king')?.find(({ item }) => item.stat === 'attack')


describe('getCharacterEvaluationTrace', () => {
  it('resolves evaluation evidence ids into evidence records', () => {
    expect(techniqueMastery?.evidence).toHaveLength(0)
    expect(techniqueMastery?.item.score).toBe(78)
  })

  it('resolves King evaluation evidence into evidence records', () => {
    expect(kingAttack?.evidence).toHaveLength(2)
    expect(kingAttack?.evidence.map(({ evidence }) => evidence.id)).toEqual([
      'evidence-king-marco-1006',
      'evidence-king-zoro-1035',
    ])
    expect(kingAttack?.item.score).toBe(90)
  })

  it('keeps an evaluation item with a technique traceable', () => {
    const kingTechnique = getCharacterEvaluationTrace('king')?.find(({ item }) => item.stat === 'techniqueMastery')

    expect(kingTechnique?.evidence).toHaveLength(1)
    expect(kingTechnique?.evidence[0]?.evidence.id).toBe('evidence-king-zoro-1035')
    expect(kingTechnique?.item.score).toBe(86)
  })
})
