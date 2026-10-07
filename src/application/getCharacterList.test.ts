import { describe, expect, it } from 'vitest'
import { getCharacterList } from './getCharacterList'

describe('getCharacterList', () => {
  it('returns characters with their crew through the application boundary', () => {
    const list = getCharacterList()

    expect(list).toHaveLength(3)
    expect(list.map((item) => item.character.name)).toEqual(['마르코', '킹', '카타쿠리'])
    expect(list.map((item) => item.crew.name)).toEqual([
      '흰수염 해적단',
      '백수 해적단',
      '빅맘 해적단',
    ])
  })
})
