import { getCharacterBattleTimeline } from '../../application/getCharacterBattleTimeline'
import { getCharacterDetail } from '../../application/getCharacterDetail'
import { getCombatPower } from '../../application/getCombatPower'
import { getCharacterEvaluationTrace } from '../../application/getCharacterEvaluationTrace'
import { BattleTimeline } from '../components/BattleTimeline'
import { EvaluationTrace } from '../components/EvaluationTrace'
import { StatList } from '../components/StatList'
import { CombatProfile } from '../components/CombatProfile'

export function CharacterPage({ characterId }: { characterId: string }) {
  const detail = getCharacterDetail(characterId)
  if (!detail) return <section>캐릭터 데이터를 찾을 수 없습니다.</section>

  const result = getCombatPower(characterId)
  const battleTimeline = getCharacterBattleTimeline(characterId)
  const evaluationTrace = getCharacterEvaluationTrace(characterId)

  return (
    <main className="detail">
      <p className="eyebrow">{detail.crew.name}</p>
      <h1>{detail.character.name}</h1>
      <p className="prototype-note">{detail.evaluation.status === 'draft' ? '평가 진행 중 · 현재 8개 스탯 1차 평가값 적용' : 'MVP 구조 검증용 임시 평가 데이터 · 공식 전투력 평가 아님'}</p>
      <CombatProfile profile={detail.character.combatProfile} />
      <section className="power-card">
        <span>Overall Combat Power · 현재 계산값</span>
        <strong>{result.finalScore.toFixed(1)}<small>/100</small></strong>
        <span>{result.calculationModelVersion} · Balanced</span>
      </section>
      <h2>Basic Combat Stats</h2>
      <StatList items={detail.evaluation.items} />
      {evaluationTrace && (
        <EvaluationTrace
          items={evaluationTrace}
          status={detail.evaluation.status}
          evaluationDataVersion={detail.evaluation.evaluationDataVersion}
        />
      )}
      <section className="evidence-section">
        <div>
          <p className="eyebrow">BATTLE & CANON EVIDENCE</p>
          <h2>전투 기록</h2>
          <p className="section-note">시간 순으로 정리된 전투 기록을 선택하면 해당 전투의 상황과 원작 근거가 펼쳐집니다. 근거는 MVP에서 점수를 자동으로 변경하지 않습니다.</p>
        </div>
        <BattleTimeline items={battleTimeline} />
      </section>
    </main>
  )
}
