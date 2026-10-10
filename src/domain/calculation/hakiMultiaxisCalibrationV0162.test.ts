import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { sampleEvidence } from '../../data/sample/evidence'
import { sampleMatchups } from '../../data/sample/matchups'
import { balancedV12 } from '../../data/sample/calculationModels'
import { getRawHakiContributionTotal, getFinalStatScore } from '../evaluation/score'
import { calculateBalancedCombatPower } from './calculateCombatPower'

const defaults = sampleEvaluations.filter(e => e.isDefault !== false)
const target = (id: string) => {
  const value = defaults.find(e => e.characterId === id)
  if (!value) throw Error('Missing default: ' + id)
  return value
}
const axis = (id: string, stat: string) => {
  const value = target(id).items.find(i => i.stat === stat)
  if (!value) throw Error('Missing stat: ' + id + '/' + stat)
  return value
}
const total = (id: string) => calculateBalancedCombatPower(target(id), balancedV12).finalScore
const historical = [
  { id: 'king', stat: 'attack', base: 83, previousRaw: 4, previousFinal: 85, final: 83 },
  { id: 'king', stat: 'techniqueMastery', base: 80, previousRaw: 2, previousFinal: 81, final: 80 },
  { id: 'jinbe', stat: 'attack', base: 76, previousRaw: 4, previousFinal: 78, final: 76 },
  { id: 'katakuri', stat: 'combatIQ', base: 82, previousRaw: 4, previousFinal: 84, final: 82 },
] as const

describe('v0.1.62 user-approved bounded numeric audit; Shanks and Vista never down-simulated', () => {
  it('changes exactly four Base-overlap Raw axes without reweighting, rebasing, or deleting their source', () => {
    for (const entry of historical) {
      const item = axis(entry.id, entry.stat)
      expect(item.baseScore).toBe(entry.base)
      expect(item.hakiContributions).toEqual([])
      expect(item.score).toBe(entry.final)
      expect(item.score).toBe(entry.previousFinal - entry.previousRaw * 0.5)
      expect(item.readiness).toBeDefined()
      expect(item.evidenceIds.length).toBeGreaterThan(0)
      expect(getFinalStatScore(item)).toBe(entry.final)
      for (const id of item.evidenceIds) {
        const evidence = sampleEvidence.find(e => e.id === id)
        expect(evidence, id).toBeDefined()
        expect(evidence?.subjectCharacterId).toBe(entry.id)
      }
      expect(item.rationale).toContain('Raw')
      expect(target(entry.id).evaluationDataVersion).toBe('evaluation-0.1.62-haki-independent-review')
    }
  })

  it('retains genuine distinct-application candidates without indiscriminate Raw zeroing', () => {
    expect(axis('jinbe', 'defense').score).toBe(80)
    expect(getRawHakiContributionTotal(axis('jinbe', 'defense'))).toBe(4)
    expect(axis('katakuri', 'defense').score).toBe(84)
    expect(axis('katakuri', 'techniqueMastery').score).toBe(87)
    expect(getRawHakiContributionTotal(axis('katakuri', 'defense'))).toBe(6)
    expect(getRawHakiContributionTotal(axis('katakuri', 'techniqueMastery'))).toBe(6)
    expect(axis('king', 'defense').score).toBe(88) // Lunarian Flame ON/OFF, not exceptional Haki Raw
    expect(axis('kaido', 'defense').score).toBe(100)
    expect(target('king').items.map(i => i.score)).toEqual([83, 88, 85, 83, 80, 77, 82])
    expect(target('jinbe').items.map(i => i.score)).toEqual([76, 80, 80, 77, 83, 80, 79])
    expect(target('katakuri').items.map(i => i.score)).toEqual([83, 84, 84, 84, 87, 82, 84])
  })

  it('locks Shanks and Vista at their prior Base/Raw/Final and Overall, without hypothetical downward score tests', () => {
    expect(target('shanks').evaluationDataVersion).toBe('evaluation-0.1.26-draft')
    expect(target('vista').evaluationDataVersion).toBe('evaluation-0.1.68-vista-battle-context-only')
    expect(target('shanks').items.map(i => i.score)).toEqual([97, 91, 88, 95, 96, 93, 88])
    expect(target('vista').items.map(i => i.score)).toEqual([82, 79, 77, 80, 87, 77, 74])
    expect(getRawHakiContributionTotal(axis('shanks', 'techniqueMastery'))).toBe(8)
    expect(getRawHakiContributionTotal(axis('vista', 'attack'))).toBe(4)
    expect(getRawHakiContributionTotal(axis('vista', 'techniqueMastery'))).toBe(2)
    expect(total('shanks')).toBeCloseTo(648 / 7, 10)
    expect(total('vista')).toBeCloseTo(556 / 7, 10)
  })

  it('verifies four bounded Overall effects, 59-person rank and global non-scoring invariants', () => {
    expect(total('king')).toBeCloseTo(578 / 7, 10)
    expect(total('jinbe')).toBeCloseTo(555 / 7, 10)
    expect(total('katakuri')).toBeCloseTo(588 / 7, 10)
    const ranked = [...defaults]
      .sort((a, b) => total(b.characterId) - total(a.characterId) || a.characterId.localeCompare(b.characterId, 'ko'))
    for (const [id, expectedPosition] of [['shanks', 10], ['katakuri', 22], ['king', 24], ['vista', 26], ['jinbe', 27]] as const) {
      // The 59-person pool includes wano expansion; positions are pinned in the separate
      // integration test that imports the complete pool below.
      expect(ranked.findIndex(e => e.characterId === id) + 1).toBe(expectedPosition)
    }
    expect(defaults).toHaveLength(59)
    expect(defaults.flatMap(e => e.items)).toHaveLength(413)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(defaults.flatMap(e => e.items).filter(i => i.readiness === 'E1')).toHaveLength(53)
    expect(defaults.flatMap(e => e.items).filter(i => i.readiness === 'E2')).toHaveLength(243)
    expect(defaults.flatMap(e => e.items).filter(i => i.readiness === 'E3')).toHaveLength(117)
    expect(defaults.flatMap(e => e.items).reduce((v, i) => v + getRawHakiContributionTotal(i), 0)).toBe(212)
    expect(sampleEvaluations.flatMap(e => e.items).reduce((v, i) => v + getRawHakiContributionTotal(i), 0)).toBe(230)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleMatchups).toHaveLength(15)
    for (const e of defaults) {
      expect(calculateBalancedCombatPower(e, balancedV12).finalScore)
        .toBeCloseTo(e.items.reduce((v, i) => v + i.score, 0) / 7, 10)
    }
  })
})
