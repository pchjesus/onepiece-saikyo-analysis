import { describe, expect, it } from 'vitest'
import { getCharacterBattleTimeline } from './getCharacterBattleTimeline'

describe('getCharacterBattleTimeline', () => {
  it('returns Marco battles in chronological order with their evidence grouped', () => {
    const timeline = getCharacterBattleTimeline('marco')
    expect(timeline).toHaveLength(6)
    expect(timeline.map((item) => item.battle.chronologyOrder)).toEqual([1, 1, 2, 3, 4, 5])
    expect(timeline[0]?.evidence).toHaveLength(6)
    expect(timeline[1]?.evidence).toHaveLength(1)
    expect(timeline[2]?.evidence).toHaveLength(1)
    expect(timeline[3]?.evidence).toHaveLength(2)
    expect(timeline[4]?.evidence).toHaveLength(2)
    expect(timeline[5]?.evidence).toHaveLength(1)
  })

  it('returns King battles with chronological order and all linked evidence', () => {
    const timeline = getCharacterBattleTimeline('king')
    expect(timeline).toHaveLength(3)
    expect(timeline.map((item) => item.battle.chronologyOrder)).toEqual([1, 4, 5])
    expect(timeline[0]?.evidence).toHaveLength(1)
    expect(timeline[1]?.evidence).toHaveLength(1)
    expect(timeline[2]?.evidence).toHaveLength(3)
  })

  it('returns Katakuri battle timeline with the expanded Canon Evidence set', () => {
    const timeline = getCharacterBattleTimeline('katakuri')
    expect(timeline).toHaveLength(1)
    expect(timeline[0]?.battle.id).toBe('whole-cake-katakuri-luffy')
    expect(timeline[0]?.evidence).toHaveLength(7)
  })
})
