import notifee, { AndroidImportance } from "@notifee/react-native";

const NOTIFICATION_ID = "practice-session";
const CHANNEL_ID = "practice-session-channel";

// Register foreground service
notifee.registerForegroundService((notification) => {
  return new Promise(() => {
    // Keep the foreground service running
    // It will be stopped when endSession is called
  });
});

async function ensureChannel() {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: "Practice Session",
    importance: AndroidImportance.HIGH,
  });
}

export function useOngoingActivity() {
  const startSession = (
    lessonName: string,
    startTime: number,
    totalQuestions: number
  ) => {
    // Fire-and-forget to match iOS synchronous interface
    (async () => {
      await ensureChannel();

      await notifee.displayNotification({
        id: NOTIFICATION_ID,
        title: "Practice Session",
        body: `${lessonName} • ${totalQuestions} questions`,
        android: {
          channelId: CHANNEL_ID,
          asForegroundService: true,
          ongoing: true,
          pressAction: {
            id: "default",
          },
        },
      });
    })();
  };

  const updateProgress = (
    totalQuestions: number,
    completedCount: number,
    currentStreak: number,
    questionStartTime?: number
  ) => {
    // TODO: Implement progress update
  };

  const updateTimer = (questionStartTime?: number) => {
    // TODO: Implement timer update
  };

  const endSession = () => {
    // Fire-and-forget to match iOS synchronous interface
    (async () => {
      await notifee.cancelNotification(NOTIFICATION_ID);
      await notifee.stopForegroundService();
    })();
  };

  return {
    startSession,
    updateProgress,
    updateTimer,
    endSession,
  };
}
