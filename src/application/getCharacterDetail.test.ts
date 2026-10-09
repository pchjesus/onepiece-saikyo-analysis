import { describe, expect, it } from 'vitest'
import { getCharacterList, getUniqueCharacterList } from './getCharacterList'
import { getCharacterDetail } from './getCharacterDetail'

describe('getCharacterDetail group migration', () => {
  it('resolves representative detail for every Character in the 42-person evaluated roster', () => {
    const list = getUniqueCharacterList()
    expect(list).toHaveLength(42)
    for (const { character, group } of list) {
      const detail = getCharacterDetail(character.id, group.id)
      expect(detail?.character.id).toBe(character.id)
      expect(detail?.group.id).toBe(group.id)
      expect(detail?.evaluation.characterId).toBe(character.id)
    }
  })

  it('resolves every expanded Membership context, including historical secondary Groups', () => {
    const expanded = getCharacterList()
    expect(expanded).toHaveLength(47)

    for (const { character, group } of expanded) {
      const detail = getCharacterDetail(character.id, group.id)
      expect(detail?.character.id).toBe(character.id)
      expect(detail?.group.id).toBe(group.id)
    }

    expect(getCharacterDetail('mihawk', 'seven-warlords')?.membership?.status).toBe('former')
    expect(getCharacterDetail('mihawk')?.group.id).toBe('cross-guild')
    expect(getCharacterDetail('crocodile')?.group.id).toBe('cross-guild')
    expect(getCharacterDetail('newgate', 'rocks-pirates')?.membership?.status).toBe('historical')
    expect(getCharacterDetail('newgate')?.group.id).toBe('whitebeard-pirates')
    expect(getCharacterDetail('kaido')?.group.id).toBe('beasts-pirates')
    expect(getCharacterDetail('linlin')?.group.id).toBe('big-mom-pirates')
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

  it('keeps the officially translated 산먹깨비 epithet ahead of 해적왕의 왼팔', () => {
    const gaban = getCharacterDetail('gaban', 'roger-pirates')?.character
    expect(gaban?.knownAs.map(({ name }) => name)).toEqual(['산먹깨비', '해적왕의 왼팔'])
    expect(gaban?.knownAs[0]).toMatchObject({
      kind: 'epithet', source: { label: '한국 정식 단행본' },
    })
    expect(gaban?.knownAs[0]?.source.reference).toContain('1139화')
  })

  it('returns undefined for unknown characters and rejects mismatched groups', () => {
    expect(getCharacterDetail('not-in-roster')).toBeUndefined()
    expect(() => getCharacterDetail('zoro', 'marines')).toThrow('Incomplete character data')
  })

  it('resolves multi-state legendary evaluations without duplicating Character identity', () => {
    const prime = getCharacterDetail('garp', 'marines')
    const current = getCharacterDetail('garp', 'marines', 'current')
    expect(prime?.character.name).toBe('몽키 D. 가프')
    expect(prime?.evaluation.subjectState).toMatchObject({ id: 'prime', label: '전성기' })
    expect(prime?.evaluations).toHaveLength(2)
    expect(current?.character.id).toBe(prime?.character.id)
    expect(current?.evaluation.subjectState).toMatchObject({ id: 'current', label: '현재' })

    expect(getCharacterDetail('rayleigh', 'roger-pirates')?.evaluations).toHaveLength(2)
    expect(getCharacterDetail('rayleigh', 'roger-pirates', 'current')?.evaluation.subjectState?.label).toBe('현재')
    expect(getCharacterDetail('newgate', 'whitebeard-pirates')?.evaluations).toHaveLength(2)
    expect(getCharacterDetail('newgate', 'whitebeard-pirates', 'marineford')?.evaluation.subjectState?.label).toBe('정상결전')
  })
})
