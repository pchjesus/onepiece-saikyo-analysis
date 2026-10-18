import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'

/**
 * v0.4.32 current-data correction.
 *
 * The v0.3.3 frozen baseline requires the legacy sampleBattles/sampleEvidence
 * source records to stay byte-for-byte unchanged. Apply this correction only
 * in the CURRENT repositories and audit dataset, not to the historical arrays.
 */
export const v0432JackShutenmaruBattle: Battle = {
  id: 'wano-jack-shutenmaru-921',
  title: '와노쿠니 구리 — 잭과 슈텐마루의 검격 교환',
  chronologyOrder: 3,
  combatStructure: '1v1',
  combatPurpose: '잭이 슈텐마루를 카이도의 수하로 삼으려 찾아왔다가 충돌한 상황',
  combatIntent: 'serious',
  environment: '와노쿠니 구리 오코보레 마을',
  restrictions: '짧은 검격 공방이며 어느 쪽도 상대를 완전히 제압하지 못한 채 중단됨',
  externalFactors: '주변에 잭의 부하와 슈텐마루의 도적단·마을 주민이 있었고 카이도가 용의 모습으로 등장하며 교전이 중단됨',
  result: 'interrupted',
  participantIds: [],
}

export function applyV0432JackBattleOrder(battle: Battle): Battle {
  if (battle.id !== 'onigashima-jack-minks') return battle
  return { ...battle, chronologyOrder: 4 }
}

export function applyV0432JackShutenmaruEvidence(evidence: Evidence): Evidence {
  if (evidence.id !== 'evidence-jack-ashura-921') return evidence
  if (evidence.battleId !== 'zou-jack-minks') {
    throw new Error('v0.4.32 historical Jack-Ashura Evidence link drift')
  }
  return { ...evidence, battleId: v0432JackShutenmaruBattle.id }
}
