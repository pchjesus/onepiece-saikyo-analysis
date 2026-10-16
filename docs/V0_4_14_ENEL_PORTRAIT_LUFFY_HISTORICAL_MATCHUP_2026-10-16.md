# v0.4.14 — 에넬 사용자 제공 초상 · 하늘섬 루피 실전 매치업 (2026-10-16)

## 범위와 보호 대상

- 기준: `main@758786749050c1f37df9436522ace7d8c481d19c` (v0.4.13, PR #122).
- 변경: Enel `enel`의 사용자 제공 WebP 초상 1장 및 **Enel vs Monkey D. Luffy (Skypiea)** 역사적 매치업 **1건**.
- 고정: Character 81, Evaluation 85, axes 595, Membership 106, 기존 17대진, 원래 에넬 88/72/72/88/84/70/87 (Overall 80.143), 카쿠 기존 v0.4.13 재평가, Balanced 1.2 / Haki Weight 0.5 / v0.3.3 독립 JSON.
- 결과: 18대진, Evaluation 데이터 버전은 `evaluation-set-v0.4.13`으로 유지. v0.5.0 Stage-1 읽기 전용 감사 데이터는 최신 매치업만 18건으로 집계.

## 업로드 이미지 · 권리

- User-supplied file: `1000039253.webp`; destination: `public/images/characters/enel.webp`.
- 원본 WebP **640×512, 114638 bytes**, SHA-256 `7444f51eedfcc370908b9860c653be921690cd55110265c740d5483f4d6126eb`. Git blob SHA-1 `abacad73807b12d9de9701d539d2f0eb6364198e`.
- 파일 재인코딩·생성·임의 이미지 대체 없음. 기존 사용자 제공 80장 레지스트리 및 바이너리 불변.
- `characterPortraits.ts` 별도 v0.4.14 항목, `permission: user-provided-unverified`. 이미지의 원저작권자 및 공개 재배포 권한 **미확인**; 게시 권한 확인을 의미하지 않는다.
- 기존 CharacterPortrait 재사용: 캐릭터 카드/검색/상세/이미지 확대·닫기, 404 시 이름 fallback, 작은 화면 기본 반응형 디자인. 이 기능의 실기기 동작은 별도 수동 확인 대상.

## 실전 상성에 대한 Canon과 추론의 분리

| 구분 | 작중·공식 보조 출처가 뒷받침하는 내용 | 판단 제약 |
|---|---|---|
| 전격 상성 | 고무 신체의 루피에게 에넬의 전격이 무효 | 에넬의 보편적인 공격력 하향 아님 |
| 감지·대응 | 맨트라 사용과 루피의 생각 비우기·불규칙 공격 대응 | 감지 범위/반응속도 배율 추정 금지 |
| 다른 피해 유형 | 에넬의 전열 창은 루피에게 열 공격 수단 | 모든 열/타격이 자동 승리조건은 아님 |
| 전장과 제약 | 맥심·황금 구체로 루피의 추격/공격 경로 방해 | 중립·무장비 결투로 일반화 금지 |
| 일반적인 위협 | 광역 전격·능력 기반 이동·탐지와 변형 응용 | 별도 점수·Haki Raw 중복 가산 금지 |
| 원작 최종 결과 | 루피가 에넬을 격파 | 승률, 종합 전투력의 역산 근거 아님 |

### 시점 불일치 보호

현재 `enel:skypiea`는 7축 잠정 평가가 있으나, `luffy`의 데이터화된 상태는 **와노 이후/에그헤드 기어 4 이하 및 기어 5**다. `luffy:skypiea` 점수는 없다. 새로운 7축이나 시대 환산 계수를 생성하지 않는다.

최소 변경안으로 `MatchupAnalysis.historicalContext`를 **선택적 표시 메타데이터**로 추가했다. 해당 매치업에서는 전투 시점·양측 조건·현장 제약·공식 출처·상성·원작 승리만 보여주고, 잘못된 후반부 루피 점수·레이더·7축 막대·스탯 우위와 Gear 5 상태 선택은 표시하지 않는다. 매치업 데이터에는 승률 및 숫자형 상성 보정이 없다. 다른 17건에서는 기존 계산/시점 선택 UI 그대로 사용한다.

기존 매치업 모델, 계산 함수, 평가 저장 형식은 변경하지 않는다. 미래에 사용자 승인 하에 당시 루피 평가가 추가되면 데이터/모델 기준과 화면 정책을 재검토할 수 있다.

## 근거 자료

자료는 **ONE PIECE.com 공식 일본어 편/애니메이션 줄거리의 보조 출처**이고, 정식 만화 원문 모든 컷/한국어 번역 검증이 아니다.

1. ONE PIECE.com. (n.d.). *空島編*. https://one-piece.com/story/skypiea/index.html
2. ONE PIECE.com. (n.d.). *第182話*. https://one-piece.com/anime/182/index.html
3. ONE PIECE.com. (n.d.). *第183話*. https://one-piece.com/anime/183/index.html
4. ONE PIECE.com. (n.d.). *第184話*. https://one-piece.com/anime/184/index.html
5. ONE PIECE.com. (n.d.). *第192話*. https://one-piece.com/anime/192/index.html

## 검증과 위험

- 17개 기존 대진 배열을 원상 보존하고 새 데이터를 마지막에 추가한다. 다른 점수/Raw Haki/평가·계산·랭킹은 변경하지 않는다.
- 이미지 binary SHA-256 및 Git blob SHA로 원본 동일성 테스트, 데이터 ID·근거 연결 검증, 81/85/595/106/18 감사, 7축·Baseline 재현, 상세·검색·추천 대진 및 React 화면 JSDOM 회귀 테스트 추가.
- GitHub PR의 전체 Vitest/TypeScript/Vite 검증과 main Pages 워크플로 실행 정보는 **실제 실행 결과를 확인한 뒤** `TEST_REPORT.md` 및 PR에 기록한다.
- 실제 Android/iOS/데스크톱 브라우저 렌더링과 Image Lightbox, 실제 화면 너비별 QA는 코드/가상 DOM 검증과 구분한다.
- 남은 책임 범위: 원본 작품의 컷 검증, 이미지 공개 재배포 권리 확인, 루피 하늘섬 7축 평가 여부(미산정).
