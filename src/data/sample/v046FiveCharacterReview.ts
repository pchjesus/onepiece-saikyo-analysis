import type { CombatStat, Evaluation, EvaluationItem, EvidenceReadiness } from '../../domain/evaluation/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

/** v0.4.6 calibration decisions: final scoring, context, alternative interpretation and source IDs.
 * Unchanged axes (Kuzan Stamina 97; Shanks Stamina 88) retain their v0.4.5 records.
 * Inference is an auditable project judgement, never an automatic feat-count bonus.
 */
export type V046AxisDecision = {
  characterId:'kuzan'|'akainu'|'kizaru'|'shanks'|'mihawk'
  stat:CombatStat
  from:number
  to:number
  readiness:EvidenceReadiness
  evidenceIds:readonly string[]
  rationale:string
  counterargument:string
}
export const v046Decisions:readonly V046AxisDecision[] = [
  {characterId:'kuzan',stat:'defense',from:93,to:92,readiness:'E2',
   evidenceIds:['evidence-kuzan-garp-iceball-1081','evidence-kuzan-blue-hole-return-1081-1087','evidence-kuzan-admiral-barrier-564'],
   rationale:'아이스 볼이 가프에게 통하지 않고 빠른 반격 블루홀을 허용한 실전 방어 한계를 기존 93보다 1점 더 반영한다. 삼대장 공동 방어는 인정하되 단독 방어 성과로 과대환산하지 않는다. 장기 결투에서 버텼다는 결과를 Defense가 아닌 Stamina에 반영하여 92(E2)로 조정한다.',
   counterargument:'빙결 구속과 얼음 방어는 강력하며 Blue Hole 이후 복귀했다. 패배 한 번이나 피격 자체로 광범위한 회피·차단 저하를 확정할 수 없으므로 -2 이상 하향은 보류한다.'},
  {characterId:'akainu',stat:'stamina',from:96,to:97,readiness:'E2',
   evidenceIds:['evidence-sakazuki-kuzan-duel-650','evidence-sakazuki-luffy-pursuit-578'],
   rationale:'쿠잔과 10일간 결투하고 최종 승리한 지속력, 정상결전 흰수염의 강한 타격을 허용한 뒤 다시 전장으로 복귀해 루피 추격을 이어간 성과를 각각 독립적으로 교차 검토해 97로 소폭 상향한다. 다른 시점의 피해량을 하나의 전투에 합산하지 않는다.',
   counterargument:'10일 결투의 피해 교환 세부와 흰수염 피격 이후 실제 회복 시간은 공개되지 않았다. 승리 자체를 모든 체력 스탯 우위로 정량화하지 않는다.'},
  {characterId:'akainu',stat:'speed',from:86,to:87,readiness:'E3',
   evidenceIds:['evidence-sakazuki-luffy-pursuit-578'],
   rationale:'정상결전의 혼전 속에서 루피를 안고 도망가는 징베와 아군 보호자들을 지속적으로 추적·압박한 전장 접근·반응의 보조 근거를 인정한다. 기존 86은 상위권에 비해 상대적으로 너무 구체적 근거 없이 낮게 고정된 E3 값이어서 중립 방향으로 87만 잠정 상향한다.',
   counterargument:'루피를 보호하는 징베는 정상적인 전력 질주·반격 조건이 아니며 추격 성공도 순수 육체 속도 동급 증명은 아니다. E3를 유지하고 88+는 직접 고속 기동 비교 근거가 필요하다.'},
  {characterId:'akainu',stat:'techniqueMastery',from:91,to:93,readiness:'E2',
   evidenceIds:['evidence-sakazuki-meteor-volcano-564-565','evidence-sakazuki-ace-intervention-574','evidence-sakazuki-luffy-pursuit-578'],
   rationale:'마그마를 좁은 근접 관통 타격에서 대량 원거리 유성화산 탄막·거대 선박 목표 타격·전장 통제로 정확하게 전환한 성과를 재평가한다. 여기서는 실제 능력 제어와 다중 공격 형태의 운용 숙련만 보며 파괴 규모와 결정타 자체는 Attack 97에 남긴다.',
   counterargument:'용암 자연계의 규모가 크다는 사실만으로 타 능력자의 정밀 복합 운용과 같은 수준의 숙련을 확정할 수 없으므로 94 이상은 보류한다.'},
  {characterId:'akainu',stat:'combatIQ',from:91,to:93,readiness:'E2',
   evidenceIds:['evidence-sakazuki-squard-deception-563','evidence-sakazuki-meteor-volcano-564-565','evidence-sakazuki-luffy-pursuit-578'],
   rationale:'스쿼드의 개인 원한과 불신을 이용해 흰수염을 실제 피격시킨 전술적 기만, 유성화산으로 적의 이동 기반을 압박한 전장 선택, 루피 제거라는 명시 목표를 지속 추적한 판단을 근거로 93으로 상향한다. 실제 전투 목표에 연결되는 판단만 평가하고 단순 직급·정치 능력을 별도 가산하지 않는다.',
   counterargument:'해군 전체 작전의 성과나 포위벽 설치 계획을 사카즈키의 개인 작전으로 모두 귀속할 수 없다. 상대가 다른 조건에서 같은 전략에 걸렸을지도 불명확하다.'},
  {characterId:'akainu',stat:'versatility',from:91,to:93,readiness:'E2',
   evidenceIds:['evidence-sakazuki-meteor-volcano-564-565','evidence-sakazuki-ace-intervention-574','evidence-sakazuki-luffy-pursuit-578'],
   rationale:'근접 관통/방어 돌파, 원거리 대량 탄막, 해상의 함선·발판 파괴, 용암의 지형 이동 및 추격 압박이 전투 거리·목적에 따라 실제로 적용되는 폭을 재평가한다. 같은 마그마 효과에서 파생된 단순 기술 이름 수가 아니라 근접·광역·이동 차단 역할의 차이를 반영한다.',
   counterargument:'얼음 해빙·배 파괴는 유성화산의 같은 파생 효과일 수 있으며, 별도 회복·복제·원거리 능력 봉쇄가 확인된 것은 아니므로 94 이상은 보류한다.'},
  {characterId:'kizaru',stat:'attack',from:92,to:93,readiness:'E2',
   evidenceIds:['evidence-kizaru-luffy-clones-1093','evidence-kizaru-vegapunk-1108'],
   rationale:'빛 광선과 광검·가속 접근을 이용해 대상에 고정밀 공격 기회를 만드는 반복 실제 교전 성과를 반영해 93으로 조정한다. 광역 사격의 위력을 강자에 대한 한 번의 확정 결정타로 환산하거나 부상당한 베가펑크에 대한 타격을 과대평가하지 않는다.',
   counterargument:'사황급의 방어를 반복해서 돌파한 최상위 직접 유효타 표본이 부족하므로 94 이상의 결정력 상향은 보류한다.'},
  {characterId:'kizaru',stat:'defense',from:89,to:90,readiness:'E2',
   evidenceIds:['evidence-kizaru-luffy-clones-1093','evidence-kizaru-star-gun-1094','evidence-kizaru-admiral-barrier-564'],
   rationale:'빛의 기동·거리 조절을 통해 위험한 전면 교전을 피하고 삼대장 합동 지진파 방어에 참여한 성과를 기존 최종 89보다 소폭 높게 평가한다. 기존 무장색 Raw2×0.5=1점 기여는 유지해 Base88→89, Final89→90으로 조정한다. 피격 뒤 다시 전투에 복귀한 지속력은 여기서 중복 가산하지 않는다.',
   counterargument:'니카의 Star Gun에 직격당한 뒤 행동 제한이 있고 이후 다시 붙잡히는 한계가 있다. 생존이나 임무 수행이 회피·차단에 완전히 성공했다는 뜻이 아니다.'},
  {characterId:'kizaru',stat:'techniqueMastery',from:93,to:95,readiness:'E2',
   evidenceIds:['evidence-kizaru-luffy-clones-1093','evidence-kizaru-vegapunk-1108'],
   rationale:'빛 이동에서 즉시 광검/분신을 구성해 교전하고 개별 목표 추적·광선 공격으로 전환하는 정교한 조작을 니카 루피 상대 전장에 실제 적용한 숙련을 높게 평가한다. 한 종류의 열매지만 서로 다른 형태를 동시에 구현한 실전 기술 제어 성과를 95(E2)로 재평가한다.',
   counterargument:'분신이 루피에게 대량 직접 피해를 준 사실은 확인되지 않으며, 목표 수행 성공을 기술 숙련과 동일시할 수 없다. 96+는 더 많은 반복 강자 전투 표본이 필요하다.'},
  {characterId:'kizaru',stat:'combatIQ',from:90,to:91,readiness:'E2',
   evidenceIds:['evidence-kizaru-luffy-clones-1093','evidence-kizaru-star-gun-1094','evidence-kizaru-vegapunk-1108'],
   rationale:'니카와 정면 공방하는 동시에 베가펑크 제거라는 임무를 우선해 거리·기동·분신·표적 추적을 전환한 판단을 반영해 91로 소폭 상향한다. 장기전 유도라는 해석은 가능한 전술 가설이나 루피의 기어 5 시간 제한을 정확히 읽고 분신을 선택했다는 내면 설명으로 확정하지 않는다.',
   counterargument:'베가펑크 제거 임무와 심리적 갈등만으로도 교전·이탈을 설명할 수 있다. Gear5 소모전을 사전 계획했다고 단정해 92 이상으로 자동 가산하지 않는다.'},
  {characterId:'kizaru',stat:'versatility',from:91,to:94,readiness:'E2',
   evidenceIds:['evidence-kizaru-luffy-clones-1093','evidence-kizaru-vegapunk-1108'],
   rationale:'빛 기동·회피, 원거리 레이저, 근접 광검, 다중 분신을 통해 상대 교란, 정밀 표적 추적 및 전장 재진입을 실제로 수행했다. 서로 다른 거리·목적·방식을 하나의 열매로 전환하는 전투 역할의 폭을 종합해 94로 상향한다. 레이저 피해는 Attack, 형태 구현 정밀성은 Technique로 분리한다.',
   counterargument:'모든 분신의 독립 판단이나 특수 회복·아군 지원 역할은 확인되지 않았다. 형태가 여러 개인 것만으로 95+를 정당화하지 않는다.'},
  {characterId:'shanks',stat:'defense',from:91,to:93,readiness:'E2',
   evidenceIds:['evidence-shanks-sakazuki-block-579','evidence-shanks-kid-divine-departure-1079'],
   rationale:'사카즈키가 코비를 향해 날린 용암 주먹을 신속히 검으로 막아 피해를 방지한 직접 차단 성과와, 키드의 대함대 공격을 감지해 선제 요격한 위협 억제의 실제 보호 효과를 분리해 평가하여 93으로 상향한다. 미래예지의 정보 자체를 Defense에 별도 Raw로 이중 가산하지 않는다.',
   counterargument:'사카즈키는 소모된 전쟁 후반이고 타격 대상은 코비였으며, 키드 공격은 맞아서 견딘 사례가 아닌 선제 제거다. 장기 고위력 방어 성과는 제한되어 94+는 보류한다.'},
  {characterId:'shanks',stat:'combatIQ',from:93,to:94,readiness:'E2',
   evidenceIds:['evidence-shanks-kid-divine-departure-1079','evidence-shanks-aramaki-haki-1055','evidence-shanks-sakazuki-block-579'],
   rationale:'키드의 함대 파괴 미래를 관찰한 직후 위협 우선순위를 결정하고 개인적으로 빠르게 요격한 판단, 와노 아라마키를 원거리에서 제지한 위협 억제, 정상결전 코비 보호에 즉시 개입한 판단을 종합해 최종 93→94를 검토 반영한다. 기존 견문색 Raw4×0.5=2를 유지하고 Base91→92로 조정하며 예지 정확도 자체를 중복 산정하지 않는다.',
   counterargument:'정상결전 개입의 전체 전략 목표가 모두 단독 개인 전술이라는 근거는 부족하다. 미래를 볼 수 있다는 능력과 그에 따른 선택을 엄격히 분리하며 95+는 보류한다.'},
  {characterId:'shanks',stat:'versatility',from:88,to:91,readiness:'E2',
   evidenceIds:['evidence-shanks-aramaki-haki-1055','evidence-shanks-kid-divine-departure-1079','evidence-shanks-sakazuki-block-579'],
   rationale:'장거리 패왕색 견제·전장 개입, 미래예지로 함대 공격을 선제 차단하는 보호형 요격, 검술 근접 공방이라는 서로 다른 목표·거리의 실전 역할을 수행했다. 폭넓은 전술적 수단의 실제 적용을 기존 88보다 높게 보고 91로 조정하되, 패기 그 자체에 일괄 산술 보너스를 주거나 동일 결정타를 Attack/Technique와 중복 계산하지 않는다.',
   counterargument:'기술 체계가 패기+검술 중심이며 광역 직접 공격, 변신, 회복 등 독립 역할은 확인되지 않았다. 키드 일격으로 모든 전투 상황 적응을 증명하지 않는다.'},
  {characterId:'mihawk',stat:'versatility',from:84,to:86,readiness:'E2',
   evidenceIds:['evidence-mihawk-zoro-49-51','evidence-mihawk-jozu-553','evidence-mihawk-luffy-560-561'],
   rationale:'바라티에 작은 단검의 초근접 정밀 방어, 요루를 이용한 근거리 교환·추격, 정상결전 원거리 비상참격 및 대형 절단의 거리·목표 크기·목적 전환을 실제로 수행했다. 검술 중심이더라도 거리와 전장 역할을 변화시키는 폭을 기존 84보다 넓게 평가해 86(E2)으로 상향한다.',
   counterargument:'기술 정밀성은 Technique99, 위력은 Attack97에 이미 충분히 반영돼 있다. 검술 단일 체계에서 파생된 수단이므로 상대 능력 무효화·지원·공중 기동 등 다른 역할을 가진 인물과 단순 동급으로 보지 않는다.'},
] as const

export function applyV046AxisReview(evaluation:Evaluation):Evaluation {
  if(evaluation.isDefault===false) return evaluation
  const decisions=v046Decisions.filter(d=>d.characterId===evaluation.characterId)
  if(decisions.length===0)return evaluation
  const items=evaluation.items.map((item):EvaluationItem=>{
    const d=decisions.find(x=>x.stat===item.stat)
    if(!d)return item
    const oldFinal=getFinalStatScore(item)
    if(oldFinal!==d.from)throw new Error('v0.4.6 score baseline mismatch: '+evaluation.characterId+'/'+item.stat+' expected '+d.from+' saw '+oldFinal)
    const raw=oldFinal-item.baseScore
    const next:EvaluationItem={...item,baseScore:d.to-raw,score:d.to,readiness:d.readiness,rationale:d.rationale+' [한계·반론: '+d.counterargument+']',evidenceIds:[...new Set([...item.evidenceIds,...d.evidenceIds])],hakiContributions:[...item.hakiContributions]}
    if(getFinalStatScore(next)!==d.to)throw new Error('v0.4.6 final mismatch '+evaluation.characterId+'/'+item.stat)
    return next
  })
  return {...evaluation,evaluationDataVersion:'evaluation-0.4.6-five-character-context-cross-axis-review',items}
}
