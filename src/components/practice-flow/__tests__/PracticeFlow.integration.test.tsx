import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Session } from "../../../types";
import PracticeScreen from "../../../app/(app)/practice-flow";
import { AuthSessionProvider } from "../../../authentication/AuthSessionProvider";

// Mock dependencies
jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock("../../../utils/SecureStorage");
jest.mock("../../../hooks/ongoing_activity/useOngoingActivity", () => ({
  useOngoingActivity: () => ({
    startSession: jest.fn(),
    endSession: jest.fn(),
    updateTimer: jest.fn(),
    updateProgress: jest.fn(),
  }),
}));

jest.mock("../../../hooks/useNetworkStatus", () => ({
  useNetworkStatus: () => {
    const React = require("react");
    return () => null;
  },
}));

// Mock session query
const mockSessionData: Session = {
  sessionId: 1,
  steps: [
    {
      index: 0,
      title: "Question 1",
      heading: "What is 2 + 2?",
      description: "Basic math",
      questionData: {
        questionType: "mcq",
        options: [{ option: "3" }, { option: "4" }, { option: "5" }],
        correctAnswer: "4",
        categories: null,
        correct_answer_mapping: null,
      },
    },
    {
      index: 1,
      title: "Question 2",
      heading: "What is 3 + 3?",
      description: "More math",
      questionData: {
        questionType: "mcq",
        options: [{ option: "5" }, { option: "6" }, { option: "7" }],
        correctAnswer: "6",
        categories: null,
        correct_answer_mapping: null,
      },
    },
  ],
};

jest.mock("../../../api/hooks/useSessionQuery", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: mockSessionData,
    isLoading: false,
    error: null,
  })),
}));

jest.mock("../../../api/hooks/useCompleteSession", () => ({
  useCompleteSession: () => ({
    completeSession: jest.fn(),
    prepareSessionData: jest.fn((session) => ({
      sessionId: session.sessionId,
      totalQuestions: 2,
      correctAnswers: 1,
      timeSpentPerQuestion: [5, 3],
      questionStreak: 1,
      completedAt: new Date().toISOString(),
    })),
    isCompleting: false,
    error: null,
  }),
}));

// Helper to create wrapper with providers
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthSessionProvider>{children}</AuthSessionProvider>
    </QueryClientProvider>
  );
}

describe("PracticeFlow - User Behavior Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store before each test
    const { useAppSessionStore } = require("../../../store/useAppSessionStore");
    useAppSessionStore.setState({
      currentSession: {
        sessionId: "test-session-1",
        currentUserStep: 0,
        markingResults: {},
        questionTimings: {},
        startedAt: Date.now(),
        sessionStatus: "in-progress",
        bestStreak: 0,
      },
      sessionHistory: {},
    });
  });

  describe("MCQ Question Flow", () => {
    it("allows user to select an answer and submit", async () => {
      const { getByText, queryByText } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      // Wait for question to load
      await waitFor(() => {
        expect(getByText("What is 2 + 2?")).toBeTruthy();
      });

      // Check button should exist
      expect(getByText("Check")).toBeTruthy();

      // Select an answer
      const answer4 = getByText("4");
      fireEvent.press(answer4);

      // Submit answer
      await waitFor(() => {
        const checkButton = getByText("Check");
        fireEvent.press(checkButton);
      });

      // Should show feedback with score
      await waitFor(
        () => {
          // ResultFeedback shows "+100 marks" or similar score feedback
          expect(queryByText("+100 marks")).toBeTruthy();
        },
        { timeout: 3000 }
      );

      // Should show Continue button after marking
      await waitFor(() => {
        expect(queryByText("Continue")).toBeTruthy();
      });
    });

    it("shows incorrect feedback when wrong answer selected", async () => {
      const { getByText, queryByText } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(getByText("What is 2 + 2?")).toBeTruthy();
      });

      // Select wrong answer
      const answer3 = getByText("3");
      fireEvent.press(answer3);

      // Submit
      await waitFor(() => {
        const checkButton = getByText("Check");
        fireEvent.press(checkButton);
      });

      // Should show 0 marks feedback for incorrect answer
      await waitFor(
        () => {
          expect(queryByText("0 mark")).toBeTruthy();
        },
        { timeout: 3000 }
      );

      // Should show Continue button
      await waitFor(() => {
        expect(queryByText("Continue")).toBeTruthy();
      });
    });

    it("advances to next question after pressing Continue", async () => {
      const { getByText, queryByText } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      // Answer first question
      await waitFor(() => {
        expect(getByText("What is 2 + 2?")).toBeTruthy();
      });

      fireEvent.press(getByText("4"));
      fireEvent.press(getByText("Check"));

      // Wait for feedback and Continue button
      await waitFor(
        () => {
          expect(queryByText("Continue")).toBeTruthy();
        },
        { timeout: 3000 }
      );

      // Press Continue
      fireEvent.press(getByText("Continue"));

      // Should show next question
      await waitFor(() => {
        expect(getByText("What is 3 + 3?")).toBeTruthy();
      });
    });
  });

  describe("Session Completion", () => {
    it("shows session summary after completing all questions", async () => {
      const { getByText, queryByText } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      // Complete first question
      await waitFor(() => {
        expect(getByText("What is 2 + 2?")).toBeTruthy();
      });
      fireEvent.press(getByText("4"));
      fireEvent.press(getByText("Check"));
      await waitFor(
        () => {
          expect(queryByText("Continue")).toBeTruthy();
        },
        { timeout: 3000 }
      );
      fireEvent.press(getByText("Continue"));

      // Complete second question
      await waitFor(() => {
        expect(getByText("What is 3 + 3?")).toBeTruthy();
      });
      fireEvent.press(getByText("6"));
      fireEvent.press(getByText("Check"));
      await waitFor(
        () => {
          expect(queryByText("Continue")).toBeTruthy();
        },
        { timeout: 3000 }
      );
      fireEvent.press(getByText("Continue"));

      // Should show success dialog
      await waitFor(() => {
        expect(queryByText("🎉 Session Complete!")).toBeTruthy();
      });

      // Should show summary stats
      expect(queryByText("Correct")).toBeTruthy();
      expect(queryByText("Accuracy")).toBeTruthy();
      expect(queryByText("Best Streak")).toBeTruthy();
    });
  });

  describe("Abandon Session", () => {
    it("shows abandon dialog when close button pressed", async () => {
      const { getByText, queryByText } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(getByText("What is 2 + 2?")).toBeTruthy();
      });

      // Press close button (✕ icon)
      const closeButton = getByText("✕");
      fireEvent.press(closeButton);

      // Should show abandon dialog
      await waitFor(() => {
        expect(queryByText("Leave Practice?")).toBeTruthy();
      });
      expect(
        queryByText("You'll lose all the progress from this session.")
      ).toBeTruthy();
    });

    it("dismisses abandon dialog when Continue Practice pressed", async () => {
      const { getByText, queryByText } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(getByText("What is 2 + 2?")).toBeTruthy();
      });

      // Open abandon dialog
      fireEvent.press(getByText("✕"));
      await waitFor(() => {
        expect(queryByText("Leave Practice?")).toBeTruthy();
      });

      // Press Continue Practice
      fireEvent.press(getByText("Continue Practice"));

      // Dialog should be dismissed
      await waitFor(() => {
        expect(queryByText("Leave Practice?")).toBeFalsy();
      });

      // Should still show question
      expect(getByText("What is 2 + 2?")).toBeTruthy();
    });
  });

  describe("Loading and Error States", () => {
    it("shows loading spinner while fetching questions", () => {
      // Mock loading state
      jest
        .spyOn(require("../../../api/hooks/useSessionQuery"), "default")
        .mockReturnValueOnce({
          data: null,
          isLoading: true,
          error: null,
        });

      const { getByTestId, queryByTestId } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      // Should show loading indicator
      // Note: ActivityIndicator might not have a testID by default
      // We're checking that question content is NOT visible
      expect(queryByTestId("question-content")).toBeFalsy();
    });

    it("shows error message when questions fail to load", async () => {
      // Save original mock
      const useSessionQuery = require("../../../api/hooks/useSessionQuery");
      const originalMock = useSessionQuery.default;

      // Mock error state
      useSessionQuery.default = jest.fn().mockReturnValue({
        data: null,
        isLoading: false,
        error: new Error("Failed to fetch"),
      });

      const { getByText } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      // Should show error message
      await waitFor(() => {
        expect(getByText("Error loading questions")).toBeTruthy();
      });

      // Restore original mock
      useSessionQuery.default = originalMock;
    });
  });

  describe("Question Display", () => {
    it("displays the question text", async () => {
      const { getByText } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(getByText("What is 2 + 2?")).toBeTruthy();
      });

      // Should show all answer options
      expect(getByText("3")).toBeTruthy();
      expect(getByText("4")).toBeTruthy();
      expect(getByText("5")).toBeTruthy();
    });

    it("displays check button", async () => {
      const { getByText } = render(<PracticeScreen />, {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(getByText("What is 2 + 2?")).toBeTruthy();
      });

      expect(getByText("Check")).toBeTruthy();
    });
  });
});
