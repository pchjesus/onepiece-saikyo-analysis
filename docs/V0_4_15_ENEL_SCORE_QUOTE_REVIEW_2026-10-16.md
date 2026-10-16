# v0.4.15 — 에넬 7축 승인 재평가·공식 일본어 명대사 (2026-10-16)

## 요구사항·범위

사용자가 에넬 대표 대사 **“나는 신이다…!!”**를 최종 선정하고 하늘섬 시점 7축 **Attack 85 / Defense 74 / Stamina 72 / Speed 86 / Technique 86 / Combat IQ 76 / Versatility 87**을 승인했다. 이 패치는 기존 캐릭터 전원을 재조정하는 것이 아니라 **에넬의 현재 평가와 대표 명대사만** 갱신한다.

기준 main: `2306ed6c7a2e16db380ff419fd143e58bdd487c4` (v0.4.14). 기존 81명 / 85 Evaluation / 595축 / 106 Membership / 18 Matchup. 별도 원작 당시 루피 7축 부재에 따른 에넬·루피 역사 대진의 **정량 비교 보류**를 유지한다.

## 현재 사용자 승인값과 원본

| 축 | v0.4.13 역사 원본 | v0.4.15 현재 승인안 | 검토 메모 |
| --- | ---: | ---: | --- |
| Attack | 88 | **85** | 전격·광역 공격 위협 인정. 맥심의 뇌운/뇌영 환경 효과를 독립 대인 공격으로 단순 환산하지 않음 |
| Defense | 72 | **74** | 자연계 회피와 맨트라 감지 인정. 고무 상성 피격을 범용 실패로 일반화하지 않음 |
| Stamina | 72 | **72** | 전기적 심장 재가동과 장기 고강도 지구력 분리. E3 유지 |
| Speed | 88 | **86** | 열매 기반 고속 기동 인정. 맨트라 선행 감지를 순수 육체 반응으로 환산하지 않음 |
| Technique | 84 | **86** | 전열 창·금속 가공·감지와 열매 운용 숙련. IQ·Versatility 중복 가산 금지 |
| Combat IQ | 70 | **76** | 고무 상성 직면 이후 전열 창·황금 구체 선택 등 전술 전환. E3 유지 |
| Versatility | 87 | **87** | 원거리·광역·열·금속·감지·기동 운용 폭 인정, 동일 능력 파생을 여러 독립 능력으로 중복하지 않음 |
| **Overall** | **80.142857** | **80.857143** | Balanced 1.2, 동일 7축 평균 (561/7 → 566/7) |

이 수치는 **프로젝트 사용자가 승인한 비공식 잠정 평가**다. 공식 원작에서 제시된 전투력 정량값 또는 관측된 확정 피해 배율이 아니다. v0.4.13 `v0413EnelEvaluation` 객체는 변경하지 않고 `applyV0415EnelReview()`에서 동일 ID/상태의 현재 표시용 복사본만 갱신한다. 다른 84개 현재 Evaluation과 카쿠 수정, E2/E3, Evidence 참조, Haki Contributions는 보존한다.

### 원작과 프로젝트 해석의 분리

- **확인된 핵심 사실:** 에넬은 번개 자연계와 맨트라를 운용했고 루피의 고무 신체로 전격이 무효화된 상황에서 열·금속·황금을 활용했다. 마지막 교전은 루피가 승리했다.
- **전투 조건:** 하늘섬, 방주 맥심, 뇌운/황금, 이전 다수 교전, 고무/전격 상성의 특수성이 결과에 영향을 주었다.
- **해석·평가:** 단일 승패를 일반 상대 공격·방어·속도에 획일적으로 소급하지 않는다. Attack85/Defense74 등의 구체적인 숫자는 같은 축의 타 캐릭터와 비교하여 채택한 사용자 승인 편집 판단이다.
- **한계:** 동일 조건 최상위 강자 반복 교전, 장기 지구력, 원작 컷 전수 대조가 부족하므로 `draft`·기존 E2/E3·Raw Haki 0 유지. 새 피해 수치, 승률, 맨트라의 추가 Raw 가산 없음.

## 대표 명대사 데이터

- 한국어 사용자 선정: **나는 신이다…!!**
- 일본어 원문 확인: **我は神なり…!!**
- 공식 출처: ONE PIECE.com 2018-09-03 에넬 아카이브 컬렉션 상품 기사에서 공식 일본어 문구 확인. ONE PIECE.com의 별도 2013-11-01 피규어 기사에도 동일 문구가 등장함.
- `verificationStatus='official-excerpt'`, `translationStatus='editorial'` (편집 번역).
- 원작 만화 직접 확인을 증빙할 정확한 화수, 애니메이션 발화 화수 및 한국 정발본의 문장 동일성은 **미확인**이다. `mangaChapter` / `animeEpisode` 필드를 임의 생성하지 않는다.
- 캐릭터별 명대사 전체: **81개 표시 / 15 official-excerpt / 66 secondary-excerpt / 0 pending**. 다른 80명 데이터는 변경하지 않는다.

## 구현·영향·검증

- 신규 `src/data/sample/v0415EnelReview.ts`에서 원본을 읽어 현재 Evaluation만 수정한다. `evaluationRepository`와 `v050CurrentDataset`이 **동일한 수정본**을 사용해 UI/랭킹과 감사 CSV가 불일치하지 않게 한다.
- 기존 `src/data/sample/v0413RemainingDraftPublication.ts` 및 원본 76 Evaluations, v0.3.3 독립 JSON은 변경하지 않는다.
- `characterQuotes.ts`의 기존 `enel` pending 슬롯을 공식 원문+출처로 대체하되 명대사는 계산 모델·Evidence·매치업 수치를 수정하지 않는다.
- 관련 테스트: 역사 원본 불변, 현재 85/74/72/86/86/76/87과 Overall 566/7, 84건 기타 평가·81인 순위, 18개 대진·하늘섬 루피 수치 비교 차단, Raw Haki 0, E2/E3, UI 인용 상태/출처, 현재 595축 감사와 v0.3.3 회귀.
- CI/Vite/Pages 실제 결과는 PR 검사·병합 후 GitHub 실행 기록으로 확인. 브라우저·실기기에서 확인하지 않은 시각 상태는 검증된 것으로 표현하지 않는다.

## 출처 (APA 7판)

ONE PIECE.com. (2018, September 3). *『ONE PIECE』のフィギュアシリーズ「アーカイブコレクション」最新弾にエネル登場！* https://one-piece.com/news/o20180903_7815/index.html

ONE PIECE.com. (2013, November 1). *フィギュアーツZEROにあの「神」エネルが遂に登場!!* https://one-piece.com/news/o20131101_25/index.html

ONE PIECE.com. (n.d.). *空島編* [공식 줄거리]. https://one-piece.com/story/skypiea/index.html

ONE PIECE.com. (n.d.). *エネル* [공식 인물 소개]. https://one-piece.com/character/Eneru/index.html

pchjesus. (2026, October 15). *v0.4.9 카쿠·신규 9인 평가 초안* [프로젝트 내부 검토 문서]. https://github.com/pchjesus/onepiece-saikyo-analysis/blob/main/docs/V0_4_9_KAKU_NINE_CHARACTER_DRAFT_REVIEW_2026-10-15.md
