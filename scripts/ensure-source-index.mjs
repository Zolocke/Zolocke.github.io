#!/usr/bin/env node
/** Restore Vite source index.html from index.source.html when root has the built file. */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const indexPath = join(root, "index.html");
const sourcePath = join(root, "index.source.html");

const SOURCE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Zachary Odennihy — automation, robotics, and AI engineering portfolio."
    />
    <title>Zachary Odennihy • Portfolio Console</title>
    <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
    <link rel="stylesheet" href="/vendor/fontawesome/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="min-h-screen">
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`;

function isSource(html) {
  return html.includes("/src/main.ts");
}

if (existsSync(indexPath)) {
  const html = readFileSync(indexPath, "utf8");
  if (isSource(html)) {
    writeFileSync(sourcePath, html);
    process.exit(0);
  }
}

if (existsSync(sourcePath) && isSource(readFileSync(sourcePath, "utf8"))) {
  copyFileSync(sourcePath, indexPath);
  console.log("ensure-source-index: restored index.html from index.source.html");
  process.exit(0);
}

writeFileSync(indexPath, SOURCE);
writeFileSync(sourcePath, SOURCE);
console.log("ensure-source-index: wrote fresh source index.html + index.source.html");
