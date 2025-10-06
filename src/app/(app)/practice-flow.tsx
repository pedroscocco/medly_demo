import { styles } from "@/src/styles/practice-flow/PracticeScreen.styles";
import { useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dialog from "../../components/common/Dialog";
import CheckButton from "../../components/practice-flow/CheckButton";
import MultipleChoiceQuestion from "../../components/practice-flow/MultipleChoiceQuestion";
import QuestionHeader from "../../components/practice-flow/QuestionHeader";
import ResultFeedback from "../../components/practice-flow/ResultFeedback";
import SessionSummary from "../../components/practice-flow/SessionSummary";
import SortQuestion from "../../components/practice-flow/SortQuestion";
import { useOngoingActivity } from "../../hooks/ongoing_activity/useOngoingActivity";
import { useCompleteSession } from "../../hooks/useCompleteSession";
import { useMarkQuestion } from "../../hooks/useMarkQuestion";
import useSessionQuery from "../../hooks/useSessionQuery";
import { useAppSessionStore } from "../../store/useAppSessionStore";
import { colors } from "../../styles/designSystem";
import { MarkingResult, SortQuestionSpec } from "../../types";

export default function PracticeScreen() {
  // ===== Routing & Data =====
  const router = useRouter();
  const { data, isLoading, error } = useSessionQuery();
  const fullQuestionStepsList = data?.steps || [];

  // ===== Local State =====
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [sortAnswer, setSortAnswer] = useState<{ [key: string]: string[] }>({});
  const [lockedItems, setLockedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [sortAttempts, setSortAttempts] = useState(0);
  const [showAbandonDialog, setShowAbandonDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // ===== Hooks =====
  const { isMarking, markAnswer } = useMarkQuestion();
  const ongoingActivity = useOngoingActivity();
  const { completeSession } = useCompleteSession();

  // ===== Store State & Actions =====
  const currentSession = useAppSessionStore((state) => state.currentSession);
  const setNextStep = useAppSessionStore((state) => state.setNextStep);
  const setMarkingResult = useAppSessionStore(
    (state) => state.setMarkingResult
  );
  const updateBestStreak = useAppSessionStore(
    (state) => state.updateBestStreak
  );
  const startQuestionTiming = useAppSessionStore(
    (state) => state.startQuestionTiming
  );
  const completeQuestionTiming = useAppSessionStore(
    (state) => state.completeQuestionTiming
  );
  const commitCurrentSession = useAppSessionStore(
    (state) => state.commitCurrentSession
  );

  // ===== Derived State =====
  const currentUserStep = currentSession.currentUserStep;
  const markingResults = currentSession.markingResults;
  const currentQuestion = fullQuestionStepsList[currentUserStep];
  const markingResult = markingResults[currentUserStep];
  const currentQuestionStartTiming =
    currentSession.questionTimings[currentUserStep]?.startedAt;

  // ===== Effects =====
  // Redirect to home if no active session
  useEffect(() => {
    if (!currentSession) {
      router.replace("/");
    }
  }, [currentSession, router]);

  // Start timing when question becomes visible
  useLayoutEffect(() => {
    if (!currentQuestionStartTiming) {
      const now = Date.now();
      startQuestionTiming(currentUserStep, now);
      // Update Live Activity with new question timer
      ongoingActivity.updateTimer(now);
    }
  }, [
    currentQuestionStartTiming,
    currentUserStep,
    ongoingActivity,
    startQuestionTiming,
  ]);

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

  const handleCheck = async () => {
    const completionTime = Date.now();
    const userAnswer =
      currentQuestion.questionData.questionType === "mcq"
        ? selectedAnswer!
        : sortAnswer;

    const result = await markAnswer(currentQuestion, userAnswer);

    // For sort questions, do partial checking (max 3 attempts)
    if (currentQuestion.questionData.questionType === "sort") {
      const newAttempts = sortAttempts + 1;
      setSortAttempts(newAttempts);

      // Get correct items from itemResults
      const correctItems: { [key: string]: boolean } = {};
      const incorrectItems: { [key: string]: boolean } = {};

      if (result.itemResults) {
        Object.entries(result.itemResults).forEach(([item, isCorrect]) => {
          if (isCorrect) {
            correctItems[item] = true;
          } else {
            incorrectItems[item] = true;
          }
        });
      }

      // Update locked items with newly correct items
      setLockedItems(correctItems);

      // If not fully correct and haven't reached max attempts, continue practicing
      if (result.isCorrect === false && newAttempts < 3) {
        // Remove incorrect items from categories
        const newSortAnswer: { [key: string]: string[] } = {};
        Object.entries(sortAnswer).forEach(([category, items]) => {
          newSortAnswer[category] = items.filter(
            (item) => !incorrectItems[item]
          );
        });
        setSortAnswer(newSortAnswer);

        // Don't set marking result yet - keep practicing
        return;
      }
    }

    // If fully correct, MCQ, or max attempts reached, complete the question
    setMarkingResult(currentUserStep, result);
    completeQuestionTiming(currentUserStep, completionTime);

    // Update best streak in session
    const updatedResults = { ...markingResults, [currentUserStep]: result };
    const currentStreak = calculateStreak(updatedResults, currentUserStep);
    updateBestStreak(currentStreak);

    // Update Live Activity
    const completedCount = Object.keys(updatedResults).length;
    ongoingActivity.updateProgress(
      fullQuestionStepsList.length,
      completedCount,
      currentStreak
    );
  };

  const handleContinue = () => {
    const isLastQuestion = currentUserStep >= fullQuestionStepsList.length - 1;

    if (isLastQuestion) {
      // Complete session async
      callCompleteSession();
      // Show success dialog
      setShowSuccessDialog(true);
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    setNextStep();
    setSelectedAnswer(null);
    setSortAnswer({});
    setLockedItems({});
    setSortAttempts(0);
  };

  const callCompleteSession = async () => {
    // Calculate time spent per question in seconds
    const timeSpentPerQuestion = Object.keys(currentSession.questionTimings)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => {
        const timing = currentSession.questionTimings[Number(key)];
        if (timing.completedAt && timing.startedAt) {
          return Math.round((timing.completedAt - timing.startedAt) / 1000);
        }
        return 0;
      });

    // Count correct answers
    const correctAnswers = Object.values(currentSession.markingResults).filter(
      (result) => result.isCorrect
    ).length;

    completeSession({
      sessionId: currentSession.sessionId,
      totalQuestions: fullQuestionStepsList.length,
      correctAnswers,
      timeSpentPerQuestion,
      questionStreak: currentSession.bestStreak,
      completedAt: new Date().toISOString(),
    });
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
          lockedItems={lockedItems}
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
    </SafeAreaView>
  );
}

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
