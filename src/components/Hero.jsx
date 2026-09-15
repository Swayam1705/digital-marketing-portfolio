import { ArrowRight, Mail } from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import { scrollToSection } from "../utils/scroll.js";

export default function Hero() {
  const { name, role, tagline, intro } = portfolioData.personal;

  // Split the tagline at the first word to accent it. Falls back gracefully
  // for placeholder text (the whole tagline simply stays unaccented if short).
  const words = tagline.split(" ");
  const accentWord = words.length > 2 ? words[words.length - 1] : null;
  const taglineStart = accentWord
    ? words.slice(0, -1).join(" ")
    : tagline;

  return (
    <section id="home" className="hero grain" aria-labelledby="hero-heading">
      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow hero__anim hero__anim--1">
          {role}
        </p>

        <h1
          id="hero-heading"
          className="hero__name hero__anim hero__anim--2"
        >
          {name}
        </h1>

        <p className="hero__tagline hero__anim hero__anim--3">
          {accentWord ? (
            <>
              {taglineStart} <em>{accentWord}</em>
            </>
          ) : (
            tagline
          )}
        </p>

        <p className="hero__intro hero__anim hero__anim--4">{intro}</p>

        <div className="hero__actions hero__anim hero__anim--5">
          <button
            className="btn btn-coral"
            onClick={() => scrollToSection("work")}
          >
            Explore My Work
            <ArrowRight aria-hidden="true" />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => scrollToSection("contact")}
          >
            <Mail aria-hidden="true" />
            Let&rsquo;s Connect
          </button>
        </div>
      </div>

      {/* Decorative abstract "campaign dashboard" — purely visual */}
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__card">
          <div className="hero__card-row">
            <span
              className="hero__card-dot"
              style={{ background: "var(--color-coral)" }}
            />
            <span className="hero__card-line" style={{ width: "45%" }} />
          </div>
          <div className="hero__bars">
            {[40, 62, 48, 78, 58, 92, 70].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="hero__card">
          <div className="hero__card-row">
            <span
              className="hero__card-dot"
              style={{ background: "var(--color-violet-bright)" }}
            />
            <span className="hero__card-line" style={{ width: "62%" }} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <span
              className="hero__card-line"
              style={{ width: "30%", height: 34, borderRadius: 10 }}
            />
            <span
              className="hero__card-line"
              style={{ width: "48%", height: 34, borderRadius: 10 }}
            />
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue__mouse" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
