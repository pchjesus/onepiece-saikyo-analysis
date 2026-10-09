import { describe, expect, it } from 'vitest'
import { COMBAT_STAT_DEFINITIONS } from './statDefinitions'
import { COMBAT_STATS } from './types'

describe('combat stat definitions', () => {
  it('defines every combat stat exactly once', () => {
    expect(Object.keys(COMBAT_STAT_DEFINITIONS).sort()).toEqual([...COMBAT_STATS].sort())
  })

  it('keeps defense and stamina conceptually distinct', () => {
    expect(COMBAT_STAT_DEFINITIONS.stamina.excludes).toContain('방어력')
  })

  it('keeps defense free of the removed durability concept', () => {
    expect(COMBAT_STAT_DEFINITIONS.defense.description).not.toContain('Durability')
    expect(COMBAT_STAT_DEFINITIONS.defense.includes).not.toContain('Durability')
    expect(COMBAT_STAT_DEFINITIONS.defense.excludes).not.toContain('Durability')
  })

  it('keeps technique mastery, combat IQ, versatility, and the non-scoring special profile conceptually distinct', () => {
    expect(COMBAT_STAT_DEFINITIONS.combatIQ.excludes).toContain('다재다능함')
    expect(COMBAT_STAT_DEFINITIONS.versatility.excludes).toContain('Special Combat Profile')
    expect(COMBAT_STAT_DEFINITIONS.techniqueMastery.excludes).toContain('Special Combat Profile')
    expect(COMBAT_STAT_DEFINITIONS.techniqueMastery.excludes).toContain('Combat IQ')
    expect(COMBAT_STAT_DEFINITIONS.techniqueMastery.excludes).toContain('다재다능함')
    expect(COMBAT_STAT_DEFINITIONS.versatility.excludes).toContain('Combat IQ')
  })
})
