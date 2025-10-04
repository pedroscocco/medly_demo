import { useAuthSession } from "@/src/authentication/AuthSessionProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import useSessionQuery from "../../hooks/useSessionQuery";
import { useAppSessionStore } from "../../store/useAppSessionStore";
import { colors } from "../../styles/designSystem";
import { styles } from "../../styles/HomeScreen.styles";

import LiveActivities from "@/modules/expo-live-activity";

export default function Index() {
  const { signOut } = useAuthSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useSessionQuery();
  const clearUserSession = useAppSessionStore(
    (state) => state.clearUserSession,
  );

  const currentUserStep = useAppSessionStore((state) => state.currentUserStep);
  const setCurrentUserStep = useAppSessionStore(
    (state) => state.setCurrentUserStep,
  );
  const markingResults = useAppSessionStore((state) => state.markingResults);
  const completedQuestionsCount = Object.keys(markingResults).length;

  const handleStartPractice = () => {
    LiveActivities.startActivity("Hello", "🚀");
    router.push("./practice-flow");
    if (currentUserStep === null) {
      setCurrentUserStep(0); // Start from the first question
    }
  };

  const handleResetPractice = () => {
    LiveActivities.endActivity();
    clearUserSession();
  };

  const handleNewSession = () => {
    clearUserSession();
    queryClient.resetQueries({ queryKey: ["questions"] });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Learly</Text>
        <Text style={styles.welcomeMessage}>
          Welcome! Test your knowledge and track your progress through
          interactive practice sessions.
        </Text>
      </View>

      {/* Fox Emoji */}
      <View style={styles.homescreenEmojiContainer}>
        <Text style={styles.homescreenEmoji}>🦊</Text>
      </View>

      {/* Loading State */}
      {isLoading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            Error loading questions: {error.message}
          </Text>
        </View>
      )}

      {/* Loaded State */}
      {!isLoading && !error && data && (
        <View style={styles.contentContainer}>
          {/* New Session Button */}
          <TouchableOpacity
            style={styles.newSessionButton}
            onPress={handleNewSession}
          >
            <Text style={styles.newSessionButtonText}>
              Generate New Session
            </Text>
          </TouchableOpacity>

          {/* Stats Card */}
          <View style={styles.statsCard}>
            <Text style={styles.statsText}>Questions Available</Text>
            <Text style={styles.statsNumber}>{data.steps.length}</Text>
          </View>

          {/* Show progress only if user has started a session */}
          {currentUserStep !== null && (
            <View style={styles.statsCard}>
              <Text style={styles.statsText}>Current Progress</Text>
              <Text style={styles.statsNumber}>
                {completedQuestionsCount} / {data.steps.length}
              </Text>
            </View>
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStartPractice}
            >
              <Text style={styles.primaryButtonText}>
                {currentUserStep !== null
                  ? "Continue Practice"
                  : "Start Practice"}
              </Text>
            </TouchableOpacity>

            {/* Allow reset only if user has started a session */}
            {currentUserStep !== null && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleResetPractice}
              >
                <Text style={styles.secondaryButtonText}>Restart Practice</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Sign Out Button - Bottom Left */}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => {
          signOut();
        }}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
