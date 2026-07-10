import { LayeredHeroExperience } from "./components/LayeredHeroExperience";
import { Navbar } from "./components/Navbar";
import { GoldBurnTransition } from "./components/GoldBurnTransition";
import { PostHeroEditorialShell } from "./components/PostHeroEditorialShell";
import { LandmarkSection } from "./components/LandmarkSection";
import { OfferingsScrollSection } from "./components/OfferingsScrollSection";
import { InvestorModelsSection } from "./components/InvestorModelsSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <LayeredHeroExperience />
      <PostHeroEditorialShell>
        <GoldBurnTransition direction="bottom-to-top">
          <LandmarkSection />
        </GoldBurnTransition>
        <OfferingsScrollSection />
        <InvestorModelsSection />
      </PostHeroEditorialShell>
      <CTASection />
      <Footer />
    </>
  );
}
