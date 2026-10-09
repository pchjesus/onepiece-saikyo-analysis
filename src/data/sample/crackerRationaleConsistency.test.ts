import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'

describe('Cracker Final Stat rationale consistency', () => {
  const evaluation = sampleEvaluations.find((entry) => entry.characterId === 'cracker' && entry.isDefault !== false)
  const attack = evaluation?.items.find((entry) => entry.stat === 'attack')
  const defense = evaluation?.items.find((entry) => entry.stat === 'defense')
  const stamina = evaluation?.items.find((entry) => entry.stat === 'stamina')

  it('keeps the approved 7-axis values, Haki Raw and unchanged Overall', () => {
    expect(evaluation?.items.map((entry) => entry.score)).toEqual([77, 81, 80, 75, 80, 75, 77])
    expect(attack && getFinalStatScore(attack)).toBe(77)
    expect(defense && getFinalStatScore(defense)).toBe(81)
    expect(attack && getRawHakiContributionTotal(attack)).toBe(4)
    expect(evaluation!.items.reduce((sum, entry) => sum + entry.score, 0) / 7).toBeCloseTo(77.857142857, 7)
  })

  it('keeps numerical descriptions in sync with their calculated Final values', () => {
    expect(attack?.rationale).toContain('Final 77')
    expect(defense?.rationale).toContain('Final 81')
    expect(attack?.rationale).not.toContain('Final 74')
    expect(defense?.rationale).not.toContain('76으로 제한')
  })

  it('does not describe Stamina 80 as an obsolete low-70s score', () => {
    expect(stamina?.score).toBe(80)
    const longBattle = sampleEvidence.find((entry) => entry.id === 'evidence-cracker-long-battle-842')
    expect(longBattle?.evaluationImpact).toContain('장시간 병사 생성·조종')
    expect(longBattle?.evaluationImpact).not.toContain('70대 초반')
  })
})
