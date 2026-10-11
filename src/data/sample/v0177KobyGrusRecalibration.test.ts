import { describe, expect, it } from 'vitest'
import { historicalEvaluationsBeforeV0174 } from './evaluations'
import { sampleCharacters } from './characters'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleMemberships } from './memberships'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { calibrationAnchorsV0172 } from './v0172AnchorBaseline'
import { applyV0174EvaluationCorrection } from './v0174TargetedCalibration'
import { applyV0175GrusEvidenceReview } from './v0175FocusedReview'
import { applyV0176KobyAttackCorrection } from './v0176KobyAttackRecalibration'
import { v0177Corrections, v0177RosterFollowup, applyV0177KobyGrusRecalibration } from './v0177KobyGrusRecalibration'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { getStatRanking } from '../../application/getStatRanking'

// Historical v0.1.77 snapshot; v0.1.78 live evidence metadata is tested separately.
const sampleEvaluations=historicalEvaluationsBeforeV0174.map(applyV0174EvaluationCorrection)
  .map(applyV0175GrusEvidenceReview).map(applyV0176KobyAttackCorrection)
  .map(applyV0177KobyGrusRecalibration)
const atV0176=()=>historicalEvaluationsBeforeV0174.map(applyV0174EvaluationCorrection)
  .map(applyV0175GrusEvidenceReview).map(applyV0176KobyAttackCorrection)
const live=(id:string)=>{
  const e=sampleEvaluations.find(e=>e.characterId===id && e.isDefault!==false)
  if(!e)throw Error('missing '+id)
  return e
}
const finals=(e:typeof sampleEvaluations[number])=>e.items.map(i=>getFinalStatScore(i))
const raw=(e:typeof sampleEvaluations[number])=>e.items.map(i=>getRawHakiContributionTotal(i))
const overall=(e:typeof sampleEvaluations[number])=>calculateBalancedCombatPower(e,balancedV12).finalScore

describe('v0.1.77 — two targeted contextual downgrades only',()=>{
  it('revises Koby Combat IQ76→72 and Grus Versatility85→80 while preserving positive feats and negative context',()=>{
    expect(v0177Corrections).toHaveLength(2)
    expect(v0177Corrections.map(x=>[x.characterId,x.stat,x.previousFinal,x.revisedFinal]))
      .toEqual([['koby','combatIQ',76,72],['prince-grus','versatility',85,80]])
    expect(finals(live('koby'))).toEqual([77,73,77,78,77,72,67])
    expect(finals(live('prince-grus'))).toEqual([72,77,74,71,81,78,80])
    expect(overall(live('koby'))).toBeCloseTo(521/7,10)
    expect(overall(live('prince-grus'))).toBeCloseTo(533/7,10)
    expect(live('koby').evaluationDataVersion).toBe('evaluation-0.1.77-koby-combat-iq-context-calibrated')
    expect(live('prince-grus').evaluationDataVersion).toBe('evaluation-0.1.77-grus-single-clay-system-versatility-calibrated')
    expect(live('koby').items.find(i=>i.stat==='combatIQ')?.rationale).toContain('시류')
    expect(live('prince-grus').items.find(i=>i.stat==='versatility')?.rationale).toContain('점토 인형')
    expect(live('koby').items.find(i=>i.stat==='combatIQ')?.readiness).toBe('E2')
    expect(live('prince-grus').items.find(i=>i.stat==='versatility')?.readiness).toBe('E2')
  })
  it('preserves exactly 453/455 default Final axes, all other 63 characters and all Haki raw',()=>{
    const previous=new Map(atV0176().map(e=>[e.id,e]))
    expect(sampleEvaluations).toHaveLength(68)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(65)
    let changes=0
    for(const after of sampleEvaluations){
      const before=previous.get(after.id)!
      expect(before,after.id).toBeDefined()
      expect(raw(after)).toEqual(raw(before))
      for(const i of after.items){
        const prior=before.items.find(x=>x.stat===i.stat)!
        if(after.characterId==='koby' && i.stat==='combatIQ'){
          expect(getFinalStatScore(prior)).toBe(76)
          expect(getFinalStatScore(i)).toBe(72)
          expect(i.evidenceIds).toEqual(prior.evidenceIds)
          expect(i.hakiContributions).toEqual(prior.hakiContributions)
          changes++
        } else if(after.characterId==='prince-grus' && i.stat==='versatility'){
          expect(getFinalStatScore(prior)).toBe(85)
          expect(getFinalStatScore(i)).toBe(80)
          expect(i.evidenceIds).toEqual(prior.evidenceIds)
          expect(i.hakiContributions).toEqual(prior.hakiContributions)
          changes++
        } else expect(i).toEqual(prior)
      }
      if(!['koby','prince-grus'].includes(after.characterId))expect(after).toEqual(before)
      if(!['koby','prince-grus'].includes(after.characterId))expect(overall(after)).toBeCloseTo(overall(before),10)
    }
    expect(changes).toBe(2)
    expect(sampleCharacters).toHaveLength(70)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(476)
    expect(sampleMemberships).toHaveLength(92)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false).flatMap(e=>e.items)
      .reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e=>e.items)
      .reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(230)
  })
  it('preserves the pre-v0.1.77 replay, five frozen calibration anchors, ranking and owned evidence',()=>{
    const old=atV0176()
    const k=old.find(e=>e.characterId==='koby')!
    const g=old.find(e=>e.characterId==='prince-grus')!
    expect(finals(k)).toEqual([77,73,77,78,77,76,67])
    expect(finals(g)).toEqual([72,77,74,71,81,78,85])
    expect(k.evaluationDataVersion).toBe('evaluation-0.1.76-koby-single-burst-attack-calibrated')
    expect(g.evaluationDataVersion).toBe('evaluation-0.1.75-grus-evidence-expanded-no-score-change')
    expect(()=>applyV0177KobyGrusRecalibration(live('koby'))).toThrow(/source evaluation version mismatch/)
    expect(()=>applyV0177KobyGrusRecalibration(live('prince-grus'))).toThrow(/source evaluation version mismatch/)
    const bad={...k,items:k.items.map(i=>i.stat==='combatIQ'?{...i,score:75,baseScore:75}:i)}
    expect(()=>applyV0177KobyGrusRecalibration(bad)).toThrow(/baseline mismatch/)
    const owners=sampleEvidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    for(const id of ['koby','prince-grus'])expect(validateEvaluation(live(id),owners)).toEqual({valid:true,errors:[]})
    for(const anchor of calibrationAnchorsV0172.filter(x=>x.decision==='locked-overall')){
      expect(overall(live(anchor.characterId)))
        .toBeCloseTo(anchor.finalScores.reduce((s,x)=>s+x,0)/7,10)
    }
    expect(getStatRanking('overall')).toHaveLength(69)
    expect(sampleEvidence.some(e=>e.id==='evidence-v0175-grus-clay-golems-tv1114')).toBe(true)
    expect(sampleBattles.some(b=>b.id==='battle-v0175-grus-golems-1114')).toBe(true)
    expect(live('prince-grus').items.find(i=>i.stat==='versatility')?.evidenceIds)
      .toContain('evidence-v0175-grus-clay-golems-tv1114')
  })
  it('does not auto-downgrade other groups for sparse evidence or one-sided matchup outcomes',()=>{
    const targets=[
      ['smoothie','attack',76,'E2'],
      ['ulti','stamina',84,'E2'],
      ['page-one','defense',76,'E2'],
      ['sasaki','speed',70,'E3'],
      ['raizo','versatility',84,'E2'],
      ['kawamatsu','speed',74,'E3'],
      ['karasu','speed',82,'E2'],
      ['shiryu','speed',79,'E3'],
      ['van-augur','versatility',82,'E2'],
    ] as const
    expect(v0177RosterFollowup).toHaveLength(targets.length)
    for(const [id,axis,value,read] of targets){
      const i=live(id).items.find(x=>x.stat===axis)
      expect(getFinalStatScore(i!),id+axis).toBe(value)
      expect(i?.readiness).toBe(read)
      const review=v0177RosterFollowup.find(x=>x.characterId===id)
      expect(review).toBeDefined()
      expect(review!.final).toBe(value)
      expect(review!.decision).toBe('hold')
    }
  })
})
