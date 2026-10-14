import { useState } from 'react'
import {
  getOrganizationChart,
  getOrganizationGroups,
} from '../../application/getOrganizationChart'
import type { CharacterMembership, GroupType } from '../../domain/character/types'
import { CharacterPortrait } from '../components/CharacterPortrait'

const typeGroups: { label: string; types: GroupType[] }[] = [
  { label: '해적단', types: ['pirate-crew'] },
  { label: '해군·세계정부', types: ['marine', 'government'] },
  { label: '혁명군·기관', types: ['revolutionary', 'institution'] },
  { label: '역사·지역 및 기타', types: ['historical', 'regional', 'other'] },
]
const membershipLabel: Record<CharacterMembership['status'], string> = {
  current: '현재',
  former: '과거',
  historical: '역사적',
  unknown: '시기 미확인',
}

export function OrganizationHome({ onSelectCharacter }: {
  onSelectCharacter: (characterId: string, groupId: string) => void
}) {
  const groups = getOrganizationGroups()
  const [groupId, setGroupId] = useState(groups[0]?.id ?? '')
  const chart = getOrganizationChart(groupId, 'all')

  return (
    <main className="organization-view" aria-label="조직도">
      <header className="organization-heading">
        <p className="eyebrow">ONE PIECE · ORGANIZATIONS</p>
        <h2>조직도</h2>
        <p>해적단·해군·정부 등 등록된 조직의 구성원과 직책을 살펴봐.</p>
      </header>
      <div className="organization-controls">
        <label htmlFor="organization-group">조직 선택</label>
        <select id="organization-group" value={groupId} onChange={(event) => setGroupId(event.target.value)}>
          {typeGroups.map((category) => (
            <optgroup key={category.label} label={category.label}>
              {groups.filter((group) => category.types.includes(group.type)).map((group) => (
                <option key={group.id} value={group.id}>
                  {group.parentGroupId ? '↳ ' : ''}{group.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {chart && (
        <div className="organization-results">
          <div className="organization-summary">
            <div>
              <p className="eyebrow">등록된 조직</p>
              <h3>{chart.group.name}</h3>
              {chart.group.description && <p>{chart.group.description}</p>}
              {chart.group.parentGroupId && (
                <p>상위 조직: {groups.find((group) => group.id === chart.group.parentGroupId)?.name ?? '미확인'}</p>
              )}
            </div>
            <strong>{chart.count}명 <small>분석 등록 구성원</small></strong>
          </div>
          <p className="organization-caveat">
            이 화면은 전체 공식 명단이 아니라 현재 프로젝트에 등록된 인물만 보여줘.
            역할·번호·그룹 위치는 전투력 순위나 확인되지 않은 직접 지휘관계를 뜻하지 않아.
            현재·과거·역사적 구성원을 함께 보여주고, 각 소속 기록의 시기 정보를 보존해.
          </p>
          {chart.sections.length === 0
            ? <p className="organization-empty">이 조직에 등록된 분석 대상 구성원이 아직 없어.</p>
            : chart.sections.map((section) => (
              <section key={section.group.id} className="organization-section"
                data-group-id={section.group.id} aria-label={section.group.name + ' 구성원'}>
                <div className="organization-section-header">
                  <h3>{section.group.id === chart.group.id
                    ? '등록된 구성원'
                    : '하위 조직 · ' + section.group.name}</h3>
                  <span>{section.count}명</span>
                </div>
                {section.units.map((unit) => (
                  <div className="organization-unit" key={unit.label}>
                    <h4>{unit.label}</h4>
                    <div className="organization-members">
                      {unit.members.map(({ character, group, membership }) => (
                        <button key={character.id} type="button" className="organization-member"
                          data-character-id={character.id}
                          onClick={() => onSelectCharacter(character.id, group.id)}
                          aria-label={character.name + ' 상세 보기'}>
                          <CharacterPortrait characterId={character.id} groupId={group.id}
                            name={character.name} size="small"/>
                          <span className="organization-member-copy">
                            <strong>{character.name}</strong>
                            <small>{membership.role || '직책 미등록'}</small>
                            <span className="organization-member-meta">
                              <span>{membershipLabel[membership.status]} 소속</span>
                              {membership.period && <span>{membership.period}</span>}
                            </span>
                          </span>
                          <span className="organization-go" aria-hidden="true">↗</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ))}
        </div>
      )}
    </main>
  )
}
