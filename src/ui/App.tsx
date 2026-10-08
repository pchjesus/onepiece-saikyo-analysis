import { useMemo, useState } from 'react'
import { getCharacterList } from '../application/getCharacterList'
import { getStatRanking } from '../application/getStatRanking'
import type { CombatStat } from '../domain/evaluation/types'
import { StatRankingDialog } from './components/StatRankingDialog'
import { CharacterPage } from './pages/CharacterPage'
import './styles.css'

const characterList = getCharacterList()

export default function App() {
  const [selectedId, setSelectedId] = useState(characterList[0]?.character.id ?? '')
  const [selectedGroupId, setSelectedGroupId] = useState(characterList[0]?.group.id ?? '')
  const [rankingStat, setRankingStat] = useState<CombatStat | null>(null)

  const groups = useMemo(() => {
    const seen = new Set<string>()
    return characterList.map(({ group }) => group).filter((group) => {
      if (seen.has(group.id)) return false
      seen.add(group.id)
      return true
    })
  }, [])

  const visibleCharacters = characterList.filter(({ group }) => group.id === selectedGroupId)

  const selectGroup = (groupId: string) => {
    setSelectedGroupId(groupId)
    const firstCharacter = characterList.find(({ group }) => group.id === groupId)
    if (firstCharacter) setSelectedId(firstCharacter.character.id)
  }

  const selectCharacter = (characterId: string, groupId: string) => {
    setSelectedGroupId(groupId)
    setSelectedId(characterId)
    setRankingStat(null)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">ONE PIECE · MVP</p>
        <h1>원피스 전투력 분석</h1>
        <p>Character → Evaluation → Calculation Model → Combat Power</p>
      </header>
      <nav className="character-selector" aria-label="캐릭터 선택">
        <div className="crew-tabs" role="tablist" aria-label="그룹 선택">
          {groups.map((group) => (
            <button key={group.id} className={`crew-tab ${selectedGroupId === group.id ? 'selected' : ''}`}
              type="button" role="tab" aria-selected={selectedGroupId === group.id} onClick={() => selectGroup(group.id)}>
              {group.name}
            </button>
          ))}
        </div>
        <div className="character-chips" aria-label="그룹 캐릭터">
          {visibleCharacters.map(({ character }) => (
            <button key={character.id} className={`character-chip ${selectedId === character.id ? 'selected' : ''}`}
              type="button" aria-pressed={selectedId === character.id} onClick={() => setSelectedId(character.id)}>
              {character.name}
            </button>
          ))}
        </div>
      </nav>
      {selectedId && <CharacterPage key={`${selectedGroupId}:${selectedId}`} characterId={selectedId} groupId={selectedGroupId} onSelectStat={setRankingStat} />}
      {rankingStat && <StatRankingDialog stat={rankingStat} entries={getStatRanking(rankingStat)}
        selectedCharacterId={selectedId} onSelectCharacter={selectCharacter} onClose={() => setRankingStat(null)} />}
    </div>
  )
}
