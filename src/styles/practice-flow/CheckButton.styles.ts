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
  bottomContainer: {
    paddingHorizontal: spacing.xxl,
    marginTop: "auto",
    zIndex: 10,
  },
  checkButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xxl,
    ...shadows.large,
  },
  checkButtonDisabled: {
    backgroundColor: colors.gray200,
    ...shadows.none,
  },
  checkButtonCorrect: {
    backgroundColor: colors.success,
  },
  checkButtonIncorrect: {
    backgroundColor: colors.error,
  },
  checkButtonIcon: {
    fontSize: fontSize.lg,
  },
  checkButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.white,
  },
  checkButtonTextDisabled: {
    color: colors.gray400,
  },
});
