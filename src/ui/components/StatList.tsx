import { useState } from 'react'
import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat, EvaluationItem } from '../../domain/evaluation/types'
import { getHakiContributionTotal } from '../../domain/evaluation/score'
import { StatInfoDialog } from './StatInfoDialog'

export function StatList({ items }: { items: EvaluationItem[] }) {
  const [selectedStat, setSelectedStat] = useState<CombatStat | null>(null)

  return (
    <>
      <div className="stat-grid">
        {items.map((item) => {
          const definition = COMBAT_STAT_DEFINITIONS[item.stat]
          return (
            <div className="stat-item" key={item.stat}>
              <span className="stat-label">
                {definition.label}
                <button
                  className="stat-info-button"
                  type="button"
                  aria-label={`${definition.label} 설명 보기`}
                  onClick={() => setSelectedStat(item.stat)}
                >
                  ?
                </button>
              </span>
              <strong>{item.score}</strong>
              {getHakiContributionTotal(item) > 0 && (
                <small className="stat-breakdown">Base {item.baseScore} + Haki {getHakiContributionTotal(item)}</small>
              )}
            </div>
          )
        })}
      </div>
      {selectedStat && <StatInfoDialog stat={selectedStat} onClose={() => setSelectedStat(null)} />}
    </>
  )
}
