import { useMemo, useState } from 'react'
import {
  getMatchupBuilderView,
  getMatchupHubEntries,
  getMatchupRoster,
  type MatchupHubFighter,
  type MatchupRosterOption,
  type PerspectiveFactor,
} from '../../application/getMatchupHub'
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
const perspectiveLabels: Record<PerspectiveFactor['perspective'], string> = {
  favorable: '유리 포인트',
  risk: '주의 포인트',
  neutral: '호각/중립',
  conditional: '조건부',
  unknown: '미확인',
}

function sideLabel(advantage: MatchupAdvantage, aName: string, bName: string) {
  if (advantage === 'character-a') return `${aName} 쪽`
  if (advantage === 'character-b') return `${bName} 쪽`
  if (advantage === 'conditional') return '조건부'
  if (advantage === 'none') return '뚜렷한 우위 없음'
  return '불명'
}

function defaultState(roster: MatchupRosterOption[], characterId: string) {
  return roster.find((entry) => entry.characterId === characterId)?.defaultStateId
}

function FighterSelect({
  side,
  roster,
  characterId,
  stateId,
  opponentId,
  onCharacter,
  onState,
}: {
  side: 'left' | 'right'
  roster: MatchupRosterOption[]
  characterId: string
  stateId?: string
  opponentId: string
  onCharacter: (id: string) => void
  onState: (id?: string) => void
}) {
  const selected = roster.find((entry) => entry.characterId === characterId)
  return (
    <section className={`arena-selector arena-selector-${side}`}>
      <span className="corner-label">{side === 'left' ? 'RED CORNER' : 'BLUE CORNER'}</span>
      <select aria-label={side === 'left' ? '왼쪽 캐릭터 선택' : '오른쪽 캐릭터 선택'}
        value={characterId} onChange={(event) => onCharacter(event.target.value)}>
        {roster.map((entry) => (
          <option key={entry.characterId} value={entry.characterId} disabled={entry.characterId === opponentId}>
            {entry.name} · {entry.groupName}
          </option>
        ))}
      </select>
      {selected && selected.states.length > 1 && (
        <select className="state-select" aria-label={side === 'left' ? '왼쪽 평가 시점 선택' : '오른쪽 평가 시점 선택'}
          value={stateId ?? ''} onChange={(event) => onState(event.target.value || undefined)}>
          {selected.states.map((state) => (
            <option key={state.id ?? 'default'} value={state.id ?? ''}>{state.label}</option>
          ))}
        </select>
      )}
    </section>
  )
}

function CornerPanel({ fighter, factors, statEdges, side }: {
  fighter: MatchupHubFighter
  factors: PerspectiveFactor[]
  statEdges: MatchupHubFighter['stats']
  side: 'left' | 'right'
}) {
  const focusedFactors = factors.filter(({ perspective }) => perspective === 'favorable' || perspective === 'risk' || perspective === 'conditional')
  return (
    <article className={`corner-panel corner-panel-${side}`}>
      <header>
        <div>
          <small>{side === 'left' ? 'RED CORNER' : 'BLUE CORNER'} · {fighter.groupName}</small>
          <h3>{fighter.name}</h3>
          {fighter.stateLabel && <span>평가 시점 · {fighter.stateLabel}</span>}
        </div>
        <strong>{fighter.overall.toFixed(1)}<small> OVR</small></strong>
      </header>

      <div className="corner-section">
        <h4>수치상 앞서는 축</h4>
        {statEdges.length > 0 ? (
          <div className="corner-stat-chips">
            {statEdges.slice(0, 3).map((stat) => <span key={stat.stat}>{stat.label} {stat.score}</span>)}
          </div>
        ) : <p className="corner-muted">7 Core Stat에서 상대보다 높은 축이 없습니다.</p>}
      </div>

      <div className="corner-section">
        <h4>전투 스타일</h4>
        <div className="corner-style-list">
          {fighter.combatStyles.slice(0, 4).map((style) => <span key={style}>{style}</span>)}
        </div>
        {(fighter.specialTraits.length > 0 || fighter.confirmedHaki.length > 0) && (
          <div className="corner-toolkit">
            {fighter.specialTraits.slice(0, 2).map((trait) => <span key={trait}>{trait}</span>)}
            {fighter.confirmedHaki.map((haki) => <span key={haki}>{haki}</span>)}
          </div>
        )}
      </div>

      <div className="corner-section corner-perspective">
        <h4>이 캐릭터 입장의 매치업</h4>
        {focusedFactors.length > 0 ? focusedFactors.map((factor) => (
          <div key={factor.id} className={`perspective-item ${factor.perspective}`}>
            <strong>{perspectiveLabels[factor.perspective]} · {factorLabels[factor.factor]}</strong>
            <p>{normalizeCharacterNamesForDisplay(factor.summary)}</p>
          </div>
        )) : (
          <p className="corner-muted">이 조합의 직접 Matchup Evidence가 아직 없습니다. 수치상 비교는 참고만 하고 상성 판정은 보류합니다.</p>
        )}
      </div>
    </article>
  )
}

export function MatchupHome() {
  const roster = useMemo(() => getMatchupRoster(), [])
  const featured = useMemo(() => getMatchupHubEntries(), [])
  const initialLeft = roster.some(({ characterId }) => characterId === 'mihawk') ? 'mihawk' : roster[0]?.characterId ?? ''
  const initialRight = roster.some(({ characterId }) => characterId === 'shanks') ? 'shanks' : roster.find(({ characterId }) => characterId !== initialLeft)?.characterId ?? ''
  const [leftId, setLeftId] = useState(initialLeft)
  const [rightId, setRightId] = useState(initialRight)
  const [leftStateId, setLeftStateId] = useState<string | undefined>(() => defaultState(roster, initialLeft))
  const [rightStateId, setRightStateId] = useState<string | undefined>(() => defaultState(roster, initialRight))

  const view = getMatchupBuilderView(leftId, rightId, leftStateId, rightStateId)

  const chooseLeft = (id: string) => {
    setLeftId(id)
    setLeftStateId(defaultState(roster, id))
  }
  const chooseRight = (id: string) => {
    setRightId(id)
    setRightStateId(defaultState(roster, id))
  }
  const swap = () => {
    const nextLeftId = rightId
    const nextRightId = leftId
    const nextLeftState = rightStateId
    const nextRightState = leftStateId
    setLeftId(nextLeftId)
    setRightId(nextRightId)
    setLeftStateId(nextLeftState)
    setRightStateId(nextRightState)
  }
  const randomize = () => {
    if (roster.length < 2) return
    const leftIndex = Math.floor(Math.random() * roster.length)
    let rightIndex = Math.floor(Math.random() * (roster.length - 1))
    if (rightIndex >= leftIndex) rightIndex += 1
    chooseLeft(roster[leftIndex].characterId)
    chooseRight(roster[rightIndex].characterId)
  }
  const applyFeatured = (entry: typeof featured[number]) => {
    setLeftId(entry.characterA.characterId)
    setRightId(entry.characterB.characterId)
    setLeftStateId(entry.matchup.characterAStateId ?? defaultState(roster, entry.characterA.characterId))
    setRightStateId(entry.matchup.characterBStateId ?? defaultState(roster, entry.characterB.characterId))
  }

  if (!view) return <main className="matchup-home"><p>비교할 두 캐릭터를 선택해 주세요.</p></main>
  const { left, right, matchup, leftFactors, rightFactors, leftStatEdges, rightStatEdges, tiedStats } = view

  return (
    <main className="matchup-home">
      <section className="matchup-arena-hero">
        <div>
          <p className="eyebrow">MATCHUP ARENA</p>
          <h2>대진을 직접 만들고, 양쪽 시선으로 본다.</h2>
          <p>두 캐릭터를 고른 뒤 각 선수의 강점·주의 포인트와 통합 분석을 확인합니다. 승률 숫자 대신 원작 Evidence와 조건을 우선합니다.</p>
        </div>
        <div className="arena-rule-chip">Neutral · No prep · 1v1</div>
      </section>

      <section className="matchup-builder-controls" aria-label="매치업 대진 선택">
        <FighterSelect side="left" roster={roster} characterId={leftId} stateId={leftStateId} opponentId={rightId}
          onCharacter={chooseLeft} onState={setLeftStateId} />
        <div className="arena-control-stack">
          <button type="button" className="swap-button" onClick={swap} aria-label="좌우 캐릭터 교체">⇄<span>SWAP</span></button>
          <button type="button" onClick={randomize} aria-label="랜덤 매치업">⤨<span>RANDOM</span></button>
        </div>
        <FighterSelect side="right" roster={roster} characterId={rightId} stateId={rightStateId} opponentId={leftId}
          onCharacter={chooseRight} onState={setRightStateId} />
      </section>

      <section className="featured-matchups">
        <div><span>FEATURED</span><small>직접 Matchup Evidence가 등록된 대진</small></div>
        <div className="matchup-picker" role="list" aria-label="등록된 매치업 빠른 선택">
          {featured.map((entry) => (
            <button type="button" role="listitem" key={entry.matchup.id} onClick={() => applyFeatured(entry)}>
              <span>{entry.characterA.name}</span><strong>VS</strong><span>{entry.characterB.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="matchup-corner-grid">
        <CornerPanel fighter={left} factors={leftFactors} statEdges={leftStatEdges} side="left" />
        <CornerPanel fighter={right} factors={rightFactors} statEdges={rightStatEdges} side="right" />
      </section>

      <section className="combined-matchup-panel">
        <div className="combined-heading">
          <div>
            <p className="eyebrow">COMBINED ANALYSIS</p>
            <h3>{left.name} <span>VS</span> {right.name}</h3>
          </div>
          <span className={matchup ? 'evidence-ready' : 'evidence-pending'}>
            {matchup ? `직접 상성 Evidence · ${matchup.factors.length} factors` : '직접 상성 Evidence 미등록'}
          </span>
        </div>

        <div className="matchup-scoreboard" aria-label="선택한 매치업 요약">
          <article className="fighter-card fighter-a">
            <small>{left.stateLabel ? `평가 시점 · ${left.stateLabel}` : 'RED CORNER'}</small>
            <h3>{left.name}</h3><strong>{left.overall.toFixed(1)}</strong><span>Overall</span>
          </article>
          <div className="versus-lockup"><span>VS</span><small>판정은 근거로</small></div>
          <article className="fighter-card fighter-b">
            <small>{right.stateLabel ? `평가 시점 · ${right.stateLabel}` : 'BLUE CORNER'}</small>
            <h3>{right.name}</h3><strong>{right.overall.toFixed(1)}</strong><span>Overall</span>
          </article>
        </div>

        <div className="matchup-summary-strip">
          <span>{left.name} 우세 Stat {leftStatEdges.length}</span>
          <span>동점 {tiedStats.length}</span>
          <span>{right.name} 우세 Stat {rightStatEdges.length}</span>
        </div>

        <section className="matchup-visual-grid">
          <MatchupRadarChart characterA={left} characterB={right} />
          <article className="tale-card">
            <p className="eyebrow">TALE OF THE TAPE</p>
            <h3>7 Core Stats</h3>
            <div className="tale-list">
              {left.stats.map((leftStat, index) => {
                const rightStat = right.stats[index]
                return (
                  <div className="tale-row" key={leftStat.stat}>
                    <strong>{leftStat.score}</strong>
                    <div>
                      <span>{leftStat.label}</span>
                      <div className="tale-bars">
                        <i className="bar-a" style={{ width: `${leftStat.score}%` }} />
                        <i className="bar-b" style={{ width: `${rightStat.score}%` }} />
                      </div>
                    </div>
                    <strong>{rightStat.score}</strong>
                  </div>
                )
              })}
            </div>
            <p className="arena-caution">Overall과 개별 스탯 차이는 승률이 아닙니다. 직접 상성 Evidence가 없는 조합은 결론을 만들지 않습니다.</p>
          </article>
        </section>

        <section className="arena-analysis">
          <div className="arena-analysis-heading">
            <div><p className="eyebrow">MATCHUP FACTORS</p><h3>종합 승부 포인트</h3></div>
            <span>{matchup ? `${matchup.factors.length} factors` : 'EVIDENCE PENDING'}</span>
          </div>
          {matchup ? (
            <div className="arena-factor-grid">
              {matchup.factors.map((factor) => (
                <article className="arena-factor-card" key={factor.id}>
                  <div className="arena-factor-meta">
                    <strong>{factorLabels[factor.factor]} · {phaseLabels[factor.phase]}</strong>
                    <span>{sideLabel(factor.advantage, left.name, right.name)} · {confidenceLabels[factor.confidence]}</span>
                  </div>
                  <p>{normalizeCharacterNamesForDisplay(factor.summary)}</p>
                  {factor.conditions && <small><b>조건</b> · {normalizeCharacterNamesForDisplay(factor.conditions)}</small>}
                  <small><b>불확실성</b> · {normalizeCharacterNamesForDisplay(factor.uncertainty)}</small>
                </article>
              ))}
            </div>
          ) : (
            <div className="matchup-empty-analysis">
              <strong>아직 이 조합의 직접 상성 데이터가 없습니다.</strong>
              <p>위 Core Stat·전투 스타일은 비교할 수 있지만, 특정 능력 상호작용이나 승부 우위는 원작 Evidence가 등록되기 전까지 보류합니다.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}
