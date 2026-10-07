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

  it('requires evidence for a positive contribution and caps one contribution at 10', () => {
    expect(validateHakiContribution({ hakiType: 'conquerors', stat: 'attack', amount: 8, application: '검증용 공격 강화', evidenceIds: ['synthetic-evidence'] })).toEqual([])
    expect(validateHakiContribution({ hakiType: 'conquerors', stat: 'attack', amount: 12, application: '검증용', evidenceIds: [] })).toContain('Haki contribution must be between 0 and 10.')
  })
})
