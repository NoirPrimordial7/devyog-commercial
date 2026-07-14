# Devyog design and motion protocol

Use this protocol for every substantial visual, interaction, or motion change in this repository.

## Before implementation

- Inspect the current component, its state model, assets, breakpoints, and adjacent section transitions before proposing a replacement.
- Capture baseline screenshots at the entry, active midpoint, settled state, and exit transition.
- Review current, relevant references before designing. Prefer authoritative product documentation, live award-winning work, and established component-library examples.
- Open the live references and inspect their entry, midpoint, settled state, and transition behavior where possible. Keep a truthful shortlist of no more than ten sources.
- Record the source URL, the specific lesson being adapted, and the visual or technical pattern being rejected. Adapt principles; never copy a composition or brand language.

## Design decisions

- Preserve Devyog's dark architectural, warm-ivory, graphite, and restrained copper language.
- Reject generic neon SaaS gradients, banking dashboards, component-demo layouts, floating icon fields, and decorative charts without verified data.
- For continuous stories, keep one persistent visual object and transform its state. Do not cross-fade several baked image plates to simulate continuity.
- Use the existing assets and dependencies first. Prefer CSS and Framer Motion for 2.5D depth, scroll choreography, and micro-interactions.
- Do not add WebGL, GSAP, Lenis, or another motion/runtime dependency unless the existing stack demonstrably cannot achieve the required result and the performance cost is documented.
- Never publish unverified financial, occupancy, yield, rent, tenure, or transaction claims. Use qualitative language until the project team supplies approved figures.

## Verification

- Capture final screenshots matching the baseline checkpoints.
- Verify desktop, tablet, mobile, short-height desktop, reduced-motion behavior, keyboard operation, focus visibility, direct selector clicks, and reverse scrolling.
- Check that transitions work in both directions and that content remains readable during entrance and exit phases.
- Review console errors, image loading, layout overflow, and interaction hit targets.
- Run the production build before committing. Report known warnings rather than hiding them.
- Keep changes on the requested feature branch. Do not merge or publish without explicit approval.
