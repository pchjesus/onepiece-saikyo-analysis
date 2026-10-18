# v0.4.32 — 잭/슈텐마루 전투 근거 Battle 연결 정합성 패치

> 2026-10-18, 사전 main `0c7aa4d0720bf14aaa1dd34e68ef83f123706d6f`, 앱 v0.4.31.
> 범위: **와노쿠니 잭 vs 슈텐마루 사건을 조우 잭 vs 밍크 5일 장기전과 분리**. 신규 공격/방어 능력 추가나 점수 재산정 아님.

## 문제와 재현 경로

`src/data/sample/evidence.ts`에서 `evidence-jack-ashura-921`는 원작 Manga Ch.921의 **와노쿠니 구리에서 잭과 슈텐마루의 근접 검격 교환**을 설명했다. 그러나 `battleId:'zou-jack-minks'`여서 `evidenceRepository.getEvidenceForBattle('zou-jack-minks')`에 **실제로는 와노의 싸움이 포함**됐다. `battleRepository.getBattle('zou-jack-minks')`는 조우 5일간 밍크족·잭의 **다수 대 다수 전선**이다. 출처 내용은 맞더라도 관계를 잘못 연결한 데이터 오염이다.

교전 소재 검증:
- 내부 Manga Ch.921 Evidence: 슈텐마루가 먼저 잭의 가슴을 베고 잭도 상대의 어깨에 검격을 되돌림. 카이도가 등장해 짧은 교전 종료. **저장된 fact/출처/역할은 이번에 수정하지 않음.**
- [ONE PIECE.com TV912](https://one-piece.com/anime/o5267/index.html): 잭과 슈텐마루가 와노에서 충돌하며 큰 상처를 입은 잭이 반격하고, 카이도가 용이 되어 등장.
- Manga 전체 컷 독립 전수 확인은 수행하지 않았다. 공식 TV 줄거리는 **보조**, 내부 Manga Ch.921은 **원작 인덱스가 연결된 기존 canon 데이터**로 계층 분리.

## 수정사항과 근거-전투 조건의 올바른 연결

| 부분 | 변경 전 | 변경 후 |
|---|---|---|
| Battle 레코드 | 조우 5일 전쟁만 연결 | **`wano-jack-shutenmaru-921`** 신규 독립 Battle |
| 원작 Evidence ID | `evidence-jack-ashura-921` | **그대로 유지** |
| Evidence.battleId | `zou-jack-minks` | **`wano-jack-shutenmaru-921`** |
| combatStructure | 잘못 연결된 조우: multiple-vs-multiple | 새 전투는 **1v1** 직접 검격 교환(주변 병력/주민 별도) |
| 환경 | 조우 모코모 공국 | **와노쿠니 구리 오코보레 마을** |
| 결말 | 독가스가 개입한 조우 승리로 잘못 연결 | **카이도 등장으로 중단(interrupted)** |
| 시간순 | 조우1 → 즈니샤2 → 오니가시마3 | 조우1 → 즈니샤2 → **슈텐마루3** → 오니가시마4 |
| 원작 Evidence 내용, Stat 기여, Evidence 강도 | 저장된 그대로 | **불변** |
| 7축/Raw/평가/매치업 | Jack 80/84/88/76/77/73/74, 78.9 / Haki Raw0 | **불변** |

신규 Battle의 `participantIds: []`는 현행 대다수 서술형 Battle의 기존 표현 방식을 따르며, 갑작스러운 별도 인물 마스터 레코드·참전자 스키마 개편 없이 관계만 수정한다. `combatIntent:'serious'`, `result:'interrupted'`, `externalFactors`에는 카이도·부하/도적/주민의 존재를 분리 기록한다. 인물이 두 명 검격을 주고받았음을 **전장 전체에 제3자 영향이 없었다는 뜻으로 확대하지 않는다.**

### 보존 보호
- 잭의 기존 Zou 5일 장기전 (`zou-jack-minks`), 독가스·군세·양측 교대 사실 및 관련 Evidence는 변경하지 않는다.
- `evidence-jack-ashura-921`의 `source`, `fact`, `statContributions`, `interpretation`, `uncertainty` 등은 변경하지 않고 `battleId` 하나만 정정한다.
- 평가모델 Balanced1.2/HakiWeight0.5, 7축/Score/Readiness, 다른 전투/매치업/캐릭터/별도 UI는 변경하지 않는다.
- v0.3.3 **커밋된 고정 기준선 파일은 수정하지 않는다**. `src/data/integrity/v033Snapshot.ts`의 live fixture는 현재 sample data를 참조하므로 새 Battle을 볼 수 있지만 역사적 baseline source는 그대로이다.

## 버전 관리

- `package.json`, `package-lock.json`, `versionManifest.appVersion`은 **0.4.32**로 갱신.
- `versionManifest.coreDataVersion`은 **core-v0.4.32**: Battle 1건 추가와 Evidence 관계 1건 정정에 따른 재현 가능 데이터 상태 구분.
- `versionManifest.evaluationSetVersion`은 **evaluation-set-v0.4.31** **유지**, 개별 `evaluationDataVersion`도 불변: 이번 패치는 평가 수치/근거 강도 변경이 **아니다**.
- `calculationModelVersion:1.2` / `baselineSnapshotVersion:v0.3.3` 유지.
- 기존 사용자 표시 패치 이력을 덮어쓰지 않고 `patchHistory`에 v0.4.32 **evidence** 기록을 신규 추가, README 요약 갱신.

## 회귀검증 (테스트 작성, 실행 사실은 PR CI 결과에 별도 보고)

신규 `src/data/sample/v0432JackShutenmaruBattleLink.test.ts`:
1. 새 Battle 유일성 / 와노구리·슈텐마루·1v1·카이도·중단 / 새 시간순 3·오니가시마 4 / 조우 기존 전투 조건 보존.
2. `evidence-jack-ashura-921`의 원작 인덱스/사실/기여 축 보존; **새 Battle에서만 발견**, 조우에서 사라짐, Character Evidence에는 **정확히 한 번** 유지.
3. `battleRepository`, `evidenceRepository`, `v050CurrentDataset`를 각각 사용해 최신 데이터 관계 확인.
4. Jack 최종 `80/84/88/76/77/73/74`, `78.9`, 지구력 E1, Raw0, Overall 랭킹, 82 캐릭터/88 Evaluation/616 항목/18 Matchup, 현재 통합 무결성 오류 0.
5. app/core vs 역사적 평가세트/계산모델/고정 baseline 버전 구분 및 patchHistory 추적 확인.
6. 기존 v0.4.30/v0.4.31/patchHistory 테스트의 **최신 앱 버전 참조만 갱신**, 역사적 평가 자체와 과거 Score/Raw 기대값은 변경하지 않음.

**미실시 한계:** 최신 CI 실행 결과 확인 전에는 성공이라고 선언하지 않음; 만화 페이지 직접 컷 판독, 브라우저/실기기 시각 검증, 외부 서비스 상태 점검은 별도 작업. GitHub Actions의 테스트/빌드 통과도 실제 기기 UX 수동 확인과 동치가 아니다.

## 롤백 기준

PR의 신규 Battle 제거, `evidence-jack-ashura-921.battleId`를 `zou-jack-minks`로 복원, 오니가시마 순서 3 복원 및 v0.4.32의 앱·코어/문서/테스트 참조를 반전하면 이전 상태로 되돌릴 수 있다. 그러나 그 경우 **잘못된 Battle 관계도 복원**되므로 긴급 회귀가 아닌 한 정당한 롤백 사유가 아니다.
