# v0.1.69 — 4인 9개 Haki Raw 기여의 실제 독립효과 및 중복 검증

기준 main: `fd45c55c095369f8fc52f6df917987d9f602e1b6` (v0.1.68 병합). 작업 목적: v0.1.66 승인 보류 영역을 정밀히 분해하여 **무장색·견문색·패왕색 보유·적용·특출남·Base 바깥의 독립 효과**를 따로 판정한다.

**사용자 게이트:** 이번 리뷰에서 **실제 Evaluation의 Base/Raw/Final, Model, Ranking, Matchup, Haki Contribution 값은 전혀 수정하지 않는다**. Vista Technique90 후보는 여전히 미적용. 패기를 완전히 제거한 가정의 샹크스/비스타 Overall 음수 시나리오를 생성하지 않는다.

## 1. 프로젝트에서 확인된 9개 Raw 사용 상태 — 조정 없이 유지

| 캐릭터 | Stat | 유형 | 현재 Raw | 공통 효과 식별자 | 독립 가산에 남은 질문 |
|---|---|---|---:|---|---|
| 비스타 | Attack | Armament | 4 | `joint-akainu-sword-hit-574` | 마르코 합동 검격의 유효 타격/관통 효과가 Base Attack80과 독립적인가? |
| 비스타 | Technique | Armament | 2 | **같은 Ch.574 합동 검격** | 검술 Base86 이상으로 구분되는 별도 패기 제어 효과가 있는가? |
| 샹크스 | Attack | Conquerors | 6 | `kid-divine-departure-hit-1079` | 카무사리의 본래 실제 결정력(Base94)과 패왕색의 독립 추가 피해를 분리할 수 있는가? |
| 샹크스 | Technique | Conquerors | 4 | **같은 Ch.1079 카무사리** | 하나의 검격 피해가 공격/숙련에서 추가 효과를 각각 증명하는가? |
| 샹크스 | Technique | Observation | 4 | `kid-future-sight-1079` | 미래예지에 따라 실제 검격 제어에 별개 기술 효과가 있었는가? |
| 샹크스 | Combat IQ | Observation | 4 | **같은 Ch.1079 미래 정보** | Base IQ91에 ‘위협 인지→선제 판단’을 이미 포함한 상태에서 새로운 IQ 효과가 있는가? |
| 카타쿠리 | Defense | Observation | 6 | `katakuri-future-sight-mochi-evasion-881-884` | 실제 선행 회피는 확인되나 Defense Base81의 모치 변형·회피와 중복되는가? |
| 카타쿠리 | Technique | Observation | 6 | **같은 미래예지·모치 회피** | 신체 정밀 제어 Base84와 Defense Raw6에 없는 별도의 Technique 순증은 무엇인가? |
| 징베 | Defense | Armament | 4 | `jinbe-armament-defensive-hardening-890-1018` | 빅맘/후즈후 방어 사실은 각각 확인되나 Base Defense78과 구별되는 예외적 Raw4를 어떻게 입증하는가? |

9개 Raw의 공통 사건효과는 **5개 식별자**로 정리된다. 이는 9건 Raw가 전부 잘못되었다는 결론도, 모두 5건으로 합쳐야 한다는 뜻도 아니다. *공유 전투결과·패기 능력 효과·완전히 독립된 스탯별 증분*을 구분해야 한다는 감사 장부다.

## 2. 각 인물의 사실·조건·해석

### 비스타 — Ch.574 별개 무장색 검격

- **원작 기반 기존 Evidence:** 비스타와 마르코가 사카즈키에게 합동으로 패기를 적용했다는 전투 기록.
- **조건:** 다른 인물이 동시 공격한 짧은 교전. 미호크전 Ch.561–562와 전혀 다른 사건. 지속적인 유효 피해가 확정되지 않았다.
- **해석:** 검술과 무장색의 실제 조합은 사실로 보되, **통상 결합**을 유달리 탁월한 추가 Haki Raw로 계산하는 독립 효과는 미검증이다. 기존 Attack4/Technique2를 추정 제거하거나 새로운 Overall을 계산하지 않는다.

### 샹크스 — Ch.1055의 원거리 위압 vs Ch.1079의 카무사리

- **공식 ONE PIECE.com TV1082:** 샹크스의 원거리 패왕색에 아라마키가 압박을 느끼고, 빨간 머리 해적단의 존재를 인식하고 철수. **단독 1대1 전투력 결착 아님.**
- **공식 ONE PIECE.com TV1112:** 샹크스가 키드의 함대 공격 미래를 본 후 선제 접근, 카무사리로 키드를 제압. **도리·브로기의 별도 함선 파괴를 샹크스의 공격 점수로 가산 금지.**
- **사건 분리:** `1055-ranged-conqueror-deterrence`는 전장 견제/거리의 효과. `1079-future-information`은 **미래 정보**. `1079-single-sword-hit`은 **실제 검격**. 이 세 사건 요소를 섞어 일반 Attack·Speed·Technique·IQ 네 축에 동일한 수치 보너스를 반복 가산해서는 안 된다.
- **남은 문제:** Ch.1079의 패왕색 검격이 Base Attack94에서 별도로 측정 가능한 추가 타격이라는 직접 근거, 미래예지에서 얻은 위험 정보에 의해 Base IQ91과 별개 IQ Raw4 효과가 있다는 직접 근거는 불충분하다.

### 카타쿠리 — 미래예지·모치 회피

- **공식 ONE PIECE.com TV857 (2018-10-14):** 침착함을 잃으면 공격을 맞았고, 회복 후 견문색으로 예측·모치 신체 부분 변형으로 회피한다는 사용 경위와 조건을 **명확히 설명한다**.
- **관찰:** Haki 능력 자체와 활용은 직접적으로 뚜렷함. 하지만 **한 회피 행동**이 Defense Raw6, Technique Raw6, Defense Base81, Technique Base84를 모두 **서로 다른 순증**으로 인과 입증하지는 않는다.
- **유지 조건:** 미래예지 자체·모치 변형의 정밀함은 기술 강점을 지지한다. 기존 IQ Raw는 이미 v0.1.62에서 중복 제거돼 IQ Base82만 유지.
- **결론:** 현재 Defense Raw6·Technique Raw6 **보류 유지**, 사용의 실재와 예외적 추가분의 엄밀함은 별개 판단.

### 징베 — Ch.890 빅맘 방어와 Ch.1018 후즈후 방어

- **기존 원작 Evidence:** 빅맘 공격을 잠시 버텼으나 밀렸고, 후즈후에게 무장색 경화 방어를 적용해 상대 손가락을 손상시켰다.
- **공식 ONE PIECE.com TV1040:** 후즈후의 지건반을 무시하는 듯 대응하고 오니가와라 정권으로 격파. 단 공식 시놉시스 자체는 **해당 순간의 '무장색'을 직접 텍스트로 명시하지 않는다**. 세부 패기 경화 표시는 원작 Ch.1018 Evidence에서 검증해야 한다.
- **구분:** 어인공수도 결정타는 Attack Base76, 두 방어 장면은 Defense Base78과 Raw4의 현재 근거다. 빅맘 앞에서 버틴 것이 곧 상시 빅맘급 Defense를 뜻하지 않는다.
- **확인된 데이터 설명 결손 해결:** `evidence-jinbe-whos-who-1018`의 비어 있던 `uncertainty: ''`를 공격/방어 구분·Base vs Raw 미확인 경계로 채움. 사실·점수·Evidence ID 등은 그대로.

## 3. 조정 판단과 다음 사용자 승인 게이트

| 사항 | 상태 |
|---|---|
| Haki 보유/사용 확인 | 각 기존 원작 Evidence와 공식 애니 자료에 따라 인정 |
| Haki '특출남' | 샹크스 원거리 위압, 미래예지의 높은 기량 등 강한 장면 존재. 통상 무장색 사용만으로 모두 특출남이라 인정하지 않음 |
| 해당 능력의 **Base 바깥 독립효과** | 9건 모두 **개별 예외 Raw 정량 근거와 중복 검토를 추가할 필요** |
| 사용자 승인 없이 Raw 상향·하향 | **금지** |
| 사용자 승인 없이 Technique90 | **금지** |
| 가상 Raw-off Overall 하락 계산 | **실시하지 않음** |
| 실제 시스템 변경 | Evidence 1건의 불확실성 문구 추가 + 읽기 전용 감사데이터·테스트·문서 |

### 실제 개발 파일

- `src/data/sample/v0169HakiIndependentEffectAudit.ts`: 9개 Raw를 5개 효과 그룹으로 연결하는 **비점수 감사 장부** 및 공식 교차검증 링크.
- `src/data/sample/v0169HakiIndependentEffectAudit.test.ts`: Raw 9개/5그룹 링크, 해당 캐릭터 Evidence 소유권·연계 Battle 존재, 4명 현재 7축·Raw·Overall 불변, 60/59/62/434/15·Balanced1.2/Haki0.5 유지, 징베 결손 문구 검사.
- `src/data/sample/evidence.ts`: 징베 Ch.1018 `uncertainty` 누락 1곳만 텍스트 보정. 기술/전투 수치·기여 관계 미수정.
- docs/README/CHANGELOG/TEST_REPORT: 과정 및 검증/보류 결과.
- 프로젝트 SPEC·기타 데이터·계산·매치업·UI/UX·저장·복원 **변경하지 않음**.

## 4. 남은 원작 대조

- Shanks 1055/1079: Haki 묘사 자체와 독립 효과의 근거를 구분하되 공식 애니/원작 컷 내용 경계 유지.
- Katakuri 881–884: Haki 예측과 모치 신체 실제 변형을 Def/Tech 각각으로 인정하려면 중복하지 않는 기술 차이를 직접 기술.
- Jinbe 890/1018: 원작 패기 경화 시각적 근거, 고방어 기전, Base에 이미 들어간 부분 확인.
- Vista 574: 마르코 기여 분리 및 561–562 검술과 Haki 사건 독립성 재검증.
- 특정 Raw 수치 변경은 **실제 공격·방어 결과 이외의 추가 효과 관찰값과 동축 앵커, 파생 순위·매치업 비교 + 사용자 승인 후 별도 버전**에서만 가능.

## 공식 자료

ONE PIECE.com. (2023, November 5). *第1082話 新時代到来！赤髪の皇帝の怒り*. https://one-piece.com/anime/64187/index.html

ONE PIECE.com. (2024, July 14). *第1112話 激突！シャンクスVSユースタス・キッド*. https://one-piece.com/anime/67527/index.html

ONE PIECE.com. (2018, October 14). *第857話 ルフィ反撃 無敵カタクリの弱点！*. https://one-piece.com/anime/o4869/index.html

ONE PIECE.com. (2022, November 13). *第1040話 操舵手の誇り 怒りのジンベエ！*. https://one-piece.com/anime/o6327/index.html

ONE PIECE.com. (2021, February 20). *約10年ぶりに「白ひげ海賊団」がアニメに登場*. https://one-piece.com/news/o20210220_12159/index.html

Oda, E. (1997–present). *ONE PIECE* [Manga]. Shueisha. Chapters 574, 881–884, 890, 1018, 1055, 1079. **만화 원작 해당 전 컷 직접 열람 완료라는 주장은 하지 않음**.
