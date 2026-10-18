# 킹의 루나리아 불꽃 ON/OFF 설명형 평가 — A안 구현 계약

- 기준 `main` SHA: `603a521dfee93b526c8dd3c444bd21ef07107eac` · 앱 `v0.4.31`
- 사용자 승인: 2026-10-18, **A안(단일 84.0 / ON·OFF 조건 설명 강화)**
- 범위: 킹(알베르)의 기존 CharacterPage 7축 아래 두 상태의 **정성 비교 패널** 표시. 반응형 간격·레이아웃만 최소 추가.
- 목적: 루나리아 **ON의 높은 방어**와 **OFF의 높은 속도**가 서로 상충함을 보여, 단일 7축 점수가 두 순간 최고값의 동시 발현이라는 오해를 방지.
- 기존 원천: `sampleCharacters`의 `special-king-lunarian` 특성과 `evaluation-v0.4.30-beasts-bidirectional`의 현재 Evaluation / Manga Ch.1032·1035 Evidence. 두 숫자(방어 88, 속도 85)는 **컴포넌트가 임의 복제하지 않고 현재 Evaluation에서 가져온다.**
- 새 상태별 수치·예상 승률·전환 지속 시간/쿨다운·최적 모드 사용비율을 임의 생성하지 않는다.
- UI에서 “실전 상태 교환이 가능한 캐릭터의 통합 평가”임을 명시하되, 이것이 완전한 1대1 모델이라고 주장하지 않는다.

## 불변 계약

- 7축 `[84,88,85,85,83,79,84]`, Overall `588/7=84.0` 표시, Balanced 1.2 / Haki Weight 0.5.
- `Evaluation`·Base/Raw·Rank/Matchup·State ID/Default·스토리지·82인/88 Evaluation/616축·v0.3.3 frozen baseline·원본 `sampleEvaluations`·기존 Evidence는 모두 변경하지 않는다.
- 일반 캐릭터의 `CharacterPage`와 차를로스 전용 예외 정책을 유지. 설명 패널은 킹 데이터에 대해서만 렌더링한다.
- 이번 패치는 기존 앱 버전 `0.4.31`의 **비수치 UI 보완**이며 별도 평가 데이터 버전이나 계산 모델 버전을 올리지 않는다.

## 관련 위험 / 검증

1. 패널이 킹 외 다른 인물에 노출되지 않는가?
2. 7축 값이 소스에서 읽히고, Score/Rank 계산이나 기존 스론·기어 Evaluation 개수가 바뀌지 않는가?
3. 520px 이하에서 ON/OFF 카드가 세로로 배열되고 좁은 화면에 가로 스크롤이 생기지 않는가? CSS는 구현 검토, **실제 디바이스 시각 확인은 별도**다.
4. 원작에서 검증된 두 상태의 **변화 방향**만 표시하고, ON이 절대 무적이라거나 OFF가 특정 수치만큼 상승한다는 주장을 추가하지 않는가?
5. 문서만 진행 중인 별도 출처 감사 Draft PR #154와 충돌하지 않는가? 이 구현 PR은 독립 파일만 변경하고 그 문서를 건드리지 않는다.

**검증 상태:** 구현에 대한 자동 테스트/빌드/GitHub CI/브라우저 실측은 실행 결과를 확인한 후에만 보고한다. 기존 PR 및 main 배포의 테스트 결과를 이 PR 검증으로 재사용하지 않는다.

## 근거

- 기존 `docs/CRACKER_AUGUR_KING_FLAME_STATE_AUDIT_2026-10-18.md` (A/B/C 분석)
- `docs/V0_4_30_BEASTS_ALL_STARS_2026-10-18.md`
- 공식 TV1062: https://one-piece.com/anime/61675/index.html
- Manga Ch.1032 / 1035 (현재 Evaluation Evidence 인덱스)
