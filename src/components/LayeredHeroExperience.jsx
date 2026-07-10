import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Building2, Gem, Leaf, MapPin } from "lucide-react";
import { useRef } from "react";
import { ScrollDissolveReveal } from "@/components/ui/scroll-dissolve-reveal";

function LuxuryHeadline({ variant }) {
  const isExterior = variant === "exterior";
  const lines = isExterior
    ? [
        ["Premium", "text-[19vw] sm:text-[clamp(5.2rem,12vw,13.4rem)]"],
        ["Commercial", "text-[15vw] sm:text-[clamp(4rem,9.4vw,10.8rem)]"],
        ["Offices", "text-[22vw] sm:text-[clamp(6rem,13.6vw,15.5rem)]"],
      ]
    : [
        ["Mixed-Use", "text-[18vw] sm:text-[clamp(4.3rem,10.4vw,11.8rem)]"],
        ["Business", "text-[19vw] sm:text-[clamp(4.5rem,11.2vw,12.6rem)]"],
        ["Facility", "text-[20vw] sm:text-[clamp(4.8rem,11.8vw,13.2rem)]"],
      ];

  return (
    <h1
      className={`hero-serif flex flex-col items-center uppercase leading-[0.7] tracking-[-0.055em] ${
        isExterior ? "text-[#ffb347]" : "gold-type"
      }`}
      aria-label={lines.map(([line]) => line).join(" ")}
    >
      {lines.map(([line, className]) => (
        <span key={line} className={`block whitespace-nowrap ${className}`}>
          {line}
        </span>
      ))}
    </h1>
  );
}

const featureHighlights = [
  {
    icon: MapPin,
    label: (
      <>
        Prime
        <br />
        Business District
      </>
    ),
  },
  {
    icon: Building2,
    label: (
      <>
        Iconic
        <br />
        Architecture
      </>
    ),
  },
  {
    icon: Gem,
    label: (
      <>
        World-Class
        <br />
        Amenities
      </>
    ),
  },
  {
    icon: Leaf,
    label: (
      <>
        Sustainable
        <br />
        Design
      </>
    ),
  },
];

function FeatureRail({ opacity }) {
  return (
    <motion.aside
      initial={{ x: -22 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.55, duration: 1.05, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ opacity }}
      className="pointer-events-none absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 z-[55] w-[calc(100%-1.5rem)] max-w-[390px] sm:bottom-6 sm:left-6 sm:w-[310px] md:left-8 lg:bottom-[clamp(2.25rem,5vh,4.5rem)] lg:left-[clamp(2rem,3.5vw,4.75rem)] lg:top-auto lg:w-[245px] xl:w-[270px]"
      aria-label="Facility highlights"
    >
      <div className="grid grid-cols-2 overflow-hidden border-y border-white/16 sm:block lg:border-y-0">
        {featureHighlights.map(({ icon: Icon, label }, index) => (
          <div
            key={index}
            className={`relative grid grid-cols-[24px_1fr] items-center gap-3 px-3 py-3 sm:grid-cols-[34px_1fr] sm:gap-4 sm:px-0 sm:py-4 lg:grid-cols-[40px_1fr] lg:py-[1.15rem] ${
              index < 2 ? "border-b border-white/18" : ""
            } ${
              index % 2 === 0 ? "border-r border-white/18 sm:border-r-0" : ""
            } ${
              index === featureHighlights.length - 1 ? "sm:border-b-0" : "sm:border-b sm:border-white/18"
            }`}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.35}
              className="h-6 w-6 text-champagne drop-shadow-[0_0_18px_rgba(214,174,104,.32)] sm:h-8 sm:w-8 lg:h-9 lg:w-9"
            />
            <p className="text-[9px] font-medium uppercase leading-[1.2] tracking-[0.08em] text-white/86 min-[390px]:text-[10px] sm:text-[12px] sm:leading-[1.25] lg:text-[13px]">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 hidden items-center gap-5 text-[11px] font-medium uppercase tracking-[0.34em] text-champagne lg:flex">
        <span>Discover More</span>
        <span className="relative h-px w-14 bg-champagne/60">
          <ArrowRight
            size={20}
            strokeWidth={1.45}
            className="absolute -right-1.5 -top-2.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </motion.aside>
  );
}

export function LayeredHeroExperience() {
  const experience = useRef(null);
  const { scrollYProgress } = useScroll({
    target: experience,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 112,
    damping: 27,
    restDelta: 0.001,
  });

  const exteriorOpacity = useTransform(
    smoothProgress,
    [0, 0.22, 0.4],
    [1, 1, 0],
  );
  const exteriorTextY = useTransform(smoothProgress, [0.05, 0.4], ["0%", "-5%"]);

  const interiorOpacity = useTransform(
    smoothProgress,
    [0.68, 0.9],
    [0, 1],
  );
  const interiorTextY = useTransform(
    smoothProgress,
    [0.68, 0.93],
    ["6%", "0%"],
  );
  const interiorTextOpacity = useTransform(
    smoothProgress,
    [0.7, 0.9],
    [0, 1],
  );
  const featureRailOpacity = useTransform(
    smoothProgress,
    [0, 0.46, 0.64, 0.82, 1],
    [1, 0.92, 0, 0.92, 1],
  );
  const scrollLine = useTransform(smoothProgress, [0, 1], [0, 1]);
  const scrollHintOpacity = useTransform(
    smoothProgress,
    [0, 0.34, 0.56],
    [1, 1, 0],
  );

  return (
    <main
      ref={experience}
      id="experience"
      className="relative h-[230svh] bg-obsidian"
    >
      <span id="exterior" className="absolute left-0 top-0" aria-hidden="true" />
      <span
        id="interior"
        className="absolute left-0 top-[145vh]"
        aria-hidden="true"
      />

      <ScrollDissolveReveal
        imageFront="/assets/hero/01.png"
        imageBack="/assets/hero/05.png"
        containerClassName="absolute inset-0 z-[5]"
        className="bg-obsidian"
      />

      <div className="sticky top-0 z-10 h-[100svh] overflow-hidden">
        <FeatureRail opacity={featureRailOpacity} />

        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(3,7,12,.18)_0%,rgba(3,7,12,0)_43%,rgba(3,7,12,.36)_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_18%,rgba(1,4,8,.22)_100%)]" />

        <motion.section
          style={{ opacity: exteriorOpacity }}
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          aria-label="Premium commercial offices"
        >
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1.25, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ y: exteriorTextY }}
            className="absolute inset-x-0 top-[18%] z-20 flex justify-center px-4 sm:top-[17%] lg:top-[14%]"
          >
            <LuxuryHeadline variant="exterior" />
          </motion.div>

          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 1.45, ease: [0.2, 0.8, 0.2, 1] }}
            src="/assets/hero/03.png"
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
            loading="eager"
            draggable="false"
            className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover object-center"
          />
        </motion.section>

        <motion.section
          style={{ opacity: interiorOpacity }}
          className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
          aria-label="Mixed-use business facility"
        >
          <motion.div
            style={{ y: interiorTextY, opacity: interiorTextOpacity }}
            className="absolute inset-x-0 top-[21%] z-20 flex justify-center px-4 sm:top-[18%] lg:top-[14%]"
          >
            <LuxuryHeadline variant="interior" />
          </motion.div>

          <motion.img
            style={{
              opacity: interiorTextOpacity,
            }}
            src="/assets/hero/08.png"
            alt=""
            aria-hidden="true"
            decoding="async"
            loading="eager"
            draggable="false"
            className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover object-center"
          />
        </motion.section>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute bottom-7 left-1/2 z-[60] hidden -translate-x-1/2 items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/65 md:flex"
        >
          <span>Scroll to reveal</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/20">
            <motion.span
              style={{ scaleY: scrollLine }}
              className="absolute inset-0 origin-top bg-champagne"
            />
          </span>
        </motion.div>
      </div>
    </main>
  );
}
