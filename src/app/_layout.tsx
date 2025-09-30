import { Stack } from "expo-router";
import { createContext, useState } from "react";

export const QuestionsContext = createContext({});

export default function RootLayout() {
  const [questions, setQuestions] = useState({});
  return (
    <QuestionsContext value={[questions, setQuestions]}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="[questionId]" />
      </Stack >
    </QuestionsContext>);
}
