import { describe, expect, it } from 'vitest'
import { validateCombatProfile } from '../../domain/character/validation'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { sampleBattles } from './battles'
import { sampleCharacters } from './characters'
import { sampleCrews } from './crews'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'

const evidenceReferences = sampleEvidence.map(({ id, subjectCharacterId }) => ({ id, subjectCharacterId }))

describe('sample combat data', () => {
  it('contains three evaluated characters for each initial crew', () => {
    expect(sampleCrews).toHaveLength(3)
    expect(sampleCharacters).toHaveLength(19)
    expect(sampleEvaluations).toHaveLength(19)

    for (const crew of sampleCrews) {
      expect(sampleCharacters.filter(({ crewId }) => crewId === crew.id)).toHaveLength(3)
    }
  })

  it('keeps every evaluation complete and referentially valid', () => {
    for (const evaluation of sampleEvaluations) {
      expect(sampleCharacters.some(({ id }) => id === evaluation.characterId)).toBe(true)
      expect(validateEvaluation(evaluation, evidenceReferences)).toEqual({ valid: true, errors: [] })
    }
  })

  it('keeps every Special Combat Profile evidence reference owned by the same character', () => {
    for (const character of sampleCharacters) {
      expect(validateCombatProfile(character, evidenceReferences)).toEqual({ valid: true, errors: [] })
    }
  })

  it('keeps every Evidence record connected to a known character and Battle', () => {
    for (const evidence of sampleEvidence) {
      expect(sampleCharacters.some(({ id }) => id === evidence.subjectCharacterId)).toBe(true)
      expect(sampleBattles.some(({ id }) => id === evidence.battleId)).toBe(true)
    }
  })
})
