import { useState, type CSSProperties } from 'react'
import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat, EvaluationItem } from '../../domain/evaluation/types'
import { getEffectiveHakiContributionTotal, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { StatInfoDialog } from './StatInfoDialog'

const RADAR_CENTER = 160
const RADAR_RADIUS = 107
const RADAR_TOP = -Math.PI / 2
const RADAR_AXIS_COUNT = 7

/**
 * Presentation-only geometry. Scores are passed from the same Evaluation.items
 * used by rankings/comparisons; SVG geometry never modifies scores.
 */
export function radarPoint(index: number, score: number): [number, number] {
  const angle = RADAR_TOP + index * (2 * Math.PI / RADAR_AXIS_COUNT)
  const radius = RADAR_RADIUS * Math.max(0, Math.min(100, score)) / 100
  return [RADAR_CENTER + Math.cos(angle) * radius, RADAR_CENTER + Math.sin(angle) * radius]
}

function pointsForScores(scores: readonly number[]) {
  return scores.map((score, index) => radarPoint(index, score).map(x => x.toFixed(2)).join(',')).join(' ')
}

export function StatList({ items, hakiWeight, accent = '#65717b', onSelectStat, onCompareStat }: {
  items: EvaluationItem[]
  hakiWeight: number
  accent?: string
  onSelectStat: (stat: CombatStat) => void
  onCompareStat: (stat: CombatStat) => void
}) {
  const [selectedStat, setSelectedStat] = useState<CombatStat | null>(null)
  const chartItems = items.slice(0, RADAR_AXIS_COUNT)
  const colorStyle = { '--stat-chart-accent': accent } as CSSProperties
  const accessibleChartLabel = chartItems
    .map(item => `${COMBAT_STAT_DEFINITIONS[item.stat].label} ${item.score}점`).join(', ')

  return (
    <>
      <div className="stat-radar-layout" style={colorStyle}>
        <div className="stat-radar-graphic">
          <svg className="stat-radar-svg" viewBox="0 0 320 320" role="img"
            aria-label={`7축 전투 스탯 그래프: ${accessibleChartLabel}`}>
            <title>7축 전투력 분포</title>
            {[20, 40, 60, 80, 100].map(level => (
              <polygon key={level} className={level === 100 ? 'radar-ring radar-ring-outer' : 'radar-ring'}
                points={pointsForScores(chartItems.map(() => level))} />
            ))}
            {chartItems.map((item, index) => {
              const [x, y] = radarPoint(index, 100)
              return <line key={item.stat} className="radar-axis"
                x1={RADAR_CENTER} y1={RADAR_CENTER} x2={x} y2={y} />
            })}
            <polygon className="radar-value-area" points={pointsForScores(chartItems.map(item => item.score))} />
            {chartItems.map((item, index) => {
              const [x, y] = radarPoint(index, item.score)
              return <circle key={item.stat} className="radar-value-dot" cx={x} cy={y} r="4.5" />
            })}
          </svg>
        </div>

        <div className="stat-grid" aria-label="개별 스탯 · 순위와 비교">
          {items.map((item) => {
            const definition = COMBAT_STAT_DEFINITIONS[item.stat]
            const rawHaki = getRawHakiContributionTotal(item)
            const effectiveHaki = getEffectiveHakiContributionTotal(item, hakiWeight)
            return (
              <div className="stat-item" key={item.stat}>
                <button className="stat-rank-trigger" type="button" onClick={() => onSelectStat(item.stat)}
                  aria-label={`${definition.label} 전체 캐릭터 순위 보기`}>
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
                <button className="stat-compare-trigger" type="button"
                  aria-label={`${definition.label} 다른 캐릭터와 근거 비교하기`}
                  onClick={() => onCompareStat(item.stat)}>비교하기</button>
                <button className="stat-info-button" type="button"
                  aria-label={`${definition.label} 설명 보기`} onClick={() => setSelectedStat(item.stat)}>?</button>
              </div>
            )
          })}
        </div>
      </div>
      {selectedStat && <StatInfoDialog stat={selectedStat} onClose={() => setSelectedStat(null)} />}
    </>
  )
}
