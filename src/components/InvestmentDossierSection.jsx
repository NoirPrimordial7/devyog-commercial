"use client";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { dossierChapters } from "./investmentDossierData";
import { ChapterVisual } from "./DossierVisuals";
import "./investment-dossier.css";

const chapterRanges = [
  [0.2, 0.414],
  [0.415, 0.634],
  [0.635, 0.814],
  [0.815, 0.965],
];

function DossierSpread({
  chapter,
  index,
  progress,
  activeIndex,
  pointerX,
  pointerY,
  reducedMotion,
}) {
  const [start, end] = chapterRanges[index];
  const localProgress = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const opacity = useTransform(
    progress,
    reducedMotion
      ? [start - 0.001, start, end, end + 0.001]
      : [start - 0.018, start, end - 0.006, end + 0.012],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start - 0.018, start + 0.02], [reducedMotion ? 0 : 12, 0]);

  const rememberChapter = () => {
    sessionStorage.setItem("devyog-dossier-return", chapter.id);
  };

  return (
    <motion.article
      className="dossier-spread"
      style={{ opacity, y }}
      aria-hidden={activeIndex !== index}
      data-chapter={chapter.id}
    >
      <div className="dossier-page dossier-copy-page" data-chapter={chapter.id}>
        <div className="dossier-copy-content">
          <p className="dossier-marker">{chapter.number} <span aria-hidden="true">—</span> {chapter.marker}</p>
          <h3>{chapter.title.map((line) => <span key={line}>{line}</span>)}</h3>
          <p className="dossier-copy">{chapter.copy}</p>

          <blockquote className="dossier-pull-quote">
            {chapter.pullQuote.map((line) => <span key={line}>{line}</span>)}
          </blockquote>
        </div>

        <div className="dossier-copy-footer">
          <div className="dossier-principle" aria-label={`Chapter ${chapter.number} of 04: ${chapter.principle}`}>
            <span>{chapter.principle}</span>
            <span aria-hidden="true">{chapter.number} / 04</span>
          </div>
          <Link
            className="dossier-cta"
            to={chapter.route}
            state={{ dossierChapter: chapter.id }}
            onClick={rememberChapter}
            tabIndex={activeIndex === index ? 0 : -1}
          >
            <span>{chapter.cta}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="dossier-page dossier-visual-page">
        <ChapterVisual
          type={chapter.visual}
          active={activeIndex === index}
          progress={localProgress}
          pointerX={pointerX}
          pointerY={pointerY}
        />
        <motion.p
          className="dossier-statement"
          initial={false}
          animate={activeIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.45, delay: reducedMotion ? 0 : 0.22 }}
        >
          {chapter.statement.map((line) => <span key={line}>{line}</span>)}
        </motion.p>
      </div>
    </motion.article>
  );
}

function DossierProgress({ activeIndex }) {
  return (
    <ol className="dossier-progress" aria-label="Investment dossier chapters">
      {dossierChapters.map((chapter, index) => (
        <li
          key={chapter.id}
          className={index === activeIndex ? "is-active" : index < activeIndex ? "is-complete" : ""}
          title={`${chapter.number} — ${chapter.label}`}
        >
          <span>{chapter.number}</span>
          <small>{chapter.label}</small>
        </li>
      ))}
    </ol>
  );
}

function DossierPageTurn({ progress, start, end, reducedMotion }) {
  const rotateY = useTransform(progress, [start, end], [0, reducedMotion ? 0 : -180]);
  const opacity = useTransform(progress, [start - 0.004, start, end, end + 0.004], [0, 1, 1, 0]);
  const shadowOpacity = useTransform(progress, [start, (start + end) / 2, end], [0, 0.72, 0]);
  const edgeX = useTransform(progress, [start, end], ["92%", "4%"]);

  return (
    <motion.div className="dossier-turn-page" style={{ rotateY, opacity }} aria-hidden="true">
      <span className="dossier-turn-page__underside" />
      <motion.span className="dossier-turn-page__shadow" style={{ opacity: shadowOpacity }} />
      <motion.span className="dossier-turn-page__edge" style={{ left: edgeX }} />
    </motion.div>
  );
}

export function InvestmentDossierSection() {
  const sectionRef = useRef(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 1000 : 115,
    damping: reducedMotion ? 100 : 30,
    mass: reducedMotion ? 0.01 : 0.28,
    restDelta: 0.001,
  });

  useMotionValueEvent(progress, "change", (value) => {
    const next = value < 0.415 ? 0 : value < 0.635 ? 1 : value < 0.815 ? 2 : 3;
    setActiveIndex((current) => current === next ? current : next);
  });

  const deskOpacity = useTransform(progress, [0, 0.045, 0.97, 1], [0, 1, 1, 0]);
  const objectScale = useTransform(progress, [0.035, 0.145, 0.95, 1], [0.9, 1, 1, 0.93]);
  const objectY = useTransform(progress, [0.035, 0.145, 0.95, 1], [42, 0, 0, -28]);
  const coverRotate = useTransform(progress, [0.11, 0.21], [0, -178]);
  const coverOpacity = useTransform(progress, [0.18, 0.225, 0.94, 0.98], [1, 0, 0, 1]);
  const reducedCoverOpacity = useTransform(progress, [0.11, 0.2, 0.94, 0.98], [1, 0, 0, 1]);
  const closingOpacity = useTransform(progress, [0.948, 0.978], [0, 1]);
  const frontierY = useTransform(progress, [0, 0.085], ["100%", "-12%"]);
  const frontierOpacity = useTransform(progress, [0, 0.025, 0.075, 0.1], [0, 1, 1, 0]);
  const tableX = useTransform(pointerX, [-1, 1], [-6, 6]);
  const tableY = useTransform(pointerY, [-1, 1], [-4, 4]);
  const artworkX = useTransform(pointerX, [-1, 1], [-3, 3]);
  const artworkY = useTransform(pointerY, [-1, 1], [-2, 2]);

  useEffect(() => {
    const hash = location.hash.replace("#dossier-", "");
    if (!hash) return;
    const target = document.getElementById(`dossier-${hash}`);
    requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));
  }, [location.hash]);

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="investment-dossier"
      className="investment-dossier"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
      aria-labelledby="investment-dossier-title"
    >
      <h2 id="investment-dossier-title" className="sr-only">Interactive investment dossier</h2>
      {dossierChapters.map((chapter, index) => (
        <span
          key={chapter.id}
          id={`dossier-${chapter.id}`}
          className="dossier-anchor"
          style={{ top: `${22 + index * 20}%` }}
          aria-hidden="true"
        />
      ))}

      <div className="dossier-stage" data-active-chapter={activeIndex + 1}>
        <motion.div
          className="dossier-environment"
          style={{ opacity: deskOpacity, x: tableX, y: tableY, scale: 1.045 }}
          aria-hidden="true"
        >
          <div className="desk-light" />
        </motion.div>
        <motion.div
          className="dossier-entry-frontier"
          style={{ y: frontierY, opacity: reducedMotion ? 0 : frontierOpacity }}
          aria-hidden="true"
        />

        <div className="dossier-object-anchor">
          <motion.div
            className="dossier-object"
            style={{ scale: reducedMotion ? 1 : objectScale, y: reducedMotion ? 0 : objectY }}
          >
            <div className="dossier-shadow" aria-hidden="true" />
            <div className="dossier-book">
              <div className="dossier-base" aria-hidden="true" />
              {dossierChapters.map((chapter, index) => (
                <DossierSpread
                  key={chapter.id}
                  chapter={chapter}
                  index={index}
                  progress={progress}
                  activeIndex={activeIndex}
                  pointerX={artworkX}
                  pointerY={artworkY}
                  reducedMotion={reducedMotion}
                />
              ))}

              {[[0.385, 0.425], [0.605, 0.645], [0.785, 0.825]].map(([start, end]) => (
                <DossierPageTurn key={start} progress={progress} start={start} end={end} reducedMotion={reducedMotion} />
              ))}

              <motion.div
                className="dossier-cover"
                style={{ rotateY: reducedMotion ? 0 : coverRotate, opacity: reducedMotion ? reducedCoverOpacity : coverOpacity }}
              >
                <div className="cover-inlay">
                  <img src="/assets/brand/devyog-logo.svg" alt="DEVYOG Builders & Developers" />
                  <p>The investment<br />dossier</p>
                  <span>A commercial destination<br />designed for long-term relevance</span>
                </div>
              </motion.div>

              <motion.div className="dossier-closing" style={{ opacity: closingOpacity }} aria-hidden="true">
                <p>Four reasons.<br />One connected opportunity.</p>
              </motion.div>
              <DossierProgress activeIndex={activeIndex} />
            </div>
          </motion.div>
        </div>

        <motion.div className="dossier-exit-copy" style={{ opacity: closingOpacity }}>
          Continue exploring the destination <ArrowDown size={15} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
