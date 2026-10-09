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
  it('localizes skill name variants and displayed Haki formula words', () => {
    expect(normalizeCharacterNamesForDisplay('Divine Departure · 神避 · 신피'))
      .toBe('카무사리 · 카무사리 · 카무사리')
    expect(normalizeCharacterNamesForDisplay('Base 94 + Haki Weight 0.5 = Final 95'))
      .toBe('기본점수 94 + 패기 가중치 0.5 = 최종점수 95')
    expect(normalizeCharacterNamesForDisplay('Raw Haki Contribution'))
      .toBe('패기 원점수 기여')
    expect(normalizeCharacterNamesForDisplay('Overall Combat Power'))
      .toBe('종합 전투력')
    expect(normalizeCharacterNamesForDisplay('Gear 5 at God Valley'))
      .toBe('기어 5 at 갓 밸리')
  })

})
