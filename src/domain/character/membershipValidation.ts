import type { Character, CharacterMembership, Group } from './types'

export type MembershipValidationResult = {
  valid: boolean
  errors: string[]
}

export function validateMemberships(
  characters: readonly Character[],
  groups: readonly Group[],
  memberships: readonly CharacterMembership[],
): MembershipValidationResult {
  const errors: string[] = []
  const characterIds = new Set(characters.map(({ id }) => id))
  const groupIds = new Set(groups.map(({ id }) => id))
  const seen = new Set<string>()

  for (const membership of memberships) {
    if (!characterIds.has(membership.characterId)) {
      errors.push(`Unknown membership character: ${membership.characterId}.`)
    }
    if (!groupIds.has(membership.groupId)) {
      errors.push(`Unknown membership group: ${membership.groupId}.`)
    }

    const key = `${membership.characterId}::${membership.groupId}::${membership.subgroup ?? ''}::${membership.role ?? ''}::${membership.status}::${membership.period ?? ''}`
    if (seen.has(key)) errors.push(`Duplicate membership: ${key}.`)
    seen.add(key)
  }

  return { valid: errors.length === 0, errors }
}
