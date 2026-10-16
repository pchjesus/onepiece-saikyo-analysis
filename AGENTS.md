# AI Agent Development Contract — onepiece-saikyo-analysis

## Mandatory sources
Read [B+ Integrated Development & CI Policy](docs/AI_ASSISTED_DEVELOPMENT_BPLUS_v1.0.md) before new features, refactors, CI changes or release decisions. This repo's README, specifications, development logs, existing code, approved UX decisions and domain/safety contract prevail on conflicts.

## Workflow
Plan one coherent user outcome/version before implementation; perform a proportional Definition of Ready and affected-state risk review. Work in reversible internal commits; perform relevant local/agent checks as often as necessary. Use fast + risk-focused PR tests, and full historical/brower/packaging regression when changing core state, doing a broad refactor or releasing. Never mislabel unrun tests PASS. Release only after the user-approved gates. Retain urgent hotfixes for consequential defects; do not force unrelated tasks into one giant patch.

## Repository-specific protection
Preserve existing 7-stat evaluation data, model and rankings, matchup/organization routes, source provenance and GitHub Pages publishing. Read docs/PROJECT_GUIDE.md and PROJECT_SPEC.md first.

## Scope
This registration is documentation/policy-only; it does not authorize behavior, data, deployment or visibility changes. Do not claim REAL-device or specialist acceptance from automated CI alone.

## Character detail UI contract (v0.4.18)
When registering or evaluating ordinary new characters, **reuse the current shared `src/ui/pages/CharacterPage.tsx` UI and its components**. Do not copy `CharlosSpecialPage`, its golden styling, seven meme stats or secret dialog into normal character pages. Saint Charlos is an **explicit one-character celestial-dragon joke exception**. Any other bespoke profile UI requires a new explicit user decision. Keep the factual evidence and joke wording clearly distinct in source data and docs, without inserting unnecessary joke explanations into the visible special page.
