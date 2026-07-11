import { useId } from "react";
import { Link } from "react-router-dom";
import { motion, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { dossierMedia } from "./investmentDossierData";
import { INDIA_PATH, MAHARASHTRA_PATH } from "./dossierMapPaths";


export function EditorialMedia({ mediaKey, className = "", priority = false }) {
  const media = dossierMedia[mediaKey];

  return (
    <figure className={`folio-media ${className}`} style={{ "--media-aspect": media.aspect }}>
      <picture>
        <source media="(max-width: 767px)" srcSet={media.small} />
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          draggable="false"
          style={{ objectFit: media.fit, objectPosition: media.position }}
        />
      </picture>
    </figure>
  );
}


function Reveal({ progress, from, to, className = "", children, scale = false, initialOpacity = 0 }) {
  const opacity = useTransform(progress, [from, to], [initialOpacity, 1]);
  const y = useTransform(progress, [from, to], [initialOpacity ? 0 : scale ? 10 : 7, 0]);
  const zoom = useTransform(progress, [from, to], [scale ? 0.975 : 1, 1]);
  return <motion.div className={className} style={{ opacity, y, scale: zoom }}>{children}</motion.div>;
}


function FolioHeader({ chapter }) {
  return (
    <header className="folio-header">
      <p className="folio-marker">{chapter.number} <span aria-hidden="true">—</span> {chapter.marker}</p>
      <h3 className="folio-headline">{chapter.title.map((line) => <span key={line}>{line}</span>)}</h3>
      <p className="folio-body">{chapter.copy}</p>
      <p className="folio-quote">{chapter.pullQuote.map((line) => <span key={line}>{line}</span>)}</p>
    </header>
  );
}


function FolioFooter({ chapter, active }) {
  const rememberChapter = () => sessionStorage.setItem("devyog-dossier-return", chapter.id);
  return (
    <footer className="folio-footer">
      <span>{chapter.number} / 04</span>
      <Link
        className="folio-cta"
        to={chapter.route}
        state={{ dossierChapter: chapter.id }}
        onClick={rememberChapter}
        tabIndex={active ? 0 : -1}
      >
        {chapter.cta} <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </footer>
  );
}


function FolioPage({ side, chapterId, className = "", children }) {
  return <section className={`folio-page folio-page--${side} ${chapterId}-${side} ${className}`}>{children}</section>;
}


function LeftStoryPage({ chapter, active, progress, mediaKey, mediaClass = "", mediaCaption, children }) {
  return (
    <FolioPage side="left" chapterId={chapter.id}>
      <FolioHeader chapter={chapter} />
      <main className="folio-main folio-main--left">
        <Reveal progress={progress} from={0.08} to={0.34} className={`folio-primary-media ${mediaClass}`} scale initialOpacity={chapter.id === "opportunity" ? 0.88 : 0}>
          <EditorialMedia mediaKey={mediaKey} priority={chapter.id === "opportunity"} />
          <span className="folio-caption">{mediaCaption}</span>
        </Reveal>
        {children}
      </main>
      <FolioFooter chapter={chapter} active={active} />
    </FolioPage>
  );
}


function RightStoryPage({ chapterId, rightOpacity, className = "", children }) {
  return (
    <FolioPage side="right" chapterId={chapterId} className={className}>
      <motion.div className="folio-page-content" style={{ opacity: rightOpacity }}>{children}</motion.div>
    </FolioPage>
  );
}


function OpportunitySpread({ chapter, progress, active, rightOpacity }) {
  const pathLength = useTransform(progress, [0.14, 0.75], [0, 1]);
  return (
    <>
      <LeftStoryPage chapter={chapter} active={active} progress={progress} mediaKey="opportunitySite" mediaCaption="01 / Commercial footprint" />
      <RightStoryPage chapterId={chapter.id} rightOpacity={rightOpacity}>
        <div className="folio-label-rail" aria-label="Opportunity sequence"><span>SPACE</span><span>ACTIVITY</span><span>VALUE</span></div>
        <svg className="folio-route opportunity-route" viewBox="0 0 620 720" aria-hidden="true">
          <motion.path style={{ pathLength }} d="M90 120 C250 145 195 325 340 350 S430 500 530 590" />
        </svg>
        <div className="opportunity-grid">
          <Reveal progress={progress} from={0.12} to={0.4} className="opportunity-activity" scale initialOpacity={0.9}>
            <EditorialMedia mediaKey="opportunityActivity" priority />
            <span className="folio-caption">02 / Everyday activity</span>
          </Reveal>
          <Reveal progress={progress} from={0.46} to={0.76} className="opportunity-destination" scale initialOpacity={0.68}>
            <EditorialMedia mediaKey="opportunityDestination" priority />
            <span className="folio-caption">03 / Chosen destination</span>
          </Reveal>
          <Reveal progress={progress} from={0.75} to={0.96} className="folio-statement opportunity-statement" initialOpacity={0.72}>
            {chapter.statement.map((line) => <span key={line}>{line}</span>)}
          </Reveal>
        </div>
      </RightStoryPage>
    </>
  );
}


export function MapTextureShape({ mediaKey, path, viewBox, label, className = "" }) {
  const clipId = useId().replaceAll(":", "");
  const media = dossierMedia[mediaKey];
  return (
    <article className={`location-card ${className}`}>
      <svg viewBox={viewBox} role="img" aria-label={`${label} geographic outline`}>
        <defs><clipPath id={clipId}><path d={path} /></clipPath></defs>
        <image href={media.small} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} />
        <path className="location-outline" d={path} />
      </svg>
      <span className="location-card__index">{label}</span>
    </article>
  );
}


function LocationSpread({ chapter, progress, active, rightOpacity }) {
  const routeLength = useTransform(progress, [0.12, 0.78], [0, 1]);
  return (
    <>
      <FolioPage side="left" chapterId={chapter.id}>
        <FolioHeader chapter={chapter} />
        <main className="folio-main folio-main--left">
          <Reveal progress={progress} from={0.08} to={0.34} className="folio-primary-media location-india-media" scale>
            <MapTextureShape mediaKey="locationIndia" path={INDIA_PATH} viewBox="0 0 300 320" label="INDIA" className="is-india" />
          </Reveal>
          <span className="location-context">National context <i /> Regional momentum</span>
        </main>
        <FolioFooter chapter={chapter} active={active} />
      </FolioPage>
      <RightStoryPage chapterId={chapter.id} rightOpacity={rightOpacity}>
        <svg className="folio-route location-route" viewBox="0 0 620 720" aria-hidden="true">
          <motion.path style={{ pathLength: routeLength }} d="M52 132 C210 78 180 315 330 292 S410 520 560 514" />
        </svg>
        <div className="location-grid">
          <Reveal progress={progress} from={0.2} to={0.48} className="location-maharashtra" scale>
            <MapTextureShape mediaKey="locationMaharashtra" path={MAHARASHTRA_PATH} viewBox="0 0 300 240" label="MAHARASHTRA" className="is-maharashtra" />
          </Reveal>
          <Reveal progress={progress} from={0.48} to={0.78} className="location-east-pune" scale>
            <article className="location-card is-east-pune">
              <EditorialMedia mediaKey="locationEastPune" />
              <span className="location-card__index">EAST PUNE</span>
              <span className="location-target"><i aria-hidden="true" /> PROJECT LOCATION</span>
            </article>
          </Reveal>
          <Reveal progress={progress} from={0.5} to={0.78} className="location-legend">
            <span>PUNE</span><span>MANJARI–HADAPSAR</span><span>SOLAPUR–PUNE HIGHWAY</span>
          </Reveal>
          <Reveal progress={progress} from={0.78} to={0.98} className="folio-statement location-statement">
            {chapter.statement.map((line) => <span key={line}>{line}</span>)}
          </Reveal>
        </div>
      </RightStoryPage>
    </>
  );
}


const ecosystemLabels = ["GRADE-A OFFICES", "CO-WORKING", "FOOD & BEVERAGE", "IT-READY INFRASTRUCTURE", "WELLNESS", "SMART PARKING"];


function EcosystemSpread({ chapter, progress, active, rightOpacity }) {
  return (
    <>
      <LeftStoryPage chapter={chapter} active={active} progress={progress} mediaKey="ecosystemArrival" mediaCaption="Arrival / 08:30">
        <Reveal progress={progress} from={0.3} to={0.55} className="daily-rhythm"><span>ARRIVE</span><i /><span>WORK</span><i /><span>CONNECT</span></Reveal>
      </LeftStoryPage>
      <RightStoryPage chapterId={chapter.id} rightOpacity={rightOpacity}>
        <div className="ecosystem-grid">
          <Reveal progress={progress} from={0.16} to={0.42} className="ecosystem-work" scale><EditorialMedia mediaKey="ecosystemWork" /><span className="folio-caption">Work / 08:30</span></Reveal>
          <Reveal progress={progress} from={0.38} to={0.64} className="ecosystem-wellness" scale><EditorialMedia mediaKey="ecosystemWellness" /><span className="folio-caption">Recharge / 18:30</span></Reveal>
          <Reveal progress={progress} from={0.54} to={0.8} className="ecosystem-dining" scale><EditorialMedia mediaKey="ecosystemDining" /><span className="folio-caption">Dine / 12:30</span></Reveal>
        </div>
        <Reveal progress={progress} from={0.48} to={0.82} className="ecosystem-legend">{ecosystemLabels.map((label) => <span key={label}>{label}</span>)}</Reveal>
        <div className="ecosystem-bottom">
          <div className="ecosystem-timebar"><span>08:30</span><i /><span>12:30</span><i /><span>18:30</span></div>
          <Reveal progress={progress} from={0.78} to={0.98} className="folio-statement ecosystem-statement">{chapter.statement.map((line) => <span key={line}>{line}</span>)}</Reveal>
        </div>
      </RightStoryPage>
    </>
  );
}


const valuePrinciples = ["ADAPTABILITY", "INFRASTRUCTURE", "EXPERIENCE", "RELEVANCE"];


function ValueSpread({ chapter, progress, active, rightOpacity }) {
  const pathLength = useTransform(progress, [0.2, 0.66], [0, 1]);
  return (
    <>
      <LeftStoryPage chapter={chapter} active={active} progress={progress} mediaKey="valuePlan" mediaCaption="Flexible commercial plate">
        <svg className="value-mini-diagram" viewBox="0 0 420 72" aria-label="Adaptable layout diagram">
          <motion.path style={{ pathLength }} d="M10 36 H104 L142 14 H246 L284 58 H410" />
          {[10, 104, 142, 246, 284, 410].map((x) => <circle key={x} cx={x} cy={x === 142 ? 14 : x === 284 ? 58 : 36} r="3.5" />)}
        </svg>
      </LeftStoryPage>
      <RightStoryPage chapterId={chapter.id} rightOpacity={rightOpacity}>
        <div className="value-grid">
          <Reveal progress={progress} from={0.18} to={0.46} className="value-infrastructure" scale><EditorialMedia mediaKey="valueInfrastructure" /><span className="folio-caption">Integrated infrastructure</span></Reveal>
          <Reveal progress={progress} from={0.45} to={0.72} className="value-experience" scale><EditorialMedia mediaKey="valueExperience" /><span className="folio-caption">Enduring experience</span></Reveal>
          <Reveal progress={progress} from={0.5} to={0.82} className="value-principles">{valuePrinciples.map((label, index) => <span key={label}><b>0{index + 1}</b>{label}</span>)}</Reveal>
          <Reveal progress={progress} from={0.78} to={0.98} className="folio-statement value-statement">{chapter.statement.map((line) => <span key={line}>{line}</span>)}</Reveal>
        </div>
      </RightStoryPage>
    </>
  );
}


export function DossierEditorialSpread({ chapter, progress, active, rightOpacity }) {
  if (chapter.id === "location") return <LocationSpread chapter={chapter} progress={progress} active={active} rightOpacity={rightOpacity} />;
  if (chapter.id === "ecosystem") return <EcosystemSpread chapter={chapter} progress={progress} active={active} rightOpacity={rightOpacity} />;
  if (chapter.id === "value") return <ValueSpread chapter={chapter} progress={progress} active={active} rightOpacity={rightOpacity} />;
  return <OpportunitySpread chapter={chapter} progress={progress} active={active} rightOpacity={rightOpacity} />;
}


export function ChapterVisual({ type }) {
  if (type === "location") {
    return (
      <div className="grid h-full grid-cols-2 gap-4">
        <MapTextureShape mediaKey="locationIndia" path={INDIA_PATH} viewBox="0 0 300 320" label="INDIA" className="is-india" />
        <div className="grid min-h-0 grid-rows-2 gap-4">
          <MapTextureShape mediaKey="locationMaharashtra" path={MAHARASHTRA_PATH} viewBox="0 0 300 240" label="MAHARASHTRA" className="is-maharashtra" />
          <EditorialMedia mediaKey="locationEastPune" priority />
        </div>
      </div>
    );
  }
  const mediaKeys = type === "ecosystem"
    ? ["ecosystemArrival", "ecosystemWork", "ecosystemDining", "ecosystemWellness"]
    : type === "value"
      ? ["valuePlan", "valueInfrastructure", "valueExperience"]
      : ["opportunitySite", "opportunityActivity", "opportunityDestination"];
  return (
    <div className={`grid h-full gap-4 ${mediaKeys.length === 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-2"}`}>
      {mediaKeys.map((mediaKey, index) => <EditorialMedia key={mediaKey} mediaKey={mediaKey} priority={index === 0} className={mediaKeys.length === 3 && index === 0 ? "row-span-2" : ""} />)}
    </div>
  );
}
