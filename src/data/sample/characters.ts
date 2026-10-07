import type { Character } from '../../domain/character/types'

export const sampleCharacters: Character[] = [
  {
    id: 'marco',
    name: '마르코',
    crewId: 'whitebeard-pirates',
    description: '흰 수염 해적단 1번대 대장. 불사조의 재생·비행·푸른 불꽃을 전투와 지원에 활용한다.',
    combatProfile: {
      combatStyles: ['공중 기동', '근접 타격', '능력 기반 회복·지원'],
      specialTraits: [
        {
          id: 'special-marco-phoenix',
          category: 'devil-fruit',
          name: '동물계 환수종 불사조',
          status: 'confirmed',
          description: '불사조 변신을 통해 비행·재생·푸른 불꽃을 활용하며 자기 회복과 타인 지원까지 수행한다.',
          evidenceIds: ['evidence-marco-kizaru-554', 'evidence-marco-big-mom-995', 'evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006', 'evidence-marco-defense-kaido-1043'],
          limitations: '재생과 능력 사용은 실제 전투에서 피로와 소모가 확인되므로 무제한으로 해석하지 않는다.',
        },
      ],
      haki: {
        characterId: 'marco',
        capabilities: [
          { type: 'armament', status: 'confirmed', note: '공식 ONE PIECE.com 자료에서 무장색 사용자를 명시.' },
          { type: 'observation', status: 'confirmed', note: '공식 ONE PIECE.com 자료에서 견문색 사용자를 명시.' },
          { type: 'conquerors', status: 'unclear', note: '현재 프로젝트가 채택한 Canon 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: '2022-11-28 P.O.P “MAS” 불사조 마르코 재등장 기사' },
        { label: '원작 Evidence', reference: 'Ch. 554 / 566 / 995 / 998 / 1006' },
      ],
    },
  },
  {
    id: 'king',
    name: '킹',
    crewId: 'beasts-pirates',
    description: '백수 해적단 대간판. 루나리아족 특성과 고대종 능력, 검과 화염을 조합해 싸운다.',
    combatProfile: {
      combatStyles: ['검술', '공중전', '화염 공격', '루나리아 상태 전환', '고대종 능력 활용'],
      specialTraits: [
        {
          id: 'special-king-lunarian',
          category: 'race',
          name: '루나리아족 특성',
          status: 'confirmed',
          description: '등의 불꽃 상태에 따라 높은 방어와 속도 변화가 나타나는 루나리아족 고유 전투 특성을 가진다.',
          evidenceIds: ['evidence-king-lunarian-1032', 'evidence-king-zoro-1035'],
          limitations: '최고 방어와 최고 속도는 같은 상태에서 동시에 유지되는 상시 성능으로 계산하지 않는다.',
        },
        {
          id: 'special-king-ancient-zoan',
          category: 'devil-fruit',
          name: '동물계 고대종 프테라노돈',
          status: 'confirmed',
          description: '프테라노돈 변신을 통해 비행과 고대종 신체 능력을 전투에 활용한다.',
          evidenceIds: ['evidence-king-marco-1006', 'evidence-king-zoro-1035'],
        },
      ],
      haki: {
        characterId: 'king',
        capabilities: [
          { type: 'armament', status: 'confirmed', note: '공식 보조자료 계열과 전투 자료에서 사용이 확인되는 것으로 분류.' },
          { type: 'observation', status: 'confirmed', note: '공식 보조자료 계열에서 보유가 확인되는 것으로 분류.' },
          { type: 'conquerors', status: 'unclear', note: '현재 프로젝트가 채택한 Canon 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'VIVRE CARD 계열 공식 설정', reference: '킹 기본 전투·패기 정보' },
        { label: '원작 Evidence', reference: 'Ch. 1006 / 1032 / 1035' },
      ],
    },
  },
  {
    id: 'katakuri',
    name: '카타쿠리',
    crewId: 'big-mom-pirates',
    description: '빅 맘 해적단 스위트 3장성. 모치 능력과 고도로 단련된 견문색을 결합하는 전투가 핵심이다.',
    combatProfile: {
      combatStyles: ['근접 격투', '삼지창', '중·원거리 모치 공격', '미래예지 기반 회피·대응', '각성 능력 활용'],
      specialTraits: [
        {
          id: 'special-katakuri-mochi',
          category: 'devil-fruit',
          name: '모치모치 열매',
          status: 'confirmed',
          description: '모치를 생성·변형·경화하고 각성으로 주변 환경까지 모치화해 구속과 공간 제어에 활용한다.',
          evidenceIds: ['evidence-katakuri-awakening-882'],
          limitations: '높은 전투 성과 중 상당 부분은 능력 자체뿐 아니라 높은 숙련도와 견문색 결합에서 발생하므로 별도 점수로 중복 가산하지 않는다.',
        },
      ],
      haki: {
        characterId: 'katakuri',
        capabilities: [
          { type: 'armament', status: 'confirmed', note: '원작 전투 및 관련 자료에서 무장색 사용이 확인됨.' },
          { type: 'observation', status: 'confirmed', note: '공식 ONE PIECE.com에서 고도로 단련된 견문색과 미래예지를 명시.' },
          { type: 'conquerors', status: 'confirmed', note: '루피와의 전투에서 패왕색 사용이 확인됨.', infusion: { status: 'unclear', note: '현재 채택 근거에서는 패휘감 사용을 확인하지 못함.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: 'TV Anime Ep. 830 / 832 / 857 및 카타쿠리 관련 공식 기사' },
        { label: '원작', reference: 'Whole Cake Island · 루피 vs 카타쿠리 전투' },
      ],
    },
  },
]
