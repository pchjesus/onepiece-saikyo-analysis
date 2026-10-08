# v0.1.34 pre-implementation audit — Haki / next group selection

**Status:** review-only; no Evaluation, score, Haki model, Character, Membership, Matchup, Calculation Model or UI code changes.
**Snapshot:** main `7d7971c301a5a481b976f157be7b89ac32b55e4b` (2026-10-09 KST).
**Parent release:** v0.1.33; PR #21 merged. The feature/v0.1.33 branch is 0 ahead / 2 behind main.

## 1. Repository facts and verification boundary

- README/package/spec agree on **v0.1.33**; data/tests specify **37 Character master records, 41 Memberships, 39 Evaluations, 36 evaluated unique Characters**.
- PR #21 **merged**; its final pull_request workflow succeeded (run 37798560888). The successful main push workflow run **37799953859** includes test, build, pages configure, artifact upload and deploy steps marked success. The most recent main commit's runs were cancelled because the concurrency group was superseded; do not call those cancelled runs failures.
- The v0.1.33 TEST_REPORT records **25 files / 116 tests passed** and production build passed. Those are CI/repository records, not independently executed local tests during the initial audit. Actual mobile/browser pixel and touch QA remains unverified.
- Stale documentation detected: `docs/NEXT_GROUPS_ROGER_ROCKS_DRAFT.md` still said “pending main merge” despite PR #21 merged. This PR fixes only that status line.

## 2. Current model preserved

`COMBAT_STATS`: Attack, Defense, Stamina, Speed, Technique Mastery, Combat IQ, Versatility.
`Balanced 1.2`: arithmetic mean of seven Final stats.
`Final Stat = min(100, Base + Raw Haki * 0.5)`.
Special Combat Profile has no direct Overall addition. Matchup `haki-interaction` is separate and non-numeric.
Evidence readiness E1/E2/E3 is optional at the individual EvaluationItem and **not a weighting factor**.

## 3. Actual Haki audit (read-only source scan)

Inspection of `src/data/sample/evaluations.ts` at the snapshot commit:

| Check | Result |
| --- | ---: |
| Numeric Evaluations | 39 |
| Seven-stat item rows | 273 |
| Stat rows with positive typed Raw Haki | 50 |
| Individual Haki contributions | 51 |
| Raw totals histogram (per Stat row) | 2: 11, 4: 18, 6: 8, 8: 13 |
| Contribution rows by target | Attack 19; Defense 11; Technique 16; Combat IQ 5 |
| Contributions for Speed/Stamina/Versatility | 0 |
| Per-stat Evidence readiness explicitly entered | E1: 45; E2: 25; E3: 0 |
| Per-stat Evidence readiness unset | 203 / 273 (74.4%) |
| Unique Evidence references reused for different Raw Haki target stats in the same Evaluation | 13 |

For example:
- `evaluation-katakuri`: `evidence-katakuri-future-sight-881-884` -> Defense Raw 6, Technique Raw 6, Combat IQ Raw 4.
- `evaluation-roger`: `evidence-roger-haki-analysis-rocks-1165` -> Attack/Defense/Technique each Raw 8.
- `evaluation-garp`: `evidence-garp-roger-rocks-1165` -> Attack/Defense/Technique each Raw 8.
- `evaluation-newgate-prime`: `evidence-newgate-roger-966` -> Attack/Defense/Technique each Raw 8.
- `evaluation-kaido`: `evidence-kaido-future-sight-1042` -> Defense 2 and Combat IQ 2.
- `evaluation-vista`: `evidence-vista-armament-akainu-574` -> Attack 4 and Technique 2.

**These are evidence-reuse candidates for semantic review, not 13 confirmed double-counting errors.** A shared battle can substantiate independent impacts if fact/interpretation/rationale establish distinct phenomena. Current validation checks Evidence presence/ownership/stat linkage but cannot prove semantic independence between the multiple score increments, or prove that Base excluded the same Haki impact.

### Haki modelling questions

1. Raw 6 across Armament, Observation and Conqueror's is the same *model contribution step*, not necessarily equal Haki strength or equal absolute force. Current type/application string does not enforce a semantic calibration guide.
2. The current `HakiCapability.status` uses `confirmed | unclear | not-confirmed`, Conqueror's includes an `infusion` child. Armament and Observation lack standardized subapplication fields; the free-text `application` allows ambiguous cross-case comparison.
3. The `Score` and `hakiContribution` code handles positive entries, caps, weighted summing, linked Evidence, and typed data well; the pre-existing `hakiAudit.test.ts` also checks capability compatibility. Validation does not currently deduce unique Haki event contributions from Evidence semantics.
4. Future Sight should normally be tested for **reaction/avoidance Defense**, **decision-use Combat IQ** and explicitly evidenced **precision/technique** rather than presumed raw movement Speed. Pre-existing data follows the no-Speed-bonus convention.
5. Conqueror's presence/emission/attack infusion/defensive clash/special regeneration-counter must remain separate; the latter should usually be Matchup Interaction pending evidence of generic across-opponent performance.
6. Armament's logia access, offensive reinforcement, defensive hardening, emission and internal destruction are distinct applications. Logia access is often a matchup validity condition, not an automatic Attack Raw boost.

### Haki Weight sensitivity (NOT a proposal to change)

Recalculating existing Base + Raw hypothetically at weight 0, 0.5 and 0.75 (100 cap, without saving any files):
- Shanks default Overall: **91.286 -> 92.571 -> 93.214**; rank-position among unique evaluated Characters shifts **13 -> 10 -> 7** (ties depend on name ordering).
- Prime Rayleigh remains **92.857** across all three, because prime Haki Raw is 0; insufficient direct prime applications are not inherited from current Rayleigh.
- Katakuri: **81.286 -> 82.714 -> 83.429**.
- Roger: **95.857 -> 97.571 -> 97.857** (cap saturation at high weight).
- Prime Newgate: **95.857 -> 97.571 -> 98.000** (cap saturation at high weight).
- Kuzan: **92.000 -> 92.714 -> 93.071**.
- Mihawk: **92.714** throughout (currently no typed Raw), while the portrayal and Base ratings are retained.

**Interpretation:** Weight changes demonstrably affect cross-band relative ordering even when Base numbers remain fixed; the unequal availability of typed Haki application evidence is a confounder. **Keep weight 0.5 unchanged** until the reused Evidence and Base-vs-Raw semantics are audited.

## 4. Decision options — user approval needed before data/model migration

| Rank | Option | Effect | Scope | Risk |
| --- | --- | --- | --- | --- |
| 1 | **A: Evidence-to-stat allocation audit**, no model migration | Add review notes distinguishing Haki event -> independent on-page outcome -> Base exclusion -> Raw rationale. Add regression diagnostics for multi-stat reuse with explicit justified exceptions | Docs and diagnostic tests first; no score changes | Low |
| 2 | **B: Optional typed Application metadata** | Introduce nonnumeric subtypes (armament: contact/counter, reinforcement, defense, emission, internal damage; observation: sensory, future-sight, decision response; conquerors: emission, infusion, clash, special interaction) and `appliedOutcome` for independently supported stat attribution | Haki/Evaluation/Evidence types, fixtures, UI display/validation, tests | Medium; backward migration |
| 3 | **C: Haki modelling rebuild** | Replace common Raw system with application-specific modelling | All 39 Evaluations, score scale, ranking/matchups, persistence/compatibility and tests | High |

Approval requested only for **semantic changes, migrations and numeric adjustments**. This document does not authorize automatically setting previously accepted Base, Raw, Overall, readiness or Model Weight to a new value. A is recommended first, B second, C last.

## 5. Proposed next groups (no character duplicates)

**Selection for research: Revolutionary Army + Marines / SWORD**, six currently absent Characters.
These groups are either already present in the Group registry or can be represented with existing group architecture; verify membership IDs before any insertion.

| Group | Character | Initial evidence-readiness assessment | State / limitation | Main direct-Evidence starting points |
| --- | --- | --- | --- | --- |
| Revolutionary Army | Sabo | E2 numeric evaluation **candidate**, not yet scored | Dressrosa/Levely accomplishments must not be combined into an unqualified peak | Fuji exchange, Bastille, Burgess; Ch. 743-752 and Ch. 792 |
| Revolutionary Army | Bartholomew Kuma | E2 numeric evaluation **candidate**, not yet scored | Human-era, fully modified and Egghead damaged/free-action state require separation | Thriller Bark/Sabaody; Ch. 1104 Saturn punch, rescue context |
| Revolutionary Army | Emporio Ivankov | E2 **review candidate**, not yet scored | Healing hormones must not automatically become Stamina or Defense | Impel Down escape/combat, Marineford, rescue/support |
| Revolutionary Army | Karasu | E3 **unscored candidate** | Short fight sample and Mariejois civilian/collateral limitations | Ch. 1083 confrontation with Issho |
| Marines | Sengoku | E2 **review candidate**, not yet scored; prime E3 | Marineford state != unsupported peak; role/rank not 7-stat numeric evidence | Ch. 571 Buddha shockwave, Marineford Teach engagement |
| Marines / SWORD | Koby | E2/E3 unresolved; numeric score **withheld** | Single large punch cannot set seven axes; compare Pizarro and Garp context | Ch. 1088 Honesty Impact, rescue team roles |

Only Sabo and Kuma have the strongest immediate multi-encounter review priority. Evaluate them **independently from the existing anchor scores**, then compare within each Stat, preserving direct on-page upper limits and uncertainty. Other candidates stay unscored until seven-axis source review supports E2.

### Initial source pointers (not completed full primary-page verification)

- Official ONE PIECE.com: [Sabo](https://one-piece.com/character/sabo/index.html), [Kuma](https://one-piece.com/character/Bartholomew_Kuma/index.html), [Ivankov](https://one-piece.com/character/Emporio_Ivankov/index.html), [Karasu](https://one-piece.com/character/Karasu/index.html), [Sengoku](https://one-piece.com/character/Sengoku/index.html), [Koby](https://one-piece.com/character/Coby/index.html).
- Official episode descriptions: [Sabo vs Issho, Ep. 687](https://one-piece.com/anime/o2767/index.html); [Sabo vs Burgess, Ep. 735](https://one-piece.com/anime/o2863/index.html); [Kuma/Saturn, Ep. 1137](https://one-piece.com/anime/74151/index.html); [Sengoku/Teach, Ep. 487](https://one-piece.com/anime/487/index.html).
- Manga chapter lookup pointers: 792, 1083, 1088, 1104. Full original-panel reconciliation (attack success/failure, state, Haki, limitations, 7-axis evidence) **is not complete**, so no new numeric proposal is claimed ready for user approval.

## 6. Initial Matchup research shortlist

- Sabo vs Burgess: direct historical result, but conditions/DF era matter.
- Sabo vs Issho: partial clash in Dressrosa; consider intent, civilian protection, mission objective.
- Kuma vs Zoro / Sanji: different historical states and support intent; not general 1v1 winning likelihood.
- Kuma vs Saturn: regeneration and threatened Bonney as matchup and battle context, not universal Attack.
- Karasu vs Issho: Mariejois restrictions; short interaction, no automatic admiral-level scale.
- Koby vs Pizarro: damage access, area effect and Garp/Grus/Helmeppo teamwork.
- Sengoku vs Teach: multi-party Marineford, not clean 1v1.

## 7. Hold points and required verification

1. Complete an annotated canonical Evidence matrix **per candidate x 7 stats** with successes, failures, counterexamples, battle conditions, present state and uncertainty. Use manga panels first; official site and anime second. Do **not** back-solve Raw from desired Overall.
2. Choose the numeric candidates after this research and produce proposed Base / Raw / Final / readiness and same-stat anchors; require user confirmation before modifying Evaluation or Haki schema.
3. Any code patch goes feature branch -> tests, changed roster counts, Evidence/Battle ownership, membership expanded/unique, Haki validation, switching and Matchup -> PR -> CI -> user approval -> main merge -> Pages. Do not claim deployment just because PR CI passes.
4. This branch is documentation-only; no change to Balanced 1.2, Weight 0.5, 7 stats, existing Evaluations or main deployment.
