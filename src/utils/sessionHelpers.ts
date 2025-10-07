import { MarkingResult } from "../types";

/**
 * Calculate consecutive correct answers from the current position backwards
 */
export function calculateStreak(
  markingResults: { [questionIndex: number]: MarkingResult },
  currentStep: number
): number {
  let streak = 0;
  for (let i = currentStep; i >= 0; i--) {
    if (markingResults[i]?.isCorrect) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Calculate time spent per question in seconds from session timings
 */
export function calculateTimeSpentPerQuestion(questionTimings: {
  [questionIndex: number]: { startedAt: number; completedAt?: number };
}): number[] {
  return Object.keys(questionTimings)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => {
      const timing = questionTimings[Number(key)];
      if (timing.completedAt && timing.startedAt) {
        return Math.round((timing.completedAt - timing.startedAt) / 1000);
      }
      return 0;
    });
}
