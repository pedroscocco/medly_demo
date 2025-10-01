import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../styles/designSystem";
import { styles } from "../styles/ResultFeedback.styles";
import { MarkingResult } from "../types";

interface ResultFeedbackProps {
  markingResult: MarkingResult;
}

export default function ResultFeedback({ markingResult }: ResultFeedbackProps) {
  const { isCorrect, score } = markingResult;

  return (
    <View style={[styles.container, isCorrect ? styles.containerCorrect : styles.containerIncorrect]}>
      <View style={styles.leftSection}>
          <Ionicons
            name={isCorrect ? "checkmark-circle" : "close-circle-sharp"}
            size={24}
            color={isCorrect ? colors.success : colors.error}
          />
        <Text style={[styles.text, isCorrect ? styles.textCorrect : styles.textIncorrect]}>
          {isCorrect ? `+${score} mark${score > 1 ? 's' : ''}` : `${score} mark${score > 1 ? 's' : ''}`}
        </Text>
      </View>
    </View>
  );
}
