const requestedMediaMode = import.meta.env.VITE_MIXED_USE_HERO_MEDIA?.toLowerCase();

export const mixedUseHeroConfig = Object.freeze({
  mediaMode: requestedMediaMode === "image" ? "image" : "video",
  mixedUseStart: 0.32,
  decorativeExitStart: 0.18,
  decorativeExitEnd: 0.58,
  textExitStart: 0.28,
  textExitEnd: 0.68,
  videoFadeStart: 0.45,
  videoFadeEnd: 0.68,
  dissolveStart: 0.68,
  dissolveEnd: 1,
  incomingBufferHeight: Object.freeze({ desktop: 40, tablet: 32, mobile: 24 }),
  totalScrollDistance: 320,
  reducedScrollDistance: 190,
});

export const mixedUseHeroMedia = Object.freeze({
  staticBase: "/assets/mixed-use/aurum-atrium.png",
  motionVideo: "/assets/mixed-use/aurum-atrium-motion.mp4",
  exteriorBase: "/assets/hero/01.png",
  exteriorDecorative: "/assets/hero/03.png",
  mixedUseDecorative: "/assets/hero/08.png",
});
