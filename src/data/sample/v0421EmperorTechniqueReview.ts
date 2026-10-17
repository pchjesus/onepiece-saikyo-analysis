/**
 * v0.4.21 — user-proposed emperor Technique/Mastery calibration.
 *
 * Changes only the CURRENT Kaido and Linlin Technique axis.
 * Historical sampleEvaluations, Haki Raw, baseline v0.3.3 and other axes
 * remain immutable. Official TV synopses are supplementary corroboration,
 * not independently examined original manga panels.
 */
import type { Evaluation } from '../../domain/evaluation/types'
import type { Evidence } from '../../domain/evidence/types'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'

export const v0421EmperorTechniqueEvidence: Evidence[] = [
  {
    id:'evidence-v0421-kaido-island-flame-cloud-tv1052',
    battleId:'onigashima-kaido-rooftop-1009-1049',
    subjectCharacterId:'kaido',
    source: {
      type:'supplementary', reference:'ONE PIECE.com TV1052',
      description:'https://one-piece.com/anime/o6401/index.html',
    },
    evidenceStrength:'moderate',
    fact:'루피와 교전하던 카이도의 힘이 약해지자 오니가시마를 지탱한 불꽃 구름도 약해지기 시작했다. 이는 카이도가 루피와 싸우는 동안 불꽃 구름으로 섬을 띄워 유지했다는 사실을 뒷받침한다.',
    supportedAbilities:['청룡형 변신','불꽃 구름·섬 부양','전투와 능력 운용 병행'],
    statContributions:[
      {stat:'techniqueMastery',role:'primary',note:'실전 고강도 교전과 장시간 대규모 능력 유지의 동시 제어를 보여준다.'},
      {stat:'stamina',role:'context',note:'동일 사실의 장기 지속을 기존 Stamina 근거에서 이미 반영하므로 추가 조정하지 않는다.'},
      {stat:'versatility',role:'context',note:'섬 이동 역할 자체는 기존 Versatility 96에 이미 반영됐다.'},
    ],
    interpretation:'대규모 불꽃 구름을 유지하면서 루피의 고강도 전투에 대응한 복합 운용을 숙련도의 정성 근거로 인정한다. 섬의 무게나 이동 규모를 정확한 힘 수치로 환산하지 않는다.',
    evaluationImpact:'사용자 제안 Technique Final96→98 검토의 보조 근거. 패왕색 Raw6, 다른 축 및 모든 매치업 변경 없음.',
    uncertainty:'공식 TV 소개의 보조 설명이며 원작 만화 컷을 이번 패치에서 재검증하지 않았다. 불꽃 구름 사용의 구체적 집중 소모량은 수치화할 수 없다.',
  },
  {
    id:'evidence-v0421-linlin-homies-control-tv1058',
    battleId:'onigashima-linlin-law-kid-1039-1040',
    subjectCharacterId:'linlin',
    source:{
      type:'supplementary',reference:'ONE PIECE.com TV1058',
      description:'https://one-piece.com/anime/61434/index.html',
    },
    evidenceStrength:'moderate',
    fact:'빅맘이 키드가 사용하는 철덩이에 생명을 부여했고, 강화된 나폴레옹·헤라·프로메테우스를 전투에 사용해 로와 키드를 압박했다.',
    supportedAbilities:['호미즈 창조·증폭','소울소울 열매 능력 운용','복수 능력 결합'],
    statContributions:[
      {stat:'techniqueMastery',role:'primary',note:'상대가 이용할 전장의 물체에 영혼을 부여하고 호미즈를 강화해 전투 중 복합적으로 운용했다.'},
      {stat:'versatility',role:'context',note:'화염·번개·검술·영혼 조작 수단의 역할 폭은 기존 Versatility 97에 이미 반영했다.'},
      {stat:'combatIQ',role:'context',note:'전술 선택의 한계는 기존 Combat IQ 84를 유지하며 숙련도 상향으로 지능을 자동 상향하지 않는다.'},
    ],
    interpretation:'전투 중 다수 호미즈 강화와 대상 전환을 숙련도 성과로 인정하되, 능력 종류가 많다는 사실만으로 숙련도를 판단하지 않는다.',
    evaluationImpact:'사용자 제안 Technique Final94→96 검토의 보조 근거. 패왕색 Raw6 및 타 스탯 불변.',
    uncertainty:'공식 TV 1058 보조 줄거리. 로·키드의 각성 기술에 의해 이동과 대응이 제한된 상황도 존재한다. 만화 컷 이번 패치에서 전수 확인하지 않았다.',
  },
]

const decisions = {
  kaido: { expectedBase: 93, nextBase:95, expectedFinal:98,
    evidenceId:'evidence-v0421-kaido-island-flame-cloud-tv1052',
    rationale:'청룡·인수형·금쇄봉·자연현상 공격을 지속적으로 전환하면서 루피와의 고강도 공방 중 오니가시마 전체를 불꽃 구름으로 계속 띄워 유지했다(공식 TV1052 보조 자료). 이는 단순 능력 규모나 지구력뿐 아니라 전투와 정교한 능력 제어를 동시에 수행한 숙련 근거다. 섬 부양의 지속과 광역 역할은 기존 Stamina/Versatility에 반영돼 중복 가산하지 않는다. 패왕색 공격 적용 Raw6은 그대로 유지하며 Technique Base93→95, Final96→98로 잠정 상향한다.',
  },
  linlin: { expectedBase:91, nextBase:93, expectedFinal:96,
    evidenceId:'evidence-v0421-linlin-homies-control-tv1058',
    rationale:'호미즈·검술·영혼 조작과 패왕색 근접 적용을 상황에 따라 조합한다. 로·키드전에서 전장의 철덩이에 영혼을 부여하고 나폴레옹·헤라·프로메테우스를 강화·운용했으며 자신의 영혼을 골절 회복에도 활용했다(공식 TV1058, 만화 1039화 근거). 기술의 종류 자체가 아니라 전투 중 실제 조작과 결합 성과를 인정한다. 상대의 제압·위치 관리 실패는 Combat IQ 84의 별도 쟁점이다. 기존 패왕색 Raw6을 유지해 Technique Base91→93, Final94→96으로 잠정 상향한다.',
  },
} as const

export function applyV0421EmperorTechniqueReview(evaluation: Evaluation): Evaluation {
  if (evaluation.characterId!=='kaido' && evaluation.characterId!=='linlin') return evaluation
  const decision=decisions[evaluation.characterId]
  const target=evaluation.items.find(item=>item.stat==='techniqueMastery')
  if (!target || target.baseScore!==decision.expectedBase || getRawHakiContributionTotal(target)!==6) {
    throw new Error('Emperor Technique calibration: unexpected previous Base or Haki Raw '+evaluation.characterId)
  }
  const items=evaluation.items.map(item=>{
    if(item.stat!=='techniqueMastery')return item
    const updated={
      ...item,baseScore:decision.nextBase,rationale:decision.rationale,
      evidenceIds:[...item.evidenceIds,decision.evidenceId],
      hakiContributions:item.hakiContributions.map(entry=>({...entry,evidenceIds:[...entry.evidenceIds]})),
    }
    const score=getFinalStatScore(updated)
    if(score!==decision.expectedFinal)throw new Error('Emperor Technique final score drift '+evaluation.characterId)
    return {...updated,score}
  })
  return {...evaluation,
    evaluationDataVersion:'evaluation-v0.4.21-'+evaluation.characterId+'-technique-review',
    items,
  }
}
