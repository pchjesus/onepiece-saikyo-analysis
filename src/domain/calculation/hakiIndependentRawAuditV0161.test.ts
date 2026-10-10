import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { sampleEvidence } from '../../data/sample/evidence'
import { sampleMatchups } from '../../data/sample/matchups'
import { balancedV12 } from '../../data/sample/calculationModels'
import { COMBAT_STATS, type CombatStat } from '../evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../evaluation/score'
import { calculateBalancedCombatPower } from './calculateCombatPower'

/**
 * v0.1.61 audit: immutable diagnostics, NOT a score amendment.
 * An Evidence ID may support different observed effects, but its reuse
 * does not prove an independent exceptional Haki increment beyond Base.
 */
const defaults = sampleEvaluations.filter(e => e.isDefault !== false)
const evaluation = (id: string) => {
  const found = defaults.find(e => e.characterId === id)
  if (!found) throw new Error('Missing default Evaluation: ' + id)
  return found
}
const axis = (id: string, stat: CombatStat) => {
  const found = evaluation(id).items.find(item => item.stat === stat)
  if (!found) throw new Error('Missing stat: ' + id + '/' + stat)
  return found
}
const cases = [
  ['vista', 'attack', 80, 4, 82, 'E2'],
  ['vista', 'techniqueMastery', 86, 2, 87, 'E1'],
  ['king', 'attack', 83, 0, 83, 'E2'],
  ['king', 'techniqueMastery', 80, 0, 80, 'E2'],
  ['jinbe', 'attack', 76, 0, 76, 'E2'],
  ['jinbe', 'defense', 78, 4, 80, 'E1'],
  ['katakuri', 'defense', 81, 6, 84, 'E2'],
  ['katakuri', 'techniqueMastery', 84, 6, 87, 'E2'],
  ['katakuri', 'combatIQ', 82, 0, 82, 'E2'],
  ['shanks', 'attack', 94, 6, 97, 'E2'],
  ['shanks', 'techniqueMastery', 92, 8, 96, 'E2'],
  ['shanks', 'combatIQ', 91, 4, 93, 'E2'],
] as const

const eventCases = [
  ['vista', 'evidence-vista-armament-akainu-574', ['attack', 'techniqueMastery']],
  ['king', 'evidence-king-armament-1032', ['attack', 'techniqueMastery']],
  ['jinbe', 'evidence-jinbe-whos-who-1018', ['attack', 'defense']],
  ['katakuri', 'evidence-katakuri-future-sight-881-884', ['defense', 'techniqueMastery', 'combatIQ']],
  ['shanks', 'evidence-shanks-kid-divine-departure-1079', ['attack', 'techniqueMastery', 'combatIQ']],
] as const

describe('v0.1.61 source-trace guards reconciled to approved v0.1.62 targeted recalibration', () => {
  it('pins all twelve audited axes with their existing Base/Raw/Final and readiness', () => {
    for (const [id, stat, base, raw, final, readiness] of cases) {
      const item = axis(id, stat)
      expect(item.baseScore).toBe(base)
      expect(getRawHakiContributionTotal(item)).toBe(raw)
      expect(item.score).toBe(final)
      expect(item.readiness).toBe(readiness)
      expect(getFinalStatScore(item, balancedV12.configuration.hakiWeight)).toBe(final)
    }
  })

  it('preserves Evidence provenance and distinguishes a linked stat role from independent Raw proof', () => {
    for (const [id, evidenceId, stats] of eventCases) {
      const evidence = sampleEvidence.find(e => e.id === evidenceId)
      expect(evidence, evidenceId).toBeDefined()
      expect(evidence?.subjectCharacterId).toBe(id)
      expect(evidence?.source.type).toBe('canon')
      for (const stat of stats) {
        const item = axis(id, stat)
        expect(item.evidenceIds).toContain(evidenceId)
        const adjusted = (id === 'king' && (stat === 'attack' || stat === 'techniqueMastery'))
          || (id === 'jinbe' && stat === 'attack')
          || (id === 'katakuri' && stat === 'combatIQ')
        expect(item.hakiContributions.some(h => h.amount > 0 && h.evidenceIds.includes(evidenceId))).toBe(!adjusted)
        expect(evidence?.statContributions.some(contribution =>
          contribution.stat === stat && contribution.role !== 'context')).toBe(true)
      }
    }
    const jinbeDef = axis('jinbe', 'defense')
    expect(jinbeDef.hakiContributions[0].evidenceIds).toContain('evidence-jinbe-big-mom-890')
    // Two different Haki types share a SINGLE Shanks Technique event:
    // neither the number of types nor the shared ID guarantees two independent increments.
    const shanksTechnique = axis('shanks', 'techniqueMastery').hakiContributions
    expect(shanksTechnique.map(h => h.hakiType).sort()).toEqual(['conquerors', 'observation'])
    expect(shanksTechnique.map(h => h.amount).sort((a,b) => a-b)).toEqual([4, 4])
    expect(shanksTechnique.every(h => h.evidenceIds.includes('evidence-shanks-kid-divine-departure-1079'))).toBe(true)
  })

  it('checks comparison anchors without presuming that ordinary Armament earns exceptional Raw', () => {
    expect(axis('marco', 'attack').baseScore).toBe(76)
    expect(getRawHakiContributionTotal(axis('marco', 'attack'))).toBe(2)
    expect(axis('mihawk', 'techniqueMastery').score).toBe(99)
    expect(getRawHakiContributionTotal(axis('mihawk', 'techniqueMastery'))).toBe(0)
    expect(axis('zoro', 'combatIQ').score).toBe(82)
    expect(getRawHakiContributionTotal(axis('zoro', 'combatIQ'))).toBe(0)
    expect(axis('kaido', 'defense').score).toBe(100)
  })

  it('keeps Vista and Shanks production scores while their upward-only evidence candidates remain unresolved', () => {
    expect(calculateBalancedCombatPower(evaluation('vista'), balancedV12).finalScore).toBeCloseTo(556 / 7, 10)
    expect(calculateBalancedCombatPower(evaluation('shanks'), balancedV12).finalScore).toBeCloseTo(648 / 7, 10)
    expect(axis('vista', 'attack').score).toBe(82)
    expect(axis('shanks', 'attack').score).toBe(97)
  })

  it('retains full production data/model and direct matchup invariants', () => {
    expect(COMBAT_STATS).toHaveLength(7)
    expect(defaults).toHaveLength(59)
    expect(defaults.flatMap(e => e.items)).toHaveLength(413)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(defaults.flatMap(e => e.items).filter(i => i.readiness === 'E1')).toHaveLength(53)
    expect(defaults.flatMap(e => e.items).filter(i => i.readiness === 'E2')).toHaveLength(243)
    expect(defaults.flatMap(e => e.items).filter(i => i.readiness === 'E3')).toHaveLength(117)
    expect(defaults.flatMap(e => e.items).reduce((v, i) => v + getRawHakiContributionTotal(i), 0)).toBe(212)
    expect(sampleEvaluations.flatMap(e => e.items).reduce((v, i) => v + getRawHakiContributionTotal(i), 0)).toBe(230)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleMatchups).toHaveLength(15)
    for (const e of defaults) {
      expect(calculateBalancedCombatPower(e, balancedV12).finalScore)
        .toBeCloseTo(e.items.reduce((v, i) => v + i.score, 0) / 7, 10)
    }
  })
})
