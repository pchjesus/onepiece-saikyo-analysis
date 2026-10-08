import { describe, expect, it } from 'vitest'
import { getMatchupHubEntries } from './getMatchupHub'

describe('getMatchupHubEntries', () => {
  it('builds all matchup cards from repository data without UI-hardcoded stats', () => {
    const entries = getMatchupHubEntries()
    expect(entries).toHaveLength(11)
    expect(entries.every(({ characterA, characterB }) => characterA.stats.length === 7 && characterB.stats.length === 7)).toBe(true)
  })

  it('uses explicit evaluation states for state-aware matchups', () => {
    const garpKuzan = getMatchupHubEntries().find(({ matchup }) => matchup.id === 'matchup-garp-current-kuzan')
    expect(garpKuzan?.characterA).toMatchObject({ characterId: 'garp', stateLabel: '현재' })
    expect(garpKuzan?.characterA.overall).toBeCloseTo(93.7142857143)
    expect(garpKuzan?.characterB.overall).toBeCloseTo(92.7142857143)
  })
})
