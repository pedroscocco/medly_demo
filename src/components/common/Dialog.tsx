import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { colors, spacing, borderRadius, shadows } from "../../styles/designSystem";

interface DialogButton {
  text: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

interface DialogProps {
  visible: boolean;
  title: string;
  message?: string;
  children?: React.ReactNode;
  buttons: DialogButton[];
  onDismiss?: () => void;
}

export default function Dialog({
  visible,
  title,
  message,
  children,
  buttons,
  onDismiss,
}: DialogProps) {
  // ===== Render =====
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable style={styles.dialog} onPress={(e) => e.stopPropagation()}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.message}>{message}</Text>}
            {children}
          </View>

          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.variant === "secondary" && styles.buttonSecondary,
                  buttons.length === 1 && styles.buttonFull,
                ]}
                onPress={button.onPress}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button.variant === "secondary" && styles.buttonTextSecondary,
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  dialog: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    width: "100%",
    maxWidth: 400,
    ...shadows.large,
  },
  content: {
    padding: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    flex: 1,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  buttonFull: {
    borderRightWidth: 0,
  },
  buttonSecondary: {
    borderRightWidth: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },
  buttonTextSecondary: {
    color: colors.textSecondary,
  },
});
