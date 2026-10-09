import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleMatchups } from './matchups'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { getCombatPower } from '../../application/getCombatPower'
import type { CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'

const manualLabels: Record<string, Partial<Record<CombatStat, EvidenceReadiness>>> = {
  smoothie: { speed: 'E3' },
  shanks: { stamina: 'E3' },
  fujitora: { defense: 'E2', stamina: 'E3', speed: 'E2' },
  ryokugyu: { attack: 'E2', stamina: 'E3', speed: 'E3', techniqueMastery: 'E2', versatility: 'E2' },
  marco: { attack: 'E2', defense: 'E1', stamina: 'E2', speed: 'E2',
    techniqueMastery: 'E2', combatIQ: 'E2', versatility: 'E2' },
  king: { attack: 'E2', defense: 'E2', stamina: 'E2', speed: 'E2',
    techniqueMastery: 'E2', combatIQ: 'E3', versatility: 'E2' },
}
const newSourceIds = ['evidence-fujitora-luffy-exchange-tv743',
  'evidence-aramaki-scabbards-tv1081', 'evidence-aramaki-regrowth-tv1082']

const get = (characterId: string, stat: CombatStat) => sampleEvaluations
  .find((evaluation) => evaluation.characterId === characterId)!
  .items.find((item) => item.stat === stat)!

describe('v0.1.53 role-aware readiness reconciliation', () => {
  it('classifies exactly 24 manually reviewed axes with one repeated-defense E1', () => {
    expect(Object.values(manualLabels).reduce((s, part) => s + Object.keys(part).length, 0)).toBe(24)
    for (const [id, statMap] of Object.entries(manualLabels)) {
      for (const [stat, label] of Object.entries(statMap)) {
        expect(get(id, stat as CombatStat).readiness, id + ':' + stat).toBe(label)
      }
    }
    const states = sampleEvaluations.filter((evaluation) => evaluation.isDefault !== false)
    expect(states).toHaveLength(59)
    const stats = states.flatMap((evaluation) => evaluation.items)
    expect(stats).toHaveLength(413)
    const count = { E1: 0, E2: 0, E3: 0, missing: 0 }
    for (const item of stats) {
      if (item.readiness) count[item.readiness]++
      else count.missing++
    }
    expect(count).toEqual({ E1: 30, E2: 162, E3: 73, missing: 148 })
  })

  it('adds only three official TV supplementary evidence records tied to existing battles', () => {
    const knownBattles = new Set(sampleBattles.map((battle) => battle.id))
    const evidenceIds = new Set(sampleEvidence.map((evidence) => evidence.id))
    expect(evidenceIds.size).toBe(sampleEvidence.length)
    for (const id of newSourceIds) {
      const evidence = sampleEvidence.find((entry) => entry.id === id)!
      expect(evidence.source.type).toBe('supplementary')
      expect(evidence.source.reference).toContain('one-piece.com/anime/')
      expect(evidence.evidenceStrength).toBe('moderate')
      expect(knownBattles.has(evidence.battleId)).toBe(true)
      expect(['fujitora', 'ryokugyu']).toContain(evidence.subjectCharacterId)
      expect(evidence.statContributions.length).toBeGreaterThan(0)
    }
    const fujitora = sampleEvidence.find((evidence) => evidence.id === newSourceIds[0])!
    expect(fujitora.statContributions.find((contrib) => contrib.stat === 'stamina')?.role).toBe('context')
    const aramaki = sampleEvidence.find((evidence) => evidence.id === newSourceIds[2])!
    expect(aramaki.statContributions.find((contrib) => contrib.stat === 'stamina')?.role).toBe('context')
  })

  it('does not mistake context evidence for proven long stamina or fabricate unsupported speed links', () => {
    for (const [id, stat, expected] of [
      ['smoothie', 'speed', 74],
      ['shanks', 'stamina', 88],
      ['ryokugyu', 'speed', 84],
    ] as const) {
      const item = get(id, stat)
      expect(item.readiness).toBe('E3')
      expect(item.evidenceIds).toEqual([])
      expect(item.score).toBe(expected)
    }
    expect(get('fujitora', 'stamina').evidenceIds).toContain(newSourceIds[0])
    expect(get('ryokugyu', 'stamina').evidenceIds).toContain(newSourceIds[1])
    expect(get('ryokugyu', 'stamina').evidenceIds).toContain(newSourceIds[2])
    const reviewedWithoutEvidence = sampleEvaluations.filter((evaluation) => evaluation.isDefault !== false)
      .flatMap((evaluation) => evaluation.items.filter((item) =>
        item.readiness === 'E3' && item.evidenceIds.length === 0)
        .map((item) => evaluation.characterId + ':' + item.stat))
    expect(reviewedWithoutEvidence).toEqual(expect.arrayContaining([
      'smoothie:speed', 'shanks:stamina', 'ryokugyu:speed',
    ]))
  })

  it('preserves Final Stats, overall, Haki Raw, matchups and past evaluations', () => {
    for (const [id, final, overall] of [
      ['marco', [77, 87, 87, 82, 84, 80, 87], 83.42857142857143],
      ['king', [85, 88, 85, 83, 81, 77, 82], 83],
      ['fujitora', [91, 88, 87, 85, 92, 86, 94], 89],
      ['ryokugyu', [90, 89, 89, 84, 87, 82, 92], 87.57142857142857],
      ['shanks', [97, 91, 88, 95, 96, 93, 88], 92.57142857142857],
      ['smoothie', [76, 75, 76, 74, 80, 77, 78], 76.57142857142857],
    ] as const) {
      expect(sampleEvaluations.find((evaluation) => evaluation.characterId === id)!.items
        .map((item) => item.score), id).toEqual(final)
      expect(getCombatPower(id).finalScore, id).toBeCloseTo(overall, 9)
    }
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)).toHaveLength(434)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)
      .reduce((sum, item) => sum + getRawHakiContributionTotal(item), 0)).toBe(244)
    expect(sampleMatchups).toHaveLength(15)
  })
})
