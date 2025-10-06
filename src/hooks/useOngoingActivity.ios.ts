import LiveActivities from "@/modules/expo-live-activity";

export function useOngoingActivity() {
  const startSession = (
    lessonName: string,
    startTime: number,
    totalQuestions: number
  ) => {
    if (!LiveActivities.areActivitiesEnabled()) return;

    if (LiveActivities.isActivityInProgress()) {
      LiveActivities.endActivity();
    }

    LiveActivities.startActivity(
      lessonName,
      startTime / 1000,
      totalQuestions,
      0
    );
  };

  const updateProgress = (
    totalQuestions: number,
    completedCount: number,
    currentStreak: number,
    questionStartTime?: number
  ) => {
    if (
      !LiveActivities.areActivitiesEnabled() ||
      !LiveActivities.isActivityInProgress()
    ) {
      return;
    }

    const questionsLeft = totalQuestions - completedCount;
    const startTime = questionStartTime ? questionStartTime / 1000 : null;
    console.log("Updating Live Activity", { questionsLeft, currentStreak, startTime });
    LiveActivities.updateActivity(questionsLeft, currentStreak, startTime);
  };

  const updateTimer = (questionStartTime?: number) => {
    if (
      !LiveActivities.areActivitiesEnabled() ||
      !LiveActivities.isActivityInProgress()
    ) {
      return;
    }

    LiveActivities.updateActivityTimer(
      questionStartTime ? questionStartTime / 1000 : null
    );
  };

  const endSession = () => {
    LiveActivities.endActivity();
  };

  return {
    startSession,
    updateProgress,
    updateTimer,
    endSession,
  };
}
