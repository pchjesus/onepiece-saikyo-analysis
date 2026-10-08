# v0.1.34 — Haki allocation audit, scale review and decision request

> **Status: investigation and safe patches only.** No approved Evaluation/Base/Raw/Final, 7-stat calculation, Balanced 1.2 or Haki Weight 0.5 is changed. Any significant Haki model redefinition and recalibration **require the project owner's explicit approval**.
>
> Baseline: `main@7d7971c`, version v0.1.33. Companion audit: [HAKI_NEXT_GROUP_AUDIT_0_1_34_DRAFT.md](HAKI_NEXT_GROUP_AUDIT_0_1_34_DRAFT.md). Source-of-truth scores are the existing `src/data/sample/evaluations.ts`, not the following discussion.

## 1. What is implemented in this review branch

1. `src/data/sample/hakiAllocationAudit.test.ts` creates a **read-only review gate** for the baseline of **15** Evidence entries reused by Haki Raw across >1 Stat within one Evaluation. Future new multi-stat reuse requires deliberate test-list review. **A flagged record is not a proven error, and listing it is not an endorsement of its current Raw.**
2. Four additional Context/Evidence-aware Matchup records and tests added, without fixed winner, probability or numeric stat adjustment:
   - `matchup-akainu-kuzan` — 10-day Punk Hazard duel; reported winner Sakazuki; full exchanges unseen.
   - `matchup-rayleigh-current-kizaru` — **current** Rayleigh and Kizaru's Sabaody interruption; old Rayleigh should not be silently applied to prime.
   - `matchup-kaido-linlin` — direct Yonko clash interrupted by alliance; not a full-length canonical 1v1 result.
   - `matchup-jozu-kuzan` — Jozu's landed blow followed by Kuzan's freeze during battlefield distraction; freeze requires conditional framing.
3. Special Combat Profile `?` uses the native `details` control; now dismisses on **outside pointer down** or **Escape**, while inside interactions stay open. UI regression checks cover open, inner event, outside event, Escape and focus restoration.
4. `getMatchupHub.test.ts` and `matchups.test.ts` update explicit expected matchup counts from 11 to 15. Unmodified default 36-person roster and Evaluation state switching remain covered by existing tests.
5. No existing scores, contributions, evidence, battle data, group/membership rosters or calculation functions are modified.

## 2. Root cause / supported concern

**Demonstration probability is not character strength.** The project currently attaches optional per-stat typed Raw only when actual Haki use is explicitly evidenced. Thus a confirmed capable character with fewer direct recorded scenes may have Raw=0 (e.g. Mihawk, Law, Hancock and Prime Rayleigh), while frequently featured characters have several additive records. Raw=0 does **not** mean Haki weak or absent. That policy avoids speculative points but can create **observational exposure bias** when scores are compared across eras and narrative focus.

`BaseScore` is manual and has no enforceable invariant proving the same observed Haki effect has been excluded. Conversely the series' *observed* punch strength or combat response may be inseparable from habitual Haki. Consequently some existing Base scores may contain Haki effects already. A simple per-source presence check cannot resolve this.

- **Confirmed technical fact:** Raw input is typed per stat and its links are validated; multiple Raw values sum, then 0.5 weighting and 100 cap apply; no capability-only automatic bonus.
- **Confirmed technical fact:** the same Evidence may support several Haki-target stats; 15 baseline shared links are flagged by an executable test (see companion audit). Example: Katakuri Future Sight -> Defense 6, Technique 6, Combat IQ 4.
- **Semantic risk, not confirmed numeric bug:** identical scene may contribute multiple independent observable dimensions, but must demonstrate each dimension separately. A direct physical strike is not automatically an independent defensive demonstration; decision quality is not the same thing as future-sight perception; sophistication is not Raw damage.
- **Potential bias:** Raw amounts (2/4/6/8) across Armament, Observation, Conqueror's have no published common rubric for “increment to a named Stat at the same Haki Weight”; it is not canonically valid to treat them as equal intensity.
- **Existing readiness coverage gap:** 203/273 Stat rows have no explicit E1/E2/E3 metadata (the 70 explicitly set belong primarily to v0.1.33 expansion). Absence is neither E3 nor low combat strength; backfill can occur without changing scores.
- **Type limitation:** generic confirmed/unclear/not-confirmed plus Conqueror infusion are recorded, but no explicit advanced Armament / Future Sight application category across all types, and `application` is free text. Full “elite” Haki rank would reintroduce portrayal bias.

### Fifteen overlapping Haki Evidence records — review priority

| Priority | Case | Shared target | Main unresolved question |
|---|---|---|---|
| High | Shanks Divine Departure Ch.1079 | Technique + Combat IQ (plus Attack via same scene) | Are high attack / precise timing / tactical response individually demonstrated and excluded from Base? |
| High | Zoro King Ch.1033–1035 | Attack via Armament + Conqueror and Technique | Same attack scene supports two Haki types under one Stat; is marginal separation justified and no score cap distortion? |
| High | Katakuri Future Sight Ch.881–884 | Defense / Technique / Combat IQ | Did evasion, prediction control and decision produce three distinct effects? |
| High | Roger, Garp and prime Newgate clashes | Attack / Defense / Technique | Are actual defensive application and technical incremental benefit independently shown, and are joint contributions allocated cautiously? |
| High | Rocks vs Harald Ch.1155 | Attack / Defense / Technique | Does limited direct defense evidence merit same Raw magnitude as offense? |
| Medium | Rayleigh training Ch.597 | Attack / Technique | Demonstration proves competence but how much *battle-output magnitude*? |
| Medium | Linlin Page One Ch.1011 | Attack / Technique | One short strike vs non-apex opponent: Raw quality and type-specific baseline |
| Medium | Kaido Future Sight Ch.1042 | Defense / Combat IQ | Evasion vs tactical selection; no automatic Speed |
| Medium | Kaido Conqueror infusion Ch.1010 | Attack / Technique | Same attack outcome vs independent degree of control |
| Medium | King, Vista, Jinbe, Kuzan | Attack / Technique and/or Defense | Repeated exchanges, hardened defense and separate skill dimensions |

**No score changes follow automatically from this table.** For each case, compare the factual panel or official episode with its actual `Evidence.fact`, affected `EvaluationItem.rationale`, `baseScore`, `hakiContributions`, `readiness` and comparison anchor. Use one stat's marginal effect per clearly independent outcome, not “one scene → automatic +2 or +8 to every plausible stat”.

## 3. Calibration conflicts — unchanged existing Final stats

Stat order: Attack / Defense / Stamina / Speed / Technique / Combat IQ / Versatility.

| Character | Existing Final stats | Overall |
|---|---|---:|
| Sakazuki | 97 / 95 / 96 / 86 / 91 / 91 / 91 | **92.429** |
| Kuzan | 93 / 93 / 97 / 90 / 93 / 91 / 92 | **92.714** |
| Shanks | 97 / 91 / 88 / 95 / 96 / 93 / 88 | **92.571** |
| Linlin | 98 / 99 / 99 / 89 / 94 / 84 / 97 | **94.286** |
| Mihawk | 96 / 93 / 91 / 94 / 99 / 92 / 84 | **92.714** |

### Sakazuki vs Kuzan

**Canon:** Sakazuki won their 10-day Punk Hazard duel (Ch.650, also ONE PIECE.com TV ep.570). `evidence-sakazuki-kuzan-duel-650` and `evidence-kuzan-sakazuki-duel-650` correctly store the reported victory and long duration, with unknown technique sequence.

**Project:** Kuzan's Overall is currently +0.286 higher. The axis differences (Sakazuki minus Kuzan) are Attack +4, Defense +2, Stamina -1, Speed -4, Technique -2, Combat IQ 0, Versatility -1. Because Overall is not a duel win probability, this **is not a logical contradiction**. However the large relative Speed/Technique differential requires checking whether the current data unfairly relies on the detailed Kuzan–Garp fight vs Sakazuki's less directly depicted speed and Haki, and whether magma/ice matchup features can be defended without fabricating type advantage. Sakazuki victory is not grounds to automatically rewrite all seven stats.

### Shanks vs Linlin

**Canon:** Shanks foresees the threat to his fleet and incapacitates Kid with Kamusari (Ch.1079; official ONE PIECE.com episode 1112). Linlin displays extreme damage tolerance against two awakened opponents before combined environment/ring-out defeat (Ch.1039–1040). Those are **different conditions**, not a clean Shanks-vs-Linlin fight.

**Project:** Linlin Overall exceeds Shanks by **1.714** (12 aggregate stat points). Shanks relative to Linlin: Attack -1, Defense -8, Stamina -11, Speed +6, Technique +2, Combat IQ +9, Versatility -9. Most difference comes from Linlin's much more directly shown heavy-defense/long-battle and broad Devil Fruit toolkit vs Shanks' limited long-fight sample. Lack of Shanks stamina evidence is **uncertainty**, not proof of weakness; evaluate explicit E2 readiness or score bands before treating nominal ranking as proven difference. Linlin's durability/versatility are not invalidated by Shanks' high-output Kid demonstration, and Shanks' future sight is not a simple Speed bonus.

### Shanks vs Mihawk

**Canon:** Ch.1058 marine dialogue and Mihawk's official strongest-swordsman description support **sword technique** comparisons, but do not directly establish blanket superiority in all Haki categories or Overall. The past duels do not reveal a current complete 1v1. Shanks has much richer recent direct Haki application Evidence; Mihawk's typed Raw is 0, which **must not be interpreted as “weak Haki”**.

**Project:** Mihawk 92.714 versus Shanks 92.571 (0.143). This narrow difference is well within unresolved evidence uncertainty. New Haki bonus for Shanks by display-frequency or inferred numeric bonus for Mihawk by title would both bias the model. Check the Base-vs-Raw method symmetrically.

### Wider anchor impact

- Prime Roger/Newgate/Garp/Rocks currently rely on triple-stat Supreme King Raw from a limited set of high-end clashes; reviewers need independent outcome analysis per stat and preservation of multi-party limits.
- Prime Rayleigh has *zero* typed Raw despite a well-supported capability and prime E2; turning inferred prime skill automatically into +N Raw would be a new policy.
- Defense/Stamina/Versatility can be extreme for Linlin/Kaido based on demonstrable **non-Haki** outcomes; a “Haki-only” rewrite will not resolve every perceived Overall ranking mismatch.

## 4. Alternative Haki model strategies for user decision

| Rank | Alternative | Intended effect | Expected implementation impact | Risk |
|---|---|---|---|---|
| **1 recommended** | **Hybrid observed-performance baseline + documented exceptional Haki application** | Baseline Stat evaluates overall supported real combat performance (including ordinary/incidental Haki as used in normal fights); explicit Raw applied **only** for demonstrably separable exceptional advantage **not already in Base**. Add nonnumeric application-type and proficiency-*evidence* metadata, independent outcome note, no bonus by presence/frequency. Explicit readiness and intervals where unobserved | Meaningful re-scoring of a possibly large fraction of 39 Evaluations; republish rubric, version score data; model Weight 0.5 can stay **initially** if Raw semantics are recalibrated. Rankings/radar/matchups likely shift; needs separate impact simulator and user approval | **Medium–high** |
| **2 conservative** | **Retain strict demonstrated-only Raw + semantic checklist** | Keep present exact scoring; document missing Evidence and 15 reuse cases, audit and cautiously re-evaluate only demonstrably erroneous allocations. Use E2/uncertainty labels instead of changing math | Existing scores mostly retained; audit coverage improved; minimal UI/schema modification | **Low**, but exposure bias largely remains |
| **3 radical** | **Integrated holistic 7-stat evaluation, Haki as nonnumeric profile and matchup factor** | Remove numeric Raw addition or make it explanatory only; judge Haki within actual combat performance and contextual evaluation. Avoid counting same advantage twice, but scoring decisions become more manual | All existing Base/Raw/Final relationships, legacy Calculation Model and UI traces change; essentially a new **Balanced 2.x** and re-scoring of all evaluations; high migration/testing burden | **High** |
| **Not recommended** | **Capability-level automatic Haki grades/bonuses** | Give points for confirmed or elite Haki regardless of use | Easy superficial model, but strong status inflation, type equivalence and double counting, speculative penalties for unobserved states | **Very high model-validity risk** |

**Why option 1 rather than changing Weight 0.5 now:** As long as Base/Raw semantics are inconsistent, changing the Weight alone amplifies or suppresses a biased input rather than curing it. Likewise “use frequency × fixed points” mistakes narrative exposure for proficiency. Introduce a *non-numeric demonstrated Haki taxonomy*, not “basic/advanced/elite = automatic 2/4/6”.

### Recommended prospective rules (approval required before applying to scores)

1. **Evidence-reliability:** Separate confirmed capability, demonstrable application type and proven performance quality. Observation-only status does not create Raw and does not prove low capability; unknown is not absent.
2. **Base definition:** Stable combat performance already demonstrated with habitual Haki in context. Do not pretend to subtract an unobservable “non-Haki power” if the effect cannot be isolated.
3. **Raw definition:** Clear *incremental* application advantage not already in Base; store independent `observedOutcome`, `baselineExclusionReason`, type and evidence references. Same shared source may support multiple stats only if each has a different independent outcome with its own rationale.
4. **Amount calibration:** Raw 2/4/6/8 refers to **marginal impact on a specific named Stat at model Weight 0.5**, not Haki ownership, Haki frequency, a generalized Haki quality score, or equal physical power across Haki types.
5. **Matchup validity:** Logia access, resistance to spatial relocation, conditional regenerative suppression and future-prediction counterplay remain in Matchup unless broadly evidenced generic core-stat performance.
6. **Cross-era uncertainty:** If full output unseen, assign E2/E3 and express uncertain plausible band; **do not silently award average points** or truncate a character's actual peak by equating absence of evidence with weakness.
7. **State effects:** Preserve prime/current separation and 100-cap; do not back-port demonstrated old Rayleigh techniques to prime as confirmed application.
8. **Release boundaries:** Audit each existing stat, keep side-by-side before/after Overall/ranks including Akainu/Kuzan, Shanks/Linlin, Mihawk, Roger/Newgate/Garp/Rocks, commanders; get approval; only then update 39 Evaluations/model version if warranted.

## 5. Suggested subsequent approval and implementation order

- **Already approved/implemented:** Review-gate diagnostic, four direct-context matchups, minor Special tooltip fix, accompanying tests and documentation.
- **Request decision now:** Choose proposed Option 1 hybrid, Option 2 conservative, or Option 3 holistic before rewriting Base/Raw or underlying Haki types.
- **If Option 1 approved:** create *separate* comparison workstream (no automatic main merge) with field-by-field fact/outcome evidence table, numeric before-after impact sheet for all evaluations, legacy-compatible read model / migration plan, revised Haki semantic rubric and tests. **Do not change Haki Weight 0.5 or existing scores until the user reviews concrete per-character deltas.**
- **Existing PR #22:** Do not merge to main without user approval. PR CI validates patch; main Pages deploy only after approved merge.
- **Further research:** Canon manga panel validation is required for final scores. Existing records and official anime are a source map, not a complete fresh chapter-by-chapter reread.

## 6. Source pointers (APA style)

- Oda, E. (2012). *ONE PIECE*, Ch. 650 [Manga chapter]. Shueisha.
- Oda, E. (2023). *ONE PIECE*, Ch. 1079 [Manga chapter]. Shueisha.
- ONE PIECE.com. (2012, October 28). *第570話 一味驚愕！新たなる海軍元帥！* https://one-piece.com/anime/570/index.html
- ONE PIECE.com. (2024, July 14). *第1112話 激突！シャンクスVSユースタス・キッド*. https://one-piece.com/anime/67527/index.html
- ONE PIECE.com. (2009, June 7). *第404話 大将黄猿の猛攻 麦わら一味絶体絶命*. https://one-piece.com/anime/404/index.html

These official links cross-check key events. Existing local chapter-based Evidence records are inspected for data linking, not represented as freshly page-by-page verified manga scans.
