import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion";
import useSessionQuery from "../hooks/useSessioQuery";
import { useAppSessionStore } from "../store/useAppSessionStore";
import { colors, fontSize } from "../styles/designSystem";
import { McqQuestionSpec } from "../types";

export default function () {
  const router = useRouter();
  const { data, isLoading, error } = useSessionQuery();
  const fullQuestionStepsList = data?.steps || [];
  
//   const currentSessionStep = 0;
  const currentSessionStep = useAppSessionStore(
    (state) => state.currentSessionStep
  );
  const setCurrentSessionStep = useAppSessionStore(
    (state) => state.setCurrentSessionStep
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading questions</Text>
      </View>
    );
  }

  const currentQuestion = fullQuestionStepsList[currentSessionStep];

  if (!currentQuestion) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No question found</Text>
      </View>
    );
  }

  const handleCheck = (selectedAnswer: string) => {
    // For now, just move to next question
    // TODO: Validate answer and show feedback
    if (currentSessionStep < fullQuestionStepsList.length - 1) {
      setCurrentSessionStep(currentSessionStep + 1);
    } else {
      // Finished all questions, go back to home
      router.push("/");
    }
  };

  const handleClose = () => {
    router.dismissTo("/");
  };

  // Render based on question type
  if (currentQuestion.questionData.questionType === "mcq") {
    return (
      <MultipleChoiceQuestion
        questionSpec={currentQuestion as McqQuestionSpec}
        currentStep={currentSessionStep}
        totalSteps={fullQuestionStepsList.length}
        onCheck={handleCheck}
        onClose={handleClose}
      />
    );
  }

  // Fallback for other question types
  return (
    <View style={styles.centerContainer}>
      <Text>Question type not yet supported</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.error,
  },
});