"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { RevenueArchitectureMobile } from "./RevenueArchitectureMobile";
import { RevenueArchitectureStage } from "./RevenueArchitectureStage";
import { revenueModels, revenueTimeline } from "./revenueArchitectureData";
import "./revenue-architecture.css";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function getScene(progress) {
  if (progress < revenueTimeline.handoff[1]) return { scene: "handoff", phase: progress < 0.035 ? "story" : progress < 0.075 ? "hold" : "transition" };
  if (progress < revenueTimeline.intro[1]) return { scene: "intro", phase: "hold" };
  for (let index = 0; index < revenueTimeline.models.length; index += 1) {
    const range = revenueTimeline.models[index];
    if (progress < range.story[1]) return { scene: index, phase: "story" };
    if (progress < range.hold[1]) return { scene: index, phase: "hold" };
    if (progress < range.transition[1]) {
      const local = (progress - range.transition[0]) / (range.transition[1] - range.transition[0]);
      return { scene: local > 0.66 && index < 3 ? index + 1 : index, phase: "transition" };
    }
  }
  if (progress < revenueTimeline.comparison[1]) return { scene: "comparison", phase: "hold" };
  return { scene: "closing", phase: "hold" };
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
  const [view, setView] = useState({ scene: "handoff", phase: "transition" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = getScene(clamp(value));
    sectionRef.current?.style.setProperty("--ra-progress", String(value));
    setView((current) => current.scene === next.scene && current.phase === next.phase ? current : next);
  });

  useEffect(() => {
    ["/assets/revenue-architecture/revenue-master.webp"].forEach((src) => {
      const image = new Image(); image.src = src;
    });
  }, []);

  const seek = (index, destination = "story") => {
    const section = sectionRef.current;
    if (!section) return;
    const range = revenueTimeline.models[index][destination];
    const progress = destination === "hold" ? range[0] + 0.006 : range[0];
    const top = window.scrollY + section.getBoundingClientRect().top;
    const distance = section.scrollHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * progress, behavior: reducedMotion ? "auto" : "smooth" });
  };

  if (mobile) return <RevenueArchitectureMobile models={revenueModels} />;

  return (
    <section ref={sectionRef} id="investor-options" className="revenue-architecture" aria-labelledby="revenue-architecture-title">
      <RevenueArchitectureStage scene={view.scene} phase={view.phase} models={revenueModels} onSeekModel={seek} reducedMotion={reducedMotion} progress={scrollYProgress} />
    </section>
  );
}
