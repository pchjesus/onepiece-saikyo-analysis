/**
 * v0.4.27 — approved Jinbe Defense 82 / Stamina 83.
 * Preserve historical sampleEvaluations/sampleEvidence/sampleBattles and the frozen v0.3.3 baseline.
 * Original manga panels were not independently re-read in this change. Chapter scene indexing
 * is cross-checked against contemporary chapter summaries and ONE PIECE.com TV synopses.
 */
import type { Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Battle } from '../../domain/battle/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'

export const v0427JinbeEvidence: Evidence[] = [
  {
    id: 'evidence-v0427-jinbe-akainu-block-574',
    battleId: 'marineford-jinbe-akainu',
    subjectCharacterId: 'jinbe',
    source: {
      type: 'supplementary',
      reference: 'ONE PIECE manga Ch.574 scene index; ONE PIECE.com TV483 context',
      description: 'https://one-piece.com/anime/483/index.html',
    },
    evidenceStrength: 'moderate',
    fact: '아카이누가 에이스에게 다시 공격하려는 순간 징베가 앞으로 나서 마그마 공격을 일시 저지했으며, 이 과정에서 손·신체에 화상을 입었다고 동시대 화별 서술에서 확인된다.',
    supportedAbilities: ['직접 공격 차단', '동료 보호', '마그마 공격 대응'],
    statContributions: [
      { stat: 'defense', role: 'primary', note: '강한 공격을 일시적으로 저지한 실제 차단 성과. 손상도 발생하여 완전 무피해 방어가 아님.' },
      { stat: 'stamina', role: 'context', note: '동료 보호 목적의 위험 감수로, 독립적인 장기전 지속력 점수는 부여하지 않음.' },
    ],
    interpretation: '대장급 공격에 대한 단발 저지 능력은 긍정하되, 반복 무효화·동급 방어력으로 일반화하지 않는다.',
    evaluationImpact: 'v0.4.27 Defense Base 78→82의 신규 교차 확인 근거 중 하나. 별도 예외 Haki Raw를 더하지 않는다.',
    uncertainty: '해당 만화 원본 컷을 이번 변경에서 직접 재열람하지 못했다. 574화 장면은 동시대 화별 서술과 공식 TV483 주변 맥락으로 교차 확인했으며, TV483 공식 소개 자체가 징베의 구체적 차단 동작을 직접 설명하지는 않는다. 무장색 사용과 그 독립 기여량도 확인되지 않는다.',
  },
  {
    id: 'evidence-v0427-jinbe-akainu-injury-578',
    battleId: 'marineford-jinbe-akainu',
    subjectCharacterId: 'jinbe',
    source: {
      type: 'supplementary',
      reference: 'ONE PIECE manga Ch.578 scene index; ONE PIECE.com TV487–488 pursuit context',
      description: 'https://one-piece.com/anime/488/index.html',
    },
    evidenceStrength: 'moderate',
    fact: '루피를 안고 탈출하던 징베는 아카이누의 마그마 공격에 관통상을 입었다. 피격 뒤에도 루피를 보호하려 했고 크로커다일 등 외부 인물의 개입으로 탈출 기회가 이어졌다.',
    supportedAbilities: ['중상 후 보호 행동', '피해 지속', '동료 구조'],
    statContributions: [
      { stat: 'stamina', role: 'secondary', note: '중대한 부상 및 위협 이후 보호 목적을 지속한 근거. 부상 후 완전한 전투 수행과 동일시하지 않음.' },
      { stat: 'defense', role: 'context', note: '대장급 공격을 직접 허용한 명확한 방어 한계로, 차단 성공과 분리해 기록.' },
    ],
    interpretation: '관통상을 버틴 사실은 Stamina의 보조 근거다. 차단이나 피해 경감 성공으로 다시 가산하지 않는다.',
    evaluationImpact: 'v0.4.27 Stamina 80→83 평가의 보조 맥락이며 Defense 상한 제한. 552화의 5일 결투가 Stamina의 주 근거다.',
    uncertainty: '만화 578화 전체 컷 미재열람. 공식 TV487·488은 아카이누의 추격과 전장 개입을 보조 확인하며 관통상 동작은 별도의 화별 서술을 대조했다. 외부 구조, 피로와 회복시간을 정량화하지 않는다.',
  },
]

/** Keep the existing ID meaningful: chapter 575 is Marco's interception and Jinbe's evacuation, not the 578 injury. */
export function applyV0427JinbeEvidenceCorrection(evidence: Evidence): Evidence {
  if (evidence.id !== 'evidence-jinbe-akainu-575') return evidence
  if (evidence.subjectCharacterId !== 'jinbe' || evidence.battleId !== 'marineford-jinbe-akainu') {
    throw new Error('v0.4.27 Jinbe original evidence identity drift')
  }
  return {
    ...evidence,
    source: { ...evidence.source, reference: 'One Piece Manga Chapter 575', description: '에이스 사망 후 마르코의 아카이누 요격과 징베의 루피 대피' },
    fact: '루피가 정신적 충격으로 행동할 수 없는 상황에서 마르코가 아카이누의 공격을 막고, 징베는 루피를 안고 탈출을 시작했다.',
    supportedAbilities: ['보호 전투', '부상 이전 대피 행동'],
    statContributions: [
      { stat: 'stamina', role: 'context', note: '루피를 안고 이동한 구출 임무의 맥락. 578화의 중상 후 행동이나 574화의 공격 차단을 이 장면에 귀속하지 않음.' },
      { stat: 'defense', role: 'context', note: '575화의 직접 아카이누 공격 차단은 마르코의 행동이며 징베의 방어 성공으로 합산하지 않음.' },
    ],
    interpretation: '보호·탈출 임무의 시작 장면이다. 징베의 직접 차단(574화)과 중상 피격(578화)은 별개 Evidence로 분리한다.',
    evaluationImpact: 'v0.4.27 원래 575화 ID 유지·화수별 인과 분리. 새로운 독립 점수 보너스 없음.',
    uncertainty: '해당 화 원작 컷을 이번 변경에서 독립 전수 열람하지 않았으며 공식 TV484 설명과 공개 화별 서술을 교차 참고했다.',
  }
}

/** Battle context is a current-data overlay; previous historical battle remains intact. */
export function applyV0427JinbeBattleContext(battle: Battle): Battle {
  if (battle.id !== 'marineford-jinbe-akainu') return battle
  return {
    ...battle,
    title: '정상결전 — 징베의 아카이누 저지(574화)와 루피 보호·탈출(575–578화)',
    restrictions: '아카이누 격파가 아니라 에이스·루피 보호와 탈출이 목표. 574화 직접 차단과 578화 중상 피격은 서로 다른 공방이며 장시간 독립 1대1이 아님.',
    externalFactors: '575화에는 마르코가 아카이누의 공격을 직접 막아 징베에게 대피를 맡겼다. 578화 이후 크로커다일 등 외부 구조 개입이 이어졌다.',
  }
}

export function applyV0427JinbeRecalibration(evaluation: Evaluation): Evaluation {
  if (evaluation.characterId !== 'jinbe') return evaluation
  if (evaluation.id !== 'evaluation-jinbe' || evaluation.evaluationDataVersion !== 'evaluation-0.1.62-haki-independent-review') {
    throw new Error('v0.4.27 unexpected Jinbe evaluation identity/version')
  }
  const defense = evaluation.items.find(i => i.stat === 'defense')
  const stamina = evaluation.items.find(i => i.stat === 'stamina')
  if (!defense || !stamina || evaluation.items.length !== 7 ||
      defense.baseScore !== 78 || getRawHakiContributionTotal(defense) !== 4 || getFinalStatScore(defense) !== 80 ||
      stamina.baseScore !== 80 || getRawHakiContributionTotal(stamina) !== 0 || getFinalStatScore(stamina) !== 80) {
    throw new Error('v0.4.27 Jinbe baseline Base/Raw/Final drift')
  }
  const items = evaluation.items.map((item): EvaluationItem => {
    if (item.stat !== 'defense' && item.stat !== 'stamina') return item
    const isDefense = item.stat === 'defense'
    const revised: EvaluationItem = {
      ...item,
      baseScore: isDefense ? 82 : 83,
      readiness: 'E1',
      rationale: isDefense
        ? '574화 아카이누의 마그마 공격을 몸으로 잠시 저지한 성과, 890화 빅맘의 공격을 무장색으로 받아낸 순간 대응, 1018화 후즈후의 손가락을 손상시킨 경화 방어를 종합해 Defense 82. 아카이누 저지 당시 화상·578화 관통상, 빅맘에게 밀린 한계를 함께 반영한다. 통상 경화 방어가 이미 Base에 포함되어 있으므로 독립적인 예외 효과가 입증되지 않은 종전 Raw4는 제거. 원작 해당 컷은 이번 변경에서 직접 재열람하지 않아 장면별 상세 기전은 잠정이다.'
        : '에이스와 5일간 싸워 함께 쓰러진 552화의 명시적 장기 결투를 핵심 근거로 Stamina 83. 578화 아카이누 관통상과 루피 보호 지속을 보조 근거로만 평가하며, 575화의 대피 시작·후즈후전은 맥락 근거다. 중상 후 생존을 방어 차단이나 정상적인 고강도 전투 지속으로 과장하지 않고, 잭의 교대 상대 5일 전투와 후속 부상 재출전 수준에는 미치지 않는 잠정값이다.',
      evidenceIds: [...new Set([
        ...item.evidenceIds,
        'evidence-v0427-jinbe-akainu-block-574',
        'evidence-v0427-jinbe-akainu-injury-578',
      ])],
      hakiContributions: isDefense ? [] : item.hakiContributions.map(c => ({...c, evidenceIds:[...c.evidenceIds]})),
    }
    const score = getFinalStatScore(revised)
    if (score !== (isDefense ? 82 : 83)) throw new Error('v0.4.27 Jinbe final score drift: ' + item.stat)
    return { ...revised, score }
  })
  return { ...evaluation, evaluationDataVersion: 'evaluation-v0.4.27-jinbe-defense82-stamina83-hybrid-review', items }
}
