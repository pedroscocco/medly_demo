/**
 * Design System
 * Centralized style constants for consistent theming across the app
 */

export const colors = {
  // Primary colors
  primary: "#4A9EFF",
  primaryLight: "#E8F4FF",

  // Neutral colors
  white: "#FFFFFF",
  black: "#000000",

  // Gray scale
  gray50: "#F8F9FA",
  gray200: "#E5E5E5",
  gray500: "#6B7280",
  gray400: "#9CA3AF",

  // Semantic colors
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  huge: 30,
  massive: 32,
  header: 50,
} as const;

export const borderRadius = {
  sm: 4,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

export const fontSize = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
} as const;

export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "bold" as const,
};

export const lineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  large: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  none: {
    shadowOpacity: 0,
    elevation: 0,
  },
} as const;

export const iconSizes = {
  sm: 18,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export const progressBarHeight = 8;
export const checkmarkSize = 24;
