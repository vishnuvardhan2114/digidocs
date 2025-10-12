"use client";

import OneTap from "@/app/components/OneTap";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { Button } from "@ui/components/ui/button";
import { createZohoLead } from "@/lib/zoho/lead-service";
import { User } from "@repo/database";

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
      <OneTap />
      <Header />
      <div className="pt-24 md:pt-28">
        <HeroSection />
      </div>
      <Button onClick={handleCreateZohoLead}>Create Lead in ZOHO</Button>
    </div>
  );
}
