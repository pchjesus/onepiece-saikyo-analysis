import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleMatchups } from './matchups'
import { getCombatPower } from '../../application/getCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import type { EvidenceReadiness, CombatStat } from '../../domain/evaluation/types'

const reviewed: Record<string, Partial<Record<CombatStat, EvidenceReadiness>>> = {
  jozu: {
    attack: 'E2', defense: 'E2', stamina: 'E3', speed: 'E2',
    techniqueMastery: 'E3', combatIQ: 'E3', versatility: 'E3',
  },
  queen: {
    attack: 'E2', defense: 'E2', stamina: 'E2', speed: 'E3',
    techniqueMastery: 'E2', combatIQ: 'E3', versatility: 'E2',
  },
  katakuri: { stamina: 'E2', speed: 'E2', versatility: 'E2' },
}

describe('v0.1.52 manual evidence-readiness audit', () => {
  it('records exactly 17 scene-reviewed axis classifications for Jozu, Queen and Katakuri', () => {
    expect(Object.values(reviewed).reduce((n, axes) => n + Object.keys(axes).length, 0)).toBe(17)
    for (const [characterId, axes] of Object.entries(reviewed)) {
      const evaluation = sampleEvaluations.find((value) => value.characterId === characterId)!
      for (const [stat, readiness] of Object.entries(axes)) {
        const item = evaluation.items.find((candidate) => candidate.stat === stat)!
        expect(item.readiness, `${characterId}:${stat}`).toBe(readiness)
        expect(item.evidenceIds.length, `${characterId}:${stat} retains source links`).toBeGreaterThan(0)
      }
    }
    const defaults = sampleEvaluations.filter((evaluation) => evaluation.isDefault !== false)
    const items = defaults.flatMap((evaluation) => evaluation.items)
    expect(defaults).toHaveLength(59)
    expect(items).toHaveLength(413)
    const distribution = { E1: 0, E2: 0, E3: 0, unset: 0 }
    for (const item of items) {
      if (item.readiness) distribution[item.readiness] += 1
      else distribution.unset += 1
    }
    expect(distribution).toEqual({ E1: 53, E2: 243, E3: 117, unset: 0 })
  })

  it('preserves canonical seven-axis outputs, Raw Haki and matchup count', () => {
    const expected = [
      ['jozu', [78, 84, 78, 79, 74, 75, 74], 77.42857142857143],
      ['queen', [80, 81, 81, 75, 79, 74, 80], 78.57142857142857],
      ['katakuri', [83, 84, 84, 84, 87, 84, 84], 84.28571428571429],
      ['lucci', [80, 77, 82, 82, 83, 68, 74], 78],
    ] as const
    for (const [characterId, finalStats, overall] of expected) {
      const evaluation = sampleEvaluations.find((value) => value.characterId === characterId)!
      expect(evaluation.items.map((item) => item.score), characterId).toEqual(finalStats)
      expect(getCombatPower(characterId).finalScore).toBeCloseTo(overall, 9)
    }
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)).toHaveLength(434)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)
      .reduce((sum, item) => sum + getRawHakiContributionTotal(item), 0)).toBe(244)
    expect(sampleMatchups).toHaveLength(15)
  })

  it('does not promote sparse Lucci and Kaku Combat IQ evidence to a settled rank', () => {
    for (const [id, score] of [['lucci', 68], ['kaku', 72]] as const) {
      const item = sampleEvaluations.find((evaluation) => evaluation.characterId === id)!
        .items.find((candidate) => candidate.stat === 'combatIQ')!
      expect(item.readiness).toBe('E3')
      expect(item.score).toBe(score)
    }
  })
})
