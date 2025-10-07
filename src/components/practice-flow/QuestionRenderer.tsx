import { Text, View } from "react-native";
import { styles } from "../../styles/practice-flow/PracticeScreen.styles";
import { MarkingResult, QuestionSpec } from "../../types";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import SortQuestion from "./SortQuestion";

interface QuestionRendererProps {
  question: QuestionSpec;
  selectedAnswer: string | null;
  sortAnswer: { [key: string]: string[] };
  onSelectAnswer: (answer: string) => void;
  onSortAnswerChange: (mapping: { [key: string]: string[] }) => void;
  markingResult: MarkingResult | null;
  lockedItems: { [key: string]: boolean };
  isFirstQuestion: boolean;
}

export default function QuestionRenderer({
  question,
  selectedAnswer,
  sortAnswer,
  onSelectAnswer,
  onSortAnswerChange,
  markingResult,
  lockedItems,
  isFirstQuestion,
}: QuestionRendererProps) {
  // ===== Derived State =====
  const questionType = question.questionData.questionType;
  const isDisabled = !!markingResult;

  // ===== Render =====
  if (questionType === "mcq") {
    return (
      <MultipleChoiceQuestion
        heading={question.heading}
        options={question.questionData.options}
        selectedAnswer={
          markingResult ? (markingResult.userAnswer as string) : selectedAnswer
        }
        onSelectAnswer={onSelectAnswer}
        disabled={isDisabled}
        markingResult={markingResult}
        isFirstQuestion={isFirstQuestion}
      />
    );
  }

  if (questionType === "sort") {
    return (
      <SortQuestion
        heading={question.heading}
        options={question.questionData.options}
        categories={question.questionData.categories || []}
        currentAnswer={
          markingResult
            ? (markingResult.userAnswer as { [key: string]: string[] })
            : sortAnswer
        }
        onAnswerChange={onSortAnswerChange}
        disabled={isDisabled}
        lockedItems={lockedItems}
        isFirstQuestion={isFirstQuestion}
      />
    );
  }

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>Unsupported question type</Text>
    </View>
  );
}
