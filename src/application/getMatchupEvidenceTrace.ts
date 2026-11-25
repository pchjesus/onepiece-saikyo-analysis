import { battleRepository } from '../data/repositories/battleRepository'
import { evidenceRepository } from '../data/repositories/evidenceRepository'
import type { MatchupFactorAssessment } from '../domain/matchup/types'
import type { EvidenceSourceType } from '../domain/evidence/types'

/**
 * Read-only provenance for the CURRENT matchup repository.
 * A registered "canon" index is not proof that the original manga panel
 * was independently reread. The matchup's assumptions must not be mistaken
 * for the conditions of a battle cited by one of its evidence records.
 */
export type MatchupEvidenceTrace = {
  evidenceId: string
  status: 'linked' | 'evidence-missing' | 'battle-missing'
  sourceType?: EvidenceSourceType
  reference?: string
  fact?: string
  uncertainty?: string
  battleTitle?: string
  battleStructure?: string
  combatPurpose?: string
  environment?: string
  restrictions?: string
  externalFactors?: string
}

export function getMatchupEvidenceTrace(
  factor: Pick<MatchupFactorAssessment, 'evidenceIds'>,
): MatchupEvidenceTrace[] {
  return factor.evidenceIds.map(evidenceId => {
    const evidence = evidenceRepository.getEvidenceById(evidenceId)
    if (!evidence) return { evidenceId, status: 'evidence-missing' as const }
    const battle = battleRepository.getBattle(evidence.battleId)
    return {
      evidenceId,
      status: battle ? 'linked' as const : 'battle-missing' as const,
      sourceType: evidence.source.type,
      reference: evidence.source.reference,
      fact: evidence.fact,
      uncertainty: evidence.uncertainty,
      battleTitle: battle?.title,
      battleStructure: battle?.combatStructure,
      combatPurpose: battle?.combatPurpose,
      environment: battle?.environment,
      restrictions: battle?.restrictions,
      externalFactors: battle?.externalFactors,
    }
  })
}
