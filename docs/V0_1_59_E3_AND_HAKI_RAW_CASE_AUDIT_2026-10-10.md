# v0.1.59 — 고득점 E3 14축과 동일 Evidence Haki Raw 13건 개별 심화검수

**기준:** `main@ec32987005ebab5c2b3aec5763854e47bfc5c842` · 2026-10-10  
**성격:** 읽기 전용 검수·결정 지원. 현행 수치의 옳고 그름을 단정하거나 실제 재산정·점수 승인·원작 컷 독립 열람을 주장하지 않는다.

## 0. 범위·방법과 증거 수준
- v0.1.58의 59명/413축(E1=53, E2=243, E3=117), 62 Evaluation/434 Stat, 대표 Raw226/전체 Raw244, 동일 Evidence 다축 Raw 13건, 직접 Matchup15건을 **재사용**한다. 413축 분류는 반복하지 않는다.
- `evaluations.ts` 각 `EvaluationItem`의 `baseScore / hakiContributions / rationale / evidenceIds / readiness`를 `evidence.ts`의 `fact / interpretation / uncertainty / statContributions`와 대조했다. 원작 참고 장 번호는 **현재 저장된 Evidence의 출처 표기**이다.
- 공식 ONE PIECE.com 애니 줄거리 일부를 외부 교차 확인했다. 공식 줄거리는 원작 만화 **패널 전체를 직접 확인한 증거가 아님**. 공식 프로필과 팬 평가·점수는 또 별개다.
- **판정 용어:** 유지 가능 = 현재 해석이 모순된다고 입증되지 않음(확정 승인 아님); 원작 검증 = 특정 장면/상황 확인 필요; Base/Raw 중복 위험 = 같은 실제 효과의 가산 가능성; 재산정 검토 = 점수 혹은 Raw 보정안을 *검토할 사유*가 확인됨. 어느 표현도 실제 오류/자동 감점이 아니다.
- **상태·시점:** 가프·뉴게이트는 전성기 대표 평가. 노년 장면은 별도 시대의 보조 정황이지 전성기 기여 수치를 직접 측정한 관찰치가 아니다.
- 계산은 현행 `Final=min(100, Base+Raw×0.5)`, `Overall=sum(Final 7개)/7`. E등급은 수치 계수가 아니다.

## 1. 고득점 E3 14축 — 실제 현행 원자료와 개별 판단
모두 대표 평가 `Raw=0`인 축이다. 아래 Final과 Overall은 **실제 현행값**이며, 상황과 판단은 코드의 평가/근거를 검토한 **분석**이다.

| 대상/축 | Base / Raw / Final | 현재 Overall | 현재 연결 Evidence·맥락 | 판단·재확인할 이유 |
|---|---|---:|---|---|
| 가프(전성기) Stamina | 99 / 0 / 99 | 97.429 | `evidence-garp-roger-rocks-1165`; `evidence-garp-kuzan-haki-1087`. 전성기 **공동전**의 최종 공방과 노년 부상 후 활동 | **재산정 검토 필요**: 전성기 단독 장기전 지속시간·소모가 99라는 절대치를 독립적으로 지지하는지 미확인. 노년 기록 합산 금지 |
| 가프(전성기) Speed | 98 / 0 / 98 | 97.429 | `evidence-garp-roger-rocks-1165`; `evidence-garp-blue-hole-1081`. 공동 근접 공방과 노년 Blue Hole | **추가 원작 검증 필요**: 근접 반응과 장거리 이동 속도 구분, 노년→전성기 수치 외삽. 키자루 Speed99(E1) 같은 축 앵커 |
| 가프(전성기) Combat IQ | 97 / 0 / 97 | 97.429 | `evidence-garp-roger-rocks-1165`; `evidence-garp-rescue-command-1088`. 로저와 협동, 노년 구조전 지시 | **추가 원작 검증 필요**: 협동 승리조건 중 가프 단독 전술 기여 분리. 로 CombatIQ88(E1)과 사례 직접성 비교 |
| 가프(전성기) Versatility | 91 / 0 / 91 | 97.429 | `evidence-garp-roger-rocks-1165`, `evidence-garp-galaxy-impact-1080`, `evidence-garp-galaxy-divide-1088`, `evidence-garp-rescue-command-1088` | **재산정 검토 필요**: 전성기 직접 권격·패기 표본에 노년의 보호·지휘·범위 공격 역할을 합성했는지; 별개의 전투 수단과 같은 권격 파생 효과 구분 |
| 샹크스 Speed | 95 / 0 / 95 | 92.571 | `evidence-shanks-kid-divine-departure-1079`, `evidence-shanks-sakazuki-block-579`. 키드의 예견된 공격 전 요격·정상결전 개입 | **추가 원작 검증 필요**: 고속 접근은 확인되나 미래예지에 따른 선행 출발·경계 상태와 신체 속도 분리. 상디91(E1)과 반복성 비교 |
| 샹크스 Stamina | 88 / 0 / 88 | 92.571 | **연결 Evidence 0건.** 장기 고강도 1:1 지속 표본 부족을 평가자가 명시 | **추가 원작 검증 필요**: 88이 반증됐다는 뜻은 아님. 새 원작 표본 없이는 유지하되 수치 잠정성 공개 |
| 미호크 Speed | 94 / 0 / 94 | 92.714 | `evidence-mihawk-luffy-560-561`, `evidence-mihawk-vista-561-562`, `evidence-mihawk-shanks-rivalry-profile` | **추가 원작 검증 필요**: 루피 추격·비스타 대응은 반응 사례; 샹크스와의 과거 명성이 현재 순수 기동94의 독립 증거인지 검토 |
| 미호크 Combat IQ | 92 / 0 / 92 | 92.714 | `evidence-mihawk-zoro-49-51`, `evidence-mihawk-luffy-560-561`. 상대 수준 파악, 공격 수단 선택 | **추가 원작 검증 필요**: 실전 반복 공략 표본이 적고 후반 고급 전술 앵커(로88 E1)와 조건 비교 필요 |
| 미호크 Stamina | 91 / 0 / 91 | 92.714 | `evidence-mihawk-vista-561-562`, `evidence-mihawk-shanks-rivalry-profile`. 정상결전 단기 공방·과거 라이벌 관계 | **재산정 검토 필요**: 공개된 결투 기간/개인 소모가 불명확; 위상만으로 장기전91 정당화 불가. 쿠잔97(E1), 잭88(E1) 비교 |
| 쿠잔 Combat IQ | 91 / 0 / 91 | 92.714 | `evidence-kuzan-garp-iceball-1081`, `evidence-kuzan-garp-haki-clash-1087`. 빙결 실패 후 근접 대응 | **유지 가능(잠정)**: 전술 전환 사실은 있으나 가프 구조전/다수 적 개입 때문에 일대일 판단 우위까지 검증된 것은 아님 |
| 로쿠규 Defense | 89 / 0 / 89 | 87.571 | **현재 축 직접 연결은 `evidence-aramaki-shanks-haki-1055`**. 기존 rationale은 *식물 재생 후 복구*를 방어 근거로 기재 | **재산정 검토 필요/근거 연결 불일치**: 샹크스 패기에 철수한 사건은 방어 차단·식물 재생의 직접 입증 사건이 아님. 공식 TV1082 재생 장면은 따로 확인됨. 우선 Evidence 연결·Defense vs Recovery 분리 검토 |
| 로쿠규 Stamina | 89 / 0 / 89 | 87.571 | `evidence-aramaki-scabbards-tv1081`, `evidence-aramaki-regrowth-tv1082`; 다수 상대/재생 후 지속 | **추가 원작 검증 필요**: 재생 후 다시 움직인 사실과 높은 독립 장기 지구력은 구별, 참전 인원·교전 강도 확인 |
| 후지토라 Stamina | 87 / 0 / 87 | 89.000 | `evidence-fujitora-luffy-exchange-tv743`; 드레스로자의 짧은 교환과 연속 임무 | **유지 가능(잠정)**: 근거 문장 자체가 10일 결투 미확인을 인정. 87의 정밀도는 검증되지 않았지만 낮춰야 한다는 직접 반증도 없음 |
| 사카즈키 Speed | 86 / 0 / 86 | 92.429 | **연결 Evidence 0건.** 라쇼날은 상위 반응/직접 순수 기동 표본 부족 명시 | **추가 원작 검증 필요**: 쿠잔과 10일 결투는 Stamina용이지 Speed86의 증거가 아님. 기습·반응·이동 사례를 별도 발굴 |

**같은 축 교차 앵커:** Speed 키자루99(E1)/상디91(E1); Stamina 쿠잔97(E1)/잭88(E1); CombatIQ 로88(E1); Defense 죠즈84(E2)/상디85(E1); Versatility 티치93(E1)/로91(E1). 이 앵커들은 **교전 환경·능력 메커니즘을 비교할 출발점**이지 모든 장면에 통일된 숫자 환산 단위가 아니다.

**14축의 문제 유형:** 기존 사건이 고점을 전혀 입증하지 않는다고 단정하지 않는다. 단, (1) 전성기-노년의 시대 혼재, (2) 직접 연결 부족 2축, (3) 재생→방어 혼동, (4) 미래예지→Speed 과해석, (5) 명성→개인 교전 지속력 외삽 등은 실제 점수 변경 **전** 재확인이 필요한 서로 다른 원인이다.

## 2. 동일 Evidence 기반 복수 Haki Raw 13건 — 개별 판정
각 건의 `#`는 **같은 Evidence ID의 축 재사용 사건 수**다. 다축 효과가 실제로 분리된다면 여러 축에 연결 자체는 허용된다. 아래 판정은 현재 승인된 [하이브리드 Haki 예외적 증가분 기준](../docs/HYBRID_HAKI_CRITERIA_2026-10-09.md)을 참고한 **위험 검토**, 확정 오류가 아니다.

| # | 대상 · Evidence (원작 참조) | 공유 Raw 축 / 현행 Raw | 직접 사실과 전투 조건 | 우선 판정 / Base와 분리해야 할 증명 |
|---:|---|---|---|---|
| 1 | 비스타 `evidence-vista-armament-akainu-574` (Ch.574) | Attack4 / Technique2 | 마르코와 합동 무장색 검격, 아카이누 지속 피해 미확인 | **재산정 검토 필요**: 통상 무장색 공격/검술 운용을 Base에도 이미 평가; 두 축의 *독립 예외 효과* 증명 없음 |
| 2 | 킹 `evidence-king-armament-1032` (Ch.1032) | Attack4 / Technique2 | 무장색 검과 조로의 검이 충돌, 최상위 독립 패기 제어는 미확인 | **재산정 검토 필요**: 통상 검 코팅이 Attack/Technique Base와 따로 증가분인지 재검토 |
| 3 | 카타쿠리 `evidence-katakuri-future-sight-881-884` (Ch.881–884) | Defense6 / Technique6 / IQ4 | 침착할 때 짧은 미래를 읽어 모치 부분 변형·회피·선제 대응 | **Base/Raw 중복 위험**: 미래라는 **한 정보**를 3개 Raw에서 가산. 회피·제어·선택의 별도 관찰 효과 필요 |
| 4 | 조로 `evidence-zoro-conquerors-1033-1035` (Ch.1033–1035) | Attack(해당 ID의 기여 존재) / Technique4 | 엔마의 패기 소비를 받아들이고 패기를 실은 검격으로 킹 격파, 무제한 유지 미확인 | **추가 원작 검증 필요**: 무장색/패왕색 Attack 기여와 Technique 제어의 별도 증가분 및 Base 중복 비교. Attack 총 Raw10을 이 ID 단독값으로 오해 금지 |
| 5 | 징베 `evidence-jinbe-whos-who-1018` (Ch.1018) | Attack4 / Defense4 | 후즈후의 공격을 무장색으로 방어, 손가락 손상·반격, 근접 교환 | **재산정 검토 필요**: 공격과 방어는 별개 성과일 수 있지만 통상 경화를 양쪽 예외 Raw로 더할 독립 근거가 부족 |
| 6 | 샹크스 `evidence-shanks-kid-divine-departure-1079` (Ch.1079) | Attack6 / Technique8(패왕4·견문4) / IQ4 | 함대 피해 미래예지→빠른 접근→카무사리로 키드 제압. 거인들의 배 파괴는 별도 | **Base/Raw 중복 위험**: Base Attack 결정력·Base IQ 목표 선택·Technique 운용과 Raw의 중첩 및 Technique 한 축의 이종 Haki 2건을 각각 심사 |
| 7 | 가프(전성기) `evidence-garp-roger-rocks-1165` (Ch.1165) | Attack8 / Defense8 / Technique8 | 로저와 공동 최종 공격으로 변형 록스를 제압; 가프 단독 기여 비율 미분리 | **추가 원작 검증 필요**: 공격·방어·정밀 제어가 장면 안에서 독립적으로 확인되는지, 협동 성과·시대 분리 |
| 8 | 로저 `evidence-roger-haki-analysis-rocks-1165` (Ch.1165) | Attack8 / Defense8 / Technique8 | 변형 록스 상대 패기 상쇄 관계 분석 뒤 가프와 합동 공격 | **추가 원작 검증 필요**: 상쇄/공격/출력 제어의 별도 효과 및 다른 로저 전투 Evidence와의 중복 |
| 9 | 록스 `evidence-rocks-harald-1155` (Ch.1155) | Attack8 / Defense8 / Technique8 | 자연 상태 하랄드와 패왕색·검술 충돌, 별도 방어·정밀 제어의 전모 한정 | **추가 원작 검증 필요**: 강한 충돌이 자동으로 세 축 독립 Raw를 뜻하지 않음; 공격↔차단/기술 분해 |
| 10 | 뉴게이트(전성기) `evidence-newgate-roger-966` (Ch.966) | Attack8 / Defense8 / Technique8 | 로저와 무기 비접촉 패왕색 공방; 3일 3야는 **해적단 전체** 전투 | **추가 원작 검증 필요**: 공격 충돌과 방어 상쇄는 구분 가능한 해석이지만 Technique 예외 Raw를 Base 밖으로 독립 증명해야 함 |
| 11 | 카이도 `evidence-kaido-zoro-luffy-1010` (Ch.1010) | Attack6 / Technique6 | 패왕색 두르기를 설명·금쇄봉에 운용; 조로 흉터·옥상 누적 피해 존재 | **Base/Raw 중복 위험**: 단일 강화 타격의 Attack 효과/운용 숙련을 Base+두 Raw로 재가산하는지 |
| 12 | 카이도 `evidence-kaido-future-sight-1042` (Ch.1042) | Defense2 / IQ2 | Snakeman에 견문색 미래예지로 회피·대응; 신체 Speed와는 별개 | **유지 가능(조건부)**: 회피와 전술적 대응은 기능적으로 구분되나 IQ Raw의 추가 효과가 Base 전술 적응에 포함되었는지는 확인 필요 |
| 13 | 링링 `evidence-linlin-pageone-1011` (Ch.1011) | Attack6 / Technique6 | Page One에 패왕색 두른 주먹 직접 적중; 대상이 최고위 방어 앵커는 아님 | **Base/Raw 중복 위험**: 동일 타격의 패기 강화 결과/기술 운용을 두 Raw+Base로 중복 반영했는지 |

**판정 집계(판정 1개/사건):** 유지 가능(조건부) 1 · 추가 원작 검증 필요 5 · Base/Raw 중복 위험 4 · 재산정 검토 필요 3 = **13**. 다른 부차 위험도 공존할 수 있으며 이 표의 집계는 확정 오류 건수가 아니다.

특히 **한 사건의 사실은 여러 축에 합법적으로 재사용 가능**하나 `Fact → Base`와 `Fact → Raw`가 같은 성과를 두 번 의미 없이 수치화하면 안 된다. 예외 Raw는 *패기의 존재·통상 운용*만으로 정당화되지 않고 Base 밖 **독립 효과**, 비교 앵커, 제외 사유와 사용자 승인까지 필요하다.

## 3. 공식 자료 교차 확인과 출처 한계
1. ONE PIECE.com **TV1112** (2024-07-14, https://one-piece.com/anime/67527/index.html): 샹크스가 산하 함대의 위험 미래를 보고 키드에게 단독 접근, 카무사리로 키드/전자기포 제압, **이후** 도리·브로기가 배 파괴. 고속 접근·대상 선택과 배 파괴 주체는 구분 가능. 해당 장면만으로 Speed=95의 절대 단위를 인증하지 않는다.
2. ONE PIECE.com **TV1082** (2023-11-05, https://one-piece.com/anime/64187/index.html): 모모노스케의 보로 브레스가 로쿠규를 불태웠지만 곧 식물 신체가 재생하고 샹크스 패기 개입 뒤 철수. **피격 차단**이 아니라 **피격 후 재생**이 직접 나타나는 근거라는 점이 Defense 평가 재검토 이유.
3. ONE PIECE.com **TV830** (2018-04-01, https://one-piece.com/anime/o4671/index.html)와 **TV857** (2018-10-14, https://one-piece.com/anime/o4869/index.html): 카타쿠리의 훈련된 견문색 미래예지, 침착함이 깨졌을 때 공략 가능성이 교차 확인됨. 미래예지를 신체 Speed로 환원하지 않음.
4. ONE PIECE.com **TV1121** (2024-10-06, https://one-piece.com/anime/69144/index.html), **TV1122** (2024-10-13, https://one-piece.com/anime/69263/index.html): 노년 가프는 코비를 보호하며 시류의 공격을 대신 받아 깊은 부상을 입었고, 피사로 방해·구조 지휘 속에서 전투했다. 다수전/보호·부상 상태를 전성기 솔로 근거로 재사용하지 않음.
5. **미검증:** Ch.1155/1165 등 만화 패널의 패기 메커니즘/단독 기여, 미호크 과거 결투 기간, 사카즈키 Speed, 13건 전부의 원작 해당 컷 독립 확인. 저장된 `source.reference` 문자열 자체가 외부 검증 완료를 뜻하지 않는다.

## 4. 객관적 다음 단계 기준
- **우선순위 1:** 로쿠규 Defense89의 Evidence 연결 적합성 및 방어/재생 분리; 샹크스 Ch.1079 Attack/Technique/IQ Raw 독립성; 카타쿠리 미래예지 3개 Raw; 비스타·킹·징베 통상 무장색 Raw가 기존 하이브리드 기준에 부합하는지.
- **우선순위 2:** 가프 Prime Stamina99/Versatility91의 시대 및 다수전 분리, 가프·로저 Ch.1165 공동 공격 세 축, 미호크 Stamina91/Speed94 외삽 문제.
- **우선순위 3:** 록스·뉴게이트·카이도·링링의 공방/숙련 별도 증거, 로쿠규 Stamina89, 미호크 IQ92, 샹크스 Stamina88, 사카즈키 Speed86, 후지토라 Stamina87, 쿠잔 IQ91.
- **판정 단계:** 새 원작 사실 확인 → Context/시점/기여 분리 → 기존 Base와 독립 Raw 배제사유 → 동일 축 E1/E2 앵커 → 구체적으로 정당화 가능한 후보값(있는 경우만) → Final/Overall/정렬 및 실제 15 Matchup 설명 영향 분석 → **사용자 개별 승인**.
- 이번 검수로 **새로운 원작 컷 독립 검증이나 보정량의 객관적 단위화가 완료되지 않았기 때문에**, 임의 ±3/±5 또는 일괄 E3 페널티로 실점수 변경할 사유는 아직 없다. E3는 전투 약함이 아니다.

**관련 기준:** `PROJECT_SPEC.md` §4·5·6·7·9·10·11, `docs/HYBRID_HAKI_CRITERIA_2026-10-09.md`, `docs/V0_1_58_COMPREHENSIVE_SCORING_VALIDITY_AND_DECISION_BRIEF_2026-10-10.md`.