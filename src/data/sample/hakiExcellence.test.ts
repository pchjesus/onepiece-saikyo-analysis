import { describe, expect, it } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { validateHakiProfile } from '../../domain/haki/validation'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { balancedV12 } from './calculationModels'

describe('approved qualitative Haki excellence rubric', () => {
  const byId = (id: string) => sampleCharacters.find(({ id: characterId }) => characterId === id)!
  const evidence = new Map(sampleEvidence.map((item) => [item.id, item]))

  it('links exceptional Haki assessments to owned evidence and confirmed capabilities without numeric tier', () => {
    const assessed = sampleCharacters.filter((character) => character.combatProfile.haki.excellenceAssessments?.length)
    expect(assessed.map(({ id }) => id).sort()).toEqual(['garp', 'katakuri', 'mihawk', 'shanks'])
    for (const character of sampleCharacters) {
      const profile = character.combatProfile.haki
      expect(validateHakiProfile(profile), character.id).toEqual([])
      for (const assessment of profile.excellenceAssessments ?? []) {
        expect(assessment.uncertainty.length).toBeGreaterThan(0)
        expect(assessment.interpretation.length).toBeGreaterThan(0)
        expect(Object.keys(assessment).sort()).not.toContain('amount')
        for (const evidenceId of assessment.evidenceIds) {
          expect(evidence.get(evidenceId)?.subjectCharacterId, evidenceId).toBe(character.id)
        }
      }
    }
    expect(byId('mihawk').combatProfile.haki.excellenceAssessments?.[0].basis).toBe('strong-inference')
    expect(byId('katakuri').combatProfile.haki.excellenceAssessments?.[0].basis).toBe('direct-application')
    expect(byId('shanks').combatProfile.haki.excellenceAssessments?.[0].basis).toBe('direct-application')
    expect(byId('garp').combatProfile.haki.excellenceAssessments?.find(({ type }) => type === 'armament')?.basis)
      .toBe('strong-inference')
    expect(byId('garp').combatProfile.haki.excellenceAssessments?.find(({ type }) => type === 'conquerors')?.eraContext)
      .toContain('전성기')
  })

  it('records Mihawk instruction separately from black-blade creation, with battle context', () => {
    const record = evidence.get('evidence-mihawk-armament-instruction-779')!
    expect(record.fact).toContain('가르쳤다')
    expect(record.interpretation).toContain('증명하지는 않는다')
    expect(sampleBattles.find(({ id }) => id === record.battleId)?.restrictions).toContain('지도 회상')
    expect(record.statContributions.map(({ stat }) => stat)).toEqual(['techniqueMastery'])
    expect(record.statContributions[0].role).toBe('context')
  })

  it('maintains all 39 legacy numeric Evaluations and their weighted calculation while metadata is introduced', () => {
    expect(sampleEvaluations).toHaveLength(39)
    const rows = sampleEvaluations.flatMap(({ items }) => items)
    expect(rows).toHaveLength(273)
    expect(rows.flatMap(({ hakiContributions }) => hakiContributions).reduce((sum, item) => sum + item.amount, 0))
      .toBe(256)
    for (const evaluation of sampleEvaluations) {
      const result = calculateBalancedCombatPower(evaluation, balancedV12)
      const independentMean = evaluation.items.reduce((total, item) => total + item.score, 0) / 7
      expect(result.finalScore, evaluation.id).toBeCloseTo(independentMean, 8)
    }
    expect(sampleEvaluations.find(({ characterId }) => characterId === 'mihawk')!.items
      .flatMap(({ hakiContributions }) => hakiContributions)).toHaveLength(0)
  })
})
