import { create } from 'zustand';

interface UIState {
  // Global loading
  isGlobalLoading: boolean;
  
  // Profile completion modal
  showProfileCompletionModal: boolean;
  
  // Actions
  setGlobalLoading: (loading: boolean) => void;
  setShowProfileCompletionModal: (show: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isGlobalLoading: false,
  showProfileCompletionModal: false,
  
  // Actions
  setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),
  
  setShowProfileCompletionModal: (show) => 
    set({ showProfileCompletionModal: show }),
}));
