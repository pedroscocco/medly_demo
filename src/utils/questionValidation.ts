import { QuestionSpec, SortQuestionSpec } from "../types";

/**
 * Check if an answer is complete and valid for submission
 */
export function isAnswerComplete(
  question: QuestionSpec,
  answer: string | { [key: string]: string[] } | null
): boolean {
  const questionType = question.questionData.questionType;

  if (questionType === "mcq") {
    return !!answer;
  }

  if (questionType === "sort") {
    const sortQ = question as SortQuestionSpec;
    const sortAnswer = answer as { [key: string]: string[] };
    const totalItems = sortQ.questionData.options.length;
    const placedItems = Object.values(sortAnswer || {}).flat().length;
    return placedItems === totalItems;
  }

  return false;
}
