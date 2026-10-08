# Hybrid Haki Evaluation — approved rubric (2026-10-09)

> **Decision:** Project owner approved the guarded Hybrid/Exceptional Application approach. This document and PROJECT_SPEC §5 are the authoritative **methodology** from this point forward. **Current scores are not retroactively re-certified** and no existing 39 Evaluation values, Raw, Weight 0.5, Balanced 1.2, or seven-stat mean are automatically changed.

## A. Three independent questions

1. **Does the character have the Haki capability?** Confirmed / unclear / not-confirmed based on direct or official source.
2. **Is this *specific Haki type / application* exceptionally competent?** Record (i) a directly demonstrated or explicitly described outstanding application, (ii) strong but indirect inference, or (iii) unknown. Distinguish *canonical fact* from our *interpretation*. Haki ownership alone does not imply elite status.
3. **Does the exceptional application have independently evidenced incremental impact on a particular Core Stat not already captured in Base?** Only in this case may a positive **exceptional Raw Haki** contribution be *proposed*; not automatically granted.

**No additive formula based on scene count, title, Haki possession, or a "master = +4" categorical tier.**

## B. Normal Base vs exceptional Raw

| Domain | Approved interpretation | Exclusion rule |
|---|---|---|
| Base Attack | Real demonstrated offensive capability including habitual Haki that cannot be isolated without speculation | Do not hypothesize powerless no-Haki version of an unobservable strike |
| Base Defense | Real evasion, parrying, blocking, protection and damage mitigation in the situation | Do not count the same predicted dodge again without distinct exceptional defense effect |
| Base Stamina | Sustained combat performance, actual fatigue and resource constraints | Do not treat title or mere endurance of a group fight as independent Haki fuel |
| Base Speed | Demonstrated physical approach, execution and reactions | Distinguish Observation-based advance warning from foot speed |
| Base Technique | Control and precision of the actual fighting method | A high-damage result alone is not proof of separately scored technique Raw |
| Base Combat IQ | Choice of objective, timing, adaptation and tactics in context | Future knowledge itself is not automatically a separate cognitive boost |
| Base Versatility | Repeated functional use across ranges, targets and roles | Haki type count and Devil Fruit possession are not +N |
| Exceptional Haki Raw | **Only** a specifically evidenced marginal application beyond the Base fact, in a named Stat, with clear exclusion | No same-effect double credit across Haki types, Stats or Base |

## C. High-performance Haki review card, required for a *proposed numeric exception*

- Character ID / evaluation state (prime/current, era, health)
- Haki type and actual application; capability source and certainty
- Canon fact and chapter / supplementary source; observed effect vs narration
- Evidence of *exceptional* ability: direct advanced effectiveness / explicit type-specific appraisal (not merely character title)
- Alternate explanations: equipment, Devil Fruit, body, opponent quality, battle state, teaming, environmental effects
- Specific Stat and distinct **observed** marginal effect **beyond** the normal Base performance
- Explicit `baselineExclusionReason` for why that marginal effect has not been scored elsewhere
- Reused Evidence IDs and any two-Haki same-Stat stacking, cap 100, uncertainty E1/E2/E3
- Proposed Raw amount only after peer-character anchor calibration, never automatic
- Before/after side-by-side for all Evaluation States + model/data versions and user approval before changing numbers

### Haki expertise evidence classes (not numeric)

- `direct-application`: the advanced/specialized form and its outstanding effect are **directly** demonstrated or explicitly described. The label is **this project's evidence assessment**, not an official 1–10 Haki rank.
- `strong-inference`: strong and meaningful indirect indicators, with an unresolved mechanism or no isolatable direct application. A legitimate reason to *re-examine Base/uncertainty* but **not** to award exceptional Raw automatically.
- No record: not reviewed / not sufficiently established, **not** incompetence or absence of Haki.

**Possible future review result:** A character can receive `direct-application` recognition yet still obtain **no additional Raw** if the demonstrated effect is already in Base.

## D. Named Haki demonstrations and Mihawk's black blade

| Character / Haki | Confirmed fact | Project assessment | Point decision |
|---|---|---|---|
| **Mihawk / Armament** | Holds Black Blade **Yoru**, world's strongest swordsman; explicitly coached Zoro on Haki-enhanced sword protection | **strong-inference** of exceptional Armament understanding/control. Black-blade permanence, its exact manufacture and *whether Mihawk personally completed Yoru's permanent blackening* are **not established by the identified official profile**. Canon Ch.937/955 shows black-blade maturation is special; an inference cannot be upgraded to factual crafting provenance | **No new Raw** without independent evidence that a specific Stat gained a demonstrably separate Haki advantage |
| **Shanks / Conqueror's** | Remote intimidating Haki pressured Ryokugyu (Ch.1055); Haki-enhanced attack against Kid (Ch.1079) | **direct-application** of exceptional Conqueror's pressure with contextual confounders (Red Hair crew presence, Ryokugyu's ongoing clash, Kid readying attack) | Examine independent impact without duplicating Attack/Technique/Combat IQ already in Base/Raw |
| **Katakuri / Observation** | Explicitly trained Observation to briefly foresee the future and repeatedly employed anticipation against Luffy (Ch.881–884) | **direct-application** of exceptional foresight/evasion | Review Defense/Technique/Combat IQ triple reuse; *not* a pure-Speed bonus |
| **Garp / Armament** | Strong punch feats, Haki blows against Kuzan, battleship-bag training; prime God Valley includes supreme Haki group strike | **strong-inference** for specifically elite *Armament* subtype; cannot attribute whole punch strength or other Haki categories to Armament alone | Revisit Base and prime/current contexts; no automatic Armament Raw |
| **Garp / Conqueror's** | Prime God Valley high-end Haki application documented by current data in Ch.1165 | **direct-application** *at prime state*, with team-attack caveat | No extrapolation of prime amounts to current; independent Stat impact required |

### Source map and strength

**Official series portal:**
- ONE PIECE.com, Dracule Mihawk character: https://one-piece.com/character/Dracule_Mihawk/index.html — strongest swordsman and Yoru are explicitly named; it does not say Mihawk independently completed the forging operation.
- ONE PIECE.com, TV episode 720: https://one-piece.com/anime/o2833/index.html — Mihawk taught Zoro to coat a blade with Haki to prevent damage.
- ONE PIECE.com, TV episode 830: https://one-piece.com/anime/o4671/index.html — Katakuri's briefly seeing future through trained Observation explicitly described.
- ONE PIECE.com, TV episode 1082: https://one-piece.com/anime/64187/index.html — Shanks' remote Conqueror's pressure and Ryokugyu withdrawing.
- ONE PIECE.com, TV episode 1112: https://one-piece.com/anime/67527/index.html — Shanks/Kid.
- Relevant original manga: Oda, E., Ch. 779, 937, 955 (black-blade/hardening/Enma), 881–884, 1055, 1079, 1080–1087, 1165. Each needs individual panel checking before asserting exclusivity, crafting mechanism, or exact numeric amount.
- Community/secondary black-blade interpretations are *not* official proof of Yoru's creation mechanics; do not reverse the causal arrow from owning Yoru to having personally forged it.

## E. Explicit impact and migration gate

The existing system has 39 numerical Evaluations/273 Stat items. Observed baseline: 51 positive-Haki Stat items / 53 positive typed contributions / total Raw 256 / 15 multi-Stat Evidence-reuse flags / 2 same-Stat multiple-Haki-type stacks / 203 items missing readiness labels. All **current** numeric Raw remain provisional under the former policy.

1. Preserve immutable pre-change versioned snapshot and passing baseline tests.
2. Fill **273-row evidence audit worksheet**, preserving raw fact and interpretation; do not invent missing source. Document peer anchors for **every** Stat, not only near-90 Overall rankings.
3. Pilot Shanks / Mihawk / Linlin / Sakazuki / Kuzan / Garp prime & current / Katakuri / Zoro / Rayleigh, and sparse-evidence control Ryokugyu / Smoothie. Require same evidence standard for lower-ranked characters.
4. Produce candidate Base/Raw/Final and rank/matchup deltas for 39 Evaluations, including state-specific sensitivity and clipping at 100.
5. **Stop for approval** of individual changes, comprehensive scores and model/evaluation data version. Only then modify `evaluations.ts`, `score.ts`, Haki Weight or numeric official ranking. No arbitrary score to force a desired winner.
6. If code adds optional qualitative excellence metadata, it is **non-numeric and independent of ranking**; ensure existing Haki absence remains `unclear` rather than `weak`.

### Compatibility clarification

`PROJECT_SPEC.md`'s long-standing default "Haki not intrinsically counted as bonus" is interpreted together with the approved **exceptional incremental application** clause. The presently shipped `Final=min(100,Base+0.5*Raw)` remains a *legacy calculation with existing draft data*, **not** a claim that every current Raw qualifies under this new criterion. Release a calculation/data model migration only after impact analysis and user sign-off.
