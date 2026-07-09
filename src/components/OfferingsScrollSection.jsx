"use client";

import React, { useRef, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CarFront,
  HeartPulse,
  Network,
  Utensils,
  UsersRound,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const serifStyle = {
  fontFamily:
    "'Cormorant Garamond', 'Bodoni 72', 'Didot', 'Times New Roman', serif",
};

const offerings = [
  {
    eyebrow: "01",
    menu: "Grade-A Offices",
    title: "Grade-A Office Spaces",
    copy: "Premium corporate offices with modern amenities, flexible layouts, and institutional-grade infrastructure.",
    image: "/assets/offerings/grade-a-office-spaces.png",
    position: "50% 46%",
    icon: Building2,
    specs: ["Flexible layouts", "Corporate amenities", "Grade-A systems"],
  },
  {
    eyebrow: "02",
    menu: "Co-Working Zones",
    title: "Co-Working Zones",
    copy: "Flexible workspace solutions for startups and enterprises with collaborative commons and networking spaces.",
    image: "/assets/offerings/co-working-zones.png",
    position: "50% 52%",
    icon: UsersRound,
    specs: ["Collaborative commons", "Enterprise-ready", "Networking spaces"],
  },
  {
    eyebrow: "03",
    menu: "Food & Beverage",
    title: "Food & Beverage",
    copy: "Integrated café and restaurant spaces with premium dining experience for tenants and visitors.",
    image: "/assets/offerings/food-and-beverage.png",
    position: "18% 58%",
    icon: Utensils,
    specs: ["Café frontage", "Restaurant spaces", "Tenant convenience"],
  },
  {
    eyebrow: "04",
    menu: "IT Park Facility",
    title: "IT Park Facility",
    copy: "Dedicated IT infrastructure with high-speed connectivity, security systems, and tech-enabled infrastructure.",
    image: "/assets/offerings/it-park-facility.png",
    position: "52% 38%",
    icon: Network,
    specs: ["High-speed connectivity", "Security systems", "Tech-enabled"],
  },
  {
    eyebrow: "05",
    menu: "Wellness Commons",
    title: "Wellness Commons",
    copy: "Rooftop gardens, wellness centers, and recreational facilities for tenant wellbeing and community engagement.",
    image: "/assets/offerings/wellness-commons.png",
    position: "72% 54%",
    icon: HeartPulse,
    specs: ["Rooftop gardens", "Wellness centers", "Recreation zones"],
  },
  {
    eyebrow: "06",
    menu: "Smart Parking",
    title: "Smart Parking",
    copy: "500+ structured parking spaces with EV charging stations and intelligent vehicle management systems.",
    image: "/assets/offerings/smart-parking.png",
    position: "50% 68%",
    icon: CarFront,
    specs: ["500+ spaces", "EV charging", "Vehicle management"],
  },
];

function OfferingVisual({ active }) {
  const Icon = active.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active.title}
        initial={{ opacity: 0, y: 36, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -28, scale: 0.985 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[min(72svh,690px)] min-h-[520px] overflow-hidden rounded-[1.65rem] border border-[#b98a3f]/32 bg-[#15130f] shadow-[0_38px_120px_rgba(76,56,26,0.22)]"
      >
        <img
          src={active.image}
          alt=""
          className="absolute inset-0 h-full w-full scale-[1.035] object-cover opacity-90"
          style={{ objectPosition: active.position }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_18%,rgba(255,214,138,0.2),transparent_29%),linear-gradient(180deg,rgba(17,15,11,0.02),rgba(17,15,11,0.88))]" />
        <div className="absolute inset-x-7 top-7 h-px bg-gradient-to-r from-transparent via-[#f4dfb8]/32 to-transparent" />

        <Icon
          className="absolute right-8 top-9 h-14 w-14 text-[#d6a352]/62"
          strokeWidth={1}
        />

        <div className="absolute bottom-7 left-7 right-7">
          <div className="mb-6 flex items-center justify-between border-b border-[#f5ead7]/18 pb-5">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.44em] text-[#d6a352]">
              {active.menu}
            </p>
            <ArrowUpRight className="h-6 w-6 text-[#d6a352]" strokeWidth={1.2} />
          </div>

          <p className="mb-5 max-w-md text-base leading-relaxed tracking-[-0.025em] text-[#f5ead7]/76">
            {active.copy}
          </p>

          <div className="grid gap-3">
            {active.specs.map((spec) => (
              <div
                key={spec}
                className="flex items-center justify-between gap-5 rounded-full border border-[#f5ead7]/20 bg-[#080706]/42 px-5 py-3 backdrop-blur-md"
              >
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#f5ead7]/74">
                  {spec}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#d6a352]" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function OfferingsScrollSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      offerings.length - 1,
      Math.max(0, Math.floor(latest * offerings.length))
    );
    setActiveIndex(nextIndex);
  });

  const active = offerings[activeIndex];

  const jumpToOffering = (index) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const available = sectionRef.current.offsetHeight - window.innerHeight;
    const target = top + available * (index / Math.max(1, offerings.length - 1));
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="offerings" className="relative text-[#171510]">
      <div className="px-5 py-20 sm:px-8 lg:hidden">
        <p className="mb-6 text-[0.65rem] font-bold uppercase tracking-[0.5em] text-[#9b6c2b]">
          Facility mix
        </p>
        <h2
          style={serifStyle}
          className="max-w-3xl text-[clamp(3rem,14vw,5.6rem)] leading-[0.88] tracking-[-0.075em]"
        >
          Spaces that make work feel complete.
        </h2>

        <div className="mt-12 grid gap-5">
          {offerings.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="overflow-hidden rounded-[1.8rem] border border-[#9b6c2b]/22 bg-[#efe5d2]/72"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ objectPosition: item.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171510]/72 to-transparent" />
                  <Icon className="absolute bottom-5 left-5 h-9 w-9 text-[#f3c36c]" strokeWidth={1.25} />
                </div>
                <div className="p-6">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[#9b6c2b]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.045em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#2a261d]/70">
                    {item.copy}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div ref={sectionRef} className="relative hidden h-[360svh] lg:block">
        <div className="sticky top-0 h-[100svh] min-h-[720px] overflow-hidden px-8 py-10 xl:px-12">
          <div className="relative z-10 mx-auto grid h-full max-w-[1500px] grid-cols-[245px_minmax(0,0.95fr)_minmax(420px,0.9fr)] items-center gap-10 xl:grid-cols-[275px_minmax(0,0.95fr)_minmax(500px,0.9fr)] xl:gap-14">
            <aside className="self-stretch py-20">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.52em] text-[#9b6c2b]">
                    Facility mix
                  </p>
                  <div className="mt-7 h-px w-full bg-[#2a261d]/16" />
                </div>

                <nav className="space-y-1">
                  {offerings.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => jumpToOffering(index)}
                        className="group flex w-full items-center gap-4 py-4 text-left"
                      >
                        <span
                          className={`h-px transition-all duration-500 ${
                            isActive
                              ? "w-12 bg-[#a36f2e]"
                              : "w-5 bg-[#2a261d]/22 group-hover:w-9 group-hover:bg-[#a36f2e]/70"
                          }`}
                        />
                        <span
                          className={`text-[0.68rem] font-bold uppercase tracking-[0.26em] transition-colors duration-500 ${
                            isActive ? "text-[#171510]" : "text-[#2a261d]/42"
                          }`}
                        >
                          {item.menu}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                <div>
                  <div className="h-px w-full bg-[#2a261d]/16" />
                  <p className="mt-6 text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-[#2a261d]/48">
                    Scroll to explore
                  </p>
                </div>
              </div>
            </aside>

            <main className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  initial={{ opacity: 0, y: 38 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mb-7 text-[0.68rem] font-bold uppercase tracking-[0.58em] text-[#9b6c2b]">
                    {active.eyebrow} / 06
                  </p>
                  <h2
                    style={serifStyle}
                    className="max-w-[870px] text-[clamp(5rem,8vw,9.8rem)] font-normal leading-[0.82] tracking-[-0.08em] text-[#171510]"
                  >
                    {active.title}
                  </h2>
                  <p className="mt-10 max-w-2xl text-3xl leading-[1.22] tracking-[-0.055em] text-[#2a261d]/72">
                    {active.copy}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-16 grid max-w-3xl grid-cols-3 gap-3">
                {active.specs.map((spec) => (
                  <div
                    key={spec}
                    className="border-t border-[#9b6c2b]/32 pt-4 text-[0.64rem] font-bold uppercase leading-relaxed tracking-[0.26em] text-[#2a261d]/54"
                  >
                    {spec}
                  </div>
                ))}
              </div>
            </main>

            <OfferingVisual active={active} />
          </div>

          <div className="absolute bottom-8 left-8 right-8 z-20 mx-auto max-w-[1500px]">
            <div className="h-px w-full bg-[#2a261d]/12">
              <motion.div
                style={{ scaleX: progressScale, transformOrigin: "0% 50%" }}
                className="h-px w-full bg-[#a36f2e]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
