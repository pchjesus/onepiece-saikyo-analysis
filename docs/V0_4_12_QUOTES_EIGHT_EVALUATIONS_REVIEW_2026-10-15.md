# v0.4.12 — 8명 7축 잠정 산정 및 80명 대표 명대사 검증 확장 (2026-10-15)

## 기준과 범위
- 기준 main v0.4.11: `d37f9b35ab06cb148ffd08d8dffe42d62c87d3d5`.
- v0.4.9 분석안 `V0_4_9_KAKU_NINE_CHARACTER_DRAFT_REVIEW_2026-10-15.md` 중 이미 등록된 **8명만** 사용자 요청에 따라 현행 잠정 Evaluation으로 채택. 카쿠 재평가 및 에넬 추가는 여전히 보류.
- 기존 72명/76 Evaluation/532 Stat 원본, Haki Raw, 기존 Battle/Evidence/Matchups, v0.3.3 스냅샷, Balanced 1.2 및 Haki Weight .5 **그대로 보존**.
- 현재 80명/84 Evaluation/588 Stat, Membership 105건, 기존 17개 직접/상태별 매치업 유지. 신규 8명 Evaluation은 `draft`, 개별 축 `E2`/`E3`, 패기 가점 **Raw0**.
- Repository가 현재 평가를 노출: `src/data/sample/v0412EightEvaluations.ts`에는 별도 `v0412Evaluations`, `v0412Evidence`, `v0412Battles`; original `sampleEvaluations` 수정 없음. 모든 신규 증거는 ONE PIECE.com 공식 애니 시놉시스 `supplementary`, 만화 전 컷 직접 대조 주장 불가.

## 사용자 요청 반영 8인 7축
| 인물 | Attack | Defense | Stamina | Speed | Technique | Combat IQ | Versatility | Overall |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 게르니카 |78|76|76|81|84|80|75|78.571|
| 마하 |75|70|73|77|80|72|70|73.857|
| 우솝 |63|61|70|62|88|76|79|71.286|
| 브룩 |76|69|75|86|85|77|82|78.571|
| 프랑키 |82|83|83|68|83|79|82|80.000|
| 쵸파 |76|75|70|67|82|73|84|75.286|
| 로빈 |79|68|73|69|86|81|84|77.143|
| 나미 |77|59|61|63|84|83|87|73.429|

- 게르니카/마하: CP0 임무·부대 개입과 이조 누적 피해를 분리, 개인 장기전 근거 희소(E3).
- 우솝: 초장거리 저격 정밀도와 대인 화력을 분리.
- 브룩: 속검·냉기와 특정 영혼 상성을 분리.
- 프랑키: **프랑키 장군과 현행 무장을 사용할 수 있는 전투 상태**. 장비 없을 때 동일 점수 적용 금지.
- 쵸파: **럼블볼·몬스터 포인트 이용 가능 조건**, 지속시간 제약.
- 로빈: 데모니오 플뢰르 직접 결착, 거대 사지 피격 위험.
- 나미: **제우스·크리마 택트 동반 조건**, 빅 맘이 울티에게 가한 선행 피해 구분.
- 불확실성은 점수를 공인하거나 전투 결과를 자동 예측하는 의미가 아님.

## 명대사 선정·검증 상태
- 사용자 선택 반영: 흰수염 Ch563(스쿼드 용서), 우솝 Ch186(동료 꿈), 가프 Ch1088(해군의 미래), 카이도 Ch1049(전쟁의 가치), 키자루 Ch1124(친구 살해의 고통), 바제스 Ch1063(위하하하 힘힘 열매), 도플라밍고 Ch556(해군/해적과 승자의 정의), 로저 Ch1(처형 직전 보물 선언).
- **기존 공식 ONE PIECE.com 일본어 인용 19명 중 4명은 이번 선택으로 바뀌어 15명 official-excerpt 유지.** 그 외 54명은 `secondary-excerpt`로 웹 2차 자료에 기록된 일본어 발언과 출처·해당 화를 기재했지만 원작 컷 및 공식 한국어판 **미대조**. 자체 한국어 번역임을 명시.
- 현재 **69/80명** 실제 후보 문구 표시: 15 official-excerpt +54 secondary-excerpt. 2차 자료의 발언을 원작 대사 확인 완료로 **표기하지 않음**.
- 근거 미확인 상태로 대사 비공개인 **11명**: jozu, smoothie, gaban, rocks, morley, karasu, stussy, prince-grus, inazuma, guernica, maha. 없는 대사를 만들어 전체를 채우지 않는다. 이 11명은 신규 수집 후보이고 메타데이터상 `pending`.
- 추후 정확한 만화 컷·공식 한국어 번역을 확인하면 별도 `manga-checked`/번역 상태 등으로 승격할 것.
- 공식 원문 검증과 커뮤니티 인용 출처를 `src/data/quotes/characterQuotes.ts`/`v0412SecondaryQuotes.ts`에서 관리하며 Evaluation 근거 또는 스탯에 영향 없음.

## 회귀 및 검증 기준
- 새 8 Evaluation과 56 Stat, 신규 장면 Evidence/Battle 소유권, 상태별 일관성, 기존 72인 및 스탯 Haki Raw 불변.
- 80인 Overall 및 7 스탯 순위, 80인 Character 상세, 105건 소속, 기존 17 매치업의 점수/대진 무변경.
- 80개 quote slot 1:1 ID 매칭, official 15·secondary 54·pending 11, 특수 인물 8명 정확한 표시.
- GitHub Actions 전체 Vitest/TypeScript/Vite 통과 후 PR 병합; main GitHub Pages 배포 별도 확인. 실제 PC·모바일 실기기 시각 QA는 별도.
- 인용문 저작권 관련 장문 전재 방지를 위해 짧은 대표 발언을 주로 선택하고 출처를 연결.
