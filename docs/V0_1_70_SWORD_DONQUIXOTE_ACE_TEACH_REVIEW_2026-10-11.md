# v0.1.70 — SWORD · 돈키호테 패밀리 · 에이스 추가 / 티치 상향 검토

**2026-10-11.** 이전 안정판 v0.1.69 main 기준 추가 개발. 기존 PROJECT_SPEC.md, Balanced1.2 / Haki Weight0.5, 직접 매치업 15개와 이미 확정된 기존 캐릭터 점수는 변경하지 않는다.

## 1. 실제 확장한 데이터

| 항목 | 이전 | 신규 | 최종 |
|---|---:|---:|---:|
| Character | 60 | +6 | **66** |
| 평가된 유일 캐릭터 | 59 | +6 | **65** |
| Evaluation | 62 | +6 | **68** |
| 7축 스탯 항목 | 434 | +42 | **476** |
| Membership | 73 | +11 | **84** |
| 신규 Group | - | SWORD, 돈키호테 패밀리 | **+2** |
| 신규 Battle | - | 신규 상황 10건 | **+10** |
| 신규 Evidence | - | 공식 애니 줄거리 13건 | **+13** |
| 기존 직접 매치업 | 15 | +0 | **15** |
| Haki Raw 합(대표/전체) | 212/230 | +0 | **212/230** |

**기존 캐릭터 ID 재사용:** 드레이크는 SWORD 대장으로 과거 토비롯포 소속과 함께 표시한다. 도플라밍고도 기존 Character를 패밀리 선장 Membership으로 연결한다. 두 인물은 Ranking/Matchup에서 각각 1회만 나타난다. 베르고는 돈키호테와 해군 잠입 전력(과거) 복수 소속, 에이스는 흰수염 해적단 2번대 대장의 역사적 소속이다.

**전투 사건 중복 차단:** 1121·1122화의 코비/그루스 활동은 각 회차 하나의 Battle을 공유한다. 에이스와 티치의 바나로 섬 결투는 기존 Battle ID banaro-teach-ace를 재사용한다. 코비의 석체 팔 파괴와 그루스의 낙석 방어는 서로 다른 Evidence로 기능을 분리한다.

**Evidence 원칙:** ONE PIECE.com 공식 인물 소개 + TV 회차 줄거리를 근거로 등록한다. 신규 레코드의 source.type은 모두 supplementary로 지정했다. 직접 확인하지 않은 만화 컷을 canon으로 표시하지 않았으며 신규 6명의 Raw Haki 가산은 0으로 보류했다.

## 2. 신규 6인 프로젝트 draft 수치

스탯 순서: Attack / Defense / Stamina / Speed / Technique / Combat IQ / Versatility. 아래 숫자는 작중 공식 전투력 수치가 아닌 **근거에 따른 초안**이며 Base=Final (신규 Haki Raw=0).

| 이름 | Atk | Def | Sta | Spd | Tech | IQ | Vers | Overall |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 코비 | 82 | 73 | 77 | 78 | 77 | 76 | 67 | **75.714** |
| 프린스 그루스 | 72 | 77 | 74 | 71 | 81 | 78 | 85 | **76.857** |
| 베르고 | 79 | 79 | 77 | 77 | 79 | 73 | 68 | **76.000** |
| 피카 | 74 | 74 | 75 | 65 | 80 | 69 | 82 | **74.143** |
| 디아만테 | 73 | 70 | 74 | 71 | 76 | 69 | 78 | **73.000** |
| 포트거스 D. 에이스 | 84 | 77 | 82 | 78 | 85 | 78 | 85 | **81.286** |

기존 캐릭터의 7축 값과 62개 과거 Evaluation은 원본 그대로 보존한다. 근거 부족을 곧 약함으로 해석하지 않으며 각 축의 E2/E3와 사실·전투조건·불확실성 문구는 신규 모듈에 기록한다.

### 2.1 SWORD: 가프의 역할과 2명 성과 분리
- **코비:** TV1121에서 사람을 구하려다 시류의 기습 대상이 되었고 가프가 대신 중상을 입음. TV1122에서 가프가 먼저 피사로 본체에 충격을 줬고, 코비가 실직권골로 거대 석체 팔을 파괴. 한 번의 높은 출력은 Attack 직접 근거이나 지속적 전면전 동급 고점이나 독자 전체 작전 설계로 단정 금지.
- **그루스:** 공식 인물 설정상 점토를 만드는 능력자. TV1122에서 코비가 부순 석체의 낙석을 점토로 받아 군함 보호. Defense/Technique/Versatility의 직접 근거이나 코비의 팔 파괴 피해를 그루스 Attack으로 전가하면 안 됨.

### 2.2 돈키호테 패밀리: 본체·능력·조건 구분
- **베르고:** G-5 중장으로 잠입한 최고간부. TV610 스모커와 전투 후 TV616 로에 의해 제압. 무장색 사용·봉술 수준, 실제 타격/방어 결과, 이전 누적 교전 조건을 분리한다.
- **피카:** TV718 지형 석체를 움직여 리쿠 왕 일행에게 위협. TV719 조로가 오오론부스의 투척 도움을 받아 석체를 분할하고 본체를 찾아 격파. 거대 석체 규모를 피카 개인의 직접 Attack/Speed/Defense와 동일시하지 않는다.
- **디아만테:** TV717 퀴로스와 검/철제 우산을 이용한 공방, TV718 최종 패배. 열매·무기 응용의 역할과 퀴로스의 누적 피해 및 가족 보호 임무를 함께 기록.

### 2.3 에이스: 바나로 섬과 정상결전 시점
- **공식 인물:** 흰수염 해적단 2번대 대장, 이글이글 열매 보유, 티치전 패배 뒤 포로, 정상결전 루피를 보호하다 사망.
- **TV95:** 스모커와 짧은 자연계 공방으로 루피의 이동을 지원. 결착전 아님.
- **TV325:** 티치가 어둠어둠 열매의 흡인·접촉 능력 봉쇄를 활용해 에이스를 격파. 특수 상성/지속 피격을 구분하고 에이스의 모든 상대에 대한 일반 열세로 환산하지 않는다. 티치는 이때 흔들흔들 열매를 아직 보유하지 않았다.
- **TV483:** 에이스가 루피 대신 사카즈키의 공격을 받음. 아군 보호를 목적으로 한 희생 피격을 상시 Defense 1대1 실패로 기계적으로 취급하지 않는다.
- **패기:** 보유 확인의 정확한 장면과 예외적 Haki 효과는 별도 검증 전까지 신규 Raw0. 패왕색은 어린 시절 원작 Ch.587에서 발현한 사실을 2차 회차 요약과 TV501 시점으로 보조 확인해 **confirmed**로 표기한다. 다만 원작 전체 컷을 직접 확인하지 못했고 성인기 패왕색 검격·패휘감의 예외적 기여는 확인되지 않아 **Raw0**을 유지한다. 나머지 미확정 capability는 unclear로 남겨 미보유 확정과 구분한다.

## 3. 티치 7축 상향 가능성 정밀 검토

기존 티치 **Attack95 / Defense89 / Stamina95 / Speed82 / Technique93 / Combat IQ87 / Versatility93**, Overall **634/7 = 90.571**, 모든 Raw0. v0.1.70에서 티치의 점수·평가 버전·Evidence 링크 **변경 없음**.

| 축 | 현재 | 상향 논거 | 보류·반대 조건 | 판단 |
|---|---:|---|---|---|
| Attack | 95 | 지진·어둠의 실전 연계, 에이스/로와의 공격 성과 | 광역 능력의 범위 자체가 최고 강자에게 입힌 독립 피해는 아님. 기존 Base95에 반영 | 가능성 낮음 |
| Defense | 89 | 핸콕 접촉 봉쇄와 강자 상대 생존 | 어둠의 피격 고통 증폭, 흰수염/로에게 직접 공격 허용. 생존은 Stamina 성과 | **상향 비추천** |
| Stamina | 95 | 흰수염 공격 이후 활동, 로 각성 기술 피격 뒤 반격·승리 | 기존 95에 이미 반영. 서로 다른 전투를 하나의 연속 장기전처럼 묶지 않음 | 보류 |
| Speed | 82 | 상위 상대의 접근·공방 | 크로우즈 흡인은 본인 순간 기동이 아님. 비교 반복 표본 부족(E3) | **근거 부족** |
| Technique | 93 | 크로우즈 흡인→봉쇄→타격, 핸콕 봉쇄, 로 상대 이종 열매 운용 | 세 사건 모두 현재 93점에 반영. 새 점수에 필요한 *추가 독립 정밀 응용*을 아직 발견하지 못함 | **최우선 정성 재심사** |
| Combat IQ | 87 | 능력 상성 공략·핸콕 제압 | 로전 위험한 돌진, 간부의 후퇴 제안, 이미 Base87에 포함된 전술 | **차순위 조건부 검토** |
| Versatility | 93 | 흡인·접촉 무효·광역 지진과 복합 연계 | 두 열매 보유 자체는 이미 Base93에 반영. 새로운 전투 역할 미확인 | 보류 |

**최종 상향 판정:** Technique와 Combat IQ는 논쟁할 가치가 있는 축이나 **현행 근거만으로 +1조차 독립적으로 확정되지 않음**. Attack/Stamina/Versatility는 현재 높은 점수에 성과가 이미 반영되었고 Defense/Speed는 상향 입증 약함. 7축 정량 변경을 하지 않았다.

공식 티치 프로필은 바나로 섬 에이스전 승리와 정상결전 이후 흔들흔들 열매 획득을 구별한다. 공식 TV1093에서 로 해적단의 선원 및 해상 개입을 동반한 격전이 진행되고 TV1115에서 로 해적단의 패배를 확인한다. 이 결과를 티치의 독립 정면 1대1 절대 우세로 확대하지 않는다.

## 4. 변경·검증·미완 항목

- 실제 추가: 신규 v0170GroupAceExpansion.ts / v0170TeachUpsideAudit.ts 및 별도 테스트. 기존 Sample source 6개는 읽기 전용 배열 추가만 수행.
- 기존 v0.1.69 기준 과거 59명/62평가 통계 테스트와 v0.1.70 현재 65명/68평가 테스트는 구분한다. 이전 Evidence 등급 비율·순위 실험의 역사적 재현성을 지키면서 실제 랭킹 UI에서는 65명을 보여줘야 한다.
- 미변경: PROJECT_SPEC, 원래 62개 Evaluation, 모델·패기 Raw·기존 15 매치업, 데이터 타입/저장 구조, 기존 사용자 인터랙션.
- 한계: 신규 데이터는 공식 애니·프로필 기반 첫 Draft이며 전체 만화 원작 컷 전수 직접 검증은 완료하지 않았다. 모바일/PC에서의 실제 수동 UI 확인은 별도다.
- 리그레션: PR GitHub Actions 전체 Vitest + tsc/Vite, 병합 SHA와 GitHub Pages 배포 성공 여부는 별도 검증 보고.

## 5. 확인 자료 (ONE PIECE.com)

- 코비: https://one-piece.com/character/Coby/index.html
- 프린스 그루스: https://one-piece.com/character/Prince_Grus/index.html
- 드레이크: https://one-piece.com/character/X_Drake/index.html
- 하치노스 TV1121: https://one-piece.com/anime/69144/index.html
- 하치노스 TV1122: https://one-piece.com/anime/69263/index.html
- 베르고: https://one-piece.com/character/vergo/index.html
- 피카: https://one-piece.com/character/Pica/index.html
- 디아만테: https://one-piece.com/character/diamante/index.html
- 스모커/베르고 TV610: https://one-piece.com/anime/610/index.html
- 베르고 결착 TV616: https://one-piece.com/anime/616/index.html
- 디아만테 TV717: https://one-piece.com/anime/o2825/index.html
- 피카 진격 TV718: https://one-piece.com/anime/o2829/index.html
- 피카 격파 TV719: https://one-piece.com/anime/o2831/index.html
- 에이스: https://one-piece.com/character/ace/index.html
- 에이스 어린 시절 패왕색 발현(원작 Ch.587 보조 요약): https://onepiece.fandom.com/wiki/Chapter_587
- 애니 501화 시점: https://one-piece.com/anime/501/index.html
- 에이스/스모커 TV95: https://one-piece.com/anime/95/index.html
- 에이스/티치 TV325: https://one-piece.com/anime/325/index.html
- 에이스 보호 TV483: https://one-piece.com/anime/483/index.html
- 티치: https://one-piece.com/character/Marshall_D_Teech/index.html
- 로·티치 TV1093: https://one-piece.com/anime/65154/index.html
- 로 해적단 결착 TV1115: https://one-piece.com/anime/68212/index.html
