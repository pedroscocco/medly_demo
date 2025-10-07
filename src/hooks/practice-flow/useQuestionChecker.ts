import { useAppSessionStore } from "../../store/useAppSessionStore";
import { MarkingResult, QuestionSpec } from "../../types";
import { calculateStreak } from "../../utils/sessionHelpers";
import { useOngoingActivity } from "../ongoing_activity/useOngoingActivity";
import { useMarkQuestion } from "./useMarkQuestion";

interface UseQuestionCheckerParams {
  currentUserStep: number;
  fullQuestionStepsListLength: number;
  onSortPartialResult?: (correctItems: { [key: string]: boolean }, incorrectItems: { [key: string]: boolean }) => void;
  onQuestionComplete: (completionTime: number) => void;
}

export function useQuestionChecker({
  currentUserStep,
  fullQuestionStepsListLength,
  onSortPartialResult,
  onQuestionComplete,
}: UseQuestionCheckerParams) {
  // ===== Hooks =====
  const { isMarking, markAnswer } = useMarkQuestion();
  const ongoingActivity = useOngoingActivity();

  // ===== Store State & Actions =====
  const currentSession = useAppSessionStore((state) => state.currentSession);
  const setMarkingResult = useAppSessionStore(
    (state) => state.setMarkingResult
  );
  const updateBestStreak = useAppSessionStore(
    (state) => state.updateBestStreak
  );

  // ===== Derived State =====
  const markingResults = currentSession.markingResults;

  // ===== Handlers and Callbacks =====
  const handleCheck = async (
    currentQuestion: QuestionSpec,
    userAnswer: string | { [key: string]: string[] },
    sortAttempts: number
  ): Promise<{ shouldContinue: boolean; result: MarkingResult }> => {
    const completionTime = Date.now();
    const result = await markAnswer(currentQuestion, userAnswer);

    // For sort questions, do partial checking (max 3 attempts)
    if (currentQuestion.questionData.questionType === "sort") {
      const newAttempts = sortAttempts + 1;

      // Get correct items from itemResults
      const correctItems: { [key: string]: boolean } = {};
      const incorrectItems: { [key: string]: boolean } = {};

      if (result.itemResults) {
        Object.entries(result.itemResults).forEach(([item, isCorrect]) => {
          if (isCorrect) {
            correctItems[item] = true;
          } else {
            incorrectItems[item] = true;
          }
        });
      }

      // If not fully correct and haven't reached max attempts, continue practicing
      if (result.isCorrect === false && newAttempts < 3) {
        onSortPartialResult?.(correctItems, incorrectItems);
        return { shouldContinue: false, result };
      }
    }

    // If fully correct, MCQ, or max attempts reached, complete the question
    setMarkingResult(currentUserStep, result);
    onQuestionComplete(completionTime);

    // Update best streak in session
    const updatedResults = { ...markingResults, [currentUserStep]: result };
    const currentStreak = calculateStreak(updatedResults, currentUserStep);
    updateBestStreak(currentStreak);

    // Update Live Activity
    const completedCount = Object.keys(updatedResults).length;
    ongoingActivity.updateProgress(
      fullQuestionStepsListLength,
      completedCount,
      currentStreak
    );

    return { shouldContinue: true, result };
  };

  return {
    handleCheck,
    isMarking,
  };
}
