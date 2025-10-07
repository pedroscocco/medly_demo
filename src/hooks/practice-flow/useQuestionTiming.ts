import { useLayoutEffect } from "react";
import { useAppSessionStore } from "../../store/useAppSessionStore";
import { useOngoingActivity } from "../ongoing_activity/useOngoingActivity";

export function useQuestionTiming(currentUserStep: number) {
  // ===== Hooks =====
  const ongoingActivity = useOngoingActivity();

  // ===== Store State & Actions =====
  const currentSession = useAppSessionStore((state) => state.currentSession);
  const startQuestionTiming = useAppSessionStore(
    (state) => state.startQuestionTiming
  );
  const completeQuestionTiming = useAppSessionStore(
    (state) => state.completeQuestionTiming
  );

  // ===== Derived State =====
  const currentQuestionStartTiming =
    currentSession.questionTimings[currentUserStep]?.startedAt;

  // ===== Effects =====
  // Start timing when question becomes visible
  useLayoutEffect(() => {
    if (!currentQuestionStartTiming) {
      const now = Date.now();
      startQuestionTiming(currentUserStep, now);
      // Update Live Activity with new question timer
      ongoingActivity.updateTimer(now);
    }
  }, [
    currentQuestionStartTiming,
    currentUserStep,
    ongoingActivity,
    startQuestionTiming,
  ]);

  // ===== Handlers and Callbacks =====
  const completeCurrentTiming = (completionTime: number) => {
    completeQuestionTiming(currentUserStep, completionTime);
  };

  return {
    currentQuestionStartTiming,
    completeCurrentTiming,
  };
}
