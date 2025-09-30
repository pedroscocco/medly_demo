import { StyleSheet } from "react-native";
import {
  borderRadius,
  checkmarkSize,
  colors,
  fontSize,
  fontWeight,
  iconSizes,
  progressBarHeight,
  spacing,
} from "./designSystem";

export const styles = StyleSheet.create({
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
});
