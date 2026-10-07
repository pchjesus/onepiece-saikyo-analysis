import { useState } from 'react'
import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat, EvaluationItem } from '../../domain/evaluation/types'
import { getEffectiveHakiContributionTotal, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { StatInfoDialog } from './StatInfoDialog'

export function StatList({ items, hakiWeight }: { items: EvaluationItem[]; hakiWeight: number }) {
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
              <span className="stat-label">
                {definition.label}
                <button className="stat-info-button" type="button" aria-label={`${definition.label} 설명 보기`} onClick={() => setSelectedStat(item.stat)}>?</button>
              </span>
              <strong>{item.score}</strong>
              {rawHaki > 0 && <small className="stat-breakdown">Base {item.baseScore} + Effective Haki {effectiveHaki} (Raw {rawHaki} × {hakiWeight})</small>}
            </div>
          )
        })}
      </div>
      {selectedStat && <StatInfoDialog stat={selectedStat} onClose={() => setSelectedStat(null)} />}
    </>
  )
}
