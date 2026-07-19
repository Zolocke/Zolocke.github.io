#!/usr/bin/env node
/**
 * Copy Vite dist/ into a pages-ready layout WITHOUT overwriting the Vite source index.html.
 *
 * Strategy for GitHub user pages (Zolocke.github.io):
 * - Source entry stays at /index.source.html during build (we swap)
 * OR better: write built files to docs/ ... but user site wants root.
 *
 * Actual approach used here:
 * 1. Build reads index.html (source with /src/main.ts)
 * 2. After build, we write dist/index.html → index.html (production)
 * 3. Source template is kept at index.source.html so rebuilds work
 * 4. prepare-pages copies index.source.html → index.html before build if needed
 *
 * This script assumes npm run build already ran against the SOURCE index.
 * Call via: node scripts/prepare-pages.mjs
 *
 * Built bundles → build/ (not assets/) to avoid case-collision with legacy Assets/.
 */
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const sourceIndex = join(root, "index.source.html");

if (!existsSync(dist)) {
  console.error("dist/ missing — run npm run build first");
  process.exit(1);
}

// Preserve source entry for next build
const currentIndex = join(root, "index.html");
const current = readFileSync(currentIndex, "utf8");
if (current.includes("/src/main.ts") || current.includes('src="/src/')) {
  writeFileSync(sourceIndex, current);
  console.log("prepare-pages: saved source entry → index.source.html");
} else if (existsSync(sourceIndex)) {
  // already production index; source kept separately
} else {
  console.warn(
    "prepare-pages: warning — no index.source.html and current index looks built"
  );
}

// 1. Production index
copyFileSync(join(dist, "index.html"), currentIndex);

// 2. bundles → build/
const distBuild = join(dist, "build");
const rootBuild = join(root, "build");
if (existsSync(distBuild)) {
  if (existsSync(rootBuild)) rmSync(rootBuild, { recursive: true, force: true });
  mkdirSync(rootBuild, { recursive: true });
  for (const name of readdirSync(distBuild)) {
    cpSync(join(distBuild, name), join(rootBuild, name), { recursive: true });
  }
}

// 3. public copies
for (const name of readdirSync(dist)) {
  if (name === "index.html" || name === "build" || name === "assets") continue;
  cpSync(join(dist, name), join(root, name), { recursive: true });
}

// 4. Clean leftover vite junk in legacy assets/ if present
const legacyAssets = join(root, "assets");
if (existsSync(legacyAssets)) {
  try {
    const names = readdirSync(legacyAssets);
    const onlyVite = names.every(
      (n) =>
        /^(index-|fa-).+\.(js|css|woff2|map)$/i.test(n) || n === "resume.json"
    );
    if (onlyVite) {
      rmSync(legacyAssets, { recursive: true, force: true });
      console.log("prepare-pages: removed legacy root assets/");
    }
  } catch {
    /* ignore */
  }
}

console.log("prepare-pages: root updated from dist/.");
const tracked = ["index.html", "build/", "data/", "images/", "paper-game/", "vendor/"].filter(
  (p) => existsSync(join(root, p))
);
console.log("Tracked deploy paths:", tracked.join(", "));

if (!existsSync(join(root, "paper-game"))) {
  console.warn("WARNING: paper-game/ missing at root");
}
if (!existsSync(join(root, "data", "resume.json"))) {
  console.warn("WARNING: data/resume.json missing");
}
if (!statSync(currentIndex).isFile()) {
  console.error("index.html missing after prepare");
  process.exit(1);
}
