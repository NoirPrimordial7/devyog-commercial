import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Building2, Gem, Leaf, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollDissolveReveal } from "@/components/ui/scroll-dissolve-reveal";
import { mixedUseHeroConfig, mixedUseHeroMedia } from "./mixedUseHeroConfig";


function LuxuryHeadline({ variant }) {
  const isExterior = variant === "exterior";
  const lines = isExterior
    ? [["Premium", "text-[19vw] sm:text-[clamp(5.2rem,12vw,13.4rem)]"], ["Commercial", "text-[15vw] sm:text-[clamp(4rem,9.4vw,10.8rem)]"], ["Offices", "text-[22vw] sm:text-[clamp(6rem,13.6vw,15.5rem)]"]]
    : [["Mixed-Use", "text-[18vw] sm:text-[clamp(4.3rem,10.4vw,11.8rem)]"], ["Business", "text-[19vw] sm:text-[clamp(4.5rem,11.2vw,12.6rem)]"], ["Facility", "text-[20vw] sm:text-[clamp(4.8rem,11.8vw,13.2rem)]"]];

  return (
    <h1 className={`hero-serif flex flex-col items-center uppercase leading-[0.7] tracking-[-0.055em] ${isExterior ? "text-[#ffb347]" : "gold-type"}`} aria-label={lines.map(([line]) => line).join(" ")}>
      {lines.map(([line, className]) => <span key={line} className={`block whitespace-nowrap ${className}`}>{line}</span>)}
    </h1>
  );
}


const featureHighlights = [
  { icon: MapPin, label: <>Prime<br />Business District</> },
  { icon: Building2, label: <>Iconic<br />Architecture</> },
  { icon: Gem, label: <>World-Class<br />Amenities</> },
  { icon: Leaf, label: <>Sustainable<br />Design</> },
];


function FeatureRail({ opacity }) {
  return (
    <motion.aside style={{ opacity }} className="pointer-events-none absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 z-[55] w-[calc(100%-1.5rem)] max-w-[390px] sm:bottom-6 sm:left-6 sm:w-[310px] md:left-8 lg:bottom-[clamp(2.25rem,5vh,4.5rem)] lg:left-[clamp(2rem,3.5vw,4.75rem)] lg:top-auto lg:w-[245px] xl:w-[270px]" aria-label="Facility highlights">
      <div className="grid grid-cols-2 overflow-hidden border-y border-white/16 sm:block lg:border-y-0">
        {featureHighlights.map(({ icon: Icon, label }, index) => (
          <div key={index} className={`relative grid grid-cols-[24px_1fr] items-center gap-3 px-3 py-3 sm:grid-cols-[34px_1fr] sm:gap-4 sm:px-0 sm:py-4 lg:grid-cols-[40px_1fr] lg:py-[1.15rem] ${index < 2 ? "border-b border-white/18" : ""} ${index % 2 === 0 ? "border-r border-white/18 sm:border-r-0" : ""} ${index === featureHighlights.length - 1 ? "sm:border-b-0" : "sm:border-b sm:border-white/18"}`}>
            <Icon aria-hidden="true" strokeWidth={1.35} className="h-6 w-6 text-champagne drop-shadow-[0_0_18px_rgba(214,174,104,.32)] sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
            <p className="text-[9px] font-medium uppercase leading-[1.2] tracking-[0.08em] text-white/86 min-[390px]:text-[10px] sm:text-[12px] sm:leading-[1.25] lg:text-[13px]">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 hidden items-center gap-5 text-[11px] font-medium uppercase tracking-[0.34em] text-champagne lg:flex">
        <span>Discover More</span><span className="relative h-px w-14 bg-champagne/60"><ArrowRight size={20} strokeWidth={1.45} className="absolute -right-1.5 -top-2.5" aria-hidden="true" /></span>
      </div>
    </motion.aside>
  );
}


function useHeroViewport() {
  const read = () => window.innerWidth < 768 ? "mobile" : window.innerWidth < 1100 ? "tablet" : "desktop";
  const [viewport, setViewport] = useState(read);
  useEffect(() => {
    const update = () => setViewport(read());
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return viewport;
}


export function LayeredHeroExperience({ children }) {
  const experience = useRef(null);
  const videoRef = useRef(null);
  const playbackState = useRef(false);
  const reducedMotion = useReducedMotion();
  const viewport = useHeroViewport();
  const [heroVisible, setHeroVisible] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const saveData = typeof navigator !== "undefined" && Boolean(navigator.connection?.saveData);
  const videoEnabled = mixedUseHeroConfig.mediaMode === "video" && !reducedMotion && !saveData && !videoFailed;

  const { scrollYProgress } = useScroll({ target: experience, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: reducedMotion ? 700 : 120, damping: reducedMotion ? 80 : 30, mass: reducedMotion ? 0.01 : 0.28, restDelta: 0.0008 });
  const mixedProgress = useTransform(progress, [mixedUseHeroConfig.mixedUseStart, 1], [0, 1], { clamp: true });

  const exteriorBaseOpacity = useTransform(progress, [0, 0.2, 0.4], [1, 1, 0]);
  const exteriorDecorOpacity = useTransform(progress, [0.12, 0.38], [1, 0]);
  const exteriorDecorY = useTransform(progress, [0.12, 0.38], ["0vh", "-12vh"]);
  const exteriorTextOpacity = useTransform(progress, [0.1, 0.36], [1, 0]);
  const exteriorTextY = useTransform(progress, [0.1, 0.36], ["0vh", "-28vh"]);

  const mixedArrival = useTransform(progress, [0.38, 0.48], [0, 1]);
  const decorativeExitOpacity = useTransform(mixedProgress, [mixedUseHeroConfig.decorativeExitStart, mixedUseHeroConfig.decorativeExitEnd], [1, 0]);
  const decorativeOpacity = useTransform(() => mixedArrival.get() * decorativeExitOpacity.get());
  const decorativeY = useTransform(mixedProgress, [mixedUseHeroConfig.decorativeExitStart, mixedUseHeroConfig.decorativeExitEnd], ["0vh", viewport === "mobile" ? "-10vh" : "-18vh"]);
  const textExitOpacity = useTransform(mixedProgress, [mixedUseHeroConfig.textExitStart, mixedUseHeroConfig.textExitEnd], [1, 0]);
  const mixedTextOpacity = useTransform(() => mixedArrival.get() * textExitOpacity.get());
  const mixedTextY = useTransform(mixedProgress, [mixedUseHeroConfig.textExitStart, mixedUseHeroConfig.textExitEnd], ["0vh", viewport === "mobile" ? "-54vh" : "-75vh"]);
  const mixedTextScale = useTransform(mixedProgress, [mixedUseHeroConfig.textExitStart, mixedUseHeroConfig.textExitEnd], [1, 0.88]);
  const videoExitOpacity = useTransform(mixedProgress, [mixedUseHeroConfig.videoFadeStart, mixedUseHeroConfig.videoFadeEnd], [1, 0]);
  const videoOpacity = useTransform(() => mixedArrival.get() * videoExitOpacity.get());
  const ambientOverlayOpacity = useTransform(mixedProgress, [0.44, 0.66], [1, 0]);
  const dissolveProgress = useTransform(mixedProgress, [mixedUseHeroConfig.dissolveStart, mixedUseHeroConfig.dissolveEnd], [0, 1], { clamp: true });
  const reducedBaseOpacity = useTransform(mixedProgress, [0.72, 1], [1, 0]);

  const globalDissolveStart = mixedUseHeroConfig.mixedUseStart + (1 - mixedUseHeroConfig.mixedUseStart) * mixedUseHeroConfig.dissolveStart;
  const bufferHeight = mixedUseHeroConfig.incomingBufferHeight[viewport];
  const incomingStartY = viewport === "mobile" ? 60 : viewport === "tablet" ? 56 : 52;
  const incomingY = useTransform(progress, [globalDissolveStart, 1], [`${incomingStartY}svh`, `${-bufferHeight}svh`], { clamp: true });
  const featureRailOpacity = useTransform(progress, [0, 0.23, 0.4, 0.5, 0.74], [1, 1, 0, 0.9, 0]);
  const scrollHintOpacity = useTransform(progress, [0, 0.22, 0.34], [1, 1, 0]);
  const scrollLine = useTransform(progress, [0, 1], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.02 });
    if (experience.current) observer.observe(experience.current);
    return () => observer.disconnect();
  }, []);

  const syncVideoPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    const shouldPlay = videoEnabled && videoReady && heroVisible && progress.get() >= 0.27 && videoOpacity.get() > 0.015;
    if (playbackState.current === shouldPlay) return;
    playbackState.current = shouldPlay;
    if (shouldPlay) {
      const promise = video.play();
      if (promise) promise.catch(() => setVideoFailed(true));
    } else {
      video.pause();
    }
  }, [heroVisible, progress, videoEnabled, videoOpacity, videoReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    }
    const unsubscribeProgress = progress.on("change", syncVideoPlayback);
    const unsubscribeOpacity = videoOpacity.on("change", syncVideoPlayback);
    syncVideoPlayback();
    return () => {
      unsubscribeProgress();
      unsubscribeOpacity();
      video?.pause();
    };
  }, [progress, syncVideoPlayback, videoOpacity]);

  const totalHeight = reducedMotion ? mixedUseHeroConfig.reducedScrollDistance : mixedUseHeroConfig.totalScrollDistance;

  return (
    <>
      <main ref={experience} id="experience" className="relative z-10 bg-transparent" style={{ height: `${totalHeight}svh` }}>
        <span id="exterior" className="absolute left-0 top-0" aria-hidden="true" />
        <span id="interior" className="absolute left-0 top-[42%]" aria-hidden="true" />

        <div className="sticky top-0 h-[100svh] overflow-hidden bg-transparent">
          {reducedMotion
            ? <motion.img src={mixedUseHeroMedia.staticBase} alt="" aria-hidden="true" style={{ opacity: reducedBaseOpacity }} className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover object-center" />
            : <ScrollDissolveReveal image={mixedUseHeroMedia.staticBase} progress={dissolveProgress} className="z-10" />}

          {videoEnabled && (
            <motion.video
              ref={videoRef}
              src={mixedUseHeroMedia.motionVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              tabIndex={-1}
              preload="metadata"
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
              style={{ opacity: videoOpacity }}
              className="pointer-events-none absolute inset-0 z-[15] h-full w-full object-cover object-center"
            />
          )}

          <motion.img src={mixedUseHeroMedia.exteriorBase} alt="" aria-hidden="true" decoding="async" fetchPriority="high" loading="eager" draggable="false" style={{ opacity: exteriorBaseOpacity }} className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover object-center" />

          <motion.section style={{ opacity: exteriorTextOpacity }} className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-label="Premium commercial offices">
            <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 1.25, ease: [0.2, 0.8, 0.2, 1] }} style={{ y: exteriorTextY }} className="absolute inset-x-0 top-[18%] z-20 flex justify-center px-4 sm:top-[17%] lg:top-[14%]"><LuxuryHeadline variant="exterior" /></motion.div>
            <motion.img src={mixedUseHeroMedia.exteriorDecorative} alt="" aria-hidden="true" decoding="async" fetchPriority="high" loading="eager" draggable="false" style={{ opacity: exteriorDecorOpacity, y: exteriorDecorY }} className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover object-center" />
          </motion.section>

          <motion.img src={mixedUseHeroMedia.mixedUseDecorative} alt="" aria-hidden="true" decoding="async" loading="eager" draggable="false" style={{ opacity: decorativeOpacity, y: decorativeY }} className="pointer-events-none absolute inset-0 z-40 h-full w-full object-cover object-center" />

          <motion.section style={{ opacity: mixedTextOpacity, y: mixedTextY, scale: mixedTextScale }} className="pointer-events-none absolute inset-x-0 top-[21%] z-50 flex origin-top justify-center px-4 sm:top-[18%] lg:top-[14%]" aria-label="Mixed-use business facility"><LuxuryHeadline variant="interior" /></motion.section>

          <motion.div style={{ opacity: ambientOverlayOpacity }} className="pointer-events-none absolute inset-0 z-[45] bg-[linear-gradient(180deg,rgba(3,7,12,.18)_0%,rgba(3,7,12,0)_43%,rgba(3,7,12,.36)_100%)]" />
          <motion.div style={{ opacity: ambientOverlayOpacity }} className="pointer-events-none absolute inset-0 z-[45] bg-[radial-gradient(circle_at_50%_50%,transparent_18%,rgba(1,4,8,.22)_100%)]" />

          <FeatureRail opacity={featureRailOpacity} />
          <motion.div style={{ opacity: scrollHintOpacity }} className="pointer-events-none absolute bottom-7 left-1/2 z-[60] hidden -translate-x-1/2 items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/65 md:flex">
            <span>Scroll to reveal</span><span className="relative h-10 w-px overflow-hidden bg-white/20"><motion.span style={{ scaleY: scrollLine }} className="absolute inset-0 origin-top bg-champagne" /></span>
          </motion.div>
        </div>
      </main>

      <motion.div style={{ y: incomingY, "--mixed-use-buffer": `${bufferHeight}svh` }} className="relative z-0 -mt-[100svh] min-w-0 overflow-x-clip">
        <div className="h-[var(--mixed-use-buffer)] bg-black" aria-hidden="true" />
        {children}
      </motion.div>
    </>
  );
}
