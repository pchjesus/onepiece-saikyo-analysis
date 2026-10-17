# v0.4.27 — 징베 Defense 82 / Stamina 83 승인 재평가 (2026-10-17)

## 승인 범위 및 원본 보존
- 사용자 승인: 징베 Defense **80→82**, Stamina **80→83**, 나머지 다섯 축 **76/77/83/80/79** 유지.
- Balanced 1.2: 이전 555/7 = 79.285714(화면 **79.3**), 이후 **560/7 = 80.0**. 정확한 변화는 **+5/7 = +0.7142857**.
- 이전 Defense Base78 + Haki Raw4 × 0.5 = 80, 이후 **Base82 + Raw0 × 0.5 = 82**.
- Stamina Base80→83, Raw0 유지. 기존 평가 ID `evaluation-jinbe`, 상태 draft, E1 유지. 개별 평가 데이터 버전 `evaluation-v0.4.27-jinbe-defense82-stamina83-hybrid-review`.
- 76건 역사적 `sampleEvaluations`, 원본 `sampleEvidence`/`sampleBattles`, v0.3.3 고정 JSON 스냅샷 모두 비변경. 기존 overlay 뒤에 현재 평가만 추가. 82명/86 Evaluations/602축/18 매치업, 다른 캐릭터 평가와 계산모델 변경 없음.
- app 0.4.27 / core-v0.4.27 / evaluation-set-v0.4.27. 계산모델 Balanced 1.2 및 Haki Weight 0.5 불변.

## Hybrid Haki 독립효과 판단
- 후즈후전 1018화와 빅맘전 890화의 통상 무장색 경화 성과는 원래 Defense Base78 설명 자체에 포함되어 있었다.
- 기존 Defense Raw4가 **Base 밖에서 증명된 예외적·독립적인 추가 방어 효과**라는 근거를 확보하지 못함. 단순 패기 사용을 이유로 별도 +2 Final을 남기지 않는다.
- 무장색 보유 및 실제 방어 사용의 정성적 사실은 유지. 이번 제거는 패기 능력 부정이나 전반 모델 마이그레이션이 아님.
- 새 Defense 82는 574화 단발 차단, 890화 순간 방어, 1018화 경화 대응을 통합하고 574화 화상·578화 관통상·빅맘에게 밀림을 반영한 **프로젝트의 보수적 점수 해석**이지 +4가 작중 공식 수치인 것은 아니다.

## 화수별 근거 정정 및 원작/보조 자료 층위
- **574화 — 직접 차단:** 징베가 아카이누의 마그마 공격을 일시 저지하지만 화상도 입음. 새 `evidence-v0427-jinbe-akainu-block-574`, Defense primary. 동시대 화별 서술과 공식 TV483 주변 맥락 교차 검증.
- **575화 — 구조/대피:** 마르코가 아카이누를 막고 징베에게 루피 대피를 맡김. 기존 안정 ID `evidence-jinbe-akainu-575` 유지, 현재 조회에서는 화수에 맞게 사실·기여 역할을 정정. Stamina/Defense context.
- **578화 — 중상 후 보호:** 징베가 루피 보호 도중 관통상을 입음. 새 `evidence-v0427-jinbe-akainu-injury-578`, Stamina secondary / Defense context. 외부 구조와 부상 한계를 분리.
- **552화 — 에이스 5일 결투:** Stamina의 주 근거, 기존 Evidence 재사용. 당대 에이스와 현재 잭/카타쿠리의 체력을 기계적으로 등치하지 않음.
- 기존 전투 `marineford-jinbe-akainu`는 동일 ID를 유지하고 현재 조회에서 574–578화 및 외부 개입을 분리 서술.
- 신규 574/578 Evidence는 **supplementary/moderate**로 등록. 공식 애니메이션 내용과 공개 화별 서술은 원작 컷의 직접 재열람에 해당하지 않음. 575화 기존 원작 pointer는 유지하되 신규 직접 만화 컷 감사를 완료한 것으로 표현하지 않음.

## 재현 및 영향 검증
- 승인 조정 두 축 이외 5축, 다른 85개 Evaluation, 7축 평균 규칙 및 패기 가중치 보존.
- 캐릭터 상세, 7축 막대, Overall/축별 순위, 전투 Evidence 목록, matchup 로스터, version manifest, patch history, read-only audit 동일 현재 데이터 소스 사용.
- 정확한 순위는 자동 테스트/실제 UI 결과로 확인. Overall 80.0으로 기존 79점대의 인접 인물 대비 순서가 일부 이동할 수 있으며, 비교는 승률이나 동급 판정이 아님.
- 테스트 대상: 새 모듈 원본 보존·Raw 제거·Baseline fail-fast·Evidence별 역할·참조 무결성·감사 82/86/602/107/18·모델/버전·UI SSR·랭킹·기존 테스트 전체·GitHub Pages 배포.
- 실제 원작 만화 컷과 공식 한국어 번역 대조 및 실기기 PC/Android 시각 QA는 수행하지 않았다면 미검증으로 표기.

## 공개 참고 출처
- Oda, E. (2010). *One Piece*, 59권(Ch. 574–578). Shueisha. [화수 식별, 만화 컷 독립 재열람 전]
- Oda, E. (2009). *One Piece*, Ch. 552. Shueisha. [기존 Evidence 재사용]
- Toei Animation. (2011). *One Piece* TV483, TV484, TV487–488. ONE PIECE.com.
  - https://one-piece.com/anime/483/index.html
  - https://one-piece.com/anime/484/index.html
  - https://one-piece.com/anime/487/index.html
  - https://one-piece.com/anime/488/index.html
- 당대 비공식 화별 서술(정확한 공격 방어 동작 참고 자료이며 원작 공식 검증 자료 아님): https://mangahelpers.com/forum/threads/574-review.57983/
