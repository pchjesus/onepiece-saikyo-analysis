import type { Character } from '../../domain/character/types'

export const sampleCharacters: Character[] = [
  {
    id: 'marco',
    name: '마르코',
    crewId: 'whitebeard-pirates',
    description: '흰수염 해적단 1번대 대장. 불사조의 재생·비행·푸른 불꽃을 전투와 지원에 활용한다.',
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
          { type: 'armament', status: 'confirmed', note: '원작에서 아카이누 공격 시 실제 적용이 확인됨.' },
          { type: 'observation', status: 'confirmed', note: '공식 보조자료에서 보유가 확인되는 것으로 분류.' },
          { type: 'conquerors', status: 'unclear', note: '현재 채택 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: '마르코 공식 캐릭터 자료' },
        { label: '원작 Evidence', reference: 'Ch. 554 / 566 / 574-575 / 995 / 998 / 1006 / 1022 / 1043' },
      ],
    },
  },
  {
    id: 'jozu',
    name: '죠즈',
    crewId: 'whitebeard-pirates',
    description: '흰수염 해적단 3번대 대장. 반짝반짝 열매로 신체를 다이아몬드화해 강한 물리 공격과 방어를 수행한다.',
    combatProfile: {
      combatStyles: ['근접 돌진', '강력한 완력', '다이아몬드 방어'],
      specialTraits: [
        {
          id: 'special-jozu-diamond',
          category: 'devil-fruit',
          name: '반짝반짝 열매',
          status: 'confirmed',
          description: '신체 일부를 다이아몬드화해 공격력과 방어력을 높이고 전방에서 강한 공격을 받아낸다.',
          evidenceIds: ['evidence-jozu-mihawk-553', 'evidence-jozu-aokiji-567'],
          limitations: '다이아몬드화가 모든 종류의 공격을 무효화하는 것은 아니며, 아오키지의 빙결에는 제압당했다.',
        },
      ],
      haki: {
        characterId: 'jozu',
        capabilities: [
          { type: 'armament', status: 'confirmed', note: '크로커다일과 아오키지 같은 자연계 능력자에게 실제 타격을 가한 장면을 적용 근거로 사용.' },
          { type: 'observation', status: 'confirmed', note: '공식 보조자료에서 보유가 확인되는 것으로 분류.' },
          { type: 'conquerors', status: 'unclear', note: '현재 채택 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: '죠즈 공식 캐릭터 자료' },
        { label: '원작 Evidence', reference: 'Ch. 553 / 560 / 567-569' },
      ],
    },
  },
  {
    id: 'vista',
    name: '비스타',
    crewId: 'whitebeard-pirates',
    description: '흰수염 해적단 5번대 대장. 이도류 대검호로 미호크와 직접 검술 공방을 성립시킨다.',
    combatProfile: {
      combatStyles: ['이도류 검술', '근접 검격', '강자 요격'],
      specialTraits: [],
      haki: {
        characterId: 'vista',
        capabilities: [
          { type: 'armament', status: 'confirmed', note: '원작에서 마르코와 함께 아카이누를 공격할 때 실제 적용이 확인됨.' },
          { type: 'observation', status: 'confirmed', note: '공식 보조자료에서 보유가 확인되는 것으로 분류.' },
          { type: 'conquerors', status: 'unclear', note: '현재 채택 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: '비스타 공식 캐릭터 자료 — 미호크와 호각으로 싸울 정도의 검술' },
        { label: '원작 Evidence', reference: 'Ch. 561-562 / 574' },
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
          { type: 'armament', status: 'confirmed', note: '검에 무장색을 적용한 실전 장면이 확인됨.' },
          { type: 'observation', status: 'confirmed', note: '공식 보조자료에서 보유가 확인되는 것으로 분류.' },
          { type: 'conquerors', status: 'unclear', note: '현재 채택 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'VIVRE CARD 계열 공식 설정', reference: '킹 기본 전투·패기 정보' },
        { label: '원작 Evidence', reference: 'Ch. 1006 / 1032 / 1035' },
      ],
    },
  },
  {
    id: 'queen',
    name: '퀸',
    crewId: 'beasts-pirates',
    description: '백수 해적단 대간판. 고대종 브라키오사우루스와 사이보그 개조·과학 무장을 결합한다.',
    combatProfile: {
      combatStyles: ['근접전', '고대종 변신', '레이저·기계 무장', 'Germa 계열 기술 응용'],
      specialTraits: [
        {
          id: 'special-queen-ancient-zoan',
          category: 'devil-fruit',
          name: '동물계 고대종 브라키오사우루스',
          status: 'confirmed',
          description: '브라키오사우루스 변신과 인수형을 통해 큰 체격과 신체 능력을 전투에 활용한다.',
          evidenceIds: ['evidence-queen-ancient-zoan-1028'],
        },
        {
          id: 'special-queen-cybernetics',
          category: 'modification',
          name: '사이보그 개조·과학 무장',
          status: 'confirmed',
          description: '기계 신체·레이저·전격·투명화와 Germa 계열 기술을 포함한 여러 과학 무장을 전투에 사용한다.',
          evidenceIds: ['evidence-queen-cybernetics-1028-1034'],
          limitations: '수단의 수가 많다는 사실만으로 Technique·Combat IQ·Versatility를 중복 가산하지 않는다.',
        },
      ],
      haki: {
        characterId: 'queen',
        capabilities: [
          { type: 'armament', status: 'confirmed', note: '공식 VIVRE CARD 계열 보조자료에서 보유가 확인되는 것으로 분류하되 현재 저장 Evidence에는 명시적 적용 장면을 수치 가산하지 않음.' },
          { type: 'observation', status: 'confirmed', note: '공식 VIVRE CARD 계열 보조자료에서 보유가 확인되는 것으로 분류.' },
          { type: 'conquerors', status: 'unclear', note: '현재 채택 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: '퀸 공식 캐릭터 자료' },
        { label: '원작 Evidence', reference: 'Ch. 1006 / 1028 / 1034' },
      ],
    },
  },
  {
    id: 'jack',
    name: '잭',
    crewId: 'beasts-pirates',
    description: '백수 해적단 대간판. 고대종 매머드 능력과 강한 신체를 바탕으로 장기전과 정면전에 특화된다.',
    combatProfile: {
      combatStyles: ['근접 정면전', '쌍검', '매머드 돌진', '장기전'],
      specialTraits: [
        {
          id: 'special-jack-mammoth',
          category: 'devil-fruit',
          name: '동물계 고대종 매머드',
          status: 'confirmed',
          description: '매머드 변신을 통해 큰 체격과 완력, 장기 전투에 유리한 신체 능력을 활용한다.',
          evidenceIds: ['evidence-jack-zou-809-810', 'evidence-jack-sulong-1026'],
        },
        {
          id: 'special-jack-fishman',
          category: 'race',
          name: '어인 생리',
          status: 'confirmed',
          description: '악마의 열매 능력자이면서도 어인이라 수중에서 호흡할 수 있다.',
          evidenceIds: ['evidence-jack-zunesha-824'],
          limitations: '바다에 빠진 뒤 호흡은 가능하지만 악마의 열매 능력자라 움직일 수 없으므로 수중 전투능력으로 보지 않는다.',
        },
      ],
      haki: {
        characterId: 'jack',
        capabilities: [
          { type: 'armament', status: 'unclear', note: '보조자료 간 표기가 엇갈리는 부분이 있어 현재 데이터에서는 보유를 확정하지 않고 수치 가산하지 않는다.' },
          { type: 'observation', status: 'unclear', note: '보조자료 간 표기가 엇갈리는 부분이 있어 현재 데이터에서는 보유를 확정하지 않고 수치 가산하지 않는다.' },
          { type: 'conquerors', status: 'unclear', note: '현재 채택 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: '잭 공식 캐릭터 자료' },
        { label: '원작 Evidence', reference: 'Ch. 809-810 / 821 / 824 / 921 / 1005 / 1026' },
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
          { type: 'armament', status: 'confirmed', note: '원작 전투에서 무장색 사용이 확인됨.' },
          { type: 'observation', status: 'confirmed', note: '미래예지 수준으로 단련된 견문색 사용이 원작에서 확인됨.' },
          { type: 'conquerors', status: 'confirmed', note: '루피와의 전투에서 패왕색 방출이 확인됨.', infusion: { status: 'unclear', note: '현재 채택 근거에서는 패휘감 사용을 확인하지 못함.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: '카타쿠리 공식 캐릭터 자료' },
        { label: '원작', reference: 'Whole Cake Island · 루피 vs 카타쿠리 전투' },
      ],
    },
  },
  {
    id: 'smoothie',
    name: '스무디',
    crewId: 'big-mom-pirates',
    description: '빅 맘 해적단 스위트 3장성. 즙즙 열매로 수분을 추출·흡수해 자신과 무기를 강화하고 장거리 공격에 활용한다.',
    combatProfile: {
      combatStyles: ['검술', '접촉 탈수', '흡수·거대화', '장거리 대형 참격'],
      specialTraits: [
        {
          id: 'special-smoothie-squeeze',
          category: 'devil-fruit',
          name: '즙즙 열매',
          status: 'confirmed',
          description: '생물과 물질에서 액체를 짜내고 흡수해 자신과 무기를 거대화하며, 흡수한 수분을 강한 장거리 공격으로 방출한다.',
          evidenceIds: ['evidence-smoothie-poison-869', 'evidence-smoothie-pursuit-894'],
          limitations: '높은 출력의 공격은 확인되지만 상위권 전투원에게 적중해 큰 피해를 준 직접 표본은 제한적이다.',
        },
      ],
      haki: {
        characterId: 'smoothie',
        capabilities: [
          { type: 'armament', status: 'confirmed', note: '공식 보조자료에서 보유가 확인되지만 현재 저장한 원작 Evidence에서 명확한 적용 장면은 수치 가산하지 않음.' },
          { type: 'observation', status: 'confirmed', note: '공식 보조자료에서 보유가 확인되는 것으로 분류.' },
          { type: 'conquerors', status: 'unclear', note: '현재 채택 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: '스무디 공식 캐릭터 자료 — 스위트 3장성, 즙즙 열매' },
        { label: '원작 Evidence', reference: 'Ch. 869 / 894 / 897' },
      ],
    },
  },
  {
    id: 'cracker',
    name: '크래커',
    crewId: 'big-mom-pirates',
    description: '빅 맘 해적단 스위트 3장성. 비스킷비스킷 열매로 병사와 갑옷을 만들고 무장색을 결합해 싸운다.',
    combatProfile: {
      combatStyles: ['검술', '비스킷 병사 운용', '갑옷·방패 방어', '다수전 압박'],
      specialTraits: [
        {
          id: 'special-cracker-biscuit',
          category: 'devil-fruit',
          name: '비스킷비스킷 열매',
          status: 'confirmed',
          description: '비스킷을 생성·조종해 병사·무기·갑옷을 만들고 수적으로 압박하는 전투 방식을 구축한다.',
          evidenceIds: ['evidence-cracker-biscuit-837-838', 'evidence-cracker-long-battle-842'],
          limitations: '비스킷은 물에 젖으면 약해지며, 능력의 강도와 병사 생산량을 Technique·Stamina·Versatility에 중복 가산하지 않는다.',
        },
      ],
      haki: {
        characterId: 'cracker',
        capabilities: [
          { type: 'armament', status: 'confirmed', note: '루피와의 전투에서 검과 비스킷 갑옷에 실제 적용이 확인됨.' },
          { type: 'observation', status: 'confirmed', note: '공식 보조자료에서 보유가 확인되는 것으로 분류.' },
          { type: 'conquerors', status: 'unclear', note: '현재 채택 근거에서 패왕색 보유를 확인하지 못함.', infusion: { status: 'unclear', note: '패왕색 자체가 확인되지 않아 패휘감도 미확인.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com', reference: '크래커 공식 캐릭터 자료' },
        { label: '원작 Evidence', reference: 'Ch. 837-838 / 842' },
      ],
    },
  },
  {
    id: 'zoro', name: '조로', crewId: 'straw-hat-pirates',
    description: '밀짚모자 일당의 검사. 삼도류와 높은 수준의 무장색·패왕색 강화를 결합해 강한 공방과 결정력을 발휘한다.',
    combatProfile: {
      combatStyles: ['일도류·이도류·삼도류', '근접 검술', '비상 참격', '공격 차단·패링', '아수라'],
      specialTraits: [],
      haki: { characterId: 'zoro', capabilities: [
        { type: 'armament', status: 'confirmed', note: '검에 무장색을 적용하며 엔마를 포함한 검술에 높은 수준으로 운용한다.' },
        { type: 'observation', status: 'confirmed', note: '견문색 보유가 공식 설정으로 확인된다.' },
        { type: 'conquerors', status: 'confirmed', note: '카이도와 킹 전투에서 패왕색이 확인된다.', infusion: { status: 'confirmed', note: '킹전에서 세 검에 패왕색을 두르는 공격 운용이 확인된다.' } },
      ]},
      sources: [
        { label: 'ONE PIECE.com', reference: '조로 공식 캐릭터 자료' },
        { label: '원작 Evidence', reference: 'Ch. 195 / 485 / 1009-1010 / 1032-1035 / Egghead' },
      ],
    },
  },
  {
    id: 'sanji', name: '상디', crewId: 'straw-hat-pirates',
    description: '밀짚모자 일당의 요리사이자 전투원. 발기술, 초고속 기동, 공중전과 각성한 신체·Ifrit Jambe를 결합한다.',
    combatProfile: {
      combatStyles: ['발기술', '공중전', 'Sky Walk', 'Diable Jambe', 'Ifrit Jambe', '고속 요격·구조'],
      specialTraits: [{
        id: 'special-sanji-genetic-modification', category: 'modification', name: 'Germa 계열 신체 개조 각성', status: 'confirmed',
        description: '오니가시마에서 외골격·높은 신체 강도와 회복 특성이 각성해 전투에 직접 사용된다.',
        evidenceIds: ['evidence-sanji-exoskeleton-1028', 'evidence-sanji-speed-ifrit-1034'],
        limitations: '회복·외골격의 존재 자체를 Stamina나 Defense에 자동 가산하지 않고 실제 전투 성과를 근거로 평가한다.',
      }],
      haki: { characterId: 'sanji', capabilities: [
        { type: 'armament', status: 'confirmed', note: '무장색을 발기술과 결합하며 Ifrit Jambe 성립 요소로 직접 언급된다.' },
        { type: 'observation', status: 'confirmed', note: '견문색을 전투·탐지에 사용한다.' },
        { type: 'conquerors', status: 'not-confirmed', note: '현재 채택한 원작 근거에서 패왕색 보유가 확인되지 않는다.', infusion: { status: 'not-confirmed' } },
      ]},
      sources: [
        { label: 'ONE PIECE.com', reference: '상디 공식 캐릭터 자료' },
        { label: '원작 Evidence', reference: 'Ch. 862 / 886 / 1028 / 1034 / 1107 / Egghead' },
      ],
    },
  },
  {
    id: 'jinbe', name: '징베', crewId: 'straw-hat-pirates',
    description: '밀짚모자 일당의 조타수. 어인공수도와 무장색을 기반으로 안정적인 공방을 수행하는 베테랑 전투원이다.',
    combatProfile: {
      combatStyles: ['어인공수도', '어인유술', '근접 격투', '물 활용 공격·방어'],
      specialTraits: [{
        id: 'special-jinbe-fishman', category: 'race', name: '어인 생리', status: 'confirmed',
        description: '어인으로서 수중 활동과 물을 활용한 전투에 유리한 신체·환경적 특성을 가진다.',
        evidenceIds: ['evidence-jinbe-fishman-karate-629'],
        limitations: '종족 자체를 고정 점수로 가산하지 않고 실제 전투 활용만 Core Stat 근거로 사용한다.',
      }],
      haki: { characterId: 'jinbe', capabilities: [
        { type: 'armament', status: 'confirmed', note: '빅맘과 후즈후를 상대로 실제 방어·공격 적용이 확인된다.' },
        { type: 'observation', status: 'confirmed', note: '견문색 보유가 공식 설정으로 확인된다.' },
        { type: 'conquerors', status: 'not-confirmed', note: '현재 채택한 원작 근거에서 패왕색 보유가 확인되지 않는다.', infusion: { status: 'not-confirmed' } },
      ]},
      sources: [
        { label: 'ONE PIECE.com', reference: '징베 공식 캐릭터 자료' },
        { label: '원작 Evidence', reference: 'Ch. 552 / 629 / 890 / 1018' },
      ],
    },
  }

  {
    id: 'shanks', name: '샹크스', crewId: 'red-hair-pirates',
    description: '빨간 머리 해적단 선장. 검술과 최상위권 패기를 결합해 짧은 순간에 전황을 결정하는 전투원이다.',
    combatProfile: { combatStyles: ['검술', '패왕색 강화', '미래예지 기반 선제 대응', '고속 요격'], specialTraits: [],
      haki: { characterId: 'shanks', capabilities: [
        { type: 'armament', status: 'confirmed', note: '검술과 함께 무장색을 운용하는 최상위 패기 사용자로 평가한다.' },
        { type: 'observation', status: 'confirmed', note: 'Kid전에서 미래의 피해를 직접 예측하고 선제 대응한다.' },
        { type: 'conquerors', status: 'confirmed', note: '원작에서 장거리·광역 패왕색과 공격 적용이 반복 확인된다.', infusion: { status: 'confirmed', note: 'Kamusari의 공격 묘사를 패왕색 강화 적용 근거로 평가한다.' } },
      ]},
      sources: [{ label: '원작 Evidence', reference: 'Ch. 434 / 579 / 1055 / 1079' }],
    },
  },
  {
    id: 'garp', name: '몽키 D. 가프', crewId: 'marines',
    description: '해군 영웅. 평가는 로저와 반복적으로 사투한 전성기를 기준으로 하며, 노년 하치노스 전투를 기술·기동·지속력의 직접 하한 근거로 함께 사용한다.',
    combatProfile: { combatStyles: ['권격', '고강도 패기', '고속 근접전', 'Galaxy 계열 광역 타격'], specialTraits: [],
      haki: { characterId: 'garp', capabilities: [
        { type: 'armament', status: 'confirmed', note: '권격과 충돌에서 고수준 무장색 운용이 확인된다.' },
        { type: 'observation', status: 'confirmed', note: '해군 최고위 전투원으로서 보유가 확인되는 패기 범주다.' },
        { type: 'conquerors', status: 'unclear', note: '강한 패기 연출은 있으나 현재 데이터에서는 패왕색 보유 자체를 확정 수치 근거로 분리하지 않는다.', infusion: { status: 'unclear' } },
      ]},
      sources: [{ label: '원작 Evidence', reference: 'Roger 회고 / Ch. 1080 / 1081 / 1087 / 1088' }],
    },
  },
  {
    id: 'akainu', name: '사카즈키', crewId: 'marines',
    description: '해군 원수. 마그마 능력의 높은 살상력과 정상결전 및 쿠잔과의 10일 결투에서 확인되는 지속력이 핵심이다.',
    combatProfile: { combatStyles: ['마그마 근접 타격', '광역 마그마 공격', '장기전'], specialTraits: [{ id: 'special-akainu-magma', category: 'devil-fruit', name: '마그마그 열매', status: 'confirmed', description: '마그마를 생성·변형해 높은 열과 관통력을 공격에 사용한다.' }],
      haki: { characterId: 'akainu', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Marineford / Punk Hazard 10-day duel / Egghead-era Kuma encounter' }] },
  },
  {
    id: 'kuzan', name: '쿠잔', crewId: 'marines',
    description: '전 해군대장. 빙결에 의한 광역 제압·환경 통제와 가프식 무투를 함께 사용하는 복합 전투원이다.',
    combatProfile: { combatStyles: ['빙결', '광역 제압', '근접 무투', 'Ice Glove'], specialTraits: [{ id: 'special-kuzan-ice', category: 'devil-fruit', name: '얼음얼음 열매', status: 'confirmed', description: '빙결을 공격·방어·이동·지형 통제에 폭넓게 사용한다.' }],
      haki: { characterId: 'kuzan', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Marineford / Punk Hazard 10-day duel / Ch. 1081 / 1087' }] },
  },
  {
    id: 'kizaru', name: '보르살리노', crewId: 'marines',
    description: '해군대장. 빛 기반 최고 수준 기동과 레이저·광검·분신을 결합하며 Egghead에서 임무 우선 판단과 높은 전투 지속력을 보였다.',
    combatProfile: { combatStyles: ['광속계 기동', '레이저', '광검', '빛 분신', '고속 발차기'], specialTraits: [{ id: 'special-kizaru-light', category: 'devil-fruit', name: '번쩍번쩍 열매', status: 'confirmed', description: '빛으로 이동·사격·무기·분신을 구현한다.' }],
      haki: { characterId: 'kizaru', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Sabaody / Marineford / Egghead' }] },
  },
  {
    id: 'fujitora', name: '잇쇼', crewId: 'marines',
    description: '해군대장. 검술과 중력 조작, 운석 호출을 결합해 광범위한 전장을 통제한다.',
    combatProfile: { combatStyles: ['검술', '중력 조작', '운석 공격', '광역 제압'], specialTraits: [{ id: 'special-fujitora-gravity', category: 'devil-fruit', name: '중력 조작 능력', status: 'confirmed', description: '중력을 증감·방향화하고 운석까지 전장에 끌어들인다.' }],
      haki: { characterId: 'fujitora', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed', note: '시각 없이 전장을 파악하는 전투 운용이 핵심이다.' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Dressrosa' }] },
  },
  {
    id: 'ryokugyu', name: '아라마키', crewId: 'marines',
    description: '해군대장. 식물 생성·흡수·구속·재생·비행을 통해 넓은 전장을 장악하는 능력형 전투원이다.',
    combatProfile: { combatStyles: ['식물 생성', '광역 구속', '수분 흡수', '재생', '비행'], specialTraits: [{ id: 'special-ryokugyu-forest', category: 'devil-fruit', name: '숲숲 열매', status: 'confirmed', description: '식물과 숲을 생성·변형해 구속·흡수·재생·이동에 사용한다.' }],
      haki: { characterId: 'ryokugyu', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Wano Ch. 1053-1055' }] },
  },
]
