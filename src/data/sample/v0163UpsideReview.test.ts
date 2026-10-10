import { describe, expect, it } from 'vitest'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleCharacters } from './characters'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { v0163UpsideAxisReviews, v0163UnresolvedHakiOverlaps } from './v0163UpsideReview'

const defaults = sampleEvaluations.filter(e => e.isDefault !== false)
const evaluated = (id: string) => {
  const e = defaults.find(evaluation => evaluation.characterId === id)
  if (!e) throw new Error('Missing default evaluation for ' + id)
  return e
}
const row = (id: string, stat: string) => {
  const item = evaluated(id).items.find(item => item.stat === stat)
  if (!item) throw new Error('Missing stat: ' + id + '/' + stat)
  return item
}

describe('v0.1.63 full seven-axis upside and Haki independent-effect review (read-only)', () => {
  it('reviews all seven Vista and Shanks axes exactly once with source-owner and stat-specific peer anchors', () => {
    expect(v0163UpsideAxisReviews).toHaveLength(14)
    const unique = new Set<string>()
    for (const review of v0163UpsideAxisReviews) {
      const key = review.characterId + '::' + review.stat
      expect(unique.has(key), key).toBe(false)
      unique.add(key)
      const item = row(review.characterId, review.stat)
      expect(review.independentObservedEffect.length, key).toBeGreaterThan(20)
      expect(review.constraints.length, key).toBeGreaterThan(20)
      expect(review.approvalGate.length, key).toBeGreaterThan(20)
      expect(review.comparatorIds.length, key).toBeGreaterThan(0)
      for (const id of review.evidenceIds) {
        const evidence = sampleEvidence.find(e => e.id === id)
        expect(evidence, id).toBeDefined()
        expect(evidence?.subjectCharacterId, id).toBe(review.characterId)
        expect(item.evidenceIds, key).toContain(id)
      }
      for (const id of review.comparatorIds) {
        expect(sampleCharacters.some(c => c.id === id), key + ' comparator ' + id).toBe(true)
        expect(evaluated(id).items.some(candidate => candidate.stat === review.stat), key + ' comparator ' + id).toBe(true)
      }
      if (review.finding === 'evidence-too-sparse') {
        expect(item.readiness, key).toBe('E3')
      }
    }
    for (const characterId of ['vista', 'shanks']) {
      expect(v0163UpsideAxisReviews.filter(r => r.characterId === characterId).map(r => r.stat).sort())
        .toEqual([...COMBAT_STATS].sort())
    }
  })

  it('identifies Vista non-Technique uplift candidates without mistaking missing evidence for weakness', () => {
    const candidates = v0163UpsideAxisReviews
      .filter(r => r.characterId === 'vista' && r.finding === 'promising-but-unquantified')
      .map(r => r.stat)
    expect(candidates).toEqual(['attack', 'defense', 'speed', 'techniqueMastery', 'combatIQ', 'versatility'])
    expect(v0163UpsideAxisReviews.find(r => r.characterId === 'vista' && r.stat === 'stamina')?.finding)
      .toBe('evidence-too-sparse')
    const priority = v0163UpsideAxisReviews.filter(r => r.characterId === 'vista' && r.priority === 'high')
    expect(priority.map(r => r.stat)).toEqual(['techniqueMastery'])
    expect(row('vista', 'techniqueMastery').score).toBe(87)
    expect(row('mihawk', 'techniqueMastery').score).toBe(99)
    expect(row('zoro', 'techniqueMastery').score).toBe(87)
    expect(row('vista', 'defense').score).toBe(79)
    expect(row('vista', 'stamina').readiness).toBe('E3')
    expect(row('vista', 'speed').readiness).toBe('E3')
    expect(row('vista', 'combatIQ').readiness).toBe('E3')
    // A high-ranked peer or famous opponent is a comparison anchor, NOT an additive formula.
  })

  it('keeps the unresolved dual-source Haki cases exact, without mistaking review approval for Raw modification', () => {
    expect(v0163UnresolvedHakiOverlaps).toHaveLength(4)
    const expected = [
      ['vista', 'evidence-vista-armament-akainu-574', ['attack', 'techniqueMastery'], [4, 2]],
      ['shanks', 'evidence-shanks-kid-divine-departure-1079', ['attack', 'techniqueMastery', 'combatIQ'], [6, 8, 4]],
      ['katakuri', 'evidence-katakuri-future-sight-881-884', ['defense', 'techniqueMastery'], [6, 6]],
      ['jinbe', 'evidence-jinbe-whos-who-1018', ['defense'], [4]],
    ] as const
    for (let i = 0; i < expected.length; i++) {
      const [id, evidenceId, stats, amounts] = expected[i]
      const review = v0163UnresolvedHakiOverlaps[i]
      expect(review.characterId).toBe(id)
      expect(review.evidenceId).toBe(evidenceId)
      expect(review.evaluatedStats).toEqual(stats)
      expect(review.decision).toBe('retain-and-require-distinct-effect')
      expect(review.reason.length).toBeGreaterThan(30)
      expect(review.remainingQuestion.length).toBeGreaterThan(30)
      for (let k = 0; k < stats.length; k++) {
        const item = row(id, stats[k])
        expect(item.evidenceIds).toContain(evidenceId)
        const contributions = item.hakiContributions.filter(h => h.evidenceIds.includes(evidenceId))
        expect(contributions.reduce((sum, h) => sum + h.amount, 0)).toBe(amounts[k])
      }
    }
    expect(row('jinbe', 'attack').hakiContributions).toHaveLength(0)
    expect(row('katakuri', 'combatIQ').hakiContributions).toHaveLength(0)
  })

  it('protects complete v0.1.62 original score source and all derived results against this documentation-only release', () => {
    expect(evaluated('vista').evaluationDataVersion).toBe('evaluation-0.1.26-draft')
    expect(evaluated('shanks').evaluationDataVersion).toBe('evaluation-0.1.26-draft')
    expect(evaluated('vista').items.map(item => item.score)).toEqual([82, 79, 77, 80, 87, 77, 74])
    expect(evaluated('shanks').items.map(item => item.score)).toEqual([97, 91, 88, 95, 96, 93, 88])
    expect(calculateBalancedCombatPower(evaluated('vista'), balancedV12).finalScore).toBeCloseTo(556 / 7, 10)
    expect(calculateBalancedCombatPower(evaluated('shanks'), balancedV12).finalScore).toBeCloseTo(648 / 7, 10)
    expect(evaluated('jinbe').items.map(item => item.score)).toEqual([76, 80, 80, 77, 83, 80, 79])
    expect(evaluated('katakuri').items.map(item => item.score)).toEqual([83, 84, 84, 84, 87, 82, 84])
    expect(defaults).toHaveLength(59)
    expect(defaults.flatMap(e => e.items)).toHaveLength(413)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(defaults.flatMap(e => e.items).filter(item => item.readiness === 'E1')).toHaveLength(53)
    expect(defaults.flatMap(e => e.items).filter(item => item.readiness === 'E2')).toHaveLength(243)
    expect(defaults.flatMap(e => e.items).filter(item => item.readiness === 'E3')).toHaveLength(117)
    expect(defaults.flatMap(e => e.items).reduce((sum, item) => sum + getRawHakiContributionTotal(item), 0)).toBe(212)
    expect(sampleEvaluations.flatMap(e => e.items).reduce((sum, item) => sum + getRawHakiContributionTotal(item), 0)).toBe(230)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(row('kaido', 'defense').score).toBe(100)
    expect(sampleMatchups).toHaveLength(15)
    for (const evaluation of defaults) {
      expect(calculateBalancedCombatPower(evaluation, balancedV12).finalScore)
        .toBeCloseTo(evaluation.items.reduce((sum, item) => sum + item.score, 0) / 7, 10)
    }
  })
})
