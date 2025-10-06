export function useOngoingActivity() {
  const startSession = (
    lessonName: string,
    startTime: number,
    totalQuestions: number
  ) => {
    // TODO: Implement Android ongoing notification
  };

  const updateProgress = (
    totalQuestions: number,
    completedCount: number,
    currentStreak: number,
    questionStartTime?: number
  ) => {
    // TODO: Implement Android ongoing notification update
  };

  const updateTimer = (questionStartTime?: number) => {
    // TODO: Implement Android timer update
  };

  const endSession = () => {
    // TODO: Implement Android notification dismissal
  };

  return {
    startSession,
    updateProgress,
    updateTimer,
    endSession,
  };
}
