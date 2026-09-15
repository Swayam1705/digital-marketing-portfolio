import React from "react";
import useGlobalScrollProgress from "../hooks/useGlobalScrollProgress";

export default function ScrollProgressBar() {
  const p = useGlobalScrollProgress({ lerpFactor: 0.15 });
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
