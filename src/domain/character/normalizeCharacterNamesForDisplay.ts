/**
 * Presentation-only normalization for legacy analysis prose.
 * Internal ids and official alias badges are intentionally untouched.
 * The canonical display name is used whenever older records mention a
 * romanized name or an admiral codename in prose.
 *
 * Guardrails: resolve Haki titles before character names, match romanized names
 * only as words, and match the Korean nickname 킹 only at a token boundary.
 * Preserve official quoted aliases and URLs. This function never rewrites
 * canonical data, Evidence references, ids, or scoring values.
 */
const replacements: Array<[RegExp, string]> = [
  // User-facing terminology only: preserve canonical domain IDs and original citations.
  [/Divine Departure/gi, '카무사리'],
  [/神避/g, '카무사리'],
  [/신피/g, '카무사리'],
  [/Haki Weight/gi, '패기 가중치'],
  [/\bSupreme King's Haki\b/gi, '패왕색 패기'],
  [/\bSupreme King Haki\b/gi, '패왕색 패기'],
  [/\bSupreme King's\b/gi, '패왕색'],
  [/\bSupreme King\b/gi, '패왕색'],
  [/\bPirate King\b/gi, '해적왕'],
  [/\bKing of Hell\b/gi, '염왕'],
  [/Raw Haki Contributions?/gi, '패기 원점수 기여'],
  [/Haki Contributions?/gi, '패기 기여'],
  [/Raw Contributions?/gi, '패기 원점수 기여'],
  [/Overall Combat Power/gi, '종합 전투력'],
  [/Canon Evidence/gi, '원작 근거'],
  [/Matchup Evidence/gi, '매치업 근거'],
  [/Core Stats?/gi, '핵심 스탯'],
  [/Combat IQ/gi, '전투 지능'],
  [/Base Score/gi, '기본점수'],
  [/Final Score/gi, '최종점수'],
  [/Raw Power/gi, '순수 위력'],
  [/\bHaki\b/gi, '패기'],
  [/\bEvidence\b/gi, '근거'],
  [/\bOverall\b/gi, '종합 전투력'],
  [/\bBase\b/gi, '기본점수'],
  [/\bFinal\b/gi, '최종점수'],
  [/\bRaw\b/gi, '패기 원점수'],
  [/Gear ([245])/gi, '기어 $1'],
  [/God Valley/gi, '갓 밸리'],
  [/Elbaf/gi, '엘바프'],

  [/Queen Mama Chanter/g, '퀸 마마 샹테호'],
  [/Prime Garp/g, '전성기 몽키 D. 가프'],
  [/Van Augur/g, '반 오거'],
  [/Big Mom/g, '빅맘'],
  [/Doc Q/g, '도크 Q'],
  [/\bBorsalino\b/g, '보르살리노'],
  [/\bKizaru\b/g, '보르살리노'],
  [/\bSakazuki\b/g, '사카즈키'],
  [/\bAkainu\b/g, '사카즈키'],
  [/\bKuzan\b/g, '쿠잔'],
  [/\bAokiji\b/g, '쿠잔'],
  [/\bFujitora\b/g, '잇쇼'],
  [/\bIssho\b/g, '잇쇼'],
  [/\bRyokugyu\b/g, '아라마키'],
  [/\bAramaki\b/g, '아라마키'],
  [/\bMarco\b/g, '마르코'],
  [/\bKing\b/g, '알베르'],
  [/\bQueen\b/g, '퀸'],
  [/\bJozu\b/g, '죠즈'],
  [/\bVista\b/g, '비스타'],
  [/\bKatakuri\b/g, '샬롯 카타쿠리'],
  [/\bSmoothie\b/g, '샬롯 스무디'],
  [/\bCracker\b/g, '샬롯 크래커'],
  [/\bZoro\b/g, '롤로노아 조로'],
  [/\bSanji\b/g, '상디'],
  [/\bJinbe\b/g, '징베'],
  [/\bShanks\b/g, '샹크스'],
  [/\bGarp\b/g, '몽키 D. 가프'],
  [/\bTeach\b/g, '마샬 D. 티치'],
  [/\bBlackbeard\b/g, '검은 수염'],
  [/\bShiryu\b/g, '시류'],
  [/\bBurgess\b/g, '지저스 바제스'],
  [/\bPizarro\b/g, '아발로 피사로'],
  [/\bDoflamingo\b/g, '돈키호테 도플라밍고'],
  [/\bHancock\b/g, '보아 핸콕'],
  [/\bLaw\b/g, '트라팔가 로'],
  [/\bLuffy\b/g, '루피'],
  [/\bKid\b/g, '키드'],
  [/\bKaido\b/g, '카이도'],
  [/\bMihawk\b/g, '미호크'],
  [/\bCrocodile\b/g, '크로커다일'],
  [/\bRoger\b/g, '로저'],
  [/\bRocks\b/g, '록스'],
  [/\bRayleigh\b/g, '레일리'],
  [/\bKoby\b/g, '코비'],
  [/키자루/g, '보르살리노'],
  [/아카이누/g, '사카즈키'],
  [/아오키지/g, '쿠잔'],
  [/후지토라/g, '잇쇼'],
  [/료쿠규/g, '아라마키'],
  // "킹" is the official alias of Alber, NOT a substring in another word
  // (탱킹, 버킹엄, 랭킹, 스모킹) or a translation of Supreme King.
  // Korean case particles require their own correct grammatical substitution.
  // Unicode lookbehind prevents matching words whose preceding character is a letter/digit.
  [/(?<![\p{L}\p{N}])킹에게/gu, '알베르에게'],
  [/(?<![\p{L}\p{N}])킹으로/gu, '알베르로'],
  [/(?<![\p{L}\p{N}])킹은(?![\p{L}\p{N}])/gu, '알베르는'],
  [/(?<![\p{L}\p{N}])킹이(?![\p{L}\p{N}])/gu, '알베르가'],
  [/(?<![\p{L}\p{N}])킹을(?![\p{L}\p{N}])/gu, '알베르를'],
  [/(?<![\p{L}\p{N}])킹과(?![\p{L}\p{N}])/gu, '알베르와'],
  [/(?<![\p{L}\p{N}])킹의(?![\p{L}\p{N}])/gu, '알베르의'],
  [/(?<![\p{L}\p{N}])킹전/gu, '알베르전'],
  // A quoted canonical alias, e.g. 「킹」, remains exactly as provided.
  [/(?<![\p{L}\p{N}])킹(?![\p{L}\p{N}」”’"'])/gu, '알베르'],
]

/** Keep source URLs byte-for-byte when a profile cites an official page. */
const SOURCE_URL_SEGMENTS = /(https?:\/\/[^\s<>()"']+)/g

export function normalizeCharacterNamesForDisplay(value: string): string {
  return value.split(SOURCE_URL_SEGMENTS).map((segment) => (
    /^https?:\/\//.test(segment)
      ? segment
      : replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), segment)
  )).join('')
}
