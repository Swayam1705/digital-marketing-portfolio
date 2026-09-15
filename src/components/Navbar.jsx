import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import { useScrolled } from "../hooks/useScrolled.js";
import { scrollToSection } from "../utils/scroll.js";

// Central place for the section navigation.
const NAV_LINKS = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "experience", label: "Education", index: "04" },
  { id: "services", label: "Services", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

export default function Navbar() {
  const scrolled = useScrolled(30);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const { name } = portfolioData.personal;

  /* Scroll progress bar (rAF-throttled) */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Escape closes the mobile menu + simple focus management */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Lock body scroll while the mobile menu is open, and remove the closed
     menu from the tab order (the `inert` property, set via ref). */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (menuRef.current) menuRef.current.inert = !open;
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    // Wait for the menu close before scrolling on mobile.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <header
        className={`navbar ${scrolled ? "is-scrolled" : ""} ${
          open ? "is-menu-open" : ""
        }`}
      >
        <nav className="container navbar__inner" aria-label="Primary">
          <button
            className="navbar__brand"
            onClick={() => go("home")}
            style={{ display: "inline-flex", alignItems: "center", background: "none", border: 0, cursor: "pointer", padding: 0 }}
            aria-label={`${name} — back to top`}
          >
            <span className="navbar__brand-mark" aria-hidden="true">
              ◎
            </span>
            {name}
          </button>

          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button className="navbar__link" onClick={() => go(link.id)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            ref={toggleRef}
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>

        {/* Scroll progress indicator */}
        <div
          className="scroll-progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button className="mobile-menu__link" onClick={() => go(link.id)}>
                {link.label}
                <span aria-hidden="true">{link.index}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__foot">
          <p>{portfolioData.personal.role}</p>
          <p>{portfolioData.personal.location}</p>
        </div>
      </div>
    </>
  );
}
