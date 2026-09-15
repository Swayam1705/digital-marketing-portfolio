import {
  Megaphone,
  Newspaper,
  Search,
  Mail,
  Palette,
  PenLine,
  Target,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { scrollToSection } from "../utils/scroll.js";

// Extend this map if you introduce new service icons in portfolioData.js.
const ICONS = {
  megaphone: Megaphone,
  newspaper: Newspaper,
  search: Search,
  mail: Mail,
  palette: Palette,
  pen: PenLine,
  target: Target,
  chart: BarChart3,
};

function ServiceCard({ service }) {
  const Icon = ICONS[service.icon] ?? Megaphone;
  const inner = (
    <>
      <span className="service-card__icon" aria-hidden="true">
        <Icon />
      </span>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <span className="service-card__link">
        Let&rsquo;s talk
        <ArrowRight aria-hidden="true" />
      </span>
    </>
  );

  // "#contact" style links scroll smoothly; other URLs behave like real links.
  if (service.link && service.link.startsWith("#")) {
    return (
      <button
        className="service-card"
        style={{ width: "100%", textAlign: "left" }}
        aria-label={service.title}
        onClick={() => scrollToSection(service.link.replace("#", ""))}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      className="service-card"
      href={service.link || "#contact"}
      aria-label={service.title}
    >
      {inner}
    </a>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="section services"
      aria-labelledby="services-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="What I offer"
          center
          title={<span id="services-title">Ways we could work together.</span>}
          intro="Areas I can help with now — and am actively developing. Think of these as starting points for a conversation, not a finished agency menu."
        />

        <ul className="services__grid" style={{ listStyle: "none" }}>
          {portfolioData.services.map((service, i) => (
            <Reveal
              as="li"
              key={service.title}
              delay={(i % 4) * 90}
              variant="scale"
              style={{ display: "flex" }}
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>

        <p className="services__footnote">
          Still learning, always learning — these reflect current interests and
          developing capabilities, not claims of senior expertise.
        </p>
      </div>
    </section>
  );
}
