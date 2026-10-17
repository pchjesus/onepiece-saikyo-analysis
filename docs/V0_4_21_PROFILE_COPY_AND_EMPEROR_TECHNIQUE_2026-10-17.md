# v0.4.21 — 전투 프로필 문구 정리 · 사황 숙련도 보정

## UI 결정
- 전투 프로필 상단에는 `평가 점수와 분리된 원작 기반 전투 정보입니다.`만 남긴다.
- `캐릭터 이미지 관련 공식 자료 · 비브르 카드 공식 목록` 및 `외부 참고 페이지이며 전투력 평가의 추가 근거로 자동 반영하지 않습니다`를 화면에서 삭제.
- 반복되는 시스템 가산점/설명 및 상시 메타 경고를 간결화. 실제 CharacterProfile.sources, Evidence, Haki, Stat, 모든 점수 계산과 '?'로 열어 확인하는 필요 정보는 보존.

## 평가 데이터
- 카이도 Technique: Base 93→95, 기존 패왕색 Raw6 ×0.5=+3, Final 96→98.
- 샬롯 링링 Technique: Base91→93, 기존 패왕색 Raw6 ×0.5=+3, Final94→96.
- 원작 기초 sampleEvaluations 직접 변경 없음; 새로운 현재 평가 오버레이와 evaluationDataVersion을 적용.
- 각 인물 다른 6축, Haki Raw, 평가 ID, 매치업 18건, 모델 Balanced 1.2, Haki 가중치 0.5, 고정 v0.3.3 JSON 기준선 및 82인/86 Evaluation/602축 변함없음.

## 근거·조건
- 카이도: 공식 ONE PIECE.com TV1052 [https://one-piece.com/anime/o6401/index.html]은 루피와 싸우는 카이도의 힘이 약해질 때 오니가시마 지탱 화염 구름 역시 약해졌음을 확인. TV1011 [https://one-piece.com/anime/o6019/index.html]은 섬의 부양 자체를 명시. 장기전 지속·광역 용도(기존 Stamina/Versatility)와 **교전 중 화염 구름 운용을 병행한 제어 숙련**은 구분. 섬 무게나 가상 체력 소모량 숫자 보정 없음.
- 빅맘: 공식 ONE PIECE.com TV1058 [https://one-piece.com/anime/61434/index.html]은 상대 전장 철덩이의 호미즈화, 나폴레옹·헤라·프로메테우스 강화를 언급. 공식 헤라 프로필 [https://one-piece.com/character/Hera/index.html]은 다수 호미즈의 합체 기술을 확인. 기존 만화 1039화 영혼 기반 골절 회복과 함께 **전투 중 능력의 조합·정밀 적용**을 숙련 근거로 반영. 기술 종류·역할 범위는 Versatility, 상황 판단 한계는 CombatIQ로 구분.
- 새로 연결한 공식 TV 근거는 supplementary. 직접 원작 만화 컷을 이번 패치에서 재감사한 것으로 표현하지 않는다.

## 별도 진행 중인 이미지 PR
- PR #137 마젤란 PNG 원본 이미지 작업은 아직 파일 업로드가 완료되지 않은 Draft. 이번 패치의 main 배포에 합치지 않는다.
- PR #137을 차후 완성할 때는 현재 메인에 맞춰 rebase/버전 번호를 변경하여 v0.4.21 기록 충돌과 기능 회귀를 막는다.

## 검증
- 전체 관련/역사 테스트, TypeScript 빌드 및 Pages 배포는 실제 CI 결과로 확인.
- 실제 PC/Android 화면을 직접 열어 본 수동 검증과 CI 성공은 별개.
