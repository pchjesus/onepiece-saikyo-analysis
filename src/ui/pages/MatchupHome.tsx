import { useMemo, useState } from 'react'
import { getMatchupHubEntries } from '../../application/getMatchupHub'
import type { MatchupAdvantage, MatchupConfidence, MatchupFactor, MatchupPhase } from '../../domain/matchup/types'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'
import { MatchupRadarChart } from '../components/MatchupRadarChart'

const factorLabels: Record<MatchupFactor, string> = {
  'attack-access': '공격 기회', 'damage-validity': '유효 피해', 'defensive-response': '방어 대응',
  'mobility-control': '기동·거리 통제', 'haki-interaction': '패기 상호작용',
  'resource-endurance': '자원·지구력', 'recovery-regeneration': '회복·재생',
  'special-win-condition': '특수 승리조건', environment: '환경',
}
const phaseLabels: Record<MatchupPhase, string> = { opening: '초반', sustained: '중기 공방', long: '장기전', all: '전 구간' }
const confidenceLabels: Record<MatchupConfidence, string> = { confirmed: '확인', supported: '근거 있음', unclear: '불명확' }

function sideLabel(advantage: MatchupAdvantage, aName: string, bName: string) {
  if (advantage === 'character-a') return `${aName} 쪽`
  if (advantage === 'character-b') return `${bName} 쪽`
  if (advantage === 'conditional') return '조건부'
  if (advantage === 'none') return '뚜렷한 우위 없음'
  return '불명'
}

export function MatchupHome() {
  const entries = useMemo(() => getMatchupHubEntries(), [])
  const preferred = entries.find(({ matchup }) => matchup.id === 'matchup-mihawk-shanks') ?? entries[0]
  const [selectedId, setSelectedId] = useState(preferred?.matchup.id ?? '')
  const active = entries.find(({ matchup }) => matchup.id === selectedId) ?? preferred

  if (!active) return <main className="matchup-home"><p>표시할 매치업 데이터가 없습니다.</p></main>

  const { matchup, characterA, characterB } = active

  return (
    <main className="matchup-home">
      <section className="matchup-arena-hero">
        <div>
          <p className="eyebrow">MATCHUP ARENA</p>
          <h2>둘이 붙으면, 어떤 장면이 승부를 가를까?</h2>
          <p>스탯은 빠르게 비교하고, 아래에서 원작 근거와 조건을 확인합니다. 승률 숫자 대신 실제로 확인된 상호작용만 보여줍니다.</p>
        </div>
        <div className="arena-rule-chip">Neutral · No prep · 1v1</div>
      </section>

      <div className="matchup-picker" role="list" aria-label="매치업 선택">
        {entries.map((entry) => (
          <button type="button" role="listitem" key={entry.matchup.id}
            className={entry.matchup.id === matchup.id ? 'selected' : ''}
            onClick={() => setSelectedId(entry.matchup.id)}>
            <span>{entry.characterA.name}</span><strong>VS</strong><span>{entry.characterB.name}</span>
          </button>
        ))}
      </div>

      <section className="matchup-scoreboard" aria-label="선택한 매치업 요약">
        <article className="fighter-card fighter-a">
          <small>{characterA.stateLabel ? `평가 시점 · ${characterA.stateLabel}` : 'FIGHTER A'}</small>
          <h3>{characterA.name}</h3>
          <strong>{characterA.overall.toFixed(1)}</strong>
          <span>Overall</span>
        </article>
        <div className="versus-lockup"><span>VS</span><small>판정은 근거로</small></div>
        <article className="fighter-card fighter-b">
          <small>{characterB.stateLabel ? `평가 시점 · ${characterB.stateLabel}` : 'FIGHTER B'}</small>
          <h3>{characterB.name}</h3>
          <strong>{characterB.overall.toFixed(1)}</strong>
          <span>Overall</span>
        </article>
      </section>

      <section className="matchup-visual-grid">
        <MatchupRadarChart characterA={characterA} characterB={characterB} />
        <article className="tale-card">
          <p className="eyebrow">TALE OF THE TAPE</p>
          <h3>7 Core Stats</h3>
          <div className="tale-list">
            {characterA.stats.map((aStat, index) => {
              const bStat = characterB.stats[index]
              return (
                <div className="tale-row" key={aStat.stat}>
                  <strong>{aStat.score}</strong>
                  <div>
                    <span>{aStat.label}</span>
                    <div className="tale-bars">
                      <i className="bar-a" style={{ width: `${aStat.score}%` }} />
                      <i className="bar-b" style={{ width: `${bStat.score}%` }} />
                    </div>
                  </div>
                  <strong>{bStat.score}</strong>
                </div>
              )
            })}
          </div>
          <p className="arena-caution">Overall과 개별 스탯 차이는 승률이 아닙니다. 상성·조건·실전 상호작용은 아래 근거 카드에서 따로 봅니다.</p>
        </article>
      </section>

      <section className="arena-analysis">
        <div className="arena-analysis-heading">
          <div><p className="eyebrow">MATCHUP FACTORS</p><h3>승부 포인트</h3></div>
          <span>{matchup.factors.length} factors</span>
        </div>
        <div className="arena-factor-grid">
          {matchup.factors.map((factor) => (
            <article className="arena-factor-card" key={factor.id}>
              <div className="arena-factor-meta">
                <strong>{factorLabels[factor.factor]} · {phaseLabels[factor.phase]}</strong>
                <span>{sideLabel(factor.advantage, characterA.name, characterB.name)} · {confidenceLabels[factor.confidence]}</span>
              </div>
              <p>{normalizeCharacterNamesForDisplay(factor.summary)}</p>
              {factor.conditions && <small><b>조건</b> · {normalizeCharacterNamesForDisplay(factor.conditions)}</small>}
              <small><b>불확실성</b> · {normalizeCharacterNamesForDisplay(factor.uncertainty)}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
