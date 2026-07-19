(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}var t=`lark-portfolio-theme`;function n(e){let t=document.documentElement;e===`light`?t.setAttribute(`data-theme`,`light`):t.removeAttribute(`data-theme`)}function r(e){n(localStorage.getItem(t)||`dark`),e?.addEventListener(`click`,()=>{let e=(document.documentElement.getAttribute(`data-theme`)===`light`?`light`:`dark`)==`light`?`dark`:`light`;n(e),localStorage.setItem(t,e)})}var i=`I build automation and robotics systems. At Symbotic I operate and maintain robotic fleet systems, PLC safety devices, conveyors, and ABB robotic arms — while studying AI Engineering and shipping personal software projects.`;function a(e){let t=e.military_service,n=e.education.find(e=>e.status===`In Progress`);return[{id:`symbotic-aso`,title:`Automation System Operator`,org:`Symbotic`,period:`Jul 2025 — Present`,blurb:`Fleet/system operator role: conveyors, PLC safety devices, Rovers, and ABB robotic arms under LOTO — partnering with engineers and trainers on live automation systems.`,tag:`Robotics`},{id:`symbotic-ro`,title:`Robotics Operator → Trainer track`,org:`Symbotic`,period:`May 2024 — Aug 2025`,blurb:`Robotic cell operations, training responsibilities, and workflow optimization with sensor data and robot programming feedback loops.`,tag:`Automation`},{id:`gm`,title:`Restaurant General Manager`,org:`Walter Enterprises`,period:`2017 — 2023`,blurb:`Opened and scaled daily operations (150–300 customers/day by year two). Hiring, training, inventory, cash flow, and quality standards.`,tag:`Leadership`},{id:`military`,title:`${t.rank} · ${t.mos}`,org:t.branch,period:t.service_period,blurb:`${t.deployment.operation} — ${t.deployment.type} (${t.deployment.location}). ${t.unit}.`,tag:`Service`},...n?[{id:`edu`,title:n.credential,org:n.institution,period:`${n.start} — ${n.end}`,blurb:`${n.status}. Building software and AI skills alongside hands-on robotics work.`,tag:`Education`}]:[]].slice(0,5)}var o={all:{label:`All Entities`,icon:`fa-th-large`,filterKey:`all`},profile:{label:`Profile`,icon:`fa-id-card`,filterKey:`profile`},highlight:{label:`Highlights`,icon:`fa-star`,filterKey:`highlight`},project:{label:`Projects`,icon:`fa-folder`,filterKey:`project`},contact:{label:`Contact`,icon:`fa-envelope`,filterKey:`contact`},skill:{label:`Skills`,icon:`fa-code`,filterKey:`skill`}},s=[],c=`all`,l=null,u=null,d=`list`,f=null,p=document.querySelector(`#app`);p.innerHTML=`
  <div class="h-screen overflow-hidden flex flex-col text-sm">
    <!-- Top Command Bar -->
    <div class="console-header px-4 sm:px-5 py-3 flex items-center justify-between gap-3 border-b" style="border-color: var(--border)">
      <div class="flex items-center gap-3 sm:gap-4 min-w-0">
        <button type="button" id="logoBtn" class="flex items-center gap-3 min-w-0" title="Reset view">
          <div class="w-8 h-8 rounded flex items-center justify-center shrink-0" style="background: var(--accent-strong)">
            <span class="text-black font-bold text-lg tracking-tighter">Z</span>
          </div>
          <div class="text-left min-w-0 hidden xs:block sm:block">
            <div class="font-semibold tracking-tight truncate">Zachary Odennihy</div>
            <div class="text-[10px] text-muted -mt-0.5">Portfolio Console v2.0</div>
          </div>
        </button>

        <button type="button" id="searchTrigger"
          class="search-trigger flex items-center gap-3 surface hover:opacity-90 transition-colors border rounded-2xl px-4 py-2 w-72 cursor-pointer text-left"
          style="border-color: var(--border)">
          <i class="fa-solid fa-search text-muted" aria-hidden="true"></i>
          <div class="flex-1 text-muted truncate">Search entities or run command...</div>
          <div class="mono text-xs px-2 py-0.5 rounded badge">⌘K</div>
        </button>
      </div>

      <div class="flex items-center gap-3 sm:gap-5">
        <div class="hidden md:flex items-center rounded-2xl p-1 border surface" style="border-color: var(--border)">
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

        <div class="flex items-center gap-2 text-xs text-muted">
          <div class="flex items-center gap-1.5">
            <div class="status-dot" aria-hidden="true"></div>
            <span id="statusText">Loading</span>
          </div>
          <span class="hidden sm:inline">•</span>
          <span class="mono hidden sm:inline" id="entityCountLabel">— entities</span>
        </div>

        <button type="button" class="theme-toggle" id="themeToggle" title="Toggle light/dark" aria-label="Toggle theme">
          <span class="knob"></span>
        </button>
      </div>
    </div>

    <div class="console-shell flex flex-1 overflow-hidden">
      <!-- Left Navigation -->
      <aside class="sidebar-left w-64 border-r panel flex flex-col shrink-0" style="border-color: var(--border)">
        <div class="p-4 border-b" style="border-color: var(--border)">
          <div class="section-label mb-3">Workspace</div>
          <div class="space-y-1" id="workspaceNav"></div>
        </div>

        <div class="p-4 flex-1 overflow-auto">
          <div class="section-label mb-3">Quick Filters</div>
          <div class="space-y-px text-xs" id="tagFilters"></div>
        </div>

        <div class="p-4 border-t text-xs text-muted" style="border-color: var(--border)">
          <div class="flex justify-between">
            <div>Last sync</div>
            <div class="mono" id="lastSync">—</div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden min-w-0">
        <div id="view-list" class="flex-1 overflow-auto p-4 sm:p-5">
          <div class="flex items-center justify-between mb-4 px-1">
            <div class="section-label" id="listHeader">Entities</div>
            <div class="text-xs text-muted">Sorted by type · select to inspect</div>
          </div>
          <div class="space-y-px" id="entity-list"></div>
        </div>

        <div id="view-timeline" class="hidden flex-1 overflow-auto p-4 sm:p-6">
          <div class="max-w-3xl mx-auto">
            <div class="section-label mb-6">Career Timeline</div>
            <div id="timeline-content" class="space-y-0"></div>
          </div>
        </div>

        <div id="view-graph" class="hidden flex-1 p-4 sm:p-6 overflow-auto">
          <div class="max-w-5xl mx-auto">
            <div class="section-label mb-4">Entity Relationship Graph</div>
            <div class="panel border rounded-3xl p-8 min-h-[420px] flex items-center justify-center relative" style="border-color: var(--border)" id="graphPanel"></div>
          </div>
        </div>

        <div id="view-metrics" class="hidden flex-1 p-4 sm:p-6 overflow-auto">
          <div class="max-w-5xl mx-auto" id="metricsPanel"></div>
        </div>
      </div>

      <!-- Right Inspector -->
      <aside class="sidebar-right w-80 border-l panel flex flex-col shrink-0" style="border-color: var(--border)">
        <div class="p-4 border-b" style="border-color: var(--border)">
          <div class="section-label">Inspector</div>
        </div>
        <div id="inspector-content" class="flex-1 overflow-auto p-4"></div>
        <div class="p-4 border-t text-xs" style="border-color: var(--border)">
          <div class="flex justify-between text-muted">
            <div>Keyboard shortcuts</div>
            <button type="button" id="showShortcuts" class="cursor-pointer hover:text-accent">show</button>
          </div>
        </div>
      </aside>
    </div>
  </div>

  <!-- Command Palette -->
  <div id="command-palette" class="hidden fixed inset-0 flex items-start justify-center pt-24 z-50" style="background: var(--overlay)">
    <div id="command-palette-panel" class="command-palette w-full max-w-xl panel border rounded-3xl overflow-hidden shadow-2xl" style="border-color: var(--border)">
      <div class="p-4 border-b" style="border-color: var(--border)">
        <input id="command-input" type="text" placeholder="Type a command or search..."
          class="w-full bg-transparent text-lg outline-none" style="color: var(--text)"
          autocomplete="off" />
      </div>
      <div id="command-results" class="max-h-80 overflow-auto p-2 text-sm"></div>
    </div>
  </div>
`,r(document.getElementById(`themeToggle`));function m(e){return o[e].icon}function h(e){return e===`all`?s.length:s.filter(t=>t.type===e).length}function g(){let e=document.getElementById(`workspaceNav`);e&&(e.innerHTML=[`all`,`profile`,`highlight`,`project`,`contact`,`skill`].map(e=>{let t=o[e];return`
        <button type="button" data-filter="${e}"
          class="nav-item ${c===e&&!l?`active`:``} flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer w-full text-left">
          <div class="flex items-center gap-3">
            <i class="fa-solid ${t.icon} w-4 text-center" aria-hidden="true"></i>
            <span>${t.label}</span>
          </div>
          <span class="mono text-xs text-muted">${h(e)}</span>
        </button>`}).join(``),e.querySelectorAll(`[data-filter]`).forEach(e=>{e.addEventListener(`click`,()=>{l=null,y(e.dataset.filter||`all`)})}))}function _(){let t=document.getElementById(`tagFilters`);t&&(t.innerHTML=Array.from(new Set(s.flatMap(e=>e.tags))).sort().map(t=>`
    <button type="button" data-tag="${e(t)}"
      class="w-full text-left px-3 py-1.5 rounded cursor-pointer flex items-center gap-2 ${l===t?`badge`:``}" style="">
      <span class="text-accent">•</span> ${e(t)}
    </button>`).join(``),t.querySelectorAll(`[data-tag]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tag||null;l=l===t?null:t,c=`all`,b(),g(),_()})}))}function v(){let e=s;if(c!==`all`&&(e=e.filter(e=>e.type===c)),l!==null){let t=l;e=e.filter(e=>e.tags.includes(t))}return e}function y(e){c=e,b(),g()}function b(){let e=v(),t=document.getElementById(`listHeader`);t&&(t.textContent=`${l==null?c===`all`?`Entities`:o[c].label:`Tag · ${l}`} · ${e.length} total`),x(e),d===`timeline`&&E(),d===`graph`&&D(),d===`metrics`&&O()}function x(t){let n=document.getElementById(`entity-list`);if(n){if(t.length===0){n.innerHTML=`<div class="px-4 py-8 text-muted text-center">No entities match this filter.</div>`;return}n.innerHTML=t.map(t=>{let n=u===t.id?`selected`:``;return`
      <button type="button" data-id="${e(t.id)}"
        class="entity-row ${n} flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer w-full text-left">
        <div class="flex items-center gap-4 min-w-0">
          <div class="w-9 h-9 rounded-2xl flex items-center justify-center text-xs shrink-0 badge">
            <i class="fa-solid ${t.icon}" aria-hidden="true"></i>
          </div>
          <div class="min-w-0">
            <div class="font-medium truncate">${e(t.title)}</div>
            <div class="text-xs text-muted truncate">${e(t.subtitle)}</div>
          </div>
        </div>
        <div class="flex items-center gap-3 sm:gap-4 text-xs shrink-0 ml-3">
          <div class="mono text-muted hidden sm:block">${e(t.lastModified)}</div>
          <div class="px-3 py-1 rounded-xl text-xs badge">${e(t.status)}</div>
        </div>
      </button>`}).join(``),n.querySelectorAll(`[data-id]`).forEach(e=>{e.addEventListener(`click`,()=>S(e.dataset.id||``))})}}function S(e){let t=s.find(t=>t.id===e);t&&(u=e,document.querySelectorAll(`.entity-row`).forEach(t=>{t.classList.toggle(`selected`,t.dataset.id===e)}),C(t))}function C(t){let n=document.getElementById(`inspector-content`);if(!n)return;let r=t.metrics&&Object.keys(t.metrics).length?`
    <div class="mb-6">
      <div class="section-label mb-3">Metrics</div>
      <div class="grid grid-cols-2 gap-3">
        ${Object.entries(t.metrics).map(([t,n])=>`
          <div class="surface border rounded-2xl p-3" style="border-color: var(--border)">
            <div class="text-xs text-muted">${e(t)}</div>
            <div class="metric-value text-xl mt-1">${e(n)}</div>
          </div>`).join(``)}
      </div>
    </div>`:``,i=t.links&&t.links.length?`
    <div class="mb-6">
      <div class="section-label mb-2">Links</div>
      <div class="space-y-1">
        ${t.links.map(t=>{let n=t.external?` target="_blank" rel="noopener noreferrer"`:``;return`<a href="${e(t.href)}" class="block repo-link text-sm"${n}>${e(t.label)}</a>`}).join(``)}
      </div>
    </div>`:``,a=t.related&&t.related.length?`
    <div>
      <div class="section-label mb-2">Related Entities</div>
      <div class="space-y-1 text-sm">
        ${t.related.map(t=>{let n=s.find(e=>e.id===t);return n?`<button type="button" data-rel="${e(n.id)}" class="block w-full text-left cursor-pointer hover:text-accent">${e(n.title)}</button>`:``}).join(``)}
      </div>
    </div>`:``;n.innerHTML=`
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <div class="px-3 py-1 text-xs rounded-2xl badge">${e(t.type.toUpperCase())}</div>
        <div class="px-3 py-1 text-xs rounded-2xl badge">${e(t.status)}</div>
      </div>
      <div class="heading text-2xl tracking-tight">${e(t.title)}</div>
      <div class="text-muted mt-1">${e(t.subtitle)}</div>
    </div>
    <div class="mb-6">
      <div class="section-label mb-2">Description</div>
      <div class="text-muted leading-relaxed">${e(t.description)}</div>
    </div>
    ${r}
    ${i}
    ${a}
  `,n.querySelectorAll(`[data-rel]`).forEach(e=>{e.addEventListener(`click`,()=>{T(`list`),S(e.dataset.rel||``)})})}function w(){let e=document.getElementById(`inspector-content`);e&&(e.innerHTML=`
    <div class="text-center text-muted mt-12">
      <i class="fa-solid fa-info-circle text-3xl mb-3 opacity-40" aria-hidden="true"></i>
      <div class="text-sm">Select an entity to inspect</div>
    </div>`)}function T(e){d=e,document.querySelectorAll(`[id^="view-"]`).forEach(e=>{e.classList.add(`hidden`)}),document.querySelectorAll(`.view-tab`).forEach(e=>e.classList.remove(`active`)),document.getElementById(`view-${e}`)?.classList.remove(`hidden`),document.querySelector(`.view-tab[data-view="${e}"]`)?.classList.add(`active`),e===`timeline`&&E(),e===`graph`&&D(),e===`metrics`&&O()}function E(){let t=document.getElementById(`timeline-content`);t&&(t.innerHTML=[...v()].sort((e,t)=>t.lastModified.localeCompare(e.lastModified)).map(t=>`
    <button type="button" data-tl="${e(t.id)}"
      class="flex gap-6 border-l-2 pl-6 pb-8 last:pb-0 w-full text-left cursor-pointer"
      style="border-color: var(--border)">
      <div class="w-24 text-xs mono text-muted pt-1 shrink-0">${e(t.lastModified)}</div>
      <div class="flex-1 min-w-0">
        <div class="font-medium">${e(t.title)}</div>
        <div class="text-sm text-muted">${e(t.subtitle)}</div>
        <div class="mt-1 text-xs inline-block px-2.5 py-0.5 rounded badge">${e(t.status)}</div>
      </div>
    </button>`).join(``),t.querySelectorAll(`[data-tl]`).forEach(e=>{e.addEventListener(`click`,()=>{T(`list`),setTimeout(()=>S(e.dataset.tl||``),40)})}))}function D(){let e=document.getElementById(`graphPanel`);if(!e)return;let t=s.filter(e=>e.type===`project`).length,n=s.filter(e=>e.type===`highlight`).length;e.innerHTML=`
    <div class="text-center w-full">
      <i class="fa-solid fa-project-diagram text-6xl mb-4 opacity-30" style="color: var(--border)" aria-hidden="true"></i>
      <div class="text-lg text-muted">Portfolio entity graph</div>
      <div class="text-xs mt-1 text-muted mono">${s.length} nodes · portfolio edges</div>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-md mx-auto">
        <div class="surface border p-3 rounded-2xl" style="border-color: var(--border)">
          <div class="text-accent text-xs">Focus cluster</div>
          <div class="font-medium">Robotics</div>
        </div>
        <div class="surface border p-3 rounded-2xl" style="border-color: var(--border)">
          <div class="text-accent text-xs">Projects</div>
          <div class="font-medium">${t} live</div>
        </div>
        <div class="surface border p-3 rounded-2xl" style="border-color: var(--border)">
          <div class="text-accent text-xs">Highlights</div>
          <div class="font-medium">${n} curated</div>
        </div>
      </div>
    </div>`}function O(){let e=document.getElementById(`metricsPanel`);if(!e)return;let t=s.filter(e=>e.type===`project`&&e.id.startsWith(`gh-`)).length,n=s.filter(e=>e.type===`highlight`).length,r=s.filter(e=>e.type===`skill`).length;e.innerHTML=`
    <div class="section-label mb-6">Portfolio Activity</div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="panel border rounded-3xl p-5" style="border-color: var(--border)">
        <div class="text-xs text-muted">Entities</div>
        <div class="metric-value text-4xl mt-1">${s.length}</div>
        <div class="text-xs text-muted mt-2">in workspace</div>
      </div>
      <div class="panel border rounded-3xl p-5" style="border-color: var(--border)">
        <div class="text-xs text-muted">Highlights</div>
        <div class="metric-value text-4xl mt-1">${n}</div>
        <div class="text-xs text-muted mt-2">curated experience</div>
      </div>
      <div class="panel border rounded-3xl p-5" style="border-color: var(--border)">
        <div class="text-xs text-muted">GitHub projects</div>
        <div class="metric-value text-4xl mt-1" id="metricRepoCount">${t||`—`}</div>
        <div class="text-xs text-muted mt-2">public · live</div>
      </div>
      <div class="panel border rounded-3xl p-5" style="border-color: var(--border)">
        <div class="text-xs text-muted">Top skills</div>
        <div class="metric-value text-4xl mt-1">${r}</div>
        <div class="text-xs text-muted mt-2">listed</div>
      </div>
    </div>
    <div class="panel border rounded-3xl p-6" style="border-color: var(--border)">
      <div class="section-label mb-4">Focus Threads</div>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between items-center"><div>Automation & robotics systems</div><div class="mono text-xs text-muted">primary</div></div>
        <div class="flex justify-between items-center"><div>AI / software engineering</div><div class="mono text-xs text-muted">in progress</div></div>
        <div class="flex justify-between items-center"><div>Personal tools & games</div><div class="mono text-xs text-muted">side projects</div></div>
      </div>
    </div>`}function k(){let e=document.getElementById(`command-palette`),t=document.getElementById(`command-input`);e?.classList.remove(`hidden`),t&&(t.value=``,t.focus()),j(``)}function A(){document.getElementById(`command-palette`)?.classList.add(`hidden`)}function j(t){let n=document.getElementById(`command-results`);if(!n)return;let r=t.toLowerCase().trim(),i=s.filter(e=>!r||e.title.toLowerCase().includes(r)||e.subtitle.toLowerCase().includes(r)||e.tags.some(e=>e.toLowerCase().includes(r))).slice(0,8);if(i.length===0){n.innerHTML=`<div class="px-4 py-3 text-muted">No matches found</div>`;return}n.innerHTML=i.map(t=>`
    <button type="button" data-cmd="${e(t.id)}"
      class="px-4 py-3 hover:opacity-90 rounded-2xl cursor-pointer flex items-center gap-4 w-full text-left"
      style="background: transparent" onmouseover="this.style.background='var(--border)'" onmouseout="this.style.background='transparent'">
      <div class="w-8 h-8 rounded-xl flex items-center justify-center badge">
        <i class="fa-solid ${t.icon}" aria-hidden="true"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="truncate">${e(t.title)}</div>
        <div class="text-xs text-muted truncate">${e(t.subtitle)}</div>
      </div>
    </button>`).join(``),n.querySelectorAll(`[data-cmd]`).forEach(e=>{e.addEventListener(`click`,()=>{A(),T(`list`),setTimeout(()=>S(e.dataset.cmd||``),60)})})}function M(e,t=[]){let n=a(e),r=e.meta.last_updated,o={id:`profile`,type:`profile`,title:e.profile.name,subtitle:e.profile.headline,lastModified:r,tags:[`robotics`,`automation`,`ai`],status:`Active`,description:i,metrics:{location:`Washington`,focus:`Robotics`,company:e.experience?.[0]?.company||`—`},links:[{label:`LinkedIn profile`,href:e.contact.linkedin,external:!0},{label:`GitHub`,href:e.contact.github,external:!0},{label:`Email ${e.contact.email}`,href:`mailto:${e.contact.email}`}],related:[`contact`,...n.slice(0,2).map(e=>`hl-${e.id}`)],icon:m(`profile`)},s=n.map(e=>({id:`hl-${e.id}`,type:`highlight`,title:e.title,subtitle:`${e.org} · ${e.period}`,lastModified:r,tags:[e.tag.toLowerCase(),`experience`],status:e.tag,description:e.blurb,metrics:{org:e.org,period:e.period},related:[`profile`],icon:m(`highlight`)})),c={id:`project-paper`,type:`project`,title:`Paper`,subtitle:`Narrative idle game · hosted here`,lastModified:r,tags:[`project`,`game`,`web`],status:`Live`,description:`Narrative idle game — progress is a letter writing itself on a single page of parchment. Playable on this site.`,metrics:{stack:`HTML · CSS · JS`},links:[{label:`Play on this site →`,href:`paper-game/`}],related:[`profile`],icon:m(`project`)},l={id:`contact`,type:`contact`,title:`Contact`,subtitle:`Email · GitHub · LinkedIn`,lastModified:r,tags:[`contact`],status:`Open`,description:`Open to conversations about automation, robotics operations, and software/AI projects. Prefer LinkedIn for full professional profile.`,links:[{label:e.contact.linkedin.replace(/^https?:\/\//,``),href:e.contact.linkedin,external:!0},{label:e.contact.github.replace(/^https?:\/\//,``),href:e.contact.github,external:!0},{label:e.contact.email,href:`mailto:${e.contact.email}`}],related:[`profile`],icon:m(`contact`)},u=(e.top_skills||[]).map((e,t)=>({id:`skill-${t}`,type:`skill`,title:e,subtitle:`Core skill`,lastModified:r,tags:[`skills`],status:`Active`,description:`${e} — listed among top skills on the portfolio.`,related:[`profile`],icon:m(`skill`)}));return[o,...s,c,...t,l,...u]}async function N(e){if(!navigator.onLine)return[];try{let[t,n]=await Promise.all([fetch(`https://api.github.com/users/${encodeURIComponent(e)}`),fetch(`https://api.github.com/users/${encodeURIComponent(e)}/repos?sort=updated&per_page=10`)]);if(!t.ok||!n.ok)return[];let r=await t.json(),i=await n.json();return Array.isArray(i)?i.filter(e=>!e.fork).slice(0,6).map(e=>{let t=(e.updated_at||``).slice(0,10);return{id:`gh-${e.name}`,type:`project`,title:e.name,subtitle:e.description||`GitHub repository`,lastModified:t||`—`,tags:[`project`,`github`,(e.language||`code`).toLowerCase()],status:`Public`,description:e.description||`No description provided.`,metrics:{language:e.language||`—`,stars:e.stargazers_count??0,repos:r.public_repos??`—`},links:[{label:e.full_name,href:e.html_url,external:!0}],related:[`profile`,`project-paper`],icon:m(`project`)}}):[]}catch(e){return console.error(`GitHub load failed`,e),[]}}async function P(){w();let e=document.getElementById(`statusText`);try{let t=await fetch(`data/resume.json`,{cache:`no-cache`});if(!t.ok)throw Error(`HTTP ${t.status}`);f=await t.json();let n=await N(f.github_config?.username||`Zolocke`);s=M(f,n),e&&(e.textContent=`Synced`);let r=document.getElementById(`lastSync`);r&&(r.textContent=f.meta.last_updated);let i=document.getElementById(`entityCountLabel`);i&&(i.textContent=`${s.length} entities`),g(),_(),b(),S(`profile`)}catch(t){console.error(t),e&&(e.textContent=`Error`),s=[{id:`error`,type:`profile`,title:`Unable to load data`,subtitle:`data/resume.json`,lastModified:`—`,tags:[],status:`Error`,description:`Could not load data/resume.json. Use npm run dev or a local server if opening via file://.`,icon:`fa-triangle-exclamation`}],g(),b(),S(`error`)}}document.getElementById(`searchTrigger`)?.addEventListener(`click`,k),document.getElementById(`logoBtn`)?.addEventListener(`click`,()=>{l=null,y(`all`),T(`list`),s[0]&&S(s.find(e=>e.id===`profile`)?.id||s[0].id)}),document.querySelectorAll(`.view-tab`).forEach(e=>{e.addEventListener(`click`,()=>{T(e.dataset.view||`list`)})}),document.getElementById(`command-palette`)?.addEventListener(`click`,e=>{e.target===e.currentTarget&&A()}),document.getElementById(`command-palette-panel`)?.addEventListener(`click`,e=>{e.stopPropagation()});var F=document.getElementById(`command-input`);F?.addEventListener(`input`,()=>j(F.value)),F?.addEventListener(`keydown`,e=>{e.key===`Escape`&&A(),e.key===`Enter`&&document.querySelector(`#command-results [data-cmd]`)?.click()}),document.getElementById(`showShortcuts`)?.addEventListener(`click`,()=>{window.alert(`Keyboard Shortcuts

⌘K or / — Open command palette
1–4 — Switch views (List, Timeline, Graph, Metrics)
Esc — Close palette`)}),document.addEventListener(`keydown`,e=>{let t=!document.getElementById(`command-palette`)?.classList.contains(`hidden`);if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`k`){e.preventDefault(),k();return}if(e.key===`/`&&document.activeElement?.tagName===`BODY`){e.preventDefault(),k();return}if(e.key===`Escape`&&t){A();return}t||(e.key===`1`&&T(`list`),e.key===`2`&&T(`timeline`),e.key===`3`&&T(`graph`),e.key===`4`&&T(`metrics`))}),console.log(`%c[Precision Console] Portfolio interface initialized. Try ⌘K.`,`color:#c45c26`),P();