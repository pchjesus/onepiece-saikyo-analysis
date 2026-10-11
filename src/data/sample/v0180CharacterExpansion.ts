import type { Character, CharacterMembership, Group } from '../../domain/character/types'
import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation, CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

type Scene={key:string;ep:string;url:string;title:string;fact:string;purpose:string;context:string;uncertainty:string;roles:Partial<Record<CombatStat,'primary'|'secondary'|'context'>>}
type Seed={id:string;name:string;group:string;role:string;profile:string;styles:string[];fruit:string;fruitNote:string;scores:number[];read:EvidenceReadiness[];notes:string[];haki:['confirmed'|'unclear'|'not-confirmed','confirmed'|'unclear'|'not-confirmed','confirmed'|'unclear'|'not-confirmed'];scenes:Scene[]}
const seeds:Seed[]=[
  {
    id:'smoker',name:'스모커',group:'g5',role:'해군 G-5 지부 중장',
    profile:'https://one-piece.com/character/Smoker/index.html',
    styles:['연기 자연계','해루석 끝봉','근접 봉술·체술','연기 비행·구속'],
    fruit:'자연계 뭉게뭉게 열매',
    fruitNote:'연기를 생성·변형하고 신체를 연기화하여 이동·구속에 활용. 패기 사용자와 해루석, 상성·전투 환경의 제한이 있다.',
    scores:[74,73,78,76,78,76,80],read:['E2','E2','E2','E2','E2','E2','E2'],
    notes:[
      '해루석 끝봉과 연기 구속·타격을 결합해 해적을 제압했지만, 로우·베르고·도플라밍고 같은 강적에게 승리한 직접 결정타는 확인되지 않는다. Attack74는 직급이 아닌 실제 공방에 따른 잠정값이다.',
      '연기 자연계의 물리 공격 회피는 강점이나 무장색 공격에는 피격된다. 펑크 하자드의 강적과 교전해 피해를 입었고 무적 방어로 취급하지 않는다.',
      '로그타운·알라바스타 이후 장기간 활동하며 펑크 하자드에서 로우·베르고·도플라밍고를 상대했지만 연속 전투의 피로·개입 조건이 분명하다.',
      '연기화 이동과 비행·봉술 전환은 확인되지만 상대를 추적하는 속도와 상위급 근접 반응 최고속은 구분한다.',
      '연기 구속·범위 제어·봉술·해루석 무기와 패기 활용을 조합한다. 무기와 열매의 동시 사용을 숙련 근거로 보되 승률로 직접 환산하지 않는다.',
      '베르고와 교전 중 로우의 심장 회수에 도움을 준 목적이 있었다. 결과만으로 지능 열세를 확정하지 않고 실제 전술 의도를 분리한다.',
      '연기 확산·이동·구속·은폐·해루석 봉의 능력자 대응까지 다른 역할을 수행한다. 자연계 한 체계 파생과 외부 무기의 조건을 구분해 Versatility80으로 잠정 평가한다.',
    ],
    haki:['confirmed','confirmed','not-confirmed'],
    scenes:[
      {key:'ace',ep:'95',url:'https://one-piece.com/anime/95/index.html',title:'알라바스타 — 에이스의 견제',fact:'스모커는 루피를 추적하던 중 에이스의 불꽃과 연기가 대치해 추격이 저지됐다.',purpose:'루피 체포와 추적',context:'에이스의 목적은 루피의 탈출 지원이며 장기 결투나 명백한 우열 결정이 아니다.',uncertainty:'자연계 상성과 임무 목적을 무시하고 승패를 환산하지 않는다.',roles:{attack:'context',defense:'secondary',versatility:'secondary'}},
      {key:'law',ep:'587',url:'https://one-piece.com/anime/587/index.html',title:'펑크 하자드 — 로우와 대결',fact:'스모커는 로우의 수술실 능력과 충돌했고 심장을 빼앗겨 제압됐다.',purpose:'펑크 하자드 수사·추적',context:'로우의 공간 능력과 심장 탈취가 결정적 상성으로 작용했다.',uncertainty:'특수 능력 제압을 모든 비능력자 상대 순수 방어 수치로 일반화하지 않는다.',roles:{attack:'secondary',defense:'primary',speed:'secondary',techniqueMastery:'secondary'}},
      {key:'vergo',ep:'616',url:'https://one-piece.com/anime/616/index.html',title:'펑크 하자드 — 베르고와 격돌',fact:'스모커는 무장색을 사용하는 베르고와 격돌하며 로우의 심장 회수에 기여했다.',purpose:'베르고를 저지하고 로우가 심장을 되찾도록 지원',context:'독립적인 상대 제압만을 목적으로 한 결투가 아니라 심장 회수라는 임무가 포함됐다.',uncertainty:'피격·패배 장면을 임무 수행의 성과나 순수 전투력 한계로 단순 환산하지 않는다.',roles:{attack:'primary',defense:'primary',stamina:'primary',techniqueMastery:'primary',combatIQ:'primary',versatility:'secondary'}},
    ],
  },
  {
    id:'ivankov',name:'엠포리오 이완코프',group:'revolutionary-army',role:'혁명군 간부 / 카마밧카 왕국의 여왕',
    profile:'https://one-piece.com/character/Emporio_Ivankov/index.html',
    styles:['호르몬 주입·신체 조절','뉴커머 권법','데스 윙크·헬 윙크','아군 응급 강화·치료 지원'],
    fruit:'초인계 호르호르 열매',
    fruitNote:'호르몬을 조절해 생체 변화와 응급 지원을 유도하지만 체력 소모와 효과의 반동이 있으며 즉시 무조건 회복을 보장하지 않는다.',
    scores:[77,74,82,77,81,79,86],read:['E2','E3','E2','E3','E2','E2','E2'],
    notes:[
      '데스 윙크·헬 윙크의 범위 충격과 근접 기술은 실제 전투 공격 수단이다. 쿠마·마젤란과의 상황에서 강자 상대 결정타가 반복 입증되지는 않아 Attack77 잠정.',
      '신체 변화·얼굴 크기 조절·호르몬 조작은 생존과 대응에 유리하나 마젤란 독의 직접 공격을 완전히 무력화하지 못했다. Defense74는 불확실성이 큰 E3.',
      '임펠다운 탈출 과정에서 격투·동료 지원·이동을 이어갔고 호르몬 강화는 대가·소모를 수반한다. 무제한 회복이나 지구력으로 계산하지 않는다.',
      '몸과 얼굴의 형태를 바꾸며 공격하지만 상위급 직접 이동속도·회피의 비교 표본이 적어 Speed77(E3) 잠정.',
      '호르몬 주사·성별 전환·치유 보조·대형 얼굴·뉴커머 권법·윈크 기술의 조합을 능숙하게 사용한다. 모든 대상에게 동일한 치료 결과를 보장하는 것은 아니다.',
      '루피의 생존·탈옥을 지원하고 부하를 지휘하며 위험과 반동을 설명하는 판단을 보여준다. 전체 조직 운영을 순수 1대1 전투 지능으로 과대 환산하지 않는다.',
      '직접 공격·범위 견제·신체 조절·아군 호르몬 강화·생존 지원·침투 등 역할 폭이 넓다. 다른 능력과 독립된 도구가 아니라 호르몬 열매와 권법의 복합 활용이므로 Versatility86(E2) 잠정.',
    ],
    haki:['unclear','unclear','not-confirmed'],
    scenes:[
      {key:'luffy',ep:'438',url:'https://one-piece.com/anime/438/index.html',title:'임펠다운 — 루피 응급 호르몬 치료',fact:'이완코프는 독에 중독된 루피에게 치유 호르몬을 투여했으며 회복 과정에 심각한 고통과 위험이 따랐다.',purpose:'루피의 생존 지원',context:'전투 중 공격이 아니라 비전투 치료·지원 장면이다.',uncertainty:'치유 성과를 1대1 공격력이나 개인 불사·무한 지구력으로 합산하지 않는다.',roles:{stamina:'context',techniqueMastery:'primary',combatIQ:'secondary',versatility:'primary'}},
      {key:'magellan',ep:'443',url:'https://one-piece.com/anime/443/index.html',title:'임펠다운 — 마젤란 저지',fact:'이완코프는 마젤란을 저지하려 윈크·권법을 사용했지만 독 능력 앞에서 제압당했다.',purpose:'루피 일행의 탈출 시간을 벌기 위한 저지',context:'독 능력의 특수 상성과 동료 탈출 지원 임무를 고려해야 한다.',uncertainty:'패배 결과를 모든 비독 상대 1대1 열세로 단정하지 않는다.',roles:{attack:'primary',defense:'primary',stamina:'secondary',techniqueMastery:'secondary',combatIQ:'secondary',versatility:'secondary'}},
      {key:'kuma',ep:'461',url:'https://one-piece.com/anime/461/index.html',title:'마린포드 — 쿠마와 충돌',fact:'이완코프는 정상결전에서 과거 인연이 있는 쿠마와 충돌하며 대형 얼굴과 윈크 공격을 사용했다.',purpose:'정상결전 참여와 쿠마의 변화 확인',context:'전장 혼전·쿠마의 인격 변화·다수 개입 가능성을 구분한다.',uncertainty:'쿠마를 상대로 확정 승리하거나 최대 출력으로 장기 결투했다고 단정하지 않는다.',roles:{attack:'primary',speed:'secondary',techniqueMastery:'primary',combatIQ:'context',versatility:'primary'}},
    ],
  },
]
const axes:CombatStat[]=['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility']
export const v0180Groups:Group[]=[
  {id:'g5',name:'해군 G-5',type:'marine',parentGroupId:'marines',description:'해군 G-5 지부. 해군 본부 소속과 하위 부대 분류를 동시에 유지.'},
  {id:'newkama-land',name:'뉴커머 랜드',type:'other',parentGroupId:'impel-down',description:'임펠다운 내부에 형성된 뉴커머들의 비밀 거점. 현재 혁명군과 동일한 공식 조직이라고 보지 않는다.'},
]
export const v0180Memberships:CharacterMembership[]=[
  {characterId:'smoker',groupId:'marines',role:'중장',status:'current'},
  {characterId:'smoker',groupId:'g5',role:'지부 지휘관',status:'current',period:'펑크 하자드 이후 G-5 소속'},
  {characterId:'ivankov',groupId:'revolutionary-army',role:'간부 / 그랜드라인군 군대장',status:'current'},
  {characterId:'ivankov',groupId:'newkama-land',role:'뉴커머 랜드의 지도자',status:'historical',period:'임펠다운 탈옥 이전'},
]
export const v0180Characters:Character[]=seeds.map(s=>({
  id:s.id,name:s.name,crewId:s.group,knownAs:[],description:`${s.name} — ${s.role}. 공식 프로필과 애니 시놉시스 교차검증에 기초한 7축 잠정 평가.`,
  combatProfile:{
    combatStyles:s.styles,
    specialTraits:[{id:`special-v0180-${s.id}`,category:'devil-fruit',name:s.fruit,status:'confirmed',
      description:s.fruitNote,evidenceIds:s.scenes.map(e=>`evidence-v0180-${s.id}-${e.key}`),
      limitations:'능력과 별개로 패기·해루석·상성·신체 소모·전투 조건을 고려한다.',
      uncertainty:'원작 전체 만화 컷을 직접 새로 판독하지 않았으며 애니 공식 요약을 supplementary로 연결했다.'}],
    haki:{characterId:s.id,capabilities:(['armament','observation','conquerors'] as const).map((type,i)=>({
      type,status:s.haki[i],
      note:s.haki[i]==='confirmed'?'보유 확인과 개별 스탯 Raw 추가를 구분한다. 현재 독립적인 예외 Raw 가산은 0.':'이 평가의 공식 애니 보조 자료로는 패기 보유 및 독립 Raw 가산을 확정할 수 없다.',
      ...(type==='conquerors'?{infusion:{status:'not-confirmed' as const,note:'패휘감 확인 없음.'}}:{}),
    }))},
    sources:[{label:'ONE PIECE.com 공식 캐릭터',reference:s.profile},...s.scenes.map(e=>({label:`ONE PIECE.com 공식 애니 ${e.ep}화`,reference:e.url}))],
  },
}))
export const v0180Battles:Battle[]=seeds.flatMap((s,si)=>s.scenes.map((e,i)=>({
  id:`battle-v0180-${s.id}-${e.key}`,title:`${s.name} — ${e.title}`,chronologyOrder:750+si*10+i,
  combatStructure:'multiple-vs-multiple',combatPurpose:e.purpose,combatIntent:'unknown',
  environment:e.title,restrictions:e.context,externalFactors:e.uncertainty,
  result:'unknown',participantIds:[],
})))
export const v0180Evidence:Evidence[]=seeds.flatMap(s=>s.scenes.map(e=>({
  id:`evidence-v0180-${s.id}-${e.key}`,battleId:`battle-v0180-${s.id}-${e.key}`,subjectCharacterId:s.id,
  source:{type:'supplementary',reference:`ONE PIECE.com TV${e.ep}`,description:e.url},
  evidenceStrength:'moderate',fact:e.fact,supportedAbilities:s.styles,
  statContributions:Object.entries(e.roles).map(([stat,role])=>({stat:stat as CombatStat,role:role!,
    note:`${e.context} | ${stat} 근거. 결과·다인전·상성의 영향을 분리한다.`})),
  interpretation:e.context,evaluationImpact:'v0.1.80 7축 잠정 평가에 사용. 직접 확인한 만화 전 컷이나 승률로 해석하지 않는다.',
  uncertainty:e.uncertainty,
})))
export const v0180Evaluations:Evaluation[]=seeds.map(s=>({
  id:`evaluation-v0180-${s.id}`,characterId:s.id,evaluationDataVersion:'evaluation-0.1.80-two-character-expansion-draft',status:'draft',
  items:axes.map((stat,i)=>{
    const item={stat,baseScore:s.scores[i],score:s.scores[i],rationale:s.notes[i],
      evidenceIds:s.scenes.filter(e=>e.roles[stat]).map(e=>`evidence-v0180-${s.id}-${e.key}`),
      hakiContributions:[],readiness:s.read[i]}
    return {...item,score:getFinalStatScore(item)}
  }),
}))
