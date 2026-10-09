import { useState } from 'react'
import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat, EvaluationItem } from '../../domain/evaluation/types'
import { getEffectiveHakiContributionTotal, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { StatInfoDialog } from './StatInfoDialog'

export function StatList({ items, hakiWeight, onSelectStat }: {
  items: EvaluationItem[]
  hakiWeight: number
  onSelectStat: (stat: CombatStat) => void
}) {
  const [selectedStat, setSelectedStat] = useState<CombatStat | null>(null)

  return (
    <>
      <div className="stat-grid">
        {items.map((item) => {
          const definition = COMBAT_STAT_DEFINITIONS[item.stat]
          const rawHaki = getRawHakiContributionTotal(item)
          const effectiveHaki = getEffectiveHakiContributionTotal(item, hakiWeight)
          return (
            <div className="stat-item" key={item.stat}>
              <button className="stat-rank-trigger" type="button" onClick={() => onSelectStat(item.stat)} aria-label={`${definition.label} 전체 캐릭터 순위 보기`}>
                <span className="stat-name">
                  {definition.label}
                  {item.readiness && <small className={`readiness-badge ${item.readiness.toLowerCase()}`} title="근거 충분도">근거 {item.readiness}</small>}
                </span>
                <span className="stat-score">
                  <strong>{item.score}</strong>
                  {rawHaki > 0 && <small className="stat-breakdown">기본점수 {item.baseScore} + 패기 {effectiveHaki}</small>}
                  <small className="stat-rank-hint">전체 순위 ↗</small>
                </span>
              </button>
              <button className="stat-info-button" type="button" aria-label={`${definition.label} 설명 보기`} onClick={() => setSelectedStat(item.stat)}>?</button>
            </div>
          )
        })}
      </div>
      {selectedStat && <StatInfoDialog stat={selectedStat} onClose={() => setSelectedStat(null)} />}
    </>
  )
}
