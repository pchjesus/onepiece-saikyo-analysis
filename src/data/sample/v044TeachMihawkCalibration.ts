import type { CombatStat, Evaluation, EvaluationItem, EvidenceReadiness } from '../../domain/evaluation/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

/**
 * v0.4.4 targeted 7-axis review (Teach) and one-axis comparison (Mihawk).
 * Project judgement, NOT a canonical power level or a per-win score bonus.
 *
 * Evidence is referenced by ID and never duplicated as a new "battle".
 * The v0.4.3 original evaluations are preserved in evaluationsBeforeV044.
 * Raw Haki, subject states, calculation model and every other character stay unchanged.
 */
export type V044AxisDecision = {
  characterId: 'teach' | 'mihawk'
  stat: CombatStat
  before: number
  after: number
  readiness: EvidenceReadiness
  rationale: string
  evidenceIds: readonly string[]
  /** The strength of *this* scoring inference, independent of Evidence readiness. */
  reasoningConfidence: 'strong-interpretation' | 'plausible-interpretation' | 'insufficient-for-change'
  counterargument: string
}

export const v044AxisDecisions: readonly V044AxisDecision[] = [
  {
    characterId:'teach',stat:'attack',before:95,after:96,readiness:'E2',reasoningConfidence:'strong-interpretation',
    evidenceIds:['evidence-teach-ace-440-441','evidence-teach-gura-577','evidence-teach-law-1063-1064','evidence-teach-heart-pirates-1081'],
    rationale:'에이스를 상대로 어둠의 흡인→접촉 봉쇄→근접 공격을 실전 성공시킨 성과, 마린포드에서 실제 지진 충격파를 행사한 출력, 로의 고급 각성 공세를 견딘 뒤 두 열매로 반격하고 검은수염 해적단이 승리한 결과를 함께 교차 검증했다. 과거 95는 상대 강자의 위협을 제거하는 실질적 공격 접근·위력에 다소 보수적이어서 96(E2)으로 상향한다. 광역 지진 규모=단독 대인 결정타나 후반 생략된 로전의 정확한 마무리 기술로 환산하지 않으며, 별도 열매/Haki 수치 보너스는 추가하지 않는다.',
    counterargument:'로전은 선원들이 개입한 다수전이고 후반 결정타가 생략되어 독자적으로 로에게 얼마나 큰 지진 피해를 줬는지는 불명. 97은 향후 추가 강자 유효타 근거 필요.',
  },
  {
    characterId:'teach',stat:'defense',before:89,after:91,readiness:'E2',reasoningConfidence:'plausible-interpretation',
    evidenceIds:['evidence-teach-hancock-nullification-1059','evidence-teach-ace-440-441','evidence-teach-whitebeard-576','evidence-teach-law-1063-1064'],
    rationale:'위협이 될 수 있는 악마의 열매 공격을 접촉으로 차단한 핸콕전, 에이스전의 흡인·봉쇄 연계는 특정 능력자를 상대로 실제 공격 수단을 억제하는 조건부 능동 방어 성과다. 기존 89는 이 방어 전환을 과소 반영했을 수 있어 91(E2)로 재평가한다. 그러나 흰수염·로의 유효타를 직접 허용한 약점, 접촉 전 위험과 비능력자 상성 제한을 남긴다. 맞고 버틴 효과는 Stamina에만 연결하고 Defense로 이중 가산하지 않는다.',
    counterargument:'열매 봉쇄는 근접 접촉이 필요하고 특정 상대에게만 작동한다. 모든 종류의 공격 차단이나 물리 피해 감소로 일반화해서 92+로 올릴 자료는 부족하다.',
  },
  {
    characterId:'teach',stat:'stamina',before:95,after:97,readiness:'E2',reasoningConfidence:'strong-interpretation',
    evidenceIds:['evidence-teach-ace-440-441','evidence-teach-whitebeard-576','evidence-teach-law-1063-1064','evidence-teach-heart-pirates-1081'],
    rationale:'에이스의 화염·중상을 입은 흰수염의 공격·로의 각성 쇼크 빌레와 같은 고강도 피해를 각각 입고도 전투 또는 전장 행동을 지속했다. 특히 로의 내부 공격 후에도 교전을 지속해 상대 해적단이 패배한 복수의 실전 사례와 어둠어둠 열매의 증폭된 고통 묘사를 종합하면 지속·고통 감내 능력을 기존 95보다 높게 평가하는 것이 합리적이다. 97(E2)은 장기 10일 결투를 증명했다는 뜻이 아니며, 아프다고 반응하는 사실을 체력 부족의 증거로 감점하지 않는다.',
    counterargument:'다른 시점의 피해를 하나의 연속 결투로 합산할 수 없고 비수면·이형 신체의 전투 체력 증가량은 공식 수치로 확인되지 않는다. 카이도/빅맘 장기 누적 피해와 등치하지 않는다.',
  },
  {
    characterId:'teach',stat:'speed',before:82,after:82,readiness:'E3',reasoningConfidence:'insufficient-for-change',
    evidenceIds:['evidence-teach-ace-440-441','evidence-teach-law-1063-1064'],
    rationale:'에이스·로 등 상위권 상대와의 반응과 접촉 전투는 인정하지만 개인의 순수 이동·반응 속도 상한은 충분히 반복 검증되지 않았다. 크로우즈의 원거리 흡인을 자신의 육체적 순간 기동으로 바꾸어 계산할 수 없다. 정보 부족은 약함의 확정도, 임의의 +N 근거도 아니므로 기존 잠정 82(E3)를 유지한다.',
    counterargument:'티치의 실제 전장 접근·대응 성과를 지나치게 배제했을 가능성은 남아 있다. 같은 거리/상대 수준의 고속 공방 원문 비교 후 재검토.',
  },
  {
    characterId:'teach',stat:'techniqueMastery',before:93,after:93,readiness:'E2',reasoningConfidence:'insufficient-for-change',
    evidenceIds:['evidence-teach-kurouzu-441','evidence-teach-hancock-nullification-1059','evidence-teach-gura-577','evidence-teach-law-1063-1064'],
    rationale:'크로우즈의 흡인→접촉 봉쇄와 별도의 지진 운용, 핸콕전 위험 억제 등은 정교한 능력 활용을 보여주는 긍정 근거이나 원래 93의 직접 이유에 이미 충분히 포함돼 있다. 이번 상향은 공격의 실제 상대 위협, 방어적 차단, 고통 감내, 전투 목표·선택, 전투 역할 폭에서만 검토한다. 보유 능력 2종과 동일 사건을 Technique에 추가 가산하지 않고 93(E2)를 유지한다.',
    counterargument:'새롭게 확인되는 두 열매의 독립적인 정밀 복합 기술, 최상급 능력자 대상 정밀 제어 사례가 있으면 재평가.',
  },
  {
    characterId:'teach',stat:'combatIQ',before:87,after:94,readiness:'E2',reasoningConfidence:'plausible-interpretation',
    evidenceIds:['evidence-teach-ace-440-441','evidence-teach-kurouzu-441','evidence-teach-hancock-nullification-1059','evidence-teach-law-1063-1064'],
    rationale:'에이스전에서 상대의 열매 강점에 맞춰 끌어당김→봉쇄→근접 타격을 선택했고, 핸콕전에서 석화의 핵심 위협을 접촉으로 억제했으며, 와노 이후 해상에서 로를 상대할 때에도 높은 개인 내구·강한 이중 열매 화력을 바탕으로 위험을 감수하며 끝내 전투 목표를 달성했다. 기존 87은 로전 선제 피격·반 오거의 위험 지적을 판단 실패로 지나치게 해석했을 가능성이 크므로, 전투에서 실제로 활용한 상대 분석·전장 조건의 선택·목표 우선순위와 과감한 위험 관리 성과를 반영해 94(E2)로 재평가한다. 장기 조직 전략을 개인 1대1 IQ 점수로 일괄 환산하거나 반드시 계산 후 돌진했다고 단정하지는 않는다.',
    counterargument:'임펠 다운에서 마젤란의 독에 일행이 큰 위기에 빠졌고 로전에서도 큰 피해를 허용했다. 위험을 의도적으로 계산했다는 내면 서술은 없으며, 94는 강한 전술 해석에 의존하는 논쟁 가능한 상단값이다.',
  },
  {
    characterId:'teach',stat:'versatility',before:93,after:95,readiness:'E1',reasoningConfidence:'strong-interpretation',
    evidenceIds:['evidence-teach-ace-440-441','evidence-teach-gura-577','evidence-teach-law-1063-1064','evidence-teach-hancock-nullification-1059'],
    rationale:'어둠은 원거리 흡인·능력 봉쇄·근접 제압, 지진은 직접 충격과 광역 전장 압박을 맡는다. 에이스·핸콕·로를 상대로 실제 능력자 상성 공략, 상대 수단 봉쇄, 광역 공격과 근접 교전을 서로 다른 목적으로 전환한 것이 확인되므로 기존 93은 전투 역할의 폭을 다소 낮게 반영했다고 보고 95(E1)로 재평가한다. 열매 두 개의 존재나 세부 기술 숫자만으로 95가 된 것은 아니며 Attack·Technique의 동일 성과를 점수로 재차 가산하지 않는다.',
    counterargument:'날씨·지형·비능력자 근접전 등 모든 상황을 무제한 대응한 증거는 없으며 공간이동·회복·지원 역할은 미확인. 96+는 추가 독립 역할 확인이 필요하다.',
  },
  {
    characterId:'mihawk',stat:'attack',before:96,after:97,readiness:'E2',reasoningConfidence:'strong-interpretation',
    evidenceIds:['evidence-mihawk-jozu-553','evidence-mihawk-luffy-560-561','evidence-mihawk-shanks-swordskill-1058','evidence-mihawk-world-strongest-profile','evidence-mihawk-shanks-rivalry-profile'],
    rationale:'정상결전에서 흰수염 방향 대형 원거리 참격과 빙결된 거대 파도 절단·루피 추격 연속 검격을 실제로 보였다. 해군의 샹크스보다 높은 검술 평가(Ch.1058), 공식 세계 최강 검사 위상과 과거 샹크스와의 검술 경쟁은 최상위 공격 상한의 강한 간접 근거다. 샹크스의 현행 Final Attack97과 같은 97(E2)로 소폭 상향한다. 미호크의 검술 우위가 패기 총량·모든 공격 유형의 우위나 샹크스를 직접 격파한 사실을 보장한다는 추론은 금지한다.',
    counterargument:'샹크스 카무사리로 키드를 일격 제압한 성과와 직접 동등한 최상위 강자 결정타는 아직 보여주지 않았다. 죠즈가 참격을 막은 사실을 보존하고, 98은 근거 부족으로 보류.',
  },
] as const

export function applyV044TargetedRecalibration(evaluation:Evaluation):Evaluation {
  if (evaluation.isDefault===false) return evaluation
  const selected = v044AxisDecisions.filter(x=>x.characterId===evaluation.characterId)
  if (selected.length===0) return evaluation
  if (evaluation.characterId==='teach' && selected.length!==7)
    throw Error('v0.4.4 Teach must have seven explicitly reviewed axes')
  const items=evaluation.items.map((item):EvaluationItem=>{
    const decision=selected.find(x=>x.stat===item.stat)
    if(!decision) return item
    const before=getFinalStatScore(item)
    if(before!==decision.before)throw Error('v0.4.4 baseline mismatch: '+evaluation.characterId+':'+item.stat)
    const raw = before - item.baseScore
    const nextBase = decision.after - raw
    const next:EvaluationItem={
      ...item,baseScore:nextBase,
      readiness:decision.readiness,
      rationale:decision.rationale,
      evidenceIds:[...new Set([...item.evidenceIds,...decision.evidenceIds])],
      hakiContributions:[...item.hakiContributions],
      score:decision.after,
    }
    if(getFinalStatScore(next)!==decision.after)throw Error('v0.4.4 calculated score mismatch: '+evaluation.characterId+':'+item.stat)
    return next
  })
  return {...evaluation,evaluationDataVersion:'evaluation-0.4.4-teach-mihawk-7axis-context-calibration',items}
}
