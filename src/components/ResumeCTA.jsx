import { useState } from "react";
import { FileDown, FileWarning } from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";

export default function ResumeCTA() {
  const { resume } = portfolioData.personal;
  const [missing, setMissing] = useState(false);
  const [checking, setChecking] = useState(false);

  // We always preventDefault synchronously (an async handler can't cancel the
  // default action after an await), verify the PDF exists, and then either
  // trigger the real download or show a friendly "not added yet" note.
  const handleClick = async (e) => {
    e.preventDefault();
    if (checking) return;

    setChecking(true);
    let exists = false;
    try {
      const res = await fetch(resume, { method: "HEAD" });
      // Some hosts return the SPA's index.html (200 text/html) for unknown
      // paths, so a missing PDF is detected by its content type too.
      const type = res.headers.get("content-type") || "";
      exists = res.ok && type.includes("pdf");
    } catch {
      exists = false;
    }
    setChecking(false);

    if (exists) {
      const link = document.createElement("a");
      link.href = resume;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      setMissing(true);
    }
  };

  return (
    <section className="section" id="resume" aria-labelledby="resume-title">
      <div className="container">
        <Reveal variant="scale">
          <div className="resume-cta grain">
            <p className="eyebrow" style={{ color: "var(--color-coral)" }}>
              Resume
            </p>
            <h2 id="resume-title" className="resume-cta__title">
              Want the full picture?
            </h2>
            <p className="resume-cta__sub">Download my resume.</p>

            <div className="resume-cta__actions">
              <a
                className="btn btn-coral"
                href={resume}
                download
                onClick={handleClick}
                aria-describedby="resume-note"
              >
                <FileDown aria-hidden="true" />
                {checking ? "Checking…" : "Download CV"}
              </a>
            </div>

            {missing && (
              <p id="resume-note" className="resume-cta__note" role="status">
                <FileWarning aria-hidden="true" />
                No resume PDF yet — drop yours at{" "}
                <code>public/resume/your-resume.pdf</code> (see
                CUSTOMIZATION.md).
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
