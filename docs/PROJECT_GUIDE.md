# 원피스 전투력 분석 — 처음 보는 사람을 위한 프로젝트 가이드

> 기준: **v0.1.27** 구현과 27인 v0.1.26 Draft 평가 데이터.  
> 대상: ONE PIECE를 아는 일반 사용자 + 코드를 처음 인계받은 개발자.  
> 주의: 자동 test/build 및 GitHub Pages 배포와 실제 기기 시각 검증은 서로 다른 검증 단계다.

> **현재 핵심 구조:** 27인 7-Core Balanced 1.2 + 공식 identity(주표기 이름/통칭/이명/칭호) + Evaluation subject-state + Evidence-aware Matchup v0.1. 상세 재보정은 [v0.1.26 보고서](RECALIBRATION_0_1_26_DRAFT.md), Matchup 구조는 [Matchup v0.1](MATCHUP_MODEL_0_1_DRAFT.md)을 참조한다.

## 1. 이 프로그램은 무엇인가?

「원피스 전투력 분석」은 ONE PIECE 캐릭터의 전투 성과를 **원작의 사실 → 전투 조건 → 해석 → 7개 능력 평가 → 계산 결과**로 연결하는 개발 중인 웹앱이다.

흔한 티어표와 달리, 단순히 누가 이겼는지, 직책·현상금이 얼마인지, 인기가 얼마나 높은지로 점수를 정하지 않는다. 같은 승리나 공격 성공이라도 상대의 부상·피로·보호 임무, 참전 인원, 기습, 지형과 외부 개입을 살핀다. 점수가 높다는 결론만 보여주는 대신 **어떤 장면을 어떻게 해석했는지 추적**할 수 있도록 만드는 것이 목표다.

프로젝트 내부에서 다음 다섯 가지는 별개다.

1. **Canon Fact**: 원작에서 실제 확인되는 사건·행동·결과
2. **Combat Context**: 그때의 전투 구조, 목적, 부상·피로, 전장, 외부 개입 등
3. **Interpretation**: 사실과 조건으로부터 도출한 설명·추론
4. **Evaluation**: 각 Core Stat에 부여한 프로젝트의 평가 및 근거
5. **Community Opinion**: 팬들의 의견·투표. 평가 점수를 자동으로 바꾸지 않음

**숫자는 ONE PIECE 공식 설정이나 작가가 공인한 전투력 수치가 아니다.** 버전이 붙은 프로젝트의 분석 결과다.

## 2. 웹앱 화면 읽기

현재 구현은 여러 URL 페이지를 오가는 구조가 아니라, **캐릭터를 선택하면 같은 화면의 상세 콘텐츠가 바뀌는 형태**다. 주요 코드는 `src/ui/App.tsx`, `src/ui/pages/CharacterPage.tsx`와 `src/ui/components/`에 있다.

### 2.1 캐릭터 선택

화면 상단에는 **집단 선택 탭(crew/group tabs)**이 있고, 선택한 집단 소속 캐릭터가 그 아래 **이름 버튼(character chips)**으로 나온다. 집단 탭을 누르면 그 집단의 첫 캐릭터가 선택되며, 캐릭터 이름을 누르면 상세 정보를 바꾸도록 구현되어 있다. 초기 선택은 목록의 첫 캐릭터인 **마르코**다.

집단은 해적단뿐 아니라 해군·전 칠무해도 포함한다. 목록과 상세는 레거시 Crew가 아니라 Group/Membership을 사용하며 27인 조회를 자동 검증한다. 상단 검색은 **주표기 이름·공식 통칭/이명/칭호·소속**을 대상으로 한다. Matchup은 현재 비수치 Evidence factor prototype이며 자동 승률 화면은 아직 없다.

### 2.2 캐릭터 상세에 표시되는 정보

현재 `CharacterPage.tsx`는 PC에서 **종합점수·7 Core Stat / 전투 프로필**을 나란히 배치하고, 하단 **평가 근거·계산식 / 전투 기록·Evidence** 탭을 전환하는 구조다. 모바일에서는 상단이 세로로 배치된다. 하단 탭 내용은 내부 스크롤 영역에서 읽을 수 있도록 설계했다(실기기 검증 전).

주요 화면 정보:

| 영역 | 무엇을 읽는가 |
|---|---|
| 캐릭터 identity 및 평가 상태 | 공식 주표기 이름, 소속, 확인된 통칭·이명·칭호, `draft` 상태. 특정 시점 평가면 전성기 등 subject-state 표시 |
| **전투 프로필** | 전투 방식, 특수 전투요소(Special Combat Profile), 패기 보유·확인 상태, Canon Profile 근거 |
| **Overall Combat Power** | 현재 Balanced 모델로 계산한 종합 점수. 화면에서는 소수점 한 자리로 표시 |
| **Core Combat Stats** | 7개 최종 스탯. **스탯 점수/이름 클릭** 시 27명 전체의 해당 Final 스탯 순위(동점 공동 순위)를 팝업으로 표시하며 캐릭터 이름을 누르면 그 캐릭터로 이동. `?` 버튼은 기존 정의·평가 범위 표시 |
| **평가 근거 연결(Evaluation Trace)** | 하단 기본 선택 탭. 각 Stat에 `Base + (Raw Haki × Weight = Effective) = Final` 계산식, 평가 이유와 연결 출처 표시 |
| **전투 기록(Battle & Canon Evidence)** | 하단 다른 탭. 연결 전투 목록에서 항목을 선택하면 전투 조건과 Evidence가 펼쳐짐 |

전투 기록은 연결된 Evidence가 있는 전투를 `chronologyOrder` 순서로 배열한다. 최초 진입 시 첫 전투 항목이 열리도록 코드가 작성되어 있다. 전투 제목·전투 구조·연결 근거 수를 보고 항목을 펼치거나 닫을 수 있다.

열린 전투에는 **전투 구조 / 목적 / 의도 / 환경 / 제한 조건 / 외부 요인 / 결과**가 나타나고, Evidence 카드에는 **원작 출처 / 근거 강도 / 사실 / 해석 / 평가 영향 / 불확실성 / 관련 스탯 역할**이 표시된다. 일부 개별 참가자의 상세 건강·피로 상태는 데이터 타입에 있어도 현재 이 UI에서 모두 표시하지는 않는다.

### 2.3 점수와 평가 근거를 확인하는 순서

1. 집단 탭과 캐릭터 이름 버튼을 선택한다.
2. 전투 프로필에서 고유 능력 및 패기 **확인 상태**를 본다.
3. Overall을 확인하되, **전체 전투력이나 1대1 승률과 동일시하지 않는다.**
4. **스탯 이름/점수**를 누르면 해당 스탯의 27인 Final 순위가 팝업으로 열리고, `?` 버튼은 **포함하는 내용 / 따로 평가하는 내용**을 알려준다.
5. 하단 **평가 근거·계산식** 탭에서 항목별 `Base + (Raw × 0.5) = Final`, 평가 이유와 원작 출처를 확인한다.
6. 하단 **전투 기록·원작 Evidence** 탭을 선택해 전투를 펼치고 **전투 맥락, 사실, 해석, 한계**를 대조한다.

Evidence는 그 자체로 점수를 자동 변경하지 않는다. Evaluation에 연결되고 평가자가 해석해야 점수에 반영된다.

## 3. 일곱 가지 Core Stat

각 스탯은 **0~100**이며, 서로 다른 개념을 측정하려고 한다.

| Core Stat | 쉬운 뜻 | 중요한 구분 |
|---|---|---|
| **Attack / 공격력** | 상대에게 실제로 유효한 피해를 주거나 방어를 뚫고 마무리하는 능력 | 완력(Strength), 공격 범위(Area of Effect), 기습 적중만으로 높은 Attack 확정 불가 |
| **Defense / 방어력** | 피하기·막기·차단·피해 줄이기 및 조건부 방어 성과 | 이미 입은 상처의 재생 능력을 무조건 Defense에 더하지 않음 |
| **Stamina / Endurance / 체력·지구력** | 피로와 소모가 쌓여도 계속 싸우고 능력을 사용할 수 있는가 | 공격 한 번을 막는 것은 Defense와 구분 |
| **Speed / 속도** | 이동·반응·공격·회피·접근·이탈의 속도와 기동성 | 예측 능력이나 순간이동을 순수 신체 속도에 자동 중복 반영하지 않음 |
| **Technique / Mastery / 기술·숙련도** | 검술·체술·능력 등을 정확하고 정교하게 다루는 숙련 | 기술의 존재, 기술 사용 판단, 전투 방식의 폭과 구분 |
| **Combat IQ / 전투 지능** | 전장 파악, 상대 분석, 순간 판단, 전술·능력 선택 | 일반 학식이나 기술 보유 수와 구분 |
| **Versatility / 다재다능함** | 근거리·원거리·방어·지원·기동 등 여러 역할과 상황에 대응하는 폭 | 여러 능력의 단순 보유 수가 아니라 **실제로 확인된 적용 폭**이 중요 |

예를 들어 마르코의 불사조 능력은 **Special Combat Profile**에 적지만, 강한 공격을 실제로 차단한 장면은 Defense, 오래 싸우고 다시 개입한 장면은 Stamina, 지원과 역할 전환은 Versatility에 연결할 수 있다. **같은 사실을 별도 이유 없이 여러 축에서 중복 점수화하지 않는다.**

## 4. 점수는 어떻게 계산되나?

현재 계산 모델은 **Balanced 1.2**, 7개 Final Core Stat의 **단순 산술평균**이다. Attack 등 특정 스탯에 별도 높은 가중치를 두지 않는다.

```text
Raw Haki Contribution = 해당 Stat에 연결된 실제 패기 활용 기여의 합
Effective Haki Contribution = Raw Haki Contribution × 0.5
Final Stat = min(100, Base Stat + Effective Haki Contribution)

Overall Combat Power
= (Attack Final + Defense Final + Stamina Final + Speed Final
   + Technique Final + Combat IQ Final + Versatility Final) / 7
```

- **Base**: 패기 기여를 별도 분리하기 전 평가자가 그 스탯에 부여한 기초값
- **Raw Haki**: 실제 패기 적용 근거를 연결해 부여한 기여 원값. 현재 스탯별 Raw 총합 상한은 **+10**
- **Haki Weight = 0.5**: 프로젝트 계산 모델의 계수. 원작이 제시한 객관적 상수가 아님
- **Effective Haki**: Raw × 0.5. 예: Raw +6 → Effective +3
- **Final**: Base + Effective를 100으로 제한한 실제 스탯 점수
- **Overall**: 7개 Final의 평균이며 화면에서는 한 자리 소수로 표시

패기를 *보유했다는 사실만으로* 자동 가산하지 않는다. 실제 전투에서 **어떤 패기가 어떤 Stat에 기여했는지** 원작 Evidence로 연결해야 한다. 패기 보유가 `unclear`이면 **비보유로 확정된 것이 아니며** 정보 부족만으로 감점하지 않는다.

**Special Combat Profile**에는 악마의 열매, 종족 특성, 특수 생리, 개조, 장비, 과학기술 등을 **비수치 정보**로 보존한다. 별도의 “특수능력 점수”를 전체 평균에 더하면 해당 능력이 Attack·Defense 등에 미친 실제 성과와 중복 계산될 수 있으므로 직접 가산하지 않는다. 특수 능력이 만든 *검증 가능한 결과*만 적절한 Core Stat 근거로 사용한다.

### 계산 예시

조로의 현재 Final 7축은 `90 / 83 / 87 / 83 / 87 / 82 / 82`이다. 합계 `594`를 7로 나누면 **84.857142…**, 화면 표기는 **84.9/100**이다. 이는 프로젝트 내의 **draft 평균값**이지 “조로의 공식 전투력 84.9”라는 뜻이 아니다.

## 5. Evidence는 어떻게 점수로 이어지나?

```text
원작 출처·Canon Fact
        ↓
Battle / Combat Context
        ↓
Interpretation + Uncertainty
        ↓
Evaluation (Stat별 rationale, evidenceIds, 패기 활용 기여)
        ↓
Final Stat (Base + Effective Haki, 100 상한)
        ↓
Balanced Overall (7개 Final 평균)
```

**Battle**에는 전투의 전체 조건을 저장하고, **Evidence**에는 특정 캐릭터에 대한 개별 관찰·해석을 연결한다. Evidence의 스탯별 역할은 `primary`(주요 근거), `secondary`(보조 근거), `context`(상황 참고)로 구분한다. 이 역할은 고정 배율이 아니라 **해석의 중요도 표지**다.

**Evaluation**은 Stat별 `rationale`(점수를 정한 이유), `evidenceIds`, Base 및 패기 기여를 기록한다. 따라서 출처가 존재한다고 해서 숫자가 자동으로 올라가지 않으며, 직접 관찰 가능한 사실·전투의 불리한 조건·추론의 한계를 함께 설명해야 한다.

### 실제 사례: Attack ≠ Strength ≠ Area of Effect

- **지저스 바제스(Burgess)**: 산을 들어 던진 것은 **높은 완력의 근거**다. 그러나 그 규모만으로 사보 같은 강자에게 높은 유효 피해를 준 Attack 성과로 등치할 수 없다. 드레스로자 사보전의 한계도 함께 고려한다.
- **아발로 피사로(Pizarro)**: 섬과 동화한 거대한 공격과 전장 통제력은 확인된다. 그러나 공격 크기 자체가 **동급 강자를 실제로 손상시킨 Attack**을 증명하지는 않는다. 하치노수에서 가프의 Galaxy Divide와 코비의 Honesty Impact가 **연속으로** 섬 신체에 영향을 준 맥락을 보존한다.
- **시류(Shiryu)**: 투명화한 채 코비를 노렸고 **가프가 보호 목적으로 대신 개입**하며 관통되었다. 시류는 직후 가프의 반격을 받았다. 이는 기습의 성공을 보여주지만 **가프를 정면에서 압도했다**는 증거로 바꾸지 않는다.
- **마르코(Marco)**: 상대의 강한 화력을 막거나 아군을 보호한 실제 장면은 Defense에 연결할 수 있지만, 불사조의 **재생이라는 능력 보유 자체**를 방어에 자동 가산하지 않는다.
- **크래커(Cracker)**: 병사 생성과 운용의 폭 및 전투 지속력을 별도 축에서 검토한다. 실제 결투의 상대·소모와 상성 조건을 삭제한 채 공격 규모나 병사 수를 Attack에 직접 환산하지 않는다.

### 그 밖의 평가 사례

- **Prime 가프(Garp)**: Roger와 경쟁하던 전성기를 대상으로 평가한다. 하치노수 노년 가프의 기술·전투는 직접 확인된 사건이지만, 이것을 Prime 수치로 연결할 때는 **시점 차이를 고려한 추론**이 필요하다.
- **샹크스(Shanks)**: 제한된 직접 전투 표본과 높은 성과를 함께 평가하며, 칭호·서사 기대감만으로 7축을 자동으로 채우지 않는다.
- **조로(Zoro)**: 원작의 실제 검술·패기 성과에 따라 Attack과 Technique를 별도로 평가한다. 미래 성장 기대치는 현재 점수에 포함하지 않는다.
- **티치(Teach)**: 어둠어둠 열매 + 흔들흔들 열매의 조합은 인정하지만, 열매 보유만으로 전성기 흰수염 수준 숙련이나 Versatility 99~100을 자동 부여하지 않는다. 에이스전·로전 등 실제 운용을 우선한다.

## 6. 점수 해석의 주의점

**Overall이 근소하게 높다고 누구에게나 1대1로 이긴다는 뜻은 아니다.** 7개 축의 단순 평균은 상황별 능력 상성, 공격이 실제로 통하는지, 전장과 거리, 사전 정보, 전투 목적 등을 모두 승률로 환산한 모델이 아니다. 프로젝트의 장기 Matchup 개념과 현행 Balanced Overall은 분리해야 한다.

특히 기억할 것:

- **1~2점 차이**를 무조건적인 절대 서열로 보지 않는다.
- **Evidence 부족 ≠ 약함.** 확인된 장면이 적다면 확실하지 않다고 표시하거나 평가 자체를 보류한다.
- **Prime**은 가장 신뢰할 수 있는 최고 전투 상태를 기준으로 하되, 서로 다른 시점의 **동시에 성립 불가능한 최고 능력**을 합성하지 않는다. 킹의 불꽃 ON 방어 최고치와 불꽃 OFF 속도 최고치를 동시에 상시 유지하는 것처럼 계산하지 않는다.
- **현재와 미래를 구분**한다. 앞으로 강해질 전망은 현재 Stat을 미리 올릴 이유가 아니다.
- **draft / official은 출처의 확신도가 아니라 Evaluation 승인 상태**다. 현재 27명 모두 `draft`다.
- **E1 / E2 / E3는 근거 충실도에 관한 운영상 readiness 구분**으로, 현행 `Evaluation.status`의 `prototype / draft / official`와는 **다른 개념**이다. 현재 UI에 E1~E3 배지가 구현됐다고 해석하면 안 된다.

| readiness | 이 프로젝트에서의 뜻 | 처리 |
|---|---|---|
| **E1** | 상대적으로 직접 전투 근거가 충분한 평가 단계 | 평가 가능하더라도 현행 `draft`는 공식 확정 아님 |
| **E2** | 7축을 산정할 수 있으나 일부 축의 직접 근거가 약한 단계 | **provisional draft**, 후속 Evidence로 변동 가능 |
| **E3** | 7축 산정에 필요한 Evidence 자체가 크게 부족한 단계 | 억지 점수를 만들지 않고 **미평가**로 둠 |

현재 검은수염 해적단의 운영 분류는 **티치 E1**, **시류·바제스·반 오거·피사로 E2**, **도크 Q E3**다. E3 미평가자는 아래 **27명 UI 평가 로스터에 포함되지 않는다**.

## 7. v0.1.27 평가 로스터

아래는 `sampleCharacters`, `sampleMemberships`, `getCharacterList.test.ts` 및 현재 Evaluation 데이터 기준 **8개 UI 집단 / 총 27명**이다.

| 집단 | 선택 목록에 있는 캐릭터 |
|---|---|
| 흰수염 해적단 (3) | 마르코, 죠즈, 비스타 |
| 백수 해적단 (3) | 알베르(통칭 킹), 퀸, 잭 |
| 빅맘 해적단 (3) | 샬롯 카타쿠리, 샬롯 스무디, 샬롯 크래커 |
| 밀짚모자 일당 (3) | 롤로노아 조로, 상디, 징베 |
| 빨간 머리 해적단 (1) | 샹크스 |
| 해군·전 해군 (6) | 몽키 D. 가프, 사카즈키, 쿠잔, 보르살리노, 잇쇼, 아라마키 |
| 검은 수염 해적단 (5) | 마샬 D. 티치, 지저스 바제스, 시류, 반 오거, 아발로 피사로 |
| 왕의 부하 칠무해 (3) | 트라팔가 로, 돈키호테 도플라밍고, 보아 핸콕 |

`sampleGroups`에는 로저 해적단·혁명군·세계정부·크로스 길드 등 **앞으로 활용할 집단도 등록**되어 있지만, 등록만으로 UI 탭이 생기는 것은 아니다. 현행 탭은 **Membership이 있는 평가 로스터**에서 만들어진다. 또한 `sampleCrews`는 아직 최초 3개 해적단만 포함하는 **레거시 배열**이다.

### 현재 대표 Overall (7축 Final의 실제 계산 기대값)

| 캐릭터 | Overall | 설명 |
|---|---:|---|
| 전성기 몽키 D. 가프 | 94.429 | God Valley 직접 근거 + 노년 하치노수 보조 근거 |
| 샹크스 | 92.571 | 확인된 직접 성과를 우선 |
| 사카즈키 | 92.429 | 정상결전·쿠잔 10일 결투 등 |
| 보르살리노 | 92.143 | 빛 기반 속도·에그헤드 성과 |
| 쿠잔 | 91.857 | 빙결·근접전·장기전 성과 |
| 마샬 D. 티치 | 90.571 | 두 열매의 실제 운용 평가 |
| 트라팔가 로 | 86.429 | 각성 내부파괴와 공간 조작 |
| 롤로노아 조로 | 84.714 | Attack 90, Technique 87 등 |
| 마르코 | 81.714 | 지원·방어·전투 지속 근거 |

전체 27명의 현재 수치와 버전별 변화는 루트 `README.md`, `CHANGELOG.md`, `src/data/sample/evaluations.ts` 및 `src/domain/calculation/calculateCombatPower.test.ts`에서 확인한다. **이 표 자체가 별도 데이터 원본(source of truth)은 아니다.**

## 8. 후속 개발자를 위한 코드 안내

### 8.1 디렉터리와 실제 데이터 흐름

| 위치 | 역할 |
|---|---|
| `src/domain/` | Character·Group·Membership·Battle·Evidence·Evaluation·Haki·Calculation의 타입·규칙·검증 |
| `src/data/sample/` | 현재 실제로 사용되는 로스터·전투·근거·평가 및 계산 모델 데이터 |
| `src/data/repositories/` | 도메인별 데이터 접근 인터페이스와 구현 |
| `src/application/` | 화면에 필요한 조회 및 평가 계산 조합 |
| `src/ui/App.tsx` | 집단 탭과 캐릭터 선택 상태 |
| `src/ui/pages/CharacterPage.tsx` | 캐릭터 상세 구성 |
| `src/ui/components/` | 전투 프로필·7축·근거 추적·전투 타임라인 UI |
| `src/ui/styles.css` | 레이아웃·반응형 스타일 |
| `.github/workflows/deploy-pages.yml` | CI 검증과 조건부 GitHub Pages 배포 |
| `PROJECT_SPEC.md` / `CHANGELOG.md` / `TEST_REPORT.md` | 설계 기준 / 변경 이력 / 과거 검증 기록 |

```text
Character ──(CharacterMembership)── Group
    │
    ├── CombatProfile / Haki / SpecialTraits
    ├── Battle ── Evidence (subjectCharacterId, battleId)
    └── Evaluation (7 EvaluationItems → evidenceIds)
                          │
                          └── Balanced CalculationModel 1.2
                                   ↓
                           Final Stats → Overall
```

관계의 실제 접근 경로는 다음과 같다.

- 목록: `App → getCharacterList → characterRepository + groupRepository → characters / groups / memberships`
- 상세: `CharacterPage → getCharacterDetail → characterRepository + groupRepository(Group/Membership) + evaluationRepository` (현재 선택된 groupId 전달)
- 전투: `getCharacterBattleTimeline → evidenceRepository → battleRepository`
- 평가 추적: `getCharacterEvaluationTrace → EvaluationItem.evidenceIds → getCharacterEvidence`
- 계산: `getCombatPower → calculationModelRepository + evaluationRepository → calculateBalancedCombatPower`

각 Stat 비교 UI는 `src/application/getStatRanking.ts`에서 실제 평가 로스터와 Balanced 모델의 **Final**을 조회해 점수순으로 정렬한다. 신규 평가 대상 추가 시 순위 팝업 및 24명 가정이 포함된 테스트도 검토한다.

현재 `sampleCharacters`는 사실상 **Master Pool**과 **UI 평가 로스터** 역할을 함께 맡는다. E3 같은 **미평가 캐릭터를 단순히 여기에 추가하면**, 캐릭터 상세의 필수 Evaluation 전제 및 통합 테스트에 영향을 준다. 두 역할을 분리하는 구조 변경은 영향 분석 없이 하지 말 것.

### 8.2 새 캐릭터를 평가 로스터에 추가할 때

현재 모델에 맞추는 순서는 다음과 같다. 단순한 역할·집단 등록이나 **E3 미평가 등록**과 구별한다.

1. **기존 데이터와 유사 사례 확인**: `PROJECT_SPEC.md`, `characters.ts`, `groups.ts`, `memberships.ts`와 현재 평가 기준을 먼저 읽는다.
2. **소속 관계 결정**: 새 Group이면 `groups.ts`에 추가하고 `memberships.ts`에 `characterId ↔ groupId`를 연결한다. 현재 `crewId`도 레거시 호환을 위해 남아 있다.
3. **Character·CombatProfile 등록**: `characters.ts`에 고유 `id`, `name`, `crewId`, `combatStyles`, `specialTraits`, `haki.capabilities`, `sources`를 실제 확인 근거에 맞게 등록한다. 모르면 `unclear`로 남긴다.
4. **전투 조건 기록**: `battles.ts`에 Battle의 `id`, `chronologyOrder`, 전투 구조·목적·의도·환경·제한·외부 개입·결과를 기록한다. `participantIds`를 추가했다면 대응 `sampleBattleParticipants`도 함께 작성한다.
5. **Canon Evidence 등록**: `evidence.ts`에 고유 `id`, 존재하는 `battleId`, 평가할 주체의 `subjectCharacterId`, `source`, `fact`, `interpretation`, `evaluationImpact`, `uncertainty`, `statContributions`를 연결한다.
6. **Evaluation은 근거가 충분할 때만**: `evaluations.ts`에서 각 Stat의 Base, rationale, 같은 캐릭터 소유의 Evidence ID와 실제 패기 활용 기여를 등록한다. 현재 `item()` helper가 Final을 계산한다. 신규 데이터는 기본적으로 검토 전 `draft`로 둔다.
7. **연결 무결성과 테스트 갱신**: `getCharacterList.test.ts`, `threeCrewData.test.ts`, `calculateCombatPower.test.ts`의 로스터·계산 기대값을 **의도적인 실제 데이터 변경에 맞춰** 갱신한다. 필요하면 신규 캐릭터 상세 조회 테스트를 추가한다.
8. **변경 결과 검수**: 기존 24명 데이터·Overall, 로스터 순서, Crew/Membership 연결, Battle/Evidence 참조 및 화면 선택 상태가 깨지지 않았는지 확인한다.

**E3는 7개 Base를 추측으로 채워 넣는 방식으로 추가하지 말 것.** 미평가 캐릭터도 화면에 보여주려면 `getCharacterDetail`의 Evaluation 필수 전제, 로스터 모델과 UI의 빈 상태를 설계·검증하는 작업이 먼저 필요하다.

### 8.3 Evidence 추가 시 지킬 구분

`Evidence`는 다음 필드를 구분해 작성한다.

- `source.type`, `reference`, `description`: 원작 출처와 장면 설명 (공식 본편과 보조자료·커뮤니티 구분)
- `fact`: 직접 확인된 사실만
- `battleId`: 해당 장면이 발생한 전투와 조건
- `interpretation`: 사실이 시사하는 바 **및 추론의 한계**
- `evaluationImpact`: 어떤 스탯 평가에 어떤 의미가 있는가
- `uncertainty`: 해석할 때 남는 불확실성
- `statContributions`: `stat`, `role(primary / secondary / context)`, `note`

근거를 추가해도 `EvaluationItem.evidenceIds`에 연결하지 않으면 해당 Stat의 Trace 근거로 표시되지 않는다. 실제 패기 기여를 적용하려면 그 `HakiStatContribution.evidenceIds`가 **같은 캐릭터의 유효한 Evidence**이고 **해당 Item의 evidenceIds에도 포함**되어야 한다. Special Trait의 `evidenceIds`도 동일 캐릭터 소유인지 검사한다.

### 8.4 Overall 변경·테스트의 안전한 순서

스탯이나 계산 모델을 무심코 바꾸지 않는다. 근거가 바뀌어 평가 수정을 승인한 경우:

1. `evaluations.ts`의 바뀌는 **Stat·Base·rationale·Evidence**부터 기록한다.
2. 패기 기여가 있다면 `score.ts`의 `Raw × 0.5`, 스탯별 Raw 최대 +10, Final 100 상한을 만족하는지 확인한다.
3. `calculateCombatPower.test.ts`의 기대 Overall을 계산식으로 재검산하되, **테스트를 통과시키려고 원래 Evidence 의미나 점수를 왜곡하지 않는다.**
4. `validateEvaluation`, `validateCombatProfile`, `validateMemberships`, `validateBattle`, Evidence 참조 테스트와 기존 캐릭터 회귀를 확인한다.
5. 결과가 바뀌었을 때만 관련 버전·CHANGELOG 등 기록을 실제 수정에 맞춰 갱신한다. 계산 모델 자체를 바꾼다면 모델 버전, 전체 결과·테스트 영향과 롤백 기준을 따로 검토한다.

최근 회귀 사례: `v0.1.23`에서는 배열 연결부에 **`},,`가 들어가 배열 hole이 생기면서** Battle/Evidence 순회 테스트가 실패했다. 대량 데이터 추가 후에는 문법 통과뿐 아니라 **실제 참조 무결성·배열의 빈 원소 여부**도 확인해야 한다.

### 8.5 실행과 검증 (현재 `package.json` 기준)

**Windows PowerShell**

```powershell
git switch feature/straw-hat-trio-data
npm.cmd install
npm.cmd run dev
```

개발 서버가 표시하는 로컬 주소로 접속한다. README에 기록된 기본 접속 주소는 **http://localhost:5173**이다.

```powershell
npm.cmd test
npm.cmd run build
# 선택: production build의 로컬 미리보기
npm.cmd run preview
```

`npm.cmd run build`는 내부에서 `tsc -b && vite build`를 실행하고, `npm.cmd test`는 `vitest run`을 실행한다. 다른 셸에서는 동일한 `npm` 스크립트를 사용할 수 있다.

**기준 CI**: HEAD `55811c8a5865aeed30520f047199f1c29c3079cf`의 GitHub Actions run `37728788499`에서 `npm install`, **13 test files / 54 tests**, production build PASS. Pages configure/upload/deploy는 SKIPPED. 이 기록은 **문서 추가 이전 기준**으로, 새 문서 커밋에서 재실행한 로컬 테스트 결과를 뜻하지 않는다.

## 9. 현재 개발 단계와 확인된 한계

- **MVP 개발 중**이며 **24개 Evaluation 모두 draft**다. 공식 확정(`official`)으로 선언하지 않는다.
- E2인 시류·바제스·반 오거·피사로의 값은 **provisional**이다. 신규 근거가 나오면 기존 값을 고집하지 않고 재검토한다.
- 도크 Q(E3), 라피트·카타리나 데본·바스코 샷·산후안 울프 등은 현재 7축 근거 부족으로 수치 평가를 만들지 않았다.
- **상세 조회 수정:** 기존 `crewRepository`의 3개 집단 제한을 Group/Membership 조회로 교체하고 24인 전체 및 신규 4개 집단의 자동 테스트를 추가했다. 실제 브라우저·모바일 수동 조작 결과는 별도 확인 대상이다.
- **버전 문구 수정:** 과거 하드코딩된 `v0.1.22` 대신 해당 캐릭터의 실제 `evaluationDataVersion`을 표시한다. 이는 앱 버전 자체와 다를 수 있다.
- 등록된 Group 전체가 메뉴로 표시되지는 않는다. 매치업 자동 승률 예측, 투표가 점수를 자동 조정하는 시스템, 관리자 편집·게시·이력 관리, 서버 DB, 로그인은 **현재 구현으로 확인되지 않았다.** 검색 UI는 주표기 이름과 공식 통칭·이명·칭호·소속을 지원한다.
- **브라우저/모바일 실제 수동 조작과 반응형 레이아웃 검수는 아직 수행되지 않았다.** CSS가 존재하는 것과 실제 기기에서 보기에 적절한지는 다르다.
- GitHub Pages는 공개 사이트 운영 단계로 전환되어 Pull Request에서는 test/build만 수행하고, 성공한 main push에서는 Pages를 자동 배포한다. 배포 성공과 실제 기기 시각 검증은 별개다.

### 다음 단계로 권장하는 최소 검증

1. **PC/모바일 수동 검수**: 8개 집단 전환과 27명 선택, 상단 2열 레이아웃, 각 스탯 순위 팝업과 캐릭터 이동, 하단 탭 전환, 내부 스크롤 및 긴 텍스트 줄바꿈 확인.
2. **통합 회귀**: 신규 Group/Membership 상세 조회, 7축 계산식, 27인 순위 정렬, 기존 Evidence Trace·전투 목록이 모두 정상인지를 자동/수동으로 확인.
3. **다음 기능은 별도 합의 후**: E3 미평가자 표시, roster / master pool 분리, 검색, 비교·매치업, Evidence coverage 표시. 기존 데이터·평가를 조용히 재구성하지 않는다.

---

## 문서와 출처

프로젝트의 기준은 외부 팬덤 티어표가 아닌 **현재 저장소의 원본 데이터·구현**이다.

- [PROJECT_SPEC.md](../PROJECT_SPEC.md) — 제품 목적·평가 원칙·전투 모델
- [README.md](../README.md) — 현재 평가 로스터·실행 요약
- [CHANGELOG.md](../CHANGELOG.md) — 버전별 추가·변경·알려진 문제
- [TEST_REPORT.md](../TEST_REPORT.md) — 과거 버전 검증 기록 (최신 CI와 혼동하지 말 것)
- [src/data/sample/](../src/data/sample/) — 사실·전투·평가 데이터
- [src/domain/](../src/domain/) — 모델 타입·스탯 정의·검증·계산
- [src/application/](../src/application/) — UI와 도메인 연결
- [src/ui/](../src/ui/) — 실제 화면 구성

ONE PIECE 원작 장면의 개별 출처는 각 `Evidence.source.reference`와 `CombatProfile.sources`에 기재되어 있다. 출처 기록과 해석은 구분해서 검토한다.
