import {describe,it,expect} from 'vitest'
import {getStatComparison,getStatComparisonSide,getStatComparisonRoster} from './getStatComparison'
import {getStatRanking} from './getStatRanking'
import {sampleEvaluations} from '../data/sample/evaluations'
import {getFinalStatScore} from '../domain/evaluation/score'
import {balancedV12} from '../data/sample/calculationModels'

describe('v0.2.0 stat comparison uses live canonical evaluation and evidence',()=>{
  it('compares same stat without producing any unapproved bonus or changed score',()=>{
    const before=sampleEvaluations.map(e=>[e.id,...e.items.map(i=>getFinalStatScore(i,balancedV12.configuration.hakiWeight))])
    const pair=getStatComparison('attack','king','katakuri')!
    expect(pair.difference).toBe(0)
    expect(pair.left.final).toBe(83)
    expect(pair.right.final).toBe(83)
    expect(pair.left.readiness).toBe('E2')
    expect(pair.right.readiness).toBe('E2')
    expect(pair.left.attackAudit?.verifiedHit.length).toBeGreaterThan(8)
    expect(pair.right.attackAudit?.matchup.length).toBeGreaterThan(8)
    expect(getStatRanking('attack').find(x=>x.characterId==='king')?.score).toBe(pair.left.final)
    expect(getStatRanking('attack').find(x=>x.characterId==='katakuri')?.score).toBe(pair.right.final)
    expect(sampleEvaluations.map(e=>[e.id,...e.items.map(i=>getFinalStatScore(i,balancedV12.configuration.hakiWeight))])).toEqual(before)
  })
  it('resolves opponent-owned source and battle context using Evidence IDs and role, never source text as a numeric stat',()=>{
    const pair=getStatComparison('attack','queen','cracker')!
    for(const side of [pair.left,pair.right]){
      expect(side.evidence.length).toBeGreaterThan(0)
      expect(side.missingEvidenceIds).toEqual([])
      expect(side.evidence.every(x=>x.evidence.subjectCharacterId===side.characterId)).toBe(true)
      expect(side.evidence.every(x=>x.evidence.fact.length>0&&x.evidence.interpretation.length>0)).toBe(true)
      expect(side.base+side.effectiveHaki).toBe(side.final)
      expect(side.hakiWeight).toBe(.5)
      expect(side.evidence.some(x=>x.battle!==undefined)).toBe(true)
    }
  })
  it('handles invalid selection and represents multiple evaluation eras without new Character IDs',()=>{
    expect(getStatComparison('attack','king','king')).toBeUndefined()
    expect(getStatComparison('attack','king','nonexistent')).toBeUndefined()
    expect(getStatComparisonSide('attack','nonexistent')).toBeUndefined()
    const roster=getStatComparisonRoster()
    expect(roster).toHaveLength(71)
    expect(new Set(roster.map(x=>x.id)).size).toBe(71)
    const multi=roster.find(x=>x.states.length>1)!
    expect(multi).toBeDefined()
    expect(multi.states.length).toBeGreaterThan(1)
    for(const state of multi.states){
      const side=getStatComparisonSide('defense',multi.id,state.id||undefined)!
      expect(side.evaluationId).toBeTruthy()
      expect(side.characterId).toBe(multi.id)
      expect(side.stat).toBe('defense')
    }
    expect(getStatComparisonSide('speed',multi.id,'nonexistent-era')).toBeUndefined()
  })
  it('retains ordinary non-Attack stats without manufacturing the six-person Attack audit',()=>{
    const pair=getStatComparison('defense','king','katakuri')!
    expect(pair.left.attackAudit).toBeUndefined()
    expect(pair.right.attackAudit).toBeUndefined()
    expect(pair.left.final).toBe(getStatRanking('defense').find(x=>x.characterId==='king')?.score)
  })
})
