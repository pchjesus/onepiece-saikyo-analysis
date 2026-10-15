import { describe, it, expect } from 'vitest'
import { sampleCharacters } from './characters'
import { sampleMemberships } from './memberships'
import { getCharacterList, getUniqueCharacterList } from '../../application/getCharacterList'
import { v0411Characters } from './v0411UnratedCharacterRegistration'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { getStatRanking } from '../../application/getStatRanking'
import { getMatchupRoster } from '../../application/getMatchupHub'

describe('Izo catalogue addition and past Roger affiliations', () => {
  it('adds one character with evidence-qualified draft, without changing original nine scabbards', () => {
    const izo = sampleCharacters.find(x => x.id === 'izo')
    expect(izo?.name).toBe('이조')
    expect(izo?.combatProfile.sources[0].reference).toBe('https://one-piece.com/character/izo/index.html')
    expect(evaluationRepository.getEvaluations('izo')).toHaveLength(1)
    expect(evaluationRepository.getEvaluation('izo')?.items).toHaveLength(7)
    expect(evaluationRepository.getEvaluation('izo')?.status).toBe('draft')
    expect(getStatRanking('overall')).toHaveLength(72)
    expect(getMatchupRoster()).toHaveLength(72)
    expect(getUniqueCharacterList().filter(x=>!v0411Characters.some(c=>c.id===x.character.id))).toHaveLength(72)
  })
  it('shows Izo in both Whitebeard and Akazaya groups without redefining the original nine', () => {
    const items = getCharacterList().filter(e => e.character.id === 'izo')
    expect(items.map(e => e.group.id).sort()).toEqual(['akazaya-nine','whitebeard-pirates'])
    expect(items.every(e => e.membership.status === 'historical')).toBe(true)
    expect(items.find(e => e.group.id === 'akazaya-nine')?.membership.period).toContain('정규 아카자야 9인 편성과는 구분')
    expect(sampleMemberships.filter(e => e.characterId === 'izo')).toHaveLength(2)
  })
  it('keeps Shanks and two minks as Roger-era affiliates, not present-day crew', () => {
    for (const id of ['shanks','inuarashi','nekomamushi']) {
      expect(getCharacterList().find(x => x.character.id === id && x.group.id === 'roger-pirates')?.membership.status).toBe('former')
    }
    expect(getUniqueCharacterList().find(x => x.character.id === 'shanks')?.group.id).toBe('red-hair-pirates')
    expect(getUniqueCharacterList().find(x => x.character.id === 'inuarashi')?.group.id).toBe('akazaya-nine')
    expect(getUniqueCharacterList().find(x => x.character.id === 'nekomamushi')?.group.id).toBe('akazaya-nine')
  })
})
