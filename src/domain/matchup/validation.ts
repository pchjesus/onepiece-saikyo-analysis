import type { MatchupAnalysis } from './types'

export type MatchupValidationResult = {
  valid: boolean
  errors: string[]
}

export function validateMatchupAnalysis(
  analysis: MatchupAnalysis,
  knownEvidenceIds: readonly string[] = [],
  knownEvaluationStateIds: readonly string[] = [],
): MatchupValidationResult {
  const errors: string[] = []
  const evidenceSet = new Set(knownEvidenceIds)
  const factorIds = new Set<string>()
  const evaluationStateSet = new Set(knownEvaluationStateIds)

  if (!analysis.id.trim()) errors.push('Matchup id is required.')
  if (!analysis.characterAId.trim() || !analysis.characterBId.trim()) {
    errors.push('Both matchup characters are required.')
  }
  if (analysis.characterAId === analysis.characterBId) {
    errors.push('A matchup requires two different characters.')
  }

  for (const [characterId, stateId] of [
    [analysis.characterAId, analysis.characterAStateId],
    [analysis.characterBId, analysis.characterBStateId],
  ] as const) {
    if (stateId !== undefined && !stateId.trim()) {
      errors.push(`Matchup evaluation state id must not be empty: ${characterId}.`)
    }
    if (stateId && knownEvaluationStateIds.length > 0 && !evaluationStateSet.has(`${characterId}:${stateId}`)) {
      errors.push(`Unknown matchup evaluation state: ${characterId}:${stateId}.`)
    }
  }

  for (const factor of analysis.factors) {
    if (!factor.id.trim()) errors.push('Matchup factor id is required.')
    if (factorIds.has(factor.id)) errors.push(`Duplicate matchup factor id: ${factor.id}.`)
    factorIds.add(factor.id)

    if (!factor.summary.trim()) errors.push(`Matchup factor summary is required: ${factor.id}.`)
    if (!factor.uncertainty.trim()) errors.push(`Matchup factor uncertainty is required: ${factor.id}.`)

    if (factor.advantage === 'conditional' && !factor.conditions?.trim()) {
      errors.push(`Conditional matchup factor requires conditions: ${factor.id}.`)
    }
    if (factor.confidence === 'confirmed' && factor.evidenceIds.length === 0) {
      errors.push(`Confirmed matchup factor requires Evidence: ${factor.id}.`)
    }

    const seenEvidence = new Set<string>()
    for (const evidenceId of factor.evidenceIds) {
      if (seenEvidence.has(evidenceId)) {
        errors.push(`Duplicate Evidence in matchup factor ${factor.id}: ${evidenceId}.`)
      }
      seenEvidence.add(evidenceId)
      if (knownEvidenceIds.length > 0 && !evidenceSet.has(evidenceId)) {
        errors.push(`Unknown matchup Evidence id: ${evidenceId}.`)
      }
    }
  }

  return { valid: errors.length === 0, errors }
}
