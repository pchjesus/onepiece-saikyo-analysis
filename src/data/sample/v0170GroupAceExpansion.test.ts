import { describe, expect, it } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleGroups } from './groups'
import { sampleMemberships } from './memberships'
import { sampleBattles } from './battles'
import { sampleEvidence } from './evidence'
import { sampleEvaluations } from './evaluations'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { validateCombatProfile } from '../../domain/character/validation'
import { validateMemberships } from '../../domain/character/membershipValidation'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { validateHakiProfile } from '../../domain/haki/validation'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getUniqueCharacterList, getCharacterList } from '../../application/getCharacterList'
import { getStatRanking } from '../../application/getStatRanking'
import { v0170Seeds, v0170Groups, v0170Characters, v0170Memberships, v0170Battles, v0170Evidence, v0170Evaluations } from './v0170GroupAceExpansion'
import { v0170TeachUpsideReview, v0170TeachReviewSources } from './v0170TeachUpsideAudit'

const newIds = ['koby','prince-grus','vergo','pica','diamante','ace'] as const
const evalFor = (id: string) => {
  const e = sampleEvaluations.find(e=>e.characterId===id && e.isDefault!==false)
  if(!e) throw new Error('Missing evaluation: '+id)
  return e
}

describe('v0.1.70 SWORD + Donquixote + Ace actual additive data and Teach no-score review', () => {
  it('adds exactly six Characters, two Groups and 11 Memberships, no existing identity duplicate', () => {
    expect(v0170Seeds.map(s=>s.id)).toEqual([...newIds])
    expect(v0170Characters).toHaveLength(6)
    expect(v0170Groups.map(g=>g.id)).toEqual(['sword','donquixote-family'])
    expect(v0170Memberships).toHaveLength(11)
    expect(sampleCharacters).toHaveLength(66)
    expect(new Set(sampleCharacters.map(c=>c.id)).size).toBe(66)
    expect(sampleGroups.map(g=>g.id)).toContain('sword')
    expect(sampleGroups.find(g=>g.id==='sword')?.parentGroupId).toBe('marines')
    expect(sampleMemberships).toHaveLength(84)
    expect(validateMemberships(sampleCharacters,sampleGroups,sampleMemberships)).toEqual({valid:true,errors:[]})
    expect(sampleMemberships.filter(m=>m.characterId==='x-drake'&&m.groupId==='sword')).toHaveLength(1)
    expect(sampleMemberships.filter(m=>m.characterId==='doflamingo'&&m.groupId==='donquixote-family')).toHaveLength(1)
    expect(sampleCharacters.filter(c=>c.id==='x-drake')).toHaveLength(1)
    expect(sampleCharacters.filter(c=>c.id==='doflamingo')).toHaveLength(1)
    expect(sampleMemberships.find(m=>m.characterId==='ace')?.status).toBe('historical')
    expect(sampleMemberships.some(m=>m.characterId==='vergo'&&m.groupId==='marines'&&m.status==='former')).toBe(true)
    expect(getUniqueCharacterList()).toHaveLength(65)
    expect(getStatRanking('overall')).toHaveLength(65)
    expect(new Set(getStatRanking('overall').map(x=>x.characterId)).size).toBe(65)
    expect(getCharacterList().filter(x=>x.group.id==='sword')).toHaveLength(3)
    expect(getCharacterList().filter(x=>x.group.id==='donquixote-family')).toHaveLength(4)
  })

  it('uses only genuine new battle situations and reuses Ace vs Teach and shared SWORD scenes', () => {
    expect(v0170Battles).toHaveLength(10)
    expect(new Set(v0170Battles.map(b=>b.id)).size).toBe(10)
    expect(v0170Evidence).toHaveLength(13)
    expect(new Set(v0170Evidence.map(e=>e.id)).size).toBe(13)
    const ids = new Set(sampleBattles.map(b=>b.id))
    expect(new Set(sampleBattles.map(b=>b.id)).size).toBe(sampleBattles.length)
    const aceVsTeach = v0170Evidence.find(e=>e.id==='evidence-v0170-ace-teach')!
    expect(aceVsTeach.battleId).toBe('banaro-teach-ace')
    expect(v0170Battles.some(b=>b.id==='banaro-teach-ace')).toBe(false)
    expect(v0170Evidence.find(e=>e.id==='evidence-v0170-koby-impact')?.battleId)
      .toBe(v0170Evidence.find(e=>e.id==='evidence-v0170-prince-grus-clay')?.battleId)
    for(const evidence of v0170Evidence){
      expect(ids.has(evidence.battleId),evidence.id).toBe(true)
      expect(evidence.source.type,evidence.id).toBe('supplementary')
      expect(evidence.source.description,evidence.id).toMatch(/^https:\/\/one-piece\.com\/anime\//)
      expect(evidence.fact.length,evidence.id).toBeGreaterThan(20)
      expect(evidence.uncertainty.length,evidence.id).toBeGreaterThan(20)
      expect(sampleCharacters.some(c=>c.id===evidence.subjectCharacterId)).toBe(true)
      expect(evidence.statContributions.length,evidence.id).toBeGreaterThan(0)
    }
  })

  it('registers six independent seven-stat draft ratings while all existing evaluations and Haki Raw stay unchanged', () => {
    expect(v0170Evaluations).toHaveLength(6)
    expect(sampleEvaluations).toHaveLength(68)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(65)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(476)
    const owner = sampleEvidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    for(const seed of v0170Seeds){
      const ev=evalFor(seed.id)
      expect(ev.status).toBe('draft')
      expect(ev.evaluationDataVersion).toBe('evaluation-0.1.70-expansion-draft')
      expect(ev.items.map(i=>i.score)).toEqual([...seed.scores])
      expect(ev.items.map(i=>i.readiness)).toEqual([...seed.read])
      expect(ev.items.flatMap(i=>i.hakiContributions)).toHaveLength(0)
      expect(ev.items.every(i=>i.evidenceIds.length>0)).toBe(true)
      expect(ev.items.every(i=>i.rationale.length>28)).toBe(true)
      expect(validateEvaluation(ev,owner)).toEqual({valid:true,errors:[]})
      const char=sampleCharacters.find(c=>c.id===seed.id)!
      expect(validateCombatProfile(char,owner)).toEqual({valid:true,errors:[]})
      expect(validateHakiProfile(char.combatProfile.haki)).toEqual([])
      expect(calculateBalancedCombatPower(ev,balancedV12).finalScore)
        .toBeCloseTo([...seed.scores].reduce((a,b)=>a+b,0)/7,10)
    }
    expect(sampleEvaluations.filter(e=>!newIds.includes(e.characterId as typeof newIds[number]))).toHaveLength(62)
    expect(sampleCharacters.filter(c=>!newIds.includes(c.id as typeof newIds[number]))).toHaveLength(60)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false).flatMap(e=>e.items).reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((s,i)=>s+getRawHakiContributionTotal(i),0)).toBe(230)
  })

  it('guards Teach score, all prior scores, event source ownership, no automatic Teach upside', () => {
    const expectTeach=[95,89,95,82,93,87,93]
    expect(evalFor('teach').items.map(i=>i.score)).toEqual(expectTeach)
    expect(evalFor('teach').evaluationDataVersion).toBe('evaluation-0.1.26-draft')
    expect(v0170TeachUpsideReview).toHaveLength(7)
    expect(v0170TeachUpsideReview.map(r=>r.stat)).toEqual(['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility'])
    const actual=evalFor('teach')
    for(const r of v0170TeachUpsideReview){
      const s=actual.items.find(i=>i.stat===r.stat)!
      expect(s.score).toBe(r.baselineFinal)
      expect(s.readiness).toBe(r.readiness)
      expect(s.hakiContributions).toHaveLength(0)
      for(const id of r.supportingEvidence){
        const e=sampleEvidence.find(x=>x.id===id)
        expect(e?.subjectCharacterId,id).toBe('teach')
        expect(s.evidenceIds,id).toContain(id)
      }
      expect(r.nextProofRequirement.length).toBeGreaterThan(30)
    }
    expect(v0170TeachReviewSources.every(u=>u.startsWith('https://one-piece.com/'))).toBe(true)
    expect(evalFor('vista').items.map(i=>i.score)).toEqual([82,79,77,80,87,77,74])
    expect(evalFor('shanks').items.map(i=>i.score)).toEqual([97,91,88,95,96,93,88])
  })
})
