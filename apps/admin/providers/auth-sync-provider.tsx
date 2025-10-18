"use client";

import { useEffect } from 'react';
import { useAuthStore, useUIStore } from '@/lib/store';
import { getSession } from '@/lib/auth/actions';
import { User } from '@/lib/store';

export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setShowProfileModal = useUIStore((state) => state.setShowProfileCompletionModal);

  useEffect(() => {
    const syncSession = async () => {
      setLoading(true);
      try {
        const { user } = await getSession();

        if (user && (user as User).isAdmin) {
          setUser(user as User);

          // Admin users are considered to have completed profile
          setShowProfileModal(false);
        } else {
          clearUser();
          setShowProfileModal(false);
        }
      } catch (error) {
        console.error('Failed to sync admin session:', error);
        clearUser();
        setShowProfileModal(false);
      }
    };

    syncSession();
  }, [setUser, clearUser, setLoading, setShowProfileModal]);

  return <>{children}</>;
}
