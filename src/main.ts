import "./style.css";
import { escapeHtml } from "./lib/escapeHtml";
import { initTheme } from "./lib/theme";
import { ABOUT_BLURB, buildHighlights } from "./data/highlights";
import type { ResumeData } from "./data/types";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
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
        ${ABOUT_BLURB}
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
`;

initTheme(document.getElementById("themeToggle"));

/** Active nav highlight on scroll */
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
const sections = ["about", "highlights", "projects", "contact"]
  .map((id) => document.getElementById(id))
  .filter((el): el is HTMLElement => !!el);

function setActiveNav(id: string) {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", href === `#${id}`);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActiveNav(visible.target.id);
  },
  { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] }
);
sections.forEach((s) => observer.observe(s));

async function loadResume(): Promise<void> {
  try {
    const res = await fetch("data/resume.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ResumeData;
    renderPortfolio(data);
    await loadGitHub(data.github_config?.username || "Zolocke");
  } catch (err) {
    console.error("Failed to load data/resume.json", err);
    const about = document.getElementById("aboutText");
    if (about) {
      about.textContent =
        "Unable to load data/resume.json. If viewing via file://, use a local server (npm run dev or python3 -m http.server).";
    }
  }
}

function renderPortfolio(data: ResumeData): void {
  const headline = document.getElementById("headlineText");
  const lastUpdated = document.getElementById("lastUpdated");
  const companyLine = document.getElementById("companyLine");
  const locationMetric = document.getElementById("locationMetric");
  const locationSub = document.getElementById("locationSub");
  const ghUserLabel = document.getElementById("ghUserLabel");

  if (headline) headline.textContent = data.profile.headline;
  if (lastUpdated) lastUpdated.textContent = data.meta.last_updated;
  if (companyLine) {
    const co = data.experience?.[0]?.company || "—";
    companyLine.textContent = co;
  }
  if (locationMetric) locationMetric.textContent = "WA";
  if (locationSub) locationSub.textContent = data.profile.location;
  if (ghUserLabel) ghUserLabel.textContent = `@${data.github_config.username}`;

  // Skills (top only)
  const skillsRow = document.getElementById("skillsRow");
  if (skillsRow) {
    skillsRow.innerHTML = (data.top_skills || [])
      .map(
        (s) =>
          `<span class="skill-pill px-3 py-1.5 text-xs rounded-lg mono">${escapeHtml(s)}</span>`
      )
      .join("");
  }

  // Highlights
  const list = document.getElementById("highlightsList");
  if (list) {
    const highlights = buildHighlights(data);
    list.innerHTML = highlights
      .map(
        (h) => `
      <article class="entity-row p-5">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div class="font-semibold">${escapeHtml(h.title)}</div>
            <div class="text-accent text-sm mt-0.5">${escapeHtml(h.org)} · ${escapeHtml(h.period)}</div>
          </div>
          <span class="skill-pill px-2.5 py-1 text-[10px] rounded mono uppercase tracking-wider">${escapeHtml(h.tag)}</span>
        </div>
        <p class="mt-3 text-sm text-muted leading-relaxed">${escapeHtml(h.blurb)}</p>
      </article>`
      )
      .join("");
  }

  // Contact
  const emailLink = document.getElementById("emailLink") as HTMLAnchorElement | null;
  const emailText = document.getElementById("emailText");
  const githubLink = document.getElementById("githubLink") as HTMLAnchorElement | null;
  const githubText = document.getElementById("githubText");
  const linkedinLink = document.getElementById("linkedinLink") as HTMLAnchorElement | null;
  const linkedinText = document.getElementById("linkedinText");

  if (emailLink && emailText) {
    emailLink.href = `mailto:${data.contact.email}`;
    emailText.textContent = data.contact.email;
  }
  if (githubLink && githubText) {
    githubLink.href = data.contact.github;
    githubText.textContent = data.contact.github.replace(/^https?:\/\//, "");
  }
  if (linkedinLink && linkedinText) {
    if (data.contact.linkedin) {
      linkedinLink.href = data.contact.linkedin;
      linkedinText.textContent = "linkedin.com/in/odennihy";
    } else {
      linkedinLink.style.display = "none";
    }
  }

  // Résumé PDF buttons — prefer local data/ PDF; fall back to LinkedIn
  const pdfPath = "data/Zachary-Odennihy-Resume.pdf";
  const resumeBtns = [
    document.getElementById("resumeBtn"),
    document.getElementById("resumeBtnFooter"),
  ].filter(Boolean) as HTMLAnchorElement[];

  void fetch(pdfPath, { method: "HEAD" })
    .then((r) => {
      const hint = document.getElementById("resumeHint");
      if (r.ok) {
        resumeBtns.forEach((b) => {
          b.href = pdfPath;
          b.setAttribute("download", "Zachary-Odennihy-Resume.pdf");
        });
        if (hint) hint.textContent = "PDF available · data/Zachary-Odennihy-Resume.pdf";
      } else {
        const fallback = data.contact.linkedin || `mailto:${data.contact.email}?subject=Resume%20request`;
        resumeBtns.forEach((b) => {
          b.href = fallback;
          b.removeAttribute("download");
          if (!data.contact.linkedin) {
            b.innerHTML = `<i class="fas fa-envelope" aria-hidden="true"></i> Request résumé`;
          } else {
            b.innerHTML = `<i class="fab fa-linkedin" aria-hidden="true"></i> Full profile on LinkedIn`;
          }
        });
        if (hint) {
          hint.textContent =
            "No PDF in data/ yet — button links to LinkedIn. Drop Zachary-Odennihy-Resume.pdf into data/ to enable download.";
        }
      }
    })
    .catch(() => {
      /* ignore */
    });
}

async function loadGitHub(username: string): Promise<void> {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  if (!navigator.onLine) {
    grid.innerHTML =
      '<div class="console-card p-6 text-sm text-muted">GitHub data is unavailable while offline.</div>';
    return;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API error: ${userRes.status}/${reposRes.status}`);
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    const repoCount = document.getElementById("repoCount");
    if (repoCount) {
      repoCount.textContent = String(user.public_repos ?? (Array.isArray(repos) ? repos.length : "—"));
    }

    if (!Array.isArray(repos) || repos.length === 0) {
      grid.innerHTML =
        '<div class="console-card p-6 text-sm text-muted">No public repositories yet.</div>';
      return;
    }

    // Exclude forks; prefer non-empty descriptions
    const filtered = repos
      .filter((r: { fork?: boolean }) => !r.fork)
      .slice(0, 6);

    grid.innerHTML = filtered
      .map(
        (repo: {
          name: string;
          description: string | null;
          html_url: string;
          full_name: string;
          language: string | null;
        }) => `
      <div class="console-card p-6">
        <div class="flex justify-between items-start gap-3">
          <div>
            <div class="font-semibold">${escapeHtml(repo.name)}</div>
            <div class="text-xs text-muted mt-1">${escapeHtml(repo.description || "No description provided")}</div>
          </div>
          <i class="fas fa-code-branch text-xl text-muted" aria-hidden="true"></i>
        </div>
        <div class="mt-5 flex items-center justify-between text-xs gap-2">
          <a href="${escapeHtml(repo.html_url)}" class="repo-link truncate" target="_blank" rel="noopener noreferrer">${escapeHtml(repo.full_name)}</a>
          <span class="text-muted mono shrink-0">${escapeHtml(repo.language || "")}</span>
        </div>
      </div>`
      )
      .join("");
  } catch (err) {
    console.error("GitHub load failed", err);
    grid.innerHTML =
      '<div class="console-card p-6 text-sm text-muted">Could not load GitHub repositories right now.</div>';
  }
}

void loadResume();
