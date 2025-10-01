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
    marginBottom: spacing.huge,
  },
  title: {
    fontSize: fontSize.xl + 8,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  welcomeMessage: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    textAlign: "center",
    lineHeight: 22,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    marginTop: spacing.md,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.error,
    textAlign: "center",
    paddingHorizontal: spacing.xxl,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xxl,
  },
  statsCard: {
    backgroundColor: colors.gray50,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.huge,
    borderRadius: borderRadius.lg,
    ...shadows.small,
  },
  statsText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    textAlign: "center",
  },
  statsNumber: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  buttonContainer: {
    width: "100%",
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.huge,
    borderRadius: borderRadius.lg,
    ...shadows.large,
  },
  primaryButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.white,
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.huge,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.gray200,
  },
  secondaryButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.gray500,
    textAlign: "center",
  },
  newSessionButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  newSessionButtonText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.primary,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
