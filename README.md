# Medly Demo - Practice Quiz Application

A React Native mobile app that provides an interactive learning experience through structured question-and-answer workflows. Users can practice their knowledge with immediate feedback and progress tracking.

## Overview

This app helps users practice and test their understanding of various topics through an engaging, user-friendly practice environment. It features a sequential question flow where users answer questions, receive validation feedback, and track their progress through each session.

## Features

- **Home Page**: Entry point with navigation to practice mode
- **Practice Flow**: Interactive question interface with sequential progression
- **Multiple Choice Questions**: Clean UI with selectable options and visual feedback
- **Progress Tracking**: Visual progress bar with step counter (e.g., 1/10)
- **Question Navigation**: Sequential flow through question sets
- **Offline Development**: Mock API for frontend development without backend dependency

### Planned Features
- Answer validation with immediate feedback
- Sort/categorization questions with drag-and-drop
- Short answer questions with text input
- Session completion summary

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Query** (@tanstack/react-query) for data fetching and caching
- **Zustand** for state management
- **Expo Router** for navigation

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platforms
npm run ios
npm run android
npm run web
```

## Architecture

- **Mock API** (`src/api/`): Simulates backend responses for offline development
- **State Management** (`src/store/`): Zustand stores for app state and user progress
- **React Query Hooks** (`src/hooks/`): Data fetching with automatic caching
- **Component Architecture** (`src/components/`): Modular, reusable UI components
  - QuestionHeader: Progress bar, close button, and question type badge
  - MultipleChoiceQuestion: Question display and answer options
  - CheckButton: Bottom action button for answer submission
  - Composable design for flexible question flow assembly
- **Design System** (`src/styles/`): Centralized style constants for consistent theming
  - Colors, spacing, typography, shadows, and other design tokens
  - Component-specific style files using design system constants
- **Type Definitions** (`src/types.ts`): TypeScript interfaces for question data structures

## Future Enhancements

- User authentication with protected routes
- Session persistence with detailed analytics
- Home screen widget for active practice sessions
- Full backend API integration
- Offline support with sync capabilities

## Project Structure

```
src/
├── api/          # Mock API and data fetching utilities
├── app/          # Screen components and navigation
├── components/   # Modular, reusable UI components
│   ├── QuestionHeader.tsx           # Progress bar and navigation
│   ├── MultipleChoiceQuestion.tsx   # MCQ question content
│   └── CheckButton.tsx              # Answer submission button
├── hooks/        # React Query hooks
├── store/        # Zustand state management
├── styles/       # Design system and component styles
│   ├── designSystem.ts              # Centralized style constants
│   ├── QuestionHeader.styles.ts
│   ├── MultipleChoiceQuestion.styles.ts
│   └── CheckButton.styles.ts
└── types.ts      # TypeScript type definitions
```