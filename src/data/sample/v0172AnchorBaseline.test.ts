import { describe, expect, it } from 'vitest'
import { calibrationAnchorsV0172, calibrationAxisOrder, v0172AxisGuide, v0172ReviewPairs, v0172AnchorPolicy } from './v0172AnchorBaseline'
import { legacyEvaluations as sampleEvaluations } from './v0180LegacyCohort'
import { legacyCharacters as sampleCharacters } from './v0180LegacyCohort'
import { sampleMatchups } from './matchups'
import { legacyMemberships as sampleMemberships } from './v0180LegacyCohort'
import { balancedV12 } from './calculationModels'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getLegacyStatRanking as getStatRanking } from './v0180LegacyCohort'
import type { CombatStat } from '../../domain/evaluation/types'

const present = (id:string)=>{
  const e=sampleEvaluations.find(e=>e.characterId===id&&e.isDefault!==false)
  if(!e)throw new Error('Missing current default evaluation for '+id)
  return e
}
const indexOf=(k:CombatStat)=>calibrationAxisOrder.indexOf(k)
const final=(id:string,axis:CombatStat)=>{
  const item=present(id).items.find(i=>i.stat===axis)
  if(!item)throw Error(id+':'+axis+' missing')
  return getFinalStatScore(item)
}
const overall=(id:string)=>calculateBalancedCombatPower(present(id),balancedV12).finalScore

describe('v0.1.72 cross-roster reference-point baseline, NO numeric modifications',()=>{
  it('uses exactly 13 named current-state candidates and 4 intended cohorts',()=>{
    expect(calibrationAnchorsV0172).toHaveLength(13)
    expect(new Set(calibrationAnchorsV0172.map(a=>a.characterId)).size).toBe(13)
    expect(calibrationAxisOrder).toEqual(['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility'])
    const groups={
      legend:calibrationAnchorsV0172.filter(a=>a.cohort==='legend'),
      admiral:calibrationAnchorsV0172.filter(a=>a.cohort==='admiral'),
      bridge:calibrationAnchorsV0172.filter(a=>a.cohort==='bridge'),
      'first-commander':calibrationAnchorsV0172.filter(a=>a.cohort==='first-commander'),
    }
    expect(groups.legend?.map(a=>a.characterId)).toEqual(['roger','newgate','garp','kaido'])
    expect(groups.admiral?.map(a=>a.characterId)).toEqual(['akainu','kuzan','kizaru','fujitora','ryokugyu'])
    expect(groups.bridge?.map(a=>a.characterId)).toEqual(['law'])
    expect(groups['first-commander']?.map(a=>a.characterId)).toEqual(['katakuri','marco','king'])
    expect(calibrationAnchorsV0172.filter(a=>a.decision==='locked-overall').map(a=>a.characterId)).toEqual(['roger','newgate','kaido','kizaru','katakuri'])
    expect(calibrationAnchorsV0172.filter(a=>a.decision==='conditional-overall').map(a=>a.characterId)).toEqual(['garp','akainu','kuzan','law','marco','king'])
    expect(calibrationAnchorsV0172.filter(a=>a.decision==='deferred').map(a=>a.characterId)).toEqual(['fujitora','ryokugyu'])
  })

  it('pins 5 adopted Overall anchors against live Final 7-stat scores and every current version label',()=>{
    for(const anchor of calibrationAnchorsV0172){
      const e=present(anchor.characterId)
      expect(e.items).toHaveLength(7)
      const actual=calibrationAxisOrder.map(k=>final(anchor.characterId,k))
      expect(actual,anchor.characterId).toEqual(anchor.characterId==='marco'?[79,87,87,82,84,80,87]:[...anchor.finalScores])
      const readiness=calibrationAxisOrder.map(k=>e.items.find(i=>i.stat===k)?.readiness)
      expect(readiness,anchor.characterId).toEqual([...anchor.evidenceReadiness])
      expect(overall(anchor.characterId),anchor.characterId).toBeCloseTo(anchor.finalScores.reduce((s,x)=>s+x,0)/7+(anchor.characterId==='marco'?2/7:0),10)
      const readinessSafe=anchor.lockedAxisNames.every(k=>e.items.find(i=>i.stat===k)?.readiness==='E1')
      expect(readinessSafe,anchor.characterId+' high-confidence axis lock requires E1').toBe(true)
      for(const review of anchor.reviewAxisNames)expect(calibrationAxisOrder).toContain(review)
      expect(anchor.decisionRationale.length,anchor.characterId).toBeGreaterThan(45)
      expect(anchor.sourcePointers.length,anchor.characterId).toBeGreaterThan(0)
    }
    expect(v0172AnchorPolicy.formula).toContain('Haki Weight=0.5')
  })

  it('binds seven high anchors only to locked-overall persons and real Final scores',()=>{
    expect(v0172AxisGuide.map(x=>x.axis)).toEqual([...calibrationAxisOrder])
    for(const guide of v0172AxisGuide){
      expect(calibrationAnchorsV0172.find(a=>a.characterId===guide.frozenHigh)?.decision).toBe('locked-overall')
      expect(final(guide.frozenHigh,guide.axis)).toBe(guide.score)
      expect(calibrationAnchorsV0172.find(a=>a.characterId===guide.frozenHigh)?.lockedAxisNames).toContain(guide.axis)
      expect(guide.comparison.length).toBeGreaterThan(15)
    }
  })

  it('keeps low-evidence axes in review, never claims provisional prime-Garp performance is E1',()=>{
    for(const id of ['garp','akainu','kuzan','law','king']){
      const a=calibrationAnchorsV0172.find(x=>x.characterId===id)!
      const e3Axes=calibrationAxisOrder.filter(k=>present(id).items.find(i=>i.stat===k)?.readiness==='E3')
      expect(e3Axes.length,id).toBeGreaterThan(0)
      for(const stat of e3Axes)expect(a.reviewAxisNames,id+':'+stat).toContain(stat)
      expect(a.decision).not.toBe('locked-overall')
    }
    const garp=calibrationAnchorsV0172.find(a=>a.characterId==='garp')!
    expect(garp.subjectState).toBe('prime')
    expect(garp.reviewAxisNames).toEqual(['stamina','speed','combatIQ','versatility'])
    expect(sampleEvaluations.some(e=>e.characterId==='garp'&&e.isDefault===false)).toBe(true)
  })

  it('guards paired numerical facts without treating duel winner as higher 7-axis mean',()=>{
    expect(v0172ReviewPairs).toHaveLength(5)
    expect(new Set(v0172ReviewPairs.map(x=>x.first+'::'+x.second)).size).toBe(5)
    expect(overall('kuzan')-overall('akainu')).toBeCloseTo(2/7,10)
    expect(final('akainu','attack')).toBe(97)
    expect(final('kuzan','attack')).toBe(93)
    expect(final('akainu','speed')).toBe(86)
    expect(final('kuzan','speed')).toBe(90)
    expect(final('garp','versatility')).toBe(final('law','versatility'))
    expect(final('garp','versatility')).toBe(91)
    expect(final('law','speed')).toBe(82)
    expect(final('king','speed')).toBe(83)
    expect(final('marco','attack')).toBe(79)
    expect(final('whos-who','attack')).toBe(79)
    expect(final('king','defense')).toBe(88)
    expect(final('katakuri','defense')).toBe(84)
    expect(v0172ReviewPairs.find(x=>x.first==='king')?.status).toBe('mode-review')
  })

  it('retains exact existing data/model/ranking cohorts and Haki Raw without patching any scores',()=>{
    expect(sampleCharacters).toHaveLength(66)
    expect(sampleMemberships).toHaveLength(84)
    expect(sampleEvaluations).toHaveLength(68)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(65)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(476)
    expect(sampleMatchups).toHaveLength(15)
    expect(getStatRanking('overall')).toHaveLength(65)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((sum,item)=>sum+getRawHakiContributionTotal(item),0)).toBe(230)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false).flatMap(e=>e.items).reduce((sum,item)=>sum+getRawHakiContributionTotal(item),0)).toBe(212)
    expect(overall('ace')).toBeCloseTo(538/7,10)
    expect(overall('teach')).toBeCloseTo(634/7,10)
  })
})
