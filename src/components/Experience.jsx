import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

/**
 * "Learning in motion" — one flexible timeline that merges EDUCATION and
 * EXPERIENCE entries (internships, freelance, clubs, coursework...).
 * All content comes from portfolioData.js.
 */
export default function Experience() {
  const { education, experience } = portfolioData;

  // Tag and merge both data sources. Reorder/filter here if you prefer one
  // combined chronological list.
  const items = [
    ...education.map((entry) => ({ ...entry, type: "Education", kind: "edu" })),
    ...experience.map((entry) => ({
      ...entry,
      // Normalize fields for rendering.
      title: entry.role,
      organization: entry.organization,
      type: "Experience",
      kind: "exp",
    })),
  ];

  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Education & experience"
          title={<span id="experience-title">Learning in motion.</span>}
          intro="Studying, interning, freelancing and experimenting — every entry below is a step in the same journey."
        />

        <ol className="timeline" style={{ listStyle: "none" }}>
          {items.map((item, i) => (
            <Reveal
              as="li"
              className="timeline__item"
              key={`${item.kind}-${i}`}
              variant="left"
              delay={i * 70}
            >
              <div className="timeline__meta">
                <span className="timeline__period">{item.period}</span>
                <span
                  className={`timeline__type ${
                    item.kind === "exp" ? "timeline__type--exp" : ""
                  }`}
                >
                  {item.type}
                </span>
              </div>
              <div className="timeline__content">
                <h3 className="timeline__role">
                  {item.kind === "edu" ? item.program : item.title}
                </h3>
                <p className="timeline__org">
                  {item.kind === "edu" ? item.institution : item.organization}
                </p>
                {item.description && (
                  <p className="timeline__desc">{item.description}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
