import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleMatchups } from './matchups'
import { getCombatPower } from '../../application/getCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import type { CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'

const newRatings: Record<string, Partial<Record<CombatStat, EvidenceReadiness>>> = {
  cracker: { attack: 'E2', defense: 'E2', stamina: 'E2', techniqueMastery: 'E2', versatility: 'E2' },
  law: { attack: 'E1', defense: 'E2', stamina: 'E2', speed: 'E3',
    techniqueMastery: 'E1', combatIQ: 'E1', versatility: 'E1' },
  doflamingo: { attack: 'E2', defense: 'E2', stamina: 'E2', speed: 'E2',
    techniqueMastery: 'E1', combatIQ: 'E2', versatility: 'E1' },
  jinbe: { attack: 'E2', defense: 'E1', stamina: 'E1',
    techniqueMastery: 'E1', combatIQ: 'E2', versatility: 'E2' },
  shanks: { attack: 'E2', defense: 'E2', speed: 'E3',
    techniqueMastery: 'E2', combatIQ: 'E2', versatility: 'E2' },
}
const defaults = sampleEvaluations.filter((evaluation) => evaluation.isDefault !== false)
const byId = (id: string) => defaults.find((evaluation) => evaluation.characterId === id)!
const item = (id: string, stat: CombatStat) => byId(id).items.find((row) => row.stat === stat)!

describe('v0.1.55 five-character canon-readiness review', () => {
  it('records 31 manually evaluated axes, including high-score uncertainty without score cuts', () => {
    expect(Object.values(newRatings).reduce((sum, roles) => sum + Object.keys(roles).length, 0)).toBe(31)
    const examined: string[] = []
    for (const [id, roles] of Object.entries(newRatings)) {
      for (const [stat, expected] of Object.entries(roles)) {
        const axis = item(id, stat as CombatStat)
        expect(axis.readiness, id + ':' + stat).toBe(expected)
        expect(axis.evidenceIds.length, id + ':' + stat).toBeGreaterThan(0)
        examined.push(id + ':' + stat)
      }
    }
    expect(new Set(examined).size).toBe(31)
    expect(defaults).toHaveLength(59)
    const counts = { E1: 0, E2: 0, E3: 0, unset: 0 }
    const all = defaults.flatMap((evaluation) => evaluation.items)
    expect(all).toHaveLength(413)
    for (const stat of all) {
      if (stat.readiness) counts[stat.readiness]++
      else counts.unset++
    }
    expect(counts).toEqual({ E1: 43, E2: 208, E3: 111, unset: 51 })
    expect(item('law', 'speed').score).toBe(82)
    expect(item('shanks', 'speed').score).toBe(95)
    expect(item('law', 'speed').readiness).toBe('E3')
    expect(item('shanks', 'speed').readiness).toBe('E3')
  })

  it('traces each critical conclusion to existing Evidence and keeps mixed battles contextual', () => {
    const evidence = new Map(sampleEvidence.map((source) => [source.id, source]))
    expect(evidence.size).toBe(sampleEvidence.length)
    const role = (id: string, stat: CombatStat) => evidence.get(id)
      ?.statContributions.find((contribution) => contribution.stat === stat)?.role
    expect(role('evidence-cracker-long-battle-842', 'stamina')).toBe('primary')
    expect(role('evidence-law-puncture-wille-1039', 'attack')).toBe('primary')
    expect(role('evidence-law-big-mom-1039', 'attack')).toBe('primary')
    expect(role('evidence-law-doflamingo-gamma-knife-781', 'combatIQ')).toBe('primary')
    expect(role('evidence-jinbe-ace-five-days-552', 'stamina')).toBe('primary')
    expect(role('evidence-jinbe-big-mom-890', 'defense')).toBe('primary')
    expect(role('evidence-jinbe-whos-who-1018', 'defense')).toBe('primary')
    expect(role('evidence-doflamingo-awakening-785', 'techniqueMastery')).toBe('primary')
    expect(role('evidence-shanks-kid-divine-departure-1079', 'attack')).toBe('primary')
    expect(role('evidence-shanks-kid-divine-departure-1079', 'speed')).toBe('secondary')
    expect(evidence.get('evidence-shanks-kid-divine-departure-1079')?.uncertainty).toBeTruthy()
    // Speed is not equivalent to teleportation or to prior Observation-Haki foreknowledge.
    expect(item('law', 'speed').rationale).toContain('순수 신체')
    expect(item('shanks', 'speed').rationale).toContain('미래예지')
    const noLinks = defaults.flatMap((evaluation) => evaluation.items.filter((stat) =>
      !stat.readiness && stat.evidenceIds.length === 0))
    expect(noLinks).toHaveLength(0)
  })

  it('preserves source-of-truth Final vectors, Overall means, historical revisions and Haki', () => {
    const finalVectors = [
      ['cracker', [77, 81, 80, 75, 80, 75, 77]],
      ['law', [86, 83, 85, 82, 90, 88, 91]],
      ['doflamingo', [76, 74, 81, 75, 87, 81, 83]],
      ['jinbe', [78, 80, 80, 77, 83, 80, 79]],
      ['shanks', [97, 91, 88, 95, 96, 93, 88]],
    ] as const
    for (const [id, stats] of finalVectors) {
      expect(byId(id).items.map((stat) => stat.score), id).toEqual(stats)
      const expected = stats.reduce((sum, stat) => sum + stat, 0) / 7
      expect(getCombatPower(id).finalScore, id).toBeCloseTo(expected, 9)
    }
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)).toHaveLength(434)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)
      .reduce((sum, stat) => sum + getRawHakiContributionTotal(stat), 0)).toBe(244)
    expect(sampleMatchups).toHaveLength(15)
  })
})
