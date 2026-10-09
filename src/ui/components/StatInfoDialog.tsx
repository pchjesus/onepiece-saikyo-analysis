import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat } from '../../domain/evaluation/types'

export function StatInfoDialog({ stat, onClose }: { stat: CombatStat; onClose: () => void }) {
  const definition = COMBAT_STAT_DEFINITIONS[stat]

  return (
    <div className="stat-info-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="stat-info-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stat-info-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="stat-info-header">
          <div>
            <p className="eyebrow">스탯 정의</p>
            <h3 id="stat-info-title">{definition.label}</h3>
          </div>
          <button className="stat-info-close" type="button" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>
        <p className="stat-info-description">{definition.description}</p>
        <dl className="stat-info-details">
          <div>
            <dt>평가에 포함</dt>
            <dd>{definition.includes}</dd>
          </div>
          <div>
            <dt>별도 평가</dt>
            <dd>{definition.excludes}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
