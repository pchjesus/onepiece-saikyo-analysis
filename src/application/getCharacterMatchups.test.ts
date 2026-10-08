import { describe, expect, it } from 'vitest'
import { getCharacterMatchups } from './getCharacterMatchups'

describe('getCharacterMatchups', () => {
  it('returns character-relative matchup views', () => {
    const mihawk = getCharacterMatchups('mihawk')
    expect(mihawk).toHaveLength(3)
    expect(mihawk.map(({ opponentName }) => opponentName)).toEqual(['샹크스', '롤로노아 조로', '비스타'])
    expect(mihawk.every(({ perspective }) => perspective === 'character-a')).toBe(true)
  })

  it('filters state-specific Garp matchups by the selected evaluation state', () => {
    expect(getCharacterMatchups('garp', 'prime')).toHaveLength(0)
    const current = getCharacterMatchups('garp', 'current')
    expect(current).toHaveLength(1)
    expect(current[0].opponentName).toBe('쿠잔')
  })
})
