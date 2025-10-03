import { useAppSessionStore } from '../useAppSessionStore';
import { MarkingResult } from '../../types';

describe('useAppSessionStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppSessionStore.setState({
      currentUserStep: 0,
      markingResults: {},
    });
  });

  it('initializes with correct default state', () => {
    const state = useAppSessionStore.getState();

    expect(state.currentUserStep).toBe(0);
    expect(state.markingResults).toEqual({});
  });

  it('setCurrentUserStep updates the current step', () => {
    const { setCurrentUserStep } = useAppSessionStore.getState();

    setCurrentUserStep(5);

    expect(useAppSessionStore.getState().currentUserStep).toBe(5);
  });

  it('setNextStep increments the current step', () => {
    const { setNextStep, setCurrentUserStep } = useAppSessionStore.getState();

    setCurrentUserStep(2);
    setNextStep();

    expect(useAppSessionStore.getState().currentUserStep).toBe(3);
  });

  it('setMarkingResult stores a marking result', () => {
    const { setMarkingResult } = useAppSessionStore.getState();

    const result: MarkingResult = {
      isCorrect: true,
      score: 100,
      totalItems: 1,
      correctItems: 1,
      userAnswer: '4',
    };

    setMarkingResult(0, result);

    expect(useAppSessionStore.getState().markingResults[0]).toEqual(result);
  });

  it('clearUserSession resets state', () => {
    const { setCurrentUserStep, setMarkingResult, clearUserSession } = useAppSessionStore.getState();

    // Set some state
    setCurrentUserStep(5);
    setMarkingResult(0, {
      isCorrect: true,
      score: 100,
      totalItems: 1,
      correctItems: 1,
      userAnswer: '4',
    });

    // Clear session
    clearUserSession();

    const state = useAppSessionStore.getState();
    expect(state.currentUserStep).toBe(null);
    expect(state.markingResults).toEqual({});
  });
});
