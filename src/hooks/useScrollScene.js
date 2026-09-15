import { useEffect, useRef, useState } from "react";

/**
 * Returns local scene progress (0..1) for a section based on its
 * position relative to the viewport.
 *  - 0 when the section top hits the viewport bottom
 *  - 1 when the section bottom leaves the viewport top
 */
export default function useScrollScene(ref) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const seen = vh - rect.top;
      const p = Math.min(1, Math.max(0, seen / total));
      setProgress(p);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        compute();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ref]);

  return progress;
}
