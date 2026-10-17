import {describe,expect,it} from 'vitest'
import {evaluationsBeforeV044,evaluationsBeforeV045 as sampleEvaluations} from './evaluations'
import {v044AxisDecisions} from './v044TeachMihawkCalibration'
import {sampleEvidence} from './evidence'
import {balancedV12} from './calculationModels'
import {getCombatPower} from '../../application/getCombatPower'
import {getStatRanking} from '../../application/getStatRanking'
import {getMatchupBuilderView,getMatchupHubEntries} from '../../application/getMatchupHub'
import {auditCombatDataset} from '../integrity/auditDataset'
import {liveDataset,createV033Snapshot} from '../integrity/v033Snapshot'
import {versionManifest} from '../integrity/versionManifest'
import {getFinalStatScore,getRawHakiContributionTotal} from '../../domain/evaluation/score'
import {patchHistory} from '../patchHistory'

const byId=(rows:typeof sampleEvaluations,id:string)=>rows.find(e=>e.characterId===id)!

describe('v0.4.4 targeted Teach and Mihawk evidence/context recalibration',()=>{
  it('has all seven Teach decisions, no new Haki raw and explicit uncertainty',()=>{
    const teach=v044AxisDecisions.filter(x=>x.characterId==='teach')
    const mihawk=v044AxisDecisions.filter(x=>x.characterId==='mihawk')
    expect(teach).toHaveLength(7)
    expect(new Set(teach.map(x=>x.stat)).size).toBe(7)
    expect(mihawk).toHaveLength(1)
    expect(mihawk[0].stat).toBe('attack')
    for(const d of v044AxisDecisions){
      expect(d.rationale.length).toBeGreaterThan(80)
      expect(d.counterargument.length).toBeGreaterThan(25)
      expect(d.evidenceIds.length).toBeGreaterThan(0)
      expect(d.evidenceIds.every(id=>sampleEvidence.some(x=>x.id===id&&x.subjectCharacterId===d.characterId))).toBe(true)
    }
    expect(teach.find(x=>x.stat==='combatIQ')?.reasoningConfidence).toBe('plausible-interpretation')
    expect(teach.filter(x=>x.after===x.before).map(x=>x.stat).sort()).toEqual(['speed','techniqueMastery'])
  })

  it('computes exact before/after results on identical Balanced 1.2 without data overwrite',()=>{
    const oldTeach=byId(evaluationsBeforeV044,'teach')
    const newTeach=byId(sampleEvaluations,'teach')
    const oldMihawk=byId(evaluationsBeforeV044,'mihawk')
    const newMihawk=byId(sampleEvaluations,'mihawk')
    expect(oldTeach.items.map(x=>getFinalStatScore(x))).toEqual([95,89,95,82,93,87,93])
    expect(newTeach.items.map(x=>getFinalStatScore(x))).toEqual([96,91,97,82,93,94,95])
    expect(oldMihawk.items.find(x=>x.stat==='attack')?.score).toBe(96)
    expect(newMihawk.items.find(x=>x.stat==='attack')?.score).toBe(97)
    expect(newTeach.evaluationDataVersion).not.toEqual(oldTeach.evaluationDataVersion)
    expect(newMihawk.evaluationDataVersion).not.toEqual(oldMihawk.evaluationDataVersion)
    expect(oldTeach.items.map(x=>x.score)).toEqual([95,89,95,82,93,87,93]) // no mutation
    expect(oldMihawk.items.find(x=>x.stat==='attack')?.score).toBe(96)
    expect(getCombatPower('teach').finalScore).toBeCloseTo(650/7,11)
    expect(getCombatPower('mihawk').finalScore).toBeCloseTo(652/7,11)
    expect(getFinalStatScore(byId(sampleEvaluations,'mihawk').items.find(i=>i.stat==='versatility')!)).toBe(84)
    expect(byId(sampleEvaluations,'shanks').items.find(x=>x.stat==='attack')?.score).toBe(97)
    for(const characterId of ['teach','mihawk']){
      const prev=byId(evaluationsBeforeV044,characterId)
      const now=byId(sampleEvaluations,characterId)
      expect(now.items.every(i=>i.hakiContributions.length===0)).toBe(true)
      expect(prev.items.reduce((a,i)=>a+getRawHakiContributionTotal(i),0)).toBe(0)
      expect(now.items.reduce((a,i)=>a+getRawHakiContributionTotal(i),0)).toBe(0)
    }
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
  })

  it('preserves every other evaluation record and all existing scenario factors',()=>{
    expect(evaluationsBeforeV044).toHaveLength(76)
    expect(sampleEvaluations).toHaveLength(76)
    const beforeAll = new Map(evaluationsBeforeV044.map(e=>[e.id,e]))
    for(const e of sampleEvaluations){
      const before=beforeAll.get(e.id)!
      if(e.characterId==='teach'){
        for(const item of e.items){
          const previous=before.items.find(x=>x.stat===item.stat)!
          if(item.stat==='speed'||item.stat==='techniqueMastery')expect(item.score).toBe(previous.score)
        }
      }else if(e.characterId==='mihawk'){
        for(const item of e.items){
          const previous=before.items.find(x=>x.stat===item.stat)!
          if(item.stat!=='attack')expect(item).toEqual(previous)
        }
      }else expect(e).toEqual(before)
    }
    expect(getStatRanking('overall')).toHaveLength(83)
    expect(getStatRanking('overall').find(x=>x.characterId==='teach')?.score).toBeCloseTo(650/7,11)
    expect(getStatRanking('attack').find(x=>x.characterId==='mihawk')?.score).toBe(97)
    expect(getMatchupHubEntries()).toHaveLength(18)
    expect(getMatchupBuilderView('luffy','teach','egghead-gear4')?.matchup?.id).toBe('matchup-luffy-gear4-teach')
    expect(getMatchupBuilderView('luffy','teach','egghead-gear5')?.matchup?.id).toBe('matchup-luffy-gear5-teach')
    expect(liveDataset.matchups).toHaveLength(17)
    expect(auditCombatDataset(liveDataset).errors).toEqual([])
    expect(createV033Snapshot()).toEqual(createV033Snapshot())
  })

  it('versions only the changed evaluation set and records 6 transparent score changes',()=>{
    expect(versionManifest.appVersion).toBe('0.4.25')
    expect(versionManifest.coreDataVersion).toBe('core-v0.4.21')
    expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.21')
    expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
    const historical=patchHistory.find(x=>x.version==='v0.4.4')!
    expect(historical).toBeDefined()
    const scores=historical.changes.filter(x=>x.kind==='score')
    expect(scores).toHaveLength(6)
    expect(scores.map(x=>x.characterId).sort()).toEqual(['mihawk','teach','teach','teach','teach','teach'])
    for(const change of scores){
      const previous=byId(evaluationsBeforeV044,change.characterId!).items.find(x=>x.stat===change.stat)!
      const current=byId(sampleEvaluations,change.characterId!).items.find(x=>x.stat===change.stat)!
      expect(change.before).toBe(getFinalStatScore(previous))
      expect(change.after).toBe(getFinalStatScore(current))
      expect(change.evidence?.length).toBeGreaterThan(0)
    }
  })
})
