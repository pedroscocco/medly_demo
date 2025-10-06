import { withDelay, withTiming } from "react-native-reanimated";

export const swipeEntering = (targetValues: any) => {
  "worklet";
  const animations = {
    originX: withDelay(
      100,
      withTiming(targetValues.targetOriginX, { duration: 450 })
    ),
    transform: [{ rotate: withDelay(100, withTiming("0deg", { duration: 450 })) }],
  };
  const initialValues = {
    originX: targetValues.windowWidth * 1.2,
    transform: [{ rotate: "30deg" }],
  };
  return {
    initialValues,
    animations,
  };
};

export const swipeExiting = (targetValues: any) => {
  "worklet";
  const animations = {
    originX: withTiming(-targetValues.windowWidth, { duration: 450 }),
    transform: [{ rotate: withTiming("-5deg", { duration: 450 }) }],
  };
  const initialValues = {
    originX: targetValues.currentOriginX,
    transform: [{ rotate: "0deg" }],
  };
  return {
    initialValues,
    animations,
  };
};
