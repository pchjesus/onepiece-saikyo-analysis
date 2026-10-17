/**
 * v0.4.28: first calibration against support-stat inflation.
 * Draft estimates, NOT canonical power, guaranteed 1v1 wins or tier-fitting bonuses.
 * This overlay preserves original sample data, identifiers and Balanced 1.2.
 */
import type { Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Battle } from '../../domain/battle/types'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { wanoEvaluations } from './wanoExpansion'

type Revision = { prior: number[]; scores: number[]; reasons: string[] }
const revisions: Record<string, Revision> = {
  usopp: {
    prior:[63,61,70,62,88,76,79], scores:[68,61,70,64,76,75,74],
    reasons:[
      '특수 팝그린 폭발·구속과 최근 직접 명중 사례를 인정하되, 상대 재생·제압 실패와 장비 의존성 때문에 대간판급 결정타로 환산하지 않는다.',
      '저격 위치의 안전성과 견문색 발현이 정면 피격에 대한 신체 방어를 입증하지는 않는다.',
      '피격 후 임무를 이어가는 버팀은 있으나 상위권 장기 단독 공방은 확인되지 않는다.',
      '위기 속 회피와 재배치를 일부 인정하지만 탄환 속도·견문색 감지를 몸의 최고속으로 계산하지 않는다.',
      '슈거 초장거리 저격은 비올라·칸주로의 지원과 심리적 제압을 포함한 특수 임무다. 명중 전문성을 전체 전투기술 숙련도로 과대 일반화한 88점을 취소하고 76을 잠정 상단값으로 본다.',
      '저격 위치·특수탄 선택과 오타마 방송 지원은 긍정하되 임무 성공을 반복 정면전 판단력과 동일시하지 않는다.',
      '팝그린의 구속·교란·폭발·지원은 유용하지만 대부분 새총이라는 단일 무기체계의 파생 기능이다.'
    ]
  },
  kinemon:{
    prior:[76,74,81,75,79,71,78],scores:[75,70,76,72,78,70,70],
    reasons:[
      '카이도에 대한 검격은 아카자야 공동 공격으로 개인 단독 관통 위력을 분리할 수 없다.',
      '카이도의 타격을 직접 견고하게 차단한 기록이 적고 피해 후 생존과 방어 성공은 구별한다.',
      '큰 피해를 겪은 이후 행동은 있으나 예외적 생존과 장기 고강도 맞대결 체력은 별개다.',
      '여우불류 화염 절단의 기술 반응은 본인의 전반적 이동·회피 최고속과 동일하지 않다.',
      '화염을 베는 전문 검술 성과는 유지하지만 상위 검사 전반에 상응하는 반복 정면전 근거는 약하다.',
      '임무·동료 보호는 확인되나 공동 작전 전체의 성과를 개인 전투 판단력으로 가산하지 않는다.',
      '화염 절단과 의상·위장 능력이 모두 독립적인 전투 대응력은 아니므로 보조 기술 중복을 줄인다.'
    ]
  },
  denjiro:{
    prior:[78,77,80,77,85,79,72],scores:[77,74,76,75,82,73,67],
    reasons:[
      '높은 검술은 인정하나 카이도 공동 공격의 피해를 개인 결정타로 환산하지 않는다.',
      '짧은 고수와의 검격 대응은 확인되지만 대간판급 공격 반복 차단은 미확인이다.',
      '잠입 준비 20년을 전투 중 체력·연속 피격 버팀으로 환산하지 않는다.',
      '빠른 검격 반응을 인정하되 상위권 신체 기동의 독립 표본은 제한적이다.',
      '숙련 검객이라는 직접 묘사는 높게 평가하지만 비스타 같은 상위 정밀 검술에 근접하는 85는 근거 부족이다.',
      '병력 은닉과 조직 운영은 전쟁 준비 역량이며 순간적인 1대1 공방 판단을 79까지 입증하지 않는다.',
      '위장·조직 운영은 실전 타격 수단의 다변화가 아니며 공격은 주로 검에 의존한다.'
    ]
  },
  'ashura-doji':{
    prior:[80,77,81,74,80,75,71],scores:[80,76,79,74,79,74,70],
    reasons:[
      '잭에게 직접 큰 상처를 남긴 공식 912화 교전은 보존한다. 카이도 집단전의 전체 피해는 중복 가산하지 않는다.',
      '잭과의 교전은 긍정하되 최상위 공격을 반복 무상쇄하는 방어 수준은 미확인이다.',
      '오랜 검객 경력과 동료 보호 희생을 장기간 강적과의 무휴식 개인전 체력으로 보지 않는다.',
      '실전 검격의 빠름을 인정하지만 독립적인 초고속 이동 수단은 확인되지 않는다.',
      '강한 검술과 즉시 대응 능력을 인정하되 검술 최고권의 반복 검증은 부족하다.',
      '가짜 오뎅의 위험을 감지해 동료를 보호했으나 고급 전술 분석 반복 성과는 제한적이다.',
      '검과 보호·위험 식별은 주로 동일한 근접전·지원 상황이며 독립 전장 제어는 부족하다.'
    ]
  },
  kawamatsu:{
    prior:[77,74,75,74,80,73,70],scores:[74,71,73,72,78,70,68],
    reasons:[
      '카이도 공동 공격의 검격을 인정하나 독립 결정타 수준은 확인되지 않는다.',
      '실전 방어는 있으나 최상위 공격을 연속 차단한 표본은 적다.',
      '장기 구금 생존과 대간판급 장시간 전투 지속력은 다른 능력이다.',
      '수중 기동 잠재력과 지상 근접 반응 속도를 구분한다.',
      '카파류 검술의 숙련은 유지하되 강력한 동급 검사와의 비교 표본은 부족하다.',
      '단체 임무 수행이 전투 도중의 독립적 전술 전환 성과를 증명하지 않는다.',
      '검술과 어인 특성을 인정하나 별도 광역 지원과 상성 대응의 반복 사용은 제한적이다.'
    ]
  },
  kikunojo:{
    prior:[74,72,75,76,79,72,69],scores:[72,69,72,74,78,70,67],
    reasons:[
      '칸주로를 베어낸 실적을 인정하되 과거 동료와 심리 상태·기습 조건이 반영된 교전이다.',
      '정면 고강도 방어 기록은 제한적이며 전장 생존을 방어력으로 중복 계산하지 않는다.',
      '심리적 부담과 누적 부상 속 버팀은 있으나 장기전의 독립 표본은 적다.',
      '근접 발도 능력은 인정하되 높은 장거리 이동·회피 속도는 미확인이다.',
      '숙련된 검술은 인정하나 상위 최간부급 검객과 반복 교전한 근거는 부족하다.',
      '전투 중 망설임은 상황 요인이지만 전술 선택의 반복 성공 역시 충분히 입증되지 않는다.',
      '검술 중심으로 독립적인 원거리 제압·지원 능력 증명이 약하다.'
    ]
  },
  raizo:{
    prior:[68,69,76,72,80,78,84],scores:[65,64,74,69,77,72,79],
    reasons:[
      '반사한 보로 브레스의 열량은 카이도 원래 화력이다. 인술 자체의 독립 공격 출력을 높게 볼 수 없다.',
      '두루마리의 특정 화염 대응은 강력하나 모든 물리·패기 공격을 상시 차단하는 방어는 아니다.',
      '후쿠로쿠주와 인내 대치는 인정하지만 신체 격투 장기전 성능으로 일반화하지 않는다.',
      '닌자라는 직함과 교란 기술을 신체 이동·회피의 직접 실적으로 바꾸지 않는다.',
      '기술 저장·반사는 전문 기술이나 직접적인 다수 고수와의 공방 조작 숙련은 미검증이다.',
      '화염 반사 선택과 임무 수행은 인정하되 인술 준비·정보전이 정면 전투 판단력과 같지 않다.',
      '반사·저장·지원·교란은 실제 다기능이나 원천 화력의 중복과 기회·준비 제약을 함께 반영한다.'
    ]
  },
  inuarashi:{
    prior:[80,81,83,79,78,77,76],scores:[76,76,78,75,76,73,71],
    reasons:[
      '조우에서 잭과 정면 공방은 인정하지만 스론으로 잭을 격파한 화력을 평상시 공격에 더하지 않는다.',
      '잭의 코 공격을 한손으로 멈춘 정상 형태의 방어를 인정하되 스론 강화와 별도다.',
      '조우의 낮·밤 교대 전투를 무휴식 5일 개인 결투로 해석하지 않는다.',
      '평상시 기동과 스론 초고속 전투를 섞지 않는다.',
      '검술·일렉트로 운용은 인정하되 조건부 스론의 숙련을 상시 증폭으로 간주하지 않는다.',
      '교대 전술과 상대 대응은 확인되지만 1대1 전술적 압도 사례는 제한적이다.',
      '검술·체술·전격은 여러 수단이지만 상시 스론은 사용할 수 없다.'
    ]
  },
  nekomamushi:{
    prior:[80,80,82,79,78,75,76],scores:[76,76,77,75,76,72,70],
    reasons:[
      '조우에서 잭의 코를 붙잡아 던진 성과는 강하지만 스론 페로스페로 격파를 평상시 화력으로 환산하지 않는다.',
      '조우의 근접 방어는 인정하되 스론 보호·회피 능력과 분리한다.',
      '낮·밤 교대와 후속 전투의 총기간을 무휴식 연속 개인전으로 보지 않는다.',
      '평상시 반응 속도와 스론 강화 기동을 분리한다.',
      '체술과 일렉트로 전문성을 인정하되 스론 조건을 평균 기본 숙련에 포함하지 않는다.',
      '적에 대응하는 경험은 긍정하지만 반복 고급 전술 분석은 제한적이다.',
      '체술·전격의 실용성은 인정하되 원거리 대응과 지원 역할의 표본은 제한된다.'
    ]
  },
  kanjuro:{
    prior:[68,68,73,71,86,76,84],scores:[67,65,70,69,83,71,80],
    reasons:[
      '화전방·그림 공격의 효과는 인정하지만 준비·기만·심리적 기습으로 발생한 피해를 반복 직접 화력으로 세지 않는다.',
      '가짜 분신·위장을 통한 회피는 강하나 본체의 직접 물리 방어력은 확인되지 않는다.',
      '반복 기술 실행과 연속 정면 공격을 견디는 신체 지구력은 다르다.',
      '그림으로 이동·교란한 성과를 본인의 근접 반응 최고속으로 환산하지 않는다.',
      '정교한 그림과 실체화는 직접 확인되므로 상대적으로 높게 유지하되 강자 상대 근접 기술 숙련과는 구분한다.',
      '오랜 잠입·기만의 성공은 전술 자원이나 심리적 이점이지 반복 정면전 Combat IQ 76 증거는 아니다.',
      '다양한 그림·위장·이동·화염 사용은 인정하되 준비시간과 상성 의존성을 반영한다.'
    ]
  }
}
const sulongScores: Record<string,number[]> = {
  inuarashi:[80,81,82,80,78,75,74],
  nekomamushi:[79,80,81,79,78,73,74],
}
const first = (id:string) => id === 'usopp' ? 'evaluation-v0412-usopp' : 'evaluation-wano-'+id
export function applyV0428CalibratedEvaluation(evaluation:Evaluation):Evaluation {
  const config=revisions[evaluation.characterId]
  if (!config) return evaluation
  if (evaluation.id !== first(evaluation.characterId) ||
      (evaluation.characterId==='usopp'
        ? evaluation.evaluationDataVersion !== 'evaluation-v0.4.12-eight-provisional-source-reviewed'
        : evaluation.evaluationDataVersion !== 'evaluation-0.1.45-multi-group-evidence-draft')) {
    throw new Error('v0.4.28 evaluation identity/version drift: '+evaluation.characterId)
  }
  if (evaluation.items.length!==COMBAT_STATS.length) throw new Error('v0.4.28 seven-stat input drift')
  const items=evaluation.items.map((original,i):EvaluationItem=>{
    if(original.stat!==COMBAT_STATS[i] || original.baseScore!==config.prior[i] ||
       getRawHakiContributionTotal(original)!==0 || original.hakiContributions.length!==0 ||
       original.score!==config.prior[i]) throw new Error('v0.4.28 baseline drift: '+evaluation.characterId+'/'+original.stat)
    const special = ['inuarashi','nekomamushi'].includes(evaluation.characterId)
    const filteredIds=special
      ? original.evidenceIds.filter(id=>!id.includes('-1051-') && id!=='evidence-wano-'+evaluation.characterId+'-combat'
          && !id.includes('-kaido-1004-'))
      : original.evidenceIds
    const newEvidence = special ? ['evidence-v0428-zou-'+evaluation.characterId+'-jack']
      : evaluation.characterId==='ashura-doji' ? ['evidence-v0428-ashura-jack']
      : []
    const adjusted:EvaluationItem={
      ...original,
      baseScore:config.scores[i],
      rationale: config.reasons[i]+' (v0.4.28 급간은 검산 참고, 숫자·승률의 직접 근거가 아님. 원작 컷 전수 검증 전 draft.)',
      evidenceIds:[...new Set([...filteredIds,...newEvidence])],
      readiness: special && ['speed','techniqueMastery','combatIQ','versatility'].includes(original.stat)
        ? 'E3' : original.readiness,
      hakiContributions:[],
    }
    return {...adjusted,score:getFinalStatScore(adjusted)}
  })
  const special=['inuarashi','nekomamushi'].includes(evaluation.characterId)
  return {
    ...evaluation,
    evaluationDataVersion:'evaluation-v0.4.28-support-axis-calibration',
    subjectState:special
      ? {id:'wano-record',label:'평상시 · 스론 제외',
         note:'조우의 잭 교대전과 평상시 검술·체술 기준. 만월 조건부 스론 격파 기록은 별도 상태로 분리. 장기 교대전을 무휴식 개인 결투로 해석하지 않음.'}
      : evaluation.subjectState,
    items,
  }
}
/** Existing v0.4.18 state-switcher can show conditional power without changing the ranking algorithm. */
export const v0428SulongEvaluations:Evaluation[] = wanoEvaluations
  .filter(e=>e.characterId==='inuarashi'||e.characterId==='nekomamushi')
  .map(source=>{
    const id=source.characterId, scores=sulongScores[id]
    const finishEvidence=id==='inuarashi'?'evidence-wano-detailed-inu-jack-1051-inuarashi':'evidence-wano-detailed-neko-perospero-1051-nekomamushi'
    const items=source.items.map((original,i):EvaluationItem=>{
      if(original.stat!==COMBAT_STATS[i]||original.baseScore!==revisions[id].prior[i]||original.hakiContributions.length)
        throw new Error('v0.4.28 sulong baseline drift: '+id)
      const revised:EvaluationItem={
        ...original,baseScore:scores[i],
        rationale:'만월이 확인되고 스론이 활성화된 조건부 최대 출력. '+revisions[id].reasons[i]
          +' 1051화 격파는 상대의 누적 피해·월광 제약을 포함한 단일 사건이며 모든 시간에 적용되지 않는다. 독립 Haki Raw 없음.',
        evidenceIds:[...new Set([...original.evidenceIds,finishEvidence,'evidence-v0428-zou-'+id+'-jack'])],
        readiness:i===5?'E3':'E2',hakiContributions:[],
      }
      return {...revised,score:getFinalStatScore(revised)}
    })
    return {
      ...source,id:'evaluation-v0428-'+id+'-sulong',
      evaluationDataVersion:'evaluation-v0.4.28-sulong-conditional',
      isDefault:false,
      subjectState:{id:'wano-sulong',label:'만월 · 스론',
        note:'달빛 노출이 필요한 조건부 최고 전력. 1051화 격파 이전 상대의 누적 피해 및 달빛 상실 시 급격한 약화 반영. 정면 상시 1대1 전력·승률을 뜻하지 않음.'},
      items,
    }
  })
export const v0428Battles:Battle[]=[
  {id:'battle-v0428-zou-jack-shift',title:'조우 — 이누아라시·네코마무시의 낮밤 교대 vs 잭',
    chronologyOrder:217,combatStructure:'multiple-vs-one',combatPurpose:'조우와 주민 보호',
    combatIntent:'serious',environment:'조우 왕국 · 낮과 밤',
    restrictions:'이누아라시와 네코마무시는 낮·밤을 교대했다. 각 인물이 5일간 잭과 무휴식 1대1로 싸운 게 아니다.',
    externalFactors:'밍크족·기프터즈의 전투와 잭의 독가스 사용, 후속 회복 및 전장 변화.',result:'interrupted',participantIds:[]},
  {id:'battle-v0428-ashura-jack',title:'와노 — 아슈라 동자의 잭 공격',
    chronologyOrder:350,combatStructure:'1v1',combatPurpose:'잭에 대항한 직접 검격',
    combatIntent:'serious',environment:'와노쿠니',
    restrictions:'초기 직접 베기 성공. 장기 1대1 전투의 최종 승패는 확인되지 않는다.',
    externalFactors:'양측 전투가 상황 변화로 완결되지 않았고 한 번의 유효타는 전체 격파가 아니다.',
    result:'interrupted',participantIds:[]},
]
export const v0428Evidence:Evidence[]=[
  ...(['inuarashi','nekomamushi'] as const).map(id=>({
    id:'evidence-v0428-zou-'+id+'-jack',battleId:'battle-v0428-zou-jack-shift',subjectCharacterId:id,
    source:{type:'supplementary' as const,reference:'ONE PIECE.com TV759–760',
      description:'https://one-piece.com/anime/o3025/index.html · https://one-piece.com/anime/o3027/index.html'},
    evidenceStrength:'moderate' as const,
    fact:id==='inuarashi'
      ? '조우에서 잭의 맘모스 코 공격을 한 손으로 멈추고 검격을 겨뤘다. 이후 낮밤 교대 규칙에 따라 네코마무시 측에 교전을 넘겼다.'
      : '조우에서 이누아라시와 교대한 뒤 잭을 붙잡아 던지고 교전했으나 잭을 격파하지 못했다.',
    supportedAbilities:['평상시 근접 공방','잭과의 교대전'],
    statContributions:[
      {stat:'attack' as const,role:'primary' as const,note:'평상시 잭 상대 직접 공격 성과.'},
      {stat:'defense' as const,role:'primary' as const,note:'교전 당시 직접 방어 및 접촉.'},
      {stat:'stamina' as const,role:'secondary' as const,note:'교대 참여, 무휴식 개인 5일 결투와 구별.'},
    ],
    interpretation:'평상시 강점은 인정하지만 스론의 전투 결과는 다른 상태에서 평가한다.',
    evaluationImpact:'평상시 평가의 직접 근거. 조건부 스론을 기본 점수에 합산하지 않는다.',
    uncertainty:'공식 애니 시놉시스 기반 supplementary. 원작 만화 컷 전수 대조 전이며 독립적인 피로량·피해량을 수치화하지 않는다.',
  })),
  {id:'evidence-v0428-ashura-jack',battleId:'battle-v0428-ashura-jack',
    subjectCharacterId:'ashura-doji',
    source:{type:'supplementary',reference:'ONE PIECE.com TV912',description:'https://one-piece.com/anime/o5267/index.html'},
    evidenceStrength:'moderate',
    fact:'와노쿠니에서 아슈라 동자가 대간판 잭과 정면 충돌하여 잭에게 큰 상처를 입혔다.',
    supportedAbilities:['상위 강자 직접 유효타','검술'],
    statContributions:[{stat:'attack',role:'primary',note:'잭에게 직접 큰 상처를 가함.'},
      {stat:'techniqueMastery',role:'secondary',note:'직접 베기 성과.'}],
    interpretation:'아슈라 동자의 공격력은 카이도 합동 검격과 구분되는 개별 근거가 있다.',
    evaluationImpact:'기존 공격력 80 유지의 독립 비교 근거. 잭 전체 1대1 격파로 확대하지 않음.',
    uncertainty:'TV912 공식 줄거리 기반 supplementary. 원작 만화 컷 전수 열람·공방 지속시간의 정량 검증은 미완료.',
  },
]
