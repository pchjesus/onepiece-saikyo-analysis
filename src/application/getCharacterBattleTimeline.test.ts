import { describe, expect, it } from 'vitest'
import { getCharacterBattleTimeline } from './getCharacterBattleTimeline'

describe('getCharacterBattleTimeline', () => {
  it('returns Marco battles in chronological order with their evidence grouped', () => {
    const timeline = getCharacterBattleTimeline('marco')

    expect(timeline).toHaveLength(4)
    expect(timeline.map((item) => item.battle.chronologyOrder)).toEqual([1, 2, 3, 4])
    expect(timeline[0]?.evidence).toHaveLength(2)
    expect(timeline[1]?.evidence).toHaveLength(1)
    expect(timeline[2]?.evidence).toHaveLength(1)
    expect(timeline[3]?.evidence).toHaveLength(1)
    expect(timeline.map((_, index) => index + 1)).toEqual([1, 2, 3, 4])
  })

  it('returns King battles with chronological order and evidence', () => {
    const timeline = getCharacterBattleTimeline('king')

    expect(timeline).toHaveLength(2)
    expect(timeline.map((item) => item.battle.chronologyOrder)).toEqual([4, 5])
    expect(timeline[0]?.evidence).toHaveLength(1)
    expect(timeline[1]?.evidence).toHaveLength(2)
    expect(timeline.map((_, index) => index + 1)).toEqual([1, 2])
  })

  it('returns no timeline for characters without linked evidence', () => {
    expect(getCharacterBattleTimeline('katakuri')).toEqual([])
  })
})
