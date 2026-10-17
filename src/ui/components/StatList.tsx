import { useState, type CSSProperties } from 'react'
import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat, EvaluationItem } from '../../domain/evaluation/types'
import { getEffectiveHakiContributionTotal, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { StatInfoDialog } from './StatInfoDialog'

/** Layout-only change: scores and callbacks come from the existing evaluation. */
export function StatList({ items, hakiWeight, accent = '#65717b', onSelectStat, onCompareStat }: {
  items: EvaluationItem[]
  hakiWeight: number
  accent?: string
  onSelectStat: (stat: CombatStat) => void
  onCompareStat: (stat: CombatStat) => void
}) {
  const [selectedStat, setSelectedStat] = useState<CombatStat | null>(null)
  const colorStyle = { '--stat-chart-accent': accent } as CSSProperties

  return (
    <>
      <div className="stat-grid stat-bar-list" style={colorStyle} aria-label="7축 전투 스탯 막대 그래프">
        {items.map((item, index) => {
          const definition = COMBAT_STAT_DEFINITIONS[item.stat]
          const rawHaki = getRawHakiContributionTotal(item)
          const effectiveHaki = getEffectiveHakiContributionTotal(item, hakiWeight)
          const plottedScore = Math.max(0, Math.min(100, item.score))
          return (
            <div className="stat-item stat-bar-row" key={item.stat}>
              <button className="stat-rank-trigger" type="button"
                onClick={() => onSelectStat(item.stat)}
                aria-label={`${definition.label} 전체 캐릭터 순위 보기`}>
                <span className="stat-name">
                  <span className="stat-axis-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span>{definition.label}</span>
                  {item.readiness && <small className={`readiness-badge ${item.readiness.toLowerCase()}`} title="근거 충분도">근거 {item.readiness}</small>}
                </span>
                <span className="stat-score"><strong>{item.score}</strong></span>
                <span className="stat-rank-hint">전체 순위 ↗</span>
              </button>
              <button className="stat-info-button" type="button" aria-label={`${definition.label} 설명 보기`}
                onClick={() => setSelectedStat(item.stat)}>?</button>
              <div className="stat-bar-meter" role="meter"
                aria-label={`${definition.label} 전투 점수`} aria-valuemin={0} aria-valuemax={100}
                aria-valuenow={plottedScore} aria-valuetext={`${item.score}점 / 100점`}>
                <span className="stat-bar-fill" style={{ width: `${plottedScore}%` }} />
              </div>
              <div className="stat-bar-footer">
                {rawHaki > 0
                  ? <span className="stat-breakdown">기본점수 {item.baseScore} + 패기 {effectiveHaki}</span>
                  : <span className="stat-breakdown stat-no-haki"> </span>}
                <button className="stat-compare-trigger" type="button"
                  aria-label={`${definition.label} 다른 캐릭터와 근거 비교하기`}
                  onClick={() => onCompareStat(item.stat)}>비교하기</button>
              </div>
            </div>
          )
        })}
      </div>
      {selectedStat && <StatInfoDialog stat={selectedStat} onClose={() => setSelectedStat(null)} />}
    </>
  )
}
