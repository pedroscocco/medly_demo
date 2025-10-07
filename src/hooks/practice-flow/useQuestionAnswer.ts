import { useState } from "react";

type AnswerType = string | { [key: string]: string[] };

export function useQuestionAnswer() {
  // ===== Local State =====
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [sortAnswer, setSortAnswer] = useState<{ [key: string]: string[] }>({});
  const [lockedItems, setLockedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [sortAttempts, setSortAttempts] = useState(0);

  // ===== Handlers and Callbacks =====
  const resetAnswer = () => {
    setSelectedAnswer(null);
    setSortAnswer({});
    setLockedItems({});
    setSortAttempts(0);
  };

  const getAnswer = (questionType: string): AnswerType | null => {
    if (questionType === "mcq") {
      return selectedAnswer;
    }
    return sortAnswer;
  };

  const handleSortAnswerChange = (mapping: { [key: string]: string[] }) => {
    setSortAnswer(mapping);
  };

  const incrementSortAttempts = () => {
    const newAttempts = sortAttempts + 1;
    setSortAttempts(newAttempts);
    return newAttempts;
  };

  const updateLockedItems = (items: { [key: string]: boolean }) => {
    setLockedItems(items);
  };

  const removeIncorrectItems = (incorrectItems: { [key: string]: boolean }) => {
    const newSortAnswer: { [key: string]: string[] } = {};
    Object.entries(sortAnswer).forEach(([category, items]) => {
      newSortAnswer[category] = items.filter(
        (item) => !incorrectItems[item]
      );
    });
    setSortAnswer(newSortAnswer);
  };

  return {
    // State
    selectedAnswer,
    sortAnswer,
    lockedItems,
    sortAttempts,
    // Getters
    getAnswer,
    // Setters
    setSelectedAnswer,
    setSortAnswer: handleSortAnswerChange,
    updateLockedItems,
    removeIncorrectItems,
    incrementSortAttempts,
    resetAnswer,
  };
}
