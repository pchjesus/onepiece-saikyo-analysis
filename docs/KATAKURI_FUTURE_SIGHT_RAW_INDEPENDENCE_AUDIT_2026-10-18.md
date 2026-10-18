# 카타쿠리 고급 견문색 Defense / Technique Raw 독립성 집중 감사

> 작성: 2026-10-18 · 기준 main `c5724c26716e95807ccbf222a1aabc4ee87e5ed1` / 앱 v0.4.31.
> **상태: 근거 분석 및 미승인 정량 후보. 현행 평가·Raw·Base·Evidence·모델·UI·랭킹·저장 구조 변경 없음.**
> 이전 리뷰의 9인 전체 재산정은 반복하지 않는다. 이 문서는 기존 `docs/NINE_COMMANDERS_CROSS_AXIS_MATCHUP_AUDIT_2026-10-18.md`와 `docs/V0_4_31_SWEET_COMMANDERS_BIDIRECTIONAL_2026-10-18.md`의 Katakuri 후속 검토다.

## 1. 검증할 정확한 질문

두 Raw가 **같은 Haki 종류 / 동일 Evidence ID / 같은 회피 장면**에서 유래한다는 사실만으로 오류를 확정해서는 안 된다. 그러나 독립적인 정량 효과 없이 원인(미래예지·신체변형의 정교함)과 결과(그 공격을 피함)를 두 축에 별도 예외 가산하면 `PROJECT_SPEC.md` §5 및 `HYBRID_HAKI_CRITERIA_2026-10-09.md`의 `distinct observed marginal effect` / `baselineExclusionReason` 조건에 부합하지 않을 수 있다.

확인 순서: **원작 사실과 출처 → 당시 조건 → 관측된 결과 → Stat마다 다른 독립 성과 → Base에 이미 반영 여부 → 예외 Raw의 추가 기여 → Final / Overall**. 원작에서 확인되지 않은 Raw 양을 꾸며 내지 않는다.

## 2. 실제 현재 코드(읽기 전용 대조)

| 항목 | Base | typed Observation Raw | Weight | Final | Readiness | Raw가 직접 참조한 근거 |
|---|---:|---:|---:|---:|---:|---|
| Defense | 81 | +6 | 0.5 | 84 | E2 | `evidence-katakuri-future-sight-881-884` |
| Technique Mastery | 86 | +6 | 0.5 | 89 | E2 | **동일** `evidence-katakuri-future-sight-881-884` |
| Combat IQ | 85 | 0 | 0.5 | 85 | E2 | Base에 별도 선택 성과 반영, Raw 없음 |
| Speed | 84 | 0 | 0.5 | 84 | E2 | 미래정보 자체를 속도 보너스로 가산하지 않음 |

7축 `83/84/85/84/89/85/85`, 총합 595, Overall **85.0**. 현재 Evaluation은 `evaluation-v0.4.31-bidirectional-sweet-commanders`; 기존 `sampleEvaluations`의 원본에는 Defense81+6 Raw, Technique84+6 Raw가 별도로 기록됨. v0.4.31 오버레이에서 Technique Base를 86으로 평가했으며 Raw6은 그대로 유지함.

원본 `src/data/sample/evidence.ts`의 `evidence-katakuri-future-sight-881-884`는 Manga Ch.881–884를 통합해 "짧은 미래를 읽고 공격을 회피·대응"이라고 기술한다. 역할은 Defense=primary(선행 예측 후 변형 회피), Technique=primary(고급 견문색과 모치 변형의 정밀 결합), IQ=primary(정보를 대응으로 선택), Speed=context로 기록돼 있다.

보조 `evidence-katakuri-composure-future-sight-857`는 Defense=primary, Technique=**secondary**, IQ/Speed=context이며, **같은 회피 성공을 각축의 독립 보너스로 계산하지 않는다**는 주의를 명시한다. 주 근거의 primary/primary 역할과 보조 근거의 secondary 주의 사이에 **정량 근거 독립성 검토가 필요한 정합성 공백**이 남아 있다.

## 3. 독립 근거 계층

| 사례 / 근거 | 관측 또는 공식 보조 설명 | 방어와 숙련의 관계 | 판정 |
|---|---|---|---|
| 원작 Ch.881–884 기존 Evidence | 미래예지로 공격 위치를 파악하고 모치 신체를 변형해 피함 | 한 회피 기능의 입력→실행→성공 결과로 연결 | Defense Raw의 높은 타당성. **Technique Raw의 독립 추가 효과 미분리** |
| ONE PIECE.com TV857 | 침착함 상실 시 피격, 회복 후 공격 예측과 신체 변형으로 회피 | 같은 메커니즘/조건에 따라 성능 변화 | 미래예지 효과가 뛰어남을 지지하지만 Raw를 두 번 독립 부여할 직접 근거는 아님 |
| Manga Ch.882 기존 Evidence; 공식 TV855 | 모치 각성으로 주변 지면·전장을 변형하여 제압/구속 | 회피와 별도의 능력 제어 성과 | **Technique Base(및 Versatility 등)에 긍정적인 독립 근거**. 그 자체가 예외 Observation Raw 추가 증거는 아님 |
| Manga Ch.883–885 기존 Evidence | 상대의 Gear4 준비 타이밍을 읽고 선제 방해·제압 | 선행정보 활용과 전술 선택은 구분 가능 | Combat IQ Base의 긍정 근거. IQ Raw 재도입 근거 아님 |
| 공식 TV870 | 상대 궤도를 읽고 Snakeman 고속 타격에 대응, 모치 몸을 변형해 공격·구속 | 높은 실전 반응 및 능력 조작을 지지 | Speed/Technique 실증은 있으나 예측 우위를 각 Stat에 복제하지 않음 |

**근거 등급 주의:** Manga Ch.881–884/882/883–885의 진술은 **저장소의 canon 타입 Evidence와 회차 인덱스를 열람한 것**이며 원작 만화 **페이지/컷 원본 독립 전수 열람이 아님**. ONE PIECE.com TV855/857/870은 **공식 애니메이션 줄거리**로 원작과 다른 계층의 교차 근거다. 커뮤니티 요약은 사실 확정으로 편입하지 않음.

공식 보조 링크:
- https://one-piece.com/anime/o4865/index.html (855)
- https://one-piece.com/anime/o4869/index.html (857)
- https://one-piece.com/anime/o4949/index.html (870)
- https://one-piece.com/anime/o4875/index.html (858, 전투 조건)
- https://one-piece.com/character/Charlotte_Katakuri/index.html (인물·능력 기본 소개)

## 4. 양방향 반론

### 왜 과대평가/중복일 수 있나
- 동일 `evidence-katakuri-future-sight-881-884`의 "미래를 읽음→몸을 비움→맞지 않음"이 Defense Raw6의 성과이자 Technique Raw6의 유일한 명시적 예외 기여다.
- 변형 동작의 "정교함"은 해당 회피 **수단의 특성**이지, 방어 성과와 분리된 추가 결과/통제 성공이 아닐 수 있다.
- Technique Base86은 이미 각성·무기·모치 운용의 정밀함을 포함한다. 동일한 변형을 예외 Raw로 다시 가산한다면 Base/Raw 중복 가능성도 있다.

### 왜 과소평가될 수 있나
- 카타쿠리가 미래 정보를 받고 **타점에 맞춰 신체 일부만 정밀 변형할 능력**은 단순히 공격을 예측하는 것과 별도 구현 역량이다. 하나의 장면이 두 Stat의 서로 다른 **실제 독립 성과**를 설명한다면 다중 연결 자체는 합법이다.
- 각성/다수 원격 공격/모치 변형/삼지창/구속 등 반복 능력 통제는 미래예지와 별도로 높은 Technique를 강하게 지지한다.
- 높은 숙련을 정성적으로 인정하는 것과 **예외 Observation Raw +6을 추가 산정하는 것**은 다른 주장이다. 예외 Raw를 조정해도 숙련을 기계적으로 하위권으로 내릴 근거는 없다.

**현재 판단:** 데이터가 **동일 Evidence ID 두 Raw 공유**함은 확정. 공식 TV857의 작중 과정 설명도 하나의 연쇄 회피를 지지함. 현행 Technique Raw6이 Defense Raw6과 **독립적인 incremental benefit**을 입증한다는 설명은 아직 부족하다. 그러나 "실제 중복 계산 확정" 또는 "Technique Final89이 틀렸다"는 결론도 현재 자료만으로 확정할 수 없음.

## 5. 결정 전 시나리오 (모두 가상, 비승인)

| 가상 시나리오 | Defense Final | Technique Final | 7축 Overall | 해석과 한계 |
|---|---:|---:|---:|---|
| A. 현재 유지 | 84 | 89 | **85.0** | 원본 컷의 기능 독립성 추가 확인까지 현행 유지 |
| B. Technique Raw6→0 / Base86 유지 | 84 | 86 | **592/7 ≈ 84.6** | 숙련을 부정한다는 뜻이 아닌 **예외 가산만 제거한 민감도 실험**. 최종 권고점수 아님 |
| C. Technique Raw6→0 / Base 재평가 | 84 | 아직 미정 | 아직 미정 | 독립적인 모치 숙련 실적에 따라 Base를 재판정. 단순히 기존 Raw3을 Base에 그대로 옮겨서 89 유지하는 것은 **중복 문제 은폐**가 될 수 있음 |
| D. Defense Raw 재검증 | 아직 미정 | 89(잠정) | 아직 미정 | 미래예지 회피의 예외적 효과가 이미 Base81에 포함됐는지 컷/조건별 확인. 우선순위는 낮지만 조사 대상에서 제외하지 않음 |

수학적으로만 보면 B가 채택될 경우 카타쿠리는 **위 9인 비교군 안에서** 여전히 마르코84.4, 킹84.0보다 높은 Overall이지만, 그 순위를 맞추기 위해 Raw를 유지하거나 제거해서는 안 된다. 전체 82인 서열·매치업은 실제 신규 Evaluation 승인/반영 후 다시 계산해야 한다.

## 6. 승인 전 우선 작업 · 판정 기준

1. **원작 884화(및 881–884화) 실제 해당 컷**: 예측 회피와 별개의 독립 Technique 성공이 있는지 컷별로 메모; 만화 페이지 링크/컷 위치를 확보해 확인 근거 남기기.
2. **대체 설명**: 예측 덕분에 쉬워진 조작인지, 그와 독립적으로 고난도 조작 성공이 실증인지 구분.
3. **Base exclusion**: Technique86에 이미 포함된 모치 부분 변형/각성/무기 사용과 +6 Raw 예외 성과가 어떻게 겹치지 않는지 명확한 근거를 작성.
4. **대조군**: 크래커(다수 병사 제어, 통상 무장색 Raw0), 킹(상태 전환, Raw0), 스무디(능력 조작 Raw0)와 동일한 exceptional-Haki 조건 적용. 캐릭터 순위를 타겟팅하지 않음.
5. **승인 게이트**: A(현행 유지) / B(Technique 예외 Raw 제거, Base 그대로) / C(전체 숙련 Base 재산정) 등은 **분석 후보**. 사용자 명시적 승인 이전 숫자·Raw·Evidence impact·버전·UI·Rank/Matchup **패치 금지**.
6. **변경 승인 시** 현재 Evaluation overlay와 Evidence impact/History/manifest을 일치시키고 historical `sampleEvaluations`·v0.3.3 frozen baseline은 보존. 82인/88 Eval/616축/18 매치업, Balanced1.2/HakiWeight0.5와 모든 과거 회귀 테스트 확인.

## 7. 이번 문서의 검증 범위

- 수행: `main` 현재 Evaluation/Raw/Evidence 관계, `v0431SweetCommanders.ts` review, `PROJECT_SPEC`·Hybrid Haki rubric, 공식 ONE PIECE.com 줄거리 교차 열람.
- 미수행: 원작 만화 **원본 컷 전체 직접 판독**, 정밀 애니 프레임 분석, 실제 PC/모바일 렌더링 검증.
- 변경: **이 문서 하나**. 코드는 변경하지 않으므로 새 점수로 재현하는 테스트는 실행할 대상 없음. PR의 문서 범위 확인 및 CI 결과는 별도 확인할 것.
