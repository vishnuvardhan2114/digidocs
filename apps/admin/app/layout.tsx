import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@ui/styles/globals.css";
import { AuthSyncProvider } from "./providers/auth-sync-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for DigiDocs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSyncProvider>
          {children}
        </AuthSyncProvider>
      </body>
    </html>
  );
}
