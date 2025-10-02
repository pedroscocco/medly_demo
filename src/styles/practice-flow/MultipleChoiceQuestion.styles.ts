import { StyleSheet } from "react-native";
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  shadows,
  spacing,
} from "../designSystem";

export const styles = StyleSheet.create({
  questionCard: {
    margin: spacing.xxl,
    padding: spacing.huge,
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.xl,
    ...shadows.medium,
  },
  questionText: {
    fontSize: fontSize.lg,
    lineHeight: spacing.huge,
    textAlign: "center",
    color: colors.black,
    fontWeight: fontWeight.regular,
  },
  optionsContainer: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.md,
  },
  optionButton: {
    padding: spacing.xxl,
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: "transparent",
    ...shadows.small,
  },
  optionButtonSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  optionButtonCorrect: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  optionButtonIncorrect: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  optionText: {
    fontSize: fontSize.sm,
    textAlign: "center",
    color: colors.gray500,
  },
  optionTextSelected: {
    color: colors.black,
    fontWeight: fontWeight.medium,
  },
});
