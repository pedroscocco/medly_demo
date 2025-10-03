import { StyleSheet } from "react-native";
import { colors, fontSize, spacing } from "../designSystem";

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: spacing.lg,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.error,
  },
});
