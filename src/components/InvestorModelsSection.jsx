"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { RevenueArchitectureMobile } from "./RevenueArchitectureMobile";
import { RevenueArchitectureStage } from "./RevenueArchitectureStage";
import { revenueModels, revenueTimeline } from "./revenueArchitectureData";
import "./revenue-architecture.css";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const local = (value, range) => clamp((value - range[0]) / (range[1] - range[0]));

function getView(progress) {
  if (progress < revenueTimeline.intro[1]) return { scene: "intro", phase: "story", model: -1, source: -1 };
  for (let index = 0; index < revenueTimeline.models.length; index += 1) {
    const range = revenueTimeline.models[index];
    if (progress < range.story[1]) return { scene: "model", phase: "story", model: index, source: index };
    if (progress < range.settle[1]) return { scene: "model", phase: "settle", model: index, source: index };
    if (progress < range.hold[1]) return { scene: "model", phase: "hold", model: index, source: index };
    if (progress < range.release[1]) return { scene: "model", phase: "release", model: index, source: index };
    if (progress < range.transition[1]) {
      const transition = local(progress, range.transition);
      return { scene: "model", phase: "transition", model: transition >= .7 && index < 3 ? index + 1 : index, source: index };
    }
  }
  if (progress < revenueTimeline.comparison[1]) return { scene: "comparison", phase: progress < revenueTimeline.comparisonEntry[1] ? "entry" : "hold", model: 3, source: 3 };
  return { scene: "closing", phase: progress < revenueTimeline.sectionExit[0] ? "story" : "exit", model: -1, source: -1 };
}

function useMobileRevenue() {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = (event) => setMobile(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return mobile;
}

export function InvestorModelsSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const mobile = useMobileRevenue();
  const [view, setView] = useState({ scene: "intro", phase: "story", model: -1, source: -1 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: reducedMotion ? 900 : 170, damping: reducedMotion ? 100 : 36, mass: reducedMotion ? .01 : .22, restDelta: .0005 });
  const progressModel = view.phase === "transition" ? view.source : view.model;
  const range = progressModel >= 0 ? revenueTimeline.models[progressModel] : revenueTimeline.models[0];
  const storyProgress = useTransform(progress, (value) => progressModel >= 0 ? local(value, range.story) : 0);
  const settleProgress = useTransform(progress, (value) => progressModel >= 0 ? local(value, range.settle) : 0);
  const holdProgress = useTransform(progress, (value) => progressModel >= 0 ? local(value, range.hold) : 0);
  const releaseProgress = useTransform(progress, (value) => progressModel >= 0 ? local(value, range.release) : 0);
  const transitionProgress = useTransform(progress, (value) => progressModel >= 0 ? local(value, range.transition) : 0);
  const introProgress = useTransform(progress, (value) => local(value, revenueTimeline.intro));
  const comparisonEntryProgress = useTransform(progress, (value) => local(value, revenueTimeline.comparisonEntry));
  const comparisonProgress = useTransform(progress, (value) => local(value, revenueTimeline.comparison));
  const closingProgress = useTransform(progress, (value) => local(value, revenueTimeline.closing));
  const sectionExitProgress = useTransform(progress, (value) => local(value, revenueTimeline.sectionExit));

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = getView(clamp(value));
    setView((current) => current.scene === next.scene && current.phase === next.phase && current.model === next.model && current.source === next.source ? current : next);
  });

  useEffect(() => {
    const image = new Image(); image.src = "/assets/revenue-architecture-v2/revenue-master.webp";
  }, []);

  const seek = (index, destination = "story") => {
    const section = sectionRef.current;
    if (!section) return;
    const target = revenueTimeline.models[index][destination][0] + (destination === "hold" ? .004 : 0);
    const top = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({ top: top + (section.scrollHeight - window.innerHeight) * target, behavior: reducedMotion ? "auto" : "smooth" });
  };

  if (mobile) return <RevenueArchitectureMobile models={revenueModels} />;

  return <section ref={sectionRef} id="investor-options" className="revenue-architecture" aria-labelledby="revenue-architecture-title">
    <RevenueArchitectureStage
      scene={view.scene} phase={view.phase} activeIndex={view.model} sourceIndex={view.source} models={revenueModels} onSeekModel={seek} reducedMotion={reducedMotion}
      globalProgress={progress} introProgress={introProgress} storyProgress={storyProgress} settleProgress={settleProgress}
      holdProgress={holdProgress} releaseProgress={releaseProgress} transitionProgress={transitionProgress}
      comparisonEntryProgress={comparisonEntryProgress} comparisonProgress={comparisonProgress}
      closingProgress={closingProgress} sectionExitProgress={sectionExitProgress}
    />
  </section>;
}
