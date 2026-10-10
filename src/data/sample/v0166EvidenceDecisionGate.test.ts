import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleCharacters } from './characters'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import type { Evaluation } from '../../domain/evaluation/types'

/**
 * v0.1.66 review-only decision gate.
 * A hypothetical *upside-only* Vista Technique candidate lives only in this
 * test fixture. It MUST NOT update Evaluation source, model, UI or matchup data.
 * No Shanks/Vista Raw-off downside scenario is calculated.
 */
const defaults = sampleEvaluations.filter(e => e.isDefault !== false)
const evaluationFor = (id: string): Evaluation => {
  const evaluation = defaults.find(e => e.characterId === id)
  if (!evaluation) throw new Error('Missing default evaluation for ' + id)
  return evaluation
}
const itemFor = (id: string, stat: string) => {
  const item = evaluationFor(id).items.find(i => i.stat === stat)
  if (!item) throw new Error('Missing stat for ' + id + '/' + stat)
  return item
}
const overall = (evaluation: Evaluation) => calculateBalancedCombatPower(evaluation, balancedV12).finalScore
const rank = (id: string, entries: readonly Evaluation[] = defaults) =>
  1 + [...entries].sort((a, b) => overall(b) - overall(a) || a.characterId.localeCompare(b.characterId, 'ko'))
    .findIndex(e => e.characterId === id)

describe('v0.1.66 seven-axis Vista/Shanks evidence and user-approval gate', () => {
  it('guards 7-axis score, readiness, source IDs and peer comparison for both characters', () => {
    const vista = evaluationFor('vista')
    const shanks = evaluationFor('shanks')
    expect(vista.items).toHaveLength(7)
    expect(shanks.items).toHaveLength(7)
    expect(vista.items.map(i => i.score)).toEqual([82, 79, 77, 80, 87, 77, 74])
    expect(shanks.items.map(i => i.score)).toEqual([97, 91, 88, 95, 96, 93, 88])
    expect(vista.items.map(i => i.readiness)).toEqual(['E2', 'E2', 'E3', 'E3', 'E1', 'E3', 'E2'])
    expect(shanks.items.map(i => i.readiness)).toEqual(['E2', 'E2', 'E3', 'E3', 'E2', 'E2', 'E2'])
    const profile = sampleEvidence.find(e => e.id === 'evidence-vista-official-mihawk-profile')
    const clash = sampleEvidence.find(e => e.id === 'evidence-vista-mihawk-561-562')
    expect(profile?.source.type).toBe('supplementary')
    expect(profile?.subjectCharacterId).toBe('vista')
    expect(profile?.statContributions.some(c => c.stat === 'techniqueMastery' && c.role === 'primary')).toBe(true)
    expect(clash?.source.reference).toContain('561-562')
    expect(clash?.statContributions.map(c => c.stat)).toEqual(expect.arrayContaining(['attack', 'defense', 'speed', 'techniqueMastery', 'versatility']))
    expect(itemFor('vista', 'techniqueMastery').evidenceIds).toEqual(expect.arrayContaining([profile!.id, clash!.id]))
    for (const [id, expected] of [
      ['mihawk', 99], ['zoro', 87], ['king', 80],
    ] as const) {
      expect(sampleCharacters.some(c => c.id === id)).toBe(true)
      expect(itemFor(id, 'techniqueMastery').score).toBe(expected)
    }
    expect(itemFor('vista', 'stamina').readiness).toBe('E3')
    expect(itemFor('shanks', 'speed').readiness).toBe('E3')
  })

  it('keeps all four unresolved Haki source-effect cases and approved v0.1.62 exceptions intact', () => {
    const incidents = [
      { id: 'vista', evidenceId: 'evidence-vista-armament-akainu-574',
        effects: [['attack', 4], ['techniqueMastery', 2]] },
      { id: 'shanks', evidenceId: 'evidence-shanks-kid-divine-departure-1079',
        effects: [['attack', 6], ['techniqueMastery', 8], ['combatIQ', 4]] },
      { id: 'katakuri', evidenceId: 'evidence-katakuri-future-sight-881-884',
        effects: [['defense', 6], ['techniqueMastery', 6]] },
      { id: 'jinbe', evidenceId: 'evidence-jinbe-whos-who-1018',
        effects: [['defense', 4]] },
    ] as const
    for (const incident of incidents) {
      const evidence = sampleEvidence.find(e => e.id === incident.evidenceId)
      expect(evidence?.subjectCharacterId, incident.evidenceId).toBe(incident.id)
      for (const [stat, raw] of incident.effects) {
        const entry = itemFor(incident.id, stat)
        expect(entry.evidenceIds, incident.id + '/' + stat).toContain(incident.evidenceId)
        expect(entry.hakiContributions.filter(h => h.evidenceIds.includes(incident.evidenceId))
          .reduce((sum, h) => sum + h.amount, 0)).toBe(raw)
      }
    }
    const aramaki = sampleEvidence.find(e => e.id === 'evidence-shanks-aramaki-haki-1055')
    const kid = sampleEvidence.find(e => e.id === 'evidence-shanks-kid-divine-departure-1079')
    expect(aramaki?.battleId).not.toBe(kid?.battleId)
    expect(aramaki?.statContributions.some(c => c.stat === 'versatility' && c.role === 'primary')).toBe(true)
    expect(kid?.statContributions.some(c => c.stat === 'attack' && c.role === 'primary')).toBe(true)
    expect(itemFor('shanks', 'versatility').evidenceIds).toContain(aramaki!.id)
    expect(itemFor('shanks', 'techniqueMastery').hakiContributions.map(h => h.hakiType))
      .toEqual(['conquerors', 'observation'])
    expect(itemFor('katakuri', 'combatIQ').hakiContributions).toHaveLength(0)
    expect(itemFor('jinbe', 'attack').hakiContributions).toHaveLength(0)
    // v0.1.66 follow-up: the Ace five-day duel evidence must reflect
    // Jinbe's live Stamina80, never a historical Stamina79 narrative.
    const jinbeFiveDays = sampleEvidence.find(e => e.id === 'evidence-jinbe-ace-five-days-552')
    expect(itemFor('jinbe', 'stamina').score).toBe(80)
    expect(jinbeFiveDays?.evaluationImpact).toContain('Stamina 80')
    expect(jinbeFiveDays?.evaluationImpact).not.toContain('Stamina 79')

    expect(itemFor('king', 'attack').hakiContributions).toHaveLength(0)
    expect(itemFor('king', 'techniqueMastery').hakiContributions).toHaveLength(0)
  })

  it('calculates just one APPROVAL-GATED Vista Technique upside on a copy, not production', () => {
    const current = evaluationFor('vista')
    const before = itemFor('vista', 'techniqueMastery')
    expect(before.baseScore).toBe(86)
    expect(getRawHakiContributionTotal(before)).toBe(2)
    expect(before.score).toBe(87)
    const previewBase = 89 // proposed calibration, not a canon-derived number or approved change
    const preview: Evaluation = {
      ...current,
      items: current.items.map(i => {
        if (i.stat !== 'techniqueMastery') return i
        const candidate = { ...i, baseScore: previewBase }
        return { ...candidate, score: getFinalStatScore(candidate, balancedV12.configuration.hakiWeight) }
      }),
    }
    expect(preview.items.find(i => i.stat === 'techniqueMastery')?.score).toBe(90)
    expect(overall(current)).toBeCloseTo(556 / 7, 10)
    expect(overall(preview)).toBeCloseTo(559 / 7, 10)
    expect(overall(preview) - overall(current)).toBeCloseTo(3 / 7, 10)
    expect(rank('vista')).toBe(26)
    const previewRoster = defaults.map(e => e.characterId === 'vista' ? preview : e)
    expect(rank('vista', previewRoster)).toBe(25)
    expect(rank('shanks')).toBe(10)
    expect(rank('shanks', previewRoster)).toBe(10)
    expect(itemFor('vista', 'techniqueMastery').baseScore).toBe(86)
    expect(itemFor('vista', 'techniqueMastery').score).toBe(87)
    expect(overall(evaluationFor('vista'))).toBeCloseTo(556 / 7, 10)
    expect(previewRoster.filter(e => e !== preview).every(e => defaults.includes(e))).toBe(true)
  })

  it('preserves evaluation/model/matchup/roster baselines and the v0.1.65 presentation-only separation', () => {
    expect(sampleCharacters).toHaveLength(60)
    expect(defaults).toHaveLength(59)
    expect(sampleEvaluations).toHaveLength(62)
    expect(defaults.flatMap(e => e.items)).toHaveLength(413)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(defaults.flatMap(e => e.items).reduce((sum, i) => sum + getRawHakiContributionTotal(i), 0)).toBe(212)
    expect(sampleEvaluations.flatMap(e => e.items).reduce((sum, i) => sum + getRawHakiContributionTotal(i), 0)).toBe(230)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleMatchups).toHaveLength(15)
    expect(sampleMatchups.some(m => m.id === 'matchup-mihawk-vista')).toBe(true)
    expect(sampleMatchups.some(m => m.id === 'matchup-mihawk-shanks')).toBe(true)
    expect(evaluationFor('vista').evaluationDataVersion).toBe('evaluation-0.1.26-draft')
    expect(evaluationFor('shanks').evaluationDataVersion).toBe('evaluation-0.1.26-draft')
    expect(itemFor('kaido', 'defense').score).toBe(100)
    for (const e of defaults) expect(overall(e)).toBeCloseTo(e.items.reduce((s, i) => s + i.score, 0) / 7, 10)
    // Legacy display normalization regression is deliberately left to its own
    // existing unit and full-corpus React tests, run in the same complete suite.
  })
})
