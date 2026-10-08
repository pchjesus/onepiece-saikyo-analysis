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
    id: 'evaluation-marco', characterId: 'marco', evaluationDataVersion: 'evaluation-0.1.23', status: 'draft',
    items: [
      item('attack', 76, '마르코는 키자루·아오키지·아카이누와 와노의 킹·퀸 등 높은 수준의 상대에게 공격을 성립시켰지만, 결정적인 누적 손상이나 finishing power를 반복적으로 입증한 장면은 제한적이다. 아카이누 공격 시 실제 무장색 적용이 확인되므로 최소 Raw Contribution을 Base와 분리한다.', ['evidence-marco-kizaru-554', 'evidence-marco-armament-akainu-574'], [{ hakiType: 'armament', stat: 'attack', amount: 2, application: '비스타와 함께 아카이누를 공격할 때 무장색 패기를 실제 공격에 적용', evidenceIds: ['evidence-marco-armament-akainu-574'] }]),
      item('defense', 85, '재생 자체를 자동 Defense 점수로 환산하지 않지만, 키자루의 광탄·아카이누의 공격·킹의 화염·카이도의 보로 브레스처럼 강한 공격을 실제로 가로막고 보호 대상을 지킨 성과가 반복된다. 재생은 Special Combat Profile에 보존하고 실제 차단 성과와 전투 중 방어 지속성을 함께 평가한다.', ['evidence-marco-kizaru-554', 'evidence-marco-defense-akainu-575', 'evidence-marco-defense-king-1022', 'evidence-marco-defense-kaido-1043']),
      item('stamina', 82, '킹과 퀸을 동시에 상대하고 큰 소모가 누적된 뒤에도 다시 전선에 개입했다. 명확한 피로와 능력 자원 한계도 나타나므로 무제한 재생·지속력으로 확대하지 않는다.', ['evidence-marco-regeneration-1006', 'evidence-marco-defense-king-1022', 'evidence-marco-defense-kaido-1043']),
      item('speed', 81, '키자루와의 공중 교전과 아오키지 공격 직후 개입에서 높은 기동·반응 속도가 확인된다. 짧은 개입 장면을 세계관 최상위 속도와 직접 동급으로 확대하지 않는다.', ['evidence-marco-kizaru-554', 'evidence-marco-aokiji-566']),
      item('techniqueMastery', 80, '불사조 능력을 비행·부분 변형·재생·공격·방어·지원에 연속적으로 운용하고 불꽃을 타인의 상태 억제에 정밀하게 활용한다. 역할 폭은 Versatility와 구분하고 실제 운용 숙련만 평가한다.', ['evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006', 'evidence-marco-defense-king-1022']),
      item('combatIQ', 79, '아군 보호를 위한 즉각 개입, 상성 대응, 전장 지원 판단이 반복된다. 정상결전에서 흰수염의 상태에 주의가 분산된 장면은 전쟁 맥락으로 보고 단순한 판단력 결함으로 과도하게 감점하지 않되, Katakuri처럼 상대 메커니즘 분석이 반복적으로 강조되는 수준까지는 올리지 않는다.', ['evidence-marco-aokiji-566', 'evidence-marco-big-mom-995', 'evidence-marco-seastone-568-569', 'evidence-marco-payback-war-820-909']),
      item('versatility', 84, '공중전·근접전·고화력 차단·강자 마크·아군 보호·수송·자기 재생·광역 상태 억제 지원까지 실제 전장 역할 전환 폭이 매우 넓다. 선의로서의 의료 역량 자체를 전투 점수로 직접 가산하지 않지만, 와노에서 지원·상태 억제로 전투 역할에 연결된 부분은 반영한다.', ['evidence-marco-big-mom-995', 'evidence-marco-ice-oni-998', 'evidence-marco-regeneration-1006', 'evidence-marco-defense-akainu-575', 'evidence-marco-defense-kaido-1043']),
    ],
  },
  {
    id: 'evaluation-jozu', characterId: 'jozu', evaluationDataVersion: 'evaluation-0.1.23', status: 'draft',
    items: [
      item('attack', 76, '다이아몬드화한 신체의 돌진과 완력으로 크로커다일과 아오키지에게 실제 유효타를 만들었다. 자연계 상대에게 직접 타격이 성립하므로 최소 무장색 적용을 Base와 분리한다.', ['evidence-jozu-crocodile-560', 'evidence-jozu-aokiji-567'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '자연계 능력자인 크로커다일·아오키지에게 실제 근접 타격을 성립시킴', evidenceIds: ['evidence-jozu-crocodile-560', 'evidence-jozu-aokiji-567'] }]),
      item('defense', 83, '미호크의 흰수염 방향 참격을 다이아몬드화로 정면 차단한 매우 강한 물리 방어 성과가 있다. 반면 아오키지의 빙결에는 제압되어 다이아몬드 방어를 모든 공격 유형에 대한 절대 방어로 보지 않는다.', ['evidence-jozu-mihawk-553', 'evidence-jozu-frozen-568']),
      item('stamina', 78, '정상결전에서 장시간 전선에 남아 아오키지와도 교전했지만, Jack·Katakuri처럼 지속시간과 강도가 명확한 장기 결투 자료는 부족하다. 높은 기본 체력은 인정하되 표본 부족을 과대해석하지 않는다.', ['evidence-jozu-aokiji-567', 'evidence-jozu-frozen-568']),
      item('speed', 79, '거대한 체격에도 크로커다일과 아오키지에게 빠르게 개입해 유효타를 만든다. 상위 속도 특화 캐릭터와 직접 비교할 반복 표본은 적어 80대 초반까지는 올리지 않는다.', ['evidence-jozu-crocodile-560', 'evidence-jozu-aokiji-567']),
      item('techniqueMastery', 74, '다이아몬드화를 공격과 방어에 활용하고 근접 돌진을 수행하지만, Vista·Katakuri처럼 정밀한 무기술이나 복합 능력 운용이 반복적으로 묘사되지는 않는다.', ['evidence-jozu-mihawk-553', 'evidence-jozu-crocodile-560']),
      item('combatIQ', 75, '전장에서 강자를 요격하고 아군을 보호하는 역할은 수행한다. 흰수염의 상태 악화와 마르코 피격에 주의가 분산된 순간 제압된 장면은 정상결전 맥락을 고려해 단순한 저지능 근거로 사용하지 않는다.', ['evidence-jozu-aokiji-567', 'evidence-jozu-frozen-568']),
      item('versatility', 74, '주된 역할은 강한 물리 방어와 근접 돌진이지만 공격·방어·강자 요격을 실제로 수행한다. 다양한 거리·지원 역할까지 폭넓게 보여준 캐릭터보다는 낮게 평가한다.', ['evidence-jozu-mihawk-553', 'evidence-jozu-crocodile-560', 'evidence-jozu-aokiji-567']),
    ],
  },
  {
    id: 'evaluation-vista', characterId: 'vista', evaluationDataVersion: 'evaluation-0.1.23', status: 'draft',
    items: [
      item('attack', 80, '미호크를 직접 요격해 검술 공방을 성립시키고 아카이누에게 무장색 검격을 적용했다. 미호크와의 짧은 교전을 전체 전투력 동급으로 확대하지 않되 공격 기술의 질은 높게 평가하며, 실제 무장색 적용은 Base와 분리한다.', ['evidence-vista-mihawk-561-562', 'evidence-vista-official-mihawk-profile', 'evidence-vista-armament-akainu-574'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '아카이누에게 실제 무장색 검격을 적용', evidenceIds: ['evidence-vista-armament-akainu-574'] }]),
      item('defense', 79, '미호크와의 검술 공방에서 요격 역할을 수행하며 의미 있는 부상을 허용하지 않았다. 다만 별도의 초고방어 능력이나 장시간 방어전 표본은 적다.', ['evidence-vista-mihawk-561-562']),
      item('stamina', 77, '정상결전에서 전선을 유지했지만 개인의 장시간 고강도 전투 지속력을 분리해 확인할 직접 표본이 제한적이다. 정보 부족을 약함으로 보지 않되 임시 중립값을 유지한다.', ['evidence-vista-mihawk-561-562', 'evidence-vista-armament-akainu-574']),
      item('speed', 79, '루피를 추격하는 미호크를 요격하고 고속 검술 공방을 성립시킨 반응·접근 능력이 확인된다. 속도 특화 캐릭터와 직접 비교 가능한 표본은 적다.', ['evidence-vista-mihawk-561-562']),
      item('techniqueMastery', 85, '원작에서 미호크와 직접 검술 공방을 이어갔고 공식 ONE PIECE.com도 비스타를 이도류 대검호이자 미호크와 호각으로 싸울 정도의 실력자로 설명한다. 무장색을 검술에 실제 결합한 부분은 최소 Raw Contribution으로 분리한다.', ['evidence-vista-mihawk-561-562', 'evidence-vista-official-mihawk-profile', 'evidence-vista-armament-akainu-574'], [{ hakiType: 'armament', stat: 'techniqueMastery', amount: 2, application: '이도류 검술에 무장색을 결합해 아카이누에게 실전 적용', evidenceIds: ['evidence-vista-armament-akainu-574'] }]),
      item('combatIQ', 76, '전쟁 상황에서 적절한 강자 요격과 교전 중단 판단을 수행하지만 상대 메커니즘 분석·전술 전환을 반복적으로 보여주는 표본은 제한적이다.', ['evidence-vista-mihawk-561-562']),
      item('versatility', 75, '순수 검사에 가깝지만 공격·방어·요격 등 여러 전장 역할을 검술 하나로 수행한다. 특수 능력이 없다는 사실 자체를 감점하지 않으며, 역할 폭이 넓은 Marco·Katakuri보다는 낮게 평가한다.', ['evidence-vista-mihawk-561-562', 'evidence-vista-armament-akainu-574']),
    ],
  },
  {
    id: 'evaluation-king', characterId: 'king', evaluationDataVersion: 'evaluation-0.1.23', status: 'draft',
    items: [
      item('attack', 81, '검술·고대종 신체 능력과 매우 높은 열량의 화염 공격을 사용한다. 현재 분석군에서도 최고 수준의 직접 공격력으로 평가하되 세계관 최상위 결정력으로 확정할 비교는 제한적이다. 무장색 강화는 Base에서 제외하고 Raw Contribution으로 분리한다.', ['evidence-king-marco-1006', 'evidence-king-zoro-1035', 'evidence-king-armament-1032'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '검에 무장색을 두르고 조로의 패기 검격과 직접 충돌', evidenceIds: ['evidence-king-armament-1032'] }]),
      item('defense', 85, 'Flame ON 루나리아 상태의 방어는 매우 강해 조로의 강한 공격을 받아내는 장면이 반복된다. 다만 불꽃을 끄고 속도를 높이는 상태에서는 방어가 낮아지므로 최고 방어를 상시 성능으로 보지 않고 조건부 trade-off를 반영한다.', ['evidence-king-lunarian-1032', 'evidence-king-zoro-1035']),
      item('stamina', 81, '마르코가 포함된 혼전 이후 조로와의 최종전까지 전투를 이어갔다. 고대종 신체는 이 지속성과 부합하는 보조 맥락으로 사용하되 종족·열매 보유 자체를 고정 보너스로 주지는 않는다.', ['evidence-king-marco-1006', 'evidence-king-zoro-1035']),
      item('speed', 81, '불꽃을 끄면 방어를 낮추는 대신 속도를 높이는 상태 전환을 실제 전투에 사용한다. 조건부 Peak Speed를 인정하되 Marco·Katakuri보다 유의하게 빠르다고 단정할 직접 비교 근거는 없다.', ['evidence-king-zoro-1035']),
      item('techniqueMastery', 78, '검·화염·고대종 능력·루나리아 상태 전환을 결합한다. 여러 수단을 능숙하게 다루지만 Katakuri나 Vista처럼 숙련 자체가 반복적으로 강조되는 수준까지는 현재 Evidence가 뒷받침하지 않는다.', ['evidence-king-zoro-1035', 'evidence-king-armament-1032'], [{ hakiType: 'armament', stat: 'techniqueMastery', amount: 2, application: '검술에 무장색을 결합해 실전 공방에 운용', evidenceIds: ['evidence-king-armament-1032'] }]),
      item('combatIQ', 76, '상태 전환과 여러 공격 수단을 활용하지만 상대에게 루나리아 상태 규칙을 파악당해 공략되는 과정도 확인된다. 최상위 전술 분석 능력으로 올릴 근거는 제한적이다.', ['evidence-king-zoro-1035']),
      item('versatility', 80, '비행·근접전·검술·화염·고대종 변신·루나리아 상태 전환을 실제 전투에 적용한다. 수단은 넓지만 방어와 속도 상태가 상호 배타적이며 동일 메커니즘을 여러 역할로 중복 가산하지 않는다.', ['evidence-king-zoro-1035', 'evidence-king-waterfall-930']),
    ],
  },
  {
    id: 'evaluation-queen', characterId: 'queen', evaluationDataVersion: 'evaluation-0.1.23', status: 'draft',
    items: [
      item('attack', 80, '고대종 신체와 구속 공격, 레이저·전격·기계 무장, Germa 계열 재현 기술을 실제 전투에서 사용해 높은 공격 수단과 출력을 보여준다. 다만 수단 수 자체를 단일 공격력으로 중복 가산하지 않는다.', ['evidence-queen-ancient-zoan-1028', 'evidence-queen-cybernetics-1028-1034', 'evidence-queen-big-mom-947']),
      item('defense', 81, '마르코와 상디의 강한 공격을 여러 차례 받은 뒤에도 전투를 이어간 높은 신체 내구와 고대종 특성이 확인된다. 공격을 무효화하는 별도 초고방어 메커니즘은 없어 King보다 낮게 평가한다.', ['evidence-queen-marco-1006', 'evidence-queen-ancient-zoan-1028']),
      item('stamina', 81, '마르코와의 혼전에서 피해를 입은 뒤에도 상디와 장시간 전투를 이어가며 여러 능력을 반복 사용했다. 고대종 보유 자체가 아니라 실제 누적 전투 수행을 근거로 평가한다.', ['evidence-queen-marco-1006', 'evidence-queen-cybernetics-1028-1034']),
      item('speed', 75, '상디와의 전투에서 반응과 공격 전환은 가능하지만 속도 자체가 강점으로 반복적으로 입증되지는 않는다. 장비와 원거리 수단의 다양성을 순수 Speed로 환산하지 않는다.', ['evidence-queen-cybernetics-1028-1034']),
      item('techniqueMastery', 79, '고대종 신체와 복잡한 사이보그 무장, Germa 계열 기술을 다수 운용한다. 다만 자기 발사장치 오발 등 운용 완성도의 한계도 보여 최상위 숙련으로 올리지 않는다.', ['evidence-queen-ancient-zoan-1028', 'evidence-queen-cybernetics-1028-1034']),
      item('combatIQ', 74, '과학 지식 자체는 높지만 Combat IQ는 별도로 평가한다. 다양한 기술을 활용하면서도 자기 무장 오발과 오소메에게 주의가 분산되어 결정타를 허용하는 등 전투 판단의 불안정성이 확인된다.', ['evidence-queen-cybernetics-1028-1034']),
      item('versatility', 81, '근접·구속·원거리 레이저·전격·은신·고대종 변신 등 수단은 매우 넓다. 다만 많은 수단이 공격 중심이며 Marco처럼 공격·방어·수송·지원까지 역할 자체를 폭넓게 전환하거나 Katakuri처럼 지형 제어·회피까지 아우르는 정도는 아니다.', ['evidence-queen-ancient-zoan-1028', 'evidence-queen-cybernetics-1028-1034']),
    ],
  },
  {
    id: 'evaluation-jack', characterId: 'jack', evaluationDataVersion: 'evaluation-0.1.23', status: 'draft',
    items: [
      item('attack', 73, '매머드 신체와 쌍검으로 강한 정면 공격을 수행하고 슈텐마루에게 실제 검격 피해를 줬다. Cracker와 명확한 공격력 우열을 정할 정도의 비교 자료는 부족해 비슷한 범위로 둔다.', ['evidence-jack-ashura-921', 'evidence-jack-zou-809-810']),
      item('defense', 80, '5일 전투와 스론 밍크들의 공격을 견디며 전선을 유지한 높은 신체 내구가 강점이다. 다만 슈텐마루에게 선제 유효타를 허용하고 최종적으로 스론 이누아라시에게 패배한 점을 함께 고려한다.', ['evidence-jack-zou-809-810', 'evidence-jack-ashura-921', 'evidence-jack-sulong-1026']),
      item('stamina', 82, '밈크족과 5일간의 전선을 유지했고 오니가시마에서도 큰 피해 후 다시 전투에 복귀했다. 상대 교대·병력 구조·전투 강도의 불확실성을 할인하더라도 분석군 최고 수준의 장기전 Evidence다.', ['evidence-jack-zou-809-810', 'evidence-jack-sulong-1026', 'evidence-jack-convoy-801']),
      item('speed', 73, '정면전에 필요한 반응과 근접 교전은 가능하지만 속도 자체가 대표 강점으로 확인되는 장면은 적다. 애니메이션 전용 연출은 원작 평가를 올리는 근거로 사용하지 않는다.', ['evidence-jack-ashura-921']),
      item('techniqueMastery', 71, '쌍검과 매머드 변신을 전투에 사용하지만 정밀한 무기술·능력 운용이 반복적으로 강조되지는 않는다. 강한 신체 능력과 숙련을 분리해 보수적으로 평가한다.', ['evidence-jack-ashura-921', 'evidence-jack-zou-809-810']),
      item('combatIQ', 70, '지속적인 정면 압박은 수행하지만 Zou에서 장기 교착 끝에 외부 독가스 병기를 사용한 전투 구조와 무모한 해상 행동 등을 고려하면 높은 전술 판단을 부여할 직접 근거가 제한적이다.', ['evidence-jack-zou-809-810', 'evidence-jack-zunesha-824']),
      item('versatility', 72, '쌍검·매머드 변신·인간형 근접전 등 기본적인 전환은 가능하지만 역할과 거리의 폭은 상위 분석군보다 좁다. 함선의 포격·독가스 같은 외부 장비는 개인 Versatility에 직접 가산하지 않는다.', ['evidence-jack-zou-809-810', 'evidence-jack-ashura-921']),
    ],
  },
  {
    id: 'evaluation-katakuri', characterId: 'katakuri', evaluationDataVersion: 'evaluation-0.1.23', status: 'draft',
    items: [
      item('attack', 77, '모치 기반 근접·중원거리 공격, 삼지창, 각성 공격으로 강한 공격 시스템을 구축하지만 장시간 루피를 압박한 것에 비해 최상위급 결정력을 반복적으로 입증한 장면은 제한적이다. 무장색 정면 충돌의 우위는 Base와 분리해 반영한다.', ['evidence-katakuri-awakening-882', 'evidence-katakuri-armament-883'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '무장색을 근접 공격에 적용해 루피와의 직접 충돌에서 공격 성능을 강화', evidenceIds: ['evidence-katakuri-armament-883'] }]),
      item('defense', 77, '모치 신체 변형 자체의 회피·방어 수단과 높은 기본 대응을 평가하되 핵심 회피 성과의 상당 부분을 만드는 미래예지는 Raw 견문색 Contribution으로 분리한다. 침착함이 무너지면 회피 성능도 떨어지는 조건을 함께 고려한다.', ['evidence-katakuri-future-sight-881-884'], [{ hakiType: 'observation', stat: 'defense', amount: 6, application: '미래예지로 공격을 선행 파악하고 모치 신체를 변형해 회피', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('stamina', 80, '루피와 장시간 격전을 이어가며 큰 피해와 피로가 누적된 뒤에도 최종 공방까지 전투를 지속했다. 높은 지구력을 확인할 수 있지만 후반의 명확한 소모도 함께 반영한다.', ['evidence-katakuri-endurance-894']),
      item('speed', 82, '미래예지의 선행 예측을 Speed에 직접 가산하지 않더라도 Snakeman의 가속·궤도 변경 공격과 고속 공방을 이어가며 회피와 반격을 수행한 순수 전투 속도가 확인된다.', ['evidence-katakuri-future-sight-881-884', 'evidence-katakuri-snakeman-895']),
      item('techniqueMastery', 82, '모치 신체의 부분 변형, 공격 형태의 모방·변형, 각성 환경 제어, 무기와 능력의 결합을 매우 높은 수준으로 수행한다. 미래예지와의 정밀 결합은 Raw Haki Contribution으로 분리한다.', ['evidence-katakuri-future-sight-881-884', 'evidence-katakuri-awakening-882', 'evidence-katakuri-armament-883', 'evidence-katakuri-gear4-counter-883-885'], [{ hakiType: 'observation', stat: 'techniqueMastery', amount: 6, application: '고급 견문색의 미래예지와 모치 신체 변형을 정밀하게 결합', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('combatIQ', 79, 'Gear 4 변신 방해와 상대 행동 선제 차단 등 높은 전투 판단이 확인된다. 다만 미래예지에서 얻는 정보 우위를 Technique와 Combat IQ에 과도하게 중복 가산하지 않기 위해 Base를 한 단계 보수적으로 두고 실제 정보 활용만 Haki Contribution으로 반영한다.', ['evidence-katakuri-future-sight-881-884', 'evidence-katakuri-gear4-counter-883-885'], [{ hakiType: 'observation', stat: 'combatIQ', amount: 4, application: '미래예지로 얻은 정보를 선제 차단과 대응 선택에 연결', evidenceIds: ['evidence-katakuri-future-sight-881-884'] }]),
      item('versatility', 82, '근접 격투·삼지창·중원거리 모치 공격·구속·신체 변형·각성 환경 제어·회피 등 직접 전투 안에서의 적용 폭이 매우 넓다. 능력의 강도와 정밀 숙련을 반복 가산하지 않고 상황·거리·수단 전환의 폭을 평가한다.', ['evidence-katakuri-awakening-882', 'evidence-katakuri-conquerors-893', 'evidence-katakuri-gear4-counter-883-885']),
    ],
  },
  {
    id: 'evaluation-smoothie', characterId: 'smoothie', evaluationDataVersion: 'evaluation-0.1.23', status: 'draft',
    items: [
      item('attack', 76, '수분 흡수로 자신과 검을 거대화하고 써니호를 위협하는 대형 장거리 참격을 반복했다. 잠재 출력은 높지만 상위권 전투원에게 직접 적중해 큰 피해를 준 표본이 부족해 Marco보다 한 단계 낮게 평가한다.', ['evidence-smoothie-pursuit-894']),
      item('defense', 75, '레이주의 공격 이후 독을 능력으로 제거하는 자기 대응은 확인되지만 피격 자체를 막은 성과는 아니다. 강한 직접 방어·회피 표본이 부족해 중립적 임시값을 둔다.', ['evidence-smoothie-poison-869']),
      item('stamina', 76, '홀케이크 후반 추격전에서 함대를 이끌며 거대화·장거리 공격을 반복하지만 고강도 1대1 장기전으로 지구력을 직접 시험한 표본은 부족하다.', ['evidence-smoothie-pursuit-894', 'evidence-smoothie-command-897']),
      item('speed', 74, '원작에서 상위권과 비교 가능한 개인 이동·반응 속도 표본이 매우 적다. 써니호의 회피를 Smoothie의 낮은 속도 증거로 보지 않으며 정보 부족을 반영한 중립적 draft 값이다.', []),
      item('techniqueMastery', 80, '즙즙 열매를 접촉 탈수, 자기 독 제거, 수분 흡수, 신체·검 거대화, 장거리 방출까지 서로 다른 방식으로 정밀하게 응용한다. 표본은 적지만 능력 운용 자체의 숙련은 높다.', ['evidence-smoothie-poison-869', 'evidence-smoothie-pursuit-894']),
      item('combatIQ', 77, '추격 함대에 써니호의 후방을 막고 포위하도록 지시하는 등 전장 판단과 지휘가 확인된다. Katakuri처럼 1대1에서 반복적인 상대 분석·선제 대응을 보여주는 표본은 부족하다.', ['evidence-smoothie-command-897']),
      item('versatility', 79, '접촉 탈수·상태이상 제거·자기 강화·무기 강화·장거리 공격·함대 지휘까지 적용 폭은 넓다. 다만 실제 전투 역할의 검증 범위가 Marco·Katakuri·Queen·King보다 좁아 한 단계 낮게 평가한다.', ['evidence-smoothie-poison-869', 'evidence-smoothie-pursuit-894', 'evidence-smoothie-command-897']),
    ],
  },
  {
    id: 'evaluation-cracker', characterId: 'cracker', evaluationDataVersion: 'evaluation-0.1.23', status: 'draft',
    items: [
      item('attack', 71, '무장색 검격으로 Gear 4 루피의 팔에 실제 피해를 줬지만, Marco보다 높은 상대 질·반복 공격 성과는 부족하고 Jack과의 직접 우열도 명확하지 않다. 실제 무장색 적용은 Base와 분리한다.', ['evidence-cracker-biscuit-837-838', 'evidence-cracker-urouge-837'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '무장색을 검에 적용해 Gear 4 루피에게 실제 검격 피해를 줌', evidenceIds: ['evidence-cracker-biscuit-837-838'] }]),
      item('defense', 71, '비스킷 갑옷·방패가 Gear 4 이전 루피의 공격을 막는 실제 방어 시스템으로 기능했다. Gear 4에는 갑옷이 부서지고 물에 젖으면 약해지는 명확한 상성 한계를 함께 반영한다.', ['evidence-cracker-biscuit-837-838', 'evidence-cracker-long-battle-842']),
      item('stamina', 73, '약 11시간 동안 비스킷 병사를 계속 생성·조종하며 전투를 이어갔다. 본체가 11시간 내내 피해를 직접 견딘 것으로 과장하지 않고 능력 지속력 중심으로 평가한다.', ['evidence-cracker-long-battle-842']),
      item('speed', 71, 'Gear 4 루피에게 직접 검격을 적중시킬 전투 반응은 있으나 순수 Speed가 강점으로 반복 확인되는 장면은 적다.', ['evidence-cracker-biscuit-837-838']),
      item('techniqueMastery', 73, '비스킷을 병사·갑옷·무기 형태로 만들고 장시간 조종하는 숙련은 확인된다. 다만 전투 패턴이 비교적 반복적이며 능력 강도 자체를 숙련도로 중복 가산하지 않는다.', ['evidence-cracker-biscuit-837-838', 'evidence-cracker-long-battle-842']),
      item('combatIQ', 70, '능력의 장점을 활용해 본체를 보호하고 병사를 지속 투입하지만 나미의 물 상성 대응 이후 전투 양상을 크게 전환하는 모습은 제한적이다.', ['evidence-cracker-long-battle-842']),
      item('versatility', 72, '비스킷 하나로 공격·방어·다수 병사 운용·본체 은폐를 수행하지만 실제 역할과 거리 전환의 폭은 상위 분석군보다 제한적이다.', ['evidence-cracker-biscuit-837-838', 'evidence-cracker-long-battle-842']),
    ],
  },
  {
    id: 'evaluation-zoro', characterId: 'zoro', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 85, '카이도에게 영구 흉터를 남긴 아수라와 킹을 격파한 삼도류의 순수 결정력을 높은 Base로 평가하고, 킹전의 의식적 무장색·패왕색 강화 효과는 별도 Haki Contribution으로 분리한다.', ['evidence-zoro-ashura-scar-1010', 'evidence-zoro-conquerors-1033-1035', 'evidence-zoro-lucci-1110-1111'], [
        { hakiType: 'armament', stat: 'attack', amount: 4, application: '검에 무장색을 결합해 고출력 검격을 강화', evidenceIds: ['evidence-zoro-conquerors-1033-1035'] },
        { hakiType: 'conquerors', stat: 'attack', amount: 6, application: '킹전에서 패왕색을 세 검에 두르는 공격 운용을 실제 결정타에 적용', evidenceIds: ['evidence-zoro-conquerors-1033-1035'] },
      ]),
      item('defense', 81, '삼도류의 공방 능력과 패해를 순간 차단해 동료의 회피 시간을 확보한 성과를 반영한다. 완전 상쇄가 아니고 큰 피해를 입었으므로 최고 방어 specialist 수준으로 확대하지 않으며 실제 무장색 방어 적용을 별도 반영한다.', ['evidence-zoro-hakai-1009'], [{ hakiType: 'armament', stat: 'defense', amount: 4, application: '검과 무장색을 이용한 고화력 공격 차단·공방 강화', evidenceIds: ['evidence-zoro-hakai-1009'] }]),
      item('stamina', 87, '스릴러 바크의 극한 누적 피해 생존과 와노 옥상에서 패해로 중상을 입은 뒤에도 아수라까지 성립시킨 반복 성과를 근거로 매우 높은 지구력을 평가한다.', ['evidence-zoro-nothing-happened-485', 'evidence-zoro-hakai-1009', 'evidence-zoro-ashura-scar-1010']),
      item('speed', 83, '상위권 전투에서 공격·요격을 성립시키는 높은 전투 속도를 인정하되 상디처럼 속도 자체가 세계관 최상위 특성으로 반복 강조되는 수준으로 확대하지 않는다.', ['evidence-zoro-conquerors-1033-1035']),
      item('techniqueMastery', 85, '일도류·이도류·삼도류·아수라와 공방 전환, 엔마 제어를 포함한 높은 검술 숙련을 Base로 평가하고 패기를 검술에 결합한 부분을 별도 Contribution으로 분리한다.', ['evidence-zoro-hakai-1009', 'evidence-zoro-ashura-scar-1010', 'evidence-zoro-conquerors-1033-1035'], [{ hakiType: 'armament', stat: 'techniqueMastery', amount: 4, application: '엔마를 포함한 삼도류에 무장색을 안정적으로 결합해 실전 운용', evidenceIds: ['evidence-zoro-conquerors-1033-1035'] }]),
      item('combatIQ', 82, '킹의 루나리아 불꽃 상태에 따른 방어·속도 규칙을 전투 중 파악하고 공격 타이밍을 바꾼 직접적인 분석·적응 성과를 평가한다.', ['evidence-zoro-lunarian-read-1035']),
      item('versatility', 82, '검술 하나를 근접 공격뿐 아니라 원거리 참격, 고화력 차단, 아군 보호, 다양한 도류와 아수라, 상태별 공략에 적용하는 폭을 평가한다. 수단의 개수보다 실제 역할 전환을 기준으로 한다.', ['evidence-zoro-hakai-1009', 'evidence-zoro-conquerors-1033-1035']),
    ],
  },
  {
    id: 'evaluation-sanji', characterId: 'sanji', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 81, '각성한 신체·근력·속도와 고열 발기술로 퀸을 격파한 결정력을 Base로 평가하고 Ifrit Jambe에 실제 결합된 무장색 강화는 별도 Contribution으로 분리한다.', ['evidence-sanji-speed-ifrit-1034'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: 'Ifrit Jambe의 고열·고속 발기술에 무장색을 결합', evidenceIds: ['evidence-sanji-speed-ifrit-1034'] }]),
      item('defense', 84, '외골격 각성 후 큰 손상에서 복구하고 강한 공격을 견디는 신체 성능과 키자루 레이저 차단을 반영한다. 회복 특성 자체를 중복 가산하지 않고 실제 방어 성과를 중심으로 평가한다.', ['evidence-sanji-exoskeleton-1028', 'evidence-sanji-speed-ifrit-1034', 'evidence-sanji-kizaru-laser-1107'], [{ hakiType: 'armament', stat: 'defense', amount: 2, application: '발기술과 신체 방어에 무장색을 실제 전투에서 결합', evidenceIds: ['evidence-sanji-speed-ifrit-1034'] }]),
      item('stamina', 85, '퀸의 압착으로 큰 신체 손상을 입은 뒤 복구해 고속 이동과 Ifrit Jambe 연속 공격으로 결전을 마친 실제 전투 지속 성과를 평가한다.', ['evidence-sanji-exoskeleton-1028', 'evidence-sanji-speed-ifrit-1034']),
      item('speed', 91, '퀸의 시야에서 사라질 정도의 순수 이동속도를 지속하고 Egghead에서 키자루의 레이저 공격에 개입한 표본을 근거로 세계관 최상위 속도군에 둔다. 견문색을 Speed에 별도 가산하지 않는다.', ['evidence-sanji-speed-ifrit-1034', 'evidence-sanji-kizaru-laser-1107', 'evidence-sanji-nusjuro-1113']),
      item('techniqueMastery', 84, '발기술·공중기동·Diable/Ifrit 계열 강화와 신체 능력을 정교하게 결합한다. Ifrit의 공격력 자체와 숙련을 중복 가산하지 않는다.', ['evidence-sanji-speed-ifrit-1034']),
      item('combatIQ', 81, '전투 중 상황 판단과 즉각적인 보호·요격 능력은 높지만 비전투 전략·기지를 Combat IQ에 과도하게 포함하지 않고 현재 직접 전투 Evidence 범위에서 평가한다.', ['evidence-sanji-kizaru-laser-1107']),
      item('versatility', 82, '초고속 근접전·공중전·요격·아군 보호·화염 강화 발기술·높은 방어 지속력을 실제 전투에서 전환해 사용한다. 요리 능력은 전투 점수에 포함하지 않는다.', ['evidence-sanji-exoskeleton-1028', 'evidence-sanji-speed-ifrit-1034', 'evidence-sanji-kizaru-laser-1107', 'evidence-sanji-nusjuro-1113']),
    ],
  },
  {
    id: 'evaluation-jinbe', characterId: 'jinbe', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 76, '어인공수도로 후즈후를 격파하고 물·수분을 활용해 충격을 전달하는 높은 기본 공격 숙련을 평가하며, 실제 무장색 강화는 별도 Contribution으로 분리한다.', ['evidence-jinbe-fishman-karate-629', 'evidence-jinbe-whos-who-1018'], [{ hakiType: 'armament', stat: 'attack', amount: 4, application: '후즈후와의 근접 공방에서 무장색을 어인공수도 공격에 결합', evidenceIds: ['evidence-jinbe-whos-who-1018'] }]),
      item('defense', 78, '빅맘의 공격을 잠시 받아낸 성과와 후즈후의 공격을 견딘 방어력을 평가하되 빅맘에게 힘에서 밀린 한계와 King급 특수 방어와의 차이를 반영한다.', ['evidence-jinbe-big-mom-890', 'evidence-jinbe-whos-who-1018'], [{ hakiType: 'armament', stat: 'defense', amount: 4, application: '빅맘·후즈후의 공격에 무장색 경화를 실제 방어로 적용', evidenceIds: ['evidence-jinbe-big-mom-890', 'evidence-jinbe-whos-who-1018'] }]),
      item('stamina', 79, '높은 기본 체력과 전투 지속력을 인정하되 현재 상위권 상대의 장기 고강도 전투 표본이 Jack·Katakuri만큼 직접적이지 않아 보수적으로 평가한다.', ['evidence-jinbe-ace-five-days-552', 'evidence-jinbe-akainu-575', 'evidence-jinbe-whos-who-1018']),
      item('speed', 77, '상위권 근접전에 대응 가능한 반응은 있으나 순수 속도 자체가 대표 강점으로 반복 검증되지는 않았다.', ['evidence-jinbe-whos-who-1018']),
      item('techniqueMastery', 82, '어인공수도의 달인으로 물과 상대 신체의 수분까지 이용하는 정교한 원리를 실전에 적용한다. 다만 Katakuri·Vista·Zoro의 상위 복합 숙련과 자동 동급으로 보지 않는다.', ['evidence-jinbe-fishman-karate-629', 'evidence-jinbe-whos-who-1018']),
      item('combatIQ', 80, '빅맘전에서 해상 환경과 물을 상성 대응·반격에 활용하는 베테랑 판단을 인정하되 1대1에서 상대 메커니즘을 반복 분석하는 최고 수준 표본은 제한적이다.', ['evidence-jinbe-big-mom-890']),
      item('versatility', 80, '근접 어인공수도, 물·수분 매개 공격, 환경 활용, 방어와 반격 전환을 실제 전투에 적용한다. 종족 특성 자체는 별도 가산하지 않는다.', ['evidence-jinbe-fishman-karate-629', 'evidence-jinbe-big-mom-890']),
    ],
  }

  {
    id: 'evaluation-shanks', characterId: 'shanks', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 94, 'Kid전 Kamusari의 결정력과 Whitebeard와의 충돌을 반영한다. Zoro 90보다 명확히 높은 최상위 단일 결정력으로 보되 절대 천장은 남긴다.'),
      item('defense', 91, 'Whitebeard·Akainu 공격에 대한 차단과 미래예지 기반 선제 방어를 함께 반영한다.'),
      item('stamina', 88, '현재까지 뚜렷한 소모 한계는 없지만 장기 고강도 1대1 표본이 부족해 최상단으로 추정하지 않는다.'),
      item('speed', 93, 'Kid의 공격 발사 전에 장거리를 좁혀 선제 타격한 실제 기동 성과를 미래예지 자체와 분리해 평가한다.'),
      item('techniqueMastery', 94, '검술·미래예지·패왕색과 Kamusari를 하나의 실전 체계로 정밀하게 결합한다.'),
      item('combatIQ', 92, '미래의 함대 피해를 확인한 직후 위험도를 판단하고 최우선 위협을 즉시 제거한 전투 판단을 반영한다.'),
      item('versatility', 94, '검술·고속 요격·미래예지·근접 강화·장거리 패왕색 개입 등 다양한 거리와 목적에 대응한다.'),
    ],
  },
  {
    id: 'evaluation-garp', characterId: 'garp', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 99, '로저와 반복적으로 사투한 전성기 위상과 노년 Galaxy 계열 타격의 직접 고점을 함께 반영한다.'),
      item('defense', 96, '전성기 최고 수준의 패기·신체 방어를 평가하되 노년의 관통상 등 실제 피격 한계도 고려한다.'),
      item('stamina', 99, '전성기 로저급 장기 사투 서사와 노년 중상 이후 전투 지속을 결합한 최상단 지속력 평가다.'),
      item('speed', 96, '노년 하치노스에서도 고속 접근·연속 개입이 가능하며 전성기 신체 고점을 반영한다.'),
      item('techniqueMastery', 97, 'Blue Hole·Galaxy Impact·Galaxy Divide 등 제한된 도구를 다양한 타격 구조로 구현하는 최고 수준 숙련이다.'),
      item('combatIQ', 94, '수십 년 최상위 전투 경험과 하치노스 구조전에서의 즉각적 판단·지휘를 반영한다.'),
      item('versatility', 85, '응용 기술은 뛰어나지만 주된 전투 수단이 신체·권격·패기에 집중된 점을 다른 축과 분리한다.'),
    ],
  },
  {
    id: 'evaluation-akainu', characterId: 'akainu', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 96, '마그마의 높은 관통·살상력과 정상결전의 반복적 중상 성과를 최상위 공격 근거로 본다.'),
      item('defense', 93, 'Whitebeard를 포함한 강자들의 공격을 받은 뒤에도 전선을 유지한 실제 공방을 반영한다.'),
      item('stamina', 96, 'Kuzan과 10일 결투를 지속한 명시적 장기전 최고급 표본이다.'),
      item('speed', 86, '상위권 전투 반응은 충분하지만 속도 특화자와 비교할 직접 기동 표본은 상대적으로 제한적이다.'),
      item('techniqueMastery', 91, '마그마를 근접·원거리·광역 공격으로 안정적으로 운용한다.'),
      item('combatIQ', 91, '전쟁 상황에서 목표 우선순위와 상대 심리를 활용하는 판단을 반복적으로 보였다.'),
      item('versatility', 94, '근접 관통·원거리 화산탄·광역 지형 변화와 지속 압박을 모두 수행한다.'),
    ],
  },
  {
    id: 'evaluation-kuzan', characterId: 'kuzan', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 93, '빙결 자체의 한계를 최상위 무투와 결합해 보완한다. Zoro 90보다 높은 종합 공격력을 인정하되 Shanks·Akainu급 순간 결정력과 구분한다.'),
      item('defense', 92, '자연계 신체 재구성과 빙결 방어, 최상위 근접 공방을 함께 반영한다.'),
      item('stamina', 96, 'Akainu와 10일간 결투한 직접 장기전 근거다.'),
      item('speed', 91, '노년 Garp와 근접 맞교환을 성립시키고 고속 전투에 대응한 직접 묘사를 반영한다.'),
      item('techniqueMastery', 93, '빙결·무기 생성·지형 통제·근접 무투를 상황별로 전환하는 높은 숙련이다.'),
      item('combatIQ', 93, '불리한 상성에서도 빙결을 제압·지형·보조 수단으로 전환하고 무투까지 연결하는 전투 활용도를 반영한다.'),
      item('versatility', 96, '공격·방어·구속·이동·환경 통제와 근접 무투를 모두 수행한다.'),
    ],
  },
  {
    id: 'evaluation-kizaru', characterId: 'kizaru', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 93, '레이저와 고속 가속 타격의 높은 출력·관통 성과를 반영한다.'),
      item('defense', 90, '상위권 공격에 대응·회피하지만 Gear 5의 강한 타격에는 실제로 행동 제한이 발생한 점을 함께 반영한다.'),
      item('stamina', 93, 'Gear 5 Luffy와 교전한 뒤에도 재개입하고 임무를 이어간 전투 지속력을 반영한다.'),
      item('speed', 99, '빛 기반 이동·가속과 실전 기동을 현 모델 최고 수준 속도 특화로 평가하되 100의 절대 천장은 남긴다.'),
      item('techniqueMastery', 95, '레이저·광검·고속 발차기·분신 등 빛 능력을 정밀하고 다층적으로 운용한다.'),
      item('combatIQ', 91, 'Luffy와 불필요한 정면전을 지속하기보다 교전·이탈을 반복하며 Vegapunk 제거라는 임무를 우선한 판단을 반영한다.'),
      item('versatility', 97, '이동·근접·원거리·광역 사격·무기·분신을 하나의 능력으로 수행하는 최고 수준 적용 폭이다.'),
    ],
  },
  {
    id: 'evaluation-fujitora', characterId: 'fujitora', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 92, '검술에 중력과 운석을 결합하는 대규모 공격력을 반영해 Zoro 90보다 소폭 높은 고점으로 평가한다.'),
      item('defense', 89, '검술·중력 제어를 통한 방어 대응은 강하지만 최상단 직접 내구 표본은 제한적이다.'),
      item('stamina', 87, 'Dressrosa의 연속 활동은 확인되지만 10일 결투급 장기전 근거는 없다.'),
      item('speed', 85, '상위 전투원의 반응 속도는 갖추지만 속도 특화 직접 묘사는 상대적으로 적다.'),
      item('techniqueMastery', 92, '검술과 정밀한 중력 방향·강도 조절을 결합한다.'),
      item('combatIQ', 87, '전략·정치적 판단은 뛰어나지만 전투 중 고난도 적응을 반복적으로 보여준 직접 표본은 Kuzan·Shanks·Kizaru보다 적다.'),
      item('versatility', 96, '중력 압박·방향 전환·부유·운석·검술 등 전장 통제 범위가 매우 넓다.'),
    ],
  },
  {
    id: 'evaluation-ryokugyu', characterId: 'ryokugyu', evaluationDataVersion: 'evaluation-0.1.24-candidate', status: 'draft',
    items: [
      item('attack', 91, '대장급 전투원으로서 광역 구속·흡수와 강한 직접 제압 성과를 인정하되, 현재 묘사상 막타 결정력은 Fujitora 92 이상으로 올리지 않는다.'),
      item('defense', 91, '식물 신체와 재생을 통해 큰 공격 뒤에도 전투 형태를 복구하는 방어 성과를 반영한다.'),
      item('stamina', 91, '다수 상대 연속 제압과 재생 후 전투 지속을 반영하되 명시적 초장기전 표본은 없다.'),
      item('speed', 84, '비행·기동 수단은 있으나 속도 자체가 최상위 직접 강점으로 묘사되지는 않는다.'),
      item('techniqueMastery', 88, '다양한 식물 형태와 흡수·구속·재생을 안정적으로 운용한다.'),
      item('combatIQ', 84, '능력 활용은 넓지만 최상위 전술 판단을 입증할 반복 직접 표본은 아직 제한적이다.'),
      item('versatility', 97, '광역 식생·구속·흡수·재생·비행·지형 변화까지 수행하는 최고 수준 능력 적용 폭이다.'),
    ],
  },
]
