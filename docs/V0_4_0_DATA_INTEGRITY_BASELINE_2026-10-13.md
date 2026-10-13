# v0.4.0 — 독립 데이터 기준선·참조 무결성·계산 재현성

- 구현일: 2026-10-13
- **최초 캡처 원본:** v0.3.3 `main@f544458364eeb69e31dbdbb4f97184eef5a98564`
- 기준 문서: `PROJECT_SPEC.md` (변경하지 않음), `docs/V1_0_DEVELOPMENT_ROADMAP.md`
- 스냅샷: `src/data/baselines/v0.3.3.json` (정적 역사적 데이터 약 1.58MB)
- 기능/테스트 PR: [#93](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/93)

## 설계 결정

1. **정적 JSON 기준선.** v0.3.3 데이터를 그대로 불러 원본 Character, Group, Membership, Battle, Participant, Evidence, Evaluation(모든 7축/원문 rationale/Evidence ID), 모델, 15 Matchup을 별도 파일에 **값 복사**했다. `v0180LegacyCohort.ts`는 그대로 두었지만 그것을 독립 과거 스냅샷이라고 간주하지 않는다.
2. **파생 결과도 캡처.** 모든 74 Evaluation의 Base / Raw Haki / Weighted Haki / Final Stat / Overall, 상태 ID, 대표 평가 71건, Overall과 7축 전체 순위(동점·순서 포함)를 보존한다. 타임스탬프는 캡처 결과에 포함하지 않는다.
3. **비침습 감사.** `auditCombatDataset`는 명시적으로 전달된 원본 배열과 참조만 읽는다. ID 중복·Group 계층·Membership·Battle/Participant·Evidence·Special/Haki Evidence·Evaluation/7축·Matchup·모델 버전을 확인한다. 자동 점수 보정이나 원본 정정은 금지.
4. **오류 vs 경고.** 존재하지 않는 ID, 계산 불일치, 대표 Evaluation 충돌은 오류. E3 축에 직접 Evidence가 없는 경우는 보강 대상 경고다. 전투 맥락만 서술한 Battle의 참가자 배열이 빈 것은 허용하며 임의 참가자를 만들지 않는다. 캐릭터의 역사적/겸직 소속도 동일인 중복 오류로 오판하지 않는다.
5. **버전 역할 분리.** 웹앱 `0.4.0`; core data `core-v0.3.3`; 평가 집합 `evaluation-set-v0.3.3`; 모든 Evaluation의 기존 `evaluationDataVersion`은 **기록별 개별 revision**으로 그대로 유지; 계산 모델 `balanced@1.2`; 기준선 `v0.3.3`.
6. **테스트로 과거 결과 동결.** 현재 core/evaluation data 버전이 v0.3.3인 동안, 모든 입력 레코드와 계산 결과를 JSON과 깊은 동등 비교한다. 이후 다른 버전으로 변경하는 v0.5 작업에서는 반드시 새로운 입력/결과를 이 기준선과 비교하는 차이 보고가 필요하며, 파일을 수정해 테스트 실패를 덮어서는 안 된다.

## 캡처 절차와 보존 정책

- **최초 생성:** 일회성 브랜치용 GitHub Actions로 v0.3.3 `main`으로부터 구성한 스냅샷 생성 코드 `createV033Snapshot`를 실행하여 JSON을 생성하고 Git에 커밋했다. 당시 생성 테스트 **5/5 통과**.
- **일회성 워크플로 제거:** 임시 쓰기 권한 workflow `.github/workflows/v04-baseline-bootstrap.yml`은 생성 후 삭제했다. 정규 CI/Pages workflow의 권한과 동작은 변경하지 않았다.
- **정상 테스트:** `npm test`는 스냅샷을 읽어 비교만 하고 기록을 갱신하지 않는다. `BASELINE_CAPTURE=1`에서도 기존 파일이 있으면 덮어쓰기를 거부한다.
- **변경 검증:** `tests/v04Baseline.test.ts` 및 `auditDataset.test.ts`에서 계산 반복·상태/순위·참조 검증과 잘못된 입력 거부를 확인한다.
- **기준선 갱신 규칙:** v0.3.3 스냅샷은 수정하지 않는다. 승인된 v0.5 데이터 변경 시 새로운 버전 스냅샷을 별도로 추가하고 이전 스냅샷을 그대로 유지한다.

## 변경하지 않은 기능

기존 69명의 7축 점수, 버기·이조의 E2/E3 잠정 평가, 15 직접 Evidence-aware Matchup과 그 정성 근거, Balanced 1.2 계산 수식, Haki Weight 0.5, 71명 로스터, UI 검색·과거 소속·초상 확대·상태 선택·비교·전투 타임라인을 변경하지 않았다. UI 헤더의 릴리즈 버전/패치 내역만 v0.4.0으로 표시한다.

## 검증 범위와 남은 위험

- 본 릴리즈는 **작중 사실·점수의 정당성 검증을 대신하지 않는다.** 근거를 연결했다고 원작 적합성이 확정되는 것도 아니다.
- `auditCombatDataset`는 존재 여부·귀속 및 기본 형식 중심이다. 출처 URL의 실제 열람 가능성, 문맥상 참전자 누락, 근거가 특정 점수를 충분히 뒷받침하는지 여부는 수동 Canon 감사가 필요하다.
- 합의된 `v0180LegacyCohort` 파생 테스트는 기존 동작 보존을 위해 유지. 과거 데이터의 독립적 비교에는 **새 v0.3.3 JSON**을 사용한다.
- 실제 PC/모바일 브라우저 팝업·스크롤·이미지 재배포 권리는 별도로 검증해야 한다.
- 추후 v0.5에서는 새 데이터셋 버전·근거 변경 이유와 함께 평가별 / 7축별 / 순위별 / 직접 매치업별 **전후 diff 리포트**를 작성한다.

자동 테스트·빌드·배포의 최종 완료 여부는 `TEST_REPORT.md` 및 [GitHub Actions](https://github.com/pchjesus/onepiece-saikyo-analysis/actions)에서 릴리즈 당시의 run/sha를 확인한다.
