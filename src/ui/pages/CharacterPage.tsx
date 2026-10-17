import { useState } from 'react'
import type { CombatStat } from '../../domain/evaluation/types'
import { getCharacterBattleTimeline } from '../../application/getCharacterBattleTimeline'
import { getCharacterDetail } from '../../application/getCharacterDetail'
import { getCombatPower } from '../../application/getCombatPower'
import { getCharacterEvaluationTrace } from '../../application/getCharacterEvaluationTrace'
import { BattleTimeline } from '../components/BattleTimeline'
import { EvaluationTrace } from '../components/EvaluationTrace'
import { StatList } from '../components/StatList'
import { CombatProfile } from '../components/CombatProfile'
import { EvidenceReadinessHelp } from '../components/EvidenceReadinessHelp'
import { CharacterIdentity, characterIdentityStyle, getCharacterAccent } from '../components/CharacterIdentity'
import type { CharacterKnownAsKind } from '../../domain/character/types'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'
import { CharacterPortrait } from '../components/CharacterPortrait'
import { CharacterQuote } from '../components/CharacterQuote'

const knownAsLabel: Record<CharacterKnownAsKind, string> = {
  alias: '통칭',
  epithet: '이명',
  title: '칭호',
}

export function CharacterPage({ characterId, groupId, selectedStateId, onStateChange, onSelectStat, onCompareStat, onSelectOverall }: {
  characterId: string
  groupId: string
  selectedStateId?: string
  onStateChange?: (stateId: string) => void
  onSelectStat: (stat: CombatStat) => void
  onCompareStat: (stat: CombatStat, stateId?: string) => void
  onSelectOverall: () => void
}) {
  const initialDetail = getCharacterDetail(characterId, groupId)
  const [activeDetail, setActiveDetail] = useState<'evaluation' | 'battle'>('evaluation')
  const [focusedBattleId,setFocusedBattleId]=useState<string|null>(null)

  if (!initialDetail) return <section>캐릭터 데이터를 찾을 수 없습니다.</section>

  const detail = getCharacterDetail(characterId, groupId, selectedStateId || undefined) ?? initialDetail
  const activeStateId = detail.evaluation.subjectState?.id
  const result = getCombatPower(characterId, 'balanced', activeStateId)
  const battleTimeline = getCharacterBattleTimeline(characterId)
  const evaluationTrace = getCharacterEvaluationTrace(characterId, activeStateId)
  const hasMultipleEvaluations = detail.evaluations.length > 1
  const showPastMembership = (detail.membership.status === 'former' || detail.membership.status === 'historical')
    && !(characterId === 'newgate' && detail.group.id === 'whitebeard-pirates')

  return (
    <main className="detail">
      <div className="detail-heading" style={characterIdentityStyle(detail.group.id, characterId)}>
        <div className="detail-heading-profile">
          <CharacterPortrait characterId={characterId} groupId={detail.group.id} name={detail.character.name} size="large"/>
          <div>
          <CharacterIdentity group={detail.group} characterId={characterId} showPastMembership={showPastMembership}/>
          <h1>{detail.character.name}</h1>
          {detail.character.knownAs.length > 0 && (
            <div className="character-known-as" aria-label="공식 이명 및 칭호">
              {detail.character.knownAs.map((entry) => (
                <span key={`${entry.kind}:${entry.name}`}>
                  <small>{knownAsLabel[entry.kind]}</small>{entry.name}
                </span>
              ))}
            </div>
          )}
          {hasMultipleEvaluations && (
            <div className="evaluation-state-switcher" role="group" aria-label="평가 시점 선택">
              {detail.evaluations.map((evaluation) => {
                const stateId = evaluation.subjectState?.id ?? evaluation.id
                const selected = stateId === (activeStateId ?? detail.evaluation.id)
                return (
                  <button key={evaluation.id} type="button" className={selected ? 'selected' : ''}
                    aria-pressed={selected}
                    onClick={() => onStateChange?.(evaluation.subjectState?.id ?? '')}>
                    {evaluation.subjectState?.label ?? '기본'}
                  </button>
                )
              })}
            </div>
          )}
          {detail.evaluation.subjectState && (
            <details className="evaluation-subject-state">
              <summary>평가 시점 · {detail.evaluation.subjectState.label} <span aria-hidden="true">ⓘ</span></summary>
              <div className="evaluation-state-explanation">
                {detail.evaluation.subjectState.note && (
                  <p>{normalizeCharacterNamesForDisplay(detail.evaluation.subjectState.note)}</p>
                )}
                <small>평가 데이터 · {detail.evaluation.evaluationDataVersion}</small>
              </div>
            </details>
          )}
          </div>
        </div>
        <div className="overall-heading-block" aria-label="현재 종합 전투력">
          <button className="power-card power-card-button power-card-heading" type="button" onClick={onSelectOverall}
            aria-label="종합 전투력 전체 캐릭터 순위 보기">
            <span className="overall-heading-label">종합 전투력 <span aria-hidden="true">↗</span></span>
            <strong>{result.finalScore.toFixed(1)}<small>/100</small></strong>
            <span className="overall-heading-meta">균형형 · 7축 평균</span>
          </button>
          <div className="score-interpretation">
            <details className="score-interpretation-help">
              <summary aria-label="종합점수 계산 및 해석 설명 보기">?</summary>
              <p className="section-note" data-testid="overall-interpretation-note">
                종합점수는 7개 스탯의 동일 가중 평균이야. 캐릭터의 강점·약점 분포, 상대 능력과 상성, 전투 조건까지 검증한 승률이나 확정 서열은 아니야.
                {' '}계산 모델 {result.calculationModelVersion} · 패기 가중치 ×{result.hakiWeight}.
              </p>
            </details>
          </div>
        </div>
        <CharacterQuote characterId={characterId} />
      </div>

      <div className="overview-layout">
        <section className="score-overview" aria-label="종합 전투력과 스탯">
          <div className="stat-heading">
            <div className="stat-heading-title"><h2>핵심 전투 스탯</h2><EvidenceReadinessHelp /></div>
          </div>
          <StatList items={detail.evaluation.items} hakiWeight={result.hakiWeight} accent={getCharacterAccent(detail.group.id, characterId)} onSelectStat={onSelectStat}
            onCompareStat={stat=>onCompareStat(stat,activeStateId)} />
        </section>
        <CombatProfile profile={detail.character.combatProfile} />
      </div>

      <section className="detail-insights">
        <div className="detail-tabs" role="tablist" aria-label="상세 정보 보기">
          <button id="evaluation-tab" type="button" role="tab" aria-selected={activeDetail === 'evaluation'}
            aria-controls="detail-content" className={activeDetail === 'evaluation' ? 'selected' : ''}
            onClick={() => setActiveDetail('evaluation')}>평가 근거 · 계산식</button>
          <button id="battle-tab" type="button" role="tab" aria-selected={activeDetail === 'battle'}
            aria-controls="detail-content" className={activeDetail === 'battle' ? 'selected' : ''}
            onClick={() => setActiveDetail('battle')}>전투 기록 · 원작 근거</button>
        </div>
        <div id="detail-content" className="detail-tab-content" role="tabpanel"
          aria-labelledby={activeDetail === 'evaluation' ? 'evaluation-tab' : 'battle-tab'}>
          {activeDetail === 'evaluation' ? (
            evaluationTrace
              ? <EvaluationTrace key={detail.evaluation.id} items={evaluationTrace} status={detail.evaluation.status} evaluationDataVersion={detail.evaluation.evaluationDataVersion} hakiWeight={result.hakiWeight}
                onOpenEvidence={battleId=>{setFocusedBattleId(battleId);setActiveDetail('battle')}} />
              : <p className="empty-note">평가 근거가 없습니다.</p>
          ) : (
            <section className="evidence-section">
              <p className="eyebrow">전투 기록과 원작 근거</p>
              <h2>전투 기록</h2>
              <p className="section-note">
                전투를 선택하면 상황과 원작 근거가 펼쳐집니다. 전투 기록은 캐릭터 전체 이력이며, 현재 선택한 평가 시점에 실제 사용된 근거는 평가 근거 탭에서 확인합니다.
              </p>
              <BattleTimeline items={battleTimeline} initialBattleId={focusedBattleId} />
            </section>
          )}
        </div>
      </section>
    </main>
  )
}
