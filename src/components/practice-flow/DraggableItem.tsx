import { styles } from "@/src/styles/practice-flow/SortQuestion.styles";
import React from "react";
import { Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDropZones } from "./DropZonesContext";

interface DraggableItemProps {
  text: string;
  onDrop?: (item: string, zoneId: string) => void;
  onHover?: (zoneId: string | null) => void;
  isLocked?: boolean;
}

export default function DraggableItem({
  text,
  onDrop,
  onHover,
  isLocked = false,
}: DraggableItemProps) {
  const { dropZones, triggerRemeasure } = useDropZones();
  const itemCenterX = useSharedValue(0);
  const itemCenterY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const pressed = useSharedValue(false);
  const animatedRef = useAnimatedRef<Animated.View>();

  const checkDropZone = () => {
    "worklet";
    for (const zone of dropZones) {
      if (
        itemCenterX.value + translateX.value >= zone.x &&
        itemCenterX.value + translateX.value <= zone.x + zone.width &&
        itemCenterY.value + translateY.value >= zone.y &&
        itemCenterY.value + translateY.value <= zone.y + zone.height
      ) {
        return zone.id;
      }
    }
    return null;
  };

  const pan = Gesture.Pan()
    .enabled(!isLocked)
    .onBegin((event) => {
      // Trigger all drop zones to re-measure
      runOnJS(triggerRemeasure)();

      const measured = measure(animatedRef);
      if (measured) {
        itemCenterX.value = measured.pageX + measured.width / 2;
        itemCenterY.value = measured.pageY + measured.height / 2;
      }
      pressed.value = true;
    })
    .onChange((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      const droppedZoneId = checkDropZone();
      if (onHover) {
        runOnJS(onHover)(droppedZoneId);
      }
    })
    .onFinalize((event) => {
      pressed.value = false;

      // Check if center of item is dropped on a zone
      const droppedZoneId = checkDropZone();

      if (droppedZoneId && onDrop) {
        runOnJS(onDrop)(text, droppedZoneId);
      }

      // Clear hover state
      if (onHover) {
        runOnJS(onHover)(null);
      }

      // Snap back to original position
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

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
      <Animated.View
        ref={animatedRef}
        style={[
          styles.draggableItem,
          isLocked && styles.draggableItemLocked,
          animatedStyle,
        ]}
      >
        <Text
          style={[
            styles.draggableItemText,
            isLocked && styles.draggableItemLockedText,
          ]}
        >
          {text}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}
