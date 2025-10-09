
import OneTap from "@/app/components/OneTap";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  
  return (
    <div className="min-h-screen">
      <OneTap />
      <Header />
      <div className="pt-24 md:pt-28">
        <HeroSection />
      </div>
    </div>
  );
}
