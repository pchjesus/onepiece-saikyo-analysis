import { describe, expect, it } from 'vitest'
import { getMatchupBuilderView, getMatchupHubEntries, getMatchupRoster } from './getMatchupHub'

describe('matchup builder application', () => {
  it('builds an evaluated 29-character selection roster', () => {
    const roster = getMatchupRoster()
    expect(roster).toHaveLength(29)
    expect(roster.find(({ characterId }) => characterId === 'garp')?.states.map(({ label }) => label))
      .toEqual(['전성기', '현재'])
  })

  it('keeps the 11 evidence-aware featured matchups', () => {
    const entries = getMatchupHubEntries()
    expect(entries).toHaveLength(11)
    expect(entries.every(({ characterA, characterB }) => characterA.stats.length === 7 && characterB.stats.length === 7)).toBe(true)
  })

  it('finds a direct matchup regardless of left-right selection order', () => {
    const direct = getMatchupBuilderView('mihawk', 'shanks')
    const reverse = getMatchupBuilderView('shanks', 'mihawk')
    expect(direct?.matchup?.id).toBe('matchup-mihawk-shanks')
    expect(reverse?.matchup?.id).toBe('matchup-mihawk-shanks')
    expect(direct?.leftFactors.some(({ perspective }) => perspective === 'favorable' || perspective === 'risk' || perspective === 'conditional')).toBe(true)
  })

  it('uses the selected Garp evaluation state and does not attach current-only matchup to Prime', () => {
    const prime = getMatchupBuilderView('garp', 'kuzan', 'prime')
    const current = getMatchupBuilderView('garp', 'kuzan', 'current')
    expect(prime?.left.overall).toBeCloseTo(97.4285714286)
    expect(prime?.matchup).toBeUndefined()
    expect(current?.left.overall).toBeCloseTo(93.7142857143)
    expect(current?.matchup?.id).toBe('matchup-garp-current-kuzan')
  })

  it('allows arbitrary pairs while withholding unregistered matchup conclusions', () => {
    const view = getMatchupBuilderView('marco', 'katakuri')
    expect(view?.left.name).toBe('마르코')
    expect(view?.right.name).toBe('샬롯 카타쿠리')
    expect(view?.matchup).toBeUndefined()
    expect(view?.leftFactors).toHaveLength(0)
    expect(view?.rightFactors).toHaveLength(0)
  })

  it('rejects same-character matchups', () => {
    expect(getMatchupBuilderView('shanks', 'shanks')).toBeUndefined()
  })
})
