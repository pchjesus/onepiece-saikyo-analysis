## v0.1.63 — Vista all-seven-stat upside/source audit; Shanks and Haki independent-effect gates (no numeric amendments)

- User requires **all seven Vista core stats** to be individually evaluated for potential increases, not Technique alone. Source-linked findings: Technique highest priority; Attack/Defense/Speed/Versatility conditional; Combat IQ weakly conditional; Stamina lacks comparable sustained-battle evidence. No +N asserted without observed distinct effect, peer comparison and user approval.
- Shanks independently reviewed across all seven axes, with TV1082 long-range Conqueror pressure vs TV1112 Kid/foreknowledge/Divine Departure roles separated. His Versatility88 already accounts for pressure; Technique96 overlaps two Haki types on one scene. No Shanks/Vista hypothetical overall decreases.
- Add `src/data/sample/v0163UpsideReview.ts` read-only review cards (14 axes + 4 unresolved Haki event cards) with evidence ownership IDs, peer anchors, limitations, and subsequent approval gates; new regression tests guard 14-axis coverage and unchanged production 59×7 / 62 Evaluations / 434 Stats / 15 Matchups / readiness / 212+230 Raw / model 1.2.
- [Detailed v0.1.63 audit](docs/V0_1_63_VISTA_ALL_SEVEN_STATS_SHANKS_UPSIDE_AND_HAKI_OVERLAP_2026-10-10.md). No changes to Evaluation/Base/Raw/Final/Overall, Evidence canon records, Character/Battle/Matchup data, production calculation, UI, storage, PROJECT_SPEC or `package.json`.
- Source limitations: official series portal and internal canon citations reviewed; original manga chapter panels not fully independently checked. CI/build/Pages and manual browser status are reported only after verified runs.

## v0.1.62 — Approved targeted Haki overlap score calibration; upside-only Shanks/Vista review

- User authorizes bounded Overall adjustments and **explicitly excludes Shanks and Vista from any Raw-off/downward hypothetical**; their scores remain exactly unchanged, and official Vista/Mihawk swordsman and Shanks Ch.1055/1079 feats are reviewed for future upside without arbitrary +N.
- King Attack Raw4→0 and Technique Raw2→0; Jinbe Attack Raw4→0 (Defense Raw4 retained); Katakuri Combat IQ Raw4→0 (Defense/Technique future-sight Raw6 each retained). **All four Base values unchanged**, since each removed Raw duplicates the same already scored Base performance. Corresponding Evaluation data versions updated; source facts, Evidence IDs, score model, UI, saved-state format and 15 matchups unchanged.
- New [v0.1.62 decision and impact report](docs/V0_1_62_APPROVED_MULTISTAT_HAKI_PATCH_AND_SHANKS_VISTA_UPSIDE_2026-10-10.md), plus targeted tests. Representative Raw226→212/full Raw244→230; no blanket Haki removal, no E1-3 changes.
- v0.1.61 Shanks/Vista Raw-off simulation is explicitly **retired as a decision aid** and removed from active diagnostic tests; historical documents kept with supersession notice.
- Actions testing/build/Pages release result must be verified for the exact merged SHA; direct full manga-panel review and browser manual QA remain unverified.

## v0.1.61 — Haki Raw independent-effect review (no numeric amendment)

- Apply the already approved Hybrid/Exceptional Haki rubric to **Vista, King, Jinbe, Katakuri, Shanks (12 stat axes)**, individually separating canon reference, combat context, Base coverage, independently demonstrated Raw, baseline-exclusion gaps and same-stat peer anchors. Classify ordinary Armament as a recalibration *review* candidate, not as automatically zero; preserve potentially independent future-sight and Conqueror's applications without asserting every Raw is separately proven.
- New [decision report](docs/V0_1_61_HAKI_RAW_INDEPENDENT_EFFECT_AND_DECISION_2026-10-10.md): A(current) vs B(approval-gated only), explicit uncertainty, **read-only** Raw-off sensitivity on all 59 default characters, and v0.1.62 evidence-first queue. The hypothetical Base-only results are **not authorized revised scores**. Original manga-panel independent inspection remains outstanding; official anime/profile summaries provide limited cross-checks.
- New `hakiIndependentRawAuditV0161.test.ts` (5 diagnostic assertions/groups) for twelve Base/Raw/Final/E axes, five source-linked cross-stat Haki IDs, Shanks same-axis two Haki types, peer anchors, read-only calculation stress and 59×7/62/434/readiness/Haki totals/Balanced v1.2/15 direct Matchups/Kaido Defense100 invariants.
- **No changes to** the 60-character roster, `evaluations.ts`, `evidence.ts`, `battles.ts`, `matchups.ts`, production calculation logic, scores, E-labels, model, UI, storage/restore or `PROJECT_SPEC.md`. No changes to any unrelated open PR.
- Test/build/Actions/Pages success must be verified against actual runs, not inferred from added test code.

## v0.1.60 — Kaido Defense100 conditional approval; Ryokugyu evidence provenance; 5 Haki cards

- **Owner-approved conditional targeted adjustment:** Canon/official anime defense comparison supports assigning Kaido an *upper-band relative* Defense100, explicitly not invulnerability. Only `evaluation-kaido` Defense **Base98→99**, Haki Observation Raw **2 unchanged**, Final **99→100**, Overall **96.571429→96.714286**; sorted placement 5→5. Kaido other six axes, same Haki methods and Beat matchup factors stay unchanged.
- Reference existing original-chapter Evidence Ch.951/1042/1000–1049 and supplementary official TV936 for Kaido's hard scales: the Udon training episode is **not** falsely added as an Onigashima Battle Evidence record. Ensure Stamina100's group fight, fatigue and damage survived are not reused as Defense increments. Official TV1015/1076 demonstrate counterattacks and defeat: 100 is scale cap, not immunity.
- **Ryokugyu Defense89/E3 remains unchanged**: add previously existing `evidence-aramaki-regrowth-tv1082` as secondary defense reference alongside `evidence-aramaki-shanks-haki-1055` as combat context; distinguish post-hit regeneration vs prevention/mitigation, and correct its rationale. The 1055 source already mentions regrowth in fact; the prior issue was primarily its `context`-only Defense role.
- Complete **five detailed read-only hybrid Haki case cards**: Vista, King, Jinbe (ordinary Armament independent increment unresolved), Katakuri (future-sight 3 axes), Shanks (Kid scene 3 axes incl. two Haki types in Technique). No automatic Haki Raw changes or non-Kaido score changes.
- Explicit data-version labels for Kaido and Ryokugyu; 59 default/413, 62 evaluation/434 stat, E1 53/E2 243/E3 117, representative Raw226/full Raw244, 15 direct Matchups and Balanced v1.2×0.5 preserved.
- Refresh two narrow baseline tests and prior v0.1.59 source link guard, add `scoreAdjustmentReviewV0160.test.ts` to enforce Kaido new exact vector, source context, remaining Haki scores, unchanged ranking and direct Matchup. [Source/context decision report](docs/V0_1_60_KAIDO_DEFENSE100_HAKI_AND_RYOKUGYU_SOURCE_REVIEW_2026-10-10.md). No production calculation, model/Weight, app UI, save/restore, schemas, SPEC, or Matchup edit. CI/test/build/pages outcome must be checked in actual GitHub runs.

## v0.1.59 — high-E3 case adjudication and 13 Haki Raw overlap decision gate (read-only)

- Independently review **all 14 high-E3 Final≥85 axes**, preserving each Base/Raw/Final, Evidence ID, source context, same-stat anchors, prime/current uncertainty and individual follow-up. Highlight Ryokugyu Defense89's presently connected Shanks-Haki withdrawal source vs its regeneration-based rationale; document candidate linkage/concept issue, NOT proven numeric error.
- Individually classify **13 shared-Evidence Haki Raw events**: 1 provisionally retain / 5 require original-panel confirmation / 4 Base-Raw overlap risks / 3 targeted re-evaluation candidates. Event statuses are not confirmed duplicate bugs or authorizations to reduce Raw. Confirm contemporary approved exceptional-Haki increment criteria vs legacy scores.
- Verify selected ONE PIECE.com episode summaries (Shanks/Kid, Ryokugyu regrowth, Katakuri Future Sight, old Garp Hachinosu) as supplementary context, without claiming independent original manga panel verification.
- Publish [case-by-case audit](docs/V0_1_59_E3_AND_HAKI_RAW_CASE_AUDIT_2026-10-10.md) and [pre-change/approval/next-release decision gate](docs/V0_1_59_DECISION_GATE_AND_V0_1_60_PLAN_2026-10-10.md). Previous v0.1.58 isolated -5 stress is only hypothetical, not suggested adjustments.
- Add diagnostics `scoreCalibrationCasesV0159.test.ts` pinning all 14 high E3 keys and numerical values, all 13 Raw evidence IDs and stat axes, existing 59×7/62/434/Raw226+244/15 Matchup and model compatibility. **No source numeric data, calculation code, UI, persistence, SPEC or matchup modification.** GitHub CI/build/deploy verification is recorded separately from implementation.

## v0.1.58 — 59×7 score calibration baseline, evidence confidence and hypothetical rank sensitivity

- **Read-only numerical validation** of all 59 representative evaluations (413 axes): source-derived Base, per-axis Haki Raw, Final (min(100, Base + Raw×0.5)) and Balanced 1.2 equal-weight Overall, E1/E2/E3 metadata, exact 59-character rank-position baseline and scope of historical revisions. No numeric score changes.
- Freeze [full 59×7 Base/Raw/Final/readiness matrix](docs/V0_1_58_59x7_BASE_RAW_FINAL_READINESS_BASELINE_2026-10-10.md): E1 53/E2 243/E3 117/unset0; representative Raw **226** vs all **62 Evaluations/434 Stats Raw 244** (historical three evaluations account for difference18). E3 **14** with Final≥85; **9** with Final≥90; Speed has E3 **32/59**.
- Document **13 same-Evidence Haki Raw cross-stat reuse instances** for individual Base-vs-Raw and distinct-effect review; these are **possible overlap review items, NOT 13 confirmed bugs**. Highlight source/canon limits and the new Hybrid Haki exceptional-application standard before any edits.
- Stress-test isolated temporary Final Stat ±5 scenarios without changing any stored scores, weighting, ranks, matchups, or Haki. Even a single imagined -5 yields Garp position3→4, Shanks Speed position10→13, Mihawk Speed position9→13, Kuzan CombatIQ position8→13; figures are 59-character sorted positions with ID tie-break, not UI shared Rank or battle win-rate.
- Provide actual same-stat comparison framework and [user decision brief](docs/V0_1_58_COMPREHENSIVE_SCORING_VALIDITY_AND_DECISION_BRIEF_2026-10-10.md): A keep ratings, B explicitly approve only source-supported targeted scores or Haki reviews, C broad formula redesign (not recommended). No automatic E3 penalties, no weighted-model alterations, no SPEC edits.
- New regression `src/domain/calculation/scoreCalibrationDiagnosticsV0158.test.ts`; no production code/UI/data source changes. Follow-on v0.1.59 should perform source-grounded review of high-E3 values and Raw overlap candidates **before** requesting any numerical adjustment approval.

## v0.1.57 — Complete 413-axis default Evidence Readiness classification

- Individually resolve the **last 51** previously unclassified default stat axes across 12 characters: Vista4, Jack3, Smoothie4, Zoro6, Sanji6, Fujitora4, Shiryu3, Van Augur3, Burgess3, Pizarro3, Hancock5, Crocodile7.
- 51 new labels: **E1 +10 / E2 +35 / E3 +6**. Full 59×7 readiness **E1 53/E2 243/E3 117/missing 0**. The complete metadata set is **not** independent verification of every original manga panel or of each numeric score's accuracy; 117 E3 remain explicitly provisional.
- Ground 51 decisions on existing manga-referenced Evidence, evaluator rationale, per-axis roles and selected official ONE PIECE.com TV/character summaries. Keep 5-day Jack combat (enemy rotation and chemical weapon separate), Zoro King flame-state tactical inference, Sanji Queen high-speed Ifrit, Fujitora civilian/meteor constraints, Shiryu Garp ambush, Pizarro attempted ship attack, Hancock Blackbeard suppression, and Crocodile's water/JoZu damage distinctions.
- Maintain **zero new or edited Evidence records**, combat score changes, Haki Raw/weight changes, calculations, ranking, Matchup, Character, data schemas, UI/persistence and PROJECT_SPEC. Only 51 readiness fields plus tests/docs updated.
- Regression: preserve all 59×7 Final, 62 Evaluation/434 Stat, Haki Raw 244 and Matchup15. Add explicit source-role and all-graded readiness coverage test.
- [Full 51-axis adjudication report](docs/V0_1_57_FINAL_51_AXIS_READINESS_AUDIT_2026-10-10.md) · [Scoring-calibration next-step brief](docs/V0_1_57_POST_READINESS_CALIBRATION_BRIEF_2026-10-10.md).

## v0.1.56 — Top-tier era- and context-aware readiness (29 axes)

- Individually audit **29 previously unset readiness axes** across **Prime Garp 7, Teach 6, Kuzan 5, Kizaru 6, Mihawk 5**, comparing actual project Evidence, source roles, evaluator context and official ONE PIECE.com TV/character material; preserve unverified manga panel certainty.
- Assign readiness E1 **+4**, E2 **+19**, E3 **+6** with no numerical evaluation edits. Total default 59×7 readiness: **E1 43/E2 208/E3 111/missing 51** (from 39/189/105/80). The 51 remaining all link primary29/secondary22 Evidence.
- Critical distinctions: Garp **Prime** values use God Valley *Garp+Roger joint* battle while Hachinosu is **older Garp** and cannot independently prove 99 Stamina/98 Speed/97 Combat IQ/91 Versatility. Kuzan's ten-day Sakazuki fight is exceptional **Stamina**, not complete data on Defense/Speed. Kizaru's repeated light-speed movements are E1 for source support, **not proof of the exact 99 score**. Mihawk is strongest in *swordsmanship*, not necessarily all total stats or pure Speed94. Teach dual abilities support multiple combat roles but are not equivalent to Prime Whitebeard power on each axis.
- Protect 59×7 Final/Overall rank, Haki Raw total244 and weight0.5, 62 Evaluations/434 Stat, 15 Matchups, Balanced1.2, B selector, PROJECT_SPEC, UI/persistence, and *all* existing Evidence fact/source/battle metadata. Only readiness metadata and snapshot tests were updated.
- New top-tier regression tests and comprehensive [29-axis audit](docs/V0_1_56_TOP_TIER_29_AXIS_SOURCE_CONTEXT_AUDIT_2026-10-09.md), [80-axis source trace matrix](docs/V0_1_56_80_AXIS_BEFORE_AFTER_TRACE_2026-10-09.md). Next focus remaining 51 axes, then 59×7 score model validation via opt-in numeric revisions.

## v0.1.55 — Five-character combat-context readiness audit, 31 axes

- Manually adjudicate **31 previously unresolved axes** in five character profiles: **Cracker 5, Law 7, Doflamingo 7, Jinbe 6, Shanks 6**, with existing linked Evidence roles, evaluator rationale, and relevant official ONE PIECE.com anime episode synopses.
- New metadata **E1 +9, E2 +20, E3 +2**, all source-aligned. Representative (59×7 = 413) distribution E1 **39**, E2 **189**, E3 **105**, unset **80**. The 80 remaining axes have existing Evidence stat roles: primary **49**, secondary **31**.
- Preserve key combat conditions: Law vs Big Mom was **Law and Kid** vs Big Mom (plus fall/explosion); Cracker vs Luffy involved **Nami** and moisture-based biscuit counter; Doflamingo's organ suture is not full healing, and Gear 4 exposed limits; Jinbe's Ace five-day fight is a project manga citation, not independently confirmed by official TV synopsis; Shanks's **future sight** is separated from pure Speed 95 and Dorry/Brogy's ship destruction.
- E3 high-score caveats explicitly preserved **Shanks Speed 95 and Law Speed 82**. Readiness change is not a character downgrade and does not change Final/Overall ranks.
- No new Evidence items, status fields beyond 31 readiness additions, score edits, Haki Raw, Calculation Model, battle/matchup changes, PROJECT_SPEC or UI changes.
- New full 111-axis before/after trace matrix, 31-axis evidence/canon/context report, and dedicated regression test; update legacy fixed distribution snapshots. Keep v0.1.54 forward product roadmap (after 80 pending axes → 59×7 scale calibration → UX → matchup).
- [31-axis report](docs/V0_1_55_FIVE_CHARACTER_CANON_READINESS_AUDIT_2026-10-09.md) · [111-axis matrix](docs/V0_1_55_111_AXIS_TRACE_2026-10-09.md).

## v0.1.54 — 37 roleless/context-only axis evidence adjudication

- Complete the highest-risk gap pass among 148 unresolved axes: **23 linked with no statContributions for their own axis** + **14 linked only as context**. Classify **37 individually** with **7 E2 / 30 E3**, while explicitly preserving weak/sparse source uncertainty.
- Add 5 carefully justified secondary stat contribution roles and refine 3 context roles to conditional secondary: Vista Versatility, Jack CombatIQ, Cracker CombatIQ, Kuzan Versatility×2, Kizaru Attack, Shiryu Attack, Van Augur Speed. **No canon fact/source/uncertainty replacement or added fabricated Evidence**.
- Readiness distribution E1 **30**, E2 **169**, E3 **103**, missing **111** (59×7 total413). All remaining 111 linked stats have **primary72 / secondary39** evidence contributions, not just context.
- Preserve every existing Final and Overall score, 62 evaluations, 434 stats, Haki Raw 244, 15 matchups, Balanced1.2, B-picker UI, PROJECT_SPEC. Add direct role-specific regression checks and a 148-row audit trace.
- Record next development plan beyond evidence audits: finish remaining 111 graded axes; evaluate 59×7 scale and approved score proposals; review UX clarity; expand direct-matchup context only on actual Evidence; then consider content versions/admin/community by explicit approval.
- [37-axis audit](docs/V0_1_54_ROLELESS_CONTEXT_37_AXIS_ADJUDICATION_2026-10-09.md) · [148-row trace](docs/V0_1_54_148_AXIS_SOURCE_ROLE_MATRIX_2026-10-09.md) · [post-audit roadmap](docs/V0_1_54_POST_AXIS_AUDIT_ROADMAP_2026-10-09.md).

## v0.1.53 — Fix source-link gaps and audit readiness role fidelity (59 × 7)

- Audit the previous 172 unclassified axes (162 had evidence links, 10 did not); classify 24 reviewed axes: all 10 previously zero-link axes and all seven axes for Marco and King.
- Add **3 official anime-synopsis Evidence records** as supplementary, moderate-strength sources. Add **10 Evidence ID links across 7 relevant axes** (Fujitora Defense/Stamina/Speed, Ryokugyu Attack/Stamina/Technique/Versatility). Stamina links only provide context; do not imply independent long-battle proof.
- Leave three low-sample items (Smoothie Speed, Shanks Stamina, Ryokugyu Speed) with zero Evidence IDs and **E3**. Never fabricate links or downgrade combat score because of missing panels.
- Marco Defense becomes the only new E1 based on multiple direct defense events. Other new classifications: E2 ×17, E3 ×6. Counts are E1 **30**, E2 **162**, E3 **73**, missing **148** (out of 413 default character stats).
- Classify all 148 remaining unset axis Evidence-role links: **72 primary, 39 secondary, 14 context, 23 with no explicit stat contribution role**. Record all previous 172 axes in a before/after source-role trace matrix.
- Protect all 59×7 Final scores, 62 evaluations, 434 total stats, raw Haki 244, Balanced 1.2, all 15 matchups, B-picker and PROJECT_SPEC. Extend tests for source linkage and metadata.
- [v0.1.53 report](docs/V0_1_53_LINK_GAPS_AND_EVIDENCE_ROLE_REVIEW_2026-10-09.md) · [172-axis matrix](docs/V0_1_53_172_AXIS_EVIDENCE_ROLE_TRACE_2026-10-09.md).

## v0.1.52 — 189-axis readiness trace, 17 manual ratings, three-character sensitivity study

- Preserve the **entire baseline 189 missing-readiness rows** in an Evidence ID + 7-axis Final Stat trace matrix. After review, 172 remain intentionally unclassified; 10 have no direct Evidence ID link.
- Manually classify **17 previously missing axes**, without changing their scores: Jozu 7 (E2×3/E3×4), Queen 7 (E2×5/E3×2), Katakuri 3 (E2×3).
- Default 413 stat distribution: **E1 29 / E2 145 / E3 67 / missing 172** (previously 29/134/61/189). Haki Raw 244, all 59×7 Final values, 62 Evaluations, 434 Stat entries, Balanced v1.2, 15 matchups and picker B unchanged.
- Review official ONE PIECE.com records of Lucci target selection/cooperation, Queen Germa weapon combinations, Jozu diamond defense. Lucci Combat IQ68 (E3), Queen Versatility80 (E2), Jozu Defense84 (E2) values remain unchanged.
- Quantify *hypothetical, unapplied* one-axis scenario impacts on Overall and leaderboard; do not mistake scenario deltas for canon-backed correction.
- Extend readiness tests, add `readinessComparativeAudit.test.ts` for 17 decisions and score/Raw/Matchup invariants.
- [Full assessment](docs/V0_1_52_READINESS_CALIBRATION_AND_THREE_CHARACTER_ANCHORS_2026-10-09.md) · [189-axis source matrix](docs/V0_1_52_READINESS_189_AXIS_TRACE_MATRIX_2026-10-09.md).

## v0.1.51 — Evidence readiness metadata consistency and priority canon recheck (59 × 7)

- Audit all 413 default Stat readiness fields. v0.1.50: E1 29/E2 131/E3 61/missing 192. Of 192 missing, 182 had at least one linked Evidence ID and 10 had no directly linked Evidence.
- Align **three existing rationale statements mentioning E2** with missing readiness metadata: Shiryu Stamina75, Van Augur Stamina68, Mihawk Defense93. **After:** E1 29/E2 134/E3 61/missing 189; no new E2 assessment, only existing textual rating made structured.
- Record 10 unlinked stat/character axes, outstanding Shiryu armament Source panel check, Lucci/Kaku Combat IQ ambiguity, Jozu Defense, Queen Versatility, Smoothie lack of direct feats.
- Protect 59 representative×7 values, 62 Evaluations/434 Stat, 244 Raw Haki, 15 matchups, Balanced v1.2, PROJECT_SPEC, picker-B UI, and score/rank outcomes. No invented automatic E3 classification.
- [Full v0.1.51 audit](docs/V0_1_51_EVIDENCE_READINESS_AND_PRIORITY_CANON_AUDIT_2026-10-09.md).

## v0.1.50 — 59×7 deep audit and Cracker explanation consistency (no score change)

- Check the unchanged 59-character Final Stat baseline by axis with medians, extrema, concentration, prioritized commander/peer matchups and conditional canon context. Retain the existing v0.1.49 equal-weight Overall diagnostics; do not invent win rates.
- **Confirmed data-text bug fixed:** Cracker Attack rationale Final 74 → 77 (Base 75 + Armament Raw 4 × 0.5), Defense rationale 76 → Final 81 (Base 81). Stamina Evidence impact's stale “70대 초반” phrasing rewritten to match the current 80 and distinguish ability use from body durability.
- Add regression test locking Cracker Final [77,81,80,75,80,75,77], Raw 4, Overall 77.857 and explanatory consistency.
- Preserve numeric stats, 244 Haki Raw, 59 evaluated characters, 62 Evaluations, 434 Core Stats, 73 Memberships, 15 Matchups, Balanced v1.2, `PROJECT_SPEC.md`, picker B UI and theme. Pending canon decisions (Jozu Defense, Queen Versatility, Shiryu Haki source, Smoothie evidence scarcity, Lucci Combat IQ) remain **unmodified**.
- [59-character final score table and full audit](docs/V0_1_50_SEVEN_AXIS_DEEP_AUDIT_AND_CRACKER_RATIONALE_2026-10-09.md).

## v0.1.49 — Overall measurement validity, uncertainty and scenario sensitivity audit (59 × 7)

- Audit the exact Balanced 1.2 calculation model and all 59 default character Final Stat arrays (413 data points), distinguishing arithmetic reproducibility from unmeasured score inter-rater reliability and absent independent matchup predictive validation. Do not alter the calculation algorithm.
- Quantify evidence readiness metadata: **E1 29 / E2 131 / E3 61 / missing 192** across 413 default axes. Missing is NOT automatically E3 or low power. Add an automated audit regression.
- Show identical Overall but very different distributions: Kanjuro vs Ulti both **75.143** (sum of seven absolute differences **78**) and Cracker vs Karasu both **77.857** (sum **30**).
- Diagnostic weighting, explicitly not approved models: physical illustrative 25/20/20/20/5/5/5 and strategy illustrative 10/10/10/10/20/20/20. Jack's sorted position **36→25/44**, with meaningful shifts for Jozu, Kid, Law and other roles. Leave-one-axis-out 7×6-equal-mean comparison included.
- Provide a compact explanatory note below the existing Character Overall card: equal-weight average, not a win probability or canon power order. Ranking and Matchup semantics stay unchanged. No new colors or UI navigation.
- Preserve all **60 Characters, 59 unique ranked, 62 Evaluations, 434 Stats, 73 Memberships, 244 Haki Raw**, 15 direct Matchups, the 7 core-stat definitions and `PROJECT_SPEC.md`.
- [Complete documented metrics, comparison cases and experiment limits](docs/V0_1_49_OVERALL_VALIDITY_AND_SENSITIVITY_59x7_2026-10-09.md).

## v0.1.48 — B searchable group selector + Overall validity audit

- Replace overcrowded horizontally scrolling group tabs with an accessible labeled Group native dropdown, retain existing current-Group character chips.
- Add '전체 캐릭터 찾기' search picker: share the proven name/alias/group matching algorithm, 59 unique characters regardless of 73 memberships, explicit current/historical affiliation, group filter, Enter/Arrow/Escape, focus restoration, backdrop close, scroll lock, responsive mobile sheet.
- Preserve independent Matchup Arena's left/right character selection and evaluation states, rankings, 62 evaluations/434 stats, original Balanced1.2, Haki weight0.5, Haki raw sum244, 15 direct matchups, and global colors.
- [Detailed assessment](docs/V0_1_48_PICKER_B_AND_OVERALL_VALIDITY_2026-10-09.md): Attack90 vs Defense89 does NOT establish a breach/win; 7-axis arithmetic-mean Overall is reproducible but not externally validated as matchup predictor. No change to rating model or PROJECT_SPEC.

## v0.1.47 — Evidence-guided A-path 59-character seven-axis cross-audit and six calibrations

- User approved the incremental A approach (keep existing Balanced v1.2, Haki Raw ×0.5, 7 axes, no rank-forcing, no global theme changes). Audited all **59 unique evaluated × 7 Final Core Stat** records and independently asserted **53 untouched character arrays** in a new regression file.
- Recalibrate six targeted **Draft** records (not an automatic commander-position bonus): **Jack 74.857→78.143** (Zou five-day uninterrupted engagement, swapped Mink kings/army, physical durability), **Kid 82.571→84.571** (Big Mom 2v1, Speed **78→82**, Versatility **86→80**, attack/defense/stamina/technique independently scored), **Karasu 80→77.857** (avoid assigning revolutionaries' joint admiral mission to individual IQ/attack), **Marco 81.714→83.429** (defense, fatigue-limited regeneration/support), **King 81.286→83.000** (conditional Lunarian defense / firepower), **Katakuri 82.714→84.286** (precision awakening, Snakeman response separate from Haki Raw).
- Explicitly compute King's final Attack **85 = Base83 + existing Armament Raw4×0.5**, Technique **81 = Base80 + Raw2×0.5**; Katakuri Defense **84 = Base81 + existing Observation Raw6×0.5**, Technique87 and Combat IQ84 similarly. **Total Haki Raw remains 244** with no new contribution or double-count.
- Comparative evidence check against Garp's Attack **99** vs Marco **77**, Law's Combat IQ/Versatility vs Kid, Jack vs all Tobi Roppo, and three first commanders vs users' specified other groups; keep skill-specific differences rather than flat commander bonuses.
- 14 more close peers assessed for data quality/source limits (Jozu, Vista, Smoothie, Shiryu, Cracker, Queen, Inuarashi, Nekomamushi, Denjiro, Ashura Doji, Who's-Who, X Drake, Doflamingo, Hancock) **without inventing new numbers**. The 75–80 band increases from 25 to 27 members, so this patch does **not** attempt arbitrary global score smoothing.
- All 60 Characters / 59 unique evaluations / 62 Evaluation / 434 Stat / 73 Membership / 15 direct Matchup remain; new data version only on six; existing global theme and `PROJECT_SPEC.md` unchanged. New `fullRosterCalibration.test.ts` checks all seven axes and canonical 53-unchanged baseline.
- [Full 59×7 cross-comparison and source-cited reasoning](docs/V0_1_47_A_PATH_59_CHARACTER_SEVEN_AXIS_CROSS_AUDIT_2026-10-09.md).

## v0.1.46 — Official episode evidence source/context verification

- Validate the v0.1.45 Wano three-group and CP0 evaluation records against ONE PIECE.com official TV episode summaries, keeping facts / 1v1 vs supporting troops / judgments separate.
- Correct X Drake's **mistaken Sasaki/Black Maria 1042 episode URL** to the actually relevant 1060 and 1069 CP0 skirmish references; add Ulti's 1038 Zeus/Nami finishing source alongside Big Mom's 1033 attack.
- Fix the **Kid & Law vs Big Mom event**: 1066 documents Kid's Damned Punk and Law's contribution while 1067 confirms the win after fall/explosion. Preserve their 2v1 outcome and distinguish the individual feat.
- Fix **Who's-Who vs Jinbe** from isolated `1v1` to `multiple-vs-one` for Who's-Who's hidden soldiers (1038) prior to Jinbe's finishing strike (1040). Do not treat this as pure 1v1.
- Audit Lucci and Kaku `combatIQ` rationale: late Seraphim/Lunarian insight happened even to Zoro (1110); Kaku proposing a joint battle is a positive feat (1109); Sentomaru command attack (1100/1101) and Vegapunk surprise attack (1125) are Lucci positives. Preserve numeric IQ **68/72** and overalls **78.000/74.286** but mark both IQ axes **E3 provisional**, requiring evidence-driven follow-up rather than asserting unsupported individual stupidity.
- Add `officialEpisodeCrosscheck.test.ts` to lock source pairings, combat scenario, IQ uncertainty and roster/calculation invariants. Preserve 60 Character / 59 unique evaluations / 62 Evaluation / 434 Stat / 73 Membership, Haki Raw 244, 15 direct matchups, Balanced 1.2, global UI colors and `PROJECT_SPEC.md`.
- [Cross-check and remaining limits](docs/V0_1_46_OFFICIAL_EPISODE_CROSSCHECK_2026-10-09.md). Original manga panel-level full access remains outstanding; evidence is still `supplementary` and new scores are still drafts.

## v0.1.45 — Kid Pirates / Akazaya Nine / Tobi Roppo, evidence-first draft evaluations

- Add 3 groups, 17 **draft** Characters (Kid Pirates 2, founding Akazaya Nine 9 incl. former Kanjuro, Tobiroppo 6 incl. undercover marine X Drake), 17 Evaluations/119 draft stats, **30 contextual Battle records** and **55 supplementary Evidence records** referencing ONE PIECE.com profiles and official TV recaps. Individual scenes still require direct manga panel audit before canon-level promotion.
- Record Kinemon as Akazaya leader without power-based ordering, Kanjuro as former, fallen Ashura Doji as historical, Drake's Tobiroppo/Beasts membership as former while SWORD Marines is primary. Kid crew's last documented organization is historical after its defeat; do not claim personal deaths or new affiliations.
- Additional Lucci/Kaku cross-calibration: Lucci `80/77/82/82/83/68/74` Overall **81→78**, Combat IQ **78→68** based on repeated situation-assessment failures while preserving successful Sentomaru command disruption; Kaku `73/72/75/75/79/72/74` Overall **78.429→74.286**. Evaluation points remain interpretations, not canonical ratings. No generic positional/celebrity debuff.
- Totals: **60 Character master, 59 unique evaluated, 62 Evaluation, 434 Stat, 73 Membership**. Existing typed Haki application count **49** and Raw sum **244**, 15 direct matchups, Balanced v1.2 and Haki weight0.5 remain unchanged.
- Added additive `wanoSeeds.ts`, `wanoExpansion.ts`, and `wanoCombatEvidence.ts` (13 extra episode-scoped Battle contexts, 21 actor-specific Event/Evidence records) (not hardcoded in UI) and four direct Wano-domain regression tests. Existing regression tests were updated to retain legacy checks while verifying 59-member ranking, all 17 new scores, old totals, no Haki double count. No deletion or weakening to mask failures.
- [Full character score/evidence/context report](docs/V0_1_45_WANO_THREE_GROUP_EVIDENCE_RECALIBRATION_2026-10-09.md). No change to `PROJECT_SPEC.md` or app-wide color theme.

## v0.1.44 — Cross-character evidence recalibration (Lucci / Kaku / Morley)

- Compare 7-axis source-specific evidence for Lucci and Kaku against Zoro/Sanji/King/Marco/Katakuri/Queen/Cracker. Lucci's repeated inflated assumptions from fighting Gear 5 and Zoro and Kaku's brief/unresolved Zoro clash corrected; **Lucci 84.429→81.000**, **Kaku 82.143→78.429**.
- Evaluate Morley's canonically demonstrated underground movement, terrain shaping and restricted Mariejois engagement under the full Speed definition (mobility and repositioning included). **Morley 76.857→79.286**, while acknowledging that protected Celestial Dragons restricted Admirals and no decisive individual damaging feat is proven.
- Add **2 Evidence** records (Lucci vs Zoro official 1141/1144/1145; Morley vs Aramaki Ch.1083 cross-checked, marked supplementary) and **1 Battle** context. The Morley account is explicitly caveated as supplementary pending direct verification of Chapter 1083 panels.
- Change only three draft Evaluations (21 Stat axes re-audited; 18 changed and 3 Morley axes unchanged), version `evaluation-0.1.44-cross-calibrated-draft`. Preserve legacy 39 plus Sabo/Karasu/Stussy, all memberships, current global UI colors, Haki Raw 244, Balanced 1.2 and 15 existing direct matchups.
- [Full before/after, evidence, rank and next-group shortlist](docs/V0_1_44_CROSS_CHARACTER_CALIBRATION_AND_NEXT_GROUPS_2026-10-09.md).

## v0.1.43 — Evidence-only recalibration of six Revolutionary Army / CP0 drafts

- Re-audited all 42 evaluation axes, 14 linked Evidence records and 10 Battle contexts. Kept 39 previous Evaluations, approved Hybrid A Haki Raw sum 244 and 15 direct matchups exactly unchanged.
- ONE PIECE.com TV Episode 1109 explicitly documents **Kaku personally proposing** a temporary Luffy/Zoro alliance against Seraphim; Combat IQ **79→82** (E2), without double counting group damage.
- Stussy's Episode 1104 surprise betrayal does not establish equal-condition physical speed: Speed **83→80** (E3). Episode 1105's 20-year intelligence infiltration is not a direct proxy for close-combat judgment: Combat IQ **88→85** (E2), related Evidence role `primary→secondary`.
- Sabo, Morley, Karasu and Lucci retain all seven existing draft scores after condition-aware evidence audit; insufficient new independent evidence to select a justified numerical change, especially E3 stamina/power/speed axes.
- Kaku Overall **81.714→82.143** (overall rank 23 unchanged), Stussy **78.429→77.571** (overall rank 33→34). Calculated from original seven-stat Balanced 1.2, Haki Weight 0.5, and no new numeric Haki bonuses.
- New v0.1.43 evaluationDataVersion on all six reviewed records; `PROJECT_SPEC.md`, global colors, roster/memberships, other 39 evaluations and numeric model unaffected. These six are still *Draft*, not canon ratings.
- [Full six-character before/after and source audit](docs/V0_1_43_REVOLUTIONARY_CP0_EVIDENCE_RECALIBRATION_2026-10-09.md).

## v0.1.42 — Special explanations vertical again; Korean fruit names

- Per user screenshots, retain **one grouped category heading** (e.g. `악마의 열매 / 종족 특성`) while rendering each Special trait **full-width vertically in its prior plain divider layout**, not two boxed columns. Other profile, Haki and app color styles unchanged.
- Normalize visible fruit names in character data (not IDs): 사보 **이글이글**, 로 **수술수술**, 핸콕 **매료매료**, 카타쿠리 **쫀득쫀득**, 카라스 **그을음그을음**, 몰리 **밀어밀어** 열매. Korean naming relies on commonly documented Korean localization; original Japanese official pages remain the source for underlying ability descriptions. Do not change Evidence IDs or evaluation data.
- No overall color theme or model/calculation/evaluation data changes. Numeric six-character recalibration is a **separate review step**, not implied by label corrections.

## v0.1.41 — Special Profile Presentation and Readiness Help

- Display one grouped Special category heading (e.g. **악마의 열매 / 종족 특성**) with the original, separate ability descriptions in two columns, responsive to one column on narrow screens. Display order always prioritizes Devil Fruit; underlying `SpecialCombatTrait` and Evidence data are not modified.
- Explain the canonical E1/E2/E3 Evidence readiness levels in a core-stat-header '?' dialog. E4 is explicitly **not yet defined**; it is neither a score grade nor silently introduced into types/calculation. Outside pointer, Escape, focus return covered by a new jsdom test.
- Replace the Beasts Pirates generic chess rook with an original, small horned-skull-and-crossbones SVG motif; it evokes the crew's Jolly Roger but does not claim to reproduce licensed official artwork.
- Polish six new Revolutionary Army/CP0 characters' Korean ability descriptions and retain their IDs, Event/Evidence links, original powers, and all existing numeric evaluations.
- All existing global colors, Haki statuses/Raw, scoring/weights, 49 Memberships, 45 Evaluations (315 stats), 42 unique evaluated characters, 15 direct Matchups unchanged.
- PR #35 CI: **37 test files / 165 tests passed**, `tsc -b && vite build` passed. Postmerge Pages/manual mobile visual QA separately tracked.
- [Patch review](docs/V0_1_41_SPECIAL_PROFILE_AND_READINESS_2026-10-09.md).

## v0.1.40 — Compact Haki UI, Character Motifs and Current-Affiliation Ordering

- Three Haki type rows now display compact status and a `?` evidence popover. Keep qualitative greatness/uncertainty text inside the popover, close on outside press or Escape, and preserve the Special combat tooltip.
- Show **열매 각성자** only with explicitly verified Devil Fruit awakening metadata (Law, Doflamingo, Katakuri, Lucci, Kaku); remove redundant Combat Style awakening tags. Sanji uses **스카이워크** without overlapping `공중전`.
- Remove Mihawk `강자 요격`: canon Marineford obstruction is a *battle purpose* not an independent fighting style; reduce redundant swordsman/brawler labels.
- Character detail shows a small group symbol, custom simplified Whitebeard moustache-skull, and muted admiral red/blue/yellow/violet/green individual accents. Whole app theme stays unchanged.
- Sort each group **captain → explicit deputy/unit number → ko-KR name** where rank is unproven, with marine/revolutionary official rank order. Never derive hierarchy from Overall score.
- Kuzan now has **current Blackbeard Pirates 10th ship captain** Membership and previous Marine Membership; Jinbe has former Warlords Membership while retaining current Straw Hat; only the Whitebeard Pirates' deceased final captain Newgate is exempted from a misleading `과거 소속` UI tag in that final crew, his Rocks-era membership remains historical.
- Expanded Membership count **47→49**, 43 Characters/42 rated unique/45 Evaluations/315 Stats. Numeric ratings, Haki raw sum and 15 matchups unchanged.
- Whole-app One Piece palette **requires user confirmation**: [three unimplemented palettes](docs/UI_COLOR_PALETTE_OPTIONS_2026-10-09.md).
- [Full review](docs/V0_1_40_PROFILE_UI_AND_MEMBERSHIP_2026-10-09.md).
- Post-merge QA [PR #33](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/33): all three Haki statuses expose `?` even when optional detail notes are absent. The popover states no further explanation is registered instead of inventing Evidence; adds one jsdom regression test, preserving domain data and all scoring.

# Changelog

## v0.1.39 (혁명군·CP0 Evidence 기반 신규 6인 초안)
- 기존 그룹 `revolutionary-army`, `cp0`에 사보·몰리·카라스 및 로브 루치·카쿠·스튜시 6명 추가; 스튜시는 CP0 이전 소속으로 표기.
- 공식 원작/애니 프로필 출처를 구분한 신규 전투 맥락 10건, Evidence 14건, 7축 Evaluation 6건(42축, E2/E3)을 등록.
- 예외적 패기 Raw 신규 추가 없음. 기존 Hybrid A 승인 수치 39개 Evaluation과 15 Matchup의 계산 값 불변.
- 새 6명 점수는 사용자와 세부 검토할 Draft이며 E3는 능력이 낮다는 증거가 아님. 공식 서열/1대1 승률 확정 아님.
- [세부 검토 보고서](docs/V0_1_39_REVOLUTIONARY_ARMY_CP0_INITIAL_EVALUATION_2026-10-09.md)

## v0.1.38 (사용자 승인 A — 병합 준비)
- **A안 승인:** 사카즈키 방어 94/2→95/0, 쿠잔 공격 91/4→93/0, 방어 92/2→93/0, 카타쿠리 공격 79/4→81/0. 39 평가 273 스탯의 Final·Overall·매치업은 변동 없음.
- Typed Raw 53건/256→49건/244. 기존 Evidence 연결은 유지, 개별 평가 데이터 버전 0.1.38-hybrid-A-approved 기록. B안 중복 위험 Raw 6건은 미승인.
- 한국어 용어 및 산먹깨비 이명은 같은 배포에 포함. 혁명군·CP0 데이터는 별도 후속 PR.

## v0.1.37 (사전 검토 기록)
- 정식 단행본 112권 1139화 표제에 근거해 스코퍼 가반 이명 **산먹깨비**를 **해적왕의 왼팔**보다 우선 표시.
- UI 스탯·계산식·전투 맥락·선택 화면의 영어를 한국어 표기로 통일; 카무사리 및 패기·기본점수·최종점수 통일.
- 계산 원본/ID/평가 데이터 유지. Hybrid Raw 4건 및 확장 10건의 승인 전 Base 재분류 후보를 독립 시뮬레이션으로 검증.
- 차기 혁명군·CP0의 근거 조사 문서를 추가했으나 신규 캐릭터/점수는 아직 미등록.
- **승인 전 main 병합/배포 금지. 패키지 버전 v0.1.34 유지.**

## v0.1.36 (Draft) — Featured Matchup Selection and Haki Overlap Stress

- Matchup Arena FEATURED pills now highlight the actual selected matchup with dark fill, strong outline and checkmark; `aria-pressed` and keyboard focus ring preserve accessible button semantics. Selection follows swap, manual roster/era changes and randomization without duplicated state.
- Evaluated **six potentially cross-stat duplicated Haki Raw entries** using scene-specific canon/official context for Shanks, Katakuri, Linlin and Kuzan.
- Added **non-production-only** `previewHybridOverlapStress()` excluding precisely Raw 28 at a fixed Base to show 39-Evaluation numeric sensitivity. This **is not a score recommendation or a legitimate statistical lower bound**, since valid Haki effects can also be excluded.
- Current official draft scores, 39 Evaluations/273 Stats, 15 Matchups, 36-default-character roster, all calculation models, PROJECT_SPEC and v0.1.34 product version remain unchanged.
- Added jsdom selection/reverse/era/random regression tests, score impact/nonmutation/stale-review tests and detailed [scene report](docs/HYBRID_HAKI_OVERLAP_SCENE_REVIEW_2026-10-09.md).

## v0.1.35 (Draft) — 14-Application Hybrid Raw Review & Non-Production Base Rebase

- Added typed, evidence-guarded decisions for **all 14 existing Haki Raw contributions** across Sakazuki, Kuzan, Shanks, Katakuri, Big Mom, with Mihawk as no-Raw comparison.
- Proposed four ordinary-Haki Base transfers with exact original/migration pairs:
  - Sakazuki Defense `94+0.5×2→95` becomes `95+0`.
  - Kuzan Attack `91+0.5×4→93` becomes `93+0`.
  - Kuzan Defense `92+0.5×2→93` becomes `93+0`.
  - Katakuri Attack `79+0.5×4→81` becomes `81+0`.
- New **non-mutating preview** checks all 39 Evaluation States and 273 Stat values, and guards unchanged Balanced 1.2 outcomes; remaining ten allocations stay unresolved under approved exceptional marginal-effect/double-counting gates.
- **Not** a production numeric data migration or endorsement of inherited Base/Final values. At weights other than 0.5, score-equivalence is not guaranteed.
- Added official ONE PIECE.com Ep.857 supporting Evidence for Katakuri's calm-dependent future sight and mochi-body evasion; labelled as supplementary official-anime corroboration, not a novel standalone attack/point.
- Katakuri's Attack, Defense, Technique, Combat IQ Evidence readiness recorded **E2**; legacy score/Haki Raw unchanged, Evaluation Data Version advanced for this single evidence review.
- Across 273 Stats, Evidence readiness unassigned **196→192**, empty Evidence links remain **11**. All matchups, ranking, calculator code and weights unchanged.

## v0.1.35 (Draft) — Evidence-First Pilot Calibration (No Score Change)

### Actual data repair
- Added 3 marineford battle-context records and 4 Sakazuki canon Evidence entries: Squard deception (Ch.563), Meteor Volcano (Ch.564–565), Ace protecting Luffy (Ch.574), Luffy/Jinbe escape pursuit (Ch.578), supported by ONE PIECE.com episode summaries 472, 474, 483 and 488.
- Linked Sakazuki's previously unsupported **Technique / Combat IQ / Versatility** Stat rationales to explicit context-aware Evidence while keeping **Speed without numerical-comparative Evidence**.
- Sakazuki readiness: six E2 axes and Speed E3. The existing **97/95/96/86/91/91/91, Overall 92.429, Raw 2** are unchanged. Individual evaluation data version updated to `evaluation-0.1.35-evidence-only-draft`.

### Hybrid pilot
- Published [six-character Raw review](docs/HYBRID_HAKI_PILOT_RECALIBRATION_2026-10-09.md) for Sakazuki, Kuzan, Shanks, Mihawk, Linlin and Katakuri.
- Explicitly distinguished confirmed exceptional applications from Haki incremental *numeric* bonus eligibility; no +N/-N or revised ranking based only on titles or shared scenes.
- Missing linked Evidence Stat rows: **14 → 11**; unassigned readiness Stat rows: **203 → 196**. These reductions reflect specific, checked links, not fabricated sources.
- Legacy 39 Evaluations, 273 Stat rows, 53 typed Raw, total Raw 256, 15 Matchups and Balanced 1.2 / Haki Weight 0.5 remain preserved.

### Gates
- Retain production v0.1.34 until numerical candidate rubric, whole-roster effects and separate final approval.
- New regression test guards all canonical links, battle context, Sakazuki E2/E3, Evidence owner, stable 39 scores and no model drift.

## v0.1.34 — Hybrid Haki Standard Ratification, Non-numeric Excellence & Matchup Audit

### Approved methodology
- Confirmed the guarded Hybrid approach in PROJECT_SPEC §5: routine Haki inseparable from actual performance is included in Base; only exceptional applications with **separately demonstrated, nonduplicated target-Stat marginal impact** can be *considered* for Raw.
- Neither capability presence nor renowned title nor scene count yields a fixed +N, and indirect proof of mastery is preserved as inference.
- Current 39 legacy numeric Evaluations and Balanced 1.2 / Haki Weight 0.5 remain unchanged until 273-item canon/context comparison is reviewed and separately approved.

### Haki evidence and profile UI
- Added optional, backward-compatible `HakiExcellenceAssessment` with `direct-application` vs `strong-inference`, evidence links, era, rationale and uncertainty. This is nonnumeric and is never an input to scoring.
- Mihawk: confirmed Yoru Black Blade + Ch.779 sword-coating training, high Armament mastery *inference*, not an official statement that he personally permanently forged Yoru.
- Shanks Conqueror's, Katakuri Observation, Garp Armament and Garp *prime* Conqueror's have carefully distinguished qualitative records.
- Added Mihawk's training Battle and Evidence without changing Evaluation totals. Render unobtrusive source-strength notes and nonnumeric caveats in combat profile.

### Previously merged changes on v0.1.34 line
- PR #22: 4 contextual matchups (Sakazuki/Kuzan; current Rayleigh/Kizaru; Kaido/Linlin; Jozu/Kuzan), read-only Haki reuse guard, popup outside-click/Escape.
- PR #23: 39-Evaluation/273-stat baseline diagnostic and risk-ranked recalibration review, no score changes.

### Validation
- Existing 37 Characters/41 Membership/36 default evaluated roster, 39 Evaluations/273 stat rows, 15 Matchups, core calculation and feature workflows remain in scope for CI regressions.
- New source-linked Haki profiles are checked for confirmed capability, owner-matching Evidence, readable interpretation and uncertainty.
- Full mobile/browser visual verification and new-calibration scoring review are separate from unit/jsdom CI.



## v0.1.33 — Legendary Era Expansion & Evidence Readiness

### Character / Evaluation
- Added 7 Characters: 골 D. 로저, 실버즈 레일리, 스코퍼 가반, 록스 D. 지벡, 에드워드 뉴게이트, 카이도, 샬롯 링링.
- Added 9 numeric Evaluations:
  - 로저 전성기
  - 레일리 전성기 / 현재
  - 가반 현재
  - 록스 갓 밸리 자연 상태
  - 뉴게이트 전성기 / 정상결전
  - 카이도 오니가시마 전성기
  - 링링 오니가시마 전성기
- Prime Gaban remains E3 / no numeric Evaluation.

### Calibration
- Roger prime: 97.571.
- Newgate prime: 97.571.
- Rocks natural God Valley: 97.286.
- Kaido Onigashima: 96.571.
- Current Garp: **93.714 → 94.429** after Hachinosu re-review.
- Big Mom Onigashima: **94.286**, preserving top-tier power/endurance while lowering Speed/Combat IQ relative to the first draft.
- Prime Rayleigh: **92.857 / E2**, avoiding automatic Admiral+ scaling from title/reputation.
- Current Gaban: **92.143**, keeping him in the Admiral band rather than treating survival against Imu as proof of 94+ overall.
- Current Rayleigh: 90.286.
- Marineford Newgate: 92.857.

### Evidence / Haki
- Added Canon Battle/Evidence records for Roger/Newgate Ch.966, God Valley, Rayleigh/Kizaru, current Gaban's Elbaf combat, natural Rocks, Marineford Newgate, Onigashima Kaido/Big Mom.
- Demonized Rocks remains a state-specific scale context and is not imported into natural Rocks Defense/Stamina.
- Haki Capability, typed Stat Application and Matchup Interaction remain separate.
- Current Gaban uses confirmed Observation application in Combat IQ; past Conqueror output is not copied into current Raw Haki.
- Marineford Newgate keeps typed Raw Haki at zero where the current-state application is not clear enough.

### Evidence readiness
- Added optional per-stat E1/E2/E3 Evidence readiness.
- Readiness is displayed in Stat / Evaluation Trace UI and does not alter score calculation.
- Prime Rayleigh uses E2 across all seven stats; Prime Gaban remains unscored E3.

### Membership / UI
- Added historical Rocks Pirates memberships for Newgate, Kaido and Linlin.
- Historical/former Group contexts show a compact “과거 소속” label.
- Ranking and Matchup selector remain Character-unique.

### Compatibility
- 37 Character master pool / 36 evaluated unique Characters / 41 Memberships / 39 Evaluations.
- Balanced 1.2, Haki Weight 0.5 and the seven-stat arithmetic mean are unchanged.


## v0.1.32 — Multi-Membership / Character-Unique Roster

### Architecture
- Group navigation remains Membership-expanded.
- Ranking and Matchup selection consume a Character-unique representative roster.
- Representative Group prefers legacy `Character.crewId`, then current Membership, then first valid Membership.
- Distinct Group/status/period Memberships are allowed; exact duplicate Memberships remain invalid.

### Data
- Added former Seven Warlords Memberships for 쥬라큘 미호크 and 크로커다일 while preserving Cross Guild as their representative Group.
- 30 Character master pool / 29 evaluated unique Characters / 31 Membership rows / 30 Evaluations.

### Search / UI
- The same Character may appear in multiple Group tabs.
- Search can match secondary/historical Group Memberships but deduplicates suggestions by Character.
- Rankings remain 29 unique rows.

### Model compatibility
- No Evaluation score changes.
- Balanced 1.2, Haki Weight 0.5 and Matchup no-win-probability policy unchanged.

## v0.1.31 — Two-Fighter Matchup Builder

### Identity
- 돈키호테 도플라밍고 knownAs에 공식 이명 '천야차'를 추가.
- 표시 순서를 천야차 → 조커로 유지.

### Matchup Arena
- 좌/우 Character independent selection.
- Multi-Evaluation state selection support.
- SWAP / RANDOM / FEATURED controls.
- Left/Right perspective panels:
  - Core Stat edges
  - Combat style / Special / confirmed Haki toolkit
  - favorable / risk / conditional evidence-aware factors
- Combined panel:
  - Overall scoreboard
  - 7-Core radar
  - Tale of the Tape
  - registered Matchup factors
- Arbitrary pairs are allowed, but no matchup conclusion is created when direct pair Evidence is absent.

### Deferred matchup roadmap
- Evidence-graph based good/bad matchup recommendations.
- Distance / terrain / injury / preparation scenario controls.
- Shareable matchup URLs and local/history favorites.
- Direct battle timeline inside Matchup.
- Community picks/comments after persistence and moderation exist.
- Multiple calculation-model overlays.
- No probability model until separately validated.


## v0.1.30 — Apex Calibration & Matchup Arena

### Calibration
- Prime Garp: 97.429. God Valley direct evidence remains the primary state; current Hachinosu repertoire is only a clearly labeled secondary inference for Versatility/decision calibration.
- Current Garp: 93.714. Raises Attack/Speed/Technique/Stamina/Combat IQ while preserving Shiryu protection injury and multi-party rescue context.
- Kuzan: 92.714. Adds explicit post-Blue-Hole return Evidence; recovery/continuation primarily supports Stamina and only secondarily Defense.
- Crocodile: 79.000. Removes current bounty/Cross Guild status as an implicit physical-combat growth proxy; keeps Technique and Combat IQ as principal strengths.

### UX
- Stats remains the default first screen.
- Matchup moves from the Character Detail third tab to a separate top-level Matchup Arena opened through a VS navigation control.
- Arena adds radar visualization, Tale of the Tape and evidence-aware factor cards without numeric win probability.
- Character Detail returns to two focused tabs: Evaluation Trace and Battle/Canon Evidence.

### Future Community
- Community opinion entry points are planned next to Stat/Evidence records, but no non-functional icon is rendered before persistence/authentication are implemented.
- Community data remains separate from Official Evaluation.


## v0.1.29 — Cross Guild, Prime Garp Recalibration & Matchup UI

### Evaluation / Evidence
- 쥬라큘 미호크와 크로커다일의 Character / Battle / Evidence / Evaluation 추가.
- 버기는 Character master pool에만 등록하고 E3 미평가 유지.
- 전성기 몽키 D. 가프에 Ch.1165 Supreme King Haki의 Attack / Defense / Technique Application을 분리 반영.
- 쥬라큘 미호크는 샹크스와 동일 최상위 밴드에서 sanity-check하되 세계 최강 검사 칭호를 모든 Stat 자동 보너스로 사용하지 않음.
- 크로커다일은 Technique / Combat IQ 강점을 유지하면서 Attack / Defense / Stamina / Speed를 직접 Evidence 중심으로 보수화.

### Matchup / UI
- Matchup repository/application/UI 흐름을 추가하고 Character Detail에 세 번째 '매치업 분석' 탭 추가.
- 기존 6개에 쥬라큘 미호크-샹크스 / 쥬라큘 미호크-롤로노아 조로 / 쥬라큘 미호크-비스타 / 크로커다일-돈키호테 도플라밍고 / 크로커다일-죠즈를 추가해 총 11개.
- 복수 Evaluation 상태가 지정된 매치업은 선택한 상태에서만 표시.
- 승률·고정 보너스 미도입.

### Model / Compatibility
- Balanced 1.2, Haki Weight 0.5, 7 Core Stat, Special 비수치 원칙 유지.
- PROJECT_SPEC.md 변경 없음.
- 30 Character master pool / 29 evaluated roster / 30 Evaluation.


## v0.1.28 — Multi-state Evaluation, Korean Analysis Names & Matchup Expansion

### Evaluation / Data
- 한 Character에 복수 Evaluation 상태를 연결할 수 있도록 Evaluation Repository와 Application 조회 API를 확장.
- 몽키 D. 가프를 단일 Character로 유지하면서 전성기(default) / 현재 두 Evaluation으로 분리.
- 현재 몽키 D. 가프용 하치노스 직접 Evidence 4건(Blue Hole, 시류 보호 피격·반격 맥락, Galaxy Divide, 구조전 지휘)을 추가.
- 현재 몽키 D. 가프 Draft: 94 / 90 / 92 / 93 / 94 / 92 / 83, Overall 91.143.
- 기존 27 Character는 유지하고 Evaluation record는 28개로 증가. Ranking은 default Evaluation 한 개만 사용.

### UI / Naming
- Character 상세에서 복수 Evaluation이 있으면 평가 시점 선택 버튼을 표시.
- 설명·평가 rationale·전투 기록·Evidence·Combat Profile의 캐릭터 이름을 한글 공식 주표기 이름으로 표시하는 presentation normalization 추가.
- 공식 통칭/이명/칭호 배지와 검색 기능은 유지해 본명과 별칭의 역할을 분리.

### Matchup
- Matchup participant에 Evaluation state id를 선택적으로 연결할 수 있도록 확장.
- prototype 3개 → 6개: 기존 마르코-알베르 / 트라팔가 로-마샬 D. 티치 / 보아 핸콕-마샬 D. 티치에 현재 몽키 D. 가프-쿠잔 / 롤로노아 조로-알베르 / 상디-퀸 추가.
- 승률·고정 보너스는 도입하지 않고 confirmed/supported/unclear와 조건·불확실성 구조 유지.

### Next
- 다음 신규 집단은 크로스 길드. 쥬라큘 미호크·크로커다일을 우선 전방위 조사하고 버기는 Evidence 충분성에 따라 평가 여부를 결정.


## v0.1.27 — Canonical Identity, Era Metadata & Public Pages Sync

### Character Identity
- Character에 공식 주표기 이름과 `alias / epithet / title`을 분리한 `knownAs` 구조를 추가.
- ONE PIECE.com 공식 캐릭터 페이지·공식 VIVRE CARD/애니메이션 자료로 확인되는 통칭·이명·칭호만 등록하고 출처를 함께 저장.
- 주표기 이름을 공식 primary name 원칙에 맞게 보정: 알베르(킹), 샬롯 카타쿠리/스무디/크래커, 롤로노아 조로 등.
- 사카즈키는 주표기 이름을 유지하고 아카이누를 통칭으로 분리. 쿠잔/아오키지, 보르살리노/키자루, 잇쇼/후지토라, 아라마키/료쿠규도 동일 구조 적용.

### UI / Search
- 캐릭터 검색 범위를 본명·통칭·이명·칭호·소속으로 확장.
- 검색 결과와 캐릭터 상세 상단에 공식 identity 정보를 표시.
- 불분명하거나 공식 근거를 확보하지 못한 이명은 빈 값으로 유지.
- 가프 Ranking/Detail에 현재 평가가 `전성기` 대상임을 명시.

### Evaluation Era
- `Evaluation.subjectState` 메타데이터를 추가해 하나의 Character identity와 전성기/현재 등 평가 시점을 분리할 기반 마련.
- 현 단계에서는 기존 `EvaluationRepository.getEvaluation(characterId)`의 1인 1평가 구조를 유지하며, 가프의 별도 현재 점수를 임의 생성하지 않음.
- 실제 현재/전성기 복수 평가 구현은 repository/API가 복수 Evaluation을 선택할 수 있게 바꾸는 후속 구조 작업으로 분리.

### Deployment
- 공개 사이트 운영 단계에 맞춰 Pull Request는 test/build만 수행하고, 성공한 main push는 GitHub Pages까지 자동 배포하도록 workflow 정책 변경.

### Tests
- Character identity source/중복 검증 추가.
- 키자루→보르살리노, 아카이누→사카즈키 alias 검색 회귀 테스트 추가.
- 가프 전성기 subject-state 표시 및 ranking 전달 테스트 추가.
- 기존 27인 Evaluation 점수 및 Balanced 1.2 계산식은 변경하지 않음.


## Unreleased · v0.1.25 Draft — Overall Rankings, Search & Haki Recalibration

### UI
- Overall 24인 순위 팝업과 기존 7개 Core Stat 팝업에 오름차순/내림차순 전환.
- 우측 상단 캐릭터 검색 및 소속·이름 관련 제안 목록, 키보드 조작.
- Special Combat Profile의 반복된 Evidence/Overall 문구를 제목 옆 작은 anchored `?` 말풍선으로 변경.

### Evidence & Evaluation
- 원작 화수 기준 Battle 12개 / Evidence 22개 추가. Shanks·Sakazuki·Kuzan·Borsalino·Teach·Garp·Fujitora·Ryokugyu 근거 링크 보강.
- 24 Character / 24 Evaluation / 168 Core Stats / Evidence 97건 전체 참조·Haki Contribution의 기계적 무결성 점검.
- **Recalibrated Overall:** Shanks 94.143 / Sakazuki 93.143 / Kuzan 93.000 / Borsalino 92.714 / Teach 91.571.
- Garp·Fujitora·Shiryu·Burgess의 Haki Base/Raw 분해를 명시하고 최종 기존 Overall은 유지.
- Sanji Defense의 공격용 Ifrit Jambe Evidence를 Haki Defense로 중복 가산하던 항목 제거, Base 재분배로 기존 Final 85 보존.
- Shiryu Armament은 1087화 검격 근거로 `confirmed`로 수정. 불확실한 Haki 보유만으로 임의 가산하지 않음.

### Calculation / Version
- **Balanced 1.2, 7 Final Core Stat 단순 평균, Haki Weight 0.5, Raw 상한 10, Final 상한 100 변경 없음.**
- 평가 대상 10명은 `evaluation-0.1.25-draft`를 사용; 미변경 캐릭터의 데이터 버전 유지.
- `docs/RECALIBRATION_0_1_25_DRAFT.md`에 상세 근거, 전원 Haki 감사 결과, 한계 기록.

### Validation / Limitations
- UI·Evidence·Haki·Calculation 회귀 테스트 및 GitHub Actions 프로덕션 빌드 확인. 상세 사항은 `TEST_REPORT.md`.
- 초기 신규 전투 `chronologyOrder: 2.5` 문제를 자동 테스트로 발견해 정수 3으로 수정; Winner Island 정렬은 4로 교정.
- PC·모바일 실제 화면/원작 전 97개 만화 컷의 수동 원문 대조는 검증 완료로 표시하지 않음.
- PR #9 Draft. `main` 변경/병합하지 않음.

## Unreleased — Group Detail, Stat Rankings & Compact UI

### Fixed
- 신규 집단(밀짚모자/빨간 머리/해군/검은 수염 해적단)의 상세 조회가 레거시 `sampleCrews`의 3개 집단 제한 때문에 실패하던 경로를 Group/Membership 조회로 교체.
- 캐릭터 상세 안내에서 이전 버전 `v0.1.22` 고정 문자열을 제거하고 실제 Evaluation data version을 표시.

### Added
- 7개 Final Core Stat을 클릭해 현재 24명 전체의 해당 Stat 내림차순 순위(동점 공동 순위)를 확인하고 캐릭터로 이동하는 대화상자.
- Evaluation Trace의 각 Stat에 `Base + (Raw Haki × Weight = Effective) = Final` 식을 명시.
- 모든 신규 그룹의 상세 조회, 7개 Stat 순위 정렬, 주요 UI 전환에 대한 회귀 테스트.

### Changed
- 상단 종합점수/7축과 전투 프로필을 넓은 화면에서 2열로 배치. 아래 평가근거/전투기록을 탭으로 나눠 내부 스크롤을 적용하고 모바일 대응 CSS 추가.
- 입문 가이드에 수정된 UI 사용법과 현재 검증 한계를 반영.
- 핵심 전투력 데이터, 승인 점수, Haki Weight, Balanced 1.2 계산 규칙은 변경하지 않음.

### Manual Verification Required
- PC/모바일 실제 브라우저에서 24인 상세·순위 선택·모달/탭·긴 카드 레이아웃을 최종 확인.
- PR #8은 Draft 상태를 유지하고 main에 병합하지 않음.

## v0.1.24 — Expanded Roster & Evidence Calibration

### Added
- Shanks 및 해군 상위 전투원(Garp / Akainu / Kuzan / Kizaru / Fujitora / Ryokugyu) 7-Core draft Evaluation을 v0.1.24 데이터 버전으로 반영.
- Blackbeard Pirates: Teach / Shiryu / Jesus Burgess / Van Augur / Avalo Pizarro Character Profile, Membership, Battle Context, Canon Evidence, draft Evaluation 추가.
- Blackbeard Pirates용 Banaro Island / Marineford / Winner Island / Dressrosa / Hachinosu 전투 맥락과 Evidence 추가.

### Changed
- Vista Final: 82 / 79 / 77 / 80 / 87 / 77 / 75 → Overall 79.571428...
- Cracker Final: 74 / 76 / 77 / 74 / 76 / 74 / 76 → Overall 75.285714...
- Jack Final: 73 / 80 / 84 / 73 / 71 / 70 / 72 → Overall 74.714285...
- Teach Final: 95 / 89 / 95 / 82 / 91 / 85 / 96 → Overall 90.428571...
- Shiryu Final: 78 / 74 / 75 / 79 / 78 / 79 / 80 → Overall 77.571428... (E2 provisional)
- Van Augur Final: 72 / 67 / 68 / 76 / 80 / 79 / 85 → Overall 75.285714... (E2 provisional)
- Jesus Burgess Final: 76 / 74 / 79 / 74 / 72 / 70 / 75 → Overall 74.285714... (E2 provisional)
- Avalo Pizarro Final: 72 / 74 / 74 / 64 / 74 / 71 / 75 → Overall 72.000000 (E2 provisional)
- Attack 산정에서 Strength / Area of Effect / 기습 성공을 자동으로 동일시하지 않는 calibration 원칙을 명시적으로 적용.
- Doc Q는 현재 Evidence 부족으로 수치 평가에서 제외.

### Tests
- Character List와 sample data integrity 기대 인원을 24명으로 갱신.
- Balanced 1.2 calibrated Overall fixture를 신규·재평가 캐릭터 값으로 갱신.
- 실제 CI test/build 결과는 이번 브랜치의 최신 workflow 실행 결과로 별도 확인.

### Known Issues
- 모든 Evaluation은 아직 draft.
- Shiryu / Van Augur / Burgess / Pizarro는 E2 provisional score로, 향후 직접 전투 Evidence에 따라 여러 Core Stat이 크게 변할 수 있음.
- Doc Q 및 다른 Blackbeard Pirates 간부는 현재 7축 Evidence 부족으로 미평가.
- Browser/mobile 수동 검증은 별도 필요.

## v0.1.23 — Initial Three-Crew Baseline Calibration

### Added
- Whitebeard Pirates: Jozu / Vista Character Profile, Special Combat Profile, Haki Profile, Battle Context, Canon/Supplementary Evidence, 7-Core draft Evaluation 추가.
- Beasts Pirates: Queen / Jack Character Profile, Special Combat Profile, Haki Profile, Battle Context, Canon Evidence, 7-Core draft Evaluation 추가.
- Big Mom Pirates: Smoothie / Cracker Character Profile, Special Combat Profile, Haki Profile, Battle Context, Canon Evidence, 7-Core draft Evaluation 추가.
- 3 crews × 3 characters 데이터 완전성, Evaluation 참조 무결성, Special Trait Evidence ownership, Evidence→Battle/Character 연결을 검증하는 통합 테스트 추가.
- 캐릭터 선택에 crew tabs + compact character chips UI 추가.

### Changed
- Marco / King / Katakuri를 7-Core 횡단 비교 결과에 따라 `evaluation-0.1.23`으로 재보정.
- Marco Final: 77 / 85 / 82 / 81 / 80 / 79 / 84 → Overall 81.142857...
- King Final: 83 / 85 / 81 / 81 / 79 / 76 / 80 → Overall 80.714285...
- Katakuri Final: 79 / 80 / 80 / 82 / 85 / 81 / 82 → Overall 81.285714...
- 신규 Final Overalls: Vista 79.142857..., Queen 78.714285..., Jozu 77.285714..., Smoothie 76.714285..., Jack 74.428571..., Cracker 71.857142....
- Katakuri Attack은 높은 무장색·기술 다양성과 실제 결정력을 분리해 Base 77 + Effective Armament 2 = Final 79로 조정.
- Marco Versatility는 공격·방어·강자 마크·수송·상태 억제 지원 등 실제 역할 전환 폭을 반영해 84로 조정.
- King Defense는 Flame ON 고방어와 Flame OFF 고속 trade-off를 함께 반영해 85로 조정.
- Queen Versatility는 도구 수와 실제 역할 범위를 구분해 81로 조정.
- Cracker Attack은 Jack과 명확한 우열을 강제하지 않고 Base 71 + Effective Armament 2 = Final 73으로 조정.
- 스탯 카드의 Haki 표시를 Final 숫자 아래 `Base + Haki` 구조로 단순화.

### Tests
- 기존 Character List / Evaluation Trace / Battle Detail / Balanced Overall fixture를 9인 데이터에 맞게 갱신.
- 9인 calibrated Overall 계산 테스트 추가.
- 첫 main run에서 배열 append 경계의 `},,`로 생성된 Battle/Evidence array hole 때문에 47 tests 중 40 PASS / 7 FAIL을 확인.
- 두 array hole을 수정한 최종 run에서 12 test files / 47 tests PASS, production build PASS.
- Pages deploy는 private development 정책대로 SKIPPED.

### Known Issues
- 모든 Evaluation은 아직 `draft`.
- Vista / Smoothie 등 원작 전투 표본이 적은 캐릭터는 일부 Stat의 confidence가 상대적으로 낮음.
- Browser/mobile visual verification은 자동 CI 범위 밖이며 수동 확인 필요.
- 캐릭터 검색 UI는 로스터가 더 커지는 시점의 후속 기능으로 보류.

### Manual Verification Required
- crew tabs에서 흰수염 / 백수 / 빅 맘 전환 후 각 3인 chip이 표시되는지 확인.
- 모바일에서 crew tabs / chips가 가로 스크롤되고 본문을 과도하게 밀어내지 않는지 확인.
- Haki가 반영된 Stat에서 Final 아래 `Base + Haki`가 표시되는지 확인.
- 9개 캐릭터 상세의 Special Combat Profile / Battle / Evidence / Evaluation Trace 연결 확인.

## v0.1.22 — Seven Core Stats & Special Combat Profile

### Added
- 비수치 `Special Combat Profile` 구조를 추가하고 악마의 열매·종족 특성·특수 생리·개조·장비·과학 기술 등을 여러 Trait으로 기록할 수 있도록 확장.
- Special Trait에 category / status / description / Evidence IDs / limitations / uncertainty 필드를 추가.
- Special Trait Evidence가 실제로 존재하고 해당 캐릭터 소유인지 검증하는 Character Domain validation 및 테스트 추가.

### Changed
- 숫자형 `Special Ability`를 Core Combat Stat에서 제거하고 Attack / Defense / Stamina / Speed / Technique / Combat IQ / Versatility의 7 Core Stat으로 전환.
- Balanced 모델을 1.2로 갱신하고 7개 Final Core Stat의 단순 산술평균을 사용.
- Haki Weight 0.5와 실제 Application Evidence 기반 Stat Contribution 방식은 유지.
- 기존 Special 관련 Canon Evidence는 삭제하지 않고 Special Combat Profile과 관련 Core Stat Evidence로 보존.
- Marco / King / Katakuri Evaluation Data Version을 `evaluation-0.1.22`로 갱신.
- 구조 전환 직후의 기계적 Overall은 Marco 80.571428..., King 80.285714..., Katakuri 81.714285...로 재계산.
- Character Detail에서 Special Combat Profile을 Core Stat과 분리해 표시하고 Overall 직접 가산이 없음을 명시.
- Package / README / PROJECT_SPEC을 v0.1.22 구조와 동기화.

### Tests
- 7 Core Stat completeness / duplicate / score validation fixture 갱신.
- Balanced 1.2의 7-stat mean, Haki Weight, calibrated Overall 테스트 갱신.
- Special Trait Evidence ownership / missing reference / duplicate id 검증 테스트 추가.
- 첫 main 검증: 11 test files / 43 tests 중 42 PASS, 1 FAIL. 원인은 Versatility 정의에 남은 stale `Special Ability` 문구였으며 계산/도메인 로직 실패는 아니었음.
- stale 정의 문구 수정 후 재검증: 11 test files / 43 tests PASS.
- `npm run build`: PASS.
- Pages configure/upload/deploy: private development 정책대로 SKIPPED.

### Known Issues
- Marco / King / Katakuri 수치는 구조 전환 직후의 기계적 재계산이며 전체 캐릭터 횡단 재평가는 아직 수행하지 않음.
- Queen / Jack / Cracker / Jozu / Vista는 아직 GitHub 정식 Evaluation 데이터로 추가되지 않음.
- Browser/mobile visual verification은 main 반영 후 별도 확인 필요.

### Manual Verification Required
- Character Detail의 7 Core Stat 표시 확인.
- Special Combat Profile 카드의 Trait / 한계 / Evidence count 표시 확인.
- Haki Base / Raw / Weight / Effective / Final 추적 UI 회귀 확인.
- 모바일에서 Combat Profile 및 Stat 레이아웃 확인.

### Next Steps
- v0.1.22 자동 test/build 및 UI 회귀 확인.
- 기존 및 논의 중 캐릭터의 7 Core Stat Overall 전면 재산정.
- 재산정 완료 후 신규 캐릭터 분석·추가 재개.


## v0.1.21 — Combat Power Scale Calibration

### Added
- Balanced 1.1에 versioned `Haki Weight = 0.5` 추가.
- Raw / Effective Haki 계산 helper와 Evaluation Trace 표시 추가.
- Raw +6 × 0.5 = Effective +3, Final 100 cap, Haki 0, 복수 Contribution, calibrated Overall 테스트 추가.

### Changed
- Marco / King / Katakuri의 8개 Base Stat을 현재 Canon Evidence와 절대 scale anchor에서 독립 재평가.
- Raw Haki 값은 유지하고 Effective Haki만 Weight 0.5 적용.
- Calculation Model 1.1, Evaluation Data `evaluation-0.1.21`, package 0.1.21로 갱신.
- King Flame ON Defense / Flame OFF Speed의 상호 배타적 Peak를 평가에 반영.
- Katakuri Future Sight의 Defense / Technique-Mastery / Combat IQ 연결은 유지하되 weighted contribution으로 완화.
- PROJECT_SPEC의 오래된 `Code: None / MVP: Not implemented` 상태를 실제 구현과 일치하도록 정리.

### Fixed
- v0.1.20 데이터 추가 뒤 남은 stale application test fixture 수정.
- 기존 GitHub Actions에서 test 7건 실패로 build가 중단되던 회귀 원인을 fixture 불일치로 확인하고 수정.

### Calibration Refinement
- Marco의 정상결전 및 Wano 방어 Evidence를 보강하고 Armament 실제 Application을 최소 Raw +2로 반영.
- Marco Attack은 결정력 부족을 고려해 Final 76으로 보수적으로 유지하고, Defense는 고화력 차단 성과를 반영해 85로 재평가.
- King은 카류돈 계열 화력을 반영해 Attack 83, 조건부 Lunarian 성능 중복을 억제해 Overall 80.75로 조정.
- Katakuri는 Snakeman전 Speed와 Gear 4 선제 대응을 보강하고 Technique 85 / Special Ability 80 경계를 재정리해 Overall 81.50으로 조정.
- 동일 Evidence의 다중 Stat 연결은 서로 다른 평가 의미가 있을 때만 허용하는 원칙을 명문화.
- 개발 중 main push에서는 test/build만 수행하고 Pages 배포는 수동 실행으로 변경.
- 최종 회귀검증에서 신규 Chapter 1022 Evidence로 인한 stale Battle Detail fixture 1건을 수정한 뒤 10 test files / 40 tests 및 production build PASS를 확인.

### Tests
- 구현 전 baseline: 35 tests 중 28 passed / 7 failed. `npm install` PASS, build/deploy는 stale fixture 실패로 skipped.
- v0.1.21 main GitHub Actions: 10 test files / 39 tests PASS.
- `npm run build`: PASS.
- Pages configure/deploy: repository Pages site가 아직 활성화되지 않아 configure-pages에서 실패; 앱 test/build 회귀와는 분리된 저장소 설정 이슈.

### Known Issues
- 세 캐릭터는 여전히 draft.
- Evidence Coverage / Confidence는 아직 별도 필드가 없음.
- Marco의 Haki capability는 confirmed지만 저장된 Application Evidence 부족으로 Raw Haki 0이며 이를 숙련 부족으로 해석하지 않음.
- GitHub Pages 실제 배포는 저장소 Settings에서 Pages를 GitHub Actions source로 활성화하기 전까지 완료되지 않음.

### Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev`
- 세 캐릭터 Final Stat / Overall / Evaluation Trace 확인.
- Battle Timeline / Evidence UI / 모바일 레이아웃 확인.

### Next Steps
- 자동 test/build/deploy 및 브라우저 UI 검증.
- Evidence Coverage / Confidence 최소 스키마 검토.
- 다음 캐릭터 추가 전 calibration sanity check.


## v0.1.20

### Added
- Katakuri 미러월드 Battle Context 및 Canon Evidence 세트
- 실제 Haki Application 기반 Stat Contribution 적용
- GitHub Pages 자동 배포 workflow

### Changed
- Marco / King / Katakuri 3인 전면 draft 재평가
- Haki Contribution Evidence 참조 무결성 검증 강화
- Vite asset base를 GitHub Pages 호환 상대 경로로 변경

### Tests
- Domain/Data/Application TypeScript 정적 검증
- 로컬 필수 검증: `npm.cmd install → npm.cmd test → npm.cmd run build → npm.cmd run dev`

# v0.1.19

## Added
- Marco / King / Katakuri 전원의 Canon Combat Profile 추가: 전투 방식, 주요 능력, Haki Profile, Canon Profile 근거.
- Character Detail에 `전투 프로필` UI 추가.
- 패기 UI에 무장색 / 견문색 / 패왕색 상태를 표시하고, 패휘감은 패왕색 괄호 정보에 해당하는 하위 상태로 표시할 수 있도록 구현.

## Changed
- Haki 타입을 Armament / Observation / Conqueror's 3종으로 정리.
- v0.1.18의 `conquerorsCoating` 독립 타입을 제거하고 `conquerors.infusion` 하위 상태로 마이그레이션.
- Evidence의 primary / secondary / context UI 문구를 `주요 근거 / 보조 근거 / 상황 참고`로 변경.
- Character 설명을 MVP placeholder에서 실제 전투 특성을 요약하는 문구로 갱신.

## Canon data
- Marco: 무장색·견문색 confirmed. 패왕색은 현재 채택 근거에서 확인되지 않아 unclear.
- King: 무장색·견문색 confirmed. 패왕색은 현재 채택 근거에서 확인되지 않아 unclear.
- Katakuri: 무장색·견문색·패왕색 confirmed. 견문색 미래예지 활용을 Combat Profile에 기록. 패휘감은 현재 채택 근거에서 확인되지 않아 unclear.
- `unclear`는 비보유를 의미하지 않으며 점수 감점 근거로 사용하지 않음.

## Tests
- Haki Domain에서 패휘감이 독립 타입으로 남지 않았는지 정적 검색.
- Character 3명 모두 Combat Profile / Haki Profile을 갖는지 데이터 구조 검토.
- Domain/Data/Application non-test TypeScript 정적 검증: 통과.
- 전체 TypeScript/Vitest/Vite 검증은 의존성 미설치 및 AI 환경 `npm install` 시간 제한으로 실행하지 못해 실제 로컬 test/build 필요.

## Known Issues
- v0.1.19의 Haki Profile은 보유/확인 정보이며 Haki Contribution을 아직 실제 점수에 적용하지 않음.
- Katakuri Evaluation은 아직 prototype 50점이며 Canon Evidence 기반 전면 평가 전 단계.
- 세 캐릭터의 전면 스탯 재평가는 Haki Application Evidence와 Katakuri Evidence 추가 후 수행 예정.

## Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev`
- Marco / King / Katakuri 전환 시 전투 프로필과 패기 정보가 정상 표시되는지 확인.
- Evidence 태그가 주요 근거 / 보조 근거 / 상황 참고로 표시되는지 확인.

## Next Steps
- Canon Profile과 기존/신규 Evidence를 실제 Haki Application / Contribution에 연결.
- Katakuri의 Canon Battle / Evidence를 정식 추가.
- Marco / King / Katakuri 3명을 동일한 8개 스탯 기준으로 전면 재평가.

# v0.1.18

## Added
- Haki Domain 타입 추가: Armament / Observation / Conqueror's / Conqueror's Coating 및 confirmed / unclear / not-confirmed 상태.
- 실제 Haki 활용이 특정 스탯에 기여하는 `HakiStatContribution` 모델 추가.
- Base Stat + Haki Contribution(스탯별 총 최대 +10, 최종 100 상한) 계산 규칙 추가.
- Evidence → Stat 관계를 `primary / secondary / context`로 구분하는 `statContributions` 구조 추가.
- Haki validation 및 synthetic Zoro 사례 기반 구조 테스트 추가.

## Changed
- `supportedStats: string[]`를 의미가 명시된 `statContributions`로 교체.
- EvaluationItem에 `baseScore`, `hakiContributions`, 계산된 최종 `score`를 함께 기록하고 일관성을 validation에서 검사.
- Overall Combat Power는 8개 최종 Stat의 기존 단순 평균을 유지.
- Marco Technique / Mastery 86 → 78: 다양한 능력 사용처를 숙련도와 중복 계산하지 않도록 재평가.
- King Technique / Mastery 93 → 86: 능력 보유·Versatility·상태 전환과 실행 숙련도의 중복을 줄이도록 재평가.
- Marco Ch.1006 재생 Evidence는 Special Ability(primary), Stamina(secondary), Technique(context)로 재분류.
- Evaluation data version을 `evaluation-0.1.18`로 갱신.

## Tests
- Domain/Data/Application의 non-test TypeScript를 global `tsc`로 정적 타입 검증: 통과.
- `npm install`은 AI 환경에서 120초 제한으로 완료되지 않아 Vitest 및 Vite build는 실행하지 못함.
- Haki contribution 계산, 0~10 제한, Evidence 요구, Evidence 역할 구조에 대한 테스트 코드를 추가/갱신함.

## Known Issues
- 현재 저장된 Canon Evidence에는 Haki application을 직접 기록한 데이터가 없어 Marco/King의 실제 Haki 가산점은 0으로 유지함.
- Katakuri는 프로젝트 내부 Canon Evidence가 없어 prototype 50점 상태를 유지함. 외부 근거를 검증하지 않고 실제 평가를 임의 추가하지 않음.
- Zoro는 synthetic Haki 구조 테스트에만 사용하며 실제 Character/Evidence 데이터에는 추가하지 않음.
- Haki +0~10 및 2점 단위 기준은 v0.1.18의 첫 계산 규칙이며 실제 캐릭터 Evidence 축적 후 재검토 가능.

## Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 Marco/King의 8개 스탯, Overall, Evaluation Trace, Evidence role tag 확인

## Next Steps
- 검증된 Canon Haki Evidence를 추가한 뒤 Katakuri / Zoro를 실제 사례로 평가.
- Haki Contribution이 Base Stat과 중복 계산되지 않는지 실제 캐릭터별로 검증.
- Battle Participant 상세 표시 등 다음 기능 후보를 우선순위에 따라 검토.

# v0.1.17

## Added
- Battle Evidence 화면에 Battle Context를 함께 표시하도록 정리함. 전투 구조, 전투 목적, 전투 의도, 환경, 제한 조건, 외부 요인, 전투 결과를 원작 근거와 함께 확인할 수 있음.

## Changed
- Defense의 Stat Definition에서 제거된 `Durability` 개념을 직접 언급하던 잔여 표현을 제거함.
- Battle Context 표시를 `EvidenceList`가 담당하도록 정리하여 작중 근거를 읽을 때 해당 전투의 상황과 평가 조건을 함께 확인할 수 있도록 함.
- Battle Timeline의 전투 구조 표시는 기존 한글 표시를 유지하면서 세부 Context는 Evidence 영역에서 일관되게 표시하도록 조정함.

## Fixed
- UI에서 이미 제거된 Durability를 Defense 정의의 제외 항목에서 계속 언급하던 문구를 현재 평가 모델과 일치하도록 수정함.
- King의 작중 근거 화면에서 전투 의도 및 기타 Battle Context가 근거 설명과 분리되어 누락되는 문제를 보완함.

## Tests
- Stat Definition의 Defense 문구를 현재 8개 스탯 모델과 대조함.
- BattleTimeline → EvidenceList의 Battle Context 전달 구조를 정적 검토함.
- 실제 `npm.cmd test` / `npm.cmd run build` 실행은 사용자 환경 검증이 필요함.

## Known Issues
- Battle Participant의 개별 상태를 캐릭터명과 함께 상세 표시하는 기능은 아직 구현하지 않음. 현재 Battle Context에는 전투 구조와 목적·의도·환경·제한·외부 요인·결과를 우선 표시함.
- Marco / King는 여전히 draft이며 전체 작중행적 전면 재평가가 남아 있음.

## Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 King의 `킹과 조로의 대결`을 열어 Battle Context와 Evidence가 함께 표시되는지 확인
- Defense Stat Info에서 Durability라는 제거된 스탯이 직접 언급되지 않는지 확인

## Next Steps
- 패기 데이터와 Technique / Mastery가 독립적인 평가축으로 기능하는지 실제 캐릭터에 적용하여 검증
- Marco / King / Katakuri의 전체 작중행적과 Battle Context를 새 8개 스탯 기준으로 전면 재검토

# v0.1.16

## Added
- `Technique / Mastery`를 8번째 전투력 스탯으로 추가.
- Technique / Mastery와 Special Ability / Combat IQ / Versatility의 경계를 Domain 정의와 테스트에 반영.

## Changed
- `Recovery`를 최상위 전투력 스탯에서 제거.
- Recovery 관련 Evidence는 삭제하지 않고, 회복·재생 사실을 고유 전투 능력의 근거로 보존하며 전투 지속 효과가 확인되는 경우 Stamina 근거로 재분류.
- Recovery를 Defense에 자동 합산하지 않는 원칙을 명시.
- Marco Technique / Mastery = 86, Special Ability = 91, Versatility = 89로 draft 조정.
- King Technique / Mastery = 93, Attack = 90, Defense = 94, Special Ability = 92, Combat IQ = 84, Versatility = 85로 draft 조정.
- Evaluation data version을 `evaluation-0.1.16`으로 갱신.

## Fixed
- Defense 설명에서 남아 있던 Durability/Recovery 잔여 표현을 현재 모델에 맞게 정리.
- Recovery를 참조하던 샘플 Evidence/테스트를 새 스탯 체계에 맞게 수정.

## Tests
- Stat definition 테스트에 Technique / Mastery의 개념 경계 검증을 추가.
- Evaluation Trace 및 Evidence fixture를 새 8개 스탯에 맞게 갱신.
- 실제 `npm.cmd test` / `npm.cmd run build` 실행은 아직 사용자 환경 검증이 필요함.

## Known Issues
- Marco / King 전체 평가는 여전히 `draft`. 이번 점수는 현재 확보된 프로젝트 Evidence를 기준으로 한 중간 산정이며 전체 작중행적 재검토 후 조정될 수 있음.
- Technique / Mastery가 장기적으로 독립적인 평가축으로 충분한지는 Katakuri 및 비능력자 강자까지 적용하는 과정에서 추가 검증 필요.
- Recovery를 제거하면서 회복 능력의 독립적인 수치 표현은 사라짐. 향후 실제 데이터 축적 후 이것이 중요한 정보 손실인지 재평가할 필요가 있음.

## Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 Marco / King의 8개 스탯, Stat Info, Evidence Trace, Battle Timeline, Overall Combat Power 확인

## Next Steps
- Marco / King의 전체 작중행적을 새 8개 축으로 다시 검토.
- Katakuri와 비능력자 강자에 Technique / Mastery 및 Special Ability 정의를 적용해 모델 편향 여부 확인.
- Recovery 관련 Evidence가 Special Ability / Stamina / Context에 충분히 보존되는지 추가 검토.

---

# v0.1.15

## Added
- v0.1.13 이후 논의된 전투력 평가 원칙을 정리하여 절대평가 스케일, Evidence 부족과 낮은 점수의 구분, 스탯 간 독립성, 현재 전투력과 성장 가능성의 분리 원칙을 명시함.
- Versatility를 향후 사황 등 상위 캐릭터까지 적용할 수 있는 절대평가 축으로 정의하고, 단순한 능력 보유 수와 실제 적용 범위를 구분함.

## Changed
- v0.1.14에서 추가된 8개 스탯 구조를 현재 기준으로 유지: Attack / Defense / Stamina / Speed / Recovery / Special Ability / Combat IQ / Versatility.
- Defense는 조건부 방어를 하나의 종합 점수로 표현하며 별도 Durability 스탯을 사용하지 않음.
- Recovery는 손상·상태 회복 능력으로 유지하되, 근거 부족을 낮은 능력으로 자동 해석하지 않는 원칙을 추가함.
- Marco / King의 기존 draft 점수는 이번 버전에서 임의로 확정하지 않고, 전체 Evidence와 작중행적 재검토 후 재산정할 수 있도록 유지함.
- Evaluation data version을 `evaluation-0.1.15`로 갱신.

## Fixed
- `getCharacterEvaluationTrace.test.ts`의 Marco Recovery Evidence 기대값을 현재 3개 Evidence 연결 상태에 맞게 갱신함.
- King Recovery rationale 테스트를 현재 문구에 맞게 갱신함.

## Tests
- 사용자 환경에서 발견된 2건의 v0.1.14 회귀 테스트 실패 원인을 확인하고 기대값만 수정함.
- 전체 테스트는 사용자의 `npm.cmd test` 실행으로 최종 확인 예정.

## Known Issues
- Marco / King은 여전히 `draft`이며 전체 작중행적 기반 전면 재평가가 남아 있음.
- King Recovery는 직접적인 회복·재생 Evidence가 제한적이므로 현재 50점은 확정값이 아님.
- King Versatility와 전반적인 90점대 분포가 과도한지 재검토 필요.
- Marco Defense / Attack / Versatility 역시 추가 Evidence와 함께 재검토 필요.
- Growth Potential은 아직 구현하지 않음.

## Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 Marco / King의 8개 스탯, Stat Info, Evidence Trace, Battle Timeline, Overall Combat Power 확인

## Next Steps
- Marco의 작중행적 및 Evidence를 스탯별로 재검토하고 점수를 독립적으로 재산정함.
- King의 작중행적 및 Evidence를 동일 기준으로 재검토함.
- Recovery가 모든 캐릭터에게 충분히 독립적인 평가축인지 검토함.
- Katakuri를 새 기준으로 실제 Evidence 기반 draft 평가할지 결정함.

---

# v0.1.14

## Added
- `Versatility` 전투력 스탯 추가.
- Special Ability / Combat IQ / Versatility의 개념 경계를 Domain 정의에 명시.
- Defense 정의에 조건부 방어 메커니즘을 포함하여 King과 같은 상태 의존형 방어를 하나의 Defense 점수로 표현할 수 있도록 정리.

## Changed
- `Durability`를 최상위 전투력 스탯에서 제거.
- Defense / Stamina / Recovery의 설명을 보강하고 중복 평가를 방지하도록 정리.
- Marco와 King의 draft 평가를 현재 Evidence를 기준으로 재검토.
- Marco: Defense 79 → 80, Durability 제거, Versatility 94 추가.
- King: Defense 96 유지, Versatility 92 추가.
- Evidence의 지원 스탯에서 Durability 참조를 제거하고 Versatility 연결을 추가.
- Evaluation data version을 `evaluation-0.1.14`로 갱신.

## Fixed
- 제거된 Durability를 참조하던 Evaluation / Evidence / Stat Definition / 테스트 잔여 참조를 정리.

## Tests
- Stat definition 테스트를 새 8개 스탯과 개념 경계에 맞게 갱신.
- Evaluation validation fixture를 새 스탯 구성에 맞게 갱신.
- 계산 모델은 `COMBAT_STATS`를 동적으로 순회하므로 8개 스탯 평균 계산 구조를 유지.
- AI 환경에서는 npm 실행 검증을 아직 수행하지 못함. 사용자 Windows 환경에서 `npm.cmd test`, `npm.cmd run build`, 브라우저 확인이 필요함.

## Known Issues
- Marco Defense는 현재 Evidence가 순수 방어 장면을 직접적으로 충분히 제공하지 않아 80점은 여전히 draft이며 추가 근거에 따라 조정될 수 있음.
- Katakuri는 아직 prototype 평가만 존재하며 실제 Evidence 기반 점수 산정은 진행하지 않음.
- 조건부 방어의 세부 상태/메커니즘을 별도 구조화한 것은 아니며, 현재는 Defense rationale과 Evidence의 맥락으로 표현함. Matchup 모델 구현 시 별도 구조가 필요할 수 있음.

## Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev` 후 Character 상세에서 Marco/King의 새 8개 스탯과 설명 확인
- Marco/King의 Evidence에서 `Durability`가 표시되지 않고 `Versatility`가 정상 표시되는지 확인
- 기존 Battle Timeline / Evidence / Evaluation Trace / Overall Combat Power 회귀 확인

## Next Steps
- 사용자 검증 결과에 따라 Marco/King draft 점수를 추가 Evidence와 대조하여 재조정.
- 필요할 경우 조건부 방어 메커니즘을 Evidence 또는 Character 능력 데이터에 구조화하는 별도 설계를 검토.
- Katakuri 실제 Evidence 수집 후 draft 평가 시작.

---

# Changelog

## v0.1.13

### Added
- 전투력 8개 스탯 중 Defense, Durability, Recovery의 경계를 더 명확하게 정의함.
- 캐릭터별 Battle Timeline의 표시 순번이 chronologyOrder와 독립적으로 계산되도록 테스트를 보강함.

### Changed
- Defense는 공격을 받기 전의 회피·방어·차단 및 직접적인 피해 감소를 평가하도록 정의를 명확히 함.
- Durability는 손상 자체에 대한 저항으로 한정하고, 회복을 통한 전투 지속을 자동으로 Durability에 반영하지 않도록 정의함.
- Recovery는 손상 이후의 재생·복구·회복을 평가하도록 정의를 명확히 함.
- Marco Durability를 78에서 74로 조정함.
- Marco Defense는 79를 유지하고 추가적인 직접 방어 근거 검토 대상으로 남김.
- Battle Timeline의 UI 번호를 캐릭터별 목록 순번으로 변경하여 King의 전투가 4, 5가 아닌 1, 2로 표시되도록 수정함.
- 프로젝트 버전을 0.1.13으로 변경함.

### Fixed
- 캐릭터별 전투 기록에서 전체 Battle chronologyOrder가 그대로 노출되던 표시 문제를 수정함.

### Tests
- 기존 Battle chronologyOrder 정렬 테스트는 유지함.
- Marco와 King의 캐릭터별 Timeline이 각각 1부터 시작하는 표시 순번을 갖는다는 기대를 추가함.
- Stat definition 테스트에 Defense/Durability/Recovery 간 중복 방지 규칙을 추가함.
- 전체 npm test/build 및 브라우저 실행은 사용자 환경에서 최종 확인 필요.

### Known Issues
- Marco Defense는 직접적인 방어 근거가 충분하지 않아 draft 상태의 79점을 유지함.
- Marco Durability 역시 직접적인 순수 내구도 근거가 제한적이므로 향후 Evidence 추가 시 재검토할 수 있음.
- 캐릭터 대표 이미지, 직함/언급, 짧은 행적 소개 카드는 아직 구현하지 않음.

### Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev`
- King 선택 후 Battle Timeline 번호가 1, 2로 표시되는지 확인
- Marco/King의 Stat Info에서 Defense, Durability, Recovery 정의가 의도대로 표시되는지 확인
- Marco Durability 74 및 Defense 79가 표시되는지 확인

### Next Steps
- Marco/King에 새 스탯 정의를 실제 Evidence 단위로 다시 대입하여 평가 일관성을 검토함.
- 이후 Katakuri를 세 번째 실제 분석 사례로 추가함.

## v0.1.12

### Added
- 없음.

### Changed
- King Evidence 추가로 변경된 Battle Detail의 현재 반환 결과에 맞게 회귀 테스트 기대값을 갱신함.
- King Recovery rationale의 현재 문구에 맞게 Evaluation Trace 테스트를 갱신함.
- 프로젝트 버전을 0.1.12로 변경함.

### Fixed
- v0.1.11에서 사용자 환경의 전체 테스트 실행 시 발견된 2건의 회귀 테스트 실패를 수정함.
- 애플리케이션 로직이나 분석 데이터 자체는 변경하지 않고 테스트의 오래된 기대값만 현재 동작에 맞게 수정함.

### Tests
- 사용자 환경에서 발견된 실패를 기준으로 테스트 기대값을 수정했으며, AI 환경에서는 `node_modules` 미설치 및 npm install 타임아웃으로 자동 테스트/빌드를 재실행하지 못함.
- 사용자 환경에서 `npm.cmd test`와 `npm.cmd run build`를 재실행해야 함.

### Known Issues
- King 평가 전체는 여전히 `draft`이며 Recovery는 직접적인 근거 부족으로 임시값을 유지함.

### Manual Verification Required
- 브라우저에서 King 선택 후 8개 스탯과 Evaluation Trace가 정상 표시되는지 확인.
- King Battle timeline 및 Evidence 표시가 정상인지 확인.

### Next Steps
- Katakuri를 동일한 데이터 모델로 추가하여 세 번째 실제 분석 사례로 검증함.


## v0.1.11

### Added
- King의 첫 실제 Battle Context로 오니가시마 킹·조로 전투를 추가함.
- King의 Canon Evidence 3건을 추가하여 Marco와의 다대일 전투 및 조로와의 1대1 전투를 분리해 기록함.
- King의 8개 스탯에 대한 1차 draft 평가를 추가함.

### Changed
- King을 기존 구조 검증용 prototype에서 실제 분석이 시작된 draft 평가로 전환함.
- King 평가 데이터 버전을 `evaluation-0.1.11`로 기록함.
- King의 회복 능력은 현재 근거 부족으로 중립적인 임시값을 유지하여 다른 방어 특성에서 자동 추론하지 않도록 함.
- 프로젝트 버전을 0.1.11로 변경함.

### Fixed
- 없음.

### Tests
- King의 Evaluation이 8개 스탯을 모두 포함하고 Evidence reference가 실제 King Evidence를 가리키도록 정적 구조를 확인함.
- 기존 Marco Evaluation / Evidence / Battle 구조를 변경하지 않음.
- 전체 npm test/build는 AI 환경의 의존성 미설치로 실행하지 못함.

### Known Issues
- King 평가값은 첫 draft이며 official 평가가 아님.
- Recovery는 직접적인 근거 부족으로 임시값이며 후속 근거 확보 시 재검토함.
- Zoro는 현재 Character 데이터에 등록하지 않아 King-Zoro Battle의 participantIds는 비어 있음. 설명과 Evidence에서는 전투 상대를 명시하되 존재하지 않는 Character reference를 만들지 않음.

### Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- 브라우저에서 King 선택 후 8개 스탯 및 Evaluation Trace 확인
- King Battle timeline에 기존 Marco·King·Queen 전투와 King·Zoro 전투가 정상적으로 표시되는지 확인

### Next Steps
- King draft를 과도하게 세분화하지 않고 Katakuri를 동일 모델로 추가해 3번째 실제 사례로 검증함.

## v0.1.10

### Added
- Added optional Evaluation validation against Evidence references, detecting unknown Evidence IDs and Evidence records belonging to another character.
- Added regression tests for valid and invalid Evidence references.

### Changed
- Re-reviewed Marco's eight draft evaluation items against the current Evidence data.
- Removed unsupported Evidence links from Attack and Defense rather than changing Evidence metadata to fit the existing scores.
- Revised Attack and Defense rationales to explicitly mark the current lack of direct Evidence and keep those scores provisional.
- Marco remains `draft`; no automatic promotion to `official` was performed.

### Fixed
- Fixed inaccurate Evaluation Trace relationships where existing Marco Attack/Defense Evidence links were not directly supported by the Evidence `supportedStats` metadata.

### Tests
- Added validation coverage for unknown Evidence IDs and Evidence records assigned to another character.
- Full npm test/build execution remains dependent on the user's environment because dependencies are not installed in the AI workspace.

### Known Issues
- Attack and Defense still require additional direct Canon Evidence before they can be considered strongly supported.
- Evidence validation is optional at the Domain utility boundary and is not automatically enforced by repository loading.

### Manual Verification Required
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Open Marco and confirm Attack/Defense still display their draft scores while showing no linked Evidence.
- Confirm Recovery and other existing Evidence traces remain unchanged.

### Next Steps
- Review whether each Marco stat has sufficient direct Evidence and whether the current score is justified independently of the Evidence count.
- Decide whether Marco can be promoted to `official` only after the full evaluation review is complete.

## v0.1.9

### Added
- Added domain-level `validateBattle()` validation for Battle identity, chronology order, context fields, enum values, and Battle/Participant reference integrity.
- Added Battle validation tests for valid sample data, missing participant references, unlinked participant records, and participant records assigned to another Battle.

### Changed
- Kept the existing Battle and Participant domain structures unchanged.
- Kept external characters mentioned in Battle titles/context as plain descriptive text; no new Character records were created solely to populate participant lists.

### Fixed
- No confirmed runtime bug fixed; this iteration adds detection for inconsistent Battle/Participant data before such inconsistencies can be treated as valid.

### Tests
- Added domain validation coverage for current sample Battle data and common reference-integrity failures.
- Full npm test/build execution remains dependent on the user's environment because dependencies are not installed in the AI workspace.

### Known Issues
- Validation is currently an explicit domain utility and is not automatically enforced by repository loading.
- Three current Marco Battles intentionally have no modeled participant records because the referenced opponents do not yet exist as Character records; this is preserved rather than filled with speculative data.

### Manual Verification Required
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Open Marco and confirm the existing Battle timeline and Evidence display remain unchanged.

### Next Steps
- Re-review Marco end-to-end: Battle Context → Evidence → Evaluation → validation.
- Decide whether Marco's draft evaluation has enough reviewed support to become `official`; do not promote automatically.

## v0.1.8

### Added
- Centralized `EvaluationStatus` values and added status definitions for `prototype`, `draft`, and `official`.
- Added domain-level `validateEvaluation()` validation for evaluation identity, status, complete eight-stat coverage, duplicate stats, score range, rationale, and evidence-id structure.
- Added Evaluation validation tests covering valid drafts, incomplete evaluations, duplicate/out-of-range values, and official status without forcing evidence on every stat.

### Changed
- Kept the existing Evaluation data structure and Application/Repository flow unchanged.
- Clarified that `official` validation currently checks structural completeness and does not automatically require Evidence for every stat.
- Marco evaluation values remain unchanged from v0.1.7.

### Fixed
- No known functional bug fixed in this iteration.

### Tests
- Added domain validation tests for Evaluation.
- Runtime npm test/build execution remains dependent on the user's environment.

### Known Issues
- Validation is currently an explicit domain utility; existing data-loading paths do not automatically block an invalid draft/official evaluation.
- Calculation behavior for draft versus official evaluations remains unchanged and will be revisited before official scoring.

### Manual Verification Required
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Open Marco and confirm the v0.1.7 evaluation values remain unchanged.
- Confirm King and Katakuri remain prototype evaluations.

### Next Steps
- Refine Battle Context using the validated Evaluation structure.
- Re-review Marco's Evidence, Battle Context, and Evaluation together before promoting Marco to `official`.

## v0.1.5

### Added
- Added the first real Marco evaluation draft: Recovery = 90/100.
- Added Chapter 998 Canon Evidence for Marco's phoenix flames suppressing the Ice Oni and supporting recovery-related interpretation.
- Added `Evaluation.status` with `prototype`, `draft`, and `official` states so evaluation progress is explicit.

### Changed
- Marco Recovery now links to Chapter 1006 and Chapter 998 Evidence.
- Marco's Recovery rationale now distinguishes direct regeneration, supportive recovery use, and demonstrated fatigue/limits.
- Character detail now labels the current Overall Combat Power as an in-progress calculation while only Recovery has been assigned a real evaluation value.
- Existing prototype values for the other seven stats remain unchanged at 50.

### Fixed
- Updated existing Battle/Evidence application test expectations to include the newly added Chapter 998 Ice Oni Battle entry.
- This was a stale-test regression caused by intentionally adding a fourth chronological Battle record; the application data flow itself was not the source of the failure.

### Tests
- Evaluation Trace tests cover the Recovery score and two linked Recovery evidence records.
- Battle Evidence tests now expect five Marco Evidence records.
- Battle Timeline tests now expect four chronological Marco Battle records in order 1 → 2 → 3 → 4.
- Full npm test/build execution remains dependent on the user's environment.

### Known Issues
- Overall Combat Power is currently a mixed intermediate calculation: Recovery 90 plus seven prototype 50 values. It is not an official final score.
- King and Katakuri remain prototype evaluations.
- Evaluation status is modeled, but the system does not yet prevent draft evaluations from being included in the calculation. This is intentional for the current incremental evaluation workflow and should be revisited before official scoring.

### Manual Verification Required
- Run `npm.cmd install`.
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Run `npm.cmd run dev`.
- Select Marco and confirm Recovery shows 90/100.
- Confirm Recovery shows Chapter 1006 and Chapter 998 evidence references.
- Confirm the other seven stats remain 50 and are still marked as draft/prototype context appropriately.
- Confirm the Battle timeline remains unchanged.

### Next Steps
- Review whether Recovery 90 remains appropriate after comparing it with the next Marco stat.
- Build the remaining Marco evaluations one stat at a time from verified evidence.
- Revisit draft/official calculation behavior before treating the final Overall Combat Power as official.

# Changelog

## v0.1.4

### Added
- Added an application-level Evaluation Trace query that resolves `EvaluationItem.evidenceIds` to Evidence records.
- Added an Evaluation Trace UI showing each stat, its current prototype score, rationale, and linked evidence references.
- Added tests for resolving linked evidence and preserving items without evidence.

### Changed
- Character detail now shows the evaluation-to-evidence trace between Basic Combat Stats and the Battle timeline.
- Prototype scores remain unchanged and are explicitly labeled as prototype values.

### Fixed
- No known functional bug fixed in this iteration.

### Tests
- Added `getCharacterEvaluationTrace` application tests.
- Full test/build execution still requires the user's environment because npm dependency installation exceeded the AI execution limit.

### Known Issues
- Official combat-power scores have not yet been assigned.
- King and Katakuri still use prototype evaluation values without linked canon evidence.

### Manual Verification Required
- Run `npm.cmd test`.
- Run `npm.cmd run build`.
- Run `npm.cmd run dev`.
- Select Marco and confirm the Evaluation Trace appears.
- Confirm Recovery and Stamina show the Chapter 1006 evidence reference.
- Confirm other prototype stats can display `연결된 근거 없음` without breaking the page.
- Confirm the Battle timeline remains unchanged.

### Next Steps
- Review the Evaluation Trace UX.
- Build the first real manual evaluation for Marco from multiple verified evidence records.
- Only after evaluation criteria are sufficiently supported, replace prototype scores with official project evaluation values.

## v0.1.3

### Added
- Added `chronologyOrder` to Battle for explicit chronological presentation.
- Added an application-level character battle timeline query.
- Added a chronological Battle accordion UI.
- Added two Marineford Evidence records for Marco's encounters involving Kizaru and Aokiji.
- Added one Onigashima Evidence record for Marco's clash with Big Mom.
- Kept the existing Marco vs King/Queen Evidence record as the third chronological entry.
- Added application tests for chronological Battle grouping and empty-character timelines.

### Changed
- Character detail now presents Battle & Canon Evidence as a chronological expandable list.
- Battle context is shown before the linked Evidence when an item is expanded.
- The existing prototype combat score remains unchanged by Evidence.
- Big Mom encounter is treated as a multi-participant battlefield situation rather than a clean 1v1 in the Battle context.

### Fixed
- Preserved the UI → Application → Repository dependency direction introduced in v0.1.2.

### Tests
- Added chronological timeline application tests.
- Existing calculation and application tests remain in the project.
- AI environment: `npm install` could not complete within the execution time limit, so full test/build execution was not available in this environment.

### Known Issues
- The new v0.1.3 browser UI has not yet been manually verified by the user.
- Some Battle participants are not yet represented as full Character records because the MVP intentionally keeps the visible character sample small.
- Battle source metadata and detailed page/panel-level citations remain future data-model work.

### Manual Verification Required
- `npm.cmd install`
- `npm.cmd test`
- `npm.cmd run build`
- `npm.cmd run dev`
- Select Marco and confirm the Battle timeline appears in order 1 → 2 → 3.
- Open and close each Battle item and confirm only the selected item expands.
- Confirm each expanded item shows its Battle context and linked Evidence.
- Confirm King and Katakuri still show the existing character UI without Marco's Evidence.

### Next Steps
- Validate the timeline UI in the user's browser.
- If stable, expand the Evidence schema and add more carefully verified records.
- Consider list sorting/filtering only after the character dataset grows enough to justify it.


## v0.1.7

### Added
- Evidence에 `fact` 필드를 추가하여 원작에서 확인되는 사실과 해석을 분리할 수 있도록 함.
- Evidence UI에서 `원작에서 확인되는 사실`과 `해석`을 별도로 표시.
- 기존 Marco Evidence 5건을 Fact / Interpretation 구분에 맞게 재정리.

### Changed
- Evidence의 기존 `interpretation` 문장에서 직접 관찰되는 장면 설명을 `fact`로 이동하고, `interpretation`에는 해당 사실에 대한 평가적 해석만 남김.
- 기존 Repository, Application, Evaluation 연결 구조는 변경하지 않음.
- 프로젝트 버전을 0.1.7로 변경.
- Marco 8개 스탯의 draft 1차 평가를 Evidence / Battle Context 재검토 결과에 맞춰 조정함.
- Marco 평가 데이터 버전을 `evaluation-0.1.7`로 변경함.
- 현재 8개 스탯 점수는 Attack 78, Defense 79, Durability 78, Stamina 84, Speed 86, Recovery 93, Special Ability 92, Combat IQ 84이며 단순 평균은 84.25임.

### Tests
- TypeScript 소스 구조 및 기존 Evidence 소비 지점을 검토함.
- 기존 Evidence 조회/Application 계층은 `fact` 필드를 직접 사용하지 않으므로 구조적 영향이 없는 것을 확인함.
- 전체 npm test/build는 이 환경에서 실행하지 못했으므로 사용자 환경의 실행 검증이 필요함.

### Known Issues
- `supportedStats`는 여전히 단순 문자열 배열이므로 여러 스탯에 대한 근거 강도의 차이를 구조적으로 표현하지 못함.
- `evaluationImpact`도 여전히 단일 문자열이며 스탯별 영향 관계를 구조화하지 않음.
- Marco 평가값은 여전히 draft이며 이번 변경으로 공식 평가로 승격하지 않음.

### Manual Verification Required
- `npm.cmd test`
- `npm.cmd run build`
- 브라우저에서 Marco Evidence 카드의 Fact / Interpretation 표시 확인
- 기존 Battle timeline 및 Evaluation Trace가 정상적으로 유지되는지 확인

### Next Steps
- v0.1.7의 Fact / Interpretation 구조가 실제 Marco 근거 작성에 충분한지 검토.
- 부족한 경우 다음 단계에서 `supportedStats`의 관계 표현을 별도로 설계한 뒤 적용 여부를 결정.
- Evidence 구조의 실제 사용성을 확인한 뒤 필요할 경우 `supportedStats` 관계 표현을 별도로 설계.
- Marco draft 평가를 추가 근거와 비교하면서 재검토하고, 충분한 근거가 확보되기 전까지 official로 승격하지 않음.


## v0.1.6

### Fixed
- Updated the Evaluation Trace regression fixture to use King for the no-evidence case. Marco's Attack evaluation now intentionally has linked Evidence, so the previous test expectation of zero evidence was stale.

### Added
- 8개 전투력 스탯의 정의 데이터를 Domain에 추가
- 각 스탯 옆에 설명 버튼과 상세 정의 팝업 추가

### Changed
- Marco 8개 스탯의 1차 평가값을 현재 합의된 공통 0~100 스케일에 맞춰 반영
- Durability를 순수 내구도 개념으로 분리하고 Stamina/Recovery와의 중복을 줄임
- Marco 평가 데이터 버전을 evaluation-0.1.6으로 변경

### Tests
- Evaluation Trace no-evidence test fixture updated to use prototype King evaluation.
- User environment reported 15/16 tests passing before this test-only correction.

### Known Issues
- Marco 평가값은 아직 draft이며 최종 공식 평가가 아님
- Durability 82는 현재 정의에 따른 1차 평가값으로 후속 비교에서 재조정될 수 있음

### Next
- 브라우저에서 스탯 설명 팝업 및 Marco 평가 표시 확인
- Marco 평가 분포 재검토 후 King 평가 시작

### Decision
- 스탯 명칭과 설명은 UI 컴포넌트에 중복 정의하지 않고 Domain의 단일 정의를 사용한다.
