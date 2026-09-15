import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

/**
 * "What I believe" — positioning statements (not claims of experience).
 * Content lives in portfolioData.js → beliefs.
 */
export default function Beliefs() {
  return (
    <section
      className="section beliefs"
      id="beliefs"
      aria-labelledby="beliefs-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="What I believe"
          title={<span id="beliefs-title">Principles behind the work.</span>}
          intro="Three beliefs that shape how I approach marketing — curious before clever, clear before loud."
          center
        />

        <div className="beliefs__grid">
          {portfolioData.beliefs.map((belief, i) => (
            <Reveal
              as="article"
              className="belief"
              key={belief.number}
              delay={i * 130}
              variant="scale"
            >
              <span className="belief__number" aria-hidden="true">
                {belief.number}
              </span>
              <h3 className="belief__title">{belief.title}</h3>
              <p className="belief__text">{belief.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
