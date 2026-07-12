import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { DossierEditorialSpread } from "./DossierVisuals";
import { dossierChapters, dossierMedia, dossierTimeline } from "./investmentDossierData";


const turnThreshold = ([start, end]) => start + (end - start) * 0.7;
const chapterThresholds = dossierTimeline.chapters.slice(0, 3).map((chapter) => turnThreshold(chapter.turn));


function SpreadLayer({ chapter, index, progress, activeIndex }) {
  const timeline = dossierTimeline.chapters[index];
  const localProgress = useTransform(progress, timeline.story, [0, 1], { clamp: true });
  const visibleStart = index === 0 ? dossierTimeline.open[0] + 0.005 : chapterThresholds[index - 1];
  const closingDuration = dossierTimeline.close[1] - dossierTimeline.close[0];
  const visibleEnd = index < 3 ? chapterThresholds[index] : dossierTimeline.handoff.withdrawal[1];
  const opacity = useTransform(progress, [visibleStart - 0.012, visibleStart + 0.012, visibleEnd, visibleEnd + 0.016], [0, 1, 1, 0]);
  const rightFadeStart = timeline.turn ? timeline.turn[0] : dossierTimeline.handoff.withdrawal[0];
  const rightFadeEnd = timeline.turn ? timeline.turn[0] + (timeline.turn[1] - timeline.turn[0]) * 0.16 : dossierTimeline.handoff.withdrawal[1];
  const rightOpacity = useTransform(progress, [rightFadeStart, rightFadeEnd], [1, 0], { clamp: true });

  return (
    <motion.article
      className="folio-spread"
      data-chapter={chapter.id}
      style={{ opacity }}
      aria-hidden={activeIndex !== index}
    >
      <DossierEditorialSpread chapter={chapter} progress={localProgress} active={activeIndex === index} rightOpacity={rightOpacity} />
    </motion.article>
  );
}


function ReadingHold({ progress, index }) {
  const hold = dossierTimeline.chapters[index].hold;
  const duration = hold[1] - hold[0];
  const opacity = useTransform(progress, [hold[0] + duration * 0.58, hold[0] + duration * 0.72, hold[1] - 0.004, hold[1]], [0, 1, 1, 0]);

  return (
    <motion.div className="folio-hold-hint" style={{ opacity }} aria-hidden="true">
      Scroll to turn the page <ArrowDown size={13} />
    </motion.div>
  );
}


function PhysicalPageTurn({ progress, index, reducedMotion }) {
  const timeline = dossierTimeline.chapters[index];
  const [start, end] = timeline.turn;
  const turnProgress = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const pageProgress = useTransform(turnProgress, [0, 0.14, 1], [0, 0, 1], { clamp: true });
  const rotateY = useTransform(pageProgress, [0, 1], [0, reducedMotion ? 0 : -180]);
  const scaleX = useTransform(pageProgress, [0, 0.5, 1], [1, reducedMotion ? 1 : 0.88, 1]);
  const skewY = useTransform(pageProgress, [0, 0.5, 1], [0, reducedMotion ? 0 : -1.2, 0]);
  const opacity = useTransform(progress, [start - 0.003, start, end, end + 0.004], [0, 1, 1, 0]);
  const shadowOpacity = useTransform(pageProgress, [0, 0.5, 1], [0, 0.5, 0]);
  const curlX = useTransform(pageProgress, [0, 0.5, 1], ["98%", "84%", "2%"]);

  return (
    <motion.div className="folio-page-turn" style={{ opacity, rotateY, scaleX, skewY }} aria-hidden="true">
      <div className="turn-page-front"><span>{String(index + 2).padStart(2, "0")}</span><i>DEVYOG</i></div>
      <div className="turn-page-back"><span>{String(index + 1).padStart(2, "0")}</span></div>
      <motion.div className="turn-cast-shadow" style={{ opacity: shadowOpacity }} />
      <motion.div className="turn-page-curl" style={{ left: curlX }} />
      <div className="turn-page-edge" />
      <motion.div className="turn-spine-shadow" style={{ opacity: shadowOpacity }} />
      <motion.div className="next-spread-mask" style={{ opacity: shadowOpacity }} />
    </motion.div>
  );
}


function FolioTabs({ activeIndex, opacity }) {
  return (
    <motion.ol className="folio-tabs" style={{ opacity }} aria-label="Investment dossier chapters">
      {dossierChapters.map((chapter, index) => (
        <li key={chapter.id} className={index === activeIndex ? "is-active" : index < activeIndex ? "is-complete" : ""}>
          <span>{chapter.number}</span>
          <small>{chapter.label}</small>
        </li>
      ))}
    </motion.ol>
  );
}


function ModernCover({ progress, reducedMotion }) {
  const [start, end] = dossierTimeline.open;
  const openDuration = end - start;
  const closeStart = dossierTimeline.close[0];
  const closeDuration = dossierTimeline.close[1] - closeStart;
  const rightRotate = useTransform(
    progress,
    [0, start, start + openDuration * 0.28, start + openDuration * 0.72, end, closeStart, closeStart + closeDuration * 0.28, closeStart + closeDuration * 0.72, dossierTimeline.close[1], 1],
    [0, 0, reducedMotion ? -3 : -10, reducedMotion ? -7 : -170, reducedMotion ? -8 : -180, reducedMotion ? -8 : -180, reducedMotion ? -7 : -170, reducedMotion ? -3 : -10, 0, 0],
  );
  const coverOpacity = useTransform(progress, [0, end - 0.008, end + 0.008, dossierTimeline.close[0] - 0.008, dossierTimeline.close[0] + 0.008, 1], [1, 1, 0, 0, 1, 1]);
  const coverCopyOpacity = useTransform(progress, [dossierTimeline.handoff.close[0], dossierTimeline.handoff.metamorphosis[0], dossierTimeline.handoff.metamorphosis[1]], [1, .58, 0]);
  const sweepX = useTransform(progress, [dossierTimeline.approach[0], start], ["-120%", "140%"]);

  return (
    <motion.div className="folio-cover-system" style={{ opacity: coverOpacity }} aria-hidden="true">
      <motion.div className="folio-cover-half folio-cover-half--right" style={{ rotateY: rightRotate }}>
        <motion.div className="folio-cover-front" style={{ "--cover-copy-opacity": coverCopyOpacity }}>
          <p className="folio-cover-kicker">DEVYOG</p>
          <h3>Investment<br />dossier</h3>
          <i />
          <p>Four forces shaping<br />one connected commercial destination.</p>
          <span>Architecture / Place / Demand / Relevance</span>
          <motion.b className="folio-cover-sweep" style={{ x: sweepX }} />
        </motion.div>
        <div className="folio-cover-liner">
          <span>DEVYOG / INVESTMENT DOSSIER</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DossierCapitalHandoff({ progress, reducedMotion }) {
  const plateOpacity = useTransform(progress, [dossierTimeline.handoff.close[0], dossierTimeline.handoff.close[1], dossierTimeline.handoff.metamorphosis[0]], [0, 0, 1]);
  const plateScaleY = useTransform(progress, dossierTimeline.handoff.metamorphosis, [1, reducedMotion ? 1 : .16]);
  const plateRotateX = useTransform(progress, dossierTimeline.handoff.metamorphosis, [0, reducedMotion ? 0 : 66]);
  const plateWidth = useTransform(progress, dossierTimeline.handoff.metamorphosis, ["50%", "100%"]);
  const assetOpacity = useTransform(progress, [dossierTimeline.handoff.metamorphosis[0], dossierTimeline.handoff.emergence[0], dossierTimeline.handoff.emergence[1]], [0, .18, 1]);
  const assetClip = useTransform(progress, dossierTimeline.handoff.emergence, ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const assetY = useTransform(progress, dossierTimeline.handoff.emergence, [reducedMotion ? 0 : 34, 0]);
  const assetScale = useTransform(progress, [dossierTimeline.handoff.emergence[0], dossierTimeline.handoff.settle[1]], [.84, 1]);
  const railsOpacity = useTransform(progress, [dossierTimeline.handoff.metamorphosis[0], dossierTimeline.handoff.metamorphosis[1]], [0, 1]);
  const railsY = useTransform(progress, dossierTimeline.handoff.metamorphosis, [28, 0]);
  const roomOpacity = useTransform(progress, [dossierTimeline.handoff.withdrawal[0], dossierTimeline.handoff.settle[0]], [0, 1]);
  const introOpacity = useTransform(progress, [dossierTimeline.handoff.emergence[0] + .008, dossierTimeline.handoff.settle[1]], [0, 1]);

  return <motion.div className="journey-handoff" style={{ opacity: roomOpacity }} aria-hidden="true">
    <div className="journey-handoff-core">
      <motion.div className="journey-capital-plate" style={{ opacity: plateOpacity, scaleY: plateScaleY, rotateX: plateRotateX, width: plateWidth }}><i /><i /></motion.div>
      <motion.picture className="journey-handoff-asset" style={{ opacity: assetOpacity, clipPath: assetClip, y: assetY, scale: assetScale }}>
        <source media="(max-width:1100px)" srcSet="/assets/revenue-architecture-v2/revenue-master-small.webp" />
        <img src="/assets/revenue-architecture-v2/revenue-master.webp" width="2304" height="1536" alt="" />
      </motion.picture>
    </div>
    <motion.div className="journey-handoff-copy" style={{ opacity: introOpacity }}>
      <p>05 — Revenue architecture</p>
      <h2>One asset.<br /><em>Four capital structures.</em></h2>
      <span>The development remains constant. What changes is how occupancy, income and ownership align with capital priorities.</span>
    </motion.div>
    <motion.div className="journey-handoff-rails" style={{ opacity: railsOpacity, y: railsY }}>{["Stability", "Anchor", "Diversification", "Exit"].map((label, index) => <span key={label}><b>0{index + 1}</b>{label}<i /></span>)}</motion.div>
  </motion.div>;
}


export function InvestmentDossierDesktop() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 900 : 120,
    damping: reducedMotion ? 90 : 31,
    mass: reducedMotion ? 0.01 : 0.3,
    restDelta: 0.0008,
  });

  useMotionValueEvent(progress, "change", (value) => {
    const next = value < chapterThresholds[0] ? 0 : value < chapterThresholds[1] ? 1 : value < chapterThresholds[2] ? 2 : 3;
    setActiveIndex((current) => current === next ? current : next);
  });


  const deskX = useTransform(pointerX, [-1, 1], [-5, 5]);
  const deskY = useTransform(pointerY, [-1, 1], [-3, 3]);
  const openingDuration = dossierTimeline.open[1] - dossierTimeline.open[0];
  const closingDuration = dossierTimeline.close[1] - dossierTimeline.close[0];
  const shellOpenEnd = dossierTimeline.open[0] + openingDuration * 0.36;
  const shellCloseStart = dossierTimeline.close[0] + closingDuration * 0.38;
  const folioX = useTransform(progress, [0, dossierTimeline.approach[1], dossierTimeline.open[0], shellOpenEnd, dossierTimeline.close[0], shellCloseStart, dossierTimeline.close[1], 1], ["-25%", "-25%", "-25%", "0%", "0%", "0%", "-25%", "-25%"]);
  const folioScaleX = useTransform(progress, [0, dossierTimeline.open[0], shellOpenEnd, shellCloseStart, 1], [1.03, 1.03, 1, 1, 1.03]);
  const folioScaleY = useTransform(progress, [0, dossierTimeline.entry[1], dossierTimeline.approach[1], dossierTimeline.open[0], shellOpenEnd, shellCloseStart, 1], [0.73, 0.73, 0.8, 0.8, 1, 1, 0.73]);
  const arrivalRotateX = useTransform(progress, [0, dossierTimeline.approach[1], dossierTimeline.open[1], dossierTimeline.close[0], 1], [7, 4.5, 0, 0, 7]);
  const arrivalRotateZ = useTransform(progress, [0, dossierTimeline.approach[1], dossierTimeline.open[1], dossierTimeline.close[0], 1], [-1, -0.65, 0, 0, -1]);
  const arrivalY = useTransform(progress, [0, dossierTimeline.approach[1], dossierTimeline.open[1], dossierTimeline.close[0], 1], [38, 20, 0, 0, 34]);
  const interiorClip = useTransform(progress, [0, dossierTimeline.open[0], shellOpenEnd, shellCloseStart, 1], ["inset(0 0 0 50%)", "inset(0 0 0 50%)", "inset(0 0 0 0%)", "inset(0 0 0 0%)", "inset(0 0 0 50%)"]);
  const interiorHiddenAt = shellCloseStart + closingDuration * 0.14;
  const interiorOpacity = useTransform(progress, [0, dossierTimeline.open[0], shellOpenEnd, shellCloseStart, interiorHiddenAt, 1], [0, 0, 1, 1, 0, 0]);
  const tabsOpacity = useTransform(progress, [dossierTimeline.open[1] - 0.006, dossierTimeline.open[1] + 0.012, dossierTimeline.close[0], dossierTimeline.close[0] + 0.018], [0, 1, 1, 0]);
  const shadowClip = useTransform(progress, [0, dossierTimeline.open[0], shellOpenEnd, shellCloseStart, interiorHiddenAt, 1], ["inset(0 0 0 50%)", "inset(0 0 0 50%)", "inset(0 0 0 0%)", "inset(0 0 0 0%)", "inset(0 0 0 50%)", "inset(0 0 0 50%)"]);
  const shadowOpacity = useTransform(progress, [0, dossierTimeline.open[1], dossierTimeline.close[0], 1], [0.86, 0.68, 0.68, 0.88]);
  // The closed physical dossier remains visible beneath the shared Revenue Architecture handoff.
  const deskOpacity = useTransform(progress, [0, dossierTimeline.handoff.withdrawal[0], dossierTimeline.handoff.metamorphosis[1], 1], [1, 1, .18, 0]);
  const folioOpacity = useTransform(progress, [0, dossierTimeline.handoff.close[1], dossierTimeline.handoff.metamorphosis[1], dossierTimeline.handoff.emergence[1]], [1, 1, .34, 0]);
  const closingOpacity = useTransform(progress, [dossierTimeline.handoff.finalHold[0] + .025, dossierTimeline.handoff.finalHold[1] - .008, dossierTimeline.handoff.withdrawal[0]], [0, 1, 0]);

  useEffect(() => {
    return () => {
      pointerX.set(0);
      pointerY.set(0);
    };
  }, [pointerX, pointerY]);

  useEffect(() => {
    const chapterMedia = [
      ["opportunitySite", "opportunityActivity", "opportunityDestination"],
      ["locationIndia", "locationMaharashtra", "locationEastPune"],
      ["ecosystemArrival", "ecosystemWork", "ecosystemDining", "ecosystemWellness"],
      ["valuePlan", "valueInfrastructure", "valueExperience"],
    ];
    const preload = (chapterIndex) => chapterMedia[chapterIndex]?.forEach((key) => { const image = new Image(); image.src = dossierMedia[key].src; });
    preload(activeIndex);
    preload(activeIndex + 1);
  }, [activeIndex]);

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section
      ref={sectionRef}
      id="investment-dossier"
      className="investment-dossier investment-dossier--desktop"
      onPointerMove={onPointerMove}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      aria-labelledby="investment-dossier-desktop-title"
      data-dossier-debug={import.meta.env.DEV && new URLSearchParams(window.location.search).has("dossierDebug") ? "true" : undefined}
    >
      <h2 id="investment-dossier-desktop-title" className="sr-only">Interactive Devyog investment dossier</h2>
      <div className="folio-stage">
        <motion.div className="folio-desk" style={{ x: deskX, y: deskY, opacity: deskOpacity }} aria-hidden="true" />
        <div className="folio-object-anchor">
          <motion.div
            className="folio-object"
            style={{
              opacity: folioOpacity,
              x: reducedMotion ? 0 : folioX,
              scaleX: reducedMotion ? 1 : folioScaleX,
              scaleY: reducedMotion ? 1 : folioScaleY,
              rotateX: reducedMotion ? 0 : arrivalRotateX,
              rotateZ: reducedMotion ? 0 : arrivalRotateZ,
              y: reducedMotion ? 0 : arrivalY,
            }}
          >
            <motion.div className="folio-contact-shadow" style={{ clipPath: shadowClip, opacity: shadowOpacity }} aria-hidden="true" />
            <div className="folio-book">
              <motion.div className="folio-interior" style={{ clipPath: interiorClip, opacity: interiorOpacity }}>
                <div className="folio-paper-stack" aria-hidden="true" />
                {dossierChapters.map((chapter, index) => (
                  <SpreadLayer key={chapter.id} chapter={chapter} index={index} progress={progress} activeIndex={activeIndex} />
                ))}
              </motion.div>
              {dossierTimeline.chapters.slice(0, 3).map((chapter, index) => (
                <PhysicalPageTurn key={chapter.turn[0]} progress={progress} index={index} reducedMotion={reducedMotion} />
              ))}
              <ModernCover progress={progress} reducedMotion={reducedMotion} />
              <FolioTabs activeIndex={activeIndex} opacity={tabsOpacity} />
            </div>
          </motion.div>
        </div>
        {dossierTimeline.chapters.map((chapter, index) => <ReadingHold key={chapter.hold[0]} progress={progress} index={index} />)}
        <DossierCapitalHandoff progress={progress} reducedMotion={reducedMotion} />
        <motion.p className="folio-closing-note" style={{ opacity: closingOpacity }}>
          Continue to the capital structure <ArrowDown size={13} />
        </motion.p>
      </div>
    </section>
  );
}
