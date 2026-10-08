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
    expect(sampleCharacters).toHaveLength(37)
    expect(sampleEvaluations).toHaveLength(39)

    for (const crew of sampleCrews) {
      expect(sampleCharacters.filter(({ crewId }) => crewId === crew.id)).toHaveLength(3)
    }
  })

  it('keeps every evaluation complete, state-safe and referentially valid', () => {
    const byCharacter = new Map<string, typeof sampleEvaluations>()
    for (const evaluation of sampleEvaluations) {
      const list = byCharacter.get(evaluation.characterId) ?? []
      list.push(evaluation)
      byCharacter.set(evaluation.characterId, list)
      expect(sampleCharacters.some(({ id }) => id === evaluation.characterId)).toBe(true)
      expect(validateEvaluation(evaluation, evidenceReferences)).toEqual({ valid: true, errors: [] })
    }

    for (const evaluations of byCharacter.values()) {
      if (evaluations.length === 1) continue
      expect(evaluations.every(({ subjectState }) => Boolean(subjectState?.id))).toBe(true)
      expect(new Set(evaluations.map(({ subjectState }) => subjectState?.id)).size).toBe(evaluations.length)
      expect(evaluations.filter(({ isDefault }) => isDefault)).toHaveLength(1)
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
