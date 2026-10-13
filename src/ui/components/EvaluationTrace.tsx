import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat, EvaluationStatus, EvidenceReadiness } from '../../domain/evaluation/types'
import { getEffectiveHakiContributionTotal, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import type { HakiStatContribution } from '../../domain/haki/types'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'
import type { Evidence } from '../../domain/evidence/types'
import { SourceCitation } from './SourceCitation'

export function EvaluationTrace({
  items, evaluationDataVersion, hakiWeight, onOpenEvidence,
}: {
  items: Array<{
    item: { stat: CombatStat; baseScore: number; score: number; rationale: string; evidenceIds: string[]; hakiContributions: HakiStatContribution[]; readiness?: EvidenceReadiness }
    evidence: Array<{ evidence: Evidence }>
  }>
  status: EvaluationStatus
  evaluationDataVersion: string
  hakiWeight: number
  onOpenEvidence?: (battleId: string) => void
}) {
  return (
    <section className="evaluation-section">
      <div>
        <p className="eyebrow">평가 근거</p>
        <h2>평가 근거 연결</h2>
        <p className="section-note">각 스탯의 점수, 평가 이유와 출처를 확인할 수 있습니다. 패기 가중치는 계산 모델 설정값이며 근거 충분도는 점수에 가산되지 않습니다.</p>
        <details className="evaluation-trace-metadata"><summary>평가 기록 정보 ⓘ</summary><p className="evaluation-trace-version">평가 데이터 · {evaluationDataVersion}</p></details>
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
                <span>연결 근거 {evidence.length}건 · 근거 충분도 {item.readiness ?? '미분류'}</span>
              </div>
              <p className="evaluation-formula">
                기본점수 <strong>{item.baseScore}</strong> + 패기 (<strong>{rawHaki}</strong> × {hakiWeight} = <strong>{effectiveHaki}</strong>) = 최종점수 <strong>{item.score}/100</strong>{capped && <span> · 100점 상한 적용</span>}
              </p>
              <p className="evaluation-trace-rationale"><strong>평가 이유</strong> {normalizeCharacterNamesForDisplay(item.rationale)}</p>
              {evidence.length > 0 ? <details className="trace-evidence-details">
                <summary><span className="trace-expand-label">연결 근거 {evidence.length}건 펼치기</span><span className="trace-collapse-label">연결 근거 {evidence.length}건 접기</span></summary>
                <ul className="trace-evidence-links">{evidence.map(({ evidence: record }) => <li key={record.id}>
                  <SourceCitation sourceType={record.source.type} reference={record.source.reference} description={record.source.description}/>
                  {onOpenEvidence && <button type="button" className="trace-battle-link"
                    onClick={()=>onOpenEvidence(record.battleId)}
                    aria-label={`${COMBAT_STAT_DEFINITIONS[item.stat].label} 근거 전투 기록 열기: ${record.source.reference}`}>전투 기록 보기 ↗</button>}
                </li>)}</ul>
              </details> : <span className="trace-empty">연결된 근거 없음 · 부족한 근거가 낮은 능력을 의미하지는 않습니다.</span>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
