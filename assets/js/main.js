document.addEventListener("DOMContentLoaded", () => {
  // Year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // === THEME ===
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☾" : "☀";
    }
  };

  // Thème initial : localStorage ou media query
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    applyTheme(storedTheme);
  } else {
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "dark");
  }

  // Toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("theme", next);
    });
  }

  // === HOLOGRAM tilt effect ===
  const holo = document.querySelector(".hologram-card");
  if (holo) {
    const strength = 15;

    holo.addEventListener("mousemove", (e) => {
      const rect = holo.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = (x / rect.width) * strength;
      const rotateX = (-y / rect.height) * strength;

      holo.style.transform =
        `perspective(900px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-4px)`;
    });

    holo.addEventListener("mouseleave", () => {
      holo.style.transform =
        "perspective(900px) rotateY(-10deg) rotateX(5deg)";
    });
  }
});