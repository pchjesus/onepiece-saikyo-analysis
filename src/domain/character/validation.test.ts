import { describe, expect, it } from 'vitest'
import { sampleCharacters } from '../../data/sample/characters'
import { sampleEvidence } from '../../data/sample/evidence'
import { validateCombatProfile } from './validation'

const evidenceReferences = sampleEvidence.map(({ id, subjectCharacterId }) => ({ id, subjectCharacterId }))

describe('combat profile validation', () => {
  it('accepts current sample special combat profiles with valid Evidence ownership', () => {
    for (const character of sampleCharacters) {
      expect(validateCombatProfile(character, evidenceReferences)).toEqual({ valid: true, errors: [] })
    }
  })

  it('rejects unknown and cross-character special trait Evidence references', () => {
    const marco = sampleCharacters.find(({ id }) => id === 'marco')!
    const trait = marco.combatProfile.specialTraits[0]

    const unknown = {
      ...marco,
      combatProfile: {
        ...marco.combatProfile,
        specialTraits: [{ ...trait, evidenceIds: ['missing-evidence'] }],
      },
    }
    expect(validateCombatProfile(unknown, evidenceReferences).errors)
      .toContain('Unknown special trait evidence id: missing-evidence.')

    const wrongOwner = {
      ...marco,
      combatProfile: {
        ...marco.combatProfile,
        specialTraits: [{ ...trait, evidenceIds: ['evidence-king-lunarian-1032'] }],
      },
    }
    expect(validateCombatProfile(wrongOwner, evidenceReferences).errors)
      .toContain('Special trait Evidence evidence-king-lunarian-1032 belongs to another character.')
  })

  it('rejects duplicate special trait ids', () => {
    const king = sampleCharacters.find(({ id }) => id === 'king')!
    const duplicate = {
      ...king,
      combatProfile: {
        ...king.combatProfile,
        specialTraits: [king.combatProfile.specialTraits[0], { ...king.combatProfile.specialTraits[1], id: king.combatProfile.specialTraits[0].id }],
      },
    }
    expect(validateCombatProfile(duplicate, evidenceReferences).errors)
      .toContain(`Duplicate special trait id: ${king.combatProfile.specialTraits[0].id}.`)
  })
})
