# v0.4.1 — 초상 이미지 교정과 루피 Gear 5 잠정 평가

- 작업일: 2026-10-14
- 기준: 안정 v0.4.0 `main@6cbd5c1a75df4bff47b9ca886475510d83c2c90b`
- 작업 PR: [#95](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/95)
- `PROJECT_SPEC.md` 및 Balanced 1.2/Haki Weight 0.5 **변경하지 않음**.
- **이 보고서의 숫자는 프로젝트 평가이지 작가/출판사 공식 전투력 수치가 아님.**

## 1. 기존 기능의 수정과 데이터 추가

1. **이미지 연결 교정:** 이전 `inazuma.webp`와 `kaku.webp`의 Git blob을 교환하여 사용자 보고의 교차 할당 문제를 수정. 원본 바이트를 재압축하지 않고 SHA로 검증한다.
2. **사용자 제시 그림 일치 초상 추가:** 버기 서커스 일러스트와 루피 엘바프 복장 일러스트를 확인한 동형 이미지로 WebP 파일을 만들었다. 버기·루피 2명 모두 기존과 동일한 확대 팝업 및 권리 미확인 표시 적용. 이미지 등록 **70→72개**.
3. **루피 캐릭터 추가:** 밀짚모자 일당 선장 1명, Membership 1건, 공식 애니메이션 줄거리 출처와 연결한 Battle 2건/Evidence 6건/Evaluation 1건(7개 Stat).
4. **핵심 수치:** Character **71→72**, Membership **96→97**, Evaluation **74→75**, Stat **518→525**, 직접 Evidence-aware Matchup **15 유지**. 새로운 대진의 승자/승률은 생성하지 않음.
5. **버전:** 앱 `0.4.1`, 데이터 `core-v0.4.1`, 평가 집합 `evaluation-set-v0.4.1`, 루피 개별 revision `evaluation-0.4.1-luffy-official-tv-draft`, Balanced `1.2`, 역사적 기준선 `v0.3.3`.

## 2. 루피 평가 입력 및 근거

**대상 시점:** 기어 5 사용이 가능한 에그헤드 시점. 공식 TV 애니메이션 회차 소개 및 공식 캐릭터 자료를 바탕으로 한 **Draft(E2/E3)**. 원작 만화 관련 페이지를 직접 전수 열람한 결과가 아니다.

| 축 | Base = Final | 근거 준비도 | 근거·해석 및 경계 |
| --- | ---: | --- | --- |
| Attack | 97 | E2 | 기어 5로 카이도와 고강도 교전, 바즈랑 건 최종 일격과 키자루에게 스타 건 적중. 카이도의 누적 피해와 타 참전자 기여를 분리. |
| Defense | 94 | E2 | 카이도의 공격에 대한 고무화 대응과 보호 대상에 대한 키자루 빔 차단. 일부 피격 및 외부 CP0 개입을 구분. |
| Stamina | 90 | E2 | 반복된 전투·재기 성과와 동시에 기어 5 노화 유사 소모, 카이도 제압 후 의식 소실, 스타 건 후 동반 낙하를 반영. |
| Speed | 95 | E2 | 키자루의 움직임에 대한 추격·저지와 실전 타격. 임무 목적과 상대의 도주/추격을 감안해 절대 광속 우위라 단정하지 않음. |
| Technique Mastery | 95 | E2 | 고무 신체·기어 5 거대화/변형 및 전장에서의 연속 응용. 기술 종류를 단순 합산하지 않음. |
| Combat IQ | 89 | E3 | 베가펑크 일행 보호와 즉각적 전장 판단의 성과. 단기 판단을 세계 최고 수준의 장기 전략 지능으로 확대하지 않음. |
| Versatility | 99 | E2 | 변형·거대화·방어·공격·지형 응용·전환. 미검증 현실 조작/무제한 지속력 배제. |

- **Raw Haki = 0 / Weighted Haki = 0**. 무장색·견문색·패왕색 보유는 정성 프로필에서 기록. 기존 Base에 이미 반영한 실제 패기 활용과 중복 산정되지 않도록 추가 가산은 유보.
- **Overall = (97+94+90+95+95+89+99)/7 = 659/7 ≈ 94.142857** (Balanced 1.2). E등급은 점수를 자동으로 증감하지 않는다.
- 카이도전: CP0의 기습적인 간섭, 카이도의 지속적 다수전과 루피의 반복 패배/전투 소모. 카이도 격파 **단일 결과만으로 절대 종합 우위를 확정하지 않음**.
- 에그헤드 키자루전: 베가펑크를 보호하는 루피와 제거 임무를 수행하는 키자루의 목적 차이, 스타 건 성공 직후 루피의 소모를 함께 명시.
- 다른 캐릭터 평가 점수·기존 직접 Matchup 판단을 자동 보정하지 않음.

## 3. 출처와 근거 수준

등록한 6개 Evidence의 `source.type='supplementary'`, `evidenceStrength='moderate'`이며 `canon`으로 자동 승격하지 않았다. 다음은 각각의 근거가 참조하는 **공식 애니메이션 회차 소개**로, 만화의 해당 컷을 전부 검수했다는 표시는 아니다.

- ONE PIECE.com. (n.d.). *몽키 D. 루피 캐릭터 소개*. https://one-piece.com/character/luffy/index.html
- ONE PIECE.com. (2023). *제1069화 루피 vs 카이도 / CP0 교전 개입*. https://one-piece.com/anime/62672/index.html
- ONE PIECE.com. (2023). *제1071화 기어 5 발현*. https://one-piece.com/anime/62947/index.html
- ONE PIECE.com. (2023). *제1072화 기어 5 응용과 소모*. https://one-piece.com/anime/62948/index.html
- ONE PIECE.com. (2023). *제1077화 루피의 카이도 격파 및 의식 소실*. https://one-piece.com/anime/63849/index.html
- ONE PIECE.com. (2025). *제1127화 베가펑크 보호 및 키자루 대응*. https://one-piece.com/anime/72451/index.html
- ONE PIECE.com. (2025). *제1128화 키자루에게 스타 건 적중 후 소모*. https://one-piece.com/anime/72495/index.html

## 4. 자산 경로·저작권 주의

- `public/images/characters/inazuma.webp`와 `kaku.webp` 원본 이미지 blob을 서로 교환했고 회귀 테스트에서 저장소 Git blob SHA를 고정했다.
- `public/images/characters/buggy.webp`, `luffy.webp`를 추가했다. 사용자 제시 그림과 일치하는 공개 이미지 경로의 파일을 WebP로 변환한 것이므로 **사용자 업로드 파일과 원본 바이트 동일성까지 주장하지 않는다.**
- 참조 이미지 링크: 버기 `https://one-piece-artworks.com/app/view/assets/img/BlqAnyy`, 루피 `https://pbs.twimg.com/media/HJdnZZiXsAA5TE9?format=png&name=orig`. 공개 접근 및 출처 표시는 **저작물 공개 재배포 허가의 증명이 아니다**. 파일 속성은 `user-provided-unverified` 유지.
- 임시 자동 이미지 수집에만 사용한 쓰기 권한 GitHub Actions 워크플로는 완료 후 삭제했고 일반 CI/배포 workflow에는 영향이 없다.

## 5. 데이터 보존·검증과 범위

- v0.3.3 약 1.58MB 독립 JSON 파일 **절대 미수정**. 테스트에서 기존 Character 71명, Evaluation 74건 전체 및 15 직접 Matchup, Group·Battle·Evidence·Membership 전부 원래 값과 비교한다.
- `v0180LegacyCohort.ts`에 **신규 루피를 이전 역사적 코호트에서 제외하는 필터만 추가**. 이 파일은 현재 배열을 필터링하는 과거 테스트 보조이며, 독립 역사 스냅샷은 아니다.
- 주요 검증 대상: 72명 탐색/검색, 밀짚모자 선장 우선 배치, 7축 순위·2인 비교, 기존 15 직접 매치업, E2/E3, 소속·전투 근거 추적, 이미지 72장·확대, Git 이미지 SHA, 전체 무결성 및 Balanced 1.2 재현성.
- **자동 테스트/타입 검사/Pages 배포 성공은 실제 PC·모바일 브라우저 수동 검증을 대체하지 않는다.**
- 루피 점수는 후속 직접 원작 만화 대조, 동축 상위권 비교 및 사용자 평가 확정 절차 전까지 Draft이다. 모델 전체 변경·기존 71명 재평가·Matchup 정량 승률 산출은 시행하지 않았다.
- [PR #95 기능 CI run 38425719781](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38425719781): **85개 테스트 파일 / 371개 테스트**, TypeScript 및 Vite 빌드 전부 성공.
- 기능 병합: `main@9d66727e6612ae357d063924f660fa9191517cd7` (v0.4.1 신규 데이터). [main run 38425982667](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38425982667): 동일 커밋 자동 테스트, 빌드, **Pages deploy job 모두 성공**.
- 이 병합 후 문서/이미지 참조 링크의 교정 작업은 별도 검증 PR로 처리하며, 독립 스냅샷·기존 점수·계산 모델은 변경하지 않는다.
- 원작 장면의 완전한 1차 검증, 이미지 공개 재배포 라이선스, PC/모바일 실제 브라우저 수동 사용성 검증은 **미완료**.
- 상세 결과는 [TEST_REPORT.md](../TEST_REPORT.md) 참고.
