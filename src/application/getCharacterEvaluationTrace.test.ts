import { describe, expect, it } from 'vitest'
import { getCharacterEvaluationTrace } from './getCharacterEvaluationTrace'

describe('getCharacterEvaluationTrace', () => {
  it('resolves Marco technique and defense evidence after final calibration', () => {
    const trace = getCharacterEvaluationTrace('marco')
    const technique = trace?.find(({ item }) => item.stat === 'techniqueMastery')
    const defense = trace?.find(({ item }) => item.stat === 'defense')
    const attack = trace?.find(({ item }) => item.stat === 'attack')

    expect(technique?.evidence).toHaveLength(3)
    expect(technique?.item.score).toBe(81)
    expect(defense?.evidence).toHaveLength(4)
    expect(defense?.item.score).toBe(85)
    expect(attack?.item.baseScore).toBe(76)
    expect(attack?.item.hakiContributions[0]?.amount).toBe(2)
    expect(attack?.item.score).toBe(77)
  })

  it('resolves King attack Evidence including the Haki application record', () => {
    const kingAttack = getCharacterEvaluationTrace('king')?.find(({ item }) => item.stat === 'attack')
    expect(kingAttack?.evidence).toHaveLength(3)
    expect(kingAttack?.item.baseScore).toBe(81)
    expect(kingAttack?.item.score).toBe(83)
    expect(kingAttack?.item.hakiContributions[0]?.amount).toBe(4)
  })

  it('keeps King technique Evidence traceable after weighted Haki calibration', () => {
    const kingTechnique = getCharacterEvaluationTrace('king')?.find(({ item }) => item.stat === 'techniqueMastery')
    expect(kingTechnique?.evidence).toHaveLength(2)
    expect(kingTechnique?.item.baseScore).toBe(79)
    expect(kingTechnique?.item.score).toBe(80)
  })

  it('resolves Katakuri speed and Combat IQ evidence without adding Future Sight to Speed Haki', () => {
    const trace = getCharacterEvaluationTrace('katakuri')
    const speed = trace?.find(({ item }) => item.stat === 'speed')
    const combatIQ = trace?.find(({ item }) => item.stat === 'combatIQ')
    expect(speed?.evidence.map(({ evidence }) => evidence.id)).toContain('evidence-katakuri-snakeman-895')
    expect(speed?.item.hakiContributions).toHaveLength(0)
    expect(speed?.item.score).toBe(83)
    expect(combatIQ?.evidence.map(({ evidence }) => evidence.id)).toContain('evidence-katakuri-gear4-counter-883-885')
    expect(combatIQ?.item.score).toBe(83)
  })
})
