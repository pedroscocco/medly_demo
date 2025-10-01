import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { colors } from "../styles/designSystem";
import { styles } from "../styles/CheckButton.styles";

interface CheckButtonProps {
  onPress: () => void;
  disabled: boolean;
  text?: string;
  loading?: boolean;
}

export default function CheckButton({
  onPress,
  disabled,
  text = "Check",
  loading = false,
}: CheckButtonProps) {
  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        style={[styles.checkButton, disabled && styles.checkButtonDisabled]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <>
            <Text style={styles.checkButtonIcon}>⚡</Text>
            <Text
              style={[
                styles.checkButtonText,
                disabled && styles.checkButtonTextDisabled,
              ]}
            >
              {text}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
