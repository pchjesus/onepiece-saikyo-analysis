# v0.4.12 명대사 80명 선정 완료 — 스무디·마하 A안 (2026-10-15)

## 작업 근거 및 범위
- 작업 기준 `main@46b250d666839c565f2add210e48263d86bdb78d`.
- 사용자 승인: 스무디 **A안**(빅 맘 생존을 믿으며 형제들을 꾸짖는 말), 마하 **A안**(정부 조직 탈주자의 생존 선례를 용납하지 않는 말).
- 기존 캐릭터별 quote 슬롯 80개 중 pending 2개만 `secondary-excerpt`로 승격. 인물·소속·Evaluation·Evidence·Battle·Haki·Combat Power·Matchup 데이터 및 계산 모델 **변경 없음**.
- 최종 표출 **80/80명 = official-excerpt 14 + secondary-excerpt 66 + pending 0**. 이 숫자는 **선정·화면 등록 완료율**이지 원작 화집·한국 정식 번역 전수 대조 완료율이 아님.

## 데이터 변경 (src/data/quotes/v0412SecondaryQuotes.ts)

| 인물 | 대표 인용문 (한국어 자체 번역) | 확인된 서사·형식 | 2차 인용 출처 | 검증 |
|---|---|---|---|---|
| 스무디 | 멋대로 마마를 죽이지 마! 반드시 돌아올 거야! 마마를 상식으로 판단하지 말라고! | **원작 제934화**. 와노쿠니 해안에서 빅 맘이 사라지자 페로스페로·다이후쿠가 차기 선장을 논의할 때 스무디가 직접 꾸짖는 발언 | https://kaizokura.com/archives/15932733.html ; https://katakunad.hatenablog.com/entry/934wa-hananohyougorou | `secondary-excerpt`, `editorial` |
| 마하 | 조직에서 도망쳐도 살아남을 수 있다는 선례를 남겨선 안 된다. | **원작 제1018화**에 CP0의 후즈 후 처분 논의. **애니 제1040화** 일본어 장면 전사에서 발언자 **마하**로 명시. 원작 개별 말풍선까지 직접 대조한 것은 아님 | https://www.hellominju.com/2022/11/ONEPIECE1040.html ; https://www.grandlinearchives.com/chapters/1018 ; https://one-piece.com/anime/o6327/index.html | `secondary-excerpt`, `editorial` |

## 독립 확인 결과와 불확실성
- 스무디의 대사는 독립적인 두 편의 일본어 만화 감상 자료에서 제934화 발언으로 적혀 있으며, 발언 상황과 대상도 일치.
- 마하는 애니메이션 제1040화의 **인물 이름을 붙인 일본어 대사 전사**에서 발언자로 확인. 원작 제1018화의 같은 뜻의 CP0 대화는 영문 장면 요약에서도 확인할 수 있지만 개별 말풍선 명의에 대한 1차 대조는 미수행.
- 한국어는 **프로젝트 자체 번역**. 어느 것도 한국 공식 번역 확인(`official-korean`) 또는 원작 컷 확인(`manga-checked`)으로 과장하지 않음.

## 테스트 / 배포
- `src/data/quotes/v0412LastTwoQuotes.test.tsx`: 80/80 slot 및 종류, 두 대사의 표시·발언자·화수·URL·상세 UI, 기존 76+8 Evaluation / Balanced 1.2·Haki Weight 0.5·Ranking 80·기존 Matchup 15 원본.
- 기존 `characterQuotes.test.ts`, `v0412SevenQuoteFollowup.test.tsx`, `v0411UnratedCharacterRegistration.test.tsx`의 최신 현황 반영.
- GitHub Actions 전체 테스트·빌드, main 병합 및 Pages 배포 확인 후 별도 결과 보고. 실기기 PC/모바일 시각 QA는 별도.
