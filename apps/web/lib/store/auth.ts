import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  isAdmin?: boolean;
  phone?: string | null;
  phoneVerified?: boolean;
  image?: string | null;
  profileCompleted?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      
      // Actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },
      
      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'digidocs-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);