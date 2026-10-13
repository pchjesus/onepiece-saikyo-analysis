import type { MatchupAnalysis } from '../../domain/matchup/types'

/**
 * Two DISTINCT hypothetical configurations, not a recorded Luffy/Teach duel.
 * Never turn character-level Overall scores into win rates or unobserved Haki negation.
 * "confirmed" here applies to a cited real interaction, not hypothetical outcome;
 * therefore all cross-character extrapolations are "supported"/"unclear".
 */
export const luffyTeachStateMatchups: MatchupAnalysis[] = [
  {
    id:'matchup-luffy-gear4-teach',
    characterAId:'luffy',characterAStateId:'egghead-gear4',characterBId:'teach',
    assumptions:{battlefield:'neutral',preparation:'none',startingCondition:'normal; Gear 4 or lower, no Nika awakening',externalIntervention:'none'},
    factors:[
      {id:'luffy-g4-teach-reach',factor:'attack-access',phase:'opening',advantage:'conditional',confidence:'supported',
        summary:'스네이크맨의 추적 타격과 기어 4의 빠른 공세는 접근·선공 가능성을 보여준다. 반대로 티치의 크로우즈는 상대를 끌어당겨 근접 접촉을 유도할 수 있다.',
        evidenceIds:['evidence-luffy-gear4-snakeman-870','evidence-luffy-gear4-kaido-1069','evidence-teach-kurouzu-441'],
        conditions:'루피가 흡인·접촉을 피하고 중거리 기동을 유지할 때와 티치가 붙잡아 열매를 봉쇄할 때의 전개가 달라짐.',
        uncertainty:'티치와 루피가 직접 맞선 중립 결투는 없다. 기어 4의 기동이 크로우즈를 항상 회피한다는 증거도 없다.'},
      {id:'luffy-g4-teach-fruit-contact',factor:'special-win-condition',phase:'sustained',advantage:'conditional',confidence:'supported',
        summary:'티치는 에이스·핸콕을 접촉하여 능력 억제에 성공했다. 기어 4는 고무 열매 기반 기술을 쓰지만, 루피의 실제 티치 접촉 경험은 없다. 패기·비능력자 신체 타격까지 무력화된다고 보지 않는다.',
        evidenceIds:['evidence-teach-ace-440-441','evidence-teach-hancock-nullification-1059','evidence-luffy-gear4-kaido-1069'],
        conditions:'티치가 루피의 몸에 직접 접촉해 능력 봉쇄를 실제 성립시키는 상황.',
        uncertainty:'루피의 기어 4 발동 전후 상태가 접촉 시 구체적으로 어떻게 바뀌는지 공식 대전 실증 없음. 자동 승리 조건 아님.'},
      {id:'luffy-g4-teach-quake',factor:'damage-validity',phase:'sustained',advantage:'conditional',confidence:'supported',
        summary:'티치의 흔들흔들 지진 충격파에는 강한 광역 출력 근거가 있고 기어 4는 카이도와 고출력 공방을 성립시켰다. 서로 상대를 실제로 얼마나 관통할지는 미확인이다.',
        evidenceIds:['evidence-teach-gura-577','evidence-teach-law-1063-1064','evidence-luffy-gear4-volume103'],
        conditions:'충격파가 직접 적중하거나 루피가 근거리 연타를 성립시킬 때.',
        uncertainty:'카이도전·로전은 상대·지형·누적 피해가 달라 직접 내구·Attack 우열을 확정할 수 없다.'},
      {id:'luffy-g4-teach-stamina',factor:'resource-endurance',phase:'long',advantage:'unknown',confidence:'supported',
        summary:'기어 4의 패기·시간 소모가 장기전에 제약인 반면 티치는 강한 로의 공격을 받고도 반격·전투를 지속했다.',
        evidenceIds:['evidence-luffy-gear4-kaido-1069','evidence-teach-law-1063-1064','evidence-teach-heart-pirates-1081'],
        uncertainty:'티치도 강한 피해를 허용하며 기어 4 사용 직후의 루피 전투 지속력은 표본 부족이다. 장기전 승자·지속시간은 불명.'},
      {id:'luffy-g4-teach-haki',factor:'haki-interaction',phase:'all',advantage:'unknown',confidence:'unclear',
        summary:'루피는 기어 4와 습득한 패기를 결합하고 티치에게도 패기 보유 기록이 있으나, 두 사람의 패기 공방과 접촉 억제의 동시 상호작용은 직접 확인되지 않는다.',
        evidenceIds:['evidence-luffy-gear4-kaido-1069','evidence-teach-ace-440-441'],
        uncertainty:'패기만으로 티치의 열매 무효화가 무력화된다는 결론이나 패기 숙련 우위를 수치로 가산하지 않는다.'},
    ],
  },
  {
    id:'matchup-luffy-gear5-teach',
    characterAId:'luffy',characterAStateId:'egghead-gear5',characterBId:'teach',
    assumptions:{battlefield:'neutral',preparation:'none',startingCondition:'normal; Luffy activates Gear 5, Teach has both fruits',externalIntervention:'none'},
    factors:[
      {id:'luffy-g5-teach-awakening',factor:'mobility-control',phase:'opening',advantage:'conditional',confidence:'supported',
        summary:'기어 5는 신체·지형 변형과 거대화로 입체적 기동·방어·공격의 경로를 늘리지만, 티치의 흡인·광역 지진과의 직접 상호작용은 확인되지 않았다.',
        evidenceIds:['evidence-luffy-gear5-1071','evidence-luffy-adaptation-1072','evidence-teach-kurouzu-441','evidence-teach-gura-577'],
        conditions:'기어 5의 변칙 기동으로 접촉을 피하는 경우와 티치가 흡인 후 붙잡는 경우.',
        uncertainty:'각성 지형이 티치의 어둠·지진을 지우거나 기어 5를 무제한 유지하게 만들지는 않는다.'},
      {id:'luffy-g5-teach-disable',factor:'special-win-condition',phase:'sustained',advantage:'conditional',confidence:'supported',
        summary:'티치는 에이스·핸콕의 악마의 열매 능력을 직접 접촉으로 봉쇄했다. 니카도 열매 능력이며 봉쇄가 상성 위협일 가능성은 있으나 티치가 각성한 루피를 만진 전례는 없다.',
        evidenceIds:['evidence-teach-ace-440-441','evidence-teach-hancock-nullification-1059','evidence-luffy-gear5-1071'],
        conditions:'직접 접촉 봉쇄를 성립시킬 때. 접촉 이전 변칙 공격이 성립할 가능성도 함께 고려.',
        uncertainty:'니카 각성이 어둠 무효화를 면역한다거나 접촉하면 정확히 어떤 형태가 되는지 공식 확인된 적 없다.'},
      {id:'luffy-g5-teach-damage',factor:'damage-validity',phase:'sustained',advantage:'conditional',confidence:'supported',
        summary:'루피는 바즈랑 건으로 카이도를 쓰러뜨리고 스타 건으로 키자루를 타격했다. 티치도 로의 충격을 견디고 반격했으며 강력한 지진 기술을 사용한다.',
        evidenceIds:['evidence-luffy-bajrang-gun-1077','evidence-luffy-star-gun-1128','evidence-teach-law-1063-1064','evidence-teach-gura-577'],
        conditions:'루피의 고출력 공격 명중과 티치의 지진·접촉 봉쇄 성공 여부.',
        uncertainty:'서로 다른 상대에게 성립한 결정타를 1대1 확정 승부나 100% 적중 기술로 취급하지 않는다.'},
      {id:'luffy-g5-teach-focus',factor:'defensive-response',phase:'sustained',advantage:'unknown',confidence:'supported',
        summary:'루피는 각성 중 루치의 센토마루 공격을 허용했지만 이어서 후속 공격을 차단했다. 티치도 로의 선제 공격에 피해를 허용한 사례가 있어 두 사람 모두 빈틈과 회복 대응을 갖는다.',
        evidenceIds:['evidence-luffy-gear5-lucci-1100','evidence-luffy-gear5-lucci-1101','evidence-teach-law-1063-1064'],
        uncertainty:'루피의 웃음이 빈틈의 원인이라는 인과 추정이나 티치가 항상 기습에 취약하다는 일반화는 금지.'},
      {id:'luffy-g5-teach-long',factor:'resource-endurance',phase:'long',advantage:'conditional',confidence:'supported',
        summary:'기어 5 사용 후 소모와 전투 불능이 확인되며, 티치는 로의 각성 공격을 받은 이후 전투를 지속해 승리했다. 장기전에서는 재발동·거리 유지·적중 양상이 핵심 조건이다.',
        evidenceIds:['evidence-luffy-adaptation-1072','evidence-luffy-star-gun-1128','evidence-teach-heart-pirates-1081'],
        conditions:'기어 5가 종료될 때까지 결착하지 못하거나, 티치의 연속 피해로 소모가 누적되는 경우.',
        uncertainty:'루피가 즉시 결정타를 내는 경우와 지속전의 최종 우열은 확인되지 않았다. 저항 시간의 분 단위 수치 추론 금지.'},
    ],
  },
]
