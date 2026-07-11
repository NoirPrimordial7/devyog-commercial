import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChapterVisual } from "./DossierVisuals";

export function InvestmentStoryShell({ story }) {
  const returnPath = `/#dossier-${story.chapter}`;
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#e8e0d3]">
      <Navbar />
      <section className="relative isolate flex min-h-[100svh] items-center px-5 pb-16 pt-24 sm:px-8 lg:px-12">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_35%,rgba(201,152,80,.13),transparent_30%),repeating-linear-gradient(90deg,rgba(255,255,255,.018)_0_1px,transparent_1px_9vw),linear-gradient(145deg,#12110f,#050505_65%)]" />
        <div className="mx-auto grid w-full max-w-[1480px] gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22,1,.36,1] }}>
            <Link to={returnPath} className="mb-14 inline-flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.24em] text-[#c99850] hover:text-[#e7be78] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-[#e7be78]">
              <ArrowLeft size={15} /> Return to Investment Dossier
            </Link>
            <p className="mb-6 text-[.62rem] font-bold uppercase tracking-[.42em] text-[#c99850]">{story.number} — {story.marker}</p>
            <h1 className="hero-serif text-[clamp(3.6rem,7vw,8.5rem)] leading-[.82] tracking-[-.06em]">{story.title.map(line => <span className="block" key={line}>{line}</span>)}</h1>
            <p className="mt-8 max-w-xl text-[clamp(1rem,1.35vw,1.3rem)] leading-relaxed text-[#e8e0d3]/58">{story.thesis}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15, duration: .9 }} className="relative h-[min(60svh,650px)] overflow-hidden border border-white/10 bg-[#0b0b0a] p-5 shadow-[0_35px_90px_rgba(0,0,0,.65)] sm:p-9">
            <ChapterVisual type={story.chapter} active />
          </motion.div>
        </div>
        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[.55rem] uppercase tracking-[.3em] text-white/35 md:flex">Explore the story <ArrowDown size={13}/></div>
      </section>
      <section className="bg-[#0b0b0a] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[.62rem] font-bold uppercase tracking-[.42em] text-[#c99850]">What this story will explore</p>
          <div className="mt-12 grid border-y border-white/10 md:grid-cols-3">
            {story.explore.map((item, index) => <div key={item} className="border-white/10 px-0 py-8 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><span className="text-[.55rem] tracking-[.3em] text-[#c99850]">0{index+1}</span><h2 className="hero-serif mt-5 text-3xl leading-none">{item}</h2></div>)}
          </div>
          <Link to={returnPath} className="mt-16 inline-flex items-center gap-3 border-b border-[#c99850] pb-2 text-[.65rem] font-bold uppercase tracking-[.23em] text-[#e8e0d3]"><ArrowLeft size={15}/> Return to Investment Dossier</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
