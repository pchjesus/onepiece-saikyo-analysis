import { describe, expect, it } from 'vitest'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { v0167TechniquePeers, v0167VistaSwordsmanshipScenes } from './v0167VistaSwordsmanshipAudit'

const defaults = sampleEvaluations.filter(e => e.isDefault !== false)
const evaluationOf = (id: string) => {
  const e = defaults.find(e => e.characterId === id)
  if (!e) throw new Error('Missing default evaluation ' + id)
  return e
}
const techniqueOf = (id: string) => {
  const i = evaluationOf(id).items.find(i => i.stat === 'techniqueMastery')
  if (!i) throw new Error('Missing Technique ' + id)
  return i
}
const overallOf = (id: string) => calculateBalancedCombatPower(evaluationOf(id), balancedV12).finalScore

describe('v0.1.67 Vista/Mihawk Ch.561–562 nonnumeric source and peer audit', () => {
  it('separates official profile, chapter summaries, and inaccessible primary manga panels', () => {
    expect(v0167VistaSwordsmanshipScenes).toHaveLength(7)
    const ids = v0167VistaSwordsmanshipScenes.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(v0167VistaSwordsmanshipScenes.some(s => s.chapter === '561')).toBe(true)
    expect(v0167VistaSwordsmanshipScenes.some(s => s.chapter === '562')).toBe(true)
    expect(v0167VistaSwordsmanshipScenes.some(s => s.layer === 'source-gap')).toBe(true)
    expect(v0167VistaSwordsmanshipScenes.some(s => s.layer === 'official-profile-or-news')).toBe(true)
    const allowed = new Set(['official-profile-or-news', 'chapter-reference-plus-secondary-summary', 'secondary-summary-only', 'source-gap'])
    for (const scene of v0167VistaSwordsmanshipScenes) {
      expect(allowed.has(scene.layer), scene.id).toBe(true)
      expect(scene.observation.length, scene.id).toBeGreaterThan(35)
      expect(scene.contextOrAlternative.length, scene.id).toBeGreaterThan(20)
      expect(scene.cannotConclude.length, scene.id).toBeGreaterThan(30)
      expect(scene.nextVerification.length, scene.id).toBeGreaterThan(20)
      expect(scene.affectedStats.length, scene.id).toBeGreaterThan(0)
      for (const stat of scene.affectedStats) expect(COMBAT_STATS).toContain(stat)
      for (const id of scene.linkedEvidenceIds) {
        const e = sampleEvidence.find(e => e.id === id)
        expect(e, scene.id + '/' + id).toBeDefined()
        expect(['vista', 'mihawk']).toContain(e?.subjectCharacterId)
      }
    }
    const profile = v0167VistaSwordsmanshipScenes.find(s => s.id === 'vista-mihawk-official-swordsmanship')!
    expect(profile.layer).toBe('official-profile-or-news')
    expect(profile.linkedEvidenceIds).toContain('evidence-vista-official-mihawk-profile')
    expect(sampleEvidence.find(e => e.id === 'evidence-vista-official-mihawk-profile')?.source.type).toBe('supplementary')
    const original = v0167VistaSwordsmanshipScenes.find(s => s.id === 'vista-mihawk-panel-access-limit')!
    expect(original.layer).toBe('source-gap')
    expect(original.observation).toContain('Join to read')
  })

  it('does not confuse externally assigned interception, exchanged blades, and actual independent technique or IQ effects', () => {
    const directive = v0167VistaSwordsmanshipScenes.find(s => s.id === 'vista-mihawk-561-tactical-origin')!
    expect(directive.layer).toBe('secondary-summary-only')
    expect(directive.affectedStats).toContain('combatIQ')
    expect(directive.cannotConclude).toContain('판단력이 낮다는 뜻도 아니')
    const attack = v0167VistaSwordsmanshipScenes.find(s => s.id === 'vista-mihawk-561-blade-exchange')!
    expect(attack.affectedStats).toEqual(expect.arrayContaining(['attack', 'defense', 'speed', 'techniqueMastery']))
    expect(attack.cannotConclude).toContain('유효 상처')
    const later = v0167VistaSwordsmanshipScenes.find(s => s.id === 'vista-mihawk-562-continuation')!
    expect(later.layer).toBe('secondary-summary-only')
    expect(later.cannotConclude).toContain('무승부 확정')
    const haki = v0167VistaSwordsmanshipScenes.find(s => s.id === 'vista-akainu-574-separate-event')!
    expect(haki.chapter).toBe('574')
    expect(haki.cannotConclude).toContain('소급')
    expect(techniqueOf('vista').evidenceIds).toContain('evidence-vista-mihawk-561-562')
    expect(techniqueOf('vista').evidenceIds).toContain('evidence-vista-armament-akainu-574')
    expect(evaluationOf('vista').items.find(i => i.stat === 'combatIQ')?.readiness).toBe('E3')
  })

  it('uses original Base/Raw/Final and makes peer modality limits explicit', () => {
    const expected = [
      ['mihawk', 99, 0, 99, 'E1', 'direct-sword-skill'],
      ['vista', 86, 2, 87, 'E1', 'direct-sword-skill'],
      ['zoro', 85, 4, 87, 'E1', 'partial-sword-skill'],
      ['king', 80, 0, 80, 'E2', 'partial-sword-skill'],
      ['marco', 84, 0, 84, 'E2', 'broad-technique-only'],
      ['katakuri', 84, 6, 87, 'E2', 'broad-technique-only'],
    ] as const
    expect(v0167TechniquePeers.map(p => p.characterId)).toEqual(expected.map(p => p[0]))
    for (const [id, base, raw, final, readiness, comparable] of expected) {
      const peer = v0167TechniquePeers.find(p => p.characterId === id)!
      const t = techniqueOf(id)
      expect(t.baseScore, id).toBe(base)
      expect(getRawHakiContributionTotal(t), id).toBe(raw)
      expect(t.score, id).toBe(final)
      expect(t.readiness, id).toBe(readiness)
      expect(peer.comparability).toBe(comparable)
      expect(peer.caveat.length, id).toBeGreaterThan(30)
      expect(sampleCharacters.some(c => c.id === id)).toBe(true)
      for (const sourceId of peer.primaryEvidenceIds) {
        const e = sampleEvidence.find(e => e.id === sourceId)
        expect(e, id + ' ' + sourceId).toBeDefined()
        expect(e?.subjectCharacterId, sourceId).toBe(id)
        expect(t.evidenceIds, id + ' missing Technique source ' + sourceId).toContain(sourceId)
      }
    }
    expect(techniqueOf('mihawk').score - techniqueOf('vista').score).toBe(12)
    expect(techniqueOf('vista').score).toBe(techniqueOf('zoro').score)
    expect(techniqueOf('vista').score).toBe(techniqueOf('katakuri').score)
  })

  it('keeps Technique90 as an unapproved historical candidate rather than altering actual score or matchup inputs', () => {
    const vista = evaluationOf('vista')
    expect(vista.evaluationDataVersion).toBe('evaluation-0.1.68-vista-battle-context-only')
    expect(vista.items.map(i => i.score)).toEqual([82, 79, 77, 80, 87, 77, 74])
    expect(techniqueOf('vista').baseScore).toBe(86)
    expect(getRawHakiContributionTotal(techniqueOf('vista'))).toBe(2)
    expect(techniqueOf('vista').score).toBe(87)
    expect(overallOf('vista')).toBeCloseTo(556 / 7, 10)
    expect(overallOf('mihawk')).toBeGreaterThan(overallOf('vista'))
    expect(defaults).toHaveLength(59)
    expect(sampleCharacters).toHaveLength(60)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(sampleMatchups).toHaveLength(15)
    expect(sampleMatchups.find(m => m.id === 'matchup-mihawk-vista')?.factors.length).toBeGreaterThan(0)
    expect(defaults.flatMap(e => e.items).reduce((s, i) => s + getRawHakiContributionTotal(i), 0)).toBe(212)
    expect(sampleEvaluations.flatMap(e => e.items).reduce((s, i) => s + getRawHakiContributionTotal(i), 0)).toBe(230)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    // This file intentionally DOES NOT compute or publish a 90-point preview.
    // v0.1.65 full-display regression remains part of the unchanged complete test suite.
  })
})
