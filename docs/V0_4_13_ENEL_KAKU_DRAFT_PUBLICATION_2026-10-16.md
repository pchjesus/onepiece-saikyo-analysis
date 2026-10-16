# v0.4.13 — 보류된 에넬 신규 평가·카쿠 재평가 초안 공개 (2026-10-16)

## 승인·범위

- 사용자 요청: **이미 산정한 7축이 웹에 반영되지 않은 모든 캐릭터를 확인해 표시**.
- 기반: `main@e703748bb4507dac96925137e4a0bb95d100c214` (v0.5.0 Stage 1 80인 전수 감사 및 CI/Pages 성공).
- 미반영 숫자 후보 발견: `docs/V0_4_9_KAKU_NINE_CHARACTER_DRAFT_REVIEW_2026-10-15.md`의 아홉 신규 후보 중 8명은 v0.4.12에 등록됨. **에넬 1명만 캐릭터/Evaluation 미등록**; 카쿠는 기존 등록 평가를 유지하고 있었으나 **재평가 점수 제안은 미적용**.
- 현재 요청을 두 건 모두 **사용자 승인한 공개 잠정 평가(Draft)**로 해석한다. **확정/공식 캐논 수치 승격은 아님**.
- 신규 에넬 외 추가 인물의 객관적 7축 숫자가 없는 역사적 그룹 제안(예: 벤 베크맨/야솝 등)은 **억지 숫자를 생성하지 않음**. 카쿠 외 현행 숫자 비교의 보류 제언은 사용자가 이번에 확정 점수 조정하라는 뜻으로 해석하지 않는다.

## v0.4.9 초안 그대로 채택하는 수치 (Attack/Defense/Stamina/Speed/Technique/Combat IQ/Versatility)

| 인물 | 구분 | Attack | Defense | Stamina | Speed | Technique | IQ | Versatility | Overall |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 에넬 | 하늘섬 편 · 신규 | 88 | 72 | 72 | 88 | 84 | 70 | 87 | 80.143 |
| 카쿠 | 에그헤드 각성형 · 공개 재평가 | 77 | 75 | 75 | 78 | 84 | 75 | 78 | 77.429 |
| 카쿠 | 직전 표시 평가 (불변 원본) | 73 | 72 | 75 | 75 | 79 | 72 | 74 | 74.286 |

**의미:** 이번 점수는 v0.4.9 문서에서 이미 제안한 숫자이지 새 원작 검증을 통해 재산정한 값이 아님. 에넬은 E2/E3 혼재, `Raw Haki=0`; 카쿠도 E2/E3·기존 Haki Raw가 그대로다.

### 에넬 등록 정책

- 기존 `skypiea` 하늘섬 Group 재사용, `enel` ID만 1회 등록, 당시 지역 지배자 Membership 1.
- 고로고로 열매, 번개 광역 공격·맨트라와 루피 고무 상성 분리. 하늘섬 편 시점만 평가, 이후 성장/검증 안 된 무장색·패왕색 Raw는 추가하지 않음.
- 2개 상황 Battle·2개 Evidence는 `ONE PIECE.com` [에넬 소개](https://one-piece.com/character/Eneru/index.html), [하늘섬 공식 줄거리](https://one-piece.com/story/skypiea/index.html), [TV182](https://one-piece.com/anime/182/index.html)를 `supplementary` 보조자료로 표시. 원작 만화 패널 전체를 확인했다는 의미가 아니다.
- 기존 사용자 제공 에넬 초상화 파일이 없으므로 **이니셜 대체 표시**를 사용. 저작권 확인되지 않은 이미지를 무단 다운로드·재배포하지 않는다.
- 실제 원문과 번역이 검증된 대표 명대사가 없으므로 `pending` 슬롯 유지. 기존 80명 명대사 14 official / 66 secondary 등록 전부 보존.

### 카쿠 재평가 정책

- 기존 `evaluation-kaku` 원본은 `sampleEvaluations`에 변경 없이 남기고 **현재 리포지토리 읽기 측면에서만** 새 version `evaluation-v0.4.13-kaku-v049-provisional`을 적용. UI에서는 카쿠 동일 인물 1명/대표 평가 1개만 유지.
- 7축 중 Attack/Defense/Speed/Technique/IQ/Versatility 6축만 변경, Stamina 75(E3)는 유지.
- 기존 Evidence ID 귀속, E1/E2/E3, 모든 Raw 패기 기여량은 보존. 세라핌 상대 일시적 협동·스튜시 기습·조로와의 공방을 다른 인물 성과로 귀속하지 않는다.
- 새 원본 컷 독립 확인 전까진 `draft`로 표시, 이 수치에 대해 점수 신뢰도를 높여 확정하지 않음.

## 데이터 구조·회귀 위험

- 현재 통합: **81 Character, 81 evaluated, 85 Evaluation, 595 Stat, 106 Membership, 17 Matchup**.
- 기존 정적 v0.3.3 JSON과 이전 76 Evaluation 원본, 별도 8인 임시 평가, Balanced 1.2/Haki Weight 0.5, 캐릭터별 복수 시점과 기존 UI 레이아웃 변경 없음.
- `v050CurrentDataset` 전수 감사 입력을 현재 등록 숫자까지 확장; 역사적 80인/588축 CI 집계는 `docs/V0_5_0_READONLY_AUDIT_STAGE1_2026-10-16.md`에 이전 버전 기록으로 보존.
- 명대사/초상화의 신규 빈 슬롯이 **기존 80인 전체 검증 완료 상태를 오인하는 결과**를 만들지 않도록 별도 `pending`을 표시.
- 순위는 한 Character ID당 한 행, 동일 점수 동점 정책·매치업 결정 로직 변경하지 않음. 에넬이 기존 80인 중간에 들어오며 뒤쪽 표기 등수는 변할 수 있음; 카쿠 점수 교정으로 등수 변화가 있을 수 있음. 단, 다른 인물의 7축 점수나 순위 계산 규칙을 바꾸지 않는다.

## 검증/승인 정책

- 단일 feature 브랜치 PR, 기존/신규 Vitest + TypeScript/Vite build, 81인 Rank/상태/조직도/상세/quotes, v0.3.3 기준선 재현 및 595축 통합 감사.
- 최신 검사 SHA, CI pass/fail 및 main Pages 배포 결과는 완료 시 별도 기록. 실제 브라우저 PC/모바일 상호작용은 자동 SSR/Vitest만으로 검증 완료라고 표시하지 않음.
- v0.5.0 전수 감사 및 별도 점수 변경 승인 정책은 계속 유효. 이번에 공개한 Draft 수치 역시 심층 감사 대상.

## 원문 출처 (APA 7th 형식)

- pchjesus. (2026, October 15). *카쿠 7축 재평가 및 신규 아홉 캐릭터 점수 초안* [프로젝트 내부 초안]. GitHub.
- ONE PIECE.com. (n.d.). *エネル* [캐릭터 소개]. https://one-piece.com/character/Eneru/index.html
- ONE PIECE.com. (n.d.). *空島編* [공식 줄거리]. https://one-piece.com/story/skypiea/index.html
