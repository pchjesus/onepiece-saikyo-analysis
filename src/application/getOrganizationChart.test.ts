import { describe, expect, it } from 'vitest'
import { sampleCharacters } from '../data/sample/characters'
import { sampleMemberships } from '../data/sample/memberships'
import {
  getDefaultOrganizationScope,
  getOrganizationChart,
  getOrganizationGroups,
  type OrganizationChart,
} from './getOrganizationChart'

function characterIds(chart: OrganizationChart) {
  return chart.sections.flatMap((section) => section.units.flatMap((unit) =>
    unit.members.map((member) => member.character.id)))
}

describe('v0.4.8 read-only organization projection', () => {
  it('exposes all registered groups and explicitly stored parent relationships', () => {
    const groups = getOrganizationGroups()
    expect(groups).toHaveLength(25)
    expect(groups.find((g) => g.id === 'sword')?.parentGroupId).toBe('marines')
    expect(groups.find((g) => g.id === 'tobiroppo')?.parentGroupId).toBe('beasts-pirates')
    expect(groups.filter((g) => g.parentGroupId === 'world-government').map((g) => g.id))
      .toEqual(['cp0', 'cp9', 'impel-down', 'five-elders'])
  })

  it('groups Blackbeard captains under their stored ship numbers without score sorting', () => {
    const chart = getOrganizationChart('blackbeard-pirates', 'current')!
    expect(chart.count).toBe(6)
    expect(characterIds(chart)).toEqual(expect.arrayContaining(['teach', 'burgess', 'shiryu', 'van-augur', 'pizarro', 'kuzan']))
    const units = chart.sections[0].units
    expect(units.map((unit) => unit.label)).toEqual(expect.arrayContaining(['기본 소속 및 직책', '1번선', '10번선']))
    expect(units.find((unit) => unit.label === '10번선')?.members[0].membership.role).toBe('선장')
  })

  it('shows past Marine Kuzan apart from his current Blackbeard affiliation', () => {
    const past = getOrganizationChart('marines', 'past')!
    expect(characterIds(past)).toContain('kuzan')
    const formerKuzan = past.sections.flatMap((s) => s.units.flatMap((u) => u.members))
      .find((m) => m.character.id === 'kuzan')!
    expect(formerKuzan.membership.status).toBe('former')
    expect(formerKuzan.membership.role).toBe('전 대장')
    const current = getOrganizationChart('blackbeard-pirates', 'current')!
    expect(current.sections.flatMap((s) => s.units.flatMap((u) => u.members))
      .find((m) => m.character.id === 'kuzan')!.membership.status).toBe('current')
  })

  it('deduplicates a person listed under both a parent and child group', () => {
    const marines = getOrganizationChart('marines', 'current')!
    expect(characterIds(marines).filter((id) => id === 'x-drake')).toHaveLength(1)
    expect(marines.sections.find((s) => s.group.id === 'sword')?.count).toBeGreaterThan(0)
    const beasts = getOrganizationChart('beasts-pirates', 'current')!
    const ids = characterIds(beasts)
    expect(new Set(ids).size).toBe(ids.length)
    expect(beasts.sections.find((s) => s.group.id === 'tobiroppo')?.count).toBeGreaterThan(0)
    expect(ids).not.toContain('x-drake')
  })

  it('displays a historical group without treating its period as present membership', () => {
    expect(getDefaultOrganizationScope('roger-pirates')).toBe('past')
    const chart = getOrganizationChart('roger-pirates', 'past')!
    const ids = characterIds(chart)
    expect(ids).toEqual(expect.arrayContaining(['roger', 'rayleigh', 'gaban', 'shanks', 'buggy']))
    expect(getOrganizationChart('roger-pirates', 'current')!.count).toBe(0)
  })

  it('keeps historical Whitebeard visible only in the relevant scope', () => {
    expect(characterIds(getOrganizationChart('whitebeard-pirates', 'current')!)).not.toContain('newgate')
    expect(characterIds(getOrganizationChart('whitebeard-pirates', 'all')!)).toContain('newgate')
    expect(characterIds(getOrganizationChart('rocks-pirates', 'past')!)).toContain('newgate')
  })

  it('handles missing and empty groups without inventing characters', () => {
    expect(getOrganizationChart('does-not-exist', 'all')).toBeUndefined()
    const empty = getOrganizationChart('skypiea', 'current')!
    expect(empty.count).toBe(0)
    expect(empty.sections).toHaveLength(0)
    expect(getDefaultOrganizationScope('skypiea')).toBe('past')
  })

  it('does not change the source Character and Membership datasets', () => {
    const characterIdsBefore = sampleCharacters.map((x) => x.id)
    const sourceBefore = sampleMemberships.map((x) => ({ ...x }))
    for (const group of getOrganizationGroups()) {
      for (const scope of ['current', 'past', 'all'] as const) {
        const chart = getOrganizationChart(group.id, scope)!
        expect(new Set(characterIds(chart)).size).toBe(chart.count)
      }
    }
    expect(sampleCharacters.map((x) => x.id)).toEqual(characterIdsBefore)
    expect(sampleMemberships).toEqual(sourceBefore)
    expect(sampleCharacters).toHaveLength(72)
    expect(sampleMemberships).toHaveLength(97)
  })
})
