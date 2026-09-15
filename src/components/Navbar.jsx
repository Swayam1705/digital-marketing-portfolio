import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [ready, setReady] = useState(false);

  const links = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Work", href: "#projects", id: "projects" },
    { name: "Education", href: "#experience", id: "experience" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    // entrance animation
    const t = setTimeout(() => setReady(true), 80);

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // active section highlight
      const ids = ["hero", "about", "skills", "projects", "experience", "services", "contact"];
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom > 140) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`clean-top-nav ${scrolled ? "is-scrolled" : ""} ${ready ? "is-ready" : ""}`}>
      <div className="nav-container">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => handleScroll(e, "#hero")}
        >
          <span className="logo-mark" aria-hidden="true" />
          <span className="logo-text">[YOUR NAME]</span>
        </a>

        <nav className="nav-menu" aria-label="Primary">
          {links.map((link, i) => (
            <a
              key={link.id}
              href={link.href}
              className={active === link.id ? "is-active" : ""}
              style={{ transitionDelay: `${120 + i * 40}ms` }}
              onClick={(e) => handleScroll(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
