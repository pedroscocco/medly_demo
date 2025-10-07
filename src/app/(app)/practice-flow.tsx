import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";
import { styles } from "@/src/styles/practice-flow/PracticeScreen.styles";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCompleteSession } from "../../api/hooks/useCompleteSession";
import useSessionQuery from "../../api/hooks/useSessionQuery";
import Dialog from "../../components/common/Dialog";
import CheckButton from "../../components/practice-flow/CheckButton";
import QuestionHeader from "../../components/practice-flow/QuestionHeader";
import QuestionRenderer from "../../components/practice-flow/QuestionRenderer";
import ResultFeedback from "../../components/practice-flow/ResultFeedback";
import SessionSummary from "../../components/practice-flow/SessionSummary";
import { useOngoingActivity } from "../../hooks/ongoing_activity/useOngoingActivity";
import { useQuestionAnswer } from "../../hooks/practice-flow/useQuestionAnswer";
import { useQuestionChecker } from "../../hooks/practice-flow/useQuestionChecker";
import { useQuestionTiming } from "../../hooks/practice-flow/useQuestionTiming";
import { useAppSessionStore } from "../../store/useAppSessionStore";
import { colors } from "../../styles/designSystem";
import { isAnswerComplete } from "../../utils/questionValidation";

export default function PracticeScreen() {
  // ===== Routing & Data =====
  const router = useRouter();
  const { data, isLoading, error } = useSessionQuery();
  const fullQuestionStepsList = data?.steps || [];

  // ===== Local State =====
  const [showAbandonDialog, setShowAbandonDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // ===== Hooks =====
  const ongoingActivity = useOngoingActivity();
  const { completeSession, prepareSessionData } = useCompleteSession();
  const NetworkToast = useNetworkStatus();

  const answerState = useQuestionAnswer();
  const {
    selectedAnswer,
    sortAnswer,
    lockedItems,
    sortAttempts,
    setSelectedAnswer,
    setSortAnswer,
    updateLockedItems,
    removeIncorrectItems,
    incrementSortAttempts,
    resetAnswer,
    getAnswer,
  } = answerState;

  // ===== Store State & Actions =====
  const currentSession = useAppSessionStore((state) => state.currentSession);
  const setNextStep = useAppSessionStore((state) => state.setNextStep);
  const commitCurrentSession = useAppSessionStore(
    (state) => state.commitCurrentSession
  );

  // ===== Derived State =====
  const currentUserStep = currentSession.currentUserStep;
  const markingResults = currentSession.markingResults;
  const currentQuestion = fullQuestionStepsList[currentUserStep];
  const markingResult = markingResults[currentUserStep];

  // ===== Custom Hooks (with derived state) =====
  const { currentQuestionStartTiming, completeCurrentTiming } =
    useQuestionTiming(currentUserStep);

  const { handleCheck, isMarking } = useQuestionChecker({
    currentUserStep,
    fullQuestionStepsListLength: fullQuestionStepsList.length,
    onSortPartialResult: (correctItems, incorrectItems) => {
      updateLockedItems(correctItems);
      removeIncorrectItems(incorrectItems);
    },
    onQuestionComplete: completeCurrentTiming,
  });

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

  // ===== Handlers and Callbacks =====
  const handleCheckAnswer = async () => {
    const userAnswer = getAnswer(currentQuestion.questionData.questionType);
    if (!userAnswer) return;

    const newAttempts =
      currentQuestion.questionData.questionType === "sort"
        ? incrementSortAttempts()
        : sortAttempts;

    await handleCheck(currentQuestion, userAnswer, newAttempts);
  };

  const handleContinue = () => {
    const isLastQuestion = currentUserStep >= fullQuestionStepsList.length - 1;

    if (isLastQuestion) {
      // Prepare and complete session
      const sessionData = prepareSessionData(
        currentSession,
        fullQuestionStepsList.length
      );
      completeSession(sessionData);
      // Show success dialog
      setShowSuccessDialog(true);
    } else {
      // Move to next question
      setNextStep();
      resetAnswer();
    }
  };

  const finishSession = (status: "completed" | "abandoned") => {
    ongoingActivity.endSession();
    commitCurrentSession(status);
    router.back();
  };

  const handleClose = () => {
    setShowAbandonDialog(true);
  };

  const handleAbandonConfirm = () => {
    setShowAbandonDialog(false);
    finishSession("abandoned");
  };

  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
    finishSession("completed");
  };

  // ===== Render =====
  return (
    <SafeAreaView style={styles.screenContainer}>
      <QuestionHeader
        currentStep={currentUserStep}
        totalSteps={fullQuestionStepsList.length}
        questionType={currentQuestion.questionData.questionType}
        onClose={handleClose}
        isCompleted={showSuccessDialog}
        questionStartTime={currentQuestionStartTiming}
        isMarked={!!markingResult}
      />
      <QuestionRenderer
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        sortAnswer={sortAnswer}
        onSelectAnswer={setSelectedAnswer}
        onSortAnswerChange={setSortAnswer}
        markingResult={markingResult}
        lockedItems={lockedItems}
        isFirstQuestion={
          currentUserStep === 0 && Object.keys(markingResults).length === 0
        }
      />

      {/* Result Feedback */}
      {markingResult && <ResultFeedback markingResult={markingResult} />}

      <CheckButton
        onPress={markingResult ? handleContinue : handleCheckAnswer}
        disabled={
          !markingResult &&
          !isAnswerComplete(
            currentQuestion,
            getAnswer(currentQuestion.questionData.questionType)
          )
        }
        text={markingResult ? "Continue" : "Check"}
        loading={isMarking}
        markingResult={markingResult}
      />

      {/* Abandon Session Dialog */}
      <Dialog
        visible={showAbandonDialog}
        title="Leave Practice?"
        message="You'll lose all the progress from this session."
        buttons={[
          {
            text: "Continue Practice",
            onPress: () => setShowAbandonDialog(false),
            variant: "primary",
          },
          {
            text: "Leave",
            onPress: handleAbandonConfirm,
            variant: "secondary",
          },
        ]}
        onDismiss={() => setShowAbandonDialog(false)}
      />

      {/* Success Dialog */}
      <Dialog
        visible={showSuccessDialog}
        title="🎉 Session Complete!"
        buttons={[
          {
            text: "Continue",
            onPress: handleSuccessConfirm,
            variant: "primary",
          },
        ]}
      >
        <SessionSummary
          markingResults={markingResults}
          totalQuestions={fullQuestionStepsList.length}
          bestStreak={currentSession?.bestStreak || 0}
        />
      </Dialog>
      <NetworkToast />
    </SafeAreaView>
  );
}
