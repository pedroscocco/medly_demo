import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "../../authentication/AuthSessionProvider";
import { MarkingResult } from "../../types";
import { calculateTimeSpentPerQuestion } from "../../utils/sessionHelpers";
import { apiClient } from "../apiClient";

type SessionCompleteParams = {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentPerQuestion: number[]; // seconds per question
  questionStreak: number; // max consecutive correct in this session
  completedAt: string; // ISO timestamp
};

interface SessionData {
  sessionId: string;
  questionTimings: {
    [questionIndex: number]: { startedAt: number; completedAt?: number };
  };
  markingResults: { [questionIndex: number]: MarkingResult };
  bestStreak: number;
}

export function useCompleteSession() {
  // ===== Routing & Data =====
  const queryClient = useQueryClient();

  // ===== Hooks =====
  const { handleTokenExpiration } = useAuthSession();

  // ===== Mutations =====
  const mutation = useMutation({
    mutationFn: async (params: SessionCompleteParams) => {
      const { data, error } = await apiClient.post<any>("/sessions/complete", params);

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      // Update the current user data in the cache if available
      if (data?.updatedUser) {
        queryClient.setQueryData(["currentUser"], data.updatedUser);
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
    },
    onError: (error) => {
      // Check if error is an ApiError with token issues
      if (error && typeof error === "object" && "message" in error) {
        const apiError = error as { message: string };
        if (
          apiError.message.includes("Token expired") ||
          apiError.message.includes("Invalid token")
        ) {
          handleTokenExpiration();
        }
      }
    },
  });

  // ===== Helper Functions =====
  const prepareSessionData = (
    sessionData: SessionData,
    totalQuestions: number
  ): SessionCompleteParams => {
    const timeSpentPerQuestion = calculateTimeSpentPerQuestion(
      sessionData.questionTimings
    );

    const correctAnswers = Object.values(sessionData.markingResults).filter(
      (result) => result.isCorrect
    ).length;

    return {
      sessionId: sessionData.sessionId,
      totalQuestions,
      correctAnswers,
      timeSpentPerQuestion,
      questionStreak: sessionData.bestStreak,
      completedAt: new Date().toISOString(),
    };
  };

  return {
    completeSession: mutation.mutate,
    prepareSessionData,
    isCompleting: mutation.isPending,
    error: mutation.error,
  };
}
