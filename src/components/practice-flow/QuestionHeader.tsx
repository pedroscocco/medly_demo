import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/practice-flow/QuestionHeader.styles";

interface QuestionHeaderProps {
  currentStep: number;
  totalSteps: number;
  questionType: string;
  onClose: () => void;
  isCompleted?: boolean;
  questionStartTime?: number;
  isMarked?: boolean;
}

export default function QuestionHeader({
  currentStep,
  totalSteps,
  questionType,
  onClose,
  isCompleted = false,
  questionStartTime,
  isMarked = false,
}: QuestionHeaderProps) {
  const progressPercentage = isCompleted
    ? 100
    : (currentStep / totalSteps) * 100;

  const [elapsedTime, setElapsedTime] = useState(0);

  // Reset timer when question changes
  useEffect(() => {
    setElapsedTime(0);
  }, [questionStartTime]);

  useEffect(() => {
    if (isMarked || !questionStartTime) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - questionStartTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [questionStartTime, isMarked]);

  const formatTime = (seconds: number): string => {
    if (isMarked) {
      return "-:--";
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
            <Text
              style={[
                styles.progressEmoji,
                { left: `${Math.min(progressPercentage, 100)}%` },
              ]}
            >
              🦊
            </Text>
          </View>
        </View>

        <View style={styles.timerContainer}>
          <Ionicons name="time-outline" size={20} style={styles.clockIcon} />
          <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
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
