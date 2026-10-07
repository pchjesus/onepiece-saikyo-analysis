import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat, EvaluationStatus } from '../../domain/evaluation/types'
import { getEffectiveHakiContributionTotal, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import type { HakiStatContribution } from '../../domain/haki/types'

export function EvaluationTrace({
  items, status, evaluationDataVersion, hakiWeight,
}: {
  items: Array<{
    item: { stat: CombatStat; baseScore: number; score: number; rationale: string; evidenceIds: string[]; hakiContributions: HakiStatContribution[] }
    evidence: Array<{ evidence: { id: string; source: { reference: string } } }>
  }>
  status: EvaluationStatus
  evaluationDataVersion: string
  hakiWeight: number
}) {
  return (
    <section className="evaluation-section">
      <div>
        <p className="eyebrow">EVALUATION TRACE</p>
        <h2>평가 근거 연결</h2>
        <p className="section-note">Base, Raw Haki, 모델 Weight, Effective Haki, Final을 분리해 계산 추적성과 Canon Evidence 연결을 함께 확인합니다.</p>
      </div>
      <div className="evaluation-trace-list">
        {items.map(({ item, evidence }) => {
          const rawHaki = getRawHakiContributionTotal(item)
          const effectiveHaki = getEffectiveHakiContributionTotal(item, hakiWeight)
          return (
            <article className="evaluation-trace-card" key={item.stat}>
              <div className="evaluation-trace-header">
                <div>
                  <strong>{COMBAT_STAT_DEFINITIONS[item.stat].label}</strong>
                  <span>Final {item.score}/100 · Base {item.baseScore} · Haki Raw +{rawHaki} · Weight ×{hakiWeight} · Effective +{effectiveHaki} · {status}</span>
                </div>
                <span>{evidence.length}개 근거 · {evaluationDataVersion}</span>
              </div>
              <p>{item.rationale}</p>
              {evidence.length > 0 ? <ul>{evidence.map(({ evidence: record }) => <li key={record.id}>{record.source.reference}</li>)}</ul> : <span className="trace-empty">연결된 근거 없음</span>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
