import { describe, expect, it } from 'vitest'
import { getCharacterBattleTimeline } from './getCharacterBattleTimeline'

describe('getCharacterBattleTimeline', () => {
  it('returns Marco battles in chronological order with reviewed battle history', () => {
    const timeline = getCharacterBattleTimeline('marco')
    expect(timeline).toHaveLength(6)
    expect(timeline.map((item) => item.battle.chronologyOrder)).toEqual([1, 1, 2, 3, 4, 5])
    expect(timeline.map((item) => item.battle.id)).toContain('payback-war-whitebeard-blackbeard')
    expect(timeline.flatMap((item) => item.evidence.map((evidence) => evidence.id))).toContain('evidence-marco-payback-war-820-909')
  })

  it('returns King battles with the Wano waterfall interception included', () => {
    const timeline = getCharacterBattleTimeline('king')
    expect(timeline).toHaveLength(3)
    expect(timeline.map((item) => item.battle.chronologyOrder)).toEqual([1, 4, 5])
    expect(timeline.map((item) => item.battle.id)).toContain('wano-waterfall-king-big-mom-pirates')
    expect(timeline.flatMap((item) => item.evidence.map((evidence) => evidence.id))).toContain('evidence-king-waterfall-930')
  })

  it('returns Katakuri battle timeline with the expanded Canon Evidence set', () => {
    const timeline = getCharacterBattleTimeline('katakuri')
    expect(timeline).toHaveLength(1)
    expect(timeline[0]?.battle.id).toBe('whole-cake-katakuri-luffy')
    expect(timeline[0]?.evidence).toHaveLength(7)
  })
  it('returns Law battles across Dressrosa, Wano, and Winner Island', () => {
    const timeline = getCharacterBattleTimeline('law')
    expect(timeline.map((item) => item.battle.id)).toEqual([
      'dressrosa-law-doflamingo-769-781',
      'winner-island-teach-law',
      'onigashima-law-kid-big-mom-1038-1040',
    ])
    expect(timeline.flatMap((item) => item.evidence.map((evidence) => evidence.id)))
      .toContain('evidence-law-puncture-wille-1039')
  })

  it('returns Doflamingo and Hancock reviewed battle contexts', () => {
    expect(getCharacterBattleTimeline('doflamingo').map(({ battle }) => battle.id))
      .toEqual(['dressrosa-law-doflamingo-769-781', 'dressrosa-doflamingo-luffy-783-790'])
    expect(getCharacterBattleTimeline('hancock').map(({ battle }) => battle.id))
      .toContain('amazon-lily-teach-hancock-1059')
  })
})
