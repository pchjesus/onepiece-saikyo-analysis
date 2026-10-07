# One Piece Combat Power Analysis
## Project Specification

**Version:** 0.1.23  
**Status:** Active MVP · Three-Crew Baseline Calibration  
**Project Type:** Web Application  
**Primary Purpose:** One Piece 주요 캐릭터의 전투력을 근거 기반으로 분석하고 비교하는 웹 애플리케이션

---

# 1. Project Purpose

본 프로젝트는 《ONE PIECE》에 등장하는 주요 전투 캐릭터의 전투력을 단순한 주관적 서열이 아니라, **작중 사실과 전투 상황, 해당 장면이 보여주는 능력, 해석 및 평가를 분리하여 기록하고 이를 수치화하는 것**을 목적으로 한다.

최종적으로 사용자가 캐릭터의 전투력뿐 아니라:

- 왜 해당 점수가 나왔는가?
- 어떤 전투 장면이 근거인가?
- 당시 전투 조건은 어떠했는가?
- 어떤 능력이 실제로 확인되었는가?
- 어떤 부분은 해석이나 불확실성을 포함하는가?
- 서로 다른 계산 기준을 적용하면 결과가 어떻게 달라지는가?

를 확인할 수 있도록 한다.

---

# 2. Core Principles

## 2.1 Canon First

캐릭터 및 전투 평가의 기본 근거는 공식 작중 사실을 우선한다.

인터넷 커뮤니티의 평가와 여론은 캐릭터 선정이나 보조적인 해석 자료로 사용할 수 있지만, 공식 평가 점수를 자동으로 변경하는 근거로 사용하지 않는다.

## 2.2 Evidence and Interpretation Separation

다음 요소를 명확하게 구분한다.

1. Canon Fact
2. Combat Context
3. Interpretation
4. Evaluation
5. Community Opinion

예:

```text
Canon Fact
↓
특정 공격을 맞고도 전투를 지속함

Combat Context
↓
이미 다른 전투에서 피해를 입은 상태

Interpretation
↓
높은 피해 누적 상황에서도 전투 지속 능력을 보여줌

Evaluation
↓
내구성 및 지구력 평가에 긍정적 영향을 줌

Community Opinion
↓
해당 장면에 대한 팬덤의 평가
```

Community Opinion은 Official Evaluation과 별도로 관리한다.

---

# 3. Initial Crews

초기 분석 대상 해적단:

- Whitebeard Pirates
- Beasts Pirates
- Big Mom Pirates
- Red Hair Pirates
- Straw Hat Crew
- Cross Guild

각 해적단은 원칙적으로 주요 전투원 약 3명을 선정한다.

단, 의미 있는 평가가 가능한 캐릭터가 3명보다 적은 경우 억지로 3명을 채우지 않는다.

캐릭터 선정은 작중 사실을 우선하며, 커뮤니티의 일반적인 인식은 보조 자료로만 사용한다.

---

# 4. Combat Power Model

전체 전투력은 기본적으로 **0~100점**으로 표현한다.

전투력 구성 요소:

- Attack
- Defense
- Stamina / Endurance
- Speed
- Technique / Mastery
- Intelligence / Combat IQ
- Versatility

7개 Core Stat은 가능한 한 서로 다른 개념으로 유지한다. Core Stat 개수를 맞추기 위한 중복 축은 추가하지 않는다.

특히 다음 구분을 유지한다.

```text
Defense
Stamina / Endurance
Technique / Mastery
Combat IQ
Versatility
```

Defense는 회피·방어·차단·피해 감소와 상태에 따른 조건부 방어를 포함하는 종합 방어 능력으로 본다. 별도의 Durability 스탯은 두지 않는다.

Stamina는 피로와 체력 소모가 누적되는 상황에서 전투를 지속하는 능력, Technique / Mastery는 자신이 사용하는 전투 수단과 능력을 높은 수준으로 정교하게 다루는 능력으로 구분한다. 손상 이후의 회복·재생은 독립적인 최상위 스탯으로 자동 환산하지 않으며, Evidence와 고유 전투 능력의 평가에 보존하고 실제 전투 지속 효과가 확인되는 경우 Stamina의 근거로 활용할 수 있다. Defense에 회복 능력을 자동 합산하지 않는다.

Special Combat Profile은 악마의 열매·종족 특성·특수 생리·개조·특수 장비·과학 기술 등 캐릭터 고유의 전투 메커니즘을 비수치 정보로 기록한다. Special 자체는 Balanced Overall에 직접 합산하지 않으며, 실제 전투 성과가 확인된 경우 해당 Evidence를 Attack·Defense·Stamina·Speed·Technique·Combat IQ·Versatility 중 의미에 맞는 Core Stat에 연결한다. Versatility는 여러 전투 상황·거리·상대·목적에 맞춰 서로 다른 능력과 전투 방식을 전환·적용하는 폭과 적응력을 평가한다. Combat IQ는 이러한 수단 중 무엇을 언제 어떻게 선택할지에 대한 전투 판단을 평가한다.

따라서 하나의 장면이나 능력이 여러 스탯에 관련될 수 있더라도 동일한 성과를 무비판적으로 중복 점수화하지 않는다. Evidence의 Fact와 Interpretation을 먼저 구분하고, 각 스탯의 정의에 맞는 영향을 별도로 판단한다.

---


## 4.1 Evaluation Scale and Review Principles

전투력 점수는 현재 샘플 캐릭터끼리의 상대평가가 아니라 향후 다양한 전투원에게 적용할 수 있는 절대평가를 지향한다. 특정 집단의 평균이나 포지션을 기준으로 점수를 맞추지 않는다.

따라서:

- 사최간이라는 포지션 자체를 높은 점수의 직접적인 근거로 사용하지 않는다.
- Evidence가 부족하다는 사실을 낮은 능력의 증거로 자동 해석하지 않는다. 직접 근거가 부족한 항목은 draft 상태와 중립적 임시값으로 유지할 수 있다.
- 하나의 스탯 점수는 다른 스탯의 점수나 전투 결과를 자동으로 결정하지 않는다. 예를 들어 Attack > Defense라는 단일 조건으로 승패를 산출하지 않는다.
- Battle Result는 Battle Context와 함께 해석하며, 참전 인원·상태·전투 구조·전투 목적·전투 의도·능력 사용·환경·제한 조건·외부 개입 등을 함께 고려한다.
- Evidence가 여러 스탯과 관련되더라도 동일한 성과를 무비판적으로 중복 점수화하지 않는다. 각 스탯의 정의에 맞는 영향을 별도로 판단한다.
- 현재 전투력과 미래 성장 가능성은 분리한다. 성장 가능성을 현재 점수에 임의로 가산하지 않으며, `Growth Potential`은 향후 별도 모델 후보로 남긴다.

현재 Marco와 King의 평가는 이 기준에 따라 다시 검토 중인 `draft`이며, 기존 점수를 보존하는 것을 목표로 하지 않는다. Evidence 재검토 결과에 따라 각 항목을 올리거나 내릴 수 있다.

## 4.2 Special Combat Profile

Special은 독립적인 0~100 점수로 평가하지 않는다.

기본 Category:
- devil-fruit
- race
- biology
- modification
- equipment
- technology
- other

각 Special Trait은 가능한 경우 다음 정보를 보존한다.

```text
Special Trait
├── Category
├── Name
├── Status
├── Description
├── Evidence IDs
├── Limitations
└── Uncertainty
```

Special Trait이 강력하다는 사실만으로 Core Stat에 고정 보너스를 부여하지 않는다. 실제 공격·방어·지속·기동·숙련·판단·적응 성과가 확인된 경우 해당 Evidence를 관련 Core Stat의 근거로 사용한다.

별도의 특수 전투요소가 확인되지 않은 비능력자에게 임의의 낮은 Special 점수를 부여하지 않는다. 정보 부재는 감점 근거가 아니다.

# 5. Haki Model

Haki는 기본적으로 별도의 직접 점수로 환산하지 않는다.

대신 다음 정보를 구조화하여 기록한다.

### Armament Haki
- confirmed
- not confirmed
- unclear

### Observation Haki
- confirmed
- not confirmed
- unclear

### Conqueror's Haki
- confirmed
- not confirmed
- unclear

### Conqueror's Haki - Advanced Application

패왕색의 고급 활용인 `패휘감`은 별도 Haki 종류로 분리하지 않고 Conqueror's Haki의 하위 application 상태로 기록한다.

- infusion confirmed
- infusion not confirmed
- infusion unclear

### Advanced Haki Applications

필요한 경우 각 패기 종류의 하위 활용 정보로 기록한다.

중요 원칙:

> 작중에서 보여주지 않았다는 사실만으로 해당 능력의 부재를 확정하지 않는다.

따라서 확인할 수 없는 경우 `unclear`를 사용할 수 있다.

---

# 6. Battle Context

전투 장면을 평가할 때 단순히 승패만 기록하지 않는다.

가능한 경우 다음 정보를 기록한다.

## Combat Structure

- 1v1
- Multiple vs 1
- 1 vs Multiple
- Multiple vs Multiple

## Participants

- 자신의 동료
- 적
- 전투 참여자

## Own Condition

- Health
- Injuries
- Fatigue
- Previous Battles
- Cumulative Damage
- Ability Usage

## Opponent Condition

- Health
- Injuries
- Fatigue
- Previous Battles
- Cumulative Damage
- Ability Usage

## Combat Purpose

예:

- 결투
- 시간 끌기
- 동료 보호
- 목표 제거
- 탈출
- 특정 인물 보호

## Combat Intent

- Normal
- Serious
- Full Power
- Lethal Intent
- Unknown

## Environment

- Terrain
- Battlefield Conditions
- Environmental Advantages

## Restrictions

- Ability restrictions
- Environmental restrictions
- Protected targets
- Preparation limitations

## External Factors

- External intervention
- Third-party attacks
- Unexpected events

## Result

- Victory
- Defeat
- Draw
- Interrupted
- Unknown

## Demonstrated Abilities

해당 전투에서 실제로 확인된 능력을 기록한다.

---

# 7. Evidence Model

각 평가에는 가능한 한 근거를 연결한다.

기본 구조:

```text
Evidence
├── Source
├── Evidence Strength
├── Supported Ability / Stat
├── Interpretation
├── Evaluation Impact
└── Uncertainty
```

Evidence Strength는 별도의 평가 체계로 관리할 수 있으며, 초기에는 구조만 정의하고 세부 등급은 개발 과정에서 결정한다.

---

# 8. Strengths and Weaknesses

캐릭터의 강점과 약점을 단순한 텍스트 목록으로만 관리하지 않는다.

가능한 전투 상황을 기준으로 구조화한다.

예:

- Multiple-opponent combat
- Long-duration combat
- Close-range combat
- Ranged combat
- Mobility
- Defensive combat
- Area-of-effect combat
- Single-target combat
- Strategic combat

일반적인 캐릭터의 강점과 특정 상대와의 Matchup에서 발생하는 강점은 구분한다.

```text
Character Strength
≠
Matchup-specific Advantage
```

---

# 9. Combat Power Calculation

계산 결과는 최소 다음 정보를 보존해야 한다.

```text
Final Score
Calculation Model
Calculation Model Version
Evaluation Data Version
Calculation Timestamp
```

또한:

```text
Manual Evaluation
Calculated Evaluation
```

을 구분한다.

---

# 10. Calculation Models

단일 계산식을 영구적으로 하드코딩하지 않는다.

향후 다음과 같은 계산 모델을 지원할 수 있도록 설계한다.

### Balanced

7개 Core Stat을 균형 있게 반영한다. 현재 Balanced 1.2는 7개 Final Core Stat의 단순 산술평균을 사용하며 Special Combat Profile은 직접 합산하지 않는다.

### Haki Emphasis

Haki 관련 요소의 중요도를 높이는 모델.

### Physical Ability Emphasis

공격력, 방어력, 내구성, 속도 등 물리적 능력의 중요도를 높이는 모델.

### 1v1 Emphasis

일대일 전투 상황에서의 능력을 상대적으로 중요하게 평가하는 모델.

정확한 가중치는 초기 설계 단계에서 임의로 확정하지 않는다.

계산 모델은 향후 버전 관리가 가능해야 한다.

---

# 11. Matchup Model

초기 기본 매치업 조건:

```text
Neutral Battlefield
No Prior Preparation
Normal Starting Condition
No External Intervention
1v1
```

향후 다음 요소를 추가할 수 있도록 확장성을 유지한다.

- Distance
- Terrain
- Injuries
- Preparation Information
- Preparation Time
- Allies
- Environmental Conditions

Matchup 결과에 임의의 고정 보너스 수치를 부여하는 방식은 지양한다.

가능하면 실제 평가 데이터와 계산 모델을 기반으로 결과가 도출되도록 한다.

---

# 12. Overall Combat Power UI

최종 점수는 예를 들어:

```text
Overall Combat Power
87.4 / 100
```

형태로 표시한다.

별점은 실제 점수와 별개의 Presentation Layer로 취급한다.

예:

```text
87.4 / 100
→ 87.4 / 100 × 5
→ 4.37 / 5
```

따라서 다섯 번째 별도 부분적으로 채워질 수 있다.

별점 자체가 실제 계산 데이터의 source of truth가 되어서는 안 된다.

---

# 13. Data Architecture

핵심 데이터는 UI에 하드코딩하지 않는다.

주요 Domain Entity:

```text
Crew
Character
Battle
Evidence
Evaluation
Haki
SpecialCombatTrait
CalculationModel
Matchup
Revision
```

관계의 기본 방향:

```text
Crew
 ↓
Character
 ├── Haki
 ├── Special Combat Profile
 ├── Battle
 │    └── Evidence
 ├── Evaluation
 ├── Strengths
 └── Weaknesses
```

CalculationModel은 Evaluation과 연결된다.

Matchup은 Character와 Evaluation 데이터를 활용한다.

---

# 14. UI / Domain Separation

UI는 데이터를 표현하는 역할을 담당한다.

복잡한 전투력 계산이나 평가 규칙을 UI 코드에 직접 하드코딩하지 않는다.

기본 구조:

```text
Domain / Calculation Logic
↓
State / Data
↓
UI / Visualization
```

이를 통해 UI 변경이 분석 데이터와 계산 로직을 불필요하게 변경하지 않도록 한다.

---

# 15. Initial MVP

첫 번째 MVP는 모든 캐릭터와 모든 전투를 구현하는 것을 목표로 하지 않는다.

최소 목표:

```text
Crew
↓
Character
↓
Basic Combat Stats
↓
Overall Combat Power
```

이후 단계적으로:

```text
Battle
↓
Evidence
↓
Evaluation
↓
Calculation Model
↓
Comparison
↓
Matchup
```

을 추가한다.

첫 테스트 데이터는 1~2명의 캐릭터만 사용한다.

처음부터 전체 캐릭터 데이터를 작성하지 않는다.

---

# 16. Future Administration

장기적으로 다음 데이터 관리 구조를 고려한다.

```text
Current Public Data
↓
Admin Edit
↓
Draft
↓
Validation
↓
Save
↓
Re-check Saved Result
↓
Revision
↓
Publish
```

Revision은 가능하면 다음 정보를 기록한다.

- Editor
- Edit Time
- Change
- Previous Value
- New Value
- Reason
- Evidence
- Operation ID

하나의 저장 작업에서 발생한 여러 변경은 동일한 Operation ID로 묶을 수 있다.

과거 Revision을 복원할 때 기존 기록을 삭제하지 않는다.

복원 역시 새로운 Revision으로 기록한다.

동시 편집이 필요한 경우 stale version을 감지하여 조용히 덮어쓰지 않는 구조를 고려한다.

삭제는 가능하면 hard delete보다 deactivate/archive 방식을 우선 고려한다.

단, 위 기능들은 MVP에 포함하지 않는다.

---

# 17. Community Features

장기적으로 다음 기능을 고려한다.

- Character Board
- Comments
- Community Votes
- Author Edit/Delete
- Admin Moderation

Community 기능은 Official Evaluation과 분리한다.

사용자의 투표나 커뮤니티 의견이 공식 전투력 점수를 자동으로 변경하지 않는다.

실제 다중 사용자 커뮤니티가 필요해지는 시점에는 Authentication / Backend / Database 구조를 별도로 검토한다.

---

# 18. Development Methodology

이 프로젝트의 개발은 다음 원칙을 따른다.

```text
Understand
↓
Define Requirements
↓
Model Domain / Data
↓
Analyze Impact
↓
Plan
↓
Prototype
↓
Implement
↓
Test
↓
Regression Test
↓
Review
↓
Refactor when justified
↓
Document
↓
Version / Backup
```

작업 규모가 작으면 절차를 축소한다.

복잡한 기능이나 구조 변경에서는 전체 절차를 적용한다.

---

# 19. AI Development Integrity Loop

AI는 단순한 코드 생성기가 아니라 개발 파트너 및 QA 역할까지 수행한다.

## Feature Development

```text
Briefing
↓
Current State / Requirement Confirmation
↓
Purpose & Impact Analysis
↓
Implementation Plan
↓
User Confirmation
↓
Implementation
↓
Functional Test
↓
AI Proactive Bug Search
↓
Debugging
↓
Regression Test
↓
Integrity Check
↓
Issue Found?
 ├─ Yes → Debug → Re-test → Integrity Check
 └─ No
↓
Documentation / Versioning
↓
File Delivery
```

사용자에게 확인을 요청하는 것은 중요한 UX·기획·제품 방향처럼 사용자의 판단이 필요한 경우로 제한한다.

기술적인 세부 구현은 AI가 합리적으로 판단한다.

---

# 20. Bug Development Protocol

사용자가 버그를 발견했을 경우 단순히 해당 증상을 고치는 것으로 끝내지 않는다.

```text
Bug Found
↓
Symptom Confirmation
↓
Reproduction
↓
Ultimate Project Purpose Confirmation
↓
Current Architecture / Data Flow Analysis
↓
Root Cause Investigation
↓
Affected Scope Analysis
↓
Fix Design
↓
Implementation
↓
Bug Re-test
↓
Regression Test
↓
Integrity Check
↓
Issue Found?
 ├─ Yes → Re-debug
 └─ No → Delivery
```

특히 로컬 패치가 장기적인 구조와 충돌할 가능성이 있는 경우 이를 먼저 지적한다.

---

# 21. Proactive Bug Search

AI는 사용자가 버그를 발견해 알려줄 때까지 기다리지 않는다.

기능 구현 후 다음 관점에서 적극적으로 문제를 찾는다.

### Functional Integrity

요구한 기능이 실제 의도대로 동작하는가?

### Data Integrity

데이터가 올바르게 생성·변경·전달·저장되는가?

### Structural Integrity

현재 구현이 프로젝트의 전체 구조와 충돌하지 않는가?

### Regression Integrity

기존 기능이 깨지지 않았는가?

### Purpose Integrity

이번 구현이나 수정이 프로젝트의 궁극적인 목적과 맞는가?

### Extensibility Integrity

향후 계획된 기능을 불필요하게 막는 구조가 되었는가?

---

# 22. Integrity Check Rules

AI는 검수하지 않은 기능을 정상이라고 단정하지 않는다.

검수 결과는 다음과 같이 구분한다.

## Confirmed Bug

코드 분석 또는 실제 테스트를 통해 문제가 확인된 경우.

## High-Probability Issue

현재 구현을 분석했을 때 문제가 발생할 가능성이 높은 경우.

## Potential Risk

추가 확인이 필요한 위험 요소.

## Intended Change

요구사항에 의해 의도적으로 변경된 것으로 판단되는 사항.

## Improvement Suggestion

현재 기능에는 문제가 없지만 장기적인 품질이나 유지보수성을 개선할 수 있는 사항.

추측을 확인된 버그처럼 표현하지 않는다.

---

# 23. Testing Principles

변경 규모에 따라 다음 테스트를 선택한다.

### New Functionality

새 기능이 요구사항대로 동작하는지 확인한다.

### Regression

변경의 영향을 받을 수 있는 기존 기능을 확인한다.

### Boundary

최소값, 최대값, 빈 데이터, 예상하지 않은 입력을 확인한다.

### Error

잘못된 데이터와 예외 상황을 확인한다.

### Data Flow

입력 → 처리 → 출력 과정에서 데이터가 일관되게 유지되는지 확인한다.

### UI / Data Consistency

화면에 표시되는 값과 실제 데이터 상태가 일치하는지 확인한다.

### Responsive

필요한 경우 모바일 및 다양한 화면 크기를 확인한다.

---

# 24. Important Development Rules

AI는 다음 행동을 하지 않는다.

- 정상 기능을 임의로 삭제하지 않는다.
- 요청하지 않은 대규모 리팩터링을 하지 않는다.
- 특별한 이유 없이 라이브러리를 교체하지 않는다.
- 기존 데이터 구조를 불필요하게 변경하지 않는다.
- 프로젝트의 존재하지 않는 파일이나 기능을 있다고 가정하지 않는다.
- 테스트하지 않은 기능을 정상이라고 주장하지 않는다.
- 추측을 사실처럼 표현하지 않는다.
- 요구사항을 임의로 확대하지 않는다.
- 장기 구조를 고려하지 않은 임시 패치를 반복하지 않는다.
- 안정적인 코드를 단순한 취향 때문에 재작성하지 않는다.
- 기존 안정 버전을 파괴하지 않는다.

---

# 25. User / AI Responsibilities

## User

사용자는 주로 다음을 담당한다.

- 아이디어
- 제품 목적
- 핵심 UX 결정
- 중요한 방향 결정
- 결과물 확인
- 실제 사용성 판단
- 최종 의사결정

## AI

AI는 주로 다음을 담당한다.

- 요구사항 구조화
- 기술 설계
- 데이터 모델링
- 구현
- 테스트
- 버그 탐색
- 디버깅
- 회귀검증
- 코드 리뷰
- 위험 분석
- 개선안 제시
- 문서화 지원

AI는 사용자의 판단을 대체하지 않는다.

반대로 사용자가 제안한 구현이 장기적인 프로젝트 구조와 충돌할 경우 AI는 그 위험을 설명해야 한다.

---

# 26. Decision Making

다음 사항은 사용자의 판단이 필요할 수 있다.

- 중요한 UX 선택
- 사용자에게 노출되는 동작 방식
- 기능 우선순위
- 제품 방향
- 데이터 삭제/보존 정책
- 기존 사용 방식과 새로운 방식 중 선택
- 장기적인 제품 전략

반면 다음과 같은 기술적 세부사항은 AI가 합리적으로 결정한다.

- 함수 분리
- 파일 배치
- 내부 데이터 처리
- 테스트 방법
- 코드 구조
- 구현 세부사항

불필요하게 모든 기술 결정을 사용자에게 되묻지 않는다.

---

# 27. Documentation and Versioning

중요한 프로젝트 상태와 설계 결정은 문서에 남긴다.

필요에 따라:

```text
README.md
PROJECT_SPEC.md
ARCHITECTURE.md
DATA_MODEL.md
DECISION_LOG.md
DEVLOG.md
CHANGELOG.md
TEST_REPORT.md
```

등으로 분리한다.

초기에는 문서가 과도하게 분산되지 않도록 한다.

현재 단계에서는 `PROJECT_SPEC.md`를 핵심 기준 문서로 사용하고, 프로젝트가 커질 때 필요한 문서를 분리한다.

버전 변경 시 가능한 경우:

```text
Added
Changed
Fixed
Tests
Known Issues
Next Steps
```

를 기록한다.

---

# 28. Project Continuity

새로운 채팅에서 프로젝트를 이어갈 경우 대화 기록 자체를 유일한 source of truth로 사용하지 않는다.

프로젝트 문서를 기준으로 현재 상태를 복원한다.

최소한 다음 정보를 문서 또는 코드에서 확인한다.

- Current Version
- Requirements
- Architecture
- Data Model
- Current Implementation
- Known Bugs
- UX Decisions
- Recent Changes
- Planned Next Steps

새로운 요청이 기존 설계와 충돌하면 구현 전에 충돌을 확인한다.

---

# 29. Current Development Status

현재 프로젝트는 React + TypeScript + Vite 기반 정적 MVP가 구현되어 있으며, v0.1.21에서는 전투력 평가 스케일과 Haki 계산 모델을 재보정한다.

```text
Current Version: v0.1.21
Code: Implemented
MVP Characters: Marco / King / Katakuri
Domain Model: 8 combat stats + Battle / Evidence / Evaluation / Haki
Evaluation Data Version: evaluation-0.1.21
Calculation Model: Balanced 1.1
Overall: arithmetic mean of 8 Final Stats
Haki Weight: 0.5
UI: Character Detail / Combat Profile / Evaluation Trace / Battle Timeline
Deployment: GitHub Pages workflow configured; repository Pages enablement pending
```

현재 세 캐릭터의 평가는 모두 `draft`다. 점수는 Canon Fact와 Combat Context를 바탕으로 한 Evaluation이며 공식적인 작품 내 수치가 아니다.

v0.1.20 첫 Pages workflow에서는 stale fixture 7건 때문에 test 단계가 실패했다. v0.1.21 main 검증에서는 10 test files / 39 tests와 production build가 통과했다. 이후 `configure-pages` 단계는 저장소의 Pages 사이트가 아직 활성화되지 않아 실패했으므로 실제 Pages 배포는 저장소 설정 활성화 후 별도 확인이 필요하다.

---

# 30. Immediate Next Step

v0.1.21 이후 우선순위:

```text
v0.1.21 automated test/build/deploy verification
↓
Manual UI verification
↓
Evidence coverage / confidence 표현 방식 설계 검토
↓
3-character calibration 결과 재검토
↓
다음 캐릭터 추가 전 절대 스케일 일관성 검증
```

Confidence / Evidence Coverage는 점수와 근거 충분도를 분리하는 데 유용하지만 Evaluation 데이터 모델과 UI에 새 필드를 추가하는 변경이므로 v0.1.21에서는 강제로 구현하지 않는다.

# 31. Long-Term Development Direction

예정된 확장 방향:

```text
Requirements
↓
Domain Model
↓
Data Model
↓
Application Architecture
↓
MVP
↓
Battle / Evidence
↓
Calculation Models
↓
Comparison
↓
Matchup
↓
Administration
↓
Revision / History
↓
Community
↓
Automation
```

각 단계는 실제 구현 결과와 위험을 확인한 뒤 다음 단계로 진행한다.

계획에 포함되어 있다는 이유만으로 모든 기능을 구현해야 하는 것은 아니다.

---

# 32. v0.1.18 Evaluation / Haki Model Decision

## 32.1 Eight-stat model
The top-level model remains eight stats: Attack, Defense, Stamina / Endurance, Speed, Technique / Mastery, Special Ability, Intelligence / Combat IQ, and Versatility. Recovery and Durability are not restored as top-level stats.

## 32.2 Four-axis boundary
- Special Ability: what the character's unique ability can do and the ability's inherent combat value.
- Technique / Mastery: how precisely and proficiently the character executes and controls combat means or abilities.
- Combat IQ: how well the character judges when and what to use.
- Versatility: how broadly the character can apply combat means across roles, ranges, opponents, purposes, and situations.

The same Canon Evidence may relate to multiple stats only when each relationship represents a distinct evaluative meaning. The same observed fact must not be copied into several stats merely to increase multiple scores.

## 32.3 Evidence-stat relationship
Evidence uses structured `statContributions` instead of a flat `supportedStats` list.
- `primary`: direct core evidence for the stat.
- `secondary`: meaningful supporting evidence, but not the central evaluative meaning of the scene.
- `context`: relevant to interpretation but must not be treated as direct score evidence by itself.

## 32.4 Haki model
Haki is not a ninth 0-100 combat stat. Capability and actual combat application are separated.

Haki capabilities:
- Armament
- Observation
- Conqueror's
  - Conqueror's Infusion (패휘감): Conqueror's의 하위 application 상태

Capability status:
- confirmed
- unclear
- not-confirmed

A confirmed capability does not automatically increase a stat. A positive Haki contribution requires actual application Evidence connected to the affected stat.

## 32.5 Haki contribution
For v0.1.18:
- Base Stat is evaluated without counting the same Haki application twice.
- Haki Contribution is stat-specific.
- Current contribution range is 0 to +10 per stat in 2-point steps.
- Final Stat = min(100, Base Stat + total Haki Contribution).
- Overall Combat Power remains the arithmetic mean of the eight Final Stats under the current Balanced model.

The +0~10 / 2-point scale is a versioned modeling rule, not a permanent canon-derived constant. It should be re-evaluated after sufficient real Haki Evidence is stored.

## 32.6 Current sample-data limitation
Marco and King do not receive positive Haki contributions in v0.1.18 because the currently stored project Evidence does not directly document Haki application. Katakuri remains prototype for the same evidence-availability reason. Zoro may be used as a synthetic model-validation fixture, but synthetic data must not be presented as Canon evaluation data.


# 33. v0.1.19 Character Combat Profile

## 33.1 목적
평가 점수와 별개로 캐릭터가 원작에서 어떤 방식으로 싸우며 어떤 능력과 패기를 보유하는지 Canon Profile로 제공한다. UI 하드코딩이 아니라 Character Domain 데이터가 진실의 원천이다.

## 33.2 구성
- Combat Styles
- Key Abilities
- Haki Profile
- Canon Profile Sources

Haki는 Armament / Observation / Conqueror's의 세 종류를 기록한다. 패휘감은 독립 종류가 아니라 Conqueror's의 하위 infusion 상태다.

## 33.3 평가와의 분리
Character Combat Profile은 Canon 정보 계층이며 그 자체로 Evaluation 점수를 변경하지 않는다. 실제 Haki Contribution은 별도의 Haki Application Evidence가 확보된 뒤 평가한다. `unclear`는 비보유를 뜻하지 않는다.

## 33.4 v0.1.19 범위
현재 등록 캐릭터 Marco / King / Katakuri의 Combat Profile을 추가한다. Evidence UI의 primary / secondary / context는 주요 근거 / 보조 근거 / 상황 참고로 표시한다. Katakuri의 실제 Evaluation과 세 캐릭터 전면 재평가는 다음 단계로 보류한다.

# 34. v0.1.20 Haki Application · 3인 재평가 · GitHub Pages

## 34.1 목적
v0.1.19의 Canon Combat Profile을 실제 Haki Application Evidence와 연결하고, 동일한 현행 8스탯 기준으로 Marco / King / Katakuri를 전면 재평가한다. 동시에 정적 MVP를 GitHub Pages에서 공유할 수 있는 배포 경로를 제공한다.

## 34.2 Haki 적용 규칙
- Haki 보유 사실만으로 Stat을 올리지 않는다.
- 실제 전투에서 해당 Haki를 사용한 Canon Evidence가 있을 때만 `HakiStatContribution`을 부여한다.
- Base Score는 해당 Haki 강화 효과를 제외하고 산정하여 이중 계산을 막는다.
- Contribution은 현재 스탯별 총 +0~10, 2점 단위 기준을 유지한다.
- 미래예지처럼 결과적으로 빠른 대응을 만드는 능력은 순수 Speed와 구분한다. Katakuri의 미래예지는 Defense / Technique-Mastery / Combat IQ에 기여시키며 Speed에는 자동 가산하지 않는다.
- 패왕색의 기본 방출과 패휘감을 구분한다. 패휘감은 패왕색의 하위 application이며 독립 Haki type이 아니다.
- 패왕색으로 약한 다수를 제압한 사실만으로 사최간급 1대1 전투 스탯에 자동 가산하지 않는다.

## 34.3 Evidence 무결성
양의 Haki Contribution이 참조하는 Evidence는 존재해야 하고, Evaluation 대상 캐릭터와 동일한 subjectCharacterId를 가져야 하며, 해당 EvaluationItem의 evidenceIds에도 포함되어야 한다.

## 34.4 재평가 원칙
세 캐릭터 모두 이전 점수의 증감 방식으로 맞추지 않고 현재 Canon Evidence와 현행 Stat Definition에서 다시 산정한다. 상대적 순위는 개별 산정 이후 회귀·일관성 검수 단계에서 확인한다.

## 34.5 GitHub Pages
앱은 서버/DB 없는 정적 공유 MVP로 배포한다. Vite는 상대 asset base를 사용하며 GitHub Actions는 main push 시 install → test → build → Pages artifact deploy를 수행한다. 사용자별 수정 내용을 공유하는 실시간 공동 데이터 기능은 이 범위에 포함하지 않는다.

---

# 35. v0.1.21 Combat Power Scale Calibration

## 35.1 목적
v0.1.21은 새 캐릭터나 Stat을 추가하지 않고 Marco / King / Katakuri 3인의 평가를 이용해 절대 전투력 스케일을 재보정한다. 기존 Overall의 80점대 후반~90점대 밀집으로 향후 상위 캐릭터 표현 공간이 좁아지는 문제를 수정한다.

## 35.2 Calibration anchor
점수 구간은 강제 Tier가 아니라 의미를 일관되게 유지하기 위한 anchor다.
- 90 이상: 해당 능력축에서 세계관 최상위급과 직접 비교 가능한 수준
- 80대: 매우 뛰어난 최고급 전투 성능
- 70대: 명백한 강자이지만 세계관 최고 수준과는 차이가 존재
- 60대 이하: 향후 중상위권·중위권 캐릭터를 충분히 표현할 수 있는 영역
- 100: 현실적인 최고점으로 남겨두며 남발하지 않음

"사최간=80", "사황=90"처럼 직책·서열을 고정 점수로 변환하지 않는다.

## 35.3 Haki Weight
Haki Raw Contribution과 Evidence 추적성은 유지한다.

```text
Haki Weight = 0.5
Effective Haki Contribution = Raw Haki Contribution × 0.5
Final Stat = min(100, Base Score + Effective Haki Contribution)
Overall = arithmetic mean of 8 Final Stats
```

Raw 값은 삭제하거나 축소하지 않는다. Capability confirmed만으로 자동 Contribution을 만들지 않으며 양의 Raw Contribution은 실제 Application Evidence를 요구한다. Haki Weight 0.5는 Canon 상수가 아니라 Calculation Model Version에 종속된 실험적 파라미터다.

## 35.4 Conditional Peak Performance
서로 배타적인 상태의 Peak Performance를 동시에 상시 유지 가능한 평균 성능처럼 계산하지 않는다. King의 Flame ON 고방어와 Flame OFF 고속은 각각 실제 성능을 인정하되 두 Peak를 동시에 발휘하는 것으로 해석하지 않는다.

## 35.5 Evidence coverage와 능력 수준의 분리
Evidence 부족은 능력 부족의 직접 증거가 아니다. Haki Capability 보유, 실제 Application Evidence, Evaluation Contribution을 구분한다. Score와 Evidence Coverage / Confidence를 별도 필드로 관리하는 구조는 후속 설계 후보로 남긴다.

## 35.6 v0.1.21 calibrated draft
- Marco: 81.125
- King: 80.75
- Katakuri: 81.50

이 숫자와 순위는 목표값이 아니라 독립 평가 결과이며 official로 승격하지 않는다.


## 35.7 Multi-stat Evidence rule

하나의 Canon Evidence가 여러 Stat과 관련되는 현상 자체를 금지하지 않는다. 실제 전투 장면은 공격·방어·숙련·판단 등 여러 의미를 동시에 가질 수 있다.

다만 다음 규칙을 적용한다.

- 각 Stat 연결은 서로 다른 평가 의미를 설명해야 한다.
- 동일한 관찰 사실을 같은 이유로 여러 Stat에 복제하여 점수를 증폭하지 않는다.
- 직접 핵심 성과는 `primary`, 의미 있는 보조 성과는 `secondary`, 해석·조건 구분용 정보는 `context`로 둔다.
- Special Ability가 제공한 메커니즘과 그 메커니즘으로 실제 달성한 Attack / Defense / Stamina 성과는 분리할 수 있으나, 같은 성과를 각 항목에서 동일 강도로 반복 가산하지 않는다.
- Evidence coverage가 많은 캐릭터가 자동으로 높은 점수를 받지 않도록 각 Evidence의 의미와 중복 여부를 우선 검토한다.

## 35.8 Final calibration refinement

추가 Canon 검토 후 v0.1.21 draft를 다음과 같이 보정한다.

```text
Marco     81.125
King      80.75
Katakuri  81.50
```

핵심 변경:
- Marco: Attack 결정력은 보수적으로 유지하되 Armament 실제 적용을 최소 Raw +2로 반영. Kizaru / Akainu / King / Kaido 공격 차단 장면을 Defense에 추가하고, Garp 저지·해루석 수갑 상황도 한계와 Combat Context로 함께 저장한다.
- King: 카류돈 계열 고화력 공격을 반영해 Attack을 높게 유지하되 Flame ON Defense / Flame OFF Speed의 상호 배타성과 루나리아 메커니즘의 다중 Stat 중복을 억제한다.
- Katakuri: Snakeman전의 순수 전투 속도와 Gear 4 선제 차단·상대 분석을 보강하고, Mochi 능력 자체보다 높은 운용 숙련이 핵심이라는 점을 Technique / Special Ability 경계에 반영한다.

## 35.9 Private-development deployment policy

현재 단계에서는 외부 공유를 하지 않는다. main push에서는 `npm install → npm test → npm run build`까지만 자동 검증하며 Pages configure/upload/deploy는 실행하지 않는다.

향후 각 해적단의 주요 최고간부 2~3명이 충분히 추가되어 외부 공유 단계에 들어갈 때 저장소 Pages를 GitHub Actions source로 활성화하고 workflow를 수동 실행한다.
