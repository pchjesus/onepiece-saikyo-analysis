// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { validateCalibrationReview } from '../../domain/evaluation/bidirectionalCalibration'
import { v0431SweetReviews, v0431SweetChanges, prepareV0431ReviewSource,
  applyV0431SweetCalibration, applyV0431SweetEvidenceImpact } from './v0431SweetCommanders'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { versionManifest } from '../integrity/versionManifest'
import { matchupRepository } from '../repositories/matchupRepository'
import { patchHistory } from '../patchHistory'
import { CharacterPage } from '../../ui/pages/CharacterPage'
const inputs:Record<string,{before:number[],after:number[],readiness:string[]}>={
 katakuri:{before:[83,84,84,84,87,82,84],after:[83,84,85,84,89,85,85],
  readiness:['E2','E2','E2','E2','E2','E2','E2']},
 cracker:{before:[77,81,80,75,80,75,77],after:[78,82,82,75,83,77,80],
  readiness:['E2','E2','E2','E3','E2','E2','E2']},
 smoothie:{before:[76,75,76,74,80,77,78],after:[80,75,78,74,84,78,82],
  readiness:['E2','E3','E3','E3','E2','E3','E2']},
}
const sum=(values:number[])=>values.reduce((a,b)=>a+b,0)
describe('v0.4.31 Katakuri Cracker Smoothie bidirectional 7-axis calibration',()=>{
 it('validates 21 axes, source versions, complete bilateral reasoning and unchanged axes',()=>{
  expect(v0431SweetReviews.map(x=>x.characterId)).toEqual(['katakuri','cracker','smoothie'])
  expect(v0431SweetChanges).toHaveLength(15)
  for(const review of v0431SweetReviews){
   const raw=sampleEvaluations.find(e=>e.characterId===review.characterId)!
   const source=prepareV0431ReviewSource(raw)
   expect(validateCalibrationReview(source,review)).toEqual([])
   expect(review.sourceDataVersion).toBe(raw.evaluationDataVersion)
   expect(review.axes.map(x=>x.stat)).toEqual([...COMBAT_STATS])
   expect(review.axes.map(x=>x.expectedFinal)).toEqual(inputs[review.characterId].before)
   expect(review.axes.map(x=>x.proposedFinal)).toEqual(inputs[review.characterId].after)
   expect(review.axes.map(x=>x.readiness)).toEqual(inputs[review.characterId].readiness)
   expect(review.axes.every(x=>x.observed.length>12&&x.context.length>12&&x.inference.length>12
       &&x.inflationRisk.length>12&&x.deflationRisk.length>12&&x.judgement.length>12)).toBe(true)
   expect(validateCalibrationReview(source,{...review,sourceDataVersion:'bad'}))
       .toContain('Source evaluation version drift')
   expect(validateCalibrationReview(source,{...review,axes:review.axes.slice(1)}))
       .toContain('Exactly seven axis reviews are required')
   expect(validateCalibrationReview(source,{...review,axes:review.axes.map((x,i)=>i===0?{...x,deflationRisk:''}:x)}))
       .toContain('Incomplete deflationRisk for attack')
  }
  expect(v0431SweetChanges.filter(x=>x.characterId==='katakuri')).toHaveLength(4)
  expect(v0431SweetChanges.filter(x=>x.characterId==='cracker')).toHaveLength(6)
  expect(v0431SweetChanges.filter(x=>x.characterId==='smoothie')).toHaveLength(5)
 })
 it('recalculates only three character drafts, distinguishing source score, average and advanced versus ordinary Haki',()=>{
  for(const [id,t] of Object.entries(inputs)){
   const old=sampleEvaluations.find(x=>x.characterId===id)!
   const live=evaluationRepository.getEvaluation(id)!
   expect(old.items.map(item=>getFinalStatScore(item))).toEqual(t.before)
   expect(live).not.toBe(old)
   expect(live.items.map(x=>x.score)).toEqual(t.after)
   expect(live.items.map(x=>getFinalStatScore(x))).toEqual(t.after)
   expect(live.items.map(x=>x.readiness)).toEqual(t.readiness)
   expect(live.evaluationDataVersion).toBe('evaluation-v0.4.31-bidirectional-sweet-commanders')
   expect(live.status).toBe('draft')
   expect(live.items.every(x=>x.rationale.includes('과대평가 위험')&&x.rationale.includes('과소평가 위험')
     &&x.rationale.includes('합리적 추론'))).toBe(true)
   expect(applyV0431SweetCalibration(old)).toEqual(live)
   expect(getCombatPower(id).finalScore).toBeCloseTo(sum(t.after)/7,12)
   expect(getStatRanking('overall').find(x=>x.characterId===id)?.score).toBeCloseTo(sum(t.after)/7,12)
  }
  const k=evaluationRepository.getEvaluation('katakuri')!
  expect(k.items.find(x=>x.stat==='defense')?.baseScore).toBe(81)
  expect(k.items.find(x=>x.stat==='techniqueMastery')?.baseScore).toBe(86)
  expect(getRawHakiContributionTotal(k.items.find(x=>x.stat==='defense')!)).toBe(6)
  expect(getRawHakiContributionTotal(k.items.find(x=>x.stat==='techniqueMastery')!)).toBe(6)
  const cracker=evaluationRepository.getEvaluation('cracker')!
  expect(getRawHakiContributionTotal(sampleEvaluations.find(x=>x.characterId==='cracker')!.items[0])).toBe(4)
  expect(cracker.items.every(x=>getRawHakiContributionTotal(x)===0)).toBe(true)
  expect(cracker.items[0].baseScore).toBe(78)
  const sm=evaluationRepository.getEvaluation('smoothie')!
  expect(sampleEvaluations.find(x=>x.characterId==='smoothie')!.items.find(x=>x.stat==='speed')!.evidenceIds).toEqual([])
  expect(sm.items.find(x=>x.stat==='speed')?.evidenceIds).toEqual(['evidence-smoothie-pursuit-894'])
  expect(sm.items.find(x=>x.stat==='speed')?.score).toBe(74)
  expect(sm.items.find(x=>x.stat==='speed')?.readiness).toBe('E3')
 })
 it('preserves ordinary Armament facts and Haki profiles while updating current Evidence interpretation',()=>{
  const old=sampleEvidence.find(x=>x.id==='evidence-cracker-biscuit-837-838')!
  const current=evidenceRepository.getEvidenceForCharacter('cracker').find(x=>x.id===old.id)!
  expect(current.fact).toEqual(old.fact)
  expect(current.source).toEqual(old.source)
  expect(current.supportedAbilities).toEqual(old.supportedAbilities)
  expect(current.evaluationImpact).toContain('Raw')
  expect(current.evaluationImpact).toContain('Base')
  expect(current).toEqual(applyV0431SweetEvidenceImpact(old))
  expect(applyV0431SweetEvidenceImpact(sampleEvidence.find(x=>x.id==='evidence-katakuri-future-sight-881-884')!))
    .toBe(sampleEvidence.find(x=>x.id==='evidence-katakuri-future-sight-881-884')!)
 })
 it('maintains integrity, historical v0.3.3 and v0.4.28-30 results, membership and matchup counts',()=>{
  expect(versionManifest).toMatchObject({
   appVersion:'0.4.31',coreDataVersion:'core-v0.4.31',evaluationSetVersion:'evaluation-set-v0.4.31',
   calculationModelId:'balanced',calculationModelVersion:'1.2',baselineSnapshotVersion:'v0.3.3',
  })
  expect(v050CurrentDataset.characters).toHaveLength(82)
  expect(v050CurrentDataset.evaluations).toHaveLength(88)
  expect(v050CurrentDataset.evaluations.flatMap(x=>x.items)).toHaveLength(616)
  expect(v050CurrentDataset.memberships).toHaveLength(107)
  expect(matchupRepository.getAllMatchups()).toHaveLength(18)
  const links=v050CurrentDataset.evidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
  for(const [id,t] of Object.entries(inputs)){
   const item=v050CurrentDataset.evaluations.find(e=>e.characterId===id)!
   expect(item).toEqual(evaluationRepository.getEvaluation(id))
   expect(validateEvaluation(item,links).errors).toEqual([])
   expect(buildV050ReadOnlyAudit().rows.filter(x=>x.characterId===id).map(x=>x.final)).toEqual(t.after)
  }
  expect(buildV050ReadOnlyAudit().integrity.errors).toEqual([])
  expect(buildV050ReadOnlyAudit().counts).toEqual({
   characters:82,evaluatedCharacters:82,evaluations:88,axes:616,memberships:107,matchups:18,
  })
  for(const id of ['king','queen','jack','marco','jozu','vista','usopp','ashura-doji','inuarashi','nekomamushi']){
   const old=evaluationRepository.getEvaluation(id)!
   expect(applyV0431SweetCalibration(old)).toBe(old)
  }
  expect(getCombatPower('king').finalScore).toBeCloseTo(84,12)
  expect(getCombatPower('queen').finalScore).toBeCloseTo(80,12)
  expect(getCombatPower('marco').finalScore).toBeCloseTo(591/7,12)
  expect(evaluationRepository.getEvaluations('inuarashi')).toHaveLength(2)
  expect(evaluationRepository.getEvaluations('nekomamushi')).toHaveLength(2)
 })
 it('keeps CharacterPage using live data, and histories keep prior version records',()=>{
  const html=renderToStaticMarkup(<CharacterPage characterId="katakuri" groupId="big-mom-pirates"
   onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
  expect(html).toContain('카타쿠리')
  expect(html).toContain('85.0')
  expect(patchHistory[0].version).toBe('v0.4.31')
  expect(patchHistory[0].changes.filter(x=>x.kind==='score')).toHaveLength(15)
  expect(patchHistory.some(x=>x.version==='v0.4.30')).toBe(true)
  expect(patchHistory.some(x=>x.version==='v0.4.29')).toBe(true)
  expect(patchHistory.some(x=>x.version==='v0.4.28')).toBe(true)
 })
})
