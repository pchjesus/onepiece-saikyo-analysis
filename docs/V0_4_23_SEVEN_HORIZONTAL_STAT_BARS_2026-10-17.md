# v0.4.23 — 가로 막대 7축 스탯

## 사용자 요구
첫 이미지의 기존 핵심 스탯 구획 너비를 유지하고, 두 번째 천룡인 전용 화면의 **가로 막대 7줄** 형태를 일반 캐릭터에 적용. 초기 작업 브랜치의 레이더 차트는 이미지 해석 오류로 출고 전에 전량 제거.

## 구현
- 소스 오브 트루스: 기존 CharacterPage의 Evaluation.items와 Balanced.finalScore. 스탯 Base/Raw Haki/Final·Evidence·순위·매치업 저장 구조 전혀 변경 없음.
- StatList의 각 줄: 번호·이름·근거 E등급·최종 점수·가로 막대·기본점수+패기·기존 전체순위/비교하기/? 버튼.
- 막대 width는 Final score/100. 별도 계산이나 새로운 점수 없음. role=meter 및 aria-valuenow/text 등 적용.
- getCharacterAccent의 기존 소속/대장색 재사용: 해군 #446f92, 백수 #65547c, 해군 대장 칭호 색은 기존 특화값. CSS 축소·키보드 클릭 및 reduced motion 대응.
- 기존 score-overview/overview-layout 2열 구조, 프로필·평가 근거·전투 기록·캐릭터 선택/검색·마젤란 이미지와 차를로스 밈 페이지는 보존.

## 버전과 회귀 범위
기준 main 71b51a8a5afb45a5f44a79c5bd2bb243026fc2d8, v0.4.22 이미지 배포 완료. 이번은 전달 버전만 v0.4.23. coreData/evaluationSet 0.4.21, Balanced1.2·Haki0.5 및 v0.3.3 frozen 기준선 불변.
정규 82명·86 Evaluations·602축·18 matchups. 마젤란 로컬 magellan-v0422.png / Overall86.00, 카이도 숙련98, 링링 숙련96 유지.

## 검증
7개 스탯 실제 점수/막대 %, 소속별 색상, 순위·비교·? 기능, 패기 내역과 모달 상태. Vitest/TS/Vite/Pages 각각 확인. PC/Android 실기기 수동 시각 확인과 CI 통과는 별개.