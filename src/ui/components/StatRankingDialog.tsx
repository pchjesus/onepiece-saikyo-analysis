import { useEffect } from 'react'
import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat } from '../../domain/evaluation/types'
import type { StatRankingEntry } from '../../application/getStatRanking'

export function StatRankingDialog({
  stat, entries, selectedCharacterId, onSelectCharacter, onClose,
}: {
  stat: CombatStat
  entries: StatRankingEntry[]
  selectedCharacterId: string
  onSelectCharacter: (characterId: string, groupId: string) => void
  onClose: () => void
}) {
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
            <p className="eyebrow">CURRENT 7-CORE ROSTER</p>
            <h3 id="stat-rank-title">{COMBAT_STAT_DEFINITIONS[stat].label} · 전체 정렬</h3>
          </div>
          <button className="stat-info-close" type="button" aria-label="순위 닫기" onClick={onClose}>×</button>
        </div>
        <p className="section-note">현재 등록된 {entries.length}명 · Final 점수 내림차순 · 동점은 공동 순위. 모든 값은 현재 평가 상태에 따르며 1대1 승률이나 공식 서열이 아닙니다. 이름을 누르면 해당 캐릭터로 이동합니다.</p>
        <div className="rank-list">
          {entries.map((entry) => (
            <button className={`rank-row ${entry.characterId === selectedCharacterId ? 'active' : ''}`} type="button"
              key={`${entry.characterId}-${entry.groupId}`}
              aria-label={`${entry.rank}위 ${entry.characterName} ${entry.score}점 선택`}
              onClick={() => onSelectCharacter(entry.characterId, entry.groupId)}>
              <strong className="rank-position">{entry.rank}위</strong>
              <span className="rank-person"><strong>{entry.characterName}</strong><small>{entry.groupName} · {entry.status}</small></span>
              <strong className="rank-score">{entry.score}<small> / 100</small></strong>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
