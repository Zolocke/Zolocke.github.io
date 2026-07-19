(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}var t=`lark-portfolio-theme`;function n(e){let t=document.documentElement;e===`light`?t.setAttribute(`data-theme`,`light`):t.removeAttribute(`data-theme`)}function r(e){n(localStorage.getItem(t)||`dark`),e?.addEventListener(`click`,()=>{let e=(document.documentElement.getAttribute(`data-theme`)===`light`?`light`:`dark`)==`light`?`dark`:`light`;n(e),localStorage.setItem(t,e)})}var i=`I build automation and robotics systems. At Symbotic I operate and maintain robotic fleet systems, PLC safety devices, conveyors, and ABB robotic arms — while studying AI Engineering and shipping personal software projects.`;function a(e){let t=e.military_service,n=e.education.find(e=>e.status===`In Progress`);return[{id:`symbotic-aso`,title:`Automation System Operator`,org:`Symbotic`,period:`Jul 2025 — Present`,blurb:`Fleet/system operator role: conveyors, PLC safety devices, Rovers, and ABB robotic arms under LOTO — partnering with engineers and trainers on live automation systems.`,tag:`Robotics`},{id:`symbotic-ro`,title:`Robotics Operator → Trainer track`,org:`Symbotic`,period:`May 2024 — Aug 2025`,blurb:`Robotic cell operations, training responsibilities, and workflow optimization with sensor data and robot programming feedback loops.`,tag:`Automation`},{id:`gm`,title:`Restaurant General Manager`,org:`Walter Enterprises`,period:`2017 — 2023`,blurb:`Opened and scaled daily operations (150–300 customers/day by year two). Hiring, training, inventory, cash flow, and quality standards.`,tag:`Leadership`},{id:`military`,title:`${t.rank} · ${t.mos}`,org:t.branch,period:t.service_period,blurb:`${t.deployment.operation} — ${t.deployment.type} (${t.deployment.location}). ${t.unit}.`,tag:`Service`},...n?[{id:`edu`,title:n.credential,org:n.institution,period:`${n.start} — ${n.end}`,blurb:`${n.status}. Building software and AI skills alongside hands-on robotics work.`,tag:`Education`}]:[]].slice(0,5)}var o=[`robotics`,`automation`,`leadership`,`github`,`ai`],s={all:{label:`All`,icon:`fa-th-large`},profile:{label:`Profile`,icon:`fa-id-card`},highlight:{label:`Highlights`,icon:`fa-star`},project:{label:`Projects`,icon:`fa-folder`},contact:{label:`Contact`,icon:`fa-envelope`},skill:{label:`Skills`,icon:`fa-code`}},c=[],l=`all`,u=null,d=null,f=`list`,p=null,m={linkedin:`https://www.linkedin.com/in/odennihy`,github:`https://github.com/Zolocke`,email:`zachdenny18@gmail.com`},h=document.querySelector(`#app`);h.innerHTML=`
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
`,r(document.getElementById(`themeToggle`));function g(){return window.matchMedia(`(max-width: 900px)`).matches}function _(e){return s[e].icon}function v(e){return e===`all`?c.length:c.filter(t=>t.type===e).length}function y(){let e=[[`headerLinkedIn`,m.linkedin,!0],[`stripLinkedIn`,m.linkedin,!0],[`headerEmail`,`mailto:${m.email}`],[`stripEmail`,`mailto:${m.email}`],[`stripGitHub`,m.github,!0]];for(let[t,n]of e){let e=document.getElementById(t);e&&(e.href=n)}let t=document.getElementById(`stripEmailLabel`);t&&!g()&&(t.textContent=m.email)}function b(){let e=document.getElementById(`workspaceNav`);e&&(e.innerHTML=[`all`,`profile`,`highlight`,`project`,`contact`,`skill`].map(e=>{let t=s[e];return`
        <button type="button" data-filter="${e}"
          class="nav-item ${l===e&&!u?`active`:``} flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer w-full text-left">
          <div class="flex items-center gap-3">
            <i class="fa-solid ${t.icon} w-4 text-center" aria-hidden="true"></i>
            <span>${t.label}</span>
          </div>
          <span class="mono text-xs text-muted">${v(e)}</span>
        </button>`}).join(``),e.querySelectorAll(`[data-filter]`).forEach(e=>{e.addEventListener(`click`,()=>{u=null,T(e.dataset.filter||`all`)})}),x())}function x(){let e=document.getElementById(`mobileTypeChips`);e&&(e.innerHTML=[`all`,`highlight`,`project`,`contact`,`skill`].map(e=>`<button type="button" data-mfilter="${e}" class="chip-filter ${l===e&&!u?`active`:``}">${s[e].label}</button>`).join(``),e.querySelectorAll(`[data-mfilter]`).forEach(e=>{e.addEventListener(`click`,()=>{u=null,T(e.dataset.mfilter||`all`)})}))}function S(){let t=new Set(c.flatMap(e=>e.tags.map(e=>e.toLowerCase()))),n=o.filter(e=>t.has(e)),r=document.getElementById(`tagFilters`);r&&(r.innerHTML=n.length===0?`<div class="text-xs text-muted px-1">No filters</div>`:n.map(t=>`
      <button type="button" data-tag="${e(t)}"
        class="chip-filter w-full text-left ${u===t?`active`:``}">
        ${e(t)}
      </button>`).join(``),r.querySelectorAll(`[data-tag]`).forEach(e=>{e.addEventListener(`click`,()=>C(e.dataset.tag||null))}));let i=document.getElementById(`mobileTagChips`);i&&(i.innerHTML=n.map(t=>`<button type="button" data-mtag="${e(t)}" class="chip-filter ${u===t?`active`:``}">${e(t)}</button>`).join(``),i.querySelectorAll(`[data-mtag]`).forEach(e=>{e.addEventListener(`click`,()=>C(e.dataset.mtag||null))}))}function C(e){u=u===e?null:e,l=`all`,E(),b(),S()}function w(){let e=c;if(l!==`all`&&(e=e.filter(e=>e.type===l)),u!==null){let t=u.toLowerCase();e=e.filter(e=>e.tags.some(e=>e.toLowerCase()===t))}return e}function T(e){l=e,E(),b(),S()}function E(){let e=w(),t=document.getElementById(`listHeader`);t&&(t.textContent=`${u??(l===`all`?`Entities`:s[l].label)} · ${e.length}`),D(e),f===`timeline`&&F(),f===`graph`&&I(),f===`metrics`&&L()}function D(t){let n=document.getElementById(`entity-list`);if(n){if(t.length===0){n.innerHTML=`<div class="px-4 py-8 text-muted text-center">No entities match this filter.</div>`;return}n.innerHTML=t.map(t=>{let n=d===t.id?`selected`:``;return`
      <button type="button" data-id="${e(t.id)}"
        class="entity-row ${n} flex items-center justify-between px-3 sm:px-4 py-3 rounded-2xl cursor-pointer w-full text-left">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-2xl flex items-center justify-center text-xs shrink-0 badge">
            <i class="fa-solid ${t.icon}" aria-hidden="true"></i>
          </div>
          <div class="min-w-0">
            <div class="font-medium truncate">${e(t.title)}</div>
            <div class="text-xs text-muted truncate">${e(t.subtitle)}</div>
          </div>
        </div>
        <div class="flex items-center gap-2 text-xs shrink-0 ml-2">
          <div class="px-2.5 py-1 rounded-xl badge">${e(t.status)}</div>
        </div>
      </button>`}).join(``),n.querySelectorAll(`[data-id]`).forEach(e=>{e.addEventListener(`click`,()=>M(e.dataset.id||``))})}}function O(t){let n=t.metrics&&Object.keys(t.metrics).length?`
    <div class="mb-5">
      <div class="section-label mb-2">Metrics</div>
      <div class="grid grid-cols-2 gap-2">
        ${Object.entries(t.metrics).map(([t,n])=>`
          <div class="surface border rounded-2xl p-3" style="border-color: var(--border)">
            <div class="text-xs text-muted">${e(t)}</div>
            <div class="metric-value text-lg mt-1">${e(n)}</div>
          </div>`).join(``)}
      </div>
    </div>`:``,r=t.links&&t.links.length?`
    <div class="mb-5">
      <div class="section-label mb-2">Links</div>
      <div class="flex flex-col gap-2">
        ${t.links.map(t=>{let n=/linkedin/i.test(t.label)||/linkedin\.com/i.test(t.href),r=t.external?` target="_blank" rel="noopener noreferrer"`:``;return n?`<a href="${e(t.href)}" class="btn-linkedin justify-center"${r}>
                <i class="fab fa-linkedin" aria-hidden="true"></i> ${e(t.label)}
              </a>`:`<a href="${e(t.href)}" class="btn-ghost-sm justify-center"${r}>${e(t.label)}</a>`}).join(``)}
      </div>
    </div>`:``,i=t.related&&t.related.length?`
    <div>
      <div class="section-label mb-2">Related</div>
      <div class="space-y-1 text-sm">
        ${t.related.map(t=>{let n=c.find(e=>e.id===t);return n?`<button type="button" data-rel="${e(n.id)}" class="block w-full text-left cursor-pointer hover:text-accent py-1">${e(n.title)}</button>`:``}).join(``)}
      </div>
    </div>`:``;return`
    <div class="mb-4">
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <div class="px-3 py-1 text-xs rounded-2xl badge">${e(t.type.toUpperCase())}</div>
        <div class="px-3 py-1 text-xs rounded-2xl badge">${e(t.status)}</div>
      </div>
      <div class="heading text-xl sm:text-2xl tracking-tight">${e(t.title)}</div>
      <div class="text-muted mt-1 text-sm">${e(t.subtitle)}</div>
    </div>
    <div class="mb-5">
      <div class="section-label mb-2">Description</div>
      <div class="text-muted leading-relaxed text-sm">${e(t.description)}</div>
    </div>
    ${n}
    ${r}
    ${i}
  `}function k(e){e.querySelectorAll(`[data-rel]`).forEach(e=>{e.addEventListener(`click`,()=>{P(`list`),M(e.dataset.rel||``)})})}function A(){document.getElementById(`mobileInspectorSheet`)?.classList.add(`open`),document.getElementById(`mobileInspectorBackdrop`)?.classList.remove(`hidden`),document.body.style.overflow=`hidden`}function j(){document.getElementById(`mobileInspectorSheet`)?.classList.remove(`open`),document.getElementById(`mobileInspectorBackdrop`)?.classList.add(`hidden`),document.body.style.overflow=``}function M(e){let t=c.find(t=>t.id===e);if(!t)return;d=e,document.querySelectorAll(`.entity-row`).forEach(t=>{t.classList.toggle(`selected`,t.dataset.id===e)});let n=O(t),r=document.getElementById(`inspector-content`);r&&(r.innerHTML=n,k(r));let i=document.getElementById(`mobile-inspector-content`);i&&(i.innerHTML=n,k(i)),g()&&A()}function N(){let e=`
    <div class="text-center text-muted mt-10">
      <i class="fa-solid fa-info-circle text-3xl mb-3 opacity-40" aria-hidden="true"></i>
      <div class="text-sm">Select an entity to inspect</div>
    </div>`,t=document.getElementById(`inspector-content`);t&&(t.innerHTML=e);let n=document.getElementById(`mobile-inspector-content`);n&&(n.innerHTML=e)}function P(e){f=e,document.querySelectorAll(`[id^="view-"]`).forEach(e=>e.classList.add(`hidden`)),document.querySelectorAll(`.view-tab`).forEach(e=>e.classList.remove(`active`)),document.getElementById(`view-${e}`)?.classList.remove(`hidden`),document.querySelector(`.view-tab[data-view="${e}"]`)?.classList.add(`active`),e===`timeline`&&F(),e===`graph`&&I(),e===`metrics`&&L()}function F(){let t=document.getElementById(`timeline-content`);t&&(t.innerHTML=[...w()].sort((e,t)=>t.lastModified.localeCompare(e.lastModified)).map(t=>`
    <button type="button" data-tl="${e(t.id)}"
      class="flex gap-4 sm:gap-6 border-l-2 pl-4 sm:pl-6 pb-6 last:pb-0 w-full text-left cursor-pointer"
      style="border-color: var(--border)">
      <div class="w-20 sm:w-24 text-xs mono text-muted pt-1 shrink-0">${e(t.lastModified)}</div>
      <div class="flex-1 min-w-0">
        <div class="font-medium">${e(t.title)}</div>
        <div class="text-sm text-muted">${e(t.subtitle)}</div>
        <div class="mt-1 text-xs inline-block px-2.5 py-0.5 rounded badge">${e(t.status)}</div>
      </div>
    </button>`).join(``),t.querySelectorAll(`[data-tl]`).forEach(e=>{e.addEventListener(`click`,()=>{P(`list`),setTimeout(()=>M(e.dataset.tl||``),40)})}))}function I(){let e=document.getElementById(`graphPanel`);if(!e)return;let t=c.filter(e=>e.type===`project`).length,n=c.filter(e=>e.type===`highlight`).length;e.innerHTML=`
    <div class="text-center w-full">
      <i class="fa-solid fa-project-diagram text-5xl mb-4 opacity-30" style="color: var(--border)" aria-hidden="true"></i>
      <div class="text-lg text-muted">Portfolio entity graph</div>
      <div class="text-xs mt-1 text-muted mono">${c.length} nodes</div>
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-md mx-auto">
        <div class="surface border p-3 rounded-2xl" style="border-color: var(--border)">
          <div class="text-accent text-xs">Focus</div>
          <div class="font-medium">Robotics</div>
        </div>
        <div class="surface border p-3 rounded-2xl" style="border-color: var(--border)">
          <div class="text-accent text-xs">Projects</div>
          <div class="font-medium">${t}</div>
        </div>
        <div class="surface border p-3 rounded-2xl" style="border-color: var(--border)">
          <div class="text-accent text-xs">Highlights</div>
          <div class="font-medium">${n}</div>
        </div>
      </div>
    </div>`}function L(){let e=document.getElementById(`metricsPanel`);if(!e)return;let t=c.filter(e=>e.type===`project`&&e.id.startsWith(`gh-`)).length,n=c.filter(e=>e.type===`highlight`).length,r=c.filter(e=>e.type===`skill`).length;e.innerHTML=`
    <div class="section-label mb-4">Portfolio Activity</div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="panel border rounded-3xl p-4" style="border-color: var(--border)">
        <div class="text-xs text-muted">Entities</div>
        <div class="metric-value text-3xl mt-1">${c.length}</div>
      </div>
      <div class="panel border rounded-3xl p-4" style="border-color: var(--border)">
        <div class="text-xs text-muted">Highlights</div>
        <div class="metric-value text-3xl mt-1">${n}</div>
      </div>
      <div class="panel border rounded-3xl p-4" style="border-color: var(--border)">
        <div class="text-xs text-muted">GitHub</div>
        <div class="metric-value text-3xl mt-1">${t||`—`}</div>
      </div>
      <div class="panel border rounded-3xl p-4" style="border-color: var(--border)">
        <div class="text-xs text-muted">Skills</div>
        <div class="metric-value text-3xl mt-1">${r}</div>
      </div>
    </div>
    <div class="panel border rounded-3xl p-5" style="border-color: var(--border)">
      <div class="section-label mb-3">Focus</div>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span>Automation & robotics</span><span class="mono text-xs text-muted">primary</span></div>
        <div class="flex justify-between"><span>AI / software</span><span class="mono text-xs text-muted">in progress</span></div>
        <div class="flex justify-between"><span>Personal projects</span><span class="mono text-xs text-muted">side</span></div>
      </div>
    </div>`}function R(){let e=document.getElementById(`command-palette`),t=document.getElementById(`command-input`);e?.classList.remove(`hidden`),t&&(t.value=``,t.focus()),B(``)}function z(){document.getElementById(`command-palette`)?.classList.add(`hidden`)}function B(t){let n=document.getElementById(`command-results`);if(!n)return;let r=t.toLowerCase().trim(),i=c.filter(e=>!r||e.title.toLowerCase().includes(r)||e.subtitle.toLowerCase().includes(r)||e.tags.some(e=>e.toLowerCase().includes(r))).slice(0,8);if(i.length===0){n.innerHTML=`<div class="px-4 py-3 text-muted">No matches</div>`;return}n.innerHTML=i.map(t=>`
    <button type="button" data-cmd="${e(t.id)}"
      class="px-4 py-3 rounded-2xl cursor-pointer flex items-center gap-3 w-full text-left"
      style="background: transparent" onmouseover="this.style.background='var(--border)'" onmouseout="this.style.background='transparent'">
      <div class="w-8 h-8 rounded-xl flex items-center justify-center badge shrink-0">
        <i class="fa-solid ${t.icon}" aria-hidden="true"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="truncate">${e(t.title)}</div>
        <div class="text-xs text-muted truncate">${e(t.subtitle)}</div>
      </div>
    </button>`).join(``),n.querySelectorAll(`[data-cmd]`).forEach(e=>{e.addEventListener(`click`,()=>{z(),P(`list`),setTimeout(()=>M(e.dataset.cmd||``),60)})})}function V(e,t=[]){let n=a(e),r=e.meta.last_updated,o={id:`profile`,type:`profile`,title:e.profile.name,subtitle:e.profile.headline,lastModified:r,tags:[`robotics`,`automation`,`ai`],status:`Active`,description:i,metrics:{location:`Washington`,focus:`Robotics`,company:e.experience?.[0]?.company||`—`},links:[{label:`LinkedIn`,href:e.contact.linkedin,external:!0},{label:`GitHub`,href:e.contact.github,external:!0},{label:e.contact.email,href:`mailto:${e.contact.email}`}],related:[`contact`,...n.slice(0,2).map(e=>`hl-${e.id}`)],icon:_(`profile`)},s=n.map(e=>({id:`hl-${e.id}`,type:`highlight`,title:e.title,subtitle:`${e.org} · ${e.period}`,lastModified:r,tags:[e.tag.toLowerCase()],status:e.tag,description:e.blurb,metrics:{org:e.org,period:e.period},related:[`profile`],icon:_(`highlight`)})),c={id:`project-paper`,type:`project`,title:`Paper`,subtitle:`Narrative idle game · hosted here`,lastModified:r,tags:[`github`],status:`Live`,description:`Narrative idle game — progress is a letter writing itself on a single page of parchment.`,metrics:{stack:`HTML · CSS · JS`},links:[{label:`Play on this site →`,href:`paper-game/`}],related:[`profile`],icon:_(`project`)},l={id:`contact`,type:`contact`,title:`Contact`,subtitle:`Email · GitHub · LinkedIn`,lastModified:r,tags:[],status:`Open`,description:`Open to conversations about automation, robotics operations, and software/AI projects.`,links:[{label:`LinkedIn`,href:e.contact.linkedin,external:!0},{label:`GitHub`,href:e.contact.github,external:!0},{label:e.contact.email,href:`mailto:${e.contact.email}`}],related:[`profile`],icon:_(`contact`)},u=(e.top_skills||[]).map((e,t)=>({id:`skill-${t}`,type:`skill`,title:e,subtitle:`Core skill`,lastModified:r,tags:[],status:`Active`,description:`${e} — listed among top skills on the portfolio.`,related:[`profile`],icon:_(`skill`)}));return[o,...s,c,...t,l,...u]}async function H(e){if(!navigator.onLine)return[];try{let[t,n]=await Promise.all([fetch(`https://api.github.com/users/${encodeURIComponent(e)}`),fetch(`https://api.github.com/users/${encodeURIComponent(e)}/repos?sort=updated&per_page=10`)]);if(!t.ok||!n.ok)return[];let r=await t.json(),i=await n.json();return Array.isArray(i)?i.filter(e=>!e.fork).slice(0,6).map(e=>{let t=(e.updated_at||``).slice(0,10);return{id:`gh-${e.name}`,type:`project`,title:e.name,subtitle:e.description||`GitHub repository`,lastModified:t||`—`,tags:[`github`],status:`Public`,description:e.description||`No description provided.`,metrics:{language:e.language||`—`,stars:e.stargazers_count??0,repos:r.public_repos??`—`},links:[{label:e.full_name,href:e.html_url,external:!0}],related:[`profile`,`project-paper`],icon:_(`project`)}}):[]}catch(e){return console.error(`GitHub load failed`,e),[]}}async function U(){N();let e=document.getElementById(`statusText`);try{let t=await fetch(`data/resume.json`,{cache:`no-cache`});if(!t.ok)throw Error(`HTTP ${t.status}`);p=await t.json(),m={linkedin:p.contact.linkedin||m.linkedin,github:p.contact.github||m.github,email:p.contact.email||m.email},y();let n=await H(p.github_config?.username||`Zolocke`);c=V(p,n),e&&(e.textContent=`Synced`);let r=document.getElementById(`lastSync`);r&&(r.textContent=p.meta.last_updated);let i=document.getElementById(`entityCountLabel`);i&&(i.textContent=`· ${c.length}`),b(),S(),E(),g()?(d=`profile`,document.querySelectorAll(`.entity-row`).forEach(e=>{e.classList.toggle(`selected`,e.dataset.id===`profile`)})):M(`profile`)}catch(t){console.error(t),e&&(e.textContent=`Error`),c=[{id:`error`,type:`profile`,title:`Unable to load data`,subtitle:`data/resume.json`,lastModified:`—`,tags:[],status:`Error`,description:`Could not load data/resume.json.`,icon:`fa-triangle-exclamation`}],b(),E()}}document.getElementById(`searchTrigger`)?.addEventListener(`click`,R),document.getElementById(`mobileSearchBtn`)?.addEventListener(`click`,R),document.getElementById(`logoBtn`)?.addEventListener(`click`,()=>{u=null,T(`all`),P(`list`),j(),!g()&&c.find(e=>e.id===`profile`)&&M(`profile`)}),document.getElementById(`closeMobileInspector`)?.addEventListener(`click`,j),document.getElementById(`mobileInspectorBackdrop`)?.addEventListener(`click`,j),document.querySelectorAll(`.view-tab`).forEach(e=>{e.addEventListener(`click`,()=>{P(e.dataset.view||`list`)})}),document.getElementById(`command-palette`)?.addEventListener(`click`,e=>{e.target===e.currentTarget&&z()}),document.getElementById(`command-palette-panel`)?.addEventListener(`click`,e=>{e.stopPropagation()});var W=document.getElementById(`command-input`);W?.addEventListener(`input`,()=>B(W.value)),W?.addEventListener(`keydown`,e=>{e.key===`Escape`&&z(),e.key===`Enter`&&document.querySelector(`#command-results [data-cmd]`)?.click()}),document.getElementById(`showShortcuts`)?.addEventListener(`click`,()=>{window.alert(`Keyboard Shortcuts

⌘K or / — Search
1–4 — Views (desktop)
Esc — Close`)}),document.addEventListener(`keydown`,e=>{let t=!document.getElementById(`command-palette`)?.classList.contains(`hidden`);if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`k`){e.preventDefault(),R();return}if(e.key===`/`&&document.activeElement?.tagName===`BODY`){e.preventDefault(),R();return}if(e.key===`Escape`){t?z():j();return}t||g()||(e.key===`1`&&P(`list`),e.key===`2`&&P(`timeline`),e.key===`3`&&P(`graph`),e.key===`4`&&P(`metrics`))}),window.addEventListener(`resize`,()=>{g()||j()}),console.log(`%c[Precision Console] Portfolio ready. Try ⌘K.`,`color:#c45c26`),U();