# v0.4.20 마젤란 정규 캐릭터 등록 — 승인 잠정 평가

## 사용자 승인 범위
마젤란을 임펠다운 편 당시 기준 정규 캐릭터로 추가한다. Attack92 / Defense83 / Stamina82 / Speed80 / Technique91 / Combat IQ83 / Versatility91. 7축 합 602, Balanced 1.2 평균 86.00. 독립 패기 Raw 0. 신규 매치업 없음.

## 실제 구현
- 기존 impel-down 그룹, 일반 CharacterPage, 검색과 순위, 공통 프로필 및 근거 추적 재사용.
- 캐릭터 1, 소속 1, 평가 1(7축), 전투 맥락 4, 근거 6 신규 등록. 정규 81→82 / 전체 평가 85→86 / 595→602축. 차를로스 특별 인물은 별도.
- 현 공식 소개 '부서장'과 임펠다운 편 당시 '서장'을 구분.
- 등록된 그림·검증된 명대사 자료가 없어 이미지 또는 대사를 임의 생성하지 않음. 이름 기반 기존 대체 표시 활용.

## 근거와 시점
- 공식 ONE PIECE.com 인물·원작 편 소개 및 TV 436, 437, 448, 449, 450, 452화 공식 시놉시스에 근거. 원작 만화 컷 직접 상세 검증 아님. Evidence.source.type = supplementary.
- 루피는 실제 독에 중독되었지만 마젤란 역시 루피의 직접 타격을 받음. 검은수염 해적단 중독 제압과 시류의 해독제 제공은 흔들흔들 열매 이전 티치로 한정.
- 탈옥조 추격은 신체 최고속 실측이 아니며, 이완코프·이나즈마 개입과 이들의 탈출 목적을 보존. Mr.3 밀랍 방벽의 히드라 차단과 독의 거병 사용 모두 기록.
- Attack에는 상대를 실제 중독·전투 불능에 빠뜨린 성과를, Defense에는 공격 경로 억제 및 실제 피격·상성 한계를, Technique에는 독의 조작 숙련을, Versatility에는 전장별 역할 폭을 분리 반영.
- 근거 준비도 E2: Attack / Technique / Versatility, E3: Defense / Stamina / Speed / Combat IQ. 모두 상태 draft. Haki 미확인 = 비보유 확정 아님.

## 보호 및 검증
- 원본 sampleEvaluations(76) 및 기존 85개의 현재 평가 점수, 기존 18 매치업, Balanced 1.2/Haki 0.5, 역사적 v0.3.3 JSON 고정 스냅샷 불변.
- 신규 정규 7축+Evidence 연결/검색/소속/전체 순위/공통 상세/감사 테스트 및 CI로 검증한다.
- CI 성공을 실제 PC·안드로이드 브라우저 렌더링 검증 완료로 표현하지 않는다.

## 참고 공식 출처
- ONE PIECE.com 인물 https://one-piece.com/character/Magellan/index.html
- ONE PIECE.com 임펠다운 https://one-piece.com/story/impel_down/index.html
- ONE PIECE.com TV436 https://one-piece.com/anime/436/index.html
- ONE PIECE.com TV437 https://one-piece.com/anime/437/index.html
- ONE PIECE.com TV448 https://one-piece.com/anime/448/index.html
- ONE PIECE.com TV449 https://one-piece.com/anime/449/index.html
- ONE PIECE.com TV450 https://one-piece.com/anime/450/index.html
- ONE PIECE.com TV452 https://one-piece.com/anime/452/index.html
