import type { CombatProfile as CombatProfileData } from '../../domain/character/types'
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

export function CombatProfile({ profile }: { profile: CombatProfileData }) {
  return (
    <section className="combat-profile-section">
      <div>
        <p className="eyebrow">CANON COMBAT PROFILE</p>
        <h2>전투 프로필</h2>
        <p className="section-note">평가 점수와 분리된 캐릭터의 원작 기반 전투 정보입니다. 미확인은 비보유를 의미하지 않습니다.</p>
      </div>
      <div className="combat-profile-grid">
        <article className="profile-card">
          <h3>전투 방식</h3>
          <div className="profile-tags">{profile.combatStyles.map((style) => <span key={style}>{style}</span>)}</div>
        </article>
        <article className="profile-card">
          <h3>주요 능력</h3>
          <ul>{profile.keyAbilities.map((ability) => <li key={ability}>{ability}</li>)}</ul>
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
