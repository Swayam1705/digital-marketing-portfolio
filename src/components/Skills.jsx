import { useState } from "react";
import {
  PenLine,
  TrendingUp,
  Palette,
  BarChart3,
  Plus,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

// Icon map — extend here if you add new `icon` values in portfolioData.js.
const GROUP_ICONS = {
  pen: PenLine,
  trending: TrendingUp,
  palette: Palette,
  chart: BarChart3,
};

function SkillItem({ skill }) {
  const [open, setOpen] = useState(false);
  const panelId = `skill-desc-${skill.name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <li>
      <button
        className="skill-btn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{skill.name}</span>
        <Plus aria-hidden="true" />
      </button>
      {open && (
        <p id={panelId} className="skill-desc">
          {skill.description}
        </p>
      )}
    </li>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          eyebrow="The toolkit"
          title={<span id="skills-title">A marketing toolkit, not a trophy shelf.</span>}
          intro="No invented percentage scores — these are the disciplines I work across. Tap any skill to read how I apply it."
        />

        <div className="skills__grid">
          {portfolioData.skillGroups.map((group, i) => {
            const Icon = GROUP_ICONS[group.icon] ?? PenLine;
            return (
              <Reveal
                as="article"
                className="toolkit"
                key={group.category}
                delay={i * 100}
                variant="scale"
              >
                <header className="toolkit__head">
                  <span className="toolkit__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="toolkit__category">{group.category}</h3>
                    <p className="toolkit__tagline">{group.tagline}</p>
                  </div>
                </header>
                <ul className="toolkit__items">
                  {group.items.map((skill) => (
                    <SkillItem key={skill.name} skill={skill} />
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
