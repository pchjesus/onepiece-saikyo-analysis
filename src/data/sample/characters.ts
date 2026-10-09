import type { Character } from '../../domain/character/types'

export const sampleCharacters: Character[] = [
  {
    id: 'marco',
    name: '마르코',
    crewId: 'whitebeard-pirates', knownAs: [{ kind: 'epithet', name: '불사조 마르코', source: { label: 'ONE PIECE.com', reference: '마르코 공식 캐릭터 페이지 — 通称「不死鳥マルコ」' } }],
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
    crewId: 'whitebeard-pirates', knownAs: [{ kind: 'epithet', name: '다이아몬드 죠즈', source: { label: 'ONE PIECE.com', reference: '죠즈 공식 캐릭터 페이지 — 通称「ダイヤモンド・ジョズ」' } }],
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
    crewId: 'whitebeard-pirates', knownAs: [{ kind: 'epithet', name: '화검의 비스타', source: { label: 'ONE PIECE.com', reference: '비스타 공식 캐릭터 페이지 — 通称「花剣のビスタ」' } }],
    description: '흰수염 해적단 5번대 대장. 이도류 대검호로 미호크와 직접 검술 공방을 성립시킨다.',
    combatProfile: {
      combatStyles: ['이도류 검술', '정밀 검격'],
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
    name: '알베르',
    crewId: 'beasts-pirates', knownAs: [
      { kind: 'alias', name: '킹', source: { label: 'ONE PIECE.com', reference: 'TV Anime Episode 1062 / VIVRE CARD 1308 — 알베르가 카이도에게 「キング」라는 이름을 받음' } },
      { kind: 'epithet', name: '화재의 킹', source: { label: 'ONE PIECE.com', reference: '킹 공식 캐릭터 페이지 — 通称「火災のキング」' } },
    ],
    description: '본명 알베르. 카이도에게 「킹」이라는 이름을 받은 백수 해적단 대간판으로, 루나리아족 특성과 고대종 능력·검·화염을 조합해 싸운다.',
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
    crewId: 'beasts-pirates', knownAs: [{ kind: 'epithet', name: '역재의 퀸', source: { label: 'ONE PIECE.com', reference: '퀸 공식 캐릭터 페이지 — 通称「疫災のクイーン」' } }],
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
    crewId: 'beasts-pirates', knownAs: [{ kind: 'epithet', name: '가뭄의 잭', source: { label: 'ONE PIECE.com', reference: '잭 공식 캐릭터 페이지 — 通称「旱害のジャック」' } }],
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
    name: '샬롯 카타쿠리',
    crewId: 'big-mom-pirates', knownAs: [],
    description: '빅 맘 해적단 스위트 3장성. 모치 능력과 고도로 단련된 견문색을 결합하는 전투가 핵심이다.',
    combatProfile: {
      combatStyles: ['근접 격투', '삼지창', '중·원거리 모치 공격', '미래예지 기반 회피·대응'],
      specialTraits: [
        {
          id: 'special-katakuri-mochi',
          category: 'devil-fruit',
          awakening: 'confirmed',
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
        excellenceAssessments: [
          { type: 'observation', basis: 'direct-application', interpretation: '단련된 견문색으로 짧은 미래를 보고 루피의 움직임에 반복적으로 회피·대응하는 뛰어난 응용이 확인된다.', uncertainty: '침착함이 흐트러지면 예지·회피의 효과가 감소한다. 순수 신체 속도나 판단의 중복 보너스로 자동 가산하지 않는다.', evidenceIds: ['evidence-katakuri-future-sight-881-884'] },
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
    name: '샬롯 스무디',
    crewId: 'big-mom-pirates', knownAs: [],
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
    name: '샬롯 크래커',
    crewId: 'big-mom-pirates', knownAs: [{ kind: 'epithet', name: '천수의 크래커', source: { label: 'ONE PIECE.com', reference: '샬롯 크래커 공식 캐릭터 페이지 — 通称「千手のクラッカー」' } }],
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
    id: 'zoro', name: '롤로노아 조로', crewId: 'straw-hat-pirates', knownAs: [{ kind: 'epithet', name: '해적 사냥꾼 조로', source: { label: 'ONE PIECE.com', reference: '롤로노아 조로 공식 캐릭터 페이지 — 通称「海賊狩りのゾロ」' } }],
    description: '밀짚모자 일당의 검사. 삼도류와 높은 수준의 무장색·패왕색 강화를 결합해 강한 공방과 결정력을 발휘한다.',
    combatProfile: {
      combatStyles: ['일도류·이도류·삼도류', '비상 참격', '공격 차단·패링', '아수라'],
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
    id: 'sanji', name: '상디', crewId: 'straw-hat-pirates', knownAs: [{ kind: 'epithet', name: '검은 다리 상디', source: { label: 'ONE PIECE.com', reference: '상디 공식 캐릭터 페이지 — 通称「黒足のサンジ」' } }],
    description: '밀짚모자 일당의 요리사이자 전투원. 발기술, 초고속 기동, 공중전과 각성한 신체·Ifrit Jambe를 결합한다.',
    combatProfile: {
      combatStyles: ['발기술', '스카이워크', 'Diable Jambe', 'Ifrit Jambe', '고속 요격·구조'],
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
    id: 'jinbe', name: '징베', crewId: 'straw-hat-pirates', knownAs: [{ kind: 'epithet', name: '바다의 협객 징베', source: { label: 'ONE PIECE.com', reference: '징베 공식 캐릭터 페이지 — 通称「海侠のジンベエ」' } }],
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
  },

  {
    id: 'shanks', name: '샹크스', crewId: 'red-hair-pirates', knownAs: [{ kind: 'epithet', name: '빨간 머리 샹크스', source: { label: 'ONE PIECE.com', reference: '공식 상품·기사 표기 — 「赤髪のシャンクス」' } }],
    description: '빨간 머리 해적단 선장. 검술과 최상위권 패기를 결합해 짧은 순간에 전황을 결정하는 전투원이다.',
    combatProfile: { combatStyles: ['검술', '패왕색 강화', '미래예지 기반 선제 대응', '고속 요격'], specialTraits: [],
      haki: { characterId: 'shanks', capabilities: [
        { type: 'armament', status: 'confirmed', note: '검술과 함께 무장색을 운용하는 최상위 패기 사용자로 평가한다.' },
        { type: 'observation', status: 'confirmed', note: 'Kid전에서 미래의 피해를 직접 예측하고 선제 대응한다.' },
        { type: 'conquerors', status: 'confirmed', note: '원작에서 장거리·광역 패왕색과 공격 적용이 반복 확인된다.', infusion: { status: 'confirmed', note: 'Kamusari의 공격 묘사를 패왕색 강화 적용 근거로 평가한다.' } },
      ], excellenceAssessments: [
        { type: 'conquerors', basis: 'direct-application', interpretation: '원거리 패왕색 발산으로 아라마키에게 강한 압박을 준 직접 응용과 키드전 패기 검격 성과가 확인된다.', uncertainty: '아라마키의 철수에는 빨간 머리 해적단 존재 및 앞선 전황도 영향이 있고, 키드전의 동일 타격을 여러 Stat에 자동 가산하지 않는다.', evidenceIds: ['evidence-shanks-aramaki-haki-1055', 'evidence-shanks-kid-divine-departure-1079'] },
      ]},
      sources: [{ label: '원작 Evidence', reference: 'Ch. 434 / 579 / 1055 / 1079' }],
    },
  },
  {
    id: 'garp', name: '몽키 D. 가프', crewId: 'marines', knownAs: [{ kind: 'title', name: '해군의 영웅', source: { label: 'ONE PIECE.com', reference: '몽키 D. 가프 공식 캐릭터 페이지 — 「海軍の英雄」' } }],
    description: '해군 영웅. 평가는 로저와 반복적으로 사투한 전성기를 기준으로 하며, 노년 하치노스 전투를 기술·기동·지속력의 직접 하한 근거로 함께 사용한다.',
    combatProfile: { combatStyles: ['권격', '고강도 패기', '고속 근접전', 'Galaxy 계열 광역 타격'], specialTraits: [],
      haki: { characterId: 'garp', capabilities: [
        { type: 'armament', status: 'confirmed', note: '권격과 충돌에서 고수준 무장색 운용이 확인된다.' },
        { type: 'observation', status: 'confirmed', note: '해군 최고위 전투원으로서 보유가 확인되는 패기 범주다.' },
        { type: 'conquerors', status: 'confirmed', note: 'God Valley 회상 Ch.1165에서 로저와 함께 Supreme King Haki를 전투에 사용하는 직접 근거가 확인된다.', infusion: { status: 'confirmed', note: 'Ch.1165에서 공격·방어 공방에 Supreme King Haki를 집중해 사용한 사실을 확인한다. 공동전 성과를 가프 단독 수치로 환산하지 않는다.' } },
      ], excellenceAssessments: [
        { type: 'armament', basis: 'strong-inference', interpretation: '갤럭시 임팩트와 쿠잔 상대 권격의 높은 위력과 무장색 교환은 뛰어난 무장색 숙련을 시사한다.', uncertainty: '충격파·맨손 근력·패왕색의 기여와 무장색 기여의 비율을 장면별로 분해하기 어렵고 무장색 최강이라는 공식 지정은 확인되지 않는다.', evidenceIds: ['evidence-garp-galaxy-impact-1080', 'evidence-garp-kuzan-haki-1087'] },
        { type: 'conquerors', basis: 'direct-application', interpretation: '갓 밸리에서 로저와 함께 패왕색을 집중한 최고 수준 합동 공격을 성립시킨 전성기 응용이 확인된다.', uncertainty: '공동 공격이므로 가프 단독 기여를 산정할 수 없고, 현재 노년 상태에서 동일한 출력을 확인한 근거가 아니다.', eraContext: '전성기 갓 밸리 (Ch.1165)', evidenceIds: ['evidence-garp-roger-rocks-1165'] },
      ]},
      sources: [{ label: '원작 Evidence', reference: 'God Valley Ch. 1165 / Ch. 1080 / 1081 / 1087 / 1088' }],
    },
  },
  {
    id: 'akainu', name: '사카즈키', crewId: 'marines', knownAs: [{ kind: 'alias', name: '아카이누', source: { label: 'ONE PIECE.com', reference: '사카즈키 공식 캐릭터 페이지 — 通称「赤犬」' } }],
    description: '해군 원수. 마그마 능력의 높은 살상력과 정상결전 및 쿠잔과의 10일 결투에서 확인되는 지속력이 핵심이다.',
    combatProfile: { combatStyles: ['마그마 근접 타격', '광역 마그마 공격', '장기전'], specialTraits: [{ id: 'special-akainu-magma', category: 'devil-fruit', name: '마그마그 열매', status: 'confirmed', description: '마그마를 생성·변형해 높은 열과 관통력을 공격에 사용한다.', evidenceIds: [] }],
      haki: { characterId: 'akainu', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Marineford / Punk Hazard 10-day duel / Egghead-era Kuma encounter' }] },
  },
  {
    id: 'kuzan', name: '쿠잔', crewId: 'blackbeard-pirates', knownAs: [{ kind: 'alias', name: '아오키지', source: { label: 'ONE PIECE.com', reference: '쿠잔 공식 캐릭터 페이지 — 通称「青雉」' } }],
    description: '전 해군대장. 빙결에 의한 광역 제압·환경 통제와 가프식 무투를 함께 사용하는 복합 전투원이다.',
    combatProfile: { combatStyles: ['빙결', '광역 제압', '근접 무투', 'Ice Glove'], specialTraits: [{ id: 'special-kuzan-ice', category: 'devil-fruit', name: '얼음얼음 열매', status: 'confirmed', description: '빙결을 공격·방어·이동·지형 통제에 폭넓게 사용한다.', evidenceIds: [] }],
      haki: { characterId: 'kuzan', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Marineford / Punk Hazard 10-day duel / Ch. 1081 / 1087' }] },
  },
  {
    id: 'kizaru', name: '보르살리노', crewId: 'marines', knownAs: [{ kind: 'alias', name: '키자루', source: { label: 'ONE PIECE.com', reference: '보르살리노 공식 캐릭터 페이지 — 通称「黄猿」' } }],
    description: '해군대장. 빛 기반 최고 수준 기동과 레이저·광검·분신을 결합하며 Egghead에서 임무 우선 판단과 높은 전투 지속력을 보였다.',
    combatProfile: { combatStyles: ['광속계 기동', '레이저', '광검', '빛 분신', '고속 발차기'], specialTraits: [{ id: 'special-kizaru-light', category: 'devil-fruit', name: '번쩍번쩍 열매', status: 'confirmed', description: '빛으로 이동·사격·무기·분신을 구현한다.', evidenceIds: [] }],
      haki: { characterId: 'kizaru', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Sabaody / Marineford / Egghead' }] },
  },
  {
    id: 'fujitora', name: '잇쇼', crewId: 'marines', knownAs: [{ kind: 'alias', name: '후지토라', source: { label: 'ONE PIECE.com', reference: '잇쇼 공식 캐릭터 페이지 — 通称「藤虎」' } }],
    description: '해군대장. 검술과 중력 조작, 운석 호출을 결합해 광범위한 전장을 통제한다.',
    combatProfile: { combatStyles: ['검술', '중력 조작', '운석 공격', '광역 제압'], specialTraits: [{ id: 'special-fujitora-gravity', category: 'devil-fruit', name: '중력 조작 능력', status: 'confirmed', description: '중력을 증감·방향화하고 운석까지 전장에 끌어들인다.', evidenceIds: [] }],
      haki: { characterId: 'fujitora', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed', note: '시각 없이 전장을 파악하는 전투 운용이 핵심이다.' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Dressrosa' }] },
  },
  {
    id: 'ryokugyu', name: '아라마키', crewId: 'marines', knownAs: [{ kind: 'alias', name: '료쿠규', source: { label: 'ONE PIECE.com', reference: '공식 ONE PIECE.com 표기 — 「緑牛」ことアラマキ' } }],
    description: '해군대장. 식물 생성·흡수·구속·재생·비행을 통해 넓은 전장을 장악하는 능력형 전투원이다.',
    combatProfile: { combatStyles: ['식물 생성', '광역 구속', '수분 흡수', '재생', '비행'], specialTraits: [{ id: 'special-ryokugyu-forest', category: 'devil-fruit', name: '숲숲 열매', status: 'confirmed', description: '식물과 숲을 생성·변형해 구속·흡수·재생·이동에 사용한다.', evidenceIds: [] }],
      haki: { characterId: 'ryokugyu', capabilities: [
        { type: 'armament', status: 'confirmed' }, { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]}, sources: [{ label: '원작 Evidence', reference: 'Wano Ch. 1053-1055' }] },
  },

  {
    id: 'teach', name: '마샬 D. 티치', crewId: 'blackbeard-pirates', knownAs: [{ kind: 'epithet', name: '검은 수염', source: { label: 'ONE PIECE.com', reference: '마샬 D. 티치 공식 캐릭터 페이지 — 通称「黒ひげ」' } }],
    description: '검은 수염 해적단 제독. 어둠어둠 열매와 흔들흔들 열매를 동시에 운용하며, 현재 확인된 실전 운용만 수치화한다.',
    combatProfile: {
      combatStyles: ['어둠 흡인·능력 봉쇄', '지진 충격파', '근접 격투', '광역 파괴'],
      specialTraits: [
        { id: 'special-teach-darkness', category: 'devil-fruit', name: '어둠어둠 열매', status: 'confirmed', description: '어둠을 통해 대상을 끌어당기고 접촉한 능력자의 악마의 열매 능력을 봉쇄한다.', evidenceIds: ['evidence-teach-ace-440-441'], limitations: '공격을 자연계처럼 흘리는 묘사가 없고 피격 시 고통이 크게 표현된다.' },
        { id: 'special-teach-quake', category: 'devil-fruit', name: '흔들흔들 열매', status: 'confirmed', description: '흰수염 사후 획득한 지진 능력을 충격파·광역 파괴에 사용한다.', evidenceIds: ['evidence-teach-gura-577', 'evidence-teach-law-1063-1064'], limitations: '현재 숙련도를 전성기 흰수염과 자동 동급으로 보지 않는다.' },
      ],
      haki: { characterId: 'teach', capabilities: [
        { type: 'armament', status: 'confirmed', note: '후속 원작 전투에서 무장색 사용이 확인된다.' },
        { type: 'observation', status: 'confirmed', note: '공식 보조자료 기준 보유가 확인되는 것으로 분류한다.' },
        { type: 'conquerors', status: 'not-confirmed', note: '현재 채택 근거에서 패왕색 보유가 확인되지 않는다.', infusion: { status: 'not-confirmed' } },
      ]},
      sources: [{ label: '원작 Evidence', reference: 'Ch. 440-441 / 576-577 / 1063-1064 / 1081' }],
    },
  },
  {
    id: 'shiryu', name: '시류', crewId: 'blackbeard-pirates', knownAs: [{ kind: 'epithet', name: '비의 시류', source: { label: 'ONE PIECE.com', reference: '시류 공식 캐릭터 페이지 — 通称「雨のシリュウ」' } }],
    description: '검은 수염 해적단 2번선 선장. 검술과 투명투명 열매를 결합한 은신·기습 전투가 핵심이며 현재 7축 평가는 E2 잠정값이다.',
    combatProfile: {
      combatStyles: ['검술', '투명화', '은신·기습'],
      specialTraits: [
        { id: 'special-shiryu-invisibility', category: 'devil-fruit', name: '투명투명 열매', status: 'confirmed', description: '자신과 소지품을 투명하게 만들어 은신·기습·위치 선정에 활용한다.', evidenceIds: ['evidence-shiryu-garp-1087'], limitations: '투명화 자체를 순수 Speed나 높은 Attack으로 중복 환산하지 않는다.' },
      ],
      haki: { characterId: 'shiryu', capabilities: [
        { type: 'armament', status: 'confirmed', note: '1087화의 시류 검격에서 무장색 사용이 확인된다. 코비를 노린 투명 기습이라는 전투 조건 때문에 정면 Attack 결정력으로 과대평가하지 않는다.' },
        { type: 'observation', status: 'unclear', note: '현재 채택 근거만으로 수치 가산하지 않는다.' },
        { type: 'conquerors', status: 'not-confirmed', infusion: { status: 'not-confirmed' } },
      ]},
      sources: [{ label: '원작 Evidence', reference: 'Impel Down / Ch. 1087' }],
    },
  },
  {
    id: 'burgess', name: '지저스 바제스', crewId: 'blackbeard-pirates', knownAs: [{ kind: 'epithet', name: '챔피언', source: { label: 'ONE PIECE.com', reference: '지저스 바제스 공식 캐릭터 페이지 — 通称「チャンピオン」' } }],
    description: '검은 수염 해적단 1번선 선장. 강한 완력과 힘힘 열매를 바탕으로 한 근접 격투·대형 투척이 중심이다.',
    combatProfile: {
      combatStyles: ['완력 기반 근접전', '대형 물체 투척'],
      specialTraits: [
        { id: 'special-burgess-strength', category: 'devil-fruit', name: '힘힘 열매', status: 'confirmed', description: '비정상적으로 큰 물체를 들어 던질 수 있을 정도로 완력을 증폭한다.', evidenceIds: ['evidence-burgess-mountain-1063'], limitations: '완력의 크기를 동급 강자에 대한 실제 Attack 결정력과 동일시하지 않는다.' },
      ],
      haki: { characterId: 'burgess', capabilities: [
        { type: 'armament', status: 'confirmed', note: 'Dressrosa에서 근접 공격에 무장색을 사용하는 장면이 확인된다.' },
        { type: 'observation', status: 'unclear', note: '현재 채택 근거로 별도 수치 가산하지 않는다.' },
        { type: 'conquerors', status: 'not-confirmed', infusion: { status: 'not-confirmed' } },
      ]},
      sources: [{ label: '원작 Evidence', reference: 'Dressrosa Ch. 737-792 / Ch. 1063' }],
    },
  },
  {
    id: 'van-augur', name: '반 오거', crewId: 'blackbeard-pirates', knownAs: [],
    description: '검은 수염 해적단 3번선 선장. 초장거리 저격과 워프워프 열매를 결합한 위치 조정·지원에 특화된다.',
    combatProfile: {
      combatStyles: ['초장거리 저격', '순간이동', '아군 위치 지원'],
      specialTraits: [
        { id: 'special-augur-warp', category: 'devil-fruit', name: '워프워프 열매', status: 'confirmed', description: '자신과 다른 대상을 순간적으로 다른 위치로 이동시킨다.', evidenceIds: ['evidence-augur-warp-1063-1064'], limitations: '공간이동을 순수 신체 Speed로 중복 계산하지 않는다.' },
      ],
      haki: { characterId: 'van-augur', capabilities: [
        { type: 'armament', status: 'unclear' }, { type: 'observation', status: 'unclear' },
        { type: 'conquerors', status: 'not-confirmed', infusion: { status: 'not-confirmed' } },
      ]},
      sources: [{ label: '원작 Evidence', reference: 'Winner Island Ch. 1063-1064' }],
    },
  },
  {
    id: 'pizarro', name: '아발로 피사로', crewId: 'blackbeard-pirates', knownAs: [{ kind: 'epithet', name: '악정왕 아발로 피사로', source: { label: 'ONE PIECE.com', reference: '아발로 피사로 공식 캐릭터 페이지 — 通称「悪政王アバロ・ピサロ」' } }],
    description: '검은 수염 해적단 4번선 선장. 섬섬 열매로 섬 전체와 동화해 구조물과 거대한 신체를 조작하는 전장형 능력자다.',
    combatProfile: {
      combatStyles: ['섬 동화', '거대 신체 조작', '광역 전장 통제'],
      specialTraits: [
        { id: 'special-pizarro-island', category: 'devil-fruit', name: '섬섬 열매', status: 'confirmed', description: '섬 전체와 동화해 지형·구조물을 자신의 신체처럼 움직인다.', evidenceIds: ['evidence-pizarro-island-1087-1088', 'evidence-pizarro-damage-link-1088'], limitations: '동화한 섬 신체의 손상이 본체에도 전달될 수 있으며 공격 규모를 개인 Attack과 동일시하지 않는다.' },
      ],
      haki: { characterId: 'pizarro', capabilities: [
        { type: 'armament', status: 'unclear' }, { type: 'observation', status: 'unclear' },
        { type: 'conquerors', status: 'not-confirmed', infusion: { status: 'not-confirmed' } },
      ]},
      sources: [{ label: '원작 Evidence', reference: 'Hachinosu Ch. 1087-1088' }],
    },
  },

  {
    id: 'law',
    name: '트라팔가 로',
    crewId: 'seven-warlords', knownAs: [{ kind: 'epithet', name: '죽음의 외과의사 트라팔가 로', source: { label: 'ONE PIECE.com', reference: '트라팔가 로 공식 캐릭터 페이지 — 通称「死の外科医」' } }],
    description: '전 왕의 부하 칠무해이자 하트 해적단 선장. 오페오페 열매의 공간 조작·내부 파괴·각성을 검술과 결합한다.',
    combatProfile: {
      combatStyles: ['검술', 'ROOM 공간 조작', '위치 교환', '내부 파괴', '지원·구출'],
      specialTraits: [{
        id: 'special-law-ope',
        category: 'devil-fruit',
        awakening: 'confirmed',
        name: '오페오페 열매',
        status: 'confirmed',
        description: 'ROOM 안에서 위치·물체·신체를 조작하고, 각성 이후 K-ROOM·R-ROOM으로 내부 타격과 비접촉 효과를 운용한다.',
        evidenceIds: ['evidence-law-doflamingo-gamma-knife-781', 'evidence-law-big-mom-1039', 'evidence-law-puncture-wille-1039', 'evidence-law-teach-1064'],
        limitations: '강력한 기술과 각성은 체력 소모가 크며, 공간 조작의 존재 자체를 Speed·Versatility·Technique에 중복 가산하지 않는다.',
      }],
      haki: { characterId: 'law', capabilities: [
        { type: 'armament', status: 'confirmed', note: '무장색 보유는 공식 보조자료 및 전투 기록으로 확인되는 것으로 분류한다. Ch.1063의 능력 해제는 Haki의 강도를 보여주지만 유형을 임의로 특정하지 않는다.' },
        { type: 'observation', status: 'confirmed', note: '견문색 보유는 공식 보조자료에서 확인되는 것으로 분류한다.' },
        { type: 'conquerors', status: 'not-confirmed', note: '현재 채택 원작 근거에서 패왕색 보유가 확인되지 않는다.', infusion: { status: 'not-confirmed' } },
      ]},
      sources: [
        { label: '원작 Evidence', reference: 'Ch. 781 / 1039 / 1063-1064' },
      ],
    },
  },
  {
    id: 'doflamingo',
    name: '돈키호테 도플라밍고',
    crewId: 'seven-warlords', knownAs: [
      { kind: 'epithet', name: '천야차', source: { label: 'ONE PIECE.com', reference: '공식 P.O.P 상품 소개 — “天夜叉”ドンキホーテ・ドフラミンゴ' } },
      { kind: 'alias', name: '조커', source: { label: 'ONE PIECE.com', reference: 'Punk Hazard 공식 에피소드 안내 — 「ジョーカー」の正体がドフラミンゴ' } },
    ],
    description: '전 왕의 부하 칠무해. 실실 열매의 정밀 조작과 각성, 공중 기동·구속·분신·전장 통제를 결합한다.',
    combatProfile: {
      combatStyles: ['실 절단', '구속·조종', '공중 이동', '분신', 'Birdcage'],
      specialTraits: [{
        id: 'special-doflamingo-ito',
        category: 'devil-fruit',
        awakening: 'confirmed',
        name: '실실 열매',
        status: 'confirmed',
        description: '실을 절단·구속·조종·이동·분신·응급 봉합에 활용하고, 각성으로 주변 건물과 지형을 실로 변환한다.',
        evidenceIds: ['evidence-doflamingo-law-arm-769', 'evidence-doflamingo-organ-repair-781', 'evidence-doflamingo-awakening-785', 'evidence-doflamingo-birdcage-781-790'],
        limitations: 'Birdcage의 규모와 기술 개수를 단일 Attack이나 Versatility에 그대로 합산하지 않으며, 실 봉합은 완전한 치유가 아니다.',
      }],
      haki: { characterId: 'doflamingo', capabilities: [
        { type: 'armament', status: 'confirmed', note: 'Dressrosa 전투에서 공격·방어에 무장색을 사용하는 장면이 확인된다.' },
        { type: 'observation', status: 'confirmed', note: '공식 보조자료 기준 견문색 보유가 확인되는 것으로 분류한다.' },
        { type: 'conquerors', status: 'confirmed', note: '원작에서 기본 패왕색 사용이 확인된다.', infusion: { status: 'unclear', note: '패왕색을 공격에 두르는 고급 적용은 현재 채택 근거에서 확인하지 못한다.' } },
      ]},
      sources: [
        { label: '원작 Evidence', reference: 'Ch. 769 / 781 / 783-785 / 790' },
      ],
    },
  },
  {
    id: 'hancock',
    name: '보아 핸콕',
    crewId: 'seven-warlords', knownAs: [{ kind: 'epithet', name: '해적 여제 보아 핸콕', source: { label: 'ONE PIECE.com', reference: '보아 핸콕 공식 캐릭터 페이지 — 通称「海賊女帝」' } }],
    description: '전 왕의 부하 칠무해이자 구사 해적단 선장. 체술과 메로메로 열매의 석화 효과를 근·원거리 제압에 사용한다.',
    combatProfile: {
      combatStyles: ['근접 체술', '접촉 석화', '원거리 석화', '다수 제압'],
      specialTraits: [{
        id: 'special-hancock-mero',
        category: 'devil-fruit',
        name: '메로메로 열매',
        status: 'confirmed',
        description: '감정 조건을 이용한 광역 석화뿐 아니라 Slave Arrow·Perfume Femur 등 공격 형태로 석화 효과를 적용한다.',
        evidenceIds: ['evidence-hancock-marineford-559', 'evidence-hancock-amazon-lily-1059'],
        limitations: '석화의 높은 치명성은 Special/Matchup 승리조건으로 보존하고, 모든 상대에게 동일한 확률로 성립한다고 가정하지 않는다.',
      }],
      haki: { characterId: 'hancock', capabilities: [
        { type: 'armament', status: 'confirmed', note: '자연계 능력자에게 직접 타격을 성립시키는 등 무장색 운용이 확인된다.' },
        { type: 'observation', status: 'confirmed', note: '공식 보조자료 기준 견문색 보유가 확인되는 것으로 분류한다.' },
        { type: 'conquerors', status: 'confirmed', note: '패왕색 보유가 원작·공식 자료에서 확인된다.', infusion: { status: 'unclear', note: '공격에 두르는 고급 패왕색 적용은 현재 채택 근거에서 확인하지 못한다.' } },
      ]},
      sources: [
        { label: '원작 Evidence', reference: 'Marineford / Ch. 1059' },
      ],
    },
  },
  {
    id: 'mihawk', name: '쥬라큘 미호크', crewId: 'cross-guild',
    knownAs: [{ kind: 'epithet', name: '매의 눈', source: { label: 'ONE PIECE.com', reference: '쥬라큘 미호크 공식 캐릭터 페이지 — 「鷹の目」' } }],
    description: '크로스 길드의 핵심 전력. 세계 최강의 검사라는 공식 위상과 흑도 「夜」를 바탕으로 싸우며, 제한된 직접 표본과 샹크스와의 공식 경쟁 관계를 함께 고려한 E2 잠정 평가 대상이다.',
    combatProfile: {
      combatStyles: ['검술', '원거리 비상 참격', '정밀 절단'],
      specialTraits: [{ id: 'special-mihawk-yoru', category: 'equipment', name: '흑도 「夜」', status: 'confirmed',
        description: '최상대업물 12공 중 하나인 흑도 「夜」를 사용해 대형 참격과 정밀 검술을 수행한다.',
        evidenceIds: ['evidence-mihawk-world-strongest-profile', 'evidence-mihawk-zoro-49-51'],
        limitations: '흑도 보유 자체를 Haki Raw Contribution이나 모든 Core Stat의 자동 가산으로 취급하지 않는다.' }],
      haki: { characterId: 'mihawk', capabilities: [
        { type: 'armament', status: 'confirmed', note: 'Ch.779 수련 회상에서 조로에게 패기를 검에 두르는 원리를 지도했고 공식 보조자료에서도 보유가 확인된다. 영구 흑도 제작의 구체 기전은 미확정이다.' },
        { type: 'observation', status: 'confirmed', note: '공식 보조자료에서 보유가 확인되지만 실제 Stat Application은 별도 근거가 필요하다.' },
        { type: 'conquerors', status: 'unclear', note: '패왕색에 대한 높은 이해는 확인되지만 본인의 사용은 직접 확인되지 않았다.', infusion: { status: 'unclear' } },
      ], excellenceAssessments: [
        { type: 'armament', basis: 'strong-inference', interpretation: '영구 흑도 「夜」의 사용과 조로에게 무장색 검술을 지도한 성과는 최고급 무장색의 깊은 이해·숙련을 시사한다.', uncertainty: '미호크가 요루를 직접 영구 흑도화한 과정과 무장색의 정확한 역할·강도는 미공개다. 흑도 자체를 패기 영구경화와 동일시하지 않는다.', evidenceIds: ['evidence-mihawk-world-strongest-profile', 'evidence-mihawk-armament-instruction-779'] },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '쥬라큘 미호크 공식 캐릭터 페이지 — 세계 최강의 검사 / 흑도 「夜」' },
        { label: '원작 Evidence', reference: 'Ch. 49-51 / 553 / 560-562 / 1058 / 1194' }],
    },
  },
  {
    id: 'crocodile', name: '크로커다일', crewId: 'cross-guild', knownAs: [],
    description: '크로스 길드 공동 창설자. 모래모래 열매의 높은 숙련과 전장 통제·상황 판단을 강점으로 보되 현재 직접 상위권 전투 표본 부족 때문에 신체·공방 수치는 보수적으로 둔 E2 잠정 평가 대상이다.',
    combatProfile: {
      combatStyles: ['모래화', '근·원거리 모래 공격', '탈수', '지형 제어', '갈고리·독 활용'],
      specialTraits: [{ id: 'special-crocodile-sand', category: 'devil-fruit', name: '모래모래 열매', status: 'confirmed',
        description: '신체를 모래로 바꾸고 모래폭풍·절단·탈수·지형 제어에 활용한다.',
        evidenceIds: ['evidence-crocodile-alabasta-mastery-178-209', 'evidence-crocodile-water-weakness-199'],
        limitations: '물·혈액 등으로 모래 신체의 유동성이 제한되면 물리 타격이 성립할 수 있으며 자연계 회피를 절대 방어로 보지 않는다.' }],
      haki: { characterId: 'crocodile', capabilities: [
        { type: 'armament', status: 'unclear', note: '현재 채택 근거에서 보유 및 실제 적용 타입을 확정하지 않아 수치 가산하지 않는다.' },
        { type: 'observation', status: 'unclear', note: '현재 채택 근거에서 명시적 확인이 부족하다.' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '크로커다일 공식 캐릭터 페이지' },
        { label: '원작 Evidence', reference: 'Alabasta Ch. 178-209 / Marineford Ch. 560-578 / Ch. 1058' }],
    },
  },
  {
    id: 'buggy', name: '버기', crewId: 'cross-guild', knownAs: [],
    description: '크로스 길드의 사황으로 대외적으로 인식되는 인물. Character master pool에는 등록하되 현재 7 Core Stat을 비교할 직접 전투 Evidence가 부족해 E3 미평가로 유지한다.',
    combatProfile: {
      combatStyles: ['바라바라 능력', '신체 분리·재결합', '혼전 생존'],
      specialTraits: [{ id: 'special-buggy-chop', category: 'devil-fruit', name: '동강동강 열매', status: 'confirmed',
        description: '신체를 분리·재결합하며 참격 계열 공격과 특수한 상호작용을 보인다.', evidenceIds: [],
        limitations: '특수 상호작용의 존재를 일반 Defense나 현재 상위권 전투력으로 환산하지 않는다.' }],
      haki: { characterId: 'buggy', capabilities: [
        { type: 'armament', status: 'unclear' }, { type: 'observation', status: 'unclear' },
        { type: 'conquerors', status: 'unclear', infusion: { status: 'unclear' } },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '버기 공식 캐릭터 페이지 / 크로스 길드 공식 자료' }],
    },
  },

  {
    id: 'roger', name: '골 D. 로저', crewId: 'roger-pirates',
    knownAs: [{ kind: 'title', name: '해적왕', source: { label: 'ONE PIECE.com', reference: '골 D. 로저 공식 캐릭터 페이지 — 역사상 유일한 해적왕' } }],
    description: '로저 해적단 선장. 검술과 최고 수준의 패왕색을 결합한 전성기 전투를 기준으로 평가하며, 해적왕이라는 지위 자체를 개별 스탯 점수로 자동 환산하지 않는다.',
    combatProfile: {
      combatStyles: ['검술', '카무사리', '최상위 패기 공방', '근접 고속전'],
      specialTraits: [],
      haki: { characterId: 'roger', capabilities: [
        { type: 'armament', status: 'confirmed', note: '최상위 패기 공방과 공식 설정에서 보유가 확인된다.' },
        { type: 'observation', status: 'confirmed', note: '공식 설정상 견문색 보유가 확인된다.' },
        { type: 'conquerors', status: 'confirmed', note: '뉴게이트·록스와의 공방에서 패왕색이 직접 확인된다.', infusion: { status: 'confirmed', note: '무기에 패왕색을 두르는 최고 수준 공방이 직접 확인된다.' } },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '골 D. 로저 공식 캐릭터 페이지' }, { label: '원작 Evidence', reference: 'Ch. 966 / 1163 / 1165-1166' }],
    },
  },
  {
    id: 'rayleigh', name: '실버즈 레일리', crewId: 'roger-pirates',
    knownAs: [{ kind: 'epithet', name: '명왕', source: { label: 'ONE PIECE.com', reference: '실버즈 레일리 공식 캐릭터 페이지 — 「冥王」' } }],
    description: '로저 해적단 부선장. 전성기와 현재를 분리 평가하며, 노년의 보르살리노전과 패기 시연은 현재 전투력의 직접 근거이자 전성기 능력의 하한 참고자료로만 사용한다.',
    combatProfile: {
      combatStyles: ['검술', '근접 제압', '패기 기반 공격·방어', '고속 요격'],
      specialTraits: [],
      haki: { characterId: 'rayleigh', capabilities: [
        { type: 'armament', status: 'confirmed', note: '루피 수련에서 직접 시연하고 전투에서도 자연계 상대와 접촉을 성립시킨다.' },
        { type: 'observation', status: 'confirmed', note: '루피 수련 과정에서 직접 설명·시연한다.' },
        { type: 'conquerors', status: 'confirmed', note: '샤본디 및 수련 과정에서 패왕색 사용이 확인된다.', infusion: { status: 'unclear', note: '현재 채택 근거에서 고급 패왕색 공격 적용을 직접 수치화하지 않는다.' } },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '실버즈 레일리 공식 캐릭터 페이지' }, { label: '원작 Evidence', reference: 'Ch. 512 / 597 / 1059 / 1161' }],
    },
  },
  {
    id: 'gaban', name: '스코퍼 가반', crewId: 'roger-pirates',
    knownAs: [
      { kind: 'epithet', name: '산먹깨비', source: { label: '한국 정식 단행본', reference: '원피스 112권 제1139화 「산먹깨비」 · 원문 山喰らい, 동일 이명 「산을 먹는 자」' } },
      { kind: 'title', name: '해적왕의 왼팔', source: { label: '원작/공식 애니', reference: '원작 1139화 — 로저·레일리와 함께한 핵심 전력' } },
    ],
    description: '로저 해적단 핵심 전력. 엘바프 현재 시점의 직접 전투만 수치화하며, 전성기는 직접 7축 Evidence가 부족해 미평가로 보류한다.',
    combatProfile: {
      combatStyles: ['쌍도끼', '고속 근접전', '비상 참격', '패기 기반 불사 대응', '전투 중 미래 예측'],
      specialTraits: [],
      haki: { characterId: 'gaban', capabilities: [
        { type: 'armament', status: 'unclear', note: '현재 장면의 단순 Haki coating을 무장색으로 임의 특정하지 않는다.' },
        { type: 'observation', status: 'confirmed', note: '엘바프에서 인질 사태의 미래를 미리 보고 판단하는 고급 견문색 적용이 확인된다.' },
        { type: 'conquerors', status: 'confirmed', note: '신의 기사단의 불사성 억제와 관련된 과거 전투·설명에서 패왕색 운용이 확인된다.', infusion: { status: 'confirmed', note: '과거 Harald 관련 전투에서 불사 억제에 패왕색을 공격에 적용한 것으로 분류한다.' } },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '스코퍼 가반 공식 캐릭터/애니 자료' }, { label: '원작 Evidence', reference: 'Ch. 1139-1140 / 1148-1152 / 1170 / 1189-1192' }],
    },
  },
  {
    id: 'rocks', name: '록스 D. 지벡', crewId: 'rocks-pirates',
    knownAs: [],
    description: '록스 해적단 선장. Domi Reversi 이전 God Valley 자연 상태만 평가하며, 악마화 상태는 별도 수치로 합산하지 않고 강함의 상한·맥락 참고자료로만 사용한다.',
    combatProfile: {
      combatStyles: ['검술', '최상위 패기 공방', '고속 근접전', '대형 구조물 파괴'],
      specialTraits: [],
      haki: { characterId: 'rocks', capabilities: [
        { type: 'armament', status: 'unclear', note: '자연 상태 전투의 패기 사용은 확인되지만 타입별 적용을 모두 특정하지 않는다.' },
        { type: 'observation', status: 'unclear' },
        { type: 'conquerors', status: 'confirmed', note: '하랄드 및 God Valley 공방에서 패왕색이 직접 확인된다.', infusion: { status: 'confirmed', note: '무기·공격에 패왕색을 실은 최고 수준 공방이 확인된다.' } },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '록스 D. 지벡 공식 캐릭터 페이지' }, { label: '원작 Evidence', reference: 'Ch. 1155 / 1162-1166' }],
    },
  },
  {
    id: 'newgate', name: '에드워드 뉴게이트', crewId: 'whitebeard-pirates',
    knownAs: [{ kind: 'epithet', name: '흰 수염', source: { label: 'ONE PIECE.com', reference: '에드워드 뉴게이트 공식 캐릭터 페이지 — 「白ひげ」' } }, { kind: 'title', name: '세계 최강의 남자', source: { label: 'ONE PIECE.com', reference: '에드워드 뉴게이트 공식 캐릭터 페이지' } }],
    description: '흰수염 해적단 선장. 전성기와 질환·노쇠가 진행된 정상결전 상태를 분리해 평가한다.',
    combatProfile: {
      combatStyles: ['언월도', '지진 충격파', '광역 파괴', '근접 패기 공방', '전장 제어'],
      specialTraits: [{ id: 'special-newgate-quake', category: 'devil-fruit', name: '흔들흔들 열매', status: 'confirmed', description: '지진과 충격파로 근접·원거리·광역 공격과 지형 파괴를 수행한다.', evidenceIds: [], limitations: '광역 파괴 규모 자체를 단일 표적 Attack과 동일시하지 않는다.' }],
      haki: { characterId: 'newgate', capabilities: [
        { type: 'armament', status: 'confirmed' },
        { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'confirmed', note: '로저와의 전성기 충돌에서 직접 확인된다.', infusion: { status: 'confirmed', note: '로저와 무기가 닿지 않는 패왕색 공방을 성립시킨다.' } },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '에드워드 뉴게이트 공식 캐릭터 페이지' }, { label: '원작 Evidence', reference: 'Ch. 434 / 552-576 / 966 / 1163' }],
    },
  },
  {
    id: 'kaido', name: '카이도', crewId: 'beasts-pirates',
    knownAs: [{ kind: 'epithet', name: '백수의 카이도', source: { label: 'ONE PIECE.com', reference: '카이도 공식 캐릭터 페이지' } }],
    description: '백수 해적단 총독. 오니가시마 전투 상태를 전성기로 보고, 다수전·누적 피해·섬 이동 부담을 포함한 전투 맥락과 함께 평가한다.',
    combatProfile: {
      combatStyles: ['금쇄봉 격투', '청룡 변신', '화염·바람·번개', '공중전', '패왕색 강화 근접전'],
      specialTraits: [{ id: 'special-kaido-seiryu', category: 'devil-fruit', name: '물고기물고기 열매 환수종 모델 청룡', status: 'confirmed', description: '청룡과 인수형 변신으로 비행·원거리 자연현상 공격·신체 강화를 결합한다.', evidenceIds: [] }],
      haki: { characterId: 'kaido', capabilities: [
        { type: 'armament', status: 'confirmed' },
        { type: 'observation', status: 'confirmed', note: '루피와의 전투에서 미래예지 수준의 고급 운용을 직접 보여준다.' },
        { type: 'conquerors', status: 'confirmed', note: '패왕색 보유와 공격 강화가 직접 확인된다.', infusion: { status: 'confirmed', note: '금쇄봉과 공격에 패왕색을 두르는 고급 적용이 명시된다.' } },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '카이도 공식 캐릭터 페이지' }, { label: '원작 Evidence', reference: 'Ch. 951 / 1009-1010 / 1042 / 1049' }],
    },
  },
  {
    id: 'linlin', name: '샬롯 링링', crewId: 'big-mom-pirates',
    knownAs: [{ kind: 'epithet', name: '빅 맘', source: { label: 'ONE PIECE.com', reference: '샬롯 링링 공식 캐릭터 페이지 — BIG MOM' } }],
    description: '빅 맘 해적단 선장. 오니가시마 전투 상태를 전성기로 보고 압도적인 공격·내구·지속·능력 폭과, 상대적으로 노출된 전투 판단·기동 한계를 분리해 평가한다.',
    combatProfile: {
      combatStyles: ['검술', '호미즈 연계', '근접 완력', '영혼 조작', '자가 회복', '광역 원소 공격'],
      specialTraits: [{ id: 'special-linlin-soul', category: 'devil-fruit', name: '소울소울 열매', status: 'confirmed', description: '영혼을 부여한 호미즈를 통해 화염·번개·검격·비행·자가 회복을 포함한 복합 전투를 수행한다.', evidenceIds: [], limitations: 'Soul Pocus는 상대의 공포 여부 등 조건에 영향을 받는다.' }],
      haki: { characterId: 'linlin', capabilities: [
        { type: 'armament', status: 'confirmed' },
        { type: 'observation', status: 'confirmed' },
        { type: 'conquerors', status: 'confirmed', note: 'Page One 공격 등에서 패왕색 강화가 직접 확인된다.', infusion: { status: 'confirmed', note: '근접 주먹 공격에 패왕색을 두르는 장면이 직접 확인된다.' } },
      ]},
      sources: [{ label: 'ONE PIECE.com', reference: '샬롯 링링 공식 캐릭터 페이지' }, { label: '원작 Evidence', reference: 'Ch. 951 / 1009 / 1011 / 1039-1040' }],
    },
  },

  {
    id: 'sabo', name: '사보', crewId: 'revolutionary-army', knownAs: [],
    description: '혁명군 참모총장. 드레스로자에서 바스티유·잇쇼와 대치했고 마리조아에서는 쿠마 구출·잠입 임무를 맡았다. 해군 대장 상대 동격 승리는 확인되지 않는다.',
    combatProfile: {
      combatStyles: ['용조권', '메라메라 열매의 화염 운용', '지휘·임무 수행'],
      specialTraits: [
        { id: 'special-sabo-fire', category: 'devil-fruit', name: '메라메라 열매', status: 'confirmed', description: '화염 형태 변화와 공격을 구사한다. 용조권은 열매 취득 전부터 별도 사용한 무투 기술이다.', evidenceIds: ['evidence-sabo-bastille-687', 'evidence-sabo-fujitora-695'] },
      ],
      haki: { characterId: 'sabo', capabilities: [{ type: 'armament', status: 'confirmed', note: '바스티유 무기 파괴 등 체술과 무장색 연계 실전 성과를 근거로 운용 확인' }, { type: 'observation', status: 'unclear', note: '견문색의 고급 예지 등은 현 단일 공식 요약만으로 특정하지 않음' }, { type: 'conquerors', status: 'not-confirmed', note: '패왕색 보유 확인 없음' }] },
      sources: [{ label: 'ONE PIECE.com', reference: '사보 캐릭터 공식 프로필 · https://one-piece.com/character/sabo/index.html' }, { label: '공식 TV 애니', reference: '687·695·1117·1118화 및 원작 드레스로자·마리조아 장면' }],
    },
  },
  {
    id: 'morley', name: '몰리', crewId: 'revolutionary-army', knownAs: [],
    description: '혁명군 서군 군대장인 거인족. 지면을 밀고 지중을 이동해 마리조아 구출 임무를 지원한다. 대장과의 교전은 다수전·성지 제약 조건.',
    combatProfile: {
      combatStyles: ['지중 이동', '지형 조작', '거인족 완력', '구출·지원'],
      specialTraits: [
        { id: 'special-morley-push', category: 'devil-fruit', name: '밀밀 열매(지면 밀기)', status: 'confirmed', description: '지면을 물결치게 하거나 밀어 지중 통로와 지형 이동을 만든다.', evidenceIds: ['evidence-morley-terrain-profile', 'evidence-morley-marygeoise-1117'] },
        { id: 'special-morley-giant', category: 'race', name: '거인족', status: 'confirmed', description: '거인족의 체구를 전투 맥락으로 기록한다. 큰 몸집 자체를 자동 공격·방어 보너스로 두지 않는다.', evidenceIds: ['evidence-morley-terrain-profile'] },
      ],
      haki: { characterId: 'morley', capabilities: [{ type: 'armament', status: 'unclear', note: '개인 무장색 적용 장면 미확정' }, { type: 'observation', status: 'unclear', note: '견문색 고급 응용 미확정' }, { type: 'conquerors', status: 'not-confirmed', note: '패왕색 보유 확인 없음' }] },
      sources: [{ label: 'ONE PIECE.com', reference: '몰리 공식 프로필 · https://one-piece.com/character/Morley/index.html' }, { label: '공식 TV 애니', reference: '1117화(성지 다수전)' }],
    },
  },
  {
    id: 'karasu', name: '카라스', crewId: 'revolutionary-army', knownAs: [],
    description: '혁명군 북군 군대장. 검댕과 까마귀 형태를 활용한 전투·기동을 보이나 성지 대장전은 동료와 연계한 다수전이다.',
    combatProfile: {
      combatStyles: ['검댕 군집', '까마귀 형태 제어', '원거리 견제', '공중 기동'],
      specialTraits: [
        { id: 'special-karasu-soot', category: 'devil-fruit', name: '그을음 형태 능력', status: 'confirmed', description: '그을음을 까마귀 군집 형태로 만들어 전장에 분산 운용한다. 정식 한국어 열매 이름은 검증 전 표시 보류.', evidenceIds: ['evidence-karasu-soot-1083'] },
      ],
      haki: { characterId: 'karasu', capabilities: [{ type: 'armament', status: 'unclear', note: '무장색의 이 전투 중 독립 발현 자료 부족' }, { type: 'observation', status: 'unclear', note: '견문색 독립 증거 부족' }, { type: 'conquerors', status: 'not-confirmed', note: '패왕색 보유 확인 없음' }] },
      sources: [{ label: '원작 만화', reference: '1083화 마리조아 전투 및 능력 묘사(추가 원문 대조 필요)' }, { label: '공식 TV 애니', reference: '1117화 혁명군 군대장과 해군 대장 교전 · https://one-piece.com/anime/68630/index.html' }],
    },
  },
  {
    id: 'lucci', name: '로브 루치', crewId: 'cp0', knownAs: [],
    description: 'CP0 요원. 에그헤드에서 동물계 각성 형태로 기어 5 루피와 교전하고 센토마루를 제압했지만 동급 사황 전력 판정은 불가하다.',
    combatProfile: {
      combatStyles: ['육식', '표범 동물계 변형', '고속 근접 체술', '지건·수건'],
      specialTraits: [
        { id: 'special-lucci-leopard', category: 'devil-fruit', awakening: 'confirmed', name: '고양고양 열매 모델 표범', status: 'confirmed', description: '표범 동물계 각성을 통해 근접 공격과 전투 속도·변형을 활용한다.', evidenceIds: ['evidence-lucci-awakening-1100'] },
      ],
      haki: { characterId: 'lucci', capabilities: [{ type: 'armament', status: 'confirmed', note: '각성 체술과 결합된 기본 무장색 운용. 독립 예외적 원점수는 분리하지 않음' }, { type: 'observation', status: 'unclear', note: '미래예지 또는 고급 견문색 기술 직접 미확인' }, { type: 'conquerors', status: 'not-confirmed', note: '패왕색 보유 확인 없음' }] },
      sources: [{ label: 'ONE PIECE.com', reference: '루치 공식 프로필 · https://one-piece.com/character/Rob_Lucci/index.html' }, { label: '공식 TV 애니', reference: '1100·1109화 에그헤드 교전' }],
    },
  },
  {
    id: 'kaku', name: '카쿠', crewId: 'cp0', knownAs: [],
    description: 'CP0 요원. 소소 열매 모델 기린과 쌍도·람각을 결합해 조로와 교전하고 이후 세라핌 상대 공동전에 참가했다.',
    combatProfile: {
      combatStyles: ['쌍도류', '람각', '기린 동물계 변형', '육식'],
      specialTraits: [
        { id: 'special-kaku-giraffe', category: 'devil-fruit', awakening: 'confirmed', name: '소소 열매 모델 기린', status: 'confirmed', description: '기린 형태의 체술과 검격을 결합한다. 각성에 대한 추가적 수치 효과는 별도 검증 전 임의 가산하지 않는다.', evidenceIds: ['evidence-kaku-zoro-1104'] },
      ],
      haki: { characterId: 'kaku', capabilities: [{ type: 'armament', status: 'confirmed', note: '일반 무장색은 기본 검술·체술 성과에 통합, 독립 원점수 없음' }, { type: 'observation', status: 'unclear', note: '고급 견문색 발현 미확정' }, { type: 'conquerors', status: 'not-confirmed', note: '패왕색 보유 확인 없음' }] },
      sources: [{ label: 'ONE PIECE.com', reference: '카쿠 공식 프로필 · https://one-piece.com/character/Kaku/index.html' }, { label: '공식 TV 애니', reference: '1104·1109화 에그헤드 교전' }],
    },
  },
  {
    id: 'stussy', name: '스튜시', crewId: 'cp0', knownAs: [],
    description: '베가펑크 측으로 잠입한 전 CP0 요원. 루치·카쿠에 대한 기습 수면 성공은 인정하되 정면 승리·순수 공격력 우위로 환산하지 않는다.',
    combatProfile: {
      combatStyles: ['잠입·정보전', '기습·수면 제압', '근접 급습', '임무 전환'],
      specialTraits: [
        { id: 'special-stussy-bat', category: 'devil-fruit', name: '박쥐박쥐 열매', status: 'confirmed', description: '상대를 물어 수면 상태로 만드는 효과가 공식 자료에 등장한다. 정면 교전 화력과는 구별한다.', evidenceIds: ['evidence-stussy-sleep-1104'] },
        { id: 'special-stussy-clone', category: 'biology', name: '복제인간', status: 'confirmed', description: '미스 버킹엄 스튜시의 복제인간으로 공개된 출생 배경. 그 사실만으로 점수 가산하지 않는다.', evidenceIds: ['evidence-stussy-infiltration-1105'] },
      ],
      haki: { characterId: 'stussy', capabilities: [{ type: 'armament', status: 'unclear', note: '수면 제압 결과만으로 무장색 종류·수준을 단정하지 않음' }, { type: 'observation', status: 'unclear', note: '기습 성공을 미래예지로 설명하지 않음' }, { type: 'conquerors', status: 'not-confirmed', note: '패왕색 보유 확인 없음' }] },
      sources: [{ label: 'ONE PIECE.com', reference: '스튜시 공식 프로필 · https://one-piece.com/character/Stussy/index.html' }, { label: '공식 TV 애니', reference: '1104·1105화 기습·잠입 반전' }],
    },
  },
]
