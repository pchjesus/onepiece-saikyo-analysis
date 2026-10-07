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
    id: 'evaluation-marco', characterId: 'marco', evaluationDataVersion: 'evaluation-0.1.22', status: 'draft',
    items: [
      item('attack', 75, '마르코는 정상결전과 오니가시마에서 상위권 상대에게 유효타를 만들었지만, 킹·퀸 등을 상대로 결정적인 누적 손상이나 finishing power를 반복적으로 입증한 장면은 제한적이다. 아카이누를 비스타와 함께 공격할 때 실제 무장색 사용이 확인되므로 해당 강화 효과는 Base에서 분리해 최소 Raw Haki Contribution으로 반영한다.', ['evidence-marco-kizaru-554', 'evidence-marco-armament-akainu-574'], [{ hakiType: 'armament', stat: 'attack', amount: 2, application: '비스타와 함께 아카이누를 공격할 때 무장색 패기를 실제 공격에 적용', evidenceIds: ['evidence-marco-armament-akainu-574'] }]),
      item('defense', 85, '불사조의 재생 자체를 자동 Defense로 환산하지는 않지만, 키자루의 광탄·아카이누의 공격·킹의 화염 공격·카이도의 보로 브레스처럼 강한 공격을 실제로 가로막아 보호 대상을 지킨 장면은 Defense의 직접 성과로 본다. 재생 메커니즘은 Special Ability에도 관련되지만, 서로 다른 의미의 성과로 구분한다.', ['evidence-marco-kizaru-554', 'evidence-marco-defense-akainu-575', 'evidence-marco-defense-king-1022', 'evidence-marco-defense-kaido-1043']),
      item('stamina', 81, '킹과 퀸을 동시에 상대하며 상당 시간 전투를 이어갔고 신체 손상 후에도 재생해 전투를 지속했다. 동시에 명확한 피로와 능력 자원 한계도 나타나므로 무제한 지속력으로 확대하지 않는다.', ['evidence-marco-regeneration-1006']),
      item('speed', 81, '키자루와의 교전 및 아오키지 공격 직후 개입에서 높은 공중 기동과 대응 속도가 확인된다. 짧은 개입 장면을 세계관 최상위 속도와 직접 동급으로 확장하지 않으며, Haki나 재생 효과를 순수 Speed에 중복 가산하지 않는다.', ['evidence-marco-kizaru-554', 'evidence-marco-aokiji-566']),
      item('techniqueMastery', 80, '불사조 능력을 비행·부분 변형·재생·공격·방어·지원에 연속적으로 운용하고, 불꽃을 타인의 상태 억제에 정밀하게 활용한다. 능력 자체의 강도는 Special Ability, 적용 범위는 Versatility와 구분하면서도 실제 운용 숙련은 높은 수준으로 평가한다.', ['evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006', 'evidence-marco-defense-king-1022']),
      item('combatIQ', 78, '아군 보호를 위한 즉각 개입과 상성 대응, 전장 지원 판단은 확인된다. 반면 정상결전에서 흰수염의 상태에 주의가 분산된 순간 공격을 허용하고 외부 개입으로 해루석 수갑이 채워지는 상황도 있어, 현재 Evidence만으로 최상위 전술 판단까지 부여하지 않는다.', ['evidence-marco-aokiji-566', 'evidence-marco-big-mom-995', 'evidence-marco-seastone-568-569']),
      item('versatility', 83, '공중전·근접전·원거리 기술·자기 재생·고화력 차단·아군 보호·이동 및 상태 억제 지원까지 실제 적용 범위가 넓다. Special Ability의 존재 자체나 Technique의 정밀 숙련을 그대로 반복 점수화하지 않고 역할 전환과 상황 적응의 폭을 평가한다.', ['evidence-marco-big-mom-995', 'evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006', 'evidence-marco-defense-akainu-575', 'evidence-marco-defense-kaido-1043']),
    ],
  },
  {
    id: 'evaluation-king', characterId: 'king', evaluationDataVersion: 'evaluation-0.1.22', status: 'draft',
    items: [
      item('attack', 81, '검술·고대종 신체 능력과 함께 카류돈 계열의 매우 높은 열량의 화염 공격을 사용한다. 공격 수단과 화력은 세 분석 대상 중 가장 강하게 확인되지만 세계관 최상위 공격력으로 확정할 정도의 결정적 비교는 제한적이다. 무장색 강화는 Base에서 제외하고 Raw Contribution으로 분리한다.', ['evidence-king-marco-1006', 'evidence-king-zoro-1035', 'evidence-king-armament-1032'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '검에 무장색을 두르고 조로의 패기 검격과 직접 충돌', evidenceIds: ['evidence-king-armament-1032'] }]),
      item('defense', 84, 'Flame ON 상태의 루나리아 방어는 매우 강하지만 불꽃을 끄고 속도를 높이는 상태에서는 같은 방어 성능을 유지하지 않는다. 최고 방어와 최고 속도를 동시에 상시 발휘하는 평균 성능처럼 계산하지 않는다.', ['evidence-king-lunarian-1032', 'evidence-king-zoro-1035']),
      item('stamina', 79, '마르코가 포함된 혼전 이후 조로와의 전투를 계속 수행했으나 최종전에서는 자신의 한계가 드러난다. 높은 전투 지속력은 인정하되 최상위 장기전 영역으로 확대하지 않는다.', ['evidence-king-zoro-1035']),
      item('speed', 81, '불꽃을 끈 상태에서 방어를 낮추는 대신 속도를 높이는 메커니즘을 실제 전투에서 활용한다. 조건부 Peak Speed는 인정하지만 Flame ON의 최고 방어와 동시에 유지되는 상시 성능으로 보지 않는다.', ['evidence-king-zoro-1035']),
      item('techniqueMastery', 78, '검·화염·고대종 능력·루나리아 상태 전환을 전투에 결합한다. 여러 수단을 능숙하게 다루지만 카타쿠리처럼 능력 제어의 정밀성과 완성도가 반복적으로 강조되는 수준까지는 현재 Evidence가 뒷받침하지 않는다.', ['evidence-king-zoro-1035', 'evidence-king-armament-1032'], [{ hakiType: 'armament', stat: 'techniqueMastery', amount: 2, application: '검술에 무장색을 결합해 실전 공방에 운용', evidenceIds: ['evidence-king-armament-1032'] }]),
      item('combatIQ', 76, '전투 중 상태 전환과 여러 공격 수단을 사용하지만 상대에게 상태 규칙을 파악당해 공략되는 과정도 확인된다. 현재 Evidence에서 최상위 전술 판단이나 상대 분석 능력을 강하게 부여할 근거는 제한적이다.', ['evidence-king-zoro-1035']),
      item('versatility', 80, '비행·근접전·검술·화염·고대종 변신·루나리아 상태 전환을 실제 전투에 적용한다. 수단은 넓지만 방어와 속도 상태가 상호 배타적이며, 동일 루나리아 메커니즘을 여러 역할로 반복 가산하지 않는다.', ['evidence-king-zoro-1035']),
    ],
  },
  {
    id: 'evaluation-katakuri', characterId: 'katakuri', evaluationDataVersion: 'evaluation-0.1.22', status: 'draft',
    items: [
      item('attack', 79, '모치 기반 근접·중원거리 공격, 삼지창, 각성 공격으로 강한 기본 공격 성능을 보인다. 무장색 직접 충돌에서 우위가 확인되지만 최상위급 결정력으로 확정할 정도의 비교는 제한적이며 패기 강화는 Base에서 분리한다.', ['evidence-katakuri-awakening-882', 'evidence-katakuri-armament-883'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '무장색을 근접 공격에 적용해 루피와의 직접 충돌에서 공격 성능을 강화', evidenceIds: ['evidence-katakuri-armament-883'] }]),
      item('defense', 77, '모치 신체 변형 자체의 회피·방어 수단과 높은 기본 전투 대응을 평가하되, 핵심 회피 성과의 상당 부분을 만드는 미래예지는 Raw 견문색 Contribution으로 분리한다. 침착함이 무너지면 회피 성능도 떨어지는 조건을 함께 고려한다.', ['evidence-katakuri-future-sight-881-884'], [{ hakiType: 'observation', stat: 'defense', amount: 6, application: '미래예지로 공격을 선행 파악하고 모치 신체를 변형해 회피', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('stamina', 80, '루피와 장시간 격전을 이어가며 큰 피해와 피로가 누적된 뒤에도 최종 공방까지 전투를 지속했다. 높은 지구력을 확인할 수 있지만 전투 후반의 명확한 소모도 함께 반영한다.', ['evidence-katakuri-endurance-894']),
      item('speed', 82, '미래예지의 선행 예측을 Speed에 직접 가산하지 않더라도 Snakeman의 가속·궤도 변경 공격과 고속 공방을 이어가며 회피와 반격을 수행한 순수 전투 속도가 확인된다.', ['evidence-katakuri-future-sight-881-884', 'evidence-katakuri-snakeman-895']),
      item('techniqueMastery', 82, '모치 신체의 부분 변형, 공격 형태의 모방·변형, 각성 환경 제어, 무기와 능력의 결합을 매우 높은 수준으로 수행한다. 카타쿠리의 강점 상당 부분은 열매 자체의 절대 성능보다 사용 숙련에서 발생하므로 높은 Base를 부여하고, 미래예지와의 정밀 결합은 Raw Haki Contribution으로 분리한다.', ['evidence-katakuri-future-sight-881-884', 'evidence-katakuri-awakening-882', 'evidence-katakuri-armament-883', 'evidence-katakuri-gear4-counter-883-885'], [{ hakiType: 'observation', stat: 'techniqueMastery', amount: 6, application: '고급 견문색의 미래예지와 모치 신체 변형을 정밀하게 결합', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('combatIQ', 80, '상대 행동을 선제 차단하고 Gear 4 변신을 방해하며, 전투 중 상대의 power-up 조건과 행동을 분석해 대응한다. 미래예지로 얻는 정보 자체는 Raw Haki Contribution으로 분리하고, 그 정보를 이용한 선택과 대응을 Base Combat IQ로 평가한다.', ['evidence-katakuri-future-sight-881-884', 'evidence-katakuri-gear4-counter-883-885'], [{ hakiType: 'observation', stat: 'combatIQ', amount: 4, application: '미래예지로 얻은 정보를 선제 차단과 대응 선택에 연결', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('versatility', 82, '근접 격투·삼지창·중원거리 모치 공격·구속·신체 변형·각성 환경 제어·회피 등 직접 전투 안에서의 적용 폭이 매우 넓다. 능력의 강도와 정밀 숙련을 반복 가산하지 않고 상황·거리·수단 전환의 폭을 평가한다.', ['evidence-katakuri-awakening-882', 'evidence-katakuri-conquerors-893', 'evidence-katakuri-gear4-counter-883-885']),
    ],
  },
]
