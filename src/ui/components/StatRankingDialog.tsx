import { useEffect, useState } from 'react'
import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { RankingStat, StatRankingEntry } from '../../application/getStatRanking'

export function StatRankingDialog({
  stat, entries, selectedCharacterId, onSelectCharacter, onClose,
}: {
  stat: RankingStat
  entries: StatRankingEntry[]
  selectedCharacterId: string
  onSelectCharacter: (characterId: string, groupId: string) => void
  onClose: () => void
}) {
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
        <p className="section-note">현재 등록된 {entries.length}명 · {stat === 'overall' ? '균형형 1.2의 7개 최종 스탯 평균 (정렬은 반올림 전 원값)' : '최종점수'} · 동점은 공동 순위. 복수 평가 상태가 있는 캐릭터는 대표 평가만 순위에 포함됩니다. 모든 값은 현재 평가 상태에 따르며 1대1 승률이나 공식 서열이 아닙니다. 이름을 누르면 해당 캐릭터로 이동합니다.</p>
        <div className="rank-sort-controls" role="group" aria-label="순위 정렬 방향">
          <button type="button" className={direction === 'desc' ? 'selected' : ''} aria-pressed={direction === 'desc'} onClick={() => setDirection('desc')}>높은 점수순 ↓</button>
          <button type="button" className={direction === 'asc' ? 'selected' : ''} aria-pressed={direction === 'asc'} onClick={() => setDirection('asc')}>낮은 점수순 ↑</button>
        </div>
        <div className="rank-list">
          {sortedEntries.map((entry) => (
            <button className={`rank-row ${entry.characterId === selectedCharacterId ? 'active' : ''}`} type="button"
              key={`${entry.characterId}-${entry.groupId}`}
              aria-label={`${entry.rank}위 ${entry.characterName} ${stat === 'overall' ? entry.score.toFixed(3) : entry.score}점 선택`}
              onClick={() => onSelectCharacter(entry.characterId, entry.groupId)}>
              <strong className="rank-position">{entry.rank}위</strong>
              <span className="rank-person"><strong>{entry.characterName}</strong><small>{entry.groupName}{entry.subjectStateLabel ? ` · 평가 시점: ${entry.subjectStateLabel}` : ''} · {entry.status}</small></span>
              <strong className="rank-score">{stat === 'overall' ? entry.score.toFixed(3) : entry.score}<small> / 100</small></strong>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
