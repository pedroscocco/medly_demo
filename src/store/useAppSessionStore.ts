import { create } from 'zustand';

interface AppState {
  currentUserStep: number | null;
}

interface AppActions {
  setNextStep: () => void;
  setCurrentUserStep: (sessionStep: number | null) => void;
  clearUserSession: () => void;
}

export const useAppSessionStore = create<AppState & AppActions>((set) => ({
  // State
  currentUserStep: 0,
  // Actions
  setNextStep: () =>
    set((state) => ({
      currentUserStep: (state.currentUserStep || 0) + 1,
    })),
  setCurrentUserStep: (sessionStep: number | null) =>
    set({
      currentUserStep: sessionStep,
    }),
  clearUserSession: () =>
    set({
      currentUserStep: null,
    }),
}));