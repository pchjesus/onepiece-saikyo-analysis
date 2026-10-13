import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'

/**
 * Presentation-only source parser. Original labels/references remain intact
 * in the data model; links are only rendered for validated HTTPS addresses.
 */
export function splitSourceReference(value: string): { text: string; url?: string } {
  const found = /https?:\/\/[^\s<>"'`]+/i.exec(value)
  if (!found) return { text: value.trim() }
  const candidate = found[0].replace(/[.,;:!?\])}>，、。）]+$/u, '')
  try {
    const parsed = new URL(candidate)
    if (parsed.protocol !== 'https:' || !parsed.hostname) return { text: value.trim() }
    const text = (value.slice(0, found.index) + value.slice(found.index + candidate.length))
      .replace(/\s*·\s*$/u, '').trim()
    return { text, url: parsed.href }
  } catch {
    return { text: value.trim() }
  }
}

type SourceCitationProps = {
  label?: string
  reference: string
  description?: string
}
export function SourceCitation({ label, reference, description }: SourceCitationProps) {
  const primary = splitSourceReference(reference)
  const supplementary = description ? splitSourceReference(description) : undefined
  const urls = [primary.url, supplementary?.url].filter(
    (url, index, values): url is string => Boolean(url) && values.indexOf(url) === index,
  )
  const notes = [primary.text, supplementary?.text]
    .filter((note): note is string => Boolean(note?.trim()))
    .filter((note, i, notes) => notes.indexOf(note) === i)
  return <span className="source-citation">
    {label && <strong className="source-citation-label">{normalizeCharacterNamesForDisplay(label)}</strong>}
    {notes.map((note, index) => <span className="source-citation-note" key={index}>
      {label || index ? ' · ' : ''}{normalizeCharacterNamesForDisplay(note)}
    </span>)}
    {urls.map((url, index) => <a className="source-citation-link" key={url} href={url}
      target="_blank" rel="noopener noreferrer" title={url}
      aria-label={`${label || notes[0] || '출처'} ${index ? '관련 자료' : '원문'} 새 창에서 열기`}>
      {index ? '관련 자료 ↗' : '원문 보기 ↗'}
    </a>)}
  </span>
}
