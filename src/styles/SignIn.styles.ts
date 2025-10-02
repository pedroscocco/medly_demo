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
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xxl,
  },
  header: {
    marginTop: spacing.header + spacing.xxl,
    marginBottom: spacing.massive,
    alignItems: "center",
  },
  title: {
    fontSize: fontSize.xl + 8,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    marginBottom: spacing.massive,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: colors.white,
    ...shadows.small,
  },
  toggleText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.gray500,
  },
  toggleTextActive: {
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
  formContainer: {
    gap: spacing.xxl,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.black,
  },
  input: {
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    fontSize: fontSize.sm,
    color: colors.black,
    borderWidth: 2,
    borderColor: "transparent",
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.xl,
    alignItems: "center",
    marginTop: spacing.md,
    ...shadows.large,
  },
  submitButtonDisabled: {
    backgroundColor: colors.gray200,
    ...shadows.none,
  },
  submitButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.white,
  },
  errorContainer: {
    backgroundColor: colors.errorLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.error,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.error,
    textAlign: "center",
  },
});
