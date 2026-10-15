# v0.4.11 — 요청 8인 프로필/사진/명대사 선등록 (2026-10-15)

## 변경 목적과 고정 데이터
- 기준: v0.4.10 `main@741335a0f0ea4dd0d0d5adceca0d4ae20eeae275`.
- 사용자 제공 사진 8장 순서: 게르니카, 마하, 우솝, 나미, 쵸파, 니코 로빈, 프랑키, 브룩.
- **이번 버전은 캐릭터 등록·소속·사진·기존 검증된 명대사 표시만 수행.** 정밀 스탯 심사 및 대사 변경은 다음 작업에서 진행.
- 카쿠/에넬은 현재 정식 등록 범위 밖이며, v0.4.9 `KAKU_NINE_CHARACTER_DRAFT` 문서의 점수는 승인 Evaluation으로 승격하지 않는다.
- 기존 72인 76 Evaluation/532 Stat, 모든 Battle/Evidence/Haki Raw/17 Matchup, Balanced1.2/Haki0.5, `evaluation-set-v0.4.9` 및 이전 Snapshot 보존.
- 등록 후 80 Character, 105 Membership, 72 evaluated. 기존 순위는 72명 유지.

## 추가 등록
| characterId | 표시 이름 | 소속 | 역할 | 초상화 파일 | 상태 |
|---|---|---|---|---|---|
| guernica | 게르니카 | CP0 | 요원 | guernica.webp | 미평가 |
| maha | 마하 | CP0 | 요원 | maha.webp | 미평가 |
| usopp | 우솝 | 밀짚모자 일당 | 저격수 | usopp.webp | 미평가 |
| nami | 나미 | 밀짚모자 일당 | 항해사 | nami.webp | 미평가 |
| chopper | 토니토니 쵸파 | 밀짚모자 일당 | 선의 | chopper.webp | 미평가 |
| robin | 니코 로빈 | 밀짚모자 일당 | 고고학자 | robin.webp | 미평가 |
| franky | 프랑키 | 밀짚모자 일당 | 조선공 | franky.webp | 미평가 |
| brook | 브룩 | 밀짚모자 일당 | 음악가 | brook.webp | 미평가 |

## 구조 결정
- `src/data/sample/v0411UnratedCharacterRegistration.ts`은 새 Character 및 Membership만 선언.
- 기존 `sampleCharacters` 및 `sampleMemberships`에 append, 중복 ID/Group 생성을 하지 않음.
- `UnratedCharacterPage`를 사용해 캐릭터 이름, 사진, 소속, 전투 프로필만 보여주고 **미평가 / 순위 미포함**을 분명히 표시.
- 기존 `CharacterQuote` 컴포넌트를 미평가 화면에도 연결.
- 앞선 v0.4.10 ONE PIECE.com 일본어 인용 자료에 존재했던 우솝·나미·쵸파·로빈·프랑키·브룩의 대사 6개를 활성화; **자체 한국어 번역**이며 만화 화수·공식 한국어판 대조는 미실시.
- 게르니카/마하는 임의로 명대사를 채우지 않으며 `pending`으로 유지. 19 official-excerpt / 61 pending.
- 새 8명 패기는 모두 재검증 대기로 표시하며 평가 점수나 패기 Raw를 만들지 않음.
- 사용자 제공 이미지 원본의 권리자·공개 재배포 허가는 확인되지 않았으므로 기존 화면과 동일하게 고지.

## 검증
- 신규 8 ID의 Character/Group/Membership/초상화/명대사 일대일 대응.
- 80 unique characters, 105 Memberships, 72 evaluated, 76 Evaluations, 532 Stat, 17 Matchups.
- 미평가 인물이 기존 점수 순위 및 매치업 계산의 분모에 포함되지 않을 것.
- 8인 모두 선택/상세 이동/모바일 이미지 overflow 여부 확인.
- 기존 평가/근거/조직도/스냅샷 전부 회귀검증.
- 실제 PC/모바일 디바이스 시각 테스트와 저작권·원작 대사 전수 검증은 별도 단계. CI 성공과 구분.
