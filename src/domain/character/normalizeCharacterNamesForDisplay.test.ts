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


  it('fixes truncated Supreme King references in Newgate and other Haki records', () => {
    expect(normalizeCharacterNamesForDisplay('Attack/Defense/Technique Supreme King Raw와 Stamina 핵심 근거다.'))
      .toBe('Attack/Defense/Technique 패왕색 패기 원점수와 Stamina 핵심 근거다.')
    expect(normalizeCharacterNamesForDisplay('Supreme King 상쇄를 Raw에 분리한다.'))
      .toBe('패왕색 상쇄를 패기 원점수에 분리한다.')
    expect(normalizeCharacterNamesForDisplay('Supreme King 공방만 Raw에 반영한다.'))
      .toBe('패왕색 공방만 패기 원점수에 반영한다.')
    expect(normalizeCharacterNamesForDisplay('Supreme King 직접 적용은 Raw로 분리한다.'))
      .toBe('패왕색 직접 적용은 패기 원점수로 분리한다.')
    expect(normalizeCharacterNamesForDisplay("Supreme King's Haki was used by King."))
      .toBe('패왕색 패기 was used by 알베르.')
    expect(normalizeCharacterNamesForDisplay("Supreme King's power"))
      .toBe('패왕색 power')
  })

  it('does not rewrite 킹 inside unrelated Korean words or names', () => {
    const safe = '탱킹이나 방어·버킹엄 스튜시·랭킹·스모킹·워킹·킹덤'
    expect(normalizeCharacterNamesForDisplay(safe)).toBe(safe)
    expect(normalizeCharacterNamesForDisplay('스튜시는 미스 버킹엄 스튜시의 복제인간이다.'))
      .toBe('스튜시는 미스 버킹엄 스튜시의 복제인간이다.')
    expect(normalizeCharacterNamesForDisplay('탱킹이나 무효화가 아니라 기술로 차단했다.'))
      .toBe('탱킹이나 무효화가 아니라 기술로 차단했다.')
    expect(normalizeCharacterNamesForDisplay('버킹엄의')).toBe('버킹엄의')
  })

  it('changes only the independent nickname 킹 and its correct Korean particles', () => {
    expect(normalizeCharacterNamesForDisplay('킹은 킹이 킹을 킹과 킹에게 킹의 킹전 킹·퀸'))
      .toBe('알베르는 알베르가 알베르를 알베르와 알베르에게 알베르의 알베르전 알베르·퀸')
    expect(normalizeCharacterNamesForDisplay('조로가 킹에게 검격을 날렸다.'))
      .toBe('조로가 알베르에게 검격을 날렸다.')
    expect(normalizeCharacterNamesForDisplay('카이도에게 「킹」이라는 이름을 받았다.'))
      .toBe('카이도에게 「킹」이라는 이름을 받았다.')
    expect(normalizeCharacterNamesForDisplay('“킹”과 ‘킹’은 공식 별칭이다.'))
      .toBe('“킹”과 ‘킹’은 공식 별칭이다.')
    expect(normalizeCharacterNamesForDisplay('버킹엄과 킹을 비교했다.'))
      .toBe('버킹엄과 알베르를 비교했다.')
  })

  it('translates entire Latin name tokens, not their occurrences inside another word', () => {
    const unchanged = 'Kingdom Kingston Kingly Lawrence Kidneys Queenly Rockstar Garpian'
    expect(normalizeCharacterNamesForDisplay(unchanged)).toBe(unchanged)
    expect(normalizeCharacterNamesForDisplay('King vs Queen, Law and Kid'))
      .toBe('알베르 vs 퀸, 트라팔가 로 and 키드')
    expect(normalizeCharacterNamesForDisplay('Pirate King / King of Hell'))
      .toBe('해적왕 / 염왕')
    expect(normalizeCharacterNamesForDisplay('Queen Mama Chanter'))
      .toBe('퀸 마마 샹테호')
  })

  it('preserves official source URLs while translating prose around them', () => {
    const page = 'https://one-piece.com/character/King/index.html'
    const other = 'https://example.org/King/Law/Kid?title=Supreme%20King'
    const text = `King 공식 프로필: ${page} · Law 자료 ${other}`
    expect(normalizeCharacterNamesForDisplay(text))
      .toBe(`알베르 공식 프로필: ${page} · 트라팔가 로 자료 ${other}`)
  })

  it('is idempotent across repeated display passes', () => {
    const strings = [
      '마르코가 킹과 퀸을 상대한다.',
      'Supreme King Haki · Supreme King Raw · 버킹엄 · 탱킹',
      'King vs Queen / King of Hell / Pirate King',
      'https://one-piece.com/character/King/index.html',
    ]
    for (const input of strings) {
      const normalized = normalizeCharacterNamesForDisplay(input)
      expect(normalizeCharacterNamesForDisplay(normalized)).toBe(normalized)
      expect(normalized).not.toContain('Supreme 알베르')
      expect(normalized).not.toContain('버알베르')
      expect(normalized).not.toContain('탱알베르')
    }
  })

})
