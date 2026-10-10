# v0.1.65 — 표시 문자열 치환의 범위 제한 및 전체 로스터 회귀 테스트

**기준:** `main@c18ccc0a7345a03bc06b4e68ae41dd51e99dade0` / v0.1.64  
**성격:** shared **presentation-only** bugfix; original Canon/Evidence/Evaluation values are never changed.

## 1. 장애 현상과 원인

흰수염의 `evidence-newgate-roger-966`는 원래 "Attack/Defense/Technique Supreme King Raw와 Stamina 핵심 근거다"를 기록한다. `normalizeCharacterNamesForDisplay`의 `/King/g → 알베르`가 `Supreme King Haki` **완전표현 외**의 `Supreme King Raw`, `Supreme King 상쇄`를 캐릭터 킹(본명 알베르)으로 잘못 치환해 **"Supreme 알베르"**라고 표시했다.

다른 위험지점:
- 한글 `/킹(?!」)/g`: **탱킹**(기존 실제 전투 Evidence 표현), **버킹엄**(스튜시 원본), 랭킹·스모킹 등 **단어 중간**을 잘못 변환.
- 무제한 라틴 이름 매치 `/King/g, /Law/g, /Kid/g, /Rocks/g`: Kingdom, Lawrence, Kidney, Rockstar 등 **비인물 일반 단어**의 부분 일치 가능성.
- 출처 문자열의 `https://.../character/King/...`, `/Law/` 등의 **URL 경로**를 번역하면 출처 레퍼런스가 깨질 수 있음.
- “King of Hell”과 “Pirate King”은 캐릭터 King이 아닌 고유 호칭인데 잘못 알베르로 바뀔 수 있는 의미 위험.

### 실제 화면 파급

공통 변환 함수를 사용하는 다음 표시가 영향을 받았다: `EvidenceList`의 사실·해석·평가 영향·불확실성·근거 메타·전투 조건, `BattleTimeline`의 제목, `EvaluationTrace`의 축별 설명, `CombatProfile`의 전투 스타일·패기·특수 능력·출처, `CharacterPage`의 캐릭터 및 평가 시점 설명. **공식 별칭 원본 데이터와 계산값은 오염된 것이 아니다.**

## 2. 제한된 교정 방식

1. 제목과 캐릭터 이름이 충돌하면 **제목을 먼저**: `Supreme King's Haki` / `Supreme King Haki` → **패왕색 패기**, `Supreme King's` / `Supreme King` → **패왕색**. 약어 `Supreme King Raw`는 후속 `Raw` 처리와 결합돼 **패왕색 패기 원점수**로 표시된다.
2. 고유표현 `Pirate King` → **해적왕**, `King of Hell` → **염왕**을 이름보다 먼저 처리해 뜻이 뒤바뀌지 않게 한다.
3. 라틴 문자 캐릭터명 매핑에 ASCII **\b word boundary**를 사용. `King vs Queen`은 기존처럼 인물로 변환하면서 `Kingdom`·`Lawrence` 등은 보존.
4. 한글 별칭 `킹`은 Unicode `\p{L}\p{N}` 앞 경계에서만 치환. 조사 `킹은/이/을/과/에게/의`, 결투 맥락 `킹전`은 명시적으로 올바른 조사를 연결; **"「킹」"** 및 일반 따옴표 속 공식 별칭은 보존. `버킹엄`·`탱킹` 내부에는 치환하지 않는다.
5. `https://`·`http://` URL 구간은 **문자열 수정하지 않고 통과**, 주변 텍스트만 번역한다. 원본 소스/객체/ID/점수는 그대로.

**범위 통제:** `src/domain/character/normalizeCharacterNamesForDisplay.ts`와 해당 테스트 및 신규 통합/전수표시 테스트, 릴리즈 문서만 수정한다. 원본 `Evidence`, `Battle`, `Character`, `Evaluation`, 저장/복원, 화면 레이아웃, 도메인 Score/Weight/Matchup은 변경하지 않는다.

## 3. 신규 테스트 — 이번 뿐 아니라 향후 문자열 규칙 변경에도 실행

- **단위:** `normalizeCharacterNamesForDisplay.test.ts`에 `Supreme King Raw/상쇄/공방/직접 적용`, 소유격 King's Haki, 탱킹·버킹엄·랭킹·스모킹, 명시적 킹 조사의 한국어 어미, 인용 별칭, 독립 영문 이름, 부분일치 금지, 해적왕·염왕, URL 무변형, 멱등성을 검증하는 고정 회귀 예시 추가.
- **실제 렌더:** `displayNormalizationRegression.test.tsx`에서 **흰수염의 실 데이터** `evidence-newgate-roger-966`를 `BattleTimeline`으로, `evaluation-newgate-prime`을 `EvaluationTrace`로 출력해 최종 DOM/HTML 텍스트에서 `Supreme 알베르`가 없는지 검사. `stussy`의 `CombatProfile`과 `evidence-stussy-infiltration-1105`의 `EvidenceList`에 **버킹엄**이 온전히 나오는지, 기존 `탱킹` 해석도 유지하는지 확인.
- **전수 표시 문자열:** 60 Character의 프로필·특수 능력·패기·출처, 62 Evaluation/434 축의 설명·Raw 적용, 전체 Battle의 설명·환경·조건, 전체 Evidence의 사실·해석·불확실성·기여근거, 와노 17명 Seed/119개 Note를 모아 반복 변환 멱등성·금지 오류 형태·출처 URL 보존·기존 패왕색 문구의 적정 변환을 검사. **모든 만화 패널 사실성의 자동 검증을 뜻하지 않는다.**

## 4. 위험/검증 경계 및 버전

- 모든 영어 일반 표현 속의 King/Law 등의 **의미 차이를 완벽히 판정하는 번역 엔진은 아님**. 실 corpus + 재발 위험 사례를 명시적으로 회귀 고정한다.
- 기존 `v0.1.64` 점수/7축/평가 데이터 버전, Model Balanced 1.2·Haki Weight 0.5, 대표 59명, 전체 62 Evaluations/434 Stat, 15 직접 Matchup/기존 순위 **변경 없음**.
- PR 커밋의 full test/build 및 병합 후 main SHA의 Pages 배포 확인 전엔 결과를 완료로 표시하지 않는다.
- 실제 모바일 및 데스크톱 브라우저의 직접 눈검사는 자동 렌더링 테스트와 별개로 미검증이다.
