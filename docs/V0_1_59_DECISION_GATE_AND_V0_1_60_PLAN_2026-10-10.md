# v0.1.59 — 보정 전 영향분석과 v0.1.60 사용자 의사결정 자료

**기준:** `main@ec32987005ebab5c2b3aec5763854e47bfc5c842` · 2026-10-10  
상세 14축·13건 근거/유보 사항은 [심화검수 보고서](./V0_1_59_E3_AND_HAKI_RAW_CASE_AUDIT_2026-10-10.md) 참조.

## 1. 먼저 정한 보호 범위
- 변경 없음: **60 Character Master**, 대표 **59명/413축**, **62 Evaluation/434 Stat**, Haki Raw **대표226/전체244**, E1 53/E2 243/E3 117, **Balanced v1.2**, Weight 0.5, 15 직접 대진.
- 현행 공식: `Final=min(100,Base+0.5×Raw)`; `Overall=Final합/7`. 공유 동점 순위·특정 대진 승패와 단순 검수용 정렬 위치는 다른 개념이다.
- 새 저장 데이터, 앱 렌더링, 스키마, 버전 식별, `PROJECT_SPEC.md`, 캐릭터 선택(B안), 저장/복원 구조 수정 없음.

## 2. 실제 수치 변경 전에만 사용하는 불변식/가상 검토
변경되는 `Base`가 ΔB, `Raw`가 ΔR일 경우 하나의 축에서
`NewFinal=min(100, Base+ΔB + 0.5×(Raw+ΔR))`, `NewOverall=OldOverall+(NewFinal−OldFinal)/7`.
기존 총 Raw, 상한 절단 및 다른 이종 Haki 기여까지 고려해야 한다. **ΔB/ΔR는 비워 둔 검토 변수**이고 여기서 구체적 조정값을 승인하지 않는다.

기존 v0.1.58의 **−5 Final 단축 민감도**를 결과 영향의 상한·오차 추정치로 오독하지 말 것:
| 독립 실험 | 현재 Final / Overall | 검수용 위치 | −5 Final만 가정한 Overall / 위치 | 의미 |
|---|---|---:|---|---|
| 샹크스 Speed | 95 / 92.571 | 10 | 91.857 / 13 | 한 축에 민감. 실제 −5 권고 아님 |
| 미호크 Speed | 94 / 92.714 | 9 | 92.000 / 13 | 같은 축 다른 정렬 영향 |
| 쿠잔 CombatIQ | 91 / 92.714 | 8 | 92.000 / 13 | 높은 근접 밀집도 |
| 가프 Stamina | 99 / 97.429 | 3 | 96.714 / 4 | 전성기 비교 민감도 |
| 로 Speed (대조군) | 82 / 86.429 | 17 | 85.714 / 17 | 같은 가정에도 위치 유지 |

이 표는 **기존 검수용 모의자료 재인용**이며, 실제 59인 Rank도 저장되지 않고, 15개 Matchup의 상대 능력·조건·서술 변화는 재계산되지 않았다. Raw를 변경하는 시뮬레이션에서는 상한100 절단과 기술별 Haki 중복도 따로 확인해야 한다.

## 3. 사용자 선택 시나리오 — 이번에는 A안 상태 보존
| 대안 | 내용 | 장점 | 위험/승인 경계 |
|---|---|---|---|
| **A. 현행 점수 유지** | 현재 모든 Raw/Base/Final 유지하고 Evidence 부족과 해석 한계만 더 명확히 공개 | 호환성·재현성 최상, 약한 증거를 약한 전투력으로 오해하지 않음 | Raw 과거 평가 정책과 승인된 현재 하이브리드 기준의 간극은 남음 |
| **B. 근거 충분한 소수만 제한 수정** | 새 원작 검증 뒤 사건별 Base/Raw 제외 이유 + 비교군 + 구체적 수치 근거를 제출하고 **항목별 사전 승인** | 점수 설명 가능성·버전 추적 강화 | 소폭이어도 기존 Rank/Matchup/데이터 버전 영향; 자동보정 금지 |
| C. 7축·Weight·모델 재설계 | 하이브리드 모델 전반 변경 | 넓은 평가 연구 실험 가능 | 근거 없는 대규모 재배치·호환성 위험, **이번/다음 단계 비권장** |

**검수 결론:** 기존 점수와 Raw를 모두 유지한다. 검증 가능한 불일치로는 로쿠규 Defense89의 연결 Evidence가 재생/방어 사건을 직접 나타내지 않는 문제가 있다. 이는 **연결과 개념 경계의 심사 이유**이지 Defense를 얼마 감점하라는 근거가 아니다. Haki 13건도 0건 확정 오류/13건 감사 후보로 구분한다.

## 4. v0.1.60 실행 순서(제안)
1. 로쿠규 Defense의 `evidence-aramaki-shanks-haki-1055` 직접 연결/역할 vs 공식 재생 근거를 검토하여 **Evidence 연결 수정안**을 먼저 제출(기존 점수 변경은 별도 승인).
2. 비스타·킹·징베의 통상 Armament Raw, 샹크스(2 Haki types in Technique), 카타쿠리(미래예지 3개 Raw)를 대상으로 **개별 하이브리드 Haki Review Card**를 채운다. 패널/장면, 사실·조건, Base 포섭 여부, 독립 Raw 효과, 비교 앵커와 `baselineExclusionReason`을 기록한다.
3. 가프 Prime/노년 분리 및 Ch.1165 합동전, 미호크 장기전·순수 속도, 로저·록스·뉴게이트 등은 컷 직접 검증 가능 여부를 밝힌 뒤 **보정 대상과 데이터/모델 버전**에 대해 사용자에게 선택지를 제시한다.
4. **개별 실제 수치 제안 조건:** 원작 사실과 평가상 차별 근거가 충분하고, 사전에 A 유지/B 제한 수정의 `Base/Raw/Final/Overall`, 검수용 정렬, 15개 직접 Matchup 해석, 과거 Evaluation 상태/버전 영향표를 작성한 경우에만 구체적 Δ값 제안. ±N 임의 숫자 금지.
5. 승인된 경우 별도 PR로 데이터만 최소 수정하고 대표 59×7, 62/434, 15 Matchup, UI/저장·복원 전후 회귀검증. 계산 모델·Weight 변경은 별도 설계 승인 대상.

## 5. Phase C/D 진입 게이트
Phase C Evidence/Stats UX: 대표 기준과 원작 출처의 연결 적정성, E3 의미(약함 아님), 서로 다른 평가시점 표시의 정확성을 먼저 검수; 모바일/데스크톱 실제 체험 후 주요 UX 승인. 기존 Character Stats/Matchup Arena 분리와 B안 선택 UI 보존.
Phase D Matchup 확장: 기존 15대진에서 참여자·피로·외부 개입·지형 조건과 각 factor 근거를 검수; 타당하지 않은 단순 Overall 우열을 승률로 바꾸지 않는다. 현재는 매치업 데이터/확장 코드를 수정하지 않음.

## 6. QA/배포 기록 작성 기준
새 진단 테스트는 기존 14개 고점 E3 명세, 동일 Evidence 다축 Raw 13건의 **정확한 키/축**과 59명·413축·계산 불변을 읽기 전용으로 보호한다. 기존 `scoreCalibrationDiagnosticsV0158.test.ts`의 전수 산술 테스트와 같이 실행한다. **GitHub Actions의 실제 테스트/빌드 숫자와 Pages main 동일 SHA 결과만 완료 기록에 반영**한다. 로컬 실행이 불가능하면 이를 명시하며 CI를 대신할 수 없다고 판단한다.

## 참고 자료
- Oda, E. (1997–현재). *ONE PIECE* (Ch. 574, 881–884, 966, 1010–1011, 1032–1035, 1042, 1055, 1079, 1080–1088, 1155, 1165). Shueisha. **장별 만화 컷 직접 독립 검증 미수행.**
- ONE PIECE.com. (2018, April 1). *TV episode 830*. https://one-piece.com/anime/o4671/index.html
- ONE PIECE.com. (2018, October 14). *TV episode 857*. https://one-piece.com/anime/o4869/index.html
- ONE PIECE.com. (2023, November 5). *TV episode 1082*. https://one-piece.com/anime/64187/index.html
- ONE PIECE.com. (2024, July 14). *TV episode 1112*. https://one-piece.com/anime/67527/index.html
- ONE PIECE.com. (2024, October 6). *TV episode 1121*. https://one-piece.com/anime/69144/index.html
- ONE PIECE.com. (2024, October 13). *TV episode 1122*. https://one-piece.com/anime/69263/index.html