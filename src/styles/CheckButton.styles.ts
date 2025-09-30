import { StyleSheet } from "react-native";
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  shadows,
  spacing,
} from "./designSystem";

export const styles = StyleSheet.create({
  bottomContainer: {
    padding: spacing.xxl,
    marginTop: "auto",
  },
  checkButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    ...shadows.large,
  },
  checkButtonDisabled: {
    backgroundColor: colors.gray200,
    ...shadows.none,
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
