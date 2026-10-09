import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { sampleEvidence } from '../../data/sample/evidence'
import { sampleMatchups } from '../../data/sample/matchups'
import { balancedV12 } from '../../data/sample/calculationModels'
import { getFinalStatScore, getRawHakiContributionTotal } from '../evaluation/score'
import { COMBAT_STATS, type CombatStat } from '../evaluation/types'
import { calculateBalancedCombatPower } from './calculateCombatPower'

/** Read-only v0.1.59 case queue: requires human source judgment and explicit approval before any scoring edit. */
const defaults = sampleEvaluations.filter(e => e.isDefault !== false)
const find = (id: string, stat: CombatStat) => {
  const evaluation = defaults.find(e => e.characterId === id)
  if (!evaluation) throw new Error('No default Evaluation: ' + id)
  const item = evaluation.items.find(i => i.stat === stat)
  if (!item) throw new Error('No axis: ' + id + '/' + stat)
  return item
}
const highE3 = [
  ['garp','stamina',99], ['garp','speed',98], ['garp','combatIQ',97], ['garp','versatility',91],
  ['shanks','speed',95], ['shanks','stamina',88],
  ['mihawk','speed',94], ['mihawk','combatIQ',92], ['mihawk','stamina',91],
  ['kuzan','combatIQ',91],
  ['ryokugyu','defense',89], ['ryokugyu','stamina',89],
  ['fujitora','stamina',87], ['akainu','speed',86],
] as const satisfies readonly (readonly [string,CombatStat,number])[]

const reusedEvidence = [
  ['vista','evidence-vista-armament-akainu-574',['attack','techniqueMastery']],
  ['king','evidence-king-armament-1032',['attack','techniqueMastery']],
  ['katakuri','evidence-katakuri-future-sight-881-884',['defense','techniqueMastery','combatIQ']],
  ['zoro','evidence-zoro-conquerors-1033-1035',['attack','techniqueMastery']],
  ['jinbe','evidence-jinbe-whos-who-1018',['attack','defense']],
  ['shanks','evidence-shanks-kid-divine-departure-1079',['attack','techniqueMastery','combatIQ']],
  ['garp','evidence-garp-roger-rocks-1165',['attack','defense','techniqueMastery']],
  ['roger','evidence-roger-haki-analysis-rocks-1165',['attack','defense','techniqueMastery']],
  ['rocks','evidence-rocks-harald-1155',['attack','defense','techniqueMastery']],
  ['newgate','evidence-newgate-roger-966',['attack','defense','techniqueMastery']],
  ['kaido','evidence-kaido-zoro-luffy-1010',['attack','techniqueMastery']],
  ['kaido','evidence-kaido-future-sight-1042',['defense','combatIQ']],
  ['linlin','evidence-linlin-pageone-1011',['attack','techniqueMastery']],
] as const satisfies readonly (readonly [string,string,readonly CombatStat[]])[]

describe('v0.1.59 source review queue preserves official scores (no automated recalibration)', () => {
  it('pins the exact fourteen high-E3 axes and shows they have zero Haki Raw', () => {
    const actual = defaults.flatMap(e => e.items
      .filter(item => item.readiness === 'E3' && getFinalStatScore(item) >= 85)
      .map(item => e.characterId + '/' + item.stat)).sort()
    expect(actual).toEqual(highE3.map(([id,stat]) => id + '/' + stat).sort())
    for (const [id,stat,final] of highE3) {
      const item = find(id,stat)
      expect(item.readiness).toBe('E3')
      expect(getRawHakiContributionTotal(item)).toBe(0)
      expect(item.baseScore).toBe(final)
      expect(item.score).toBe(final)
    }
    expect(find('shanks','stamina').evidenceIds).toHaveLength(0)
    expect(find('akainu','speed').evidenceIds).toHaveLength(0)
    expect(find('ryokugyu','defense').evidenceIds).toEqual(['evidence-aramaki-shanks-haki-1055'])
  })

  it('audits all thirteen specific multi-axis Raw Evidence keys without presuming bugs', () => {
    const current: Array<[string,string,string[]]> = []
    for (const e of defaults) {
      const index = new Map<string,Set<string>>()
      for (const item of e.items) for (const h of item.hakiContributions) for (const evidenceId of h.evidenceIds) {
        const stats = index.get(evidenceId) || new Set<string>()
        stats.add(item.stat)
        index.set(evidenceId,stats)
      }
      for (const [key,stats] of index) if (stats.size > 1) current.push([e.characterId,key,[...stats].sort()])
    }
    const normalize = (cases: readonly (readonly [string,string,readonly string[]])[]) =>
      cases.map(([id,key,stats]) => id+'|'+key+'|'+[...stats].sort().join(',')).sort()
    expect(normalize(current)).toEqual(normalize(reusedEvidence))
    expect(current).toHaveLength(13)
    for (const [id,key,stats] of reusedEvidence) {
      const evidence = sampleEvidence.find(x => x.id === key)
      expect(evidence, key).toBeDefined()
      expect(evidence?.subjectCharacterId).toBe(id)
      for (const stat of stats) {
        const item = find(id,stat)
        expect(item.hakiContributions.some(h => h.amount > 0 && h.evidenceIds.includes(key))).toBe(true)
        expect(item.evidenceIds).toContain(key)
      }
    }
    const shanks = find('shanks','techniqueMastery').hakiContributions.filter(h =>
      h.evidenceIds.includes('evidence-shanks-kid-divine-departure-1079'))
    expect(shanks).toHaveLength(2)
    expect(new Set(shanks.map(h => h.hakiType)).size).toBe(2)
  })

  it('does not modify model, totals, evaluation state, calculation results or matchups', () => {
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(COMBAT_STATS).toHaveLength(7)
    expect(defaults).toHaveLength(59)
    expect(defaults.flatMap(e => e.items)).toHaveLength(413)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(sampleMatchups).toHaveLength(15)
    expect(defaults.flatMap(e => e.items).reduce((sum, i) => sum + getRawHakiContributionTotal(i),0)).toBe(226)
    expect(sampleEvaluations.flatMap(e => e.items).reduce((sum,i) => sum + getRawHakiContributionTotal(i),0)).toBe(244)
    for (const e of defaults) {
      const expected = e.items.reduce((sum,i) => sum + i.score,0) / 7
      expect(calculateBalancedCombatPower(e,balancedV12).finalScore).toBeCloseTo(expected,10)
    }
    expect(defaults.find(e => e.characterId === 'garp')?.subjectState?.id).toBe('prime')
    expect(defaults.find(e => e.characterId === 'newgate')?.subjectState?.id).toBe('prime')
  })
})
