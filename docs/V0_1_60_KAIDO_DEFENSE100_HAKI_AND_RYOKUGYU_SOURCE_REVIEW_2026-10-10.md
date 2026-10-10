# v0.1.60 — 카이도 Defense 100 적용, 로쿠규 방어 근거 연결 정정, Haki Raw 5건 심화 카드

**기준 커밋:** `main@91ecd36c0e9c684b8c1f12e570a283b971fc96eb` (v0.1.59).  
**승인 범위:** 사용자가 “카이도 Defense 100이 타당하다면 적용”이라고 **조건부로 직접 승인**했다. 다른 캐릭터의 수치·Haki Raw 변경은 승인되지 않았다. 본 문서는 프로젝트의 **평가 결정**이지 공식 원작의 전투력 숫자나 과학적 측정이 아니다.

## 1. 카이도: 기존 Defense99와 최상위 상대 비교

### 기존 점수와 자료
- 기존 평가 시점: **전성기·오니가시마** `evaluation-kaido` / `evaluation-0.1.33-draft`.
- 현행 이전: Defense `Base98 + Observation Raw2×0.5 = Final99`, Stamina100.
- **원작을 참조하는 기존 Evidence:**
  - `evidence-kaido-linlin-951` (Manga Ch.951): 링링과 무기·패기가 충돌하는 최상위 공방, `Defense primary`. 최종 결착이 난 1:1 아님.
  - `evidence-kaido-future-sight-1042` (Ch.1042): Snakeman 공격에 견문색 미래예지로 회피·대응, `Defense primary`, 기존 Raw2의 **유일한** Observation 출처. 미래 정보를 신체 기동과 혼동하지 않음.
  - `evidence-kaido-raid-endurance-1000-1049` (Ch.1000–1049): 다수전·누적 피해·섬 이동·루피에게 최종 패배. `Defense primary`와 `Stamina primary` 역할이 함께 있지만 **지속한 사실 자체는 Stamina**에만 반영하고 방어에서 두 번 세지 않음.
- **이번 독립 외부 교차 확인:** ONE PIECE.com TV936 공식 줄거리는 루피가 **카이도의 단단한 비늘을 뚫을 공격을 익히려** 류오를 수련했다고 설명한다. 이는 통상적 공격에 대한 피해 경감의 기제에 관한 맥락이지 당시 카이도가 우동에 출전했다는 전투 기록이 아니다. `Evidence.battleId`가 필요한 현행 스키마에서 **우동 수련을 오니가시마 전투로 거짓 연결하는 신규 Evidence를 만들지 않았다**.
- ONE PIECE.com TV1028: 패왕색 충돌에서 루피가 금쇄봉을 튕겨냄. 공격적 패기 공방 중 방어 역할을 구분하는 참고 사례. TV1015는 류오 적용으로 카이도가 쓰러짐, TV1076은 Gear5 루피의 최종 타격을 기록. 100점은 **무적, 완전 회피 또는 무피해가 아니다**.

### 비교군 및 판단
| 비교군 | 기존 Defense Final | 비교 포인트 | 과대해석 방지 |
|---|---:|---|---|
| 카이도 | **99 → 100** | 기본 비늘 방어 + 최상위 공방 + 미래예지 회피라는 방어 경감/응답 기제가 각각 확인 | Stamina100의 누적 피해와 지속력을 Base99로 재가산하지 않음 |
| 링링 | 99 | 강한 자연 신체 방어, 정면 공방 | 카이도와 동급 공격을 받았다는 사실만으로 세부 무적 서열 정하지 않음 |
| 뉴게이트(전성기) | 99 | 로저와 패기 공방, 방어 성과 | 공동 세력 3일 교전을 개인 무피해로 환산하지 않음 |
| 로저 | 99 | 패기 상쇄와 최고 수준 공방 | 공동전 기여도/방어 차단 분리 |
| 가프(전성기) | 99 | 패기 공방 및 강자 교환 | 노년 구조전과 시대 구분 |
| 킹 | 88 | Flame ON 높은 방어와 Flame OFF 취약점 | 상태별 방어 조건을 무시한 절대 비교 금지 |

**판정:** 상대 평가 0~100의 상단점을 대표할 **다양한 직접 방어 메커니즘**과 기본 피해 경감이 카이도에게 확인돼, `Base98→99`의 제한적 상향이 합리적이라고 판단한다. 단, 비늘·미래예지·패기 공방의 정확한 "1점"은 원작이 측정해 제공한 수치가 아니라 **프로젝트의 앵커 기반 상대 평가**이다. Stamina의 연속 피격을 별도 방어량으로 산술 추가하지 않는다. 기존 `Observation Raw2`를 늘리거나 Haki 정책을 수정할 근거는 없다.

### 영향
- 변경 전 `Base98 Raw2 Final99 Overall96.571428...`.
- 변경 후 `Base99 Raw2 Final100 Overall96.714285...`; `ΔOverall=+1/7=+0.142857...`.
- 카이도 기본 7축은 `[98,100,100,96,96,91,96]`. 비교용 Overall 내림차순 59인 위치는 **5위→5위**. 기존 공동 순위 정책 변경 없음.
- 카이도↔링링의 **기존 직접 Evidence-aware Matchup**은 점수로 승부를 결정하지 않는다. 이 매치업의 `kaido-linlin-defensive-scale` 조건부 평가/우위 `none`은 그대로 둔다. 새로운 승리 확률 또는 상성 고정 보너스 없음.
- 카이도 `evaluationDataVersion`을 `evaluation-0.1.60-defense-evidence-calibrated`로 분리 표기. 이전 Base98/Final99는 v0.1.59 Git 기록과 기준표에 남으며 가짜 현재 Evaluation 복제는 추가하지 않는다.

## 2. 로쿠규 Defense89 — 근거 연결 검토 결과
- 기존 평가설명 "불에 탄 몸체를 재생"의 사실은 `evidence-aramaki-shanks-haki-1055`의 fact에도 기록돼 있다. v0.1.59의 '아예 기록 없음'처럼 해석하면 부정확하다. 그러나 해당 근거의 **Defense contribution은 context**이며 방어 차단/예방에 대한 직접 근거가 아니다.
- `evidence-aramaki-regrowth-tv1082`은 **Defense secondary**로 식물 신체 재생을 설명한다. 출처: ONE PIECE.com TV1082 공식 줄거리. 피격 뒤 재생은 재생 능력이지 보로 브레스를 막은 일은 아니다.
- 검증 결과: `evidenceIds`를 `[regrowth-tv1082, shanks-haki-1055]`로 연결하고 **방어와 재생을 구분하는 해설만 정정**, `Base89 Raw0 Final89 / E3 / Overall87.571...`은 유지. 상위권 순수 차단력의 독립 근거가 부족하며 재산정 수치 근거는 아직 없다.
- 새 `evaluationDataVersion`: `evaluation-0.1.60-defense-link-reviewed`. 원본 Evidence 자체를 수정하거나 재생에서 임의로 Defense 점수를 가산하지 않음.

## 3. 승인된 Hybrid/Exceptional Haki 기준 적용 — 5개 Review Card
**공통 원칙:** 원작 사실/전투 조건/해석/Base/Raw를 분리한다. 이미 Base에 반영한 동일 실제 효과나 통상 패기를 별도 Raw로 자동 가산할 수 없다. Source/한계는 기존 `evidence.ts`의 원작 Chapter 참조와 공식 TV 요약을 사용; **각 만화 컷의 독립 전수 감수는 미수행**. 아래에는 변경 수치 제안 없음.

### H01 비스타 · 통상 Armament
- Evidence: `evidence-vista-armament-akainu-574` (Ch.574). 마르코와 **합동 검격**; 아카이누가 패기 사용자로 지칭. 지속적으로 의미 있는 손상 여부 미확인.
- 현재: Attack `Base80/Raw4/Final82`, Technique `Base86/Raw2/Final87`.
- Base에 포함되는 관찰: 미호크와 짧은 검술 교환 및 아카이누에게 실전 검격을 적용한 사실.
- 독립 예외 Raw 입증: 최상위 무장색 수준/기본 검술보다 증가한 *별도의* 공격 효율과 운용 차별성이 직접 보이지 않음.
- `baselineExclusionReason`: **미충족**; 통상 검격이 Base에 이미 포함돼 있을 가능성. 후속 상태 **Raw 재산정 검토 후보**, 원작 컷 및 비교군 검토 전 **수치 보존**.

### H02 킹 · 통상 Armament
- Evidence: `evidence-king-armament-1032` (Ch.1032). 무장색을 검에 둘러 조로와 공방.
- 현재: Attack `Base83/Raw4/Final85`, Technique `Base80/Raw2/Final81`.
- Base에 포함되는 관찰: 검격, 불꽃, 고대종·루나리아 상태 전환. Flame ON 방어는 별개 기제.
- 독립 Raw 입증: 다른 검술과 분리 가능한 예외적 무장색 *추가 성과*가 이 장면에서 충분히 특정되지 않음.
- `baselineExclusionReason`: **미충족**; 통상 코팅은 Base 기본 실전 공방의 일부. **Raw 재산정 검토 후보**, 즉시 0으로 변경하지 않음.

### H03 징베 · 공수도 무장색 Attack/Defense
- Evidence: `evidence-jinbe-whos-who-1018` (Ch.1018). 후즈후 공격에 무장색 방어, 손가락 손상, 어인공수도 반격으로 마무리.
- 현재: Attack `Base76/Raw4/Final78`, Defense `Base78/Raw4/Final80`.
- Base에 포함되는 관찰: 어인공수도 실제 명중·저지 및 강적 방어/빅맘 차단 성과. **공격과 방어는 서로 다른 관찰 효과로 구분 가능**.
- 독립 예외 Raw 입증: 각각의 무장색이 통상 사용을 넘어 Base 밖에 남는 **예외적 증가분**인지 불명확.
- `baselineExclusionReason`: **미충족**, 두 종류의 관찰 성과가 서로 다르다는 사실만으로 두 Raw가 모두 정당화되지는 않음. **Raw 재산정 검토 후보**, 숫자는 유지.

### H04 카타쿠리 · 미래예지 3개 축
- Evidence: `evidence-katakuri-future-sight-881-884` (Ch.881–884), 침착함·집중이 필요. 공식 TV830·TV857은 미래예지와 집중조건을 보조 확인.
- 현재: Defense `81+Raw6→84`, Technique `84+Raw6→87`, IQ `82+Raw4→84`.
- Base에 포함되는 관찰: 부분 모치 변형/회피, 모치·무기 운용, 상대를 방해하는 전술적 결정. 미래의 '정보' 자체와 신체 속도는 구분.
- 독립 Raw 입증: Defense의 회피 결과는 구별 가능하지만 미래정보 하나가 Technique 정밀 운용과 IQ 판단에 *각기 다른 추가 효과*를 제공했다는 증거 및 `baselineExclusionReason`은 불충분.
- **Base/Raw 중복 위험**; 장면별 미래정보→실제 회피/모치 제어/독립 판단을 분리해 직접 컷 확인 후 사용자 승인. 수치·Readiness 불변.

### H05 샹크스 · 카무사리 3축/Technique 이종 Haki 2개
- Evidence: `evidence-shanks-kid-divine-departure-1079` (Ch.1079), 공식 TV1112: 산하 함대에 대한 미래 위협 인지→접근→키드·전자기포 선제 제압. 도리·브로기의 선박 파괴는 별개.
- 현재: Attack `94+Raw6→97`; Technique `92+Raw8(패왕4/견문4)→96`; IQ `91+Raw4→93`.
- Base에 포함되는 관찰: 일격 결정력, 선제 기동과 검격 운용, 산하 함대 보호라는 실전 목표 선택.
- 독립 Raw 입증: 패왕색의 직접 타격 강화와 미래정보 활용은 능력 유형이 다르지만, *한 결정타*를 Attack/Technique/IQ의 Base와 다수 Raw로 재차 계수하는지를 구분해야 함. Technique의 **두 Haki type이 동일 Stat에서 각기 다른 증분인가** 특히 미입증.
- `baselineExclusionReason`: **부분충족 가능/별도 검증 필요**; 사건 1건의 2타입·3축 분리 관찰 및 라이벌 앵커 비교. **Base/Raw 중복 위험**, 수치 보존.

**5카드 요약:** 통상 무장색의 독립 Raw 사유가 부족한 **비스타·킹·징베**는 수치 변경 후보, **카타쿠리·샹크스**는 복수 Raw의 중복 분리 감사 대상으로 남긴다. 이 5건은 **원작 컷 직접 검증·동일 축 비교·데이터 버전 영향 검토·사용자 개별 승인이 선행돼야 실제 숫자 변경 가능**하다.

## 4. 자료 출처·한계와 다음 단계
- ONE PIECE.com TV936 (2020-08-09), https://one-piece.com/anime/o5445/index.html
- ONE PIECE.com TV1015 (2022-04-24), https://one-piece.com/anime/o6081/index.html
- ONE PIECE.com TV1028 (2022-08-07), https://one-piece.com/anime/o6213/index.html
- ONE PIECE.com TV1076 (2023-09-17), https://one-piece.com/anime/63846/index.html
- ONE PIECE.com TV1082 (2023-11-05), https://one-piece.com/anime/64187/index.html
- ONE PIECE.com TV1112 (2024-07-14), https://one-piece.com/anime/67527/index.html
- ONE PIECE.com TV830 / TV857 (2018), https://one-piece.com/anime/o4671/index.html · https://one-piece.com/anime/o4869/index.html
- 원작 Manga Ch.574, 881–884, 951, 1000–1049, 1018, 1032, 1079: 현행 저장소 `Evidence.source.reference`의 **인용 표기**이며 이번 작업에서 전 페이지 만화 컷 독립 검증 완료를 뜻하지 않는다.

**v0.1.61 제안:** (1) 5 Haki 카드의 실제 만화/공식 출처 및 회피·검술·판단 독립 효과 확인, (2) 로쿠규의 공격 사전 차단 근거 발견 여부 검토, (3) 가프 Prime 시점과 Ch.1165 공동전·미호크 Stamina/Speed 점수의 실제 원작 표본 검수, (4) **그 이후** Base/Raw 이전과 숫자 조정은 사용자 선택 후 별도 소배치. 기존 UI, 저장/복원, 7축·Balanced1.2, Matchup15건은 건드리지 않는다.

### 참고문헌(APA 제7판 기준 간략)
Oda, E. (1997–현재). *ONE PIECE* [만화]. Shueisha. (개별 장 출처는 본문 내 Evidence ID 참조; 직접 장별 컷 재검증은 미수행).  
ONE PIECE.com. (2020, August 9). *第936話 会得せよ ワノ国の覇気・流桜!* https://one-piece.com/anime/o5445/index.html  
ONE PIECE.com. (2022, August 7). *第1028話 四皇を超えろ ルフィ反撃の鉄拳*. https://one-piece.com/anime/o6213/index.html  
ONE PIECE.com. (2023, September 17). *第1076話 ルフィの目指す世界！*. https://one-piece.com/anime/63846/index.html
