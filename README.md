# Zolocke.github.io — Portfolio Console

**Live:** https://zolocke.github.io/  
**Owner:** Zachary Odennihy  
**Local clone:** `~/GitRepos/Zolocke.github.io`  
**Status:** Solid baseline (2026-07-19) — polish later without changing the shell

Precision-console **app shell** (not a marketing landing page) · Vite + TypeScript + build-time Tailwind · portfolio, not a full public résumé

---

## Product decisions (locked)

These are intentional. Change only with a conscious decision — not during casual polish.

| Decision | Choice | Why |
|----------|--------|-----|
| Site type | Personal **portfolio console** | Professional presence, not a public CV dump |
| Visual system | **Precision-console** UI | Three-pane research/app shell, Autumn Night / Orange Creamsicle |
| Résumé | **Not** hosted in full | Experience **Highlights** only (3–5); LinkedIn for full profile |
| Primary CTA | **LinkedIn** (header + contact strip) | User preference over PDF download |
| Contact | Always visible strip | LinkedIn · GitHub · Email — not buried in inspector |
| Brand | **Full name** top-left always | Name is the brand, not only the “Z” mark |
| Data | `data/resume.json` + curated TS | JSON for facts; `src/data/highlights.ts` for short blurbs |
| GitHub | Live client-side API | Sanitized with `escapeHtml` |
| LinkedIn | Manual / link only | No public API polling |
| Hosting | GitHub Pages (`main` root) | User site `Zolocke.github.io` |
| Framework | Vite + vanilla TS (Option B) | Intermediate HTML/CSS/JS; no React |

**Sandbox designs** (not the live site): `~/workspace/personalwebsite/` including `precision-console.html`.

---

## Architecture overview

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: [Z] Zachary Odennihy     [LinkedIn] [search] [theme]   │
│  CONTACT STRIP: LinkedIn · GitHub · Email · status              │
├──────────────┬──────────────────────────────┬───────────────────┤
│  WORKSPACE   │  MAIN (List/Timeline/Graph/  │  INSPECTOR        │
│  filters     │   Metrics)                   │  selected entity  │
│  (desktop)   │  entity rows                 │  (desktop pane)   │
│              │                              │                   │
│  Mobile:     │  Mobile: full-width list     │  Mobile: bottom   │
│  chip row    │  scroll                      │  sheet on select  │
└──────────────┴──────────────────────────────┴───────────────────┘
```

### Desktop (≥901px)
- Full **3-pane** precision-console shell
- Left workspace nav + **5 curated** quick filters
- Center entity list + view tabs
- Right inspector always visible

### Mobile (≤900px)
- Brand header + contact strip + LinkedIn CTA (always)
- Horizontal **type chips** + curated tag chips (no giant sidebar stack)
- Single-column entity list (page scrolls)
- Inspector opens as a **bottom sheet** when a row is tapped
- Do **not** stack left + list + inspector as three vertical panes

### Entity model
Everything the user browses is an **entity**:

| Type | Source | Notes |
|------|--------|--------|
| `profile` | resume + `ABOUT_BLURB` | Default selection on desktop |
| `highlight` | `buildHighlights()` | Max 5 curated career beats |
| `project` | Paper (local) + GitHub API | Forks excluded; top 6 non-fork |
| `contact` | resume.contact | Links duplicated in header strip |
| `skill` | `top_skills` | One entity per skill |

**Quick filters (locked set):** `robotics`, `automation`, `leadership`, `github`, `ai`  
Do not dump every tag into the sidebar — that made the UI noisy.

---

## Repository layout

```
Zolocke.github.io/
├── README.md                 ← you are here
├── STRUCTURE.md              ← polish guide + invariants (this pair)
├── package.json              ← npm scripts
├── vite.config.ts            ← base "/", assetsDir: "build"
├── tsconfig.json
├── index.source.html         ← Vite ENTRY (edit this HTML shell)
├── index.html                ← PRODUCTION output for GitHub Pages (generated)
├── src/
│   ├── main.ts               ← app shell, entities, GitHub, mobile sheet
│   ├── style.css             ← design tokens + desktop/mobile layout
│   ├── vite-env.d.ts
│   ├── data/
│   │   ├── types.ts          ← ResumeData interfaces
│   │   └── highlights.ts     ← ABOUT_BLURB + buildHighlights()
│   └── lib/
│       ├── escapeHtml.ts     ← XSS defense (required for API HTML)
│       └── theme.ts          ← dark/light localStorage
├── public/                   ← copied into dist/ on build
│   ├── data/resume.json
│   └── images/favicon.svg
├── data/resume.json          ← live data path after deploy:prepare
├── build/                    ← hashed JS/CSS (production; committed for Pages)
├── scripts/
│   ├── ensure-source-index.mjs   ← restores index.html from index.source.html
│   └── prepare-pages.mjs         ← dist → repo root for GH Pages
├── paper-game/               ← featured sub-site (do not delete)
├── images/
├── vendor/fontawesome/       ← local FA (kept for optional use)
└── .gitignore
```

### Why `build/` not `assets/`
macOS default APFS is case-insensitive. Legacy `Assets/` collided with Vite’s `assets/`. Bundles go to **`build/`**.

### Why `index.source.html`
GitHub Pages needs a production `index.html` at repo root. Vite needs a source entry with `/src/main.ts`.  
Flow: `ensure-source-index` → build → `prepare-pages` writes production `index.html` and saves source as `index.source.html`.

**Never hand-edit production `index.html` for content.** Edit `src/` + `index.source.html`, then `npm run deploy:prepare`.

---

## Commands

```bash
cd ~/GitRepos/Zolocke.github.io
npm install

npm run dev              # Vite dev server (HMR)
npm run build            # tsc + vite build → dist/
npm run deploy:prepare   # build + copy dist to root (Pages-ready)
npm run preview          # vite preview of dist/

# Ship
git add -A && git commit -m "..." && git push origin main
```

GitHub Pages: **branch `main` · folder `/` (root)**.

---

## What to edit for common polish

| Goal | Edit | Avoid |
|------|------|--------|
| About paragraph | `src/data/highlights.ts` → `ABOUT_BLURB` | Pasting full résumé summary |
| Highlight cards | `src/data/highlights.ts` → `buildHighlights()` | Adding 10+ roles |
| Name, headline, email, LinkedIn, skills list | `public/data/resume.json` **and** `data/resume.json` (keep in sync) | Editing only one copy |
| Colors / spacing / mobile breakpoints | `src/style.css` | Breaking ≤900px bottom-sheet rules |
| Shell chrome, filters, inspector | `src/main.ts` | Returning to stacked mobile panes |
| Header HTML (fonts, title) | `index.source.html` then rebuild | Editing root `index.html` only |
| New featured project folder | e.g. `my-demo/index.html` + entity in `buildEntities()` | Hardcoding unsanitized API HTML |

After edits:

```bash
npm run deploy:prepare
git add -A && git commit -m "polish: ..." && git push
```

Hard-refresh the phone/browser (cache likes old hashed JS).

---

## Security & privacy (do not regress)

1. **`escapeHtml()`** on every untrusted string rendered into HTML (especially GitHub API fields) — `src/lib/escapeHtml.ts`.
2. **Location:** state-level only (“Washington State”), never street address or phone in public JSON.
3. **Email** `zachdenny18@gmail.com` is intentionally public on this site.
4. Repo is **public** (required for free GitHub Pages).
5. No secrets in the repo. No API tokens for GitHub (unauthenticated public API is fine; rate-limited).

---

## Design tokens (quick reference)

Dark (default) / light via `data-theme="light"` + `localStorage` key `lark-portfolio-theme`.

| Token | Dark | Light |
|-------|------|-------|
| `--bg` | `#1a1512` | `#fff3e4` |
| `--bg-elevated` | `#2a2218` | `#ffffff` |
| `--border` | `#3a321e` | `#ffd3a8` |
| `--text` | `#f5ede0` | `#4a2e1a` |
| `--text-muted` | `#c9b8a8` | `#a8654a` |
| `--accent` | `#e8a87c` | `#ff7a30` |
| `--accent-strong` | `#c45c26` | `#ff5a1f` |

Fonts: Inter (UI), Space Grotesk (headings/brand), IBM Plex Mono (metrics).

Breakpoint: **`900px`** — desktop shell vs mobile sheet. Change carefully; both CSS and `isMobile()` in `main.ts` use it.

---

## Sub-sites

| Path | What |
|------|------|
| `/paper-game/` | Narrative idle game — keep linked as featured project |
| Future demos | Add folder at root + a `project` entity in `buildEntities()` |

---

## Intentionally out of scope (for now)

- Full public résumé page
- React / Astro rewrite (Option B stands unless explicitly revisited)
- Auto LinkedIn sync
- Blog / CMS
- Contact form backend
- Service worker / PWA

---

## History snapshot

| Date | Note |
|------|------|
| 2026-07 | Option B rebuild: Vite + TS + Tailwind; precision-console shell |
| 2026-07 | Content: portfolio + highlights, not living full résumé |
| 2026-07 | Mobile fix: brand header, contact strip, bottom-sheet inspector, few filters |
| — | Next: polish only; preserve structure in this README + STRUCTURE.md |

---

## Related docs in-repo

- **[STRUCTURE.md](./STRUCTURE.md)** — polish guide + invariants checklist before any polish PR  
- **[docs/2026-07-19_option-b-decision.md](./docs/2026-07-19_option-b-decision.md)** — Option B decision (historical; accepted)  
- **[paper-game/README.md](./paper-game/README.md)** — game-specific notes  

**Single home for this project:** this git repo. Do not leave active plans under `workspace/.hermes/plans/` for the personal site.

When polishing with an agent: point them at **this README + STRUCTURE.md** and say “do not change product decisions or mobile architecture without asking.”
