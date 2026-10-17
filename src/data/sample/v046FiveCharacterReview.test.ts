import {describe,it,expect} from 'vitest'
import {evaluationsBeforeV046,evaluationsBeforeV049 as sampleEvaluations} from './evaluations'
import {v046Decisions} from './v046FiveCharacterReview'
import {sampleEvidence} from './evidence'
import {getFinalStatScore,getRawHakiContributionTotal} from '../../domain/evaluation/score'
import {getCombatPower} from '../../application/getCombatPower'
import {getStatRanking} from '../../application/getStatRanking'
import {getMatchupHubEntries} from '../../application/getMatchupHub'
import {auditCombatDataset} from '../integrity/auditDataset'
import {liveDataset} from '../integrity/v033Snapshot'
import {balancedV12} from './calculationModels'
import {calculateBalancedCombatPower} from '../../domain/calculation/calculateCombatPower'
import {patchHistory} from '../patchHistory'
import {versionManifest} from '../integrity/versionManifest'

const byChar=(rows:typeof sampleEvaluations,id:string)=>rows.find(x=>x.characterId===id&&x.isDefault!==false)!
const scores=(id:string)=>byChar(sampleEvaluations,id).items.map(x=>getFinalStatScore(x))

describe('v0.4.6 five-character audited recalibration and state-aware rankings',()=>{
 it('scores 15 axes with owned canon evidence and balanced final results',()=>{
   expect(v046Decisions).toHaveLength(15)
   expect(new Set(v046Decisions.map(d=>d.characterId+':'+d.stat)).size).toBe(15)
   for(const d of v046Decisions){
     expect(d.rationale.length).toBeGreaterThan(75)
     expect(d.counterargument.length).toBeGreaterThan(35)
     expect(d.evidenceIds.length).toBeGreaterThan(0)
     expect(d.evidenceIds.every(id=>sampleEvidence.some(e=>e.id===id&&e.subjectCharacterId===d.characterId))).toBe(true)
     const before=byChar(evaluationsBeforeV046,d.characterId).items.find(i=>i.stat===d.stat)!
     const after=byChar(sampleEvaluations,d.characterId).items.find(i=>i.stat===d.stat)!
     expect(getFinalStatScore(before)).toBe(d.from)
     expect(getFinalStatScore(after)).toBe(d.to)
     expect(after.readiness).toBe(d.readiness)
     expect(after.hakiContributions).toEqual(before.hakiContributions)
     expect(getRawHakiContributionTotal(after)).toBe(getRawHakiContributionTotal(before))
   }
   expect(scores('kuzan')).toEqual([93,92,97,90,93,91,92])
   expect(scores('akainu')).toEqual([97,95,97,87,93,93,93])
   expect(scores('kizaru')).toEqual([93,90,91,99,95,91,94])
   expect(scores('shanks')).toEqual([97,93,88,95,96,94,91])
   expect(scores('mihawk')).toEqual([97,93,91,94,99,92,86])
   for(const [id,total] of [['kuzan',648],['akainu',655],['kizaru',653],['shanks',654],['mihawk',652],['teach',650]] as const){
     expect(getCombatPower(id).finalScore).toBeCloseTo(total/7,12)
   }
   expect(getFinalStatScore(byChar(sampleEvaluations,'kizaru').items.find(i=>i.stat==='defense')!)).toBe(90)
   expect(byChar(sampleEvaluations,'kizaru').items.find(i=>i.stat==='defense')?.baseScore).toBe(89)
   expect(byChar(sampleEvaluations,'shanks').items.find(i=>i.stat==='combatIQ')?.baseScore).toBe(92)
 })
 it('preserves every v0.4.5 record except 15 decisions and never mutates history',()=>{
   expect(sampleEvaluations).toHaveLength(76)
   expect(evaluationsBeforeV046).toHaveLength(76)
   expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(532)
   const changed=new Set(v046Decisions.map(d=>d.characterId+':'+d.stat))
   for(const original of evaluationsBeforeV046){
     const current=sampleEvaluations.find(e=>e.id===original.id)!
     expect(current).toBeDefined()
     for(const i of original.items){
       const next=current.items.find(x=>x.stat===i.stat)!
       if(!changed.has(original.characterId+':'+i.stat))expect(next).toEqual(i)
     }
     if(!v046Decisions.some(d=>d.characterId===original.characterId))expect(current).toEqual(original)
     else expect(current.evaluationDataVersion).toBe('evaluation-0.4.6-five-character-context-cross-axis-review')
   }
   expect(byChar(evaluationsBeforeV046,'shanks').items.find(x=>x.stat==='defense')?.score).toBe(91)
   expect(balancedV12.version).toBe('1.2')
   expect(balancedV12.configuration.hakiWeight).toBe(0.5)
   expect(auditCombatDataset(liveDataset).errors).toEqual([])
   expect(getMatchupHubEntries()).toHaveLength(18)
   expect(versionManifest.appVersion).toBe('0.4.30')
   expect(versionManifest.coreDataVersion).toBe('core-v0.4.30')
   expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.30')
   expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
 })
 it('keeps exactly 72 ranking identities; selection changes only that character value and ranks',()=>{
   const base=getStatRanking('overall')
   expect(base).toHaveLength(83)
   expect(new Set(base.map(x=>x.characterId)).size).toBe(83)
   const g4=getStatRanking('overall',{luffy:'egghead-gear4'})
   const g5=getStatRanking('overall',{luffy:'egghead-gear5'})
   expect(g4.find(x=>x.characterId==='luffy')).toMatchObject({subjectStateId:'egghead-gear4',score:635/7})
   expect(g5.find(x=>x.characterId==='luffy')).toMatchObject({subjectStateId:'egghead-gear5',score:657/7})
   expect(g4.find(x=>x.characterId==='luffy')?.rank).toBeGreaterThan(g5.find(x=>x.characterId==='luffy')!.rank)
   const old=getStatRanking('overall',{newgate:'marineford'})
   const current=getStatRanking('overall',{newgate:'prime'})
   expect(old).toHaveLength(83)
   expect(old.find(x=>x.characterId==='newgate')?.score).toBeCloseTo(getCombatPower('newgate','balanced','marineford').finalScore,12)
   expect(current.find(x=>x.characterId==='newgate')?.score).toBeCloseTo(getCombatPower('newgate','balanced','prime').finalScore,12)
   expect(old.find(x=>x.characterId==='newgate')?.score).toBeLessThan(current.find(x=>x.characterId==='newgate')!.score)
   expect(old.find(x=>x.characterId==='roger')?.score).toBe(base.find(x=>x.characterId==='roger')!.score)
   expect(g4.find(x=>x.characterId==='luffy')?.stateOptions?.length).toBe(2)
   expect(old.find(x=>x.characterId==='newgate')?.stateOptions?.length).toBe(2)
   const invalid=getStatRanking('overall',{luffy:'nonexistent'})
   expect(invalid.find(x=>x.characterId==='luffy')?.score).toBe(base.find(x=>x.characterId==='luffy')?.score)
   for(const list of [base,g4,old]){
     for(let i=1;i<list.length;i++){
       expect(list[i-1].score).toBeGreaterThanOrEqual(list[i].score)
       if(list[i].score===list[i-1].score)expect(list[i].rank).toBe(list[i-1].rank)
     }
   }
 })
 it('records 15 new history revisions, without rewriting earlier patch records',()=>{
   const previousPatch=patchHistory.find(p=>p.version==='v0.4.6')!
   expect(previousPatch).toBeDefined()
   const changes=previousPatch.changes.filter(x=>x.kind==='score')
   expect(changes).toHaveLength(15)
   for(const d of v046Decisions){
     expect(changes.some(c=>c.characterId===d.characterId&&c.stat===d.stat&&c.before===d.from&&c.after===d.to)).toBe(true)
   }
   expect(patchHistory.find(x=>x.version==='v0.4.5')?.changes.filter(x=>x.kind==='score')).toHaveLength(2)
   expect(getCombatPower('teach').finalScore).toBeCloseTo(calculateBalancedCombatPower(byChar(evaluationsBeforeV046,'teach'),balancedV12).finalScore,12)
 })
})
