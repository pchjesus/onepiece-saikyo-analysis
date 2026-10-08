import { useEffect, useRef, useState } from 'react'

type CharacterOption = {
  character: { id: string; name: string }
  group: { id: string; name: string }
}

function normalize(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('ko').replace(/\s+/g, '')
}

function matchRelevance(name: string, group: string, query: string): number {
  const normalized = normalize(name)
  if (normalized.startsWith(query)) return 0
  if (normalized.includes(query)) return 1
  let at = 0
  for (const character of normalized) {
    if (character === query[at]) at++
    if (at === query.length) return 2
  }
  return normalize(group).includes(query) ? 3 : Number.POSITIVE_INFINITY
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
  const suggestions = term
    ? characters
      .map((entry) => ({ entry, relevance: matchRelevance(entry.character.name, entry.group.name, term) }))
      .filter(({ relevance }) => Number.isFinite(relevance))
      .sort((a, b) => a.relevance - b.relevance || a.entry.character.name.localeCompare(b.entry.character.name, 'ko'))
      .slice(0, 8).map(({ entry }) => entry)
    : []

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
          placeholder="이름 또는 소속 검색…"
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
          {suggestions.length ? suggestions.map((entry, index) => (
            <button type="button" role="option"
              id={`search-option-${entry.character.id}`}
              aria-selected={index === activeIndex}
              className={`search-suggestion ${index === activeIndex ? 'active' : ''}`}
              key={`${entry.group.id}:${entry.character.id}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(entry)}>
              <strong>{entry.character.name}</strong><small>{entry.group.name}</small>
            </button>
          )) : <p className="search-empty">일치하는 평가 캐릭터가 없어.</p>}
        </div>
      )}
    </div>
  )
}
