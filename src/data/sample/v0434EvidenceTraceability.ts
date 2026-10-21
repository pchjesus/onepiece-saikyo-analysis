import type { Evidence } from '../../domain/evidence/types'

/**
 * v0.4.34 — Current-only Evidence traceability repairs (T1–T3).
 * Frozen sampleEvidence and v0.3.3 snapshots remain unchanged.
 * This function does not revise factual observations, Evidence IDs/links,
 * numerical Evaluation fields, readiness or the calculation model.
 */
const vistaId = 'evidence-vista-mihawk-561-562'
const queenId = 'evidence-queen-cybernetics-1028-1034'
const smoothieId = 'evidence-smoothie-pursuit-894'

const previousQueenIqNote = '수단은 많지만 자기 무장 오발과 후반 주의 분산은 높은 전투 판단 평가의 상한 요소다.'
const currentQueenIqNote = '다양한 무장을 사용할 수 있으나 브라키오 런처의 자기 피격은 장비 발동·안전성의 문제다. 투명화는 정상 작동했고, 사적인 이유로 오소메를 의도적으로 폭행하며 상디와의 전투 목표에서 이탈한 것은 별도의 전투 판단 문제다.'

const previousSmoothieImpact = 'Attack 76과 Technique·Versatility의 주된 직접 근거로 사용한다.'
const currentSmoothieImpact = 'v0.4.31 현재 Attack 80(종전 76): 수분 흡수 뒤 반복한 대형 원거리 참격의 출력·사거리 위협을 평가한 것이며, 상위 전투원에 대한 직접 명중 피해는 미확인이다. Technique에는 흡수·강화·방출의 제어, Versatility에는 서로 다른 실전 역할의 근거를 제공한다.'

export function applyV0434EvidenceTraceability(evidence: Evidence): Evidence {
  switch (evidence.id) {
    case vistaId: {
      // The duel supports *inferred* distance/timing decisions, not proof of
      // independent strategic planning. Do not upgrade readiness or score.
      if (evidence.subjectCharacterId !== 'vista' ||
          evidence.statContributions.some(c => c.stat === 'combatIQ') ||
          !evidence.statContributions.some(c => c.stat === 'techniqueMastery')) {
        throw new Error('v0.4.34 Vista historical Evidence contribution drift')
      }
      return {
        ...evidence,
        statContributions: [
          ...evidence.statContributions,
          {
            stat: 'combatIQ',
            role: 'secondary',
            note: '미호크 추격을 차단할 시점과 검격 교환 중 거리·타이밍 판단에 대한 기능적 추론의 보조 근거다. 독자적 전략 설계나 반복 전술 간파가 직접 관측됐다는 뜻은 아니다.',
          },
        ],
      }
    }
    case queenId: {
      if (evidence.subjectCharacterId !== 'queen') {
        throw new Error('v0.4.34 Queen historical Evidence subject drift')
      }
      const count = evidence.statContributions.filter(c => c.stat === 'combatIQ' && c.note === previousQueenIqNote).length
      if (count !== 1) {
        throw new Error('v0.4.34 Queen historical Combat IQ Evidence note drift')
      }
      return {
        ...evidence,
        statContributions: evidence.statContributions.map(c =>
          c.stat === 'combatIQ' && c.note === previousQueenIqNote
            ? { ...c, note: currentQueenIqNote }
            : c
        ),
      }
    }
    case smoothieId: {
      if (evidence.subjectCharacterId !== 'smoothie' ||
          evidence.evaluationImpact !== previousSmoothieImpact) {
        throw new Error('v0.4.34 Smoothie historical Evidence impact drift')
      }
      return { ...evidence, evaluationImpact: currentSmoothieImpact }
    }
    default:
      return evidence
  }
}
