"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  CarFront,
  HeartPulse,
  Network,
  Utensils,
  UsersRound,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
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
    copy: "Integrated café and restaurant spaces with a premium dining experience for tenants and visitors.",
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

const archRadius = "50% 50% 1.5rem 1.5rem / 22% 22% 1.5rem 1.5rem";

function PortalCard({ item, index, scene, portalWidth }) {
  const Icon = item.icon;
  const distance = useTransform(scene, (value) => Math.abs(value - index));
  const opacity = useTransform(distance, [0, 0.9, 1.7], [1, 0.5, 0.16]);
  const scale = useTransform(distance, [0, 1, 2], [1, 0.88, 0.8]);
  const y = useTransform(distance, [0, 1, 2], [0, 22, 42]);

  return (
    <motion.article
      aria-label={item.title}
      style={{ opacity, scale, y, width: portalWidth }}
      className="relative h-[min(72svh,720px)] shrink-0 will-change-transform"
    >
      <div
        className="absolute inset-0 border border-[#9d7133]/42 bg-[#17140f] p-[9px] shadow-[0_30px_70px_rgba(60,43,20,0.18)]"
        style={{ borderRadius: archRadius }}
      >
        <div
          className="relative h-full overflow-hidden border border-[#f4dfb8]/26 bg-[#17140f]"
          style={{ borderRadius: archRadius }}
        >
          <img
            src={item.image}
            alt={`${item.title} at Devyog commercial facility`}
            width="504"
            height="504"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: item.position }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,7,0.03)_42%,rgba(10,9,7,0.82)_100%)]" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 border-t border-[#f4dfb8]/28 pt-4">
            <div>
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.4em] text-[#d4a351]">
                {item.eyebrow} / 06
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#f7eddd]">
                {item.menu}
              </p>
            </div>
            <Icon className="h-8 w-8 shrink-0 text-[#d4a351]" strokeWidth={1.15} />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-3 left-[8%] right-[8%] h-4 border-x border-b border-[#9d7133]/34 bg-[#d9cbb4]/72" />
    </motion.article>
  );
}

function OfferingCopy({ item, index, scene }) {
  const distance = useTransform(scene, (value) => Math.abs(value - index));
  const opacity = useTransform(distance, [0, 0.34, 0.58], [1, 0.38, 0]);
  const y = useTransform(scene, (value) => (index - value) * 30);
  const visibility = useTransform(distance, (value) =>
    value < 0.6 ? "visible" : "hidden"
  );

  return (
    <motion.div
      style={{ opacity, y, visibility }}
      className="absolute inset-0 flex flex-col justify-center will-change-transform"
      aria-hidden={false}
    >
      <h2
        style={serifStyle}
        className="text-[clamp(5.25rem,7.25vw,8.8rem)] font-normal leading-[0.8] tracking-[-0.075em] text-[#171510]"
      >
        {item.title}
      </h2>
      <p className="mt-9 max-w-[580px] text-[clamp(1.25rem,1.55vw,1.75rem)] leading-[1.25] tracking-[-0.045em] text-[#2a261d]/76">
        {item.copy}
      </p>

      <div className="mt-11 grid grid-cols-3 gap-4">
        {item.specs.map((spec) => (
          <div
            key={spec}
            className="border-t border-[#9b6c2b]/32 pt-4 text-[0.58rem] font-bold uppercase leading-relaxed tracking-[0.22em] text-[#2a261d]/58"
          >
            {spec}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CompactPortalCard({ item, index }) {
  const Icon = item.icon;

  return (
    <article
      data-compact-portal
      className="w-[82vw] max-w-[430px] shrink-0 snap-center"
      aria-label={`${item.eyebrow} of 06: ${item.title}`}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden border border-[#9d7133]/38 bg-[#17140f] p-[7px] shadow-[0_22px_55px_rgba(61,44,22,0.14)]"
        style={{ borderRadius: archRadius }}
      >
        <div
          className="relative h-full overflow-hidden border border-[#f4dfb8]/24"
          style={{ borderRadius: archRadius }}
        >
          <img
            src={item.image}
            alt={`${item.title} at Devyog commercial facility`}
            width="504"
            height="504"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition: item.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0907]/72 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-[#f4dfb8]/26 pt-4">
            <span className="text-[0.58rem] font-bold uppercase tracking-[0.34em] text-[#f0be69]">
              {item.eyebrow} / 06
            </span>
            <Icon className="h-7 w-7 text-[#f0be69]" strokeWidth={1.2} />
          </div>
        </div>
      </div>

      <div className="px-1 pb-2 pt-7">
        <h3
          style={serifStyle}
          className="text-[clamp(2.7rem,11vw,4.25rem)] leading-[0.88] tracking-[-0.065em] text-[#171510]"
        >
          {item.title}
        </h3>
        <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed tracking-[-0.025em] text-[#2a261d]/72">
          {item.copy}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#9d7133]/24 pt-4">
          {item.specs.map((spec) => (
            <span
              key={spec}
              className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#2a261d]/58"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function OfferingsScrollSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const compactTrackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [compactIndex, setCompactIndex] = useState(0);
  const [portalMetrics, setPortalMetrics] = useState({ width: 420, gap: 30 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const scene = useTransform(
    scrollYProgress,
    [0, 1],
    [0, offerings.length - 1]
  );
  const smoothScene = useSpring(scene, {
    stiffness: 170,
    damping: 32,
    mass: 0.38,
    restDelta: 0.001,
  });
  const trackX = useTransform(
    smoothScene,
    (value) => -value * (portalMetrics.width + portalMetrics.gap)
  );
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (!stageRef.current) return undefined;

    const updateMetrics = () => {
      const stageWidth = stageRef.current?.clientWidth ?? 760;
      const width = Math.round(Math.min(480, Math.max(340, stageWidth * 0.58)));
      const gap = Math.round(Math.min(34, Math.max(22, stageWidth * 0.04)));
      setPortalMetrics((current) =>
        current.width === width && current.gap === gap
          ? current
          : { width, gap }
      );
    };

    updateMetrics();
    const observer = new ResizeObserver(updateMetrics);
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(smoothScene, "change", (latest) => {
    const nextIndex = Math.min(
      offerings.length - 1,
      Math.max(0, Math.round(latest))
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const active = offerings[activeIndex];

  const jumpToOffering = (index) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const available = sectionRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + available * (index / Math.max(1, offerings.length - 1)),
      behavior: "smooth",
    });
  };

  const scrollCompactTo = (index) => {
    const track = compactTrackRef.current;
    const card = track?.querySelectorAll("[data-compact-portal]")?.[index];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const updateCompactIndex = () => {
    const track = compactTrackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll("[data-compact-portal]"));
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });

    setCompactIndex((current) => (current === nearest ? current : nearest));
  };

  return (
    <section id="offerings" ref={sectionRef} className="relative text-[#171510]">
      <div className="offerings-compact px-5 pb-24 pt-32 sm:px-8 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.5em] text-[#9b6c2b]">
                Facility mix
              </p>
              <h2
                style={serifStyle}
                className="mt-6 max-w-3xl text-[clamp(3.25rem,12vw,6rem)] leading-[0.86] tracking-[-0.07em]"
              >
                Spaces for every ambition.
              </h2>
            </div>
            <p className="hidden pb-2 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[#2a261d]/48 sm:block">
              Swipe to explore
            </p>
          </div>

          <div
            ref={compactTrackRef}
            onScroll={updateCompactIndex}
            className="offerings-snap-track -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 sm:-mx-8 sm:px-8"
            aria-label="Facility offerings"
          >
            {offerings.map((item, index) => (
              <CompactPortalCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <nav className="mt-2 flex items-center justify-between border-t border-[#2a261d]/16 pt-5" aria-label="Offering slides">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[#9b6c2b]">
              {String(compactIndex + 1).padStart(2, "0")} / 06
            </p>
            <div className="flex gap-2">
              {offerings.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => scrollCompactTo(index)}
                  aria-label={`View ${item.title}`}
                  aria-current={compactIndex === index ? "true" : undefined}
                  className={`h-1 rounded-full transition-[width,background-color] duration-300 ${
                    compactIndex === index
                      ? "w-8 bg-[#9b6c2b]"
                      : "w-3 bg-[#2a261d]/22"
                  }`}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div
        className="offerings-desktop relative"
        style={{ height: `${100 + (offerings.length - 1) * 88}svh` }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden px-8 py-8 xl:px-12">
          <div className="mx-auto grid h-full max-w-[1580px] grid-cols-[minmax(400px,0.82fr)_minmax(620px,1.18fr)] items-center gap-10 xl:gap-16">
            <div className="relative z-20 flex h-full min-h-0 flex-col justify-between py-[7svh]">
              <div className="flex items-center justify-between gap-8">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.52em] text-[#9b6c2b]">
                  Facility mix
                </p>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.4em] text-[#9b6c2b]">
                  {active.eyebrow} / 06
                </p>
              </div>

              <div className="relative my-auto min-h-[470px] max-w-[660px] py-8">
                {offerings.map((item, index) => (
                  <OfferingCopy
                    key={item.title}
                    item={item}
                    index={index}
                    scene={smoothScene}
                  />
                ))}
              </div>

              <div>
                <nav className="flex items-center gap-3" aria-label="Facility offerings">
                  {offerings.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => jumpToOffering(index)}
                      aria-label={`View ${item.title}`}
                      aria-current={activeIndex === index ? "true" : undefined}
                      className={`group h-8 flex-1 border-t pt-3 text-left text-[0.54rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                        activeIndex === index
                          ? "border-[#9b6c2b] text-[#171510]"
                          : "border-[#2a261d]/18 text-[#2a261d]/34 hover:border-[#9b6c2b]/56 hover:text-[#2a261d]/64"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </button>
                  ))}
                </nav>
                <div className="mt-5 h-px w-full bg-[#2a261d]/12">
                  <motion.div
                    style={{ scaleX: progressScale, transformOrigin: "0% 50%" }}
                    className="h-px w-full bg-[#9b6c2b]"
                  />
                </div>
              </div>
            </div>

            <div ref={stageRef} className="relative h-full min-w-0 overflow-hidden">
              <motion.div
                style={{
                  x: trackX,
                  y: "-50%",
                  width: portalMetrics.width,
                  gap: portalMetrics.gap,
                  marginLeft: -portalMetrics.width / 2,
                }}
                className="absolute left-1/2 top-1/2 flex items-center will-change-transform"
              >
                {offerings.map((item, index) => (
                  <PortalCard
                    key={item.title}
                    item={item}
                    index={index}
                    scene={smoothScene}
                    portalWidth={portalMetrics.width}
                  />
                ))}
              </motion.div>

              <div className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-[#e7decf] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-[#e7decf] to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .offerings-desktop {
          display: none;
        }

        .offerings-compact {
          display: block;
        }

        .offerings-snap-track {
          scrollbar-width: none;
          overscroll-behavior-inline: contain;
          scroll-padding-inline: 1.25rem;
          -webkit-overflow-scrolling: touch;
        }

        .offerings-snap-track::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 1180px) and (min-height: 700px) {
          .offerings-desktop {
            display: block;
          }

          .offerings-compact {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
