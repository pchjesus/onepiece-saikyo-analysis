# v0.1.68 — 비스타 vs 미호크 Ch.561–562 근거 교차검증 + 전투 맥락 정합성 패치

**목표:** v0.1.67에서 남은 마르코 지시·양측 검술 교환·승부 연기의 실제 화자·전황을 가능한 범위까지 검증하고 **비스타 Technique90 후보를 적용하지 않은 채** 캐릭터/전투 설명의 출처 정합성을 높인다.

**기준:** main `f3abfa13844a6f332d5a20523e5fe7fb1a0d061f` (= v0.1.67). **이번 패치는 원작/자료 검증과 텍스트 및 증거 메타데이터 개선이며 기술 점수·Raw·Overall·매치업·계산은 불변.**

## 1. 새 자료와 신뢰도 계층

v0.1.67에는 공식 프로필, 공식 뉴스, 비공식 줄거리 대조까지만 들어갔다. 이번에는 **일부 원작 컷의 제3자 재게시 사진(561화)**, **2009년 당시 일본어 대사 기록(561·562화)**, **페이지 인덱스가 있는 상세 요약**, **공식 2011년 피규어 상품 소개**, **공식 TV471 시놉시스**를 상호 대조했다.

| 출처 | 관찰·재현 | 주의사항 |
|---|---|---|
| 공식 ONE PIECE.com 비스타 프로필 | 비스타는 이도류 대검호이며 미호크와 호각으로 겨룰 정도의 실력 | **직접 공식 설정**, 특정 컷의 세부 검격 순서가 아님 |
| 공식 ONE PIECE.com 미호크 프로필 | 세계 최강의 검사 | **직접 공식 설정**, 개별 공방 매순간 전력 사용 선언 아님 |
| 공식 ONE PIECE.com 2011 P.O.P 비스타 상품 소개 | 정상결전 미호크와 대등하게 검을 교환한 실력자로 설명 | **공식 서술이나 판촉용 문맥**. 독립 두 번째 교전이나 검술 동급 수치 증명 아님 |
| ONE PIECE.com 2021 흰수염 해적단 소개 | 비스타가 미호크와 검을 맞댔다고 명시 | **공식 사실 보충**. 같은 사건의 중복 보강 |
| 561화 **제3자 게시 부분 원작 컷** | 양자의 교차한 검, 비스타가 이도류인 상황, 미호크가 비스타를 인식한 장면 중 일부 **눈으로 확인** | 인증된 정식 전체 페이지 아님. 컷 재현/번역/화질·맥락 한계. 팬 게시 이미지를 repository에 복제·배포하지 않음 |
| 2009 당시 **561화 일본어 대사 기록** 및 Grand Line Archives·One Piece Wiki | 마르코가 원호를 지시, 비스타가 수락, 미호크의 명성 인지 | **동시대 제3자 텍스트 재현**. 원문 대사 확정본으로 인용하지 않음 |
| 2009 당시 **562화 일본어 대사 기록 두 건**, 페이지 요약 및 Magmix | 미호크가 먼저 승부 연기를 제안하며 비스타가 동의 | 여러 기록의 **화자·관계 일치**. 해당 시점의 풀페이지 만화 원본 미확인 |
| 공식 TV471 시놉시스 | 개전 약 1시간 반 시점 파시피스타 전개·해군의 측면 협공 | **공식 전장 맥락**. 미호크·비스타 각자의 내면 동기를 규정하지 않음 |

**중요:** 공식 VIZ Ch.561~562 열람은 여전히 가입/구독 장벽 때문에 원작 전 페이지 열람을 할 수 없었다. "부분 컷의 시각적 확인"과 "전 컷 직접 확인"을 혼동하지 않는다. 온라인 일본어 대사 재현은 원작 출판사가 인증한 전사본이 아니다.

## 2. 장면 세분화: 수행 vs 숙련 vs 전황

| 회차 | 상황·확인 사항 | 신뢰 등급 | 기존 평가 해석에 주는 영향 |
|---|---|---|---|
| **561화 요격 지시** | 마르코가 비스타에게 루피 원호를 요청하고 비스타가 응함 | **다수 제3자 일치** | 임무 수행의 신뢰성과 적시성이 증명되지만 **비스타가 독립적으로 목표/상대를 선정했다고 가산하는 것은 부정확** |
| **561화 검술 충돌** | 비스타 이도류 검과 미호크가 직접 맞닿은 일부 컷도 확인. 공식 프로필이 이 검술을 호각급으로 보강 | **일부 컷+공식 서술** | 비스타의 Technique 상위 수준 지지. 각 검격의 성공률/강도/피격은 컷 전체가 없으므로 정량 보정 금지 |
| **561화 미호크의 인지** | 미호크가 비스타의 명성과 이름을 알고 있음 | **다수 제3자 일치** | 검객 위상의 정성 앵커. 이름을 안다고 모든 신체 능력이 높다는 것은 아님 |
| **562화 교전 지속·연기** | **미호크가 먼저 연기 제안, 비스타가 쌍방 이익을 언급하며 동의** | **다수 동시대 제3자 일치** | 끝날 때까지 치러진 완전 결투나 '무승부 판정'이 아님. 결과 `interrupted` 유지 |
| **562화 전장 변화** | 해군 포위·파시피스타 투입, 양측 전선 기동 | **공식 TV + 상세 요약** | 승부 연기의 강한 환경적 대안 설명. **각 인물의 속마음**은 미확정 |
| **574화 별개 사카즈키 합동 공격** | 비스타/마르코 합동 패기 적용 | **별도 사건** | 561~562화 미호크전 패기 사용의 소급 증명 아님. Technique Raw2 독립 증분은 여전히 검수 대상 |

### 추가 정량 판단

- **Technique Base 86 / Raw 2 / Final 87 유지**. 공식 '호각'은 고숙련 근거이나 **+3=정확한 상승폭**을 재현할 관찰치가 불충분하다.
- 미호크 99와 비스타 87의 간극은 **프로젝트 0~100 모델의 수치**이지 작중 기술 격차가 정확히 12라는 뜻이 아니다.
- **Attack82, Defense79, Stamina77, Speed80, Combat IQ77, Versatility74 모두 유지.**
- **Combat IQ77의 문구는 정정:** 이전의 ‘적절한 강자 요격·교전 중단 판단’을 마르코 지시를 받은 임무 실행 + 미호크의 중단 제안에 대한 동의로 분리한다. 지휘권·독자 전략은 비스타에게 자동 귀속하지 않는다.
- **기존 Evidence의 `evidenceStrength: strong`, Technique readiness E1 유지**. 강한 직접 공방+공식 자료 때문이며 전체 컷 접근 완료를 뜻하지 않는다는 한계를 `uncertainty`에 명시한다.
- 비스타 Evaluation `evaluationDataVersion`을 **`evaluation-0.1.68-vista-battle-context-only`**로 명시 갱신. **텍스트 설명 수정 이력 표시**, 계산 모델 `Balanced 1.2 / Haki0.5` 또는 7축 점수 자체의 변화가 **아님**.

## 3. 실제 구현 패치

| 항목 | 작업 내용 |
|---|---|
| `src/data/sample/battles.ts` | `marineford-vista-mihawk`의 `externalFactors`에 **마르코 원호 지시의 제3자 확인 수준**과 **562화 미호크 선제 휴전 제안/비스타 동의**, 원작 직접 대조 미완료 표시 |
| `src/data/sample/evaluations.ts` | **비스타 Combat IQ rationale 텍스트만** 지정 임무 vs 독자 판단으로 분리. 평가 이력용 버전명 교체. 모든 점수/Raw/E등급/근거 ID 유지 |
| `src/data/sample/evidence.ts` | 비스타·미호크 **동일 전투의 양측 Evidence uncertainty** 정밀화(정식 페이지 전체 미확인, 전황/7축 과대 해석 금지). fact·statContributions·IDs 그대로 |
| `src/data/sample/v0168VistaSourceCorroboration.ts` | 6개 교차 확인 Claim마다 **source URL, 출처 등급, 확실성, 검증 한계** 명시. 5개 남은 원작 질문. **계산·UI 미사용** |
| `src/data/sample/v0168VistaSourceCorroboration.test.ts` | 출처 계층/중복 전투 방지/수행 대 지휘 구분/7축 불변/모델·인원·Haki Raw 불변 |
| v0.1.66·v0.1.67 테스트 | 새 **텍스트 전용 데이터 버전** 반영. 이전 Score invariant와 승인 전 90점 보호 게이트 보존 |
| README·CHANGELOG·TEST_REPORT | 사용자 요청, 출처·한계, 변경 전후·검증 범위 기록 |

**금지한 변경:** `PROJECT_SPEC.md` 재해석; 비스타 Technique90이나 샹크스·카타쿠리·징베의 Haki Raw 조정; 같은 사건의 다른 7축 동시 점수 상향; 신규 캐릭터 집단; 모델/매치업/순위/상태/저장 구조/UI 변경.

## 4. 검증 기준과 대기 과제

- CI에서 59(+1)개 테스트 파일, 기존 261(+4)개 전체 테스트, TypeScript/Vite build, full normalization (Supreme 알베르/버킹엄/탱킹), `main` 병합 SHA Pages 배포 검증.
- 정식 561·562화 전체 컷 확인 이후에만 **검격 시작/피격/패링/상대 의도/패기 효과와 중단 대사 위치**의 완전 재검증 수행.
- Ch.574 비스타 Raw2 등의 **특출난 독립증분** 판정은 *현행 유지는 하되 근거 부족 여부*를 다음 데이터 감사에서 추가 확인. Raw 제거 가상 감점 Overall은 계산하지 않음.
- **실제 PC/모바일 브라우저 수동 조작은 본 작업에서 검증하지 않음.**
- 우선 후속 과제: 샹크스 Ch.1055 위압/Ch.1079 미래 예지·검격/전술 효과 분리, 카타쿠리 미래예지 Defense/Technique 동일 효과 분리, 징베 Ch.1018 무장색 방어·Ch.890 보호 차별화. **수치 변경 전 사용자 승인 게이트 유지**.

## 5. 출처 (확인한 자료)

ONE PIECE.com. (n.d.). *ビスタ*. https://one-piece.com/character/bista/index.html

ONE PIECE.com. (n.d.). *ジュラキュール・ミホーク*. https://one-piece.com/character/Dracule_Mihawk/index.html

ONE PIECE.com. (2011). *P.O.PワンピースNEO-DX花剣のビスタ*. https://one-piece.com/figure/o1623/index.html

ONE PIECE.com. (2021, February 20). *約10年ぶりに「白ひげ海賊団」がアニメに登場*. https://one-piece.com/news/o20210220_12159/index.html

ONE PIECE.com. (2010, October 17). *第471話 殲滅作戦始動 パシフィスタ軍団の威力*. https://one-piece.com/anime/471/index.html

Oda, E. (1997–present). *ONE PIECE* [Manga], Chapters 561–562 & 574. Shueisha. **전체 원본 페이지 직접 열람 미완료**.

VIZ Media. (n.d.). *One Piece Ch.561*. https://www.viz.com/shonenjump/one-piece-chapter-561/chapter/11697

VIZ Media. (n.d.). *One Piece Ch.562*. https://www.viz.com/shonenjump/one-piece-chapter-562/chapter/11698

光の道～軍事連合支部～. (2009). *ONE PIECE 第561話「ルフィVSミホーク」*, contemporaneous transcript. https://lostneito.blog15.fc2.com/blog-entry-5.html

光の道～軍事連合支部～. (2009). *ONE PIECE 第562話「海賊大渦蜘蛛スクアード」*, contemporaneous transcript. https://lostneito.blog15.fc2.com/blog-entry-4.html

天花繚乱. (2009). *ONE PIECE 第562話*, contemporaneous discussion/transcription. https://blog.livedoor.jp/hanasakia/archives/51350848.html

Grand Line Archives. (n.d.). *Chapter 561; Chapter 562*, page-indexed fan synopsis. https://www.grandlinearchives.com/chapters/561 ; https://www.grandlinearchives.com/chapters/562

X (user repost, unverified). (2023). *Partial Ch.561 manga image*. https://x.com/bigdannyfr/status/1723347108923666556
