# v0.2.1 — 원작 출처 표시 통합·긴 URL 가독성 수정

작성: 2026-10-13  
기준 안정판: v0.2.0, `main@113a35e1039adba12cc40285b3f38f33a1558b38`  
성격: 사용자 신고 기반 공통 **표현 계층(UI) 수정**. 점수 및 출처 진위 재판정은 범위 밖.

## 재현 및 원인

- 에이스 `원작 전투 프로필 근거` 카드에서 출처명과 raw `https://one-piece.com/...` 주소 6개가 한 줄에 혼합돼 표시되며, 좁은 2열 카드에서 수차례 줄바꿈이 발생. URL을 클릭할 수 없는 단순 텍스트로 출력했다.
- 원인은 `CombatProfile.tsx`의 `source.label + source.reference` 직접 렌더링. `profile.sources`의 URL이 순수 주소 또는 설명과 주소가 함께 있는 형태로 혼재한다.
- 같은 표시 패턴은 사보·몰리·루치·카쿠·스튜시 및 신규 해군·혁명군 캐릭터에도 나타날 수 있다. `EvidenceList`는 URL `source.description`을 텍스트로 직접 표시하고, `EvaluationTrace`는 원문 출처와 내부 전투 링크가 혼재하며, `StatComparisonDialog`는 HTTP 문맥 외부 주소 검색이 불완전했다.

## 적용 범위

1. 재사용 가능한 `SourceCitation` 컴포넌트로 **출처 라벨 + 설명(있는 경우) + 짧은 원문 보기 링크**를 표시한다. 실제 HTTPS URL과 원본 출처 라벨은 새 탭 링크에 그대로 보존한다. `title`/링크의 `href`로 전체 주소 확인 가능.
2. URL이 설명 뒤에 섞인 경우, 설명은 지우지 않고 링크만 분리한다. 예: `루치 공식 프로필 · https://...` → `루치 공식 프로필 · 원문 보기 ↗`. 에이스 원작 Ch.587의 **팬 회차 상세 요약 / 1차 원문 전체 미열람** 같은 출처 한계도 그대로 남긴다. 팬 위키를 공식 원작으로 재분류하지 않는다.
3. URL이 없는 텍스트형 출처는 과거처럼 문구를 유지하며 임의 링크를 만들지 않는다. HTTPS가 아닌 URI는 링크화하지 않는다. `target="_blank"` + `rel="noopener noreferrer"`.
4. 변경 화면: `CombatProfile`, `EvidenceList`, `EvaluationTrace`, `StatComparisonDialog`. 기존 캐릭터 검색, 평가 시점, 원작 사실/조건/해석, Score, Haki 및 Matchup 계산은 유지한다.
5. CSS는 `profile-sources`, `evidence-source`, `trace-evidence-links` 및 `stat-compare-citation`에 제한해 좁은 화면에서 중첩/넘침을 방지한다. 전역 레이아웃·그리드 재설계는 하지 않는다.

## 검증 원칙

- Ace 실제 등록 출처 6건의 원래 URL과 라벨, 출처 한계를 보존하는지 UI 테스트한다.
- 전체 Character 70명의 출처가 등록 순서·개수를 바꾸지 않고 표시되는지, **시각적 텍스트 안에 긴 HTTPS URL이 노출되지 않는지** 검사한다.
- 에이스 Evidence 설명에 있는 공식 URL이 링크로 전환되면서 Fact/조건/해석 데이터는 불변인지 검사한다.
- 스탯 근거 → 전투 기록 네비게이션, 동축 비교 팝업, 모달, 패치 이력의 동작을 함께 회귀검증한다.
- 점수/Raw/Haki 모델/Character/Evidence/Evaluation/Battle/Membership/Matchup 데이터 파일과 `PROJECT_SPEC.md`는 변경하지 않는다.
- GitHub Actions PR CI 및 main 병합 후 Pages 배포 시 SHA를 비교한다. 실기기 PC/모바일 화면을 직접 실행하지 않았다면 수동 검증 완료라고 표현하지 않는다.

## 운영

이번 v0.2.1은 단순 문구 한 건이 아니라 **동일 원인을 가진 네 화면을 일괄 처리한 사용자 신고 기반 수정 릴리즈**다. 향후 같은 소규모 UX 오류는 묶음 단위로 처리하고, 분석 모델이나 점수 기준 변경은 사용자 승인 후 별도 수행한다.
