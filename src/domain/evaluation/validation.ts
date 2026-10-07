import { COMBAT_STATS, EVALUATION_STATUSES, type Evaluation } from './types'
import { getFinalStatScore, getHakiContributionTotal, MAX_HAKI_CONTRIBUTION_PER_STAT } from './score'
import { validateHakiContribution } from '../haki/validation'

export type EvaluationValidationResult = {
  valid: boolean
  errors: string[]
}

export type EvaluationEvidenceReference = {
  id: string
  subjectCharacterId: string
}

const isCombatStat = (value: string): boolean =>
  (COMBAT_STATS as readonly string[]).includes(value)

const isEvaluationStatus = (value: string): boolean =>
  (EVALUATION_STATUSES as readonly string[]).includes(value)

export const validateEvaluation = (
  evaluation: Evaluation,
  evidenceReferences: readonly EvaluationEvidenceReference[] = [],
): EvaluationValidationResult => {
  const errors: string[] = []

  if (!evaluation.id.trim()) errors.push('Evaluation id is required.')
  if (!evaluation.characterId.trim()) errors.push('Character id is required.')
  if (!evaluation.evaluationDataVersion.trim()) {
    errors.push('Evaluation data version is required.')
  }
  if (!isEvaluationStatus(evaluation.status)) {
    errors.push('Evaluation status is invalid.')
  }

  if (evaluation.items.length !== COMBAT_STATS.length) {
    errors.push(`Evaluation must contain exactly ${COMBAT_STATS.length} stat items.`)
  }

  const seenStats = new Set<string>()
  const evidenceById = new Map(evidenceReferences.map((reference) => [reference.id, reference]))

  for (const item of evaluation.items) {
    if (!isCombatStat(item.stat)) {
      errors.push(`Invalid combat stat: ${item.stat}.`)
    }

    if (seenStats.has(item.stat)) {
      errors.push(`Duplicate combat stat: ${item.stat}.`)
    }
    seenStats.add(item.stat)

    if (!Number.isFinite(item.baseScore) || item.baseScore < 0 || item.baseScore > 100) {
      errors.push(`Base score for ${item.stat} must be between 0 and 100.`)
    }

    const hakiTotal = getHakiContributionTotal(item)
    if (hakiTotal > MAX_HAKI_CONTRIBUTION_PER_STAT) {
      errors.push(`Total Haki contribution for ${item.stat} must not exceed ${MAX_HAKI_CONTRIBUTION_PER_STAT}.`)
    }
    for (const contribution of item.hakiContributions) {
      for (const error of validateHakiContribution(contribution)) errors.push(`${item.stat}: ${error}`)
      if (contribution.stat !== item.stat) errors.push(`Haki contribution stat mismatch for ${item.stat}: ${contribution.stat}.`)
      for (const evidenceId of contribution.evidenceIds) {
        const reference = evidenceById.get(evidenceId)
        if (!reference) errors.push(`Unknown Haki evidence id for ${item.stat}: ${evidenceId}.`)
        else if (reference.subjectCharacterId !== evaluation.characterId) errors.push(`Haki Evidence ${evidenceId} belongs to another character.`)
        if (!item.evidenceIds.includes(evidenceId)) errors.push(`Haki Evidence ${evidenceId} must also be linked to ${item.stat} evidenceIds.`)
      }
    }

    const expectedScore = getFinalStatScore(item)
    if (!Number.isFinite(item.score) || item.score !== expectedScore) {
      errors.push(`Score for ${item.stat} must equal Base + effective Haki contribution capped at 100 (${expectedScore}).`)
    }

    if (!item.rationale.trim()) {
      errors.push(`Rationale is required for ${item.stat}.`)
    }

    if (!Array.isArray(item.evidenceIds)) {
      errors.push(`Evidence ids must be an array for ${item.stat}.`)
      continue
    }

    for (const evidenceId of item.evidenceIds) {
      if (typeof evidenceId !== 'string' || !evidenceId.trim()) {
        errors.push(`Evidence id must be a non-empty string for ${item.stat}.`)
        continue
      }

      const reference = evidenceById.get(evidenceId)
      if (!reference) {
        errors.push(`Unknown evidence id for ${item.stat}: ${evidenceId}.`)
      } else if (reference.subjectCharacterId !== evaluation.characterId) {
        errors.push(`Evidence ${evidenceId} belongs to another character.`)
      }
    }
  }

  for (const stat of COMBAT_STATS) {
    if (!seenStats.has(stat)) {
      errors.push(`Missing combat stat: ${stat}.`)
    }
  }

  return { valid: errors.length === 0, errors }
}
