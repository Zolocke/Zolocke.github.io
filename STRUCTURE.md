# STRUCTURE.md — Polish without breaking the site

**Use this checklist every time you polish.**  
Companion to [README.md](./README.md). If a change fights these invariants, stop and decide deliberately.

**Last verified:** 2026-07-19 · Live baseline commit family: Option B portfolio console

---

## 1. Product invariants

- [ ] Still a **portfolio console**, not a full public résumé
- [ ] **LinkedIn** remains the primary professional CTA (header button + strip)
- [ ] **Full name** visible in the top brand bar on mobile and desktop
- [ ] **Contact strip** always visible: LinkedIn, GitHub, Email
- [ ] Experience on-site = **highlights only** (≤5), not every job in full
- [ ] Quick filters stay a **short curated list** (currently 5 tags) — no tag explosion

---

## 2. Layout invariants

### Desktop (≥901px)
- [ ] Three panes: Workspace | Main | Inspector
- [ ] View tabs: List · Timeline · Graph · Metrics still work
- [ ] ⌘K / search palette still works

### Mobile (≤900px)
- [ ] **No** stacked triple-pane (sidebar + list + inspector all visible at once)
- [ ] List is the primary scroll surface
- [ ] Inspector = **bottom sheet** on entity select; closable (X + backdrop)
- [ ] Header brand + LinkedIn + contact strip remain usable without opening inspector
- [ ] Type/filter **chips** replace the tall left sidebar

Breakpoint is shared:
- CSS: `@media (max-width: 900px)` / `min-width: 901px` in `src/style.css`
- JS: `isMobile()` in `src/main.ts` — **keep them matched**

---

## 3. Data / code boundaries

| Kind of change | Touch | Do not touch casually |
|----------------|-------|------------------------|
| Copy / highlights | `src/data/highlights.ts` | Shell layout |
| Profile facts | `public/data/resume.json` + `data/resume.json` | One file only |
| Theme colors | CSS variables in `src/style.css` | Hardcoded one-off hex in random places |
| Entity types / filters | `src/main.ts` (`TYPE_META`, `QUICK_TAGS`, `buildEntities`) | Ad-hoc DOM hacks |
| XSS surface | Keep using `escapeHtml` | `innerHTML` with raw API strings |
| Deploy plumbing | `scripts/*`, `vite.config.ts` | Renaming `build/` without FS plan |

**Dual resume paths:** after `deploy:prepare`, live site fetches `data/resume.json`.  
Source of truth for the build pipeline also lives in `public/data/resume.json`.  
**Always update both** (or copy public → data after prepare).

---

## 4. Deploy invariants

```bash
npm run deploy:prepare   # required before push if src changed
git push origin main
```

- [ ] Did **not** only edit root `index.html` by hand
- [ ] `index.source.html` still contains `/src/main.ts` entry
- [ ] Production `index.html` references `/build/index-*.js` and `/build/index-*.css`
- [ ] `paper-game/` still present at repo root
- [ ] `data/resume.json` still 200 on live site after deploy

**Never** set Vite `assetsDir` back to `assets` on macOS without addressing case-collision with legacy `Assets`.

---

## 5. Safe polish menu (good next passes)

These improve quality without redesign:

1. **Typography / spacing** — tighten inspector and row padding; keep tokens
2. **Empty / loading / offline states** — friendlier copy when GitHub fails
3. **Highlight wording** — sharper blurbs in `highlights.ts`
4. **Featured projects** — curate which GitHub repos show (allowlist)
5. **Accessibility** — focus rings, aria on sheet, reduced-motion
6. **Performance** — font loading, fewer FA weights if unused
7. **SEO** — meta description / OG tags in `index.source.html`
8. **paper-game** card art or better subtitle only

---

## 6. Unsafe polish (needs explicit decision)

- Replacing console shell with a normal multi-page marketing site
- Bringing back full experience timeline as the main view
- React/Astro migration
- Removing contact strip or burying LinkedIn again
- Auto-generating filters from all tags
- Putting secrets or private address/phone in `resume.json`

---

## 7. Pre-push smoke test

```bash
npm run deploy:prepare
python3 -m http.server 8765   # from repo root
# Desktop width: 3 panes, select entity, inspector updates, theme toggle
# Narrow width (<900): chips, list scroll, tap row → sheet, close sheet
# Contact strip + LinkedIn header work without opening anything
curl -s localhost:8765/data/resume.json | head -c 200
curl -s -o /dev/null -w "%{http_code}\n" localhost:8765/paper-game/
```

Live after push:

```bash
curl -s https://zolocke.github.io/ | grep -oE 'build/index-[^"]+\.js'
# wait for Pages, hard-refresh phone
```

---

## 8. Agent handoff blurb (copy-paste)

```
Polish Zolocke.github.io only. Read README.md + STRUCTURE.md first.
Do not change product decisions or mobile architecture (bottom sheet, brand header,
contact strip, LinkedIn CTA, curated filters). Preserve escapeHtml on API data.
Edit src/, public/data/resume.json, data/resume.json as needed.
Ship with: npm run deploy:prepare && git commit && git push.
```

---

## 9. File ownership map

```
src/main.ts          shell behavior, entities, GitHub, mobile sheet
src/style.css        tokens, desktop/mobile layout rules
src/data/highlights.ts   narrative copy users actually read
src/data/types.ts    Resume JSON typing
src/lib/*            theme + escapeHtml
public/data/*        build-time public data
data/*               deployed data paths
index.source.html    HTML document shell for Vite
scripts/*            Pages deploy helpers
paper-game/*         independent mini-app
build/*              generated bundles (commit for Pages)
```

When in doubt: **structure over novelty.** This baseline is “solid for now.”
