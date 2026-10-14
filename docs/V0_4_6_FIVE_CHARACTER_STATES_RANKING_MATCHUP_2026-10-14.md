# v0.4.6 — 해군·샹크스·미호크 동축 재평가와 상태별 순위/매치업 UI 교정

**기준:** `main@e2b4be6c176459d2cee3e5a43d00d1e14a45817c`, v0.4.5, 2026-10-14. 사용자 요청(조직도는 별도 기능으로 분리). 숫자는 정성적 원작 근거에 대한 *프로젝트 평가*이며 원작 공식 전투력, 자동 승률, 검증된 순위가 아님.

## 1. 승인 후 현행 후보 반영 (기존 Core 7축/가중치 불변)

| 캐릭터 | 바뀐 스탯의 Final 변화 | Overall (전→후) | 유지 |
| --- | --- | --- | --- |
| 쿠잔 | Defense 93→92 | 649/7 ≈92.714 → **648/7 ≈92.571** | Stamina 97, Technique Final 93 등 |
| 사카즈키 | Stamina 96→97; Speed 86→87(E3); Technique 91→93; Combat IQ 91→93; Versatility 91→93 | 647/7≈92.429 → **655/7≈93.571** | Attack97, Defense95 |
| 보르살리노 | Attack 92→93; Defense **Final89→90**(Base88→89, Haki Raw2×0.5=1 유지); Technique 93→95; Combat IQ 90→91; Versatility91→94 | 645/7≈92.143 → **653/7≈93.286** | Stamina91, Speed99 |
| 샹크스 | Defense91→93; Combat IQ **Final93→94**(Base91→92, Raw4×0.5=2 유지); Versatility88→91 | 648/7≈92.571 → **654/7≈93.429** | Attack Final97, Technique Final96, Stamina88(E3) |
| 미호크 | Versatility84→86 | 650/7≈92.857 → **652/7≈93.143** | Attack97·Technique99 등 |
| 티치 (비대상) | — | **650/7≈92.857** 유지 | v0.4.5의 전 7축 그대로 |

상세 근거·전투 조건·반론은 `src/data/sample/v046FiveCharacterReview.ts`의 **15개 축별 결정 기록** 참조. 모든 변경은 기존 Evidence ID와 연결하고, 미리 산정했던 Haki Raw 성과를 중복 추가하지 않는다.

## 2. 주요 판단과 불확실성

- **쿠잔:** 블루홀을 맞은 사실은 Defense 한계를 보여줄 수 있으나 장기 체력 자체에 대한 반증은 아님. 10일간 사카즈키와 결투했고 블루홀 뒤 복귀했으므로 Stamina 97 유지. Defense만 -1, E2.
- **사카즈키:** 유성화산의 여러 탄막·근접 관통 공격을 **Technique(정교한 실행)**, 함선 파괴/발판 해빙/이동 차단을 **Versatility(전장 역할)**, 스쿼드 기만·루피 추격 목표를 **Combat IQ(선택 판단)**로 분리. 흰수염 피격 이후 전장 복귀+10일 결투로 Stamina +1. Speed +1은 특히 약한 E3 잠정 추론으로 징베가 루피를 호위했던 비대칭 조건을 명기함. 이때 사카즈키는 흰수염처럼 '노년 캐릭터'라고 단정하지 않는다.
- **보르살리노:** 빛 레이저·광검·분신·고속 기동을 실제 전장에서 구별해 운용한 성과를 Technique/Versatility 우선 재평가. Gear5 스타건 피격·루피 포획은 Defense 반론. 니카 소모를 '정확히 눈치채 분신 작전'을 썼다는 내면 인과는 확인되지 않았으므로 Combat IQ는 +1만 반영. 광범위 광선 크기를 동급 강자 결정타로 환산하지 않아 Attack +1.
- **샹크스:** 사카즈키의 코비 대상 용암 공격 실제 차단을 Defense로, 키드전 예지→위협 우선 선제 제압과 아라마키 원거리 패왕색 견제를 Combat IQ/Versatility 기능별로 구분. 기존 Observation Raw가 이미 +2 Final을 형성하므로 IQ Base만 +1. Stamina는 장기전 표본이 부족하여 88(E3) 유지; 확정 약함이 아닌 잠정 수치.
- **미호크:** 작은 단검/요루/원거리 비상참격의 거리·목표 규모 전환을 Versatility 84→86으로 재평가. 단일 검술 시스템의 품질(Technique99)/화력(Attack97)을 독립 역할 수로 중복하지 않는다.
- **동축 비교:** 사카즈키·보르살리노 Technique/Versatility와 티치의 두 열매 실전 운용은 역할의 구조가 다르다. 상향 후 Overall 수치는 승패·개인간 결투의 우열을 자동 의미하지 않는다.

## 3. UI 수정

### 종합전투력 순위표(한 캐릭터 한 행)

- 기존: 전체 72 캐릭터는 기본 평가만 사용, 상세 화면에서 루피 기어4·기어5 / 뉴게이트 전성기·정상결전의 상태를 바꿔도 순위표가 변경되지 않음.
- 신규: `App`의 `selectedStates: Record<string,string>`에 사용자별 최신 선택을 일시 저장(새로고침 지속 저장은 요구사항에 없으므로 하지 않음). `CharacterPage`와 `StatRankingDialog`는 같은 선택 상태를 사용. 순위 내에 다중 평가 인물의 짧은 select를 **행 밖의 형제 컨트롤**로 표시하여 중첩 button/select HTML 오류 방지.
- `getStatRanking(stat,selectedStates?)`는 선택한 개별 Evaluation을 찾아 **기존 Balanced 1.2 + Raw 적용**으로 점수·rank·동점 처리·전체 정렬을 다시 계산. 72명 각각 유일하게 유지, 그룹 멤버십 중복 추가 없음. 선택 상태가 없거나 유효하지 않으면 기존 default 평가로 fallback.
- 루피 G4 635/7 =90.714286 ↔ G5 657/7 =93.857143; 뉴게이트 전성기와 정상결전의 서로 다른 평균은 기존 Evaluation대로 계산. 순위 내 상태 선택 ↔ 캐릭터 상세 상단 선택이 동기화. 정렬 버튼 높음↔낮음 유지.
- Rank 화면을 닫더라도 같은 App 내 선택 상태는 유지, 새로고침으로 기본 상태 복귀. 다른 캐릭터의 대표 평가를 바꾸지 않음.

### 매치업 추천 대진

- 첨부 화면에서 다중 평가 루피 추천 대진만 *선택 시* 체크 표시가 아래로 내려갔음: 3열 CSS grid에 4번째 상태 label과 5번째 `::after` 체크를 배치해 줄바꿈.
- 버튼을 `display: inline-flex; flex-wrap:nowrap; white-space:nowrap`으로 전환하고 체크 `::after`의 강제 `grid-column:4` 제거. **상태 이름과 체크를 한 줄**로 배치, 기존 `matchup-picker`는 모바일에서 가로 스크롤 유지.
- 17개 대진의 이름·선택 상태·조건부 판정 내용은 그대로.

## 4. 버전/회귀 안전

- `evaluationsBeforeV046`로 **v0.4.5 76개 Evaluation 원본**을 보존한 뒤 별도 변경 어댑터를 적용. `evaluationsBeforeV045`/`evaluationsBeforeV044`도 불변.
- core-v0.4.3, Balanced 1.2, HakiWeight0.5, 독립 `v0.3.3.json` 원본 **그대로**. 앱 0.4.6 / evaluation-set-v0.4.6으로 구분. 72 캐릭터/76 평가/532축/97 Membership/15+2 대진 불변.
- 히스토리 UI에 15축 전/후 점수와 UX 2항목을 기록하고 새로운 UI 스탯 순위를 테스트. 역사적인 v0.1.5x/v0.4.4/v0.4.5 수치 검증은 **당시 데이터**로 재현하도록 분리.
- CI 자동 테스트·TS/Vite 빌드·main Pages 배포 확인은 실제 결과만 기록. 수동 PC/모바일 브라우저 시각 검수와 원작 만화 컷 전수 검증, 저작권 라이선스 확인은 별도 수행해야 한다.

## 5. 조직도 및 후속 작업

조직도는 본 릴리즈 범위에서 제외. 기존 미승인 설계·현재/과거 그룹 Membership의 다대다 처리 및 공식 직책/실제 지휘 관계의 차이는 [별도 검토 문서](POST_V0_4_5_ORG_CHART_AND_FIVE_CHARACTER_AXIS_REVIEW_2026-10-14.md)를 유지하고 추후 독립 PR로 진행한다. 이 릴리즈는 다음 채팅 인수인계를 위해 안정 상태를 검증·기록한다.

## 6. 검증 기록 (확인 완료)

- 기능 [PR #106](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/106)에서 사용자 요청의 15축 평가, 순위 및 매치업 패치를 구현. 이전 평가 `evaluationsBeforeV046` 보존.
- 초기 CI의 구 역사적 Overall 검증 6건은 과거 Evaluation과 새 현행 평가를 혼용해 실패. 역사 데이터와 현행 데이터를 분리한 뒤 해결. v0.1.53 당시 Final 벡터와 후속 승인된 Marco 점수 비교 역시 보존된 v0.4.5 입력으로 분리해 수정.
- 새 CSS 회귀 테스트의 Node 모듈을 브라우저 TS용 `src/ui`에서 `tests`로 분리. 새 의존성 도입 없이 TypeScript 빌드 오류 해결.
- 최종 [PR CI 38519741299](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38519741299): **92개 파일 / 393개 테스트 모두 통과**, TypeScript `tsc -b` + Vite build 성공.
- 기능 `main@f44c121d9baa183d3978fe7aedb8cd0e87af2fff` 병합. [main CI 38519878008](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38519878008)에서 테스트·빌드·GitHub Pages 배포 모두 성공.
- 실기기 PC·모바일 픽셀/터치 육안 검증, 원작 컷 전수 재확인, 이미지 재배포 라이선스 확인은 별도다.
