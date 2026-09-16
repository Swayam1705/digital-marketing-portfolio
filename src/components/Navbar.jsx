import React, { useEffect, useState } from "react";
import { portfolioData } from "../data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [time, setTime] = useState("");
  const [ready, setReady] = useState(false);

  const links = [
    { name: "About", href: "#about", id: "about" },
    { name: "Craft", href: "#skills", id: "skills" },
    { name: "Work", href: "#projects", id: "projects" },
    { name: "Metrics", href: "#funnel", id: "funnel" },
    { name: "Timeline", href: "#experience", id: "experience" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);

    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const clock = setInterval(updateTime, 1000);

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const ids = ["hero", "about", "skills", "projects", "funnel", "experience", "services", "contact"];
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom > 140) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(t);
      clearInterval(clock);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""} ${ready ? "is-ready" : ""}`}>
      <div className="site-nav-inner">
        <div className="site-nav-left">
          <a href="#hero" className="site-nav-logo" onClick={(e) => go(e, "#hero")}>
            <span className="site-nav-mark" aria-hidden="true" />
            <span className="site-nav-name">{portfolioData?.name || "Portfolio"}</span>
          </a>

          <div className="site-nav-status" aria-label="Availability">
            <span className="site-nav-dot" />
            <span>AVAILABLE FOR WORK</span>
            <span className="site-nav-sep">•</span>
            <span className="site-nav-time">{time}</span>
          </div>
        </div>

        <nav className="site-nav-links" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={active === link.id ? "is-active" : ""}
              onClick={(e) => go(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
