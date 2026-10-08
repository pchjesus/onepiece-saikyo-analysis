import { describe, expect, it } from 'vitest'
import { validateHakiContribution, validateHakiProfile } from './validation'

describe('Haki model validation', () => {
  it('keeps Haki capability separate from direct stat scoring', () => {
    expect(validateHakiProfile({ characterId: 'synthetic-zoro', capabilities: [
      { type: 'armament', status: 'confirmed' },
      { type: 'observation', status: 'confirmed' },
      { type: 'conquerors', status: 'confirmed', infusion: { status: 'confirmed' } },
    ] })).toEqual([])
  })

  it('accepts documented nonnumeric exceptional Haki and rejects unsupported expertise claims', () => {
    const profile = {
      characterId: 'synthetic',
      capabilities: [
        { type: 'armament' as const, status: 'confirmed' as const },
        { type: 'observation' as const, status: 'unclear' as const },
        { type: 'conquerors' as const, status: 'not-confirmed' as const },
      ],
      excellenceAssessments: [{
        type: 'armament' as const,
        basis: 'strong-inference' as const,
        interpretation: '무기와 무장색의 결합 이해 근거',
        uncertainty: '무기 제작 과정 미확정',
        evidenceIds: ['evidence-training'],
      }],
    }
    expect(validateHakiProfile(profile)).toEqual([])
    expect(validateHakiProfile({ ...profile, excellenceAssessments: [
      { ...profile.excellenceAssessments[0], type: 'observation' },
    ] })).toContain('Haki excellence requires confirmed capability: observation.')
    expect(validateHakiProfile({ ...profile, excellenceAssessments: [
      { ...profile.excellenceAssessments[0], evidenceIds: [] },
    ] })).toContain('Haki excellence requires non-duplicate Evidence: armament.')
  })

  it('requires evidence for a positive contribution and caps one contribution at 10', () => {
    expect(validateHakiContribution({ hakiType: 'conquerors', stat: 'attack', amount: 8, application: '검증용 공격 강화', evidenceIds: ['synthetic-evidence'] })).toEqual([])
    expect(validateHakiContribution({ hakiType: 'conquerors', stat: 'attack', amount: 12, application: '검증용', evidenceIds: [] })).toContain('Haki contribution must be between 0 and 10.')
  })
})
