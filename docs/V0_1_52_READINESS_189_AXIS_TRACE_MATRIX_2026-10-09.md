# v0.1.52 — v0.1.51 미분류 189축 Evidence ID 전수 추적표

**원본 Snapshot:** main@be897e34c8bedc08777a9937a77470d1ca1cd3db (v0.1.51). 이 목록은 **그때 readiness가 미입력인 정확한 189축 전체**이다. v0.1.52 뒤에도 보류된 172축과 신규 분류한 17축을 한눈에 구별한다.

- 전체 행수: 189; 이번 E2/E3 검토 처리: 17; 여전히 미분류: 172; 이전에 Evidence ID가 0개인 축: 10; Evidence ID ≥1개: 179.
- **주의:** 링크 수는 해당 `EvaluationItem.evidenceIds`의 **개수**만 의미한다. 장면 직접성·독립성·기여 역할(primary/secondary/context)의 등급이 아니며 링크가 존재한다고 E2/E1이 되는 것이 아니다. 문서 내부의 Evidence IDs와 인용된 원작/공식 소개의 장면·조건을 직접 조사해야 readiness를 확정할 수 있다.
- `E1`은 반복 직접 Evidence가 충분한 경우, `E2`는 평가 가능하지만 간접성이나 표본 한계가 남는 경우, `E3`는 직접 Evidence가 부족한 강한 잠정/보류 상태를 의미. **보류를 E3으로 자동 변경하지 않는다.**
- 수치 열은 59인의 **Final Stat**(Haki Raw 가중 결과 포함)을 참조하며 v0.1.47 59×7 검증표와 교차한다. 이번 변경은 어떤 Final도 바꾸지 않는다.
- 자세한 판단 근거, 캐릭터간 비교, 조건부 순위 민감도 및 공식 출처: [v0.1.52 main report](./V0_1_52_READINESS_CALIBRATION_AND_THREE_CHARACTER_ANCHORS_2026-10-09.md).

| 순번 | 캐릭터 | 축 | Final | 연결 Evidence 수 | v0.1.52 판정 | 현재 Evidence ID |
|---:|---|---|---:|---:|---|---|
| 1 | `marco` | `attack` | 77 | 2 | 미분류 (보류) | `evidence-marco-kizaru-554`, `evidence-marco-armament-akainu-574` |
| 2 | `marco` | `defense` | 87 | 4 | 미분류 (보류) | `evidence-marco-kizaru-554`, `evidence-marco-defense-akainu-575`, `evidence-marco-defense-king-1022`, `evidence-marco-defense-kaido-1043` |
| 3 | `marco` | `stamina` | 87 | 3 | 미분류 (보류) | `evidence-marco-regeneration-1006`, `evidence-marco-defense-king-1022`, `evidence-marco-defense-kaido-1043` |
| 4 | `marco` | `speed` | 82 | 2 | 미분류 (보류) | `evidence-marco-kizaru-554`, `evidence-marco-aokiji-566` |
| 5 | `marco` | `techniqueMastery` | 84 | 3 | 미분류 (보류) | `evidence-marco-ice-oni-998`, `evidence-marco-regeneration-1006`, `evidence-marco-defense-king-1022` |
| 6 | `marco` | `combatIQ` | 80 | 4 | 미분류 (보류) | `evidence-marco-aokiji-566`, `evidence-marco-big-mom-995`, `evidence-marco-seastone-568-569`, `evidence-marco-payback-war-820-909` |
| 7 | `marco` | `versatility` | 87 | 5 | 미분류 (보류) | `evidence-marco-big-mom-995`, `evidence-marco-ice-oni-998`, `evidence-marco-regeneration-1006`, `evidence-marco-defense-akainu-575`, `evidence-marco-defense-kaido-1043` |
| 8 | `jozu` | `attack` | 78 | 2 | E2 | `evidence-jozu-crocodile-560`, `evidence-jozu-aokiji-567` |
| 9 | `jozu` | `defense` | 84 | 2 | E2 | `evidence-jozu-mihawk-553`, `evidence-jozu-frozen-568` |
| 10 | `jozu` | `stamina` | 78 | 2 | E3 | `evidence-jozu-aokiji-567`, `evidence-jozu-frozen-568` |
| 11 | `jozu` | `speed` | 79 | 2 | E2 | `evidence-jozu-crocodile-560`, `evidence-jozu-aokiji-567` |
| 12 | `jozu` | `techniqueMastery` | 74 | 2 | E3 | `evidence-jozu-mihawk-553`, `evidence-jozu-crocodile-560` |
| 13 | `jozu` | `combatIQ` | 75 | 2 | E3 | `evidence-jozu-aokiji-567`, `evidence-jozu-frozen-568` |
| 14 | `jozu` | `versatility` | 74 | 3 | E3 | `evidence-jozu-mihawk-553`, `evidence-jozu-crocodile-560`, `evidence-jozu-aokiji-567` |
| 15 | `vista` | `attack` | 82 | 3 | 미분류 (보류) | `evidence-vista-mihawk-561-562`, `evidence-vista-official-mihawk-profile`, `evidence-vista-armament-akainu-574` |
| 16 | `vista` | `defense` | 79 | 1 | 미분류 (보류) | `evidence-vista-mihawk-561-562` |
| 17 | `vista` | `stamina` | 77 | 2 | 미분류 (보류) | `evidence-vista-mihawk-561-562`, `evidence-vista-armament-akainu-574` |
| 18 | `vista` | `speed` | 80 | 1 | 미분류 (보류) | `evidence-vista-mihawk-561-562` |
| 19 | `vista` | `techniqueMastery` | 87 | 3 | 미분류 (보류) | `evidence-vista-mihawk-561-562`, `evidence-vista-official-mihawk-profile`, `evidence-vista-armament-akainu-574` |
| 20 | `vista` | `combatIQ` | 77 | 1 | 미분류 (보류) | `evidence-vista-mihawk-561-562` |
| 21 | `vista` | `versatility` | 74 | 2 | 미분류 (보류) | `evidence-vista-mihawk-561-562`, `evidence-vista-armament-akainu-574` |
| 22 | `king` | `attack` | 85 | 3 | 미분류 (보류) | `evidence-king-marco-1006`, `evidence-king-zoro-1035`, `evidence-king-armament-1032` |
| 23 | `king` | `defense` | 88 | 2 | 미분류 (보류) | `evidence-king-lunarian-1032`, `evidence-king-zoro-1035` |
| 24 | `king` | `stamina` | 85 | 2 | 미분류 (보류) | `evidence-king-marco-1006`, `evidence-king-zoro-1035` |
| 25 | `king` | `speed` | 83 | 1 | 미분류 (보류) | `evidence-king-zoro-1035` |
| 26 | `king` | `techniqueMastery` | 81 | 2 | 미분류 (보류) | `evidence-king-zoro-1035`, `evidence-king-armament-1032` |
| 27 | `king` | `combatIQ` | 77 | 1 | 미분류 (보류) | `evidence-king-zoro-1035` |
| 28 | `king` | `versatility` | 82 | 2 | 미분류 (보류) | `evidence-king-zoro-1035`, `evidence-king-waterfall-930` |
| 29 | `queen` | `attack` | 80 | 3 | E2 | `evidence-queen-ancient-zoan-1028`, `evidence-queen-cybernetics-1028-1034`, `evidence-queen-big-mom-947` |
| 30 | `queen` | `defense` | 81 | 2 | E2 | `evidence-queen-marco-1006`, `evidence-queen-ancient-zoan-1028` |
| 31 | `queen` | `stamina` | 81 | 2 | E2 | `evidence-queen-marco-1006`, `evidence-queen-cybernetics-1028-1034` |
| 32 | `queen` | `speed` | 75 | 1 | E3 | `evidence-queen-cybernetics-1028-1034` |
| 33 | `queen` | `techniqueMastery` | 79 | 2 | E2 | `evidence-queen-ancient-zoan-1028`, `evidence-queen-cybernetics-1028-1034` |
| 34 | `queen` | `combatIQ` | 74 | 1 | E3 | `evidence-queen-cybernetics-1028-1034` |
| 35 | `queen` | `versatility` | 80 | 2 | E2 | `evidence-queen-ancient-zoan-1028`, `evidence-queen-cybernetics-1028-1034` |
| 36 | `jack` | `attack` | 79 | 2 | 미분류 (보류) | `evidence-jack-ashura-921`, `evidence-jack-zou-809-810` |
| 37 | `jack` | `defense` | 84 | 3 | 미분류 (보류) | `evidence-jack-zou-809-810`, `evidence-jack-ashura-921`, `evidence-jack-sulong-1026` |
| 38 | `jack` | `stamina` | 88 | 3 | 미분류 (보류) | `evidence-jack-zou-809-810`, `evidence-jack-sulong-1026`, `evidence-jack-convoy-801` |
| 39 | `jack` | `speed` | 75 | 1 | 미분류 (보류) | `evidence-jack-ashura-921` |
| 40 | `jack` | `techniqueMastery` | 75 | 2 | 미분류 (보류) | `evidence-jack-ashura-921`, `evidence-jack-zou-809-810` |
| 41 | `jack` | `combatIQ` | 72 | 2 | 미분류 (보류) | `evidence-jack-zou-809-810`, `evidence-jack-zunesha-824` |
| 42 | `jack` | `versatility` | 74 | 2 | 미분류 (보류) | `evidence-jack-zou-809-810`, `evidence-jack-ashura-921` |
| 43 | `katakuri` | `stamina` | 84 | 1 | E2 | `evidence-katakuri-endurance-894` |
| 44 | `katakuri` | `speed` | 84 | 2 | E2 | `evidence-katakuri-future-sight-881-884`, `evidence-katakuri-snakeman-895` |
| 45 | `katakuri` | `versatility` | 84 | 3 | E2 | `evidence-katakuri-awakening-882`, `evidence-katakuri-conquerors-893`, `evidence-katakuri-gear4-counter-883-885` |
| 46 | `smoothie` | `attack` | 76 | 1 | 미분류 (보류) | `evidence-smoothie-pursuit-894` |
| 47 | `smoothie` | `defense` | 75 | 1 | 미분류 (보류) | `evidence-smoothie-poison-869` |
| 48 | `smoothie` | `stamina` | 76 | 2 | 미분류 (보류) | `evidence-smoothie-pursuit-894`, `evidence-smoothie-command-897` |
| 49 | `smoothie` | `speed` | 74 | 0 | 미분류 (보류) | 미연결 |
| 50 | `smoothie` | `techniqueMastery` | 80 | 2 | 미분류 (보류) | `evidence-smoothie-poison-869`, `evidence-smoothie-pursuit-894` |
| 51 | `smoothie` | `combatIQ` | 77 | 1 | 미분류 (보류) | `evidence-smoothie-command-897` |
| 52 | `smoothie` | `versatility` | 78 | 3 | 미분류 (보류) | `evidence-smoothie-poison-869`, `evidence-smoothie-pursuit-894`, `evidence-smoothie-command-897` |
| 53 | `cracker` | `attack` | 77 | 2 | 미분류 (보류) | `evidence-cracker-biscuit-837-838`, `evidence-cracker-urouge-837` |
| 54 | `cracker` | `defense` | 81 | 2 | 미분류 (보류) | `evidence-cracker-biscuit-837-838`, `evidence-cracker-long-battle-842` |
| 55 | `cracker` | `stamina` | 80 | 1 | 미분류 (보류) | `evidence-cracker-long-battle-842` |
| 56 | `cracker` | `speed` | 75 | 1 | 미분류 (보류) | `evidence-cracker-biscuit-837-838` |
| 57 | `cracker` | `techniqueMastery` | 80 | 2 | 미분류 (보류) | `evidence-cracker-biscuit-837-838`, `evidence-cracker-long-battle-842` |
| 58 | `cracker` | `combatIQ` | 75 | 1 | 미분류 (보류) | `evidence-cracker-long-battle-842` |
| 59 | `cracker` | `versatility` | 77 | 2 | 미분류 (보류) | `evidence-cracker-biscuit-837-838`, `evidence-cracker-long-battle-842` |
| 60 | `zoro` | `attack` | 90 | 3 | 미분류 (보류) | `evidence-zoro-ashura-scar-1010`, `evidence-zoro-conquerors-1033-1035`, `evidence-zoro-lucci-1110-1111` |
| 61 | `zoro` | `defense` | 83 | 1 | 미분류 (보류) | `evidence-zoro-hakai-1009` |
| 62 | `zoro` | `stamina` | 87 | 3 | 미분류 (보류) | `evidence-zoro-nothing-happened-485`, `evidence-zoro-hakai-1009`, `evidence-zoro-ashura-scar-1010` |
| 63 | `zoro` | `speed` | 83 | 1 | 미분류 (보류) | `evidence-zoro-conquerors-1033-1035` |
| 64 | `zoro` | `techniqueMastery` | 87 | 3 | 미분류 (보류) | `evidence-zoro-hakai-1009`, `evidence-zoro-ashura-scar-1010`, `evidence-zoro-conquerors-1033-1035` |
| 65 | `zoro` | `combatIQ` | 82 | 1 | 미분류 (보류) | `evidence-zoro-lunarian-read-1035` |
| 66 | `zoro` | `versatility` | 81 | 2 | 미분류 (보류) | `evidence-zoro-hakai-1009`, `evidence-zoro-conquerors-1033-1035` |
| 67 | `sanji` | `attack` | 83 | 1 | 미분류 (보류) | `evidence-sanji-speed-ifrit-1034` |
| 68 | `sanji` | `defense` | 85 | 3 | 미분류 (보류) | `evidence-sanji-exoskeleton-1028`, `evidence-sanji-speed-ifrit-1034`, `evidence-sanji-kizaru-laser-1107` |
| 69 | `sanji` | `stamina` | 85 | 2 | 미분류 (보류) | `evidence-sanji-exoskeleton-1028`, `evidence-sanji-speed-ifrit-1034` |
| 70 | `sanji` | `speed` | 91 | 3 | 미분류 (보류) | `evidence-sanji-speed-ifrit-1034`, `evidence-sanji-kizaru-laser-1107`, `evidence-sanji-nusjuro-1113` |
| 71 | `sanji` | `techniqueMastery` | 84 | 1 | 미분류 (보류) | `evidence-sanji-speed-ifrit-1034` |
| 72 | `sanji` | `combatIQ` | 81 | 1 | 미분류 (보류) | `evidence-sanji-kizaru-laser-1107` |
| 73 | `sanji` | `versatility` | 82 | 4 | 미분류 (보류) | `evidence-sanji-exoskeleton-1028`, `evidence-sanji-speed-ifrit-1034`, `evidence-sanji-kizaru-laser-1107`, `evidence-sanji-nusjuro-1113` |
| 74 | `jinbe` | `attack` | 78 | 2 | 미분류 (보류) | `evidence-jinbe-fishman-karate-629`, `evidence-jinbe-whos-who-1018` |
| 75 | `jinbe` | `defense` | 80 | 2 | 미분류 (보류) | `evidence-jinbe-big-mom-890`, `evidence-jinbe-whos-who-1018` |
| 76 | `jinbe` | `stamina` | 80 | 3 | 미분류 (보류) | `evidence-jinbe-ace-five-days-552`, `evidence-jinbe-akainu-575`, `evidence-jinbe-whos-who-1018` |
| 77 | `jinbe` | `speed` | 77 | 1 | 미분류 (보류) | `evidence-jinbe-whos-who-1018` |
| 78 | `jinbe` | `techniqueMastery` | 83 | 2 | 미분류 (보류) | `evidence-jinbe-fishman-karate-629`, `evidence-jinbe-whos-who-1018` |
| 79 | `jinbe` | `combatIQ` | 80 | 1 | 미분류 (보류) | `evidence-jinbe-big-mom-890` |
| 80 | `jinbe` | `versatility` | 79 | 2 | 미분류 (보류) | `evidence-jinbe-fishman-karate-629`, `evidence-jinbe-big-mom-890` |
| 81 | `shanks` | `attack` | 97 | 2 | 미분류 (보류) | `evidence-shanks-whitebeard-haki-434`, `evidence-shanks-kid-divine-departure-1079` |
| 82 | `shanks` | `defense` | 91 | 1 | 미분류 (보류) | `evidence-shanks-sakazuki-block-579` |
| 83 | `shanks` | `stamina` | 88 | 0 | 미분류 (보류) | 미연결 |
| 84 | `shanks` | `speed` | 95 | 2 | 미분류 (보류) | `evidence-shanks-kid-divine-departure-1079`, `evidence-shanks-sakazuki-block-579` |
| 85 | `shanks` | `techniqueMastery` | 96 | 2 | 미분류 (보류) | `evidence-shanks-whitebeard-haki-434`, `evidence-shanks-kid-divine-departure-1079` |
| 86 | `shanks` | `combatIQ` | 93 | 2 | 미분류 (보류) | `evidence-shanks-aramaki-haki-1055`, `evidence-shanks-kid-divine-departure-1079` |
| 87 | `shanks` | `versatility` | 88 | 1 | 미분류 (보류) | `evidence-shanks-aramaki-haki-1055` |
| 88 | `garp` | `attack` | 99 | 1 | 미분류 (보류) | `evidence-garp-roger-rocks-1165` |
| 89 | `garp` | `defense` | 99 | 1 | 미분류 (보류) | `evidence-garp-roger-rocks-1165` |
| 90 | `garp` | `stamina` | 99 | 2 | 미분류 (보류) | `evidence-garp-roger-rocks-1165`, `evidence-garp-kuzan-haki-1087` |
| 91 | `garp` | `speed` | 98 | 2 | 미분류 (보류) | `evidence-garp-roger-rocks-1165`, `evidence-garp-blue-hole-1081` |
| 92 | `garp` | `techniqueMastery` | 99 | 3 | 미분류 (보류) | `evidence-garp-roger-rocks-1165`, `evidence-garp-galaxy-impact-1080`, `evidence-garp-blue-hole-1081` |
| 93 | `garp` | `combatIQ` | 97 | 2 | 미분류 (보류) | `evidence-garp-roger-rocks-1165`, `evidence-garp-rescue-command-1088` |
| 94 | `garp` | `versatility` | 91 | 4 | 미분류 (보류) | `evidence-garp-roger-rocks-1165`, `evidence-garp-galaxy-impact-1080`, `evidence-garp-galaxy-divide-1088`, `evidence-garp-rescue-command-1088` |
| 95 | `kuzan` | `attack` | 93 | 1 | 미분류 (보류) | `evidence-kuzan-garp-haki-clash-1087` |
| 96 | `kuzan` | `defense` | 93 | 4 | 미분류 (보류) | `evidence-kuzan-sakazuki-duel-650`, `evidence-kuzan-garp-iceball-1081`, `evidence-kuzan-blue-hole-return-1081-1087`, `evidence-kuzan-admiral-barrier-564` |
| 97 | `kuzan` | `stamina` | 97 | 3 | 미분류 (보류) | `evidence-kuzan-sakazuki-duel-650`, `evidence-kuzan-blue-hole-return-1081-1087`, `evidence-kuzan-garp-haki-clash-1087` |
| 98 | `kuzan` | `speed` | 90 | 2 | 미분류 (보류) | `evidence-kuzan-garp-haki-clash-1087`, `evidence-kuzan-blue-hole-return-1081-1087` |
| 99 | `kuzan` | `techniqueMastery` | 93 | 2 | 미분류 (보류) | `evidence-kuzan-garp-iceball-1081`, `evidence-kuzan-garp-haki-clash-1087` |
| 100 | `kuzan` | `combatIQ` | 91 | 2 | 미분류 (보류) | `evidence-kuzan-garp-iceball-1081`, `evidence-kuzan-garp-haki-clash-1087` |
| 101 | `kuzan` | `versatility` | 92 | 2 | 미분류 (보류) | `evidence-kuzan-garp-iceball-1081`, `evidence-kuzan-garp-haki-clash-1087` |
| 102 | `kizaru` | `attack` | 92 | 2 | 미분류 (보류) | `evidence-kizaru-luffy-clones-1093`, `evidence-kizaru-vegapunk-1108` |
| 103 | `kizaru` | `defense` | 89 | 3 | 미분류 (보류) | `evidence-kizaru-star-gun-1094`, `evidence-kizaru-vegapunk-1108`, `evidence-kizaru-admiral-barrier-564` |
| 104 | `kizaru` | `stamina` | 91 | 2 | 미분류 (보류) | `evidence-kizaru-star-gun-1094`, `evidence-kizaru-vegapunk-1108` |
| 105 | `kizaru` | `speed` | 99 | 1 | 미분류 (보류) | `evidence-kizaru-luffy-clones-1093` |
| 106 | `kizaru` | `techniqueMastery` | 93 | 1 | 미분류 (보류) | `evidence-kizaru-luffy-clones-1093` |
| 107 | `kizaru` | `combatIQ` | 90 | 1 | 미분류 (보류) | `evidence-kizaru-luffy-clones-1093` |
| 108 | `kizaru` | `versatility` | 91 | 1 | 미분류 (보류) | `evidence-kizaru-luffy-clones-1093` |
| 109 | `fujitora` | `attack` | 91 | 1 | 미분류 (보류) | `evidence-fujitora-meteor-713` |
| 110 | `fujitora` | `defense` | 88 | 0 | 미분류 (보류) | 미연결 |
| 111 | `fujitora` | `stamina` | 87 | 0 | 미분류 (보류) | 미연결 |
| 112 | `fujitora` | `speed` | 85 | 0 | 미분류 (보류) | 미연결 |
| 113 | `fujitora` | `techniqueMastery` | 92 | 2 | 미분류 (보류) | `evidence-fujitora-meteor-713`, `evidence-fujitora-luffy-observation-799` |
| 114 | `fujitora` | `combatIQ` | 86 | 1 | 미분류 (보류) | `evidence-fujitora-luffy-observation-799` |
| 115 | `fujitora` | `versatility` | 94 | 2 | 미분류 (보류) | `evidence-fujitora-meteor-713`, `evidence-fujitora-luffy-observation-799` |
| 116 | `ryokugyu` | `attack` | 90 | 0 | 미분류 (보류) | 미연결 |
| 117 | `ryokugyu` | `defense` | 89 | 1 | 미분류 (보류) | `evidence-aramaki-shanks-haki-1055` |
| 118 | `ryokugyu` | `stamina` | 89 | 0 | 미분류 (보류) | 미연결 |
| 119 | `ryokugyu` | `speed` | 84 | 0 | 미분류 (보류) | 미연결 |
| 120 | `ryokugyu` | `techniqueMastery` | 87 | 0 | 미분류 (보류) | 미연결 |
| 121 | `ryokugyu` | `combatIQ` | 82 | 1 | 미분류 (보류) | `evidence-aramaki-shanks-haki-1055` |
| 122 | `ryokugyu` | `versatility` | 92 | 0 | 미분류 (보류) | 미연결 |
| 123 | `teach` | `attack` | 95 | 4 | 미분류 (보류) | `evidence-teach-ace-440-441`, `evidence-teach-gura-577`, `evidence-teach-law-1063-1064`, `evidence-teach-kurouzu-441` |
| 124 | `teach` | `defense` | 89 | 4 | 미분류 (보류) | `evidence-teach-ace-440-441`, `evidence-teach-whitebeard-576`, `evidence-teach-law-1063-1064`, `evidence-teach-hancock-nullification-1059` |
| 125 | `teach` | `stamina` | 95 | 3 | 미분류 (보류) | `evidence-teach-whitebeard-576`, `evidence-teach-law-1063-1064`, `evidence-teach-heart-pirates-1081` |
| 126 | `teach` | `speed` | 82 | 2 | 미분류 (보류) | `evidence-teach-ace-440-441`, `evidence-teach-law-1063-1064` |
| 127 | `teach` | `techniqueMastery` | 93 | 5 | 미분류 (보류) | `evidence-teach-ace-440-441`, `evidence-teach-gura-577`, `evidence-teach-law-1063-1064`, `evidence-teach-kurouzu-441`, `evidence-teach-hancock-nullification-1059` |
| 128 | `teach` | `combatIQ` | 87 | 4 | 미분류 (보류) | `evidence-teach-ace-440-441`, `evidence-teach-law-1063-1064`, `evidence-teach-kurouzu-441`, `evidence-teach-hancock-nullification-1059` |
| 129 | `teach` | `versatility` | 93 | 4 | 미분류 (보류) | `evidence-teach-ace-440-441`, `evidence-teach-gura-577`, `evidence-teach-law-1063-1064`, `evidence-teach-hancock-nullification-1059` |
| 130 | `shiryu` | `attack` | 78 | 1 | 미분류 (보류) | `evidence-shiryu-garp-1087` |
| 131 | `shiryu` | `defense` | 74 | 1 | 미분류 (보류) | `evidence-shiryu-garp-counter-1087` |
| 132 | `shiryu` | `speed` | 79 | 1 | 미분류 (보류) | `evidence-shiryu-garp-1087` |
| 133 | `shiryu` | `techniqueMastery` | 78 | 1 | 미분류 (보류) | `evidence-shiryu-garp-1087` |
| 134 | `shiryu` | `combatIQ` | 78 | 1 | 미분류 (보류) | `evidence-shiryu-garp-1087` |
| 135 | `shiryu` | `versatility` | 78 | 1 | 미분류 (보류) | `evidence-shiryu-garp-1087` |
| 136 | `van-augur` | `attack` | 72 | 1 | 미분류 (보류) | `evidence-augur-jean-bart-1064` |
| 137 | `van-augur` | `defense` | 67 | 1 | 미분류 (보류) | `evidence-augur-warp-1063-1064` |
| 138 | `van-augur` | `speed` | 75 | 1 | 미분류 (보류) | `evidence-augur-warp-1063-1064` |
| 139 | `van-augur` | `techniqueMastery` | 80 | 2 | 미분류 (보류) | `evidence-augur-warp-1063-1064`, `evidence-augur-jean-bart-1064` |
| 140 | `van-augur` | `combatIQ` | 78 | 1 | 미분류 (보류) | `evidence-augur-warp-1063-1064` |
| 141 | `van-augur` | `versatility` | 82 | 1 | 미분류 (보류) | `evidence-augur-warp-1063-1064` |
| 142 | `burgess` | `attack` | 76 | 2 | 미분류 (보류) | `evidence-burgess-mountain-1063`, `evidence-burgess-sabo-737-792` |
| 143 | `burgess` | `defense` | 74 | 1 | 미분류 (보류) | `evidence-burgess-sabo-737-792` |
| 144 | `burgess` | `stamina` | 79 | 1 | 미분류 (보류) | `evidence-burgess-sabo-737-792` |
| 145 | `burgess` | `speed` | 74 | 1 | 미분류 (보류) | `evidence-burgess-sabo-737-792` |
| 146 | `burgess` | `techniqueMastery` | 72 | 2 | 미분류 (보류) | `evidence-burgess-sabo-737-792`, `evidence-burgess-mountain-1063` |
| 147 | `burgess` | `combatIQ` | 70 | 1 | 미분류 (보류) | `evidence-burgess-sabo-737-792` |
| 148 | `burgess` | `versatility` | 74 | 1 | 미분류 (보류) | `evidence-burgess-mountain-1063` |
| 149 | `pizarro` | `attack` | 72 | 1 | 미분류 (보류) | `evidence-pizarro-island-1087-1088` |
| 150 | `pizarro` | `defense` | 74 | 1 | 미분류 (보류) | `evidence-pizarro-damage-link-1088` |
| 151 | `pizarro` | `stamina` | 74 | 1 | 미분류 (보류) | `evidence-pizarro-island-1087-1088` |
| 152 | `pizarro` | `speed` | 64 | 1 | 미분류 (보류) | `evidence-pizarro-island-1087-1088` |
| 153 | `pizarro` | `techniqueMastery` | 74 | 1 | 미분류 (보류) | `evidence-pizarro-island-1087-1088` |
| 154 | `pizarro` | `combatIQ` | 70 | 1 | 미분류 (보류) | `evidence-pizarro-damage-link-1088` |
| 155 | `pizarro` | `versatility` | 74 | 1 | 미분류 (보류) | `evidence-pizarro-island-1087-1088` |
| 156 | `law` | `attack` | 86 | 3 | 미분류 (보류) | `evidence-law-big-mom-1039`, `evidence-law-puncture-wille-1039`, `evidence-law-teach-1064` |
| 157 | `law` | `defense` | 83 | 2 | 미분류 (보류) | `evidence-law-big-mom-1039`, `evidence-law-teach-1064` |
| 158 | `law` | `stamina` | 85 | 2 | 미분류 (보류) | `evidence-law-big-mom-1039`, `evidence-law-puncture-wille-1039` |
| 159 | `law` | `speed` | 82 | 1 | 미분류 (보류) | `evidence-law-teach-1064` |
| 160 | `law` | `techniqueMastery` | 90 | 3 | 미분류 (보류) | `evidence-law-doflamingo-gamma-knife-781`, `evidence-law-big-mom-1039`, `evidence-law-haki-nullification-1063` |
| 161 | `law` | `combatIQ` | 88 | 2 | 미분류 (보류) | `evidence-law-doflamingo-gamma-knife-781`, `evidence-law-haki-nullification-1063` |
| 162 | `law` | `versatility` | 91 | 4 | 미분류 (보류) | `evidence-law-doflamingo-gamma-knife-781`, `evidence-law-big-mom-1039`, `evidence-law-haki-nullification-1063`, `evidence-law-teach-1064` |
| 163 | `doflamingo` | `attack` | 76 | 2 | 미분류 (보류) | `evidence-doflamingo-law-arm-769`, `evidence-doflamingo-gear4-784-785` |
| 164 | `doflamingo` | `defense` | 74 | 2 | 미분류 (보류) | `evidence-doflamingo-gear4-784-785`, `evidence-doflamingo-organ-repair-781` |
| 165 | `doflamingo` | `stamina` | 81 | 2 | 미분류 (보류) | `evidence-doflamingo-organ-repair-781`, `evidence-doflamingo-gear4-784-785` |
| 166 | `doflamingo` | `speed` | 75 | 1 | 미분류 (보류) | `evidence-doflamingo-gear4-784-785` |
| 167 | `doflamingo` | `techniqueMastery` | 87 | 3 | 미분류 (보류) | `evidence-doflamingo-law-arm-769`, `evidence-doflamingo-organ-repair-781`, `evidence-doflamingo-awakening-785` |
| 168 | `doflamingo` | `combatIQ` | 81 | 2 | 미분류 (보류) | `evidence-doflamingo-organ-repair-781`, `evidence-doflamingo-awakening-785` |
| 169 | `doflamingo` | `versatility` | 83 | 3 | 미분류 (보류) | `evidence-doflamingo-law-arm-769`, `evidence-doflamingo-awakening-785`, `evidence-doflamingo-birdcage-781-790` |
| 170 | `hancock` | `attack` | 79 | 2 | 미분류 (보류) | `evidence-hancock-marineford-559`, `evidence-hancock-amazon-lily-1059` |
| 171 | `hancock` | `defense` | 76 | 1 | 미분류 (보류) | `evidence-hancock-amazon-lily-1059` |
| 172 | `hancock` | `stamina` | 77 | 2 | 미분류 (보류) | `evidence-hancock-marineford-559`, `evidence-hancock-amazon-lily-1059` |
| 173 | `hancock` | `speed` | 80 | 1 | 미분류 (보류) | `evidence-hancock-marineford-559` |
| 174 | `hancock` | `techniqueMastery` | 82 | 2 | 미분류 (보류) | `evidence-hancock-marineford-559`, `evidence-hancock-amazon-lily-1059` |
| 175 | `hancock` | `combatIQ` | 75 | 1 | 미분류 (보류) | `evidence-hancock-amazon-lily-1059` |
| 176 | `hancock` | `versatility` | 82 | 2 | 미분류 (보류) | `evidence-hancock-marineford-559`, `evidence-hancock-amazon-lily-1059` |
| 177 | `mihawk` | `attack` | 96 | 3 | 미분류 (보류) | `evidence-mihawk-jozu-553`, `evidence-mihawk-luffy-560-561`, `evidence-mihawk-shanks-swordskill-1058` |
| 178 | `mihawk` | `stamina` | 91 | 2 | 미분류 (보류) | `evidence-mihawk-vista-561-562`, `evidence-mihawk-shanks-rivalry-profile` |
| 179 | `mihawk` | `speed` | 94 | 3 | 미분류 (보류) | `evidence-mihawk-luffy-560-561`, `evidence-mihawk-vista-561-562`, `evidence-mihawk-shanks-rivalry-profile` |
| 180 | `mihawk` | `techniqueMastery` | 99 | 4 | 미분류 (보류) | `evidence-mihawk-world-strongest-profile`, `evidence-mihawk-shanks-swordskill-1058`, `evidence-mihawk-zoro-49-51`, `evidence-mihawk-vista-561-562` |
| 181 | `mihawk` | `combatIQ` | 92 | 2 | 미분류 (보류) | `evidence-mihawk-zoro-49-51`, `evidence-mihawk-luffy-560-561` |
| 182 | `mihawk` | `versatility` | 84 | 3 | 미분류 (보류) | `evidence-mihawk-jozu-553`, `evidence-mihawk-luffy-560-561`, `evidence-mihawk-zoro-49-51` |
| 183 | `crocodile` | `attack` | 76 | 2 | 미분류 (보류) | `evidence-crocodile-alabasta-mastery-178-209`, `evidence-crocodile-marineford-interventions-561-578` |
| 184 | `crocodile` | `defense` | 72 | 2 | 미분류 (보류) | `evidence-crocodile-water-weakness-199`, `evidence-crocodile-jozu-560` |
| 185 | `crocodile` | `stamina` | 77 | 3 | 미분류 (보류) | `evidence-crocodile-alabasta-mastery-178-209`, `evidence-crocodile-jozu-560`, `evidence-crocodile-marineford-interventions-561-578` |
| 186 | `crocodile` | `speed` | 74 | 1 | 미분류 (보류) | `evidence-crocodile-marineford-interventions-561-578` |
| 187 | `crocodile` | `techniqueMastery` | 86 | 2 | 미분류 (보류) | `evidence-crocodile-alabasta-mastery-178-209`, `evidence-crocodile-marineford-interventions-561-578` |
| 188 | `crocodile` | `combatIQ` | 86 | 3 | 미분류 (보류) | `evidence-crocodile-alabasta-mastery-178-209`, `evidence-crocodile-water-weakness-199`, `evidence-crocodile-marineford-interventions-561-578` |
| 189 | `crocodile` | `versatility` | 82 | 2 | 미분류 (보류) | `evidence-crocodile-alabasta-mastery-178-209`, `evidence-crocodile-marineford-interventions-561-578` |

## 해석 제한 및 재검토 방식

매 행의 ① `evidenceIds`가 실제 존재하는지 ② Evidence가 지원하는 축의 `primary`/ `secondary`/ `context` 역할 ③ 원작 직접 장면 대조 수준 ④ 외부개입·상성·지속시간 ⑤ 다른 캐릭터의 같은 축 앵커와의 비율을 확인한 후 판정한다. **전부 자동 판정하는 알고리즘은 만들지 않는다.** 현재 172개 미분류는 별도 원작 검토가 필요한 열린 항목이며, 이 파일로 조용히 확정 처리하지 않는다.
