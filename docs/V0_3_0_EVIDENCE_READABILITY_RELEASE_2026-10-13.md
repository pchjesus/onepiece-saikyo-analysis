# v0.3.0 출처·근거 가독성 통합 개선 — 개발 및 검증 기록

**작성:** 2026-10-13 · 기준: v0.2.1 main `4307dc53fb2e528d078db3bd3db91738c2652088`

## 승인된 범위

사용자 확정 1B/2B/3B/4B/5B: 출처 유형은 중립적인 텍스트, 평가 근거 카드는 핵심 정보 우선 + 상세 펼침, E1~E3 중심/E4 참고 안내, 모바일 글씨·버튼 개선 및 스크롤 검토, 매치업 근거 탐색 UI는 v0.6에 보류.

## 구현 내용

1. **SourceCitation:** 기존 원본 출처 문자열/HTTPS 주소를 그대로 보존하면서, 출처 종류와 공식 프로필/애니 URL 또는 팬 해설의 *확인 가능한 성격만* 사용자에게 설명한다. `canon`은 등록된 원작 회차 참조를 뜻하지 전체 만화 원문을 다시 검증했다는 뜻이 아니다. 임의의 신뢰도 점수 없음. 유형 미상은 `자료 유형 미확인`.
2. **CombatProfile:** 원래 출처 항목 개수와 긴 URL 없는 요약 링크를 유지하고, 관련 *외부 참고*로 [공식 비브르 카드 목록](https://one-piece.com/vivre/list2/index.html)을 연결한다. 이 사이트가 각 평가의 새 근거라는 뜻은 아니다.
3. **EvidenceList:** 원작 회차 참조 / 공식 애니 등의 보조 자료 / 커뮤니티 자료에 따라 Fact 섹션 제목을 구분한다. Canon Fact·Combat Context·Interpretation·Evaluation Impact·Uncertainty 데이터 자체는 변경하지 않는다.
4. **EvaluationTrace:** 7축 Base/Raw/Weight/Final 수치 및 rationale은 즉시 노출, 출처/전투 이동은 기본 닫힌 `details`로 변경해 스캔 가독성을 개선한다. 실제 Evaluation 변경 시 열림 상태를 재설정한다. 특정 출처의 battleId 이동은 유지.
5. **Readiness:** E1/E2/E3가 승인된 유일한 단계임을 앞세우고 미정의 E4를 별도 주석으로 내린다. 근거 강도 vs readiness vs 공식성은 서로 다른 개념.
6. **반응형/접근성:** 작은 정보 배지·비교 버튼·출처 링크·근거·모바일 본문 폰트와 여백을 명시적으로 보완. 페이지 내 중첩 스크롤은 실제 디바이스로 검증하지 않은 상태이므로 임의로 제거하지 않는다.
7. **사진:** 공식 VIVRE CARD 이미지/애니 캐릭터 아트의 공개 배포 허락을 확인하지 못함. 공식 사이트 링크는 가능하지만, 출처를 적는 것만으로 저작권 사용 권한이 생기지 않는다. 기존 등록된 권한 기반 local portrait registry와 글자 대체표시를 보존하고, *허락된 이미지가 실제 등록될 경우* 출처를 이미지 바로 아래 작게 제공하도록 컴포넌트 준비.

## 코드 변경 경계

- **영향 파일:** `src/ui/components/SourceCitation.tsx`, `EvidenceList.tsx`, `EvaluationTrace.tsx`, `StatComparisonDialog.tsx`, `CombatProfile.tsx`, `EvidenceReadinessHelp.tsx`, `CharacterPortrait.tsx`, `src/ui/pages/CharacterPage.tsx`, `src/ui/styles.css` 및 관련 테스트/릴리즈 문서.
- **점수·평가·저장 데이터 무변경:** `PROJECT_SPEC.md`, `src/data/sample/{characters,battles,evidence,evaluations,matchups}.ts`, `src/domain/calculation/`, 70 Character/72 Evaluation/504 Stat/15 direct Matchup, Balanced 1.2, Haki Weight 0.5.
- **v0.6 이관:** Matchup Factor의 개별 Evidence 탐색 UI/새 Scenario. **v0.4 이후의 설계:** 사용자 후속 결정 때 진행.

## 검증 원칙

- 70인 전체 source card 항목 및 URL 갯수, 에이스 공식/팬 출처, 울티/X드레이크 다중 링크, 외부 링크 rel/target 및 잘못된 URI 처리.
- 연결 평가 출처 펼침/접기, battleId 깊은 이동, 시점 변경, E1–E3/E4 메타정보, 7축/전체 순위/동축 비교, 검색/매치업/패치 내역.
- PR 최종 head와 merge SHA CI, Pages SHA 일치 확인. 실제 모바일/데스크톱에서 출처 말줄임, 팝업, 중첩 스크롤, 터치/키보드 포커스는 별도 확인 필요.

## 관련 공식 페이지 (외부, 사진 복제하지 않음)

- [공식 VIVRE CARD 카드 목록](https://one-piece.com/vivre/list2/index.html) — 캐릭터 도감 자료 찾아보기.
- [공식 VIVRE CARD 사이트](https://one-piece.com/vivre/index.html).
- [공식 만화 체험판의 무단 복제·전재 금지 안내](https://one-piece.com/op/110trial/) — 공식 자료라도 별도 공개 재배포 허락이 자동 제공되지 않음.

**남은 한계:** 사용자가 직접 보지 못한 브라우저 화면을 검증 완료로 주장하지 않는다. v0.3은 출처의 표현·사용성 패치이며 원작 원문 전체에 대한 신규 사실 검증 완료가 아니다.
