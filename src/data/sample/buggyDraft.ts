import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation } from '../../domain/evaluation/types'

/**
 * v0.3.3: User-requested LOW-TIER *provisional draft*.
 * Source is an official character synopsis, not manually checked manga panels.
 * E3 throughout; numbers are explicitly project interpretation, never canon.
 */
export const buggyDraftBattle: Battle = {
  id: 'buggy-orange-town-official-summary',
  title: '오렌지 마을 — 버기와 루피의 충돌 (공식 줄거리 근거)',
  chronologyOrder: 0,
  combatStructure: 'multiple-vs-multiple',
  combatPurpose: '그랜드 라인 해도를 둘러싼 충돌',
  combatIntent: 'unknown',
  environment: '오렌지 마을',
  restrictions: '동료·제3자의 개입이 있는 초기 서사. 현재 사황급 정면전 표본이 아님',
  externalFactors: '루피 일행과 버기 해적단이 개입한 전장',
  result: 'defeat',
  participantIds: [],
}
export const buggyFameBattle: Battle = {
  ...buggyDraftBattle,
  id: 'buggy-marineford-fame-official-summary',
  title: '정상결전 — 버기 명망 형성의 맥락 (공식 소개)',
  chronologyOrder: 75,
  combatPurpose: '임펠다운 탈출에서 정상결전으로 이어진 혼전 참여',
  environment: '임펠다운~마린포드',
  restrictions: '다수 참전자와 우연한 사건의 영향으로 개인 정면전 성과가 분리되지 않음',
  result: 'unknown',
}
export const buggyDraftBattles: Battle[] = [buggyDraftBattle, buggyFameBattle]
export const buggyDraftEvidence: Evidence[] = [
  {
    id: 'evidence-buggy-official-orange-town',
    battleId: buggyDraftBattle.id,
    subjectCharacterId: 'buggy',
    source: { type: 'supplementary', reference: 'https://one-piece.com/character/Buggy/index.html',
      description: '공식 캐릭터 소개의 오렌지 마을 교전 요약. 원작 해당 페이지 직접 대조는 별도 과제' },
    evidenceStrength: 'moderate',
    fact: '공식 줄거리에서 버기가 루피와 교전했고 신체를 분리한 상태에서 날아갔다고 설명한다.',
    supportedAbilities: ['동강동강 열매에 의한 신체 분리'],
    statContributions: [
      { stat: 'attack', role: 'context', note: '초기 루피와의 패배를 참고하되 현재 전투 화력 상한의 증거로 단정하지 않는다.' },
      { stat: 'defense', role: 'secondary', note: '분리 능력의 특수 상호작용은 별도 능력으로 인정하되 일반 방어력을 자동 상향하지 않는다.' },
      { stat: 'techniqueMastery', role: 'secondary', note: '능력 사용 자체는 확인되지만 대장급 숙련도를 의미하지 않는다.' },
      { stat: 'versatility', role: 'secondary', note: '신체 분리·재결합의 전투적 선택지는 확인된다.' },
    ],
    interpretation: '다른 최상위 캐릭터와 같은 수준의 공격·방어 성과는 이 자료에서 확인되지 않는다. 열매 능력은 별도 특수 상성으로 남긴다.',
    evaluationImpact: '사용자가 요청한 하위권 초안의 정성 근거만 제공한다. E3가 점수의 절대적 정당성을 보증하는 것은 아니다.',
    uncertainty: '원작 페이지 전수 대조 전이며, 한 초기 교전과 현재의 사황 지위를 직접 동일 기준으로 환산할 수 없다.',
  },
  {
    id: 'evidence-buggy-official-marineford-fame',
    battleId: buggyFameBattle.id,
    subjectCharacterId: 'buggy',
    source: { type: 'supplementary', reference: 'https://one-piece.com/character/Buggy/index.html',
      description: '공식 캐릭터 소개의 임펠다운~정상결전 평가에 대한 요약' },
    evidenceStrength: 'weak',
    fact: '공식 소개는 임펠다운 탈출과 정상결전의 우연한 사건이 다른 죄수들의 경외로 이어졌다고 설명한다.',
    supportedAbilities: [],
    statContributions: [
      { stat: 'combatIQ', role: 'context', note: '타인의 오인과 명망은 1대1 전투 판단의 직접 증거로 합산하지 않는다.' },
      { stat: 'stamina', role: 'context', note: '생존·탈출은 사실이나 장시간 대장급 정면전 수행 능력과 같지 않다.' },
    ],
    interpretation: '지위·명망과 대인 전투실적을 분리해야 한다.',
    evaluationImpact: '사황 칭호로 점수를 자동 상향하지 않는 이유의 맥락 자료다.',
    uncertainty: '공식 줄거리의 요약일 뿐, 개인이 받은 피해·전투 의도·중간 조건의 전수 자료가 아니다.',
  },
]
const records: Array<[Evaluation['items'][number]['stat'],number,string,string[]]> = [
  ['attack',32,'오렌지 마을 초기 교전 패배가 확인된다. 현재 상위권 유효타·파괴력의 반복 직접 근거는 없어 하위권 잠정값을 사용한다. 패배 단일 결과만으로 절대 능력을 확정하지 않는다.',['evidence-buggy-official-orange-town']],
  ['defense',45,'분리 능력에 따른 특수한 참격 상성은 있으나 이를 모든 속성의 공격에 대한 일반 방어력으로 치환할 수 없다.',['evidence-buggy-official-orange-town']],
  ['stamina',38,'임펠다운~정상결전 생존은 확인되지만 고강도 정면전의 지속 시간과 누적 피해 조건이 미검증 상태다.',['evidence-buggy-official-marineford-fame']],
  ['speed',34,'상위 전투원과 비교 가능한 반응·기동 측정 근거가 부족하다. 초안의 낮은 수치는 강점 미확인을 의미하며 속도 부재의 확정이 아니다.',[]],
  ['techniqueMastery',42,'동강동강 열매 운용은 사실이지만 정면 고급 응용과 숙련도의 검증 범위는 제한적이다.',['evidence-buggy-official-orange-town']],
  ['combatIQ',29,'타인의 경외와 신분 상승에 우연이 작용했다는 공식 설명을 1대1 전투 전략 성공으로 간주하지 않는다. 부진의 확정 근거도 부족하다.',['evidence-buggy-official-marineford-fame']],
  ['versatility',46,'신체 분리·재결합이라는 특이한 대응 옵션을 인정한다. 검술·패기·원거리 화력 등 미확인 전투 수단까지 가산하지 않는다.',['evidence-buggy-official-orange-town']],
]
export const buggyDraftEvaluation: Evaluation = {
  id:'evaluation-buggy-provisional',
  characterId:'buggy',
  evaluationDataVersion:'evaluation-0.3.3-buggy-low-tier-E3-provisional',
  status:'draft',
  subjectState:{id:'provisional',label:'하위권 잠정 평가',note:'공식 줄거리 요약 기반의 E3 일괄 잠정치. 현재 시점 독립 정면전 자료 부족'},
  isDefault:true,
  items:records.map(([stat,baseScore,rationale,evidenceIds])=>({
    stat,baseScore,score:baseScore,rationale,evidenceIds,hakiContributions:[],readiness:'E3',
  })),
}
