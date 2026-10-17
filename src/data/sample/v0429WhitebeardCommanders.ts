/**
 * Whitebeard commanders — v0.4.29 editorial reassessment.
 * Observation/context/inference and opposing error risks are written separately.
 * No title-based bonus, no fixed tier ladder, no unsupported "missing = weak" deduction.
 * Cited IDs are existing v0.4.28 Evidence; official supplementary profiles may
 * support the stated interpretation but are not new fictional canonical feats.
 */
import type { Evaluation } from '../../domain/evaluation/types'
import type { Evidence } from '../../domain/evidence/types'
import { COMBAT_STATS, type CombatStat, type EvidenceReadiness } from '../../domain/evaluation/types'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { applyReviewedCalibration, type AxisCalibrationReview, type CharacterCalibrationReview } from '../../domain/evaluation/bidirectionalCalibration'

type AxisDraft = {
  next:number; observed:string; context:string; inference:string;
  over:string; under:string; reason:string; ids:string[]; readiness:EvidenceReadiness; normalHaki?:number
}
type CommanderInput = {id:string; sourceVersion:string; prior:number[]; axes:AxisDraft[]}
const a=(next:number,observed:string,context:string,inference:string,over:string,under:string,
  reason:string,ids:string[],readiness:EvidenceReadiness,normalHaki?:number):AxisDraft=>
  ({next,observed,context,inference,over,under,reason,ids,readiness,normalHaki})

const commanders:CommanderInput[]=[
  {id:'marco',sourceVersion:'evaluation-0.1.47-evidence-calibrated-A',
   prior:[77,87,87,82,84,80,87],axes:[
    a(79,'키자루를 공중 요격하고 킹·퀸과 근접 교전, 아카이누에게 비스타와 무장색 합동 공격.',
      '대부분 전쟁 중 구조·지연·아군 지원 목적. 아카이누에게 반복 결정타나 독립 승리는 확인되지 않음.',
      '상급 적을 상대로 실제 타격을 성립시키는 출력과 접근 타이밍은 기존 Final77보다 높게 추정 가능.',
      '불사조 재생·비행을 별도 파괴력으로 두 번 계산하지 않음.',
      '강적과의 실제 공격 성립을 단순 결정타 부재라는 이유로 저평가하지 않음.',
      '무장색 통상 활용을 Base79에 합산, 예외 Raw0. 공격 79는 일최간 압도 화력 주장 아님.',
      ['evidence-marco-kizaru-554','evidence-marco-armament-akainu-574'],'E2',2),
    a(88,'키자루 광탄, 아카이누 루피 공격, 킹의 조로 저지용 화염, 카이도 보로 브레스 차단.',
      '각 방어는 개별 단발 공격과 다수 전장 조건. 피격 후 재생과 사전 차단은 구별해야 함.',
      '서로 다른 최고급 상대 화력을 여러 차례 직접 보호·차단한 대응력은 기존 87보다 소폭 높은 88 가능.',
      '재생 가능한 몸이라는 이유만으로 모든 공격을 무효화한다고 추정하지 않음.',
      '반복 검증된 실제 보호·차단의 질을 단순한 회복 능력으로 과소 분류하지 않음.',
      '강한 반복 방어 표본을 반영한 88. 전투 지속의 별도 체력 축과 겹치지 않음.',
      ['evidence-marco-kizaru-554','evidence-marco-defense-akainu-575','evidence-marco-defense-kaido-1043'],'E1'),
    a(86,'킹·퀸 다수전에서 날개를 잃었다가 재생하고 전투를 계속했으나 극심한 피로를 보임.',
      '다대일 임무, 지속적 아군 보호, 이후 조로·상디 등장으로 전체 전투가 종료됨.',
      '재생 후 추가 전투를 수행할 정도로 높은 지속능력은 인정하면서 무한 체력은 배제.',
      '재생한 손상을 신체 내구·피로 저항·완전 방어 세 항목에 중복 더하지 않음.',
      '동급에 가까운 강적 두 명을 묶어 둔 실제 소모 능력을 피로 묘사만으로 낮게 보지 않음.',
      '87→86 소폭 조정은 명시적 피로 한계 반영, 장기전 역량은 여전히 높음.',
      ['evidence-marco-regeneration-1006','evidence-marco-defense-king-1022'],'E2'),
    a(83,'키자루·아오키지 상대 공중 개입과 위기 순간 빠른 도약.',
      '빛 그 자체의 속도와 직접 동속 주장은 불가하며 혼전 개입이 많음.',
      '고속 적의 공방에 제때 진입하는 비행·반응·접근의 복합 속도 83을 합리적 추론.',
      '키자루에게 발길질했다고 광속 신체 운동으로 계산하지 않음.',
      '고속 근접전에 실제 동참한 능력을 단순 비행 이동으로 과소평가하지 않음.',
      '82→83으로 소폭 조정, 특정 한 점의 최대 이동속도 확정은 아님.',
      ['evidence-marco-kizaru-554','evidence-marco-aokiji-566'],'E2'),
    a(85,'부분 불사조 변형, 대장 상대 이동 공방, 얼음 오니의 증상 억제에 불꽃 제어.',
      '타인에 대한 감염 억제는 조건부 상황에서 실증, 완전한 일반 의료 기술이 아님.',
      '변형·치료보조·방어 운용의 정교함이 반복 나타나며 단순 능력 보유보다 높은 전문 통제.',
      '기술 종류가 많다는 사실을 그대로 정밀 숙련도 수치로 전환하지 않음.',
      '특수 화염 운용의 실제 제어 수준을 보유 능력만으로 폄하하지 않음.',
      '84→85. 직접 조작 숙련을 인정하되 최고권 정밀 기술 90대 자동 진입 아님.',
      ['evidence-marco-ice-oni-998','evidence-marco-defense-king-1022'],'E2'),
    a(82,'여러 강자를 순차 요격하고 위기에 처한 아군을 보호하며 임무·위치·상성을 전환.',
      '흰수염의 악화 순간 주의 분산·해루석 봉인, 복수전 패배는 별개 전황 조건.',
      '강한 상대와 다수 전장의 보호 우선순위를 반복 판단할 수 있는 실전 대응력은 80보다 높을 개연성.',
      '부대 지휘 경력·패배 결과 자체에 가산하거나 자동 감점하지 않음.',
      '실제 전장 선택과 신속한 적절한 개입을 고급 전술 증거에서 배제하지 않음.',
      '80→82. 카타쿠리의 명시적 미래 예측 IQ와 동일한 기계적 성질로 보지 않음.',
      ['evidence-marco-aokiji-566','evidence-marco-big-mom-995','evidence-marco-seastone-568-569'],'E2'),
    a(88,'공중 기동·근접 요격·고화력 차단·감염 억제·아군 구조를 다양한 국면에 적용.',
      '단순 불꽃 종류가 아니라 역할 자체가 달라지는 여러 장면에서 사용됨.',
      '공격/방어/지원/수송/전장 대응을 유연하게 수행하므로 범용성 88은 독립적으로 정당화 가능.',
      '재생·방어 하나의 결과를 공격·회복·전술에 모두 무한 가산하지 않음.',
      '의료 보조와 고화력 방어를 독립된 실전 임무로 보인 폭을 누락하지 않음.',
      '87→88. 높은 범용성은 실증된 역할 전환에 근거하며 무한 치료·만능기는 아님.',
      ['evidence-marco-ice-oni-998','evidence-marco-defense-akainu-575','evidence-marco-defense-kaido-1043'],'E2'),
   ]},
  {id:'jozu',sourceVersion:'evaluation-0.1.26-draft',
   prior:[78,84,78,79,74,75,74],axes:[
    a(80,'다이아몬드 돌진으로 크로커다일을 타격하고 아오키지에게 직접 출혈을 유발.',
      '크로커다일 기습, 아오키지 전장 혼전 개입이며 장기 1대1 압승은 입증되지 않음.',
      '대장급의 방어를 실제 관통한 돌진·근력을 기존78보다 높게 재평가할 합리적 여지.',
      '다이아몬드 경도와 미호크 참격 방어를 자동으로 공격 최대치로 바꾸지 않음.',
      '대장 직접 유효타를 낮은 피해 반복수만 보고 과소평가하지 않음.',
      '78→80. 통상 무장색은 Base로 통합하고 전투효과 없는 예외 Raw 제거.',
      ['evidence-jozu-crocodile-560','evidence-jozu-aokiji-567'],'E2',4),
    a(86,'미호크가 흰수염에게 날린 대형 참격을 다이아몬드화로 가로막고 밀어냄.',
      '해당 참격이 미호크 최대 출력인지 불확실. 주의 분산된 틈에 아오키지에게 빙결당함.',
      '정면 고위력 참격 차단은 물리 방어 특화의 상단 능력을 뜻하므로 84→86 상향 고려.',
      '빙결 등 비물리 유형·기습에까지 불가침 영역을 주장하지 않음.',
      '참격을 실제로 막은 고급 방어 실적을 특정 상성이라는 이유로 가볍게 평가하지 않음.',
      '정면 물리 저항 중심 86, 아오키지의 제압 조건은 제한 사실로 보존.',
      ['evidence-jozu-mihawk-553','evidence-jozu-frozen-568'],'E2'),
    a(80,'정상결전에서 연속 참전해 강한 상대에게 개입·교전.',
      '아오키지 빙결로 마무리되었으며 잭처럼 정확히 기록된 다일 장기전은 없음.',
      '상급자와 계속 맞서고 전장을 유지한 고참 전투원에게 보통 이상의 지구력을 추정 가능.',
      '몸이 단단하다는 사실을 피로 내성·지구력 수치로 무한 복사하지 않음.',
      '장기전 시간이 묘사되지 않았다는 이유만으로 상대적으로 낮은 체력을 가정하지 않음.',
      '78→80 잠정, E3 유지. 높은 점수는 경력에 대한 확정 증명이 아닌 합리적 중간 추정.',
      ['evidence-jozu-aokiji-567','evidence-jozu-frozen-568'],'E3'),
    a(80,'거구임에도 크로커다일에게 빠르게 접근, 아오키지 교전에 즉시 진입.',
      '혼전·기습 시 접근이라 단독 장거리 경주나 최고속 비교 자료는 제한적.',
      '높은 실전 돌격 순간 속도와 접근 타이밍을 79→80으로 미세 상향.',
      '몸무게 대비 빠른 연출을 광속·순수 속도 상단으로 환산하지 않음.',
      '대장과 교전하려면 필요한 반응·간격 조절을 느리다고 가정하지 않음.',
      '80은 실전 기동 추정치. 비행·순간이동 보유는 아님.',
      ['evidence-jozu-crocodile-560','evidence-jozu-aokiji-567'],'E2'),
    a(77,'다이아몬드 신체의 방어 전환과 충돌, 상위 적 상대 돌격 기술 반복.',
      '미호크 검술급 정밀 무기술을 한 장면은 없음. 특수 몸 자체는 자동 숙련 근거가 아님.',
      '대장급 상대에 정확한 타이밍으로 개입하는 능력 운용의 숙련은 74 이상일 개연성.',
      '능력 자체의 경도와 선천적 완력을 기술 정밀도로 환산하지 않음.',
      '오랜 전선 경험을 가진 강자의 무기 없는 운영을 기술 부재로 오해하지 않음.',
      '74→77 잠정, E3. 고도 검술·복합 무장 사용 수준이라고 주장하지 않음.',
      ['evidence-jozu-mihawk-553','evidence-jozu-crocodile-560'],'E3'),
    a(78,'흰수염을 향한 미호크 참격을 즉시 가로막고, 아오키지의 공격 흐름을 끊음.',
      '동료·선장 상태에 주의가 분산될 때 아오키지에게 빙결 제압됨.',
      '상황을 읽고 적 위협을 차단하며 공격 기회를 포착하는 전투 판단은 75보다 높게 평가 가능.',
      '선장 걱정에 한 차례 틈을 보인 사실을 전투 IQ 결함 전체로 환산하지 않음.',
      '전장 개입 목적과 고수 공방의 정교한 타이밍을 단순 돌격밖에 못하는 듯 배제하지 않음.',
      '75→78. 일반적인 지략가·전술 설계자의 90점대 판단력으로 보정하지 않음.',
      ['evidence-jozu-aokiji-567','evidence-jozu-frozen-568'],'E3'),
    a(76,'다이아몬드 몸을 이용해 강한 참격 차단, 돌진 명중 및 전장 보호 역할 수행.',
      '원거리 사격·다종 상태 이상·광역 지원 등 다양한 기술은 미확인.',
      '특화된 전투 방식 하나로도 공격·방어·위치 차단의 전장 역할 전환을 실제 수행 가능.',
      '돌격과 방어가 하나의 신체 특성을 쓴다는 사실만으로 각기 다른 무기체계를 보유한다고 보지 않음.',
      '다이아몬드화 하나라는 이유로 실전 전장 대응 역할을 단일 기능으로 깎지 않음.',
      '74→76. 다른 전투 체계가 없는 한 최고급 범용성으로 확장하지 않음.',
      ['evidence-jozu-mihawk-553','evidence-jozu-crocodile-560','evidence-jozu-aokiji-567'],'E3'),
   ]},
  {id:'vista',sourceVersion:'evaluation-0.1.68-vista-battle-context-only',
   prior:[82,79,77,80,87,77,74],axes:[
    a(83,'이도류로 미호크와 실제 검격 공방을 성립시키고 마르코와 아카이누에게 검격 시도.',
      '미호크는 완전 결착이 아닌 짧은 요격 교전, 아카이누에 지속 결정타 미확인.',
      '최강의 검사가 대응해야 하는 고급 검격의 위협은 82보다 조금 높은 83 가능.',
      '미호크와 검술 공방을 했다고 그의 최고 공격 수치 그대로 복제하지 않음.',
      '공식 대검호의 공격적 검술 질을 단지 큰 출혈 장면 부족으로 낮게 잡지 않음.',
      '82→83. 통상 무장색 공격은 Base에 포함, 독립 예외 Raw0.',
      ['evidence-vista-mihawk-561-562','evidence-vista-armament-akainu-574'],'E2',4),
    a(81,'미호크와 이도류 검술 공방을 이어가면서 유의미한 부상을 입지 않음.',
      '전시 제한 교전이고 미호크가 최대화력으로 끝까지 압박한 완전 결투는 아님.',
      '최상위 검객의 공격에 대응하는 실제 검술 방어에는 정밀도와 반응이 전제됨.',
      '짧은 무상처 교전을 모든 형태의 장기 방어에 일반화하지 않음.',
      '미호크와 맞춘 공방의 본질적 방어 역량을 단순 비피격이란 이유로 저평가하지 않음.',
      '79→81. 초고내구 악마의 열매 방어는 주장하지 않음.',
      ['evidence-vista-mihawk-561-562'],'E2'),
    a(80,'정상결전 전체에서 여러 차례 임무를 수행하고 미호크·아카이누와 공방.',
      '완전 연속 고강도 개인 장기 결투 지속시간은 확인되지 않음.',
      '실전 다수 강자와 반복 참전할 몸 상태·지구력은 77보다 높은 80도 합리적.',
      '조직 5번대 대장 직함만으로 극단적인 장기전 체력을 자동 부여하지 않음.',
      '대표 장기전 장면이 없다는 사실을 약한 체력의 직접 증명으로 오해하지 않음.',
      '77→80 E3 잠정. 다른 인물의 10일간 결투와 동급 근거는 아님.',
      ['evidence-vista-mihawk-561-562','evidence-vista-armament-akainu-574'],'E3'),
    a(82,'미호크가 루피를 추격할 때 요격해 가까운 거리에서 이도류 검격 교환.',
      '짧은 교전과 전선 지형; 반복 장거리 추격 레이스는 미확인.',
      '정상급 검사 검격을 인지해 받아치는 반응·거리 조절이 상당히 빠를 개연성.',
      '미호크 교전이라는 이유만으로 그의 모든 이동 속도와 동급으로 두지 않음.',
      '직접 공방을 가능케 한 반사 능력을 스피드 장면 부족으로 폄하하지 않음.',
      '80→82, E3 잠정. 움직임 속도와 검격 반응을 완전히 동일시하지 않음.',
      ['evidence-vista-mihawk-561-562'],'E3'),
    a(92,'공식 ONE PIECE.com은 비스타를 이도류 대검호이며 세계 최강 검사 미호크와 호각의 검술 교전 능력을 가진 인물로 명시.',
      'Ch.561–562의 짧은 검술 교환이며 전체 결투 승률·종합 무력 미호크 동급을 입증하지 않음.',
      '서로의 검격을 빠르게 정확히 제어·응수하는 상당한 기술 숙련은 최고급 검사에 근접 가능.',
      '공식 단기 공방의 互角 표현을 미호크 최고 99와 같은 실력 전체로 복제하지 않음.',
      '공식 직접 서술인 대검호·미호크와 검술 호각을 현행 숙련87에 충분히 반영하지 못했을 가능성.',
      '기술 숙련 87→92. 강한 공식 전문영역 평가로 상향하되 사황급 Overall 단정은 불가.',
      ['evidence-vista-mihawk-561-562','evidence-vista-official-mihawk-profile','evidence-vista-armament-akainu-574'],'E1',2),
    a(85,'미호크의 루피 추격을 적시에 차단하고 검술 공방의 공수 전환에 대응.',
      '마르코의 임무 지시에 따른 요격이며 독자 대전략 수립·상대 전력 전부 분석은 미확인.',
      '최상위 검사 상대 검술 대치에는 공격 선택, 거리 판단과 상대 의도 읽기가 높은 수준으로 요구될 개연성.',
      '공식 검술 호각을 전투 IQ90~95라는 직접 증거로 자동 변환하지 않음.',
      '고급 검사 공방에 필요한 순간적 판단을 병력 운용 경력 부재만으로 77로 제한하지 않음.',
      '77→85는 기능적 강한 추론. E3로 확실성 낮음을 명시. IQ90은 후속 확인까지 상한 가설.',
      ['evidence-vista-mihawk-561-562'],'E3'),
    a(77,'검 하나의 체계로 공격·방어·고수 요격 및 루피 이탈 지원을 수행.',
      '다른 무기나 원거리 특수능력·치료 등 폭넓은 체계 자체는 확인되지 않음.',
      '동일 고급 검술에서도 역할에 맞춰 방어·추격 차단·공격을 실질적으로 바꾸는 능력.',
      '검술이라는 한 체계에서 수행한 각 동작을 서로 다른 독립 기술 보유로 계산하지 않음.',
      '단일 무기라고 실전에서 수행한 전술 역할이 하나뿐이라 추정하지 않음.',
      '74→77. 높은 숙련을 범용성으로 그대로 90점대 확대하지 않는 보수적 구분.',
      ['evidence-vista-mihawk-561-562','evidence-vista-armament-akainu-574'],'E2'),
   ]},
]

export const v0429Reviews:CharacterCalibrationReview[]=commanders.map(source=>({
  characterId:source.id,evaluationId:'evaluation-'+source.id,
  sourceDataVersion:source.sourceVersion,newDataVersion:'evaluation-v0.4.29-bidirectional-calibration',
  axes:source.axes.map((draft,i):AxisCalibrationReview=>({
    stat:COMBAT_STATS[i] as CombatStat,expectedFinal:source.prior[i],
    proposedFinal:draft.next,observed:draft.observed,context:draft.context,inference:draft.inference,
    inflationRisk:draft.over,deflationRisk:draft.under,judgement:draft.reason,
    evidenceIds:draft.ids,readiness:draft.readiness,
    ...(draft.normalHaki!==undefined ? {normalHakiRawToBase:{
      expectedPriorRaw:draft.normalHaki,
      reason:'원작에서 통상 무장색을 사용한 사실은 확인되지만 Base를 넘어서는 독립적인 예외 Haki 효과나 고급기술의 정량적 마진이 확인되지 않았다. 패기 보유·사용 사실은 Evidence 및 캐릭터 프로필에 남긴다.',
    }}:{}),
  })),
}))
const reviewByCharacter=new Map(v0429Reviews.map(x=>[x.characterId,x]))
export function applyV0429CommanderCalibration(evaluation:Evaluation):Evaluation{
  const review=reviewByCharacter.get(evaluation.characterId)
  if(!review)return evaluation
  return applyReviewedCalibration(evaluation,review)
}
export const v0429CommanderChanges=v0429Reviews.flatMap(review=>review.axes
  .filter(axis=>axis.expectedFinal!==axis.proposedFinal)
  .map(axis=>({
    characterId:review.characterId,stat:axis.stat,before:axis.expectedFinal,after:axis.proposedFinal,
    reason:axis.judgement+' 과대평가 위험: '+axis.inflationRisk+' 과소평가 위험: '+axis.deflationRisk,
  }))
)

/** Keep historical Evidence immutable and rewrite ONLY editorial numeric Raw interpretations. */
const hakiEvidenceReinterpretation:Record<string,string>={
  'evidence-marco-armament-akainu-574':
    'v0.4.29: 아카이누 대상 통상 무장색 공격의 사용은 확인된다. 예외적 별도 공격 마진은 직접 입증되지 않아 Attack79 Base로 통합, Haki Raw0. 이 공격만으로 아카이누에게 지속 결정타를 주었다고 단정하지 않는다.',
  'evidence-jozu-crocodile-560':
    'v0.4.29: 크로커다일에게 실제 공격이 성립했다는 사실은 Attack80 Base로 평가. 무장색을 별도 예외 Raw로 중복 적용하지 않는다. 다른 특수 Haki 사용 부재를 뜻하지 않는다.',
  'evidence-jozu-aokiji-567':
    'v0.4.29: 아오키지 유효타는 실제 Attack80 Base의 질적 근거. 다대다 전쟁 개입·기습 조건을 보존하며 통상 무장색의 예외 Raw 가산 근거로 삼지 않는다.',
  'evidence-vista-armament-akainu-574':
    'v0.4.29: 아카이누를 향한 통상 무장색 검격은 Base Attack83 및 Technique92의 실제 운용 근거. 별도 예외 Haki Raw가 될 정량적 독립 마진은 입증되지 않는다. 합동 공격·결정타 미확인 조건 유지.',
}
export function applyV0429CommanderEvidenceAudit(evidence:Evidence):Evidence{
  const newImpact=hakiEvidenceReinterpretation[evidence.id]
  return newImpact ? {...evidence,evaluationImpact:newImpact} : evidence
}
