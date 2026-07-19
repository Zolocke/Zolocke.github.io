import "./style.css";
import { escapeHtml } from "./lib/escapeHtml";
import { initTheme } from "./lib/theme";
import { ABOUT_BLURB, buildHighlights } from "./data/highlights";
import type { ResumeData } from "./data/types";

type EntityType = "profile" | "highlight" | "project" | "contact" | "skill";

interface Entity {
  id: string;
  type: EntityType;
  title: string;
  subtitle: string;
  lastModified: string;
  tags: string[];
  status: string;
  description: string;
  metrics?: Record<string, string | number>;
  links?: Array<{ label: string; href: string; external?: boolean }>;
  related?: string[];
  icon: string;
}

/** Curated quick filters only — keep sidebar clean. */
const QUICK_TAGS = ["robotics", "automation", "leadership", "github", "ai"] as const;

const TYPE_META: Record<
  EntityType | "all",
  { label: string; icon: string }
> = {
  all: { label: "All", icon: "fa-th-large" },
  profile: { label: "Profile", icon: "fa-id-card" },
  highlight: { label: "Highlights", icon: "fa-star" },
  project: { label: "Projects", icon: "fa-folder" },
  contact: { label: "Contact", icon: "fa-envelope" },
  skill: { label: "Skills", icon: "fa-code" },
};

let entities: Entity[] = [];
let currentFilter: EntityType | "all" = "all";
let currentTag: string | null = null;
let currentSelection: string | null = null;
let currentView: "list" | "timeline" | "graph" | "metrics" = "list";
let resumeData: ResumeData | null = null;
let contactLinks = {
  linkedin: "https://www.linkedin.com/in/odennihy",
  github: "https://github.com/Zolocke",
  email: "zachdenny18@gmail.com",
};

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="app-root h-screen overflow-hidden flex flex-col text-sm">
    <!-- Brand header -->
    <header class="console-header px-3 sm:px-5 py-3 border-b" style="border-color: var(--border)">
      <div class="flex items-center justify-between gap-3">
        <button type="button" id="logoBtn" class="flex items-center gap-2.5 min-w-0 text-left" title="Home">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: var(--accent-strong)">
            <span class="text-black font-bold text-lg tracking-tighter">Z</span>
          </div>
          <div class="min-w-0">
            <div class="brand-name text-base sm:text-lg truncate">Zachary Odennihy</div>
            <div class="text-[10px] text-muted -mt-0.5 truncate">Automation · Robotics · AI</div>
          </div>
        </button>

        <div class="flex items-center gap-2 shrink-0">
          <a id="headerLinkedIn" class="btn-linkedin" href="https://www.linkedin.com/in/odennihy" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin" aria-hidden="true"></i>
            <span class="hidden xs:inline sm:inline">LinkedIn</span>
          </a>
          <a id="headerEmail" class="btn-ghost-sm desktop-only" href="mailto:zachdenny18@gmail.com">
            <i class="fas fa-envelope" aria-hidden="true"></i>
            <span class="hidden lg:inline">Email</span>
          </a>
          <button type="button" id="searchTrigger" class="icon-btn desktop-only" title="Search (⌘K)" aria-label="Search">
            <i class="fa-solid fa-search" aria-hidden="true"></i>
          </button>
          <button type="button" id="mobileSearchBtn" class="icon-btn mobile-only" title="Search" aria-label="Search">
            <i class="fa-solid fa-search" aria-hidden="true"></i>
          </button>
          <button type="button" class="theme-toggle" id="themeToggle" title="Toggle theme" aria-label="Toggle theme">
            <span class="knob"></span>
          </button>
        </div>
      </div>

      <!-- Always-visible contact strip -->
      <div class="contact-chip-bar mt-2.5 pt-2.5 border-t" style="border-color: var(--border)" id="contactStrip">
        <span class="section-label mr-1">Contact</span>
        <a id="stripLinkedIn" class="btn-ghost-sm" href="https://www.linkedin.com/in/odennihy" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-linkedin" aria-hidden="true"></i> LinkedIn
        </a>
        <a id="stripGitHub" class="btn-ghost-sm" href="https://github.com/Zolocke" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-github" aria-hidden="true"></i> GitHub
        </a>
        <a id="stripEmail" class="btn-ghost-sm" href="mailto:zachdenny18@gmail.com">
          <i class="fas fa-envelope" aria-hidden="true"></i>
          <span id="stripEmailLabel">Email</span>
        </a>
        <div class="ml-auto hidden sm:flex items-center gap-1.5 text-xs text-muted">
          <div class="status-dot" aria-hidden="true"></div>
          <span id="statusText">Loading</span>
          <span class="mono" id="entityCountLabel"></span>
        </div>
      </div>
    </header>

    <!-- Mobile workspace chips -->
    <div class="mobile-filter-row mobile-only flex-col gap-2 px-3 py-2 border-b panel" style="border-color: var(--border)">
      <div class="flex gap-1.5 overflow-x-auto pb-0.5" id="mobileTypeChips"></div>
      <div class="flex gap-1.5 overflow-x-auto" id="mobileTagChips"></div>
    </div>

    <div class="console-shell flex flex-1 overflow-hidden min-h-0">
      <!-- Left Navigation (desktop) -->
      <aside class="sidebar-left w-56 border-r panel flex-col shrink-0" style="border-color: var(--border)">
        <div class="p-3 border-b" style="border-color: var(--border)">
          <div class="section-label mb-2">Workspace</div>
          <div class="space-y-1" id="workspaceNav"></div>
        </div>
        <div class="p-3 flex-1 overflow-auto">
          <div class="section-label mb-2">Filters</div>
          <div class="flex flex-col gap-1" id="tagFilters"></div>
        </div>
        <div class="p-3 border-t text-xs text-muted" style="border-color: var(--border)">
          <div class="flex justify-between">
            <span>Last sync</span>
            <span class="mono" id="lastSync">—</span>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <div class="main-pane flex-1 flex flex-col overflow-hidden min-w-0">
        <div class="desktop-only items-center gap-1 px-4 pt-3">
          <div class="flex items-center rounded-2xl p-1 border surface" style="border-color: var(--border)">
            <button type="button" data-view="list" class="view-tab active px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-2">
              <i class="fa-solid fa-list" aria-hidden="true"></i><span>List</span>
            </button>
            <button type="button" data-view="timeline" class="view-tab px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-2">
              <i class="fa-solid fa-clock" aria-hidden="true"></i><span>Timeline</span>
            </button>
            <button type="button" data-view="graph" class="view-tab px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-2">
              <i class="fa-solid fa-project-diagram" aria-hidden="true"></i><span>Graph</span>
            </button>
            <button type="button" data-view="metrics" class="view-tab px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-2">
              <i class="fa-solid fa-chart-line" aria-hidden="true"></i><span>Metrics</span>
            </button>
          </div>
        </div>

        <div id="view-list" class="list-scroll flex-1 overflow-auto p-3 sm:p-5">
          <div class="flex items-center justify-between mb-3 px-1 gap-2">
            <div class="section-label" id="listHeader">Entities</div>
            <div class="text-[11px] text-muted hidden sm:block">Select to inspect</div>
          </div>
          <div class="space-y-1" id="entity-list"></div>
        </div>

        <div id="view-timeline" class="hidden list-scroll flex-1 overflow-auto p-4 sm:p-6">
          <div class="max-w-3xl mx-auto">
            <div class="section-label mb-6">Career Timeline</div>
            <div id="timeline-content"></div>
          </div>
        </div>

        <div id="view-graph" class="hidden list-scroll flex-1 overflow-auto p-4 sm:p-6">
          <div class="max-w-5xl mx-auto">
            <div class="section-label mb-4">Entity Relationship Graph</div>
            <div class="panel border rounded-3xl p-8 min-h-[320px] flex items-center justify-center" style="border-color: var(--border)" id="graphPanel"></div>
          </div>
        </div>

        <div id="view-metrics" class="hidden list-scroll flex-1 overflow-auto p-4 sm:p-6">
          <div class="max-w-5xl mx-auto" id="metricsPanel"></div>
        </div>
      </div>

      <!-- Right Inspector (desktop) -->
      <aside class="sidebar-right w-80 border-l panel flex-col shrink-0" style="border-color: var(--border)">
        <div class="p-4 border-b" style="border-color: var(--border)">
          <div class="section-label">Inspector</div>
        </div>
        <div id="inspector-content" class="flex-1 overflow-auto p-4"></div>
        <div class="p-3 border-t text-xs" style="border-color: var(--border)">
          <div class="flex justify-between text-muted">
            <span>Shortcuts</span>
            <button type="button" id="showShortcuts" class="cursor-pointer hover:text-accent">show</button>
          </div>
        </div>
      </aside>
    </div>
  </div>

  <!-- Mobile inspector bottom sheet -->
  <div id="mobileInspectorBackdrop" class="mobile-inspector-backdrop hidden" aria-hidden="true"></div>
  <div id="mobileInspectorSheet" class="mobile-inspector-sheet" role="dialog" aria-modal="true" aria-label="Inspector">
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="flex items-center justify-between px-4 pb-2">
      <div class="section-label">Inspector</div>
      <button type="button" id="closeMobileInspector" class="icon-btn" aria-label="Close">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </div>
    <div id="mobile-inspector-content" class="flex-1 overflow-auto px-4 pb-5"></div>
  </div>

  <!-- Command Palette -->
  <div id="command-palette" class="hidden fixed inset-0 flex items-start justify-center pt-16 sm:pt-24 z-[60] px-3" style="background: var(--overlay)">
    <div id="command-palette-panel" class="command-palette w-full max-w-xl panel border rounded-3xl overflow-hidden shadow-2xl" style="border-color: var(--border)">
      <div class="p-4 border-b" style="border-color: var(--border)">
        <input id="command-input" type="text" placeholder="Search entities..."
          class="w-full bg-transparent text-base sm:text-lg outline-none" style="color: var(--text)"
          autocomplete="off" />
      </div>
      <div id="command-results" class="max-h-80 overflow-auto p-2 text-sm"></div>
    </div>
  </div>
`;

initTheme(document.getElementById("themeToggle"));

function isMobile(): boolean {
  return window.matchMedia("(max-width: 900px)").matches;
}

function typeIcon(type: EntityType): string {
  return TYPE_META[type].icon;
}

function countByType(type: EntityType | "all"): number {
  if (type === "all") return entities.length;
  return entities.filter((e) => e.type === type).length;
}

function applyContactLinks(): void {
  const map: Array<[string, string, boolean?]> = [
    ["headerLinkedIn", contactLinks.linkedin, true],
    ["stripLinkedIn", contactLinks.linkedin, true],
    ["headerEmail", `mailto:${contactLinks.email}`],
    ["stripEmail", `mailto:${contactLinks.email}`],
    ["stripGitHub", contactLinks.github, true],
  ];
  for (const [id, href] of map) {
    const el = document.getElementById(id) as HTMLAnchorElement | null;
    if (el) el.href = href;
  }
  const emailLabel = document.getElementById("stripEmailLabel");
  if (emailLabel && !isMobile()) {
    emailLabel.textContent = contactLinks.email;
  }
}

function renderWorkspaceNav(): void {
  const nav = document.getElementById("workspaceNav");
  if (!nav) return;
  const keys: Array<EntityType | "all"> = [
    "all",
    "profile",
    "highlight",
    "project",
    "contact",
    "skill",
  ];
  nav.innerHTML = keys
    .map((key) => {
      const meta = TYPE_META[key];
      const active = currentFilter === key && !currentTag ? "active" : "";
      return `
        <button type="button" data-filter="${key}"
          class="nav-item ${active} flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer w-full text-left">
          <div class="flex items-center gap-3">
            <i class="fa-solid ${meta.icon} w-4 text-center" aria-hidden="true"></i>
            <span>${meta.label}</span>
          </div>
          <span class="mono text-xs text-muted">${countByType(key)}</span>
        </button>`;
    })
    .join("");

  nav.querySelectorAll<HTMLButtonElement>("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentTag = null;
      filterByType((btn.dataset.filter as EntityType | "all") || "all");
    });
  });

  renderMobileTypeChips();
}

function renderMobileTypeChips(): void {
  const el = document.getElementById("mobileTypeChips");
  if (!el) return;
  const keys: Array<EntityType | "all"> = [
    "all",
    "highlight",
    "project",
    "contact",
    "skill",
  ];
  el.innerHTML = keys
    .map((key) => {
      const active = currentFilter === key && !currentTag ? "active" : "";
      return `<button type="button" data-mfilter="${key}" class="chip-filter ${active}">${TYPE_META[key].label}</button>`;
    })
    .join("");
  el.querySelectorAll<HTMLButtonElement>("[data-mfilter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentTag = null;
      filterByType((btn.dataset.mfilter as EntityType | "all") || "all");
    });
  });
}

function renderTagFilters(): void {
  const available = new Set(entities.flatMap((e) => e.tags.map((t) => t.toLowerCase())));
  const tags = QUICK_TAGS.filter((t) => available.has(t));

  const desktop = document.getElementById("tagFilters");
  if (desktop) {
    desktop.innerHTML =
      tags.length === 0
        ? `<div class="text-xs text-muted px-1">No filters</div>`
        : tags
            .map(
              (tag) => `
      <button type="button" data-tag="${escapeHtml(tag)}"
        class="chip-filter w-full text-left ${currentTag === tag ? "active" : ""}">
        ${escapeHtml(tag)}
      </button>`
            )
            .join("");
    desktop.querySelectorAll<HTMLButtonElement>("[data-tag]").forEach((btn) => {
      btn.addEventListener("click", () => toggleTag(btn.dataset.tag || null));
    });
  }

  const mobile = document.getElementById("mobileTagChips");
  if (mobile) {
    mobile.innerHTML = tags
      .map(
        (tag) =>
          `<button type="button" data-mtag="${escapeHtml(tag)}" class="chip-filter ${
            currentTag === tag ? "active" : ""
          }">${escapeHtml(tag)}</button>`
      )
      .join("");
    mobile.querySelectorAll<HTMLButtonElement>("[data-mtag]").forEach((btn) => {
      btn.addEventListener("click", () => toggleTag(btn.dataset.mtag || null));
    });
  }
}

function toggleTag(tag: string | null): void {
  currentTag = currentTag === tag ? null : tag;
  currentFilter = "all";
  applyFilters();
  renderWorkspaceNav();
  renderTagFilters();
}

function filteredEntities(): Entity[] {
  let list = entities;
  if (currentFilter !== "all") list = list.filter((e) => e.type === currentFilter);
  if (currentTag !== null) {
    const tag = currentTag.toLowerCase();
    list = list.filter((e) => e.tags.some((t) => t.toLowerCase() === tag));
  }
  return list;
}

function filterByType(type: EntityType | "all"): void {
  currentFilter = type;
  applyFilters();
  renderWorkspaceNav();
  renderTagFilters();
}

function applyFilters(): void {
  const list = filteredEntities();
  const header = document.getElementById("listHeader");
  if (header) {
    const label =
      currentTag != null
        ? currentTag
        : currentFilter === "all"
          ? "Entities"
          : TYPE_META[currentFilter].label;
    header.textContent = `${label} · ${list.length}`;
  }
  renderEntityList(list);
  if (currentView === "timeline") renderTimeline();
  if (currentView === "graph") renderGraph();
  if (currentView === "metrics") renderMetrics();
}

function renderEntityList(list: Entity[]): void {
  const container = document.getElementById("entity-list");
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = `<div class="px-4 py-8 text-muted text-center">No entities match this filter.</div>`;
    return;
  }

  container.innerHTML = list
    .map((entity) => {
      const selected = currentSelection === entity.id ? "selected" : "";
      return `
      <button type="button" data-id="${escapeHtml(entity.id)}"
        class="entity-row ${selected} flex items-center justify-between px-3 sm:px-4 py-3 rounded-2xl cursor-pointer w-full text-left">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-2xl flex items-center justify-center text-xs shrink-0 badge">
            <i class="fa-solid ${entity.icon}" aria-hidden="true"></i>
          </div>
          <div class="min-w-0">
            <div class="font-medium truncate">${escapeHtml(entity.title)}</div>
            <div class="text-xs text-muted truncate">${escapeHtml(entity.subtitle)}</div>
          </div>
        </div>
        <div class="flex items-center gap-2 text-xs shrink-0 ml-2">
          <div class="px-2.5 py-1 rounded-xl badge">${escapeHtml(entity.status)}</div>
        </div>
      </button>`;
    })
    .join("");

  container.querySelectorAll<HTMLButtonElement>("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectEntity(row.dataset.id || ""));
  });
}

function inspectorHtml(entity: Entity): string {
  const metricsHtml =
    entity.metrics && Object.keys(entity.metrics).length
      ? `
    <div class="mb-5">
      <div class="section-label mb-2">Metrics</div>
      <div class="grid grid-cols-2 gap-2">
        ${Object.entries(entity.metrics)
          .map(
            ([key, value]) => `
          <div class="surface border rounded-2xl p-3" style="border-color: var(--border)">
            <div class="text-xs text-muted">${escapeHtml(key)}</div>
            <div class="metric-value text-lg mt-1">${escapeHtml(value)}</div>
          </div>`
          )
          .join("")}
      </div>
    </div>`
      : "";

  const linksHtml =
    entity.links && entity.links.length
      ? `
    <div class="mb-5">
      <div class="section-label mb-2">Links</div>
      <div class="flex flex-col gap-2">
        ${entity.links
          .map((link) => {
            const isLinkedIn = /linkedin/i.test(link.label) || /linkedin\.com/i.test(link.href);
            const target = link.external ? ' target="_blank" rel="noopener noreferrer"' : "";
            if (isLinkedIn) {
              return `<a href="${escapeHtml(link.href)}" class="btn-linkedin justify-center"${target}>
                <i class="fab fa-linkedin" aria-hidden="true"></i> ${escapeHtml(link.label)}
              </a>`;
            }
            return `<a href="${escapeHtml(link.href)}" class="btn-ghost-sm justify-center"${target}>${escapeHtml(link.label)}</a>`;
          })
          .join("")}
      </div>
    </div>`
      : "";

  const relatedHtml =
    entity.related && entity.related.length
      ? `
    <div>
      <div class="section-label mb-2">Related</div>
      <div class="space-y-1 text-sm">
        ${entity.related
          .map((relId) => {
            const rel = entities.find((e) => e.id === relId);
            if (!rel) return "";
            return `<button type="button" data-rel="${escapeHtml(rel.id)}" class="block w-full text-left cursor-pointer hover:text-accent py-1">${escapeHtml(rel.title)}</button>`;
          })
          .join("")}
      </div>
    </div>`
      : "";

  return `
    <div class="mb-4">
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <div class="px-3 py-1 text-xs rounded-2xl badge">${escapeHtml(entity.type.toUpperCase())}</div>
        <div class="px-3 py-1 text-xs rounded-2xl badge">${escapeHtml(entity.status)}</div>
      </div>
      <div class="heading text-xl sm:text-2xl tracking-tight">${escapeHtml(entity.title)}</div>
      <div class="text-muted mt-1 text-sm">${escapeHtml(entity.subtitle)}</div>
    </div>
    <div class="mb-5">
      <div class="section-label mb-2">Description</div>
      <div class="text-muted leading-relaxed text-sm">${escapeHtml(entity.description)}</div>
    </div>
    ${metricsHtml}
    ${linksHtml}
    ${relatedHtml}
  `;
}

function wireInspectorRel(root: HTMLElement): void {
  root.querySelectorAll<HTMLButtonElement>("[data-rel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchView("list");
      selectEntity(btn.dataset.rel || "");
    });
  });
}

function openMobileInspector(): void {
  document.getElementById("mobileInspectorSheet")?.classList.add("open");
  document.getElementById("mobileInspectorBackdrop")?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeMobileInspector(): void {
  document.getElementById("mobileInspectorSheet")?.classList.remove("open");
  document.getElementById("mobileInspectorBackdrop")?.classList.add("hidden");
  document.body.style.overflow = "";
}

function selectEntity(id: string): void {
  const entity = entities.find((e) => e.id === id);
  if (!entity) return;
  currentSelection = id;
  document.querySelectorAll(".entity-row").forEach((row) => {
    row.classList.toggle("selected", (row as HTMLElement).dataset.id === id);
  });

  const html = inspectorHtml(entity);
  const desktop = document.getElementById("inspector-content");
  if (desktop) {
    desktop.innerHTML = html;
    wireInspectorRel(desktop);
  }
  const mobile = document.getElementById("mobile-inspector-content");
  if (mobile) {
    mobile.innerHTML = html;
    wireInspectorRel(mobile);
  }

  if (isMobile()) openMobileInspector();
}

function emptyInspector(): void {
  const html = `
    <div class="text-center text-muted mt-10">
      <i class="fa-solid fa-info-circle text-3xl mb-3 opacity-40" aria-hidden="true"></i>
      <div class="text-sm">Select an entity to inspect</div>
    </div>`;
  const desktop = document.getElementById("inspector-content");
  if (desktop) desktop.innerHTML = html;
  const mobile = document.getElementById("mobile-inspector-content");
  if (mobile) mobile.innerHTML = html;
}

function switchView(view: typeof currentView): void {
  currentView = view;
  document.querySelectorAll('[id^="view-"]').forEach((el) => el.classList.add("hidden"));
  document.querySelectorAll(".view-tab").forEach((el) => el.classList.remove("active"));
  document.getElementById(`view-${view}`)?.classList.remove("hidden");
  document.querySelector(`.view-tab[data-view="${view}"]`)?.classList.add("active");
  if (view === "timeline") renderTimeline();
  if (view === "graph") renderGraph();
  if (view === "metrics") renderMetrics();
}

function renderTimeline(): void {
  const container = document.getElementById("timeline-content");
  if (!container) return;
  const sorted = [...filteredEntities()].sort((a, b) =>
    b.lastModified.localeCompare(a.lastModified)
  );
  container.innerHTML = sorted
    .map(
      (entity) => `
    <button type="button" data-tl="${escapeHtml(entity.id)}"
      class="flex gap-4 sm:gap-6 border-l-2 pl-4 sm:pl-6 pb-6 last:pb-0 w-full text-left cursor-pointer"
      style="border-color: var(--border)">
      <div class="w-20 sm:w-24 text-xs mono text-muted pt-1 shrink-0">${escapeHtml(entity.lastModified)}</div>
      <div class="flex-1 min-w-0">
        <div class="font-medium">${escapeHtml(entity.title)}</div>
        <div class="text-sm text-muted">${escapeHtml(entity.subtitle)}</div>
        <div class="mt-1 text-xs inline-block px-2.5 py-0.5 rounded badge">${escapeHtml(entity.status)}</div>
      </div>
    </button>`
    )
    .join("");
  container.querySelectorAll<HTMLButtonElement>("[data-tl]").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchView("list");
      setTimeout(() => selectEntity(btn.dataset.tl || ""), 40);
    });
  });
}

function renderGraph(): void {
  const panel = document.getElementById("graphPanel");
  if (!panel) return;
  const projects = entities.filter((e) => e.type === "project").length;
  const highlights = entities.filter((e) => e.type === "highlight").length;
  panel.innerHTML = `
    <div class="text-center w-full">
      <i class="fa-solid fa-project-diagram text-5xl mb-4 opacity-30" style="color: var(--border)" aria-hidden="true"></i>
      <div class="text-lg text-muted">Portfolio entity graph</div>
      <div class="text-xs mt-1 text-muted mono">${entities.length} nodes</div>
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-md mx-auto">
        <div class="surface border p-3 rounded-2xl" style="border-color: var(--border)">
          <div class="text-accent text-xs">Focus</div>
          <div class="font-medium">Robotics</div>
        </div>
        <div class="surface border p-3 rounded-2xl" style="border-color: var(--border)">
          <div class="text-accent text-xs">Projects</div>
          <div class="font-medium">${projects}</div>
        </div>
        <div class="surface border p-3 rounded-2xl" style="border-color: var(--border)">
          <div class="text-accent text-xs">Highlights</div>
          <div class="font-medium">${highlights}</div>
        </div>
      </div>
    </div>`;
}

function renderMetrics(): void {
  const panel = document.getElementById("metricsPanel");
  if (!panel) return;
  const repos = entities.filter((e) => e.type === "project" && e.id.startsWith("gh-")).length;
  const highlights = entities.filter((e) => e.type === "highlight").length;
  const skills = entities.filter((e) => e.type === "skill").length;
  panel.innerHTML = `
    <div class="section-label mb-4">Portfolio Activity</div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="panel border rounded-3xl p-4" style="border-color: var(--border)">
        <div class="text-xs text-muted">Entities</div>
        <div class="metric-value text-3xl mt-1">${entities.length}</div>
      </div>
      <div class="panel border rounded-3xl p-4" style="border-color: var(--border)">
        <div class="text-xs text-muted">Highlights</div>
        <div class="metric-value text-3xl mt-1">${highlights}</div>
      </div>
      <div class="panel border rounded-3xl p-4" style="border-color: var(--border)">
        <div class="text-xs text-muted">GitHub</div>
        <div class="metric-value text-3xl mt-1">${repos || "—"}</div>
      </div>
      <div class="panel border rounded-3xl p-4" style="border-color: var(--border)">
        <div class="text-xs text-muted">Skills</div>
        <div class="metric-value text-3xl mt-1">${skills}</div>
      </div>
    </div>
    <div class="panel border rounded-3xl p-5" style="border-color: var(--border)">
      <div class="section-label mb-3">Focus</div>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span>Automation & robotics</span><span class="mono text-xs text-muted">primary</span></div>
        <div class="flex justify-between"><span>AI / software</span><span class="mono text-xs text-muted">in progress</span></div>
        <div class="flex justify-between"><span>Personal projects</span><span class="mono text-xs text-muted">side</span></div>
      </div>
    </div>`;
}

function showCommandPalette(): void {
  const modal = document.getElementById("command-palette");
  const input = document.getElementById("command-input") as HTMLInputElement | null;
  modal?.classList.remove("hidden");
  if (input) {
    input.value = "";
    input.focus();
  }
  updateCommandResults("");
}

function hideCommandPalette(): void {
  document.getElementById("command-palette")?.classList.add("hidden");
}

function updateCommandResults(query: string): void {
  const container = document.getElementById("command-results");
  if (!container) return;
  const q = query.toLowerCase().trim();
  const results = entities
    .filter(
      (e) =>
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    )
    .slice(0, 8);

  if (results.length === 0) {
    container.innerHTML = `<div class="px-4 py-3 text-muted">No matches</div>`;
    return;
  }

  container.innerHTML = results
    .map(
      (entity) => `
    <button type="button" data-cmd="${escapeHtml(entity.id)}"
      class="px-4 py-3 rounded-2xl cursor-pointer flex items-center gap-3 w-full text-left"
      style="background: transparent" onmouseover="this.style.background='var(--border)'" onmouseout="this.style.background='transparent'">
      <div class="w-8 h-8 rounded-xl flex items-center justify-center badge shrink-0">
        <i class="fa-solid ${entity.icon}" aria-hidden="true"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="truncate">${escapeHtml(entity.title)}</div>
        <div class="text-xs text-muted truncate">${escapeHtml(entity.subtitle)}</div>
      </div>
    </button>`
    )
    .join("");

  container.querySelectorAll<HTMLButtonElement>("[data-cmd]").forEach((btn) => {
    btn.addEventListener("click", () => {
      hideCommandPalette();
      switchView("list");
      setTimeout(() => selectEntity(btn.dataset.cmd || ""), 60);
    });
  });
}

function buildEntities(data: ResumeData, githubRepos: Entity[] = []): Entity[] {
  const highlights = buildHighlights(data);
  const updated = data.meta.last_updated;

  const profile: Entity = {
    id: "profile",
    type: "profile",
    title: data.profile.name,
    subtitle: data.profile.headline,
    lastModified: updated,
    tags: ["robotics", "automation", "ai"],
    status: "Active",
    description: ABOUT_BLURB,
    metrics: {
      location: "Washington",
      focus: "Robotics",
      company: data.experience?.[0]?.company || "—",
    },
    links: [
      { label: "LinkedIn", href: data.contact.linkedin, external: true },
      { label: "GitHub", href: data.contact.github, external: true },
      { label: data.contact.email, href: `mailto:${data.contact.email}` },
    ],
    related: ["contact", ...highlights.slice(0, 2).map((h) => `hl-${h.id}`)],
    icon: typeIcon("profile"),
  };

  const highlightEntities: Entity[] = highlights.map((h) => ({
    id: `hl-${h.id}`,
    type: "highlight",
    title: h.title,
    subtitle: `${h.org} · ${h.period}`,
    lastModified: updated,
    tags: [h.tag.toLowerCase()],
    status: h.tag,
    description: h.blurb,
    metrics: { org: h.org, period: h.period },
    related: ["profile"],
    icon: typeIcon("highlight"),
  }));

  const paper: Entity = {
    id: "project-paper",
    type: "project",
    title: "Paper",
    subtitle: "Narrative idle game · hosted here",
    lastModified: updated,
    tags: ["github"],
    status: "Live",
    description:
      "Narrative idle game — progress is a letter writing itself on a single page of parchment.",
    metrics: { stack: "HTML · CSS · JS" },
    links: [{ label: "Play on this site →", href: "paper-game/" }],
    related: ["profile"],
    icon: typeIcon("project"),
  };

  const contact: Entity = {
    id: "contact",
    type: "contact",
    title: "Contact",
    subtitle: "Email · GitHub · LinkedIn",
    lastModified: updated,
    tags: [],
    status: "Open",
    description:
      "Open to conversations about automation, robotics operations, and software/AI projects.",
    links: [
      { label: "LinkedIn", href: data.contact.linkedin, external: true },
      { label: "GitHub", href: data.contact.github, external: true },
      { label: data.contact.email, href: `mailto:${data.contact.email}` },
    ],
    related: ["profile"],
    icon: typeIcon("contact"),
  };

  const skillEntities: Entity[] = (data.top_skills || []).map((skill, i) => ({
    id: `skill-${i}`,
    type: "skill",
    title: skill,
    subtitle: "Core skill",
    lastModified: updated,
    tags: [],
    status: "Active",
    description: `${skill} — listed among top skills on the portfolio.`,
    related: ["profile"],
    icon: typeIcon("skill"),
  }));

  return [profile, ...highlightEntities, paper, ...githubRepos, contact, ...skillEntities];
}

async function loadGitHub(username: string): Promise<Entity[]> {
  if (!navigator.onLine) return [];
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`
      ),
    ]);
    if (!userRes.ok || !reposRes.ok) return [];
    const user = await userRes.json();
    const repos = await reposRes.json();
    if (!Array.isArray(repos)) return [];

    return repos
      .filter((r: { fork?: boolean }) => !r.fork)
      .slice(0, 6)
      .map(
        (repo: {
          name: string;
          description: string | null;
          html_url: string;
          full_name: string;
          language: string | null;
          updated_at: string;
          stargazers_count?: number;
        }) => {
          const date = (repo.updated_at || "").slice(0, 10);
          return {
            id: `gh-${repo.name}`,
            type: "project" as const,
            title: repo.name,
            subtitle: repo.description || "GitHub repository",
            lastModified: date || "—",
            tags: ["github"],
            status: "Public",
            description: repo.description || "No description provided.",
            metrics: {
              language: repo.language || "—",
              stars: repo.stargazers_count ?? 0,
              repos: user.public_repos ?? "—",
            },
            links: [{ label: repo.full_name, href: repo.html_url, external: true }],
            related: ["profile", "project-paper"],
            icon: typeIcon("project"),
          } satisfies Entity;
        }
      );
  } catch (err) {
    console.error("GitHub load failed", err);
    return [];
  }
}

async function boot(): Promise<void> {
  emptyInspector();
  const status = document.getElementById("statusText");
  try {
    const res = await fetch("data/resume.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    resumeData = (await res.json()) as ResumeData;
    contactLinks = {
      linkedin: resumeData.contact.linkedin || contactLinks.linkedin,
      github: resumeData.contact.github || contactLinks.github,
      email: resumeData.contact.email || contactLinks.email,
    };
    applyContactLinks();

    const gh = await loadGitHub(resumeData.github_config?.username || "Zolocke");
    entities = buildEntities(resumeData, gh);

    if (status) status.textContent = "Synced";
    const sync = document.getElementById("lastSync");
    if (sync) sync.textContent = resumeData.meta.last_updated;
    const count = document.getElementById("entityCountLabel");
    if (count) count.textContent = `· ${entities.length}`;

    renderWorkspaceNav();
    renderTagFilters();
    applyFilters();

    // Desktop: auto-select profile. Mobile: leave closed until tap.
    if (!isMobile()) selectEntity("profile");
    else {
      currentSelection = "profile";
      document.querySelectorAll(".entity-row").forEach((row) => {
        row.classList.toggle(
          "selected",
          (row as HTMLElement).dataset.id === "profile"
        );
      });
    }
  } catch (err) {
    console.error(err);
    if (status) status.textContent = "Error";
    entities = [
      {
        id: "error",
        type: "profile",
        title: "Unable to load data",
        subtitle: "data/resume.json",
        lastModified: "—",
        tags: [],
        status: "Error",
        description: "Could not load data/resume.json.",
        icon: "fa-triangle-exclamation",
      },
    ];
    renderWorkspaceNav();
    applyFilters();
  }
}

/* wire UI */
document.getElementById("searchTrigger")?.addEventListener("click", showCommandPalette);
document.getElementById("mobileSearchBtn")?.addEventListener("click", showCommandPalette);
document.getElementById("logoBtn")?.addEventListener("click", () => {
  currentTag = null;
  filterByType("all");
  switchView("list");
  closeMobileInspector();
  if (!isMobile() && entities.find((e) => e.id === "profile")) selectEntity("profile");
});

document.getElementById("closeMobileInspector")?.addEventListener("click", closeMobileInspector);
document.getElementById("mobileInspectorBackdrop")?.addEventListener("click", closeMobileInspector);

document.querySelectorAll<HTMLButtonElement>(".view-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    switchView((btn.dataset.view || "list") as typeof currentView);
  });
});

document.getElementById("command-palette")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) hideCommandPalette();
});
document.getElementById("command-palette-panel")?.addEventListener("click", (e) => {
  e.stopPropagation();
});

const cmdInput = document.getElementById("command-input") as HTMLInputElement | null;
cmdInput?.addEventListener("input", () => updateCommandResults(cmdInput.value));
cmdInput?.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideCommandPalette();
  if (e.key === "Enter") {
    document.querySelector<HTMLButtonElement>("#command-results [data-cmd]")?.click();
  }
});

document.getElementById("showShortcuts")?.addEventListener("click", () => {
  window.alert(
    `Keyboard Shortcuts\n\n⌘K or / — Search\n1–4 — Views (desktop)\nEsc — Close`
  );
});

document.addEventListener("keydown", (e) => {
  const paletteOpen = !document.getElementById("command-palette")?.classList.contains("hidden");
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    showCommandPalette();
    return;
  }
  if (e.key === "/" && document.activeElement?.tagName === "BODY") {
    e.preventDefault();
    showCommandPalette();
    return;
  }
  if (e.key === "Escape") {
    if (paletteOpen) hideCommandPalette();
    else closeMobileInspector();
    return;
  }
  if (paletteOpen || isMobile()) return;
  if (e.key === "1") switchView("list");
  if (e.key === "2") switchView("timeline");
  if (e.key === "3") switchView("graph");
  if (e.key === "4") switchView("metrics");
});

window.addEventListener("resize", () => {
  if (!isMobile()) closeMobileInspector();
});

console.log("%c[Precision Console] Portfolio ready. Try ⌘K.", "color:#c45c26");
void boot();
