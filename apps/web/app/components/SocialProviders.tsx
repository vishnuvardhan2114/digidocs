"use client";

import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";

type Props = { variant?: "sign-in" | "sign-up" };

export default function SocialProviders({ variant = "sign-in" }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-400 bg-gray-50 px-4 py-3 text-body-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label={`${variant === "sign-in" ? "Continue" : "Sign up"} with Google`}
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <Image src="/google.svg" alt="" width={18} height={18} />
            <span>Continue with Google</span>
          </>
        )}
      </button>
    </div>
  );
}