"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const serifStyle = {
  fontFamily:
    "'Cormorant Garamond', 'Bodoni 72', 'Didot', 'Times New Roman', serif",
};

const heroStats = [
  { value: "64,302", label: "sq.ft Built-Up Area" },
  { value: "G+7", label: "Structure" },
  { value: "15–20%", label: "Target Yield" },
];

export function LandmarkSection() {
  return (
    <section
      id="project-visualization"
      className="relative isolate flex min-h-[100svh] overflow-hidden px-5 py-16 text-[#171510] sm:px-8 lg:px-12 lg:py-14"
    >
      <div className="mx-auto grid w-full max-w-[1480px] gap-8 self-center lg:grid-cols-[minmax(0,1.08fr)_minmax(250px,0.4fr)] lg:items-center xl:grid-cols-[minmax(135px,0.35fr)_minmax(0,1.2fr)_minmax(250px,0.45fr)]">
        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden self-stretch xl:flex xl:flex-col xl:justify-between"
        >
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[#9b6c2b]">
              03 / 04
            </p>
            <div className="mt-5 h-px w-28 bg-[#9b6c2b]/45" />
          </div>

          <div className="space-y-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#2a261d]/52">
            <p>East Pune</p>
            <p>Manjari–Hadapsar</p>
            <p>Solapur–Pune Highway</p>
          </div>
        </motion.aside>

        <div className="min-w-0 xl:col-start-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-18%" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-[0.64rem] font-bold uppercase tracking-[0.54em] text-[#9b6c2b] sm:mb-6"
          >
            Project visualization
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-18%" }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            style={serifStyle}
            className="max-w-[900px] text-[clamp(3.15rem,6.55vw,7.25rem)] font-normal leading-[0.85] tracking-[-0.072em] text-[#171510]"
          >
            A landmark{" "}
            <em className="not-italic text-[#b78237] md:italic">
              commercial destination
            </em>{" "}
            for East Pune
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-16%" }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid gap-5 border-t border-[#2a261d]/15 pt-5 md:grid-cols-[0.86fr_1.14fr]"
          >
            <p className="max-w-sm text-[0.68rem] font-semibold uppercase leading-[1.65] tracking-[0.32em] text-[#2a261d]/52">
              Built for companies that need a prestigious address, adaptable
              floorplates, and hospitality-grade daily experience.
            </p>
            <p className="max-w-3xl text-balance text-lg leading-[1.32] tracking-[-0.04em] text-[#2a261d]/78 sm:text-xl xl:text-2xl">
              A future-ready commercial address combining Grade-A offices,
              co-working, food and beverage, IT-ready infrastructure, wellness
              commons, and smart urban convenience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-14%" }}
            transition={{ duration: 0.78, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 grid gap-3 sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="border border-[#9b6c2b]/22 bg-[#f8f4ee]/32 px-4 py-4 shadow-[0_18px_60px_rgba(91,68,35,0.06)] backdrop-blur-sm"
              >
                <p
                  style={serifStyle}
                  className="text-[clamp(2.35rem,4.2vw,4.15rem)] leading-none tracking-[-0.08em] text-[#171510]"
                >
                  {stat.value}
                </p>
                <p className="mt-3 text-[0.58rem] font-bold uppercase tracking-[0.28em] text-[#9b6c2b]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden h-[min(62svh,520px)] min-h-[390px] overflow-hidden rounded-[1.75rem] rounded-t-[12rem] border border-[#b98a3f]/34 bg-[#15130f] shadow-[0_34px_110px_rgba(74,54,25,0.2)] lg:block xl:col-start-3"
        >
          <img
            src="/assets/hero/05.png"
            alt=""
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,211,128,0.28),transparent_34%),linear-gradient(180deg,rgba(18,17,13,0.08),rgba(18,17,13,0.72))]" />
          <div className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-[#f4dfb8]/36 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 border-t border-[#e7decf]/28 pt-5 text-[#f5ead7]">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.4em] text-[#d8a34e]">
              Mixed-use ecosystem
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="max-w-[15rem] text-sm leading-relaxed text-[#f5ead7]/78">
                Offices, leisure, retail, and workday convenience connected
                through one architectural experience.
              </p>
              <ArrowUpRight className="h-6 w-6 text-[#d8a34e]" strokeWidth={1.4} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
