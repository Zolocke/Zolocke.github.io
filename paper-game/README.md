# Paper — A Narrative Idle

A standalone narrative/idle game that lives inside the visual metaphor of a page. Progress *is* a letter being written; the paper itself is the UI.

**Open `index.html` in a browser.** No build step, no server required (localStorage works on `file://` in modern browsers). For best results on some browsers, serve the folder:

```bash
cd paper-game
python3 -m http.server 8765
# → http://localhost:8765
```

## Files

```
paper-game/
  index.html    # shell + structure
  style.css     # parchment UI, ink motifs, responsive layout
  game.js       # story data, economy, save/load, sound, loop
  assets/       # reserved (sounds are procedural via Web Audio; no CDN)
  README.md
```

## How it works

1. **Write** (central inkwell) — click/tap for ink.
2. **Upgrades** spend ink to raise passive ink/sec.
3. At **total-ink milestones**, story fragments unlock onto the manuscript.
4. Progress **autosaves** to `localStorage` (`paper-idle-v1`).
5. On return, **offline progress** is granted (capped at 6 hours).

Story theme: *a letter writing itself* — original short arc, 12 fragments, completable ending.

## Tweaking (no logic changes needed)

All story text, milestone thresholds, upgrade costs/rates, and balance knobs live near the **top of `game.js`**:

| Constant | What to edit |
|----------|----------------|
| `STORY` | Fragment `threshold` (total ink) and `text` paragraphs; set `ending: true` on the last |
| `UPGRADES` | `baseCost`, `costGrowth`, `rateBonus`, `maxLevel`, names/descriptions |
| `BALANCE` | Click power, offline cap (`offlineCapMs`), tick/autosave intervals, storage key |

**Costs:** `cost(level) = floor(baseCost * costGrowth^level)`.

## Sound

Procedural **Web Audio** (pen scratch, page turn, seal stamp). No external files or CDN. Mute via ♪ button or Settings.

## Debug helpers (QA only)

In the browser console:

```js
__PAPER_DEBUG.setMult(100)   // speed up gains (set back to 1 for normal)
__PAPER_DEBUG.grant(50000)  // add ink + auto-unlock story as thresholds hit
__PAPER_DEBUG.unlockAll()   // reveal full manuscript
__PAPER_DEBUG.state          // live state object
```

Remove or ignore `__PAPER_DEBUG` for production; it does not affect normal players.

## Definition of done checklist

- [x] Opens cold via `index.html` (static HTML/CSS/JS)
- [x] Click + passive ink, upgrades, autosave, offline cap
- [x] Full story arc with ending state
- [x] Mute + reset with confirmation
- [x] Responsive desktop/mobile layout
- [x] Zero npm/CDN dependencies

## License notes

Original game code and story text. System font stacks only (Georgia / system UI) — no hosted webfonts.
