import { describe, expect, it } from 'vitest'
import { normalizeCharacterNamesForDisplay } from './normalizeCharacterNamesForDisplay'

describe('normalizeCharacterNamesForDisplay', () => {
  it('converts legacy romanized names and admiral codenames to Korean primary names', () => {
    expect(normalizeCharacterNamesForDisplay('Marco and Katakuri vs Kizaru, Akainu, Garp, Koby'))
      .toBe('마르코 and 샬롯 카타쿠리 vs 보르살리노, 사카즈키, 몽키 D. 가프, 코비')
    expect(normalizeCharacterNamesForDisplay('키자루·아카이누·아오키지·후지토라·료쿠규'))
      .toBe('보르살리노·사카즈키·쿠잔·잇쇼·아라마키')
  })

  it('uses 알베르 in prose but preserves the explicitly quoted official alias', () => {
    expect(normalizeCharacterNamesForDisplay('킹은 빠르다. 카이도에게 「킹」이라는 이름을 받았다.'))
      .toBe('알베르는 빠르다. 카이도에게 「킹」이라는 이름을 받았다.')
  })

  it('translates Supreme King Haki before the King alias rule', () => {
    expect(normalizeCharacterNamesForDisplay('Garp used Supreme King Haki.'))
      .toBe('몽키 D. 가프 used 패왕색 패기.')
  })
})
