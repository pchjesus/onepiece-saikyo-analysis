import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'

/**
 * v0.1.78 contextual correction and source-focused opponent audit.
 * TV1113 establishes REAL enslaved captives on pirate-ruled Hachinosu.
 * TV1121 establishes an apparent endangered woman as a trap, which Koby
 * approached during a Garp-led withdrawal. It was poor threat verification
 * under combat risk, NOT evidence that civilians could not exist there.
 * TV868 establishes Smoothie's large repeated slashes and Nami/Jinbe's
 * coordinated navigation evasion; missing damage is not automatically weak
 * output or proof of Smoothie's slow bodily Speed.
 * All sources are verified official ONE PIECE.com anime synopses
 * (supplementary) rather than newly inspected manga panels.
 * Scores, Haki Raw and model are intentionally preserved at v0.1.77.
 */
export const v0178HachinosuCaptivesBattle: Battle = {
  id:'battle-v0178-koby-hachinosu-enslaved-rescue-tv1113',
  title:'하치노스 — 코비의 실제 포로·노예 해방과 유인 도주',
  chronologyOrder:489,
  combatStructure:'multiple-vs-multiple',
  combatPurpose:'하치노스에 갇힌 비전투원을 구출하고 그들이 도주하도록 추격을 유인',
  combatIntent:'unknown',
  environment:'검은수염 해적단 지배하의 하치노스',
  restrictions:'코비는 탈출 중인 포로의 안전을 고려한 상태. 강자와 대등한 단독 정면결투가 아님',
  externalFactors:'페로나가 코비를 탈출시켰고 섬의 해적들이 현상금을 노려 추격했다',
  result:'unknown',
  participantIds:[],
}

export const v0178KobyCaptivesEvidence: Evidence = {
  id:'evidence-v0178-koby-real-captives-hachinosu-tv1113',
  battleId:v0178HachinosuCaptivesBattle.id,
  subjectCharacterId:'koby',
  source:{type:'supplementary',reference:'ONE PIECE.com official anime TV Episode 1113 (2024-07-28)',description:'https://one-piece.com/anime/67844/index.html'},
  evidenceStrength:'moderate',
  fact:'하치노스에서 코비는 실제로 섬에 갇힌 노예들을 차례로 풀어주고, 그들의 안전한 탈출을 돕기 위해 자신이 미끼가 되어 해적들의 추격을 끌었다.',
  supportedAbilities:['비전투원 구출','추격 유인','구출 목표의 전술 선택'],
  statContributions:[
    {stat:'combatIQ',role:'secondary',note:'포로를 탈출시키고 자신이 추격을 유도하는 목표 선택은 해당 현장의 긍정적 판단 근거. 그러나 TV1121의 함정 위험 식별 실패를 상쇄하는 점수 보너스로 자동 적용하지 않는다.'},
    {stat:'stamina',role:'context',note:'해적들에게 쫓긴 이동을 고강도 장기 1대1 전투 지속으로 환산하지 않는다.'},
  ],
  interpretation:'해적 지배하의 하치노스에도 실제 피구금자·노예 등 구조 대상이 있었다. 따라서 TV1121에서 도움을 요청한 사람이 민간인일 가능성 자체가 0이어서 코비가 어리석었다는 서술은 정확하지 않다. 비판의 초점은 적 본거지·철수 중의 미검증 구조 신호에 지나치게 빠르게 반응한 위험/기만 평가와 우선순위 판단에 있다.',
  evaluationImpact:'Koby Combat IQ72(E2)를 유지하면서 TV1113의 실제 구조 대상과 TV1121의 위장 기습을 병치. Attack77, 다른 6축, Raw, Overall 불변.',
  uncertainty:'TV1113 공식 시놉시스는 포로 해방과 유인 도주를 확인한다. TV1121의 여성은 별개 시점의 함정이었지만 당시 모든 포로의 탑승 완료 여부나 코비가 그 사실을 인지한 정도는 이 두 공식 요약만으로 확정할 수 없다. 원작 만화 컷은 직접 전수 비교하지 않았다.',
}

export const v0178SmoothieEvasionEvidence:Evidence = {
  id:'evidence-v0178-smoothie-nami-jinbe-steering-tv868',
  battleId:'whole-cake-smoothie-pursuit',
  subjectCharacterId:'smoothie',
  source:{type:'supplementary',reference:'ONE PIECE.com official anime TV Episode 868 (2019-01-13)',description:'https://one-piece.com/anime/o4939/index.html'},
  evidenceStrength:'moderate',
  fact:'스무디는 아군 선박이 침몰할 위험에 이를 때까지 수분을 흡수해 거대화하고 써니호에 거대한 참격을 여러 차례 날렸다. 써니호는 나미의 구체적인 지시와 징베의 조타로 공격을 연속 회피했다.',
  supportedAbilities:['수분 흡수에 의한 거대화','거대 검격 반복','함선 공격 및 상대의 조타 회피'],
  statContributions:[
    {stat:'attack',role:'secondary',note:'공격의 대규모·반복은 스무디의 실제 성과이나 명중 후 상위 전투원에 준 피해는 미확인. 기존 Ch.894 근거와 같은 추격전으로 새 독립 화력 사건처럼 중복 가산하지 않는다.'},
    {stat:'speed',role:'context',note:'써니호의 회피는 나미와 징베의 협동 조타 성과이기도 하므로 스무디 개인의 신체 Speed가 낮다는 직접 증거가 아니다.'},
    {stat:'combatIQ',role:'context',note:'공격 대상은 전함/배이며 항해사·조타수의 대응이 섞여 개인 1대1 즉흥 전술 성과를 증명하지 않는다.'},
  ],
  interpretation:'명중하지 못한 공격이 모두 낮은 화력인 것은 아니다. 공격 발사 횟수·범위, 실제 적중력, 상대 회피 실력, 대인 방어 관통을 구분한다.',
  evaluationImpact:'Smoothie Attack76(E2), Speed74(E3), Combat IQ77(E3) 수치 유지. Attack에 보조 공식 애니 출처만 연결한다.',
  uncertainty:'TV868은 공식 애니 요약의 사실. 대인 방어력이 높은 상대에게 참격이 적중한 후 피해량은 해당 자료로 판단할 수 없다. Ch.894 인근 원작 컷 전체를 직접 재판독하지 않았으며 TV868과 기존 Ch.894 관련 사건을 독립 반복 실전으로 세지 않는다.',
}

export const v0178FocusedReview = [
  {characterId:'koby',stat:'combatIQ',final:72,readiness:'E2',decision:'retain-reframe-and-expand',reason:'하치노스에는 실제 노예·포로가 있었다(TV1113). TV1121의 함정 실패는 민간인 존재 가능성을 고려한 사실 오류가 아니라 적 본거지의 위험 검증·철수 우선순위 판단 문제다. 이미 v0.1.77 IQ72에 이 사건을 반영했으므로 동일 장면 재감점 금지.'},
  {characterId:'smoothie',stat:'attack',final:76,readiness:'E2',decision:'retain-evidence-expanded',reason:'TV868은 스무디의 다회 대형 참격과 나미·징베의 연속 조타 회피를 직접 구분한다. 공격 불명중=저출력이나 상대 생존=사최간급 대인 공격력 입증이라는 양극단을 피한다.'},
  {characterId:'smoothie',stat:'speed',final:74,readiness:'E3',decision:'retain',reason:'함선의 항해·회피 결과로 스무디 육체 최고속을 역산하지 않는다.'},
  {characterId:'sasaki',stat:'combatIQ',final:68,readiness:'E2',decision:'retain',reason:'공식 TV1042에서 프랑키가 장군에서 탈출해 라디칼 빔으로 승리. 상대의 함정·본체/기체 분리를 오판한 조건을 기존 낮은 IQ68과 중복 감점하지 않는다.'},
  {characterId:'sasaki',stat:'defense',final:79,readiness:'E2',decision:'retain',reason:'프랑키 장군과 힘겨운 정면전 후 빔 피격이라는 조건으로, 모든 전투 상황에서 동일한 취약성으로 일반화하지 않는다.'},
  {characterId:'black-maria',stat:'versatility',final:84,readiness:'E2',decision:'retain',reason:'TV1042·1044 환영·구속·실과 불꽃·격투의 실제 역할을 인정하되 동일 능력/지원 수단의 중복 독립능력 환산을 피한다.'},
  {characterId:'black-maria',stat:'combatIQ',final:74,readiness:'E2',decision:'retain',reason:'TV1044 로빈의 숨겨둔 기술을 과소평가한 상황은 기존 IQ74에 반영 가능한 위험 판단 자료이나 하나의 결과로 무근거 정밀 감점을 도출하지 않는다.'},
  {characterId:'ulti',stat:'stamina',final:84,readiness:'E2',decision:'retain',reason:'빅 맘 등의 외부 공격 및 이후 재교전 조건을 무시하고 사사키·페이지원과 단순 장기전 순위를 환산하지 않는다.'},
  {characterId:'page-one',stat:'defense',final:76,readiness:'E2',decision:'retain',reason:'공식 TV1031 빅 맘의 패기 공격에 쓰러짐. 사황 단발 패배로 일반 정면 Defense 전부를 하향하지 않는다.'},
] as const

/** Versioned evidence-only updates to CURRENT evaluation, never old seeds. */
export function applyV0178FocusedEvidenceReview(evaluation:Evaluation):Evaluation {
  const isKoby=evaluation.characterId==='koby'&&evaluation.isDefault!==false
  const isSmoothie=evaluation.characterId==='smoothie'&&evaluation.isDefault!==false
  if(!isKoby&&!isSmoothie)return evaluation
  const version=isKoby?'evaluation-0.1.77-koby-combat-iq-context-calibrated':'evaluation-0.1.26-draft'
  if(evaluation.evaluationDataVersion!==version)throw Error('v0.1.78 source version mismatch: '+evaluation.characterId)
  const stat=isKoby?'combatIQ':'attack'
  const expected=isKoby?72:76
  const evidenceId=isKoby?v0178KobyCaptivesEvidence.id:v0178SmoothieEvasionEvidence.id
  const original=evaluation.items.find(i=>i.stat===stat)
  if(!original||getFinalStatScore(original)!==expected||
    getRawHakiContributionTotal(original)!==0||
    original.readiness!=='E2')throw Error('v0.1.78 baseline mismatch: '+evaluation.characterId)
  const items=evaluation.items.map((i):EvaluationItem=>{
    if(i.stat!==stat)return i
    const rationale=isKoby
      ? '하치노스는 검은수염 해적단의 본거지이지만 실제 노예와 피구금자가 있었다(공식 TV1113). 코비가 노예들을 해방하고 스스로 미끼가 되어 탈출을 도왔다는 점은 긍정적 임무 판단이다. 따라서 하치노스에 비전투원이 있을 리 없다는 전제는 사실과 다르다. 다만 심각한 적대 전장과 철수 지시가 있는 TV1121에서 새로 등장한 구조 요청을 적의 위장일 가능성과 충분히 교차검증하지 않고 바로 접근한 위험 식별·우선순위 판단 실패는 명백한 감점 사유다. 이를 단순한 선의나 시류의 투명화라는 외부 조건으로 지워버리지 않는다. 가프는 대신 피격되었고, 팀 작전·TV1122 실직권골의 성공을 코비 개인의 독자 전술로 중복 가산하지 않는다. 이 실패는 이미 v0.1.77 Combat IQ76→72 조정에 반영한 사건이므로 동일 장면의 이중 감점을 금지한다. Final72(E2) 잠정 유지, 발전 가능성과 분리.'
      : '수분을 흡수해 본인·검을 거대화하고 큰 장거리 참격을 여러 번 발사한 사실은 기존 원작 Ch.894 근거와 공식 TV868 요약으로 교차 확인된다. 다만 나미의 회피 지시와 징베의 조타가 결합해 써니호가 피한 것이므로, 명중 실패를 곧 낮은 순수 출력으로 환산하지도 않고 실제 강자 대인 유효타로 과장하지도 않는다. 거대화가 아군 선박까지 침몰시킬 위험에 이른 제한 조건을 기록한다. TV868은 같은 추격전의 보조 교차검증이며 독립 고화력 전투 표본으로 중복 합산하지 않는다. Attack76(E2) 잠정 유지.'
    return {...i,rationale,evidenceIds:[...new Set([...i.evidenceIds,evidenceId])]}
  })
  return {...evaluation,evaluationDataVersion:isKoby
    ?'evaluation-0.1.78-koby-hachinosu-risk-context-evidence-only'
    :'evaluation-0.1.78-smoothie-jinbe-steering-evidence-only',items}
}
