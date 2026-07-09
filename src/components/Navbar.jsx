import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[120] px-3 pt-2 sm:px-5 sm:pt-3"
    >
      <nav className="mx-auto flex h-10 max-w-[1680px] items-center justify-between gap-4 border-b border-white/12 bg-[#07111f]/34 px-2 text-ivory backdrop-blur-md sm:h-11 sm:px-3">
        <a
          href="#exterior"
          className="group flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="DEVYOG Builders and Developers home"
        >
          <img
            src="/assets/brand/devyog-logo.svg"
            alt="DEVYOG Builders & Developers"
            className="h-6 w-auto max-w-[88px] opacity-95 transition-opacity duration-300 group-hover:opacity-100 sm:h-7 sm:max-w-[104px]"
          />
          <span className="hidden text-[11px] font-semibold tracking-[-0.02em] text-white/56 sm:inline">
            Investor Teaser
          </span>
        </a>

        <div className="hidden items-center gap-6 text-[11px] font-semibold tracking-[-0.015em] text-white/76 md:flex lg:gap-9">
          <a href="#project-visualization" className="transition-colors duration-300 hover:text-champagne">
            Project
          </a>
          <a href="#offerings" className="transition-colors duration-300 hover:text-champagne">
            Facility Mix
          </a>
          <a href="#investor-options" className="transition-colors duration-300 hover:text-champagne">
            Investor
          </a>
          <a
            href="#contact"
            className="hidden items-center gap-1.5 transition-colors duration-300 hover:text-champagne lg:inline-flex"
          >
            Search <Search size={13} strokeWidth={1.8} />
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="https://www.devyogprojects.co.in"
            target="_blank"
            rel="noreferrer"
            className="hidden text-[11px] font-semibold tracking-[-0.02em] text-white/78 transition-colors duration-300 hover:text-champagne lg:inline"
          >
            Devyogprojects.com
          </a>
          <a
            href="#contact"
            className="group inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-white px-3 text-[10px] font-extrabold tracking-[-0.01em] text-[#07111f] transition-transform duration-300 hover:scale-[1.035] sm:h-9 sm:px-4 sm:text-[11px]"
          >
            <span className="hidden sm:inline">Request dossier</span>
            <span className="sm:hidden">Dossier</span>
            <ArrowUpRight
              size={13}
              strokeWidth={1.9}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
