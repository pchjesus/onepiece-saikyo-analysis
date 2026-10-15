import { getCharacterQuoteReview } from '../../data/quotes/characterQuotes'

/** Read-only, character-scoped prose. No Evaluation/state dependency. */
export function CharacterQuote({ characterId }: { characterId: string }) {
  const review = getCharacterQuoteReview(characterId)
  if (!review?.displayKorean || review.verificationStatus === 'pending') return null
  return (
    <figure className="character-quote" aria-label="캐릭터 대표 명대사">
      <div className="character-quote-eyebrow">대표 명대사</div>
      <blockquote lang="ko">{review.displayKorean}</blockquote>
      <figcaption>
        <span>{review.mangaChapter ? `제${review.mangaChapter}화${review.verificationStatus === 'secondary-excerpt' ? ' (2차 자료 기재)' : ''}` : '원작 만화 화수 미확인'} · {review.translationStatus === 'official-korean' ? '한국어 정식 번역 확인' : '한국어 자체 번역'}</span>
        <details className="character-quote-source">
          <summary>일본어 원문 · 출처</summary>
          {review.originalJapanese && <p lang="ja">{review.originalJapanese}</p>}
          {review.context && <p>{review.context}</p>}
          <small>{review.verificationStatus === 'manga-checked' ? '원작 컷 확인' : review.verificationStatus === 'secondary-excerpt' ? '2차 자료 인용 · 원작 컷 및 한국 정식 번역 미대조' : '공식 일본어 인용 확인 · 원작 컷 미대조'}</small>
          {review.source && <a href={review.source.url} target="_blank" rel="noopener noreferrer">{review.source.label} ↗</a>}
        </details>
      </figcaption>
    </figure>
  )
}
