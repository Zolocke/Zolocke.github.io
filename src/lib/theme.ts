const THEME_KEY = "lark-portfolio-theme";

export type Theme = "dark" | "light";

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }
}

export function initTheme(toggleEl: HTMLElement | null): void {
  const saved = (localStorage.getItem(THEME_KEY) as Theme | null) || "dark";
  applyTheme(saved);

  toggleEl?.addEventListener("click", () => {
    const current: Theme =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    const next: Theme = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}
