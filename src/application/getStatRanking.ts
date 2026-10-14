import { getUniqueCharacterList } from './getCharacterList'
import { getCombatPower } from './getCombatPower'
import { evaluationRepository } from '../data/repositories/evaluationRepository'
import { calculationModelRepository } from '../data/repositories/calculationModelRepository'
import { getFinalStatScore } from '../domain/evaluation/score'
import type { CombatStat, EvaluationStatus } from '../domain/evaluation/types'

export type RankingStat = CombatStat | 'overall'

export type StatRankingEntry = {
  characterId: string
  characterName: string
  groupId: string
  groupName: string
  score: number
  rank: number
  status: EvaluationStatus
  subjectStateLabel?: string
  subjectStateId?: string
  stateOptions?: { id: string; label: string }[]
}

/** Starting state for a NEW Overall ranking popup: highest actual unrounded Overall,
 * not arbitrary Evaluation order or the state last selected in character detail.
 * Only multi-Evaluation characters need explicit overrides. */
export function getHighestOverallStateIds(): Record<string,string> {
  const defaults:Record<string,string> = {}
  for (const {character} of getUniqueCharacterList()) {
    const evaluations=evaluationRepository.getEvaluations(character.id)
    if(evaluations.length<=1)continue
    const highest=evaluations.reduce((best,candidate)=>{
      const score=e=>getCombatPower(character.id,'balanced',e.subjectState?.id).finalScore
      return score(candidate)>score(best)?candidate:best
    })
    if(highest.subjectState?.id) defaults[character.id]=highest.subjectState.id
  }
  return defaults
}

// Rankings are derived from the same evaluated roster and Balanced model as the detail UI.
export function getStatRanking(stat: RankingStat, selectedStates: Readonly<Record<string,string>> = {}): StatRankingEntry[] {
  const model = calculationModelRepository.getModel('balanced')
  if (!model) throw new Error('Balanced calculation model is missing.')

  const sorted = getUniqueCharacterList().flatMap(({ character, group }) => {
    const allEvaluations = evaluationRepository.getEvaluations(character.id)
    const evaluation = evaluationRepository.getEvaluation(character.id, selectedStates[character.id])
      ?? evaluationRepository.getEvaluation(character.id)
    if (!evaluation) return []
    const item = stat === 'overall' ? undefined : evaluation.items.find((entry) => entry.stat === stat)
    if (stat !== 'overall' && !item) return []
    const score = stat === 'overall'
      ? getCombatPower(character.id, 'balanced', evaluation.subjectState?.id).finalScore
      : getFinalStatScore(item!, model.configuration.hakiWeight)
    return [{
      characterId: character.id,
      characterName: character.name,
      groupId: group.id,
      groupName: group.name,
      score,
      status: evaluation.status,
      subjectStateLabel: evaluation.subjectState?.label,
      subjectStateId: evaluation.subjectState?.id,
      stateOptions: allEvaluations.length > 1 ? allEvaluations.map(e=>({id:e.subjectState?.id ?? e.id,label:e.subjectState?.label ?? '기본 평가'})) : undefined,
    }]
  }).sort((a, b) => b.score - a.score || a.characterName.localeCompare(b.characterName, 'ko'))

  return sorted.map((entry, index) => ({
    ...entry,
    rank: index > 0 && entry.score === sorted[index - 1].score
      ? sorted.findIndex((other) => other.score === entry.score) + 1
      : index + 1,
  }))
}
