import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation, EvaluationItem } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'

/**
 * v0.1.79: three-commanders, nine-axis comparative audit.
 *
 * One calibrated change: Queen's demonstrated independent ancient-Zoan,
 * integrated cyborg/Germa technology AND personally deployed battlefield
 * viral weapon each satisfy meaningfully distinct combat PURPOSES.
 * Unlike the one-clay-system Grus revision, Queen's systems are not all
 * cosmetic permutations of a single mechanism. The exact +2 is a
 * provisional peer calibration, not an automatic bonus per mechanism.
 *
 * Source tier: official ONE PIECE.com TV episodes 799/805/1005/1061,
 * all supplementary; no claim to re-read the full manga panels.
 */
export const v0179OfficialEvidence:Evidence[]=[
  {
    id:'evidence-v0179-queen-germa-mimic-tv1061',
    battleId:'onigashima-queen-sanji',
    subjectCharacterId:'queen',
    source:{type:'supplementary',reference:'ONE PIECE.com TV1061 (2023-05-07)',description:'https://one-piece.com/anime/61599/index.html'},
    evidenceStrength:'moderate',
    fact:'퀸은 상디에게 저지의 과학보다 우위임을 보이겠다며 제르마 형제들의 여러 능력을 자신에게 구현해 연속 사용했고 투명화도 활용했다. 상디는 고속 이동으로 투명화에 대응했다. 퀸은 오소메를 발견하자 전투 목적에서 벗어나 투명한 상태로 그녀를 때렸고, 상디의 결정적인 연속 공격을 받았다.',
    supportedAbilities:['사이보그 신체','제르마 재현 기술','투명화','전투 상황에 따른 대응'],
    statContributions:[
      {stat:'versatility',role:'primary',note:'고대종 육체와 구별되는 제르마 과학 기술·은신·전격 등 서로 다른 수단을 실전 전환한 폭이다. 모두 정면 대인 결정기로 중복 가산하지 않는다.'},
      {stat:'techniqueMastery',role:'secondary',note:'여러 기술의 실제 사용은 확인하지만 오발과 주의 분산은 숙련·안정성 평가의 한계다.'},
      {stat:'attack',role:'context',note:'수단의 개수를 대인 피해량이나 연속 적중률로 자동 환산하지 않는다.'},
      {stat:'combatIQ',role:'context',note:'오소메를 향한 행동과 상디의 대응은 수단 보유와 올바른 전술 선택을 구분하는 한계 사례다.'},
    ],
    interpretation:'재현 기술의 계열과 고대종 육체가 다른 전투 시스템임은 확인된다. 그러나 다수 기술 보유는 숙련·적중의 최고 점수를 증명하지 않는다.',
    evaluationImpact:'Queen Versatility 80→82(E2) 검토의 공식 애니 교차 근거. Attack80·Technique79와 IQ74 및 Haki Raw는 불변.',
    uncertainty:'동일 상디전의 기존 만화 Ch.1028–1034 Evidence를 재확인하는 보조 증거다. 별개의 강자 상대 결투로 계산하지 않으며 전체 만화 컷 전수 판독은 수행하지 않았다.',
  },
  {
    id:'evidence-v0179-queen-ice-oni-tv1005',
    battleId:'onigashima-marco-ice-oni',
    subjectCharacterId:'queen',
    source:{type:'supplementary',reference:'ONE PIECE.com TV1005 (2022-01-09)',description:'https://one-piece.com/anime/o5997/index.html'},
    evidenceStrength:'moderate',
    fact:'오니가시마 라이브 플로어의 사무라이들이 퀸의 역병탄을 맞고 아이스 오니로 변해 주변의 적과 아군을 구분하지 않고 덮쳤다.',
    supportedAbilities:['역병탄','아이스 오니','광역 전장 제어','감염의 무차별성'],
    statContributions:[
      {stat:'versatility',role:'primary',note:'퀸이 설계해 실전 배치한 바이러스 탄환은 레이저·제르마 개조·동물계 변신과 구분되는 상태 이상·광역 전장 제어 수단이다. 개인 육체의 고정 능력으로 오인하지 않는다.'},
      {stat:'attack',role:'context',note:'전장 전체의 감염 규모를 1대1 순수 화력이나 상위권 상대 확정 적중 데미지로 환산하지 않는다.'},
      {stat:'combatIQ',role:'context',note:'피아 구분이 없는 감염이라는 통제 실패·목적 상충을 전술 판단 맥락에 보존한다.'},
    ],
    interpretation:'크게 구분되는 장비·과학 기반 전장 수단으로 Versatility는 긍정하나, 무차별 감염과 부하에게까지 번지는 조건은 효율·판단력의 약점이다.',
    evaluationImpact:'Queen Versatility82(E2)의 역할 폭 보완. 추가 Attack·IQ·Raw 가산 금지.',
    uncertainty:'TV1005 공식 애니 시놉시스이며 독립 1대1 상황이 아니다. 기계·탄환은 퀸이 직접 사용한 전장 장비로 평가하되 표준 소지 제한 없는 모든 조건에서 사용 가능한 것으로 단정하지 않는다.',
  },
  {
    id:'evidence-v0179-cracker-truebody-gear4-tv799',
    battleId:'whole-cake-cracker-luffy',
    subjectCharacterId:'cracker',
    source:{type:'supplementary',reference:'ONE PIECE.com TV799 (2017-07-30)',description:'https://one-piece.com/anime/o4471/index.html'},
    evidenceStrength:'moderate',
    fact:'크래커의 단단한 비스킷 갑옷은 루피의 맹공을 막았으나 기어4의 공격으로 겉껍질이 부서졌다. 이후 실제 크래커가 갑옷 안에서 나와 루피에게 검을 휘둘렀고, 박수로 비스킷 병사를 대량 생성했다.',
    supportedAbilities:['비스킷 갑옷','숨긴 본체','무장색 검술','비스킷 병사 반복 생성'],
    statContributions:[
      {stat:'attack',role:'secondary',note:'기어4 상태에 대응해 실제 검을 휘두른 본체의 직접 대인 공격. 기존 원작 Ch.837–838의 피해 기록과 같은 장면이므로 중복 적중으로 세지 않는다.'},
      {stat:'techniqueMastery',role:'primary',note:'갑옷/본체 위장, 원거리 다수 병사 생성, 본체 검술까지 같은 비스킷 시스템을 정교하게 운용한다.'},
      {stat:'versatility',role:'secondary',note:'여러 기능을 수행하지만 비스킷 한 체계에서 파생된 사용법이며 독립적인 과학/다열매 체계로 보지 않는다.'},
    ],
    interpretation:'크래커의 1대1 근접 타격과 병사·갑옷 운영은 구분해 인정한다. 유효타와 병사 숫자를 동일한 순수 타격량으로 합산하지 않는다.',
    evaluationImpact:'Cracker Attack77(무장색 Raw 4), Technique80, Versatility77 유지; 공식 TV 보조 근거.',
    uncertainty:'TV799는 동일 Ch.837–838 전투의 애니 공식 요약이지 별도 추가 결투가 아니다.',
  },
  {
    id:'evidence-v0179-cracker-rain-weakness-tv805',
    battleId:'whole-cake-cracker-luffy',
    subjectCharacterId:'cracker',
    source:{type:'supplementary',reference:'ONE PIECE.com TV805 (2017-09-17)',description:'https://one-piece.com/anime/o4513/index.html'},
    evidenceStrength:'moderate',
    fact:'나미가 비를 내려 비스킷 병사의 단단함을 약화시키자 루피가 병사들을 부수고 먹었으며, 크래커는 계속 손뼉을 쳐서 새로운 병사들을 증식시켰다. 나미는 비스킷의 성질을 활용한 대응책을 제시했다.',
    supportedAbilities:['비스킷 다수 생성','장시간 군체 제어','수분에 대한 비스킷 상성 약점'],
    statContributions:[
      {stat:'techniqueMastery',role:'secondary',note:'병사를 대량·반복 생성한 능력 제어의 직접 증거다.'},
      {stat:'versatility',role:'primary',note:'상대가 물이라는 약점을 파악한 뒤에도 기본 생성·공세를 반복했으며 새로운 독립 상성 방어 수단을 보여주지 않은 제한을 기록한다.'},
      {stat:'combatIQ',role:'context',note:'나미의 개입과 루피의 먹기라는 다인/상성 조건이므로 패배 결과를 개인 IQ 점수에 자동 적용하지 않는다.'},
    ],
    interpretation:'단일 비스킷 능력의 정교함·지속성과 물 상성 대응의 좁은 폭을 구분한다. 루피/나미의 협력을 크래커의 독립 1대1 패배로 오인하지 않는다.',
    evaluationImpact:'Cracker Technique80 / Versatility77 유지. 기존 Ch.842 보조 출처이며 Haki Raw/Final 수치 중복 가산 금지.',
    uncertainty:'TV805 시놉시스만으로 본체가 전 시간 동일 강도 공격을 견뎠다는 주장은 불가하다.',
  },
]

export const v0179ReviewMatrix = [
  {characterId:'smoothie',stat:'attack',before:76,after:76,readiness:'E2',decision:'hold',reason:'TV868의 다회 거대 참격은 출력과 반복 사례이나 나미·징베의 조타 회피 때문에 상위 대인 피해는 직접 계측 불가. 맞추지 못한 것을 낮은 순수 화력의 증거로 취급하지 않는다.'},
  {characterId:'smoothie',stat:'techniqueMastery',before:80,after:80,readiness:'E2',decision:'hold',reason:'흡수·독 제거·대형화·방출 연결은 실제 운용 숙련을 뒷받침한다. 본체 근접 결투·장시간 다변화 기술 전환 반복은 부족하다.'},
  {characterId:'smoothie',stat:'versatility',before:78,after:78,readiness:'E2',decision:'hold',reason:'탈수/자기 정화/검강화/장거리 참격의 전투 목적 분리는 인정하나 모두 즙즙 열매 파생. 함대 지휘를 개인의 독립 체술로 중복 반영하지 않는다.'},
  {characterId:'cracker',stat:'attack',before:77,after:77,readiness:'E2',decision:'hold',reason:'TV799의 직접 대인 검격 및 기존 Ch.837–838 무장색 피해는 스무디와 다른 유효타 근거. 병사 숫자를 타격력 또는 Raw 패기에 재중복 가산하지 않는다.'},
  {characterId:'cracker',stat:'techniqueMastery',before:80,after:80,readiness:'E2',decision:'hold-evidence-expanded',reason:'비스킷 갑옷/본체 위장/검/병사 수십 체를 정교하게 생성. TV805 물 상성을 간파당한 뒤 생성 반복은 통제의 강점과 전환 한계를 동시에 보여준다.'},
  {characterId:'cracker',stat:'versatility',before:77,after:77,readiness:'E2',decision:'hold-evidence-expanded',reason:'방어·군체·근접 검·본체 은닉은 여러 역할이나 한 비스킷 체계. 나미의 비가 개입한 뒤 완전히 다른 독립 우회 수단은 확인되지 않는다.'},
  {characterId:'queen',stat:'attack',before:80,after:80,readiness:'E2',decision:'hold',reason:'고대종 구속·거대한 신체·제르마 재현 과학 무장은 실제 공격 수단이지만 수단 개수와 바이러스 확산 인원을 순수 대인 피해로 합산하지 않는다. 빅맘 상대 브라키오 폭탄이 실제 피해를 주지 못한 조건도 보존한다.'},
  {characterId:'queen',stat:'techniqueMastery',before:79,after:79,readiness:'E2',decision:'hold',reason:'TV1061 기술 재현의 성공과 무장 오발·오소메 관련 판단 실패를 구분한다. 만드는 과학 지식은 높아도 실전 사용 안정성이 최고 숙련이라는 직접 증거는 아니다.'},
  {characterId:'queen',stat:'versatility',before:80,after:82,readiness:'E2',decision:'calibrate+2',reason:'고대종 신체구속/근접, 제르마 모방·은신·원거리 과학, 자신이 개발해 실제 사용한 아이스 오니 전장 감염은 여러 독립 시스템과 역할이다. 스무디·크래커처럼 한 열매 파생만 묶어서는 실제 수단 폭이 저평가된다. 공격 위주·피아 무차별 감염·미숙한 운용은 상한이므로 82(E2) 잠정. +2는 기계 개수당 가산 공식이 아니다.'},
] as const

export function applyV0179CommanderAxisReview(evaluation:Evaluation):Evaluation{
  if(evaluation.isDefault===false)return evaluation
  const isQueen=evaluation.characterId==='queen'
  const isCracker=evaluation.characterId==='cracker'
  if(!isQueen&&!isCracker)return evaluation
  if(evaluation.evaluationDataVersion!=='evaluation-0.1.26-draft')
    throw Error('v0.1.79 source version mismatch for '+evaluation.characterId)
  const axis=isQueen?'versatility':'techniqueMastery'
  const prior=evaluation.items.find(i=>i.stat===axis)
  const baseline=isQueen?80:80
  if(!prior||getFinalStatScore(prior)!==baseline||
    prior.readiness!=='E2'||getRawHakiContributionTotal(prior)!==0)
    throw Error('v0.1.79 source stat mismatch: '+evaluation.characterId)
  const refs=isQueen
    ?v0179OfficialEvidence.filter(x=>x.subjectCharacterId==='queen').map(x=>x.id)
    :v0179OfficialEvidence.filter(x=>x.subjectCharacterId==='cracker').map(x=>x.id)
  const rationale=isQueen
    ?'퀸은 변형된 고대종 몸체의 직접 구속·육탄전, 사이보그 무장 및 제르마 계열의 전격·레이저·투명화 재현(공식 TV1061), 본인이 개발·실전 투입한 아이스 오니 역병탄의 광역 상태이상(공식 TV1005)을 실제 전장에서 사용했다. 하나의 열매의 세부 동작이 아니라 생물학적 변형, 과학무장·특수기술, 병기·감염의 다른 작동 체계와 역할을 전환했다는 차이가 크다. 단 바이러스 확산은 부하도 감염시키며, 기술 복제는 순수 숙련을 뜻하지 않고, 개인 정면 공격에서의 결정력은 Attack 별개다. 스무디78/크래커77/도플라밍고83과 동축으로 비교하면 기존 Versatility80은 독립 체계 폭에 비해 보수적이었다. Final82(E2)로 소폭 재평가하되 기술 수에 따른 자동 +2 공식은 아니며, 장비·탄약 제한과 실전 대응 실패로 상위 범용성 상한은 유지한다.'
    :'크래커는 실제 본체의 무장색 검술, 고강도 비스킷 갑옷, 무수한 비스킷 병사의 반복 생성·원격 지휘와 본체 은닉을 정교하게 조합했다(기존 Ch.837–842와 공식 TV799/805 보조자료). 나미가 비를 내려 병사의 강도를 낮추자 여전히 병사를 생산하는 방식으로 압박했다. 다수 역할은 같은 비스킷 시스템의 파생이며 새로운 무속성 독립 능력을 뜻하지 않는다. Technique80(E2) 유지; 능력 제어의 숙련과 상성 변화에 대한 실전 전술 선택은 구분한다.'
  const items=evaluation.items.map((i):EvaluationItem=>{
    if(i.stat!==axis)return i
    const next={...i,baseScore:isQueen?82:i.baseScore,rationale,
      evidenceIds:[...new Set([...i.evidenceIds,...refs])]}
    return {...next,score:getFinalStatScore(next)}
  })
  if(isQueen){
    const next=items.find(i=>i.stat==='versatility')!
    if(getFinalStatScore(next)!==82)throw Error('v0.1.79 Queen computed Final mismatch')
  }
  return {...evaluation,evaluationDataVersion:isQueen
    ?'evaluation-0.1.79-queen-multi-system-versatility-calibrated'
    :'evaluation-0.1.79-cracker-mastery-official-evidence-expanded',items}
}
