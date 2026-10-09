# v0.1.55 — 크래커·로·도플라밍고·징베·샹크스 31축 충분도 개별 검수

- 기준: `main@39383ba5ed1f43085a4f509e782bfe8ddf723553` (v0.1.54), 2026-10-09.
- 검수 범위: 59명/413축 중 이전 미분류 111축에서 실제 전투 사건 비교가 가능한 **5명 31축**. 31개 모두 **기존 Evidence와 Evaluator rationale을 개별 비교**, 공식 ONE PIECE.com TV episode 본문으로 핵심 장면 교차 확인. 만화 원문 패널 31개를 전부 직접 읽었다는 뜻은 아님.
- 결과: **E1 9, E2 20, E3 2**(추가). 미분류 **111→80**. 기존 전체 분포 E1 30/E2 169/E3 103/missing111 → **E1 39/E2 189/E3 105/missing80**.
- `E1`: 직접·반복 근거의 밀도가 높아 현행 평가축에 연결 가능. `E2`: 전투력은 평가 가능하나 특정 표본·상대 상태·조건 제한이 남음. `E3`: 높은 점수도 직접 근거/순수 속도 분리의 불확실성 때문에 강한 잠정성을 보유. **E1/E2는 숫자 점수의 진리성이나 논쟁 종결을 뜻하지 않는다.**
- 핵심 모델·계산·점수·캐릭터·Battle·Evidence·Haki Raw·Matchup·UI/저장 호환성은 **변경 없음**. 이번 소스 수정은 `src/data/sample/evaluations.ts`의 기존 31개 `readiness` 메타데이터만임.

## 1. 31축 단위 판단 기록

| # | 캐릭터 | 축 | 현재 Base 점수 | 근거 충분도 | 연결된 기존 Evidence ID | 사실/전투 조건과 축별 판정 해석 |
|---:|---|---|---:|---|---|---|
| 1 | `cracker` | `attack` | 75 | **E2** | `evidence-cracker-biscuit-837-838`, `evidence-cracker-urouge-837` | Gear 4 루피 팔에 무장색 검격을 실제 적중. 우루지 제압은 별도 정황이며 장기간 반복 결정력·패기 Base/Raw 이중가산 금지. |
| 2 | `cracker` | `defense` | 81 | **E2** | `evidence-cracker-biscuit-837-838`, `evidence-cracker-long-battle-842` | 비스킷 방패가 공격을 막은 직접 장면. Gear 4에 파괴되고 나미의 수분으로 약화된 상성 제약도 함께 기록. |
| 3 | `cracker` | `stamina` | 80 | **E2** | `evidence-cracker-long-battle-842` | 약 11시간 비스킷 병사 생성·운용은 능력 지속 성과. 본체가 11시간 동안 직접 피격을 견뎠다는 뜻은 아님. |
| 4 | `cracker` | `techniqueMastery` | 80 | **E2** | `evidence-cracker-biscuit-837-838`, `evidence-cracker-long-battle-842` | 비스킷의 갑옷·병사·무기화와 장시간 조작이 구체적. 능력 지속 능력과 별도 기술 숙련을 중복 고평가하지 않음. |
| 5 | `cracker` | `versatility` | 77 | **E2** | `evidence-cracker-biscuit-837-838`, `evidence-cracker-long-battle-842` | 병사 생성/방어/본체 은폐/검격이 실제 수행된 역할. 한 열매 시스템의 수단이므로 마르코 등 별도 지원 능력과 구분. |
| 6 | `law` | `attack` | 86 | **E1** | `evidence-law-big-mom-1039`, `evidence-law-puncture-wille-1039`, `evidence-law-teach-1064` | 드레스로자의 Gamma Knife, 빅맘의 내부 손상, 티치전 Shock Wille 등 서로 다른 강자 상대 직접 공격 반복. 빅맘의 최종 패배는 키드와의 공동 공격, 낙하·폭발까지 포함된 결과로 분리. |
| 7 | `law` | `defense` | 83 | **E2** | `evidence-law-big-mom-1039`, `evidence-law-teach-1064` | ROOM 대응·빅맘의 타격 중 기술 유지·티치와의 교전은 인정. 피격 후 버틴 Stamina와 공간 이동의 Speed 중복은 배제. |
| 8 | `law` | `stamina` | 85 | **E2** | `evidence-law-big-mom-1039`, `evidence-law-puncture-wille-1039` | 옥상전 후 빅맘전의 연속 각성 사용과 Puncture Wille 중 난타 견딤. 고갈을 언급한 한계와 다른 전투원의 참전 조건을 남김. |
| 9 | `law` | `speed` | 82 | **E3** | `evidence-law-teach-1064` | 티치전의 빠른 공방·ROOM 조작은 있으나 공간이동을 신체 반응 속도 82의 반복·독립 근거로 직접 환산할 수 없음. |
| 10 | `law` | `techniqueMastery` | 90 | **E1** | `evidence-law-doflamingo-gamma-knife-781`, `evidence-law-big-mom-1039`, `evidence-law-haki-nullification-1063` | ROOM·Shambles·K-ROOM·R-ROOM·의학적 공격/상태 해제를 서로 다른 전장에서 정밀 운용한 여러 직접 기록. |
| 11 | `law` | `combatIQ` | 88 | **E1** | `evidence-law-doflamingo-gamma-knife-781`, `evidence-law-haki-nullification-1063` | 드레스로자 기습·죽은 척/위치교환 전술과 와노 이후 패기 해제 경험의 독립적인 판단·실행 기록이 복수로 연결됨. |
| 12 | `law` | `versatility` | 91 | **E1** | `evidence-law-doflamingo-gamma-knife-781`, `evidence-law-big-mom-1039`, `evidence-law-haki-nullification-1063`, `evidence-law-teach-1064` | 근접/내부 타격, 다인 지원·위치 변경, 상태 대응이 드레스로자·와노·위너섬 전반에서 실제로 반복 관찰됨. 기술 수 단순 합산 금지. |
| 13 | `doflamingo` | `attack` | 76 | **E2** | `evidence-doflamingo-law-arm-769`, `evidence-doflamingo-gear4-784-785` | 로의 팔 절단은 직접 결정력 성과이나 Gear 4 루피 상대로 결정타 한계. Birdcage의 지형/민간인 위협을 대인 공격 성과로 합산 금지. |
| 14 | `doflamingo` | `defense` | 74 | **E2** | `evidence-doflamingo-gear4-784-785`, `evidence-doflamingo-organ-repair-781` | 실·각성 지형의 방어 사용도 있었으나 Gear 4에 반복 밀림. Gamma Knife 이후 봉합은 방어 성공이 아님. |
| 15 | `doflamingo` | `stamina` | 81 | **E2** | `evidence-doflamingo-organ-repair-781`, `evidence-doflamingo-gear4-784-785` | 내장 파괴 후 실 봉합과 Gear 4 공방 지속은 직접 성과. 봉합은 임시 처치이지 완전 치유·무한 체력 아님. |
| 16 | `doflamingo` | `speed` | 75 | **E2** | `evidence-doflamingo-gear4-784-785` | 상위권과 공방 및 공중 기동은 인정하지만 Gear 4의 빠른 연속 공격에 대응 한계가 드러난 조건부 장면. |
| 17 | `doflamingo` | `techniqueMastery` | 87 | **E1** | `evidence-doflamingo-law-arm-769`, `evidence-doflamingo-organ-repair-781`, `evidence-doflamingo-awakening-785` | 로의 팔 절단, 장기 임시 봉합, 실 각성·지형 실 변환을 서로 다른 역할로 정밀 실행한 복수 직접 표본. |
| 18 | `doflamingo` | `combatIQ` | 81 | **E2** | `evidence-doflamingo-organ-repair-781`, `evidence-doflamingo-awakening-785` | 상대 위치교환 방어·Gear 4의 시간 제약 인지·손상 후 대응을 인정. 국가 운영 능력/일반 지능은 제외. |
| 19 | `doflamingo` | `versatility` | 83 | **E1** | `evidence-doflamingo-law-arm-769`, `evidence-doflamingo-awakening-785`, `evidence-doflamingo-birdcage-781-790` | 절단·방어·임시 봉합·각성 지형 통제·Birdcage 등 독립 역할이 반복 확인됨. Birdcage를 1대1 타격력으로 옮기지 않음. |
| 20 | `jinbe` | `attack` | 76 | **E2** | `evidence-jinbe-fishman-karate-629`, `evidence-jinbe-whos-who-1018` | 후즈후를 어인공수도·무장색으로 제압한 직접 타격. 빅맘에게 가한 물/반격은 환경 조건과 구분. |
| 21 | `jinbe` | `defense` | 78 | **E1** | `evidence-jinbe-big-mom-890`, `evidence-jinbe-whos-who-1018` | 빅맘의 공격을 잠시 무장색 방어한 장면과 후즈후의 지건 난타에 대응한 서로 다른 상대·환경의 반복 직접 방어 기록. 빅맘에게 힘에서 밀린 한계 포함. |
| 22 | `jinbe` | `stamina` | 80 | **E1** | `evidence-jinbe-ace-five-days-552`, `evidence-jinbe-akainu-575`, `evidence-jinbe-whos-who-1018` | 에이스와 5일 결투 후 동시 쓰러짐, 정상결전에서 부상 중 루피 보호 임무 지속 등 다른 상황의 반복 지속력 확인. 5일 전투 상세는 프로젝트 manga 근거에 의존. |
| 23 | `jinbe` | `techniqueMastery` | 83 | **E1** | `evidence-jinbe-fishman-karate-629`, `evidence-jinbe-whos-who-1018` | 물·상대 신체 수분을 매개로 한 어인공수도와 후즈후 대상 무장색 결합 직접 적용 등 능력 숙련을 반복 확인. |
| 24 | `jinbe` | `combatIQ` | 80 | **E2** | `evidence-jinbe-big-mom-890` | 빅맘/프로메테우스 상대로 물을 이용해 위치·상성을 활용한 판단. 상대 전술 패턴을 반복 분석하는 고급 결투 IQ까지 확정하지 않음. |
| 25 | `jinbe` | `versatility` | 79 | **E2** | `evidence-jinbe-fishman-karate-629`, `evidence-jinbe-big-mom-890` | 육상 근접 타격·물 매개 원거리/상성 방어·아군 보호 등 적용 역할 확인. 종족 특성 존재 자체는 보너스 아님. |
| 26 | `shanks` | `attack` | 94 | **E2** | `evidence-shanks-whitebeard-haki-434`, `evidence-shanks-kid-divine-departure-1079` | 카무사리로 키드와 충전 중인 Damned Punk를 한 번에 제압한 직접 화력. 미래예지로 사전 대응한 사건이며 키드 해적단 선박 파괴는 도리·브로기의 성과. |
| 27 | `shanks` | `defense` | 91 | **E2** | `evidence-shanks-sakazuki-block-579` | 코비에게 향한 사카즈키의 마그마 타격을 검으로 실제 막은 직접 기록 1개. 사카즈키와 무제약 장시간 1대1 방어 성과는 아님. |
| 28 | `shanks` | `speed` | 95 | **E3** | `evidence-shanks-kid-divine-departure-1079`, `evidence-shanks-sakazuki-block-579` | 키드의 함대 공격 미래를 미리 확인한 상태에서 신속 요격한 강력한 기동 사례지만, 미래예지 분리 후 '순수 Speed 95'의 반복 독립 비교 표본은 부족. |
| 29 | `shanks` | `techniqueMastery` | 92 | **E2** | `evidence-shanks-whitebeard-haki-434`, `evidence-shanks-kid-divine-departure-1079` | 카무사리 패왕색 연계, 흰수염과의 검격 충돌은 유의미하나 검술 자체 수준과 Raw 패기 강화의 중복 계산을 경계. |
| 30 | `shanks` | `combatIQ` | 91 | **E2** | `evidence-shanks-aramaki-haki-1055`, `evidence-shanks-kid-divine-departure-1079` | 키드의 미래 위험을 확인하고 함대 보호를 최우선으로 선택한 실제 의사결정. 견문색 정보의 Raw 반영과 구분. |
| 31 | `shanks` | `versatility` | 88 | **E2** | `evidence-shanks-aramaki-haki-1055` | 원거리 패왕색으로 아라마키 견제, 키드 상대로 근거리 공격·미래 위험 대응 등 서로 다른 임무 기록. 상대 전체 전력이 철수 판단에 미친 영향은 분리. |

**주의:** 위 값은 해당 EvaluationItem의 `score`(Base)이며, 실제 비교 UI의 **Final은 기존 Haki Raw×0.5를 합산한 값**이다. 본 표에 적힌 점수는 Final 변화를 의미하지 않는다.

## 2. 공식 TV 줄거리 교차 대조와 원작 구분

- **크래커:** 공식 TV [805화](https://one-piece.com/anime/o4513/index.html), [806화](https://one-piece.com/anime/o4517/index.html)는 루피·나미의 수분 상성, 비스킷 병사 반복 생성·전술 대응과 Tankman 마무리를 확인한다. 근거 맥락은 1대1 단독 결투가 아니라 나미의 개입이 있는 전투다. '비스킷 운용 11시간' 수치는 기존 Manga Ch.842 프로젝트 Evidence의 인용이며 TV 요약에서 직접 시간 수치까지 재검증하지 않음.
- **로:** 공식 TV [722/723화](https://one-piece.com/anime/o2837/index.html)는 드레스로자의 기습·Gamma Knife 및 루피 개입을, [1066화](https://one-piece.com/anime/62293/index.html)와 [1067화](https://one-piece.com/anime/62440/index.html)는 K-ROOM/Puncture Wille, 빅맘 반격, 키드의 Damned Punk·낙하·마그마 폭발을 구분해 보여준다. 키드와의 공동 승리를 로 개인 1대1 결정력으로 환산하지 않는다. Winner Island 티치 교환·Doc Q Haki 해제의 세부는 기존 Manga Ch.1063~1064 인용에 의존.
- **도플라밍고:** 공식 TV [723화](https://one-piece.com/anime/o2839/index.html)는 장기 손상·내부 임시 봉합을, [726화](https://one-piece.com/anime/o2845/index.html)·[727화](https://one-piece.com/anime/o2847/index.html)·[728화](https://one-piece.com/anime/o2849/index.html)는 Gear 4에 밀리면서 실 각성 지형 통제로 전환한 상황을 확인한다. [680화](https://one-piece.com/anime/o2753/index.html)는 Birdcage의 민간인·지형 위협을 확인. 공격·방어와 지구력/Technique/Versatility 구별.
- **징베:** 공식 TV [461화](https://one-piece.com/anime/461/index.html)는 에이스와의 과거 결투를 언급하며 [1040화](https://one-piece.com/anime/o6327/index.html)는 후즈후의 지건을 견디고 어인공수도 오의로 대응한 장면을 확인. '에이스와 5일' 길이는 기존 프로젝트의 Manga Ch.552 Evidence를 따르며 TV 요약에서 독립 확인하지 못했다. 빅맘/프로메테우스 물 상성·해상 환경은 Manga Ch.890 Evidence.
- **샹크스:** 공식 TV [1112화](https://one-piece.com/anime/67527/index.html)에서 미래의 함대 피해를 보고 키드 선박에 혼자 접근해 카무사리로 제압한 사실과 **도리·브로기가 함선을 따로 파괴한 사건**을 명시한다. 고속 요격의 단일 장면은 인정하되 견문색 미래예지와 물리 Speed 수치(95)의 독립 반복 검증이 부족하므로 E3. 마린포드 코비 보호와 와노 원거리 패왕색은 기존 Manga Ch.579/1055의 프로젝트 Evidence.

## 3. 모델 무결성/추가 감사 주의

- 전 수치/표기: 기존 Final 59×7, 7축 동등 평균, Haki Raw 244, Balanced v1.2 Raw×0.5, Evaluation 62 / total 434 items, Matchup 15 **변경 없음**.
- 상태 등급 변화가 Rank에 가산/감점되지 않음: E3 샹크스 95 Speed, 로 82 Speed 그대로 유지. 다수전 출처를 1대1 승부 증거로 변환하지 않음.
- **남은 미분류 80축:** Primary **49** / Secondary **31**, 모두 1개 이상 linked Evidence ID. [111축 전체 before→after 추적표](./V0_1_55_111_AXIS_TRACE_2026-10-09.md).
- 이 배치는 새 Evidence 생성·기존 Evidence fact 변경이나 원작 컷 전체 직접 확인이 아니다. 미분류 80축을 대량으로 E2/E3 보정하지 않는다.
- 다음 우선순위(고점/모델 민감도): 가프 7, 티치 6, 쿠잔 5, 키자루 6, 미호크 5, 조로/상디 각 6. 낮은 자료 밀도: 비스타 4/잭 3/스무디 4/시류 3/반 오거 3/바제스 3/피사로 3. **각 캐릭터별 동일 7축 표준과 근거 축을 교차 대조하며 소규모 PR**로 검수.
- [축 검수 이후 로드맵](./V0_1_54_POST_AXIS_AUDIT_ROADMAP_2026-10-09.md) 단계 A 잔여 80축 → 단계 B 59×7 점수·Overall 민감도 → 단계 C 설명 UX → 단계 D 직접 대진/시나리오 → 단계 E 캐릭터·평가 버전 확장.

**보수적 기록 원칙:** 프로젝트 Evidence의 `canon` 참조와 ONE PIECE.com 공식 TV 줄거리 `supplementary` 교차확인을 구분한다. 예시 1차 원작 Chapter 837/838/842, 769/781/784/785/790, 552/575/890/1018, 1039, 1055, 1063/1064, 1079는 기존 데이터 기록으로 출처를 명시하되 직접 모든 컷을 열어 보았다는 주장은 하지 않는다.
