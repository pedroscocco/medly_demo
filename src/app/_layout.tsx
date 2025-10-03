import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import {
  AuthSessionProvider,
  useAuthSession,
} from "../authentication/AuthSessionProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthSessionProvider>
        <RootNavigator />
      </AuthSessionProvider>
    </QueryClientProvider>
  );
}

const RootNavigator = () => {
  const { authSession } = useAuthSession();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!authSession}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!authSession}>
        <Stack.Screen name="signin" />
      </Stack.Protected>
    </Stack>
  );
};
