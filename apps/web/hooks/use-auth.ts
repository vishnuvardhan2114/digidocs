"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

interface UseAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
}


export function useAuth(options: UseAuthOptions = {}) {
  const { requireAuth = false, redirectTo = '/sign-in' } = options;
  const router = useRouter();
  
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [requireAuth, isAuthenticated, redirectTo, router]);

  return {
    user,
    isAuthenticated,
    isGuest: !isAuthenticated,
  };
}

