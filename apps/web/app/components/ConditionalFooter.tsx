"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const ConditionalFooter = () => {
  const pathname = usePathname();

  // Hide footer on auth pages
  if(pathname === '/sign-in' || pathname === '/sign-up') {
    return null;
  }
  
  return <Footer />;
};

export default ConditionalFooter;

