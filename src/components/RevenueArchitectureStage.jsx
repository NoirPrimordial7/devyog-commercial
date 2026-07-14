"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { capitalProfile, revenueAssets } from "./revenueArchitectureData";

function RevenuePicture({ eager = false, decorative = false }) {
  return (
    <picture>
      <source media="(max-width: 1100px)" srcSet={revenueAssets.masterSmall} />
      <img
        src={revenueAssets.master}
        width="1536"
        height="1024"
        loading={eager ? "eager" : "lazy"}
        alt={decorative ? "" : "Devyog mixed-use commercial development architectural model"}
      />
    </picture>
  );
}

function SharedHandoff({ models }) {
  return (
    <div className="ra-handoff" aria-hidden="true">
      <div className="ra-handoff-platform"><i /><i /><b /></div>
      <div className="ra-detached-tabs">{models.map((model) => <span key={model.id}>{model.number}</span>)}</div>
    </div>
  );
}

function ArchitecturalOverlay({ model }) {
  if (!model) return <div className="ra-asset-overlay ra-asset-overlay--intro" aria-hidden="true"><i /><i /><i /></div>;
  if (model.id === "stability") {
    return <div className="ra-asset-overlay ra-asset-overlay--stability" aria-hidden="true"><span className="ra-occupancy-scan" /><svg viewBox="0 0 900 560" preserveAspectRatio="none"><motion.path d="M74 478 C205 470 340 480 470 470 S720 458 842 463" /></svg><b>Stable occupancy</b></div>;
  }
  if (model.id === "anchor") {
    return <div className="ra-asset-overlay ra-asset-overlay--anchor" aria-hidden="true"><span /><span /><b>Anchor established</b><i /></div>;
  }
  if (model.id === "blended") {
    return <div className="ra-asset-overlay ra-asset-overlay--blended" aria-hidden="true"><span className="ra-use-zone ra-use-zone--office">Office</span><span className="ra-use-zone ra-use-zone--flex">Flexible work</span><span className="ra-use-zone ra-use-zone--dining">Dining</span><span className="ra-use-zone ra-use-zone--wellness">Wellness</span><div className="ra-day-rail"><i />Morning <b>Midday</b> Evening</div></div>;
  }
  return <div className="ra-asset-overlay ra-asset-overlay--exit" aria-hidden="true"><span className="ra-glass-frame" /><div><b>Developer</b><i /><b>Institutional capital</b></div><em>Structured transfer</em></div>;
}

function BuildingStage({ model, scene, progress, reducedMotion, pointerX, pointerY }) {
  const opacity = useTransform(progress, [0, .065, .13, .86, .965, 1], [0, .16, 1, 1, .86, .48]);
  const scale = useTransform(progress, [0, .105, .19, .83, .955, 1], [.82, .92, 1, 1, .78, .64]);
  const scrollX = useTransform(progress, [0, .13, .83, .955, 1], [80, 18, 0, 140, 270]);
  const scrollY = useTransform(progress, [0, .13, .83, .955, 1], [50, 12, 0, 24, 72]);
  const x = useTransform([scrollX, pointerX], ([base, pointer]) => base + pointer);
  const y = useTransform([scrollY, pointerY], ([base, pointer]) => base + pointer);
  const state = model?.id || (scene === "comparison" ? "comparison" : scene);

  return (
    <div className="ra-building-anchor">
      <motion.div
        className="ra-building-stage"
        data-asset-state={state}
        style={reducedMotion ? undefined : { opacity, scale, x, y }}
      >
        <div className="ra-site-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="ra-building-image"><RevenuePicture eager /></div>
        <div className="ra-building-reflection" aria-hidden="true"><RevenuePicture decorative /></div>
        <div className="ra-contact-shadow" aria-hidden="true" />
        <ArchitecturalOverlay model={model} />
      </motion.div>
    </div>
  );
}

function IntroCopy() {
  return <div className="ra-intro-copy"><p>05 — Revenue architecture</p><h2 id="revenue-architecture-title">One destination.<br /><em>Four ways to structure value.</em></h2><span>The destination remains constant. What changes is how occupancy, income and ownership are structured.</span></div>;
}

function ModelCopy({ model }) {
  return <div className="ra-model-copy"><p>{model.number} — {model.label}</p><h3>{model.title.map((line) => <span key={line}>{line}</span>)}</h3><div className="ra-copy-rule" /><span>{model.description}</span><blockquote>{model.closing}</blockquote></div>;
}

function ModelProfile({ model }) {
  return (
    <aside className={`ra-profile-shell ${model ? "is-visible" : ""}`} aria-live="polite">
      <p>Structure profile</p>
      <AnimatePresence mode="wait" initial={false}>
        {model && <motion.div key={model.id} className="ra-profile-fields" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .34 }}>
          {model.profile.map(([label, value], index) => <motion.div key={label} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .07 }}><span>{label}</span><strong>{value}</strong></motion.div>)}
        </motion.div>}
      </AnimatePresence>
    </aside>
  );
}

function StructureRail({ models, activeIndex, onSeekModel }) {
  return <nav className="ra-selector" aria-label="Revenue structures">{models.map((model, index) => <button key={model.id} type="button" className={`${activeIndex === index ? "is-active" : ""} ${activeIndex > index ? "is-complete" : ""}`} onClick={() => onSeekModel(index, "story")} aria-current={activeIndex === index ? "step" : undefined}><span>{model.number}</span><strong>{model.selector}</strong><i /></button>)}</nav>;
}

function CapitalProfile({ selected, onChange }) {
  const move = (event, key, index) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    onChange(key, Math.max(0, Math.min(2, index + (event.key === "ArrowRight" ? 1 : -1))));
  };
  return <div className="ra-capital-profile"><h4>Capital profile</h4>{capitalProfile.map((rail) => <fieldset key={rail.key}><legend>{rail.label}</legend><div>{rail.values.map((value, index) => <button type="button" key={value} className={selected[rail.key] === index ? "is-selected" : ""} aria-pressed={selected[rail.key] === index} onClick={() => onChange(rail.key, index)} onKeyDown={(event) => move(event, rail.key, index)}>{value}</button>)}</div></fieldset>)}<p>Exploratory comparison only. Final structuring depends on project, commercial and professional review.</p></div>;
}

function ComparisonScene({ models, selectedLens, onLensChange, onSeekModel }) {
  const [profile, setProfile] = useState({ priority: 1, involvement: 1, horizon: 1 });
  const recommended = useMemo(() => {
    if (profile.horizon === 2) return 3;
    if (profile.priority === 0 && profile.involvement === 0) return 0;
    if (profile.priority === 2 || profile.involvement === 2) return 2;
    return 1;
  }, [profile]);
  useEffect(() => onLensChange(recommended), [recommended, onLensChange]);

  return <div className="ra-comparison"><div className="ra-comparison-copy"><p>Four structures. One asset.</p><h3>What should the asset<br />do for your capital?</h3><span>Change the capital profile or inspect a structure. The building stays constant; its operating lens changes.</span><CapitalProfile selected={profile} onChange={(key, value) => setProfile((current) => ({ ...current, [key]: value }))} /></div><div className="ra-comparison-lenses" role="list" aria-label="Structure lenses">{models.map((model, index) => <button type="button" role="listitem" key={model.id} className={selectedLens === index ? "is-active" : ""} onMouseEnter={() => onLensChange(index)} onFocus={() => onLensChange(index)} onClick={() => onSeekModel(index, "hold")}><span>{model.number}</span><strong>{model.label}</strong><small>{model.comparison}</small><i /></button>)}</div></div>;
}

function ClosingScene() {
  return <div className="ra-closing"><div><p>One asset. Endless potential.</p><h3>More than one<br />way forward.</h3><span>The appropriate structure depends on capital horizon, operating involvement and return objectives.</span><div><a href="mailto:info@devyogprojects.co.in?subject=Revenue%20architecture%20discussion">Discuss the right structure <ArrowRight /></a><a href="#investment-dossier">Return to the investment dossier</a></div></div><div className="ra-closing-elevation" aria-hidden="true"><i /><b /></div></div>;
}

export function RevenueArchitectureStage({ scene, phase, models, onSeekModel, reducedMotion, progress }) {
  const activeIndex = typeof scene === "number" ? scene : -1;
  const [comparisonLens, setComparisonLens] = useState(1);
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, { stiffness: 120, damping: 22, mass: .25 });
  const pointerY = useSpring(rawPointerY, { stiffness: 120, damping: 22, mass: .25 });
  const roomX = useTransform(pointerX, (value) => value * -.55);
  const roomY = useTransform(pointerY, (value) => value * -.55);
  const raf = useRef(0);
  const showRail = scene === "intro" || activeIndex >= 0;
  const visualIndex = scene === "comparison" ? comparisonLens : activeIndex;
  const visualModel = visualIndex >= 0 ? models[visualIndex] : null;

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    cancelAnimationFrame(raf.current);
    const { clientX, clientY, currentTarget } = event;
    raf.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      rawPointerX.set(((clientX - rect.left) / rect.width - .5) * 6);
      rawPointerY.set(((clientY - rect.top) / rect.height - .5) * 4);
    });
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return <div className="ra-stage" data-scene={typeof scene === "number" ? models[scene].id : scene} data-phase={phase} onPointerMove={onPointerMove} onPointerLeave={() => { rawPointerX.set(0); rawPointerY.set(0); }}>
    <motion.div className="ra-room" aria-hidden="true" style={reducedMotion ? undefined : { x: roomX, y: roomY }} />
    {scene === "handoff" && <SharedHandoff models={models} />}
    <BuildingStage model={visualModel} scene={scene} progress={progress} reducedMotion={reducedMotion} pointerX={pointerX} pointerY={pointerY} />
    <AnimatePresence mode="wait" initial={false}>
      {scene === "intro" && <motion.div key="intro" className="ra-copy-layer" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><IntroCopy /></motion.div>}
      {activeIndex >= 0 && <motion.div key={models[activeIndex].id} className="ra-copy-layer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: reducedMotion ? .01 : .44 }}><ModelCopy model={models[activeIndex]} /></motion.div>}
      {scene === "comparison" && <motion.div key="comparison" className="ra-copy-layer ra-copy-layer--interactive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ComparisonScene models={models} selectedLens={comparisonLens} onLensChange={setComparisonLens} onSeekModel={onSeekModel} /></motion.div>}
      {scene === "closing" && <motion.div key="closing" className="ra-copy-layer ra-copy-layer--interactive" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ClosingScene /></motion.div>}
    </AnimatePresence>
    <ModelProfile model={activeIndex >= 0 ? models[activeIndex] : null} />
    {showRail && <StructureRail models={models} activeIndex={activeIndex} onSeekModel={onSeekModel} />}
    {activeIndex >= 0 && phase === "hold" && <p className="ra-hold-hint">Continue to the next structure <ArrowDown /></p>}
  </div>;
}
