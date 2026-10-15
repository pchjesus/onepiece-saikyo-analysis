# v0.4.10 캐릭터 명대사 — 구현·검증 기록 (2026-10-15)

## 기준과 범위
- 기준 main: `20682f774fc6defab9fbaf0c553e9fdfefcf0ae3` (v0.4.9, PR #112 병합).
- 대상: 기존 Character 72명만, 신규 Character/Evaluation/Kaku draft 승인 없음.
- 계산/Evaluation/Haki/전투 기록/Evidence/조직도/매치업/기존 Snapshot 변경 금지.
- 독립 표현 레이어인 `src/data/quotes/characterQuotes.ts`만 새 명대사 source of truth로 사용.

## UI 설계 판단
- A 이름 직하단은 이명·상태 스위처와 충돌하기 쉬움.
- B CombatProfile 내부는 전투 근거와 대사를 혼동시킴.
- **C: 헤더 하단의 작은 별도 인용 영역** 선택. 캐릭터 사진·소속·이명·상태를 먼저 보여주고 그 아래 인용문을 한 번만 표시. 화면 폭 560px 이하에서 정보 행을 세로 배치.
- 한국어 표시를 우선하고, 일본어 원문·공식 출처·상황은 `details`로 펼쳐 확인할 수 있음. 가짜/검증 대기 문구는 표시하지 않음.
- 명대사 영역은 캐릭터 ID를 직접 참조하며 `Evaluation.subjectState` 및 그룹 전환·소속 정보와 무관.

## 출처 검증 레벨
- `pending`: 만화나 공식 보조자료에서 확인하지 못함. 원문·번역 빈 상태로 화면에서 숨김.
- `official-excerpt`: 공식 ONE PIECE.com 본문에 일본어 원문이 인용된 것까지 확인. **원작 만화 컷 또는 한국 정식 번역과 직접 대조한 상태가 아님.** 2026-10-15 기준 노출 17건 전부 여기에 해당.
- `manga-checked`: 추후 원작 만화 실물의 대사·발언자·화수를 확인해야만 지정하는 예약 상태. **현재 0건.**
- 한국어 표시 17개는 모두 **자체 번역(editorial)**. 정식 한국어 대사와 동일하다는 의미가 아님.
- `mangaChapter`는 실제 대조 완료 후에만 추가. 현재 17건 모두 비워 두었음.

## 공식 일본어 인용 확보 17명
| ID | 한국어 자체 번역 표시 요지 | 공식 출처 | 검증 상태 |
|---|---|---|---|
| luffy | 해적왕이 되겠다는 선언 | A | official-excerpt |
| zoro | 검사의 등에 난 상처 | A | official-excerpt |
| nami | 바람과 바다를 상대로 한 항해 | A | official-excerpt |
| usopp | 이별 앞의 눈물 | A | official-excerpt |
| sanji | 여자의 거짓말을 용서하는 신념 | A | official-excerpt |
| chopper | 만병통치약이 되겠다는 꿈 | A | official-excerpt |
| robin | 살고 싶다는 외침 | A | official-excerpt |
| franky | 동료의 퇴로 확보 | A | official-excerpt |
| brook | 반드시 돌아오겠다는 약속 | A | official-excerpt |
| jinbe | 잃은 것만 세지 말라는 조언 | A | official-excerpt |
| koby | 더 이상의 희생 반대 | B | official-excerpt |
| sabo | 에이스의 의지를 잇는 말 | B | official-excerpt |
| ace | 사랑에 대한 감사 | B | official-excerpt |
| law | 약자의 죽음 선택권에 대한 말 | B | official-excerpt |
| shanks | 전쟁을 끝내겠다는 개입 선언 | C | official-excerpt |
| newgate | 원피스 실재 선언 | D | official-excerpt |
| teach | 꿈은 끝나지 않는다는 주장 | E | official-excerpt |

공식 인용 페이지:
- **A:** ONE PIECE.com (2022-04-11), [밀짚모자 일당 10명 명대사 제품 소개](https://one-piece.com/news/o20220411_13783/index.html).
- **B:** ONE PIECE.com (2022-09-15), [코비·사보·에이스·로 명대사](https://one-piece.com/news/o20220915_14869/index.html).
- **C:** ONE PIECE.com (2022-08-10), [샹크스 담당 성우 공식 행사 보도](https://one-piece.com/news/o20220810_14705/index.html).
- **D:** ONE PIECE.com, [마린포드 원작 줄거리 — 흰수염 선언](https://one-piece.com/story/marineford/index.html).
- **E:** ONE PIECE.com (2020-08-03), [티치 발언 인용 공식 기획](https://one-piece.com/news/o20200803_11325/index.html).

## 대기 55명
- `src/data/quotes/characterQuotes.ts`의 `sampleCharacters` 파생 슬롯에 `pending`으로 저장.
- 55건에 임의 원문·만화 화수·밈·창작 문구를 보간하지 않음.
- 미표시 인물도 CharacterPage/스탯/평가/초상화/조직도 등 모든 기존 기능이 정상적으로 렌더링되어야 함.
- 원작 만화 컷 확인 → 원문/발언자/화수 검토 → 공식 번역 여부 대조 → 번역 및 상태 수정 순으로 단계적 확장 필요.

## 자동검증 기준
- 72명의 ID는 유일하며 quote 슬롯과 1:1 연결되어야 함.
- 공식 인용 17건만 실제 텍스트 노출. 55건 pending은 사용자에게 거짓 대사 표시 불가.
- 루피 복수 평가 상태 전체에서 동일한 명대사를 1회만 표시하고 캐릭터 변경 시 캐릭터 ID에 맞게 전환.
- 다른 72명·76 평가·532축 및 Battle/Evidence/Haki/매치업/조직도/스냅샷 기존 테스트 실패 금지.
- TypeScript/Vite 빌드와 PR의 GitHub Actions 통과 후에만 병합. CI 결과는 별도 확인.
- 실제 PC/모바일 브라우저에서 줄바꿈·원문 링크·접근성 점검은 **미수행**으로 분리.

## 잔여 위험 및 후속 결정
1. 만화 원작 컷을 직접 보지 않았으므로 정확한 만화 페이지/화수 및 원문 구두점은 인용 당시 표기만 검증됨.
2. 자체 한국어 번역은 한국 정식 번역의 정확한 문구가 아니며, 명확히 고지함.
3. 짧은 대사라도 비상업적 공개 사이트에 인용 시 출처/저작권 검토가 필요함.
4. 원본 72명 전수 검증 후에야 **72명 모두 대표 대사 확정**으로 선언할 수 있음. 현재 기능은 **17/72**의 검증된 공식 보조자료 인용 단계임.
5. 캐릭터의 원작 발언이 확인되면 키와 별도로 출처(가능하면 원작 권·화·장면)와 검증 상태만 갱신. 점수 계산에 사용하지 않음.
