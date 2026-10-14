# v0.4.9 — 코비·스모커 확정 재평가 / 조직도 시기 통합

- 기준: v0.4.8 `main@43b48009b3acf9e26f2a78eb5e899c4afee82a38`.
- 사용자 승인: 코비 77/68/71/74/72/68/67; 스모커 70/72/75/75/75/76/77.
- 변경 방식: 기존 v0.4.6 이후 Live Evaluation에만 v0.4.9 보정 적용. 역사적 평가·동일 캐릭터 identity·계산 모델·Haki Raw/복수 상태 보존.

| 인물 | Attack | Defense | Stamina | Speed | Technique | Combat IQ | Versatility | Overall |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 코비 변경 전 | 77 | 73 | 77 | 78 | 77 | 72 | 67 | 74.428571 |
| 코비 변경 후 | **77** | **68** | **71** | **74** | **72** | **68** | **67** | **71.000000** |
| 스모커 변경 전 | 74 | 73 | 78 | 76 | 78 | 76 | 80 | 76.428571 |
| 스모커 변경 후 | **70** | **72** | **75** | **75** | **75** | **76** | **77** | **74.285714** |

전체 14축 중 코비 5·스모커 6 = **11축 점수 변경**. 변경 전후 차이의 자세한 축별 근거는 `src/data/sample/v049KobySmokerRecalibration.ts`에 독립 저장.

## 근거 구분
- **신규 사실:** [ONE PIECE.com TV879](https://one-piece.com/anime/o5003/index.html) 세계회의 왕족 선박의 어뢰를 코비가 견문색으로 감지하고 급히 이동해 막았음. 잠수정 제압은 헤르메포의 별도 성과. 이를 별도 `Battle`과 `Evidence`로 저장하며 공식 애니 줄거리는 supplementary로 취급. 해당 원작 Ch.903의 컷은 독립적으로 판독하지 않았고 요격 속도를 계측하지 않음.
- **기존 코비 사실:** [TV1113](https://one-piece.com/anime/67844/index.html) 실제 노예 구출/유인; [TV1121](https://one-piece.com/anime/69144/index.html) 시류 기습에 가프 대신 피격; [TV1122](https://one-piece.com/anime/69263/index.html) 거대 팔 실직권골 파괴. 같은 사건 IQ 반복 감점 또는 하나의 강한 일격을 타 스탯 고점으로 이중 가산하지 않음.
- **스모커 기존 사실:** [TV588](https://one-piece.com/anime/588/index.html) 로우 공간 제압, [TV616](https://one-piece.com/anime/616/index.html) 베르고전 심장 회수 임무, [TV625](https://one-piece.com/anime/625/index.html) 도플라밍고 공격·쿠잔 개입. 상성과 전투 목적이 다르므로 여러 패배를 한 가지 수치 보정 공식으로 취급하지 않음.
- **추론/평가:** 0–100 점수는 사실의 직접 산술 결과가 아니라 기존 절대평가 척도에 맞춘 잠정적 비교 판단. 특히 코비 Defense/Stamina E3를 유지하고 미관찰 자체를 낮은 실제 능력의 증명으로 하지 않음.
- **패기:** 예외 Raw 기여량을 새로 추가하지 않고 Haki Weight 0.5 그대로 유지.

## 조직도 UI
- 상단 독립 조직도 탭을 유지하고 current/past/all 필터 버튼을 제거. 각 그룹을 선택하면 모든 기록 시기 `getOrganizationChart(groupId, 'all')`로 조회.
- 구성원 카드의 `role`, `status`, `period`, 하위 그룹 `subgroup` 원본 보존; 쿠잔의 과거 해군과 현 검은수염 해적단 각각의 기록을 데이터에서 삭제하지 않음.
- 상위·하위 조직의 중복 인물은 기존 계산 기준에 따라 한 번만 표시. 실제 지휘선이나 전투력 순서 추론 금지.

## 테스트 및 영향
- 72 Character / 76 Evaluation / 532 Core Stat / 97 Membership / 17 Matchup 유지, Battle/Evidence 1건씩 추가.
- 기존 v0.4.6 원본을 `evaluationsBeforeV049`로 보존. 기존 v0.3.3 고정 기준선 및 Balanced 1.2 유지.
- 회귀 대상: 11축 변경/3축 불변, 나머지 70인 평가의 객체 동일성, 새 Evidence 소유·전투 참조, 상단 3탭, 전시기 통합, 로저·쿠잔·뉴게이트 표시, 랭킹 72인, 모델.
- 버전 app 0.4.9, core-v0.4.9, evaluation-set-v0.4.9; 계산 모델은 1.2. CI/Pages 결과는 실제 워크플로로만 확정, 수동 PC/모바일 시각 QA는 별도.

## 후속 평가안의 범위
카쿠 및 게르니카·마하·에넬·밀짚모자 일당 6인의 스탯은 [별도 검토 문서](V0_4_9_KAKU_NINE_CHARACTER_DRAFT_REVIEW_2026-10-15.md)에 **제안안**으로 기록. 이번 live 72명 캐릭터·평가에는 반영하지 않음.
