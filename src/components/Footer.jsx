import { ArrowUp, FileDown } from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import { scrollToSection } from "../utils/scroll.js";
import SocialIcon from "./SocialIcon.jsx";

const SECTION_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Education" },
  { id: "services", label: "Services" },
  { id: "blog", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const { personal, socials } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="footer grain">
      <div className="container">
        <p className="eyebrow" style={{ color: "var(--color-coral)" }}>
          {personal.role}
        </p>
        <h2 className="footer__statement" style={{ marginTop: "1.2rem" }}>
          See you on the <span className="grad">next campaign.</span>
        </h2>

        <div className="footer__grid">
          <div className="footer__about">
            <p className="footer__brand">{personal.name}</p>
            <p className="footer__about-text">{personal.tagline}</p>
            <p className="footer__about-text">{personal.location}</p>
            <button
              onClick={() => scrollToSection("resume")}
              className="ulink"
              style={{
                marginTop: "1rem",
                color: "var(--color-coral)",
                background: "none",
                border: 0,
                padding: 0,
                font: "inherit",
                cursor: "pointer",
              }}
            >
              <FileDown size={16} aria-hidden="true" />
              Download résumé
            </button>
          </div>

          <nav aria-label="Footer sections">
            <p className="footer__col-title">Explore</p>
            <ul className="footer__links">
              {SECTION_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    style={{
                      background: "none",
                      border: 0,
                      padding: 0,
                      color: "inherit",
                      font: "inherit",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="footer__col-title">Elsewhere</p>
            <ul className="footer__links">
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}
                  >
                    <SocialIcon platform={social.platform} size={15} />
                    {social.platform}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {personal.name}. All rights reserved.
          </p>
          <button
            className="footer__top"
            onClick={() => scrollToSection("home")}
            style={{ background: "none", border: 0, cursor: "pointer", color: "inherit" }}
          >
            Back to top
            <ArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
