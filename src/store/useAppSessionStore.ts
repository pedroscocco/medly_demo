import { create } from "zustand";
import { MarkingResult } from "../types";

interface AppState {
  currentUserStep: number | null;
  markingResults: { [questionIndex: number]: MarkingResult };
}

interface AppActions {
  setNextStep: () => void;
  setCurrentUserStep: (sessionStep: number | null) => void;
  setMarkingResult: (questionIndex: number, result: MarkingResult) => void;
  clearUserSession: () => void;
}

export const useAppSessionStore = create<AppState & AppActions>((set) => ({
  // State
  currentUserStep: 0,
  markingResults: {},

  // Actions
  setNextStep: () =>
    set((state) => ({
      currentUserStep: (state.currentUserStep || 0) + 1,
    })),
  setCurrentUserStep: (sessionStep: number | null) =>
    set({
      currentUserStep: sessionStep,
    }),
  setMarkingResult: (questionIndex: number, result: MarkingResult) =>
    set((state) => ({
      markingResults: {
        ...state.markingResults,
        [questionIndex]: result,
      },
    })),
  clearUserSession: () =>
    set({
      currentUserStep: null,
      markingResults: {},
    }),
}));
