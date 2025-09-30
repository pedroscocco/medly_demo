import { create } from 'zustand';

interface AppState {
  currentSessionStep: number;
}

interface AppActions {
  setCurrentSessionStep: (sessionStep: number) => void;
  clearSession: () => void;
}

export const useAppSessionStore = create<AppState & AppActions>((set) => ({
  // State
  currentSessionStep: 0,

  // Actions
  setCurrentSessionStep: (sessionStep: number) =>
    set({
      currentSessionStep: sessionStep,
    }),

  clearSession: () =>
    set({
      currentSessionStep: 0,
    }),
}));