import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation, EvidenceReadiness, CombatStat } from '../../domain/evaluation/types'
import { luffyEvaluation } from './luffyDraft'

/**
 * Separate combat configurations of the SAME post-Wano Luffy (no age/era power regression).
 * The v0.4.1 Evaluation export above is deliberately kept untouched as a prior result.
 * Gear 4 can use Gears 2-4 and learned Haki, never the fruit awakening.
 * Gear 5 can use that baseline plus active awakening, but not perpetually.
 * Draft estimates, NOT author-issued numerical power levels or derived win probabilities.
 */
export const luffyStateBattles: Battle[] = [
  {
    id:'luffy-katakuri-snakeman-870',
    title:'홀케이크 아일랜드 — 스네이크맨과 카타쿠리',
    chronologyOrder:280, combatStructure:'1v1',
    combatPurpose:'카타쿠리와의 대결을 마무리하고 동료에게 합류',
    combatIntent:'full-power',environment:'미러 월드',
    restrictions:'기어 4의 소모와 기어 5 습득 이전 시점. 이후 와노에서 얻은 패기·전투 경험을 이 당시 성과에 소급하지 않음.',
    externalFactors:'전투 이전의 장시간 공방과 카타쿠리의 견문색/모치 상성이 작용. 에그헤드 현재의 순수 측정 표본이 아님.',
    result:'victory',participantIds:[],
  },
  {
    id:'luffy-lucci-gear5-1100',
    title:'에그헤드 — 기어 5와 각성 루치 / 센토마루 보호',
    chronologyOrder:357,combatStructure:'multiple-vs-multiple',
    combatPurpose:'베가펑크 일행과 센토마루 보호 및 CP0 저지',
    combatIntent:'serious',environment:'에그헤드',
    restrictions:'루치는 센토마루를 공격해 지휘권을 빼앗으려 했으며 루피는 다른 임무와 대상 보호를 병행함.',
    externalFactors:'전투 중 루치의 공격이 센토마루에게 적중. 웃는 루피의 행동이 피해를 직접 초래했다고 확정할 수 없음.',
    result:'interrupted',participantIds:[],
  },
]

const source = (reference:string): Evidence['source'] => ({
  type:'supplementary',reference,
  description:'ONE PIECE.com 공식 애니메이션 회차 소개. 만화 컷 단위 직접 검증은 아직 완료하지 않음.',
})
const evidence = (
  id:string,battleId:string,reference:string,fact:string,
  statContributions:Evidence['statContributions'],interpretation:string,uncertainty:string,
):Evidence=>({
  id,battleId,subjectCharacterId:'luffy',source:source(reference),evidenceStrength:'moderate',
  fact,statContributions,supportedAbilities:['기어 4·패기 또는 기어 5 실전 응용'],
  interpretation,evaluationImpact:'전투 상태별 7축의 정성 근거로만 사용. 다른 캐릭터나 Matchup 점수 자동 변경 없음.',
  uncertainty,
})
export const luffyStateEvidence: Evidence[] = [
  evidence('evidence-luffy-gear4-snakeman-870','luffy-katakuri-snakeman-870',
    'https://one-piece.com/anime/o4949/index.html',
    '카타쿠리의 견문색 예측에 대해 루피는 스네이크맨의 빠르고 궤적을 바꾸는 추적 주먹으로 대응했고, 공격이 카타쿠리의 얼굴에 적중했다.',
    [{stat:'speed',role:'primary',note:'회피하는 상대에게 추적 타격을 적중시킨 실제 고속 공방.'},
     {stat:'techniqueMastery',role:'primary',note:'상대의 감지 기술에 맞춰 공격 방식과 궤적을 전환.'},
     {stat:'combatIQ',role:'primary',note:'상대의 예측 강점에 맞춘 공격 선택.'},
     {stat:'versatility',role:'secondary',note:'기어 형태 전환과 공격 궤적 제어.'}],
    '기어 4 운용의 속도·전술 판단·숙련을 확인하지만 에그헤드 시점의 패기까지 당시 보유했다고 추론하지 않음.',
    '카타쿠리전은 과거 시점이며, 기어 4 변환 전후 소모와 상처를 통제한 완전히 새로운 결투가 아니다.'),
  evidence('evidence-luffy-gear4-kaido-1069','luffy-kaido-wano-summary',
    'https://one-piece.com/anime/62672/index.html',
    '카이도와 공방 중 루피가 마지막 기어 4를 발동했고, CP0 요원이 철괴로 루피의 공격을 가로막자 카이도의 일격을 허용했다.',
    [{stat:'attack',role:'primary',note:'카이도전 기어 4 고출력 공방(마무리 일격 자체는 방해로 미성립).'},
     {stat:'defense',role:'context',note:'CP0 개입 후 피격을 독립적 방어 실패로 환산하지 않음.'},
     {stat:'stamina',role:'primary',note:'계속된 공방 중 최후 기어 4 사용과 한계의 정황.'},
     {stat:'combatIQ',role:'secondary',note:'결정적인 기어 4 공격 선택과 CP0 외부 개입 구분.'}],
    '각성 없는 기어 4+패기 수준에서도 사황과 교전했지만 CP0 개입 이후의 패배를 무제약 1:1 측정값으로 보지 않는다.',
    '카이도는 이전에 다수와 교전했고 루피 역시 상당한 누적 피해 상태다.'),
  evidence('evidence-luffy-gear4-volume103','luffy-kaido-wano-summary',
    'https://one-piece.com/comics/o103/index.html',
    '공식 코믹스 103권 소개는 루피가 기어 4로 카이도를 공격했으나 카이도의 취권과 CP0 개입으로 위기에 처한 과정을 명시한다.',
    [{stat:'attack',role:'secondary',note:'기어 4 고강도 공세의 보조 출처.'},
     {stat:'defense',role:'secondary',note:'카이도의 강력한 반격과 사전 교전조건.'},
     {stat:'versatility',role:'secondary',note:'각성 이전의 여러 기어와 패기 전환은 정성적으로만 평가.'}],
    '공식 만화 권별 소개로 기어 4전의 조건을 교차 확인하며 기어 5의 성과를 기어 4에 합산하지 않는다.',
    '권별 줄거리 소개는 개별 만화 컷을 직접 분석한 것과 다르며 공격 피해량을 특정하지 않는다.'),
  evidence('evidence-luffy-gear5-lucci-1100','luffy-lucci-gear5-1100',
    'https://one-piece.com/anime/66166/index.html',
    '루피는 웃으며 기어 5로 각성 루치와 싸웠고, 교전 중 루치가 센토마루에게 수총으로 피해를 입혔다.',
    [{stat:'combatIQ',role:'primary',note:'보호 대상에 대한 위험 관리/임무 중 적의 행동을 점검. 웃음만으로 판단력 저하라고 확정하지 않음.'},
     {stat:'versatility',role:'secondary',note:'각성 루치와 기어 5 변칙 공방.'}],
    '기어 5의 즉흥성·즐거운 행동과 보호 임무 실패 가능성을 함께 기록하되 직접 인과는 주장하지 않는다.',
    '루치의 센토마루 공격은 지휘권 확보를 위한 별도 의도이며 루피의 장난 때문에 맞았다는 단정은 금지.'),
  evidence('evidence-luffy-gear5-lucci-1101','luffy-lucci-gear5-1100',
    'https://one-piece.com/anime/66425/index.html',
    '루치가 추가 공격으로 센토마루를 노릴 때 루피가 공격을 막고 루치를 밀쳐냈다.',
    [{stat:'combatIQ',role:'primary',note:'기어 5에서도 보호 대상을 인지하고 공격을 차단한 반대 사례.'},
     {stat:'defense',role:'secondary',note:'상대의 후속 공격을 차단한 실제 행동.'}],
    '기어 5의 보호 판단이 완전히 사라진 것은 아니다. 1100화의 실패 가능성과 양쪽을 함께 반영.',
    '전투 상황이 빠르게 바뀌었으므로 한 사건의 성공·실패를 일반적인 전투 판단력 저하율로 환산하지 않는다.'),
]

const item = (
  stat:CombatStat, baseScore:number, rationale:string,
  evidenceIds:string[], readiness:EvidenceReadiness,
):Evaluation['items'][number]=>({
  stat,baseScore,score:baseScore,rationale,evidenceIds,hakiContributions:[],readiness,
})

/** Gear 4 at the SAME post-Wano era (Gear 2/3/4 and learned Haki; no Nika abilities). */
export const luffyGear4Evaluation:Evaluation={
  id:'evaluation-luffy-egghead-gear4',
  characterId:'luffy',
  evaluationDataVersion:'evaluation-0.4.3-luffy-gear4-evidence-review',
  status:'draft',isDefault:false,
  subjectState:{
    id:'egghead-gear4',
    label:'기어 4 이하',
    note:'와노 이후/에그헤드와 같은 성장 시점. 기어 2·3·4와 습득한 패기는 사용 가능하지만 기어 5 각성 능력은 제외. 카타쿠리전은 기술 숙련의 과거 성과로만 사용하며 당시 패기에 현재 숙련을 소급하지 않음.',
  },
  items:[
    item('attack',91,'카이도에게 기어 4로 전력을 다해 공세를 펼친 고출력 근접 타격. 마지막 기술의 유효타는 CP0 개입 때문에 확인할 수 없어 기어 5의 바즈랑 건 화력을 소급하지 않는다.',
      ['evidence-luffy-gear4-kaido-1069','evidence-luffy-gear4-volume103'],'E2'),
    item('defense',90,'고무 몸과 패기로 교전 중 반격을 견디거나 피하지만 카이도의 강한 공격과 기어 4의 제한이 존재한다. CP0에 의한 빈틈은 순수 방어 실패가 아니다. 기어 5의 지형 고무화 방어는 제외한다.',
      ['evidence-luffy-gear4-volume103','evidence-luffy-gear4-kaido-1069'],'E3'),
    item('stamina',90,'지속된 카이도전에서 반복 공방한 체력은 높지만 마지막 기어 4 사용의 명백한 소모 및 패기 의존을 고려한다. 기어 5의 재기와 탈진 성과는 반영하지 않는다.',
      ['evidence-luffy-gear4-kaido-1069','evidence-luffy-gear4-volume103'],'E3'),
    item('speed',94,'스네이크맨으로 미래예지 카타쿠리의 회피에 대응한 추적 타격과 기어 4의 빠른 공방을 인정한다. 구체적인 에그헤드 시점 단독 속도 직접 표본은 부족하며 키자루전 기어 5 성과는 적용하지 않는다.',
      ['evidence-luffy-gear4-snakeman-870','evidence-luffy-gear4-kaido-1069'],'E2'),
    item('techniqueMastery',92,'스네이크맨 공격 궤도 조절·바운드맨과 여러 기어 운용·패기 응용 숙련. 니카의 자유로운 신체·지형 각성 제어는 제외한다.',
      ['evidence-luffy-gear4-snakeman-870','evidence-luffy-gear4-kaido-1069'],'E2'),
    item('combatIQ',90,'카타쿠리의 미래예지를 고려해 스네이크맨 속도와 궤도를 선택하는 실제 대응과 카이도전 강공 선택을 인정한다. CP0 개입을 자책 판단 실수로 보지 않으며 상위 전략가급 반복 표본은 부족하다.',
      ['evidence-luffy-gear4-snakeman-870','evidence-luffy-gear4-kaido-1069'],'E3'),
    item('versatility',88,'기어 2·3·4의 속도·완력·추적 타격 및 패기 조합은 풍부하다. 그러나 니카 각성의 거대화·환경 고무화·파격적 방어 기동은 사용하지 못한다.',
      ['evidence-luffy-gear4-snakeman-870','evidence-luffy-gear4-volume103'],'E3'),
  ],
}

/** v0.4.1 legacy is kept intact; review only IQ (89 -> 87) and its Evidence. */
export const luffyGear5Evaluation:Evaluation={
  ...luffyEvaluation,
  id:'evaluation-luffy-egghead-gear5',
  evaluationDataVersion:'evaluation-0.4.3-luffy-gear5-combat-iq-review',
  status:'draft',isDefault:true,
  subjectState:{
    id:'egghead-gear5',
    label:'기어 5 · 니카',
    note:'에그헤드 시점에 니카를 발동했을 때의 조건부 성능. 기어 5의 자유로운 전투 발상과 보호 대상 대응을 함께 검토하되, 장난스러운 연출만으로 지능 저하를 증명했다고 간주하지 않음. 발동 후 극심한 소모는 그대로 반영.',
  },
  items:luffyEvaluation.items.map(i=>i.stat==='combatIQ'?{
    ...i,
    baseScore:87,score:87,readiness:'E3' as const,
    evidenceIds:[...i.evidenceIds,'evidence-luffy-gear5-lucci-1100','evidence-luffy-gear5-lucci-1101'],
    rationale:'각성 중 루피의 창의적인 변칙 대응과 키자루 저지·센토마루에 대한 후속 공격 차단은 뛰어나다. 반면 루치가 센토마루를 공격해 보호 임무에 위협이 발생한 사례, 웃으며 싸우는 행동과 위험 관리의 불안정성 가능성을 보수적으로 반영해 기존 89에서 87로 재평가한다. 해당 피격이 루피의 장난 때문에 발생했다고 확정하지 않으며, 카이도 결정타처럼 필요한 순간 전투를 끝내는 능력도 인정한다.'
  }:{...i,evidenceIds:[...i.evidenceIds],hakiContributions:[...i.hakiContributions]}),
}
