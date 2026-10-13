import type { Character, CharacterMembership } from '../../domain/character/types'

/**
 * Identity-only catalogue entry. No Evaluation, numeric strength, or invented Evidence
 * is added until the character has been reviewed under the project scoring rules.
 */
export const izoCharacter: Character = {
  id: 'izo',
  name: '이조',
  crewId: 'whitebeard-pirates',
  knownAs: [],
  description: '흰수염 해적단 16번대 대장이자 광월가의 가신. 오뎅과 인연이 있으며 오니가시마 전투에서 아카자야 일행을 지원했다. 오니가시마의 다수전·부상 상황을 구분한 E2/E3 잠정 7축 평가가 등록되어 있다. 원작 직접 장면 전수 대조 전이므로 확정 전투력은 아니다.',
  combatProfile: {
    combatStyles: ['쌍권총 사격', '원거리 엄호', '근접 거리 대응'],
    specialTraits: [],
    haki: {
      characterId: 'izo',
      capabilities: [
        { type: 'armament', status: 'unclear', note: '이번 프로필 추가에서는 패기 적용 전투 장면을 별도 Evidence로 검증하지 않아 평가를 보류한다.' },
        { type: 'observation', status: 'unclear', note: '패기 사용의 구체적 근거와 수치 기여를 이번 단계에서 산정하지 않는다.' },
        { type: 'conquerors', status: 'not-confirmed', note: '패왕색 보유를 확인한 공식 근거를 등록하지 않았다.', infusion: { status: 'not-confirmed' } },
      ],
    },
    sources: [
      { label: 'ONE PIECE.com 공식 캐릭터 프로필', reference: 'https://one-piece.com/character/izo/index.html' },
      { label: '원작 와노쿠니·오니가시마', reference: '오뎅의 가신·흰수염 해적단 16번대 대장·아카자야 측 협력 전투 기록 — 상세 근거 추후 검증' },
    ],
  },
}

/** Izo joined the raid alongside the Akazaya, not an automatically counted tenth original scabbard. */
export const izoMemberships: CharacterMembership[] = [
  { characterId: 'izo', groupId: 'whitebeard-pirates', subgroup: '16번대',
    role: '대장', status: 'historical', period: '흰수염 해적단 활동기 (16번대 대장)' },
  { characterId: 'izo', groupId: 'akazaya-nine',
    role: '광월가 가신 / 오니가시마 전투 합류', status: 'historical',
    period: '아카자야 측에 합류한 전투원; 오뎅의 정규 아카자야 9인 편성과는 구분' },
]
