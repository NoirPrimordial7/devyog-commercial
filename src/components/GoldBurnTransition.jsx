"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function useSectionProgress(targetRef, setPinned) {
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

      const nextPinned = rect.top <= 0 && rect.bottom > 0;
      setPinned((current) => (current === nextPinned ? current : nextPinned));
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
  }, [progress, setPinned, targetRef]);

  return progress;
}

export function GoldBurnTransition({ children }) {
  const sectionRef = useRef(null);
  const [isPinned, setPinned] = useState(false);
  const progress = useSectionProgress(sectionRef, setPinned);
  const smoothProgress = useSpring(progress, {
    stiffness: 125,
    damping: 30,
    mass: 0.32,
    restDelta: 0.0005,
  });

  const exteriorOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.82, 1],
    [1, 1, 0, 0],
  );

  return (
    <section
      id="gold-burn-transition"
      ref={sectionRef}
      className="relative z-20 h-[175svh] overflow-visible"
      aria-label="Atrium to project overview transition"
    >
      <div
        className="sticky top-0 h-[100svh] overflow-hidden bg-[#e7decf]"
        style={{ visibility: isPinned ? "visible" : "hidden" }}
      >
        <div className="relative z-0 h-[100svh]">{children}</div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: exteriorOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-[#080706] will-change-[opacity]"
        >
          <img
            src="/assets/hero/05.png"
            alt=""
            decoding="async"
            draggable="false"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,7,.12),rgba(3,5,7,.04)_58%,rgba(3,5,7,.2))]" />
        </motion.div>
      </div>
    </section>
  );
}
