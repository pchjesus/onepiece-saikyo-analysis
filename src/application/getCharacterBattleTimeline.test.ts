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
})
