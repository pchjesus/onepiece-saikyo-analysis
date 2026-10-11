/**
 * Versioned, user-facing release notes. Source of truth for the Patch History UI.
 *
 * Keep entries newest-first, add one entry for EVERY new user-facing patch.
 * Score adjustments must include pre/post Final, their justification and
 * traceable official / project Evidence. Earlier patch context v0.1.75–79 is
 * backfilled from prior merged release reports; this is not a complete history
 * of all pre-v0.1.75 development.
 */
export type PatchChange = {
  category:'feature'|'roster'|'evidence'|'stat'|'fix'
  title:string
  reason:string
  stat?:{character:string;label:string;from:number;to:number;readiness:string}
  sources?:readonly {label:string;url:string}[]
}
export type PatchRelease = {
  version:string;date:string;headline:string;summary:string
  changes:readonly PatchChange[]
  reportUrl?:string
}
const docs=(filename:string)=>'https://github.com/pchjesus/onepiece-saikyo-analysis/blob/main/docs/'+filename
const official=(episode:number,url:string)=>({label:'공식 TV '+episode+'화',url})
export const CURRENT_PATCH_VERSION='v0.1.80'
export const patchHistory:readonly PatchRelease[]=[
  {
    version:'v0.1.80',date:'2026-10-12',headline:'패치 내역 열람 기능 · 새 캐릭터 4명 · 집단 2개',
    summary:'앞으로 변경점을 앱 안에서 기록. 스모커·타시기와 이완코브·이나즈마 및 G-5·카마바카 왕국 등록. v0.1.79의 기존 평가 대상 65명의 전투력 점수를 모두 보존하고, 신규 캐릭터 4명에 대해서만 근거 부족을 표시한 초안 점수를 추가.',
    changes:[
      {category:'feature',title:'헤더 「패치 내역」 버튼 및 버전별 기록창',reason:'매 패치마다 버전, 변경점, 수정 이유, 스탯 변경 전후 점수와 공식 근거를 웹앱 내부에서 즉시 확인할 수 있도록 변경 이력을 정형 데이터로 관리. 이전 v0.1.75~79도 추적 가능한 부분부터 소급 등록.'},
      {category:'roster',title:'스모커·타시기 · 해군 G-5 지부',reason:'G-5 조직 실재와 01부대장 스모커·부관 타시기의 공식 프로필을 기준으로 해군 소속을 유지하면서 G-5 집단을 별도 등록. 로/베르고·모네전의 아군 개입과 능력 상성은 신규 E2/E3 임시 점수에 분리.',sources:[{label:'스모커 공식 프로필',url:'https://one-piece.com/character/smoker/index.html'},{label:'타시기 공식 프로필',url:'https://one-piece.com/character/tashigi/index.html'},official(587,'https://one-piece.com/anime/587/index.html'),official(613,'https://one-piece.com/anime/613/index.html'),official(616,'https://one-piece.com/anime/616/index.html')]},
      {category:'roster',title:'이완코브·이나즈마 · 카마바카 왕국',reason:'이완코브를 혁명군 및 카마바카 왕국에, 이나즈마를 혁명군과 카마바카 혁명군 거점 소속으로 연결. 임펠다운 마젤란 저지, 지형 절단, 독 피해 및 이완코브의 외부 치료를 직접 개인 전투력과 분리.',sources:[{label:'이완코브 공식 프로필',url:'https://one-piece.com/character/Emporio_Ivankov/index.html'},{label:'이나즈마 공식 프로필',url:'https://one-piece.com/character/Inazuma/index.html'},official(448,'https://one-piece.com/anime/448/index.html'),official(451,'https://one-piece.com/anime/451/index.html'),official(880,'https://one-piece.com/anime/o5027/index.html')]},
      {category:'evidence',title:'공식 애니 보조 전투 Evidence 추가',reason:'4명 각각의 개별 사건과 실제 참전·동료 개입·능력 한계를 Battle/Evidence로 남겨 신규 7축 평가(각 E2 또는 E3)를 추적할 수 있게 했다. 공식 TV 요약은 원작 만화 전 컷 직접 확인과 구분한다.'},
      {category:'fix',title:'기존 인물·전투력·계산식 회귀 보존',reason:'기존 65명×7개 핵심 Final, 기존 Raw Haki, 고정 5개 Overall, 15개 명시 매치업, 과거 데이터 평가 버전은 유지. 다중 집단 소속으로 캐릭터가 여러 번 검색·순위에 집계되지 않도록 검증.'},
    ],
    reportUrl:docs('V0_1_80_PATCH_HISTORY_SMOKER_IVANKOV_TWO_GROUPS_2026-10-12.md'),
  },
  {
    version:'v0.1.79',date:'2026-10-12',headline:'사최간 3명 9축 감사 · 퀸 범용성 조정',
    summary:'스무디·크래커·퀸의 Attack/Technique/Versatility 비교. 퀸 범용성만 조정.',
    changes:[
      {category:'stat',title:'퀸 Versatility 80 → 82',stat:{character:'퀸',label:'범용성',from:80,to:82,readiness:'E2'},reason:'고대종 육체 구속·과학무장/제르마 모방·아이스 오니 감염탄은 전투 목적과 메커니즘이 구분되는 독립 수단이다. 공격·기술 숙련의 자동 상향으로 쓰지 않았고 개인 대인 피해량과 광역 감염을 혼동하지 않았다.',sources:[official(1005,'https://one-piece.com/anime/o5997/index.html'),official(1061,'https://one-piece.com/anime/61599/index.html')]},
      {category:'evidence',title:'크래커 검술·병사와 비 약점 교차검증',reason:'검격의 직접 유효타와 군체 운용을 별도 평가하며 나미가 제공한 비의 상성 개입을 보존. 수치 변경 없음.',sources:[official(799,'https://one-piece.com/anime/o4471/index.html'),official(805,'https://one-piece.com/anime/o4513/index.html')]},
      {category:'evidence',title:'스무디 Attack76 / Technique80 / Versatility78 유지',reason:'대형 반복 참격과 나미·징베의 조타 회피를 구분. 높은 출력과 미확인 강자 대인 유효타를 동시에 기록.',sources:[official(868,'https://one-piece.com/anime/o4939/index.html')]},
    ],
    reportUrl:docs('V0_1_79_THREE_COMMANDER_NINE_AXIS_REVIEW_2026-10-12.md'),
  },
  {
    version:'v0.1.78',date:'2026-10-12',headline:'하치노스 위험 판단 및 스무디·토비롯포 재검토',
    summary:'기존 점수는 모두 보존하고 코비 위험 판단과 스무디 회피 상황에 공식 근거 추가.',
    changes:[
      {category:'evidence',title:'코비 Combat IQ 72 유지 · 판단 근거 수정',reason:'하치노스에는 실제 피구금자가 있었다. 문제는 민간인 존재 가능성이 아니라 적진 탈출 중 위장 신호를 확인하지 않고 행동한 위험 판단 실패. 동일 함정 사건을 다시 감점하지 않았다.',sources:[official(1113,'https://one-piece.com/anime/67844/index.html'),official(1121,'https://one-piece.com/anime/69144/index.html')]},
      {category:'evidence',title:'스무디 공격 회피와 토비롯포 전투 조건 재감사',reason:'나미·징베의 회피를 스무디의 화력 부족으로 오인하지 않고 사사키·블랙 마리아 등의 아군 개입도 분리. 추가 점수 변경 없음.',sources:[official(868,'https://one-piece.com/anime/o4939/index.html')]},
    ],
    reportUrl:docs('V0_1_78_KOBY_HACHINOSU_RISK_AND_SMOOTHIE_TOBIROPPO_CONTEXT_2026-10-11.md'),
  },
  {
    version:'v0.1.77',date:'2026-10-11',headline:'코비 판단력 · 그루스 범용성 하향',
    summary:'코비 IQ와 그루스 범용성을 각각 한 축씩 근거 중심으로 하향.',
    changes:[
      {category:'stat',title:'코비 Combat IQ 76 → 72',stat:{character:'코비',label:'전투 판단력',from:76,to:72,readiness:'E2'},reason:'하치노스에서 기만된 구조 요청의 위험성을 충분히 검증하지 못해 시류의 함정에 노출되고 가프가 대신 부상. 선의는 전술 판단 성공이 아니며 팀 전체 작전을 코비에게 귀속하지 않는다.',sources:[official(1121,'https://one-piece.com/anime/69144/index.html')]},
      {category:'stat',title:'그루스 Versatility 85 → 80',stat:{character:'프린스 그루스',label:'범용성',from:85,to:80,readiness:'E2'},reason:'점토 인형의 접근 차단과 점토 둥지의 낙석 방어는 서로 다른 목적이지만 같은 점토 생성·조작 메커니즘. 다수 독립 전투 체계로 중복 산정하지 않았다.',sources:[official(1114,'https://one-piece.com/anime/68048/index.html'),official(1122,'https://one-piece.com/anime/69263/index.html')]},
    ],
    reportUrl:docs('V0_1_77_KOBY_IQ_GRUS_VERSATILITY_ROSTER_AUDIT_2026-10-11.md'),
  },
  {
    version:'v0.1.76',date:'2026-10-11',headline:'코비의 단발 파괴력과 지속 대인 화력 구분',
    summary:'실직권골 한 번의 거대 구조물 파괴를 고점 반복 대인 화력과 구분.',
    changes:[
      {category:'stat',title:'코비 Attack 82 → 77',stat:{character:'코비',label:'공격력',from:82,to:77,readiness:'E2'},reason:'실직권골로 피사로의 거대 팔을 부순 실제 성과는 인정한다. 다만 가프의 선제 개입·헤르메포 엄호·그루스 지원이 있으며 같은 위력의 반복 대인 유효타는 미확인.',sources:[official(1122,'https://one-piece.com/anime/69263/index.html')]},
    ],
    reportUrl:docs('V0_1_76_KOBY_SINGLE_BURST_ATTACK_AND_IQ_COHORT_REVIEW_2026-10-11.md'),
  },
  {
    version:'v0.1.75',date:'2026-10-11',headline:'그루스 점토 인형 증거 확대 · 수치는 그대로',
    summary:'점토 인형의 접근 차단을 보조 근거에 추가. 전투력 숫자 변경 없음.',
    changes:[
      {category:'evidence',title:'그루스 점토 전장 통제 근거 추가',reason:'점토 인형의 광장 접근 차단과 군함 보호용 점토 둥지를 상황별로 구분. 기존 점수는 당시에 그대로 유지했고 이후 v0.1.77에서 별도 교정했다.',sources:[official(1114,'https://one-piece.com/anime/68048/index.html'),official(1122,'https://one-piece.com/anime/69263/index.html')]},
    ],
    reportUrl:docs('V0_1_75_FOCUSED_REVIEW_2026-10-11.md'),
  },
]
