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
    id: 'evaluation-marco', characterId: 'marco', evaluationDataVersion: 'evaluation-0.1.21', status: 'draft',
    items: [
      item('attack', 74, '현재 저장된 Canon Evidence는 마르코가 대장급 상대에게 접근해 타격할 수 있음을 보여주지만 지속적인 결정력 비교 자료는 제한적이다. Evidence coverage 부족을 곧 능력 부족으로 보지 않으며, 패기 Application Evidence 부재도 감점 근거로 사용하지 않은 채 현행 절대 스케일에서 보수적인 draft Base를 둔다.', ['evidence-marco-kizaru-554']),
      item('defense', 76, '공중 기동은 회피에 기여할 수 있으나 현재 직접적인 차단·피해 감소 Evidence는 제한적이다. 재생은 기존 원칙대로 Defense에 자동 합산하지 않는다. 직접 Evidence가 적다는 사실 자체를 낮은 방어 능력의 증거로 확정하지 않는 draft 평가다.'),
      item('stamina', 82, '킹과 퀸을 동시에 상대하면서 전투를 지속했고 상당한 피로 누적도 명시된다. 재생 그 자체가 아니라 손상과 다대일 상황에서도 실제 전투를 이어간 사실을 Stamina 근거로 반영하되 무제한 지속력으로 확대하지 않는다.', ['evidence-marco-regeneration-1006']),
      item('speed', 82, '키자루와의 교전 및 아오키지 공격 직후 개입에서 높은 공중 기동과 대응 속도가 확인된다. 짧은 개입 장면을 세계관 최상위 속도와 직접 동급으로 확장하지 않고, 패기 효과와 순수 기동도 혼합하지 않는다.', ['evidence-marco-kizaru-554', 'evidence-marco-aokiji-566']),
      item('techniqueMastery', 76, '불사조 능력을 비행·재생·전투·지원에 안정적으로 운용하지만 현재 Evidence는 정밀 제어의 최상위 비교보다 활용 폭을 더 강하게 보여준다. Special Ability와 Versatility의 성과를 숙련도로 다시 복제하지 않는다.', ['evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006']),
      item('specialAbility', 88, '불사조 능력은 자기 재생, 비행, 전투, 상성 대응, 타인의 특수 상태 억제·지원까지 실제로 확인된다. 매우 높은 고유 능력 가치로 평가하되 90점 이상을 세계관 최상위 직접 비교 영역으로 남기는 calibration을 적용한다.', ['evidence-marco-kizaru-554', 'evidence-marco-big-mom-995', 'evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006']),
      item('combatIQ', 78, '아군 보호를 위한 즉각 개입과 상성 상황 대응은 확인된다. 다만 현재 저장된 장면만으로 장기간의 최상위 전술·전략 판단을 확정하지 않으며 Evidence coverage 부족을 지능 부족으로 단정하지 않는다.', ['evidence-marco-aokiji-566', 'evidence-marco-big-mom-995']),
      item('versatility', 86, '공중전·근접전·자기 재생·타인 지원·상성 대응·상태 억제 등 서로 다른 목적에 능력을 실제 적용했다. Technique의 정밀 숙련이나 Special Ability 자체의 성능과 같은 의미를 중복 점수화하지 않는다.', ['evidence-marco-big-mom-995', 'evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006']),
    ],
  },
  {
    id: 'evaluation-king', characterId: 'king', evaluationDataVersion: 'evaluation-0.1.21', status: 'draft',
    items: [
      item('attack', 80, '화염·검·고대종 신체 능력으로 강한 직접 공격 성과를 보인다. Base에는 무장색 강화 효과를 제외하고, 실제 검격에 적용한 무장색 Raw Contribution은 기존 값을 보존한 채 모델 Weight를 거쳐 반영한다.', ['evidence-king-marco-1006', 'evidence-king-zoro-1035', 'evidence-king-armament-1032'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '검에 무장색을 두르고 조로의 패기 검격과 직접 충돌', evidenceIds: ['evidence-king-armament-1032'] }]),
      item('defense', 85, '불꽃이 켜진 상태의 루나리아 방어는 매우 강하지만 불꽃을 끄고 속도를 올리는 상태에서는 같은 방어 성능을 유지하지 않는다. Flame ON의 Peak Defense를 Speed peak와 동시에 상시 발휘하는 평균 성능처럼 취급하지 않는다.', ['evidence-king-lunarian-1032', 'evidence-king-zoro-1035']),
      item('stamina', 80, '마르코가 포함된 혼전 이후 조로와의 전투를 계속 수행했다. 장기 전투 수행은 강점이지만 최종적으로 한계와 패배가 확인되므로 세계관 최상위 지속력으로 확대하지 않는다.', ['evidence-king-zoro-1035']),
      item('speed', 83, '불꽃을 끈 상태에서 방어를 낮추는 대신 속도를 높이는 메커니즘을 실제 전투에서 활용한다. 높은 조건부 속도는 인정하되 Flame ON의 최고 방어와 동시에 유지되는 상시 성능으로 계산하지 않는다.', ['evidence-king-zoro-1035']),
      item('techniqueMastery', 78, '검·화염·고대종 능력·루나리아 상태 전환을 전투에 결합한다. 무장색과 검의 결합은 Raw Haki Contribution으로 분리하고, 다양한 수단 보유 자체를 숙련도와 중복 평가하지 않는다.', ['evidence-king-zoro-1035', 'evidence-king-armament-1032'], [{ hakiType: 'armament', stat: 'techniqueMastery', amount: 2, application: '검술에 무장색을 결합해 실전 공방에 운용', evidenceIds: ['evidence-king-armament-1032'] }]),
      item('specialAbility', 85, '루나리아족의 조건부 고방어·속도 전환, 화염, 고대종 능력은 매우 강한 고유 전투 유틸리티를 제공한다. 다만 방어와 속도의 상반된 상태 조건을 능력 가치에서도 무시하지 않는다.', ['evidence-king-lunarian-1032', 'evidence-king-zoro-1035']),
      item('combatIQ', 77, '전투 중 상태 전환과 여러 공격 수단을 사용하지만 상대에게 상태 규칙을 파악당해 공략된 과정도 확인된다. 현재 Evidence만으로 최상위 전술 판단을 부여하지 않는다.', ['evidence-king-zoro-1035']),
      item('versatility', 81, '비행·근접전·검술·화염·고대종 변신·루나리아 상태 전환을 실제 전투에 적용한다. 수단의 폭은 높지만 방어와 속도 상태가 상호 배타적이라는 제약을 함께 반영한다.', ['evidence-king-zoro-1035']),
    ],
  },
  {
    id: 'evaluation-katakuri', characterId: 'katakuri', evaluationDataVersion: 'evaluation-0.1.21', status: 'draft',
    items: [
      item('attack', 79, '모치 기반 근접·중원거리 공격, 삼지창, 각성 공격으로 높은 기본 공격 성능을 보인다. 무장색으로 강화된 직접 충돌은 Base에서 분리하고 기존 Raw Contribution을 모델 Weight를 거쳐 반영한다.', ['evidence-katakuri-awakening-882', 'evidence-katakuri-armament-883'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '무장색을 근접 공격에 적용해 루피와의 직접 충돌에서 공격 성능을 강화', evidenceIds: ['evidence-katakuri-armament-883'] }]),
      item('defense', 78, '모치 신체 변형이라는 기본 회피 수단은 갖지만 핵심 회피 성과의 상당 부분은 미래예지와 결합될 때 나타난다. 미래예지 부분은 Raw 견문색 Contribution으로 분리하고 침착함이라는 조건도 함께 고려한다.', ['evidence-katakuri-future-sight-881-884'], [{ hakiType: 'observation', stat: 'defense', amount: 6, application: '미래예지로 공격을 선행 파악하고 모치 신체를 변형해 회피', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('stamina', 81, '루피와 장시간 격전을 이어가며 큰 피해와 피로가 누적된 뒤에도 최종 공방까지 전투를 지속했다. 높은 지구력의 직접 근거로 평가하지만 소모가 명확했던 만큼 90점대 최상위 지속력으로 확대하지 않는다.', ['evidence-katakuri-endurance-894']),
      item('speed', 80, '공격·회피 동작 자체는 높은 수준이지만 미래예지의 선행 예측을 순수 Speed에 중복 가산하지 않는다. 현재 Evidence에서 미래예지를 제거한 순수 신체·전투 속도는 강한 수준으로 평가하되 최상위 속도와 직접 동급으로 보지 않는다.', ['evidence-katakuri-future-sight-881-884']),
      item('techniqueMastery', 79, '모치 변형, 각성 환경 제어, 무기와 능력의 결합을 높은 수준으로 수행한다. 미래예지와 신체 변형의 정밀 결합은 Raw Haki Contribution으로 분리하고, 각성의 존재 자체를 Technique에 다시 전부 복제하지 않는다.', ['evidence-katakuri-future-sight-881-884', 'evidence-katakuri-awakening-882', 'evidence-katakuri-armament-883'], [{ hakiType: 'observation', stat: 'techniqueMastery', amount: 6, application: '고급 견문색의 미래예지와 모치 신체 변형을 정밀하게 결합', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('specialAbility', 85, '특수 초인계 모치 능력과 각성에 의한 환경 변환·구속·다방향 공격은 매우 높은 능력 자체의 성능과 유틸리티를 제공한다. Technique의 정밀 운용 및 Versatility의 적용 폭과 동일 성과를 중복 계산하지 않는다.', ['evidence-katakuri-awakening-882']),
      item('combatIQ', 79, '상대 행동을 읽고 선제적으로 차단하며 능력과 무기를 상황에 맞게 선택한다. 미래예지로 얻는 정보 자체는 Raw Haki Contribution으로 분리하여 판단력 Base와 이중 계산하지 않는다.', ['evidence-katakuri-future-sight-881-884'], [{ hakiType: 'observation', stat: 'combatIQ', amount: 4, application: '미래예지로 얻은 정보를 선제 차단과 대응 선택에 연결', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('versatility', 83, '근접 격투·삼지창·중원거리 모치 공격·구속·각성 환경 제어·회피 등 실제 적용 범위가 넓다. 각성의 강도 자체는 Special Ability, 정밀한 운용은 Technique에서 평가하며 같은 성과를 단순 복제하지 않는다.', ['evidence-katakuri-awakening-882', 'evidence-katakuri-conquerors-893']),
    ],
  },
]
