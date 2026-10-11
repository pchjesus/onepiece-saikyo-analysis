import type { Character, CharacterMembership, Group } from '../../domain/character/types'
import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation, CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

type Scene={key:string;ep:string;url:string;title:string;fact:string;purpose:string;context:string;uncertainty:string;roles:Partial<Record<CombatStat,'primary'|'secondary'|'context'>>}
type Seed={id:string;name:string;group:string;role:string;profile:string;styles:string[];fruit:string|null;fruitNote:string;scores:number[];read:EvidenceReadiness[];notes:string[];haki:['confirmed'|'unclear'|'not-confirmed','confirmed'|'unclear'|'not-confirmed','confirmed'|'unclear'|'not-confirmed'];scenes:Scene[]}
const seeds:Seed[]=[
  {
    id:'smoker',name:'스모커',group:'marines',role:'해군 중장 (G-5 지부 근무 이력)',
    profile:'https://one-piece.com/character/smoker/index.html',
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

  {
    id:'tashigi',name:'타시기',group:'marines',role:'해군 대령 / 검사',
    profile:'https://one-piece.com/character/tashigi/index.html',
    styles:['일도류 검술','명검 식별·운용','해군 검술 지원'],
    fruit:null,fruitNote:'악마의 열매 능력이 공식 프로필에 기재되어 있지 않다.',
    scores:[67,64,69,67,72,67,68],read:['E3','E2','E3','E3','E2','E3','E3'],
    notes:[
      '검을 쓰는 해군 장교로 모네를 상대한 기록이 있으나, 결정적인 우위는 조로의 개입 상황에서 발생한다. 강자 직접 결정타가 부족해 Attack67(E3)을 잠정 배치한다.',
      '모네의 동물 형태 공격에 어깨를 물렸고 조로의 결정적 검격이 개입했다. 실제 피격을 무시하지 않고 Defense64(E2)로 둔다.',
      '펑크 하자드에서 동료 보호와 모네 제지에 계속 참여했지만 여러 시간의 독립 고강도 근접전 표본은 없으므로 Stamina69(E3) 잠정.',
      '검술로 적을 제지하려 했지만 상위 검객과의 반응 비교가 부족하다. Speed67(E3)은 공식 절대 수치가 아니다.',
      '검을 다루는 지속적인 전문성을 확인하나 조로의 기술을 자신의 숙련으로 이식하지 않는다. Technique72(E2) 잠정.',
      '모네를 상대로 뒤로 물러나지 않는 임무 의지는 확인되지만 냉정한 사전 함정 파악·대전술 실적과 구분한다. Combat IQ67(E3) 잠정.',
      '검술과 해군 보호 임무를 수행하나 별도의 장거리/광역/지원 특수 메커니즘은 공식 전투 기록에 충분히 없다. Versatility68(E3) 잠정.',
    ],
    haki:['unclear','unclear','not-confirmed'],
    scenes:[
      {key:'monet-arrival',ep:'612',url:'https://one-piece.com/anime/612/index.html',
        title:'펑크 하자드 — 모네 공격 중 해군 난입',
        fact:'모네가 설인 형태로 상대를 압박하던 현장에 타시기와 해군들이 난입했고, 조로가 밀짚모자 일당의 이동을 돕기 위해 모네를 제지했다.',
        purpose:'해군의 작전 수행 및 모네 저지',
        context:'타시기가 독자적으로 모네의 방어를 관통하거나 처치했다는 장면은 아니다.',
        uncertainty:'실제 주도권과 장면별 공격 적중 정도는 공식 애니 줄거리만으로 세밀하게 확정하기 어렵다.',
        roles:{attack:'context',speed:'context',techniqueMastery:'secondary',combatIQ:'context'}},
      {key:'monet-bite',ep:'613',url:'https://one-piece.com/anime/613/index.html',
        title:'펑크 하자드 — 모네의 어깨 물기와 조로 개입',
        fact:'타시기는 모네를 막기 위해 현장에 남았지만 모네에게 어깨를 물렸으며, 그 뒤 조로가 강력한 검격을 사용했다.',
        purpose:'모네의 위협 차단과 아군 보호',
        context:'조로의 강한 공격은 타시기 자신의 Attack 증거가 아니다. 타시기의 피격과 전투 의지를 별도로 본다.',
        uncertainty:'조로가 모네를 벤 성과를 타시기의 독립 승리로 중복 가산하지 않는다.',
        roles:{defense:'primary',stamina:'secondary',techniqueMastery:'secondary',combatIQ:'secondary',versatility:'context'}},
    ],
  },
  {
    id:'inazuma',name:'이나즈마',group:'revolutionary-army',role:'혁명군 그랜드라인군 부군대장',
    profile:'https://one-piece.com/character/Inazuma/index.html',
    styles:['싹둑싹둑 열매 물체 절단','절단한 지형의 종이형 변형','탈출·이동 경로 창출'],
    fruit:'초인계 싹둑싹둑 열매',
    fruitNote:'절단 가능한 사물을 종이처럼 다루어 지형·통로를 바꾼다. 이것이 모든 강적의 패기 방어를 뚫는다는 보장은 없다.',
    scores:[71,67,70,70,76,74,80],read:['E3','E3','E3','E3','E2','E2','E2'],
    notes:[
      '싹둑싹둑 열매로 계단·지형을 절단할 수 있지만 강한 무장색을 두른 전투원에게 같은 절단이 가능하다는 근거는 없다. Attack71(E3) 잠정.',
      '지형을 절단하고 후퇴로를 제어하는 간접 방어가 있으나 강적의 직접 타격·회피 기록은 적어 Defense67(E3) 잠정.',
      '탈옥·마린포드 지원에 참여했지만 본체가 장시간 직접 피격을 견딘 자료는 제한적이다. Stamina70(E3) 잠정.',
      '전장 내 지형 변화·이동 보조 능력을 순수 개인 이동 반응 최고속으로 오해하지 않는다. Speed70(E3) 잠정.',
      '계단을 가위처럼 절단하고 지형을 재구성해 후퇴로를 봉쇄한 실전 제어는 능력 사용 숙련의 직접 근거. Technique76(E2) 잠정.',
      '이완코프의 지시에 맞춰 실제 후퇴 경로를 절단한 협동 전술의 실행을 확인하나 독립 지휘 전체의 공은 전가하지 않는다. Combat IQ74(E2) 잠정.',
      '절단, 도주로 확보·차단, 전장 지형 가공과 아군 지원은 서로 다른 목적에 능력을 적용한 사례다. Versatility80(E2) 잠정.',
    ],
    haki:['unclear','unclear','not-confirmed'],
    scenes:[
      {key:'stairs',ep:'448',url:'https://one-piece.com/anime/448/index.html',
        title:'임펠다운 — 계단 절단으로 마젤란 추격로 차단',
        fact:'이완코프의 지시에 따라 이나즈마가 계단을 가위로 잘라 퇴로를 끊었고, 이완코프는 홀로 마젤란을 저지하려 했다.',
        purpose:'루피 일행의 탈출과 추격 지연',
        context:'지형 제어·임무 협업은 확인되지만 마젤란에게 직접 필살기를 적중시킨 1대1 결투는 아니다.',
        uncertainty:'이완코프의 판단 및 지시와 이나즈마의 능력 수행을 각각 분리해야 한다.',
        roles:{attack:'context',defense:'secondary',techniqueMastery:'primary',combatIQ:'primary',versatility:'primary'}},
      {key:'luffy-support',ep:'448',url:'https://one-piece.com/story/impel_down/index.html',
        title:'임펠다운 — 탈옥을 돕는 혁명군의 전장 지원',
        fact:'이나즈마가 독에 쓰러진 루피와 본 클레이를 발견하고 뉴커머 랜드에서 치료받게 된 사건과, 탈출 작전 중 이완코프를 보조하는 행동이 공식 임펠다운 편 줄거리에 서술된다.',
        purpose:'동료 구조와 탈옥 작전 지원',
        context:'이동·구출의 전투 목적을 보여주지만 직접 강자 대인 피해나 반복적인 최고 화력을 입증하지 않는다.',
        uncertainty:'같은 임펠다운 탈출 작전의 연결된 서사이므로 별도의 고강도 결투 표본으로 중복 계산하지 않는다.',
        roles:{stamina:'secondary',speed:'context',combatIQ:'secondary',versatility:'primary'}},
    ],
  },
]
const axes:CombatStat[]=['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility']
/** v0.1.80 user decision: no new selectable groups; affiliations use canonical Marines and Revolutionary Army. */
export const v0180Groups:Group[]=[]
export const v0180Memberships:CharacterMembership[]=seeds.map(s=>({
  characterId:s.id,groupId:s.group,role:s.role,status:'current' as const,
}))
export const v0180Characters:Character[]=seeds.map(s=>({
  id:s.id,name:s.name,crewId:s.group,knownAs:[],description:`${s.name} — ${s.role}. 공식 프로필과 애니 시놉시스 교차검증에 기초한 7축 잠정 평가.`,
  combatProfile:{
    combatStyles:s.styles,
    specialTraits:s.fruit?[{id:`special-v0180-${s.id}`,category:'devil-fruit',name:s.fruit,status:'confirmed',
      description:s.fruitNote,evidenceIds:s.scenes.map(e=>`evidence-v0180-${s.id}-${e.key}`),
      limitations:'능력과 별개로 패기·해루석·상성·신체 소모·전투 조건을 고려한다.',
      uncertainty:'원작 전체 만화 컷을 직접 새로 판독하지 않았으며 애니 공식 요약을 supplementary로 연결했다.'}]:[],
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
  source:{type:'supplementary',reference:e.url.includes('/story/')?'ONE PIECE.com official Impel Down story':`ONE PIECE.com TV${e.ep}`,description:e.url},
  evidenceStrength:'moderate',fact:e.fact,supportedAbilities:s.styles,
  statContributions:Object.entries(e.roles).map(([stat,role])=>({stat:stat as CombatStat,role:role!,
    note:`${e.context} | ${stat} 근거. 결과·다인전·상성의 영향을 분리한다.`})),
  interpretation:e.context,evaluationImpact:'v0.1.80 7축 잠정 평가에 사용. 직접 확인한 만화 전 컷이나 승률로 해석하지 않는다.',
  uncertainty:e.uncertainty,
})))
export const v0180Evaluations:Evaluation[]=seeds.map(s=>({
  id:`evaluation-v0180-${s.id}`,characterId:s.id,evaluationDataVersion:'evaluation-0.1.80-four-character-two-organization-draft',status:'draft',
  items:axes.map((stat,i)=>{
    const item={stat,baseScore:s.scores[i],score:s.scores[i],rationale:s.notes[i],
      evidenceIds:s.scenes.filter(e=>e.roles[stat]).map(e=>`evidence-v0180-${s.id}-${e.key}`),
      hakiContributions:[],readiness:s.read[i]}
    return {...item,score:getFinalStatScore(item)}
  }),
}))
