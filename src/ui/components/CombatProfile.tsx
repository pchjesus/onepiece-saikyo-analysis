import { useEffect, useRef } from 'react'
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

// Display-only precedence. Never reorder the underlying Character/Evidence records.
const specialCategoryOrder: SpecialCombatTraitCategory[] = [
  'devil-fruit', 'race', 'biology', 'modification', 'equipment', 'technology', 'other',
]

export function CombatProfile({ profile }: { profile: CombatProfileData }) {
  const profileRef = useRef<HTMLElement>(null)
  const orderedTraits = [...profile.specialTraits].sort((a, b) =>
    specialCategoryOrder.indexOf(a.category) - specialCategoryOrder.indexOf(b.category))
  const categoryHeading = [...new Set(orderedTraits.map((trait) => trait.category))]
    .map((category) => specialCategoryLabels[category]).join(' / ')

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      profileRef.current?.querySelectorAll<HTMLDetailsElement>('.special-help, .haki-help')
        .forEach((details) => {
          if (details.open && !details.contains(target)) details.open = false
        })
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const opened = profileRef.current?.querySelector<HTMLDetailsElement>('.special-help[open], .haki-help[open]')
      if (opened) {
        opened.open = false
        opened.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <section className="combat-profile-section" ref={profileRef}>
      <div>
        <p className="eyebrow">원작 전투 프로필</p>
        <h2>전투 프로필</h2>
        <p className="section-note">평가 점수와 분리된 원작 기반 전투 정보입니다. 특수 전투요소는 별도 점수를 갖지 않으며 실제 성과가 확인된 핵심 스탯의 근거로 사용합니다.</p>
      </div>
      <div className="combat-profile-grid">
        <article className="profile-card">
          <div className="combat-style-heading">
            <h3>전투 방식</h3>
            {profile.specialTraits.some((trait) => trait.category === 'devil-fruit' && trait.awakening === 'confirmed')
              && <span className="fruit-awakening-badge">열매 각성자</span>}
          </div>
          <div className="profile-tags">{profile.combatStyles.map((style) => <span key={style}>{normalizeCharacterNamesForDisplay(style)}</span>)}</div>
        </article>
        <article className="profile-card special-traits-card">
          <div className="special-traits-heading">
            <h3>특수 전투요소</h3>
            <details className="special-help">
              <summary aria-label="특수 전투요소 근거 및 점수 반영 설명" title="특수 전투요소 설명 보기">?</summary>
              <div className="special-help-bubble" role="note">
                <strong>근거와 종합 전투력</strong>
                <p>특수 전투요소 자체는 종합 전투력에 직접 가산하지 않아. 해당 능력으로 실제 성과가 확인되면 관련 핵심 스탯 평가의 근거로 활용해.</p>
                {profile.specialTraits.length > 0 ? (
                  <ul>{orderedTraits.map((trait) => <li key={trait.id}>{trait.name} · 연결 근거 {trait.evidenceIds.length}건</li>)}</ul>
                ) : <p>현재 연결된 특수 전투요소가 없어.</p>}
                <small>연결 건수는 점수나 근거의 강도를 뜻하지 않아.</small>
              </div>
            </details>
          </div>
          {orderedTraits.length > 0 ? (
            <div className="special-traits-content">
              <div className="special-trait-group-heading">{categoryHeading}</div>
              <div className="special-trait-list">
                {orderedTraits.map((trait) => (
                  <section className="special-trait" key={trait.id}>
                    <div className="special-trait-meta">
                      <strong>{specialStatusLabels[trait.status]}</strong>
                    </div>
                    <h4>{trait.name}</h4>
                    <p>{normalizeCharacterNamesForDisplay(trait.description)}</p>
                    {trait.limitations && <small><strong>한계</strong> · {normalizeCharacterNamesForDisplay(trait.limitations)}</small>}
                    {trait.uncertainty && <small><strong>불확실성</strong> · {normalizeCharacterNamesForDisplay(trait.uncertainty)}</small>}
                  </section>
                ))}
              </div>
            </div>
          ) : <p className="empty-note">현재 확인된 별도 특수 전투요소 없음. 정보 부재를 감점으로 처리하지 않습니다.</p>}
        </article>
        <article className="profile-card haki-card">
          <h3>패기</h3>
          <dl>
            {profile.haki.capabilities.map((capability) => {
              const assessments = profile.haki.excellenceAssessments?.filter(({ type }) => type === capability.type) ?? []
              return (
                <div key={capability.type}>
                  <dt>{hakiLabels[capability.type]}</dt>
                  <dd>
                    <strong>{statusLabels[capability.status]}</strong>
                    <details className="haki-help">
                      <summary aria-label={`${hakiLabels[capability.type]} 근거 확인`} title="패기 근거 확인">?</summary>
                      <div className="haki-help-bubble" role="note">
                        <strong>{hakiLabels[capability.type]} · 근거 확인</strong>
                        <p>보유 상태 · {statusLabels[capability.status]}</p>
                        {capability.note && <p>{normalizeCharacterNamesForDisplay(capability.note)}</p>}
                        {!capability.note && !capability.infusion && assessments.length === 0
                          && <p>추가 설명이 등록되지 않았습니다. 현재 표시된 패기 보유 상태는 기존 데이터에 따른 것으로, 세부 설명이 없다는 이유로 능력의 부재나 추가 점수를 추정하지 않습니다.</p>}
                        {capability.infusion && <p>패휘감 · {statusLabels[capability.infusion.status]}
                          {capability.infusion.note && <span> · {normalizeCharacterNamesForDisplay(capability.infusion.note)}</span>}
                        </p>}
                        {assessments.map((assessment) => (
                          <section className="haki-excellence" key={assessment.type}
                            aria-label="특출난 패기 응용에 대한 근거 평가">
                            <strong>{assessment.basis === 'direct-application' ? '특출난 실전 응용 확인' : '고숙련 가능성 · 강한 추론'}</strong>
                            <small>{normalizeCharacterNamesForDisplay(assessment.interpretation)}</small>
                            {assessment.eraContext && <small>해당 시점 · {assessment.eraContext}</small>}
                            <small className="haki-excellence-caveat">불확실성 · {normalizeCharacterNamesForDisplay(assessment.uncertainty)}</small>
                            <small className="haki-excellence-numeric">정성적 평가 · 자동 점수 가산 없음</small>
                          </section>
                        ))}
                      </div>
                    </details>
                  </dd>
                </div>
              )
            })}
          </dl>
        </article>
        <article className="profile-card profile-sources">
          <h3>원작 전투 프로필 근거</h3>
          <ul>{profile.sources.map((source) => <li key={`${source.label}-${source.reference}`}><strong>{source.label}</strong> · {normalizeCharacterNamesForDisplay(source.reference)}</li>)}</ul>
        </article>
      </div>
    </section>
  )
}
