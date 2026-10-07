import type { Character } from '../../domain/character/types'

export const sampleCharacters: Character[] = [
  {
    id: 'marco',
    name: '마르코',
    crewId: 'whitebeard-pirates',
    description: '흰 수염 해적단 1번대 대장. 불사조의 재생·비행·푸른 불꽃을 전투와 지원에 활용한다.',
    combatProfile: {
      combatStyles: ['공중 기동', '근접 타격', '능력 기반 회복·지원'],
      keyAbilities: ['동물계 환수종 불사조', '비행', '재생', '푸른 불꽃을 통한 상태 억제·지원'],
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
      keyAbilities: ['루나리아족 발화·고방어 특성', '등의 불꽃 상태에 따른 방어/속도 변화', '동물계 고대종 프테라노돈', '비행', '검과 화염의 복합 운용'],
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
      keyAbilities: ['모치모치 열매', '각성에 의한 주변 환경의 모치화', '모치의 변형·생성·경화', '고도화된 견문색을 통한 미래예지'],
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
