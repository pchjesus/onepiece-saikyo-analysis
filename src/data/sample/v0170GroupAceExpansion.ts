import type { Character, CharacterMembership, Group } from '../../domain/character/types'
import type { Evaluation, CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'
import type { Battle } from '../../domain/battle/types'
import type { Evidence, EvidenceStatRole } from '../../domain/evidence/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

/**
 * v0.1.70 additive: SWORD 2, Donquixote 3, Whitebeard Ace 1.
 * All scene claims are grounded in official ONE PIECE.com profiles / TV synopses,
 * with SOURCE TYPE SUPPLEMENTARY. No unread manga pages labeled canon.
 * Core Haki Raw = 0 pending exceptional independent-effect proof.
 */
export const v0170Seeds = [
  {
    "id": "koby",
    "name": "코비",
    "group": "sword",
    "role": "대원 / 해군 대령",
    "era": "하치노스 구출 작전",
    "styles": [
      "육식·체술",
      "해군식 근접 격투",
      "실직권골"
    ],
    "special": null,
    "haki": [
      "unclear",
      "confirmed",
      "not-confirmed"
    ],
    "profile": "https://one-piece.com/character/Coby/index.html",
    "scores": [
      82,
      73,
      77,
      78,
      77,
      76,
      67
    ],
    "read": [
      "E2",
      "E3",
      "E3",
      "E2",
      "E2",
      "E2",
      "E3"
    ],
    "notes": [
      "피사로의 섬 거대 팔을 실직권골 한 번에 파괴했다. 가프가 앞서 본체에 충격을 주어 생긴 틈과 군함 보호 목적을 분리하며 동일 위력의 반복 공격은 미확인이다.",
      "시류가 보호 대상을 이용한 기습을 시도하고 가프가 대신 막았다. 코비의 독립 방어 성공을 그 사건에서 역산하지 않는다.",
      "사건 중 이동·구출을 지속하나 장기 고강도 단독전을 완수한 표본은 부족하다.",
      "파손시킬 구조물의 위험 구간에 접근했지만 인지/회피 능력과 순수 최고속은 구분한다.",
      "가프의 훈련과 육식·실직권골의 실전 사용은 인정하되 한 기술의 파괴 규모를 다수 복합 기술 숙련으로 늘리지 않는다.",
      "가프의 지시대로 군함 구출 작전을 수행한 판단은 인정한다. 지시 주체를 코비로 잘못 귀속하지 않는다.",
      "공격·구조·체술은 수행했지만 새로운 공격 체계나 특수 이동/지형 제어는 확인되지 않았다."
    ],
    "events": [
      {
        "key": "hurry",
        "ep": "1121",
        "url": "https://one-piece.com/anime/69144/index.html",
        "title": "하치노스에서 탈출·기습",
        "structure": "multiple-vs-multiple",
        "purpose": "구출 작전과 군함 귀환",
        "fact": "코비가 사람을 구하려다 시류의 기습 대상이 되었고 가프가 대신 피격되었다.",
        "roles": {
          "defense": "context",
          "combatIQ": "secondary",
          "speed": "context"
        },
        "context": "아군을 보호하려는 선택과 상대 투명 기습·가프 개입이 함께 일어났다.",
        "uncertainty": "보호 행동의 위험 판단 자료이지 코비 단독 Defense 또는 시류와 정면전 결과는 아니다."
      },
      {
        "key": "impact",
        "ep": "1122",
        "url": "https://one-piece.com/anime/69263/index.html",
        "title": "실직권골과 피사로의 거대 팔",
        "structure": "multiple-vs-multiple",
        "purpose": "피사로의 군함 압괴를 저지",
        "fact": "가프가 피사로 본체에 타격을 준 뒤 코비가 실직권골로 섬 거대 팔을 부수고 그루스가 낙석을 받았다.",
        "roles": {
          "attack": "primary",
          "speed": "secondary",
          "techniqueMastery": "primary",
          "combatIQ": "secondary",
          "versatility": "context",
          "stamina": "context"
        },
        "context": "가프의 선행 교란, 헤르메포의 지원, 그루스의 낙석 보호가 함께 군함을 구했다.",
        "uncertainty": "팔 파괴는 코비의 실제 성과지만 작전 전체를 코비 혼자 완수한 것으로 귀속하지 않는다."
      }
    ]
  },
  {
    "id": "prince-grus",
    "name": "프린스 그루스",
    "group": "sword",
    "role": "대원 / 해군 소장",
    "era": "하치노스 구출 작전",
    "styles": [
      "점토 생성·조작",
      "광역 낙석 차단",
      "지원·지형 운용"
    ],
    "special": {
      "name": "질척질척 열매(グニョグニョの実)",
      "description": "점토를 생성하고 조작해 전장 보호와 구조를 수행한다."
    },
    "haki": [
      "unclear",
      "unclear",
      "not-confirmed"
    ],
    "profile": "https://one-piece.com/character/Prince_Grus/index.html",
    "scores": [
      72,
      77,
      74,
      71,
      81,
      78,
      85
    ],
    "read": [
      "E3",
      "E2",
      "E3",
      "E3",
      "E2",
      "E2",
      "E2"
    ],
    "notes": [
      "점토 조작의 공간적 규모는 확인되지만 상위권 강자에게 준 결정적인 단독 타격은 공식 자료에서 확인되지 않는다.",
      "피사로 팔의 파편을 점토로 받아 군함을 구했다. 코비의 팔 파괴와 그루스의 낙석 보호를 별개 기능으로 나눈다.",
      "작전 임무를 수행했지만 개인 장시간 대치·반복 피해 회복 표본은 제한된다.",
      "근접 이동은 가능해도 지형/점토 이동을 순수 신체 속도 고점으로 읽을 자료는 부족하다.",
      "점토를 정확하게 구조/완충 용도로 운용한 숙련이 직접 확인된다. 공격 기술의 반복 상한은 미확정이다.",
      "가프의 지시에 맞춰 낙석의 2차 피해를 막은 대응을 평가한다. 전체 작전 설계는 가프의 역할이다.",
      "점토 형성·전선 지원·방벽·구조 보호라는 복합 용도는 강점이다. 전투 불문 무제한 기술 확장은 금지한다."
    ],
    "events": [
      {
        "key": "arrival",
        "ep": "1121",
        "url": "https://one-piece.com/anime/69144/index.html",
        "title": "하치노스 탈출 작전",
        "structure": "multiple-vs-multiple",
        "purpose": "인질 구출 및 해군 철수 지원",
        "fact": "그루스는 가프의 구조 부대와 함께 코비와 합류한 뒤 군함으로 이동하는 임무에 참여했다.",
        "roles": {
          "combatIQ": "secondary",
          "stamina": "context",
          "speed": "context"
        },
        "context": "집단 철수·보호 임무와 상대 해적 다수 개입 상황이다.",
        "uncertainty": "협동 이동 성과는 개인 속도·공격 최대치를 확정하지 못한다."
      },
      {
        "key": "clay",
        "ep": "1122",
        "url": "https://one-piece.com/anime/69263/index.html",
        "title": "점토의 둥지로 군함 보호",
        "structure": "multiple-vs-multiple",
        "purpose": "피사로 팔 파손 뒤 낙석으로부터 군함과 인원을 보호",
        "fact": "그루스는 점토 능력으로 피사로 거대 팔의 낙석을 받아 군함을 보호했다.",
        "roles": {
          "attack": "context",
          "defense": "primary",
          "techniqueMastery": "primary",
          "versatility": "primary",
          "combatIQ": "secondary"
        },
        "context": "코비가 파괴한 구조물의 낙하물 방어이며 상대의 단독 직접 공격을 정면으로 버틴 것은 아니다.",
        "uncertainty": "낙석 포획/보호를 피사로 본체에 가한 공격력 또는 무한 방어력으로 환산하지 않는다."
      }
    ]
  },
  {
    "id": "vergo",
    "name": "베르고",
    "group": "donquixote-family",
    "role": "최고간부 / 해군 잠입자",
    "era": "펑크 하자드",
    "styles": [
      "대나무봉 체술",
      "무장색 근접전",
      "해군식 전술"
    ],
    "special": null,
    "haki": [
      "confirmed",
      "unclear",
      "not-confirmed"
    ],
    "profile": "https://one-piece.com/character/vergo/index.html",
    "scores": [
      79,
      79,
      77,
      77,
      79,
      73,
      68
    ],
    "read": [
      "E2",
      "E2",
      "E3",
      "E2",
      "E2",
      "E2",
      "E3"
    ],
    "notes": [
      "스모커와 격투하며 무장색·봉술을 실제 사용했다. 로에게 최종 제압됐으며 체력/공격 결과를 상위권 동급으로 올리지 않는다.",
      "스모커의 공격과 방어 공방은 확인되지만 로의 절단계 능력을 방어하지 못했다. 무장색 보유만으로 절대 방어는 아니다.",
      "스모커전 활동을 거쳐 로와 충돌했지만 장시간 다양한 상위 상대의 독립 지구력 표본은 부족하다.",
      "스모커와 빠른 근접 공방을 이어갔다. 로의 능력에 대처하지 못한 것을 단순 최고속 약점으로 해석하지 않는다.",
      "무장색과 봉술의 운용은 정교하나 독립 특출난 Raw 가산의 추가 효과를 분리하지 않았다.",
      "해군 잠입 장기 작전과 전투 중 판단은 다른 평가 요소이다. 전장 적응 성과에만 전투 IQ를 연결한다.",
      "봉술·체술·무장색의 혼합은 인정하지만 다양한 능력·이동·환경 제어로 자동 확장하지 않는다."
    ],
    "events": [
      {
        "key": "smoker",
        "ep": "610",
        "url": "https://one-piece.com/anime/610/index.html",
        "title": "스모커와의 중장 간 격투",
        "structure": "1v1",
        "purpose": "해군 잠입 정체 발각 뒤 스모커 저지",
        "fact": "베르고는 해군 G-5의 잠입자였으며 스모커와 서로 공격을 교환하며 격투했다.",
        "roles": {
          "attack": "secondary",
          "defense": "primary",
          "speed": "secondary",
          "techniqueMastery": "primary",
          "versatility": "secondary",
          "stamina": "secondary"
        },
        "context": "도플라밍고 측 잠입 사실이 드러난 상황에서 스모커가 추궁했다.",
        "uncertainty": "공방만으로 상위 사최간급 공격·방어 1대1 동급을 입증하지 못한다."
      },
      {
        "key": "law",
        "ep": "616",
        "url": "https://one-piece.com/anime/616/index.html",
        "title": "로의 최종 제압",
        "structure": "multiple-vs-multiple",
        "purpose": "스모커·로의 탈출과 전투를 방해",
        "fact": "베르고는 스모커·로와의 연속 교전 후 로에 의해 제압됐다.",
        "roles": {
          "attack": "context",
          "defense": "primary",
          "techniqueMastery": "secondary",
          "combatIQ": "secondary"
        },
        "context": "스모커의 선행 공방과 로의 능력 개입 및 내부 연구시설 전투 환경이 중첩됐다.",
        "uncertainty": "직전 교전의 누적 상황을 무시한 단일 순수 스탯 비교나 패기 등급 확정은 금지한다."
      }
    ]
  },
  {
    "id": "pica",
    "name": "피카",
    "group": "donquixote-family",
    "role": "최고간부",
    "era": "드레스로자",
    "styles": [
      "석재 동화·거대 조형",
      "지형 이동",
      "무장색 근접 방어"
    ],
    "special": {
      "name": "돌돌 열매(イシイシの実)",
      "description": "접촉한 돌·암석과 동화해 구조물을 움직이고 거대 석체를 만든다."
    },
    "haki": [
      "confirmed",
      "unclear",
      "not-confirmed"
    ],
    "profile": "https://one-piece.com/character/Pica/index.html",
    "scores": [
      74,
      74,
      75,
      65,
      80,
      69,
      82
    ],
    "read": [
      "E3",
      "E2",
      "E3",
      "E3",
      "E2",
      "E2",
      "E2"
    ],
    "notes": [
      "거대 석체의 파괴 범위는 넓지만 실제 상위 검사 조로에게 가한 독립 유효 피해가 없다. 공격 규모를 일대일 결정력으로 환산하지 않는다.",
      "동화한 석체를 여러 번 잘려도 회피·재형성하지만 최종 본체는 조로의 패기 검격에 패했다. 석체와 본체의 Defense를 구분한다.",
      "넓은 환경 조작과 이동을 지속했지만 장시간 정면 개인전에서 누적 피로를 견딘 직접 표본은 적다.",
      "석체 내 위치 이동은 뛰어나지만 거대한 구조물 이동 속도를 순수 몸의 고속 반응으로 환산하지 않는다.",
      "석체의 위치 변경·동화와 무장색 경화를 실제 활용했다. 패기 통상 사용은 Base에 두며 독립 Raw0 유지.",
      "리쿠 왕을 겨냥한 상황 판단과 본체 노출을 유도당한 전술적 약점 모두 반영한다.",
      "공격·엄폐·이동·지형 통제·대형 압박 등 폭넓은 쓰임새가 드러난다."
    ],
    "events": [
      {
        "key": "advance",
        "ep": "718",
        "url": "https://one-piece.com/anime/o2829/index.html",
        "title": "거대 석체로 리쿠 왕 추격",
        "structure": "multiple-vs-multiple",
        "purpose": "리쿠 왕 일행에게 대형 타격을 가하려 진군",
        "fact": "피카는 거대 석체를 이동시켜 리쿠 왕 일행을 위협하고 조로가 반복적으로 석체를 잘라도 본체를 옮겼다.",
        "roles": {
          "attack": "secondary",
          "defense": "secondary",
          "techniqueMastery": "primary",
          "versatility": "primary",
          "speed": "context",
          "combatIQ": "secondary"
        },
        "context": "리쿠 왕 일행을 보호하려는 조로의 구조 임무와 넓은 드레스로자 지형이 개입했다.",
        "uncertainty": "석체의 크기는 피카 본체의 순수 타격력·이동 속도·실제 방어력과 동일하지 않다."
      },
      {
        "key": "defeat",
        "ep": "719",
        "url": "https://one-piece.com/anime/o2831/index.html",
        "title": "조로의 거대 석체 분할과 본체 격파",
        "structure": "1v1",
        "purpose": "리쿠 왕 공격을 막는 조로와 결전",
        "fact": "조로는 오오론부스의 투척 도움으로 접근해 석체를 절단했고, 피카는 무장색을 입힌 본체로 대항했으나 패했다.",
        "roles": {
          "defense": "primary",
          "techniqueMastery": "primary",
          "combatIQ": "primary",
          "stamina": "context"
        },
        "context": "조로의 공중 이동에는 오오론부스의 조력이 있었고, 피카 본체를 노출시키는 전술적 순서가 있었다.",
        "uncertainty": "피카의 본체 패배를 석체·전장 제어 전부의 무능으로 확대하지 않고 상위권 패기 방어 증분으로 가산하지 않는다."
      }
    ]
  },
  {
    "id": "diamante",
    "name": "디아만테",
    "group": "donquixote-family",
    "role": "최고간부",
    "era": "드레스로자",
    "styles": [
      "검술·무기술",
      "펄럭펄럭 열매 무기·방어 변형",
      "투사체·장거리 견제"
    ],
    "special": {
      "name": "펄럭펄럭 열매(ヒラヒラの実)",
      "description": "접촉한 물체를 얇게 펄럭이는 상태로 바꾸어 무기·방어 수단으로 활용한다."
    },
    "haki": [
      "unclear",
      "unclear",
      "not-confirmed"
    ],
    "profile": "https://one-piece.com/character/diamante/index.html",
    "scores": [
      73,
      70,
      74,
      71,
      76,
      69,
      78
    ],
    "read": [
      "E2",
      "E2",
      "E3",
      "E2",
      "E2",
      "E3",
      "E2"
    ],
    "notes": [
      "퀴로스에게 검과 다양한 무기로 공세를 이어갔지만 최종 제압됐고 치명적인 독립 고점 성과는 부족하다.",
      "철제 우산 방어와 전장 물체 활용은 확인되지만 퀴로스가 이를 절단하고 돌파했다.",
      "퀴로스와 공방을 이어가지만 높은 피로 누적 상태에서 장기 전과 반복 회복한 표본은 제한된다.",
      "근거리 무기 교환은 가능하지만 매우 빠른 적을 상대로 한 우월한 반응 표본은 적다.",
      "검과 열매를 활용한 무기·방어 변형의 숙련을 인정하되 다른 최고 검사와 동일시하지 않는다.",
      "지형·투사체·무기 특성을 이용했지만 무리한 정면 교환과 결말을 함께 반영한다.",
      "검·우산·비처럼 떨어지는 무기·열매 변형 등 다종 공격/방어 수단을 운용한다."
    ],
    "events": [
      {
        "key": "kyros",
        "ep": "717",
        "url": "https://one-piece.com/anime/o2827/index.html",
        "title": "퀴로스와의 무기 공방",
        "structure": "1v1",
        "purpose": "퀴로스 공격을 막고 기존 정권을 지키려는 시도",
        "fact": "디아만테는 퀴로스와 검격을 교환했지만 퀴로스는 철제 우산을 절단했고 디아만테는 반격 기회를 노렸다.",
        "roles": {
          "attack": "primary",
          "defense": "primary",
          "speed": "secondary",
          "techniqueMastery": "primary",
          "versatility": "secondary"
        },
        "context": "퀴로스는 반복 피격과 가족 보호라는 임무 속에서 싸웠다.",
        "uncertainty": "우산의 손상이 디아만테 개인 신체의 내구도와 같지는 않다."
      },
      {
        "key": "loss",
        "ep": "718",
        "url": "https://one-piece.com/anime/o2829/index.html",
        "title": "퀴로스의 결정타로 패배",
        "structure": "1v1",
        "purpose": "드레스로자 전선 유지",
        "fact": "디아만테는 퀴로스와의 교전에서 최종적으로 패했다.",
        "roles": {
          "defense": "secondary",
          "stamina": "secondary",
          "combatIQ": "secondary"
        },
        "context": "퀴로스의 누적 피해와 무기 조작·주변 전황 속에서 진행된 전투다.",
        "uncertainty": "패배 결과만으로 모든 공격·체력·속도 축이 낮다고 단정하지 않는다."
      }
    ]
  },
  {
    "id": "ace",
    "name": "포트거스 D. 에이스",
    "group": "whitebeard-pirates",
    "role": "2번대 대장",
    "era": "생전 / 바나로 섬~정상결전",
    "styles": [
      "불꽃 원거리 광역 공격",
      "불꽃의 근접·방어 응용",
      "기동·동료 보호"
    ],
    "special": {
      "name": "이글이글 열매(メラメラの実)",
      "description": "불꽃을 생성·운용하는 자연계 능력을 공격과 견제·보호에 사용한다."
    },
    "haki": [
      "unclear",
      "unclear",
      "unclear"
    ],
    "profile": "https://one-piece.com/character/ace/index.html",
    "scores": [
      84,
      77,
      82,
      78,
      85,
      78,
      85
    ],
    "read": [
      "E2",
      "E2",
      "E2",
      "E3",
      "E2",
      "E2",
      "E2"
    ],
    "notes": [
      "화권 등 불꽃 공격과 바나로 섬 티치와의 공방이 직접 확인된다. 티치의 능력 무효화에 패했으나 같은 출력에서 일반 상성 결과를 과도하게 낮추지 않는다.",
      "자연계 불꽃화의 방어/회피는 강하지만 어둠어둠 열매 접촉 무효화 및 사카즈키의 공격 한계가 명확하다. 피격 이후 회복을 Defense로 자동 합산하지 않는다.",
      "티치와 치열한 전투를 벌이고 정상결전 탈출 과정에서 다시 개입했지만 여러 날의 단독 근접 고강도 공방 기록은 제한적이다.",
      "불꽃의 이동·교전 위치 조정은 가능하지만 최상위 신체 반응 속도 직접 비교는 부족하다.",
      "불꽃 생성·범위 조절·근접 방어·원거리 타격 등 다기능 열매 운용의 숙련을 인정한다.",
      "티치 단독 추적 선택과 정상결전 루피 보호 결단을 긍정·부정 맥락과 함께 기록한다. 성향을 Combat IQ의 절대적 결함으로 환산하지 않는다.",
      "불꽃의 범위 공격·제압·견제·동료 보호 및 상황 대응을 구분하되 광역 파괴만으로 절대 결정력을 보증하지 않는다."
    ],
    "events": [
      {
        "key": "smoker",
        "ep": "95",
        "url": "https://one-piece.com/anime/95/index.html",
        "title": "스모커를 저지한 불꽃 공방",
        "structure": "1v1",
        "purpose": "루피 일행의 진행 지원",
        "fact": "에이스는 스모커를 막아 자연계 불꽃과 연기의 대치를 만들고 루피가 이동할 시간을 벌었다.",
        "roles": {
          "defense": "secondary",
          "speed": "context",
          "techniqueMastery": "primary",
          "versatility": "secondary",
          "combatIQ": "secondary"
        },
        "context": "루피 탈출을 위한 짧은 견제전으로 결착을 위한 장기 결투가 아니다.",
        "uncertainty": "상성·임무상 전투가 중단된 장면을 순수 전투력 동급 또는 승리로 기록하지 않는다."
      },
      {
        "key": "teach",
        "ep": "325",
        "url": "https://one-piece.com/anime/325/index.html",
        "title": "바나로 섬에서 티치와 결투",
        "structure": "1v1",
        "purpose": "삿치를 살해한 티치를 추적해 처단하려는 결투",
        "fact": "에이스는 티치와 불꽃 능력으로 충돌했으나, 티치의 어둠 흡인과 접촉 능력 무효화에 제압되어 붙잡혔다.",
        "roles": {
          "attack": "primary",
          "defense": "primary",
          "stamina": "primary",
          "speed": "secondary",
          "techniqueMastery": "primary",
          "combatIQ": "secondary",
          "versatility": "primary"
        },
        "context": "어둠의 능력 봉쇄가 자연계 방어에 대한 특수 상성으로 작용했다.",
        "uncertainty": "티치전 패배가 모든 비능력자 상대 일반 공격·방어·지구력 상한을 직접 확정하지는 않는다."
      },
      {
        "key": "sacrifice",
        "ep": "483",
        "url": "https://one-piece.com/anime/483/index.html",
        "title": "정상결전 루피 보호와 치명상",
        "structure": "multiple-vs-multiple",
        "purpose": "루피를 사카즈키의 공격으로부터 보호",
        "fact": "에이스는 루피를 감싸 사카즈키의 공격을 대신 맞아 치명상을 입었다.",
        "roles": {
          "defense": "context",
          "stamina": "context",
          "combatIQ": "primary",
          "versatility": "secondary"
        },
        "context": "구출 직후 탈출 중 동료 보호 행동이며 피격을 피하기 어려운 희생 선택이었다.",
        "uncertainty": "희생 중 피격을 상시 Defense 결함이나 사카즈키와의 완전한 1대1 결투로 해석하지 않는다."
      }
    ]
  }
] as const

const keys: CombatStat[] = ['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility']
export const v0170Groups: Group[] = [
  { id:'sword', name:'SWORD', type:'marine', parentGroupId:'marines', description:'해군본부 기밀특수부대. 기존 X 드레이크 Character를 재사용한다.' },
  { id:'donquixote-family', name:'돈키호테 패밀리', type:'pirate-crew', description:'드레스로자와 펑크 하자드 당시 도플라밍고 조직.' },
]
export const v0170Memberships: CharacterMembership[] = [
  { characterId:'x-drake', groupId:'sword', role:'대장', status:'current' },
  { characterId:'doflamingo', groupId:'donquixote-family', role:'선장', status:'historical', period:'드레스로자 조직 활동기' },
  ...v0170Seeds.flatMap((s): CharacterMembership[] => [
    { characterId:s.id, groupId:s.group, role:s.role, status:s.id==='ace'?'historical':s.group==='donquixote-family'?'historical':'current', period:s.era },
    ...(s.group==='sword'?[{ characterId:s.id, groupId:'marines', role:s.role, status:'current' as const }]:[]),
    ...(s.id==='vergo'?[{characterId:s.id,groupId:'marines',role:'전 G-5 중장 / 도플라밍고 첩자',status:'former' as const,period:'펑크 하자드 전까지'}]:[]),
  ]),
]
export const v0170Characters: Character[] = v0170Seeds.map(s=>({
  id:s.id, name:s.name, crewId:s.group, knownAs:[], description:`${s.name} — ${s.role}. ${s.era} 실전 자료 기준 잠정 평가. ${s.notes[0]}`,
  combatProfile:{
    combatStyles:[...s.styles],
    specialTraits: !s.special ? [] : [{
      id:`special-v0170-${s.id}`,category:'devil-fruit',name:s.special.name,status:'confirmed',
      description:s.special.description,
      evidenceIds:[`evidence-v0170-${s.id}-${s.events[0].key}`],
      limitations:'특수 능력의 규모나 보유 자체를 7축 또는 Haki Raw의 별도 점수로 자동 가산하지 않는다.',
      uncertainty:'정식 원작 만화 전체 컷을 이번 패치에서 직접 확인하지 않았다.',
    }],
    haki:{characterId:s.id,capabilities:(['armament','observation','conquerors'] as const).map((type,i)=>({
      type,status:s.haki[i],
      note:s.haki[i]==='confirmed'?'ONE PIECE.com의 기존 공식 자료 또는 명시된 TV 실전에서 확인한 패기 사용·보유. 예외적 Raw 가산은 하지 않는다.':'보유/사용의 직접 확인과 예외적 독립 성과를 혼동하지 않고 이번 평가의 Raw는 0으로 유지한다.',
      ...(type==='conquerors'?{infusion:{status:'not-confirmed' as const,note:'패휘감은 이번 근거에서 확인하지 못했다.'}}:{}),
    }))},
    sources:[
      {label:'ONE PIECE.com 공식 인물 프로필',reference:s.profile},
      ...s.events.map(e=>({label:`ONE PIECE.com 공식 애니 TV ${e.ep}화`,reference:e.url})),
    ],
  },
}))
const eventBattleId = (s: typeof v0170Seeds[number], e: typeof v0170Seeds[number]['events'][number]) =>
  s.group==='sword' ? `battle-v0170-sword-${e.ep}` :
  s.id==='ace' && e.key==='teach' ? 'banaro-teach-ace' : `battle-v0170-${s.id}-${e.key}`
export const v0170Battles: Battle[] = v0170Seeds.flatMap((s,idx)=>s.events.map((e,i)=>({
  id:eventBattleId(s,e),title:`${s.name} — ${e.title}`,
  chronologyOrder:500+idx*10+i,combatStructure:e.structure as Battle['combatStructure'],
  combatPurpose:e.purpose,combatIntent:'unknown',environment:s.era,
  restrictions:e.context,externalFactors:e.uncertainty,
  result:['loss','teach','defeat'].includes(e.key)?'defeat':['impact','clay'].includes(e.key)?'interrupted':'unknown',
  participantIds:[],
}))).filter((b,i,all)=>b.id!=='banaro-teach-ace' && all.findIndex(other=>other.id===b.id)===i)
export const v0170Evidence: Evidence[] = v0170Seeds.flatMap(s=>s.events.map(e=>({
  id:`evidence-v0170-${s.id}-${e.key}`,
  battleId:eventBattleId(s,e),subjectCharacterId:s.id,
  source:{type:'supplementary',reference:`ONE PIECE.com — TV Episode ${e.ep}`,description:e.url},
  evidenceStrength:'moderate',fact:e.fact,supportedAbilities:[...s.styles],
  statContributions:Object.entries(e.roles).map(([stat,role])=>({
    stat:stat as CombatStat,role:role as EvidenceStatRole,
    note:`${e.fact} | ${e.context} 해당 ${stat} 축에 대해 ${role} 역할의 정성 근거이며 수치를 자동 확정하지 않는다.`,
  })),
  interpretation:e.context,evaluationImpact:'일부 공식 애니 교차 근거를 통해 해당 평가축을 잠정 교정. 원작 만화 전 컷 직접 검증·하이브리드 Haki Raw 추가는 보류.',
  uncertainty:e.uncertainty,
})))
export const v0170Evaluations: Evaluation[] = v0170Seeds.map(s=>({
  id:`evaluation-v0170-${s.id}`,characterId:s.id,
  evaluationDataVersion:'evaluation-0.1.70-expansion-draft',status:'draft',
  items:keys.map((stat,i)=>{
    const item={stat,baseScore:s.scores[i],score:s.scores[i],rationale:s.notes[i],
      evidenceIds:s.events.filter(e=>stat in e.roles).map(e=>`evidence-v0170-${s.id}-${e.key}`),
      hakiContributions:[],readiness:s.read[i] as EvidenceReadiness}
    return {...item,score:getFinalStatScore(item)}
  }),
}))
