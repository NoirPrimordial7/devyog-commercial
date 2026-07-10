import { motion } from "framer-motion";

const gold = "#c99850";
const ivory = "#e8e0d3";

export function OpportunityVisual({ active }) {
  return (
    <div className="dossier-visual opportunity-visual" aria-label="Space transforming into demand and value">
      <div className="visual-word">SPACE <span>→</span> DEMAND <span>→</span> VALUE</div>
      <svg viewBox="0 0 520 310" role="img" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((floor) => (
          <motion.path key={floor} d={`M120 ${240-floor*38} L260 ${190-floor*25} L400 ${240-floor*38} L260 ${290-floor*25} Z`}
            fill="none" stroke={floor === 4 ? gold : "rgba(232,224,211,.3)"} strokeWidth="1.4"
            initial={{ pathLength: 0, opacity: 0 }} animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: .8, delay: floor*.08 }} />
        ))}
        {[150, 205, 260, 315, 370].map((x, index) => <motion.circle key={x} cx={x} cy={218-index%2*30} r="4" fill={gold} animate={active ? { opacity: [0.2, 1, .3], scale: [1, 1.5, 1] } : { opacity: 0 }} transition={{ duration: 2, repeat: Infinity, delay: index*.18 }} />)}
      </svg>
    </div>
  );
}

export function LocationGlobeVisual({ active }) {
  return (
    <div className="dossier-visual globe-visual" aria-label="Conceptual map focusing from India to East Pune">
      <motion.div className="globe" animate={active ? { rotateY: [0, 10, -4, 0] } : { rotateY: 0 }} transition={{ duration: 8, repeat: Infinity }}>
        <span className="globe-lat lat-a"/><span className="globe-lat lat-b"/><span className="globe-lon lon-a"/><span className="globe-lon lon-b"/>
        <svg viewBox="0 0 240 240" aria-hidden="true"><path d="M134 46l19 17-4 21 18 16-9 22 8 15-20 20-9 31-19 6-12-24-19-18 7-23-15-19 20-17 9-30z" fill="rgba(201,152,80,.15)" stroke={gold} strokeWidth="1.4"/><motion.circle cx="118" cy="148" r="5" fill={gold} animate={active ? { r: [4, 11, 4], opacity: [1,.15,1] } : {}} transition={{ duration: 2, repeat: Infinity }}/></svg>
      </motion.div>
      <div className="map-labels"><span>PUNE</span><span>EAST PUNE</span><span>MANJARI–HADAPSAR</span><span>SOLAPUR–PUNE HIGHWAY</span></div>
    </div>
  );
}

const ecosystemLayers = ["GRADE-A OFFICES", "CO-WORKING", "FOOD & BEVERAGE", "IT-READY", "WELLNESS", "SMART PARKING"];
export function DemandEcosystemVisual({ active }) {
  return (
    <div className="dossier-visual ecosystem-visual" aria-label="Mixed-use building layers connected to different audiences">
      <div className="building-model">
        {ecosystemLayers.map((layer, index) => <motion.div key={layer} className="building-layer" initial={false} animate={active ? { opacity: 1, x: 0 } : { opacity: .15, x: 20 }} transition={{ delay: index*.09 }}><span>{layer}</span></motion.div>)}
      </div>
      <svg viewBox="0 0 520 290" aria-hidden="true">{[70,130,190,250,310,370].map((y,i)=><motion.path key={y} d={`M55 ${y/1.2} C180 ${y/1.2}, 320 ${250-y/4}, 470 ${250-y/4}`} fill="none" stroke={i%2?"rgba(232,224,211,.2)":gold} strokeWidth="1" initial={{pathLength:0}} animate={active?{pathLength:1}:{pathLength:0}} transition={{duration:1,delay:i*.08}}/>)}</svg>
    </div>
  );
}

export function LongTermValueVisual({ active }) {
  return (
    <div className="dossier-visual value-visual" aria-label="Adaptable building surrounded by a long-term value system">
      <motion.div className="value-orbit" animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}><span>Adaptability</span><span>Infrastructure</span><span>Experience</span><span>Relevance</span></motion.div>
      <div className="value-building">{[0,1,2,3,4].map((i)=><motion.span key={i} animate={active?{scaleX:[.75,1,.86],opacity:[.45,1,.65]}:{opacity:.2}} transition={{duration:3,repeat:Infinity,delay:i*.2}}/>)}</div>
      <p>Designed to stay desired.</p>
    </div>
  );
}

export function ChapterVisual({ type, active = true }) {
  if (type === "location") return <LocationGlobeVisual active={active}/>;
  if (type === "ecosystem") return <DemandEcosystemVisual active={active}/>;
  if (type === "value") return <LongTermValueVisual active={active}/>;
  return <OpportunityVisual active={active}/>;
}
