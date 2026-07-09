(function () {
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    const THEME_KEY = 'lark-portfolio-theme';
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');

    function applyTheme(theme) {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }
    }

    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(savedTheme);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem(THEME_KEY, next);
        });
    }

    async function loadResume() {
        const summaryText = document.getElementById('summaryText');
        if (!summaryText) return;

        try {
            const res = await fetch('Assets/resume.json');
            const data = await res.json();
            renderResume(data);
            loadGitHub(data.github_config.username);
        } catch (err) {
            console.error('Failed to load Assets/resume.json', err);
            summaryText.textContent =
                'Unable to load Assets/resume.json — if viewing locally via file://, run a local server (e.g. `python3 -m http.server`) since browsers block fetch() on file:// URLs.';
        }
    }

    function renderResume(data) {
        const headlineText = document.getElementById('headlineText');
        const companyText = document.getElementById('companyText');
        const summaryText = document.getElementById('summaryText');
        const lastUpdated = document.getElementById('lastUpdated');

        if (headlineText) headlineText.textContent = data.profile.headline;
        if (companyText) companyText.textContent = `${data.experience[0].company} • ${data.profile.location}`;
        if (summaryText) summaryText.textContent = data.profile.summary;
        if (lastUpdated) lastUpdated.textContent = data.meta.last_updated;

        const expGrid = document.getElementById('experienceGrid');
        if (expGrid) {
            expGrid.innerHTML = data.experience.map(job => {
                if (job.roles.length === 1) {
                    const role = job.roles[0];
                    return `
                    <div>
                        <div class="font-semibold">${role.title}</div>
                        <div class="text-accent text-sm">${job.company} • ${role.start} — ${role.end}</div>
                        <div class="mt-2 text-xs text-muted">${job.location}</div>
                        <div class="mt-3 text-sm text-muted leading-relaxed">${role.description}</div>
                    </div>`;
                }

                const rolesHtml = job.roles.map((role, i) => `
                    <div${i > 0 ? ' class="mt-4 pt-4 border-t border-theme"' : ''}>
                        <div class="font-semibold">${role.title}</div>
                        <div class="text-accent text-sm">${role.start} — ${role.end}</div>
                        <div class="mt-3 text-sm text-muted leading-relaxed">${role.description}</div>
                    </div>`).join('');
                return `<div><div class="text-accent text-sm font-semibold mb-3">${job.company} • ${job.location}</div>${rolesHtml}</div>`;
            }).join('');
        }

        const militaryBlock = document.getElementById('militaryBlock');
        if (militaryBlock) {
            const mil = data.military_service;
            militaryBlock.innerHTML = `
                <div class="grid md:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                        <div class="font-semibold">${mil.rank} — ${mil.mos}</div>
                        <div class="text-accent text-sm">${mil.branch}</div>
                        <div class="text-xs text-muted mt-1">${mil.unit} • ${mil.service_period}</div>
                        <div class="mt-3 text-sm text-muted leading-relaxed">${mil.description}</div>
                    </div>
                    <div>
                        <div class="section-header">DEPLOYMENT</div>
                        <div class="font-semibold">${mil.deployment.operation}</div>
                        <div class="text-xs text-muted mt-1">${mil.deployment.type} — ${mil.deployment.location}</div>
                        <div class="section-header mt-4">ADDITIONAL QUALIFICATIONS</div>
                        <div class="text-sm text-muted">${mil.additional_qualifications.join(', ')}</div>
                    </div>
                </div>`;
        }

        const educationGrid = document.getElementById('educationGrid');
        if (educationGrid) {
            educationGrid.innerHTML = data.education.map(ed => `
                <div>
                    <div class="font-semibold">${ed.credential}</div>
                    <div class="text-accent text-sm">${ed.institution} • ${ed.start} — ${ed.end}</div>
                    <div class="text-xs text-muted mt-1">${ed.status}</div>
                </div>`).join('');
        }

        const certsGrid = document.getElementById('certsGrid');
        if (certsGrid) {
            certsGrid.innerHTML = data.certifications.map(c => `
                <div class="px-4 py-2 text-xs skill-pill rounded">
                    ${c.name}${c.date ? ' <span class="text-muted">• ' + c.date + '</span>' : ''}
                </div>`).join('');
        }

        const skillsGrid = document.getElementById('skillsGrid');
        if (skillsGrid) {
            skillsGrid.innerHTML = data.skills_full_list.map(s =>
                `<div class="px-4 py-2 text-xs skill-pill rounded">${s}</div>`).join('');
        }

        const emailLink = document.getElementById('emailLink');
        const emailText = document.getElementById('emailText');
        const githubLink = document.getElementById('githubLink');
        const githubText = document.getElementById('githubText');
        const linkedinLink = document.getElementById('linkedinLink');
        const linkedinText = document.getElementById('linkedinText');

        if (emailLink && emailText) {
            emailLink.href = 'mailto:' + data.contact.email;
            emailText.textContent = data.contact.email;
        }

        if (githubLink && githubText) {
            githubLink.href = data.contact.github;
            githubText.textContent = data.contact.github.replace('https://', '');
        }

        if (linkedinLink && linkedinText) {
            if (data.contact.linkedin) {
                linkedinLink.href = data.contact.linkedin;
                linkedinText.textContent = 'linkedin.com/in/odennihy';
            } else {
                linkedinLink.style.display = 'none';
            }
        }
    }

    async function loadGitHub(username) {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        if (!navigator.onLine) {
            grid.innerHTML = '<div class="dash-card p-8 rounded-2xl text-sm text-muted">GitHub data is unavailable while offline.</div>';
            return;
        }

        try {
            const [userRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
            ]);
            const user = await userRes.json();
            const repos = await reposRes.json();

            const repoCount = document.getElementById('repoCount');
            if (repoCount) {
                repoCount.textContent = user.public_repos ?? repos.length;
            }

            if (!Array.isArray(repos) || repos.length === 0) {
                grid.innerHTML = '<div class="dash-card p-8 rounded-2xl text-sm text-muted">No public repositories yet.</div>';
                return;
            }

            grid.innerHTML = repos.slice(0, 6).map(repo => `
                <div class="dash-card p-8 rounded-2xl">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="font-semibold">${escapeHtml(repo.name)}</div>
                            <div class="text-xs text-muted mt-1">${escapeHtml(repo.description || 'No description provided')}</div>
                        </div>
                        <i class="fas fa-code-branch text-xl text-muted"></i>
                    </div>
                    <div class="mt-6 flex items-center justify-between text-xs">
                        <a href="${escapeHtml(repo.html_url)}" class="repo-link" target="_blank" rel="noopener">${escapeHtml(repo.full_name)}</a>
                        <span class="text-muted">${escapeHtml(repo.language || '')}</span>
                    </div>
                </div>`).join('');
        } catch (err) {
            console.error('GitHub API poll failed', err);
            grid.innerHTML = '<div class="dash-card p-8 rounded-2xl text-sm text-muted">GitHub data unavailable right now — API rate limit or network issue.</div>';
        }
    }

    loadResume();
})();
