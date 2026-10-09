import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'

/** Additional episode-scoped facts so team fights and later duels do not share a fictional single context. */
export const wanoDetailedBattles: Battle[] = [
  {
    "id": "battle-wano-detailed-kid-big-mom-1066",
    "title": "키드·로 연계 vs 빅 맘",
    "chronologyOrder": 620,
    "combatStructure": "multiple-vs-one",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "2대1 공투와 누적 피해; 지형·연속 타격·추락 맥락이 존재한다. 각성 기술의 총소모나 킬러 등 타인의 피해는 분리한다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "victory",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-kid-killer-rooftop-1017",
    "title": "최악의 세대 5인 vs 두 사황",
    "chronologyOrder": 610,
    "combatStructure": "multiple-vs-multiple",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "5대2 공동전으로 참전자마다 기술·개인 피해량이 달라 한 명의 일대일 사황급 성과를 역산할 수 없다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "interrupted",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-kid-shanks-1112",
    "title": "키드 해적단 vs 샹크스·거병 해적단",
    "chronologyOrder": 640,
    "combatStructure": "multiple-vs-multiple",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "샹크스의 미래예지·선제 접근, 전자기포 준비 동작과 산하 함대 보호 목적, 거인들의 후속 개입이 있다. 키드의 모든 능력을 이 한 순간만으로 일괄 감점하지 않는다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "defeat",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-killer-hawkins-1054",
    "title": "킬러 vs 호킨스 짚인형 상성",
    "chronologyOrder": 630,
    "combatStructure": "1v1",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "키드를 인질로 잡힌 변칙 조건; 성공은 상대 능력의 약점 발견·절단 정확도를 뒷받침하나 사황급 공격력은 직접 증명하지 않는다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "victory",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-akazaya-kaido-1004",
    "title": "아카자야 무사들 vs 카이도 집단전",
    "chronologyOrder": 550,
    "combatStructure": "multiple-vs-one",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "집단 타격과 병행 기술의 성과다. 각 무사 개개인의 단독 방어 관통을 증명하지 않고 카이도의 체력·전황과 별개로 취급한다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "defeat",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-inu-jack-1051",
    "title": "스론 이누아라시 vs 잭",
    "chronologyOrder": 575,
    "combatStructure": "1v1",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "직전에는 달빛이 가려져 스론이 해제됐고 잭은 밍크족 및 다른 전투로 피해가 누적된 상태였다. 스론은 상시 능력이 아니다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "victory",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-neko-perospero-1051",
    "title": "스론 네코마무시 vs 페로스페로",
    "chronologyOrder": 576,
    "combatStructure": "1v1",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "보름달이라는 조건 및 페로스페로의 이전 전투·피해가 영향을 준다. 이 승리 자체가 최고 강자 정면전과 동일하지 않다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "victory",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-whos-jinbe-1040",
    "title": "후즈 후 vs 징베",
    "chronologyOrder": 570,
    "combatStructure": "1v1",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "과거 CP9 경력과 징베에 대한 적대·감정적 발언이 교전에 개입; 기술을 사용했다는 사실과 상대에게 입힌 실질 피해는 구분한다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "defeat",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-sasaki-franky-1042",
    "title": "사사키 vs 프랑키 장군",
    "chronologyOrder": 572,
    "combatStructure": "1v1",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "프랑키 장군의 기계적 내구와 본체 프랑키의 상태가 다르며, 상대의 탈출·무기 교체를 사사키가 알아차리지 못했다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "defeat",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-blackmaria-robin-1044",
    "title": "블랙 마리아 vs 로빈·브룩",
    "chronologyOrder": 573,
    "combatStructure": "multiple-vs-one",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "브룩은 부하·환영에 대응하고 로빈이 숨긴 신기술이 결정타가 됐다. 블랙 마리아의 구속 성공을 단독 방어 관통 최고위력으로 환산하지 않는다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "defeat",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-ulti-bigmom-1033",
    "title": "울티 vs 빅 맘 개입 / 나미",
    "chronologyOrder": 569,
    "combatStructure": "multiple-vs-multiple",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "상대가 나미·우솝·빅 맘으로 바뀌고 개입 타격이 매우 커 나미의 1대1 순수 화력으로 울티를 잡은 것처럼 판단하면 안 된다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "defeat",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-pageone-bigmom-1031",
    "title": "페이지 원 vs 빅 맘",
    "chronologyOrder": 568,
    "combatStructure": "1v1",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "사황이 사용한 매우 강한 일격이며 공정한 반응 및 장기전 조건이 아니다. 타격 1회로 모든 방어축을 극단적으로 낮추지 않는다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "defeat",
    "participantIds": []
  },
  {
    "id": "battle-wano-detailed-kanjuro-betrayal-977",
    "title": "칸주로의 배신 공개와 그림 실체화",
    "chronologyOrder": 535,
    "combatStructure": "multiple-vs-multiple",
    "combatPurpose": "사건별 전투 목적·상호작용 검증",
    "combatIntent": "unknown",
    "environment": "원작 와노쿠니 전투·신세계 교전",
    "restrictions": "정보전·동료 기만 및 인질 상황으로 정면 검술 성과와 다르다. 능력 숙련과 판단력을 분리한다.",
    "externalFactors": "공식 TV 요약은 만화 원문의 모든 패널을 직접 대조한 것이 아니며 누적 피해/개입은 각 사실에 포함한다.",
    "result": "interrupted",
    "participantIds": []
  }
]

export const wanoDetailedEvidence: Evidence[] = [
  {
    "id": "evidence-wano-detailed-kid-big-mom-1066-kid",
    "battleId": "battle-wano-detailed-kid-big-mom-1066",
    "subjectCharacterId": "kid",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/62293/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "로가 K-ROOM과 관통 기술로 빅 맘에게 큰 손상을 입힌 직후 키드가 전자기포 다무드 펑크를 적중시켰다.",
    "supportedAbilities": [
      "키드·로 연계 vs 빅 맘",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "context",
        "note": "defense에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 versatility 연결 시 타인의 기여/조건을 분리한다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "2대1 공투와 누적 피해; 지형·연속 타격·추락 맥락이 존재한다. 각성 기술의 총소모나 킬러 등 타인의 피해는 분리한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-kid-killer-rooftop-1017-kid",
    "battleId": "battle-wano-detailed-kid-killer-rooftop-1017",
    "subjectCharacterId": "kid",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o6093/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "키드와 킬러는 루피·로·조로와 함께 카이도와 빅 맘을 상대하는 옥상 공동전에 참가했다.",
    "supportedAbilities": [
      "최악의 세대 5인 vs 두 사황",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 speed 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "techniqueMastery",
        "role": "context",
        "note": "techniqueMastery에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "5대2 공동전으로 참전자마다 기술·개인 피해량이 달라 한 명의 일대일 사황급 성과를 역산할 수 없다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-kid-killer-rooftop-1017-killer",
    "battleId": "battle-wano-detailed-kid-killer-rooftop-1017",
    "subjectCharacterId": "killer",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o6093/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "키드와 킬러는 루피·로·조로와 함께 카이도와 빅 맘을 상대하는 옥상 공동전에 참가했다.",
    "supportedAbilities": [
      "최악의 세대 5인 vs 두 사황",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 speed 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "techniqueMastery",
        "role": "context",
        "note": "techniqueMastery에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "5대2 공동전으로 참전자마다 기술·개인 피해량이 달라 한 명의 일대일 사황급 성과를 역산할 수 없다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-kid-shanks-1112-kid",
    "battleId": "battle-wano-detailed-kid-shanks-1112",
    "subjectCharacterId": "kid",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/67527/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "키드의 전자기포가 샹크스 산하를 공격할 미래를 보고 샹크스가 선제 신피로 키드를 제압했고, 거인 전사들이 함선을 파괴했다.",
    "supportedAbilities": [
      "키드 해적단 vs 샹크스·거병 해적단",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "context",
        "note": "attack에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "context",
        "note": "stamina에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "speed",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 speed 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "techniqueMastery",
        "role": "context",
        "note": "techniqueMastery에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "combatIQ",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 combatIQ 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "샹크스의 미래예지·선제 접근, 전자기포 준비 동작과 산하 함대 보호 목적, 거인들의 후속 개입이 있다. 키드의 모든 능력을 이 한 순간만으로 일괄 감점하지 않는다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-killer-hawkins-1054-killer",
    "battleId": "battle-wano-detailed-killer-hawkins-1054",
    "subjectCharacterId": "killer",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/61286/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "호킨스에게 타격을 가하면 키드에게 피해가 전가되는 상황에서 킬러는 키드에게 없는 왼팔을 절단해 연결을 해제하고 상대를 제압했다.",
    "supportedAbilities": [
      "킬러 vs 호킨스 짚인형 상성",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "context",
        "note": "defense에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "stamina",
        "role": "context",
        "note": "stamina에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 combatIQ 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "키드를 인질로 잡힌 변칙 조건; 성공은 상대 능력의 약점 발견·절단 정확도를 뒷받침하나 사황급 공격력은 직접 증명하지 않는다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-akazaya-kaido-1004-kinemon",
    "battleId": "battle-wano-detailed-akazaya-kaido-1004",
    "subjectCharacterId": "kinemon",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o5993/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "여러 아카자야 검객이 카이도의 비늘에 상처를 내기 시작했고, 라이조는 보로 브레스를 두루마리에 담아 되돌렸으며 무사들은 오뎅 이도류 기술을 함께 사용했다.",
    "supportedAbilities": [
      "아카자야 무사들 vs 카이도 집단전",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "집단 타격과 병행 기술의 성과다. 각 무사 개개인의 단독 방어 관통을 증명하지 않고 카이도의 체력·전황과 별개로 취급한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-akazaya-kaido-1004-denjiro",
    "battleId": "battle-wano-detailed-akazaya-kaido-1004",
    "subjectCharacterId": "denjiro",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o5993/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "여러 아카자야 검객이 카이도의 비늘에 상처를 내기 시작했고, 라이조는 보로 브레스를 두루마리에 담아 되돌렸으며 무사들은 오뎅 이도류 기술을 함께 사용했다.",
    "supportedAbilities": [
      "아카자야 무사들 vs 카이도 집단전",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "집단 타격과 병행 기술의 성과다. 각 무사 개개인의 단독 방어 관통을 증명하지 않고 카이도의 체력·전황과 별개로 취급한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-akazaya-kaido-1004-ashura-doji",
    "battleId": "battle-wano-detailed-akazaya-kaido-1004",
    "subjectCharacterId": "ashura-doji",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o5993/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "여러 아카자야 검객이 카이도의 비늘에 상처를 내기 시작했고, 라이조는 보로 브레스를 두루마리에 담아 되돌렸으며 무사들은 오뎅 이도류 기술을 함께 사용했다.",
    "supportedAbilities": [
      "아카자야 무사들 vs 카이도 집단전",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "집단 타격과 병행 기술의 성과다. 각 무사 개개인의 단독 방어 관통을 증명하지 않고 카이도의 체력·전황과 별개로 취급한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-akazaya-kaido-1004-kawamatsu",
    "battleId": "battle-wano-detailed-akazaya-kaido-1004",
    "subjectCharacterId": "kawamatsu",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o5993/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "여러 아카자야 검객이 카이도의 비늘에 상처를 내기 시작했고, 라이조는 보로 브레스를 두루마리에 담아 되돌렸으며 무사들은 오뎅 이도류 기술을 함께 사용했다.",
    "supportedAbilities": [
      "아카자야 무사들 vs 카이도 집단전",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "집단 타격과 병행 기술의 성과다. 각 무사 개개인의 단독 방어 관통을 증명하지 않고 카이도의 체력·전황과 별개로 취급한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-akazaya-kaido-1004-kikunojo",
    "battleId": "battle-wano-detailed-akazaya-kaido-1004",
    "subjectCharacterId": "kikunojo",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o5993/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "여러 아카자야 검객이 카이도의 비늘에 상처를 내기 시작했고, 라이조는 보로 브레스를 두루마리에 담아 되돌렸으며 무사들은 오뎅 이도류 기술을 함께 사용했다.",
    "supportedAbilities": [
      "아카자야 무사들 vs 카이도 집단전",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "집단 타격과 병행 기술의 성과다. 각 무사 개개인의 단독 방어 관통을 증명하지 않고 카이도의 체력·전황과 별개로 취급한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-akazaya-kaido-1004-raizo",
    "battleId": "battle-wano-detailed-akazaya-kaido-1004",
    "subjectCharacterId": "raizo",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o5993/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "여러 아카자야 검객이 카이도의 비늘에 상처를 내기 시작했고, 라이조는 보로 브레스를 두루마리에 담아 되돌렸으며 무사들은 오뎅 이도류 기술을 함께 사용했다.",
    "supportedAbilities": [
      "아카자야 무사들 vs 카이도 집단전",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "집단 타격과 병행 기술의 성과다. 각 무사 개개인의 단독 방어 관통을 증명하지 않고 카이도의 체력·전황과 별개로 취급한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-akazaya-kaido-1004-inuarashi",
    "battleId": "battle-wano-detailed-akazaya-kaido-1004",
    "subjectCharacterId": "inuarashi",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o5993/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "여러 아카자야 검객이 카이도의 비늘에 상처를 내기 시작했고, 라이조는 보로 브레스를 두루마리에 담아 되돌렸으며 무사들은 오뎅 이도류 기술을 함께 사용했다.",
    "supportedAbilities": [
      "아카자야 무사들 vs 카이도 집단전",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "집단 타격과 병행 기술의 성과다. 각 무사 개개인의 단독 방어 관통을 증명하지 않고 카이도의 체력·전황과 별개로 취급한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-akazaya-kaido-1004-nekomamushi",
    "battleId": "battle-wano-detailed-akazaya-kaido-1004",
    "subjectCharacterId": "nekomamushi",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o5993/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "여러 아카자야 검객이 카이도의 비늘에 상처를 내기 시작했고, 라이조는 보로 브레스를 두루마리에 담아 되돌렸으며 무사들은 오뎅 이도류 기술을 함께 사용했다.",
    "supportedAbilities": [
      "아카자야 무사들 vs 카이도 집단전",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "집단 타격과 병행 기술의 성과다. 각 무사 개개인의 단독 방어 관통을 증명하지 않고 카이도의 체력·전황과 별개로 취급한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-inu-jack-1051-inuarashi",
    "battleId": "battle-wano-detailed-inu-jack-1051",
    "subjectCharacterId": "inuarashi",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o6381/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "가려졌던 달빛이 다시 비치며 이누아라시가 스론화하고 잭을 쓰러뜨렸다.",
    "supportedAbilities": [
      "스론 이누아라시 vs 잭",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "context",
        "note": "defense에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 speed 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "techniqueMastery",
        "role": "context",
        "note": "techniqueMastery에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "직전에는 달빛이 가려져 스론이 해제됐고 잭은 밍크족 및 다른 전투로 피해가 누적된 상태였다. 스론은 상시 능력이 아니다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-neko-perospero-1051-nekomamushi",
    "battleId": "battle-wano-detailed-neko-perospero-1051",
    "subjectCharacterId": "nekomamushi",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o6381/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "다시 드러난 보름달 아래 네코마무시가 스론화하여 페로스페로를 격파했다.",
    "supportedAbilities": [
      "스론 네코마무시 vs 페로스페로",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "context",
        "note": "defense에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 speed 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "techniqueMastery",
        "role": "context",
        "note": "techniqueMastery에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "보름달이라는 조건 및 페로스페로의 이전 전투·피해가 영향을 준다. 이 승리 자체가 최고 강자 정면전과 동일하지 않다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-whos-jinbe-1040-whos-who",
    "battleId": "battle-wano-detailed-whos-jinbe-1040",
    "subjectCharacterId": "whos-who",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o6327/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "후즈 후는 육식 지건반을 시전했으나 징베가 공격을 견디고 귀와정권을 적중시켜 제압했다.",
    "supportedAbilities": [
      "후즈 후 vs 징베",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "context",
        "note": "stamina에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "speed",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 speed 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "techniqueMastery",
        "role": "context",
        "note": "techniqueMastery에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "combatIQ",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 combatIQ 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "과거 CP9 경력과 징베에 대한 적대·감정적 발언이 교전에 개입; 기술을 사용했다는 사실과 상대에게 입힌 실질 피해는 구분한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-sasaki-franky-1042-sasaki",
    "battleId": "battle-wano-detailed-sasaki-franky-1042",
    "subjectCharacterId": "sasaki",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o6337/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "양측이 장시간 힘겨운 공방을 벌인 뒤 프랑키가 장군에서 탈출해 라디칼 빔을 적중시켜 사사키가 쓰러졌다.",
    "supportedAbilities": [
      "사사키 vs 프랑키 장군",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "context",
        "note": "techniqueMastery에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "combatIQ",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 combatIQ 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "프랑키 장군의 기계적 내구와 본체 프랑키의 상태가 다르며, 상대의 탈출·무기 교체를 사사키가 알아차리지 못했다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-blackmaria-robin-1044-black-maria",
    "battleId": "battle-wano-detailed-blackmaria-robin-1044",
    "subjectCharacterId": "black-maria",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o6341/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "블랙 마리아가 로빈을 거미줄·불꽃으로 묶고 공격했으나 로빈이 데모니오 플뢰르와 관절기로 제압했다.",
    "supportedAbilities": [
      "블랙 마리아 vs 로빈·브룩",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 attack 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "context",
        "note": "stamina에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "context",
        "note": "combatIQ에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "versatility",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 versatility 연결 시 타인의 기여/조건을 분리한다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "브룩은 부하·환영에 대응하고 로빈이 숨긴 신기술이 결정타가 됐다. 블랙 마리아의 구속 성공을 단독 방어 관통 최고위력으로 환산하지 않는다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-ulti-bigmom-1033-ulti",
    "battleId": "battle-wano-detailed-ulti-bigmom-1033",
    "subjectCharacterId": "ulti",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o6243/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "울티가 나미를 압박하던 와중 빅 맘이 명광포를 울티에게 적중시켰고, 이후 나미의 공격과 제우스가 전황에 영향을 주었다.",
    "supportedAbilities": [
      "울티 vs 빅 맘 개입 / 나미",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "context",
        "note": "attack에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "context",
        "note": "techniqueMastery에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "combatIQ",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 combatIQ 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "상대가 나미·우솝·빅 맘으로 바뀌고 개입 타격이 매우 커 나미의 1대1 순수 화력으로 울티를 잡은 것처럼 판단하면 안 된다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-pageone-bigmom-1031-page-one",
    "battleId": "battle-wano-detailed-pageone-bigmom-1031",
    "subjectCharacterId": "page-one",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o6229/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "빅 맘이 무장색을 실은 일격을 페이지 원의 얼굴에 적중시켜 그 자리에서 쓰러뜨렸다.",
    "supportedAbilities": [
      "페이지 원 vs 빅 맘",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "context",
        "note": "attack에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "defense",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 defense 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "stamina",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 stamina 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "context",
        "note": "techniqueMastery에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "combatIQ",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 combatIQ 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "versatility",
        "role": "context",
        "note": "versatility에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "사황이 사용한 매우 강한 일격이며 공정한 반응 및 장기전 조건이 아니다. 타격 1회로 모든 방어축을 극단적으로 낮추지 않는다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  },
  {
    "id": "evidence-wano-detailed-kanjuro-betrayal-977-kanjuro",
    "battleId": "battle-wano-detailed-kanjuro-betrayal-977",
    "subjectCharacterId": "kanjuro",
    "source": {
      "type": "supplementary",
      "reference": "ONE PIECE.com 공식 애니 전투 요약 https://one-piece.com/anime/o5785/index.html"
    },
    "evidenceStrength": "moderate",
    "fact": "칸주로는 아카자야를 속이며 그림을 일부러 서투르게 그려 실제 능력을 숨겼고, 배신 시점에 자신의 위치를 그림으로 위장하고 모모노스케를 붙잡았다.",
    "supportedAbilities": [
      "칸주로의 배신 공개와 그림 실체화",
      "실전 교전과 전투 조건"
    ],
    "statContributions": [
      {
        "stat": "attack",
        "role": "context",
        "note": "attack에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "defense",
        "role": "context",
        "note": "defense에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "stamina",
        "role": "context",
        "note": "stamina에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "speed",
        "role": "context",
        "note": "speed에 직접 긍정·부정 증명 없음; 이 사건을 자동 가감점으로 쓰지 않는다."
      },
      {
        "stat": "techniqueMastery",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 techniqueMastery 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "combatIQ",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 combatIQ 연결 시 타인의 기여/조건을 분리한다."
      },
      {
        "stat": "versatility",
        "role": "secondary",
        "note": "직접 확인된 전투 성과와 versatility 연결 시 타인의 기여/조건을 분리한다."
      }
    ],
    "interpretation": "조건부 원작 사실을 사건별로 기록하고 협동 성과 및 전투 결과를 개인의 모든 능력에 무비판적으로 배분하지 않는다.",
    "evaluationImpact": "관련 Stat의 근거 연결 및 E2/E3 불확실성 검토를 보완하지만 이미 승인된 계산식·패기 Raw는 바꾸지 않는다.",
    "uncertainty": "정보전·동료 기만 및 인질 상황으로 정면 검술 성과와 다르다. 능력 숙련과 판단력을 분리한다. 해당 만화 패널 전부를 직접 대조하기 전이라 보조자료로만 기록한다."
  }
]
