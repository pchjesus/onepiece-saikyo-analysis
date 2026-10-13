import { sampleCharacters } from '../sample/characters'
import { sampleGroups } from '../sample/groups'
import { sampleMemberships } from '../sample/memberships'
import { sampleBattles, sampleBattleParticipants } from '../sample/battles'
import { sampleEvidence } from '../sample/evidence'
import { sampleEvaluations } from '../sample/evaluations'
import { sampleMatchups } from '../sample/matchups'
import { balancedV12 } from '../sample/calculationModels'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getRawHakiContributionTotal, getFinalStatScore } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { versionManifest } from './versionManifest'

export const liveDataset = {
  characters: sampleCharacters,
  groups: sampleGroups,
  memberships: sampleMemberships,
  battles: sampleBattles,
  participants: sampleBattleParticipants,
  evidence: sampleEvidence,
  evaluations: sampleEvaluations,
  model: balancedV12,
  matchups: sampleMatchups,
}

/**
 * Capture ONLY in the one-time baseline bootstrap. The committed JSON is
 * historical data; this factory intentionally reads live data for comparison.
 * No calculation timestamp, runtime date, browser state or mutable cache.
 */
export function createV033Snapshot() {
  // Backward-compatible factory name. After v0.3.3, the live comparison fixture
  // must advertise its NEW version and may not pretend to be the frozen commit.
  const isOriginalV033 = (versionManifest.coreDataVersion as string) === 'core-v0.3.3'
  const weight = balancedV12.configuration.hakiWeight
  const evaluations = sampleEvaluations.map(e => ({
    evaluationId: e.id,
    characterId: e.characterId,
    evaluationDataVersion: e.evaluationDataVersion,
    status: e.status,
    subjectStateId: e.subjectState?.id ?? null,
    isDefault: e.isDefault === true,
    stats: e.items.map(item => ({
      stat: item.stat,
      base: item.baseScore,
      rawHaki: getRawHakiContributionTotal(item),
      weightedHaki: getRawHakiContributionTotal(item) * weight,
      final: getFinalStatScore(item, weight),
      readiness: item.readiness ?? null,
    })),
    overall: calculateBalancedCombatPower(e, balancedV12, '2000-01-01T00:00:00.000Z').finalScore,
  }))
  return {
    schema: 'onepiece-v04-snapshot/1',
    snapshotVersion: isOriginalV033 ? 'v0.3.3' : versionManifest.coreDataVersion.replace(/^core-/, ''),
    sourceCommit: isOriginalV033 ? versionManifest.baselineSourceCommit : null,
    appVersionAtCapture: isOriginalV033 ? '0.3.3' : versionManifest.appVersion,
    coreDataVersion: versionManifest.coreDataVersion,
    evaluationSetVersion: versionManifest.evaluationSetVersion,
    model: balancedV12,
    // Persist actual historical records; never refer to current array filtering as history.
    data: liveDataset,
    results: {
      evaluations,
      defaultEvaluationByCharacter: sampleCharacters.map(c => ({
        characterId: c.id,
        evaluationId: evaluationRepository.getEvaluation(c.id)?.id ?? null,
      })),
      rankings: Object.fromEntries(['overall', ...COMBAT_STATS].map(stat => [stat, getStatRanking(stat as 'overall' | typeof COMBAT_STATS[number])])),
    },
  }
}
