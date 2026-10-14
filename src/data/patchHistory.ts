import { v0180CommanderAttackAudit } from './sample/v0180CommanderAttackAudit'
const commanderNames:Record<string,string>={queen:'퀸',cracker:'크래커',smoothie:'스무디',marco:'마르코',king:'킹',katakuri:'카타쿠리'}
export type PatchChange = {
  kind: 'score' | 'character' | 'group' | 'feature' | 'evidence'
  title: string
  detail?: string
  reason?: string
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

/** Shared release-note categories: consistent mapping for filtering and grouped rendering. */
export const PATCH_CATEGORIES = [
  { id:'stats', label:'스탯 조정', kinds:['score'] },
  { id:'characters', label:'캐릭터·소속', kinds:['character','group'] },
  { id:'features', label:'UI·기능', kinds:['feature'] },
  { id:'analysis', label:'근거·분석', kinds:['evidence'] },
] as const
export type PatchCategory = (typeof PATCH_CATEGORIES)[number]['id']
export type PatchCategoryFilter = PatchCategory | 'all'
export function categoryForPatchChange(change:PatchChange):PatchCategory {
  const category=PATCH_CATEGORIES.find(section=>(section.kinds as readonly string[]).includes(change.kind))
  if(!category)throw new Error('Uncategorized patch change: '+change.kind)
  return category.id
}

/** User-facing verified summaries, newest first. No inferred backfill of older patch numbers. */
export const patchHistory: PatchRecord[] = [
  {
    version:'v0.4.5',date:'2026-10-14',title:'티치 두 열매 숙련·다재다능함 재평가',
    summary:'티치 Technique 93→94(E2), Versatility 95→96(E1). 크로우즈·핸콕 능력 봉쇄·지진 활용의 실제 성과를 각각 제어 숙련과 전투 역할 폭으로 구분해 재해석했다. 97 이상의 과잉 추론은 보류하고 다른 5축과 미호크 및 70명의 기존 평가, 계산 모델을 보존.',
    changes:[
      {kind:'score',characterId:'teach',stat:'techniqueMastery',before:93,after:94,title:'티치 Technique 94',reason:'에이스전 흡인→접촉 봉쇄, 핸콕의 석화 능력 봉쇄, 마린포드/로전 지진 기술 등 두 능력 체계를 실제 전투에서 제어한 숙련의 재보정. 반복적인 동시 융합 기술이나 흰수염급 제어를 확정하지 않아 E2 유지.',evidence:[{label:'에이스·두 열매 공식 인물 설명',url:'https://one-piece.com/character/Marshall_D_Teech/index.html'},{label:'핸콕 봉쇄 TV1087',url:'https://one-piece.com/anime/64696/index.html'}]},
      {kind:'score',characterId:'teach',stat:'versatility',before:95,after:96,title:'티치 Versatility 96',reason:'어둠 계열의 흡인·상대 능력 봉쇄·근접 제압과 지진 계열의 대인 충격·광역 압박을 서로 다른 전투 목적에 활용하는 폭을 재평가. 열매 개수나 동일 유효타를 별도 +N으로 중복 가산하지 않으며, 추가 독립 역할 미확인으로 97은 보류.',evidence:[{label:'핸콕 봉쇄 TV1087',url:'https://one-piece.com/anime/64696/index.html'},{label:'로와의 교전 TV1093',url:'https://one-piece.com/anime/65154/index.html'}]},
      {kind:'evidence',characterId:'teach',title:'두 열매 고난도 동시 기술·97점 유보',detail:'열매 두 종의 실전 사용은 공식 확인되지만 어느 상황에서나 제약 없이 동시에 최적 제어한다는 직접 근거는 부족하다. Technique는 실행·제어 숙련, Versatility는 전투 역할 폭으로 분리하고 5개 타축·Raw Haki는 유지.'},
    ],
  },

  {
    version:'v0.4.4',date:'2026-10-14',title:'티치 7축 전면 재평가와 미호크 공격력 조정',
    summary:'티치 Attack96·Defense91·Stamina97·Speed82(유지)·Technique93(유지)·Combat IQ94·Versatility95, Overall 92.571. 미호크 Attack97(샹크스 Final Attack과 동률). 기존 근거의 직접 사실과 조건부 추론을 분리하고 과거 v0.4.3 입력·v0.3.3 원본 기준선을 보존했다.',
    changes:[
      {kind:'score',characterId:'teach',stat:'attack',before:95,after:96,title:'티치 Attack 상향',reason:'지진 충격파 실제 활용·에이스 능력 무력화의 공격 성과·로전 후반 승리까지 반영하되 결정타 기술 미공개는 한계로 보존.',evidence:[{label:'로 vs 티치 공식 1093화',url:'https://one-piece.com/anime/65154/index.html'},{label:'전투 결과 공식 1115화',url:'https://one-piece.com/anime/68212/index.html'}]},
      {kind:'score',characterId:'teach',stat:'defense',before:89,after:91,title:'티치 Defense 능동 방어',reason:'핸콕전 실제 접촉 봉쇄와 에이스 상대 공격 수단 억제를 조건부 능동 방어로 교정, 피격 후 생존은 Stamina에만 반영.',evidence:[{label:'핸콕전 공식 1087화',url:'https://one-piece.com/anime/64696/index.html'}]},
      {kind:'score',characterId:'teach',stat:'stamina',before:95,after:97,title:'티치 Stamina·고통 감내 상향',reason:'에이스·흰수염·로 상대 큰 피해를 받고도 전투를 지속한 반복 성과와 어둠의 고통 증폭 맥락; 서로 다른 싸움을 단일 장기전으로 합산하지 않음.',evidence:[{label:'로전 공식 1093화',url:'https://one-piece.com/anime/65154/index.html'},{label:'로 패배 공식 1115화',url:'https://one-piece.com/anime/68212/index.html'}]},
      {kind:'score',characterId:'teach',stat:'combatIQ',before:87,after:94,title:'티치 Combat IQ·전술적 위험 관리 상향',reason:'에이스의 열매 봉쇄 전술, 핸콕의 석화 억제, 강적과의 공격 수단·시점 선택을 종합하되 마젤란·로전의 큰 위험과 내면 계산의 불확실성을 남기는 E2 잠정 상단값.',evidence:[{label:'에이스전 공식 325화',url:'https://one-piece.com/anime/325/index.html'},{label:'핸콕전 공식 1087화',url:'https://one-piece.com/anime/64696/index.html'}]},
      {kind:'score',characterId:'teach',stat:'versatility',before:93,after:95,title:'티치 Versatility 실전 역할 폭 상향',reason:'두 열매 보유 자체가 아니라 상대 능력 봉쇄·원거리 흡인·근접 제압·광역 지진을 다른 목표에 실제로 전환하는 전장 역할 범위를 재평가.',evidence:[{label:'에이스전 공식 325화',url:'https://one-piece.com/anime/325/index.html'},{label:'로전 공식 1093화',url:'https://one-piece.com/anime/65154/index.html'}]},
      {kind:'score',characterId:'mihawk',stat:'attack',before:96,after:97,title:'미호크 Attack 97 동축 조정',reason:'세계 최강 검사의 공식 위상, 원거리 참격·대형 절단, Ch.1058 샹크스보다 뛰어난 검술 평가를 종합해 샹크스 최종 Attack97과 동급으로 보되, 키드전 같은 최고급 직접 결정타 부재는 E2로 보존.',evidence:[{label:'미호크 공식 프로필',url:'https://one-piece.com/character/Dracule_Mihawk/index.html'}]},
      {kind:'evidence',characterId:'teach',title:'티치 Speed82·Technique93 유지 근거',detail:'Speed는 강자와의 직접 고속 기동/반응 증명이 부족한 E3, Technique는 기존 93에 두 열매 운용·봉쇄 숙련 이미 반영. 둘 다 무근거 상향·미관찰 감점 금지.'},
      {kind:'feature',title:'모델과 역사 원본 보존',detail:'Balanced 1.2/Haki 0.5, v0.3.3 독립 JSON, 기존 72 Character·76 Evaluation·532 Stat·직접 15+조건부 2 Matchup 구조 불변. 평가 집합만 v0.4.4, 코어 모델/원본은 v0.4.3 유지.'},
    ],
  },

  { version:'v0.4.3',date:'2026-10-14',title:'루피 기어 4·니카 상태별 평가 분리 및 상태 표시 간결화',
    summary:'루피의 같은 에그헤드 시점 기어 4 이하와 기어 5 상태를 각각 독립적으로 분석했다. 기어 5를 대표로 유지하고 기존 v0.4.1 루피 평가 원본은 보존. 일반 화면의 Draft 등 내부 상태 라벨만 숨겼다.',
    changes:[
      {kind:'character',characterId:'luffy',title:'기어 4 이하 별도 Evaluation',detail:'기어 2~4+현재 패기 사용 가능, 각성 능력 제외. 카타쿠리·카이도전의 공식 자료와 CP0 외부 개입을 분리.'},
      {kind:'evidence',characterId:'luffy',title:'기어 5 Combat IQ 근거 재검토',detail:'기존 89→87(E3). 루치의 센토마루 공격과 루피의 후속 차단을 모두 고려하되 장난이 피해의 원인이라고 확정하지 않는다. 나머지 6축 보존.'},
      {kind:'feature',title:'루피 vs 티치 기어별 조건부 매치업 2건',detail:'기어 4 이하와 기어 5 발동 상태를 구분해 접촉 열매 무효화, 니카 응용, 지진 충격·지속력을 별도 시나리오로 비교. 기존 직접 15건 보존, 승자/승률 미산정.'},
      {kind:'evidence',characterId:'teach',title:'티치 전투력 상향 근거 검토',detail:'기존 7축 95/89/95/82/93/87/93·Overall 90.57 유지. 상향 여부는 독립적인 신규 유효타/운용 표본과 중복 산정 여부를 확인한 뒤 사용자 승인 하에 검토.'},
      {kind:'feature',title:'평가 상태 문구 숨김',detail:'캐릭터 상단·순위·동축 비교·평가 근거에서 Draft/prototype 등 내부 처리 상태의 기본 노출 제거. E1/E2/E3와 평가 시점·근거는 유지.'},
      {kind:'feature',title:'기존 데이터·버전과 모델 보존',detail:'72 캐릭터, 76 Evaluation, 532 스탯, 직접 Matchup 15건. Balanced 1.2/Haki 0.5 변경 없음. 데이터셋·평가 집합은 0.4.3, 기존 0.3.3 스냅샷 불변.'},
    ],
  },
  { version:'v0.4.2',date:'2026-10-14',title:'캐릭터 소개 중복 제거 · 평가 안내 접기',
    summary:'캐릭터 상세 상단의 중복 소개·평가 방법 문구를 줄이고, 평가 시점 세부 조건과 점수 해석은 요청할 때만 펼쳐 확인하도록 정리했다. 모든 원본 평가·근거·점수·기존 기능은 보존했다.',
    changes:[
      {kind:'feature',title:'캐릭터 상세 머리말 간소화',detail:'소개문의 시스템·평가 방식 반복 노출을 없애고 소속·이명·평가 시점을 강조. 원본 설명은 삭제하지 않으며 아래 전투 프로필과 전투 근거에서 확인 가능.'},
      {kind:'feature',title:'평가 시점과 종합점수 도움말 접기',detail:'전투 조건·데이터 버전과 평균/패기/승률 주의 안내는 펼침형 도움말에서 확인. 핵심 경고는 한 줄만 표시.'},
      {kind:'feature',title:'기존 v0.4.1 이미지·평가 유지',detail:'카쿠/이나즈마 초상, 버기/루피 초상, 기존 72명/75 Evaluation/15 직접 Matchup 및 Balanced 1.2 보존. 화면 패치 버전만 0.4.2로 갱신.'},
    ],
  },
  { version:'v0.4.1',date:'2026-10-14',title:'카쿠·이나즈마 이미지 교정, 버기·루피 초상, 루피 7축 Draft',
    summary:'카쿠·이나즈마 초상 파일 교환, 버기·루피 초상 2장 추가, 루피 Gear 5 시점 7축 잠정 평가. 원본 71명의 점수와 15 직접 대진, Balanced 1.2 및 v0.3.3 스냅샷을 보존한다.',
    changes:[
      {kind:'feature',title:'카쿠·이나즈마 초상 이미지 상호 교정',detail:'사용자가 발견한 잘못된 이미지 할당을 Git blob 교환으로 수정하고 자동 파일 해시 검증에 포함.'},
      {kind:'feature',title:'버기·루피 초상 등록',detail:'사용자가 제시한 원피스 트레저 크루즈 일러스트와 일치하는 원본을 확인하여 WebP 변환·연결. 공개 재배포 권리 별도 미확인.'},
      {kind:'character',title:'몽키 D. 루피 신규 등록',characterId:'luffy',detail:'밀짚모자 일당 선장. 기어 5 시점 평가 및 공식 TV 줄거리 연계 2 Battle·6 Evidence, E2/E3 Draft.'},
      {kind:'evidence',title:'루피 신규 전투력 7축 잠정 산정',characterId:'luffy',detail:'Attack 97 / Defense 94 / Stamina 90 / Speed 95 / Technique 95 / Combat IQ 89 / Versatility 99, Overall 약 94.14. Haki Raw 0(중복 가산 유보), Gear5 소모/CP0 외부 개입/호위 임무를 반영.'},
      {kind:'feature',title:'기존 데이터·계산 보존 및 데이터셋 버전 갱신',detail:'앱 0.4.1, core/evaluation set 0.4.1. Frozen v0.3.3 JSON과 Balanced 1.2, 기존 개인 평가 71명 및 Matchup 15개 불변.'},
    ],
  },
  { version:'v0.4.0', date:'2026-10-13', title:'데이터 무결성·독립 기준선·계산 재현성',
    summary:'v0.3.3 전체 도메인·평가·근거·15 직접 대진을 독립 JSON으로 보존하고, 참조·계산·버전의 자동 검증을 추가했다. 기존 전투력 점수는 변경하지 않았다.',
    changes:[
      {kind:'feature', title:'v0.3.3 역사적 데이터·순위 스냅샷', detail:'현재 배열 필터가 아닌 정적 JSON. Character/Group/Membership/Battle/Participant/Evidence/Evaluation/Matchup 및 모든 7축과 전체 계산을 보존.'},
      {kind:'feature', title:'도메인 전반 참조 무결성 감사', detail:'중복/존재하지 않는 참조·Haki와 캐릭터 귀속·대표 Evaluation/상태·Matchup 근거를 검사하며 E3 근거 부족은 별도 경고로 분리.'},
      {kind:'feature', title:'계산·동점 순위 재현성 및 버전 구분', detail:'Balanced 1.2/Haki 0.5 유지. 앱·데이터셋·개별 Evaluation revision·모델·스냅샷 버전을 구분.'},
    ],
  },
  { version:'v0.3.3',date:'2026-10-13',title:'이미지 확대·검은수염 초상·버기와 이조의 E3/E2 잠정 평가',
    summary:'업로드된 6장 추가로 초상 70장, 확대/비율 개선과 해적단 단순 문양 교체. 버기·이조의 7축 잠정 평가 및 v0.4 무결성 스모크 테스트를 추가했다.',
    changes:[
      {kind:'feature',title:'이미지 확대 팝업과 비율·선명도 개선',detail:'PC 140px/모바일 100px, contain으로 자르지 않고 상세 이미지 클릭 시 닫기·ESC·배경 클릭 지원.'},
      {kind:'feature',title:'초상 이미지 추가 6장',detail:'티치·시류·바제스·반 오거·피사로·코비. 버기 이미지는 아직 미제공이므로 이름 대체 표시 유지. 재배포 권리 미확인.'},
      {kind:'group',title:'해적단 문양 확인 및 단순화',detail:'로저 곱슬 수염, 검은수염 세 해골, 크로스 길드, 빨간 머리, 밀짚모자 집단은 주제별 독자 단순 SVG. 공식 로고 파일 자체가 아님.'},
      {kind:'character',title:'버기 평가 추가',characterId:'buggy',detail:'7축 32/45/38/34/42/29/46. Overall 38.0. 공식 줄거리 소개에 근거한 E3 전면 잠정치로 서열 확정이 아님.'},
      {kind:'character',title:'이조 평가 추가',characterId:'izo',detail:'7축 76/72/79/74/82/78/72. Overall 약 76.14. 공식 애니 줄거리와 인물 소개에 연결된 E2/E3 잠정치, 부상·지원 임무 고려.'},
      {kind:'evidence',title:'v0.4 데이터 무결성 시작 검증',detail:'ID와 참조 연결·계산 재현 스모크 테스트. 독립 역사 스냅샷은 미구현.'},
    ],
  },

  { version:'v0.3.2',date:'2026-10-13',title:'초상 이미지 64장·이조·과거 로저 소속',
    summary:'사용자가 제공한 64명의 초상을 웹앱에 연결하고, 이조의 평가 전 프로필과 과거 해적단 소속 기록을 추가했다. 이미지 재배포 허가는 미확인이다.',
    changes:[
      {kind:'feature',title:'초상 이미지 64장 등록',detail:'사용자 업로드를 WebP로 변환해 저장하고 캐릭터명·ID에 연결. 재배포 라이선스 미확인 표기 및 이미지가 없는 7명은 기존 대체 표시 유지.'},
      {kind:'character',title:'이조 프로필 추가',characterId:'izo',detail:'흰수염 해적단 16번대 대장, 아카자야 측 오니가시마 전투 합류. 독립된 원작 근거와 7축 평가를 완료하기 전까지 순위·매치업은 미산정.'},
      {kind:'group',title:'로저 해적단 과거 소속 보강',detail:'샹크스·이누아라시·네코마무시의 과거 견습·동승 이력을 등록. 현재 소속과 구분해 표시.'},
    ],
  },
  {version:'v0.3.1',date:'2026-10-13',title:'근거 펼침 안내·이미지 전환 안정화',
   summary:'상세 근거의 펼침·접힘 상태를 명확히 안내하고, 향후 허가된 이미지의 로딩 실패가 다른 캐릭터로 이어지지 않도록 했다.',
   changes:[
     {kind:'feature',title:'근거 펼침·접힘 상태 안내',detail:'실제 펼침 상태에 따라 동작 문구를 바꾸고 터치 영역을 확대.'},
     {kind:'feature',title:'캐릭터 초상 실패 복구',detail:'허가된 이미지 전환 시 이전 캐릭터의 이미지 로딩 실패 상태를 초기화. 현재 이미지는 미등록.'},
   ]},
  { version:'v0.3.0',date:'2026-10-13',title:'근거·출처 가독성 및 신뢰성 표현 개선',
    summary:'자료 유형에 따른 출처 표기·링크 명칭을 통일하고, 평가 근거 펼침과 모바일 가독성을 개선했다.',
    report:'https://github.com/pchjesus/onepiece-saikyo-analysis/blob/main/docs/V0_3_0_EVIDENCE_READABILITY_RELEASE_2026-10-13.md',
    changes:[
      {kind:'feature',title:'출처 표시 및 링크 명칭 정리',detail:'원작 회차 참조·공식 보조 자료·팬 해설 등 확인 가능한 성격에 맞춰 중립적인 안내 및 링크 이름을 표시.'},
      {kind:'feature',title:'평가 근거·모바일 가독성',detail:'기존 평가 이유/계산식은 항상 표시하면서 연결 근거를 펼쳐 읽도록 하고 작은 글씨·클릭 영역을 개선.'},
      {kind:'feature',title:'E등급 설명 정리',detail:'E1~E3 중심 안내, E4는 사용하지 않는 참고 항목으로 구분.'},
      {kind:'evidence',title:'출처 직접성 오해 방지',detail:'애니메이션·보조·커뮤니티 자료의 본문을 일괄 원작 직접 사실로 설명하지 않도록 표시를 구분; 원본 Evidence 불변.'},
      {kind:'feature',title:'공식 비브르 카드 도감 연결',detail:'외부 공식 카드 목록을 안내하며 재게시 권한이 불분명한 이미지는 복제하지 않음. 적법한 후속 이미지에는 하단 출처 라벨 준비.'},
    ]},
  { version:'v0.2.1',date:'2026-10-13',title:'전투 프로필·평가 출처 링크 가독성 개선',
    summary:'에이스 등 캐릭터의 긴 출처 URL 줄바꿈 문제를 해결하고 공통 출처 표시를 정리했다.',
    report:'https://github.com/pchjesus/onepiece-saikyo-analysis/blob/main/docs/V0_2_1_SOURCE_CITATION_READABILITY_2026-10-13.md',
    changes:[
      {kind:'feature',title:'출처 링크 표시 통합',detail:'원작 전투 프로필·전투 기록·평가 근거·스탯 비교의 긴 주소를 출처명과 짧은 원문 링크로 표기.'},
      {kind:'feature',title:'모바일 출처 가독성 개선',detail:'좁은 카드에서 출처 설명을 자연스럽게 줄바꿈하고 원문 링크는 온전하게 표시.'},
    ]},
  {version:'v0.2.0',date:'2026-10-13',title:'동축 전투력 비교 · 근거 탐색 · 캐릭터 초상 기반',
    summary:'두 캐릭터의 동일 스탯을 원작 근거까지 비교하며 승인된 이미지용 안전한 표시 구조를 추가.',
    changes:[
      {kind:'feature',title:'동축 스탯 비교 분석',detail:'현재 스탯 화면에서 2명을 선택해 Base/Raw/Final, E등급, 실제 근거와 전투 조건을 비교.'},
      {kind:'feature',title:'스탯 근거로 바로 이동',detail:'평가 근거의 출처에서 해당 전투 기록을 바로 열 수 있도록 연결.'},
      {kind:'feature',title:'캐릭터 초상 기반',detail:'상세 화면과 전체 검색에 승인된 이미지의 자리와 캐릭터별 대체 아이콘을 추가. 무단 외부 이미지는 포함하지 않음.'},
      {kind:'evidence',title:'6인 Attack 4요소 비교 연결',detail:'기존 질적 감사의 최대 출력·유효타·지속 화력·상성을 비교 창에서 확인. 기존 수치 유지.'},
    ]},
  {
    version:'v0.1.81',date:'2026-10-12',title:'패치 내역 카테고리 정리',
    summary:'버전별 변경점을 스탯 조정, 캐릭터·소속, UI·기능, 근거·분석으로 구분했다.',
    changes:[
      {kind:'feature',title:'패치 내역 카테고리별 보기',detail:'전체/스탯 조정/캐릭터·소속/UI·기능/근거·분석 필터와 버전별 카테고리 묶음을 추가했다.'},
      {kind:'feature',title:'패치 내역 버튼 항목 간소화',detail:'버튼 추가 항목에서는 설명과 근거를 생략하고 변경 이름만 표시한다.'},
    ],
  },
  {
    version: 'v0.1.80', date: '2026-10-12', title: '패치 내역 UI · 해군/혁명군 4명 · 사최간 공격력 감사',
    report:'https://github.com/pchjesus/onepiece-saikyo-analysis/blob/main/docs/V0_1_80_PATCH_HISTORY_AND_CHARACTER_EXPANSION_2026-10-12.md',
    summary: '스모커·타시기는 해군, 이완코프·이나즈마는 혁명군에만 추가. 사최간급 6명 대인 공격력 4요소를 검증.',
    changes: [
      {kind:'feature',title:'패치 내역 버튼 추가'},
      {kind:'character',title:'스모커 추가',detail:'해군 소속으로 전투 근거와 7축 잠정 평가를 등록.',reason:'로우·베르고와의 교전 조건을 평가하기 위해.',characterId:'smoker'},
      {kind:'character',title:'타시기 추가',detail:'해군 소속으로 검술·모네 교전 근거와 7축 잠정 평가를 등록.',reason:'모네의 공격과 조로의 개입을 타시기 개인 성과와 분리한다.',characterId:'tashigi',evidence:[{label:'타시기 공식 프로필',url:'https://one-piece.com/character/tashigi/index.html'}]},
      {kind:'character',title:'이완코프 추가',detail:'혁명군 소속으로 호르몬·지원·전투 근거와 7축 잠정 평가를 등록.',reason:'호르몬 치료·강화와 강자 상대 직접 공격을 구분한다.',characterId:'ivankov'},
      {kind:'character',title:'이나즈마 추가',detail:'혁명군 소속으로 지형 절단·전장 지원 근거와 7축 잠정 평가를 등록.',reason:'계단 절단 실행과 이완코프의 독자 판단을 분리한다.',characterId:'inazuma',evidence:[{label:'이나즈마 공식 프로필',url:'https://one-piece.com/character/Inazuma/index.html'},{label:'TV448',url:'https://one-piece.com/anime/448/index.html'}]},
      {kind:'feature',title:'그룹 추가 취소',detail:'해군·혁명군 기존 그룹만 사용하며 G-5와 뉴커머 랜드는 선택 그룹에서 제외.',reason:'사용자가 요청한 소속 분류를 유지한다.'},
      {kind:'evidence',title:'6명 대인 공격력 심화 검증',detail:'마르코·킹·카타쿠리·퀸·크래커·스무디의 최대 출력·유효타·지속 화력·상성을 분리.',reason:'광역 규모나 결과만으로 대인 Attack 점수를 오인하지 않기 위해.'},
      ...v0180CommanderAttackAudit.map(a=>({
        kind:'evidence' as const,characterId:a.characterId,
        title:commanderNames[a.characterId]+' Attack 검토 (Final '+a.finalAttack+' 유지)',
        detail:'순간 최대 출력: '+a.peakOutput+' / 실제 유효타: '+a.verifiedHit+' / 지속 화력: '+a.sustainedPressure+' / 상성: '+a.matchup+' / 연결 근거: '+a.evidenceIds.join(', '),
        reason:a.rationale,
      })),
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
    changes:[
      {kind:'score',title:'코비 Combat IQ',detail:'Combat IQ 76→72(E2).',reason:'하치노스 철수 중 구조 요청의 위장 가능성 교차 확인 부족을 감점하되 민간인 존재 자체를 불가능으로 오인하지 않는다.',characterId:'koby',stat:'combatIQ',before:76,after:72,evidence:[{label:'공식 TV1121',url:'https://one-piece.com/anime/69144/index.html'}]},
      {kind:'score',title:'프린스 그루스 Versatility',detail:'Versatility 85→80(E2).',reason:'점토 골렘·점토 둥지는 실전의 여러 역할을 수행했지만 하나의 점토 메커니즘 파생을 별도의 독립 열매처럼 중복 평가하지 않는다.',characterId:'prince-grus',stat:'versatility',before:85,after:80,evidence:[{label:'공식 TV1122',url:'https://one-piece.com/anime/69263/index.html'}]},
    ],
  },
  {
    version:'v0.1.76',date:'2026-10-11',title:'코비 단발 공격력 재평가',summary:'실직권골 1회 파괴력과 반복 가능한 대인 화력을 구분.',
    changes:[{kind:'score',title:'코비 Attack',detail:'Final Attack 82→77(E2), Overall 75.714→75.000.',reason:'피사로 거대 팔 파괴는 실제 성과지만, 가프 선행 공격·구출 작전·1회 시전 조건에서 최상위 1대1 반복 피해를 확정할 수 없다.',characterId:'koby',stat:'attack',before:82,after:77,evidence:[{label:'ONE PIECE.com TV1122',url:'https://one-piece.com/anime/69263/index.html'}]}],
  },
  {
    version:'v0.1.75',date:'2026-10-11',title:'그루스 점토 골렘 근거 확대',summary:'골렘·점토 둥지의 제어와 방어를 추가 검토하고 점수는 유지.',
    changes:[{kind:'evidence',title:'프린스 그루스 근거 확대',detail:'점토 골렘 광역 제압 및 군함 보호를 검토했다.',reason:'동일 점토 능력의 여러 활용을 별도 독립 능력으로 중복 계산하지 않는다.',characterId:'prince-grus'}],
  },
]
