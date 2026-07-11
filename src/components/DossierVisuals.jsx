import { motion, useTransform } from "framer-motion";

const artwork = {
  opportunity: {
    src: "/assets/dossier/chapter-01-opportunity.webp",
    small: "/assets/dossier/chapter-01-opportunity-small.webp",
    alt: "Architectural floor plates and demand routes converging on an illuminated mixed-use commercial destination.",
  },
  location: {
    src: "/assets/dossier/chapter-02-location.webp",
    small: "/assets/dossier/chapter-02-location-small.webp",
    alt: "A glowing India globe progressing through regional map layers to a highlighted East Pune project location.",
  },
  ecosystem: {
    src: "/assets/dossier/chapter-03-ecosystem.webp",
    small: "/assets/dossier/chapter-03-ecosystem-small.webp",
    alt: "An exploded mixed-use commercial building connecting offices, dining, wellness, infrastructure and parking.",
  },
  value: {
    src: "/assets/dossier/chapter-04-value.webp",
    small: "/assets/dossier/chapter-04-value-small.webp",
    alt: "An adaptable illuminated building core surrounded by architectural systems for long-term relevance.",
  },
};

function ProgressLabel({
  progress,
  active,
  label,
  explanation,
  x,
  y,
  from = 0,
  to = from + 0.12,
  align = "left",
  quiet = false,
}) {
  const opacity = useTransform(progress, [from, to], [0, quiet ? 0.58 : 1]);
  const lift = useTransform(progress, [from, to], [8, 0]);

  return (
    <motion.button
      type="button"
      className={`visual-label visual-label--${align}${quiet ? " is-quiet" : ""}`}
      style={{ left: x, top: y, opacity, y: lift }}
      tabIndex={active ? 0 : -1}
      aria-label={`${label}. ${explanation}`}
    >
      <span className="visual-label__node" aria-hidden="true" />
      <span className="visual-label__text">{label}</span>
      <span className="visual-label__explanation" role="tooltip">{explanation}</span>
    </motion.button>
  );
}

function ArtworkFrame({ type, active, progress, pointerX, pointerY, children }) {
  const reveal = useTransform(progress, [0, 0.16], [0.42, 1]);
  const imageScale = useTransform(progress, [0, 1], [1.055, 1.015]);

  return (
    <div className={`dossier-visual dossier-visual--${type}`}>
      <motion.div
        className="dossier-artwork-depth"
        style={{ x: pointerX, y: pointerY, scale: imageScale, opacity: reveal }}
      >
        <img
          className="dossier-artwork"
          src={artwork[type].src}
          srcSet={`${artwork[type].small} 800w, ${artwork[type].src} 1600w`}
          sizes="(max-width: 720px) 94vw, (max-width: 1100px) 52vw, 49vw"
          alt={artwork[type].alt}
          loading={type === "opportunity" ? "eager" : "lazy"}
          fetchPriority={type === "opportunity" ? "high" : "auto"}
          decoding="async"
          draggable="false"
        />
      </motion.div>
      <div className="dossier-artwork-shade" aria-hidden="true" />
      <div className="dossier-artwork-grid" aria-hidden="true" />
      <motion.div className="dossier-visual-overlays" style={{ x: pointerX, y: pointerY }}>
        {children}
      </motion.div>
      <span className="sr-only">{active ? "Interactive chapter artwork active." : ""}</span>
    </div>
  );
}

function OpportunityVisual({ active, progress, pointerX, pointerY }) {
  const spaceOpacity = useTransform(progress, [0, 0.14, 0.34, 0.45], [0, 0.82, 0.82, 0]);
  const demandOpacity = useTransform(progress, [0.32, 0.48, 0.65, 0.75], [0, 1, 1, 0]);
  const valueOpacity = useTransform(progress, [0.68, 0.82], [0, 1]);
  const routeLength = useTransform(progress, [0.28, 0.72], [0, 1]);
  const systemOpacity = useTransform(progress, [0.68, 0.9], [0, 0.82]);

  return (
    <ArtworkFrame type="opportunity" active={active} progress={progress} pointerX={pointerX} pointerY={pointerY}>
      <div className="opportunity-words" aria-hidden="true">
        <motion.span className="opportunity-word is-space" style={{ opacity: spaceOpacity }}>SPACE</motion.span>
        <motion.span className="opportunity-word is-demand" style={{ opacity: demandOpacity }}>DEMAND</motion.span>
        <motion.span className="opportunity-word is-value" style={{ opacity: valueOpacity }}>VALUE</motion.span>
      </div>
      <svg className="visual-route-map" viewBox="0 0 600 760" aria-hidden="true">
        <motion.path style={{ pathLength: routeLength }} d="M78 214 C190 250 184 392 305 417 S463 468 502 618" />
        <motion.path style={{ pathLength: routeLength }} d="M510 250 C420 284 448 372 324 414 S176 514 132 638" />
        <motion.circle style={{ opacity: systemOpacity }} cx="306" cy="416" r="96" />
        <motion.circle style={{ opacity: systemOpacity }} cx="306" cy="416" r="142" />
      </svg>
      <ProgressLabel progress={progress} active={active} label="Site potential" explanation="The architectural footprint establishes the commercial opportunity." x="8%" y="17%" from={0.05} />
      <ProgressLabel progress={progress} active={active} label="Demand routes" explanation="Business and everyday activity converge on the destination." x="61%" y="46%" from={0.38} align="right" />
      <ProgressLabel progress={progress} active={active} label="Enduring relevance" explanation="A complete ecosystem turns space into a reason to return." x="9%" y="79%" from={0.72} />
    </ArtworkFrame>
  );
}

const locationLabels = [
  ["India", "National context", "13%", "14%", 0.08, "left"],
  ["Maharashtra", "Regional focus", "66%", "27%", 0.2, "right"],
  ["Pune", "Metropolitan context", "12%", "39%", 0.32, "left"],
  ["East Pune", "Commercial corridor", "66%", "50%", 0.44, "right"],
  ["Manjari-Hadapsar", "Connected urban catchment", "8%", "61%", 0.56, "left"],
  ["Solapur-Pune Highway", "Primary route relationship", "58%", "70%", 0.64, "right"],
  ["Project Location", "The destination address", "14%", "84%", 0.72, "left"],
];

const connectivityLabels = [
  ["Airport Access", "Air connectivity category", "4%", "31%"],
  ["Rail Connectivity", "Rail connectivity category", "70%", "37%"],
  ["Highway Linkage", "Road connectivity category", "3%", "50%"],
  ["Urban Catchment", "Surrounding urban movement", "68%", "58%"],
  ["IT & Business Districts", "Business demand relationship", "3%", "72%"],
  ["Growth Belt", "Evolving corridor context", "72%", "79%"],
];

function LocationVisual({ active, progress, pointerX, pointerY }) {
  const routeLength = useTransform(progress, [0.34, 0.78], [0, 1]);
  const pulseOpacity = useTransform(progress, [0.66, 0.82], [0, 1]);

  return (
    <ArtworkFrame type="location" active={active} progress={progress} pointerX={pointerX} pointerY={pointerY}>
      <svg className="visual-route-map location-route" viewBox="0 0 600 760" aria-hidden="true">
        <motion.path style={{ pathLength: routeLength }} d="M300 112 C288 225 340 291 298 382 S352 520 318 658" />
        <motion.circle className="location-pulse" style={{ opacity: pulseOpacity }} cx="318" cy="658" r="28" />
        <motion.circle className="location-pulse" style={{ opacity: pulseOpacity }} cx="318" cy="658" r="13" />
      </svg>
      {locationLabels.map(([label, explanation, x, y, from, align]) => (
        <ProgressLabel key={label} progress={progress} active={active} label={label} explanation={explanation} x={x} y={y} from={from} align={align} />
      ))}
      <div className="connectivity-labels">
        {connectivityLabels.map(([label, explanation, x, y], index) => (
          <ProgressLabel key={label} progress={progress} active={active} label={label} explanation={explanation} x={x} y={y} from={0.78 + index * 0.018} to={0.9 + index * 0.012} align={index % 2 ? "right" : "left"} quiet />
        ))}
      </div>
    </ArtworkFrame>
  );
}

const audienceLabels = [
  ["Companies", "Connected to Grade-A offices", "2%", "19%", 0.56],
  ["Professionals", "Connected to collaborative workspaces", "2%", "32%", 0.61],
  ["Clients", "Connected to hospitality and meeting spaces", "2%", "45%", 0.66],
  ["Visitors", "Connected to shared destination amenities", "68%", "55%", 0.71],
  ["Diners", "Connected to food and beverage levels", "72%", "67%", 0.76],
  ["Communities", "Connected to wellness and social spaces", "68%", "78%", 0.81],
];

const buildingLabels = [
  ["Grade-A Offices", "Premium office volume", "64%", "13%", 0.08],
  ["Co-working", "Collaborative work layer", "63%", "29%", 0.2],
  ["Food & Beverage", "Dining and social layer", "61%", "45%", 0.32],
  ["IT-ready Infrastructure", "Integrated technology network", "7%", "58%", 0.42],
  ["Wellness", "Terrace and wellness layer", "8%", "70%", 0.5],
  ["Smart Parking", "Structured circulation foundation", "61%", "86%", 0.56],
];

function EcosystemVisual({ active, progress, pointerX, pointerY }) {
  const networkLength = useTransform(progress, [0.18, 0.84], [0, 1]);

  return (
    <ArtworkFrame type="ecosystem" active={active} progress={progress} pointerX={pointerX} pointerY={pointerY}>
      <svg className="visual-route-map ecosystem-routes" viewBox="0 0 600 760" aria-hidden="true">
        {[170, 260, 350, 440, 530, 620].map((targetY, index) => (
          <motion.path key={targetY} style={{ pathLength: networkLength }} d={`${index < 3 ? "M40" : "M560"} ${145 + index * 80} C${index < 3 ? 170 : 430} ${145 + index * 80}, ${index < 3 ? 185 : 415} ${targetY}, 300 ${targetY}`} />
        ))}
      </svg>
      {buildingLabels.map(([label, explanation, x, y, from], index) => (
        <ProgressLabel key={label} progress={progress} active={active} label={label} explanation={explanation} x={x} y={y} from={from} align={index < 3 || index === 5 ? "right" : "left"} />
      ))}
      {audienceLabels.map(([label, explanation, x, y, from], index) => (
        <ProgressLabel key={label} progress={progress} active={active} label={label} explanation={explanation} x={x} y={y} from={from} align={index > 2 ? "right" : "left"} quiet />
      ))}
    </ArtworkFrame>
  );
}

const valueLabels = [
  ["Adaptability", "Floor plates respond to changing needs", "7%", "18%", 0.28, "left"],
  ["Infrastructure", "A connected core supports the whole", "63%", "31%", 0.43, "right"],
  ["Experience", "Human-centred spaces create daily relevance", "7%", "62%", 0.58, "left"],
  ["Relevance", "The complete system reaches equilibrium", "63%", "75%", 0.73, "right"],
];

function ValueVisual({ active, progress, pointerX, pointerY }) {
  const orbitOne = useTransform(progress, [0.24, 0.46], [0, 1]);
  const orbitTwo = useTransform(progress, [0.42, 0.66], [0, 1]);
  const orbitThree = useTransform(progress, [0.58, 0.84], [0, 1]);
  const equilibrium = useTransform(progress, [0.74, 0.94], [0, 0.85]);

  return (
    <ArtworkFrame type="value" active={active} progress={progress} pointerX={pointerX} pointerY={pointerY}>
      <svg className="visual-route-map value-orbits" viewBox="0 0 600 760" aria-hidden="true">
        <motion.ellipse style={{ pathLength: orbitOne }} cx="300" cy="370" rx="170" ry="272" />
        <motion.ellipse style={{ pathLength: orbitTwo }} cx="300" cy="370" rx="238" ry="188" transform="rotate(-18 300 370)" />
        <motion.ellipse style={{ pathLength: orbitThree }} cx="300" cy="370" rx="250" ry="126" transform="rotate(22 300 370)" />
        <motion.circle style={{ opacity: equilibrium }} cx="300" cy="370" r="72" />
      </svg>
      {valueLabels.map(([label, explanation, x, y, from, align]) => (
        <ProgressLabel key={label} progress={progress} active={active} label={label} explanation={explanation} x={x} y={y} from={from} align={align} />
      ))}
    </ArtworkFrame>
  );
}

export function ChapterVisual({ type, active = true, progress, pointerX, pointerY }) {
  if (type === "location") return <LocationVisual active={active} progress={progress} pointerX={pointerX} pointerY={pointerY} />;
  if (type === "ecosystem") return <EcosystemVisual active={active} progress={progress} pointerX={pointerX} pointerY={pointerY} />;
  if (type === "value") return <ValueVisual active={active} progress={progress} pointerX={pointerX} pointerY={pointerY} />;
  return <OpportunityVisual active={active} progress={progress} pointerX={pointerX} pointerY={pointerY} />;
}
