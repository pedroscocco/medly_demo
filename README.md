# Medly Demo - Practice Quiz Application

A React Native mobile app that provides an interactive learning experience through structured question-and-answer workflows. Users can practice their knowledge with immediate feedback and progress tracking.

## Overview

This app helps users practice and test their understanding of various topics through an engaging, user-friendly practice environment. It features a sequential question flow where users answer questions, receive validation feedback, and track their progress through each session.

## Features

- **Home Page**: Entry point with navigation to practice mode
- **Practice Flow**: Interactive question interface with sequential progression
- **Multiple Question Types**:
  - Multiple choice questions (MCQ)
  - Short answer questions
  - Sorting/categorization questions
- **Answer Validation**: Immediate feedback on submitted answers
- **Progress Tracking**: Track completion through question sets
- **Offline Development**: Mock API for frontend development without backend dependency

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
├── hooks/        # React Query hooks
├── store/        # Zustand state management
└── types.ts      # TypeScript type definitions
```