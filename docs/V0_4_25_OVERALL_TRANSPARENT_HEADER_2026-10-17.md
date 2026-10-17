# v0.4.25 — 종합 전투력 헤더 투명 레이아웃

## 요구
사용자가 v0.4.24 종합점수 카드가 너무 좁고 딱딱해 보인다고 지적. 색상을 바꿔 다른 카드처럼 만드는 게 아니라 **카드 자체를 없애고** 캐릭터 이름 오른쪽의 기존 배경 위에 종합점수 텍스트를 직접 표시한다.

## 구현
- CharacterPage DOM/이벤트·계산 경로와 클릭 가능한 `power-card-heading` button, 별도의 score-interpretation ? 팝업 유지.
- 기존 `.detail-heading` 안 위치 유지. CSS 영역의 `background:transparent; border:0; box-shadow:none; border-radius:0; min-height:0;`로 패널 스타일을 해제. 검정색/청회색 색상 카드 제거.
- 오른쪽 정렬된 `종합 전투력 ↗` / 큰 `97.6/100` / 작고 절제된 `균형형 · 7축 평균`. 기본 글자색을 현행 본문 중립 회색·차콜로 통일. 이 영역에는 소속색 포인트 스트라이프를 넣지 않는다.
- 영역은 버튼이지만 hover 때 라벨의 밑줄, 키보드 focus 때만 아웃라인 표시. 물음표 버튼 기본 배경/테두리 없음. 설명을 실제로 열 때만 팝업에 흰색 바탕과 테두리를 사용.
- 화면폭이 좁으면 이름 줄 아래로 자동 배치하며, 380px 아래에서는 전체 가용 폭을 활용. 배경에 겹쳐져 떠 있는 그래픽이 아니라 *흰 헤더 내부의 무배경 타이포그래피*다.

## 비범위/회귀
- 차를로스 전용 밈 페이지 디자인은 변경하지 않음.
- 기존 7축 가로 막대 그래프와 순위/비교/? 버튼, 명대사, 소속/사진/전투 근거 변경 없음.
- 마젤란 사진 `magellan-v0422.png` 및 Overall86, 가프 prime/current 종합 계산, 카이도/빅맘 숙련도와 기타 모든 점수 변경 없음.
- appVersion v0.4.25. Core / EvaluationSet v0.4.21, Balanced1.2/Haki0.5, v0.3.3 고정 기준선, 82정규/86평가/602축/18매치업 그대로.

## 검증
- CharacterPageOverallHeader.test.tsx 정적 구조·버전·점수 일치 및 CSS transparent/border0/shadow none·모바일 조건 검사.
- 기존 115개 테스트 파일의 전체 통합/회귀 검사 및 TypeScript build/Pages 배포 결과 별도 확인. 실제 PC/Android 렌더링 시각 확인은 자동 CI와 분리.
