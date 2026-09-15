import { MapPin, GraduationCap, Compass, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  const {
    bio,
    profileImage,
    profileAlt,
    location,
    role,
    focusAreas,
  } = portfolioData.personal;
  const { journey } = portfolioData;

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title={<>Behind the strategy.</>}
        />

        <div className="about__grid">
          <Reveal variant="left" className="about__media">
            <figure className="about__photo-frame">
              {/* Replace profileImage in src/data/portfolioData.js */}
              <img src={profileImage} alt={profileAlt} loading="lazy" />
              <figcaption className="about__photo-note">
                Replace with your photo
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <p className="about__lead">{bio}</p>
            </Reveal>

            <Reveal delay={120}>
              <div className="about__facts">
                <span className="fact-chip">
                  <Compass aria-hidden="true" />
                  {role}
                </span>
                <span className="fact-chip">
                  <MapPin aria-hidden="true" />
                  {location}
                </span>
                <span className="fact-chip">
                  <GraduationCap aria-hidden="true" />
                  Student
                </span>
              </div>
            </Reveal>

            {focusAreas?.length > 0 && (
              <Reveal delay={200}>
                <div className="about__facts">
                  {focusAreas.map((focus) => (
                    <span key={focus} className="fact-chip">
                      <Sparkles aria-hidden="true" />
                      {focus}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Simple journey timeline (placeholder milestones) */}
            <div className="journey" aria-label="Personal journey timeline">
              {journey.map((item, i) => (
                <Reveal
                  as="div"
                  className="journey__item"
                  key={`${item.period}-${i}`}
                  delay={i * 80}
                >
                  <p className="journey__period">{item.period}</p>
                  <p className="journey__title">{item.title}</p>
                  <p className="journey__desc">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
