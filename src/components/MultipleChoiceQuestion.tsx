import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { McqQuestionSpec } from "../types";
import { styles } from "../styles/MultipleChoiceQuestion.styles";

interface MultipleChoiceQuestionProps {
  questionSpec: McqQuestionSpec;
  currentStep: number;
  totalSteps: number;
  onCheck: (selectedAnswer: string) => void;
  onClose: () => void;
}

export default function MultipleChoiceQuestion({
  questionSpec,
  currentStep,
  totalSteps,
  onCheck,
  onClose,
}: MultipleChoiceQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleCheck = () => {
    if (selectedAnswer) {
      onCheck(selectedAnswer);
    }
  };

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progressPercentage}%` }]}
            />
          </View>
          <Text style={styles.progressEmoji}>🦊</Text>
        </View>

        <View style={styles.counterContainer}>
          <Text style={styles.counterIcon}>↻</Text>
          <Text style={styles.counterText}>
            {currentStep + 1}/{totalSteps}
          </Text>
        </View>
      </View>

      {/* Question Type Badge */}
      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
          <Text style={styles.badgeText}>Multiple choice</Text>
        </View>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{questionSpec.heading}</Text>
      </View>

      {/* Answer Options */}
      <View style={styles.optionsContainer}>
        {questionSpec.questionData.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option.option && styles.optionButtonSelected,
            ]}
            onPress={() => setSelectedAnswer(option.option)}
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

      {/* Check Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.checkButton,
            !selectedAnswer && styles.checkButtonDisabled,
          ]}
          onPress={handleCheck}
          disabled={!selectedAnswer}
        >
          <Text style={styles.checkButtonIcon}>⚡</Text>
          <Text
            style={[
              styles.checkButtonText,
              !selectedAnswer && styles.checkButtonTextDisabled,
            ]}
          >
            Check
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}