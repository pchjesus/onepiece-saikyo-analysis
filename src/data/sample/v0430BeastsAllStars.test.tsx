// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { validateCalibrationReview, applyReviewedCalibration } from '../../domain/evaluation/bidirectionalCalibration'
import { v0430AllStarReviews, v0430AllStarScoreChanges, applyV0430AllStarCalibration } from './v0430BeastsAllStars'
import { sampleEvaluations } from './evaluations'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { versionManifest } from '../integrity/versionManifest'
import { getRawHakiContributionTotal, getFinalStatScore } from '../../domain/evaluation/score'
import { matchupRepository } from '../repositories/matchupRepository'
import { patchHistory } from '../patchHistory'
import { CharacterPage } from '../../ui/pages/CharacterPage'

const expected:Record<string,{before:number[],after:number[],overall:number}>={
  king:{before:[83,88,85,83,80,77,82],after:[84,88,85,85,83,79,84],overall:588/7},
  queen:{before:[80,81,81,75,79,74,82],after:[82,82,83,75,80,74,84],overall:560/7},
  jack:{before:[79,84,88,75,75,72,74],after:[80,84,88,76,77,73,74],overall:552/7},
}

describe('v0.4.30 King Queen Jack bidirectional seven-axis review',()=>{
  it('does not permit missing axes, unsupported evidence, missing counterarguments or stale source',()=>{
    expect(v0430AllStarReviews.map(r=>r.characterId)).toEqual(['king','queen','jack'])
    expect(v0430AllStarScoreChanges).toHaveLength(14)
    for(const review of v0430AllStarReviews){
      const original=sampleEvaluations.find(x=>x.characterId===review.characterId)!
      expect(validateCalibrationReview(original,review)).toEqual([])
      expect(review.axes.map(x=>x.stat)).toEqual([...COMBAT_STATS])
      expect(review.axes.map(x=>x.expectedFinal)).toEqual(expected[review.characterId].before)
      expect(review.axes.map(x=>x.proposedFinal)).toEqual(expected[review.characterId].after)
      expect(()=>applyReviewedCalibration(original,{...review,sourceDataVersion:'stale'}))
        .toThrow(/Source evaluation version drift/)
      expect(validateCalibrationReview(original,{...review,axes:review.axes.slice(1)})).toContain('Exactly seven axis reviews are required')
      const one={...review,axes:review.axes.map((a,i)=>i===0?{...a,deflationRisk:''}:a)}
      expect(validateCalibrationReview(original,one)).toContain('Incomplete deflationRisk for attack')
      const other={...review,axes:review.axes.map((a,i)=>i===0?{...a,evidenceIds:['unverified-evidence-id']}:a)}
      expect(validateCalibrationReview(original,other).some(x=>x.includes('absent from original stat'))).toBe(true)
    }
  })

  it('reproduces the calibrated finals without mutating old scores, titles, model or Haki',()=>{
    for(const [id,item] of Object.entries(expected)){
      const source=sampleEvaluations.find(x=>x.characterId===id)!
      const current=evaluationRepository.getEvaluation(id)!
      expect(source.items.map(x=>x.score)).toEqual(item.before)
      expect(source.status).toBe('draft')
      expect(current).not.toBe(source)
      expect(current.id).toBe(source.id)
      expect(current.evaluationDataVersion).toBe('evaluation-v0.4.30-beasts-bidirectional')
      expect(current.items.map(x=>x.score)).toEqual(item.after)
      expect(current.items.map(x=>x.readiness)).toEqual(id==='king'
        ? ['E2','E2','E2','E2','E2','E3','E2']
        : id==='queen' ? ['E2','E2','E2','E3','E2','E3','E2']
        : ['E2','E2','E1','E3','E3','E3','E3'])
      expect(current.items.every(x=>x.score===getFinalStatScore(x)&&getRawHakiContributionTotal(x)===0)).toBe(true)
      for(const axis of current.items){
        expect(axis.rationale).toContain('과대평가 위험')
        expect(axis.rationale).toContain('과소평가 위험')
        expect(axis.rationale).toContain('합리적 추론')
        expect(axis.evidenceIds.length).toBeGreaterThan(0)
      }
      expect(getCombatPower(id).finalScore).toBeCloseTo(item.overall,12)
      expect(getStatRanking('overall').find(x=>x.characterId===id)?.score).toBeCloseTo(item.overall,12)
      expect(applyV0430AllStarCalibration(source)).toEqual(current)
    }
    expect(getCombatPower('marco').finalScore).toBeCloseTo(591/7,12)
    expect(getCombatPower('vista').finalScore).toBeCloseTo(580/7,12)
    expect(getCombatPower('jozu').finalScore).toBeCloseTo(557/7,12)
    expect(getCombatPower('usopp').finalScore).toBeCloseTo(488/7,12)
  })

  it('keeps the historical Queen +2 versatility, King conditional flame logic and Jack Zou endurance',()=>{
    const originalQueen=sampleEvaluations.find(x=>x.characterId==='queen')!
    expect(originalQueen.evaluationDataVersion).toBe('evaluation-0.1.79-queen-multi-system-versatility-calibrated')
    expect(originalQueen.items.find(x=>x.stat==='versatility')?.score).toBe(82)
    const queen=evaluationRepository.getEvaluation('queen')!
    expect(queen.items.find(x=>x.stat==='versatility')?.score).toBe(84)
    for(const id of ['evidence-v0179-queen-germa-mimic-tv1061','evidence-v0179-queen-ice-oni-tv1005'])
      expect(queen.items.find(x=>x.stat==='versatility')?.evidenceIds).toContain(id)
    const king=evaluationRepository.getEvaluation('king')!
    const defense=king.items.find(x=>x.stat==='defense')!
    const speed=king.items.find(x=>x.stat==='speed')!
    expect([defense.score,speed.score]).toEqual([88,85])
    expect(defense.rationale).toContain('불꽃 ON')
    expect(speed.rationale).toContain('불꽃 OFF')
    expect(king.subjectState).toBeUndefined()
    const jack=evaluationRepository.getEvaluation('jack')!
    expect(jack.items.find(x=>x.stat==='stamina')?.score).toBe(88)
    expect(jack.items.find(x=>x.stat==='stamina')?.readiness).toBe('E1')
    expect(jack.items.find(x=>x.stat==='stamina')?.rationale).toContain('교대')
  })

  it('preserves all other 79 characters and consistent evidence repository / dataset',()=>{
    expect(v050CurrentDataset.characters).toHaveLength(82)
    expect(v050CurrentDataset.evaluations).toHaveLength(88)
    expect(v050CurrentDataset.evaluations.flatMap(x=>x.items)).toHaveLength(616)
    const ids=new Set(Object.keys(expected))
    for(const e of v050CurrentDataset.evaluations){
      if(ids.has(e.characterId))expect(e).toEqual(evaluationRepository.getEvaluation(e.characterId,e.subjectState?.id))
    }
    expect(buildV050ReadOnlyAudit().integrity.errors).toEqual([])
    const eRefs=v050CurrentDataset.evidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    for(const id of ids){
      const evaluation=evaluationRepository.getEvaluation(id)!
      expect(validateEvaluation(evaluation,eRefs).errors).toEqual([])
      const allEvidence=evidenceRepository.getEvidenceForCharacter(id)
      expect(evaluation.items.flatMap(x=>x.evidenceIds).every(ref=>allEvidence.some(e=>e.id===ref))).toBe(true)
    }
    expect(buildV050ReadOnlyAudit().counts).toEqual({characters:82,evaluatedCharacters:82,evaluations:88,axes:616,memberships:107,matchups:18})
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(versionManifest).toMatchObject({appVersion:'0.4.30',evaluationSetVersion:'evaluation-set-v0.4.30',
      calculationModelVersion:'1.2',baselineSnapshotVersion:'v0.3.3'})
    expect(evaluationRepository.getEvaluations('inuarashi')).toHaveLength(2)
    expect(evaluationRepository.getEvaluations('nekomamushi')).toHaveLength(2)
    expect(applyV0430AllStarCalibration(evaluationRepository.getEvaluation('vista')!))
      .toBe(evaluationRepository.getEvaluation('vista')!)
  })

  it('publishes the change in existing UI and patch history without accidental custom layout',()=>{
    const h=renderToStaticMarkup(<CharacterPage characterId="king" groupId="beast-pirates"
      onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
    expect(h).toContain('킹')
    expect(h).toContain('88')
    expect(h).toContain('84')
    expect(patchHistory[0].version).toBe('v0.4.30')
    expect(patchHistory[0].changes.filter(x=>x.kind==='score')).toHaveLength(14)
    expect(patchHistory.some(x=>x.version==='v0.4.29')).toBe(true)
  })
})
