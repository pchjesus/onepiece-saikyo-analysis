# 예외적 패기 Raw 심사 카드 시범 적용 — 현행 양수 Raw·공유 Evidence 전수 대기열

> **2026-10-21 · 점수 변경 없는 심사 문서.** 작업 시작 main `bc0056036782024e77f195520c0a6fa44118f7ef`, app/core `v0.4.33`, 평가세트 `evaluation-set-v0.4.33`, 계산 `Balanced1.2` / HakiWeight `0.5`.
>
> **근거 우선순위:** `PROJECT_SPEC.md` §5 / `docs/HYBRID_HAKI_CRITERIA_2026-10-09.md` → `docs/HAKI_EXCEPTIONAL_RAW_INDEPENDENT_EFFECT_REVIEW_CARD_v1_0_2026-10-21.md`의 **승인 전 심사 카드**. 동일 Evidence ID는 검토 플래그이지 자동 오류가 아니다. **실제 관측된 서로 다른 기능은 같은 장면에서도 복수 Stat의 정성 근거가 될 수 있으나 동일한 성공의 추가 Raw를 수치로 반복 가산하려면 각각의 `distinctObservedMarginalEffect`와 `baselineExclusionReason`이 별도로 필요하다.**
>
> **실행 범위:** 코드 정적 추적 + 현행 오버레이·Evidence 인덱스 검토 + 공식 애니 일부 보조 교차 검증. **원작 만화 페이지/컷 직접 전수 판독·실제 v050 런타임 함수 실행·브라우저/실기기 검증은 수행하지 않았다.** 아래 건수는 실데이터 소스/적용 함수를 분석한 **정적 추적 결과**이며 실제 실행한 테스트 결과로 표현하지 않는다.

## 1. 전수 대기열 구성 방법과 정확한 범위

1. `src/data/sample/evaluations.ts`의 **45개 양수 `HakiStatContribution` 원본**을 `evaluationId/characterId + HakiStatContribution.stat + Haki type + amount + evidenceIds`로 분류. 이 파일은 과거 Snapshot을 보존하기 때문에 **이 숫자가 현재 Live 양수 Raw 건수와 같지는 않다**.
2. 실제 `evaluationRepository` 및 `v050CurrentDataset`의 적용 체인을 확인. 관련 역사적 Raw가 **0으로 재분류된 여섯 건**: `v0.4.27` 징베 Defense(+4), `v0.4.29` 마르코 Attack(+2)·죠즈 Attack(+4)·비스타 Attack(+4)/Technique(+2), `v0.4.31` 크래커 Attack(+4). 원작 사용 사실/기본 실적을 부정하지 않고 **통상 패기 적용을 Base에 포함**한 선행 승인/패치들이다.
3. 그 외 Evaluation 오버레이(`v0.4.21` 카이도/링링 Technique Base 수정, `v0.4.6` 샹크스 등 점수 보정, `v0.4.33` 퀸 맥락 수정)는 해당 양수 Raw 자체를 변경하지 않음을 관련 코드로 확인. 신규 `v0412`, `v0413`, `v0420`, `v0428` 평가들은 양수 Raw를 새로 만들지 않음.
4. **정적 추적상 현행 양수 `HakiStatContribution`은 39건 / 18개 Evaluation**. `evaluationId + evidenceId`마다 서로 다른 **2개 이상 Stat에 양수 Raw가 연결된 묶음은 11개 / 10개 Evaluation**. 이 가운데 카타쿠리는 선행 PR #169에서 집중 심사했으므로 **새로운 우선 대상은 10개 묶음 / 9개 Evaluation**.
5. **여러 Haki 종류가 같은 Stat에도 적용**된 사례는 추가로 검사: 샹크스 **Technique Conquerors4 + Observation4** (합 Raw8), 조로 **Attack Armament4 + Conquerors6** (합 Raw10, 현재 Stat당 허용 상한). 동일 Evidence가 이중 사용됨. `v050ReadOnlyAudit`의 `haki-evidence-reused-across-stats` 플래그만으로 이 **같은 Stat 내 Haki 타입 중첩**의 성과 독립성까지 확정할 수는 없다.
6. 공유되지 않는 양수 Raw의 **8개 Evaluation**: 상디, 가프-현재, 쿠잔, 보르살리노, 잇쇼, 시류, 버제스, 가반-현재. 이들은 **축 간 동일 Evidence 재사용 우선순위에서만 제외**하며 Base 독립 효과·일반 패기의 예외 자격 검증을 면제받은 게 아니다.

**판정의 용도:** 아래 P1/P2/P3는 *문서 심사 대기열 우선순위*이고 프로젝트의 Raw 점수/공식 Evidence strength/readiness 정책을 새로 만든 게 아니다. '정량 근거 부족'은 **기존 Raw 즉시 삭제 명령이 아니며**, 새 Raw 채택은 별도 점수 변경 승인 전까지 보류한다.

## 2. 공유 Evidence 대기열 — 11개 그룹, 10개 평가

| Evaluation·Evidence ID | 현행 해당 양수 Raw | 같은 장면의 **서로 다른 기능** 후보 | 증분·중복 위험 | 우선 |
|---|---|---|---|---|
| **샹크스** / `evidence-shanks-kid-divine-departure-1079` | Attack **Conq6**; Technique **Conq4+Obs4**; IQ **Obs4** | 패휘감 검격의 공격 / 검격·패기 제어 / 미래 위협 인지 후 표적 결정 | 같은 카무사리 한 번의 피해·선제 타이밍을 여러 추가 Raw로 반복 계산할 위험, **같은 Technique 내 두 패기 중첩** | **P1** |
| **조로** / `evidence-zoro-conquerors-1033-1035` | Attack **Arm4+Conq6**; Technique **Arm4** | 검격 실제 피해 / 엔마 및 삼도류 패기 방출 제어 | 공격축 Raw10이 동일 킹전 Evidence에서 두 패기 효과를 개별 입증하는지 미분리. **Technique Base85 엔마 제어와 Raw4 경계** | **P1** |
| **전성기 가프** / `evidence-garp-roger-rocks-1165` | Attack **Conq8**; Defense **Conq8**; Technique **Conq8** | 록스에게 공동 공격 성립 / 최고 수준 공방 대응 / 권격 패기 집중 | 3축 각각 독립 예외 효과·Base 배제의 정량 앵커, **로저 공동 공격** 및 상대 **변형 상태**의 교란 | **P1** |
| **로저** / `evidence-roger-haki-analysis-rocks-1165` | Attack **Conq8**; Defense **Conq8**; Technique **Conq8** | 공동 제압 / 패왕색 상쇄·방어 대응 / 패기 상호작용 분석 후 집중 | 같은 공동 교전에서 3개 효과가 독립인지, 실제 방어 상쇄를 다른 공격 성공과 분리 가능한지 | **P1** |
| **록스(자연 상태)** / `evidence-rocks-harald-1155` | Attack **Conq8**; Defense **Conq8**; Technique **Conq8** | 하랄드와 강력한 패기 충돌 / 상쇄·방어 / 검술 결합 | 방어는 Evidence `secondary`로서 공격에 비해 직접 표본 적음. **자연 상태와 악마화 록스 혼합 금지** | **P1** |
| **전성기 뉴게이트** / `evidence-newgate-roger-966` | Attack **Conq8**; Defense **Conq8**; Technique **Conq8** | 로저 상대 비접촉 충돌 / 공격 상쇄·공방 지속 / 언월도와 패왕색 결합 | 최상위 교전은 직접 근거이나 **하나의 충돌을 3회 독립 Raw 성과**로 산정할 수 있는지 미확정. 3일은 해적단 전체 전투 | **P1** |
| **카이도(패휘감)** / `evidence-kaido-zoro-luffy-1010` | Attack **Conq6**; Technique **Conq6** | 패왕색 강화 제압 / 금쇄봉에 고급 패기를 의도적으로 적용 | 공격이 강했다는 사실과 별개로 Technique Base(현행 **95**)를 넘어선 **독립 제어 증분** 입증 필요 | **P2** |
| **카이도(미래예지)** / `evidence-kaido-future-sight-1042` | Defense **Obs2**; Combat IQ **Obs2** | 스네이크맨 회피/대응 / 예측 활용을 선택한 전술 | 방어 회피와 전술 전환은 구분 가능. 그러나 같은 예지 입력을 두 Raw 성과로 자동 복제 금지. **Defense Base99→Final100은 상한 적용** | **P2** |
| **링링** / `evidence-linlin-pageone-1011` | Attack **Conq6**; Technique **Conq6** | 패휘감 주먹 실제 적중 / 의도적인 패휘감 타격 적용 | 한 번의 유효타와 사용 숙련을 둘 다 인정 가능하지만 **Technique Base93**의 혼합 능력 제어와 독립 증분 구분 필요 | **P2** |
| **현재 레일리** / `evidence-rayleigh-haki-training-597` | Attack **Arm4**; Technique **Arm4** | 무장색 공격 시연 / 무장색의 설명·사용·교육 숙련 | **훈련 시연**이 고급 실전 공격력의 별도 Raw 마진을 증명하는가? 숙련 Base94 및 같은 시연 Raw 중복 위험 | **P1** |
| **카타쿠리** / `evidence-katakuri-future-sight-881-884` | Defense **Obs6**; Technique **Obs6** | 미래 예측 방어 / 모치 신체의 정밀 변형 | 이미 별도 PR #169 심사: Defense 특유 선행 회피는 강하나 Technique Base86 밖의 견문색 추가 제어 마진 미분리 | **기존 P1** |

**출처/실행 엄격 구분:** 위 '확인 장면'은 `src/data/sample/evidence.ts`의 **canon 타입 내부 요약·회차 인덱스**에 우선 근거한다. 원작 Manga Ch.966/1010/1011/1033–35/1042/1079/1155/1165를 이번 작업에서 직접 전수 열람한 것이 아니다. 공식 ONE PIECE.com **TV1112**는 샹크스의 미래 관측·신속 접근·카무사리를, **TV1060/1062**는 조로의 엔마와 패왕색을 동반한 킹전 승리를 독립적으로 보조한다. 그 공식 줄거리가 **Raw 타입별 가산량/상호 독립성까지 인증하는 것은 아니다.**

## 3. 심사 카드 우선 적용 ① — 샹크스 / 키드 선제 제압

**대상:** `evaluation-shanks` (v0.4.6 전술·방어 보정이 적용된 현재 default). `evidence-shanks-kid-divine-departure-1079` / `elbaf-shanks-kid-1079` / 저장소 Manga Ch.1079. 공식 TV1112: https://one-piece.com/anime/67527/index.html.

| 카드 영역 | Attack Conq6 | Technique Conq4 + Obs4 | Combat IQ Obs4 |
|---|---|---|---|
| **실제 효과** | 카무사리로 키드를 한 차례 제압(그의 공격 준비 중) | 검격에서 패기의 운용·예지와 선제 검격 타이밍 연결 | 함대 피해의 미래를 보고 최우선 위험 제거를 선택 |
| **현재 Base와의 경계** | Attack Base94에 **이미 카무사리의 실제 결정력** 포함. 패휘감 때문에 증가한 *별도* 피해 부분 미계량 | Technique Base92에 **상위 검술 숙련** 포함. 패왕색의 검격 강화 효과, 견문색의 선제 타이밍이 실제로 별도 정밀 제어 성공을 두 번 만들었는가 미확인 | v0.4.6 Combat IQ Final94(Obs4 유지)이며 Base에 위협 우선순위 판단 포함. '미래를 보고 맞게 선택'한 효과 중 무엇이 Base 밖인가 미분리 |
| **외부 변수/반론** | 키드는 함대 타격 준비 중, 선제 공격, 짧은 단발 결정타. 이후 함선 파괴는 도리·브로기 | 실제 **고급 두 Haki가 독립적인 정밀 제어를 각기 추가했는지** 공식 TV 요약만으로 수치 분해 불가 | 선행 위험 정보는 전술 판단과 구별되지만, 예지 입력 자체를 IQ Raw로 반복 가산할 별도 관측 결과는 부족 |
| **심사 판정** | 현재값 유지, Base 밖 예외적 공격 마진 재인증 필요 | **P1 우선:** 같은 Technique 내 Conq4/Obs4 **동시 Raw 효과**와 다른 두 Stat과의 결합 분리 증명 필요 | **P1 우선:** Base에 포함된 결정 선택과 Observation Raw 구분 필요 |

**직접 확인 / 미확인:** 공식 TV1112에서 미래 확인·단독 접근·카무사리·키드 제압 및 **도리·브로기의 함선 파괴**가 각각 확인된다. 그러나 '패왕색의 구체적 추가 피해량', '견문색이 Technique 정밀도를 패왕색과 독립적으로 향상한 증분' 및 Manga 컷 원본의 모든 세부 메커니즘은 이번에 독립 검증되지 않았다. **정성적으로 카타쿠리와 다른 높은 전투 연계 역량을 인정**하는 것과 Conq/Obs 각각의 Raw를 확정하는 것은 별개.

## 4. 심사 카드 우선 적용 ② — 조로 / 킹전의 복수 패기

**대상:** `evaluation-zoro` / `evidence-zoro-conquerors-1033-1035` / `onigashima-zoro-king`; 저장소 Manga Ch.1033–1035, ONE PIECE.com [TV1060](https://one-piece.com/anime/61598/index.html) · [TV1062](https://one-piece.com/anime/61675/index.html).

| 카드 영역 | Attack Arm4 + Conq6 | Technique Arm4 |
|---|---|---|
| **실제 효과** | 엔마의 패기 방출을 수용하고 세 검에 패왕색을 두른 공격, 킹을 격파 | 엔마·도류·패기 운용 통제. 고급 검술과 전력 방출 전환 |
| **Base 제외 사유 점검** | Attack Base85에 **이미 아수라·킹 격파 등의 실제 결정력**이 포함. 같은 피니시 공격에 별도의 Armament+4와 Conquerors+6이 만든 **각기 추가적인 피해·돌파**는 장면별 미분리 | Technique Base85에 **엔마 제어 및 높은 검술 숙련** 반영. 그 동일 엔마/무장색 결합이 Base 외 **특출난 무장색 추가 제어 성과**인지 미입증 |
| **같은 장면 재사용** | Attack의 두 Haki가 **동일 Evidence ID**. Raw 합 **10/10**(상한 도달). 여러 패기 종류를 썼다는 사실만으로 둘 다 +N 자동 허용 X | 동일 Evidence를 Attack과 공유하지만 **기술 통제**는 Attack 피해와 다른 기능일 수 있음. 문제는 Raw가 Base 밖의 독립 제어를 구별했는가 |
| **전투 조건** | 킹의 Flame ON/OFF 방어 차, 조로의 Enma 패기 소모 및 근접 결착. 최종 승리가 모든 모드 상시 관통 증명은 아님 | 패기 제어를 전장 한계 속에서도 수행했다는 정성 가치는 보존 |
| **심사 판정** | **P1 우선:** Arm4와 Conq6의 독립 예외 공격 효과 및 동일 Stat stacking 심사. 수치 변경 불가 | **P1 우선:** Technique Base85와 Arm4 별도 고급 패기 제어 구분 |

**반론:** 조로는 단일 무기를 든 채 여러 종류의 패기를 결합할 수 있으므로 같은 한 장면이 **별개의 기능을 실제 보여줄 가능성**이 있다. 그러나 별개 패기 **보유/동시 사용 사실**이 곧 별개 Raw **효과량**을 증명하지는 않는다. 킹전의 물리적 피해와 **모드 취약성**도 분리한다.

## 5. 심사 카드 우선 적용 ③ — 최고수준 패왕색 3축 공통 재사용

카드별 평가대상은 **다른 인물·다른 시대**이며 한 장면을 다른 캐릭터의 개인 성과로 서로 복사하지 않는다. 아래 사례 각각 Attack/Defense/Technique의 **구분 가능한 기능은 인정할 수 있으나** 3개의 +8 증분을 자동으로 정당화하는 것은 아니다.

| 평가/전투 | 공격의 독립 성과 | 방어의 독립 성과 | 숙련의 독립 성과 | Base 배제 및 상대 조건의 미검증점 |
|---|---|---|---|---|
| **가프 전성기 / Ch.1165** | 가프·로저의 합동 결정타. **가프 단독 처치가 아님** | 최상위 공방 지속은 확인되지만 구체적 **패왕색 차단·경감의 별도 결과** 컷이 필요한 상태 | 권격에 패왕색 출력을 집중했다는 저장소 사실 | Attack95/Defense95/Technique95 모두 최고급 실전 결과·운용을 Base에 포함. 합동 공격·상대 록스의 변형 상태·패기 증분을 개인별/축별 분리할 자료 부족 |
| **로저 / Ch.1165** | 록스 변형 상태 해제에 가프와 공동 기여 | 패왕색 상쇄를 이용해 공방을 이어감(저장소 Canon 요약) | 패왕색 상호작용 이해 후 출력 집중/의도적 적용 | Attack96/Defense95/Technique95 Base가 이미 대결·검술 질을 포함. **전술적 분석(IQ)과 숙련 Raw** 및 동일 충돌 간 효과도 구별해야 함 |
| **록스 자연 상태 / Ch.1155** | 하랄드와 최상위 검격·패기 충돌 | 방어는 Evidence에서 **secondary**, 공격보다 직접 표본이 적음 | 고급 검술에 패왕색 결합 | 자연 상태와 Domi Reversi 악마화 상태 **혼합 금지**. Attack96/Defense94/Technique94 Base 밖의 별도 방어 Raw8을 특히 검증해야 함 |
| **뉴게이트 전성기 / Ch.966** | 로저와 비접촉 패왕색 충돌 | 최상위 상쇄·공방을 유지한 성과 | 언월도와 패왕색을 결합한 정교한 운용 | Attack96/Defense95/Technique94 Base에 **동일 최상위 공방의 품질** 포함. '3일 3야'는 **해적단 전체 전쟁 지속**이며 Raw의 독립 방어/숙련을 직접 계량하지 못함 |

- **양방향 판정:** 합동 결정타, 상쇄, 출력을 고의로 모은 기술은 **원작 내에서 기능상 다르다**. 그러나 원작 컷과 실제 각 Raw의 `baselineExclusionReason`이 없으면 +8을 축별로 똑같이 재인증할 근거는 없다. **전체 +8 삭제도 불승인**.
- **Ch.1155/1165 출처 제한:** 이번 GitHub `canon` 회차 인덱스·요약의 사실성·조건을 검토했으나 **원본 컷의 개별 상호작용을 직접 확인하거나 독립 공식 자료로 교차 인증하지 않았다**. 특히 가프/로저/록스 Raw 심사는 원작 컷 확인이 선행돼야 한다.
- **비교 오해 금지:** 로저와 가프 두 Evaluation의 서로 다른 `Evidence ID`가 **같은 갓 밸리 전선**을 설명한다고 해서 이것이 각자의 **독립 1대1 전투 두 건**이라는 뜻은 아니다. 타인과의 합동 공격은 개인의 순수 1대1 출력으로 분리 환산하지 않는다.

## 6. 심사 카드 우선 적용 ④ — 카이도·링링·레일리

| 대상·현재 수치 | Base 구분 | 서로 다른 기능 인정 | 해결 전 정량 판단 |
|---|---|---|---|
| **카이도 Conquerors Attack6 + Technique6** (Ch.1010) | Attack Base95는 직접 제압, Technique Base는 **v0.4.21에서 93→95**(불꽃 구름·복합 운용) | 패휘감이 실제 공격에 결합된 직접 성과와 **패기를 금쇄봉에 의도적으로 사용**한 숙련을 분리할 수 있음 | 그러나 **고급 패기 때문에 추가된 정밀 제어 성공**과 Base95 밖의 Technique Raw6 경계 미입증 → **P2 유지·재검증** |
| **카이도 Observation Defense2 + IQ2** (Ch.1042) | Defense Base99, Combat IQ Base90 | Snakeman 대응 회피(Defense)와 상대에 맞춘 예지 수단 선택(IQ)은 다른 기능 | **같은 예지 덕의 성공**을 2축 예외 Raw로 이중 수치화했는지 검증. Defense99+1=100 상한 적용도 함께 기록 → **P2** |
| **링링 Conquerors Attack6 + Technique6** (Ch.1011) | Attack Base95가 강력한 직접 타격, Technique Base **v0.4.21에 91→93**(호미즈 정밀 운용) | 페이지 원에게 의도적인 패휘감 주먹을 적중, Technique의 패휘감 운용도 정성 기여 가능 | **같은 적중 하나를 추가 공격/고급 제어 두 효과로 증명했는가**, 숙련 Base93 밖의 예외 증분 분리 필요 → **P2** |
| **현재 레일리 Armament Attack4 + Technique4** (Ch.597) | Attack Base87, Technique Base94 | 실제 무장색 시연은 공격 활용 방식과 지도 가능한 패기 제어 숙련의 **서로 다른 기능** | **전투에서 강자를 상대로 만들어낸 독립적 *추가 공격 피해***는 훈련 시연으로 미확인. Technique Base94에 시연·교육 숙련 포함. **P1** |

**레일리 특별 유의:** 훈련 상황을 '원작에서 무장색 사용이 확인됐다'는 사실로 인정하면서도 그 **훈련 설명만으로 Attack의 독립 예외 Raw+4 실전 공격 마진**을 인증하지 않는다. 다른 실전 전투(보르살리노)와의 추가 효과 관계도 구분해야 한다. 반면 두 기능이 다르므로 **양 Stat에 Evidence 연결 자체는 가능**하다.

## 7. 다음 작업을 위한 판정 대기열과 변경 승인 계약

| 대기열 | 정확한 검증 질문 | **점수 유지** 원칙하의 후속 실행 |
|---|---|---|
| **P1-A 같은 Stat 두 Haki** | 샹크스 Technique Conq4/Obs4; 조로 Attack Arm4/Conq6: **같은 정밀 제어/같은 피해 결과에 Haki 타입만 두 번 태깅했는가?** | Ch.1079·Ch.1033–35 **해당 원작 컷 각각의 기전**을 직접 확인해 `distinctObservedMarginalEffect`와 `baselineExclusionReason`의 타입별 별도 문장을 작성 |
| **P1-B 세 Stat 하나의 충돌** | 가프/로저/록스/뉴게이트가 **공격/방어/숙련**을 각각 Raw8로 올릴 독립 성과가 있는가? | Ch.966/1155/1165 각자 **공격 성립·공격 상쇄·별도 정밀 제어** 컷 구분. **가프-로저 합동 공격**·상대 상태·시점 분리 필수 |
| **P1-C 훈련 시연** | 레일리의 **무장색 교육·시연**이 고급 공격 Raw4를 직접 뒷받침하는가? | Ch.597과 별도 실전 공격 근거 대조. Base 숙련과 Attack의 기존 일반 무장색 용도 중복 여부 분리 |
| **P2 복수 축** | 카이도 패휘감 Attack/Tec, 미래예지 Defense/IQ; 링링 Attack/Tec | 각각 **대상 효과와 Base 제외 사유** 기록, 모드·전투 조건 유지. 하나의 Haki 소유를 여러 수치 보너스로 자동 복제하지 않음 |
| **기존 P1** | 카타쿠리 Defense6/Tec6 | PR #169/170의 미래예지 독립성 심사 카드 **기존 판단 유지**, 중복 논문으로 재작성하지 않음 |
| **후속 8 Evaluation** | 상디·현재 가프·쿠잔·보르살리노·잇쇼·시류·버제스·현재 가반의 **1축씩 독립 Raw** | 공유 Evidence 우선 심사 후 개인별 `관측 추가 효과 / Base 배제` 검토. **공유되지 않는다고 승인된 양수 Raw는 아님** |

**이번 결과:** 11개 공유그룹 중 **9개 신규 인물 Evaluation / 10개 그룹을 심사 양식에 시범 적용해 위험/긍정/불확실성을 기록**하고, 기존 카타쿠리 1개 그룹은 선행 감사로 연결했다. 현행 **39개의 Raw 기여 기록, 18개 Raw 보유 Evaluation**은 이번 정적 추적 결과일 뿐 정책상 완전 재인증된 수를 뜻하지 않는다. **새 Raw 승인, 기존 Raw 제거·점수 재산정, 랭킹·매치업 변경, 파일 타입/검증기 변경 모두 없음.**

### 승인 전 절차
- **별도 원작 직접 판독**과 다른 캐릭터의 같은 축 **peer anchor**가 마련될 것.
- 수정 필요 여부 판단 후 **사용자에게 A 현행 유지 / B 특정 예외 Raw 제거·Base 보존 / C Base·Raw 함께 재평가** 등의 방식을 **실제 예상 영향**과 함께 제시할 것. 선택에 동의하기 전엔 정량 패치 금지.
- 실제 모델/평가 코드 변경 시 `@PatchCheck`/동등 영향 검토 → 현재/역사 데이터·82명/88 Eval/616축/18 Matchup/Rank·History·versionManifest 결과 회귀 → 근거·모델/데이터 버전 동기화 및 롤백 기준 보존. 패기 Raw 상한·계산식은 변경 승인 없이는 그대로.
- 이 검토 양식은 **검증/추적의 문서**이지 E1/E2/E3 등급의 변경이나 새로운 Raw 채점공식이 아님.

## 8. 자료 계층, 검증 범위 및 회귀 경계

**현행 소스:** `src/data/sample/evaluations.ts`, `src/data/repositories/evaluationRepository.ts`, `src/data/integrity/v050ReadOnlyAudit.ts`, `src/data/sample/v0427JinbeRecalibration.ts`, `v0429WhitebeardCommanders.ts`, `v0431SweetCommanders.ts`, `v0421EmperorTechniqueReview.ts`, `v046FiveCharacterReview.ts`, `src/data/sample/evidence.ts`, 신규/조건부 평가 파일 `v0412EightEvaluations.ts`, `v0413RemainingDraftPublication.ts`, `v0420MagellanRegistration.ts`, `v0428SupportAxisCalibration.ts`, `docs/HAKI_EXCEPTIONAL_RAW_INDEPENDENT_EFFECT_REVIEW_CARD_v1_0_2026-10-21.md`.
- **독립적으로 확인한 공식 보조 자료:** [ONE PIECE.com TV1112 — 샹크스/키드](https://one-piece.com/anime/67527/index.html), [TV1060 — 조로 엔마](https://one-piece.com/anime/61598/index.html), [TV1062 — 조로/킹](https://one-piece.com/anime/61675/index.html).
- **원작 컷 독립 검증 하지 않은 것:** Manga Ch.966, 1010–11, 1033–35, 1042, 1079, 1155, 1165 등 전체 전투의 페이지/기전. GitHub `canon` Evidence 인덱스의 세부 서술을 **독립 원작 확정 사실**로 승격시키지 않는다.
- **테스트로 실제 실행하지 않은 것:** `buildV050ReadOnlyAudit()` 런타임 실행, 웹앱 UI·실기기, 실제 새 점수 계산·랭킹/Matchup 반영. 이 보고서의 집계는 **소스 정적 추적**이며 PR docs-only CI는 해당 파일의 스코프 검사만 할 수 있다.

**Git 변경 범위:** 본 Markdown 한 파일 추가. 평가·Raw·Evidence·Battle·캐릭터/시점·서술 데이터·모델/계산·Validator·Schema·버전/패치이력·Ranking·Matchup·UI·GitHub Pages **모두 불변**. CI 범위와 PR 병합은 실제 확인 후 별도로 보고한다.
