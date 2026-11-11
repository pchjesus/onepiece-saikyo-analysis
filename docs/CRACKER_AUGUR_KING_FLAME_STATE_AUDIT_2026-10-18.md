# 크래커·반 오거의 출처 차이와 킹 Flame ON/OFF 평가 감사 (2026-10-18)

> 기준: main d7aa817e5fbbfdadac74aaa80bf36ffe6961ee6f / 앱 v0.4.31. **검토·설계 후보 문서. 코드·점수·Raw·UI·모델 변경 없음.**

## 1. 원작과 애니메이션의 정보 계층

| 사건 | 근거 | 이 프로젝트에서의 취급 |
|---|---|---|
| 크래커의 본체 무장색 검격이 Gear4 루피에게 유효타, 비스킷 갑옷·군체 방어 | 기존 원작 Manga Ch.837~838 Evidence 및 공식 TV799 | 높은 신뢰의 Attack/Defense/Technique 근거 |
| 나미의 비로 비스킷 연화, 크래커가 11시간가량 계속 병사를 만들며 전투 | Manga Ch.841~842 Evidence·공식 TV805/806 | 높은 능력 지속력. 11시간 본체 직접 피격 내구를 의미하지 않음 |
| 쿠잔·반 오거의 푸딩 납치, 크래커가 얼어붙어 패배 | 만화 표지연재/현재 evidence-cracker-kuzan-freeze-1062-1064 | 결과는 원작 사실, 구체적 개인전 과정은 미공개 |
| 반 오거가 비스킷 병사를 총탄 한 발에 파괴 | 애니1093 추가 묘사, 원작 표지연재에는 없음 | 원작 중심 평가에 Attack/Defense 자동 점수 반영 금지 |
| 장 바르트가 반 오거 탄환을 몸으로 막음 | Manga Ch.1064, 기존 evidence-augur-jean-bart-1064 | 총탄 절대 관통력 확정의 제한 근거 |
| 쿠잔 냉기/습기·반 오거 특수 탄환·크래커 부상 상태 때문에 병사 약화 | 커뮤니티 가설, 직접 인과 미확인 | 상향·하향 근거로 채택 금지 |
| 제작자가 2페이지만 다룬다고 파워밸런스를 무시했다고 말했다 | 사용자 제공 X 링크의 원문 확인 불가. 본인이 회상 애니 장면을 담당했다는 별도 본인 게시물만 확인 | 태도·발언 단정 금지 |

원작에 없는 개별 타격 연출은 애니 공식 제작물일 수 있으나 원작의 확정 전투력 묘사와 구별해야 한다. 특히 원작에서 쿠잔·반 오거가 현장에 있었다는 결과만으로 반 오거가 병사를 원샷한 것으로 역추론하지 않는다.

### 크래커 과대·과소평가 양쪽 검토

- 긍정: 비스킷 병사는 외부 지원군이 아니라 능력자가 직접 생성·경화·조종하는 무력. 높은 병사 내구는 크래커 본인의 악마의 열매 운용·정밀 숙련·방어 시스템을 평가할 직접 사실이다. 본체의 Gear4 검격 유효타 또한 별도 확인된 공격 성과.
- 제한: 병사 내구와 맨몸 내구/완력은 동일하다는 직접 근거 없음. 11시간 병사 생성은 능력 지속의 지구력 근거이지 11시간 맨몸 피격의 증명이 아니다. 동일 병사 효과를 7축에 중복 부여하면 안 된다.
- 현행 Cracker Final [78,82,82,75,83,77,80], Overall 79.6 **유지**. Technique83 / Defense82 / Stamina82 / Vers80의 구별되는 성과에 대한 교차검증은 유효하지만, 사용자 의견·애니1093 추가 연출만으로 기계적 하향하지 않는다.
- 현행 코드 확인: 쿠잔에 얼어붙은 기록은 Defense/IQ에 context로 연결되고 Core Stat의 직접 하향 근거로 사용하지 않는다. 반 오거의 장 바르트 피격 실패도 이미 공격력의 상한 유추를 제한하는 canon Evidence가 있다.

## 2. 킹 ON/OFF 이원화: 숫자보다 상태 의미가 먼저

원작 Ch.1032/1035, 공식 TV1062: 등 뒤 불꽃 ON 상태는 높은 방어, OFF 상태는 높은 기동속도와 낮아진 방어를 의미한다. 이 관계의 **방향**은 확인됐지만 정확한 7축 수치 변화량은 원작에 없다.

| 항목 | ON 방어형 | OFF 고속형 | 주의 |
|---|---|---|---|
| Defense | 상대적으로 최고 방어 | 감소 | ON조차 모든 고급 참격에 무적이라고 단정 불가 |
| Speed | OFF보다 느림 | 상승 | 시전·방어 순간의 ON 최고 방어와 OFF 최고속 동시 사용 불가 |
| Attack | 화염/검술 등 보유 | 화염/검술 등 보유 | 공격 자체가 모드에 비례해 상승/하락한다는 증거 없음 |
| Stamina | 피해 경감은 소모 절약 가능(추론) | 피격 위험 증가 가능(추론) | 체력 자원 자체의 모드별 숫자 차이 확정 금지 |
| Technique/IQ/Vers | 모드 선택·전환 | 모드 선택·전환 | 같은 전환능력을 각 축에 복제해 자동 가산하지 않음 |

현재 King Final [84,88,85,85,83,79,84] / Overall84.0은 단일 평가이며 subjectState가 없다. 기존 rationale은 Defense88의 ON 조건과 Speed85의 OFF 조건을 서술하지만 한 레이더에서 함께 표현하면 **동시 순간 최고 성능으로 오인**할 위험이 있다. 그렇다고 전체 전투 중 상태를 전환할 수 있는 능력에 대한 통합 평가라는 해석까지 부정할 수 없어 즉시 숫자를 하향하지 않는다.

### 실제 구현 전 선택지

1. **A안 권고: 설명형 ON/OFF 패널** — 현행 King Overall84.0·계산식·랭킹을 보존하고 두 상태의 상충 조건을 캐릭터 상세에 표시. 조건의 방향만 표현하고 미승인 숫자 만들지 않음. **UX 변경이므로 사용자 승인 필요.**
2. **B안: ON/OFF 별도 정량 평가 2개** — 정확한 축별 점수 근거, 기본 상태와 랭킹 정의, 상태별 매치업 조건을 먼저 합의해야 함.
3. **C안: 통합 + ON + OFF, 총 3평가** — 통합 전투에서 모드 전환 능력을 보존하는 장점. 하지만 UI 복잡도 및 기존 Ranking의 최고 Overall 상태 자동 선택 로직과 충돌할 수 있어 별도 설계 필요.

현행 앱은 Evaluation.subjectState, getCombatPower의 subjectStateId, CharacterPage 토글, 랭킹 상태 선택을 지원하고 이누/네코 스론 상태 구현 사례가 있다. 다만 스론은 만월 제약 강화, King은 같은 결투의 상충 모드 전환이다. ON/OFF 단순 평균이나 두 최대값의 합산, 최고 Overall 상태의 자동 기본 적용은 금지. APPROVAL 전 모드별 임의 숫자·데이터 버전 변경 없음.

## 3. 다른 9인 감사 쟁점

| 인물 | 후속 확인 내용 | 지금 판정 |
|---|---|---|
| 카타쿠리 | 고급 견문색 Raw6 Defense와 Raw6 Technique가 서로 다른 직접 효과(예측 회피 vs 몸 부분변형)인지, 같은 장면 중복인지 | 원작 컷별 확인 전 유지, Speed/IQ Raw 추가 금지 |
| 비스타 | 공식 미호크 검술 호각은 Technique92를 지지. CombatIQ85는 상대 읽기에서의 강한 추론 E3 | 사실처럼 확정하지 않고 E3 유지 |
| 퀸 | 제르마·역병탄 등 다중 기술계의 범용성84는 접근 가능한 장비·탄약·준비 조건에 의존 | 준비·장비 제한을 Matchup에 별도 명시 |
| 스무디 | 대형 참격의 Attack80은 출력 추론, 유효 대인 적중 미확인. Defense75/Speed74는 E3 임시값 | 상향·하향 근거 부족 인정 |
| 잭 | 5일 전선은 밍크 교대전, 크래커 11시간은 능력 소모전 | 둘 다 Stamina 실제 근거지만 직접 육탄 1:1 시간으로 간주하지 않음 |
| 마르코 | 재생·방어·감염 억제는 분리된 성과일 수도 일부 중복일 수도 있음 | Def88/Stamina86/Vers88 독립 기여 재확인 |
| 죠즈 | 다이아몬드 참격 저항 vs 아오키지 빙결 패배 | 물리 방어 강점 및 원소 상성의 차이를 보존 |

## 4. 실행 범위와 검증 게이트

- 이번 감사에서 app v0.4.31, 캐릭터 평가·Evidence·Raw·모델·18 Matchup·UX·저장 구조·PROJECT_SPEC **전부 그대로 유지**.
- 이후 King UI 설명 패널 또는 숫자 상태 기능을 구현한다면 이 프로젝트의 기존 평가→출처→계산→랭킹→매치업 상태 인자 연결을 검증하고 다른 82명/88개 Evaluation, v0.3.3 baseline 및 모바일 UX 회귀 위험을 점검.
- 향후 출처 분류를 Manga Canon / Official Profile / Anime Adaptation / Anime Original / Staff Commentary / Community Opinion으로 보이는 정책을 제안하되 기존 필드에 무단 반영하지 않는다.
- 공식 근거: https://one-piece.com/character/Charlotte_Cracker/index.html ; https://one-piece.com/anime/o4471/index.html ; https://one-piece.com/anime/o4513/index.html ; https://one-piece.com/anime/o4517/index.html ; https://one-piece.com/anime/65154/index.html ; https://one-piece.com/anime/61675/index.html
- 애니/원작 비교 보조 자료: https://onepiece.fandom.com/wiki/Episode_1093 ; 제작자 자신이 회상 애니메이션 담당 고지: https://www.linkedin.com/posts/henry-thurlow-1abb47a_anime-animation-animator-activity-7162398656355090434-E0yQ ; 사용자 제공 발언 링크(원문 미확인): https://twitter.com/henry_thurlow/status/1760265843047551109

## 5. 후속 공개자료 대조 및 코드 경계 확인 (2026-10-18)

> **이 절은 자료 검증 보강이며 아직 평가 변경 승인이나 실행 결과가 아니다.** 만화 원본 페이지 이미지 전수 대조 및 애니메이션 원본 프레임별 검증을 실시했다고 주장하지 않는다.

### 원작 표지연재·애니메이션·장 바르트 비교

- **원작 표지 1062:** 초콜릿 타운과 주민들의 빙결 장면. https://onepiece.fandom.com/wiki/Chapter_1062
- **원작 표지 1063:** 크래커가 얼어붙은 모습과 푸딩 납치에 대한 브륄레의 반응. https://onepiece.fandom.com/wiki/Chapter_1063
- **원작 표지 1064:** 쿠잔·반 오거가 납치에 관여한 사실. 표지연재 자체에는 반 오거의 '비스킷 병사 원샷'에 해당하는 상세 공방이 없음. https://onepiece.fandom.com/wiki/Germa_66%27s_Ahh..._An_Emotionless_Excursion
- **애니1093:** 표지연재 일부를 회상 전투로 확장하면서 반 오거가 병사들을 총격으로 파괴하는 장면을 추가. 공식 회차 소개는 사건·쿠잔 관여를 설명하지만 총격마다 표적의 상태·탄종·패기까지 입증하지 않는다. https://one-piece.com/anime/65154/index.html ; https://onepiece.fandom.com/wiki/Episode_1093
- **원작 1064 본편:** 장 바르트가 로우를 보호하며 반 오거의 총격을 몸으로 막음. 비교 가능한 탄종·거리가 같다는 근거는 없음. https://onepiece.fandom.com/wiki/Chapter_1064
- **제작 참여 발언:** Henry Thurlow 본인 게시물에서 애니1093 회상의 약 2분간 작화를 맡았다는 사실 확인. https://www.linkedin.com/posts/henry-thurlow-1abb47a_anime-animation-animator-activity-7162398656355090434-E0yQ
- **별도 X 게시물:** https://twitter.com/henry_thurlow/status/1760265843047551109 는 독립적으로 원문/발언 문맥 열람이 되지 않음. '제작진이 설정 오류 인정' 또는 '원작 밸런스를 무시했다'는 확정 사실로 적지 않음.

**판정:** 만화·애니 결과가 서로 다른 정보 밀도를 갖는 것은 확인. 총탄의 관통 성능, 빙결·습기로 병사 내구가 낮아졌다는 인과, 특수 탄약/무장색 사용은 미확인. 기존 Cracker/Van Augur 점수 변경 근거로 삼지 않음. 애니메이션 추가 연출은 원작과 구분하여 정성 provenance로 기록할 수 있음.

### 크래커의 능력에 대한 축별 독립 기능 근거

- **Defense**: 본체 대신 비스킷 갑옷·방진이 실제 공격을 막는 기능. 본체 육체 경도가 같다는 결론 금지.
- **Stamina**: 약 11시간 생산·조작을 유지한 자원 지속. 맨몸이 11시간 직접 공격을 견뎠다는 결론 금지.
- **Technique**: 대규모 생성, 갑옷 조작, 본체 은폐·검술의 제어 정밀도. 병사 개수 자체로 추가 점수 산정 금지.
- **Versatility**: 한 열매를 공격·방어·교란·수적 압박 등에 실제 적용. 동일한 수분 취약성이 여러 역할에 영향을 주는 공유 실패 모드임을 명시.

ONE PIECE.com 공식 캐릭터 소개가 무한 생성·조종 및 통증 회피 갑옷을 설명하며, 공식 TV799/800/805/806 소개가 기어4 교전, 반복 생산, 비에 젖은 병사 경도 감소, 탱크맨 결착을 뒷받침함. https://one-piece.com/character/Charlotte_Cracker/index.html ; https://one-piece.com/anime/o4471/index.html ; https://one-piece.com/anime/o4473/index.html ; https://one-piece.com/anime/o4513/index.html ; https://one-piece.com/anime/o4517/index.html

### 킹: 실제 State/Ranking 구현 점검

- 현재 `Evaluation.subjectState` / `isDefault`와 `getCombatPower(characterId,'balanced',subjectStateId)` 및 `CharacterPage` 상태 전환 UI가 존재함. `evaluationRepository`는 지정 상태가 없으면 `isDefault` 또는 첫 평가를 사용함.
- **중요한 UX 충돌:** `src/application/getStatRanking.ts`의 `getHighestOverallStateIds()`는 여러 Evaluation이 있으면 기본 랭킹 팝업에 최고 Overall 상태를 자동 선택함. 따라서 King의 통합 평가 + ON/OFF 평가를 추가할 경우, `isDefault`로 통합을 지정해도 랭킹 팝업이 ON 또는 OFF 수치 중 높은 상태를 보여줄 수 있음. 승인된 일반 랭킹 정책을 별도 검토해야 함.
- `src/ui/App.tsx`의 `selectedStates`는 React 컴포넌트 메모리 상태이며 해당 코드에 영속 저장 호출은 확인되지 않음. 기존의 페이지 새로고침 후 동일한 선택 복원을 새 기능 요구사항인 것처럼 주장하지 않음.
- 원작 Ch.1035 / 공식 TV1062에서 ON 방어↑, OFF 속도↑·방어↓의 방향만 확인. 변환 시간, 최대 지속 시간, 수치 변환 폭은 알 수 없으므로 상태별 정량 Overall·순위·매치업 변화를 현재 단계에 산출하지 않음. https://one-piece.com/anime/61675/index.html

**승인 게이트:** A(단일 평가 및 조건 설명), B(정량 ON/OFF), C(통합+정량 ON/OFF) 중 사용자 UX 결정 전 수치·패키지 버전·평가 원본·랭킹 로직 변경 없음. 모든 새 자료는 원작/애니/제작진/커뮤니티/해석을 분리.

### 검증 범위

문서와 공개자료/읽기 전용 코드를 대조한 정적 검토다. 이 문서-only 변경에서 `npm test`, `npm run build`, 실제 PC/모바일 브라우저, 배포 검증은 실행하지 않았으며 통과로 표시하지 않는다.
