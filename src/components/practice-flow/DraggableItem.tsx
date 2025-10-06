import React from "react";
import { StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface DraggableItemProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  activeStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function DraggableItem({
  text,
  isSelected,
  onPress,
  style,
  activeStyle,
  textStyle,
}: DraggableItemProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const pressed = useSharedValue(false);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onFinalize(() => {
      pressed.value = false;
      // Snap back to original position
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  // const tap = Gesture.Tap().onEnd(() => {
  //   onPress();
  // });

  // Compose gestures - tap and pan can work together
  // const composed = Gesture.Race(tap, pan);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: pressed.value ? 1.05 : 1 },
      ],
      zIndex: pressed.value ? 1000 : 1,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[style, isSelected && activeStyle, animatedStyle]}>
        <Text style={textStyle}>{text}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
