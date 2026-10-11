import type { Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'

/**
 * v0.1.76 — narrowly re-assess Koby's Attack, not his potential.
 *
 * Evidence is the previously stored supplementary ONE PIECE.com TV1121/1122:
 * one enormous structure-breaking strike within a Garp-led rescue operation,
 * no verified repeat of equal intensity and no proven continuous 1v1 damage
 * against a comparable top-level opponent. Source manga panels not personally
 * examined in full. No new raw Haki and no changed scoring formula.
 *
 * Legacy v0.1.70 seed and v0.1.75 retrospective score review are unchanged.
 */
export const v0176KobyAttackDecision = {
  characterId:'koby', stat:'attack', previousFinal:82, revisedFinal:77,
  readiness:'E2',
  sourceEvidenceIds:['evidence-v0170-koby-impact','evidence-v0170-koby-hurry'],
  rationale:'코비는 하치노스에서 실직권골 한 번으로 피사로의 거대한 암석 팔을 파괴했다. 이는 매우 큰 순간 구조물 파괴 출력이지만 반복 가능한 대인 화력이나 사최간급 상대의 지속 방어 관통을 증명하지는 않는다. 그 직전 가프는 피사로 본체를 공격해 빈틈을 만들었고 헤르메포가 접근을 엄호했으며 그루스가 후속 낙석을 막았다. 실제 일격의 성과는 코비에게 귀속하되 협동 작전의 모든 성공을 단독 화력으로 가산하지 않는다. Attack82는 한 번의 파괴 규모를 지나치게 고수준 반복 대인 공격력에 준하는 기준으로 환산한 불균형으로 판단하여 Final77(E2)로 보수적 재보정한다. 킹83·비스타82·마르코79와 반복/대인 성립 조건을 구분하고 크래커77 수준의 값도 두 인물이 정면전에서 동급이라는 의미는 아님을 명시한다. 단일 사건별 −5 공식이 아니며, 아직 보이지 않은 미래 발전 능력에 감점하지 않는다.',
} as const

/** Review outcomes are descriptive; peer scores must not be forcibly aligned. */
export const v0176FollowupReviews = [
  {characterId:'crocodile',stat:'combatIQ',score:86,decision:'retain',readiness:'E2',rationale:'알라바스타에서 함정·지형·모래/독 응용과 마린포드에서 임무 전환이 복수 관찰된다. 조직 운영을 교전 판단에 중복 가산하지 않는 기존 설명을 유지하며, 최근 최고 수준 직접 교전 표본이 없어 86을 확정하지 않는다.'},
  {characterId:'stussy',stat:'combatIQ',score:85,decision:'retain-provisional',readiness:'E2',rationale:'내부자 우위로 루치·카쿠를 잠재운 실제 기습 시점/대상 선정의 성공은 있으나, 방심한 아군에게만 확인된 성과를 상위 1대1 실시간 전술 적응의 85점 직접 증명으로 확정할 수 없다. 그렇다고 이를 실패나 낮은 지능의 증거로 삼아 임의 하향하지 않는다.'},
  {characterId:'lucci',stat:'combatIQ',score:74,decision:'retain',readiness:'E2',rationale:'센토마루 지휘권 공략·세라핌 공동전·현장 정보 전달과 사황 교전 지시 위반의 양면을 유지한다. 스튜시의 기습 승리를 정면 전술 IQ 비교 승패로 읽지 않는다.'},
  {characterId:'prince-grus',stat:'versatility',score:85,decision:'retain-provisional',readiness:'E2',rationale:'공식 TV1114의 점토 인형 전장 통제와 TV1122의 점토 둥지 낙석 방어는 구분된 실제 기능이다. 그러나 같은 열매의 파생 메커니즘이며 85라는 정확한 수준을 독립 상위 대인전으로 재현한 근거는 여전히 부족하다.'},
  {characterId:'smoothie',stat:'attack',score:76,decision:'source-deficit-no-adjustment',readiness:'E2',rationale:'대형 참격을 여러 차례 사용한 공격 사례와 강자 대인 직격 표본의 부족을 구분한다. 현재 Attack76 E2 유지; 원작 미관찰을 자동 낮은 화력으로 환산하지 않는다.'},
] as const

export function applyV0176KobyAttackCorrection(evaluation:Evaluation):Evaluation {
  if(evaluation.characterId!=='koby'||evaluation.isDefault===false)return evaluation
  if(evaluation.evaluationDataVersion!=='evaluation-0.1.70-expansion-draft') {
    throw Error('v0.1.76 Koby source version mismatch')
  }
  const old=evaluation.items.find(i=>i.stat==='attack')
  if(!old||getFinalStatScore(old)!==v0176KobyAttackDecision.previousFinal ||
      getRawHakiContributionTotal(old)!==0 || old.readiness!=='E2') {
    throw Error('v0.1.76 Koby Attack baseline mismatch')
  }
  const items=evaluation.items.map((i):EvaluationItem=>{
    if(i.stat!=='attack')return i
    const next={...i,baseScore:v0176KobyAttackDecision.revisedFinal,
      rationale:v0176KobyAttackDecision.rationale,
      readiness:v0176KobyAttackDecision.readiness}
    return {...next,score:getFinalStatScore(next)}
  })
  return {...evaluation,evaluationDataVersion:'evaluation-0.1.76-koby-single-burst-attack-calibrated',items}
}
