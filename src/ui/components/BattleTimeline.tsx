import { useState } from 'react'
import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import { EvidenceList } from './EvidenceList'

type TimelineItem = {
  battle: Battle
  evidence: Evidence[]
}

const structureLabels: Record<Battle['combatStructure'], string> = {
  '1v1': '1 vs 1',
  'multiple-vs-one': 'Multiple vs 1',
  'one-vs-multiple': '1 vs Multiple',
  'multiple-vs-multiple': 'Multiple vs Multiple',
}

export function BattleTimeline({ items }: { items: TimelineItem[] }) {
  const [openBattleId, setOpenBattleId] = useState<string | null>(items[0]?.battle.id ?? null)

  if (items.length === 0) {
    return <p className="empty-note">현재 연결된 전투 기록이 없습니다.</p>
  }

  return (
    <div className="battle-timeline">
      {items.map(({ battle, evidence }, index) => {
        const isOpen = openBattleId === battle.id

        return (
          <article className={`battle-item ${isOpen ? 'open' : ''}`} key={battle.id}>
            <button
              className="battle-summary"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenBattleId(isOpen ? null : battle.id)}
            >
              <span className="battle-index">{index + 1}</span>
              <span className="battle-summary-main">
                <strong>{battle.title}</strong>
                <span>{structureLabels[battle.combatStructure]} · 근거 {evidence.length}개</span>
              </span>
              <span className="battle-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
              <div className="battle-detail">
                <EvidenceList records={evidence.map((item) => ({ evidence: item }))} battle={battle} />
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
