import { describe, expect, it } from 'vitest'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { sampleBattles } from './battles'
import { balancedV12 } from './calculationModels'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleMatchups } from './matchups'
import { v0168SourceOpenQuestions, v0168VistaMihawkClaims } from './v0168VistaSourceCorroboration'

const evaluationOf = (id: string) => {
  const e = sampleEvaluations.find(e => e.characterId === id && e.isDefault !== false)
  if (!e) throw new Error('Evaluation not found for ' + id)
  return e
}
const stat = (id: string, key: string) => {
  const i = evaluationOf(id).items.find(i => i.stat === key)
  if (!i) throw new Error('No stat for ' + id + '/' + key)
  return i
}

describe('v0.1.68 source review and nonnumeric Vista battle context fix', () => {
  it('crosschecks source classes and forbids full-manga-panel verified claims', () => {
    expect(v0168VistaMihawkClaims).toHaveLength(6)
    expect(v0168SourceOpenQuestions).toHaveLength(5)
    expect(new Set(v0168VistaMihawkClaims.map(c => c.id)).size).toBe(6)
    const sourceTypes = new Set(['official-supplementary', 'partial-original-panel-third-party-reproduction', 'contemporary-secondary-transcription', 'chapter-page-indexed-secondary'])
    for (const c of v0168VistaMihawkClaims) {
      expect(c.claim.length, c.id).toBeGreaterThan(40)
      expect(c.verifiedLimit.length, c.id).toBeGreaterThan(30)
      expect(c.sourceRefs.length, c.id).toBeGreaterThanOrEqual(2)
      for (const source of c.sourceRefs) {
        expect(sourceTypes.has(source.type), c.id).toBe(true)
        expect(source.url, c.id).toMatch(/^https:\/\//)
        expect(source.note.length, c.id).toBeGreaterThan(15)
      }
      if (c.status === 'official-explicit')
        expect(c.sourceRefs.some(s => s.type === 'official-supplementary'), c.id).toBe(true)
      else {
        expect(c.status, c.id).toBe('multi-source-corroborated')
        expect(c.verifiedLimit, c.id).toMatch(/(대조|검증|확정|인증|불가|확인)/)
      }
    }
    expect(v0168VistaMihawkClaims.filter(c => c.eventGroup === 'single-mihawk-vista-encounter')).toHaveLength(5)
    expect(v0168VistaMihawkClaims.filter(c => c.eventGroup === 'official-comparator')).toHaveLength(1)
  })

  it('separates Marco dispatch, actual blades, deferral speaker, and war context', () => {
    const find = (id: string) => v0168VistaMihawkClaims.find(c => c.id === id)!
    expect(find('marco-gives-vista-assignment').chapter).toBe('561')
    expect(find('marco-gives-vista-assignment').claim).toContain('마르코')
    expect(find('two-swords-intercept-mihawk').sourceRefs.some(s => s.type === 'partial-original-panel-third-party-reproduction')).toBe(true)
    expect(find('mihawk-first-deferral-vista-agrees').chapter).toBe('562')
    expect(find('mihawk-first-deferral-vista-agrees').claim).toContain('미호크가 먼저')
    expect(find('pacifista-strategic-encirclement').sourceRefs.some(s => s.url.includes('one-piece.com/anime/471'))).toBe(true)
    const official = find('official-vista-and-mihawk-equal-sword-exchange')
    expect(official.status).toBe('official-explicit')
    expect(official.sourceRefs.filter(s => s.url.includes('one-piece.com/')).length).toBe(3)
    expect(official.verifiedLimit).toContain('독립 교전')
  })

  it('corrects visible battle and IQ rationale attribution but never changes numeric results', () => {
    const fight = sampleBattles.find(b => b.id === 'marineford-vista-mihawk')!
    expect(fight.result).toBe('interrupted')
    expect(fight.combatStructure).toBe('1v1')
    expect(fight.combatIntent).toBe('serious')
    expect(fight.externalFactors).toContain('마르코')
    expect(fight.externalFactors).toContain('직접 대조')
    expect(fight.externalFactors).toContain('미호크가 교전 연기를 제안')
    const iq = stat('vista', 'combatIQ')
    expect(iq.baseScore).toBe(77)
    expect(iq.score).toBe(77)
    expect(iq.readiness).toBe('E3')
    expect(iq.rationale).toContain('마르코의 루피 원호 지시')
    expect(iq.rationale).toContain('독자적인 목표 설계로 중복 가산하지')
    const vEvidence = sampleEvidence.find(e => e.id === 'evidence-vista-mihawk-561-562')!
    const mEvidence = sampleEvidence.find(e => e.id === 'evidence-mihawk-vista-561-562')!
    expect(vEvidence.battleId).toBe(fight.id)
    expect(mEvidence.battleId).toBe(fight.id)
    expect(vEvidence.uncertainty).toContain('전체 컷')
    expect(mEvidence.uncertainty).toContain('전체 컷')
    expect(vEvidence.fact).toContain('이도류')
    expect(evaluationOf('vista').evaluationDataVersion).toBe('evaluation-0.1.68-vista-battle-context-only')
  })

  it('keeps all seven Vista stats, six Technique peers, roster, model, and matchup count unchanged', () => {
    const vista = evaluationOf('vista')
    expect(vista.items.map(i => i.score)).toEqual([82, 79, 77, 80, 87, 77, 74])
    const technique = stat('vista', 'techniqueMastery')
    expect(technique.baseScore).toBe(86)
    expect(getRawHakiContributionTotal(technique)).toBe(2)
    expect(technique.score).toBe(87)
    expect(calculateBalancedCombatPower(vista, balancedV12).finalScore).toBeCloseTo(556 / 7, 10)
    expect([
      ['mihawk', 99, 99], ['vista', 86, 87], ['zoro', 85, 87],
      ['king', 80, 80], ['marco', 84, 84], ['katakuri', 84, 87],
    ].map(([id, base, final]) => {
      const t = stat(String(id), 'techniqueMastery')
      return t.baseScore === base && t.score === final
    }).every(Boolean)).toBe(true)
    expect(sampleCharacters).toHaveLength(60)
    expect(sampleEvaluations.filter(e => e.isDefault !== false)).toHaveLength(59)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleEvaluations.filter(e => e.isDefault !== false).flatMap(e => e.items).reduce((s,i) => s+getRawHakiContributionTotal(i),0)).toBe(212)
  })
})
