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
  categoriesContainer: {
    paddingHorizontal: spacing.xxl,
    marginBottom: spacing.xxl,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  categoryBox: {
    width: "48%",
    minHeight: 180,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.gray200,
    padding: spacing.md,
  },
  categoryBoxActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  categoryLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.gray500,
    marginBottom: spacing.sm,
  },
  categoryItems: {
    flex: 1,
    gap: spacing.sm,
  },
  draggableArea: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  draggableItem: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.gray200,
    ...shadows.small,
  },
  draggableItemActive: {
    borderColor: colors.primary,
    opacity: 0.8,
    ...shadows.large,
  },
  draggableItemText: {
    fontSize: fontSize.sm,
    color: colors.black,
    fontWeight: fontWeight.medium,
  },
  itemInCategory: {
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  itemInCategoryText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  draggableItemLocked: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  draggableItemLockedText: {
    color: colors.success,
  },
});
