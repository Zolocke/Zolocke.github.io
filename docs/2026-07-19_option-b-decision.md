# Decision: Personal Site Rebuild — Option B (Vite + Vanilla)

**Date:** 2026-07-19  
**Decider:** Zachary Odennihy (with Miss Lark guidance)  
**Status:** Accepted & implemented  
**Canonical home:** this repo (`docs/`) — not workspace `.hermes/plans`

## Decision
Rebuild the personal portfolio site using **Option B: Vite + Vanilla (TS/JS)**.

- Build tool: Vite
- Styling: Tailwind CSS via `@tailwindcss/vite` (build-time)
- Language: TypeScript + plain modules (no React)
- UI: Precision-console app shell (3-pane desktop; mobile chips + bottom-sheet inspector)
- Data: `data/resume.json` + curated highlights in `src/data/highlights.ts`
- Full résumé: **not** public on-site; **LinkedIn** is the primary professional CTA
- Contact: always-visible strip (LinkedIn · GitHub · Email)

## Rationale
- Intermediate HTML/CSS/JS preference without React overhead
- Build-time Tailwind for stable assets (vs Play CDN)
- Portfolio tone (“I build automation/robotics systems”) not a full public CV
- Maintainable: `npm run deploy:prepare` + push

## Rejected alternatives
- **A** — Keep single-file Play CDN (fast but weak SRI/CSP story)
- **C** — Vite + React (unnecessary for mostly static portfolio)
- **D** — Astro (deferred; Option B chosen for comfort + control)

## Implemented paths
| Role | Path |
|------|------|
| Live | https://zolocke.github.io/ |
| Canonical clone | `~/GitRepos/Zolocke.github.io` |
| Design sandbox only | `~/workspace/personalwebsite/` |
| Ops docs | `README.md`, `STRUCTURE.md` |

## Superseded workspace artifacts (removed 2026-07-19)
- `.hermes/plans/2026-07-19_personal-website-phase-2-astro-rebuild.md` (Astro plan — not used)
- `.hermes/plans/2026-07-19_personal-site-vite-vanilla-rebuild.md` (executed; structure now in README/STRUCTURE)
- `.hermes/decisions/2026-07-19_personal-site-option-b-decision.md` (moved here)

**Do not recreate personal-site plans under workspace `.hermes/`.** Future work lives in this repo.
