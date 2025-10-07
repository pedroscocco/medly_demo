import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SplashScreen, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  AuthSessionProvider,
  useAuthSession,
} from "../authentication/AuthSessionProvider";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      networkMode: "offlineFirst",
    },
    mutations: {
      networkMode: "offlineFirst",
      retry: 3,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <AuthSessionProvider>
          <RootNavigator />
        </AuthSessionProvider>
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
}

const RootNavigator = () => {
  // ===== Hooks =====
  const { authSession, isLoading } = useAuthSession();

  // ===== Effects (Splash Screen) =====
  if (!isLoading) {
    SplashScreen.hide();
  }

  // ===== Render =====
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
