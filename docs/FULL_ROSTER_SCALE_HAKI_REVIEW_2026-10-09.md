# Full-roster Scale & Hybrid Haki Review — 2026-10-09

**Status:** evidence/calibration triage and a *design proposal*, not a new official Evaluation or a new Calculation Model. No existing score, Haki Raw, model Weight, character membership, Battle, Matchup, Haki capability, or PROJECT_SPEC has been edited as part of this report.

**Reproducible source:** main at `064fe67e5a33467838fac1f91e7ccddf401af7c2` (merged PR #22); `src/data/sample/evaluations.ts`, `characters.ts`, `evidence.ts`, `battles.ts`, `PROJECT_SPEC.md`. Baseline: **37 Characters / 39 numerical Evaluations / 36 default roster entries**. Garp, Rayleigh, Newgate each have multiple era/state evaluations. Full rankings list only one default evaluation per character.

## 1. What was actually checked

1. Extracted every Evaluation's seven final numeric Stat values, its total Raw Haki contribution, and whether any Stat rationale has *no linked Evidence*. These checks cover **39/39 Evaluations and 273/273 numeric Stat rows**.
2. Checked source model's `FinalStat=min(100, Base+Raw*0.5)`; mean of the seven Final stats; no probability or deterministic 1v1 winner is inferred.
3. Compared scores with explicitly documented direct outcomes/contexts: Sakazuki–Kuzan, Shanks–Kid, Katakuri–Luffy, Kaido–Linlin, Mihawk–Shanks rivalry, Garp–Kuzan, Crocodile–Jozu, Zoro–King, Sanji–Queen, Law–Teach and commanders' encounters.
4. Included inherited v0.1.34 semantic flags: **51 Stat rows with positive Haki, 53 positive typed contributions, Raw sum 256, 15 different-stat reused-Evidence records, 2 same-stat multiple-Haki-type stacks**. These are *candidates for semantic review, not proven numeric flaws*.
5. Surveyed readiness: 273 stat rows, **45 E1 / 25 E2 / 203 unset**, 0 E3 explicitly assigned in numerical Evaluations. **Unset does not mean low readiness, E3, or low power.**
6. This is a **systematic data consistency and evidence-density audit, not a completed canon-by-canon verification of all 273 judgments**. The risk classifications below direct follow-up manga-panel review; no unsupported score is substituted.

## 2. Reproducible rank sensitivity

The 36-character default ranking when hypothetically **excluding** current typed Raw (Weight 0), using the **actual** model (Weight 0.5), and **doubling** typed Raw (Weight 1), all with unchanged Base:
- Shanks: **13 → 10 → 7**, Overall **91.286 → 92.571** at 0 and 0.5.
- Sakazuki: **9 → 11 → 11**, Overall **92.286 → 92.429** at 0 and 0.5.
- Kuzan: **10 → 8 → 8**, Overall **92.000 → 92.714** at 0 and 0.5.
- Mihawk: **8 → 9 → 10**, Overall remains **92.714** at 0 and 0.5 (Raw 0).
- Prime Rayleigh: **7 → 7 → 9**, Raw 0 (others overtake as Weight rises).
- Linlin: **6 → 6 → 6**, Overall **93.429 → 94.286** at 0 and 0.5.
- Katakuri: **21 → 20 → 20**, Overall **81.286 → 82.714** at 0 and 0.5.
- Current overall close values can change ordering with only **+1 Final point in one Stat = +1/7 Overall = 0.142857**. This is a property of the arithmetic, *not evidence that +1 is deserved*.

**Caution:** Weight 0 is only a mechanical sensitivity counterfactual. Base has not been re-normalized under the proposed hybrid semantics. It must not be presented as an equally valid canon-derived alternate ranking.

## 3. Systematic 39-Evaluation calibration triage

Key: **P0** = urgent review for anchor/scaling or high numeric/semantic impact; **P1** = normal in-depth review; **P2** = lower-first-pass urgency, *not confirmed accurate*. Score is current inherited Overall, not a proposed revision. "Evidence gap" means existing item lacks any linked Evidence IDs; it does **not** automatically establish a wrong score.

| Evaluation / state | Overall | Sum Raw | Priority | Specific evidence/calibration question |
|---|---:|---:|---|---|
| Roger / prime | 97.571 | 24 | P0 | Reused Ch.1165 Conqueror's Evidence across three Raw stats, combined Garp attack and capped Attack 100; distinguish party combat from solo feats |
| Newgate / prime | 97.571 | 24 | P0 | Ch.966 Conqueror's clash repeated Attack/Defense/Technique; entire crews' three-day combat vs individual Stamina |
| Garp / prime | 97.429 | 24 | P0 | God Valley combined attack and uncertain independent Haki defense; all seven readiness flags currently unset |
| Rocks / natural God Valley | 97.286 | 24 | P0 | Attack 100, separate direct defense from sword/Haki collision and avoid transferring transformed-rocks feats to natural state |
| Kaido / Onigashima | 96.571 | 16 | P0 | Distinguish full raid/continuous multi-opponent attrition from solo fight, Future Sight Defense/Combat IQ independent benefit; Stamina 100 cap |
| Garp / current | 94.429 | 10 | P1 | Hachinosu rescue and injury context, attack/counterplay vs Kuzan, preserve prime/current distinction |
| Linlin / Onigashima | 94.286 | 12 | P0 | Defense 99/Stamina 99/Versatility 97 valid direct feats vs the Shanks gap; compare 2v1 ring-out and her 84 Combat IQ |
| Rayleigh / prime | 92.857 | 0 | P0 | Seven E2 axes, Raw 0 despite later mastery, extrapolation from older era and minimal prime direct battle, no invented bonus |
| Newgate / Marineford | 92.857 | 0 | P1 | Health limitations, no Raw despite prime skill, era-specific damage / Stamina 95; avoid mixing baseline age & illness |
| Kuzan | 92.714 | 10 | P0 | Loses 10-day Sakazuki duel yet slightly higher Overall; Speed 90/Technique 93 evidence comes partly from Garp-era showcase |
| Mihawk | 92.714 | 0 | P0 | Strongest-swordsman title confirms technique, NOT separate armament/conqueror application; Technique 99, other axes and Raw 0 need evidence readiness |
| Shanks | 92.571 | 18 | P0 | Conqueror's and Observation from single Kid scene, same-stat two-type Technique, Stamina 88 has **no linked Evidence**; compare Linlin and Mihawk symmetrically |
| Sakazuki | 92.429 | 2 | P0 | Canon winner against Kuzan; **Speed, Technique, Combat IQ, Versatility have no linked Evidence**; low recorded Raw must not imply inferior Haki |
| Borsalino/Kizaru | 92.143 | 2 | P1 | Speed 99 based on light toolkit; separate straight-line mobility, reaction, attack access and limited combat context |
| Gaban / current | 92.143 | 2 | P0 | Limited Elbaf encounters plus E1/E2 mixture; difficult anchor against other 92-range fighters; no extrapolation to unscored prime |
| Teach | 90.571 | 0 | P1 | 0 typed Haki despite direct Haki defense/counter examples; fruit nullification, collateral/group conditions and durable-vs-defensive distinction |
| Rayleigh / current | 90.286 | 8 | P1 | Showdown with Kizaru and training, age affects stamina; limited duration and uncertainty vs Blackbeard negotiation |
| Fujitora | 89.000 | 2 | P1 | Defense, Stamina, Speed **no linked Evidence**; Dressrosa restraint/collateral risk, meteor and gravity control require context |
| Ryokugyu | 87.571 | 0 | P0 | **Five** unlinked stats: Attack, Stamina, Speed, Technique, Versatility; Shanks/Red Hair retreat is not a definitive 1v1 loss |
| Law | 86.429 | 0 | P1 | No typed Raw despite confirmed Haki and actual ability-negation use; awakening and special matchup conditions should not be generic Haki bonus |
| Zoro | 84.714 | 18 | P0 | Armament 4 + Conqueror's 6 in the same Attack vs King Evidence; confirm independent marginal effects, Enma mastery vs base |
| Sanji | 84.429 | 4 | P1 | Speed 91 plus Ifrit Armament Attack +4; distinguish biological enhancement / speed / heat / explicit Haki application and Queen's condition |
| Katakuri | 82.714 | 20 | P0 | Official exceptional Future Sight, single Evidence supports Defense/Technique/Combat IQ Raw; no prediction-derived raw Speed; comparison with other specialists |
| Marco | 81.714 | 2 | P1 | Regeneration and attack blocking vs Stamina; multi-party fight with King/Queen; don't count healing as direct Defense |
| King | 81.286 | 6 | P1 | Lunarian flame-state Defense, switching Speed vs Defense, Armament Attack/Technique overlap |
| Jinbe | 79.571 | 8 | P1 | Karate mastery vs Armament attack/defense split; five-day duel with Ace is context for stamina, not same-era power equality |
| Doflamingo | 79.571 | 0 | P1 | Confirmed Haki Raw 0, Dressrosa injury + Birdcage external effects; ability breadth and performance still assessed in Base |
| Vista | 79.429 | 6 | P1 | Mihawk short clash and Sakazuki Armament; don't promote brief access to general swordmaster superiority |
| Crocodile | 79.000 | 0 | P1 | Marineford multi-front scenes, pre/post Alabasta environment and matchup with Jozu; possible recency-era exposure mismatch |
| Hancock | 78.714 | 0 | P1 | Conqueror's capability is not demonstrated infusion; conditional petrification is a matchup win condition, not flat Attack |
| Queen | 78.571 | 0 | P1 | Haki capable but Raw 0, modified body/technology vs technique and versatility; comparable opponent conditions vs Sanji |
| Cracker | 77.857 | 4 | P1 | Multiple biscuit soldiers, long Luffy/Nami engagement; distinguish duration/opponent assistance and Armament strength |
| Jozu | 77.429 | 4 | P1 | Landed Kuzan blow and later distraction-based freeze; compare 84 Defense and 74 Technique vs Mihawk/Crocodile interactions |
| Shiryu | 77.143 | 2 | P2 | Invisibility ambush with Garp protecting Koby, avoid assuming neutral 1v1 power or generic Speed superiority |
| Smoothie | 76.571 | 0 | P0 | **Speed has no linked Evidence**; sparse direct combat panels + high authority/role portrayal may create false precision |
| Jack | 74.857 | 0 | P2 | Zou multi-day conflict, Mink Sulong at Onigashima, collateral/health/siege context; stamina vs attack separation |
| Van Augur | 74.571 | 0 | P2 | Sniping + warp access, multi-person winner-island encounter; distinguish Accuracy/Technique vs mobility and command |
| Burgess | 74.143 | 4 | P2 | Sabo confrontation vs post-fruit power, do not project Strong-Strong fruit backward to Dressrosa |
| Pizarro | 71.714 | 0 | P2 | Island merger/form of terrain and highly situational defense, low Speed 64 vs urban/sea environments |

**Important:** Priority is **investigation urgency, not evidence-certified score correctness or a required rise/fall**. In particular, every item labeled P2 still requires real panel-to-stat review before declaring an official Calibration. **No numeric before/after scores are proposed** yet.

## 4. User's 'officially exceptional Haki only' proposal

### What can be established from official material

- **Katakuri's Observation**: ONE PIECE.com explains that his trained Observation reveals the near future and describes it as the key to his evasive combat. The case clearly qualifies for an *exceptional ability recognition tag*. See Episode 830 (https://one-piece.com/anime/o4671/index.html) and Whole Cake Island story (https://one-piece.com/story/wholecakeisland/index.html).
- **Shanks' Conqueror's**: extreme-distance Haki pressures Ryokugyu into withdrawing (Episode 1082, https://one-piece.com/anime/64187/index.html). His future foresight and Kamusari against Kid are independently documented (Episode 1112, https://one-piece.com/anime/67527/index.html). This provides strong capability/application evidence, **but the event is not proof of a quantitative +N across all seven stats**.
- **Garp's Armament**: his exceptional physical blows, Haki-bearing exchange with Kuzan and battleship-punch training are directly documented (Episode 1121, https://one-piece.com/anime/69144/index.html). However **"Garp officially has the strongest Armament Haki" is NOT established by these sources**. Physical force, armament and potentially other Haki applications must not be conflated. Classification is **candidate pending type-specific verification**, not automatically certified "strongest armament".
- **Mihawk's sword mastery**: official "world's strongest swordsman" profile (https://one-piece.com/character/Dracule_Mihawk/index.html) supports sword technique, but **does not itself confirm a numeric exceptionally strong Armament/Observation application**.
- **Sakazuki's victory over Kuzan**: official Sakazuki biography (https://one-piece.com/character/Sakazuki/index.html) explicitly says he defeated Kuzan and became Fleet Admiral. Does not prove the winner's every stat must be higher.

### The central conceptual conflict in PROJECT_SPEC

`PROJECT_SPEC.md` §5: *"Haki는 기본적으로 별도의 직접 점수로 환산하지 않는다."* It also says unidentified/undisplayed ability must not be assumed absent. Actual `score.ts` currently adds typed Raw ×0.5. This is an **existing normative/implementation discrepancy**, requiring user approval to reconcile.

User endorsed **hybrid approach** as a direction. This does **not** resolve the precise exception rule, backward compatibility or authorize mass score recalibration.

### Four designs compared

| Model | How exceptional Haki is treated | Benefit | Risk / effort |
|---|---|---|---|
| **A: recommended guarded exception** | Normal Haki contributions already reflected in realistic **Base**; exceptionally proven/recognized applications get qualitative tag; **numeric incremental Raw only when unique and separable benefit is demonstrated AND excluded from Base**, with independent target-stat evidence | Removes mechanical scene-frequency bias, honors demonstrated specialist edge, avoids gratuitous bonuses | Medium–high migration and adjudication; full 273-stat review needed |
| B: bare `confirmed exceptional` automatic bonus | A flat +N for a short list of renowned users regardless of distinct battle effect | Easy to explain, rewards exceptional reputation | **High**: reputation/name bias, official narrator coverage imbalance, Raw stacking and title ambiguity; violates SPEC intent |
| C: no Haki bonus, holistic only | All Haki integrated in Base, profile and Matchup | Simplifies double-count protection, strongly aligned to §5 | High historic migration; 39 Evaluations and calculation trace fundamentally changed |
| D: keep current model, exceptions just evidence flag | Current Base+Raw, no calculation changes, recognize elite application nonnumerically | Backward compatibility and lowest risk | Visibility/proficiency bias remains |

**Precise recommended A gate (design proposal, NOT yet implemented):**

- **G1, demonstrated capability type:** Armament/Observation/Conqueror confirmed, not merely inferred by status/title. An `unknown` case gets neither a **negative** nor a free positive point.
- **G2, exceptional quality proof:** *(a)* explicit canonical/comparative appraisal of the **same type/application**, or *(b)* more than one sufficiently independent advanced effectiveness demonstration against relevant opposition. Do not equate "strong opponent" with every Haki subtype being elite; allow genuinely decisive unique feat when quality is unambiguous and scope specific.
- **G3, stat-specific marginal effect:** independent observed impact in named Stat over a separately justified normal combat baseline, with documented uncertainty; **no double credit** of one hit across Attack, Technique and Combat IQ without disjoint outcomes.
- **G4, equality of opportunity:** same tests for all 37 characters; insufficient publicity triggers readiness/uncertainty and side-by-side peer review, *not low presumed proficiency*.
- **G5, quantitative cap and model decision:** no fixed +2/+4/+6 bonus assumed; preserve 100 cap, Weight 0.5 until sensitivity is reviewed; avoid summing multiple applications of one feat under the same Stat by default. If typed numeric exception ultimately approved, version the scoring rubric and Evaluation dataset and update SPEC deliberately.
- **G6, cross-ability symmetry:** technique of Devil Fruits, races, technology and Haki all evaluated by proven combat influence; do not grant Haki prestige an extra reward above the same already-reflected outcome while leaving non-Haki specialties solely in Base.

Qualification label proposal (non-numeric): `verified-exceptional` / `strong-feats-no-explicit-superlative` / `confirmed` / `unclear`. This is **not** a source-authored official power tier; it would be a project evidence-confidence designation, clearly marked interpretation and tied to Evidence IDs.

### Evaluating alternative changes before mass recalibration

**Stage 1:** Build a one-record-per-Stat semantic spreadsheet for **273 Stat rows**, joining Fact (with battle context), interpretation, current Base, each typed Raw, capability/application and readiness. Retain legacy score as read-only baseline.

**Stage 2:** Pilot **Sakazuki, Kuzan, Shanks, Linlin, Mihawk, Garp (prime/current), Katakuri, Zoro, Rayleigh (prime/current)**; these cover score-rank inversions, an exceptional Haki specialist, stacked application, and unobserved but confirmed Haki. Select also one low-evidence test control (Ryokugyu or Smoothie).

**Stage 3:** Apply a single published rubric symmetrically to all **39** Evaluations; calculate candidate Final/Overall/rank, identify large deviations and score cap truncation, regression check linked matchups and all era states. No feedback-driven 'make X > Y' target score.

**Stage 4:** Seek a new **explicit approval** for exceptions, the PROJECT_SPEC revision, numeric ranges, migration and model/data version, *before* changing `evaluations.ts`, `score.ts`, or releasing a changed ranking.

## 5. Baseline and QA guardrails

- Snapshot prior work: PR #22 merged as `064fe67e5a33467838fac1f91e7ccddf401af7c2`. Automated PR CI **26/26 files, 121/121 tests, production build success**. The latest main Pages workflow should be inspected independently; this document does not claim a live-device validation.
- All **39** Evaluations are still `draft` or otherwise not an officially verified source of truth; mathematical consistency tests do not validate every interpretive stat.
- Official source reference is **support for described facts**, not a substitute for comprehensive rereading of 273 individual rationales against manga panels.
- No future investigation should automatically re-score characters solely to match fans' perceptions, actor titles, rank bands, or users' preferred duel outcome.
