"use client";

import { motion, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { alignmentCopy, capitalProfile, revenueAssets } from "./revenueArchitectureData";

function MasterAsset({ eager = false, className = "" }) {
  return <picture className={className}><source media="(max-width:1100px)" srcSet={revenueAssets.masterSmall} /><img src={revenueAssets.master} width="2304" height="1536" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" alt="Devyog mixed-use commercial development" /></picture>;
}

function StructureProof({ state, storyProgress, releaseProgress, transitionProgress, sourceIndex }) {
  const proofOpacity = useTransform(() => Math.max(0, Math.min(1, storyProgress.get() * 1.8)) * (1 - releaseProgress.get() * .55));
  const lineLength = useTransform(() => Math.max(0, Math.min(1, storyProgress.get() * 1.6)) * (sourceIndex === 0 ? 1 - transitionProgress.get() * .58 : 1));
  const anchorOpacity = useTransform(() => state === "anchor" ? Math.max(0, Math.min(.24, (storyProgress.get() - .12) * .5)) : 0);
  const bandOpacity = useTransform(() => state === "blended" ? Math.max(0, Math.min(.22, (storyProgress.get() - .08) * .42)) : 0);
  const frameLength = useTransform(() => state === "exit" ? Math.max(0, Math.min(1, storyProgress.get() * 1.35)) : 0);
  const routeLength = useTransform(() => sourceIndex === 1 ? transitionProgress.get() : 0);
  const convergence = useTransform(() => sourceIndex === 2 ? transitionProgress.get() : 0);
  const labelOpacity = useTransform(() => state === "blended" ? Math.max(0, Math.min(1, (storyProgress.get() - .55) * 3)) : 0);
  const exitDetailOpacity = useTransform(() => state === "exit" ? Math.max(0, Math.min(1, (storyProgress.get() - .62) * 2.8)) : 0);

  return <motion.svg className={`ra-proof-svg ra-proof-svg--${state}`} viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid meet" style={{ opacity: proofOpacity }} aria-hidden="true">
    <motion.path className="ra-lease-line" d="M130 574 H870" pathLength="1" style={{ pathLength: lineLength }} />
    <motion.path className="ra-anchor-zone" d="M145 480 L330 452 L330 410 L650 410 L650 448 L875 482 L875 565 L145 565 Z" style={{ opacity: anchorOpacity }} />
    <motion.g className="ra-use-bands" style={{ opacity: bandOpacity }}>
      <rect x="245" y="205" width="510" height="48" /><rect x="220" y="304" width="560" height="50" /><rect x="170" y="455" width="660" height="56" /><rect x="330" y="135" width="340" height="38" />
    </motion.g>
    <motion.g className="ra-use-labels" style={{ opacity: labelOpacity }}><text x="270" y="238">OFFICES</text><text x="535" y="337">CO-WORKING</text><text x="610" y="491">FOOD &amp; BEVERAGE</text></motion.g>
    <motion.g className="ra-operating-routes" style={{ opacity: routeLength }}>
      <path d="M500 520 L390 402 L340 282" /><path d="M500 520 L500 350 L500 184" /><path d="M500 520 L620 402 L690 270" /><path d="M500 520 L735 475" />
    </motion.g>
    <motion.g className="ra-convergence-routes" style={{ opacity: convergence }}><path d="M250 260 L500 520"/><path d="M500 190 L500 520"/><path d="M750 280 L500 520"/></motion.g>
    <motion.rect className="ra-exit-frame" x="122" y="72" width="756" height="500" rx="3" pathLength="1" style={{ pathLength: frameLength }} />
    <motion.g className="ra-exit-details" style={{ opacity: exitDetailOpacity }}><path d="M122 106 h28 M122 106 v28 M878 106 h-28 M878 106 v28 M122 572 h28 M122 572 v-28 M878 572 h-28 M878 572 v-28"/><path d="M210 600 H790"/><circle cx="210" cy="600" r="4"/><circle cx="790" cy="600" r="4"/><text x="210" y="622">DEVELOPER</text><text x="700" y="622">INSTITUTIONAL CAPITAL</text></motion.g>
  </motion.svg>;
}

function DayRail({ visible }) {
  return <motion.div className="ra-day-rail" style={{ opacity: visible }}><span>Morning</span><span>Midday</span><span>Evening</span><i /></motion.div>;
}

function ProfileItem({ label, value, index, count, storyProgress, releaseProgress }) {
  const revealStart = .28 + index * (.5 / Math.max(1, count - 1));
  const exitStart = (count - 1 - index) * (.62 / Math.max(1, count - 1));
  const opacity = useTransform(() => {
    const reveal = Math.max(0, Math.min(1, (storyProgress.get() - revealStart) / .14));
    const leaving = 1 - Math.max(0, Math.min(1, (releaseProgress.get() - exitStart) / .18));
    return reveal * leaving;
  });
  const y = useTransform(() => 12 * (1 - opacity.get()));
  return <motion.div style={{ opacity, y }}><span>{label}</span><strong>{value}</strong></motion.div>;
}

function PersistentProfile({ model, storyProgress, releaseProgress }) {
  const connector = useTransform(() => Math.max(0, Math.min(1, storyProgress.get() * 1.5)) * (1 - releaseProgress.get()));
  const statusOpacity = useTransform(storyProgress, [.78, .94], [0, 1], { clamp: true });
  return <aside className="ra-profile" aria-label={`${model.label} profile`}><motion.i className="ra-profile-connector" style={{ scaleX: connector }} />{model.profile.map(([label, value], index) => <ProfileItem key={label} label={label} value={value} index={index} count={model.profile.length} storyProgress={storyProgress} releaseProgress={releaseProgress} />)}{model.id === "exit" && <motion.div className="ra-asset-status" style={{ opacity: statusOpacity }}><span>Asset status</span><strong><Check /> Institutional</strong><em>Exit ready</em></motion.div>}</aside>;
}

function StructureRail({ models, activeIndex, onSeekModel, visible = 1 }) {
  return <motion.nav className="ra-selector" aria-label="Revenue structures" style={{ opacity: visible }}>{models.map((model, index) => <button key={model.id} type="button" className={`${activeIndex === index ? "is-active" : ""} ${activeIndex > index ? "is-complete" : ""}`} onClick={() => onSeekModel(index, "story")} aria-current={activeIndex === index ? "step" : undefined}><span>{model.number}</span><strong>{model.selector}</strong><i /></button>)}</motion.nav>;
}

function ModelEditorial({ model, storyProgress, releaseProgress }) {
  const markerOpacity = useTransform(storyProgress, [0, .18], [0, 1], { clamp: true });
  const markerX = useTransform(storyProgress, [0, .18], [-12, 0], { clamp: true });
  const headingY = useTransform(storyProgress, [.05, .43], ["105%", "0%"], { clamp: true });
  const bodyOpacity = useTransform(storyProgress, [.28, .58], [0, 1], { clamp: true });
  const closingOpacity = useTransform(storyProgress, [.7, .94], [0, 1], { clamp: true });
  const shellOpacity = useTransform(() => (1 - releaseProgress.get()) * Math.max(.001, storyProgress.get()));
  return <motion.div className="ra-model-copy" style={{ opacity: shellOpacity }}><motion.p style={{ opacity: markerOpacity, x: markerX }}>{model.number} — {model.label}</motion.p><h3>{model.title.map((line) => <span className="ra-line-mask" key={line}><motion.b style={{ y: headingY }}>{line}</motion.b></span>)}</h3><motion.div className="ra-copy-rule" style={{ scaleX: bodyOpacity }} /><motion.span style={{ opacity: bodyOpacity }}>{model.description}</motion.span><motion.blockquote style={{ opacity: closingOpacity }}>{model.closing}</motion.blockquote></motion.div>;
}

function CapitalProfile({ selected, onChange }) {
  const move = (event, key, index) => { if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return; event.preventDefault(); onChange(key, Math.max(0, Math.min(2, index + (event.key === "ArrowRight" ? 1 : -1)))); };
  return <div className="ra-capital-profile"><h4>Capital profile</h4>{capitalProfile.map((rail) => <fieldset key={rail.key}><legend>{rail.label}</legend><div>{rail.values.map((value, index) => <button type="button" key={value} className={selected[rail.key] === index ? "is-selected" : ""} aria-pressed={selected[rail.key] === index} onClick={() => onChange(rail.key, index)} onKeyDown={(event) => move(event, rail.key, index)}>{value}<i /></button>)}</div></fieldset>)}<p>Exploratory comparison only. Final structuring depends on project, commercial and professional review.</p></div>;
}

function ComparisonScene({ models, entryProgress }) {
  const [profile, setProfile] = useState({ priority: 1, involvement: 1, horizon: 1 });
  const recommended = useMemo(() => profile.horizon === 2 ? 3 : profile.priority === 0 && profile.involvement === 0 ? 0 : profile.priority === 2 || profile.involvement === 2 ? 2 : 1, [profile]);
  const [selected, setSelected] = useState(recommended);
  const active = selected ?? recommended;
  const copyOpacity = useTransform(entryProgress, [.25, .72], [0, 1], { clamp: true });
  const assetScale = useTransform(entryProgress, [0, 1], [.92, 1], { clamp: true });
  const updateProfile = (key, value) => { const next = { ...profile, [key]: value }; setProfile(next); setSelected(null); };
  const resolved = selected ?? (profile.horizon === 2 ? 3 : profile.priority === 0 && profile.involvement === 0 ? 0 : profile.priority === 2 || profile.involvement === 2 ? 2 : 1);
  return <div className="ra-comparison"><motion.div className="ra-comparison-copy" style={{ opacity: copyOpacity }}><p>Four structures. One asset.</p><h3>What should the asset<br />do for your capital?</h3><CapitalProfile selected={profile} onChange={updateProfile} /><div className="ra-alignment" aria-live="polite"><span>Visual alignment</span><strong>{models[resolved].label}</strong><p>{alignmentCopy[resolved]}</p></div></motion.div><motion.div className={`ra-comparison-asset ra-comparison-asset--${models[active].id}`} style={{ scale: assetScale }}><MasterAsset /><StructureProof state={models[active].id} sourceIndex={active} storyProgress={{ get: () => 1 }} releaseProgress={{ get: () => 0 }} transitionProgress={{ get: () => 0 }} /><div className="ra-lenses">{models.map((model, index) => <button type="button" key={model.id} className={active === index ? "is-active" : ""} onClick={() => setSelected(index)}><span>{model.number}</span>{model.selector}<i /></button>)}</div></motion.div></div>;
}

function ClosingScene({ closingProgress, exitProgress }) {
  const copyOpacity = useTransform(closingProgress, [.28, .72], [0, 1], { clamp: true });
  const assetScale = useTransform(() => .78 - exitProgress.get() * .16);
  const assetY = useTransform(() => closingProgress.get() * 20 + exitProgress.get() * 70);
  const lineScale = useTransform(() => Math.max(closingProgress.get(), exitProgress.get()));
  const railOpacity = useTransform(closingProgress, [.55, .9], [0, 1], { clamp: true });
  return <div className="ra-closing"><motion.div className="ra-closing-copy" style={{ opacity: copyOpacity }}><p>One asset. Endless potential.</p><h3>More than<br />one way<br />forward.</h3><span>Structure the opportunity around your capital horizon and operating priorities.</span><div className="ra-closing-actions"><a href="mailto:info@devyogprojects.co.in?subject=Revenue%20architecture%20discussion">Discuss the right structure <ArrowRight /></a><a className="is-secondary" href="#investment-dossier">Request dossier <ArrowUpRight /></a></div></motion.div><motion.div className="ra-closing-asset" style={{ scale: assetScale, y: assetY }}><i className="ra-closing-arc" aria-hidden="true" /><MasterAsset /></motion.div><motion.i className="ra-horizon-line" style={{ scaleX: lineScale }} /><motion.div className="ra-final-rail" style={{ opacity: railOpacity }}>{[["Architecture","Purpose-led design"],["Place","Connected advantage"],["Demand","Enduring relevance"],["Relevance","Built for what comes next"]].map(([label,value])=><span key={label}><b>{label}</b>{value}</span>)}</motion.div></div>;
}

export function RevenueArchitectureStage({ scene, phase, activeIndex, sourceIndex, models, onSeekModel, reducedMotion, introProgress, storyProgress, settleProgress, holdProgress, releaseProgress, transitionProgress, comparisonEntryProgress, comparisonProgress, closingProgress, sectionExitProgress }) {
  const model = models[Math.max(0, activeIndex)];
  const assetScale = useTransform(() => scene === "intro" ? 1 : 1 - releaseProgress.get() * .018 + (sourceIndex === 1 ? transitionProgress.get() * -.025 : 0));
  const assetY = useTransform(() => scene === "intro" ? 0 : sourceIndex === 0 ? transitionProgress.get() * 13 : sourceIndex === 1 ? transitionProgress.get() * -5 : sourceIndex === 2 ? transitionProgress.get() * 4 : 0);
  const introCopyOpacity = useTransform(introProgress, [0, 1], [1, 1]);
  const railOpacity = useTransform(introProgress, [0, 1], [1, 1]);
  const dayVisible = useTransform(() => activeIndex === 2 ? Math.max(storyProgress.get() - .35, 0) * 1.54 : 0);
  const holdHintOpacity = useTransform(holdProgress, [.68, .9, 1], [0, 1, 1], { clamp: true });

  return <div className="ra-stage" data-scene={scene} data-phase={phase} data-model={activeIndex >= 0 ? model.id : undefined}>
    <div className="ra-room" aria-hidden="true" /><div className="ra-grid" aria-hidden="true" />
    {(scene === "intro" || scene === "model") && <motion.div className="ra-building-stage" style={{ scale: assetScale, y: assetY }}><MasterAsset eager /><div className="ra-ground-reflection" /><StructureProof state={model.id} sourceIndex={sourceIndex} storyProgress={storyProgress} releaseProgress={releaseProgress} transitionProgress={transitionProgress} /><DayRail visible={dayVisible} /></motion.div>}
    {scene === "intro" && <motion.div className="ra-intro-copy" style={{ opacity: introCopyOpacity }}><p>05 — Revenue architecture</p><h2 id="revenue-architecture-title">One asset.<br /><em>Four capital structures.</em></h2><span>The development remains constant. What changes is how occupancy, income and ownership align with capital priorities.</span></motion.div>}
    {scene === "model" && <><ModelEditorial model={model} storyProgress={storyProgress} releaseProgress={releaseProgress} /><PersistentProfile model={model} storyProgress={storyProgress} releaseProgress={releaseProgress} /></>}
    {scene === "comparison" && <ComparisonScene models={models} entryProgress={comparisonEntryProgress} />}
    {scene === "closing" && <ClosingScene closingProgress={closingProgress} exitProgress={sectionExitProgress} />}
    {(scene === "intro" || scene === "model") && <StructureRail models={models} activeIndex={activeIndex} onSeekModel={onSeekModel} visible={railOpacity} />}
    {scene === "model" && phase === "hold" && <motion.p className="ra-hold-hint" style={{ opacity: holdHintOpacity }}>Continue to {activeIndex < 3 ? models[activeIndex + 1].selector : "compare structures"} <ArrowDown /></motion.p>}
  </div>;
}
