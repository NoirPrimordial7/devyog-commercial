"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const serifStyle = {
  fontFamily:
    "'Cormorant Garamond', 'Bodoni 72', 'Didot', 'Times New Roman', serif",
};

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#F8F4EE] px-5 py-20 text-[#1A1A2E] sm:px-8 sm:py-24 lg:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(200,151,58,0.22), transparent 24%), repeating-conic-gradient(from 0deg at 50% 48%, rgba(26,26,46,0.1) 0deg, rgba(26,26,46,0.1) 0.24deg, transparent 0.24deg, transparent 9deg)",
        }}
      />

      <div className="mx-auto max-w-[1260px] self-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-[0.66rem] font-bold uppercase tracking-[0.58em] text-[#C8973A]"
        >
          Investor access
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 0.86, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={serifStyle}
          className="mx-auto mt-8 max-w-5xl text-[clamp(4rem,11vw,11rem)] font-normal leading-[0.82] tracking-[-0.085em]"
        >
          Ready to invest?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 0.78, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-9 max-w-3xl text-xl leading-[1.45] tracking-[-0.04em] text-[#1A1A2E]/68 sm:text-2xl"
        >
          Request detailed project analysis, rent/lease pro-formas, tenant
          pipeline details, and commercial structuring aligned to your investment
          profile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 0.78, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="mailto:info@devyogprojects.co.in?subject=Commercial%20Office%20Facility%20%E2%80%94%20Investment%20Enquiry"
            className="group inline-flex min-h-14 items-center justify-center gap-4 bg-[#C8973A] px-7 text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#0E1C2F] transition-all duration-300 hover:bg-[#E4B86A] sm:px-9"
          >
            Request Full Dossier
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.6}
            />
          </a>
          <a
            href="tel:+919921391412"
            className="group inline-flex min-h-14 items-center justify-center gap-4 border border-[#1A1A2E]/18 px-7 text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#1A1A2E] transition-all duration-300 hover:border-[#C8973A] hover:text-[#C8973A] sm:px-9"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            Call +91 99213 91412
          </a>
        </motion.div>
      </div>
    </section>
  );
}
