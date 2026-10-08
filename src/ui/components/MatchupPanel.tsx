import type { CharacterMatchupView } from '../../application/getCharacterMatchups'
import type { MatchupAdvantage, MatchupConfidence, MatchupFactor, MatchupPhase } from '../../domain/matchup/types'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'

const factorLabels: Record<MatchupFactor, string> = {
  'attack-access': '공격 기회', 'damage-validity': '유효 피해', 'defensive-response': '방어 대응',
  'mobility-control': '기동·거리 통제', 'haki-interaction': '패기 상호작용',
  'resource-endurance': '자원·지구력', 'recovery-regeneration': '회복·재생',
  'special-win-condition': '특수 승리조건', environment: '환경',
}
const phaseLabels: Record<MatchupPhase, string> = { opening: '초반', sustained: '중기 공방', long: '장기전', all: '전 구간' }
const confidenceLabels: Record<MatchupConfidence, string> = { confirmed: '확인', supported: '근거 있음', unclear: '불명확' }

function advantageLabel(advantage: MatchupAdvantage, perspective: CharacterMatchupView['perspective']) {
  if (advantage === 'none') return '뚜렷한 우위 없음'
  if (advantage === 'conditional') return '조건부'
  if (advantage === 'unknown') return '불명'
  return advantage === perspective ? '이 캐릭터 우위' : '상대 우위'
}

export function MatchupPanel({ items }: { items: CharacterMatchupView[] }) {
  if (items.length === 0) return <section className="matchup-section"><p className="empty-note">현재 선택한 평가 시점에 연결된 매치업 분석이 없습니다.</p></section>
  return (
    <section className="matchup-section">
      <p className="eyebrow">EVIDENCE-AWARE MATCHUP v0.1</p>
      <h2>매치업 분석</h2>
      <p className="section-note">승률이나 고정 상성 보너스를 계산하지 않습니다. 원작에서 확인된 상호작용과 조건·불확실성만 비교합니다.</p>
      <div className="matchup-list">
        {items.map(({ matchup, opponentName, perspective }) => (
          <article className="matchup-card" key={matchup.id}>
            <div className="matchup-header">
              <div><small>상대</small><h3>{opponentName}</h3></div>
              <span>중립 전장 · 사전 준비 없음 · 정상 상태 · 외부 개입 없음</span>
            </div>
            <div className="matchup-factors">
              {matchup.factors.map((factor) => (
                <section className="matchup-factor" key={factor.id}>
                  <div className="matchup-factor-meta">
                    <strong>{factorLabels[factor.factor]} · {phaseLabels[factor.phase]}</strong>
                    <span>{advantageLabel(factor.advantage, perspective)} · {confidenceLabels[factor.confidence]}</span>
                  </div>
                  <p>{normalizeCharacterNamesForDisplay(factor.summary)}</p>
                  {factor.conditions && <small><strong>조건</strong> · {normalizeCharacterNamesForDisplay(factor.conditions)}</small>}
                  <small><strong>불확실성</strong> · {normalizeCharacterNamesForDisplay(factor.uncertainty)}</small>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
