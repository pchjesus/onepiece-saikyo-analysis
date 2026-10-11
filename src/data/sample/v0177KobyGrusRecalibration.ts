import type { Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'

/**
 * v0.1.77: Two narrow, evidence-contextual Core Stat recalibrations.
 *
 * Koby's good intentions and following Garp's commands are not independent
 * battle planning. His attempt to rescue a supposedly threatened civilian
 * in TV1121 was exploited by Shiryu. This is one contextual error, NOT proof
 * that Koby is generally unintelligent.
 *
 * Grus's clay golems (TV1114) and debris-catching clay nest (TV1122)
 * demonstrate two real combat roles but derive from one clay mechanism.
 * Neither proves a broad roster of independent offensive systems, matchups
 * or sustained top-level duel adaptations.
 *
 * Source: official ONE PIECE.com TV synopses (supplementary). Full manga panels
 * were not independently reread. Values are provisional comparative judgments,
 * not automatic deductions from one error or one Devil Fruit.
 *
 * No original v0.1.70 seeds or v0.1.75/v0.1.76 snapshots are overwritten.
 */
export const v0177Corrections = [
  {
    characterId:'koby',
    stat:'combatIQ',
    previousFinal:76,
    revisedFinal:72,
    previousEvaluationVersion:'evaluation-0.1.76-koby-single-burst-attack-calibrated',
    nextEvaluationVersion:'evaluation-0.1.77-koby-combat-iq-context-calibrated',
    readiness:'E2',
    evidenceIds:['evidence-v0170-koby-hurry','evidence-v0170-koby-impact'],
    rationale:'하치노스에서 코비는 가프의 탈출 지시와 동료의 엄호 속에서 실직권골을 실행했다. 팀의 작전 성공을 코비 개인의 독립적인 상황 설계·임기응변으로 중복 가산하지 않는다. 또 구출 대상이라고 판단한 여성을 돕기 위해 접근했다가 시류의 투명 기습 함정에 노출됐고, 가프가 몸으로 막으며 크게 다쳤다(공식 TV1121). 이는 해당 순간 위험 식별·우선순위 판단에 실제 한계가 있었음을 보여주지만, 민간인 구조 의도나 적의 은신 조건을 일반적인 낮은 지능의 증명으로 삼지 않는다. TV1122 일격에서의 목표 선택·용기와 협동 임무 수행 능력은 인정하되, 상위권 강자를 상대로 반복적인 독립 전술 분석·전황 조정의 표본이 부족해 기존 76은 높게 설정된 잠정값으로 판단한다. 다른 인물의 Combat IQ와 비교하여 현재 실전 판단 범위를 Final72(E2)로 제한한다. 이는 함정 1회당 정해진 감점이 아니며 미래 성장력과 무관하다.',
  },
  {
    characterId:'prince-grus',
    stat:'versatility',
    previousFinal:85,
    revisedFinal:80,
    previousEvaluationVersion:'evaluation-0.1.75-grus-evidence-expanded-no-score-change',
    nextEvaluationVersion:'evaluation-0.1.77-grus-single-clay-system-versatility-calibrated',
    readiness:'E2',
    evidenceIds:['evidence-v0170-prince-grus-clay','evidence-v0175-grus-clay-golems-tv1114'],
    rationale:'그루스는 점토 인형을 만들어 해적들의 광장 접근을 차단했고(공식 TV1114), 점토 둥지로 코비가 파괴한 거대한 팔의 낙석을 받아 군함과 동료를 보호했다(TV1122). 전장 통제와 보호/완충이라는 서로 다른 전투 역할은 인정한다. 그러나 점토 인형·점토 완충·점토 방벽을 각기 독립된 전투 메커니즘이나 정면전 공격 체계로 가산하면 같은 질척질척 열매의 기능을 과대평가한다. 상대 능력에 맞춘 다수 상성 해법, 독립 대인 결정기와 고강도 장기전 적응이 직접 확인되지 않은 점에서 기존 85는 상위 다체계 전투원의 범용성 눈금에 비해 높다. 현재 입증된 다양한 역할을 보존하는 선에서 Final80(E2)로 재보정한다. 확인되지 않은 능력이 없다고 단정하지 않으며, 한 열매의 사용자 모두에게 동일 감점을 적용하지 않는다.',
  },
] as const

/** No automatic numeric correction from merely sparse evidence. */
export const v0177RosterFollowup = [
  {characterId:'smoothie', axis:'attack',final:76,readiness:'E2',decision:'hold',note:'큰 장거리 참격의 반복은 확인되지만 최고 강자 대인 직접 유효타 표본과 분리한다. Attack 76 유지.'},
  {characterId:'ulti',axis:'stamina',final:84,readiness:'E2',decision:'hold',note:'빅 맘의 외부 개입을 울티의 단독 연전 결과와 구분한다. Stamina84 유지.'},
  {characterId:'page-one',axis:'defense',final:76,readiness:'E2',decision:'hold',note:'빅 맘의 패기 펀치 한 번의 패배를 사황이 아닌 인물 상대 Defense 전체로 환산하지 않는다.'},
  {characterId:'sasaki',axis:'speed',final:70,readiness:'E3',decision:'hold',note:'돌진·기계 상대 전투 자료로 독립 순수 최고속을 확정하지 않는다.'},
  {characterId:'raizo',axis:'versatility',final:84,readiness:'E2',decision:'hold',note:'불꽃 반사는 두루마리의 전용 기능이지만 원래 불꽃의 공격력은 카이도에 귀속한다.'},
  {characterId:'kawamatsu',axis:'speed',final:74,readiness:'E3',decision:'hold',note:'아카자야 동시 협동 검격을 단독 속도 상한으로 전환하지 않는다.'},
  {characterId:'karasu',axis:'speed',final:82,readiness:'E2',decision:'hold',note:'열매 이동·비행/분산·군중 속 전장 기동을 순수 신체 반응속도와 구분한다.'},
  {characterId:'shiryu',axis:'speed',final:79,readiness:'E3',decision:'hold',note:'투명 기습의 성공과 눈으로 볼 수 있는 정면 이동속도는 다른 조건이다.'},
  {characterId:'van-augur',axis:'versatility',final:82,readiness:'E2',decision:'hold',note:'워프의 위치 우위는 인정하되 다른 독립 공격 기법으로 중복 계산하지 않는다.'},
] as const

export function applyV0177KobyGrusRecalibration(evaluation:Evaluation):Evaluation {
  if(evaluation.isDefault===false)return evaluation
  const correction=v0177Corrections.find(c=>c.characterId===evaluation.characterId)
  if(!correction)return evaluation
  if(evaluation.evaluationDataVersion!==correction.previousEvaluationVersion) {
    throw Error('v0.1.77 source evaluation version mismatch for '+correction.characterId)
  }
  const target=evaluation.items.find(i=>i.stat===correction.stat)
  if(!target||getFinalStatScore(target)!==correction.previousFinal||
     getRawHakiContributionTotal(target)!==0||target.readiness!==correction.readiness||
     correction.evidenceIds.some(id=>!target.evidenceIds.includes(id))) {
    throw Error('v0.1.77 baseline mismatch '+correction.characterId+'/'+correction.stat)
  }
  const items=evaluation.items.map((i):EvaluationItem=>{
    if(i.stat!==correction.stat)return i
    const modified={...i,baseScore:correction.revisedFinal,readiness:correction.readiness,rationale:correction.rationale}
    return {...modified,score:getFinalStatScore(modified)}
  })
  return {...evaluation,evaluationDataVersion:correction.nextEvaluationVersion,items}
}
