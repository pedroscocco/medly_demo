import { useAuthSession } from "@/src/authentication/AuthSessionProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const currentSession = useAppSessionStore((state) => state.currentSession);
  const startNewSession = useAppSessionStore((state) => state.startNewSession);
  const commitCurrentSession = useAppSessionStore(
    (state) => state.commitCurrentSession
  );

  // Redirect to practice-flow if there's an ongoing session
  useEffect(() => {
    if (currentSession?.sessionStatus === "in-progress") {
      router.replace("./practice-flow");
    }
  }, [currentSession?.sessionStatus, router]);

  const handleStartPractice = () => {
    if (!data) return;

    const startTime = Date.now();

    // Start a new session
    startNewSession(data.sessionId.toString(), startTime);

    // Start Live Activity
    if (LiveActivities.areActivitiesEnabled()) {
      if (LiveActivities.isActivityInProgress()) {
        LiveActivities.endActivity();
      }
      LiveActivities.startActivity(
        "Learnly Practice",
        startTime / 1000,
        data.steps.length,
        0
      );
    }
    router.push("./practice-flow");
  };

  const handleNewSession = () => {
    if (currentSession) {
      commitCurrentSession("abandoned");
    }
    queryClient.resetQueries({ queryKey: ["questions"] });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>learnly</Text>
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

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStartPractice}
            >
              <Text style={styles.primaryButtonText}>Start Practice</Text>
            </TouchableOpacity>
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
