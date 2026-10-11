import { describe, it, expect } from 'vitest'
import { sampleEvaluations as liveSampleEvaluations, historicalEvaluationsBeforeV0174 } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleCharacters } from './characters'
import { sampleMemberships } from './memberships'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { calibrationAnchorsV0172 } from './v0172AnchorBaseline'
import { applyV0174EvaluationCorrection } from './v0174TargetedCalibration'
import { applyV0175GrusEvidenceReview } from './v0175FocusedReview'
import { applyV0176KobyAttackCorrection } from './v0176KobyAttackRecalibration'
import { applyV0177KobyGrusRecalibration } from './v0177KobyGrusRecalibration'
import { applyV0178FocusedEvidenceReview } from './v0178KobySmoothieContextAudit'
import { applyV0179CommanderAxisReview, v0179OfficialEvidence, v0179ReviewMatrix } from './v0179CommanderAxisReview'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { validateEvaluation } from '../../domain/evaluation/validation'

// v0.1.79 score calibration locked to the 65-character cohort; v0.1.80 expansion audited separately.
const sampleEvaluations=liveSampleEvaluations.filter(e=>!['smoker','tashigi','ivankov','inazuma'].includes(e.characterId))
const oldSnapshot=()=>historicalEvaluationsBeforeV0174.map(applyV0174EvaluationCorrection)
  .map(applyV0175GrusEvidenceReview).map(applyV0176KobyAttackCorrection)
  .map(applyV0177KobyGrusRecalibration).map(applyV0178FocusedEvidenceReview)
const get=(id:string)=> {
  const value=sampleEvaluations.find(e=>e.characterId===id && e.isDefault!==false)
  if(!value)throw Error('Missing evaluation: '+id)
  return value
}
const scores=(e:typeof sampleEvaluations[number])=>e.items.map(i=>getFinalStatScore(i))
const raws=(e:typeof sampleEvaluations[number])=>e.items.map(i=>getRawHakiContributionTotal(i))
const overall=(e:typeof sampleEvaluations[number])=>calculateBalancedCombatPower(e,balancedV12).finalScore
const byStat=(id:string,stat:string)=>get(id).items.find(i=>i.stat===stat)!

describe('v0.1.79 — nine-axis Smoothie/Cracker/Queen source and scoring audit',()=>{
  it('changes only Queen versatility 80→82 and keeps other eight commander axes intact',()=>{
    expect(v0179ReviewMatrix).toHaveLength(9)
    const rows=[
      ['smoothie','attack',76,'E2'],['smoothie','techniqueMastery',80,'E2'],
      ['smoothie','versatility',78,'E2'],['cracker','attack',77,'E2'],
      ['cracker','techniqueMastery',80,'E2'],['cracker','versatility',77,'E2'],
      ['queen','attack',80,'E2'],['queen','techniqueMastery',79,'E2'],
      ['queen','versatility',82,'E2'],
    ] as const
    for(const [id,stat,final,ready] of rows){
      const v=byStat(id,stat)
      expect(getFinalStatScore(v),id+stat).toBe(final)
      expect(v.readiness).toBe(ready)
      expect(v0179ReviewMatrix.find(x=>x.characterId===id&&x.stat===stat)?.after).toBe(final)
    }
    expect(v0179ReviewMatrix.filter(x=>x.after!==x.before).map(x=>[x.characterId,x.stat,x.before,x.after]))
      .toEqual([['queen','versatility',80,82]])
    expect(scores(get('queen'))).toEqual([80,81,81,75,79,74,82])
    expect(scores(get('cracker'))).toEqual([77,81,80,75,80,75,77])
    expect(scores(get('smoothie'))).toEqual([76,75,76,74,80,77,78])
    expect(overall(get('queen'))).toBeCloseTo(552/7,10)
    expect(overall(get('cracker'))).toBeCloseTo(545/7,10)
    expect(overall(get('smoothie'))).toBeCloseTo(536/7,10)
    expect(getRawHakiContributionTotal(byStat('cracker','attack'))).toBe(4)
    expect(byStat('cracker','attack').baseScore).toBe(75)
    expect(getFinalStatScore(byStat('cracker','attack'))).toBe(77)
    expect(getRawHakiContributionTotal(byStat('queen','versatility'))).toBe(0)
  })

  it('preserves exactly 454/455 default Final stats, other 63 people and all Raw and non-target data',()=>{
    const before=new Map(oldSnapshot().map(e=>[e.id,e]))
    expect(sampleEvaluations).toHaveLength(68)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(65)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(476)
    let numericChanges=0
    let metadataChanges=0
    for(const after of sampleEvaluations){
      const prior=before.get(after.id)!
      expect(prior,after.id).toBeDefined()
      expect(raws(after)).toEqual(raws(prior))
      for(const stat of after.items){
        const older=prior.items.find(x=>x.stat===stat.stat)!
        if(stat.score!==older.score){
          numericChanges++
          expect(after.characterId).toBe('queen')
          expect(stat.stat).toBe('versatility')
          expect(getFinalStatScore(older)).toBe(80)
          expect(getFinalStatScore(stat)).toBe(82)
        } else if(after.characterId!=='queen'&&after.characterId!=='cracker'){
          expect(stat).toEqual(older)
        }
      }
      if(['queen','cracker'].includes(after.characterId)){
        metadataChanges++
        expect(after.evaluationDataVersion).not.toBe(prior.evaluationDataVersion)
      }else expect(after).toEqual(prior)
      if(after.characterId!=='queen')expect(overall(after)).toBeCloseTo(overall(prior),10)
    }
    expect(numericChanges).toBe(1)
    expect(metadataChanges).toBe(2)
    expect(sampleCharacters).toHaveLength(70)
    expect(sampleMemberships).toHaveLength(92)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(.5)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false).flatMap(e=>e.items)
      .reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e=>e.items)
      .reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(230)
  })

  it('links four real official supplementary sources to owned historical Battles and only appropriate current axes',()=>{
    expect(v0179OfficialEvidence).toHaveLength(4)
    const battles=new Set(sampleBattles.map(x=>x.id))
    const owners=sampleEvidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    expect(new Set(sampleEvidence.map(x=>x.id)).size).toBe(sampleEvidence.length)
    for(const ev of v0179OfficialEvidence){
      expect(sampleEvidence.filter(x=>x.id===ev.id)).toHaveLength(1)
      expect(ev.source.type).toBe('supplementary')
      expect(ev.source.description).toMatch(/^https:\/\/one-piece.com\/anime\//)
      expect(battles.has(ev.battleId)).toBe(true)
      expect(ev.evidenceStrength).toBe('moderate')
    }
    expect(v0179OfficialEvidence.filter(x=>x.subjectCharacterId==='queen')).toHaveLength(2)
    expect(v0179OfficialEvidence.filter(x=>x.subjectCharacterId==='cracker')).toHaveLength(2)
    const queenIds=v0179OfficialEvidence.filter(x=>x.subjectCharacterId==='queen').map(x=>x.id)
    const crackerIds=v0179OfficialEvidence.filter(x=>x.subjectCharacterId==='cracker').map(x=>x.id)
    for(const id of queenIds)expect(byStat('queen','versatility').evidenceIds).toContain(id)
    for(const id of crackerIds)expect(byStat('cracker','techniqueMastery').evidenceIds).toContain(id)
    expect(byStat('queen','attack').evidenceIds.some(id=>id.startsWith('evidence-v0179'))).toBe(false)
    expect(byStat('queen','techniqueMastery').evidenceIds.some(id=>id.startsWith('evidence-v0179'))).toBe(false)
    expect(byStat('smoothie','attack').evidenceIds).toContain('evidence-v0178-smoothie-nami-jinbe-steering-tv868')
    expect(v0179OfficialEvidence.find(x=>x.id===queenIds[1])?.statContributions.find(x=>x.stat==='attack')?.role).toBe('context')
    for(const id of ['queen','cracker','smoothie'])
      expect(validateEvaluation(get(id),owners)).toEqual({valid:true,errors:[]})
    expect(get('queen').evaluationDataVersion).toBe('evaluation-0.1.79-queen-multi-system-versatility-calibrated')
    expect(get('cracker').evaluationDataVersion).toBe('evaluation-0.1.79-cracker-mastery-official-evidence-expanded')
    expect(get('smoothie').evaluationDataVersion).toBe('evaluation-0.1.78-smoothie-jinbe-steering-evidence-only')
  })

  it('replays frozen earlier versions and checks all locked anchors, overall ranking and guardrails',()=>{
    const old=oldSnapshot()
    const queen=old.find(x=>x.characterId==='queen')!
    const cracker=old.find(x=>x.characterId==='cracker')!
    expect(queen.evaluationDataVersion).toBe('evaluation-0.1.26-draft')
    expect(cracker.evaluationDataVersion).toBe('evaluation-0.1.26-draft')
    expect(scores(queen)).toEqual([80,81,81,75,79,74,80])
    expect(scores(cracker)).toEqual(scores(get('cracker')))
    expect(queen.items.find(i=>i.stat==='versatility')?.evidenceIds.some(x=>x.includes('v0179'))).toBe(false)
    expect(cracker.items.find(i=>i.stat==='techniqueMastery')?.evidenceIds.some(x=>x.includes('v0179'))).toBe(false)
    expect(()=>applyV0179CommanderAxisReview(get('queen'))).toThrow(/source version mismatch/)
    expect(()=>applyV0179CommanderAxisReview(get('cracker'))).toThrow(/source version mismatch/)
    const bad={...queen,items:queen.items.map(i=>i.stat==='versatility'?{...i,baseScore:81,score:81}:i)}
    expect(()=>applyV0179CommanderAxisReview(bad)).toThrow(/source stat mismatch/)
    for(const a of calibrationAnchorsV0172.filter(x=>x.decision==='locked-overall')){
      expect(overall(get(a.characterId))).toBeCloseTo(a.finalScores.reduce((s,v)=>s+v,0)/7,10)
    }
    const ranks=getStatRanking('overall')
    expect(ranks).toHaveLength(69)
    expect(ranks.find(x=>x.characterId==='queen')?.score).toBeCloseTo(552/7,10)
    expect(ranks.find(x=>x.characterId==='cracker')?.score).toBeCloseTo(545/7,10)
    expect(ranks.find(x=>x.characterId==='smoothie')?.score).toBeCloseTo(536/7,10)
  })
})
