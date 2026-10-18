import type { Battle } from '../../domain/battle/types'
import type { Evaluation } from '../../domain/evaluation/types'

/**
 * v0.4.33: describe Queen's deliberate Osome targeting accurately in CURRENT data.
 * Preserve historical sample Battles and v0.4.30 Evaluation review unchanged.
 * Official ONE PIECE.com TV1061 distinguishes successful invisibility from the
 * intentional attack on Osome after Queen noticed her feigned illness.
 * No stat, evidence link, Haki, scoring or readiness adjustments.
 */
const oldBattleContext = '오니가시마 전체 전투가 동시에 진행되며 후반에 오소메에게 주의가 분산되는 장면이 있음'
const newBattleContext = '오니가시마 전체 전투가 동시에 진행되는 가운데 퀸은 투명화 능력을 정상적으로 사용했다. 이후 자신의 요구를 피하려 병을 가장했던 오소메를 알아보고, 사적인 이유로 투명화 상태에서 의도적으로 폭행하며 상디와의 전투 목표에서 이탈했다.'

const oldTechniqueContext = '무장 오발과 후반 주의 분산·상디의 빠른 기동으로 인한 실패가 공존한다.'
const newTechniqueContext = '브라키오 런처의 자기 피격은 장비 발동·안전성의 제한이다. 오소메에 대한 의도적인 공격은 투명화 기술 자체의 오작동이 아니라 전투 목표 선택의 문제이며, 상디의 빠른 기동에 따른 대응 한계와도 구분한다.'

const oldIqObservation = '오소메에게 주의가 분산되고 상대의 전투 목적에서 벗어나는 행동과 무장 오발을 보였다.'
const newIqObservation = '퀸은 사적 이유로 오소메를 알아보고 투명화 상태에서 의도적으로 폭행하면서 상디와의 전투 목표를 이탈했다. 브라키오 런처의 자기 피격은 장비 안전성·발동 판단을 따로 검토해야 한다.'
const oldIqContext = '기술 실험과 대인 전투가 얽히면서 상대 판단이 흔들린 전장 맥락이다.'
const newIqContext = '투명화 기술은 실제로 작동했고, 오소메 폭행은 단순 부주의나 우발적 오발이 아니라 의도적인 사적 표적 선택이었다. 최종 전투 결과와 기술 작동 성공을 구분한다.'

function replaceOnce(text: string, before: string, after: string, stat: string): string {
  if (!text.includes(before)) {
    throw new Error('v0.4.33 Queen ' + stat + ' historical rationale changed; refuse silent rewrite')
  }
  if (text.split(before).length !== 2) {
    throw new Error('v0.4.33 Queen ' + stat + ' expected one historical clause')
  }
  return text.replace(before, after)
}

export function applyV0433QueenOsomeBattleContext(battle: Battle): Battle {
  if (battle.id !== 'onigashima-queen-sanji') return battle
  if (battle.externalFactors !== oldBattleContext) {
    throw new Error('v0.4.33 Queen-Sanji historical battle context changed')
  }
  return { ...battle, externalFactors: newBattleContext }
}

export function applyV0433QueenOsomeEvaluationContext(evaluation: Evaluation): Evaluation {
  if (evaluation.characterId !== 'queen' || evaluation.isDefault === false) return evaluation
  if (evaluation.evaluationDataVersion !== 'evaluation-v0.4.30-beasts-bidirectional') {
    throw new Error('v0.4.33 Queen historical evaluation revision changed')
  }
  return {
    ...evaluation,
    evaluationDataVersion: 'evaluation-v0.4.33-queen-osome-context-clarified',
    items: evaluation.items.map(item => {
      if (item.stat === 'techniqueMastery') {
        return { ...item, rationale: replaceOnce(item.rationale, oldTechniqueContext, newTechniqueContext, 'Technique') }
      }
      if (item.stat === 'combatIQ') {
        return {
          ...item,
          rationale: replaceOnce(
            replaceOnce(item.rationale, oldIqObservation, newIqObservation, 'CombatIQ observed'),
            oldIqContext, newIqContext, 'CombatIQ context',
          ),
        }
      }
      return item
    }),
  }
}
