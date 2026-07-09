import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Navbar } from "./Navbar";

const tags = [
  { label: "Grade-A Offices", className: "left-[4%] top-[47%] md:left-[9%] md:top-[43%]" },
  { label: "IT-Ready Zones", className: "right-[3%] top-[42%] md:right-[8%] md:top-[38%]" },
  { label: "Smart Access", className: "left-[7%] top-[68%] md:left-[15%] md:top-[70%]" },
  { label: "Premium Retail", className: "right-[4%] top-[67%] md:right-[12%] md:top-[66%]" },
];

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section ref={ref} className="relative h-[105svh] min-h-[720px] overflow-hidden bg-obsidian">
      <Navbar />

      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <img
          src="/images/obsidian-tower.png"
          alt="Obsidian premium commercial tower at blue hour"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,9,.25)_0%,transparent_35%,rgba(3,5,6,.18)_70%,rgba(3,5,6,.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_15%,rgba(2,4,5,.28)_100%)]" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="absolute inset-x-0 top-[17%] z-10 select-none px-2 text-center md:top-[14%]"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-3 text-[9px] font-semibold uppercase tracking-[0.45em] text-champagne md:text-[11px]"
        >
          A new centre of gravity · Gurugram
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto max-w-[1600px] text-[17vw] font-extrabold uppercase leading-[0.72] tracking-mega text-ivory/90 md:text-[13.2vw]"
        >
          <span className="block">Premium</span>
          <span className="block">Commercial</span>
          <span className="block">Offices</span>
        </motion.h1>
      </motion.div>

      <motion.div
        style={{ y: imageY }}
        className="pointer-events-none absolute inset-0 z-20 hidden md:block"
        aria-hidden="true"
      >
        <img
          src="/images/obsidian-tower.png"
          alt=""
          className="h-full w-full object-cover object-center [mask-image:radial-gradient(ellipse_27%_63%_at_50%_66%,black_57%,transparent_77%)]"
        />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="absolute inset-0 z-30">
        {tags.map((tag, index) => (
          <motion.div
            key={tag.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.12, duration: 0.6 }}
            className={`absolute ${tag.className}`}
          >
            <span className="feature-tag">
              <span className="size-1.5 rounded-full bg-champagne shadow-[0_0_12px_#c8a96a]" />
              {tag.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-40 px-5 pb-7 md:px-9 md:pb-9">
        <div className="mx-auto flex max-w-[1540px] flex-col items-start justify-between gap-5 border-t border-white/15 pt-5 md:flex-row md:items-end">
          <p className="max-w-[360px] text-[12px] leading-6 text-white/65">
            A landmark for ambitious enterprises—crafted around intelligence,
            hospitality and enduring architectural value.
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

      <div className="absolute bottom-[160px] left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-white/55 lg:flex">
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
