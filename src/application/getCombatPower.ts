import { calculateBalancedCombatPower } from '../domain/calculation/calculateCombatPower'
import { calculationModelRepository } from '../data/repositories/calculationModelRepository'
import { evaluationRepository } from '../data/repositories/evaluationRepository'

export function getCombatPower(characterId: string, modelId = 'balanced', subjectStateId?: string) {
  const evaluation = evaluationRepository.getEvaluation(characterId, subjectStateId)
  const model = calculationModelRepository.getModel(modelId)
  if (!evaluation || !model) throw new Error(`Unable to calculate combat power for ${characterId}`)
  return calculateBalancedCombatPower(evaluation, model)
}
