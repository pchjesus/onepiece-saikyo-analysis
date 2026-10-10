import { describe, expect, it } from 'vitest'
import { wanoSeeds } from './wanoSeeds'
import { wanoCharacters, wanoMemberships, wanoGroups, wanoEvidence, wanoBattles, wanoEvaluations } from './wanoExpansion'
import { sampleCharacters } from './characters'
import { sampleGroups } from './groups'
import { sampleMemberships } from './memberships'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleMatchups } from './matchups'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { validateMemberships } from '../../domain/character/membershipValidation'
import { validateHakiProfile } from '../../domain/haki/validation'
import { getCharacterList, getUniqueCharacterList } from '../../application/getCharacterList'
import { getStatRanking } from '../../application/getStatRanking'
import { getCombatPower } from '../../application/getCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'

describe('v0.1.45 three-faction, 17-character Evidence-first expansion', () => {
  it('registers 2 Kid Pirates, 9 historic Akazaya, 6 Tobi Roppo without existing ID collisions', () => {
    const selected = new Set(wanoSeeds.map((s) => s.id))
    expect(wanoGroups.map((g) => g.id)).toEqual(['kid-pirates', 'akazaya-nine', 'tobiroppo'])
    expect(wanoSeeds.filter((s) => s.group === 'kid-pirates')).toHaveLength(2)
    expect(wanoSeeds.filter((s) => s.group === 'akazaya-nine')).toHaveLength(9)
    expect(wanoSeeds.filter((s) => s.group === 'beasts-pirates' || s.id === 'x-drake')).toHaveLength(6)
    expect(selected.size).toBe(17)
    expect(sampleCharacters).toHaveLength(60)
    expect(sampleGroups.length).toBeGreaterThanOrEqual(22)
    expect(new Set(sampleCharacters.map((c) => c.id)).size).toBe(60)
    expect(wanoCharacters.map((c) => c.id).sort()).toEqual([...selected].sort())
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap((e) => e.items)).toHaveLength(434)
    expect(getUniqueCharacterList()).toHaveLength(59)
    expect(sampleMemberships).toHaveLength(73)
    expect(validateMemberships(sampleCharacters, sampleGroups, sampleMemberships))
      .toEqual({ valid: true, errors: [] })
  })

  it('keeps Kanjuro and Drake historical/undercover context, and preserves unique ranking identity', () => {
    expect(wanoMemberships.find((m) => m.characterId === 'kanjuro')?.status).toBe('former')
    expect(wanoMemberships.find((m) => m.characterId === 'ashura-doji')?.status).toBe('historical')
    expect(wanoMemberships.find((m) => m.characterId === 'x-drake' && m.groupId === 'marines')?.status).toBe('current')
    expect(wanoMemberships.find((m) => m.characterId === 'x-drake' && m.groupId === 'tobiroppo')?.status).toBe('former')
    expect(wanoMemberships.find((m) => m.characterId === 'x-drake' && m.groupId === 'beasts-pirates')?.status).toBe('former')
    expect(getUniqueCharacterList().find((e) => e.character.id === 'x-drake')?.group.id).toBe('marines')
    const akazaya = getCharacterList().filter((entry) => entry.group.id === 'akazaya-nine')
    expect(akazaya).toHaveLength(9)
    expect(akazaya[0].character.id).toBe('kinemon')
    const tobi = getCharacterList().filter((entry) => entry.group.id === 'tobiroppo')
    expect(tobi).toHaveLength(6)
    const ranked = getStatRanking('overall')
    expect(ranked).toHaveLength(59)
    expect(new Set(ranked.map((r) => r.characterId)).size).toBe(59)
    expect(ranked.filter((r) => r.characterId === 'x-drake')).toHaveLength(1)
  })

  it('links all 119 new axes to owned Evidence and 17 Battle contexts, E2/E3 only, and Haki Raw zero', () => {
    expect(wanoBattles).toHaveLength(30)
    expect(wanoEvidence).toHaveLength(55)
    expect(wanoEvaluations).toHaveLength(17)
    const owned = sampleEvidence.map((e) => ({ id: e.id, subjectCharacterId: e.subjectCharacterId }))
    const battleSet = new Set(sampleBattles.map((b) => b.id))
    for (const seed of wanoSeeds) {
      expect(seed.score).toHaveLength(7)
      expect(seed.notes).toHaveLength(7)
      expect(seed.readiness).toHaveLength(7)
      const character = sampleCharacters.find((c) => c.id === seed.id)!
      expect(character).toBeDefined()
      expect(validateHakiProfile(character.combatProfile.haki)).toEqual([])
      const evaluation = sampleEvaluations.find((e) => e.characterId === seed.id)!
      expect(evaluation?.status).toBe('draft')
      expect(evaluation.items).toHaveLength(7)
      expect(evaluation.items.map((x) => x.score)).toEqual(seed.score)
      expect(validateEvaluation(evaluation, owned)).toEqual({ valid: true, errors: [] })
      expect(evaluation.items.every((item) => ['E2', 'E3'].includes(item.readiness!))).toBe(true)
      expect(evaluation.items.every((item) => item.hakiContributions.length === 0)).toBe(true)
      for (const item of evaluation.items) {
        expect(item.evidenceIds.length).toBeGreaterThanOrEqual(2)
        for (const evidenceId of item.evidenceIds) {
          const evidence = sampleEvidence.find((e) => e.id === evidenceId)
          expect(evidence?.subjectCharacterId).toBe(seed.id)
          expect(evidence && battleSet.has(evidence.battleId)).toBe(true)
          expect(evidence?.statContributions.some((contribution) => contribution.stat === item.stat)).toBe(true)
          expect(evidence?.uncertainty.length).toBeGreaterThan(20)
          expect(evidence?.source.type).toBe('supplementary')
        }
      }
      expect(getCombatPower(seed.id).finalScore).toBeCloseTo(seed.score.reduce((x, y) => x + y, 0) / 7, 8)
    }
    expect(sampleEvaluations.flatMap((evaluation) => evaluation.items)
      .reduce((amount, item) => amount + getRawHakiContributionTotal(item), 0)).toBe(230)
    // Episode-specific distinct battle records prevent the Kid & Law 2v1 from being conflated with Shanks' Elbaf encounter.
    expect(sampleBattles.find((b) => b.id === 'battle-wano-detailed-kid-big-mom-1066')?.combatStructure).toBe('multiple-vs-one')
    expect(sampleBattles.find((b) => b.id === 'battle-wano-detailed-kid-shanks-1112')?.result).toBe('defeat')
    const kidAttack = sampleEvaluations.find((e) => e.characterId === 'kid')!.items.find((i) => i.stat === 'attack')!
    expect(kidAttack.evidenceIds).toContain('evidence-wano-detailed-kid-big-mom-1066-kid')
    const killerIQ = sampleEvaluations.find((e) => e.characterId === 'killer')!.items.find((i) => i.stat === 'combatIQ')!
    expect(killerIQ.evidenceIds).toContain('evidence-wano-detailed-killer-hawkins-1054-killer')
    const iniSpeed = sampleEvaluations.find((e) => e.characterId === 'inuarashi')!.items.find((i) => i.stat === 'speed')!
    expect(iniSpeed.evidenceIds).toContain('evidence-wano-detailed-inu-jack-1051-inuarashi')
        expect(sampleMatchups).toHaveLength(15)
  })

  it('preserves battle uncertainty, new model semantics and two CP0 recalibrations', () => {
    const kid = sampleCharacters.find((c) => c.id === 'kid')!
    const killer = sampleCharacters.find((c) => c.id === 'killer')!
    expect(kid.combatProfile.haki.capabilities.find((h) => h.type === 'conquerors')?.status).toBe('confirmed')
    expect(kid.combatProfile.haki.capabilities.find((h) => h.type === 'conquerors')?.infusion?.status).toBe('unclear')
    expect(killer.combatProfile.specialTraits[0].category).toBe('other')
    expect(killer.combatProfile.specialTraits[0].awakening).toBeUndefined()
    expect(wanoSeeds.find((s) => s.id === 'inuarashi')?.context).toContain('달빛')
    expect(wanoSeeds.find((s) => s.id === 'ulti')?.context).toContain('빅 맘')
    const lucci = sampleEvaluations.find((e) => e.characterId === 'lucci')!
    const kaku = sampleEvaluations.find((e) => e.characterId === 'kaku')!
    expect(lucci.items.map((x) => x.score)).toEqual([80,77,82,82,83,68,74])
    expect(kaku.items.map((x) => x.score)).toEqual([73,72,75,75,79,72,74])
    expect(getCombatPower('lucci').finalScore).toBe(78)
    expect(getCombatPower('kaku').finalScore).toBeCloseTo(74.2857142857)
  })
})
