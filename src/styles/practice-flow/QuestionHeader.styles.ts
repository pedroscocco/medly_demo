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
} from "../designSystem";

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
    paddingHorizontal: spacing.md,
  },
  progressBar: {
    height: progressBarHeight,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.sm,
    overflow: "visible",
    position: "relative",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  progressEmoji: {
    fontSize: fontSize.lg,
    position: "absolute",
    top: -8,
    marginLeft: -12,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  clockIcon: {
    color: colors.primary,
  },
  timerText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.semibold,
    fontVariant: ["tabular-nums"],
    minWidth: 32,
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
