# v0.1.35 Draft — 실제 전투 근거 보강과 Hybrid Haki 재산정 후보 1차 판정

**2026-10-09, review base:** `main@15310f50a08c07401cb43ce26ea5e5b7d521a47c` (v0.1.34, Balanced 1.2, Haki Weight 0.5).
**범위:** 사카즈키·쿠잔·샹크스·미호크·샬롯 링링·카타쿠리 **6인 파일럿**, Haki Raw **14개 기여** 및 Source/Evidence. 전체 39개 Evaluation의 데이터 구조 검증과는 별도의 **원작 근거 기반 심사**다.
**상태:** 사카즈키 Evidence 4건 등록, 3개 미연결 스탯 해소, Evidence Readiness 7개 명시. 모든 수치와 현행 순위는 **그대로**. 실전 점수 수정이 정당화되지 않는 항목에 +N/-N을 만들지 않았다.

## 1. 파일럿의 진짜 수정: 사카즈키의 Evidence / 평가 근거

기존 사카즈키 Evaluation은 Speed·Technique·Combat IQ·Versatility에 연결 Evidence가 없었다. 실제 공식 자료에서 다음 근거를 찾았다.

| 확인된 사실 | Evidence ID / Battle context | 직접 연결된 Core Stat | 제외 조건 |
|---|---|---|---|
| 스쿼드에게 거짓 정보를 주어 흰수염을 공격하게 유도 | `evidence-sakazuki-squard-deception-563`; `marineford-sakazuki-squard-563` | **Combat IQ** (전시 심리·정보전 성과) | 모든 해군 작전이 사카즈키 혼자만의 판단이었다고 단정 금지, 정치적 선택 제외 |
| 「유성화산」의 다수 마그마탄으로 해적 함선·퇴로·빙결 해면을 공격 | `evidence-sakazuki-meteor-volcano-564-565`; `marineford-sakazuki-meteor-564-565` | **Attack** (광역 파괴), **Technique** (탄막 운용), **Versatility** (지역 통제·원거리 역할) | 공동 포위 작전·쿠잔의 얼음 지형, 단일 고수 상대 피해와 분리; 여러 Stat에 인용하지만 Raw 가산은 없음 |
| 루피를 보호한 에이스에게 마그마 공격 적중·치명상 | `evidence-sakazuki-ace-intervention-574`; `marineford-sakazuki-ace-574` | **Attack** (직접 관통) | 보호 목적으로 방어·회피 선택이 제한된 피격, 독립 사황급 1대1 승리 아님 |
| 징베가 루피를 업고 탈출할 때 지속 추격, 다른 간부들의 저지 | `evidence-sakazuki-luffy-pursuit-578`; `marineford-jinbe-akainu` | **Combat IQ** (지속 표적 선택), Attack 참고 | 상대는 부상·보호·도주 상태. **Speed 86의 순수 속도에 적합한 동일 조건 측정 아님** |

### 공식 교차 확인 링크
- ONE PIECE.com [스쿼드 소개](https://one-piece.com/character/Squad/index.html), [애니메이션 472화](https://one-piece.com/anime/472/index.html).
- ONE PIECE.com [애니메이션 474화: 유성화산](https://one-piece.com/anime/474/index.html).
- ONE PIECE.com [애니메이션 483화: 에이스 피격](https://one-piece.com/anime/483/index.html).
- ONE PIECE.com [애니메이션 488화: 루피 추격과 간부 차단](https://one-piece.com/anime/488/index.html).
- 원작 만화 563–565화, 574화, 578화. 일부 메커니즘·속도 비교는 애니메이션 공식 줄거리만으로 단정하지 않고 추가 원작 페이지 검증이 필요하다.

### 사카즈키 수치와 근거 확실성의 변화

| 항목 | 기존 Final | 새 Final | Readiness | 이 판정의 의미 |
|---|---:|---:|---|---|
| Attack | 97 | 97 | E2 | 에이스 보호 개입 관통 + 유성화산, 결정타가 1대1 평등조건은 아님 |
| Defense | 95 | 95 | E2 | 삼대장 공동 방어·긴 결투; 독립적 패기 예외 Raw +2는 별도 심사 대상 |
| Stamina | 96 | 96 | E2 | 10일 결투 기간은 직접 보고되지만 피로·피격 세부는 미공개 |
| **Speed** | **86** | **86** | **E3** | 직접 순수 속도 비교 Evidence 없음. 수치는 기존의 강한 잠정값이며 약함의 증거가 아님 |
| Technique | 91 | 91 | E2 | 유성화산 탄막 운용과 공동 방어 근거 추가 |
| Combat IQ | 91 | 91 | E2 | 스쿼드 기만과 추격 중 목표 선택. 집단 지휘 전부를 1인 평가하지 않음 |
| Versatility | 91 | 91 | E2 | 근접 관통 / 원거리 탄막 / 지형·퇴로 압박의 구별되는 역할 |
| **Overall** | **92.429** | **92.429** | — | **변화 0**. 이는 수치 정당성의 검증 완료를 뜻하지 않음 |

결과: 273 Stat 중 Evidence IDs 빈 배열은 기존 **14개 → 11개**로, Readiness 미지정은 **203개 → 196개**로 감소. 나머지 미연결 스탯은 샹크스 Stamina(1), 사카즈키 Speed(1), 후지토라(3), 료쿠규(5), 스무디 Speed(1). 누락을 억지로 메우기 위해 허술한 스탯 역할의 Evidence를 추가하지 않았다.

## 2. 하이브리드 예외 Raw 14개 실제 판정 (숫자 수정 아닌 승인 게이트)

이하의 **결론은 각 Legacy Raw가 새로운 예외적 독립효과 기준을 통과했는가**에 대한 1차 심사다. Haki 보유·비보유, 능력 수준의 판정 자체가 아니다.

| Character | Legacy Haki Raw (axis/type) | 원작에서 강하게 확인되는 것 | 새로운 기준에서의 심사 / 잠정 결과 |
|---|---|---|---|
| 사카즈키 | Defense/무장 2 | 삼대장 공동 방어에 참가 | **통상 운용·공동전**: 별도 '예외적 패기' 효용으로 인정할 독립 효과 아직 입증 못함. Base 이관 후보 |
| 쿠잔 | Attack/무장 4 | 가프와 패기 실린 권격 교환 | **통상 운용**, 실전 위력은 입증. 출력과 무장색 고유 이득이 분리되지 않아 Base 이관 후보 |
| 쿠잔 | Defense/무장 2 | 삼대장 공동 방어 | **통상·공동전**, Base 이관 후보 |
| 쿠잔 | Technique/무장 4 | Ice Glove와 무투의 결합 | 공격과 같은 1087화 충돌 성과를 다시 계산할 위험. **독립 효과 추가 검토** |
| 샹크스 | Attack/패왕 6 | 키드와 Damned Punk를 「신피」로 선제 격파 | 탁월한 실전 응용은 강하게 확인. **Base에 기록된 같은 일격의 공격 성과와 수치 분리가 미확정** |
| 샹크스 | Technique/패왕 4 | 신피 검격에 패왕색 적용 | Attack과 같은 유효타. **다축 중복 리스크** |
| 샹크스 | Technique/견문 4 | 미래의 함대 피해를 예견하고 접근 | 같은 Technique에서 패왕색과 합산됨. 예지 자체와 검격 숙련 사이 독립 효과 불확실 |
| 샹크스 | Combat IQ/견문 4 | 미래 위협을 보고 표적·타이밍 선택 | 실제 판단은 확인되나 Base Combat IQ의 판단 설명과 중복 우려 |
| 카타쿠리 | Attack/무장 4 | 루피와 무장색 실전 타격 충돌 | 특출난 **타입별 독립 상승치** 대신 통상 Haki 공격 성과로 Base 이관 우선 검토 |
| 카타쿠리 | Defense/견문 6 | 짧은 미래 예측을 회피에 반복 사용 | **탁월한 견문색 직접 인정**. 실제 회피 효과는 입증. Base에 이미 없는 추가 부분의 수치 근거 필요 |
| 카타쿠리 | Technique/견문 6 | 예지와 모치 신체 미세 변형 결합 | 같은 방어 회피 성과에서 다른 관찰 가능한 숙련 효과가 있는지 재확인 |
| 카타쿠리 | Combat IQ/견문 4 | 예지 기반 차단·선제 대응 | Gear 4 차단 등 실제 선택과 예지 효과를 분리했는지 재검토 |
| 링링 | Attack/패왕 6 | 페이지 원에게 패왕색을 두른 근접 공격 | 높은 단계의 패왕색 응용 확인. 충격의 패왕색만의 한계효과는 Base와 별개로 아직 정량화 못함 |
| 링링 | Technique/패왕 6 | 같은 페이지 원 장면의 의도적 패기 결합 | Attack과 같은 타격에 대한 **다축 중복 위험**. 별도 숙련 성과 필요 |
| 미호크 | **Raw 없음** | 흑도 「夜」 소유 및 무장색 지도, 검술 위상 | 무장색 탁월성은 **강한 추론**으로 프로필에 유지. 제작 메커니즘 불명, +N 자동 도입 금지 |

**검증 결과:** 6인 모두에 대해 현행 Raw의 존재만으로 새 Hybrid 기준의 **수치 가산이 최종 승인된 항목은 아직 없다**. 이는 현재 점수의 모든 Raw를 없애야 한다는 뜻이 아니고, 위의 검토 기준에 맞춰 **Base 재심사**와 **독립된 한계효과**를 확인해야 한다는 뜻이다.

## 3. 상대적 Scale 및 계산 민감도

| 캐릭터 | 현행 Overall | 주요 상대 앵커 |
|---|---:|---|
| 링링 | 94.286 | Law+Kid의 **협력** 및 낙하·폭발 패배 / 높은 Defense·Stamina. [공식 1067화](https://one-piece.com/anime/62440/index.html) |
| 쿠잔 | 92.714 | 사카즈키와 **10일 결투 패배** 사실, 가프와의 권격은 부상·임무를 동반한 다인전. [쿠잔 공식 프로필](https://one-piece.com/character/kuzan/index.html) |
| 미호크 | 92.714 | 세계 최강 검사·흑도 요루, 현재 세부 Haki 실전 Raw는 0. [공식 프로필](https://one-piece.com/character/Dracule_Mihawk/index.html) |
| 샹크스 | 92.571 | 키드전 전조 예측·빠른 접근·유효타, 도리·브로기의 함선 파괴와 분리. [공식 1112화](https://one-piece.com/anime/67527/index.html) |
| 사카즈키 | 92.429 | 쿠잔 상대 **승리**, Speed의 직접 측정 부족과 방어 Raw 공동전. [공식 프로필](https://one-piece.com/character/Sakazuki/index.html) |
| 카타쿠리 | 82.714 | 미래예지 직접 응용, 침착함이 무너지면 취약. [공식 830화](https://one-piece.com/anime/o4671/index.html), [857화](https://one-piece.com/anime/o4869/index.html) |

**정밀도 문제:** 사카즈키와 쿠잔의 총계는 각각 647/7 vs 649/7. 단 2점의 `7 Stat 총합` 차이로 서열이 갈리며, 이는 특정 1축 Final의 +2점 또는 2축 +1점과 동일하다. 미호크 649/7 vs 샹크스 648/7 역시 합계 **1점** 차이다. 이런 크기의 차이를 원작에서 확정된 1대1 서열처럼 해석할 수 없다.

### 비공식 Stress Test (재산정 후보가 아님)

- 쿠잔의 Technique Raw 4를 **Base는 고정한 채** 임시로 제거하면, Final Technique가 93→91이 되고 Overall이 `649/7→647/7`로 떨어져 사카즈키와 **정확히 동점**이 된다.
- 샹크스의 미검증 Technique Raw 두 건(4+4)을 임시로 제거하면 Overall은 `648/7→644/7`이 된다.
- **이것은 Raw·Base 중복이 전체 서열에 영향을 미치는 민감도 측정**일 뿐, 해당 기여가 실제로 0이라는 증거도 아니고 새 하이브리드 등급도 아니다. 이전 Base에서는 Haki를 분리했으므로 Raw만 제거하면 평가가 일관되지 않을 수 있다.

### 확정 가능한 변경 전후

- **실제 Evidence/Readiness 보강 후:** 사카즈키와 5명의 기존 7축 Final/Overall **모두 변화 0**. Ranking과 15개 Matchup 기록 변경 없음.
- **중립 Shadow migration:** 기존 Haki Raw를 통상 Base에 수학적으로 이관하면 각 스탯 Final이 완전히 같아지지만, 이는 새 Haki 수치의 독립적 타당성을 입증하지 않음.
- **진짜 Haki 재산정 후보:** `Base_new`와 `exceptionalRaw_new`에 독립 실전 효과가 확인된 경우에만 수치 제안. 현재 6인 시험에서 구체적인 새 ±1/±2를 뒷받침할 공통 정량 앵커를 충분히 검증하지 못했기에 **부당한 새 수치 제안은 보류**한다.

## 4. 다음 우선 작업

1. **Sakazuki Speed (E3)**: 쿠잔 결투 외 다른 캐릭터와 동일 조건에서 속도·반응을 직접 비교한 원작 근거가 있는지 탐색; 없으면 86을 고정의 정확한 값처럼 읽지 않도록 표기한다.
2. **Shanks Stamina (연결 없음)**: 신피 한 장면이나 패왕색 출력으로 88이 좋고 나쁘다는 판단을 하지 않고 장기전 근거 확보 여부 검토.
3. **Linlin vs Shanks**: Defense/Stamina/Versatility 및 Conquerors application의 독립적 비교 앵커 수집, 2v1 환경 영향 분리.
4. **Mihawk vs Shanks**: 세계 최강 검사라는 Technique 직접 근거와 Haki 수준 추론을 분리, 새 Raw는 금지.
5. **Katakuri**: 미래예지 유발 회피, 모치 변형 숙련, 선제 대응 선택을 원작 장면에서 각자 별도 결과로 지목 가능한지 검증.
6. **남은 11개 Evidence 미연결 축**: 수치 부족의 근거가 아니라 **검증 상태의 부재**로 처리; 사실을 생성하거나 부적절한 링크를 붙여 미해결 건수를 0으로 맞추지 않는다.

## 5. 데이터/모델/회귀 상태

- 이번 변경 파일(업데이트): `src/data/sample/battles.ts`, `evidence.ts`, `evaluations.ts` **(사카즈키만 Evidence 및 Readiness)**; 신규 테스트와 본 보고서.
- Sakazuki `evaluationDataVersion`은 `evaluation-0.1.35-evidence-only-draft`로 표시해 Evidence-only refresh를 다른 모델 변경과 분리.
- **Numerical legacy baseline preserved**: 37 Characters / 39 Evaluations / 273 Stats; 53 typed Raw, sum 256; 15 evidence-aware Matchups; CalculationModel Balanced 1.2 Weight 0.5.
- 테스트/빌드 성공 여부는 동일 PR **최신 HEAD**에서 기록; 모바일 화면 실제 시각 QA는 수행하지 않았다.

**판정:** 이번 실질 진전은 사카즈키 기존 빈약한 평가 근거를 교정하고 평가의 불확실성을 노출한 것이다. **점수를 바꿀 만큼 충분한, 중복 없는 정량 근거는 아직 확정할 수 없다.** 원작에서 확인되지 않은 숫자를 재분배해 순위를 맞추는 작업은 하지 않는다.
