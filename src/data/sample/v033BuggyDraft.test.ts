import { describe, it, expect } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleMemberships } from './memberships'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { getStatRanking } from '../../application/getStatRanking'
import { getUniqueCharacterList } from '../../application/getCharacterList'
import { getMatchupRoster } from '../../application/getMatchupHub'
import { getCombatPower } from '../../application/getCombatPower'

describe('Buggy provisional lower-tier analysis (E3)', () => {
  it('does not use fame or titles as stat bonuses, and retains all seven uncertainty markers', () => {
    const data = sampleEvaluations.find(x=>x.characterId==='buggy')
    expect(data).toBeDefined()
    expect(data?.status).toBe('draft')
    expect(data?.items).toHaveLength(7)
    expect(data?.items.every(x=>x.readiness==='E3' && x.hakiContributions.length===0)).toBe(true)
    expect(validateEvaluation(data!, sampleEvidence.map(x=>({id:x.id,subjectCharacterId:x.subjectCharacterId})))).toEqual({valid:true,errors:[]})
    expect(getCombatPower('buggy').finalScore).toBeCloseTo(38,5)
    expect(getStatRanking('overall')).toHaveLength(72)
    expect(getStatRanking('overall').slice(-1)[0]?.characterId).toBe('buggy')
    expect(getMatchupRoster()).toHaveLength(72)
  })
  it('adds official-summary evidence with matching battle IDs and retains unique current identity', () => {
    const evidence=sampleEvidence.filter(e=>e.subjectCharacterId==='buggy')
    expect(evidence).toHaveLength(2)
    for(const e of evidence){
      expect(sampleBattles.some(b=>b.id===e.battleId)).toBe(true)
      expect(e.source.type).toBe('supplementary')
      expect(e.uncertainty).toBeTruthy()
    }
    expect(sampleCharacters).toHaveLength(72)
    expect(sampleEvaluations).toHaveLength(76)
    expect(sampleMemberships).toHaveLength(97)
    expect(getUniqueCharacterList()).toHaveLength(72)
    expect(sampleMemberships.filter(x=>x.characterId==='buggy').map(x=>x.groupId).sort())
      .toEqual(['cross-guild','roger-pirates','seven-warlords'])
  })
})
