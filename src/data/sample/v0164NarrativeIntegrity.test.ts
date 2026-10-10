import { describe, expect, it } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { wanoSeeds } from './wanoSeeds'
import { wanoDetailedBattles, wanoDetailedEvidence } from './wanoCombatEvidence'
import { wanoEvidence, wanoEvaluations } from './wanoExpansion'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'

/**
 * v0.1.64 semantic regression. Source content is reviewed separately; these checks
 * detect copy/paste owner, stat and battle-context regressions but cannot replace
 * reading every manga panel or prove every explanatory inference is canon.
 */
describe('v0.1.64 character-specific combat narrative and event attribution audit', () => {
  it('tracks all 60 character descriptions and 62 seven-axis evaluations to their own subject', () => {
    expect(sampleCharacters).toHaveLength(60)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    const characters = new Map(sampleCharacters.map(c => [c.id, c]))
    const evidence = new Map(sampleEvidence.map(e => [e.id, e]))
    const battles = new Set(sampleBattles.map(b => b.id))
    for (const character of sampleCharacters) {
      expect(character.description?.trim().length, character.id).toBeGreaterThan(10)
      expect(character.combatProfile.haki.characterId).toBe(character.id)
      expect(character.combatProfile.combatStyles.length).toBeGreaterThan(0)
      for (const trait of character.combatProfile.specialTraits) {
        expect(trait.description.trim().length, character.id + '/' + trait.id).toBeGreaterThan(10)
      }
    }
    for (const evaluation of sampleEvaluations) {
      expect(characters.has(evaluation.characterId), evaluation.characterId).toBe(true)
      expect(evaluation.items).toHaveLength(7)
      const seen = new Set<string>()
      for (const item of evaluation.items) {
        expect(seen.has(item.stat), evaluation.characterId + '/' + item.stat).toBe(false)
        seen.add(item.stat)
        expect(item.rationale.trim().length, evaluation.characterId + '/' + item.stat).toBeGreaterThan(15)
        for (const evidenceId of item.evidenceIds) {
          const e = evidence.get(evidenceId)
          expect(e, evidenceId).toBeDefined()
          // Shared battle events can be discussed, but scored evidence belongs
          // to the evaluated character, never their opponent's Evidence record.
          expect(e?.subjectCharacterId, evaluation.characterId + '/' + item.stat + '/' + evidenceId)
            .toBe(evaluation.characterId)
          expect(battles.has(e!.battleId), evidenceId).toBe(true)
        }
      }
    }
    for (const item of sampleEvidence) {
      expect(characters.has(item.subjectCharacterId), item.id).toBe(true)
      expect(battles.has(item.battleId), item.id).toBe(true)
    }
  })

  it('detects the wrong character/event claims fixed in five Wano narrative passages', () => {
    expect(wanoSeeds).toHaveLength(17)
    for (const seed of wanoSeeds) {
      expect(seed.notes, seed.id).toHaveLength(7)
      expect(seed.readiness, seed.id).toHaveLength(7)
      expect(seed.fact.trim().length, seed.id).toBeGreaterThan(25)
      expect(seed.context.trim().length, seed.id).toBeGreaterThan(25)
    }
    const own = (id: string) => {
      const seed = wanoSeeds.find(s => s.id === id)
      if (!seed) throw Error('Missing Wano character ' + id)
      return seed
    }
    expect(own('page-one').fact).toContain('빅 맘의 패왕색을 두른')
    expect(own('page-one').fact).not.toContain('빅 맘이 무장색을 실은')
    expect(own('kawamatsu').style).toContain('카파류 검술')
    expect(own('kawamatsu').notes[5]).toContain('아카자야의 공동전')
    expect(own('kawamatsu').notes[5]).not.toContain('성지 작전')
    expect(own('kinemon').notes[5]).toContain('킨에몬 개인')
    expect(own('kinemon').notes[5]).not.toContain('작전도 오독')
    expect(own('x-drake').context).toContain('SWORD 소속')
    expect(own('x-drake').context).toContain('토비롯포 위장')
    expect(own('x-drake').context).not.toContain('에그헤드 기준')
    expect(wanoEvaluations).toHaveLength(17)
    const pageOne = wanoEvidence.find(e => e.id === 'evidence-wano-page-one-combat')
    expect(pageOne?.fact).toContain('패왕색을 두른')
    const pageOneDetailed = wanoDetailedEvidence.find(e => e.id === 'evidence-wano-detailed-pageone-bigmom-1031-page-one')
    expect(pageOneDetailed?.subjectCharacterId).toBe('page-one')
    expect(pageOneDetailed?.fact).toContain('패왕색을 두른')
    expect(pageOneDetailed?.fact).not.toContain('무장색')
  })

  it('separates Kid vs Shanks near Elbaf from all Onigashima battles', () => {
    const clash = wanoDetailedBattles.find(b => b.id === 'battle-wano-detailed-kid-shanks-1112')
    expect(clash).toBeDefined()
    expect(clash?.environment).toContain('엘바프 근해')
    expect(clash?.environment).not.toContain('와노쿠니 전투')
    expect(clash?.combatStructure).toBe('multiple-vs-multiple')
    expect(clash?.restrictions).toContain('거인')
    const roof = wanoDetailedBattles.find(b => b.id === 'battle-wano-detailed-kid-killer-rooftop-1017')
    expect(roof?.environment).toContain('와노쿠니')
    const kid = sampleBattles.find(b => b.id === 'battle-wano-kid')
    expect(kid?.environment).toContain('엘바프 근해')
    expect(kid?.environment).toContain('개별 Battle')
    // Kid's ship was destroyed by Dorry/Brogy after Shanks struck Kid;
    // never misattribute giant pirates' naval strike to Shanks's Attack.
    expect(wanoSeeds.find(s => s.id === 'kid')?.fact).toContain('거인족이 함선을 파괴')
  })

  it('preserves approved Overall/Raw calculations and score-source invariants', () => {
    const defaults = sampleEvaluations.filter(e => e.isDefault !== false)
    expect(defaults).toHaveLength(59)
    expect(defaults.flatMap(e => e.items)).toHaveLength(413)
    expect(defaults.flatMap(e => e.items).reduce((a, i) => a + getRawHakiContributionTotal(i), 0)).toBe(212)
    expect(sampleEvaluations.flatMap(e => e.items).reduce((a, i) => a + getRawHakiContributionTotal(i), 0)).toBe(230)
    expect(defaults.flatMap(e => e.items).filter(i => i.readiness === 'E1')).toHaveLength(53)
    expect(defaults.flatMap(e => e.items).filter(i => i.readiness === 'E2')).toHaveLength(243)
    expect(defaults.flatMap(e => e.items).filter(i => i.readiness === 'E3')).toHaveLength(117)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleMatchups).toHaveLength(15)
    for (const evaluation of defaults) {
      const power = calculateBalancedCombatPower(evaluation, balancedV12).finalScore
      expect(power).toBeCloseTo(evaluation.items.reduce((v, item) => v + item.score, 0) / 7, 10)
    }
    const power = (id: string) => {
      const e = defaults.find(e => e.characterId === id)!
      return calculateBalancedCombatPower(e, balancedV12).finalScore
    }
    expect(power('vista')).toBeCloseTo(556 / 7, 10)
    expect(power('shanks')).toBeCloseTo(648 / 7, 10)
    expect(power('king')).toBeCloseTo(578 / 7, 10)
    expect(power('jinbe')).toBeCloseTo(555 / 7, 10)
    expect(power('katakuri')).toBeCloseTo(588 / 7, 10)
    expect(defaults.find(e => e.characterId === 'kaido')?.items.find(i => i.stat === 'defense')?.score).toBe(100)
  })
})
