import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/QuestionHeader.styles";

interface QuestionHeaderProps {
  currentStep: number;
  totalSteps: number;
  questionType: string;
  onClose: () => void;
}

export default function QuestionHeader({
  currentStep,
  totalSteps,
  questionType,
  onClose,
}: QuestionHeaderProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <>
      {/* Header with progress bar */}
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
          <Text style={styles.badgeText}>{questionType}</Text>
        </View>
      </View>
    </>
  );
}
