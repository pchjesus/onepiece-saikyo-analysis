/**
 * v0.4.20 user-approved provisional Magellan (Impel Down era).
 * Official ONE PIECE.com character page and TV episode synopses are supplementary,
 * not independently inspected original manga panels. Never infer Haki Raw.
 */
import type {Character,CharacterMembership} from '../../domain/character/types'
import type {Battle} from '../../domain/battle/types'
import type {Evidence} from '../../domain/evidence/types'
import {COMBAT_STATS,type CombatStat,type Evaluation,type EvidenceReadiness} from '../../domain/evaluation/types'
import {getFinalStatScore} from '../../domain/evaluation/score'

export const v0420MagellanCharacter:Character={
 id:'magellan',name:'마젤란',crewId:'impel-down',knownAs:[],
 description:'임펠다운 편 당시 서장, 이후 부서장. 독독 열매의 히드라·독의 거병 등으로 침입자 제압과 탈옥 저지를 수행했다. 평가 시점은 임펠다운 편으로, 이후 전력과 확인되지 않은 패기는 가산하지 않는다.',
 combatProfile:{
  combatStyles:['독독 열매·히드라','접촉·광역 중독','독에 의한 접근·진로 봉쇄','독의 거병'],
  specialTraits:[{
   id:'special-v0420-magellan-poison',category:'devil-fruit',name:'독독 열매',status:'confirmed',
   description:'독을 생성·방출하여 독룡, 광역 중독, 독의 거병으로 공격·제압·접근 억제에 활용한다.',
   evidenceIds:['evidence-v0420-magellan-luffy','evidence-v0420-magellan-blackbeard','evidence-v0420-magellan-wax','evidence-v0420-magellan-demon'],
   limitations:'루피의 직접 타격을 허용했고 Mr.3의 두꺼운 밀랍 장벽은 히드라를 방어했다. 독 저항·접촉 회피·지형·상성에 따라 제압 효과가 달라진다.',
   uncertainty:'공식 일본어 자료·TV 요약은 검증했지만 원작 만화 컷 전체를 새로 대조하지 않았다.'
  }],
  haki:{characterId:'magellan',capabilities:[
   {type:'armament',status:'unclear',note:'채택 근거에서 직접 사용 확인되지 않음. 비보유 확정 아님, Raw0.'},
   {type:'observation',status:'unclear',note:'추격을 견문색으로 역산하지 않음. Raw0.'},
   {type:'conquerors',status:'unclear',note:'패왕색·패휘감 미확인, Raw0.',infusion:{status:'unclear',note:'패휘감 미확인.'}},
  ]},
  sources:[
   {label:'ONE PIECE.com 마젤란 공식 소개',reference:'https://one-piece.com/character/Magellan/index.html'},
   {label:'ONE PIECE.com 임펠다운 편 공식 개요',reference:'https://one-piece.com/story/impel_down/index.html'},
   {label:'ONE PIECE.com 공식 TV 줄거리 436~452화',reference:'https://one-piece.com/anime/448/index.html'},
  ]
 }
}
export const v0420MagellanMembership:CharacterMembership={
 characterId:'magellan',groupId:'impel-down',role:'부서장 (임펠다운 편 당시 서장)',
 status:'current',period:'임펠다운 편 당시 서장 / 현재 공식 인물 소개에서 부서장'
}
export const v0420MagellanBattles:Battle[]=[
 {id:'battle-v0420-magellan-luffy',title:'임펠다운 LV4 — 루피와 첫 전투',chronologyOrder:620,
  combatStructure:'1v1',combatPurpose:'침입자 루피 제압',combatIntent:'unknown',
  environment:'임펠다운 LV4',restrictions:'루피는 독을 감수해 타격했고 이후 치명적 중독 상태가 됨.',
  externalFactors:'접촉 독의 제약과 루피의 에이스 구출 목적',result:'victory',participantIds:[]},
 {id:'battle-v0420-magellan-blackbeard',title:'임펠다운 — 당시 검은수염 일행 제압',chronologyOrder:625,
  combatStructure:'one-vs-multiple',combatPurpose:'검은수염 일행의 침입 저지',combatIntent:'unknown',
  environment:'임펠다운',restrictions:'흔들흔들 열매 획득 이전 티치 일행에 대한 독 공격. 정면 장기 결투는 아님.',
  externalFactors:'시류의 사후 해독제 제공으로 생존. 현재 사황 전력과 동일시 불가.',result:'victory',participantIds:[]},
 {id:'battle-v0420-magellan-pursuit',title:'임펠다운 — 이완코프 대치와 탈옥조 추격',chronologyOrder:630,
  combatStructure:'one-vs-multiple',combatPurpose:'탈옥조 추격과 진로 차단',combatIntent:'unknown',
  environment:'임펠다운 통로·계단',restrictions:'탈옥조의 목표는 마젤란 격파가 아니라 탈출과 에이스 구출.',
  externalFactors:'이완코프의 저지, 이나즈마의 통로 절단, 집단 탈출의 협동',result:'unknown',participantIds:[]},
 {id:'battle-v0420-magellan-wax',title:'임펠다운 출구 — 밀랍 대응과 독의 거병',chronologyOrder:635,
  combatStructure:'multiple-vs-multiple',combatPurpose:'탈옥자 최종 차단',combatIntent:'unknown',
  environment:'임펠다운 출입구',restrictions:'Mr.3의 밀랍 방벽으로 히드라를 막는 데 성공했고 루피의 유효 타격도 존재.',
  externalFactors:'Mr.3·루피 및 탈옥자들의 공동 대응',result:'interrupted',participantIds:[]},
]
type Obs={key:string;battle:string;ep:number;fact:string;roles:Partial<Record<CombatStat,'primary'|'secondary'|'context'>>;interpretation:string;uncertainty:string}
const obs:Obs[]=[
 {key:'luffy',battle:'luffy',ep:437,
  fact:'마젤란의 독에 중독된 루피가 죽음에 가까운 중상을 입고 LV5에 수감됐다.',
  roles:{attack:'primary',techniqueMastery:'secondary',defense:'context'},
  interpretation:'실제 상대를 전투 불능으로 만든 독의 Attack 성과. 신체 완력과 혼동하지 않음.',
  uncertainty:'루피 당시의 독 대처 한계·전투 목적을 고려하며 다른 상대에도 무조건 통한다고 일반화하지 않는다.'},
 {key:'counter',battle:'luffy',ep:436,
  fact:'루피는 독으로 주먹이 오염될 것을 감수하며 마젤란을 직접 타격해 무릎 꿇게 했다.',
  roles:{defense:'primary',stamina:'context'},
  interpretation:'접근 억제와 별도로 실제 방어·내구성의 한계를 확인한다.',
  uncertainty:'한 번의 피격을 장기전 체력이나 일률적 방어력으로 역산하지 않는다.'},
 {key:'blackbeard',battle:'blackbeard',ep:448,
  fact:'마젤란이 당시 검은수염 티치와 동료들을 독으로 일망타진했다. TV452 공식 줄거리는 시류의 해독제로 생존했다고 설명한다.',
  roles:{attack:'primary',techniqueMastery:'secondary',versatility:'secondary'},
  interpretation:'강자와 복수 대상을 실제 전투 불능으로 만든 높은 실효 제압력의 핵심 근거.',
  uncertainty:'흔들흔들 열매 이전 티치이며 짧은 독 중독 실적을 무조건적인 정면 결투 우위로 보지 않는다.'},
 {key:'pursuit',battle:'pursuit',ep:448,
  fact:'검은수염 일행 제압 후 마젤란이 전속력으로 루피를 추격하고 이완코프가 단독 저지를 시도했다.',
  roles:{speed:'secondary',stamina:'secondary',combatIQ:'secondary'},
  interpretation:'빠른 추격과 임무 우선순위 판단을 인정하되 독립 장기전 피로 및 최고속 비교와 구별.',
  uncertainty:'탈옥조의 도주 목적과 이완코프의 지연전, 구체적 속도·지속시간 정보 부족.'},
 {key:'wax',battle:'wax',ep:449,
  fact:'마젤란이 탈옥조를 따라잡았으나 Mr.3가 만든 두꺼운 밀랍 벽이 히드라의 독을 차단했다.',
  roles:{defense:'primary',combatIQ:'secondary',versatility:'secondary'},
  interpretation:'독을 통한 공격·접근 억제와 밀랍에 대한 명백한 제한을 동시에 기록한다.',
  uncertainty:'밀랍의 성공을 모든 형태의 독 완전 무력화로 일반화하지 않는다.'},
 {key:'demon',battle:'wax',ep:450,
  fact:'마젤란은 금지 기술 독의 거병을 사용했고 루피 역시 직접 공격에 성공했다.',
  roles:{techniqueMastery:'primary',versatility:'primary',attack:'secondary',defense:'context'},
  interpretation:'독을 다른 형태로 운용한 숙련과 광역·근접·봉쇄 역할 폭을 구분해 평가한다.',
  uncertainty:'공식 애니 줄거리로는 독의 거병의 모든 파생 효과·독립 최종 승부가 검증되지 않는다.'},
]
export const v0420MagellanEvidence:Evidence[]=obs.map(o=>({
 id:'evidence-v0420-magellan-'+o.key,
 battleId:'battle-v0420-magellan-'+o.battle,subjectCharacterId:'magellan',
 source:{type:'supplementary',reference:'ONE PIECE.com TV'+o.ep,description:'https://one-piece.com/anime/'+o.ep+'/index.html'},
 evidenceStrength:'moderate',fact:o.fact,supportedAbilities:['독독 열매','히드라','독의 거병'],
 statContributions:Object.entries(o.roles).map(([stat,role])=>({stat:stat as CombatStat,role:role!,note:o.interpretation+' '+o.uncertainty})),
 interpretation:o.interpretation,evaluationImpact:'사용자 승인 마젤란 7축 잠정 평가의 관련 축 정성 근거. 별도 자동 점수 가산 없음.',
 uncertainty:o.uncertainty,
}))
const scores=[92,83,82,80,91,83,91] as const
const rationales=[
 '루피를 치명적 중독 상태로 만들고 당시 칠무해 티치와 동료들을 일망타진했다. 시류 해독제로 생존한 조건을 보존하여 Attack92. 독의 실효 제압력이지 최고 물리 파괴력이라는 뜻은 아니다.',
 '독 접촉과 히드라의 위협이 공격 경로를 제한하지만 루피 직접 타격과 Mr.3 밀랍 방벽에 무력화된 상황도 고려한 Defense83. 접근 억제를 무적 내구성으로 환산하지 않는다.',
 '연속적인 침입자 제압·탈옥조 추격을 지속했으나 장기 고강도 단독 전투 시간·피로 표본은 부족하다. Stamina82 E3 잠정.',
 '탈옥조를 전속력으로 추격해 따라잡는 성과가 있으나 절대 이동 속도·고속 반응 직접 표본은 부족해 Speed80 E3 잠정.',
 '히드라와 독의 거병 등 독의 형태·투사 운용을 실전에서 전환했다. 제압 결과를 중복 계산하지 않고 기술 제어의 Technique91.',
 '침입자 제압에서 탈출 차단으로 우선순위를 전환하고 추격했으나 감옥 구조와 지원의 유리함을 개인 전술로 모두 귀속하지 않는다. CombatIQ83 E3.',
 '접촉 중독·원거리 독룡·광역 제압·경로 봉쇄·독의 거병 등 역할의 폭이 크다. 같은 독의 기술 이름 개수나 피해량을 반복 가산하지 않고 Versatility91.',
] as const
const refs:Record<CombatStat,string[]>={
 attack:['luffy','blackbeard','demon'],defense:['counter','wax'],stamina:['pursuit','counter'],
 speed:['pursuit'],techniqueMastery:['demon','blackbeard','luffy'],combatIQ:['pursuit','wax'],versatility:['demon','wax','blackbeard'],
}
export const v0420MagellanEvaluation:Evaluation={
 id:'evaluation-v0420-magellan',characterId:'magellan',
 evaluationDataVersion:'evaluation-v0.4.20-magellan-impel-down-approved-provisional',
 status:'draft',isDefault:true,
 subjectState:{id:'impel-down',label:'임펠다운 편 (잠정 평가)',note:'사용자 승인 7축 92/83/82/80/91/83/91 = Overall86.00. TV 공식 요약 자료이며 원작 컷 직접 정밀감사 전. 패기 Raw0.'},
 items:COMBAT_STATS.map((stat,i)=>{
  const readiness:EvidenceReadiness=(['defense','stamina','speed','combatIQ'] as CombatStat[]).includes(stat)?'E3':'E2'
  const item={stat,baseScore:scores[i],score:scores[i],rationale:rationales[i],evidenceIds:refs[stat].map(id=>'evidence-v0420-magellan-'+id),hakiContributions:[],readiness}
  return {...item,score:getFinalStatScore(item)}
 }),
}
