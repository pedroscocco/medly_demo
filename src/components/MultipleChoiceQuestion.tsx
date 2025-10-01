import { View, Text, TouchableOpacity } from "react-native";
import { AnswerOption } from "../types";
import { styles } from "../styles/MultipleChoiceQuestion.styles";

interface MultipleChoiceQuestionProps {
  heading: string;
  options: AnswerOption[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  disabled?: boolean;
}

export default function MultipleChoiceQuestion({
  heading,
  options,
  selectedAnswer,
  onSelectAnswer,
  disabled = false,
}: MultipleChoiceQuestionProps) {
  return (
    <>
      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{heading}</Text>
      </View>

      {/* Answer Options */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option.option && styles.optionButtonSelected,
            ]}
            onPress={() => !disabled && onSelectAnswer(option.option)}
            disabled={disabled}
            activeOpacity={disabled ? 1 : 0.7}
          >
            <Text
              style={[
                styles.optionText,
                selectedAnswer === option.option && styles.optionTextSelected,
              ]}
            >
              {option.option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}