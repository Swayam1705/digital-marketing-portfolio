import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, ExternalLink, CheckCircle2 } from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

/* ----------------------------- Case study modal ---------------------------- */
function ProjectModal({ project, index, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    previousFocus.current = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Simple focus trap
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousFocus.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(e) => {
        // Click on the backdrop (not the panel) closes the modal.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />

      <div className="modal__panel" ref={panelRef} tabIndex={-1}>
        <button
          ref={closeRef}
          className="modal__close"
          onClick={onClose}
          aria-label="Close case study"
        >
          <X aria-hidden="true" />
        </button>

        <div className="modal__media">
          <img src={project.image} alt={project.alt} />
        </div>

        <div className="modal__body">
          <span className="modal__chip">{project.category}</span>
          <h3 id="modal-title" className="modal__title">
            {project.title}
          </h3>

          <div className="modal__sections">
            <div>
              <p className="modal__label">OBJECTIVE</p>
              <p className="modal__text">{project.objective}</p>
            </div>
            <div>
              <p className="modal__label">APPROACH</p>
              <p className="modal__text">{project.approach}</p>
            </div>
            <div>
              <p className="modal__label">TOOLS</p>
              <ul className="modal__tools" aria-label="Tools used">
                {project.tools.map((tool) => (
                  <li key={tool} className="modal__tool">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="modal__label">OUTCOME / LEARNING</p>
              <p className="modal__text" style={{ display: "flex", gap: "0.6rem" }}>
                <CheckCircle2
                  aria-hidden="true"
                  style={{
                    width: 20,
                    height: 20,
                    flex: "none",
                    marginTop: 3,
                    color: "var(--color-violet)",
                  }}
                />
                <span>{project.outcome}</span>
              </p>
            </div>
          </div>

          <div className="modal__foot">
            {project.link && project.link !== "#" && (
              <a
                className="btn btn-primary"
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
              >
                {project.linkLabel || "View project"}
                <ExternalLink aria-hidden="true" />
              </a>
            )}
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Section ---------------------------------- */
export default function Projects() {
  const [active, setActive] = useState(null); // active project index

  return (
    <section id="work" className="section projects" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          dark
          title={
            <span id="work-title">Ideas I&rsquo;ve turned into experiments.</span>
          }
          intro="Coursework, self-initiated campaigns and hands-on tests. Each case study covers the objective, the approach and what I actually learned."
        />

        <div className="projects__grid">
          {portfolioData.projects.map((project, i) => (
            <Reveal
              key={`${project.title}-${i}`}
              delay={i * 110}
              variant="scale"
            >
              <button
                className="project-card"
                onClick={() => setActive(i)}
                aria-haspopup="dialog"
                aria-label={`Open case study: ${project.title}`}
              >
                <div className="project-card__media">
                  <img src={project.image} alt={project.alt} loading="lazy" />
                  <span className="project-card__chip">{project.category}</span>
                </div>
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__objective">{project.objective}</p>
                  <span className="project-card__cta">
                    View case study
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null && (
        <ProjectModal
          project={portfolioData.projects[active]}
          index={active}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
