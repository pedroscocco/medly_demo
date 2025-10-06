import { Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { styles } from "../styles/HomeScreen.styles";

const nodEntering = (targetValues: any) => {
  "worklet";
  const animations = {
    transform: [
      {
        rotate: withDelay(
          500,
          withSequence(
            withTiming("-30deg", { duration: 350 }),
            withTiming("30deg", { duration: 350 }),
            withTiming("0deg", { duration: 350 })
          )
        ),
      },
    ],
  };
  const initialValues = {
    originX: targetValues.targetOriginX,
    transform: [{ rotate: "0deg" }],
  };
  return {
    initialValues,
    animations,
  };
};

export default function AnimatedFox() {
  const rollAngle = useSharedValue("0deg");

  const handlePress = () => {
    rollAngle.value = withSequence(
      withTiming("-30deg", { duration: 350 }),
      withTiming("30deg", { duration: 350 }),
      withTiming("0deg", { duration: 350 })
    );
  };

  return (
    <Animated.View
      entering={nodEntering}
      style={[
        styles.homescreenEmojiContainer,
        { transform: [{ rotate: rollAngle }] },
      ]}
    >
      <Pressable onPress={handlePress}>
        <Text style={styles.homescreenEmoji}>🦊</Text>
      </Pressable>
    </Animated.View>
  );
}
