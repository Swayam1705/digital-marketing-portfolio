import React, { useEffect, useRef, useState } from "react";

function Counter({ target, symbol = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseFloat(target);
          const duration = 1600; // ms
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = end / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, stepTime);

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="count-num">
      {symbol}
      {Number.isInteger(target) ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function Funnel() {
  return (
    <section className="funnel-section">
      <div className="funnel-intro">
        <h2>Performance Telemetry</h2>
        <p>Data-backed marketing execution across every phase of the conversion funnel.</p>
      </div>

      <div className="telemetry-grid">
        <div className="telemetry-card">
          <span className="stage-tag">STAGE 01 — AWARENESS</span>
          <h3><Counter target={3.8} suffix="M+" /></h3>
          <p className="metric-name">Cross-Platform Organic Reach</p>
          <p className="metric-detail">Optimized creative hooks & audience targeting algorithms.</p>
        </div>

        <div className="telemetry-card">
          <span className="stage-tag">STAGE 02 — ENGAGEMENT</span>
          <h3><Counter target={14.8} symbol="+" suffix="%" /></h3>
          <p className="metric-name">Average Engagement Rate</p>
          <p className="metric-detail">Interactive content frameworks & community building.</p>
        </div>

        <div className="telemetry-card">
          <span className="stage-tag">STAGE 03 — CONVERSION</span>
          <h3><Counter target={4.2} suffix="x" /></h3>
          <p className="metric-name">Average ROAS Scaled</p>
          <p className="metric-detail">Paid ad retargeting & high-converting landing pages.</p>
        </div>

        <div className="telemetry-card">
          <span className="stage-tag">STAGE 04 — RETENTION</span>
          <h3><Counter target={38} suffix="%" /></h3>
          <p className="metric-name">Repeat Purchase Rate</p>
          <p className="metric-detail">Automated email sequences & brand loyalty campaigns.</p>
        </div>
      </div>
    </section>
  );
}
