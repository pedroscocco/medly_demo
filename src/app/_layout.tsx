import ExpoLiveActivityModule from '@/modules/expo-live-activity';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import {
  AuthSessionProvider,
  useAuthSession,
} from "../authentication/AuthSessionProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  console.log('Initializing Expo Live Activity Module');
  console.log(ExpoLiveActivityModule);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthSessionProvider>
          <RootNavigator />
        </AuthSessionProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
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
