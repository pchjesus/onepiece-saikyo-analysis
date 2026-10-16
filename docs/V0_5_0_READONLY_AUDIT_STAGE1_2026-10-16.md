# v0.5.0 80인 7축 전수 감사 — Stage 1 (읽기 전용) / 2026-10-16

> **상태: 분석 인프라·자동 보고서 단계. 실제 평가 재산정이나 Canon 원작 컷 전수 검증을 완료했다고 주장하지 않는다.**
> 제품 배포 버전은 계속 **v0.4.12**. 이 문서는 v0.5.0 개발 작업이며 평가 숫자나 UX 변경을 승인한 문서가 아니다.

## 1. 기준·승인 범위

- 작업 시작 원본: `main@4965b6e1e698888d2b363b9b606f835c65661e27` (B+ CI 검증 정책 도입 후).
- 기준 원작 데이터: `src/data/baselines/v0.3.3.json` (독립 역사 스냅샷, **절대 덮어쓰지 않음**).
- 앱/데이터: v0.4.12, **80명 / 84 Evaluation / 588 Core Stat / 105 Membership / 17 매치업(직접 15 + 조건부 2)**.
- 계산: Balanced 1.2, `Final=min(100,Base+0.5×Raw Haki)`, 7축 Final의 단순 평균.
- 사용자 승인: 80명 전체 읽기 전용 감사, 위험군 우선 심층 검토. **모든 평가 수치는 유지**하고 근거·영향 보고 후 재산정 여부를 별도 승인받는다.
- 미승인: 계산 가중치·기준/스케일 변경, Haki 자동 보너스/삭제, E3 감점, 새 매치업 보너스/승률, 카쿠 변경, 에넬 추가, 기존 Evaluation 삭제, 점수/출처 의미의 자동 승격, UI 개편.

## 2. 구현한 감사 도구

- `src/data/integrity/v050ReadOnlyAudit.ts`: 기존 72명/76 Evaluation에 `v0411Characters`, `v0412Evaluations`, 해당 Battle/Evidence/Membership을 명시적으로 결합한다. 이전 `v033Snapshot.liveDataset`가 신규 8명까지 포괄한다고 오해하지 않는다.
- `buildV050ReadOnlyAudit()`: **84개 Evaluation × 7축**의 스냅샷 행을 읽기만 하며, 전체 수·E1/E2/E3·축별 분포·Raw 사용 축·동일 Evidence 다축 Raw 후보·기초 무결성 결과를 계산한다.
- 1행에 Evaluation/Character/시점/상태/스탯/근거 충분도/Base/Raw/Effective/Final/Overall/Evidence ID/출처 유형/스탯 역할/Battle ID/패기 종류/검토 플래그/점수 이유(`rationale`)를 함께 보존한다.
- `v050AuditRowsToCsv()`: **헤더 1행 + 평가 588행**의 UTF-8 CSV를 **입력 수정 없이** 생성한다. 일반 `npm test`는 로컬 파일을 만들지 않는다.
- PR CI에서는 588행 CSV와 집계 JSON을 `v050-readonly-audit` 아티팩트로 제공(7일 보관). 현재 GitHub Actions의 `npm test`와 `npm run build`, Pages 배포 분리는 유지한다.
- 기존 v0.4 참조 무결성 검증과 달리, 이번 도구는 최종 UI 로스터에 실제로 들어간 80명까지 같은 입력에서 감사한다. **기존 역사 스냅샷·계산 함수·UI 자체는 수정하지 않는다.**

### 검토용 자동 플래그 — 오류 확정이나 자동 채점이 아님

| 플래그 | 의미 | 주의 |
| --- | --- | --- |
| `high-e3-provisional` | E3 Final **85 이상** | **85는 검토 대기열 필터**이지 E3 정책·점수 경계가 아님 |
| `no-linked-evidence` | EvaluationItem에 직접 연결된 Evidence ID 없음 | 확인 불가가 약함·오류를 뜻하지 않음 |
| `secondary-or-context-only` | 해당 축에 연결된 Evidence의 stat role이 primary가 아님 | 프로젝트의 보조자료만으로도 타당한 잠정 평가가 가능함 |
| `no-canon-labelled-source` | 연결된 출처가 모두 `supplementary`/그 밖의 비-canon 라벨 | `canon` 라벨이 있어도 만화 패널을 직접 확인했다는 뜻은 아님 |
| `haki-evidence-reused-across-stats` | 같은 Evaluation에서 같은 Evidence ID가 양의 Raw Haki를 2축 이상 뒷받침 | 실제 독립 효과가 둘이라면 재사용 자체는 허용 |
| `multiple-haki-types-on-stat` | 동일 축에 다른 Haki 종류 기여가 함께 존재 | 기제·효과·Base 밖 증가분이 각각 증명되는지 수동 검토 |

`auditCombatDataset` 오류/경고는 별도로 보고한다. Evidence 출처 실제 열람·원작 장면의 정확성·점수의 규범적 타당성은 자동 검사만으로 검증되지 않는다. 예를 들어 빈 `participantIds`는 현재 허용된 맥락용 Battle 형태이며 무조건 오류로 고치지 않는다.

## 3. 우선 심층 감사 후보 (점수 미변경)

### 신규 여덟 명 (v0.4.12)

8개 Evaluation의 56축 모두 잠정 `draft`; 코드상 **E2 40축 / E3 16축 / E1 0축**, Raw Haki 모두 0. 신규 11개의 Battle/Evidence는 ONE PIECE.com 애니메이션 시놉시스 출처 `supplementary`/`moderate`로, 스탯 역할이 모두 `secondary`인 형식이다. 이는 **정식 원작 만화 컷 전수 대조 완료가 아님**.

| 감사순서 | 인물 | 검토 질문 |
| --- | --- | --- |
| P0 | 마하 | 이조의 선행 중상과 팀 임무, 단일 결착에서 전체 7축 추정으로 도약했는가? |
| P0 | 게르니카 | 드레이크 기습 대응·루피 고정 임무와 카이도 피격을 개인 Attack/Defense로 혼합했는가? |
| P0 | 나미 | 제우스/크리마 택트 이용 상태와 빅 맘의 울티 선행 피해를 분리했는가? |
| P0 | 프랑키 | 프랑키 장군 탑승·기체 보호와 본체 방어/체력·라디칼 빔을 구별했는가? |
| P1 | 우솝 | 비올라·칸주로 지원의 초장거리 저격 정밀도와 신체 Speed·대인 Attack을 분리했는가? |
| P1 | 브룩 | 속검과 영혼 능력의 조건부 상성을 일반 승패·기동으로 확대했는가? |
| P1 | 쵸파 | 몬스터 포인트 지속시간·럼블볼 소모·퀸 상대 단발 타격을 분리했는가? |
| P1 | 니코 로빈 | 데모니오 플뢰르 결착과 브룩의 부하 저지, 거대 사지 피격 위험을 분리했는가? |

### 기존 72명 (이전 보고서의 후보, 최신 588축표로 재검토)

| 순서 | 감사 묶음 | 구체적 확인 |
| --- | --- | --- |
| P0 | 샹크스 Technique/IQ/Attack | Ch.1079 미래예지→접근→카무사리: Base와 패왕·견문 Raw 효과가 실제로 독립적인가? |
| P0 | 카타쿠리 Defense/Technique/IQ | 미래예지의 정보 획득, 모치 회피 제어, 전술 선택을 한 사건에서 중복 평가했는가? |
| P0 | 비스타·킹·징베 Haki | 통상 무장색 사용과 `Raw`가 요구하는 예외적·독립적 증가분을 분리했는가? |
| P1 | 전성기 가프·로저·록스·뉴게이트 | 합동전·시점 차이·공방/숙련 다축 Raw가 독립적으로 설명되는가? |
| P1 | 미호크 Speed/Stamina, 로쿠규 Defense/Stamina | 명성/추론과 장기전 표본, 재생과 선제 공격 차단 구별 |
| P1 | 스무디·몰리·카라스·퀸 | E3 고득점·교전 강도·속도·협동 목적 |
| P2 | 대장·기타 7축 비교 | 사카즈키 Speed, 쿠잔 Combat IQ 등 고불확실성 축 재검토 |

**주의:** 위 목록은 `docs/V0_1_59_...`, `docs/V0_1_61_...`, `docs/V0_1_69_...`, `docs/V0_1_73_...`와 최신 코드에 근거한 **감사 질문**이다. 캐릭터가 과대·과소평가되었다는 확정 판정도, 이미 진행된 원작 컷 직접 독립검증도 아니다.

## 4. 점수 판정과 승인 게이트

1. **유지:** 현재 사실·맥락·스탯 설명이 논리적으로 지지되며 오류 근거 없음. 불확실성은 그대로 드러냄.
2. **제한적 재산정 검토:** 누적 피해·제3자 기여·장비·시점·능력 상성·Raw 중복 등의 구체적 불일치가 발견되고 새로운 수치 제안에 필요한 증거까지 확보했을 때만 영향표를 작성.
3. **근거 부족으로 보류:** 평가 확정/변경을 보류. 현재 잠정 점수와 `draft`/E3 상태는 사용자 승인 없이 자동 삭제·하향/승격하지 않음.

개별 변경 후보는 반드시 **Canon Fact → Battle Context → Interpretation → 7축 Base/Raw/Final → Overall → Rank/Matchup 영향**을 제시. 전수 588축을 임의 수치 재산정하지 않는다. `Balanced1.2`의 가중치, CalculationModel 버전, 평가 정책 변경 역시 별도 명시적 승인 없이는 금지.

## 5. 테스트·회귀와 남은 작업

`tests/v050ReadOnlyAudit.test.ts`가 검증:
- 전체 80/84/588/105/17 및 84개 Evaluation 각각의 7축 기록
- 신규 8인 40 E2·16 E3·Raw0, `supplementary/secondary` 표시, 기존 76개 Evaluation 유지
- Base/Raw/Final/Overall 재현성, 80인 Overall+7축 순위
- 동일 Evidence 다축 패기 검토 후보의 정확한 원인 데이터 추적과 구조 오류 구별
- CSV 588행·출처/사유/역할 포함, 연속 생성 결정성
- 구 스냅샷 JSON 파일 바이트 불변 및 통합 데이터 비변경

**남은 작업:** GitHub CI 통과 확인 및 집계 JSON 결과 검토 → 위험군 원작 근거 심층 감사 → 기존 72인과의 동축 비교 → 사용자에게 제한적 재산정 후보/영향 제출. PC/모바일 육안 QA, 실제 원작 만화 컷 직접 전수 확인, 인용문 공식 한국어판 검수는 이 구현 단계의 완료 항목이 아니다.

### 참조 문서

- `PROJECT_SPEC.md`
- `docs/V1_0_DEVELOPMENT_ROADMAP.md`
- `docs/HYBRID_HAKI_CRITERIA_2026-10-09.md`
- `docs/V0_4_12_QUOTES_EIGHT_EVALUATIONS_REVIEW_2026-10-15.md`
- `docs/V0_1_59_E3_AND_HAKI_RAW_CASE_AUDIT_2026-10-10.md`
- `docs/AI_ASSISTED_DEVELOPMENT_BPLUS_v1.0.md`
