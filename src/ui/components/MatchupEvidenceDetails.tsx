import type { MatchupFactorAssessment } from '../../domain/matchup/types'
import { getMatchupEvidenceTrace } from '../../application/getMatchupEvidenceTrace'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'

const provenanceLabels = {
  canon: '원작 인덱스',
  supplementary: '보조자료',
  community: '커뮤니티',
} as const

const structureLabels: Record<string, string> = {
  '1v1': '1대1',
  'multiple-vs-one': '다수 대 1',
  'one-vs-multiple': '1대 다수',
  'multiple-vs-multiple': '다수 대 다수',
}

/** Factor conclusions stay visible; the original facts and battle context are optional detail. */
export function MatchupEvidenceDetails({ factor }: { factor: MatchupFactorAssessment }) {
  const traces = getMatchupEvidenceTrace(factor)
  const canonCount = traces.filter(trace => trace.sourceType === 'canon').length
  const supplementalCount = traces.filter(trace => trace.sourceType === 'supplementary').length
  const missingCount = traces.filter(trace => trace.status !== 'linked').length
  if (traces.length === 0) return (
    <p className="arena-evidence-empty">등록된 연결 Evidence가 없습니다. 이 요인의 출처 확인이 필요합니다.</p>
  )

  return (
    <div className="arena-evidence-provenance">
      <p className="arena-evidence-count">
        연결 근거 {traces.length}건
        {canonCount > 0 ? ` · 원작 인덱스 ${canonCount}` : ''}
        {supplementalCount > 0 ? ` · 보조자료 ${supplementalCount}` : ''}
        {missingCount > 0 ? ` · 연결 확인 필요 ${missingCount}` : ''}
      </p>
      <details className="arena-evidence-details">
        <summary>근거 사실과 당시 전투 조건 보기</summary>
        <p className="arena-evidence-disclaimer">원작 인덱스는 등록된 출처 분류이며, 해당 원작 컷을 이번 분석에서 독립적으로 재확인했다는 뜻은 아닙니다. 아래 조건은 분석의 기본 가정이 아닌 기록된 실제 전투 맥락입니다.</p>
        <ol>
          {traces.map(trace => (
            <li key={trace.evidenceId}>
              {trace.status === 'evidence-missing' ? (
                <p className="arena-evidence-error">Evidence 연결을 찾을 수 없습니다: <code>{trace.evidenceId}</code></p>
              ) : (
                <>
                  <strong>{trace.sourceType ? provenanceLabels[trace.sourceType] : '출처 미분류'} · {trace.reference}</strong>
                  {trace.fact && <p><b>기록된 사실</b> · {normalizeCharacterNamesForDisplay(trace.fact)}</p>}
                  {trace.battleTitle && (
                    <p className="arena-evidence-battle">
                      <b>전투</b> · {normalizeCharacterNamesForDisplay(trace.battleTitle)}
                      {trace.battleStructure ? ` · ${structureLabels[trace.battleStructure] ?? trace.battleStructure}` : ''}
                    </p>
                  )}
                  {trace.combatPurpose && <p><b>목적</b> · {normalizeCharacterNamesForDisplay(trace.combatPurpose)}</p>}
                  {trace.environment && <p><b>환경</b> · {normalizeCharacterNamesForDisplay(trace.environment)}</p>}
                  {trace.restrictions && <p><b>제약</b> · {normalizeCharacterNamesForDisplay(trace.restrictions)}</p>}
                  {trace.externalFactors && <p><b>외부 개입</b> · {normalizeCharacterNamesForDisplay(trace.externalFactors)}</p>}
                  {trace.uncertainty && <p><b>Evidence 한계</b> · {normalizeCharacterNamesForDisplay(trace.uncertainty)}</p>}
                  {trace.status === 'battle-missing' && <p className="arena-evidence-error">연결된 전투 기록을 찾을 수 없습니다.</p>}
                </>
              )}
            </li>
          ))}
        </ol>
      </details>
    </div>
  )
}
