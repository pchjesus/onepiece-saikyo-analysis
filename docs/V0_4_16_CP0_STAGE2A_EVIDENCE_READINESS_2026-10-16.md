# v0.4.16 — v0.5.0 Stage 2A: 마하·게르니카 근거 충분도 및 Evidence 연결 심층 검토 (2026-10-16)

## 승인 범위와 기준

- 사용자 승인: Stage 2A만 우선. **점수·계산 모델·다른 캐릭터·매치업 변경 없이** 마하·게르니카 7축의 근거 충분도와 Evidence 관계를 심층 검토하고 최소한의 교정 시행.
- 시작 안정 기준: `main@1c2dd35435efba45a3c1ec353c53ff6e6e8f42b1`, v0.4.15.
- 배포 패치 명칭: **v0.4.16**. v0.5.0 마일스톤 전체를 완료한 것이 아니며, Stage 2B 원작 만화 개별 컷 비교·점수 재평가는 **미진행**.
- 인물/평가/스탯/소속/대진: **81/85/595/106/18** 유지, 기존 Balanced 1.2 / Haki Weight 0.5 / 독립 v0.3.3 JSON 기준선 변함없음.

## 공식 확인 사실과 교전 조건

### 마하
- ONE PIECE.com TV **1065** 공식 시놉시스: 이조가 이미 크게 상처를 입은 채 CP0와 마주함.
- TV **1068** 공식 시놉시스: 이조가 마하에게 마무리 공격을 가했으나, 그 자신도 치명상을 입음. 해당 시놉시스만으로 마하의 독립적인 이동·회피·구체적 기술·전술 판단·다양한 역할 전환이 증명되지는 않음.
- **해석:** 양측 치명상·마하 패배만으로 정상 컨디션의 상대적 강함 또는 Speed·Technique·Combat IQ·Versatility의 독립 성과를 환산할 수 없음. 마하의 75/70/73/77/80/72/70, Overall **517/7 = 73.857143**은 종전 사용자 승인 잠정값으로 보존. Attack 75 E2도 향후 원작 컷 검토 대상이지만 이번 승인에 따른 추가 E등급 변경은 없음.

### 게르니카
- TV **1069** 공식 시놉시스: 드레이크의 기습 공격 뒤 CP0 요원이 지건으로 반격. 루피와 카이도의 대결에서는 철괴로 루피의 공격을 막는 개입이 있었음. ONE PIECE.com 게르니카 공식 캐릭터 소개는 루피 타격·카이도의 최종 일격 맥락을 제공함.
- **전투 조건:** 오로성의 명령, 기습받은 상황, 루피·카이도의 선행 격돌과 제3자 개입. **카이도가 루피에게 준 공격 피해를 게르니카 자신의 Attack·Combat IQ 점수로 환산할 수 없음.**
- **해석:** 기술 수행은 Attack/Technique/임무 전개 근거가 될 수 있으나 독자적 전술 설계·최적 판단을 E2 수준으로 확정할 반복 행동 표본은 부족함. 78/76/76/81/84/80/75, Overall **550/7 = 78.571429**는 보존.

위 사실은 **공식 애니메이션 줄거리/인물 소개**를 근거로 정리한 것이며, 만화 원작 개별 컷 직접 열람·일본어 원문 전수 검증이 아님. 사실·상황·해석·평가를 분리한다.

## 축별 승인 조정 — 점수 불변

| 인물 | 축 | 점수 | 이전 | 새 충분도 | 연결 Evidence / 역할 |
| --- | --- | ---: | --- | --- | --- |
| 마하 | Speed | 77 | E2 | **E3** | `evidence-v0412-maha-0` · secondary→**context** |
| 마하 | Technique | 80 | E2 | **E3** | 같은 ID · secondary→**context** |
| 마하 | Combat IQ | 72 | E2 | **E3** | 같은 ID · secondary→**context** |
| 마하 | Versatility | 70 | E2 | **E3** | 같은 ID · secondary→**context** |
| 게르니카 | Combat IQ | 80 | E2 | **E3** | `evidence-v0412-guernica-0` · secondary→**context** |

- **해석 주의:** E3는 `근거 부족/강한 잠정성`을 나타내지 **낮은 점수**를 뜻하지 않는다. 점수 감점·가산·새 패기 Raw가 아님.
- 같은 공식 보조 출처가 각 평가의 **교전 상황을 설명하는 용도**로 연결될 수 있지만, 그 자체가 직접 성능 입증은 아님. 불확실성이 커졌다고 Evidence ID를 무조건 제거하면 전투 상황도 화면에서 사라지므로 기존 ID·소유자·Battle·source/사실을 유지하고 **축별 역할만 `context`**로 낮춘다.
- 마하 Attack E2/Defense E3/Stamina E3와 게르니카 Attack E2/Defense E3/Stamina E3/Speed E2/Technique E2/Versatility E2는 **기존 그대로**. 추가 검토 위험은 다음 Stage에 기록하되 범위를 임의 확대하지 않음.
- 다른 79명 및 마하·게르니카의 모든 Base/Raw/Final/Overall, 기존 18 Matchup Factors와 승패 설명, 순위는 불변.

## 구현

- **원본 불변:** `src/data/sample/v0412EightEvaluations.ts`와 `src/data/baselines/v0.3.3.json` 원본 미수정.
- `src/data/sample/v0416Cp0EvidenceReadiness.ts`: 5축 승인 범위의 **순수 함수** 두 개. `applyV0416Cp0EvaluationAudit`는 현행 두 평가의 E3·rationale·개별 version만, `applyV0416Cp0EvidenceAudit`는 현행 두 Evidence의 대상 축 role·note·uncertainty만 수정한 복사본 생성.
- `evaluationRepository`, `evidenceRepository`, `v050CurrentDataset`가 동일한 overlay를 사용. UI의 7축 표시·근거 화면과 read-only 감사 CSV의 역할/충분도가 어긋나지 않게 함. 기존 Evidence ID와 정량 점수는 보존.
- `versionManifest` 현재 앱/코어/평가 세트를 v0.4.16로 선언하되, 모델 버전 1.2 / 역사 기준선 v0.3.3 유지.
- 관련 새 테스트 `src/data/sample/v0416Cp0EvidenceReadiness.test.tsx`에서 원본/현행 간 변동 범위, 5축 E2→E3, 축별 role context, Evidence ID·주체·출처·사실 보존, 점수·Raw0·Rank·Matchup 및 85 Evaluation/595축 감사 무결성 검증.

## 위험과 후속 검토

- 공식 TV 요약은 작품 내용에 대한 **보조 출처**이며, 구체적인 컷·공격 방식·교전 시간·피격 순서를 확정할 수 없음.
- 마하의 현재 Technique 80 또는 게르니카 Combat IQ 80의 **수치 자체를 정당화했다고 주장하지 않음**. 평가의 미확실성을 더 정확히 표시했을 뿐.
- Stage 2B는 **개별 원작 컷 대조, 상대 상태/참가자 분리, 다른 CP0/이조와 동일 축 비교 → 유지/재평가 제안/보류**의 후보 보고 단계. 새 점수 적용은 반드시 별도 승인.

## 검증·배포

- 자동 단위/회귀검증 + TypeScript/Vite, PR CI, 병합 및 Pages deploy의 상태는 실제 GitHub 작업 종료 후 별도 확인한다.
- 실제 PC·모바일 실기기 시각 QA, 공식 정식 한국어 번역 직접 대조, 출처 문장과 만화 컷 직접 비교는 수행했다고 주장하지 않는다.

## 출처 (APA 7판)

ONE PIECE.com. (2023, June 11). *第1065話 同盟壊滅！？燃えろ新世代の意志！* https://one-piece.com/anime/61988/index.html

ONE PIECE.com. (2023, July 9). *第1068話 月姫が響く！ワノ国最終局面！* https://one-piece.com/anime/62441/index.html

ONE PIECE.com. (2023, July 16). *第1069話 勝者はひとり ルフィVSカイドウ*. https://one-piece.com/anime/62672/index.html

ONE PIECE.com. (n.d.). *ゲルニカ* [공식 등장인물 프로필]. https://one-piece.com/character/Guernika/index.html
