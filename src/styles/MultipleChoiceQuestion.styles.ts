import { StyleSheet } from "react-native";
import {
  borderRadius,
  checkmarkSize,
  colors,
  fontSize,
  fontWeight,
  iconSizes,
  progressBarHeight,
  shadows,
  spacing,
} from "./designSystem";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: spacing.header,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  closeButton: {
    width: spacing.massive,
    height: spacing.massive,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: fontSize.xl,
    color: colors.black,
  },
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: progressBarHeight,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.sm,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  progressEmoji: {
    fontSize: fontSize.lg,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  counterIcon: {
    fontSize: iconSizes.sm,
    color: colors.primary,
  },
  counterText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
  badgeContainer: {
    paddingHorizontal: spacing.xxl,
    marginTop: spacing.xxl,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
  },
  checkmark: {
    width: checkmarkSize,
    height: checkmarkSize,
    borderRadius: checkmarkSize / 2,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  badgeText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
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
  optionText: {
    fontSize: fontSize.sm,
    textAlign: "center",
    color: colors.gray500,
  },
  optionTextSelected: {
    color: colors.black,
    fontWeight: fontWeight.medium,
  },
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
