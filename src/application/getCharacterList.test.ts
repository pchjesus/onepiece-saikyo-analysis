import { describe, expect, it } from 'vitest'
import { getCharacterList } from './getCharacterList'

describe('getCharacterList', () => {
  it('preserves the baseline roster and exposes approved expansion characters through the application boundary', () => {
    const list = getCharacterList()

    expect(list).toHaveLength(29)
    expect(list.map((item) => item.character.name)).toEqual([
      '마르코', '죠즈', '비스타',
      '알베르', '퀸', '잭',
      '샬롯 카타쿠리', '샬롯 스무디', '샬롯 크래커',
      '롤로노아 조로', '상디', '징베',
      '샹크스', '몽키 D. 가프', '사카즈키', '쿠잔', '보르살리노', '잇쇼', '아라마키',
      '마샬 D. 티치', '지저스 바제스', '시류', '반 오거', '아발로 피사로',
      '트라팔가 로', '돈키호테 도플라밍고', '보아 핸콕',
      '쥬라큘 미호크', '크로커다일',
    ])
    expect(list.map((item) => item.group.name)).toEqual([
      '흰수염 해적단', '흰수염 해적단', '흰수염 해적단',
      '백수 해적단', '백수 해적단', '백수 해적단',
      '빅맘 해적단', '빅맘 해적단', '빅맘 해적단',
      '밀짚모자 일당', '밀짚모자 일당', '밀짚모자 일당',
      '빨간 머리 해적단', '해군', '해군', '해군', '해군', '해군', '해군',
      '검은 수염 해적단', '검은 수염 해적단', '검은 수염 해적단', '검은 수염 해적단', '검은 수염 해적단',
      '왕의 부하 칠무해', '왕의 부하 칠무해', '왕의 부하 칠무해',
      '크로스 길드', '크로스 길드',
    ])
  })

  it('keeps E3 Buggy outside the evaluated roster', () => {
    expect(getCharacterList().some(({ character }) => character.id === 'buggy')).toBe(false)
  })

  it('exposes membership metadata for subgroup-aware UI', () => {
    const king = getCharacterList().find(({ character }) => character.id === 'king')
    const katakuri = getCharacterList().find(({ character }) => character.id === 'katakuri')
    const zoro = getCharacterList().find(({ character }) => character.id === 'zoro')

    expect(king?.membership).toMatchObject({ groupId: 'beasts-pirates', subgroup: '대간판' })
    expect(katakuri?.membership).toMatchObject({ groupId: 'big-mom-pirates', subgroup: '스위트 3장성' })
    expect(zoro?.membership).toMatchObject({ groupId: 'straw-hat-pirates', status: 'current' })
    expect(king?.character.knownAs.map(({ name }) => name)).toContain('킹')
    expect(getCharacterList().find(({ character }) => character.id === 'akainu')?.character)
      .toMatchObject({ name: '사카즈키' })
  })
})
