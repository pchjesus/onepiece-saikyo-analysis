# v0.1.51 — 59인 Evidence-readiness 누락 감사 및 주요 비교군 재검증

**성격:** 데이터 품질·근거 충분도 감사. 전투력 점수/패기 Raw/Overall 모델의 재평가 또는 교정이 아님.

**기준:** `main@73b0816cccef809f431076300ffc919ed85bf618` (v0.1.50), 날짜 2026-10-09. 우선 읽을 문서: `PROJECT_SPEC.md`, `docs/V0_1_50_SEVEN_AXIS_DEEP_AUDIT_AND_CRACKER_RATIONALE_2026-10-09.md`(59명 전원 7축 최종값), `docs/V0_1_49_OVERALL_VALIDITY_AND_SENSITIVITY_59x7_2026-10-09.md`(기존 가중치·LOAO 진단).

## 1. 413개 대표 스탯의 readiness 실제 원인 분해

- 전체 60 캐릭터 마스터 중 대표 평가 59명 × 7축 = 413 스탯. 과거 평가 포함 62 Evaluations / 434 Stat. Haki Raw 244 / Balanced 1.2 / ×0.5 / 직접 Matchup 15개 유지.
- **v0.1.50 변경 전:** E1 29 / E2 131 / E3 61 / 미입력 192. 미입력 192개 중 **182개에 최소 1개 이상의 명시 Evidence ID 링크**, **10개에는 명시 Evidence ID 링크가 없다**. 문서/코드가 인용한 Evidence의 직접성·신뢰성을 개별 검증한 개수가 아님.
- 192개 중 **3개는 rationale 문장에 이미 'E2'가 직접 명시되었으나 readiness 필드가 빠져** 있었다. 시류 Stamina 75, 반 오거 Stamina 68, 미호크 Defense 93. 이 셋에 `readiness: 'E2'`만 동기화하여 **이전의 명시적 판단을 구조화**.
- **수정 후:** E1 **29** / E2 **134** / E3 **61** / 미입력 **189**. 새로 판단된 E2=0건, 기존 E2 표현을 실제 metadata에 반영한 건수=3건.
- **수정 후 미입력 189개 중 명시 Evidence ID 존재 179개, 명시 Evidence ID 0개 10개.** 다시 말해 missing!=E3, Evidence ID 존재!=강한 직접 증거.

### 미입력의 캐릭터 범위

- v0.1.50에는 **27인 7개 축 전체**와 **카타쿠리 3개 축**에서 readiness 누락(총 192개)이 있었다. 3개 E2를 채운 이후 시류·반 오거·미호크는 각 6개 미입력, 카타쿠리는 3개, 그 밖의 **24인은 7개 모두 미입력**.
- 토비롯포·아카자야·키드 해적단 17인 `wanoSeeds.ts`는 초기 설계부터 축별 readiness 7개씩 기록돼 있다. 반면 이전에 수작업으로 쓴 Evaluation 다수는 readiness가 생기기 전 작성되었거나 동기화되지 않아 등록 상태가 균일하지 않다. **도입 시점 차이는 누락의 가능한 설명**일 뿐 모든 189개가 충분한 근거를 갖췄다는 판단은 아님.
- 7축별 수정 **전** 누락: Attack27 / Defense27 / Stamina28 / Speed28 / Technique27 / CombatIQ27 / Versatility28. 수정 **후** 누락: Attack27 / Defense26 / Stamina26 / Speed28 / Technique27 / CombatIQ27 / Versatility28.

### Evidence ID가 0개인 스탯 10건 — 가장 먼저 링크 근거를 찾아야 함

| 캐릭터 | 스탯 | 위험·후속 검증 |
|---|---|---|
| 샬롯 스무디 | Speed 74 | 개인 이동·반응 실증 장면 부족, '74점 = 느림'으로 단정 금지 |
| 샹크스 | Stamina 88 | 장기 독립 고강도 전투 표본 적음, 현재 수치 검증 미흡 |
| 잇쇼 | Defense 88, Stamina 87, Speed 85 | 각 축에서 직접 활용할 교전 사건과 맥락 연결 필요 |
| 아라마키 | Attack 90, Stamina 89, Speed 84, Technique 87, Versatility 92 | 해당 축별 유효 피해·전투 지속·기동·식물 조작/역할 전환의 직접 Evidence ID 연결 확인 필요 |

**중요:** 이는 *현재 해당 EvaluationItem.evidenceIds 길이가 0인 것*이지, 프로젝트 전체나 원작에 관련 사건/근거가 없음을 뜻하지 않는다. 관련 Evidence가 있다면 먼저 사실·조건·supported stat을 독립 대조한 다음 연결한다. 임의 ID·점수·readiness를 넣지 않는다.

## 2. 시류 무장색 Raw2 근거 감리 (결론: 보류/숫자 유지)

- **프로젝트 데이터:** `evidence-shiryu-garp-1087`의 supportedAbilities에 무장색을 포함시키고 Technique Base77 + Armament Raw2×0.5 = Final78. 평가 근거는 코비를 노린 투명 기습과 가프의 보호 개입.
- **공식 ONE PIECE.com TV 제1121화 소개:** 시류의 투명화·코비 목표 기습, 가프의 대신 피격, 뒤이은 가프/쿠잔 패기 충돌은 명시되지만 **시류의 칼에 무장색이 입혀졌다는 문구는 소개문에 없음**.
- **2차 교차 정보:** *One Piece Wiki*의 1087화 항목은 시류가 무장색을 사용했다고 기술하며 검이 검게 표현되었다는 취지로 원작 1087화 8쪽을 인용함. **팬 위키 서술만으로 원작 패널 독립 확인 완료 처리하지 않음.**
- **결정:** '무장색 불가능'도 '1차 원문 검증 완료'도 아님. 원작 1087화의 검 코팅·해당 컷 전후와 공식 설정을 직접 재확인하고 확정할 것. 원칙상 Haki Raw2, Base77, Final78, Overall77.143 및 Evidence의 원문 주장은 당장 변경하지 않음. 비평가 메모만 제공.

## 3. 루치 68 / 카쿠 72 Combat IQ 및 정면 판단 감사

- 공식 TV **1108·1109화:** 세라핌과의 공동 위협 아래 루치·카쿠가 협동을 제안했고, 1109화에서 카쿠의 구체적인 공투 제안과 네 사람의 공격이 나타남. **판단의 긍정 증거**로 남겨야 함.
- 공식 TV **1110화:** 루나리아 화염 상태의 방어 약점을 먼저 인식하지 못한 것은 루치만의 실패가 아님. 조로가 킹과의 전투 경험을 떠올려 뒤늦게 설명했고 루피·루치·카쿠가 모두 늦은 정보를 받아들임. 루치 고유의 Combat IQ 과도 감점을 정당화하지 않음.
- 공식 TV **1125화:** 루치의 베가펑크 접근 공격과 스튜시 보호 개입은 목표 선정·접근의 긍정 근거지만, 비전투 대상 제압 시도 하나로 고급 1v1 전술 상한을 확정할 수 없음.
- **평가 현황:** 루치 IQ68(E3), 카쿠 IQ72(E3), 시류 IQ78(기존 readiness 미입력). 시류는 보호 목표를 이용한 기습, 루치·카쿠는 임무 교전/공동 대응을 주로 보여 줌. 세 인물의 전술 점수 간격 **10점/6점은 근거 앵커가 불충분해 재보정 우선 후보**, 점수 직접 수정은 보류.
- 제안: '독립적 위험평가', '상대 능력 공략', '조건부 목표 설정', '동료와의 공동 대응'을 구분해 각각의 1~3개 전투 장면으로 비교. 현재 E3는 곧바로 Base 하향을 뜻하지 않음.

## 4. 죠즈·퀸·스무디 추가 판정

| 대상 | 프로젝트 현 점수 | 확인되는 사실과 조건 | 판정 |
|---|---|---|---|
| 죠즈 | Defense84, Overall77.429 | 신체 다이아화의 강한 방어는 ONE PIECE.com 인물 소개에도 기재. 미호크의 참격 차단, 아오키지 빙결이라는 종류가 다른 상호작용 모두 감안 | 85–86 상향 검토는 가능하나 단일 물리 방어 성과만으로 1–2점 상향 확정 불가 |
| 퀸 | Versatility80, Overall78.571 | 공식 TV1061화는 제르마 능력 재현과 투명화, 상디와의 교전, 산만함을 명시. 공격 수단의 수와 실제 공격/방어/지원/기동 역할 폭은 구분 | 범용성 상향 검토 가치 있으나 다른 7축과 기술 개수 중복·실전 역할 수행을 감사한 후 재산정 |
| 스무디 | Speed74/Defense75, Overall76.571 | 접촉 수분 추출은 공식 인물 설정. 큰 규모 공격과 함대 지휘는 기록되지만 상위 강자 상대 개인 반응·정면 방어·장기 1v1 비교는 제한 | 74·75를 '약함'이 아닌 임시 Draft로 처리, 직접 속도 evidenceIds 0개 우선 연결 조사 |

**동일 사건 중복 가능성(수치 미변경):** 퀸의 제르마 재현 기술 → 공격·숙련·범용성 중 무엇을 직접 지지하는지 역할(primary/secondary/context)로 분리할 것; 죠즈의 다이아몬드화 → Defense와 피격 후 버팀인 Stamina를 분리할 것; 마르코의 회복/방어 동시성과 카타쿠리의 미래예지·회피/전투지능/Raw도 같은 방법으로 후속 독립 점검.

## 5. Overall 검증의 한계 및 향후 독립 표본 설계

현재 Overall은 7개 서로 다른 개념의 Final Stat **동일 가중 산술평균**. 수학적 재현성은 검증됐지만 척도의 공통 간격·독립 가중치의 경험적 타당성·상성 조건의 비선형성·정확한 승률 보정은 검증되지 않았다. 특히 고점의 세부 소수 차이나 상이한 축 수치 직접 비교로 승패/피해 관통을 추정하지 않는다.

**독립 예측 검증 설계(이번에는 점수나 모델에 적용하지 않음):**

1. Outcome을 사전 정의: 상대가 '해당 조건에서 승리/패배/중단/미확정'이고 팀전/개입 여부를 기록. 비슷한 교전과 다른 교전은 섞지 않음.
2. **학습/해석에 이미 쓴 Battle/Evidence와 검증 사건을 분리**, 사후적으로 점수를 맞춰준 전투를 독립 정답으로 재활용하는 데이터 누수를 막음.
3. 검증 사건이 확보되면 'Overall만 사용한 방향 예측', '7축+맥락 사용', '명시적 Matchup 근거'의 설명력을 별도로 비교. 사례 수/승부 판정 품질 부족 시 유의성·정확도 수치를 보고하지 않음.
4. 15건 직접 Matchup은 조건과 불확실성을 포함한 감사 기록이지 독립적으로 레이블링된 정답 15개가 아니므로 현재 '승률 예측 정확도' 계산 대상이 아님.
5. E1–E3는 정확성 확률도 신뢰구간도 아님. 전문가간 평가 일치도와 사건별 근거 품질은 별도로 측정해야 함.

## 6. 구현·검증 범위와 보류

- **수정:** `src/data/sample/evaluations.ts`의 3개 이미 명시된 E2 메타데이터를 실제 데이터로 동기화. `src/domain/calculation/overallValidityAudit.test.ts`의 readiness 기대값을 수정, 신규 `readinessMetadataAudit.test.ts`에서 근거 존재·숫자/Raw/Matchup 무변경과 명시 E2 일관성을 감시. 59×7 점수·근거 ID·Battle·Membership·Matchup은 그대로.
- **불변:** 원점수, Haki Raw 총합244, Balanced1.2·7축/Overall 수식, 기존 B안 UI, PROJECT_SPEC.md, 15 Matchup, 전체 랭킹.
- **보류:** 나머지 189개를 임의로 E1/E2/E3 채우기, 원작 확인 전 시류 Raw2 수정, 죠즈·퀸·스무디·루치 IQ 수치 편집, 새로운 가중치·오차구간 공식 적용.
- 완료 조건: GitHub PR 전체 테스트/빌드 → main 병합 → GitHub Pages 해당 merge SHA에 대한 Deploy 성공. 실제 브라우저·모바일 실기기 조작과 원작 전 장면 직접 판독은 수행했다고 주장하지 않는다.

## 공식 원작 보조자료 / 문헌 (APA 7th)
- ONE PIECE.com. (n.d.). *シリュウ*. https://one-piece.com/character/Shiryu/index.html
- ONE PIECE.com. (n.d.). *ジョズ*. https://one-piece.com/character/jozu/index.html
- ONE PIECE.com. (n.d.). *シャーロット・スムージー*. https://one-piece.com/character/Charlotte_smoothies/index.html
- ONE PIECE.com. (2023, May 7). *第1061話 魔神の一撃！サンジVSクイーン*. https://one-piece.com/anime/61599/index.html
- ONE PIECE.com. (2024, June 9). *第1108話 理解不能！セラフィムの反逆！*. https://one-piece.com/anime/66858/index.html
- ONE PIECE.com. (2024, June 23). *第1109話 苦渋の決断！異色の共闘戦線！*. https://one-piece.com/anime/67065/index.html
- ONE PIECE.com. (2024, June 30). *第1110話 生き残れ！最強の人類との死闘*. https://one-piece.com/anime/67261/index.html
- ONE PIECE.com. (2024, October 6). *第1121話 ガープとクザン 衝突する師弟の正義*. https://one-piece.com/anime/69144/index.html
- ONE PIECE.com. (2025, April 13). *第1125話 ぶつかる男の覚悟！黄猿と戦桃丸*. https://one-piece.com/anime/72180/index.html
- One Piece Wiki. (n.d.). *Chapter 1087*. Fandom. https://onepiece.fandom.com/wiki/Chapter_1087 (2차 자료; 원작 독립 판독 대체 불가)
