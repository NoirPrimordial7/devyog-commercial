"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Building2, Layers3, Landmark } from "lucide-react";

const serifStyle = {
  fontFamily:
    "'Cormorant Garamond', 'Bodoni 72', 'Didot', 'Times New Roman', serif",
};

const models = [
  {
    tab: "Long-Term Leases",
    title: "Long-Term Lease Model",
    icon: Landmark,
    description:
      "Devyog develops the facility for long-duration leasing to institutional operators, corporate users, and diversified multi-tenant occupancy.",
    metrics: [
      ["9–15 yrs", "Lease tenure"],
      ["5–8%", "Annual escalation"],
      ["15–18%", "Target rental yield"],
    ],
    points: [
      "Predictable rental income with indexed escalation clauses.",
      "Diversified tenant mix reduces single-tenant concentration risk.",
      "Professional property management handled by Devyog.",
      "Institutional-quality tenants strengthen payment reliability.",
    ],
    ideal:
      "For institutions, pension funds, and REIT-style investors seeking stable, inflation-linked income from Grade-A commercial assets.",
  },
  {
    tab: "Institutional Anchors",
    title: "Institutional Anchor Model",
    icon: Building2,
    description:
      "A large tenant or co-anchor occupies a meaningful share of the facility while Devyog retains the balance for flex offices, retail, and F&B.",
    metrics: [
      ["40–60%", "Anchor occupancy"],
      ["25k–40k", "sq.ft anchor space"],
      ["Lower", "Ramp-up risk"],
    ],
    points: [
      "Anchor lease secures stable base income early in the lifecycle.",
      "Remaining space generates high-margin variable income.",
      "Anchor brand presence attracts quality tenants to flex and retail areas.",
      "Typical anchors include IT services, corporate HQ, and BPO operations.",
    ],
    ideal:
      "For co-investors and PE funds that want reduced occupancy risk while retaining upside from the remaining mixed-use stack.",
  },
  {
    tab: "Mixed-Use Blended",
    title: "Mixed-Use Blended Occupancy",
    icon: Layers3,
    description:
      "Each component is optimized independently: premium offices on long leases, co-working on flex terms, F&B on revenue-share, and retail on shorter cycles.",
    metrics: [
      ["₹60–80", "Office rent / sq.ft / mo"],
      ["8–10%", "F&B revenue share"],
      ["16–20%", "Blended yield"],
    ],
    points: [
      "Office component can run on 9–12 year leases.",
      "Co-working occupancy adds high-margin flex turnover.",
      "F&B retail can operate on revenue-share or fixed-rental hybrid terms.",
      "Diversified income streams reduce concentration risk across market cycles.",
    ],
    ideal:
      "For active investors and operators seeking multiple revenue streams with flexibility to adapt to demand.",
  },
  {
    tab: "Asset Sale / REIT",
    title: "Built-to-Suit Sale / REIT Exit",
    icon: BarChart3,
    description:
      "The asset is developed to institutional-grade standards for sale to REITs, PE funds, or long-hold capital seeking stabilized commercial income.",
    metrics: [
      [">70%", "Occupancy at handover"],
      ["6–8%", "REIT yield"],
      ["Grade-A", "Exit profile"],
    ],
    points: [
      "Constructed to REIT-compliant quality and governance expectations.",
      "Pre-leased with long-term institutional tenants before handover.",
      "Turnkey delivery reduces execution risk for the acquirer.",
      "Developer exits with capital gain; buyer secures a stabilized yield asset.",
    ],
    ideal:
      "For developers seeking institutional exit, REITs acquiring pipeline assets, and PE funds building commercial real estate portfolios.",
  },
];

export function InvestorModelsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = models[activeIndex];
  const Icon = active.icon;

  return (
    <section
      id="investor-options"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#0E1C2F] px-5 py-20 text-[#F8F4EE] sm:px-8 sm:py-24 lg:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 72% 30%, rgba(200,151,58,0.22), transparent 28%), radial-gradient(circle at 18% 76%, rgba(21,40,67,0.95), transparent 34%), linear-gradient(135deg, #0E1C2F 0%, #07111f 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(228,184,106,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(228,184,106,0.045)_1px,transparent_1px)] bg-[size:88px_88px] opacity-55" />

      <div className="mx-auto w-full max-w-[1500px] self-center">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.35fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-18%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.54em] text-[#E4B86A]">
              Lease & rental models
            </p>
            <h2
              style={serifStyle}
              className="mt-8 max-w-4xl text-[clamp(3.7rem,8vw,9.2rem)] font-normal leading-[0.82] tracking-[-0.08em]"
            >
              Revenue structure{" "}
              <em className="text-[#E4B86A]"> & investor</em> options
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-18%" }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-xl leading-[1.45] tracking-[-0.04em] text-[#F8F4EE]/62 sm:text-2xl"
          >
            Multiple rental and occupancy models are available depending on
            investor profile and risk appetite, from stabilized leases to
            institutional exits.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {models.map((model, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={model.tab}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group min-h-28 border px-5 py-5 text-left transition-all duration-500 ${
                  isActive
                    ? "border-[#C8973A] bg-[#C8973A]/16 text-[#F8F4EE]"
                    : "border-[#E4B86A]/15 bg-white/[0.035] text-[#F8F4EE]/46 hover:border-[#C8973A]/55 hover:text-[#F8F4EE]"
                }`}
              >
                <span className="text-[0.58rem] font-bold uppercase tracking-[0.36em] text-[#E4B86A]">
                  0{index + 1}
                </span>
                <span className="mt-5 block text-sm font-semibold uppercase tracking-[0.22em]">
                  {model.tab}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden border border-[#E4B86A]/18 bg-[#07111f]/72 shadow-[0_40px_140px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12 xl:p-16"
            >
              <div>
                <div className="mb-9 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.42em] text-[#C8973A]">
                      Investor model
                    </p>
                    <h3
                      style={serifStyle}
                      className="mt-5 text-[clamp(3rem,5.8vw,6.8rem)] leading-[0.85] tracking-[-0.08em]"
                    >
                      {active.title}
                    </h3>
                  </div>
                  <div className="grid size-16 shrink-0 place-items-center border border-[#E4B86A]/22 text-[#E4B86A] sm:size-20">
                    <Icon className="h-8 w-8" strokeWidth={1.2} />
                  </div>
                </div>

                <p className="max-w-3xl text-xl leading-[1.45] tracking-[-0.035em] text-[#F8F4EE]/68 sm:text-2xl">
                  {active.description}
                </p>

                <ul className="mt-10 grid gap-4">
                  {active.points.map((point) => (
                    <li
                      key={point}
                      className="grid grid-cols-[28px_1fr] gap-4 border-t border-[#E4B86A]/12 pt-4 text-sm leading-relaxed text-[#F8F4EE]/62 sm:text-base"
                    >
                      <ArrowUpRight
                        className="mt-1 h-4 w-4 text-[#C8973A]"
                        strokeWidth={1.4}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="flex flex-col justify-between gap-8 bg-[#152843]/55 p-6 sm:p-8">
                <div className="grid gap-3">
                  {active.metrics.map(([value, label]) => (
                    <div
                      key={label}
                      className="border border-[#E4B86A]/16 bg-[#0E1C2F]/58 p-5"
                    >
                      <p
                        style={serifStyle}
                        className="text-[clamp(2.7rem,5vw,5.4rem)] leading-none tracking-[-0.08em] text-[#E4B86A]"
                      >
                        {value}
                      </p>
                      <p className="mt-4 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-[#F8F4EE]/48">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E4B86A]/18 pt-6">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.38em] text-[#C8973A]">
                    Ideal for
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[#F8F4EE]/62">
                    {active.ideal}
                  </p>
                </div>
              </aside>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
