import { View, Text, TouchableOpacity } from "react-native";
import { AnswerOption, MarkingResult } from "../types";
import { styles } from "../styles/MultipleChoiceQuestion.styles";

interface MultipleChoiceQuestionProps {
  heading: string;
  options: AnswerOption[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  disabled?: boolean;
  markingResult?: MarkingResult | null;
}

export default function MultipleChoiceQuestion({
  heading,
  options,
  selectedAnswer,
  onSelectAnswer,
  disabled = false,
  markingResult = null,
}: MultipleChoiceQuestionProps) {
  const isCorrect = markingResult?.isCorrect;

  return (
    <>
      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{heading}</Text>
      </View>

      {/* Answer Options */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option.option;
          const showFeedback = markingResult && isSelected;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelected && !markingResult && styles.optionButtonSelected,
                showFeedback && isCorrect && styles.optionButtonCorrect,
                showFeedback && !isCorrect && styles.optionButtonIncorrect,
              ]}
              onPress={() => !disabled && onSelectAnswer(option.option)}
              disabled={disabled}
              activeOpacity={disabled ? 1 : 0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option.option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}