import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/CheckButton.styles";

interface CheckButtonProps {
  onPress: () => void;
  disabled: boolean;
}

export default function CheckButton({ onPress, disabled }: CheckButtonProps) {
  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        style={[styles.checkButton, disabled && styles.checkButtonDisabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.checkButtonIcon}>⚡</Text>
        <Text
          style={[
            styles.checkButtonText,
            disabled && styles.checkButtonTextDisabled,
          ]}
        >
          Check
        </Text>
      </TouchableOpacity>
    </View>
  );
}
