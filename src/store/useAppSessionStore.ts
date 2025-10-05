import { create } from "zustand";
import { MarkingResult } from "../types";

export type SessionStatus = "in-progress" | "abandoned" | "completed";

export interface QuestionTiming {
  startedAt: number;
  completedAt?: number;
}

export interface SessionHistory {
  sessionId: string;
  currentUserStep: number | null;
  markingResults: { [questionIndex: number]: MarkingResult };
  questionTimings: { [questionIndex: number]: QuestionTiming };
  startedAt: number;
  sessionStatus: SessionStatus;
  bestStreak: number;
  completedAt?: number;
}

interface AppState {
  currentSession: SessionHistory | null;
  sessionHistory: { [sessionId: string]: SessionHistory };
}

interface AppActions {
  setNextStep: () => void;
  setCurrentUserStep: (sessionStep: number | null) => void;
  setMarkingResult: (questionIndex: number, result: MarkingResult) => void;
  updateBestStreak: (currentStreak: number) => void;
  startQuestionTiming: (questionIndex: number, time?: number) => void;
  completeQuestionTiming: (questionIndex: number, time?: number) => void;
  clearUserSession: () => void;
  startNewSession: (sessionId: string, startTime?: number) => void;
  commitCurrentSession: (status: SessionStatus) => void;
  loadSession: (sessionId: string) => void;
  getSessionHistory: (sessionId: string) => SessionHistory | undefined;
}

export const useAppSessionStore = create<AppState & AppActions>((set, get) => ({
  // State
  currentSession: null,
  sessionHistory: {},

  // Actions
  setNextStep: () =>
    set((state) => ({
      currentSession: state.currentSession
        ? {
            ...state.currentSession,
            currentUserStep: (state.currentSession.currentUserStep || 0) + 1,
          }
        : null,
    })),
  setCurrentUserStep: (sessionStep: number | null) =>
    set((state) => ({
      currentSession: state.currentSession
        ? {
            ...state.currentSession,
            currentUserStep: sessionStep,
          }
        : null,
    })),
  setMarkingResult: (questionIndex: number, result: MarkingResult) =>
    set((state) => ({
      currentSession: state.currentSession
        ? {
            ...state.currentSession,
            markingResults: {
              ...state.currentSession.markingResults,
              [questionIndex]: result,
            },
          }
        : null,
    })),
  updateBestStreak: (currentStreak: number) =>
    set((state) => ({
      currentSession: state.currentSession
        ? {
            ...state.currentSession,
            bestStreak: Math.max(state.currentSession.bestStreak, currentStreak),
          }
        : null,
    })),
  startQuestionTiming: (questionIndex: number, time?: number) =>
    set((state) => ({
      currentSession: state.currentSession
        ? {
            ...state.currentSession,
            questionTimings: {
              ...state.currentSession.questionTimings,
              [questionIndex]: {
                startedAt: time || Date.now(),
              },
            },
          }
        : null,
    })),
  completeQuestionTiming: (questionIndex: number, time?: number) =>
    set((state) => {
      if (!state.currentSession) return state;

      const existingTiming = state.currentSession.questionTimings[questionIndex];
      if (!existingTiming) return state;

      return {
        currentSession: {
          ...state.currentSession,
          questionTimings: {
            ...state.currentSession.questionTimings,
            [questionIndex]: {
              ...existingTiming,
              completedAt: time || Date.now(),
            },
          },
        },
      };
    }),
  clearUserSession: () =>
    set({
      currentSession: null,
    }),
  startNewSession: (sessionId: string, startTime: number = Date.now()) =>
    set({
      currentSession: {
        sessionId,
        currentUserStep: 0,
        markingResults: {},
        questionTimings: {},
        startedAt: startTime,
        sessionStatus: "in-progress",
        bestStreak: 0,
      },
    }),
  commitCurrentSession: (status: SessionStatus) =>
    set((state) => {
      if (!state.currentSession) return state;

      const completedSession: SessionHistory = {
        ...state.currentSession,
        sessionStatus: status,
        completedAt: Date.now(),
      };

      return {
        currentSession: null,
        sessionHistory: {
          ...state.sessionHistory,
          [state.currentSession.sessionId]: completedSession,
        },
      };
    }),
  loadSession: (sessionId: string) =>
    set((state) => {
      const session = state.sessionHistory[sessionId];
      if (!session) return state;

      return {
        currentSession: {
          ...session,
          sessionStatus: "in-progress",
        },
      };
    }),
  getSessionHistory: (sessionId: string) => {
    return get().sessionHistory[sessionId];
  },
}));
