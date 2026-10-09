import { describe, expect, it } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { balancedV12 } from './calculationModels'
import { validateEvaluation as validateEvidenceLinks } from '../../domain/evaluation/validation'
import { validateEvaluation as validateCalculation, calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getRawHakiContributionTotal, getFinalStatScore } from '../../domain/evaluation/score'

describe('37-character master pool / 39-evaluation Haki / Evidence audit', () => {
  it('checks each evaluated character profile, contributions, Evidence ownership and calculation consistency', () => {
    expect(sampleEvaluations).toHaveLength(45)
    expect(sampleCharacters).toHaveLength(43)
    const refs = sampleEvidence.map(({ id, subjectCharacterId }) => ({ id, subjectCharacterId }))
    for (const evaluation of sampleEvaluations) {
      const character = sampleCharacters.find(({ id }) => id === evaluation.characterId)
      expect(character, evaluation.characterId).toBeDefined()
      expect(character?.combatProfile.haki.capabilities).toHaveLength(3)
      expect(validateEvidenceLinks(evaluation, refs)).toEqual({ valid: true, errors: [] })
      expect(() => validateCalculation(evaluation, balancedV12.configuration.hakiWeight)).not.toThrow()
      const expected = evaluation.items.reduce((total, item) => total + getFinalStatScore(item, balancedV12.configuration.hakiWeight), 0) / 7
      expect(calculateBalancedCombatPower(evaluation, balancedV12).finalScore).toBeCloseTo(expected, 10)
      for (const item of evaluation.items) {
        expect(getRawHakiContributionTotal(item)).toBeLessThanOrEqual(10)
        for (const contribution of item.hakiContributions) {
          const capability = character?.combatProfile.haki.capabilities.find(({ type }) => type === contribution.hakiType)
          expect(capability?.status, `${evaluation.characterId} ${contribution.hakiType}`).toBe('confirmed')
          for (const evidenceId of contribution.evidenceIds) {
            const record = sampleEvidence.find(({ id }) => id === evidenceId)
            expect(record?.subjectCharacterId).toBe(evaluation.characterId)
            expect(item.evidenceIds).toContain(evidenceId)
            expect(record?.statContributions.some(({ stat }) => stat === item.stat), `${evaluation.characterId} / ${item.stat} / ${evidenceId}`).toBe(true)
          }
        }
      }
    }
  })

  it('checks verified exceptional Raw and approved ordinary-Haki A transfers without duplicate invention', () => {
    const item = (id: string, stat: string) => sampleEvaluations.find(e => e.characterId === id)?.items.find(i => i.stat === stat)
    expect(getRawHakiContributionTotal(item('shanks', 'attack')!)).toBe(6)
    expect(getRawHakiContributionTotal(item('shanks', 'techniqueMastery')!)).toBe(8)
    expect(item('shanks', 'techniqueMastery')?.score).toBe(96)
    expect(getRawHakiContributionTotal(item('garp', 'attack')!)).toBe(8)
    expect(item('garp', 'attack')?.score).toBe(99)
    expect(getRawHakiContributionTotal(item('garp', 'defense')!)).toBe(8)
    expect(getRawHakiContributionTotal(item('garp', 'techniqueMastery')!)).toBe(8)
    const currentGarp = sampleEvaluations.find(e => e.characterId === 'garp' && e.subjectState?.id === 'current')
    expect(getRawHakiContributionTotal(currentGarp?.items.find(i => i.stat === 'attack')!)).toBe(6)
    expect(currentGarp?.items.find(i => i.stat === 'attack')?.score).toBe(96)
    expect(getRawHakiContributionTotal(item('kuzan', 'techniqueMastery')!)).toBe(4)
    expect(getRawHakiContributionTotal(item('akainu', 'defense')!)).toBe(0)
    expect(item('akainu', 'defense')?.baseScore).toBe(95)
    expect(getRawHakiContributionTotal(item('kizaru', 'defense')!)).toBe(2)
    expect(getRawHakiContributionTotal(item('fujitora', 'combatIQ')!)).toBe(2)
    expect(getRawHakiContributionTotal(item('shiryu', 'techniqueMastery')!)).toBe(2)
    expect(getRawHakiContributionTotal(item('burgess', 'attack')!)).toBe(4)
    // Ifrit Jambe proves Sanji's attacking Armament, not the defensive application.
    expect(getRawHakiContributionTotal(item('sanji', 'defense')!)).toBe(0)
    expect(item('sanji', 'defense')?.score).toBe(85)
    // Possession-only/unclear Haki does not produce an automatic bonus.
    expect(getRawHakiContributionTotal(item('jack', 'attack')!)).toBe(0)
    expect(getRawHakiContributionTotal(item('van-augur', 'attack')!)).toBe(0)
    // New Warlord drafts keep typed Raw Haki at zero until direct application evidence is assigned by type.
    expect(getRawHakiContributionTotal(item('law', 'attack')!)).toBe(0)
    expect(getRawHakiContributionTotal(item('doflamingo', 'attack')!)).toBe(0)
    expect(getRawHakiContributionTotal(item('hancock', 'attack')!)).toBe(0)
    expect(getRawHakiContributionTotal(item('mihawk', 'attack')!)).toBe(0)
    expect(getRawHakiContributionTotal(item('crocodile', 'attack')!)).toBe(0)

    expect(getRawHakiContributionTotal(item('roger', 'attack')!)).toBe(8)
    expect(getRawHakiContributionTotal(item('rocks', 'attack')!)).toBe(8)
    expect(getRawHakiContributionTotal(item('newgate', 'attack')!)).toBe(8)
    expect(getRawHakiContributionTotal(item('kaido', 'attack')!)).toBe(6)
    expect(getRawHakiContributionTotal(item('linlin', 'attack')!)).toBe(6)
    expect(getRawHakiContributionTotal(item('rayleigh', 'attack')!)).toBe(0)

    const currentRayleigh = sampleEvaluations.find(e => e.id === 'evaluation-rayleigh-current')
    expect(getRawHakiContributionTotal(currentRayleigh?.items.find(i => i.stat === 'attack')!)).toBe(4)
    const currentGaban = sampleEvaluations.find(e => e.id === 'evaluation-gaban-current')
    expect(getRawHakiContributionTotal(currentGaban?.items.find(i => i.stat === 'combatIQ')!)).toBe(2)
  })

  it('preserves Balanced 1.2 configuration and absence of direct Special points', () => {
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(balancedV12.configuration.statCount).toBe(7)
    expect(balancedV12.configuration.method).toBe('arithmetic-mean')
  })
})
