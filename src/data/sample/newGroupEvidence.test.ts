import { describe, expect, it } from 'vitest'
import { sampleGroups } from './groups'
import { sampleMemberships } from './memberships'
import { sampleCharacters } from './characters'
import { sampleBattles } from './battles'
import { sampleEvidence } from './evidence'
import { sampleEvaluations } from './evaluations'
import { balancedV12 } from './calculationModels'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { validateHakiProfile } from '../../domain/haki/validation'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getUniqueCharacterList } from '../../application/getCharacterList'
import { getCharacterEvaluationTrace } from '../../application/getCharacterEvaluationTrace'
import { getCharacterBattleTimeline } from '../../application/getCharacterBattleTimeline'

const groups: Record<string, string[]> = {
  'revolutionary-army': ['sabo', 'morley', 'karasu'],
  cp0: ['lucci', 'kaku', 'stussy'],
}

const scores: Record<string, number[]> = {
  sabo: [87,83,82,86,88,86,87],
  morley: [76,78,77,69,80,75,83],
  karasu: [79,75,74,83,83,80,86],
  lucci: [86,82,85,88,89,81,80],
  kaku: [80,78,80,85,88,82,82],
  stussy: [73,72,70,80,86,85,77],
}

describe('v0.1.39 evidence-first Revolutionary Army and CP0 roster extension', () => {
  const ids = Object.values(groups).flat()
  const ownerByEvidence = new Map(sampleEvidence.map(e => [e.id, e]))
  const battleById = new Map(sampleBattles.map(b => [b.id, b]))

  it('reuses existing group identity, assigns unique memberships and preserves Stussy former status', () => {
    expect(sampleGroups.filter(({ id }) => id === 'revolutionary-army')).toHaveLength(1)
    expect(sampleGroups.filter(({ id }) => id === 'cp0')).toHaveLength(1)
    for(const [groupId, members] of Object.entries(groups)) {
      for(const id of members) {
        const character = sampleCharacters.filter(x => x.id === id)
        expect(character, id).toHaveLength(1)
        expect(character[0].crewId).toBe(groupId)
        expect(sampleMemberships.filter(x => x.groupId === groupId && x.characterId === id)).toHaveLength(1)
        expect(validateHakiProfile(character[0].combatProfile.haki), id).toEqual([])
      }
    }
    expect(sampleMemberships.find(m => m.characterId==='stussy')?.status).toBe('former')
    expect(getUniqueCharacterList().filter(x => ids.includes(x.character.id))).toHaveLength(6)
  })

  it('requires seven numeric rows, full Evidence ownership, explicit stat roles and E2/E3 on all new draft axes', () => {
    const refs = sampleEvidence.map(({id, subjectCharacterId}) => ({id, subjectCharacterId}))
    for(const id of ids) {
      const evals = sampleEvaluations.filter(e => e.characterId === id)
      expect(evals, id).toHaveLength(1)
      const ev=evals[0]
      expect(ev.status).toBe('draft')
      expect(ev.evaluationDataVersion).toBe('evaluation-0.1.43-evidence-audited-draft')
      expect(validateEvaluation(ev, refs), id).toEqual({valid:true,errors:[]})
      expect(ev.items).toHaveLength(7)
      expect(ev.items.map(item => item.score), id).toEqual(scores[id])
      expect(ev.items.every(item => item.readiness === 'E2' || item.readiness === 'E3')).toBe(true)
      expect(ev.items.every(item => item.evidenceIds.length > 0)).toBe(true)
      expect(ev.items.every(item => item.hakiContributions.length === 0)).toBe(true)
      for (const item of ev.items) {
        for (const evidenceId of item.evidenceIds) {
          const evidence=ownerByEvidence.get(evidenceId)
          expect(evidence?.subjectCharacterId, evidenceId).toBe(id)
          expect(evidence?.statContributions.some(x => x.stat===item.stat), evidenceId+'/'+item.stat).toBe(true)
          expect(evidence?.source.reference, evidenceId).toContain('ONE PIECE')
          expect(evidence?.uncertainty.length, evidenceId).toBeGreaterThan(25)
        }
      }
      const calculated=calculateBalancedCombatPower(ev, balancedV12).finalScore
      expect(calculated,id).toBeCloseTo(scores[id].reduce((n,x)=>n+x,0)/7,10)
      expect(getCharacterEvaluationTrace(id)?.flatMap(({evidence})=>evidence).length).toBeGreaterThanOrEqual(7)
    }
  })

  it('links 14 distinct official-source Evidence to 10 contexts, without mixing anime supplementary and manga canon', () => {
    expect(ids.reduce((n,id)=>n+sampleEvidence.filter(e=>e.subjectCharacterId===id).length,0)).toBe(14)
    const expectedBattles = new Set([
      'dressrosa-sabo-bastille','dressrosa-sabo-fujitora','marygeoise-sabo-infiltration',
      'marygeoise-revolutionary-captains','marygeoise-morley-terrain',
      'egghead-lucci-luffy','egghead-lucci-sentomaru','egghead-kaku-zoro',
      'egghead-cp0-seraphim-coop','egghead-stussy-sleep',
    ])
    for(const id of ids){
      const rows=sampleEvidence.filter(e=>e.subjectCharacterId===id)
      expect(rows.length,id).toBeGreaterThanOrEqual(2)
      for(const evidence of rows) {
        expect(expectedBattles.has(evidence.battleId),evidence.id).toBe(true)
        expect(battleById.has(evidence.battleId), evidence.id).toBe(true)
        expect(evidence.source.type).toBe(evidence.id==='evidence-karasu-soot-1083'?'canon':'supplementary')
        expect(evidence.interpretation).toContain('기본점수')
        expect(evidence.uncertainty.length).toBeGreaterThan(25)
      }
      expect(getCharacterBattleTimeline(id).length, id).toBeGreaterThanOrEqual(1)
    }
  })

  it('links recalibrated Kaku and Stussy scores only to documented combat conditions', () => {
    const kaku = sampleEvaluations.find(e => e.characterId === 'kaku')!
    const stussy = sampleEvaluations.find(e => e.characterId === 'stussy')!
    const kakuDecision = sampleEvidence.find(e => e.id === 'evidence-kaku-seraphim-1109')!
    expect(kakuDecision.fact).toContain('직접 제안')
    expect(kakuDecision.source.reference).toContain('ONE PIECE.com TV 1109')
    expect(kaku.items.find(i => i.stat === 'combatIQ')).toMatchObject({
      baseScore: 82, score: 82, readiness: 'E2',
    })
    expect(stussy.items.find(i => i.stat === 'speed')).toMatchObject({
      baseScore: 80, score: 80, readiness: 'E3',
    })
    expect(stussy.items.find(i => i.stat === 'combatIQ')).toMatchObject({
      baseScore: 85, score: 85, readiness: 'E2',
    })
    expect(sampleEvidence.find(e => e.id === 'evidence-stussy-infiltration-1105')
      ?.statContributions.find(c => c.stat === 'combatIQ')?.role).toBe('secondary')
    for (const characterId of ['sabo','morley','karasu','lucci','kaku','stussy']) {
      const evaluation = sampleEvaluations.find(e => e.characterId === characterId)!
      expect(evaluation.items.every(i => i.hakiContributions.length === 0)).toBe(true)
    }
  })

  it('preserves approved old 39 evaluations and no bonus invention under approved Hybrid A', () => {
    expect(sampleCharacters).toHaveLength(43) // includes one existing unscored Buggy
    expect(sampleEvaluations).toHaveLength(45)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(315)
    const legacy=sampleEvaluations.filter(e => !ids.includes(e.characterId))
    expect(legacy).toHaveLength(39)
    expect(legacy.flatMap(e=>e.items).flatMap(i=>i.hakiContributions).reduce((n,c)=>n+c.amount,0)).toBe(244)
    expect(sampleEvaluations.flatMap(e=>e.items).flatMap(i=>i.hakiContributions).reduce((n,c)=>n+c.amount,0)).toBe(244)
    const akainu=legacy.find(e=>e.id==='evaluation-akainu')!
    expect(akainu.items.find(i=>i.stat==='defense')?.baseScore).toBe(95)
    expect(akainu.items.find(i=>i.stat==='defense')?.hakiContributions).toEqual([])
  })
})
