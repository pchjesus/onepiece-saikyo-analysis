import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'

/**
 * Read-only semantic audit guard.
 * These historical multi-stat evidence uses require independent justification.
 * A reviewed baseline is NOT a finding that the allocations are correct.
 *
 * If a new shared-Evidence allocation is added, first review whether its
 * fact, target-stat outcome, Base exclusion and Raw contribution are distinct.
 */
const REVIEW_REQUIRED_SHARED_EVIDENCE = [
  'evaluation-vista::evidence-vista-armament-akainu-574',
  'evaluation-shanks::evidence-shanks-kid-divine-departure-1079',
  'evaluation-zoro::evidence-zoro-conquerors-1033-1035',
  'evaluation-king::evidence-king-armament-1032',
  'evaluation-katakuri::evidence-katakuri-future-sight-881-884',
  'evaluation-jinbe::evidence-jinbe-whos-who-1018',
  'evaluation-garp::evidence-garp-roger-rocks-1165',
  'evaluation-kuzan::evidence-kuzan-garp-haki-clash-1087',
  'evaluation-roger::evidence-roger-haki-analysis-rocks-1165',
  'evaluation-rayleigh-current::evidence-rayleigh-haki-training-597',
  'evaluation-rocks::evidence-rocks-harald-1155',
  'evaluation-newgate-prime::evidence-newgate-roger-966',
  'evaluation-kaido::evidence-kaido-zoro-luffy-1010',
  'evaluation-kaido::evidence-kaido-future-sight-1042',
  'evaluation-linlin::evidence-linlin-pageone-1011',
].sort()

describe('Haki semantic allocation review gate (read-only)', () => {
  it('detects every multi-stat Haki Evidence reuse and fails on newly unreviewed cases', () => {
    const shared: string[] = []
    for (const evaluation of sampleEvaluations) {
      const statsByEvidence = new Map<string, Set<string>>()
      for (const item of evaluation.items) {
        for (const contribution of item.hakiContributions) {
          if (contribution.amount <= 0) continue
          for (const evidenceId of contribution.evidenceIds) {
            const stats = statsByEvidence.get(evidenceId) ?? new Set<string>()
            stats.add(item.stat)
            statsByEvidence.set(evidenceId, stats)
          }
        }
      }
      for (const [evidenceId, stats] of statsByEvidence) {
        if (stats.size > 1) shared.push(`${evaluation.id}::${evidenceId}`)
      }
    }

    expect(shared.sort()).toEqual(REVIEW_REQUIRED_SHARED_EVIDENCE)
  })

  it('preserves previously audited Raw allocation totals without silently revising any score', () => {
    const statRows = sampleEvaluations.flatMap((evaluation) => evaluation.items)
    const positive = statRows.filter((item) => item.hakiContributions.some((contribution) => contribution.amount > 0))
    const contributions = statRows.flatMap((item) => item.hakiContributions)
      .filter((contribution) => contribution.amount > 0)
    expect(sampleEvaluations).toHaveLength(39)
    expect(statRows).toHaveLength(273)
    expect(positive).toHaveLength(51)
    expect(contributions).toHaveLength(53)
    expect(contributions.reduce((sum, contribution) => sum + contribution.amount, 0)).toBe(256)
  })
})
