import type { Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import type { Evidence } from '../../domain/evidence/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

/**
 * v0.1.74 — only two targeted seven-axis recalibrations.
 *
 * Source boundary: ONE PIECE.com TV 1100/1101/1109/1124/1125 plus
 * chapter-indexed Ch.1006 summaries for Marco. Direct manga panel-by-panel
 * review NOT completed; new evidence remains supplementary.
 *
 * Preserve the pre-patch source Evaluation object by value and publish only
 * new current versions for Lucci & Marco. No other character, Haki or
 * calculation/model changes permitted.
 */
export const v0174ScoreChanges = [
  {
    characterId:'lucci',stat:'combatIQ',
    oldFinal:68,newFinal:74,
    evidenceIds:['evidence-lucci-sentomaru-1100','evidence-lucci-seraphim-1109','evidence-v0174-lucci-targeted-command-1101','evidence-v0174-lucci-egghead-intel-1124'],
    explanation:'작전 목표(베가펑크 암살, 세라핌 지휘권)를 인식하고 센토마루를 의도적으로 노린 전술적 행동, 불리해진 세라핌전에서 임시 공동전, 에그헤드 내부 정보를 해군에 전달한 임무 완수 행동은 IQ68 수준의 일관된 무능 주장과 어긋난다. 하지만 사카즈키의 교전 자제 지시를 무시하고 기어5 루피와 충돌했으며 루나리아 방어 분석도 선도하지 못했다. 크로커다일86·스튜시85와 동급이라고 단정하지 않고 74의 보수적 중하위 전술 판단을 채택한다. 이전 IQ68은 프로젝트 자체가 잠정 수치(E3)로 표시했다.',
    readiness:'E2', // Multiple concrete successes and adverse counterexamples; no global-intelligence inference.
  },
  {
    characterId:'marco',stat:'attack',
    oldFinal:77,newFinal:79,
    evidenceIds:['evidence-v0174-marco-phoenix-brand-queen-1006','evidence-marco-armament-akainu-574','evidence-marco-regeneration-1006'],
    explanation:'Ch.1006에서 마르코의 봉황인 타격에 퀸이 피를 토한 대인 유효 피해와, 킹에게 청염안+무릎 공격을 연결한 직접 공세를 추가 확인했다. 기존 77점 근거의 결정타 반복 부재는 그대로 유지하되 공격 성공을 단순 넉백/견제로만 취급한 하한의 과소평가를 2점 교정한다. 퀸·킹이 쓰러지지 않고 전투에 복귀한 사실과 다대일·보호 목표, 마르코의 피로는 상한을 제한한다. Base 76→78이고 기존 독립 무장색 Raw2×0.5=1은 변경하지 않는다.',
    readiness:'E2',
  },
] as const

export const v0174Evidence:Evidence[] = [
  {
    id:'evidence-v0174-marco-phoenix-brand-queen-1006',
    battleId:'onigashima-marco-king-queen',
    subjectCharacterId:'marco',
    source:{
      type:'supplementary',
      reference:'ONE PIECE manga Ch.1006 / Anime Onigashima sequence, secondhand chapter synopsis',
      description:'https://onepiece.fandom.com/wiki/Chapter_1006 ; https://one-piece.com/anime/o6343/index.html ; https://one-piece.com/anime/o6351/index.html',
    },
    evidenceStrength:'moderate',
    fact:'오니가시마 Ch.1006에서 마르코는 봉황인으로 퀸에게 실제 출혈·충격을 일으켰고, 킹을 청염안과 무릎 공격으로 건물 쪽에 밀어붙였다. 킹·퀸은 전투를 계속했고 마르코에게도 피로가 누적되었다.',
    supportedAbilities:['봉황인 근접 유효타','청염안·무릎 공격 연계','강자전 실제 공격 성립'],
    statContributions:[
      {stat:'attack',role:'primary',note:'퀸의 실제 출혈은 단순 견제·이동만이 아니라 대인 유효 피해를 발생시킨 직접 근거다.'},
      {stat:'techniqueMastery',role:'context',note:'공격 기술 수를 Technique/Versatility에 중복 가산하지 않는다.'},
      {stat:'stamina',role:'context',note:'2대1 교전의 누적 소모와 킹/퀸의 전투 복귀를 장기전 맥락으로만 사용한다.'},
    ],
    interpretation:'기존 Attack77이 실제 타격 피해를 지나치게 보수적으로 취급했을 가능성이 있다. +2 Final은 비교 척도 교정이지 공격 하나당 +2라는 규칙이 아니다.',
    evaluationImpact:'Marco Attack Base76→78, Raw2 unchanged, Final77→79; Overall +2/7. 상대의 누적 피해·상태, 보호 임무, 왕복 전투 복귀 반영.',
    uncertainty:'마르코의 공격으로 퀸이 피를 토한 세부 사건은 원작 1006화의 2차 회차 줄거리로 확인했다. 이번 실행에서 직접 만화의 모든 컷을 열람한 것은 아니며 정식 1대1 총격파나 영구 부상 증명은 아니다.',
  },
  {
    id:'evidence-v0174-lucci-targeted-command-1101',
    battleId:'egghead-lucci-sentomaru',
    subjectCharacterId:'lucci',
    source:{
      type:'supplementary',
      reference:'ONE PIECE.com TV1101 — Sentomaru command priority',
      description:'https://one-piece.com/anime/66425/index.html',
    },
    evidenceStrength:'strong',
    fact:'루치는 세라핌·파시피스타 지휘권 우선순위가 CP0보다 높은 센토마루를 제거해야 통제권을 되찾을 수 있다는 판단 아래 센토마루를 공격했고, 루피의 저지 전까지 공격을 이어갔다.',
    supportedAbilities:['지휘 체계 파악','우선 목표 선정','급소 타격'],
    statContributions:[
      {stat:'combatIQ',role:'primary',note:'적 지휘권을 무력화하려는 합리적 목표 선택과 행동이 직접 명시된다. 원래 평가의 IQ68에 부정적 장면만 과도하게 가중됐는지 검증.'},
      {stat:'attack',role:'context',note:'이미 기록한 동일 센토마루 피해는 새로운 독립 화력 성과로 중복 가산하지 않는다.'},
    ],
    interpretation:'전투 중 특정 전략 목표를 파악하는 능력은 검증되지만, 상부의 사황 교전 금지 지시를 어긴 장면을 무효화하지 않는다.',
    evaluationImpact:'Lucci Combat IQ 재평가의 긍정 근거. 기존 evidence-lucci-sentomaru-1100과 동일 사건이므로 중복 카운트 금지.',
    uncertainty:'사황 루피 상대 고집과 스튜시 기습 실패는 제한 요소이고 센토마루 임무 수행 성공이 다른 적을 상대로 한 최고급 전략 능력을 보장하지 않는다.',
  },
  {
    id:'evidence-v0174-lucci-egghead-intel-1124',
    battleId:'egghead-lucci-zoro',
    subjectCharacterId:'lucci',
    source:{
      type:'supplementary',
      reference:'ONE PIECE.com TV1124 — Egghead operational intelligence',
      description:'https://one-piece.com/anime/72106/index.html',
    },
    evidenceStrength:'moderate',
    fact:'에그헤드 포위 시점에 루치는 해군/오로성 측에 섬 내부 정보를 전달했고 그 정보는 해군 지휘관의 작전 판단에 사용되었다.',
    supportedAbilities:['적진 정보 공유','임무 수행 중 상황 전환'],
    statContributions:[
      {stat:'combatIQ',role:'secondary',note:'전장 정보 전달은 임무 판단 보조 사례다. 정보 활동 자체는 1대1 교전 전술과 동의어가 아니다.'},
      {stat:'versatility',role:'context',note:'잠입/첩보를 직접 신체 능력이나 공격 범용성의 신규 효과로 이중 가산하지 않는다.'},
    ],
    interpretation:'IQ=전장 목적 달성 판단을 고려하되 정보전 역량을 전술 IQ의 절대 상한으로 쓰지 않는다.',
    evaluationImpact:'루치 68→74 검증의 보조 자료이며 지휘·정보 성공만으로 80점 이상을 확정하지 않는다.',
    uncertainty:'섬 내부 정보 제공의 임무 목표 달성은 확인되지만 독자적인 전술 설계와 그 결과는 분리하여 평가한다.',
  },
]

const versionedTargets=new Set<string>(v0174ScoreChanges.map(x=>x.characterId))

export function applyV0174EvaluationCorrection(evaluation:Evaluation):Evaluation{
  if(!versionedTargets.has(evaluation.characterId)||evaluation.isDefault===false)return evaluation
  const change=v0174ScoreChanges.find(x=>x.characterId===evaluation.characterId)!
  const originalItem=evaluation.items.find(i=>i.stat===change.stat)
  if(!originalItem)throw Error('missing '+change.characterId+':'+change.stat)
  if(getFinalStatScore(originalItem)!==change.oldFinal)throw Error('v0.1.74 baseline score mismatch: '+change.characterId)
  const raw=originalItem.hakiContributions.reduce((s,x)=>s+x.amount,0)*.5
  const nextBase=change.newFinal-raw
  const items=evaluation.items.map((i):EvaluationItem=>{
    if(i.stat!==change.stat)return i
    const changed:EvaluationItem={...i,baseScore:nextBase,score:nextBase,readiness:change.readiness,
      rationale:change.explanation,
      evidenceIds:[...new Set([...i.evidenceIds,...change.evidenceIds])],
    }
    return {...changed,score:getFinalStatScore(changed)}
  })
  return {...evaluation,evaluationDataVersion:'evaluation-0.1.74-lucci-marco-evidence-calibrated',items}
}
