# v0.4.33 — 퀸의 오소메 사건: 의도적 표적 전환과 기술 작동 성공 구분

> 2026-10-18, 작업 시작 main `3a6343cb61392c69329bedd02d07acc08a3132ed` (app v0.4.32).
> **현재 Battle·Evaluation 설명 데이터만 정정. 점수·Readiness·Raw·Evidence·Matchup·계산 모델·UI는 불변.**
> 선행 집중 감사: `docs/QUEEN_TECHNIQUE80_BRACHIO_LAUNCHER_OSOME_FAILURE_ATTRIBUTION_AUDIT_2026-10-18.md`.

## 1. 수정 이유와 출처 계층

- [ONE PIECE.com 공식 애니메이션 1061화](https://one-piece.com/anime/61599/index.html)의 줄거리는 퀸이 자신을 피하려 병을 가장했던 오소메를 알아채고 **투명화한 채 의도적으로 폭행**했으며, 상디는 처음에 자신이 때린 것으로 오해했다고 명시한다.
- 기존 `sampleBattles.onigashima-queen-sanji.externalFactors` 및 v0.4.30 `Queen` Technique/Combat IQ 리뷰의 **‘후반에 오소메에게 주의가 분산’**은 실제 **사적 목적의 의도적 표적 전환**과 이미 작동 중인 **투명화 기술**의 차이를 충분히 전달하지 못한다.
- `evidence-queen-ancient-zoan-1028.uncertainty`의 **브라키오 런처 자기 피격·오발 문제**는 별도의 무기 인터페이스/발동 안전성이다. 이번에 원작 1028화의 음성 트리거 컷을 직접 판독한 것은 아니므로 기존 `fact`에 미확인 세부 기전을 새로 쓰지 않았다.
- 원작 만화 Ch.1034의 직접 전체 컷은 별도 판독하지 않았으며, ONE PIECE.com 공식 TV1061을 **보조 출처**로 기록한다.

## 2. 데이터 변경 전후 — 동일 인물, 동일 평가점수

| 현재 데이터 | 변경 전 | v0.4.33 이후 | 변경 이유 |
|---|---|---|---|
| Battle `onigashima-queen-sanji.externalFactors` | ‘후반에 오소메에게 주의 분산’ | 정상 작동한 투명화 상태에서 오소메를 의도적으로 폭행; 사적인 목표를 위해 상디전 목표 이탈 | 전투 맥락의 행위 의도·작동 조건 정확화 |
| Queen Technique `rationale`의 맥락 구절 | ‘무장 오발·후반 주의 분산·상디의 빠른 기동’ | **브라키오 런처** = 장비 발동·안전성; **오소메** = 투명화 오류가 아닌 의도적 목표 선택; **상디의 기동** = 별도 상대 대응 조건 | 기술 오작동과 잘못된 판단의 기능 귀속 |
| Queen Combat IQ `rationale`의 관찰·맥락 | ‘오소메에게 주의 분산’ 및 ‘상대 판단 흔들림’ | 오소메를 알아보고 투명화한 채 의도적으로 폭행, 전투 목표에서 이탈; 기술 작동은 성공 | 단순 부주의가 아닌 **의도적 사적 보복 선택** 설명 |
| Queen Technique / CombatIQ `score`, `baseScore`, `readiness`, `evidenceIds`, Haki Raw | 80 E2 / 74 E3 | **완전 동일** | 수치 자동 보정/근거 역할 재분류 없음 |
| 다른 5축, 다른 인물, 기존 Matchup/Rankings | 원래 값 | **완전 동일** | 최소 범위 유지 |

## 3. 구체적 구현 및 원본 보존

- 신규 **`src/data/sample/v0433QueenOsomeIntentContext.ts`**에 `applyV0433QueenOsomeBattleContext`, `applyV0433QueenOsomeEvaluationContext` 구현.
- 함수는 대상 **Battle ID / Queen 현재 기본 Evaluation**에만 작용하며, 역사적 `externalFactors`, v0.4.30 `evaluationDataVersion`과 원본 문장 내용이 예상과 다르면 **예외를 발생**시켜 조용한 누락/잘못된 변경을 막는다.
- `battleRepository`, `evaluationRepository`, `v050CurrentDataset`에 동일한 함수를 적용. 평가 오버레이는 **v0.4.30, v0.4.31 이후** 현재 값에만 적용하므로 원래 데이터·역사 평가 문구가 계속 재현된다.
- `src/data/sample/battles.ts`, `src/data/sample/evaluations.ts`, 기존 `v0430BeastsAllStars.ts`, `evidence.ts`, v0.3.3 고정 파일을 **직접 수정하지 않는다**. 기존 v0.4.32 잭–슈텐마루 Battle 링크 오버레이도 유지한다.
- `evaluationDataVersion`은 **`evaluation-v0.4.33-queen-osome-context-clarified`**로 구분. 숫자는 동일하되 **판단 근거 문장이 달라진 평가 기록**이므로 평가세트 버전도 **`evaluation-set-v0.4.33`**으로 표기한다. `appVersion:0.4.33`, `coreDataVersion:core-v0.4.33`; `Balanced1.2`, `baselineSnapshotVersion:v0.3.3` 유지.
- `patchHistory`, README, package 버전·lockfile 동기화. 이전 v0.4.32 이하 이력 항목은 그대로 보존.

## 4. 검증 계약 및 회귀 위험

신규 `src/data/sample/v0433QueenOsomeIntentContext.test.tsx`와 기존 버전 기대값 테스트에서 다음을 보장한다.

1. **역사 원본 무결성:** 샘플 Battle은 ‘주의 분산’ 옛 문구를 갖고, 현행 Battle은 의도적 폭행을 명시; 다른 필드 전부 동일. v0.4.30 Queen 평가도 이전 문장 그대로.
2. **현재 설명 교정:** Queen Technique·Combat IQ `rationale`만 새 의도와 기술 실패 귀속을 반영. 두 축 외 5축의 EvaluationItem 전체 동일. 두 축의 `score`, Base, Raw, Readiness, Evidence ID와 contribution 동일.
3. **관계·집계:** 현재 `v050CurrentDataset`과 실제 Battle/Evaluation repository의 표현 일치, 기존 Evidence 연결·잭 교정 관계 보존, 82명/88 평가/616 축/18 Matchup, 데이터 무결성 오류 0.
4. **모델 결과:** Queen **[82,82,83,75,80,74,84] / 560÷7=80.0**, 랭킹·모델 불변, 기존 9인 점수 검증 보호.
5. **UI 계약:** 기존 공유 `CharacterPage`에 현재 평가 데이터 버전 표시; UI 컴포넌트의 별도 재설계 없음. 실제 실기기 시각 QA는 별도 검증.
6. **이전 테스트:** 버전 Manifest/패치 이력의 **현재값** 예상만 변경, 역사적 과거 점수·실적·패치 레코드 유지. `v0.4.30` 리그레션은 과거 평가 오버레이 값과 현재 정정된 문장 값의 차이를 구별하도록 유지.

**주의:** 전체 `npm test`, `npm run build`, B+ CI 등의 실행 성공 여부는 별도 실제 도구 결과로만 보고한다. 원작 만화 컷의 완전 직접 검증, 실제 브라우저/휴대전화 화면 검사, GitHub Pages가 최신 버전을 제공하는지에 대한 실서비스 검증은 이번 코드 검증으로 간주하지 않는다.

## 5. 롤백

신규 v0.4.33 오버레이의 Battle/Evaluation repository·감사 데이터 연결을 해제하고, 앱/코어/평가세트 버전과 이번 README/패치 이력/테스트를 이전 상태로 되돌리면 **v0.4.32 재현 가능**하다. `sampleBattles` 및 `sampleEvaluations` 원본을 되돌릴 필요가 없는 것이 이 구현 방식의 장점이다. 롤백은 정정 전 ‘주의 분산’ 표현도 현재 화면으로 되돌리므로 실제 회귀가 있을 때만 고려.
