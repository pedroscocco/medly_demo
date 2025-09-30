import { create } from 'zustand';

interface AppState {
  currentSessionStep: number;
}

interface AppActions {
  setNextStep: () => void;
  setCurrentSessionStep: (sessionStep: number) => void;
  clearSession: () => void;
}

export const useAppSessionStore = create<AppState & AppActions>((set) => ({
  // State
  currentSessionStep: 0,

  // Actions
  setNextStep: () =>
    set((state) => ({
      currentSessionStep: state.currentSessionStep + 1,
    })),
  setCurrentSessionStep: (sessionStep: number) =>
    set({
      currentSessionStep: sessionStep,
    }),

  clearSession: () =>
    set({
      currentSessionStep: 0,
    }),
}));