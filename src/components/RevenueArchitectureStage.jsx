"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { capitalProfile, revenueAssets } from "./revenueArchitectureData";

function RevenuePicture({ model, master = false, eager = false }) {
  const src = master ? revenueAssets.master : model.image;
  const small = master ? revenueAssets.masterSmall : model.imageSmall;
  return <picture><source media="(max-width: 1100px)" srcSet={small} /><img src={src} width="1536" height="1024" loading={eager ? "eager" : "lazy"} alt="" /></picture>;
}

function SharedHandoff({ models }) {
  return <div className="ra-handoff" aria-hidden="true"><div className="ra-handoff-platform"><i /><i /></div><div className="ra-detached-tabs">{models.map((model) => <span key={model.id}>{model.number}</span>)}</div></div>;
}

function BuildingStage({ models, activeIndex, scene }) {
  const isModel = activeIndex >= 0;
  const masterOnly = scene === "handoff" || scene === "intro" || scene === "closing";
  return <div className={`ra-building-stage ra-building-stage--${isModel ? models[activeIndex].id : scene}`}>
    <div className="ra-grid" aria-hidden="true" />
    <div className="ra-master-image"><RevenuePicture model={models[0]} master eager /></div>
    {models.map((model, index) => <div key={model.id} className={`ra-state-image ${isModel && activeIndex === index && !masterOnly ? "is-active" : ""}`}><RevenuePicture model={model} /></div>)}
    <div className="ra-ground-reflection" aria-hidden="true" />
    {isModel && <ModelProof model={models[activeIndex]} />}
  </div>;
}

function ModelProof({ model }) {
  if (model.id === "stability") return <div className="ra-proof ra-proof--stability" aria-hidden="true"><i /><span>Stable occupancy</span></div>;
  if (model.id === "anchor") return <div className="ra-proof ra-proof--anchor" aria-hidden="true"><i /><b>Anchor</b></div>;
  if (model.id === "blended") return <div className="ra-proof ra-proof--blended" aria-hidden="true"><div><i />Office</div><div><i />Flexible work</div><div><i />Dining</div><div><i />Wellness</div><span>Morning <b>Midday</b> Evening</span></div>;
  return <div className="ra-proof ra-proof--exit" aria-hidden="true"><div><span>Developer</span><i /><span>Institutional capital</span></div><b>Structured transfer</b></div>;
}

function IntroCopy() {
  return <div className="ra-intro-copy"><p>05 — Revenue architecture</p><h2 id="revenue-architecture-title">One asset.<br /><em>Four ways to configure value.</em></h2><span>The destination remains constant. What changes is how occupancy, income and ownership are structured.</span></div>;
}

function ModelCopy({ model }) {
  return <div className="ra-model-copy"><p>{model.number} — {model.label}</p><h3>{model.title.map((line) => <span key={line}>{line}</span>)}</h3><div className="ra-copy-rule" /><span>{model.description}</span><blockquote>{model.closing}</blockquote></div>;
}

function ModelProfile({ model }) {
  return <aside className="ra-profile" aria-label={`${model.label} profile`}>{model.profile.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</aside>;
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

function ComparisonScene({ models, onSeekModel }) {
  const [profile, setProfile] = useState({ priority: 1, involvement: 1, horizon: 1 });
  const prominent = useMemo(() => {
    if (profile.horizon === 2) return [3];
    if (profile.priority === 0 && profile.involvement === 0) return [0, 1];
    if (profile.priority === 2 || profile.involvement === 2) return [2];
    return [1, 2];
  }, [profile]);
  return <div className="ra-comparison"><div className="ra-comparison-copy"><p>Four structures. One asset.</p><h3>What should the asset<br />do for your capital?</h3><span>Explore how different structures prioritise stability, involvement, flexibility and exit.</span><CapitalProfile selected={profile} onChange={(key, value) => setProfile((current) => ({ ...current, [key]: value }))} /></div><div className="ra-comparison-plates">{models.map((model, index) => <button type="button" key={model.id} className={prominent.includes(index) ? "is-prominent" : ""} onClick={() => onSeekModel(index, "hold")} aria-label={`Return to ${model.label} hold`}><RevenuePicture model={model} /><span><strong>{model.label}</strong><small>{model.comparison}</small></span></button>)}</div></div>;
}

function ClosingScene({ models }) {
  return <div className="ra-closing"><div><p>One asset. Four possible structures.</p><h3>Shape the structure<br />around your capital.</h3><span>The appropriate approach depends on investment horizon, operating involvement and commercial objectives.</span><div><a href="mailto:info@devyogprojects.co.in?subject=Revenue%20architecture%20discussion">Discuss the right structure <ArrowRight /></a><a href="#investment-dossier">Return to the investment dossier</a></div></div><div className="ra-closing-asset"><RevenuePicture model={models[0]} master /></div></div>;
}

export function RevenueArchitectureStage({ scene, phase, models, onSeekModel, reducedMotion }) {
  const activeIndex = typeof scene === "number" ? scene : -1;
  const showRail = scene === "intro" || activeIndex >= 0;
  return <div className="ra-stage" data-scene={typeof scene === "number" ? models[scene].id : scene} data-phase={phase}>
    <div className="ra-room" aria-hidden="true" />
    {scene === "handoff" && <SharedHandoff models={models} />}
    {scene !== "comparison" && <BuildingStage models={models} activeIndex={activeIndex} scene={scene} />}
    <AnimatePresence mode="wait">
      {scene === "intro" && <motion.div key="intro" className="ra-copy-layer" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><IntroCopy /></motion.div>}
      {activeIndex >= 0 && <motion.div key={models[activeIndex].id} className="ra-copy-layer" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reducedMotion ? 0.01 : 0.45 }}><ModelCopy model={models[activeIndex]} /><ModelProfile model={models[activeIndex]} /></motion.div>}
      {scene === "comparison" && <motion.div key="comparison" className="ra-copy-layer ra-copy-layer--comparison" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ComparisonScene models={models} onSeekModel={onSeekModel} /></motion.div>}
      {scene === "closing" && <motion.div key="closing" className="ra-copy-layer ra-copy-layer--closing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ClosingScene models={models} /></motion.div>}
    </AnimatePresence>
    {showRail && <StructureRail models={models} activeIndex={activeIndex} onSeekModel={onSeekModel} />}
    {activeIndex >= 0 && phase === "hold" && <p className="ra-hold-hint">Continue to the next structure <ArrowDown /></p>}
  </div>;
}
