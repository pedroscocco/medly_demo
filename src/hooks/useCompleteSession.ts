import { useMutation, useQueryClient } from "@tanstack/react-query";
import myfetch from "../api/myfetch";

type SessionCompleteParams = {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentPerQuestion: number[]; // seconds per question
  questionStreak: number; // max consecutive correct in this session
  completedAt: string; // ISO timestamp
};

export function useCompleteSession() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: SessionCompleteParams) => {
      const response = await myfetch("/sessions/complete", "POST", params);
      if (response.code === "200") {
        return response.data;
      }
      throw new Error(response.error || "Failed to complete session");
    },
    onSuccess: (data) => {
      // Update the current user data in the cache if available
      if (data?.updatedUser) {
        queryClient.setQueryData(["currentUser"], data.updatedUser);
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
    },
  });

  return {
    completeSession: mutation.mutate,
    isCompleting: mutation.isPending,
    error: mutation.error,
  };
}
