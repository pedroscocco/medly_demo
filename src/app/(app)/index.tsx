import { useAuthSession } from "@/src/authentication/AuthSessionProvider";
import AnimatedFox from "@/src/components/AnimatedFox";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useSessionQuery from "../../api/hooks/useSessionQuery";
import { useOngoingActivity } from "../../hooks/ongoing_activity/useOngoingActivity";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { useAppSessionStore } from "../../store/useAppSessionStore";
import { colors } from "../../styles/designSystem";
import { styles } from "../../styles/HomeScreen.styles";

export default function Index() {
  // ===== Routing & Data =====
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useSessionQuery();

  // ===== Hooks =====
  const { signOut } = useAuthSession();
  const ongoingActivity = useOngoingActivity();
  const NetworkToast = useNetworkStatus();

  // ===== Store State & Actions =====
  const currentSession = useAppSessionStore((state) => state.currentSession);
  const startNewSession = useAppSessionStore((state) => state.startNewSession);
  const commitCurrentSession = useAppSessionStore(
    (state) => state.commitCurrentSession
  );

  // ===== Effects =====
  // Redirect to practice-flow if there's an ongoing session
  useEffect(() => {
    if (currentSession?.sessionStatus === "in-progress") {
      router.replace("./practice-flow");
    }
  }, [currentSession?.sessionStatus, router]);

  // ===== Handlers and Callbacks =====
  const handleStartPractice = () => {
    if (!data) return;

    const startTime = Date.now();

    // Start a new session
    startNewSession(data.sessionId.toString(), startTime);

    // Start ongoing activity
    ongoingActivity.startSession(
      "Learnly Practice",
      startTime,
      data.steps.length
    );

    router.push("./practice-flow");
  };

  const handleNewSession = () => {
    if (currentSession) {
      commitCurrentSession("abandoned");
    }
    queryClient.resetQueries({ queryKey: ["questions"] });
  };

  // ===== Render =====
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
      <AnimatedFox />

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
      <NetworkToast />
    </SafeAreaView>
  );
}
