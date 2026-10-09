import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleMatchups } from './matchups'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { getCombatPower } from '../../application/getCombatPower'

const defaults = sampleEvaluations.filter((evaluation) => evaluation.isDefault !== false)
const getStat = (id: string, stat: string) => defaults.find((evaluation) => evaluation.characterId === id)
  ?.items.find((item) => item.stat === stat)

describe('v0.1.51 readiness metadata and unresolved-evidence diagnostic', () => {
  it('restores three already stated E2 assessments without changing any Final Stats', () => {
    expect(getStat('shiryu', 'stamina')?.readiness).toBe('E2')
    expect(getStat('van-augur', 'stamina')?.readiness).toBe('E2')
    expect(getStat('mihawk', 'defense')?.readiness).toBe('E2')
    for (const [id, stat] of [['shiryu', 'stamina'], ['van-augur', 'stamina'], ['mihawk', 'defense']]) {
      const item = getStat(id, stat)!
      expect(item.rationale).toContain('E2')
    }
    expect(getStat('shiryu', 'stamina')?.score).toBe(75)
    expect(getStat('van-augur', 'stamina')?.score).toBe(68)
    expect(getStat('mihawk', 'defense')?.score).toBe(93)
    expect(getCombatPower('shiryu').finalScore).toBeCloseTo(77.14285714285714, 9)
    expect(getCombatPower('mihawk').finalScore).toBeCloseTo(92.71428571428571, 9)
  })

  it('retains missing-readiness uncertainty rather than silently setting all unclassified axes to E3', () => {
    expect(defaults).toHaveLength(59)
    const all = defaults.flatMap((evaluation) => evaluation.items)
    expect(all).toHaveLength(413)
    const counts = { E1: 0, E2: 0, E3: 0, missing: 0 }
    for (const item of all) {
      if (item.readiness) counts[item.readiness] += 1
      else {
        counts.missing++
        // Existing explanation and actual metadata must not contradict each other.
        expect(item.rationale).not.toMatch(/\bE[123]\b/)
      }
    }
    expect(counts).toEqual({ E1: 30, E2: 169, E3: 103, missing: 111 })
    const unlinked = defaults.flatMap((evaluation) => evaluation.items.filter((item) =>
      !item.readiness && item.evidenceIds.length === 0).map((item) => `${evaluation.characterId}:${item.stat}`))
    expect(unlinked).toEqual([]) // all ten previously zero-link axes have been reviewed; three remain E3 with intentionally absent direct evidence
    expect(new Set(unlinked).size).toBe(unlinked.length)
    const evidenceIds = new Set(sampleEvidence.map((evidence) => evidence.id))
    for (const evaluation of defaults) for (const item of evaluation.items) {
      for (const evidenceId of item.evidenceIds) expect(evidenceIds.has(evidenceId)).toBe(true)
    }
  })

  it('preserves data size, Haki and matchup records', () => {
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)).toHaveLength(434)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)
      .reduce((sum, item) => sum + getRawHakiContributionTotal(item), 0)).toBe(244)
    expect(sampleMatchups).toHaveLength(15)
  })
})
