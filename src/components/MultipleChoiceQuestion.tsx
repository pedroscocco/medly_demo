import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { McqQuestionSpec } from "../types";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 24,
    color: "#000000",
  },
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4A9EFF",
    borderRadius: 4,
  },
  progressEmoji: {
    fontSize: 20,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  counterIcon: {
    fontSize: 18,
    color: "#4A9EFF",
  },
  counterText: {
    fontSize: 14,
    color: "#4A9EFF",
    fontWeight: "600",
  },
  badgeContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4A9EFF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  badgeText: {
    fontSize: 16,
    color: "#4A9EFF",
    fontWeight: "500",
  },
  questionCard: {
    margin: 20,
    padding: 30,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    color: "#000000",
    fontWeight: "400",
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  optionButton: {
    padding: 20,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  optionButtonSelected: {
    backgroundColor: "#E8F4FF",
    borderColor: "#4A9EFF",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#6B7280",
  },
  optionTextSelected: {
    color: "#000000",
    fontWeight: "500",
  },
  bottomContainer: {
    padding: 20,
    marginTop: "auto",
  },
  checkButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 18,
    backgroundColor: "#4A9EFF",
    borderRadius: 16,
    shadowColor: "#4A9EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkButtonDisabled: {
    backgroundColor: "#E5E5E5",
    shadowOpacity: 0,
    elevation: 0,
  },
  checkButtonIcon: {
    fontSize: 20,
  },
  checkButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  checkButtonTextDisabled: {
    color: "#9CA3AF",
  },
});
