import type { Character, CharacterMembership, Group, SpecialCombatTraitCategory } from '../../domain/character/types'
import type { Evaluation, EvaluationItem, CombatStat } from '../../domain/evaluation/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Battle } from '../../domain/battle/types'
import { getFinalStatScore } from '../../domain/evaluation/score'
import { wanoSeeds } from './wanoSeeds'

/** Additive, fully referenced v0.1.45 expansion. No pre-existing evaluation mutation here. */
export const wanoGroups: Group[] = [
  { id: 'kid-pirates', name: '키드 해적단', type: 'pirate-crew' },
  { id: 'akazaya-nine', name: '아카자야 9남자', type: 'historical' },
  { id: 'tobiroppo', name: '토비롯포', type: 'institution', parentGroupId: 'beasts-pirates' },
]

export const wanoMemberships: CharacterMembership[] = wanoSeeds.flatMap((seed) => {
  if (seed.group === 'kid-pirates') {
    return [{ characterId: seed.id, groupId: 'kid-pirates', role: seed.role, status: 'historical' as const,
      period: '엘바프 해역의 패배 직전까지 확인된 마지막 해적단; 후속 생사·재조직 미확인' }]
  }
  if (seed.group === 'akazaya-nine') {
    const former = seed.id === 'kanjuro'
    const deceased = seed.id === 'ashura-doji'
    return [{ characterId: seed.id, groupId: 'akazaya-nine', role: seed.role,
      status: (former ? 'former' : deceased ? 'historical' : 'current') as CharacterMembership['status'],
      period: former ? '오니가시마 기습 전 배신 사실 공개' : deceased ? '오니가시마에서 동료 보호 중 희생' : '와노 전투 이후 확인' }]
  }
  const drake = seed.id === 'x-drake'
  return [
    { characterId: seed.id, groupId: 'beasts-pirates', subgroup: '토비롯포',
      role: seed.role, status: drake ? 'former' as const : 'current' as const,
      period: drake ? '해군 SWORD 잠입 기간' : '오니가시마 전투 시점' },
    { characterId: seed.id, groupId: 'tobiroppo', role: '토비롯포',
      status: drake ? 'former' as const : 'current' as const,
      period: drake ? '위장 신분 활동기' : '오니가시마 전투 시점' },
    ...(drake ? [{ characterId: seed.id, groupId: 'marines',
      subgroup: 'SWORD', role: 'SWORD 대장', status: 'current' as const }] : []),
  ]
})

const categoryFor = (seed: typeof wanoSeeds[number]): SpecialCombatTraitCategory | null => {
  if (seed.id === 'killer') return 'other'
  if (['inuarashi', 'nekomamushi', 'kawamatsu'].includes(seed.id)) return 'race'
  if (['denjiro', 'ashura-doji', 'kikunojo'].includes(seed.id)) return null
  return seed.trait.includes('열매') || seed.trait.includes('동물계') ? 'devil-fruit' : 'equipment'
}

export const wanoCharacters: Character[] = wanoSeeds.map((seed): Character => {
  const traitCategory = categoryFor(seed)
  return {
    id: seed.id,
    name: seed.name,
    crewId: seed.id === 'x-drake' ? 'marines' : seed.group,
    knownAs: [],
    description: seed.group === 'kid-pirates'
      ? `키드 해적단 ${seed.role}. ${seed.fact} ${seed.context}`
      : seed.group === 'akazaya-nine'
        ? `광월 오뎅과 와노의 아카자야 9남자 출신. ${seed.fact} ${seed.context}`
        : `백수 해적단 토비롯포 기록. ${seed.fact} ${seed.context}`,
    combatProfile: {
      combatStyles: seed.style.split('·'),
      specialTraits: traitCategory === null ? [] : [{
        id: `special-wano-${seed.id}`,
        category: traitCategory,
        name: seed.trait,
        status: 'confirmed',
        description: seed.id === 'killer'
          ? '실패한 SMILE로 웃음 부작용만 확인되었으며 동물 변신과 열매 각성 능력을 얻지 않았다.'
          : `${seed.trait}을 전투나 임무에 활용한다. 실제 효과 및 제한은 개별 Evidence의 전투 조건을 참조한다.`,
        evidenceIds: [`evidence-wano-${seed.id}-profile`, `evidence-wano-${seed.id}-combat`],
        limitations: seed.context,
        uncertainty: 'Special 자체를 별도 숫자 보너스나 패기 Raw로 더하지 않는다.',
      }],
      haki: {
        characterId: seed.id,
        capabilities: [
          { type: 'armament', status: 'unclear', note: '이 평가에서 독립된 무장색 사용의 구체적 증거를 축별로 확정하지 않으므로 Raw 점수는 0으로 보존한다.' },
          { type: 'observation', status: 'unclear', note: '실전 반응과 견문색의 독립 기여를 임의로 분리하지 않는다.' },
          { type: 'conquerors', status: seed.hakiConquerors === 'conquerors' ? 'confirmed' : 'unclear',
            note: seed.hakiConquerors === 'conquerors' ? '키드의 패왕색 보유는 원작 카이도 언급과 교차 확인하며 고급 패휘감은 미확인이다.' : '패왕색 보유를 공식 확인하지 못하므로 미확인으로 기록한다.',
            infusion: { status: 'unclear', note: '패휘감 사용이 확인되지 않아 점수에 반영하지 않는다.' } },
        ],
      },
      sources: [
        { label: 'ONE PIECE.com 인물 프로필', reference: seed.profile },
        { label: 'ONE PIECE.com 공식 애니 전투 요약', reference: seed.fight },
      ],
    },
  }
})

export const wanoBattles: Battle[] = wanoSeeds.map((seed, idx): Battle => ({
  id: `battle-wano-${seed.id}`,
  title: `${seed.name} — 공식 전투 근거 대조`,
  chronologyOrder: 400 + idx,
  combatStructure: ['kinemon','denjiro','ashura-doji','kawamatsu','raizo'].includes(seed.id)
    ? 'multiple-vs-one' : ['kid','ulti','x-drake'].includes(seed.id)
      ? 'multiple-vs-multiple' : '1v1',
  combatPurpose: seed.group === 'akazaya-nine'
    ? '오뎅의 뜻 계승, 카이도 세력 저지 또는 동료 보호'
    : seed.group === 'kid-pirates' ? '와노·엘바프에서 해적단 전력 보존 및 교전 수행'
      : '오니가시마 전투 중 각자의 임무 또는 상대 전투원 제압',
  combatIntent: 'unknown',
  environment: seed.group === 'kid-pirates' ? '신세계 해역·와노쿠니' : '와노쿠니 오니가시마 등',
  restrictions: seed.context,
  externalFactors: '공식 에피소드 요약은 장면 전체와 모든 참전 인원의 세부 상태를 일대일 재구성하지 않는다. 원작 해당 만화 장면 직접 감수가 필요하다.',
  result: seed.id === 'killer' || ['inuarashi','nekomamushi','kikunojo'].includes(seed.id)
    ? 'victory' : ['kid','whos-who','sasaki','black-maria','ulti','page-one','kanjuro'].includes(seed.id)
      ? 'defeat' : 'unknown',
  participantIds: [],
}))

const stats: CombatStat[] = ['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility']
export const wanoEvidence: Evidence[] = wanoSeeds.flatMap((seed): Evidence[] => ([
  {
    id: `evidence-wano-${seed.id}-profile`,
    battleId: `battle-wano-${seed.id}`,
    subjectCharacterId: seed.id,
    source: { type: 'supplementary' as const, reference: `ONE PIECE.com 인물 설정 — ${seed.profile}` },
    evidenceStrength: 'moderate' as const,
    fact: `${seed.name}의 소속·능력·기본 전투 수단은 공식 인물 프로필에 기재돼 있다. ${seed.style} / ${seed.trait}.`,
    supportedAbilities: [seed.style, seed.trait],
    statContributions: stats.map((stat, i) => ({
      stat,
      role: (['techniqueMastery','versatility'].includes(stat) ? 'secondary' : 'context') as 'secondary'|'context',
      note: `${stat}의 배경 자료일 뿐 열매 종류·칭호·소속만으로 ${seed.score[i]}점을 자동 산출하지 않는다.`,
    })),
    interpretation: '인물 정보는 능력의 존재를 입증하며 개별 전투 성과와 점수는 별개이다.',
    evaluationImpact: '특수 전투 요소의 확인과 기존 7개 축 점수의 정성적 참고에만 사용한다.',
    uncertainty: '능력 종류 및 구성원 지위만으로 공격력·방어력·체력·판단력 등 특정 점수 수준이 직접 확인되지는 않는다.',
  },
  {
    id: `evidence-wano-${seed.id}-combat`,
    battleId: `battle-wano-${seed.id}`,
    subjectCharacterId: seed.id,
    source: { type: 'supplementary' as const, reference: `ONE PIECE.com 공식 애니 에피소드 소개 — ${seed.fight}` },
    evidenceStrength: 'moderate' as const,
    fact: seed.fact,
    supportedAbilities: [seed.style, '교전 당시 행동과 조건'],
    statContributions: stats.map((stat, i) => ({
      stat,
      role: (seed.readiness[i] === 'E3' ? 'context' : 'secondary') as 'context'|'secondary',
      note: seed.notes[i],
    })),
    interpretation: '공식 에피소드 요약에 명시된 사실을 해당 교전의 제한 조건과 분리하여 해석한다.',
    evaluationImpact: '해당 7축 Draft 숫자는 단독 사실이 아니라 기존 비교군과 판단한 가설적 점수이며 별도의 피해량·패기 보너스는 만들지 않는다.',
    uncertainty: seed.context + ' 추가 원작 만화 페이지 대조 이전의 E2/E3 잠정 평가다.',
  },
]))

export const wanoEvaluations: Evaluation[] = wanoSeeds.map((seed): Evaluation => ({
  id: `evaluation-wano-${seed.id}`,
  characterId: seed.id,
  evaluationDataVersion: 'evaluation-0.1.45-multi-group-evidence-draft',
  status: 'draft',
  subjectState: { id: 'wano-record', label: '원작 근거 기반 초기 Draft',
    note: '공식 프로필과 에피소드 요약을 교차한 초기 비교값이다. 조건부 능력과 집단전·특수 상성은 점수와 분리했다.' },
  isDefault: true,
  items: stats.map((stat, i): EvaluationItem => {
    const draft: EvaluationItem = {
      stat,
      baseScore: seed.score[i],
      score: seed.score[i],
      rationale: seed.notes[i] + ' ' + (seed.readiness[i] === 'E3'
        ? '추가 직접 근거가 부족하여 수치의 잠정성이 크며 낮은 능력을 확정하지 않는다.'
        : '비슷한 급의 기존 캐릭터와 대조해 초안으로 채택하며 공식 전투력 수치는 아니다.'),
      evidenceIds: [`evidence-wano-${seed.id}-combat`, `evidence-wano-${seed.id}-profile`],
      hakiContributions: [],
      readiness: seed.readiness[i],
    }
    return { ...draft, score: getFinalStatScore(draft) }
  }),
}))
