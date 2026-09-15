import { useEffect, useRef, useState } from "react";

export default function useGlobalScrollProgress({ lerpFactor = 0.075 } = {}) {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY || window.pageYOffset || 0;
      targetRef.current = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    };

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = reduced ? 1 : lerpFactor;

    const tick = () => {
      const t = targetRef.current;
      const s = smoothRef.current;
      const next = s + (t - s) * k;
      smoothRef.current = Math.abs(next - t) < 0.00001 ? t : next;
      setProgress(smoothRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    compute();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lerpFactor]);

  return progress;
}
