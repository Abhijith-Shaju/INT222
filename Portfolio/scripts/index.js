/* ═══════════════════════════════════════════
   index.js — Abhijith Shaju Portfolio
═══════════════════════════════════════════ */

// ── DOM refs ──────────────────────────────
const main           = document.getElementById("main");
const leftTrack      = document.querySelector(".left-track");
const rightTrack     = document.querySelector(".right-track");
const navUp          = document.getElementById("nav-up");
const navDown        = document.getElementById("nav-down");
const heroEnter      = document.getElementById("hero-enter");
const heroScroll     = document.getElementById("hero-scroll");
const header         = document.getElementById("header");
const mobileToggle   = document.getElementById("mobile-menu-toggle");
const mobileNav      = document.getElementById("mobile-nav");
const footerScrollTop = document.getElementById("footer-scroll-top");
const scrollDots     = document.querySelectorAll(".scroll-dot");
const navLinks       = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

const totalSections  = leftTrack ? leftTrack.children.length : 0;
let activeIndex      = 0;

// ── Section names (for header nav active state) ──
const sectionNames = ["Home", "About", "Work", "Contact"];

// ─────────────────────────────────────────
// HERO → PANELS SCROLL
// ─────────────────────────────────────────
const scrollToPanels = () => {
    if (!main) return;
    main.scrollIntoView({ behavior: "smooth", block: "start" });
};

heroEnter?.addEventListener("click", scrollToPanels);
heroScroll?.addEventListener("click", scrollToPanels);

// ─────────────────────────────────────────
// STICKY HEADER
// ─────────────────────────────────────────
if (header) {
    const onScroll = () => {
        header.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on load
}

// ─────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────
if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("open");
        mobileToggle.classList.toggle("open", isOpen);
        mobileNav.setAttribute("aria-hidden", String(!isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
        if (
            mobileNav.classList.contains("open") &&
            !mobileNav.contains(e.target) &&
            !mobileToggle.contains(e.target)
        ) {
            mobileNav.classList.remove("open");
            mobileToggle.classList.remove("open");
            mobileNav.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
    });
}

// ─────────────────────────────────────────
// FOOTER SCROLL-TO-TOP
// ─────────────────────────────────────────
footerScrollTop?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ─────────────────────────────────────────
// DUAL-PANEL NAVIGATION
// ─────────────────────────────────────────
if (main && leftTrack && rightTrack && navUp && navDown && totalSections > 0) {

    main.style.setProperty("--card-count", totalSections);

    const updateDots = () => {
        scrollDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === activeIndex);
        });
    };

    const updateHeaderNavActive = () => {
        navLinks.forEach((link) => {
            const sec = parseInt(link.dataset.section, 10);
            link.classList.toggle("active", sec === activeIndex);
        });
        mobileNavLinks.forEach((link) => {
            const sec = parseInt(link.dataset.section, 10);
            link.classList.toggle("active", sec === activeIndex);
        });
    };

    const updateNavigation = () => {
        main.style.setProperty("--active-index", activeIndex);
        navUp.disabled   = activeIndex === 0;
        navDown.disabled = activeIndex === totalSections - 1;
        updateDots();
        updateHeaderNavActive();
    };

    const goTo = (index) => {
        if (index < 0 || index >= totalSections) return;
        activeIndex = index;
        updateNavigation();
        // Scroll the main panel into view if not visible
        main.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    navUp.addEventListener("click", () => goTo(activeIndex - 1));
    navDown.addEventListener("click", () => goTo(activeIndex + 1));

    // ── Keyboard navigation ──
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp")   navUp.click();
        if (e.key === "ArrowDown") navDown.click();
    });

    // ── Header nav links jump to section ──
    const allNavLinks = [...navLinks, ...mobileNavLinks];
    allNavLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sec = parseInt(link.dataset.section, 10);
            if (!isNaN(sec)) {
                goTo(sec);
                // Close mobile nav if open
                mobileNav?.classList.remove("open");
                mobileToggle?.classList.remove("open");
                mobileNav?.setAttribute("aria-hidden", "true");
                document.body.style.overflow = "";
            }
        });
    });

    // ── Swipe / touch support ──
    let touchStartY = null;

    main.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    main.addEventListener("touchend", (e) => {
        if (touchStartY === null) return;
        const deltaY = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(deltaY) > 40) {
            const scrollingDown = deltaY > 0;
            const scrollingUp   = deltaY < 0;
            // Only consume the swipe if there's a panel to go to
            if (scrollingDown && activeIndex < totalSections - 1) navDown.click();
            else if (scrollingUp && activeIndex > 0)              navUp.click();
            // else: let touch scroll the page naturally
        }
        touchStartY = null;
    }, { passive: true });

    // ── Wheel on panel section ──
    // Only intercept the wheel event when we can actually move to another panel.
    // If we're at the first panel and scrolling up, or at the last panel and
    // scrolling down, do NOT preventDefault — let the page scroll normally so
    // the user can reach the hero above or the footer below.
    let wheelDebounce = null;
    main.addEventListener("wheel", (e) => {
        const scrollingDown = e.deltaY > 10;
        const scrollingUp   = e.deltaY < -10;

        const canGoDown = scrollingDown && activeIndex < totalSections - 1;
        const canGoUp   = scrollingUp   && activeIndex > 0;

        if (!canGoDown && !canGoUp) {
            // Nothing to intercept — let the browser scroll the page
            return;
        }

        e.preventDefault();
        if (wheelDebounce) return;

        if (canGoDown) navDown.click();
        else if (canGoUp) navUp.click();

        wheelDebounce = setTimeout(() => { wheelDebounce = null; }, 800);
    }, { passive: false });

    updateNavigation();
}
