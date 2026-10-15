import { describe, expect, it } from 'vitest'
import { sampleEvaluations, evaluationsBeforeV049 } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { v049Decisions, v049KobyTorpedoBattle, v049KobyTorpedoEvidence } from './v049KobySmokerRecalibration'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { versionManifest } from '../integrity/versionManifest'
import { balancedV12 } from './calculationModels'

const find=(id:string,rows=sampleEvaluations)=>rows.find(e=>e.characterId===id&&e.isDefault!==false)!
describe('v0.4.9 approved Koby/Smoker live recalibration',()=>{
 it('changes only approved 11 scores and preserves prior v0.4.6 evaluated input',()=>{
   expect(v049Decisions).toHaveLength(2)
   for(const d of v049Decisions){
     expect(find(d.characterId,evaluationsBeforeV049).items.map(i=>getFinalStatScore(i))).toEqual(d.from)
     const next=find(d.characterId)
     expect(next.items.map(i=>getFinalStatScore(i))).toEqual(d.to)
     expect(next.items.map(i=>i.readiness)).toEqual(d.readiness)
     expect(next.items.every(i=>getRawHakiContributionTotal(i)===0)).toBe(true)
   }
   for(const original of evaluationsBeforeV049){
     if(['koby','smoker'].includes(original.characterId))continue
     expect(sampleEvaluations.find(e=>e.id===original.id)).toEqual(original)
   }
   expect(sampleEvaluations).toHaveLength(76)
   expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(532)
   expect(sampleEvaluations.flatMap(e=>e.items).reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(230)
 })
 it('registers TV879 supplementary scene with correct ownership and context',()=>{
   expect(sampleBattles).toContainEqual(v049KobyTorpedoBattle)
   expect(sampleEvidence).toContainEqual(v049KobyTorpedoEvidence)
   expect(v049KobyTorpedoEvidence.source.type).toBe('supplementary')
   expect(find('koby').items.find(i=>i.stat==='speed')?.evidenceIds).toContain(v049KobyTorpedoEvidence.id)
 })
 it('keeps 72 character rankings, calculation model, versioned snapshot',()=>{
   expect(getCombatPower('koby').finalScore).toBeCloseTo(497/7,10)
   expect(getCombatPower('smoker').finalScore).toBeCloseTo(520/7,10)
   expect(getStatRanking('overall')).toHaveLength(72)
   expect(balancedV12.version).toBe('1.2')
   expect(balancedV12.configuration.hakiWeight).toBe(.5)
   expect(versionManifest.appVersion).toBe('0.4.10')
   expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.9')
   expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
 })
})
