import type {
  CombatProfile as CombatProfileData,
  SpecialCombatTraitCategory,
  SpecialCombatTraitStatus,
} from '../../domain/character/types'
import type { HakiConfirmationStatus, HakiType } from '../../domain/haki/types'

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
          <div className="profile-tags">{profile.combatStyles.map((style) => <span key={style}>{style}</span>)}</div>
        </article>
        <article className="profile-card special-traits-card">
          <h3>특수 전투요소</h3>
          {profile.specialTraits.length > 0 ? (
            <div className="special-trait-list">
              {profile.specialTraits.map((trait) => (
                <section className="special-trait" key={trait.id}>
                  <div className="special-trait-meta">
                    <span>{specialCategoryLabels[trait.category]}</span>
                    <strong>{specialStatusLabels[trait.status]}</strong>
                  </div>
                  <h4>{trait.name}</h4>
                  <p>{trait.description}</p>
                  {trait.limitations && <small><strong>한계</strong> · {trait.limitations}</small>}
                  {trait.uncertainty && <small><strong>불확실성</strong> · {trait.uncertainty}</small>}
                  <small>연결 Evidence {trait.evidenceIds.length}건 · Overall 직접 가산 없음</small>
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
                  {capability.note && <small>{capability.note}</small>}
                </dd>
              </div>
            ))}
          </dl>
        </article>
        <article className="profile-card profile-sources">
          <h3>Canon Profile 근거</h3>
          <ul>{profile.sources.map((source) => <li key={`${source.label}-${source.reference}`}><strong>{source.label}</strong> · {source.reference}</li>)}</ul>
        </article>
      </div>
    </section>
  )
}
