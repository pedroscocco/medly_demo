# Learnly - Practice Quiz Application

<img width="215" height="466" alt="Simulator Screenshot - iPhone 16 Plus - 2025-10-07 at 11 20 18" src="https://github.com/user-attachments/assets/8a2c7a50-8690-41a7-881a-e6ab6c96d13a" />

React Native mobile app for interactive learning through practice sessions with real-time feedback and progress tracking.

## Features

- **Authentication**: Secure JWT-based auth with SecureStore
- **Practice Sessions**: MCQ and Sort questions with immediate feedback
- **Progress Tracking**: Real-time timer, streak tracking, session analytics
- **Native Widgets**: iOS Live Activities for session progress (Android planned)
- **Offline Support**: Questions cached locally, mutations queued when offline

## Technical Decisions

### State Management

**Zustand + React Query caching** with automatic AsyncStore persistence middlewares for both.

- Zustand manages session state, user progress, and history
- React Query handles API calls with aggressive caching
- Both use persistence middleware for offline-first experience

### Authentication

**SecureStore for token storage** with token expiry checking on every API response.

**Next Steps**: Token refresh logic for seamless session extension

### Practice Session Screen

Single screen with questions sliding through as cards. Timer starts when question becomes visible and persists in state. Timer updates native widget in real-time.

**All-or-nothing flow**: User either completes entire session (sees success dialog, commits to backend) or abandons session entirely.

**Centralized style constants** (`src/styles/designSystem.ts`) for consistent theming across all components:
- Colors, spacing, typography, shadows
- Component-specific styles import from design system

### Native Widget

**Expo Targets library** creates separate native target linked to project with automatic prebuild. Native Expo Module links Swift Live Activity configuration.

**Development workflow**:
1. Develop widget in Xcode
2. Changes reflected in React Native project
3. Build flow completely Expo-managed via prebuild and run:ios

**Next Steps**: Android Ongoing Activity Notification

### Offline Support

**React Query cache retention set to infinite** for session questions - fetch once, app works offline. Mutation queue persisted to AsyncStore when offline, syncs automatically when online.

**Next Steps**: Optimistic cache updates for better perceived performance

## Setup Instructions

```bash
# Install dependencies
npm install

# Generate native projects (required for widgets)
npx expo prebuild

# Run on platform (choose iOS or Android)
npx expo run:ios
npx expo run:android

# OR use EAS Build for Android (faster than local)
eas build -p android --profile development

# Start Expo development server
npx expo start
```

## App Usage

**Sign Up** with new credentials for testing, or **Sign In** with:
- Email: `p`
- Password: `123`

On the main screen, you can start a new practice session or generate a new one with fresh random questions.

**Note**: Mock backend includes fake delays to simulate loading states on slow networks - this is why you'll see brief spinners throughout the app.

## Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test.tsx

# Run E2E tests with Maestro
maestro test .maestro/
```

## Test Coverage

**Unit Tests**: Critical business logic (question marking, validation, score calculation)

**Integration Tests**: User behavior flows (practice session, authentication, form interactions)

**E2E Tests**: Complete journeys on real devices (signup → practice → completion)

## Project Structure

```
src/
├── api/                  # API client with interceptors
│   └── hooks/           # React Query hooks per endpoint
├── app/                 # Screens (Expo Router)
│   ├── (app)/          # Authenticated routes
│   └── signin.tsx      # Auth screen
├── authentication/      # Auth context provider
├── components/          # Reusable UI components
│   ├── common/         # Dialogs, shared components
│   └── practice-flow/  # Question components
├── hooks/              # Custom hooks
│   ├── practice-flow/  # Session logic
│   └── ongoing_activity/ # Native widget integration
├── store/              # Zustand stores
├── styles/             # Design system
├── utils/              # Helper functions
├── types.ts            # TypeScript definitions
└── widgets/            # iOS widget native code
```

## Key Technologies

- **React Native** + **Expo** for cross-platform mobile
- **TypeScript** for type safety
- **React Query** for server state and caching
- **Zustand** for client state management
- **Expo Router** for navigation
- **React Native Reanimated** for smooth animations
- **SecureStore** for secure token storage
- **AsyncStorage** for state persistence
- **Maestro** for E2E testing
- **Jest** + **React Testing Library** for unit/integration tests

## Next Steps

### Authentication
- Token refresh logic
- Better network error handling

### Native Features
- Android Ongoing Activity Notification
- Widget tap actions to return to app

### Offline
- Optimistic updates for mutations
- Enhanced network status UI
