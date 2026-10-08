import { describe, expect, it } from 'vitest'
import { getCharacterList } from './getCharacterList'
import { getCharacterDetail } from './getCharacterDetail'

describe('getCharacterDetail group migration', () => {
  it('resolves detail and displayed group for every character in the 27-person roster', () => {
    const list = getCharacterList()
    expect(list).toHaveLength(27)
    for (const { character, group } of list) {
      const detail = getCharacterDetail(character.id, group.id)
      expect(detail?.character.id).toBe(character.id)
      expect(detail?.group.id).toBe(group.id)
      expect(detail?.evaluation.characterId).toBe(character.id)
    }
  })

  it('resolves formerly broken Straw Hat, Red Hair, Marine and Blackbeard details', () => {
    for (const [characterId, groupId] of [
      ['zoro', 'straw-hat-pirates'], ['shanks', 'red-hair-pirates'],
      ['garp', 'marines'], ['teach', 'blackbeard-pirates'], ['law', 'seven-warlords'],
    ]) {
      expect(getCharacterDetail(characterId, groupId)?.group.id).toBe(groupId)
      expect(getCharacterDetail(characterId)?.group.id).toBe(groupId)
    }
  })

  it('returns undefined for unknown characters and rejects mismatched groups', () => {
    expect(getCharacterDetail('not-in-roster')).toBeUndefined()
    expect(() => getCharacterDetail('zoro', 'marines')).toThrow('Incomplete character data')
  })

  it('exposes Prime subject-state metadata without duplicating Garp identity', () => {
    const garp = getCharacterDetail('garp', 'marines')
    expect(garp?.character.name).toBe('몽키 D. 가프')
    expect(garp?.evaluation.subjectState).toMatchObject({ id: 'prime', label: '전성기' })
  })
})
