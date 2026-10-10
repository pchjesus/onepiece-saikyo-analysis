import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleMatchups } from './matchups'
import { sampleCharacters } from './characters'
import { balancedV12 } from './calculationModels'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { v0169HakiAuditRows, v0169HakiSourceAnchors } from './v0169HakiIndependentEffectAudit'

const evalFor = (id: string) => {
  const e = sampleEvaluations.find(e => e.characterId === id && e.isDefault !== false)
  if (!e) throw new Error('Missing evaluation ' + id)
  return e
}

describe('v0.1.69 same-effect vs independent exceptional Haki review: read-only numeric guard', () => {
  it('tracks every existing raw instance against the actual evaluation and same-owner Evidence IDs', () => {
    expect(v0169HakiAuditRows).toHaveLength(9)
    const rowKeys = v0169HakiAuditRows.map(r => r.characterId + ':' + r.stat + ':' + r.hakiType)
    expect(new Set(rowKeys).size).toBe(9)
    for (const row of v0169HakiAuditRows) {
      const stat = evalFor(row.characterId).items.find(i => i.stat === row.stat)
      expect(stat, rowKeys.join(',')).toBeDefined()
      const matching = stat!.hakiContributions.find(h => h.hakiType === row.hakiType)
      expect(matching, row.characterId + '/' + row.stat).toBeDefined()
      expect(matching?.amount).toBe(row.existingRaw)
      expect(matching?.evidenceIds).toEqual([...row.evidenceIds])
      expect(stat?.evidenceIds).toEqual(expect.arrayContaining(row.evidenceIds))
      expect(row.canonicEffect.length, row.characterId).toBeGreaterThan(12)
      expect(row.claimToReexamine.length, row.characterId).toBeGreaterThan(12)
      expect(row.exclusionFromBaseQuestion.length, row.characterId).toBeGreaterThan(30)
      expect(row.disposition).toBe('retain-unchanged-pending-independent-effect-proof')
      for (const id of row.evidenceIds) {
        const e = sampleEvidence.find(e => e.id === id)
        expect(e, id).toBeDefined()
        expect(e?.subjectCharacterId, id).toBe(row.characterId)
        expect(sampleBattles.some(b => b.id === e?.battleId), id).toBe(true)
      }
    }
  })

  it('catches shared-effect reuse across stats without pretending it proves new marginal powers', () => {
    const grouped = new Map<string, typeof v0169HakiAuditRows[number][]>()
    for (const row of v0169HakiAuditRows) {
      grouped.set(row.observedEffectGroup, [...(grouped.get(row.observedEffectGroup) ?? []), row])
    }
    const expectedShared = [
      ['joint-akainu-sword-hit-574', 2],
      ['kid-divine-departure-hit-1079', 2],
      ['kid-future-sight-1079', 2],
      ['katakuri-future-sight-mochi-evasion-881-884', 2],
      ['jinbe-armament-defensive-hardening-890-1018', 1],
    ] as const
    expect([...grouped.keys()].sort()).toEqual(expectedShared.map(a => a[0]).sort())
    for (const [name, count] of expectedShared) expect(grouped.get(name)).toHaveLength(count)
    expect(v0169HakiAuditRows.filter(x => x.characterId === 'shanks' && x.evidenceIds.includes('evidence-shanks-kid-divine-departure-1079'))).toHaveLength(4)
    expect(v0169HakiAuditRows.filter(x => x.characterId === 'katakuri' && x.evidenceIds.includes('evidence-katakuri-future-sight-881-884'))).toHaveLength(2)
    expect(v0169HakiAuditRows.find(x => x.characterId === 'jinbe')?.evidenceIds).toHaveLength(2)
  })

  it('preserves existing four-character raw allocations, seven-stat finals, and all resulting ranks/models', () => {
    const expected = [
      ['vista', [82,79,77,80,87,77,74], 79.4285714286, 6],
      ['shanks', [97,91,88,95,96,93,88], 92.5714285714, 18],
      ['katakuri', [83,84,84,84,87,82,84], 0, 12],
      ['jinbe', [76,80,80,77,83,80,79], 0, 4],
    ] as const
    for (const [id, scores, knownOverall, knownRaw] of expected) {
      const ev = evalFor(id)
      expect(ev.items.map(i => i.score), id).toEqual([...scores])
      expect(ev.items.reduce((sum,i) => sum+getRawHakiContributionTotal(i),0),id).toBe(knownRaw)
      const overall = calculateBalancedCombatPower(ev, balancedV12).finalScore
      if (knownOverall) expect(overall).toBeCloseTo(knownOverall,8)
      else expect(overall).toBeCloseTo(scores.reduce((a,b)=>a+b,0)/7,10)
    }
    expect(sampleCharacters).toHaveLength(60)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.filter(e => e.isDefault !== false)).toHaveLength(59)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleEvaluations.filter(e => e.isDefault !== false).flatMap(e => e.items).reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e => e.items).reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(230)
  })

  it('guards official source anchors and explicit Jinbe Ch.1018 evidence uncertainty', () => {
    expect(Object.keys(v0169HakiSourceAnchors)).toEqual(['vista','shanks','katakuri','jinbe'])
    for (const urls of Object.values(v0169HakiSourceAnchors)) {
      expect(urls.length).toBeGreaterThanOrEqual(2)
      for (const url of urls) expect(url).toMatch(/^https:\/\/one-piece\.com\//)
    }
    const ji = sampleEvidence.find(e => e.id === 'evidence-jinbe-whos-who-1018')!
    expect(ji.source.type).toBe('canon')
    expect(ji.uncertainty).toContain('별개 효과')
    expect(ji.uncertainty).toContain('분리 검증되지 않았다')
    expect(ji.fact).toContain('무장색')
    expect(evalFor('jinbe').items.find(i => i.stat === 'defense')?.hakiContributions).toHaveLength(1)
    expect(evalFor('katakuri').items.find(i => i.stat === 'combatIQ')?.hakiContributions).toHaveLength(0)
  })
})
