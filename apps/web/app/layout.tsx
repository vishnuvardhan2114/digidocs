import "@ui/styles/globals.css";
import type { Metadata } from "next";
import { Lexend, Caveat } from "next/font/google";
import { Toaster } from "@ui/components/ui/sonner";

const lexend = Lexend({ 
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const caveat = Caveat({ 
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DigiDocs",
  description: "Digital document management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} ${caveat.variable} font-lexend bg-gray-50 min-h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
