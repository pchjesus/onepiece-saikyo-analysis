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
import { CharacterIdentity, characterIdentityStyle } from '../components/CharacterIdentity'
import type { CharacterKnownAsKind } from '../../domain/character/types'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'

const knownAsLabel: Record<CharacterKnownAsKind, string> = {
  alias: '통칭',
  epithet: '이명',
  title: '칭호',
}

export function CharacterPage({ characterId, groupId, onSelectStat, onSelectOverall }: {
  characterId: string
  groupId: string
  onSelectStat: (stat: CombatStat) => void
  onSelectOverall: () => void
}) {
  const initialDetail = getCharacterDetail(characterId, groupId)
  const [activeDetail, setActiveDetail] = useState<'evaluation' | 'battle'>('evaluation')
  const [selectedStateId, setSelectedStateId] = useState(initialDetail?.evaluation.subjectState?.id ?? '')

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
          {detail.character.description && (
            <p className="character-description">
              {normalizeCharacterNamesForDisplay(detail.character.description)}
            </p>
          )}
          {hasMultipleEvaluations && (
            <div className="evaluation-state-switcher" role="group" aria-label="평가 시점 선택">
              {detail.evaluations.map((evaluation) => {
                const stateId = evaluation.subjectState?.id ?? evaluation.id
                const selected = stateId === (activeStateId ?? detail.evaluation.id)
                return (
                  <button key={evaluation.id} type="button" className={selected ? 'selected' : ''}
                    aria-pressed={selected}
                    onClick={() => setSelectedStateId(evaluation.subjectState?.id ?? '')}>
                    {evaluation.subjectState?.label ?? '기본'}
                  </button>
                )
              })}
            </div>
          )}
          {detail.evaluation.subjectState && (
            <p className="evaluation-subject-state">
              <strong>평가 시점 · {detail.evaluation.subjectState.label}</strong>
              {detail.evaluation.subjectState.note && (
                <span>{normalizeCharacterNamesForDisplay(detail.evaluation.subjectState.note)}</span>
              )}
            </p>
          )}
        </div>
        <p className="prototype-note">{detail.evaluation.status === 'draft'
          ? `평가 진행 중 · 핵심 스탯 7개 · 초안 · ${detail.evaluation.evaluationDataVersion}`
          : 'MVP 구조 검증용 임시 평가 데이터 · 공식 전투력 평가 아님'}</p>
      </div>

      <div className="overview-layout">
        <section className="score-overview" aria-label="종합 전투력과 스탯">
          <button className="power-card power-card-button" type="button" onClick={onSelectOverall} aria-label="종합 전투력 전체 캐릭터 순위 보기">
            <span>종합 전투력 · 현재 계산값 <span aria-hidden="true">↗</span></span>
            <strong>{result.finalScore.toFixed(1)}<small>/100</small></strong>
            <span>{result.calculationModelVersion} · 균형형 · 핵심 스탯 7개 · 패기 가중치 ×{result.hakiWeight}</span>
          </button>
          <div className="stat-heading">
            <h2>핵심 전투 스탯</h2>
            <span>점수를 누르면 전체 캐릭터 비교 · 정렬 전환 가능</span>
          </div>
          <StatList items={detail.evaluation.items} hakiWeight={result.hakiWeight} onSelectStat={onSelectStat} />
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
              ? <EvaluationTrace items={evaluationTrace} status={detail.evaluation.status} evaluationDataVersion={detail.evaluation.evaluationDataVersion} hakiWeight={result.hakiWeight} />
              : <p className="empty-note">평가 근거가 없습니다.</p>
          ) : (
            <section className="evidence-section">
              <p className="eyebrow">전투 기록과 원작 근거</p>
              <h2>전투 기록</h2>
              <p className="section-note">
                전투를 선택하면 상황과 원작 근거가 펼쳐집니다. 전투 기록은 캐릭터 전체 이력이며, 현재 선택한 평가 시점에 실제 사용된 근거는 평가 근거 탭에서 확인합니다.
              </p>
              <BattleTimeline items={battleTimeline} />
            </section>
          )}
        </div>
      </section>
    </main>
  )
}
