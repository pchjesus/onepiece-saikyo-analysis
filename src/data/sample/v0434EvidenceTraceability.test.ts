import { describe, it, expect } from 'vitest'
import { sampleEvidence } from './evidence'
import { applyV0434EvidenceTraceability } from './v0434EvidenceTraceability'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { battleRepository } from '../repositories/battleRepository'
import { matchupRepository } from '../repositories/matchupRepository'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { versionManifest } from '../integrity/versionManifest'
import { patchHistory } from '../patchHistory'

const ids = {
  vista: 'evidence-vista-mihawk-561-562',
  queen: 'evidence-queen-cybernetics-1028-1034',
  smoothie: 'evidence-smoothie-pursuit-894',
} as const
const historical = (id: string) => sampleEvidence.find(e => e.id === id)!
const current = (id: string, character: string) =>
  evidenceRepository.getEvidenceForCharacter(character).find(e => e.id === id)!

describe('v0.4.34 Evidence traceability — current-only T1/T2/T3', () => {
  it('adds one explicitly inferred Vista Combat IQ secondary role without upgrading directness', () => {
    const old = historical(ids.vista)
    const live = current(ids.vista, 'vista')
    expect(old.statContributions.some(c => c.stat === 'combatIQ')).toBe(false)
    expect(live.statContributions).toHaveLength(old.statContributions.length + 1)
    expect(live.statContributions.slice(0, -1)).toEqual(old.statContributions)
    const iq = live.statContributions[live.statContributions.length - 1]!
    expect(iq).toMatchObject({ stat: 'combatIQ', role: 'secondary' })
    expect(iq.note).toContain('기능적 추론')
    expect(iq.note).toContain('독자적 전략 설계')
    const { statContributions: _before, ...otherBefore } = old
    const { statContributions: _after, ...otherAfter } = live
    expect(otherAfter).toEqual(otherBefore)
    expect(v050CurrentDataset.evidence.find(e => e.id === ids.vista)).toEqual(live)
    const row = buildV050ReadOnlyAudit().rows.find(r => r.characterId === 'vista' && r.stat === 'combatIQ')!
    expect(row.evidenceLinks.find(link => link.evidenceId === ids.vista)?.role).toBe('secondary')
    expect(evaluationRepository.getEvaluation('vista')!.items.find(i => i.stat === 'combatIQ'))
      .toMatchObject({ baseScore: 85, score: 85, readiness: 'E3' })
    expect(applyV0434EvidenceTraceability(old)).toEqual(live)
    expect(() => applyV0434EvidenceTraceability({ ...old, statContributions: [
      ...old.statContributions, { stat: 'combatIQ', role: 'primary', note: 'unexpected duplicate' },
    ] })).toThrow('Vista historical Evidence contribution drift')
  })

  it('updates only Queen IQ context note, preserving Osome intent and launcher distinction', () => {
    const old = historical(ids.queen)
    const live = current(ids.queen, 'queen')
    const oldContext = old.statContributions.find(c => c.stat === 'combatIQ')!
    const updatedContext = live.statContributions.find(c => c.stat === 'combatIQ')!
    expect(oldContext.note).toContain('후반 주의 분산')
    expect(updatedContext.role).toBe(oldContext.role)
    expect(updatedContext.note).toContain('오소메를 의도적으로 폭행')
    expect(updatedContext.note).toContain('투명화는 정상 작동')
    expect(updatedContext.note).toContain('브라키오 런처')
    expect(updatedContext.note).not.toContain('후반 주의 분산')
    expect(live.statContributions.filter(c=>c.stat!=='combatIQ'))
      .toEqual(old.statContributions.filter(c=>c.stat!=='combatIQ'))
    const { statContributions: _old, ...before } = old
    const { statContributions: _new, ...after } = live
    expect(after).toEqual(before)
    expect(v050CurrentDataset.evidence.find(e => e.id === ids.queen)).toEqual(live)
    expect(battleRepository.getBattle('onigashima-queen-sanji')?.externalFactors)
      .toContain('의도적으로 폭행')
    const queen = evaluationRepository.getEvaluation('queen')!
    expect(queen.items.map(i=>i.score)).toEqual([82,82,83,75,80,74,84])
    expect(queen.items.find(i=>i.stat==='combatIQ')?.rationale).toContain('의도적으로 폭행')
    expect(applyV0434EvidenceTraceability(old)).toEqual(live)
    const bad = { ...old, statContributions: old.statContributions.map(c => c.stat === 'combatIQ'
      ? { ...c, note: 'drifted' } : c) }
    expect(() => applyV0434EvidenceTraceability(bad)).toThrow('Queen historical Combat IQ Evidence note drift')
  })

  it('clarifies Smoothie current Attack 80 without rewriting legacy 76 or claiming a strong-opponent hit', () => {
    const old = historical(ids.smoothie)
    const live = current(ids.smoothie, 'smoothie')
    expect(old.evaluationImpact).toContain('Attack 76')
    expect(live.evaluationImpact).toContain('Attack 80')
    expect(live.evaluationImpact).toContain('종전 76')
    expect(live.evaluationImpact).toContain('직접 명중 피해는 미확인')
    const { evaluationImpact: _old, ...before } = old
    const { evaluationImpact: _new, ...after } = live
    expect(after).toEqual(before)
    expect(v050CurrentDataset.evidence.find(e => e.id === ids.smoothie)).toEqual(live)
    const sm = evaluationRepository.getEvaluation('smoothie')!
    expect(sm.items.map(i=>i.score)).toEqual([80,75,78,74,84,78,82])
    expect(sm.items.find(i=>i.stat==='attack')).toMatchObject({baseScore:80,score:80,readiness:'E2'})
    expect(applyV0434EvidenceTraceability(old)).toEqual(live)
    expect(() => applyV0434EvidenceTraceability({ ...old, evaluationImpact:'drifted' }))
      .toThrow('Smoothie historical Evidence impact drift')
  })

  it('leaves other Evidence unchanged and preserves the Jack-Shutenmaru current battle correction', () => {
    const ordinary = current('evidence-jozu-mihawk-553', 'jozu')
    expect(applyV0434EvidenceTraceability(ordinary)).toBe(ordinary)
    const wano = current('evidence-jack-ashura-921', 'jack')
    expect(wano.battleId).toBe('wano-jack-shutenmaru-921')
    expect(applyV0434EvidenceTraceability(wano)).toBe(wano)
    expect(historical('evidence-jack-ashura-921').battleId).toBe('zou-jack-minks')
    for (const [character, id] of Object.entries(ids)) {
      expect(evidenceRepository.getEvidenceForCharacter(character).filter(e => e.id === id)).toHaveLength(1)
    }
  })

  it('preserves all nine commander evaluations, numerical calculations and dataset integrity', () => {
    const expected: Record<string, number[]> = {
      marco:[79,88,86,83,85,82,88], king:[84,88,85,85,83,79,84],
      katakuri:[83,84,85,84,89,85,85], vista:[83,81,80,82,92,85,77],
      jozu:[80,86,80,80,77,78,76], queen:[82,82,83,75,80,74,84],
      jack:[80,84,88,76,77,73,74], cracker:[78,82,82,75,83,77,80],
      smoothie:[80,75,78,74,84,78,82],
    }
    for(const [id, stats] of Object.entries(expected)){
      const evaln = evaluationRepository.getEvaluation(id)!
      expect(evaln.items.map(i=>i.score)).toEqual(stats)
      expect(getCombatPower(id).finalScore).toBeCloseTo(stats.reduce((s,n)=>s+n,0)/7,12)
      expect(getStatRanking('overall').find(x=>x.characterId===id)?.score)
        .toBeCloseTo(stats.reduce((s,n)=>s+n,0)/7,12)
      expect(v050CurrentDataset.evaluations.find(e=>e.characterId===id)).toEqual(evaln)
      if(id!=='katakuri') expect(evaln.items.map(getRawHakiContributionTotal))
        .toEqual([0,0,0,0,0,0,0])
    }
    expect(v050CurrentDataset.characters).toHaveLength(82)
    expect(v050CurrentDataset.evaluations).toHaveLength(88)
    expect(v050CurrentDataset.evaluations.flatMap(e=>e.items)).toHaveLength(616)
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(buildV050ReadOnlyAudit().integrity.errors).toEqual([])
  })

  it('bumps core/app revision, not the evaluation set/model/baseline; records three evidence-only changes', () => {
    expect(versionManifest).toMatchObject({
      appVersion:'0.4.34', coreDataVersion:'core-v0.4.34',
      evaluationSetVersion:'evaluation-set-v0.4.33',
      calculationModelVersion:'1.2', baselineSnapshotVersion:'v0.3.3',
    })
    expect(patchHistory[0].version).toBe('v0.4.34')
    expect(patchHistory[0].changes).toHaveLength(3)
    expect(patchHistory[0].changes.every(x=>x.kind==='evidence')).toBe(true)
    expect(patchHistory[1].version).toBe('v0.4.33')
  })
})
