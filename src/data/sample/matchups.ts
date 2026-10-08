import type { MatchupAnalysis } from '../../domain/matchup/types'

/**
 * Evidence-aware matchup prototypes.
 *
 * These records intentionally do not contain a winner score or probability.
 * Direct Canon interactions are preferred; cross-character extrapolation stays
 * conditional/unknown unless the source actually supports it.
 */
export const sampleMatchups: MatchupAnalysis[] = [
  {
    id: 'matchup-marco-king',
    characterAId: 'marco',
    characterBId: 'king',
    assumptions: {
      battlefield: 'neutral',
      preparation: 'none',
      startingCondition: 'normal',
      externalIntervention: 'none',
    },
    factors: [
      {
        id: 'marco-king-recovery',
        factor: 'recovery-regeneration',
        phase: 'long',
        advantage: 'character-a',
        confidence: 'confirmed',
        summary: '마르코는 킹에게 날개가 절단된 뒤 재생하고 전투를 계속한 직접 기록이 있어 손상 회복 메커니즘에서는 분명한 우위가 있다.',
        evidenceIds: ['evidence-marco-regeneration-1006', 'evidence-king-marco-1006'],
        uncertainty: '재생에는 피로와 자원 한계가 확인되므로 장기전 승리 자체를 보장하지 않는다.',
      },
      {
        id: 'marco-king-defense-tradeoff',
        factor: 'defensive-response',
        phase: 'sustained',
        advantage: 'conditional',
        confidence: 'confirmed',
        summary: '킹은 Flame ON에서 매우 높은 방어를 보이고, 마르코는 재생과 차단으로 반복 공격을 버티는 서로 다른 방어 메커니즘을 갖는다.',
        evidenceIds: ['evidence-king-zoro-1035', 'evidence-marco-defense-king-1022'],
        conditions: '킹의 Flame 상태와 마르코의 남은 재생 자원에 따라 방어 우위의 의미가 달라진다.',
        uncertainty: '두 메커니즘의 장기 1대1 효율을 직접 비교한 Canon 표본은 없다.',
      },
      {
        id: 'marco-king-attrition',
        factor: 'resource-endurance',
        phase: 'long',
        advantage: 'unknown',
        confidence: 'supported',
        summary: '마르코는 킹·퀸 동시 상대 중 명확한 피로 한계를 보였고 킹도 이후 조로전까지 전투를 지속했다.',
        evidenceIds: ['evidence-marco-regeneration-1006', 'evidence-king-zoro-1035'],
        uncertainty: '마르코의 피로는 2대1 혼전에서 발생했으므로 이를 킹과의 순수 장기전 열세로 환산할 수 없다.',
      },
    ],
  },
  {
    id: 'matchup-law-teach',
    characterAId: 'law',
    characterBId: 'teach',
    assumptions: {
      battlefield: 'neutral',
      preparation: 'none',
      startingCondition: 'normal',
      externalIntervention: 'none',
    },
    factors: [
      {
        id: 'law-teach-damage-validity',
        factor: 'damage-validity',
        phase: 'sustained',
        advantage: 'character-a',
        confidence: 'confirmed',
        summary: '로의 각성 Shock Wille는 위너섬에서 티치에게 실제 유효 피해를 주어 내부파괴 계열 공격이 티치에게 성립함을 직접 확인한다.',
        evidenceIds: ['evidence-law-teach-1064', 'evidence-teach-law-1063-1064'],
        uncertainty: '한 번의 유효타가 전체 공방 우위나 최종 승리를 의미하지 않는다.',
      },
      {
        id: 'law-teach-nullification',
        factor: 'special-win-condition',
        phase: 'all',
        advantage: 'conditional',
        confidence: 'confirmed',
        summary: '티치의 어둠어둠 열매는 접촉한 능력자의 악마의 열매 능력을 봉쇄할 수 있어 오페오페 의존도가 높은 로에게 구조적인 위협이 된다.',
        evidenceIds: ['evidence-teach-kurouzu-441', 'evidence-teach-hancock-nullification-1059'],
        conditions: '티치가 로에게 접촉·구속을 성립시켜야 하며, 중거리 ROOM 운용 단계에서는 자동으로 적용되지 않는다.',
        uncertainty: '현재 저장 Evidence만으로 로가 이 봉쇄를 Haki로 해제할 수 있다고 단정할 수 없다.',
      },
      {
        id: 'law-teach-haki-interaction',
        factor: 'haki-interaction',
        phase: 'all',
        advantage: 'unknown',
        confidence: 'supported',
        summary: '로는 강한 Haki로 Doc Q의 능력 효과를 해제한 경험이 있지만, 같은 원리가 어둠어둠 열매의 접촉 봉쇄에도 적용된다는 직접 근거는 없다.',
        evidenceIds: ['evidence-law-haki-nullification-1063'],
        uncertainty: '능력 효과 해제와 접촉 중 능력 봉쇄는 서로 다른 작동 방식일 수 있으므로 일반화하지 않는다.',
      },
      {
        id: 'law-teach-result-context',
        factor: 'resource-endurance',
        phase: 'long',
        advantage: 'character-b',
        confidence: 'supported',
        summary: '위너섬 전투의 최종 결과는 검은수염 해적단의 승리이며 티치는 로의 강한 각성 공격을 맞고도 전투를 계속했다.',
        evidenceIds: ['evidence-teach-law-1063-1064', 'evidence-teach-heart-pirates-1081'],
        uncertainty: '해적단 대 해적단의 집단전 결과이므로 티치가 중립 1대1 장기전에서 반드시 우위라는 확정 근거로 쓰지 않는다.',
      },
    ],
  },
  {
    id: 'matchup-hancock-teach',
    characterAId: 'hancock',
    characterBId: 'teach',
    assumptions: {
      battlefield: 'neutral',
      preparation: 'none',
      startingCondition: 'normal',
      externalIntervention: 'none',
    },
    factors: [
      {
        id: 'hancock-teach-petrification',
        factor: 'special-win-condition',
        phase: 'opening',
        advantage: 'conditional',
        confidence: 'confirmed',
        summary: '핸콕의 석화는 아마존 릴리 혼전에서 티치 측 간부를 즉시 전투 불능으로 만들었고 티치도 그 능력을 위험하게 취급했다.',
        evidenceIds: ['evidence-hancock-amazon-lily-1059', 'evidence-teach-hancock-nullification-1059'],
        conditions: '사용하는 석화 기술의 성립 조건을 충족하고 티치가 먼저 접촉 봉쇄를 성립시키지 않은 경우에 의미가 있다.',
        uncertainty: '1059화는 혼전이며 핸콕의 석화가 티치 본인에게 실제 적중한 기록은 아니다.',
      },
      {
        id: 'hancock-teach-darkness',
        factor: 'special-win-condition',
        phase: 'opening',
        advantage: 'character-b',
        confidence: 'confirmed',
        summary: '티치는 핸콕의 목을 붙잡아 메로메로 열매를 봉쇄한 직접 장면이 있어 접촉이 성립하면 핸콕의 핵심 승리조건을 제한할 수 있다.',
        evidenceIds: ['evidence-teach-hancock-nullification-1059', 'evidence-hancock-amazon-lily-1059'],
        uncertainty: '그 접촉이 어떤 과정으로 성립했는지 전체적인 공정 1대1 교환이 묘사된 것은 아니다.',
      },
      {
        id: 'hancock-teach-overall',
        factor: 'attack-access',
        phase: 'sustained',
        advantage: 'unknown',
        confidence: 'unclear',
        summary: '두 인물의 중립 1대1에서 누가 자신의 특수 승리조건을 먼저 안정적으로 성립시키는지는 현재 Canon만으로 확정하기 어렵다.',
        evidenceIds: ['evidence-hancock-amazon-lily-1059'],
        uncertainty: '해군·세라핌·양측 부하가 개입한 1059화 결과를 독립 1대1 속도·접근 우열로 변환하지 않는다.',
      },
    ],
  },
]
