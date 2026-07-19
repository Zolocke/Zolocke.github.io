# Zolocke.github.io — Portfolio Console

Personal portfolio for **Zachary Odennihy**  
Live: https://zolocke.github.io/

Precision-console UI · Vite + TypeScript + Tailwind (build-time) · no full public résumé

## What this site is

- Short **About** (“I build automation/robotics systems”)
- **Experience Highlights** (3–5 curated cards — not a full CV)
- **Projects** (featured local work + live GitHub API)
- **Contact** + résumé PDF button (PDF optional under `data/`)
- Theme toggle: Autumn Night (dark) / Orange Creamsicle (light)
- Sub-page: [`paper-game/`](./paper-game/)

## Daily maintenance

| Task | How |
|------|-----|
| Edit highlights / about copy | `src/data/highlights.ts` |
| Update profile / contact / skills source | `data/resume.json` **and** `public/data/resume.json` (keep in sync) |
| Add résumé PDF download | Drop `Zachary-Odennihy-Resume.pdf` into `public/data/` (and `data/` after prepare) |
| Dev server | `npm run dev` |
| Production build → root for GitHub Pages | `npm run deploy:prepare` |
| Preview built files | `npx serve .` or `python3 -m http.server` |

## Security (do not regress)

- `escapeHtml()` on **all** GitHub API fields injected into HTML (`src/lib/escapeHtml.ts`)
- Public contact email is intentional; location stays **state-level only**
- Repo is public (required for free GitHub Pages)

## Layout notes

- Built JS/CSS live in `build/` (not `assets/`) because macOS case-insensitive FS collided with the old `Assets/` folder.
- Vite source entry is preserved as `index.source.html`. `npm run build` restores it before compiling; `deploy:prepare` writes the production `index.html` for Pages.
- Do **not** hand-edit production `index.html` — edit `src/` + `index.source.html`, then rebuild.

## Commands

```bash
npm install
npm run dev              # local development
npm run deploy:prepare   # build + copy to repo root for GH Pages
git add -A && git commit -m "..." && git push
```

GitHub Pages serves the `main` branch root for `Zolocke.github.io`.
