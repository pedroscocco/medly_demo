# Medly Demo Project

## Overview
A practice quiz application where users can work through a set of questions, answer them, and test their knowledge. The app provides an interactive learning experience with immediate feedback.

## Purpose
To help users practice and test their understanding of various topics through a structured question-and-answer workflow. The main goal is to create an engaging, user-friendly practice environment.

## Key Features
- **Home Page**: Landing page with navigation to practice mode
- **Practice Page**: Interactive question view that flows through questions as the user completes them
- **Question View**: Display individual questions with answer input
- **Answer Testing**: Validate user answers and provide feedback
- **Progress Tracking**: Flow through question set sequentially

## Technical Stack
- React Native
- Expo
- TypeScript

## Requirements
- Home page serves as the entry point to the app
- Practice mode loads questions and presents them one at a time
- Users can submit answers to questions
- System validates answers and provides feedback
- Sequential flow through questions after completion
- API integration for fetching questions

## Focus Areas
- Smooth user flow from home to practice mode
- Clear question presentation and answer submission
- Intuitive navigation between questions
- Responsive feedback on answer validation

## Implementation Status

### Completed
- ✅ Mock API with sample question data
- ✅ React Query integration for data fetching and caching
- ✅ Zustand store for app state management
- ✅ Multiple choice question UI component
- ✅ Practice flow screen with question navigation
- ✅ Progress tracking with visual progress bar
- ✅ Question type routing (MCQ implemented)
- ✅ Design system with centralized style constants
- ✅ Component-specific styling architecture

### In Progress
- 🚧 Answer validation and feedback
- 🚧 Sort question UI component

### Not Started
- ⏳ Short answer question UI component
- ⏳ Session completion summary
- ⏳ Answer marking/grading logic

---

## Future Extensions

Once the basic flow is complete, the following extensions will be implemented:

### 1. User Authentication

Add user accounts with login/signup functionality:

- **Create accounts and log in**
- **Stay logged in** between app sessions
- **Auto-logout** on token expiry with proper error handling
- **Protected routes** - redirect to login if not authenticated
- **Progress tracking** - each user has their own progress data

**Mock API Implementation**: Use simple JSON responses - no real backend needed.

### 2. Session Persistence

Extend session logic to:

- **Save completed session results** with:
  - Total questions
  - Correct answers
  - Time spent per question
  - Completion timestamp
- **Track user progress**:
  - Total sessions completed
  - Current daily streak
  - Accuracy percentage
- **Local storage**: Persist data locally for offline access
- **Question interactions**:
  - For sort questions, implement drag-and-drop into categories
  - On marking, correct answers turn green, incorrect turn red
  - Incorrect answers animate back to original positions
- **Time tracking**:
  - Start timer when question appears
  - Stop when answered
  - Accuracy to nearest second

### 3. Home Screen Widget

Create a native widget that displays **only during active practice sessions**:

- **Current progress** (e.g. "2/5 questions")
- **Current question streak** (how many questions in a row correct so far)
- **Updates automatically** as user progresses through questions
- **Disappears** when session is finished or ended early
- Should handle edge cases (app backgrounded, widget tap behavior)

### 4. API Integration

Integrate with these endpoints (mock with dummy data):

```javascript
// POST /auth/login
Request: { email: string, password: string }
Response: {
  token: string,
  user: {
    id: string,
    email: string,
    totalSessions: number,
    currentStreak: number,
    accuracyPercentage: number
  }
}

// POST /auth/signup
Request: { email: string, password: string }
Response: { token: string, user: User } // same as login

// GET /sessions/questions
Response: {
  sessionId: string,
  steps: Step[]
}

// POST /sessions/complete
Request: {
  sessionId: string,
  totalQuestions: number,
  correctAnswers: number,
  timeSpentPerQuestion: number[], // seconds per question
  questionStreak: number, // max consecutive correct in this session
  completedAt: string // ISO timestamp
}
Response: {
  updatedUser: User // with new totals/streak
}
```

### 5. Offline Support

Handle network connectivity issues:

- **Cache question sets** from provided JSON file for offline use
- **Queue completed sessions** when offline, sync when connectivity returns
- **Show network status** indicator in the UI
- **Update widget** with local data even when offline