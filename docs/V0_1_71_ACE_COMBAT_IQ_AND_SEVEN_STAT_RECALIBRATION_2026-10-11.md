# v0.1.71 — 에이스 7축 전투력 재산정 및 근거·퇴각 판단 보정

일자: 2026-10-11. 대상: 포트거스 D. 에이스 1명. 사용자 요청: 전투 IQ의 명백한 감정적 판단 실패, Attack82 조정안의 동축 근거, Speed78의 유지 가능성, Stamina82·Technique81·Versatility의 적절성 재검토.

## 결론과 데이터 분리

- **배포 전 v0.1.70 실제 점수:** Attack84 / Defense77 / Stamina82 / Speed78 / Technique85 / Combat IQ78 / Versatility85 = **569/7 = 81.285714**.
- **새 v0.1.71 실제 점수:** Attack79 / Defense76 / Stamina82 / Speed78 / Technique78 / Combat IQ67 / Versatility78 = **538/7 = 76.857143**. **−31/7 ≈ −4.428571**.
- 이전 대화에서 검토한 78.429점과 Attack82는 어디까지나 **미적용 가설**이었으며, 실제 수정 전 v0.1.70 Attack84와 혼동하지 않는다.
- 이 숫자는 원작 공식 수치가 아니라 프로젝트 내부 **7축 Base=Final**, 신규 Exceptional Haki Raw0의 **draft** 평가다.
- **v0.1.70 Ace Evaluation 원본은 v0170Evaluations 안에 남기고**, v0171AceEvaluation으로 현재 Ace만 교체한다. 나머지 67개 Evaluation·66 Character·84 Membership·15 직접 Matchup·Balanced1.2/Raw 가중치 0.5/Raw212(대표)/230(전체) 모두 유지. 신규 Evidence 5건, Battle 3건(징베전·티치전은 기존 Battle 재사용).
- Evaluation data version `evaluation-0.1.71-ace-context-recalibrated`. 새로운 계산 모델 버전이나 사용자 매치업 가중치 변경이 아니다.

## 재산정 표

| 축 | v0.1.70 | v0.1.71 | 이유·기준 비교 |
|---|---:|---:|---|
| Attack | 84 | **79** | 화권의 함선 광역 파괴(Ch.159)와 티치에게 직접 화상·불창 피해(Ch.441)는 강점. 그러나 티치 어둠 열매의 통증 증폭, 강자 상대 반복 승리 부재, 대형 구조물 파괴 vs 대인 피해 분리. 잭 Attack79/비스타82/죠즈 Final78/크래커75 등 동축 비교 |
| Defense | 77 | **76** | 자연계 방어와 쿠잔 얼음 기술을 막은 경염(Ch.572), 그러나 어둠 접촉 무효·마그마 상성 존재. 루피를 지킨 희생 피격을 일반 방어 열세로 취급하지 않음 |
| Stamina | 82 | **82** | **에이스 측에 빠졌던 징베와 5일 결투(Ch.552)** Evidence 신규 연결. 징베·에이스가 과거 동시 쓰러진 반복 장기전; 잭88(교대 상대 5일+부상), 카타쿠리84, 크래커80, 징베80과 비교. 이전 상태를 현대 징베와 동일시하지 않음 |
| Speed | 78 | **78** | 근접 대응은 있으나 최고속 캐릭터와 정밀 동조건 비교 부족(E3). 화염의 공격 비행 속도 vs 개인 이동·반응 구분 |
| Technique | 85 | **78** | Ch.441 반딧불·불창·십자화·염제, Ch.572 경염 등 **기술 종류 실제 확인**, 다만 모두 이글이글 열매 기반. 크래커80/킹80/퀸79/비스타87을 넘어설 정밀 제어 성과 불명확 |
| Combat IQ | 78 | **67** | **Ch.573 퇴각 지시 이후 사카즈키의 흰수염 모욕에 자극되어 돌아선 의사결정**과 Ch.552 흰수염의 추적 만류에도 티치 단독 추적은 임무·위험 평가에 치명적. 다만 티치 접촉 능력 제한 파악, 능력 전환·거리 유지는 긍정 사례. 일반적 지능이나 동생을 감싼 보호행동에 대한 모욕/동일 처벌 아님 |
| Versatility | 85 | **78** | 불꽃의 원거리·광역·지속 견제·근접·얼음 차단은 비스타(74)·죠즈(74)의 단일 검/경화 위주보다 넓음. 그러나 원리 하나를 5개 독립 능력으로 세지 않음; 크래커77·퀸80과 교차 비교 |

### 전투 IQ 주요 맥락

**원작에서 지지되는 사건:** Ch.552에선 에이스가 흰수염의 만류에도 티치를 추적한 사실이 언급된다. Ch.573(공식 TV482)에서 흰수염은 자신만 남고 부하 전원 퇴각을 최후 명령으로 전달했고, 에이스는 사카즈키의 도발에 돌아서 싸웠다가 상황을 악화시켰다. Ch.574/TV483의 루피 보호는 직접적인 선의의 희생이었다.

**사실과 구분된 평가:** 전투 전반의 모든 판단을 무능으로 보지는 않지만, 탈출에 성공한 작전에서 거대한 전쟁 피해와 동료 희생의 목적을 위태롭게 하는 결정을 내린 것은 Combat IQ에 더 큰 불이익을 줘야 한다. `67`은 공식 설정치가 아니라 낮은 상황 판단/감정 통제에 대한 비교적 큰 프로젝트 감점이며 Pica69, Lucci68, Burgess70, Queen74의 기존 Combat IQ 앵커와 비교했다.

### 공격·기술·범용성의 중복 방지

- 함선 여러 척 파괴 → **화염 출력과 범위**. 사최간 개인에 대한 공격성공률이나 실제 대인 유효 피해는 별개.
- 티치에 대한 화염 피해 → **대인 유효 성과**. 티치의 고통 증폭 설정 때문에 일반 내구도 관통력 점수로 확대 금지.
- 각기 다른 불꽃 기술 → **운용 방식과 숙련도**. 능력 종류 자체가 여러 개인 게 아니므로 Technique/Versatility/Attack에서 그 사건의 의미를 구분한다.
- 비스타는 미호크와 검술 공방을 한 최고 전문 검사, 죠즈는 미호크 참격 차단과 아오키지에 유효타를 낸 방어·충돌 전문가. 높은 역할 폭(에이스 Vers78)은 전문기술 숙련 또는 1대1 승률 우위를 뜻하지 않는다.

## 새 Evidence·Battle 구조

추가 `src/data/sample/v0171AceCalibration.ts`:
- Evidence `evidence-v0171-ace-jinbe-five-days-552` → 기존 Battle `pre-timeskip-jinbe-ace`; 과거 5일 교착 + 징베 기존 Evidence 대칭.
- Evidence `evidence-v0171-ace-teach-arsenal-441` → 기존 `banaro-teach-ace`; 기존 v0.1.70 자료와 **동일 사건**으로 중복 가산 금지.
- Evidence `evidence-v0171-ace-akainu-turnback-573` → 신규 Battle `marineford-ace-akainu-retreat-573`; 최후 퇴각 명령, 사카즈키 도발과 에이스 결정. 별도 **Ch.574 동생 보호 전투**와 분리.
- Evidence `evidence-v0171-ace-aokiji-mirror-flame-572` → 신규 Battle `marineford-ace-aokiji-572`; 불꽃 차단의 특수 원소 대응.
- Evidence `evidence-v0171-ace-five-ships-159` → 신규 Battle `alabasta-ace-marine-warships-159`; 범위 공격 vs 개인 피해량 구분.

모든 새 Evidence는 `source.type='supplementary'`: 공식 ONE PIECE.com TV 회차로 시점과 배경을 확인하고, 팬/민간 원작 회차 요약은 **2차 대조 자료**로만 사용했다. 이번 패치에서는 원작 만화의 모든 실제 컷을 직접 열람하지 않았으므로 `canon`으로 표기하지 않는다.

## 적용과 검증

- 기존 캐릭터/점수 변경 X, 에이스 최신 Evaluation 한 건만 교체. 이전 v0.1.70 원본은 v0170Evaluations에서 재현 가능.
- `src/data/sample/v0171AceCalibration.test.ts`: 양쪽 일관성, Raw/7축/점수 재현, 기존 67 Evaluation 무변경, 근거 소유권, Battle ID 무중복, 대표 그룹·랭킹 확인.
- 기존 전체 점수 정확도 계산 테스트의 Ace 기대값 하나만 실제 신규 점수로 변경. 이전 59인 역사적 감사는 계속 v0.1.70 이전 원본 집합으로 재현.
- **검증 상태**: 최종 GitHub Actions PR head/full build 및 병합 후 GitHub Pages 배포 결과는 해당 PR 댓글과 TEST_REPORT 참조. 실제 PC·모바일 UI 수동 테스트, 원작 원문 전체 컷 직접 대조는 수행했다고 주장하지 않는다.

## 자료

- 공식 에이스 프로필: https://one-piece.com/character/ace/index.html
- 공식 TV461(과거 징베전 시점): https://one-piece.com/anime/461/index.html
- Ch.552 2차 내용 요약: https://onepiece.fandom.com/wiki/Chapter_552
- 공식 TV325(티치 어둠 열매): https://one-piece.com/anime/325/index.html
- Ch.441 2차 내용 요약: https://onepiece.fandom.com/wiki/Chapter_441
- 공식 TV481(에이스 탈출/쿠잔 대응이 있는 원작 Ch.572 시점): https://one-piece.com/anime/481/index.html
- Ch.572 세부 기술 2차 근거: https://www.grandlinearchives.com/devil-fruits/mera-mera-no-mi
- 공식 TV482(흰수염 최후의 퇴각 지시): https://one-piece.com/anime/482/index.html
- Ch.573 도발과 돌아섬 2차 내용 요약: https://onepiece.fandom.com/wiki/Chapter_573
- 공식 TV483(루피 보호/치명상): https://one-piece.com/anime/483/index.html
- Ch.159 함선 파괴 2차 자료: https://www.grandlinearchives.com/vivre-cards/ace
- 공식 비스타 프로필: https://one-piece.com/character/bista/index.html
- 공식 죠즈 프로필: https://one-piece.com/character/jozu/index.html
