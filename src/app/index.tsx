import { useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import useSessionQuery from "../hooks/useSessioQuery";
import { useAppSessionStore } from "../store/useAppSessionStore";
import { colors } from "../styles/designSystem";
import { styles } from "../styles/HomeScreen.styles";

export default function Index() {
  const router = useRouter();
  const { data, isLoading, error } = useSessionQuery();
  const clearSession = useAppSessionStore((state) => state.clearSession);
  const currentSessionStep = useAppSessionStore(
    (state) => state.currentSessionStep
  );

  const handleStartPractice = () => {
    router.push("./practice-flow");
  };

  const handleResetPractice = () => {
    clearSession();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Medly Practice</Text>
        <Text style={styles.welcomeMessage}>
          Welcome! Test your knowledge and track your progress through
          interactive practice sessions.
        </Text>
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
          {/* Stats Card */}
          <View style={styles.statsCard}>
            <Text style={styles.statsText}>Questions Available</Text>
            <Text style={styles.statsNumber}>{data.steps.length}</Text>
          </View>

          {currentSessionStep > 0 && (
            <View style={styles.statsCard}>
              <Text style={styles.statsText}>Current Progress</Text>
              <Text style={styles.statsNumber}>
                {currentSessionStep} / {data.steps.length}
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
                {currentSessionStep > 0 ? "Continue Practice" : "Start Practice"}
              </Text>
            </TouchableOpacity>

            {currentSessionStep > 0 && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleResetPractice}
              >
                <Text style={styles.secondaryButtonText}>
                  Reset Practice Flow
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
