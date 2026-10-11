import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'

/**
 * v0.1.75 focused post-v0.1.74 review.
 *
 * No score or model changes are approved by this review. Only the previously
 * unrecorded Grus clay-golem area-denial feat is added to the CURRENT Grus
 * evaluation. The old v0.1.70 draft stays immutable for historical replay.
 *
 * Source tier: official ONE PIECE.com anime synopsis TV1114 (supplementary).
 * We have NOT independently inspected every panel of manga Ch.1080–1081.
 */
export const v0175ReviewDecisions = [
  {characterId:'koby',axis:'attack',decision:'retain',finalScore:82,reason:'실직권골의 거대 구조물 파괴는 직접 성과지만, 가프의 선행 교란·헤르메포 호위·그루스 낙석 방어와 반복 가능한 강자 대인 화력을 구분한다.'},
  {characterId:'prince-grus',axis:'versatility',decision:'retain-evidence-expanded',finalScore:85,reason:'점토 인형의 전장 통제와 낙석 완충·구조 보호라는 서로 다른 실제 임무를 구분. 모두 점토 한 체계에서 파생되며 85는 E2 잠정값.'},
  {characterId:'doflamingo',axis:'techniqueMastery',decision:'retain',finalScore:87,reason:'각성·공중 이동·실 봉합·구속의 제어 숙련은 기어4에 밀린 사실만으로 무효화되지 않는다.'},
  {characterId:'doflamingo',axis:'versatility',decision:'retain',finalScore:83,reason:'실 능력의 근접·원거리·광역·지원 기능은 확인되지만 같은 실의 다수 기술명을 독립 능력으로 세지 않는다.'},
  {characterId:'queen',axis:'versatility',decision:'retain',finalScore:80,reason:'과학무장·고대종·저지 계열 복수 수단이 있으나 상디전의 오발·주의 분산과 전투 역할 폭을 함께 판단한다.'},
  {characterId:'cracker',axis:'attack',decision:'retain',finalScore:77,reason:'기어4 루피에게 검격 피해를 입힌 사실, 나미의 물 지원, 11시간 병사전과 본체 직접 공방을 분리한다.'},
  {characterId:'jinbe',axis:'attack',decision:'retain',finalScore:76,reason:'후즈 후 격파는 방어·어인공수도 숙련·결정타를 합친 결과이며 상대보다 Attack 축이 반드시 높아야 하는 것은 아니다.'},
  {characterId:'whos-who',axis:'attack',decision:'retain',finalScore:79,reason:'지건의 직접 위협은 인정하지만 징베의 방어 대응을 돌파하지 못한 맥락을 유지한다.'},
  {characterId:'vista',axis:'techniqueMastery',decision:'retain',finalScore:87,reason:'미호크와 짧은 검술 공방은 숙련 전문성 근거이나 미호크급 모든 축·장기전 동급은 아니다.'},
  {characterId:'jozu',axis:'defense',decision:'retain',finalScore:84,reason:'미호크 참격 방어와 쿠잔 빙결에 대한 취약성이 공존하는 조건부 물리 특화다.'},
  {characterId:'lucci',axis:'combatIQ',decision:'retain',finalScore:74,reason:'센토마루 지휘권 공략과 세라핌전 협력은 긍정 근거지만 사황 상대 지시 위반과 판단 한계가 함께 존재한다.'},
  {characterId:'crocodile',axis:'combatIQ',decision:'retain',finalScore:86,reason:'알라바스타 함정·약점 활용은 전술 근거지만 장기 조직 운영과 최신 정면전 능력으로 중복 가산하지 않는다.'},
  {characterId:'stussy',axis:'combatIQ',decision:'retain',finalScore:85,reason:'내부자 기습의 실행 시점 판단은 강점이지만 동료 신뢰·정보 비대칭을 정면전의 절대 IQ 우위로 환산하지 않는다.'},
] as const

export const v0175GrusBattle:Battle = {
  id:'battle-v0175-grus-golems-1114',
  title:'하치노스 구출 — 그루스 점토 인형의 광장 접근 통제',
  chronologyOrder:509,
  combatStructure:'multiple-vs-multiple',
  combatPurpose:'SWORD의 코비 구출·해병 상륙 작전에서 광장 접근을 차단',
  combatIntent:'unknown',
  environment:'하치노스 해적섬 광장',
  restrictions:'해적 다수와 SWORD·가프가 참가한 협동 작전. 그루스 개인의 무제한 1대1 결투가 아님',
  externalFactors:'히바리·쿠자쿠 및 가프의 협력, 군함 낙하와 연계된 구조 작전',
  result:'unknown',
  participantIds:[],
}

export const v0175GrusEvidence:Evidence = {
  id:'evidence-v0175-grus-clay-golems-tv1114',
  battleId:v0175GrusBattle.id,
  subjectCharacterId:'prince-grus',
  source:{
    type:'supplementary',
    reference:'ONE PIECE.com official TV anime Episode 1114, connected to manga Ch.1080–1081',
    description:'https://one-piece.com/anime/68048/index.html',
  },
  evidenceStrength:'moderate',
  fact:'하치노스 광장에서 그루스는 점토 인형을 움직여 해적들이 광장으로 접근하지 못하게 했다. 가프·SWORD의 코비 구출 작전 도중의 협동 활동이다.',
  supportedAbilities:['점토 인형 생성·조종','적 접근 통제','아군 상륙·구출 지원'],
  statContributions:[
    {stat:'versatility',role:'primary',note:'기존 TV1122의 낙석 완충·보호와 달리 전장 접근 통제라는 별도 기능이 확인된다. 다만 같은 점토 메커니즘에 의존한다.'},
    {stat:'techniqueMastery',role:'secondary',note:'복수 점토 인형을 전술적 위치에 운용한 제어 사례이나, 정밀도나 독립 대인 화력을 수치로 자동 환산하지 않는다.'},
    {stat:'combatIQ',role:'context',note:'전술 전체는 가프·SWORD 공동작전이므로 독자적 작전 설계·IQ 상승으로 귀속하지 않는다.'},
  ],
  interpretation:'점토는 방어용 완충물 외에도 구역 통제에 쓰인다. 능력 다기능성은 강화되지만 단일 점토 체계의 파생기를 서로 무관한 능력으로 합산하면 안 된다.',
  evaluationImpact:'Grus Versatility85(E2), Technique81(E2) 유지. 관련 근거 연결과 rationale만 갱신. Haki Raw·Overall·타 인물 수치 불변.',
  uncertainty:'공식 애니 에피소드 줄거리를 확인했으며 해당 원작 만화의 모든 컷을 직접 비교하지 않았다. 인형의 독자 판단/강자 대인 화력/지속 시간은 확정 불가.',
}

export function applyV0175GrusEvidenceReview(evaluation:Evaluation):Evaluation {
  if(evaluation.characterId!=='prince-grus'||evaluation.isDefault===false)return evaluation
  const v=evaluation.items.find(x=>x.stat==='versatility')
  const t=evaluation.items.find(x=>x.stat==='techniqueMastery')
  if(!v||!t||getFinalStatScore(v)!==85||getFinalStatScore(t)!==81 ||
    getRawHakiContributionTotal(v)!==0||getRawHakiContributionTotal(t)!==0) {
    throw new Error('v0.1.75 Grus evaluation baseline mismatch')
  }
  const items=evaluation.items.map((i):EvaluationItem=>{
    if(i.stat!=='versatility'&&i.stat!=='techniqueMastery')return i
    const changed:EvaluationItem={
      ...i,
      evidenceIds:[...new Set([...i.evidenceIds,v0175GrusEvidence.id])],
      rationale:i.stat==='versatility'
        ? '점토 인형을 이용한 광장 접근 통제(TV1114)와 낙하물 완충·군함 보호(TV1122)는 서로 다른 전투/구출 기능이다. 다만 모두 점토 생성·조작 한 메커니즘에서 나왔고 강자 상대 정면 공격, 고난도 독립 수단의 반복성은 미확인이다. 현재 Final85·E2는 확정 기준점이 아닌 잠정 비교값으로 유지한다.'
        : '점토 인형의 다수 적 접근 통제(TV1114)와 점토 둥지를 이용한 낙석 차단(TV1122)이라는 상이한 역할을 실행했다. 운용 정밀도는 인정하지만 동일 점토 기반 기술이 늘었다고 숙련 점수를 자동 가산하지 않는다.',
    }
    return {...changed,score:getFinalStatScore(changed)}
  })
  return {...evaluation,evaluationDataVersion:'evaluation-0.1.75-grus-evidence-expanded-no-score-change',items}
}
