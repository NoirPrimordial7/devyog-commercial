"use client";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { dossierChapters } from "./investmentDossierData";
import { ChapterVisual } from "./DossierVisuals";
import "./investment-dossier.css";

const chapterRanges = [
  [0.2, 0.39],
  [0.42, 0.61],
  [0.64, 0.79],
  [0.82, 0.965],
];

function DossierSpread({ chapter, index, progress, activeIndex }) {
  const [start, end] = chapterRanges[index];
  const opacity = useTransform(progress, [start - 0.025, start, end, end + 0.025], [0, 1, 1, 0]);
  const y = useTransform(progress, [start - 0.02, start + 0.025], [16, 0]);

  const rememberChapter = () => {
    sessionStorage.setItem("devyog-dossier-return", chapter.id);
  };

  return (
    <motion.article className="dossier-spread" style={{ opacity, y }} aria-hidden={activeIndex !== index}>
      <div className="dossier-page dossier-copy-page">
        <p className="dossier-marker">{chapter.number} — {chapter.marker}</p>
        <h3>{chapter.title.map((line) => <span key={line}>{line}</span>)}</h3>
        <p className="dossier-copy">{chapter.copy}</p>
        <Link className="dossier-cta" to={chapter.route} state={{ dossierChapter: chapter.id }} onClick={rememberChapter} tabIndex={activeIndex === index ? 0 : -1}>
          {chapter.cta} <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="dossier-page dossier-visual-page">
        <ChapterVisual type={chapter.visual} active={activeIndex === index} />
        <p className="dossier-statement">{chapter.statement}</p>
      </div>
    </motion.article>
  );
}

function DossierProgress({ activeIndex }) {
  return (
    <ol className="dossier-progress" aria-label="Investment dossier chapters">
      {dossierChapters.map((chapter, index) => (
        <li key={chapter.id} className={index === activeIndex ? "is-active" : index < activeIndex ? "is-complete" : ""}>
          <span>{chapter.number}</span><small>{chapter.label}</small>
        </li>
      ))}
    </ol>
  );
}

export function InvestmentDossierSection() {
  const sectionRef = useRef(null);
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 115, damping: 30, mass: 0.28, restDelta: 0.001 });

  useMotionValueEvent(progress, "change", (value) => {
    const next = value < 0.405 ? 0 : value < 0.625 ? 1 : value < 0.805 ? 2 : 3;
    setActiveIndex((current) => current === next ? current : next);
  });

  const deskOpacity = useTransform(progress, [0, 0.055, 0.97, 1], [0, 1, 1, 0]);
  const objectScale = useTransform(progress, [0.04, 0.15, 0.95, 1], [0.86, 1, 1, 0.9]);
  const objectY = useTransform(progress, [0.04, 0.15, 0.95, 1], [50, 0, 0, -36]);
  const coverRotate = useTransform(progress, [0.11, 0.21], [0, -178]);
  const coverOpacity = useTransform(progress, [0.18, 0.23, 0.94, 0.98], [1, 0, 0, 1]);
  const closingOpacity = useTransform(progress, [0.94, 0.975], [0, 1]);
  const frontierY = useTransform(progress, [0, 0.085], ["100%", "-12%"]);
  const frontierOpacity = useTransform(progress, [0, 0.025, 0.075, 0.1], [0, 1, 1, 0]);
  const turnOne = useTransform(progress, [0.385, 0.425], [0, -180]);
  const turnTwo = useTransform(progress, [0.605, 0.645], [0, -180]);
  const turnThree = useTransform(progress, [0.785, 0.825], [0, -180]);
  const pageTurns = [turnOne, turnTwo, turnThree];
  const tableX = useTransform(pointerX, [-1, 1], [-5, 5]);
  const tableY = useTransform(pointerY, [-1, 1], [-3, 3]);

  useEffect(() => {
    const hash = location.hash.replace("#dossier-", "");
    if (!hash) return;
    const target = document.getElementById(`dossier-${hash}`);
    requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));
  }, [location.hash]);

  const onPointerMove = (event) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section ref={sectionRef} id="investment-dossier" className="investment-dossier" onPointerMove={onPointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      {dossierChapters.map((chapter, index) => <span key={chapter.id} id={`dossier-${chapter.id}`} className="dossier-anchor" style={{ top: `${22 + index * 20}%` }} aria-hidden="true" />)}
      <div className="dossier-stage">
        <motion.div className="dossier-environment" style={{ opacity: deskOpacity, x: tableX, y: tableY }} aria-hidden="true">
          <div className="desk-blueprint"/><div className="desk-ruler"/><div className="desk-pen"/><div className="desk-light"/>
        </motion.div>
        <motion.div className="dossier-entry-frontier" style={{ y: frontierY, opacity: frontierOpacity }} aria-hidden="true" />

        <motion.div className="dossier-object" style={{ scale: objectScale, y: objectY }}>
          <div className="dossier-shadow" aria-hidden="true" />
          <div className="dossier-book">
            <div className="dossier-base" aria-hidden="true" />
            {dossierChapters.map((chapter, index) => <DossierSpread key={chapter.id} chapter={chapter} index={index} progress={progress} activeIndex={activeIndex} />)}
            {pageTurns.map((rotateY, index) => <motion.div key={index} className="dossier-turn-page" style={{ rotateY }} aria-hidden="true"><span/></motion.div>)}
            <motion.div className="dossier-cover" style={{ rotateY: coverRotate, opacity: coverOpacity }}>
              <div className="cover-inlay">
                <img src="/assets/brand/devyog-logo.svg" alt="DEVYOG Builders & Developers" />
                <p>The investment dossier</p>
                <span>A commercial destination<br/>designed for long-term relevance</span>
              </div>
            </motion.div>
            <motion.div className="dossier-closing" style={{ opacity: closingOpacity }} aria-hidden="true"><p>Four reasons.<br/>One connected opportunity.</p></motion.div>
            <DossierProgress activeIndex={activeIndex} />
          </div>
        </motion.div>

        <motion.div className="dossier-exit-copy" style={{ opacity: closingOpacity }}>
          Continue exploring the destination <ArrowDown size={15} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
