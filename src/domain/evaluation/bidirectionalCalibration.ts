/**
 * v0.4.29 - editorial calibration decision gate, NOT a new weighted scoring formula.
 *
 * The seven-stat Balanced 1.2 model remains the source of numeric calculation.
 * This checks that each proposed number addresses BOTH inflation and deflation,
 * distinguishes cited events from inferred combat competence, and makes ordinary
 * Haki/exceptional Raw reclassification an explicit, auditable choice.
 */
import { COMBAT_STATS, type CombatStat, type EvidenceReadiness, type Evaluation, type EvaluationItem } from './types'
import { getFinalStatScore, getRawHakiContributionTotal, DEFAULT_HAKI_WEIGHT } from './score'

export type AxisCalibrationReview = {
  stat: CombatStat
  expectedFinal: number
  proposedFinal: number
  /** Source-derived observation; not a guessed capability. */
  observed: string
  /** Opponent, battle objective, support, conditions or observation limits. */
  context: string
  /** Qualified combat implication inferred from observed evidence. */
  inference: string
  /** What might be counted too generously. */
  inflationRisk: string
  /** What direct-scene-only scoring might miss. */
  deflationRisk: string
  /** Why the selected number, including what it does NOT imply. */
  judgement: string
  evidenceIds: string[]
  readiness: EvidenceReadiness
  /** May only be used when Raw previously counted ordinary (not exceptional) Haki. */
  normalHakiRawToBase?: {
    expectedPriorRaw: number
    reason: string
  }
}

export type CharacterCalibrationReview = {
  characterId: string
  evaluationId: string
  sourceDataVersion: string
  newDataVersion: string
  axes: AxisCalibrationReview[]
}

/**
 * Enforces completeness/provenance/score identity, without automatically
 * awarding or subtracting points because of titles, uncertainty, or scene counts.
 */
export function validateCalibrationReview(source:Evaluation, review:CharacterCalibrationReview):string[]{
  const errors:string[]=[]
  if(source.characterId!==review.characterId||source.id!==review.evaluationId)
    errors.push('Character/evaluation identity mismatch')
  if(source.evaluationDataVersion!==review.sourceDataVersion)
    errors.push('Source evaluation version drift')
  if(!review.newDataVersion.trim()||review.newDataVersion===review.sourceDataVersion)
    errors.push('New evaluation version must be distinct')
  if(review.axes.length!==COMBAT_STATS.length)errors.push('Exactly seven axis reviews are required')
  const seen=new Set<string>()
  for(const axis of review.axes){
    if(!(COMBAT_STATS as readonly string[]).includes(axis.stat)||seen.has(axis.stat))
      errors.push('Unknown or duplicate reviewed axis: '+axis.stat)
    seen.add(axis.stat)
    const sourceItem=source.items.find(item=>item.stat===axis.stat)
    if(!sourceItem){errors.push('Missing existing axis: '+axis.stat);continue}
    if(getFinalStatScore(sourceItem)!==axis.expectedFinal)
      errors.push('Previous Final drift: '+axis.stat)
    if(!Number.isFinite(axis.proposedFinal)||axis.proposedFinal<0||axis.proposedFinal>100)
      errors.push('Proposed score outside 0-100: '+axis.stat)
    for(const name of ['observed','context','inference','inflationRisk','deflationRisk','judgement'] as const)
      if(axis[name].trim().length<12)errors.push('Incomplete '+name+' for '+axis.stat)
    if(!axis.evidenceIds.length)errors.push('Missing cited Evidence: '+axis.stat)
    for(const id of axis.evidenceIds)
      if(!sourceItem.evidenceIds.includes(id))
        errors.push('Review cites evidence absent from original stat: '+axis.stat+'/'+id)
    if(axis.normalHakiRawToBase){
      const raw=getRawHakiContributionTotal(sourceItem)
      if(raw===0||raw!==axis.normalHakiRawToBase.expectedPriorRaw)
        errors.push('Explicit ordinary-Haki Raw mismatch: '+axis.stat)
      if(axis.normalHakiRawToBase.reason.trim().length<24)
        errors.push('Ordinary Haki move needs explicit non-exceptional-effect rationale: '+axis.stat)
    }
  }
  for(const stat of COMBAT_STATS)if(!seen.has(stat))errors.push('Missing reviewed axis: '+stat)
  return errors
}

export function applyReviewedCalibration(source:Evaluation,review:CharacterCalibrationReview):Evaluation{
  if(source.characterId!==review.characterId)return source
  const errors=validateCalibrationReview(source,review)
  if(errors.length)throw new Error('Invalid bidirectional calibration: '+errors.join(' | '))
  const axes=new Map(review.axes.map(axis=>[axis.stat,axis]))
  const items:EvaluationItem[]=source.items.map(old=>{
    const axis=axes.get(old.stat)!
    const hakiContributions=axis.normalHakiRawToBase ? [] : old.hakiContributions
    const newBase=axis.proposedFinal-(getRawHakiContributionTotal({hakiContributions})*DEFAULT_HAKI_WEIGHT)
    const candidate:EvaluationItem={
      ...old,baseScore:newBase,
      hakiContributions,
      readiness:axis.readiness,
      rationale:[
        '확인/공식: '+axis.observed,
        '전투 조건: '+axis.context,
        '합리적 추론: '+axis.inference,
        '과대평가 위험: '+axis.inflationRisk,
        '과소평가 위험: '+axis.deflationRisk,
        '양방향 재판정: '+axis.judgement,
        ...(axis.normalHakiRawToBase ? ['통상 Haki는 Base에 통합(예외 Raw=0): '+axis.normalHakiRawToBase.reason]:[]),
        'E1/E2/E3는 점수 보너스·감점이 아닌 확실성 표기. 공식 전투력·1대1 승률 아님.'
      ].join(' '),
    }
    const final=getFinalStatScore(candidate)
    if(final!==axis.proposedFinal)
      throw new Error('Balanced/Raw mismatch: '+review.characterId+'/'+old.stat)
    return {...candidate,score:final}
  })
  return {...source,evaluationDataVersion:review.newDataVersion,items,status:'draft'}
}
