import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

/* Widths make the bars read as a funnel without faking any numbers. */
const BAR_WIDTHS = ["100%", "82%", "64%", "48%"];

export default function Funnel() {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Trigger the animated bars once they enter the viewport.
  useEffect(() => {
    const node = wrapRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="performance"
      className="section section--tint"
      aria-labelledby="performance-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Performance"
          center
          title={<span id="performance-title">How I think about performance.</span>}
          intro="Numbers belong to real campaigns — so instead of fake statistics, here is the funnel I use to decide which numbers are worth measuring."
        />

        <Reveal>
        <div
          ref={wrapRef}
          className={`funnel__wrap ${visible ? "is-visible" : ""}`}
        >
          <div className="funnel" role="list" aria-label="Marketing funnel stages">
            {portfolioData.funnel.map((row, i) => (
              <div className="funnel__row" role="listitem" key={row.stage}>
                <div className="funnel__label">
                  <span className="funnel__stage">{row.stage}</span>
                  <span className="funnel__question">{row.question}</span>
                  {/* Signals live in the label column so they never clip
                      inside the shrinking funnel bars. */}
                  <span className="funnel__signals">{row.signals}</span>
                </div>
                <div
                  className="funnel__bar"
                  style={{ "--w": BAR_WIDTHS[i] }}
                >
                  <span className="funnel__metric">{row.metric}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="funnel__note">
            <Info aria-hidden="true" />
            <span>
              The dashed <strong>[ADD … METRIC]</strong> pills are deliberate
              placeholders. When you run a real campaign, replace them in{" "}
              <code>src/data/portfolioData.js</code> with numbers you can source
              and stand behind — never estimate.
            </span>
          </p>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
