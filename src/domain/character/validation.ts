import type { Character, SpecialCombatTraitCategory, SpecialCombatTraitStatus } from './types'

export type SpecialTraitEvidenceReference = {
  id: string
  subjectCharacterId: string
}

export type CombatProfileValidationResult = {
  valid: boolean
  errors: string[]
}

const categories: readonly SpecialCombatTraitCategory[] = [
  'devil-fruit',
  'race',
  'biology',
  'modification',
  'equipment',
  'technology',
  'other',
]

const statuses: readonly SpecialCombatTraitStatus[] = ['confirmed', 'unclear', 'not-confirmed']

export function validateCombatProfile(
  character: Character,
  evidenceReferences: readonly SpecialTraitEvidenceReference[] = [],
): CombatProfileValidationResult {
  const errors: string[] = []
  const evidenceById = new Map(evidenceReferences.map((reference) => [reference.id, reference]))
  const seenTraitIds = new Set<string>()

  for (const trait of character.combatProfile.specialTraits) {
    if (!trait.id.trim()) errors.push('Special trait id is required.')
    if (seenTraitIds.has(trait.id)) errors.push(`Duplicate special trait id: ${trait.id}.`)
    seenTraitIds.add(trait.id)

    if (!trait.name.trim()) errors.push(`Special trait name is required: ${trait.id}.`)
    if (!trait.description.trim()) errors.push(`Special trait description is required: ${trait.id}.`)
    if (!categories.includes(trait.category)) errors.push(`Invalid special trait category: ${trait.category}.`)
    if (!statuses.includes(trait.status)) errors.push(`Invalid special trait status: ${trait.status}.`)

    for (const evidenceId of trait.evidenceIds) {
      const reference = evidenceById.get(evidenceId)
      if (!reference) errors.push(`Unknown special trait evidence id: ${evidenceId}.`)
      else if (reference.subjectCharacterId !== character.id) {
        errors.push(`Special trait Evidence ${evidenceId} belongs to another character.`)
      }
    }
  }

  return { valid: errors.length === 0, errors }
}


export function validateCharacterIdentity(character: Character): CombatProfileValidationResult {
  const errors: string[] = []
  const primary = character.name.trim().toLocaleLowerCase('ko')
  const seen = new Set<string>()

  if (!primary) errors.push('Character primary name is required.')

  for (const entry of character.knownAs) {
    const normalized = entry.name.trim().toLocaleLowerCase('ko')
    if (!normalized) errors.push(`Character known-as name is required: ${character.id}.`)
    if (normalized === primary) errors.push(`Known-as duplicates primary name: ${character.id} -> ${entry.name}.`)
    if (seen.has(normalized)) errors.push(`Duplicate character known-as: ${character.id} -> ${entry.name}.`)
    seen.add(normalized)
    if (!entry.source.label.trim() || !entry.source.reference.trim()) {
      errors.push(`Character known-as source is required: ${character.id} -> ${entry.name}.`)
    }
  }

  return { valid: errors.length === 0, errors }
}
