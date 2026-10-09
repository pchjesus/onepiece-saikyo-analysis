import type { CombatStat } from './types'

export type CombatStatDefinition = {
  stat: CombatStat
  label: string
  description: string
  includes: string
  excludes: string
}

export const COMBAT_STAT_DEFINITIONS: Record<CombatStat, CombatStatDefinition> = {
  attack: {
    stat: 'attack',
    label: '공격력',
    description: '상대에게 실제로 유효한 피해를 줄 수 있는 공격 능력과 전투 성과를 평가합니다.',
    includes: '공격 위력, 유효타 성과, 공격 수단의 전투 활용, 공격의 지속·조합 능력',
    excludes: '특수 전투요소의 존재 자체를 공격력에 자동 가산하지 않습니다. 해당 요소가 실제 공격 성과를 만들었을 때만 공격력 근거로 사용하며, 적용 범위는 다재다능함에서 별도로 평가합니다.',
  },
  defense: {
    stat: 'defense',
    label: '방어력',
    description: '상대의 공격을 회피·방어·차단하거나 피해를 직접 줄여 자신을 보호하는 종합적인 방어 능력을 평가합니다.',
    includes: '회피, 방어, 차단, 피해 감소, 방어 특성, 특정 상태에서 강화되는 조건부 방어 능력',
    excludes: '손상 이후의 회복·재생 사실 자체는 Defense에 자동 합산하지 않습니다. 다만 재생·특수 능력을 이용해 실제 공격을 차단·무효화하거나 보호 대상을 지킨 관찰 가능한 방어 성과는 방어력 근거로 사용할 수 있습니다.',
  },
  stamina: {
    stat: 'stamina',
    label: '체력·지구력',
    description: '피로와 체력 소모가 누적되는 상황에서도 전투와 능력 사용을 지속할 수 있는 능력을 평가합니다.',
    includes: '장시간 전투, 반복적인 능력 사용, 피로 누적에 대한 저항, 전투 지속력',
    excludes: '한 번의 공격을 막거나 피하는 방어 성능 자체는 방어력에서 평가하며, 장시간 전투 수행과는 구분합니다.',
  },
  speed: {
    stat: 'speed',
    label: '속도',
    description: '이동·반응·접근·이탈과 전투 중 기동을 포함한 전반적인 속도 능력을 평가합니다.',
    includes: '이동 속도, 반응 속도, 공격·회피 속도, 접근·이탈과 공중·지상 기동',
    excludes: '속도를 어떻게 활용할지에 대한 전술적 판단은 전투 지능, 다양한 상황에서 속도를 포함한 전투 수단을 전환하는 능력은 다재다능함에서 별도로 평가합니다.',
  },
  techniqueMastery: {
    stat: 'techniqueMastery',
    label: '기술·숙련도',
    description: '자신이 사용하는 전투 수단과 능력을 얼마나 높은 수준으로 정교하게 다루는지를 평가합니다.',
    includes: '검술·체술·무기술·능력 운용의 숙련도, 기술의 정밀성, 전투 수단의 완성도, 자신의 고유 능력을 높은 수준으로 제어·구사하는 능력',
    excludes: '고유 능력·종족 특성·개조 등 특수 전투요소 자체는 특수 전투 프로필에 기록합니다. 상황에 따라 무엇을 선택하고 사용하는지는 전투 지능, 서로 다른 전투 상황에 적용하는 폭은 다재다능함에서 별도로 평가합니다.',
  },
  combatIQ: {
    stat: 'combatIQ',
    label: '전투 지능',
    description: '전투 중 상황을 판단하고 적절한 전술·대응을 선택하며 자신의 능력을 효율적으로 운용하는 능력을 평가합니다.',
    includes: '전투 판단, 전술 선택, 상황 대응, 상대 분석, 능력과 전장의 효율적 활용, 지휘',
    excludes: '일반적인 지식이나 학식만으로 높은 점수를 부여하지 않으며, 다양한 전투 수단을 보유했다는 사실 자체는 다재다능함에서 별도로 평가합니다.',
  },
  versatility: {
    stat: 'versatility',
    label: '다재다능함',
    description: '서로 다른 전투 상황·거리·상대·목적에 맞춰 여러 능력과 전투 방식을 효과적으로 전환·적용할 수 있는 폭과 적응력을 평가합니다.',
    includes: '공격·방어·지원·기동 등 역할 전환, 근거리·원거리 대응, 다대일·다수전 대응, 다양한 상대와 상황에 대한 전투 방식의 전환, 능력의 복합적 활용',
    excludes: '특수 전투요소의 존재 자체는 특수 전투 프로필에 기록하고, 상황을 읽고 최적의 선택을 하는 판단력은 전투 지능에서 별도로 평가합니다. 다양한 수단을 보유했더라도 실제 적용 범위가 확인되지 않으면 높은 점수를 자동으로 부여하지 않습니다.',
  },
}
