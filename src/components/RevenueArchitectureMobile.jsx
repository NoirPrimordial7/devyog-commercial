"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { capitalProfile, revenueAssets } from "./revenueArchitectureData";

function RevenuePicture({ decorative = false }) {
  return <picture><source media="(max-width: 560px)" srcSet={revenueAssets.masterSmall} /><img src={revenueAssets.master} width="1536" height="1024" alt={decorative ? "" : "Devyog mixed-use commercial development architectural model"} /></picture>;
}

function SegmentedProfile() {
  const [values, setValues] = useState({ priority: 1, involvement: 1, horizon: 1 });
  const set = (key, index) => setValues((current) => ({ ...current, [key]: Math.max(0, Math.min(2, index)) }));
  return <div className="ram-capital-profile"><h3>Capital profile</h3>{capitalProfile.map((rail) => <fieldset key={rail.key}><legend>{rail.label}</legend><div>{rail.values.map((value, index) => <button type="button" key={value} className={values[rail.key] === index ? "is-selected" : ""} aria-pressed={values[rail.key] === index} onClick={() => set(rail.key, index)} onKeyDown={(event) => { if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); set(rail.key, index + (event.key === "ArrowRight" ? 1 : -1)); } }}>{value}</button>)}</div></fieldset>)}<p>Exploratory comparison only. Final structuring depends on project, commercial and professional review.</p></div>;
}

export function RevenueArchitectureMobile({ models }) {
  return <section id="investor-options" className="revenue-architecture-mobile" aria-labelledby="revenue-architecture-mobile-title">
    <header className="ram-intro"><p>05 — Revenue architecture</p><h2 id="revenue-architecture-mobile-title">One destination.<br /><em>Four ways to structure value.</em></h2><span>The destination remains constant. What changes is how occupancy, income and ownership are structured.</span><RevenuePicture /><a href="#ram-stability">Begin with stability <ArrowDown /></a></header>
    {models.map((model, index) => <article className="ram-model" data-model={model.id} id={`ram-${model.id}`} key={model.id}><div className="ram-copy"><p>{model.number} — {model.label}</p><h3>{model.title.map((line) => <span key={line}>{line}</span>)}</h3><span>{model.description}</span></div><div className="ram-asset"><RevenuePicture decorative /><i /><b>{model.selector}</b></div><dl>{model.profile.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><blockquote>{model.closing}</blockquote>{index < models.length - 1 && <a href={`#ram-${models[index + 1].id}`}>Continue to {models[index + 1].selector} <ArrowDown /></a>}</article>)}
    <section className="ram-comparison"><p>Four structures. One asset.</p><h2>What should the asset do for your capital?</h2><span>Explore how different structures prioritise stability, involvement, flexibility and exit.</span><div className="ram-lenses">{models.map((model) => <a href={`#ram-${model.id}`} key={model.id}><span>{model.number}</span><strong>{model.label}</strong><small>{model.comparison}</small></a>)}</div><SegmentedProfile /></section>
    <footer className="ram-closing"><RevenuePicture decorative /><p>One asset. Endless potential.</p><h2>More than one way forward.</h2><span>The appropriate structure depends on capital horizon, operating involvement and return objectives.</span><a className="ram-primary" href="mailto:info@devyogprojects.co.in?subject=Revenue%20architecture%20discussion">Discuss the right structure <ArrowRight /></a><a href="#investment-dossier">Return to the investment dossier</a></footer>
  </section>;
}
