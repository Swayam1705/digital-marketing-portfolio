import React, { useEffect, useRef } from "react";
import useGlobalScrollProgress from "../hooks/useGlobalScrollProgress";

export default function GlobalImmersiveCanvas() {
  const canvasRef = useRef(null);
  const progress = useGlobalScrollProgress({ lerpFactor: 0.08 });
  const progressRef = useRef(0);
  const particlesRef = useRef([]);
  const dimsRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 });
  const rafRef = useRef(null);

  useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const isMobile = window.innerWidth <= 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { w, h };
      initParticles(w, h, isMobile);
    };

    const initParticles = (w, h, mobile) => {
      const density = mobile ? 0.00004 : 0.00008; // LOWER density = NO lag
      const count = Math.min(80, Math.max(30, Math.floor(w * h * density)));
      const arr = new Array(count);
      for (let i = 0; i < count; i++) {
        arr[i] = {
          x: Math.random() * w, y: Math.random() * h,
          vx: 0, vy: 0,
          bx: Math.random(), by: Math.random(),
          r: 0.8 + Math.random() * 1.2,
          seed: Math.random() * Math.PI * 2,
        };
      }
      particlesRef.current = arr;
    };

    const onMove = (e) => { mouseRef.current.tx = e.clientX; mouseRef.current.ty = e.clientY; };
    const onLeave = () => { mouseRef.current.tx = -9999; mouseRef.current.ty = -9999; };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    // BONE & EMBER palette (Pre-formatted strings for speed)
    const bgTopStr = "rgb(242, 237, 228)";
    const bgBotStr = "rgb(232, 224, 210)";
    const inkRGB = "20, 18, 16";
    const emberRGB = "255, 90, 31";

    let last = performance.now();

    const render = (now) => {
      const dt = Math.min(32, now - last) / 1000; // Cap dt to prevent physics explosions
      last = now;
      const p = progressRef.current;
      const { w, h } = dimsRef.current;

      // Fill background (fast)
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, bgTopStr);
      g.addColorStop(1, bgBotStr);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const m = mouseRef.current;
      if (m.tx !== -9999) {
        m.x += (m.tx - m.x) * 0.15;
        m.y += (m.ty - m.y) * 0.15;
      }

      const P = particlesRef.current;
      const N = P.length;

      // Phase calculation (Simplified for speed)
      const p1 = Math.max(0, Math.min(1, p * 3));       // 0 to 0.33
      const p2 = Math.max(0, Math.min(1, (p-0.33)*3));  // 0.33 to 0.66
      const p3 = Math.max(0, Math.min(1, (p-0.66)*3));  // 0.66 to 1.0

      for (let i = 0; i < N; i++) {
        const pt = P[i];
        
        // Base drift
        let tx = pt.bx;
        let ty = pt.by;

        // Evolve coordinates based on progress (cleaner math)
        if (p < 0.33) {
          // Vortex
          const a = pt.seed + p1 * 3;
          const r = 0.2 + 0.1 * Math.sin(pt.seed * 3);
          tx = tx * (1-p1) + (0.5 + Math.cos(a) * r) * p1;
          ty = ty * (1-p1) + (0.5 + Math.sin(a) * r * 0.8) * p1;
        } else if (p < 0.66) {
          // Grid / Stream
          const cols = isMobile ? 4 : 8;
          const gx = 0.1 + ((i % cols) / (cols - 1)) * 0.8;
          const gy = 0.2 + (Math.floor(i / cols) / 5) * 0.6;
          tx = tx * (1-p2) + gx * p2;
          ty = ty * (1-p2) + gy * p2;
        } else {
          // Orbit / Settle
          const a = pt.seed + now * 0.0005;
          const r = 0.1 + 0.05 * Math.sin(pt.seed * 2);
          tx = tx * (1-p3) + (0.5 + Math.cos(a) * r) * p3;
          ty = ty * (1-p3) + (0.5 + Math.sin(a) * r) * p3;
        }

        const targetX = tx * w;
        const targetY = ty * h;
        
        pt.vx += (targetX - pt.x) * 1.2 * dt;
        pt.vy += (targetY - pt.y) * 1.2 * dt;

        // Ambient drift
        pt.vx += Math.cos(pt.seed + now * 0.001) * 0.15;
        pt.vy += Math.sin(pt.seed + now * 0.001) * 0.15;

        // Mouse Repulsion (Optimized - no square root)
        if (m.x !== -9999) {
          const dx = pt.x - m.x;
          const dy = pt.y - m.y;
          const d2 = dx * dx + dy * dy;
          const R2 = 15000; // ~120px radius squared
          if (d2 < R2) {
            const force = (1 - d2 / R2) * 80 * dt;
            pt.vx += dx * 0.01 * force;
            pt.vy += dy * 0.01 * force;
          }
        }

        pt.vx *= 0.88; // Friction
        pt.vy *= 0.88;
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Wrap edges safely
        if (pt.x < -20) pt.x = w + 20;
        if (pt.x > w + 20) pt.x = -20;
        if (pt.y < -20) pt.y = h + 20;
        if (pt.y > h + 20) pt.y = -20;
      }

      // Fast connection drawing
      if (!reduced) {
        const D2 = isMobile ? 8000 : 14000; // Squared distance threshold
        ctx.lineWidth = 0.6;
        for (let i = 0; i < N; i++) {
          const a = P[i];
          // Limit inner loop to max 10 neighbors to prevent O(N^2) lag spikes
          for (let j = i + 1; j < i + 10 && j < N; j++) {
            const b = P[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < D2) {
              const alpha = (1 - d2 / D2) * 0.35;
              ctx.strokeStyle = `rgba(${inkRGB}, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < N; i++) {
        const pt = P[i];
        const isEmber = i % 8 === 0;
        ctx.fillStyle = `rgba(${isEmber ? emberRGB : inkRGB}, 0.8)`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-immersive-canvas" aria-hidden="true" />;
}
