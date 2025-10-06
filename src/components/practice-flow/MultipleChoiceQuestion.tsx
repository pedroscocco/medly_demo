import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { styles } from "../../styles/practice-flow/MultipleChoiceQuestion.styles";
import { AnswerOption, MarkingResult } from "../../types";
import { swipeEntering, swipeExiting } from "../../utils/swipeAnimations";

interface MultipleChoiceQuestionProps {
  heading: string;
  options: AnswerOption[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  disabled?: boolean;
  markingResult?: MarkingResult | null;
  isFirstQuestion?: boolean;
}

export default function MultipleChoiceQuestion({
  heading,
  options,
  selectedAnswer,
  onSelectAnswer,
  disabled = false,
  markingResult = null,
  isFirstQuestion = false,
}: MultipleChoiceQuestionProps) {
  const isCorrect = markingResult?.isCorrect;

  return (
    <Animated.View
      entering={isFirstQuestion ? undefined : swipeEntering}
      exiting={swipeExiting}
      key={heading}
    >
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
    </Animated.View>
  );
}
