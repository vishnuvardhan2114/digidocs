"use client";

import { useState, useTransition } from "react";
import { useAuthStore, useUIStore } from "@/lib/store";
import { completeProfile } from "@/lib/actions/profile";
import { User } from "@/lib/store";

export default function ProfileCompletionModal() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const showModal = useUIStore((state) => state.showProfileCompletionModal);
  const setShowModal = useUIStore((state) => state.setShowProfileCompletionModal);
  
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!showModal || !user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await completeProfile(formData);

        if (result.success && result.user) {
          setUser(result.user as User);
          
          setShowModal(false);
        } else {
          setError(result.error || "Failed to update profile");
        }
      } catch (err: any) {
        console.error("Profile completion error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm opacity-90">Welcome!</p>
                <p className="font-semibold text-lg">{user.name}</p>
              </div>
            </div>
            <h2 id="profile-modal-title" className="text-xl font-bold">
              One More Step...
            </h2>
            <p className="text-sm opacity-90 mt-1">
              We need your phone number to complete your profile
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="modal-phone"
                  className="block text-sm font-medium text-gray-900"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    pattern="^(\+?91|91)?[6-9]\d{9}$"
                    title="Enter a valid Indian mobile number (10 digits, starting with 6-9)"
                    required
                    disabled={isPending}
                    autoComplete="tel"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enter with or without country code (+91/91)
                </p>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Completing Profile...
                  </span>
                ) : (
                  "Complete Profile & Continue"
                )}
              </button>
            </form>

            <p className="mt-4 text-xs text-center text-gray-500">
              We use this for order updates and identity verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

