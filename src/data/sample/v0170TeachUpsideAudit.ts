import type { CombatStat } from '../../domain/evaluation/types'

/**
 * v0.1.70 Teach upside review: explicit evidence-only decision gate.
 * Candidate direction DOES NOT mutate numeric evaluations, assume new feats,
 * or calculate imaginary downsides. Scenes are already in baseline Eval.
 */
export type TeachAxisReview = {
  stat: CombatStat
  baselineFinal: number
  readiness: 'E1'|'E2'|'E3'
  upsideStatus: 'plausible-but-currently-counted'|'not-established'
  supportingEvidence: readonly string[]
  upwardArgument: string
  boundaryAndCounterevidence: string
  nextProofRequirement: string
}
export const v0170TeachUpsideReview: readonly TeachAxisReview[] = [
  {
    stat:'attack',baselineFinal:95,readiness:'E2',upsideStatus:'plausible-but-currently-counted',
    supportingEvidence:['evidence-teach-gura-577','evidence-teach-law-1063-1064','evidence-teach-ace-440-441'],
    upwardArgument:'흔들흔들 열매와 어둠어둠 열매의 결합, 로 상대 충격파와 에이스 상대 근접 봉쇄는 최상급 공격 수단의 근거다.',
    boundaryAndCounterevidence:'원거리 충격파 규모 및 보유한 열매 수를 동일 강자의 직접 누적 유효타 또는 전성기 흰수염급 출력으로 치환하지 않는다.',
    nextProofRequirement:'기존 Base95와 다른 독립 최고 수준 상대에게 큰 유효 피해 또는 지진 정밀/피해 상한의 반복 관측이 있어야 96+ 승인 검토.',
  },
  {
    stat:'defense',baselineFinal:89,readiness:'E2',upsideStatus:'not-established',
    supportingEvidence:['evidence-teach-whitebeard-576','evidence-teach-law-1063-1064','evidence-teach-hancock-nullification-1059'],
    upwardArgument:'다수 강자 공세에도 생존하며 접촉 봉쇄로 위험한 능력을 무효화한 사례가 있다.',
    boundaryAndCounterevidence:'어둠어둠 열매의 고통 증폭, 흰수염과 로 공격을 직접 허용한 장면은 피격 피해 경감보다 Stamina 근거다. 핸콕 봉쇄는 Defense 우위 그 자체가 아니다.',
    nextProofRequirement:'강한 공격을 실제로 방어/차단/회피한 별도 반복 장면 필요.',
  },
  {
    stat:'stamina',baselineFinal:95,readiness:'E2',upsideStatus:'plausible-but-currently-counted',
    supportingEvidence:['evidence-teach-whitebeard-576','evidence-teach-law-1063-1064','evidence-teach-heart-pirates-1081'],
    upwardArgument:'흰수염과 로에게 큰 공격을 허용하고도 전투를 지속한 실전 자료가 반복된다.',
    boundaryAndCounterevidence:'이미 Base95에 포함돼 있으며 서로 다른 시점의 타격을 1회의 끊임없는 장기 결투로 합산하면 안 된다.',
    nextProofRequirement:'누적 피로 조건이 명확한 장시간 최고 강자전에서 지속력이 한 단계 더 높다는 별도 확인 필요.',
  },
  {
    stat:'speed',baselineFinal:82,readiness:'E3',upsideStatus:'not-established',
    supportingEvidence:['evidence-teach-ace-440-441','evidence-teach-law-1063-1064'],
    upwardArgument:'에이스/로 전장에서 실제 반응·접근을 수행했다.',
    boundaryAndCounterevidence:'크로우즈 흡인을 개인 이동 속도로, 공간의 변화와 전황 선점을 순수 Speed 상한으로 계산할 수 없다.',
    nextProofRequirement:'기존 상위 Speed 앵커와 동일한 장면 조건에서 접근·회피·반응을 반복 직접 확인.',
  },
  {
    stat:'techniqueMastery',baselineFinal:93,readiness:'E2',upsideStatus:'plausible-but-currently-counted',
    supportingEvidence:['evidence-teach-kurouzu-441','evidence-teach-hancock-nullification-1059','evidence-teach-law-1063-1064'],
    upwardArgument:'에이스전 흡인→봉쇄→근접 공격과 핸콕 봉쇄, 로전 두 열매 전환으로 정밀 운용 사례가 여러 번 있다. 7축 중 최우선 정성 상향 재검토 후보다.',
    boundaryAndCounterevidence:'핵심 제압 사건을 Attack/Combat IQ/Technique에서 새 점수로 다중 가산하지 말아야 한다. 현재 Base93 설명이 이미 세 사건을 포함한다.',
    nextProofRequirement:'두 열매의 조합으로 만들어낸 새로운 정밀 응용 또는 동축 미호크/로/로저 수준 앵커 대비 독립 고숙련 장면을 확보해야 94+ 정량 제안 가능.',
  },
  {
    stat:'combatIQ',baselineFinal:87,readiness:'E2',upsideStatus:'plausible-but-currently-counted',
    supportingEvidence:['evidence-teach-kurouzu-441','evidence-teach-hancock-nullification-1059','evidence-teach-law-1063-1064'],
    upwardArgument:'상성을 파악한 에이스 공략, 핸콕 접촉 제압은 실제 판단 성공이다.',
    boundaryAndCounterevidence:'로 상대 위험한 돌진과 간부의 철수 제안, 에이스 상대 전술의 이미 반영된 효과를 숨기면 과대평가다.',
    nextProofRequirement:'대응 변화·상대 약점 분석이 별개 고난도 교전에서 반복 입증되어야 88+ 조정안 근거가 된다.',
  },
  {
    stat:'versatility',baselineFinal:93,readiness:'E1',upsideStatus:'plausible-but-currently-counted',
    supportingEvidence:['evidence-teach-ace-440-441','evidence-teach-gura-577','evidence-teach-hancock-nullification-1059','evidence-teach-law-1063-1064'],
    upwardArgument:'흡인, 직접 능력 봉쇄, 광역 지진, 능력자 제압 등 여러 실제 전투 역할이 확인된다.',
    boundaryAndCounterevidence:'악마의 열매가 두 개 있다는 사실이나 상대 해적단을 패배시켰다는 결과만으로 현재 Base93이 놓친 새로운 활용을 구성하지 않는다.',
    nextProofRequirement:'장거리 지원/회피/전장 구조 제어 등 기존 역할과 구별되는 전투 활용을 새로 확인해야 94+ 검토.',
  },
]

export const v0170TeachReviewSources = [
  'https://one-piece.com/character/Marshall_D_Teech/index.html',
  'https://one-piece.com/character/ace/index.html',
  'https://one-piece.com/anime/325/index.html',
  'https://one-piece.com/anime/65154/index.html',
  'https://one-piece.com/anime/68212/index.html',
] as const
