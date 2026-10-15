import type { Character, CharacterMembership } from '../../domain/character/types'

/**
 * v0.4.11: user-approved character and portrait registration only.
 * Eight profiles are deliberately UNRATED pending a later assessment.
 * No Evidence, Battle, Evaluation, Raw Haki or matchup data is fabricated.
 */
const seeds = [
  { id: 'guernica', name: '게르니카', groupId: 'cp0', role: 'CP0 요원',
    description: 'CP0의 가면 쓴 첩보 요원. 와노쿠니에서 임무를 수행하며 드레이크와 충돌했고, 루피·카이도의 싸움에 개입했다.',
    combatStyles: ['육식', '근접 체술', '첩보·기습'],
    source: 'https://one-piece.com/character/Guernika/index.html' },
  { id: 'maha', name: '마하', groupId: 'cp0', role: 'CP0 요원',
    description: 'CP0의 가면 쓴 요원. 와노쿠니에서 이조와 교전했다. 교전 당시 이조의 누적 피해와 전장의 상황을 분리해 평가해야 한다.',
    combatStyles: ['근접 전투', '임무 수행', '협동 교전'],
    source: 'https://one-piece.com/anime/62441/index.html' },
  { id: 'usopp', name: '우솝', groupId: 'straw-hat-pirates', role: '저격수',
    description: '밀짚모자 일당의 저격수. 팝그린과 특수 탄환을 활용하며, 드레스로자에서 장거리 저격으로 동료를 지원했다.',
    combatStyles: ['장거리 저격', '팝그린', '전술 지원'],
    source: 'https://one-piece.com/character/usopp/index.html' },
  { id: 'nami', name: '나미', groupId: 'straw-hat-pirates', role: '항해사',
    description: '밀짚모자 일당의 항해사. 크리마 택트로 기후 현상을 응용해 전투하며 제우스와 함께 공격을 운용한다.',
    combatStyles: ['기상 기술', '클리마 택트', '제우스 연계'],
    source: 'https://one-piece.com/character/nami/index.html' },
  { id: 'chopper', name: '토니토니 쵸파', groupId: 'straw-hat-pirates', role: '선의',
    description: '밀짚모자 일당의 의사. 사람사람 열매 능력으로 다양한 형태로 변신하며 럼블볼을 사용한다.',
    combatStyles: ['동물계 형태 전환', '럼블볼', '몬스터 포인트'],
    source: 'https://one-piece.com/character/chopper/index.html' },
  { id: 'robin', name: '니코 로빈', groupId: 'straw-hat-pirates', role: '고고학자',
    description: '밀짚모자 일당의 고고학자. 꽃꽃 열매로 몸의 일부를 피워내 적을 포박하며 데모니오 플뢰르를 사용한다.',
    combatStyles: ['꽃꽃 열매', '관절기·구속', '데모니오 플뢰르'],
    source: 'https://one-piece.com/character/robin/index.html' },
  { id: 'franky', name: '프랑키', groupId: 'straw-hat-pirates', role: '조선공',
    description: '밀짚모자 일당의 조선공이자 사이보그. 병기와 빔 공격을 사용하고 프랑키 장군을 운용한다.',
    combatStyles: ['사이보그 병기', '라디칼 빔', '프랑키 장군'],
    source: 'https://one-piece.com/character/franky/index.html' },
  { id: 'brook', name: '브룩', groupId: 'straw-hat-pirates', role: '음악가',
    description: '밀짚모자 일당의 음악가. 황천황천 열매로 부활한 해골로 검술·냉기·음악 및 영혼 능력을 사용한다.',
    combatStyles: ['속검', '냉기 기술', '영혼 능력', '음악'],
    source: 'https://one-piece.com/character/brook/index.html' },
] as const

export const v0411Characters: Character[] = seeds.map(seed => ({
  id: seed.id,
  name: seed.name,
  crewId: seed.groupId,
  knownAs: [],
  description: seed.description,
  combatProfile: {
    combatStyles: [...seed.combatStyles],
    // Detailed special traits, capability labels and scene links will be
    // audited with the later full evaluation; do not pre-authorize a score.
    specialTraits: [],
    haki: { characterId: seed.id, capabilities: (['armament', 'observation', 'conquerors'] as const).map(type => ({
      type,
      status: 'unclear' as const,
      note: 'v0.4.11 인물 선등록 단계. 패기 보유·활용의 근거별 재검토 및 점수 반영은 후속 평가에서 진행.',
    })) },
    sources: [{ label: 'ONE PIECE.com · 프로필·공식 보조자료 (상세 검토 예정)', reference: seed.source }],
  },
}))
export const v0411Memberships: CharacterMembership[] = seeds.map(seed => ({
  characterId: seed.id,
  groupId: seed.groupId,
  role: seed.role,
  status: 'current',
}))
