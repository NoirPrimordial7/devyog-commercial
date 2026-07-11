import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayeredHeroExperience } from "./components/LayeredHeroExperience";
import { Navbar } from "./components/Navbar";
import { PostHeroEditorialShell } from "./components/PostHeroEditorialShell";
import { LandmarkSection } from "./components/LandmarkSection";
import { OfferingsScrollSection } from "./components/OfferingsScrollSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { InvestmentJourney } from "./components/InvestmentJourney";

const InvestmentOpportunityPage = lazy(() => import("./pages/InvestmentOpportunityPage"));
const LocationAccessibilityPage = lazy(() => import("./pages/LocationAccessibilityPage"));
const DemandEcosystemPage = lazy(() => import("./pages/DemandEcosystemPage"));
const LongTermValuePage = lazy(() => import("./pages/LongTermValuePage"));

function Homepage() {
  return (
    <>
      <Navbar />
      <LayeredHeroExperience />
      <PostHeroEditorialShell>
        <LandmarkSection />
        <OfferingsScrollSection />
        <InvestmentJourney />
      </PostHeroEditorialShell>
      <CTASection />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" aria-label="Loading investment story" />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/investment-opportunity" element={<InvestmentOpportunityPage />} />
        <Route path="/location-accessibility" element={<LocationAccessibilityPage />} />
        <Route path="/demand-ecosystem" element={<DemandEcosystemPage />} />
        <Route path="/long-term-value" element={<LongTermValuePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
