import { characterRepository } from '../../data/repositories/characterRepository'
import { groupRepository } from '../../data/repositories/groupRepository'
import { CharacterPortrait } from '../components/CharacterPortrait'
import { CharacterIdentity, characterIdentityStyle } from '../components/CharacterIdentity'
import { CombatProfile } from '../components/CombatProfile'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'

/** Public character profile for a documented but not-yet-scored character. */
export function UnratedCharacterPage({ characterId, groupId }: { characterId: string; groupId: string }) {
  const character = characterRepository.getCharacter(characterId)
  const memberships = groupRepository.getMembershipsForCharacter(characterId)
  const group = groupRepository.getGroup(groupId)
  const membership = memberships.find(item => item.groupId === groupId)
  if (!character || !group || !membership) return <main className="detail">캐릭터 데이터를 찾을 수 없습니다.</main>

  const past = membership.status === 'former' || membership.status === 'historical'
  return <main className="detail">
    <div className="detail-heading" style={characterIdentityStyle(group.id, characterId)}>
      <div className="detail-heading-profile">
        <CharacterPortrait characterId={characterId} groupId={group.id} name={character.name} size="large"/>
        <div>
          <CharacterIdentity group={group} characterId={characterId} showPastMembership={past}/>
          <h1>{character.name}</h1>
          {character.description && <p className="character-description">
            {normalizeCharacterNamesForDisplay(character.description)}
          </p>}
        </div>
      </div>
      <p className="prototype-note">전투력 미평가 · 캐릭터와 소속 이력만 등록 · 점수·순위·매치업 산정 제외</p>
    </div>
    <div className="overview-layout">
      <section className="score-overview" aria-label="평가 준비 상태">
        <h2>전투력 평가 준비 중</h2>
        <p className="section-note">원작 전투 장면, 당시 상황, 근거의 신뢰도와 7개 전투 스탯을 검토하기 전이므로 임의 점수를 표시하지 않아.</p>
        <h3>소속 이력</h3>
        <ul>{memberships.map(item => <li key={item.groupId}>
          <strong>{groupRepository.getGroup(item.groupId)?.name ?? item.groupId}</strong>
          {' · '}{item.role ?? '구성원'}{item.status !== 'current' ? ' (과거)' : ''}
          {item.period ? <p className="section-note">{item.period}</p> : null}
        </li>)}</ul>
      </section>
      <CombatProfile profile={character.combatProfile}/>
    </div>
  </main>
}
