# Changelog

## v0.1.23 — Initial Three-Crew Baseline Calibration

### Added
- Whitebeard Pirates: Jozu / Vista Character Profile, Special Combat Profile, Haki Profile, Battle Context, Canon/Supplementary Evidence, 7-Core draft Evaluation 추가.
- Beasts Pirates: Queen / Jack Character Profile, Special Combat Profile, Haki Profile, Battle Context, Canon Evidence, 7-Core draft Evaluation 추가.
- Big Mom Pirates: Smoothie / Cracker Character Profile, Special Combat Profile, Haki Profile, Battle Context, Canon Evidence, 7-Core draft Evaluation 추가.
- 3 crews × 3 characters 데이터 완전성, Evaluation 참조 무결성, Special Trait Evidence ownership, Evidence→Battle/Character 연결을 검증하는 통합 테스트 추가.
- 캐릭터 선택에 crew tabs + compact character chips UI 추가.

### Changed
- Marco / King / Katakuri를 7-Core 횡단 비교 결과에 따라 `evaluation-0.1.23`으로 재보정.
- Marco Final: 77 / 85 / 82 / 81 / 80 / 79 / 84 → Overall 81.142857...
- King Final: 83 / 85 / 81 / 81 / 79 / 76 / 80 → Overall 80.714285...
- Katakuri Final: 79 / 80 / 80 / 82 / 85 / 81 / 82 → Overall 81.285714...
- 신규 Final Overalls: Vista 79.142857..., Queen 78.714285..., Jozu 77.285714..., Smoothie 76.714285..., Jack 74.428571..., Cracker 71.857142....
- Katakuri Attack은 높은 무장색·기술 다양성과 실제 결정력을 분리해 Base 77 + Effective Armament 2 = Final 79로 조정.
- Marco Versatility는 공격·방어·강자 마크·수송·상태 억제 지원 등 실제 역할 전환 폭을 반영해 84로 조정.
- King Defense는 Flame ON 고방어와 Flame OFF 고속 trade-off를 함께 반영해 85로 조정.
- Queen Versatility는 도구 수와 실제 역할 범위를 구분해 81로 조정.
- Cracker Attack은 Jack과 명확한 우열을 강제하지 않고 Base 71 + Effective Armament 2 = Final 73으로 조정.
- 스탯 카드의 Haki 표시를 Final 숫자 아래 `Base + Haki` 구조로 단순화.

### Tests
- 기존 Character List / Evaluation Trace / Battle Detail / Balanced Overall fixture를 9인 데이터에 맞게 갱신.
- 9인 calibrated Overall 계산 테스트 추가.
- v0.1.23 자동 test/build 결과는 main 반영 후 TEST_REPORT에 기록.

### Known Issues
- 모든 Evaluation은 아직 `draft`.
- Vista / Smoothie 등 원작 전투 표본이 적은 캐릭터는 일부 Stat의 confidence가 상대적으로 낮음.
- Browser/mobile visual verification은 자동 CI 범위 밖이며 수동 확인 필요.
- 캐릭터 검색 UI는 로스터가 더 커지는 시점의 후속 기능으로 보류.

### Manual Verification Required
- crew tabs에서 흰수염 / 백수 / 빅 맘 전환 후 각 3인 chip이 표시되는지 확인.
- 모바일에서 crew tabs / chips가 가로 스크롤되고 본문을 과도하게 밀어내지 않는지 확인.
- Haki가 반영된 Stat에서 Final 아래 `Base + Haki`가 표시되는지 확인.
- 9개 캐릭터 상세의 Special Combat Profile / Battle / Evidence / Evaluation Trace 연결 확인.

## v0.1.22 — Seven Core Stats & Special Combat Profile

### Added
- 비수치 `Special Combat Profile` 구조를 추가하고 악마의 열매·종족 특성·특수 생리·개조·장비·과학 기술 등을 여러 Trait으로 기록할 수 있도록 확장.
- Special Trait에 category / status / description / Evidence IDs / limitations / uncertainty 필드를 추가.
- Special Trait Evidence가 실제로 존재하고 해당 캐릭터 소유인지 검증하는 Character Domain validation 및 테스트 추가.

### Changed
- 숫자형 `Special Ability`를 Core Combat Stat에서 제거하고 Attack / Defense / Stamina / Speed / Technique / Combat IQ / Versatility의 7 Core Stat으로 전환.
- Balanced 모델을 1.2로 갱신하고 7개 Final Core Stat의 단순 산술평균을 사용.
- Haki Weight 0.5와 실제 Application Evidence 기반 Stat Contribution 방식은 유지.
- 기존 Special 관련 Canon Evidence는 삭제하지 않고 Special Combat Profile과 관련 Core Stat Evidence로 보존.
- Marco / King / Katakuri Evaluation Data Version을 `evaluation-0.1.22`로 갱신.
- 구조 전환 직후의 기계적 Overall은 Marco 80.571428..., King 80.285714..., Katakuri 81.714285...로 재계산.
- Character Detail에서 Special Combat Profile을 Core Stat과 분리해 표시하고 Overall 직접 가산이 없음을 명시.
- Package / README / PROJECT_SPEC을 v0.1.22 구조와 동기화.

### Tests
- 7 Core Stat completeness / duplicate / score validation fixture 갱신.
- Balanced 1.2의 7-stat mean, Haki Weight, calibrated Overall 테스트 갱신.
- Special Trait Evidence ownership / missing reference / duplicate id 검증 테스트 추가.
- 첫 main 검증: 11 test files / 43 tests 중 42 PASS, 1 FAIL. 원인은 Versatility 정의에 남은 stale `Special Ability` 문구였으며 계산/도메인 로직 실패는 아니었음.
- stale 정의 문구 수정 후 재검증: 11 test files / 43 tests PASS.
- `npm run build`: PASS.
- Pages configure/upload/deploy: private development 정책대로 SKIPPED.

### Known Issues
- Marco / King / Katakuri 수치는 구조 전환 직후의 기계적 재계산이며 전체 캐릭터 횡단 재평가는 아직 수행하지 않음.
- Queen / Jack / Cracker / Jozu / Vista는 아직 GitHub 정식 Evaluation 데이터로 추가되지 않음.
- Browser/mobile visual verification은 main 반영 후 별도 확인 필요.

### Manual Verification Required
- Character Detail의 7 Core Stat 표시 확인.
- Special Combat Profile 카드의 Trait / 한계 / Evidence count 표시 확인.
- Haki Base / Raw / Weight / Effective / Final 추적 UI 회귀 확인.
- 모바일에서 Combat Profile 및 Stat 레이아웃 확인.

### Next Steps
- v0.1.22 자동 test/build 및 UI 회귀 확인.
- 기존 및 논의 중 캐릭터의 7 Core Stat Overall 전면 재산정.
- 재산정 완료 후 신규 캐릭터 분석·추가 재개.


## v0.1.21 — Combat Power Scale Calibration

### Added
- Balanced 1.1에 versioned `Haki Weight = 0.5` 추가.
- Raw / Effective Haki 계산 helper와 Evaluation Trace 표시 추가.
- Raw +6 × 0.5 = Effective +3, Final 100 cap, Haki 0, 복수 Contribution, calibrated Overall 테스트 추가.

### Changed
- Marco / King / Katakuri의 8개 Base Stat을 현재 Canon Evidence와 절대 scale anchor에서 독립 재평가.
- Raw Haki 값은 유지하고 Effective Haki만 Weight 0.5 적용.
- Calculation Model 1.1, Evaluation Data `evaluation-0.1.21`, package 0.1.21로 갱신.
- King Flame ON Defense / Flame OFF Speed의 상호 배타적 Peak를 평가에 반영.
- Katakuri Future Sight의 Defense / Technique-Mastery / Combat IQ 연결은 유지하되 weighted contribution으로 완화.
- PROJECT_SPEC의 오래된 `Code: None / MVP: Not implemented` 상태를 실제 구현과 일치하도록 정리.

### Fixed
- v0.1.20 데이터 추가 뒤 남은 stale application test fixture 수정.
- 기존 GitHub Actions에서 test 7건 실패로 build가 중단되던 회귀 원인을 fixture 불일치로 확인하고 수정.

### Calibration Refinement
- Marco의 정상결전 및 Wano 방어 Evidence를 보강하고 Armament 실제 Application을 최소 Raw +2로 반영.
- Marco Attack은 결정력 부족을 고려해 Final 76으로 보수적으로 유지하고, Defense는 고화력 차단 성과를 반영해 85로 재평가.
- King은 카류돈 계열 화력을 반영해 Attack 83, 조건부 Lunarian 성능 중복을 억제해 Overall 80.75로 조정.
- Katakuri는 Snakeman전 Speed와 Gear 4 선제 대응을 보강하고 Technique 85 / Special Ability 80 경계를 재정리해 Overall 81.50으로 조정.
- 동일 Evidence의 다중 Stat 연결은 서로 다른 평가 의미가 있을 때만 허용하는 원칙을 명문화.
- 개발 중 main push에서는 test/build만 수행하고 Pages 배포는 수동 실행으로 변경.
- 최종 회귀검증에서 신규 Chapter 1022 Evidence로 인한 stale Battle Detail fixture 1건을 수정한 뒤 10 test files / 40 tests 및 production build PASS를 확인.

### Tests
- 구현 전 baseline: 35 tests 중 28 passed / 7 failed. `npm install` PASS, build/deploy는 stale fixture 실패로 skipped.
- v0.1.21 main GitHub Actions: 10 test files / 39 tests PASS.
- `npm run build`: PASS.
- Pages configure/deploy: repository Pages site가 아직 활성화되지 않아 configure-pages에서 실패; 앱 test/build 회귀와는 분리된 저장소 설정 이슈.

### Known Issues
- 세 캐릭터는 여전히 draft.
- Evidence Coverage / Confidence는 아직 별도 필드가 없음.
- Marco의 Haki capability는 confirmed지만 저장된 Application Evidence 부족으로 Raw Haki 0이며 이를 숙련 부족으로 해석하지 않음.
- GitHub Pages 실제 배포는 저장소 Settings에서 Pages를 GitHub Actions source로 활성화하기 전까지 완료되지 않음.

### Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev`
- 세 캐릭터 Final Stat / Overall / Evaluation Trace 확인.
- Battle Timeline / Evidence UI / 모바일 레이아웃 확인.

### Next Steps
- 자동 test/build/deploy 및 브라우저 UI 검증.
- Evidence Coverage / Confidence 최소 스키마 검토.
- 다음 캐릭터 추가 전 calibration sanity check.


## v0.1.20

### Added
- Katakuri 미러월드 Battle Context 및 Canon Evidence 세트
- 실제 Haki Application 기반 Stat Contribution 적용
- GitHub Pages 자동 배포 workflow

### Changed
- Marco / King / Katakuri 3인 전면 draft 재평가
- Haki Contribution Evidence 참조 무결성 검증 강화
- Vite asset base를 GitHub Pages 호환 상대 경로로 변경

### Tests
- Domain/Data/Application TypeScript 정적 검증
- 로컬 필수 검증: `npm.cmd install → npm.cmd test → npm.cmd run build → npm.cmd run dev`

# v0.1.19

## Added
- Marco / King / Katakuri 전원의 Canon Combat Profile 추가: 전투 방식, 주요 능력, Haki Profile, Canon Profile 근거.
- Character Detail에 `전투 프로필` UI 추가.
- 패기 UI에 무장색 / 견문색 / 패왕색 상태를 표시하고, 패휘감은 패왕색 괄호 정보에 해당하는 하위 상태로 표시할 수 있도록 구현.

## Changed
- Haki 타입을 Armament / Observation / Conqueror's 3종으로 정리.
- v0.1.18의 `conquerorsCoating` 독립 타입을 제거하고 `conquerors.infusion` 하위 상태로 마이그레이션.
- Evidence의 primary / secondary / context UI 문구를 `주요 근거 / 보조 근거 / 상황 참고`로 변경.
- Character 설명을 MVP placeholder에서 실제 전투 특성을 요약하는 문구로 갱신.

## Canon data
- Marco: 무장색·견문색 confirmed. 패왕색은 현재 채택 근거에서 확인되지 않아 unclear.
- King: 무장색·견문색 confirmed. 패왕색은 현재 채택 근거에서 확인되지 않아 unclear.
- Katakuri: 무장색·견문색·패왕색 confirmed. 견문색 미래예지 활용을 Combat Profile에 기록. 패휘감은 현재 채택 근거에서 확인되지 않아 unclear.
- `unclear`는 비보유를 의미하지 않으며 점수 감점 근거로 사용하지 않음.

## Tests
- Haki Domain에서 패휘감이 독립 타입으로 남지 않았는지 정적 검색.
- Character 3명 모두 Combat Profile / Haki Profile을 갖는지 데이터 구조 검토.
- Domain/Data/Application non-test TypeScript 정적 검증: 통과.
- 전체 TypeScript/Vitest/Vite 검증은 의존성 미설치 및 AI 환경 `npm install` 시간 제한으로 실행하지 못해 실제 로컬 test/build 필요.

## Known Issues
- v0.1.19의 Haki Profile은 보유/확인 정보이며 Haki Contribution을 아직 실제 점수에 적용하지 않음.
- Katakuri Evaluation은 아직 prototype 50점이며 Canon Evidence 기반 전면 평가 전 단계.
- 세 캐릭터의 전면 스탯 재평가는 Haki Application Evidence와 Katakuri Evidence 추가 후 수행 예정.

## Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev`
- Marco / King / Katakuri 전환 시 전투 프로필과 패기 정보가 정상 표시되는지 확인.
- Evidence 태그가 주요 근거 / 보조 근거 / 상황 참고로 표시되는지 확인.

## Next Steps
- Canon Profile과 기존/신규 Evidence를 실제 Haki Application / Contribution에 연결.
- Katakuri의 Canon Battle / Evidence를 정식 추가.
- Marco / King / Katakuri 3명을 동일한 8개 스탯 기준으로 전면 재평가.

# v0.1.18

## Added
- Haki Domain 타입 추가: Armament / Observation / Conqueror's / Conqueror's Coating 및 confirmed / unclear / not-confirmed 상태.
- 실제 Haki 활용이 특정 스탯에 기여하는 `HakiStatContribution` 모델 추가.
- Base Stat + Haki Contribution(스탯별 총 최대 +10, 최종 100 상한) 계산 규칙 추가.
- Evidence → Stat 관계를 `primary / secondary / context`로 구분하는 `statContributions` 구조 추가.
- Haki validation 및 synthetic Zoro 사례 기반 구조 테스트 추가.

## Changed
- `supportedStats: string[]`를 의미가 명시된 `statContributions`로 교체.
- EvaluationItem에 `baseScore`, `hakiContributions`, 계산된 최종 `score`를 함께 기록하고 일관성을 validation에서 검사.
- Overall Combat Power는 8개 최종 Stat의 기존 단순 평균을 유지.
- Marco Technique / Mastery 86 → 78: 다양한 능력 사용처를 숙련도와 중복 계산하지 않도록 재평가.
- King Technique / Mastery 93 → 86: 능력 보유·Versatility·상태 전환과 실행 숙련도의 중복을 줄이도록 재평가.
- Marco Ch.1006 재생 Evidence는 Special Ability(primary), Stamina(secondary), Technique(context)로 재분류.
- Evaluation data version을 `evaluation-0.1.18`로 갱신.

## Tests
- Domain/Data/Application의 non-test TypeScript를 global `tsc`로 정적 타입 검증: 통과.
- `npm install`은 AI 환경에서 120초 제한으로 완료되지 않아 Vitest 및 Vite build는 실행하지 못함.
- Haki contribution 계산, 0~10 제한, Evidence 요구, Evidence 역할 구조에 대한 테스트 코드를 추가/갱신함.

## Known Issues
- 현재 저장된 Canon Evidence에는 Haki application을 직접 기록한 데이터가 없어 Marco/King의 실제 Haki 가산점은 0으로 유지함.
- Katakuri는 프로젝트 내부 Canon Evidence가 없어 prototype 50점 상태를 유지함. 외부 근거를 검증하지 않고 실제 평가를 임의 추가하지 않음.
- Zoro는 synthetic Haki 구조 테스트에만 사용하며 실제 Character/Evidence 데이터에는 추가하지 않음.
- Haki +0~10 및 2점 단위 기준은 v0.1.18의 첫 계산 규칙이며 실제 캐릭터 Evidence 축적 후 재검토 가능.

## Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 Marco/King의 8개 스탯, Overall, Evaluation Trace, Evidence role tag 확인

## Next Steps
- 검증된 Canon Haki Evidence를 추가한 뒤 Katakuri / Zoro를 실제 사례로 평가.
- Haki Contribution이 Base Stat과 중복 계산되지 않는지 실제 캐릭터별로 검증.
- Battle Participant 상세 표시 등 다음 기능 후보를 우선순위에 따라 검토.

# v0.1.17

## Added
- Battle Evidence 화면에 Battle Context를 함께 표시하도록 정리함. 전투 구조, 전투 목적, 전투 의도, 환경, 제한 조건, 외부 요인, 전투 결과를 원작 근거와 함께 확인할 수 있음.

## Changed
- Defense의 Stat Definition에서 제거된 `Durability` 개념을 직접 언급하던 잔여 표현을 제거함.
- Battle Context 표시를 `EvidenceList`가 담당하도록 정리하여 작중 근거를 읽을 때 해당 전투의 상황과 평가 조건을 함께 확인할 수 있도록 함.
- Battle Timeline의 전투 구조 표시는 기존 한글 표시를 유지하면서 세부 Context는 Evidence 영역에서 일관되게 표시하도록 조정함.

## Fixed
- UI에서 이미 제거된 Durability를 Defense 정의의 제외 항목에서 계속 언급하던 문구를 현재 평가 모델과 일치하도록 수정함.
- King의 작중 근거 화면에서 전투 의도 및 기타 Battle Context가 근거 설명과 분리되어 누락되는 문제를 보완함.

## Tests
- Stat Definition의 Defense 문구를 현재 8개 스탯 모델과 대조함.
- BattleTimeline → EvidenceList의 Battle Context 전달 구조를 정적 검토함.
- 실제 `npm.cmd test` / `npm.cmd run build` 실행은 사용자 환경 검증이 필요함.

## Known Issues
- Battle Participant의 개별 상태를 캐릭터명과 함께 상세 표시하는 기능은 아직 구현하지 않음. 현재 Battle Context에는 전투 구조와 목적·의도·환경·제한·외부 요인·결과를 우선 표시함.
- Marco / King는 여전히 draft이며 전체 작중행적 전면 재평가가 남아 있음.

## Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 King의 `킹과 조로의 대결`을 열어 Battle Context와 Evidence가 함께 표시되는지 확인
- Defense Stat Info에서 Durability라는 제거된 스탯이 직접 언급되지 않는지 확인

## Next Steps
- 패기 데이터와 Technique / Mastery가 독립적인 평가축으로 기능하는지 실제 캐릭터에 적용하여 검증
- Marco / King / Katakuri의 전체 작중행적과 Battle Context를 새 8개 스탯 기준으로 전면 재검토

# v0.1.16

## Added
- `Technique / Mastery`를 8번째 전투력 스탯으로 추가.
- Technique / Mastery와 Special Ability / Combat IQ / Versatility의 경계를 Domain 정의와 테스트에 반영.

## Changed
- `Recovery`를 최상위 전투력 스탯에서 제거.
- Recovery 관련 Evidence는 삭제하지 않고, 회복·재생 사실을 고유 전투 능력의 근거로 보존하며 전투 지속 효과가 확인되는 경우 Stamina 근거로 재분류.
- Recovery를 Defense에 자동 합산하지 않는 원칙을 명시.
- Marco Technique / Mastery = 86, Special Ability = 91, Versatility = 89로 draft 조정.
- King Technique / Mastery = 93, Attack = 90, Defense = 94, Special Ability = 92, Combat IQ = 84, Versatility = 85로 draft 조정.
- Evaluation data version을 `evaluation-0.1.16`으로 갱신.

## Fixed
- Defense 설명에서 남아 있던 Durability/Recovery 잔여 표현을 현재 모델에 맞게 정리.
- Recovery를 참조하던 샘플 Evidence/테스트를 새 스탯 체계에 맞게 수정.

## Tests
- Stat definition 테스트에 Technique / Mastery의 개념 경계 검증을 추가.
- Evaluation Trace 및 Evidence fixture를 새 8개 스탯에 맞게 갱신.
- 실제 `npm.cmd test` / `npm.cmd run build` 실행은 아직 사용자 환경 검증이 필요함.

## Known Issues
- Marco / King 전체 평가는 여전히 `draft`. 이번 점수는 현재 확보된 프로젝트 Evidence를 기준으로 한 중간 산정이며 전체 작중행적 재검토 후 조정될 수 있음.
- Technique / Mastery가 장기적으로 독립적인 평가축으로 충분한지는 Katakuri 및 비능력자 강자까지 적용하는 과정에서 추가 검증 필요.
- Recovery를 제거하면서 회복 능력의 독립적인 수치 표현은 사라짐. 향후 실제 데이터 축적 후 이것이 중요한 정보 손실인지 재평가할 필요가 있음.

## Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 Marco / King의 8개 스탯, Stat Info, Evidence Trace, Battle Timeline, Overall Combat Power 확인

## Next Steps
- Marco / King의 전체 작중행적을 새 8개 축으로 다시 검토.
- Katakuri와 비능력자 강자에 Technique / Mastery 및 Special Ability 정의를 적용해 모델 편향 여부 확인.
- Recovery 관련 Evidence가 Special Ability / Stamina / Context에 충분히 보존되는지 추가 검토.

---

# v0.1.15

## Added
- v0.1.13 이후 논의된 전투력 평가 원칙을 정리하여 절대평가 스케일, Evidence 부족과 낮은 점수의 구분, 스탯 간 독립성, 현재 전투력과 성장 가능성의 분리 원칙을 명시함.
- Versatility를 향후 사황 등 상위 캐릭터까지 적용할 수 있는 절대평가 축으로 정의하고, 단순한 능력 보유 수와 실제 적용 범위를 구분함.

## Changed
- v0.1.14에서 추가된 8개 스탯 구조를 현재 기준으로 유지: Attack / Defense / Stamina / Speed / Recovery / Special Ability / Combat IQ / Versatility.
- Defense는 조건부 방어를 하나의 종합 점수로 표현하며 별도 Durability 스탯을 사용하지 않음.
- Recovery는 손상·상태 회복 능력으로 유지하되, 근거 부족을 낮은 능력으로 자동 해석하지 않는 원칙을 추가함.
- Marco / King의 기존 draft 점수는 이번 버전에서 임의로 확정하지 않고, 전체 Evidence와 작중행적 재검토 후 재산정할 수 있도록 유지함.
- Evaluation data version을 `evaluation-0.1.15`로 갱신.

## Fixed
- `getCharacterEvaluationTrace.test.ts`의 Marco Recovery Evidence 기대값을 현재 3개 Evidence 연결 상태에 맞게 갱신함.
- King Recovery rationale 테스트를 현재 문구에 맞게 갱신함.

## Tests
- 사용자 환경에서 발견된 2건의 v0.1.14 회귀 테스트 실패 원인을 확인하고 기대값만 수정함.
- 전체 테스트는 사용자의 `npm.cmd test` 실행으로 최종 확인 예정.

## Known Issues
- Marco / King은 여전히 `draft`이며 전체 작중행적 기반 전면 재평가가 남아 있음.
- King Recovery는 직접적인 회복·재생 Evidence가 제한적이므로 현재 50점은 확정값이 아님.
- King Versatility와 전반적인 90점대 분포가 과도한지 재검토 필요.
- Marco Defense / Attack / Versatility 역시 추가 Evidence와 함께 재검토 필요.
- Growth Potential은 아직 구현하지 않음.

## Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 Marco / King의 8개 스탯, Stat Info, Evidence Trace, Battle Timeline, Overall Combat Power 확인

## Next Steps
- Marco의 작중행적 및 Evidence를 스탯별로 재검토하고 점수를 독립적으로 재산정함.
- King의 작중행적 및 Evidence를 동일 기준으로 재검토함.
- Recovery가 모든 캐릭터에게 충분히 독립적인 평가축인지 검토함.
- Katakuri를 새 기준으로 실제 Evidence 기반 draft 평가할지 결정함.

---

# v0.1.14

## Added
- `Versatility` 전투력 스탯 추가.
- Special Ability / Combat IQ / Versatility의 개념 경계를 Domain 정의에 명시.
- Defense 정의에 조건부 방어 메커니즘을 포함하여 King과 같은 상태 의존형 방어를 하나의 Defense 점수로 표현할 수 있도록 정리.

## Changed
- `Durability`를 최상위 전투력 스탯에서 제거.
- Defense / Stamina / Recovery의 설명을 보강하고 중복 평가를 방지하도록 정리.
- Marco와 King의 draft 평가를 현재 Evidence를 기준으로 재검토.
- Marco: Defense 79 → 80, Durability 제거, Versatility 94 추가.
- King: Defense 96 유지, Versatility 92 추가.
- Evidence의 지원 스탯에서 Durability 참조를 제거하고 Versatility 연결을 추가.
- Evaluation data version을 `evaluation-0.1.14`로 갱신.

## Fixed
- 제거된 Durability를 참조하던 Evaluation / Evidence / Stat Definition / 테스트 잔여 참조를 정리.

## Tests
- Stat definition 테스트를 새 8개 스탯과 개념 경계에 맞게 갱신.
- Evaluation validation fixture를 새 스탯 구성에 맞게 갱신.
- 계산 모델은 `COMBAT_STATS`를 동적으로 순회하므로 8개 스탯 평균 계산 구조를 유지.
- AI 환경에서는 npm 실행 검증을 아직 수행하지 못함. 사용자 Windows 환경에서 `npm.cmd test`, `npm.cmd run build`, 브라우저 확인이 필요함.

## Known Issues
- Marco Defense는 현재 Evidence가 순수 방어 장면을 직접적으로 충분히 제공하지 않아 80점은 여전히 draft이며 추가 근거에 따라 조정될 수 있음.
- Katakuri는 아직 prototype 평가만 존재하며 실제 Evidence 기반 점수 산정은 진행하지 않음.
- 조건부 방어의 세부 상태/메커니즘을 별도 구조화한 것은 아니며, 현재는 Defense rationale과 Evidence의 맥락으로 표현함. Matchup 모델 구현 시 별도 구조가 필요할 수 있음.

## Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 Character 상세에서 Marco/King의 새 8개 스탯과 설명 확인
- Marco/King의 Evidence에서 `Durability`가 표시되지 않고 `Versatility`가 정상 표시되는지 확인
- 기존 Battle Timeline / Evidence / Evaluation Trace / Overall Combat Power 회귀 확인

## Next Steps
- 사용자 검증 결과에 따라 Marco/King draft 점수를 추가 Evidence와 대조하여 재조정.
- 필요할 경우 조건부 방어 메커니즘을 Evidence 또는 Character 능력 데이터에 구조화하는 별도 설계를 검토.
- Katakuri 실제 Evidence 수집 후 draft 평가 시작.

---

# Changelog

## v0.1.13

### Added
- 전투력 8개 스탯 중 Defense, Durability, Recovery의 경계를 더 명확하게 정의함.
- 캐릭터별 Battle Timeline의 표시 순번이 chronologyOrder와 독립적으로 계산되도록 테스트를 보강함.

### Changed
- Defense는 공격을 받기 전의 회피·방어·차단 및 직접적인 피해 감소를 평가하도록 정의를 명확히 함.
- Durability는 손상 자체에 대한 저항으로 한정하고, 회복을 통한 전투 지속을 자동으로 Durability에 반영하지 않도록 정의함.
- Recovery는 손상 이후의 재생·복구·회복을 평가하도록 정의를 명확히 함.
- Marco Durability를 78에서 74로 조정함.
- Marco Defense는 79를 유지하고 추가적인 직접 방어 근거 검토 대상으로 남김.
- Battle Timeline의 UI 번호를 캐릭터별 목록 순번으로 변경하여 King의 전투가 4, 5가 아닌 1, 2로 표시되도록 수정함.
- 프로젝트 버전을 0.1.13으로 변경함.

### Fixed
- 캐릭터별 전투 기록에서 전체 Battle chronologyOrder가 그대로 노출되던 표시 문제를 수정함.

### Tests
- 기존 Battle chronologyOrder 정렬 테스트는 유지함.
- Marco와 King의 캐릭터별 Timeline이 각각 1부터 시작하는 표시 순번을 갖는다는 기대를 추가함.
- Stat definition 테스트에 Defense/Durability/Recovery 간 중복 방지 규칙을 추가함.
- 전체 npm test/build 및 브라우저 실행은 사용자 환경에서 최종 확인 필요.

### Known Issues
- Marco Defense는 직접적인 방어 근거가 충분하지 않아 draft 상태의 79점을 유지함.
- Marco Durability 역시 직접적인 순수 내구도 근거가 제한적이므로 향후 Evidence 추가 시 재검토할 수 있음.
- 캐릭터 대표 이미지, 직함/언급, 짧은 행적 소개 카드는 아직 구현하지 않음.

### Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev`
- King 선택 후 Battle Timeline 번호가 1, 2로 표시되는지 확인
- Marco/King의 Stat Info에서 Defense, Durability, Recovery 정의가 의도대로 표시되는지 확인
- Marco Durability 74 및 Defense 79가 표시되는지 확인

### Next Steps
- Marco/King에 새 스탯 정의를 실제 Evidence 단위로 다시 대입하여 평가 일관성을 검토함.
- 이후 Katakuri를 세 번째 실제 분석 사례로 추가함.

## v0.1.12

### Added
- 없음.

### Changed
- King Evidence 추가로 변경된 Battle Detail의 현재 반환 결과에 맞게 회귀 테스트 기대값을 갱신함.
- King Recovery rationale의 현재 문구에 맞게 Evaluation Trace 테스트를 갱신함.
- 프로젝트 버전을 0.1.12로 변경함.

### Fixed
- v0.1.11에서 사용자 환경의 전체 테스트 실행 시 발견된 2건의 회귀 테스트 실패를 수정함.
- 애플리케이션 로직이나 분석 데이터 자체는 변경하지 않고 테스트의 오래된 기대값만 현재 동작에 맞게 수정함.

### Tests
- 사용자 환경에서 발견된 실패를 기준으로 테스트 기대값을 수정했으며, AI 환경에서는 `node_modules` 미설치 및 npm install 타임아웃으로 자동 테스트/빌드를 재실행하지 못함.
- 사용자 환경에서 `npm.cmd test`와 `npm.cmd run build`를 재실행해야 함.

### Known Issues
- King 평가 전체는 여전히 `draft`이며 Recovery는 직접적인 근거 부족으로 임시값을 유지함.

### Manual Verification Required
- 브라우저에서 King 선택 후 8개 스탯과 Evaluation Trace가 정상 표시되는지 확인.
- King Battle timeline 및 Evidence 표시가 정상인지 확인.

### Next Steps
- Katakuri를 동일한 데이터 모델로 추가하여 세 번째 실제 분석 사례로 검증함.


## v0.1.11

### Added
- King의 첫 실제 Battle Context로 오니가시마 킹·조로 전투를 추가함.
- King의 Canon Evidence 3건을 추가하여 Marco와의 다대일 전투 및 조로와의 1대1 전투를 분리해 기록함.
- King의 8개 스탯에 대한 1차 draft 평가를 추가함.

### Changed
- King을 기존 구조 검증용 prototype에서 실제 분석이 시작된 draft 평가로 전환함.
- King 평가 데이터 버전을 `evaluation-0.1.11`로 기록함.
- King의 회복 능력은 현재 근거 부족으로 중립적인 임시값을 유지하여 다른 방어 특성에서 자동 추론하지 않도록 함.
- 프로젝트 버전을 0.1.11로 변경함.

### Fixed
- 없음.

### Tests
- King의 Evaluation이 8개 스탯을 모두 포함하고 Evidence reference가 실제 King Evidence를 가리키도록 정적 구조를 확인함.
- 기존 Marco Evaluation / Evidence / Battle 구조를 변경하지 않음.
- 전체 npm test/build는 AI 환경의 의존성 미설치로 실행하지 못함.

### Known Issues
- King 평가값은 첫 draft이며 official 평가가 아님.
- Recovery는 직접적인 근거 부족으로 임시값이며 후속 근거 확보 시 재검토함.
- Zoro는 현재 Character 데이터에 등록하지 않아 King-Zoro Battle의 participantIds는 비어 있음. 설명과 Evidence에서는 전투 상대를 명시하되 존재하지 않는 Character reference를 만들지 않음.

### Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- 브라우저에서 King 선택 후 8개 스탯 및 Evaluation Trace 확인
- King Battle timeline에 기존 Marco·King·Queen 전투와 King·Zoro 전투가 정상적으로 표시되는지 확인

### Next Steps
- King draft를 과도하게 세분화하지 않고 Katakuri를 동일 모델로 추가해 3번째 실제 사례로 검증함.

## v0.1.10

### Added
- Added optional Evaluation validation against Evidence references, detecting unknown Evidence IDs and Evidence records belonging to another character.
- Added regression tests for valid and invalid Evidence references.

### Changed
- Re-reviewed Marco's eight draft evaluation items against the current Evidence data.
- Removed unsupported Evidence links from Attack and Defense rather than changing Evidence metadata to fit the existing scores.
- Revised Attack and Defense rationales to explicitly mark the current lack of direct Evidence and keep those scores provisional.
- Marco remains `draft`; no automatic promotion to `official` was performed.

### Fixed
- Fixed inaccurate Evaluation Trace relationships where existing Marco Attack/Defense Evidence links were not directly supported by the Evidence `supportedStats` metadata.

### Tests
- Added validation coverage for unknown Evidence IDs and Evidence records assigned to another character.
- Full npm test/build execution remains dependent on the user's environment because dependencies are not installed in the AI workspace.

### Known Issues
- Attack and Defense still require additional direct Canon Evidence before they can be considered strongly supported.
- Evidence validation is optional at the Domain utility boundary and is not automatically enforced by repository loading.

### Manual Verification Required
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Open Marco and confirm Attack/Defense still display their draft scores while showing no linked Evidence.
- Confirm Recovery and other existing Evidence traces remain unchanged.

### Next Steps
- Review whether each Marco stat has sufficient direct Evidence and whether the current score is justified independently of the Evidence count.
- Decide whether Marco can be promoted to `official` only after the full evaluation review is complete.

## v0.1.9

### Added
- Added domain-level `validateBattle()` validation for Battle identity, chronology order, context fields, enum values, and Battle/Participant reference integrity.
- Added Battle validation tests for valid sample data, missing participant references, unlinked participant records, and participant records assigned to another Battle.

### Changed
- Kept the existing Battle and Participant domain structures unchanged.
- Kept external characters mentioned in Battle titles/context as plain descriptive text; no new Character records were created solely to populate participant lists.

### Fixed
- No confirmed runtime bug fixed; this iteration adds detection for inconsistent Battle/Participant data before such inconsistencies can be treated as valid.

### Tests
- Added domain validation coverage for current sample Battle data and common reference-integrity failures.
- Full npm test/build execution remains dependent on the user's environment because dependencies are not installed in the AI workspace.

### Known Issues
- Validation is currently an explicit domain utility and is not automatically enforced by repository loading.
- Three current Marco Battles intentionally have no modeled participant records because the referenced opponents do not yet exist as Character records; this is preserved rather than filled with speculative data.

### Manual Verification Required
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Open Marco and confirm the existing Battle timeline and Evidence display remain unchanged.

### Next Steps
- Re-review Marco end-to-end: Battle Context → Evidence → Evaluation → validation.
- Decide whether Marco's draft evaluation has enough reviewed support to become `official`; do not promote automatically.

## v0.1.8

### Added
- Centralized `EvaluationStatus` values and added status definitions for `prototype`, `draft`, and `official`.
- Added domain-level `validateEvaluation()` validation for evaluation identity, status, complete eight-stat coverage, duplicate stats, score range, rationale, and evidence-id structure.
- Added Evaluation validation tests covering valid drafts, incomplete evaluations, duplicate/out-of-range values, and official status without forcing evidence on every stat.

### Changed
- Kept the existing Evaluation data structure and Application/Repository flow unchanged.
- Clarified that `official` validation currently checks structural completeness and does not automatically require Evidence for every stat.
- Marco evaluation values remain unchanged from v0.1.7.

### Fixed
- No known functional bug fixed in this iteration.

### Tests
- Added domain validation tests for Evaluation.
- Runtime npm test/build execution remains dependent on the user's environment.

### Known Issues
- Validation is currently an explicit domain utility; existing data-loading paths do not automatically block an invalid draft/official evaluation.
- Calculation behavior for draft versus official evaluations remains unchanged and will be revisited before official scoring.

### Manual Verification Required
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Open Marco and confirm the v0.1.7 evaluation values remain unchanged.
- Confirm King and Katakuri remain prototype evaluations.

### Next Steps
- Refine Battle Context using the validated Evaluation structure.
- Re-review Marco's Evidence, Battle Context, and Evaluation together before promoting Marco to `official`.

## v0.1.5

### Added
- Added the first real Marco evaluation draft: Recovery = 90/100.
- Added Chapter 998 Canon Evidence for Marco's phoenix flames suppressing the Ice Oni and supporting recovery-related interpretation.
- Added `Evaluation.status` with `prototype`, `draft`, and `official` states so evaluation progress is explicit.

### Changed
- Marco Recovery now links to Chapter 1006 and Chapter 998 Evidence.
- Marco's Recovery rationale now distinguishes direct regeneration, supportive recovery use, and demonstrated fatigue/limits.
- Character detail now labels the current Overall Combat Power as an in-progress calculation while only Recovery has been assigned a real evaluation value.
- Existing prototype values for the other seven stats remain unchanged at 50.

### Fixed
- Updated existing Battle/Evidence application test expectations to include the newly added Chapter 998 Ice Oni Battle entry.
- This was a stale-test regression caused by intentionally adding a fourth chronological Battle record; the application data flow itself was not the source of the failure.

### Tests
- Evaluation Trace tests cover the Recovery score and two linked Recovery evidence records.
- Battle Evidence tests now expect five Marco Evidence records.
- Battle Timeline tests now expect four chronological Marco Battle records in order 1 → 2 → 3 → 4.
- Full npm test/build execution remains dependent on the user's environment.

### Known Issues
- Overall Combat Power is currently a mixed intermediate calculation: Recovery 90 plus seven prototype 50 values. It is not an official final score.
- King and Katakuri remain prototype evaluations.
- Evaluation status is modeled, but the system does not yet prevent draft evaluations from being included in the calculation. This is intentional for the current incremental evaluation workflow and should be revisited before official scoring.

### Manual Verification Required
- Run `npm.cmd install`.
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Run `npm.cmd run dev`.
- Select Marco and confirm Recovery shows 90/100.
- Confirm Recovery shows Chapter 1006 and Chapter 998 evidence references.
- Confirm the other seven stats remain 50 and are still marked as draft/prototype context appropriately.
- Confirm the Battle timeline remains unchanged.

### Next Steps
- Review whether Recovery 90 remains appropriate after comparing it with the next Marco stat.
- Build the remaining Marco evaluations one stat at a time from verified evidence.
- Revisit draft/official calculation behavior before treating the final Overall Combat Power as official.

# Changelog

## v0.1.4

### Added
- Added an application-level Evaluation Trace query that resolves `EvaluationItem.evidenceIds` to Evidence records.
- Added an Evaluation Trace UI showing each stat, its current prototype score, rationale, and linked evidence references.
- Added tests for resolving linked evidence and preserving items without evidence.

### Changed
- Character detail now shows the evaluation-to-evidence trace between Basic Combat Stats and the Battle timeline.
- Prototype scores remain unchanged and are explicitly labeled as prototype values.

### Fixed
- No known functional bug fixed in this iteration.

### Tests
- Added `getCharacterEvaluationTrace` application tests.
- Full test/build execution still requires the user's environment because npm dependency installation exceeded the AI execution limit.

### Known Issues
- Official combat-power scores have not yet been assigned.
- King and Katakuri still use prototype evaluation values without linked canon evidence.

### Manual Verification Required
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Run `npm.cmd run dev`.
- Select Marco and confirm the Evaluation Trace appears.
- Confirm Recovery and Stamina show the Chapter 1006 evidence reference.
- Confirm other prototype stats can display `연결된 근거 없음` without breaking the page.
- Confirm the Battle timeline remains unchanged.

### Next Steps
- Review the Evaluation Trace UX.
- Build the first real manual evaluation for Marco from multiple verified evidence records.
- Only after evaluation criteria are sufficiently supported, replace prototype scores with official project evaluation values.

## v0.1.3

### Added
- Added `chronologyOrder` to Battle for explicit chronological presentation.
- Added an application-level character battle timeline query.
- Added a chronological Battle accordion UI.
- Added two Marineford Evidence records for Marco's encounters involving Kizaru and Aokiji.
- Added one Onigashima Evidence record for Marco's clash with Big Mom.
- Kept the existing Marco vs King/Queen Evidence record as the third chronological entry.
- Added application tests for chronological Battle grouping and empty-character timelines.

### Changed
- Character detail now presents Battle & Canon Evidence as a chronological expandable list.
- Battle context is shown before the linked Evidence when an item is expanded.
- The existing prototype combat score remains unchanged by Evidence.
- Big Mom encounter is treated as a multi-participant battlefield situation rather than a clean 1v1 in the Battle context.

### Fixed
- Preserved the UI → Application → Repository dependency direction introduced in v0.1.2.

### Tests
- Added chronological timeline application tests.
- Existing calculation and application tests remain in the project.
- AI environment: `npm install` could not complete within the execution time limit, so full test/build execution was not available in this environment.

### Known Issues
- The new v0.1.3 browser UI has not yet been manually verified by the user.
- Some Battle participants are not yet represented as full Character records because the MVP intentionally keeps the visible character sample small.
- Battle source metadata and detailed page/panel-level citations remain future data-model work.

### Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev`
- Select Marco and confirm the Battle timeline appears in order 1 → 2 → 3.
- Open and close each Battle item and confirm only the selected item expands.
- Confirm each expanded item shows its Battle context and linked Evidence.
- Confirm King and Katakuri still show the existing character UI without Marco's Evidence.

### Next Steps
- Validate the timeline UI in the user's browser.
- If stable, expand the Evidence schema and add more carefully verified records.
- Consider list sorting/filtering only after the character dataset grows enough to justify it.


## v0.1.7

### Added
- Evidence에 `fact` 필드를 추가하여 원작에서 확인되는 사실과 해석을 분리할 수 있도록 함.
- Evidence UI에서 `원작에서 확인되는 사실`과 `해석`을 별도로 표시.
- 기존 Marco Evidence 5건을 Fact / Interpretation 구분에 맞게 재정리.

### Changed
- Evidence의 기존 `interpretation` 문장에서 직접 관찰되는 장면 설명을 `fact`로 이동하고, `interpretation`에는 해당 사실에 대한 평가적 해석만 남김.
- 기존 Repository, Application, Evaluation 연결 구조는 변경하지 않음.
- 프로젝트 버전을 0.1.7로 변경.
- Marco 8개 스탯의 draft 1차 평가를 Evidence / Battle Context 재검토 결과에 맞춰 조정함.
- Marco 평가 데이터 버전을 `evaluation-0.1.7`로 변경함.
- 현재 8개 스탯 점수는 Attack 78, Defense 79, Durability 78, Stamina 84, Speed 86, Recovery 93, Special Ability 92, Combat IQ 84이며 단순 평균은 84.25임.

### Tests
- TypeScript 소스 구조 및 기존 Evidence 소비 지점을 검토함.
- 기존 Evidence 조회/Application 계층은 `fact` 필드를 직접 사용하지 않으므로 구조적 영향이 없는 것을 확인함.
- 전체 npm test/build는 이 환경에서 실행하지 못했으므로 사용자 환경의 실행 검증이 필요함.

### Known Issues
- `supportedStats`는 여전히 단순 문자열 배열이므로 여러 스탯에 대한 근거 강도의 차이를 구조적으로 표현하지 못함.
- `evaluationImpact`도 여전히 단일 문자열이며 스탯별 영향 관계를 구조화하지 않음.
- Marco 평가값은 여전히 draft이며 이번 변경으로 공식 평가로 승격하지 않음.

### Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- 브라우저에서 Marco Evidence 카드의 Fact / Interpretation 표시 확인
- 기존 Battle timeline 및 Evaluation Trace가 정상적으로 유지되는지 확인

### Next Steps
- v0.1.7의 Fact / Interpretation 구조가 실제 Marco 근거 작성에 충분한지 검토.
- 부족한 경우 다음 단계에서 `supportedStats`의 관계 표현을 별도로 설계한 뒤 적용 여부를 결정.
- Evidence 구조의 실제 사용성을 확인한 뒤 필요할 경우 `supportedStats` 관계 표현을 별도로 설계.
- Marco draft 평가를 추가 근거와 비교하면서 재검토하고, 충분한 근거가 확보되기 전까지 official로 승격하지 않음.


## v0.1.6

### Fixed
- Updated the Evaluation Trace regression fixture to use King for the no-evidence case. Marco's Attack evaluation now intentionally has linked Evidence, so the previous test expectation of zero evidence was stale.

### Added
- 8개 전투력 스탯의 정의 데이터를 Domain에 추가
- 각 스탯 옆에 설명 버튼과 상세 정의 팝업 추가

### Changed
- Marco 8개 스탯의 1차 평가값을 현재 합의된 공통 0~100 스케일에 맞춰 반영
- Durability를 순수 내구도 개념으로 분리하고 Stamina/Recovery와의 중복을 줄임
- Marco 평가 데이터 버전을 evaluation-0.1.6으로 변경

### Tests
- Evaluation Trace no-evidence test fixture updated to use prototype King evaluation.
- User environment reported 15/16 tests passing before this test-only correction.

### Known Issues
- Marco 평가값은 아직 draft이며 최종 공식 평가가 아님
- Durability 82는 현재 정의에 따른 1차 평가값으로 후속 비교에서 재조정될 수 있음

### Next
- 브라우저에서 스탯 설명 팝업 및 Marco 평가 표시 확인
- Marco 평가 분포 재검토 후 King 평가 시작

### Decision
- 스탯 명칭과 설명은 UI 컴포넌트에 중복 정의하지 않고 Domain의 단일 정의를 사용한다.
