import type { CombatStat } from '../../domain/evaluation/types'

/**
 * v0.1.67: NON-NUMERIC source/readiness notes for Vista vs Mihawk (Ch.561–562).
 *
 * This is not an Evaluation, Evidence, Battle or Matchup mutation, and is NEVER
 * consumed by production calculation. No full copyrighted manga-panel content
 * was accessible through the official subscription reader for this review.
 */
export type V0167EvidenceLayer =
  | 'official-profile-or-news'
  | 'chapter-reference-plus-secondary-summary'
  | 'secondary-summary-only'
  | 'source-gap'

export type V0167SwordsmanshipScene = {
  id: string
  chapter: '561' | '562' | '561-562' | '574' | 'profile'
  layer: V0167EvidenceLayer
  linkedEvidenceIds: readonly string[]
  affectedStats: readonly CombatStat[]
  observation: string
  contextOrAlternative: string
  cannotConclude: string
  nextVerification: string
}

export const v0167VistaSwordsmanshipScenes: readonly V0167SwordsmanshipScene[] = [
  {
    id: 'vista-mihawk-official-swordsmanship',
    chapter: 'profile',
    layer: 'official-profile-or-news',
    linkedEvidenceIds: ['evidence-vista-official-mihawk-profile'],
    affectedStats: ['techniqueMastery'],
    observation: 'ONE PIECE.com 인물 소개는 비스타가 이도류 대검호이며 미호크와 호각으로 겨룰 정도의 검술을 지녔다고 명시한다. 공식 2021 뉴스도 정상결전에서 두 검객의 교전을 명시한다.',
    contextOrAlternative: '동일한 정상결전 교환을 설명한 두 공식 자료로, 독립 결투 2회가 아니다. 공식 미호크 프로필은 세계 최강의 검사 칭호를 유지한다.',
    cannotConclude: '공식 문구는 0~100 수치나 비스타와 미호크의 장기전 Overall 동점을 제시하지 않는다.',
    nextVerification: '공식 양측 설정과 개별 컷을 교차 대조하되 「호각」을 12점 전부 감산 또는 +3 자동 상향으로 바꾸지 않는다.',
  },
  {
    id: 'vista-mihawk-561-interception',
    chapter: '561',
    layer: 'chapter-reference-plus-secondary-summary',
    linkedEvidenceIds: ['evidence-vista-mihawk-561-562', 'evidence-mihawk-vista-561-562'],
    affectedStats: ['techniqueMastery', 'defense', 'speed', 'combatIQ'],
    observation: '현행 Evidence와 Ch.561의 2차 상세 요약은 비스타가 루피를 뒤쫓는 미호크를 요격해 검을 교환하고 루피가 전진한 장면을 기술한다.',
    contextOrAlternative: '루피 보호를 위한 전시 요격이며 승부를 겨루기 위한 대등한 1대1 결투는 아니다. 2차 요약은 마르코가 비스타에게 개입하도록 지시했다고 기술한다.',
    cannotConclude: '비스타의 독립 전술 설계·전투 지능 상승, 미호크의 최대 출력, 공격 거리/순간 가속이나 참격 위력의 우위는 검증되지 않는다.',
    nextVerification: '정식 원작 Ch.561의 지시 주체·비스타의 사전 위치·검격 첫 교환·전장 보호 목적을 패널에서 각각 확인해야 한다.',
  },
  {
    id: 'vista-mihawk-561-blade-exchange',
    chapter: '561',
    layer: 'chapter-reference-plus-secondary-summary',
    linkedEvidenceIds: ['evidence-vista-mihawk-561-562', 'evidence-mihawk-vista-561-562'],
    affectedStats: ['techniqueMastery', 'attack', 'defense', 'speed'],
    observation: '비스타와 미호크의 검술 교환 자체는 공식 인물 프로필·2021 뉴스로 교차 지지된다. Ch.561에서의 구체적인 컷 배열과 검격 수는 원본 미확인이다.',
    contextOrAlternative: '상대에게 검을 주고받게 한 숙련과 반응은 인정하지만, 같은 한 번의 칼 교환은 공방·반응·공격의 서로 다른 기제를 자동 정량화하지 못한다.',
    cannotConclude: '유효 상처, 치명적 방어파괴, 절대 검속 비교, 기술 난이도별 우열, 반복 성공률은 확정할 수 없다.',
    nextVerification: '각 컷의 공격 시작/차단/회피/검격 연결과 피해 결과를 판별해야 추가 Base 상향 폭을 제안할 수 있다.',
  },
  {
    id: 'vista-mihawk-562-continuation',
    chapter: '562',
    layer: 'secondary-summary-only',
    linkedEvidenceIds: ['evidence-vista-mihawk-561-562', 'evidence-mihawk-vista-561-562'],
    affectedStats: ['techniqueMastery', 'defense', 'stamina'],
    observation: 'Ch.562의 2차 장면 요약은 비스타와 미호크의 공방이 계속되고 양측이 나중으로 승부를 미루었다고 기록한다.',
    contextOrAlternative: '파시피스타 전개 및 전황 변화 속 짧은 부분 교전이다. 만화 원문/컷을 직접 열람하지 못했으므로 휴전 제안의 정확한 대사·주체는 확정 기록으로 승격하지 않는다.',
    cannotConclude: '무승부 확정, 무한 시간 동급, 미호크의 진심/전력 여부, 비스타의 장기전 지속시간과 누적 피로도는 입증되지 않는다.',
    nextVerification: 'Ch.562의 실제 컷에 나온 검술 교환 지속 여부, 교전 중단 대사 주체·이유, 피격 및 타 전장 변수를 대조한다.',
  },
  {
    id: 'vista-mihawk-561-tactical-origin',
    chapter: '561',
    layer: 'secondary-summary-only',
    linkedEvidenceIds: ['evidence-vista-mihawk-561-562'],
    affectedStats: ['combatIQ', 'versatility'],
    observation: '서로 다른 2차 요약에서 마르코가 루피 보호를 위해 비스타를 호출하거나 배치했다고 서술한다.',
    contextOrAlternative: '임무를 받아 수행한 기량과 그 임무 자체의 창안은 분리해야 한다. 기존 Combat IQ77 설명의 「적절한 강자 요격 선택」을 비스타 단독 작전 발안으로 읽지 않는다.',
    cannotConclude: '마르코의 지시가 있었다는 요약만으로 비스타의 판단력이 낮다는 뜻도 아니며, 비스타 독자 전략의 반복 성과도 확인되지 않는다.',
    nextVerification: '원문에서 마르코 지시와 비스타의 자발적 추가 판단을 정확히 구분한다. 현재 IQ 수치의 가감은 승인 없이 금지.',
  },
  {
    id: 'vista-akainu-574-separate-event',
    chapter: '574',
    layer: 'chapter-reference-plus-secondary-summary',
    linkedEvidenceIds: ['evidence-vista-armament-akainu-574'],
    affectedStats: ['attack', 'techniqueMastery'],
    observation: '별도 Ch.574의 사카즈키 상대 무장색 합동 검격은 기존 Attack Raw4/Technique Raw2의 근거로 기록돼 있다.',
    contextOrAlternative: '마르코와 합동하며 지속 상처가 확정되지 않았다. Haki 사용과 검술 숙련·실제 독립적 exceptional Raw 증분은 각각 다른 질문이다.',
    cannotConclude: 'Ch.574의 무장색 사용을 Ch.561–562 미호크전 무장색 시각적 증거로 소급하거나 같은 검격의 Base와 Raw를 이중 가산할 수 없다.',
    nextVerification: 'Technique Base의 일반 검술과 Raw의 특출난 별도 Haki 효과를 다른 사건에서 독립 검증한다.',
  },
  {
    id: 'vista-mihawk-panel-access-limit',
    chapter: '561-562',
    layer: 'source-gap',
    linkedEvidenceIds: ['evidence-vista-mihawk-561-562'],
    affectedStats: ['techniqueMastery'],
    observation: '정식 VIZ Ch.561 및 Ch.562 페이지는 확인되었으나 챕터 본문은 Join to read 형태로 인증/구독이 요구되어 전체 컷에 직접 접근하지 못했다.',
    contextOrAlternative: '원작 직접 인용·장면 배치는 기존 내부 Evidence 또는 명시한 2차 장면 요약에 의존한다. 공식 애니 470/471 각 회의 공식 시놉시스는 비스타 교환 동작을 자세히 재현하지 않는다.',
    cannotConclude: '직접 컷 검증 완료, 구체적인 동작 수·거리·의도·패기 사용·균형상태가 원작에서 독립 확인됐다는 주장은 금지된다.',
    nextVerification: '저작권 있는 원본을 합법적으로 열람 가능한 환경에서 필요한 컷의 사건 요소만 기록한다.',
  },
]

export type V0167TechniquePeerAnchor = {
  characterId: 'mihawk' | 'vista' | 'zoro' | 'king' | 'marco' | 'katakuri'
  modality: 'primarily-swordsmanship' | 'mixed-weapon-and-other-powers' | 'ability-technique'
  primaryEvidenceIds: readonly string[]
  comparability: 'direct-sword-skill' | 'partial-sword-skill' | 'broad-technique-only'
  caveat: string
}

export const v0167TechniquePeers: readonly V0167TechniquePeerAnchor[] = [
  {
    characterId: 'mihawk', modality: 'primarily-swordsmanship', comparability: 'direct-sword-skill',
    primaryEvidenceIds: ['evidence-mihawk-vista-561-562', 'evidence-mihawk-world-strongest-profile'],
    caveat: '세계 최강 검사 공식 위상·검격 숙련은 기준점이나, Technique99가 한 차례 제한적 정상결전에서 매 공격마다 최대 출력이었다는 뜻은 아니다.',
  },
  {
    characterId: 'vista', modality: 'primarily-swordsmanship', comparability: 'direct-sword-skill',
    primaryEvidenceIds: ['evidence-vista-mihawk-561-562', 'evidence-vista-official-mihawk-profile'],
    caveat: '호각 공식 묘사는 강한 검술 앵커지만 비스타가 미호크와 모든 검격·전력·지구력에서 수치상 동일하다는 명제는 아니다.',
  },
  {
    characterId: 'zoro', modality: 'primarily-swordsmanship', comparability: 'partial-sword-skill',
    primaryEvidenceIds: ['evidence-zoro-conquerors-1033-1035'],
    caveat: '최신 시점 삼도류/엔마/패왕색 응용으로 Final87이며, 비스타87과 동점이라도 Base85+Raw4와 비스타 Base86+Raw2라는 구성 및 전투 상대·시점은 다르다.',
  },
  {
    characterId: 'king', modality: 'mixed-weapon-and-other-powers', comparability: 'partial-sword-skill',
    primaryEvidenceIds: ['evidence-king-zoro-1035', 'evidence-king-armament-1032'],
    caveat: 'Technique80에는 검술·고대종·화염·루나리아 상태 운용이 혼합된다. 순수 검술 실력 80으로 곧바로 읽을 수 없다. 통상 무장색 Raw0은 승인된 중복 제거 결과.',
  },
  {
    characterId: 'marco', modality: 'ability-technique', comparability: 'broad-technique-only',
    primaryEvidenceIds: ['evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006'],
    caveat: 'Technique84는 불사조 변화·재생·지원까지 포함하는 운용숙련이다. 비스타의 검술 정확도와 1:1 직접 순위를 의미하지 않는다.',
  },
  {
    characterId: 'katakuri', modality: 'ability-technique', comparability: 'broad-technique-only',
    primaryEvidenceIds: ['evidence-katakuri-future-sight-881-884', 'evidence-katakuri-awakening-882'],
    caveat: 'Technique87은 모치 부분변형·각성과 견문색 Raw6이 결합된 값이다. 동점은 검술의 동등성을 증명하지 않는다.',
  },
]
