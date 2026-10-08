import { describe, expect, it } from 'vitest'
import { getMatchupBuilderView, getMatchupHubEntries, getMatchupRoster } from './getMatchupHub'

describe('matchup builder application', () => {
  it('builds an evaluated 36-character selection roster', () => {
    const roster = getMatchupRoster()
    expect(roster).toHaveLength(36)
    expect(new Set(roster.map(({ characterId }) => characterId)).size).toBe(36)
    expect(roster.find(({ characterId }) => characterId === 'garp')?.states.map(({ label }) => label))
      .toEqual(['전성기', '현재'])
    expect(roster.find(({ characterId }) => characterId === 'mihawk')?.groupName).toBe('크로스 길드')
    expect(roster.find(({ characterId }) => characterId === 'crocodile')?.groupName).toBe('크로스 길드')
    expect(roster.find(({ characterId }) => characterId === 'rayleigh')?.states.map(({ label }) => label)).toEqual(['전성기', '현재'])
    expect(roster.find(({ characterId }) => characterId === 'newgate')?.states.map(({ label }) => label)).toEqual(['전성기', '정상결전'])
    expect(roster.find(({ characterId }) => characterId === 'gaban')?.states.map(({ label }) => label)).toEqual(['현재'])
  })

  it('keeps the 15 evidence-aware featured matchups', () => {
    const entries = getMatchupHubEntries()
    expect(entries).toHaveLength(15)
    expect(entries.every(({ characterA, characterB }) => characterA.stats.length === 7 && characterB.stats.length === 7)).toBe(true)
  })

  it('finds a direct matchup regardless of left-right selection order and flips perspective', () => {
    const direct = getMatchupBuilderView('crocodile', 'jozu')
    const reverse = getMatchupBuilderView('jozu', 'crocodile')
    expect(direct?.matchup?.id).toBe('matchup-crocodile-jozu')
    expect(reverse?.matchup?.id).toBe('matchup-crocodile-jozu')
    expect(direct?.leftFactors.find(({ id }) => id === 'crocodile-jozu-damage')?.perspective).toBe('risk')
    expect(reverse?.leftFactors.find(({ id }) => id === 'crocodile-jozu-damage')?.perspective).toBe('favorable')
  })

  it('uses the selected Garp evaluation state and does not attach current-only matchup to Prime', () => {
    const prime = getMatchupBuilderView('garp', 'kuzan', 'prime')
    const current = getMatchupBuilderView('garp', 'kuzan', 'current')
    expect(prime?.left.overall).toBeCloseTo(97.4285714286)
    expect(prime?.matchup).toBeUndefined()
    expect(current?.left.overall).toBeCloseTo(94.4285714286)
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
