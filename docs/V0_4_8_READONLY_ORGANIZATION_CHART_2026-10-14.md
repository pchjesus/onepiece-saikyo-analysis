# v0.4.8 — 읽기 전용 조직도 탭 (2026-10-14)

## 1. 결정 및 범위

- 사용자 승인: 독립적인 상단 **조직도** 탭(A안), 기존 v0.4.7 안정 기준선 `main@325022a4421bbba37eff3c1d2214b17b4e556d79`.
- **읽기 전용**: 기존 Group / CharacterMembership / Character를 조회하여 소속·직책·하위 Group을 표시. 전투력 순위, 지휘관계, 조직 전투력 총합을 계산하지 않음.
- 프로젝트 기준 `PROJECT_SPEC.md` 변경 없음. Evaluation/Stat/Haki/Battle/Evidence/Matchup, Balanced 1.2/Haki Weight 0.5, v0.3.3 frozen baseline 원본 변경 없음.
- 도메인 변경 및 새 런타임 라이브러리 없음. 데이터 마이그레이션 없음.

## 2. 구현

- `src/application/getOrganizationChart.ts`: 완전한 Group 등록부 및 계층 연결(기존 `parentGroupId`)을 사용한 읽기 전용 조직도 파생. 선택 Group과 하위 Group의 Membership에 한해 수집하며, 선택 범위 내 동일 Character ID는 한 명만 유지. 동일 상태에서는 구체적 하위 Group을 우선하고 `전체 시기`에서는 current를 우선함. 순위 및 전투력 데이터 사용하지 않음.
- `src/ui/pages/OrganizationHome.tsx`: 별도 화면, 25개 Group 검색용 선택 목록, 현재 / 과거·역사 / 전체 시기, 원본 `role`/`subgroup`/`period` 표시, 구성원 카드 클릭 시 기존 상세 화면으로 이동.
- `src/ui/App.tsx`: 3번째 상단 탭 추가. 기존 Stats/Matchup 기능과 화면 상태를 분리하고, 조직도 카드 클릭은 `selectCharacter(characterId, groupId)` 재사용. 기존 순위 팝업, 상세 Evaluation 상태, 기존 검색을 조직도 상태로 덮어쓰지 않음.
- `src/ui/styles.css`: PC 카드 배치와 760px 이하 모바일 세로 카드·3개 시기 버튼 반응형 규칙. 별도 시각 QA는 아래 제한 확인.

## 3. 의미와 범위

- `Group.parentGroupId`가 실제 등록된 관계만 하위 조직으로 노출. 부모-자식 Group 관계는 인물 간 직접 명령권/지휘권과 다름.
- `role`은 원본 표현을 그대로 사용. 명목상 지위와 실제 지휘 역할은 추론으로 통합하지 않음. 역할 정렬은 표시 편의 목적이고 전투력·실질 서열로 해석하지 않음.
- `current`, `former`, `historical`는 원본 데이터의 명시된 활동기 상태이며 실제 현재 생사나 현직을 일괄 확정하는 정보가 아님. `period`는 있을 때만 노출.
- 시기 필터 기본값은 current 기록이 있는 Group/하위 Group에서 current, 없는 Group에서 과거·역사. 전체 시기에서는 historical 선장(흰수염 등)도 조회 가능.
- 해군/SWORD의 X 드레이크, 백수 해적단/토비롯포의 동일 Character는 **하나의 선택 조직도에서 한 번만** 보이되 개별 하위 Group 화면과 다른 조직에서는 각 Membership별로 등장할 수 있음. 원래의 순위 한 인물 한 행·매치업 Character unique 정책 유지.
- '분석 등록 구성원'이라는 고지를 통해 25 Group/72명만 존재하는 부분 로스터가 원작 전체 조직 명단이라는 오해 방지.

## 4. 회귀 위험 및 검사

- 신규 `getOrganizationChart.test.ts` 8건: 등록 그룹 25개, 명시적 상위 조직 관계, 1/2/3/4/10번선, 쿠잔 현재/과거 소속 분리, 부모·자식 그룹 중복 제거, 로저·록스의 과거 소속, 빈/없는 그룹, 72 Character/97 Membership 데이터 읽기 전용 재확인.
- 신규 `OrganizationNavigation.test.tsx` 4건: 세 번째 탭 왕복, 소속 시기 변경, 조직 선택 → 실제 기존 캐릭터 상세 진입, 토비롯포 구성원 중복 및 원본 역할.
- 기존 394개 테스트, 핵심 코어/버전/순위/매치업 테스트 보존. 앱 버전만 `0.4.8`로 상향; `coreDataVersion=core-v0.4.3`, `evaluationSetVersion=evaluation-set-v0.4.6`, 모델 1.2와 frozen v0.3.3 분리 유지.
- 첫 CI 5건 실패는 구 테스트에서 새 앱 배포 버전을 `0.4.7`로 고정한 기대값. 두 번째 CI 1건 실패는 새 패치 이력 `v0.4.8`을 예상 목록에 포함하지 않은 문제. 역사적 전투력 수치·기준선 비교는 유지하고 현재 UI 버전 테스트만 분리해 해결.
- **검증 완료 (PR SHA `c6cf6ec95670de15013685b4949cc9126a51831e`):** [GitHub Actions PR 38524552050](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38524552050) — **94개 테스트 파일/406개 테스트 통과**, TypeScript 타입검사 및 Vite 빌드 성공. [PR #110](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/110).
- 검증 한계: 실제 PC/모바일 브라우저의 터치·스크롤·레이아웃 시각 검수 미수행. GitHub Actions의 jsdom 테스트는 실제 기기 QA를 대체하지 않음.

## 5. 릴리즈·다음 단계

- PR #110을 main에 병합한 SHA에서 별도 GitHub Actions의 test/build/Pages deploy 성공을 확인해 릴리즈 판단한다. PR 검증 성공만으로 Pages 배포 완료라고 주장하지 않는다.
- 그룹 관계를 나중에 확대해야 한다면 명시적 Canon Evidence와 인물 간 관계/시점·근거를 따로 설계·승인하고 적용한다. 현행 Membership의 `role` 문자열을 지휘관계 자료로 재해석하지 않는다.
- 필요 시 실제 모바일/PC에서 세 번째 탭 가로 폭, 소속 시기 버튼 터치, 긴 직책/period 줄바꿈 및 카드 상세 이동을 검수하고 발견된 문제만 국소 패치한다.
