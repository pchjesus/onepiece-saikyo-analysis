import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { CombatStat, Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import { getFinalStatScore } from '../../domain/evaluation/score'
import { v0170Evaluations } from './v0170GroupAceExpansion'

/**
 * v0.1.71 Ace correction — separately versioned, replacing *only* current
 * Ace Evaluation. v0.1.70 draft stays intact for a reproducible rollback.
 * All new scenes are supplementary: official anime + chapter-indexed third-
 * party summaries, NOT full direct primary manga-panel verification.
 */
const historicalAce = v0170Evaluations.find(e=>e.characterId==='ace')
if (!historicalAce) throw new Error('v0.1.70 Ace baseline missing')

export const v0171AceScoring = {
  attack: {value:79, readiness:'E2', rationale:'Ch.159 화권으로 해군 함선을 파괴하고 Ch.441 바나로 섬에서 반딧불·불창 등으로 티치에게 직접 화상·관통 피해를 줬다. 원거리/광역 위력은 확실하지만, 상위 강자를 반복적으로 결정타로 쓰러뜨린 근거가 없으므로 비스타 Attack82, 잭79, 크래커75의 동일 축에 맞춰 84→79로 조정한다. 도시·함선 파괴 규모를 대인 피해량으로 환산하지 않는다.', evidence:['evidence-v0171-ace-five-ships-159','evidence-v0171-ace-teach-arsenal-441']},
  defense: {value:76, readiness:'E2', rationale:'자연계 불꽃화와 Ch.572의 경염으로 쿠잔의 냉기를 방어한 실제 대응은 인정한다. 그러나 티치의 접촉 능력 무효·사카즈키의 속성 우위라는 특정 조건에서 피해를 입었다. 동생을 대신 감싼 희생은 상시 피격 회피 실패로 간주하지 않고 77→76의 제한적 조정만 한다.', evidence:['evidence-v0171-ace-aokiji-mirror-flame-572','evidence-v0170-ace-teach','evidence-v0170-ace-sacrifice']},
  stamina: {value:82, readiness:'E2', rationale:'Ch.552에서 흰수염에게 도전하기 전 징베와 5일간 결투한 끝에 양측이 모두 쓰러졌다는 명확한 장기전 실적을 이번 버전에 독립 Evidence로 연결했다. 당시 두 사람의 과거 상태와 현시점의 차이를 고려하며 잭 88(조우 5일 연속 교대전+추가 피해), 카타쿠리84, 크래커80, 징베80과 비교할 때 82는 방어 가능하므로 유지한다. 티치전 피격 결과를 독립적 5일 전투에 덧붙여 가산하지 않는다.', evidence:['evidence-v0171-ace-jinbe-five-days-552','evidence-v0170-ace-teach']},
  speed: {value:78, readiness:'E3', rationale:'티치의 근접 흡인 이후 대응과 정상결전 구조 전선 개입은 속도 기반 대응 능력을 보여준다. 그러나 상위 최고속 앵커와의 반복적인 동조건 1대1 회피 비교는 부족하다. 불꽃의 사거리·이동 특성을 순수 신체 Speed와 구분하며 현재 78을 E3 잠정값으로 유지한다.', evidence:['evidence-v0170-ace-teach','evidence-v0170-ace-smoker','evidence-v0171-ace-aokiji-mirror-flame-572']},
  techniqueMastery: {value:78, readiness:'E2', rationale:'Ch.441에서 반딧불·불창·십자화·염제 등 여러 형태를 실제 사용하고 Ch.572에서 쿠잔의 얼음 기술을 경염으로 막았다. 다만 다른 원리의 기술이 아니라 이글이글 열매의 동일 메커니즘이며 크래커80(병사·갑옷·무기 조종), 킹80(형태/루나리아 모드 전환), 비스타87(미호크와 검술)보다 높은 숙련도를 직접 입증하지 못해 85→78로 조정한다.', evidence:['evidence-v0171-ace-teach-arsenal-441','evidence-v0171-ace-aokiji-mirror-flame-572']},
  combatIQ: {value:67, readiness:'E2', rationale:'Ch.552에서 흰수염이 만류한 티치 단독 추적을 감행했고, Ch.573에서는 흰수염이 최후의 선장 명령으로 자신을 희생하며 퇴각을 지시했고 동료들이 에이스를 구출했는데도 사카즈키의 도발에 걸려 방향을 돌려 교전했다. 이는 감정 통제·위험 평가·임무 달성 우선순위에서 심각한 반복 실패다. 티치의 접촉 봉쇄 조건을 파악하고 거리 유지·불꽃 전술을 변경한 제한적인 판단력은 남겨 일반 지능 0점으로 치환하지 않는다. 루피를 감싸는 보호 행위 자체는 부정 판단이 아니며 앞선 퇴각 결정 실패와 혼동하지 않는다. 78→67.', evidence:['evidence-v0171-ace-akainu-turnback-573','evidence-v0171-ace-teach-arsenal-441','evidence-v0170-ace-sacrifice']},
  versatility: {value:78, readiness:'E2', rationale:'비스타74는 검술 중심, 죠즈74는 다이아몬드화 방어·돌진 중심이다. 에이스는 불꽃으로 근접 타격·멀리 떨어진 적 공격·광역 제압·지속 견제·일시 화염 차단에 실제 활용했으므로 역할 선택지 측면에서 두 인물보다 높은 78이 가능하다. 그러나 이 모두 같은 불꽃 능력에 기반하며 회복·공간이동·환경 전체 통제 같은 독립 능력을 보유한 것은 아니다. 크래커77 및 퀸80과 교차 비교해 85→78로 조정한다.', evidence:['evidence-v0171-ace-teach-arsenal-441','evidence-v0171-ace-aokiji-mirror-flame-572','evidence-v0170-ace-smoker']},
} as const

const keys:CombatStat[] = ['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility']
export const v0171AceEvaluation: Evaluation = {
  ...historicalAce,
  evaluationDataVersion:'evaluation-0.1.71-ace-context-recalibrated',
  items:keys.map((stat):EvaluationItem=>{
    const old=historicalAce.items.find(i=>i.stat===stat)
    if (!old) throw new Error('Ace axis missing: '+stat)
    const row=v0171AceScoring[stat]
    const next:EvaluationItem={...old,baseScore:row.value,score:row.value,
      rationale:row.rationale,readiness:row.readiness,
      evidenceIds:[...new Set([...old.evidenceIds,...row.evidence])],
      hakiContributions:[],
    }
    return {...next,score:getFinalStatScore(next)}
  }),
}

export const v0171AceBattles: Battle[] = [
  {id:'marineford-ace-aokiji-572',title:'마린포드 — 에이스의 경염과 쿠잔의 얼음 공격',
   chronologyOrder:480,combatStructure:'multiple-vs-multiple',combatPurpose:'에이스와 루피의 구출 직후 탈출 전선에서 쿠잔의 저지에 대응',
   combatIntent:'unknown',environment:'마린포드 탈출 통로',restrictions:'수갑 해제 직후의 짧은 방어/지원 공방으로 장시간 1대1 아님',
   externalFactors:'루피 및 다수 전장 참여자, 원소 상성',result:'interrupted',participantIds:[]},
  {id:'marineford-ace-akainu-retreat-573',title:'마린포드 — 아카이누의 도발에 맞서 퇴각을 중단한 에이스',
   chronologyOrder:481,combatStructure:'multiple-vs-multiple',combatPurpose:'흰수염이 희생을 선택하며 명령한 해적단 전체의 퇴각과 루피 보호',
   combatIntent:'unknown',environment:'마린포드 전장',restrictions:'전장 전체의 혼전, 루피의 쇠진, 원소 상성이 겹친 상황',
   externalFactors:'흰수염 최후의 퇴각 명령과 사카즈키의 모욕/도발, 루피의 상태',result:'interrupted',participantIds:[]},
  {id:'alabasta-ace-marine-warships-159',title:'알라바스타 — 에이스의 화권과 해군 군함',
   chronologyOrder:40,combatStructure:'one-vs-multiple',combatPurpose:'해군 함대에 대한 광역 견제 및 루피 일행 이동 지원',
   combatIntent:'unknown',environment:'알라바스타 인근 바다',restrictions:'배 파괴 대상은 강자의 인체 Defense와 다르고 함선·함원 피해 규모가 직접 1대1 결투 표본은 아님',
   externalFactors:'해군 선박 편대 및 넓은 수역',result:'unknown',participantIds:[]},
]

export const v0171AceEvidence: Evidence[] = [
  {
    id:'evidence-v0171-ace-jinbe-five-days-552',battleId:'pre-timeskip-jinbe-ace',subjectCharacterId:'ace',
    source:{type:'supplementary',reference:'ONE PIECE Manga Ch.552 / official TV 461',description:'https://one-piece.com/anime/461/index.html ; https://onepiece.fandom.com/wiki/Chapter_552'},
    evidenceStrength:'strong',fact:'과거 에이스는 흰수염에게 접근하기 위해 징베와 직접 5일간 결투했고 두 사람 모두 쓰러져 승부가 나지 않았다.',
    supportedAbilities:['5일간 교전 지속','지구력','근접·불꽃 공방'],
    statContributions:[
      {stat:'stamina',role:'primary',note:'5일 결투는 명시된 독립적 Stamina 근거이며 이미 징베 측 Evidence로도 기록되어 있다.'},
      {stat:'attack',role:'secondary',note:'징베와 5일 교착은 전투 성립 근거이나 상위 강자 단번 격파 또는 현시점 절대 공격 스케일링은 아니다.'},
      {stat:'defense',role:'secondary',note:'긴 결투 생존은 증명하지만 상대의 특정 공격을 얼마나 피해 경감했는지는 미공개다.'},
    ],
    interpretation:'에이스의 장기전 지속력은 추정이 아니라 징베와의 5일 결투로 명확히 뒷받침된다.',
    evaluationImpact:'Stamina82 유지와 Attack/Defense의 제한적 보조. 기존 징베 Evidence와 같은 사건이므로 두 개의 독립 위력점수로 환산하지 않음.',
    uncertainty:'당시 에이스는 스페이드 해적단 선장 시기로 흰수염 입단 전이며 현재 징베의 전력과 직접 동일시할 수 없다. 직접 만화 전체 컷 검증은 미완료.',
  },
  {
    id:'evidence-v0171-ace-akainu-turnback-573',battleId:'marineford-ace-akainu-retreat-573',subjectCharacterId:'ace',
    source:{type:'supplementary',reference:'ONE PIECE Manga Ch.573 / official TV 482',description:'https://one-piece.com/anime/482/index.html ; https://onepiece.fandom.com/wiki/Chapter_573'},
    evidenceStrength:'strong',fact:'흰수염이 자신을 희생해 모두에게 퇴각을 명령하고 루피 일행이 에이스를 구출했으나, 에이스는 사카즈키가 흰수염을 모욕하자 발길을 돌려 맞섰다. 사카즈키의 마그마 공격으로 불리해졌고, 루피를 지키다 치명상을 입었다.',
    supportedAbilities:['퇴각 판단 실패','도발 대응','동료 보호'],
    statContributions:[
      {stat:'combatIQ',role:'primary',note:'이미 달성한 탈출 목적·최후의 지휘 명령·팀 전체 희생을 적의 도발에 압도되도록 허용한 반복적 감정 통제/위험 판단 실패다.'},
      {stat:'defense',role:'context',note:'원소 상성 및 동료 보호 피격은 독립 Defense 하향 자료로 단순 환산하지 않는다.'},
    ],
    interpretation:'감정적 판단 때문에 확보된 퇴각 성공이 위험에 노출되었다. 동생을 보호한 행동 그 자체와 퇴각을 중단한 결정은 별개다.',
    evaluationImpact:'Combat IQ 78→67의 핵심 근거. 생명을 바친 보호와 사카즈키의 불/마그마 속성 상성은 IQ/Defense에 중복 벌점 금지.',
    uncertainty:'정상결전은 혼전이고, 결정 후 루피를 보호한 것은 도덕적 선택이다. 이를 일반적 지적 능력 저하나 일상 전투 기술 무능으로 확대하지 않는다. 만화 전체 컷 직접 열람은 미완료.',
  },
  {
    id:'evidence-v0171-ace-teach-arsenal-441',battleId:'banaro-teach-ace',subjectCharacterId:'ace',
    source:{type:'supplementary',reference:'ONE PIECE Manga Ch.441 / official TV 325',description:'https://one-piece.com/anime/325/index.html ; https://onepiece.fandom.com/wiki/Chapter_441'},
    evidenceStrength:'strong',fact:'에이스는 바나로 섬에서 불꽃 반딧불의 폭발, 화염 창, 십자 화염, 거대 불꽃 염제를 사용했고 티치에게 직접 불꽃 피해를 주었다. 티치의 어둠 흡인과 접촉 능력 봉쇄를 알고도 전투했으나 결국 패했다.',
    supportedAbilities:['불꽃의 다종 형태 변경','원거리·광역 공격','상대 능력 대응'],
    statContributions:[
      {stat:'attack',role:'primary',note:'티치에게 실제로 불꽃 피해를 입힌 공격이 확인되지만 파괴 범위와 최상위 상대 반복 마무리 피해는 구분한다.'},
      {stat:'techniqueMastery',role:'primary',note:'여러 불꽃 형태 구사는 숙련 근거이나 다른 기술 원리/열매를 획득한 수준으로 중복 평가하지 않는다.'},
      {stat:'versatility',role:'primary',note:'원거리·광역·근접 견제 역할 다양화는 인정하되 모두 불꽃이라는 동일 기반이다.'},
      {stat:'combatIQ',role:'secondary',note:'접촉 무효화 조건을 이해한 후 전술 대응을 시도했다. 최종 패배가 모든 전술 판단 부재를 의미하지 않는다.'},
      {stat:'speed',role:'context',note:'불꽃 발사 속도를 신체 기동·반응 속도로 합산하지 않는다.'},
    ],
    interpretation:'대인 실제 공격 피해와 기술 운용은 인정하되 화염 규모를 바로 82점대 이상 결정력으로 확대하지 않는다.',
    evaluationImpact:'Attack79/Technique78/Versatility78의 독립 장면은 원래 v0.1.70 티치전 기록과 같은 사건이다. **같은 불꽃 피해를 중복 가산하지 않는다**.',
    uncertainty:'화염으로 티치에게 고통·부상을 입혔으나 어둠 열매의 통증 증폭 성질이 있다. 실제 상대 내구력을 일반 사최간 스케일로 역산하지 않는다.',
  },
  {
    id:'evidence-v0171-ace-aokiji-mirror-flame-572',battleId:'marineford-ace-aokiji-572',subjectCharacterId:'ace',
    source:{type:'supplementary',reference:'ONE PIECE Manga Ch.572 / official TV 481',description:'https://one-piece.com/anime/481/index.html ; https://www.grandlinearchives.com/devil-fruits/mera-mera-no-mi'},
    evidenceStrength:'moderate',fact:'에이스는 구출 직후 루피와 탈출하며 쿠잔의 얼음 기술에 경염을 사용해 화염으로 대응했다.',
    supportedAbilities:['불꽃 방어','화염 형태 조절','대인 차단 지원'],
    statContributions:[
      {stat:'defense',role:'primary',note:'특정 냉기 공격을 실제 차단한 성과이나 원소 상성 및 짧은 혼전의 맥락을 분리한다.'},
      {stat:'techniqueMastery',role:'primary',note:'경염을 타이밍에 맞춰 상대 얼음 기술에 적용한 실제 열매 운용이 확인된다.'},
      {stat:'versatility',role:'primary',note:'상대를 때리는 화력 외에도 순간 보호/차단을 위해 화염을 운용했다.'},
      {stat:'speed',role:'context',note:'전투 대응 타이밍은 증명하지만 쿠잔의 신체 반응 속도와 동급이라는 뜻은 아니다.'},
    ],
    interpretation:'에이스는 단순 화력만 가진 캐릭터는 아니다. 하지만 속성 방어를 별도 독립 열매 능력으로 환산하지 않는다.',
    evaluationImpact:'Defense76·Technique78·Versatility78의 보조 근거. 불꽃 메커니즘 하나를 세 개 독립 능력으로 확대하면 안 됨.',
    uncertainty:'TV481 공개 공식 요약은 탈출과 협동 공격 중심이며 경염의 기술명·세부 공방은 원작 572화의 2차 회차 대조로 보완했다. 만화 원본 전체 검증은 미완료.',
  },
  {
    id:'evidence-v0171-ace-five-ships-159',battleId:'alabasta-ace-marine-warships-159',subjectCharacterId:'ace',
    source:{type:'supplementary',reference:'ONE PIECE Manga Ch.159',description:'https://www.grandlinearchives.com/vivre-cards/ace'},
    evidenceStrength:'moderate',fact:'알라바스타에서 에이스는 화권으로 여러 해군 군함을 파괴해 대형 구조물에 대한 광역 화력을 보였다.',
    supportedAbilities:['화권','원거리 광역 화력','함선 견제'],
    statContributions:[
      {stat:'attack',role:'primary',note:'대형 함선 대상의 광역 파괴 성과이지만 상위 개인 강자에게 동일 피해를 보장하지 않는다.'},
      {stat:'versatility',role:'secondary',note:'원거리 전선 견제 기능은 인정하지만 이미 확인된 불꽃 공격 한 종류의 응용이다.'},
    ],
    interpretation:'출력 범위는 높지만 공격 적중 난이도·대인 결정타는 별개다.',
    evaluationImpact:'Attack79·Versatility78의 보조 근거로만 사용; 사최간 상대 확정 우위 없음.',
    uncertainty:'원작 Ch.159에 대한 독립 요약을 참조했지만 원문 전체 컷 미열람이다. 해군 함정의 별도 상위 방어력은 확인되지 않았다.',
  },
]
