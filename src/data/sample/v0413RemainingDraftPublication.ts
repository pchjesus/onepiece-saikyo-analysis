/**
 * v0.4.13: publish the ONLY remaining unshown numeric character draft (Enel)
 * and the pending Kaku revision from the v0.4.9 ten-proposal review.
 *
 * Draft numbers are project estimates, not official manga power levels.
 * Immutable original 76 Evaluations and v0.3.3 baseline are not edited.
 */
import type { Character, CharacterMembership } from '../../domain/character/types'
import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import { COMBAT_STATS, type CombatStat, type Evaluation, type EvidenceReadiness } from '../../domain/evaluation/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

export const v0413EnelCharacter: Character = {
  id: 'enel',
  name: '에넬',
  crewId: 'skypiea',
  knownAs: [{ kind: 'title', name: '신 (자칭)', source: { label: 'ONE PIECE.com 에넬 공식 소개', reference: 'https://one-piece.com/character/Eneru/index.html' } }],
  description: '하늘섬 스카이피아를 지배했던 인물. 번개 자연계 고로고로 열매와 맨트라를 활용한다. 전투력 평가 시점은 하늘섬 편이며, 이후 성장과 미확인 패기를 가산하지 않는다.',
  combatProfile: {
    combatStyles: ['고로고로 열매', '전격·원거리 광역 공격', '맨트라와 전자파 감지', '금속 변형'],
    specialTraits: [{
      id: 'enel-rumble-fruit',
      category: 'devil-fruit',
      name: '고로고로 열매',
      status: 'confirmed',
      description: '전기를 이용하는 자연계 능력. 전격·이동·광역 탐지를 수행하지만 고무 상성 상대에게는 전격 공격이 통하지 않았다.',
      evidenceIds: ['evidence-v0413-enel-sky'],
      limitations: '고무 상대의 상성과 열매 능력 사용 조건을 분리; 모든 패기 사용자에게 공격력 88이 보장된다는 뜻이 아니다.',
      uncertainty: '직접 만화 컷 전수 검증은 아직 완료되지 않았다.',
    }],
    haki: {
      characterId: 'enel',
      capabilities: [
        { type: 'armament', status: 'unclear', note: '하늘섬 시점 무장색 사용 직접 확인 자료 없음. Raw0.' },
        { type: 'observation', status: 'confirmed', note: '하늘섬 맨트라(견문색 해당)와 광역 감지. 능력 확인은 별도 Haki Raw 가산을 의미하지 않음.' },
        { type: 'conquerors', status: 'unclear', note: '패왕색 사용 직접 확인 자료 없음. Raw0.' },
      ],
    },
    sources: [
      { label: 'ONE PIECE.com 캐릭터 소개 (공식 보조 출처)', reference: 'https://one-piece.com/character/Eneru/index.html' },
      { label: 'ONE PIECE.com 하늘섬 편 줄거리 (공식 보조 출처)', reference: 'https://one-piece.com/story/skypiea/index.html' },
      { label: 'ONE PIECE.com TV182 줄거리 (공식 보조 출처)', reference: 'https://one-piece.com/anime/182/index.html' },
    ],
  },
}

export const v0413EnelMembership: CharacterMembership = {
  characterId: 'enel', groupId: 'skypiea', role: '자칭 신 / 당시 스카이피아 지배자',
  status: 'historical', period: '하늘섬 편 당시',
}

/** Narrative-only battle context: no invented participant records. */
export const v0413EnelBattles: Battle[] = [
  {
    id: 'battle-v0413-enel-skypiea',
    title: '하늘섬 — 에넬의 전격 능력·광역 감지',
    chronologyOrder: 510,
    combatStructure: 'multiple-vs-multiple',
    combatPurpose: '하늘섬 지배 및 추격전에서 전격·감지 능력 활용',
    combatIntent: 'unknown',
    environment: '하늘섬',
    restrictions: '관측된 광역 전격 성과와 상위 패기 사용자에 대한 대인 피해를 구분',
    externalFactors: '맨트라·열매 능력 상호작용; 루피와의 고무 상성은 별도 사건에서 검토',
    result: 'unknown',
    participantIds: [],
  },
  {
    id: 'battle-v0413-enel-luffy',
    title: '하늘섬 — 에넬와 루피의 능력 상성',
    chronologyOrder: 520,
    combatStructure: '1v1',
    combatPurpose: '루피와의 교전 및 고무 상성 대응',
    combatIntent: 'unknown',
    environment: '하늘섬',
    restrictions: '루피의 전격 면역을 모든 상대에 일반화하지 않으며 패배 원인을 단일 저능력 증거로 환산하지 않음',
    externalFactors: '고무의 전격 면역, 루피의 변칙 대응, 전투 시점의 상성 차이',
    result: 'unknown',
    participantIds: [],
  },
]

export const v0413EnelEvidence: Evidence[] = [
  {
    id: 'evidence-v0413-enel-sky', battleId: 'battle-v0413-enel-skypiea',
    subjectCharacterId: 'enel',
    source: { type: 'supplementary', reference: 'ONE PIECE.com 공식 인물/하늘섬 소개', description: 'https://one-piece.com/story/skypiea/index.html' },
    evidenceStrength: 'moderate',
    fact: '에넬의 번개 자연계 능력은 전격·광역 공격·기동을 가능케 하며 맨트라를 전자파 감지와 연계한다.',
    supportedAbilities: ['고로고로 열매', '맨트라'],
    statContributions: (['attack','speed','techniqueMastery','versatility'] as const).map(stat => ({
      stat, role: 'secondary' as const,
      note: '하늘섬 당시 열매 출력·감지·기술 폭 정성 근거. 개별 축의 점수 규모를 확정하는 만화 컷 직접 계측 아님.',
    })),
    interpretation: '높은 전격 위력과 이동·탐지 범위를 강점으로 평가하되 개인 근접 반응 속도, 전투 판단력, 패기 Raw와 중복 가산하지 않는다.',
    evaluationImpact: 'v0.4.9에서 보류된 에넬 7축 88/72/72/88/84/70/87 검토용 점수를 사용자 요청에 따라 공개 잠정 평가로 표시.',
    uncertainty: '원작 전체 컷 및 한국어 정식본 직접 대조 미완료. 강자 상대 대인 공격 반복성과 고급 패기 방어 관통은 미확인.',
  },
  {
    id: 'evidence-v0413-enel-luffy', battleId: 'battle-v0413-enel-luffy',
    subjectCharacterId: 'enel',
    source: { type: 'supplementary', reference: 'ONE PIECE.com TV182', description: 'https://one-piece.com/anime/182/index.html' },
    evidenceStrength: 'moderate',
    fact: '루피의 고무 체질은 에넬의 번개 공격과 특별한 상성을 형성하며, 에넬은 예상 밖의 적과 싸웠다.',
    supportedAbilities: ['고로고로 열매', '맨트라'],
    statContributions: (['defense','stamina','combatIQ'] as const).map(stat => ({
      stat, role: 'context' as const, note: '상성·전술 대응의 해석 한계. 일반 방어/지구력 72를 정량 확증하는 자료가 아님.',
    })),
    interpretation: '상성 불리와 낯선 공격 양식을 분리하여 신체 방어·장기전·전투 IQ의 E3 잠정성을 유지한다.',
    evaluationImpact: '루피의 상성을 에넬의 모든 상대에 대한 약점으로 일반화하지 않고, 확인되지 않은 Haki Raw는 0으로 둔다.',
    uncertainty: '하늘섬 당시의 직접 장면에서 별개 적과의 장기전/신체 방어/적응을 정밀 계측할 독립 표본이 부족하다.',
  },
]

const enelDraftScores = [88,72,72,88,84,70,87] as const
const enelRationales = [
  '고로고로 열매의 전격·광역 출력은 매우 강력하지만 상위 패기 상대에 대한 독립 대인 손상은 미확인. 고무 상대 면역을 일반 상대에 확대하지 않는다.',
  '자연계 회피와 본체 피격 시 방어 능력을 구별하며, 상성 있는 루피전만으로 일반 방어력을 단정할 수 없어 잠정치로 보류.',
  '강한 체력·장기 고강도 교전의 독립 표본이 적다. 하늘섬 교전 결과에서 긴 소모전 지속력을 역산하지 않는다.',
  '번개 능력에 의한 순간 이동·기습·반응을 강점으로 보되 번개 전송 속도를 일반 육체 이동·반응 상한으로 환산하지 않는다.',
  '맨트라·전격·금속 활용과 능력 복합 운용을 평가하지만 실제 기술 다양성을 별도 Versatility 축과 중복 가산하지 않는다.',
  '감지 우위는 인정하되 루피의 고무 상성 및 예상 밖 상황에서 전술 전환의 한계를 고려한다. 지능 전체를 평가하는 것은 아니다.',
  '원거리·광역·고속 기동·감지·열과 금속 응용 등 독립 전투 활용 폭을 인정한다. 동일 전격의 파생 공격을 여러 별개 능력으로 세지 않는다.',
] as const

export const v0413EnelEvaluation: Evaluation = {
  id: 'evaluation-v0413-enel', characterId: 'enel',
  evaluationDataVersion: 'evaluation-v0.4.13-enel-v049-provisional',
  status: 'draft', isDefault: true,
  subjectState: {
    id: 'skypiea', label: '하늘섬 편 (잠정 평가)',
    note: 'v0.4.9 검토용 점수 채택. 해당 시점의 열매·맨트라 운용 기준, 패기 추가 Raw 없음. 정식 원작 컷 전수 검증 전.',
  },
  items: COMBAT_STATS.map((stat, index) => {
    const readiness: EvidenceReadiness = ['defense','stamina','combatIQ'].includes(stat) ? 'E3' : 'E2'
    const item = {
      stat, baseScore: enelDraftScores[index], score: enelDraftScores[index],
      rationale: enelRationales[index] + ' (원작 공식 수치가 아닌 v0.4.9 검토용 잠정안).',
      evidenceIds: ['defense','stamina','combatIQ'].includes(stat)
        ? ['evidence-v0413-enel-luffy'] : ['evidence-v0413-enel-sky'],
      hakiContributions: [], readiness,
    }
    return { ...item, score: getFinalStatScore(item) }
  }),
}

const kakuScores = [77,75,75,78,84,75,78] as const
const kakuRationales = [
  '에그헤드 각성 기린형·람각·검술 공격을 직접 보여주었으나 상위 상대에게 반복적인 결정적 유효타는 미확인. 기존 Attack73에서 검술·육식 결합 성과를 다시 반영한다.',
  '동물계 각성 및 공방은 방어에 이점이지만 스튜시 내부 기습을 정면 방어 실패로 보지 않는다. 기존 72에서 75로 제한적 조정.',
  '장기간 독립 고강도 교전 및 피로의 직접 표본 부족. 검토 초안에서도 Stamina75 E3를 그대로 유지.',
  '육식 기동·조로와의 짧은 교전 반응을 인정하되 조로 최고속과 동급이라고 보지 않아 75에서 78로 조정.',
  '람각·육식·이도류·기린 각성형의 실전 운용 정밀도를 재검토해 79에서 84로 조정. 동일 체계 파생 기술 수를 중복 산정하지 않는다.',
  '세라핌 상대 일시 협동을 제안한 상황 판단은 확인되나, 루나리아 특성에 대한 후속 설명은 조로의 공로. 반복 전술 표본 부족으로 E3 유지.',
  '동물계 각성·육식·이도류·근중거리 람각 전환을 반영하되 하나의 근접 교전 체계의 파생 기술을 과도하게 셈하지 않는다.',
] as const

/** Preserve original sampleEvaluations[...kaku] source; only current repository view is revised. */
export function applyV0413KakuDraft(evaluation: Evaluation): Evaluation {
  if (evaluation.characterId !== 'kaku') return evaluation
  return {
    ...evaluation,
    evaluationDataVersion: 'evaluation-v0.4.13-kaku-v049-provisional',
    status: 'draft',
    items: COMBAT_STATS.map((stat,index) => {
      const previous = evaluation.items.find(item => item.stat === stat)
      if (!previous) throw new Error('Kaku missing original stat: ' + stat)
      const modified = {
        ...previous,
        baseScore: kakuScores[index],
        rationale: kakuRationales[index] + ' (v0.4.9 검토 초안을 사용자가 공개 승인; 원작 컷 직접 재검증 및 정밀 감사 대기).',
        hakiContributions: [...previous.hakiContributions],
        evidenceIds: [...previous.evidenceIds],
      }
      return { ...modified, score: getFinalStatScore(modified) }
    }),
  }
}
