import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

/* =============================================================================
 *  SIGNATURE SCROLL STORY
 *  --------------------------------------------------------------------------
 *  A sticky, full-screen <canvas> whose frame is driven by scroll position —
 *  the abstract campaign board transforms through five phases:
 *
 *      IDEA → INSIGHT → STRATEGY → STORY → IMPACT
 *
 *  TWO MODES
 *  ---------
 *  1. PROCEDURAL (default, zero page weight): every frame is drawn live with
 *     the Canvas 2D API below. Nothing to download, always crisp.
 *
 *  2. REAL IMAGE SEQUENCE (optional): if you export ~100–300 still frames from
 *     After Effects / Remotion / Figma, drop them in `public/frames/` and set
 *     USE_IMAGE_FRAMES = true. The preloader, scroll mapping, loader UI and
 *     redraw-on-change logic already support image frames — you only change
 *     the constants in the block below.
 *
 *  Accessibility: with `prefers-reduced-motion: reduce`, the scroll runway
 *  collapses and a single static frame plus the full text story is shown.
 * ========================================================================== */

// ─────────────────────────────────────────────────────────────────────────────
// ▼▼▼  REPLACE THIS BLOCK TO USE A REAL EXPORTED FRAME SEQUENCE  ▼▼▼
const USE_IMAGE_FRAMES = false;
const FRAME_COUNT_DESKTOP = 160; // logical frames (procedural) / image count
const FRAME_COUNT_MOBILE = 84;   // denser on desktop, lighter on phones
const FRAME_PATH = (i) =>
  `/frames/frame-${String(i + 1).padStart(4, "0")}.jpg`;
// ▲▲▲  e.g. /public/frames/frame-0001.jpg … frame-0160.jpg  ▲▲▲
// ─────────────────────────────────────────────────────────────────────────────

const STORY_PHASES = [
  { key: "idea", label: "IDEA" },
  { key: "insight", label: "INSIGHT" },
  { key: "strategy", label: "STRATEGY" },
  { key: "story", label: "STORY" },
  { key: "impact", label: "IMPACT" },
];

/* Math helpers */
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (t, a, b) => {
  const x = clamp((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};
const lerp = (a, b, t) => a + (b - a) * t;
// Deterministic pseudo-random in [-1, 1] from an integer seed (stable frames).
const hash = (n) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
};

function roundedRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/* -----------------------------------------------------------------------------
 *  PROCEDURAL FRAME RENDERER
 *  Draws the complete scene for progress p (0 → 1) and phase word overlay.
 * --------------------------------------------------------------------------- */
function renderFrame(ctx, p, w, h, isMobile) {
  const cViolet = "#8b6cff";
  const cVioletDeep = "#633ef2";
  const cLavender = "#cdbffb";
  const cCoral = "#ff7a66";
  const cPeach = "#ffb27a";

  /* ---- Background ---------------------------------------------------------- */
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  const warmth = smoothstep(p, 0.7, 1);
  bg.addColorStop(0, lerpColor("#1c1640", "#2a1b58", warmth));
  bg.addColorStop(1, "#120f24");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Ambient orbs
  radialGlow(ctx, w * 0.18, h * 0.18, w * 0.5, cViolet, 0.22);
  radialGlow(
    ctx,
    w * (0.92 - p * 0.12),
    h * (0.9 - p * 0.18),
    w * (0.32 + p * 0.22),
    cCoral,
    0.1 + p * 0.22
  );

  /* ---- The campaign board -------------------------------------------------- */
  const margin = isMobile ? w * 0.06 : w * 0.09;
  const bx = margin;
  const by = h * 0.16;
  const bw = w - margin * 2;
  const bh = h * 0.68;

  ctx.save();
  roundedRect(ctx, bx, by, bw, bh, 24);
  ctx.fillStyle = "rgba(255,255,255,0.045)";
  ctx.fill();
  ctx.strokeStyle = "rgba(205,191,251,0.20)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Faint organizing grid (strategy phase onward)
  const gridA = smoothstep(p, 0.36, 0.52) * (1 - smoothstep(p, 0.82, 0.95) * 0.6);
  if (gridA > 0.01) {
    ctx.save();
    roundedRect(ctx, bx, by, bw, bh, 24);
    ctx.clip();
    ctx.strokeStyle = `rgba(205,191,251,${0.1 * gridA})`;
    ctx.lineWidth = 1;
    const cols = 6;
    for (let i = 1; i < cols; i++) {
      const x = bx + (bw / cols) * i;
      ctx.beginPath();
      ctx.moveTo(x, by);
      ctx.lineTo(x, by + bh);
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ---- Giant phase word ---------------------------------------------------- */
  const phaseIndex = Math.min(STORY_PHASES.length - 1, Math.floor(p * STORY_PHASES.length));
  const phaseWord = STORY_PHASES[phaseIndex].label;
  const wordSize = bw * (isMobile ? 0.16 : 0.12);
  ctx.font = `700 ${wordSize}px "Space Grotesk", Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = `rgba(255,255,255,${0.06 + 0.03 * Math.sin(p * Math.PI * 10)})`;
  ctx.fillText(phaseWord, bx + bw / 2, by + bh * 0.34);

  const cx = bx + bw / 2;
  const cy = by + bh * 0.55;

  /* ---- IDEA orb (fades as insight forms) ----------------------------------- */
  const ideaOut = 1 - smoothstep(p, 0.14, 0.3);
  if (ideaOut > 0.01) {
    const pulse = 1 + Math.sin(p * 60) * 0.06;
    radialGlow(ctx, cx, cy, 90 * pulse, cPeach, 0.5 * ideaOut);
    ctx.beginPath();
    ctx.arc(cx, cy, 16 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,217,200,${ideaOut})`;
    ctx.fill();
    // expanding rings
    for (let i = 0; i < 3; i++) {
      const rt = (p * 1.6 + i / 3) % 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 24 + rt * 110, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,178,122,${(1 - rt) * 0.35 * ideaOut})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  /* ---- Sticky notes: scattered → organized --------------------------------- */
  const gather = smoothstep(p, 0.08, 0.34);
  const noteCount = isMobile ? 4 : 6;
  const noteW = bw * 0.1;
  const noteH = noteW * 0.78;
  for (let i = 0; i < noteCount; i++) {
    const sx = bx + bw * (0.12 + 0.76 * ((hash(i + 1) + 1) / 2));
    const sy = by + bh * (0.14 + 0.7 * ((hash(i + 9) + 1) / 2));
    // tidy target grid (top of board): 3 columns × 2 rows, centered
    const perRow = 3;
    const col = i % perRow;
    const row = Math.floor(i / perRow);
    const tx = bx + bw * (0.25 + col * 0.25);
    const ty = by + bh * (0.1 + row * 0.16);
    const nx = lerp(sx, tx, gather);
    const ny = lerp(sy, ty, gather);
    const rot = lerp(hash(i + 4) * 0.28, 0, gather);
    // Notes gather during STRATEGY, then clear the board as STORY content
    // rises and IMPACT takes over (so the final frame stays uncluttered).
    const notesOut = 1 - smoothstep(p, 0.6, 0.74);
    const alpha = lerp(0.4, 0.95, gather) * notesOut;

    ctx.save();
    ctx.translate(nx, ny);
    ctx.rotate(rot);
    roundedRect(ctx, -noteW / 2, -noteH / 2, noteW, noteH, 8);
    ctx.fillStyle =
      i % 2 === 0
        ? `rgba(205,191,251,${alpha})`
        : `rgba(255,178,122,${alpha})`;
    ctx.fill();
    ctx.fillStyle = `rgba(23,19,38,${0.45 * alpha})`;
    ctx.fillRect(-noteW * 0.3, -noteH * 0.12, noteW * 0.6, 4);
    ctx.fillRect(-noteW * 0.3, noteH * 0.06, noteW * 0.42, 3);
    ctx.restore();
  }

  /* ---- Magnifier sweep (insight) ------------------------------------------ */
  const magIn = smoothstep(p, 0.16, 0.22);
  const magOut = 1 - smoothstep(p, 0.3, 0.38);
  const magA = magIn * magOut;
  if (magA > 0.01) {
    const mx = lerp(bx + bw * 0.2, cx, smoothstep(p, 0.16, 0.34));
    const my = cy;
    const r = bw * 0.09;
    ctx.save();
    ctx.globalAlpha = magA;
    ctx.beginPath();
    ctx.arc(mx, my, r, 0, Math.PI * 2);
    ctx.strokeStyle = cCoral;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mx + r * 0.72, my + r * 0.72);
    ctx.lineTo(mx + r * 1.45, my + r * 1.45);
    ctx.strokeStyle = cCoral;
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  }

  /* ---- Network nodes: appear → align into a pipeline ---------------------- */
  const nodeCount = isMobile ? 6 : 9;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const appear = smoothstep(p, 0.12 + i * 0.022, 0.2 + i * 0.022);
    // scattered cluster position
    const sx = cx + hash(i + 20) * bw * 0.26;
    const sy = cy + hash(i + 40) * bh * 0.2;
    // pipeline position (even row across board)
    const tx = bx + bw * (0.12 + (0.76 * i) / (nodeCount - 1));
    const ty = cy + bh * 0.08;
    const align = smoothstep(p, 0.34, 0.52);
    const fade = 1 - smoothstep(p, 0.6, 0.74);
    nodes.push({
      x: lerp(sx, tx, align),
      y: lerp(sy, ty, align),
      a: appear * fade,
      r: 7 * appear,
    });
  }
  // connections
  ctx.lineWidth = 1.6;
  for (let i = 0; i < nodeCount - 1; i++) {
    const a = Math.min(nodes[i].a, nodes[i + 1].a);
    if (a > 0.02) {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
      ctx.strokeStyle = `rgba(139,108,255,${0.4 * a})`;
      ctx.stroke();
    }
  }
  // pipeline arrows
  const arrowA = smoothstep(p, 0.4, 0.55) * (1 - smoothstep(p, 0.6, 0.72));
  if (arrowA > 0.01) {
    ctx.strokeStyle = `rgba(255,111,94,${arrowA})`;
    ctx.lineWidth = 3;
    for (let i = 0; i < nodeCount - 1; i++) {
      const mx = (nodes[i].x + nodes[i + 1].x) / 2;
      const my = nodes[i].y;
      ctx.beginPath();
      ctx.moveTo(mx - 8, my - 6);
      ctx.lineTo(mx + 4, my);
      ctx.lineTo(mx - 8, my + 6);
      ctx.stroke();
    }
  }
  // node dots
  nodes.forEach((n, i) => {
    if (n.a <= 0.02) return;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle =
      i === nodeCount - 1
        ? `rgba(255,111,94,${n.a})`
        : `rgba(205,191,251,${n.a})`;
    ctx.fill();
  });

  /* ---- STORY phase: three content cards rise ------------------------------- */
  const cardsIn = smoothstep(p, 0.58, 0.72);
  const cardsOut = 1 - smoothstep(p, 0.76, 0.86);
  const cardA = cardsIn * cardsOut;
  if (cardA > 0.01) {
    const cardW = bw * 0.24;
    const cardH = bh * 0.3;
    const gap = bw * 0.045;
    const total = cardW * 3 + gap * 2;
    const startX = cx - total / 2;
    const cardY = cy + bh * 0.2 - cardH / 2 + (1 - cardsIn) * 26;
    for (let i = 0; i < 3; i++) {
      const x = startX + i * (cardW + gap);
      ctx.save();
      ctx.globalAlpha = cardA;
      roundedRect(ctx, x, cardY, cardW, cardH, 14);
      ctx.fillStyle = "rgba(35,28,69,0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(205,191,251,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // image block
      roundedRect(ctx, x + 12, cardY + 12, cardW - 24, cardH * 0.42, 8);
      ctx.fillStyle =
        i === 1 ? "rgba(255,111,94,0.85)" : "rgba(139,108,255,0.85)";
      ctx.fill();
      // text lines
      ctx.fillStyle = "rgba(205,191,251,0.75)";
      for (let l = 0; l < 3; l++) {
        roundedRect(
          ctx,
          x + 12,
          cardY + cardH * 0.55 + l * 16,
          cardW * (0.62 - l * 0.12),
          6,
          3
        );
        ctx.fill();
      }
      // waveform on middle card
      if (i === 1) {
        ctx.strokeStyle = "rgba(255,217,200,0.9)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let k = 0; k <= 24; k++) {
          const wx = x + 18 + k * ((cardW - 36) / 24);
          const wy =
            cardY + cardH * 0.86 +
            Math.sin(k * 0.9 + p * 8) * 7;
          k === 0 ? ctx.moveTo(wx, wy) : ctx.lineTo(wx, wy);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  /* ---- IMPACT phase: bars, trend line, rings, particles ------------------- */
  const impact = smoothstep(p, 0.8, 0.96);
  if (impact > 0.01) {
    // bars
    const barBase = by + bh * 0.82;
    const barAreaW = bw * 0.46;
    const barX0 = bx + bw * 0.1;
    const heights = [0.18, 0.3, 0.24, 0.42, 0.54];
    const barW = barAreaW / (heights.length * 1.7);
    heights.forEach((hh, i) => {
      const grow = smoothstep(p, 0.8 + i * 0.02, 0.94 + i * 0.01);
      const x = barX0 + i * barW * 1.7;
      const h = bh * hh * grow;
      roundedRect(ctx, x, barBase - h, barW, h, 6);
      ctx.fillStyle =
        i === heights.length - 1
          ? `rgba(255,111,94,${0.9 * impact})`
          : `rgba(139,108,255,${0.85 * impact})`;
      ctx.fill();
    });

    // rising trend line (drawn progressively)
    const lx0 = bx + bw * 0.12;
    const lx1 = bx + bw * 0.54;
    const pts = [
      [0, 0.85],
      [0.25, 0.7],
      [0.5, 0.78],
      [0.75, 0.42],
      [1, 0.18],
    ];
    const drawT = smoothstep(p, 0.84, 1);
    ctx.strokeStyle = `rgba(255,217,200,${impact})`;
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    // Reveal the line point-by-point as impact progresses.
    const visibleCount = Math.max(
      1,
      Math.ceil(pts.length * drawT)
    );
    pts.slice(0, visibleCount).forEach((pt, i) => {
      const x = lx0 + (lx1 - lx0) * pt[0];
      const yy = by + bh * (0.6 + pt[1] * 0.22);
      i === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
    });
    ctx.stroke();
    const endPt = pts[visibleCount - 1];
    if (endPt) {
      const ex = lx0 + (lx1 - lx0) * endPt[0];
      const ey = by + bh * (0.62 + endPt[1] * 0.22);
      ctx.beginPath();
      ctx.arc(ex, ey, 7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,111,94,${impact})`;
      ctx.fill();
    }

    // radiating rings + particles from the upper-right "impact point"
    const ix = bx + bw * 0.78;
    const iy = by + bh * 0.32;
    for (let i = 0; i < 3; i++) {
      const rt = clamp((p - 0.84 - i * 0.05) / 0.16);
      if (rt <= 0) continue;
      ctx.beginPath();
      ctx.arc(ix, iy, 12 + rt * 150, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,111,94,${(1 - rt) * 0.5 * impact})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    const partCount = isMobile ? 22 : 46;
    for (let i = 0; i < partCount; i++) {
      const angle = (i / partCount) * Math.PI * 2 + hash(i) * 0.3;
      const dist = (0.08 + ((hash(i + 99) + 1) / 2) * 0.2) * bw * smoothstep(p, 0.84, 1);
      const px = ix + Math.cos(angle) * dist;
      const py = iy + Math.sin(angle) * dist;
      ctx.beginPath();
      ctx.arc(px, py, 2.6 + ((hash(i + 3) + 1) / 2) * 2.4, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? `rgba(255,178,122,${impact})` : `rgba(205,191,251,${impact * 0.9})`;
      ctx.fill();
    }
  }

  ctx.restore();

  /* ---- Caption under the board -------------------------------------------- */
  ctx.font = `600 ${Math.max(11, w * 0.012)}px "Inter", sans-serif`;
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(205,191,251,0.55)";
  const captions = [
    "A spark worth chasing",
    "Patterns hiding in the noise",
    "A plan with a point of view",
    "Content that carries the idea",
    "Attention that turns into results",
  ];
  ctx.fillText(captions[phaseIndex], w / 2, by + bh + Math.max(26, h * 0.05));
}

function radialGlow(ctx, x, y, r, color, alpha) {
  if (alpha <= 0.01) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, hexToRgba(color, alpha));
  g.addColorStop(1, hexToRgba(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

function lerpColor(a, b, t) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const r = Math.round(lerp((pa >> 16) & 255, (pb >> 16) & 255, t));
  const g = Math.round(lerp((pa >> 8) & 255, (pb >> 8) & 255, t));
  const bl = Math.round(lerp(pa & 255, pb & 255, t));
  return `rgb(${r},${g},${bl})`;
}

/* --------------------------------------------------------------------------- */

export default function ScrollStory() {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(USE_IMAGE_FRAMES ? false : true);
  const [loadPct, setLoadPct] = useState(USE_IMAGE_FRAMES ? 0 : 100);
  const [activePhase, setActivePhase] = useState(0);

  // Mutable runtime values (avoid re-renders on every scroll tick).
  const stateRef = useRef({
    frameImages: [],
    lastFrame: -1,
    progress: 0,
    w: 0,
    h: 0,
    dpr: 1,
    totalFrames: FRAME_COUNT_DESKTOP,
    isMobile: false,
  });

  /* Size the canvas to its element (lighter DPR on small screens). */
  const sizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = window.matchMedia("(max-width: 860px)").matches;
    const dprCap = isMobile ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(320, rect.width);
    const h = Math.max(420, rect.height);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stateRef.current.w = w;
    stateRef.current.h = h;
    stateRef.current.dpr = dpr;
    stateRef.current.isMobile = isMobile;
    stateRef.current.totalFrames = isMobile
      ? FRAME_COUNT_MOBILE
      : FRAME_COUNT_DESKTOP;
    stateRef.current.lastFrame = -1; // force redraw
  };

  /* Draw either the preloaded image frame or the procedural scene. */
  const draw = (progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { w, h, isMobile, totalFrames, frameImages } = stateRef.current;
    const frame = Math.round(progress * (totalFrames - 1));

    if (frame === stateRef.current.lastFrame) return; // only on change
    stateRef.current.lastFrame = frame;

    if (USE_IMAGE_FRAMES && frameImages[frame]) {
      const img = frameImages[frame];
      ctx.clearRect(0, 0, w, h);
      // cover-fit
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    } else {
      renderFrame(ctx, progress, w, h, isMobile);
    }
  };

  /* Preloading */
  useEffect(() => {
    let cancelled = false;

    const preloadImageFrames = () =>
      new Promise((resolve) => {
        const total = FRAME_COUNT_DESKTOP;
        const images = new Array(total);
        let loaded = 0;
        const finishOne = () => {
          loaded += 1;
          if (!cancelled) setLoadPct(Math.round((loaded / total) * 100));
          if (loaded === total) {
            stateRef.current.frameImages = images;
            resolve();
          }
        };
        for (let i = 0; i < total; i++) {
          const img = new Image();
          img.onload = finishOne;
          img.onerror = finishOne; // count failures so UI never hangs
          img.src = FRAME_PATH(i);
          images[i] = img;
        }
      });

    const init = async () => {
      sizeCanvas();
      if (USE_IMAGE_FRAMES) {
        await preloadImageFrames();
      } else if (document.fonts && document.fonts.ready) {
        // Make sure display font is ready before the first painted frame.
        await document.fonts.ready.catch(() => {});
        // Brief, honest "preparing" beat for the procedural warm-up.
        await new Promise((r) => setTimeout(r, 350));
      }
      if (cancelled) return;
      setReady(true);

      if (reducedMotion) {
        // Static fallback: show the near-final "organized campaign" frame.
        draw(0.92);
      } else {
        draw(0);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  /* Scroll → progress → frame (rAF-throttled), full motion only */
  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = clamp(-rect.top / travel);
      stateRef.current.progress = progress;
      draw(progress);

      const phase = Math.min(
        STORY_PHASES.length - 1,
        Math.floor(progress * STORY_PHASES.length)
      );
      setActivePhase((prev) => (prev === phase ? prev : phase));
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    // Debounced full resize (re-sizes the backing store + forces redraw)
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sizeCanvas();
        draw(stateRef.current.progress);
      }, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ready]);

  return (
    <section
      id="story"
      className={`story grain ${reducedMotion ? "story--static" : ""}`}
      aria-label="How a campaign comes together"
    >
      {/* Screen-reader friendly version of the full visual narrative */}
      <p className="sr-only">
        The story of a campaign, from start to finish. It begins with a single
        idea. Curiosity turns that idea into insight as patterns appear in the
        research. Insight becomes strategy when the work is organized into a
        plan. The strategy is shaped into a story across pieces of content.
        Finally, the story creates impact, measured honestly in reach,
        engagement, conversion and retention.
      </p>

      <div
        className="story__track"
        ref={trackRef}
        style={reducedMotion ? { height: "auto" } : undefined}
      >
        <div className="story__sticky">
          <canvas
            ref={canvasRef}
            className="story__canvas"
            aria-hidden="true"
          />

          {/* Frame preloading indicator */}
          <div
            className={`story__loader ${ready ? "is-hidden" : ""}`}
            role="status"
            aria-live="polite"
          >
            <div className="story__loader-inner">
              <div className="story__spinner" aria-hidden="true" />
              PREPARING THE STORY
              <div className="story__bar" aria-hidden="true">
                <span style={{ width: `${loadPct}%` }} />
              </div>
            </div>
          </div>

          <div className="story__overlay">
            <ol className="story__steps" aria-label="Campaign phases">
              {STORY_PHASES.map((phase, i) => (
                <li
                  key={phase.key}
                  className={`story__step ${
                    i === activePhase ? "is-active" : ""
                  } ${i < activePhase ? "is-done" : ""}`}
                  aria-current={i === activePhase ? "step" : undefined}
                >
                  {phase.label}
                </li>
              ))}
            </ol>
            <p className="story__hint">
              {reducedMotion
                ? "The five phases of every campaign — idea, insight, strategy, story and impact."
                : "Keep scrolling — watch an idea become a campaign."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
