import { useEffect, useRef, useState } from 'react'
import type { CharacterKnownAs } from '../../domain/character/types'

export type CharacterOption = {
  character: { id: string; name: string; crewId: string; knownAs: CharacterKnownAs[] }
  group: { id: string; name: string }
}

function normalize(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('ko').replace(/\s+/g, '')
}

function textRelevance(value: string, query: string): number {
  const normalized = normalize(value)
  if (normalized.startsWith(query)) return 0
  if (normalized.includes(query)) return 1
  let at = 0
  for (const character of normalized) {
    if (character === query[at]) at++
    if (at === query.length) return 2
  }
  return Number.POSITIVE_INFINITY
}

function matchRelevance(character: CharacterOption['character'], group: string, query: string): number {
  const identityScore = Math.min(
    textRelevance(character.name, query),
    ...character.knownAs.map(({ name }) => textRelevance(name, query)),
  )
  if (Number.isFinite(identityScore)) return identityScore
  return normalize(group).includes(query) ? 3 : Number.POSITIVE_INFINITY
}

/** A single query/ranking/deduplication source for the header search and full-roster picker. */
export function findCharacterOptions(characters: CharacterOption[], query: string, limit = 8): CharacterOption[] {
  const term = normalize(query)
  const seen = new Set<string>()
  return characters
    .map((entry, order) => ({
      entry,
      order,
      relevance: term ? matchRelevance(entry.character, entry.group.name, term) : 0,
      representative: entry.group.id === entry.character.crewId ? 0 : 1,
    }))
    .filter(({ relevance }) => Number.isFinite(relevance))
    .sort((a, b) =>
      a.relevance - b.relevance
      || a.representative - b.representative
      || (term ? a.entry.character.name.localeCompare(b.entry.character.name, 'ko') : a.order - b.order))
    .flatMap(({ entry }) => {
      if (seen.has(entry.character.id)) return []
      seen.add(entry.character.id)
      return [entry]
    })
    .slice(0, limit)
}

export function CharacterSearch({ characters, onSelectCharacter }: {
  characters: CharacterOption[]
  onSelectCharacter: (characterId: string, groupId: string) => void
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismissOutside)
    return () => document.removeEventListener('pointerdown', dismissOutside)
  }, [])

  const term = normalize(query)
  const suggestions = term ? findCharacterOptions(characters, query) : []

  const choose = (entry: CharacterOption) => {
    onSelectCharacter(entry.character.id, entry.group.id)
    setQuery('')
    setOpen(false)
    setActiveIndex(0)
  }

  return (
    <div className="character-search" ref={rootRef}>
      <label htmlFor="character-search-input" className="search-label">캐릭터 검색</label>
      <div className="search-field">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          id="character-search-input"
          type="search"
          value={query}
          placeholder="본명·이명·칭호·소속 검색…"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open && term.length > 0}
          aria-controls="character-search-results"
          aria-activedescendant={open && suggestions[activeIndex] ? `search-option-${suggestions[activeIndex].character.id}` : undefined}
          onFocus={() => setOpen(true)}
          onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); setOpen(true) }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') { setOpen(false); return }
            if (!open || suggestions.length === 0) return
            if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((i) => (i + 1) % suggestions.length) }
            if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((i) => (i + suggestions.length - 1) % suggestions.length) }
            if (event.key === 'Enter') { event.preventDefault(); choose(suggestions[activeIndex]) }
          }}
        />
      </div>
      {open && term && (
        <div id="character-search-results" className="search-suggestions" role="listbox" aria-label="검색 결과">
          {suggestions.length ? suggestions.map((entry, index) => {
            const knownAs = entry.character.knownAs.slice(0, 2).map(({ name }) => name).join(' · ')
            return (
              <button type="button" role="option"
                id={`search-option-${entry.character.id}`}
                aria-selected={index === activeIndex}
                className={`search-suggestion ${index === activeIndex ? 'active' : ''}`}
                key={`${entry.group.id}:${entry.character.id}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(entry)}>
                <strong>{entry.character.name}</strong>
                <small>{entry.group.name}{knownAs ? ` · ${knownAs}` : ''}</small>
              </button>
            )
          }) : <p className="search-empty">일치하는 평가 캐릭터가 없어.</p>}
        </div>
      )}
    </div>
  )
}
