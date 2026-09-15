import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hidden, setHidden] = useState(true);
  const [label, setLabel] = useState("");
  const [expand, setExpand] = useState(false);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, rx: 0, ry: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      if (hidden) setHidden(false);
    };
    const leave = () => setHidden(true);
    const over = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        setLabel(t.getAttribute("data-cursor") || "");
        setExpand(true);
      } else if (e.target.closest("a, button, [role='button']")) {
        setLabel("");
        setExpand(true);
      } else {
        setLabel("");
        setExpand(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseover", over);

    const tick = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.9;
      pos.current.y += (pos.current.ty - pos.current.y) * 0.9;
      pos.current.rx += (pos.current.tx - pos.current.rx) * 0.15;
      pos.current.ry += (pos.current.ty - pos.current.ry) * 0.15;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${pos.current.rx}px, ${pos.current.ry}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseover", over);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hidden]);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${hidden ? "cursor-hidden" : ""}`} />
      <div
        ref={ringRef}
        className={`cursor-ring ${hidden ? "cursor-hidden" : ""} ${expand ? "cursor-expand" : ""} ${label ? "cursor-label" : ""}`}
      >
        {label && <span>{label}</span>}
      </div>
    </>
  );
}
