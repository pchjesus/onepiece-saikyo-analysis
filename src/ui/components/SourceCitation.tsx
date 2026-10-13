import type { EvidenceSourceType } from '../../domain/evidence/types'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'

/**
 * Presentation-only URL extraction. Canon references stay untouched in data.
 * HTTPS links in one field may be plural (e.g. Ulti / X Drake episode sources).
 */
export function splitSourceReference(value: string): { text: string; urls: string[] } {
  const urls: string[] = []
  const text = value.replace(/https?:\/\/[^\s<>"'`]+/gi, (raw) => {
    const candidate = raw.replace(/[.,;:!?\])}>，、。）]+$/u, '')
    try {
      const parsed = new URL(candidate)
      if (parsed.protocol !== 'https:' || !parsed.hostname) return raw
      urls.push(parsed.href)
      return raw.slice(candidate.length)
    } catch {
      return raw
    }
  }).replace(/\s*·\s*(?=·|$)/gu, '').replace(/(?:\s*·\s*){2,}/gu, ' · ').trim()
  return { text, urls }
}

export type SourceCitationProps = {
  label?: string
  reference: string
  description?: string
  /** Existing Evidence source classification; never inferred as original-page verification. */
  sourceType?: EvidenceSourceType
}

/** Display classification is not a quality score or proof of first-hand manga review. */
export function describeSource({ label, reference, description, sourceType }: SourceCitationProps) {
  const first = splitSourceReference(reference)
  const second = description ? splitSourceReference(description) : undefined
  const urls = [...first.urls, ...(second?.urls ?? [])]
  const context = [label, first.text, second?.text].filter(Boolean).join(' ').toLowerCase()
  const isFan = /팬|비공식|fandom|fan wiki|fan summary/.test(context)
    || urls.some(url => new URL(url).hostname.endsWith('.fandom.com'))
  const official = urls.some(url => new URL(url).hostname === 'one-piece.com')
  const officialProfile = official && urls.some(url => new URL(url).hostname === 'one-piece.com'
    && new URL(url).pathname.startsWith('/character/'))
  const officialEpisode = official && urls.some(url => new URL(url).hostname === 'one-piece.com'
    && new URL(url).pathname.startsWith('/anime/'))
  const mangaRef = /원작|manga|chapter|ch\./i.test(context)
  if (sourceType === 'community') return { kind: '커뮤니티 자료', action: isFan ? '팬 해설 보기 ↗' : '게시물 보기 ↗' }
  if (isFan) return { kind: '비공식 해설', action: '팬 해설 보기 ↗' }
  if (sourceType === 'canon') return { kind: '원작 회차 참조', action: '자료 보기 ↗' }
  if (officialEpisode) return { kind: '공식 애니메이션 보조 자료', action: '공식 회차 자료 보기 ↗' }
  if (officialProfile) return { kind: '공식 캐릭터 자료', action: '공식 프로필 보기 ↗' }
  if (official && sourceType === 'supplementary') return { kind: '공식 보조 자료', action: '공식 자료 보기 ↗' }
  if (sourceType === 'supplementary') return { kind: '보조 자료', action: '자료 보기 ↗' }
  if (mangaRef) return { kind: '원작 회차 참조', action: '자료 보기 ↗' }
  return { kind: '자료 유형 미확인', action: '자료 보기 ↗' }
}
export function SourceCitation({ label, reference, description, sourceType }: SourceCitationProps) {
  const primary = splitSourceReference(reference)
  const supplementary = description ? splitSourceReference(description) : undefined
  const urls = [...primary.urls, ...(supplementary?.urls ?? [])]
    .filter((url, index, values) => values.indexOf(url) === index)
  const notes = [primary.text, supplementary?.text]
    .filter((note): note is string => Boolean(note?.trim()))
    .filter((note, i, values) => values.indexOf(note) === i)
  const display = describeSource({label,reference,description,sourceType})
  return <span className="source-citation">
    <span className="source-citation-type">{display.kind}</span>
    {label && <strong className="source-citation-label">{normalizeCharacterNamesForDisplay(label)}</strong>}
    {notes.map((note, index) => <span className="source-citation-note" key={index}>
      {label || index ? ' · ' : ''}{normalizeCharacterNamesForDisplay(note)}
    </span>)}
    {urls.map((url, index) => <a className="source-citation-link" key={url} href={url}
      target="_blank" rel="noopener noreferrer" title={url}
      aria-label={`${label || notes[0] || display.kind} ${index ? '관련 자료 '+(index+1) : display.action.replace(' ↗','')} 새 창에서 열기`}>
      {index ? `관련 자료 ${index+1} ↗` : display.action}
    </a>)}
  </span>
}
