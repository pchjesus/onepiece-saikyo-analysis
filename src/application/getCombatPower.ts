import { calculateBalancedCombatPower } from '../domain/calculation/calculateCombatPower'
import { calculationModelRepository } from '../data/repositories/calculationModelRepository'
import { evaluationRepository } from '../data/repositories/evaluationRepository'

export function getCombatPower(characterId: string, modelId = 'balanced') {
  const evaluation = evaluationRepository.getEvaluation(characterId)
  const model = calculationModelRepository.getModel(modelId)
  if (!evaluation || !model) throw new Error(`Unable to calculate combat power for ${characterId}`)
  return calculateBalancedCombatPower(evaluation, model)
}
