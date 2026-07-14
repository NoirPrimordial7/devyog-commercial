# Devyog Design and Motion Rules

These instructions are mandatory for every Codex/ChatGPT coding task in this repository.

## Core principle

Do not redesign from imagination first. Preserve the current approved visual system, research proven references, then make targeted improvements.

The website is a premium luxury commercial real-estate experience. Every change must feel cinematic, architectural, calm, expensive, readable, and consistent with the sections immediately before and after it.

## Mandatory workflow before any design or animation change

Whenever a task involves UI, layout, visual design, responsive design, scrolling, transitions, animation, interaction, or a new section, complete this workflow before editing code:

1. Inspect the current branch and recent Git history.
2. Run the current page and capture screenshots of the exact section being changed.
3. Inspect the previous and next sections so the new work connects correctly.
4. Search the web for current, relevant references before proposing the implementation.
5. Inspect suitable component and animation libraries before building custom code.
6. Write a short internal implementation plan that identifies:
   - what is already working and must remain
   - the exact visual problem
   - references selected and why
   - the simplest interaction model that solves the problem
   - desktop and mobile behavior
   - performance and reduced-motion behavior
7. Implement only after this research and inspection are complete.
8. Run visual QA with browser screenshots at desktop and mobile sizes.

Do not skip research because the task appears small.

## Required design-reference sources

For visual direction, inspect relevant examples from several of these sources when available:

- Awwwards Sites of the Day / Month / Year
- Godly
- SiteInspire
- Land-book
- Lapa Ninja
- One Page Love
- curated premium architecture, luxury, editorial, and real-estate websites

Reference principles and interaction patterns, not exact branded artwork or copied page designs.

## Required component and interaction sources

Before creating a custom component or animation, check whether a suitable high-quality pattern already exists in:

- Motion / Framer Motion examples and documentation
- GSAP and ScrollTrigger examples when GSAP is already installed or justified
- Lenis documentation for smooth-scroll integration when already used
- React Aria for accessible interaction patterns
- Radix UI primitives
- shadcn/ui
- 21st.dev
- Aceternity UI
- Magic UI
- Cult UI
- React Bits
- Hover.dev
- Codrops articles and demos

Do not install a library only to use one decorative effect. Prefer adapting a small proven pattern to the existing stack.

## Browsing and MCP rule

When browsing, web search, browser automation, GitHub inspection, image generation, screenshots, or a component-library MCP is available, use it instead of guessing.

For every design or animation task:

- browse current references
- inspect the live implementation
- inspect actual library documentation
- verify package APIs against the installed version
- use browser screenshots to judge the result

Never claim a reference, API, component, or animation pattern was inspected unless it was actually opened.

If browsing or MCP tools are unavailable in the current session, state that limitation in the final report and continue using repository evidence only. Do not fabricate research.

## Preserve approved work

- Treat the current checked-out branch as the approved baseline unless the user explicitly names another commit or branch.
- Compare before and after screenshots.
- Do not replace an approved composition with a totally new concept when a targeted improvement is requested.
- Do not alter unrelated completed sections.
- Do not delete existing assets or working code until the replacement is visually verified.
- Before major experimentation, create a backup branch or checkpoint commit.

## Design language

Maintain the Devyog visual identity:

- deep black and graphite backgrounds
- warm ivory editorial serif typography
- restrained copper or champagne-gold accents
- premium commercial architecture
- thin technical and architectural lines
- subtle depth, reflection, glass, and material texture
- generous but controlled negative space
- clear hierarchy and readable copy
- cinematic transitions that become still after completing

Avoid:

- generic SaaS cards
- blue corporate gradients
- fantasy or medieval styling
- heavy glow
- random particles
- excessive glassmorphism
- thick borders
- overlapping text and images
- giant empty scroll gaps
- repeated full-size building images
- animation for animation's sake

## Motion rules

Every animation must communicate one clear idea.

Use this structure for scroll storytelling:

1. enter
2. explain
3. settle
4. hold for reading
5. transition

After the visual explanation finishes, stop movement and provide a deliberate reading hold.

Prefer:

- transform and opacity
- masks and clip paths
- SVG line drawing
- line-based text reveals
- persistent visual anchors
- scroll-linked progress using MotionValues or GSAP timelines
- reversible motion when scrolling upward

Avoid:

- full-screen crossfades between nearly identical layouts
- constant floating or pulsing
- animation tied directly to every wheel tick without easing
- page transitions that expose blank space
- fast automatic movement before users can read
- duplicated elements during transitions
- letter-by-letter heading animation
- expensive per-frame React state updates

## Component-selection decision

Use this order:

1. Existing project component
2. Small adaptation of an existing project pattern
3. Accessible primitive from Radix UI or React Aria
4. Adapted pattern from a researched component library
5. Custom implementation only when the above options cannot satisfy the design

Any imported component must be restyled to match Devyog. Never paste a library demo unchanged.

## Image and asset rules

- Reuse approved project imagery when possible.
- Generate a new image only when the current asset cannot express the required concept.
- Match existing architecture, camera angle, lighting, color palette, and aspect ratio.
- Do not use different building identities within one continuous story.
- Use WebP or AVIF where practical.
- Set explicit dimensions and responsive sources.
- Avoid multiple full-resolution images visible at once.
- Do not add text inside generated images when live HTML can provide it.

## Responsive rules

Desktop and mobile must be intentionally designed, not scaled versions of each other.

For mobile:

- simplify the animation
- use normal document flow when sticky storytelling becomes cramped
- place heading, media, copy, and data in a readable sequence
- avoid tiny architectural labels
- prevent text and image overlap
- ensure touch targets are usable
- verify at 390x844, 375x812, 360x800, and 320x700

Also verify desktop at 1920x1080, 1600x900, 1440x900, 1366x768, and 1024x768.

## Accessibility and reduced motion

- Honor prefers-reduced-motion.
- Preserve all information when motion is disabled.
- Keep interactive elements keyboard accessible.
- Use visible focus states.
- Maintain readable contrast.
- Do not make scroll hijacking prevent normal navigation.

## Performance

- Prefer one persistent master visual with lightweight overlays.
- Avoid unnecessary Three.js, particles, WebGL, or large video backgrounds.
- Avoid React state updates on every frame.
- Lazy-load noncritical images.
- Use transform and opacity for animation.
- Verify no console errors, layout shifts, or broken image requests.

## Mandatory visual QA

For every UI or animation task:

1. run the site locally
2. inspect the exact changed state in the browser
3. capture before and after screenshots
4. inspect the transition midpoint, settled state, and exit state
5. test scrolling down and back up
6. inspect mobile
7. verify reduced motion
8. run the production build

Continue fixing when any of these are present:

- overlapping copy
- cropped architecture
- navigation covering content
- blank scroll gaps
- duplicate visual layers
- abrupt section handoffs
- low contrast
- detached panels
- unreadable mobile layout
- animation completing too quickly
- a component that looks copied from a library rather than designed for Devyog

## Delivery report

Every completed design task must report:

- branch and commit
- files changed
- references actually inspected
- component or animation sources considered
- what was preserved
- what was improved
- desktop and mobile behavior
- reduced-motion behavior
- screenshots reviewed
- build result
- any remaining limitations

A successful build is not enough. The task is complete only when the result looks intentional in the browser and integrates cleanly with the surrounding website.