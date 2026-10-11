/**
 * v0.1.72 READ-ONLY calibration anchors.
 *
 * A candidate's evidence readiness and lock governance are not canon rankings.
 * The overall is an arithmetic mean of the seven *Final* stats, after the
 * existing Haki Weight 0.5 rule (not a mean of Base scores).
 *
 * This registry is intentionally NOT imported into score/evaluation/model/UI:
 * it audits existing data without overwriting a single Character Evaluation.
 * A locked anchor may change only by an explicit versioned reconsideration.
 */
import type { CombatStat } from '../../domain/evaluation/types'

export const calibrationAxisOrder = [
  'attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility',
] as const satisfies readonly CombatStat[]

export type AnchorDecision = 'locked-overall' | 'conditional-overall' | 'deferred'
export type AnchorCohort = 'legend' | 'admiral' | 'bridge' | 'first-commander'
export type AxisReadiness = 'E1' | 'E2' | 'E3'
export type CalibrationAnchor = {
  characterId:string
  cohort:AnchorCohort
  label:string
  subjectState:string
  decision:AnchorDecision
  /** Current Final 7-stat snapshot. Never infer from rank or bounty. */
  finalScores:readonly [number,number,number,number,number,number,number]
  evidenceReadiness:readonly [AxisReadiness,AxisReadiness,AxisReadiness,AxisReadiness,AxisReadiness,AxisReadiness,AxisReadiness]
  lockedAxisNames:readonly CombatStat[]
  reviewAxisNames:readonly CombatStat[]
  /** Why this evaluation can/cannot be an external calibration constraint. */
  decisionRationale:string
  sourcePointers:readonly string[]
}

export const calibrationAnchorsV0172 = [
  {
    characterId:'roger',cohort:'legend',label:'골 D. 로저',subjectState:'prime',decision:'locked-overall',
    finalScores:[100,99,99,98,99,97,91],evidenceReadiness:['E1','E2','E1','E2','E1','E1','E2'],
    lockedAxisNames:['attack','stamina','techniqueMastery','combatIQ'],
    reviewAxisNames:['defense','speed','versatility'],
    decisionRationale:'뉴게이트와의 패왕색 공방, 오뎅 상대 유효타, 최상위 검사·패기 운용에 대한 대표 기준. 해적단 간 3일 전투를 로저 개인의 무휴식 일대일 72시간으로 단정하지 않음. 다른 E2 축은 정밀도 제한.',
    sourcePointers:['evaluation-roger','One Piece manga Ch.965–966','https://one-piece.com/'],
  },
  {
    characterId:'newgate',cohort:'legend',label:'전성기 에드워드 뉴게이트',subjectState:'prime',decision:'locked-overall',
    finalScores:[100,99,99,96,98,95,96],evidenceReadiness:['E1','E1','E1','E2','E1','E2','E1'],
    lockedAxisNames:['attack','defense','stamina','techniqueMastery','versatility'],
    reviewAxisNames:['speed','combatIQ'],
    decisionRationale:'로저와의 무기·패왕색 충돌 및 지진 열매의 근접·광역 응용. 정상결전 병든 노년과 전성기 평가를 섞지 않음.',
    sourcePointers:['evaluation-newgate-prime','One Piece manga Ch.966','https://one-piece.com/'],
  },
  {
    characterId:'garp',cohort:'legend',label:'전성기 몽키 D. 거프',subjectState:'prime',decision:'conditional-overall',
    finalScores:[99,99,99,98,99,97,91],evidenceReadiness:['E2','E2','E3','E3','E2','E3','E3'],
    lockedAxisNames:[],reviewAxisNames:['stamina','speed','combatIQ','versatility'],
    decisionRationale:'전성기 Overall97.429은 잠정 비교선으로 보존하되 노년 하치노스의 직접 전투를 전성기 모든 축의 정량 증명으로 역산하지 않음. 특히 Versatility91은 로91과 동수이나 독립적인 수단 폭의 의미가 다른지 검토.',
    sourcePointers:['evaluation-garp','evaluation-garp-current','https://one-piece.com/anime/69144/index.html','https://one-piece.com/anime/69263/index.html'],
  },
  {
    characterId:'kaido',cohort:'legend',label:'카이도',subjectState:'onigashima',decision:'locked-overall',
    finalScores:[98,100,100,96,96,91,96],evidenceReadiness:['E1','E1','E1','E1','E1','E1','E1'],
    lockedAxisNames:['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility'],
    reviewAxisNames:[],
    decisionRationale:'루피·야마토·최악의 세대·아카자야와의 반복 교전 및 누적 피해, 오니가시마 운반, 기어5 결전을 7축으로 분리. 여러 상대/임무를 고려하되 결과 단독 스케일링 금지.',
    sourcePointers:['evaluation-kaido','https://one-piece.com/anime/63846/index.html'],
  },
  {
    characterId:'akainu',cohort:'admiral',label:'사카즈키(아카이누)',subjectState:'marineford/punk-hazard',decision:'conditional-overall',
    finalScores:[97,95,96,86,91,91,91],evidenceReadiness:['E2','E2','E2','E3','E2','E2','E2'],
    lockedAxisNames:[],reviewAxisNames:['speed'],
    decisionRationale:'쿠잔을 상대로 10일 결투에 승리한 승패는 지구력·상성·교전 조건과 함께 해석. 쿠잔 Overall92.714가 사카즈키92.429보다 0.286 높아도 일대일 결과와 자동 모순은 아님. Speed86(E3)만 정량 기준 확정 유보.',
    sourcePointers:['evaluation-akainu','One Piece manga Ch.650','https://one-piece.com/anime/68212/index.html'],
  },
  {
    characterId:'kuzan',cohort:'admiral',label:'쿠잔(아오키지)',subjectState:'post-timeskip',decision:'conditional-overall',
    finalScores:[93,93,97,90,93,91,92],evidenceReadiness:['E2','E2','E1','E2','E2','E3','E2'],
    lockedAxisNames:['stamina'],reviewAxisNames:['combatIQ'],
    decisionRationale:'사카즈키와 10일 교전/패배 및 부상 뒤 하치노스 거프전 재진입을 인정. 하치노스 사제관계·시류의 기습과 거프의 보호 임무를 1대1 전력 우위로 치환하지 않음. CombatIQ91 E3 유보.',
    sourcePointers:['evaluation-kuzan','https://one-piece.com/anime/68212/index.html','https://one-piece.com/anime/69144/index.html'],
  },
  {
    characterId:'kizaru',cohort:'admiral',label:'보르살리노(키자루)',subjectState:'egghead',decision:'locked-overall',
    finalScores:[92,89,91,99,93,90,91],evidenceReadiness:['E2','E2','E2','E1','E2','E2','E2'],
    lockedAxisNames:['speed'],reviewAxisNames:['attack','defense','stamina','techniqueMastery','combatIQ','versatility'],
    decisionRationale:'빛 기반 고속 기동이 Speed99의 최고속 상한 근거. 에그헤드의 베가펑크 암살 임무와 루피전 교전/이탈을 정면 결투 의도와 분리. 다른 E2 축의 오버롤 구성은 현 단계 보존.',
    sourcePointers:['evaluation-kizaru','https://one-piece.com/anime/75024/index.html'],
  },
  {
    characterId:'fujitora',cohort:'admiral',label:'잇쇼(후지토라)',subjectState:'dressrosa',decision:'deferred',
    finalScores:[91,88,87,85,92,86,94],evidenceReadiness:['E2','E2','E3','E2','E2','E2','E2'],
    lockedAxisNames:[],reviewAxisNames:['stamina'],
    decisionRationale:'드레스로자 중력 응용은 풍부하나 의도적 제약과 개인 장기전 부족으로 현 Overall89.000을 확정 앵커로 사용하지 않음.',
    sourcePointers:['evaluation-fujitora'],
  },
  {
    characterId:'ryokugyu',cohort:'admiral',label:'아라마키(로쿠규)',subjectState:'wano',decision:'deferred',
    finalScores:[90,89,89,84,87,82,92],evidenceReadiness:['E2','E3','E3','E3','E2','E3','E2'],
    lockedAxisNames:[],reviewAxisNames:['defense','stamina','speed','combatIQ'],
    decisionRationale:'여러 E3 축, 샹크스 패기 개입, 다수전·환경·임무 제한 때문에 Overall87.571을 기준점으로 고정하지 않음.',
    sourcePointers:['evaluation-ryokugyu'],
  },
  {
    characterId:'law',cohort:'bridge',label:'트라팔가 로',subjectState:'onigashima',decision:'conditional-overall',
    finalScores:[86,83,85,82,90,88,91],evidenceReadiness:['E1','E2','E2','E3','E1','E1','E1'],
    lockedAxisNames:['attack','techniqueMastery','combatIQ','versatility'],reviewAxisNames:['speed'],
    decisionRationale:'K-ROOM의 내부 피해·위치교환·전술 전환과 키드 협동/낙하/폭발의 분리. ROOM 이동을 순수 신체 Speed로 가산하지 않으며 현재 Speed82 E3는 비교 가설로만 사용.',
    sourcePointers:['evaluation-law','https://one-piece.com/anime/62293/index.html','https://one-piece.com/anime/62440/index.html'],
  },
  {
    characterId:'katakuri',cohort:'first-commander',label:'샬롯 카타쿠리',subjectState:'whole-cake',decision:'locked-overall',
    finalScores:[83,84,84,84,87,82,84],evidenceReadiness:['E2','E2','E2','E2','E2','E2','E2'],
    lockedAxisNames:[],reviewAxisNames:['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility'],
    decisionRationale:'루피와 긴 결투, 미래예지 활용·모치 각성·전투 적응이 여러 축에 드러나는 균형형 1최간 표본. 미래예지의 동일 효과가 Defense·Technique Raw에 분배된 점은 독립 효과 재심사 시 버전 재검토 대상.',
    sourcePointers:['evaluation-katakuri','One Piece manga Ch.879–896'],
  },
  {
    characterId:'marco',cohort:'first-commander',label:'마르코',subjectState:'onigashima',decision:'conditional-overall',
    finalScores:[77,87,87,82,84,80,87],evidenceReadiness:['E2','E1','E2','E2','E2','E2','E2'],
    lockedAxisNames:['defense'],reviewAxisNames:['attack'],
    decisionRationale:'키자루/대장/킹·퀸에게 공방과 요격을 성립시켰으나 피해량/결정타는 분리 필요. 현 Final Attack77은 잭79·후즈후79보다 낮아 재검증, 공격력 상향을 자동 인정하지 않음. 재생과 지원은 Defense/Stamina/Versatility로 분리.',
    sourcePointers:['evaluation-marco','https://one-piece.com/anime/o6343/index.html','https://one-piece.com/anime/o6351/index.html'],
  },
  {
    characterId:'king',cohort:'first-commander',label:'킹(알베르)',subjectState:'onigashima',decision:'conditional-overall',
    finalScores:[83,88,85,83,80,77,82],evidenceReadiness:['E2','E2','E2','E2','E2','E3','E2'],
    lockedAxisNames:[],reviewAxisNames:['defense','speed','combatIQ'],
    decisionRationale:'루나리아 화염 ON에서 방어 강화, OFF에서 속도 강화. Defense88과 Speed83을 실시간 동시 극대치로 가정한 가상 상시 성능을 매치업에 사용하지 않음. CombatIQ77(E3)은 전술 수용/노출 장면 재검증.',
    sourcePointers:['evaluation-king','https://one-piece.com/anime/61675/index.html','https://one-piece.com/anime/67261/index.html'],
  },
] as const satisfies readonly CalibrationAnchor[]

export const v0172ReviewPairs = [
  {first:'akainu',second:'kuzan',focus:'overall',status:'context-review',note:'10일 결투는 사카즈키 승리. 그러나 전체 평균은 쿠잔이 0.285714 높음. 승패와 종합 평균은 동일 개념이 아니다.'},
  {first:'garp',second:'law',focus:'versatility',status:'concept-review',note:'전성기 거프와 로가 둘 다 Versatility91: 독립 메커니즘 폭과 단일 전투 체계의 역할 확장을 같은 것으로 취급한 여부 재검증.'},
  {first:'law',second:'king',focus:'speed',status:'evidence-review',note:'로 Speed82 E3 vs 킹83 E2. ROOM의 공간이동을 신체 속도로 환산하지 않아 재평가 유보.'},
  {first:'marco',second:'whos-who',focus:'attack',status:'evidence-review',note:'마르코 Attack Final77 vs 후즈 후79. 견제/경직/넉백과 실제 누적 피해를 구분한 뒤 결정.'},
  {first:'king',second:'katakuri',focus:'defense',status:'mode-review',note:'킹 방어88과 카타쿠리84: 킹의 루나리아 화염 ON/OFF 조건을 단일 상시 최대방어+최대속도로 동시 사용 금지.'},
] as const

export const v0172AxisGuide = [
  {axis:'attack',frozenHigh:'kaido',score:98,comparison:'킹83·카타쿠리83·마르코77. 직접 대인 피해와 광역 파괴를 분리'},
  {axis:'defense',frozenHigh:'kaido',score:100,comparison:'킹88 (화염 ON 조건), 마르코87 (재생 조건), 카타쿠리84'},
  {axis:'stamina',frozenHigh:'kaido',score:100,comparison:'쿠잔97, 사카즈키96, 마르코87. 10일 지속/누적 부상을 구분'},
  {axis:'speed',frozenHigh:'kizaru',score:99,comparison:'카타쿠리84·킹83·로82. 순간이동/미래예지는 순수 신체 이동과 분리'},
  {axis:'techniqueMastery',frozenHigh:'roger',score:99,comparison:'로90·카타쿠리87·킹80. 기술 종류 수와 고난도 정밀 제어를 분리'},
  {axis:'combatIQ',frozenHigh:'roger',score:97,comparison:'로88·카타쿠리82·킹77. 전장 목표/위험 통제를 추론과 구분'},
  {axis:'versatility',frozenHigh:'kaido',score:96,comparison:'로91·마르코87·카타쿠리84. 독립 기능 수와 단일 능력 파생기를 구분'},
] as const satisfies readonly {axis:CombatStat,frozenHigh:string,score:number,comparison:string}[]

export const v0172AnchorPolicy = {
  version:'0.1.72',
  sourceMainSha:'57617681432d9c7a8e8b03ebbe47206c8c489a2a',
  formula:'Final7 arithmetic mean; existing Haki Weight=0.5',
  lockedMeaning:'Freeze verified Overall snapshot only. Do not assume all seven axis readiness values are E1; individual lockedAxisNames explicitly indicate high-readiness axis pins.',
  conditionalMeaning:'Preserve current numeric baseline for comparison without treating it as an immutable anchor. Changes require direct evidence, peer checks and versioned review.',
  deferredMeaning:'Use as contrast, never as hard calibration constraint until evidence reviewed.',
  decisionGate:'Do not secretly compensate one anchor axis change with an unrelated axis to force the same Overall. If a locked anchor requires a justified correction, version the anchor and explicitly reapprove the Overall.',
  originalEvidenceLimit:'External source checks used ONE PIECE.com anime synopses and existing chapter-indexed project rationale, not direct review of every manga panel.',
} as const
