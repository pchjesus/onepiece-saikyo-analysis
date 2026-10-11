export type PatchChange = {
  kind: 'score' | 'character' | 'group' | 'feature' | 'evidence'
  title: string
  detail: string
  reason: string
  characterId?: string
  stat?: string
  before?: number
  after?: number
  evidence?: { label: string; url: string }[]
}
export type PatchRecord = {
  version: string
  date: string
  title: string
  summary: string
  changes: PatchChange[]
  report?: string
}

/** User-facing verified summaries, newest first. No inferred backfill of older patch numbers. */
export const patchHistory: PatchRecord[] = [
  {
    version: 'v0.1.80', date: '2026-10-12', title: '패치 내역 UI · 스모커 · 이완코프 · 2개 집단',
    summary: '버전별 변경 내역을 화면에서 확인하고, 신규 캐릭터와 소속 집단을 확장했다.',
    changes: [
      {kind:'feature',title:'패치 내역 버튼과 버전별 상세 기록',detail:'메인 상단에서 버전 목록, 변경 내용, 변경 이유, 점수 전후, 출처를 열람할 수 있다.',reason:'배포 후 무엇이 왜 달라졌는지 사용자가 직접 검증할 수 있도록 하기 위함.'},
      {kind:'character',title:'스모커 추가',detail:'해군 소속 스모커의 프로필·전투 근거·7축 잠정 평가를 등록했다.',reason:'에이스 견제전과 로우·베르고·도플라밍고 관련 전투에서 능력과 한계가 모두 확인되는 해군 전투원이다.',characterId:'smoker',evidence:[{label:'ONE PIECE.com — 스모커 공식 프로필',url:'https://one-piece.com/character/Smoker/index.html'}]},
      {kind:'character',title:'엠포리오 이완코프 추가',detail:'혁명군 소속 이완코프의 프로필·전투 근거·7축 잠정 평가를 등록했다.',reason:'호르몬 능력과 뉴커머 권법·윈크 기술의 다목적 운용, 마젤란·쿠마와의 교전 조건을 구분하기 위함.',characterId:'ivankov',evidence:[{label:'ONE PIECE.com — 이완코프 공식 프로필',url:'https://one-piece.com/character/Emporio_Ivankov/index.html'}]},
      {kind:'group',title:'해군 G-5 · 뉴커머 랜드 집단',detail:'기존 해군·혁명군을 유지하면서 G-5와 뉴커머 랜드를 하위 집단으로 추가했다.',reason:'소속과 실제 활동 거점을 분리하고 기존 인물의 이력을 손상하지 않기 위함.'},
    ],
  },
  {
    version:'v0.1.79',date:'2026-10-12',title:'스무디·크래커·퀸 9축 비교',summary:'9개 비교 축 중 퀸 Versatility만 보정. 공식 애니 근거 4건 보강.',
    report:'https://github.com/pchjesus/onepiece-saikyo-analysis/blob/main/docs/V0_1_79_THREE_COMMANDER_NINE_AXIS_REVIEW_2026-10-12.md',
    changes:[
      {kind:'score',title:'퀸 범용성 조정',detail:'퀸의 Versatility Final 80→82(E2), Overall 78.571→78.857.',reason:'고대종 신체 구속, 제르마 계열 과학무장·은신, 아이스 오니 감염탄이 서로 독립적인 메커니즘과 전투 목적을 갖는다. 공격력·숙련도까지 중복 가산하지 않는다.',characterId:'queen',stat:'versatility',before:80,after:82,evidence:[{label:'ONE PIECE.com TV1061',url:'https://one-piece.com/anime/61599/index.html'},{label:'ONE PIECE.com TV1005',url:'https://one-piece.com/anime/o5997/index.html'}]},
      {kind:'evidence',title:'크래커 근거 보강',detail:'TV799/805 보조 Evidence를 추가. Attack77, Technique80, Versatility77 유지.',reason:'기어4 상대 검격·비스킷 군체 생성과 나미의 물 상성 개입을 구분한다.',characterId:'cracker',evidence:[{label:'ONE PIECE.com TV799',url:'https://one-piece.com/anime/o4471/index.html'},{label:'ONE PIECE.com TV805',url:'https://one-piece.com/anime/o4513/index.html'}]},
      {kind:'evidence',title:'스무디 3축 유지',detail:'Attack76, Technique80, Versatility78 유지.',reason:'대형 참격의 출력은 확인되나 나미 지시·징베 조타 회피 때문에 상위권 직접 적중 피해는 미확인.',characterId:'smoothie'},
    ],
  },
  {
    version:'v0.1.78',date:'2026-10-11',title:'코비 위험 판단 · 스무디 회피 근거',summary:'코비의 구출 상황과 스무디의 나미·징베 조타 회피를 분리. 점수는 유지.',
    changes:[
      {kind:'evidence',title:'코비·스무디 전투 맥락 보강',detail:'하치노스 피구금자 구조와 써니호 추격 근거를 추가. 기존 수치는 변경하지 않았다.',reason:'위험을 감수한 구조와 고급 전술 IQ, 회피당한 참격과 순수 화력을 혼동하지 않기 위함.'},
    ],
  },
  {
    version:'v0.1.77',date:'2026-10-11',title:'코비·프린스 그루스 후속 보정',summary:'하치노스 전투 조건을 바탕으로 두 인물의 평가를 재검토.',
    changes:[{kind:'score',title:'코비·그루스 후속 보정',detail:'기존 전투 상황 및 후속 교차검증에 따른 평가 수정.',reason:'단발 성과와 지속적 개인 전투력, 구조물 보호의 역할을 분리한다.'}],
  },
  {
    version:'v0.1.76',date:'2026-10-11',title:'코비 단발 공격력 재평가',summary:'실직권골 1회 파괴력과 반복 가능한 대인 화력을 구분.',
    changes:[{kind:'score',title:'코비 Attack',detail:'Final Attack 82→77(E2), Overall 75.714→75.000.',reason:'피사로 거대 팔 파괴는 실제 성과지만, 가프 선행 공격·구출 작전·1회 시전 조건에서 최상위 1대1 반복 피해를 확정할 수 없다.',characterId:'koby',stat:'attack',before:82,after:77,evidence:[{label:'ONE PIECE.com TV1122',url:'https://one-piece.com/anime/1122/index.html'}]}],
  },
  {
    version:'v0.1.75',date:'2026-10-11',title:'그루스 점토 골렘 근거 확대',summary:'골렘·점토 둥지의 제어와 방어를 추가 검토하고 점수는 유지.',
    changes:[{kind:'evidence',title:'프린스 그루스 근거 확대',detail:'점토 골렘 광역 제압 및 군함 보호를 검토했다.',reason:'동일 점토 능력의 여러 활용을 별도 독립 능력으로 중복 계산하지 않는다.',characterId:'prince-grus'}],
  },
]
