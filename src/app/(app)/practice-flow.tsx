import LiveActivities from "@/modules/expo-live-activity";
import { styles } from "@/src/styles/practice-flow/PracticeScreen.styles";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckButton from "../../components/practice-flow/CheckButton";
import MultipleChoiceQuestion from "../../components/practice-flow/MultipleChoiceQuestion";
import QuestionHeader from "../../components/practice-flow/QuestionHeader";
import ResultFeedback from "../../components/practice-flow/ResultFeedback";
import SortQuestion from "../../components/practice-flow/SortQuestion";
import { useMarkQuestion } from "../../hooks/useMarkQuestion";
import useSessionQuery from "../../hooks/useSessionQuery";
import { useAppSessionStore } from "../../store/useAppSessionStore";
import { colors } from "../../styles/designSystem";
import { MarkingResult, SortQuestionSpec } from "../../types";

// Helper: Calculate consecutive correct answers from the current position backwards
function calculateStreak(
  markingResults: { [questionIndex: number]: MarkingResult },
  currentStep: number
): number {
  let streak = 0;
  for (let i = currentStep; i >= 0; i--) {
    if (markingResults[i]?.isCorrect) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export default function PracticeScreen() {
  // ===== Routing & Data =====
  const router = useRouter();
  const { data, isLoading, error } = useSessionQuery();
  const fullQuestionStepsList = data?.steps || [];

  // ===== Local State =====
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [sortAnswer, setSortAnswer] = useState<{ [key: string]: string[] }>({});

  // ===== Hooks =====
  const { isMarking, markAnswer } = useMarkQuestion();

  // ===== Store State & Actions =====
  const currentSession = useAppSessionStore((state) => state.currentSession);
  const setNextStep = useAppSessionStore((state) => state.setNextStep);
  const setMarkingResult = useAppSessionStore(
    (state) => state.setMarkingResult
  );
  const commitCurrentSession = useAppSessionStore(
    (state) => state.commitCurrentSession
  );

  // ===== Derived State =====
  const currentUserStep = currentSession?.currentUserStep || 0;
  const markingResults = currentSession?.markingResults || {};
  const currentQuestion = fullQuestionStepsList[currentUserStep];
  const markingResult = markingResults[currentUserStep];

  // ===== Effects =====
  // Redirect to home if no active session
  useEffect(() => {
    if (!currentSession) {
      router.replace("/");
    }
  }, [currentSession, router]);

  // ===== Early Returns (Loading/Error States) =====
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

  if (!currentQuestion) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No question found</Text>
      </View>
    );
  }

  // ===== Event Handlers =====
  const handleCheck = async () => {
    const userAnswer =
      currentQuestion.questionData.questionType === "mcq"
        ? selectedAnswer!
        : sortAnswer;

    const result = await markAnswer(currentQuestion, userAnswer);
    setMarkingResult(currentUserStep, result);

    // Update Live Activity with new progress
    updateLiveActivity(result);
  };

  const updateLiveActivity = (newResult: MarkingResult) => {
    if (!LiveActivities.areActivitiesEnabled() || !LiveActivities.isActivityInProgress()) {
      return;
    }

    const updatedResults = { ...markingResults, [currentUserStep]: newResult };
    const completedCount = Object.keys(updatedResults).length;
    const questionsLeft = fullQuestionStepsList.length - completedCount;
    const currentStreak = calculateStreak(updatedResults, currentUserStep);

    LiveActivities.updateActivity(questionsLeft, currentStreak);
  };

  const handleContinue = () => {
    const isLastQuestion = currentUserStep >= fullQuestionStepsList.length - 1;

    if (isLastQuestion) {
      finishSession("completed");
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    setNextStep();
    setSelectedAnswer(null);
    setSortAnswer({});
  };

  const finishSession = (status: "completed" | "abandoned") => {
    LiveActivities.endActivity();
    commitCurrentSession(status);
    router.dismiss();
  };

  const handleClose = () => {
    finishSession("abandoned");
  };

  const handleSortAnswerChange = (mapping: { [key: string]: string[] }) => {
    setSortAnswer(mapping);
  };

  // ===== Helper Functions =====
  const isCheckEnabled = (): boolean => {
    const questionType = currentQuestion.questionData.questionType;

    if (questionType === "mcq") {
      return !!selectedAnswer;
    }

    if (questionType === "sort") {
      const sortQ = currentQuestion as SortQuestionSpec;
      const totalItems = sortQ.questionData.options.length;
      const placedItems = Object.values(sortAnswer).flat().length;
      return placedItems === totalItems;
    }

    return false;
  };

  const getQuestionTypeLabel = (): string => {
    const questionType = currentQuestion.questionData.questionType;

    switch (questionType) {
      case "mcq":
        return "Choose the correct answer";
      case "sort":
        return "Drag into the correct category";
      default:
        return "Question";
    }
  };

  // ===== Render =====
  return (
    <SafeAreaView style={styles.screenContainer}>
      <QuestionHeader
        currentStep={currentUserStep}
        totalSteps={fullQuestionStepsList.length}
        questionType={getQuestionTypeLabel()}
        onClose={handleClose}
      />
      {currentQuestion.questionData.questionType === "mcq" ? (
        <MultipleChoiceQuestion
          heading={currentQuestion.heading}
          options={currentQuestion.questionData.options}
          selectedAnswer={
            markingResult
              ? (markingResult.userAnswer as string)
              : selectedAnswer
          }
          onSelectAnswer={setSelectedAnswer}
          disabled={!!markingResult}
          markingResult={markingResult}
        />
      ) : currentQuestion.questionData.questionType === "sort" ? (
        <SortQuestion
          heading={currentQuestion.heading}
          options={currentQuestion.questionData.options}
          categories={currentQuestion.questionData.categories}
          currentAnswer={
            markingResult
              ? (markingResult.userAnswer as { [key: string]: string[] })
              : sortAnswer
          }
          onAnswerChange={handleSortAnswerChange}
          disabled={!!markingResult}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Unsupported question type</Text>
        </View>
      )}

      {/* Result Feedback */}
      {markingResult && <ResultFeedback markingResult={markingResult} />}

      <CheckButton
        onPress={markingResult ? handleContinue : handleCheck}
        disabled={!markingResult && !isCheckEnabled()}
        text={markingResult ? "Continue" : "Check"}
        loading={isMarking}
        markingResult={markingResult}
      />
    </SafeAreaView>
  );
}
