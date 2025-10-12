"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import SimpleHeader from "./SimpleHeader";

const ConditionalHeader = () => {
  const pathname = usePathname();

  // Hide header on auth pages
  if(pathname === '/sign-in' || pathname === '/sign-up') {
    return null;
  }
  
  // Check if we're on a service details page or document service page
  const isServiceDetailsPage = pathname.startsWith('/services/') && 
    (pathname.includes('/document-service/') || 
     pathname.match(/\/services\/[^/]+$/));
  
  // Use SimpleHeader for service details pages, Header for everything else
  if (isServiceDetailsPage) {
    return <SimpleHeader />;
  }
  
  return <Header />;
};

export default ConditionalHeader;
