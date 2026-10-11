import { describe, expect, it } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleEvaluations, historicalEvaluationsBeforeV0174 } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleMemberships } from './memberships'
import { sampleMatchups } from './matchups'
import { calibrationAnchorsV0172 } from './v0172AnchorBaseline'
import { v0174Evidence, v0174ScoreChanges, applyV0174EvaluationCorrection } from './v0174TargetedCalibration'
import { balancedV12 } from './calculationModels'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getRawHakiContributionTotal, getFinalStatScore } from '../../domain/evaluation/score'
import { getStatRanking } from '../../application/getStatRanking'

const lookup=(id:string)=>{
  const e=sampleEvaluations.find(e=>e.characterId===id&&e.isDefault!==false)
  if(!e)throw Error('No current Evaluation for '+id)
  return e
}
const score=(id:string,stat:string)=>{
  const i=lookup(id).items.find(i=>i.stat===stat)
  if(!i)throw Error('No axis '+id+'/'+stat)
  return getFinalStatScore(i)
}
const overall=(id:string)=>calculateBalancedCombatPower(lookup(id),balancedV12).finalScore

describe('v0.1.74 — source and opponent calibrated *two-axis only* numeric correction',()=>{
  it('changes precisely Lucci Combat IQ68→74 and Marco Attack77→79, preserving existing Haki Raw',()=>{
    expect(v0174ScoreChanges).toHaveLength(2)
    expect(v0174ScoreChanges.map(c=>c.characterId+':'+c.stat)).toEqual(['lucci:combatIQ','marco:attack'])
    expect(score('lucci','combatIQ')).toBe(74)
    expect(score('marco','attack')).toBe(79)
    const marco=lookup('marco').items.find(i=>i.stat==='attack')!
    expect(marco.baseScore).toBe(78)
    expect(getRawHakiContributionTotal(marco)).toBe(2)
    expect(marco.score).toBe(79)
    expect(lookup('lucci').items.find(i=>i.stat==='combatIQ')?.readiness).toBe('E2')
    expect(overall('lucci')).toBeCloseTo(552/7,10)
    expect(overall('marco')).toBeCloseTo(586/7,10)
    expect(lookup('marco').evaluationDataVersion).toBe('evaluation-0.1.74-lucci-marco-evidence-calibrated')
    expect(lookup('lucci').evaluationDataVersion).toBe('evaluation-0.1.74-lucci-marco-evidence-calibrated')
  })
  it('copies source evaluation rather than mutating its previous score/score reference identity',()=>{
    const source=lookup('lucci')
    expect(()=>applyV0174EvaluationCorrection(source)).toThrow()
    expect(()=>applyV0174EvaluationCorrection(lookup('marco'))).toThrow()
    const unaffected=lookup('jozu')
    expect(applyV0174EvaluationCorrection(unaffected)).toBe(unaffected)
  })
  it('proves exact conservation for all 66 unrelated and historic Evaluation records and other 12 axes',()=>{
    expect(historicalEvaluationsBeforeV0174).toHaveLength(68)
    expect(sampleEvaluations).toHaveLength(68)
    const beforeById=new Map(historicalEvaluationsBeforeV0174.map(e=>[e.id,e]))
    const changedIds=new Set(['lucci','marco'])
    for(const after of sampleEvaluations){
      const before=beforeById.get(after.id)
      expect(before,after.id).toBeDefined()
      if(after.characterId==='koby'){
        expect(after.evaluationDataVersion).toBe('evaluation-0.1.78-koby-hachinosu-risk-context-evidence-only')
        expect(before!.evaluationDataVersion).toBe('evaluation-0.1.70-expansion-draft')
        for(const item of after.items){
          const prior=before!.items.find(x=>x.stat===item.stat)!
          if(item.stat==='attack'||item.stat==='combatIQ'){
            expect(prior.score).toBe(item.stat==='attack'?82:76)
            expect(item.score).toBe(item.stat==='attack'?77:72)
            expect(item.hakiContributions).toEqual(prior.hakiContributions)
          } else expect(item).toBe(prior)
        }
        continue
      }
      if(after.characterId==='queen'||after.characterId==='cracker'){
        expect(before!.evaluationDataVersion).toBe('evaluation-0.1.26-draft')
        expect(after.evaluationDataVersion).toBe(after.characterId==='queen'
          ?'evaluation-0.1.79-queen-multi-system-versatility-calibrated'
          :'evaluation-0.1.79-cracker-mastery-official-evidence-expanded')
        const target=after.characterId==='queen'?'versatility':'techniqueMastery'
        for(const item of after.items){
          const prior=before!.items.find(x=>x.stat===item.stat)!
          expect(item.hakiContributions).toEqual(prior.hakiContributions)
          expect(item.readiness).toBe(prior.readiness)
          if(item.stat===target){
            expect(item.score).toBe(after.characterId==='queen'?82:80)
            expect(prior.score).toBe(80)
            expect(item.evidenceIds.length).toBe(prior.evidenceIds.length+2)
          }else expect(item).toBe(prior)
        }
        continue
      }
      if(after.characterId==='smoothie'){
        expect(before!.evaluationDataVersion).toBe('evaluation-0.1.26-draft')
        expect(after.evaluationDataVersion).toBe('evaluation-0.1.78-smoothie-jinbe-steering-evidence-only')
        for(const item of after.items){
          const prior=before!.items.find(x=>x.stat===item.stat)!
          expect(item.baseScore).toBe(prior.baseScore)
          expect(item.score).toBe(prior.score)
          expect(item.readiness).toBe(prior.readiness)
          expect(item.hakiContributions).toEqual(prior.hakiContributions)
          if(item.stat==='attack'){
            expect(item.evidenceIds).toContain('evidence-v0178-smoothie-nami-jinbe-steering-tv868')
          } else expect(item).toBe(prior)
        }
        continue
      }
      if(after.characterId==='prince-grus'){
        // v0.1.75: new supplementary evidence and rationale only; zero numeric/Haki change.
        expect(before!.evaluationDataVersion).toBe('evaluation-0.1.70-expansion-draft')
        expect(after.evaluationDataVersion).toBe('evaluation-0.1.77-grus-single-clay-system-versatility-calibrated')
        for(const item of after.items){
          const prior=before!.items.find(x=>x.stat===item.stat)!
          expect(item.score).toBe(item.stat==='versatility'?80:prior.score)
          expect(item.baseScore).toBe(item.stat==='versatility'?80:prior.baseScore)
          expect(item.hakiContributions).toEqual(prior.hakiContributions)
          expect(item.readiness).toBe(prior.readiness)
          if(!['versatility','techniqueMastery'].includes(item.stat))expect(item).toBe(prior)
        }
        continue
      }
      if(!changedIds.has(after.characterId)){
        expect(after,after.id).toBe(before)
        expect(after).toEqual(before)
        continue
      }
      expect(before?.evaluationDataVersion,after.id).not.toBe(after.evaluationDataVersion)
      const changedAxis=after.characterId==='lucci'?'combatIQ':'attack'
      for(const item of after.items){
        const previous=before?.items.find(x=>x.stat===item.stat)
        if(item.stat!==changedAxis)expect(item,after.characterId+':'+item.stat).toEqual(previous)
        else expect(previous?.score,after.characterId).not.toBe(item.score)
      }
    }
    expect(sampleEvaluations.filter(x=>!changedIds.has(x.characterId))).toHaveLength(66)
  })

  it('uses only owned supplementary Evidence with already-existing Battle references and correct ties',()=>{
    expect(v0174Evidence).toHaveLength(3)
    const ids=new Set(sampleEvidence.map(e=>e.id))
    expect(ids.size).toBe(sampleEvidence.length)
    const battles=new Set(sampleBattles.map(b=>b.id))
    const refs=sampleEvidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    for(const item of v0174Evidence){
      expect(item.source.type).toBe('supplementary')
      expect(item.evidenceStrength).not.toBe('unclear')
      expect(item.source.description).toContain('https://')
      expect(battles.has(item.battleId),item.id).toBe(true)
      expect(item.uncertainty.length).toBeGreaterThan(40)
      expect(lookup(item.subjectCharacterId).items.some(i=>i.evidenceIds.includes(item.id))).toBe(true)
    }
    for(const characterId of ['lucci','marco']){
      expect(validateEvaluation(lookup(characterId),refs)).toEqual({valid:true,errors:[]})
    }
  })
  it('retains frozen 5 Overall baselines, 11 other calibration candidate evaluations and all score axes not singled out',()=>{
    const locked=calibrationAnchorsV0172.filter(a=>a.decision==='locked-overall')
    expect(locked).toHaveLength(5)
    for(const anchor of locked)expect(overall(anchor.characterId)).toBeCloseTo(anchor.finalScores.reduce((s,x)=>s+x,0)/7,10)
    for(const anchor of calibrationAnchorsV0172){
      if(anchor.characterId==='marco'){
        expect(overall('marco')).toBeCloseTo(anchor.finalScores.reduce((s,x)=>s+x,0)/7+2/7,10)
        continue
      }
      expect(overall(anchor.characterId)).toBeCloseTo(anchor.finalScores.reduce((s,x)=>s+x,0)/7,10)
    }
    expect(score('marco','defense')).toBe(87)
    expect(score('lucci','speed')).toBe(82)
    expect(score('jinbe','attack')).toBe(76)
    expect(score('whos-who','attack')).toBe(79)
    expect(score('koby','attack')).toBe(77)
    expect(score('doflamingo','techniqueMastery')).toBe(87)
    expect(score('queen','attack')).toBe(80)
    expect(score('cracker','defense')).toBe(81)
    expect(score('ace','combatIQ')).toBe(67)
    expect(score('teach','attack')).toBe(95)
  })
  it('enforces unchanged source-of-truth roster and Raw, while ranking gets only documented +2/7 and +6/7',()=>{
    expect(sampleCharacters).toHaveLength(66)
    expect(sampleMemberships).toHaveLength(84)
    expect(sampleEvaluations).toHaveLength(68)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(65)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(476)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false).flatMap(e=>e.items).reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(230)
    const rank=getStatRanking('overall')
    expect(rank).toHaveLength(65)
    expect(rank.find(r=>r.characterId==='marco')?.score).toBeCloseTo(586/7,10)
    expect(rank.find(r=>r.characterId==='lucci')?.score).toBeCloseTo(552/7,10)
  })
})
