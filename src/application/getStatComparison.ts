import { evaluationRepository } from '../data/repositories/evaluationRepository'
import { characterRepository } from '../data/repositories/characterRepository'
import { evidenceRepository } from '../data/repositories/evidenceRepository'
import { battleRepository } from '../data/repositories/battleRepository'
import { calculationModelRepository } from '../data/repositories/calculationModelRepository'
import { getUniqueCharacterList } from './getCharacterList'
import { getFinalStatScore, getRawHakiContributionTotal, getEffectiveHakiContributionTotal } from '../domain/evaluation/score'
import type { CombatStat, EvidenceReadiness, EvaluationStatus } from '../domain/evaluation/types'
import type { Evidence, EvidenceStatRole } from '../domain/evidence/types'
import type { Battle } from '../domain/battle/types'
import { v0180CommanderAttackAudit } from '../data/sample/v0180CommanderAttackAudit'

/** Read-only comparison: never supplies a stat or canon fact of its own. */
export type StatComparisonEvidence = {
  evidence: Evidence
  battle?: Battle
  role?: EvidenceStatRole
}
export type StatComparisonSide = {
  characterId:string
  name:string
  groupId:string
  groupName:string
  evaluationId:string
  stateId?:string
  stateLabel:string
  status:EvaluationStatus
  dataVersion:string
  stat:CombatStat
  final:number
  base:number
  rawHaki:number
  effectiveHaki:number
  hakiWeight:number
  readiness?:EvidenceReadiness
  rationale:string
  evidence:StatComparisonEvidence[]
  missingEvidenceIds:string[]
  attackAudit?:typeof v0180CommanderAttackAudit[number]
}

export function getStatComparisonRoster(){
  return getUniqueCharacterList().map(({character,group})=>{
    const evaluations=evaluationRepository.getEvaluations(character.id)
    const current=evaluations.find(x=>x.isDefault)??evaluations[0]
    return {
      id:character.id,name:character.name,groupId:group.id,groupName:group.name,
      defaultStateId:current?.subjectState?.id,
      states:evaluations.map(x=>({id:x.subjectState?.id??'',label:x.subjectState?.label??'기본 평가'})),
    }
  }).filter(x=>x.states.length>0)
}

export function getStatComparisonSide(stat:CombatStat,characterId:string,stateId?:string):StatComparisonSide|undefined{
  const character=characterRepository.getCharacter(characterId)
  const evaluation=evaluationRepository.getEvaluation(characterId,stateId)
  const model=calculationModelRepository.getModel('balanced')
  const representative=getUniqueCharacterList().find(x=>x.character.id===characterId)
  const item=evaluation?.items.find(x=>x.stat===stat)
  if(!character||!evaluation||!model||!representative||!item)return undefined
  const evidenceById=new Map(evidenceRepository.getEvidenceForCharacter(characterId).map(x=>[x.id,x]))
  const evidence:StatComparisonEvidence[]=item.evidenceIds.flatMap(id=>{
    const record=evidenceById.get(id)
    if(!record)return []
    return [{
      evidence:record,
      battle:battleRepository.getBattle(record.battleId),
      role:record.statContributions.find(x=>x.stat===stat)?.role,
    }]
  })
  return {
    characterId,name:character.name,groupId:representative.group.id,
    groupName:representative.group.name,
    evaluationId:evaluation.id,stateId:evaluation.subjectState?.id,
    stateLabel:evaluation.subjectState?.label??'기본 평가',status:evaluation.status,
    dataVersion:evaluation.evaluationDataVersion,stat,
    final:getFinalStatScore(item,model.configuration.hakiWeight),
    base:item.baseScore,
    rawHaki:getRawHakiContributionTotal(item),
    effectiveHaki:getEffectiveHakiContributionTotal(item,model.configuration.hakiWeight),
    hakiWeight:model.configuration.hakiWeight,
    readiness:item.readiness,rationale:item.rationale,
    evidence,
    missingEvidenceIds:item.evidenceIds.filter(id=>!evidenceById.has(id)),
    attackAudit:stat==='attack'?v0180CommanderAttackAudit.find(x=>x.characterId===characterId):undefined,
  }
}

export function getStatComparison(stat:CombatStat,leftId:string,rightId:string,leftStateId?:string,rightStateId?:string){
  if(leftId===rightId)return undefined
  const left=getStatComparisonSide(stat,leftId,leftStateId)
  const right=getStatComparisonSide(stat,rightId,rightStateId)
  if(!left||!right)return undefined
  return {stat,left,right,difference:left.final-right.final}
}
