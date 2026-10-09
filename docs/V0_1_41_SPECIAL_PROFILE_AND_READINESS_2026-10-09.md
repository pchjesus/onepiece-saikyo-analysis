# v0.1.41 — 특수 전투요소·근거 충분도·집단 상징·한국어 표현

**적용 범위:** 사용자 요청 11, 11-1, 11-2, 12, 13, 14. **현행 전체 UI 팔레트 유지.**

## 1. 현재 구조 및 변경

- `CombatProfile.tsx`: 기존 `SpecialCombatTrait[]` 데이터의 **표시 순서만** 악마의 열매 → 종족 특성 → 특수 생리 → 신체 개조 → 장비 → 과학 기술 → 기타로 정렬. 하나의 공통 분류 제목(예: `악마의 열매 / 종족 특성`)을 보여주고 원래 세부 요소를 각각 두 열에 배치하며, 폭이 좁을 때 한 열로 전환한다.
- 기존의 `SpecialCombatTrait` 항목, `status`, `awakening`, `evidenceIds`, 제한과 불확실성, Haki, 계산 경로 등은 변경하지 않는다. 정렬은 원본 배열을 복사한 후 수행한다.
- `CharacterPage.tsx` 헤더의 `?`로 `EvidenceReadinessHelp.tsx` 대화상자를 연다. 등급 설명의 공식 원천은 `domain/evaluation/types.ts`의 `EVIDENCE_READINESS_DEFINITIONS` 상수. 팝업 외부 포인터 터치/클릭, Escape, 닫기 버튼을 지원하며 닫힐 때 포커스를 원래 버튼에 반환한다.
- 원래 등급은 **E1/E2/E3**뿐이다. 사용자 요청에서 언급된 **E4는 아직 데이터 모델에 없으므로 '현재 정의되지 않음'으로만 설명**한다. E4를 Enum에 추가하거나 점수를 부여하지 않는다.
- `CharacterIdentity.tsx`: 백수 해적단의 의미 없는 체스 룩 `♜`을 자체 제작한 25px 뿔 달린 해골과 뼈의 간소화 SVG로 대체. 이는 참고 모티프이며 **공식 깃발 이미지 복제본이 아니다**. 원래 그룹별 강조 색과 다른 아이콘은 유지한다.
- `characters.ts`: 사보, 몰리, 카라스, 루치, 카쿠, 스튜시의 기존 한국어 설명을 더 일관된 용어와 문장으로 다듬었다. 영어 고유명/출처 URL, 참조 ID, 전투 상황, 증거는 유지. 카라스 열매의 **확정되지 않은 한국어 정식 명칭은 임의로 창작하지 않는다**.

## 2. 확인 사실과 해석 분리

- ONE PIECE.com의 사보 캐릭터 소개는 메라메라 열매, 혁명군 참모총장을 확인한다. 화염 능력 설명을 한국어로 명료하게 바꿀 뿐 신규 공격력 보너스를 추가하지 않는다.
- 몰리 공식 프로필은 오시 오시 열매와 거인족, 지중 이동 및 지면을 물결치게 하는 능력을 기록한다. 한국어 기존 이름 `밀밀 열매`는 프로젝트 용어로 유지하고 일본어 공식명과 구분한다.
- 카라스 공식 프로필은 스스스스 열매와 몸을 검댕으로 바꾸는 능력을 확인한다. 한국어 정식 번역 이름에 대한 별도 검증 전에는 이를 '검댕을 다루는 능력'이라고 소개한다.
- 루치·카쿠·스튜시 악마의 열매 종류는 각각 ONE PIECE.com에서 고양이 계열 표범, 소 계열 기린, 박쥐 계열 열매로 확인된다. 사용자 요청 범위를 넘는 능력치 재평가는 하지 않는다.
- 카이도가 백수 해적단 총독이라는 점은 공식 프로필로 확인된다. 뿔 달린 해골·교차한 뼈라는 졸리로저의 구체적 외형은 관련 시각 자료 및 비공식 보조 해설을 참고했으며, SVG는 **자체 간소화한 창작 표현**이다. 세부 선/뿔 개수 등이 공식 깃발의 정확한 재현이라고 주장하지 않는다.
- E등급은 작품 고유 설정이 아니라 **프로젝트의 근거 준비도**다. E1/E2/E3는 숫자 전투력 점수나 저평가 공식이 아니다.

## 3. 회귀 영향 및 검증

- `CombatProfile.test.tsx`: 킹·몰리·스튜시의 통합 분류 제목/악마의 열매 선행/세부 영역 수와 사보 단일 요소 검증.
- `EvidenceReadinessHelp.test.tsx`: 기존 세 등급 정의 정확한 재사용, E4 미도입 설명, 내부 클릭 유지, 외부 포인터 닫기, Escape, 포커스 복귀.
- `CharacterIdentity.test.tsx`: 백수 해적단 룩 삭제, 뿔 해골 SVG와 정상 소속 표현.
- [PR #35 검증](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37887097546): **37개 테스트 파일, 165개 테스트 통과; TypeScript/Vite 빌드 성공**.
- 기존 43 Character master, 42 unique evaluated roster, 45 Evaluation, 315 core Stat, 49 Membership, 15 직접 매치업 및 Balanced 1.2/Haki 가중치 0.5, 패기 Raw 244를 유지한다. `src/data/sample/evaluations.ts`·계산 모듈·`PROJECT_SPEC.md`는 수정하지 않았다.
- **실제 모바일/태블릿/데스크톱 브라우저의 시각·클리핑·터치 동작은 CI로 실증하지 않았다.** GitHub Pages 병합 후 빌드 및 실제 화면 검수는 별도 확인 대상으로 남긴다.

## 출처 (APA 7th)

ONE PIECE.com. (n.d.). *サボ*. https://one-piece.com/character/sabo/index.html

ONE PIECE.com. (n.d.). *モーリー*. https://one-piece.com/character/Morley/index.html

ONE PIECE.com. (n.d.). *カラス*. https://one-piece.com/character/Karasu/index.html

ONE PIECE.com. (n.d.). *ロブ・ルッチ*. https://one-piece.com/character/Rob_Lucci/index.html

ONE PIECE.com. (n.d.). *カク*. https://one-piece.com/character/Kaku/index.html

ONE PIECE.com. (n.d.). *ステューシー*. https://one-piece.com/character/Stussy/index.html

ONE PIECE.com. (n.d.). *カイドウ*. https://one-piece.com/character/Kaido/index.html

One Piece Wiki. (n.d.). *Beasts Pirates*. https://onepiece.fandom.com/wiki/Beasts_Pirates
