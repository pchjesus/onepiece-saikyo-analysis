import { describe, expect, it } from 'vitest'
import { wanoSeeds } from './wanoSeeds'
import { sampleBattles } from './battles'
import { sampleEvidence } from './evidence'
import { sampleEvaluations } from './evaluations'
import { getUniqueCharacterList } from '../../application/getCharacterList'
import { getCombatPower } from '../../application/getCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { sampleMatchups } from './matchups'

describe('v0.1.46 official episode cross-check: sources, scene context, score invariants', () => {
  it('cites actual Drake-vs-CP0 episodes rather than an unrelated Sasaki fight', () => {
    const drake = wanoSeeds.find(({ id }) => id === 'x-drake')!
    expect(drake.fight).toContain('/anime/61598/index.html')
    expect(drake.fight).toContain('/anime/62672/index.html')
    expect(drake.fight).not.toContain('/anime/o6337/index.html')
    expect(drake.fact).toContain('지건')
    const ulti = wanoSeeds.find(({ id }) => id === 'ulti')!
    expect(ulti.fight).toContain('/anime/o6243/index.html')
    expect(ulti.fight).toContain('/anime/o6323/index.html')
  })

  it('separates Kid-Law finishing attack episode from the later confirmed Big Mom defeat', () => {
    const event = sampleBattles.find(({ id }) => id === 'battle-wano-detailed-kid-big-mom-1066')!
    expect(event?.result).toBe('victory')
    expect(event?.restrictions).toContain('1067화')
    const record = sampleEvidence.find(({ id }) => id === 'evidence-wano-detailed-kid-big-mom-1066-kid')!
    expect(record?.source.reference).toContain('/anime/62293/index.html')
    expect(record?.source.reference).toContain('/anime/62440/index.html')
    expect(record?.source.type).toBe('supplementary')
  })

  it('does not misrepresent Jinbe vs Who’s-Who as an isolated 1v1 duel', () => {
    const event = sampleBattles.find(({ id }) => id === 'battle-wano-detailed-whos-jinbe-1040')!
    expect(event?.combatStructure).toBe('multiple-vs-one')
    expect(event?.restrictions).toContain('1038화')
    const record = sampleEvidence.find(({ id }) => id === 'evidence-wano-detailed-whos-jinbe-1040-whos-who')!
    expect(record?.source.reference).toContain('/anime/o6323/index.html')
    expect(record?.source.reference).toContain('/anime/o6327/index.html')
  })

  it('flags CP0 IQ interpretation uncertainty without using fictional automatic score bonuses or nerfs', () => {
    for (const [id, iq, overall] of [['lucci', 68, 78], ['kaku', 72, 74.28571428571429]] as const) {
      const evaluation = sampleEvaluations.find(({ characterId }) => characterId === id)!
      const item = evaluation.items.find(({ stat }) => stat === 'combatIQ')!
      expect(item.score).toBe(iq)
      expect(item.readiness).toBe('E3')
      expect(item.rationale).toContain('조로')
      expect(item.hakiContributions).toHaveLength(0)
      expect(getCombatPower(id).finalScore).toBeCloseTo(overall)
    }
    expect(getUniqueCharacterList()).toHaveLength(59)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(sampleEvaluations.flatMap(e => e.items).reduce((n, i) => n + getRawHakiContributionTotal(i), 0)).toBe(230)
    expect(sampleMatchups).toHaveLength(15)
  })
})
