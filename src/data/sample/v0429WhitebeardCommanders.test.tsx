// @vitest-environment jsdom
import { describe,it,expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getRawHakiContributionTotal, getFinalStatScore } from '../../domain/evaluation/score'
import { applyReviewedCalibration,validateCalibrationReview } from '../../domain/evaluation/bidirectionalCalibration'
import { v0429Reviews,v0429CommanderChanges,applyV0429CommanderCalibration,applyV0429CommanderEvidenceAudit } from './v0429WhitebeardCommanders'
import { sampleEvaluations } from './evaluations'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { buildV050ReadOnlyAudit, v050CurrentDataset } from '../integrity/v050ReadOnlyAudit'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { versionManifest } from '../integrity/versionManifest'
import { patchHistory } from '../patchHistory'
import { CharacterPage } from '../../ui/pages/CharacterPage'
import { sampleEvidence } from './evidence'

const expectations:Record<string,{prior:number[],proposed:number[],raw:number[],average:number}>={
  marco:{prior:[79,87,87,82,84,80,87],proposed:[79,88,86,83,85,82,88],raw:[2,0,0,0,0,0,0],average:591/7},
  jozu:{prior:[78,84,78,79,74,75,74],proposed:[80,86,80,80,77,78,76],raw:[4,0,0,0,0,0,0],average:557/7},
  vista:{prior:[82,79,77,80,87,77,74],proposed:[83,81,80,82,92,85,77],raw:[4,0,0,0,2,0,0],average:580/7},
}
const allNames=Object.keys(expectations)
describe('v0.4.29 evidence-based symmetric inflation/deflation calibration',()=>{
  it('requires all seven axis audits, provenance, symmetric risks, and expected source value',()=>{
    expect(v0429Reviews.map(x=>x.characterId)).toEqual(allNames)
    expect(v0429CommanderChanges).toHaveLength(20)
    for(const review of v0429Reviews){
      const source=sampleEvaluations.find(e=>e.characterId===review.characterId)!
      expect(validateCalibrationReview(source,review)).toEqual([])
      expect(review.axes.map(x=>x.stat)).toEqual([...COMBAT_STATS])
      expect(review.axes.map(x=>x.expectedFinal)).toEqual(expectations[review.characterId].prior)
      expect(review.axes.map(x=>x.proposedFinal)).toEqual(expectations[review.characterId].proposed)
      for(const axis of review.axes){
        expect(axis.observed.length).toBeGreaterThan(11)
        expect(axis.context.length).toBeGreaterThan(11)
        expect(axis.inference.length).toBeGreaterThan(11)
        expect(axis.inflationRisk.length).toBeGreaterThan(11)
        expect(axis.deflationRisk.length).toBeGreaterThan(11)
        expect(axis.judgement.length).toBeGreaterThan(11)
        expect(axis.evidenceIds.length).toBeGreaterThan(0)
      }
      expect(validateCalibrationReview(source,{...review,axes:review.axes.slice(1)})).toContain('Exactly seven axis reviews are required')
      expect(validateCalibrationReview(source,{...review,sourceDataVersion:'older'})).toContain('Source evaluation version drift')
      const changed={...review,axes:review.axes.map((axis,i)=>i===0?{...axis,expectedFinal:0}:axis)}
      expect(validateCalibrationReview(source,changed)).toContain('Previous Final drift: attack')
      const noRisks={...review,axes:review.axes.map((axis,i)=>i===0?{...axis,deflationRisk:''}:axis)}
      expect(validateCalibrationReview(source,noRisks)).toContain('Incomplete deflationRisk for attack')
      expect(()=>applyReviewedCalibration(source,changed)).toThrow(/Previous Final drift/)
    }
  })
  it('recalculates 3 commanders from historical originals, removing only identified ordinary Haki Raw',()=>{
    for(const [id,expected] of Object.entries(expectations)){
      const source=sampleEvaluations.find(e=>e.characterId===id)!
      const live=evaluationRepository.getEvaluation(id)!
      expect(source.items.map(x=>x.score)).toEqual(expected.prior)
      expect(source.items.map(x=>getRawHakiContributionTotal(x))).toEqual(expected.raw)
      expect(live).not.toBe(source)
      expect(live.id).toBe(source.id)
      expect(live.evaluationDataVersion).toBe('evaluation-v0.4.29-bidirectional-calibration')
      expect(live.items.map(x=>x.score)).toEqual(expected.proposed)
      expect(live.items.map(x=>x.baseScore)).toEqual(expected.proposed)
      expect(live.items.map(x=>getRawHakiContributionTotal(x))).toEqual([0,0,0,0,0,0,0])
      expect(live.items.every(x=>x.score===getFinalStatScore(x))).toBe(true)
      expect(live.items.every(x=>x.rationale.includes('과대평가 위험')&&x.rationale.includes('과소평가 위험')&&x.rationale.includes('합리적 추론'))).toBe(true)
      expect(getCombatPower(id).finalScore).toBeCloseTo(expected.average,12)
      expect(getStatRanking('overall').find(x=>x.characterId===id)?.score).toBeCloseTo(expected.average,12)
      expect(applyV0429CommanderCalibration(source)).toEqual(live)
    }
    expect(evaluationRepository.getEvaluation('vista')?.items.find(x=>x.stat==='techniqueMastery')?.score).toBe(92)
    expect(evaluationRepository.getEvaluation('vista')?.items.find(x=>x.stat==='combatIQ')?.score).toBe(85)
    expect(evaluationRepository.getEvaluation('jozu')?.items.find(x=>x.stat==='combatIQ')?.score).toBe(78)
  })
  it('retains Haki evidence and profile facts but removes unsupported exceptional Raw from the 4 slots',()=>{
    const ids=['evidence-v0174-marco-phoenix-brand-queen-1006','evidence-marco-armament-akainu-574','evidence-jozu-crocodile-560','evidence-jozu-aokiji-567','evidence-vista-armament-akainu-574']
    for(const id of ids){
      const old=sampleEvidence.find(e=>e.id===id)!
      const live=evidenceRepository.getEvidenceForCharacter(old.subjectCharacterId).find(e=>e.id===id)!
      expect(live.id).toBe(old.id)
      expect(live.fact).toBe(old.fact)
      expect(live.source).toEqual(old.source)
      expect(live.battleId).toBe(old.battleId)
      expect(live).not.toBe(old)
      expect(live.evaluationImpact).toContain('Raw')
      expect(live.evaluationImpact).toContain('Base')
      expect(applyV0429CommanderEvidenceAudit(old)).toEqual(live)
    }
    for(const original of sampleEvidence.filter(e=>!ids.includes(e.id)))expect(applyV0429CommanderEvidenceAudit(original)).toBe(original)
    expect(evaluationRepository.getEvaluation('usopp')?.items[0].score).toBe(68)
  })
  it('preserves baseline and other 79 characters while current audit stays in sync with repository',()=>{
    expect(versionManifest).toMatchObject({
      appVersion:'0.4.32',coreDataVersion:'core-v0.4.32',
      evaluationSetVersion:'evaluation-set-v0.4.31',
      calculationModelId:'balanced',calculationModelVersion:'1.2',
      baselineSnapshotVersion:'v0.3.3',
    })
    expect(v050CurrentDataset.characters).toHaveLength(82)
    expect(v050CurrentDataset.evaluations).toHaveLength(88)
    expect(v050CurrentDataset.evaluations.flatMap(e=>e.items)).toHaveLength(616)
    const links=v050CurrentDataset.evidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    for(const id of allNames){
      const live=v050CurrentDataset.evaluations.find(e=>e.characterId===id)!
      expect(live).toEqual(evaluationRepository.getEvaluation(id))
      expect(validateEvaluation(live,links).errors).toEqual([])
    }
    expect(buildV050ReadOnlyAudit().integrity.errors).toEqual([])
    const report=buildV050ReadOnlyAudit()
    expect(report.counts).toEqual({characters:82,evaluatedCharacters:82,evaluations:88,axes:616,memberships:107,matchups:18})
    expect(report.rows.filter(x=>x.characterId==='vista').map(x=>x.final)).toEqual(expectations.vista.proposed)
    const others=['jack','king','queen','katakuri','usopp','kinemon','denjiro','ashura-doji','inuarashi','nekomamushi','jinbe','kaku']
    for(const id of others)expect(applyV0429CommanderCalibration(evaluationRepository.getEvaluation(id)!))
      .toBe(evaluationRepository.getEvaluation(id)!)
    expect(evaluationRepository.getEvaluations('inuarashi')).toHaveLength(2)
    expect(evaluationRepository.getEvaluations('nekomamushi')).toHaveLength(2)
  })
  it('preserves shared CharacterPage and publishes named numeric revisions in patch history',()=>{
    const h=renderToStaticMarkup(<CharacterPage characterId="vista" groupId="whitebeard-pirates"
      onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
    expect(h).toContain('비스타')
    expect(h).toContain('92')
    expect(h).toContain('핵심 전투 스탯')
    expect(patchHistory.find(x=>x.version==='v0.4.29')?.version).toBe('v0.4.29')
    expect(patchHistory.find(x=>x.version==='v0.4.29')?.changes.filter(c=>c.kind==='score')).toHaveLength(20)
    expect(patchHistory.some(p=>p.version==='v0.4.28')).toBe(true)
    expect(patchHistory.find(x=>x.version==='v0.4.29')?.changes.some(c=>c.kind==='evidence'&&c.title.includes('양방향'))).toBe(true)
  })
})
