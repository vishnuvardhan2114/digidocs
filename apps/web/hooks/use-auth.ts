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
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (requireAuth && !isAuthenticated && !isLoading) {
      router.push(redirectTo);
    }
  }, [requireAuth, isAuthenticated, isLoading, redirectTo, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isGuest: !isAuthenticated,
  };
}

