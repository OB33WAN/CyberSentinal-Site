(function () {
  const body = document.body;
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mainNav = document.querySelector("[data-main-nav]");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    mainNav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll("[data-faq-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const answerId = button.getAttribute("aria-controls");
      const answer = answerId ? document.getElementById(answerId) : null;
      const expanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });

  const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-tab");
      tabButtons.forEach((candidate) => {
        candidate.setAttribute("aria-selected", String(candidate === button));
      });
      document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
        panel.hidden = panel.getAttribute("data-tab-panel") !== target;
      });
    });
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const storageKey = "cyberSentinelCookieChoice";
  const banner = document.querySelector("[data-cookie-banner]");
  const modal = document.querySelector("[data-cookie-modal]");
  const analyticsToggle = document.querySelector("[data-analytics-toggle]");
  const saved = safeGet(storageKey);

  if (saved && analyticsToggle) {
    try {
      const parsed = JSON.parse(saved);
      analyticsToggle.checked = Boolean(parsed.analytics);
    } catch (_) {
      analyticsToggle.checked = false;
    }
  }

  if (!saved && banner) {
    banner.classList.add("is-visible");
  }

  document.querySelectorAll("[data-cookie-open]").forEach((button) => {
    button.addEventListener("click", () => {
      if (modal) {
        modal.classList.add("is-visible");
        modal.querySelector("button")?.focus();
      }
    });
  });

  document.querySelectorAll("[data-cookie-close]").forEach((button) => {
    button.addEventListener("click", closeCookieModal);
  });

  document.querySelectorAll("[data-cookie-essential]").forEach((button) => {
    button.addEventListener("click", () => saveCookieChoice(false));
  });

  document.querySelectorAll("[data-cookie-save]").forEach((button) => {
    button.addEventListener("click", () => saveCookieChoice(Boolean(analyticsToggle && analyticsToggle.checked)));
  });

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeCookieModal();
    });
  }

  function saveCookieChoice(analytics) {
    safeSet(storageKey, JSON.stringify({
      essential: true,
      analytics,
      savedAt: new Date().toISOString()
    }));
    if (banner) banner.classList.remove("is-visible");
    closeCookieModal();
  }

  function closeCookieModal() {
    if (modal) modal.classList.remove("is-visible");
  }

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_) {
      // If storage is blocked, keep the page usable and simply do not persist the preference.
    }
  }
})();
