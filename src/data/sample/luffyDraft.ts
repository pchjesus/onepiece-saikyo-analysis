import type { Character, CharacterMembership } from '../../domain/character/types'
import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation } from '../../domain/evaluation/types'

/**
 * v0.4.1 additive Draft: official anime synopsis/profile based, NOT a manga page-by-page audit.
 * Existing 71 ratings, Balanced 1.2 and Haki Weight .5 remain untouched.
 * 7-axis Base deliberately includes demonstrated combat; no unverified extra Raw Haki.
 */
export const luffyCharacter: Character = {
  id: 'luffy', name: '몽키 D. 루피', crewId: 'straw-hat-pirates',
  knownAs: [
    {kind:'epithet',name:'밀짚모자 루피',source:{label:'ONE PIECE.com',reference:'https://one-piece.com/character/luffy/index.html'}},
    {kind:'title',name:'사황',source:{label:'ONE PIECE.com',reference:'https://one-piece.com/character/luffy/index.html'}},
  ],
  description:'밀짚모자 일당의 선장. 니카 환수종 각성인 기어 5, 고무 능력 응용과 패기를 조합한다. 사황 칭호와 카이도전 승패만으로 점수를 정하지 않는다.',
  combatProfile: {
    combatStyles:['고무 신체를 활용한 고속 근접 격투','기어 2~5 상태 전환','니카 각성 기반 신체·지형 변형','무장색·견문색·패왕색 패기'],
    specialTraits: [{
      id:'special-luffy-nika',category:'devil-fruit',name:'사람사람 열매 환수종 모델 니카 / 기어 5',
      status:'confirmed',awakening:'confirmed',
      description:'고무 신체의 자유로운 변형과 주변 환경 응용, 거대화·변칙 대응이 확인된다. 원작의 특수 능력으로 기록하며 기어 5 자체에 별도 Overall 보너스를 더하지 않는다.',
      evidenceIds:['evidence-luffy-gear5-1071','evidence-luffy-adaptation-1072','evidence-luffy-kizaru-defense-1127'],
      limitations:'기어 5는 지속적으로 유지되는 무제한 상태가 아니다. 카이도전과 키자루전에서 소모와 전투 후 탈진이 확인되며 장기전 성능과 순간 최고 출력을 구분해야 한다.',
    }],
    haki: {characterId:'luffy',capabilities:[
      {type:'armament',status:'confirmed',note:'와노의 유앵/무장색 응용 및 카이도전 패기 타격이 확인된다.'},
      {type:'observation',status:'confirmed',note:'견문색을 실전 운용하는 것으로 알려져 있으나 채택된 공식 TV 요약만으로 미래예지의 정확도를 별도 정량화하지 않는다.'},
      {type:'conquerors',status:'confirmed',note:'공식 캐릭터 소개·TV 1071화에서 패왕색 능력이 명시된다.',
       infusion:{status:'confirmed',note:'카이도전에서의 패왕색을 두른 공방은 원작 1010화의 맥락을 갖지만 해당 만화 본문을 이번 작업에서 직접 전수 열람하지는 않았다.'}},
    ]},
    sources:[
      {label:'공식 캐릭터 소개',reference:'https://one-piece.com/character/luffy/index.html'},
      {label:'공식 TV 1069·1071·1072·1077',reference:'https://one-piece.com/anime/62672/index.html · https://one-piece.com/anime/62947/index.html · https://one-piece.com/anime/62948/index.html · https://one-piece.com/anime/63849/index.html'},
      {label:'공식 TV 1127·1128',reference:'https://one-piece.com/anime/72451/index.html · https://one-piece.com/anime/72495/index.html'},
    ],
  },
}

export const luffyMembership: CharacterMembership = {
  characterId:'luffy',groupId:'straw-hat-pirates',role:'선장',status:'current',
}

export const luffyBattles: Battle[] = [
  {
    id:'luffy-kaido-wano-summary',title:'오니가시마 — 루피와 카이도의 기어 4~5 최종 공방',
    chronologyOrder:350,combatStructure:'multiple-vs-multiple',
    combatPurpose:'카이도를 막고 와노 주민과 동료를 보호',
    combatIntent:'full-power',environment:'오니가시마 옥상 및 상공',
    restrictions:'카이도는 다수 참전자와의 누적 전투가 있었고 루피도 이전 패배·소모를 겪었다. 통제된 신선한 1대1 단독 표본이 아니다.',
    externalFactors:'CP0의 개입으로 루피 공격이 방해받음. 이전 옥상 다수전 및 카이도와 루피 양측의 누적 피해와 임무를 구분한다.',
    result:'victory',participantIds:[],
  },
  {
    id:'luffy-kizaru-egghead-summary',title:'에그헤드 — 루피의 키자루 저지와 백성총',
    chronologyOrder:360,combatStructure:'multiple-vs-multiple',
    combatPurpose:'베가펑크·보니·동료 보호 및 탈출 지원',
    combatIntent:'serious',environment:'에그헤드 연구층과 공장층',
    restrictions:'상대는 베가펑크 공격 임무, 루피는 호위·차단 임무. 기어 5 지속 시간과 에너지 소모의 제약',
    externalFactors:'베가펑크 일행 이동, 파시피스타 지휘권, 새턴성의 출현. 중립의 독립 결투로 해석할 수 없다.',
    result:'interrupted',participantIds:[],
  },
]

const evidence = (id: string, battleId: string, reference: string, fact: string,
  statContributions: Evidence['statContributions'], interpretation: string, uncertainty: string): Evidence => ({
  id,battleId,subjectCharacterId:'luffy',source:{type:'supplementary',reference,description:'ONE PIECE.com 공식 TV 애니메이션 회차 줄거리/캐릭터 소개. 이번 작업에서 만화 페이지 전수 대조는 하지 않음.'},
  evidenceStrength:'moderate',fact,
  supportedAbilities:['고무 신체·기어 전환','패기','기어 5/니카 각성'],
  statContributions,interpretation,evaluationImpact:'루피 7축 Draft의 조건부 정성 근거. 타 인물의 기존 점수·패기 수치·매치업 승률에 자동 반영하지 않음.',uncertainty,
})
export const luffyEvidence: Evidence[] = [
  evidence('evidence-luffy-cp0-interference-1069','luffy-kaido-wano-summary','https://one-piece.com/anime/62672/index.html',
    '카이도와 루피가 격돌하던 중 CP0 요원이 철괴로 루피의 기어 4 공격을 방해했고 카이도의 공격이 적중했다.',
    [{stat:'defense',role:'context',note:'외부 개입 뒤 피격을 루피의 순수 정면 방어 실패로 계산하지 않는다.'},{stat:'combatIQ',role:'context',note:'개입으로 생긴 빈틈을 루피의 전술 실수로 단정하지 않는다.'}],
    '승패 순간에 영향을 미친 개입·기술 중단 상황이 확인된다.','CP0 개입과 당시 누적 피해·체력 상태는 정규 독립 1대1과 다르다.'),
  evidence('evidence-luffy-gear5-1071','luffy-kaido-wano-summary','https://one-piece.com/anime/62947/index.html',
    '루피가 니카 환수종 각성인 기어 5로 재기하고 카이도를 제압하는 변칙 기동·고무 공격·보로 브레스 차단을 보여 주었다.',
    [{stat:'attack',role:'primary',note:'사황급 강자와의 실제 고출력 공방. 전체 누적 피해를 단독 화력으로 귀속하지 않는다.'},{stat:'defense',role:'secondary',note:'보로 브레스 차단 등 비전통적 대응 확인.'},{stat:'versatility',role:'primary',note:'각성 변형·공중 기동·공격·방어의 역할 전환.'}],
    '기어 5의 높은 순간 화력 및 능력 범용성이 확인된다.','기어 5 발현 전 루피 패배와 이전 누적 전투를 함께 고려하며 재기력을 무제한 회복이라고 해석하지 않는다.'),
  evidence('evidence-luffy-adaptation-1072','luffy-kaido-wano-summary','https://one-piece.com/anime/62948/index.html',
    '루피가 기어 5에서 거대화와 고무 지형 반발, 내부 기동 등을 활용하다 카이도에게 강한 피해를 받고 노화 유사 탈진 상태로 돌아왔다가 다시 기어 5를 사용했다.',
    [{stat:'versatility',role:'primary',note:'공방·거대화·지형·신체 변형의 다목적 응용.'},{stat:'techniqueMastery',role:'primary',note:'실전에서 상태 및 신체 변형을 연속 응용한다.'},{stat:'stamina',role:'primary',note:'일시 재가동은 인정하되 눈에 띄는 소모를 반영한다.'}],
    '특수 응용 역량은 크지만 최고 상태를 유지하는 소모도 확인된다.','노화 유사 외형의 정확한 생리기전이나 지속 시간의 정량치는 확정할 수 없다.'),
  evidence('evidence-luffy-bajrang-gun-1077','luffy-kaido-wano-summary','https://one-piece.com/anime/63849/index.html',
    '루피는 원신총(바즈랑 건)으로 카이도를 최종 제압했지만 자신도 힘을 다해 의식을 잃고 낙하했고 야마토가 받아냈다.',
    [{stat:'attack',role:'primary',note:'카이도에게 결정적 최종 타격을 한 확인된 고출력 기술.'},{stat:'stamina',role:'primary',note:'승리 후 의식 소실까지 소모한 장기 격전 사례.'},{stat:'combatIQ',role:'secondary',note:'고화력 마무리 타이밍·상황 대응. 전투 전체 계획을 독자적으로 설계한 증거는 아니다.'}],
    '강력한 마무리 성과와 체력 고갈을 함께 반영한다.','카이도는 여러 참전자를 상대하고 지속 피해를 받았다. 최종 승리만으로 전 시간 구간의 순수 1대1 우위를 확정하지 않는다.'),
  evidence('evidence-luffy-kizaru-defense-1127','luffy-kizaru-egghead-summary','https://one-piece.com/anime/72451/index.html',
    '루피가 베가펑크에 접근한 키자루를 붙잡아 던지고 이후 광속 이동으로 돌아온 키자루를 추격하며, 베가탱크를 향한 빔을 순간적으로 삼켜 차단했다.',
    [{stat:'speed',role:'primary',note:'키자루의 기동에 대해 접근·추격과 즉각적인 보호 반응을 성립시킨다.'},{stat:'defense',role:'primary',note:'보호 대상에게 향한 공격을 차단한 실제 성과.'},{stat:'combatIQ',role:'secondary',note:'호위 임무에 따른 차단과 적의 목적 판단.'}],
    '고속 전투 대응·방어 실적을 확인할 수 있다.','키자루는 도주·암살 임무 수행 중이며 동일 조건에서의 속도 우위나 광속 이상의 절대 속도는 도출하지 않는다.'),
  evidence('evidence-luffy-star-gun-1128','luffy-kizaru-egghead-summary','https://one-piece.com/anime/72495/index.html',
    '키자루의 베가탱크 추격을 막기 위해 루피가 백성총(스타 건)을 적중시켰으나 직후 루피 역시 힘을 소진하여 키자루와 함께 추락했다.',
    [{stat:'attack',role:'primary',note:'대장에게 실전 타격을 가한 성공 사례.'},{stat:'speed',role:'secondary',note:'중요 보호 상황에서 공격 타이밍을 성립시킨 사례.'},{stat:'stamina',role:'primary',note:'기어 5 강력한 공격과 동시에 소모 한계가 확인됨.'}],
    '키자루 저지 성공과 기어 5의 전투 지속 한계를 동시에 보여준다.','루피와 키자루 모두 일시 전투 불능 상태가 되었으므로 이를 장시간 완전한 승리로 환산하지 않는다.'),
]

const records: Array<[Evaluation['items'][number]['stat'], number, string, string[], Evaluation['items'][number]['readiness']]> = [
  ['attack',97,'원신총으로 카이도를 최종 제압하고 백성총으로 키자루를 맞힌 실제 고출력 기술을 반영한다. 카이도전의 다수 참전·누적 피해와 에그헤드의 보호 임무 조건을 남긴다. 97점은 프로젝트의 잠정 해석이다.',['evidence-luffy-gear5-1071','evidence-luffy-bajrang-gun-1077','evidence-luffy-star-gun-1128'],'E2'],
  ['defense',94,'기어 5로 카이도의 보로 브레스를 막고 키자루 빔을 보호 대상 대신 차단하는 등 서로 다른 방어·피해 흡수 성과가 있다. 루피의 실제 피격·상태 소모를 무적 방어로 취급하지 않는다.',['evidence-luffy-gear5-1071','evidence-luffy-kizaru-defense-1127','evidence-luffy-cp0-interference-1069'],'E2'],
  ['stamina',90,'극심한 누적 전투와 패배 뒤 기어 5로 재기한 지구력은 높다. 그러나 기어 5 소모·노화 유사 탈진·카이도 격파 직후 의식 소실·키자루전 후 동반 낙하 때문에 최고 수준 장기전 유지에는 제약을 둔다.',['evidence-luffy-adaptation-1072','evidence-luffy-bajrang-gun-1077','evidence-luffy-star-gun-1128'],'E2'],
  ['speed',95,'키자루와의 교전에서 고속 추격·즉각적인 공격 차단·타격 타이밍을 성립시켰다. 키자루의 회피/임무 조건이 달라 동일 속도나 절대 속도 우위를 확정하지 않는다.',['evidence-luffy-kizaru-defense-1127','evidence-luffy-star-gun-1128'],'E2'],
  ['techniqueMastery',95,'기어 2~5, 니카 각성의 신체·지형 변형과 패기를 실전에 적용하는 숙련을 반영한다. 기술 종류만 세어 공격력을 중복 가산하지 않는다.',['evidence-luffy-gear5-1071','evidence-luffy-adaptation-1072','evidence-luffy-kizaru-defense-1127'],'E2'],
  ['combatIQ',89,'상대의 임무·아군 보호 상황에 맞춘 돌발 차단과 변칙 공방은 강점이다. 반면 즉흥성이나 적의 대규모 작전 전체를 예측한 근거가 제한되므로 최고 수준의 전략가로 단정하지 않는다.',['evidence-luffy-cp0-interference-1069','evidence-luffy-kizaru-defense-1127','evidence-luffy-bajrang-gun-1077'],'E3'],
  ['versatility',99,'니카 각성은 신체 변형·거대화·공격·방어·지형 이용·즉흥 응용 폭이 매우 넓다. 새로운 능력의 실제 성과만 반영하고 확인되지 않은 현실 조작이나 무제한 변형은 가정하지 않는다.',['evidence-luffy-gear5-1071','evidence-luffy-adaptation-1072','evidence-luffy-kizaru-defense-1127'],'E2'],
]

export const luffyEvaluation: Evaluation = {
  id:'evaluation-luffy-current-provisional',characterId:'luffy',
  evaluationDataVersion:'evaluation-0.4.1-luffy-official-tv-draft',
  status:'draft',isDefault:true,
  subjectState:{id:'egghead-gear5',label:'기어 5 사용 가능 시점(에그헤드)',note:'카이도전 누적 피해·CP0 개입, 키자루전 베가펑크 보호 임무, 기어 5 시간·소모 제약을 포함한 E2/E3 잠정 평가. 만화 본문 전수 대조 전.'},
  items:records.map(([stat,baseScore,rationale,evidenceIds,readiness]) => ({
    stat,baseScore,score:baseScore,rationale,evidenceIds,hakiContributions:[],readiness,
  })),
}
