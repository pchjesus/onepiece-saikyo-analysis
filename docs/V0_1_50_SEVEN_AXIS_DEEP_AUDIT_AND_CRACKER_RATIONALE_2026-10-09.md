# 59인 7축·Overall 심화 검증 및 크래커 설명 정합성 감사
> 검토 시점: 2026-10-09. 기준: `main@ae26cf49f13b90f7334131e8e9e11c1e20c1ca74` (v0.1.49). 이 문서는 정규 모델 재설정안이 아닌 근거/지표 감사이며, 후속 안전 패치는 설명만 정정한다. 기존 `docs/V0_1_47_...`, `docs/V0_1_49_...` 보고서와 함께 읽을 것.

## 1. 근거 범위 및 방법
- `docs/V0_1_47_A_PATH_59_CHARACTER_SEVEN_AXIS_CROSS_AUDIT_2026-10-09.md`의 대표 59명×7축 Final 값 추출. v0.1.47 이후 v0.1.49까지의 GitHub compare에서 평가 수치 변경이 없고 v0.1.49 진단 테스트가 해당 베이스라인을 고정함. 대표 Evaluation 59개, 역사적 3개 추가 Evaluation / 전체 Core Stat 434개.
- 현행 `Final=min(100, Base + HakiRaw×0.5)`; `Overall=7 Final 산술평균`. Raw 합계 244는 중복 가산 금지. 실제 0~100 점수는 원작 공식 전투력 단위나 피해량이 아니다.
- 데이터 재현 검사(59개 행의 값 합계/7 vs 문서 Overall): 소수 셋째 자리 반올림 오차만 허용. 평가 근거의 원작 전수 독립 열람·재채점과 독립 전문가간 신뢰도 추정은 수행된 것으로 간주하지 않는다.
- 원작 사실 / 교전 조건 / 분석자의 해석 / 프로젝트 점수 / 커뮤니티 의견을 분리한다. ONE PIECE.com 공식 인물 소개와 애니 에피소드 개요는 장면 교차 확인용이며, 만화 해당 컷을 모두 원문 독립 확인한 것은 아니다.

## 2. 전체 횡단 분포

| 축 | 최저 | 중앙값 | 최고 | 평균 | Q1–Q3 | 75–84점 인원 | 최고점 캐릭터 | 최저점 캐릭터 |
|---|---:|---:|---:|---:|---|---:|---|---|
| Attack | 68 | 79 | 100 | 82.898 | 76–91 | 29 | newgate, roger, rocks | 라이조, 쿠로즈미 칸주로 |
| Defense | 67 | 80 | 99 | 81.983 | 74–89 | 24 | newgate, roger, garp, kaido, linlin | van-augur |
| Stamina | 68 | 82 | 100 | 83.508 | 77–89 | 31 | kaido | van-augur |
| Speed | 64 | 80 | 99 | 81.441 | 75–86 | 32 | kizaru | pizarro |
| Technique | 65 | 83 | 99 | 84.593 | 79–91 | 26 | roger, garp, mihawk | 페이지 원 |
| Combat IQ | 65 | 78 | 97 | 80.237 | 74–86 | 24 | roger, garp | 페이지 원 |
| Versatility | 63 | 82 | 97 | 81.559 | 74–88 | 23 | linlin | 페이지 원 |

전체 Overall 평균 **82.317**, 중앙값 **79.143**, 최저 **70.143**, 최고 **97.571**. 90~100 14명 / 85~<90 4명 / 80~<85 6명 / 75~<80 27명 / 70~<75 8명. 강자 편의 표본으로 인한 분포 집중이므로 일반 인구의 척도 분포나 근거 기반 점수의 정당성을 나타내지 않는다.

### 서로 다른 축에서 발생하는 상대적 역전 및 비교 경계
- **Attack:** Garp 99 vs Marco 77. Garp는 고출력 타격, Marco는 강자 요격·방어·재생·보조 역할. Marco의 재생·의료/지원 장면을 공격 화력에 자동 반영하지 않음. 반대로 Cracker 77은 기어4 루피에 대한 무장색 유효타를 포함하지만 반복적 강자 상대 결정력은 제한적으로 확인됨.
- **Defense:** King 88(불꽃 활성과 비활성 모드의 편차) vs Marco 87(공세 차단·보호·재생 적용) vs Jozu 84(다이아몬드 물리 차단). 이 숫자를 '무조건 관통 가능한 절대 방어'로 읽을 수 없음. Jozu와 Jack 모두 84이나 주요 근거/취약 조건은 다름.
- **Stamina:** Jack 88(조우 장기전과 재출전) / Marco 87(지속 교전·재생 소모) / Cracker 80(비스킷 병사 11시간 생성). 후자는 본체 직접 피격 내구와 구분.
- **Speed:** Kizaru 99 대 Sanji 91 / King 83 / Marco 82 / Karasu 82 / Kid 82. 능력 기반 이동·군집 기동은 평가 가능한 반면, 투명화나 발사체 속도를 순수 반응으로 대체하지 않음.
- **Technique:** Mihawk 99 / Katakuri·Vista 각 87 / Queen 79. 다른 전문기술의 숙련을 같은 숫자로 비교하는 것은 평가상 상대 수준을 표현할 뿐 정면 검술 동급이나 상대 승패를 보장하지 않음.
- **Combat IQ:** Law 88 vs Kid 73; Shiryu 78 vs Lucci 68. Lucci 68은 원자료에서도 '이전 평가자 잠정 Base / E3'로 설명되므로, 상성·정치적 성향이 아닌 실제 전투 전술의 직접 비교·재채점이 우선.
- **Versatility:** Marco 87 / Katakuri 84 / King 82 / Queen 80 / Kid 80. 수단 개수가 아닌 서로 다른 역할·거리·방어·지원 전환의 실증 범위를 비교해야 함. Queen 80은 추가 감사 후보이나 자동 상향을 정당화하지 않음.

## 3. 우선 비교군 — 프로젝트 최종값
| 인물 | A | D | Stamina | Speed | Tech | IQ | Vers. | Overall |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 유스타스 키드 (`kid`) | 92 | 86 | 90 | 82 | 89 | 73 | 80 | 84.571 |
| law (`law`) | 86 | 83 | 85 | 82 | 90 | 88 | 91 | 86.429 |
| king (`king`) | 85 | 88 | 85 | 83 | 81 | 77 | 82 | 83.000 |
| marco (`marco`) | 77 | 87 | 87 | 82 | 84 | 80 | 87 | 83.429 |
| katakuri (`katakuri`) | 83 | 84 | 84 | 84 | 87 | 84 | 84 | 84.286 |
| jozu (`jozu`) | 78 | 84 | 78 | 79 | 74 | 75 | 74 | 77.429 |
| jack (`jack`) | 79 | 84 | 88 | 75 | 75 | 72 | 74 | 78.143 |
| vista (`vista`) | 82 | 79 | 77 | 80 | 87 | 77 | 74 | 79.429 |
| queen (`queen`) | 80 | 81 | 81 | 75 | 79 | 74 | 80 | 78.571 |
| cracker (`cracker`) | 77 | 81 | 80 | 75 | 80 | 75 | 77 | 77.857 |
| karasu (`karasu`) | 76 | 74 | 74 | 82 | 81 | 74 | 84 | 77.857 |
| shiryu (`shiryu`) | 78 | 74 | 75 | 79 | 78 | 78 | 78 | 77.143 |
| lucci (`lucci`) | 80 | 77 | 82 | 82 | 83 | 68 | 74 | 78.000 |
| kaku (`kaku`) | 73 | 72 | 75 | 75 | 79 | 72 | 74 | 74.286 |
| smoothie (`smoothie`) | 76 | 75 | 76 | 74 | 80 | 77 | 78 | 76.571 |

### 상황·해석과 판단
| 비교 | 원작 사실·교전 조건 | 프로젝트 값에서 의미 있는 차이 | 후속 판단 |
|---|---|---|---|
| Kid vs Law | 빅 맘전은 **둘의 2대1**. Assign·Damned Punk와 K-ROOM·Puncture Wille가 연계. 전투 결과로 단독 상대 우열을 역산하지 않음 | Kid Attack 92/Stamina 90, Law Technique 90/IQ 88/Versatility 91. Overall 차 1.858 | 역할 차이는 드러나나 Law IQ 15점 우위 등 점수 간격의 교차평가 기준 문서화 필요 |
| King / Marco / Katakuri | 루나리아 상태별 방어·속도 전환; 불사조의 재생·아군 엄호와 소모; 모치 각성과 미래예지·루피와의 장기전 각각 다른 조건 | King D88/A85; Marco D87/Stamina87/Vers87; Katakuri IQ84/Tech87 | 캐릭터별 강점 분리 타당. King의 상태 tradeoff와 Marco의 재생/방어 이중 반영은 동일 장면의 기능별 구분 필요 |
| Jozu vs Jack | 다이아 변신과 미호크 참격 차단 / 조우 장기전과 고대종의 전선 복귀 | 둘 다 Defense84; Jack Stamina88 vs Jozu78; Jozu Tech74 vs Jack75 | 물리 방어와 지속 교전은 다른 조건. Jozu D85~86은 검토안일 뿐 근거 없이 적용하지 않음 |
| Vista vs Katakuri | 미호크와 검술 공방 / 루피와 미래예지·각성 모치전 | 둘 다 Tech87. Katakuri IQ84/Vers84 vs Vista77/74 | Tech 동점이 서로의 기술 동격, 정면 승패나 종합 전투력 동급을 뜻하지 않음. Vista 87 유지 합리적 |
| Queen vs Kid | Queen은 레이저·전격·변신·은신·제르마 재현 / Kid는 자력·Assign·Damned Punk와 Big Mom 실전 유효타 | Queen Vers80 = Kid Vers80, Kid Attack92 vs Queen80 | Queen 다수 수단이 실제 역할 전환까지 가능했는지 자세한 사건 단위 재검증 필요. Kid 화력만으로 Queen 범용성 감점 금지 |
| Cracker vs Karasu | 비스킷 병사·갑옷과 나미의 물 상성 / 혁명군 공동전의 검댕 군집 지원 | 둘 모두 Overall77.857. Cracker Defense81/Stamina80, Karasu Speed82/Vers84 | 동일 평균은 동급 상성 보증이 아님. 공동전 개인 유효타 과대 귀속 주의 |
| Shiryu vs Lucci·Kaku | 투명 기습은 코비 보호 중인 Garp를 관통 / Lucci와 Kaku는 에그헤드의 각성·육식 실전, Lucci 전술 평가 잠정 | Shiryu 77.143, Lucci 78.000, Kaku 74.286. Shiryu IQ78 vs Lucci68/Kaku72 | Shiryu 기습을 정면 관통 화력·순수 Speed로 환산 금지. Lucci IQ68 E3 우선 재평가, Shiryu Raw armament 2 직접 시각 확인 전 보류 |

## 4. 확정 정합성 문제와 실제 변경 범위
**Confirmed bug — text vs computed value (not numeric recalibration):**

1. `evaluations.ts` Cracker Attack Base75 + Armament Raw4×0.5 = **Final77**, 기존 rationale에는 'Final74'. 문장을 77로 정정. 공격·Haki Contribution 수치 불변.
2. Cracker Defense Base81, Raw0 => **Final81**, 기존 rationale에는 '76으로 제한'. 문장을 81로 정정. 방어 수치 불변.
3. `evidence.ts` `evidence-cracker-long-battle-842`의 `evaluationImpact`가 'Stamina를 70대 초반'이라고 진술. 현재 Final80에 반하므로 수치 없이 장시간 능력 지속의 실제 근거와 본체 피격을 구분하는 표현으로 정정.

점수 **0개**, Haki Raw **0개**, 캐릭터/소속/전투/근거 링크 **0개**, Matchup **0개** 변경. 변경 전후 Cracker `[77,81,80,75,80,75,77]`, Overall **77.857** 동일. 산출 순위와 15개 직접 Matchup은 산식/원자료 기준으로 동일해야 하며 별도 회귀 테스트 대상. 기존 B안 캐릭터 선택 UI, 전역 컬러, `PROJECT_SPEC.md` 유지.

## 5. 근거 충분도와 중복 평가 감리

- v0.1.49 기준 대표 스탯 413개 중 **E1 29 / E2 131 / E3 61 / 미입력 192**(미입력 46.5%). 미입력을 E3로 자동 간주하지 않음. 이들은 점수 신뢰구간이 아니라 **근거 검증 준비도 표지**다.
- **시류:** 현재 `evidence-shiryu-garp-1087`는 supportedAbilities에 '무장색 패기'를 포함하며 Tech Raw2를 인용함. ONE PIECE.com 제1121화 요약에서 확인되는 것은 투명 기습·코비 보호 중 가프 관통과 뒤이은 **가프-쿠잔 패기 충돌**임. 이 요약만으로 시류의 **검에 무장색을 썼다**는 직접 확인이 되지는 않음. *원작 1087화 해당 컷·공식 능력 설정 원문 직접 재확인 전 상태는 미결*, Raw 숫자 무단 삭제·유지의 확실성 주장 금지.
- **스무디:** 거대 참격·즙을 짜내는 능력 운용은 공식 에피소드 제868화에서 확인되나, 강자에게 독립 유효타·장기 1대1·속도 실측 표본은 부족. Speed74는 약함이 입증된 값 아닌 임시 Draft.
- **중복 가능성 감사:** 미래예지의 회피 성과가 Defense·Speed·Combat IQ 및 Raw에 중복 귀속되는지; 재생 직후 교전 지속이 Defense·Stamina에 독립 성과처럼 두 번 들어가는지; 열매 조작 숙련과 Versatility를 기술 개수로 중복 계산하는지 **사건별 contribution 역할(primary/secondary/context)**에 따라 검토할 것.
- 단순 59인 횡단 상관은 Defense↔Stamina, Technique↔Versatility 등에서 높을 수 있으나, 상위권 집중·공통 기초 전력의 영향이 있어 통계적 상관만으로 이중 계산이라고 확정하지 않음.

## 6. Overall의 측정 해석과 순위 안정성

**수학적 재현성 높음 / 실제 승패 예측의 타당성 미검증**. Attack 90과 다른 인물 Defense 89는 서로 다른 개념의 척도이며 `Attack > Defense`가 피해 관통이나 승률을 결정하지 않는다. 동일축 90/80도 화력 12.5% 차이가 아니다.

실제 정렬 58개 인접 구간 중 **9곳 동점**, **43곳 0.5점 이내**, **49곳 1점 이내**, **56곳 2점 이내**. 순위의 작은 차이를 정밀한 서열로 해석하기 매우 위험하다. 한 축에 1점 변화는 Overall을 **1/7=0.143** 이동시키므로 근접 순위는 소규모 재평가로도 바뀔 수 있다. 이 숫자는 실제 추정 오차의 신뢰구간이 아니다.

v0.1.49 민감도 시험 재해석:
- **가상 물리 편중** 가중치(25/20/20/20/5/5/5)에서 잭 정렬 위치 36→25, **가상 전술 편중**(10/10/10/10/20/20/20)에서 36→44. 공식 모델 아니며 실전 전투력 개선/악화를 입증하지 않음.
- 한 축씩 제외한 6축 동일 평균 LOAO에서 Versatility 제외 시 최대 11칸, Combat IQ 제외 시 최대 10칸 이동. 다양한 특화 프로필의 순위가 평균 설계에 민감함을 보여주며 '그 축이 잘못되었다'는 증거는 아님.
- 직접 Matchup 15건은 검증용 독립 승패 라벨 15건이 아니므로 Overall 기반 중립 1v1 승률·상성 예측 정확도 산출 불가. 현재가 설명적 지수인지 예측적 모델인지를 혼동하지 말 것.

**개선 선택지**: (A) 권장 — 현 Balanced 유지, 7축·장면·조건 중심으로 해석, (B) E1–E3 미입력 감사 후 근거 준비도 별도 표시(새 UX 승인 필요), (C) 외부 검증용 사건 데이터셋 구성 후 가중치·1v1 모델 비교(별도 모델/평가 기준 승인 필요). 임의 수치 확정·강제 서열 재배열 금지.

## 7. 전체 59명 × 7축 원점수 보존표
**열 순서 Attack / Defense / Stamina / Speed / Technique / Combat IQ / Versatility, Haki 포함 Final.** 순서 위치는 동점 공동 순위 표시가 아닌 안정 정렬 위치다.

| 순서 | 인물 / ID | Attack | Defense | Stamina | Speed | Technique | IQ | Versatility | Overall |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | newgate (`newgate`) | 100 | 99 | 99 | 96 | 98 | 95 | 96 | 97.571 |
| 2 | roger (`roger`) | 100 | 99 | 99 | 98 | 99 | 97 | 91 | 97.571 |
| 3 | garp (`garp`) | 99 | 99 | 99 | 98 | 99 | 97 | 91 | 97.429 |
| 4 | rocks (`rocks`) | 100 | 98 | 97 | 98 | 98 | 96 | 94 | 97.286 |
| 5 | kaido (`kaido`) | 98 | 99 | 100 | 96 | 96 | 91 | 96 | 96.571 |
| 6 | linlin (`linlin`) | 98 | 99 | 99 | 89 | 94 | 84 | 97 | 94.286 |
| 7 | rayleigh (`rayleigh`) | 94 | 92 | 91 | 93 | 96 | 95 | 89 | 92.857 |
| 8 | kuzan (`kuzan`) | 93 | 93 | 97 | 90 | 93 | 91 | 92 | 92.714 |
| 9 | mihawk (`mihawk`) | 96 | 93 | 91 | 94 | 99 | 92 | 84 | 92.714 |
| 10 | shanks (`shanks`) | 97 | 91 | 88 | 95 | 96 | 93 | 88 | 92.571 |
| 11 | akainu (`akainu`) | 97 | 95 | 96 | 86 | 91 | 91 | 91 | 92.429 |
| 12 | gaban (`gaban`) | 91 | 90 | 92 | 94 | 95 | 95 | 88 | 92.143 |
| 13 | kizaru (`kizaru`) | 92 | 89 | 91 | 99 | 93 | 90 | 91 | 92.143 |
| 14 | teach (`teach`) | 95 | 89 | 95 | 82 | 93 | 87 | 93 | 90.571 |
| 15 | fujitora (`fujitora`) | 91 | 88 | 87 | 85 | 92 | 86 | 94 | 89.000 |
| 16 | ryokugyu (`ryokugyu`) | 90 | 89 | 89 | 84 | 87 | 82 | 92 | 87.571 |
| 17 | law (`law`) | 86 | 83 | 85 | 82 | 90 | 88 | 91 | 86.429 |
| 18 | sabo (`sabo`) | 87 | 83 | 82 | 86 | 88 | 86 | 87 | 85.571 |
| 19 | zoro (`zoro`) | 90 | 83 | 87 | 83 | 87 | 82 | 81 | 84.714 |
| 20 | 유스타스 키드 (`kid`) | 92 | 86 | 90 | 82 | 89 | 73 | 80 | 84.571 |
| 21 | sanji (`sanji`) | 83 | 85 | 85 | 91 | 84 | 81 | 82 | 84.429 |
| 22 | katakuri (`katakuri`) | 83 | 84 | 84 | 84 | 87 | 84 | 84 | 84.286 |
| 23 | marco (`marco`) | 77 | 87 | 87 | 82 | 84 | 80 | 87 | 83.429 |
| 24 | king (`king`) | 85 | 88 | 85 | 83 | 81 | 77 | 82 | 83.000 |
| 25 | doflamingo (`doflamingo`) | 76 | 74 | 81 | 75 | 87 | 81 | 83 | 79.571 |
| 26 | jinbe (`jinbe`) | 78 | 80 | 80 | 77 | 83 | 80 | 79 | 79.571 |
| 27 | vista (`vista`) | 82 | 79 | 77 | 80 | 87 | 77 | 74 | 79.429 |
| 28 | morley (`morley`) | 76 | 80 | 77 | 77 | 83 | 75 | 87 | 79.286 |
| 29 | 이누아라시 (`inuarashi`) | 80 | 81 | 83 | 79 | 78 | 77 | 76 | 79.143 |
| 30 | 킬러 (`killer`) | 79 | 76 | 80 | 81 | 82 | 84 | 72 | 79.143 |
| 31 | crocodile (`crocodile`) | 76 | 72 | 77 | 74 | 86 | 86 | 82 | 79.000 |
| 32 | hancock (`hancock`) | 79 | 76 | 77 | 80 | 82 | 75 | 82 | 78.714 |
| 33 | 네코마무시 (`nekomamushi`) | 80 | 80 | 82 | 79 | 78 | 75 | 76 | 78.571 |
| 34 | queen (`queen`) | 80 | 81 | 81 | 75 | 79 | 74 | 80 | 78.571 |
| 35 | 덴지로 (`denjiro`) | 78 | 77 | 80 | 77 | 85 | 79 | 72 | 78.286 |
| 36 | jack (`jack`) | 79 | 84 | 88 | 75 | 75 | 72 | 74 | 78.143 |
| 37 | lucci (`lucci`) | 80 | 77 | 82 | 82 | 83 | 68 | 74 | 78.000 |
| 38 | cracker (`cracker`) | 77 | 81 | 80 | 75 | 80 | 75 | 77 | 77.857 |
| 39 | karasu (`karasu`) | 76 | 74 | 74 | 82 | 81 | 74 | 84 | 77.857 |
| 40 | stussy (`stussy`) | 73 | 72 | 70 | 80 | 86 | 85 | 77 | 77.571 |
| 41 | jozu (`jozu`) | 78 | 84 | 78 | 79 | 74 | 75 | 74 | 77.429 |
| 42 | X 드레이크 (`x-drake`) | 78 | 79 | 82 | 76 | 78 | 74 | 74 | 77.286 |
| 43 | shiryu (`shiryu`) | 78 | 74 | 75 | 79 | 78 | 78 | 78 | 77.143 |
| 44 | 후즈 후 (`whos-who`) | 79 | 75 | 79 | 81 | 80 | 72 | 74 | 77.143 |
| 45 | 아슈라 동자 (`ashura-doji`) | 80 | 77 | 81 | 74 | 80 | 75 | 71 | 76.857 |
| 46 | smoothie (`smoothie`) | 76 | 75 | 76 | 74 | 80 | 77 | 78 | 76.571 |
| 47 | 킨에몬 (`kinemon`) | 76 | 74 | 81 | 75 | 79 | 71 | 78 | 76.286 |
| 48 | 블랙 마리아 (`black-maria`) | 74 | 72 | 75 | 69 | 80 | 74 | 84 | 75.429 |
| 49 | 라이조 (`raizo`) | 68 | 69 | 76 | 72 | 80 | 78 | 84 | 75.286 |
| 50 | 쿠로즈미 칸주로 (`kanjuro`) | 68 | 68 | 73 | 71 | 86 | 76 | 84 | 75.143 |
| 51 | 울티 (`ulti`) | 78 | 77 | 84 | 80 | 73 | 66 | 68 | 75.143 |
| 52 | 카와마츠 (`kawamatsu`) | 77 | 74 | 75 | 74 | 80 | 73 | 70 | 74.714 |
| 53 | van-augur (`van-augur`) | 72 | 67 | 68 | 75 | 80 | 78 | 82 | 74.571 |
| 54 | kaku (`kaku`) | 73 | 72 | 75 | 75 | 79 | 72 | 74 | 74.286 |
| 55 | burgess (`burgess`) | 76 | 74 | 79 | 74 | 72 | 70 | 74 | 74.143 |
| 56 | 키쿠노죠 (`kikunojo`) | 74 | 72 | 75 | 76 | 79 | 72 | 69 | 73.857 |
| 57 | 사사키 (`sasaki`) | 77 | 79 | 78 | 70 | 70 | 68 | 69 | 73.000 |
| 58 | pizarro (`pizarro`) | 72 | 74 | 74 | 64 | 74 | 70 | 74 | 71.714 |
| 59 | 페이지 원 (`page-one`) | 74 | 76 | 79 | 69 | 65 | 65 | 63 | 70.143 |

## 8. 검증·배포 및 미완료 조건
- 새 테스트 `src/data/sample/crackerRationaleConsistency.test.ts`에서 Final 7축 불변/Overall 불변/Haki Raw4/설명값 동기화/오래된 Stamina 문구 제거를 자동 확인하도록 구성. **이 문서 작성 시 CI 실행 전**이며 테스트 통과·병합·배포는 Pull Request/Actions로 별도 실증해야 한다.
- 원작 만화의 413 평가 단위 독립적 장면 재검증, 두 평가자 이상 재채점·근거 준비도 통계, 시류 무장색의 직접 원문 확정, 실물 모바일 브라우저 검증은 수행했다고 주장하지 않는다.
- 주요 점수 변경과 Overall 모델 변경은 모두 **보류/사용자 선택** 대상. 이번에는 설명 불일치만 제한 변경.

## 참고 자료 (APA 7th)
- ONE PIECE.com. (n.d.). *ビスタ*. https://one-piece.com/character/bista/index.html
- ONE PIECE.com. (n.d.). *ジョズ*. https://one-piece.com/character/jozu/index.html
- ONE PIECE.com. (2017, September 24). *第806話 満腹の力 新ギア４タンクマン！*. https://one-piece.com/anime/o4517/index.html
- ONE PIECE.com. (2019, January 13). *第868話 男の覚悟 カタクリ命がけ大勝負*. https://one-piece.com/anime/o4939/index.html
- ONE PIECE.com. (2023, May 7). *第1061話 魔神の一撃！サンジVSクイーン*. https://one-piece.com/anime/61599/index.html
- ONE PIECE.com. (2023, June 25). *第1066話 大トリ来る！波動と磁気の大技*. https://one-piece.com/anime/62293/index.html
- ONE PIECE.com. (2024, October 6). *第1121話 ガープとクザン 衝突する師弟の正義*. https://one-piece.com/anime/69144/index.html
- 프로젝트 내부 근거: `src/data/sample/evaluations.ts`, `src/data/sample/evidence.ts`, `src/data/sample/wanoSeeds.ts`, `src/domain/calculation/calculateCombatPower.ts`, `docs/V0_1_47_A_PATH_59_CHARACTER_SEVEN_AXIS_CROSS_AUDIT_2026-10-09.md`, `docs/V0_1_49_OVERALL_VALIDITY_AND_SENSITIVITY_59x7_2026-10-09.md`.
