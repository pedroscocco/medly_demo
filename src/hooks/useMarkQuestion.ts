import { useState } from "react";
import {
  MarkingResult,
  McqAnswer,
  McqQuestionSpec,
  QuestionSpec,
  SortAnswer,
  SortQuestionSpec,
} from "../types";

/**
 * Async function to mark/score a question answer
 * Simulates async behavior for future API integration
 */
async function markQuestion(
  questionSpec: QuestionSpec,
  userAnswer: McqAnswer | SortAnswer,
): Promise<MarkingResult> {
  // Simulate async operation (e.g., API call)
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (questionSpec.questionData.questionType === "mcq") {
    return markMcqQuestion(
      questionSpec as McqQuestionSpec,
      userAnswer as McqAnswer,
    );
  } else if (questionSpec.questionData.questionType === "sort") {
    return markSortQuestion(
      questionSpec as SortQuestionSpec,
      userAnswer as SortAnswer,
    );
  }

  // Fallback for unsupported types
  return {
    isCorrect: false,
    score: 0,
    totalItems: 0,
    correctItems: 0,
    feedback: "Unsupported question type",
    userAnswer,
  };
}

/**
 * Mark a multiple choice question
 */
export function markMcqQuestion(
  questionSpec: McqQuestionSpec,
  userAnswer: McqAnswer,
): MarkingResult {
  const isCorrect = userAnswer === questionSpec.questionData.correctAnswer;

  return {
    isCorrect,
    score: isCorrect ? 100 : 0,
    totalItems: 1,
    correctItems: isCorrect ? 1 : 0,
    feedback: isCorrect
      ? "Correct!"
      : `Incorrect. The correct answer is: ${questionSpec.questionData.correctAnswer}`,
    userAnswer,
  };
}

/**
 * Mark a sort/categorization question
 * Supports partial correctness - each correctly placed item counts
 */
function markSortQuestion(
  questionSpec: SortQuestionSpec,
  userAnswer: SortAnswer,
): MarkingResult {
  const correctMapping = questionSpec.questionData.correct_answer_mapping;
  const itemResults: { [itemText: string]: boolean } = {};
  let correctItems = 0;
  let totalItems = 0;

  // Check each item in the user's answer
  Object.entries(userAnswer).forEach(([categoryName, items]) => {
    items.forEach((item) => {
      totalItems++;
      const correctCategory = correctMapping[categoryName];
      const isItemCorrect = correctCategory?.includes(item) || false;
      itemResults[item] = isItemCorrect;
      if (isItemCorrect) {
        correctItems++;
      }
    });
  });

  const score =
    totalItems > 0 ? Math.round((correctItems / totalItems) * 100) : 0;
  const isCorrect = correctItems === totalItems;

  let feedback = "";
  if (isCorrect) {
    feedback = "Perfect! All items are correctly categorized.";
  } else if (correctItems > 0) {
    feedback = `Partially correct: ${correctItems} out of ${totalItems} items are correctly placed.`;
  } else {
    feedback = "Incorrect. None of the items are correctly placed.";
  }

  return {
    isCorrect,
    score,
    totalItems,
    correctItems,
    itemResults,
    feedback,
    userAnswer,
  };
}

export function useMarkQuestion() {
  const [isMarking, setIsMarking] = useState(false);

  const markAnswer = async (
    questionSpec: QuestionSpec,
    userAnswer: McqAnswer | SortAnswer,
  ) => {
    setIsMarking(true);

    try {
      const result = await markQuestion(questionSpec, userAnswer);
      setIsMarking(false);
      return result;
    } catch (error) {
      console.error("Error marking question:", error);
      setIsMarking(false);
      throw error;
    }
  };

  return {
    isMarking,
    markAnswer,
  };
}
