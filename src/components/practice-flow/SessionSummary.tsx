import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../../styles/designSystem";
import { MarkingResult } from "../../types";

interface SessionSummaryProps {
  markingResults: { [questionIndex: number]: MarkingResult };
  totalQuestions: number;
  bestStreak: number;
}

export default function SessionSummary({
  markingResults,
  totalQuestions,
  bestStreak,
}: SessionSummaryProps) {
  const results = Object.values(markingResults);
  const correctCount = results.filter((r) => r.isCorrect).length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.statRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{correctCount}/{totalQuestions}</Text>
          <Text style={styles.statLabel}>Correct</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{accuracy}%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>🔥 {bestStreak}</Text>
          <Text style={styles.statLabel}>Best Streak</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
