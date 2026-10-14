# v0.4.7 — 종합순위 임시 상태 초기화 / 매치업 평가상태 귀속 표기 (2026-10-14)

> **릴리즈 종류:** v0.4.6 기능·분석을 보존하는 UI 전용 안정화 패치. 기준 `main@8c9df6ed4684ee17ab00095f14df68636a8561ca` (v0.4.6). 본 문서는 다음 채팅의 개발 인수인계에도 활용한다.

## 1. 원인 및 조치

### Overall 순위 팝업

- 기존 v0.4.6은 `App`의 `selectedStates`를 캐릭터 상세와 순위 팝업이 **공유**했으므로 팝업의 루피 기어4/니카, 흰수염 전성기/정상결전 등을 바꾸면 상세 화면까지 영향을 주었고, 팝업을 닫았다 열어도 조작이 남았다.
- v0.4.7은 `StatRankingDialog` 내부의 `popupStates`로 상태 선택을 격리했다. `getHighestOverallStateIds()`가 열릴 때마다 모든 복수 Evaluation 캐릭터의 **실제 Balanced1.2 Final Overall 최대값**을 기본값으로 고른다(임의 이명/순서가 아니라 원값 계산 비교). 정렬 방향도 컴포넌트 내부 상태이고 초기값은 내림차순.
- 열린 팝업에서 한 인물의 평가 시점을 선택하면 **72명 중 해당 인물의 해당 평가만 바뀌며**, Overall·상대 순위·공동 순위가 원값으로 재계산된다. 다른 인물의 상태와 순위표 인원은 유지.
- 팝업 X / 바깥 영역 마우스다운 / Escape / 캐릭터 행 선택 등으로 닫히면 컴포넌트가 언마운트돼 **상태 선택과 오름차순/내림차순 조작이 폐기**된다. 다시 열 때 최고점 기본값으로 시작한다. 팝업의 단순 선택은 상세 캐릭터의 자체 평가 상태를 변경하지 않는다.
- Ranking에는 한 캐릭터 한 행, 여럿 상태가 있더라도 점수 두 개를 동시에 표시하지 않는다. `Evaluation` 개수·기본 플래그·랭킹 공식을 변경하지 않는다.

### 추천 매치업

- 기존 추천 대진 버튼은 `[캐릭터 A] VS [캐릭터 B] [상태 A]` 순서로 렌더되어 '루피 VS 티치 기어 4 이하'처럼 B의 상태로 오해할 수 있었다.
- v0.4.7은 `matchup-featured-side[data-character-id="..."]` 두 묶음을 만들어 **상태 A는 이름 A의 바로 아래, 상태 B는 이름 B의 바로 아래** 배치한다. 중간에 독립 VS, 끝에 선택 체크를 유지하고 가로 스크롤로 좁은 화면의 혼잡을 피한다.
- 루피 기어4/기어5, 흰수염 전성기/정상결전, 가프 과거/현재 등 가능한 양쪽 상태 시나리오에서 같은 일반 렌더링을 사용한다. 각 `featured` 원본 `characterA/characterB` 데이터의 `stateLabel`을 사용할 뿐 대진 시나리오 선택 동작·역방향 전투 조건은 변경하지 않는다.

## 2. 불변 항목 및 검증

- 티치/5명 15축 v0.4.6 평가, 72 Character, 76 Evaluation, 532 Stat, 97 Membership, 17 Matchup 불변.
- Balanced 1.2 / Haki Weight .5, 모든 기존 Base/Raw/Final·근거·E등급, `v0.3.3.json` Frozen 및 `evaluationsBeforeV046` 무변경.
- `appVersion=0.4.7`, `evaluationSetVersion=evaluation-set-v0.4.6`, `coreDataVersion=core-v0.4.3`. UI 전용.
- 직접 검증: ① 루피 상세 Gear4 상태에서 순위 새 열기→Gear5 최고점 시작; 팝업 Gear4로 변경→상세 Gear4 유지 ② X/배경/Escape 닫기 후 다시 열면 최고점 상태·내림차순 초기화 ③ 흰수염 전성기/정상결전, 가프 전성기/현재 최고점 선택 ④ 72 고유 인물 ⑤ 추천 17개 버튼의 A/B 평가 이름 귀속 및 루피 조건부 대진 체크 상태.
- **CI 확인 완료:** [PR #108](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/108) 및 [PR Actions 38521641851](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38521641851)에서 **92파일·394테스트 전부 통과**, TS/Vite build 성공. 최초 CI 9건은 역사 v0.4.6과 최신 UI 버전 기대값 혼용으로 실패, 역사 검사 자체를 유지한 채 새 버전 기대값·기존 패치 탐색 경로를 교정.
- 기능 병합 `main@d61a293944ba132b8d1b67ca40318870f8e9bcae`, [main Actions 38521751638](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38521751638)에서 테스트/빌드/GitHub Pages 배포 모두 성공. 실제 PC/모바일 시각 QA는 별도 미검증.

## 3. 다음 단계(별도 승인/새 채팅)

1. v0.4.7 배포 후 위 UX 실제 브라우저 확인. 화면의 선택/순위 및 모바일 가독성 문제가 남으면 **작은 v0.4.7.x UI patch**로 검토.
2. 검토 문서 `docs/POST_V0_4_5_ORG_CHART_AND_FIVE_CHARACTER_AXIS_REVIEW_2026-10-14.md`의 **읽기 전용 조직도**는 별도 UX/기획 확정 후 구현. Group/Membership을 활용하고 현재/과거 상태와 직책을 구분하며 원작에 없는 지휘관계는 만들지 않는다.
3. 점수 변경이나 계산 모델 변경은 사용자가 새로 요청·승인할 때만 수행.
