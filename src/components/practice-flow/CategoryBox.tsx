import { styles } from "@/src/styles/practice-flow/SortQuestion.styles";
import React, { useEffect } from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useDerivedValue,
} from "react-native-reanimated";
import { useDropZones } from "./DropZonesContext";

interface CategoryBoxProps {
  categoryId: string;
  label: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  isHovered?: boolean;
}

export default function CategoryBox({
  categoryId,
  label,
  style,
  children,
  isHovered = false,
}: CategoryBoxProps) {
  const { registerDropZone, unregisterDropZone, remeasureTrigger } =
    useDropZones();
  const animatedRef = useAnimatedRef<Animated.View>();

  // Measure the component and register as drop zone
  // Re-measure when remeasureTrigger changes
  useDerivedValue(() => {
    // Watch the trigger to force re-measurement
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = remeasureTrigger.value;

    const measured = measure(animatedRef);
    if (measured) {
      const zone = {
        id: categoryId,
        x: measured.pageX,
        y: measured.pageY,
        width: measured.width,
        height: measured.height,
      };
      runOnJS(registerDropZone)(zone);
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unregisterDropZone(categoryId);
    };
  }, [categoryId, unregisterDropZone]);

  return (
    <Animated.View
      ref={animatedRef}
      style={[style, isHovered && styles.categoryBoxActive]}
    >
      <Text style={styles.categoryLabel}>{label}</Text>
      {children}
    </Animated.View>
  );
}
