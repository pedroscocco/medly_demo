import { NativeModule, requireNativeModule } from "expo";

export type ExpoLiveActivityModuleEvents = {
  onLiveActivityCancel: () => void;
};

declare class ExpoLiveActivityModule extends NativeModule<ExpoLiveActivityModuleEvents> {
  areActivitiesEnabled(): boolean;
  isActivityInProgress(): boolean;
  startActivity(lessonName: string, lessonStartTime: number | null, questionsLeft: number, currentStreak: number): Promise<boolean>;
  updateActivity(questionsLeft: number, currentStreak: number, lessonStartTime: number | null): void;
  updateActivityTimer(lessonStartTime: number | null): void;
  endActivity(): void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoLiveActivityModule>("ExpoLiveActivity");
