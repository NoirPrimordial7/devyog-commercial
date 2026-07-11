"use client";

import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { RevenueArchitectureStage } from "./RevenueArchitectureStage";
import { revenueModels, revenueTimeline } from "./revenueArchitectureData";
import "./revenue-architecture.css";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function sceneFromProgress(progress) {
  if (progress < revenueTimeline.intro[1]) return "intro";
  const modelIndex = revenueTimeline.models.findIndex(({ story, hold, transition }) => progress >= story[0] && progress < transition[1]);
  if (modelIndex >= 0) return modelIndex;
  if (progress < revenueTimeline.exit[0]) return "comparison";
  return "exit";
}

export function InvestorModelsSection() {
  const sectionRef = useRef(null);
  const selectionLock = useRef(null);
  const reducedMotion = useReducedMotion();
  const [progressValue, setProgressValue] = useState(0);
  const [scene, setScene] = useState("intro");
  const [phase, setPhase] = useState("story");
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 800 : 135,
    damping: reducedMotion ? 90 : 32,
    mass: reducedMotion ? 0.01 : 0.28,
    restDelta: 0.001,
  });

  useMotionValueEvent(progress, "change", (value) => {
    const nextValue = clamp(value);
    setProgressValue(nextValue);
    if (selectionLock.current !== null) {
      if (Math.abs(nextValue - selectionLock.current) < 0.065) return;
      selectionLock.current = null;
    }
    const nextScene = sceneFromProgress(nextValue);
    setScene((current) => current === nextScene ? current : nextScene);
    if (typeof nextScene === "number") {
      const modelTimeline = revenueTimeline.models[nextScene];
      const nextPhase = nextValue < modelTimeline.hold[0] ? "story" : nextValue < modelTimeline.transition[0] ? "hold" : "transition";
      setPhase((current) => current === nextPhase ? current : nextPhase);
    }
  });

  const selectModel = (index) => {
    selectionLock.current = progress.get();
    setScene(index);
    setPhase("hold");
  };

  return (
    <section
      ref={sectionRef}
      id="investor-options"
      className="revenue-architecture"
      aria-labelledby="revenue-architecture-title"
    >
      <RevenueArchitectureStage
        progress={progressValue}
        scene={scene}
        phase={phase}
        models={revenueModels}
        onSelectModel={selectModel}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}
