# v0.1.53 — 이전 미분류 172축 전수 출처 기여도/연결 상태 감사

**기준:** `main@5ff5b9ab345463b2469a155ccbd2cbe0eb2adfd5` (v0.1.52). 표는 **당시 미분류였던 172축 전부**이며, v0.1.53에서 새로 분류한 24축과 여전히 미분류인 148축을 함께 보여 준다.

- 이전 172 = Evidence ID 연결 162 + 직접 연결 0개 10.
- 이번 원작 공식 줄거리 기반 새 Evidence **3개** (전부 `supplementary`, `moderate`)와 **7개 축에 Evidence ID 링크 10개 추가**. 하나의 장면이 여러 축의 맥락으로 등장해도 독립 사건으로 중복 세지 않는다.
- 24축 **수동 판단**: 직접 Evidence ID가 없던 10축 **모두** 충분도 분류(E2 또는 E3), 마르코 7축, 킹 7축. 기존 링크가 전혀 없는 **스무디 Speed, 샹크스 Stamina, 로쿠규 Speed는 E3로 유지하면서 링크를 만들어 내지 않았다**.
- v0.1.53 이후 미분류 **148개 전부에 ≥1개 Evidence ID가 연결**되지만, 연결의 존재나 출처 강도는 충분도 등급과 다르다. 이 148축의 기여 유형을 구분한 것이지 실제 만화 148축 컷 전부를 열람/검증한 게 아니다.
- **문서 내부 역할 감사:** `statContributions`의 주기여/보조/상황을 확인. 동일 캐릭터라도 해당 축을 직접 지지하지 않는 기록(축 미지정)을 E1/E2 직접성으로 간주하지 않는다. `supplementary`는 공식 TV 줄거리 등 만화 장면과 구분한다.

## 여전히 미분류 148축의 연결 Evidence '최고 역할' 분포

여러 링크 중 `primary`가 있으면 주기여, 아니면 `secondary`, `context`, 표기된 역할이 없으면 축 미지정으로 구분했다. 역할과 장면 직접성은 다른 개념이다.

| 연결 최고 역할 | 미분류 축 수 |
|---|---:|
| 주기여 | 72 |
| 보조 | 39 |
| 상황 | 14 |
| 축 미지정 | 23 |
| ID 미확인 | 0 |
| 미연결 | 0 |

**검토 우선순위:** 축 미지정 23건은 Evaluation이 인용하는 Evidence에 그 축 기여 역할 자체가 없거나 따로 기술되지 않아, 근거-축 추적 관계가 성립하는지 먼저 검사해야 한다. 상황(context) 14건은 전투 상황 설명과 정량적 능력의 주 증거를 구분해야 한다. 그 다음 보조/주기여도 개별 출처의 1차 원작/공식 줄거리/집단전/예고 조건과 비교해야 한다.

## 172축 전체 before→after 목록

| # | 캐릭터 | 평가축 | Final | Evidence 수 전→후 | v0.1.53 readiness | 최고 기여 역할 | v0.1.53 연결 ID·source/role |
|---:|---|---|---:|---:|---|---|---|
| 1 | `marco` | `attack` | 76 | 2→2 | **E2** | 주기여 | `evidence-marco-kizaru-554` (canon/축 미지정), `evidence-marco-armament-akainu-574` (canon/primary) |
| 2 | `marco` | `defense` | 87 | 4→4 | **E1** | 주기여 | `evidence-marco-kizaru-554` (canon/primary), `evidence-marco-defense-akainu-575` (canon/primary), `evidence-marco-defense-king-1022` (canon/primary), `evidence-marco-defense-kaido-1043` (canon/primary) |
| 3 | `marco` | `stamina` | 87 | 3→3 | **E2** | 보조 | `evidence-marco-regeneration-1006` (canon/secondary), `evidence-marco-defense-king-1022` (canon/축 미지정), `evidence-marco-defense-kaido-1043` (canon/축 미지정) |
| 4 | `marco` | `speed` | 82 | 2→2 | **E2** | 주기여 | `evidence-marco-kizaru-554` (canon/secondary), `evidence-marco-aokiji-566` (canon/primary) |
| 5 | `marco` | `techniqueMastery` | 84 | 3→3 | **E2** | 보조 | `evidence-marco-ice-oni-998` (canon/secondary), `evidence-marco-regeneration-1006` (canon/context), `evidence-marco-defense-king-1022` (canon/secondary) |
| 6 | `marco` | `combatIQ` | 80 | 4→4 | **E2** | 보조 | `evidence-marco-aokiji-566` (canon/secondary), `evidence-marco-big-mom-995` (canon/context), `evidence-marco-seastone-568-569` (canon/context), `evidence-marco-payback-war-820-909` (canon/context) |
| 7 | `marco` | `versatility` | 87 | 5→5 | **E2** | 주기여 | `evidence-marco-big-mom-995` (canon/secondary), `evidence-marco-ice-oni-998` (canon/primary), `evidence-marco-regeneration-1006` (canon/축 미지정), `evidence-marco-defense-akainu-575` (canon/secondary), `evidence-marco-defense-kaido-1043` (canon/secondary) |
| 8 | `vista` | `attack` | 80 | 3→3 | **보류** | 주기여 | `evidence-vista-mihawk-561-562` (canon/secondary), `evidence-vista-official-mihawk-profile` (supplementary/secondary), `evidence-vista-armament-akainu-574` (canon/primary) |
| 9 | `vista` | `defense` | 79 | 1→1 | **보류** | 보조 | `evidence-vista-mihawk-561-562` (canon/secondary) |
| 10 | `vista` | `stamina` | 77 | 2→2 | **보류** | 축 미지정 | `evidence-vista-mihawk-561-562` (canon/축 미지정), `evidence-vista-armament-akainu-574` (canon/축 미지정) |
| 11 | `vista` | `speed` | 80 | 1→1 | **보류** | 보조 | `evidence-vista-mihawk-561-562` (canon/secondary) |
| 12 | `vista` | `techniqueMastery` | 86 | 3→3 | **보류** | 주기여 | `evidence-vista-mihawk-561-562` (canon/primary), `evidence-vista-official-mihawk-profile` (supplementary/primary), `evidence-vista-armament-akainu-574` (canon/secondary) |
| 13 | `vista` | `combatIQ` | 77 | 1→1 | **보류** | 축 미지정 | `evidence-vista-mihawk-561-562` (canon/축 미지정) |
| 14 | `vista` | `versatility` | 74 | 2→2 | **보류** | 축 미지정 | `evidence-vista-mihawk-561-562` (canon/축 미지정), `evidence-vista-armament-akainu-574` (canon/축 미지정) |
| 15 | `king` | `attack` | 83 | 3→3 | **E2** | 주기여 | `evidence-king-marco-1006` (canon/primary), `evidence-king-zoro-1035` (canon/primary), `evidence-king-armament-1032` (canon/primary) |
| 16 | `king` | `defense` | 88 | 2→2 | **E2** | 주기여 | `evidence-king-lunarian-1032` (canon/primary), `evidence-king-zoro-1035` (canon/primary) |
| 17 | `king` | `stamina` | 85 | 2→2 | **E2** | 보조 | `evidence-king-marco-1006` (canon/축 미지정), `evidence-king-zoro-1035` (canon/secondary) |
| 18 | `king` | `speed` | 83 | 1→1 | **E2** | 주기여 | `evidence-king-zoro-1035` (canon/primary) |
| 19 | `king` | `techniqueMastery` | 80 | 2→2 | **E2** | 보조 | `evidence-king-zoro-1035` (canon/축 미지정), `evidence-king-armament-1032` (canon/secondary) |
| 20 | `king` | `combatIQ` | 77 | 1→1 | **E3** | 보조 | `evidence-king-zoro-1035` (canon/secondary) |
| 21 | `king` | `versatility` | 82 | 2→2 | **E2** | 보조 | `evidence-king-zoro-1035` (canon/secondary), `evidence-king-waterfall-930` (canon/secondary) |
| 22 | `jack` | `attack` | 79 | 2→2 | **보류** | 주기여 | `evidence-jack-ashura-921` (canon/primary), `evidence-jack-zou-809-810` (canon/context) |
| 23 | `jack` | `defense` | 84 | 3→3 | **보류** | 보조 | `evidence-jack-zou-809-810` (canon/secondary), `evidence-jack-ashura-921` (canon/context), `evidence-jack-sulong-1026` (canon/secondary) |
| 24 | `jack` | `stamina` | 88 | 3→3 | **보류** | 주기여 | `evidence-jack-zou-809-810` (canon/primary), `evidence-jack-sulong-1026` (canon/primary), `evidence-jack-convoy-801` (canon/context) |
| 25 | `jack` | `speed` | 75 | 1→1 | **보류** | 축 미지정 | `evidence-jack-ashura-921` (canon/축 미지정) |
| 26 | `jack` | `techniqueMastery` | 75 | 2→2 | **보류** | 축 미지정 | `evidence-jack-ashura-921` (canon/축 미지정), `evidence-jack-zou-809-810` (canon/축 미지정) |
| 27 | `jack` | `combatIQ` | 72 | 2→2 | **보류** | 축 미지정 | `evidence-jack-zou-809-810` (canon/축 미지정), `evidence-jack-zunesha-824` (canon/축 미지정) |
| 28 | `jack` | `versatility` | 74 | 2→2 | **보류** | 축 미지정 | `evidence-jack-zou-809-810` (canon/축 미지정), `evidence-jack-ashura-921` (canon/축 미지정) |
| 29 | `smoothie` | `attack` | 76 | 1→1 | **보류** | 주기여 | `evidence-smoothie-pursuit-894` (canon/primary) |
| 30 | `smoothie` | `defense` | 75 | 1→1 | **보류** | 상황 | `evidence-smoothie-poison-869` (canon/context) |
| 31 | `smoothie` | `stamina` | 76 | 2→2 | **보류** | 상황 | `evidence-smoothie-pursuit-894` (canon/context), `evidence-smoothie-command-897` (canon/축 미지정) |
| 32 | `smoothie` | `speed` | 74 | 0→0 | **E3** | 미연결 | — |
| 33 | `smoothie` | `techniqueMastery` | 80 | 2→2 | **보류** | 주기여 | `evidence-smoothie-poison-869` (canon/primary), `evidence-smoothie-pursuit-894` (canon/secondary) |
| 34 | `smoothie` | `combatIQ` | 77 | 1→1 | **보류** | 주기여 | `evidence-smoothie-command-897` (canon/primary) |
| 35 | `smoothie` | `versatility` | 78 | 3→3 | **보류** | 주기여 | `evidence-smoothie-poison-869` (canon/primary), `evidence-smoothie-pursuit-894` (canon/primary), `evidence-smoothie-command-897` (canon/secondary) |
| 36 | `cracker` | `attack` | 75 | 2→2 | **보류** | 주기여 | `evidence-cracker-biscuit-837-838` (canon/primary), `evidence-cracker-urouge-837` (canon/context) |
| 37 | `cracker` | `defense` | 81 | 2→2 | **보류** | 주기여 | `evidence-cracker-biscuit-837-838` (canon/primary), `evidence-cracker-long-battle-842` (canon/축 미지정) |
| 38 | `cracker` | `stamina` | 80 | 1→1 | **보류** | 주기여 | `evidence-cracker-long-battle-842` (canon/primary) |
| 39 | `cracker` | `speed` | 75 | 1→1 | **보류** | 축 미지정 | `evidence-cracker-biscuit-837-838` (canon/축 미지정) |
| 40 | `cracker` | `techniqueMastery` | 80 | 2→2 | **보류** | 보조 | `evidence-cracker-biscuit-837-838` (canon/secondary), `evidence-cracker-long-battle-842` (canon/secondary) |
| 41 | `cracker` | `combatIQ` | 75 | 1→1 | **보류** | 축 미지정 | `evidence-cracker-long-battle-842` (canon/축 미지정) |
| 42 | `cracker` | `versatility` | 77 | 2→2 | **보류** | 보조 | `evidence-cracker-biscuit-837-838` (canon/secondary), `evidence-cracker-long-battle-842` (canon/context) |
| 43 | `zoro` | `attack` | 85 | 3→3 | **보류** | 주기여 | `evidence-zoro-ashura-scar-1010` (canon/primary), `evidence-zoro-conquerors-1033-1035` (canon/primary), `evidence-zoro-lucci-1110-1111` (canon/secondary) |
| 44 | `zoro` | `defense` | 81 | 1→1 | **보류** | 주기여 | `evidence-zoro-hakai-1009` (canon/primary) |
| 45 | `zoro` | `stamina` | 87 | 3→3 | **보류** | 주기여 | `evidence-zoro-nothing-happened-485` (canon/primary), `evidence-zoro-hakai-1009` (canon/secondary), `evidence-zoro-ashura-scar-1010` (canon/secondary) |
| 46 | `zoro` | `speed` | 83 | 1→1 | **보류** | 축 미지정 | `evidence-zoro-conquerors-1033-1035` (canon/축 미지정) |
| 47 | `zoro` | `techniqueMastery` | 85 | 3→3 | **보류** | 주기여 | `evidence-zoro-hakai-1009` (canon/축 미지정), `evidence-zoro-ashura-scar-1010` (canon/secondary), `evidence-zoro-conquerors-1033-1035` (canon/primary) |
| 48 | `zoro` | `combatIQ` | 82 | 1→1 | **보류** | 주기여 | `evidence-zoro-lunarian-read-1035` (canon/primary) |
| 49 | `zoro` | `versatility` | 81 | 2→2 | **보류** | 보조 | `evidence-zoro-hakai-1009` (canon/secondary), `evidence-zoro-conquerors-1033-1035` (canon/축 미지정) |
| 50 | `sanji` | `attack` | 81 | 1→1 | **보류** | 주기여 | `evidence-sanji-speed-ifrit-1034` (canon/primary) |
| 51 | `sanji` | `defense` | 85 | 3→3 | **보류** | 주기여 | `evidence-sanji-exoskeleton-1028` (canon/primary), `evidence-sanji-speed-ifrit-1034` (canon/축 미지정), `evidence-sanji-kizaru-laser-1107` (canon/secondary) |
| 52 | `sanji` | `stamina` | 85 | 2→2 | **보류** | 주기여 | `evidence-sanji-exoskeleton-1028` (canon/primary), `evidence-sanji-speed-ifrit-1034` (canon/축 미지정) |
| 53 | `sanji` | `speed` | 91 | 3→3 | **보류** | 주기여 | `evidence-sanji-speed-ifrit-1034` (canon/primary), `evidence-sanji-kizaru-laser-1107` (canon/secondary), `evidence-sanji-nusjuro-1113` (canon/secondary) |
| 54 | `sanji` | `techniqueMastery` | 84 | 1→1 | **보류** | 보조 | `evidence-sanji-speed-ifrit-1034` (canon/secondary) |
| 55 | `sanji` | `combatIQ` | 81 | 1→1 | **보류** | 축 미지정 | `evidence-sanji-kizaru-laser-1107` (canon/축 미지정) |
| 56 | `sanji` | `versatility` | 82 | 4→4 | **보류** | 보조 | `evidence-sanji-exoskeleton-1028` (canon/축 미지정), `evidence-sanji-speed-ifrit-1034` (canon/secondary), `evidence-sanji-kizaru-laser-1107` (canon/secondary), `evidence-sanji-nusjuro-1113` (canon/secondary) |
| 57 | `jinbe` | `attack` | 76 | 2→2 | **보류** | 주기여 | `evidence-jinbe-fishman-karate-629` (canon/축 미지정), `evidence-jinbe-whos-who-1018` (canon/primary) |
| 58 | `jinbe` | `defense` | 78 | 2→2 | **보류** | 주기여 | `evidence-jinbe-big-mom-890` (canon/primary), `evidence-jinbe-whos-who-1018` (canon/primary) |
| 59 | `jinbe` | `stamina` | 80 | 3→3 | **보류** | 주기여 | `evidence-jinbe-ace-five-days-552` (canon/primary), `evidence-jinbe-akainu-575` (canon/secondary), `evidence-jinbe-whos-who-1018` (canon/축 미지정) |
| 60 | `jinbe` | `speed` | 77 | 1→1 | **보류** | 축 미지정 | `evidence-jinbe-whos-who-1018` (canon/축 미지정) |
| 61 | `jinbe` | `techniqueMastery` | 83 | 2→2 | **보류** | 주기여 | `evidence-jinbe-fishman-karate-629` (canon/primary), `evidence-jinbe-whos-who-1018` (canon/secondary) |
| 62 | `jinbe` | `combatIQ` | 80 | 1→1 | **보류** | 보조 | `evidence-jinbe-big-mom-890` (canon/secondary) |
| 63 | `jinbe` | `versatility` | 79 | 2→2 | **보류** | 주기여 | `evidence-jinbe-fishman-karate-629` (canon/secondary), `evidence-jinbe-big-mom-890` (canon/primary) |
| 64 | `shanks` | `attack` | 94 | 2→2 | **보류** | 주기여 | `evidence-shanks-whitebeard-haki-434` (canon/secondary), `evidence-shanks-kid-divine-departure-1079` (canon/primary) |
| 65 | `shanks` | `defense` | 91 | 1→1 | **보류** | 주기여 | `evidence-shanks-sakazuki-block-579` (canon/primary) |
| 66 | `shanks` | `stamina` | 88 | 0→0 | **E3** | 미연결 | — |
| 67 | `shanks` | `speed` | 95 | 2→2 | **보류** | 보조 | `evidence-shanks-kid-divine-departure-1079` (canon/secondary), `evidence-shanks-sakazuki-block-579` (canon/secondary) |
| 68 | `shanks` | `techniqueMastery` | 92 | 2→2 | **보류** | 주기여 | `evidence-shanks-whitebeard-haki-434` (canon/context), `evidence-shanks-kid-divine-departure-1079` (canon/primary) |
| 69 | `shanks` | `combatIQ` | 91 | 2→2 | **보류** | 주기여 | `evidence-shanks-aramaki-haki-1055` (canon/secondary), `evidence-shanks-kid-divine-departure-1079` (canon/primary) |
| 70 | `shanks` | `versatility` | 88 | 1→1 | **보류** | 주기여 | `evidence-shanks-aramaki-haki-1055` (canon/primary) |
| 71 | `garp` | `attack` | 95 | 1→1 | **보류** | 주기여 | `evidence-garp-roger-rocks-1165` (canon/primary) |
| 72 | `garp` | `defense` | 95 | 1→1 | **보류** | 주기여 | `evidence-garp-roger-rocks-1165` (canon/primary) |
| 73 | `garp` | `stamina` | 99 | 2→2 | **보류** | 주기여 | `evidence-garp-roger-rocks-1165` (canon/primary), `evidence-garp-kuzan-haki-1087` (canon/secondary) |
| 74 | `garp` | `speed` | 98 | 2→2 | **보류** | 주기여 | `evidence-garp-roger-rocks-1165` (canon/축 미지정), `evidence-garp-blue-hole-1081` (canon/primary) |
| 75 | `garp` | `techniqueMastery` | 95 | 3→3 | **보류** | 보조 | `evidence-garp-roger-rocks-1165` (canon/secondary), `evidence-garp-galaxy-impact-1080` (canon/secondary), `evidence-garp-blue-hole-1081` (canon/secondary) |
| 76 | `garp` | `combatIQ` | 97 | 2→2 | **보류** | 주기여 | `evidence-garp-roger-rocks-1165` (canon/축 미지정), `evidence-garp-rescue-command-1088` (canon/primary) |
| 77 | `garp` | `versatility` | 91 | 4→4 | **보류** | 보조 | `evidence-garp-roger-rocks-1165` (canon/축 미지정), `evidence-garp-galaxy-impact-1080` (canon/축 미지정), `evidence-garp-galaxy-divide-1088` (canon/secondary), `evidence-garp-rescue-command-1088` (canon/secondary) |
| 78 | `kuzan` | `attack` | 93 | 1→1 | **보류** | 보조 | `evidence-kuzan-garp-haki-clash-1087` (canon/secondary) |
| 79 | `kuzan` | `defense` | 93 | 4→4 | **보류** | 주기여 | `evidence-kuzan-sakazuki-duel-650` (canon/context), `evidence-kuzan-garp-iceball-1081` (canon/context), `evidence-kuzan-blue-hole-return-1081-1087` (canon/secondary), `evidence-kuzan-admiral-barrier-564` (canon/primary) |
| 80 | `kuzan` | `stamina` | 97 | 3→3 | **보류** | 주기여 | `evidence-kuzan-sakazuki-duel-650` (canon/primary), `evidence-kuzan-blue-hole-return-1081-1087` (canon/primary), `evidence-kuzan-garp-haki-clash-1087` (canon/축 미지정) |
| 81 | `kuzan` | `speed` | 90 | 2→2 | **보류** | 보조 | `evidence-kuzan-garp-haki-clash-1087` (canon/secondary), `evidence-kuzan-blue-hole-return-1081-1087` (canon/context) |
| 82 | `kuzan` | `techniqueMastery` | 91 | 2→2 | **보류** | 주기여 | `evidence-kuzan-garp-iceball-1081` (canon/secondary), `evidence-kuzan-garp-haki-clash-1087` (canon/primary) |
| 83 | `kuzan` | `combatIQ` | 91 | 2→2 | **보류** | 축 미지정 | `evidence-kuzan-garp-iceball-1081` (canon/축 미지정), `evidence-kuzan-garp-haki-clash-1087` (canon/축 미지정) |
| 84 | `kuzan` | `versatility` | 92 | 2→2 | **보류** | 축 미지정 | `evidence-kuzan-garp-iceball-1081` (canon/축 미지정), `evidence-kuzan-garp-haki-clash-1087` (canon/축 미지정) |
| 85 | `kizaru` | `attack` | 92 | 2→2 | **보류** | 상황 | `evidence-kizaru-luffy-clones-1093` (canon/축 미지정), `evidence-kizaru-vegapunk-1108` (canon/context) |
| 86 | `kizaru` | `defense` | 88 | 3→3 | **보류** | 주기여 | `evidence-kizaru-star-gun-1094` (canon/primary), `evidence-kizaru-vegapunk-1108` (canon/context), `evidence-kizaru-admiral-barrier-564` (canon/primary) |
| 87 | `kizaru` | `stamina` | 91 | 2→2 | **보류** | 보조 | `evidence-kizaru-star-gun-1094` (canon/context), `evidence-kizaru-vegapunk-1108` (canon/secondary) |
| 88 | `kizaru` | `speed` | 99 | 1→1 | **보류** | 주기여 | `evidence-kizaru-luffy-clones-1093` (canon/primary) |
| 89 | `kizaru` | `techniqueMastery` | 93 | 1→1 | **보류** | 주기여 | `evidence-kizaru-luffy-clones-1093` (canon/primary) |
| 90 | `kizaru` | `combatIQ` | 90 | 1→1 | **보류** | 보조 | `evidence-kizaru-luffy-clones-1093` (canon/secondary) |
| 91 | `kizaru` | `versatility` | 91 | 1→1 | **보류** | 주기여 | `evidence-kizaru-luffy-clones-1093` (canon/primary) |
| 92 | `fujitora` | `attack` | 91 | 1→1 | **보류** | 보조 | `evidence-fujitora-meteor-713` (canon/secondary) |
| 93 | `fujitora` | `defense` | 88 | 0→1 | **E2** | 보조 | `evidence-fujitora-luffy-exchange-tv743` (supplementary/secondary) |
| 94 | `fujitora` | `stamina` | 87 | 0→1 | **E3** | 상황 | `evidence-fujitora-luffy-exchange-tv743` (supplementary/context) |
| 95 | `fujitora` | `speed` | 85 | 0→1 | **E2** | 보조 | `evidence-fujitora-luffy-exchange-tv743` (supplementary/secondary) |
| 96 | `fujitora` | `techniqueMastery` | 92 | 2→2 | **보류** | 주기여 | `evidence-fujitora-meteor-713` (canon/primary), `evidence-fujitora-luffy-observation-799` (canon/secondary) |
| 97 | `fujitora` | `combatIQ` | 85 | 1→1 | **보류** | 보조 | `evidence-fujitora-luffy-observation-799` (canon/secondary) |
| 98 | `fujitora` | `versatility` | 94 | 2→2 | **보류** | 보조 | `evidence-fujitora-meteor-713` (canon/secondary), `evidence-fujitora-luffy-observation-799` (canon/secondary) |
| 99 | `ryokugyu` | `attack` | 90 | 0→1 | **E2** | 주기여 | `evidence-aramaki-scabbards-tv1081` (supplementary/primary) |
| 100 | `ryokugyu` | `defense` | 89 | 1→1 | **보류** | 상황 | `evidence-aramaki-shanks-haki-1055` (canon/context) |
| 101 | `ryokugyu` | `stamina` | 89 | 0→2 | **E3** | 상황 | `evidence-aramaki-scabbards-tv1081` (supplementary/context), `evidence-aramaki-regrowth-tv1082` (supplementary/context) |
| 102 | `ryokugyu` | `speed` | 84 | 0→0 | **E3** | 미연결 | — |
| 103 | `ryokugyu` | `techniqueMastery` | 87 | 0→2 | **E2** | 보조 | `evidence-aramaki-scabbards-tv1081` (supplementary/secondary), `evidence-aramaki-regrowth-tv1082` (supplementary/secondary) |
| 104 | `ryokugyu` | `combatIQ` | 82 | 1→1 | **보류** | 상황 | `evidence-aramaki-shanks-haki-1055` (canon/context) |
| 105 | `ryokugyu` | `versatility` | 92 | 0→2 | **E2** | 주기여 | `evidence-aramaki-scabbards-tv1081` (supplementary/primary), `evidence-aramaki-regrowth-tv1082` (supplementary/secondary) |
| 106 | `teach` | `attack` | 95 | 4→4 | **보류** | 주기여 | `evidence-teach-ace-440-441` (canon/primary), `evidence-teach-gura-577` (canon/primary), `evidence-teach-law-1063-1064` (canon/primary), `evidence-teach-kurouzu-441` (canon/context) |
| 107 | `teach` | `defense` | 89 | 4→4 | **보류** | 보조 | `evidence-teach-ace-440-441` (canon/secondary), `evidence-teach-whitebeard-576` (canon/context), `evidence-teach-law-1063-1064` (canon/축 미지정), `evidence-teach-hancock-nullification-1059` (canon/context) |
| 108 | `teach` | `stamina` | 95 | 3→3 | **보류** | 주기여 | `evidence-teach-whitebeard-576` (canon/primary), `evidence-teach-law-1063-1064` (canon/primary), `evidence-teach-heart-pirates-1081` (canon/secondary) |
| 109 | `teach` | `speed` | 82 | 2→2 | **보류** | 축 미지정 | `evidence-teach-ace-440-441` (canon/축 미지정), `evidence-teach-law-1063-1064` (canon/축 미지정) |
| 110 | `teach` | `techniqueMastery` | 93 | 5→5 | **보류** | 주기여 | `evidence-teach-ace-440-441` (canon/primary), `evidence-teach-gura-577` (canon/secondary), `evidence-teach-law-1063-1064` (canon/축 미지정), `evidence-teach-kurouzu-441` (canon/primary), `evidence-teach-hancock-nullification-1059` (canon/primary) |
| 111 | `teach` | `combatIQ` | 87 | 4→4 | **보류** | 주기여 | `evidence-teach-ace-440-441` (canon/축 미지정), `evidence-teach-law-1063-1064` (canon/context), `evidence-teach-kurouzu-441` (canon/secondary), `evidence-teach-hancock-nullification-1059` (canon/primary) |
| 112 | `teach` | `versatility` | 93 | 4→4 | **보류** | 주기여 | `evidence-teach-ace-440-441` (canon/primary), `evidence-teach-gura-577` (canon/primary), `evidence-teach-law-1063-1064` (canon/primary), `evidence-teach-hancock-nullification-1059` (canon/축 미지정) |
| 113 | `shiryu` | `attack` | 78 | 1→1 | **보류** | 상황 | `evidence-shiryu-garp-1087` (canon/context) |
| 114 | `shiryu` | `defense` | 74 | 1→1 | **보류** | 상황 | `evidence-shiryu-garp-counter-1087` (canon/context) |
| 115 | `shiryu` | `speed` | 79 | 1→1 | **보류** | 축 미지정 | `evidence-shiryu-garp-1087` (canon/축 미지정) |
| 116 | `shiryu` | `techniqueMastery` | 77 | 1→1 | **보류** | 보조 | `evidence-shiryu-garp-1087` (canon/secondary) |
| 117 | `shiryu` | `combatIQ` | 78 | 1→1 | **보류** | 주기여 | `evidence-shiryu-garp-1087` (canon/primary) |
| 118 | `shiryu` | `versatility` | 78 | 1→1 | **보류** | 주기여 | `evidence-shiryu-garp-1087` (canon/primary) |
| 119 | `van-augur` | `attack` | 72 | 1→1 | **보류** | 상황 | `evidence-augur-jean-bart-1064` (canon/context) |
| 120 | `van-augur` | `defense` | 67 | 1→1 | **보류** | 축 미지정 | `evidence-augur-warp-1063-1064` (canon/축 미지정) |
| 121 | `van-augur` | `speed` | 75 | 1→1 | **보류** | 상황 | `evidence-augur-warp-1063-1064` (canon/context) |
| 122 | `van-augur` | `techniqueMastery` | 80 | 2→2 | **보류** | 주기여 | `evidence-augur-warp-1063-1064` (canon/primary), `evidence-augur-jean-bart-1064` (canon/축 미지정) |
| 123 | `van-augur` | `combatIQ` | 78 | 1→1 | **보류** | 주기여 | `evidence-augur-warp-1063-1064` (canon/primary) |
| 124 | `van-augur` | `versatility` | 82 | 1→1 | **보류** | 주기여 | `evidence-augur-warp-1063-1064` (canon/primary) |
| 125 | `burgess` | `attack` | 74 | 2→2 | **보류** | 보조 | `evidence-burgess-mountain-1063` (canon/secondary), `evidence-burgess-sabo-737-792` (canon/secondary) |
| 126 | `burgess` | `defense` | 74 | 1→1 | **보류** | 상황 | `evidence-burgess-sabo-737-792` (canon/context) |
| 127 | `burgess` | `stamina` | 79 | 1→1 | **보류** | 보조 | `evidence-burgess-sabo-737-792` (canon/secondary) |
| 128 | `burgess` | `speed` | 74 | 1→1 | **보류** | 축 미지정 | `evidence-burgess-sabo-737-792` (canon/축 미지정) |
| 129 | `burgess` | `techniqueMastery` | 72 | 2→2 | **보류** | 축 미지정 | `evidence-burgess-sabo-737-792` (canon/축 미지정), `evidence-burgess-mountain-1063` (canon/축 미지정) |
| 130 | `burgess` | `combatIQ` | 70 | 1→1 | **보류** | 축 미지정 | `evidence-burgess-sabo-737-792` (canon/축 미지정) |
| 131 | `burgess` | `versatility` | 74 | 1→1 | **보류** | 보조 | `evidence-burgess-mountain-1063` (canon/secondary) |
| 132 | `pizarro` | `attack` | 72 | 1→1 | **보류** | 보조 | `evidence-pizarro-island-1087-1088` (canon/secondary) |
| 133 | `pizarro` | `defense` | 74 | 1→1 | **보류** | 상황 | `evidence-pizarro-damage-link-1088` (canon/context) |
| 134 | `pizarro` | `stamina` | 74 | 1→1 | **보류** | 축 미지정 | `evidence-pizarro-island-1087-1088` (canon/축 미지정) |
| 135 | `pizarro` | `speed` | 64 | 1→1 | **보류** | 축 미지정 | `evidence-pizarro-island-1087-1088` (canon/축 미지정) |
| 136 | `pizarro` | `techniqueMastery` | 74 | 1→1 | **보류** | 보조 | `evidence-pizarro-island-1087-1088` (canon/secondary) |
| 137 | `pizarro` | `combatIQ` | 70 | 1→1 | **보류** | 상황 | `evidence-pizarro-damage-link-1088` (canon/context) |
| 138 | `pizarro` | `versatility` | 74 | 1→1 | **보류** | 주기여 | `evidence-pizarro-island-1087-1088` (canon/primary) |
| 139 | `law` | `attack` | 86 | 3→3 | **보류** | 주기여 | `evidence-law-big-mom-1039` (canon/primary), `evidence-law-puncture-wille-1039` (canon/primary), `evidence-law-teach-1064` (canon/primary) |
| 140 | `law` | `defense` | 83 | 2→2 | **보류** | 보조 | `evidence-law-big-mom-1039` (canon/secondary), `evidence-law-teach-1064` (canon/축 미지정) |
| 141 | `law` | `stamina` | 85 | 2→2 | **보류** | 주기여 | `evidence-law-big-mom-1039` (canon/primary), `evidence-law-puncture-wille-1039` (canon/primary) |
| 142 | `law` | `speed` | 82 | 1→1 | **보류** | 보조 | `evidence-law-teach-1064` (canon/secondary) |
| 143 | `law` | `techniqueMastery` | 90 | 3→3 | **보류** | 주기여 | `evidence-law-doflamingo-gamma-knife-781` (canon/primary), `evidence-law-big-mom-1039` (canon/secondary), `evidence-law-haki-nullification-1063` (canon/secondary) |
| 144 | `law` | `combatIQ` | 88 | 2→2 | **보류** | 주기여 | `evidence-law-doflamingo-gamma-knife-781` (canon/primary), `evidence-law-haki-nullification-1063` (canon/primary) |
| 145 | `law` | `versatility` | 91 | 4→4 | **보류** | 보조 | `evidence-law-doflamingo-gamma-knife-781` (canon/secondary), `evidence-law-big-mom-1039` (canon/축 미지정), `evidence-law-haki-nullification-1063` (canon/secondary), `evidence-law-teach-1064` (canon/secondary) |
| 146 | `doflamingo` | `attack` | 76 | 2→2 | **보류** | 주기여 | `evidence-doflamingo-law-arm-769` (canon/primary), `evidence-doflamingo-gear4-784-785` (canon/context) |
| 147 | `doflamingo` | `defense` | 74 | 2→2 | **보류** | 주기여 | `evidence-doflamingo-gear4-784-785` (canon/primary), `evidence-doflamingo-organ-repair-781` (canon/context) |
| 148 | `doflamingo` | `stamina` | 81 | 2→2 | **보류** | 주기여 | `evidence-doflamingo-organ-repair-781` (canon/primary), `evidence-doflamingo-gear4-784-785` (canon/secondary) |
| 149 | `doflamingo` | `speed` | 75 | 1→1 | **보류** | 주기여 | `evidence-doflamingo-gear4-784-785` (canon/primary) |
| 150 | `doflamingo` | `techniqueMastery` | 87 | 3→3 | **보류** | 주기여 | `evidence-doflamingo-law-arm-769` (canon/primary), `evidence-doflamingo-organ-repair-781` (canon/primary), `evidence-doflamingo-awakening-785` (canon/primary) |
| 151 | `doflamingo` | `combatIQ` | 81 | 2→2 | **보류** | 보조 | `evidence-doflamingo-organ-repair-781` (canon/secondary), `evidence-doflamingo-awakening-785` (canon/secondary) |
| 152 | `doflamingo` | `versatility` | 83 | 3→3 | **보류** | 주기여 | `evidence-doflamingo-law-arm-769` (canon/축 미지정), `evidence-doflamingo-awakening-785` (canon/secondary), `evidence-doflamingo-birdcage-781-790` (canon/primary) |
| 153 | `hancock` | `attack` | 79 | 2→2 | **보류** | 주기여 | `evidence-hancock-marineford-559` (canon/primary), `evidence-hancock-amazon-lily-1059` (canon/primary) |
| 154 | `hancock` | `defense` | 76 | 1→1 | **보류** | 상황 | `evidence-hancock-amazon-lily-1059` (canon/context) |
| 155 | `hancock` | `stamina` | 77 | 2→2 | **보류** | 축 미지정 | `evidence-hancock-marineford-559` (canon/축 미지정), `evidence-hancock-amazon-lily-1059` (canon/축 미지정) |
| 156 | `hancock` | `speed` | 80 | 1→1 | **보류** | 보조 | `evidence-hancock-marineford-559` (canon/secondary) |
| 157 | `hancock` | `techniqueMastery` | 82 | 2→2 | **보류** | 보조 | `evidence-hancock-marineford-559` (canon/secondary), `evidence-hancock-amazon-lily-1059` (canon/secondary) |
| 158 | `hancock` | `combatIQ` | 75 | 1→1 | **보류** | 보조 | `evidence-hancock-amazon-lily-1059` (canon/secondary) |
| 159 | `hancock` | `versatility` | 82 | 2→2 | **보류** | 보조 | `evidence-hancock-marineford-559` (canon/축 미지정), `evidence-hancock-amazon-lily-1059` (canon/secondary) |
| 160 | `mihawk` | `attack` | 96 | 3→3 | **보류** | 주기여 | `evidence-mihawk-jozu-553` (canon/primary), `evidence-mihawk-luffy-560-561` (canon/primary), `evidence-mihawk-shanks-swordskill-1058` (canon/secondary) |
| 161 | `mihawk` | `stamina` | 91 | 2→2 | **보류** | 상황 | `evidence-mihawk-vista-561-562` (canon/context), `evidence-mihawk-shanks-rivalry-profile` (supplementary/축 미지정) |
| 162 | `mihawk` | `speed` | 94 | 3→3 | **보류** | 주기여 | `evidence-mihawk-luffy-560-561` (canon/primary), `evidence-mihawk-vista-561-562` (canon/secondary), `evidence-mihawk-shanks-rivalry-profile` (supplementary/context) |
| 163 | `mihawk` | `techniqueMastery` | 99 | 4→4 | **보류** | 주기여 | `evidence-mihawk-world-strongest-profile` (supplementary/primary), `evidence-mihawk-shanks-swordskill-1058` (canon/primary), `evidence-mihawk-zoro-49-51` (canon/primary), `evidence-mihawk-vista-561-562` (canon/primary) |
| 164 | `mihawk` | `combatIQ` | 92 | 2→2 | **보류** | 보조 | `evidence-mihawk-zoro-49-51` (canon/secondary), `evidence-mihawk-luffy-560-561` (canon/secondary) |
| 165 | `mihawk` | `versatility` | 84 | 3→3 | **보류** | 보조 | `evidence-mihawk-jozu-553` (canon/secondary), `evidence-mihawk-luffy-560-561` (canon/secondary), `evidence-mihawk-zoro-49-51` (canon/축 미지정) |
| 166 | `crocodile` | `attack` | 76 | 2→2 | **보류** | 보조 | `evidence-crocodile-alabasta-mastery-178-209` (canon/secondary), `evidence-crocodile-marineford-interventions-561-578` (canon/context) |
| 167 | `crocodile` | `defense` | 72 | 2→2 | **보류** | 주기여 | `evidence-crocodile-water-weakness-199` (canon/primary), `evidence-crocodile-jozu-560` (canon/primary) |
| 168 | `crocodile` | `stamina` | 77 | 3→3 | **보류** | 보조 | `evidence-crocodile-alabasta-mastery-178-209` (canon/secondary), `evidence-crocodile-jozu-560` (canon/secondary), `evidence-crocodile-marineford-interventions-561-578` (canon/secondary) |
| 169 | `crocodile` | `speed` | 74 | 1→1 | **보류** | 보조 | `evidence-crocodile-marineford-interventions-561-578` (canon/secondary) |
| 170 | `crocodile` | `techniqueMastery` | 86 | 2→2 | **보류** | 주기여 | `evidence-crocodile-alabasta-mastery-178-209` (canon/primary), `evidence-crocodile-marineford-interventions-561-578` (canon/축 미지정) |
| 171 | `crocodile` | `combatIQ` | 86 | 3→3 | **보류** | 주기여 | `evidence-crocodile-alabasta-mastery-178-209` (canon/primary), `evidence-crocodile-water-weakness-199` (canon/context), `evidence-crocodile-marineford-interventions-561-578` (canon/primary) |
| 172 | `crocodile` | `versatility` | 82 | 2→2 | **보류** | 주기여 | `evidence-crocodile-alabasta-mastery-178-209` (canon/primary), `evidence-crocodile-marineford-interventions-561-578` (canon/primary) |

## 메타데이터 해석과 변경 금지

이 파일은 소스 코드의 평가 판단을 정리하는 **추적 자료**일 뿐, 동률 순위·전투력 우열이나 공격력 점수를 자동 산출하는 추가 모델이 아니다. 강한 Evidence와 높은 숫자는 동일하지 않다. 148개의 보류 상태를 E1/E2/E3으로 일괄 보정하지 않는다. 현행 7축 점수와 패기 Raw, 15개 매치업, 캐릭터 및 Battle 구조는 전부 유지한다.

후속 단계: **축 미지정 23건 → 상황 14건 → 보조 39건 → 주기여 72건** 순으로 평가자에게 독립 근거 직접성을 제시하면서 축별 판단을 좁게 수동 진행한다. 결과를 바꾸기 전 판정 기록·조건·축별 근거를 남긴다.
