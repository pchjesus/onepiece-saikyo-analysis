# 예외적 Haki Raw — 독립 효과 심사 카드 v1.0 (문서 양식)

> **작성일:** 2026-10-21 · **성격:** 심사 보조 문서/재사용 템플릿(코드 구현 및 새 평가 정책 아님)  
> **작성 기준:** main `3b6673cd3d3e1c7066ad2b447dede6995cd7dcee`, app/core `v0.4.33`, 평가세트 `evaluation-set-v0.4.33`, Balanced **1.2**, HakiWeight **0.5**.  
> **우선 규범:** `PROJECT_SPEC.md` §4–5 및 `docs/HYBRID_HAKI_CRITERIA_2026-10-09.md`가 승인된 원칙이다. **이 양식은 그 규범을 대체·확장·변경하지 않는다.**  
> **금지:** 이 카드 작성·체크만으로 Raw, Base, Final, Readiness, 모델, Matchup 또는 공식 Evaluation 상태를 수정·승격하지 않는다.

## 1. 사용 범위와 기본 결정 순서

- **단위:** 한 캐릭터의 **특정 Evaluation/시점 × 한 Haki 종류·응용 × 한 Core Stat의 예외 Raw 후보**마다 카드 1개. 여러 Stat이 같은 Evidence를 쓰면 **카드별 서로 다른 성과**를 기재하고 아래 '공유 근거 교차표'에서 서로 연결한다.
- **순서:** **Canon Fact → Battle Context → Haki capability/excellence → 실제 관측 효과 → Base와의 관계 → 다른 Stat·Raw와의 관계 → 예외적 *추가* 효과 → 정량 앵커 → 검토 판정 → 변경 영향/승인**.
- **분리:** 보유 `confirmed` ≠ 뛰어난 응용 `direct-application/strong-inference` ≠ 특정 스탯의 독립 예외 Raw 승인. **직접 고급 능력을 사용했다는 사실만으로 +N은 나오지 않는다.**
- **증거 등급:** 원작 만화 페이지/컷 **직접 검증**, 저장소의 `canon` 회차 인덱스·요약, ONE PIECE.com 공식 애니메이션/인물 자료 **보조 교차**, 커뮤니티·비공식 보조를 반드시 구분. 원본 컷을 직접 읽지 않았다면 '직접 검증'으로 표시 금지.
- **복수축:** 한 장면에서 서로 다른 기능을 합리적으로 평가할 수 있다. 그러나 **같은 성공 결과의 Raw를 두 번 계상하는 것**과는 별개다. 같은 Evidence ID는 **검토 신호이지 중복 오류 확정이 아니다**.
- **불확실할 때:** 새 예외 Raw는 제안/승격 **보류**, 기존 legacy Raw는 사용자 승인이 있는 버전 마이그레이션 전까지 **현재값 유지+미재인증 표시**. 보류는 **Raw=0이 확정**되었다는 뜻이 아니다.

## 2. 복사해서 사용하는 심사 카드

다음 블록을 대상 Evaluation의 검토 문서에 **카드 하나당 한 번씩 복제**한다. 값이 없으면 임의로 채우지 말고 `미확인`으로 표시한다.

### [카드 ID: <캐릭터>-<평가시점>-<패기>-<축>-<회차/근거>]

**A. 범위·현재값 (데이터에서 복사)**

| 필드 | 기입 |
|---|---|
| Character ID / Evaluation ID / `evaluationDataVersion` | `<기입>` / `<기입>` / `<기입>` |
| 시점·상태·전투 상대·환경 | `<전성기/현재/기타>`; `<상대·부상/피로/지원/임무/장비·지형>` |
| Haki 종류·응용 | `armament / observation / conquerors`; `<실제 적용 방식>` |
| Capability 상태 / Excellence 근거·분류 | `confirmed / unclear / not-confirmed`; `direct-application / strong-inference / 미분류` |
| 대상 `CombatStat`, 현재 `readiness` | `<7축 키>`, `E1/E2/E3/미기재` |
| 현행 Base / Raw / HakiWeight / Final | `<숫자>` / `<숫자>` / `<숫자>` / `<숫자>` |
| 근거 `evidenceIds` / 해당 `battleId` | `<정확한 ID 목록>` / `<정확한 ID>` |
| 출처 직접성 | `원작 컷 직접 확인 / 내부 canon 회차 요약만 / 공식 보조 교차 / 비공식 보조` |
| 카드 상태(문서 워크플로우만) | `검토 중 / 정성 근거만 확인 / 정량 재심사 필요 / 승인 검토 준비` |

**B. 실제 장면과 분리된 효과**

| 항목 | 관찰·해석·한계 |
|---|---|
| **Canon Fact / 공식 설명** | `<무엇을 했고 무엇이 발생했는가. 대사·장면·회차/컷. 원작/보조 구별>` |
| **전투 조건 / 외부 설명 변수** | `<아군·적군 상태, 참전 전력, 중첩 피해, 패기 사용 상태, 열매/무기, 지형, 개입>` |
| **특출난 Haki 응용** | `<고급 응용이 확인된 방법. 보유/위상/횟수만이면 미통과>` |
| **이 축에서 직접 관측되는 기능** | `<방어 성공, 공격 피해, 정밀 조작, 전술 선택 등 축에 맞는 성과>` |
| **독립적인 추가 효과 (`distinctObservedMarginalEffect`)** | `<기본 성과를 넘어서 *패기 때문에 추가된* 효과. 무엇이 다른가? 불분명하면 '미확인'>` |
| **Base 제외 사유 (`baselineExclusionReason`)** | `<Base rationale의 어떤 결과는 포함되고 어떤 고급 패기 증분은 빠졌는지 구체적으로 인용. 불분명하면 '미입증'>` |
| **대체 기제·반대 사례** | `<악마의 열매/무기/본체 속도·강도, 상대 상태/판단·외부 지원, 제한 및 실패 장면>` |
| **근거의 빈틈** | `<원작 컷 부재, 추가 피격·성공 데이터 부족, 시점/기전 혼재, 계량 앵커 부족>` |

**C. 같은 장면을 사용하는 다른 평가와의 충돌 확인**

| 공유 대상 | 현재 연결 | **서로 다른 관측 효과** | 중복 위험·판정 |
|---|---|---|---|
| 다른 Core Stat Base | `<stat·Base rationale·Evidence ID>` | `<명확하면 설명/아니면 미확인>` | `<같은 결과인지>` |
| 다른 Stat의 Haki Raw | `<stat·Haki 종류·Raw·Evidence ID>` | `<추가 성과가 별개인지>` | `<재사용 검토>` |
| 같은 Stat의 다른 Haki 종류 | `<없음 또는 기재>` | `<중첩 없이 개별 추가효과 확인>` | `<stacking·상한>` |
| Special / Versatility / Combat IQ / Matchup | `<관련 근거>` | `<보유·역할 폭·선택·상성의 차이>` | `<자동 가산 없음>` |

**D. 숫자 제안 전 검토 및 승인 문턱**

- **[ ]** 고급 패기 실제 사용 또는 공식 특정 응용에 대한 확인 출처가 명시됐는가?
- **[ ]** 대상 Stat의 추가 *관측 효과*를 일반 능력/다른 요인에서 구별했는가?
- **[ ]** `baselineExclusionReason`이 **해당 Base rationale와 대조**되어 명시됐는가?
- **[ ]** 같은 Evidence를 쓰는 다른 Stat·Haki Raw에 **같은 성과를 재가산하지 않았는가**?
- **[ ]** 반례/전투조건/시점/불확실성/readiness를 기록했는가?
- **[ ]** 새 Raw량을 제안한다면, 다른 캐릭터와 **동일 축 앵커**, 현재 스텝·상한, 정확한 배제 사유까지 서술했는가?

**체크가 부족할 때의 처리:** `정성 Haki Excellence 유지 + 추가 Raw 승인 보류`; **기존 Raw를 자동으로 0으로 만드는 규칙 아님**. 상기 체크는 심사 확인용이며 새 자동 Validation이나 공식 E1/E2/E3 정의가 아니다.

| 선택 가능한 기록상 판정 | 의미 |
|---|---|
| **현행 유지·추가 자료 필요** | 정량적 타당성 미확정. 기존 레거시 Base/Raw/Final 그대로 |
| **정성 우수성만 확인** | Haki 고급 활용 인정. *별도* Raw 증분 미입증; 새 Raw 제안 보류 |
| **정량 후보 검토 가능** | 관측·Base 제외·축 간 독립성 논증 마련. Peer 앵커 및 영향 분석을 거쳐 **별도 승인 필요** |
| **기존 Raw 재산정 검토 필요** | 충돌/중복 가설이 강하지만 아직 편집·삭감한 게 아님. 승인 후 데이터 버전 패치 |

**검토자 판단:** `<판정·이유·미확인점·검토일·검토자/승인자>`. **사용자 점수 수정 승인:** `없음 / 요청 예정 / 명시 승인(근거 링크·범위)`. '검토 완료'와 '점수 변경 승인'을 혼동하지 않는다.

**수치 변경이 *승인되는 경우에만* 후속 작업:** 수정 전/후 각 Evaluation/subjectState의 Base·typed Raw·Final, 7축 Overall, Ranking·18개 현행 Matchup 영향, 계산모델/평가세트/데이터 버전, `v0.3.3` frozen baseline, 이력, 회귀 테스트·롤백 기준을 **기존 재현 가능값과 함께** 제시한다. 수치 시나리오가 없으면 이 단계를 억지로 작성하지 않는다.

## 3. 작성 예시 — 카타쿠리 견문색 방어와 숙련 (미승인, 현행 유지)

> **작업 예시이지 새로운 원작 직접 검증이나 정식 Raw 인정이 아니다.** 사실은 현행 GitHub Evidence의 회차 인덱스와 공식 ONE PIECE.com TV857/870의 요약에 근거한다. 원작 Manga Ch.881–884 페이지/컷의 독립 검증은 미실시.
>
> 공통: `characterId:katakuri` / `evaluationId:evaluation-katakuri` / `evaluation-v0.4.31-bidirectional-sweet-commanders` / `evidence-katakuri-future-sight-881-884` (Manga Ch.881–884 인덱스) / `whole-cake-katakuri-luffy`. Capability: Observation `confirmed`; Excellence: `direct-application`. 두 축 E2.

| 체크 | Defense 카드 | Technique 카드 |
|---|---|---|
| 현재 수치 | **Base81 + Raw6×0.5 = Final84** | **Base86 + Raw6×0.5 = Final89** |
| **Canon 인덱스/공식 보조** | 고급 견문색으로 공격을 먼저 읽고 피격 지점을 비워 회피. 공식 TV857에서 침착함 상실·회복에 따른 변화 | 같은 순간 미래예지에 맞춰 모치 신체를 부분 변형. Ch.882 별도 각성·지면 변형은 원본 Evidence상 독립 숙련 장면 |
| **이 축 고유 기능** | **선행 예측에 의한 방어적 회피 효과** | **모치 부분 변형·각성·무기 사용을 정교하게 운용한 숙련** |
| `baselineExclusionReason` | 기존 Base81은 일반 부분변형/고속 회피; 미래의 타격 위치를 **미리 아는 기제**를 Raw로 분리하려는 rationale가 있음. 그러나 같은 회피의 구간별 경계는 원작 컷·평가에서 더 명확화 필요 | Base86이 이미 모치 변형·각성·무기 정밀성을 반영. **미래예지가 만들어낸 추가 숙련 성공**은 아직 별도 관측·배제 논증 미입증 |
| `distinctObservedMarginalEffect` | **방향성 강함:** 타격 이전 정보로 회피 가능한 위치/시간을 알게 되는 독특한 이득. Raw량 6 자체는 미재인증 | **미확인:** 동일 회피를 넘어 예지 때문에 특별히 성공한 조작, 그리고 그 효과가 Base86 밖인지 분리되지 않음 |
| **공유 ID 중복 위험** | 동일 Evidence를 Technique Raw에서도 참조. *자체로 오류는 아님* | 동일 피격 회피 결과를 **조작 Raw의 유일한 추가성**으로 설명하면 실질 중복 위험 |
| 반대 사례·조건 | 침착함 붕괴 시 회피 실패, Snakeman에 실제 피격 | 다른 장면의 각성·복합 모치 조작은 높은 Base 정성 근거. **Raw 추가 기여 입증과 다름** |
| 기록상 판정 | **현행 Raw6 유지·근거 경계 재검토** | **현행 Raw6 유지·정량 재심사 P1**. **Raw를 승인 삭제한 것이 아님** |

**공식 교차 자료:** ONE PIECE.com [TV857](https://one-piece.com/anime/o4869/index.html), [TV870](https://one-piece.com/anime/o4949/index.html). **원작 컷 직접 검증 미실시**. 현재 7축 `[83,84,85,84,89,85,85]` 합 **595**, Overall **85.0**.

**순수한 민감도(비승인):** Technique의 Raw6만 0이고 Base86은 유지한다고 **가정**하면 Technique `89→86`, 7축 합 `595→592`, Overall `85.0→592/7≈84.6`. 이 가정은 공식 정답·권고 새 점수가 아니라 **수치 수정이 *만약* 있을 때 영향 크기**를 보여준다. 실제 승인·근거 없이 점수/랭킹을 변경하지 않는다.

## 4. 실제 적용 시 금지 사항·향후 선택지

- **이번 PR에서 변경 불가:** `src/domain/haki/types.ts`에 필드 추가, `validateHakiContribution`의 정책 판정 자동화, `evaluationRepository` Raw 조정, UI 카드 추가, 새 메타데이터 저장 구조·점수 버전 변경, `v0.3.3` baseline 수정.
- **자동 검증의 현재 한계:** `src/domain/haki/validation.ts`는 Raw 범위·스텝·비어 있지 않은 application·Evidence 존재를 검증한다. `src/domain/evaluation/validation.ts`는 참조 정합성과 Final 산술을 검증한다. `src/data/integrity/v050ReadOnlyAudit.ts`는 `haki-evidence-reused-across-stats` **플래그만 제시**한다. **어느 것도 `baselineExclusionReason`의 사실상 충족이나 다른 Stat Raw와의 기능적 중복을 자동 확정하지 않는다.**
- **대안 1 — 이 문서 양식으로만 심사:** 데이터 호환성 유지, 기존 채점 및 검증 코드 변경 없음. 현재 권장.
- **대안 2 — 향후 구조화 기록:** 결과가 축적되고 사용자 결정이 있을 때 기존 `application/rationale`에 명시적으로 반영할지, 별도 `baselineExclusionReason`·`distinctObservedMarginalEffect` 도메인 필드로 옮길지 비교. 타입/구버전/저장·복원·Validator·UI/랭킹에 파급하므로 사전 영향 검토·회귀 검증 필요. **현재 제안만 있으며 승인/구현 아님**.

**수정 파일 범위:** 이 Markdown 신규 문서 1건뿐. 기존 SPEC/Hybrid Haki 기준/캐릭터·전투·Evidence/평가·Raw/계산모델/스냅샷/버전/Rank/Matchup/UI/배포 불변. GitHub CI 실행 결과는 PR 검사 후 별도 보고.
