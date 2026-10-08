import { describe, expect, it } from 'vitest'
import { sampleCharacters } from '../../data/sample/characters'
import { sampleGroups } from '../../data/sample/groups'
import { sampleMemberships } from '../../data/sample/memberships'
import { validateMemberships } from './membershipValidation'

describe('group membership migration', () => {
  it('keeps all baseline memberships referentially valid', () => {
    expect(validateMemberships(sampleCharacters, sampleGroups, sampleMemberships))
      .toEqual({ valid: true, errors: [] })
  })

  it('allows multiple memberships while preserving one representative legacy group', () => {
    for (const character of sampleCharacters) {
      const memberships = sampleMemberships.filter(({ characterId }) => characterId === character.id)
      if (character.id === 'buggy') {
        expect(memberships).toHaveLength(0)
        continue
      }
      expect(memberships.length).toBeGreaterThanOrEqual(1)
      expect(memberships.some(({ groupId }) => groupId === character.crewId)).toBe(true)
    }

    expect(sampleMemberships.filter(({ characterId }) => characterId === 'mihawk')).toHaveLength(2)
    expect(sampleMemberships.filter(({ characterId }) => characterId === 'crocodile')).toHaveLength(2)
  })

  it('rejects unknown character and group references', () => {
    const invalid = [
      ...sampleMemberships,
      { characterId: 'unknown-character', groupId: 'whitebeard-pirates', status: 'current' as const },
      { characterId: 'marco', groupId: 'unknown-group', status: 'current' as const },
    ]

    const result = validateMemberships(sampleCharacters, sampleGroups, invalid)
    expect(result.errors).toContain('Unknown membership character: unknown-character.')
    expect(result.errors).toContain('Unknown membership group: unknown-group.')
  })

  it('rejects exact duplicate memberships', () => {
    const duplicate = [...sampleMemberships, sampleMemberships[0]]
    expect(validateMemberships(sampleCharacters, sampleGroups, duplicate).errors)
      .toContain('Duplicate membership: marco::whitebeard-pirates::1번대::대장::current::.')
  })

  it('keeps group hierarchy parent references valid', () => {
    const worldGovernmentChildren = sampleGroups.filter(
      ({ parentGroupId }) => parentGroupId === 'world-government',
    )

    expect(worldGovernmentChildren.map(({ id }) => id)).toEqual([
      'cp0', 'cp9', 'impel-down', 'five-elders',
    ])
    expect(validateMemberships(sampleCharacters, sampleGroups, sampleMemberships))
      .toEqual({ valid: true, errors: [] })
  })

  it('rejects unknown and self-referencing group parents', () => {
    const invalidGroups = [
      ...sampleGroups,
      { id: 'orphan-group', name: 'Orphan', type: 'other' as const, parentGroupId: 'missing-parent' },
      { id: 'self-parent', name: 'Self', type: 'other' as const, parentGroupId: 'self-parent' },
    ]

    const result = validateMemberships(sampleCharacters, invalidGroups, sampleMemberships)
    expect(result.errors).toContain('Unknown parent group: orphan-group -> missing-parent.')
    expect(result.errors).toContain('Group cannot be its own parent: self-parent.')
  })

})
