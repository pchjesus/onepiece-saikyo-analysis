/**
 * Presentation-only normalization for legacy analysis prose.
 * Internal ids and official alias badges are intentionally untouched.
 * The canonical display name is used whenever older records mention a
 * romanized name or an admiral codename in prose.
 */
const replacements: Array<[RegExp, string]> = [
  [/Supreme King Haki/g, '패왕색 패기'],
  [/Prime Garp/g, '전성기 몽키 D. 가프'],
  [/Van Augur/g, '반 오거'],
  [/Big Mom/g, '빅맘'],
  [/Doc Q/g, '도크 Q'],
  [/Borsalino/g, '보르살리노'],
  [/Kizaru/g, '보르살리노'],
  [/Sakazuki/g, '사카즈키'],
  [/Akainu/g, '사카즈키'],
  [/Kuzan/g, '쿠잔'],
  [/Aokiji/g, '쿠잔'],
  [/Fujitora/g, '잇쇼'],
  [/Issho/g, '잇쇼'],
  [/Ryokugyu/g, '아라마키'],
  [/Aramaki/g, '아라마키'],
  [/Marco/g, '마르코'],
  [/Jozu/g, '죠즈'],
  [/Vista/g, '비스타'],
  [/Katakuri/g, '샬롯 카타쿠리'],
  [/Smoothie/g, '샬롯 스무디'],
  [/Cracker/g, '샬롯 크래커'],
  [/Zoro/g, '롤로노아 조로'],
  [/Sanji/g, '상디'],
  [/Jinbe/g, '징베'],
  [/Shanks/g, '샹크스'],
  [/Garp/g, '몽키 D. 가프'],
  [/Teach/g, '마샬 D. 티치'],
  [/Blackbeard/g, '검은 수염'],
  [/Shiryu/g, '시류'],
  [/Burgess/g, '지저스 바제스'],
  [/Pizarro/g, '아발로 피사로'],
  [/Doflamingo/g, '돈키호테 도플라밍고'],
  [/Hancock/g, '보아 핸콕'],
  [/Law/g, '트라팔가 로'],
  [/Luffy/g, '루피'],
  [/Kid/g, '키드'],
  [/Kaido/g, '카이도'],
  [/Mihawk/g, '미호크'],
  [/Crocodile/g, '크로커다일'],
  [/Roger/g, '로저'],
  [/Rocks/g, '록스'],
  [/Rayleigh/g, '레일리'],
  [/Koby/g, '코비'],
  [/키자루/g, '보르살리노'],
  [/아카이누/g, '사카즈키'],
  [/아오키지/g, '쿠잔'],
  [/후지토라/g, '잇쇼'],
  [/료쿠규/g, '아라마키'],
  // 킹 is an official alias. In prose we use the primary name 알베르,
  // while quoted alias metadata such as 「킹」 remains unchanged.
  [/킹(?!」)/g, '알베르'],
]

export function normalizeCharacterNamesForDisplay(value: string): string {
  return replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value)
}
