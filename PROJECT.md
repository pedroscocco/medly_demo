# Learnly - Interactive Practice Quiz Application

## Project Overview

Learnly is a React Native mobile application that provides an engaging, interactive learning experience through structured practice sessions. Users work through question sets, receive immediate feedback on their answers, and track their progress with detailed analytics. The app is designed to make practice sessions feel focused and rewarding, with features like real-time progress tracking, animated feedback, and native widgets that keep users engaged even when the app is backgrounded.

## Core Purpose & Goals

The primary goal is to create an **immersive practice environment** where users can:
- Test and reinforce their knowledge through varied question types
- Receive instant validation and feedback on their answers
- Track detailed performance metrics (accuracy, streaks, timing)
- Experience a seamless, all-or-nothing practice session flow
- Stay engaged through native system integrations (iOS Live Activities, Android notifications)

The app emphasizes **uninterrupted practice sessions** - users either complete the entire session or abandon it, ensuring focused learning periods.

## Key Features

### Authentication & User Management
- **Secure authentication** with JWT tokens stored in device SecureStore
- **Automatic session management** with token expiry checks on every API response
- **Persistent login** between app launches
- User signup and signin flows with error handling

### Practice Session Flow
- **Single-screen session experience** with smooth card-based transitions between questions
- **Two question types implemented**:
  - **Multiple Choice Questions (MCQ)**: Clean selection interface with visual feedback
  - **Sort/Categorization Questions**: Drag-and-drop items into categories with partial credit support
- **Real-time question timer** that starts when question appears and persists across app states
- **Progress tracking** with animated progress bar showing current position (e.g., "3/10")
- **Answer validation** with immediate visual feedback (correct = green, incorrect = red)
- **Partial credit system** for sort questions - each correctly placed item counts toward score
- **Session completion summary** showing accuracy, correct count, and best streak

### Session State Management
- **All-or-nothing approach**: Users either complete all questions or abandon the session
- **Persistent session state** survives app backgrounding and interruptions
- **Question timing data** tracked per question with millisecond precision
- **Streak tracking** for consecutive correct answers
- **Session history** stored locally for progress review

### Native System Integration

#### iOS Live Activities (Home Screen Widget)
- **Dynamic widget** appears only during active practice sessions
- Displays:
  - Current progress (e.g., "Question 3 of 10")
  - Active question timer
  - Current streak count
- **Automatic updates** as user progresses through questions
- **Disappears automatically** when session completes or is abandoned
- Built using Expo Targets + native iOS widget extensions

#### Android (Planned)
- Ongoing Activity Notification with similar functionality

### Offline Support
- **React Query cache retention** set to infinite for question data
- Questions fetched once per session and cached for offline access
- **Mutation queue** persisted to AsyncStorage when offline
- **Automatic sync** when connectivity returns
- **Network status indicators** to keep users informed

### Question Features
- **Smooth animations** for question transitions (slide in/out)
- **Locked items** in sort questions - correctly placed items become locked
- **Multiple attempts** for sort questions with progressive feedback
- **Visual feedback** on answer correctness with color-coded responses
- **Disabled state** for questions after submission until continuing

## Technical Architecture

### State Management
- **Zustand** for global app state:
  - Current session state (questions, progress, timing)
  - Session history
  - User progress metrics
- **AsyncStorage middleware** for automatic state persistence
- **Zustand persist** ensures state survives app restarts

### Data Fetching & Caching
- **React Query (@tanstack/react-query)** for API communication
- **Aggressive caching strategy**:
  - Session questions cached infinitely (fetch once, use offline)
  - User data cached with smart invalidation
  - Mutation queue for offline actions
- **Optimistic updates** planned for better UX

### Authentication Flow
- **Token-based auth** with SecureStore for secure token storage
- **Token expiry detection** on every API response
- **Automatic logout** on token expiration with redirect to signin
- **Protected routes** that redirect unauthenticated users
- **Error handling** with user-friendly messages

### Native Development
- **Expo Targets** library for creating separate native targets
- **Custom native modules** for iOS Live Activities
- **Xcode widget development** with automatic linking to React Native
- **Expo prebuild** manages all native configuration
- **Development workflow**:
  1. Develop widget in Xcode
  2. Changes automatically reflected in React Native
  3. Build process completely Expo-managed

### Component Architecture
- **Modular, reusable components**:
  - `QuestionHeader`: Progress bar, timer, close button
  - `QuestionRenderer`: Routes to appropriate question type
  - `MultipleChoiceQuestion`: MCQ interface
  - `SortQuestion`: Drag-and-drop categorization with category boxes
  - `CheckButton`: Context-aware action button (Check/Continue)
  - `ResultFeedback`: Animated feedback with score display
  - `SessionSummary`: End-of-session statistics
  - `Dialog`: Reusable modal for abandonment confirmation
- **Shared contexts** for drag-and-drop state management
- **Animated components** using react-native-reanimated

### Design System
- **Centralized design tokens** (`src/styles/designSystem.ts`):
  - Colors palette
  - Spacing scale
  - Typography system
  - Shadow definitions
- **Component-specific styles** using design system constants
- **Consistent theming** across all screens

### Code Organization
```
src/
├── api/                  # API client and hooks
│   ├── apiClient.ts     # Axios instance with interceptors
│   └── hooks/           # React Query hooks per endpoint
├── app/                 # Screen components (Expo Router)
│   ├── (app)/          # Authenticated routes
│   └── signin.tsx      # Authentication screen
├── authentication/      # Auth context and provider
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Dialog, etc.)
│   └── practice-flow/  # Practice session components
├── hooks/              # Custom React hooks
│   ├── practice-flow/  # Session-specific hooks
│   └── ongoing_activity/ # Native widget hooks
├── store/              # Zustand stores
├── styles/             # Design system and component styles
├── utils/              # Helper functions and utilities
├── types.ts            # TypeScript type definitions
└── widgets/            # Native module code (iOS)
```

## Testing Strategy

### Unit Tests
- **Core business logic** tested in isolation:
  - Question marking/grading logic
  - Answer validation
  - Score calculation (including partial credit)
  - Session helpers (streak, timing)
- **Edge cases covered**:
  - Empty answers
  - All correct/incorrect scenarios
  - Score rounding precision
  - Invalid question types

### Integration Tests
- **User behavior tests** using React Testing Library:
  - Practice flow: answering questions, seeing feedback, advancing
  - Authentication: signin, signup, form validation
  - Session completion: summary display, stats accuracy
- **Hook integration tests**:
  - `useMarkQuestion`: marking with actual question specs
  - `useAuthSession`: authentication flow and state management

### E2E Tests (Maestro)
- **Complete user journeys** tested end-to-end:
  - Authentication flow (signup → login)
  - Practice session flow (start → answer → complete)
  - Abandonment flow (start → quit confirmation)
- **Native interactions** tested on real devices/simulators

## Implementation Status

### ✅ Completed Features
- Full authentication system with secure token storage
- Practice session flow with MCQ and Sort questions
- Question marking with partial credit support
- Session state management with persistence
- Question timing with per-question tracking
- iOS Live Activities widget
- Offline support with cache retention and mutation queue
- Session completion with summary statistics
- Answer validation with visual feedback
- Progress tracking with animated progress bar
- Drag-and-drop sort questions
- Session abandonment with confirmation dialog
- Comprehensive test suite (unit + integration + E2E)

### 🚧 Next Steps

#### Authentication
- **Token refresh logic** for seamless session extension
- **Better error handling** for network issues during auth

#### Native Widgets
- **Android Ongoing Activity Notification** (equivalent to iOS Live Activity)
- **Tap actions** on widget to return to app

#### Offline Capabilities
- **Optimistic cache updates** for better perceived performance
- **Sync conflict resolution** for offline mutations
- **Better network status UI** with retry mechanisms

#### Practice Features
- **More question types** (short answer, true/false, matching)
- **Question shuffle** for varied practice
- **Difficulty levels** with adaptive learning
- **Detailed explanations** for incorrect answers

#### Analytics & Progress
- **Historical session review** with detailed breakdowns
- **Progress graphs** showing improvement over time
- **Category-based analytics** for targeted practice
- **Leaderboards** for social motivation

## Development Workflow

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)

### Setup
```bash
# Install dependencies
npm install

# Generate native projects (required for native modules)
npx expo prebuild

# Run on iOS
npx expo run:ios

# Run on Android (or use EAS Build)
npx expo run:android
# OR for development build via EAS
eas build -p android --profile development

# Start Expo development server
npx expo start
```

### Testing
```bash
# Run all tests
npm test

# Run specific test suite
npm test -- path/to/test.tsx

# Run E2E tests with Maestro
maestro test .maestro/
```

### Native Widget Development (iOS)
1. Open `ios/YourApp.xcworkspace` in Xcode
2. Edit widget code in widget target
3. Changes automatically available in React Native project
4. Run `npx expo prebuild` if needed
5. Build and run with `npx expo run:ios`

## Design Philosophy

### User Experience
- **Focused sessions**: No distractions during practice
- **Immediate feedback**: Users know if they're right or wrong instantly
- **Visual clarity**: Progress and status always visible
- **Smooth animations**: Transitions feel polished and intentional
- **Forgiving UX**: Users can re-attempt sort questions, change answers before submitting

### Code Quality
- **TypeScript everywhere**: Type safety across the codebase
- **Comprehensive testing**: Unit, integration, and E2E coverage
- **Modular architecture**: Components are reusable and composable
- **Clean separation**: Business logic separated from UI components
- **Documented code**: Critical functions have clear documentation

### Performance
- **Aggressive caching**: Minimize network requests
- **Optimized re-renders**: Proper use of React optimization techniques
- **Native animations**: Smooth 60fps animations with Reanimated
- **Lazy loading**: Components loaded when needed
- **Efficient state updates**: Zustand provides fast, minimal re-renders

## Future Enhancements

### Learning Features
- **Spaced repetition** algorithm for optimal retention
- **Personalized question selection** based on weak areas
- **Study streaks** with reminders and gamification
- **Practice goals** (daily/weekly targets)
- **Achievement system** for milestones

### Social Features
- **Study groups** for collaborative learning
- **Challenges** between friends
- **Shared practice sets** created by community
- **Progress sharing** on social media

### Content Management
- **User-created question sets** with templates
- **Import/export** question banks
- **AI-generated questions** based on topics
- **Rich media support** (images, audio, video in questions)

### Platform Expansion
- **Web version** for desktop practice
- **Tablet optimizations** with split-screen
- **Apple Watch complications** for quick stats
- **iPad widget** with expanded info display
