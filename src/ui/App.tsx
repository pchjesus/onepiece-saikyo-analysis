import { useMemo, useRef, useState } from 'react'
import { getCharacterList } from '../application/getCharacterList'
import type { RankingStat } from '../application/getStatRanking'
import { CharacterPickerDialog } from './components/CharacterPickerDialog'
import { StatRankingDialog } from './components/StatRankingDialog'
import { CharacterPage } from './pages/CharacterPage'
import { MatchupHome } from './pages/MatchupHome'
import { OrganizationHome } from './pages/OrganizationHome'
import { PatchHistoryDialog } from './components/PatchHistoryDialog'
import { patchHistory } from '../data/patchHistory'
import { evaluationRepository } from '../data/repositories/evaluationRepository'
import { UnratedCharacterPage } from './pages/UnratedCharacterPage'
import { StatComparisonDialog } from './components/StatComparisonDialog'
import type { CombatStat } from '../domain/evaluation/types'
import './styles.css'

const characterList = getCharacterList()

export default function App() {
  const [selectedId, setSelectedId] = useState(characterList[0]?.character.id ?? '')
  const [selectedGroupId, setSelectedGroupId] = useState(characterList[0]?.group.id ?? '')
  const [rankingStat, setRankingStat] = useState<RankingStat | null>(null)
  // Character detail keeps its own selection; temporary ranking popup state is isolated and reset on close.
  const [selectedStates, setSelectedStates] = useState<Record<string,string>>({})
  const selectEvaluationState = (characterId:string, stateId:string) => setSelectedStates(prev=>({...prev,[characterId]:stateId}))
  const [statComparison, setStatComparison] = useState<{stat:CombatStat;primaryId:string;primaryStateId?:string}|null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [patchOpen, setPatchOpen] = useState(false)
  const pickerTrigger = useRef<HTMLButtonElement>(null)
  const [activeView, setActiveView] = useState<'stats' | 'matchup' | 'organization'>('stats')

  const groups = useMemo(() => {
    const seen = new Set<string>()
    return characterList.map(({ group }) => group).filter((group) => {
      if (seen.has(group.id)) return false
      seen.add(group.id)
      return true
    })
  }, [])

  const visibleCharacters = characterList.filter(({ group }) => group.id === selectedGroupId)

  const closePicker = () => {
    setPickerOpen(false)
    pickerTrigger.current?.focus()
  }

  const selectGroup = (groupId: string) => {
    setSelectedGroupId(groupId)
    const firstCharacter = characterList.find(({ group }) => group.id === groupId)
    if (firstCharacter) setSelectedId(firstCharacter.character.id)
    setRankingStat(null)
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
          <p>캐릭터 → 평가 → 계산 모델 → 전투력</p>
          <button className="patch-history-trigger" type="button" onClick={() => setPatchOpen(true)}>패치 내역 <span>{patchHistory[0].version}</span></button>
        </div>

      </header>
      {patchOpen && <PatchHistoryDialog onClose={() => setPatchOpen(false)} />}
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
        <button type="button" className={activeView === 'organization' ? 'selected' : ''} aria-pressed={activeView === 'organization'}
          aria-label="조직도 화면" onClick={() => { setActiveView('organization'); setRankingStat(null) }}>
          <span className="app-mode-icon org-icon" aria-hidden="true">♧</span>
          <span>조직도</span>
        </button>
      </nav>
      {activeView === 'stats' ? <>
      <nav className="character-selector" aria-label="캐릭터 선택">
        <div className="character-picker-toolbar">
          <label className="group-picker-label" htmlFor="group-picker-select">소속 그룹</label>
          <select id="group-picker-select" className="group-picker-select" aria-label="그룹 선택"
            value={selectedGroupId} onChange={(event) => selectGroup(event.target.value)}>
            {groups.map((group) => <option value={group.id} key={group.id}>{group.name}</option>)}
          </select>
          <button type="button" className="open-character-picker" ref={pickerTrigger}
            aria-haspopup="dialog" aria-expanded={pickerOpen}
            onClick={() => setPickerOpen(true)}>⌕ 전체 캐릭터 찾기</button>
        </div>
        <div className="character-chips" aria-label="그룹 캐릭터">
          {visibleCharacters.map(({ character, membership }) => (
            <button key={character.id} className={`character-chip ${selectedId === character.id ? 'selected' : ''}`}
              type="button" aria-pressed={selectedId === character.id} onClick={() => setSelectedId(character.id)}>
              <span>{character.name}</span>
              {(membership.status === 'former' || membership.status === 'historical')
                && !(character.id === 'newgate' && membership.groupId === 'whitebeard-pirates')
                && <small>과거 소속</small>}
            </button>
          ))}
        </div>
      </nav>
      {pickerOpen && <CharacterPickerDialog characters={characterList} groups={groups}
        onSelectCharacter={selectCharacter} onClose={closePicker} />}
      {selectedId && (evaluationRepository.getEvaluations(selectedId).length === 0
        ? <UnratedCharacterPage key={`${selectedGroupId}:${selectedId}`} characterId={selectedId} groupId={selectedGroupId}/>
        : <CharacterPage key={`${selectedGroupId}:${selectedId}`} characterId={selectedId} groupId={selectedGroupId} selectedStateId={selectedStates[selectedId]} onStateChange={stateId=>selectEvaluationState(selectedId,stateId)} onSelectStat={setRankingStat}
        onCompareStat={(stat,stateId)=>{setRankingStat(null);setStatComparison({stat,primaryId:selectedId,primaryStateId:stateId})}}
        onSelectOverall={() => setRankingStat('overall')} />)}
      {statComparison && <StatComparisonDialog {...statComparison} onClose={() => setStatComparison(null)} />}
      {rankingStat && <StatRankingDialog stat={rankingStat}
        selectedCharacterId={selectedId} onSelectCharacter={selectCharacter} onClose={() => setRankingStat(null)} />}
      </> : activeView === 'matchup' ? <MatchupHome /> : <OrganizationHome onSelectCharacter={selectCharacter} />}
    </div>
  )
}
