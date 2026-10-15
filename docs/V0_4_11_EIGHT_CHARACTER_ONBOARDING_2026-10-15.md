# v0.4.11 — 요청 8인 프로필/사진/명대사 선등록 (2026-10-15)

## 변경 목적과 고정 데이터
- 기준: v0.4.10 `main@741335a0f0ea4dd0d0d5adceca0d4ae20eeae275`.
- 사용자 제공 사진 8장 순서: 게르니카, 마하, 우솝, 나미, 쵸파, 니코 로빈, 프랑키, 브룩.
- **이번 버전은 캐릭터 등록·소속·사진·기존 검증된 명대사 표시만 수행.** 정밀 스탯 심사 및 대사 변경은 다음 작업에서 진행.
- 카쿠는 기존 정식 등록·기존 Evaluation을 유지하며 재평가하지 않았다. 에넬은 이번 8인 추가 대상이 아니다. v0.4.9 `KAKU_NINE_CHARACTER_DRAFT` 문서의 점수는 승인 Evaluation으로 승격하지 않는다.
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
- **기존 `sampleCharacters` 및 `sampleMemberships`(72명/97건)는 변경하지 않는다.** CharacterRepository/GroupRepository에서 별도 v0.4.11 미평가 프로필(8명/8건)을 병합해 화면에 표시하며 기존 평가·스냅샷 회귀 기준을 보존한다.
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

## PR #114 — 실제 바이너리 업로드 확인
- [PR #114](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/114) 브랜치에 사용자 제공 이미지 8장을 **원본 크기의 WebP 바이너리로 실제 업로드 완료**. 첫 연결 커밋 `3e9e78e7e3d1ee7370d87f6cc3860c06b3a5c47a`.
- GitHub Tree에서 `public/images/characters/{guernica,maha,usopp,nami,chopper,robin,franky,brook}.webp` 8개 경로·바이트 크기·SHA-1 확인. `tests/v0411PortraitBinaryIntegrity.test.ts` 추가로 CI에서 파일 헤더·크기·SHA 재검증하도록 구성.
- 이미지 크기/파일 바이트는 로컬 준비 ZIP의 WebP와 정확히 일치. 최초 사용자 첨부 PNG를 그대로 업로드한 것은 아니며, 원본 해상도 유지 WebP 변환임.
- 마지막 단계: 바이너리 변경 반영 후 CI/빌드 전부 확인 → PR Draft 해제 및 병합 → main GitHub Pages 배포 결과 확인. **PC·모바일 실기기 시각 검증은 별도 미수행**.
