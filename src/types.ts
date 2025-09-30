export type MCQ_TYPE = "mcq";
const MCQ_TYPE_V: MCQ_TYPE = "mcq";
export type SORT_TYPE = "sort"
const SORT_TYPE_V:SORT_TYPE  = "sort";

export type UserData = {
    id: string, 
    email: string, 
    totalSessions: number, 
    currentStreak: number, 
    accuracyPercentage: number
}

export type Session = {
  sessionId: number,
  steps: QuestionSpec[],
}

export type McqQuestionSpec = {
  index: number;
  title: string;
  heading: string;
  description: string;
  questionData: {
    questionType: MCQ_TYPE;
    options: AnswerOption[];
    correctAnswer: string;
    categories: null;
    correct_answer_mapping: null;
  };
};

export type SortQuestionSpec = {
  index: number;
  title: string;
  heading: string;
  description: string;
  questionData: {
    questionType: SORT_TYPE;
    options: AnswerOption[];
    correctAnswer: string;
    categories: string[];
    correct_answer_mapping: {
      [key: string]: string[]
    };
  };
};

export type QuestionSpec = McqQuestionSpec | SortQuestionSpec;

export type AnswerOption = {
  option: string
}