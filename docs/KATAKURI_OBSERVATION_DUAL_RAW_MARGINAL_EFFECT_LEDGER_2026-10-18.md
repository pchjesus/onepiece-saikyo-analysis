# 카타쿠리 미래예지의 두 Observation Raw — 기능별 독립 증분 재검증 기록

> **2026-10-18 · P1 제2차 근거 감사, 수치 변경 미승인.** 실제 기준 main `52fa5217002f4a915ebd508b81a7a80997a5e3cc`, 앱·코어 **v0.4.33**, 평가세트 **evaluation-set-v0.4.33**, 카타쿠리 개인 평가 `evaluation-v0.4.31-bidirectional-sweet-commanders`, Balanced 1.2 / Haki Weight 0.5.
> 기존 `docs/KATAKURI_FUTURE_SIGHT_RAW_INDEPENDENCE_AUDIT_2026-10-18.md`는 보존하며, 이를 반복해 같은 숫자를 재제안하기보다 **(1) 장면-기능별 증분 근거 장부 (2) Base 배제 사유별 판정 (3) 승인된 심사 기준의 자료/검증 구현 공백**을 명료하게 보강한다.
> **범위:** GitHub Markdown 한 파일만 신규 추가. 원본 만화 컷 전체 직접 열람·브라우저 실기기 검증은 수행하지 않는다.

## 1. 결정해야 할 명제와 실제 수치

검증 대상은 '동일 장면을 두 능력축의 Evidence로 **연결**해도 되는가?'가 아니다. **다른 축의 Base 성과/예외 Raw로 이미 잡힌 부분과 구별되는 두 번째 `Observation Raw+6`의 독립적인 *추가 효과*가 실제 관측되는가?**라는 질문이다. 한 장면에서 다른 기능(공격 지점 **선행 예측**, 손상 회피를 위한 **부분 변형의 숙련**)을 논증하는 것은 정당하다. 다만 그 이유만으로 각각 같은 크기인 **Raw+6을 자동 수여할 수는 없다**.

| 현재 실제 7축 | Base | Observation Raw | HakiWeight | Final | 근거 밀도 |
|---|---:|---:|---:|---:|---|
| Defense | **81** | **6** | 0.5 | **84** | E2 |
| Technique Mastery | **86** | **6** | 0.5 | **89** | E2 |
| Attack / Stamina / Speed / Combat IQ / Vers | 83 / 85 / 84 / 85 / 85 | 각각 0 | 0.5 | 동일 값 | 각각 E2 |

현재 `83/84/85/84/89/85/85`, 7축 합 **595**, Overall **85.0**. 두 Raw는 각각 `HakiStatContribution{hakiType:'observation',amount:6,evidenceIds:['evidence-katakuri-future-sight-881-884']}`. **같은 근거 ID·패기 종류·동일 회피 작동을 공유**한다. 이는 검토 트리거로는 명백하지만 *오류 확정 조건*은 아니다.

**실데이터 경로:** `src/data/sample/evaluations.ts` (v0.1.62 원본, Defense Base81+6 Raw / Technique Base84+6 Raw) → `src/data/sample/v0431SweetCommanders.ts` (카타쿠리 Technique Base **86** 및 Final89로 재판정, Raw 각각6 보존) → `evaluationRepository` 현재 값. **v0.4.33은 퀸의 오소메 설명 개정**으로, 카타쿠리 Raw·Base·근거를 수정하지 않았다.

## 2. 근거 층위별 관찰 사실과 단계별 '추가효과 장부'

공식 TV857은 카타쿠리가 침착함을 잃었을 때 루피가 공격을 맞힐 수 있었고, 재차 침착함을 찾은 카타쿠리가 **견문색으로 공격을 읽고 자신의 몸을 모치로 바꾸어 효율적으로 회피**한 과정을 별도의 문장으로 설명한다: https://one-piece.com/anime/o4869/index.html. 공식 TV870은 루피의 Snakeman 궤도 변화가 실제로 카타쿠리를 명중시켰다가, 카타쿠리가 **공격 패턴을 파악·받아내고 스스로 모치 몸을 변형해 반격**한 상황을 기록한다: https://one-piece.com/anime/o4949/index.html. ONE PIECE.com 홀케이크 아일랜드 공식 총괄: https://one-piece.com/story/wholecakeisland/index.html.

`evidence-katakuri-future-sight-881-884`의 **Manga Ch.881–884 직접 확인이라고 기록된 사실**은 저장소 `canon` Evidence **회차 인덱스·내부 요약을 읽은 것**이다. **원작 컷 원본을 독립 판독한 것이 아니다.** 공식 TV857/870은 그 내용을 교차 보조하지만, 만화 컷에서 *정확히 어떤 제어가 별도 성과였는지*를 확정하는 원천 대용이 아니다.

| 관측 연쇄 단계 | 공식/저장소가 뒷받침하는 사실 | Defense 평가 영향 | Technique 평가 영향 | *독립 예외 Raw* 판정 |
|---|---|---|---|---|
| **1. 선행 정보 획득** | 단련된 Observation으로 짧은 미래/상대 움직임을 미리 파악 | 적중 이전 준비라는 **예외적 회피 기제**의 긍정 | 패기의 *사용·숙달 사실* | Capability + Excellence 직접 성과는 확인. **정보 획득만으로 Technique의 별도 추가 정밀도 점수는 미입증** |
| **2. 타점 판단·대응 결정** | 피할 위치와 시점을 읽고 대응 | 공격 명중 확률 감소의 **방어 효과**와 연결 | 실제 움직임 조작의 준비 | Combat IQ는 정보 취득 자체와 판단 선택을 구분해 Base85에 반영, **IQ Raw0**. 두 Raw를 위한 새 독립 제어 성과 아님 |
| **3. 모치 신체 부분 변형** | 공격의 궤도에 맞춰 몸을 변형 | 실제 **피격을 피하기 위한 수단** | **조작 정확도/제어 숙련**의 긍정적 기능 추론 | 같은 회피 장면도 두 Stat 근거로 활용 가능. 그러나 Technique **Base86에 모치 제어·복합 숙련이 이미 포함** → 미래예지에 의한 추가 숙련 *증분*은 독립 입증 필요 |
| **4. 피격 회피 결과** | 예측·변형을 결합한 고효율 회피; 침착함 붕괴 시 피격 | **Defense 최종 성과**의 직접 근거 | 숙련된 회피 동작의 결과 맥락 | 같은 `회피 성공` 결과를 Defense Raw와 Technique Raw 모두의 **독립 최종 성과**로 계산하면 중복 위험 |
| **5. 회피와 별개인 능력 제어** | 저장소 Manga Ch.882 `evidence-katakuri-awakening-882`의 지면 모치화/원격 구속; Ch.883–885 선제 변신 저지; TV870의 스네이크맨 대응·모치 몸을 이용한 공격 | 직접 예외 견문색 방어 효과를 새로 증명하지 않음 | **Technique Base**를 독자적으로 지지하는 다양한 조작/응용 | 이 성과가 *미래예지로 인해* 기존 Technique Base 밖의 **추가 패기 효과**를 만들었다는 설명은 아직 없음. **모치 숙련을 Raw로 자동 재분류하지 않는다** |
| **6. 실패·제약 조건** | 침착함 상실 시 예지/회피 저하(TV857), Snakeman에 일부 피격(TV870) | 조건부 방어 효과·절대 회피 아님 | 능력의 유효 적용 한계 | 두 Raw를 독립적으로 높여 주는 근거가 아닌 **공통 기전의 작동 조건** |

### 기능 분리 자체는 허용, 점수 정당화는 별도

- **방어 기능:** 미래에 공격이 통과할 위치를 먼저 알고 피격을 피하는 **예측 기반 회피의 성과** → Defense에 강한 직접성.
- **숙련 기능:** 타점을 비우도록 모치 몸을 조작하는 **정교한 제어 실력** → Technique에 명백히 긍정. 그러나 현행 Technique **Base86에 부분 변형/각성/무기 조작이 포함**돼 있음.
- 따라서 공식 TV857은 **서로 다른 전투 기능의 존재**를 지지하지만, **Defense Raw6 + Technique Raw6이라는 서로 독립적인 두 예외 증분**을 자동 확증하지 않는다. '같은 Evidence니까 중복'도, '기능이 다르니까 둘 다 +6'도 성급하다.

## 3. 승인된 Hybrid Haki 기준과 실제 저장·자동 검사 사이의 공백

`PROJECT_SPEC.md` §5 및 `docs/HYBRID_HAKI_CRITERIA_2026-10-09.md`의 예외 Raw 심사 조건:

1. **Exceptional use 확인**: 고급 견문색의 직접 예측 사용은 `special / HakiExcellenceAssessment{basis:'direct-application'}`으로 이미 확인. **통과**.
2. **Stat별 추가 효과**: Defense는 상시 신체 회피 이상을 발생시키는 선행 예지 기제가 강하게 설명된다. Technique는 미래예지와 모치 변형 *결합 자체*가 확인되지만 그 결합이 **기본 모치 숙련을 넘는 제어 성과**를 추가 발생시켰는지는 미분리. **Technique Raw는 아직 미확인**.
3. **Base 제외 논증 (`baselineExclusionReason`)**: 원본 Defense rationale는 핵심 미래예지 회피를 Base81에서 분리했다고 설명함. 그러나 Defense Base81에도 회피/몸 부분 변형이 존재하므로 **어떤 부분이 Base에 남고 어떤 예지 효과만 Raw에 들어갔는지** 더 명확한 사건 단위 경계가 필요. Technique Base86은 모치 숙련의 폭과 정밀을 이미 반영하면서 `Raw6`의 별도 추가 효과를 서술하지 않아 **핵심 공백**.
4. **같은 성과 여러 Stat 독립 가산 금지**: 동일한 `evidence-katakuri-future-sight-881-884`에 두 Observation Raw가 연결돼 있으므로 **대상 검증 필요**. 한 장면의 다중 기여 자체는 정당.
5. **peer calibration 후 Raw량 제안**: 과거 Raw량 +6이 왜 다른 예외 Haki의 정량 앵커와 비교해 타당한지는 이번 근거에서 **새롭게 재인증되지 않았다**. Raw를 원작이 명시한 공식 수치로 취급하지 않는다.

### 발견: 승인 기준의 이유 기록을 코드가 아직 구조적으로 강제하지 않음

- `src/domain/haki/types.ts`의 `HakiStatContribution`에는 현재 `hakiType,stat,amount,application,evidenceIds`만 존재하고 **별도 `baselineExclusionReason` 필드는 없음**.
- `src/domain/haki/validation.ts`는 Raw 합계 범위·짝수 스텝·application 비어 있지 않음·Evidence 존재 여부 검사. `src/domain/evaluation/validation.ts`도 Evidence 참조 관계·최종 점수/Raw 일치와 같은 **구조적 합법성**을 검사하나, 한 공격 회피가 다른 축 Base/Raw에 이미 포함됐는지의 **정성적 독립성은 판단하지 않음**.
- `src/data/integrity/v050ReadOnlyAudit.ts`는 `haki-evidence-reused-across-stats`를 **검토 플래그**로 식별하지만, 자체적으로 중복이 확정됐다고 선언하거나 특정 축 Raw를 감점하지 않음.
- **따라서 테스트 PASS와 Raw의 정책상 독립성 입증은 별개다.** 이것은 프로젝트가 미구현한 **심사 문서화/추적의 간극**이지 당장 계산 엔진 오류가 확인됐다는 뜻이 아니다. 이 변경에 도메인 타입/Validator 신규 필드를 추가한다면 다른 캐릭터·기존 저장 구조에 영향을 줄 수 있으므로 **별도의 ArchitectureReview/PatchCheck 및 사용자 승인 뒤에만** 진행.

## 4. 양방향 반론과 결론의 확신도

| 후보 주장 | 긍정 자료 | 반대/부족한 점 | 이번 판정 |
|---|---|---|---|
| **Defense Raw6 유지의 타당성** | 공식 TV857 직접 설명: 미래 공격 예지→신체 변경→실제 회피. 침착함 변수로 작동 여부가 바뀌어 능력 효과를 분리 관찰 가능 | Base81에도 이미 높은 회피/변형이 들어 있음. '예외적 추가분 +6'의 정량 근거와 Base 배제 경계는 더 명확히 필요 | **방향성 상대적으로 강함**. 여전히 정책상 최종 재인증 아님 |
| **Technique Raw6 유지의 타당성** | 정교한 모치 변형과 예지의 높은 결합 숙련. 한 장면으로 두 기능 설명 정당 | Technique Base86과 조작 성과가 겹칠 수 있음. 동일 회피 결과 외에 **추가견문색이 독립적으로 향상시킨 조작 성공** 불명 | **독립 Raw 재인증 근거 부족**. 수치 즉시 삭제 확정 아님 |
| **Technique Raw6이 불필요할 가능성** | 별도 각성·검술·변형 성과가 Base86을 지지. 공식 TV857은 통합 회피 동작 묘사 | 전체 Manga Ch.881–884 컷/상세 인터랙션을 직접 확인하지 않아 어떤 제어는 선행 정보 덕으로만 가능한지 최종 판별 불가 | **P1 재산정 검토 후보**, 최종 점수는 보류 |
| **동일 Evidence 두 축 연결의 적법성** | 선행 예측(Def 기능)과 능력 제어(Tec 기능)는 다른 평가축으로 분리 가능 | 같은 성공 결과의 예외 Raw를 두 번 독립 가산하는 경우만 문제 | **Evidence 복수 역할/참조 자체 변경 불필요** |

**우선 방향성**: 지금은 `Defense Raw6`의 실전 예외 방어 기능이 `Technique Raw6`의 별도 예외 증분보다 직접 설명이 강하다. 그렇다고 **Technique Final89가 잘못됐다고 판정하지 않는다.** 결론이 '실제 숙련이 약하다'는 뜻도 아니고 원래 모치 숙련 성과를 삭제할 사유도 아니다.

## 5. 민감도 계산과 실제 승인 범위 구분

균등 7축 평균, HakiWeight0.5라는 현행 **기계적 계산만** 사용한다. 다음의 숫자는 **근거에 기반한 최종 추천점수가 아니라 변경시 결과의 경계**다.

| 가정 시나리오 (비승인) | Defense | Technique | 7축 합계 | Overall | 의미 |
|---|---:|---:|---:|---:|---|
| **A. 현행 Base/Raw 모두 유지** | 84 | 89 | 595 | **85.0** | 현재 Draft, **그대로 유지** |
| **B. Technique의 Raw6만 0, Base86 유지** | 84 | 86 | 592 | **84.6** | 고급 패기 독립효과가 불성립한다는 **가정**. 모치 숙련 Base 자체는 유지 |
| **C. Technique Raw6을 제거하고 Base를 별도 재심사** | 84 | **미정** | **미정** | **미정** | 실제 모치 숙련 성과를 동축 비교하고 결정. 기계적으로 Raw3점치를 Base에 옮겨 89를 유지하는 것도 자동 정답 아님 |
| **D. Defense 예외 Raw도 Base 중복을 별도 감사** | **미정** | 89 잠정 | **미정** | **미정** | 우선순위는 낮아도 미래예지 회피 자체와 Base의 경계를 재점검 |

시나리오 B의 `592/7≈84.5714`는 **모델 결과의 산술적 변화**이고, *마르코84.4* / *킹84.0*과의 순위 비교를 위해 해당 시나리오를 채택할 수는 없다. **전체 82인 공식 등수/18 Matchup 결과도 새 평가 데이터 승인과 계산 후에만** 의미가 있다.

## 6. 승인 전 해결해야 할 근거 질문 / 후속 라우팅

1. **Manga Ch.881–884 컷별 출처 직접 검증:** 같은 동작의 `예지 입력 / 몸의 정밀 부분 변형 / 독립 후속 조작 / 실제 회피 결과`를 칸으로 분리한 장면표. **그 장면에 없는 반사실적 '미래예지 없이도 같은 조작 가능했을 것'**은 사실처럼 기록하지 않는다.
2. **Technique86의 명시적 Base 경계:** `evidence-katakuri-awakening-882`, `evidence-katakuri-gear4-counter-883-885`, 무기/모치 변형 제어에서 Base에 이미 쓰인 부분을 명시하고 **Observation 자체가 추가로 만든 제어 성과**만 Raw 후보로 보류.
3. **Defense81의 Base 경계:** 평상시 회피/모치 몸 제어와 **미래예지 때문에 명중 회피가 가능해진 별도 관찰 효과**를 구분. Raw 6을 계산 공식이 자동 정당화하는 것은 아님.
4. **정량 재산정은 별도 승인 게이트:** A(현재 유지), B(Technique 예외 Raw 0/Base86 유지), C(Technique Base까지 재심사), D(Defense도 재심사) 중 사용자 결정 전에는 점수·Raw·HakiWeight·계산 모델·Evidence 원문/ID·Matchup·UI를 **변경하지 않는다**.
5. **심사 추적성 개선은 별도 설계 작업:** `baselineExclusionReason`과 `distinctObservedMarginalEffect`를 향후 고급 예외 Raw에 어디에 둘지(새 필드/현행 application+rationale/리뷰 카드) 검토 가능. 과거/현재 Evaluation 및 Validator 전체에 영향을 주므로 이 보고서에서 임의로 schema 변경하지 않음.

## 7. 실제 수행 및 한계

**확인한 현재 소스:** `PROJECT_SPEC.md` §4–5, `docs/HYBRID_HAKI_CRITERIA_2026-10-09.md`, `src/data/sample/evaluations.ts`, `src/data/sample/v0431SweetCommanders.ts`, `src/data/sample/evidence.ts`, `src/domain/haki/types.ts`, `src/domain/haki/validation.ts`, `src/domain/evaluation/score.ts`, `src/domain/evaluation/validation.ts`, `src/data/integrity/v050ReadOnlyAudit.ts`, `src/data/integrity/versionManifest.ts`, 선행 카타쿠리·9인 동축 감사 문서.

**외부 공개 출처:** 공식 ONE PIECE.com TV857, TV870 및 홀케이크 전체 줄거리·인물 설명. 원작 만화 전체 Ch.881–884 컷을 독립 대조하지 않았으며 공식 애니 시놉시스는 원작 만화 컷 직접 검증과 동치가 아니다.

**작업 파일:** 이 Markdown 한 개만 새로 추가, 숫자/계산/평가 데이터/근거 ID/사용자 UX/현행 버전/배포를 **전혀 변경하지 않는다**. 별도 테스트·빌드는 doc-only GitHub CI가 실제 수행한 범위만 PASS로 보고한다.
