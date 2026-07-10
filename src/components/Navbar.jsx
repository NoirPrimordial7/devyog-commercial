"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { useEffect, useState } from "react";

const lightSectionIds = new Set([
  "project-visualization",
  "offerings",
  "contact",
]);

function useNavbarTone() {
  const [isOnLightBackground, setIsOnLightBackground] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateTone = () => {
      frame = 0;
      const probeY = Math.max(24, Math.min(56, window.innerHeight * 0.07));
      const burnSection = document.getElementById("gold-burn-transition");
      const burnRect = burnSection?.getBoundingClientRect();

      if (burnRect && burnRect.top <= probeY && burnRect.bottom > probeY) {
        const travel = Math.max(1, burnRect.height);
        const progress = Math.min(1, Math.max(0, -burnRect.top / travel));
        const nextTone = progress > 0.77;
        setIsOnLightBackground((current) =>
          current === nextTone ? current : nextTone,
        );
        return;
      }

      const section = document
        .elementsFromPoint(window.innerWidth * 0.5, probeY)
        .map((element) => element.closest("section[id], main[id]"))
        .find(Boolean);
      const nextTone = lightSectionIds.has(section?.id);

      setIsOnLightBackground((current) =>
        current === nextTone ? current : nextTone,
      );
    };

    const requestToneUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTone);
    };

    updateTone();
    window.addEventListener("scroll", requestToneUpdate, { passive: true });
    window.addEventListener("resize", requestToneUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestToneUpdate);
      window.removeEventListener("resize", requestToneUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return isOnLightBackground;
}

export function Navbar() {
  const isOnLightBackground = useNavbarTone();
  const foreground = isOnLightBackground ? "text-[#171510]" : "text-ivory";
  const muted = isOnLightBackground ? "text-[#171510]/66" : "text-white/72";

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] px-[clamp(0.9rem,3.5vw,4.75rem)] pt-[max(0.65rem,env(safe-area-inset-top))]"
    >
      <nav
        className={`pointer-events-auto flex h-10 w-full items-center justify-between gap-4 bg-transparent text-[11px] transition-colors duration-300 sm:h-11 ${foreground}`}
        aria-label="Primary navigation"
      >
        <a
          href="#exterior"
          className="group flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="DEVYOG Builders and Developers home"
        >
          <img
            src="/assets/brand/devyog-logo.svg"
            alt="DEVYOG Builders & Developers"
            className={`h-6 w-auto max-w-[88px] opacity-95 transition-[opacity,filter] duration-300 group-hover:opacity-100 sm:h-7 sm:max-w-[104px] ${
              isOnLightBackground
                ? "drop-shadow-[0_1px_8px_rgba(255,255,255,0.32)]"
                : "drop-shadow-[0_1px_9px_rgba(0,0,0,0.5)]"
            }`}
          />
          <span className={`hidden font-semibold tracking-[-0.02em] sm:inline ${muted}`}>
            Investor Teaser
          </span>
        </a>

        <div className={`hidden items-center gap-6 font-semibold tracking-[-0.015em] md:flex lg:gap-9 ${muted}`}>
          <a href="#project-visualization" className="transition-colors duration-300 hover:text-champagne">
            Project
          </a>
          <a href="#offerings" className="transition-colors duration-300 hover:text-champagne">
            Facility Mix
          </a>
          <a href="#investor-options" className="transition-colors duration-300 hover:text-champagne">
            Investor
          </a>
          <a
            href="#contact"
            className="hidden items-center gap-1.5 transition-colors duration-300 hover:text-champagne lg:inline-flex"
          >
            Search <Search size={13} strokeWidth={1.8} />
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="https://www.devyogprojects.co.in"
            target="_blank"
            rel="noreferrer"
            className={`hidden font-semibold tracking-[-0.02em] transition-colors duration-300 hover:text-champagne lg:inline ${muted}`}
          >
            Devyogprojects.com
          </a>
          <a
            href="#contact"
            className={`group inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-[10px] font-extrabold tracking-[-0.01em] shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-[color,background-color,transform] duration-300 hover:scale-[1.035] sm:h-9 sm:px-4 sm:text-[11px] ${
              isOnLightBackground
                ? "bg-[#171510] text-[#f7f0e4]"
                : "bg-white text-[#07111f]"
            }`}
          >
            <span className="hidden sm:inline">Request dossier</span>
            <span className="sm:hidden">Dossier</span>
            <ArrowUpRight
              size={13}
              strokeWidth={1.9}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
