export const revenueModels = [
  {
    id: "stability",
    number: "01",
    selector: "Stability",
    label: "Long-term lease",
    title: ["Stability,", "structured over time."],
    description: "Long-duration occupancy designed around predictable use, professional management and consistent operation.",
    profile: [["Income character", "Stable"], ["Investor involvement", "Lower"], ["Occupancy structure", "Long duration"]],
    closing: "Built for investors who value consistency before complexity.",
    comparison: "Stable continuity",
    image: "/assets/revenue-architecture/revenue-stability.webp",
    imageSmall: "/assets/revenue-architecture/revenue-stability-small.webp",
  },
  {
    id: "anchor",
    number: "02",
    selector: "Anchor",
    label: "Institutional anchor",
    title: ["Secure the base.", "Preserve the upside."],
    description: "A major occupier establishes the foundation while the remaining destination retains room for additional uses and income streams.",
    profile: [["Base occupancy", "Established"], ["Ramp-up exposure", "Reduced"], ["Remaining potential", "Retained"]],
    closing: "A stable foundation without surrendering the rest of the opportunity.",
    comparison: "Secure foundation",
    image: "/assets/revenue-architecture/revenue-anchor.webp",
    imageSmall: "/assets/revenue-architecture/revenue-anchor-small.webp",
  },
  {
    id: "blended",
    number: "03",
    selector: "Diversification",
    label: "Mixed-use blended",
    title: ["Many uses.", "One balanced", "income system."],
    description: "Offices, flexible work, dining and supporting facilities operate through different rhythms within one connected destination.",
    profile: [["Income character", "Diversified"], ["Activity window", "Extended"], ["Operational complexity", "Higher"]],
    closing: "Different revenue rhythms supporting one connected asset.",
    comparison: "Diversified activity",
    image: "/assets/revenue-architecture/revenue-blended.webp",
    imageSmall: "/assets/revenue-architecture/revenue-blended-small.webp",
  },
  {
    id: "exit",
    number: "04",
    selector: "Exit",
    label: "Institutional exit",
    title: ["Build.", "Stabilise.", "Transfer."],
    description: "An institutional-grade asset prepared for long-hold capital, portfolio acquisition or a structured ownership transition.",
    profile: [["Value event", "Transfer"], ["Asset condition", "Stabilised"], ["Buyer profile", "Institutional"]],
    closing: "From development opportunity to an investable institutional asset.",
    comparison: "Structured transfer",
    image: "/assets/revenue-architecture/revenue-exit.webp",
    imageSmall: "/assets/revenue-architecture/revenue-exit-small.webp",
  },
];

export const revenueAssets = {
  master: "/assets/revenue-architecture/revenue-master.webp",
  masterSmall: "/assets/revenue-architecture/revenue-master-small.webp",
};

export const revenueTimeline = {
  handoff: [0, 0.105],
  intro: [0.105, 0.19],
  models: [
    { story: [0.19, 0.255], hold: [0.255, 0.31], transition: [0.31, 0.35] },
    { story: [0.35, 0.415], hold: [0.415, 0.47], transition: [0.47, 0.51] },
    { story: [0.51, 0.575], hold: [0.575, 0.63], transition: [0.63, 0.67] },
    { story: [0.67, 0.735], hold: [0.735, 0.79], transition: [0.79, 0.83] },
  ],
  comparison: [0.83, 0.94],
  closing: [0.94, 1],
};

export const capitalProfile = [
  { key: "priority", label: "Priority", values: ["Stability", "Balance", "Flexibility"] },
  { key: "involvement", label: "Involvement", values: ["Passive", "Collaborative", "Active"] },
  { key: "horizon", label: "Horizon", values: ["Hold", "Adapt", "Exit"] },
];
