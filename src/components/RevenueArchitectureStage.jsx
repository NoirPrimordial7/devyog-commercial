"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

const floorZones = ["parking", "services", "wellness", "dining", "coworking", "office", "office", "office"];
const phaseLabels = ["Morning", "Midday", "Evening"];

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function DossierContinuation({ progress }) {
  const local = clamp(progress / 0.08);
  return (
    <div className="ra-continuation" style={{ "--handoff": local }} aria-hidden="true">
      <div className="ra-continuation-frame">
        <i /><i /><i /><i />
      </div>
      <div className="ra-continuation-tabs">
        {["01", "02", "03", "04"].map((number) => <b key={number}>{number}</b>)}
      </div>
      <p>Designed to stay desired.</p>
      <span>Four forces examined. Four structures emerge.</span>
    </div>
  );
}

function CapitalFlowLayer({ state, compact = false }) {
  return (
    <div className={`ra-capital-flow ra-capital-flow--${state} ${compact ? "is-compact" : ""}`} aria-hidden="true">
      <i className="route route--left" /><i className="route route--right" />
      <i className="route route--base" /><i className="route route--vertical" />
      <b className="flow-node flow-node--one" /><b className="flow-node flow-node--two" />
    </div>
  );
}

export function AssetModel({ state = "intro", image, compact = false }) {
  const isBlended = state === "blended";
  return (
    <div className={`ra-asset ra-asset--${state} ${compact ? "ra-asset--compact" : ""}`} aria-label={compact ? undefined : `Architectural asset configured for ${state}`} aria-hidden={compact || undefined}>
      <div className="ra-model-halo" />
      <AnimatePresence mode="sync">
        {image && (
          <motion.img
            key={image}
            src={image}
            alt=""
            className="ra-asset-image"
            initial={{ opacity: 0, scale: 1.018 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
      <CapitalFlowLayer state={state} compact={compact} />
      <div className="ra-site-grid"><i /><i /><i /><i /></div>
      <div className="ra-document-layers"><i /><i /><i /></div>
      <div className="ra-glass-frame"><span>Developer</span><span>Institutional capital</span></div>
      <div className="ra-building-shell">
        <div className="ra-roof"><i /><i /></div>
        <div className="ra-tower ra-tower--left">
          {floorZones.slice(0, 5).map((zone, index) => <Floor key={`${zone}-${index}`} zone={zone} index={index} />)}
        </div>
        <div className="ra-tower ra-tower--centre">
          {floorZones.map((zone, index) => <Floor key={`${zone}-${index}`} zone={zone} index={index} />)}
        </div>
        <div className="ra-tower ra-tower--right">
          {floorZones.slice(0, 6).map((zone, index) => <Floor key={`${zone}-${index}`} zone={zone} index={index} />)}
        </div>
        <div className="ra-anchor-block"><span>Anchor</span></div>
        <div className="ra-core"><i /><i /><i /></div>
      </div>
      {isBlended && <div className="ra-day-cycle">{phaseLabels.map((label) => <span key={label}>{label}</span>)}</div>}
      <div className="ra-transfer-seal"><i />Structured transfer</div>
      <div className="ra-elevation-line" />
    </div>
  );
}

function Floor({ zone, index }) {
  return (
    <div className={`ra-floor ra-floor--${zone}`} style={{ "--floor": index }}>
      <span /><span /><span /><span /><small>{zone}</small>
    </div>
  );
}

function RevenueArchitectureIntro() {
  return (
    <div className="ra-intro-copy">
      <p>05 — Revenue architecture</p>
      <h2 id="revenue-architecture-title">One destination.<br /><em>Four ways to structure value.</em></h2>
      <span>The asset remains constant. What changes is how occupancy, income and ownership are structured around different investment priorities.</span>
    </div>
  );
}

function ModelProfile({ model }) {
  return (
    <aside className="ra-profile" aria-label={`${model.label} profile`}>
      {model.profile.map(([label, value]) => (
        <div key={label}><span>{label}</span><strong>{value}</strong></div>
      ))}
    </aside>
  );
}

function RevenueModelCopy({ model }) {
  return (
    <div className="ra-model-copy">
      <p>{model.number} — {model.label}</p>
      <h3>{model.title.map((line) => <span key={line}>{line}</span>)}</h3>
      <div className="ra-copy-rule" />
      <span>{model.description}</span>
      <blockquote>{model.closing}</blockquote>
    </div>
  );
}

function RevenueModelSelector({ models, activeIndex, onSelect }) {
  return (
    <nav className="ra-selector" aria-label="Revenue architecture models">
      {models.map((model, index) => (
        <button
          key={model.id}
          type="button"
          data-model={model.id}
          onClick={() => onSelect(index)}
          className={activeIndex === index ? "is-active" : ""}
          aria-current={activeIndex === index ? "step" : undefined}
          aria-label={`View ${model.number} ${model.label} model`}
        >
          <span>{model.number}</span><strong>{model.selector}</strong><i /><b />
        </button>
      ))}
    </nav>
  );
}

const comparisonControls = [
  { key: "flexibility", label: "Priority", low: "Stability", high: "Flexibility" },
  { key: "involvement", label: "Involvement", low: "Passive", high: "Active" },
  { key: "horizon", label: "Horizon", low: "Hold", high: "Exit" },
];

function ComparisonScene({ models }) {
  const [controls, setControls] = useState({ flexibility: 38, involvement: 34, horizon: 38 });
  const recommendedIndex = useMemo(() => {
    let closest = 0;
    let distance = Infinity;
    models.forEach((model, index) => {
      const score = comparisonControls.reduce((total, control) => total + Math.abs(controls[control.key] - model.scores[control.key]), 0);
      if (score < distance) { distance = score; closest = index; }
    });
    return closest;
  }, [controls, models]);

  return (
    <div className="ra-comparison">
      <div className="ra-comparison-copy">
        <p>Four structures. One asset.</p>
        <h3>What should the asset<br /><em>do for your capital?</em></h3>
      </div>
      <div className="ra-miniatures" aria-live="polite">
        {models.map((model, index) => (
          <div key={model.id} className={recommendedIndex === index ? "is-prominent" : ""}>
            <AssetModel state={model.id} image={model.image} compact />
            <strong>{model.label}</strong><span>{model.comparison}</span>
          </div>
        ))}
      </div>
      <div className="ra-comparison-controls">
        {comparisonControls.map((control) => (
          <label key={control.key}>
            <span>{control.label}</span>
            <input
              type="range" min="0" max="100" value={controls[control.key]}
              onChange={(event) => setControls((current) => ({ ...current, [control.key]: Number(event.target.value) }))}
              aria-label={`${control.label}: ${control.low} to ${control.high}`}
            />
            <small><b>{control.low}</b><b>{control.high}</b></small>
          </label>
        ))}
      </div>
      <div className="ra-intent">
        <p>The appropriate structure depends on capital horizon, operating involvement and return objectives.</p>
        <a href="mailto:info@devyogprojects.co.in?subject=Tailored%20investment%20model%20request">Request a tailored investment model <ArrowRight aria-hidden="true" /></a>
      </div>
    </div>
  );
}

export function RevenueArchitectureStage({ progress, scene, phase, models, onSelectModel, reducedMotion }) {
  const activeIndex = typeof scene === "number" ? scene : -1;
  const visualState = activeIndex >= 0 ? models[activeIndex].id : scene === "exit" ? "exit" : "intro";
  const activeImage = activeIndex >= 0 ? models[activeIndex].image : scene === "exit" ? models[3].image : models[0].image;
  const introVisible = scene === "intro" && progress >= 0.095;
  const comparisonVisible = scene === "comparison";
  const exitVisible = scene === "exit";

  return (
    <div className="ra-stage" data-scene={comparisonVisible ? "comparison" : visualState} data-phase={activeIndex >= 0 ? phase : scene} style={{ "--ra-progress": progress }}>
      <div className="ra-stage-canvas">
        <div className="ra-environment" aria-hidden="true"><i /><i /><i /></div>
        {progress < 0.105 && <DossierContinuation progress={progress} />}
        <div className={`ra-main-model ${comparisonVisible ? "is-divided" : ""} ${exitVisible ? "is-exiting" : ""}`}>
          <AssetModel state={visualState} image={activeImage} />
          <div className="ra-orbit-labels" aria-hidden="true">
            {models.map((model, index) => <span key={model.id} className={activeIndex === index ? "is-active" : ""}>{model.selector}</span>)}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {introVisible && <motion.div key="intro" className="ra-copy-layer" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}><RevenueArchitectureIntro /></motion.div>}
          {activeIndex >= 0 && (
            <motion.div key={models[activeIndex].id} className="ra-copy-layer ra-copy-layer--model" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: reducedMotion ? 0.01 : 0.45 }}>
              <RevenueModelCopy model={models[activeIndex]} />
              <ModelProfile model={models[activeIndex]} />
            </motion.div>
          )}
          {comparisonVisible && <motion.div key="comparison" className="ra-copy-layer ra-copy-layer--comparison" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ComparisonScene models={models} /></motion.div>}
          {exitVisible && (
            <motion.div key="exit" className="ra-exit-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p>One asset.</p><h3>More than one way forward.</h3>
            </motion.div>
          )}
        </AnimatePresence>

        {!comparisonVisible && !exitVisible && <RevenueModelSelector models={models} activeIndex={activeIndex} onSelect={onSelectModel} />}
        {activeIndex >= 0 && phase === "hold" && <motion.p className="ra-hold-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Continue to next structure <i /></motion.p>}
        <div className="ra-stage-index" aria-hidden="true"><span>05</span><i /><b>{activeIndex >= 0 ? models[activeIndex].number : "00"}</b></div>
      </div>
    </div>
  );
}
