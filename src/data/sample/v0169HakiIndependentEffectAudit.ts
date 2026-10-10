import type { CombatStat } from '../../domain/evaluation/types'

/**
 * v0.1.69: qualitative review ONLY of EXISTING exceptional Haki Raw.
 * Explicitly does not set Raw, calculate a theoretical no-Haki baseline,
 * or authorize new scores. One observed action may support several Stat
 * labels, but is not automatically several distinct marginal benefits.
 */
export type V0169HakiAuditRow = {
  characterId: 'vista' | 'shanks' | 'katakuri' | 'jinbe'
  stat: CombatStat
  hakiType: 'armament' | 'observation' | 'conquerors'
  existingRaw: number
  evidenceIds: readonly string[]
  observedEffectGroup: string
  canonicEffect: string
  claimToReexamine: string
  exclusionFromBaseQuestion: string
  disposition: 'retain-unchanged-pending-independent-effect-proof'
}
export const v0169HakiAuditRows: readonly V0169HakiAuditRow[] = [
  {
    characterId: 'vista', stat: 'attack', hakiType: 'armament', existingRaw: 4,
    evidenceIds: ['evidence-vista-armament-akainu-574'], observedEffectGroup: 'joint-akainu-sword-hit-574',
    canonicEffect: '마르코와의 합동 사카즈키 공격에 무장색 검격을 실제로 사용했다.',
    claimToReexamine: '합동 공격에서 사카즈키의 독립 유효 손상·검격 순수 위력이 확정되지 않으며 Base Attack80 밖의 예외적 추가 타격인지 불분명하다.',
    exclusionFromBaseQuestion: '단순히 무장색을 썼다는 사실이 Base80에 이미 포함된 실제 검격 성과를 재가산하는가?',
    disposition: 'retain-unchanged-pending-independent-effect-proof',
  },
  {
    characterId: 'vista', stat: 'techniqueMastery', hakiType: 'armament', existingRaw: 2,
    evidenceIds: ['evidence-vista-armament-akainu-574'], observedEffectGroup: 'joint-akainu-sword-hit-574',
    canonicEffect: '비스타의 이도류와 무장색 사용이 같은 Ch.574 합동 공격에 결합했다.',
    claimToReexamine: 'Attack Raw4와 동일한 합동 검격 장면이며 Ch.561–562 미호크전 패기 기술을 직접 검증하는 사건이 아니다.',
    exclusionFromBaseQuestion: '검술 Base86이 이미 통상 검술/패기 결합의 숙련을 반영했다면 독립적 Technique Raw2를 별도 관측했는가?',
    disposition: 'retain-unchanged-pending-independent-effect-proof',
  },
  {
    characterId: 'shanks', stat: 'attack', hakiType: 'conquerors', existingRaw: 6,
    evidenceIds: ['evidence-shanks-kid-divine-departure-1079'], observedEffectGroup: 'kid-divine-departure-hit-1079',
    canonicEffect: '키드의 전방 공격 준비 과정에서 신속 접근 후 카무사리 한 번으로 키드를 제압했다. 함선 파괴는 도리·브로기의 별개 행동이다.',
    claimToReexamine: '카무사리 패왕색의 별도 추가 피해량은 검술의 원래 결정타 결과와 독립적으로 관찰되지 않았다.',
    exclusionFromBaseQuestion: 'Base Attack94가 이미 카무사리의 실제 공격력을 포함할 때 Conquerors Raw6이 다른 관측 결과를 설명하는가?',
    disposition: 'retain-unchanged-pending-independent-effect-proof',
  },
  {
    characterId: 'shanks', stat: 'techniqueMastery', hakiType: 'conquerors', existingRaw: 4,
    evidenceIds: ['evidence-shanks-kid-divine-departure-1079'], observedEffectGroup: 'kid-divine-departure-hit-1079',
    canonicEffect: '샹크스는 패왕색이 결합된 것으로 평가된 카무사리 검술을 한 차례 사용했다.',
    claimToReexamine: 'Attack Raw6와 같은 카무사리 타격. 검술 정밀도 및 패왕색 제어의 별개 효과가 수치로 분리되지 않았다.',
    exclusionFromBaseQuestion: 'Base Technique92가 실제 카무사리 무기 운용의 정밀성을 포함한 상태에서 예외적 조작 효과는 무엇인가?',
    disposition: 'retain-unchanged-pending-independent-effect-proof',
  },
  {
    characterId: 'shanks', stat: 'techniqueMastery', hakiType: 'observation', existingRaw: 4,
    evidenceIds: ['evidence-shanks-kid-divine-departure-1079'], observedEffectGroup: 'kid-future-sight-1079',
    canonicEffect: '샹크스가 키드의 공격으로 발생할 함대 피해의 미래를 보고 대비했다.',
    claimToReexamine: '미래 정보에 따른 타깃 선택과 공격 구현은 서로 다른 축일 수 있지만 두 Raw를 동시에 인정하려면 추가 독립 숙련 효과의 증거가 필요하다.',
    exclusionFromBaseQuestion: '견문색 선행 예측과 Combat IQ Raw4 및 Base Technique92가 같은 행동을 2회 이상 점수화했는가?',
    disposition: 'retain-unchanged-pending-independent-effect-proof',
  },
  {
    characterId: 'shanks', stat: 'combatIQ', hakiType: 'observation', existingRaw: 4,
    evidenceIds: ['evidence-shanks-kid-divine-departure-1079'], observedEffectGroup: 'kid-future-sight-1079',
    canonicEffect: '미래를 인지한 샹크스가 공격 대상을 신속히 선택해 위협을 차단했다.',
    claimToReexamine: '같은 미래 정보/판단 효과가 Base IQ91에 이미 명시되고 Observation Technique Raw4에도 연결돼 있다.',
    exclusionFromBaseQuestion: 'Base IQ91이 미래예지 정보에 따른 즉각 판단을 평가한다고 설명하는 이상 IQ Raw4의 추가적 별개 판단은 무엇인가?',
    disposition: 'retain-unchanged-pending-independent-effect-proof',
  },
  {
    characterId: 'katakuri', stat: 'defense', hakiType: 'observation', existingRaw: 6,
    evidenceIds: ['evidence-katakuri-future-sight-881-884'], observedEffectGroup: 'katakuri-future-sight-mochi-evasion-881-884',
    canonicEffect: '견문색으로 다음 공격을 앞서 예측하고 모치 신체를 부분 변형해 실제로 회피한다. 냉정함을 잃으면 해당 효과가 약화된다.',
    claimToReexamine: '미래예지의 실제 방어 성공은 공식 애니 TV857로 교차 확인되지만, Base Defense81과 예외 Raw6의 독립 인과 효과 크기를 측정하지는 못한다.',
    exclusionFromBaseQuestion: 'Base81의 모치 변형·회피 기여와 Raw6의 미래예지가 하나의 회피를 두 번 점수화했는가?',
    disposition: 'retain-unchanged-pending-independent-effect-proof',
  },
  {
    characterId: 'katakuri', stat: 'techniqueMastery', hakiType: 'observation', existingRaw: 6,
    evidenceIds: ['evidence-katakuri-future-sight-881-884'], observedEffectGroup: 'katakuri-future-sight-mochi-evasion-881-884',
    canonicEffect: '미래예지와 모치 신체 변형을 결합해 공격이 지나갈 부위만 피하도록 운용한다.',
    claimToReexamine: '방어 Raw6와 같은 회피 효과이며 정밀 제어 자체는 Base Technique84에도 이미 반영된 사실이다.',
    exclusionFromBaseQuestion: '같은 모치 회피가 Defense의 예측 보정·Technique의 예외 정밀 제어·Base 숙련으로 각각 중복 가산됐는가?',
    disposition: 'retain-unchanged-pending-independent-effect-proof',
  },
  {
    characterId: 'jinbe', stat: 'defense', hakiType: 'armament', existingRaw: 4,
    evidenceIds: ['evidence-jinbe-big-mom-890', 'evidence-jinbe-whos-who-1018'], observedEffectGroup: 'jinbe-armament-defensive-hardening-890-1018',
    canonicEffect: '빅맘의 검격을 일시 방어하고 후즈후의 지건 계열 공격에 무장색으로 대응했다. 빅맘과는 힘에서 밀렸고 후즈후와는 직접 격파 장면이 있다.',
    claimToReexamine: '두 사건의 방어 성과는 서로 다른 조건에서 반복되지만 그것만으로 예외적 Raw4의 Base78 바깥 순증을 정량 분리하지 못한다.',
    exclusionFromBaseQuestion: 'Base Defense78이 두 방어 사건을 이미 근거로 삼는 상황에서 무장색 경화의 예외적 독립 효과가 별도 검증되는가?',
    disposition: 'retain-unchanged-pending-independent-effect-proof',
  },
]

export const v0169HakiSourceAnchors = {
  vista: [
    'https://one-piece.com/character/bista/index.html',
    'https://one-piece.com/news/o20210220_12159/index.html',
  ],
  shanks: [
    'https://one-piece.com/anime/64187/index.html',
    'https://one-piece.com/anime/67527/index.html',
  ],
  katakuri: [
    'https://one-piece.com/anime/o4869/index.html',
    'https://one-piece.com/character/Charlotte_Katakuri/index.html',
  ],
  jinbe: [
    'https://one-piece.com/anime/o6327/index.html',
    'https://one-piece.com/anime/o4903/index.html',
  ],
} as const
