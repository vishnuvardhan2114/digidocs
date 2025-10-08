"use client";

import { useEffect } from 'react';
import { useAuthStore, useUIStore } from '@/lib/store';
import { getSession } from '@/lib/auth/actions';
import { User } from '@/lib/store';

export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setShowProfileModal = useUIStore((state) => state.setShowProfileCompletionModal);

  useEffect(() => {
    const syncSession = async () => {
      try {
        const { user } = await getSession();

        if (user) {
          setUser(user as User);

          const needsProfileCompletion = !(user as User).profileCompleted && !(user as User).phone;
          
          if (needsProfileCompletion) {
            setShowProfileModal(true);
          } else {
            setShowProfileModal(false);
          }
        } else {
          clearUser();
          setShowProfileModal(false);
        }
      } catch (error) {
        console.error('Failed to sync session:', error);
        clearUser();
        setShowProfileModal(false);
      }
    };

    syncSession();
  }, [setUser, clearUser, setShowProfileModal]);

  return <>{children}</>;
}

