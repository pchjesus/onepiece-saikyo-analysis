import { useMemo, useState } from 'react'
import { getCharacterList } from '../application/getCharacterList'
import { getStatRanking } from '../application/getStatRanking'
import type { RankingStat } from '../application/getStatRanking'
import { CharacterSearch } from './components/CharacterSearch'
import { StatRankingDialog } from './components/StatRankingDialog'
import { CharacterPage } from './pages/CharacterPage'
import { MatchupHome } from './pages/MatchupHome'
import './styles.css'

const characterList = getCharacterList()

export default function App() {
  const [selectedId, setSelectedId] = useState(characterList[0]?.character.id ?? '')
  const [selectedGroupId, setSelectedGroupId] = useState(characterList[0]?.group.id ?? '')
  const [rankingStat, setRankingStat] = useState<RankingStat | null>(null)
  const [activeView, setActiveView] = useState<'stats' | 'matchup'>('stats')

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
    setActiveView('stats')
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-title">
          <p className="eyebrow">ONE PIECE · MVP</p>
          <h1>원피스 전투력 분석</h1>
          <p>Character → Evaluation → Calculation Model → Combat Power</p>
        </div>
        {activeView === 'stats' && <CharacterSearch characters={characterList} onSelectCharacter={selectCharacter} />}
      </header>
      <nav className="app-mode-nav" aria-label="주요 화면">
        <button type="button" className={activeView === 'stats' ? 'selected' : ''} aria-pressed={activeView === 'stats'}
          aria-label="스탯 분석 화면" onClick={() => setActiveView('stats')}>
          <span className="app-mode-icon stats-icon" aria-hidden="true"><i /><i /><i /></span>
          <span>스탯</span>
        </button>
        <button type="button" className={activeView === 'matchup' ? 'selected' : ''} aria-pressed={activeView === 'matchup'}
          aria-label="매치업 아레나 화면" onClick={() => { setActiveView('matchup'); setRankingStat(null) }}>
          <span className="app-mode-icon vs-icon" aria-hidden="true">VS</span>
          <span>매치업</span>
        </button>
      </nav>
      {activeView === 'stats' ? <>
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
          {visibleCharacters.map(({ character, membership }) => (
            <button key={character.id} className={`character-chip ${selectedId === character.id ? 'selected' : ''}`}
              type="button" aria-pressed={selectedId === character.id} onClick={() => setSelectedId(character.id)}>
              <span>{character.name}</span>
              {(membership.status === 'former' || membership.status === 'historical') && <small>과거 소속</small>}
            </button>
          ))}
        </div>
      </nav>
      {selectedId && <CharacterPage key={`${selectedGroupId}:${selectedId}`} characterId={selectedId} groupId={selectedGroupId} onSelectStat={setRankingStat} onSelectOverall={() => setRankingStat('overall')} />}
      {rankingStat && <StatRankingDialog stat={rankingStat} entries={getStatRanking(rankingStat)}
        selectedCharacterId={selectedId} onSelectCharacter={selectCharacter} onClose={() => setRankingStat(null)} />}
      </> : <MatchupHome />}
    </div>
  )
}
