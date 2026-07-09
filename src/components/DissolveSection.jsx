import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { ScrollDissolveReveal as VengeanceDissolve } from "./ui/scroll-dissolve-reveal";

export function DissolveSection() {
  const section = useRef(null);
  const [progressLabel, setProgressLabel] = useState(0);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const revealY = useTransform(scrollYProgress, [0.66, 0.9], [70, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgressLabel(Math.min(100, Math.round(latest * 100)));
  });

  return (
    <section ref={section} id="vision" className="relative h-[300vh] bg-obsidian">
      <VengeanceDissolve
        imageFront="/images/obsidian-tower.png"
        imageBack="/images/aurum-atrium.png"
        containerClassName="absolute inset-0 z-0 h-[300vh]"
        className="overflow-hidden"
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(3,4,5,.32),transparent_42%,rgba(3,4,5,.76))]" />

          <motion.div
            animate={{ opacity: progressLabel < 34 ? 1 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 z-10 grid place-items-center px-6"
          >
            <div className="text-center">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.38em] text-champagne">
                From landmark to ecosystem
              </p>
              <h2 className="max-w-[1000px] text-[clamp(2.6rem,7.8vw,8rem)] font-extrabold uppercase leading-[0.82] tracking-mega text-ivory">
                Beyond the facade
              </h2>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: progressLabel > 68 ? 1 : 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ y: revealY }}
            className="absolute inset-0 z-10 flex items-end px-5 pb-10 md:px-9 md:pb-14"
          >
            <div className="mx-auto grid w-full max-w-[1540px] gap-7 border-t border-white/25 pt-6 lg:grid-cols-[1.6fr_.7fr] lg:items-end">
              <div>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-champagne">
                  One address &middot; Every ambition
                </p>
                <h2 className="max-w-[980px] text-[clamp(2.6rem,7.2vw,7.5rem)] font-extrabold uppercase leading-[0.82] tracking-mega text-ivory">
                  Mixed-Use
                  <br />
                  Business Facility
                </h2>
              </div>
              <p className="max-w-md text-[13px] leading-6 text-white/72 lg:justify-self-end">
                A seamlessly connected ecosystem of intelligent offices, elevated
                retail, business hospitality and restorative social spaces&mdash;designed
                to keep enterprise moving.
              </p>
            </div>
          </motion.div>

          <motion.img
            src="/images/aurum-atrium-cutout.png"
            alt=""
            aria-hidden="true"
            animate={{ opacity: progressLabel > 72 ? 1 : 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0 z-20 h-full w-full object-cover object-center"
          />

          <div className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/55 md:flex md:right-9">
            <span>{String(progressLabel).padStart(2, "0")}</span>
            <span className="relative h-28 w-px bg-white/20">
              <motion.span
                style={{ scaleY: scrollYProgress }}
                className="absolute inset-0 origin-top bg-champagne"
              />
            </span>
            <span className="[writing-mode:vertical-rl]">Transition</span>
          </div>
        </div>
      </div>
    </section>
  );
}
