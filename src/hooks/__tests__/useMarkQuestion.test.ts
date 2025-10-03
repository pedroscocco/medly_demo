import { markMcqQuestion } from '../useMarkQuestion';
import { McqQuestionSpec, McqAnswer } from '../../types';

describe('markMcqQuestion', () => {
  const questionSpec: McqQuestionSpec = {
    index: 0,
    title: 'Test Question',
    heading: 'What is 2+2?',
    description: 'Simple math',
    questionData: {
      questionType: 'mcq',
      options: [
        { option: '3' },
        { option: '4' },
        { option: '5' }
      ],
      correctAnswer: '4',
      categories: null,
      correct_answer_mapping: null,
    },
  };

  it('returns correct=true when answer matches', () => {
    const userAnswer: McqAnswer = '4';
    const result = markMcqQuestion(questionSpec, userAnswer);

    expect(result.isCorrect).toBe(true);
    expect(result.score).toBe(100);
    expect(result.correctItems).toBe(1);
    expect(result.totalItems).toBe(1);
  });

  it('returns correct=false when answer does not match', () => {
    const userAnswer: McqAnswer = '3';
    const result = markMcqQuestion(questionSpec, userAnswer);

    expect(result.isCorrect).toBe(false);
    expect(result.score).toBe(0);
    expect(result.correctItems).toBe(0);
    expect(result.totalItems).toBe(1);
    expect(result.feedback).toContain('Incorrect');
  });
});
