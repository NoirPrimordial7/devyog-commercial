import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const pillars = [
  { index: "01", title: "Work", copy: "Flexible Grade-A floorplates engineered for global teams and uninterrupted scale." },
  { index: "02", title: "Meet", copy: "Executive lounges, collaboration suites and hospitality-led business spaces." },
  { index: "03", title: "Restore", copy: "Curated dining, retail and landscaped moments woven into every working day." },
];

export function Facility() {
  return (
    <section id="facility" className="relative overflow-hidden bg-[#0a0c0d] px-5 py-24 text-ivory md:px-9 md:py-36">
      <div className="absolute left-1/2 top-0 h-px w-[90%] -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="mx-auto max-w-[1540px]">
        <div className="mb-20 grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[10px] font-semibold uppercase tracking-[0.38em] text-champagne"
          >
            The complete workday
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="max-w-5xl text-[clamp(2.5rem,6.2vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              Everything enterprise needs.{" "}
              <span className="text-white/35">Nothing it doesn’t.</span>
            </h3>
          </motion.div>
        </div>

        <div id="amenities" className="grid border-t border-white/15 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
              className="group relative min-h-[360px] border-b border-white/15 px-1 py-8 md:border-b-0 md:border-r md:px-8 md:last:border-r-0"
            >
              <span className="text-[10px] tracking-[0.25em] text-champagne">{pillar.index}</span>
              <div className="absolute inset-x-1 bottom-9 md:inset-x-8">
                <div className="mb-7 flex items-center justify-between">
                  <h4 className="text-5xl font-semibold tracking-[-0.055em]">{pillar.title}</h4>
                  <span className="grid size-11 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-champagne group-hover:bg-champagne group-hover:text-obsidian">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
                <p className="max-w-sm text-[12px] leading-6 text-white/55">{pillar.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
