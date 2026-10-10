/**
 * v0.1.68 source corroboration ledger. NOT an Evidence insert, production
 * calculation input or score proposal. Direct full-volume Manga reader access
 * is unavailable. Preserve a precise provenance trail for human follow-up.
 */
export type SourceVerificationClass =
  | 'official-supplementary'
  | 'partial-original-panel-third-party-reproduction'
  | 'contemporary-secondary-transcription'
  | 'chapter-page-indexed-secondary'
export type VistaMihawkClaimConfidence = 'official-explicit' | 'multi-source-corroborated' | 'needs-full-primary-pages'

export type VistaMihawkCorroboratedClaim = {
  id: string
  chapter: '561' | '562' | 'profile'
  eventGroup: 'single-mihawk-vista-encounter' | 'official-comparator'
  claim: string
  status: VistaMihawkClaimConfidence
  sourceRefs: readonly { url: string; type: SourceVerificationClass; note: string }[]
  verifiedLimit: string
}

export const v0168VistaMihawkClaims: readonly VistaMihawkCorroboratedClaim[] = [
  {
    id: 'marco-gives-vista-assignment',
    chapter: '561',
    eventGroup: 'single-mihawk-vista-encounter',
    claim: '마르코가 비스타에게 루피의 원호를 요청하고 비스타가 이에 응했다. 기존 Combat IQ 설명은 임무 창안이 아니라 지시받은 전장 요격 수행으로 읽어야 한다.',
    status: 'multi-source-corroborated',
    sourceRefs: [
      { url: 'https://lostneito.blog15.fc2.com/blog-entry-5.html', type: 'contemporary-secondary-transcription', note: '2009년 당시 Ch.561 대사 재현; 공식 단행본 원본 텍스트 아님' },
      { url: 'https://onepiece.fandom.com/wiki/Chapter_561', type: 'chapter-page-indexed-secondary', note: 'Ch.561 Long Summary: Marco calls Vista to intercept Mihawk' },
      { url: 'https://www.grandlinearchives.com/chapters/561', type: 'chapter-page-indexed-secondary', note: 'Ch.561 p.11 파견으로 기록. 페이지는 비공식 요약의 페이지 인덱스' },
    ],
    verifiedLimit: '제3자들이 동일 장면을 기술했으나 정식 원작 561화의 전체 컷을 직접 확인하지 못함. 비스타의 수락 자체는 독자 전략 고점이 아님.',
  },
  {
    id: 'two-swords-intercept-mihawk',
    chapter: '561',
    eventGroup: 'single-mihawk-vista-encounter',
    claim: '비스타의 이도류와 미호크의 흑도가 맞닿은 장면이 공개된 일부 561화 원작 컷 재게시본에도 시각적으로 보인다.',
    status: 'multi-source-corroborated',
    sourceRefs: [
      { url: 'https://x.com/bigdannyfr/status/1723347108923666556', type: 'partial-original-panel-third-party-reproduction', note: '561화로 유통되는 일부 컷만; 정식 VIZ 전체 페이지 또는 출판사 원본 인증 자료가 아님' },
      { url: 'https://one-piece.com/news/o20210220_12159/index.html', type: 'official-supplementary', note: '집필 이후 공식 웹 뉴스에서 비스타가 미호크와 실제 검을 맞댔다고 서술' },
      { url: 'https://onepiece.fandom.com/wiki/Chapter_561', type: 'chapter-page-indexed-secondary', note: '비스타 요격 및 검격 접촉을 설명' },
    ],
    verifiedLimit: '보이는 컷의 검접촉만 제한적으로 확인. 공격/방어 총 횟수, 쌍방 유효 피해, 발도 속도, 패기 사용은 확정 불가.',
  },
  {
    id: 'mihawk-knows-vista-reputation',
    chapter: '561',
    eventGroup: 'single-mihawk-vista-encounter',
    claim: '미호크가 비스타의 정체와 검객 명성을 알아보는 대사 장면이 동시대 대사 기록과 컷 재게시본에 부합한다.',
    status: 'multi-source-corroborated',
    sourceRefs: [
      { url: 'https://lostneito.blog15.fc2.com/blog-entry-5.html', type: 'contemporary-secondary-transcription', note: '561화 대사 재현' },
      { url: 'https://www.grandlinearchives.com/chapters/561', type: 'chapter-page-indexed-secondary', note: '561화 pp.11-12 요약' },
      { url: 'https://x.com/bigdannyfr/status/1723347108923666556', type: 'partial-original-panel-third-party-reproduction', note: '검격 교환 일부 컷 재게시' },
    ],
    verifiedLimit: '인지도는 숙련에 대한 정성적 보조 근거지만 세계 2위·미호크와 Overall/7축 동급이라는 정량 선언은 아님.',
  },
  {
    id: 'mihawk-first-deferral-vista-agrees',
    chapter: '562',
    eventGroup: 'single-mihawk-vista-encounter',
    claim: '미호크가 먼저 검술 결착을 뒤로 미루자고 제안하고 비스타가 양쪽 모두에게 이익이 있다며 동의한다는 동일 회차 대사 기록이 교차한다.',
    status: 'multi-source-corroborated',
    sourceRefs: [
      { url: 'https://lostneito.blog15.fc2.com/blog-entry-4.html', type: 'contemporary-secondary-transcription', note: 'Ch.562 당시 일본어 대사 재현' },
      { url: 'https://blog.livedoor.jp/hanasakia/archives/51350848.html', type: 'contemporary-secondary-transcription', note: 'Ch.562 발매 당시 일본어 감상 및 양측 대사 재현' },
      { url: 'https://www.grandlinearchives.com/chapters/562', type: 'chapter-page-indexed-secondary', note: 'Ch.562 p.11에서 교전 연기를 기술' },
    ],
    verifiedLimit: '선제 제안 화자는 강하게 교차 확인되지만 풀페이지 컷/대사를 직접 대조한 것은 아님. 휴전=확정 무승부 또는 동일 최대출력 아님.',
  },
  {
    id: 'pacifista-strategic-encirclement',
    chapter: '562',
    eventGroup: 'single-mihawk-vista-encounter',
    claim: '교전 연기 시점의 전장에는 해군 파시피스타의 포위 투입, 전장 이동, 해적 진군 등 양측의 작전적 이유가 있었다.',
    status: 'multi-source-corroborated',
    sourceRefs: [
      { url: 'https://one-piece.com/anime/471/index.html', type: 'official-supplementary', note: '공식 TV471 시놉시스: 약 1시간 30분 경과 후 파시피스타로 협공' },
      { url: 'https://www.grandlinearchives.com/chapters/562', type: 'chapter-page-indexed-secondary', note: 'Ch.562 pp.2-11의 파시피스타 전선 및 교전 연기 기술' },
    ],
    verifiedLimit: '군사적 맥락은 확실하나 각 검객이 정확히 어느 개별 요인을 최우선으로 생각했는지 내면 동기까지 확정 불가.',
  },
  {
    id: 'official-vista-and-mihawk-equal-sword-exchange',
    chapter: 'profile',
    eventGroup: 'official-comparator',
    claim: '공식 캐릭터 프로필은 미호크와 호각으로 겨룰 정도의 비스타 이도류 검술을 명시하며, 2011년 공식 피규어 상품 소개도 그 대결을 대등한 공방으로 표현한다.',
    status: 'official-explicit',
    sourceRefs: [
      { url: 'https://one-piece.com/character/bista/index.html', type: 'official-supplementary', note: '캐릭터 직접 공식 설정·가장 높은 가중치' },
      { url: 'https://one-piece.com/figure/o1623/index.html', type: 'official-supplementary', note: '2011년 공식 상품 소개·마케팅 서술이므로 프로필에 비해 독립 결정력 낮음' },
      { url: 'https://one-piece.com/character/Dracule_Mihawk/index.html', type: 'official-supplementary', note: '세계 최강의 검사 공식 위상 병존' },
    ],
    verifiedLimit: '공식 자료들은 동일 정상결전 사건을 재서술한다. +3/Final90의 0~100 산식, 7축 동등성, 별개 2회의 독립 교전은 입증하지 않는다.',
  },
]

export const v0168SourceOpenQuestions = [
  '정식 일본어/번역본 561화 전체 컷에서 지시 화자와 검격 첫 진입의 순서·위치가 실제로 일치하는가?',
  '562화 정식 원작에서 휴전 대사의 화자·말투·페이지와 추가 검격 유무는 어떠한가?',
  '비스타의 두 칼 운용별 실질 기술 차이·받아친 검격의 위력·미호크의 의도/패기 사용을 별도 컷에서 확인할 수 있는가?',
  '비스타 검술과 미호크·조로의 순수 검술/패기 융합을 동일 축으로 비교할 만한 충분한 독립 관찰값이 있는가?',
  'Ch.574의 무장색 사용이 Technique Base86에 이미 포함된 통상 사용과 구별되는 예외적 Raw2의 독립 효과인가?',
] as const
