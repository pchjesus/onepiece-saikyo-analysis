# v0.1.80 — 웹앱 패치 내역·신규 4캐릭터·집단 2개

- **일자:** 2026-10-12, Asia/Seoul
- **기준:** v0.1.79 `main@f893b676169b531e6ca821f2911186c0ff620aa0`
- **범위:** UI에서 패치별 근거·변경점을 조회; 스모커/타시기/이완코브/이나즈마 및 G-5/카마바카 왕국 소속을 데이터 모델로 등록.
- **보존:** 프로젝트 `PROJECT_SPEC.md` 원본, Balanced1.2 HakiWeight0.5, 65명 기존 Core Final/Raw/Overall, 고정 Overall 5명, 기존 matchups15.

## 1. 패치 내역 버튼: UX/데이터

헤더에 `v0.1.80`과 「패치 내역」 버튼을 고정 배치했다. **스탯/매치업 어느 화면에서든** 대화형 기록창을 열어 최신 버전부터 개별 항목을 펼쳐볼 수 있다.

버전별 데이터 스키마: `version`, `date`, `headline`, `summary`, `changes[{category,title,reason,stat?{character,label,from,to,readiness},sources?}]`, `reportUrl`. **스탯 변경은 조정 전후 수치, 이유, 원문으로 연결되는 출처를 기록한다.** 사용자 기능은 사용자에게 원작 공식 점수라는 오해를 주지 않도록 점수가 프로젝트 평가임을 명기한다.

- `src/data/releases/patchHistory.ts`: 데이터 진실의 원천, 현재 버전과 v0.1.75~0.1.80 요약을 소급 수록. v0.1.75 이전 내역은 아직 소급 등록하지 않았다고 명시; 가짜 변경 내역을 생성하지 않았다.
- `src/ui/components/PatchHistoryDialog.tsx`: 버전별 접기/펼치기, 근거 링크(새 탭·noopener), 화면 외 클릭·Esc·닫기 버튼, 키보드 Tab 포커스 순환, 열고 닫을 때 포커스 복원, 내부 스크롤.
- `src/ui/App.tsx`, `styles.css`: 헤더·모바일 하단에서 열리는 대화창, 두 화면 공통 접근.

앞으로 신규 패치에서는 코드/테스트와 함께 `patchHistory` 첫 항목을 추가하는 규칙을 권장한다. 이는 **실제 Evaluation 버전과 별개인 릴리즈 내역**이며 과거 점수를 화면에서 역으로 계산하는 목적이 아니다.

## 2. 캐릭터·집단 추가

| 신규 캐릭터 | 대표 소속 및 집단(다중 Membership) | Attack / Defense / Stamina / Speed / Technique / IQ / Versatility | Overall |
|---|---|---|---|
| **스모커** | 해군 / 해군 G-5 지부 | 75 / 76 / 79 / 76 / 78 / 72 / 77 | 76.143 |
| **타시기** | 해군 / 해군 G-5 지부 | 62 / 63 / 69 / 68 / 72 / 66 / 60 | 65.714 |
| **엠포리오 이완코브** | 혁명군 / 카마바카 왕국 | 77 / 74 / 81 / 76 / 84 / 79 / 87 | 79.714 |
| **이나즈마** | 혁명군 / 카마바카 왕국 | 68 / 69 / 73 / 71 / 77 / 74 / 82 | 73.429 |

**수치는 모두 Draft 상대 검토용 임시값이고 원작에 표시된 공식 전투력이나 확정 순위가 아니다.** 직접 근거가 부족한 축은 E2/E3로 표시한다. 신규 4인의 모든 Haki Raw를 0으로 두어, Haki의 존재를 부인하는 것이 아니라 **공식 요약만으로 별도 Raw 기여량을 정밀하게 확인할 수 없는 한계**를 표현했다.

### 공식 프로필에서 확인되는 사실

- **스모커:** G-5 01부대장/해군 중장, 자연계 모쿠모쿠 열매; 타시기는 G-5 대령·스모커의 부관. (ONE PIECE.com 공식 인물 프로필)
- **이완코브:** 호르호르 열매를 사용하고 혁명군 그랜드라인 군대장 및 카마바카 왕국 여왕(영구 결번 명칭). **이나즈마**는 혁명군 그랜드라인군 부대장이며 싹둑싹둑 열매 사용자. 혁명군이 카마바카 왕국으로 거점을 옮긴 맥락은 공식 TV880에도 등장한다.
- **다중 소속은 같은 캐릭터의 GroupMembership 2건**이므로 캐릭터의 평가·검색·순위/매치업 정체성을 중복 생성하지 않는다. 그룹명은 `해군 G-5 지부`, `카마바카 왕국`이다. 카마바카의 정치적 지위를 혁명군 하위 조직으로 단정하는 게 아니라 앱의 **이용자 탐색용 parentGroupId**로 처리했다.

### 신규 전투 상황 및 제한

- **스모커:** TV587에서 로의 공격을 짓테로 막아 타시기를 보호, TV588에서 로에게 심장을 빼앗겨 패배, TV616에서 베르고의 패기 공격으로 고전. 상대 능력·패기 개입을 자연계 능력 전체의 무효화 또는 독립 강자 승리로 처리하지 않는다.
- **타시기:** TV587에서 로에 의해 신체가 나뉘었어도 검을 휘둘렀고 스모커가 구원, TV613에서 모네에게 물린 상황에서 조로가 결정타를 실행. 타시기에게 조로의 공격 성과를 이중 귀속하지 않는다.
- **이완코브:** TV448에서 탈출 임무에 맞춰 이나즈마에게 계단 절단을 지시하고 홀로 마젤란을 막으려 오카마 권법으로 대응. TV451에서 독 피해를 입은 이나즈마 치료에 착수; **타인 치료**를 자신의 Defense/Stamina나 마젤란 제압으로 계산하지 않는다.
- **이나즈마:** TV448에서 이완코브의 지시하에 계단을 잘라 마젤란의 추격 경로를 차단, TV451에서 본인은 독으로 치명상 후 이완코브의 치료를 받는다. 지형 절단은 실제 전장 통제이지만 강한 신체까지 베는 공격력을 증명하지 않는다.

신규 9개 Battle과 해당 9개 Evidence는 공식 애니 보조 자료로 등록되어 있으며, 전체 만화 전 컷 직접 검증 없이 `source.type='supplementary'`를 유지한다.

## 3. 데이터·계산·검증 범위

| 항목 | 이전 v0.1.79 | v0.1.80 기대 |
|---|---:|---:|
| 전체 Character | 66 | 70 |
| 전투력 평가 대상(unique) | 65 | 69 |
| Evaluation 레코드 | 68 | 72 |
| EvaluationItem | 476 | 504 |
| Membership 레코드 | 84 | 92 |
| Group | 기존 +2 신규 | 기존 +2 |
| 명시 Matchups | 15 | 15 |
| 기존 65인 Final (455축) | 현행 값 | **동일** |
| 기존 Raw Haki 총합(default/all) | 212 / 230 | **동일** |

보존 관계: Character↔Membership↔Group / Character↔Evaluation↔Evidence↔Battle / 계산↔Overall↔Ranking↔Matchup. 신규 자료는 `src/data/sample/v0180GroupsAndCharacters.ts`에 격리해 기존의 버전드 Evaluation을 수정하지 않았다.

검증 시 예상 중대 위험은 숫자 하드코딩 테스트의 회귀, 다중 Membership의 중복 집계, 태그·그룹 간 이동시 소속 누락, 위상 기반 근거 없는 점수 상향, 새로운 대화창의 Esc·포커스·모바일 스크롤 문제다. `v0180GroupsAndCharacters.test.ts`와 앱 UI 테스트에서 직접 점검한다.

**검증 증거는 실제 CI 완료 후 테스트·빌드·Pages 작업의 GitHub SHA로 별도 확인한다.** 실제 휴대폰 브라우저 수동조작 여부는 자동 검증과 구분한다.

## 4. 공식 보조자료

- ONE PIECE.com. *스모커 캐릭터 프로필.* https://one-piece.com/character/smoker/index.html
- ONE PIECE.com. *타시기 캐릭터 프로필.* https://one-piece.com/character/tashigi/index.html
- ONE PIECE.com. *엠포리오 이완코브 캐릭터 프로필.* https://one-piece.com/character/Emporio_Ivankov/index.html
- ONE PIECE.com. *이나즈마 캐릭터 프로필.* https://one-piece.com/character/Inazuma/index.html
- ONE PIECE.com. TV 587/588/613/616: https://one-piece.com/anime/587/index.html · https://one-piece.com/anime/588/index.html · https://one-piece.com/anime/613/index.html · https://one-piece.com/anime/616/index.html
- ONE PIECE.com. TV 448/451/880: https://one-piece.com/anime/448/index.html · https://one-piece.com/anime/451/index.html · https://one-piece.com/anime/o5027/index.html
