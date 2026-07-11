import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { dossierChapters } from "./investmentDossierData";
import { EditorialMedia, MapTextureShape } from "./DossierVisuals";
import { MAHARASHTRA_PATH } from "./dossierMapPaths";


const mobileMedia = {
  opportunity: { main: "opportunitySite", secondary: "opportunityActivity", labels: ["SPACE", "ACTIVITY", "VALUE"] },
  location: { main: "locationEastPune", map: true, labels: ["INDIA", "MAHARASHTRA", "EAST PUNE"] },
  ecosystem: { main: "ecosystemWork", secondary: "ecosystemDining", labels: ["WORK", "DINE", "RECHARGE"] },
  value: { main: "valueInfrastructure", secondary: "valuePlan", labels: ["ADAPT", "INTEGRATE", "ENDURE"] },
};


function MobileMediaStory({ chapterId }) {
  const media = mobileMedia[chapterId];
  return (
    <div className={`mobile-media-story mobile-media-story--${chapterId}`}>
      <EditorialMedia mediaKey={media.main} priority={chapterId === "opportunity"} className="mobile-media-main" />
      {media.map
        ? <MapTextureShape mediaKey="locationMaharashtra" path={MAHARASHTRA_PATH} viewBox="0 0 300 240" label="MAHARASHTRA" className="mobile-media-secondary is-maharashtra" />
        : <EditorialMedia mediaKey={media.secondary} priority={chapterId === "opportunity"} className="mobile-media-secondary" />}
      <div className="mobile-media-labels">{media.labels.map((label) => <span key={label}>{label}</span>)}</div>
    </div>
  );
}


function MobileChapter({ chapter, index }) {
  const reducedMotion = useReducedMotion();
  const rememberChapter = () => sessionStorage.setItem("devyog-dossier-return", chapter.id);
  return (
    <article className="mobile-folio-chapter" id={`dossier-${chapter.id}`}>
      <motion.div
        className="mobile-folio-sheet"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0.84, scale: 0.975, y: 34 }}
        whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mobile-folio-progress" aria-label={`Chapter ${chapter.number} of 04`}><span>{chapter.number} / 04</span><i><b style={{ width: `${((index + 1) / 4) * 100}%` }} /></i></div>
        <p className="folio-marker">{chapter.number} <span aria-hidden="true">—</span> {chapter.marker}</p>
        <h3>{chapter.title.map((line) => <span key={line}>{line}</span>)}</h3>
        <p className="mobile-folio-copy">{chapter.copy}</p>
        <MobileMediaStory chapterId={chapter.id} />
        <p className="mobile-folio-statement">{chapter.pullQuote.map((line) => <span key={line}>{line}</span>)}</p>
        <Link className="mobile-folio-cta" to={chapter.route} state={{ dossierChapter: chapter.id }} onClick={rememberChapter}>
          {chapter.cta} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </motion.div>
    </article>
  );
}


export function MobileInvestmentDossier() {
  return (
    <section id="investment-dossier" className="investment-dossier investment-dossier--mobile" aria-labelledby="investment-dossier-mobile-title">
      <h2 id="investment-dossier-mobile-title" className="sr-only">Devyog investment dossier</h2>
      <div className="mobile-dossier-cover-wrap">
        <motion.div className="mobile-dossier-cover" initial={{ opacity: 0, y: 24, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <img src="/assets/brand/devyog-logo.svg" alt="DEVYOG Builders & Developers" />
          <p>DEVYOG</p>
          <h3>Investment<br />dossier</h3>
          <i />
          <span>Four forces shaping one connected commercial destination.</span>
          <small>Scroll to examine <ArrowDown size={13} aria-hidden="true" /></small>
        </motion.div>
      </div>
      {dossierChapters.map((chapter, index) => <MobileChapter key={chapter.id} chapter={chapter} index={index} />)}
    </section>
  );
}
