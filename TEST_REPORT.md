## v0.4.22 — 마젤란 초상 PNG 등록 테스트 (2026-10-17)

- 신규 tests/v0422MagellanPortraitIntegrity.test.ts: 저장 이미지 499×400, 363070바이트, SHA256 및 등록 메타데이터 검증.
- 캐릭터 목록 이미지 83개, 대체 초상 0, 공통 상세·확대 컴포넌트, 전투력/모델 불변 검사.
- 실제 GitHub Actions CI 빌드·배포 결과는 별도 확인 필요. PC/Android 실기기 시각검증 미실시.

## v0.4.21 — 캐릭터 문구 간결화 + 사황 숙련도 회귀검증 (2026-10-17)

- 신규 `src/data/sample/v0421EmperorTechniqueReview.test.tsx`: 카이도98·빅맘96, 원본 Base/Raw/Final 및 이외 6축 불변, 추가 보조 Evidence 2개 연결, 화면·랭킹·감사 일치.
- `src/ui/components/CombatProfile.test.tsx`: 비브르 카드 링크 제거 및 프로필 첫 소개문 1문장 유지. UI의 기존 사실 근거·스탯·계산식은 보존.
- 원본 76개 sampleEvaluations, v0.3.3 불변. 82명/86 평가/602축/18 매치업·Balanced 1.2·Haki 0.5 고정.
- CI와 실제 Pages 배포 성공 여부는 실행 후 별도 확인, PC/모바일 실기기 시각 검증은 하지 않은 것으로 구분.

## v0.4.20 — 마젤란 정규 등록 회귀 검증 (2026-10-17)

- 신규 테스트: src/data/sample/v0420MagellanRegistration.test.tsx — 등록·소속·86.00/7축·Raw Haki0·공식 보조 Evidence 6/전투 맥락 4·공통 상세·순위·감사 보존 검증.
- 변경된 실시간 규모: 82명/86 Evaluation/602축/107 정규 소속 + 차를로스 특별인물 1. 과거 sample 76 Evaluation/532축과 v0.3.3 기준선 불변.
- 관련 역사 검증 스위트의 현재 로스터 크기·패치 내역 버전 기대값을 최신으로 갱신. GitHub Actions 테스트/빌드 결과는 워크플로 완료 후 확인. 실제 PC/모바일 시각 검증은 별도.

## v0.4.19 — 차를로스 대표 표시명 검증 계획 (2026-10-17)

- **기준선:** `main@63787a57b7f1bfe72b4d9ba7f42e5a6cfd291cc8`; 별도 작업 브랜치 `fix/v0419-charlos-display-name`.
- **변경:** 차를로스 상세 페이지의 상단 `h1`과 큰 초상 확대 접근성 이름을 `로즈워드 차를로스 성`으로 갱신. 캐릭터 원본 `name: '차를로스 성'`, ID, 조직/검색/순위/평가/Matchup, 기존 이미지/진실은 보존.
- **테스트 변경:** 기존 `charlosSpecial.test.tsx`의 대표 이름 기대값을 새 화면 요구에 맞춰 조정하고, 원본 name 보존 및 초상 확대 접근성 검증을 추가. `App.test.tsx`의 현재 앱 버전 기대값 갱신. 역사 `patchHistory` 기록은 수정하지 않음.
- **검증 결과:** 새 브랜치 변경의 자동 테스트/TypeScript/Vite/PR CI/main 배포는 **아직 미검증**. 이전 110파일/472테스트 성공 결과를 이 변경의 테스트 결과로 재사용하지 않음. 실기기 PC·Android 시각 검증도 미실시.

---

## v0.4.18 후속 — 차를로스 상세 프로필 헤더 공통화 (2026-10-17)

- **기존 대비:** 일반 캐릭터의 `detail-heading`, `detail-heading-profile`, `character-quote` 정보 구조에 차를로스 상단을 정렬. 별개 '홍보형 헤더'에서 표준 카드 구조로 변경, 아이보리/골드 컬러는 유지.
- **범위:** 차를로스 상단 JSX·전용 CSS 및 천룡인 `CharacterIdentity` 아이콘 분기만 수정. `CharacterPage`의 기존 파일은 그대로.
- **UI 테스트:** 차를로스 프로필의 초상/소속/이름/별칭/명대사 DOM 서열, 공통 quote 스타일, 원피스 51권 출처, 다른 집단의 ◆가 아닌 천룡인 전용 SVG 삽입, 모바일 구조·금색 유지.
- **보호:** 정규 81명 평가/85 Evaluation/595 축/18 매치업, 차를로스 7축/611÷7=87.3 및 Overall 82명, 팝업 ‘진실’, 사진 고해상도 두 장·원본 snapshot 불변.
- **CI:** PR에서 전체 테스트·타입 검사·프로덕션 빌드로 확인하고 main 배포 여부 별도 판정. 모바일 실기기 시각 QA는 미실시.

---

## v0.4.18 후속 — 차를로스 문구 4건 + 인용 폰트 통일 (2026-10-17)

- **변경:** 총질력 중복 제거, 맷집력 '무수한 구타', 기동력 신발/인간 대사, 진실의 갈링 성 언급.
- **CSS:** 원래 '일어나 죽지 말고'와 추가된 3줄이 동일한 `font-size: clamp(1.1rem,3.6vw,1.65rem)`과 `font-weight:800;line-height:1.6`을 사용하도록 수정. 모바일 단독 축소 폰트 제거.
- **추가 테스트:** 4개 문구의 정확성, 동일 손가락 문구 중복 방지, 팝업 속 갈링 성 문장, 인용 크기와 모바일 오버라이드 부재.
- **보호:** 기존 charlos 7축·611/7 Overall, 82명 전체 순위·정규 81명/85 Evaluation/595축, 18 Matchup, v0.3.3 동결 스냅샷 등 변경 없음.
- **검증 결과:** PR CI 및 Pages 배포 성공 여부를 작업 완료 시 별도 확인. 실기기 모바일 텍스트 레이아웃은 아직 자동 테스트만으로 시각 검증하지 않음.

---

## v0.4.18 후속 — 차를로스 모바일 정돈·진실 전체 복원 (2026-10-17)

- **요구:** 사용자가 직접 제공한 Android 화면 캡처 기준. 별표+테두리 칭호, 두 문장 개별 블록, 모바일 한 줄 대사 독립 전체 폭, 기존 팝업 전량 복원 후 지정 3줄을 한 블록 추가.
- **추가 검증:** 차를로스 7축과 종합 87.3/전체82명·정규 81명/85 Evaluation/595축·18 Matchup 유지. 5개 복구 서사 문장의 정확한 복원과 기존 ‘인류의 구원자’·‘일어나 죽지 말고’·‘악마다이’ 복귀, 3줄의 정확한 문구/순서/위치, 기존 암전·이미지·Escape 복귀 검사.
- **모바일 CSS 테스트:** 새로운 `tests/charlosMobileLayout.test.ts` 3개는 700px 이하에서 스탯 그리드 3행/전체 너비 대사 및 초소형 화면 줄바꿈 폴백과 호칭 배지 스타일을 정적으로 확인. 실제 기기에서 픽셀 측정한 테스트는 아님.
- **PR CI 검증:** [Actions #38943788311](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38943788311) (head `e9d262b806cca9029c0a32b670071d744476edb1`) **110개 테스트 파일/469개 테스트 통과**, TypeScript `tsc -b` 및 Vite 빌드 성공. 문서 반영 후 최신 head 재검증과 `main` Pages 배포는 별도 확인. 사용자 제공 Android 스크린샷으로 설계했지만 실기기 픽셀 배치 검증은 아직 미실시.

---

## v0.4.18 후속 핫픽스 — 차를로스 고화질 이미지·캐주얼 서체 (2026-10-17)

- **원인:** 첫 배포부터 차를로스의 기본/히든 이미지만 300px WebP로 축소하여, 확대 시 원본보다 뚜렷하게 흐릿함. 명조 계열 `Georgia / Noto Serif KR`도 사용자 요청의 유쾌한 캐릭터 톤보다 지나치게 격식 있게 보임.
- **변경:** 사용자 기존 첨부 원본을 기반으로 1536×1230/1536×1536 WebP(89,522/107,410 bytes)로 다시 등록. Git SHA 및 로컬 Git blob 해시 일치. 종전 300px 경로 삭제 후 버전된 새 파일명으로 참조해 캐시 우회.
- **서체:** 차를로스 범위에 한정하여 제목, 51권 대사, 인트로/진실 영역을 **굵은 시스템 산세리프(대부분 800)**로 변경. 일반 캐릭터 UI 및 폰트 체계 불변.
- **자동 회귀:** `tests/charlosHighResAssets.test.ts`에서 GitHub에 등록된 WebP 전체 bytes SHA-256, RIFF 형식, 원본 1536px 해상도 검사. 캐릭터 기본 초상 경로/진실 팝업 이미지 참조 갱신 검증. 7축 87.3, 전체 랭킹 82, 기존 정규 평가·매치업 불변.
- **CI/배포:** PR CI 및 `main` Pages 결과 확인 후 기록. 실제 기기 시각 QA는 미실시, 저작권·재배포 허가 미확인.

---

## v0.4.18 후속 핫픽스 — 진실 팝업 3줄 고정 (2026-10-17)

- **요청:** 차를로스 진실 팝업에서 흑백 이미지와 세 문장의 연속 대사만 노출. 추가 서사·보조 문구·해설 없음. 접근성 숨김 제목 및 × 닫기는 유지.
- **테스트 추가:** 정확한 세 문장 배열과 순서·공백·문장부호, 팝업 본문에 다른 문구가 없는지, 흑백 이미지 경로, Escape 시 종료 및 배경 스크롤 복구.
- **변경 범위:** `CharlosTruthDialog`, `charlosTruthMonologue` 데이터, 관련 CSS, 테스트 및 문서. 사용자 요청 외 7축/87.3/일반 캐릭터 UI/순위/평가/매치업/그림 바이너리 불변.
- **CI:** GitHub PR 검사 및 병합/배포 결과 확인 후 별도로 기록. 실제 PC/모바일 화면 검증 미실시.

---

## v0.4.18 — 차를로스 문구 UX 정리 (2026-10-17)

- **기준:** `main@b345a39c81f29e3d3a70b8015346e8ff51196f94` · v0.4.17.
- **범위:** 스탯/소속/정규 페이지 구성과 모델·평가 데이터 무변경. 사용자가 지적한 메타 개그 설명 삭제, 51권 지정 대사, 호를로스 성 설정, 공통 CharacterPage 정책 문서화.
- **테스트:** UI 정적 렌더에서 사용자 요청 문구·불필요한 설명 부재, 진실 팝업의 노출/종료, 7축 611/7, 오버롤 82 vs 일반 81, 85 Evaluation/595축 및 18 Matchup 불변.
- **PR CI 확인:** [Actions #38927621947](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38927621947) head `e36747c3f4cb2b16b9b52106bb7557a53193f7d2` · **108개 파일 / 463개 테스트 전부 통과**, TypeScript `tsc -b` 및 Vite 빌드 성공. 최초 CI #38927430235에서 (1) 과거 독립 스냅샷 버전 불변, (2) 호를로스 성 문구 기대값 2건을 보정 후 전수 통과. 최신 문서 head CI·`main` 배포는 별도 확인. PC/모바일 실제 시각 QA는 미실시.
- **이미지 품질:** 원본 1536px JPG 확보 및 원본 해상도 1536px WebP Q92 재가공 완료(로컬). GitHub 바이너리 자산 교체는 별도로 확인해야 하며 코드·문구 CI가 통과해도 고화질 자산 배포까지 완료했다는 뜻은 아님.

---

## v0.4.17 — 차를로스 성 특별 평가 (2026-10-16)

- 시작 기준: v0.4.16 `e438e933de20973d32657c59a8616d985354e8b0`.
- 변경: 천룡인 캐릭터 1명 / 특별 밈 7축 / Overall 전용 1행 / 사용자가 준 이미지 WebP 2장 / 암전 후 진실 팝업.
- 보호 범위: 기존 Balanced 1.2·Haki Weight 0.5·v0.3.3 고정 JSON, 기존 정규 81명·85 Evaluation/595축 및 18 Matchup 숫자 변화 없음.
- 검증: 신규 분리된 풍자 평가 수치, 로스터 82·Overall 82/정규 각 축 81, UI 팝업 Escape/포커스, 이미지 파일 경로 및 진실용 자산, 그룹 조직도 연동. **PR CI [#38923388688](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38923388688)에서 108개 파일·463개 테스트 전부 통과, TypeScript `tsc -b`·Vite 프로덕션 빌드 성공** (검증 HEAD `f7612f029168f008e6ea59bb13a1ae93d689c64f`). 앞선 CI에서 이전 로스터 개수 고정 테스트를 원본/현재 집단으로 분리해 조정했고, 마지막에는 `rank`를 정렬 후 생성하는 데이터의 타입 오류를 해결함. **main 병합·Pages 배포는 별도로 최종 확인**.
- 이미지: 원본 1536px 유저 제공 JPG는 웹 전달용 300px WebP로 변환되어 등록됨. 원저작권·배포 허가는 미검증.

---

## v0.4.16 — CP0 Stage 2A (2026-10-16)

- **기준:** `main@1c2dd35435efba45a3c1ec353c53ff6e6e8f42b1` (v0.4.15).
- **변경:** 마하 4축 + 게르니카 Combat IQ의 E2→E3, 해당 `v0412` 공식 TV Evidence ID 유지 및 `secondary→context`로 축별 역할 교정. 과거 v0.4.12 원본/다른 79명/모든 Base·Raw·Final·Overall 불변.
- **신규 자동 테스트:** `src/data/sample/v0416Cp0EvidenceReadiness.test.tsx` — 원본 vs 현재 뷰, 5축 한정성, E3+context, Evidence 참조·원출처·사실 보존, 감사 81/85/595/106/18, Rank·상세 페이지·Haki/모델/v0.3.3 보호.
- **PR CI 확인:** [Actions #38899338006](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38899338006), head `8cd75347fb0b4e327712e0e430f86f3f4d620e02`; **107개 테스트 파일/458개 테스트 전부 통과**, `tsc -b && vite build` 성공. 실제 `v050` 감사 집계 E1 **69** / E2 **346** / E3 **180**, 전체 595축. 5개 E2→E3 전환 외 수치·Haki·모델 변화 없음.
- **실패·수정 이력:** 첫 PR CI #38899175869에서 458개 중 457개 통과. 구형 8인 통합 감사 테스트가 v0.4.12 E2/E3 원본 비율(40/16)을 현행 화면 값에도 고정한 탓. 원본 **40/16 검증은 유지**하고, 현행은 **35/21 + 정확히 5개 `context` 연결**로 검증하도록 수정. 이후 최종 458개 전부 통과.
- **후속 확인:** 문서 결과 반영 이후 최신 PR head CI 및 `main` 병합·Pages 배포 SHA 최종 확인. 실기기·원작 컷 직접 검증은 미실시.
- **후속:** Stage 2B 추가 원작 컷 확인 및 7축 수치 재평가는 사용자 별도 승인 전 보류.

---

## v0.4.15 — 에넬 승인 재평가·명대사 회귀검증 (2026-10-16)

- **Scope:** 기존 v0.4.14 main SHA `2306ed6c7a2e16db380ff419fd143e58bdd487c4`를 기준으로 에넬만 7축 현재 표시값 조정; 이외 기존 평가·18대진·권리 미확인 초상·v0.3.3 고정 기준선 불변.
- **New test:** `src/data/sample/v0415EnelReview.test.tsx` — v0.4.13 원본 88/72/72/88/84/70/87 유지, 현재 85/74/72/86/86/76/87, Overall 566/7, Haki Raw0, 평가/Evidence ID, 81인 순위, 85 평가/595축/106 소속/18대진 감사, 명대사 공식 인용과 한국어 편집 번역 및 상세 UI.
- **Updated historical expectations:** v0.4.13 원본 평가와 현재 표시 평가 검사를 분리; 명대사 15 official / 66 secondary / 0 pending, 릴리즈·패치 이력 테스트 최신화.
- **Verified PR CI (code head `4482b96f5db330fe7c56e701c9cf86a3e285ee85`):** [GitHub Actions #38882984413](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38882984413), 106개 테스트 파일·454개 테스트 전부 통과, `tsc -b && vite build` 성공, 읽기 전용 감사 아티팩트 업로드 성공. 이후 문서-only 수정 시 최신 head CI를 다시 확인.
- **Failure and correction:** 첫 CI에서 현재 앱 버전·인용 개수의 구형 기대값 12개 불일치, 두 번째 CI에서 현재 표시 버전·패치 이력 합계 2개 불일치. 실제 평가 데이터/계산식 오류는 아니며 테스트 삭제·완화 없이 최신 통합 상태 기준 기대값을 수정. 기존 역사 데이터 검증 유지.
- **Manual verification:** 실제 모바일·PC 브라우저, 원작 만화 컷, 한국 정식 번역의 직접 확인은 별도.

---

## v0.4.14 — 에넬 이미지 · 하늘섬 루피 매치업 변경 검증 (2026-10-16)

- **기준:** v0.4.13 main `758786749050c1f37df9436522ace7d8c481d19c`, 기존 81인·85 평가·595축·106 소속·17 대진.
- **신규 테스트:** 사용자 초상 114638 bytes / WebP magic / SHA-256 및 Git blob SHA-1, 고유 매치업 1건/Evidence 연결, 원작 결과와 상성 구분, 상태 없는 하늘섬 루피의 이시대 수치·기어5 선택 UI 비노출, 좌우 교체, 기존 추천 대진 수치 복원.
- **전수 감사 기대값:** 81 Character, 81 assessed, 85 Evaluation, 595 axes, 106 Membership, 18 Matchup, 오류 0; 7축 에넬 평가 및 카쿠 v0.4.13 상태, Haki Raw 0 (에넬), Balanced 1.2/ Haki Weight 0.5 / v0.3.3 고정 기준선 불변.
- **GitHub PR CI 검증 완료:** [PR #123, Actions 38875595820](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38875595820), 검증 head `08ef3bd101bdbe7b43585d8b7157c7755f8126be`. **105개 테스트 파일 · 450개 테스트 전부 통과**. `tsc -b && vite build` 성공 (Vite 8.3.3). 읽기 전용 감사 CSV/JSON [Artifact 12035670002](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38875595820/artifacts/12035670002) 업로드 성공. Pages는 PR이 아닌 `main` 배포에서 별도로 확인한다.
- **발견·수정한 실패:** 초기 CI는 18/450 실패. 과거 72/80인 전용 감사 픽스처가 신규 에넬 ID를 포함한 현재 매치업 18건을 참조해 무결성 오류 발생 → 구버전 픽스처를 원래 15+2건으로 고정하면서 최신 통합 18건을 별도 검사. 구버전 테스트의 현재 앱 버전/매치업 수 기대값 갱신, 초상 UI 신규 81번째 이미지와 패치 기록 28개 확인. 신규 Node 바이너리 해시 테스트를 `src`에서 `tests`로 이동하여 TypeScript 타입 범위 오류 해결. 기존 기준선 검사와 필수 테스트는 삭제하거나 완화하지 않음.
- **검증 범위 차이:** 원본 WebP와 Git SHA byte 검증 및 JSDOM 가상 DOM 테스트는 실제 Android·iOS·PC 브라우저 이미지 렌더링·Lightbox 화면 확인과 별개다.
- **미확인:** 원작 정식판 컷 단위 전수 비교, 저작권/공개 재배포 권리, 실기기·실제 브라우저 레이아웃. [코드 영향·출처·시점 분리 정책](docs/V0_4_14_ENEL_PORTRAIT_LUFFY_HISTORICAL_MATCHUP_2026-10-16.md).

---

## v0.4.13 — 에넬 신규·카쿠 보류 평가 공개 (2026-10-16)

- 기준 main: `e703748bb4507dac96925137e4a0bb95d100c214`. 80인 역사적 평가 전체 보존, 신규 에넬 7축 draft/Evidence/Battle/소속/명대사 pending 및 카쿠 6축 재평가 공개.
- 현재 통합: 81 Character, 85 Evaluation, 595 Stat, 106 Membership, 17 Matchup. 기존 80인 명대사는 그대로 유지하고 에넬만 검증 보류.
- 595축 통합 감사 재집계, 평가 저장 버전 분리, 신규·기존 순위·상세 SSR·History·기준선 회귀 검증은 PR CI 결과 확인 후 최종 기록.
- **미검증:** 원작 컷 완전 대조, 에넬 이미지 재배포 권리(이미지 없음), 대표 대사 실발언, 실제 모바일/데스크톱 브라우저 시각 QA.
- [등록·잠정 수치·출처 근거](docs/V0_4_13_ENEL_KAKU_DRAFT_PUBLICATION_2026-10-16.md).

---

# v0.5.0 Stage 1 — 전체 80인/588축 읽기 전용 감사 검증 (2026-10-16)

- **기준 main:** `4965b6e1e698888d2b363b9b606f835c65661e27` (앱 v0.4.12, B+ 정책 추가).
- **확인된 PR CI:** [#121, Actions 38865541058](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38865541058) · 검사 SHA `b3e9b7cab1d4efdd103c0f22f1bd7b0405609620` · **103개 테스트 파일/440개 테스트 모두 통과**, `tsc -b && vite build` 성공.
- **아티팩트:** [588행 CSV + 집계 JSON](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38865541058/artifacts/12030867589) (7일 유지). E1 **69** / E2 **347** / E3 **172**, 결측 readiness 0; **고득점 E3 19축**, 직접 Evidence ID 없는 6축, 동일 Evidence 다축 Haki Raw 12건(29개 축 연결), 한 스탯 복수 Haki 종류 2축. 이는 **검토 후보**이며 확정 오류가 아님.
- **전수 통합:** Character 80, 평가 대상 고유 인물 80, Evaluation 84, 스탯 588, Membership 105, Matchup 17. 별도 v0.4.12 신규 8인 56축(E2 40/E3 16), 패기 Raw0, 기존 76 Evaluation 보존.
- **회귀:** 현재 80인 Overall 및 7축 랭킹, 84건 Evaluation 각 계산식, CSV 결정성·출처 역할 매핑, v0.3.3 독립 JSON 파일 바이트 및 입력 비변경 검사 통과.
- **빌드 장애 해결 이력:** 최초 PR Actions 38865366312에서는 103파일/440테스트 및 CSV 생성 성공 후 TypeScript 빌드가 Node 타입/ES `replaceAll` 호환 문제로 실패. Node 테스트를 `tests/`로 이동하고 ES 호환 문자열 치환으로 수정한 뒤 위 CI에서 빌드까지 성공.
- **미검증:** 작품 원작 컷 단위의 전수 내용 검증, 588축 점수의 규범적 정당성, 실제 PC/모바일 수동 UI, 명대사 정식 한국어판과 이미지 사용권. 이번 PR에서는 **점수·가중치·계산 모델·매치업·UI·역사적 기준선 변경 없음**.
- **후속:** 위험군의 Canon Fact/조건/해석 심층 검토, 유사 캐릭터 동축 비교, 개별 제한적 재산정 후보/전체 순위·매치업 영향 분석 후 사용자 승인. 문서 최종 병합과 Pages는 별도 최신 SHA 검증 예정.

---

# v0.4.12 후속 — 명대사 80명 전체 선정·검증 (2026-10-15)

- 스무디/마하 2명 추가, 80/80 quote 슬롯의 실제 문구·출처·상태 표출. 14 official-excerpt / 66 secondary-excerpt / pending 0.
- 신규 자동 테스트: 원작/애니 화수, 인물별 발언자, 2차 출처 연결, 한국어 자체 번역, 두 인물의 상세 UI와 80명 명대사 등록 완료 확인.
- 76+8 Evaluation 원본·Balanced 1.2/Haki Weight .5·15 direct matchup 원본 불변.
- **자동 CI 최종 확인 대기:** PR head 테스트/빌드와 main Pages 배포 확인 후 완료 처리. PC/모바일 실기기 시각 확인·원작 컷/정발 번역 대조는 별도.
- [2인 출처 검토](docs/V0_4_12_FULL_80_QUOTES_SMOOTHIE_MAHA_2026-10-15.md).

---

# v0.4.12 — 80명 평가·69명 명대사 후보 회귀 검증 (2026-10-15)

- 신규 8 Evaluation/56 축과 공식 ONE PIECE.com 애니 시놉시스 근거 연결, 소유권/교전 상황/기존 76 Evaluation 원본 불변.
- 명대사 69인 후보(official-excerpt 15, secondary-excerpt 54), pending 11. 사용자 요청 특수 인물 8명의 후보·화수·원작 미대조 표기 검사.
- 기존 v0.3.3 스냅샷, Balanced 1.2/Haki Weight .5, 17 매치업, 80명 Rank UI 회귀 검사.
- **PR 및 배포 자동 검사:** 최종 GitHub Actions 결과 확인 전에는 완료라고 보고하지 않음. 기기 시각 QA/만화컷/한국 공식 번역 대조 별도.

---

# v0.4.11 신규 인물 8명 선등록 검증 (2026-10-15)

- 기준 v0.4.10 main@741335a0. 신규 8 Character, 8 Membership / 신규 Evaluation 0, 신규 Battle/Evidence 0, 새로운 Matchup 0.
- 80 registered characters / 72 evaluated characters / 76 Evaluation / 532 Stats / 105 Memberships / 17 Matchups.
- 공식 출처 인용 19건(기존 13 + 새 밀짚모자 6), 그 외 61건은 검증 대기. 게르니카/마하는 임의 대사로 채우지 않음.
- 기존 v0.4.9 Evaluation 세트/계산 모델/Raw Haki/역사적 스냅샷 수정하지 않음.
- 이미지 전달 및 공개 재배포 권한 미확인. 이미지 파일과 목록의 일치/누락 검사 및 브라우저 직접 렌더링은 별도 확인 대상.
- **PR #114 코드 검증:** [GitHub Actions 38676384262](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38676384262)에서 98개 테스트 파일·419개 테스트 전부 통과, TypeScript/Vite 빌드 성공.
- **사진 등록 완료:** 8개 원본 크기 WebP 파일을 PR #114 브랜치의 `public/images/characters/`에 실제 업로드하고 Git 트리에서 경로·크기·Blob SHA-1 전수 확인. `tests/v0411PortraitBinaryIntegrity.test.ts`에 RIFF/WebP 헤더·파일 크기·Git SHA-1·Character 매핑 검증 추가.
- **최종 검증 대기:** 이미지 추가 이후의 최종 PR CI·main 병합 및 Pages 배포 결과는 별도 확인. 실제 PC/모바일 브라우저 화면 직접 검증은 미수행.

---

# v0.4.10 — 캐릭터 명대사 검증 범위 (2026-10-15)

- 신규 72명 ID별 quote 슬롯, 13명 ONE PIECE.com 인용 확인, 59명 원문/표시 문구 비워둠.
- 신규 코드 테스트: 72 ID 매칭·검증상태·출처 URL·미검증 누락·캐릭터 전환·루피 복수 Evaluation 상태·독립 데이터 경계.
- 기존 캐릭터/평가/계산/패기/조직도/매치업 코드를 직접 수정하지 않음.
- **검증된 선행 PR CI:** [Actions 38673490200](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38673490200) — 97개 테스트 파일·415개 테스트 모두 통과, TypeScript/Vite 빌드 성공. 이후 명대사 번역 출처 표시를 추가 교정했으므로 해당 후속 변경의 최종 PR CI는 별도 재확인 필요.
- **main Pages 배포:** 병합 전이므로 아직 확인되지 않음.
- **미검증:** 원작 만화 컷 화수, 한국 정식 단행본 번역, 실제 PC/모바일 브라우저 시각 QA.

---

# v0.4.9 — 확정 스탯 재평가와 전 시기 조직도 통합 (2026-10-15)

- 기존 `evaluationsBeforeV049`에 v0.4.6 평가를 보존한 채 현행 두 평가(코비·스모커)에만 11축 수정, Haki Raw 0 보정 및 기존 70명 동일성 검증.
- 세계회의 코비 TV879 어뢰 탐지/요격 신규 Battle 1 / Evidence 1의 소유권/연결 검증.
- 조직도 모든 시기 기본 표시, 해군의 쿠잔/로저 해적단의 로저/흰수염 해적단의 뉴게이트 및 하위 그룹 중복 여부 UI/응용 테스트.
- 이전 스냅샷, 72명/76평가/532축/97소속/17매치업 및 Balanced 1.2/Haki0.5 유지.
- CI/Pages 및 실기기 검증 여부는 후속 결과에 따라 기록. 실제 PC/모바일 시각/터치 검증 미실시.

---

# v0.4.8 — 조직도 조회·소속 시기·그룹 중복·앱 내 이동 (2026-10-14)

- 기준: v0.4.7 `main@325022a4421bbba37eff3c1d2214b17b4e556d79`. 상세 [v0.4.8 조직도 구현/검수 문서](docs/V0_4_8_READONLY_ORGANIZATION_CHART_2026-10-14.md).
- 읽기 전용 기능: 25 Group, parentGroupId 기반 조직·하위 Group, 97 Membership의 role/subgroup/status/period, current/past/all 필터, 고유 인물별 중복 제거 및 기존 상세 진입.
- 신규 테스트 2파일/12건: 검은수염 선단, 쿠잔 과거 해군/현 검은수염, 토비롯포/SWORD 부모/자식 중복, 로저·흰수염 historical, 빈 그룹, 72/97 원본 무변경, 상단 3개 탭 이동, 필터·상세 진입·기존 스탯 유지.
- 과거 전투력/모델/역사 JSON 검증 394건 보존. 앱 배포 버전 0.4.8 표시를 기존 테스트와 구분. 첫 CI에 기록된 현재 앱 버전 5건 및 두 번째 CI의 patch history 목록 1건 실패를 수정. 이전 평가 점수/역사적 기준선 테스트는 삭제하지 않음.
- **PR 빌드/자동 테스트 완료:** [PR #110](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/110), [PR Actions 38524552050](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38524552050) — **94개 파일/406개 테스트 전부 통과**, `tsc -b && vite build` 성공. 기능 병합 `main@e5a5f0d2a1d26ca71e6dbdf30ecb326139cc32bf`; [main Actions 38524967824](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38524967824)에서 94개 파일/406개 테스트, TypeScript/Vite 빌드 및 Pages deploy 모두 성공.
- 데이터: 72 Character/76 Evaluation/532 Stat/97 Membership/17 Matchup, Balanced1.2/Haki0.5, historical v0.3.3, core-v0.4.3, evaluation-set-v0.4.6 불변.
- **미검증:** 실제 PC/모바일 브라우저에서 조직도 폭·스크롤·터치 영역·긴 직책/시기 줄바꿈 및 클릭 이후 시각 상태.

---

# v0.4.7 — Overall 팝업 선택 초기화·추천 대진 상태 귀속 (2026-10-14)

- 기준 `main@8c9df6ed4684ee17ab00095f14df68636a8561ca` (v0.4.6). [상세 변경·검증 계획](docs/V0_4_7_RANKING_POPUP_RESET_AND_MATCHUP_LABELS_2026-10-14.md).
- 기능: `getHighestOverallStateIds()`로 모든 복수 Evaluation 인물의 높은 7축 Final 평균을 팝업 첫 상태로 지정; `StatRankingDialog` 내부 state로 변경/정렬을 격리하고 닫을 때 unmount·초기화; CharacterPage 상세 선택은 유지.
- 추천 대진: 상태명은 각 `matchup-featured-side[data-character-id]`의 캐릭터 이름 아래 배치; 루피 Gear4/Gear5를 티치의 상태로 오인할 위험 방지, 미래에 B쪽도 상태가 있으면 동일하게 처리.
- 회귀: 루피/흰수염/가프 최고 상태, 72명 단일 row, 재정렬/기어 상태 변경, 상세 상태 비간섭, X/외부/Escape 초기화, 17 대진의 상태 소속/버튼 선택/좌우 교체와 가로 스크롤 정적 CSS 확인.
- **검증·배포 완료:** [PR #108](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/108) / [최종 PR CI 38521641851](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38521641851)에서 **92개 파일·394개 테스트 전체 통과**, TS/Vite build 성공. 기능 병합 `main@d61a293944ba132b8d1b67ca40318870f8e9bcae`; [main CI·Pages 38521751638](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38521751638)에서 테스트·빌드·Pages 배포 전부 성공. 초기 CI 9건 실패는 기존 구 버전이 현재 appVersion/패치 첫 기록이라는 가정으로 인한 것으로, 역사 v0.4.6 점수 검사와 현재 0.4.7 UI 버전 검사를 분리한 뒤 해결. 실기기 UI/원작 컷 감사 미수행.
- 데이터: Evaluation·Battle·Evidence·Haki·Matchup·계산/패기 모델·Frozen JSON 등 도메인 구조 및 v0.4.6 결과 불변.

---

# v0.4.6 — 15축 교차 평가·상태별 순위·추천 대진 체크 UI 회귀 (2026-10-14)

- 기준 `main@e2b4be6c176459d2cee3e5a43d00d1e14a45817c` (v0.4.5 검토 문서 병합 후). [v0.4.6 상세 보고서](docs/V0_4_6_FIVE_CHARACTER_STATES_RANKING_MATCHUP_2026-10-14.md).
- 5명/15축 후보 승인 반영, v0.4.5 76개 이전 평가를 `evaluationsBeforeV046`로 독립 보존. E1/E2/E3·Base/Raw/Final·중복 보너스·제3인물 불변 자동 검증.
- 선정 복수 평가 상태의 원값 평균과 한 사람 한 행 순위, 선택에 따른 등수 재계산, 상세/순위표의 상태 양방향 동기화(Luffy Gear4/Gear5, Newgate Prime/Marineford) 자동 테스트. 매치업 추천 대진 17개 기존 선택·조건부 상태와 체크 ::after CSS no-wrap 자동 확인.
- 첫 기능 PR CI에서 구 역사적 스냅샷 테스트 6건이 새 현행 점수를 읽어 불일치. 수치 기대값만 갈아끼우지 않고 역사 Eval 원본으로 계산하도록 교정. 이후 CI 재실행 확인 대상.
- 종합 7축 모델 Balanced1.2/HakiWeight0.5, 원본 v0.3.3 JSON/17 대진/72 고유명/97 Membership/532축/76 평가·이전 v0.4.5 점수/미호크 Attack97 불변.
- **검증·배포 완료:** [PR #106](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/106), [PR CI 38519741299](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38519741299)에서 **92개 테스트 파일/393개 테스트·TypeScript/Vite 빌드 성공**. 기능 병합 SHA `f44c121d9baa183d3978fe7aedb8cd0e87af2fff`; [main CI·Pages 38519878008](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38519878008) 테스트·빌드·배포 모두 성공. 역사 점수 테스트는 보존된 Evaluation을 읽도록 교정, CSS 정적 검사는 tests/로 옮겨 브라우저 TS의 Node 모듈 충돌 제거. 원작 컷 단위 전수 검증과 실기기 모바일·PC 육안 확인은 미수행.

---

# v0.4.5 — 티치 Technique·Versatility 국소 재평가 (2026-10-14)

- 기준 `main@d12fa4331a6e3b1854037048b2fcb2cf142d8c3d` (v0.4.4). [v0.4.5 근거·재평가 보고서](docs/V0_4_5_TEACH_DUAL_FRUIT_REVIEW_2026-10-14.md).
- 티치 Technique **93→94(E2)**, Versatility **95→96(E1)**, Overall **648/7→650/7**. 97점은 확인되지 않은 독립 응용·역할 부족으로 보류. 나머지 다섯 축과 미호크·루피 상태별 평가 보존. 두 열매 보유만으로 산술 보너스 없음.
- `evaluationsBeforeV045`에서 v0.4.4 데이터 모두 재현, `evaluationsBeforeV044`에서 이전 평가 보존. 기존 Matchup 15+2, Balanced 1.2/Haki .5, 72명/76 평가/532축, 원본 v0.3.3 JSON 불변.
- 검사: 신규 두 평가축 유효 점수/근거 소유/반론/E1-E2/Raw Haki 0, 기존 71명 전부 동일, 기어4·기어5 상태와 17 조건별 대진/대표 랭킹. **[PR #103](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/103) 최종 CI [38515693602](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38515693602): 88개 파일 / 386개 자동 테스트 모두 통과, TypeScript/Vite 빌드 성공.** 최초 1건 버전 기대값 실패(38515617810)는 별도 역사적 루피 테스트의 evaluation-set 버전 교정으로 해결. **main 병합 `fdf132e9857a2e539c566bf0473a3e75dd60ff69` 및 [GitHub Pages 배포 38515802885](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38515802885) 테스트·빌드·배포 전부 성공.**
- 제한: 97점, 신규 강자 상대 동시 정밀 복합 기술은 별도 직접 표본 부족. PC·모바일 육안 실사용, 원작 컷 전수 감사, 이미지 권한은 수행하지 않음.

---

# v0.4.4 — 티치 7축·미호크 Attack 증거/추론 교차 재평가 (2026-10-14)

- 원본: `main@da10373d66dd822645fe343acfd5a8b9c6c04cb1` (v0.4.3); 기능 [PR #101](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/101). [상세 결과·한계](docs/V0_4_4_TEACH_MIHAWK_RECALIBRATION_2026-10-14.md).
- **현행 티치:** [96,91,97,82,93,94,95], Overall `648/7=92.5714285714`. 기존 [95,89,95,82,93,87,93], `634/7`에서 변경. Speed/Technique는 7축 전면 검토 후 유지. IQ94는 위험 감수·상성 공략의 **해석적 상단값(E2)**이고 본인이 전술을 완전 계산했다고 원작이 직접 확증한 수치는 아니다.
- **현행 미호크:** Attack96→97(E2), Overall `649/7→650/7`; 샹크스의 최종 공격력 97과 동일. 검술 위상≠모든 패기/타격 확정 우위.
- **회귀:** 기존 70명 완전 데이터 비교 불변; 과거 v0.4.3 입력은 `evaluationsBeforeV044`, 과거 59/65인 코호트는 수정된 역사 헬퍼로 따로 검증. 원본 `src/data/baselines/v0.3.3.json` 수정하지 않음. E1/E2/E3, 근거 ID, Rank/Matchup 계산, 72명/76평가/532축, 직접 15+조건부 2 Matchup 확인. Balanced 1.2 / Haki 0.5 불변.
- **첫 CI:** 역사적 Legacy 코호트가 재평가된 현재 티치/미호크를 읽으면서 테스트 382건 중 16건 실패. 이를 점수 되돌리기 또는 무분별한 기준 기대값 교체가 아니라 과거 평가 입력과 현행 입력 분리 방식으로 수정했다.
- **검증된 수정 후 PR CI:** [run 38514355402](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38514355402) — **87개 테스트 파일·382개 테스트 전부 통과**, TypeScript `tsc -b`와 Vite build 성공.
- **병합·배포:** [기능 PR #101](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/101) squash 병합 → `main@2b70c240d2d7f9969cebdfac2a361659482932f9`. [main Actions 38514674677](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38514674677)에서 **382개 테스트·TypeScript/Vite build·GitHub Pages deploy 모두 성공** 확인. 2026-10-14. 이 결과는 실제 PC·모바일 직접 시각/터치 점검을 대체하지 않음.
- **제한:** 원작 만화 컷 단위 전수 검증, 이미지 저작권·재배포 권한, 실기기 PC/모바일 브라우저 직접 사용성 QA는 미완료.

---

# v0.4.3 — 루피 기어 4/니카, 티치 시나리오, 상태 라벨 가독성 (2026-10-14)

- **원본 main:** `1e694d33221020dc643fe5bd99a742cf69804129` (v0.4.2). [PR #98](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/98).
- **핵심 결과:** 루피 한 캐릭터에 Evaluation 2건(기어 4 이하 **635/7≈90.714286**, 기어 5 대표 **657/7≈93.857143**). 기존 루피 v0.4.1 원본 **659/7≈94.142857**을 별도 Export로 변경 없이 보존. Combat IQ Gear4 90(E3), Gear5 87(E3); 7축 정성 근거 구분 및 Haki Raw 추가 없음.
- **Matchup:** 기존 정적 `sampleMatchups`의 15건은 보존하고 신규 조건부 루피/티치 시나리오 2건을 별도 `luffyTeachStateMatchups`로 보관. `matchupRepository`와 `liveDataset.matchups`는 모두 합쳐 **17건**을 표시/감사. 기존 직접 15건의 이름·상태·Evidence·Factor를 재기록하지 않음.
- **티치 감사:** 기존 7축 95/89/95/82/93/87/93, Overall 634/7 변화 없음; 근거 부족과 중복 산정 방지 때문에 상향은 승인 전 보류. 원작 사실과 평가 해석/시나리오 분리.
- **상태 표현:** `Draft`·`prototype`의 일반 노출만 제거, E1/2/3·선택 평가 시점·내부 revision 유지. UI 동작과 새 두 상태 선택/대표 Rank, 2인 비교와 새 매치업 레지스트리 분기 검증.
- **규모:** 72 Character / 97 Membership / 76 Evaluation / 532 Stat / 기존 직접 15 + 조건부 2 Matchup. 계산 모델 Balanced 1.2/Haki 0.5, 과거 v0.3.3 독립 JSON 원본 변경 없음.
- **최종 기능 PR CI:** [run 38438209244](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38438209244) — **86개 파일·378개 테스트 모두 통과**, TypeScript `tsc -b` 및 Vite 프로덕션 빌드 성공. 첫 번째 40건 실패는 과거 직접 15건에 신규 시나리오 2건을 섞은 구조/검증 상충이 원인, 기존 15건 배열과 신규 조건부 레지스트리를 분리해 해결. 전투 구조 코드 `1v1`, 증가한 Eval 수 기대값도 수정. 통과한 최종 run만 릴리즈 결과로 인정.
- **main 병합·배포:** [PR #98](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/98) → `main@bf02f06fee7f93016e8682780f9f44d5fbfc642d`. [main run 38438374150](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38438374150)에서 **npm test, TS/Vite build, GitHub Pages deploy job 전부 성공**. 실제 PC·모바일에서 눈으로 확인한 것은 아님.
- **범위 밖:** 직접 PC/모바일 브라우저 육안·터치 점검, 출처 만화 해당 컷 전수 검증, 이미지 공개 재배포 권리. 별도의 확정 승자/수치 승률 산정 없음.

---

# v0.4.2 — 캐릭터 상세 가독성 간소화 (2026-10-14)

- **목적:** 캐릭터 소개/메타 평가 방법/중복 문구로 가려진 상세 핵심 정보를 줄인다. 실제 Combat Profile, 캐릭터 원본 description, 7축 수치, 계산 로직, 근거와 근거 추적, 기존 평가를 삭제하거나 보정하지 않는다.
- 구현: `CharacterPage`와 `UnratedCharacterPage`의 소개 문단 상단 중복 표시 제거, 평가 시점의 자세한 설명 `details` 접기, Overall 해석 및 모델 정보를 `?` 도움말로 이동. 종합점수는 승률이 아니라는 핵심 경고 한 줄 유지.
- UI 회귀 테스트: 티치의 상단 중복 문구 부재/전투 프로필 유지, 루피·버기 등 로스터 보존, Help의 기본 접힘과 클릭 펼침, 가프 시점 안내의 접힘/펼침 확인. 기존 v0.4.1 독립 역사 스냅샷 비교 및 기존 모든 테스트 유지.
- 앱 버전 v0.4.2, **core/evaluation-set 데이터 버전은 v0.4.1 유지**, Balanced 1.2/Haki Weight 0.5, 72명/75 Evaluation/15 직접 Matchup 불변.
- **PR #96 CI:** [run 38427648897](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38427648897)에서 **85개 테스트 파일 / 373개 테스트 모두 통과**, TypeScript(`tsc -b`)·Vite 빌드 성공. 중간 1건 실패는 새 패치 이력 v0.4.2 순서를 기존 기대값이 반영하지 못한 것으로, 기능/데이터 변경 없이 테스트 순서를 수정하고 최종 통과 확인.
- **병합·배포:** [PR #96](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/96)을 `main@a68a13eafbd67c9043f9426ad6a71261d0faf7d7`에 squash 병합. [main CI run 38427844299](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38427844299)의 npm test, 프로덕션 build, **GitHub Pages deploy** 작업 모두 성공 확인. 이전 v0.4.1 성공 결과를 재사용하지 않음.
- 범위 밖: PC·모바일 실제 브라우저 수동 사용성 시험, 이미지 재배포 라이선스, 루피 만화 1차 자료 전체 대조.

---

# v0.4.1 — 루피 7축 Draft·버기 초상 추가·카쿠/이나즈마 이미지 수정 (2026-10-14)

- **수정 전 안정 main:** `6cbd5c1a75df4bff47b9ca886475510d83c2c90b` (v0.4.0 / 84파일·367테스트 성공).
- **PR #95:** https://github.com/pchjesus/onepiece-saikyo-analysis/pull/95
- 기존 초상 2개 Git blob 교환: Inazuma `244cd714778b3f9f22b3f5f3c03415d13da4bdd7`, Kaku `77185b273d77d2197277e9369a30b947cf75ec68`. 웹앱의 등록 레지스트리에서 각자 ID 그대로 사용. Buggy/Luffy 2개 WebP 새 추가, 전체 초상 72장.
- 루피(Character 1·Membership 1·Battle 2·Evidence 6·Evaluation 1/7축) 신규. 총 Character **72**, Membership **97**, Evaluation **75**, Stat **525**, 직접 Matchup **15 유지**. 루피 프로젝트 Draft E2/E3, Overall **659/7 ≈ 94.142857**, Haki Raw 추가 없음.
- 자동 검사에서 신규 루피가 이전 `v0180LegacyCohort`의 과거 65명 코호트에 혼입되어 생기던 테스트 실패와 현재 72인 UI 기대값 갱신을 분리. v0.3.3 역사적 독립 JSON 절대 변경하지 않고 **기존 71명 평가 전체 원본 값 비교**를 추가.
- **최종 PR #95 CI:** [run 38425719781](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38425719781)에서 85개 테스트 파일 / **371개 테스트 전부 통과**. `tsc -b` 및 Vite 프로덕션 빌드 성공. 초기 실패(신규 루피가 역사적 필터 테스트에 혼입, 로스터 기대 수치 71→72)를 패치한 뒤 확인함.
- **병합/배포:** [PR #95](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/95)를 `main@9d66727e6612ae357d063924f660fa9191517cd7`에 squash 병합. [GitHub Actions main run 38425982667](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38425982667)에서 동일 커밋 **npm test / TypeScript+Vite 빌드 / Pages deploy job 성공** 확인. 이는 실브라우저 사용성 점검과 다름.
- **미검증:** 만화 해당 컷의 독립 전수 대조, 이미지 공개 재배포 권한, 실제 PC/모바일 브라우저에서 사진 확대·사용성 확인. 원작 사실과 프로젝트 점수 분리, 신규 데이터 근거는 공식 TV 회차 줄거리 범위.

---

# v0.4.0 — 독립 v0.3.3 스냅샷/무결성/재현성 (2026-10-13)

- **원본:** 이전 안정 `main@f544458364eeb69e31dbdbb4f97184eef5a98564` (v0.3.3), 82개 파일 355개 통과 기준.
- **구현:** `src/data/baselines/v0.3.3.json` 약 1.58MB (원본 입력과 파생 평가·순위·대표 상태 전체 독립 복제), `src/data/integrity/auditDataset.ts`, `v033Snapshot.ts`, `versionManifest.ts`, `tests/v04Baseline.test.ts`, 반례 감사 테스트.
- 최초 기준선 생성 GitHub Actions [38418326823](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38418326823): 해당 스냅샷 생성 테스트 **5/5 통과**, 1회성 작업 후 권한 부여 workflow 삭제.
- 첫 전체 PR CI는 새 버전 헤더가 반영되지 않은 3개 UI/patchHistory 테스트 기대값으로 실패. 후속 전체 실행에서는 오류 주입 조건이 잘못된 테스트 1건 실패; 수정 후 타입 빌드에서 src 내 Node-only 테스트의 `node:fs` 타입 누락 발견. **브라우저 빌드 범위에서 Node-only 테스트를 `tests/`로 이동**해 별도 @types/node/tsconfig 변경을 피함.
- **PR #93 검증:** [CI run 38419793204](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38419793204) — **84개 테스트 파일 / 367개 테스트 전부 통과**. TypeScript `tsc -b` 및 Vite 프로덕션 빌드 성공.
- **실제 병합·배포:** [PR #93](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/93)을 `main@ff202cff5ee55dccd599f92529e5474c3e9a3c97`에 squash 병합. [main 배포 CI run 38420146453](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38420146453) — `npm test`, `npm run build`, GitHub Pages `deploy` job 모두 **성공**. PR와 main 각각 확인했으며 이전 v0.3.3 CI 성공을 전용 결과로 재사용하지 않음.
- **보존:** 71 캐릭터, 96 Membership, 74 Evaluation, 518 stat items, 15 직접 Matchup, Balanced 1.2/Haki 0.5, 버기 Overall 38/이조 약 76.14 및 기존 69명의 모든 평가 점수 변경 없음.
- **범위 밖:** 실제 브라우저/모바일 수동 화면 검증, 공식 원작 회차 직접 대조, 이미지 제3자 재배포 허가, v0.5 점수 재산정.

---

# v0.3.3 — 초상 확대·버기/이조 E2/E3 평가·v0.4 무결성 스모크 (2026-10-13)

- 기준선: v0.3.2 main `ccdeb8def08eaf3091612c4de2bb068519c6907a`.
- [기능 PR #91](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/91): main `0b28dfe9ee4cc2c8e185bbf1d283771d412a291c` 병합 완료.
- [최종 main CI 및 배포 #38414702557](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38414702557): **82개 테스트 파일 / 355개 테스트 모두 통과**, TypeScript/Vite build 성공, Pages deploy job 성공.
- 이미지: 기존 64 + 사용자가 업로드한 티치·시류·바제스·반 오거·피사로·코비 **6개** WebP = 70개 등록. 버기 이미지 미제공으로 fallback. 상세 이미지 전체 비율·확대 팝업/ESC·닫기·배경 클릭 지원.
- 데이터: Character **71**, 표시 **71**, evaluated unique **71**, Membership **96**, Evaluation **74**, Core Stat 항목 **518**. 69명의 과거 점수와 Balanced 1.2/Haki 0.5, 기존 15 직접 Matchup 변경 없음. 버기 새 E3 draft Overall **38.0**, 이조 새 E2/E3 draft Overall **76.142857...**.
- 새 Evidence: 버기 공식 캐릭터 소개, 이조 인물 소개·TV 1063/1065/1068회 줄거리. 이조 중상·보호 임무·참전자 맥락 기록. 원작 만화 해당 회차 전체를 직접 읽은 검증은 아니며 두 초안 모두 공식 분석 확정 평가 아님.
- 문양: 로저·검은수염·크로스 길드·밀짚모자·빨간 머리 해적단 작은 자체 SVG 상징. **정확한 공식 로고 이미지/사용권 증빙이라고 해석하지 말 것**.
- v0.4 **부분 착수**: live ID·참조 및 Overall 계산 재현성 자동 스모크 테스트. **독립 과거 스냅샷/전체 관계 감사/버전 이력 검증은 미완료**.
- 검증 한계: 실제 PC/모바일 브라우저 화면 전수 실사용, 각 70장 이미지 서버의 직접 HTTP 확인, 저작권 재배포 허가는 확인되지 않음. GitHub Pages CI 성공은 실기기 확인의 대체가 아님.
- 중간 CI 실패: 확장 로스터의 오래된 테스트 기대값, 새 테스트의 문법 및 TS 대상 호환 오류가 있었으나 수정 후 최종 전체 CI 통과.

---

# v0.3.2 — user-provided portraits, Izo and Roger past membership (2026-10-13)

- Baseline: v0.3.1 main SHA `124c33269f4b0eb483d1de9dcea0959a3e2b1a8c`.
- Changes: 64 uploaded real WebP assets, image metadata/fallback/rights notices, 1 identity-only Izo profile, 5 new Membership rows (Izo ×2, Roger-era ×3), and updated UI/count tests.
- Project data invariants: 71 Character master / 70 visible / 69 evaluated unique / 93 Membership / 72 Evaluation / 504 Stat, unchanged Balanced 1.2 & Haki weight 0.5.
- **Verification completed:** [PR #89](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/89) merged to `main@2926b71b37f62f521bc1c7eb43994bb39cc7add6`. [Final main CI run #38395430816](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38395430816) confirmed **79/79 test files and 349/349 tests passed**, `npm run build` (TypeScript + Vite) successful, and GitHub Pages **deploy job succeeded**. Earlier PR runs failed on outdated roster/photo test assumptions, which were corrected before merge.
- **Unverified:** original game-illustration redistribution rights, independent visual review on actual desktop/mobile browsers, original manga pages for Izo's combat score. No numeric Izo score was fabricated.
- PR: https://github.com/pchjesus/onepiece-saikyo-analysis/pull/89

---

# v0.3.1 — evidence disclosure and permitted image fallback stability (2026-10-13)

- Reaudit of original v0.3 request: existing provenance readability, E1–E3 help, link safety and character count tests passed on v0.3.0. All 15 direct Matchup evidence references are validated by `src/data/sample/matchups.test.ts`.
- Focused findings: disclosure summary had permanently said `펼치기` even while open; React portrait failed-state could persist after switching to a different approved image URL. Both fixed without changing any raw evidence, numeric results or matching logic.
- Preserved original no-image fallback test unchanged and added separate test for simulated **licensed** image with source link, image failure, character URL change, successful second image; no real copyrighted artwork introduced.
- Verified official Vivre Card catalog location: https://one-piece.com/vivre/list2/index.html. Existing external reference kept. [ONE PIECE.com official FAQ](https://one-piece.com/faq/index.html) states that it does not grant individual use permission for character images; attribution alone is not permission. No copyrighted images copied or hotlinked.
- **Not demonstrated:** full real device visual/mobile validation, separate manual original manga source verification and image redistribution permission. Remain explicit limitations and do not mark them complete just from JS tests or official site display.
- **Confirmed final release gate:** [PR #87](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/87) merged to `main@98c71b8cf82f9aafa2ad9e00ae8742f038550199`. [Main CI run #38353979077](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38353979077) passed **78 test files / 345 tests**, `tsc -b && vite build` success, Pages deployment completed successfully with matching `pages_build_version` and SHA. Mobile real-browser visual checking and image reuse permission **remain unverified/unavailable**.

---

# v0.3.0 — provenance-aware evidence readability regression (2026-10-13)

- **Baseline:** main `4307dc53fb2e528d078db3bd3db91738c2652088`, v0.2.1, 77 test files / 343 tests passed in GitHub CI.
- **Code scope:** `SourceCitation` provenance-aware visual labels and link names; evidence heading reflects existing registered `source.type`, without upgrading official TV/fan summary to independently read manga; `EvaluationTrace` keeps scores/formulas/rationale visible while folding linked citations with native `details`; E1–E3 explanatory help with separate unapproved E4 note; targeted responsive CSS and official Vivre catalog pointer.
- **Content preservation:** project SPEC/Character/Evidence/Battle/Evaluation/sample Matchup and calculation data untouched. No Haki Raw/Weight, stat, rank or direct matchup modification. No copied/hotlinked anime, manga, or Vivre Card imagery; official index is an external source pointer only. Approved future portrait assets receive a source credit below the image.
- **Test adjustments:** official episode vs fan summary/canon/plain-reference source categories; preserve source hrefs, multi-URLs, link security and all 70 profile links; click-to-open trace before source-to-battle navigation; test E4 remains an undefined note; existing comparison, era, Matchup, status, score regression tests.
- **First feature-branch CI:** [run 38349595892](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38349595892), **77 files / 344 tests passed**, `tsc -b && vite build` success (pre-release-metadata commit).
- **Release gate:** final PR and merged main CI + deploy SHA verified separately; actual PC/mobile visual inspection remains **not verified** by jsdom/build CI. Mobile scroll-height configuration intentionally unchanged until visual feedback.

---

# v0.2.1 — source readability and link UI regression

- **Baseline:** v0.2.0 release SHA `113a35e1039adba12cc40285b3f38f33a1558b38`, 76 test files and 336 tests passed.
- **Reported reproduction:** Ace `원작 전투 프로필 근거` displayed six raw long HTTPS URLs in narrow profile card. Root cause: direct render of `source.reference`; URL wrapping and absence of a clickable anchor. Same formatting paths occur in Sabo/Morley/Lucci/Kaku/Stussy/Smoker/Tashigi/Ivankov/Inazuma and Battle Evidence/Trace UI.
- **Code scope:** new `src/ui/components/SourceCitation.tsx` parses recognized HTTPS references, retains the non-URL qualifiers and source labels and renders an accessible short `원문 보기 ↗` link; used in `CombatProfile`, `EvidenceList`, `EvaluationTrace`, `StatComparisonDialog`. No underlying `Character/Evidence/Evaluation/Matchup` or model data changed.
- **Focused tests:** links preserve Ace original exact URLs and '팬 회차 상세 요약 — 1차 원문 전체 미열람' qualifier, zero visible raw URLs on full 70-character profile set, mixed URL references (including Ulti/X Drake multi-link episode entries) and plain non-URL references, E1–E3 stat trace battle links and supplementary episode URLs, no unsafe scheme as clickable link.
- **Release gate:** final PR CI `npm test` and `npm run build`, old 15 Matchup / all 7 stat regression, merge into main, Pages deployment at same main commit SHA. Actual phone/desktop manual browser visual validation remains separate and should not be claimed automatically.

---

# v0.2.0 — integrated analysis UX and data-preservation verification

- **Stable baseline:** `v0.1.81 main@e6947aee505a286b82dd293cd09ad56ee01feee4`; 73 test files / 327 tests previously passed. Baseline has 70 Characters, 72 Evaluations (69 defaults), 504 7-axis items, 88 Memberships and 15 evidence-linked direct Matchups.
- **UI changes:** `App` opens `StatComparisonDialog` from each of 7 Stat cards. CharacterPage carries the selected Era through to comparison; existing ranking button stays intact. Two side-specific panels display stat/value, model-derived Base+Raw×weight=Final, confidence E1/E2/E3, direct Evidence fact/context/interpretation, uncertainty and openable source links, expanding overflow after three. Attack-only 4-factor narrative audit uses existing `v0180CommanderAttackAudit`. EvidenceTrace→BattleTimeline deep-link opens the referenced Battle rather than adding another context store.
- **Character media changes:** `characterPortraits.ts` is an empty approved-assets registry with local-safe file name constraints and permission/source metadata. `CharacterPortrait` shows existing grouped accent fallback with initials, no network image requests until approved assets added. Applied only to Character detail and searchable full-roster chooser; Matchup remains unchanged.
- **Regression tests added:** read-only live score and Evidence provenance comparison, cross-era selection, preventing self-comparison, no numeric Attack substat, portrait fallback/zero external image requests, 7 buttons and comparison modal, 69 picker thumbnails, evidence-link navigation, historical patch-history tests scoped to their correct release version.
- **Version policy:** package and lockfile root metadata now 0.2.0; dependencies unchanged, SPEC unchanged.
- **GitHub PR CI and published Pages validation:** report the exact final PR head and post-merge SHA/run in PR release comment. Do not claim any unverified browser/device manual behavior.

---

# v0.1.81 — categorized patch history / zero combat-model changes

- Baseline: v0.1.80 stable `main@d6325491a3fdf0acea9d4e685c78bcc0f6cb928d` (72 test files, 322 tests, Pages success).
- New `src/data/patchHistory.test.ts`: four exclusive categories for existing change types, complete numeric `score` before/after + reasons, title-only original patch-button entry, preservation of six commander Attack review entries.
- Updated `src/ui/App.test.tsx`: UI filter controls, per-version grouped category sections, all/individual category filter transitions, title-only button entry, visible stat-score evidence, version label.
- Updated `src/data/sample/v0180Expansion.test.ts`: historical v0.1.80 record now found by version and new latest v0.1.81 recognized; numeric score justification remains enforced while UI changes can be concise.
- The implementation modifies only the structured release notes, release-notes dialog/styles and header version display. Character/Evaluation/Battle/Evidence/Membership/Matchup/Calculation data files unchanged; PROJECT_SPEC.md untouched.
- **Verification status:** test/build CI and final Pages deployment are to be recorded after running against the final commit. Do not assume these are successful merely because the tests are written.

---

# v0.1.80 — four-character additive roster and commander Attack regression

- **Before:** v0.1.79 main `f893b676169b531e6ca821f2911186c0ff620aa0`. Historical snapshots fixed at 66 Characters, 68 Evaluations, 65 defaults/455 Final, 84 Memberships.
- **After:** 70 Characters (4 new), 72 Evaluations (69 defaults), 504 items, 88 Memberships, no new Groups.
- Four new Characters: Smoker/Tashigi in Marines; Ivankov/Inazuma in Revolutionary Army. Ten supplementary Evidence/Battle pairs; four draft 7-axis evaluations; all new Raw Haki0.
- Six-existing-commanders' Attack verified unchanged: Queen80, Cracker77, Smoothie76, Marco79, King83, Katakuri83. Four separated dimensions in `v0180CommanderAttackAudit.ts` with stable links to evidence.
- **Historical-test isolation:** `v0180LegacyCohort.ts` supplies pre-expansion arrays and rebased historical ranking for older suites; old expected 455/476/Raw230 score conservation remains tested. Current app tests expect 69 unique evaluated Characters and 88 memberships; prior users' existing character score inputs and 15 matchups remain stable.
- Added UI tests for header button, patch reasons/numeric deltas, four requested memberships and absent forbidden group options. Added v0.1.80 tests for new entity owners, evidence IDs, 6 Attack reviews, Haki Raw invariance.
- **Current CI state:** use the latest verified GitHub Actions run for the final PR head and postmerge SHA; not claimed in this file until verified.
- Browser-device manual interaction and manga panel-by-panel rereading were not performed; evidence is official episode synopses and existing canon-linked records.


---

# v0.1.79 — commander 9-axis re-calibration / official evidence crosscheck

- **Baseline:** v0.1.78 `main@591f9617887adf967292b34c28d2331b1c1e6493` (312 tests passed, Pages success).
- **Changed Final:** Queen Versatility **80→82(E2)**, Overall **550/7→552/7**. No other 454 default Final stat changed; 64 other character Overalls unchanged.
- **Proof boundary:** Queen TV1061 shows independent Germa impersonation/stealth/science in Sanji fight, TV1005 deployed Ice Oni infection bullets in the crowd; Cracker TV799 live body and biscuit soldiers, TV805 rain vulnerability and repeated spawning. All official anime synopses are `supplementary`, not firsthand complete manga reading, duplicate independent fights, or Haki proof.
- **Unchanged:** Smoothie Attack76/Technique80/Versatility78; Cracker Attack77/Technique80/Versatility77; Queen Attack80/Technique79; all Raw212/230 and model/5 anchors/15 matchups.
- **Data:** 66 characters, 68 evaluations (65 default), 476 stat items, 84 memberships; 4 new supplementary Evidence with existing Battle IDs and no duplicate Battles.
- **Regression:** added `v0179CommanderAxisReview.test.ts` (9 axes, provenance, old snapshots, Final454/455 conservation, Raw, 5 anchors, dynamic ranking, guarded versioned overlays). Historic v0.1.78 and earlier test snapshots preserved; related CI assertions updated without deletion.
- **Verified PR code-head CI:** [GitHub Actions #38150887855](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38150887855), SHA `acf2f9828bcee99d25573dbbbc3bd226b0a89f24` — **71/71 test files, 316/316 tests passed**, `tsc -b && vite build` passed. Initial PR CI found two old historical snapshots comparing Queen80 against v0.1.79 live82; assertions now preserve historical 80 while separately checking live82, without suppressing tests. After documentation-only commit, final PR head CI must be independently green; verify post-merge main SHA and Pages deploy separately. No manual browser-device smoke test performed.

---

# v0.1.78 — evidence-only Koby/Smoothie battle-context upgrade and Tobi Roppo audit

- **Baseline:** v0.1.77 `main@ede9827bc4284ef468c20b750463e28504fbb278`.
- **Source correction:** TV1113 establishes *real* enslaved noncombatant captives on Hachinosu; TV1121 establishes a separate *fake* woman rescue trap exploited by invisible Shiryu. Assess Koby's insufficient risk verification during retreat, **not** a nonexistent possibility of captives. TV1113 decoy rescue positive contextual action does not erase TV1121 negative decision. v0.1.77 IQ72 already reflected that single failure; no second downgrade.
- **Smoothie:** official TV868 giant slashes repeatedly evaded through Nami/Jinbe cooperative navigation and helming; event shares existing Manga Ch.894 pursuit Battle, so no independent double count. Attack76 E2, Speed74 E3 and CombatIQ77 E3 held.
- **Tobi Roppo:** Sasaki IQ68/Defense79, Black Maria IQ74/Versatility84, Ulti Stamina84, Page One Defense76 compared with preexisting official TV1031/1032/1042/1044 context; no unjustified score changes.
- **Expected invariants:** 65 default ×7 = 455 Final unchanged; Haki Raw default212/full230; character66, evaluation68 (65 default) and stat items476, Membership84, Matchup15, Balanced1.2/HakiWeight0.5, fixed anchor5 unchanged.
- **Additions:** one Battle+Evidence for Koby TV1113, one supplementary Evidence for existing Smoothie chase TV868, versioned evaluation metadata for Koby and Smoothie only; existing other63 live Evaluations remain identical.
- **Tests:** `v0178KobySmoothieContextAudit.test.ts` validates all 455 final values/Raw and prior snapshots, source ownership, fight linking, non-double-counting, rank, fixed anchors and Wano preexisting evidence; earlier tests amended to account for metadata-only new versions without loosening numeric preservation.
- **PR verified code-head CI:** [GitHub Actions #38147304187](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38147304187), SHA `74f99149e9f9eb5f6dad8683179eaeb893f727b2`: **70/70 test files and 312/312 tests passed**; `tsc -b && vite build` succeeded. Two initial test runs failed because independently reconstructed immutable Evaluation snapshots were incorrectly compared by object reference rather than deep content; corrected without disabling numeric or historical verification. Documentation-only final commit requires another green PR CI.
- **Final deployment gate:** verify a new main-merge SHA with independent successful push CI and Pages job. No browser-device manual smoke test claimed.

---

# v0.1.77 — dual-axis contextual recalibration / historical and downstream regression

- **Baseline:** `main@66e7bf07cc8e4be1a5785db74ae55e2c64a2dc72` (v0.1.76 / PR #75 / all 303 tests and GitHub Pages successful).
- **Current delta:** Koby Combat IQ76→72; Prince Grus Versatility85→80, both E2 preserved. Koby Overall525/7→521/7; Grus Overall538/7→533/7.
- **Protected:** 453/455 default 7-axis Final scores unchanged, all other 63 character evaluations unchanged, all Raw unchanged (default212, all230), five anchor Overall unchanged, 15 matchups unchanged, Balanced1.2 model unchanged.
- **Data:** Characters66, Evaluations68 (65 default), stat entries476, Membership84, 15 explicit Matchups; E1/E2/E3 unchanged; no new battle/evidence duplicate.
- **Provenance:** official TV1121 Koby's attempted civilian rescue and invisible Shiryu trap; official TV1114 Grus clay golem crowd control; official TV1122 Grus clay-nest debris safety and Koby structure destruction; official Grus and Koby character profiles. Context-dependent conclusions and numeric scores are *interpretations*, not canon fact.
- **Replay:** historical v0.1.70, v0.1.75, v0.1.76 intact. `v0177KobyGrusRecalibration.test.ts` checks two and only two numeric deltas, pre-v0.1.77 snapshot, all unrelated Final scores, Raw, anchors, rank and owned Evidence. Older pinned tests updated without deletion.
- **PR validation (code head):** [GitHub Actions #38144750308](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38144750308), SHA `81a3f2987c30d29cd504392307f76d44e86db608`: **69/69 test files and 307/307 tests passed**, `tsc -b && vite build` passed. Initial CI had one pinned live-ranking assertion that conflated current v0.1.77 and reconstructed v0.1.76; fixed without test removal. Documentation-only follow-up commit will require PR CI replay.
- **Post-merge status:** must be verified on new `main` merge SHA with independent push CI and Pages deploy. No desktop/mobile browser manual interaction claimed.

---

# v0.1.76 — Koby single-burst Attack scale correction, peer and baseline regression

- **Baseline:** main `a9f2629fad6db90a759b839e54229bbfa2c4cd1f` (v0.1.75).
- **Change:** Precisely one current Final 7-axis stat: Koby Attack 82(E2)→77(E2), Overall 530/7→525/7. No new Haki Raw or stat formula changes.
- **Source separation:** official ONE PIECE.com TV1122 object destruction and Garp/Helmeppo/Grus context; TV1121 Koby trap and official profile. Existing supplementary Evidence/Battle reused; no new manga-original firsthand claim.
- **Regression targets:** 64 other characters entirely preserved; Koby six non-Attack axes unchanged; all 68 Evaluations, 476 core items, 66 Characters, 84 Membership, 15 Matchups; Balanced1.2 Haki0.5; Haki Raw 212 (representative) / 230 (all), E1=53/E2=272/E3=130; all 5 locked Overall anchors.
- **Historical fidelity:** v0.1.70 Koby score82 remains original in seed; v0.1.75 read-only Koby82 judgement not silently rewritten. v0.1.76 current score explicit versioned adapter.
- **Companion audit:** Crocodile/Stussy/Lucci IQ, Grus Versatility, Smoothie, Tobi Roppo, Akazaya, Revolutionary Army and Blackbeard Pirates retained absent independent corrective evidence.
- **PR code-head verification:** GitHub Actions [#38143360554](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38143360554) at head `83568e94c0b48c1751876d6a5c2632ae66412823`: **68/68 test files and 303/303 tests passed**, TypeScript `tsc -b` and Vite production build successful. First PR CI exposed two version-dependent tests (old Koby Overall snapshot and reference identity for recreated snapshots); both were corrected without disabling tests. Documentation-only commit after this check requires final PR CI replay.
- **Post-merge:** confirm same `main` SHA in push workflow with successful test/build and Pages deploy job; no local/desktop/mobile UI manual smoke check or complete original manga reading performed.

---

# v0.1.75 — Grus evidence-only calibration after 14-person cohort comparison

- **Baseline:** main `d5b3587e20d4485cbc88827f3699e0027d83cd02` (v0.1.74), PR #73 merge push workflow successful.
- **Patch scope:** 1 Battle (TV1114 Hachinosu) + 1 supplementary Evidence (Grus clay-go­lem area denial); update two current Grus Evaluation rationales/evidenceIds and its evaluationDataVersion; read-only 13 axis-specific review decisions. No numeric change anywhere.
- **Hard regression target:** 65 current ×7 Final scores and all 68 ×7 Raw allocations exactly equal post-v0.1.74; 5 frozen Overall anchors; ranks, Haki Raw representative212/all230, Balanced1.2 0.5; 66 characters, 68 Eval/476 axes, 84 Membership, 15 matchups unchanged. E1/E2/E3 remain 53/272/130. Grus 85(E2)/81(E2), Koby Attack82, Lucci IQ74, Marco Attack79 unchanged.
- **Source tier:** official ONE PIECE.com TV1114/TV1122 synopses, new record supplementary. No direct panel-by-panel primary manga examination.
- **Added tests:** `v0175FocusedReview.test.ts` ensures unique Battle/Evidence ids, links, support role attribution, stable old seed and stable original scores/Raw/anchors/rank.
- **PR CI verified:** GitHub Actions [#38140974508](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38140974508) on PR head `fd4f880b3acf47a4b1e92f0fcc1a2caf8da4ac93` completed SUCCESS: **67/67 test files, 299/299 individual tests**, TypeScript `tsc -b` and `vite build` successful. Four pre-existing, version-pinned historical assertions revealed by the first CI were corrected without disabling tests.
- **Deployment:** PR workflow deploy is intentionally skipped; require independent post-merge `main` push CI and Pages confirmation. No local desktop/mobile smoke test or first-hand manga panels claimed.

---

# v0.1.74 — targeted numerical recalibration after whole-roster gap audit

- **Baseline:** main `e1b43259cdb7a7caf8e01aafa11cb3769ad94da8` (v0.1.73).
- **Only affected current core axes:** Lucci Combat IQ 68 E3 → 74 E2; Marco Attack Base76→78 with original armament Raw2 unmodified, Final77→79 E2. Overall changes +6/7, +2/7. No other core stat, character identity or matchups changed.
- **Official corroboration:** ONE PIECE.com TV1100/1101/1109/1124 for Lucci targeting/coop/intel, TV1045/1046 for Marco's multi-opponent fatigue; direct Marco hitting Queen and drawing blood is **secondhand Chapter1006 synopsis only**, tagged supplementary.
- **New:** `v0174TargetedCalibration.ts`, `v0174TargetedCalibration.test.ts`, 3 supplementary Evidence, versioned 2-character Evaluation adapter; Korean report. No additional Battle records. Prior default evaluations remain in source for audit/rollback.
- **Model/regression controls:** 66 Characters, 65 ranked, 68 Eval/476 axes, 84 Memberships, 15 direct Matchups, Balanced1.2 Haki Weight0.5, 212/230 Raw, 5 Overall locked calibration candidates unchanged. Lucci and Marco current versions are distinguishable from prior saved baselines; v0.1.72 historical conditional Marco baseline not silently altered.
- **Prior cohort tests:** update arithmetic expected Lucci78→78.857 and Marco83.429→83.714, dynamic E3 tally 131→130 (Lucci Combat IQ). Original v0.1.73 markdown snapshot remains dated/static. Do not disable tests or rewrite original score source facts.
- **CI and Pages:** confirm via PR and post-merge main Actions before reporting success. No manual desktop/mobile browser smoke test and no first-hand all-panel original manga review.

---

# v0.1.73 — all 65 evaluated Characters, 455 Final axes gap audit

- **Baseline:** `main@eaa8a3bacd2dfab95fd1e053b9cbcaea182a307c` (v0.1.72).
- **Added only:** `src/data/sample/v0173FullRosterGapAudit.ts`, `src/data/sample/v0173FullRosterGapAudit.test.ts`, `docs/V0_1_73_ALL_65_SEVEN_AXIS_GAP_AUDIT_2026-10-11.md` plus README/CHANGELOG/TEST_REPORT.
- **Full census**: 65 unique current default Evaluations × 7 = 455 Final axes; E1 53, E2 271, E3 131; Speed E3 35/65. 122 pairs with Overall distance <=1.5 and >=10 max single-stat gap; 38 context-qualified manual audit questions with real source Evaluation IDs.
- **Source-of-truth tests:** retrieve current Default Evaluation, recalculate Final and Overall against Balanced1.2 exactly, verify readiness classification and 65 ids, nearest frozen Overall anchors, source referential IDs, special edge cases, deterministic re-run and detection constraints.
- **Regression invariants:** 66 Character / 65 rated / 84 Membership / 68 Evaluation / 476 Stat rows, 15 direct Matchups, Raw representative212/full230, Model Balanced1.2/Haki Weight0.5, Ace [79,76,82,78,78,67,78], Teach attack95, Jozu Final Attack78, Marco Attack77, King Defense88 all untouched.
- **GitHub CI/Pages:** refer to PR head and exact merge SHA Actions logs/PR comment after run. Do not claim local manual PC/mobile interaction or full manga original-panel verification.
- **Interpretation safeguard:** Automatically detected statistical gaps are neither confirmed factual errors nor approved score corrections; specializations, time/era, battle conditions and ability mechanics require human review.

---

# v0.1.72 — canonical anchor cohort and 7-axis read-only calibration

- **Baseline:** main `57617681432d9c7a8e8b03ebbe47206c8c489a2a` (v0.1.71).
- **New only:** `v0172AnchorBaseline.ts`, `v0172AnchorBaseline.test.ts`, `docs/V0_1_72_BASELINE_ANCHOR_COHORT_AND_AXIS_VALIDATION_2026-10-11.md`, plus README/CHANGELOG/TEST_REPORT documentation. No change to source data collections, scores, model or UI.
- **13 named candidates / 5 frozen Overall anchors / 6 conditional / 2 deferred / 7 frozen high-axis comparisons** with axis E1/E2/E3 snapshots and exact 7 Final Stat values versioned. Explain that frozen Overall is a reference score, not proof that all component axes are final; no hidden compensating adjustments.
- **Five source/logic review controls:** Garp vs Law Versatility91, Kuzan Overall +2/7 despite Sakazuki fight win, Law Speed82 (ROOM not body speed), Marco Attack77 vs Who's Who79 (interception not damage), King 88 Defense/83 Speed mode conditional. Record special opponent conditions and evidence uncertainty.
- **Automated regression guard:** exact live eval snapshot per 13, specific E1-only axis locks, source pointers present, existing 66 chars, 65 current evaluated, 68 evaluations, 476 stat rows, 84 memberships, 15 direct matchups, Balanced1.2/Haki Weight0.5, Raw212/230 and Ace/Teach Overalls unchanged.
- **Run/deploy:** final GitHub PR + merged-main Actions should be verified and recorded in PR comments. Do not claim full original manga page-by-page verification or real browser/mobile manual UI test.

---

# v0.1.71 — Ace seven-axis evidence correction

- **Start SHA**: main `2e929076b24c2957634a470c75bbd691a1719efb` (v0.1.70).
- **Changed exactly one current character evaluation**: Ace original [84,77,82,78,85,78,85], Overall81.286 → [79,76,82,78,78,67,78], Overall76.857. Version bump specific to Ace. Old v0170 Ace source stays intact and can be rolled back.
- **Five new owned Evidence, three new Battle**: reuse Jinbe 5-day and Teach duel canonical Battle IDs; independently record Akainu provocation/Whitebeard final withdrawal and Aokiji ice clash and marine ships. Supplementary source tier only; no unverified manga panel claimed reviewed.
- **Hard regression assertions**: all other 67 Eval objects unchanged, former Ace version preserved, all Seven Stat axes and Haki Raw consistent, 68 Evaluations/476 stat items/65 current rank/66 Characters, 15 Matchups, Raw212/230, no new Haki.
- **History guard**: previous 59-member score/readiness audit tests explicitly filter both v0.1.70 and v0.1.71 new evaluations. Live UI and global score mean tests use latest Ace evaluation.
- **CI:** initial PR branch run 2 tests failed (old Ace overall expected, mistaken Jozu Attack Base76 vs Final78); both corrected, next GitHub Actions full result to be verified. Do not claim real mobile/browser manual smoke testing or entire official manga scanned.
- **Narrative source caution**: Ch.573 Akainu provocation corroborated by secondary manga-scene descriptions and official TV482 episode context. This is distinct from Luffy shielding, which is not penalized as irrational. Technique/versatility fire-only mechanism boundary is documented in `docs/V0_1_71_ACE_COMBAT_IQ_AND_SEVEN_STAT_RECALIBRATION_2026-10-11.md`.

---

# v0.1.70 — SWORD, Donquixote, Ace / Teach upside source review — validation

- **Baseline:** v0.1.69 `main@68ef8baeda976f2b2241a68bca3fa3a5833ccc81`.
- **Added:** two Groups, six actual new Characters and draft Evaluations, eleven Membership records, ten deduplicated new Battle records, thirteen supplementary Evidence, forty-two new Core Stat items.
- **Source type:** official ONE PIECE.com profile and TV 95/325/483/610/616/716/718/719/1121/1122 summaries. Source in domain is `supplementary`, never pretend all manga panels read directly.
- **Historical regression split:** Original 59-person calibration/readiness tests now explicitly use 62 pre-v0.1.70 Evaluations; current product tests expect 65 evaluated/66 characters/68 evaluations/476 axes/84 Membership, 15 matchups and 212/230 raw totals; X Drake and Doflamingo remain single identity each.
- **Read-only Teach:** Original seven Base/Final axes [95,89,95,82,93,87,93], model, Raw and all prior Evidence untouched. New 7-axis upside review states unresolved independent evidence requirements.
- **GitHub PR CI / exact merge-SHA Pages:** check final workflow / PR comment; no local browser actual tap/scroll/swap manual verification.
- **Observed temporary failures during implementation**: older fixtures tied to 59-person rank/readiness proportions; resolved by preserving old-cohort statistical meaning and new-cohort UI tests. Do not claim previous iterations passed.

---

# v0.1.69 — Exceptional Haki independent-effect source audit

- **Baseline:** main `fd45c55c095369f8fc52f6df917987d9f602e1b6` (v0.1.68).
- **New four tests:** nine current Raw uses across four character evaluations, grouped by five observed effects and matched to existing same-owner Evidence/Battle IDs; guard six shared applications across four repeated-effect groups, explicit Jinbe Ch.1018 uncertainty fix, and unchanged 60/59/62/434 roster/evaluation/axes, 15 matchups, Raw212/230, Balanced1.2 Haki0.5.
- **Source-layer check:** ONE PIECE.com TV1082/1112/857/1040 cross-reviews, keep supplemental anime distinct from direct original manga; manga all-panel reading not performed.
- **No numeric impact:** existing Vista, Shanks, Katakuri, Jinbe 7-stat evaluation, Raw and direct matchups remain frozen; Technique90 never applied. No hypothetical Raw-off Overall calculated.
- **PR-head CI / build:** pending verification.
- **Merge SHA Pages verification:** pending verification.
- **Manual browser/real devices:** not checked.

---

# v0.1.68 — Vista/Mihawk annotated-source and Combat IQ text-context regression

- Initial baseline main SHA: `f3abfa13844a6f332d5a20523e5fe7fb1a0d061f`.
- **Source provenance:** official ONE PIECE.com Vista/Mihawk + 2011 official merchandising description; contemporary 2009 561/562 Japanese dialogue reproductions and page-indexed fan summaries; some original-manga **partial panels from a third-party repost** are distinguishable from full authorized manga-page verification. Original manga full-page direct check **not done**.
- **Text-only adjusted live data**: Ch.561 Marco-assigned interception clarified in the `marineford-vista-mihawk` `externalFactors`, Vista CombatIQ rationale credits execution rather than autonomous mission design, and the two related Evidence uncertainty fields flag direct-access limits. Vista evaluation data version bumped to `evaluation-0.1.68-vista-battle-context-only`; no numeric data/Raw/weights or E grades altered.
- **New tests** `v0168VistaSourceCorroboration.test.ts`: provenance truthfulness, Ch.561/562 source separation and attribution, same event deduplication, seven-stat and 60/59/62/434/15/Raw212 model invariants; prior v0.1.66/67 version guards updated.
- **GitHub PR-head CI / build:** pending final workflow confirmation.
- **Merge SHA CI & GitHub Pages deploy:** pending final workflow confirmation.
- **Real desktop/mobile browser manual test:** not done (not equivalent to CI passing).

---

# v0.1.67 verification — Vista/Mihawk Ch.561–562 source fidelity and six Technique peers

- **Baseline:** `main@d9cd478aec80dee2e891bb55c7227e111faab419` (v0.1.66); target `v0.1.67`.
- **Source access:** official profiles + 2021 official battle-recap crosscheck completed. VIZ official Ch.561 and Ch.562 subscriber-gated; full manga-panel direct reading **NOT performed**. Chapter-by-chapter actions and Marco command in secondary accounts not marked first-hand canon verification. Official TV470/471 synopses provide war context, not detailed Vista parries.
- **New four guard tests:** chapter 561/562 distinction, official vs secondary vs inaccessible source tagging, non-automatic IQ attribution, Ch.574 Haki exclusion from Mihawk duel, six Technique peers' live Base/Raw/Final/E-grades and same-owner evidence, 60/59/62/434 + raw212/230 + Balanced1.2/Haki0.5 + 15 matchups.
- **Production untouched:** Vista Technique86/2/87 and Overall556/7 (review rank26), all seven stats, Shanks, whole roster, direct Matchup inputs, v0.1.65 text normalization tests.
- **Automated PR-head tests/build:** pending actual Actions result at document writing.
- **Exact merge-SHA GitHub Pages:** pending after PR-head success and safe merge.
- **Manual desktop/mobile site QA:** not performed in this environment.

---

# v0.1.66 source-note follow-up regression — pending CI at document edit

- **Confirmed stale explanatory value:** `evidence-jinbe-ace-five-days-552` describes Jinbe's current Stamina as 79, although `evaluation-jinbe` Stamina is **80**. Correct only the text to 80.
- Add a targeted assertion tying the Evidence `evaluationImpact` wording to the actual Evaluation Stamina80.
- Original v0.1.66 PR #64 at `10e15caea9145136cf15baa00a35107fb1359852`: **58 files / 257 tests + production build passed**. Main merge `60031f35db97cb30509fc61477147b6ba3566db9`: **58 / 257 + build + Pages deploy passed**. Follow-up patch requires its own PR-head and main-merge SHA validation.

---

# v0.1.66 verification — source-backed seven-axis review, read-only upside and regression

- Base: `main@4368c0ae4abc7de89647fd91274c757281ccf66d` (v0.1.65).
- Change scope: **review document, 4-test approval-gate source regression, README/CHANGELOG/TEST_REPORT only**. No production score, models, UI, save/restore or Matchup logic edit.
- Vista current: Base86/Raw2/Final87 Technique, Overall556/7, rank26. Nonproduction approval-gated proposed Technique Base89/Raw2/Final90, Overall559/7, rank25. **These candidate values are not published score data.**
- Shanks current Overall648/7, rank10. No candidate increase, no Raw-off hypothetical decrease. All seven existing Stat values preserved.
- Cross-case guards: Vista Attack4/Technique2; Shanks Attack6/Technique8/IQ4; Katakuri Defense6/Technique6; Jinbe Defense4, tied to existing source IDs. A guard does not demonstrate an independently proven incremental Haki effect.
- Existing invariants: 60 Characters / 59 defaults / 62 Evaluations / 434 total axes / representative Raw212 / all Raw230 / Balanced1.2 Haki0.5 / 15 direct Matchups; v0.1.65 name-conversion tests unchanged.
- **Evidence limitations:** ONE PIECE.com primary official profile and TV summaries crosschecked; no complete original manga panel/manual phone/desktop verification claimed.
- **CI:** pending actual PR-head GitHub Actions results at document creation. See PR checks for measured result.
- **Pages:** pending exact merge-SHA deployment result; do not assume deployment success from build alone.
- **Manual verification:** not performed in this review environment.

---

# v0.1.65 — Safe prose normalization, Unicode token boundaries, full-roster render regressions

- Baseline: `main@c18ccc0a7345a03bc06b4e68ae41dd51e99dade0` (v0.1.64 passed 244 tests and Pages deploy). Existing bug: `Supreme King Raw` in Newgate's Evidence `evaluationImpact` is partially mapped to `Supreme 알베르 패기 원점수` because `/King/g` is applied after only complete `Supreme King Haki` recognition.
- Change `src/domain/character/normalizeCharacterNamesForDisplay.ts` **only** in runtime code: preemptively resolve abbreviated/full Haki title, protect Korean `킹` inside words, quoted official alias, use ASCII Romanized whole-name boundaries, protect URLs. Preserve `킹은/이/을/과/에게/의/전` grammar and single-word King/Queen labels.
- Six focused tests in existing normalizer test file plus 3 live UI/whole-corpus tests in `displayNormalizationRegression.test.tsx`: actual Newgate `BattleTimeline` + `EvaluationTrace`, Stussy `CombatProfile` + `EvidenceList`, sample Character 60, Evaluation 62/434, Battle/Evidence/Wano seed corpus scanning for in-word corruption, URL safety and idempotence. Existing prior regression tests also required.
- No current score, Haki Raw, model, evaluation, source, matchup, character/crew, domain state or storage mutation; v0.1.66+ Vista upside review remains a separate later task. No manual physical device QA or full manga panel verification is implied.
- **Execution status: PR CI build and post-merge Pages outcome to be verified by exact SHA**. [Audit report](docs/V0_1_65_DISPLAY_STRING_NORMALIZATION_AND_REGRESSION_2026-10-10.md).

---

# v0.1.64 — 60-character combat narrative integrity & source attribution QA

- Baseline `main@dbd20ffc0fe7123f16d4c50ffd553b003506fcad` (v0.1.63). Audited 60 Character profiles and 62 Evaluation/434 Stat narrative and evidence references through identity checks plus focused human/official-scene review; **not** a claim to have read every manga page for all 60 characters.
- Targeted corrections: Wano seed and detailed Page One's Big Mom Conqueror's vs Armament mislabel; Elbaf (not Wano) Kid/Shanks battle environment; Kawamatsu's mistakenly borrowed Mary Geoise mission language + sword-style label; Kinemon unclear strategy sentence; X Drake SWORD vs undercover Tobi Roppo timing; clarify composite Kid battles.
- New `src/data/sample/v0164NarrativeIntegrity.test.ts`: verifies 60 profiled Characters, 62/434 evaluation texts and evidence ownership, 17 Wano ×7 narratives, updated facts/locations, 59×7 overall and 212/230 Raw invariant, Balanced v1.2 / Haki0.5 / 15 Matchups, Vista/Shanks score stability. Focus test does not determine canon truth of each statement.
- No new Base/Raw/Final/Overall value, Evaluation ID/state, Matchup, calculation rule, official ranking, UI or saved data change. v0.1.63 all-7-stat Vista upside review remains active; original Ch.561–562/574 directly checked before any +N approval.
- **CI/build/deploy status to be filled from SHA-matched workflow logs, not inferred.**

---

# v0.1.63 — Vista/Shanks full seven-axis upside and independent Haki review

- Baseline `main@5a3730ea839326c4bf708da8e4750f170fe4bed1` (passed 236/236 tests and deployed as v0.1.62).
- No numeric patch without source-specific Base-exclusion and owner approval. Add read-only typed audit `src/data/sample/v0163UpsideReview.ts` for 7 Vista and 7 Shanks Stat cards, plus four unresolved same-Evidence Haki events (Vista, Shanks, Katakuri, Jinbe); show qualitative evidence, constraints, comparator IDs, approval gates, never use in ranking.
- New `src/data/sample/v0163UpsideReview.test.ts` checks exactly 14 unique axis cards, source ownership and Evaluation reference links, stat-matched peers, all seven Vista candidate pathways, genuine E3 sparsity, existing 4 overlap amounts, unchanged current baseline vectors and 59×7/62/434 readiness/Haki model/15 direct matchup invariants. No Shanks/Vista down-simulation or mock overall revision.
- Official source cross-check: ONE PIECE.com Vista official profile, 2021 crew news and 2011 figure product (duplicate narrative, not separate feat), TV857/1040/1082/1112 and Shanks official profile. Original manga panels Ch.561–562/574/etc **not directly fully verified**; no manual mobile/desktop browser QA.
- **CI run/test/build/Pages status: verify by PR SHA and post-merge main SHA; do not infer from source.**
- [Evidence decision report](docs/V0_1_63_VISTA_ALL_SEVEN_STATS_SHANKS_UPSIDE_AND_HAKI_OVERLAP_2026-10-10.md).

---

# v0.1.62 — User-approved targeted Raw/Overall correction and multi-axis QA

- Baseline: `main@75cb8e19a2a20b182f9dd634bc3715b2023fd335`. Four existing Stat Raw allocations removed due explicit Base overlap: King Attack4→0, Technique2→0, Jinbe Attack4→0, Katakuri CombatIQ4→0; **Base scores unchanged**.
- Overall: King 83→82.57142857, Jinbe 79.57142857→79.28571429, Katakuri 84.28571429→84.00000000. Vista 79.42857143 / Shanks 92.57142857 both unchanged; no downward simulations generated for them.
- Expected invariants: 59×7 / 62 Evaluations-434 items, E1=53 E2=243 E3=117, representative Raw212 / all Raw230, Balanced v1.2/Weight0.5, Kaido Defense100, 15 direct Matchups. New `hakiMultiaxisCalibrationV0162.test.ts` pins four updated axes, three direct Overall changes, upside-only Shanks/Vista stability and index checks.
- Updated previous version regression assertions which validate **current shared data** rather than immutable historical payload. Historical v0.1.60/v0.1.61 reports remain traceable; supersession stated explicitly.
- **CI outcome to be entered by exact GitHub Actions record**; standalone local git clone unavailable in the current connected environment. Original manga panels not independently verified; official ONE PIECE.com summaries crosschecked.

---

# v0.1.61 — Haki Raw independent effect decision-only audit

- Baseline: `main@068edcd6fd33d9a3b94734285066d36e3ce20df2` (v0.1.60). The only TypeScript change is a **new Vitest read-only test** `src/domain/calculation/hakiIndependentRawAuditV0161.test.ts` containing **5 checks**. No production data, scoring algorithm, model configuration, UI, persistence or Matchup changes.
- The five tests pin twelve current axes across Vista/King/Jinbe/Katakuri/Shanks (Base/Raw/Final/Readiness), verify the five case Evidence IDs and their supported Stat roles including Shanks dual Haki Technique and Jinbe independent Big Mom Defense reference, compare three anchors, test hypothetical Raw-off on separate **copies** (never scores proposed to users), and preserve 59 default/413 items; 62 evaluations/434 items; E1=53/E2=243/E3=117; Raw226/244; Balanced v1.2 Weight0.5; 15 direct Matchups; Kaido Defense100.
- [Decision report](docs/V0_1_61_HAKI_RAW_INDEPENDENT_EFFECT_AND_DECISION_2026-10-10.md). Canon chapter IDs from the existing source catalog; independent full manga-panel verification **not completed**. This report documents a score review, not an approved scoring amendment.
- **Execution status:** GitHub PR CI and post-merge GitHub Pages must be checked by exact SHA before they can be reported as verified. Local machine execution and real browser/mobile QA are not implied by this report.

---

# v0.1.60 — Targeted Kaido Defense100 adjustment and Haki/source provenance verification

- Baseline `main@91ecd36c0e9c684b8c1f12e570a283b971fc96eb` (v0.1.59). User authorizes a **conditional** Kaido Defense100 *if justified*, not global formula/Haki changes. Other open PRs untouched.
- Adjust exactly one scoring item: Kaido default Defense **Base98→99**, **Raw2 unchanged**, Final **99→100**, Overall **96.571429→96.714286**; other 412 core stats retain numerical values. New evaluation data version for Kaido documents this explicit change. Rank position5 preserved in 59-person audit; Kaido–Linlin direct Matchup factor unchanged.
- Ryokugyu Defense **89/E3 unchanged**, its evidence links now explicitly include existing `evidence-aramaki-regrowth-tv1082` (secondary) and existing Shanks source (context). Evaluation data version updated; source Evidence itself unchanged.
- Read-only Haki five case cards (Vista/King/Jinbe/Katakuri/Shanks) with BaselineExclusion reasons and pending original-canon check. No Raw changes; 13 cross-stat reused events not removed. [Detailed v0.1.60 findings](docs/V0_1_60_KAIDO_DEFENSE100_HAKI_AND_RYOKUGYU_SOURCE_REVIEW_2026-10-10.md).
- New `scoreAdjustmentReviewV0160.test.ts` (4 tests) covers Kaido vector and no dual counting; Ryokugyu E3 and Evidence roles, preservation of 59×7/62/434/Raw226+244/E1-3/15 direct matchups/Weight0.5, unchanged five Haki Raw allocations and 59-character overall calculation. v0.1.59 read-only source-link expectation updated and historical known Kaido vector snapshots aligned. No unapproved mass recalibration.
- First PR run exposed two stale historical snapshot assertions (Kaido Overall and capped 100-score count); both fixtures were updated after checking the intended single-axis diff. Re-run full test/build before merge.
- **CI confirmation to follow from exact PR head and merged main SHA**; this document's listing of tests is coverage description, not a claim that local CI has completed. Supplementary official TV summaries crosschecked; **all original manga panels and manual mobile browser not independently tested**.

---

# v0.1.59 — High-E3 scoring adequacy and individual Haki Raw overlap regression (read-only)

- Baseline `main@ec32987005ebab5c2b3aec5763854e47bfc5c842` (v0.1.58), with **three pre-existing unmerged PRs left untouched**.
- Added `src/domain/calculation/scoreCalibrationCasesV0159.test.ts`: checks exact 14 representative E3 Final≥85 character/stat/current Final tuples; two high-E3 evidence-unlinked axes; Ryokugyu Defense current Evidence link; exact 13 overlapping Haki Evidence IDs and paired/triple Raw stats including Shanks dual Haki Technique; Evidence ID integrity; existing 59 default/413, full 62 Evaluation/434 Stat, representative Raw226/full Raw244, Balanced v1.2×0.5 and 15 direct Matchups.
- The preexisting `scoreCalibrationDiagnosticsV0158.test.ts` remains untouched; it already checks all 413 Base+Raw→Final→Overall values, Haki scope, Rank hypothetical sensitivity and no forced winner equivalence.
- New reports: [14+13 individual case audit](docs/V0_1_59_E3_AND_HAKI_RAW_CASE_AUDIT_2026-10-10.md); [decision-gated v0.1.60 proposal](docs/V0_1_59_DECISION_GATE_AND_V0_1_60_PLAN_2026-10-10.md).
- **No numeric or runtime source changes**. Existing score/Rank/Matchup values must remain identical. This is not independent validation of all manga panels, a new official score model, nor hands-on mobile/desktop QA.
- **Execution gate:** locally running npm is unavailable in this connected repository-only environment; record PR CI test and build outcome + actual post-merge `main` Pages same-SHA job result before declaring release confirmed. Historical baseline 50 files/220 passing tests is not automatically the new run outcome.

---

# v0.1.58 — Read-only score calibration and Haki cross-stat overlap diagnostic

- Baseline: `main@85ab40a3c8d92e9aef0795d5a917460423d62d7c` (v0.1.57).
- Changed only a **new test file** and diagnostic/docs/README/CHANGELOG/TEST_REPORT; no Base, Raw, Final, Overall, source Evidence, Matchup, Calculation Model, PROJECT_SPEC, app UI or storage data changes.
- Added `scoreCalibrationDiagnosticsV0158.test.ts` to verify all 59 default Evaluation×7 stat computed Final values, Balanced 1.2 formula and uncapped current range, 413 readiness labels and per-stat density, default Haki Raw226 vs all 62/434 historical-inclusive Raw244, 15 matchups, **13 shared Raw-Evidence across-stat references** with guard examples, and isolated one-Final-only −5 rank stress scenario with original values preserved.
- Full source-derived 59×7 matrix, high-E3 14, 4 genuinely unlinked E3, and model/score version semantics: [baseline](docs/V0_1_58_59x7_BASE_RAW_FINAL_READINESS_BASELINE_2026-10-10.md). [Risk/Rank/decision brief](docs/V0_1_58_COMPREHENSIVE_SCORING_VALIDITY_AND_DECISION_BRIEF_2026-10-10.md).
- GitHub PR CI tests/build and main Pages must be checked on the actual head and merge SHA. No claim of independently verifying all original manga pages or manually interacting with mobile browser.

---

# v0.1.57 — Completed default Evidence readiness audit and scoring-model preservation

- Baseline main `4be641e9b0d0aec29c4206f6a0b5462b5bff3c42` (v0.1.56). Classified previously missing **51 EvaluationItem.readiness** metadata axes; E1+10/E2+35/E3+6.
- Representative 59×7=413 exact readiness E1 **53**, E2 **243**, E3 **117**, missing **0**. The 4 previously unlinked default items (Akainu Speed, Smoothie Speed, Shanks Stamina, Ryokugyu Speed) remain intentionally **E3 with no fabricated IDs**.
- No score/Final/Overall changes, Haki Raw244, Balanced1.2 ×0.5, 62 Evaluations/434 Stats, 15 Matchups, battle/character/Evidence/PROJECT_SPEC/UI/save-data model changes. New `readinessCompletionAudit.test.ts` has four tests for all 51 explicit labels, full 413, E3 unlinked legitimate gaps, source role, twelve Final vectors/Overall, model/historical integrity. Eight historical readiness snapshot files updated to current distribution; `unresolved` now zero for default roster, not a hard requirement that every original manga panel has been independently read.
- Detailed per-axis facts, battle conditions, evidential limits: [51-axis source audit](docs/V0_1_57_FINAL_51_AXIS_READINESS_AUDIT_2026-10-10.md). Next-score-model gate: [Post-readiness brief](docs/V0_1_57_POST_READINESS_CALIBRATION_BRIEF_2026-10-10.md).
- **PR GitHub CI, production build and post-merge Pages deployment:** verify against exact head/merge commit, do not assume success at document creation.
- No claim of manual browser/mobile UI verification or all manga chapter panels being independently accessed.

---

# v0.1.56 — Top-tier readiness and era-context regression

- Baseline `main@0e7cc6522558b5bb029c80388f40de3ada9dfa1a` (v0.1.55).
- Exactly **29 `EvaluationItem.readiness`** fields classified (Garp7, Teach6, Kuzan5, Kizaru6, Mihawk5): new E1 4/E2 19/E3 6. Baseline E1 39/E2 189/E3 105/missing80 → **43/208/111/51**. Remaining Primary29/Secondary22.
- All Base/Final vectors, historical data, Evidence IDs and original fact texts, Haki contributions, calculation/matchup source, UI, storage, PROJECT_SPEC **unchanged**.
- Updated seven existing absolute readiness distribution assertions. New `readinessTopTierReview.test.ts` (4 tests) checks 29 labels, exact distribution, Prime/older Garp separation and high-score E3 uncertainty, original evidence role constraints, unchanged 62 evaluations/434 stats, Raw Haki244, Matchup15, five full Final vectors/Overall, and all remaining 51 primary/secondary-linked axes.
- [Detailed 29-axis provenance/conditions](docs/V0_1_56_TOP_TIER_29_AXIS_SOURCE_CONTEXT_AUDIT_2026-10-09.md) · [80-axis before/after trace](docs/V0_1_56_80_AXIS_BEFORE_AFTER_TRACE_2026-10-09.md).
- **PR CI + main Pages deployment:** pending until GitHub Actions confirms green for the **specific commit SHA**. No actual browser/manual mobile verification or universal original manga panel proof is claimed.

---

# v0.1.55 — Five-character source-readiness and calculation invariants

- Parent main baseline `39383ba5ed1f43085a4f509e782bfe8ddf723553` (v0.1.54).
- Changed only 31 `EvaluationItem.readiness` metadata fields in `src/data/sample/evaluations.ts`: Cracker 5, Law 7, Doflamingo 7, Jinbe 6, Shanks 6. 9 E1 + 20 E2 + 2 E3; representative readiness `39/189/105/80`.
- Existing Evidence records, Base/Final scores, Haki Raw (244), 59 default×7, all Evaluation 62/434 stats, Matchups 15, Balanced 1.2, PROJEC_SPEC, B selector and UI are unmodified. Source fact vs combat conditions vs inference are distinguished in detailed audit and trace matrix.
- Added `src/data/sample/readinessFiveCharacterAudit.test.ts` with 3 comprehensive tests: all 31 chosen labels, current 59×7 distribution and E3 high-score caveat, existing battle evidence source-role integrity, Five Character Final vector/Overall unchanged, legacy data sizes and Haki raw 244. Updated 6 prior fixed-count fixtures.
- **PR workflow npm test/npm run build and post-merge Pages main deployment:** confirm with exact commit SHA once completed; until then no success assumed.
- No browser/mobile manual UI run and no complete independent manga-page inspection.
- [Audit report](docs/V0_1_55_FIVE_CHARACTER_CANON_READINESS_AUDIT_2026-10-09.md) / [111-axis trace](docs/V0_1_55_111_AXIS_TRACE_2026-10-09.md)

---

# v0.1.54 — 23 missing Evidence-role axes and 14 context-only axes

- Baseline `main@69c530ab38cb6cd319216bed5d012bcd10b2b14e` (v0.1.53).
- Scope: 37 individually reviewed `EvaluationItem.readiness` metadata fields; 5 added `statContributions` secondary roles, 3 existing context→secondary role clarifications. Zero new Evidence records, numeric ratings, Haki Raw, Calculation Model, Matchup, UI, stored state or PROJECT_SPEC changes.
- Distribution E1 30/E2 162/E3 73/missing 148 → **E1 30/E2 169/E3 103/missing 111**.
- Previous fixed distribution assertions updated in `readinessMetadataAudit.test.ts`, `readinessSourceRoleAudit.test.ts`, `readinessComparativeAudit.test.ts`, `overallValidityAudit.test.ts`, `hybridRawPilotReviews.test.ts`. New `evidenceStatRoleGapAudit.test.ts` checks 37 explicit choices; 8 precise per-axis Evidence roles; 111 remaining primary72/secondary39; 59×7, 62 Evaluation/434 Stat, Haki Raw244, 15 Matchups and representative score/Overall invariance.
- Canon-vs-official-TV-vs-interpretation uncertainty documented by [37-axis report](docs/V0_1_54_ROLELESS_CONTEXT_37_AXIS_ADJUDICATION_2026-10-09.md); [148-axis trace](docs/V0_1_54_148_AXIS_SOURCE_ROLE_MATRIX_2026-10-09.md). Post-audit development intentions in [roadmap](docs/V0_1_54_POST_AXIS_AUDIT_ROADMAP_2026-10-09.md).
- **PR CI and main Pages verification:** pending successful workflow observation. No claim of personally inspecting all manga panels or running manual mobile QA.

---

# v0.1.53 — three supplementary evidence records and 24 readiness classifications

- Baseline `main@5ff5b9ab345463b2469a155ccbd2cbe0eb2adfd5` (v0.1.52).
- Scope: exactly 24 existing EvaluationItem readiness metadata fields, 10 Evidence links on 7 items, 3 new official TV supplementary Evidence objects referencing existing Battle IDs. No Base/Final score, Haki Raw, scoring model, Matchup/Battle participant, Character, save state, PROJECT_SPEC, or UI changes.
- Distribution baseline E1 29/E2 145/E3 67/missing 172 → **30/162/73/148**. The three no-link axes with E3 remain intentionally unlinked.
- Updated historical readiness count tests in `readinessMetadataAudit.test.ts`, `readinessComparativeAudit.test.ts`, `overallValidityAudit.test.ts`, `hybridRawPilotReviews.test.ts`. Historical absolute Evidence ID-empty count in hybrid test updated 11 → 4 because seven representative items gained legitimate links.
- New `readinessSourceRoleAudit.test.ts`: 24 explicit labels, 3 official-source records and their existing Battle links, role-specific context handling, 3 legitimate E3 no-Evidence gaps and all exemplar 7-axis Final/Overall Haki Raw/Matchup invariants. `docs/V0_1_53_172_AXIS_EVIDENCE_ROLE_TRACE_2026-10-09.md` records full 172 prior unclassified axes, 148 still unclassified, per-axis source-role quality.
- **GitHub PR test/build and main-commit Pages deployment:** pending until observed green status, then report results with exact SHA. No manual mobile-browser assertions.
- [Report](docs/V0_1_53_LINK_GAPS_AND_EVIDENCE_ROLE_REVIEW_2026-10-09.md) · [172-axis trace](docs/V0_1_53_172_AXIS_EVIDENCE_ROLE_TRACE_2026-10-09.md).

---

# v0.1.52 — 189-readiness triage and 17-axis reviewed metadata

- Baseline `main@be897e34c8bedc08777a9937a77470d1ca1cd3db`; previous count E1 29/E2 134/E3 61/missing 189.
- Changed exactly 17 metadata `readiness` values: Jozu 7, Queen 7, Katakuri 3. No changes to Base/Final scores, raw Haki contributions, model formula, Evidence/Battle IDs, matchups, UI, PROJECT_SPEC, or saved data.
- After: E1 29/E2 145/E3 67/missing 172. Original 189-axis before/after matrix stored under `docs/` to distinguish reviewed vs unresolved records. Remaining 10 zero Evidence-ID links documented.
- Update three pre-existing count assertions (`readinessMetadataAudit.test.ts`, `overallValidityAudit.test.ts`, `hybridRawPilotReviews.test.ts`). Add 3 scenarios in `readinessComparativeAudit.test.ts`: 17 expected E-levels + 59×7 distribution; four exemplar Final vectors, Overall, Haki Raw and matchups invariants; Lucci/Kaku IQ68/72 retained E3.
- **PR CI test/build and exact-commit Pages deploy result:** pending workflow; complete acceptance after observed success. No claims of full official manga-panel source verification or manual browser QA.
- [Evidence and case-by-case audit](docs/V0_1_52_READINESS_CALIBRATION_AND_THREE_CHARACTER_ANCHORS_2026-10-09.md) / [189-axis matrix](docs/V0_1_52_READINESS_189_AXIS_TRACE_MATRIX_2026-10-09.md).

---

# v0.1.51 — readiness text/metadata consistency and unchanged-score regression

- Based on `main@73b0816cccef809f431076300ffc919ed85bf618` (v0.1.50).
- Scoped metadata-only change: 3 rationale-explicit E2 tags, no point values, Evidence IDs, Haki Raw, UI, calculation, stored memberships, or matchups edited.
- Existing `overallValidityAudit.test.ts` updated from 29/131/61/192 to **29/134/61/189** readiness counts. New `readinessMetadataAudit.test.ts` checks those three E2 classifications, raw/stat/Overall invariant, that missing-readiness explanations do not claim a specific E level, linked Evidence IDs exist, and at most the 10 known missing-readiness, unlinked-Evidence axes remain.
- **Automated CI and production build still need successful PR head run**. Then merge main and verify Pages deployment using the exact commit SHA. CI does not establish canon-panel exhaustive checks or real mobile QA.
- [Details](docs/V0_1_51_EVIDENCE_READINESS_AND_PRIORITY_CANON_AUDIT_2026-10-09.md).

---

# v0.1.50 — Cracker rationale integrity regression plan

- Base: `main@ae26cf49f13b90f7334131e8e9e11c1e20c1ca74` (v0.1.49).
- Code-only scope: two Cracker rationale strings in `evaluations.ts`, one old numeric Evidence impact sentence in `evidence.ts`, focused automated regression test, markdown audit/report metadata.
- New `crackerRationaleConsistency.test.ts`: approved seven Final scores, Attack Raw4, Final77 / Defense Final81, Overall77.857142..., and lack of contradictory historical Stamina phrase.
- Existing test suites must still verify 59 evaluated unique IDs, historical Evaluations 62, Core Stat434, total Raw Haki244, membership73 and direct matchups15. Existing UI picker B, 7-axis calculations and all baseline scores untouched.
- **PR #48 first CI result:** [Actions run #331](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37920367997) at head `e505cedcde136c5d97e2eb99fab3cfc8840caf84`: `npm install`, `npm test`, `npm run build` all succeeded. This document update triggers a new head run; confirm it before merge. Post-merge Pages check remains pending. Passing automated CI is not independent inspection of all canon panels or real-device mobile QA.
- [Full 59-character axis report](docs/V0_1_50_SEVEN_AXIS_DEEP_AUDIT_AND_CRACKER_RATIONALE_2026-10-09.md).

---

# v0.1.49 — Balanced Overall reliability/validity distinction and 59×7 diagnostic

- Baseline `main@ee48392a74a645258d0bbf5475467711a6dfe883`, v0.1.48. This patch updates explanatory text only, adds a non-production weighting experiment report and `overallValidityAudit.test.ts`. No stats/Raw/CombatPower calculation changes.
- Regression protects 59 unique IDs, Balanced equal-weight result across all 59, 244 Raw Haki (over 62 Evaluations), alternative weighting only in test scope, and 413 default-axis readiness metadata (29 E1/131 E2/61 E3/192 missing).
- Same Overall yet different 7-axis distribution: Kanjuro/Ulti and Cracker/Karasu; Jack/Kid alternate-weight position checks. Scenarios are NOT alternative official models or a probability forecast.
- `CharacterPage` now clarifies Overall is not a 1v1 win rate or certain rank; `App.test.tsx` checks the message. PROJECT_SPEC, Rank sorting, Matchup, B picker and UI palette are unchanged.
- New CI/test/build, PR merge and exact main Pages deployment to be verified separately. Automated jsdom is not real-device mobile visual QA.
- [Full 59×7 sensitivity and model-validity audit](docs/V0_1_49_OVERALL_VALIDITY_AND_SENSITIVITY_59x7_2026-10-09.md).

---

# v0.1.48 — Group dropdown/all-roster picker and score semantics regression

- Baseline v0.1.47 main `6f4a19cc80a9f577cd3f26bfbce8cfdb24d12fee`.
- Preserve all 59 distinct IDs and 73 memberships: dialog dedupes historical group membership, filter preserves group context on click, ranking and matchup unchanged.
- Existing `src/ui/App.test.tsx` cases use actual native group select instead of discontinued tab buttons and verify historical groups, rankings and alias search; add independent dialog focus Escape and unique roster/group-filter tests.
- Full `npm test`, `npm run build`, CI PR, post-merge main and GitHub Pages gate required. Real-device visual/touch QA remains distinct from jsdom tests.
- Model assurance is a logical review, NOT empirical psychometric validation: 7 Final Stats arithmetic mean remains unchanged.
- [Evidence/UX explanation](docs/V0_1_48_PICKER_B_AND_OVERALL_VALIDITY_2026-10-09.md).

---

# v0.1.47 — A-path calibration, baseline and regression gates

- Baseline `main@7ee57a475e1d9721bfdca03d8fcd1c6bd0cf748d` (v0.1.46), 59 evaluated unique / 62 evaluations / 434 core stats, Haki Raw 244 and 15 existing direct matchups.
- Only 6 of 59 default character arrays change, with 53 full seven-axis arrays frozen as Golden baseline in `fullRosterCalibration.test.ts`; all 59 unique remain. King/Katakuri Base adjustments accounted for their **pre-existing Haki Raw**, no recalculation rule changes.
- Changed overall: Jack 74.857→78.143, Kid 82.571→84.571 (Speed 78→82, Versatility 86→80), Karasu 80→77.857, Marco 81.714→83.429, King 81.286→83, Katakuri 82.714→84.286.
- 59×7 axis-specific comparisons include Garp Attack99 vs Marco77, Kid Attack92 > Law86 but Combat IQ73 < Law88 and Versatility80 < Law91, Jack Stamina88 > Ulti84 and Jack overall above six Tobi Roppo, commander minimum 83 > specified peer group max 79.571. These are explicit project evaluation constraints, not official canon tiers.
- 14 peer records retained pending better independent evidence. Numeric distribution remains concentrated at 75–80 (25→27) rather than forcing aesthetic normalization.
- CI full-test/build and postmerge Pages deploy must pass before release declaration; manual mobile/device QA and manga full-panel evidence verification remain pending.
- [Detailed 59×7 source/evaluation audit](docs/V0_1_47_A_PATH_59_CHARACTER_SEVEN_AXIS_CROSS_AUDIT_2026-10-09.md).

---

# v0.1.46 — Canon source matching / conditional combat context regression

- Baseline `main@09786f1fac2a8922a125bc44cb43f61e5b808f21` (v0.1.45).
- Verified ONE PIECE.com TV source correspondence: Kid's 1066 attack vs 1067 victory, Drake's actual 1060/1069 CP0 engagements, Ulti's 1033 Big Mom intervention vs 1038 Zeus/Nami follow-up, Who's-Who's hidden troops (1038) vs Jinbe finishing blow (1040).
- Corrected Who's-Who `combatStructure=multiple-vs-one`. Revised source references and Lucci/Kaku IQ explanations; readiness `E2→E3` for only those two Combat IQ axes. **No Base/Final/Overall scores, affiliations, Haki Raw or direct matchups were recalculated in this source-verification patch.**
- Added `officialEpisodeCrosscheck.test.ts` (four source/context and integrity assertions). Previous regression tests remain enabled and existing values unchanged.
- 60 Characters / 59 unique evaluated / 62 Evaluations / 434 Stats / 73 Memberships / Haki Raw 244 / 15 direct Matchups, Balanced 1.2 weight0.5 remain release invariants.
- Final build and merge+Pages CI must be checked separately before declaring published; manual device visual verification not performed.
- Detailed verification: `docs/V0_1_46_OFFICIAL_EPISODE_CROSSCHECK_2026-10-09.md`.

---

# v0.1.45 — 17 new characters, three groups, CP0 recalibration release gate

- Baseline `main@1ed24e8e8404dfb84d0348517b529972a06be19c`, v0.1.44. This patch adds exactly 17 evaluated draft characters and 3 historical/current contextual groups without changing old Character identities.
- Expected totals: 60 Character master / 59 unique evaluated / 62 Evaluation / 434 Stats / 73 Membership, plus 55 supplementary new Evidence and 30 Battle context records.
- Lucci 81.000→78.000 (combat IQ 78→68), Kaku 78.4286→74.2857; other prior 43 Evaluations' Base scores untouched; total Haki Raw 244 (49 typed contributions) preserved. Old 15 direct Matchups unchanged.
- New `wanoExpansion.test.ts` verifies 17 unique IDs, all 119 new axes with Evidence ownership, 3 source groups, Drake/Kanjuro/Ashura affiliation, Kinemon leader, 59-ranking dedupe, special Killer failed SMILE, 0 new Raw, legacy user ratings unchanged.
- Regression tests across historical Haki audit files retain original 49 Haki-contribution entries; **49 is not 73 Memberships** (fixed an initial test migration confusion).
- Prior CI run `37893323754` passed 38 test files / 173 tests but failed TypeScript on multi-affiliation `flatMap` inference. Fixed explicitly typed `CharacterMembership[]` callback; final post-change CI must be checked separately, then post-merge main and Pages.
- New episode-scoped source validation: Kid+Law vs Big Mom, Kid+Killer rooftop 5v2, Kid vs Shanks, Killer vs Hawkins, Akazaya vs Kaido, Inuarashi/Jack and Nekomamushi/Perospero conditional Sulong, Who's-Who/Jinbe, Sasaki/Franky, Black Maria/Robin, Ulti/Big Mom, Page One/Big Mom and Kanjuro betrayal. These 13 distinct Battle contexts and 21 person-linked additional records avoid conflating different opponents or assigning group results to individual feats.
- No browser/tablet manual UX has been performed; treat automatic jsdom tests and Pages deployment as distinct from hands-on device validation.
- Audit limitations: sources are official character profile and official anime plot synopses, not direct full manga chapter review; source.type supplementary and E2/E3 draft accordingly. Do not infer new current allegiances or canonical numbers.
- [Full 17-member 7-axis and CP0 audit](docs/V0_1_45_WANO_THREE_GROUP_EVIDENCE_RECALIBRATION_2026-10-09.md).

---

# v0.1.44 — Cross-calibration regression and release checklist

- Baseline: `main@ec8f69f6e08bc485b9206f5e05dc709e58e15dc9`.
- Changed **3 existing Evaluations / 21 reviewed axes**: Lucci 86/82/85/88/89/81/80 → 82/79/83/84/84/78/77; Kaku 80/78/80/85/88/82/82 → 76/75/77/80/84/79/78; Morley 76/78/77/69/80/75/83 → 76/80/77/77/83/75/87.
- Expected Balanced v1.2 overall Lucci **81.000**, Kaku **78.429**, Morley **79.286**; comparator standings and full 42-character rankings tested against calculated data. Unmodified 39 legacy plus Sabo/Karasu/Stussy evaluations retain score/data versions.
- Added **2 supplementary Evidence / 1 Battle**, preserving legacy canonical evidence links. New Morley Speed evidence changes a role `context→primary`; Kaku short Zoro contact and group attacks are downgraded to `secondary/context` instead of equating exchanges to individual top-tier damage.
- Expected invariants: **43 character master, 42 unique evaluated, 45 Evaluations, 315 Stats, 49 Memberships, Haki Raw 244, Balanced 1.2 weight 0.5, 15 existing direct Matchups**; `PROJECT_SPEC.md` and full app colors untouched.
- All prior tests remain enabled; update only affected three calibrated golden Overall fixtures and relevant evidence count (14→16)/new context count (10→11) plus new comparison checks.
- CI test/build and main Pages deployment must be checked before declaring release success. Actual mobile/desktop browser rendering not verified in this task.
- [Evidence/context/source/audit plus next group shortlist](docs/V0_1_44_CROSS_CHARACTER_CALIBRATION_AND_NEXT_GROUPS_2026-10-09.md).

---

# v0.1.43 — Six-character evidence recalibration / regression gate

- Baseline `main@0da4af3e0b3bf3b5e504be3e87fc5f7165bf145a` following UI/translation PR #36.
- Audited 6 characters × 7 stats. Three adjusted: Kaku Combat IQ 79→82, Stussy Speed 83→80, Stussy Combat IQ 88→85. Four characters' 7-axis values and the remaining 11 reviewed axes unchanged. Related Episode 1109 and Stussy Evidence interpretation/context updated; all links and IDs preserved.
- Expected Kaku Overall 82.142857..., Stussy 77.571428..., other four unchanged. Derived 42-character ranking Kaku 23, Stussy 34. No new matchup inference, no win probability.
- Legacy 39 Evaluations/273 Stats remain untouched. Global 45 Evaluations, 315 Stats, 43 character master / 42 unique evaluated roster, 49 Memberships, 15 existing Matchups, Balanced 1.2, Haki 0.5 and Haki Raw sum 244 unchanged.
- `src/data/sample/newGroupEvidence.test.ts` updated as a genuine rating-data migration: full six-score arrays, 42-axis calculation, altered Evidence owner/role, 42 unique ranking and fixed old data invariants still tested. No test disabled or weakened to hide failures.
- PR CI, post-merge `main` tests/build/Pages deployment and actual browser/device checks are separate release gates; do not assert success before checking. Manual browser QA has **not** been performed.
- [Detailed Evidence/Context/Interpretation audit](docs/V0_1_43_REVOLUTIONARY_CP0_EVIDENCE_RECALIBRATION_2026-10-09.md).

---

# v0.1.42 — vertical Special restoration and fruit localization

- User screenshot comparison: retain a *single combined type label* and restore a *vertical* sequence of explanatory text without bordered two-column cards. No global palette change.
- Changed only CSS display rules for `special-trait-list` and `special-trait`; one title and full-width sections remain in `CombatProfile`.
- UI display Korean names: `메라메라` → `이글이글` (Sabo), `오페오페` → `수술수술` (Law), `메로메로` → `매료매료` (Hancock), `모치모치` → `쫀득쫀득` (Katakuri), Karasu `그을음그을음`, Morley `밀어밀어`. Evidence links/trait IDs preserved; unclear official Korean-language naming may need licensed Korean volume verification.
- Regression assertion covers all six localized traits and category grouping; production build and whole-roster regressions gated by CI. `PROJECT_SPEC.md` and `evaluations.ts` remain untouched.
- Manual browser/tablet CSS visual verification remains pending; the user screenshot is the acceptance reference.

---

# v0.1.41 — Special Profile / Evidence readiness / motif / localization (PR #35)

- Baseline: 43 Character master / 42 unique evaluated, 45 Evaluations / 315 core Stats, 49 Memberships, 15 direct Matchups, Haki Raw sum 244, Balanced 1.2 / Haki Weight 0.5.
- Display-only Special ordering: devil-fruit → race → biology → modification → equipment → technology → other. A single slash-separated category heading and two-column individual explanations, single-column on narrow screens; original category/status/description/Evidence links and score logic remain intact.
- Evidence readiness help: exact model definitions E1/E2/E3 from `src/domain/evaluation/types.ts`; E4 marked as not defined, not added to the canonical union; `?` beside core-stat header, outside-pointer and Escape dismiss/focus return.
- Beasts Pirates icon: generic `♜` replaced with compact original horned-skull visual reference. This is not the official logo artwork.
- Polish localized Korean Special descriptions for Sabo, Morley, Karasu, Lucci, Kaku, Stussy. Existing Haki/Evidence/7-axis numbers not recalibrated.
- Added three jsdom tests across CombatProfile, CharacterIdentity and EvidenceReadinessHelp, plus existing app/roster/matchup/regression coverage.
- Latest PR build [37887097546](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37887097546) succeeded: **37 test files / 165 tests passed; TypeScript + Vite build passed**.
- GitHub Pages postmerge status must be independently checked. Real Android/browser mobile scrolling, viewport clipping, touch and visual rendering are **not** verified by jsdom.
- No change to `PROJECT_SPEC.md`, overall theme, evaluation/rating policy or npm package version. Entire UI palette stays in its already-approved current design.

---

# v0.1.40 — Haki help completeness fix / final post-merge verification — 2026-10-09

- [PR #33](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/33): status-only Haki records were missing `?` controls. Every Armament/Observation/Conqueror row now provides a button; if optional detail notes are not registered, the content explicitly says so without creating fictional Evidence or altering Haki statuses.
- Regression coverage added for Akainu status-only records: three help buttons, open with fallback explanation, Escape close.
- PR CI [37885166603](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37885166603): **36 test files / 162 tests passed**, `tsc -b && vite build` passed, PR Pages deployment skipped.
- Merged to `main` at `289b91a0e6e5f1b7656b0368f734cb557b42f59d`; [post-merge run 37885213396](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37885213396) completed successfully with build/test and Pages deployment.
- This fix does not change any Evaluation/Stat/Haki Raw, Balanced 1.2 weights, memberships, score calculation, Matchups or app-wide palette. The existing 43 Character master / 42 evaluated unique / 45 Evaluation / 315 Stat / 49 Membership / 15 direct Matchup baselines are preserved.
- **Manual QA still needed:** real mobile and desktop site rendering, popup edge-clipping/touch behavior, and keyboard behavior on actual devices. GitHub Actions success is not a browser/device QA result.
- Product npm package version `0.1.34` remains unchanged; v0.1.40 is the implemented feature-patch label. Changing that versioning convention is a separate release decision.

---

# v0.1.40 — Post-merge CI / Pages verification — 2026-10-09

- PR [#31](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/31) was merged to `main` on 2026-10-09 04:18 UTC (13:18 KST): merge commit `aafdce5d66e14d4603b158fbcb55ff10438e6bdc`, feature HEAD `4759b71b72c87c661fa1402232da707a6465f6b6`.
- Final PR run [37883157194](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37883157194) completed successfully: `npm test`, `npm run build` passed; Pages deployment correctly skipped on PR.
- Post-merge `main` run [37883219757](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37883219757) completed successfully: **36 test files / 161 tests passed**; `tsc -b && vite build` passed; Pages artifact upload passed.
- Post-merge deploy job `113667467309` reported **success** for exactly `aafdce5d66e14d4603b158fbcb55ff10438e6bdc`; GitHub evaluated environment URL: https://pchjesus.github.io/onepiece-saikyo-analysis/.
- This release-verification entry changes **documentation only**. No Evaluation, Haki Raw, Balanced 1.2, existing direct Matchup, Membership or UI source changes are introduced. The v0.1.40 global UI palette item #3 **remains unimplemented** pending user approval.
- **Still unverified:** actual desktop/mobile browser visual inspection, touch placement and clipping of Haki help popovers across small screens, and end-user site rendering. A successful Pages deployment is not proof of manual UI verification.
- Nonblocking build/deploy maintenance note: GitHub Actions warned about Node.js 20-based actions being forced to Node.js 24. Review action major-version upgrades separately; do not mix them into this patch.
- The previous entry's note that post-merge Pages required verification is historical; the successful deployment is verified in this section.

---

# v0.1.40 — 인물 프로필 간결화 및 현재 소속·서열 검증

- Input: 43 Character master, 45 Evaluations (315 Stats), 47 original Memberships, 15 direct Matchups.
- Change: +2 Memberships to 49 (Kuzan current Blackbeard 10th while Navy former, Jinbe Warlords former while Straw Hat current). Existing Evaluation/Score and Matchup payloads unchanged.
- Added / revised tests for Haki three-row '?' popups with outside-pointer and Escape dismissal/focus, verified Devil Fruit awakening badge, default non-awakened Sanji, local group/admiral motifs, Captain-first / numbered seat / Korean alphabet fallback, Kuzan/Jinbe duplicate suppression and Newgate final crew label.
- Existing snapshot-style 'first Navy character' assertions were updated to explicitly select Garp when required; no UI feature was removed or test disabled.
- PR #31 code + docs revision CI [37883066574](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37883066574): **36 test files / 161 tests passed**, `npm run build` **passed**; deploy skipped on PR branch. The post-merge main Pages deployment is subject to separate verification.
- 3 global color palette options documented only; app-wide background/tab/card colors not changed.
- Browser/mobile device manual visual confirmation not performed in this automated review.

---

# v0.1.38 — A안 승인 후 실제 데이터 반영 및 병합 게이트

- 네 축 A안 실제 `sampleEvaluations` 값 변경: 사카즈키 방어 95/0, 쿠잔 공격 93/0·방어 93/0, 카타쿠리 공격 81/0.
- 역사적 Haki Raw 리뷰 14건 기록은 보존하되 현재 원본 데이터의 4건 Raw가 이미 Base에 이전됐음을 회귀검증으로 구분.
- 39 Evaluation / 273 stat / 49 typed Raw 합계 244, 기존 Final/Overall, Evidence 소유와 Haki 능력, Matchup 비교 호환성 검증.
- [검토 브랜치 CI](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37879886144) 성공 후 문서 갱신. 최신 PR HEAD의 최종 CI 및 병합 뒤 main 빌드·배포는 별도 확인 대상.
- 모바일 실기기 렌더링은 실시하지 않았으며 신규 집단의 데이터 등록은 별도 작업.

---

# v0.1.37 (Draft PR #29) — 가반 산먹깨비, 한국어 용어, Hybrid 재산정 승인안

**2026-10-09 KST**. Product `main` stays at v0.1.34 pending user confirmation.

## Implemented in review branch
- Verified 112권 1139화 정식 단행본 제목 `산먹깨비`, inserted before `해적왕의 왼팔` as the Gaban epithet without changing any identity, membership, Evaluation state, or score.
- UI Korean localization: 7 stat labels, all visible Base/Raw/Haki/Final calculation terms, battle structure/intent/result/evidence strength, matchup selection headings and visible analysis, special profile captions, and primary term 카무사리. Internal identifiers, evidence IDs and CalculationModel remain unchanged.
- Added non-production `buildHybridApprovalPreview` A (4 Raw Base transfers) / B (10 Raw Base transfers across 9 stats), preserving 39 Evaluation/273 Stat Finals and all original OVR. Explicitly notes that score changes are NOT warranted without further canon marginal-effect evidence.
- Group research `docs/PROPOSED_NEXT_TWO_GROUPS_EVIDENCE_2026-10-09.md` for Revolutionary Army and CP0 is **research only**. Group/Character/Evaluation data not yet added.

## Validation and regression fixes
- Initial CI caught English assertions after localization; updated existing React integration tests to retain all prior functionality coverage.
- Another CI caught translation of the program identifier `factors` due to overly broad string replacement; fixed the program identifiers and retained Korean user-visible labels (test is not disabled).
- TypeScript CI caught exhaustive EvidenceStrength union `unclear`; added the Korean display string `불명확` rather than weakening types.
- Verified latest implementation commit at [CI run 37878826898](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37878826898): **34 Test Files / 148 Tests passed**, **TypeScript/Vite production build passed**, deploy skipped because PR branch only.
- Actual desktop/mobile visual inspection, production `main` deploy and user approval **not performed**. No claims about new character 7-axis scores.

## Approval gate
- Keep PR #29 **draft**, do not merge or deploy before user selects A (4 ordinary transfers) or B (all 10 with overlap-to-Base) and approves final changes.
- Full baseline: 39 Evaluations, 273 final Stats, 53 typed Raw sum 256, Balanced 1.2 Weight 0.5, 15 Matchups.
- The 4 vs 10 candidate impacts live **only in simulation**; production score/Ranking source of truth is unchanged.

---

# v0.1.36 Draft — FEATURED Selection UX & Haki Overlap Scenario (2026-10-09)

## Scope and before/after
- Project scope and 39 Evaluation/273 Stat official draft source values remain unchanged; 15 direct Matchups and v0.1.34 Balanced 1.2 remain intact.
- FEATURED quick-pick buttons now have visually selected dark fill, stronger border, checkmark, and accessible `aria-pressed`; state derived from resolved Matchup pair + evaluation state, no separate stale selection state.
- Added `src/ui/pages/MatchupHome.test.tsx` (jsdom React) verifying initial selected pairing, changing FEATURED, SWAP retention, manual roster clearing, era-specific change/restore, RANDOM pair coherence.
- Non-mutating `src/domain/evaluation/hybridOverlapStress.ts` + `src/data/sample/hybridOverlapStress.test.ts` simulate removing exactly six **unresolved** cross-stat Haki Raw allocations, Raw sum 28, with Base fixed only to measure sensitivity. Tests cover the impact on all 39 Evaluations and preservation of all other 273 Stat values; the stress output is NOT a canon score correction or a lower bound.
- [Scene review and exact caveats](docs/HYBRID_HAKI_OVERLAP_SCENE_REVIEW_2026-10-09.md) distinguishes anime summary statements from manga interpretation, duplicated outcomes from independent effects, and matchup conditions.

## Verification
- PR #28 [CI 37875341097](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37875341097): **33 test files / 143 tests passed; `npm run build` passed**.
- Current PR HEAD after this test report needs CI recheck before merging.
- No actual desktop/mobile browser rendering or device-specific interaction test was run. jsdom covers React state and attributes, CSS selected selectors have been added but visual rendering was not manually inspected.

## Data/version guarantees
- No changes to `PROJECT_SPEC.md`, official Raw, Base, Final, rating formula, ranking source, matchup factors/winners, saving/restoration and product/package version.
- Explicit approval and full evidence audit still required before any production Haki data/version migration.

---

# v0.1.35 Draft — 14 Haki Raw Disposition & Candidate Base Rebase

**2026-10-09 KST**. PR #27, branch `feature/v0.1.35-hybrid-raw-disposition`.

## Review/implementation
- All **14 Haki Raw contributions** in Sakazuki/Kuzan/Shanks/Katakuri/Linlin reviewed with exact Evidence, Raw, rationale and uncertainty. Mihawk's Raw=0 preserved without inferring inferior Haki.
- **4 score-invariant Base/Raw proposals**, 4 exceptional applications with unproved independent marginal bonus, 6 multi-stat overlap unresolved. These are **not** applied to production Evaluation data.
- New `previewHybridRawPilot` copies the input 39 Evaluation records without mutation. It checks ID/Stat/Haki Type/Evidence ID/Raw/duplicate review, 0–100 Base bounds, exact Final invariance under **Balanced 1.2 Weight 0.5**, and rejects incompatible Haki Weight input.
- In preview only, aggregate Raw **256→244**, four Base points adjustments total **+6**. All **39 Overall and 273 Final Stat values remain unchanged**. Changing model Haki Weight would alter some scores and needs versioned migration review.
- New official ONE PIECE.com TV episode 857 supplementary Evidence for Katakuri's composure-dependent Future Sight and mochi-body evasion, with scope-limited role mapping and no invented Raw. Katakuri `Attack/Defense/Technique/Combat IQ` readiness marked E2; evaluationDataVersion updated; all numeric values unchanged.
- Overall missing readiness items **196→192**, missing Stat Evidence links still **11**, typed Raw in production remains **53 contributions / 256**.

## Regression and CI
- First PR run [37870705757](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37870705757) **failed 2 previous app tests**: adding the Katakuri source raised his evidence count from 7 to 8, and the old character Evidence query and Battle Timeline tests expected 7.
- Repaired both tests with a direct check that the extra Episode 857 Evidence is included, owner-matched and attributed to Katakuri's existing battle; did **not** weaken the feature or hide the result.
- The post-fix implementation commit [37870824214](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37870824214): **31 Test Files passed / 137 Tests passed**, `npm run build` **success**.
- This report only adds documentation; require final PR-head and post-merge CI verification. Real Android/mobile and manual in-browser UI QA **not** performed.

## Release restrictions
- There is no change to `PROJECT_SPEC.md`, official 39 score data, Haki Weight 0.5, `Balanced 1.2`, 36-character default Ranking, 15 Matchups or UI behavior except existing Evidence/Readiness content.
- Proposed Base shifts are **candidate data only**; not approved Haki exceptional Raw amounts. Do not merge numeric candidates into Evaluations without separate comparison and explicit user authorization.

---

# v0.1.35 Draft — Sakazuki Evidence-first Recalibration Pilot

**2026-10-09 KST**, branch `feature/v0.1.35-evidence-recalibration-pilot`, PR #26, product still v0.1.34.

## Directly verified implementation
- Three Sakazuki historical Battle Context records: Squard misinformation, Meteor Volcano group siege, Ace protection intervention.
- Four Sakazuki owner-linked canon Evidence records (Squard, Meteor Volcano, Ace fatal hit, Jinbe/Luffy pursuit); official anime summaries cross-checked and manga chapters explicitly recorded.
- Evidence IDs added to Attack, Technique, Combat IQ and Versatility without awarding numeric Haki bonuses, inventing pure Speed feats, or double-counting tactical outcomes.
- Evidence directly empty Stat rows **14 → 11**, unset readiness **203 → 196**. Sakazuki **Attack/Defense/Stamina/Technique/Combat IQ/Versatility = E2** and **Speed = E3**. `EvaluationDataVersion='evaluation-0.1.35-evidence-only-draft'`.
- Numeric checks preserve all **39 Evaluations/273 Stat rows**, Sakazuki Final `[97,95,96,86,91,91,91]`, Overall `647/7`, typed Raw total `256`, Balanced v1.2/Weight 0.5 and all other comparison anchors.

## CI and discovered issue
- First run [37869463030](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37869463030) **failed**: shared Evidence stat-role audit detected **103** rows with at least one missing declared stat role against 102 baseline. Caused by new Sakazuki Versatility Evidence referencing an Attack-only note.
- Corrected the schema semantics **instead of relaxing the test**: classified Ace's close-range hit and Jinbe pursuit as `versatility: context`, not an extra direct Raw or Score contribution.
- Verified code after correction at [GitHub Actions run 37869536595](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37869536595): **30 Test Files / 132 Tests passed**, `npm run build` **passed**, PR Pages deployment skipped by workflow design.
- The head after this report has only documentation changes; the latest HEAD CI should be confirmed again before merging.
- Manual Android and full browser interaction were **not** performed. Historical manga panel-by-panel numeric grading of all 273 Stats is **not** claimed.

## Review conclusions
- [Pilot report](docs/HYBRID_HAKI_PILOT_RECALIBRATION_2026-10-09.md) compares six anchor characters and their 14 typed Haki contributions; directly demonstrated exceptional application is **not automatically a proven separate numeric Raw benefit**.
- No official numeric recalibration was performed because Base vs exceptional Raw independently grounded marginal increments are not yet quantifiable at consistent peer anchors.
- Detailed score-invariant shadow migration and all-273-stat ledger from PR #25 remain intact; any proposed numeric changes need a before/after peer-comparison and user approval.

---

# v0.1.35 Draft — Full 39-Evaluation/273-Stat Haki Recalibration Audit (Non-Mutating)

**2026-10-09 (KST)**. Branch `audit/v0.1.35-full-roster-recalibration`, PR #25.

## Change summary
- 273-row [Base/Raw/Final and shadow comparison matrix](docs/HYBRID_RECALIBRATION_273_STAT_AUDIT_2026-10-09.md) across all 39 Evaluation states.
- [Risk-ranked calibration review](docs/HYBRID_RECALIBRATION_DECISION_REPORT_2026-10-09.md), preserving known facts and separating uncertain inference.
- New `src/data/sample/hybridRecalibrationAudit.test.ts` guards no Evidence owner mismatch and no increase from inherited 14 unlinked / 203 unassigned readiness / 102 stat-role-context mismatches, plus Haki duplicate allocations and exact neutral rebasing across 39 Evaluations.
- Official Evaluation numbers, Haki Raw/Weight, Calculation Model, project scope and runtime Matchups **unchanged**. No novel win probabilities.

## CI
- Initial PR code/test commit `1c1892172f80ff7d5d12d52540faf5205c0aa9fb`: [GitHub Actions run 37866967816](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37866967816): **29 Test Files / 129 Tests passed, `npm run build` passed**.
- Later changes are documentation-only; latest head check should still confirm before merging.
- GitHub Actions does not substitute for original manga panel-by-panel adjudication or real-device manual QA.

## Limits
- Structural audit **273/273** performed; this is not a complete 273-panel canon reread and is **not** a re-rated official 39-character leaderboard. Shadow numeric columns are exactly score-invariant.
- Numeric Base/exceptional Raw re-estimation and versioned production dataset migration await explicit evidence-backed candidate table and approval.

---

# v0.1.34 — Approved Hybrid Haki Standard & Nonnumeric Expertise Evidence

**2026-10-09 KST**. Branch: `feature/v0.1.34-hybrid-haki-criteria`.

## Change surface
- `PROJECT_SPEC.md` §5: ratified Hybrid Haki standard with only exceptional, separably demonstrated incremental effects considered for eventual numerical Raw. No usage-count or ownership bonus.
- `HakiProfile.excellenceAssessments?`: backward-compatible optional nonnumeric evidence, direct-application vs strong-inference, inference caveat and era note.
- Mihawk: Ch.779/ONE PIECE.com Ep720 sword-and-Haki coaching evidence and corresponding training context; his Yoru Black Blade supports a **strong inference** of high Armament expertise, NOT confirmed forging process or a numeric Raw bonus.
- Shanks Conqueror's, Katakuri Observation, Garp Armament (inference), Garp **prime** Conqueror's (direct) cautiously documented in profile UI.
- `package.json`, `README.md`, `CHANGELOG.md`, `PROJECT_SPEC.md` align product version v0.1.34. Balanced Calculation Model remains **1.2**, Weight **0.5**, all preexisting Evaluation numerical data unchanged.

## GitHub verification
- PR CI run: https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37810953478
- `npm test`: **28 test files passed / 126 tests passed**.
- `npm run build`: **success**.
- Added cases for optional expertise validation, 4 character profiles with owner-linked Evidence, Mihawk Haki coaching context, no numeric value, and jsdom direct-vs-inferred UI.
- Existing 39 Evaluations / 273 Stat rows, aggregate positive Raw **256**, 15 Matchups and Haki cross-stat audit remained valid.
- Real mobile/device interaction has **not** been manually verified. PR job does **not** deploy Pages. Post-merge main Pages CI requires separate confirmation.

## Next approval gate
- This feature ships the **approved rubric and qualifying nonnumeric evidence**. It does not certify existing typed Raw against the new rubric. Concrete 39 Evaluation score changes, new exceptional Raw magnitudes, a new calculation model version or further PROJECT_SPEC policy modification require side-by-side impact audit and owner sign-off.

---

# v0.1.34 Draft PR #22 — Haki Audit / Matchups / Special Tooltip Verification

**Status: feature branch only; NOT merged into main; NOT deployed in Pages by this PR.**
Baseline main: `7d7971c`; draft PR: https://github.com/pchjesus/onepiece-saikyo-analysis/pull/22

## Work actually implemented
- Read-only Haki allocation audit gate flags 15 same-Evidence cross-stat reuse cases and 2 same-stat multi-Haki-type stacks. Flags are not confirmed score errors or permission to change Raw values.
- Four new Canon/context Matchup analyses: Sakazuki–Kuzan, current Rayleigh–Borsalino, Kaido–Linlin, Jozu–Kuzan. The existing 11 -> 15.
- Special Combat `?` help closes on outside `pointerdown` and Escape; inside click retains popup; Escape returns focus to summary. Tested with jsdom/React act.
- No existing Evaluations, Stats, Raw amounts, Weight, Characters, Memberships, Evidence, Battle records or model configuration changed.

## Actual CI verification (2026-10-09 KST)
- GitHub Actions run https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37805412094 on commit `6a46a4ca3acda8bbf8103faa3f8bd13518377177`.
- `npm test`: **26 test files passed / 121 tests passed**.
- `npm run build`: **passed**.
- Pages steps: **skipped on PR, as expected**.
- Existing character identity, state selection, Haki/Evidence referential validation, Group/Membership selection and matchup builder tests remained in the suite.

## Intermediate failures resolved before successful CI
1. Initial matchup addition broke stale fixed-11 assumption in `getMatchupHub.test.ts`. Updated expected count to 15; no production roster compromise.
2. First light source-text count omitted multiline Haki contributions. The new executable audit established **51 positive Stat rows, 53 individual Haki Contribution records, total Raw 256 and 15 multi-stat reused Evidence cases**. Audit docs and tests were corrected. No model scores changed.

## Manual verification boundary
- Real mobile touchscreen interaction / outside touch, keyboard UX on actual browser, positioning/collision and focus behavior beyond jsdom are **not** independently verified.
- This PR must not be merged without the owner's approval. Any Haki model or calibration change requires separate approval after per-character impacts.

---

# v0.1.33 — Legendary Era Expansion Verification

> v0.1.33 main merge source: PR #21 · merge commit `ac06c3e8e935f0b86b7e916b79579811e0bd7461`. 이 문서 커밋은 main push CI/Pages를 명시적으로 재트리거하기 위한 비기능 변경이다.

## Scope
- 7 new Characters / 9 numeric Evaluations.
- Current Garp / Big Mom / Prime Rayleigh / Current Gaban cross-calibration.
- Canon Battle/Evidence and Haki application links.
- Optional per-stat Evidence readiness.
- Historical Rocks Memberships while preserving Character-unique rankings.
- Historical affiliation label in UI.

## Automated verification
- Initial PR run failed **1 stale test only**: the legacy three-crew fixture required each initial crew to contain exactly 3 Characters.
- That assumption became invalid when Newgate, Kaido and Linlin were added to their representative crews.
- The fixture was changed to preserve the original baseline (>=3) and explicitly verify the three expanded crews now contain 4 Characters.
- Final PR run: **25 test files / 116 tests passed**.
- Production `npm run build`: **passed**.
- Balanced 1.2 / Haki Weight 0.5 regression tests passed.

## Key regression checks
- 37 Character master pool.
- 39 Evaluations.
- 41 Membership rows.
- 36 Character-unique evaluated roster and Ranking rows.
- Roger/Newgate tie at 97.571; Prime Garp remains 97.429.
- Current Garp 94.429 / Big Mom 94.286.
- Current Gaban 92.143, below Kuzan/Akainu and tied with Kizaru by Overall.
- Prime Rayleigh 92.857 with E2 readiness.
- No numeric Prime Gaban Evaluation.
- Demonized Rocks is not a numeric Evaluation.
- Newgate/Kaido/Linlin appear in Rocks Group as historical Memberships but remain single Ranking entries.
- Current Gaban Armament stays unclear; Observation/Conqueror capability and actual Raw Application remain separated.

## Manual visual verification boundary
- Automated UI tests cover readiness badges, historical Membership labels, state switching and ranking counts.
- Real-device pixel/touch verification is still a separate manual check.

---

# v0.1.32 — Multi-Membership / Unique Ranking Verification

## Scope
- Character에 서로 다른 Group Membership을 복수 허용.
- Group navigation은 Membership-expanded 유지.
- Ranking / Matchup roster는 Character-unique projection 사용.
- 미호크·크로커다일의 former Seven Warlords Membership 추가.
- 검색 suggestion은 Character identity 기준 중복 제거.

## Regression targets
- sample Membership 31행이 모두 referentially valid.
- evaluated roster / 모든 Core Stat Ranking / Overall Ranking은 계속 29 unique Character.
- 미호크·크로커다일은 Cross Guild와 Seven Warlords 양쪽 Group에서 탐색 가능.
- Ranking / Matchup에서는 각각 1회만 표시.
- 대표 Group은 두 Character 모두 Cross Guild 유지.
- Buggy E3 master-pool-only 정책 유지.
- Balanced 1.2 / Haki Weight 0.5 / Evaluation score 변경 없음.

## Automated verification
- PR #19 CI: **24 test files / 107 tests passed**.
- `npm run build`: **passed**.
- Membership-expanded 31행과 Character-unique 29명 로스터를 동시에 검증한다.
- 미호크/크로커다일의 다중 Group 노출, 검색 중복 제거, Ranking/Matchup 중복 제거가 자동 테스트에 포함된다.

## Manual verification
- 공개 Pages에서 칠무해 탭에 미호크·크로커다일이 추가 표시되는지 확인.
- 크로스 길드 탭에도 기존 두 Character가 유지되는지 확인.
- 랭킹에서 중복 행이 생기지 않는지 확인.
- 실기기 픽셀/터치 검증은 별도.

---

# v0.1.25 Draft — Overall Ranking / Character Search / Evidence-Haki Audit (2026-10-08)

## Scope & Integrity
- 작업 브랜치: `feature/overall-ranking-evidence-review`. `main` 기준 `6e90eed20de88b3c9590b542415e5e95ddd59d38`의 사후 분기.
- UI: Overall 24인 정렬, 양방향 정렬, 검색 제안 목록, 특수요소 작은 `?` 말풍선.
- 데이터: Battle 12개, Evidence 22건, 24명 Haki 상태/적용, 5명 재평가, 5명 Base/Haki 원인 분리.
- **Calc model:** Balanced 1.2/Weight 0.5/7축 평균/패기 상한 변경 없음.
- `src/data/sample/hakiAudit.test.ts`: 전체 로스터의 Haki Capability 확인 상태, Contribution·Evidence 소유권 및 계산 모델 검증.
- `src/data/sample/reviewEvidence.test.ts`: 신설 Evidence의 고유성·출처·전투 연결, 24인 값·테스트 고정점, Timeline/Trace 추적성.
- 자동화 테스트는 원작 내용의 독립적인 사실 검증을 의미하지 않음. 원작 원문 97건 전수 직접 재독 및 PC·모바일 수동 UI 검수는 미완료.

## CI trail
1. UI commit `cdde88106b225a53970a0a7fac9dc925ff2a1be0` — Actions [#37734056576](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37734056576): 67 tests, production build PASS.
2. Evidence introduction `6305e1f74c4ae851a93fd02ade90febb52886a89` — Actions [#37734584201](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37734584201): **1 test FAIL**. 원인: Battle chronologyOrder 2.5 (must be positive integer).
3. Targeted chronology correction `a836360c9433a7e0bcd38da2b820f4f5d2174b9d` — Actions [#37734651661](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37734651661): PASS.
4. Calibration & Haki audit `f918aaa0d5109749968248997d2a91f3cf624020` — Actions [#37735162184](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37735162184): **18/18 test files, 73/73 tests PASS, `npm run build` PASS**.
5. Last documentation-only commit: final GitHub Actions run to be checked after push.

## Verification boundary & acceptance
- `main` 보호: PR #9 Draft. 未병합. 기존 main commit은 변경하지 않음.
- 24인의 모든 Evidence/Stat 데이터 관계 및 계산을 자동 검증했으나 개별 만화 원문을 97건 모두 재독한 것으로 과장하지 않음.
- 신규 수치는 본 프로젝트 `draft` 점수이며 유저가 다음 단계에서 승인 후 merge.
- 실제 Chrome/Edge, 모바일 화면, 검색/말풍선 위치/스크롤/키보드 포커스는 추가 수동 검수 대상.

---

# Unreleased UI / Navigation Regression — 2026-10-08

## Change scope
- Group/Membership 기반 상세 조회로 24인 roster의 레거시 Crew 참조 불일치 수정.
- 평가 버전 문구를 고정 v0.1.22가 아닌 실제 evaluationDataVersion으로 표시.
- 7개 Final Core Stat 순위 팝업(공동 순위), 캐릭터 이동, 개별 계산식 표시.
- 상단 두 영역 반응형 배치 + 하단 Evaluation/Battle 탭과 내부 스크롤.
- 기존 Evaluation 데이터, 패기 가중치 0.5, Balanced 1.2 및 24인 Overall은 변경하지 않음.

## Regression and automated verification
- Baseline branch SHA: `4cf62c67fd57193fe658ae115b424c6788b9f85b`.
- Implementation commit: `249a0489f827539fd5fefbcc5c4aa49ee6bb6f89`.
- GitHub Actions: [run 37730345673](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37730345673).
- `npm install`: PASS.
- `npm test`: PASS — 16 test files / 62 tests (기존 54 + 신규 8).
- `npm run build`: PASS — `tsc -b && vite build`.
- Pages configure/upload/deploy: SKIPPED (private 개발 정책 유지).
- 새 테스트: 24인 전체 상세 조회·소속 일치·불일치 방어(3), 7개 스탯 전체 정렬·승인 Final 수치 확인(2), jsdom에서 신규 집단 전환·순위 팝업 캐릭터 이동·계산식 및 상세 탭 전환(3).
- 기존 24인 calibrated Overall 테스트와 Calculation/Haki, Battle, Evidence, Membership 관련 회귀 테스트 통과.

## What this does **not** verify
- 실제 Chrome/Edge/Safari 브라우저 및 휴대폰에서의 수동 화면·조작 검증: **NOT RUN**.
- 반응형 너비별 실제 렌더링, 가로·세로 스크롤, 모달 포커스 이동, 모바일 터치 사용성은 추가 확인 필요.
- jsdom 상호작용 테스트는 실제 브라우저 픽셀 렌더링 검증과 동일하지 않음.

## PR state
- PR #8은 Draft / open 상태로 유지. **main에 merge하지 않음.**
- 점수·Evidence·Evaluation/Calculation 데이터 변경 없음.
- Node 런타임 및 GitHub Actions 의존성의 deprecation warning이 로그에 있으나 이번 run의 테스트와 빌드는 PASS.

---

# v0.1.23 Initial Three-Crew Baseline — Verification Report

## Scope
- 초기 3해적단 9인 평가 로스터 완성.
- Marco / King / Katakuri 7-Core 횡단 재보정.
- Jozu / Vista / Queen / Jack / Smoothie / Cracker 신규 Character / Profile / Battle / Evidence / Evaluation 추가.
- Balanced 1.2와 Haki Weight 0.5는 변경하지 않음.
- crew tabs + compact character chips UI와 Haki stat breakdown UI를 현재 main 기준으로 유지.
- 9인 데이터 무결성 통합 테스트 추가.

## Expected calibrated Overall
- Katakuri: 81.2857142857
- Marco: 81.1428571429
- King: 80.7142857143
- Vista: 79.1428571429
- Queen: 78.7142857143
- Jozu: 77.2857142857
- Smoothie: 76.7142857143
- Jack: 74.4285714286
- Cracker: 71.8571428571

소수점 근소 차이는 절대적 서열 확정으로 해석하지 않는다. 직책·현상금·커뮤니티 평가는 공식 Core Stat에 자동 가산하지 않는다.

## Regression targets
- 각 Evaluation은 정확히 7 Core Stat을 가져야 함.
- Haki Contribution Evidence는 존재하고 같은 캐릭터 소유이며 해당 Stat evidenceIds에도 연결되어야 함.
- Special Trait Evidence는 존재하고 같은 캐릭터 소유여야 함.
- 모든 Evidence는 존재하는 Character와 Battle에 연결되어야 함.
- 초기 3개 Crew에 정확히 3명씩 배치되어야 함.
- Balanced 1.2의 7-stat mean / Haki Weight 0.5 / Final cap 동작은 유지되어야 함.
- 기존 Marco / King / Katakuri Battle / Evidence / Evaluation Trace 회귀가 없어야 함.

## Automated verification
### Initial main integration
- GitHub Actions run `37684997352`, commit `8d67bf6c`.
- `npm test`: FAIL — 12 test files 중 9 passed / 3 failed, 47 tests 중 40 passed / 7 failed.
- 실패는 Battle / Evidence 배열 확장 경계에서 기존 trailing comma 뒤에 쉼표가 한 번 더 들어가 `},,` 배열 hole이 생성된 것이 공통 원인.
- 그 결과 `sampleBattles` / `sampleEvidence` 순회 중 `undefined`가 발생해 Battle validation, Character profile validation, 신규 data integrity test가 연쇄 실패.
- 계산모델·점수 산식·Haki 로직 실패는 확인되지 않음.

### Fix and final run
- Battle array hole fix: `4ff87d07`.
- Evidence array hole fix: `e6f6aa9c`.
- GitHub Actions run `37685110697`.
- `npm test`: PASS — 12 test files / 47 tests.
- `npm run build`: PASS.
- Pages deploy: SKIPPED — private development 정책대로 main push는 validation only.
- Browser/mobile visual verification: NOT RUN.

## Manual Verification Required
1. 모바일/PC에서 crew tabs + character chips 동작 확인.
2. 각 crew 탭에 3명씩 표시되는지 확인.
3. Haki 반영 스탯에서 Final 점수 아래 Base + Haki가 표시되는지 확인.
4. Jozu / Vista / Queen / Jack / Smoothie / Cracker 상세 페이지의 Profile / Battle / Evidence / Evaluation Trace 확인.
5. 긴 rationale와 Evidence 카드가 모바일에서 overflow 없이 표시되는지 확인.

## Known Issues / Uncertainty
- 모든 평가는 draft.
- Vista의 Stamina, Smoothie의 Defense/Stamina/Speed 등은 직접 전투 표본이 적어 불확실성이 상대적으로 큼.
- Jack Haki는 보조자료 표기 충돌 가능성을 고려해 현재 Profile에서 unclear로 유지하고 수치 가산하지 않음.
- 이미지 기반 캐릭터 선택과 검색 기능은 로스터 확장 시 후속 검토.

---

# v0.1.22 Seven Core Stats & Special Combat Profile — Verification Report

## Scope
- 숫자형 Special Ability를 Core Stat에서 제거.
- 7 Core Stat 기반 Balanced 1.2 도입.
- Haki Weight 0.5 및 실제 Application Evidence 기반 Contribution 유지.
- 비수치 Special Combat Profile과 다중 Special Trait 구조 추가.
- Special Trait Evidence 참조 무결성 검증 추가.
- Marco / King / Katakuri 기존 Special 관련 Canon Evidence 보존 및 Evaluation 0.1.22 마이그레이션.
- Character Detail에서 Core Stat과 Special Combat Profile을 분리 표시.

## Expected mechanical Overall after model migration
- Marco: 80.5714285714
- King: 80.2857142857
- Katakuri: 81.7142857143

이 값은 기존 7 Core Stat 값을 그대로 사용한 구조 전환 직후의 기계적 재계산이며, 캐릭터별 전면 재평가 완료값이 아니다.

## Regression targets
- Evaluation은 정확히 7 Core Stat을 가져야 함.
- Special Combat Profile은 Overall에 직접 합산되지 않아야 함.
- Special Trait Evidence는 존재하며 해당 캐릭터 소유여야 함.
- Haki Raw Contribution / Weight 0.5 / Effective Contribution / Final Stat 계산은 유지되어야 함.
- 기존 Battle / Evidence / Evaluation Trace 연결은 유지되어야 함.
- Marco / King / Katakuri의 Special 관련 Canon Evidence 자체는 삭제되지 않아야 함.
- main push에서는 Pages configure/deploy가 실행되지 않아야 함.

## Automated verification

### First main run
- GitHub Actions run #7, commit `afa5078e`.
- `npm install`: PASS.
- `npm test`: FAIL — 11 test files 중 10 passed / 1 failed, 43 tests 중 42 passed / 1 failed.
- Failure: `statDefinitions.test.ts`가 Versatility 정의에 남은 과거 `Special Ability` 문구를 탐지.
- Root cause: 모델/계산 실패가 아니라 Stat Definition 문자열 한 곳의 stale migration.
- `npm run build`: test failure로 SKIPPED.

### Fix and final run
- Fix commit: `268ea74f` — stale `Special Ability` reference를 `Special Combat Profile` 기준으로 수정.
- GitHub Actions run #8.
- `npm install`: PASS.
- `npm test`: PASS — 11 test files / 43 tests.
- `npm run build`: PASS.
- `actions/configure-pages`: SKIPPED.
- Pages artifact upload / deploy: SKIPPED.
- Browser/mobile visual verification: NOT RUN.

## Verification conclusion
v0.1.22의 7 Core Stat 구조, Balanced 1.2 계산, Haki 가중치 회귀, Special Combat Profile 데이터 및 Evidence ownership validation, 기존 Battle/Evidence/Application 연결과 production build가 자동 검증을 통과했다. Special은 더 이상 숫자형 Core Stat이 아니며, 비능력자에게 Special 부재를 이유로 수치 감점을 부여하지 않는다.

## Manual Verification Required
1. 브라우저에서 Marco / King / Katakuri 상세 페이지 확인.
2. Core Combat Stats가 7개만 표시되는지 확인.
3. Special Combat Profile이 별도 카드로 표시되고 Overall 직접 가산 없음 문구가 보이는지 확인.
4. Haki Base / Raw / Weight / Effective / Final 표시 회귀 확인.
5. 모바일에서 Combat Profile / Special Trait / Stat 레이아웃 확인.

## Next Steps
- 기존 및 논의 중인 Marco / King / Katakuri / Queen / Jack / Cracker / Jozu / Vista를 7 Core Stat 기준으로 전체 재산정.
- 재산정 과정에서 Marco·King·Queen 등 기존 Special 점수에 포함되던 효과가 각 Core Stat에 충분히 반영됐는지 횡단 검토.
- 전체 calibration 완료 후 신규 캐릭터 분석·추가 재개.

---

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

## v0.1.32 Verification Report

### Scope
- Character ↔ Group multi-Membership support.
- Membership-expanded Group navigation.
- Character-unique Ranking / Matchup roster.
- Search suggestion deduplication.
- Former Seven Warlords Memberships for 쥬라큘 미호크 / 크로커다일.

### Structural checks
- Navigation rows: 31 Membership entries.
- Unique evaluated roster: 29 Characters.
- Ranking: 29 unique Character IDs.
- Matchup selector: 29 unique Character IDs.
- Representative Group for 미호크 / 크로커다일 remains 크로스 길드.
- Both Characters also resolve correctly inside 왕의 부하 칠무해 context.
- Exact duplicate Membership validation remains enabled.

### Automated verification
- PR #19 intermediate passing head: **24 test files / 107 tests passed**.
- `npm run build`: **passed**.
- Initial CI found two stale single-Membership assumptions:
  1. a Character detail test expected the Membership-expanded list itself to remain 29 rows;
  2. the first unique-roster implementation changed one pre-existing navigation order because it followed Character source order instead of Membership first-occurrence order.
- Fix: tests now distinguish expanded vs unique views, and the representative roster preserves existing Membership navigation order.
- No Evaluation score, Balanced 1.2 or Haki Weight change.

### Manual browser checks
- 왕의 부하 칠무해 tab shows 트라팔가 로 / 돈키호테 도플라밍고 / 보아 핸콕 plus former members 쥬라큘 미호크 / 크로커다일.
- 크로스 길드 tab still shows 쥬라큘 미호크 / 크로커다일 only.
- Searching 쥬라큘 미호크 by name yields one suggestion using 크로스 길드 as representative Group.
- Ranking shows each Character once.


## v0.1.31 Verification Plan / Result

### Scope
- Doflamingo official epithet order: 천야차 → 조커.
- Two-character Matchup Builder with left/right independent selection.
- Multi-Evaluation state selection.
- SWAP / RANDOM / FEATURED controls.
- Per-corner perspective panels and combined Radar / Tale of the Tape / Evidence factors.
- Arbitrary pair support without fabricated matchup conclusions.

### Required checks
- Evaluated roster remains 29 selectable Characters.
- Same Character cannot be selected on both sides from the UI and application guard rejects self-matchup.
- Current Garp vs Kuzan uses current Garp only; Prime Garp does not inherit the current-only pair Evidence.
- Reversing left/right correctly flips character-a / character-b factor perspective.
- Arbitrary unregistered pairs show Core Stat comparison but no pair-specific conclusion.
- Existing 11 featured Matchup prototypes remain intact.
- Stats remains the default app home.
- Balanced 1.2 / Haki Weight 0.5 / no win-probability policy remain unchanged.

### Automated verification
- PR #15 CI: **24 test files / 103 tests passed**.
- `npm run build`: **passed**.
- Initial CI failure came from an over-specific test assumption that Mihawk vs Shanks must include a favorable/risk factor; the pair is intentionally neutral/unknown-heavy. The perspective inversion test was moved to the confirmed Crocodile vs Jozu damage factor, then the full suite passed.

### Manual visual checks
- Left/right selectors remain readable on narrow phones.
- SWAP/RANDOM controls are reachable without horizontal overflow.
- Corner panels collapse cleanly to one column on mobile.
- Combined Radar labels and Tale of the Tape remain legible.


## v0.1.30 Verification Plan / Result

### Scope
- Prime/current Garp recalibration.
- Kuzan defense/endurance recalibration with post-Blue-Hole return Evidence.
- Crocodile direct-combat down-calibration.
- Stats-first top-level navigation and separate Matchup Arena.
- Radar chart / Tale of the Tape / Evidence-aware factor presentation.

### Required regression checks
- 29 evaluated characters / 30 Evaluation records remain referentially valid.
- Default ranking still uses Prime Garp once; current Garp remains state-selectable only.
- Current Garp vs Kuzan Matchup uses current Garp evaluation in the Arena.
- Character Detail contains only Evaluation / Battle-Evidence tabs.
- App opens on Stats by default; Matchup Arena is reached through the top-level VS control.
- Radar values are derived from Evaluation + Balanced 1.2 rather than hardcoded UI scores.
- Community discussion UI is not rendered yet.
- Balanced 1.2 / Haki Weight 0.5 / Special non-numeric policy remain unchanged.

### Automated verification
- PR #14 CI: **24 test files / 99 tests passed**.
- `npm run build`: **passed** (Vite production build completed).
- First CI attempt failed on a duplicated closing bracket introduced while replacing the final Evaluation block; the syntax error was isolated, fixed, and the complete suite then passed.
- Matchup Arena application test confirms 11 matchup entries and state-aware current Garp vs Kuzan scoring.

### Manual visual checks
- Desktop and mobile spacing of the top-level Stats / Matchup navigation.
- Radar labels do not clip at common phone widths.
- Fighter cards and Tale of the Tape remain readable for long Korean names.
- Matchup picker horizontal scrolling remains usable on mobile.


## v0.1.29 Verification Report

### Scope
- Cross Guild: 쥬라큘 미호크 / 크로커다일 평가 추가, 버기 E3 Character-only.
- Prime Garp Ch.1165 Haki Application 재보정.
- Evidence-aware Matchup을 Character Detail UI에 노출하고 총 11 prototype으로 확대.

### Structural expectations
- 30 Character master pool / 29 evaluated roster / 30 Evaluation.
- Ranking은 Membership + default Evaluation 기준으로 29명만 포함.
- 버기는 Membership / Evaluation 없음.
- Matchup은 승률·고정 수치 없음.
- Garp current-vs-Kuzan matchup은 current state에서만 표시.

### Automated verification
- PR #13 GitHub Actions: **23 test files / 97 tests passed**.
- `npm run build`: **passed** (Vite production build completed).
- 첫 CI 실패는 27→29 로스터 확장 후 남아 있던 테스트 기대값 3곳의 불일치였고, 해당 fixture/index를 수정한 뒤 전체 CI가 통과했다.

### Manual verification required
- 크로스 길드 탭에서 쥬라큘 미호크 / 크로커다일 전환.
- 세 번째 '매치업 분석' 탭의 모바일/PC 가독성.
- 가프 전성기에서는 현재-쿠잔 매치업이 숨고, 현재 선택 시 표시되는지 확인.
- 버기가 evaluated roster 검색/순위에 노출되지 않는지 확인.


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
