import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation } from '../../domain/evaluation/types'

/** E2/E3 provisional Wano-phase calibration, without numerical Haki bonuses. */
export const izoAssessmentBattles: Battle[] = [
  {
    id:'izo-protects-scabbards-raid',title:'오니가시마 — 이조의 아카자야 구출 엄호',
    chronologyOrder:315,combatStructure:'one-vs-multiple',combatPurpose:'부상당한 아카자야 동료와 우솝의 후퇴 엄호',
    combatIntent:'serious',environment:'오니가시마 성내',
    restrictions:'혼전 중 지원 임무; 적의 최상위 전력과 통제된 1대1이 아님',
    externalFactors:'기존 전투 누적·대규모 기프터즈 병력·아군 구출',
    result:'interrupted',participantIds:[],
  },
  {
    id:'izo-injured-cp0-maha',title:'오니가시마 — 부상한 이조와 CP0 마하의 교전',
    chronologyOrder:320,combatStructure:'multiple-vs-multiple',combatPurpose:'정부 요원의 진격 저지',
    combatIntent:'serious',environment:'오니가시마 성내',
    restrictions:'이조가 이미 큰 부상을 입은 상태에서 벌어진 충돌로 정상 컨디션 1대1과 차이',
    externalFactors:'다른 CP0 요원과 전황, 앞선 전투·부상 상태',
    result:'unknown',participantIds:[],
  },
]
export const izoAssessmentEvidence: Evidence[] = [
  {
    id:'evidence-izo-pistols-official',
    battleId:'izo-protects-scabbards-raid',subjectCharacterId:'izo',
    source:{type:'supplementary',reference:'https://one-piece.com/character/izo/index.html',
      description:'공식 캐릭터 소개. 흰수염 해적단 16번대 대장·정상결전 권총 사용'},
    evidenceStrength:'moderate',
    fact:'공식 인물 소개는 이조가 흰수염 해적단 16번대 대장이며 정상결전에서 권총을 사용했다고 명시한다.',
    supportedAbilities:['권총 사격'],
    statContributions:[
      {stat:'techniqueMastery',role:'primary',note:'전문적인 총기 전투 방식의 존재를 확인하며 타격 정밀도는 별도 평가한다.'},
      {stat:'attack',role:'secondary',note:'권총을 사용한 전투 참가 사실은 있으나 고위급 유효타 수준은 확인되지 않는다.'},
    ],
    interpretation:'검사가 아닌 총기를 주무기로 삼는 차별화된 교전 방식이 확인된다.',
    evaluationImpact:'기술 숙련·공격 스타일의 참고 근거. 대장 직위나 현상금은 직접 점수로 가산하지 않는다.',
    uncertainty:'원작 해당 장면 전체를 대조하지 않았으며 실제 피격 대상·무장색 여부는 미확인이다.',
  },
  {
    id:'evidence-izo-gifters-tv1063',
    battleId:'izo-protects-scabbards-raid',subjectCharacterId:'izo',
    source:{type:'supplementary',reference:'https://one-piece.com/anime/61847/index.html',
      description:'공식 애니메이션 제1063화 줄거리. 이조가 우솝에게 부상당한 가신을 맡기고 기프터즈를 상대'},
    evidenceStrength:'moderate',
    fact:'이조는 부상당한 킨에몬과 키쿠노죠를 우솝에게 맡기고 접근한 기프터즈 병력을 상대했다.',
    supportedAbilities:['총기 전투','아군 후퇴 엄호'],
    statContributions:[
      {stat:'attack',role:'primary',note:'다수 하위 전력 상대 저지 성과를 인정하되 대장급 단독 화력 증거로 확대하지 않는다.'},
      {stat:'combatIQ',role:'primary',note:'아군을 분리해 구출시키고 적을 맡는 판단은 전술적 행동의 직접 사례다.'},
      {stat:'versatility',role:'secondary',note:'정면 교전과 호위 임무의 전환은 확인되나 능력 종류가 확장되는 건 아니다.'},
    ],
    interpretation:'아군 보호 목적의 순간 전장 판단과 원거리 총격 지원을 보였다.',
    evaluationImpact:'Attack·CombatIQ의 보조적 정성 근거. 방어/속도 수치에 임의 가중치를 주지 않는다.',
    uncertainty:'혼전이며 적 개개인의 강함과 사용 탄환·패기 여부는 확인되지 않는다.',
  },
  {
    id:'evidence-izo-cp0-tv1065-1068',
    battleId:'izo-injured-cp0-maha',subjectCharacterId:'izo',
    source:{type:'supplementary',reference:'https://one-piece.com/anime/62441/index.html',
      description:'공식 애니메이션 제1068화 요약; 제1065화에서 이미 깊은 상처를 입은 상태임을 언급'},
    evidenceStrength:'moderate',
    fact:'공식 애니메이션 소개에서 이미 깊은 상처를 입고 CP0와 맞선 이조가 마하를 쓰러뜨렸으나 자신도 치명상을 입었다고 설명한다.',
    supportedAbilities:['부상 상태에서의 교전','총격'],
    statContributions:[
      {stat:'attack',role:'primary',note:'CP0 마하를 쓰러뜨린 실제 교전 성과를 반영하되 부상·상대 조건을 유지한다.'},
      {stat:'stamina',role:'primary',note:'큰 부상을 입고도 교전했으나 치명상에 도달해 장기 지속력을 상한 없이 인정할 수 없다.'},
      {stat:'defense',role:'context',note:'상대에 치명상을 주면서 본인도 치명상을 입은 결과는 높은 방어력을 단정하지 않는다.'},
      {stat:'techniqueMastery',role:'secondary',note:'부상 상태에서 상대를 저지한 기술 운용의 보조 근거다.'},
    ],
    interpretation:'불리한 컨디션에도 상당한 교전 성과를 거뒀으나 자기 피해 또한 매우 컸다.',
    evaluationImpact:'부상 조건을 동반한 Attack/Stamina의 근거로만 사용한다. CP0 전체에 대한 1대1 우위를 일반화하지 않는다.',
    uncertainty:'원작 교전 과정·이전 누적 피해의 상세 계량치 및 양측 참가자 분리는 추가 확인 필요하다.',
  },
]
const raw:[Evaluation['items'][number]['stat'],number,string,string[],Evaluation['items'][number]['readiness']][] = [
  ['attack',76,'기프터즈 저지와 CP0 마하를 쓰러뜨린 교전 성과를 인정한다. 큰 부상 상태의 교전이고 최상위 상대에게 반복 유효타를 기록한 자료는 부족해 상위권 공격력으로 일반화하지 않는다.',['evidence-izo-gifters-tv1063','evidence-izo-cp0-tv1065-1068'],'E2'],
  ['defense',72,'마하와의 교전에서 본인도 치명상을 입었으며 이전 누적 부상 상태였다. 실제 회피·피해 경감에 대한 독립 표본은 부족하다.',['evidence-izo-cp0-tv1065-1068'],'E3'],
  ['stamina',79,'중상에도 기프터즈와 CP0에 대응한 지속 의지를 반영한다. 최종적으로 치명상에 도달해 무제한 지구력으로 보지 않는다.',['evidence-izo-gifters-tv1063','evidence-izo-cp0-tv1065-1068'],'E2'],
  ['speed',74,'총기 운용은 확인되지만 반응속도·이동속도를 최상위 전투원과 통제 비교할 직접 장면이 부족하다.',['evidence-izo-gifters-tv1063'],'E3'],
  ['techniqueMastery',82,'정상결전의 권총 운용과 와노 전투에서의 사격·저지 경험을 반영한다. 무장색 탄환의 존재는 검증되지 않아 Raw Haki를 가산하지 않는다.',['evidence-izo-pistols-official','evidence-izo-cp0-tv1065-1068'],'E2'],
  ['combatIQ',78,'다친 동료를 우솝에게 맡기고 자신이 적을 상대하는 구출 우선 전술을 인정한다. 단일 사례를 천재적 전술가 수준으로 환산하지 않는다.',['evidence-izo-gifters-tv1063'],'E2'],
  ['versatility',72,'총기 원거리 교전과 전선 보호·지원 임무는 확인되나 서로 다른 다수 능력 계통과 광역 기술까지 검증되지 않았다.',['evidence-izo-pistols-official','evidence-izo-gifters-tv1063'],'E3'],
]
export const izoAssessmentEvaluation: Evaluation = {
  id:'evaluation-izo-wano-provisional',
  characterId:'izo',evaluationDataVersion:'evaluation-0.3.3-izo-e2e3-wano-provisional',
  status:'draft',isDefault:true,
  subjectState:{id:'wano-raid',label:'와노쿠니 오니가시마 전투',note:'중상·다수전·지원 임무를 구분한 E2/E3 잠정 평가. 원작 해당 화 전수 대조 전.'},
  items:raw.map(([stat,baseScore,rationale,evidenceIds,readiness])=>({stat,baseScore,score:baseScore,rationale,evidenceIds,hakiContributions:[],readiness})),
}
