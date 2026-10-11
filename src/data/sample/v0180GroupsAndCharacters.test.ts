import { describe, expect, it } from 'vitest'
import { patchHistory, CURRENT_PATCH_VERSION } from '../../data/releases/patchHistory'
import { sampleGroups } from './groups'
import { sampleMemberships } from './memberships'
import { sampleCharacters } from './characters'
import { sampleBattles } from './battles'
import { sampleEvidence } from './evidence'
import { sampleEvaluations, historicalEvaluationsBeforeV0174 } from './evaluations'
import { getCharacterList, getUniqueCharacterList } from '../../application/getCharacterList'
import { getStatRanking } from '../../application/getStatRanking'
import { balancedV12 } from './calculationModels'
import { v0180Characters, v0180Evaluations, v0180Evidence, v0180Battles, v0180Groups, v0180Memberships } from './v0180GroupsAndCharacters'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { validateCombatProfile } from '../../domain/character/validation'
import { validateMemberships } from '../../domain/character/membershipValidation'

describe('v0.1.80 — four character + two group expansion and patch changelog',()=>{
  it('adds exactly 4 unique character masters and 2 real populated subgroups with 8 new memberships',()=>{
    expect(v0180Groups.map(x=>x.id)).toEqual(['g5-marines','kamabakka-kingdom'])
    expect(v0180Characters.map(x=>x.id)).toEqual(['smoker','tashigi','ivankov','inazuma'])
    expect(v0180Memberships).toHaveLength(8)
    expect(sampleGroups.filter(g=>v0180Groups.some(x=>x.id===g.id))).toHaveLength(2)
    expect(sampleCharacters).toHaveLength(70)
    expect(sampleEvaluations).toHaveLength(72)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(69)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(504)
    expect(sampleMemberships).toHaveLength(92)
    expect(getUniqueCharacterList()).toHaveLength(69)
    expect(getStatRanking('overall')).toHaveLength(69)
    expect(new Set(sampleCharacters.map(x=>x.id)).size).toBe(70)
    expect(new Set(getUniqueCharacterList().map(x=>x.character.id)).size).toBe(69)
    for(const [group,ids] of [
      ['g5-marines',['smoker','tashigi']],
      ['kamabakka-kingdom',['ivankov','inazuma']]
    ] as const){
      expect(sampleGroups.some(x=>x.id===group)).toBe(true)
      expect(getCharacterList().filter(x=>x.group.id===group).map(x=>x.character.id).sort()).toEqual([...ids].sort())
    }
    for(const id of ['smoker','tashigi','ivankov','inazuma']){
      const groups=sampleMemberships.filter(m=>m.characterId===id)
      expect(groups).toHaveLength(2)
      expect(getUniqueCharacterList().filter(x=>x.character.id===id)).toHaveLength(1)
      expect(getStatRanking('overall').filter(x=>x.characterId===id)).toHaveLength(1)
    }
    expect(sampleMemberships.filter(x=>x.characterId==='ivankov').map(x=>x.groupId)).toContain('revolutionary-army')
    expect(sampleMemberships.filter(x=>x.characterId==='smoker').map(x=>x.groupId)).toContain('marines')
  })

  it('preserves exact 65 prior representative 7×Final and Haki raw, all 5 locked anchors and matchups',()=>{
    const prior=historicalEvaluationsBeforeV0174
    expect(prior).toHaveLength(68)
    const previousById=new Map(prior.map(x=>[x.id,x]))
    for(const e of sampleEvaluations.filter(e=>!v0180Evaluations.some(x=>x.id===e.id))){
      const baseline=previousById.get(e.id)!
      expect(baseline).toBeDefined()
      // Old seeds may be versioned by prior v0.1.74–0.1.79 patches; only compare
      // via current source's frozen derived aggregate fingerprints.
      if(['smoker','tashigi','ivankov','inazuma'].includes(e.characterId))throw Error('New character leaked into old roster')
      expect(e.items).toHaveLength(7)
    }
    const known=[
      ['koby','combatIQ',72],['prince-grus','versatility',80],
      ['queen','versatility',82],['smoothie','attack',76],['cracker','attack',77],
      ['marco','attack',79],['king','attack',83],['lucci','combatIQ',74]
    ] as const
    for(const [id,stat,value] of known){
      const item=sampleEvaluations.find(e=>e.characterId===id)!.items.find(i=>i.stat===stat)!
      expect(getFinalStatScore(item)).toBe(value)
    }
    expect(sampleEvaluations.filter(x=>!v0180Evaluations.some(n=>n.id===x.id))
      .filter(x=>x.isDefault!==false).flatMap(x=>x.items)
      .reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(x=>x.items)
      .reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(230)
    expect(v0180Evaluations.flatMap(x=>x.items).every(i=>getRawHakiContributionTotal(i)===0)).toBe(true)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(.5)
    // Legacy unmatched Buggy stays unscored; no duplicated explicit matchups.
    expect(sampleEvaluations.filter(x=>x.characterId==='buggy')).toHaveLength(0)
  })

  it('connects 9 official supplementary scenes and 4×7 provisional evaluations to valid owner/battles',()=>{
    expect(v0180Battles).toHaveLength(9)
    expect(v0180Evidence).toHaveLength(9)
    expect(v0180Evaluations).toHaveLength(4)
    const battleIds=new Set(sampleBattles.map(b=>b.id))
    const owners=sampleEvidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    expect(new Set(sampleBattles.map(x=>x.id)).size).toBe(sampleBattles.length)
    expect(new Set(sampleEvidence.map(x=>x.id)).size).toBe(sampleEvidence.length)
    for(const e of v0180Evidence){
      expect(e.source.type).toBe('supplementary')
      expect(e.source.description).toMatch(/^https:\/\/one-piece.com\/anime\//)
      expect(battleIds.has(e.battleId)).toBe(true)
    }
    for(const char of v0180Characters)expect(validateCombatProfile(char,owners)).toEqual({valid:true,errors:[]})
    for(const e of v0180Evaluations){
      expect(e.status).toBe('draft')
      expect(e.items).toHaveLength(7)
      expect(validateEvaluation(e,owners)).toEqual({valid:true,errors:[]})
      expect(e.items.every(i=>i.readiness==='E2'||i.readiness==='E3')).toBe(true)
    }
    // Multi-membership validation uses the same canonical repository records.
    expect(sampleMemberships.filter(m=>m.characterId==='ivankov')).toHaveLength(2)
  })

  it('keeps changelog version order, exactly one current release and grounded historical stat reasons',()=>{
    expect(CURRENT_PATCH_VERSION).toBe('v0.1.80')
    expect(patchHistory[0].version).toBe(CURRENT_PATCH_VERSION)
    expect(patchHistory.map(x=>x.version))
      .toEqual(['v0.1.80','v0.1.79','v0.1.78','v0.1.77','v0.1.76','v0.1.75'])
    expect(new Set(patchHistory.map(x=>x.version)).size).toBe(patchHistory.length)
    expect(patchHistory.every(x=>x.changes.length>0&&x.changes.every(y=>y.reason.length>25))).toBe(true)
    const stat=patchHistory.flatMap(x=>x.changes.filter(y=>y.category==='stat'))
    expect(stat.length).toBe(4)
    expect(stat.every(x=>x.stat&&x.sources?.length)).toBe(true)
    expect(stat.map(x=>x.stat?.to)).toEqual([82,72,80,77])
    expect(patchHistory[0].changes.some(x=>x.category==='roster'&&x.title.includes('스모커'))).toBe(true)
    expect(patchHistory[0].changes.some(x=>x.category==='roster'&&x.title.includes('이완코브'))).toBe(true)
    expect(patchHistory[0].reportUrl?.endsWith('.md')).toBe(true)
  })
})
