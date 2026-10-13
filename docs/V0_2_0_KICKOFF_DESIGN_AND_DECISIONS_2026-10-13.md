# v0.2.0 킥오프 — 전투력 비교·Evidence UX·캐릭터 미디어 제안

> **상태: 설계 착수 / 사용자 UX 결정 대기. 기능 코드·평가 모델·점수 변경 없음.**
>
> 기준선: `main@e6947aee505a286b82dd293cd09ad56ee01feee4` (v0.1.81)  
> 작성: 2026-10-13  
> 상위 기준: PROJECT_SPEC.md (원본 무변경), 기존 `docs/V0_1_54_POST_AXIS_AUDIT_ROADMAP_2026-10-09.md`, `docs/MATCHUP_MODEL_0_1_DRAFT.md`.

## 1. 실제 점검 결과

- 앱: React/TypeScript/Vite 정적 Pages, 상단 `스탯` 및 `매치업` 분리. 종전 70 Character / 69 대표 평가 / 72 Evaluation / 504 7축 Stat / 88 Membership / 직접 Matchup 15 / Balanced 1.2 (HakiWeight 0.5). main push에 CI + Pages 자동 배포.
- 캐릭터 데이터: `src/domain/character/types.ts`의 `Character`에는 image/portrait 필드가 없다. 현재 `CharacterIdentity`는 소속별 컬러·직접 제작한 단순 SVG로 표현한다.
- 평가 UX: `StatList`의 스탯 버튼은 전체 순위로 이동하며, **선택한 동일 스탯의 2~3인 근거 비교**로 이동하지 않는다. `EvaluationTrace`는 7축 사유/패기/출처 코드 표시가 있지만 원작 fact/context와 동일 화면에서 연결된 비교 동선이 짧지 않다. `EvidenceList`와 `BattleTimeline`에는 상세 맥락이 이미 존재한다.
- 대진: `MatchupHome`에는 양측 직접 선택, FEATURED, SWAP, RANDOM, 평가 시점, 수치/레이더/직접 Evidence 요인이 구현되어 있다. 신규 시나리오 숫자 보너스나 자동 승률을 생성해서는 안 된다.
- `src/data/sample/v0180CommanderAttackAudit.ts`: 킹/카타쿠리/퀸/마르코/크래커/스무디의 최대 화력·실제 유효타·지속성·상성 구분이 **질적 4요소 리뷰**로 존재한다. 새 점수 축이 아니다.
- 기술 부채 후보: `v0180LegacyCohort.ts`는 실 저장 스냅샷이 아니라 현행 arrays에서 인물을 제외한 가상 과거 코호트라 향후 기존 캐릭터 점수 변경에 독립적이지 않다. `package.json`은 `0.1.34`, 앱 패치 이력은 `v0.1.81`이며 과거 README/SPEC 내 상태 설명은 오래됐다. `npm install`/패키지 latest 사용은 빌드 재현성 검토 후보. 이는 즉시 일괄 리팩터링 사유가 아니다.

## 2. 권장 릴리즈 목표

**v0.2.0: Evidence-linked Side-by-side Stat Analysis & Readability**

본 버전에서 동축(예: Attack) 2명 교차 비교, 각 캐릭터의 Final·Base/Haki·E1/E2/E3·근거 fact/context/interpretation·Evidence link를 한 화면에서 읽는 흐름을 완성한다. 기존 Stats/Matchup 두 개의 최상위 메뉴와 7축/계산 모델/15 direct Matchups를 그대로 보존한다. 원작 근거가 부족한 점수는 E3로 명시할 뿐 자동 감점하지 않는다.

### 작업 묶음

| 작업 | 의도 | 권장 상태 | 검증 게이트 |
|---|---|---|---|
| A. 동일 스탯 비교(2명 시작, 3명 확장 후보) | 동일 축 숫자 + 준비도 + 근거 맥락을 나란히 | 핵심 | 사용자 선택/시점/근거 링크 불변 |
| B. 근거 연결 UX | `EvaluationTrace`와 `EvidenceList` 사이 탐색을 명확히, Canon Fact→조건→추론→점수 구분 | 핵심 | source ID/role/readiness 일관성 |
| C. 6인 Attack 감사 UI 재사용 | 기존 4요소를 비교 화면에서 읽되 점수 모델에 합산하지 않음 | 핵심 | 모든 6개 기존 Final Attack 불변 |
| D. 캐릭터 초상 이미지 기반 | 미디어 manifest 및 컴포넌트·fallback; 실제 이미지는 사용 권한 검토 후 | 사용자 선택 | 캐릭터별 대응 정확성, 없는 이미지/오류/모바일/alt |
| E. UX 개선 꾸러미 | 시각적 위계, 긴 설명 접기/펼치기, 명확한 오류/빈 결과, 포커스/키보드/모바일 | 핵심 범위 안 | 기존 화면과 스탯·대진 UX 회귀 |
| F. 스냅샷·릴리즈 정합성 | 수정 전/후 report, 고정 5 앵커/Raw/15대진 보존, 모델 버전 일치 | 핵심 | 동일 입력/이전 평가 재현, CI |
| G. 고E3/Raw 사례 재검수 | 속도·지구력·전투IQ 고점 근거 부족 후보를 '유지/보류/수치 재판정 제안' 분류 | 조사(읽기 전용) | 근거/출처/조건 확인, 수치 변경은 별도 승인 |

## 3. 사용자 결정 필요 (아직 미확정)

1. **비교 UI 진입**  
   A(추천): 기존 스탯 화면에서 스탯을 선택해 **동축 비교 모달/패널** → 초점 유지, Matchup 아레나와 개념 중복 방지.  
   B: 새로운 **전투력 비교** 상단 탭 → 확장 유리하지만 네비게이션 복잡도 상승.  
   C: **Matchup Arena 안으로 통합** → 데이터 비교와 승부 맥락이 섞일 위험.
2. **비교 규모**  
   A(추천): **2명 + 평가 시점** 먼저, 자료 충분해지면 3인 비교; 중복 구현 최소화.  
   B: 3명 동시 비교를 처음부터 → 데스크톱 장점, 모바일 가로·표 가독성 비용.
3. **초상 이미지 시각 위치**  
   A(추천): **캐릭터 상세 헤더 중형 portrait + 전체 검색 결과의 작은 썸네일**, Matchup은 공간 확인 후 소형 적용.  
   B: 프로필만 큼직하게 → 가장 안전하지만 탐색 시 체감 제한.  
   C: 상세+검색+그룹 목록+매치업 곳곳에 처음부터 → 고밀도 모바일·성능 위험.
4. **이미지 이용 권한 및 자산 공급**  
   A(추천): 미디어 manifest·안전한 자리표시자 먼저 개발하고 **사용 권한을 확인한 이미지**만 채택.  
   B: 사용자가 사용 권한을 확보한 캐릭터 이미지 패키지를 제공 → 즉시 파일 매핑 가능.  
   C: 공식 사이트 프로필 **외부 링크만** 제공, 앱 안의 이미지는 아직 없음 → 최소 권리 리스크.  
   D(비권장): 공식/팬 위키 이미지를 무단 일괄 다운로드·재게시하거나 출처만 적어 허용으로 간주.
5. **점수 수정 정책**  
   A(추천): v0.2.0에서는 현행 Final/Raw/Overall 그대로 유지, 감사 결과로 조정 후보만 제시; 별도 승인 후 후속 릴리즈.  
   B: 분석·점수 변경을 v0.2.0에 같이 반영하되 승인된 단일 후보만, 회귀·순위 영향 전수 검증 필수.

## 4. 캐릭터 이미지 구현 설계 (사용 권한 확인을 전제)

현재 Character 평가 스키마에 이미지 URL을 하드코딩하지 않는다. 별도 UI 자산 원천 `src/data/media/characterPortraits.ts`를 characterId 키로 매핑하는 방식을 **후보**로 한다. 항목은 `portraitPath`, `thumbnailPath`, `alt`, `sourceUrl`, `licenseOrPermission`, `stateLabel?` 등을 가지며 존재하지 않는 id는 group-accent 기반 기존 그래픽으로 fallback. 원본은 권한이 확보된 경우에만 `public/images/characters/<id>.webp`에 넣고 `loading="lazy"`·width/height·aspect-ratio·object-fit/contain·오류 fallback·모바일 크기 제한·alt 텍스트를 적용한다.

본 저장소는 공개 GitHub Pages이다. ONE PIECE.com 이용약관 6·7조는 공식 사이트의 콘텐츠 권리와 허락되지 않은 복제·배포를 제한한다. 공식 사이트에 공개된 이미지라도 **프로필에 올라왔다는 이유만으로 재배포할 사용권이 확인되는 것이 아니다.** 핫링크도 자동 허용이라고 단정할 수 없으며 서비스 안정성·캐시·상업성에 관한 문제가 남는다. 이미지를 허가 없이 수집하는 자동화는 보류. 우선 검토: https://one-piece.com/agreement/index.html · https://one-piece.com/character/marco/index.html .

피해야 할 시각 오류: 다른 시기의 캐릭터 이미지가 현행 평가 시점을 증명하는 것처럼 쓰임, 동일 인물이 중복 그룹에 이미지 중복 저장됨, 이미지 없는 캐릭터가 검색 결과에서 제외됨, 캐릭터 에셋이 계산 모델의 source of truth가 됨.

## 5. 개발 흐름 및 릴리즈 정책

1. **현재 단계: 기준선 확인 / 옵션 제시 / 브랜치·킥오프 문서만 준비.** 중요한 UX 선택이 정해지기 전에는 구현하지 않음.
2. 선택 후 `feat/v0.2.0-analysis-kickoff` 작업 브랜치에서 모듈별 작은 커밋과 직접 영향 테스트 수행. 중간 커밋을 `main`에 쪼개어 병합하지 않음.
3. 비교 모델 read-only selector → 상세 근거 연결 → 지원하는 6인 감사 UX → 이미지 안전한 fallback → 모바일/접근성 → 전체 회귀 순서로 구현.
4. 권한 확인 전 이미지 자산 파일은 넣지 않는다. 점수·Raw/계산/상태 구조의 수정은 별도 영향평가 + 사용자 승인.
5. 완료 조건: 기능의 비교·링크·시점 동작, 70/72/504/88 기존 값 보존, 5 앵커·Haki Raw·15매치업 재현, npm test/build, 모바일·PC 수동 점검 범위 명시, PR CI 후 단일 `main` 병합 및 동일 SHA Pages 배포 확인.
6. 수시의 작은 UX/버그는 개발 브랜치에 **함께 모으고**, 치명적 장애·데이터 오염만 안정판 hotfix. README/CHANGELOG/TEST_REPORT와 패치 내역은 릴리즈 단위로 통합.

## 6. 범위 외

- 의미 없는 추가 전투력 보너스, E3 자동 감점, 공식 승률 표시, 미검증 시나리오 가중치.
- 70명 전체 캐릭터의 무단 이미지 수집, 새 백엔드/계정/DB, 대규모 리팩터링, 프로젝트 SPEC 임의 변경.
- 현 로드맵의 관리자 CRUD·커뮤니티 기능은 추후 사용자 필요와 별도 결정.

본 문서는 사용자 결정 전의 설계안이며 기능 구현 완료 또는 이미지 이용 허락을 의미하지 않는다.
