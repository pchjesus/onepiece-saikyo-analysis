import type { Battle } from '../../domain/battle/types'
import type { Evidence } from '../../domain/evidence/types'
import type { Evaluation, EvaluationItem, CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'

const axes: CombatStat[] = ['attack', 'defense', 'stamina', 'speed', 'techniqueMastery', 'combatIQ', 'versatility']
type Decision = { characterId: 'koby' | 'smoker'; fromVersion: string; from: number[]; to: number[]; readiness: EvidenceReadiness[]; rationale: string[] }
export const v049Decisions: Decision[] = [
  {
    characterId:'koby', fromVersion:'evaluation-0.1.78-koby-hachinosu-risk-context-evidence-only',
    from:[77,73,77,78,77,72,67], to:[77,68,71,74,72,68,67],
    readiness:['E2','E3','E3','E2','E2','E2','E3'],
    rationale:[
      '실직권골로 피사로의 섬 거대 팔을 파괴한 단발 출력은 코비의 직접 성과. 가프의 선행 타격과 헤르메포·그루스의 지원은 별도로 분리하고, 강자 대상 반복 대인 결정타는 확인되지 않아 Attack77 유지.',
      '시류가 구조 상황을 이용해 기습했을 때 가프가 대신 피격되어 코비 자신의 방어 성공이나 독립 방어 실패를 확정할 수 없다. 강자 상대 직접 차단·회피·피해 경감 기록 부족을 반영하되 미관찰을 약점 확정으로 읽지 않는 Defense68(E3) 잠정.',
      '하치노스 탈출 및 실제 피구금자 구조 활동은 확인되지만 고강도 장기전 또는 큰 피해 후 반복 공방 지속 표본은 부족하다. 가프의 훈련량을 장기전 체력으로 환산하지 않는 Stamina71(E3) 잠정.',
      '육식 체 이외에 공식 TV879에서 견문색으로 어뢰 위협을 탐지하고 급히 이동해 선박 공격을 저지한 실전 기동 성과가 있다. 조기 탐지와 순수 육체 속도를 구분하고 강자 상대 연속 고속 공방 부족을 반영해 Speed74(E2) 잠정.',
      '육식 체·해군 체술·실직권골은 실제 기술 성과이나 거대 구조물 일격 파괴를 다양한 고급 기술의 반복 정밀 운용으로 중복 합산하지 않는다. Technique72(E2) 잠정.',
      'TV1113의 실제 포로 해방과 유인 도주는 긍정적인 판단. TV1121 철수 중 구조 신호 기만을 충분히 검증하지 못한 위험 식별 실패는 기존 IQ 하향에 이미 반영되어 재감점하지 않는다. 별도 상급 교전 판단 표본 부족을 고려해 Combat IQ68(E2) 잠정.',
      '실직권골 단발 공격력을 다양한 독립 전투 체계로 오인하지 않는다. 체술·근접 타격·구조 외 폭넓은 상성별 전환 수단은 확인되지 않아 Versatility67(E3) 유지.',
    ],
  },
  {
    characterId:'smoker', fromVersion:'evaluation-0.1.80-four-character-two-organization-draft',
    from:[74,73,78,76,78,76,80], to:[70,72,75,75,75,76,77],
    readiness:['E2','E2','E2','E2','E2','E2','E2'],
    rationale:[
      '화이트 블로우·십수·연기 구속 등 제압 수단은 인정하지만 강적 대상 반복 결정타/대인 실효 화력이 확인되지 않는다. 해루석 끝봉의 특수 효과를 직접 화력으로 중복 가산하지 않아 Attack70.',
      '자연계 회피 능력은 존재하지만 로우의 심장 탈취와 베르고의 패기 공격, 도플라밍고의 공격에 대한 방어 한계가 확인된다. 능력 상성·후속 외부 구조를 일반 방어와 구분해 Defense72.',
      '베르고전과 이어진 복수 사건에 참여한 전투 지속 행동은 인정한다. 큰 피해를 받았다는 사실을 Defense와 Stamina에 동시 감점하지 않되 강자 상대 장기 고강도 전투 근거는 부족해 Stamina75.',
      '연기화·비행 이동은 확인되나 순수 최고속 및 강자 상대 반응 우위는 미입증. 로우의 공간 제압만을 순수 Speed로 환산하지 않아 Speed75.',
      '화이트 블로우·연기 구속·비행·십수 봉술의 실전 구사는 인정하지만 같은 연기 체계 파생기들을 각기 독립 최고급 기술로 중복 가산하지 않고 Technique75.',
      '베르고전에서 로우의 심장 회수 지원이라는 분명한 전술 목표에 맞춰 행동했다. 다른 강자에게 패배한 결과를 IQ 전체의 직접적인 실패 증거로 확대하지 않고 Combat IQ76 유지.',
      '연기 확산·이동·구속·십수 사용은 다양한 전투 목적에 기여한다. 그러나 한 자연계 능력의 파생과 강자 상대 실제 효과가 제한적임을 고려해 Versatility77.',
    ],
  },
]

export const v049KobyTorpedoBattle: Battle = {
  id:'battle-v049-koby-torpedo-tv879', title:'세계회의 호위 — 코비의 어뢰 탐지 및 요격', chronologyOrder:475,
  combatStructure:'multiple-vs-multiple', combatPurpose:'세계회의 왕족 선박 어뢰 공격 저지',
  combatIntent:'unknown', environment:'왕족 선박 인근 바다', restrictions:'견문색 조기 탐지·수중 이동과 강자 상대 순수 Speed를 구분',
  externalFactors:'헤르메포는 해적 잠수정을 별도로 격파', result:'interrupted', participantIds:[],
}
export const v049KobyTorpedoEvidence: Evidence = {
  id:'evidence-v049-koby-torpedo-tv879', battleId:v049KobyTorpedoBattle.id,
  subjectCharacterId:'koby', source:{type:'supplementary',reference:'ONE PIECE.com TV879 (2019-04-07); corresponding manga Ch.903 not independently reread',description:'https://one-piece.com/anime/o5003/index.html'},
  evidenceStrength:'moderate',
  fact:'코비가 견문색으로 왕족 선박에 접근하던 어뢰를 탐지하고 급히 이동해 공격을 저지했다. 헤르메포는 해적 잠수정을 격파했다.',
  supportedAbilities:['견문색 탐지','어뢰 요격','수중 대응'],
  statContributions:[{stat:'speed',role:'primary',note:'실제 위협 탐지 후 기동과 어뢰 요격. 조기 탐지와 순수 신체 속도를 분리.'},{stat:'combatIQ',role:'context',note:'위협 인지·임무 수행을 인정하되 동일 대응을 IQ에 이중 점수화하지 않음.'}],
  interpretation:'육식 체 이외의 실전 기동 성과는 인정하되 어뢰의 절대 속도와 순수 반응 속도는 불명.',
  evaluationImpact:'v0.4.9 코비 Speed74(E2) 검토 근거; 새로운 패기 Raw 0.',
  uncertainty:'공식 애니 요약에 근거함. 원작 903화 전체 컷, 어뢰 속도, 이동 거리와 시간을 독립 확인하지 못함.',
}
export function applyV049KobySmokerRecalibration(evaluation: Evaluation): Evaluation {
  if(evaluation.isDefault===false)return evaluation
  const d=v049Decisions.find(x=>x.characterId===evaluation.characterId)
  if(!d)return evaluation
  if(evaluation.evaluationDataVersion!==d.fromVersion)throw Error('v0.4.9 evaluation version mismatch '+evaluation.characterId)
  for(let n=0;n<axes.length;n++){
    const previous=evaluation.items.find(i=>i.stat===axes[n])
    if(!previous||getFinalStatScore(previous)!==d.from[n]||getRawHakiContributionTotal(previous)!==0)
      throw Error('v0.4.9 source stat/Raw mismatch '+evaluation.characterId+'/'+axes[n])
  }
  const items=evaluation.items.map((old):EvaluationItem=>{
    const index=axes.indexOf(old.stat)
    const next:EvaluationItem={...old,baseScore:d.to[index],readiness:d.readiness[index],rationale:d.rationale[index],
      evidenceIds:d.characterId==='koby'&&old.stat==='speed'
        ? [...new Set([...old.evidenceIds,v049KobyTorpedoEvidence.id])]:old.evidenceIds}
    return {...next,score:getFinalStatScore(next)}
  })
  return {...evaluation,evaluationDataVersion:'evaluation-0.4.9-koby-smoker-approved-axis-recalibration',items}
}
