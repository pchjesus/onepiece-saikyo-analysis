// @vitest-environment node
import { describe, expect, it } from 'vitest'
import review from '../../../docs/reviews/full-roster-v050-review1.json'
import { buildV050ReadOnlyAudit, v050CurrentDataset } from './v050ReadOnlyAudit'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { getStatRanking, getHighestOverallStateIds, type RankingStat } from '../../application/getStatRanking'
import { getMatchupHubEntries } from '../../application/getMatchupHub'
import { getCharacterMatchups } from '../../application/getCharacterMatchups'
import { charlosMemeStats, charlosSpecialOverall } from '../special/charlosSpecial'

const sha256 = async (value: unknown) => {
  const bytes = new TextEncoder().encode(JSON.stringify(value))
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
}

// A fixed editorial decision record, tied to the reviewed source. A source change
// requires examining its affected decisions instead of silently marking new data reviewed.
describe('integrated roster review 0.5.0-review.1', () => {
  it('covers every current repository Evaluation and all seven distinct axes exactly once', () => {
    const live = v050CurrentDataset
    const repositoryEvaluations = live.characters.flatMap(character =>
      evaluationRepository.getEvaluations(character.id))
    expect(repositoryEvaluations).toHaveLength(88)
    expect(new Set(repositoryEvaluations.map(e => e.id)).size).toBe(88)
    for (const evaluation of repositoryEvaluations) {
      expect(live.evaluations.find(e => e.id === evaluation.id)).toEqual(evaluation)
      const decisions = review.axes.filter(row => row.evaluationId === evaluation.id)
      expect(decisions.map(row => row.stat).sort()).toEqual([...COMBAT_STATS].sort())
      const notes = review.evaluations.filter(row => row.evaluationId === evaluation.id)
      expect(notes).toHaveLength(1)
      expect(notes[0].reviewNote.length).toBeGreaterThan(30)
    }
    expect(review.axes).toHaveLength(616)
    expect(review.evaluations).toHaveLength(88)
  })

  it('preserves all reviewed inputs, provenance, conditions, revisions and model parameters', async () => {
    expect(await sha256(v050CurrentDataset)).toBe(review.sourceSha256)
    const report = buildV050ReadOnlyAudit()
    expect(report.counts).toEqual(review.scope)
    expect(report.integrity).toEqual(review.integrity)
    expect(report.integrity.errors).toEqual([])
    expect(report.integrity.warnings).toHaveLength(13)
    expect(report.readiness).toEqual({ E1: 69, E2: 353, E3: 194, unclassified: 0 })
  })

  it('reconciles all decisions with Base, Raw, Final, readiness and unrounded Overall', () => {
    const model = v050CurrentDataset.model
    const counts = { change: 0, retain: 0, defer: 0 }
    for (const row of review.axes) {
      expect(['retain', 'defer']).toContain(row.decision)
      counts[row.decision as 'retain' | 'defer']++
      expect(row.after).toEqual(row.before)
      const evaluation = evaluationRepository.getEvaluations(
        v050CurrentDataset.evaluations.find(e => e.id === row.evaluationId)!.characterId,
      ).find(e => e.id === row.evaluationId)!
      const item = evaluation.items.find(entry => entry.stat === row.stat)!
      expect(row.after).toEqual({
        base: item.baseScore,
        rawHaki: getRawHakiContributionTotal(item),
        final: getFinalStatScore(item, model.configuration.hakiWeight),
        readiness: item.readiness,
      })
      expect(row.evidenceIds).toEqual(item.evidenceIds)
      expect(row.reason.length).toBeGreaterThan(20)
      if (item.readiness === 'E3' || getRawHakiContributionTotal(item) > 0) {
        expect(row.decision).toBe('defer')
      }
      const decision = review.evaluations.find(e => e.evaluationId === evaluation.id)!
      expect(decision.overallAfter).toBe(decision.overallBefore)
      expect(decision.overallAfter).toBe(
        calculateBalancedCombatPower(evaluation, model, '2000-01-01T00:00:00.000Z').finalScore,
      )
    }
    expect(counts).toEqual(review.decisionCounts)
  })

  it('closes all 63 commander axes and the four explicit pending decisions', () => {
    const ids = ['marco', 'jozu', 'vista', 'king', 'queen', 'jack', 'katakuri', 'smoothie', 'cracker']
    expect(review.axes.filter(row => ids.includes(row.evaluationId.replace('evaluation-', ''))))
      .toHaveLength(63)
    const decision = (characterId: string, stat: string) =>
      review.axes.find(row => row.evaluationId === 'evaluation-' + characterId && row.stat === stat)!
    expect(decision('vista', 'combatIQ').decision).toBe('defer')
    expect(decision('queen', 'techniqueMastery').decision).toBe('retain')
    expect(decision('cracker', 'attack').decision).toBe('defer')
    expect(decision('smoothie', 'attack').decision).toBe('defer')
    expect(review.specialReview.items).toEqual(charlosMemeStats)
    expect(review.specialReview.overall).toBe(charlosSpecialOverall)
  })

  it('preserves all production ranking modes, ties, special inclusion and matchup state routes', async () => {
    const stats: RankingStat[] = ['overall', ...COMBAT_STATS]
    const highestStates = getHighestOverallStateIds()
    const views = {
      rankings: Object.fromEntries(stats.map(stat => [stat, getStatRanking(stat)])),
      highestStateRankings: Object.fromEntries(stats.map(stat => [stat, getStatRanking(stat, highestStates)])),
      matchupHub: getMatchupHubEntries(),
      characterMatchups: v050CurrentDataset.evaluations.map(evaluation => ({
        evaluationId: evaluation.id,
        views: getCharacterMatchups(evaluation.characterId, evaluation.subjectState?.id),
      })),
    }
    // Fingerprint covers the complete returned objects, including names, context,
    // Evidence and state routing. Readable rank tuples are saved for reviewers.
    expect(await sha256(views)).toBe(review.viewsSha256)
    for (const mode of ['rankings', 'highestStateRankings'] as const) {
      for (const stat of stats) {
        expect(views[mode][stat].map(entry => [
          entry.characterId, entry.score, entry.rank,
          entry.subjectStateId ?? null, entry.specialEvaluation ?? false,
        ])).toEqual(review.rankings[mode][stat])
      }
    }
    expect(getStatRanking('overall')).toHaveLength(83)
    expect(getStatRanking('attack')).toHaveLength(82)
    expect(v050CurrentDataset.matchups.map(matchup => matchup.id)).toEqual(review.matchupIds)
    expect(v050CurrentDataset.matchups).toHaveLength(18)
  })
})
