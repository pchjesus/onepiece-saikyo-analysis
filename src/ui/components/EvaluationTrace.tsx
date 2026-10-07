import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat, EvaluationStatus } from '../../domain/evaluation/types'
import { getHakiContributionTotal } from '../../domain/evaluation/score'
import type { HakiStatContribution } from '../../domain/haki/types'

export function EvaluationTrace({
  items,
  status,
  evaluationDataVersion,
}: {
  items: Array<{
    item: { stat: CombatStat; baseScore: number; score: number; rationale: string; evidenceIds: string[]; hakiContributions: HakiStatContribution[] }
    evidence: Array<{ evidence: { id: string; source: { reference: string } } }>
  }>
  status: EvaluationStatus
  evaluationDataVersion: string
}) {
  return (
    <section className="evaluation-section">
      <div>
        <p className="eyebrow">EVALUATION TRACE</p>
        <h2>평가 근거 연결</h2>
        <p className="section-note">각 평가 항목이 어떤 근거와 연결되어 있는지 확인합니다. 현재 마르코 평가는 일부 항목부터 실제 평가로 전환하는 중입니다.</p>
      </div>
      <div className="evaluation-trace-list">
        {items.map(({ item, evidence }) => (
          <article className="evaluation-trace-card" key={item.stat}>
            <div className="evaluation-trace-header">
              <div>
                <strong>{COMBAT_STAT_DEFINITIONS[item.stat].label}</strong>
                <span>{item.score}/100 · Base {item.baseScore} · Haki +{getHakiContributionTotal(item)} · {status}</span>
              </div>
              <span>{evidence.length}개 근거 · {evaluationDataVersion}</span>
            </div>
            <p>{item.rationale}</p>
            {evidence.length > 0 ? (
              <ul>
                {evidence.map(({ evidence: record }) => (
                  <li key={record.id}>{record.source.reference}</li>
                ))}
              </ul>
            ) : (
              <span className="trace-empty">연결된 근거 없음</span>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
