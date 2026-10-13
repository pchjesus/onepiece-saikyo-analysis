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

type SourceCitationProps = {
  label?: string
  reference: string
  description?: string
}
export function SourceCitation({ label, reference, description }: SourceCitationProps) {
  const primary = splitSourceReference(reference)
  const supplementary = description ? splitSourceReference(description) : undefined
  const urls = [...primary.urls, ...(supplementary?.urls ?? [])]
    .filter((url, index, values) => values.indexOf(url) === index)
  const notes = [primary.text, supplementary?.text]
    .filter((note): note is string => Boolean(note?.trim()))
    .filter((note, i, values) => values.indexOf(note) === i)
  return <span className="source-citation">
    {label && <strong className="source-citation-label">{normalizeCharacterNamesForDisplay(label)}</strong>}
    {notes.map((note, index) => <span className="source-citation-note" key={index}>
      {label || index ? ' · ' : ''}{normalizeCharacterNamesForDisplay(note)}
    </span>)}
    {urls.map((url, index) => <a className="source-citation-link" key={url} href={url}
      target="_blank" rel="noopener noreferrer" title={url}
      aria-label={`${label || notes[0] || '출처'} ${index ? '관련 자료 '+(index+1) : '원문'} 새 창에서 열기`}>
      {index ? `관련 자료 ${index+1} ↗` : '원문 보기 ↗'}
    </a>)}
  </span>
}
