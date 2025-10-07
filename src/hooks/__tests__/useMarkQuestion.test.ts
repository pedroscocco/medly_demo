import { renderHook, waitFor } from "@testing-library/react-native";
import {
  McqAnswer,
  McqQuestionSpec,
  QuestionSpec,
  SortAnswer,
  SortQuestionSpec,
} from "../../types";
import {
  markMcqQuestion,
  markQuestion,
  markSortQuestion,
  useMarkQuestion,
} from "../practice-flow/useMarkQuestion";

describe("markMcqQuestion", () => {
  const questionSpec: McqQuestionSpec = {
    index: 0,
    title: "Test Question",
    heading: "What is 2+2?",
    description: "Simple math",
    questionData: {
      questionType: "mcq",
      options: [{ option: "3" }, { option: "4" }, { option: "5" }],
      correctAnswer: "4",
      categories: null,
      correct_answer_mapping: null,
    },
  };

  it("returns correct=true when answer matches", () => {
    const userAnswer: McqAnswer = "4";
    const result = markMcqQuestion(questionSpec, userAnswer);

    expect(result.isCorrect).toBe(true);
    expect(result.score).toBe(100);
    expect(result.correctItems).toBe(1);
    expect(result.totalItems).toBe(1);
  });

  it("returns correct=false when answer does not match", () => {
    const userAnswer: McqAnswer = "3";
    const result = markMcqQuestion(questionSpec, userAnswer);

    expect(result.isCorrect).toBe(false);
    expect(result.score).toBe(0);
    expect(result.correctItems).toBe(0);
    expect(result.totalItems).toBe(1);
    expect(result.feedback).toContain("Incorrect");
  });
});

describe("markSortQuestion - Edge Cases", () => {
  const sortQuestionSpec: SortQuestionSpec = {
    index: 0,
    title: "Categorize Items",
    heading: "Sort these items into the correct categories",
    description: "Drag items to their categories",
    questionData: {
      questionType: "sort",
      options: [
        { option: "Apple" },
        { option: "Carrot" },
        { option: "Banana" },
        { option: "Broccoli" },
      ],
      correctAnswer: "",
      categories: ["Fruit", "Vegetable"],
      correct_answer_mapping: {
        Fruit: ["Apple", "Banana"],
        Vegetable: ["Carrot", "Broccoli"],
      },
    },
  };

  describe("Edge Case 1: Empty answer (no items placed)", () => {
    it("handles empty object {}", () => {
      const userAnswer: SortAnswer = {};
      const result = markSortQuestion(sortQuestionSpec, userAnswer);

      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
      expect(result.totalItems).toBe(0);
      expect(result.correctItems).toBe(0);
      expect(result.feedback).toBe("Incorrect. None of the items are correctly placed.");
      expect(result.itemResults).toEqual({});
    });
  });

  describe("Edge Case 2: Empty categories (categories exist but no items)", () => {
    it("handles categories with empty arrays", () => {
      const userAnswer: SortAnswer = {
        Fruit: [],
        Vegetable: [],
      };
      const result = markSortQuestion(sortQuestionSpec, userAnswer);

      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
      expect(result.totalItems).toBe(0);
      expect(result.correctItems).toBe(0);
      expect(result.feedback).toBe("Incorrect. None of the items are correctly placed.");
      expect(result.itemResults).toEqual({});
    });
  });

  describe("Edge Case 3: Single item to categorize", () => {
    const singleItemQuestion: SortQuestionSpec = {
      index: 0,
      title: "Single Item",
      heading: "Categorize this item",
      description: "One item only",
      questionData: {
        questionType: "sort",
        options: [{ option: "Apple" }],
        correctAnswer: "",
        categories: ["Fruit", "Vegetable"],
        correct_answer_mapping: {
          Fruit: ["Apple"],
          Vegetable: [],
        },
      },
    };

    it("marks single item correct placement as 100%", () => {
      const userAnswer: SortAnswer = {
        Fruit: ["Apple"],
      };
      const result = markSortQuestion(singleItemQuestion, userAnswer);

      expect(result.isCorrect).toBe(true);
      expect(result.score).toBe(100);
      expect(result.totalItems).toBe(1);
      expect(result.correctItems).toBe(1);
      expect(result.feedback).toBe("Perfect! All items are correctly categorized.");
      expect(result.itemResults).toEqual({ Apple: true });
    });

    it("marks single item incorrect placement as 0%", () => {
      const userAnswer: SortAnswer = {
        Vegetable: ["Apple"],
      };
      const result = markSortQuestion(singleItemQuestion, userAnswer);

      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
      expect(result.totalItems).toBe(1);
      expect(result.correctItems).toBe(0);
      expect(result.feedback).toBe("Incorrect. None of the items are correctly placed.");
      expect(result.itemResults).toEqual({ Apple: false });
    });
  });

  describe("Edge Case 4: No items correct (all wrong)", () => {
    it("returns score=0 when all items in wrong categories", () => {
      const userAnswer: SortAnswer = {
        Fruit: ["Carrot", "Broccoli"], // These are vegetables
        Vegetable: ["Apple", "Banana"], // These are fruits
      };
      const result = markSortQuestion(sortQuestionSpec, userAnswer);

      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
      expect(result.totalItems).toBe(4);
      expect(result.correctItems).toBe(0);
      expect(result.feedback).toBe("Incorrect. None of the items are correctly placed.");
      expect(result.itemResults).toEqual({
        Carrot: false,
        Broccoli: false,
        Apple: false,
        Banana: false,
      });
    });
  });

  describe("Edge Case 5: All items correct (perfect score)", () => {
    it("returns score=100 and isCorrect=true when all items correct", () => {
      const userAnswer: SortAnswer = {
        Fruit: ["Apple", "Banana"],
        Vegetable: ["Carrot", "Broccoli"],
      };
      const result = markSortQuestion(sortQuestionSpec, userAnswer);

      expect(result.isCorrect).toBe(true);
      expect(result.score).toBe(100);
      expect(result.totalItems).toBe(4);
      expect(result.correctItems).toBe(4);
      expect(result.feedback).toBe("Perfect! All items are correctly categorized.");
      expect(result.itemResults).toEqual({
        Apple: true,
        Banana: true,
        Carrot: true,
        Broccoli: true,
      });
    });

    it("returns score=100 even if categories are in different order", () => {
      const userAnswer: SortAnswer = {
        Vegetable: ["Broccoli", "Carrot"], // Items in different order
        Fruit: ["Banana", "Apple"], // Items in different order
      };
      const result = markSortQuestion(sortQuestionSpec, userAnswer);

      expect(result.isCorrect).toBe(true);
      expect(result.score).toBe(100);
      expect(result.totalItems).toBe(4);
      expect(result.correctItems).toBe(4);
    });
  });

  describe("Edge Case 6: Score rounding precision", () => {
    it("rounds 1/3 correct (33.33%) to 33", () => {
      const threeItemQuestion: SortQuestionSpec = {
        index: 0,
        title: "Three Items",
        heading: "Categorize three items",
        description: "Three items",
        questionData: {
          questionType: "sort",
          options: [
            { option: "Apple" },
            { option: "Carrot" },
            { option: "Banana" },
          ],
          correctAnswer: "",
          categories: ["Fruit", "Vegetable"],
          correct_answer_mapping: {
            Fruit: ["Apple", "Banana"],
            Vegetable: ["Carrot"],
          },
        },
      };

      const userAnswer: SortAnswer = {
        Fruit: ["Apple", "Carrot"], // Apple correct, Carrot wrong
        Vegetable: ["Banana"], // Banana wrong (should be Fruit)
      };
      const result = markSortQuestion(threeItemQuestion, userAnswer);

      expect(result.correctItems).toBe(1); // Only Apple is correct
      expect(result.totalItems).toBe(3);
      expect(result.score).toBe(33); // Math.round(33.333...)
      expect(result.isCorrect).toBe(false);
    });

    it("rounds 2/3 correct (66.67%) to 67", () => {
      const threeItemQuestion: SortQuestionSpec = {
        index: 0,
        title: "Three Items",
        heading: "Categorize three items",
        description: "Three items",
        questionData: {
          questionType: "sort",
          options: [
            { option: "Apple" },
            { option: "Carrot" },
            { option: "Banana" },
          ],
          correctAnswer: "",
          categories: ["Fruit", "Vegetable"],
          correct_answer_mapping: {
            Fruit: ["Apple", "Banana"],
            Vegetable: ["Carrot"],
          },
        },
      };

      const userAnswer: SortAnswer = {
        Fruit: ["Apple"], // Apple correct
        Vegetable: ["Banana", "Carrot"], // Carrot correct, Banana wrong
      };
      const result = markSortQuestion(threeItemQuestion, userAnswer);

      expect(result.correctItems).toBe(2); // Apple and Carrot
      expect(result.totalItems).toBe(3);
      expect(result.score).toBe(67); // Math.round(66.666...)
      expect(result.isCorrect).toBe(false);
    });

    it("calculates exactly 50% for 1/2 correct", () => {
      const twoItemQuestion: SortQuestionSpec = {
        index: 0,
        title: "Two Items",
        heading: "Categorize two items",
        description: "Two items",
        questionData: {
          questionType: "sort",
          options: [{ option: "Apple" }, { option: "Carrot" }],
          correctAnswer: "",
          categories: ["Fruit", "Vegetable"],
          correct_answer_mapping: {
            Fruit: ["Apple"],
            Vegetable: ["Carrot"],
          },
        },
      };

      const userAnswer: SortAnswer = {
        Fruit: ["Apple", "Carrot"], // Apple correct, Carrot wrong
      };
      const result = markSortQuestion(twoItemQuestion, userAnswer);

      expect(result.correctItems).toBe(1);
      expect(result.totalItems).toBe(2);
      expect(result.score).toBe(50);
      expect(result.isCorrect).toBe(false);
    });
  });

  describe("Edge Case 7: Items in non-existent category", () => {
    it("marks items as incorrect when placed in category not in correct_answer_mapping", () => {
      const userAnswer: SortAnswer = {
        Meat: ["Apple", "Banana"], // "Meat" category doesn't exist in mapping
        Fruit: ["Carrot", "Broccoli"], // Wrong items in Fruit
      };
      const result = markSortQuestion(sortQuestionSpec, userAnswer);

      expect(result.correctItems).toBe(0);
      expect(result.totalItems).toBe(4);
      expect(result.score).toBe(0);
      expect(result.itemResults).toEqual({
        Apple: false,
        Banana: false,
        Carrot: false,
        Broccoli: false,
      });
    });

    it("handles mix of valid and invalid categories", () => {
      const userAnswer: SortAnswer = {
        Fruit: ["Apple"], // 1 correct
        InvalidCategory: ["Banana", "Carrot", "Broccoli"], // All wrong
      };
      const result = markSortQuestion(sortQuestionSpec, userAnswer);

      expect(result.correctItems).toBe(1);
      expect(result.totalItems).toBe(4);
      expect(result.score).toBe(25);
      expect(result.itemResults).toEqual({
        Apple: true,
        Banana: false,
        Carrot: false,
        Broccoli: false,
      });
    });
  });

  describe("Edge Case 9: All items in one category", () => {
    it("handles all items in one category (partial credit)", () => {
      const userAnswer: SortAnswer = {
        Fruit: ["Apple", "Banana", "Carrot", "Broccoli"], // 2 correct, 2 wrong
      };
      const result = markSortQuestion(sortQuestionSpec, userAnswer);

      expect(result.correctItems).toBe(2); // Apple and Banana
      expect(result.totalItems).toBe(4);
      expect(result.score).toBe(50);
      expect(result.isCorrect).toBe(false);
      expect(result.itemResults).toEqual({
        Apple: true,
        Banana: true,
        Carrot: false,
        Broccoli: false,
      });
    });

    it("handles all items in one wrong category (zero credit)", () => {
      const userAnswer: SortAnswer = {
        Vegetable: ["Apple", "Banana", "Carrot", "Broccoli"], // 2 correct, 2 wrong
      };
      const result = markSortQuestion(sortQuestionSpec, userAnswer);

      expect(result.correctItems).toBe(2); // Carrot and Broccoli
      expect(result.totalItems).toBe(4);
      expect(result.score).toBe(50);
      expect(result.isCorrect).toBe(false);
    });
  });
});

describe("markQuestion - Async Wrapper", () => {
  describe("Edge Case 15: Unsupported question type", () => {
    it("returns error result for unsupported question type", async () => {
      const unsupportedQuestion = {
        index: 0,
        title: "Essay Question",
        heading: "Write an essay",
        description: "This is an essay question",
        questionData: {
          questionType: "essay" as any, // Unsupported type
          options: [],
          correctAnswer: "",
          categories: null,
          correct_answer_mapping: null,
        },
      } as QuestionSpec;

      const userAnswer = "Some essay text";

      const result = await markQuestion(unsupportedQuestion, userAnswer);

      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
      expect(result.totalItems).toBe(0);
      expect(result.correctItems).toBe(0);
      expect(result.feedback).toBe("Unsupported question type");
      expect(result.userAnswer).toBe(userAnswer);
    });

    it("handles null or undefined questionType", async () => {
      const unsupportedQuestion = {
        index: 0,
        title: "Bad Question",
        heading: "Invalid question",
        description: "Missing type",
        questionData: {
          questionType: undefined as any,
          options: [],
          correctAnswer: "",
          categories: null,
          correct_answer_mapping: null,
        },
      } as QuestionSpec;

      const userAnswer = "test";
      const result = await markQuestion(unsupportedQuestion, userAnswer);

      expect(result.feedback).toBe("Unsupported question type");
    });
  });

  it("correctly routes MCQ questions to markMcqQuestion", async () => {
    const mcqQuestion: McqQuestionSpec = {
      index: 0,
      title: "Test",
      heading: "What is 2+2?",
      description: "Math",
      questionData: {
        questionType: "mcq",
        options: [{ option: "4" }],
        correctAnswer: "4",
        categories: null,
        correct_answer_mapping: null,
      },
    };

    const result = await markQuestion(mcqQuestion, "4");

    expect(result.isCorrect).toBe(true);
    expect(result.score).toBe(100);
  });

  it("correctly routes sort questions to markSortQuestion", async () => {
    const sortQuestion: SortQuestionSpec = {
      index: 0,
      title: "Sort",
      heading: "Categorize",
      description: "Sort items",
      questionData: {
        questionType: "sort",
        options: [{ option: "Apple" }],
        correctAnswer: "",
        categories: ["Fruit"],
        correct_answer_mapping: {
          Fruit: ["Apple"],
        },
      },
    };

    const result = await markQuestion(sortQuestion, { Fruit: ["Apple"] });

    expect(result.isCorrect).toBe(true);
    expect(result.score).toBe(100);
  });
});

describe("useMarkQuestion Hook", () => {
  const mcqQuestion: McqQuestionSpec = {
    index: 0,
    title: "Test Question",
    heading: "What is 2+2?",
    description: "Simple math",
    questionData: {
      questionType: "mcq",
      options: [{ option: "3" }, { option: "4" }, { option: "5" }],
      correctAnswer: "4",
      categories: null,
      correct_answer_mapping: null,
    },
  };

  describe("Edge Case 17: Error handling and state management", () => {
    it("starts with isMarking=false", () => {
      const { result } = renderHook(() => useMarkQuestion());
      expect(result.current.isMarking).toBe(false);
    });

    it("sets isMarking to true during marking operation", async () => {
      const { result } = renderHook(() => useMarkQuestion());

      const markPromise = result.current.markAnswer(mcqQuestion, "4");

      // Check that isMarking is true during operation
      await waitFor(() => {
        expect(result.current.isMarking).toBe(true);
      });

      await markPromise; // Clean up
    });

    it("resets isMarking to false after successful marking", async () => {
      const { result } = renderHook(() => useMarkQuestion());

      await result.current.markAnswer(mcqQuestion, "4");

      // After completion, isMarking should be false
      await waitFor(() => {
        expect(result.current.isMarking).toBe(false);
      });
    });

    it("returns correct marking result from hook", async () => {
      const { result } = renderHook(() => useMarkQuestion());

      const markingResult = await result.current.markAnswer(mcqQuestion, "4");

      expect(markingResult).toBeDefined();
      expect(markingResult.isCorrect).toBe(true);
      expect(markingResult.score).toBe(100);
      expect(markingResult.userAnswer).toBe("4");
    });

    it("markAnswer is callable and returns a promise", () => {
      const { result } = renderHook(() => useMarkQuestion());

      expect(result.current.markAnswer).toBeDefined();
      expect(typeof result.current.markAnswer).toBe("function");

      const promise = result.current.markAnswer(mcqQuestion, "4");
      expect(promise).toBeInstanceOf(Promise);

      return promise; // Clean up
    });
  });
});
