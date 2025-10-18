"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store";
import { getSession } from "@/lib/auth/actions";

export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const syncAuth = async () => {
      try {
        const session = await getSession();
        if (session.user) {
          setUser(session.user as any);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to sync auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    syncAuth();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
