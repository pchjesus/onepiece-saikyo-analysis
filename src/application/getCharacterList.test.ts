import { describe, expect, it } from 'vitest'
import { getCharacterList } from './getCharacterList'

describe('getCharacterList', () => {
  it('returns characters with their groups through the application boundary', () => {
    const list = getCharacterList()

    expect(list).toHaveLength(9)
    expect(list.map((item) => item.character.name)).toEqual([
      '마르코', '죠즈', '비스타',
      '킹', '퀸', '잭',
      '카타쿠리', '스무디', '크래커',
    ])
    expect(list.map((item) => item.group.name)).toEqual([
      '흰수염 해적단', '흰수염 해적단', '흰수염 해적단',
      '백수 해적단', '백수 해적단', '백수 해적단',
      '빅맘 해적단', '빅맘 해적단', '빅맘 해적단',
    ])
  })

  it('exposes membership metadata for subgroup-aware UI', () => {
    const king = getCharacterList().find(({ character }) => character.id === 'king')
    const katakuri = getCharacterList().find(({ character }) => character.id === 'katakuri')

    expect(king?.membership).toMatchObject({ groupId: 'beasts-pirates', subgroup: '대간판' })
    expect(katakuri?.membership).toMatchObject({ groupId: 'big-mom-pirates', subgroup: '스위트 3장성' })
  })
})
