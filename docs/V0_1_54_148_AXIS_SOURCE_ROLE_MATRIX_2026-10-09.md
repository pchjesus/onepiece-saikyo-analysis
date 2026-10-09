# v0.1.54 — 이전 미분류 148축 전체 before/after Evidence 축 역할 추적표

**기준 main:** `69c530ab38cb6cd319216bed5d012bcd10b2b14e` (v0.1.53). 작성 2026-10-09.

- v0.1.53의 미분류 **148축 전체**를 기록. 그중 **37축(E2 7/E3 30)** 개별 검수 후 분류, **111축**은 충분도 판단 보류.
- v0.1.53에는 평가축 기여 역할 없는 23축 + Context-only 14축이 있었다. 이 **37축은 전부 이번 검수 대상**이었다.
- 이미 E2/E3로 분류한 과거 24건, 다른 413축의 원점수·Haki·7축 Output에는 손대지 않음.
- 전체 Remaining 111축의 연결 관계는 Primary **72**, Secondary **39**, Context-only 0, role-less 0. 따라서 다음 단계는 **링크 유무나 역할 누락**이 아니라 실제 원작 장면의 독립성·상대·전투 조건, 1차/2차 출처 및 점수대 비교의 문제다.
- 개별 충분도 이유·원작 보조 출처·안전성: [37축 심화 검토](./V0_1_54_ROLELESS_CONTEXT_37_AXIS_ADJUDICATION_2026-10-09.md).
- 아래 최상위 역할은 연결 ID의 `statContributions` 중 `primary > secondary > context` 우선이며, 그 자체는 E1/E2를 의미하지 않는다.

| # | 캐릭터 | 축 | Final | v0.1.53 최고 역할 | v0.1.54 판정 | 현재 역할 | 연결 Evidence ID (해당 축 역할) |
|---:|---|---|---:|---|---|---|---|
| 1 | `vista` | `attack` | 80 | 주기여 | 보류 | primary | `evidence-vista-mihawk-561-562` (secondary); `evidence-vista-official-mihawk-profile` (secondary); `evidence-vista-armament-akainu-574` (primary) |
| 2 | `vista` | `defense` | 79 | 보조 | 보류 | secondary | `evidence-vista-mihawk-561-562` (secondary) |
| 3 | `vista` | `stamina` | 77 | 축 미지정 | E3 | none | `evidence-vista-mihawk-561-562` (축 미지정); `evidence-vista-armament-akainu-574` (축 미지정) |
| 4 | `vista` | `speed` | 80 | 보조 | 보류 | secondary | `evidence-vista-mihawk-561-562` (secondary) |
| 5 | `vista` | `techniqueMastery` | 86 | 주기여 | 보류 | primary | `evidence-vista-mihawk-561-562` (primary); `evidence-vista-official-mihawk-profile` (primary); `evidence-vista-armament-akainu-574` (secondary) |
| 6 | `vista` | `combatIQ` | 77 | 축 미지정 | E3 | none | `evidence-vista-mihawk-561-562` (축 미지정) |
| 7 | `vista` | `versatility` | 74 | 축 미지정 | E2 | secondary | `evidence-vista-mihawk-561-562` (secondary); `evidence-vista-armament-akainu-574` (축 미지정) |
| 8 | `jack` | `attack` | 79 | 주기여 | 보류 | primary | `evidence-jack-ashura-921` (primary); `evidence-jack-zou-809-810` (context) |
| 9 | `jack` | `defense` | 84 | 보조 | 보류 | secondary | `evidence-jack-zou-809-810` (secondary); `evidence-jack-ashura-921` (context); `evidence-jack-sulong-1026` (secondary) |
| 10 | `jack` | `stamina` | 88 | 주기여 | 보류 | primary | `evidence-jack-zou-809-810` (primary); `evidence-jack-sulong-1026` (primary); `evidence-jack-convoy-801` (context) |
| 11 | `jack` | `speed` | 75 | 축 미지정 | E3 | none | `evidence-jack-ashura-921` (축 미지정) |
| 12 | `jack` | `techniqueMastery` | 75 | 축 미지정 | E3 | none | `evidence-jack-ashura-921` (축 미지정); `evidence-jack-zou-809-810` (축 미지정) |
| 13 | `jack` | `combatIQ` | 72 | 축 미지정 | E2 | secondary | `evidence-jack-zou-809-810` (secondary); `evidence-jack-zunesha-824` (축 미지정) |
| 14 | `jack` | `versatility` | 74 | 축 미지정 | E3 | none | `evidence-jack-zou-809-810` (축 미지정); `evidence-jack-ashura-921` (축 미지정) |
| 15 | `smoothie` | `attack` | 76 | 주기여 | 보류 | primary | `evidence-smoothie-pursuit-894` (primary) |
| 16 | `smoothie` | `defense` | 75 | 상황 | E3 | context | `evidence-smoothie-poison-869` (context) |
| 17 | `smoothie` | `stamina` | 76 | 상황 | E3 | context | `evidence-smoothie-pursuit-894` (context); `evidence-smoothie-command-897` (축 미지정) |
| 18 | `smoothie` | `techniqueMastery` | 80 | 주기여 | 보류 | primary | `evidence-smoothie-poison-869` (primary); `evidence-smoothie-pursuit-894` (secondary) |
| 19 | `smoothie` | `combatIQ` | 77 | 주기여 | 보류 | primary | `evidence-smoothie-command-897` (primary) |
| 20 | `smoothie` | `versatility` | 78 | 주기여 | 보류 | primary | `evidence-smoothie-poison-869` (primary); `evidence-smoothie-pursuit-894` (primary); `evidence-smoothie-command-897` (secondary) |
| 21 | `cracker` | `attack` | 75 | 주기여 | 보류 | primary | `evidence-cracker-biscuit-837-838` (primary); `evidence-cracker-urouge-837` (context) |
| 22 | `cracker` | `defense` | 81 | 주기여 | 보류 | primary | `evidence-cracker-biscuit-837-838` (primary); `evidence-cracker-long-battle-842` (축 미지정) |
| 23 | `cracker` | `stamina` | 80 | 주기여 | 보류 | primary | `evidence-cracker-long-battle-842` (primary) |
| 24 | `cracker` | `speed` | 75 | 축 미지정 | E3 | none | `evidence-cracker-biscuit-837-838` (축 미지정) |
| 25 | `cracker` | `techniqueMastery` | 80 | 보조 | 보류 | secondary | `evidence-cracker-biscuit-837-838` (secondary); `evidence-cracker-long-battle-842` (secondary) |
| 26 | `cracker` | `combatIQ` | 75 | 축 미지정 | E2 | secondary | `evidence-cracker-long-battle-842` (secondary) |
| 27 | `cracker` | `versatility` | 77 | 보조 | 보류 | secondary | `evidence-cracker-biscuit-837-838` (secondary); `evidence-cracker-long-battle-842` (context) |
| 28 | `zoro` | `attack` | 85 | 주기여 | 보류 | primary | `evidence-zoro-ashura-scar-1010` (primary); `evidence-zoro-conquerors-1033-1035` (primary); `evidence-zoro-lucci-1110-1111` (secondary) |
| 29 | `zoro` | `defense` | 81 | 주기여 | 보류 | primary | `evidence-zoro-hakai-1009` (primary) |
| 30 | `zoro` | `stamina` | 87 | 주기여 | 보류 | primary | `evidence-zoro-nothing-happened-485` (primary); `evidence-zoro-hakai-1009` (secondary); `evidence-zoro-ashura-scar-1010` (secondary) |
| 31 | `zoro` | `speed` | 83 | 축 미지정 | E3 | none | `evidence-zoro-conquerors-1033-1035` (축 미지정) |
| 32 | `zoro` | `techniqueMastery` | 85 | 주기여 | 보류 | primary | `evidence-zoro-hakai-1009` (축 미지정); `evidence-zoro-ashura-scar-1010` (secondary); `evidence-zoro-conquerors-1033-1035` (primary) |
| 33 | `zoro` | `combatIQ` | 82 | 주기여 | 보류 | primary | `evidence-zoro-lunarian-read-1035` (primary) |
| 34 | `zoro` | `versatility` | 81 | 보조 | 보류 | secondary | `evidence-zoro-hakai-1009` (secondary); `evidence-zoro-conquerors-1033-1035` (축 미지정) |
| 35 | `sanji` | `attack` | 81 | 주기여 | 보류 | primary | `evidence-sanji-speed-ifrit-1034` (primary) |
| 36 | `sanji` | `defense` | 85 | 주기여 | 보류 | primary | `evidence-sanji-exoskeleton-1028` (primary); `evidence-sanji-speed-ifrit-1034` (축 미지정); `evidence-sanji-kizaru-laser-1107` (secondary) |
| 37 | `sanji` | `stamina` | 85 | 주기여 | 보류 | primary | `evidence-sanji-exoskeleton-1028` (primary); `evidence-sanji-speed-ifrit-1034` (축 미지정) |
| 38 | `sanji` | `speed` | 91 | 주기여 | 보류 | primary | `evidence-sanji-speed-ifrit-1034` (primary); `evidence-sanji-kizaru-laser-1107` (secondary); `evidence-sanji-nusjuro-1113` (secondary) |
| 39 | `sanji` | `techniqueMastery` | 84 | 보조 | 보류 | secondary | `evidence-sanji-speed-ifrit-1034` (secondary) |
| 40 | `sanji` | `combatIQ` | 81 | 축 미지정 | E3 | none | `evidence-sanji-kizaru-laser-1107` (축 미지정) |
| 41 | `sanji` | `versatility` | 82 | 보조 | 보류 | secondary | `evidence-sanji-exoskeleton-1028` (축 미지정); `evidence-sanji-speed-ifrit-1034` (secondary); `evidence-sanji-kizaru-laser-1107` (secondary); `evidence-sanji-nusjuro-1113` (secondary) |
| 42 | `jinbe` | `attack` | 76 | 주기여 | 보류 | primary | `evidence-jinbe-fishman-karate-629` (축 미지정); `evidence-jinbe-whos-who-1018` (primary) |
| 43 | `jinbe` | `defense` | 78 | 주기여 | 보류 | primary | `evidence-jinbe-big-mom-890` (primary); `evidence-jinbe-whos-who-1018` (primary) |
| 44 | `jinbe` | `stamina` | 80 | 주기여 | 보류 | primary | `evidence-jinbe-ace-five-days-552` (primary); `evidence-jinbe-akainu-575` (secondary); `evidence-jinbe-whos-who-1018` (축 미지정) |
| 45 | `jinbe` | `speed` | 77 | 축 미지정 | E3 | none | `evidence-jinbe-whos-who-1018` (축 미지정) |
| 46 | `jinbe` | `techniqueMastery` | 83 | 주기여 | 보류 | primary | `evidence-jinbe-fishman-karate-629` (primary); `evidence-jinbe-whos-who-1018` (secondary) |
| 47 | `jinbe` | `combatIQ` | 80 | 보조 | 보류 | secondary | `evidence-jinbe-big-mom-890` (secondary) |
| 48 | `jinbe` | `versatility` | 79 | 주기여 | 보류 | primary | `evidence-jinbe-fishman-karate-629` (secondary); `evidence-jinbe-big-mom-890` (primary) |
| 49 | `shanks` | `attack` | 94 | 주기여 | 보류 | primary | `evidence-shanks-whitebeard-haki-434` (secondary); `evidence-shanks-kid-divine-departure-1079` (primary) |
| 50 | `shanks` | `defense` | 91 | 주기여 | 보류 | primary | `evidence-shanks-sakazuki-block-579` (primary) |
| 51 | `shanks` | `speed` | 95 | 보조 | 보류 | secondary | `evidence-shanks-kid-divine-departure-1079` (secondary); `evidence-shanks-sakazuki-block-579` (secondary) |
| 52 | `shanks` | `techniqueMastery` | 92 | 주기여 | 보류 | primary | `evidence-shanks-whitebeard-haki-434` (context); `evidence-shanks-kid-divine-departure-1079` (primary) |
| 53 | `shanks` | `combatIQ` | 91 | 주기여 | 보류 | primary | `evidence-shanks-aramaki-haki-1055` (secondary); `evidence-shanks-kid-divine-departure-1079` (primary) |
| 54 | `shanks` | `versatility` | 88 | 주기여 | 보류 | primary | `evidence-shanks-aramaki-haki-1055` (primary) |
| 55 | `garp` | `attack` | 95 | 주기여 | 보류 | primary | `evidence-garp-roger-rocks-1165` (primary) |
| 56 | `garp` | `defense` | 95 | 주기여 | 보류 | primary | `evidence-garp-roger-rocks-1165` (primary) |
| 57 | `garp` | `stamina` | 99 | 주기여 | 보류 | primary | `evidence-garp-roger-rocks-1165` (primary); `evidence-garp-kuzan-haki-1087` (secondary) |
| 58 | `garp` | `speed` | 98 | 주기여 | 보류 | primary | `evidence-garp-roger-rocks-1165` (축 미지정); `evidence-garp-blue-hole-1081` (primary) |
| 59 | `garp` | `techniqueMastery` | 95 | 보조 | 보류 | secondary | `evidence-garp-roger-rocks-1165` (secondary); `evidence-garp-galaxy-impact-1080` (secondary); `evidence-garp-blue-hole-1081` (secondary) |
| 60 | `garp` | `combatIQ` | 97 | 주기여 | 보류 | primary | `evidence-garp-roger-rocks-1165` (축 미지정); `evidence-garp-rescue-command-1088` (primary) |
| 61 | `garp` | `versatility` | 91 | 보조 | 보류 | secondary | `evidence-garp-roger-rocks-1165` (축 미지정); `evidence-garp-galaxy-impact-1080` (축 미지정); `evidence-garp-galaxy-divide-1088` (secondary); `evidence-garp-rescue-command-1088` (secondary) |
| 62 | `kuzan` | `attack` | 93 | 보조 | 보류 | secondary | `evidence-kuzan-garp-haki-clash-1087` (secondary) |
| 63 | `kuzan` | `defense` | 93 | 주기여 | 보류 | primary | `evidence-kuzan-sakazuki-duel-650` (context); `evidence-kuzan-garp-iceball-1081` (context); `evidence-kuzan-blue-hole-return-1081-1087` (secondary); `evidence-kuzan-admiral-barrier-564` (primary) |
| 64 | `kuzan` | `stamina` | 97 | 주기여 | 보류 | primary | `evidence-kuzan-sakazuki-duel-650` (primary); `evidence-kuzan-blue-hole-return-1081-1087` (primary); `evidence-kuzan-garp-haki-clash-1087` (축 미지정) |
| 65 | `kuzan` | `speed` | 90 | 보조 | 보류 | secondary | `evidence-kuzan-garp-haki-clash-1087` (secondary); `evidence-kuzan-blue-hole-return-1081-1087` (context) |
| 66 | `kuzan` | `techniqueMastery` | 91 | 주기여 | 보류 | primary | `evidence-kuzan-garp-iceball-1081` (secondary); `evidence-kuzan-garp-haki-clash-1087` (primary) |
| 67 | `kuzan` | `combatIQ` | 91 | 축 미지정 | E3 | none | `evidence-kuzan-garp-iceball-1081` (축 미지정); `evidence-kuzan-garp-haki-clash-1087` (축 미지정) |
| 68 | `kuzan` | `versatility` | 92 | 축 미지정 | E2 | secondary | `evidence-kuzan-garp-iceball-1081` (secondary); `evidence-kuzan-garp-haki-clash-1087` (secondary) |
| 69 | `kizaru` | `attack` | 92 | 상황 | E2 | secondary | `evidence-kizaru-luffy-clones-1093` (축 미지정); `evidence-kizaru-vegapunk-1108` (secondary) |
| 70 | `kizaru` | `defense` | 88 | 주기여 | 보류 | primary | `evidence-kizaru-star-gun-1094` (primary); `evidence-kizaru-vegapunk-1108` (context); `evidence-kizaru-admiral-barrier-564` (primary) |
| 71 | `kizaru` | `stamina` | 91 | 보조 | 보류 | secondary | `evidence-kizaru-star-gun-1094` (context); `evidence-kizaru-vegapunk-1108` (secondary) |
| 72 | `kizaru` | `speed` | 99 | 주기여 | 보류 | primary | `evidence-kizaru-luffy-clones-1093` (primary) |
| 73 | `kizaru` | `techniqueMastery` | 93 | 주기여 | 보류 | primary | `evidence-kizaru-luffy-clones-1093` (primary) |
| 74 | `kizaru` | `combatIQ` | 90 | 보조 | 보류 | secondary | `evidence-kizaru-luffy-clones-1093` (secondary) |
| 75 | `kizaru` | `versatility` | 91 | 주기여 | 보류 | primary | `evidence-kizaru-luffy-clones-1093` (primary) |
| 76 | `fujitora` | `attack` | 91 | 보조 | 보류 | secondary | `evidence-fujitora-meteor-713` (secondary) |
| 77 | `fujitora` | `techniqueMastery` | 92 | 주기여 | 보류 | primary | `evidence-fujitora-meteor-713` (primary); `evidence-fujitora-luffy-observation-799` (secondary) |
| 78 | `fujitora` | `combatIQ` | 85 | 보조 | 보류 | secondary | `evidence-fujitora-luffy-observation-799` (secondary) |
| 79 | `fujitora` | `versatility` | 94 | 보조 | 보류 | secondary | `evidence-fujitora-meteor-713` (secondary); `evidence-fujitora-luffy-observation-799` (secondary) |
| 80 | `ryokugyu` | `defense` | 89 | 상황 | E3 | context | `evidence-aramaki-shanks-haki-1055` (context) |
| 81 | `ryokugyu` | `combatIQ` | 82 | 상황 | E3 | context | `evidence-aramaki-shanks-haki-1055` (context) |
| 82 | `teach` | `attack` | 95 | 주기여 | 보류 | primary | `evidence-teach-ace-440-441` (primary); `evidence-teach-gura-577` (primary); `evidence-teach-law-1063-1064` (primary); `evidence-teach-kurouzu-441` (context) |
| 83 | `teach` | `defense` | 89 | 보조 | 보류 | secondary | `evidence-teach-ace-440-441` (secondary); `evidence-teach-whitebeard-576` (context); `evidence-teach-law-1063-1064` (축 미지정); `evidence-teach-hancock-nullification-1059` (context) |
| 84 | `teach` | `stamina` | 95 | 주기여 | 보류 | primary | `evidence-teach-whitebeard-576` (primary); `evidence-teach-law-1063-1064` (primary); `evidence-teach-heart-pirates-1081` (secondary) |
| 85 | `teach` | `speed` | 82 | 축 미지정 | E3 | none | `evidence-teach-ace-440-441` (축 미지정); `evidence-teach-law-1063-1064` (축 미지정) |
| 86 | `teach` | `techniqueMastery` | 93 | 주기여 | 보류 | primary | `evidence-teach-ace-440-441` (primary); `evidence-teach-gura-577` (secondary); `evidence-teach-law-1063-1064` (축 미지정); `evidence-teach-kurouzu-441` (primary); `evidence-teach-hancock-nullification-1059` (primary) |
| 87 | `teach` | `combatIQ` | 87 | 주기여 | 보류 | primary | `evidence-teach-ace-440-441` (축 미지정); `evidence-teach-law-1063-1064` (context); `evidence-teach-kurouzu-441` (secondary); `evidence-teach-hancock-nullification-1059` (primary) |
| 88 | `teach` | `versatility` | 93 | 주기여 | 보류 | primary | `evidence-teach-ace-440-441` (primary); `evidence-teach-gura-577` (primary); `evidence-teach-law-1063-1064` (primary); `evidence-teach-hancock-nullification-1059` (축 미지정) |
| 89 | `shiryu` | `attack` | 78 | 상황 | E2 | secondary | `evidence-shiryu-garp-1087` (secondary) |
| 90 | `shiryu` | `defense` | 74 | 상황 | E3 | context | `evidence-shiryu-garp-counter-1087` (context) |
| 91 | `shiryu` | `speed` | 79 | 축 미지정 | E3 | none | `evidence-shiryu-garp-1087` (축 미지정) |
| 92 | `shiryu` | `techniqueMastery` | 77 | 보조 | 보류 | secondary | `evidence-shiryu-garp-1087` (secondary) |
| 93 | `shiryu` | `combatIQ` | 78 | 주기여 | 보류 | primary | `evidence-shiryu-garp-1087` (primary) |
| 94 | `shiryu` | `versatility` | 78 | 주기여 | 보류 | primary | `evidence-shiryu-garp-1087` (primary) |
| 95 | `van-augur` | `attack` | 72 | 상황 | E3 | context | `evidence-augur-jean-bart-1064` (context) |
| 96 | `van-augur` | `defense` | 67 | 축 미지정 | E3 | none | `evidence-augur-warp-1063-1064` (축 미지정) |
| 97 | `van-augur` | `speed` | 75 | 상황 | E2 | secondary | `evidence-augur-warp-1063-1064` (secondary) |
| 98 | `van-augur` | `techniqueMastery` | 80 | 주기여 | 보류 | primary | `evidence-augur-warp-1063-1064` (primary); `evidence-augur-jean-bart-1064` (축 미지정) |
| 99 | `van-augur` | `combatIQ` | 78 | 주기여 | 보류 | primary | `evidence-augur-warp-1063-1064` (primary) |
| 100 | `van-augur` | `versatility` | 82 | 주기여 | 보류 | primary | `evidence-augur-warp-1063-1064` (primary) |
| 101 | `burgess` | `attack` | 74 | 보조 | 보류 | secondary | `evidence-burgess-mountain-1063` (secondary); `evidence-burgess-sabo-737-792` (secondary) |
| 102 | `burgess` | `defense` | 74 | 상황 | E3 | context | `evidence-burgess-sabo-737-792` (context) |
| 103 | `burgess` | `stamina` | 79 | 보조 | 보류 | secondary | `evidence-burgess-sabo-737-792` (secondary) |
| 104 | `burgess` | `speed` | 74 | 축 미지정 | E3 | none | `evidence-burgess-sabo-737-792` (축 미지정) |
| 105 | `burgess` | `techniqueMastery` | 72 | 축 미지정 | E3 | none | `evidence-burgess-sabo-737-792` (축 미지정); `evidence-burgess-mountain-1063` (축 미지정) |
| 106 | `burgess` | `combatIQ` | 70 | 축 미지정 | E3 | none | `evidence-burgess-sabo-737-792` (축 미지정) |
| 107 | `burgess` | `versatility` | 74 | 보조 | 보류 | secondary | `evidence-burgess-mountain-1063` (secondary) |
| 108 | `pizarro` | `attack` | 72 | 보조 | 보류 | secondary | `evidence-pizarro-island-1087-1088` (secondary) |
| 109 | `pizarro` | `defense` | 74 | 상황 | E3 | context | `evidence-pizarro-damage-link-1088` (context) |
| 110 | `pizarro` | `stamina` | 74 | 축 미지정 | E3 | none | `evidence-pizarro-island-1087-1088` (축 미지정) |
| 111 | `pizarro` | `speed` | 64 | 축 미지정 | E3 | none | `evidence-pizarro-island-1087-1088` (축 미지정) |
| 112 | `pizarro` | `techniqueMastery` | 74 | 보조 | 보류 | secondary | `evidence-pizarro-island-1087-1088` (secondary) |
| 113 | `pizarro` | `combatIQ` | 70 | 상황 | E3 | context | `evidence-pizarro-damage-link-1088` (context) |
| 114 | `pizarro` | `versatility` | 74 | 주기여 | 보류 | primary | `evidence-pizarro-island-1087-1088` (primary) |
| 115 | `law` | `attack` | 86 | 주기여 | 보류 | primary | `evidence-law-big-mom-1039` (primary); `evidence-law-puncture-wille-1039` (primary); `evidence-law-teach-1064` (primary) |
| 116 | `law` | `defense` | 83 | 보조 | 보류 | secondary | `evidence-law-big-mom-1039` (secondary); `evidence-law-teach-1064` (축 미지정) |
| 117 | `law` | `stamina` | 85 | 주기여 | 보류 | primary | `evidence-law-big-mom-1039` (primary); `evidence-law-puncture-wille-1039` (primary) |
| 118 | `law` | `speed` | 82 | 보조 | 보류 | secondary | `evidence-law-teach-1064` (secondary) |
| 119 | `law` | `techniqueMastery` | 90 | 주기여 | 보류 | primary | `evidence-law-doflamingo-gamma-knife-781` (primary); `evidence-law-big-mom-1039` (secondary); `evidence-law-haki-nullification-1063` (secondary) |
| 120 | `law` | `combatIQ` | 88 | 주기여 | 보류 | primary | `evidence-law-doflamingo-gamma-knife-781` (primary); `evidence-law-haki-nullification-1063` (primary) |
| 121 | `law` | `versatility` | 91 | 보조 | 보류 | secondary | `evidence-law-doflamingo-gamma-knife-781` (secondary); `evidence-law-big-mom-1039` (축 미지정); `evidence-law-haki-nullification-1063` (secondary); `evidence-law-teach-1064` (secondary) |
| 122 | `doflamingo` | `attack` | 76 | 주기여 | 보류 | primary | `evidence-doflamingo-law-arm-769` (primary); `evidence-doflamingo-gear4-784-785` (context) |
| 123 | `doflamingo` | `defense` | 74 | 주기여 | 보류 | primary | `evidence-doflamingo-gear4-784-785` (primary); `evidence-doflamingo-organ-repair-781` (context) |
| 124 | `doflamingo` | `stamina` | 81 | 주기여 | 보류 | primary | `evidence-doflamingo-organ-repair-781` (primary); `evidence-doflamingo-gear4-784-785` (secondary) |
| 125 | `doflamingo` | `speed` | 75 | 주기여 | 보류 | primary | `evidence-doflamingo-gear4-784-785` (primary) |
| 126 | `doflamingo` | `techniqueMastery` | 87 | 주기여 | 보류 | primary | `evidence-doflamingo-law-arm-769` (primary); `evidence-doflamingo-organ-repair-781` (primary); `evidence-doflamingo-awakening-785` (primary) |
| 127 | `doflamingo` | `combatIQ` | 81 | 보조 | 보류 | secondary | `evidence-doflamingo-organ-repair-781` (secondary); `evidence-doflamingo-awakening-785` (secondary) |
| 128 | `doflamingo` | `versatility` | 83 | 주기여 | 보류 | primary | `evidence-doflamingo-law-arm-769` (축 미지정); `evidence-doflamingo-awakening-785` (secondary); `evidence-doflamingo-birdcage-781-790` (primary) |
| 129 | `hancock` | `attack` | 79 | 주기여 | 보류 | primary | `evidence-hancock-marineford-559` (primary); `evidence-hancock-amazon-lily-1059` (primary) |
| 130 | `hancock` | `defense` | 76 | 상황 | E3 | context | `evidence-hancock-amazon-lily-1059` (context) |
| 131 | `hancock` | `stamina` | 77 | 축 미지정 | E3 | none | `evidence-hancock-marineford-559` (축 미지정); `evidence-hancock-amazon-lily-1059` (축 미지정) |
| 132 | `hancock` | `speed` | 80 | 보조 | 보류 | secondary | `evidence-hancock-marineford-559` (secondary) |
| 133 | `hancock` | `techniqueMastery` | 82 | 보조 | 보류 | secondary | `evidence-hancock-marineford-559` (secondary); `evidence-hancock-amazon-lily-1059` (secondary) |
| 134 | `hancock` | `combatIQ` | 75 | 보조 | 보류 | secondary | `evidence-hancock-amazon-lily-1059` (secondary) |
| 135 | `hancock` | `versatility` | 82 | 보조 | 보류 | secondary | `evidence-hancock-marineford-559` (축 미지정); `evidence-hancock-amazon-lily-1059` (secondary) |
| 136 | `mihawk` | `attack` | 96 | 주기여 | 보류 | primary | `evidence-mihawk-jozu-553` (primary); `evidence-mihawk-luffy-560-561` (primary); `evidence-mihawk-shanks-swordskill-1058` (secondary) |
| 137 | `mihawk` | `stamina` | 91 | 상황 | E3 | context | `evidence-mihawk-vista-561-562` (context); `evidence-mihawk-shanks-rivalry-profile` (축 미지정) |
| 138 | `mihawk` | `speed` | 94 | 주기여 | 보류 | primary | `evidence-mihawk-luffy-560-561` (primary); `evidence-mihawk-vista-561-562` (secondary); `evidence-mihawk-shanks-rivalry-profile` (context) |
| 139 | `mihawk` | `techniqueMastery` | 99 | 주기여 | 보류 | primary | `evidence-mihawk-world-strongest-profile` (primary); `evidence-mihawk-shanks-swordskill-1058` (primary); `evidence-mihawk-zoro-49-51` (primary); `evidence-mihawk-vista-561-562` (primary) |
| 140 | `mihawk` | `combatIQ` | 92 | 보조 | 보류 | secondary | `evidence-mihawk-zoro-49-51` (secondary); `evidence-mihawk-luffy-560-561` (secondary) |
| 141 | `mihawk` | `versatility` | 84 | 보조 | 보류 | secondary | `evidence-mihawk-jozu-553` (secondary); `evidence-mihawk-luffy-560-561` (secondary); `evidence-mihawk-zoro-49-51` (축 미지정) |
| 142 | `crocodile` | `attack` | 76 | 보조 | 보류 | secondary | `evidence-crocodile-alabasta-mastery-178-209` (secondary); `evidence-crocodile-marineford-interventions-561-578` (context) |
| 143 | `crocodile` | `defense` | 72 | 주기여 | 보류 | primary | `evidence-crocodile-water-weakness-199` (primary); `evidence-crocodile-jozu-560` (primary) |
| 144 | `crocodile` | `stamina` | 77 | 보조 | 보류 | secondary | `evidence-crocodile-alabasta-mastery-178-209` (secondary); `evidence-crocodile-jozu-560` (secondary); `evidence-crocodile-marineford-interventions-561-578` (secondary) |
| 145 | `crocodile` | `speed` | 74 | 보조 | 보류 | secondary | `evidence-crocodile-marineford-interventions-561-578` (secondary) |
| 146 | `crocodile` | `techniqueMastery` | 86 | 주기여 | 보류 | primary | `evidence-crocodile-alabasta-mastery-178-209` (primary); `evidence-crocodile-marineford-interventions-561-578` (축 미지정) |
| 147 | `crocodile` | `combatIQ` | 86 | 주기여 | 보류 | primary | `evidence-crocodile-alabasta-mastery-178-209` (primary); `evidence-crocodile-water-weakness-199` (context); `evidence-crocodile-marineford-interventions-561-578` (primary) |
| 148 | `crocodile` | `versatility` | 82 | 주기여 | 보류 | primary | `evidence-crocodile-alabasta-mastery-178-209` (primary); `evidence-crocodile-marineford-interventions-561-578` (primary) |

### 해석

높은 Final 값과 출처 링크 수는 곧 근거 충분도나 정답이 아니다. Context-only 또는 역할 미지정 축을 E3로 분류해도 기존 점수는 잠정 유지한다. 원작에서 직접 확인하지 못한 최고치 능력·Haki·정확한 시간·패널 조건을 새 근거로 창작하지 않는다. 다음 111축도 개별 비교 전까지 일괄 E2/E1로 승급하지 않는다.
