import { describe, it, expect } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleMemberships } from './memberships'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleEvaluations } from './evaluations'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { validateEvaluation } from '../../domain/evaluation/validation'

/** First v0.4 integrity gate: additive, no model migrations. Not a historical snapshot. */
describe('v0.4 preparation: live reference and calculation integrity',()=>{
  it('keeps identity and evidence references unique and linked',()=>{
    const ids = <T,>(list:T[], read:(x:T)=>string) => list.map(read)
    for(const list of [
      ids(sampleCharacters,x=>x.id),
      ids(sampleEvidence,x=>x.id),
      ids(sampleBattles,x=>x.id),
      ids(sampleEvaluations,x=>x.id),
      ids(sampleMemberships,x=>x.characterId+'::'+x.groupId),
    ]) expect(new Set(list).size).toBe(list.length)
    const characters=new Set(sampleCharacters.map(x=>x.id))
    const battles=new Set(sampleBattles.map(x=>x.id))
    const groups=new Set(sampleMemberships.map(x=>x.groupId))
    expect(groups.size).toBeGreaterThan(0)
    for(const x of sampleMemberships) expect(characters.has(x.characterId)).toBe(true)
    for(const x of sampleEvidence){
      expect(characters.has(x.subjectCharacterId)).toBe(true)
      expect(battles.has(x.battleId)).toBe(true)
    }
    const links=sampleEvidence.map(x=>({id:x.id,subjectCharacterId:x.subjectCharacterId}))
    for(const e of sampleEvaluations){
      expect(characters.has(e.characterId)).toBe(true)
      expect(validateEvaluation(e,links).errors).toEqual([])
    }
  })
  it('recomputes the 7-stat overall deterministically, excluding incidental timestamps',()=>{
    const rows=getStatRanking('overall')
    expect(rows).toHaveLength(82)
    for(const row of rows.filter(x=>x.characterId!=='charlos')) {
      const first=getCombatPower(row.characterId)
      const second=getCombatPower(row.characterId)
      expect(first.finalScore).toBeCloseTo(second.finalScore,8)
      expect(first.finalScore).toBeCloseTo(row.score,8)
      expect(first.finalScore).toBeGreaterThanOrEqual(0)
      expect(first.finalScore).toBeLessThanOrEqual(100)
    }
  })
})
