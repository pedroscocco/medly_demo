import { StyleSheet } from "react-native";
import { colors, fontSize, fontWeight, spacing } from "./designSystem";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
    paddingBottom: 100, // Space for the button
  },
  containerCorrect: {
    backgroundColor: colors.successLight,
  },
  containerIncorrect: {
    backgroundColor: colors.errorLight,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  text: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  textCorrect: {
    color: colors.success,
  },
  textIncorrect: {
    color: colors.error,
  },
});
