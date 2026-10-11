import { describe, expect, it } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleEvaluations as liveSampleEvaluations, historicalEvaluationsBeforeV0174 } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleMemberships } from './memberships'
import { sampleMatchups } from './matchups'
import { calibrationAnchorsV0172 } from './v0172AnchorBaseline'
import { balancedV12 } from './calculationModels'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { applyV0174EvaluationCorrection } from './v0174TargetedCalibration'
import { applyV0175GrusEvidenceReview, v0175GrusBattle, v0175GrusEvidence, v0175ReviewDecisions } from './v0175FocusedReview'

// Locked cohort from v0.1.75 through current overlays, excluding v0.1.80 additions.
const sampleEvaluations=liveSampleEvaluations.filter(e=>!['smoker','tashigi','ivankov','inazuma'].includes(e.characterId))
const current=(id:string)=>{
  const e=sampleEvaluations.find(x=>x.characterId===id && x.isDefault!==false)
  if(!e)throw Error('missing '+id)
  return e
}
const score=(id:string,stat:string)=>{
  const item=current(id).items.find(x=>x.stat===stat)
  if(!item)throw Error('missing axis '+id+'/'+stat)
  return getFinalStatScore(item)
}
const overall=(id:string)=>calculateBalancedCombatPower(current(id),balancedV12).finalScore

describe('v0.1.75 — evidence expansion without unearned numeric changes',()=>{
  it('records Grus clay golem area denial separately from the shared TV1122 protective feat',()=>{
    expect(sampleBattles.some(b=>b.id===v0175GrusBattle.id)).toBe(true)
    const ev=sampleEvidence.filter(e=>e.id===v0175GrusEvidence.id)
    expect(ev).toHaveLength(1)
    expect(ev[0].source.type).toBe('supplementary')
    expect(ev[0].source.description).toBe('https://one-piece.com/anime/68048/index.html')
    expect(ev[0].subjectCharacterId).toBe('prince-grus')
    expect(ev[0].battleId).toBe(v0175GrusBattle.id)
    expect(ev[0].statContributions.find(c=>c.stat==='versatility')?.role).toBe('primary')
    expect(ev[0].statContributions.find(c=>c.stat==='combatIQ')?.role).toBe('context')
    expect(new Set(sampleBattles.map(b=>b.id)).size).toBe(sampleBattles.length)
    expect(new Set(sampleEvidence.map(e=>e.id)).size).toBe(sampleEvidence.length)
    const g=current('prince-grus')
    expect(g.items.find(i=>i.stat==='versatility')?.evidenceIds).toContain(v0175GrusEvidence.id)
    expect(g.items.find(i=>i.stat==='techniqueMastery')?.evidenceIds).toContain(v0175GrusEvidence.id)
    expect(g.items.find(i=>i.stat==='combatIQ')?.evidenceIds).not.toContain(v0175GrusEvidence.id)
    expect(g.evaluationDataVersion).toBe('evaluation-0.1.77-grus-single-clay-system-versatility-calibrated')
  })

  it('never turns Grus old seed or historical snapshot into the updated current version',()=>{
    const old=historicalEvaluationsBeforeV0174.find(e=>e.characterId==='prince-grus')!
    expect(old.evaluationDataVersion).toBe('evaluation-0.1.70-expansion-draft')
    expect(old.items.find(i=>i.stat==='versatility')?.evidenceIds).not.toContain(v0175GrusEvidence.id)
    expect(old.items.find(i=>i.stat==='versatility')?.rationale).not.toEqual(current('prince-grus').items.find(i=>i.stat==='versatility')?.rationale)
    expect(()=>applyV0175GrusEvidenceReview(old)).not.toThrow()
    expect(()=>applyV0175GrusEvidenceReview(current('prince-grus'))).toThrow(/baseline mismatch/)
    const originalChanged={...old,items:old.items.map(i=>i.stat==='versatility'?{...i,baseScore:84,score:84}:i)}
    expect(()=>applyV0175GrusEvidenceReview(originalChanged)).toThrow(/baseline mismatch/)
  })

  it('keeps all 65 default seven-axis Final scores exactly at post-v0.1.74 baseline',()=>{
    const previous=historicalEvaluationsBeforeV0174.map(applyV0174EvaluationCorrection)
    const baselineV0175=previous.map(applyV0175GrusEvidenceReview)
    const before=new Map(baselineV0175.map(e=>[e.id,e]))
    expect(sampleEvaluations).toHaveLength(68)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(65)
    for(const e of sampleEvaluations){
      const old=before.get(e.id)
      expect(old).toBeDefined()
      if(e.characterId==='koby'){
        expect(old!.items.map(i=>getFinalStatScore(i))).toEqual([82,73,77,78,77,76,67])
        expect(e.items.map(i=>getFinalStatScore(i))).toEqual([77,73,77,78,77,72,67])
      } else if(e.characterId==='prince-grus'){
        expect(old!.items.map(i=>getFinalStatScore(i))).toEqual([72,77,74,71,81,78,85])
        expect(e.items.map(i=>getFinalStatScore(i))).toEqual([72,77,74,71,81,78,80])
      } else if(e.characterId==='queen'){
        expect(old!.items.find(i=>i.stat==='versatility')?.score).toBe(80)
        expect(e.items.find(i=>i.stat==='versatility')?.score).toBe(82)
        expect(e.items.filter(i=>i.stat!=='versatility').map(i=>i.score))
          .toEqual(old!.items.filter(i=>i.stat!=='versatility').map(i=>i.score))
      } else expect(e.items.map(i=>getFinalStatScore(i)),e.characterId).toEqual(old!.items.map(i=>getFinalStatScore(i)))
      expect(e.items.map(i=>getRawHakiContributionTotal(i)),e.characterId)
        .toEqual(old!.items.map(i=>getRawHakiContributionTotal(i)))
    }
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(476)
    expect(sampleCharacters).toHaveLength(70)
    expect(sampleMemberships).toHaveLength(92)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false).flatMap(e=>e.items)
      .reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e=>e.items)
      .reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(230)
  })

  it('retains five frozen anchor Overall scores, target scale and full ranking',()=>{
    for(const a of calibrationAnchorsV0172.filter(a=>a.decision==='locked-overall')){
      expect(overall(a.characterId),a.characterId)
        .toBeCloseTo(a.finalScores.reduce((s,v)=>s+v,0)/7,10)
    }
    expect(score('koby','attack')).toBe(77)
    expect(score('prince-grus','versatility')).toBe(80)
    expect(score('marco','attack')).toBe(79)
    expect(score('king','attack')).toBe(83)
    expect(score('jinbe','attack')).toBe(76)
    expect(score('whos-who','attack')).toBe(79)
    expect(score('doflamingo','techniqueMastery')).toBe(87)
    expect(score('doflamingo','versatility')).toBe(83)
    expect(score('queen','techniqueMastery')).toBe(79)
    expect(score('cracker','techniqueMastery')).toBe(80)
    expect(score('lucci','combatIQ')).toBe(74)
    expect(score('crocodile','combatIQ')).toBe(86)
    expect(score('stussy','combatIQ')).toBe(85)
    expect(overall('lucci')).toBeCloseTo(552/7,10)
    expect(overall('marco')).toBeCloseTo(586/7,10)
    expect(getStatRanking('overall')).toHaveLength(69)
    expect(v0175ReviewDecisions.every(d=>d.decision.startsWith('retain'))).toBe(true)
    for(const decision of v0175ReviewDecisions){
      if(decision.characterId==='koby'){
        // Read-only v0.1.75 decision is preserved as history, not retroactively overwritten.
        expect(decision.finalScore).toBe(82)
        expect(score('koby','attack')).toBe(77)
      } else if(decision.characterId==='prince-grus'){
        expect(decision.finalScore).toBe(85) // original v0.1.75 historical judgement
        expect(score('prince-grus','versatility')).toBe(80)
      } else if(decision.characterId==='queen'){
        expect(decision.finalScore).toBe(80) // Retrospective v0.1.75 judgement remains frozen.
        expect(score('queen','versatility')).toBe(82) // Current v0.1.79 independent calibration.
      } else expect(score(decision.characterId,decision.axis)).toBe(decision.finalScore)
    }
  })
})
