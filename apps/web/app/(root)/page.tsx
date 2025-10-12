
import HeroSection from "../components/HeroSection";
import Expertise from "../components/Expertise";
import HowItWorks from "../components/HowItWorks";
import PopularServices from "../components/PopularServices";
import CommunitySection from "../components/CommunitySection";
import TestimonialsBanner from "../components/TestimonialsBanner";
import TrustSection from "../components/TrustSection";
import FAQSection from "../components/FAQSection";

export default function HomePage() {
  
  return (
    <div className="min-h-screen">
      <div className="pt-12 md:pt-28">
        <HeroSection />
        <Expertise />
        <HowItWorks />
        <PopularServices />
        <TestimonialsBanner />
        <TrustSection />
        <FAQSection />
        <CommunitySection />
      </div>
    </div>
  );
}
