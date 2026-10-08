import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat, EvaluationStatus, EvidenceReadiness } from '../../domain/evaluation/types'
import { getEffectiveHakiContributionTotal, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import type { HakiStatContribution } from '../../domain/haki/types'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'

export function EvaluationTrace({
  items, status, evaluationDataVersion, hakiWeight,
}: {
  items: Array<{
    item: { stat: CombatStat; baseScore: number; score: number; rationale: string; evidenceIds: string[]; hakiContributions: HakiStatContribution[]; readiness?: EvidenceReadiness }
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
        <p className="section-note">각 스탯의 계산식, 평가 이유, 연결된 Canon Evidence를 확인할 수 있습니다. Haki Weight는 모델 설정값입니다.</p>
      </div>
      <div className="evaluation-trace-list">
        {items.map(({ item, evidence }) => {
          const rawHaki = getRawHakiContributionTotal(item)
          const effectiveHaki = getEffectiveHakiContributionTotal(item, hakiWeight)
          const capped = item.baseScore + effectiveHaki > 100
          return (
            <article className="evaluation-trace-card" key={item.stat}>
              <div className="evaluation-trace-header">
                <strong>{COMBAT_STAT_DEFINITIONS[item.stat].label}</strong>
                <span>{evidence.length}개 근거{item.readiness ? ` · 근거 ${item.readiness}` : ''} · {status} · {evaluationDataVersion}</span>
              </div>
              <p className="evaluation-formula">
                Base <strong>{item.baseScore}</strong> + Haki (<strong>{rawHaki}</strong> × {hakiWeight} = <strong>{effectiveHaki}</strong>) = Final <strong>{item.score}/100</strong>{capped && <span> · 100점 상한 적용</span>}
              </p>
              <p>{normalizeCharacterNamesForDisplay(item.rationale)}</p>
              {evidence.length > 0 ? <ul>{evidence.map(({ evidence: record }) => <li key={record.id}>{normalizeCharacterNamesForDisplay(record.source.reference)}</li>)}</ul> : <span className="trace-empty">연결된 근거 없음</span>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
