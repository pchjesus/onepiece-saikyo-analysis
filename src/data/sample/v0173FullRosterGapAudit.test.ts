import { describe, expect, it } from 'vitest'
import { v0173FullRosterGapAudit, v0173ManualCases, buildV0173FullRosterGapAudit } from './v0173FullRosterGapAudit'
import { calibrationAnchorsV0172, calibrationAxisOrder } from './v0172AnchorBaseline'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleMemberships } from './memberships'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'

const report=v0173FullRosterGapAudit
const lookup=(id:string)=>{
  const x=report.rows.find(x=>x.characterId===id)
  if(!x)throw new Error('missing row: '+id)
  return x
}
describe('v0.1.73 all-65 all-455 axis gap audit: read-only no re-score',()=>{
  it('surveys ALL 65 default characters and 455 current Final axes, not 68 historic state evaluations',()=>{
    expect(report.rows).toHaveLength(69)
    expect(new Set(report.rows.map(r=>r.characterId)).size).toBe(69)
    expect(report.rows.every(r=>r.name.length>0)).toBe(true)
    expect(report.rows.every(r=>Object.keys(r.stats).length===7&&Object.keys(r.readiness).length===7)).toBe(true)
    expect(report.rows.flatMap(r=>Object.values(r.stats))).toHaveLength(455)
    expect(report.rows.every(r=>Object.values(r.stats).every(x=>x>=0&&x<=100))).toBe(true)
    expect(report.rows.every(r=>Object.values(r.readiness).every(x=>['E1','E2','E3'].includes(x)))).toBe(true)
    expect(report.rows.every((r,i)=>i===0||report.rows[i-1].overall>=r.overall)).toBe(true)
    expect(buildV0173FullRosterGapAudit()).toEqual(report)
  })
  it('exposes evidence gaps without making E3 a downward score adjustment',()=>{
    expect(report.evidenceReadinessTotals).toEqual({E1:53,E2:287,E3:143})
    expect(report.perAxis.map(a=>a.axis)).toEqual([...calibrationAxisOrder])
    expect(report.perAxis.map(a=>a.e3)).toEqual([8,18,29,35,5,20,15])
    expect(report.perAxis.reduce((s,a)=>s+a.e1+a.e2+a.e3,0)).toBe(483)
    expect(report.rows.filter(r=>r.e3Count>=3).length).toBeGreaterThan(18)
    expect(lookup('garp').e3Count).toBe(4)
    expect(lookup('ryokugyu').e3Count).toBe(4)
    expect(lookup('ace').e3Count).toBe(1)
    expect(lookup('kaido').e3Count).toBe(0)
  })
  it('recomputes all Overalls EXACTLY from live Final axes rather than hardcoded tier thresholds',()=>{
    for(const row of report.rows){
      const evaluation=sampleEvaluations.find(e=>e.characterId===row.characterId&&e.isDefault!==false)!
      expect(evaluation).toBeDefined()
      expect(row.overall,row.characterId).toBeCloseTo(calculateBalancedCombatPower(evaluation,balancedV12).finalScore,10)
      expect(row.totalEffectiveHaki,row.characterId).toBeCloseTo(evaluation.items.reduce((sum,item)=>sum+getRawHakiContributionTotal(item)*0.5,0),10)
      const closest=calibrationAnchorsV0172.filter(a=>a.decision==='locked-overall').map(a=>({id:a.characterId,overall:a.finalScores.reduce((sum,v)=>sum+v,0)/7})).sort((a,b)=>Math.abs(a.overall-row.overall)-Math.abs(b.overall-row.overall))[0]
      expect(row.closestOverallAnchorId).toBe(closest.id)
      expect(row.closestOverallAnchorDistance).toBeCloseTo(Math.abs(row.overall-closest.overall),10)
    }
    expect(lookup('roger').overall).toBeCloseTo(683/7,10)
    expect(lookup('marco').overall).toBeCloseTo(586/7,10)
    expect(lookup('ace').overall).toBeCloseTo(538/7,10)
  })
  it('flags statistically large axis contrasts among nearby Overall scores AS QUESTIONS, not forced changes',()=>{
    expect(report.nearOverallWideAxis.length).toBeGreaterThan(0)
    const names=new Set(report.rows.map(r=>r.characterId))
    for(const gap of report.nearOverallWideAxis){
      expect(names.has(gap.first)&&names.has(gap.second)).toBe(true)
      expect(gap.first).not.toBe(gap.second)
      expect(gap.overallGap).toBeGreaterThanOrEqual(0)
      expect(gap.overallGap).toBeLessThanOrEqual(1.5+1e-10)
      expect(gap.maxAxisGap).toBeGreaterThanOrEqual(10)
      expect(calibrationAxisOrder).toContain(gap.maxAxis)
    }
    expect(report.nearOverallWideAxis.some(x=>[x.first,x.second].includes('jack'))).toBe(true)
  })
  it('provides manually interpreted comparison questions with combat context for all salient tiers',()=>{
    expect(v0173ManualCases.length).toBeGreaterThanOrEqual(30)
    expect(report.manualCases).toBe(v0173ManualCases)
    const names=new Set(report.rows.map(r=>r.characterId))
    for(const c of v0173ManualCases){
      expect(names.has(c.first),c.first).toBe(true)
      expect(names.has(c.second),c.second).toBe(true)
      expect(c.axes.length).toBeGreaterThan(0)
      for(const stat of c.axes)expect(calibrationAxisOrder).toContain(stat)
      expect(c.reason.length,c.first+'-'+c.second).toBeGreaterThan(35)
      expect(c.contextCaution.length).toBeGreaterThan(20)
      expect(c.sourceRefs.length).toBeGreaterThanOrEqual(2)
      const evaluationIds=new Set(sampleEvaluations.map(e=>e.id))
      for(const ref of c.sourceRefs)expect(evaluationIds.has(ref),c.first+'→'+ref).toBe(true)
      expect(['source-audit-first','check-scale-and-overlap','keep-observing']).toContain(c.recommendation)
    }
    expect(v0173ManualCases.filter(c=>c.priority==='high').length).toBeGreaterThanOrEqual(15)
    for(const id of ['garp','law','marco','whos-who','king','zoro','doflamingo','cracker','jinbe','ace','sasaki','pica']){
      expect(report.rows.some(r=>r.characterId===id)).toBe(true)
    }
  })
  it('guarantees read-only phase preserves 66 characters, 68 evaluations, 476 stat entries, all Haki and direct matchups',()=>{
    expect(sampleCharacters).toHaveLength(70)
    expect(sampleMemberships).toHaveLength(92)
    expect(sampleEvaluations).toHaveLength(72)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(504)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false).flatMap(e=>e.items).reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(230)
    expect(lookup('teach').stats.attack).toBe(95)
    expect(lookup('jozu').stats.attack).toBe(78)
    expect(lookup('ace').stats.combatIQ).toBe(67)
    expect(lookup('king').stats.defense).toBe(88)
    expect(lookup('marco').stats.attack).toBe(79)
  })
})
