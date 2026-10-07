import { getCharacterEvidence } from './getCharacterEvidence'
import { evaluationRepository } from '../data/repositories/evaluationRepository'

export function getCharacterEvaluationTrace(characterId: string) {
  const evaluation = evaluationRepository.getEvaluation(characterId)
  if (!evaluation) return undefined

  const evidenceRecords = getCharacterEvidence(characterId)
  const evidenceById = new Map(evidenceRecords.map((record) => [record.evidence.id, record]))

  return evaluation.items.map((item) => ({
    item,
    evidence: item.evidenceIds
      .map((evidenceId) => evidenceById.get(evidenceId))
      .filter((record): record is NonNullable<typeof record> => Boolean(record)),
  }))
}
