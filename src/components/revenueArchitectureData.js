export const revenueModels = [
  {
    id: "stability", number: "01", selector: "Stability", label: "Long-term lease",
    title: ["Stability", "over time."],
    description: "Long-duration occupancy designed around predictable use, professional management and consistent operation.",
    profile: [["Income character", "Stable"], ["Investor involvement", "Lower"], ["Occupancy structure", "Long duration"], ["Revenue profile", "Predictable"], ["Risk profile", "Lower volatility"]],
    closing: "Built for investors who value consistency before complexity.",
    comparison: "Stable continuity",
  },
  {
    id: "anchor", number: "02", selector: "Anchor", label: "Institutional anchor",
    title: ["Secure the base.", "Preserve upside."],
    description: "A major occupier establishes the foundation while the remaining destination retains room for additional uses and income streams.",
    profile: [["Base occupancy", "Established"], ["Ramp-up exposure", "Reduced"], ["Remaining potential", "Retained"], ["Income character", "Anchored"], ["Flexibility", "Preserved"]],
    closing: "A stable foundation without surrendering the rest of the opportunity.",
    comparison: "Secure foundation",
  },
  {
    id: "blended", number: "03", selector: "Diversification", label: "Mixed-use blended",
    title: ["Diversify", "the rhythm."],
    description: "Offices, flexible work, dining and supporting facilities operate through different rhythms within one connected destination.",
    profile: [["Income character", "Diversified"], ["Activity window", "Extended"], ["Operational complexity", "Higher"], ["Occupancy mix", "Multiple"], ["Demand profile", "Distributed"]],
    closing: "Different revenue rhythms supporting one connected asset.",
    comparison: "Diversified activity",
  },
  {
    id: "exit", number: "04", selector: "Exit", label: "Institutional exit",
    title: ["Build.", "Stabilise.", "Transfer."],
    description: "An institutional-grade asset prepared for long-hold capital, portfolio acquisition or a structured ownership transition.",
    profile: [["Value event", "Transfer"], ["Asset condition", "Stabilised"], ["Income character", "Diversified"], ["Buyer profile", "Institutional"], ["Ownership path", "Transfer"], ["Readiness", "Exit ready"]],
    closing: "From development opportunity to an investable institutional asset.",
    comparison: "Structured transfer",
  },
];

export const revenueAssets = {
  master: "/assets/revenue-architecture-v2/revenue-master.webp",
  masterSmall: "/assets/revenue-architecture-v2/revenue-master-small.webp",
};

export const revenueTimeline = {
  intro: [0, 0.09],
  models: [
    { story: [0.09, 0.155], settle: [0.155, 0.17], hold: [0.17, 0.225], release: [0.225, 0.24], transition: [0.24, 0.285] },
    { story: [0.285, 0.35], settle: [0.35, 0.365], hold: [0.365, 0.42], release: [0.42, 0.435], transition: [0.435, 0.48] },
    { story: [0.48, 0.545], settle: [0.545, 0.56], hold: [0.56, 0.615], release: [0.615, 0.63], transition: [0.63, 0.675] },
    { story: [0.675, 0.74], settle: [0.74, 0.755], hold: [0.755, 0.81], release: [0.81, 0.825], transition: [0.825, 0.86] },
  ],
  comparisonEntry: [0.86, 0.89],
  comparison: [0.89, 0.95],
  closing: [0.95, 0.99],
  sectionExit: [0.99, 1],
};

export const capitalProfile = [
  { key: "priority", label: "Priority", values: ["Stability", "Balance", "Flexibility"] },
  { key: "involvement", label: "Involvement", values: ["Passive", "Collaborative", "Active"] },
  { key: "horizon", label: "Horizon", values: ["Hold", "Adapt", "Exit"] },
];

export const alignmentCopy = [
  "Prioritises steady use and lower operating involvement.",
  "Combines a secure occupancy base with retained flexibility.",
  "Balances flexible participation with diversified operating activity.",
  "Aligns a stabilised asset with a structured ownership transition.",
];
