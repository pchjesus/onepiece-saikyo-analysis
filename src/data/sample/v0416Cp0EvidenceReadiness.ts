/**
 * v0.4.16, v0.5.0 Stage 2A: two CP0 members' source-sufficiency review.
 *
 * Only the five user-approved readiness revisions are applied to live views.
 * No Battle / Evidence IDs are created. The v0.4.12 historical objects remain
 * unmodified, as do all scores, Haki contributions and the calculation model.
 *
 * ONE PIECE.com TV1068 describes Izo finishing Maha while suffering a fatal
 * wound, not independent speed, technique, tactical-IQ or role-switching feats.
 * TV1069 documents Guernica's Shigan/Tekkai and assigned interception, but
 * executing an order alone cannot justify an E2 independent Combat IQ rating.
 * The source remains supplementary, NOT directly manga-panel checked.
 */
import type { CombatStat, Evaluation } from '../../domain/evaluation/types'
import type { Evidence } from '../../domain/evidence/types'

type ScopedChange = { evidenceId: string; rationale: string; evidenceNote: string }
type Cp0Id = 'guernica' | 'maha'

export const v0416Cp0AuditChanges: Record<Cp0Id, Partial<Record<CombatStat, ScopedChange>>> = {
  maha: {
    speed: {
      evidenceId: 'evidence-v0412-maha-0',
      rationale: 'TV1068 공식 요약은 이조와 마하의 결착 및 치명상은 전하지만 마하의 이동·회피·반응 속도에 관한 독립적인 동작·비교 표본은 제시하지 않는다. CP0 소속이나 결착 결과를 신체 Speed 77의 직접 근거로 삼지 않는다. 기존 점수는 사용자 추가 승인 전 유지하며 E3 잠정으로 표시한다.',
      evidenceNote: 'TV1068은 결착의 맥락만 제공. 마하의 독립 이동·회피·반응 속도는 이 출처에서 확인되지 않아 직접 Speed 증거로 사용하지 않음.',
    },
    techniqueMastery: {
      evidenceId: 'evidence-v0412-maha-0',
      rationale: 'TV1068 공식 요약에서는 이조와의 결착은 확인되지만 마하가 사용한 구체적 기술이나 정밀한 운용 과정은 확인되지 않는다. CP0 소속에게 다른 요원의 육식 기술을 귀속하거나 결과에서 Technique 80을 역산하지 않는다. E3 잠정으로 표시하되 점수는 유지한다.',
      evidenceNote: '요약에 마하 개인의 구체적인 기술·숙련 동작이 명시되지 않아 Technique 숙련도에는 교전 정황의 context 역할만 부여.',
    },
    combatIQ: {
      evidenceId: 'evidence-v0412-maha-0',
      rationale: '전투 결착만으로 마하가 고안한 전술·상대 분석·상황별 대응의 구체적인 과정을 확인할 수 없다. 조직 임무 수행을 개인 Combat IQ 72의 독립 근거로 자동 환산하지 않는다. E3 잠정으로 표시하되 점수 변경은 보류한다.',
      evidenceNote: 'TV1068 요약에는 마하가 독자적으로 선택한 전술이 확인되지 않으므로 Combat IQ의 직접·간접 성과가 아니라 전황 context로만 연결.',
    },
    versatility: {
      evidenceId: 'evidence-v0412-maha-0',
      rationale: '확인된 교전 결과만으로 여러 사거리·역할·전투 수단을 전환했다는 사실이 성립하지 않는다. CP0 일반 임무 유형을 마하 개인의 Versatility 성과로 귀속하지 않고 70점은 기존 잠정값으로 유지한다. E3.',
      evidenceNote: '다양한 역할·전투 방식 전환을 마하 개인이 실제 수행했다는 공식 요약 근거가 없어 Versatility에는 context만 연결.',
    },
  },
  guernica: {
    combatIQ: {
      evidenceId: 'evidence-v0412-guernica-0',
      rationale: 'TV1069에서 드레이크 기습 후 지건 반격과 철괴를 통한 루피/카이도 격돌 개입은 확인된다. 이는 구체적인 임무 수행·기술 운용의 증거지만 오로성 명령에 따른 개입 자체가 독립적 전술 설계·우월한 판단을 입증하지는 않는다. 루피가 받은 카이도의 타격 결과를 게르니카의 지능·공격력으로 귀속하지 않는다. Combat IQ 80은 유지하되 E3 잠정으로 재분류한다.',
      evidenceNote: 'TV1069 지건 반격·철괴 개입은 확인되나 상급자 명령의 실행과 게르니카 독자 전술 판단은 구별. Combat IQ 축에는 source context만 연결.',
    },
  },
}

export function applyV0416Cp0EvaluationAudit(evaluation: Evaluation): Evaluation {
  if (evaluation.characterId !== 'maha' && evaluation.characterId !== 'guernica') return evaluation
  const changes = v0416Cp0AuditChanges[evaluation.characterId]
  return {
    ...evaluation,
    evaluationDataVersion: 'evaluation-v0.4.16-cp0-stage2a-evidence-readiness',
    subjectState: evaluation.subjectState
      ? { ...evaluation.subjectState, note: (evaluation.subjectState.note ?? '') +
        ' v0.5.0 Stage 2A: 일부 축 E2→E3 근거 충분도 보수 조정, 점수와 원작 전투 상황·Haki Raw는 유지. TV 공식 시놉시스는 만화 컷 전수 직접 검증이 아님.' }
      : undefined,
    items: evaluation.items.map(item => {
      const change = changes[item.stat]
      return change ? {
        ...item,
        readiness: 'E3' as const,
        rationale: change.rationale,
      } : item
    }),
  }
}

export function applyV0416Cp0EvidenceAudit(evidence: Evidence): Evidence {
  if (evidence.subjectCharacterId !== 'maha' && evidence.subjectCharacterId !== 'guernica') return evidence
  const changes = v0416Cp0AuditChanges[evidence.subjectCharacterId]
  const applicable = Object.entries(changes).filter(([,change]) => change?.evidenceId === evidence.id)
  if (!applicable.length) return evidence
  return {
    ...evidence,
    statContributions: evidence.statContributions.map(contribution => {
      const change = changes[contribution.stat]
      return change?.evidenceId === evidence.id
        ? { ...contribution, role: 'context' as const, note: change.evidenceNote }
        : contribution
    }),
    uncertainty: evidence.uncertainty +
      ' Stage 2A: 해당 축에 대한 공식 시놉시스의 언급이 결과/임무 정황에 한정됨. 개인 동작·전술·장기전은 원작 컷 별도 검증 필요.',
  }
}
