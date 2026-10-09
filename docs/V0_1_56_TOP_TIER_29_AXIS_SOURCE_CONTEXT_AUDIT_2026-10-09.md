# v0.1.56 — 상위권 5명·29축 Canon/전투 조건·Readiness 감사

**기준:** `main@0e7cc6522558b5bb029c80388f40de3ada9dfa1a` (v0.1.55). 작성일 2026-10-09.

## 1. 요약과 불변성

- 대상: 대표 평가 미분류 80축에서 **전성기 가프 7, 티치 6, 쿠잔 5, 키자루 6, 미호크 5 = 29축** 개별 근거·평가 이유 및 전투 조건 검수.
- 추가 readiness: **E1 4 / E2 19 / E3 6**, 미분류 **80→51**. 전체 59인×7 = 413축 분포: 이전 E1 39/E2 189/E3 105/미분류80 → 현재 **E1 43/E2 208/E3 111/미분류51**.
- 모든 `EvaluationItem.score/baseScore/evidenceIds/hakiContributions`, Haki Raw 합 244·가중0.5, Balanced 1.2, 62 Evaluation/434 Stat, 15 Matchup, 캐릭터 master, B안 선택 UI, 기록/저장 및 `PROJECT_SPEC.md` **변경 없음**. 실제 29개 `readiness` 속성만 보강.
- 출처의 역할과 충분도 등급은 분리한다. `primary`여도 반드시 E1이 아니며 `E3`는 약한 전투력이 아니라 **높은 점수에 수반되는 미검증·비교 한계**를 뜻한다.
- 이번 감사는 기존 Manga Chapter 인용의 사실·전투 조건과 **ONE PIECE.com 공식 TV 줄거리·공식 캐릭터 소개**를 교차 대조했다. 원작 만화 29축 모든 컷을 독립 열람해 확인한 것은 아니다. 특히 Manga Ch.1165 전성기 가프는 프로젝트 기록과 외부 장면 요약을 참고했으며 공식 TV가 해당 원작 분량을 모두 방영해 검증한 것으로 취급하지 않는다.

## 2. 개별 29축 판단

아래 값은 Evaluation `score`(Base)이며 UI Final은 Haki Raw×0.5를 더한 기존 결과이다. E1/E2/E3는 점수 산정 가산항이 아니다.

| # | 캐릭터 | 스탯 | Base | v0.1.56 | 근거 역할 | 기존 Evidence ID(역할) | 직접 사실·상황 조건 및 분류 이유 |
|---:|---|---|---:|---|---|---|---|
| 1 | `garp` | `attack` | 95 | **E2** | primary | `evidence-garp-roger-rocks-1165` (primary) | 전성기 Ch.1165에서 로저와 협력해 특수 상태 록스를 제압한 강력한 직접 공격. 최종 유효타의 개인별 분담·패왕색 Raw 기여는 분리 불가, E2. |
| 2 | `garp` | `defense` | 95 | **E2** | primary | `evidence-garp-roger-rocks-1165` (primary) | 록스의 최상위 권격·패기와 맞선 전성기 직접 공방이나 로저와 공동전이고 단독 방어 무력화·반복 차단량이 미측정, E2. |
| 3 | `garp` | `stamina` | 99 | **E3** | primary | `evidence-garp-roger-rocks-1165` (primary); `evidence-garp-kuzan-haki-1087` (secondary) | 최종 공방까지 막대한 패기 소모를 견딘 정황은 강함. 그러나 장기간 결투 시간이나 Prime 99점의 독립 지구력 상한을 측정하지 못함. 노년 Hachinosu 기록과 합산 금지, E3. |
| 4 | `garp` | `speed` | 98 | **E3** | primary | `evidence-garp-roger-rocks-1165` (축 미지정); `evidence-garp-blue-hole-1081` (primary) | 현재 링크의 실제 기동 성공은 노년의 쿠잔 Blue Hole. 전성기 Speed 98 자체는 다른 시점·상대 조건으로부터의 외삽이므로 E3. |
| 5 | `garp` | `techniqueMastery` | 95 | **E2** | secondary | `evidence-garp-roger-rocks-1165` (secondary); `evidence-garp-galaxy-impact-1080` (secondary); `evidence-garp-blue-hole-1081` (secondary) | 전성기 패왕색 집중 권격과 노년 Galaxy/Blue Hole 기술을 비교하는 보조 추론. 원작 전성기 기술 목록을 노년과 완전 동일시하지 않는 조건부 E2. |
| 6 | `garp` | `combatIQ` | 97 | **E3** | primary | `evidence-garp-roger-rocks-1165` (축 미지정); `evidence-garp-rescue-command-1088` (primary) | 노년 구조전의 코비·그루스·헬메포 역할 분배는 확인되지만 전성기 독립 IQ97을 직접 지지하는 반복 표본은 약함, E3. |
| 7 | `garp` | `versatility` | 91 | **E3** | secondary | `evidence-garp-roger-rocks-1165` (축 미지정); `evidence-garp-galaxy-impact-1080` (축 미지정); `evidence-garp-galaxy-divide-1088` (secondary); `evidence-garp-rescue-command-1088` (secondary) | 노년 충격파·지휘·보호·근접 대응 레퍼토리를 전성기의 보조 근거로 참고. 전성기 각각의 능력이 직접 입증되지는 않아 E3. |
| 8 | `teach` | `attack` | 95 | **E2** | primary | `evidence-teach-ace-440-441` (primary); `evidence-teach-gura-577` (primary); `evidence-teach-law-1063-1064` (primary); `evidence-teach-kurouzu-441` (context) | 에이스전 흡인·무효화, 정상결전 지진, 로전 반격이 확인되지만 전성기 흰수염급 전투력과 동일시할 수 없고 단독 비교 제한이 있어 E2. |
| 9 | `teach` | `defense` | 89 | **E2** | secondary | `evidence-teach-ace-440-441` (secondary); `evidence-teach-whitebeard-576` (context); `evidence-teach-law-1063-1064` (축 미지정); `evidence-teach-hancock-nullification-1059` (context) | 상대 공격을 받으면서 전투를 지속한 장면은 많지만 피해를 막은 것과 Stamina를 구분. 핸콕 접촉 봉쇄의 특정 상성만 방어적 선택으로 제한해 E2. |
| 10 | `teach` | `stamina` | 95 | **E2** | primary | `evidence-teach-whitebeard-576` (primary); `evidence-teach-law-1063-1064` (primary); `evidence-teach-heart-pirates-1081` (secondary) | 에이스·흰수염·로 등 여러 강자에게 피해를 입은 후 지속한 직접 사례. 전투 시간과 회복·동료개입이 다르고 95점 상한을 독립 재현할 수 없어 E2. |
| 11 | `teach` | `techniqueMastery` | 93 | **E2** | primary | `evidence-teach-ace-440-441` (primary); `evidence-teach-gura-577` (secondary); `evidence-teach-law-1063-1064` (축 미지정); `evidence-teach-kurouzu-441` (primary); `evidence-teach-hancock-nullification-1059` (primary) | 야미야미 흡인·접촉 무효화와 흔들흔들 지진의 전술 활용은 복수 전장에서 실증되나 각 원사용자급 정밀 숙련은 별개라 E2. |
| 12 | `teach` | `combatIQ` | 87 | **E2** | primary | `evidence-teach-ace-440-441` (축 미지정); `evidence-teach-law-1063-1064` (context); `evidence-teach-kurouzu-441` (secondary); `evidence-teach-hancock-nullification-1059` (primary) | 에이스 상성 공략·핸콕 능력 차단·티치의 로 상대 위험 감수에서 긍정·부정 대응 공존. 대결 목적과 동료 정보 개입을 반영해 E2. |
| 13 | `teach` | `versatility` | 93 | **E1** | primary | `evidence-teach-ace-440-441` (primary); `evidence-teach-gura-577` (primary); `evidence-teach-law-1063-1064` (primary); `evidence-teach-hancock-nullification-1059` (축 미지정) | 실제 전투 여러 건에서 흡인·능력 무효화·지진 충격파·광역 파괴 등 서로 다른 능력의 역할 전환을 반복 시연한 직접 근거 밀도가 높아 E1. |
| 14 | `kuzan` | `attack` | 93 | **E2** | secondary | `evidence-kuzan-garp-haki-clash-1087` (secondary) | 가프를 상대로 Ice Glove+무투가 성립했으나 시류 관통상 이후 다수전·사제관계. 정규 1대1 최고 타격 결정력의 완전한 독립 증명은 아니라 E2. |
| 15 | `kuzan` | `defense` | 93 | **E2** | primary | `evidence-kuzan-sakazuki-duel-650` (context); `evidence-kuzan-garp-iceball-1081` (context); `evidence-kuzan-blue-hole-return-1081-1087` (secondary); `evidence-kuzan-admiral-barrier-564` (primary) | 세 대장의 지진파 공동 차단과 Blue Hole 피격 뒤 복귀가 확인되지만 공동 방어 개인 지분은 미측정·재교전은 Stamina. 조건부 E2. |
| 16 | `kuzan` | `stamina` | 97 | **E1** | primary | `evidence-kuzan-sakazuki-duel-650` (primary); `evidence-kuzan-blue-hole-return-1081-1087` (primary); `evidence-kuzan-garp-haki-clash-1087` (축 미지정) | 사카즈키와 10일 연속 결투한 명시적 최고급 장기전 표본에 가프 Blue Hole 후 복귀의 별도 직접 성과가 있어 E1. 결투 중 상세 기술은 미공개. |
| 17 | `kuzan` | `speed` | 90 | **E2** | secondary | `evidence-kuzan-garp-haki-clash-1087` (secondary); `evidence-kuzan-blue-hole-return-1081-1087` (context) | 가프의 근접 속도에 교환을 성립시킨 사례가 있으나 노년 가프가 선제 주도권을 잡았고 Blue Hole 뒤 정확한 복귀 시간도 불명, E2. |
| 18 | `kuzan` | `techniqueMastery` | 91 | **E2** | primary | `evidence-kuzan-garp-iceball-1081` (secondary); `evidence-kuzan-garp-haki-clash-1087` (primary) | IceBall 구속과 IceGlove·패기 무투의 복합 응용은 확인되지만 가프의 구속 탈출·전투 제약을 함께 반영해 E2. |
| 19 | `kizaru` | `defense` | 88 | **E2** | primary | `evidence-kizaru-star-gun-1094` (primary); `evidence-kizaru-vegapunk-1108` (context); `evidence-kizaru-admiral-barrier-564` (primary) | 정상결전 세 대장의 합동 지진 방어와 Gear5 Star Gun 피격·행동 제약의 양방향 사례. 개인 단독 방어 스케일을 한 사건으로 확정 불가, E2. |
| 20 | `kizaru` | `stamina` | 91 | **E2** | secondary | `evidence-kizaru-star-gun-1094` (context); `evidence-kizaru-vegapunk-1108` (secondary) | Star Gun 직후 행동 제한 후 교전에 재개입. 교전 중 임무·베가펑크에 대한 심리 부담과 긴 시간 독립 결투 부족을 구분해 E2. |
| 21 | `kizaru` | `speed` | 99 | **E1** | primary | `evidence-kizaru-luffy-clones-1093` (primary) | 빛 형태의 이동·광속에 준하는 기동과 재접근·이탈을 여러 장면에서 직접 운용한 속도 특화 능력은 확고해 E1. Speed 99의 절대 숫자까지 인증하는 건 아님. |
| 22 | `kizaru` | `techniqueMastery` | 93 | **E2** | primary | `evidence-kizaru-luffy-clones-1093` (primary) | 광검·빛 분신·광탄·재접근을 실전 운용하나 단일 에그헤드 공방 비중이 높고 분신의 유효 피해량 제한으로 E2. |
| 23 | `kizaru` | `combatIQ` | 90 | **E2** | secondary | `evidence-kizaru-luffy-clones-1093` (secondary) | 베가펑크 제거 임무를 위해 루피와 이탈·재교전을 반복한 목표 선택은 관찰. 심리적 제약과 동료 관계를 분리해 E2. |
| 24 | `kizaru` | `versatility` | 91 | **E2** | primary | `evidence-kizaru-luffy-clones-1093` (primary) | 광검·장거리 광탄·분신·기동 등 역할이 직접 관찰되지만 동일 빛 열매 파생 수단으로 독립 능력 숫자를 부풀리지 않아 E2. |
| 25 | `mihawk` | `attack` | 96 | **E2** | primary | `evidence-mihawk-jozu-553` (primary); `evidence-mihawk-luffy-560-561` (primary); `evidence-mihawk-shanks-swordskill-1058` (secondary) | 대형 참격과 추격 검술·최상위 검사 칭호는 확인되지만 죠즈 방어 차단/상대 강자 직접 피해량 제한. 최상위 독립 피니시 표본 부족으로 E2. |
| 26 | `mihawk` | `speed` | 94 | **E3** | primary | `evidence-mihawk-luffy-560-561` (primary); `evidence-mihawk-vista-561-562` (secondary); `evidence-mihawk-shanks-rivalry-profile` (context) | 루피·비스타를 상대로 반응·요격 성과는 확인되지만 샹크스와 과거 검술 경쟁을 현재 순수 이동속도94의 직접 고점 증명으로 대체하기 어려워 E3. |
| 27 | `mihawk` | `techniqueMastery` | 99 | **E1** | primary | `evidence-mihawk-world-strongest-profile` (primary); `evidence-mihawk-shanks-swordskill-1058` (primary); `evidence-mihawk-zoro-49-51` (primary); `evidence-mihawk-vista-561-562` (primary) | 세계 최강 검사 공식 소개, Ch.1058 해군의 샹크스 대비 검술 평가, 조로 단검 대응·정상결전 비스타 교환 등 여러 독립 직접·위상 근거로 E1. 검술과 전체 전투력 동치 금지. |
| 28 | `mihawk` | `combatIQ` | 92 | **E3** | secondary | `evidence-mihawk-zoro-49-51` (secondary); `evidence-mihawk-luffy-560-561` (secondary) | 조로 상대 대응·루피 추격에서 수단을 선택하나 상대 패턴 반복 분석·전술 적응을 직접 비교할 복수 상위 결투 표본 부족, E3. |
| 29 | `mihawk` | `versatility` | 84 | **E2** | secondary | `evidence-mihawk-jozu-553` (secondary); `evidence-mihawk-luffy-560-561` (secondary); `evidence-mihawk-zoro-49-51` (축 미지정) | 근접 공방·장거리 참격·큰 목표 절단·정밀 방어까지 검술 내 역할 전환은 확인되지만 다른 전투 메커니즘까지 다재다능으로 합산할 수 없어 E2. |

## 3. 원작/공식 출처 교차 확인과 판단의 경계

- **가프 전성기:** 프로젝트 `evidence-garp-roger-rocks-1165` (Manga Ch.1165)은 가프·로저가 록스에게 **공동 최종 공격**을 성립시킨 이야기. 현재 공개된 외부 장면 요약([One Piece Wiki, Ch.1165](https://onepiece.fandom.com/wiki/Chapter_1165))도 공동 공격과 패기 대량 소비 위험을 설명하지만, 이는 **비공식 2차 요약**이다. 공식 [ONE PIECE.com TV1122화](https://one-piece.com/anime/69263/index.html)는 **노년 가프**가 코비/그루스/헬메포에게 탈출 임무를 분담하고 피사로에게 Galaxy Divide를 쓰는 장면을 확인한다. 노년의 활동을 전성기 Speed·Stamina·IQ로 직접 전환하지 않는다. 전성기 99/98/97/91과 같은 고득점 추정의 E3 불확실성을 기록한다.
- **티치:** 공식 [ONE PIECE.com 티치 캐릭터 소개](https://one-piece.com/character/Marshall_D_Teech/index.html)는 `ヤミヤミ`와 `グラグラ` **두 열매**의 실제 사용을 설명한다. 공식 TV [325화](https://one-piece.com/anime/325/index.html)는 에이스를 상대로 흡인·능력 제어를, [1087~1088화](https://one-piece.com/anime/64696/index.html)는 아마존릴리의 핸콕 봉쇄와 레일리 개입을, [1093화](https://one-piece.com/anime/65154/index.html)는 로와 티치의 전투 및 하트 해적단의 해상 지원을 소개한다. 공동 참전과 능력 상성은 정면 화력·기술 완성도의 전면 입증과 구분한다.
- **쿠잔:** 프로젝트 `evidence-kuzan-sakazuki-duel-650`은 10일 결투라는 **기간**을 명시하지만 세부 기술·피로·기여는 공개되지 않았다. 공식 TV [1114화](https://one-piece.com/anime/68048/index.html)와 [1122화](https://one-piece.com/anime/69263/index.html)는 쿠잔/가프 충돌, 상처를 입은 가프와 구조 임무를 설명한다. 지구력은 E1, 가프 피격 이후 복귀는 방어 성공이 아닌 Stamina 보조.
- **키자루:** 공식 TV [1126화](https://one-piece.com/anime/72344/index.html)·[1127화](https://one-piece.com/anime/72451/index.html)는 빛 형태 변환·급속 복귀와 루피 교전, 표적을 베가펑크로 정한 임무를 설명한다. [1128화](https://one-piece.com/anime/72495/index.html)는 루피의 White Star Gun 명중 사실을 설명한다. 순수 빛 기동 E1, 방어·지구력·전술은 심리·합동방어·행동제약으로 E2. 능력과 정확한 99라는 숫자를 동일시하지 않는다.
- **미호크:** [ONE PIECE.com 공식 캐릭터 소개](https://one-piece.com/character/Dracule_Mihawk/index.html)는 세계 최강 검사·흑도 夜·조로전 우위를 확인한다. 공식 [조로 바다가 첫 출항 검술 특집](https://one-piece.com/news/o20201111_11715/index.html)은 단검 대응을 별도로 설명한다. 프로젝트 Ch.1058의 샹크스 대비 검술 평가는 검술에 한정되며 종합 전투력/순수 속도 전면 우위가 아니다. 최상급 검술은 E1, 속도·IQ 고점 근거는 E3.

## 4. 남은 51축과 후속 점수 검증 후보

- 미분류 **51개**: Primary 역할 **29**, Secondary **22**. 남은 캐릭터: 크로커다일7, 조로6, 상디6, 핸콕5, 비스타4, 스무디4, 후지토라4, 잭3, 시류3, 반 오거3, 바제스3, 피사로3.
- 다음 v0.1.57에서 51축 중 공통 전투 조건·독립 출처가 확인되는 묶음부터 심사하고 남은 불확실한 축은 E3로 명시. 자동 일괄 E2 승급 금지.
- 이후 숫자 수정 검토 **사용자 승인안**: Garp Prime Stamina99/Speed98/CombatIQ97/Versatility91, Mihawk Speed94/CombatIQ92, Shanks Speed95/ Law Speed82, Lucci CombatIQ68 등. 이 값들은 **다음 민감도 분석 후보**이지 이번 패치의 수정 권고 수치가 아니다.
- Canon 검수 → 59×7 같은 스탯 간 상대교차 → Raw·Base 중복 방지 → Overall/rank 영향 시뮬레이션 → 사용자 승인 후 점수 변경 → UX·Matchup 실사용 검증 순서로 발전. 후속 계획: [v0.1.54 Post-Axis Roadmap](./V0_1_54_POST_AXIS_AUDIT_ROADMAP_2026-10-09.md).

**검증:** 명확하게 이 보고서는 소스·정황·해석과 점수/메타데이터를 분리한다. 수동 브라우저·모바일 확인 및 모든 Manga Panel 원본 열람은 수행하지 않았다. CI 및 Pages 성공 여부는 별도의 TEST_REPORT/Actions 로그로 확인해야 한다.
