import { useState } from 'react'
import { CharacterPortrait } from '../components/CharacterPortrait'
import { characterIdentityStyle, CharacterIdentity } from '../components/CharacterIdentity'
import { CharlosTruthDialog } from '../components/CharlosTruthDialog'
import { charlosMemeQuote, charlosMemeStats, charlosSpecialOverall,
  CHARLOS_ID, celestialDragonGroup } from '../../data/special/charlosSpecial'

const charlosProfileDisplayName = '로즈워드 차를로스 성'

/** Standalone comedy view: never passes meme stats into Balanced, individual stat rankings or Matchup. */
export function CharlosSpecialPage({ onSelectOverall }: { onSelectOverall: () => void }) {
  const [truthOpen, setTruthOpen] = useState(false)
  return <main className="detail charlos-detail" style={characterIdentityStyle(celestialDragonGroup.id, CHARLOS_ID)}>
    <div className="detail-heading charlos-heading" style={characterIdentityStyle(celestialDragonGroup.id, CHARLOS_ID)}>
      <div className="detail-heading-profile">
        <CharacterPortrait characterId={CHARLOS_ID} groupId={celestialDragonGroup.id} name={charlosProfileDisplayName} size="large" />
        <div className="charlos-heading-copy">
          <CharacterIdentity group={celestialDragonGroup} characterId={CHARLOS_ID} showPastMembership={false} />
          <h1>{charlosProfileDisplayName}</h1>
          <div className="charlos-known-as" aria-label="호칭">
            <span className="charlos-alias-badge">
              <span className="charlos-alias-title"><span className="charlos-alias-star" aria-hidden="true">*</span>호를로스 성</span>
              <span className="charlos-alias-subtitle">부산의 또 다른 자아</span>
            </span>
            <span className="charlos-special-tag">세계귀족 특별 전형</span>
          </div>
        </div>
      </div>
      <figure className="character-quote charlos-meme-quote" aria-label="캐릭터 대표 명대사">
        <div className="character-quote-eyebrow">대표 명대사</div>
        <blockquote lang="ko">“{charlosMemeQuote}”</blockquote>
        <figcaption><span>원피스 51권</span></figcaption>
      </figure>
    </div>

    <div className="charlos-intro">
      <button className="charlos-overall-card" onClick={onSelectOverall} type="button"
        aria-label="로즈워드 차를로스 성 특별 종합 점수 포함 전체 오버롤 순위 보기">
        <span>종합 전투력 <span aria-hidden="true">↗</span></span>
        <strong>{charlosSpecialOverall.toFixed(1)}<small>/100</small></strong>
      </button>
      <div className="charlos-intro-note">
        <p className="charlos-eyebrow">WORLD NOBLE · 7 ABILITIES</p>
        <h2>전투는 부하가,<br/>평가는 내가 한다이.</h2>
        <p className="charlos-intro-description"><span>세계귀족의 위상은 평범한 전투력으로 설명할 수 없다이.</span><span>내 평가는 내가 정하는 거다이.</span></p>
      </div>
    </div>

    <section className="charlos-stats" aria-label="로즈워드 차를로스 성 천룡인 전용 7축">
      <div className="charlos-section-heading"><h2>천룡인 전용 7축</h2><p>스탯을 누르면 위대한 업적이 펼쳐진다이.</p></div>
      <div className="charlos-stat-list">
        {charlosMemeStats.map((stat,i) => <details className="charlos-stat" key={stat.id}>
          <summary>
            <span className="charlos-stat-ordinal">{String(i+1).padStart(2,'0')}</span>
            <span className="charlos-stat-text"><strong>{stat.label}</strong><small>{stat.line}</small></span>
            <span className="charlos-stat-score">{stat.score}</span>
            <span className="charlos-stat-chevron" aria-hidden="true">＋</span>
            <span className="charlos-bar"><span style={{width:stat.score+'%'}}/></span>
          </summary>
          <div className="charlos-stat-detail">
            <p><strong>주요 업적</strong>{stat.fact}</p>
            <p><strong>천룡인식 평가</strong>{stat.satire}</p>
            <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer">{stat.sourceLabel} ↗</a>
          </div>
        </details>)}
      </div>
    </section>

    <section className="charlos-secret-panel" aria-label="숨겨진 진실">
      <div>
        <p className="charlos-eyebrow">CLASSIFIED / EASTER EGG</p>
        <h2>정말 그가 악인이었을까?</h2>
        <p>세계가 감춰 온 비밀을 확인하는 거다이.</p>
      </div>
      <button type="button" className="charlos-truth-trigger" aria-haspopup="dialog"
        aria-expanded={truthOpen} onClick={() => setTruthOpen(true)}>
        진실 <span aria-hidden="true">↗</span>
      </button>
    </section>
    {truthOpen && <CharlosTruthDialog onClose={() => setTruthOpen(false)} />}
  </main>
}
