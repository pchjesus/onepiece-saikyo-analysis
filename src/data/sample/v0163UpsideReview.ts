import type { CombatStat } from '../../domain/evaluation/types'

/**
 * v0.1.63 read-only, source-linked reasoning audit; never consumed as
 * numeric Evaluation data or a ranking/matchup input.
 *
 * A reviewed uplift candidate is NOT permission to change scores.
 * The currently stored seven Stat rows remain the single score source.
 */
export type UpsideFinding = 'promising-but-unquantified' | 'evidence-too-sparse' | 'already-captured-needs-independent-feat'
export type ReviewPriority = 'high' | 'medium' | 'low'

export type UpsideAxisReview = {
  characterId: 'vista' | 'shanks'
  stat: CombatStat
  priority: ReviewPriority
  finding: UpsideFinding
  evidenceIds: readonly string[]
  comparatorIds: readonly string[]
  independentObservedEffect: string
  constraints: string
  approvalGate: string
}

export const v0163UpsideAxisReviews: readonly UpsideAxisReview[] = [
  {
    characterId: 'vista', stat: 'attack', priority: 'medium', finding: 'promising-but-unquantified',
    evidenceIds: ['evidence-vista-mihawk-561-562', 'evidence-vista-armament-akainu-574'],
    comparatorIds: ['mihawk', 'zoro', 'marco'],
    independentObservedEffect: '미호크에게 실전 검격으로 공방을 강제했고, 마르코와 함께 사카즈키에게 무장색 검격을 적용했다. 단순 기술 표현이 아닌 실제 공격 시도 두 사건이다.',
    constraints: '미호크의 유의미한 피해·방어 파괴 확인 안 됨; 사카즈키 공격은 2인 합동이며 지속 피해는 확정되지 않음. 패기 Raw4가 이미 Attack에 포함돼 있다.',
    approvalGate: 'Ch.561-562 / 574 원본에서 미호크 대상 공격 압력과 사카즈키 피해를 별도 확인하고 동 축 상대 앵커 및 Base80에서 누락된 성과를 제시해야 한다.',
  },
  {
    characterId: 'vista', stat: 'defense', priority: 'medium', finding: 'promising-but-unquantified',
    evidenceIds: ['evidence-vista-mihawk-561-562'],
    comparatorIds: ['mihawk', 'jozu', 'marco'],
    independentObservedEffect: '미호크와의 직접 검술 공방 중 의미 있는 부상이 관찰되지 않았고, 추격 차단 역할을 유지했다.',
    constraints: '짧은 교전·미호크의 최대 출력 및 전투 의도 미확정. 비스타의 무피해만으로 모든 화력에 대한 내구도나 장기 방어를 증명하지 못한다.',
    approvalGate: '막기·회피·손상 내성 중 실제 성과를 구분해 방어 Base79의 빠진 내용을 찾고, 미호크·죠즈의 Defense와 동일 기준으로 비교해야 한다.',
  },
  {
    characterId: 'vista', stat: 'stamina', priority: 'low', finding: 'evidence-too-sparse',
    evidenceIds: ['evidence-vista-mihawk-561-562', 'evidence-vista-armament-akainu-574'],
    comparatorIds: ['jozu', 'marco', 'jinbe'],
    independentObservedEffect: '정상결전의 서로 다른 국면에서 전투 행동이 나타나지만 비스타 개인의 장시간 고강도 누적 피로·한계는 분리 관찰되지 않았다.',
    constraints: '전쟁 참전·직책 자체는 Stamina 보너스 아님; 전체 전쟁 경과시간을 비스타 개인의 연속 격전 시간으로 취급할 수 없다.',
    approvalGate: '비교 가능한 누적 피해·피로·회복·지속시간이 독립 근거로 확인되기 전까지 Base77 임시값과 E3 유지.',
  },
  {
    characterId: 'vista', stat: 'speed', priority: 'medium', finding: 'promising-but-unquantified',
    evidenceIds: ['evidence-vista-mihawk-561-562'],
    comparatorIds: ['mihawk', 'zoro', 'king'],
    independentObservedEffect: '루피를 쫓던 미호크를 제때 요격해 검술 공방을 성립시킨 접근·반응 결과는 존재한다.',
    constraints: '사전 위치, 미호크의 표적 전환, 이동 거리와 속력은 공개되지 않음. 미호크의 반응속도를 비스타의 순수 달리기 속도로 환산할 수 없다.',
    approvalGate: '반응·이동·검속을 컷 단위로 구분하고 직접 비교 가능한 반복 Speed 성과가 확인될 때만 Base80 상향 제안.',
  },
  {
    characterId: 'vista', stat: 'techniqueMastery', priority: 'high', finding: 'promising-but-unquantified',
    evidenceIds: ['evidence-vista-official-mihawk-profile', 'evidence-vista-mihawk-561-562'],
    comparatorIds: ['mihawk', 'zoro', 'king'],
    independentObservedEffect: 'ONE PIECE.com 공식 프로필이 미호크와 호각으로 겨룰 정도의 이도류 대검호라 명시하고 실전에서도 검술 공방을 확인한다.',
    constraints: '이는 검술의 질적 비교이지 7축 전체 동급 보증이 아니며, 짧은 교전·의도·기술 노출량이 제한적이다. 무장색 Technique Raw2는 별도 효과 미검증.',
    approvalGate: '미호크 Technique99, 조로 Technique87과 시점·검술 숙련을 비교하고 Ch.561-562의 검술 기술·정밀·수비 전환을 원본에서 확인해야 Base86 상향 폭을 논의할 수 있다.',
  },
  {
    characterId: 'vista', stat: 'combatIQ', priority: 'low', finding: 'promising-but-unquantified',
    evidenceIds: ['evidence-vista-mihawk-561-562'],
    comparatorIds: ['mihawk', 'zoro', 'jinbe'],
    independentObservedEffect: '강자를 요격해 아군의 진행 목표를 돕고 교전 연기 제안을 수용했다는 전장 판단은 확인된다.',
    constraints: '상대 기술 분석, 새로운 정보에 대한 전술 재설계가 반복 확인된 것은 아니다. 1회의 합리적 결정이 고급 전투지능 전체를 대표하지 않는다.',
    approvalGate: '다른 독립 국면에서 목적 선정·정보 파악·전술 전환 사례를 확보해야 Base77을 재평가한다.',
  },
  {
    characterId: 'vista', stat: 'versatility', priority: 'medium', finding: 'promising-but-unquantified',
    evidenceIds: ['evidence-vista-mihawk-561-562', 'evidence-vista-armament-akainu-574'],
    comparatorIds: ['mihawk', 'zoro', 'marco'],
    independentObservedEffect: '검 하나의 기술 체계로 공격·방어·강자 요격·아군 보호 및 대장 상대 합동 개입에 참여해 기능별 역할을 전환했다.',
    constraints: '독립 사거리·광역 절단·비검술 특수능력은 현 채택 자료에서 미확인. 꽃잎 연출을 실체적 능력으로 가산하지 않음.',
    approvalGate: '전투 수단의 개수 아닌 확인된 범위·목적·다중 상대 역할을 미호크/조로/마르코와 같은 기준으로 비교해 Base74 재평가.',
  },
  {
    characterId: 'shanks', stat: 'attack', priority: 'medium', finding: 'already-captured-needs-independent-feat',
    evidenceIds: ['evidence-shanks-kid-divine-departure-1079'], comparatorIds: ['mihawk', 'roger'],
    independentObservedEffect: '키드의 전자기포를 일격으로 차단하고 키드를 제압한 검격 출력은 직접 확인된다.',
    constraints: 'Attack97에 반영 완료; 도리·브로기의 함선 파괴는 샹크스의 타격이 아님. 원래 Base94와 패왕Raw6 중복 심사는 별도.',
    approvalGate: '기존 Attack97보다 높은 출력을 입증하는 독립 행동과 캐릭터 앵커가 없는 한 추가 Raw·Base 없음.',
  },
  {
    characterId: 'shanks', stat: 'defense', priority: 'low', finding: 'already-captured-needs-independent-feat',
    evidenceIds: ['evidence-shanks-sakazuki-block-579'], comparatorIds: ['mihawk', 'kaido'],
    independentObservedEffect: '사카즈키의 코비 공격을 검으로 차단했다.',
    constraints: 'Defense91에 이미 포함됨; 미래예지 그 자체를 방어 강화로 자동 중복하지 않는다.',
    approvalGate: '복수의 강자 공격에 대한 새로운 실제 방어 성과와 상황 분리가 있어야 한다.',
  },
  {
    characterId: 'shanks', stat: 'stamina', priority: 'low', finding: 'evidence-too-sparse',
    evidenceIds: [], comparatorIds: ['mihawk', 'kaido'],
    independentObservedEffect: '현재까지 명확한 소모 한계 공개가 없지만 장시간 고강도 1대1 지속력은 관찰 부족이다.',
    constraints: '무패·사황 칭호·긴 항해만으로 Stamina의 직접 수치는 확정하지 않는다.',
    approvalGate: '장시간 소모·누적 피해 맥락과 실제 지속 성과 확보 전 E3/88 유지.',
  },
  {
    characterId: 'shanks', stat: 'speed', priority: 'medium', finding: 'already-captured-needs-independent-feat',
    evidenceIds: ['evidence-shanks-kid-divine-departure-1079', 'evidence-shanks-sakazuki-block-579'], comparatorIds: ['mihawk', 'kaido'],
    independentObservedEffect: '키드의 함대 공격 전 진입해 선제 제압했다.',
    constraints: 'Speed95에 이미 포함, 사전 미래예지 시간과 신체 기동을 구별해야 한다.',
    approvalGate: '두 사건의 순수 접근 거리·조건을 확인하고 별도의 미반영 기동성 근거 필요.',
  },
  {
    characterId: 'shanks', stat: 'techniqueMastery', priority: 'high', finding: 'already-captured-needs-independent-feat',
    evidenceIds: ['evidence-shanks-kid-divine-departure-1079'], comparatorIds: ['mihawk', 'roger'],
    independentObservedEffect: '카무사리 실행에서 견문 미래예지에 따른 타이밍과 패왕색 검격 제어가 연결된다.',
    constraints: '동일 장면이 Technique 패왕Raw4+견문Raw4로 겹치고 Attack/IQ에도 사용됨; 수치 추가 전 기능 분리 우선.',
    approvalGate: '패기 출력과 무기 제어·선행 정보가 서로 다른 검증 가능한 효과를 만들어 낸 사례와 동 축 앵커 필요.',
  },
  {
    characterId: 'shanks', stat: 'combatIQ', priority: 'medium', finding: 'already-captured-needs-independent-feat',
    evidenceIds: ['evidence-shanks-aramaki-haki-1055', 'evidence-shanks-kid-divine-departure-1079'], comparatorIds: ['mihawk', 'katakuri'],
    independentObservedEffect: '산하 해적이 타격받을 미래를 확인하고 선제 목표를 선택했다.',
    constraints: 'Base91 및 견문Raw4에 이미 판단·정보가 반영됨. 사황의 명성과 결단을 전술 고점으로 자동 환산할 수 없다.',
    approvalGate: '정보 습득과 실제 의사결정 성과를 별도 여러 사건으로 보여야 추가 점수 검토.',
  },
  {
    characterId: 'shanks', stat: 'versatility', priority: 'high', finding: 'already-captured-needs-independent-feat',
    evidenceIds: ['evidence-shanks-aramaki-haki-1055'], comparatorIds: ['mihawk', 'katakuri'],
    independentObservedEffect: '로쿠규에 대한 원거리 패왕색 위압은 키드전 근거리 검격과 기능·사거리가 다른 별도 행동이다.',
    constraints: '현재 Versatility88의 설명과 Evidence에 이미 해당 원거리 위압이 포함됨. 2개 사건을 단순 세기하여 재가산할 수 없다.',
    approvalGate: '다른 사거리·표적·상황에서의 반복 가능 역할 확장을 증명하거나 현행 Base88의 동일축 앵커와 격차를 밝혀야 한다.',
  },
]

export type UnresolvedHakiOverlap = {
  characterId: 'vista' | 'shanks' | 'jinbe' | 'katakuri'
  evidenceId: string
  evaluatedStats: readonly CombatStat[]
  decision: 'retain-and-require-distinct-effect'
  reason: string
  remainingQuestion: string
}

export const v0163UnresolvedHakiOverlaps: readonly UnresolvedHakiOverlap[] = [
  {
    characterId: 'vista', evidenceId: 'evidence-vista-armament-akainu-574',
    evaluatedStats: ['attack', 'techniqueMastery'],
    decision: 'retain-and-require-distinct-effect',
    reason: 'Attack Raw4/Technique Raw2는 같은 사카즈키 합동 검격에서 유래한다. 무장색 사용의 사실과 별개로 두 축의 독립적 예외 증분은 검증되지 않았다.',
    remainingQuestion: '검격 출력과 검술 패기 운용의 개별 관찰 성과가 Ch.574에서 분리되었는가? 둘 다 현재 보존하며 증액은 금지.',
  },
  {
    characterId: 'shanks', evidenceId: 'evidence-shanks-kid-divine-departure-1079',
    evaluatedStats: ['attack', 'techniqueMastery', 'combatIQ'],
    decision: 'retain-and-require-distinct-effect',
    reason: '카무사리 하나가 Attack 패왕Raw6, Technique 패왕/견문Raw4+4, IQ 견문Raw4로 중복 인용된다.',
    remainingQuestion: '미래정보→접근→검격의 서로 다른 결과가 독립된 한계효과인가? 로쿠규 별개 사건은 Versatility Base에 포함되어 있다.',
  },
  {
    characterId: 'katakuri', evidenceId: 'evidence-katakuri-future-sight-881-884',
    evaluatedStats: ['defense', 'techniqueMastery'],
    decision: 'retain-and-require-distinct-effect',
    reason: 'Defense Raw6는 미래예지에 의한 회피, Technique Raw6는 견문과 모치 부분변형의 정밀 제어로 설명하나 같은 회피 장면에서 유래한다.',
    remainingQuestion: '미래 정보가 아닌 모치 제어 기술이 별개로 더 낫다는 실전 효과가 Base84 밖에 관찰되는가? TV857은 기제 설명만 제공한다.',
  },
  {
    characterId: 'jinbe', evidenceId: 'evidence-jinbe-whos-who-1018',
    evaluatedStats: ['defense'],
    decision: 'retain-and-require-distinct-effect',
    reason: 'Defense Raw4는 후즈후의 손가락 손상과 빅맘의 공격을 잠시 차단한 서로 다른 상황에 걸쳐 있다. 징베 Attack Raw는 이미 v0.1.62에서 해소됐다.',
    remainingQuestion: '무장색 방어 성과는 확실하지만 그 한계효과가 이미 Defense Base78에 포함되지 않았음을 입증할 비교 컷과 앵커가 있는가?',
  },
]
