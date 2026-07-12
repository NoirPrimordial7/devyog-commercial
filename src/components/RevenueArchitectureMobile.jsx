"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { alignmentCopy, capitalProfile, revenueAssets } from "./revenueArchitectureData";

function MasterPicture() {
  return <picture><source media="(max-width:560px)" srcSet={revenueAssets.masterSmall} /><img src={revenueAssets.master} width="2304" height="1536" decoding="async" alt="Devyog mixed-use commercial development" /></picture>;
}

function SegmentedProfile({ onAlignment }) {
  const [values, setValues] = useState({ priority: 1, involvement: 1, horizon: 1 });
  const set = (key, index) => {
    const next = { ...values, [key]: Math.max(0, Math.min(2, index)) };
    setValues(next);
    onAlignment(next.horizon === 2 ? 3 : next.priority === 0 && next.involvement === 0 ? 0 : next.priority === 2 || next.involvement === 2 ? 2 : 1);
  };
  return <div className="ram-capital-profile"><h3>Capital profile</h3>{capitalProfile.map((rail) => <fieldset key={rail.key}><legend>{rail.label}</legend><div>{rail.values.map((value, index) => <button type="button" key={value} className={values[rail.key] === index ? "is-selected" : ""} aria-pressed={values[rail.key] === index} onClick={() => set(rail.key, index)} onKeyDown={(event) => { if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); set(rail.key, index + (event.key === "ArrowRight" ? 1 : -1)); } }}>{value}</button>)}</div></fieldset>)}<p>Exploratory comparison only. Final structuring depends on project, commercial and professional review.</p></div>;
}

export function RevenueArchitectureMobile({ models }) {
  const [selected, setSelected] = useState(1);
  const active = useMemo(() => models[selected], [models, selected]);
  return <section id="investor-options" className="revenue-architecture-mobile" aria-labelledby="revenue-architecture-mobile-title">
    <header className="ram-intro"><p>05 — Revenue architecture</p><h2 id="revenue-architecture-mobile-title">One asset.<br /><em>Four capital structures.</em></h2><span>The development remains constant. What changes is how occupancy, income and ownership align with capital priorities.</span><MasterPicture /><a href="#ram-stability">Begin with stability <ArrowDown /></a></header>
    {models.map((model, index) => <article className="ram-model" id={`ram-${model.id}`} key={model.id}><div className="ram-copy"><p>{model.number} — {model.label}</p><h3>{model.title.map((line) => <span key={line}>{line}</span>)}</h3><span>{model.description}</span></div><MasterPicture /><dl>{model.profile.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><blockquote>{model.closing}</blockquote>{index < models.length - 1 && <a href={`#ram-${models[index + 1].id}`}>Continue to {models[index + 1].selector} <ArrowDown /></a>}</article>)}
    <section className="ram-comparison"><p>Four structures. One asset.</p><h2>What should the asset do for your capital?</h2><span>Explore how each structure aligns occupancy, involvement and horizon.</span><div className={`ram-current-asset ram-current-asset--${active.id}`}><MasterPicture /></div><div className="ram-structure-tabs" aria-label="Compare structures">{models.map((model, index) => <button type="button" key={model.id} className={selected === index ? "is-active" : ""} onClick={() => setSelected(index)}>{model.number} {model.selector}</button>)}</div><div className="ram-alignment" aria-live="polite"><span>Visual alignment</span><strong>{active.label}</strong><p>{alignmentCopy[selected]}</p></div><SegmentedProfile onAlignment={setSelected} /></section>
    <footer className="ram-closing"><MasterPicture /><p>One asset.</p><h2>More than one way forward.</h2><span>Structure the opportunity around your capital horizon and operating priorities.</span><a href="mailto:info@devyogprojects.co.in?subject=Revenue%20architecture%20discussion">Discuss the right structure <ArrowRight /></a></footer>
  </section>;
}
