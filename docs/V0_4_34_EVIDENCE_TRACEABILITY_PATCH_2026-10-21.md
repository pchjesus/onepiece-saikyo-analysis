# v0.4.34 — 사최간 Evidence 추적성 T1–T3 정합성 패치

> 2026-10-21, 시작 main `802146ddfdb9ee321d3f0811983652b5b14b4cd3`, app/core v0.4.33 / evaluation-set-v0.4.33.
> **승인 범위:** PR #174 42축 및 #175 9축 심화 감사의 **근거 데이터 연결과 현행 표시 문구만** 고친다. Base/Raw/Final, E1/E2/E3, Evaluation·Battle·Matchup 레코드, 계산 모델·UI 구조·과거 샘플은 변경하지 않는다.

## 1. 발견과 최소 패치

| ID | 현재 조회의 문제 | v0.4.34 현재용 Evidence 보정 | 보존 및 해석 한계 |
|---|---|---|---|
| T1 **Vista IQ85** | `evaluation-vista.combatIQ.evidenceIds`에 `evidence-vista-mihawk-561-562`를 사용하지만 원래 `statContributions`에는 Combat IQ 역할이 없음. 읽기 전용 감사에서는 `unmapped` 역할이 가능했음 | 그 Evidence에 **combatIQ/secondary** 1건 추가. 미호크 추격을 막은 시점·근거리 검격 교환에서의 거리/타이밍 판단이라는 **기능적 추론**임을 명시 | 직접 전술 설계/패턴 간파로 확대 금지. 기존 비스타 IQ **85 E3**, Technique92 E1, 타 Stat·Evidence 강도·fact 불변 |
| T2 **Queen Osome** | v0.4.33 Battle·Evaluation은 투명화 성공과 오소메 고의 공격으로 정정됐지만 `evidence-queen-cybernetics-1028-1034`의 combatIQ/context note에 **‘후반 주의 분산’**이 잔존 | 현재용 note만 **정상 투명화/사적 오소메 고의 폭행으로 상디전 목표 이탈**로 정정. 브라키오 런처 자기 피격은 다른 기술 안전성 문제로 구분 | 원본 Ch.1028–1034 Evidence의 출처/fact/강도/role 동일. 퀸 Technique **80 E2**, IQ **74 E3**, 7축 전체 80.0 그대로 |
| T3 **Smoothie Attack** | `evidence-smoothie-pursuit-894.evaluationImpact`가 이전 **Attack76**을 현재값처럼 표기. v0.4.31 이후 현재는 **80** | `evaluationImpact`만 **종전76 → 현행80**으로 구별. 수분 흡수 뒤 대함 장거리 참격/반복 출력은 긍정 실적, 강자 대인 적중 피해는 **미확인**이라고 서술 | 만화 Ch.894 원본 출처/직접 묘사/Stat 기여 역할을 건드리지 않음. 스무디 Attack **80 E2**, 전체 78.7 그대로 |

**아직 심사 중인 것:** 비스타 IQ85의 구체적인 정량 타당성, 퀸 숙련80의 상대 비교, 스무디 Attack80의 대인 피해와 대함 출력 차이, 카타쿠리의 Observation Raw6+6 독립 증분 등은 이번 패치로 승인·확정하지 않았다. E3는 자동 감점이 아니다.

## 2. 구현·현재/역사 구조

- 신규 `src/data/sample/v0434EvidenceTraceability.ts`: 정확한 **3개 Evidence ID**에만 적용하며 예상 과거 텍스트/역할·주체가 달라지면 silent overwrite 대신 예외를 발생시킨다. 기타 Evidence에는 기존 객체 그대로 반환.
- `evidenceRepository.ts`, `src/data/integrity/v050ReadOnlyAudit.ts`의 현재 Evidence 구성에 **기존 v0427→v0429→v0431→v0432 오버레이 이후** v0434 함수를 추가. 두 조회가 같은 Evidence를 보여준다.
- `sampleEvidence`, `sampleBattles`, `sampleEvaluations`, `v0430`·`v0431`·`v0432`·`v0433` 모듈 및 **v0.3.3 frozen snapshot**의 원본·이력을 직접 수정하지 않는다.
- Vista의 secondary stat role은 **읽기/추적용 정성 메타데이터**이며 점수·Readiness에 자동 보너스를 주지 않는다. Queen·Smoothie도 설명 데이터만 변경한다.
- 앱 버전 **0.4.34**, whole core-data **core-v0.4.34**로 데이터 상태를 재현 가능하게 표시. 기존 평가 **evaluation-set-v0.4.33**, Balanced 모델 **1.2**, Weight **0.5**, baseline **v0.3.3**은 유지. 개별 Evaluation dataVersion도 이전 그대로.
- `patchHistory` 최상단에 Evidence 변경 3건을 `v0.4.34`로 신규 기록. 이전 v0.4.33 이하 내용과 버전은 보존. `README.md`·`package.json`·`package-lock.json` 동기화.

## 3. 회귀검증 계약

신규 `src/data/sample/v0434EvidenceTraceability.test.ts`:
1. 비스타 과거 IQ stat role 부재, 현재 secondary 1건만 증가, 기타 Evidence 필드 원본 일치; v050 감사의 IQ role=secondary, IQ85/E3 불변.
2. 퀸의 구 note는 sample에 보존하고 live만 고의성·투명화 정상·런처 문제로 교체; Battle/Evaluation v0.4.33 맥락 불변.
3. 스무디 과거 Attack76 문장은 historical sample에 남고 현재 해설은 80, 대인 적중 미확인 유지. 기타 필드 전부 동일.
4. 대상 외 Evidence 참조 동일, 잭–슈텐마루 current-only 와노 Battle link 보존.
5. **9인 × 7 Final/Overall/ranking**, 82 characters/88 evaluations/616 items/18 matchups, v050 무결성 유지.
6. app/core와 evaluationSet/model/baseline 버전 구분·기록; 원본 예상 텍스트가 drift한 경우 예외.

기존 테스트들의 **오직 현재 버전 기대값**만 0.4.34로 동기화한다. 평가세트 `evaluation-set-v0.4.33`, 퀸 `evaluation-v0.4.33-queen-osome-context-clarified`, 역사 v0.4.33 patchHistory 등은 현행이 아닌 *역사적 버전*으로 **수정하지 않는다**. `npm test`와 `npm run build`는 PR CI에서 실제 결과를 확인해야 PASS로 표시할 수 있다.

## 4. 출처 (APA 7th) 및 제한

- Oda, E. (1997–present). *ONE PIECE* [Manga]. Shueisha. (이번 패치는 기존 저장소 Manga 회차 Evidence 인덱스 활용; Ch.561–562, 894, 1028–1034의 원작 만화 컷 전체를 새로 직접 확인한 것은 아님.)
- ONE PIECE.com. (n.d.). *ビスタ*. https://one-piece.com/character/bista/index.html
- ONE PIECE.com. (n.d.). *第868話 男の覚悟 カタクリ命がけ大勝負*. https://one-piece.com/anime/o4939/index.html
- ONE PIECE.com. (n.d.). *第1061話 魔神の一撃！サンジVSクイーン*. https://one-piece.com/anime/61599/index.html
- `docs/SIX_COMMANDERS_42_AXIS_PEER_REVALIDATION_2026-10-21.md`, `docs/NINE_AXIS_RESCORE_EVIDENCE_GATE_2026-10-21.md`, `PROJECT_SPEC.md` §4, `AGENTS.md`, `docs/AI_ASSISTED_DEVELOPMENT_BPLUS_v1.0.md` 및 현재 v0.4.33 관련 Source of Truth 코드.

**검증 범위/롤백:** 원작 모든 컷/실기기 시각 QA는 별도. rollback 시 v0434 overlay 및 두 현재 데이터 경로·버전 동기화·새 이력을 되돌리되 과거 원본은 애초에 변경하지 않았으므로 복원 불필요. CI 실행 범위와 실제 SHA는 PR에서 확인 후 별도 보고.
