import {describe,it,expect} from 'vitest'
import {evaluationsBeforeV044,evaluationsBeforeV045,evaluationsBeforeV046 as sampleEvaluations} from './evaluations'
import {teachV045Decisions,applyV045TeachDualFruitReview} from './v045TeachDualFruitReview'
import {sampleEvidence} from './evidence'
import {patchHistory} from '../patchHistory'
import {versionManifest} from '../integrity/versionManifest'
import {liveDataset} from '../integrity/v033Snapshot'
import {auditCombatDataset} from '../integrity/auditDataset'
import {getCombatPower} from '../../application/getCombatPower'
import {getStatRanking} from '../../application/getStatRanking'
import {getMatchupBuilderView,getMatchupHubEntries} from '../../application/getMatchupHub'
import {balancedV12} from './calculationModels'
import {calculateBalancedCombatPower} from '../../domain/calculation/calculateCombatPower'
import {getFinalStatScore,getRawHakiContributionTotal} from '../../domain/evaluation/score'

const forCharacter=(rows:typeof sampleEvaluations,id:string)=>rows.find(x=>x.characterId===id)!

describe('v0.4.5 Teach dual fruit precision and flexibility audit',()=>{
  it('adopts only two linked E2/E1 interpretations and keeps 97 unproven',()=>{
    expect(teachV045Decisions).toHaveLength(2)
    expect(teachV045Decisions.map(x=>[x.stat,x.beforeFinal,x.afterFinal,x.readiness])).toEqual([
      ['techniqueMastery',93,94,'E2'],['versatility',95,96,'E1'],
    ])
    for(const d of teachV045Decisions){
      expect(d.sourceEvidenceIds.length).toBeGreaterThanOrEqual(4)
      expect(d.primaryQuestion.length).toBeGreaterThan(12)
      expect(d.rationale.length).toBeGreaterThan(70)
      expect(d.limitations.length).toBeGreaterThan(70)
      expect(d.sourceEvidenceIds.every(id=>sampleEvidence.some(e=>e.id===id&&e.subjectCharacterId==='teach'))).toBe(true)
    }
    expect(teachV045Decisions.find(d=>d.stat==='versatility')?.limitations).toContain('97')
    expect(teachV045Decisions.find(d=>d.stat==='techniqueMastery')?.limitations).toContain('E2')
  })

  it('preserves every v0.4.4 evaluation and adds +1 to exactly two Teach stats',()=>{
    expect(evaluationsBeforeV044).toHaveLength(76)
    expect(evaluationsBeforeV045).toHaveLength(76)
    expect(sampleEvaluations).toHaveLength(76)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(532)
    const baseline=forCharacter(evaluationsBeforeV045,'teach')
    const updated=forCharacter(sampleEvaluations,'teach')
    expect(baseline.items.map(x=>getFinalStatScore(x))).toEqual([96,91,97,82,93,94,95])
    expect(updated.items.map(x=>getFinalStatScore(x))).toEqual([96,91,97,82,94,94,96])
    expect(calculateBalancedCombatPower(baseline,balancedV12).finalScore).toBeCloseTo(648/7,12)
    expect(getCombatPower('teach').finalScore).toBeCloseTo(650/7,12)
    expect(updated.evaluationDataVersion).toBe('evaluation-0.4.5-teach-dual-fruit-technique-versatility-review')
    expect(baseline.evaluationDataVersion).toBe('evaluation-0.4.4-teach-mihawk-7axis-context-calibration')
    for(const [index,item] of updated.items.entries()){
      const previous=baseline.items[index]
      const changed=item.stat==='techniqueMastery'||item.stat==='versatility'
      if(changed){
        expect(getFinalStatScore(item)-getFinalStatScore(previous)).toBe(1)
        expect(item.readiness).toBe(previous.readiness)
        expect(item.evidenceIds).toEqual([...new Set([...previous.evidenceIds, ...teachV045Decisions.find(d=>d.stat===item.stat)!.sourceEvidenceIds])])
      } else expect(item).toEqual(previous)
      expect(item.hakiContributions).toEqual(previous.hakiContributions)
      expect(getRawHakiContributionTotal(item)).toBe(getRawHakiContributionTotal(previous))
    }
    for(const e of sampleEvaluations.filter(e=>e.characterId!=='teach'))
      expect(e).toEqual(evaluationsBeforeV045.find(previous=>previous.id===e.id))
    const copied=applyV045TeachDualFruitReview(baseline)
    expect(copied).toEqual(updated)
    expect(baseline.items.map(x=>x.score)).toEqual([96,91,97,82,93,94,95])
    expect(()=>applyV045TeachDualFruitReview(updated)).toThrow('precondition failed')
  })

  it('maintains identical calculation/model and unrelated ranks, matchup references and source baseline',()=>{
    expect(versionManifest.appVersion).toBe('0.4.33')
    expect(versionManifest.coreDataVersion).toBe('core-v0.4.33')
    expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.33')
    expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(.5)
    expect(getStatRanking('overall')).toHaveLength(83)
    expect(getStatRanking('overall').find(x=>x.characterId==='teach')?.score).toBeCloseTo(650/7,12)
    expect(getStatRanking('techniqueMastery').find(x=>x.characterId==='teach')?.score).toBe(94)
    expect(getStatRanking('versatility').find(x=>x.characterId==='teach')?.score).toBe(96)
    expect(getCombatPower('mihawk').finalScore).toBeCloseTo(652/7,12)
    expect(getCombatPower('luffy').finalScore).toBeCloseTo(657/7,12)
    expect(getMatchupHubEntries()).toHaveLength(18)
    expect(getMatchupBuilderView('luffy','teach','egghead-gear4')?.matchup?.id).toBe('matchup-luffy-gear4-teach')
    expect(getMatchupBuilderView('luffy','teach','egghead-gear5')?.matchup?.id).toBe('matchup-luffy-gear5-teach')
    expect(liveDataset.matchups).toHaveLength(17)
    expect(auditCombatDataset(liveDataset).errors).toEqual([])
  })

  it('logs exactly two new score changes while retaining v0.4.4 history',()=>{
    expect(patchHistory.find(x=>x.version==='v0.4.5')).toBeDefined()
    const current=patchHistory.find(x=>x.version==='v0.4.5')!.changes.filter(x=>x.kind==='score')
    expect(current).toHaveLength(2)
    expect(current.map(x=>[x.characterId,x.stat,x.before,x.after])).toEqual([
      ['teach','techniqueMastery',93,94],['teach','versatility',95,96],
    ])
    expect(patchHistory.find(x=>x.version==='v0.4.4')?.changes.filter(x=>x.kind==='score')).toHaveLength(6)
    expect(current.every(c=>Boolean(c.reason)&&c.evidence!.length>=1)).toBe(true)
  })
})
