import type { Group, Character, CharacterMembership } from '../../domain/character/types'
import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation, CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'

/**
 * v0.1.80 additive roster. Official character profiles and TV episode
 * synopses are supplementary, not claimed as firsthand manga panel reviews.
 * All scores are provisional independent 0–100 interpretations, no Haki Raw
 * without a validated combat application.
 */
export const v0180Groups: Group[] = [
  { id:'g5-marines',name:'해군 G-5 지부',type:'marine',parentGroupId:'marines',description:'G-5 기지·01부대의 스모커 및 타시기. 해군 본부와의 소속 관계는 동일 인물의 다중 Membership으로 보존.' },
  { id:'kamabakka-kingdom',name:'카마바카 왕국',type:'revolutionary',parentGroupId:'revolutionary-army',description:'이완코브가 통치한 왕국이자 혁명군의 거점. 혁명군 소속과 겹쳐도 동일 캐릭터는 순위에 한 번만 포함.' },
]

const source=(reference:string)=>({label:'ONE PIECE.com 공식 프로필',reference})
const note=(status:'unclear'|'not-confirmed'|'confirmed',description:string)=>({status,note:description})
export const v0180Characters:Character[]=[
  {
    id:'smoker',name:'스모커',crewId:'marines',
    knownAs:[{kind:'epithet',name:'하얀 사냥꾼 스모커',source:source('https://one-piece.com/character/smoker/index.html')}],
    description:'해군 G-5 지부 01부대장인 중장. 뭉게뭉게 열매로 연기를 만들고 조종한다. 로와의 대결, 베르고와의 협력 목적 교전 등 전투 조건을 구분해 잠정 평가한다.',
    combatProfile:{
      combatStyles:['연기 신체 변형·포박','근접 육탄전','십수(짓테) 운용'],
      specialTraits:[{id:'special-v0180-smoker-smoke',category:'devil-fruit',name:'자연계 뭉게뭉게 열매',status:'confirmed',description:'연기를 통한 신체 변형과 포박·이동을 수행한다.',evidenceIds:['evidence-v0180-smoker-law-tv587'],limitations:'연기 변형을 이용한 몸의 확대·노출은 패기 사용자 상대로 피격 범위를 늘릴 수 있다. 로의 오페오페 능력과 베르고의 패기 교전을 별도 조건으로 본다.'},
        {id:'special-v0180-smoker-jitte',category:'equipment',name:'해루석 짓테',status:'confirmed',description:'대인 포박과 타격용 무기를 운용한다.',evidenceIds:['evidence-v0180-smoker-law-tv587'],limitations:'해루석 무기의 존재만으로 모든 자연계·상위 패기 상대 자동 승리를 뜻하지 않는다.'}],
      haki:{characterId:'smoker',capabilities:[{type:'armament',...note('confirmed','베르고 등 무장색 사용자와 공방을 수행한 사실은 인정하되, 구체적 강화량은 이 공식 요약만으로 미확정.')},{type:'observation',...note('unclear','견문색의 특정 고급 적용 증거를 이번 공식 요약만으로 확인할 수 없다.')},{type:'conquerors',...note('not-confirmed','패왕색 보유 공식 확인 없음.')} ]},
      sources:[source('https://one-piece.com/character/smoker/index.html'),{label:'공식 TV587·588·616',reference:'https://one-piece.com/anime/587/index.html · https://one-piece.com/anime/588/index.html · https://one-piece.com/anime/616/index.html'}],
    },
  },
  {
    id:'tashigi',name:'타시기',crewId:'marines',knownAs:[],
    description:'스모커의 부관으로 해군 G-5 소속 대령. 검술로 싸우며 펑크 하자드에서 로와 모네를 상대했으나 결정적인 전투 성과에는 타인 개입이 있었다.',
    combatProfile:{
      combatStyles:['일도류 검술','근접 검격','부대 호위'],
      specialTraits:[{id:'special-v0180-tashigi-sword',category:'equipment',name:'검술용 일본도',status:'confirmed',description:'실제 검을 사용해 교전한다.',evidenceIds:['evidence-v0180-tashigi-monet-tv613'],limitations:'모네를 제압한 최종 전과를 타시기 단독 능력치로 귀속하지 않는다.'}],
      haki:{characterId:'tashigi',capabilities:[{type:'armament',...note('unclear','현재 참조한 공식 애니 요약만으로 개별 무장색 실전 적용의 세부 위력이 불명확.')},{type:'observation',...note('unclear','직접 입증한 견문색 성능·범위를 이번 자료에서 확인하지 못함.')},{type:'conquerors',...note('not-confirmed','패왕색 확인 없음.')} ]},
      sources:[source('https://one-piece.com/character/tashigi/index.html'),{label:'공식 TV587·613',reference:'https://one-piece.com/anime/587/index.html · https://one-piece.com/anime/613/index.html'}],
    },
  },
  {
    id:'ivankov',name:'엠포리오 이완코브',crewId:'revolutionary-army',
    knownAs:[{kind:'epithet',name:'기적의 인물 이완코브',source:source('https://one-piece.com/character/Emporio_Ivankov/index.html')}],
    description:'혁명군 그랜드라인군 군대장·카마바카 왕국 여왕. 호르호르 열매로 자신과 타인의 상태를 바꾸며, 임펠다운에서 탈출을 돕고 마젤란을 저지했다.',
    combatProfile:{
      combatStyles:['뉴커머 권법','데스 윙크 계열','호르몬 조절·지원','집단 탈출 지휘'],
      specialTraits:[{id:'special-v0180-ivankov-hormone',category:'devil-fruit',name:'호르호르 열매',status:'confirmed',description:'신체와 호르몬 상태를 바꾸어 전투·지원·응급 회복을 돕는다.',evidenceIds:['evidence-v0180-ivankov-magellan-tv448','evidence-v0180-ivankov-inazuma-tv451'],limitations:'타인 회복 성과는 개인 Defense/Stamina에 자동 합산하지 않으며, 대상의 생명·체력 부담이나 개입 조건을 따로 평가한다.'}],
      haki:{characterId:'ivankov',capabilities:[{type:'armament',...note('unclear','공식 요약에 정량 가능한 무장색 전투 적용 정보 없음.')},{type:'observation',...note('unclear','고급 견문색 적용 증거 이번 자료에서 미확인.')},{type:'conquerors',...note('not-confirmed','패왕색 확인 없음.')} ]},
      sources:[source('https://one-piece.com/character/Emporio_Ivankov/index.html'),{label:'공식 TV448·451·1117',reference:'https://one-piece.com/anime/448/index.html · https://one-piece.com/anime/451/index.html · https://one-piece.com/anime/68630/index.html'}],
    },
  },
  {
    id:'inazuma',name:'이나즈마',crewId:'revolutionary-army',knownAs:[],
    description:'혁명군 그랜드라인군 부대장. 싹둑싹둑 열매로 장애물·지형을 잘라 구조물로 재배치하며 임펠다운 탈출작전에서 이완코브와 협력했다.',
    combatProfile:{
      combatStyles:['지형 절단·재배치','퇴로 조성·차단','절단형 근접 전투'],
      specialTraits:[{id:'special-v0180-inazuma-scissors',category:'devil-fruit',name:'싹둑싹둑 열매',status:'confirmed',description:'단단한 구조물을 종이처럼 절단해 지형·차단물·경로를 만든다.',evidenceIds:['evidence-v0180-inazuma-stairs-tv448'],limitations:'지형 절단 성과만으로 패기 강화된 강자 신체를 동일하게 베는 공격력을 보증하지 않는다.'}],
      haki:{characterId:'inazuma',capabilities:[{type:'armament',...note('unclear','실전 무장색 적용 미확인.')},{type:'observation',...note('unclear','고급 견문색 적용 미확인.')},{type:'conquerors',...note('not-confirmed','패왕색 확인 없음.')} ]},
      sources:[source('https://one-piece.com/character/Inazuma/index.html'),{label:'공식 TV448·451',reference:'https://one-piece.com/anime/448/index.html · https://one-piece.com/anime/451/index.html'}],
    },
  },
]

export const v0180Memberships:CharacterMembership[]=[
  {characterId:'smoker',groupId:'marines',role:'중장 / G-5 01부대장',status:'current'},
  {characterId:'smoker',groupId:'g5-marines',role:'01부대장',status:'current'},
  {characterId:'tashigi',groupId:'marines',role:'대령 / G-5',status:'current'},
  {characterId:'tashigi',groupId:'g5-marines',role:'대령 / 부관',status:'current'},
  {characterId:'ivankov',groupId:'revolutionary-army',role:'그랜드라인군 군대장',status:'current'},
  {characterId:'ivankov',groupId:'kamabakka-kingdom',role:'여왕(영구 결번)',status:'historical',period:'임펠다운 탈출 및 혁명군 활동을 포함한 시대. 카마바카 왕국의 여왕 호칭은 공식 프로필에서 영구 결번으로 기재.'},
  {characterId:'inazuma',groupId:'revolutionary-army',role:'그랜드라인군 부대장',status:'current'},
  {characterId:'inazuma',groupId:'kamabakka-kingdom',role:'혁명군 협력자 / 거점 활동',status:'historical',period:'카마바카 왕국 혁명군 거점 합류 시기 (공식 TV880)'},
]

type Scene={
  id:string;who:'smoker'|'tashigi'|'ivankov'|'inazuma';episode:string;url:string;title:string;
  fact:string;context:string;purpose:string;roles:Partial<Record<CombatStat,'primary'|'secondary'|'context'>>;
}
const scenes:Scene[]=[
  {id:'smoker-law-tv587',who:'smoker',episode:'587',url:'https://one-piece.com/anime/587/index.html',title:'스모커 vs 로',purpose:'타시기를 구하고 로를 저지',fact:'스모커는 로의 검격을 짓테로 저지했으나 로의 공격이 군함까지 갈라놓는 교전이 이어졌다.',context:'타시기 보호 개입으로 시작했으며 로의 Room·절단 능력과 맞물린 싸움. 이후 TV588에서 로에게 심장을 빼앗기고 패한 사실이 확인된다.',roles:{attack:'secondary',defense:'primary',techniqueMastery:'primary',combatIQ:'secondary',versatility:'secondary'}},
  {id:'smoker-law-tv588',who:'smoker',episode:'588',url:'https://one-piece.com/anime/588/index.html',title:'로에 의한 심장 탈취',purpose:'펑크 하자드에서 로의 능력에 저항',fact:'스모커는 로에게 심장을 빼앗기고 쓰러진 상태로 발견된다.',context:'로의 능력 상성에 따른 패배. 자연계가 무효라는 결론이나 모든 상대에 대한 낮은 Defense로 자동 일반화하지 않는다.',roles:{defense:'secondary',combatIQ:'context',stamina:'context'}},
  {id:'smoker-vergo-tv616',who:'smoker',episode:'616',url:'https://one-piece.com/anime/616/index.html',title:'스모커 vs 베르고',purpose:'베르고를 저지하고 펑크 하자드에서 동료와 행동',fact:'스모커와 베르고가 격렬하게 싸우는 중 스모커는 패기를 두른 베르고의 공격에 고전하며 몰렸다.',context:'베르고의 강한 무장색과 교전 목적, 이후 로의 개입을 고려한다. 퀸·사최간급 정면 피해 성과는 직접 확인되지 않는다.',roles:{attack:'secondary',defense:'primary',stamina:'secondary',speed:'secondary',techniqueMastery:'primary',combatIQ:'context'}},
  {id:'tashigi-law-tv587',who:'tashigi',episode:'587',url:'https://one-piece.com/anime/587/index.html',title:'타시기 vs 로',purpose:'로의 행동 저지 및 부대 보호',fact:'타시기는 로의 칼에 신체가 나뉜 상황에서도 부러진 검으로 계속 공격을 시도했고 스모커가 방어에 개입했다.',context:'기습성 능력에 대한 피해와 스모커 구조가 함께 발생하여 장기 1대1 고점으로 보기 어렵다.',roles:{attack:'secondary',defense:'context',stamina:'primary',techniqueMastery:'secondary',combatIQ:'context'}},
  {id:'tashigi-monet-tv613',who:'tashigi',episode:'613',url:'https://one-piece.com/anime/613/index.html',title:'타시기·조로 vs 모네',purpose:'동료 대피 및 모네 저지',fact:'타시기가 모네와 맞서다가 어깨를 물렸으며 결정적인 검격은 조로가 가했다.',context:'조로의 결정적인 개입이 있으므로 모네를 격파한 성과를 타시기 단독 공격력에 넣지 않는다.',roles:{attack:'secondary',defense:'secondary',stamina:'context',techniqueMastery:'primary',combatIQ:'secondary',versatility:'context'}},
  {id:'ivankov-magellan-tv448',who:'ivankov',episode:'448',url:'https://one-piece.com/anime/448/index.html',title:'이완코브의 마젤란 저지',purpose:'루피 일행의 탈출로 확보',fact:'이완코브는 이나즈마에게 계단을 절단해 퇴로를 막도록 지시하고 홀로 마젤란의 접근을 저지하기 위해 오카마 권법 비기를 사용했다.',context:'마젤란의 맹독 능력에 맞서 후위에서 시간을 버는 임무. 완전한 마젤란 1대1 격파는 아니다.',roles:{attack:'primary',defense:'secondary',stamina:'secondary',speed:'context',techniqueMastery:'primary',combatIQ:'primary',versatility:'secondary'}},
  {id:'ivankov-inazuma-tv451',who:'ivankov',episode:'451',url:'https://one-piece.com/anime/451/index.html',title:'이완코브의 이나즈마 치료',purpose:'독 피해를 입은 동료 구조',fact:'임펠다운 탈출 후 이완코브는 마젤란의 독으로 치명상을 입은 이나즈마를 치료하기 시작했다.',context:'타인에 대한 응급 치료·지원 성과다. 개인 체력 회복량이나 다른 전투원의 상처를 상쇄한 공격력으로 합산하지 않는다.',roles:{defense:'context',stamina:'context',techniqueMastery:'primary',combatIQ:'secondary',versatility:'primary'}},
  {id:'inazuma-stairs-tv448',who:'inazuma',episode:'448',url:'https://one-piece.com/anime/448/index.html',title:'이나즈마의 계단 절단',purpose:'탈출 작전의 추격 차단',fact:'이완코브의 지시에 따라 이나즈마가 가위로 계단을 잘라 마젤란의 추격 경로를 끊었다.',context:'실제 환경 절단·전장 제어지만 마젤란에게 대인 유효타를 입혔다고 볼 수 없다. 팀 작전에서 지시자도 분리한다.',roles:{attack:'context',defense:'secondary',speed:'context',techniqueMastery:'primary',combatIQ:'secondary',versatility:'primary'}},
  {id:'inazuma-poison-tv451',who:'inazuma',episode:'451',url:'https://one-piece.com/anime/451/index.html',title:'이나즈마의 독 피해 및 구호',purpose:'탈출 임무 수행 후 생존',fact:'이나즈마는 마젤란의 독으로 빈사 상태가 되었으며 이완코브가 치료에 착수했다.',context:'독 피해 생존과 외부 치료 개입을 구분. 타인의 회복 능력을 개인 Stamina로 전환하지 않는다.',roles:{defense:'context',stamina:'secondary',techniqueMastery:'context'}},
]

export const v0180Battles:Battle[]=scenes.map((s,i)=>({
  id:'battle-v0180-'+s.id,title:s.title,chronologyOrder:620+i,
  combatStructure:'multiple-vs-multiple',combatPurpose:s.purpose,
  combatIntent:'unknown',environment:s.episode==='448'||s.episode==='451'?'임펠다운 탈출 작전':'펑크 하자드',
  restrictions:s.context,externalFactors:'상대 능력과 아군 개입·철수 목적을 분리',result:'unknown',participantIds:[],
}))
export const v0180Evidence:Evidence[]=scenes.map(s=>({
  id:'evidence-v0180-'+s.id,battleId:'battle-v0180-'+s.id,subjectCharacterId:s.who,
  source:{type:'supplementary',reference:'ONE PIECE.com 공식 TV '+s.episode+'화',description:s.url},
  evidenceStrength:'moderate',fact:s.fact,
  supportedAbilities:[],statContributions:Object.entries(s.roles).map(([stat,role])=>({
    stat:stat as CombatStat,role,note:s.context,
  })),
  interpretation:s.context,evaluationImpact:'프로젝트의 현재 draft 임시 평가에 참조하는 정성 자료이며 원작 절대 수치가 아니다.',
  uncertainty:'공식 TV 애니 요약이며 만화 원본 전 컷 독립 재검증은 완료하지 않았다. 전투 결과 및 팀 성과에서 미확인 지표를 추론하지 않는다.',
}))

const statKeys:CombatStat[]=['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility']
const seeds:[
  {id:'smoker',values:number[],ready:EvidenceReadiness[],notes:string[]},
  {id:'tashigi',values:number[],ready:EvidenceReadiness[],notes:string[]},
  {id:'ivankov',values:number[],ready:EvidenceReadiness[],notes:string[]},
  {id:'inazuma',values:number[],ready:EvidenceReadiness[],notes:string[]}
]=[
  {id:'smoker',values:[75,76,79,76,78,72,77],ready:['E2','E2','E3','E3','E2','E2','E2'],notes:[
    '연기 변형·포박 및 근접 짓테 공격은 실전이나 로와 베르고에게 직접 결정적 피해를 주고 완승한 기록은 없다. 자연계 자체를 정면 대인 화력 보너스로 만들지 않는다.',
    '로의 능력으로 심장을 빼앗겼고 베르고 패기 공방에서 고전했다. 상대 능력과 패기 강점이 개입하므로 일반 상대에게 무방비하다는 추론은 금지한다.',
    '피해 속에서도 교전을 지속했지만 독립 장시간 강자전 표본이 적다.',
    '연기 기동은 확인되나 패기 사용자에 대한 순수 반응속도 상한은 측정 불가.',
    '연기·짓테를 연계하고 타시기를 엄호한 정밀 대응을 인정하되 로의 능력에 불리했다.',
    '타시기를 구하고 적의 전투 방식에 맞춰 교전하지만 로·베르고전의 실질 판단 실패와 작전 목적 개입을 고려한다.',
    '연기 구속/이동·자연계 변형·해루석 무기 등 용도가 다르지만 최상위 상성 해법 및 강자 다회 대응은 부족하다.',
  ]},
  {id:'tashigi',values:[62,63,69,68,72,66,60],ready:['E3','E2','E3','E3','E2','E3','E3'],notes:[
    '로·모네에게 검을 사용한 것은 사실이나 모네 결정타는 조로이며 직접 대인 결정적 유효타 근거는 제한적이다.',
    '모네의 깨물기와 로의 신체 분할을 허용했으나 능력 상성·타인의 개입을 일반 내구에 자동 환산하지 않는다.',
    '로의 공격 후에도 재차 검을 휘둘렀다. 장기전 지속 증명은 제한적이다.',
    '상위 상대 반응·이동 표본이 충분하지 않은 E3 임시값이다.',
    '검술 실전 경험과 끈기를 인정하되 강자와 독립 지속 공방에서 고급 완성도는 미확인.',
    '모네와 로에 맞섰으나 작전 주도권과 최종 제압 과정에서 다른 인물의 개입을 분리한다.',
    '검술과 부대 호위는 있지만 다른 독립 기술·거리 통제 전환이 확인되지 않았다.',
  ]},
  {id:'ivankov',values:[77,74,81,76,84,79,87],ready:['E2','E3','E2','E3','E2','E2','E2'],notes:[
    '마젤란을 홀로 저지하려고 오카마 권법을 사용했다. 맹독의 상대 제약을 고려하며 마젤란 격파·상위 강자 유효타를 사실로 주장하지 않는다.',
    '마젤란과 맞섰으나 유독성 특수 능력 앞에 제약이 존재했다. 타인에 대한 치료를 자신의 Defense로 더하지 않는다.',
    '임펠다운에서 지휘·저지와 탈출을 계속했고 중간 피해가 있었으나 1대1 강자전 지속 최고점은 불명확하다.',
    '권법과 윙크식 기술의 반응·공격은 있으나 개인 순수 최고속 직접 검증은 보류한다.',
    '호르몬 조절과 권법을 전투·지휘·응급 치료로 폭넓게 응용한 실전 숙련을 인정한다.',
    '탈출을 위해 마젤란을 혼자 막는 선택과 이나즈마의 지형 절단을 활용한 후퇴로 설계. 지원 목적과 독자 결투 성과를 구분한다.',
    '대인 공격·적 행동 지연·상태 변화·치료·아군 지원을 실제 임무에서 활용한다. 다만 타인 치료와 본인 능력치를 중복 산정하지 않는다.',
  ]},
  {id:'inazuma',values:[68,69,73,71,77,74,82],ready:['E3','E3','E3','E3','E2','E2','E2'],notes:[
    '가위로 구조물을 자르는 능력이 확인되나 마젤란 본체에게 동일 절단력의 공격을 성공시킨 자료는 아니다.',
    '계단을 잘라 추격로를 차단한 원거리 환경 방어는 가능하나 본체는 독에 의해 치명상을 입었다.',
    '독에 쓰러졌고 이완코브 치료가 개입했다. 외부 지원을 개인 지구력으로 가산하지 않는다.',
    '이동과 엄호는 있으나 고급 전투 속도를 직접 확정하기 어렵다.',
    '건축물·지형을 종이처럼 절단/재배치하는 능력을 실제 탈출로 차단에 안정적으로 활용했다.',
    '이완코브 지시에 맞춰 퇴로를 절단하고 팀 탈출을 보조한 판단을 인정한다. 전체 작전 설계자는 따로 구분한다.',
    '절단·환경 조작·길 개척·차단 등 전장 역할이 분명하다. 모두 싹둑싹둑 열매 기반이며 독립 대인 강자전 증명은 부족하다.',
  ]},
]
export const v0180Evaluations:Evaluation[]=seeds.map(seed=>({
  id:'evaluation-v0180-'+seed.id,characterId:seed.id,status:'draft',
  evaluationDataVersion:'evaluation-0.1.80-four-new-character-evidence-draft',
  items:statKeys.map((stat,i)=>{
    const contributions=v0180Evidence.filter(e=>e.subjectCharacterId===seed.id && e.statContributions.some(s=>s.stat===stat)).map(e=>e.id)
    return {stat,baseScore:seed.values[i],score:seed.values[i],rationale:seed.notes[i],evidenceIds:contributions,
      hakiContributions:[],readiness:seed.ready[i]}
  }),
}))
