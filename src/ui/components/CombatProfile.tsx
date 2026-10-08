import type {
  CombatProfile as CombatProfileData,
  SpecialCombatTraitCategory,
  SpecialCombatTraitStatus,
} from '../../domain/character/types'
import type { HakiConfirmationStatus, HakiType } from '../../domain/haki/types'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'

const hakiLabels: Record<HakiType, string> = {
  armament: '무장색',
  observation: '견문색',
  conquerors: '패왕색',
}

const statusLabels: Record<HakiConfirmationStatus, string> = {
  confirmed: '확인',
  unclear: '불명확',
  'not-confirmed': '비확인',
}

const specialStatusLabels: Record<SpecialCombatTraitStatus, string> = {
  confirmed: '확인',
  unclear: '불명확',
  'not-confirmed': '비확인',
}

const specialCategoryLabels: Record<SpecialCombatTraitCategory, string> = {
  'devil-fruit': '악마의 열매',
  race: '종족 특성',
  biology: '특수 생리',
  modification: '신체 개조',
  equipment: '특수 장비',
  technology: '과학 기술',
  other: '기타',
}

export function CombatProfile({ profile }: { profile: CombatProfileData }) {
  return (
    <section className="combat-profile-section">
      <div>
        <p className="eyebrow">CANON COMBAT PROFILE</p>
        <h2>전투 프로필</h2>
        <p className="section-note">평가 점수와 분리된 원작 기반 전투 정보입니다. 특수 전투요소는 별도 점수를 갖지 않으며 실제 성과가 확인된 Core Stat의 근거로 사용합니다.</p>
      </div>
      <div className="combat-profile-grid">
        <article className="profile-card">
          <h3>전투 방식</h3>
          <div className="profile-tags">{profile.combatStyles.map((style) => <span key={style}>{normalizeCharacterNamesForDisplay(style)}</span>)}</div>
        </article>
        <article className="profile-card special-traits-card">
          <div className="special-traits-heading">
            <h3>특수 전투요소</h3>
            <details className="special-help">
              <summary aria-label="특수 전투요소 Evidence 및 점수 반영 설명" title="특수 전투요소 설명 보기">?</summary>
              <div className="special-help-bubble" role="note">
                <strong>Evidence와 Overall</strong>
                <p>특수 전투요소 자체는 Overall에 직접 가산하지 않아. 해당 능력으로 실제 성과가 확인되면 관련 Core Stat 평가의 근거로 활용해.</p>
                {profile.specialTraits.length > 0 ? (
                  <ul>{profile.specialTraits.map((trait) => <li key={trait.id}>{trait.name} · 연결 Evidence {trait.evidenceIds.length}건</li>)}</ul>
                ) : <p>현재 연결된 특수 전투요소가 없어.</p>}
                <small>연결 건수는 점수나 근거의 강도를 뜻하지 않아.</small>
              </div>
            </details>
          </div>
          {profile.specialTraits.length > 0 ? (
            <div className="special-trait-list">
              {profile.specialTraits.map((trait) => (
                <section className="special-trait" key={trait.id}>
                  <div className="special-trait-meta">
                    <span>{specialCategoryLabels[trait.category]}</span>
                    <strong>{specialStatusLabels[trait.status]}</strong>
                  </div>
                  <h4>{trait.name}</h4>
                  <p>{normalizeCharacterNamesForDisplay(trait.description)}</p>
                  {trait.limitations && <small><strong>한계</strong> · {normalizeCharacterNamesForDisplay(trait.limitations)}</small>}
                  {trait.uncertainty && <small><strong>불확실성</strong> · {normalizeCharacterNamesForDisplay(trait.uncertainty)}</small>}
                </section>
              ))}
            </div>
          ) : <p className="empty-note">현재 확인된 별도 특수 전투요소 없음. 정보 부재를 감점으로 처리하지 않습니다.</p>}
        </article>
        <article className="profile-card haki-card">
          <h3>패기</h3>
          <dl>
            {profile.haki.capabilities.map((capability) => (
              <div key={capability.type}>
                <dt>{hakiLabels[capability.type]}</dt>
                <dd>
                  <strong>{statusLabels[capability.status]}</strong>
                  {capability.type === 'conquerors' && capability.infusion?.status === 'confirmed' && <span className="haki-infusion">패휘감 확인</span>}
                  {capability.type === 'conquerors' && capability.infusion?.status === 'unclear' && capability.status === 'confirmed' && <span className="haki-infusion muted">패휘감 미확인</span>}
                  {capability.note && <small>{normalizeCharacterNamesForDisplay(capability.note)}</small>}
                </dd>
              </div>
            ))}
          </dl>
        </article>
        <article className="profile-card profile-sources">
          <h3>Canon Profile 근거</h3>
          <ul>{profile.sources.map((source) => <li key={`${source.label}-${source.reference}`}><strong>{source.label}</strong> · {normalizeCharacterNamesForDisplay(source.reference)}</li>)}</ul>
        </article>
      </div>
    </section>
  )
}
