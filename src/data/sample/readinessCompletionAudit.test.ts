import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleMatchups } from './matchups'
import { getCombatPower } from '../../application/getCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import type { CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'

const reviewed: Record<string, Partial<Record<CombatStat, EvidenceReadiness>>> = {
  vista: { attack: 'E2', defense: 'E2', speed: 'E3', techniqueMastery: 'E1' },
  jack: { attack: 'E2', defense: 'E2', stamina: 'E1' },
  smoothie: { attack: 'E2', techniqueMastery: 'E2', combatIQ: 'E3', versatility: 'E2' },
  zoro: { attack: 'E1', defense: 'E2', stamina: 'E1', techniqueMastery: 'E1',
    combatIQ: 'E2', versatility: 'E2' },
  sanji: { attack: 'E2', defense: 'E1', stamina: 'E2', speed: 'E1',
    techniqueMastery: 'E2', versatility: 'E2' },
  fujitora: { attack: 'E2', techniqueMastery: 'E2', combatIQ: 'E2', versatility: 'E2' },
  shiryu: { techniqueMastery: 'E2', combatIQ: 'E2', versatility: 'E2' },
  'van-augur': { techniqueMastery: 'E2', combatIQ: 'E2', versatility: 'E2' },
  burgess: { attack: 'E2', stamina: 'E3', versatility: 'E2' },
  pizarro: { attack: 'E3', techniqueMastery: 'E2', versatility: 'E2' },
  hancock: { attack: 'E1', speed: 'E3', techniqueMastery: 'E2',
    combatIQ: 'E2', versatility: 'E2' },
  crocodile: { attack: 'E2', defense: 'E2', stamina: 'E2', speed: 'E3',
    techniqueMastery: 'E1', combatIQ: 'E2', versatility: 'E1' },
}
const defaults = sampleEvaluations.filter((e) => e.isDefault !== false)
const byCharacter = (id: string) => defaults.find((e) => e.characterId === id)!
const axis = (id: string, stat: CombatStat) => byCharacter(id).items.find((s) => s.stat === stat)!
const evidenceById = new Map(sampleEvidence.map((e) => [e.id, e]))

describe('v0.1.57 completed default-readiness evidence audit', () => {
  it('records 51 reviewed labels (E1 10/E2 35/E3 6), no duplicates or unlinked new decisions', () => {
    const ids = new Set<string>()
    const counts = { E1: 0, E2: 0, E3: 0 }
    for (const [id, axes] of Object.entries(reviewed)) {
      for (const [stat, label] of Object.entries(axes)) {
        const key = id + ':' + stat
        expect(ids.has(key)).toBe(false)
        ids.add(key)
        const row = axis(id, stat as CombatStat)
        expect(row.readiness, key).toBe(label)
        expect(row.evidenceIds.length, key).toBeGreaterThan(0)
        expect(row.evidenceIds.every((eid) => evidenceById.has(eid)), key).toBe(true)
        counts[label as EvidenceReadiness]++
      }
    }
    expect(ids.size).toBe(51)
    expect(counts).toEqual({ E1: 10, E2: 35, E3: 6 })
  })

  it('makes all 59 × 7 default stats explicitly graded, while retaining genuine E3 gaps', () => {
    expect(defaults).toHaveLength(59)
    const stats = defaults.flatMap((evaluation) => evaluation.items)
    expect(stats).toHaveLength(413)
    const counts = { E1: 0, E2: 0, E3: 0, missing: 0 }
    for (const s of stats) if (s.readiness) counts[s.readiness]++
    else counts.missing++
    expect(counts).toEqual({ E1: 53, E2: 243, E3: 117, missing: 0 })
    expect(stats.every((s) => s.readiness === 'E1' || s.readiness === 'E2' || s.readiness === 'E3')).toBe(true)
    const unlinked = defaults.flatMap((evaluation) => evaluation.items
      .filter((s) => s.evidenceIds.length === 0)
      .map((s) => evaluation.characterId + ':' + s.stat))
    expect(unlinked.sort()).toEqual(['akainu:speed', 'ryokugyu:speed', 'shanks:stamina', 'smoothie:speed'].sort())
    for (const key of unlinked) {
      const [character, stat] = key.split(':')
      expect(axis(character, stat as CombatStat).readiness).toBe('E3')
    }
  })

  it('respects performance vs context: duration, protection, interception, range and team conditions', () => {
    expect(axis('jack', 'stamina').readiness).toBe('E1')
    expect(axis('jack', 'stamina').evidenceIds).toContain('evidence-jack-zou-809-810')
    expect(axis('zoro', 'defense').readiness).toBe('E2')
    expect(axis('zoro', 'defense').evidenceIds).toContain('evidence-zoro-hakai-1009')
    expect(axis('sanji', 'speed').readiness).toBe('E1')
    expect(axis('sanji', 'speed').evidenceIds).toContain('evidence-sanji-speed-ifrit-1034')
    expect(axis('fujitora', 'attack').readiness).toBe('E2')
    expect(axis('fujitora', 'attack').evidenceIds).toContain('evidence-fujitora-meteor-713')
    for (const [id, stat] of [['smoothie', 'combatIQ'], ['burgess', 'stamina'],
      ['pizarro', 'attack'], ['hancock', 'speed'], ['crocodile', 'speed'],
      ['vista', 'speed']] as const) expect(axis(id, stat).readiness).toBe('E3')
    const attack = evidenceById.get('evidence-pizarro-island-1087-1088')
    expect(attack?.fact).toMatch(/파괴하려/)
    expect(evidenceById.get('evidence-sanji-speed-ifrit-1034')?.statContributions
      .find((role) => role.stat === 'speed')?.role).toBe('primary')
  })

  it('preserves all 12 Final stat vectors, Overall calculations and inherited historical data', () => {
    const finalVectors = [
      ['vista', [82, 79, 77, 80, 87, 77, 74]],
      ['jack', [79, 84, 88, 75, 75, 72, 74]],
      ['smoothie', [76, 75, 76, 74, 80, 77, 78]],
      ['zoro', [90, 83, 87, 83, 87, 82, 81]],
      ['sanji', [83, 85, 85, 91, 84, 81, 82]],
      ['fujitora', [91, 88, 87, 85, 92, 86, 94]],
      ['shiryu', [78, 74, 75, 79, 78, 78, 78]],
      ['van-augur', [72, 67, 68, 75, 80, 78, 82]],
      ['burgess', [76, 74, 79, 74, 72, 70, 74]],
      ['pizarro', [72, 74, 74, 64, 74, 70, 74]],
      ['hancock', [79, 76, 77, 80, 82, 75, 82]],
      ['crocodile', [76, 72, 77, 74, 86, 86, 82]],
    ] as const
    for (const [id, final] of finalVectors) {
      expect(byCharacter(id).items.map((s) => s.score), id).toEqual(final)
      expect(getCombatPower(id).finalScore, id)
        .toBeCloseTo(final.reduce((sum, value) => sum + value, 0) / 7, 9)
    }
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)).toHaveLength(434)
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)
      .reduce((sum, stat) => sum + getRawHakiContributionTotal(stat), 0)).toBe(244)
    expect(sampleMatchups).toHaveLength(15)
  })
})
