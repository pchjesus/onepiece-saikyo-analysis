import { describe, expect, it } from 'vitest'
import { sampleBattles } from './battles'
import { sampleEvidence } from './evidence'
import { sampleEvaluations } from './evaluations'
import { balancedV12 } from './calculationModels'
import { validateEvaluation as validateEvidenceLinks } from '../../domain/evaluation/validation'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'

describe('v0.1.35 Sakazuki evidence-first calibration pilot', () => {
  const sakazuki = sampleEvaluations.find(({ characterId }) => characterId === 'akainu')!
  const item = (stat: string) => sakazuki.items.find((row) => row.stat === stat)!

  it('adds four Sakazuki owner-verified canon Evidence records with battle context', () => {
    const expected = [
      ['evidence-sakazuki-ace-intervention-574', 'marineford-sakazuki-ace-574'],
      ['evidence-sakazuki-meteor-volcano-564-565', 'marineford-sakazuki-meteor-564-565'],
      ['evidence-sakazuki-squard-deception-563', 'marineford-sakazuki-squard-563'],
      ['evidence-sakazuki-luffy-pursuit-578', 'marineford-jinbe-akainu'],
    ]
    for (const [id, battleId] of expected) {
      const evidence = sampleEvidence.find((record) => record.id === id)
      expect(evidence, id).toBeDefined()
      expect(evidence?.subjectCharacterId).toBe('akainu')
      expect(evidence?.source.type).toBe('canon')
      expect(evidence?.battleId).toBe(battleId)
      expect(sampleBattles.some((battle) => battle.id === battleId), battleId).toBe(true)
      expect(evidence?.uncertainty.length).toBeGreaterThan(0)
    }
  })

  it('links only supported axes without claiming pure Speed or a bonus for merely confirmed Haki', () => {
    expect(item('attack').evidenceIds).toContain('evidence-sakazuki-ace-intervention-574')
    expect(item('techniqueMastery').evidenceIds).toContain('evidence-sakazuki-meteor-volcano-564-565')
    expect(item('versatility').evidenceIds).toContain('evidence-sakazuki-meteor-volcano-564-565')
    expect(item('combatIQ').evidenceIds).toContain('evidence-sakazuki-squard-deception-563')
    expect(item('speed').evidenceIds).toEqual([])
    expect(item('speed').readiness).toBe('E3')
    expect(sakazuki.items.filter(({ readiness }) => readiness === 'E2')).toHaveLength(6)
    const refs = sampleEvidence.map(({ id, subjectCharacterId }) => ({ id, subjectCharacterId }))
    expect(validateEvidenceLinks(sakazuki, refs)).toEqual({ valid: true, errors: [] })
    expect(sakazuki.evaluationDataVersion).toBe('evaluation-0.1.35-evidence-only-draft')
  })

  it('preserves all prior scores, Haki typed Raw, rankings and source-pool coverage', () => {
    expect(sampleEvaluations).toHaveLength(39)
    expect(sampleEvaluations.flatMap(({ items }) => items)).toHaveLength(273)
    expect(sakazuki.items.map(({ score }) => score)).toEqual([97, 95, 96, 86, 91, 91, 91])
    expect(calculateBalancedCombatPower(sakazuki, balancedV12).finalScore).toBeCloseTo(647 / 7, 10)

    const legacy = new Map([
      ['kuzan', 649 / 7],
      ['shanks', 648 / 7],
      ['mihawk', 649 / 7],
      ['linlin', 660 / 7],
      ['katakuri', 579 / 7],
    ])
    for (const [id, expected] of legacy) {
      const evaluation = sampleEvaluations.find(({ characterId }) => characterId === id)!
      expect(calculateBalancedCombatPower(evaluation, balancedV12).finalScore, id).toBeCloseTo(expected, 10)
    }
    const rows = sampleEvaluations.flatMap(({ items }) => items)
    expect(rows.filter(({ evidenceIds }) => evidenceIds.length === 0)).toHaveLength(11)
    expect(rows.filter(({ readiness }) => !readiness)).toHaveLength(196)
    expect(rows.flatMap(({ hakiContributions }) => hakiContributions)
      .reduce((sum, contribution) => sum + contribution.amount, 0)).toBe(256)
  })
})
