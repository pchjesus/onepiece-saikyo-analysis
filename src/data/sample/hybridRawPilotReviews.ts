import type { HybridRawPilotReview } from '../../domain/evaluation/hybridRawPilot'

/**
 * v0.1.35 PREVIEW ONLY.
 * 14 existing typed Haki Raw contributions for five numeric Evaluations
 * (and Mihawk as a deliberately zero-Raw comparison control).
 *
 * Every application is identified by exact Evaluation / Stat / type / Evidence.
 * 'base-rebase-proposal' transfers the *existing effective amount* (Raw * 0.5)
 * to Base without changing Final. It is NOT a change to production scoring.
 * Other records stay untouched until independent exceptional effects are proven.
 */
export const hybridRawPilotReviews: readonly HybridRawPilotReview[] = [
  {
    evaluationId: 'evaluation-akainu', stat: 'defense', hakiType: 'armament',
    evidenceId: 'evidence-akainu-admiral-barrier-564', expectedRaw: 2,
    disposition: 'base-rebase-proposal',
    reason: '삼대장 공동 지진파 방어는 실전 방어 성과지만 독립적으로 뛰어난 무장색 한계효과가 확인되지는 않았다. 통상적 무장색이 결합된 관찰 성과로 Base 재분류 후보.',
    uncertainty: '흰수염의 공격은 공동 방어와 전쟁·누적 부상 조건 아래 이루어졌다. Base 95 자체의 적절성은 별도 앵커 심사가 필요하다.',
  },
  {
    evaluationId: 'evaluation-kuzan', stat: 'attack', hakiType: 'armament',
    evidenceId: 'evidence-kuzan-garp-haki-clash-1087', expectedRaw: 4,
    disposition: 'base-rebase-proposal',
    reason: '가프와의 Ice Glove 권격 충돌은 실전 공격 성과이나 패기만의 분리된 추가 출력은 측정할 수 없다. 현재 유효 공격 성과 전체를 Base에 기술하는 후보.',
    uncertainty: '가프는 시류에게 부상당한 상태였고 양측 사제관계·임무가 있었다. 같은 장면의 Technique Raw는 별도 중복 심사 중.',
  },
  {
    evaluationId: 'evaluation-kuzan', stat: 'defense', hakiType: 'armament',
    evidenceId: 'evidence-kuzan-admiral-barrier-564', expectedRaw: 2,
    disposition: 'base-rebase-proposal',
    reason: '사카즈키·보르살리노와 함께 수행한 지진파 차단은 방어 Base의 전투 성과로 검토하며 특정 무장색 독립 프리미엄을 자동 가산하지 않는다.',
    uncertainty: '세 대장 합동 성과이므로 개인 방어력·패기 숙련의 정확한 기여를 분해할 수 없다.',
  },
  {
    evaluationId: 'evaluation-kuzan', stat: 'techniqueMastery', hakiType: 'armament',
    evidenceId: 'evidence-kuzan-garp-haki-clash-1087', expectedRaw: 4,
    disposition: 'cross-stat-overlap-unresolved',
    reason: 'Ice Glove와 가프식 권격을 운용한 숙련은 확인되나 Attack Raw와 정확히 같은 장면이므로 추가 Technique의 독립적인 한계 효과가 필요한 상태.',
    uncertainty: 'Technique를 제거하기 전에 공격 출력·무투 숙련·무장색 응용의 차이를 원작 장면과 비교 캐릭터로 검증해야 한다.',
  },
  {
    evaluationId: 'evaluation-shanks', stat: 'attack', hakiType: 'conquerors',
    evidenceId: 'evidence-shanks-kid-divine-departure-1079', expectedRaw: 6,
    disposition: 'exceptional-marginal-unresolved',
    reason: '신피로 키드를 선제 제압하는 뛰어난 패기 검격 사용은 확인되지만 Attack Base에도 동일한 일격의 피해가 반영되어 추가 +3의 독립 성과는 아직 불명확.',
    uncertainty: '키드는 함대 파괴용 공격을 준비하고 있었고 도리·브로기의 함선 파괴는 샹크스의 출력과 분리해야 한다.',
  },
  {
    evaluationId: 'evaluation-shanks', stat: 'techniqueMastery', hakiType: 'conquerors',
    evidenceId: 'evidence-shanks-kid-divine-departure-1079', expectedRaw: 4,
    disposition: 'cross-stat-overlap-unresolved',
    reason: '패왕색 결합 검격의 숙련도는 높으나 Attack +6과 같은 신피 장면을 별도 숙련 Raw로 더할 근거가 부족하다.',
    uncertainty: '검술 정밀도 자체, 패왕색 조절 자체, 공격의 결과를 분리해야 하며 미호크 검술 앵커와도 대조 필요.',
  },
  {
    evaluationId: 'evaluation-shanks', stat: 'techniqueMastery', hakiType: 'observation',
    evidenceId: 'evidence-shanks-kid-divine-departure-1079', expectedRaw: 4,
    disposition: 'cross-stat-overlap-unresolved',
    reason: '미래의 함대 피해를 보고 먼저 대응했으나 이 정보가 Technique 패왕색 Raw와 별도로 만드는 고유 숙련 성과가 명시되지 않았다.',
    uncertainty: '미래예지는 견문색 효과이며 접근 속도와 검술 제어·전투지능에 같은 장면을 동시 가산하는 위험이 있다.',
  },
  {
    evaluationId: 'evaluation-shanks', stat: 'combatIQ', hakiType: 'observation',
    evidenceId: 'evidence-shanks-kid-divine-departure-1079', expectedRaw: 4,
    disposition: 'exceptional-marginal-unresolved',
    reason: '선견 정보로 함대 보호 대상을 정하고 행동하는 판단은 직접 확인되나 Combat IQ Base의 우선순위 판단과 독립 기여인지는 미확정.',
    uncertainty: '견문색 미래예지 정보와 그에 따른 전략적 선택을 분리하지 않으면 정보 우위가 중복 보정될 수 있다.',
  },
  {
    evaluationId: 'evaluation-katakuri', stat: 'attack', hakiType: 'armament',
    evidenceId: 'evidence-katakuri-armament-883', expectedRaw: 4,
    disposition: 'base-rebase-proposal',
    reason: '루피와의 무장색 근접 공격 충돌은 실제 공격 성과이나 예외적 무장색 독립 효과가 증명된 것은 아니다. 관찰된 공격력 Base로 이관 후보.',
    uncertainty: '손이 부어오른 장면에는 상대의 상태·모치 능력·기술 출력이 섞여 있을 수 있어 별도 숙련 등급으로 추정하지 않는다.',
  },
  {
    evaluationId: 'evaluation-katakuri', stat: 'defense', hakiType: 'observation',
    evidenceId: 'evidence-katakuri-future-sight-881-884', expectedRaw: 6,
    disposition: 'exceptional-marginal-unresolved',
    reason: '침착하게 미래를 읽고 모치 신체를 비켜서 타격을 회피하는 예외적 견문색 응용은 공식 애니메이션 857화·원작에서도 명시된다.',
    uncertainty: '실제 회피 성과가 이미 Base Defense로 반영됐는지 분리한 정량 앵커가 없어 추가 +3 확정은 불가.',
  },
  {
    evaluationId: 'evaluation-katakuri', stat: 'techniqueMastery', hakiType: 'observation',
    evidenceId: 'evidence-katakuri-future-sight-881-884', expectedRaw: 6,
    disposition: 'cross-stat-overlap-unresolved',
    reason: '미래예지와 모치 신체 변형의 정밀 운용은 직접 확인되지만 동일 회피 성공을 Defense와 Technique에 각각 +3 중복했는지 재확인 필요.',
    uncertainty: '주변 지면 각성, 신체 부분 변형, 견문색 미래예지를 분리해 숙련에 독립 성과가 존재하는지 확인해야 한다.',
  },
  {
    evaluationId: 'evaluation-katakuri', stat: 'combatIQ', hakiType: 'observation',
    evidenceId: 'evidence-katakuri-future-sight-881-884', expectedRaw: 4,
    disposition: 'cross-stat-overlap-unresolved',
    reason: '선제 차단과 행동 예측이 확인되지만 예지 정보의 획득, 예지에 따른 실제 판단, 회피와 기술 사용이 분리됐는지 아직 불명확.',
    uncertainty: '변신 타이밍 방해에는 별도 Gear 4 대응 Evidence도 있으므로 Raw 없이 Combat IQ Base에 반영된 부분과 비교해야 한다.',
  },
  {
    evaluationId: 'evaluation-linlin', stat: 'attack', hakiType: 'conquerors',
    evidenceId: 'evidence-linlin-pageone-1011', expectedRaw: 6,
    disposition: 'exceptional-marginal-unresolved',
    reason: '페이지 원에게 패왕색을 두른 공격을 실제 사용한 고급 응용은 확인. 그러나 같은 공격 피해가 Attack Base에도 포함돼 독립 +3을 확정할 정량 자료는 부족하다.',
    uncertainty: '페이지 원 상대 장면을 샹크스 키드전과 같은 피해 계수로 환산할 수 없으며 상대 방어 상태가 다르다.',
  },
  {
    evaluationId: 'evaluation-linlin', stat: 'techniqueMastery', hakiType: 'conquerors',
    evidenceId: 'evidence-linlin-pageone-1011', expectedRaw: 6,
    disposition: 'cross-stat-overlap-unresolved',
    reason: '패왕색의 기술적 결합은 분명하지만 Attack 패왕색 Raw와 동일한 페이지 원 타격 하나의 중복 평가 여부를 분리해야 한다.',
    uncertainty: '다른 호미즈·영혼 능력의 숙련과 결합하지 않은 독립 패왕색 테크닉 기여가 추가로 관찰됐는지 확인 필요.',
  },
]
