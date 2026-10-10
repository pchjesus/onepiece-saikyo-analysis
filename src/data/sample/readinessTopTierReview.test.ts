import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleMatchups } from './matchups'
import { getCombatPower } from '../../application/getCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import type { CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'

const newReadiness: Record<string, Partial<Record<CombatStat, EvidenceReadiness>>> = {
  garp: { attack: 'E2', defense: 'E2', stamina: 'E3', speed: 'E3',
    techniqueMastery: 'E2', combatIQ: 'E3', versatility: 'E3' },
  teach: { attack: 'E2', defense: 'E2', stamina: 'E2',
    techniqueMastery: 'E2', combatIQ: 'E2', versatility: 'E1' },
  kuzan: { attack: 'E2', defense: 'E2', stamina: 'E1', speed: 'E2', techniqueMastery: 'E2' },
  kizaru: { defense: 'E2', stamina: 'E2', speed: 'E1',
    techniqueMastery: 'E2', combatIQ: 'E2', versatility: 'E2' },
  mihawk: { attack: 'E2', speed: 'E3', techniqueMastery: 'E1',
    combatIQ: 'E3', versatility: 'E2' },
}
const defaults = sampleEvaluations.filter((evaluation) => evaluation.isDefault !== false)
const item = (id: string, stat: CombatStat) => defaults
  .find((evaluation) => evaluation.characterId === id)?.items.find((statItem) => statItem.stat === stat)

describe('v0.1.56 top-tier combat-context readiness audit', () => {
  it('labels exactly 29 previously unclassified axes without modifying score or inventing Evidence links', () => {
    const allReviewed: string[] = []
    for (const [id, axes] of Object.entries(newReadiness)) {
      for (const [stat, readiness] of Object.entries(axes)) {
        const selected = item(id, stat as CombatStat)
        expect(selected?.readiness, id + ':' + stat).toBe(readiness)
        expect(selected?.evidenceIds.length, id + ':' + stat).toBeGreaterThan(0)
        allReviewed.push(id + ':' + stat)
      }
    }
    expect(allReviewed).toHaveLength(29)
    expect(new Set(allReviewed).size).toBe(29)
    expect(defaults).toHaveLength(59)
    const axes = defaults.flatMap((evaluation) => evaluation.items)
    expect(axes).toHaveLength(413)
    const count = { E1: 0, E2: 0, E3: 0, missing: 0 }
    for (const axis of axes) if (axis.readiness) count[axis.readiness]++
    else count.missing++
    expect(count).toEqual({ E1: 53, E2: 243, E3: 117, missing: 0 })
  })

  it('retains era separation and multi-party fight caveats', () => {
    const prime = defaults.find((x) => x.characterId === 'garp')!
    expect(prime.subjectState?.id).toBe('prime')
    expect(prime.subjectState?.note).toContain('노년')
    for (const stat of ['stamina', 'speed', 'combatIQ', 'versatility'] as const) {
      expect(item('garp', stat)?.readiness).toBe('E3')
    }
    expect(item('garp', 'stamina')?.score).toBe(99)
    expect(item('garp', 'speed')?.score).toBe(98)
    expect(item('mihawk', 'speed')?.score).toBe(94)
    expect(item('mihawk', 'speed')?.readiness).toBe('E3')
    expect(item('kuzan', 'stamina')?.evidenceIds).toContain('evidence-kuzan-sakazuki-duel-650')
    expect(item('kizaru', 'speed')?.evidenceIds).toContain('evidence-kizaru-luffy-clones-1093')
    expect(item('teach', 'versatility')?.evidenceIds).toContain('evidence-teach-ace-440-441')
  })

  it('keeps all existing source records, Haki, Matchup and Final score vectors', () => {
    const evidenceById = new Map(sampleEvidence.map((record) => [record.id, record]))
    expect(evidenceById.size).toBe(sampleEvidence.length)
    const garpGodValley = evidenceById.get('evidence-garp-roger-rocks-1165')!
    expect(garpGodValley.uncertainty).toMatch(/공동/)
    expect(garpGodValley.subjectCharacterId).toBe('garp')
    const kuzanDuel = evidenceById.get('evidence-kuzan-sakazuki-duel-650')!
    expect(kuzanDuel.statContributions.find((v) => v.stat === 'stamina')?.role).toBe('primary')
    const kizaruSpeed = evidenceById.get('evidence-kizaru-luffy-clones-1093')!
    expect(kizaruSpeed.statContributions.find((v) => v.stat === 'speed')?.role).toBe('primary')
    const mihawkTech = evidenceById.get('evidence-mihawk-shanks-swordskill-1058')!
    expect(mihawkTech.statContributions.find((v) => v.stat === 'techniqueMastery')?.role).toBe('primary')
    const vectors = [
      ['garp', [99, 99, 99, 98, 99, 97, 91]],
      ['teach', [95, 89, 95, 82, 93, 87, 93]],
      ['kuzan', [93, 93, 97, 90, 93, 91, 92]],
      ['kizaru', [92, 89, 91, 99, 93, 90, 91]],
      ['mihawk', [96, 93, 91, 94, 99, 92, 84]],
    ] as const
    for (const [id, final] of vectors) {
      const evaluation = defaults.find((x) => x.characterId === id)!
      expect(evaluation.items.map((axis) => axis.score), id).toEqual(final)
      expect(getCombatPower(id).finalScore, id)
        .toBeCloseTo(final.reduce((sum, value) => sum + value, 0) / 7, 9)
    }
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)).toHaveLength(434)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)
      .reduce((sum, stat) => sum + getRawHakiContributionTotal(stat), 0)).toBe(230)
    expect(sampleMatchups).toHaveLength(15)
  })

  it('has zero still-unclassified default axes at v0.1.57', () => {
    const byEvidence = new Map(sampleEvidence.map((record) => [record.id, record]))
    const unresolved = defaults.flatMap((evaluation) =>
      evaluation.items.filter((axis) => !axis.readiness))
    expect(unresolved).toHaveLength(0)
    const roles = { primary: 0, secondary: 0 }
    for (const axis of unresolved) {
      const contributions = axis.evidenceIds.flatMap((id) =>
        byEvidence.get(id)?.statContributions
          .filter((contribution) => contribution.stat === axis.stat)
          .map((contribution) => contribution.role) ?? [])
      if (contributions.includes('primary')) roles.primary++
      else if (contributions.includes('secondary')) roles.secondary++
      else throw new Error('Unreviewed stat lacks explicit supporting role: ' + axis.stat)
    }
    expect(roles).toEqual({ primary: 0, secondary: 0 })
  })
})
