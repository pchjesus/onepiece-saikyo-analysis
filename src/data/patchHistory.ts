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
    version: 'v0.1.80', date: '2026-10-12', title: '패치 내역 UI · 해군/혁명군 4명 · 사최간 공격력 감사',
    summary: '스모커·타시기는 해군, 이완코프·이나즈마는 혁명군에만 추가. 사최간급 6명 대인 공격력 4요소를 검증.',
    changes: [
      {kind:'feature',title:'패치 내역 버튼',detail:'버전·변경점·변경 이유·스탯 조정 전후·근거 링크를 확인한다.',reason:'이전 패치 내역과 평가 이유를 앱에서 바로 검증하도록 지원한다.'},
      {kind:'character',title:'스모커 추가',detail:'해군 소속으로 전투 근거와 7축 잠정 평가를 등록.',reason:'로우·베르고와의 교전 조건을 평가하기 위해.',characterId:'smoker'},
      {kind:'character',title:'타시기 추가',detail:'해군 소속으로 검술·모네 교전 근거와 7축 잠정 평가를 등록.',reason:'모네의 공격과 조로의 개입을 타시기 개인 성과와 분리한다.',characterId:'tashigi',evidence:[{label:'타시기 공식 프로필',url:'https://one-piece.com/character/tashigi/index.html'}]},
      {kind:'character',title:'이완코프 추가',detail:'혁명군 소속으로 호르몬·지원·전투 근거와 7축 잠정 평가를 등록.',reason:'호르몬 치료·강화와 강자 상대 직접 공격을 구분한다.',characterId:'ivankov'},
      {kind:'character',title:'이나즈마 추가',detail:'혁명군 소속으로 지형 절단·전장 지원 근거와 7축 잠정 평가를 등록.',reason:'계단 절단 실행과 이완코프의 독자 판단을 분리한다.',characterId:'inazuma',evidence:[{label:'이나즈마 공식 프로필',url:'https://one-piece.com/character/Inazuma/index.html'},{label:'TV448',url:'https://one-piece.com/anime/448/index.html'}]},
      {kind:'feature',title:'그룹 추가 취소',detail:'해군·혁명군 기존 그룹만 사용하며 G-5와 뉴커머 랜드는 선택 그룹에서 제외.',reason:'사용자가 요청한 소속 분류를 유지한다.'},
      {kind:'evidence',title:'6명 대인 공격력 심화 검증',detail:'마르코·킹·카타쿠리·퀸·크래커·스무디의 최대 출력·유효타·지속 화력·상성을 분리.',reason:'광역 규모나 결과만으로 대인 Attack 점수를 오인하지 않기 위해.'},
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
