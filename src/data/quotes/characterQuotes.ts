import { sampleCharacters } from '../sample/characters'
import { v0411Characters } from '../sample/v0411UnratedCharacterRegistration'
import { v0413EnelCharacter } from '../sample/v0413RemainingDraftPublication'
import { v0412SecondaryQuotes } from './v0412SecondaryQuotes'

/** Quotes are optional presentation evidence, never an Evaluation or combat modifier.
 * official-excerpt: literal Japanese text appears on ONE PIECE.com, but manga panels
 * and the official Korean edition have NOT been individually inspected.
 */
export type QuoteVerification = 'pending' | 'official-excerpt' | 'secondary-excerpt' | 'manga-checked'
export type CharacterQuoteReview = {
  characterId: string
  originalJapanese?: string
  displayKorean?: string
  context?: string
  mangaChapter?: number
  /** Set only when the quoted wording is confirmed as an anime episode, not manga dialogue. */
  animeEpisode?: number
  verificationStatus: QuoteVerification
  translationStatus?: 'editorial' | 'official-korean'
  source?: { label: string; url: string }
}

const officialExcerpts: Record<string, CharacterQuoteReview> = {
  'luffy': { characterId: 'luffy', originalJapanese: "海賊王におれはなる!!!!", displayKorean: "나는 해적왕이 될 거야!", context: "해적왕이 되겠다는 루피의 선언", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
  'zoro': { characterId: 'zoro', originalJapanese: "背中の傷は剣士の恥だ", displayKorean: "등의 상처는 검사의 수치다.", context: "미호크와의 결투에서 자신의 검사로서의 긍지를 밝힘", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
  'sanji': { characterId: 'sanji', originalJapanese: "“女のウソ”は許すのが男だ", displayKorean: "여자의 거짓말을 용서하는 게 남자야.", context: "자신이 지키는 행동 원칙을 밝힘", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
  'jinbe': { characterId: 'jinbe', originalJapanese: "失った物ばかり数えるな!!!無いものは無い!!!", displayKorean: "잃은 것만 헤아리지 마! 없는 것은 없는 거야!", context: "상실에 빠진 루피에게 건네는 조언", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
  'koby': { characterId: 'koby', originalJapanese: "命がも゛ったいだいっ!!!!", displayKorean: "목숨이 아깝잖아요!", context: "마린포드에서 더 이상의 희생을 막으려 외침", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220915_14869/index.html' } },
  'sabo': { characterId: 'sabo', originalJapanese: "“火炎（エース)”が許さねェってよ!!", displayKorean: "에이스의 불꽃이 용서하지 않는다는군!", context: "에이스의 의지를 이어 싸우며 하는 말", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220915_14869/index.html' } },
  'ace': { characterId: 'ace', originalJapanese: "愛してくれて………ありがとう!!!", displayKorean: "사랑해 줘서 고마워!", context: "마린포드에서 자신의 삶을 되돌아보며 전하는 감사", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220915_14869/index.html' } },
  'law': { characterId: 'law', originalJapanese: "弱ェ奴は死に方も選べねェ", displayKorean: "약한 자는 죽는 방식조차 고를 수 없어.", context: "강자 중심의 잔혹한 현실을 말함; 도플라밍고에게서 들은 문장을 인용", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220915_14869/index.html' } },
  'shanks': { characterId: 'shanks', originalJapanese: "この戦争を終わらせに来た!!!", displayKorean: "이 전쟁을 끝내러 왔다!", context: "마린포드 전쟁을 막기 위해 개입", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220810_14705/index.html' } },
  'newgate': { characterId: 'newgate', originalJapanese: "〝ひとつなぎの大秘宝〟は実在する!!!", displayKorean: "원피스는 실제로 존재한다!", context: "마린포드에서 최후에 남긴 선언", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/story/marineford/index.html' } },
  'teach': { characterId: 'teach', originalJapanese: "人の夢は!!!終わらねェ!!!", displayKorean: "사람의 꿈은 끝나지 않아!", context: "자야에서 꿈을 조롱하는 풍조에 맞선 선언", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20200803_11325/index.html' } },
  'doflamingo': { characterId: 'doflamingo', originalJapanese: '勝者だけが正義だ!!!!', displayKorean: '승자만이 정의다!', context: '마린포드에서 승리한 자가 정의를 규정한다는 자신의 세계관을 드러냄', verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 성우 인터뷰', url: 'https://one-piece.com/usop/o20140611_0213/index.html' } },
  'roger': { characterId: 'roger', originalJapanese: '欲しけりゃくれてやるぜ…', displayKorean: '원한다면 주도록 하지…', context: '처형대에서 자신의 보물을 원하는 자들에게 남긴 발언의 일부', verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 비브르 카드 정오표', url: 'https://one-piece.com/vivre/revision/index.html' } },
  'nami': { characterId: 'nami', originalJapanese: "相手が風と海なら航海してみせる!!", displayKorean: "상대가 바람과 바다라면 항해해 보이겠어!", context: "항해사로서의 실력과 자신감을 드러냄", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
  'usopp': { characterId: 'usopp', originalJapanese: "男の別れだ 涙の一つもあってはいけない", displayKorean: "남자들의 이별이야. 눈물 한 방울도 흘려선 안 돼.", context: "이별 앞에서 마음을 다잡는 발언", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
  'chopper': { characterId: 'chopper', originalJapanese: "お゛れが“万能薬”に゛なる゛んだ!!!", displayKorean: "내가 만병통치약이 될 거야!", context: "의사로서의 꿈을 다짐", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
  'robin': { characterId: 'robin', originalJapanese: "生ぎたいっ!!!!", displayKorean: "살고 싶어!", context: "동료에게 자신의 생존 의지를 전함", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
  'franky': { characterId: 'franky', originalJapanese: "あいつらの逃げ道はおれが作る!!!", displayKorean: "저 녀석들의 탈출로는 내가 만든다!", context: "동료의 탈출을 위해 앞장서는 결단", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
  'brook': { characterId: 'brook', originalJapanese: "男が一度…!!!必ず帰ると言ったのだから!!!", displayKorean: "남자가 한 번 반드시 돌아오겠다고 약속했으니까!", context: "돌아가겠다는 약속을 지키려는 의지", verificationStatus: 'official-excerpt', translationStatus: 'editorial', source: { label: 'ONE PIECE.com · 공식 일본어 인용', url: 'https://one-piece.com/news/o20220411_13783/index.html' } },
}

/** One review slot per unique registered character ID; no invented fallback dialogue. */
export const characterQuoteReviews: Record<string, CharacterQuoteReview> = Object.fromEntries(
  [...sampleCharacters, ...v0411Characters, v0413EnelCharacter].map(({ id }) => [id, v0412SecondaryQuotes[id] ?? officialExcerpts[id] ?? { characterId: id, verificationStatus: 'pending' }]),
)

export function getCharacterQuoteReview(characterId: string): CharacterQuoteReview | undefined {
  return characterQuoteReviews[characterId]
}
