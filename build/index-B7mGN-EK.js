(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}var t=`lark-portfolio-theme`;function n(e){let t=document.documentElement;e===`light`?t.setAttribute(`data-theme`,`light`):t.removeAttribute(`data-theme`)}function r(e){n(localStorage.getItem(t)||`dark`),e?.addEventListener(`click`,()=>{let e=(document.documentElement.getAttribute(`data-theme`)===`light`?`light`:`dark`)==`light`?`dark`:`light`;n(e),localStorage.setItem(t,e)})}var i=`I build automation and robotics systems. At Symbotic I operate and maintain robotic fleet systems, PLC safety devices, conveyors, and ABB robotic arms — while studying AI Engineering and shipping personal software projects.`;function a(e){let t=e.military_service,n=e.education.find(e=>e.status===`In Progress`);return[{id:`symbotic-aso`,title:`Automation System Operator`,org:`Symbotic`,period:`Jul 2025 — Present`,blurb:`Fleet/system operator role: conveyors, PLC safety devices, Rovers, and ABB robotic arms under LOTO — partnering with engineers and trainers on live automation systems.`,tag:`Robotics`},{id:`symbotic-ro`,title:`Robotics Operator → Trainer track`,org:`Symbotic`,period:`May 2024 — Aug 2025`,blurb:`Robotic cell operations, training responsibilities, and workflow optimization with sensor data and robot programming feedback loops.`,tag:`Automation`},{id:`gm`,title:`Restaurant General Manager`,org:`Walter Enterprises`,period:`2017 — 2023`,blurb:`Opened and scaled daily operations (150–300 customers/day by year two). Hiring, training, inventory, cash flow, and quality standards.`,tag:`Leadership`},{id:`military`,title:`${t.rank} · ${t.mos}`,org:t.branch,period:t.service_period,blurb:`${t.deployment.operation} — ${t.deployment.type} (${t.deployment.location}). ${t.unit}.`,tag:`Service`},...n?[{id:`edu`,title:n.credential,org:n.institution,period:`${n.start} — ${n.end}`,blurb:`${n.status}. Building software and AI skills alongside hands-on robotics work.`,tag:`Education`}]:[]].slice(0,5)}var o=document.querySelector(`#app`);o.innerHTML=`
  <!-- Console header -->
  <header class="console-header sticky top-0 z-40">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-8 h-8 rounded flex items-center justify-center shrink-0" style="background: var(--accent-strong)">
          <span class="text-black font-bold text-lg tracking-tighter heading">Z</span>
        </div>
        <div class="min-w-0">
          <div class="font-semibold tracking-tight truncate">Zachary Odennihy</div>
          <div class="text-[10px] text-muted -mt-0.5 mono">Portfolio Console</div>
        </div>
      </div>

      <nav class="hidden md:flex items-center gap-1 bg-elevated rounded-2xl p-1 border border-theme" aria-label="Primary">
        <a href="#about" class="nav-item active px-3 py-1.5 text-xs font-medium rounded-xl" data-nav>About</a>
        <a href="#highlights" class="nav-item px-3 py-1.5 text-xs font-medium rounded-xl" data-nav>Highlights</a>
        <a href="#projects" class="nav-item px-3 py-1.5 text-xs font-medium rounded-xl" data-nav>Projects</a>
        <a href="#contact" class="nav-item px-3 py-1.5 text-xs font-medium rounded-xl" data-nav>Contact</a>
      </nav>

      <div class="flex items-center gap-3 shrink-0">
        <div class="hidden sm:flex items-center gap-1.5 text-xs text-muted">
          <div class="status-dot" aria-hidden="true"></div>
          <span id="statusText">ONLINE</span>
        </div>
        <button type="button" class="theme-toggle" id="themeToggle" title="Toggle light/dark theme" aria-label="Toggle theme">
          <span class="knob"></span>
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
    <!-- Hero -->
    <section class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <div class="section-label mb-2">PERSONAL PORTFOLIO</div>
        <h1 class="heading text-4xl sm:text-5xl md:text-6xl">Zachary Odennihy</h1>
        <p class="mt-3 text-muted max-w-xl" id="headlineText">Automation · Robotics · AI Engineering</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a id="resumeBtn" class="btn-primary" href="#contact">
          <i class="fas fa-file-arrow-down" aria-hidden="true"></i>
          Download résumé (PDF)
        </a>
        <a class="btn-ghost" href="#projects">
          <i class="fas fa-code-branch" aria-hidden="true"></i>
          View projects
        </a>
      </div>
    </section>

    <!-- Metrics -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10" aria-label="Status metrics">
      <div class="console-card p-5">
        <div class="section-label mb-2">FOCUS</div>
        <div class="metric-value text-accent">ROBOTICS</div>
        <div class="text-xs text-muted mt-1">Automation systems</div>
      </div>
      <div class="console-card p-5">
        <div class="section-label mb-2">GITHUB</div>
        <div class="metric-value" id="repoCount">—</div>
        <div class="text-xs text-muted mt-1">Public repos · live</div>
      </div>
      <div class="console-card p-5">
        <div class="section-label mb-2">LOCATION</div>
        <div class="metric-value text-lg" id="locationMetric">WA</div>
        <div class="text-xs text-muted mt-1" id="locationSub">State, USA</div>
      </div>
      <div class="console-card p-5">
        <div class="section-label mb-2">STATUS</div>
        <div class="mt-2">
          <span class="status-pill px-3 py-1 text-xs rounded">EMPLOYED</span>
        </div>
        <div class="text-xs text-muted mt-2" id="companyLine">Symbotic</div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="panel-section mb-12">
      <div class="section-label mb-3">ABOUT</div>
      <div class="console-card p-6 sm:p-8 text-sm leading-relaxed text-muted" id="aboutText">
        ${i}
      </div>
      <div class="mt-4 flex flex-wrap gap-2" id="skillsRow"></div>
    </section>

    <!-- Highlights -->
    <section id="highlights" class="panel-section mb-12">
      <div class="flex items-end justify-between gap-4 mb-3">
        <div class="section-label">EXPERIENCE HIGHLIGHTS</div>
        <div class="text-xs text-muted mono">curated · not a full CV</div>
      </div>
      <div class="space-y-3" id="highlightsList">
        <div class="entity-row p-5 skeleton h-24"></div>
        <div class="entity-row p-5 skeleton h-24"></div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="panel-section mb-12">
      <div class="section-label mb-3">FEATURED ON THIS SITE</div>
      <div class="grid md:grid-cols-2 gap-3 mb-8">
        <a href="paper-game/" class="console-card p-6 project-card-link" aria-label="Play Paper — narrative idle game">
          <div class="flex justify-between items-start gap-3">
            <div>
              <div class="font-semibold">Paper</div>
              <div class="text-xs text-muted mt-1">Narrative idle game — progress is a letter writing itself on a single page of parchment.</div>
            </div>
            <i class="fas fa-scroll text-xl text-muted" aria-hidden="true"></i>
          </div>
          <div class="mt-5 flex items-center justify-between text-xs">
            <span class="repo-link">Play on this site →</span>
            <span class="text-muted mono">HTML · CSS · JS</span>
          </div>
        </a>
      </div>

      <div class="flex items-end justify-between gap-4 mb-3">
        <div class="section-label">LIVE FROM GITHUB</div>
        <div class="text-xs text-muted mono" id="ghUserLabel">api.github.com</div>
      </div>
      <div class="grid md:grid-cols-2 gap-3" id="projectsGrid">
        <div class="console-card p-6 skeleton h-32"></div>
        <div class="console-card p-6 skeleton h-32"></div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="panel-section mb-8">
      <div class="section-label mb-3">CONTACT</div>
      <div class="console-card p-6 sm:p-8">
        <p class="text-sm text-muted mb-5">Open to conversations about automation, robotics operations, and software/AI projects.</p>
        <div class="flex flex-wrap gap-4 text-sm mb-6">
          <a id="emailLink" href="#" class="flex items-center gap-2 repo-link">
            <i class="fas fa-envelope" aria-hidden="true"></i> <span id="emailText">—</span>
          </a>
          <a id="githubLink" href="#" class="flex items-center gap-2 repo-link" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github" aria-hidden="true"></i> <span id="githubText">—</span>
          </a>
          <a id="linkedinLink" href="#" class="flex items-center gap-2 repo-link" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin" aria-hidden="true"></i> <span id="linkedinText">—</span>
          </a>
        </div>
        <div class="flex flex-wrap gap-3">
          <a id="resumeBtnFooter" class="btn-primary" href="#contact">
            <i class="fas fa-file-arrow-down" aria-hidden="true"></i>
            Download résumé (PDF)
          </a>
          <span class="text-xs text-muted self-center" id="resumeHint">PDF hosted under data/</span>
        </div>
      </div>
    </section>
  </main>

  <footer class="max-w-6xl mx-auto px-4 sm:px-6 pb-10 text-xs text-muted mono">
    PORTFOLIO CONSOLE · DATA: data/resume.json + LIVE GITHUB API · UPDATED <span id="lastUpdated">—</span>
  </footer>
`,r(document.getElementById(`themeToggle`));var s=Array.from(document.querySelectorAll(`[data-nav]`)),c=[`about`,`highlights`,`projects`,`contact`].map(e=>document.getElementById(e)).filter(e=>!!e);function l(e){s.forEach(t=>{let n=t.getAttribute(`href`)||``;t.classList.toggle(`active`,n===`#${e}`)})}var u=new IntersectionObserver(e=>{let t=e.filter(e=>e.isIntersecting).sort((e,t)=>t.intersectionRatio-e.intersectionRatio)[0];t?.target?.id&&l(t.target.id)},{rootMargin:`-30% 0px -55% 0px`,threshold:[.1,.4,.7]});c.forEach(e=>u.observe(e));async function d(){try{let e=await fetch(`data/resume.json`,{cache:`no-cache`});if(!e.ok)throw Error(`HTTP ${e.status}`);let t=await e.json();f(t),await p(t.github_config?.username||`Zolocke`)}catch(e){console.error(`Failed to load data/resume.json`,e);let t=document.getElementById(`aboutText`);t&&(t.textContent=`Unable to load data/resume.json. If viewing via file://, use a local server (npm run dev or python3 -m http.server).`)}}function f(t){let n=document.getElementById(`headlineText`),r=document.getElementById(`lastUpdated`),i=document.getElementById(`companyLine`),o=document.getElementById(`locationMetric`),s=document.getElementById(`locationSub`),c=document.getElementById(`ghUserLabel`);n&&(n.textContent=t.profile.headline),r&&(r.textContent=t.meta.last_updated),i&&(i.textContent=t.experience?.[0]?.company||`—`),o&&(o.textContent=`WA`),s&&(s.textContent=t.profile.location),c&&(c.textContent=`@${t.github_config.username}`);let l=document.getElementById(`skillsRow`);l&&(l.innerHTML=(t.top_skills||[]).map(t=>`<span class="skill-pill px-3 py-1.5 text-xs rounded-lg mono">${e(t)}</span>`).join(``));let u=document.getElementById(`highlightsList`);u&&(u.innerHTML=a(t).map(t=>`
      <article class="entity-row p-5">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div class="font-semibold">${e(t.title)}</div>
            <div class="text-accent text-sm mt-0.5">${e(t.org)} · ${e(t.period)}</div>
          </div>
          <span class="skill-pill px-2.5 py-1 text-[10px] rounded mono uppercase tracking-wider">${e(t.tag)}</span>
        </div>
        <p class="mt-3 text-sm text-muted leading-relaxed">${e(t.blurb)}</p>
      </article>`).join(``));let d=document.getElementById(`emailLink`),f=document.getElementById(`emailText`),p=document.getElementById(`githubLink`),m=document.getElementById(`githubText`),h=document.getElementById(`linkedinLink`),g=document.getElementById(`linkedinText`);d&&f&&(d.href=`mailto:${t.contact.email}`,f.textContent=t.contact.email),p&&m&&(p.href=t.contact.github,m.textContent=t.contact.github.replace(/^https?:\/\//,``)),h&&g&&(t.contact.linkedin?(h.href=t.contact.linkedin,g.textContent=`linkedin.com/in/odennihy`):h.style.display=`none`);let _=`data/Zachary-Odennihy-Resume.pdf`,v=[document.getElementById(`resumeBtn`),document.getElementById(`resumeBtnFooter`)].filter(Boolean);fetch(_,{method:`HEAD`}).then(e=>{let n=document.getElementById(`resumeHint`);if(e.ok)v.forEach(e=>{e.href=_,e.setAttribute(`download`,`Zachary-Odennihy-Resume.pdf`)}),n&&(n.textContent=`PDF available · data/Zachary-Odennihy-Resume.pdf`);else{let e=t.contact.linkedin||`mailto:${t.contact.email}?subject=Resume%20request`;v.forEach(n=>{n.href=e,n.removeAttribute(`download`),t.contact.linkedin?n.innerHTML=`<i class="fab fa-linkedin" aria-hidden="true"></i> Full profile on LinkedIn`:n.innerHTML=`<i class="fas fa-envelope" aria-hidden="true"></i> Request résumé`}),n&&(n.textContent=`No PDF in data/ yet — button links to LinkedIn. Drop Zachary-Odennihy-Resume.pdf into data/ to enable download.`)}}).catch(()=>{})}async function p(t){let n=document.getElementById(`projectsGrid`);if(n){if(!navigator.onLine){n.innerHTML=`<div class="console-card p-6 text-sm text-muted">GitHub data is unavailable while offline.</div>`;return}try{let[r,i]=await Promise.all([fetch(`https://api.github.com/users/${encodeURIComponent(t)}`),fetch(`https://api.github.com/users/${encodeURIComponent(t)}/repos?sort=updated&per_page=10`)]);if(!r.ok||!i.ok)throw Error(`GitHub API error: ${r.status}/${i.status}`);let a=await r.json(),o=await i.json(),s=document.getElementById(`repoCount`);if(s&&(s.textContent=String(a.public_repos??(Array.isArray(o)?o.length:`—`))),!Array.isArray(o)||o.length===0){n.innerHTML=`<div class="console-card p-6 text-sm text-muted">No public repositories yet.</div>`;return}n.innerHTML=o.filter(e=>!e.fork).slice(0,6).map(t=>`
      <div class="console-card p-6">
        <div class="flex justify-between items-start gap-3">
          <div>
            <div class="font-semibold">${e(t.name)}</div>
            <div class="text-xs text-muted mt-1">${e(t.description||`No description provided`)}</div>
          </div>
          <i class="fas fa-code-branch text-xl text-muted" aria-hidden="true"></i>
        </div>
        <div class="mt-5 flex items-center justify-between text-xs gap-2">
          <a href="${e(t.html_url)}" class="repo-link truncate" target="_blank" rel="noopener noreferrer">${e(t.full_name)}</a>
          <span class="text-muted mono shrink-0">${e(t.language||``)}</span>
        </div>
      </div>`).join(``)}catch(e){console.error(`GitHub load failed`,e),n.innerHTML=`<div class="console-card p-6 text-sm text-muted">Could not load GitHub repositories right now.</div>`}}}d();