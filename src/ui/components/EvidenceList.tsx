import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'

const structureLabels: Record<Battle['combatStructure'], string> = {
  '1v1': '1대1',
  'multiple-vs-one': '다수 대 1',
  'one-vs-multiple': '1 대 다수',
  'multiple-vs-multiple': '다수 대 다수',
}

const intentLabels: Record<Battle['combatIntent'], string> = {
  normal: '일반 교전',
  serious: '진지한 교전',
  'full-power': '전력 발휘',
  'lethal-intent': '살상 의도',
  unknown: '불명',
}

const resultLabels: Record<Battle['result'], string> = {
  victory: '승리',
  defeat: '패배',
  draw: '무승부',
  interrupted: '중단',
  unknown: 'Unknown',
}

const evidenceStrengthLabels = { strong: '높음', moderate: '중간', weak: '제한적' } as const

const contributionRoleLabels = { primary: '주요 근거', secondary: '보조 근거', context: '상황 참고' } as const

type EvidenceRecord = { evidence: Evidence }

export function EvidenceList({
  records,
  battle,
}: {
  records: EvidenceRecord[]
  battle?: Battle
}) {
  if (records.length === 0) {
    return <p className="empty-note">현재 연결된 원작 근거가 없습니다.</p>
  }

  return (
    <div className="evidence-list">
      {battle && (
        <dl className="battle-context">
          <div>
            <dt>전투 구조</dt>
            <dd>{structureLabels[battle.combatStructure]}</dd>
          </div>
          <div>
            <dt>전투 목적</dt>
            <dd>{normalizeCharacterNamesForDisplay(battle.combatPurpose)}</dd>
          </div>
          <div>
            <dt>전투 의도</dt>
            <dd>{intentLabels[battle.combatIntent]}</dd>
          </div>
          <div>
            <dt>환경</dt>
            <dd>{normalizeCharacterNamesForDisplay(battle.environment)}</dd>
          </div>
          <div>
            <dt>제한 조건</dt>
            <dd>{normalizeCharacterNamesForDisplay(battle.restrictions)}</dd>
          </div>
          <div>
            <dt>외부 요인</dt>
            <dd>{normalizeCharacterNamesForDisplay(battle.externalFactors)}</dd>
          </div>
          <div>
            <dt>전투 결과</dt>
            <dd>{resultLabels[battle.result]}</dd>
          </div>
        </dl>
      )}

      {records.map(({ evidence }) => (
        <article className="evidence-card" key={evidence.id}>
          <div className="evidence-meta">
            <span>{normalizeCharacterNamesForDisplay(evidence.source.reference)}</span>
            <span>{evidenceStrengthLabels[evidence.evidenceStrength]}</span>
          </div>
          <h3>{battle ? normalizeCharacterNamesForDisplay(battle.title) : '연결된 전투 정보 없음'}</h3>
          {evidence.source.description && <p className="evidence-description">{normalizeCharacterNamesForDisplay(evidence.source.description)}</p>}
          <dl>
            <div>
              <dt>원작에서 확인되는 사실</dt>
              <dd>{normalizeCharacterNamesForDisplay(evidence.fact)}</dd>
            </div>
            <div>
              <dt>해석</dt>
              <dd>{normalizeCharacterNamesForDisplay(evidence.interpretation)}</dd>
            </div>
            <div>
              <dt>평가 영향</dt>
              <dd>{normalizeCharacterNamesForDisplay(evidence.evaluationImpact)}</dd>
            </div>
            <div>
              <dt>불확실성</dt>
              <dd>{normalizeCharacterNamesForDisplay(evidence.uncertainty)}</dd>
            </div>
          </dl>
          <div className="evidence-tags">
            {evidence.statContributions.map((contribution) => (
              <span key={`${contribution.stat}-${contribution.role}`} title={normalizeCharacterNamesForDisplay(contribution.note)}>
                {COMBAT_STAT_DEFINITIONS[contribution.stat].label} · {contributionRoleLabels[contribution.role]}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
