"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

const frontierOffsets = [
  0, 0.6, -0.35, 0.9, -0.7, 0.3, -0.55, 0.75, -0.25, 0.5, -0.8,
  0.4, -0.45, 0.7, -0.3, 0.85, -0.65, 0.25, -0.5, 0.65, -0.2, 0.45,
  -0.75, 0.35, -0.4, 0.8, -0.6, 0.2, -0.45, 0.55, -0.25, 0.4, 0,
];

const burnPixels = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 29 + 7) % 101}%`,
  offset: ((index * 13) % 25) - 12,
  size: 2 + ((index * 7) % 6),
  opacity: 0.45 + ((index * 11) % 45) / 100,
}));

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function buildBurnClip(progress) {
  const boundary = (1 - progress) * 100;
  const amplitude = 0.5 + Math.sin(progress * Math.PI) * 0.85;
  const frontier = frontierOffsets
    .map((offset, index) => {
      const x = 100 - (index / (frontierOffsets.length - 1)) * 100;
      const y = clamp(boundary + offset * amplitude, 0, 100);
      return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
    })
    .join(", ");

  return `polygon(0 0, 100% 0, ${frontier}, 0 0)`;
}

function useSectionProgress(targetRef, setActive) {
  const progress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const target = targetRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const travel = Math.max(1, target.offsetHeight - window.innerHeight);
      progress.set(clamp((window.scrollY - start) / travel, 0, 1));
      const nextActive = rect.top <= 1 && rect.bottom > 1;
      setActive((current) => (current === nextActive ? current : nextActive));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [progress, setActive, targetRef]);

  return progress;
}

export function GoldBurnTransition({ children }) {
  const sectionRef = useRef(null);
  const [burnActive, setBurnActive] = useState(false);
  const scrollProgress = useSectionProgress(sectionRef, setBurnActive);
  const burnProgress = useTransform(scrollProgress, [0.04, 0.88], [0, 1]);
  const imageClipPath = useTransform(burnProgress, buildBurnClip);
  const frontierTop = useTransform(burnProgress, (value) => `${(1 - value) * 100}%`);
  const frontierOpacity = useTransform(
    burnProgress,
    [0, 0.025, 0.94, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      id="gold-burn-transition"
      ref={sectionRef}
      className="relative z-20 h-[230svh] overflow-clip"
      aria-label="Gold pixel burn transition"
    >
      <div
        className="sticky top-0 h-[100svh] overflow-hidden bg-[#e7decf]"
        style={{ visibility: burnActive ? "visible" : "hidden" }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#e7decf]">
          {children}
        </div>

        <motion.div
          aria-hidden="true"
          style={{ clipPath: imageClipPath, WebkitClipPath: imageClipPath }}
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden [will-change:clip-path]"
        >
          <img
            src="/assets/hero/05.png"
            alt=""
            className="h-full w-full object-cover object-center"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,3,.04),rgba(4,4,3,.2))]" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ top: frontierTop, opacity: frontierOpacity }}
          className="pointer-events-none absolute left-0 z-30 h-20 w-full -translate-y-1/2 overflow-hidden"
        >
          <div
            className="absolute inset-x-0 top-1/2 h-14 -translate-y-1/2 opacity-95"
            style={{
              background:
                "linear-gradient(180deg, transparent 2%, rgba(255,229,165,0.16) 32%, rgba(255,196,83,0.96) 49%, rgba(183,102,27,0.78) 57%, transparent 82%)",
              clipPath:
                "polygon(0 44%,4% 29%,8% 48%,13% 35%,18% 58%,23% 39%,29% 51%,34% 31%,40% 55%,46% 38%,52% 62%,58% 34%,64% 53%,70% 29%,76% 57%,82% 36%,88% 54%,94% 32%,100% 47%,100% 76%,94% 62%,88% 81%,82% 59%,76% 77%,70% 58%,64% 83%,58% 61%,52% 79%,46% 56%,40% 76%,34% 58%,29% 82%,23% 57%,18% 78%,13% 54%,8% 73%,4% 56%,0 69%)",
              WebkitMaskImage:
                "repeating-linear-gradient(90deg,#000 0 7px,transparent 7px 10px,#000 10px 15px,transparent 15px 20px)",
              maskImage:
                "repeating-linear-gradient(90deg,#000 0 7px,transparent 7px 10px,#000 10px 15px,transparent 15px 20px)",
            }}
          />
          <div className="absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 bg-[#c87814] shadow-[0_0_10px_3px_rgba(255,184,54,.98),0_0_28px_10px_rgba(158,72,12,.58)]" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#fff0c8]" />
          {burnPixels.map((pixel, index) => (
            <span
              key={index}
              className="absolute bg-[#f0ad3f] shadow-[0_0_8px_rgba(236,154,42,.9)]"
              style={{
                left: pixel.left,
                top: `calc(50% + ${pixel.offset}px)`,
                width: `${pixel.size}px`,
                height: `${Math.max(2, pixel.size - 1)}px`,
                opacity: pixel.opacity,
              }}
            />
          ))}
          <div
            className="absolute inset-x-0 top-1/2 h-9 -translate-y-1/2 opacity-80"
            style={{
              background:
                "repeating-linear-gradient(90deg,transparent 0 5px,rgba(255,211,112,.9) 5px 8px,transparent 8px 14px,rgba(174,88,18,.86) 14px 18px,transparent 18px 25px)",
              clipPath:
                "polygon(0 39%,7% 52%,14% 32%,21% 58%,28% 37%,35% 65%,42% 42%,49% 59%,56% 28%,63% 61%,70% 40%,77% 68%,84% 35%,91% 55%,100% 42%,100% 69%,91% 76%,84% 62%,77% 83%,70% 65%,63% 79%,56% 57%,49% 81%,42% 63%,35% 84%,28% 59%,21% 77%,14% 55%,7% 72%,0 61%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
