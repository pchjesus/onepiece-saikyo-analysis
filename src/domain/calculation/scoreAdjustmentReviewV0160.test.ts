import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { sampleEvidence } from '../../data/sample/evidence'
import { sampleMatchups } from '../../data/sample/matchups'
import { balancedV12 } from '../../data/sample/calculationModels'
import { calculateBalancedCombatPower } from './calculateCombatPower'
import { getFinalStatScore, getRawHakiContributionTotal } from '../evaluation/score'

const defaults = sampleEvaluations.filter(e => e.isDefault !== false)
const evaluation = (id: string) => {
  const e = defaults.find(e => e.characterId === id)
  if (!e) throw Error('Missing default: '+id)
  return e
}
const axis = (id: string, stat: string) => {
  const item = evaluation(id).items.find(i => i.stat === stat)
  if (!item) throw Error('Missing axis: '+id+'/'+stat)
  return item
}
const currentOverall = (id: string) => calculateBalancedCombatPower(evaluation(id),balancedV12).finalScore

describe('v0.1.60 approved Kaido Defense 100 and Ryokugyu source-link review', () => {
  it('changes only Kaido Defense Base +1 without changing its Haki or other six axes', () => {
    const kaido = evaluation('kaido')
    const def = axis('kaido','defense')
    expect(kaido.evaluationDataVersion).toBe('evaluation-0.1.60-defense-evidence-calibrated')
    expect(kaido.subjectState?.id).toBe('onigashima-prime')
    expect(def.baseScore).toBe(99)
    expect(getRawHakiContributionTotal(def)).toBe(2)
    expect(def.hakiContributions[0].hakiType).toBe('observation')
    expect(def.hakiContributions[0].evidenceIds).toEqual(['evidence-kaido-future-sight-1042'])
    expect(def.score).toBe(100)
    expect(getFinalStatScore(def,balancedV12.configuration.hakiWeight)).toBe(100)
    expect(kaido.items.map(i => i.score)).toEqual([98,100,100,96,96,91,96])
    expect(kaido.items.map(i => getRawHakiContributionTotal(i))).toEqual([6,2,0,0,6,2,0])
    expect(def.readiness).toBe('E1')
    expect(def.evidenceIds).toEqual(['evidence-kaido-linlin-951','evidence-kaido-future-sight-1042','evidence-kaido-raid-endurance-1000-1049'])
    expect(def.rationale).toContain('Stamina100')
    expect(def.rationale).toContain('무피해·무적이 아니다')
    const previous = (98+99+100+96+96+91+96)/7
    expect(currentOverall('kaido')).toBeCloseTo(previous+1/7,10)
    expect(currentOverall('kaido')).toBeCloseTo(96.71428571428571,10)
    for (const id of ['linlin','newgate','roger','garp']) {
      expect(axis(id,'defense').score).toBe(99)
    }
  })

  it('corrects Ryokugyu Defense evidence provenance but keeps its E3 and score', () => {
    const def = axis('ryokugyu','defense')
    expect(evaluation('ryokugyu').evaluationDataVersion).toBe('evaluation-0.1.60-defense-link-reviewed')
    expect(def.baseScore).toBe(89)
    expect(getRawHakiContributionTotal(def)).toBe(0)
    expect(def.score).toBe(89)
    expect(def.readiness).toBe('E3')
    expect(def.evidenceIds).toEqual(['evidence-aramaki-regrowth-tv1082','evidence-aramaki-shanks-haki-1055'])
    const regrowth = sampleEvidence.find(e=>e.id===def.evidenceIds[0])
    const context = sampleEvidence.find(e=>e.id===def.evidenceIds[1])
    expect(regrowth?.subjectCharacterId).toBe('ryokugyu')
    expect(regrowth?.statContributions.find(x=>x.stat==='defense')?.role).toBe('secondary')
    expect(context?.statContributions.find(x=>x.stat==='defense')?.role).toBe('context')
    expect(def.rationale).toContain('피격 후 재생')
    expect(currentOverall('ryokugyu')).toBeCloseTo(87.5714285714,10)
  })

  it('preserves the 59×7/62/434, E1-3, Haki, 15 Matchups and comparable rankings', () => {
    expect(defaults).toHaveLength(59)
    expect(sampleEvaluations).toHaveLength(62)
    expect(defaults.flatMap(e=>e.items)).toHaveLength(413)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(434)
    const items = defaults.flatMap(e=>e.items)
    expect(items.filter(i=>i.readiness==='E1')).toHaveLength(53)
    expect(items.filter(i=>i.readiness==='E2')).toHaveLength(243)
    expect(items.filter(i=>i.readiness==='E3')).toHaveLength(117)
    expect(items.reduce((v,i)=>v+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((v,i)=>v+getRawHakiContributionTotal(i),0)).toBe(230)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleMatchups).toHaveLength(15)
    const comparison = [...defaults].sort((a,b)=>currentOverall(b.characterId)-currentOverall(a.characterId) || a.characterId.localeCompare(b.characterId,'ko'))
    expect(comparison.findIndex(e=>e.characterId==='kaido')+1).toBe(5)
    const duo = sampleMatchups.find(m=>m.id==='matchup-kaido-linlin')
    expect(duo).toBeDefined()
    expect(duo?.factors.find(f=>f.id==='kaido-linlin-defensive-scale')?.advantage).toBe('none')
    for (const e of defaults) expect(calculateBalancedCombatPower(e,balancedV12).finalScore)
      .toBeCloseTo(e.items.reduce((v,i)=>v+i.score,0)/7,10)
  })

  it('retains five previously audited Haki events with unchanged Base/Raw pending individual approval', () => {
    const cases = [
      ['vista','attack',80,4],['vista','techniqueMastery',86,2],
      ['king','attack',83,4],['king','techniqueMastery',80,2],
      ['jinbe','attack',76,4],['jinbe','defense',78,4],
      ['katakuri','defense',81,6],['katakuri','techniqueMastery',84,6],['katakuri','combatIQ',82,4],
      ['shanks','attack',94,6],['shanks','techniqueMastery',92,8],['shanks','combatIQ',91,4],
    ] as const
    for (const [id,stat,base,raw] of cases) {
      const item=axis(id,stat)
      expect(item.baseScore,id+':'+stat).toBe(base)
      expect(getRawHakiContributionTotal(item),id+':'+stat).toBe(raw)
    }
  })
})
