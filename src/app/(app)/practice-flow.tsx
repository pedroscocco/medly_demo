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
import { SortQuestionSpec } from "../../types";

export default function PracticeScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useSessionQuery();
  const fullQuestionStepsList = data?.steps || [];
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [sortAnswer, setSortAnswer] = useState<{ [key: string]: string[] }>({});

  const { isMarking, markAnswer } = useMarkQuestion();

  const currentSession = useAppSessionStore((state) => state.currentSession);
  const setNextStep = useAppSessionStore((state) => state.setNextStep);
  const setMarkingResult = useAppSessionStore(
    (state) => state.setMarkingResult,
  );
  const commitCurrentSession = useAppSessionStore(
    (state) => state.commitCurrentSession,
  );

  // Redirect to home if no active session
  useEffect(() => {
    if (!currentSession) {
      router.replace("/" as any);
    }
  }, [currentSession, router]);

  const currentUserStep = currentSession?.currentUserStep || 0;
  const markingResults = currentSession?.markingResults || {};

  const currentQuestion = fullQuestionStepsList[currentUserStep];
  const markingResult = markingResults[currentUserStep];

  const edgeCaseView = renderEdgeCase(isLoading, error, currentQuestion);
  if (edgeCaseView) {
    return edgeCaseView;
  }

  const handleCheck = async () => {
    const userAnswer =
      currentQuestion.questionData.questionType === "mcq"
        ? selectedAnswer!
        : sortAnswer;

    const result = await markAnswer(currentQuestion, userAnswer);
    setMarkingResult(currentUserStep, result);

    // Update Live Activity with new progress
    if (LiveActivities.areActivitiesEnabled() && LiveActivities.isActivityInProgress()) {
      const newMarkingResults = { ...markingResults, [currentUserStep]: result };
      const completedCount = Object.keys(newMarkingResults).length;
      const questionsLeft = fullQuestionStepsList.length - completedCount;

      // Calculate current streak (consecutive correct answers from the end)
      let currentStreak = 0;
      for (let i = currentUserStep; i >= 0; i--) {
        const stepResult = i === currentUserStep ? result : newMarkingResults[i];
        if (stepResult?.isCorrect) {
          currentStreak++;
        } else {
          break;
        }
      }

      LiveActivities.updateActivity(questionsLeft, currentStreak);
    }
  };

  const handleContinue = () => {
    // Move to next question after seeing results
    if (currentUserStep < fullQuestionStepsList.length - 1) {
      setNextStep();
      setSelectedAnswer(null); // Reset selection for next question
      setSortAnswer({}); // Reset sort answer
    } else {
      // Finished all questions, commit as completed and go back to home
      LiveActivities.endActivity();
      commitCurrentSession("completed");
      router.push("/" as any);
    }
  };

  const handleClose = () => {
    // Abandon session when closing
    LiveActivities.endActivity();
    commitCurrentSession("abandoned");
    router.dismissTo("/" as any);
  };

  const handleSortAnswerChange = (mapping: { [key: string]: string[] }) => {
    setSortAnswer(mapping);
  };

  // Determine if check button should be enabled
  const isCheckEnabled = () => {
    if (currentQuestion.questionData.questionType === "mcq") {
      return !!selectedAnswer;
    } else if (currentQuestion.questionData.questionType === "sort") {
      // Check if all items are placed in categories
      const sortQ = currentQuestion as SortQuestionSpec;
      const totalItems = sortQ.questionData.options.length;
      const placedItems = Object.values(sortAnswer).flat().length;
      return placedItems === totalItems;
    }
    return false;
  };

  // Get question type label
  const getQuestionTypeLabel = () => {
    if (currentQuestion.questionData.questionType === "mcq") {
      return "Choose the correct answer";
    } else if (currentQuestion.questionData.questionType === "sort") {
      return "Drag into the correct category";
    }
    return "Question";
  };

  // Render based on question type
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
        <View
          style={{
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Unsupported question type</Text>
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

function renderEdgeCase(
  isLoading: boolean,
  error: any,
  currentQuestion: any,
): React.ReactElement | null {
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

  return null;
}
