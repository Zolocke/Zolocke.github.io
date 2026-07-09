/* ============================================================
   Paper — narrative idle game
   Plain JS, no dependencies. Sections:
     1. TUNABLES (story, upgrades, balance)
     2. STATE
     3. SAVE / LOAD / OFFLINE
     4. SOUND
     5. ECONOMY / LOOP
     6. RENDER
     7. EVENTS / BOOT
   ============================================================ */

(function () {
  "use strict";

  // ============================================================
  // 1. TUNABLES — edit story text, thresholds, and rates here
  // ============================================================

  /**
   * Story arc: "A letter writing itself"
   * A correspondence that forms on a single sheet — beginning,
   * complication, resolution. ~12 milestones.
   *
   * threshold: cumulative Ink required to unlock the fragment
   * text: array of short paragraphs (2–5 sentences total per fragment)
   * ending: optional flag for the final fragment
   */
  const STORY = [
    {
      id: "s01",
      threshold: 10,
      text: [
        "The first mark is always the hardest. The quill hesitates above the cream page, then yields — a single dark stroke, still wet.",
      ],
    },
    {
      id: "s02",
      threshold: 50,
      text: [
        "Dear stranger,",
        "I do not know your name, only that this page insisted on being written. Forgive the blotches. My hand is out of practice.",
      ],
    },
    {
      id: "s03",
      threshold: 150,
      text: [
        "They say a letter is a bridge of ink. I am building one anyway, board by board, stroke by stroke, toward a shore I cannot see.",
      ],
    },
    {
      id: "s04",
      threshold: 400,
      text: [
        "Today the paper smelled of rain before any rain arrived. The words came faster — as if the letter already knew what it wanted to say.",
      ],
    },
    {
      id: "s05",
      threshold: 900,
      text: [
        "I should tell you why I write. There was a desk, an empty house, and a silence so complete it felt like a second person in the room. I began answering it.",
      ],
    },
    {
      id: "s06",
      threshold: 2000,
      text: [
        "Halfway down the page I found a sentence I do not remember writing: “You have been gone longer than the ink takes to dry.” My pulse jumped. The hand that holds the quill is mine — I checked.",
      ],
    },
    {
      id: "s07",
      threshold: 4500,
      text: [
        "The letter has begun to answer itself. Between my lines, faint as watermark, replies appear: soft, familiar, impossible. I copy them in darker ink so they will stay.",
      ],
    },
    {
      id: "s08",
      threshold: 9000,
      text: [
        "You wrote that the world outside this sheet is only margins. I laughed, then looked up. The room had fewer corners than before. The window showed paper-white sky.",
      ],
    },
    {
      id: "s09",
      threshold: 18000,
      text: [
        "I am no longer sure who began the correspondence. The salutation changes when I am not watching. Sometimes it is Dear stranger. Sometimes it is Dear self. Once, it was simply: Stay.",
      ],
    },
    {
      id: "s10",
      threshold: 35000,
      text: [
        "There is a fold in the page I did not make. When I press it flat, a map of a room appears — my room — drawn in negative space. A chair. A desk. A figure bent over a letter.",
      ],
    },
    {
      id: "s11",
      threshold: 65000,
      text: [
        "The ink is almost gone, or almost everywhere. Hard to tell. The desk, the window, the quiet — all of it has the grain of paper now. I write the last paragraphs carefully, as if spelling my own outline.",
      ],
    },
    {
      id: "s12",
      threshold: 100000,
      ending: true,
      text: [
        "Dear reader,",
        "If you are holding this, the letter finished itself. The stranger and the scribe were always the same hand, waiting for enough ink to meet in the middle. Thank you for writing with me. The page is full. The silence has company.",
        "— Yours, always, on paper",
      ],
    },
  ];

  /**
   * Upgrades: id, name, description, baseCost, costGrowth, rateBonus (ink/sec per level), maxLevel
   * cost(level) = floor(baseCost * costGrowth^level)
   */
  const UPGRADES = [
    {
      id: "quill",
      name: "Sharper Quill",
      desc: "A finer point. Each second yields a little more ink.",
      baseCost: 15,
      costGrowth: 1.35,
      rateBonus: 0.2,
      maxLevel: 25,
    },
    {
      id: "hand",
      name: "Steadier Hand",
      desc: "Fewer wasted strokes. Passive ink flows cleaner.",
      baseCost: 80,
      costGrowth: 1.4,
      rateBonus: 1,
      maxLevel: 20,
    },
    {
      id: "inkwell",
      name: "Second Inkwell",
      desc: "Never run dry mid-sentence.",
      baseCost: 350,
      costGrowth: 1.45,
      rateBonus: 4,
      maxLevel: 15,
    },
    {
      id: "oil",
      name: "Midnight Oil",
      desc: "Write by lamplight. Long hours, steady drip.",
      baseCost: 1500,
      costGrowth: 1.5,
      rateBonus: 15,
      maxLevel: 12,
    },
    {
      id: "press",
      name: "Letterpress Memory",
      desc: "The page remembers pressure. Ink multiplies in the grooves.",
      baseCost: 8000,
      costGrowth: 1.55,
      rateBonus: 50,
      maxLevel: 10,
    },
    {
      id: "muse",
      name: "Borrowed Muse",
      desc: "Someone else wants this letter finished. They help.",
      baseCost: 40000,
      costGrowth: 1.6,
      rateBonus: 200,
      maxLevel: 8,
    },
  ];

  /** Balance knobs (commented for easy tweaking) */
  const BALANCE = {
    // Ink gained per manual "Write" click
    clickPower: 1,
    // Extra click power per total upgrade level (small boost so clicking stays relevant early)
    clickPowerPerUpgradeLevel: 0.05,
    // Base passive rate with zero upgrades (ink/sec) — pure idle needs at least one upgrade
    baseRate: 0,
    // Offline progress cap in milliseconds (6 hours)
    offlineCapMs: 6 * 60 * 60 * 1000,
    // Autosave interval (ms)
    autosaveMs: 5000,
    // Tick interval for passive gain (ms)
    tickMs: 100,
    // Soft pen-scratch cadence while generating (ms between soft ticks)
    scratchEveryMs: 2800,
    // localStorage key
    storageKey: "paper-idle-v1",
  };

  /**
   * DEBUG multiplier — multiplies all ink gains (click + passive).
   * Set to 1 for release. Set to 50–200 for a fast full playthrough QA.
   * Also exposable at runtime: window.__PAPER_DEBUG_MULT = 100
   */
  let DEBUG_MULT = 1;

  // ============================================================
  // 2. STATE
  // ============================================================

  const state = {
    ink: 0,
    totalInk: 0, // lifetime earned (for milestones)
    upgrades: {}, // id -> level
    unlockedStory: [], // fragment ids unlocked (in order)
    muted: false,
    lastTick: Date.now(),
    lastSave: 0,
    lastScratch: 0,
    ended: false,
    // UI caches
    _affordDirty: true,
  };

  // Init upgrade levels
  UPGRADES.forEach(function (u) {
    state.upgrades[u.id] = 0;
  });

  // ============================================================
  // 3. SAVE / LOAD / OFFLINE
  // ============================================================

  function serialize() {
    return {
      v: 1,
      ink: state.ink,
      totalInk: state.totalInk,
      upgrades: state.upgrades,
      unlockedStory: state.unlockedStory,
      muted: state.muted,
      savedAt: Date.now(),
    };
  }

  function save() {
    try {
      localStorage.setItem(BALANCE.storageKey, JSON.stringify(serialize()));
      state.lastSave = Date.now();
      setSaveHint("Saved locally");
    } catch (e) {
      setSaveHint("Could not save");
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(BALANCE.storageKey);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || data.v !== 1) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function applySave(data) {
    state.ink = Math.max(0, Number(data.ink) || 0);
    state.totalInk = Math.max(state.ink, Number(data.totalInk) || 0);
    state.muted = !!data.muted;
    state.unlockedStory = Array.isArray(data.unlockedStory) ? data.unlockedStory.slice() : [];

    // Merge upgrade levels safely
    UPGRADES.forEach(function (u) {
      const lvl = data.upgrades && data.upgrades[u.id];
      state.upgrades[u.id] = clamp(Math.floor(Number(lvl) || 0), 0, u.maxLevel);
    });

    // Offline progress
    const savedAt = Number(data.savedAt) || Date.now();
    const elapsed = clamp(Date.now() - savedAt, 0, BALANCE.offlineCapMs);
    if (elapsed > 1000) {
      const rate = getRate();
      const gained = rate * (elapsed / 1000) * getDebugMult();
      if (gained > 0) {
        addInk(gained, { silent: true, source: "offline" });
        setSaveHint("Welcome back — +" + formatInk(gained) + " ink while away");
      }
    }

    // Unlock any story that should already be open from totalInk
    checkStoryUnlocks({ instant: true });
    state.ended = isEndingUnlocked();
  }

  function resetProgress() {
    state.ink = 0;
    state.totalInk = 0;
    state.unlockedStory = [];
    state.ended = false;
    UPGRADES.forEach(function (u) {
      state.upgrades[u.id] = 0;
    });
    try {
      localStorage.removeItem(BALANCE.storageKey);
    } catch (e) {
      /* ignore */
    }
    renderAll({ instantStory: true });
    save();
    setSaveHint("Page erased");
  }

  // ============================================================
  // 4. SOUND (Web Audio — no asset files required)
  // ============================================================

  let audioCtx = null;

  function ensureAudio() {
    if (state.muted) return null;
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(function () {});
    }
    return audioCtx;
  }

  function tone(freq, duration, type, gain, when) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = when != null ? when : ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  /** Soft pen scratch on write / occasional passive tick */
  function sfxScratch() {
    if (state.muted) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    // Noise burst through bandpass — paper scratch
    const dur = 0.045;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800 + Math.random() * 800;
    filter.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.value = 0.035;
    src.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    src.start();
  }

  /** Page-turn / fold on story unlock */
  function sfxPageTurn() {
    if (state.muted) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    // Soft descending whoosh via filtered noise + two tones
    const dur = 0.28;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const env = Math.sin((i / bufferSize) * Math.PI);
      data[i] = (Math.random() * 2 - 1) * env;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2400, t0);
    filter.frequency.exponentialRampToValueAtTime(400, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.08, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    src.start(t0);
    tone(220, 0.12, "triangle", 0.03, t0 + 0.02);
    tone(165, 0.18, "sine", 0.025, t0 + 0.08);
  }

  /** Soft seal stamp on upgrade purchase */
  function sfxSeal() {
    if (state.muted) return;
    tone(140, 0.08, "sine", 0.05);
    tone(90, 0.12, "triangle", 0.035);
  }

  // ============================================================
  // 5. ECONOMY / LOOP
  // ============================================================

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function getDebugMult() {
    if (typeof window.__PAPER_DEBUG_MULT === "number" && window.__PAPER_DEBUG_MULT > 0) {
      return window.__PAPER_DEBUG_MULT;
    }
    return DEBUG_MULT;
  }

  function upgradeCost(upgrade, level) {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costGrowth, level));
  }

  function totalUpgradeLevels() {
    let n = 0;
    UPGRADES.forEach(function (u) {
      n += state.upgrades[u.id] || 0;
    });
    return n;
  }

  function getClickPower() {
    return (
      (BALANCE.clickPower + totalUpgradeLevels() * BALANCE.clickPowerPerUpgradeLevel) *
      getDebugMult()
    );
  }

  function getRate() {
    let rate = BALANCE.baseRate;
    UPGRADES.forEach(function (u) {
      const lvl = state.upgrades[u.id] || 0;
      rate += lvl * u.rateBonus;
    });
    return rate;
  }

  function addInk(amount, opts) {
    opts = opts || {};
    if (amount <= 0) return;
    state.ink += amount;
    state.totalInk += amount;
    if (!opts.silent) {
      // story check deferred to tick/render cadence for offline bulk
    }
    checkStoryUnlocks({ instant: !!opts.instantStory });
  }

  function spendInk(amount) {
    if (state.ink < amount) return false;
    state.ink -= amount;
    return true;
  }

  function doWrite(clientX, clientY) {
    const power = getClickPower();
    addInk(power);
    sfxScratch();
    // Visual feedback
    const well = el.writeBtn;
    well.classList.add("is-writing");
    window.setTimeout(function () {
      well.classList.remove("is-writing");
    }, 280);
    if (clientX != null && clientY != null) {
      spawnFloat(clientX, clientY, "+" + formatInk(power, true));
    }
    renderStats();
    renderProgress();
    renderUpgradesAffordability();
  }

  function buyUpgrade(id) {
    const upgrade = UPGRADES.find(function (u) {
      return u.id === id;
    });
    if (!upgrade) return;
    const level = state.upgrades[id] || 0;
    if (level >= upgrade.maxLevel) return;
    const cost = upgradeCost(upgrade, level);
    if (!spendInk(cost)) return;
    state.upgrades[id] = level + 1;
    sfxSeal();
    renderStats();
    renderProgress();
    renderUpgrades();
    save();
  }

  function nextStoryFragment() {
    for (let i = 0; i < STORY.length; i++) {
      const frag = STORY[i];
      if (state.unlockedStory.indexOf(frag.id) === -1) {
        return frag;
      }
    }
    return null;
  }

  function isEndingUnlocked() {
    const last = STORY[STORY.length - 1];
    return last && state.unlockedStory.indexOf(last.id) !== -1;
  }

  function checkStoryUnlocks(opts) {
    opts = opts || {};
    let unlockedAny = false;
    STORY.forEach(function (frag) {
      if (state.unlockedStory.indexOf(frag.id) !== -1) return;
      if (state.totalInk >= frag.threshold) {
        state.unlockedStory.push(frag.id);
        unlockedAny = true;
        if (!opts.instant) {
          sfxPageTurn();
          el.sheet.classList.add("is-turning");
          window.setTimeout(function () {
            el.sheet.classList.remove("is-turning");
          }, 560);
        }
        appendStoryFragment(frag, { instant: !!opts.instant });
        if (frag.ending) {
          state.ended = true;
          renderEnding();
        }
      }
    });
    if (unlockedAny) {
      renderProgress();
      if (!opts.instant) save();
    }
  }

  function tick(now) {
    const dt = Math.min(now - state.lastTick, 1000); // clamp lag spikes
    state.lastTick = now;

    const rate = getRate() * getDebugMult();
    if (rate > 0 && dt > 0) {
      const gained = rate * (dt / 1000);
      addInk(gained, { silent: true });

      // Sparse quiet scratch while ink is flowing
      if (!state.muted && now - state.lastScratch > BALANCE.scratchEveryMs) {
        state.lastScratch = now;
        // Very quiet — reuse scratch at lower volume via rate gate only
        if (Math.random() < 0.55) sfxScratch();
      }
    }

    renderStats();
    renderProgress();
    renderUpgradesAffordability();

    if (now - state.lastSave > BALANCE.autosaveMs) {
      save();
    }
  }

  // ============================================================
  // 6. RENDER
  // ============================================================

  const el = {};

  function cacheDom() {
    el.sheet = document.getElementById("sheet");
    el.writeBtn = document.getElementById("write-btn");
    el.inkDisplay = document.getElementById("ink-display");
    el.rateDisplay = document.getElementById("rate-display");
    el.progressLabel = document.getElementById("progress-label");
    el.progressPercent = document.getElementById("progress-percent");
    el.progressBar = document.getElementById("progress-bar");
    el.progressFill = document.getElementById("progress-fill");
    el.manuscriptEmpty = document.getElementById("manuscript-empty");
    el.manuscriptBody = document.getElementById("manuscript-body");
    el.upgradeList = document.getElementById("upgrade-list");
    el.btnMute = document.getElementById("btn-mute");
    el.btnSettings = document.getElementById("btn-settings");
    el.settingsPanel = document.getElementById("settings-panel");
    el.settingSound = document.getElementById("setting-sound");
    el.btnReset = document.getElementById("btn-reset");
    el.modalReset = document.getElementById("modal-reset");
    el.btnResetCancel = document.getElementById("btn-reset-cancel");
    el.btnResetConfirm = document.getElementById("btn-reset-confirm");
    el.endingBadge = document.getElementById("ending-badge");
    el.saveHint = document.getElementById("save-hint");
    el.pageFold = document.getElementById("page-fold");
  }

  function formatInk(n, compact) {
    if (!isFinite(n)) return "0";
    if (n < 1000) {
      // show one decimal only if fractional and small
      if (n < 10 && n % 1 !== 0) return n.toFixed(1);
      return Math.floor(n).toLocaleString();
    }
    const units = [
      { v: 1e12, s: "T" },
      { v: 1e9, s: "B" },
      { v: 1e6, s: "M" },
      { v: 1e3, s: "K" },
    ];
    for (let i = 0; i < units.length; i++) {
      if (n >= units[i].v) {
        const val = n / units[i].v;
        return (val >= 100 ? val.toFixed(0) : val.toFixed(1)) + units[i].s;
      }
    }
    return Math.floor(n).toLocaleString();
  }

  function setSaveHint(msg) {
    if (!el.saveHint) return;
    el.saveHint.textContent = msg;
  }

  function renderStats() {
    el.inkDisplay.textContent = formatInk(state.ink);
    const rate = getRate() * getDebugMult();
    el.rateDisplay.textContent = formatInk(rate) + "/s";
  }

  function renderProgress() {
    const next = nextStoryFragment();
    if (!next) {
      el.progressLabel.textContent = "Letter complete";
      el.progressPercent.textContent = "100%";
      el.progressFill.style.width = "100%";
      el.progressBar.setAttribute("aria-valuenow", "100");
      return;
    }

    // Progress between previous threshold and next
    const prevThreshold = (function () {
      const idx = STORY.indexOf(next);
      if (idx <= 0) return 0;
      return STORY[idx - 1].threshold;
    })();

    const span = Math.max(1, next.threshold - prevThreshold);
    const into = clamp(state.totalInk - prevThreshold, 0, span);
    const pct = clamp((into / span) * 100, 0, 100);

    el.progressLabel.textContent = "Next fragment · " + formatInk(next.threshold) + " ink";
    el.progressPercent.textContent = Math.floor(pct) + "%";
    el.progressFill.style.width = pct + "%";
    el.progressBar.setAttribute("aria-valuenow", String(Math.floor(pct)));
  }

  function appendStoryFragment(frag, opts) {
    opts = opts || {};
    el.manuscriptEmpty.hidden = true;

    // Avoid duplicates in DOM
    if (el.manuscriptBody.querySelector('[data-frag="' + frag.id + '"]')) return;

    const article = document.createElement("article");
    article.className = "story-fragment" + (frag.ending ? " is-ending" : "");
    article.dataset.frag = frag.id;
    if (opts.instant) article.classList.add("is-instant");

    frag.text.forEach(function (para) {
      const p = document.createElement("p");
      p.textContent = para;
      article.appendChild(p);
    });

    const mark = document.createElement("span");
    mark.className = "frag-mark";
    mark.setAttribute("aria-hidden", "true");
    article.appendChild(mark);

    el.manuscriptBody.appendChild(article);

    if (!opts.instant) {
      // Force reflow then reveal for ink-spread animation
      void article.offsetWidth;
      article.classList.add("is-visible");
      // Scroll fragment into view gently
      window.requestAnimationFrame(function () {
        article.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    } else {
      article.classList.add("is-visible", "is-instant");
    }
  }

  function renderStory(opts) {
    opts = opts || {};
    el.manuscriptBody.innerHTML = "";
    if (state.unlockedStory.length === 0) {
      el.manuscriptEmpty.hidden = false;
      return;
    }
    el.manuscriptEmpty.hidden = true;
    STORY.forEach(function (frag) {
      if (state.unlockedStory.indexOf(frag.id) !== -1) {
        appendStoryFragment(frag, { instant: true });
      }
    });
  }

  function renderUpgrades() {
    el.upgradeList.innerHTML = "";
    UPGRADES.forEach(function (u) {
      const level = state.upgrades[u.id] || 0;
      const maxed = level >= u.maxLevel;
      const cost = maxed ? 0 : upgradeCost(u, level);
      const affordable = !maxed && state.ink >= cost;

      const li = document.createElement("li");
      li.className =
        "upgrade-card" +
        (affordable ? " is-affordable" : "") +
        (maxed ? " is-maxed" : "");
      li.dataset.upgradeId = u.id;

      const name = document.createElement("h3");
      name.className = "upgrade-name";
      name.textContent = u.name;

      const meta = document.createElement("p");
      meta.className = "upgrade-meta";
      meta.textContent = maxed
        ? "Level " + level + " · max"
        : "Level " + level + "/" + u.maxLevel + " · +" + formatInk(u.rateBonus) + "/s each";

      const desc = document.createElement("p");
      desc.className = "upgrade-desc";
      desc.textContent = u.desc;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "upgrade-buy" + (maxed ? " is-maxed" : "");
      btn.dataset.buy = u.id;
      if (maxed) {
        btn.textContent = "Complete";
        btn.disabled = true;
      } else {
        btn.textContent = formatInk(cost) + " ink";
        btn.disabled = !affordable;
      }

      li.appendChild(name);
      li.appendChild(btn);
      li.appendChild(meta);
      li.appendChild(desc);
      el.upgradeList.appendChild(li);
    });
  }

  function renderUpgradesAffordability() {
    // Lightweight pass without rebuilding whole list
    const cards = el.upgradeList.querySelectorAll(".upgrade-card");
    cards.forEach(function (card) {
      const id = card.dataset.upgradeId;
      const u = UPGRADES.find(function (x) {
        return x.id === id;
      });
      if (!u) return;
      const level = state.upgrades[id] || 0;
      const maxed = level >= u.maxLevel;
      const btn = card.querySelector(".upgrade-buy");
      if (maxed) {
        card.classList.remove("is-affordable");
        card.classList.add("is-maxed");
        btn.disabled = true;
        return;
      }
      const cost = upgradeCost(u, level);
      const affordable = state.ink >= cost;
      card.classList.toggle("is-affordable", affordable);
      btn.disabled = !affordable;
      // Keep cost text fresh if levels somehow changed externally
      if (btn.textContent.indexOf("ink") !== -1 || btn.textContent.indexOf("K") !== -1) {
        btn.textContent = formatInk(cost) + " ink";
      }
    });
  }

  function renderMute() {
    el.btnMute.setAttribute("aria-pressed", state.muted ? "true" : "false");
    el.btnMute.setAttribute("aria-label", state.muted ? "Unmute sound" : "Mute sound");
    el.btnMute.title = state.muted ? "Unmute" : "Mute";
    if (el.settingSound) el.settingSound.checked = !state.muted;
  }

  function renderEnding() {
    if (state.ended) {
      el.endingBadge.hidden = false;
    } else {
      el.endingBadge.hidden = true;
    }
  }

  function renderAll(opts) {
    opts = opts || {};
    renderStats();
    renderProgress();
    renderStory({ instant: !!opts.instantStory });
    renderUpgrades();
    renderMute();
    renderEnding();
  }

  function spawnFloat(x, y, text) {
    const node = document.createElement("div");
    node.className = "ink-float";
    node.textContent = text;
    node.style.left = x + "px";
    node.style.top = y + "px";
    document.body.appendChild(node);
    window.setTimeout(function () {
      node.remove();
    }, 900);
  }

  // ============================================================
  // 7. EVENTS / BOOT
  // ============================================================

  function bindEvents() {
    // Write — click / keyboard
    el.writeBtn.addEventListener("click", function (e) {
      ensureAudio();
      doWrite(e.clientX, e.clientY);
    });
    el.writeBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const rect = el.writeBtn.getBoundingClientRect();
        doWrite(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });

    // Upgrades (event delegation)
    el.upgradeList.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-buy]");
      if (!btn || btn.disabled) return;
      ensureAudio();
      buyUpgrade(btn.dataset.buy);
    });

    // Mute
    el.btnMute.addEventListener("click", function () {
      state.muted = !state.muted;
      renderMute();
      if (!state.muted) ensureAudio();
      save();
    });

    el.settingSound.addEventListener("change", function () {
      state.muted = !el.settingSound.checked;
      renderMute();
      if (!state.muted) ensureAudio();
      save();
    });

    // Settings panel toggle
    el.btnSettings.addEventListener("click", function () {
      const open = el.settingsPanel.hidden;
      el.settingsPanel.hidden = !open;
      el.btnSettings.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Reset flow
    el.btnReset.addEventListener("click", function () {
      el.modalReset.hidden = false;
      el.btnResetCancel.focus();
    });
    el.btnResetCancel.addEventListener("click", function () {
      el.modalReset.hidden = true;
    });
    el.btnResetConfirm.addEventListener("click", function () {
      el.modalReset.hidden = true;
      resetProgress();
    });
    el.modalReset.addEventListener("click", function (e) {
      if (e.target === el.modalReset) el.modalReset.hidden = true;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !el.modalReset.hidden) {
        el.modalReset.hidden = true;
      }
    });

    // Page fold easter: soft sfx
    el.pageFold.addEventListener("click", function () {
      ensureAudio();
      sfxPageTurn();
    });

    // Save on hide
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") save();
    });
    window.addEventListener("beforeunload", function () {
      save();
    });
  }

  function loop(now) {
    tick(now);
    window.requestAnimationFrame(loop);
  }

  function boot() {
    cacheDom();
    bindEvents();

    const data = load();
    if (data) {
      applySave(data);
      renderAll({ instantStory: true });
    } else {
      renderAll({ instantStory: true });
    }

    state.lastTick = Date.now();
    state.lastSave = Date.now();
    window.requestAnimationFrame(loop);

    // Expose minimal debug helpers for QA (documented in README)
    window.__PAPER_DEBUG = {
      setMult: function (n) {
        window.__PAPER_DEBUG_MULT = n;
        console.info("[Paper] debug mult =", n);
      },
      grant: function (n) {
        addInk(Number(n) || 0, { instantStory: true });
        renderStats();
        renderProgress();
        renderUpgrades();
        renderStory({ instant: true });
      },
      unlockAll: function () {
        STORY.forEach(function (f) {
          if (state.unlockedStory.indexOf(f.id) === -1) {
            state.unlockedStory.push(f.id);
            appendStoryFragment(f, { instant: true });
          }
        });
        state.ended = true;
        renderEnding();
        renderProgress();
        save();
      },
      save: save,
      state: state,
      STORY: STORY,
      UPGRADES: UPGRADES,
      BALANCE: BALANCE,
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
