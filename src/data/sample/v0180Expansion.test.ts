import {describe,it,expect} from 'vitest'
import {sampleCharacters} from './characters'
import {sampleGroups} from './groups'
import {sampleMemberships} from './memberships'
import {sampleEvaluations} from './evaluations'
import {sampleBattles} from './battles'
import {sampleEvidence} from './evidence'
import {patchHistory} from '../patchHistory'
import {v0180CommanderAttackAudit} from './v0180CommanderAttackAudit'
import {getFinalStatScore,getRawHakiContributionTotal} from '../../domain/evaluation/score'
import {getCharacterList} from '../../application/getCharacterList'
import {getStatRanking} from '../../application/getStatRanking'
import {balancedV12} from './calculationModels'
import {calculateBalancedCombatPower} from '../../domain/calculation/calculateCombatPower'
import {v0180Characters,v0180Groups,v0180Memberships,v0180Battles,v0180Evidence,v0180Evaluations} from './v0180CharacterExpansion'

describe('v0.1.80 patch history and additive roster',()=>{
  it('exposes newest-first versioned reasons and numeric source links',()=>{
    expect(patchHistory[0].version).toBe('v0.4.32')
    expect(patchHistory.map(p=>p.version)).toEqual(['v0.4.32','v0.4.31','v0.4.30','v0.4.29','v0.4.28','v0.4.27','v0.4.26','v0.4.25','v0.4.24','v0.4.23','v0.4.22','v0.4.21','v0.4.20','v0.4.19','v0.4.18','v0.4.17','v0.4.16','v0.4.15','v0.4.14','v0.4.13','v0.4.12','v0.4.11','v0.4.10','v0.4.9','v0.4.8','v0.4.7','v0.4.6','v0.4.5','v0.4.4','v0.4.3','v0.4.2','v0.4.1','v0.4.0','v0.3.3','v0.3.2','v0.3.1','v0.3.0','v0.2.1','v0.2.0','v0.1.81','v0.1.80','v0.1.79','v0.1.78','v0.1.77','v0.1.76','v0.1.75'])
    const q=patchHistory.find(p=>p.version==='v0.1.79')!.changes.find(c=>c.characterId==='queen')!
    expect([q.before,q.after,q.stat]).toEqual([80,82,'versatility'])
    expect(q.reason?.length).toBeGreaterThan(40)
    expect(q.evidence?.length).toBe(2)
    expect(patchHistory.flatMap(p=>p.changes).filter(c=>c.kind==='score')
      .every(c=>c.before!==undefined&&c.after!==undefined&&Boolean(c.reason))).toBe(true)
    const historyButton=patchHistory.find(p=>p.version==='v0.1.80')!.changes.find(c=>c.title==='패치 내역 버튼 추가')!
    expect(historyButton.detail).toBeUndefined()
    expect(historyButton.reason).toBeUndefined()
  })
  it('adds four new characters in two existing groups, with preserved historical baselines',()=>{
    expect(v0180Characters).toHaveLength(4)
    expect(v0180Groups).toHaveLength(0)
    expect(v0180Memberships).toHaveLength(4)
    expect(v0180Battles).toHaveLength(10)
    expect(v0180Evidence).toHaveLength(10)
    expect(v0180Evaluations).toHaveLength(4)
    expect(sampleCharacters).toHaveLength(72)
    expect(sampleGroups.some(g=>['g5','newkama-land'].includes(g.id))).toBe(false)
    expect(v0180Memberships.filter(x=>x.groupId==='marines').map(x=>x.characterId).sort()).toEqual(['smoker','tashigi'])
    expect(v0180Memberships.filter(x=>x.groupId==='revolutionary-army').map(x=>x.characterId).sort()).toEqual(['inazuma','ivankov'])
    expect(sampleMemberships).toHaveLength(97)
    expect(sampleEvaluations).toHaveLength(76)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(72)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(532)
    expect(new Set(sampleCharacters.map(c=>c.id)).size).toBe(72)
    expect(new Set(sampleEvidence.map(e=>e.id)).size).toBe(sampleEvidence.length)
    expect(new Set(sampleBattles.map(b=>b.id)).size).toBe(sampleBattles.length)
    expect(getCharacterList().filter(x=>['smoker','ivankov','tashigi','inazuma'].includes(x.character.id)).length).toBe(4)
    expect(getStatRanking('overall')).toHaveLength(83)
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
    expect(v0180Evaluations.find(e=>e.characterId==='tashigi')!.items.map(i=>i.score)).toEqual([67,64,69,67,72,67,68])
    expect(v0180Evaluations.find(e=>e.characterId==='inazuma')!.items.map(i=>i.score)).toEqual([71,67,70,70,76,74,80])
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((n,i)=>n+getRawHakiContributionTotal(i),0)).toBe(230)
    expect(balancedV12.configuration.hakiWeight).toBe(.5)
    expect(calculateBalancedCombatPower(v0180Evaluations[0],balancedV12).finalScore).toBeCloseTo(535/7,10)
    expect(calculateBalancedCombatPower(v0180Evaluations[1],balancedV12).finalScore).toBeCloseTo(556/7,10)
  })
  it('ties each of six Attack reviews to owned evidence without changing any existing Final scores',()=>{
    expect(v0180CommanderAttackAudit).toHaveLength(6)
    expect(new Set(v0180CommanderAttackAudit.map(a=>a.characterId)).size).toBe(6)
    for(const a of v0180CommanderAttackAudit){
      const e=sampleEvaluations.find(x=>x.characterId===a.characterId&&x.isDefault!==false)!
      const attack=e.items.find(x=>x.stat==='attack')!
      expect(getFinalStatScore(attack)).toBe(a.finalAttack)
      expect(attack.readiness).toBe('E2')
      for(const evidenceId of a.evidenceIds)
        expect(sampleEvidence.find(x=>x.id===evidenceId)?.subjectCharacterId).toBe(a.characterId)
      for(const dimension of [a.peakOutput,a.verifiedHit,a.sustainedPressure,a.matchup,a.rationale])
        expect(dimension.length).toBeGreaterThan(10)
      expect(patchHistory.find(p=>p.version==='v0.1.80')!.changes.some(x=>x.characterId===a.characterId&&x.detail?.includes('실제 유효타'))).toBe(true)
    }
  })

})
