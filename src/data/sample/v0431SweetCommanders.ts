/**
 * v0.4.31 — Katakuri, Cracker, Smoothie: symmetric 7-axis evaluation review.
 * Source facts, combat constraints, functional inferences and both bias risks are
 * explicit per axis. No title bonuses, no tier-fit score targets, no formula change.
 */
import type { Evaluation } from '../../domain/evaluation/types'
import type { Evidence } from '../../domain/evidence/types'
import { COMBAT_STATS, type EvidenceReadiness } from '../../domain/evaluation/types'
import { applyReviewedCalibration, type CharacterCalibrationReview, type AxisCalibrationReview } from '../../domain/evaluation/bidirectionalCalibration'

type Axis={
  final:number;observed:string;context:string;inference:string;over:string;under:string;judgement:string;
  evidenceIds:string[];readiness:EvidenceReadiness;ordinaryHakiRaw?:number
}
const a=(final:number,observed:string,context:string,inference:string,over:string,under:string,
 judgement:string,evidenceIds:string[],readiness:EvidenceReadiness,ordinaryHakiRaw?:number):Axis=>
 ({final,observed,context,inference,over,under,judgement,evidenceIds,readiness,ordinaryHakiRaw})

type Source={id:string;version:string;before:number[];axes:Axis[]}
const reviewed:Source[]=[
 {id:'katakuri',version:'evaluation-0.1.62-haki-independent-review',
  before:[83,84,84,84,87,82,84],axes:[
  a(83,'루피와의 장기전에서 강력한 모치 타격·삼지창과 무장색 공방을 반복했다.',
    '미래예지로 맞히기 쉬운 위치를 선점한 영향과 순수 화력을 분리해야 한다.',
    '기어4 루피와 동등한 수준의 공세 교환을 수행하는 공격 역량은 높다.',
    '선행 타격 성공을 무장색·IQ·속도에 추가 공격 보너스로 중복 합산하지 않는다.',
    '루피에게 패했다고 카타쿠리의 높은 실전 화력까지 낮게 잡아선 안 된다.',
    '기존 Attack83 유지. 명중 기회를 만든 미래예지는 독립 파괴력 추가가 아니다.',
    ['evidence-katakuri-awakening-882','evidence-katakuri-armament-883'],'E2'),
  a(84,'미래예지와 모치 신체 변형으로 루피의 공격을 반복 회피했다.',
    '침착함을 잃었을 때 예측이 흔들렸고 후반 루피의 스네이크맨에 피격됐다.',
    '장래 동작을 읽고 타점을 비워 직접 회피하는 높은 방어는 이미 Final84와 Observation Raw6에 반영된다.',
    '미래예지 회피를 Defense Raw와 Speed·Combat IQ에 자동으로 각각 독립 보너스로 더하지 않는다.',
    '모치 변형을 단순 열매 보유로 보아 직접 높은 회피 성공을 과소 평가하지 않는다.',
    'Defense84 유지(Base81+고급 견문색 Raw6×0.5=3). 예측 실패 조건을 보존한 상위 방어다.',
    ['evidence-katakuri-future-sight-881-884','evidence-katakuri-composure-future-sight-857'],'E2'),
  a(85,'루피와 오래 맞붙고 플랑페 개입 후 자기 복부에 상처를 낸 뒤에도 격전을 이어갔다.',
    '상호 소모가 매우 컸고 루피의 일시 이탈, 개입, 카타쿠리의 자발적 부상 조건이 있다.',
    '실제 중상과 피로를 동반한 지속적인 기어4 수준 근접전 수행은 기존84의 저평가 가능성이 있다.',
    '장기 전투 시간 전체를 무휴식 무피해 독립 난타로 단순화하지 않는다.',
    '자발적 상처나 최종 패배만으로 견뎌낸 고강도 전투 지속을 낮추지 않는다.',
    'Stamina84→85. 장기 고강도 피격·공방에 대한 소폭 상향으로, 무한 지구력 주장은 아니다.',
    ['evidence-katakuri-endurance-894'],'E2'),
  a(84,'스네이크맨의 궤도가 변하는 고속 연속 공격에 다수 대응했으나 일부 피격됐다.',
    '미래예지가 알려주는 선행 정보를 순수 운동·반응 속도와 구분한다.',
    '최상위권 빠른 검격·타격에 몸을 맞출 반응과 이동 속도는 기존84에 반영돼 있다.',
    '미래예지 예측 성공을 광속 몸놀림이나 동시 Speed Haki 가점으로 옮기지 않는다.',
    '일부 피격과 최종 패배를 근거로 실제 스네이크맨 대응 속도까지 무시하지 않는다.',
    'Speed84 유지. 공격 정보와 운동 수행을 구분한 현행 점수가 여전히 타당하다.',
    ['evidence-katakuri-future-sight-881-884','evidence-katakuri-snakeman-895'],'E2'),
  a(89,'모치 부분 변형·삼지창·각성 지형 조작과 상대 기술 대응을 고급 견문색에 결합했다.',
    '침착함이 무너지면 미래예지 응용도 약화되고 모든 검격이 완벽했던 것은 아니다.',
    '실전에서 복수 조작·각성 지형 통제·몸 부분 변형을 고정밀로 연결하는 기술은 기존87보다 높게 추정 가능하다.',
    'Defense 미래예지 회피 하나를 기술 조절의 별개 무한 보너스로 합산하지 않고 무기·각성 제어의 독립 기록을 확인한다.',
    '실제 모치 능력 정밀성·검격과 각성의 복합 운용을 미래예지 단일 능력으로 축소하지 않는다.',
    'Technique87→89. 기존 고급 견문색 Raw6은 유지하되 Base86은 모치 조작의 독립 숙련에 한정한다.',
    ['evidence-katakuri-future-sight-881-884','evidence-katakuri-composure-future-sight-857','evidence-katakuri-awakening-882','evidence-katakuri-armament-883','evidence-katakuri-gear4-counter-883-885'],'E2'),
  a(85,'루피의 기어4 준비를 방해하고 변형 공격의 대응 타이밍을 읽으며 공세 선택을 바꿨다.',
    '미래예지는 정보를 제공하지만 실제 행동 선택과 집중 유지에 실패하는 장면도 있다.',
    '상대의 강화 시점 저지와 공방 선택의 연속적 의사결정 자체가 전투 IQ82보다 높은 평가를 지지한다.',
    '견문색이 미래 정보를 제공한다는 사실을 전투 판단 90점대 자동 가점으로 바꾸지 않는다.',
    '정보를 이용한 실제 행동 선택 성과까지 단순 선행 예지 현상으로만 돌려 판단력을 저평가하지 않는다.',
    'IQ82→85. 별도의 Haki Raw는 부여하지 않고 실제 변신 저지·전술 대응에만 근거.',
    ['evidence-katakuri-future-sight-881-884','evidence-katakuri-composure-future-sight-857','evidence-katakuri-gear4-counter-883-885'],'E2'),
  a(85,'각성으로 지형을 모치로 바꾸고 근접·원거리·구속·회피를 여러 전투 상황에 적용했다.',
    '다양한 공격이 모두 하나의 모치 능력에서 파생되고 패왕색 방출은 별도 범용 화력 증거가 아니다.',
    '원거리 공간 지배와 정밀 부분 변형·검술의 실전 역할 폭은 기존84보다 소폭 높은 추정 가능성이 있다.',
    '모치 기술의 개수나 고급 패기 소유 자체를 범용성 점수로 계속 더하지 않는다.',
    '여러 사거리·방어·지형 통제를 하나의 열매라고 실제 역할 차이까지 무시하지 않는다.',
    'Versatility84→85. 기술의 종류가 아니라 전투 목적·거리·역할 전환의 질을 반영한다.',
    ['evidence-katakuri-awakening-882','evidence-katakuri-conquerors-893','evidence-katakuri-gear4-counter-883-885'],'E2'),
 ]},
 {id:'cracker',version:'evaluation-0.1.79-cracker-mastery-official-evidence-expanded',
  before:[77,81,80,75,80,75,77],axes:[
  a(78,'본체가 무장색을 두른 검으로 기어4 루피의 팔에 직접 검격 상처를 냈다.',
    '루피는 이미 병사 방어에 고전했고 나미의 물 지원 및 기어4 이후 전세 변화가 있었다.',
    '고강도 기어4 방어를 직접 베어낸 본체 검술의 위력을 Attack77보다 소폭 높게 평가한다.',
    '비스킷 병사의 수·본체 갑옷의 높은 방어를 독립 근접 공격 위력으로 복사하지 않는다.',
    '병사 소모전만 강조하면 Gear4 루피에게 직접 명중한 검격을 과소평가한다.',
    'Attack77→78. 통상 무장색은 공격 Base에 통합하고 별도 예외 Haki Raw4는 제거한다.',
    ['evidence-cracker-biscuit-837-838','evidence-cracker-urouge-837'],'E2',4),
  a(82,'높은 강도의 비스킷 갑옷과 방패가 루피의 공격을 막고 다수 병사가 본체를 둘러쌌다.',
    '기어4의 파괴력과 나미 비에 젖은 비스킷의 연화로 취약점이 노출됐다.',
    '공격을 외부 생성체에 흡수시켜 본체를 지키는 시스템은 실제 상대 대응에서 고성능의 방어 방식이다.',
    '비스킷 갑옷을 본체 자체의 무적 내구나 물 환경 불변 방어로 계산하지 않는다.',
    '본체 맷집 장면이 적다고 비스킷이 실제로 막아낸 수많은 공격을 방어에서 삭제하지 않는다.',
    'Defense81→82. 높은 시스템 방어와 조건부 수분 취약성을 동시에 반영한다.',
    ['evidence-cracker-biscuit-837-838','evidence-cracker-long-battle-842'],'E2'),
  a(82,'약 11시간 동안 비스킷 병사를 반복 생성·조종하고 상대 공격에 다시 배치했다.',
    '본체가 11시간 내내 직접 피격된 것은 아니고 나미 비가 병사 내구를 크게 약화시켰다.',
    '반복 기술 생성과 다수 원격 병사 운영을 실제 장시간 지속한 능력 소모저항은 기존80보다 높아 보인다.',
    '본체의 신체 내구와 11시간의 능력 지속을 같은 고강도 피격 지속으로 취급하지 않는다.',
    '실제 11시간 계속된 전투 자원 운용을 몸이 피격되지 않았다는 이유로 지구력에서 제외하지 않는다.',
    'Stamina80→82. 본체 맷집이 아니라 능력 지속력의 증거임을 명확히 한다.',
    ['evidence-cracker-long-battle-842'],'E2'),
  a(75,'본체가 기어4 루피의 공격 범위에 진입하여 검격을 적중시켰다.',
    '피해는 기습에 가까운 상황에서 발생했고 독립 최고속 기동의 반복 표본은 제한적이다.',
    '빠른 근접 기회를 포착할 기본 반응은 확인되지만 전면 속도 상승을 확정하기 어렵다.',
    '비스킷 병사 다수의 기동을 본체 개인 스피드로 옮기지 않는다.',
    '본체 직접 공방이 적다는 사실을 순수 속도 열세로 단정하지 않는다.',
    'Speed75(E3) 유지. 기어4 한 차례 명중만으로 최고속 상향 불충분.',
    ['evidence-cracker-biscuit-837-838'],'E3'),
  a(83,'비스킷을 갑옷·다수 병사·검·방패로 형성하고 수많은 개체를 11시간가량 반복 운용했다.',
    '습기라는 약점에 고전했고 나미가 병사를 무력화하는 방식을 실전에서 바꾸지 못했다.',
    '원격 병력 다수 동시 제어·본체 은닉·대검격 병용은 단순한 비스킷 강도 이상의 높은 정교함을 증명한다.',
    '병사가 많다는 숫자를 숙련도에 기계적으로 합산하지 않고 물 취약 대처의 한계를 보존한다.',
    '단일 열매라는 이유로 대규모 병력 조작과 장시간 정밀한 실전 제어를 낮게 평가해선 안 된다.',
    'Technique80→83. Cracker와 King은 기술 종류보다 실제 제어 정확도를 비교해야 한다.',
    ['evidence-cracker-biscuit-837-838','evidence-cracker-long-battle-842','evidence-v0179-cracker-truebody-gear4-tv799','evidence-v0179-cracker-rain-weakness-tv805'],'E2'),
  a(77,'본체를 갑옷 속에 숨기고 병사를 먼저 투입하여 적 공격을 소모시키는 전투를 수행했다.',
    '나미의 강우 상성이 노출된 뒤에도 병사 반복 생성에 크게 의존하며 전술 전환이 제한됐다.',
    '본체 은닉과 적 소모 유도를 장기간 유지한 전투 계획 선택은 IQ75 이상의 판단 역량을 시사한다.',
    '비스킷 병사의 생성 능력 자체를 지략으로 자동 고평가하거나 나미의 기민한 대응을 지우지 않는다.',
    '크래커가 본체를 숨기는 기만 작전을 실제 성공시킨 판단을 단순 소모전이라는 이유로 놓치지 않는다.',
    'IQ75→77. 상대의 상성 대처 이후 전환 실패도 함께 반영했다.',
    ['evidence-cracker-long-battle-842'],'E2'),
  a(80,'비스킷으로 위장 갑옷, 검·방패, 대량 병력 생성, 본체 원거리 안전 확보를 실행했다.',
    '동일 비스킷 능력을 기반으로 하며 물에 젖을 때 전반적 약점이 공유된다.',
    '본체 근접검술·방어진·다수 공격·원격 본체 은폐의 서로 다른 실제 역할 수행은 기존77보다 넓다.',
    '같은 비스킷 체계의 동작 하나마다 독립 능력 한 개씩 계산하거나 조작을 무한 지원기로 만들지 않는다.',
    '한 열매라는 이유로 전술적 역할이 한 가지뿐이라며 실전 폭을 과소평가하지 않는다.',
    'Versatility77→80. 물 상성의 공통 취약성을 보존한 정성적 재평가.',
    ['evidence-cracker-biscuit-837-838','evidence-cracker-long-battle-842'],'E2'),
 ]},
 {id:'smoothie',version:'evaluation-0.1.26-draft',
  before:[76,75,76,74,80,77,78],axes:[
  a(80,'대상의 수분을 짜내 자신과 검을 거대화한 뒤 써니호에 거대한 장거리 참격을 반복 발사했다.',
    '써니호는 나미 지시·징베 조타로 회피하여 최고 전투원에 대한 직접 피격 피해량은 미확인.',
    '수분 흡수와 크기 확장으로 만든 실제 큰 출력·원거리 공격 위협은 기존76보다 높게 추정할 근거다.',
    '거대 참격의 크기나 현상금·장성 직책을 곧 확정 1대1 관통력으로 전환하지 않는다.',
    '실제 반복된 거대 참격을 명중 장면이 없다는 이유로 단순 저화력으로 간주하지 않는다.',
    'Attack76→80. 큰 위력 잠재성은 인정하되 대인 유효타 불확실성 때문에 E2 잠정.',
    ['evidence-smoothie-pursuit-894'],'E2'),
  a(75,'레이주에게 독을 맞은 뒤 자신에게 작용한 독을 짜내어 제거한 능력 운용이 관찰됐다.',
    '독 제거는 이미 맞은 상태이상 대응이며 사전 회피·직접 공격 차단을 입증하지 않는다.',
    '상태 제거 능력이 생존에 기여할 수는 있지만 광범위한 공격 방어로 확장할 근거는 부족하다.',
    '특수 상태 해제를 모든 고위력 참격 차단·피해 무효화라고 계산하지 않는다.',
    '미확인 고수 공방 부재를 모든 방어 능력 부재라고 판단하지 않는다.',
    'Defense75(E3) 유지. 수치보다 폭넓은 불확실성이 핵심이며 중립 임시값이다.',
    ['evidence-smoothie-poison-869'],'E3'),
  a(78,'함대 추격 중 거대화와 장거리 참격을 반복 사용하며 전투 운용을 계속했다.',
    '정면 강자와의 연속 고강도 독립 전투 시간 및 본체 피격 누적 기록은 적다.',
    '반복적인 대형화·원거리 고출력 방출을 지속한 실제 능력 운용은 기존76보다 높게 추정 가능하다.',
    '추격전 전체 시간을 독립 1대1 고강도 공방 시간으로 계산하지 않는다.',
    '상위 강자 본체 장기전 표본 부족을 낮은 체력의 증거로 취급하지 않는다.',
    'Stamina76→78 E3. 짧은 반복 전투와 장기전 미확인 한계를 함께 기록.',
    ['evidence-smoothie-pursuit-894','evidence-smoothie-command-897'],'E3'),
  a(74,'해상 추격에서 거대한 검격을 반복 발사했지만 독립적인 신체 이동·상위 강자 회피전은 직접 묘사되지 않았다.',
    '써니호가 참격을 피한 것은 나미의 조타 지시와 징베의 기술에 관한 사건이다.',
    '개인 반응 속도를 결정적으로 높이거나 낮출 증거가 부족하여 중립 임시값을 유지한다.',
    '사거리·투사체 속도·함선 이동속도를 스무디의 개인 Speed로 역산하지 않는다.',
    '직접 묘사가 없다고 자동으로 느리다고 확정하거나 다른 상위 강자보다 느리다고 단정하지 않는다.',
    'Speed74(E3) 유지. 해당 근거는 개인 기동을 증명하는 primary가 아니라 불확실성의 맥락.',
    ['evidence-smoothie-pursuit-894'],'E3'),
  a(84,'접촉 수분 흡수, 자신의 독 제거, 신체·검 확대와 원거리 참격을 다른 상황에서 운용했다.',
    '고수와의 정면 검술 공방, 극단적 복잡 조작의 정밀 성공 횟수는 아직 적다.',
    '해당 능력을 지원적 상태 제거·자기 강화·검격 변환에 실제 연결하는 제어 기술은 기존80보다 높아 보인다.',
    '기술 형태의 개수만으로 미호크·비스타와 같은 검술 특화 숙련을 가정하지 않는다.',
    '직접 독 제거와 원거리 거대 검격의 정밀한 능력 응용을 단순 열매 보유로 축소하지 않는다.',
    'Technique80→84. 효과의 다양한 실제 활용을 인정하되 전문 검술의 최고 점수와 구별.',
    ['evidence-smoothie-poison-869','evidence-smoothie-pursuit-894'],'E2'),
  a(78,'함대를 지휘해 써니호의 후방을 막고 포위시키려는 전술적 선택을 실행했다.',
    '대인 1대1의 적 선택·패턴 분석·실패 후 수정 여부는 직접 표본이 적다.',
    '집단 추격에서 위험 방향을 차단하는 판단은 실제 전술 능력을 뒷받침한다.',
    '함선 배치·지휘를 고급 근접 상대 선읽기와 동급 지능 90점대로 부풀리지 않는다.',
    '독립 공방 묘사가 적다고 실전 전술 판단 자체가 낮다고 확정하지 않는다.',
    'IQ77→78 E3. 관찰된 전장 판단을 인정하되 정면전 IQ는 잠정.',
    ['evidence-smoothie-command-897'],'E3'),
  a(82,'즙즙 능력을 탈수 공격·자기 독 해제·크기 증폭·무기 강화·장거리 참격 등으로 각각 실전 사용했다.',
    '같은 수분 능력의 기능적 파생이며 함대 자체는 스무디 개인 전투 수단이 아니다.',
    '전투와 상태이상 대응·자기 강화·사거리 확장의 역할 전환은 기존78보다 높게 평가할 실증 폭이 있다.',
    '함대 숫자·지휘 성공과 각 물리 참격을 서로 완전히 독립된 능력으로 중복 가산하지 않는다.',
    '직접 실전 사용한 특수 상태 제거 기능과 강화·원거리 수단의 폭을 약하게 봐선 안 된다.',
    'Versatility78→82. 지원/상태 대처를 포함한 역할 변화의 품질을 반영.',
    ['evidence-smoothie-poison-869','evidence-smoothie-pursuit-894','evidence-smoothie-command-897'],'E2'),
 ]}
]

export const v0431SweetReviews: CharacterCalibrationReview[]=reviewed.map(source=>({
 characterId:source.id,evaluationId:'evaluation-'+source.id,
 sourceDataVersion:source.version,newDataVersion:'evaluation-v0.4.31-bidirectional-sweet-commanders',
 axes:source.axes.map((row,i):AxisCalibrationReview=>({
  stat:COMBAT_STATS[i],expectedFinal:source.before[i],proposedFinal:row.final,
  observed:row.observed,context:row.context,inference:row.inference,
  inflationRisk:row.over,deflationRisk:row.under,judgement:row.judgement,
  evidenceIds:row.evidenceIds,readiness:row.readiness,
  ...(row.ordinaryHakiRaw!==undefined?{normalHakiRawToBase:{
   expectedPriorRaw:row.ordinaryHakiRaw,
   reason:'기어4 루피에 대한 일반적인 무장색 검격 적용은 원래 Attack의 실제 Base 성과로 볼 사실이며 독립된 고급 예외 위력이나 별도 Haki 마진은 확인되지 않는다. 패기 사용 사실·기존 근거는 유지한다.',
  }}:{}),
 }))
}))
const map=new Map(v0431SweetReviews.map(r=>[r.characterId,r]))
/**
 * Historical Smoothie Speed contains no Evidence IDs. Attach EXISTING pursuit
 * Evidence as a context-only source to the current overlay before validation.
 * It documents the limit: giant slashes do not reveal the user's body Speed.
 */
export function prepareV0431ReviewSource(evaluation:Evaluation):Evaluation{
 if(evaluation.characterId!=='smoothie')return evaluation
 const items=evaluation.items.map(item=>item.stat==='speed'
  ?{...item,evidenceIds:[...new Set([...item.evidenceIds,'evidence-smoothie-pursuit-894'])]}
  :item)
 return {...evaluation,items}
}
export function applyV0431SweetCalibration(evaluation:Evaluation):Evaluation{
 const review=map.get(evaluation.characterId)
 if(!review)return evaluation
 return applyReviewedCalibration(prepareV0431ReviewSource(evaluation),review)
}
export const v0431SweetChanges=v0431SweetReviews.flatMap(review=>review.axes.filter(axis=>axis.expectedFinal!==axis.proposedFinal)
 .map(axis=>({characterId:review.characterId,stat:axis.stat,before:axis.expectedFinal,
  after:axis.proposedFinal,reason:axis.judgement+' 과대평가 위험: '+axis.inflationRisk+' 과소평가 위험: '+axis.deflationRisk})))

/** Historical fact and source are unchanged; only current numeric interpretation. */
export function applyV0431SweetEvidenceImpact(evidence:Evidence):Evidence{
 if(evidence.id!=='evidence-cracker-biscuit-837-838')return evidence
 return {...evidence,evaluationImpact:
  'v0.4.31: Gear4 루피를 벤 실제 근접 공격은 Attack Base78에 반영한다. 통상 무장색이 결합되었다는 사실은 그대로 보존하며 별도의 독립적 고급 Haki 예외 Raw는 0으로 분류한다. 비스킷 갑옷·검술·본체와 상성 차이도 유지한다.'}
}
