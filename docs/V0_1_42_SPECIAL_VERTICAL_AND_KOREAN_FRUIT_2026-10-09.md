# v0.1.42 — 특수 전투요소 세로 배치와 한글 표기

## 요구사항
사용자의 두 스크린샷을 기준으로 분류 제목 `악마의 열매 / 종족 특성`은 보존하고, 개별 능력은 다시 위→아래로 펼쳐지는 기존 형태를 사용한다. 두 개의 사각형 패널을 제거한다.

## 구현
- `src/ui/styles.css`: 2열 CSS Grid 제거, Special 내용을 세로 블록으로 복원. 각 요소의 기존 제목·상태·한계·설명은 그대로 노출하며 얇은 구분선만 사용한다.
- `src/data/sample/characters.ts`: 열매 이름 중 한국어로 일반적으로 통용되는 정식 용어를 사용한다. 사보 `이글이글 열매`, 로 `수술수술 열매`, 핸콕 `매료매료 열매`, 카타쿠리 `쫀득쫀득 열매`, 카라스 `그을음그을음 열매`, 몰리 `밀어밀어 열매`.
- 원작의 능력·열매 분류와 한국어 번역의 사용 여부는 서로 구별한다. 공식 ONE PIECE.com 일본어 프로필은 능력 존재의 공식 출처이며, 한국어 문자열은 통용 표기를 참고하였다. 정식 라이선스 한국어 단행본의 각 표기 확인은 별도 확인 사항이다.
- `src/ui/components/CombatProfile.test.tsx`에서 그룹 공통 분류와 특성 데이터·이름을 검사한다.
- 점수, 계산 모델, 근거 ID, 소속, 매치업, `PROJECT_SPEC.md`, 글로벌 팔레트는 변경하지 않았다.

## 출처 — APA 7th
ONE PIECE.com. (n.d.). *サボ*. https://one-piece.com/character/sabo/index.html

ONE PIECE.com. (n.d.). *モーリー*. https://one-piece.com/character/Morley/index.html

ONE PIECE.com. (n.d.). *カラス*. https://one-piece.com/character/Karasu/index.html

