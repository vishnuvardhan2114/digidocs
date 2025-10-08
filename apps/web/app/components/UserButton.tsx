"use client";

import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useAuthStore } from "@/lib/store";

/**
 * User Button Component
 * Shows user info and sign out button when authenticated
 * Shows sign in/sign up buttons when not authenticated
 */
export default function UserButton() {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOut();
      if (result.success) {
        clearUser();
        router.push("/");
        router.refresh();
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <a
          href="/sign-in"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Sign In
        </a>
        <a
          href="/sign-up"
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Sign Up
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 hover:bg-gray-200"
      >
        <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-900">
          {user?.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20">
            <div className="p-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="p-2">
              <button
                onClick={handleSignOut}
                disabled={isPending}
                className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                {isPending ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

