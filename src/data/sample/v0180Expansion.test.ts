import {describe,it,expect} from 'vitest'
import {sampleCharacters} from './characters'
import {sampleGroups} from './groups'
import {sampleMemberships} from './memberships'
import {sampleEvaluations} from './evaluations'
import {sampleBattles} from './battles'
import {sampleEvidence} from './evidence'
import {patchHistory} from '../patchHistory'
import {getFinalStatScore,getRawHakiContributionTotal} from '../../domain/evaluation/score'
import {getCharacterList} from '../../application/getCharacterList'
import {getStatRanking} from '../../application/getStatRanking'
import {balancedV12} from './calculationModels'
import {calculateBalancedCombatPower} from '../../domain/calculation/calculateCombatPower'
import {v0180Characters,v0180Groups,v0180Memberships,v0180Battles,v0180Evidence,v0180Evaluations} from './v0180CharacterExpansion'

describe('v0.1.80 patch history and additive roster',()=>{
  it('exposes newest-first versioned reasons and numeric source links',()=>{
    expect(patchHistory[0].version).toBe('v0.1.80')
    expect(patchHistory.map(p=>p.version)).toEqual(['v0.1.80','v0.1.79','v0.1.78','v0.1.77','v0.1.76','v0.1.75'])
    const q=patchHistory.find(p=>p.version==='v0.1.79')!.changes.find(c=>c.characterId==='queen')!
    expect([q.before,q.after,q.stat]).toEqual([80,82,'versatility'])
    expect(q.reason.length).toBeGreaterThan(40)
    expect(q.evidence?.length).toBe(2)
    expect(patchHistory.every(p=>p.changes.every(c=>c.reason&&c.detail))).toBe(true)
  })
  it('adds two unique default characters, two groups, four memberships, six battles/evidence and 14 axes',()=>{
    expect(v0180Characters).toHaveLength(2)
    expect(v0180Groups).toHaveLength(2)
    expect(v0180Memberships).toHaveLength(4)
    expect(v0180Battles).toHaveLength(6)
    expect(v0180Evidence).toHaveLength(6)
    expect(v0180Evaluations).toHaveLength(2)
    expect(sampleCharacters).toHaveLength(68)
    expect(sampleGroups.some(g=>g.id==='g5'&&g.parentGroupId==='marines')).toBe(true)
    expect(sampleGroups.some(g=>g.id==='newkama-land'&&g.parentGroupId==='impel-down')).toBe(true)
    expect(sampleMemberships).toHaveLength(88)
    expect(sampleEvaluations).toHaveLength(70)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(67)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(490)
    expect(new Set(sampleCharacters.map(c=>c.id)).size).toBe(68)
    expect(new Set(sampleEvidence.map(e=>e.id)).size).toBe(sampleEvidence.length)
    expect(new Set(sampleBattles.map(b=>b.id)).size).toBe(sampleBattles.length)
    expect(getCharacterList().filter(x=>['smoker','ivankov'].includes(x.character.id)).length).toBeGreaterThanOrEqual(2)
    expect(getStatRanking('overall')).toHaveLength(67)
  })
  it('uses supplementary-only source provenance, valid references, no invented Haki Raw',()=>{
    const battles=new Set(sampleBattles.map(b=>b.id))
    const owners=new Set(sampleEvidence.map(e=>e.id))
    for(const e of v0180Evidence){
      expect(e.source.type).toBe('supplementary')
      expect(battles.has(e.battleId)).toBe(true)
      expect(e.source.description).toMatch(/^https:\/\/one-piece.com\//)
    }
    for(const e of v0180Evaluations){
      expect(e.items).toHaveLength(7)
      expect(e.items.every(i=>i.evidenceIds.every(id=>owners.has(id)))).toBe(true)
      expect(e.items.every(i=>getRawHakiContributionTotal(i)===0)).toBe(true)
      expect(e.items.every(i=>i.score===getFinalStatScore(i))).toBe(true)
      expect(e.status).toBe('draft')
    }
    expect(v0180Evaluations.find(e=>e.characterId==='smoker')!.items.map(i=>i.score)).toEqual([74,73,78,76,78,76,80])
    expect(v0180Evaluations.find(e=>e.characterId==='ivankov')!.items.map(i=>i.score)).toEqual([77,74,82,77,81,79,86])
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((n,i)=>n+getRawHakiContributionTotal(i),0)).toBe(230)
    expect(balancedV12.configuration.hakiWeight).toBe(.5)
    expect(calculateBalancedCombatPower(v0180Evaluations[0],balancedV12).finalScore).toBeCloseTo(535/7,10)
    expect(calculateBalancedCombatPower(v0180Evaluations[1],balancedV12).finalScore).toBeCloseTo(556/7,10)
  })
})
