import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import type { CharacterListEntry } from '../../application/getCharacterList'
import { findCharacterOptions } from './CharacterSearch'

type Props = {
  characters: CharacterListEntry[]
  selectedCharacterId: string
  onSelectCharacter: (characterId: string, groupId: string) => void
  onClose: () => void
}

/**
 * Group-aware, character-ID-unique full roster finder.
 * Unlike the current-group chips, a historical affiliation is only
 * a navigational context, not a new character identity.
 */
export function CharacterPickerDialog({ characters, selectedCharacterId, onSelectCharacter, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [groupId, setGroupId] = useState('all')
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const groups = useMemo(() => {
    const seen = new Set<string>()
    return characters.map(({ group }) => group).filter((group) => {
      if (seen.has(group.id)) return false
      seen.add(group.id)
      return true
    })
  }, [characters])
  const matching = useMemo(() => {
    const entries = groupId === 'all' ? characters : characters.filter(({ group }) => group.id === groupId)
    return findCharacterOptions(entries, query, Number.POSITIVE_INFINITY)
  }, [characters, groupId, query])

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    inputRef.current?.focus()
    return () => { previousFocus?.focus() }
  }, [])

  const choose = (characterId: string, targetGroupId: string) => {
    onSelectCharacter(characterId, targetGroupId)
    onClose()
  }

  const onKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
    if (event.key !== 'Tab') return
    const focusables = [...(panelRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled])',
    ) ?? [])]
    const first = focusables[0], last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }

  return createPortal(
    <div className="character-picker-backdrop" onPointerDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <div className="character-picker-dialog" role="dialog" aria-modal="true" aria-labelledby="character-picker-title"
        ref={panelRef} onKeyDown={onKeys}>
        <div className="character-picker-header">
          <div>
            <h2 id="character-picker-title">전체 캐릭터 찾기</h2>
            <p>이름·이명·소속으로 검색하거나 그룹을 골라 봐.</p>
          </div>
          <button className="character-picker-close" type="button" aria-label="전체 캐릭터 찾기 닫기"
            onClick={onClose}>×</button>
        </div>
        <div className="character-picker-filters">
          <label htmlFor="character-picker-query">이름·이명·소속 검색</label>
          <input ref={inputRef} id="character-picker-query" type="search" value={query}
            placeholder="예: 킹, 해군, 과거 소속 인물…" autoComplete="off"
            role="combobox" aria-autocomplete="list" aria-expanded="true"
            aria-controls="character-picker-results"
            aria-activedescendant={matching[activeIndex] ? `character-picker-option-${matching[activeIndex].character.id}` : undefined}
            onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown' && matching.length) {
                event.preventDefault(); setActiveIndex(index => (index + 1) % matching.length)
              } else if (event.key === 'ArrowUp' && matching.length) {
                event.preventDefault(); setActiveIndex(index => (index + matching.length - 1) % matching.length)
              } else if (event.key === 'Enter' && matching.length) {
                event.preventDefault(); choose(matching[activeIndex]?.character.id ?? matching[0].character.id,
                  matching[activeIndex]?.group.id ?? matching[0].group.id)
              }
            }} />
          <label htmlFor="character-picker-group">소속 그룹</label>
          <select id="character-picker-group" value={groupId} onChange={(event) => {
            setGroupId(event.target.value); setActiveIndex(0)
          }}>
            <option value="all">전체 그룹</option>
            {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
          </select>
        </div>
        <div className="character-picker-result-count" aria-live="polite">
          검색 결과 {matching.length}명 · 동일 인물은 한 번만 표시
        </div>
        <div id="character-picker-results" className="character-picker-results" role="listbox"
          aria-label="전체 캐릭터 검색 결과">
          {matching.length ? matching.map((entry, index) => {
            const isHistorical = entry.membership.status === 'former' || entry.membership.status === 'historical'
            return <button id={`character-picker-option-${entry.character.id}`} key={entry.character.id}
              type="button" role="option" aria-selected={entry.character.id === selectedCharacterId}
              className={`character-picker-result ${index === activeIndex ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(entry.character.id, entry.group.id)}>
              <strong>{entry.character.name}</strong>
              <span>{entry.group.name}{isHistorical ? ' · 과거 소속' : ''}</span>
            </button>
          }) : <p className="character-picker-empty">해당 조건에 맞는 캐릭터가 없어.</p>}
        </div>
      </div>
    </div>,
    document.body,
  )
}
