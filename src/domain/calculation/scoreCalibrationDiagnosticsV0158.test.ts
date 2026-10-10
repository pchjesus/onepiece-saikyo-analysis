import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { sampleMatchups } from '../../data/sample/matchups'
import { balancedV12 } from '../../data/sample/calculationModels'
import { calculateBalancedCombatPower } from './calculateCombatPower'
import { COMBAT_STATS, type CombatStat } from '../evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../evaluation/score'

/**
 * v0.1.58 diagnostic only. No new score, model, win-rate, weighting or E3 penalty is introduced.
 * Baselines are deliberately explicit: future authorised numeric edits must update the audit.
 */
const defaults = sampleEvaluations.filter((evaluation) => evaluation.isDefault !== false)
const mean = (values: readonly number[]) => values.reduce((sum, v) => sum + v, 0) / values.length
const profiles = defaults.map((evaluation) => ({
  id: evaluation.characterId,
  evaluation,
  final: COMBAT_STATS.map((stat) => {
    const axis = evaluation.items.find((x) => x.stat === stat)
    if (!axis) throw new Error('Missing stat ' + stat + ' for ' + evaluation.characterId)
    return getFinalStatScore(axis, balancedV12.configuration.hakiWeight)
  }),
}))
const overall = (p: { final: readonly number[] }) => mean(p.final)
const sortedRank = (items: typeof profiles, id: string) =>
  1 + [...items].sort((a, b) => overall(b) - overall(a) || a.id.localeCompare(b.id, 'ko'))
    .findIndex((p) => p.id === id)
/** Pure hypothetical, one FINAL stat at a time; it never mutates stored Evaluation/base/Raw. */
const stress = (id: string, stat: CombatStat, delta: number) => profiles.map((p) =>
  p.id === id
    ? { ...p, final: p.final.map((value, i) =>
      COMBAT_STATS[i] === stat ? Math.max(0, Math.min(100, value + delta)) : value) }
    : p)

describe('v0.1.58 all-roster score calibration and versioned baseline (read-only)', () => {
  it('reproduces all 59×7 Base + Raw×0.5 → capped Final → seven-equal-weight Overall', () => {
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.method).toBe('arithmetic-mean')
    expect(balancedV12.configuration.statCount).toBe(7)
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(profiles).toHaveLength(59)
    expect(new Set(profiles.map((p) => p.id)).size).toBe(59)
    for (const p of profiles) {
      expect(p.evaluation.items).toHaveLength(7)
      for (const item of p.evaluation.items) {
        const expected = Math.min(100, item.baseScore + getRawHakiContributionTotal(item) * 0.5)
        expect(item.score, p.id + ':' + item.stat).toBe(expected)
        expect(getFinalStatScore(item, 0.5), p.id + ':' + item.stat).toBe(expected)
      }
      expect(calculateBalancedCombatPower(p.evaluation, balancedV12).finalScore)
        .toBeCloseTo(overall(p), 10)
    }
    expect(profiles.flatMap((p) => p.evaluation.items)).toHaveLength(413)
    expect(profiles.flatMap((p) => p.evaluation.items).filter((s) => !s.readiness)).toHaveLength(0)
    expect(profiles.flatMap((p) => p.evaluation.items)
      .filter((s) => s.baseScore + getRawHakiContributionTotal(s) * 0.5 > 100)).toHaveLength(0)
  })

  it('keeps current distribution, per-axis evidence density and default/history Haki totals distinct', () => {
    const expected: Array<[CombatStat, number, number, number]> = [
      ['attack', 8, 45, 6],
      ['defense', 6, 36, 17],
      ['stamina', 9, 26, 24],
      ['speed', 5, 22, 32],
      ['techniqueMastery', 13, 41, 5],
      ['combatIQ', 5, 34, 20],
      ['versatility', 7, 39, 13],
    ]
    for (const [stat, e1, e2, e3] of expected) {
      const axes = profiles.map((p) => p.evaluation.items.find((item) => item.stat === stat)!)
      expect(axes.filter((axis) => axis.readiness === 'E1')).toHaveLength(e1)
      expect(axes.filter((axis) => axis.readiness === 'E2')).toHaveLength(e2)
      expect(axes.filter((axis) => axis.readiness === 'E3')).toHaveLength(e3)
    }
    const items = profiles.flatMap((p) => p.evaluation.items)
    expect(items.filter((i) => i.readiness === 'E3' && i.score >= 85)).toHaveLength(14)
    expect(items.filter((i) => i.readiness === 'E3' && i.score >= 90)).toHaveLength(9)
    expect(items.reduce((n, item) => n + getRawHakiContributionTotal(item), 0)).toBe(212)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap((e) => e.items)).toHaveLength(434)
    expect(sampleEvaluations.flatMap((e) => e.items)
      .reduce((n, item) => n + getRawHakiContributionTotal(item), 0)).toBe(230)
    expect(sampleMatchups).toHaveLength(15)
  })

  it('only flags 13 shared Haki Raw evidence events for manual distinct-effect review', () => {
    const reused: Array<{ id: string, evidenceId: string, stats: CombatStat[] }> = []
    for (const profile of profiles) {
      const index = new Map<string, Set<CombatStat>>()
      for (const item of profile.evaluation.items) {
        for (const contribution of item.hakiContributions) {
          for (const id of contribution.evidenceIds) {
            if (!index.has(id)) index.set(id, new Set())
            index.get(id)!.add(item.stat)
          }
        }
      }
      for (const [evidenceId, stats] of index) if (stats.size > 1) {
        reused.push({ id: profile.id, evidenceId, stats: [...stats] })
      }
    }
    expect(reused).toHaveLength(13)
    expect(reused.find((x) => x.id === 'shanks'
      && x.evidenceId === 'evidence-shanks-kid-divine-departure-1079')?.stats)
      .toEqual(['attack', 'techniqueMastery', 'combatIQ'])
    expect(reused.find((x) => x.id === 'garp'
      && x.evidenceId === 'evidence-garp-roger-rocks-1165')?.stats)
      .toEqual(['attack', 'defense', 'techniqueMastery'])
    expect(reused.find((x) => x.id === 'katakuri'
      && x.evidenceId === 'evidence-katakuri-future-sight-881-884')?.stats)
      .toEqual(['defense', 'techniqueMastery', 'combatIQ'])
    // Same reference on several axes is a REVIEW QUEUE, not proof of double counting.
  })

  it('measures rank sensitivity of isolated E3 Final shifts with no persisted numeric changes', () => {
    expect(sortedRank(profiles, 'garp')).toBe(3)
    expect(sortedRank(profiles, 'mihawk')).toBe(9)
    expect(sortedRank(profiles, 'shanks')).toBe(10)
    expect(sortedRank(profiles, 'kuzan')).toBe(8)
    expect(sortedRank(profiles, 'law')).toBe(17)
    const cases: Array<[string, CombatStat, number, number]> = [
      ['garp', 'stamina', -5, 4],
      ['mihawk', 'speed', -5, 13],
      ['shanks', 'speed', -5, 13],
      ['kuzan', 'combatIQ', -5, 13],
      ['law', 'speed', -5, 17],
      ['lucci', 'combatIQ', -5, 41],
      ['queen', 'versatility', -5, 39],
      ['jozu', 'defense', -5, 45],
      ['crocodile', 'speed', -5, 34],
    ]
    for (const [id, stat, delta, rank] of cases) {
      const after = stress(id, stat, delta)
      expect(sortedRank(after, id), id + ':' + stat).toBe(rank)
      expect(overall(after.find((p) => p.id === id)!))
        .toBeCloseTo(overall(profiles.find((p) => p.id === id)!) + delta / 7, 10)
    }
    expect(sortedRank(profiles, 'garp')).toBe(3)
    expect(profiles.find((p) => p.id === 'shanks')!.final[3]).toBe(95)
    expect(profiles.find((p) => p.id === 'mihawk')!.final[3]).toBe(94)
  })

  it('does not convert equal Overall, E-grades or high scoring into certified matchup winners', () => {
    const first = profiles.find((p) => p.id === 'cracker')!
    const second = profiles.find((p) => p.id === 'karasu')!
    expect(overall(first)).toBeCloseTo(overall(second), 10)
    expect(first.final).not.toEqual(second.final)
    const jozu = profiles.find((p) => p.id === 'jozu')!
    expect(jozu.final[1]).toBe(84)
    expect(profiles.find((p) => p.id === 'queen')!.final[6]).toBe(80)
    expect(profiles.find((p) => p.id === 'lucci')!.final[5]).toBe(68)
    // No winner, win probability, new CalculationModel or modified Matchup are generated.
  })
})
