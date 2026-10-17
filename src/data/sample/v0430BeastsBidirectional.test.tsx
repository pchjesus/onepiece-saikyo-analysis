// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { validateCalibrationReview } from '../../domain/evaluation/bidirectionalCalibration'
import { v0430BeastsReviews, v0430BeastsChanges, applyV0430BeastsCalibration } from './v0430BeastsBidirectional'
import { sampleEvaluations } from './evaluations'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { matchupRepository } from '../repositories/matchupRepository'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { getCharacterDetail } from '../../application/getCharacterDetail'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { versionManifest } from '../integrity/versionManifest'
import { patchHistory } from '../patchHistory'
import { CharacterPage } from '../../ui/pages/CharacterPage'

const cases:Record<string,{old:number[],now:number[],readiness:string[]}>={
  king:{old:[83,88,85,83,80,77,82],now:[84,88,85,84,83,79,84],
    readiness:['E2','E2','E2','E2','E2','E3','E2']},
  queen:{old:[80,81,81,75,79,74,82],now:[81,82,83,75,80,73,85],
    readiness:['E2','E2','E2','E3','E2','E3','E2']},
  jack:{old:[79,84,88,75,75,72,74],now:[79,84,89,76,77,73,74],
    readiness:['E2','E2','E1','E3','E3','E2','E3']},
}
const mean=(a:number[])=>a.reduce((x,y)=>x+y,0)/7
describe('v0.4.30 Beasts commander symmetric review / actual live overlay',()=>{
  it('reviews all 21 axes and requires fact, context, inference, symmetric errors, source identities',()=>{
    expect(v0430BeastsReviews.map(x=>x.characterId)).toEqual(['king','queen','jack'])
    expect(v0430BeastsChanges).toHaveLength(15)
    expect(v0430BeastsChanges.filter(x=>x.after<x.before).map(x=>x.characterId+':'+x.stat))
      .toEqual(['queen:combatIQ'])
    for(const review of v0430BeastsReviews){
      const historical=sampleEvaluations.find(x=>x.characterId===review.characterId)!
      expect(review.sourceDataVersion).toBe(historical.evaluationDataVersion)
      expect(validateCalibrationReview(historical,review)).toEqual([])
      expect(review.axes.map(x=>x.stat)).toEqual([...COMBAT_STATS])
      expect(review.axes.map(x=>x.expectedFinal)).toEqual(cases[review.characterId].old)
      expect(review.axes.map(x=>x.proposedFinal)).toEqual(cases[review.characterId].now)
      expect(review.axes.map(x=>x.readiness)).toEqual(cases[review.characterId].readiness)
      expect(review.axes.every(x=>x.evidenceIds.length>0&&x.inflationRisk.length>12&&x.deflationRisk.length>12
        &&x.context.length>12&&x.observed.length>12&&x.inference.length>12&&x.judgement.length>12)).toBe(true)
      expect(review.axes.every(x=>x.normalHakiRawToBase===undefined)).toBe(true)
      expect(validateCalibrationReview(historical,{...review,sourceDataVersion:'stale'}))
        .toContain('Source evaluation version drift')
      const changed={...review,axes:review.axes.map((a,i)=>i===0?{...a,expectedFinal:a.expectedFinal+1}:a)}
      expect(validateCalibrationReview(historical,changed)).toContain('Previous Final drift: attack')
      const missing={...review,axes:review.axes.map((a,i)=>i===0?{...a,deflationRisk:''}:a)}
      expect(validateCalibrationReview(historical,missing)).toContain('Incomplete deflationRisk for attack')
    }
  })
  it('updates exactly King Queen Jack, preserving original sources, 7-axis model and zero Raw',()=>{
    for(const [id,{old,now}] of Object.entries(cases)){
      const source=sampleEvaluations.find(e=>e.characterId===id)!
      const live=evaluationRepository.getEvaluation(id)!
      expect(source.items.map(x=>x.score)).toEqual(old)
      expect(live).not.toBe(source)
      expect(live.id).toBe(source.id)
      expect(live.characterId).toBe(source.characterId)
      expect(live.status).toBe('draft')
      expect(live.evaluationDataVersion).toBe('evaluation-v0.4.30-bidirectional-beasts')
      expect(live.items.map(x=>x.score)).toEqual(now)
      expect(live.items.map(x=>x.baseScore)).toEqual(now)
      expect(live.items.map(x=>x.stat)).toEqual([...COMBAT_STATS])
      expect(live.items.every(x=>x.score===getFinalStatScore(x)&&getRawHakiContributionTotal(x)===0)).toBe(true)
      expect(live.items.every(x=>x.rationale.includes('과대평가 위험:')&&x.rationale.includes('과소평가 위험:')
        &&x.rationale.includes('합리적 추론:')&&x.rationale.includes('전투 조건:'))).toBe(true)
      expect(live.items.map(x=>x.evidenceIds)).toEqual(source.items.map(x=>x.evidenceIds))
      expect(applyV0430BeastsCalibration(source)).toEqual(live)
      expect(getCombatPower(id).finalScore).toBeCloseTo(mean(now),12)
      expect(getStatRanking('overall').find(x=>x.characterId===id)?.score).toBeCloseTo(mean(now),12)
      expect(getCharacterDetail(id)?.evaluation).toEqual(live)
    }
    expect(getCombatPower('king').finalScore).toBeCloseTo(587/7)
    expect(getCombatPower('queen').finalScore).toBeCloseTo(559/7)
    expect(getCombatPower('jack').finalScore).toBeCloseTo(552/7)
    expect(evaluationRepository.getEvaluation('king')?.items.find(x=>x.stat==='defense')?.score).toBe(88)
    expect(evaluationRepository.getEvaluation('jack')?.items.find(x=>x.stat==='stamina')?.readiness).toBe('E1')
    expect(evaluationRepository.getEvaluation('queen')?.items.find(x=>x.stat==='combatIQ')?.score).toBe(73)
  })
  it('retains unmodified historical/app data, snapshots, evaluation state choices and audit integrity',()=>{
    expect(versionManifest).toMatchObject({appVersion:'0.4.30',coreDataVersion:'core-v0.4.30',
      evaluationSetVersion:'evaluation-set-v0.4.30',calculationModelVersion:'1.2',
      baselineSnapshotVersion:'v0.3.3'})
    expect(v050CurrentDataset.characters).toHaveLength(82)
    expect(v050CurrentDataset.evaluations).toHaveLength(88)
    expect(v050CurrentDataset.evaluations.flatMap(e=>e.items)).toHaveLength(616)
    expect(v050CurrentDataset.memberships).toHaveLength(107)
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    const refs=v050CurrentDataset.evidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    for(const id of Object.keys(cases)){
      const item=v050CurrentDataset.evaluations.find(e=>e.characterId===id)!
      expect(item).toEqual(evaluationRepository.getEvaluation(id))
      expect(validateEvaluation(item,refs).errors).toEqual([])
    }
    const audited=buildV050ReadOnlyAudit()
    expect(audited.integrity.errors).toEqual([])
    expect(audited.counts).toEqual({characters:82,evaluatedCharacters:82,evaluations:88,axes:616,memberships:107,matchups:18})
    for(const [id,{now}] of Object.entries(cases))
      expect(audited.rows.filter(r=>r.characterId===id).map(r=>r.final)).toEqual(now)
    const untouch=['usopp','marco','jozu','vista','jinbe','denjiro','ashura-doji','inuarashi','nekomamushi','lucci','kaido']
    for(const id of untouch){
      const original=evaluationRepository.getEvaluation(id)!
      expect(applyV0430BeastsCalibration(original)).toBe(original)
    }
    expect(getCombatPower('marco').finalScore).toBeCloseTo(591/7,10)
    expect(getCombatPower('usopp').finalScore).toBeCloseTo(488/7,10)
    expect(evaluationRepository.getEvaluations('inuarashi')).toHaveLength(2)
    expect(evaluationRepository.getEvaluations('nekomamushi')).toHaveLength(2)
  })
  it('keeps common character UI and records exactly 15 changed axes',()=>{
    const rendered=renderToStaticMarkup(<CharacterPage characterId="king" groupId="beasts-pirates"
      onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
    expect(rendered).toContain('킹')
    expect(rendered).toContain('83.9')
    expect(patchHistory[0].version).toBe('v0.4.30')
    expect(patchHistory[0].changes.filter(x=>x.kind==='score')).toHaveLength(15)
    expect(patchHistory[0].changes.some(x=>x.kind==='evidence')).toBe(true)
    expect(patchHistory.find(x=>x.version==='v0.4.29')).toBeDefined()
    expect(patchHistory.find(x=>x.version==='v0.4.28')).toBeDefined()
  })
})
