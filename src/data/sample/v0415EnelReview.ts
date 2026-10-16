/**
 * v0.4.15: user-approved Enel Skypiea recalibration.
 * Never mutate the v0.4.13 draft; expose this as the current view only.
 * Values are editorial project estimates, not canonical measurements.
 *
 * Historical v0.4.13: 88/72/72/88/84/70/87 (561/7)
 * Approved v0.4.15: 85/74/72/86/86/76/87 (566/7).
 * Evidence readiness E2/E3 and independent Raw Haki 0 remain unchanged.
 */
import type { Evaluation } from '../../domain/evaluation/types'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

export const v0415EnelApprovedScores = [85, 74, 72, 86, 86, 76, 87] as const

const revisedRationales = [
  '전격·광역 제압의 큰 위협을 인정하되 방주 맥심과 함께 만든 뇌영의 파괴 규모 전체를 에넬 단독 대인 공격력으로 환산하지 않는다. 루피의 고무 상성은 일반 상대의 피해 성립에 소급하지 않는다. Attack 85는 사용자 승인 잠정값이며 강한 패기 사용자를 반복 타격한 근거는 부족하다.',
  '고로고로 자연계의 회피·맨트라 감지를 활용한 사전 방어를 인정한다. 그러나 고무 상성으로 능력 회피가 제한된 루피전의 피격만으로 일반 방어를 단정하지 않으며, 상위 상대에게 반복적인 정면 방어를 입증한 표본도 부족하다. Defense 74(E3)는 잠정.',
  '와이퍼 공격 후 전기 자극으로 심장을 재가동한 특수 생존 사례와 장시간 고강도 교전의 지구력을 분리한다. 능력 기반 회복을 일반 체력으로 가산하지 않으며 독립 장기전 표본이 부족하므로 Stamina 72(E3)를 유지한다.',
  '고로고로 열매의 고속 이동·이탈과 맨트라 기반 감지를 강점으로 평가하지만, 번개 전달·선행 탐지가 동등한 육체 반응 및 반복 근접 공격 속도를 입증하는 것은 아니다. Speed 86은 이러한 경계를 반영한 잠정 조정.',
  '전격의 정밀 운용, 맨트라와의 결합, 금속 가공·전열 창, 심장 재가동 등 능력 제어의 숙련을 인정한다. 기술을 실제로 어느 상황에 선택했는지는 Combat IQ, 역할의 폭은 Versatility에서 평가해 중복 보너스를 방지한다. Technique 86(E2) 잠정.',
  '루피의 예상 밖 전격 면역에 당황했으나 이후 전열 창과 황금 구체를 이용해 대응 방식을 수정했다. 이 실제 전술 전환을 인정해 Combat IQ 76으로 재평가한다. 오만함·예상 밖 상황 대응 한계와 독립 반복 표본 부족으로 E3는 유지한다.',
  '전격의 원거리·광역 제압, 탐지, 기동, 열·금속 제어 및 전장 활용의 역할 전환을 인정한다. 전기 능력 파생 기술의 명칭을 별도 능력처럼 중복 계산하지 않아 Versatility 87을 유지한다.',
] as const

export function applyV0415EnelReview(evaluation: Evaluation): Evaluation {
  if (evaluation.characterId !== 'enel' || evaluation.id !== 'evaluation-v0413-enel') return evaluation
  const items = COMBAT_STATS.map((stat, index) => {
    const original = evaluation.items.find((item) => item.stat === stat)
    if (!original) throw new Error('Missing Enel historical axis: ' + stat)
    const updated = {
      ...original,
      baseScore: v0415EnelApprovedScores[index],
      rationale: revisedRationales[index],
      evidenceIds: [...original.evidenceIds],
      hakiContributions: original.hakiContributions.map((entry) => ({ ...entry, evidenceIds: [...entry.evidenceIds] })),
    }
    return { ...updated, score: getFinalStatScore(updated) }
  })
  return {
    ...evaluation,
    evaluationDataVersion: 'evaluation-v0.4.15-enel-approved-provisional',
    status: 'draft',
    subjectState: evaluation.subjectState
      ? { ...evaluation.subjectState, note: '하늘섬 편 v0.4.15 사용자 승인 재평가. E2/E3 잠정·원작 컷 전수 검증 전. 후반부 루피와 시점 다른 수치 비교 금지, 별도 Haki Raw 가산 없음.' }
      : undefined,
    items,
  }
}
