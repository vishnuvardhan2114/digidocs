"use client";

import HeroSection from "../components/HeroSection";
import { Button } from "@ui/components/ui/button";
import { createZohoLead } from "@/lib/zoho/lead-service";
import { User } from "@repo/database";
import Expertise from "../components/Expertise";
import HowItWorks from "../components/HowItWorks";
import PopularServices from "../components/PopularServices";
import CommunitySection from "../components/CommunitySection";
import TestimonialsBanner from "../components/TestimonialsBanner";
import TrustSection from "../components/TrustSection";
import FAQSection from "../components/FAQSection";

export default function HomePage() {
  const handleCreateZohoLead = async () => {
    try {
      const userObj: User = {
        id: "fae12345-1234-5678-9abc-def012345678",
        name: "John Doe",
        email: "johndoe@example.com",
        emailVerified: true,
        isAdmin: false,
        phone: "123-456-7890",
        phoneVerified: false,
        image: "https://example.com/avatar.png",
        profileCompleted: true,
        zohoLeadId: null,
        zohoLeadCreated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await createZohoLead(userObj);
    } catch (error) {
      console.log("Error occured create a lead in zoho", error);
    }
  };

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
      <Button onClick={handleCreateZohoLead}>Create Lead in ZOHO</Button>
    </div>
  );
}
