import { describe, expect, it } from 'vitest'
import { getCharacterList, getUniqueCharacterList } from './getCharacterList'

describe('getCharacterList', () => {
  it('keeps a 29-Character representative roster while allowing expanded Membership rows', () => {
    const unique = getUniqueCharacterList()
    const expanded = getCharacterList()

    expect(unique).toHaveLength(29)
    expect(expanded).toHaveLength(31)
    expect(new Set(unique.map(({ character }) => character.id)).size).toBe(29)

    expect(unique.map((item) => item.character.name)).toEqual([
      '마르코', '죠즈', '비스타',
      '알베르', '퀸', '잭',
      '샬롯 카타쿠리', '샬롯 스무디', '샬롯 크래커',
      '롤로노아 조로', '상디', '징베',
      '샹크스', '몽키 D. 가프', '사카즈키', '쿠잔', '보르살리노', '잇쇼', '아라마키',
      '마샬 D. 티치', '지저스 바제스', '시류', '반 오거', '아발로 피사로',
      '트라팔가 로', '돈키호테 도플라밍고', '보아 핸콕',
      '쥬라큘 미호크', '크로커다일',
    ])

    expect(unique.find(({ character }) => character.id === 'mihawk')?.group.id).toBe('cross-guild')
    expect(unique.find(({ character }) => character.id === 'crocodile')?.group.id).toBe('cross-guild')
  })

  it('exposes multi-membership Characters in every relevant Group navigation list', () => {
    const list = getCharacterList()
    expect(list.filter(({ character }) => character.id === 'mihawk').map(({ group }) => group.id))
      .toEqual(['cross-guild', 'seven-warlords'])
    expect(list.filter(({ character }) => character.id === 'crocodile').map(({ group }) => group.id))
      .toEqual(['cross-guild', 'seven-warlords'])
  })

  it('keeps E3 Buggy outside both navigation and representative rosters', () => {
    expect(getCharacterList().some(({ character }) => character.id === 'buggy')).toBe(false)
    expect(getUniqueCharacterList().some(({ character }) => character.id === 'buggy')).toBe(false)
  })

  it('exposes membership metadata for subgroup-aware UI', () => {
    const king = getUniqueCharacterList().find(({ character }) => character.id === 'king')
    const katakuri = getUniqueCharacterList().find(({ character }) => character.id === 'katakuri')
    const zoro = getUniqueCharacterList().find(({ character }) => character.id === 'zoro')

    expect(king?.membership).toMatchObject({ groupId: 'beasts-pirates', subgroup: '대간판' })
    expect(katakuri?.membership).toMatchObject({ groupId: 'big-mom-pirates', subgroup: '스위트 3장성' })
    expect(zoro?.membership).toMatchObject({ groupId: 'straw-hat-pirates', status: 'current' })
    expect(king?.character.knownAs.map(({ name }) => name)).toContain('킹')
    expect(getUniqueCharacterList().find(({ character }) => character.id === 'akainu')?.character)
      .toMatchObject({ name: '사카즈키' })
  })
})
