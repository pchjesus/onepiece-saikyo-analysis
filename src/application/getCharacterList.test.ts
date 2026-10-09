import { describe, expect, it } from 'vitest'
import { getCharacterList, getUniqueCharacterList } from './getCharacterList'

describe('getCharacterList', () => {
  it('keeps a 42-Character representative roster while allowing expanded Membership rows', () => {
    const unique = getUniqueCharacterList()
    const expanded = getCharacterList()

    expect(unique).toHaveLength(59)
    expect(expanded).toHaveLength(73)
    expect(new Set(unique.map(({ character }) => character.id)).size).toBe(59)

    expect(unique.map((item) => item.character.name).sort()).toEqual([
      '마르코', '죠즈', '비스타',
      '알베르', '퀸', '잭',
      '샬롯 카타쿠리', '샬롯 스무디', '샬롯 크래커',
      '롤로노아 조로', '상디', '징베',
      '샹크스', '몽키 D. 가프', '사카즈키', '쿠잔', '보르살리노', '잇쇼', '아라마키',
      '마샬 D. 티치', '지저스 바제스', '시류', '반 오거', '아발로 피사로',
      '트라팔가 로', '돈키호테 도플라밍고', '보아 핸콕',
      '쥬라큘 미호크', '크로커다일',
      '골 D. 로저', '실버즈 레일리', '스코퍼 가반', '록스 D. 지벡',
      '에드워드 뉴게이트', '카이도', '샬롯 링링',
      '사보', '몰리', '카라스', '로브 루치', '카쿠', '스튜시',
    ].sort())

    expect(unique.find(({ character }) => character.id === 'mihawk')?.group.id).toBe('cross-guild')
    expect(unique.find(({ character }) => character.id === 'crocodile')?.group.id).toBe('cross-guild')
  })

  it('exposes multi-membership Characters in every relevant Group navigation list', () => {
    const list = getCharacterList()
    expect(list.filter(({ character }) => character.id === 'mihawk').map(({ group }) => group.id))
      .toEqual(['cross-guild', 'seven-warlords'])
    expect(list.filter(({ character }) => character.id === 'crocodile').map(({ group }) => group.id))
      .toEqual(['cross-guild', 'seven-warlords'])
    expect(list.filter(({ character }) => character.id === 'newgate').map(({ group }) => group.id))
      .toEqual(['whitebeard-pirates', 'rocks-pirates'])
    expect(list.filter(({ character }) => character.id === 'kaido').map(({ group }) => group.id))
      .toEqual(['beasts-pirates', 'rocks-pirates'])
    expect(list.filter(({ character }) => character.id === 'linlin').map(({ group }) => group.id))
      .toEqual(['big-mom-pirates', 'rocks-pirates'])
  })

  it('shows captain → official unit-number hierarchy, and Korean names for equal ranks', () => {
    const names = (id: string) => getCharacterList()
      .filter(({ group }) => group.id === id).map(({ character }) => character.name)
    expect(names('whitebeard-pirates')).toEqual(['에드워드 뉴게이트', '마르코', '죠즈', '비스타'])
    expect(names('blackbeard-pirates')).toEqual([
      '마샬 D. 티치', '지저스 바제스', '시류', '반 오거', '아발로 피사로', '쿠잔',
    ])
    expect(names('roger-pirates')).toEqual(['골 D. 로저', '실버즈 레일리', '스코퍼 가반'])
    expect(names('rocks-pirates')[0]).toBe('록스 D. 지벡')
    const collator = new Intl.Collator('ko-KR')
    expect(names('beasts-pirates').slice(1)).toEqual(
      [...names('beasts-pirates').slice(1)].sort(collator.compare))
    expect(names('straw-hat-pirates')).toEqual(
      [...names('straw-hat-pirates')].sort(collator.compare))
  })

  it('keeps Kuzan and Jinbe in both current and historical affiliations without duplicated rankings', () => {
    const expanded = getCharacterList()
    expect(expanded.filter(x => x.character.id === 'kuzan').map(x => [x.group.id, x.membership.status]))
      .toEqual([['blackbeard-pirates', 'current'], ['marines', 'former']].sort(
        (a, b) => a[0].localeCompare(b[0])))
    expect(expanded.find(x => x.character.id === 'jinbe' && x.group.id === 'seven-warlords')
      ?.membership.status).toBe('former')
    expect(getUniqueCharacterList().find(x => x.character.id === 'kuzan')?.group.id)
      .toBe('blackbeard-pirates')
    expect(getUniqueCharacterList().find(x => x.character.id === 'jinbe')?.group.id)
      .toBe('straw-hat-pirates')
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
