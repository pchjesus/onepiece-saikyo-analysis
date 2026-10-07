import type { CombatStat, Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import type { HakiStatContribution } from '../../domain/haki/types'
import { getFinalStatScore } from '../../domain/evaluation/score'

const item = (
  stat: CombatStat,
  baseScore: number,
  rationale: string,
  evidenceIds: string[] = [],
  hakiContributions: HakiStatContribution[] = [],
): EvaluationItem => {
  const draft = { stat, baseScore, score: baseScore, rationale, evidenceIds, hakiContributions }
  return { ...draft, score: getFinalStatScore(draft) }
}

export const sampleEvaluations: Evaluation[] = [
  {
    id: 'evaluation-marco', characterId: 'marco', evaluationDataVersion: 'evaluation-0.1.20', status: 'draft',
    items: [
      item('attack', 78, '현재 저장된 Canon Evidence는 마르코가 강자에게 접근·타격할 수 있음을 보여주지만 직접적인 결정력 비교 자료는 제한적이다. 패기 보유 사실만으로 공격 가산을 주지 않아 보수적으로 평가한다.', ['evidence-marco-kizaru-554']),
      item('defense', 80, '공중 기동과 불사조 형태는 피격 회피에 기여할 수 있으나 현재 직접 방어 Evidence가 제한적이다. 손상 뒤 재생은 Defense가 아니라 Special Ability로 분리한다.'),
      item('stamina', 84, '킹과 퀸을 동시에 상대하며 전투를 지속했고 피로 누적도 명시된다. 재생 자체가 아니라 다대일 전투를 계속 수행한 사실을 Stamina 근거로 사용한다.', ['evidence-marco-regeneration-1006']),
      item('speed', 86, '정상결전에서 키자루·아오키지 관련 장면에 신속히 개입하고 공중 기동을 수행했다. 패기 효과와 순수 기동을 혼합하지 않는다.', ['evidence-marco-kizaru-554', 'evidence-marco-aokiji-566']),
      item('techniqueMastery', 80, '불사조 능력을 전투·비행·재생·지원에 안정적으로 운용하지만 현재 근거는 정밀 제어나 고급 기술 비교보다 활용 폭을 더 강하게 보여준다. 따라서 Versatility보다 낮게 둔다.', ['evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006']),
      item('specialAbility', 93, '불사조 능력은 자기 재생, 비행, 전투, 타인의 특수 상태 억제·지원까지 실제로 확인된다. Recovery를 별도 스탯으로 두지 않는 대신 능력 자체의 고유 효과는 여기서 평가한다.', ['evidence-marco-kizaru-554', 'evidence-marco-big-mom-995', 'evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006']),
      item('combatIQ', 84, '아군 보호를 위한 즉각 개입과 상성 상황 대응은 확인되지만 현재 Evidence만으로 최상위 전략·전술 판단까지 확정하지 않는다.', ['evidence-marco-aokiji-566', 'evidence-marco-big-mom-995']),
      item('versatility', 91, '공중전·근접전·자기 재생·타인 지원·상성 대응 등 서로 다른 목적에 능력을 실제 적용했다. 같은 장면을 Technique와 동일 의미로 중복 평가하지 않는다.', ['evidence-marco-big-mom-995', 'evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006']),
    ],
  },
  {
    id: 'evaluation-king', characterId: 'king', evaluationDataVersion: 'evaluation-0.1.20', status: 'draft',
    items: [
      item('attack', 87, '화염·검·고대종 신체 능력으로 강한 공격 성과를 보인다. Base에는 무장색 강화분을 제외하고, 실제 검격에 무장색을 적용한 부분만 별도 Contribution으로 반영한다.', ['evidence-king-marco-1006', 'evidence-king-zoro-1035', 'evidence-king-armament-1032'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '검에 무장색을 두르고 조로의 패기 검격과 직접 충돌', evidenceIds: ['evidence-king-armament-1032'] }]),
      item('defense', 94, '등 뒤의 불꽃이 켜진 상태에서 매우 높은 방어 성능이 확인되지만 불꽃이 꺼진 상태에는 같은 방어를 적용하지 않는다.', ['evidence-king-lunarian-1032', 'evidence-king-zoro-1035']),
      item('stamina', 88, '마르코와의 혼전 이후 조로와 장시간 전투를 이어갔다. 최종적으로 한계와 패배가 확인되므로 무제한 지속력으로 보지 않는다.', ['evidence-king-zoro-1035']),
      item('speed', 91, '불꽃을 끈 상태에서 방어를 낮추는 대신 속도를 높이는 메커니즘을 실제 전투에서 사용한다.', ['evidence-king-zoro-1035']),
      item('techniqueMastery', 86, '검·화염·종족 특성을 함께 다루고 상태 전환을 전투에 사용한다. 무장색과 검을 결합한 실전 운용은 별도 Haki Contribution으로 소폭 반영한다.', ['evidence-king-zoro-1035', 'evidence-king-armament-1032'], [{ hakiType: 'armament', stat: 'techniqueMastery', amount: 2, application: '검술에 무장색을 결합해 실전 공방에 운용', evidenceIds: ['evidence-king-armament-1032'] }]),
      item('specialAbility', 92, '루나리아족의 조건부 고방어·속도 전환과 화염, 고대종 능력이 복합적인 전투 유틸리티를 제공한다.', ['evidence-king-lunarian-1032', 'evidence-king-zoro-1035']),
      item('combatIQ', 84, '상태 전환과 여러 공격 수단을 상황에 따라 사용하지만 현재 Evidence만으로 최상위 전술 판단까지 확정하지 않는다.', ['evidence-king-zoro-1035']),
      item('versatility', 86, '비행·근접전·검술·화염·종족 상태 전환을 실제 전투에 적용한다. 수단의 숙련과 적용 폭은 분리해 평가한다.', ['evidence-king-zoro-1035']),
    ],
  },
  {
    id: 'evaluation-katakuri', characterId: 'katakuri', evaluationDataVersion: 'evaluation-0.1.20', status: 'draft',
    items: [
      item('attack', 86, '모치 기반 근접·중원거리 공격과 삼지창, 각성 공격으로 높은 기본 공격 성능을 보인다. 무장색으로 강화된 직접 충돌은 Base에서 제외하고 별도 기여로 반영한다.', ['evidence-katakuri-awakening-882', 'evidence-katakuri-armament-883'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '무장색을 근접 공격에 적용해 루피와의 직접 충돌에서 공격 성능을 강화', evidenceIds: ['evidence-katakuri-armament-883'] }]),
      item('defense', 82, '모치 신체 변형 자체로 회피 수단을 갖지만 카타쿠리의 핵심 회피 성능은 미래예지와 결합될 때 크게 상승한다. 그 부분은 견문색 Contribution으로 분리한다.', ['evidence-katakuri-future-sight-881-884'], [{ hakiType: 'observation', stat: 'defense', amount: 6, application: '미래예지로 공격을 선행 파악하고 모치 신체를 변형해 회피', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('stamina', 89, '루피와 장시간 격전을 이어가며 큰 피해를 받은 뒤에도 최종 공방까지 전투를 지속했다. 외부 개입 뒤 스스로 부상을 맞춘 맥락도 결과 해석에 포함한다.', ['evidence-katakuri-endurance-894']),
      item('speed', 84, '공격·회피 동작 자체는 높은 수준이지만 미래예지로 얻는 선행 대응을 순수 Speed에 중복 가산하지 않는다.', ['evidence-katakuri-future-sight-881-884']),
      item('techniqueMastery', 88, '모치의 형태 변형, 각성 환경 제어, 무기와 능력의 결합을 높은 수준으로 수행한다. 특히 미래예지와 신체 변형을 정밀하게 결합하는 부분은 Haki Contribution으로 분리한다.', ['evidence-katakuri-future-sight-881-884', 'evidence-katakuri-awakening-882', 'evidence-katakuri-armament-883'], [{ hakiType: 'observation', stat: 'techniqueMastery', amount: 6, application: '고급 견문색의 미래예지와 모치 신체 변형을 정밀하게 결합', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('specialAbility', 93, '특수 초인계 모치 능력과 각성에 의한 환경 변환·구속·다방향 공격은 능력 자체의 성능과 특수 효과가 매우 높다.', ['evidence-katakuri-awakening-882']),
      item('combatIQ', 87, '상대의 행동을 읽고 선제적으로 차단하며 능력과 무기를 상황에 맞게 선택한다. 미래예지 정보의 실제 판단 활용분은 별도 Contribution으로 반영한다.', ['evidence-katakuri-future-sight-881-884'], [{ hakiType: 'observation', stat: 'combatIQ', amount: 4, application: '미래예지로 얻은 정보를 선제 차단과 대응 선택에 연결', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('versatility', 92, '근접 격투·삼지창·중원거리 모치 공격·구속·각성 환경 제어·회피 등 실제 적용 범위가 넓다. 패왕색 방출은 확인되지만 현재 상위권 1대1 평가에는 별도 가산하지 않는다.', ['evidence-katakuri-awakening-882', 'evidence-katakuri-conquerors-893']),
    ],
  },
]
