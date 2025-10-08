"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialProviders from "./SocialProviders";
import { useAuthStore } from "@/lib/store";
import { signIn, signUp } from "@/lib/auth/actions";
import { User } from "@/lib/store";

type Props = {
  mode: "sign-in" | "sign-up";
};

export default function AuthForm({ mode }: Props) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = mode === "sign-up" 
          ? await signUp(formData)
          : await signIn(formData);

        if (result.success && result.user) {
          // Update Zustand store
          setUser(result.user as User);
          
          // Redirect to dashboard
          router.push("/");
          router.refresh();
        } else {
          setError(result.error || "Authentication failed");
        }
      } catch (err: any) {
        console.error("Auth error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-[14px] leading-[20px] font-medium text-[#757575]">
          {mode === "sign-in" ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={mode === "sign-in" ? "/sign-up" : "/sign-in"}
            className="underline"
          >
            {mode === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
        <h1 className="mt-3 text-[24px] leading-[30px] font-medium text-[#111111]">
          {mode === "sign-in" ? "Welcome Back!" : "Join DigiDocs Today!"}
        </h1>
        <p className="mt-1 text-[16px] leading-[24px] font-normal text-[#757575]">
          {mode === "sign-in"
            ? "Sign in to continue your journey"
            : "Create your account to start your journey"}
        </p>
      </div>

      <SocialProviders variant={mode} />

      <div className="flex items-center gap-4">
        <hr className="h-px w-full border-0 bg-[#e5e5e5]" />
        <span className="shrink-0 text-[14px] leading-[20px] font-medium text-[#757575]">
          Or {mode === "sign-in" ? "sign in" : "sign up"} with
        </span>
        <hr className="h-px w-full border-0 bg-[#e5e5e5]" />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "sign-up" && (
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="text-[14px] leading-[20px] font-medium text-[#111111]"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-3 text-[16px] leading-[24px] font-normal text-[#111111] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#111111]/10"
              autoComplete="name"
              required
              disabled={isPending}
            />
          </div>
        )}

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-[14px] leading-[20px] font-medium text-[#111111]"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            className="w-full rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-3 text-[16px] leading-[24px] font-normal text-[#111111] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#111111]/10"
            autoComplete="email"
            required
            disabled={isPending}
          />
        </div>

        {mode === "sign-up" && (
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="text-[14px] leading-[20px] font-medium text-[#111111]"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="9874561230"
              className="w-full rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-3 text-[16px] leading-[24px] font-normal text-[#111111] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#111111]/10"
              autoComplete="tel"
              pattern="^(\+?91|91)?[6-9]\d{9}$"
              title="Enter a valid Indian mobile number (10 digits, starting with 6-9)"
              required
              disabled={isPending}
            />
          </div>
        )}

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-[14px] leading-[20px] font-medium text-[#111111]"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              placeholder="minimum 8 characters"
              className="w-full rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-3 pr-12 text-[16px] leading-[24px] font-normal text-[#111111] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#111111]/10"
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              minLength={8}
              required
              disabled={isPending}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 text-[14px] leading-[20px] font-medium text-[#757575] disabled:opacity-50"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              disabled={isPending}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-[#111111] px-6 py-3 text-[16px] leading-[24px] font-medium text-[#ffffff] hover:bg-[#757575] focus:outline-none focus:ring-2 focus:ring-[#111111]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={isPending}
        >
          {isPending 
            ? "Loading..." 
            : mode === "sign-in" ? "Sign In" : "Sign Up"
          }
        </button>

        {mode === "sign-up" && (
          <p className="text-center text-[12px] leading-[18px] font-normal text-[#757575]">
            By signing up, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        )}
      </form>
    </div>
  );
}