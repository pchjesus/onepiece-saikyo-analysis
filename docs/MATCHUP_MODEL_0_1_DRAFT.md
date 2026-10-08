# Evidence-aware Matchup Model v0.1 Draft

> 목적: Balanced Overall을 승률로 오해하지 않으면서, 두 캐릭터의 능력이 실제로 서로에게 성립하는지를 Canon Evidence와 조건으로 설명한다.

## 1. 왜 별도 Matchup 모델이 필요한가

Balanced 1.2는 7개 Core Stat을 동일 가중치로 평균하여 캐릭터 자체의 종합 성능을 표현한다.

하지만 실제 승부에서는 다음이 별도로 중요하다.

- 공격이 상대에게 도달하는가
- 공격이 상대의 방어를 실제로 뚫을 수 있는가
- Haki가 상대 능력이나 방어와 어떻게 상호작용하는가
- 재생·방어·소모가 시간이 흐르며 어떻게 영향을 주는가
- 구속·석화·능력 봉쇄·내부 파괴 같은 특수 승리조건이 성립하는가
- 전장과 사전 정보가 결과를 바꾸는가

따라서 Overall을 더 복잡한 하나의 숫자로 만드는 것보다 Character Strength와 Matchup-specific Advantage를 분리한다.

## 2. 기본 가정

기본 Matchup은 PROJECT_SPEC의 기존 원칙을 따른다.

- Neutral Battlefield
- No Prior Preparation
- Normal Starting Condition
- No External Intervention
- 1v1

조건이 달라지면 별도 Scenario로 다룬다.

## 3. Factor

v0.1은 다음 Factor를 사용한다.

| Factor | 질문 |
|---|---|
| attack-access | 공격 거리·속도·기동을 고려할 때 공격 기회를 만들 수 있는가 |
| damage-validity | 실제로 상대 방어를 뚫고 유효 피해를 줄 수 있는가 |
| defensive-response | 상대 공격을 회피·차단·경감할 수 있는가 |
| mobility-control | 거리·위치·공중/지상 공간을 누가 더 잘 통제하는가 |
| haki-interaction | Haki가 로기아·능력 효과·방어·고급 Haki와 어떻게 상호작용하는가 |
| resource-endurance | 피로·능력 자원·누적 피해가 지속전에서 어떻게 변하는가 |
| recovery-regeneration | 입은 피해를 회복하거나 전투 가능 상태를 유지하는 메커니즘이 있는가 |
| special-win-condition | 석화·구속·능력 봉쇄·내부파괴 등 일반 스탯만으로 설명되지 않는 승리조건이 있는가 |
| environment | 전장 자체가 어느 능력에 실제 영향을 주는가 |

## 4. 시간 단계

- opening: 초반 선제 공격·초기 전개
- sustained: 반복 공방이 성립한 중기전
- long: 소모·재생·능력 자원 차이가 누적되는 장기전
- all: 특정 단계에 한정되지 않는 구조적 상성

Marco의 재생·소모전 강점은 long 단계의 resource-endurance와 recovery-regeneration에서 다룬다. 이를 새로운 Core Stat으로 중복 추가하지 않는다.

## 5. 판정 형식

각 Factor는 다음만 기록한다.

- advantage: character-a / character-b / none / conditional / unknown
- confidence: confirmed / supported / unclear
- Canon Evidence IDs
- 조건
- 불확실성

v0.1에는 다음을 넣지 않는다.

- 고정 +N 보너스
- 55% / 70% 같은 승률
- Evidence 없이 부여한 상성 계수
- Overall 차이를 그대로 승률로 바꾸는 계산

## 6. Haki와 Matchup

Haki는 세 층으로 나눈다.

1. Capability — 무엇을 보유하는가
2. Demonstrated Performance — Core Stat에서 실제 어떤 성과를 냈는가
3. Matchup Interaction — 상대 능력/방어/상태에 어떤 조건으로 작동하는가

예:
- Law가 Doc Q의 능력 효과를 강한 Haki로 해제한 사실은 Haki interaction 근거다.
- Hancock의 석화는 기본 Attack만이 아니라 special-win-condition이다.
- Logia를 실제 타격할 수 있는 Armament는 damage-validity의 성립 조건이 될 수 있다.
- Future Sight는 순수 Speed와 동일하지 않지만 attack-access / defensive-response에 영향을 줄 수 있다.

## 7. 모델 선택 이유

### Balanced 단독 유지
장점: 단순, 안정적, 순위와 Core Stat 비교가 쉬움.
한계: 상성·소모전·특수 승리조건 설명 부족.

### Duel Weighted로 기본 모델 교체
장점: 공격·방어·속도 비중을 조절할 수 있음.
한계: 가중치의 Canon 근거가 약하고, 기존 실험에서는 순위 변화가 작아 구조적 문제를 해결하지 못함.

### Balanced + Evidence-aware Matchup
장점:
- 기존 데이터와 계산 결과를 보존한다.
- Marco의 소모전, Hancock의 석화, Law의 내부파괴처럼 서로 다른 승리 구조를 설명할 수 있다.
- 불확실성을 unknown/conditional로 남길 수 있다.
- 향후 실제 전투 사례가 늘면 수치 모델을 검증할 데이터가 된다.

단점:
- Evidence 수집과 상대별 분석 비용이 크다.
- 자동 순위 하나보다 UI가 복잡해진다.
- 초기에는 승자를 숫자로 즉시 보여주지 않는다.

현재 최적안은 세 번째다.

## 8. 도입 영향

기존 7-Core와 Balanced 1.2는 그대로 유지된다.
새 Matchup 데이터는 별도 도메인에 추가되므로 기존 Ranking과 Character Detail을 깨지 않는다.

후속 구현 순서:
1. Matchup domain + validation
2. 2~3개 대표 Pair의 Evidence factor 입력
3. UI에서 Overall과 Matchup을 분리 표시
4. 실제 Canon 결과가 있는 Pair로 일관성 검증
5. 충분한 표본 후 수치화 필요성 재검토
