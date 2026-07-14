# Revenue Architecture research record

## Objective

Refine the approved Revenue Architecture concept without replacing its structure or turning it into a finance dashboard. The implementation decision is a single persistent architectural asset with lightweight CSS/SVG operating overlays, a scroll-linked editorial narrative, and a separate mobile reading flow.

## Current award landscape reviewed

The current Awwwards Sites of the Day listing was reviewed as a broad quality bar. The ten entries considered were House of Honey, PP Neue Montreal, Longbow, Vectr, 21 Hrs On The Moon, Brunello Cucinelli AI E-com, Julien Calot, Depo Luxe, MONOLOG, and Hildén & Kaira. This was a directional review, not a claim that every site is relevant to commercial real estate.

## Shortlist and adaptation decisions

1. [House of Honey](https://www.houseofhoney.com/) — Adapted its confidence in editorial scale and material atmosphere. Rejected its playful ornament because it would weaken Devyog's institutional tone.
2. [Brunello Cucinelli](https://shop.brunellocucinelli.com/en-in/) — Adapted restrained luxury pacing and tonal control. Rejected its commerce-specific navigation and product-grid conventions.
3. [Hubtown](https://hubtown.co.in/) — Adapted object-first real-estate framing and the sense of a model occupying physical space. Rejected a heavier real-time 3D payload for this section.
4. [The RED / 333 South Wabash](https://www.333southwabash.com/) — Adapted dark architectural presentation and selective illumination. Rejected its site-specific branding and composition.
5. [Motion: scroll animation](https://motion.dev/docs/react-scroll-animations) — Used scroll progress as a continuous narrative input rather than a stack of timed fades.
6. [Motion: `useScroll`](https://motion.dev/docs/react-use-scroll) — Used a section-local progress signal to coordinate copy, model position, and scene state.
7. [Motion: `AnimatePresence`](https://motion.dev/docs/react-animate-presence) — Used for controlled editorial copy replacement while the architectural object persists.
8. [Motion: layout animations](https://motion.dev/docs/react-layout-animations) — Favored transform-driven motion and avoided layout-heavy animation.
9. [Aceternity Sticky Scroll Reveal](https://ui.aceternity.com/components/sticky-scroll-reveal) — Adapted the separation of sticky visual stage and scrolling content. Rejected its demo styling and card-like visual treatment.
10. The existing Devyog dossier — Treated the approved physical folio, graphite surfaces, ivory typography, and copper chapter language as the primary brand reference.

## Live review scope

The entry pages for House of Honey, Brunello Cucinelli, Hubtown, and The RED were opened in the browser and visually reviewed. Motion and Aceternity documentation were reviewed as implementation references. No claim is made that proprietary source code or hidden production behavior was inspected.

## Final implementation choice

- Keep one master architectural render throughout intro, four operating models, comparison, and closing.
- Use masks, plan lines, occupancy scans, anchor blocks, use labels, transfer framing, shadow, reflection, and subtle pointer parallax as lightweight overlays.
- Keep the right-hand structure profile and bottom material rail persistent.
- Use thin comparison rails instead of rectangular cards.
- Use no alternate baked state renders and add no new runtime dependency.
