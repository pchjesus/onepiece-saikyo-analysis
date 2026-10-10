# v0.1.69 — Exceptional Haki independent-effect source audit

- **Baseline:** main `fd45c55c095369f8fc52f6df917987d9f602e1b6` (v0.1.68).
- **New four tests:** nine current Raw uses across four character evaluations, grouped by five observed effects and matched to existing same-owner Evidence/Battle IDs; guard six shared applications across four repeated-effect groups, explicit Jinbe Ch.1018 uncertainty fix, and unchanged 60/59/62/434 roster/evaluation/axes, 15 matchups, Raw212/230, Balanced1.2 Haki0.5.
- **Source-layer check:** ONE PIECE.com TV1082/1112/857/1040 cross-reviews, keep supplemental anime distinct from direct original manga; manga all-panel reading not performed.
- **No numeric impact:** existing Vista, Shanks, Katakuri, Jinbe 7-stat evaluation, Raw and direct matchups remain frozen; Technique90 never applied. No hypothetical Raw-off Overall calculated.
- **PR-head CI / build:** pending verification.
- **Merge SHA Pages verification:** pending verification.
- **Manual browser/real devices:** not checked.

---

# v0.1.68 — Vista/Mihawk annotated-source and Combat IQ text-context regression

- Initial baseline main SHA: `f3abfa13844a6f332d5a20523e5fe7fb1a0d061f`.
- **Source provenance:** official ONE PIECE.com Vista/Mihawk + 2011 official merchandising description; contemporary 2009 561/562 Japanese dialogue reproductions and page-indexed fan summaries; some original-manga **partial panels from a third-party repost** are distinguishable from full authorized manga-page verification. Original manga full-page direct check **not done**.
- **Text-only adjusted live data**: Ch.561 Marco-assigned interception clarified in the `marineford-vista-mihawk` `externalFactors`, Vista CombatIQ rationale credits execution rather than autonomous mission design, and the two related Evidence uncertainty fields flag direct-access limits. Vista evaluation data version bumped to `evaluation-0.1.68-vista-battle-context-only`; no numeric data/Raw/weights or E grades altered.
- **New tests** `v0168VistaSourceCorroboration.test.ts`: provenance truthfulness, Ch.561/562 source separation and attribution, same event deduplication, seven-stat and 60/59/62/434/15/Raw212 model invariants; prior v0.1.66/67 version guards updated.
- **GitHub PR-head CI / build:** pending final workflow confirmation.
- **Merge SHA CI & GitHub Pages deploy:** pending final workflow confirmation.
- **Real desktop/mobile browser manual test:** not done (not equivalent to CI passing).

---

# v0.1.67 verification — Vista/Mihawk Ch.561–562 source fidelity and six Technique peers

- **Baseline:** `main@d9cd478aec80dee2e891bb55c7227e111faab419` (v0.1.66); target `v0.1.67`.
- **Source access:** official profiles + 2021 official battle-recap crosscheck completed. VIZ official Ch.561 and Ch.562 subscriber-gated; full manga-panel direct reading **NOT performed**. Chapter-by-chapter actions and Marco command in secondary accounts not marked first-hand canon verification. Official TV470/471 synopses provide war context, not detailed Vista parries.
- **New four guard tests:** chapter 561/562 distinction, official vs secondary vs inaccessible source tagging, non-automatic IQ attribution, Ch.574 Haki exclusion from Mihawk duel, six Technique peers' live Base/Raw/Final/E-grades and same-owner evidence, 60/59/62/434 + raw212/230 + Balanced1.2/Haki0.5 + 15 matchups.
- **Production untouched:** Vista Technique86/2/87 and Overall556/7 (review rank26), all seven stats, Shanks, whole roster, direct Matchup inputs, v0.1.65 text normalization tests.
- **Automated PR-head tests/build:** pending actual Actions result at document writing.
- **Exact merge-SHA GitHub Pages:** pending after PR-head success and safe merge.
- **Manual desktop/mobile site QA:** not performed in this environment.

---

# v0.1.66 source-note follow-up regression — pending CI at document edit

- **Confirmed stale explanatory value:** `evidence-jinbe-ace-five-days-552` describes Jinbe's current Stamina as 79, although `evaluation-jinbe` Stamina is **80**. Correct only the text to 80.
- Add a targeted assertion tying the Evidence `evaluationImpact` wording to the actual Evaluation Stamina80.
- Original v0.1.66 PR #64 at `10e15caea9145136cf15baa00a35107fb1359852`: **58 files / 257 tests + production build passed**. Main merge `60031f35db97cb30509fc61477147b6ba3566db9`: **58 / 257 + build + Pages deploy passed**. Follow-up patch requires its own PR-head and main-merge SHA validation.

---

# v0.1.66 verification — source-backed seven-axis review, read-only upside and regression

- Base: `main@4368c0ae4abc7de89647fd91274c757281ccf66d` (v0.1.65).
- Change scope: **review document, 4-test approval-gate source regression, README/CHANGELOG/TEST_REPORT only**. No production score, models, UI, save/restore or Matchup logic edit.
- Vista current: Base86/Raw2/Final87 Technique, Overall556/7, rank26. Nonproduction approval-gated proposed Technique Base89/Raw2/Final90, Overall559/7, rank25. **These candidate values are not published score data.**
- Shanks current Overall648/7, rank10. No candidate increase, no Raw-off hypothetical decrease. All seven existing Stat values preserved.
- Cross-case guards: Vista Attack4/Technique2; Shanks Attack6/Technique8/IQ4; Katakuri Defense6/Technique6; Jinbe Defense4, tied to existing source IDs. A guard does not demonstrate an independently proven incremental Haki effect.
- Existing invariants: 60 Characters / 59 defaults / 62 Evaluations / 434 total axes / representative Raw212 / all Raw230 / Balanced1.2 Haki0.5 / 15 direct Matchups; v0.1.65 name-conversion tests unchanged.
- **Evidence limitations:** ONE PIECE.com primary official profile and TV summaries crosschecked; no complete original manga panel/manual phone/desktop verification claimed.
- **CI:** pending actual PR-head GitHub Actions results at document creation. See PR checks for measured result.
- **Pages:** pending exact merge-SHA deployment result; do not assume deployment success from build alone.
- **Manual verification:** not performed in this review environment.

---

# v0.1.65 — Safe prose normalization, Unicode token boundaries, full-roster render regressions

- Baseline: `main@c18ccc0a7345a03bc06b4e68ae41dd51e99dade0` (v0.1.64 passed 244 tests and Pages deploy). Existing bug: `Supreme King Raw` in Newgate's Evidence `evaluationImpact` is partially mapped to `Supreme 알베르 패기 원점수` because `/King/g` is applied after only complete `Supreme King Haki` recognition.
- Change `src/domain/character/normalizeCharacterNamesForDisplay.ts` **only** in runtime code: preemptively resolve abbreviated/full Haki title, protect Korean `킹` inside words, quoted official alias, use ASCII Romanized whole-name boundaries, protect URLs. Preserve `킹은/이/을/과/에게/의/전` grammar and single-word King/Queen labels.
- Six focused tests in existing normalizer test file plus 3 live UI/whole-corpus tests in `displayNormalizationRegression.test.tsx`: actual Newgate `BattleTimeline` + `EvaluationTrace`, Stussy `CombatProfile` + `EvidenceList`, sample Character 60, Evaluation 62/434, Battle/Evidence/Wano seed corpus scanning for in-word corruption, URL safety and idempotence. Existing prior regression tests also required.
- No current score, Haki Raw, model, evaluation, source, matchup, character/crew, domain state or storage mutation; v0.1.66+ Vista upside review remains a separate later task. No manual physical device QA or full manga panel verification is implied.
- **Execution status: PR CI build and post-merge Pages outcome to be verified by exact SHA**. [Audit report](docs/V0_1_65_DISPLAY_STRING_NORMALIZATION_AND_REGRESSION_2026-10-10.md).

---

# v0.1.64 — 60-character combat narrative integrity & source attribution QA

- Baseline `main@dbd20ffc0fe7123f16d4c50ffd553b003506fcad` (v0.1.63). Audited 60 Character profiles and 62 Evaluation/434 Stat narrative and evidence references through identity checks plus focused human/official-scene review; **not** a claim to have read every manga page for all 60 characters.
- Targeted corrections: Wano seed and detailed Page One's Big Mom Conqueror's vs Armament mislabel; Elbaf (not Wano) Kid/Shanks battle environment; Kawamatsu's mistakenly borrowed Mary Geoise mission language + sword-style label; Kinemon unclear strategy sentence; X Drake SWORD vs undercover Tobi Roppo timing; clarify composite Kid battles.
- New `src/data/sample/v0164NarrativeIntegrity.test.ts`: verifies 60 profiled Characters, 62/434 evaluation texts and evidence ownership, 17 Wano ×7 narratives, updated facts/locations, 59×7 overall and 212/230 Raw invariant, Balanced v1.2 / Haki0.5 / 15 Matchups, Vista/Shanks score stability. Focus test does not determine canon truth of each statement.
- No new Base/Raw/Final/Overall value, Evaluation ID/state, Matchup, calculation rule, official ranking, UI or saved data change. v0.1.63 all-7-stat Vista upside review remains active; original Ch.561–562/574 directly checked before any +N approval.
- **CI/build/deploy status to be filled from SHA-matched workflow logs, not inferred.**

---

# v0.1.63 — Vista/Shanks full seven-axis upside and independent Haki review

- Baseline `main@5a3730ea839326c4bf708da8e4750f170fe4bed1` (passed 236/236 tests and deployed as v0.1.62).
- No numeric patch without source-specific Base-exclusion and owner approval. Add read-only typed audit `src/data/sample/v0163UpsideReview.ts` for 7 Vista and 7 Shanks Stat cards, plus four unresolved same-Evidence Haki events (Vista, Shanks, Katakuri, Jinbe); show qualitative evidence, constraints, comparator IDs, approval gates, never use in ranking.
- New `src/data/sample/v0163UpsideReview.test.ts` checks exactly 14 unique axis cards, source ownership and Evaluation reference links, stat-matched peers, all seven Vista candidate pathways, genuine E3 sparsity, existing 4 overlap amounts, unchanged current baseline vectors and 59×7/62/434 readiness/Haki model/15 direct matchup invariants. No Shanks/Vista down-simulation or mock overall revision.
- Official source cross-check: ONE PIECE.com Vista official profile, 2021 crew news and 2011 figure product (duplicate narrative, not separate feat), TV857/1040/1082/1112 and Shanks official profile. Original manga panels Ch.561–562/574/etc **not directly fully verified**; no manual mobile/desktop browser QA.
- **CI run/test/build/Pages status: verify by PR SHA and post-merge main SHA; do not infer from source.**
- [Evidence decision report](docs/V0_1_63_VISTA_ALL_SEVEN_STATS_SHANKS_UPSIDE_AND_HAKI_OVERLAP_2026-10-10.md).

---

# v0.1.62 — User-approved targeted Raw/Overall correction and multi-axis QA

- Baseline: `main@75cb8e19a2a20b182f9dd634bc3715b2023fd335`. Four existing Stat Raw allocations removed due explicit Base overlap: King Attack4→0, Technique2→0, Jinbe Attack4→0, Katakuri CombatIQ4→0; **Base scores unchanged**.
- Overall: King 83→82.57142857, Jinbe 79.57142857→79.28571429, Katakuri 84.28571429→84.00000000. Vista 79.42857143 / Shanks 92.57142857 both unchanged; no downward simulations generated for them.
- Expected invariants: 59×7 / 62 Evaluations-434 items, E1=53 E2=243 E3=117, representative Raw212 / all Raw230, Balanced v1.2/Weight0.5, Kaido Defense100, 15 direct Matchups. New `hakiMultiaxisCalibrationV0162.test.ts` pins four updated axes, three direct Overall changes, upside-only Shanks/Vista stability and index checks.
- Updated previous version regression assertions which validate **current shared data** rather than immutable historical payload. Historical v0.1.60/v0.1.61 reports remain traceable; supersession stated explicitly.
- **CI outcome to be entered by exact GitHub Actions record**; standalone local git clone unavailable in the current connected environment. Original manga panels not independently verified; official ONE PIECE.com summaries crosschecked.

---

# v0.1.61 — Haki Raw independent effect decision-only audit

- Baseline: `main@068edcd6fd33d9a3b94734285066d36e3ce20df2` (v0.1.60). The only TypeScript change is a **new Vitest read-only test** `src/domain/calculation/hakiIndependentRawAuditV0161.test.ts` containing **5 checks**. No production data, scoring algorithm, model configuration, UI, persistence or Matchup changes.
- The five tests pin twelve current axes across Vista/King/Jinbe/Katakuri/Shanks (Base/Raw/Final/Readiness), verify the five case Evidence IDs and their supported Stat roles including Shanks dual Haki Technique and Jinbe independent Big Mom Defense reference, compare three anchors, test hypothetical Raw-off on separate **copies** (never scores proposed to users), and preserve 59 default/413 items; 62 evaluations/434 items; E1=53/E2=243/E3=117; Raw226/244; Balanced v1.2 Weight0.5; 15 direct Matchups; Kaido Defense100.
- [Decision report](docs/V0_1_61_HAKI_RAW_INDEPENDENT_EFFECT_AND_DECISION_2026-10-10.md). Canon chapter IDs from the existing source catalog; independent full manga-panel verification **not completed**. This report documents a score review, not an approved scoring amendment.
- **Execution status:** GitHub PR CI and post-merge GitHub Pages must be checked by exact SHA before they can be reported as verified. Local machine execution and real browser/mobile QA are not implied by this report.

---

# v0.1.60 — Targeted Kaido Defense100 adjustment and Haki/source provenance verification

- Baseline `main@91ecd36c0e9c684b8c1f12e570a283b971fc96eb` (v0.1.59). User authorizes a **conditional** Kaido Defense100 *if justified*, not global formula/Haki changes. Other open PRs untouched.
- Adjust exactly one scoring item: Kaido default Defense **Base98→99**, **Raw2 unchanged**, Final **99→100**, Overall **96.571429→96.714286**; other 412 core stats retain numerical values. New evaluation data version for Kaido documents this explicit change. Rank position5 preserved in 59-person audit; Kaido–Linlin direct Matchup factor unchanged.
- Ryokugyu Defense **89/E3 unchanged**, its evidence links now explicitly include existing `evidence-aramaki-regrowth-tv1082` (secondary) and existing Shanks source (context). Evaluation data version updated; source Evidence itself unchanged.
- Read-only Haki five case cards (Vista/King/Jinbe/Katakuri/Shanks) with BaselineExclusion reasons and pending original-canon check. No Raw changes; 13 cross-stat reused events not removed. [Detailed v0.1.60 findings](docs/V0_1_60_KAIDO_DEFENSE100_HAKI_AND_RYOKUGYU_SOURCE_REVIEW_2026-10-10.md).
- New `scoreAdjustmentReviewV0160.test.ts` (4 tests) covers Kaido vector and no dual counting; Ryokugyu E3 and Evidence roles, preservation of 59×7/62/434/Raw226+244/E1-3/15 direct matchups/Weight0.5, unchanged five Haki Raw allocations and 59-character overall calculation. v0.1.59 read-only source-link expectation updated and historical known Kaido vector snapshots aligned. No unapproved mass recalibration.
- First PR run exposed two stale historical snapshot assertions (Kaido Overall and capped 100-score count); both fixtures were updated after checking the intended single-axis diff. Re-run full test/build before merge.
- **CI confirmation to follow from exact PR head and merged main SHA**; this document's listing of tests is coverage description, not a claim that local CI has completed. Supplementary official TV summaries crosschecked; **all original manga panels and manual mobile browser not independently tested**.

---

# v0.1.59 — High-E3 scoring adequacy and individual Haki Raw overlap regression (read-only)

- Baseline `main@ec32987005ebab5c2b3aec5763854e47bfc5c842` (v0.1.58), with **three pre-existing unmerged PRs left untouched**.
- Added `src/domain/calculation/scoreCalibrationCasesV0159.test.ts`: checks exact 14 representative E3 Final≥85 character/stat/current Final tuples; two high-E3 evidence-unlinked axes; Ryokugyu Defense current Evidence link; exact 13 overlapping Haki Evidence IDs and paired/triple Raw stats including Shanks dual Haki Technique; Evidence ID integrity; existing 59 default/413, full 62 Evaluation/434 Stat, representative Raw226/full Raw244, Balanced v1.2×0.5 and 15 direct Matchups.
- The preexisting `scoreCalibrationDiagnosticsV0158.test.ts` remains untouched; it already checks all 413 Base+Raw→Final→Overall values, Haki scope, Rank hypothetical sensitivity and no forced winner equivalence.
- New reports: [14+13 individual case audit](docs/V0_1_59_E3_AND_HAKI_RAW_CASE_AUDIT_2026-10-10.md); [decision-gated v0.1.60 proposal](docs/V0_1_59_DECISION_GATE_AND_V0_1_60_PLAN_2026-10-10.md).
- **No numeric or runtime source changes**. Existing score/Rank/Matchup values must remain identical. This is not independent validation of all manga panels, a new official score model, nor hands-on mobile/desktop QA.
- **Execution gate:** locally running npm is unavailable in this connected repository-only environment; record PR CI test and build outcome + actual post-merge `main` Pages same-SHA job result before declaring release confirmed. Historical baseline 50 files/220 passing tests is not automatically the new run outcome.

---

# v0.1.58 — Read-only score calibration and Haki cross-stat overlap diagnostic

- Baseline: `main@85ab40a3c8d92e9aef0795d5a917460423d62d7c` (v0.1.57).
- Changed only a **new test file** and diagnostic/docs/README/CHANGELOG/TEST_REPORT; no Base, Raw, Final, Overall, source Evidence, Matchup, Calculation Model, PROJECT_SPEC, app UI or storage data changes.
- Added `scoreCalibrationDiagnosticsV0158.test.ts` to verify all 59 default Evaluation×7 stat computed Final values, Balanced 1.2 formula and uncapped current range, 413 readiness labels and per-stat density, default Haki Raw226 vs all 62/434 historical-inclusive Raw244, 15 matchups, **13 shared Raw-Evidence across-stat references** with guard examples, and isolated one-Final-only −5 rank stress scenario with original values preserved.
- Full source-derived 59×7 matrix, high-E3 14, 4 genuinely unlinked E3, and model/score version semantics: [baseline](docs/V0_1_58_59x7_BASE_RAW_FINAL_READINESS_BASELINE_2026-10-10.md). [Risk/Rank/decision brief](docs/V0_1_58_COMPREHENSIVE_SCORING_VALIDITY_AND_DECISION_BRIEF_2026-10-10.md).
- GitHub PR CI tests/build and main Pages must be checked on the actual head and merge SHA. No claim of independently verifying all original manga pages or manually interacting with mobile browser.

---

# v0.1.57 — Completed default Evidence readiness audit and scoring-model preservation

- Baseline main `4be641e9b0d0aec29c4206f6a0b5462b5bff3c42` (v0.1.56). Classified previously missing **51 EvaluationItem.readiness** metadata axes; E1+10/E2+35/E3+6.
- Representative 59×7=413 exact readiness E1 **53**, E2 **243**, E3 **117**, missing **0**. The 4 previously unlinked default items (Akainu Speed, Smoothie Speed, Shanks Stamina, Ryokugyu Speed) remain intentionally **E3 with no fabricated IDs**.
- No score/Final/Overall changes, Haki Raw244, Balanced1.2 ×0.5, 62 Evaluations/434 Stats, 15 Matchups, battle/character/Evidence/PROJECT_SPEC/UI/save-data model changes. New `readinessCompletionAudit.test.ts` has four tests for all 51 explicit labels, full 413, E3 unlinked legitimate gaps, source role, twelve Final vectors/Overall, model/historical integrity. Eight historical readiness snapshot files updated to current distribution; `unresolved` now zero for default roster, not a hard requirement that every original manga panel has been independently read.
- Detailed per-axis facts, battle conditions, evidential limits: [51-axis source audit](docs/V0_1_57_FINAL_51_AXIS_READINESS_AUDIT_2026-10-10.md). Next-score-model gate: [Post-readiness brief](docs/V0_1_57_POST_READINESS_CALIBRATION_BRIEF_2026-10-10.md).
- **PR GitHub CI, production build and post-merge Pages deployment:** verify against exact head/merge commit, do not assume success at document creation.
- No claim of manual browser/mobile UI verification or all manga chapter panels being independently accessed.

---

# v0.1.56 — Top-tier readiness and era-context regression

- Baseline `main@0e7cc6522558b5bb029c80388f40de3ada9dfa1a` (v0.1.55).
- Exactly **29 `EvaluationItem.readiness`** fields classified (Garp7, Teach6, Kuzan5, Kizaru6, Mihawk5): new E1 4/E2 19/E3 6. Baseline E1 39/E2 189/E3 105/missing80 → **43/208/111/51**. Remaining Primary29/Secondary22.
- All Base/Final vectors, historical data, Evidence IDs and original fact texts, Haki contributions, calculation/matchup source, UI, storage, PROJECT_SPEC **unchanged**.
- Updated seven existing absolute readiness distribution assertions. New `readinessTopTierReview.test.ts` (4 tests) checks 29 labels, exact distribution, Prime/older Garp separation and high-score E3 uncertainty, original evidence role constraints, unchanged 62 evaluations/434 stats, Raw Haki244, Matchup15, five full Final vectors/Overall, and all remaining 51 primary/secondary-linked axes.
- [Detailed 29-axis provenance/conditions](docs/V0_1_56_TOP_TIER_29_AXIS_SOURCE_CONTEXT_AUDIT_2026-10-09.md) · [80-axis before/after trace](docs/V0_1_56_80_AXIS_BEFORE_AFTER_TRACE_2026-10-09.md).
- **PR CI + main Pages deployment:** pending until GitHub Actions confirms green for the **specific commit SHA**. No actual browser/manual mobile verification or universal original manga panel proof is claimed.

---

# v0.1.55 — Five-character source-readiness and calculation invariants

- Parent main baseline `39383ba5ed1f43085a4f509e782bfe8ddf723553` (v0.1.54).
- Changed only 31 `EvaluationItem.readiness` metadata fields in `src/data/sample/evaluations.ts`: Cracker 5, Law 7, Doflamingo 7, Jinbe 6, Shanks 6. 9 E1 + 20 E2 + 2 E3; representative readiness `39/189/105/80`.
- Existing Evidence records, Base/Final scores, Haki Raw (244), 59 default×7, all Evaluation 62/434 stats, Matchups 15, Balanced 1.2, PROJEC_SPEC, B selector and UI are unmodified. Source fact vs combat conditions vs inference are distinguished in detailed audit and trace matrix.
- Added `src/data/sample/readinessFiveCharacterAudit.test.ts` with 3 comprehensive tests: all 31 chosen labels, current 59×7 distribution and E3 high-score caveat, existing battle evidence source-role integrity, Five Character Final vector/Overall unchanged, legacy data sizes and Haki raw 244. Updated 6 prior fixed-count fixtures.
- **PR workflow npm test/npm run build and post-merge Pages main deployment:** confirm with exact commit SHA once completed; until then no success assumed.
- No browser/mobile manual UI run and no complete independent manga-page inspection.
- [Audit report](docs/V0_1_55_FIVE_CHARACTER_CANON_READINESS_AUDIT_2026-10-09.md) / [111-axis trace](docs/V0_1_55_111_AXIS_TRACE_2026-10-09.md)

---

# v0.1.54 — 23 missing Evidence-role axes and 14 context-only axes

- Baseline `main@69c530ab38cb6cd319216bed5d012bcd10b2b14e` (v0.1.53).
- Scope: 37 individually reviewed `EvaluationItem.readiness` metadata fields; 5 added `statContributions` secondary roles, 3 existing context→secondary role clarifications. Zero new Evidence records, numeric ratings, Haki Raw, Calculation Model, Matchup, UI, stored state or PROJECT_SPEC changes.
- Distribution E1 30/E2 162/E3 73/missing 148 → **E1 30/E2 169/E3 103/missing 111**.
- Previous fixed distribution assertions updated in `readinessMetadataAudit.test.ts`, `readinessSourceRoleAudit.test.ts`, `readinessComparativeAudit.test.ts`, `overallValidityAudit.test.ts`, `hybridRawPilotReviews.test.ts`. New `evidenceStatRoleGapAudit.test.ts` checks 37 explicit choices; 8 precise per-axis Evidence roles; 111 remaining primary72/secondary39; 59×7, 62 Evaluation/434 Stat, Haki Raw244, 15 Matchups and representative score/Overall invariance.
- Canon-vs-official-TV-vs-interpretation uncertainty documented by [37-axis report](docs/V0_1_54_ROLELESS_CONTEXT_37_AXIS_ADJUDICATION_2026-10-09.md); [148-axis trace](docs/V0_1_54_148_AXIS_SOURCE_ROLE_MATRIX_2026-10-09.md). Post-audit development intentions in [roadmap](docs/V0_1_54_POST_AXIS_AUDIT_ROADMAP_2026-10-09.md).
- **PR CI and main Pages verification:** pending successful workflow observation. No claim of personally inspecting all manga panels or running manual mobile QA.

---

# v0.1.53 — three supplementary evidence records and 24 readiness classifications

- Baseline `main@5ff5b9ab345463b2469a155ccbd2cbe0eb2adfd5` (v0.1.52).
- Scope: exactly 24 existing EvaluationItem readiness metadata fields, 10 Evidence links on 7 items, 3 new official TV supplementary Evidence objects referencing existing Battle IDs. No Base/Final score, Haki Raw, scoring model, Matchup/Battle participant, Character, save state, PROJECT_SPEC, or UI changes.
- Distribution baseline E1 29/E2 145/E3 67/missing 172 → **30/162/73/148**. The three no-link axes with E3 remain intentionally unlinked.
- Updated historical readiness count tests in `readinessMetadataAudit.test.ts`, `readinessComparativeAudit.test.ts`, `overallValidityAudit.test.ts`, `hybridRawPilotReviews.test.ts`. Historical absolute Evidence ID-empty count in hybrid test updated 11 → 4 because seven representative items gained legitimate links.
- New `readinessSourceRoleAudit.test.ts`: 24 explicit labels, 3 official-source records and their existing Battle links, role-specific context handling, 3 legitimate E3 no-Evidence gaps and all exemplar 7-axis Final/Overall Haki Raw/Matchup invariants. `docs/V0_1_53_172_AXIS_EVIDENCE_ROLE_TRACE_2026-10-09.md` records full 172 prior unclassified axes, 148 still unclassified, per-axis source-role quality.
- **GitHub PR test/build and main-commit Pages deployment:** pending until observed green status, then report results with exact SHA. No manual mobile-browser assertions.
- [Report](docs/V0_1_53_LINK_GAPS_AND_EVIDENCE_ROLE_REVIEW_2026-10-09.md) · [172-axis trace](docs/V0_1_53_172_AXIS_EVIDENCE_ROLE_TRACE_2026-10-09.md).

---

# v0.1.52 — 189-readiness triage and 17-axis reviewed metadata

- Baseline `main@be897e34c8bedc08777a9937a77470d1ca1cd3db`; previous count E1 29/E2 134/E3 61/missing 189.
- Changed exactly 17 metadata `readiness` values: Jozu 7, Queen 7, Katakuri 3. No changes to Base/Final scores, raw Haki contributions, model formula, Evidence/Battle IDs, matchups, UI, PROJECT_SPEC, or saved data.
- After: E1 29/E2 145/E3 67/missing 172. Original 189-axis before/after matrix stored under `docs/` to distinguish reviewed vs unresolved records. Remaining 10 zero Evidence-ID links documented.
- Update three pre-existing count assertions (`readinessMetadataAudit.test.ts`, `overallValidityAudit.test.ts`, `hybridRawPilotReviews.test.ts`). Add 3 scenarios in `readinessComparativeAudit.test.ts`: 17 expected E-levels + 59×7 distribution; four exemplar Final vectors, Overall, Haki Raw and matchups invariants; Lucci/Kaku IQ68/72 retained E3.
- **PR CI test/build and exact-commit Pages deploy result:** pending workflow; complete acceptance after observed success. No claims of full official manga-panel source verification or manual browser QA.
- [Evidence and case-by-case audit](docs/V0_1_52_READINESS_CALIBRATION_AND_THREE_CHARACTER_ANCHORS_2026-10-09.md) / [189-axis matrix](docs/V0_1_52_READINESS_189_AXIS_TRACE_MATRIX_2026-10-09.md).

---

# v0.1.51 — readiness text/metadata consistency and unchanged-score regression

- Based on `main@73b0816cccef809f431076300ffc919ed85bf618` (v0.1.50).
- Scoped metadata-only change: 3 rationale-explicit E2 tags, no point values, Evidence IDs, Haki Raw, UI, calculation, stored memberships, or matchups edited.
- Existing `overallValidityAudit.test.ts` updated from 29/131/61/192 to **29/134/61/189** readiness counts. New `readinessMetadataAudit.test.ts` checks those three E2 classifications, raw/stat/Overall invariant, that missing-readiness explanations do not claim a specific E level, linked Evidence IDs exist, and at most the 10 known missing-readiness, unlinked-Evidence axes remain.
- **Automated CI and production build still need successful PR head run**. Then merge main and verify Pages deployment using the exact commit SHA. CI does not establish canon-panel exhaustive checks or real mobile QA.
- [Details](docs/V0_1_51_EVIDENCE_READINESS_AND_PRIORITY_CANON_AUDIT_2026-10-09.md).

---

# v0.1.50 — Cracker rationale integrity regression plan

- Base: `main@ae26cf49f13b90f7334131e8e9e11c1e20c1ca74` (v0.1.49).
- Code-only scope: two Cracker rationale strings in `evaluations.ts`, one old numeric Evidence impact sentence in `evidence.ts`, focused automated regression test, markdown audit/report metadata.
- New `crackerRationaleConsistency.test.ts`: approved seven Final scores, Attack Raw4, Final77 / Defense Final81, Overall77.857142..., and lack of contradictory historical Stamina phrase.
- Existing test suites must still verify 59 evaluated unique IDs, historical Evaluations 62, Core Stat434, total Raw Haki244, membership73 and direct matchups15. Existing UI picker B, 7-axis calculations and all baseline scores untouched.
- **PR #48 first CI result:** [Actions run #331](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37920367997) at head `e505cedcde136c5d97e2eb99fab3cfc8840caf84`: `npm install`, `npm test`, `npm run build` all succeeded. This document update triggers a new head run; confirm it before merge. Post-merge Pages check remains pending. Passing automated CI is not independent inspection of all canon panels or real-device mobile QA.
- [Full 59-character axis report](docs/V0_1_50_SEVEN_AXIS_DEEP_AUDIT_AND_CRACKER_RATIONALE_2026-10-09.md).

---

# v0.1.49 — Balanced Overall reliability/validity distinction and 59×7 diagnostic

- Baseline `main@ee48392a74a645258d0bbf5475467711a6dfe883`, v0.1.48. This patch updates explanatory text only, adds a non-production weighting experiment report and `overallValidityAudit.test.ts`. No stats/Raw/CombatPower calculation changes.
- Regression protects 59 unique IDs, Balanced equal-weight result across all 59, 244 Raw Haki (over 62 Evaluations), alternative weighting only in test scope, and 413 default-axis readiness metadata (29 E1/131 E2/61 E3/192 missing).
- Same Overall yet different 7-axis distribution: Kanjuro/Ulti and Cracker/Karasu; Jack/Kid alternate-weight position checks. Scenarios are NOT alternative official models or a probability forecast.
- `CharacterPage` now clarifies Overall is not a 1v1 win rate or certain rank; `App.test.tsx` checks the message. PROJECT_SPEC, Rank sorting, Matchup, B picker and UI palette are unchanged.
- New CI/test/build, PR merge and exact main Pages deployment to be verified separately. Automated jsdom is not real-device mobile visual QA.
- [Full 59×7 sensitivity and model-validity audit](docs/V0_1_49_OVERALL_VALIDITY_AND_SENSITIVITY_59x7_2026-10-09.md).

---

# v0.1.48 — Group dropdown/all-roster picker and score semantics regression

- Baseline v0.1.47 main `6f4a19cc80a9f577cd3f26bfbce8cfdb24d12fee`.
- Preserve all 59 distinct IDs and 73 memberships: dialog dedupes historical group membership, filter preserves group context on click, ranking and matchup unchanged.
- Existing `src/ui/App.test.tsx` cases use actual native group select instead of discontinued tab buttons and verify historical groups, rankings and alias search; add independent dialog focus Escape and unique roster/group-filter tests.
- Full `npm test`, `npm run build`, CI PR, post-merge main and GitHub Pages gate required. Real-device visual/touch QA remains distinct from jsdom tests.
- Model assurance is a logical review, NOT empirical psychometric validation: 7 Final Stats arithmetic mean remains unchanged.
- [Evidence/UX explanation](docs/V0_1_48_PICKER_B_AND_OVERALL_VALIDITY_2026-10-09.md).

---

# v0.1.47 — A-path calibration, baseline and regression gates

- Baseline `main@7ee57a475e1d9721bfdca03d8fcd1c6bd0cf748d` (v0.1.46), 59 evaluated unique / 62 evaluations / 434 core stats, Haki Raw 244 and 15 existing direct matchups.
- Only 6 of 59 default character arrays change, with 53 full seven-axis arrays frozen as Golden baseline in `fullRosterCalibration.test.ts`; all 59 unique remain. King/Katakuri Base adjustments accounted for their **pre-existing Haki Raw**, no recalculation rule changes.
- Changed overall: Jack 74.857→78.143, Kid 82.571→84.571 (Speed 78→82, Versatility 86→80), Karasu 80→77.857, Marco 81.714→83.429, King 81.286→83, Katakuri 82.714→84.286.
- 59×7 axis-specific comparisons include Garp Attack99 vs Marco77, Kid Attack92 > Law86 but Combat IQ73 < Law88 and Versatility80 < Law91, Jack Stamina88 > Ulti84 and Jack overall above six Tobi Roppo, commander minimum 83 > specified peer group max 79.571. These are explicit project evaluation constraints, not official canon tiers.
- 14 peer records retained pending better independent evidence. Numeric distribution remains concentrated at 75–80 (25→27) rather than forcing aesthetic normalization.
- CI full-test/build and postmerge Pages deploy must pass before release declaration; manual mobile/device QA and manga full-panel evidence verification remain pending.
- [Detailed 59×7 source/evaluation audit](docs/V0_1_47_A_PATH_59_CHARACTER_SEVEN_AXIS_CROSS_AUDIT_2026-10-09.md).

---

# v0.1.46 — Canon source matching / conditional combat context regression

- Baseline `main@09786f1fac2a8922a125bc44cb43f61e5b808f21` (v0.1.45).
- Verified ONE PIECE.com TV source correspondence: Kid's 1066 attack vs 1067 victory, Drake's actual 1060/1069 CP0 engagements, Ulti's 1033 Big Mom intervention vs 1038 Zeus/Nami follow-up, Who's-Who's hidden troops (1038) vs Jinbe finishing blow (1040).
- Corrected Who's-Who `combatStructure=multiple-vs-one`. Revised source references and Lucci/Kaku IQ explanations; readiness `E2→E3` for only those two Combat IQ axes. **No Base/Final/Overall scores, affiliations, Haki Raw or direct matchups were recalculated in this source-verification patch.**
- Added `officialEpisodeCrosscheck.test.ts` (four source/context and integrity assertions). Previous regression tests remain enabled and existing values unchanged.
- 60 Characters / 59 unique evaluated / 62 Evaluations / 434 Stats / 73 Memberships / Haki Raw 244 / 15 direct Matchups, Balanced 1.2 weight0.5 remain release invariants.
- Final build and merge+Pages CI must be checked separately before declaring published; manual device visual verification not performed.
- Detailed verification: `docs/V0_1_46_OFFICIAL_EPISODE_CROSSCHECK_2026-10-09.md`.

---

# v0.1.45 — 17 new characters, three groups, CP0 recalibration release gate

- Baseline `main@1ed24e8e8404dfb84d0348517b529972a06be19c`, v0.1.44. This patch adds exactly 17 evaluated draft characters and 3 historical/current contextual groups without changing old Character identities.
- Expected totals: 60 Character master / 59 unique evaluated / 62 Evaluation / 434 Stats / 73 Membership, plus 55 supplementary new Evidence and 30 Battle context records.
- Lucci 81.000→78.000 (combat IQ 78→68), Kaku 78.4286→74.2857; other prior 43 Evaluations' Base scores untouched; total Haki Raw 244 (49 typed contributions) preserved. Old 15 direct Matchups unchanged.
- New `wanoExpansion.test.ts` verifies 17 unique IDs, all 119 new axes with Evidence ownership, 3 source groups, Drake/Kanjuro/Ashura affiliation, Kinemon leader, 59-ranking dedupe, special Killer failed SMILE, 0 new Raw, legacy user ratings unchanged.
- Regression tests across historical Haki audit files retain original 49 Haki-contribution entries; **49 is not 73 Memberships** (fixed an initial test migration confusion).
- Prior CI run `37893323754` passed 38 test files / 173 tests but failed TypeScript on multi-affiliation `flatMap` inference. Fixed explicitly typed `CharacterMembership[]` callback; final post-change CI must be checked separately, then post-merge main and Pages.
- New episode-scoped source validation: Kid+Law vs Big Mom, Kid+Killer rooftop 5v2, Kid vs Shanks, Killer vs Hawkins, Akazaya vs Kaido, Inuarashi/Jack and Nekomamushi/Perospero conditional Sulong, Who's-Who/Jinbe, Sasaki/Franky, Black Maria/Robin, Ulti/Big Mom, Page One/Big Mom and Kanjuro betrayal. These 13 distinct Battle contexts and 21 person-linked additional records avoid conflating different opponents or assigning group results to individual feats.
- No browser/tablet manual UX has been performed; treat automatic jsdom tests and Pages deployment as distinct from hands-on device validation.
- Audit limitations: sources are official character profile and official anime plot synopses, not direct full manga chapter review; source.type supplementary and E2/E3 draft accordingly. Do not infer new current allegiances or canonical numbers.
- [Full 17-member 7-axis and CP0 audit](docs/V0_1_45_WANO_THREE_GROUP_EVIDENCE_RECALIBRATION_2026-10-09.md).

---

# v0.1.44 — Cross-calibration regression and release checklist

- Baseline: `main@ec8f69f6e08bc485b9206f5e05dc709e58e15dc9`.
- Changed **3 existing Evaluations / 21 reviewed axes**: Lucci 86/82/85/88/89/81/80 → 82/79/83/84/84/78/77; Kaku 80/78/80/85/88/82/82 → 76/75/77/80/84/79/78; Morley 76/78/77/69/80/75/83 → 76/80/77/77/83/75/87.
- Expected Balanced v1.2 overall Lucci **81.000**, Kaku **78.429**, Morley **79.286**; comparator standings and full 42-character rankings tested against calculated data. Unmodified 39 legacy plus Sabo/Karasu/Stussy evaluations retain score/data versions.
- Added **2 supplementary Evidence / 1 Battle**, preserving legacy canonical evidence links. New Morley Speed evidence changes a role `context→primary`; Kaku short Zoro contact and group attacks are downgraded to `secondary/context` instead of equating exchanges to individual top-tier damage.
- Expected invariants: **43 character master, 42 unique evaluated, 45 Evaluations, 315 Stats, 49 Memberships, Haki Raw 244, Balanced 1.2 weight 0.5, 15 existing direct Matchups**; `PROJECT_SPEC.md` and full app colors untouched.
- All prior tests remain enabled; update only affected three calibrated golden Overall fixtures and relevant evidence count (14→16)/new context count (10→11) plus new comparison checks.
- CI test/build and main Pages deployment must be checked before declaring release success. Actual mobile/desktop browser rendering not verified in this task.
- [Evidence/context/source/audit plus next group shortlist](docs/V0_1_44_CROSS_CHARACTER_CALIBRATION_AND_NEXT_GROUPS_2026-10-09.md).

---

# v0.1.43 — Six-character evidence recalibration / regression gate

- Baseline `main@0da4af3e0b3bf3b5e504be3e87fc5f7165bf145a` following UI/translation PR #36.
- Audited 6 characters × 7 stats. Three adjusted: Kaku Combat IQ 79→82, Stussy Speed 83→80, Stussy Combat IQ 88→85. Four characters' 7-axis values and the remaining 11 reviewed axes unchanged. Related Episode 1109 and Stussy Evidence interpretation/context updated; all links and IDs preserved.
- Expected Kaku Overall 82.142857..., Stussy 77.571428..., other four unchanged. Derived 42-character ranking Kaku 23, Stussy 34. No new matchup inference, no win probability.
- Legacy 39 Evaluations/273 Stats remain untouched. Global 45 Evaluations, 315 Stats, 43 character master / 42 unique evaluated roster, 49 Memberships, 15 existing Matchups, Balanced 1.2, Haki 0.5 and Haki Raw sum 244 unchanged.
- `src/data/sample/newGroupEvidence.test.ts` updated as a genuine rating-data migration: full six-score arrays, 42-axis calculation, altered Evidence owner/role, 42 unique ranking and fixed old data invariants still tested. No test disabled or weakened to hide failures.
- PR CI, post-merge `main` tests/build/Pages deployment and actual browser/device checks are separate release gates; do not assert success before checking. Manual browser QA has **not** been performed.
- [Detailed Evidence/Context/Interpretation audit](docs/V0_1_43_REVOLUTIONARY_CP0_EVIDENCE_RECALIBRATION_2026-10-09.md).

---

# v0.1.42 — vertical Special restoration and fruit localization

- User screenshot comparison: retain a *single combined type label* and restore a *vertical* sequence of explanatory text without bordered two-column cards. No global palette change.
- Changed only CSS display rules for `special-trait-list` and `special-trait`; one title and full-width sections remain in `CombatProfile`.
- UI display Korean names: `메라메라` → `이글이글` (Sabo), `오페오페` → `수술수술` (Law), `메로메로` → `매료매료` (Hancock), `모치모치` → `쫀득쫀득` (Katakuri), Karasu `그을음그을음`, Morley `밀어밀어`. Evidence links/trait IDs preserved; unclear official Korean-language naming may need licensed Korean volume verification.
- Regression assertion covers all six localized traits and category grouping; production build and whole-roster regressions gated by CI. `PROJECT_SPEC.md` and `evaluations.ts` remain untouched.
- Manual browser/tablet CSS visual verification remains pending; the user screenshot is the acceptance reference.

---

# v0.1.41 — Special Profile / Evidence readiness / motif / localization (PR #35)

- Baseline: 43 Character master / 42 unique evaluated, 45 Evaluations / 315 core Stats, 49 Memberships, 15 direct Matchups, Haki Raw sum 244, Balanced 1.2 / Haki Weight 0.5.
- Display-only Special ordering: devil-fruit → race → biology → modification → equipment → technology → other. A single slash-separated category heading and two-column individual explanations, single-column on narrow screens; original category/status/description/Evidence links and score logic remain intact.
- Evidence readiness help: exact model definitions E1/E2/E3 from `src/domain/evaluation/types.ts`; E4 marked as not defined, not added to the canonical union; `?` beside core-stat header, outside-pointer and Escape dismiss/focus return.
- Beasts Pirates icon: generic `♜` replaced with compact original horned-skull visual reference. This is not the official logo artwork.
- Polish localized Korean Special descriptions for Sabo, Morley, Karasu, Lucci, Kaku, Stussy. Existing Haki/Evidence/7-axis numbers not recalibrated.
- Added three jsdom tests across CombatProfile, CharacterIdentity and EvidenceReadinessHelp, plus existing app/roster/matchup/regression coverage.
- Latest PR build [37887097546](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37887097546) succeeded: **37 test files / 165 tests passed; TypeScript + Vite build passed**.
- GitHub Pages postmerge status must be independently checked. Real Android/browser mobile scrolling, viewport clipping, touch and visual rendering are **not** verified by jsdom.
- No change to `PROJECT_SPEC.md`, overall theme, evaluation/rating policy or npm package version. Entire UI palette stays in its already-approved current design.

---

# v0.1.40 — Haki help completeness fix / final post-merge verification — 2026-10-09

- [PR #33](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/33): status-only Haki records were missing `?` controls. Every Armament/Observation/Conqueror row now provides a button; if optional detail notes are not registered, the content explicitly says so without creating fictional Evidence or altering Haki statuses.
- Regression coverage added for Akainu status-only records: three help buttons, open with fallback explanation, Escape close.
- PR CI [37885166603](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37885166603): **36 test files / 162 tests passed**, `tsc -b && vite build` passed, PR Pages deployment skipped.
- Merged to `main` at `289b91a0e6e5f1b7656b0368f734cb557b42f59d`; [post-merge run 37885213396](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37885213396) completed successfully with build/test and Pages deployment.
- This fix does not change any Evaluation/Stat/Haki Raw, Balanced 1.2 weights, memberships, score calculation, Matchups or app-wide palette. The existing 43 Character master / 42 evaluated unique / 45 Evaluation / 315 Stat / 49 Membership / 15 direct Matchup baselines are preserved.
- **Manual QA still needed:** real mobile and desktop site rendering, popup edge-clipping/touch behavior, and keyboard behavior on actual devices. GitHub Actions success is not a browser/device QA result.
- Product npm package version `0.1.34` remains unchanged; v0.1.40 is the implemented feature-patch label. Changing that versioning convention is a separate release decision.

---

# v0.1.40 — Post-merge CI / Pages verification — 2026-10-09

- PR [#31](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/31) was merged to `main` on 2026-10-09 04:18 UTC (13:18 KST): merge commit `aafdce5d66e14d4603b158fbcb55ff10438e6bdc`, feature HEAD `4759b71b72c87c661fa1402232da707a6465f6b6`.
- Final PR run [37883157194](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37883157194) completed successfully: `npm test`, `npm run build` passed; Pages deployment correctly skipped on PR.
- Post-merge `main` run [37883219757](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37883219757) completed successfully: **36 test files / 161 tests passed**; `tsc -b && vite build` passed; Pages artifact upload passed.
- Post-merge deploy job `113667467309` reported **success** for exactly `aafdce5d66e14d4603b158fbcb55ff10438e6bdc`; GitHub evaluated environment URL: https://pchjesus.github.io/onepiece-saikyo-analysis/.
- This release-verification entry changes **documentation only**. No Evaluation, Haki Raw, Balanced 1.2, existing direct Matchup, Membership or UI source changes are introduced. The v0.1.40 global UI palette item #3 **remains unimplemented** pending user approval.
- **Still unverified:** actual desktop/mobile browser visual inspection, touch placement and clipping of Haki help popovers across small screens, and end-user site rendering. A successful Pages deployment is not proof of manual UI verification.
- Nonblocking build/deploy maintenance note: GitHub Actions warned about Node.js 20-based actions being forced to Node.js 24. Review action major-version upgrades separately; do not mix them into this patch.
- The previous entry's note that post-merge Pages required verification is historical; the successful deployment is verified in this section.

---

# v0.1.40 — 인물 프로필 간결화 및 현재 소속·서열 검증

- Input: 43 Character master, 45 Evaluations (315 Stats), 47 original Memberships, 15 direct Matchups.
- Change: +2 Memberships to 49 (Kuzan current Blackbeard 10th while Navy former, Jinbe Warlords former while Straw Hat current). Existing Evaluation/Score and Matchup payloads unchanged.
- Added / revised tests for Haki three-row '?' popups with outside-pointer and Escape dismissal/focus, verified Devil Fruit awakening badge, default non-awakened Sanji, local group/admiral motifs, Captain-first / numbered seat / Korean alphabet fallback, Kuzan/Jinbe duplicate suppression and Newgate final crew label.
- Existing snapshot-style 'first Navy character' assertions were updated to explicitly select Garp when required; no UI feature was removed or test disabled.
- PR #31 code + docs revision CI [37883066574](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37883066574): **36 test files / 161 tests passed**, `npm run build` **passed**; deploy skipped on PR branch. The post-merge main Pages deployment is subject to separate verification.
- 3 global color palette options documented only; app-wide background/tab/card colors not changed.
- Browser/mobile device manual visual confirmation not performed in this automated review.

---

# v0.1.38 — A안 승인 후 실제 데이터 반영 및 병합 게이트

- 네 축 A안 실제 `sampleEvaluations` 값 변경: 사카즈키 방어 95/0, 쿠잔 공격 93/0·방어 93/0, 카타쿠리 공격 81/0.
- 역사적 Haki Raw 리뷰 14건 기록은 보존하되 현재 원본 데이터의 4건 Raw가 이미 Base에 이전됐음을 회귀검증으로 구분.
- 39 Evaluation / 273 stat / 49 typed Raw 합계 244, 기존 Final/Overall, Evidence 소유와 Haki 능력, Matchup 비교 호환성 검증.
- [검토 브랜치 CI](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37879886144) 성공 후 문서 갱신. 최신 PR HEAD의 최종 CI 및 병합 뒤 main 빌드·배포는 별도 확인 대상.
- 모바일 실기기 렌더링은 실시하지 않았으며 신규 집단의 데이터 등록은 별도 작업.

---

# v0.1.37 (Draft PR #29) — 가반 산먹깨비, 한국어 용어, Hybrid 재산정 승인안

**2026-10-09 KST**. Product `main` stays at v0.1.34 pending user confirmation.

## Implemented in review branch
- Verified 112권 1139화 정식 단행본 제목 `산먹깨비`, inserted before `해적왕의 왼팔` as the Gaban epithet without changing any identity, membership, Evaluation state, or score.
- UI Korean localization: 7 stat labels, all visible Base/Raw/Haki/Final calculation terms, battle structure/intent/result/evidence strength, matchup selection headings and visible analysis, special profile captions, and primary term 카무사리. Internal identifiers, evidence IDs and CalculationModel remain unchanged.
- Added non-production `buildHybridApprovalPreview` A (4 Raw Base transfers) / B (10 Raw Base transfers across 9 stats), preserving 39 Evaluation/273 Stat Finals and all original OVR. Explicitly notes that score changes are NOT warranted without further canon marginal-effect evidence.
- Group research `docs/PROPOSED_NEXT_TWO_GROUPS_EVIDENCE_2026-10-09.md` for Revolutionary Army and CP0 is **research only**. Group/Character/Evaluation data not yet added.

## Validation and regression fixes
- Initial CI caught English assertions after localization; updated existing React integration tests to retain all prior functionality coverage.
- Another CI caught translation of the program identifier `factors` due to overly broad string replacement; fixed the program identifiers and retained Korean user-visible labels (test is not disabled).
- TypeScript CI caught exhaustive EvidenceStrength union `unclear`; added the Korean display string `불명확` rather than weakening types.
- Verified latest implementation commit at [CI run 37878826898](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37878826898): **34 Test Files / 148 Tests passed**, **TypeScript/Vite production build passed**, deploy skipped because PR branch only.
- Actual desktop/mobile visual inspection, production `main` deploy and user approval **not performed**. No claims about new character 7-axis scores.

## Approval gate
- Keep PR #29 **draft**, do not merge or deploy before user selects A (4 ordinary transfers) or B (all 10 with overlap-to-Base) and approves final changes.
- Full baseline: 39 Evaluations, 273 final Stats, 53 typed Raw sum 256, Balanced 1.2 Weight 0.5, 15 Matchups.
- The 4 vs 10 candidate impacts live **only in simulation**; production score/Ranking source of truth is unchanged.

---

# v0.1.36 Draft — FEATURED Selection UX & Haki Overlap Scenario (2026-10-09)

## Scope and before/after
- Project scope and 39 Evaluation/273 Stat official draft source values remain unchanged; 15 direct Matchups and v0.1.34 Balanced 1.2 remain intact.
- FEATURED quick-pick buttons now have visually selected dark fill, stronger border, checkmark, and accessible `aria-pressed`; state derived from resolved Matchup pair + evaluation state, no separate stale selection state.
- Added `src/ui/pages/MatchupHome.test.tsx` (jsdom React) verifying initial selected pairing, changing FEATURED, SWAP retention, manual roster clearing, era-specific change/restore, RANDOM pair coherence.
- Non-mutating `src/domain/evaluation/hybridOverlapStress.ts` + `src/data/sample/hybridOverlapStress.test.ts` simulate removing exactly six **unresolved** cross-stat Haki Raw allocations, Raw sum 28, with Base fixed only to measure sensitivity. Tests cover the impact on all 39 Evaluations and preservation of all other 273 Stat values; the stress output is NOT a canon score correction or a lower bound.
- [Scene review and exact caveats](docs/HYBRID_HAKI_OVERLAP_SCENE_REVIEW_2026-10-09.md) distinguishes anime summary statements from manga interpretation, duplicated outcomes from independent effects, and matchup conditions.

## Verification
- PR #28 [CI 37875341097](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37875341097): **33 test files / 143 tests passed; `npm run build` passed**.
- Current PR HEAD after this test report needs CI recheck before merging.
- No actual desktop/mobile browser rendering or device-specific interaction test was run. jsdom covers React state and attributes, CSS selected selectors have been added but visual rendering was not manually inspected.

## Data/version guarantees
- No changes to `PROJECT_SPEC.md`, official Raw, Base, Final, rating formula, ranking source, matchup factors/winners, saving/restoration and product/package version.
- Explicit approval and full evidence audit still required before any production Haki data/version migration.

---

# v0.1.35 Draft — 14 Haki Raw Disposition & Candidate Base Rebase

**2026-10-09 KST**. PR #27, branch `feature/v0.1.35-hybrid-raw-disposition`.

## Review/implementation
- All **14 Haki Raw contributions** in Sakazuki/Kuzan/Shanks/Katakuri/Linlin reviewed with exact Evidence, Raw, rationale and uncertainty. Mihawk's Raw=0 preserved without inferring inferior Haki.
- **4 score-invariant Base/Raw proposals**, 4 exceptional applications with unproved independent marginal bonus, 6 multi-stat overlap unresolved. These are **not** applied to production Evaluation data.
- New `previewHybridRawPilot` copies the input 39 Evaluation records without mutation. It checks ID/Stat/Haki Type/Evidence ID/Raw/duplicate review, 0–100 Base bounds, exact Final invariance under **Balanced 1.2 Weight 0.5**, and rejects incompatible Haki Weight input.
- In preview only, aggregate Raw **256→244**, four Base points adjustments total **+6**. All **39 Overall and 273 Final Stat values remain unchanged**. Changing model Haki Weight would alter some scores and needs versioned migration review.
- New official ONE PIECE.com TV episode 857 supplementary Evidence for Katakuri's composure-dependent Future Sight and mochi-body evasion, with scope-limited role mapping and no invented Raw. Katakuri `Attack/Defense/Technique/Combat IQ` readiness marked E2; evaluationDataVersion updated; all numeric values unchanged.
- Overall missing readiness items **196→192**, missing Stat Evidence links still **11**, typed Raw in production remains **53 contributions / 256**.

## Regression and CI
- First PR run [37870705757](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37870705757) **failed 2 previous app tests**: adding the Katakuri source raised his evidence count from 7 to 8, and the old character Evidence query and Battle Timeline tests expected 7.
- Repaired both tests with a direct check that the extra Episode 857 Evidence is included, owner-matched and attributed to Katakuri's existing battle; did **not** weaken the feature or hide the result.
- The post-fix implementation commit [37870824214](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37870824214): **31 Test Files passed / 137 Tests passed**, `npm run build` **success**.
- This report only adds documentation; require final PR-head and post-merge CI verification. Real Android/mobile and manual in-browser UI QA **not** performed.

## Release restrictions
- There is no change to `PROJECT_SPEC.md`, official 39 score data, Haki Weight 0.5, `Balanced 1.2`, 36-character default Ranking, 15 Matchups or UI behavior except existing Evidence/Readiness content.
- Proposed Base shifts are **candidate data only**; not approved Haki exceptional Raw amounts. Do not merge numeric candidates into Evaluations without separate comparison and explicit user authorization.

---

# v0.1.35 Draft — Sakazuki Evidence-first Recalibration Pilot

**2026-10-09 KST**, branch `feature/v0.1.35-evidence-recalibration-pilot`, PR #26, product still v0.1.34.

## Directly verified implementation
- Three Sakazuki historical Battle Context records: Squard misinformation, Meteor Volcano group siege, Ace protection intervention.
- Four Sakazuki owner-linked canon Evidence records (Squard, Meteor Volcano, Ace fatal hit, Jinbe/Luffy pursuit); official anime summaries cross-checked and manga chapters explicitly recorded.
- Evidence IDs added to Attack, Technique, Combat IQ and Versatility without awarding numeric Haki bonuses, inventing pure Speed feats, or double-counting tactical outcomes.
- Evidence directly empty Stat rows **14 → 11**, unset readiness **203 → 196**. Sakazuki **Attack/Defense/Stamina/Technique/Combat IQ/Versatility = E2** and **Speed = E3**. `EvaluationDataVersion='evaluation-0.1.35-evidence-only-draft'`.
- Numeric checks preserve all **39 Evaluations/273 Stat rows**, Sakazuki Final `[97,95,96,86,91,91,91]`, Overall `647/7`, typed Raw total `256`, Balanced v1.2/Weight 0.5 and all other comparison anchors.

## CI and discovered issue
- First run [37869463030](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37869463030) **failed**: shared Evidence stat-role audit detected **103** rows with at least one missing declared stat role against 102 baseline. Caused by new Sakazuki Versatility Evidence referencing an Attack-only note.
- Corrected the schema semantics **instead of relaxing the test**: classified Ace's close-range hit and Jinbe pursuit as `versatility: context`, not an extra direct Raw or Score contribution.
- Verified code after correction at [GitHub Actions run 37869536595](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37869536595): **30 Test Files / 132 Tests passed**, `npm run build` **passed**, PR Pages deployment skipped by workflow design.
- The head after this report has only documentation changes; the latest HEAD CI should be confirmed again before merging.
- Manual Android and full browser interaction were **not** performed. Historical manga panel-by-panel numeric grading of all 273 Stats is **not** claimed.

## Review conclusions
- [Pilot report](docs/HYBRID_HAKI_PILOT_RECALIBRATION_2026-10-09.md) compares six anchor characters and their 14 typed Haki contributions; directly demonstrated exceptional application is **not automatically a proven separate numeric Raw benefit**.
- No official numeric recalibration was performed because Base vs exceptional Raw independently grounded marginal increments are not yet quantifiable at consistent peer anchors.
- Detailed score-invariant shadow migration and all-273-stat ledger from PR #25 remain intact; any proposed numeric changes need a before/after peer-comparison and user approval.

---

# v0.1.35 Draft — Full 39-Evaluation/273-Stat Haki Recalibration Audit (Non-Mutating)

**2026-10-09 (KST)**. Branch `audit/v0.1.35-full-roster-recalibration`, PR #25.

## Change summary
- 273-row [Base/Raw/Final and shadow comparison matrix](docs/HYBRID_RECALIBRATION_273_STAT_AUDIT_2026-10-09.md) across all 39 Evaluation states.
- [Risk-ranked calibration review](docs/HYBRID_RECALIBRATION_DECISION_REPORT_2026-10-09.md), preserving known facts and separating uncertain inference.
- New `src/data/sample/hybridRecalibrationAudit.test.ts` guards no Evidence owner mismatch and no increase from inherited 14 unlinked / 203 unassigned readiness / 102 stat-role-context mismatches, plus Haki duplicate allocations and exact neutral rebasing across 39 Evaluations.
- Official Evaluation numbers, Haki Raw/Weight, Calculation Model, project scope and runtime Matchups **unchanged**. No novel win probabilities.

## CI
- Initial PR code/test commit `1c1892172f80ff7d5d12d52540faf5205c0aa9fb`: [GitHub Actions run 37866967816](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37866967816): **29 Test Files / 129 Tests passed, `npm run build` passed**.
- Later changes are documentation-only; latest head check should still confirm before merging.
- GitHub Actions does not substitute for original manga panel-by-panel adjudication or real-device manual QA.

## Limits
- Structural audit **273/273** performed; this is not a complete 273-panel canon reread and is **not** a re-rated official 39-character leaderboard. Shadow numeric columns are exactly score-invariant.
- Numeric Base/exceptional Raw re-estimation and versioned production dataset migration await explicit evidence-backed candidate table and approval.

---

# v0.1.34 — Approved Hybrid Haki Standard & Nonnumeric Expertise Evidence

**2026-10-09 KST**. Branch: `feature/v0.1.34-hybrid-haki-criteria`.

## Change surface
- `PROJECT_SPEC.md` §5: ratified Hybrid Haki standard with only exceptional, separably demonstrated incremental effects considered for eventual numerical Raw. No usage-count or ownership bonus.
- `HakiProfile.excellenceAssessments?`: backward-compatible optional nonnumeric evidence, direct-application vs strong-inference, inference caveat and era note.
- Mihawk: Ch.779/ONE PIECE.com Ep720 sword-and-Haki coaching evidence and corresponding training context; his Yoru Black Blade supports a **strong inference** of high Armament expertise, NOT confirmed forging process or a numeric Raw bonus.
- Shanks Conqueror's, Katakuri Observation, Garp Armament (inference), Garp **prime** Conqueror's (direct) cautiously documented in profile UI.
- `package.json`, `README.md`, `CHANGELOG.md`, `PROJECT_SPEC.md` align product version v0.1.34. Balanced Calculation Model remains **1.2**, Weight **0.5**, all preexisting Evaluation numerical data unchanged.

## GitHub verification
- PR CI run: https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37810953478
- `npm test`: **28 test files passed / 126 tests passed**.
- `npm run build`: **success**.
- Added cases for optional expertise validation, 4 character profiles with owner-linked Evidence, Mihawk Haki coaching context, no numeric value, and jsdom direct-vs-inferred UI.
- Existing 39 Evaluations / 273 Stat rows, aggregate positive Raw **256**, 15 Matchups and Haki cross-stat audit remained valid.
- Real mobile/device interaction has **not** been manually verified. PR job does **not** deploy Pages. Post-merge main Pages CI requires separate confirmation.

## Next approval gate
- This feature ships the **approved rubric and qualifying nonnumeric evidence**. It does not certify existing typed Raw against the new rubric. Concrete 39 Evaluation score changes, new exceptional Raw magnitudes, a new calculation model version or further PROJECT_SPEC policy modification require side-by-side impact audit and owner sign-off.

---

# v0.1.34 Draft PR #22 — Haki Audit / Matchups / Special Tooltip Verification

**Status: feature branch only; NOT merged into main; NOT deployed in Pages by this PR.**
Baseline main: `7d7971c`; draft PR: https://github.com/pchjesus/onepiece-saikyo-analysis/pull/22

## Work actually implemented
- Read-only Haki allocation audit gate flags 15 same-Evidence cross-stat reuse cases and 2 same-stat multi-Haki-type stacks. Flags are not confirmed score errors or permission to change Raw values.
- Four new Canon/context Matchup analyses: Sakazuki–Kuzan, current Rayleigh–Borsalino, Kaido–Linlin, Jozu–Kuzan. The existing 11 -> 15.
- Special Combat `?` help closes on outside `pointerdown` and Escape; inside click retains popup; Escape returns focus to summary. Tested with jsdom/React act.
- No existing Evaluations, Stats, Raw amounts, Weight, Characters, Memberships, Evidence, Battle records or model configuration changed.

## Actual CI verification (2026-10-09 KST)
- GitHub Actions run https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37805412094 on commit `6a46a4ca3acda8bbf8103faa3f8bd13518377177`.
- `npm test`: **26 test files passed / 121 tests passed**.
- `npm run build`: **passed**.
- Pages steps: **skipped on PR, as expected**.
- Existing character identity, state selection, Haki/Evidence referential validation, Group/Membership selection and matchup builder tests remained in the suite.

## Intermediate failures resolved before successful CI
1. Initial matchup addition broke stale fixed-11 assumption in `getMatchupHub.test.ts`. Updated expected count to 15; no production roster compromise.
2. First light source-text count omitted multiline Haki contributions. The new executable audit established **51 positive Stat rows, 53 individual Haki Contribution records, total Raw 256 and 15 multi-stat reused Evidence cases**. Audit docs and tests were corrected. No model scores changed.

## Manual verification boundary
- Real mobile touchscreen interaction / outside touch, keyboard UX on actual browser, positioning/collision and focus behavior beyond jsdom are **not** independently verified.
- This PR must not be merged without the owner's approval. Any Haki model or calibration change requires separate approval after per-character impacts.

---

# v0.1.33 — Legendary Era Expansion Verification

> v0.1.33 main merge source: PR #21 · merge commit `ac06c3e8e935f0b86b7e916b79579811e0bd7461`. 이 문서 커밋은 main push CI/Pages를 명시적으로 재트리거하기 위한 비기능 변경이다.

## Scope
- 7 new Characters / 9 numeric Evaluations.
- Current Garp / Big Mom / Prime Rayleigh / Current Gaban cross-calibration.
- Canon Battle/Evidence and Haki application links.
- Optional per-stat Evidence readiness.
- Historical Rocks Memberships while preserving Character-unique rankings.
- Historical affiliation label in UI.

## Automated verification
- Initial PR run failed **1 stale test only**: the legacy three-crew fixture required each initial crew to contain exactly 3 Characters.
- That assumption became invalid when Newgate, Kaido and Linlin were added to their representative crews.
- The fixture was changed to preserve the original baseline (>=3) and explicitly verify the three expanded crews now contain 4 Characters.
- Final PR run: **25 test files / 116 tests passed**.
- Production `npm run build`: **passed**.
- Balanced 1.2 / Haki Weight 0.5 regression tests passed.

## Key regression checks
- 37 Character master pool.
- 39 Evaluations.
- 41 Membership rows.
- 36 Character-unique evaluated roster and Ranking rows.
- Roger/Newgate tie at 97.571; Prime Garp remains 97.429.
- Current Garp 94.429 / Big Mom 94.286.
- Current Gaban 92.143, below Kuzan/Akainu and tied with Kizaru by Overall.
- Prime Rayleigh 92.857 with E2 readiness.
- No numeric Prime Gaban Evaluation.
- Demonized Rocks is not a numeric Evaluation.
- Newgate/Kaido/Linlin appear in Rocks Group as historical Memberships but remain single Ranking entries.
- Current Gaban Armament stays unclear; Observation/Conqueror capability and actual Raw Application remain separated.

## Manual visual verification boundary
- Automated UI tests cover readiness badges, historical Membership labels, state switching and ranking counts.
- Real-device pixel/touch verification is still a separate manual check.

---

# v0.1.32 — Multi-Membership / Unique Ranking Verification

## Scope
- Character에 서로 다른 Group Membership을 복수 허용.
- Group navigation은 Membership-expanded 유지.
- Ranking / Matchup roster는 Character-unique projection 사용.
- 미호크·크로커다일의 former Seven Warlords Membership 추가.
- 검색 suggestion은 Character identity 기준 중복 제거.

## Regression targets
- sample Membership 31행이 모두 referentially valid.
- evaluated roster / 모든 Core Stat Ranking / Overall Ranking은 계속 29 unique Character.
- 미호크·크로커다일은 Cross Guild와 Seven Warlords 양쪽 Group에서 탐색 가능.
- Ranking / Matchup에서는 각각 1회만 표시.
- 대표 Group은 두 Character 모두 Cross Guild 유지.
- Buggy E3 master-pool-only 정책 유지.
- Balanced 1.2 / Haki Weight 0.5 / Evaluation score 변경 없음.

## Automated verification
- PR #19 CI: **24 test files / 107 tests passed**.
- `npm run build`: **passed**.
- Membership-expanded 31행과 Character-unique 29명 로스터를 동시에 검증한다.
- 미호크/크로커다일의 다중 Group 노출, 검색 중복 제거, Ranking/Matchup 중복 제거가 자동 테스트에 포함된다.

## Manual verification
- 공개 Pages에서 칠무해 탭에 미호크·크로커다일이 추가 표시되는지 확인.
- 크로스 길드 탭에도 기존 두 Character가 유지되는지 확인.
- 랭킹에서 중복 행이 생기지 않는지 확인.
- 실기기 픽셀/터치 검증은 별도.

---

# v0.1.25 Draft — Overall Ranking / Character Search / Evidence-Haki Audit (2026-10-08)

## Scope & Integrity
- 작업 브랜치: `feature/overall-ranking-evidence-review`. `main` 기준 `6e90eed20de88b3c9590b542415e5e95ddd59d38`의 사후 분기.
- UI: Overall 24인 정렬, 양방향 정렬, 검색 제안 목록, 특수요소 작은 `?` 말풍선.
- 데이터: Battle 12개, Evidence 22건, 24명 Haki 상태/적용, 5명 재평가, 5명 Base/Haki 원인 분리.
- **Calc model:** Balanced 1.2/Weight 0.5/7축 평균/패기 상한 변경 없음.
- `src/data/sample/hakiAudit.test.ts`: 전체 로스터의 Haki Capability 확인 상태, Contribution·Evidence 소유권 및 계산 모델 검증.
- `src/data/sample/reviewEvidence.test.ts`: 신설 Evidence의 고유성·출처·전투 연결, 24인 값·테스트 고정점, Timeline/Trace 추적성.
- 자동화 테스트는 원작 내용의 독립적인 사실 검증을 의미하지 않음. 원작 원문 97건 전수 직접 재독 및 PC·모바일 수동 UI 검수는 미완료.

## CI trail
1. UI commit `cdde88106b225a53970a0a7fac9dc925ff2a1be0` — Actions [#37734056576](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37734056576): 67 tests, production build PASS.
2. Evidence introduction `6305e1f74c4ae851a93fd02ade90febb52886a89` — Actions [#37734584201](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37734584201): **1 test FAIL**. 원인: Battle chronologyOrder 2.5 (must be positive integer).
3. Targeted chronology correction `a836360c9433a7e0bcd38da2b820f4f5d2174b9d` — Actions [#37734651661](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37734651661): PASS.
4. Calibration & Haki audit `f918aaa0d5109749968248997d2a91f3cf624020` — Actions [#37735162184](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37735162184): **18/18 test files, 73/73 tests PASS, `npm run build` PASS**.
5. Last documentation-only commit: final GitHub Actions run to be checked after push.

## Verification boundary & acceptance
- `main` 보호: PR #9 Draft. 未병합. 기존 main commit은 변경하지 않음.
- 24인의 모든 Evidence/Stat 데이터 관계 및 계산을 자동 검증했으나 개별 만화 원문을 97건 모두 재독한 것으로 과장하지 않음.
- 신규 수치는 본 프로젝트 `draft` 점수이며 유저가 다음 단계에서 승인 후 merge.
- 실제 Chrome/Edge, 모바일 화면, 검색/말풍선 위치/스크롤/키보드 포커스는 추가 수동 검수 대상.

---

# Unreleased UI / Navigation Regression — 2026-10-08

## Change scope
- Group/Membership 기반 상세 조회로 24인 roster의 레거시 Crew 참조 불일치 수정.
- 평가 버전 문구를 고정 v0.1.22가 아닌 실제 evaluationDataVersion으로 표시.
- 7개 Final Core Stat 순위 팝업(공동 순위), 캐릭터 이동, 개별 계산식 표시.
- 상단 두 영역 반응형 배치 + 하단 Evaluation/Battle 탭과 내부 스크롤.
- 기존 Evaluation 데이터, 패기 가중치 0.5, Balanced 1.2 및 24인 Overall은 변경하지 않음.

## Regression and automated verification
- Baseline branch SHA: `4cf62c67fd57193fe658ae115b424c6788b9f85b`.
- Implementation commit: `249a0489f827539fd5fefbcc5c4aa49ee6bb6f89`.
- GitHub Actions: [run 37730345673](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/37730345673).
- `npm install`: PASS.
- `npm test`: PASS — 16 test files / 62 tests (기존 54 + 신규 8).
- `npm run build`: PASS — `tsc -b && vite build`.
- Pages configure/upload/deploy: SKIPPED (private 개발 정책 유지).
- 새 테스트: 24인 전체 상세 조회·소속 일치·불일치 방어(3), 7개 스탯 전체 정렬·승인 Final 수치 확인(2), jsdom에서 신규 집단 전환·순위 팝업 캐릭터 이동·계산식 및 상세 탭 전환(3).
- 기존 24인 calibrated Overall 테스트와 Calculation/Haki, Battle, Evidence, Membership 관련 회귀 테스트 통과.

## What this does **not** verify
- 실제 Chrome/Edge/Safari 브라우저 및 휴대폰에서의 수동 화면·조작 검증: **NOT RUN**.
- 반응형 너비별 실제 렌더링, 가로·세로 스크롤, 모달 포커스 이동, 모바일 터치 사용성은 추가 확인 필요.
- jsdom 상호작용 테스트는 실제 브라우저 픽셀 렌더링 검증과 동일하지 않음.

## PR state
- PR #8은 Draft / open 상태로 유지. **main에 merge하지 않음.**
- 점수·Evidence·Evaluation/Calculation 데이터 변경 없음.
- Node 런타임 및 GitHub Actions 의존성의 deprecation warning이 로그에 있으나 이번 run의 테스트와 빌드는 PASS.

---

# v0.1.23 Initial Three-Crew Baseline — Verification Report

## Scope
- 초기 3해적단 9인 평가 로스터 완성.
- Marco / King / Katakuri 7-Core 횡단 재보정.
- Jozu / Vista / Queen / Jack / Smoothie / Cracker 신규 Character / Profile / Battle / Evidence / Evaluation 추가.
- Balanced 1.2와 Haki Weight 0.5는 변경하지 않음.
- crew tabs + compact character chips UI와 Haki stat breakdown UI를 현재 main 기준으로 유지.
- 9인 데이터 무결성 통합 테스트 추가.

## Expected calibrated Overall
- Katakuri: 81.2857142857
- Marco: 81.1428571429
- King: 80.7142857143
- Vista: 79.1428571429
- Queen: 78.7142857143
- Jozu: 77.2857142857
- Smoothie: 76.7142857143
- Jack: 74.4285714286
- Cracker: 71.8571428571

소수점 근소 차이는 절대적 서열 확정으로 해석하지 않는다. 직책·현상금·커뮤니티 평가는 공식 Core Stat에 자동 가산하지 않는다.

## Regression targets
- 각 Evaluation은 정확히 7 Core Stat을 가져야 함.
- Haki Contribution Evidence는 존재하고 같은 캐릭터 소유이며 해당 Stat evidenceIds에도 연결되어야 함.
- Special Trait Evidence는 존재하고 같은 캐릭터 소유여야 함.
- 모든 Evidence는 존재하는 Character와 Battle에 연결되어야 함.
- 초기 3개 Crew에 정확히 3명씩 배치되어야 함.
- Balanced 1.2의 7-stat mean / Haki Weight 0.5 / Final cap 동작은 유지되어야 함.
- 기존 Marco / King / Katakuri Battle / Evidence / Evaluation Trace 회귀가 없어야 함.

## Automated verification
### Initial main integration
- GitHub Actions run `37684997352`, commit `8d67bf6c`.
- `npm test`: FAIL — 12 test files 중 9 passed / 3 failed, 47 tests 중 40 passed / 7 failed.
- 실패는 Battle / Evidence 배열 확장 경계에서 기존 trailing comma 뒤에 쉼표가 한 번 더 들어가 `},,` 배열 hole이 생성된 것이 공통 원인.
- 그 결과 `sampleBattles` / `sampleEvidence` 순회 중 `undefined`가 발생해 Battle validation, Character profile validation, 신규 data integrity test가 연쇄 실패.
- 계산모델·점수 산식·Haki 로직 실패는 확인되지 않음.

### Fix and final run
- Battle array hole fix: `4ff87d07`.
- Evidence array hole fix: `e6f6aa9c`.
- GitHub Actions run `37685110697`.
- `npm test`: PASS — 12 test files / 47 tests.
- `npm run build`: PASS.
- Pages deploy: SKIPPED — private development 정책대로 main push는 validation only.
- Browser/mobile visual verification: NOT RUN.

## Manual Verification Required
1. 모바일/PC에서 crew tabs + character chips 동작 확인.
2. 각 crew 탭에 3명씩 표시되는지 확인.
3. Haki 반영 스탯에서 Final 점수 아래 Base + Haki가 표시되는지 확인.
4. Jozu / Vista / Queen / Jack / Smoothie / Cracker 상세 페이지의 Profile / Battle / Evidence / Evaluation Trace 확인.
5. 긴 rationale와 Evidence 카드가 모바일에서 overflow 없이 표시되는지 확인.

## Known Issues / Uncertainty
- 모든 평가는 draft.
- Vista의 Stamina, Smoothie의 Defense/Stamina/Speed 등은 직접 전투 표본이 적어 불확실성이 상대적으로 큼.
- Jack Haki는 보조자료 표기 충돌 가능성을 고려해 현재 Profile에서 unclear로 유지하고 수치 가산하지 않음.
- 이미지 기반 캐릭터 선택과 검색 기능은 로스터 확장 시 후속 검토.

---

# v0.1.22 Seven Core Stats & Special Combat Profile — Verification Report

## Scope
- 숫자형 Special Ability를 Core Stat에서 제거.
- 7 Core Stat 기반 Balanced 1.2 도입.
- Haki Weight 0.5 및 실제 Application Evidence 기반 Contribution 유지.
- 비수치 Special Combat Profile과 다중 Special Trait 구조 추가.
- Special Trait Evidence 참조 무결성 검증 추가.
- Marco / King / Katakuri 기존 Special 관련 Canon Evidence 보존 및 Evaluation 0.1.22 마이그레이션.
- Character Detail에서 Core Stat과 Special Combat Profile을 분리 표시.

## Expected mechanical Overall after model migration
- Marco: 80.5714285714
- King: 80.2857142857
- Katakuri: 81.7142857143

이 값은 기존 7 Core Stat 값을 그대로 사용한 구조 전환 직후의 기계적 재계산이며, 캐릭터별 전면 재평가 완료값이 아니다.

## Regression targets
- Evaluation은 정확히 7 Core Stat을 가져야 함.
- Special Combat Profile은 Overall에 직접 합산되지 않아야 함.
- Special Trait Evidence는 존재하며 해당 캐릭터 소유여야 함.
- Haki Raw Contribution / Weight 0.5 / Effective Contribution / Final Stat 계산은 유지되어야 함.
- 기존 Battle / Evidence / Evaluation Trace 연결은 유지되어야 함.
- Marco / King / Katakuri의 Special 관련 Canon Evidence 자체는 삭제되지 않아야 함.
- main push에서는 Pages configure/deploy가 실행되지 않아야 함.

## Automated verification

### First main run
- GitHub Actions run #7, commit `afa5078e`.
- `npm install`: PASS.
- `npm test`: FAIL — 11 test files 중 10 passed / 1 failed, 43 tests 중 42 passed / 1 failed.
- Failure: `statDefinitions.test.ts`가 Versatility 정의에 남은 과거 `Special Ability` 문구를 탐지.
- Root cause: 모델/계산 실패가 아니라 Stat Definition 문자열 한 곳의 stale migration.
- `npm run build`: test failure로 SKIPPED.

### Fix and final run
- Fix commit: `268ea74f` — stale `Special Ability` reference를 `Special Combat Profile` 기준으로 수정.
- GitHub Actions run #8.
- `npm install`: PASS.
- `npm test`: PASS — 11 test files / 43 tests.
- `npm run build`: PASS.
- `actions/configure-pages`: SKIPPED.
- Pages artifact upload / deploy: SKIPPED.
- Browser/mobile visual verification: NOT RUN.

## Verification conclusion
v0.1.22의 7 Core Stat 구조, Balanced 1.2 계산, Haki 가중치 회귀, Special Combat Profile 데이터 및 Evidence ownership validation, 기존 Battle/Evidence/Application 연결과 production build가 자동 검증을 통과했다. Special은 더 이상 숫자형 Core Stat이 아니며, 비능력자에게 Special 부재를 이유로 수치 감점을 부여하지 않는다.

## Manual Verification Required
1. 브라우저에서 Marco / King / Katakuri 상세 페이지 확인.
2. Core Combat Stats가 7개만 표시되는지 확인.
3. Special Combat Profile이 별도 카드로 표시되고 Overall 직접 가산 없음 문구가 보이는지 확인.
4. Haki Base / Raw / Weight / Effective / Final 표시 회귀 확인.
5. 모바일에서 Combat Profile / Special Trait / Stat 레이아웃 확인.

## Next Steps
- 기존 및 논의 중인 Marco / King / Katakuri / Queen / Jack / Cracker / Jozu / Vista를 7 Core Stat 기준으로 전체 재산정.
- 재산정 과정에서 Marco·King·Queen 등 기존 Special 점수에 포함되던 효과가 각 Core Stat에 충분히 반영됐는지 횡단 검토.
- 전체 calibration 완료 후 신규 캐릭터 분석·추가 재개.

---

# v0.1.21 Final Calibration Refinement — Verification Note

## Scope
- Marco Marineford/Wano Evidence coverage 보강.
- Marco Armament actual-application Evidence 및 Raw +2 후보 반영.
- Marco / King / Katakuri final calibration 재조정.
- Multi-stat Evidence 중복 억제 원칙 명문화.
- Private development 단계에서 Pages 자동 배포를 중단하고 push 시 test/build만 수행하도록 workflow 조정.

## Expected calibrated Overall
- Marco: 81.125
- King: 80.75
- Katakuri: 81.50

## Regression targets
- 8-stat 구조 유지.
- Haki Weight 0.5 유지.
- Overall = 8 Final Stat 산술평균 유지.
- Existing Evidence ID reference integrity 유지.
- Marco timeline에 긍정 Evidence와 Garp/Seastone 한계 Context가 함께 표시.
- Katakuri Future Sight는 Speed Haki Contribution으로 추가하지 않음.
- King Flame ON / OFF conditional peak 원칙 유지.
- Character Detail / Evaluation Trace / Battle Timeline 기존 연결 유지.
- main push에서는 Pages configure/deploy가 실행되지 않고 test/build까지만 성공해야 함.

## Automated verification
- Initial final-calibration run: 39 / 40 tests passed; 1 stale `getBattleDetail` fixture failed after the new Chapter 1022 Evidence increased the linked record count from 2 to 3.
- Root cause: test expectation lagged behind intentional Evidence data expansion; Application logic was not the failure source.
- Fixture updated and re-run through GitHub Actions.
- Final result: 10 test files / 40 tests PASS.
- `npm run build`: PASS.
- `actions/configure-pages`: SKIPPED on main push as intended.
- Pages artifact upload / deploy: SKIPPED as intended.
- Browser/mobile visual verification: PENDING.

## Verification conclusion
v0.1.21 final calibration data, Haki reference integrity exercised by the current test suite, Battle/Evidence integration, Overall calculation, and production build all pass the automated GitHub workflow. Pages remains intentionally inactive during private development.

---

# v0.1.21 Test Report

## Scope
Combat Power Scale Calibration, weighted Haki calculation, 3-character re-evaluation, stale fixture repair, documentation/status synchronization.

## Pre-patch baseline confirmed from GitHub Actions run #1
- `npm install`: PASS.
- `npm test`: FAIL — 28 passed / 7 failed across 35 tests.
- Failure source: v0.1.20 Battle / Evidence / Evaluation data had advanced beyond several application test expectations.
- `npm run build`: SKIPPED.
- Pages deploy: SKIPPED.

## v0.1.21 verification targets
- Raw +6 × 0.5 = Effective +3.
- Final = Base + Effective Haki, capped at 100.
- Haki 0 keeps Base = Final.
- Multiple Raw contributions sum before Weight.
- Same Haki Weight applies to all characters.
- Haki Evidence reference validation remains intact.
- Overall is the arithmetic mean of eight Final Stats.
- Current Battle / Evidence / Evaluation Trace links match the data.
- Pages workflow remains install → test → build → deploy.

## Automated verification after main merge
- GitHub Actions run #2, commit `065eac5`.
- `npm install`: PASS.
- `npm test`: PASS — 10 test files / 39 tests.
- `npm run build`: PASS — TypeScript build and Vite production build completed.
- `actions/configure-pages@v5`: FAIL because the repository does not yet have a Pages site enabled/configured for GitHub Actions.
- Artifact upload / Pages deploy: SKIPPED after the configure-pages failure.
- Browser/visual verification: NOT RUN.

## Verification interpretation
The v0.1.21 application code, calculation tests, current Battle/Evidence fixtures, and production build passed in GitHub Actions. Actual GitHub Pages deployment is not verified; repository-level Pages enablement is still required.

## Manual verification required
1. `npm.cmd install`
2. `npm.cmd test`
3. `npm.cmd run build`
4. `npm.cmd run dev`
5. Marco / King / Katakuri detail pages.
6. Base / Raw / Weight / Effective / Final display.
7. Battle Timeline and Evidence accordion.
8. Mobile layout of Haki breakdown.

---

# v0.1.20 Test Report

## Scope
Haki Application/Contribution, Katakuri Canon Evidence, 3-character re-evaluation, GitHub Pages deployment.

## Required local verification
```powershell
npm.cmd install
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

## Manual verification required
- Marco / King / Katakuri 카드와 상세 페이지 정상 표시
- Evaluation Trace의 Base / Haki / Final 값 표시
- Katakuri Battle Timeline 및 Evidence 역할 표시
- GitHub Pages Settings에서 Source = GitHub Actions 선택 후 실제 배포 URL 확인

---

# v0.1.19 Verification Report

## Scope
- 등록 캐릭터 3명의 Canon Combat Profile 및 Haki Profile 추가.
- 패휘감을 독립 Haki 타입이 아닌 패왕색 하위 infusion 상태로 모델 수정.
- Evidence role UI를 한국어 의미 라벨로 개선.

## Confirmed by static/data review
- Haki 최상위 타입은 armament / observation / conquerors 3개만 존재함.
- 패휘감은 conquerors capability의 `infusion` 하위 상태로만 표현됨.
- Marco / King / Katakuri 모두 Character Domain 데이터에 Combat Profile을 보유함.
- Combat Profile 자체는 Evaluation score를 변경하지 않음.
- `unclear`는 비보유로 표현되지 않음.
- Evidence role의 내부 모델(primary / secondary / context)은 유지하면서 UI 라벨만 개선함.

## Verification status
- Source/data/static review: PASS.
- Domain/Data/Application non-test TypeScript static check: PASS.
- 전체 `tsc --noEmit -p tsconfig.app.json`: dependencies가 설치되지 않아 React/Vitest module resolution 단계에서 실행 완료 불가.
- `npm install --no-audit --no-fund`: AI 환경 45초 제한으로 TIMEOUT.
- Automated Vitest: NOT RUN (dependencies unavailable).
- Vite build: NOT RUN (dependencies unavailable).
- Browser/UI verification: NOT RUN.

## Manual verification required
1. `npm.cmd install` (필요한 경우)
2. `npm.cmd test`
3. `npm.cmd run build`
4. `npm.cmd run dev`
5. 세 캐릭터 전환 시 Combat Profile 레이아웃과 모바일 레이아웃 확인.
6. 패기 항목이 무장색 / 견문색 / 패왕색 3개로 표시되는지 확인.
7. Katakuri 패왕색은 확인, 패휘감은 미확인 정보로 표시되는지 확인.
8. Evidence role 태그가 주요 근거 / 보조 근거 / 상황 참고로 표시되는지 확인.

## Deferred intentionally
- 실제 Haki Contribution 적용.
- Katakuri Canon Evidence 정식 구축 및 prototype Evaluation 교체.
- Marco / King / Katakuri 전면 스탯 재평가.

---

# v0.1.18 Verification Report

## Scope
- Haki를 독립 0~100 스탯이 아닌 실제 전투 활용 기반의 Stat Contribution 계층으로 추가.
- Evidence의 스탯 관계를 primary / secondary / context로 구조화.
- Marco / King Technique / Mastery 중복 평가를 현재 Evidence 범위에서 재검토.

## Confirmed by static verification
- 8개 최상위 스탯은 그대로 유지됨.
- Final Stat = min(100, Base Stat + Haki Contribution) 규칙이 Domain helper에 존재함.
- 스탯별 Haki Contribution 총합은 validation에서 +10을 초과할 수 없음.
- 양의 Haki Contribution은 Evidence ID를 요구함.
- Haki capability 보유 여부만으로 자동 가산하는 로직은 없음.
- Evidence `statContributions`는 CombatStat 타입과 primary / secondary / context 역할을 사용함.
- Marco Ch.1006 재생 Evidence는 Technique에 context로만 남아 Technique 점수 Evidence에서 제거됨.

## Verification status
- Domain/Data/Application non-test TypeScript static type check: PASS (`tsc`, React/Vitest 의존 파일 제외).
- `npm install`: TIMEOUT at 120 seconds in AI environment.
- Automated Vitest: NOT RUN because local dependencies were unavailable.
- Vite build: NOT RUN because local dependencies were unavailable.
- Browser/UI verification: NOT RUN.

## Manual verification required
1. `npm.cmd install`
2. `npm.cmd test`
3. `npm.cmd run build`
4. `npm.cmd run dev`
5. Marco Technique / Mastery = 78, King Technique / Mastery = 86인지 확인.
6. Evidence 카드에 `Stat · primary/secondary/context` 태그가 표시되는지 확인.
7. Evaluation Trace에 `Base N · Haki +N`이 표시되는지 확인.
8. Marco/King Overall이 새 draft 점수와 일치하고 Battle Timeline이 기존처럼 동작하는지 확인.

## Deferred intentionally
- Katakuri 실제 점수화: 프로젝트 내부에 검증된 Canon Evidence가 없어 보류.
- Zoro 실제 데이터 추가: synthetic Haki 구조 테스트만 수행.
- 실제 Haki 가산점 부여: 해당 캐릭터의 Haki Application Evidence를 먼저 추가해야 함.

---

# v0.1.17 Verification Report

## Scope
- Defense 정의에 남아 있던 제거된 Durability 명칭을 제거함.
- Battle Evidence 화면에 전투 구조, 목적, 의도, 환경, 제한 조건, 외부 요인, 결과를 함께 표시하도록 수정함.

## Design verification
- Defense는 회피·방어·차단·피해 감소 및 조건부 방어를 평가하며 Durability라는 별도 축을 사용하지 않음.
- Recovery는 최상위 스탯으로 사용하지 않으며, 회복·재생 근거는 Evidence와 관련 능력/지속 효과의 해석으로 보존함.
- Battle Context는 Canon Fact와 별개로 전투 당시의 조건을 설명하고, Evidence 해석에 필요한 맥락을 제공함.

## Verification status
- Static code/data review: completed.
- Automated npm test: not executed in AI environment.
- Build: not executed in AI environment.
- Browser/UI: pending user verification.

## Manual verification required
- King → 전투 기록 → 킹과 조로의 대결에서 전투 의도 및 기타 Battle Context가 표시되는지 확인.
- Stat Info → Defense에서 제거된 Durability 명칭이 더 이상 표시되지 않는지 확인.

## Next
- 패기 및 Technique / Mastery 독립성 검증 후 Marco / King / Katakuri 전면 재평가.

---

# v0.1.16 Verification Report

## Scope
- Recovery를 제거하고 Technique / Mastery를 8번째 스탯으로 도입.
- Recovery 관련 Evidence를 Special Ability / Stamina 중심으로 재분류하고 Defense 자동 합산을 배제.
- Defense 설명의 Durability 잔여 표현 제거.
- Marco / King draft 점수와 관련 테스트 fixture 갱신.

## Design verification
- Defense: 공격을 회피·방어·차단하거나 피해를 줄이는 능력. 회복·재생은 자동 포함하지 않음.
- Stamina: 피로와 체력 소모가 누적되는 상황에서 전투를 지속하는 능력.
- Special Ability: 악마의 열매에 한정하지 않는 고유 전투 능력.
- Technique / Mastery: 보유 능력이나 전투 수단 자체의 존재와 분리하여 실제 운용 숙련도·정밀성·완성도를 평가.
- Combat IQ: 상황에 맞는 판단과 선택.
- Versatility: 서로 다른 상황에서 전투 수단을 전환·적용하는 폭.

## Recovery evidence disposition
- Marco Ch.554: Recovery stat 제거 후 `specialAbility` + `speed`. 재생 사실은 고유 능력 정보로 보존.
- Marco Ch.998: `specialAbility` + `versatility`. 타인의 상태 회복·억제라는 특수 활용은 고유 능력과 적용 폭의 근거로 보존.
- Marco Ch.1006: `specialAbility` + `stamina` + `techniqueMastery`. 날개 재생은 고유 능력, 전투 지속은 Stamina, 능력 운용은 Technique / Mastery의 보조 근거.
- 어떤 Recovery Evidence도 Defense에 자동 연결하지 않음.

## Draft score changes
- Marco: Technique / Mastery 86, Special Ability 91, Versatility 89.
- King: Technique / Mastery 93, Attack 90, Defense 94, Special Ability 92, Combat IQ 84, Versatility 85.
- 두 캐릭터 모두 `draft`; 전체 작중행적 재검토 전의 중간값.

## Verification status
- Static/structural review: completed.
- Automated npm test: not executed in AI environment.
- Build: not executed in AI environment.
- Browser/UI: not performed.
- User local verification required.

## Known issues
- Technique / Mastery의 독립성은 Katakuri 및 비능력자 강자 적용으로 추가 검증 필요.
- Recovery 능력의 독립 수치 제거가 정보 손실을 만드는지 장기적으로 확인 필요.

---

# v0.1.15 Verification Note

## Scope
- v0.1.13~v0.1.14에서 변경된 전투력 모델을 정리하고 v0.1.15 평가 원칙을 문서화함.
- v0.1.14 사용자 테스트에서 발견된 `getCharacterEvaluationTrace.test.ts` 2건의 기대값 불일치를 수정함.

## Root Cause
1. Marco Recovery가 v0.1.14에서 Chapter 554 / 1006 / 998의 3개 Evidence를 참조하도록 변경되었으나 테스트는 2개를 기대하고 있었음.
2. King Recovery rationale 문구가 개선되었으나 테스트가 이전 문자열을 기대하고 있었음.

## Fix
- Marco Recovery의 Evidence count 및 ID 기대값을 3개로 갱신.
- King Recovery rationale 기대 문자열을 현재 문구에 맞게 갱신.
- Application / Domain 로직 자체는 변경하지 않음.

## Model Review Status
- 8개 스탯 구조: 유지
- Durability: 제거 유지
- Defense: 조건부 방어를 포함하는 종합 방어 축으로 유지
- Versatility: 절대평가 및 실제 적용 범위 중심으로 유지
- Recovery: 유지하되 독립적인 평가축으로 충분한지 후속 검토
- Growth Potential: 미구현, 향후 별도 모델 후보
- Marco / King scores: 현재 draft 유지, 전체 작중행적 및 Evidence 재검토 전 확정하지 않음

## Automated Verification
- AI 환경에서 이번 수정 후 `npm test`는 아직 실행하지 않음.
- 사용자 환경에서 `npm.cmd test` 및 `npm.cmd run build` 실행 필요.

## Verification Status
- Static code/data review: completed
- Test expectation fix: completed
- Automated runtime test: pending user environment
- Browser/UI verification: pending user environment
- Full Evidence-based score re-evaluation: not yet completed

# v0.1.14 Verification Note

## Scope
- Combat stat model changed from Attack / Defense / Durability / Stamina / Speed / Recovery / Special Ability / Combat IQ to Attack / Defense / Stamina / Speed / Recovery / Special Ability / Combat IQ / Versatility.
- Marco and King draft evaluations were rechecked against the currently stored Evidence.

## Static Review
- `COMBAT_STATS`, stat definitions, sample evaluations, Evidence supportedStats, and validation fixtures were updated consistently.
- Calculation code continues to use `COMBAT_STATS.length`, so it does not hard-code the removed stat name.

## Automated Test Status
- Not executed in the AI environment for this patch.
- User environment verification required: `npm.cmd test`, `npm.cmd run build`.

## Manual Verification Required
- Verify the new 8-stat UI, stat information dialog, Evidence labels, timeline, evaluation trace, and overall score in the browser.

---

# v0.1.12 Verification Report

## Scope
- v0.1.11에서 사용자 로컬 `npm.cmd test` 실행으로 발견된 2건의 회귀 테스트 실패 수정.
- King Evidence가 추가된 Battle Detail과 King Recovery rationale의 현재 데이터에 맞게 테스트 기대값을 갱신.

## Root Cause
1. `getBattleDetail.test.ts`가 King Evidence 추가 전의 Evidence 1건을 기대하고 있었음. 현재 해당 Battle에는 Marco와 King의 Evidence가 각각 1건씩 연결되어 총 2건이 반환됨.
2. `getCharacterEvaluationTrace.test.ts`가 이전 rationale 표현인 `근거가 부족`을 기대하고 있었으나 현재 rationale은 `직접적으로 확인할 자료가 부족하다`로 작성되어 있음.

## Change Scope
- 테스트 코드 2개만 수정함.
- Domain model, Application logic, Repository logic, Evidence data, Evaluation data는 변경하지 않음.

## Automated Verification
- `npm.cmd test`: 수정된 테스트 기준 9개 test files / 29개 tests가 실행 대상. 실제 재실행은 사용자 환경에서 필요함.
- `npm.cmd run build`: 실제 재실행은 사용자 환경에서 필요함.

## Verification Status
- Static review: completed.
- Local automated test: not executed in AI environment; npm install did not complete within the available execution window.
- Local build: not executed in AI environment for the same environment limitation.
- Browser/UI verification: not performed in the AI environment; user manual verification remains required.

## Known Issues
- King Recovery는 직접적인 근거가 부족하여 임시값이며 King 평가 전체는 `draft`.
- v0.1.11에서 발견된 두 실패는 테스트 기대값 불일치로 확인되었으며 애플리케이션 로직의 결함으로 확인되지는 않음.

# v0.1.11 Verification Report

## Scope
- King을 두 번째 실제 분석 사례로 추가.
- Battle Context → Evidence → Evaluation Trace 연결 확인.

## Structural Verification
- King Evaluation: 8개 스탯 모두 존재.
- King Evidence: 3건 모두 `subjectCharacterId: king`.
- King Evaluation의 evidenceIds는 존재하는 King Evidence만 참조.
- King-Zoro Battle은 Zoro Character가 없으므로 participantIds를 비워 참조 무결성을 유지함.
- Marco 기존 평가와 Evidence 데이터는 변경하지 않음.

## Canon Review
- Chapter 1006: King이 Marco의 날개를 절단한 장면을 다대일 전투 맥락으로 기록.
- Chapter 1032: King의 높은 방어·내구 특성을 기록.
- Chapter 1035: 불꽃 상태에 따른 방어/속도 변화, 화염 공격, Zoro와의 최종전 및 패배를 기록.
- 외부 검색 자료는 근거 탐색에만 사용했고, 커뮤니티 의견은 공식 평가 근거로 사용하지 않음.

## Verification Status
- Implemented: yes
- Automatically tested: not executed in AI environment
- Integration tested: not executed in AI environment
- Actually executed: not executed in AI environment
- User browser verification: required
- Regression tested: structural review only

## Known Issues
- King Recovery는 직접적인 근거가 부족하여 임시값.
- King 평가 전체는 draft.
- Zoro Character 데이터는 아직 추가하지 않음.

# Test Report

## v0.1.32 Verification Report

### Scope
- Character ↔ Group multi-Membership support.
- Membership-expanded Group navigation.
- Character-unique Ranking / Matchup roster.
- Search suggestion deduplication.
- Former Seven Warlords Memberships for 쥬라큘 미호크 / 크로커다일.

### Structural checks
- Navigation rows: 31 Membership entries.
- Unique evaluated roster: 29 Characters.
- Ranking: 29 unique Character IDs.
- Matchup selector: 29 unique Character IDs.
- Representative Group for 미호크 / 크로커다일 remains 크로스 길드.
- Both Characters also resolve correctly inside 왕의 부하 칠무해 context.
- Exact duplicate Membership validation remains enabled.

### Automated verification
- PR #19 intermediate passing head: **24 test files / 107 tests passed**.
- `npm run build`: **passed**.
- Initial CI found two stale single-Membership assumptions:
  1. a Character detail test expected the Membership-expanded list itself to remain 29 rows;
  2. the first unique-roster implementation changed one pre-existing navigation order because it followed Character source order instead of Membership first-occurrence order.
- Fix: tests now distinguish expanded vs unique views, and the representative roster preserves existing Membership navigation order.
- No Evaluation score, Balanced 1.2 or Haki Weight change.

### Manual browser checks
- 왕의 부하 칠무해 tab shows 트라팔가 로 / 돈키호테 도플라밍고 / 보아 핸콕 plus former members 쥬라큘 미호크 / 크로커다일.
- 크로스 길드 tab still shows 쥬라큘 미호크 / 크로커다일 only.
- Searching 쥬라큘 미호크 by name yields one suggestion using 크로스 길드 as representative Group.
- Ranking shows each Character once.


## v0.1.31 Verification Plan / Result

### Scope
- Doflamingo official epithet order: 천야차 → 조커.
- Two-character Matchup Builder with left/right independent selection.
- Multi-Evaluation state selection.
- SWAP / RANDOM / FEATURED controls.
- Per-corner perspective panels and combined Radar / Tale of the Tape / Evidence factors.
- Arbitrary pair support without fabricated matchup conclusions.

### Required checks
- Evaluated roster remains 29 selectable Characters.
- Same Character cannot be selected on both sides from the UI and application guard rejects self-matchup.
- Current Garp vs Kuzan uses current Garp only; Prime Garp does not inherit the current-only pair Evidence.
- Reversing left/right correctly flips character-a / character-b factor perspective.
- Arbitrary unregistered pairs show Core Stat comparison but no pair-specific conclusion.
- Existing 11 featured Matchup prototypes remain intact.
- Stats remains the default app home.
- Balanced 1.2 / Haki Weight 0.5 / no win-probability policy remain unchanged.

### Automated verification
- PR #15 CI: **24 test files / 103 tests passed**.
- `npm run build`: **passed**.
- Initial CI failure came from an over-specific test assumption that Mihawk vs Shanks must include a favorable/risk factor; the pair is intentionally neutral/unknown-heavy. The perspective inversion test was moved to the confirmed Crocodile vs Jozu damage factor, then the full suite passed.

### Manual visual checks
- Left/right selectors remain readable on narrow phones.
- SWAP/RANDOM controls are reachable without horizontal overflow.
- Corner panels collapse cleanly to one column on mobile.
- Combined Radar labels and Tale of the Tape remain legible.


## v0.1.30 Verification Plan / Result

### Scope
- Prime/current Garp recalibration.
- Kuzan defense/endurance recalibration with post-Blue-Hole return Evidence.
- Crocodile direct-combat down-calibration.
- Stats-first top-level navigation and separate Matchup Arena.
- Radar chart / Tale of the Tape / Evidence-aware factor presentation.

### Required regression checks
- 29 evaluated characters / 30 Evaluation records remain referentially valid.
- Default ranking still uses Prime Garp once; current Garp remains state-selectable only.
- Current Garp vs Kuzan Matchup uses current Garp evaluation in the Arena.
- Character Detail contains only Evaluation / Battle-Evidence tabs.
- App opens on Stats by default; Matchup Arena is reached through the top-level VS control.
- Radar values are derived from Evaluation + Balanced 1.2 rather than hardcoded UI scores.
- Community discussion UI is not rendered yet.
- Balanced 1.2 / Haki Weight 0.5 / Special non-numeric policy remain unchanged.

### Automated verification
- PR #14 CI: **24 test files / 99 tests passed**.
- `npm run build`: **passed** (Vite production build completed).
- First CI attempt failed on a duplicated closing bracket introduced while replacing the final Evaluation block; the syntax error was isolated, fixed, and the complete suite then passed.
- Matchup Arena application test confirms 11 matchup entries and state-aware current Garp vs Kuzan scoring.

### Manual visual checks
- Desktop and mobile spacing of the top-level Stats / Matchup navigation.
- Radar labels do not clip at common phone widths.
- Fighter cards and Tale of the Tape remain readable for long Korean names.
- Matchup picker horizontal scrolling remains usable on mobile.


## v0.1.29 Verification Report

### Scope
- Cross Guild: 쥬라큘 미호크 / 크로커다일 평가 추가, 버기 E3 Character-only.
- Prime Garp Ch.1165 Haki Application 재보정.
- Evidence-aware Matchup을 Character Detail UI에 노출하고 총 11 prototype으로 확대.

### Structural expectations
- 30 Character master pool / 29 evaluated roster / 30 Evaluation.
- Ranking은 Membership + default Evaluation 기준으로 29명만 포함.
- 버기는 Membership / Evaluation 없음.
- Matchup은 승률·고정 수치 없음.
- Garp current-vs-Kuzan matchup은 current state에서만 표시.

### Automated verification
- PR #13 GitHub Actions: **23 test files / 97 tests passed**.
- `npm run build`: **passed** (Vite production build completed).
- 첫 CI 실패는 27→29 로스터 확장 후 남아 있던 테스트 기대값 3곳의 불일치였고, 해당 fixture/index를 수정한 뒤 전체 CI가 통과했다.

### Manual verification required
- 크로스 길드 탭에서 쥬라큘 미호크 / 크로커다일 전환.
- 세 번째 '매치업 분석' 탭의 모바일/PC 가독성.
- 가프 전성기에서는 현재-쿠잔 매치업이 숨고, 현재 선택 시 표시되는지 확인.
- 버기가 evaluated roster 검색/순위에 노출되지 않는지 확인.


## v0.1.10

### Structural verification
- Marco Attack and Defense no longer reference Evidence that does not directly support those stats.
- Marco Recovery, Stamina, Speed, Special Ability, Combat IQ, and Durability retain their existing Evidence links.
- Added optional validation that checks linked Evidence IDs and evaluated-character ownership.
- Marco remains a `draft` evaluation.

### Automated verification
- Added tests for valid Evidence references, unknown Evidence IDs, and Evidence belonging to another character.
- Full npm test/build execution was not available in the AI environment because `node_modules` is absent.

### Manual verification required
1. Run `npm.cmd test`.
2. Run `npm.cmd run build`.
3. Open Marco and confirm Attack/Defense remain draft scores without linked Evidence.
4. Confirm Recovery still resolves Chapter 1006 and Chapter 998 Evidence.
5. Confirm the existing Battle timeline and other Evaluation Trace entries remain unchanged.

### Verification status
- Implemented: yes
- Automatically tested: test execution not available in AI environment
- Static/structural review: completed
- User runtime verification: pending
- Browser/UI verification: pending
- Regression verification: structural only; local runtime regression pending

### Known issues / limitations
- Attack and Defense need additional direct Canon Evidence before official promotion.
- Evidence-reference validation is currently an explicit utility and is not automatically enforced during repository loading.

# Test Report

## v0.1.9

### Structural verification
- Existing Battle and Participant types were preserved without adding new context fields.
- Added `validateBattle()` at the Domain layer.
- Current sample Battles with no participant records remain valid when the participant list is also empty.
- The King/Queen Battle's three participant IDs and three participant records are structurally consistent.
- External characters mentioned in Battle descriptions were not converted into Character records.

### Automated verification
- Added validation tests for current sample data and three reference-integrity failure cases.
- Full npm test/build execution was not available in the AI environment because `node_modules` is absent.

### Manual verification required
1. Run `npm.cmd test`.
2. Run `npm.cmd run build`.
3. Open Marco and confirm the Battle timeline still renders in chronology order.
4. Expand the King/Queen Battle and confirm the existing context and Evidence remain unchanged.

### Verification status
- Implemented: yes
- Automatically tested: test execution not available in AI environment
- Static/structural review: completed
- User runtime verification: pending
- Browser/UI verification: pending
- Regression verification: structural only; local runtime regression pending

### Known issues / limitations
- `validateBattle()` is not yet wired into repository loading, so it currently provides explicit validation rather than an automatic runtime guard.
- Three Marco Battles still have empty participant lists by design because the current Character dataset does not contain all external combatants.

# Test Report

## v0.1.7

### Structural verification
- `Evidence.fact` is present in all five current Marco Evidence records.
- Evidence UI renders Fact separately from Interpretation.
- Repository and Application Evidence flows do not require changes because they pass through the Evidence object without reconstructing its fields.
- Marco evaluation remains `draft`; the evaluation data version is `evaluation-0.1.7`.
- Marco’s eight current draft scores are 78 / 79 / 78 / 84 / 86 / 93 / 92 / 84, with an arithmetic mean of 84.25.

### Automated verification
- Test/build execution was not available in the AI environment because `node_modules` is absent.
- Existing test sources were checked for score/version assertions; the only Marco score assertion found is Recovery = 90 in the v0.1.5-era test and should be updated to the new Recovery = 93 before local test execution.

### Manual verification required
1. Run `npm.cmd test`.
2. Run `npm.cmd run build`.
3. Open the Marco detail page and confirm Fact / Interpretation are displayed separately.
4. Confirm the eight draft scores and current Overall Combat Power display.
5. Confirm Battle timeline and Evaluation Trace remain unchanged in behavior.
6. Confirm King and Katakuri prototype evaluations remain unaffected.

### Verification status
- Implemented: yes
- Automatically tested: not executed in AI environment
- Integration tested: not executed in AI environment
- Actually executed: not executed in AI environment
- Visually/manual verified: pending user verification
- Regression tested: structural review only; local runtime regression pending

# Test Report

## v0.1.5

### Structural verification
- `Evaluation.status` is represented in the domain model rather than UI-only state.
- Marco Recovery is connected to two Canon Evidence records through `evidenceIds`.
- Evaluation Trace continues to resolve evidence in the Application layer.
- The calculation layer remains independent from UI and accepts the same eight-stat Evaluation shape.

### Automated verification
- Updated Evaluation Trace test to expect the two Recovery evidence records.
- Added assertion that Marco Recovery is 90.
- Adjusted calculation fixture so the arithmetic-mean test remains deterministic at 50.
- Updated Battle Evidence test expectations from 4 → 5 Marco Evidence records after adding the Chapter 998 Ice Oni record.
- Updated Battle Timeline test expectations from 3 → 4 chronological Marco Battle records after adding the Chapter 998 Ice Oni Battle.
- The user's v0.1.5 test failure was reproduced from the reported output as a stale test expectation; the application change itself was intentional.
- Full npm test/build execution was not available in the AI environment.

### Manual verification required
1. Run `npm.cmd install`.
2. Run `npm.cmd test`.
3. Run `npm.cmd run build`.
4. Run `npm.cmd run dev`.
5. Select Marco and verify Recovery = 90.
6. Verify Recovery links to Chapter 1006 and Chapter 998.
7. Verify the other seven stats remain at 50.
8. Verify the Battle timeline remains unchanged.

### Verification status
- Implemented: yes
- Automatically tested: not executed in AI environment
- Integration tested: not executed in AI environment
- Actually executed: not executed in AI environment
- Visually/manual verified: pending user verification
- Regression tested: structural review only; runtime regression pending

---

# Test Report

## v0.1.4

### Structural verification
- Evaluation Trace is assembled in the Application layer.
- UI does not resolve repositories directly.
- EvaluationItem evidence IDs are resolved to Evidence records without changing evaluation data.
- Evaluation items without evidence remain visible and do not cause a runtime lookup failure.

### Automated verification
- Added tests for linked-evidence resolution.
- Added tests for evaluation items with no linked evidence.
- Full npm test/build execution was not available in the AI environment.

### Manual verification required
1. Run `npm.cmd install`.
2. Run `npm.cmd test`.
3. Run `npm.cmd run build`.
4. Run `npm.cmd run dev`.
5. Select Marco and verify the Evaluation Trace appears below Basic Combat Stats.
6. Verify Recovery and Stamina show the linked Chapter 1006 reference.
7. Verify stats without evidence show `연결된 근거 없음`.
8. Verify the existing Battle timeline still works.

### Verification status
- Implemented: yes
- Automatically tested: not fully executed in AI environment
- Integration tested: not yet in AI environment
- Actually executed: not yet in AI environment
- Visually/manual verified: v0.1.3 baseline verified by user; v0.1.4 pending
- Regression tested: pending


## v0.1.3

### User-verified baseline
- v0.1.2 was installed and opened successfully in the user's environment.
- User visually verified the existing character screen and the Marco Canon Evidence section.

### Structural verification
- UI does not import repositories directly.
- Battle chronology is represented explicitly by `chronologyOrder`.
- Character battle timeline assembly is placed in the Application layer.
- Battle data is sorted by `chronologyOrder` before reaching the UI.
- Evidence remains separate from Evaluation and does not modify prototype scores automatically.

### Automated verification
- Added tests for chronological Battle grouping.
- Added tests for characters without linked evidence.
- Existing calculation tests remain in place.
- Full `npm test` / `npm run build` execution could not be completed in the AI environment because `npm install` exceeded the available execution time.

### Manual verification required
1. Run `npm.cmd install`.
2. Run `npm.cmd test`.
3. Run `npm.cmd run build`.
4. Run `npm.cmd run dev`.
5. Select Marco and verify Battle order: Marineford → Onigashima/Big Mom → Onigashima/King & Queen.
6. Click each Battle row to expand/collapse.
7. Confirm expanded Battle context and Evidence are shown together.
8. Confirm King and Katakuri remain unaffected.

### Verification status
- Implemented: yes
- Automatically tested: not fully executed in AI environment
- Integration tested: not yet for v0.1.3
- Actually executed: v0.1.3 not yet executed in user environment
- Visually/manual verified: v0.1.2 yes; v0.1.3 not yet
- Regression tested: not yet for v0.1.3


## v0.1.6 Verification Status

### Regression finding
- User environment: 15/16 tests passed; `getCharacterEvaluationTrace.test.ts` failed because its no-evidence fixture still queried Marco Attack after Marco Attack was converted from a prototype item to a real draft item with linked Evidence.
- Root cause: stale test fixture, not an Application-layer evidence-resolution failure.
- Fix: the no-evidence assertion now queries the prototype King Attack item, which intentionally has no linked Evidence.


- Domain stat definition structure: implemented
- Stat definition popup: implemented
- Marco draft evaluation values: implemented
- Full npm test / build: requires local execution in the user's environment
- Manual browser verification: requires user execution
