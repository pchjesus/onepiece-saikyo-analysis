// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { getFinalStatScore } from '../../domain/evaluation/score'
import { sampleEvaluations } from './evaluations'
import { v0412Evaluations } from './v0412EightEvaluations'
import { v0428Evidence, v0428Battles, v0428SulongEvaluations, applyV0428CalibratedEvaluation } from './v0428SupportAxisCalibration'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { battleRepository } from '../repositories/battleRepository'
import { matchupRepository } from '../repositories/matchupRepository'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking, getHighestOverallStateIds } from '../../application/getStatRanking'
import { getCharacterDetail } from '../../application/getCharacterDetail'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { versionManifest } from '../integrity/versionManifest'
import { patchHistory } from '../patchHistory'
import { CharacterPage } from '../../ui/pages/CharacterPage'

const revised:Record<string,number[]> = {
  usopp:[68,61,70,64,76,75,74],
  kinemon:[75,70,76,72,78,70,70],
  denjiro:[77,74,76,75,82,73,67],
  'ashura-doji':[80,76,79,74,79,74,70],
  kawamatsu:[74,71,73,72,78,70,68],
  kikunojo:[72,69,72,74,78,70,67],
  raizo:[65,64,74,69,77,72,79],
  inuarashi:[76,76,78,75,76,73,71],
  nekomamushi:[76,76,77,75,76,72,70],
  kanjuro:[67,65,70,69,83,71,80],
}
const old:Record<string,number[]> = {
  usopp:[63,61,70,62,88,76,79],
  kinemon:[76,74,81,75,79,71,78],
  denjiro:[78,77,80,77,85,79,72],
  'ashura-doji':[80,77,81,74,80,75,71],
  kawamatsu:[77,74,75,74,80,73,70],
  kikunojo:[74,72,75,76,79,72,69],
  raizo:[68,69,76,72,80,78,84],
  inuarashi:[80,81,83,79,78,77,76],
  nekomamushi:[80,80,82,79,78,75,76],
  kanjuro:[68,68,73,71,86,76,84],
}
const average=(scores:number[])=>scores.reduce((a,b)=>a+b,0)/scores.length

describe('v0.4.28 scoped support stat calibration and conditional Sulong',()=>{
  it('preserves historical source objects and re-evaluates exactly the approved ten characters',()=>{
    for(const [id,scores] of Object.entries(revised)){
      const source=(id==='usopp'?v0412Evaluations:sampleEvaluations).find(e=>e.characterId===id)!
      const live=evaluationRepository.getEvaluation(id)!
      expect(source.items.map(x=>x.score)).toEqual(old[id])
      expect(live).not.toBe(source)
      expect(live.id).toBe(source.id)
      expect(live.status).toBe('draft')
      expect(live.evaluationDataVersion).toBe('evaluation-v0.4.28-support-axis-calibration')
      expect(live.items.map(x=>x.stat)).toEqual([...COMBAT_STATS])
      expect(live.items.map(x=>x.score)).toEqual(scores)
      expect(live.items.map(x=>x.baseScore)).toEqual(scores)
      expect(live.items.every(x=>x.score===getFinalStatScore(x) && x.hakiContributions.length===0)).toBe(true)
      expect(getCombatPower(id).finalScore).toBeCloseTo(average(scores),12)
      expect(getStatRanking('overall').find(x=>x.characterId===id)?.score).toBeCloseTo(average(scores),12)
      expect(applyV0428CalibratedEvaluation(source)).toEqual(live)
      expect(()=>applyV0428CalibratedEvaluation({...source,evaluationDataVersion:'bad'})).toThrow(/identity\/version/)
      expect(()=>applyV0428CalibratedEvaluation({...source,items:source.items.map((x,i)=>i===0?{...x,baseScore:99}:x)}))
        .toThrow(/baseline drift/)
    }
    expect(revised.usopp[4]).toBe(76)
    expect(average(revised.usopp)).toBeCloseTo(69.71428571428571,12)
    expect(evaluationRepository.getEvaluation('usopp')?.items.find(x=>x.stat==='techniqueMastery')?.score).toBe(76)
    expect(evaluationRepository.getEvaluation('usopp')?.items.every(x=>x.readiness==='E2'||x.readiness==='E3')).toBe(true)
  })

  it('separates base and full-moon Sulong without duplicate ranking identities',()=>{
    expect(v0428SulongEvaluations.map(x=>x.characterId).sort()).toEqual(['inuarashi','nekomamushi'])
    const examples=[
      {id:'inuarashi',base:75,sulong:[80,81,82,80,78,75,74]},
      {id:'nekomamushi',base:average(revised.nekomamushi),sulong:[79,80,81,79,78,73,74]},
    ]
    for(const {id,base,sulong} of examples){
      expect(evaluationRepository.getEvaluations(id)).toHaveLength(2)
      const plain=evaluationRepository.getEvaluation(id)!
      const full=evaluationRepository.getEvaluation(id,'wano-sulong')!
      expect(plain.subjectState?.id).toBe('wano-record')
      expect(plain.subjectState?.label).toContain('스론 제외')
      expect(full.isDefault).toBe(false)
      expect(full.subjectState?.label).toContain('스론')
      expect(full.items.map(x=>x.score)).toEqual(sulong)
      expect(getCombatPower(id).finalScore).toBeCloseTo(base,12)
      expect(getCombatPower(id,'balanced','wano-sulong').finalScore).toBeCloseTo(average(sulong),12)
      expect(getCharacterDetail(id)?.evaluations).toHaveLength(2)
      expect(getCharacterDetail(id,undefined,'wano-sulong')?.evaluation.id).toBe(full.id)
      expect(getHighestOverallStateIds()[id]).toBe('wano-sulong')
      const ranked=getStatRanking('overall',{[id]:'wano-sulong'})
      expect(ranked.filter(x=>x.characterId===id)).toHaveLength(1)
      expect(ranked.find(x=>x.characterId===id)?.stateOptions).toHaveLength(2)
      expect(plain.items.flatMap(x=>x.evidenceIds)).not.toContain(id==='inuarashi'
        ? 'evidence-wano-detailed-inu-jack-1051-inuarashi'
        : 'evidence-wano-detailed-neko-perospero-1051-nekomamushi')
    }
  })

  it('links verified official-TV supporting scenes, separates team fights and avoids missing evidence',()=>{
    expect(v0428Battles).toHaveLength(2)
    expect(v0428Evidence).toHaveLength(3)
    expect(v0428Evidence.map(x=>x.id)).toEqual([
      'evidence-v0428-zou-inuarashi-jack','evidence-v0428-zou-nekomamushi-jack','evidence-v0428-ashura-jack'
    ])
    for(const e of v0428Evidence){
      expect(e.source.type).toBe('supplementary')
      expect(e.evidenceStrength).toBe('moderate')
      expect(e.uncertainty).toContain('전수')
      expect(battleRepository.getBattle(e.battleId)).toBeDefined()
      expect(evidenceRepository.getEvidenceForCharacter(e.subjectCharacterId).map(x=>x.id)).toContain(e.id)
      const linked=evaluationRepository.getEvaluation(e.subjectCharacterId)!
      expect(linked.items.some(x=>x.evidenceIds.includes(e.id))).toBe(true)
    }
    expect(battleRepository.getBattle('battle-v0428-zou-jack-shift')?.restrictions).toContain('교대')
    expect(battleRepository.getBattle('battle-v0428-ashura-jack')?.restrictions).toContain('승패')
    const evidenceLinks=v050CurrentDataset.evidence.map(x=>({id:x.id,subjectCharacterId:x.subjectCharacterId}))
    for(const id of Object.keys(revised)){
      for(const evaluation of evaluationRepository.getEvaluations(id)){
        expect(validateEvaluation(evaluation,evidenceLinks).errors).toEqual([])
      }
    }
    expect(buildV050ReadOnlyAudit().integrity.errors).toEqual([])
  })

  it('keeps untouched ratings, memberships, matchups, model and live audit aligned',()=>{
    const audited=buildV050ReadOnlyAudit()
    expect(audited.counts).toEqual({characters:82,evaluatedCharacters:82,evaluations:88,axes:616,memberships:107,matchups:18})
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(versionManifest).toMatchObject({appVersion:'0.4.28',coreDataVersion:'core-v0.4.28',
      evaluationSetVersion:'evaluation-set-v0.4.28',calculationModelVersion:'1.2',
      baselineSnapshotVersion:'v0.3.3'})
    const sampleIds=new Set(Object.keys(revised))
    for(const oldRecord of [...sampleEvaluations,...v0412Evaluations]){
      if(sampleIds.has(oldRecord.characterId) || ['jinbe','kaku','enel','kaido','linlin','lucci'].includes(oldRecord.characterId))continue
      const live=evaluationRepository.getEvaluations(oldRecord.characterId).find(x=>x.id===oldRecord.id)
      expect(live).toEqual(oldRecord)
    }
    expect(getCombatPower('jinbe').finalScore).toBe(80)
    expect(getCombatPower('magellan').finalScore).toBe(86)
    expect(audited.rows.filter(x=>x.characterId==='usopp').map(x=>x.final)).toEqual(revised.usopp)
    expect(audited.rows.filter(x=>x.characterId==='inuarashi')).toHaveLength(14)
    expect(audited.rows.filter(x=>x.characterId==='nekomamushi')).toHaveLength(14)
  })

  it('reuses the shared character UI and records detailed v0.4.28 before/after values',()=>{
    const html=renderToStaticMarkup(<CharacterPage characterId="inuarashi" groupId="akazaya-nine"
      onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
    expect(html).toContain('평상시')
    expect(html).toContain('만월')
    expect(html).toContain('평가 시점 선택')
    expect(patchHistory[0].version).toBe('v0.4.28')
    expect(patchHistory[0].changes.filter(c=>c.kind==='score')).toHaveLength(70)
    expect(patchHistory.some(p=>p.version==='v0.4.27')).toBe(true)
  })
})
