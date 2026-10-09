# Full 39-Evaluation × 273-Stat Haki recalibration register

**Snapshot:** main `5711de2a1ae132ebccc710f0f12a147ee72c57a4`, 2026-10-09. This is a source-level structural audit and is **not canon reapproval or a numerical rating correction**.

**Coverage:** 39 Evaluations, 273 Stats; 51 Raw-positive Stat items, 53 typed Raw entries, Raw sum 256; 14 Stat rows have **no** linked Evidence IDs; 102 have at least one Evidence with a missing declared stat-specific role; 15 Evidence-reuse across different typed Raw Stat allocations; 2 same-stat multi-type Haki stacks.
**Readiness:** E1 45, E2 25, E3 0, unassigned 203. Absence of Readiness does **not** equal E3 or low combat power.

## Audit methodology and interpretation

- Each seven-Stat `item()` was parsed with balanced JavaScript/TypeScript delimiters, including mixed quotation styles, and its evidence refs were joined to the exact master ID, subject character and declared Stat contribution role.
- `No linked Evidence` means the EvaluationItem currently has no IDs; it is not canon proof of weakness or a mathematical bug.
- `Raw independent-effect unapproved` means existing Raw needs a new-standard exceptional marginal-effect check distinct from the existing Base. **It is not a finding that all Raw is illegitimate.**
- Multi-Stat reuse **can** be legitimate when independent observed effects exist; marked for verification rather than automatically deducted.
- `Neutral shadow Base/Raw/Final` are explicitly shown for every one of the 273 rows: `Base'=min(100, legacyBase + legacyRaw × 0.5)`, `Raw'=0`, and identical Final. **These are mathematical non-changes, not new evidence-verified combat ratings**; do not copy shadow values into official Evaluations.
- No score, Haki Raw, Ranking, Matchup, Evaluation Data Version or Calculation Model has been changed.

## Complete per-Stat ledger

| # | Evaluation / era | Stat | Current Base | Current Raw | Current Final | Neutral shadow Base | Shadow Raw | Shadow Final | E-Level | Evidence refs | Evidence stat roles | Investigation status |
|---:|---|---|---:|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | marco / default | 공격 | 76 | 2 | 77 | 77 | 0 | 77 | unset | marco-kizaru-554<br>marco-armament-akainu-574 | not-mapped,primary | 충분도 미지정 / 근거 역할 검증 / Raw 독립 효과 미승인 |
| 2 | marco / default | 방어 | 85 | 0 | 85 | 85 | 0 | 85 | unset | marco-kizaru-554<br>marco-defense-akainu-575<br>marco-defense-king-1022<br>marco-defense-kaido-1043 | primary,primary,primary,primary | 충분도 미지정 |
| 3 | marco / default | 지구력 | 84 | 0 | 84 | 84 | 0 | 84 | unset | marco-regeneration-1006<br>marco-defense-king-1022<br>marco-defense-kaido-1043 | secondary,not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 4 | marco / default | 속도 | 81 | 0 | 81 | 81 | 0 | 81 | unset | marco-kizaru-554<br>marco-aokiji-566 | secondary,primary | 충분도 미지정 |
| 5 | marco / default | 숙련 | 81 | 0 | 81 | 81 | 0 | 81 | unset | marco-ice-oni-998<br>marco-regeneration-1006<br>marco-defense-king-1022 | secondary,context,secondary | 충분도 미지정 |
| 6 | marco / default | 전투지능 | 79 | 0 | 79 | 79 | 0 | 79 | unset | marco-aokiji-566<br>marco-big-mom-995<br>marco-seastone-568-569<br>marco-payback-war-820-909 | secondary,context,context,context | 충분도 미지정 |
| 7 | marco / default | 범용 | 85 | 0 | 85 | 85 | 0 | 85 | unset | marco-big-mom-995<br>marco-ice-oni-998<br>marco-regeneration-1006<br>marco-defense-akainu-575<br>marco-defense-kaido-1043 | secondary,primary,not-mapped,secondary,secondary | 충분도 미지정 / 근거 역할 검증 |
| 8 | jozu / default | 공격 | 76 | 4 | 78 | 78 | 0 | 78 | unset | jozu-crocodile-560<br>jozu-aokiji-567 | primary,primary | 충분도 미지정 / Raw 독립 효과 미승인 |
| 9 | jozu / default | 방어 | 84 | 0 | 84 | 84 | 0 | 84 | unset | jozu-mihawk-553<br>jozu-frozen-568 | primary,context | 충분도 미지정 |
| 10 | jozu / default | 지구력 | 78 | 0 | 78 | 78 | 0 | 78 | unset | jozu-aokiji-567<br>jozu-frozen-568 | context,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 11 | jozu / default | 속도 | 79 | 0 | 79 | 79 | 0 | 79 | unset | jozu-crocodile-560<br>jozu-aokiji-567 | secondary,secondary | 충분도 미지정 |
| 12 | jozu / default | 숙련 | 74 | 0 | 74 | 74 | 0 | 74 | unset | jozu-mihawk-553<br>jozu-crocodile-560 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 13 | jozu / default | 전투지능 | 75 | 0 | 75 | 75 | 0 | 75 | unset | jozu-aokiji-567<br>jozu-frozen-568 | not-mapped,context | 충분도 미지정 / 근거 역할 검증 |
| 14 | jozu / default | 범용 | 74 | 0 | 74 | 74 | 0 | 74 | unset | jozu-mihawk-553<br>jozu-crocodile-560<br>jozu-aokiji-567 | not-mapped,not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 15 | vista / default | 공격 | 80 | 4 | 82 | 82 | 0 | 82 | unset | vista-mihawk-561-562<br>vista-official-mihawk-profile<br>vista-armament-akainu-574 | secondary,secondary,primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 16 | vista / default | 방어 | 79 | 0 | 79 | 79 | 0 | 79 | unset | vista-mihawk-561-562 | secondary | 충분도 미지정 |
| 17 | vista / default | 지구력 | 77 | 0 | 77 | 77 | 0 | 77 | unset | vista-mihawk-561-562<br>vista-armament-akainu-574 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 18 | vista / default | 속도 | 80 | 0 | 80 | 80 | 0 | 80 | unset | vista-mihawk-561-562 | secondary | 충분도 미지정 |
| 19 | vista / default | 숙련 | 86 | 2 | 87 | 87 | 0 | 87 | unset | vista-mihawk-561-562<br>vista-official-mihawk-profile<br>vista-armament-akainu-574 | primary,primary,secondary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 20 | vista / default | 전투지능 | 77 | 0 | 77 | 77 | 0 | 77 | unset | vista-mihawk-561-562 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 21 | vista / default | 범용 | 74 | 0 | 74 | 74 | 0 | 74 | unset | vista-mihawk-561-562<br>vista-armament-akainu-574 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 22 | king / default | 공격 | 81 | 4 | 83 | 83 | 0 | 83 | unset | king-marco-1006<br>king-zoro-1035<br>king-armament-1032 | primary,primary,primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 23 | king / default | 방어 | 86 | 0 | 86 | 86 | 0 | 86 | unset | king-lunarian-1032<br>king-zoro-1035 | primary,primary | 충분도 미지정 |
| 24 | king / default | 지구력 | 82 | 0 | 82 | 82 | 0 | 82 | unset | king-marco-1006<br>king-zoro-1035 | not-mapped,secondary | 충분도 미지정 / 근거 역할 검증 |
| 25 | king / default | 속도 | 82 | 0 | 82 | 82 | 0 | 82 | unset | king-zoro-1035 | primary | 충분도 미지정 |
| 26 | king / default | 숙련 | 79 | 2 | 80 | 80 | 0 | 80 | unset | king-zoro-1035<br>king-armament-1032 | not-mapped,secondary | 충분도 미지정 / 근거 역할 검증 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 27 | king / default | 전투지능 | 76 | 0 | 76 | 76 | 0 | 76 | unset | king-zoro-1035 | secondary | 충분도 미지정 |
| 28 | king / default | 범용 | 80 | 0 | 80 | 80 | 0 | 80 | unset | king-zoro-1035<br>king-waterfall-930 | secondary,secondary | 충분도 미지정 |
| 29 | queen / default | 공격 | 80 | 0 | 80 | 80 | 0 | 80 | unset | queen-ancient-zoan-1028<br>queen-cybernetics-1028-1034<br>queen-big-mom-947 | primary,primary,secondary | 충분도 미지정 |
| 30 | queen / default | 방어 | 81 | 0 | 81 | 81 | 0 | 81 | unset | queen-marco-1006<br>queen-ancient-zoan-1028 | secondary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 31 | queen / default | 지구력 | 81 | 0 | 81 | 81 | 0 | 81 | unset | queen-marco-1006<br>queen-cybernetics-1028-1034 | primary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 32 | queen / default | 속도 | 75 | 0 | 75 | 75 | 0 | 75 | unset | queen-cybernetics-1028-1034 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 33 | queen / default | 숙련 | 79 | 0 | 79 | 79 | 0 | 79 | unset | queen-ancient-zoan-1028<br>queen-cybernetics-1028-1034 | secondary,secondary | 충분도 미지정 |
| 34 | queen / default | 전투지능 | 74 | 0 | 74 | 74 | 0 | 74 | unset | queen-cybernetics-1028-1034 | context | 충분도 미지정 |
| 35 | queen / default | 범용 | 80 | 0 | 80 | 80 | 0 | 80 | unset | queen-ancient-zoan-1028<br>queen-cybernetics-1028-1034 | secondary,primary | 충분도 미지정 |
| 36 | jack / default | 공격 | 74 | 0 | 74 | 74 | 0 | 74 | unset | jack-ashura-921<br>jack-zou-809-810 | primary,context | 충분도 미지정 |
| 37 | jack / default | 방어 | 80 | 0 | 80 | 80 | 0 | 80 | unset | jack-zou-809-810<br>jack-ashura-921<br>jack-sulong-1026 | secondary,context,secondary | 충분도 미지정 |
| 38 | jack / default | 지구력 | 84 | 0 | 84 | 84 | 0 | 84 | unset | jack-zou-809-810<br>jack-sulong-1026<br>jack-convoy-801 | primary,primary,context | 충분도 미지정 |
| 39 | jack / default | 속도 | 73 | 0 | 73 | 73 | 0 | 73 | unset | jack-ashura-921 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 40 | jack / default | 숙련 | 71 | 0 | 71 | 71 | 0 | 71 | unset | jack-ashura-921<br>jack-zou-809-810 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 41 | jack / default | 전투지능 | 70 | 0 | 70 | 70 | 0 | 70 | unset | jack-zou-809-810<br>jack-zunesha-824 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 42 | jack / default | 범용 | 72 | 0 | 72 | 72 | 0 | 72 | unset | jack-zou-809-810<br>jack-ashura-921 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 43 | katakuri / default | 공격 | 79 | 4 | 81 | 81 | 0 | 81 | unset | katakuri-awakening-882<br>katakuri-armament-883 | not-mapped,primary | 충분도 미지정 / 근거 역할 검증 / Raw 독립 효과 미승인 |
| 44 | katakuri / default | 방어 | 79 | 6 | 82 | 82 | 0 | 82 | unset | katakuri-future-sight-881-884 | primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 45 | katakuri / default | 지구력 | 82 | 0 | 82 | 82 | 0 | 82 | unset | katakuri-endurance-894 | primary | 충분도 미지정 |
| 46 | katakuri / default | 속도 | 83 | 0 | 83 | 83 | 0 | 83 | unset | katakuri-future-sight-881-884<br>katakuri-snakeman-895 | context,primary | 충분도 미지정 |
| 47 | katakuri / default | 숙련 | 83 | 6 | 86 | 86 | 0 | 86 | unset | katakuri-future-sight-881-884<br>katakuri-awakening-882<br>katakuri-armament-883<br>katakuri-gear4-counter-883-885 | primary,secondary,secondary,secondary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 48 | katakuri / default | 전투지능 | 81 | 4 | 83 | 83 | 0 | 83 | unset | katakuri-future-sight-881-884<br>katakuri-gear4-counter-883-885 | primary,primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 49 | katakuri / default | 범용 | 82 | 0 | 82 | 82 | 0 | 82 | unset | katakuri-awakening-882<br>katakuri-conquerors-893<br>katakuri-gear4-counter-883-885 | primary,not-mapped,secondary | 충분도 미지정 / 근거 역할 검증 |
| 50 | smoothie / default | 공격 | 76 | 0 | 76 | 76 | 0 | 76 | unset | smoothie-pursuit-894 | primary | 충분도 미지정 |
| 51 | smoothie / default | 방어 | 75 | 0 | 75 | 75 | 0 | 75 | unset | smoothie-poison-869 | context | 충분도 미지정 |
| 52 | smoothie / default | 지구력 | 76 | 0 | 76 | 76 | 0 | 76 | unset | smoothie-pursuit-894<br>smoothie-command-897 | context,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 53 | smoothie / default | 속도 | 74 | 0 | 74 | 74 | 0 | 74 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 54 | smoothie / default | 숙련 | 80 | 0 | 80 | 80 | 0 | 80 | unset | smoothie-poison-869<br>smoothie-pursuit-894 | primary,secondary | 충분도 미지정 |
| 55 | smoothie / default | 전투지능 | 77 | 0 | 77 | 77 | 0 | 77 | unset | smoothie-command-897 | primary | 충분도 미지정 |
| 56 | smoothie / default | 범용 | 78 | 0 | 78 | 78 | 0 | 78 | unset | smoothie-poison-869<br>smoothie-pursuit-894<br>smoothie-command-897 | primary,primary,secondary | 충분도 미지정 |
| 57 | cracker / default | 공격 | 75 | 4 | 77 | 77 | 0 | 77 | unset | cracker-biscuit-837-838<br>cracker-urouge-837 | primary,context | 충분도 미지정 / Raw 독립 효과 미승인 |
| 58 | cracker / default | 방어 | 81 | 0 | 81 | 81 | 0 | 81 | unset | cracker-biscuit-837-838<br>cracker-long-battle-842 | primary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 59 | cracker / default | 지구력 | 80 | 0 | 80 | 80 | 0 | 80 | unset | cracker-long-battle-842 | primary | 충분도 미지정 |
| 60 | cracker / default | 속도 | 75 | 0 | 75 | 75 | 0 | 75 | unset | cracker-biscuit-837-838 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 61 | cracker / default | 숙련 | 80 | 0 | 80 | 80 | 0 | 80 | unset | cracker-biscuit-837-838<br>cracker-long-battle-842 | secondary,secondary | 충분도 미지정 |
| 62 | cracker / default | 전투지능 | 75 | 0 | 75 | 75 | 0 | 75 | unset | cracker-long-battle-842 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 63 | cracker / default | 범용 | 77 | 0 | 77 | 77 | 0 | 77 | unset | cracker-biscuit-837-838<br>cracker-long-battle-842 | secondary,context | 충분도 미지정 |
| 64 | zoro / default | 공격 | 85 | 10 | 90 | 90 | 0 | 90 | unset | zoro-ashura-scar-1010<br>zoro-conquerors-1033-1035<br>zoro-lucci-1110-1111 | primary,primary,secondary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 / 동일축 복수 Haki |
| 65 | zoro / default | 방어 | 81 | 4 | 83 | 83 | 0 | 83 | unset | zoro-hakai-1009 | primary | 충분도 미지정 / Raw 독립 효과 미승인 |
| 66 | zoro / default | 지구력 | 87 | 0 | 87 | 87 | 0 | 87 | unset | zoro-nothing-happened-485<br>zoro-hakai-1009<br>zoro-ashura-scar-1010 | primary,secondary,secondary | 충분도 미지정 |
| 67 | zoro / default | 속도 | 83 | 0 | 83 | 83 | 0 | 83 | unset | zoro-conquerors-1033-1035 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 68 | zoro / default | 숙련 | 85 | 4 | 87 | 87 | 0 | 87 | unset | zoro-hakai-1009<br>zoro-ashura-scar-1010<br>zoro-conquerors-1033-1035 | not-mapped,secondary,primary | 충분도 미지정 / 근거 역할 검증 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 69 | zoro / default | 전투지능 | 82 | 0 | 82 | 82 | 0 | 82 | unset | zoro-lunarian-read-1035 | primary | 충분도 미지정 |
| 70 | zoro / default | 범용 | 81 | 0 | 81 | 81 | 0 | 81 | unset | zoro-hakai-1009<br>zoro-conquerors-1033-1035 | secondary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 71 | sanji / default | 공격 | 81 | 4 | 83 | 83 | 0 | 83 | unset | sanji-speed-ifrit-1034 | primary | 충분도 미지정 / Raw 독립 효과 미승인 |
| 72 | sanji / default | 방어 | 85 | 0 | 85 | 85 | 0 | 85 | unset | sanji-exoskeleton-1028<br>sanji-speed-ifrit-1034<br>sanji-kizaru-laser-1107 | primary,not-mapped,secondary | 충분도 미지정 / 근거 역할 검증 |
| 73 | sanji / default | 지구력 | 85 | 0 | 85 | 85 | 0 | 85 | unset | sanji-exoskeleton-1028<br>sanji-speed-ifrit-1034 | primary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 74 | sanji / default | 속도 | 91 | 0 | 91 | 91 | 0 | 91 | unset | sanji-speed-ifrit-1034<br>sanji-kizaru-laser-1107<br>sanji-nusjuro-1113 | primary,secondary,secondary | 충분도 미지정 |
| 75 | sanji / default | 숙련 | 84 | 0 | 84 | 84 | 0 | 84 | unset | sanji-speed-ifrit-1034 | secondary | 충분도 미지정 |
| 76 | sanji / default | 전투지능 | 81 | 0 | 81 | 81 | 0 | 81 | unset | sanji-kizaru-laser-1107 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 77 | sanji / default | 범용 | 82 | 0 | 82 | 82 | 0 | 82 | unset | sanji-exoskeleton-1028<br>sanji-speed-ifrit-1034<br>sanji-kizaru-laser-1107<br>sanji-nusjuro-1113 | not-mapped,secondary,secondary,secondary | 충분도 미지정 / 근거 역할 검증 |
| 78 | jinbe / default | 공격 | 76 | 4 | 78 | 78 | 0 | 78 | unset | jinbe-fishman-karate-629<br>jinbe-whos-who-1018 | not-mapped,primary | 충분도 미지정 / 근거 역할 검증 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 79 | jinbe / default | 방어 | 78 | 4 | 80 | 80 | 0 | 80 | unset | jinbe-big-mom-890<br>jinbe-whos-who-1018 | primary,primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 80 | jinbe / default | 지구력 | 80 | 0 | 80 | 80 | 0 | 80 | unset | jinbe-ace-five-days-552<br>jinbe-akainu-575<br>jinbe-whos-who-1018 | primary,secondary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 81 | jinbe / default | 속도 | 77 | 0 | 77 | 77 | 0 | 77 | unset | jinbe-whos-who-1018 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 82 | jinbe / default | 숙련 | 83 | 0 | 83 | 83 | 0 | 83 | unset | jinbe-fishman-karate-629<br>jinbe-whos-who-1018 | primary,secondary | 충분도 미지정 |
| 83 | jinbe / default | 전투지능 | 80 | 0 | 80 | 80 | 0 | 80 | unset | jinbe-big-mom-890 | secondary | 충분도 미지정 |
| 84 | jinbe / default | 범용 | 79 | 0 | 79 | 79 | 0 | 79 | unset | jinbe-fishman-karate-629<br>jinbe-big-mom-890 | secondary,primary | 충분도 미지정 |
| 85 | shanks / default | 공격 | 94 | 6 | 97 | 97 | 0 | 97 | unset | shanks-whitebeard-haki-434<br>shanks-kid-divine-departure-1079 | secondary,primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 86 | shanks / default | 방어 | 91 | 0 | 91 | 91 | 0 | 91 | unset | shanks-sakazuki-block-579 | primary | 충분도 미지정 |
| 87 | shanks / default | 지구력 | 88 | 0 | 88 | 88 | 0 | 88 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 88 | shanks / default | 속도 | 95 | 0 | 95 | 95 | 0 | 95 | unset | shanks-kid-divine-departure-1079<br>shanks-sakazuki-block-579 | secondary,secondary | 충분도 미지정 |
| 89 | shanks / default | 숙련 | 92 | 8 | 96 | 96 | 0 | 96 | unset | shanks-whitebeard-haki-434<br>shanks-kid-divine-departure-1079 | context,primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 / 동일축 복수 Haki |
| 90 | shanks / default | 전투지능 | 91 | 4 | 93 | 93 | 0 | 93 | unset | shanks-aramaki-haki-1055<br>shanks-kid-divine-departure-1079 | secondary,primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 91 | shanks / default | 범용 | 88 | 0 | 88 | 88 | 0 | 88 | unset | shanks-aramaki-haki-1055 | primary | 충분도 미지정 |
| 92 | garp / prime | 공격 | 95 | 8 | 99 | 99 | 0 | 99 | unset | garp-roger-rocks-1165 | primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 93 | garp / prime | 방어 | 95 | 8 | 99 | 99 | 0 | 99 | unset | garp-roger-rocks-1165 | primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 94 | garp / prime | 지구력 | 99 | 0 | 99 | 99 | 0 | 99 | unset | garp-roger-rocks-1165<br>garp-kuzan-haki-1087 | primary,secondary | 충분도 미지정 |
| 95 | garp / prime | 속도 | 98 | 0 | 98 | 98 | 0 | 98 | unset | garp-roger-rocks-1165<br>garp-blue-hole-1081 | not-mapped,primary | 충분도 미지정 / 근거 역할 검증 |
| 96 | garp / prime | 숙련 | 95 | 8 | 99 | 99 | 0 | 99 | unset | garp-roger-rocks-1165<br>garp-galaxy-impact-1080<br>garp-blue-hole-1081 | secondary,secondary,secondary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 97 | garp / prime | 전투지능 | 97 | 0 | 97 | 97 | 0 | 97 | unset | garp-roger-rocks-1165<br>garp-rescue-command-1088 | not-mapped,primary | 충분도 미지정 / 근거 역할 검증 |
| 98 | garp / prime | 범용 | 91 | 0 | 91 | 91 | 0 | 91 | unset | garp-roger-rocks-1165<br>garp-galaxy-impact-1080<br>garp-galaxy-divide-1088<br>garp-rescue-command-1088 | not-mapped,not-mapped,secondary,secondary | 충분도 미지정 / 근거 역할 검증 |
| 99 | garp-current / current | 공격 | 93 | 6 | 96 | 96 | 0 | 96 | E1 | garp-galaxy-impact-1080<br>garp-blue-hole-1081<br>garp-galaxy-divide-1088 | primary,primary,secondary | Raw 독립 효과 미승인 |
| 100 | garp-current / current | 방어 | 93 | 0 | 93 | 93 | 0 | 93 | E1 | garp-kuzan-haki-1087<br>garp-shiryu-protection-1087 | not-mapped,context | 근거 역할 검증 |
| 101 | garp-current / current | 지구력 | 95 | 0 | 95 | 95 | 0 | 95 | E1 | garp-shiryu-protection-1087<br>garp-kuzan-haki-1087<br>garp-galaxy-divide-1088 | primary,secondary,primary | 원작 단위 정성 검증 필요 |
| 102 | garp-current / current | 속도 | 97 | 0 | 97 | 97 | 0 | 97 | E1 | garp-blue-hole-1081<br>garp-shiryu-protection-1087 | primary,not-mapped | 근거 역할 검증 |
| 103 | garp-current / current | 숙련 | 95 | 4 | 97 | 97 | 0 | 97 | E1 | garp-blue-hole-1081<br>garp-galaxy-impact-1080<br>garp-kuzan-haki-1087 | secondary,secondary,primary | Raw 독립 효과 미승인 |
| 104 | garp-current / current | 전투지능 | 95 | 0 | 95 | 95 | 0 | 95 | E1 | garp-rescue-command-1088<br>garp-shiryu-protection-1087 | primary,secondary | 원작 단위 정성 검증 필요 |
| 105 | garp-current / current | 범용 | 88 | 0 | 88 | 88 | 0 | 88 | E1 | garp-galaxy-impact-1080<br>garp-blue-hole-1081<br>garp-galaxy-divide-1088<br>garp-rescue-command-1088 | not-mapped,not-mapped,secondary,secondary | 근거 역할 검증 |
| 106 | akainu / default | 공격 | 97 | 0 | 97 | 97 | 0 | 97 | unset | sakazuki-shanks-block-579<br>sakazuki-kuzan-duel-650 | context,secondary | 충분도 미지정 |
| 107 | akainu / default | 방어 | 94 | 2 | 95 | 95 | 0 | 95 | unset | sakazuki-kuzan-duel-650<br>akainu-admiral-barrier-564 | context,primary | 충분도 미지정 / Raw 독립 효과 미승인 |
| 108 | akainu / default | 지구력 | 96 | 0 | 96 | 96 | 0 | 96 | unset | sakazuki-kuzan-duel-650 | primary | 충분도 미지정 |
| 109 | akainu / default | 속도 | 86 | 0 | 86 | 86 | 0 | 86 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 110 | akainu / default | 숙련 | 91 | 0 | 91 | 91 | 0 | 91 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 111 | akainu / default | 전투지능 | 91 | 0 | 91 | 91 | 0 | 91 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 112 | akainu / default | 범용 | 91 | 0 | 91 | 91 | 0 | 91 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 113 | kuzan / default | 공격 | 91 | 4 | 93 | 93 | 0 | 93 | unset | kuzan-garp-haki-clash-1087 | secondary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 114 | kuzan / default | 방어 | 92 | 2 | 93 | 93 | 0 | 93 | unset | kuzan-sakazuki-duel-650<br>kuzan-garp-iceball-1081<br>kuzan-blue-hole-return-1081-1087<br>kuzan-admiral-barrier-564 | context,context,secondary,primary | 충분도 미지정 / Raw 독립 효과 미승인 |
| 115 | kuzan / default | 지구력 | 97 | 0 | 97 | 97 | 0 | 97 | unset | kuzan-sakazuki-duel-650<br>kuzan-blue-hole-return-1081-1087<br>kuzan-garp-haki-clash-1087 | primary,primary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 116 | kuzan / default | 속도 | 90 | 0 | 90 | 90 | 0 | 90 | unset | kuzan-garp-haki-clash-1087<br>kuzan-blue-hole-return-1081-1087 | secondary,context | 충분도 미지정 |
| 117 | kuzan / default | 숙련 | 91 | 4 | 93 | 93 | 0 | 93 | unset | kuzan-garp-iceball-1081<br>kuzan-garp-haki-clash-1087 | secondary,primary | 충분도 미지정 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 118 | kuzan / default | 전투지능 | 91 | 0 | 91 | 91 | 0 | 91 | unset | kuzan-garp-iceball-1081<br>kuzan-garp-haki-clash-1087 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 119 | kuzan / default | 범용 | 92 | 0 | 92 | 92 | 0 | 92 | unset | kuzan-garp-iceball-1081<br>kuzan-garp-haki-clash-1087 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 120 | kizaru / default | 공격 | 92 | 0 | 92 | 92 | 0 | 92 | unset | kizaru-luffy-clones-1093<br>kizaru-vegapunk-1108 | not-mapped,context | 충분도 미지정 / 근거 역할 검증 |
| 121 | kizaru / default | 방어 | 88 | 2 | 89 | 89 | 0 | 89 | unset | kizaru-star-gun-1094<br>kizaru-vegapunk-1108<br>kizaru-admiral-barrier-564 | primary,context,primary | 충분도 미지정 / Raw 독립 효과 미승인 |
| 122 | kizaru / default | 지구력 | 91 | 0 | 91 | 91 | 0 | 91 | unset | kizaru-star-gun-1094<br>kizaru-vegapunk-1108 | context,secondary | 충분도 미지정 |
| 123 | kizaru / default | 속도 | 99 | 0 | 99 | 99 | 0 | 99 | unset | kizaru-luffy-clones-1093 | primary | 충분도 미지정 |
| 124 | kizaru / default | 숙련 | 93 | 0 | 93 | 93 | 0 | 93 | unset | kizaru-luffy-clones-1093 | primary | 충분도 미지정 |
| 125 | kizaru / default | 전투지능 | 90 | 0 | 90 | 90 | 0 | 90 | unset | kizaru-luffy-clones-1093 | secondary | 충분도 미지정 |
| 126 | kizaru / default | 범용 | 91 | 0 | 91 | 91 | 0 | 91 | unset | kizaru-luffy-clones-1093 | primary | 충분도 미지정 |
| 127 | fujitora / default | 공격 | 91 | 0 | 91 | 91 | 0 | 91 | unset | fujitora-meteor-713 | secondary | 충분도 미지정 |
| 128 | fujitora / default | 방어 | 88 | 0 | 88 | 88 | 0 | 88 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 129 | fujitora / default | 지구력 | 87 | 0 | 87 | 87 | 0 | 87 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 130 | fujitora / default | 속도 | 85 | 0 | 85 | 85 | 0 | 85 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 131 | fujitora / default | 숙련 | 92 | 0 | 92 | 92 | 0 | 92 | unset | fujitora-meteor-713<br>fujitora-luffy-observation-799 | primary,secondary | 충분도 미지정 |
| 132 | fujitora / default | 전투지능 | 85 | 2 | 86 | 86 | 0 | 86 | unset | fujitora-luffy-observation-799 | secondary | 충분도 미지정 / Raw 독립 효과 미승인 |
| 133 | fujitora / default | 범용 | 94 | 0 | 94 | 94 | 0 | 94 | unset | fujitora-meteor-713<br>fujitora-luffy-observation-799 | secondary,secondary | 충분도 미지정 |
| 134 | ryokugyu / default | 공격 | 90 | 0 | 90 | 90 | 0 | 90 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 135 | ryokugyu / default | 방어 | 89 | 0 | 89 | 89 | 0 | 89 | unset | aramaki-shanks-haki-1055 | context | 충분도 미지정 |
| 136 | ryokugyu / default | 지구력 | 89 | 0 | 89 | 89 | 0 | 89 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 137 | ryokugyu / default | 속도 | 84 | 0 | 84 | 84 | 0 | 84 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 138 | ryokugyu / default | 숙련 | 87 | 0 | 87 | 87 | 0 | 87 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 139 | ryokugyu / default | 전투지능 | 82 | 0 | 82 | 82 | 0 | 82 | unset | aramaki-shanks-haki-1055 | context | 충분도 미지정 |
| 140 | ryokugyu / default | 범용 | 92 | 0 | 92 | 92 | 0 | 92 | unset | **없음** | — | **근거 연결 없음** / 충분도 미지정 |
| 141 | teach / default | 공격 | 95 | 0 | 95 | 95 | 0 | 95 | unset | teach-ace-440-441<br>teach-gura-577<br>teach-law-1063-1064<br>teach-kurouzu-441 | primary,primary,primary,context | 충분도 미지정 |
| 142 | teach / default | 방어 | 89 | 0 | 89 | 89 | 0 | 89 | unset | teach-ace-440-441<br>teach-whitebeard-576<br>teach-law-1063-1064<br>teach-hancock-nullification-1059 | secondary,context,not-mapped,context | 충분도 미지정 / 근거 역할 검증 |
| 143 | teach / default | 지구력 | 95 | 0 | 95 | 95 | 0 | 95 | unset | teach-whitebeard-576<br>teach-law-1063-1064<br>teach-heart-pirates-1081 | primary,primary,secondary | 충분도 미지정 |
| 144 | teach / default | 속도 | 82 | 0 | 82 | 82 | 0 | 82 | unset | teach-ace-440-441<br>teach-law-1063-1064 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 145 | teach / default | 숙련 | 93 | 0 | 93 | 93 | 0 | 93 | unset | teach-ace-440-441<br>teach-gura-577<br>teach-law-1063-1064<br>teach-kurouzu-441<br>teach-hancock-nullification-1059 | primary,secondary,not-mapped,primary,primary | 충분도 미지정 / 근거 역할 검증 |
| 146 | teach / default | 전투지능 | 87 | 0 | 87 | 87 | 0 | 87 | unset | teach-ace-440-441<br>teach-law-1063-1064<br>teach-kurouzu-441<br>teach-hancock-nullification-1059 | not-mapped,context,secondary,primary | 충분도 미지정 / 근거 역할 검증 |
| 147 | teach / default | 범용 | 93 | 0 | 93 | 93 | 0 | 93 | unset | teach-ace-440-441<br>teach-gura-577<br>teach-law-1063-1064<br>teach-hancock-nullification-1059 | primary,primary,primary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 148 | shiryu / default | 공격 | 78 | 0 | 78 | 78 | 0 | 78 | unset | shiryu-garp-1087 | context | 충분도 미지정 |
| 149 | shiryu / default | 방어 | 74 | 0 | 74 | 74 | 0 | 74 | unset | shiryu-garp-counter-1087 | context | 충분도 미지정 |
| 150 | shiryu / default | 지구력 | 75 | 0 | 75 | 75 | 0 | 75 | unset | shiryu-garp-1087 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 151 | shiryu / default | 속도 | 79 | 0 | 79 | 79 | 0 | 79 | unset | shiryu-garp-1087 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 152 | shiryu / default | 숙련 | 77 | 2 | 78 | 78 | 0 | 78 | unset | shiryu-garp-1087 | secondary | 충분도 미지정 / Raw 독립 효과 미승인 |
| 153 | shiryu / default | 전투지능 | 78 | 0 | 78 | 78 | 0 | 78 | unset | shiryu-garp-1087 | primary | 충분도 미지정 |
| 154 | shiryu / default | 범용 | 78 | 0 | 78 | 78 | 0 | 78 | unset | shiryu-garp-1087 | primary | 충분도 미지정 |
| 155 | van-augur / default | 공격 | 72 | 0 | 72 | 72 | 0 | 72 | unset | augur-jean-bart-1064 | context | 충분도 미지정 |
| 156 | van-augur / default | 방어 | 67 | 0 | 67 | 67 | 0 | 67 | unset | augur-warp-1063-1064 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 157 | van-augur / default | 지구력 | 68 | 0 | 68 | 68 | 0 | 68 | unset | augur-warp-1063-1064 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 158 | van-augur / default | 속도 | 75 | 0 | 75 | 75 | 0 | 75 | unset | augur-warp-1063-1064 | context | 충분도 미지정 |
| 159 | van-augur / default | 숙련 | 80 | 0 | 80 | 80 | 0 | 80 | unset | augur-warp-1063-1064<br>augur-jean-bart-1064 | primary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 160 | van-augur / default | 전투지능 | 78 | 0 | 78 | 78 | 0 | 78 | unset | augur-warp-1063-1064 | primary | 충분도 미지정 |
| 161 | van-augur / default | 범용 | 82 | 0 | 82 | 82 | 0 | 82 | unset | augur-warp-1063-1064 | primary | 충분도 미지정 |
| 162 | burgess / default | 공격 | 74 | 4 | 76 | 76 | 0 | 76 | unset | burgess-mountain-1063<br>burgess-sabo-737-792 | secondary,secondary | 충분도 미지정 / Raw 독립 효과 미승인 |
| 163 | burgess / default | 방어 | 74 | 0 | 74 | 74 | 0 | 74 | unset | burgess-sabo-737-792 | context | 충분도 미지정 |
| 164 | burgess / default | 지구력 | 79 | 0 | 79 | 79 | 0 | 79 | unset | burgess-sabo-737-792 | secondary | 충분도 미지정 |
| 165 | burgess / default | 속도 | 74 | 0 | 74 | 74 | 0 | 74 | unset | burgess-sabo-737-792 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 166 | burgess / default | 숙련 | 72 | 0 | 72 | 72 | 0 | 72 | unset | burgess-sabo-737-792<br>burgess-mountain-1063 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 167 | burgess / default | 전투지능 | 70 | 0 | 70 | 70 | 0 | 70 | unset | burgess-sabo-737-792 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 168 | burgess / default | 범용 | 74 | 0 | 74 | 74 | 0 | 74 | unset | burgess-mountain-1063 | secondary | 충분도 미지정 |
| 169 | pizarro / default | 공격 | 72 | 0 | 72 | 72 | 0 | 72 | unset | pizarro-island-1087-1088 | secondary | 충분도 미지정 |
| 170 | pizarro / default | 방어 | 74 | 0 | 74 | 74 | 0 | 74 | unset | pizarro-damage-link-1088 | context | 충분도 미지정 |
| 171 | pizarro / default | 지구력 | 74 | 0 | 74 | 74 | 0 | 74 | unset | pizarro-island-1087-1088 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 172 | pizarro / default | 속도 | 64 | 0 | 64 | 64 | 0 | 64 | unset | pizarro-island-1087-1088 | not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 173 | pizarro / default | 숙련 | 74 | 0 | 74 | 74 | 0 | 74 | unset | pizarro-island-1087-1088 | secondary | 충분도 미지정 |
| 174 | pizarro / default | 전투지능 | 70 | 0 | 70 | 70 | 0 | 70 | unset | pizarro-damage-link-1088 | context | 충분도 미지정 |
| 175 | pizarro / default | 범용 | 74 | 0 | 74 | 74 | 0 | 74 | unset | pizarro-island-1087-1088 | primary | 충분도 미지정 |
| 176 | law / default | 공격 | 86 | 0 | 86 | 86 | 0 | 86 | unset | law-big-mom-1039<br>law-puncture-wille-1039<br>law-teach-1064 | primary,primary,primary | 충분도 미지정 |
| 177 | law / default | 방어 | 83 | 0 | 83 | 83 | 0 | 83 | unset | law-big-mom-1039<br>law-teach-1064 | secondary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 178 | law / default | 지구력 | 85 | 0 | 85 | 85 | 0 | 85 | unset | law-big-mom-1039<br>law-puncture-wille-1039 | primary,primary | 충분도 미지정 |
| 179 | law / default | 속도 | 82 | 0 | 82 | 82 | 0 | 82 | unset | law-teach-1064 | secondary | 충분도 미지정 |
| 180 | law / default | 숙련 | 90 | 0 | 90 | 90 | 0 | 90 | unset | law-doflamingo-gamma-knife-781<br>law-big-mom-1039<br>law-haki-nullification-1063 | primary,secondary,secondary | 충분도 미지정 |
| 181 | law / default | 전투지능 | 88 | 0 | 88 | 88 | 0 | 88 | unset | law-doflamingo-gamma-knife-781<br>law-haki-nullification-1063 | primary,primary | 충분도 미지정 |
| 182 | law / default | 범용 | 91 | 0 | 91 | 91 | 0 | 91 | unset | law-doflamingo-gamma-knife-781<br>law-big-mom-1039<br>law-haki-nullification-1063<br>law-teach-1064 | secondary,not-mapped,secondary,secondary | 충분도 미지정 / 근거 역할 검증 |
| 183 | doflamingo / default | 공격 | 76 | 0 | 76 | 76 | 0 | 76 | unset | doflamingo-law-arm-769<br>doflamingo-gear4-784-785 | primary,context | 충분도 미지정 |
| 184 | doflamingo / default | 방어 | 74 | 0 | 74 | 74 | 0 | 74 | unset | doflamingo-gear4-784-785<br>doflamingo-organ-repair-781 | primary,context | 충분도 미지정 |
| 185 | doflamingo / default | 지구력 | 81 | 0 | 81 | 81 | 0 | 81 | unset | doflamingo-organ-repair-781<br>doflamingo-gear4-784-785 | primary,secondary | 충분도 미지정 |
| 186 | doflamingo / default | 속도 | 75 | 0 | 75 | 75 | 0 | 75 | unset | doflamingo-gear4-784-785 | primary | 충분도 미지정 |
| 187 | doflamingo / default | 숙련 | 87 | 0 | 87 | 87 | 0 | 87 | unset | doflamingo-law-arm-769<br>doflamingo-organ-repair-781<br>doflamingo-awakening-785 | primary,primary,primary | 충분도 미지정 |
| 188 | doflamingo / default | 전투지능 | 81 | 0 | 81 | 81 | 0 | 81 | unset | doflamingo-organ-repair-781<br>doflamingo-awakening-785 | secondary,secondary | 충분도 미지정 |
| 189 | doflamingo / default | 범용 | 83 | 0 | 83 | 83 | 0 | 83 | unset | doflamingo-law-arm-769<br>doflamingo-awakening-785<br>doflamingo-birdcage-781-790 | not-mapped,secondary,primary | 충분도 미지정 / 근거 역할 검증 |
| 190 | hancock / default | 공격 | 79 | 0 | 79 | 79 | 0 | 79 | unset | hancock-marineford-559<br>hancock-amazon-lily-1059 | primary,primary | 충분도 미지정 |
| 191 | hancock / default | 방어 | 76 | 0 | 76 | 76 | 0 | 76 | unset | hancock-amazon-lily-1059 | context | 충분도 미지정 |
| 192 | hancock / default | 지구력 | 77 | 0 | 77 | 77 | 0 | 77 | unset | hancock-marineford-559<br>hancock-amazon-lily-1059 | not-mapped,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 193 | hancock / default | 속도 | 80 | 0 | 80 | 80 | 0 | 80 | unset | hancock-marineford-559 | secondary | 충분도 미지정 |
| 194 | hancock / default | 숙련 | 82 | 0 | 82 | 82 | 0 | 82 | unset | hancock-marineford-559<br>hancock-amazon-lily-1059 | secondary,secondary | 충분도 미지정 |
| 195 | hancock / default | 전투지능 | 75 | 0 | 75 | 75 | 0 | 75 | unset | hancock-amazon-lily-1059 | secondary | 충분도 미지정 |
| 196 | hancock / default | 범용 | 82 | 0 | 82 | 82 | 0 | 82 | unset | hancock-marineford-559<br>hancock-amazon-lily-1059 | not-mapped,secondary | 충분도 미지정 / 근거 역할 검증 |
| 197 | mihawk / default | 공격 | 96 | 0 | 96 | 96 | 0 | 96 | unset | mihawk-jozu-553<br>mihawk-luffy-560-561<br>mihawk-shanks-swordskill-1058 | primary,primary,secondary | 충분도 미지정 |
| 198 | mihawk / default | 방어 | 93 | 0 | 93 | 93 | 0 | 93 | unset | mihawk-zoro-49-51<br>mihawk-vista-561-562<br>mihawk-shanks-rivalry-profile | secondary,primary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 199 | mihawk / default | 지구력 | 91 | 0 | 91 | 91 | 0 | 91 | unset | mihawk-vista-561-562<br>mihawk-shanks-rivalry-profile | context,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 200 | mihawk / default | 속도 | 94 | 0 | 94 | 94 | 0 | 94 | unset | mihawk-luffy-560-561<br>mihawk-vista-561-562<br>mihawk-shanks-rivalry-profile | primary,secondary,context | 충분도 미지정 |
| 201 | mihawk / default | 숙련 | 99 | 0 | 99 | 99 | 0 | 99 | unset | mihawk-world-strongest-profile<br>mihawk-shanks-swordskill-1058<br>mihawk-zoro-49-51<br>mihawk-vista-561-562 | primary,primary,primary,primary | 충분도 미지정 |
| 202 | mihawk / default | 전투지능 | 92 | 0 | 92 | 92 | 0 | 92 | unset | mihawk-zoro-49-51<br>mihawk-luffy-560-561 | secondary,secondary | 충분도 미지정 |
| 203 | mihawk / default | 범용 | 84 | 0 | 84 | 84 | 0 | 84 | unset | mihawk-jozu-553<br>mihawk-luffy-560-561<br>mihawk-zoro-49-51 | secondary,secondary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 204 | crocodile / default | 공격 | 76 | 0 | 76 | 76 | 0 | 76 | unset | crocodile-alabasta-mastery-178-209<br>crocodile-marineford-interventions-561-578 | secondary,context | 충분도 미지정 |
| 205 | crocodile / default | 방어 | 72 | 0 | 72 | 72 | 0 | 72 | unset | crocodile-water-weakness-199<br>crocodile-jozu-560 | primary,primary | 충분도 미지정 |
| 206 | crocodile / default | 지구력 | 77 | 0 | 77 | 77 | 0 | 77 | unset | crocodile-alabasta-mastery-178-209<br>crocodile-jozu-560<br>crocodile-marineford-interventions-561-578 | secondary,secondary,secondary | 충분도 미지정 |
| 207 | crocodile / default | 속도 | 74 | 0 | 74 | 74 | 0 | 74 | unset | crocodile-marineford-interventions-561-578 | secondary | 충분도 미지정 |
| 208 | crocodile / default | 숙련 | 86 | 0 | 86 | 86 | 0 | 86 | unset | crocodile-alabasta-mastery-178-209<br>crocodile-marineford-interventions-561-578 | primary,not-mapped | 충분도 미지정 / 근거 역할 검증 |
| 209 | crocodile / default | 전투지능 | 86 | 0 | 86 | 86 | 0 | 86 | unset | crocodile-alabasta-mastery-178-209<br>crocodile-water-weakness-199<br>crocodile-marineford-interventions-561-578 | primary,context,primary | 충분도 미지정 |
| 210 | crocodile / default | 범용 | 82 | 0 | 82 | 82 | 0 | 82 | unset | crocodile-alabasta-mastery-178-209<br>crocodile-marineford-interventions-561-578 | primary,primary | 충분도 미지정 |
| 211 | roger / prime | 공격 | 96 | 8 | 100 | 100 | 0 | 100 | E1 | roger-kamusari-newgate-966<br>roger-haki-analysis-rocks-1165 | primary,primary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 / 100점 상한 |
| 212 | roger / prime | 방어 | 95 | 8 | 99 | 99 | 0 | 99 | E2 | roger-kamusari-newgate-966<br>roger-haki-analysis-rocks-1165 | not-mapped,primary | 근거 역할 검증 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 213 | roger / prime | 지구력 | 99 | 0 | 99 | 99 | 0 | 99 | E1 | roger-kamusari-newgate-966<br>roger-rocks-aftereffect-1166 | primary,context | 원작 단위 정성 검증 필요 |
| 214 | roger / prime | 속도 | 98 | 0 | 98 | 98 | 0 | 98 | E2 | roger-kamusari-newgate-966<br>roger-haki-analysis-rocks-1165 | secondary,not-mapped | 근거 역할 검증 |
| 215 | roger / prime | 숙련 | 95 | 8 | 99 | 99 | 0 | 99 | E1 | roger-kamusari-newgate-966<br>roger-haki-analysis-rocks-1165 | primary,primary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 216 | roger / prime | 전투지능 | 97 | 0 | 97 | 97 | 0 | 97 | E1 | roger-haki-analysis-rocks-1165<br>roger-rocks-aftereffect-1166 | primary,context | 원작 단위 정성 검증 필요 |
| 217 | roger / prime | 범용 | 91 | 0 | 91 | 91 | 0 | 91 | E2 | roger-kamusari-newgate-966<br>roger-haki-analysis-rocks-1165 | not-mapped,not-mapped | 근거 역할 검증 |
| 218 | rayleigh-prime / prime | 공격 | 94 | 0 | 94 | 94 | 0 | 94 | E2 | rayleigh-prime-sommers-1161<br>rayleigh-kizaru-512 | primary,primary | 원작 단위 정성 검증 필요 |
| 219 | rayleigh-prime / prime | 방어 | 92 | 0 | 92 | 92 | 0 | 92 | E2 | rayleigh-kizaru-512<br>rayleigh-prime-sommers-1161 | primary,not-mapped | 근거 역할 검증 |
| 220 | rayleigh-prime / prime | 지구력 | 91 | 0 | 91 | 91 | 0 | 91 | E2 | rayleigh-kizaru-512<br>rayleigh-prime-sommers-1161 | secondary,not-mapped | 근거 역할 검증 |
| 221 | rayleigh-prime / prime | 속도 | 93 | 0 | 93 | 93 | 0 | 93 | E2 | rayleigh-prime-sommers-1161<br>rayleigh-kizaru-512 | primary,primary | 원작 단위 정성 검증 필요 |
| 222 | rayleigh-prime / prime | 숙련 | 96 | 0 | 96 | 96 | 0 | 96 | E2 | rayleigh-kizaru-512<br>rayleigh-haki-training-597<br>rayleigh-prime-sommers-1161 | primary,primary,secondary | 원작 단위 정성 검증 필요 |
| 223 | rayleigh-prime / prime | 전투지능 | 95 | 0 | 95 | 95 | 0 | 95 | E2 | rayleigh-haki-training-597<br>rayleigh-prime-sommers-1161 | secondary,secondary | 원작 단위 정성 검증 필요 |
| 224 | rayleigh-prime / prime | 범용 | 89 | 0 | 89 | 89 | 0 | 89 | E2 | rayleigh-kizaru-512<br>rayleigh-haki-training-597<br>rayleigh-prime-sommers-1161 | not-mapped,not-mapped,not-mapped | 근거 역할 검증 |
| 225 | rayleigh-current / current | 공격 | 87 | 4 | 89 | 89 | 0 | 89 | E1 | rayleigh-kizaru-512<br>rayleigh-haki-training-597<br>rayleigh-teach-selfassessment-1059 | primary,secondary,context | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 226 | rayleigh-current / current | 방어 | 89 | 0 | 89 | 89 | 0 | 89 | E1 | rayleigh-kizaru-512<br>rayleigh-teach-selfassessment-1059 | primary,not-mapped | 근거 역할 검증 |
| 227 | rayleigh-current / current | 지구력 | 86 | 0 | 86 | 86 | 0 | 86 | E2 | rayleigh-kizaru-512<br>rayleigh-teach-selfassessment-1059 | secondary,context | 원작 단위 정성 검증 필요 |
| 228 | rayleigh-current / current | 속도 | 91 | 0 | 91 | 91 | 0 | 91 | E1 | rayleigh-kizaru-512 | primary | 원작 단위 정성 검증 필요 |
| 229 | rayleigh-current / current | 숙련 | 94 | 4 | 96 | 96 | 0 | 96 | E1 | rayleigh-kizaru-512<br>rayleigh-haki-training-597 | primary,primary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 230 | rayleigh-current / current | 전투지능 | 94 | 0 | 94 | 94 | 0 | 94 | E1 | rayleigh-kizaru-512<br>rayleigh-teach-selfassessment-1059 | not-mapped,primary | 근거 역할 검증 |
| 231 | rayleigh-current / current | 범용 | 87 | 0 | 87 | 87 | 0 | 87 | E2 | rayleigh-kizaru-512<br>rayleigh-haki-training-597<br>rayleigh-teach-selfassessment-1059 | not-mapped,not-mapped,not-mapped | 근거 역할 검증 |
| 232 | gaban-current / current | 공격 | 91 | 0 | 91 | 91 | 0 | 91 | E2 | gaban-luffy-1140<br>gaban-sommers-1148<br>gaban-imu-1189-1192 | primary,primary,context | 원작 단위 정성 검증 필요 |
| 233 | gaban-current / current | 방어 | 90 | 0 | 90 | 90 | 0 | 90 | E2 | gaban-luffy-1140<br>gaban-imu-1189-1192 | secondary,primary | 원작 단위 정성 검증 필요 |
| 234 | gaban-current / current | 지구력 | 92 | 0 | 92 | 92 | 0 | 92 | E1 | gaban-sommers-1148<br>gaban-imu-1189-1192 | not-mapped,primary | 근거 역할 검증 |
| 235 | gaban-current / current | 속도 | 94 | 0 | 94 | 94 | 0 | 94 | E1 | gaban-luffy-1140<br>gaban-imu-1189-1192 | primary,secondary | 원작 단위 정성 검증 필요 |
| 236 | gaban-current / current | 숙련 | 95 | 0 | 95 | 95 | 0 | 95 | E1 | gaban-luffy-1140<br>gaban-sommers-1148<br>gaban-knights-haki-1170 | primary,primary,context | 원작 단위 정성 검증 필요 |
| 237 | gaban-current / current | 전투지능 | 94 | 2 | 95 | 95 | 0 | 95 | E1 | gaban-future-sight-1149<br>gaban-knights-haki-1170<br>gaban-imu-1189-1192 | primary,secondary,primary | Raw 독립 효과 미승인 |
| 238 | gaban-current / current | 범용 | 88 | 0 | 88 | 88 | 0 | 88 | E2 | gaban-luffy-1140<br>gaban-sommers-1148<br>gaban-future-sight-1149<br>gaban-imu-1189-1192 | not-mapped,secondary,not-mapped,not-mapped | 근거 역할 검증 |
| 239 | rocks / god-valley-natural | 공격 | 96 | 8 | 100 | 100 | 0 | 100 | E1 | rocks-harald-1155<br>rocks-garling-1162<br>rocks-imu-natural-1163 | primary,primary,secondary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 / 100점 상한 |
| 240 | rocks / god-valley-natural | 방어 | 94 | 8 | 98 | 98 | 0 | 98 | E2 | rocks-harald-1155<br>rocks-garling-1162 | secondary,not-mapped | 근거 역할 검증 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 241 | rocks / god-valley-natural | 지구력 | 97 | 0 | 97 | 97 | 0 | 97 | E2 | rocks-garling-1162<br>rocks-demonized-context-1164-1166 | not-mapped,context | 근거 역할 검증 |
| 242 | rocks / god-valley-natural | 속도 | 98 | 0 | 98 | 98 | 0 | 98 | E2 | rocks-harald-1155<br>rocks-garling-1162 | secondary,primary | 원작 단위 정성 검증 필요 |
| 243 | rocks / god-valley-natural | 숙련 | 94 | 8 | 98 | 98 | 0 | 98 | E1 | rocks-harald-1155<br>rocks-garling-1162 | primary,not-mapped | 근거 역할 검증 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 244 | rocks / god-valley-natural | 전투지능 | 96 | 0 | 96 | 96 | 0 | 96 | E2 | rocks-garling-1162<br>rocks-imu-natural-1163 | primary,not-mapped | 근거 역할 검증 |
| 245 | rocks / god-valley-natural | 범용 | 94 | 0 | 94 | 94 | 0 | 94 | E2 | rocks-harald-1155<br>rocks-garling-1162<br>rocks-imu-natural-1163 | not-mapped,secondary,context | 근거 역할 검증 |
| 246 | newgate-prime / prime | 공격 | 96 | 8 | 100 | 100 | 0 | 100 | E1 | newgate-roger-966<br>newgate-imu-1163 | primary,secondary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 / 100점 상한 |
| 247 | newgate-prime / prime | 방어 | 95 | 8 | 99 | 99 | 0 | 99 | E1 | newgate-roger-966 | primary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 248 | newgate-prime / prime | 지구력 | 99 | 0 | 99 | 99 | 0 | 99 | E1 | newgate-roger-966 | primary | 원작 단위 정성 검증 필요 |
| 249 | newgate-prime / prime | 속도 | 96 | 0 | 96 | 96 | 0 | 96 | E2 | newgate-roger-966<br>newgate-imu-1163 | not-mapped,not-mapped | 근거 역할 검증 |
| 250 | newgate-prime / prime | 숙련 | 94 | 8 | 98 | 98 | 0 | 98 | E1 | newgate-roger-966<br>newgate-imu-1163 | primary,not-mapped | 근거 역할 검증 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 251 | newgate-prime / prime | 전투지능 | 95 | 0 | 95 | 95 | 0 | 95 | E2 | newgate-roger-966<br>newgate-imu-1163 | not-mapped,not-mapped | 근거 역할 검증 |
| 252 | newgate-prime / prime | 범용 | 96 | 0 | 96 | 96 | 0 | 96 | E1 | newgate-roger-966<br>newgate-imu-1163 | not-mapped,secondary | 근거 역할 검증 |
| 253 | newgate-marineford / marineford | 공격 | 98 | 0 | 98 | 98 | 0 | 98 | E1 | newgate-akainu-575-576<br>newgate-blackbeard-576 | primary,secondary | 원작 단위 정성 검증 필요 |
| 254 | newgate-marineford / marineford | 방어 | 88 | 0 | 88 | 88 | 0 | 88 | E1 | newgate-marineford-health-563-568<br>newgate-akainu-575-576 | primary,not-mapped | 근거 역할 검증 |
| 255 | newgate-marineford / marineford | 지구력 | 95 | 0 | 95 | 95 | 0 | 95 | E1 | newgate-marineford-health-563-568<br>newgate-akainu-575-576<br>newgate-blackbeard-576 | context,primary,primary | 원작 단위 정성 검증 필요 |
| 256 | newgate-marineford / marineford | 속도 | 88 | 0 | 88 | 88 | 0 | 88 | E1 | newgate-marineford-health-563-568<br>newgate-akainu-575-576 | primary,not-mapped | 근거 역할 검증 |
| 257 | newgate-marineford / marineford | 숙련 | 94 | 0 | 94 | 94 | 0 | 94 | E2 | newgate-akainu-575-576<br>newgate-blackbeard-576 | not-mapped,not-mapped | 근거 역할 검증 |
| 258 | newgate-marineford / marineford | 전투지능 | 92 | 0 | 92 | 92 | 0 | 92 | E2 | newgate-blackbeard-576<br>newgate-marineford-health-563-568 | secondary,not-mapped | 근거 역할 검증 |
| 259 | newgate-marineford / marineford | 범용 | 95 | 0 | 95 | 95 | 0 | 95 | E2 | newgate-akainu-575-576<br>newgate-blackbeard-576 | secondary,not-mapped | 근거 역할 검증 |
| 260 | kaido / onigashima-prime | 공격 | 95 | 6 | 98 | 98 | 0 | 98 | E1 | kaido-linlin-951<br>kaido-hakai-haki-1009<br>kaido-zoro-luffy-1010 | primary,secondary,primary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 261 | kaido / onigashima-prime | 방어 | 98 | 2 | 99 | 99 | 0 | 99 | E1 | kaido-linlin-951<br>kaido-future-sight-1042<br>kaido-raid-endurance-1000-1049 | primary,primary,primary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 262 | kaido / onigashima-prime | 지구력 | 100 | 0 | 100 | 100 | 0 | 100 | E1 | kaido-zoro-luffy-1010<br>kaido-raid-endurance-1000-1049 | primary,primary | 100점 상한 |
| 263 | kaido / onigashima-prime | 속도 | 96 | 0 | 96 | 96 | 0 | 96 | E1 | kaido-future-sight-1042<br>kaido-raid-endurance-1000-1049 | secondary,not-mapped | 근거 역할 검증 |
| 264 | kaido / onigashima-prime | 숙련 | 93 | 6 | 96 | 96 | 0 | 96 | E1 | kaido-zoro-luffy-1010<br>kaido-raid-endurance-1000-1049 | primary,not-mapped | 근거 역할 검증 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 265 | kaido / onigashima-prime | 전투지능 | 90 | 2 | 91 | 91 | 0 | 91 | E1 | kaido-future-sight-1042<br>kaido-raid-endurance-1000-1049 | primary,not-mapped | 근거 역할 검증 / Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 266 | kaido / onigashima-prime | 범용 | 96 | 0 | 96 | 96 | 0 | 96 | E1 | kaido-raid-endurance-1000-1049<br>kaido-hakai-haki-1009 | primary,not-mapped | 근거 역할 검증 |
| 267 | linlin / onigashima-prime | 공격 | 95 | 6 | 98 | 98 | 0 | 98 | E1 | linlin-kaido-951<br>linlin-hakai-haki-1009<br>linlin-pageone-1011 | primary,secondary,primary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 268 | linlin / onigashima-prime | 방어 | 99 | 0 | 99 | 99 | 0 | 99 | E1 | linlin-kaido-951<br>linlin-law-kid-1039<br>linlin-defeat-context-1040 | primary,primary,not-mapped | 근거 역할 검증 |
| 269 | linlin / onigashima-prime | 지구력 | 99 | 0 | 99 | 99 | 0 | 99 | E1 | linlin-law-kid-1039<br>linlin-defeat-context-1040 | primary,primary | 원작 단위 정성 검증 필요 |
| 270 | linlin / onigashima-prime | 속도 | 89 | 0 | 89 | 89 | 0 | 89 | E1 | linlin-kaido-951<br>linlin-defeat-context-1040 | not-mapped,secondary | 근거 역할 검증 |
| 271 | linlin / onigashima-prime | 숙련 | 91 | 6 | 94 | 94 | 0 | 94 | E1 | linlin-pageone-1011<br>linlin-law-kid-1039 | primary,primary | Raw 독립 효과 미승인 / 다축 Haki Evidence 재사용 |
| 272 | linlin / onigashima-prime | 전투지능 | 84 | 0 | 84 | 84 | 0 | 84 | E1 | linlin-defeat-context-1040<br>linlin-law-kid-1039 | primary,not-mapped | 근거 역할 검증 |
| 273 | linlin / onigashima-prime | 범용 | 97 | 0 | 97 | 97 | 0 | 97 | E1 | linlin-hakai-haki-1009<br>linlin-law-kid-1039<br>linlin-defeat-context-1040 | not-mapped,primary,primary | 근거 역할 검증 |

## 39-state summary

| Evaluation / era | Current Overall | Typed Raw Sum | Missing Evidence (Stat) | Unset Readiness / 7 | Capped 100 (Stat) |
|---|---:|---:|---|---:|---|
| evaluation-marco / default | 81.714 | 2 | — | 7 | — |
| evaluation-jozu / default | 77.429 | 4 | — | 7 | — |
| evaluation-vista / default | 79.429 | 6 | — | 7 | — |
| evaluation-king / default | 81.286 | 6 | — | 7 | — |
| evaluation-queen / default | 78.571 | 0 | — | 7 | — |
| evaluation-jack / default | 74.857 | 0 | — | 7 | — |
| evaluation-katakuri / default | 82.714 | 20 | — | 7 | — |
| evaluation-smoothie / default | 76.571 | 0 | speed | 7 | — |
| evaluation-cracker / default | 77.857 | 4 | — | 7 | — |
| evaluation-zoro / default | 84.714 | 18 | — | 7 | — |
| evaluation-sanji / default | 84.429 | 4 | — | 7 | — |
| evaluation-jinbe / default | 79.571 | 8 | — | 7 | — |
| evaluation-shanks / default | 92.571 | 18 | stamina | 7 | — |
| evaluation-garp / prime | 97.429 | 24 | — | 7 | — |
| evaluation-garp-current / current | 94.429 | 10 | — | 0 | — |
| evaluation-akainu / default | 92.429 | 2 | speed, techniqueMastery, combatIQ, versatility | 7 | — |
| evaluation-kuzan / default | 92.714 | 10 | — | 7 | — |
| evaluation-kizaru / default | 92.143 | 2 | — | 7 | — |
| evaluation-fujitora / default | 89.000 | 2 | defense, stamina, speed | 7 | — |
| evaluation-ryokugyu / default | 87.571 | 0 | attack, stamina, speed, techniqueMastery, versatility | 7 | — |
| evaluation-teach / default | 90.571 | 0 | — | 7 | — |
| evaluation-shiryu / default | 77.143 | 2 | — | 7 | — |
| evaluation-van-augur / default | 74.571 | 0 | — | 7 | — |
| evaluation-burgess / default | 74.143 | 4 | — | 7 | — |
| evaluation-pizarro / default | 71.714 | 0 | — | 7 | — |
| evaluation-law / default | 86.429 | 0 | — | 7 | — |
| evaluation-doflamingo / default | 79.571 | 0 | — | 7 | — |
| evaluation-hancock / default | 78.714 | 0 | — | 7 | — |
| evaluation-mihawk / default | 92.714 | 0 | — | 7 | — |
| evaluation-crocodile / default | 79.000 | 0 | — | 7 | — |
| evaluation-roger / prime | 97.571 | 24 | — | 0 | attack |
| evaluation-rayleigh-prime / prime | 92.857 | 0 | — | 0 | — |
| evaluation-rayleigh-current / current | 90.286 | 8 | — | 0 | — |
| evaluation-gaban-current / current | 92.143 | 2 | — | 0 | — |
| evaluation-rocks / god-valley-natural | 97.286 | 24 | — | 0 | attack |
| evaluation-newgate-prime / prime | 97.571 | 24 | — | 0 | attack |
| evaluation-newgate-marineford / marineford | 92.857 | 0 | — | 0 | — |
| evaluation-kaido / onigashima-prime | 96.571 | 16 | — | 0 | stamina |
| evaluation-linlin / onigashima-prime | 94.286 | 12 | — | 0 | — |

## Audit outcome gate

All 273 existing Stat rows are registered, but no revised numeric Stat candidate can be certified without reviewing the original evidence detail, combat context, Base overlap and peer-character comparative anchors. These flags are not equivalent to 273 canon-panel verifications.
