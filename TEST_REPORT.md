# v0.1.21 Final Calibration Refinement — Verification Note

## Scope
- Marco Marineford/Wano Evidence coverage 보강.
- Marco Armament actual-application Evidence 및 Raw +2 후보 반영.
- Marco / King / Katakuri final calibration 재조정.
- Multi-stat Evidence 중복 억제 원칙 명문화.
- Private development 단계에서 Pages 자동 배포를 중단하고 push 시 test/build만 수행하도록 workflow 조정.

## Expected calibrated Overall
- Marco: 81.125
- King: 80.75
- Katakuri: 81.50

## Regression targets
- 8-stat 구조 유지.
- Haki Weight 0.5 유지.
- Overall = 8 Final Stat 산술평균 유지.
- Existing Evidence ID reference integrity 유지.
- Marco timeline에 긍정 Evidence와 Garp/Seastone 한계 Context가 함께 표시.
- Katakuri Future Sight는 Speed Haki Contribution으로 추가하지 않음.
- King Flame ON / OFF conditional peak 원칙 유지.
- Character Detail / Evaluation Trace / Battle Timeline 기존 연결 유지.
- main push에서는 Pages configure/deploy가 실행되지 않고 test/build까지만 성공해야 함.

## Automated verification
- Initial final-calibration run: 39 / 40 tests passed; 1 stale `getBattleDetail` fixture failed after the new Chapter 1022 Evidence increased the linked record count from 2 to 3.
- Root cause: test expectation lagged behind intentional Evidence data expansion; Application logic was not the failure source.
- Fixture updated and re-run through GitHub Actions.
- Final result: 10 test files / 40 tests PASS.
- `npm run build`: PASS.
- `actions/configure-pages`: SKIPPED on main push as intended.
- Pages artifact upload / deploy: SKIPPED as intended.
- Browser/mobile visual verification: PENDING.

## Verification conclusion
v0.1.21 final calibration data, Haki reference integrity exercised by the current test suite, Battle/Evidence integration, Overall calculation, and production build all pass the automated GitHub workflow. Pages remains intentionally inactive during private development.

---

# v0.1.21 Test Report

## Scope
Combat Power Scale Calibration, weighted Haki calculation, 3-character re-evaluation, stale fixture repair, documentation/status synchronization.

## Pre-patch baseline confirmed from GitHub Actions run #1
- `npm install`: PASS.
- `npm test`: FAIL — 28 passed / 7 failed across 35 tests.
- Failure source: v0.1.20 Battle / Evidence / Evaluation data had advanced beyond several application test expectations.
- `npm run build`: SKIPPED.
- Pages deploy: SKIPPED.

## v0.1.21 verification targets
- Raw +6 × 0.5 = Effective +3.
- Final = Base + Effective Haki, capped at 100.
- Haki 0 keeps Base = Final.
- Multiple Raw contributions sum before Weight.
- Same Haki Weight applies to all characters.
- Haki Evidence reference validation remains intact.
- Overall is the arithmetic mean of eight Final Stats.
- Current Battle / Evidence / Evaluation Trace links match the data.
- Pages workflow remains install → test → build → deploy.

## Automated verification after main merge
- GitHub Actions run #2, commit `065eac5`.
- `npm install`: PASS.
- `npm test`: PASS — 10 test files / 39 tests.
- `npm run build`: PASS — TypeScript build and Vite production build completed.
- `actions/configure-pages@v5`: FAIL because the repository does not yet have a Pages site enabled/configured for GitHub Actions.
- Artifact upload / Pages deploy: SKIPPED after the configure-pages failure.
- Browser/visual verification: NOT RUN.

## Verification interpretation
The v0.1.21 application code, calculation tests, current Battle/Evidence fixtures, and production build passed in GitHub Actions. Actual GitHub Pages deployment is not verified; repository-level Pages enablement is still required.

## Manual verification required
1. `npm.cmd install`
2. `npm.cmd test`
3. `npm.cmd run build`
4. `npm.cmd run dev`
5. Marco / King / Katakuri detail pages.
6. Base / Raw / Weight / Effective / Final display.
7. Battle Timeline and Evidence accordion.
8. Mobile layout of Haki breakdown.

---

# v0.1.20 Test Report

## Scope
Haki Application/Contribution, Katakuri Canon Evidence, 3-character re-evaluation, GitHub Pages deployment.

## Required local verification
```powershell
npm.cmd install
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

## Manual verification required
- Marco / King / Katakuri 카드와 상세 페이지 정상 표시
- Evaluation Trace의 Base / Haki / Final 값 표시
- Katakuri Battle Timeline 및 Evidence 역할 표시
- GitHub Pages Settings에서 Source = GitHub Actions 선택 후 실제 배포 URL 확인

---

# v0.1.19 Verification Report

## Scope
- 등록 캐릭터 3명의 Canon Combat Profile 및 Haki Profile 추가.
- 패휘감을 독립 Haki 타입이 아닌 패왕색 하위 infusion 상태로 모델 수정.
- Evidence role UI를 한국어 의미 라벨로 개선.

## Confirmed by static/data review
- Haki 최상위 타입은 armament / observation / conquerors 3개만 존재함.
- 패휘감은 conquerors capability의 `infusion` 하위 상태로만 표현됨.
- Marco / King / Katakuri 모두 Character Domain 데이터에 Combat Profile을 보유함.
- Combat Profile 자체는 Evaluation score를 변경하지 않음.
- `unclear`는 비보유로 표현되지 않음.
- Evidence role의 내부 모델(primary / secondary / context)은 유지하면서 UI 라벨만 개선함.

## Verification status
- Source/data/static review: PASS.
- Domain/Data/Application non-test TypeScript static check: PASS.
- 전체 `tsc --noEmit -p tsconfig.app.json`: dependencies가 설치되지 않아 React/Vitest module resolution 단계에서 실행 완료 불가.
- `npm install --no-audit --no-fund`: AI 환경 45초 제한으로 TIMEOUT.
- Automated Vitest: NOT RUN (dependencies unavailable).
- Vite build: NOT RUN (dependencies unavailable).
- Browser/UI verification: NOT RUN.

## Manual verification required
1. `npm.cmd install` (필요한 경우)
2. `npm.cmd test`
3. `npm.cmd run build`
4. `npm.cmd run dev`
5. 세 캐릭터 전환 시 Combat Profile 레이아웃과 모바일 레이아웃 확인.
6. 패기 항목이 무장색 / 견문색 / 패왕색 3개로 표시되는지 확인.
7. Katakuri 패왕색은 확인, 패휘감은 미확인 정보로 표시되는지 확인.
8. Evidence role 태그가 주요 근거 / 보조 근거 / 상황 참고로 표시되는지 확인.

## Deferred intentionally
- 실제 Haki Contribution 적용.
- Katakuri Canon Evidence 정식 구축 및 prototype Evaluation 교체.
- Marco / King / Katakuri 전면 스탯 재평가.

---

# v0.1.18 Verification Report

## Scope
- Haki를 독립 0~100 스탯이 아닌 실제 전투 활용 기반의 Stat Contribution 계층으로 추가.
- Evidence의 스탯 관계를 primary / secondary / context로 구조화.
- Marco / King Technique / Mastery 중복 평가를 현재 Evidence 범위에서 재검토.

## Confirmed by static verification
- 8개 최상위 스탯은 그대로 유지됨.
- Final Stat = min(100, Base Stat + Haki Contribution) 규칙이 Domain helper에 존재함.
- 스탯별 Haki Contribution 총합은 validation에서 +10을 초과할 수 없음.
- 양의 Haki Contribution은 Evidence ID를 요구함.
- Haki capability 보유 여부만으로 자동 가산하는 로직은 없음.
- Evidence `statContributions`는 CombatStat 타입과 primary / secondary / context 역할을 사용함.
- Marco Ch.1006 재생 Evidence는 Technique에 context로만 남아 Technique 점수 Evidence에서 제거됨.

## Verification status
- Domain/Data/Application non-test TypeScript static type check: PASS (`tsc`, React/Vitest 의존 파일 제외).
- `npm install`: TIMEOUT at 120 seconds in AI environment.
- Automated Vitest: NOT RUN because local dependencies were unavailable.
- Vite build: NOT RUN because local dependencies were unavailable.
- Browser/UI verification: NOT RUN.

## Manual verification required
1. `npm.cmd install`
2. `npm.cmd test`
3. `npm.cmd run build`
4. `npm.cmd run dev`
5. Marco Technique / Mastery = 78, King Technique / Mastery = 86인지 확인.
6. Evidence 카드에 `Stat · primary/secondary/context` 태그가 표시되는지 확인.
7. Evaluation Trace에 `Base N · Haki +N`이 표시되는지 확인.
8. Marco/King Overall이 새 draft 점수와 일치하고 Battle Timeline이 기존처럼 동작하는지 확인.

## Deferred intentionally
- Katakuri 실제 점수화: 프로젝트 내부에 검증된 Canon Evidence가 없어 보류.
- Zoro 실제 데이터 추가: synthetic Haki 구조 테스트만 수행.
- 실제 Haki 가산점 부여: 해당 캐릭터의 Haki Application Evidence를 먼저 추가해야 함.

---

# v0.1.17 Verification Report

## Scope
- Defense 정의에 남아 있던 제거된 Durability 명칭을 제거함.
- Battle Evidence 화면에 전투 구조, 목적, 의도, 환경, 제한 조건, 외부 요인, 결과를 함께 표시하도록 수정함.

## Design verification
- Defense는 회피·방어·차단·피해 감소 및 조건부 방어를 평가하며 Durability라는 별도 축을 사용하지 않음.
- Recovery는 최상위 스탯으로 사용하지 않으며, 회복·재생 근거는 Evidence와 관련 능력/지속 효과의 해석으로 보존함.
- Battle Context는 Canon Fact와 별개로 전투 당시의 조건을 설명하고, Evidence 해석에 필요한 맥락을 제공함.

## Verification status
- Static code/data review: completed.
- Automated npm test: not executed in AI environment.
- Build: not executed in AI environment.
- Browser/UI: pending user verification.

## Manual verification required
- King → 전투 기록 → 킹과 조로의 대결에서 전투 의도 및 기타 Battle Context가 표시되는지 확인.
- Stat Info → Defense에서 제거된 Durability 명칭이 더 이상 표시되지 않는지 확인.

## Next
- 패기 및 Technique / Mastery 독립성 검증 후 Marco / King / Katakuri 전면 재평가.

---

# v0.1.16 Verification Report

## Scope
- Recovery를 제거하고 Technique / Mastery를 8번째 스탯으로 도입.
- Recovery 관련 Evidence를 Special Ability / Stamina 중심으로 재분류하고 Defense 자동 합산을 배제.
- Defense 설명의 Durability 잔여 표현 제거.
- Marco / King draft 점수와 관련 테스트 fixture 갱신.

## Design verification
- Defense: 공격을 회피·방어·차단하거나 피해를 줄이는 능력. 회복·재생은 자동 포함하지 않음.
- Stamina: 피로와 체력 소모가 누적되는 상황에서 전투를 지속하는 능력.
- Special Ability: 악마의 열매에 한정하지 않는 고유 전투 능력.
- Technique / Mastery: 보유 능력이나 전투 수단 자체의 존재와 분리하여 실제 운용 숙련도·정밀성·완성도를 평가.
- Combat IQ: 상황에 맞는 판단과 선택.
- Versatility: 서로 다른 상황에서 전투 수단을 전환·적용하는 폭.

## Recovery evidence disposition
- Marco Ch.554: Recovery stat 제거 후 `specialAbility` + `speed`. 재생 사실은 고유 능력 정보로 보존.
- Marco Ch.998: `specialAbility` + `versatility`. 타인의 상태 회복·억제라는 특수 활용은 고유 능력과 적용 폭의 근거로 보존.
- Marco Ch.1006: `specialAbility` + `stamina` + `techniqueMastery`. 날개 재생은 고유 능력, 전투 지속은 Stamina, 능력 운용은 Technique / Mastery의 보조 근거.
- 어떤 Recovery Evidence도 Defense에 자동 연결하지 않음.

## Draft score changes
- Marco: Technique / Mastery 86, Special Ability 91, Versatility 89.
- King: Technique / Mastery 93, Attack 90, Defense 94, Special Ability 92, Combat IQ 84, Versatility 85.
- 두 캐릭터 모두 `draft`; 전체 작중행적 재검토 전의 중간값.

## Verification status
- Static/structural review: completed.
- Automated npm test: not executed in AI environment.
- Build: not executed in AI environment.
- Browser/UI: not performed.
- User local verification required.

## Known issues
- Technique / Mastery의 독립성은 Katakuri 및 비능력자 강자 적용으로 추가 검증 필요.
- Recovery 능력의 독립 수치 제거가 정보 손실을 만드는지 장기적으로 확인 필요.

---

# v0.1.15 Verification Note

## Scope
- v0.1.13~v0.1.14에서 변경된 전투력 모델을 정리하고 v0.1.15 평가 원칙을 문서화함.
- v0.1.14 사용자 테스트에서 발견된 `getCharacterEvaluationTrace.test.ts` 2건의 기대값 불일치를 수정함.

## Root Cause
1. Marco Recovery가 v0.1.14에서 Chapter 554 / 1006 / 998의 3개 Evidence를 참조하도록 변경되었으나 테스트는 2개를 기대하고 있었음.
2. King Recovery rationale 문구가 개선되었으나 테스트가 이전 문자열을 기대하고 있었음.

## Fix
- Marco Recovery의 Evidence count 및 ID 기대값을 3개로 갱신.
- King Recovery rationale 기대 문자열을 현재 문구에 맞게 갱신.
- Application / Domain 로직 자체는 변경하지 않음.

## Model Review Status
- 8개 스탯 구조: 유지
- Durability: 제거 유지
- Defense: 조건부 방어를 포함하는 종합 방어 축으로 유지
- Versatility: 절대평가 및 실제 적용 범위 중심으로 유지
- Recovery: 유지하되 독립적인 평가축으로 충분한지 후속 검토
- Growth Potential: 미구현, 향후 별도 모델 후보
- Marco / King scores: 현재 draft 유지, 전체 작중행적 및 Evidence 재검토 전 확정하지 않음

## Automated Verification
- AI 환경에서 이번 수정 후 `npm test`는 아직 실행하지 않음.
- 사용자 환경에서 `npm.cmd test` 및 `npm.cmd run build` 실행 필요.

## Verification Status
- Static code/data review: completed
- Test expectation fix: completed
- Automated runtime test: pending user environment
- Browser/UI verification: pending user environment
- Full Evidence-based score re-evaluation: not yet completed

# v0.1.14 Verification Note

## Scope
- Combat stat model changed from Attack / Defense / Durability / Stamina / Speed / Recovery / Special Ability / Combat IQ to Attack / Defense / Stamina / Speed / Recovery / Special Ability / Combat IQ / Versatility.
- Marco and King draft evaluations were rechecked against the currently stored Evidence.

## Static Review
- `COMBAT_STATS`, stat definitions, sample evaluations, Evidence supportedStats, and validation fixtures were updated consistently.
- Calculation code continues to use `COMBAT_STATS.length`, so it does not hard-code the removed stat name.

## Automated Test Status
- Not executed in the AI environment for this patch.
- User environment verification required: `npm.cmd test`, `npm.cmd run build`.

## Manual Verification Required
- Verify the new 8-stat UI, stat information dialog, Evidence labels, timeline, evaluation trace, and overall score in the browser.

---

# v0.1.12 Verification Report

## Scope
- v0.1.11에서 사용자 로컬 `npm.cmd test` 실행으로 발견된 2건의 회귀 테스트 실패 수정.
- King Evidence가 추가된 Battle Detail과 King Recovery rationale의 현재 데이터에 맞게 테스트 기대값을 갱신.

## Root Cause
1. `getBattleDetail.test.ts`가 King Evidence 추가 전의 Evidence 1건을 기대하고 있었음. 현재 해당 Battle에는 Marco와 King의 Evidence가 각각 1건씩 연결되어 총 2건이 반환됨.
2. `getCharacterEvaluationTrace.test.ts`가 이전 rationale 표현인 `근거가 부족`을 기대하고 있었으나 현재 rationale은 `직접적으로 확인할 자료가 부족하다`로 작성되어 있음.

## Change Scope
- 테스트 코드 2개만 수정함.
- Domain model, Application logic, Repository logic, Evidence data, Evaluation data는 변경하지 않음.

## Automated Verification
- `npm.cmd test`: 수정된 테스트 기준 9개 test files / 29개 tests가 실행 대상. 실제 재실행은 사용자 환경에서 필요함.
- `npm.cmd run build`: 실제 재실행은 사용자 환경에서 필요함.

## Verification Status
- Static review: completed.
- Local automated test: not executed in AI environment; npm install did not complete within the available execution window.
- Local build: not executed in AI environment for the same environment limitation.
- Browser/UI verification: not performed in the AI environment; user manual verification remains required.

## Known Issues
- King Recovery는 직접적인 근거가 부족하여 임시값이며 King 평가 전체는 `draft`.
- v0.1.11에서 발견된 두 실패는 테스트 기대값 불일치로 확인되었으며 애플리케이션 로직의 결함으로 확인되지는 않음.

# v0.1.11 Verification Report

## Scope
- King을 두 번째 실제 분석 사례로 추가.
- Battle Context → Evidence → Evaluation Trace 연결 확인.

## Structural Verification
- King Evaluation: 8개 스탯 모두 존재.
- King Evidence: 3건 모두 `subjectCharacterId: king`.
- King Evaluation의 evidenceIds는 존재하는 King Evidence만 참조.
- King-Zoro Battle은 Zoro Character가 없으므로 participantIds를 비워 참조 무결성을 유지함.
- Marco 기존 평가와 Evidence 데이터는 변경하지 않음.

## Canon Review
- Chapter 1006: King이 Marco의 날개를 절단한 장면을 다대일 전투 맥락으로 기록.
- Chapter 1032: King의 높은 방어·내구 특성을 기록.
- Chapter 1035: 불꽃 상태에 따른 방어/속도 변화, 화염 공격, Zoro와의 최종전 및 패배를 기록.
- 외부 검색 자료는 근거 탐색에만 사용했고, 커뮤니티 의견은 공식 평가 근거로 사용하지 않음.

## Verification Status
- Implemented: yes
- Automatically tested: not executed in AI environment
- Integration tested: not executed in AI environment
- Actually executed: not executed in AI environment
- User browser verification: required
- Regression tested: structural review only

## Known Issues
- King Recovery는 직접적인 근거가 부족하여 임시값.
- King 평가 전체는 draft.
- Zoro Character 데이터는 아직 추가하지 않음.

# Test Report

## v0.1.10

### Structural verification
- Marco Attack and Defense no longer reference Evidence that does not directly support those stats.
- Marco Recovery, Stamina, Speed, Special Ability, Combat IQ, and Durability retain their existing Evidence links.
- Added optional validation that checks linked Evidence IDs and evaluated-character ownership.
- Marco remains a `draft` evaluation.

### Automated verification
- Added tests for valid Evidence references, unknown Evidence IDs, and Evidence belonging to another character.
- Full npm test/build execution was not available in the AI environment because `node_modules` is absent.

### Manual verification required
1. Run `npm.cmd test`.
2. Run `npm.cmd run build`.
3. Open Marco and confirm Attack/Defense remain draft scores without linked Evidence.
4. Confirm Recovery still resolves Chapter 1006 and Chapter 998 Evidence.
5. Confirm the existing Battle timeline and other Evaluation Trace entries remain unchanged.

### Verification status
- Implemented: yes
- Automatically tested: test execution not available in AI environment
- Static/structural review: completed
- User runtime verification: pending
- Browser/UI verification: pending
- Regression verification: structural only; local runtime regression pending

### Known issues / limitations
- Attack and Defense need additional direct Canon Evidence before official promotion.
- Evidence-reference validation is currently an explicit utility and is not automatically enforced during repository loading.

# Test Report

## v0.1.9

### Structural verification
- Existing Battle and Participant types were preserved without adding new context fields.
- Added `validateBattle()` at the Domain layer.
- Current sample Battles with no participant records remain valid when the participant list is also empty.
- The King/Queen Battle's three participant IDs and three participant records are structurally consistent.
- External characters mentioned in Battle descriptions were not converted into Character records.

### Automated verification
- Added validation tests for current sample data and three reference-integrity failure cases.
- Full npm test/build execution was not available in the AI environment because `node_modules` is absent.

### Manual verification required
1. Run `npm.cmd test`.
2. Run `npm.cmd run build`.
3. Open Marco and confirm the Battle timeline still renders in chronology order.
4. Expand the King/Queen Battle and confirm the existing context and Evidence remain unchanged.

### Verification status
- Implemented: yes
- Automatically tested: test execution not available in AI environment
- Static/structural review: completed
- User runtime verification: pending
- Browser/UI verification: pending
- Regression verification: structural only; local runtime regression pending

### Known issues / limitations
- `validateBattle()` is not yet wired into repository loading, so it currently provides explicit validation rather than an automatic runtime guard.
- Three Marco Battles still have empty participant lists by design because the current Character dataset does not contain all external combatants.

# Test Report

## v0.1.7

### Structural verification
- `Evidence.fact` is present in all five current Marco Evidence records.
- Evidence UI renders Fact separately from Interpretation.
- Repository and Application Evidence flows do not require changes because they pass through the Evidence object without reconstructing its fields.
- Marco evaluation remains `draft`; the evaluation data version is `evaluation-0.1.7`.
- Marco’s eight current draft scores are 78 / 79 / 78 / 84 / 86 / 93 / 92 / 84, with an arithmetic mean of 84.25.

### Automated verification
- Test/build execution was not available in the AI environment because `node_modules` is absent.
- Existing test sources were checked for score/version assertions; the only Marco score assertion found is Recovery = 90 in the v0.1.5-era test and should be updated to the new Recovery = 93 before local test execution.

### Manual verification required
1. Run `npm.cmd test`.
2. Run `npm.cmd run build`.
3. Open the Marco detail page and confirm Fact / Interpretation are displayed separately.
4. Confirm the eight draft scores and current Overall Combat Power display.
5. Confirm Battle timeline and Evaluation Trace remain unchanged in behavior.
6. Confirm King and Katakuri prototype evaluations remain unaffected.

### Verification status
- Implemented: yes
- Automatically tested: not executed in AI environment
- Integration tested: not executed in AI environment
- Actually executed: not executed in AI environment
- Visually/manual verified: pending user verification
- Regression tested: structural review only; local runtime regression pending

# Test Report

## v0.1.5

### Structural verification
- `Evaluation.status` is represented in the domain model rather than UI-only state.
- Marco Recovery is connected to two Canon Evidence records through `evidenceIds`.
- Evaluation Trace continues to resolve evidence in the Application layer.
- The calculation layer remains independent from UI and accepts the same eight-stat Evaluation shape.

### Automated verification
- Updated Evaluation Trace test to expect the two Recovery evidence records.
- Added assertion that Marco Recovery is 90.
- Adjusted calculation fixture so the arithmetic-mean test remains deterministic at 50.
- Updated Battle Evidence test expectations from 4 → 5 Marco Evidence records after adding the Chapter 998 Ice Oni record.
- Updated Battle Timeline test expectations from 3 → 4 chronological Marco Battle records after adding the Chapter 998 Ice Oni Battle.
- The user's v0.1.5 test failure was reproduced from the reported output as a stale test expectation; the application change itself was intentional.
- Full npm test/build execution was not available in the AI environment.

### Manual verification required
1. Run `npm.cmd install`.
2. Run `npm.cmd test`.
3. Run `npm.cmd run build`.
4. Run `npm.cmd run dev`.
5. Select Marco and verify Recovery = 90.
6. Verify Recovery links to Chapter 1006 and Chapter 998.
7. Verify the other seven stats remain at 50.
8. Verify the Battle timeline remains unchanged.

### Verification status
- Implemented: yes
- Automatically tested: not executed in AI environment
- Integration tested: not executed in AI environment
- Actually executed: not executed in AI environment
- Visually/manual verified: pending user verification
- Regression tested: structural review only; runtime regression pending

---

# Test Report

## v0.1.4

### Structural verification
- Evaluation Trace is assembled in the Application layer.
- UI does not resolve repositories directly.
- EvaluationItem evidence IDs are resolved to Evidence records without changing evaluation data.
- Evaluation items without evidence remain visible and do not cause a runtime lookup failure.

### Automated verification
- Added tests for linked-evidence resolution.
- Added tests for evaluation items with no linked evidence.
- Full npm test/build execution was not available in the AI environment.

### Manual verification required
1. Run `npm.cmd install`.
2. Run `npm.cmd test`.
3. Run `npm.cmd run build`.
4. Run `npm.cmd run dev`.
5. Select Marco and verify the Evaluation Trace appears below Basic Combat Stats.
6. Verify Recovery and Stamina show the linked Chapter 1006 reference.
7. Verify stats without evidence show `연결된 근거 없음`.
8. Verify the existing Battle timeline still works.

### Verification status
- Implemented: yes
- Automatically tested: not fully executed in AI environment
- Integration tested: not yet in AI environment
- Actually executed: not yet in AI environment
- Visually/manual verified: v0.1.3 baseline verified by user; v0.1.4 pending
- Regression tested: pending


## v0.1.3

### User-verified baseline
- v0.1.2 was installed and opened successfully in the user's environment.
- User visually verified the existing character screen and the Marco Canon Evidence section.

### Structural verification
- UI does not import repositories directly.
- Battle chronology is represented explicitly by `chronologyOrder`.
- Character battle timeline assembly is placed in the Application layer.
- Battle data is sorted by `chronologyOrder` before reaching the UI.
- Evidence remains separate from Evaluation and does not modify prototype scores automatically.

### Automated verification
- Added tests for chronological Battle grouping.
- Added tests for characters without linked evidence.
- Existing calculation tests remain in place.
- Full `npm test` / `npm run build` execution could not be completed in the AI environment because `npm install` exceeded the available execution time.

### Manual verification required
1. Run `npm.cmd install`.
2. Run `npm.cmd test`.
3. Run `npm.cmd run build`.
4. Run `npm.cmd run dev`.
5. Select Marco and verify Battle order: Marineford → Onigashima/Big Mom → Onigashima/King & Queen.
6. Click each Battle row to expand/collapse.
7. Confirm expanded Battle context and Evidence are shown together.
8. Confirm King and Katakuri remain unaffected.

### Verification status
- Implemented: yes
- Automatically tested: not fully executed in AI environment
- Integration tested: not yet for v0.1.3
- Actually executed: v0.1.3 not yet executed in user environment
- Visually/manual verified: v0.1.2 yes; v0.1.3 not yet
- Regression tested: not yet for v0.1.3


## v0.1.6 Verification Status

### Regression finding
- User environment: 15/16 tests passed; `getCharacterEvaluationTrace.test.ts` failed because its no-evidence fixture still queried Marco Attack after Marco Attack was converted from a prototype item to a real draft item with linked Evidence.
- Root cause: stale test fixture, not an Application-layer evidence-resolution failure.
- Fix: the no-evidence assertion now queries the prototype King Attack item, which intentionally has no linked Evidence.


- Domain stat definition structure: implemented
- Stat definition popup: implemented
- Marco draft evaluation values: implemented
- Full npm test / build: requires local execution in the user's environment
- Manual browser verification: requires user execution
