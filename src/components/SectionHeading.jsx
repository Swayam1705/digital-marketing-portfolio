import Reveal from "./Reveal.jsx";

/**
 * Consistent section header: small eyebrow label, big editorial title,
 * optional intro paragraph.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  dark = false,
  as: TitleTag = "h2",
}) {
  return (
    <Reveal
      className={`section-head ${center ? "section-head--center" : ""}`}
    >
      {eyebrow && <span className={`eyebrow ${center ? "eyebrow--center" : ""}`}>{eyebrow}</span>}
      <TitleTag className="section-title">{title}</TitleTag>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}
