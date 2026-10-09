import { useEffect, useRef, useState } from 'react'
import type { CharacterListEntry } from '../../application/getCharacterList'
import { getCharacterMatches } from './CharacterSearch'

type GroupOption = { id: string; name: string }

export function CharacterPickerDialog({
  characters,
  groups,
  onSelectCharacter,
  onClose,
}: {
  characters: CharacterListEntry[]
  groups: GroupOption[]
  onSelectCharacter: (characterId: string, groupId: string) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [groupId, setGroupId] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  // Search from the membership-expanded list, but show each character only once.
  // When filtering a historical Group, preserve that Group context upon selection.
  const matching = getCharacterMatches(
    groupId ? characters.filter(({ group }) => group.id === groupId) : characters,
    query,
    Number.POSITIVE_INFINITY,
  )

  const choose = (entry: CharacterListEntry) => {
    onSelectCharacter(entry.character.id, entry.group.id)
    onClose()
  }

  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }
    if (event.key !== 'Tab') return
    const elements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled])',
    )
    if (!elements?.length) return
    const first = elements[0]
    const last = elements[elements.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="character-picker-backdrop" onPointerDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <div className="character-picker-dialog" ref={dialogRef}
        role="dialog" aria-modal="true" aria-labelledby="character-picker-title"
        onKeyDown={onDialogKeyDown}>
        <header className="character-picker-header">
          <div>
            <p className="eyebrow">전체 캐릭터</p>
            <h2 id="character-picker-title">캐릭터 찾아보기</h2>
          </div>
          <button type="button" className="character-picker-close" onClick={onClose}
            aria-label="캐릭터 선택창 닫기">×</button>
        </header>
        <div className="character-picker-filters">
          <label className="character-picker-search-label" htmlFor="character-picker-search">이름·이명·소속 검색</label>
          <input id="character-picker-search" ref={searchRef} type="search" value={query}
            placeholder="예: 키자루, 미호크, CP0"
            autoComplete="off"
            aria-controls="character-picker-results"
            onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }}
            onKeyDown={(event) => {
              if (!matching.length) return
              if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((i) => (i + 1) % matching.length) }
              if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((i) => (i + matching.length - 1) % matching.length) }
              if (event.key === 'Enter') { event.preventDefault(); choose(matching[Math.min(activeIndex, matching.length - 1)]) }
            }}
          />
          <label className="character-picker-group-label" htmlFor="character-picker-group">소속 필터</label>
          <select id="character-picker-group" value={groupId} onChange={(event) => {
            setGroupId(event.target.value)
            setActiveIndex(0)
          }}>
            <option value="">전체 소속</option>
            {groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
          </select>
        </div>
        <p className="character-picker-count" aria-live="polite">
          {matching.length}명 · 중복 소속은 캐릭터당 한 번만 표시
        </p>
        <div id="character-picker-results" className="character-picker-results" role="list"
          aria-label="캐릭터 검색 결과">
          {matching.length ? matching.map((entry, index) => {
            const aliases = entry.character.knownAs.slice(0, 2).map(({ name }) => name).join(' · ')
            const past = entry.membership.status === 'former' || entry.membership.status === 'historical'
            return (
              <button key={entry.character.id} type="button" role="listitem"
                className={`character-picker-option ${index === activeIndex ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(entry)}>
                <strong>{entry.character.name}</strong>
                <span>{entry.group.name}{past ? ' · 과거 소속' : ''}{aliases ? ` · ${aliases}` : ''}</span>
              </button>
            )
          }) : <p className="character-picker-empty">검색 결과가 없어.</p>}
        </div>
        <p className="character-picker-tip">↑↓ 이동 · Enter 선택 · Esc 닫기</p>
      </div>
    </div>
  )
}
