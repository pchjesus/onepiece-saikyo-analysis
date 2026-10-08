import { describe, expect, it } from 'vitest'
import { getCharacterList } from './getCharacterList'
import { getCharacterDetail } from './getCharacterDetail'

describe('getCharacterDetail group migration', () => {
  it('resolves detail and displayed group for every character in the 24-person roster', () => {
    const list = getCharacterList()
    expect(list).toHaveLength(24)
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
      ['garp', 'marines'], ['teach', 'blackbeard-pirates'],
    ]) {
      expect(getCharacterDetail(characterId, groupId)?.group.id).toBe(groupId)
      expect(getCharacterDetail(characterId)?.group.id).toBe(groupId)
    }
  })

  it('returns undefined for unknown characters and rejects mismatched groups', () => {
    expect(getCharacterDetail('not-in-roster')).toBeUndefined()
    expect(() => getCharacterDetail('zoro', 'marines')).toThrow('Incomplete character data')
  })
})
