import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { colors } from "../styles/designSystem";
import { styles } from "../styles/CheckButton.styles";
import { Svg, Path } from "react-native-svg";
import { MarkingResult } from "../types";

interface CheckButtonProps {
  onPress: () => void;
  disabled: boolean;
  text?: string;
  loading?: boolean;
  markingResult?: MarkingResult | null;
}

// Lightning bolt icon component
function LightningIcon({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M11 1L3 12H10L9 19L17 8H10L11 1Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function CheckButton({
  onPress,
  disabled,
  text = "Check",
  loading = false,
  markingResult = null,
}: CheckButtonProps) {
  const iconColor = disabled ? colors.gray400 : colors.white;

  // Determine button background color based on marking result
  const getButtonStyle = () => {
    if (disabled) return styles.checkButtonDisabled;
    if (markingResult?.isCorrect) return styles.checkButtonCorrect;
    if (markingResult && !markingResult.isCorrect) return styles.checkButtonIncorrect;
    return null;
  };

  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        style={[styles.checkButton, getButtonStyle()]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <>
            <LightningIcon color={iconColor} />
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
