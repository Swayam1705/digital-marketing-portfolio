import React, { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-drawer" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕ ESC
        </button>

        <div className="modal-content">
          <span className="modal-category">{project.category || "CAMPAIGN CASE STUDY"}</span>
          <h2 className="modal-title">{project.title}</h2>

          {/* Key Metric Highlights */}
          {project.metrics && (
            <div className="modal-metrics-grid">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="metric-badge">
                  <span className="metric-value">{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="modal-section">
            <h3>The Challenge</h3>
            <p>{project.objective || project.description || "Building scalable audience traction in a crowded competitive market."}</p>
          </div>

          <div className="modal-section">
            <h3>Strategic Approach</h3>
            <p>{project.approach || "Leveraged audience segmentation, hyper-targeted ad copy, and organic community hooks to maximize retention and conversion rates."}</p>
          </div>

          {project.tools && (
            <div className="modal-section">
              <h3>Marketing Stack & Tools</h3>
              <div className="modal-tags">
                {project.tools.map((tool, i) => (
                  <span key={i} className="tool-tag">{tool}</span>
                ))}
              </div>
            </div>
          )}

          {project.outcome && (
            <div className="modal-section outcome-box">
              <h3>Campaign Results & ROI</h3>
              <p>{project.outcome}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
