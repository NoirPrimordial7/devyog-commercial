import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Navbar } from "./Navbar";
import { Button } from "./ui/button";

export function HeroSection() {
  const section = useRef(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "17%"]);
  const fade = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section
      ref={section}
      className="relative h-svh min-h-[700px] overflow-hidden bg-obsidian"
    >
      <Navbar />

      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <img
          src="/images/obsidian-tower.png"
          alt="Premium commercial tower at blue hour"
          className="h-full w-full scale-[1.01] object-cover object-[52%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,7,.5)_0%,rgba(3,5,7,.12)_48%,rgba(3,5,7,.26)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,9,.2)_0%,transparent_42%,rgba(3,5,6,.12)_68%,rgba(3,5,6,.9)_100%)]" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="absolute inset-x-0 top-[20%] z-30 select-none px-5 md:top-[18%] md:z-10 md:px-9"
      >
        <div className="mx-auto max-w-[1540px]">
          <motion.p
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mb-4 text-[9px] font-semibold uppercase tracking-[0.38em] text-champagne md:mb-5 md:text-[10px]"
          >
            One address &middot; Every ambition
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-[94vw] text-[16.2vw] font-extrabold uppercase leading-[0.73] tracking-mega text-ivory drop-shadow-[0_4px_16px_rgba(0,0,0,.82)] md:max-w-[82vw] md:text-[10.9vw] md:drop-shadow-none xl:text-[10.2vw]"
          >
            <span className="block">Mixed-Use</span>
            <span className="block">Business</span>
            <span className="block">Facility</span>
          </motion.h1>
        </div>
      </motion.div>

      <motion.div
        style={{ y: imageY }}
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
      >
        <img
          src="/images/obsidian-tower-cutout.png"
          alt=""
          className="h-full w-full scale-[1.01] object-cover object-[52%_center] drop-shadow-[0_24px_70px_rgba(0,0,0,.22)] md:object-center"
        />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute right-5 top-[43%] z-30 hidden -translate-y-1/2 items-center gap-3 text-[8px] font-medium uppercase tracking-[0.28em] text-white/50 md:right-9 md:flex"
      >
        <span>01</span>
        <span className="h-px w-12 bg-champagne/60" />
        <span className="[writing-mode:vertical-rl]">The address</span>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-40 px-5 pb-6 md:px-9 md:pb-9">
        <div className="mx-auto flex max-w-[1540px] flex-col items-start justify-between gap-4 border-t border-white/15 pt-5 md:flex-row md:items-end">
          <p className="hidden max-w-[370px] text-[12px] leading-6 text-white/65 sm:block">
            A landmark ecosystem for ambitious enterprises&mdash;crafted around
            intelligence, hospitality and enduring architectural value.
          </p>
          <div className="flex w-full flex-wrap gap-3 md:w-auto">
            <Button className="flex-1 sm:flex-none">
              Explore workspaces <ArrowUpRight size={15} />
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              Download brochure <ArrowDownRight size={15} />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[152px] left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-white/55 lg:flex">
        <span>Scroll to enter</span>
        <span className="relative h-9 w-px overflow-hidden bg-white/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-champagne"
          />
        </span>
      </div>
    </section>
  );
}
