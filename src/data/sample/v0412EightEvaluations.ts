import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import { COMBAT_STATS, type CombatStat, type Evaluation, type EvidenceReadiness } from '../../domain/evaluation/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

/** v0.4.12 approved inclusion of eight v0.4.9 SCORE DRAFTS, still marked E2/E3 draft.
 * Unrelated prior 76 evaluations and calculations remain frozen; manga-panel review pending.
 */
type Scene = { episode: string; url: string; name: string; fact: string; limits: string; axes: CombatStat[] }
type Seed = { id: string; name: string; score: number[]; scenes: Scene[]; rationale: string[] }
export const v0412Seeds: Seed[] = [
  {
    "id": "guernica",
    "name": "게르니카",
    "score": [
      78,
      76,
      76,
      81,
      84,
      80,
      75
    ],
    "scenes": [
      {
        "episode": "1069",
        "url": "https://one-piece.com/anime/62672/index.html",
        "name": "와노 드레이크 교전·루피/카이도 개입",
        "fact": "드레이크와의 충돌 및 카이도-루피 전투에 개입하여 루피를 붙잡음. 카이도의 타격 결과는 게르니카 자신의 화력이 아니다.",
        "limits": "기습·임무·상대방 누적 피해/카이도 개입 분리",
        "axes": [
          "attack",
          "speed",
          "techniqueMastery",
          "combatIQ",
          "versatility"
        ]
      },
      {
        "episode": "1068",
        "url": "https://one-piece.com/anime/62441/index.html",
        "name": "CP0 전술 임무",
        "fact": "CP0의 교전과 전장 접근을 수행한 정황. 본인의 개별 최고 내구와 장기전은 해당 요약만으로 확정 불가.",
        "limits": "짧은 교전·부대 기여/개인 성과 구분",
        "axes": [
          "defense",
          "stamina"
        ]
      }
    ],
    "rationale": [
      "드레이크 충돌 및 루피 붙잡기 임무의 근접 타격은 인정하지만 카이도의 강타를 자신의 화력으로 계산하지 않는다.",
      "카이도에게 피격된 특수 상황만으로 일반적인 정면 방어력을 단정할 수 없어 76을 E3 잠정으로 둔다.",
      "CP0 전장 임무를 수행하였으나 긴 단독전·피로 누적의 직접 기록이 부족하다.",
      "육식 기동과 드레이크 대응의 반응을 인정하지만 단거리 기습과 지속적인 순수 속도는 구분한다.",
      "지건·육식·임무 수행 동작을 복합 운용하나 다른 CP0의 기술을 게르니카에게 귀속하지 않는다.",
      "임무 목표에 개입하는 판단력은 보이지만 타인이 조성한 결과를 본인 전략 성공으로 더하지 않는다.",
      "체술·은밀한 접근·임무 전환의 폭을 인정하되 상시 원거리 전투/지원 능력은 미확인이다."
    ]
  },
  {
    "id": "maha",
    "name": "마하",
    "score": [
      75,
      70,
      73,
      77,
      80,
      72,
      70
    ],
    "scenes": [
      {
        "episode": "1068",
        "url": "https://one-piece.com/anime/62441/index.html",
        "name": "이조와의 상호 치명적 교전",
        "fact": "마하가 이조와 싸운 뒤 양측 모두 치명적 피해를 입은 와노 CP0 전황.",
        "limits": "이조는 누적 중상 상태였고 마하 또한 팀 임무 중; 정상 상태 이조와의 동급 증거 아님",
        "axes": [
          "attack",
          "defense",
          "stamina",
          "speed",
          "techniqueMastery",
          "combatIQ",
          "versatility"
        ]
      }
    ],
    "rationale": [
      "이미 누적 손상을 입은 이조와 상호 치명적인 교전을 벌였지만 건강한 이조와 동급 화력으로 환산하지 않는다.",
      "교전 끝에 사망한 사실은 확인되나 1대1 방어 표본이 부족해 E3 가설로 둔다.",
      "이조와의 결정적 교전이 있지만 장기간의 누적 전투를 견딘 직접 시간 자료는 충분하지 않다.",
      "CP0 체술 전개에 따른 기동을 추정하지만 최상위 반응속 비교 장면이 부족하다.",
      "CP0 근접 격투 수행으로 숙련을 인정하되 사용한 세부 육식 기술을 확인한 만큼만 반영한다.",
      "조직 임무는 확인되지만 결정적 교전의 전술 판단은 자료가 부족하다.",
      "근접·기습 임무 수행 중심으로, 검증된 넓은 역할 전환이 적다."
    ]
  },
  {
    "id": "usopp",
    "name": "우솝",
    "score": [
      63,
      61,
      70,
      62,
      88,
      76,
      79
    ],
    "scenes": [
      {
        "episode": "697",
        "url": "https://one-piece.com/anime/o2787/index.html",
        "name": "드레스로자 슈거 초장거리 저격",
        "fact": "비올라와 칸주로의 지원, 견문색 감지 이후 먼 거리의 슈거에게 특수탄을 명중시켰다.",
        "limits": "지원 인원·사거리·위치 우세 포함; 초장거리 저격 정확도와 직접 화력 분리",
        "axes": [
          "attack",
          "speed",
          "techniqueMastery",
          "combatIQ",
          "versatility"
        ]
      }
    ],
    "rationale": [
      "정밀 저격과 특수탄은 유효하나 강적 정면 방어 관통·치명적 독립 공격 표본이 적다.",
      "저격 위치 이점이 상시 신체 방어 성능을 의미하지 않으며 정면 피격 위험이 크다.",
      "위기와 추격을 버티는 장면은 있지만 상위 강자와 장기간 직접 타격 교환 경험은 적다.",
      "초장거리 탄환 속도는 우솝의 몸놀림이 아니다. 회피·이동 실적은 보수적으로 평가한다.",
      "지원하에 매우 먼 거리에서 목표를 맞힌 뛰어난 정확도는 높은 Technique 평가 근거다.",
      "전황을 역전시키는 재치·도구 선택을 인정하되 공포로 인한 전술 실패도 고려한다.",
      "팝그린의 구속·지원·속임수·특수탄은 전장 지원의 폭을 보이지만 정면 화력과 별개다."
    ]
  },
  {
    "id": "brook",
    "name": "브룩",
    "score": [
      76,
      69,
      75,
      86,
      85,
      77,
      82
    ],
    "scenes": [
      {
        "episode": "1043",
        "url": "https://one-piece.com/anime/o6339/index.html",
        "name": "로빈을 돕는 전장 지원",
        "fact": "와노에서 동료를 보호·지원하며 검술과 고유 능력을 운용하였다.",
        "limits": "빅 맘 영혼 계열 상성은 일반 상대에게 보편적으로 적용하지 않음",
        "axes": [
          "defense",
          "stamina",
          "speed",
          "combatIQ",
          "versatility"
        ]
      },
      {
        "episode": "1044",
        "url": "https://one-piece.com/anime/o6341/index.html",
        "name": "블랙 마리아 부하 제압",
        "fact": "로빈의 블랙 마리아 전투를 돕고 부하를 상대해 빠른 검술·냉기 관련 기술을 사용.",
        "limits": "로빈이 블랙 마리아 본체를 쓰러뜨린 결과는 브룩 개인 성과가 아님",
        "axes": [
          "attack",
          "techniqueMastery",
          "speed",
          "versatility"
        ]
      }
    ],
    "rationale": [
      "빠른 발도술·냉기 공격으로 부하들을 제압했으나 로빈의 블랙 마리아 결착을 자신의 공격력으로 세지 않는다.",
      "영혼 분리·부활 사실은 물리적으로 높은 방어력이나 피격 무효화를 보장하지 않는다.",
      "다양한 위협 중 교전을 지속하나 사황급 장시간 독립 공격 방어 표본은 제한적이다.",
      "기민한 발도술과 빠른 전장 이동은 직접적인 속도 강점이지만 순수 최고속 비교는 제한된다.",
      "속검·냉기·음악/영혼 운용의 기술적 숙련을 인정하며 서로 다른 출력 메커니즘은 과대 계산하지 않는다.",
      "로빈 보호와 대처 능력은 확인되나 동료의 전술을 브룩 자신의 전술로 귀속하지 않는다.",
      "검술·냉기·영혼 분리·음악 관련 제압과 정찰의 폭을 인정한다."
    ]
  },
  {
    "id": "franky",
    "name": "프랑키",
    "score": [
      82,
      83,
      83,
      68,
      83,
      79,
      82
    ],
    "scenes": [
      {
        "episode": "1042",
        "url": "https://one-piece.com/anime/o6337/index.html",
        "name": "사사키와 프랑키 장군 전투",
        "fact": "프랑키 장군의 장갑과 병기를 이용해 사사키와 공방했고 장군 이탈 후 라디칼 빔으로 제압하였다.",
        "limits": "점수는 프랑키 장군과 현행 장비 활용이 가능한 대표 전투 상태. 로봇 외부 본체 단독 능력과 다름",
        "axes": [
          "attack",
          "defense",
          "stamina",
          "speed",
          "techniqueMastery",
          "combatIQ",
          "versatility"
        ]
      }
    ],
    "rationale": [
      "프랑키 장군 병기·라디칼 빔으로 사사키에게 결정타를 가했지만 장비를 빼고 신체 화력만 평가하지 않는다.",
      "사사키 공격을 장군 기체로 견딘 장갑 방어력을 포함하나 기체 밖 본체의 취약 부위를 구분한다.",
      "장군 탑승 장기 공방을 평가하지만 장비 사용 가능 시간·손상 제약이 존재한다.",
      "기체 중량·전환 속도 제약이 있고 라디칼 빔 사출 속도를 개인 이동 속도로 보지 않는다.",
      "다양한 전술 병기와 장군 이탈 후 빔의 정확한 운용을 인정한다.",
      "장군 피해 시 이탈과 빔 발사의 판단을 인정하되 기계 설계 일반 지능을 전부 Combat IQ로 환산하지 않는다.",
      "기체·미사일·빔·본체 무장 전환의 전투 역할 폭을 인정한다."
    ]
  },
  {
    "id": "chopper",
    "name": "쵸파",
    "score": [
      76,
      75,
      70,
      67,
      82,
      73,
      84
    ],
    "scenes": [
      {
        "episode": "1023",
        "url": "https://one-piece.com/anime/o6183/index.html",
        "name": "몬스터 포인트와 퀸 상대·아이스오니 치료",
        "fact": "몬스터 포인트로 퀸에게 유효한 타격을 가하고 감염 사태에 대응하였다.",
        "limits": "퀸에게 타격한 사실은 인정하지만 퀸을 실제로 제압한 인물은 아님; 럼블볼 지속시간 제한",
        "axes": [
          "attack",
          "defense",
          "stamina",
          "speed",
          "techniqueMastery",
          "combatIQ",
          "versatility"
        ]
      }
    ],
    "rationale": [
      "몬스터 포인트에서 퀸에게 유효타가 있었지만 최종 제압으로 오인하거나 최상위 강자에게 반복 화력을 보였다고 해석하지 않는다.",
      "가드·중량형 변신의 방호에 이점이 있지만 정면 고위 공격 반복 방어는 확인되지 않는다.",
      "럼블볼의 제한시간과 소모가 있어 몬스터 포인트의 순간 지속력과 장기전을 구분한다.",
      "다양한 형태의 순간 기동이 가능하지만 큰 형태의 타격 속도를 최고 이동 속도로 보지 않는다.",
      "몬스터/쿵푸/가드 등 변신을 실제 교전 조건에 맞춰 선택하는 숙련을 인정한다.",
      "전황을 읽고 아군을 지원하지만 의술 연구 성과를 자동으로 Combat IQ 점수에 더하지 않는다.",
      "방어형·공격형·기동형·지원 역할과 럼블볼 능력 변화의 폭을 반영한다."
    ]
  },
  {
    "id": "robin",
    "name": "니코 로빈",
    "score": [
      79,
      68,
      73,
      69,
      86,
      81,
      84
    ],
    "scenes": [
      {
        "episode": "1044",
        "url": "https://one-piece.com/anime/o6341/index.html",
        "name": "블랙 마리아 대결과 데모니오 플뢰르",
        "fact": "꽃꽃 열매의 거대 사지·데모니오 플뢰르, 어인공수도 응용 등을 통해 블랙 마리아를 직접 격파하였다.",
        "limits": "거대 사지의 피격 위험은 본체 방어와 연결되며 브룩 등 아군의 부하 차단 지원 구분",
        "axes": [
          "attack",
          "defense",
          "stamina",
          "speed",
          "techniqueMastery",
          "combatIQ",
          "versatility"
        ]
      }
    ],
    "rationale": [
      "데모니오 플뢰르의 직접 결착을 인정하되 동료가 다른 부하를 상대해 준 다인전 환경을 기록한다.",
      "거대 사지 피격 위험이 본체와 연동될 수 있고 강자 정면 공격 방어 직접 표본이 적다.",
      "고강도 전투를 완수했으나 거대 사지 지속시간과 장기 반복교전 자료는 부족하다.",
      "사지 생성으로 상대를 빠르게 붙잡는 것과 자신의 순수 이동·반응 속도를 구분한다.",
      "대형 분신·사지 구속·관절기 및 어인공수도 응용의 실전 숙련을 확인한다.",
      "전투 중 타이밍과 사지·분신 위치를 선택한 판단을 인정하되 동료의 기여를 본인에게 이전하지 않는다.",
      "제압·구속·정찰·대형 형태/분신 등 넓은 전술 운용을 인정한다."
    ]
  },
  {
    "id": "nami",
    "name": "나미",
    "score": [
      77,
      59,
      61,
      63,
      84,
      83,
      87
    ],
    "scenes": [
      {
        "episode": "1033",
        "url": "https://one-piece.com/anime/o6243/index.html",
        "name": "울티 교전·빅 맘의 선행 공격",
        "fact": "울티가 빅 맘의 강력한 공격으로 중상을 입은 상황이 나미 대결에 영향을 주었다.",
        "limits": "나미 단독 공격력으로 빅 맘의 선행 피해를 합산하지 않음",
        "axes": [
          "attack",
          "defense",
          "stamina",
          "speed",
          "combatIQ"
        ]
      },
      {
        "episode": "1038",
        "url": "https://one-piece.com/anime/o6323/index.html",
        "name": "제우스 결합 기상 공격",
        "fact": "제우스와 크리마 택트를 결합해 울티에게 유효한 마무리 공격을 성립시켰다.",
        "limits": "제우스 동반·장비 보유 전제, 신체 반응과 기술 공격 속도 구분",
        "axes": [
          "attack",
          "techniqueMastery",
          "combatIQ",
          "versatility"
        ]
      }
    ],
    "rationale": [
      "제우스 연계 전격으로 울티에게 결정적 공격을 가했지만 빅 맘의 선행 피해·제우스 동반 조건을 기록한다.",
      "특수 전격과 신체 피격 방어를 구분한다. 정면 장기 공방에서 본체는 비교적 취약하다.",
      "장비를 이용해 생존하지만 장기간 강자 직격 피해를 버틴 표본은 적다.",
      "기상기술의 빠른 발동과 나미 자신의 근접 회피·최고속은 별도 평가한다.",
      "제우스·크리마 택트·기상 응용의 정밀한 복합 운용을 인정한다.",
      "상황과 상성을 읽는 작전을 수행하지만 항해·지도 일반 지능을 전투 판단으로 자동 이식하지 않는다.",
      "전격·구름·공간 교란·제압·지원 등 기상 공격의 다양한 기능을 인정한다."
    ]
  }
]

export const v0412Battles: Battle[] = v0412Seeds.flatMap((seed, idx) =>
  seed.scenes.map((scene, i) => ({
    id: `battle-v0412-${seed.id}-${i}`,
    title: `${seed.name} — ${scene.name}`,
    chronologyOrder: 1100 + idx * 10 + i,
    combatStructure: 'multiple-vs-multiple',
    combatPurpose: '실제 해당 작품 장면의 교전·저지·지원 역할 확인',
    combatIntent: 'unknown',
    environment: scene.name,
    restrictions: scene.limits,
    externalFactors: '외부 개입·아군 기여·장비·상성·사전 누적 피해는 단독 전투력과 분리한다.',
    result: 'unknown',
    participantIds: [],
  }))
)

export const v0412Evidence: Evidence[] = v0412Seeds.flatMap(seed => seed.scenes.map((scene, i) => ({
  id: `evidence-v0412-${seed.id}-${i}`,
  battleId: `battle-v0412-${seed.id}-${i}`,
  subjectCharacterId: seed.id,
  source: { type: 'supplementary', reference: `ONE PIECE.com TV ${scene.episode}`, description: scene.url },
  evidenceStrength: 'moderate',
  fact: scene.fact,
  supportedAbilities: [],
  statContributions: scene.axes.map(stat => ({ stat, role: 'secondary' as const,
    note: `${scene.limits} | 해당 축의 정성적 보조 근거로만 사용. 수치가 공식 설정이라는 뜻은 아니다.` })),
  interpretation: `${scene.fact} ${scene.limits}`,
  evaluationImpact: 'v0.4.9 검토용 7축 초안을 v0.4.12 잠정 Evaluation에 사용자 요청에 따라 채택; 원작 컷 직접 재검증은 아직 별도.',
  uncertainty: `${scene.limits} 에피소드 보조자료의 정황 및 평가자의 해석은 원작 개별 컷·지속시간 직접 계측과 다르다.`,
})))

export const v0412Evaluations: Evaluation[] = v0412Seeds.map(seed => ({
  id: `evaluation-v0412-${seed.id}`,
  characterId: seed.id,
  evaluationDataVersion: 'evaluation-v0.4.12-eight-provisional-source-reviewed',
  status: 'draft',
  subjectState: { id: 'onigashima-or-current', label: '해당 전투 기준 잠정 평가',
    note: '와노~에그헤드, 일반 장비·사용 가능 형태 기준. 게르니카/마하는 와노 CP0 임무 조건. E2/E3 검증 중이며 Haki Raw 추가 없음.' },
  isDefault: true,
  items: COMBAT_STATS.map((stat, i) => {
    const sceneEvidence = seed.scenes.flatMap((scene, j) => scene.axes.includes(stat) ? [`evidence-v0412-${seed.id}-${j}`] : [])
    // Source-limited axes deliberately remain E3 even where a proxy or equipment might be present.
    const readiness: EvidenceReadiness = (sceneEvidence.length === 0 || ['defense', 'stamina'].includes(stat))
      ? 'E3' : 'E2'
    const item = {
      stat, baseScore: seed.score[i], score: seed.score[i],
      rationale: seed.rationale[i] + ' (v0.4.9 사용자 검토용 초안 채택; 점수는 비공식 잠정 비교치).',
      evidenceIds: sceneEvidence, hakiContributions: [], readiness,
    }
    return { ...item, score: getFinalStatScore(item) }
  }),
}))
