import React, { useEffect, useRef } from "react";

/**
 * GlobalAmbientAudio
 * 
 * Pure Web Audio API ambient pad.
 * Mid-range harmonic triad (220Hz - 440Hz) filtered at 600Hz.
 * No sub-bass (<150Hz) = ZERO speaker distortion/buzzing on laptops & mobile.
 * Unlocks on any user interaction (scroll, click, touch, move).
 */
export default function GlobalAmbientAudio() {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const isStartedRef = useRef(false);

  useEffect(() => {
    // Warm, lush mid-range frequencies (A3, C#4, E4, G#4) - No sub-bass buzz!
    const chord = [220.00, 277.18, 329.63, 415.30];

    const initAndStart = () => {
      if (isStartedRef.current) return;
      isStartedRef.current = true;

      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        const ctx = new AudioCtx();
        ctxRef.current = ctx;

        // Master Gain (Soft, non-intrusive ambient background level)
        const masterGain = ctx.createGain();
        const now = ctx.currentTime;
        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.connect(ctx.destination);
        gainRef.current = masterGain;

        // Smooth lowpass filter (removes all harsh high frequencies)
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(550, now);
        filter.Q.setValueAtTime(1.0, now);
        filter.connect(masterGain);

        // Soft LFO movement (gentle, relaxing breathing feel)
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.08, now); // 12.5 second slow breath cycle
        lfoGain.gain.setValueAtTime(80, now);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        // Create harmonic sine oscillators
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);

          // Slight detune for analog warmth & depth
          osc.detune.setValueAtTime((idx - 1.5) * 4, now);

          // Balanced individual volume
          const vol = 0.04 / (idx + 1);
          oscGain.gain.setValueAtTime(vol, now);

          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start();
        });

        // Resume AudioContext if browser initialized it in suspended state
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Smooth 3.5-second fade in to gentle background volume
        masterGain.gain.exponentialRampToValueAtTime(0.04, now + 3.5);
      } catch (e) {
        console.warn("Web Audio initialization:", e);
      }
    };

    const handleUnlock = () => {
      initAndStart();
      if (ctxRef.current && ctxRef.current.state === "suspended") {
        ctxRef.current.resume();
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", handleUnlock);
      window.removeEventListener("touchstart", handleUnlock);
      window.removeEventListener("click", handleUnlock);
      window.removeEventListener("scroll", handleUnlock);
      window.removeEventListener("keydown", handleUnlock);
      window.removeEventListener("mousemove", handleUnlock);
    };

    window.addEventListener("pointerdown", handleUnlock, { passive: true });
    window.addEventListener("touchstart", handleUnlock, { passive: true });
    window.addEventListener("click", handleUnlock, { passive: true });
    window.addEventListener("scroll", handleUnlock, { passive: true });
    window.addEventListener("keydown", handleUnlock, { passive: true });
    window.addEventListener("mousemove", handleUnlock, { passive: true });

    return () => {
      removeListeners();
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return null;
}
