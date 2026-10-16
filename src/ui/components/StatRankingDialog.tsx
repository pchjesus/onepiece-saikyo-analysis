import { useEffect, useState } from 'react'
import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import { getHighestOverallStateIds, getStatRanking } from '../../application/getStatRanking'
import type { RankingStat } from '../../application/getStatRanking'

export function StatRankingDialog({
  stat, selectedCharacterId, onSelectCharacter, onClose,
}: {
  stat: RankingStat
  selectedCharacterId: string
  onSelectCharacter: (characterId: string, groupId: string) => void
  onClose: () => void
}) {
  // Both state choices and sort direction die with the popup on X / backdrop / Escape.
  const [popupStates, setPopupStates] = useState<Record<string,string>>(() => stat==='overall' ? getHighestOverallStateIds() : {})
  const entries = getStatRanking(stat, popupStates)
  const [direction, setDirection] = useState<'desc' | 'asc'>('desc')
  const sortedEntries = direction === 'desc' ? entries : [...entries].reverse()

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [onClose])

  return (
    <div className="stat-info-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="stat-info-dialog stat-rank-dialog" role="dialog" aria-modal="true" aria-labelledby="stat-rank-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="stat-info-header">
          <div>
            <p className="eyebrow">현재 평가 로스터</p>
            <h3 id="stat-rank-title">{stat === 'overall' ? '종합 전투력' : COMBAT_STAT_DEFINITIONS[stat].label} · 전체 정렬</h3>
          </div>
          <button className="stat-info-close" type="button" aria-label="순위 닫기" onClick={onClose}>×</button>
        </div>
        <p className="section-note">현재 등록된 {entries.length}명 · {stat === 'overall' ? '정규 캐릭터는 Balanced 1.2 평균, 차를로스 성은 특별 밈 7축 평균 (정렬은 반올림 전 원값)' : '최종점수'} · 동점은 공동 순위. 복수 평가 캐릭터도 한 명당 한 행만 표시됩니다. 해당 행에서 평가 시점을 바꾸면 전체 순위가 즉시 재계산되며 이 팝업의 선택은 닫으면 초기화됩니다. 기본값은 각 인물의 최고 종합점수 상태입니다. 모든 값은 현재 평가 상태에 따르며 1대1 승률이나 공식 서열이 아닙니다. 이름을 누르면 해당 캐릭터로 이동합니다.</p>
        <div className="rank-sort-controls" role="group" aria-label="순위 정렬 방향">
          <button type="button" className={direction === 'desc' ? 'selected' : ''} aria-pressed={direction === 'desc'} onClick={() => setDirection('desc')}>높은 점수순 ↓</button>
          <button type="button" className={direction === 'asc' ? 'selected' : ''} aria-pressed={direction === 'asc'} onClick={() => setDirection('asc')}>낮은 점수순 ↑</button>
        </div>
        <div className="rank-list">
          {sortedEntries.map((entry) => (
            <div className="rank-entry" key={`${entry.characterId}-${entry.groupId}`}>
              <button className={`rank-row ${entry.characterId === selectedCharacterId ? 'active' : ''}`} type="button"
                aria-label={`${entry.rank}위 ${entry.characterName} ${stat === 'overall' ? entry.score.toFixed(3) : entry.score}점 선택`}
                onClick={() => onSelectCharacter(entry.characterId, entry.groupId)}>
                <strong className="rank-position">{entry.rank}위</strong>
                <span className="rank-person"><strong>{entry.characterName}</strong>{entry.specialEvaluation && <em className="special-rank-tag">특별 밈 평가</em>}<small>{entry.groupName}{entry.subjectStateLabel ? ` · 평가 시점: ${entry.subjectStateLabel}` : ''}</small></span>
                <strong className="rank-score">{stat === 'overall' ? entry.score.toFixed(3) : entry.score}<small> / 100</small></strong>
              </button>
              {stat === 'overall' && entry.stateOptions && entry.stateOptions.length > 1 && (
                <label className="rank-state-control">
                  <span className="sr-only">{entry.characterName} 평가 시점</span>
                  <select aria-label={`${entry.characterName} 순위 평가 시점 선택`}
                    value={entry.subjectStateId ?? ''} onChange={event => setPopupStates(previous=>({...previous,[entry.characterId]:event.target.value}))}>
                    {entry.stateOptions.map(state => <option key={state.id} value={state.id}>{state.label}</option>)}
                  </select>
                </label>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
