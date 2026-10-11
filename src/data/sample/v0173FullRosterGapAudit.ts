/**
 * v0.1.73 full-roster READ-ONLY gap audit.
 *
 * Every current default Character Evaluation (65 x 7 Final axes) is examined
 * through the production source-of-truth. This does not grant fictional
 * integer power ratings any official/canon status and NEVER changes scores.
 */
import { legacyEvaluations as sampleEvaluations, legacyCharacters as sampleCharacters } from './v0180LegacyCohort'
import { calibrationAnchorsV0172, calibrationAxisOrder } from './v0172AnchorBaseline'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import type { CombatStat, EvidenceReadiness } from '../../domain/evaluation/types'

export type GapReviewKind = 'evidence-deficit'|'direct-fight-context'|'mechanism-overlap'|'tier-spacing'|'era-and-state'
export type GapPriority = 'high'|'medium'|'low'
export type FullRosterGapRow = {
  characterId:string; name:string; overall:number;
  stats:Readonly<Record<CombatStat,number>>;
  readiness:Readonly<Record<CombatStat,EvidenceReadiness>>;
  e1Count:number;e2Count:number;e3Count:number;
  totalEffectiveHaki:number;
  closestOverallAnchorId:string;closestOverallAnchorDistance:number;
  evaluationVersion:string;
}
export type NeighborGap = {
  first:string;second:string;
  overallGap:number;maxAxisGap:number;maxAxis:CombatStat;
}
export type GapReviewCase = {
  first:string; second:string; axes:readonly CombatStat[];
  priority:GapPriority;kind:GapReviewKind;
  reason:string; contextCaution:string;
  sourceRefs:readonly string[];
  recommendation:'source-audit-first'|'check-scale-and-overlap'|'keep-observing';
}

/** These are *audit questions* and explicitly not approved numeric patches. */
export const v0173ManualCases:readonly GapReviewCase[] = [
  {first:'roger',second:'newgate',axes:['attack','stamina','versatility'],priority:'medium',kind:'era-and-state',
   reason:'전성기 두 인물 97.571 동점. 공격·3일 충돌을 1인 72시간 무휴식 단독 결투로 중복 가산했는지 검토',
   contextCaution:'로저 해적단과 흰수염 해적단의 전투, 각 인물의 개인 공방을 분리',sourceRefs:['evaluation-roger','evaluation-newgate-prime'],recommendation:'keep-observing'},
  {first:'garp',second:'law',axes:['versatility','combatIQ','speed'],priority:'high',kind:'evidence-deficit',
   reason:'전성기 거프와 로의 Versatility91 동점; 기술의 독립 적용 폭과 전성기 추론(E3 4축)의 정확성 검증',
   contextCaution:'하치노스 노년 거프 성과를 전성기 모든 축에 그대로 이전하지 말 것',sourceRefs:['evaluation-garp','evaluation-garp-current','evaluation-law'],recommendation:'source-audit-first'},
  {first:'rocks',second:'roger',axes:['attack','techniqueMastery','combatIQ'],priority:'medium',kind:'era-and-state',
   reason:'록스97.286과 로저97.571의 매우 좁은 간극. God Valley의 합동 결정타를 1대1 서열로 역산하지 않는지 확인',
   contextCaution:'혼전·서로 다른 시점과 참여자, 공개된 장면의 범위가 다름',sourceRefs:['evaluation-rocks','evaluation-roger'],recommendation:'source-audit-first'},
  {first:'linlin',second:'kaido',axes:['speed','combatIQ','stamina'],priority:'medium',kind:'tier-spacing',
   reason:'사황 빅맘94.286과 카이도96.714의 2.429 간격이 낮은 Speed89·CombatIQ84에서 기인하는 정도 검토',
   contextCaution:'빅맘의 기억·판단 상태, 추락과 협동 격파, 카이도의 연속전 피로 누적 분리',sourceRefs:['evaluation-linlin','evaluation-kaido'],recommendation:'check-scale-and-overlap'},
  {first:'rayleigh',second:'gaban',axes:['attack','stamina','speed','techniqueMastery','combatIQ'],priority:'high',kind:'era-and-state',
   reason:'전성기 레일리92.857과 **노년 현재 가반92.143**를 한 오버롤 순위에 나란히 둔 시점 불일치. 노년 레일리90.286보다 노년 가반92.143이 높은 비교도 별도로 원작 자료 확인',
   contextCaution:'로저 해적단 직책과 활동 시대를 수치로 환산하지 말고 각자 전성기/노년 현재 상태로 비교',sourceRefs:['evaluation-rayleigh-prime','evaluation-rayleigh-current','evaluation-gaban-current'],recommendation:'source-audit-first'},
  {first:'akainu',second:'kuzan',axes:['attack','stamina','speed','combatIQ'],priority:'high',kind:'direct-fight-context',
   reason:'10일 결투에서 아카이누 승리지만 쿠잔 Overall +0.286; Speed 86 E3 vs 90 E2·IQ91 E3 검증',
   contextCaution:'결투 승리와 7축 단순 평균이 같지 않으며 승리원인 단일 스탯 추정 금지',sourceRefs:['evaluation-akainu','evaluation-kuzan'],recommendation:'source-audit-first'},
  {first:'mihawk',second:'shanks',axes:['techniqueMastery','attack','speed'],priority:'high',kind:'evidence-deficit',
   reason:'미호크92.714·샹크스92.571 접전이나 미호크 Technique99(E1) vs 샹크스96(E2); 개인 기술 비교와 서열 단정 분리',
   contextCaution:'과거 검술 경쟁·현 샹크스 패왕색 운용을 각각 같은 종류의 자료로 오해 금지',sourceRefs:['evaluation-mihawk','evaluation-shanks'],recommendation:'source-audit-first'},
  {first:'teach',second:'shanks',axes:['attack','speed','versatility'],priority:'medium',kind:'mechanism-overlap',
   reason:'티치90.571과 샹크스92.571; 티치 Attack95/Versatility93 대비 Speed82, 두 열매 상성의 효과를 중복 합산했는지 검토',
   contextCaution:'상성 이점은 상대마다 달라 직접 Matchup 우위에 자동 환산 금지',sourceRefs:['evaluation-teach','evaluation-shanks'],recommendation:'check-scale-and-overlap'},
  {first:'fujitora',second:'ryokugyu',axes:['defense','stamina','speed','combatIQ'],priority:'high',kind:'evidence-deficit',
   reason:'현 Overall 89.000 vs 87.571; 로쿠규 E3 4축에 비해 격차를 확정할 공통 조건 교전 근거가 부족',
   contextCaution:'샹크스 패기 개입으로 퇴각한 맥락을 일대일 기량의 자동 감점으로 만들지 말 것',sourceRefs:['evaluation-fujitora','evaluation-ryokugyu'],recommendation:'source-audit-first'},
  {first:'law',second:'kid',axes:['attack','techniqueMastery','combatIQ','versatility'],priority:'high',kind:'direct-fight-context',
   reason:'빅맘 협동전 두 참가자 Overall86.429 vs84.571, 키드 Attack92>로86이나 IQ73<로88; 개인 타격 기여·협동·낙하를 분리',
   contextCaution:'ROOM 내부 타격과 Damned Punk·폭발을 둘 모두의 단독 KO로 귀속 금지',sourceRefs:['evaluation-law','evaluation-wano-kid'],recommendation:'check-scale-and-overlap'},
  {first:'zoro',second:'king',axes:['attack','defense','stamina','speed'],priority:'high',kind:'direct-fight-context',
   reason:'조로84.714 vs 킹82.571. 킹 방어88·속도83의 ON/OFF 상태와 조로의 패휘감 피니시 조건 검증',
   contextCaution:'조로의 엔마·패기 상태와 킹의 순간 모드에 따른 피격 조건 분리',sourceRefs:['evaluation-zoro','evaluation-king'],recommendation:'source-audit-first'},
  {first:'sanji',second:'queen',axes:['speed','defense','attack','combatIQ'],priority:'high',kind:'direct-fight-context',
   reason:'상디84.429 vs 퀸78.571, Speed91 vs75 격차 16; 실전 고속 회피·사이보그 신체 반응을 직접 확인',
   contextCaution:'퀸의 교전 중 다른 목표와 상디 혈통인자 각성 전후를 구분',sourceRefs:['evaluation-sanji','evaluation-queen'],recommendation:'source-audit-first'},
  {first:'katakuri',second:'king',axes:['defense','speed','techniqueMastery','combatIQ'],priority:'medium',kind:'mechanism-overlap',
   reason:'카타쿠리84.000과 킹82.571, 예측 회피 vs 루나리아 방어/속도 상태 전환을 같은 Defense 성과로 단정하지 말 것',
   contextCaution:'미래예지가 제공한 선행 정보와 실제 물리 이동, Flame OFF 피격 순간을 구분',sourceRefs:['evaluation-katakuri','evaluation-king'],recommendation:'check-scale-and-overlap'},
  {first:'marco',second:'king',axes:['attack','defense','stamina'],priority:'high',kind:'direct-fight-context',
   reason:'마르코83.429 vs 킹82.571이지만 Attack77 vs83; 마르코의 견제·밀어냄과 실제 피해/재생 소모를 분리',
   contextCaution:'킹·퀸 혼전 및 아군 보호·피로 한계 때문에 단독 1대1 우위로 단정 불가',sourceRefs:['evaluation-marco','evaluation-king'],recommendation:'source-audit-first'},
  {first:'marco',second:'whos-who',axes:['attack'],priority:'high',kind:'tier-spacing',
   reason:'마르코 Attack77 vs 후즈 후79의 +2 반전. 강자 압박 능력을 낮게 평가했는지 대인 피해 성과 동축 대조',
   contextCaution:'마르코의 견제·연속 공격·실제 부상과 후즈 후의 징베 상대 공격을 같은 기준으로 측정',sourceRefs:['evaluation-marco','evaluation-wano-whos-who'],recommendation:'source-audit-first'},
  {first:'doflamingo',second:'queen',axes:['techniqueMastery','versatility','attack','defense'],priority:'high',kind:'tier-spacing',
   reason:'도플라밍고 Overall79.571>퀸78.571; Technique87 vs79, Versatility83 vs80이 Gear4에 압도된 공방 맥락을 충분히 상쇄하는지 검증',
   contextCaution:'드레스로자에서 로의 Gamma Knife 누적 피해, 새장·각성·목표 분리와 퀸의 상디 상대 성과를 동조건으로 단정 금지',sourceRefs:['evaluation-doflamingo','evaluation-queen'],recommendation:'source-audit-first'},
  {first:'doflamingo',second:'cracker',axes:['techniqueMastery','versatility','defense'],priority:'high',kind:'tier-spacing',
   reason:'도플라밍고79.571>크래커77.857, Defense74 vs81·Technique87 vs80; G4 상대 각성 운용과 비스킷 병사 운영 비교',
   contextCaution:'기어4 루피 vs 드레스로자와 홀케이크 루피는 시점·지원·상황 다름; 승패만으로 절대 서열 결론 금지',sourceRefs:['evaluation-doflamingo','evaluation-cracker'],recommendation:'source-audit-first'},
  {first:'vista',second:'jozu',axes:['attack','defense','techniqueMastery','versatility'],priority:'medium',kind:'mechanism-overlap',
   reason:'비스타79.429 vs 죠즈77.429; 전문 검술87 vs 다이아 방어84, 단일 기술 특화의 Versatility74 대칭은 검증 가능',
   contextCaution:'미호크와 짧은 검술 공방 vs 미호크 참격 차단은 서로 다른 공격 유형·목표를 가진 사건',sourceRefs:['evaluation-vista','evaluation-jozu'],recommendation:'check-scale-and-overlap'},
  {first:'jinbe',second:'whos-who',axes:['attack','defense','techniqueMastery','combatIQ'],priority:'high',kind:'direct-fight-context',
   reason:'징베 Overall79.286 vs 후즈 후77.143, Attack76<79지만 Defense80>75·Technique83>80. 직접 결투와 다수 지원을 고려하여 확인',
   contextCaution:'초기 은폐 병력의 기습·이후 직접 결전 및 징베가 실제 받아낸 기술 분리',sourceRefs:['evaluation-jinbe','evaluation-wano-whos-who'],recommendation:'source-audit-first'},
  {first:'jack',second:'cracker',axes:['attack','defense','stamina','techniqueMastery','versatility'],priority:'medium',kind:'tier-spacing',
   reason:'잭78.143 vs 크래커77.857으로 0.286 차이이나 Stamina88 vs80, Technique75 vs80; 단일 능력 평균이 서로 다른 유형을 은폐하는지 평가',
   contextCaution:'조우의 밤낮 교대전과 루피+나미의 비스킷 장기전은 체력·상대·환경이 다른 사건',sourceRefs:['evaluation-jack','evaluation-cracker'],recommendation:'check-scale-and-overlap'},
  {first:'smoothie',second:'cracker',axes:['attack','defense','stamina','speed'],priority:'high',kind:'evidence-deficit',
   reason:'스무디76.571 vs 크래커77.857, 스무디 Defense/Stamina/Speed가 E3여서 순위를 정밀 고정하면 위험',
   contextCaution:'스무디의 해상 함대/광역 참격 묘사와 크래커의 장기 단독 교전 정보량 차이',sourceRefs:['evaluation-smoothie','evaluation-cracker'],recommendation:'source-audit-first'},
  {first:'ace',second:'cracker',axes:['attack','stamina','combatIQ','techniqueMastery','versatility'],priority:'medium',kind:'tier-spacing',
   reason:'에이스76.857 vs 크래커77.857, Stamina82 vs80이나 CombatIQ67 vs75; 직접 5일 결투·퇴각 판단으로 보정한 기존 v0.1.71 기준 재검증',
   contextCaution:'불꽃 자연계·비스킷 제작의 역할 폭을 결정력과 동일시하지 말 것',sourceRefs:['evaluation-v0170-ace','evaluation-cracker'],recommendation:'check-scale-and-overlap'},
  {first:'shiryu',second:'lucci',axes:['speed','attack','combatIQ'],priority:'high',kind:'evidence-deficit',
   reason:'시류77.143 vs 루치78.000; 둘의 직접 정면 고강도 개인전 실적 차이로 인한 낮은 시류 스탯 잠정성 확인',
   contextCaution:'시류의 투명 기습과 루치의 정면 교전은 목적·준비·상대 상태가 다르다',sourceRefs:['evaluation-shiryu','evaluation-lucci'],recommendation:'source-audit-first'},
  {first:'x-drake',second:'whos-who',axes:['speed','defense','stamina'],priority:'medium',kind:'tier-spacing',
   reason:'X드레이크77.286 vs 후즈후77.143. 같은 토비롯포 집단 출신이나 SWORD 임무/시점에 따른 정보 차이 확인',
   contextCaution:'계급·조직 소속과 일대일 서열을 자동 동일시하지 않음',sourceRefs:['evaluation-wano-x-drake','evaluation-wano-whos-who'],recommendation:'check-scale-and-overlap'},
  {first:'inuarashi',second:'jack',axes:['attack','speed','stamina'],priority:'high',kind:'direct-fight-context',
   reason:'이누아라시79.143>잭78.143, 잭 Stamina88>83인데도 결과 방향이 가능한지 스론/날씨·이전 피해 검증',
   contextCaution:'조우의 교대전과 와노의 스론 변신·잭 누적 피로를 동조건 1대1로 혼동하지 말 것',sourceRefs:['evaluation-wano-inuarashi','evaluation-jack'],recommendation:'source-audit-first'},
  {first:'nekomamushi',second:'jack',axes:['attack','stamina','speed'],priority:'medium',kind:'direct-fight-context',
   reason:'네코마무시78.571>잭78.143. 이누아라시/네코마무시 조우 5일 교대전과 와노 전장별 성과를 함께 검토',
   contextCaution:'조우에서 낮밤 교대 및 독가스 외부 개입을 잭과 네코 모두의 개별 능력으로 환산하지 말 것',sourceRefs:['evaluation-wano-nekomamushi','evaluation-jack'],recommendation:'source-audit-first'},
  {first:'ulti',second:'page-one',axes:['stamina','speed','combatIQ'],priority:'medium',kind:'direct-fight-context',
   reason:'울티75.143 vs 페이지원70.143 차이 5점. 울티 Stamina84 vs 페이지원79과 속도80 vs69의 직접 근거·표본차 점검',
   contextCaution:'빅맘·루피·나미 등 여러 참여자와 피격·부상 상태를 남매 각자에게 구분',sourceRefs:['evaluation-wano-ulti','evaluation-wano-page-one'],recommendation:'source-audit-first'},
  {first:'pica',second:'koby',axes:['attack','speed','versatility'],priority:'medium',kind:'tier-spacing',
   reason:'피카74.143 vs 코비75.714, 능력 기반 지형 통제82와 코비 단발 거대 팔 파괴 Attack82의 대인 위력 환산 문제',
   contextCaution:'피카 능력의 지형 규모와 코비가 파괴한 물체의 크기를 1대1 공격력으로 기계 변환 금지',sourceRefs:['evaluation-v0170-pica','evaluation-v0170-koby'],recommendation:'check-scale-and-overlap'},
  {first:'morley',second:'karasu',axes:['versatility','attack','speed'],priority:'high',kind:'evidence-deficit',
   reason:'몰리79.286 vs 카라스77.857, 둘 다 E3 4축. 동일 혁명군 임무 역할 차이와 부족한 1대1 표본 구분',
   contextCaution:'마리조아 협동 작전과 해군 상대 제한 교전을 개인의 정면 격파 성과로 독립 가산 금지',sourceRefs:['evaluation-morley','evaluation-karasu'],recommendation:'source-audit-first'},
  {first:'pizarro',second:'pica',axes:['attack','speed','versatility'],priority:'medium',kind:'mechanism-overlap',
   reason:'피사로71.714 vs 피카74.143. 섬/석재 융합·지형 조작을 비슷한 범용성으로 평가할 때 독립 피해와 특수 조건 구분',
   contextCaution:'섬 거대 팔에 대한 코비·가프의 연계 개입과 피카의 드레스로자 조로전은 조건 다름',sourceRefs:['evaluation-pizarro','evaluation-v0170-pica'],recommendation:'check-scale-and-overlap'},
  {first:'stussy',second:'kaku',axes:['combatIQ','techniqueMastery','speed'],priority:'medium',kind:'direct-fight-context',
   reason:'스튜시77.571>카쿠74.286, 기습·수면 제압의 큰 IQ/기술 점수가 정면 1대1 승률로 과대해석되는지 검토',
   contextCaution:'CP0 동료에 대한 기습·수면 상태/전술 준비와 정면 격투 지속전은 다름',sourceRefs:['evaluation-stussy','evaluation-kaku'],recommendation:'check-scale-and-overlap'},
  {first:'burgess',second:'van-augur',axes:['attack','versatility','stamina'],priority:'medium',kind:'evidence-deficit',
   reason:'바제스74.143(5 E3)와 반 오거74.571의 근접: 힘힘 열매와 워프워프/저격의 7축 정보량·역할 비교',
   contextCaution:'워프 지원·순간 이동을 개인 Speed 또는 사격 탄속으로 모두 합산 금지',sourceRefs:['evaluation-burgess','evaluation-van-augur'],recommendation:'source-audit-first'},

  {first:'crocodile',second:'lucci',axes:['combatIQ','techniqueMastery','defense'],priority:'high',kind:'mechanism-overlap',
   reason:'크로커다일79.000·루치78.000으로 1점 차이이나 Combat IQ86 vs68로 18점 간극. 작전 지휘·계획을 전투 중 판단과 혼동하거나 루치 성향에 과도한 벌점을 줬는지 검증',
   contextCaution:'알라바스타 시점/크로스길드 현재 배경을 동일 인물 최신 정면전 1개로 섞지 말 것',sourceRefs:['evaluation-crocodile','evaluation-lucci'],recommendation:'source-audit-first'},
  {first:'stussy',second:'lucci',axes:['combatIQ','techniqueMastery'],priority:'high',kind:'direct-fight-context',
   reason:'스튜시 IQ85 vs 루치 IQ68(17점 차이); 스튜시의 기습·정보 우위 성과와 루치의 반응 실패를 일반적 동조건 전술 지능으로 확대했는지 검증',
   contextCaution:'잠입과 기습/수면 제압은 두 사람이 준비된 정면전의 전술 판단력을 직접 비교하지 못함',sourceRefs:['evaluation-stussy','evaluation-lucci'],recommendation:'source-audit-first'},
  {first:'koby',second:'marco',axes:['attack','stamina','techniqueMastery'],priority:'high',kind:'evidence-deficit',
   reason:'코비 Attack82 vs 마르코77(+5); 실직권골 대형 지형 파괴 한 번과 마르코의 반복 강자전 대인 피해량을 분리해 같은 공격력 척도로 다시 대조',
   contextCaution:'코비의 거대 팔 격파는 가프 선행 타격·다른 인원의 군함 구출 지원 뒤의 복합 상황',sourceRefs:['evaluation-v0170-koby','evaluation-marco'],recommendation:'source-audit-first'},
  {first:'koby',second:'prince-grus',axes:['attack','versatility','speed'],priority:'medium',kind:'mechanism-overlap',
   reason:'코비 Overall75.714 vs 그루스76.857인데 Attack82 vs72, Versatility67 vs85(18점 차이). 전투 역할 분화가 큰 것은 가능하지만 그루스 85의 근거 밀도를 검토',
   contextCaution:'코비의 실직권골과 그루스의 낙석 보호는 같은 하치노스 구조 임무의 다른 역할',sourceRefs:['evaluation-v0170-koby','evaluation-v0170-prince-grus'],recommendation:'check-scale-and-overlap'},
  {first:'crocodile',second:'queen',axes:['attack','defense','techniqueMastery','combatIQ'],priority:'medium',kind:'era-and-state',
   reason:'크로커다일79.000이 퀸78.571을 근소하게 앞섬. 오래된 대인전 시점과 현재 크로스길드 위상을 현재의 실제 전투 성과와 분리해 86 기술·86 IQ 확인',
   contextCaution:'알라바스타 루피와 와노 상디는 전혀 다른 상태/시점이고 크로커다일 현재 전투 상한은 불확실',sourceRefs:['evaluation-crocodile','evaluation-queen'],recommendation:'source-audit-first'},
  {first:'hancock',second:'doflamingo',axes:['attack','defense','versatility'],priority:'medium',kind:'evidence-deficit',
   reason:'핸콕78.714과 도플라밍고79.571은 0.857점 차이; 매료/석화 상성과 실 절단·각성 운용의 대인 실효 범위는 상대 조건 의존',
   contextCaution:'핸콕의 석화는 매료 조건/상대 능력 대응과 연결되어 보편적 일대일 승률로 자동 전환 불가',sourceRefs:['evaluation-hancock','evaluation-doflamingo'],recommendation:'check-scale-and-overlap'},
] as const

export function buildV0173FullRosterGapAudit(){
  const anchors=calibrationAnchorsV0172.filter(a=>a.decision==='locked-overall').map(a=>({id:a.characterId,overall:a.finalScores.reduce((sum,n)=>sum+n,0)/7}))
  const defaultEvals=sampleEvaluations.filter(e=>e.isDefault!==false)
  const characters=new Map(sampleCharacters.map(c=>[c.id,c.name]))
  const rows:FullRosterGapRow[]=defaultEvals.map(ev=>{
    const stats={} as Record<CombatStat,number>
    const readiness={} as Record<CombatStat,EvidenceReadiness>
    for(const axis of calibrationAxisOrder){
      const item=ev.items.find(i=>i.stat===axis)
      if(!item) throw new Error(ev.characterId+': missing '+axis)
      stats[axis]=getFinalStatScore(item)
      if(!item.readiness)throw new Error(ev.characterId+': missing '+axis+' readiness')
      readiness[axis]=item.readiness
    }
    const overall=calibrationAxisOrder.reduce((sum,k)=>sum+stats[k],0)/7
    const closest=[...anchors].sort((a,b)=>Math.abs(a.overall-overall)-Math.abs(b.overall-overall))[0]
    return {
      characterId:ev.characterId,name:characters.get(ev.characterId)??ev.characterId,
      overall,stats,readiness,
      e1Count:Object.values(readiness).filter(v=>v==='E1').length,
      e2Count:Object.values(readiness).filter(v=>v==='E2').length,
      e3Count:Object.values(readiness).filter(v=>v==='E3').length,
      totalEffectiveHaki:ev.items.reduce((s,item)=>s+getRawHakiContributionTotal(item)*0.5,0),
      closestOverallAnchorId:closest.id,closestOverallAnchorDistance:Math.abs(closest.overall-overall),
      evaluationVersion:ev.evaluationDataVersion,
    }
  }).sort((a,b)=>b.overall-a.overall||a.characterId.localeCompare(b.characterId))
  const perAxis=calibrationAxisOrder.map(axis=>{
    const sorted=[...rows].sort((a,b)=>b.stats[axis]-a.stats[axis])
    return {axis,min:sorted[sorted.length-1].stats[axis],max:sorted[0].stats[axis],
      minCharacterIds:sorted.filter(r=>r.stats[axis]===sorted[sorted.length-1].stats[axis]).map(r=>r.characterId),
      maxCharacterIds:sorted.filter(r=>r.stats[axis]===sorted[0].stats[axis]).map(r=>r.characterId),
      e1:rows.filter(r=>r.readiness[axis]==='E1').length,
      e2:rows.filter(r=>r.readiness[axis]==='E2').length,
      e3:rows.filter(r=>r.readiness[axis]==='E3').length}
  })
  const nearOverallWideAxis:NeighborGap[]=[]
  for(let i=0;i<rows.length;i++)for(let j=i+1;j<rows.length;j++){
    const a=rows[i],b=rows[j]
    const overallGap=a.overall-b.overall
    if(overallGap>1.5) break
    const deltas=calibrationAxisOrder.map(stat=>({stat,gap:Math.abs(a.stats[stat]-b.stats[stat])})).sort((x,y)=>y.gap-x.gap)
    if(deltas[0].gap>=10) nearOverallWideAxis.push({
      first:a.characterId,second:b.characterId,
      overallGap,maxAxisGap:deltas[0].gap,maxAxis:deltas[0].stat
    })
  }
  return {rows,perAxis,nearOverallWideAxis,
    evidenceReadinessTotals:{
      E1:rows.reduce((s,r)=>s+r.e1Count,0),E2:rows.reduce((s,r)=>s+r.e2Count,0),E3:rows.reduce((s,r)=>s+r.e3Count,0)},
    manualCases:v0173ManualCases}
}

export const v0173FullRosterGapAudit=buildV0173FullRosterGapAudit()
