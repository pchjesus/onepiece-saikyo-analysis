import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleMatchups } from './matchups'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { getCombatPower } from '../../application/getCombatPower'
import type { CombatStat } from '../../domain/evaluation/types'

const reviewedE2: Array<[string, CombatStat]> = [
  ['vista', 'versatility'], ['jack', 'combatIQ'], ['cracker', 'combatIQ'],
  ['kuzan', 'versatility'], ['kizaru', 'attack'], ['shiryu', 'attack'],
  ['van-augur', 'speed'],
]
const reviewedE3: Array<[string, CombatStat]> = [
  ['vista', 'stamina'], ['vista', 'combatIQ'],
  ['jack', 'speed'], ['jack', 'techniqueMastery'], ['jack', 'versatility'],
  ['smoothie', 'defense'], ['smoothie', 'stamina'],
  ['cracker', 'speed'], ['zoro', 'speed'], ['sanji', 'combatIQ'],
  ['jinbe', 'speed'], ['kuzan', 'combatIQ'],
  ['ryokugyu', 'defense'], ['ryokugyu', 'combatIQ'], ['teach', 'speed'],
  ['shiryu', 'defense'], ['shiryu', 'speed'],
  ['van-augur', 'attack'], ['van-augur', 'defense'],
  ['burgess', 'defense'], ['burgess', 'speed'],
  ['burgess', 'techniqueMastery'], ['burgess', 'combatIQ'],
  ['pizarro', 'defense'], ['pizarro', 'stamina'], ['pizarro', 'speed'],
  ['pizarro', 'combatIQ'], ['hancock', 'defense'], ['hancock', 'stamina'],
  ['mihawk', 'stamina'],
]
const evidenceRoleChanges: Array<[string, CombatStat, 'secondary']> = [
  ['evidence-vista-mihawk-561-562', 'versatility', 'secondary'],
  ['evidence-jack-zou-809-810', 'combatIQ', 'secondary'],
  ['evidence-cracker-long-battle-842', 'combatIQ', 'secondary'],
  ['evidence-kuzan-garp-iceball-1081', 'versatility', 'secondary'],
  ['evidence-kuzan-garp-haki-clash-1087', 'versatility', 'secondary'],
  ['evidence-kizaru-vegapunk-1108', 'attack', 'secondary'],
  ['evidence-shiryu-garp-1087', 'attack', 'secondary'],
  ['evidence-augur-warp-1063-1064', 'speed', 'secondary'],
]
const defaults = sampleEvaluations.filter((e) => e.isDefault !== false)
const evidenceById = new Map(sampleEvidence.map((e) => [e.id, e]))

describe('v0.1.54 23 untyped roles and 14 context-only axes', () => {
  it('individually records 7 E2 and 30 E3 judgements without inventing E1', () => {
    expect(reviewedE2).toHaveLength(7)
    expect(reviewedE3).toHaveLength(30)
    const seen = new Set<string>()
    for (const [ready, reviewed] of [['E2', reviewedE2], ['E3', reviewedE3]] as const) {
      for (const [id, stat] of reviewed) {
        const key = id + ':' + stat
        expect(seen.has(key)).toBe(false)
        seen.add(key)
        const item = defaults.find((e) => e.characterId === id)?.items.find((i) => i.stat === stat)
        expect(item?.readiness, key).toBe(ready)
      }
    }
    expect(seen.size).toBe(37)
    expect(defaults).toHaveLength(59)
    const items = defaults.flatMap((e) => e.items)
    expect(items).toHaveLength(413)
    const counts = { E1: 0, E2: 0, E3: 0, missing: 0 }
    for (const item of items) if (item.readiness) counts[item.readiness]++
    else counts.missing++
    expect(counts).toEqual({ E1: 39, E2: 189, E3: 105, missing: 80 })
  })

  it('preserves source events and adds precisely targeted secondary axis roles', () => {
    expect(new Set(sampleEvidence.map((e) => e.id)).size).toBe(sampleEvidence.length)
    for (const [id, stat, role] of evidenceRoleChanges) {
      const record = evidenceById.get(id)
      expect(record, id).toBeDefined()
      const linked = record!.statContributions.filter((row) => row.stat === stat)
      expect(linked, id + ':' + stat).toHaveLength(1)
      expect(linked[0].role).toBe(role)
      expect(linked[0].note).not.toBe('')
    }
    expect(evidenceById.get('evidence-augur-warp-1063-1064')
      ?.statContributions.find((x) => x.stat === 'speed')?.note).toMatch(/순간|위치/)
    expect(evidenceById.get('evidence-shiryu-garp-1087')
      ?.statContributions.find((x) => x.stat === 'attack')?.note).toMatch(/코비|기습/)
  })

  it('all 111 unresolved axes have primary or secondary Evidence, not context alone', () => {
    const roleCounts = { primary: 0, secondary: 0 }
    const unresolved = defaults.flatMap((evaluation) => evaluation.items.filter((item) =>
      !item.readiness))
    expect(unresolved).toHaveLength(80)
    for (const item of unresolved) {
      const roles = item.evidenceIds.flatMap((id) =>
        evidenceById.get(id)?.statContributions.filter((v) => v.stat === item.stat).map((v) => v.role) ?? [])
      if (roles.includes('primary')) roleCounts.primary++
      else if (roles.includes('secondary')) roleCounts.secondary++
      else throw new Error('Unresolved stat has no primary/secondary source: ' + item.stat + ' ' + item.evidenceIds.join(', '))
    }
    expect(roleCounts).toEqual({ primary: 49, secondary: 31 })
  })

  it('keeps all protected data sizes, chosen Overall anchors and Haki Raw untouched', () => {
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap((e) => e.items)).toHaveLength(434)
    expect(sampleEvaluations.flatMap((e) => e.items)
      .reduce((n, item) => n + getRawHakiContributionTotal(item), 0)).toBe(244)
    expect(sampleMatchups).toHaveLength(15)
    for (const [id, final, overall] of [
      ['vista', [82, 79, 77, 80, 87, 77, 74], 79.42857142857143],
      ['jack', [79, 84, 88, 75, 75, 72, 74], 78.14285714285714],
      ['cracker', [77, 81, 80, 75, 80, 75, 77], 77.85714285714286],
      ['kizaru', [92, 89, 91, 99, 93, 90, 91], 92.14285714285714],
      ['shiryu', [78, 74, 75, 79, 78, 78, 78], 77.14285714285714],
      ['van-augur', [72, 67, 68, 75, 80, 78, 82], 74.57142857142857],
    ] as const) {
      expect(sampleEvaluations.find((e) => e.characterId === id)!.items.map((i) => i.score), id).toEqual(final)
      expect(getCombatPower(id).finalScore, id).toBeCloseTo(overall, 9)
    }
  })
})
