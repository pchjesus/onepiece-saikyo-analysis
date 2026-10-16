import type { Character, CharacterMembership, Group } from '../../domain/character/types'

/**
 * v0.4.17 user-requested, strictly satirical One Piece meme profile.
 *
 * NOT a Balanced 1.2 Evaluation; none of these labels maps to a normal combat
 * stat. The score is included ONLY in the Overall ranking per user request.
 * Source facts and comedic interpretations are kept in separate fields.
 */
export const CHARLOS_ID = 'charlos'
export type NobleMemeStat = {
  id: string
  label: string
  score: number
  line: string
  fact: string
  satire: string
  sourceUrl: string
  sourceLabel: string
}

export const charlosMemeStats: readonly NobleMemeStat[] = [
  {
    id:'gun',label:'총질력',score:23,
    line:'총은 쏠 줄 안다이. 주먹은 부하가 쓴다이.',
    fact:'샤본디 제도에서 하찌에게 권총을 발포한 사건이 있다이.',
    satire:'맨주먹으로 시비를 거는 건 품위가 없는 거다이. 고귀한 손가락 하나면 충분하다이.',
    sourceUrl:'https://one-piece.com/story/sabaody/index.html',sourceLabel:'ONE PIECE.com · 샤본디 제도 편',
  },
  {
    id:'toughness',label:'맷집력',score:97,
    line:'맞고 또 나오는 것도 귀족의 품격이다이.',
    fact:'루피의 주먹에 얻어맞은 뒤 다시 등장했고, 세계회의에서는 묘스가르드와 사이·레오에게도 공격받았다이.',
    satire:'루피의 주먹을 맞고도 다시 등장했다이. 위대한 귀족의 생명력은 쉽게 꺼지지 않는 거다이.',
    sourceUrl:'https://one-piece.com/anime/68725/index.html',sourceLabel:'ONE PIECE.com · 애니메이션 1118화',
  },
  {
    id:'bidding',label:'배포력',score:100,
    line:'5억 베리 정도는 즉석에서 부른다이.',
    fact:'케이미의 경매에서 5억 베리를 제시했다이. 실제로 대금을 지불했는지는 이 출처에서 별도 확인되지 않았다이.',
    satire:'2억 베리쯤 준비한 자들 앞에서 5억을 외치는 것. 이것이야말로 세계귀족의 품격이다이.',
    sourceUrl:'https://one-piece.com/anime/396/index.html',sourceLabel:'ONE PIECE.com · 애니메이션 396화',
  },
  {
    id:'authority',label:'지배력',score:99,
    line:'내가 싸울 필요는 없다이. 세상이 움직인다이.',
    fact:'세계회의에서 시라호시를 붙잡으려 쿠마를 이용했고, 루치에게도 명령한 일이 있다이.',
    satire:'내가 손을 쓰면 모두가 놀란다이. 진정한 지배자는 명령 한마디로 세상을 움직이는 거다이.',
    sourceUrl:'https://one-piece.com/anime/68725/index.html',sourceLabel:'ONE PIECE.com · 애니메이션 1118화',
  },
  {
    id:'mobility',label:'기동력',score:92,
    line:'내 발은 장식이다이. 남이 걸어주면 된다이.',
    fact:'샤본디 제도의 세계귀족 행차에서 다른 인간을 이동에 동원하는 행태가 묘사된다이.',
    satire:'발을 쓰면 신발이 닳는다이. 세상은 원래 서로 돕고 살아가는 거다이.',
    sourceUrl:'https://one-piece.com/story/sabaody/index.html',sourceLabel:'ONE PIECE.com · 샤본디 제도 편 (세부 장면 추가 대조 대상)',
  },
  {
    id:'humanity',label:'인정력',score:100,
    line:'인간을 너무 사랑해서 소유하고 싶을 뿐이다이.',
    fact:'케이미 경매와 시라호시 납치 시도 등 인간을 물건처럼 취급한 행동이 확인된다이.',
    satire:'인간 하나하나가 너무 소중하다이. 그러니 단 한 명도 내 곁을 떠나게 할 수 없는 거다이.',
    sourceUrl:'https://one-piece.com/story/levely/index.html',sourceLabel:'ONE PIECE.com · 세계회의 편',
  },
  {
    id:'provocation',label:'어그로력',score:100,
    line:'나를 때리면 역사가 움직인다이.',
    fact:'샤본디 제도에서 루피에게, 세계회의에서 묘스가르드와 사이·레오에게 공격당하는 사건이 있었다이.',
    satire:'평화로운 곳에도 나 하나면 역사가 시작된다이. 모두의 마음을 움직이는 특별한 재능이다이.',
    sourceUrl:'https://one-piece.com/anime/68725/index.html',sourceLabel:'ONE PIECE.com · 애니메이션 1118화',
  },
] as const

export const charlosSpecialOverall = charlosMemeStats.reduce((sum, stat) => sum + stat.score, 0) / charlosMemeStats.length

export const celestialDragonGroup: Group = {
  id: 'celestial-dragons', name: '천룡인', type: 'government',
  parentGroupId:'world-government',
  description: '세계정부를 구성하는 세계귀족. 이 조직의 소속과 사회적 지위는 개인 전투력 또는 직접 지휘 계통을 증명하지 않는다.',
}

export const charlosCharacter: Character = {
  id: CHARLOS_ID,
  name: '차를로스 성',
  crewId: celestialDragonGroup.id,
  knownAs: [],
  description: '로즈워드 성의 아들로 성지 마리조아에 사는 세계귀족. 실제로는 잔혹한 행위를 반복하는 인물이며, 본 웹앱에서만 예외적인 풍자 7축을 부여한다.',
  combatProfile: {
    combatStyles:['권총', '세계귀족의 특권을 통한 타인 동원'],
    specialTraits:[],
    haki:{characterId:CHARLOS_ID,capabilities:[
      {type:'armament',status:'unclear',note:'확인된 사용 근거 없음. 별도 패기 보너스 없음.'},
      {type:'observation',status:'unclear',note:'확인된 사용 근거 없음. 별도 패기 보너스 없음.'},
      {type:'conquerors',status:'unclear',note:'확인된 사용 근거 없음. 별도 패기 보너스 없음.'},
    ]},
    sources:[
      {label:'ONE PIECE.com 공식 인물 소개',reference:'https://one-piece.com/character/Saint_Charlos/index.html'},
      {label:'ONE PIECE.com TV396',reference:'https://one-piece.com/anime/396/index.html'},
      {label:'ONE PIECE.com TV1118',reference:'https://one-piece.com/anime/68725/index.html'},
    ],
  },
}

export const charlosMembership: CharacterMembership = {
  characterId: CHARLOS_ID,
  groupId: celestialDragonGroup.id,
  role:'세계귀족 · 로즈워드 성의 아들',
  status:'current',
}

/** Satirical text is NOT official manga speech or an official retcon. */
export const charlosMemeQuote = '5억에 사겠다이~~!! 5억 베리다이~~!!'
export const charlosTruthLines = [
  '그는 알고 있었다이. 끝까지 고개를 들고 저항하는 이들이 얼마나 쉽게 쓰러지는지 말이다이.',
  '그래서 결심했다이. 모든 미움을 자신에게 모으고 악인을 연기하기로 말이다이.',
  '세상은 그가 인간을 사고팔았다고 비난했다이. 하지만 그의 가슴에 품어진 인간애는 5억 베리보다 뜨거웠다이.',
  '5억 베리는 거래가 아니었다이. 말로는 다 표현할 수 없는 사랑의 무게였다이.',
  '그가 맞을 때마다 세상은 조금씩 움직였다이. 그것이 자신이 선택한 성자의 길이었다이.',
] as const
