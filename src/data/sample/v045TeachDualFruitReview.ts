import type { Evaluation, EvaluationItem, EvidenceReadiness, CombatStat } from '../../domain/evaluation/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

/**
 * v0.4.5: same canonical feats, fresh cross-axis calibration of Teach's dual-fruit
 * mastery and role coverage. +1 in each stat is a project judgement, not a
 * feat-count reward, numerical win bonus, or new ability assertion.
 *
 * Previous v0.4.4 live evaluation is exported as evaluationsBeforeV045.
 */
export type TeachV045Decision = {
  stat: CombatStat
  beforeFinal: number
  afterFinal: number
  readiness: EvidenceReadiness
  inference: 'supported-interpretation' | 'uncertain-extrapolation'
  sourceEvidenceIds: readonly string[]
  primaryQuestion: string
  rationale: string
  limitations: string
}
export const teachV045Decisions: readonly TeachV045Decision[] = [
  {
    stat: 'techniqueMastery', beforeFinal: 93, afterFinal: 94, readiness: 'E2',
    inference: 'supported-interpretation',
    sourceEvidenceIds: [
      'evidence-teach-ace-440-441', 'evidence-teach-kurouzu-441',
      'evidence-teach-hancock-nullification-1059', 'evidence-teach-gura-577',
      'evidence-teach-law-1063-1064',
    ],
    primaryQuestion: '두 열매의 활용 방식이 능력 보유를 넘어, 상황에 맞춰 기술을 실행하는 숙련을 보여주는가?',
    rationale: '에이스전에서 흡인(크로우즈)과 직접 접촉을 통한 열매 봉쇄·근접 제압을 연계했고, 핸콕전에서는 높은 위험의 석화 능력을 실제 접촉 봉쇄했다. 지진 능력도 획득 후 마린포드와 로전에서 공격에 적용했다. 이는 서로 다른 두 능력 체계를 실전에서 성공적으로 제어하는 숙련의 범위가 넓다는 강한 정성 근거다. 기존 Technique93이 이 적용 안정성과 전환 능력을 약간 보수적으로 해석했다고 보아 94로 소폭 보정한다. 여기서는 실제 실행·제어 숙련만 보고, 두 열매 보유 개수·지진 광역 피해·실전 승리 결과를 독립 보너스로 세지 않는다.',
    limitations: '서로 다른 두 열매를 한 순간에 융합한 고난도 단일 기술의 반복 성공은 확인되지 않았고, 모든 상황에서 자유자재로 무제약 운용한다는 표현은 검증되지 않았다. 접촉 조건과 명중 여부가 중요하며, 지진 능력 운용을 원주인 흰수염과 동급이라고 입증한 것도 아니다. 따라서 E2 유지·95 이상 보류.',
  },
  {
    stat: 'versatility', beforeFinal: 95, afterFinal: 96, readiness: 'E1',
    inference: 'supported-interpretation',
    sourceEvidenceIds: [
      'evidence-teach-ace-440-441', 'evidence-teach-kurouzu-441',
      'evidence-teach-hancock-nullification-1059', 'evidence-teach-gura-577',
      'evidence-teach-law-1063-1064',
    ],
    primaryQuestion: '실전에서 어둠과 지진의 서로 다른 역할을 전투 거리·목적·상성에 따라 전환했는가?',
    rationale: '어둠 계열로 원거리 흡인, 접촉 시 능력 무효화, 근접 제압과 상대의 능력 위협 제거를 수행하고, 지진 계열로 강한 직접 충격과 광역 전장 압박을 행사했다. 에이스·핸콕·로·마린포드 장면에서 역할이 서로 달리 나타나므로 기존 95에서 실전 적용 폭을 한 단계 높여 96으로 재평가한다. 동일한 능력의 단순 기술명 숫자가 아니라 실제 전투 목적(접근 확보/능력자 억제/대인 충격/광역 압박)의 다양성에 대한 판단이다. 기술 성공의 정밀성은 Technique, 사용 시점 선택은 Combat IQ로 구분하며 동일 유효타를 반복 가산하지 않는다.',
    limitations: '두 열매의 범용성이 매우 높아도 자기 회복, 아군 지원, 공중 기동, 일반적인 비능력자 상대 봉쇄 등 모든 전투 역할을 수행했다고 보기는 어렵다. 연속적으로 활용한 성과와 실제 동시 복합 기술을 구분한다. 97은 추가적인 독립 전투 역할이나 명확한 복합 응용 실전 검증 전까지 보류.',
  },
] as const

/** Small, idempotent-in-intent, source-version checked adapter. Never mutates its input. */
export function applyV045TeachDualFruitReview(evaluation: Evaluation): Evaluation {
  if(evaluation.characterId!=='teach' || evaluation.isDefault===false)return evaluation
  if(teachV045Decisions.length!==2) throw Error('v0.4.5 requires exactly two explicit Teach axis decisions')
  const items=evaluation.items.map((item):EvaluationItem=>{
    const decision=teachV045Decisions.find(d=>d.stat===item.stat)
    if(!decision)return item
    if(getFinalStatScore(item)!==decision.beforeFinal)
      throw Error('v0.4.5 precondition failed for Teach '+decision.stat)
    const unchangedRaw = getFinalStatScore(item)-item.baseScore
    const next:EvaluationItem={
      ...item,
      baseScore:decision.afterFinal-unchangedRaw, score:decision.afterFinal,
      readiness:decision.readiness,
      evidenceIds:[...new Set([...item.evidenceIds,...decision.sourceEvidenceIds])],
      rationale:decision.rationale+' [한계: '+decision.limitations+']',
      hakiContributions:[...item.hakiContributions],
    }
    if(getFinalStatScore(next)!==decision.afterFinal)
      throw Error('v0.4.5 computed mismatch for '+decision.stat)
    return next
  })
  return {...evaluation,evaluationDataVersion:'evaluation-0.4.5-teach-dual-fruit-technique-versatility-review',items}
}
