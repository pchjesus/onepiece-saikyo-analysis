import { describe, expect, it } from 'vitest'
import { historicalEvaluationsBeforeV0174 } from './evaluations'
import { sampleCharacters } from './characters'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleMatchups } from './matchups'
import { sampleMemberships } from './memberships'
import { balancedV12 } from './calculationModels'
import { calibrationAnchorsV0172 } from './v0172AnchorBaseline'
import { applyV0174EvaluationCorrection } from './v0174TargetedCalibration'
import { applyV0175GrusEvidenceReview, v0175ReviewDecisions } from './v0175FocusedReview'
import { v0176KobyAttackDecision, v0176FollowupReviews, applyV0176KobyAttackCorrection } from './v0176KobyAttackRecalibration'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { validateEvaluation } from '../../domain/evaluation/validation'

// Freeze the exact v0.1.76 cohort for retrospective tests; live v0.1.77 has its own suite.
const sampleEvaluations=historicalEvaluationsBeforeV0174.map(applyV0174EvaluationCorrection).map(applyV0175GrusEvidenceReview).map(applyV0176KobyAttackCorrection)

const current=(id:string)=>{
  const ev=sampleEvaluations.find(e=>e.characterId===id && e.isDefault!==false)
  if(!ev)throw Error('missing '+id)
  return ev
}
const values=(id:string)=>current(id).items.map(i=>getFinalStatScore(i))
const overall=(id:string)=>calculateBalancedCombatPower(current(id),balancedV12).finalScore
const v0175Snapshot=()=>historicalEvaluationsBeforeV0174
  .map(applyV0174EvaluationCorrection).map(applyV0175GrusEvidenceReview)

describe('v0.1.76 — Koby single-burst Attack review and unchanged IQ peer audit',()=>{
  it('recalibrates precisely Koby Attack 82→77 without treating Honesty Impact as repeatable high-tier damage',()=>{
    expect(v0176KobyAttackDecision.characterId).toBe('koby')
    expect(v0176KobyAttackDecision.previousFinal).toBe(82)
    expect(v0176KobyAttackDecision.revisedFinal).toBe(77)
    const base=v0175Snapshot().find(e=>e.characterId==='koby')!
    expect(base.items.map(i=>i.score)).toEqual([82,73,77,78,77,76,67])
    expect(base.evaluationDataVersion).toBe('evaluation-0.1.70-expansion-draft')
    expect(values('koby')).toEqual([77,73,77,78,77,76,67])
    expect(overall('koby')).toBeCloseTo(525/7,10)
    expect((530/7)-overall('koby')).toBeCloseTo(5/7,10)
    expect(current('koby').evaluationDataVersion).toBe('evaluation-0.1.76-koby-single-burst-attack-calibrated')
    expect(current('koby').items[0].readiness).toBe('E2')
    expect(current('koby').items[0].evidenceIds).toEqual(base.items[0].evidenceIds)
    expect(current('koby').items.slice(1)).toEqual(base.items.slice(1))
    expect(current('koby').items[0].hakiContributions).toEqual([])
    expect(current('koby').items[0].rationale).toContain('반복')
    expect(()=>applyV0176KobyAttackCorrection(current('koby'))).toThrow(/source version mismatch/)
    const corrupted={...base,items:base.items.map(i=>i.stat==='attack'?{...i,baseScore:81,score:81}:i)}
    expect(()=>applyV0176KobyAttackCorrection(corrupted)).toThrow(/baseline mismatch/)
  })
  it('preserves 64 other character current eval objects and all Koby non-Attack axes and Haki raw',()=>{
    const before=new Map(v0175Snapshot().map(e=>[e.id,e]))
    expect(sampleEvaluations).toHaveLength(72)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(69)
    for(const now of sampleEvaluations){
      const old=before.get(now.id)!
      expect(old).toBeDefined()
      if(now.characterId==='koby'){
        for(const i of now.items){
          const prior=old.items.find(x=>x.stat===i.stat)!
          if(i.stat==='attack'){
            expect(getFinalStatScore(i)).toBe(77)
            expect(getFinalStatScore(prior)).toBe(82)
          } else expect(i).toBe(prior)
        }
      }else expect(now).toEqual(old)
      expect(now.items.map(i=>getRawHakiContributionTotal(i))).toEqual(old.items.map(i=>getRawHakiContributionTotal(i)))
    }
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(504)
    expect(sampleCharacters).toHaveLength(70)
    expect(sampleMemberships).toHaveLength(92)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(.5)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false).flatMap(e=>e.items).reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(230)
  })
  it('protects 5 fixed anchors, full ranking ordering and all other 64 computed overall values',()=>{
    for(const anchor of calibrationAnchorsV0172.filter(a=>a.decision==='locked-overall')){
      expect(overall(anchor.characterId)).toBeCloseTo(anchor.finalScores.reduce((s,x)=>s+x,0)/7,10)
    }
    const previous=v0175Snapshot().filter(e=>e.isDefault!==false)
    for(const old of previous.filter(e=>e.characterId!=='koby')){
      expect(overall(old.characterId)).toBeCloseTo(calculateBalancedCombatPower(old,balancedV12).finalScore,10)
    }
    const rank=getStatRanking('overall')
    expect(rank).toHaveLength(69)
    // Ranking reads the live v0.1.77 cohort; v0.1.76 snapshot assertions above remain 75.
    expect(rank.find(x=>x.characterId==='koby')?.score).toBeCloseTo(521/7,10)
    expect(rank.find(x=>x.characterId==='marco')?.score).toBeCloseTo(586/7,10)
    expect(rank.find(x=>x.characterId==='lucci')?.score).toBeCloseTo(552/7,10)
    expect(overall('koby')).toBeLessThan(overall('ulti'))
    expect(overall('koby')).toBeGreaterThan(overall('kawamatsu'))
    expect(values('marco')[0]).toBe(79)
    expect(values('king')[0]).toBe(83)
    expect(values('cracker')[0]).toBe(77)
    expect(values('jinbe')[0]).toBe(76)
  })
  it('retains IQ and Grus contested scores without converting one ambush/strategy or one devil fruit into global IQ/versatility',()=>{
    const expected=[
      ['crocodile','combatIQ',86,'E2'],
      ['stussy','combatIQ',85,'E2'],
      ['lucci','combatIQ',74,'E2'],
      ['prince-grus','versatility',85,'E2'],
      ['smoothie','attack',76,'E2'],
    ] as const
    for(const [id,stat,score,readiness] of expected){
      const i=current(id).items.find(x=>x.stat===stat)
      expect(i?.score).toBe(score)
      expect(i?.readiness).toBe(readiness)
      expect(v0176FollowupReviews.find(x=>x.characterId===id)?.score).toBe(score)
    }
    expect(v0175ReviewDecisions.find(x=>x.characterId==='koby')?.finalScore).toBe(82)
    expect(sampleEvidence.some(e=>e.id==='evidence-v0170-koby-impact')).toBe(true)
    expect(sampleEvidence.some(e=>e.id==='evidence-v0170-koby-hurry')).toBe(true)
    expect(sampleBattles.some(b=>b.id==='battle-v0170-sword-1122')).toBe(true)
    const refs=sampleEvidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    expect(validateEvaluation(current('koby'),refs)).toEqual({valid:true,errors:[]})
  })
})
