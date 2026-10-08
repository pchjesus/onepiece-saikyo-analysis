import { describe, expect, it } from 'vitest'
import { validateEvaluation } from './validation'
import type { Evaluation } from './types'

const evidenceReferences = [
  { id: 'evidence-marco-kizaru-554', subjectCharacterId: 'marco' },
  { id: 'evidence-marco-aokiji-566', subjectCharacterId: 'marco' },
  { id: 'evidence-marco-regeneration-1006', subjectCharacterId: 'marco' },
]

const validEvaluation: Evaluation = {
  id: 'evaluation-marco',
  characterId: 'marco',
  evaluationDataVersion: 'evaluation-0.1.22',
  status: 'draft',
  items: [
    ['attack', 74], ['defense', 76], ['stamina', 82], ['speed', 82],
    ['techniqueMastery', 76], ['combatIQ', 78], ['versatility', 86],
  ].map(([stat, score]) => ({
    stat: stat as Evaluation['items'][number]['stat'],
    baseScore: score as number,
    score: score as number,
    rationale: `${stat} rationale`,
    evidenceIds: [],
    hakiContributions: [],
  })),
}

describe('validateEvaluation', () => {
  it('accepts a complete draft evaluation without requiring evidence for every stat', () => {
    const result = validateEvaluation(validEvaluation)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('accepts optional E1/E2/E3 per-stat Evidence readiness and rejects unknown levels', () => {
    const withReadiness = {
      ...validEvaluation,
      items: validEvaluation.items.map((item, index) => ({ ...item, readiness: index < 3 ? 'E1' as const : 'E2' as const })),
    }
    expect(validateEvaluation(withReadiness).valid).toBe(true)

    const invalid = {
      ...validEvaluation,
      items: [{ ...validEvaluation.items[0], readiness: 'E9' }, ...validEvaluation.items.slice(1)],
    } as unknown as Evaluation
    expect(validateEvaluation(invalid).errors).toContain('Invalid evidence readiness for attack: E9.')
  })

  it('accepts evidence references that belong to the evaluated character', () => {
    const result = validateEvaluation(validEvaluation, evidenceReferences)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('rejects unknown evidence ids and evidence belonging to another character', () => {
    const result = validateEvaluation({ ...validEvaluation, items: [{ ...validEvaluation.items[0], evidenceIds: ['evidence-does-not-exist'] }, ...validEvaluation.items.slice(1)] }, [{ id: 'evidence-other-character', subjectCharacterId: 'king' }])
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Unknown evidence id for attack: evidence-does-not-exist.')

    const otherCharacterResult = validateEvaluation({ ...validEvaluation, items: [{ ...validEvaluation.items[0], evidenceIds: ['evidence-other-character'] }, ...validEvaluation.items.slice(1)] }, [{ id: 'evidence-other-character', subjectCharacterId: 'king' }])
    expect(otherCharacterResult.valid).toBe(false)
    expect(otherCharacterResult.errors).toContain('Evidence evidence-other-character belongs to another character.')
  })

  it('requires Haki contribution Evidence to exist, belong to the character, and be linked to the same stat item', () => {
    const attack = {
      ...validEvaluation.items[0],
      baseScore: 80,
      score: 82,
      evidenceIds: ['haki-evidence'],
      hakiContributions: [{ hakiType: 'armament' as const, stat: 'attack' as const, amount: 4, application: '검증용 무장색 공격 적용', evidenceIds: ['haki-evidence'] }],
    }
    const evaluation = { ...validEvaluation, items: [attack, ...validEvaluation.items.slice(1)] }
    expect(validateEvaluation(evaluation, [{ id: 'haki-evidence', subjectCharacterId: 'marco' }]).valid).toBe(true)

    const missingLink = validateEvaluation({ ...evaluation, items: [{ ...attack, evidenceIds: [] }, ...validEvaluation.items.slice(1)] }, [{ id: 'haki-evidence', subjectCharacterId: 'marco' }])
    expect(missingLink.errors).toContain('Haki Evidence haki-evidence must also be linked to attack evidenceIds.')

    const wrongOwner = validateEvaluation(evaluation, [{ id: 'haki-evidence', subjectCharacterId: 'king' }])
    expect(wrongOwner.errors).toContain('Haki Evidence haki-evidence belongs to another character.')
  })

  it('rejects incomplete stat coverage', () => {
    const result = validateEvaluation({ ...validEvaluation, items: validEvaluation.items.slice(0, 6) })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Evaluation must contain exactly 7 stat items.')
    expect(result.errors).toContain('Missing combat stat: versatility.')
  })

  it('rejects duplicate stats and scores outside the 0 to 100 range', () => {
    const result = validateEvaluation({ ...validEvaluation, items: [...validEvaluation.items.slice(0, 6), { ...validEvaluation.items[0], baseScore: 101, score: 101 }] })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Duplicate combat stat: attack.')
    expect(result.errors).toContain('Base score for attack must be between 0 and 100.')
    expect(result.errors).toContain('Missing combat stat: versatility.')
  })

  it('does not require evidence for an official evaluation at this stage', () => {
    expect(validateEvaluation({ ...validEvaluation, status: 'official' }).valid).toBe(true)
  })
})
